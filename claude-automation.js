// ==UserScript==
// @name         Claude Automation – Smart Scheduler & Auto-Send
// @namespace    https://github.com/achma-learning/userscripts
// @version      8.0.0
// @description  Auto-detects Claude's usage-limit reset time, schedules message sends, retries intelligently on failure, and adapts when the reset clock changes on the page.
// @author       achma-learning
// @license      MIT
// @match        https://claude.ai/*
// @icon         https://claude.ai/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==

// Architecture:
//   State       – schedule data persisted via GM_setValue / GM_getValue
//   Detection   – MutationObserver scans limit banners for HH:MM reset clock
//                 (supports French "Réinitialisation" and English "resets at")
//   Scheduler   – single setTimeout per schedule; replaces itself on timer change
//   Retry FSM   – on warning detected: retry #1 after 1h15m, retry #2 after 5h5m
//   UI          – floating pill + modal, toast notifications, Alt+Shift+S shortcut

(() => {
    'use strict';

    if (window.__CLAUDE_AUTOMATION_LOADED__) return;
    window.__CLAUDE_AUTOMATION_LOADED__ = true;

    // ─── Constants ────────────────────────────────────────────────────────────
    const STORAGE_KEY  = 'claudeAutomation_v8';
    const PANEL_ID     = 'ca-panel';
    const MODAL_ID     = 'ca-modal';
    const TOAST_ID     = 'ca-toast';
    const STYLES_ID    = 'ca-styles';

    // 1h15m = 4 500 000 ms, 5h5m = 18 300 000 ms
    const RETRY_DELAYS_MS = [75 * 60_000, 305 * 60_000];

    // ─── Storage ──────────────────────────────────────────────────────────────
    function storageSave(key, value) {
        GM_setValue(key, value === null ? '' : JSON.stringify(value));
    }
    function storageLoad(key) {
        const raw = GM_getValue(key, '');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    }

    // ─── Reset-clock detection ────────────────────────────────────────────────
    // Matches "Réinitialisation à 14:30", "resets at 2:00", "Usage limit resets 09:15"
    const CLOCK_PATTERNS = [
        /r[ée]initialisation[^0-9]*(\d{1,2}):(\d{2})/i,
        /resets?\s+at\s+(\d{1,2}):(\d{2})/i,
        /resets?\s+(\d{1,2}):(\d{2})/i,
        /usage\s+limit[^0-9]*(\d{1,2}):(\d{2})/i,
    ];

    function findLimitText() {
        // Prefer semantic warning containers
        const seats = document.querySelectorAll(
            '[data-color-context="warning"],[role="alert"],[data-testid*="limit"],[class*="usage"],[class*="limit"]'
        );
        for (const el of seats) {
            const t = el.innerText || '';
            if (/r[ée]initialisatio|resets?|usage.?limit|limite de messages/i.test(t)) return t;
        }
        // Walk text nodes as fallback
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const t = node.textContent;
            if (/r[ée]initialisatio|resets?|usage.?limit|limite de messages/i.test(t)) return t;
        }
        return null;
    }

    function parseResetClock() {
        const text = findLimitText();
        if (!text) return null;
        for (const pattern of CLOCK_PATTERNS) {
            const m = text.match(pattern);
            if (m) {
                const h   = parseInt(m[1], 10);
                const min = parseInt(m[2], 10);
                if (h >= 0 && h <= 23 && min >= 0 && min <= 59) return { h, min };
            }
        }
        return null;
    }

    function getTargetDate(clock, plusMinutes = 5) {
        if (!clock) return null;
        const t = new Date();
        t.setHours(clock.h, clock.min, 0, 0);
        if (t <= new Date()) t.setDate(t.getDate() + 1);
        t.setMinutes(t.getMinutes() + plusMinutes);
        return t;
    }

    // ─── Input & send-button helpers ──────────────────────────────────────────
    const INPUT_SELECTORS = [
        'div[contenteditable="true"].ProseMirror',
        'div[contenteditable="true"][data-placeholder]',
        'div[contenteditable="true"]',
        'textarea[name="message"]',
        'textarea',
    ];
    const SEND_SELECTORS = [
        'button[aria-label="Send message"]',
        'button[aria-label="Envoyer le message"]',
        'button[aria-label*="send" i]',
        'button[type="submit"]',
    ];

    function getInput() {
        for (const sel of INPUT_SELECTORS) {
            const el = document.querySelector(sel);
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
            const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
            setter.call(el, text);
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return true;
    }

    function clickSend() {
        for (const sel of SEND_SELECTORS) {
            const btn = document.querySelector(sel);
            if (btn && !btn.disabled) { btn.click(); return true; }
        }
        return false;
    }

    function isLimitActive() {
        return findLimitText() !== null;
    }

    // ─── Webhook ──────────────────────────────────────────────────────────────
    function sendWebhook(url, message) {
        if (!url) return;
        GM_xmlhttpRequest({
            method   : 'POST',
            url,
            headers  : { 'Content-Type': 'application/json' },
            data     : JSON.stringify({ message, source: 'claude-automation', ts: new Date().toISOString() }),
            timeout  : 15_000,
            onload   : r  => console.log(`[CA] Webhook ${r.status}`),
            onerror  : () => console.error('[CA] Webhook error'),
            ontimeout: () => console.error('[CA] Webhook timeout'),
        });
    }

    // ─── Scheduler state ──────────────────────────────────────────────────────
    let scheduledTask     = null;
    let countdownInterval = null;
    let timerObserver     = null;
    let lastClockKey      = null;
    let currentAutoData   = null;

    function loadSchedule()  { return storageLoad(STORAGE_KEY); }
    function saveSchedule(d) { storageSave(STORAGE_KEY, d); }

    function clearSchedule() {
        storageSave(STORAGE_KEY, null);
        clearTimeout(scheduledTask);
        clearInterval(countdownInterval);
        scheduledTask = countdownInterval = null;
        stopWatchingTimer();
        updateStatus(null);
    }

    function scheduleAt(targetDate, opts) {
        const delay = targetDate.getTime() - Date.now();
        if (delay <= 0) { showToast('⚠️ Time already passed', 'warn'); return false; }

        const data = { ...opts, ts: targetDate.getTime() };
        saveSchedule(data);
        clearTimeout(scheduledTask);
        scheduledTask = setTimeout(() => executeSchedule(data), delay);
        startCountdown(targetDate.getTime());
        updateStatus(`📅 ${targetDate.toLocaleString()}`);
        if (opts.isAuto) { currentAutoData = data; startWatchingTimer(); }
        return true;
    }

    function executeSchedule(schedule) {
        const { webhookUrl, useCurrentInput, customMessage, clickSendBtn, retryCount = 0 } = schedule;
        const message = useCurrentInput ? getInputText() : (customMessage || '');

        if (webhookUrl) sendWebhook(webhookUrl, message);

        if (clickSendBtn) {
            if (!useCurrentInput && customMessage) setInputText(customMessage);
            setTimeout(() => {
                const sent = clickSend();
                console.log(`[CA] Send button ${sent ? 'clicked ✓' : 'not found'}`);
            }, 600);
        }

        // Wait 2.5 s for the limit warning to appear (or not)
        setTimeout(() => {
            if (isLimitActive()) {
                if (retryCount < RETRY_DELAYS_MS.length) {
                    const delayMs  = RETRY_DELAYS_MS[retryCount];
                    const nextTime = new Date(Date.now() + delayMs);
                    const label    = fmtDuration(delayMs);
                    scheduleAt(nextTime, { ...schedule, retryCount: retryCount + 1, isAuto: false });
                    showToast(`⚠️ Limit active – retry #${retryCount + 1} in ${label}`, 'warn');
                } else {
                    clearSchedule();
                    updateStatus('❌ Max retries reached');
                    showToast('❌ Max retries reached – check Claude manually', 'error');
                }
            } else {
                clearSchedule();
                updateStatus('✅ Sent');
                showToast('✅ Message sent successfully!', 'success');
            }
        }, 2_500);
    }

    // ─── Adaptive timer watcher ───────────────────────────────────────────────
    function startWatchingTimer() {
        if (timerObserver) timerObserver.disconnect();
        let debounce;
        timerObserver = new MutationObserver(() => {
            clearTimeout(debounce);
            debounce = setTimeout(checkTimerChange, 300);
        });
        timerObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
        lastClockKey = null;
    }

    function checkTimerChange() {
        if (!currentAutoData?.isAuto) return;
        const clock = parseResetClock();
        if (!clock) return;
        const key = `${clock.h}:${clock.min}`;
        if (key === lastClockKey) return;
        lastClockKey = key;

        const newTarget = getTargetDate(clock);
        if (!newTarget || newTarget.getTime() === currentAutoData.ts) return;

        console.log(`[CA] Timer changed → ${newTarget.toLocaleString()}`);
        const updated = { ...currentAutoData, ts: newTarget.getTime() };
        currentAutoData = updated;
        saveSchedule(updated);
        clearTimeout(scheduledTask);
        scheduledTask = setTimeout(() => executeSchedule(updated), newTarget.getTime() - Date.now());
        startCountdown(newTarget.getTime());
        updateStatus(`📅 Auto-updated → ${newTarget.toLocaleString()}`);
    }

    function stopWatchingTimer() {
        timerObserver?.disconnect();
        timerObserver = currentAutoData = lastClockKey = null;
    }

    // ─── Countdown ────────────────────────────────────────────────────────────
    function startCountdown(targetTs) {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const diff = targetTs - Date.now();
            if (diff <= 0) { clearInterval(countdownInterval); return; }
            updateStatus(`⏳ ${fmtDuration(diff)}`);
        }, 1_000);
    }

    function fmtDuration(ms) {
        const s   = Math.floor(ms / 1_000);
        const h   = Math.floor(s / 3_600);
        const min = Math.floor((s % 3_600) / 60);
        const sec = s % 60;
        if (h > 0) return `${h}h ${String(min).padStart(2,'0')}m ${String(sec).padStart(2,'0')}s`;
        return `${min}m ${String(sec).padStart(2,'0')}s`;
    }

    // ─── Restore saved schedule on page load ──────────────────────────────────
    function restoreIfSaved() {
        const saved = loadSchedule();
        if (!saved) return;
        const now = Date.now();
        if (saved.ts <= now) {
            // Missed by less than 10 s → execute immediately
            if (now - saved.ts < 10_000) executeSchedule(saved);
            else clearSchedule();
            return;
        }
        clearTimeout(scheduledTask);
        scheduledTask = setTimeout(() => executeSchedule(saved), saved.ts - now);
        startCountdown(saved.ts);
        updateStatus(`📅 Restored: ${new Date(saved.ts).toLocaleString()}`);
        if (saved.isAuto) { currentAutoData = saved; startWatchingTimer(); }
    }

    // ─── UI helpers ───────────────────────────────────────────────────────────
    function pad2(n) { return String(n).padStart(2, '0'); }

    function toLocalDT(d) {
        return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    }

    function updateStatus(text) {
        const el = document.getElementById('ca-status');
        if (el) el.textContent = text || 'No schedule';
        const cancelBtn = document.getElementById('ca-cancel');
        if (cancelBtn) {
            const active = text && !text.startsWith('✅') && !text.startsWith('❌') && text !== 'No schedule';
            cancelBtn.style.display = active ? 'inline-block' : 'none';
        }
    }

    function showToast(msg, type = 'info') {
        const COLORS = { info: '#10a37f', warn: '#d97706', error: '#dc2626', success: '#059669' };
        let toast = document.getElementById(TOAST_ID);
        if (!toast) {
            toast = document.createElement('div');
            toast.id = TOAST_ID;
            toast.style.cssText = [
                'position:fixed', 'bottom:165px', 'right:20px', 'z-index:100000',
                'padding:11px 16px', 'border-radius:12px', 'font-family:system-ui',
                'font-size:13px', 'color:#fff', 'max-width:320px', 'line-height:1.45',
                'transition:opacity .3s', 'pointer-events:none', 'box-shadow:0 4px 18px rgba(0,0,0,.45)',
            ].join(';');
            document.body.appendChild(toast);
        }
        toast.style.background = COLORS[type] || COLORS.info;
        toast.style.opacity    = '1';
        toast.textContent      = msg;
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 3_800);
    }

    // ─── Styles ───────────────────────────────────────────────────────────────
    const MODAL_CSS = `
        #${MODAL_ID} {
            position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:100001;
            display:none; align-items:center; justify-content:center;
        }
        #ca-box {
            background:#1a1a2e; border:1px solid #2d2d4e; border-radius:20px;
            padding:28px; width:500px; max-width:92vw; color:#e5e5f0;
            font-family:system-ui; display:flex; flex-direction:column; gap:14px;
            box-shadow:0 8px 40px rgba(0,0,0,.6);
        }
        #ca-box h3 { margin:0; font-size:17px; }
        #ca-box small { color:#666; }
        .ca-label { font-size:13px; color:#aaa; margin-bottom:2px; display:block; }
        .ca-input {
            width:100%; box-sizing:border-box; padding:10px 12px; border-radius:12px;
            border:1px solid #3a3a5e; background:#22223a; color:#e5e5f0; font-size:13px;
        }
        .ca-input:focus { outline:none; border-color:#10a37f; }
        .ca-row { display:flex; align-items:center; gap:10px; }
        .ca-chk-row {
            display:flex; align-items:center; gap:10px;
            font-size:13px; color:#ccc; cursor:pointer;
        }
        .ca-chk-row input { accent-color:#10a37f; width:16px; height:16px; cursor:pointer; }
        .ca-hr { border:none; border-top:1px solid #2d2d4e; margin:0; }
        #ca-reset-info {
            font-size:12px; color:#10a37f; padding:7px 12px;
            background:#0a2218; border-radius:8px; display:none;
        }
        .ca-btn {
            padding:8px 20px; border-radius:30px; border:none;
            cursor:pointer; font-weight:600; font-size:13px;
        }
        #ca-save  { background:#10a37f; color:#fff; }
        #ca-save:hover  { background:#0d8f6d; }
        #ca-modal-close { background:#3a3a5e; color:#fff; }
        #ca-modal-close:hover { background:#4a4a6e; }
        #ca-now5 { background:#3a3a5e; color:#fff; white-space:nowrap; }
        #ca-now5:hover { background:#4a4a6e; }
    `;

    function injectStyles() {
        if (document.getElementById(STYLES_ID)) return;
        const s = document.createElement('style');
        s.id = STYLES_ID;
        s.textContent = MODAL_CSS;
        document.head.appendChild(s);
    }

    // ─── Floating pill panel ──────────────────────────────────────────────────
    function buildPanel() {
        if (document.getElementById(PANEL_ID)) return;

        const panel = document.createElement('div');
        panel.id = PANEL_ID;
        panel.style.cssText = [
            'position:fixed', 'bottom:100px', 'right:20px', 'z-index:99999',
            'display:flex', 'align-items:center', 'gap:10px',
            'background:#12121f', 'border:1px solid #2d2d4e',
            'padding:8px 16px', 'border-radius:40px', 'color:#fff',
            'font-family:system-ui', 'font-size:13px',
            'box-shadow:0 4px 24px rgba(0,0,0,.55)',
        ].join(';');

        const mkBtn = (text, bg, title = '') => {
            const b = document.createElement('button');
            b.textContent = text;
            if (title) b.title = title;
            b.style.cssText = `padding:6px 14px;border-radius:30px;background:${bg};color:#fff;cursor:pointer;border:none;font-weight:600;font-size:13px;`;
            return b;
        };

        const schedBtn  = mkBtn('⏰ Schedule', '#10a37f');
        const detectBtn = mkBtn('🔍 Detect', '#2d2d5e', 'Auto-detect reset time from page');
        const cancelBtn = mkBtn('✕', '#5a2a2a', 'Cancel current schedule');
        cancelBtn.id = 'ca-cancel';
        cancelBtn.style.display = 'none';

        const status = document.createElement('span');
        status.id = 'ca-status';
        status.textContent = 'No schedule';
        status.style.cssText = 'font-size:12px;color:#aaa;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';

        panel.append(schedBtn, detectBtn, cancelBtn, status);
        document.body.appendChild(panel);

        schedBtn.addEventListener('click',  () => openModal(false));
        detectBtn.addEventListener('click', () => {
            const clock = parseResetClock();
            if (!clock) { showToast('⚠️ No reset time detected on page', 'warn'); return; }
            openModal(true);
        });
        cancelBtn.addEventListener('click', () => {
            clearSchedule();
            showToast('Schedule cancelled', 'info');
        });
    }

    // ─── Modal ────────────────────────────────────────────────────────────────
    function buildModal() {
        if (document.getElementById(MODAL_ID)) return;

        const overlay = document.createElement('div');
        overlay.id = MODAL_ID;

        const box = document.createElement('div');
        box.id = 'ca-box';

        // Using textContent / createElement everywhere — no innerHTML with user data
        box.appendChild(Object.assign(document.createElement('h3'), { textContent: '⏰ Claude Automation – Schedule Send' }));

        function row(label, ...children) {
            const wrap = document.createElement('div');
            if (label) {
                const lbl = document.createElement('label');
                lbl.className = 'ca-label';
                lbl.textContent = label;
                wrap.appendChild(lbl);
            }
            children.forEach(c => wrap.appendChild(c));
            return wrap;
        }

        // Webhook URL
        const urlInput = Object.assign(document.createElement('input'), {
            type: 'url', id: 'ca-url', placeholder: 'https://your-server.com/webhook (optional)',
        });
        urlInput.className = 'ca-input';
        box.appendChild(row('🌐 Webhook URL', urlInput));

        // Divider
        box.appendChild(Object.assign(document.createElement('hr'), { className: 'ca-hr' }));

        // DateTime + +5 min button
        const dtInput = Object.assign(document.createElement('input'), { type: 'datetime-local', id: 'ca-dt' });
        dtInput.className = 'ca-input';
        dtInput.style.flex = '1';
        const now5Btn = Object.assign(document.createElement('button'), { id: 'ca-now5', textContent: '+5 min', className: 'ca-btn' });
        const dtRow = document.createElement('div');
        dtRow.className = 'ca-row';
        dtRow.append(dtInput, now5Btn);
        box.appendChild(row('📅 Send at', dtRow));

        // Reset info banner
        const resetInfo = document.createElement('div');
        resetInfo.id = 'ca-reset-info';
        box.appendChild(resetInfo);

        // Auto checkbox
        const autoChk = Object.assign(document.createElement('input'), { type: 'checkbox', id: 'ca-auto' });
        const autoLbl = Object.assign(document.createElement('label'), { htmlFor: 'ca-auto', textContent: '⚡ Auto-detect reset time (+5 min) — adapts if timer changes' });
        const autoRow = document.createElement('div');
        autoRow.className = 'ca-chk-row';
        autoRow.append(autoChk, autoLbl);
        box.appendChild(autoRow);

        box.appendChild(Object.assign(document.createElement('hr'), { className: 'ca-hr' }));

        // Use-current-input checkbox
        const useCurrentChk = Object.assign(document.createElement('input'), { type: 'checkbox', id: 'ca-use-current', checked: true });
        const useCurrentLbl = Object.assign(document.createElement('label'), { htmlFor: 'ca-use-current', textContent: '📝 Use current input text at send time' });
        const useCurrentRow = document.createElement('div');
        useCurrentRow.className = 'ca-chk-row';
        useCurrentRow.append(useCurrentChk, useCurrentLbl);
        box.appendChild(useCurrentRow);

        // Custom message area (hidden by default)
        const customArea = document.createElement('div');
        customArea.id = 'ca-custom-area';
        customArea.style.display = 'none';
        const customTa = Object.assign(document.createElement('textarea'), {
            id: 'ca-custom', rows: 3, placeholder: 'Type your message here…',
        });
        customTa.className = 'ca-input';
        customArea.appendChild(row('✏️ Custom message', customTa));
        box.appendChild(customArea);

        // Click-send checkbox
        const sendChk = Object.assign(document.createElement('input'), { type: 'checkbox', id: 'ca-click-send', checked: true });
        const sendLbl = Object.assign(document.createElement('label'), { htmlFor: 'ca-click-send', textContent: "🖱️ Click Claude's send button" });
        const sendRow = document.createElement('div');
        sendRow.className = 'ca-chk-row';
        sendRow.append(sendChk, sendLbl);
        box.appendChild(sendRow);

        // Action buttons
        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:12px;justify-content:flex-end;margin-top:4px;';
        const closeBtn = Object.assign(document.createElement('button'), { id: 'ca-modal-close', textContent: 'Cancel', className: 'ca-btn' });
        const saveBtn  = Object.assign(document.createElement('button'), { id: 'ca-save', textContent: 'Schedule →', className: 'ca-btn' });
        btnRow.append(closeBtn, saveBtn);
        box.appendChild(btnRow);

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // ── Event wiring ──────────────────────────────────────────────────────
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
        closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });

        now5Btn.addEventListener('click', () => {
            const d = new Date(); d.setMinutes(d.getMinutes() + 5);
            dtInput.value    = toLocalDT(d);
            autoChk.checked  = false;
            dtInput.disabled = false; dtInput.style.opacity = '';
        });

        useCurrentChk.addEventListener('change', () => {
            customArea.style.display = useCurrentChk.checked ? 'none' : 'block';
        });

        autoChk.addEventListener('change', () => {
            if (!autoChk.checked) {
                dtInput.disabled = false; dtInput.style.opacity = '';
                resetInfo.style.display = 'none';
                return;
            }
            const clock = parseResetClock();
            if (!clock) {
                autoChk.checked = false;
                showToast('⚠️ No reset time detected — set time manually', 'warn');
                return;
            }
            const target = getTargetDate(clock);
            dtInput.value    = toLocalDT(target);
            dtInput.disabled = true; dtInput.style.opacity = '0.45';
            resetInfo.textContent = `⏱ Detected reset at ${clock.h}:${pad2(clock.min)} → will send at ${target.toLocaleTimeString()}`;
            resetInfo.style.display = 'block';
        });

        saveBtn.addEventListener('click', () => {
            const webhookUrl    = urlInput.value.trim();
            const useCurrentInput = useCurrentChk.checked;
            const customMessage = customTa.value.trim();
            const clickSendBtn  = sendChk.checked;
            const isAuto        = autoChk.checked;

            if (!webhookUrl && !clickSendBtn) {
                showToast('⚠️ Provide a webhook URL or enable "Click send"', 'warn'); return;
            }
            if (clickSendBtn && !useCurrentInput && !customMessage) {
                showToast('⚠️ A message is required when clicking send', 'warn'); return;
            }

            let targetDate;
            if (isAuto) {
                targetDate = getTargetDate(parseResetClock());
                if (!targetDate) { showToast('⚠️ Cannot detect reset time — use manual', 'warn'); return; }
                if (targetDate <= new Date()) { showToast('⚠️ Computed time is in the past — wait for next reset', 'warn'); return; }
            } else {
                if (!dtInput.value) { showToast('⚠️ Select a date and time', 'warn'); return; }
                targetDate = new Date(dtInput.value);
                if (isNaN(targetDate) || targetDate <= new Date()) { showToast('⚠️ Invalid or past date/time', 'warn'); return; }
            }

            const ok = scheduleAt(targetDate, { webhookUrl, useCurrentInput, customMessage, clickSendBtn, isAuto, retryCount: 0 });
            if (ok) overlay.style.display = 'none';
        });
    }

    function openModal(autoDetect = false) {
        const overlay = document.getElementById(MODAL_ID);
        if (!overlay) return;

        const $ = id => document.getElementById(id);
        const saved = loadSchedule();

        $('ca-url').value          = saved?.webhookUrl || '';
        $('ca-use-current').checked = saved ? saved.useCurrentInput !== false : true;
        $('ca-custom').value        = saved?.customMessage || '';
        $('ca-custom-area').style.display = (saved && !saved.useCurrentInput) ? 'block' : 'none';
        $('ca-click-send').checked  = saved ? saved.clickSendBtn !== false : true;
        $('ca-auto').checked        = saved?.isAuto || false;
        $('ca-reset-info').style.display = 'none';

        const dtInput = $('ca-dt');
        if (saved?.ts) {
            dtInput.value = toLocalDT(new Date(saved.ts));
            if (saved.isAuto) { dtInput.disabled = true; dtInput.style.opacity = '0.45'; }
            else              { dtInput.disabled = false; dtInput.style.opacity = ''; }
        } else {
            const d = new Date(); d.setMinutes(d.getMinutes() + 5);
            dtInput.value    = toLocalDT(d);
            dtInput.disabled = false; dtInput.style.opacity = '';
        }

        overlay.style.display = 'flex';

        // Trigger auto-detect after overlay is visible so parseResetClock can run
        if (autoDetect) {
            $('ca-auto').checked = true;
            setTimeout(() => $('ca-auto').dispatchEvent(new Event('change')), 60);
        }
    }

    // ─── Keyboard shortcut: Alt+Shift+S ───────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.altKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            openModal(false);
        }
    });

    // ─── Init & SPA guard ─────────────────────────────────────────────────────
    function ensureUI() {
        if (!document.body) return;
        injectStyles();
        buildPanel();
        buildModal();
    }

    function init() {
        ensureUI();
        restoreIfSaved();

        // Patch history API so the panel re-appears after SPA navigation
        const origPush    = history.pushState.bind(history);
        const origReplace = history.replaceState.bind(history);
        history.pushState    = (...a) => { origPush(...a);    setTimeout(ensureUI, 200); };
        history.replaceState = (...a) => { origReplace(...a); setTimeout(ensureUI, 200); };
        window.addEventListener('popstate', () => setTimeout(ensureUI, 200));

        // Safety net every 5 s in case React removes injected nodes
        setInterval(ensureUI, 5_000);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
