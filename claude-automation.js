// ==UserScript==
// @name         Claude Automation – Scheduler + Autonomous Queue
// @namespace    https://github.com/achma-learning/userscripts
// @version      9.0.0
// @description  Schedule a single message or run an autonomous queue of prompts; auto-resumes after usage-limit resets, randomised delays, progress saved across reloads.
// @author       achma-learning
// @license      MIT
// @match        https://claude.ai/*
// @icon         https://claude.ai/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==

// Two independent modes share the same detection infrastructure:
//   Schedule – one-shot timed send with adaptive reset-clock tracking (v8 behaviour)
//   Queue    – autonomous loop: send → wait for Claude → random delay → repeat
//              auto-schedules next attempt when usage limit is hit
//              full state persisted so the browser can be closed and queue resumes

(() => {
    'use strict';

    if (window.__CLAUDE_AUTOMATION_LOADED__) return;
    window.__CLAUDE_AUTOMATION_LOADED__ = true;

    // ─── Constants ────────────────────────────────────────────────────────────
    const SCHED_KEY  = 'ca_sched_v9';
    const QUEUE_KEY  = 'ca_queue_v9';
    const PANEL_ID   = 'ca-panel';
    const MODAL_ID   = 'ca-modal';
    const TOAST_ID   = 'ca-toast';
    const STYLES_ID  = 'ca-styles';
    const RETRY_DELAYS = [75 * 60_000, 305 * 60_000]; // 1h15m, 5h5m

    // ─── Storage ──────────────────────────────────────────────────────────────
    function stSave(key, val) { GM_setValue(key, val === null ? '' : JSON.stringify(val)); }
    function stLoad(key) {
        const r = GM_getValue(key, '');
        if (!r) return null;
        try { return JSON.parse(r); } catch { return null; }
    }

    // ─── Reset-clock detection ─────────────────────────────────────────────────
    const CLOCK_RES = [
        /r[ée]initialisation[^0-9]*(\d{1,2}):(\d{2})/i,
        /resets?\s+at\s+(\d{1,2}):(\d{2})/i,
        /resets?\s+(\d{1,2}):(\d{2})/i,
        /usage\s+limit[^0-9]*(\d{1,2}):(\d{2})/i,
    ];
    const LIMIT_RE = /r[ée]initialisatio|resets?|usage.?limit|limite de messages/i;

    function findLimitText() {
        const seats = document.querySelectorAll(
            '[data-color-context="warning"],[role="alert"],[data-testid*="limit"],[class*="usage"],[class*="limit"]'
        );
        for (const el of seats) {
            const t = el.innerText || '';
            if (LIMIT_RE.test(t)) return t;
        }
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = w.nextNode())) {
            if (LIMIT_RE.test(n.textContent)) return n.textContent;
        }
        return null;
    }

    function parseResetClock() {
        const text = findLimitText();
        if (!text) return null;
        for (const re of CLOCK_RES) {
            const m = text.match(re);
            if (m) {
                const h = +m[1], min = +m[2];
                if (h >= 0 && h <= 23 && min >= 0 && min <= 59) return { h, min };
            }
        }
        return null;
    }

    function getTargetDate(clock, plusMin = 5) {
        if (!clock) return null;
        const t = new Date();
        t.setHours(clock.h, clock.min, 0, 0);
        if (t <= new Date()) t.setDate(t.getDate() + 1);
        t.setMinutes(t.getMinutes() + plusMin);
        return t;
    }

    // ─── Input / send helpers ──────────────────────────────────────────────────
    const INPUT_SELS = [
        'div[contenteditable="true"].ProseMirror',
        'div[contenteditable="true"][data-placeholder]',
        'div[contenteditable="true"]',
        'textarea[name="message"]',
        'textarea',
    ];
    const SEND_SELS = [
        'button[aria-label="Send message"]',
        'button[aria-label="Envoyer le message"]',
        'button[aria-label*="send" i]',
        'button[type="submit"]',
    ];

    function getInput() {
        for (const s of INPUT_SELS) {
            const el = document.querySelector(s);
            if (el && el.offsetParent !== null) return el;
        }
        return null;
    }

    function getInputText() {
        const el = getInput();
        if (!el) return '';
        return el.isContentEditable ? el.innerText.trim() : (el.value || '').trim();
    }

    function setInputText(text) {
        const el = getInput();
        if (!el) return false;
        el.focus();
        if (el.isContentEditable) {
            document.execCommand('selectAll', false, null);
            document.execCommand('insertText', false, text);
        } else {
            const s = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
            s.call(el, text);
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return true;
    }

    function findSendBtn() {
        for (const s of SEND_SELS) {
            const b = document.querySelector(s);
            if (b) return b;
        }
        return null;
    }

    function clickSend() {
        const b = findSendBtn();
        if (b && !b.disabled) { b.click(); return true; }
        return false;
    }

    function isLimitActive() { return findLimitText() !== null; }

    // ─── Webhook ───────────────────────────────────────────────────────────────
    function sendWebhook(url, message) {
        if (!url) return;
        GM_xmlhttpRequest({
            method: 'POST', url,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ message, source: 'claude-automation', ts: new Date().toISOString() }),
            timeout: 15_000,
            onload:   r  => console.log(`[CA] webhook ${r.status}`),
            onerror:  () => console.error('[CA] webhook error'),
            ontimeout:() => console.error('[CA] webhook timeout'),
        });
    }

    // ─── SINGLE SCHEDULER ─────────────────────────────────────────────────────
    let schedTask     = null;
    let countdownIval = null;
    let timerObs      = null;
    let lastClockKey  = null;
    let autoSchedData = null;

    function clearSched() {
        stSave(SCHED_KEY, null);
        clearTimeout(schedTask);
        clearInterval(countdownIval);
        schedTask = countdownIval = null;
        stopWatchingTimer();
        updateStatus(null);
    }

    function scheduleAt(targetDate, opts) {
        if (qRT.active) { showToast('⚠️ Stop queue before using single schedule', 'warn'); return false; }
        const delay = targetDate.getTime() - Date.now();
        if (delay <= 0) { showToast('⚠️ Time already passed', 'warn'); return false; }
        const data = { ...opts, ts: targetDate.getTime() };
        stSave(SCHED_KEY, data);
        clearTimeout(schedTask);
        schedTask = setTimeout(() => execSched(data), delay);
        startCountdown(targetDate.getTime());
        updateStatus(`📅 ${targetDate.toLocaleString()}`);
        if (opts.isAuto) { autoSchedData = data; startWatchingTimer(); }
        return true;
    }

    function execSched(sched) {
        const { webhookUrl, useCurrentInput, customMessage, clickSendBtn, retryCount = 0 } = sched;
        const msg = useCurrentInput ? getInputText() : (customMessage || '');
        if (webhookUrl) sendWebhook(webhookUrl, msg);
        if (clickSendBtn) {
            if (!useCurrentInput && customMessage) setInputText(customMessage);
            setTimeout(clickSend, 600);
        }
        setTimeout(() => {
            if (isLimitActive()) {
                if (retryCount < RETRY_DELAYS.length) {
                    const next = new Date(Date.now() + RETRY_DELAYS[retryCount]);
                    scheduleAt(next, { ...sched, retryCount: retryCount + 1, isAuto: false });
                    showToast(`⚠️ Limit – retry #${retryCount + 1} in ${fmtMs(RETRY_DELAYS[retryCount])}`, 'warn');
                } else {
                    clearSched();
                    updateStatus('❌ Max retries reached');
                    showToast('❌ Max retries reached', 'error');
                }
            } else {
                clearSched();
                updateStatus('✅ Sent');
                showToast('✅ Message sent!', 'success');
            }
        }, 2_500);
    }

    function startWatchingTimer() {
        if (timerObs) timerObs.disconnect();
        let db;
        timerObs = new MutationObserver(() => { clearTimeout(db); db = setTimeout(checkTimerChange, 300); });
        timerObs.observe(document.body, { childList: true, subtree: true, characterData: true });
        lastClockKey = null;
    }

    function checkTimerChange() {
        if (!autoSchedData?.isAuto) return;
        const clock = parseResetClock();
        if (!clock) return;
        const key = `${clock.h}:${clock.min}`;
        if (key === lastClockKey) return;
        lastClockKey = key;
        const t = getTargetDate(clock);
        if (!t || t.getTime() === autoSchedData.ts) return;
        const updated = { ...autoSchedData, ts: t.getTime() };
        autoSchedData = updated;
        stSave(SCHED_KEY, updated);
        clearTimeout(schedTask);
        schedTask = setTimeout(() => execSched(updated), t.getTime() - Date.now());
        startCountdown(t.getTime());
        updateStatus(`📅 Auto-updated → ${t.toLocaleString()}`);
    }

    function stopWatchingTimer() {
        timerObs?.disconnect();
        timerObs = autoSchedData = lastClockKey = null;
    }

    function startCountdown(ts) {
        clearInterval(countdownIval);
        countdownIval = setInterval(() => {
            const d = ts - Date.now();
            if (d <= 0) { clearInterval(countdownIval); return; }
            updateStatus(`⏳ ${fmtMs(d)}`);
        }, 1_000);
    }

    function restoreSchedIfSaved() {
        const s = stLoad(SCHED_KEY);
        if (!s) return;
        if (s.ts <= Date.now()) {
            if (Date.now() - s.ts < 10_000) execSched(s); else clearSched();
            return;
        }
        clearTimeout(schedTask);
        schedTask = setTimeout(() => execSched(s), s.ts - Date.now());
        startCountdown(s.ts);
        updateStatus(`📅 Restored: ${new Date(s.ts).toLocaleString()}`);
        if (s.isAuto) { autoSchedData = s; startWatchingTimer(); }
    }

    // ─── QUEUE ENGINE ─────────────────────────────────────────────────────────
    // qRT = queue runtime (persisted to QUEUE_KEY)
    let qRT = {
        messages  : [],
        index     : 0,
        active    : false,
        minDelay  : 30,    // seconds
        maxDelay  : 120,   // seconds
        waitResp  : true,
        webhookUrl: '',
    };
    let qTimer = null;

    function saveQRT() { stSave(QUEUE_KEY, { ...qRT }); }

    function loadQRT() {
        const s = stLoad(QUEUE_KEY);
        if (s) Object.assign(qRT, s);
    }

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    // Waits for send button to become disabled (Claude starts) then re-enabled (Claude done)
    function waitForResponse(maxMs = 300_000) {
        return new Promise(resolve => {
            const deadline = Date.now() + maxMs;
            let phase = 'start';
            const tid = setInterval(() => {
                if (Date.now() > deadline) { clearInterval(tid); resolve(); return; }
                const btn = findSendBtn();
                const on  = btn && !btn.disabled;
                if (phase === 'start' && !on)  phase = 'gen';
                if (phase === 'gen'   && on)  { clearInterval(tid); resolve(); }
            }, 400);
            // bail if Claude never starts (e.g. limit blocked it)
            setTimeout(() => { if (phase === 'start') { clearInterval(tid); resolve(); } }, 3_500);
        });
    }

    async function runQueueStep() {
        if (!qRT.active) return;
        const { messages, index, waitResp, webhookUrl } = qRT;
        const total = messages.length;

        if (index >= total) { endQueue('✅ All messages sent!', 'success'); return; }

        const msg = messages[index];
        const nth = index + 1;

        updateStatus(`🤖 Sending ${nth}/${total}…`);
        refreshQueueUI();
        showToast(`🤖 Sending ${nth}/${total}`, 'info');

        if (!setInputText(msg)) {
            qRT.active = false; saveQRT(); refreshQueueUI();
            updateStatus(`⏸ Input not found (${nth}/${total})`);
            showToast('⏸ Queue paused — input box not found', 'warn');
            return;
        }
        await sleep(600);
        if (webhookUrl) sendWebhook(webhookUrl, msg);
        if (!clickSend()) {
            qRT.active = false; saveQRT(); refreshQueueUI();
            updateStatus(`⏸ Send btn not found (${nth}/${total})`);
            showToast('⏸ Queue paused — send button not found', 'warn');
            return;
        }

        await sleep(2_500);

        if (isLimitActive()) {
            const clock  = parseResetClock();
            const target = getTargetDate(clock);
            if (target) {
                const delay = target.getTime() - Date.now();
                clearTimeout(qTimer);
                qTimer = setTimeout(runQueueStep, delay);
                startCountdown(target.getTime());
                updateStatus(`⏳ Limit – resuming at ${target.toLocaleTimeString()} (${nth}/${total})`);
                showToast(`⏳ Limit hit – queue resumes at ${target.toLocaleTimeString()}`, 'warn');
            } else {
                qRT.active = false; saveQRT(); refreshQueueUI();
                updateStatus(`⏸ Limit – no reset time found (${nth}/${total})`);
                showToast('⏸ Limit hit – could not detect reset time. Resume manually.', 'warn');
            }
            return;
        }

        // Success – advance index
        qRT.index = nth;
        saveQRT();
        refreshQueueUI();

        if (qRT.index >= messages.length) { endQueue('✅ All messages sent!', 'success'); return; }

        if (waitResp) {
            updateStatus(`⏳ Waiting for Claude… (${nth}/${total})`);
            await waitForResponse();
        }

        const d = (qRT.minDelay + Math.random() * (qRT.maxDelay - qRT.minDelay)) * 1_000;
        updateStatus(`⏳ Next in ${Math.round(d / 1000)}s (${qRT.index + 1}/${total})`);
        qTimer = setTimeout(runQueueStep, d);
    }

    function endQueue(msg, type) {
        clearTimeout(qTimer); clearInterval(countdownIval);
        qTimer = null;
        qRT.active = false; saveQRT();
        updateStatus(msg); showToast(msg, type); refreshQueueUI();
    }

    function startQueue() {
        if (schedTask)              { showToast('⚠️ Cancel single schedule first', 'warn'); return; }
        if (!qRT.messages.length)   { showToast('⚠️ Queue is empty – save messages first', 'warn'); return; }
        if (qRT.index >= qRT.messages.length) { showToast('⚠️ Queue done – reset to restart', 'warn'); return; }
        qRT.active = true; saveQRT(); refreshQueueUI();
        runQueueStep();
    }

    function pauseQueue() {
        clearTimeout(qTimer); clearInterval(countdownIval); qTimer = null;
        qRT.active = false; saveQRT();
        updateStatus(`⏸ Paused at ${qRT.index}/${qRT.messages.length}`);
        showToast('⏸ Queue paused', 'info'); refreshQueueUI();
    }

    function resetQueueIdx() {
        clearTimeout(qTimer); qTimer = null;
        qRT.index = 0; qRT.active = false; saveQRT();
        updateStatus('No schedule'); refreshQueueUI();
    }

    function restoreQueueIfActive() {
        loadQRT();
        if (!qRT.active) return;
        // Don't auto-resume on reload – show prompt instead
        qRT.active = false; saveQRT();
        updateStatus(`⏸ Queue paused at ${qRT.index}/${qRT.messages.length} (reloaded)`);
        showToast('⏸ Queue was running – open Queue tab to resume', 'warn');
        refreshQueueUI();
    }

    // ─── Utilities ─────────────────────────────────────────────────────────────
    function fmtMs(ms) {
        const s = Math.floor(ms / 1_000), h = Math.floor(s / 3_600);
        const m = Math.floor((s % 3_600) / 60), sec = s % 60;
        return h > 0
            ? `${h}h ${String(m).padStart(2,'0')}m ${String(sec).padStart(2,'0')}s`
            : `${m}m ${String(sec).padStart(2,'0')}s`;
    }
    const p2 = n => String(n).padStart(2, '0');
    function toLocalDT(d) {
        return `${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}T${p2(d.getHours())}:${p2(d.getMinutes())}`;
    }

    // ─── Status & toast ────────────────────────────────────────────────────────
    function updateStatus(text) {
        const el = document.getElementById('ca-status');
        if (el) el.textContent = text || 'No schedule';
        const cb = document.getElementById('ca-cancel');
        if (cb) {
            const on = text && !text.startsWith('✅') && !text.startsWith('❌') && text !== 'No schedule';
            cb.style.display = on ? 'inline-block' : 'none';
        }
    }

    function showToast(msg, type = 'info') {
        const C = { info:'#10a37f', warn:'#d97706', error:'#dc2626', success:'#059669' };
        let t = document.getElementById(TOAST_ID);
        if (!t) {
            t = document.createElement('div');
            t.id = TOAST_ID;
            t.style.cssText = 'position:fixed;bottom:165px;right:20px;z-index:100000;padding:11px 16px;border-radius:12px;font-family:system-ui;font-size:13px;color:#fff;max-width:320px;line-height:1.45;transition:opacity .3s;pointer-events:none;box-shadow:0 4px 18px rgba(0,0,0,.45);';
            document.body.appendChild(t);
        }
        t.style.background = C[type] || C.info;
        t.style.opacity = '1';
        t.textContent = msg;
        clearTimeout(t._t);
        t._t = setTimeout(() => { t.style.opacity = '0'; }, 4_000);
    }

    function refreshQueueUI() {
        const prog     = document.getElementById('ca-q-prog');
        const startBtn = document.getElementById('ca-q-start');
        const pauseBtn = document.getElementById('ca-q-pause');
        const resumBtn = document.getElementById('ca-q-resum');
        const { messages, index, active } = qRT;
        if (prog) prog.textContent = messages.length === 0
            ? 'No messages'
            : `${index} / ${messages.length} sent${active ? '  🟢 running' : ''}`;
        if (startBtn) startBtn.style.display  = (!active && index === 0 && messages.length > 0) ? 'inline-block' : 'none';
        if (pauseBtn) pauseBtn.style.display  = active ? 'inline-block' : 'none';
        if (resumBtn) resumBtn.style.display  = (!active && index > 0 && index < messages.length) ? 'inline-block' : 'none';
    }

    // ─── Styles ────────────────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById(STYLES_ID)) return;
        const s = document.createElement('style');
        s.id = STYLES_ID;
        s.textContent = `
#${MODAL_ID}{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100001;display:none;align-items:center;justify-content:center}
#ca-box{background:#1a1a2e;border:1px solid #2d2d4e;border-radius:20px;padding:28px;width:520px;max-width:92vw;color:#e5e5f0;font-family:system-ui;display:flex;flex-direction:column;gap:13px;box-shadow:0 8px 40px rgba(0,0,0,.65);max-height:90vh;overflow-y:auto}
#ca-box h3{margin:0;font-size:17px}
.ca-tabs{display:flex;gap:6px}
.ca-tab{padding:6px 18px;border-radius:20px;border:1px solid #3a3a5e;background:transparent;color:#aaa;cursor:pointer;font-size:13px}
.ca-tab.on{background:#10a37f;border-color:#10a37f;color:#fff;font-weight:600}
.ca-pane{display:none;flex-direction:column;gap:12px}
.ca-pane.on{display:flex}
.ca-lbl{font-size:13px;color:#aaa;margin-bottom:2px;display:block}
.ca-inp{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;border:1px solid #3a3a5e;background:#22223a;color:#e5e5f0;font-size:13px}
.ca-inp:focus{outline:none;border-color:#10a37f}
.ca-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ca-chk{display:flex;align-items:center;gap:9px;font-size:13px;color:#ccc;cursor:pointer}
.ca-chk input{accent-color:#10a37f;width:16px;height:16px;cursor:pointer}
.ca-hr{border:none;border-top:1px solid #2d2d4e;margin:0}
#ca-reset-info{font-size:12px;color:#10a37f;padding:7px 12px;background:#0a2218;border-radius:8px;display:none}
.ca-btn{padding:7px 16px;border-radius:30px;border:none;cursor:pointer;font-weight:600;font-size:13px}
#ca-save{background:#10a37f;color:#fff}
#ca-mc{background:#3a3a5e;color:#fff}
#ca-now5,#ca-q-import,#ca-q-export,#ca-q-reset{background:#3a3a5e;color:#fff}
#ca-q-start{background:#10a37f;color:#fff}
#ca-q-pause{background:#d97706;color:#fff}
#ca-q-resum{background:#2563eb;color:#fff}
#ca-q-save{background:#3a3a5e;color:#fff}
#ca-q-prog{font-size:13px;color:#10a37f;font-weight:600}
.ca-num{width:60px;padding:6px 8px;border-radius:8px;border:1px solid #3a3a5e;background:#22223a;color:#e5e5f0;font-size:13px}
        `;
        document.head.appendChild(s);
    }

    // ─── Floating panel ────────────────────────────────────────────────────────
    function buildPanel() {
        if (document.getElementById(PANEL_ID)) return;
        const p = document.createElement('div');
        p.id = PANEL_ID;
        p.style.cssText = 'position:fixed;bottom:100px;right:20px;z-index:99999;display:flex;align-items:center;gap:9px;background:#12121f;border:1px solid #2d2d4e;padding:8px 16px;border-radius:40px;color:#fff;font-family:system-ui;font-size:13px;box-shadow:0 4px 24px rgba(0,0,0,.55);';

        const mk = (txt, bg, id = '') => {
            const b = document.createElement('button');
            b.textContent = txt;
            if (id) b.id = id;
            b.style.cssText = `padding:6px 14px;border-radius:30px;background:${bg};color:#fff;cursor:pointer;border:none;font-weight:600;font-size:13px;`;
            return b;
        };
        const schedBtn  = mk('⏰ Schedule', '#10a37f');
        const queueBtn  = mk('🤖 Queue',    '#2563eb');
        const detectBtn = mk('🔍', '#2d2d5e');
        detectBtn.title = 'Auto-detect reset time';
        const cancelBtn = mk('✕', '#5a2a2a', 'ca-cancel');
        cancelBtn.style.display = 'none';
        const status = document.createElement('span');
        status.id = 'ca-status';
        status.textContent = 'No schedule';
        status.style.cssText = 'font-size:12px;color:#aaa;max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';

        p.append(schedBtn, queueBtn, detectBtn, cancelBtn, status);
        document.body.appendChild(p);

        schedBtn.onclick  = () => openModal('sched');
        queueBtn.onclick  = () => openModal('queue');
        detectBtn.onclick = () => {
            if (!parseResetClock()) { showToast('⚠️ No reset time on page', 'warn'); return; }
            openModal('sched', true);
        };
        cancelBtn.onclick = () => { clearSched(); pauseQueue(); showToast('Cancelled', 'info'); };
    }

    // ─── Modal ─────────────────────────────────────────────────────────────────
    function buildModal() {
        if (document.getElementById(MODAL_ID)) return;

        const ov  = document.createElement('div'); ov.id = MODAL_ID;
        const box = document.createElement('div'); box.id = 'ca-box';

        // title
        box.appendChild(Object.assign(document.createElement('h3'), { textContent: '⏰ Claude Automation' }));

        // tab bar
        const tabBar = document.createElement('div'); tabBar.className = 'ca-tabs';
        const tSched = mkBtn('📅 Schedule', 'ca-tab on', { 'data-pane': 'sched' });
        const tQueue = mkBtn('🤖 Queue',    'ca-tab',    { 'data-pane': 'queue' });
        tabBar.append(tSched, tQueue);
        box.appendChild(tabBar);

        // ── Schedule pane ──────────────────────────────────────────────────────
        const sp = el('div', 'ca-pane on', { 'data-pane': 'sched' });

        const urlInp = inp('url',           'ca-url',  'https://…/webhook (optional)');
        const dtInp  = inp('datetime-local','ca-dt');
        dtInp.style.flex = '1';
        const now5   = mkBtn('+5 min', 'ca-btn', { id: 'ca-now5' });
        const dtRow  = row(dtInp, now5);
        const rInfo  = el('div', '', { id: 'ca-reset-info' });
        const autoChk = chk('ca-auto',    '⚡ Auto from reset timer (+5 min) — adapts if timer changes');
        const useCur  = chk('ca-usecur',  '📝 Use current input at send time', true);
        const custArea = el('div', '', { id: 'ca-cust-area', style: 'display:none' });
        const custTa  = Object.assign(document.createElement('textarea'), { id: 'ca-custom', rows: 3, placeholder: 'Custom message…', className: 'ca-inp' });
        custArea.append(lbl('✏️ Custom message'), custTa);
        const sendChk = chk('ca-clicksend', "🖱️ Click Claude's send button", true);

        const sRow = el('div', 'ca-row', { style: 'justify-content:flex-end;margin-top:4px' });
        const cBtn = mkBtn('Cancel',     'ca-btn', { id: 'ca-mc' });
        const sBtn = mkBtn('Schedule →', 'ca-btn', { id: 'ca-save' });
        sRow.append(cBtn, sBtn);

        sp.append(lbl('🌐 Webhook URL'), urlInp, hr(), lbl('📅 Send at'), dtRow, rInfo, autoChk, hr(), useCur, custArea, sendChk, hr(), sRow);

        // ── Queue pane ─────────────────────────────────────────────────────────
        const qp = el('div', 'ca-pane', { 'data-pane': 'queue' });

        const msgTa = Object.assign(document.createElement('textarea'), {
            id: 'ca-q-msgs', rows: 7,
            placeholder: 'One prompt per line:\nExplain quantum computing\nGive a Python code example\nWhat are practical limits?',
            className: 'ca-inp',
        });
        const importBtn = mkBtn('📥 Import JSON', 'ca-btn', { id: 'ca-q-import' });
        const exportBtn = mkBtn('📤 Export JSON', 'ca-btn', { id: 'ca-q-export' });
        const qUrlInp = inp('url', 'ca-q-url', 'Webhook URL per message (optional)');
        const minInp  = Object.assign(document.createElement('input'), { type: 'number', id: 'ca-q-min', value: '30',  min: '5',  className: 'ca-num' });
        const maxInp  = Object.assign(document.createElement('input'), { type: 'number', id: 'ca-q-max', value: '120', min: '10', className: 'ca-num' });
        const waitChk = chk('ca-q-wait', '⏳ Wait for Claude to finish before next message', true);

        const delRow = el('div', 'ca-row');
        delRow.append(txt('⏱ Delay between messages: '), minInp, txt('s –'), maxInp, txt('s (random)'));

        const progLine = el('div', 'ca-row');
        const progSpan = el('span', '', { id: 'ca-q-prog' }); progSpan.textContent = 'No messages';
        progLine.append(lbl('Progress: '), progSpan);

        const qBtnRow   = el('div', 'ca-row');
        const qReset    = mkBtn('↺ Reset',   'ca-btn', { id: 'ca-q-reset' });
        const qStart    = mkBtn('▶ Start',   'ca-btn', { id: 'ca-q-start' });
        const qPause    = mkBtn('⏸ Pause',   'ca-btn', { id: 'ca-q-pause' });
        const qResum    = mkBtn('▶ Resume',  'ca-btn', { id: 'ca-q-resum' });
        const qSave     = mkBtn('💾 Save queue', 'ca-btn', { id: 'ca-q-save' });
        qPause.style.display = qResum.style.display = 'none';
        qBtnRow.append(qReset, qStart, qPause, qResum, qSave);

        qp.append(lbl('📋 Messages (one per line)'), msgTa, row(importBtn, exportBtn), hr(),
            lbl('🌐 Webhook per message (optional)'), qUrlInp, delRow, waitChk, hr(), progLine, qBtnRow);

        box.append(tabBar, sp, qp);
        ov.appendChild(box);
        document.body.appendChild(ov);

        // ── Event wiring ──────────────────────────────────────────────────────
        ov.addEventListener('click', e => { if (e.target === ov) ov.style.display = 'none'; });

        // tab switching
        [tSched, tQueue].forEach(t => t.addEventListener('click', () => {
            document.querySelectorAll('.ca-tab').forEach(x => x.classList.toggle('on', x === t));
            document.querySelectorAll('.ca-pane').forEach(p => p.classList.toggle('on', p.dataset.pane === t.dataset.pane));
        }));

        // schedule pane
        cBtn.onclick = () => { ov.style.display = 'none'; };
        now5.onclick = () => {
            const d = new Date(); d.setMinutes(d.getMinutes() + 5);
            dtInp.value = toLocalDT(d);
            document.getElementById('ca-auto').checked = false;
            dtInp.disabled = false; dtInp.style.opacity = '';
        };
        document.getElementById('ca-usecur').addEventListener('change', e => {
            custArea.style.display = e.target.checked ? 'none' : 'block';
        });
        document.getElementById('ca-auto').addEventListener('change', e => {
            if (!e.target.checked) { dtInp.disabled = false; dtInp.style.opacity = ''; rInfo.style.display = 'none'; return; }
            const clock = parseResetClock();
            if (!clock) { e.target.checked = false; showToast('⚠️ No reset time detected', 'warn'); return; }
            const target = getTargetDate(clock);
            dtInp.value = toLocalDT(target); dtInp.disabled = true; dtInp.style.opacity = '0.45';
            rInfo.textContent = `⏱ Reset at ${clock.h}:${p2(clock.min)} → sending at ${target.toLocaleTimeString()}`;
            rInfo.style.display = 'block';
        });
        sBtn.onclick = () => {
            const webhookUrl      = document.getElementById('ca-url').value.trim();
            const useCurrentInput = document.getElementById('ca-usecur').checked;
            const customMessage   = document.getElementById('ca-custom').value.trim();
            const clickSendBtn    = document.getElementById('ca-clicksend').checked;
            const isAuto          = document.getElementById('ca-auto').checked;
            if (!webhookUrl && !clickSendBtn) { showToast('⚠️ Provide webhook or enable click-send', 'warn'); return; }
            if (clickSendBtn && !useCurrentInput && !customMessage) { showToast('⚠️ Message required for click-send', 'warn'); return; }
            let targetDate;
            if (isAuto) {
                targetDate = getTargetDate(parseResetClock());
                if (!targetDate || targetDate <= new Date()) { showToast('⚠️ Invalid auto time', 'warn'); return; }
            } else {
                const v = dtInp.value;
                if (!v) { showToast('⚠️ Select date/time', 'warn'); return; }
                targetDate = new Date(v);
                if (isNaN(targetDate) || targetDate <= new Date()) { showToast('⚠️ Invalid or past date', 'warn'); return; }
            }
            if (scheduleAt(targetDate, { webhookUrl, useCurrentInput, customMessage, clickSendBtn, isAuto, retryCount: 0 }))
                ov.style.display = 'none';
        };

        // queue pane
        qSave.onclick = () => {
            const lines = msgTa.value.split('\n').map(s => s.trim()).filter(Boolean);
            if (!lines.length) { showToast('⚠️ Enter at least one message', 'warn'); return; }
            applyQueueSettings(lines);
            saveQRT(); refreshQueueUI();
            showToast(`✅ Queue saved: ${lines.length} messages`, 'success');
        };
        importBtn.onclick = () => {
            const raw = prompt('Paste JSON array of strings:');
            if (!raw) return;
            try {
                const arr = JSON.parse(raw);
                if (!Array.isArray(arr)) throw 0;
                qRT.messages = arr.map(String); qRT.index = 0;
                saveQRT(); msgTa.value = qRT.messages.join('\n'); refreshQueueUI();
                showToast(`✅ Imported ${arr.length} messages`, 'success');
            } catch { showToast('⚠️ Invalid JSON array', 'error'); }
        };
        exportBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([JSON.stringify(qRT.messages, null, 2)], { type: 'application/json' }));
            a.download = 'claude-queue.json'; a.click();
            URL.revokeObjectURL(a.href);
        };
        qStart.onclick = () => { applyQueueSettings(); startQueue(); ov.style.display = 'none'; };
        qPause.onclick = () => pauseQueue();
        qResum.onclick = () => {
            applyQueueSettings(); qRT.active = true; saveQRT(); refreshQueueUI();
            runQueueStep(); ov.style.display = 'none';
        };
        qReset.onclick = () => {
            if (!confirm('Reset queue progress to message 1?')) return;
            resetQueueIdx();
        };

        function applyQueueSettings(lines) {
            if (lines?.length) qRT.messages = lines;
            qRT.minDelay   = Math.max(5,  +minInp.value || 30);
            qRT.maxDelay   = Math.max(10, +maxInp.value || 120);
            qRT.waitResp   = document.getElementById('ca-q-wait').checked;
            qRT.webhookUrl = qUrlInp.value.trim();
        }
    }

    // ─── DOM mini-helpers (used only during modal construction) ───────────────
    function el(tag, cls = '', attrs = {}) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        for (const [k, v] of Object.entries(attrs)) {
            if (k === 'style') e.style.cssText = v;
            else e.setAttribute(k, v);
        }
        return e;
    }
    function mkBtn(text, cls, attrs = {}) {
        const b = el('button', cls, attrs);
        b.textContent = text;
        return b;
    }
    function inp(type, id, placeholder = '') {
        return Object.assign(document.createElement('input'), { type, id, placeholder, className: 'ca-inp' });
    }
    function lbl(text) { return Object.assign(document.createElement('label'), { className: 'ca-lbl', textContent: text }); }
    function hr()      { return el('hr', 'ca-hr'); }
    function row(...ch){ const r = el('div','ca-row'); ch.forEach(c => r.appendChild(c)); return r; }
    function txt(t)    { return document.createTextNode(t); }
    function chk(id, label, checked = false) {
        const w = el('div', 'ca-chk');
        const i = Object.assign(document.createElement('input'), { type: 'checkbox', id, checked });
        const l = Object.assign(document.createElement('label'), { htmlFor: id, textContent: label });
        w.append(i, l); return w;
    }

    // ─── Open modal (pre-fill from state) ─────────────────────────────────────
    function openModal(tab = 'sched', autoDetect = false) {
        const ov = document.getElementById(MODAL_ID);
        if (!ov) return;

        document.querySelectorAll('.ca-tab').forEach(t => t.classList.toggle('on', t.dataset.pane === tab));
        document.querySelectorAll('.ca-pane').forEach(p => p.classList.toggle('on', p.dataset.pane === tab));

        // Pre-fill schedule tab
        const s = stLoad(SCHED_KEY);
        document.getElementById('ca-url').value       = s?.webhookUrl || '';
        document.getElementById('ca-usecur').checked  = s ? s.useCurrentInput !== false : true;
        document.getElementById('ca-custom').value    = s?.customMessage || '';
        document.getElementById('ca-cust-area').style.display = (s && !s.useCurrentInput) ? 'block' : 'none';
        document.getElementById('ca-clicksend').checked = s ? s.clickSendBtn !== false : true;
        document.getElementById('ca-auto').checked    = s?.isAuto || false;
        document.getElementById('ca-reset-info').style.display = 'none';
        const dt = document.getElementById('ca-dt');
        if (s?.ts) {
            dt.value = toLocalDT(new Date(s.ts));
            dt.disabled = !!s.isAuto; dt.style.opacity = s.isAuto ? '0.45' : '';
        } else {
            const d = new Date(); d.setMinutes(d.getMinutes() + 5);
            dt.value = toLocalDT(d); dt.disabled = false; dt.style.opacity = '';
        }

        // Pre-fill queue tab
        document.getElementById('ca-q-msgs').value = qRT.messages.join('\n');
        document.getElementById('ca-q-min').value  = qRT.minDelay;
        document.getElementById('ca-q-max').value  = qRT.maxDelay;
        document.getElementById('ca-q-wait').checked = qRT.waitResp;
        document.getElementById('ca-q-url').value  = qRT.webhookUrl || '';
        refreshQueueUI();

        ov.style.display = 'flex';
        if (autoDetect) {
            document.getElementById('ca-auto').checked = true;
            setTimeout(() => document.getElementById('ca-auto').dispatchEvent(new Event('change')), 60);
        }
    }

    // ─── Keyboard shortcuts ────────────────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (!e.altKey || !e.shiftKey) return;
        if (e.key === 'S') { e.preventDefault(); openModal('sched'); }
        if (e.key === 'Q') { e.preventDefault(); openModal('queue'); }
    });

    // ─── Init & SPA guard ─────────────────────────────────────────────────────
    function ensureUI() {
        if (!document.body) return;
        injectStyles(); buildPanel(); buildModal(); refreshQueueUI();
    }

    function init() {
        ensureUI();
        restoreSchedIfSaved();
        restoreQueueIfActive();

        const origPush    = history.pushState.bind(history);
        const origReplace = history.replaceState.bind(history);
        history.pushState    = (...a) => { origPush(...a);    setTimeout(ensureUI, 200); };
        history.replaceState = (...a) => { origReplace(...a); setTimeout(ensureUI, 200); };
        window.addEventListener('popstate', () => setTimeout(ensureUI, 200));
        setInterval(ensureUI, 5_000);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
