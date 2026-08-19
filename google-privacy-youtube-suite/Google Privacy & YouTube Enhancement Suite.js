// ==UserScript==
// @name         Google Privacy & YouTube Enhancement Suite
// @namespace    privacy-yt-suite
// @description  Learning-focused all-in-one: Google anti-tracking + clean/web-only search + endless scroll + site blocklist, YouTube old UI + anti-shorts + ad skip/mute + SponsorBlock + resume playback + speed memory + timestamped notes + A-B loop + feed hygiene + study-session timer
// @version      4.0.0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=YouTube.com
// @license      MIT
// @run-at       document-start
// @grant        none
// @noframes
// @match        *://*.google.com/*
// @match        *://*.google.ac/*
// @match        *://*.google.ad/*
// @match        *://*.google.ae/*
// @match        *://*.google.com.af/*
// @match        *://*.google.com.ag/*
// @match        *://*.google.com.ai/*
// @match        *://*.google.al/*
// @match        *://*.google.am/*
// @match        *://*.google.co.ao/*
// @match        *://*.google.com.ar/*
// @match        *://*.google.as/*
// @match        *://*.google.at/*
// @match        *://*.google.com.au/*
// @match        *://*.google.az/*
// @match        *://*.google.ba/*
// @match        *://*.google.com.bd/*
// @match        *://*.google.be/*
// @match        *://*.google.bf/*
// @match        *://*.google.bg/*
// @match        *://*.google.com.bh/*
// @match        *://*.google.bi/*
// @match        *://*.google.bj/*
// @match        *://*.google.com.bn/*
// @match        *://*.google.com.bo/*
// @match        *://*.google.com.br/*
// @match        *://*.google.bs/*
// @match        *://*.google.bt/*
// @match        *://*.google.co.bw/*
// @match        *://*.google.by/*
// @match        *://*.google.com.bz/*
// @match        *://*.google.ca/*
// @match        *://*.google.cd/*
// @match        *://*.google.cf/*
// @match        *://*.google.cg/*
// @match        *://*.google.ch/*
// @match        *://*.google.ci/*
// @match        *://*.google.co.ck/*
// @match        *://*.google.cl/*
// @match        *://*.google.cm/*
// @match        *://*.google.cn/*
// @match        *://*.google.com.co/*
// @match        *://*.google.co.cr/*
// @match        *://*.google.com.cu/*
// @match        *://*.google.cv/*
// @match        *://*.google.com.cy/*
// @match        *://*.google.cz/*
// @match        *://*.google.de/*
// @match        *://*.google.dj/*
// @match        *://*.google.dk/*
// @match        *://*.google.dm/*
// @match        *://*.google.com.do/*
// @match        *://*.google.dz/*
// @match        *://*.google.com.ec/*
// @match        *://*.google.ee/*
// @match        *://*.google.com.eg/*
// @match        *://*.google.es/*
// @match        *://*.google.com.et/*
// @match        *://*.google.fi/*
// @match        *://*.google.com.fj/*
// @match        *://*.google.fm/*
// @match        *://*.google.fr/*
// @match        *://*.google.ga/*
// @match        *://*.google.ge/*
// @match        *://*.google.gg/*
// @match        *://*.google.com.gh/*
// @match        *://*.google.com.gi/*
// @match        *://*.google.gl/*
// @match        *://*.google.gm/*
// @match        *://*.google.gp/*
// @match        *://*.google.gr/*
// @match        *://*.google.com.gt/*
// @match        *://*.google.gy/*
// @match        *://*.google.com.hk/*
// @match        *://*.google.hn/*
// @match        *://*.google.hr/*
// @match        *://*.google.ht/*
// @match        *://*.google.hu/*
// @match        *://*.google.co.id/*
// @match        *://*.google.ie/*
// @match        *://*.google.co.il/*
// @match        *://*.google.im/*
// @match        *://*.google.co.in/*
// @match        *://*.google.iq/*
// @match        *://*.google.is/*
// @match        *://*.google.it/*
// @match        *://*.google.je/*
// @match        *://*.google.com.jm/*
// @match        *://*.google.jo/*
// @match        *://*.google.co.jp/*
// @match        *://*.google.co.ke/*
// @match        *://*.google.com.kh/*
// @match        *://*.google.ki/*
// @match        *://*.google.kg/*
// @match        *://*.google.co.kr/*
// @match        *://*.google.com.kw/*
// @match        *://*.google.kz/*
// @match        *://*.google.la/*
// @match        *://*.google.com.lb/*
// @match        *://*.google.li/*
// @match        *://*.google.lk/*
// @match        *://*.google.co.ls/*
// @match        *://*.google.lt/*
// @match        *://*.google.lu/*
// @match        *://*.google.lv/*
// @match        *://*.google.com.ly/*
// @match        *://*.google.co.ma/*
// @match        *://*.google.md/*
// @match        *://*.google.me/*
// @match        *://*.google.mg/*
// @match        *://*.google.mk/*
// @match        *://*.google.ml/*
// @match        *://*.google.com.mm/*
// @match        *://*.google.mn/*
// @match        *://*.google.ms/*
// @match        *://*.google.com.mt/*
// @match        *://*.google.mu/*
// @match        *://*.google.mv/*
// @match        *://*.google.mw/*
// @match        *://*.google.com.mx/*
// @match        *://*.google.com.my/*
// @match        *://*.google.co.mz/*
// @match        *://*.google.com.na/*
// @match        *://*.google.com.nf/*
// @match        *://*.google.com.ng/*
// @match        *://*.google.com.ni/*
// @match        *://*.google.ne/*
// @match        *://*.google.nl/*
// @match        *://*.google.no/*
// @match        *://*.google.com.np/*
// @match        *://*.google.nr/*
// @match        *://*.google.nu/*
// @match        *://*.google.co.nz/*
// @match        *://*.google.com.om/*
// @match        *://*.google.com.pa/*
// @match        *://*.google.com.pe/*
// @match        *://*.google.com.pg/*
// @match        *://*.google.com.ph/*
// @match        *://*.google.com.pk/*
// @match        *://*.google.pl/*
// @match        *://*.google.pn/*
// @match        *://*.google.com.pr/*
// @match        *://*.google.ps/*
// @match        *://*.google.pt/*
// @match        *://*.google.com.py/*
// @match        *://*.google.com.qa/*
// @match        *://*.google.ro/*
// @match        *://*.google.ru/*
// @match        *://*.google.rw/*
// @match        *://*.google.com.sa/*
// @match        *://*.google.com.sb/*
// @match        *://*.google.sc/*
// @match        *://*.google.se/*
// @match        *://*.google.com.sg/*
// @match        *://*.google.sh/*
// @match        *://*.google.si/*
// @match        *://*.google.sk/*
// @match        *://*.google.com.sl/*
// @match        *://*.google.sn/*
// @match        *://*.google.so/*
// @match        *://*.google.sm/*
// @match        *://*.google.sr/*
// @match        *://*.google.st/*
// @match        *://*.google.com.sv/*
// @match        *://*.google.td/*
// @match        *://*.google.tg/*
// @match        *://*.google.co.th/*
// @match        *://*.google.com.tj/*
// @match        *://*.google.tk/*
// @match        *://*.google.tl/*
// @match        *://*.google.tm/*
// @match        *://*.google.tn/*
// @match        *://*.google.to/*
// @match        *://*.google.com.tr/*
// @match        *://*.google.tt/*
// @match        *://*.google.com.tw/*
// @match        *://*.google.co.tz/*
// @match        *://*.google.com.ua/*
// @match        *://*.google.co.ug/*
// @match        *://*.google.co.uk/*
// @match        *://*.google.com.uy/*
// @match        *://*.google.co.uz/*
// @match        *://*.google.com.vc/*
// @match        *://*.google.co.ve/*
// @match        *://*.google.vg/*
// @match        *://*.google.co.vi/*
// @match        *://*.google.com.vn/*
// @match        *://*.google.vu/*
// @match        *://*.google.ws/*
// @match        *://*.google.rs/*
// @match        *://*.google.co.za/*
// @match        *://*.google.co.zm/*
// @match        *://*.google.co.zw/*
// @match        *://*.google.cat/*
// @match        *://*.google.ng/*
// @match        *://news.google.com/*
// @match        *://*.youtube.com/*
// @match        *://www.youtube-nocookie.com/*
// @match        *://music.youtube.com/*
// @exclude      *://accounts.youtube.com/*
// @exclude      *://www.youtube.com/live_chat_replay*
// @exclude      *://www.youtube.com/persist_identity*
// @exclude      *://studio.youtube.com/*
// @downloadURL https://update.greasyfork.org/scripts/568928/Google%20Privacy%20%20YouTube%20Enhancement%20Suite.user.js
// @updateURL https://update.greasyfork.org/scripts/568928/Google%20Privacy%20%20YouTube%20Enhancement%20Suite.meta.js
// ==/UserScript==

/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║     Google Privacy & YouTube Enhancement Suite v4.0.0            ║
 * ║     A focused system for learning on Google + YouTube            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * DESIGN PRINCIPLE — DEFENCE IN DEPTH
 * ----------------------------------
 * Ad blocking, tracker removal and redirect unwrapping are each implemented
 * as several INDEPENDENT layers rather than one clever mechanism. YouTube and
 * Google change class names, DOM shapes and response formats constantly; any
 * single technique will break. Layers are ordered cheapest-and-deepest first,
 * and none depends on another:
 *
 *   ADS      L0  API      JSON.parse / fetch / XHR / bootstrap payload strip
 *            L1  CSS      static selectors for anything that still renders
 *            L2  DOM      remove ad renderers + their feed wrappers
 *            L3  PLAYER   MutationObserver on the player's class attribute
 *            L4  POLL     adaptive tick (500ms → 2s) as the last resort
 *            L5  NAG      anti-adblock dialogs, matched by wording not class
 *
 *   PRIVACY  P0  intercept redirect pages before they load
 *            P1  strip tracking parameters from the address bar
 *            P2  rewrite links in the DOM (redirect unwrap, params, ping)
 *            P3  Module 1's deep Google link rewriting + referrer policy
 *
 *   SHORTS   S1  redirect a Shorts URL already loaded
 *            S2  rewrite Shorts links before they are ever clicked
 *            S3  CSS removal of shelves, tiles and sidebar entries
 *
 * Every layer is registered through registerLayer(), which catches its
 * exceptions, records them, and keeps the others running. The settings panel
 * shows the live status of all layers under "Diagnostics".
 *
 * MODULES
 * -------
 *   1  Google Anti-Track (Don't Track Me Google v4.30+)
 *   2  YouTube Old Style UI (Non-Rounded Design v6.1.2)
 *   3  YouTube Anti-Shorts + Shorts → normal player
 *   4  YouTube Ad Blocker: layers L0-L5, mute / blur / speed-up / skip
 *   5  YouTube Age Restriction Bypass (v2.5.9)
 *   6  Google Endless Scroll (page-capped, rate-limit aware)
 *   7  YouTube & Google Region Setter
 *   8  YouTube Productivity Tools
 *   9  Remaining Time Display (playback-rate aware)
 *  10  Focus Mode
 *  11  Google Search URL Cleaner + Web-Only results (udm=14)
 *  11b Universal Link Cleaner (layers P0-P2, all matched sites)
 *  12  Google Search Blocklist (uBlacklist-style, with presets)
 *  13  Study Notes — timestamped, per video, exportable as Markdown
 *  14  Resume Playback + per-channel speed memory
 *  15  SponsorBlock Lite (hash-prefix API, off by default)
 *  16  Feed Hygiene — keyword/channel blocklist, watched, Playables, AI
 *  17  Study Session Timer with daily budget HUD
 *  18  A-B Loop + learning shortcuts
 *
 * ─────────────────────────────────────────────────────────────────────
 * v4.0.0 — Layered defence + learning system
 *
 *  FIXED   — Module 1 was dead on every Google page. The v3.4 var→let sweep
 *            put `forceNoReferrer` in a temporal dead zone before its first
 *            read, so setupAggresiveUglyLinkPreventer() threw a ReferenceError
 *            that _safeRun swallowed. Declarations now precede the call.
 *  FIXED   — Shorts redirect mangled any Shorts URL carrying a query:
 *            /shorts/ID?feature=share became /watch?v=ID?feature=share.
 *            Now parsed properly, preserving only `t` and `list`.
 *  FIXED   — waitForElm() called MutationObserver.observe(null) at
 *            document-start, throwing uncaught into the page.
 *  FIXED   — Module 5 and _appendToHead() appended to a null root at
 *            document-start; both now wait for one.
 *  FIXED   — Settings panel could not re-apply anything on YouTube: it runs at
 *            IIFE top level and probed for functions that live inside the
 *            YouTube closure, so every `typeof fn === 'function'` was false.
 *            A YT_HOOKS bridge now publishes them.
 *  FIXED   — Blocklist preset count was hard-coded to 5 and drifted from the
 *            actual preset list; both now read BLOCK_PRESETS.
 *  FIXED   — Endless scroll ignored an existing `start` offset, used the
 *            unreliable body.clientHeight, and hammered Google's /sorry/ wall.
 *
 *  NEW     — Ad layers L0/L2/L3/L5 (see above); L0 removes ad payloads before
 *            any renderer sees them, and chains cleanly with Module 5's own
 *            JSON.parse hook instead of clobbering it.
 *  NEW     — Universal link cleaner (P0-P2) covering YouTube as well as Google
 *  NEW     — Web-only Google results (udm=14): no AI Overview, no carousels
 *  NEW     — Study Notes (Alt+N), Markdown export, per-video copy
 *  NEW     — Resume playback + per-channel playback speed memory
 *  NEW     — SponsorBlock Lite over the privacy-preserving hash-prefix API
 *  NEW     — Feed hygiene: keyword/channel blocklists, hide watched,
 *            hide Playables, hide AI "Ask", disable ambient mode,
 *            open home as Subscriptions, disable autoplay-next
 *  NEW     — Study session timer with a daily watch-time HUD
 *  NEW     — A-B loop (Alt+[ / Alt+] / Alt+\), transcript (Alt+T),
 *            restart (Alt+0), reset session (Alt+R)
 *  NEW     — Settings export/import (localStorage is per-origin, so the
 *            google.com and youtube.com copies cannot see each other)
 *  NEW     — Diagnostics panel showing live layer status
 *
 *  CHANGED — Papyrus toggle became a reading-font picker (off / papyrus /
 *            serif / dyslexia-friendly / system) with a size control.
 *            Default is now OFF; Alt+P cycles instead of toggling.
 *  CHANGED — Gear button now appears on YouTube too, and hides in fullscreen.
 *  CHANGED — Autoplay-next and end cards are disabled by default. This is a
 *            deliberate anti-rabbit-hole default; turn it off in Playback.
 *  CHANGED — Skip-button lookup falls back to matching the visible label, so
 *            it survives class renames and works in non-English UIs.
 *  ADDED   — @noframes: the script no longer runs in every embedded iframe.
 *
 * NOT INCLUDED (deliberately)
 * ---------------------------
 * The ytcfg user-agent marker / video-reload "contract" retry loop found in
 * some ad blockers is omitted: it mutates innertube request context and force
 * reloads the player, which fights Module 5's own innertube unlock requests
 * and breaks age-restricted playback. The layers above cover the same ads
 * without touching request identity.
 */

// ============================================================
// IIFE WRAPPER + DUPLICATE-RUN GUARD
// ============================================================
(() => {
'use strict';

if (window.__PRIVACY_YT_SUITE_LOADED__) return;
window.__PRIVACY_YT_SUITE_LOADED__ = true;

// ============================================================
// SHARED: Domain Detection (computed once, frozen)
// ============================================================
const ENV = Object.freeze({
    hostname: location.hostname,
    isYouTube: /\.youtube\.com$|\.youtube-nocookie\.com$/.test(location.hostname),
    isGoogleDomain: /\.google\.[a-z.]+$/.test(location.hostname) || location.hostname === 'news.google.com',
    isYouTubeDesktop: location.hostname === 'www.youtube.com',
    isYouTubeMobile: location.hostname === 'm.youtube.com',
    isYouTubeMusic: location.hostname === 'music.youtube.com',
    isGoogleSearch: /^(www\.)?google\.[a-z.]+$/.test(location.hostname),
});

// ============================================================
// SHARED: Settings Store (localStorage-based, no GM_ needed)
// ============================================================
const SETTINGS_KEY = '__pyt_suite_settings__';
const SETTINGS_VERSION = 2;
const DEFAULT_SETTINGS = Object.freeze({
    // --- Google ---
    region: '',
    regionEnabled: false,
    endlessGoogle: true,
    endlessMaxPages: 5,
    webOnlyResults: false,       // force udm=14 (classic web results, no AI Overview)
    blockedSites: '',
    presetSocialMedia: false,
    presetAiSlop: false,
    // --- Appearance ---
    fontMode: 'off',             // off | papyrus | serif | dyslexic | system
    fontScale: 18,               // base body px when fontMode !== 'off'
    // --- Playback ---
    autoTheater: false,
    autoFullscreen: false,
    defaultSpeed: 1.0,
    remainingTime: true,
    resumePlayback: true,        // remember & restore watch position
    speedMemory: true,           // remember playback speed per channel
    disableAutoplayNext: true,   // stop the autoplay rabbit hole
    // --- Focus / layout ---
    focusMode: true,
    gridColumns: 5,
    hoverPreviewBlock: true,
    homeToSubs: false,           // redirect youtube.com/ -> /feed/subscriptions
    hideWatched: false,
    hideShorts: true,            // hide Shorts shelves/tiles everywhere
    shortsRedirect: true,        // open any Shorts link in the normal player
    hidePlayables: true,
    hideAiFeatures: true,        // Gemini "Ask" button + AI summaries
    disableAmbient: true,
    ytKeywordBlocklist: '',      // one keyword per line, matched on video titles
    ytChannelBlocklist: '',      // one channel name/handle per line
    // --- Ads / sponsors ---
    adBlur: true,
    adSpeedUp: true,
    sponsorBlock: false,
    sponsorCategories: 'sponsor,selfpromo,interaction,intro,outro,music_offtopic',
    // --- Study tools ---
    notesEnabled: true,
    studySessionMinutes: 0,      // 0 = off
    // --- legacy (migrated) ---
    papyrusFont: false,
    _v: SETTINGS_VERSION,
});

function _loadSettings() {
    try {
        var stored = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        if (stored && typeof stored === 'object') {
            var merged = {};
            for (var k in DEFAULT_SETTINGS) merged[k] = DEFAULT_SETTINGS[k];
            for (var k in stored) if (k in DEFAULT_SETTINGS) merged[k] = stored[k];
            // --- migration: v1 boolean papyrusFont -> v2 fontMode enum ---
            if (!stored._v && stored.papyrusFont === true && !stored.fontMode) merged.fontMode = 'papyrus';
            merged._v = SETTINGS_VERSION;
            return merged;
        }
    } catch(e) {}
    return Object.assign({}, DEFAULT_SETTINGS);
}
function _saveSettings(s) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch(e) {}
}

let SUITE_SETTINGS = _loadSettings();

// ============================================================
// SHARED: Utility functions
// ============================================================
const _idle = typeof requestIdleCallback === 'function'
    ? requestIdleCallback
    : function(cb) { setTimeout(cb, 1); };

// ============================================================
// SHARED: Defence-layer registry
// ============================================================
// Every protection in this script (ads, tracking, redirect unwrapping) is
// implemented as several INDEPENDENT layers. If YouTube changes a class name
// and the CSS layer stops matching, the player-observer layer still fires; if
// the observer is starved, the polling layer still fires; if all DOM layers
// fail, the API layer has already stripped the payload. No layer may throw
// into another — each is wrapped, and failures are recorded, not propagated.
const LAYERS = [];
function registerLayer(group, name, fn) {
    const layer = { group: group, name: name, status: 'idle', errors: 0, lastError: null, hits: 0 };
    LAYERS.push(layer);
    return function() {
        try {
            const r = fn.apply(null, arguments);
            layer.status = 'ok';
            if (r === true) layer.hits++;
            return r;
        } catch (e) {
            layer.errors++;
            layer.status = 'error';
            layer.lastError = (e && e.message) || String(e);
            // Log the first few failures only — a broken layer must not spam
            // the console 4x/second for the lifetime of the tab.
            if (layer.errors <= 3) console.warn('[PrivacySuite] layer ' + group + '/' + name + ' failed:', e);
            return undefined;
        }
    };
}
// Live-apply bridge. The YouTube modules run inside their own closure; they
// publish the handful of functions the settings panel needs to call after a
// save, so applying a setting does not require a page reload.
const YT_HOOKS = {};

function layerReport() {
    return LAYERS.map(function(l) {
        return l.group + '/' + l.name + ': ' + l.status + (l.hits ? ' (' + l.hits + ')' : '') + (l.errors ? ' [' + l.errors + ' err]' : '');
    });
}

function _safeRun(label, fn) {
    try { fn(); }
    catch (e) { console.error('[PrivacySuite] ' + label + ' error:', e); }
}

// At @run-at document-start neither <head> nor even <html> is guaranteed to
// exist yet — it depends on the engine and on how early the injection lands.
// Appending blindly throws there and kills every module below this line, so
// queue instead and flush the moment a root appears.
const _pendingHeadNodes = [];
let _headFlushTimer = null;

function _appendToHead(el) {
    const root = document.head || document.documentElement;
    if (root) { root.appendChild(el); return true; }
    if (_pendingHeadNodes.indexOf(el) === -1) _pendingHeadNodes.push(el);
    _flushHeadQueue();
    return false;
}

function _flushHeadQueue() {
    if (_headFlushTimer) return;
    _headFlushTimer = setInterval(function() {
        const root = document.head || document.documentElement;
        if (!root) return;
        while (_pendingHeadNodes.length) root.appendChild(_pendingHeadNodes.shift());
        clearInterval(_headFlushTimer);
        _headFlushTimer = null;
    }, 10);
}

// ============================================================
// SHARED: MutationObserver consolidation
// ============================================================
// Modules 1, 4, and 12 all need childList+subtree on document.body.
// Consolidate into a single observer to reduce overhead.
const _sharedObserverCallbacks = [];
let _sharedObserver = null;

function registerMutationCallback(fn) {
    _sharedObserverCallbacks.push(fn);
    _startSharedObserver();
}

function _startSharedObserver() {
    if (_sharedObserver || !document.body) return;
    _sharedObserver = new MutationObserver(function(mutations) {
        for (let i = 0; i < _sharedObserverCallbacks.length; i++) {
            try { _sharedObserverCallbacks[i](mutations); } catch(e) {}
        }
    });
    _sharedObserver.observe(document.body, { childList: true, subtree: true });
}

// Retry starting the shared observer once body is available
if (document.body) _startSharedObserver();
else document.addEventListener('DOMContentLoaded', _startSharedObserver, { once: true });


// ============================================================
// GLOBAL: Settings Panel + Gear Button (works on ALL pages)
// ============================================================
// This section is hoisted above modules so Ctrl+? works everywhere
// (Google Search, YouTube, etc.) — not gated behind ENV.isYouTube.

let _settingsOverlay = null;
let _gearButton = null;

// --- Global CSS for settings panel + gear button ---
// Injected on ALL matched pages (Google + YouTube)
const _globalStyleEl = document.createElement('style');
_globalStyleEl.id = '__pyt_suite_global_styles';
_globalStyleEl.textContent = `
/* === FLOATING GEAR BUTTON === */
#pyt-gear-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 46px;
    height: 46px;
    background: rgba(33, 33, 33, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    cursor: pointer;
    z-index: 99998;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
    opacity: 0.7;
}
#pyt-gear-btn:hover {
    background: rgba(255, 68, 68, 0.92);
    transform: rotate(90deg) scale(1.08);
    box-shadow: 0 4px 20px rgba(255, 68, 68, 0.4);
    opacity: 1;
}
#pyt-gear-btn svg {
    width: 22px;
    height: 22px;
    fill: #ccc;
    transition: fill 0.2s;
}
#pyt-gear-btn:hover svg {
    fill: #fff;
}
/* Hide gear during fullscreen */
:fullscreen #pyt-gear-btn,
::backdrop #pyt-gear-btn,
.ytp-fullscreen #pyt-gear-btn {
    display: none !important;
}

/* === SETTINGS PANEL OVERLAY === */
#pyt-settings-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); z-index: 999999; display: none;
    justify-content: center; align-items: center; font-family: 'Roboto', Arial, sans-serif;
}
#pyt-settings-overlay.active { display: flex; }
#pyt-settings-panel {
    background: #212121; color: #eee; border-radius: 12px; padding: 28px 32px;
    min-width: 400px; max-width: 480px; max-height: 85vh; overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
#pyt-settings-panel h2 { margin: 0 0 20px 0; font-size: 18px; color: #ff4444; font-weight: 500; }
.pyt-setting-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #333; }
.pyt-setting-row:last-child { border-bottom: none; }
.pyt-setting-label { font-size: 14px; }
.pyt-setting-desc { font-size: 11px; color: #888; margin-top: 2px; }
.pyt-toggle { position: relative; width: 40px; height: 22px; cursor: pointer; flex-shrink: 0; }
.pyt-toggle input { opacity: 0; width: 0; height: 0; }
.pyt-toggle .slider { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #555; border-radius: 22px; transition: 0.2s; }
.pyt-toggle .slider::before { content: ""; position: absolute; height: 16px; width: 16px; left: 3px; bottom: 3px; background: #ccc; border-radius: 50%; transition: 0.2s; }
.pyt-toggle input:checked + .slider { background: #ff4444; }
.pyt-toggle input:checked + .slider::before { transform: translateX(18px); background: #fff; }
.pyt-select { background: #333; color: #eee; border: 1px solid #555; border-radius: 4px; padding: 4px 8px; font-size: 13px; outline: none; }
.pyt-input { background: #333; color: #eee; border: 1px solid #555; border-radius: 4px; padding: 4px 8px; font-size: 13px; width: 60px; text-align: center; outline: none; text-transform: uppercase; }
#pyt-settings-close { display: block; margin: 18px auto 0; padding: 8px 28px; background: #ff4444; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
#pyt-settings-close:hover { background: #cc3333; }
.pyt-shortcut-hint { text-align: center; font-size: 11px; color: #666; margin-top: 12px; }
.pyt-section-title { font-size: 13px; color: #ff4444; text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 6px 0; padding-top: 8px; border-top: 1px solid #444; }
.pyt-blocklist-textarea { width: 100%; min-height: 80px; max-height: 160px; background: #2a2a2a; color: #ddd; border: 1px solid #555; border-radius: 4px; padding: 8px; font-size: 12px; font-family: 'Consolas', 'Monaco', monospace; resize: vertical; outline: none; box-sizing: border-box; line-height: 1.5; }
.pyt-blocklist-textarea:focus { border-color: #ff4444; }
.pyt-blocklist-textarea::placeholder { color: #666; }
.pyt-preset-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; }
.pyt-preset-name { font-size: 13px; color: #ccc; }
.pyt-preset-sites { font-size: 10px; color: #666; margin-top: 2px; }
.pyt-blocklist-count { font-size: 11px; color: #888; margin-top: 4px; }
`;
_globalStyleEl.textContent += `
/* === TOAST === */
#pyt-toast {
    position: fixed; bottom: 84px; right: 24px; z-index: 99999;
    max-width: 340px; padding: 10px 16px;
    background: rgba(20,20,20,0.94); color: #fff;
    border: 1px solid rgba(255,255,255,0.14); border-radius: 8px;
    font: 13px/1.45 Roboto, Arial, sans-serif;
    opacity: 0; transform: translateY(8px);
    transition: opacity .18s ease, transform .18s ease;
    pointer-events: none;
}
#pyt-toast.shown { opacity: 1; transform: translateY(0); }

/* === STUDY SESSION HUD === */
#pyt-hud {
    position: fixed; top: 64px; right: 16px; z-index: 99997;
    padding: 5px 11px; border-radius: 999px;
    background: rgba(20,20,20,0.82); color: #d7d7d7;
    border: 1px solid rgba(255,255,255,0.12);
    font: 12px/1 Roboto, Arial, sans-serif; letter-spacing: .3px;
    cursor: default; user-select: none;
}
#pyt-hud.over { background: rgba(190,32,32,0.92); color: #fff; }
html.pyt-fullscreen #pyt-hud, html.pyt-fullscreen #pyt-gear-btn { display: none !important; }

/* === PANEL: secondary buttons row === */
.pyt-btn-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.pyt-btn-row button {
    flex: 1 1 auto; min-width: 120px; padding: 7px 10px; cursor: pointer;
    background: #2a2a2a; color: #eee; border: 1px solid #444; border-radius: 6px;
    font: 12px Roboto, Arial, sans-serif;
}
.pyt-btn-row button:hover { background: #383838; }
`;
_appendToHead(_globalStyleEl);

// Hide floating chrome while a video is fullscreen (gear + HUD would overlay it)
document.addEventListener('fullscreenchange', function() {
    document.documentElement.classList.toggle('pyt-fullscreen', !!document.fullscreenElement);
});

// ============================================================
// SHARED: Blocklist presets (single source of truth for panel + matcher)
// ============================================================
const BLOCK_PRESETS = Object.freeze({
    presetSocialMedia: ['facebook.com', 'instagram.com', 'tiktok.com', 'x.com', 'twitter.com', 'pinterest.com', 'reddit.com'],
    presetAiSlop: ['medium.com', 'quora.com', 'geeksforgeeks.org', 'w3schools.com', 'tutorialspoint.com', 'javatpoint.com', 'coursehero.com', 'chegg.com', 'scribd.com'],
});
function activePresetDomains() {
    let out = [];
    for (const key in BLOCK_PRESETS) if (SUITE_SETTINGS[key]) out = out.concat(BLOCK_PRESETS[key]);
    return out;
}

// --- Reading Font System ---
// One toggleable <style> element driven by CSS custom properties, so switching
// font mode is a single attribute + variable write (no CSS rebuild, no reload).
const FONT_MODES = {
    off:      { label: 'Off (site default)', family: '' },
    papyrus:  { label: 'Papyrus',            family: 'Papyrus, "Papyrus Condensed", fantasy' },
    serif:    { label: 'Reading serif',      family: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif' },
    dyslexic: { label: 'Dyslexia friendly',  family: '"OpenDyslexic", "Atkinson Hyperlegible", "Comic Sans MS", Verdana, sans-serif' },
    system:   { label: 'System (size only)', family: '' },
};

const _fontStyleEl = document.createElement('style');
_fontStyleEl.id = '__pyt_reading_font';
_fontStyleEl.textContent = [
    '/* === READING FONT MODE === */',
    'html[data-pyt-font] body, html[data-pyt-font] div, html[data-pyt-font] p,',
    'html[data-pyt-font] span, html[data-pyt-font] a, html[data-pyt-font] li,',
    'html[data-pyt-font] td, html[data-pyt-font] th, html[data-pyt-font] input,',
    'html[data-pyt-font] textarea, html[data-pyt-font] select, html[data-pyt-font] button,',
    'html[data-pyt-font] h1, html[data-pyt-font] h2, html[data-pyt-font] h3,',
    'html[data-pyt-font] h4, html[data-pyt-font] h5, html[data-pyt-font] h6,',
    'html[data-pyt-font] label, html[data-pyt-font] cite, html[data-pyt-font] em,',
    'html[data-pyt-font] strong, html[data-pyt-font] blockquote,',
    'html[data-pyt-font] figcaption, html[data-pyt-font] article,',
    'html[data-pyt-font] section, html[data-pyt-font] header, html[data-pyt-font] footer,',
    'html[data-pyt-font] nav, html[data-pyt-font] aside, html[data-pyt-font] main,',
    'html[data-pyt-font] yt-formatted-string, html[data-pyt-font] #video-title {',
    '    font-family: var(--pyt-font-family, inherit) !important;',
    '}',
    '/* Never restyle code or the player chrome — monospace and controls must stay legible */',
    'html[data-pyt-font] pre, html[data-pyt-font] code, html[data-pyt-font] kbd,',
    'html[data-pyt-font] .html5-video-player, html[data-pyt-font] .html5-video-player * {',
    '    font-family: revert !important;',
    '}',
    'html[data-pyt-font] body {',
    '    font-size: var(--pyt-font-size, 18px) !important;',
    '    line-height: 1.6 !important;',
    '}',
    '/* Google search result titles + snippets */',
    'html[data-pyt-font] h3, html[data-pyt-font] .LC20lb { font-size: calc(var(--pyt-font-size, 18px) + 4px) !important; }',
    'html[data-pyt-font] .g .VwiC3b, html[data-pyt-font] .g .IsZvec,',
    'html[data-pyt-font] .g .yXK7lf, html[data-pyt-font] [data-sncf] {',
    '    font-size: calc(var(--pyt-font-size, 18px) - 2px) !important;',
    '    line-height: 1.55 !important;',
    '}',
    '/* Our own UI must never inherit the reading font */',
    '#pyt-settings-panel, #pyt-settings-panel *, #pyt-toast, #pyt-hud, #pyt-hud * {',
    '    font-family: "Roboto", Arial, sans-serif !important;',
    '}'
].join('\n');
_appendToHead(_fontStyleEl);

function applyFontMode() {
    const root = document.documentElement;
    if (!root) { document.addEventListener('DOMContentLoaded', applyFontMode, { once: true }); return; }
    const mode = SUITE_SETTINGS.fontMode || 'off';
    if (mode === 'off' || !FONT_MODES[mode]) {
        root.removeAttribute('data-pyt-font');
        root.style.removeProperty('--pyt-font-family');
        root.style.removeProperty('--pyt-font-size');
        return;
    }
    root.setAttribute('data-pyt-font', mode);
    const fam = FONT_MODES[mode].family;
    if (fam) root.style.setProperty('--pyt-font-family', fam);
    else root.style.removeProperty('--pyt-font-family');
    root.style.setProperty('--pyt-font-size', (SUITE_SETTINGS.fontScale || 18) + 'px');
}

// Back-compat alias: Alt+P and older call sites still reference this name.
function applyPapyrusFont() { applyFontMode(); }

// Apply immediately — attributes on <html> are settable at document-start
applyFontMode();


// ============================================================
// SHARED: Toast notifications (used by resume / sponsor / notes)
// ============================================================
let _toastEl = null, _toastTimer = null;
function showToast(msg, ms) {
    if (!document.body) return;
    if (!_toastEl) {
        _toastEl = document.createElement('div');
        _toastEl.id = 'pyt-toast';
        document.body.appendChild(_toastEl);
    }
    _toastEl.textContent = msg;
    _toastEl.classList.add('shown');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function() { if (_toastEl) _toastEl.classList.remove('shown'); }, ms || 2800);
}

function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), sc = sec % 60;
    const pad = function(n) { return n < 10 ? '0' + n : String(n); };
    return h > 0 ? h + ':' + pad(m) + ':' + pad(sc) : m + ':' + pad(sc);
}

// ============================================================
// SHARED: Namespaced JSON store with size + age pruning
// ============================================================
function storeGet(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem('__pyt_' + key)); return v === null ? fallback : v; }
    catch (e) { return fallback; }
}
function storeSet(key, value) {
    try { localStorage.setItem('__pyt_' + key, JSON.stringify(value)); return true; }
    catch (e) { console.warn('[PrivacySuite] storage write failed for', key, e); return false; }
}
// --- Study notes serialiser (top-level: the settings panel exports them) ---
function notesToMarkdown(vid) {
    const notes = storeGet('notes', {});
    const ids = vid ? (notes[vid] ? [vid] : []) : Object.keys(notes);
    if (!ids.length) return '';
    let out = '';
    ids.sort(function(a, b) { return (notes[b].at || 0) - (notes[a].at || 0); });
    for (const id of ids) {
        const entry = notes[id];
        const url = 'https://www.youtube.com/watch?v=' + id;
        out += '## ' + (entry.title || id) + '\n';
        if (entry.channel) out += '_' + entry.channel + '_\n';
        out += '<' + url + '>\n\n';
        for (const n of entry.notes) out += '- [' + fmtTime(n.t) + '](' + url + '&t=' + n.t + 's) ' + n.text + '\n';
        out += '\n';
    }
    return out;
}

// --- Clipboard + file download (used by notes export and settings backup) ---
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(function() { return _copyFallback(text); });
    }
    return Promise.resolve(_copyFallback(text));
}
function _copyFallback(text) {
    // navigator.clipboard is unavailable in insecure contexts and rejects when
    // the document is not focused; the textarea trick still works there.
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        return true;
    } catch (e) { return false; }
}

function downloadText(filename, text, mime) {
    try {
        const blob = new Blob([text], { type: (mime || 'text/markdown') + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() { URL.revokeObjectURL(url); a.remove(); }, 1000);
        return true;
    } catch (e) { console.warn('[PrivacySuite] download failed:', e); return false; }
}

// Keep map-shaped stores bounded: drop oldest `at` entries beyond `max`.
function prune(map, max, maxAgeDays) {
    const keys = Object.keys(map);
    const cutoff = Date.now() - (maxAgeDays || 90) * 86400000;
    for (const k of keys) if (!map[k] || (map[k].at || 0) < cutoff) delete map[k];
    const left = Object.keys(map);
    if (left.length > max) {
        left.sort(function(a, b) { return (map[a].at || 0) - (map[b].at || 0); });
        for (let i = 0; i < left.length - max; i++) delete map[left[i]];
    }
    return map;
}


function createSettingsPanel() {
    if (_settingsOverlay) return;
    _settingsOverlay = document.createElement('div');
    _settingsOverlay.id = 'pyt-settings-overlay';

    // --- DOM-based panel builder (no innerHTML for user-controlled values) ---
    function _el(tag, attrs, children) {
        const el = document.createElement(tag);
        if (attrs) for (const k in attrs) {
            if (k === 'textContent') el.textContent = attrs[k];
            else if (k === 'className') el.className = attrs[k];
            else el.setAttribute(k, attrs[k]);
        }
        if (children) for (const c of (Array.isArray(children) ? children : [children])) {
            if (typeof c === 'string') el.appendChild(document.createTextNode(c));
            else if (c) el.appendChild(c);
        }
        return el;
    }

    function toggle(id, checked) {
        const label = _el('label', { className: 'pyt-toggle' });
        const input = _el('input', { type: 'checkbox', id: id });
        if (checked) input.checked = true;
        label.appendChild(input);
        label.appendChild(_el('span', { className: 'slider' }));
        return label;
    }

    function settingRow(labelText, descText, control, ytOnlyFlag) {
        const row = _el('div', { className: 'pyt-setting-row' });
        if (ytOnlyFlag && !ENV.isYouTube) {
            row.style.opacity = '0.4';
            row.style.pointerEvents = 'none';
            row.title = 'YouTube only';
        }
        const info = _el('div', null, [
            _el('div', { className: 'pyt-setting-label', textContent: labelText }),
            _el('div', { className: 'pyt-setting-desc', textContent: descText })
        ]);
        row.appendChild(info);
        row.appendChild(control);
        return row;
    }

    function sectionTitle(text) {
        return _el('div', { className: 'pyt-section-title', textContent: text });
    }

    function selectInput(id, options, currentVal) {
        const sel = _el('select', { className: 'pyt-select', id: id });
        options.forEach(function(v) {
            const opt = _el('option', { value: String(v), textContent: v + (typeof v === 'number' && v >= 1 ? 'x' : '') });
            if (v == currentVal) opt.selected = true;
            sel.appendChild(opt);
        });
        return sel;
    }

    // selectInput appends an "x" to numbers (it was written for playback
    // speeds); this one takes explicit [value, label] pairs.
    function selectPairs(id, pairs, currentVal) {
        const sel = _el('select', { className: 'pyt-select', id: id });
        pairs.forEach(function(p) {
            const opt = _el('option', { value: String(p[0]), textContent: p[1] });
            if (String(p[0]) === String(currentVal)) opt.selected = true;
            sel.appendChild(opt);
        });
        return sel;
    }

    function textareaRow(label, desc, id, value, placeholder) {
        const row = _el('div', { className: 'pyt-setting-row', style: 'flex-direction:column;align-items:stretch;gap:8px' });
        row.appendChild(_el('div', null, [
            _el('div', { className: 'pyt-setting-label', textContent: label }),
            _el('div', { className: 'pyt-setting-desc', textContent: desc })
        ]));
        const ta = _el('textarea', { className: 'pyt-blocklist-textarea', id: id, placeholder: placeholder || '' });
        ta.value = value || '';   // safe: .value never interprets HTML
        row.appendChild(ta);
        return row;
    }

    const panel = _el('div', { id: 'pyt-settings-panel' });

    // Header
    panel.appendChild(_el('h2', { textContent: '\u26A1 Privacy & YouTube Suite v4.0.0' }));

    // --- Region & Search ---
    panel.appendChild(sectionTitle('Region & Search'));

    const regionControl = _el('div', { style: 'display:flex;gap:8px;align-items:center' });
    const regionInput = _el('input', { className: 'pyt-input', id: 'pyt-region', maxlength: '2', placeholder: 'US' });
    regionInput.value = SUITE_SETTINGS.region; // safe: .value never interprets HTML
    regionControl.appendChild(regionInput);
    regionControl.appendChild(toggle('pyt-region-on', SUITE_SETTINGS.regionEnabled));
    panel.appendChild(settingRow('Region Override', 'Force YouTube/Google region (2-letter code, e.g. US, GB, DE)', regionControl));

    panel.appendChild(settingRow('Endless Google Scroll', 'Auto-load next pages on Google Search',
        toggle('pyt-endless', SUITE_SETTINGS.endlessGoogle)));
    panel.appendChild(settingRow('Endless Scroll Page Limit', 'Stop after this many pages (Google rate-limits aggressive scrolling)',
        selectPairs('pyt-endless-max', [[3, '3 pages'], [5, '5 pages'], [10, '10 pages'], [20, '20 pages']], SUITE_SETTINGS.endlessMaxPages)));
    panel.appendChild(settingRow('Web-Only Results (udm=14)', 'Plain blue links: no AI Overview, no carousels, no People-Also-Ask',
        toggle('pyt-webonly', SUITE_SETTINGS.webOnlyResults)));

    // --- Search Blocklist ---
    panel.appendChild(sectionTitle('Search Blocklist'));

    const blocklistRow = _el('div', { className: 'pyt-setting-row', style: 'flex-direction:column;align-items:stretch;gap:8px' });
    blocklistRow.appendChild(_el('div', null, [
        _el('div', { className: 'pyt-setting-label', textContent: 'Block Sites from Google Results' }),
        _el('div', { className: 'pyt-setting-desc', textContent: 'One domain per line (e.g. facebook.com). Results linking to these domains will be hidden.' })
    ]));
    const blockedTextarea = _el('textarea', { className: 'pyt-blocklist-textarea', id: 'pyt-blocked-sites', placeholder: 'facebook.com\npinterest.com\nquora.com' });
    blockedTextarea.value = SUITE_SETTINGS.blockedSites || ''; // safe: .value never interprets HTML
    blocklistRow.appendChild(blockedTextarea);
    blocklistRow.appendChild(_el('div', { className: 'pyt-blocklist-count', id: 'pyt-blocked-count' }));
    panel.appendChild(blocklistRow);

    const presetRow = settingRow('Preset: Social Media', '', toggle('pyt-preset-social', SUITE_SETTINGS.presetSocialMedia));
    const presetSites = _el('div', { className: 'pyt-preset-sites', textContent: 'facebook.com, instagram.com, youtube.com, tiktok.com, x.com' });
    presetRow.querySelector('.pyt-setting-desc').replaceWith(presetSites);
    panel.appendChild(presetRow);

    const slopRow = settingRow('Preset: Content Farms', '', toggle('pyt-preset-aislop', SUITE_SETTINGS.presetAiSlop));
    const slopSites = _el('div', { className: 'pyt-preset-sites', textContent: BLOCK_PRESETS.presetAiSlop.join(', ') });
    slopRow.querySelector('.pyt-setting-desc').replaceWith(slopSites);
    panel.appendChild(slopRow);

    // --- Appearance ---
    panel.appendChild(sectionTitle('Appearance'));
    panel.appendChild(settingRow('Reading Font (Alt+P cycles)', 'Override the site font for long reading sessions',
        selectPairs('pyt-fontmode', Object.keys(FONT_MODES).map(function(k) { return [k, FONT_MODES[k].label]; }), SUITE_SETTINGS.fontMode)));
    panel.appendChild(settingRow('Base Text Size', 'Applies only when a reading font is selected',
        selectPairs('pyt-fontscale', [[16, '16px'], [18, '18px'], [20, '20px'], [22, '22px']], SUITE_SETTINGS.fontScale)));

    // --- Playback ---
    panel.appendChild(sectionTitle('Playback'));
    panel.appendChild(settingRow('Auto Theater Mode', 'Open watch pages in theater mode',
        toggle('pyt-theater', SUITE_SETTINGS.autoTheater), true));
    panel.appendChild(settingRow('Auto Fullscreen', 'Enter fullscreen automatically on watch pages',
        toggle('pyt-fullscreen', SUITE_SETTINGS.autoFullscreen), true));
    panel.appendChild(settingRow('Default Playback Speed', 'Alt+1/2/3/4 for quick presets',
        selectInput('pyt-speed', [1, 1.25, 1.5, 1.75, 2, 3], SUITE_SETTINGS.defaultSpeed), true));
    panel.appendChild(settingRow('Remaining Time Display', 'Show time left (rate-adjusted) in player',
        toggle('pyt-remaining', SUITE_SETTINGS.remainingTime), true));
    panel.appendChild(settingRow('Resume Playback', 'Reopen a lecture where you left off (videos over 2 min)',
        toggle('pyt-resume', SUITE_SETTINGS.resumePlayback), true));
    panel.appendChild(settingRow('Remember Speed per Channel', 'One lecturer at 1.5x, another at 1x — remembered separately',
        toggle('pyt-speedmem', SUITE_SETTINGS.speedMemory), true));
    panel.appendChild(settingRow('Disable Autoplay Next', 'Stop the rabbit hole: no auto-advance, no end cards',
        toggle('pyt-noautonext', SUITE_SETTINGS.disableAutoplayNext), true));

    // --- Focus & Layout ---
    panel.appendChild(sectionTitle('Focus & Layout'));
    panel.appendChild(settingRow('Focus Mode (Alt+F)', 'Hide sidebar, comments, end cards',
        toggle('pyt-focus', SUITE_SETTINGS.focusMode), true));
    panel.appendChild(settingRow('Grid Columns', 'Videos per row on home/subscriptions',
        selectInput('pyt-grid', [3, 4, 5, 6], SUITE_SETTINGS.gridColumns), true));
    panel.appendChild(settingRow('Open Home as Subscriptions', 'Skip the algorithmic feed entirely',
        toggle('pyt-hometosubs', SUITE_SETTINGS.homeToSubs), true));
    panel.appendChild(settingRow('Hide Shorts', 'Remove Shorts shelves, tiles and sidebar entries',
        toggle('pyt-hideshorts', SUITE_SETTINGS.hideShorts), true));
    panel.appendChild(settingRow('Shorts \u2192 Normal Player', 'Open every Shorts link in the standard watch page',
        toggle('pyt-shortsredirect', SUITE_SETTINGS.shortsRedirect), true));
    panel.appendChild(settingRow('Hide Watched Videos', 'Drop anything over 90% watched from feeds',
        toggle('pyt-hidewatched', SUITE_SETTINGS.hideWatched), true));
    panel.appendChild(settingRow('Hide Playables', 'Remove the in-feed games shelf',
        toggle('pyt-hideplayables', SUITE_SETTINGS.hidePlayables), true));
    panel.appendChild(settingRow('Hide AI Features', 'Remove the Ask button and AI video summaries',
        toggle('pyt-hideai', SUITE_SETTINGS.hideAiFeatures), true));
    panel.appendChild(settingRow('Disable Ambient Mode', 'Kill the glow behind the player (saves GPU too)',
        toggle('pyt-noambient', SUITE_SETTINGS.disableAmbient), true));
    panel.appendChild(textareaRow('Block Video Titles by Keyword',
        'One keyword per line. Any feed video whose title contains it is hidden.',
        'pyt-yt-keywords', SUITE_SETTINGS.ytKeywordBlocklist, 'reaction\ndrama\ntier list'));
    panel.appendChild(textareaRow('Block Channels',
        'One channel name or @handle per line.',
        'pyt-yt-channels', SUITE_SETTINGS.ytChannelBlocklist, '@somechannel\nAnother Channel'));

    // --- Ad Handling ---
    panel.appendChild(sectionTitle('Ad Handling'));
    panel.appendChild(settingRow('Blur Ads', 'Blur video during ad playback',
        toggle('pyt-adblur', SUITE_SETTINGS.adBlur), true));
    panel.appendChild(settingRow('Speed Up Ads (16x)', 'Fast-forward non-skippable ads',
        toggle('pyt-adspeed', SUITE_SETTINGS.adSpeedUp), true));
    panel.appendChild(settingRow('Block Hover Previews', 'Stop auto-playing thumbnails on hover',
        toggle('pyt-hover', SUITE_SETTINGS.hoverPreviewBlock), true));
    panel.appendChild(settingRow('SponsorBlock (community segments)',
        'Skips sponsor reads and intros. Sends only a 4-character hash prefix of the video id \u2014 sponsor.ajay.app never learns what you watch.',
        toggle('pyt-sponsorblock', SUITE_SETTINGS.sponsorBlock), true));
    panel.appendChild(textareaRow('SponsorBlock Categories',
        'Comma separated: sponsor, selfpromo, interaction, intro, outro, music_offtopic, preview, filler',
        'pyt-sponsorcats', SUITE_SETTINGS.sponsorCategories, 'sponsor,selfpromo,intro,outro'));

    // --- Study Tools ---
    panel.appendChild(sectionTitle('Study Tools'));
    panel.appendChild(settingRow('Timestamped Notes (Alt+N)', 'Alt+N adds a note at the current position, Alt+Shift+N copies them as Markdown',
        toggle('pyt-notes', SUITE_SETTINGS.notesEnabled), true));
    panel.appendChild(settingRow('Study Session Limit', 'Pauses playback and shows a HUD once reached. Alt+R resets it.',
        selectPairs('pyt-session', [[0, 'Off'], [15, '15 min'], [25, '25 min'], [45, '45 min'], [60, '60 min'], [90, '90 min']], SUITE_SETTINGS.studySessionMinutes), true));

    const studyBtns = _el('div', { className: 'pyt-btn-row' });
    const exportNotesBtn = _el('button', { type: 'button', textContent: 'Export all notes (.md)' });
    exportNotesBtn.addEventListener('click', function() {
        const md = (typeof notesToMarkdown === 'function') ? notesToMarkdown(null) : '';
        if (!md) { exportNotesBtn.textContent = 'No notes saved yet'; return; }
        downloadText('youtube-study-notes-' + new Date().toISOString().slice(0, 10) + '.md', md);
        exportNotesBtn.textContent = 'Exported \u2713';
    });
    studyBtns.appendChild(exportNotesBtn);
    panel.appendChild(studyBtns);

    // --- Diagnostics + backup ---
    panel.appendChild(sectionTitle('Diagnostics & Backup'));
    const diag = _el('div', { className: 'pyt-setting-desc', style: 'white-space:pre-line;line-height:1.6' });
    diag.textContent = layerReport().join('\n') || 'No layers registered on this page.';
    panel.appendChild(diag);

    // Settings live in localStorage, which is per-origin: google.com and
    // youtube.com cannot see each other's copy. Export/import is how you keep
    // them in step (and how you move to another browser).
    const backupBtns = _el('div', { className: 'pyt-btn-row' });
    const copyCfgBtn = _el('button', { type: 'button', textContent: 'Copy settings' });
    copyCfgBtn.addEventListener('click', function() {
        copyToClipboard(JSON.stringify(SUITE_SETTINGS, null, 2)).then(function() { copyCfgBtn.textContent = 'Copied \u2713'; });
    });
    const pasteCfgBtn = _el('button', { type: 'button', textContent: 'Paste settings' });
    pasteCfgBtn.addEventListener('click', function() {
        const raw = window.prompt('Paste settings JSON (exported from the other domain):', '');
        if (!raw) return;
        try {
            const incoming = JSON.parse(raw);
            if (!incoming || typeof incoming !== 'object') throw new Error('not an object');
            let applied = 0;
            for (const k in incoming) if (k in DEFAULT_SETTINGS) { SUITE_SETTINGS[k] = incoming[k]; applied++; }
            _saveSettings(SUITE_SETTINGS);
            pasteCfgBtn.textContent = applied + ' settings imported \u2014 reload';
        } catch (err) {
            pasteCfgBtn.textContent = 'Invalid JSON';
        }
    });
    backupBtns.appendChild(copyCfgBtn);
    backupBtns.appendChild(pasteCfgBtn);
    panel.appendChild(backupBtns);

    // --- Close button + shortcut hint ---
    const closeBtn = _el('button', { id: 'pyt-settings-close', textContent: 'Save & Close' });
    panel.appendChild(closeBtn);
    panel.appendChild(_el('div', { className: 'pyt-shortcut-hint', textContent:
        'Alt+S / Ctrl+? settings \u00B7 Alt+P font \u00B7 Alt+F focus \u00B7 Alt+1\u20114 speed\n'
        + 'YouTube: Alt+N note \u00B7 Alt+Shift+N copy notes \u00B7 Alt+[ / Alt+] A-B loop \u00B7 Alt+\\ clear \u00B7 Alt+T transcript \u00B7 Alt+0 restart \u00B7 Alt+R reset session',
        style: 'white-space:pre-line' }));

    _settingsOverlay.appendChild(panel);
    document.documentElement.appendChild(_settingsOverlay);

    // Close on overlay click
    _settingsOverlay.addEventListener('click', function(e) { if (e.target === _settingsOverlay) saveAndCloseSettings(); });
    closeBtn.addEventListener('click', saveAndCloseSettings);

    // Live blocklist count update
    blockedTextarea.addEventListener('input', _updateBlockedCount);
    const presetSocialToggle = panel.querySelector('#pyt-preset-social');
    if (presetSocialToggle) presetSocialToggle.addEventListener('change', _updateBlockedCount);
    _updateBlockedCount();
}

function saveAndCloseSettings() {
    SUITE_SETTINGS.region = (document.getElementById('pyt-region').value || '').toUpperCase().trim();
    SUITE_SETTINGS.regionEnabled = document.getElementById('pyt-region-on').checked;
    SUITE_SETTINGS.endlessGoogle = document.getElementById('pyt-endless').checked;
    SUITE_SETTINGS.blockedSites = (document.getElementById('pyt-blocked-sites').value || '').trim();
    SUITE_SETTINGS.presetSocialMedia = document.getElementById('pyt-preset-social').checked;
    SUITE_SETTINGS.papyrusFont = document.getElementById('pyt-papyrus').checked;
    SUITE_SETTINGS.autoTheater = document.getElementById('pyt-theater').checked;
    SUITE_SETTINGS.autoFullscreen = document.getElementById('pyt-fullscreen').checked;
    SUITE_SETTINGS.defaultSpeed = parseFloat(document.getElementById('pyt-speed').value) || 1;
    SUITE_SETTINGS.remainingTime = document.getElementById('pyt-remaining').checked;
    SUITE_SETTINGS.focusMode = document.getElementById('pyt-focus').checked;
    SUITE_SETTINGS.gridColumns = parseInt(document.getElementById('pyt-grid').value) || 5;
    SUITE_SETTINGS.adBlur = document.getElementById('pyt-adblur').checked;
    SUITE_SETTINGS.adSpeedUp = document.getElementById('pyt-adspeed').checked;
    SUITE_SETTINGS.hoverPreviewBlock = document.getElementById('pyt-hover').checked;

    // --- v4 controls ---
    const $ = function(id) { return document.getElementById(id); };
    const bool = function(id, fallback) { const el = $(id); return el ? el.checked : fallback; };
    const num  = function(id, fallback) { const el = $(id); const v = parseFloat(el && el.value); return isFinite(v) ? v : fallback; };
    const str  = function(id, fallback) { const el = $(id); return el ? (el.value || '').trim() : fallback; };

    SUITE_SETTINGS.endlessMaxPages     = num('pyt-endless-max', SUITE_SETTINGS.endlessMaxPages);
    SUITE_SETTINGS.webOnlyResults      = bool('pyt-webonly', SUITE_SETTINGS.webOnlyResults);
    SUITE_SETTINGS.presetAiSlop        = bool('pyt-preset-aislop', SUITE_SETTINGS.presetAiSlop);
    SUITE_SETTINGS.fontMode            = str('pyt-fontmode', SUITE_SETTINGS.fontMode) || 'off';
    SUITE_SETTINGS.fontScale           = num('pyt-fontscale', SUITE_SETTINGS.fontScale);
    SUITE_SETTINGS.resumePlayback      = bool('pyt-resume', SUITE_SETTINGS.resumePlayback);
    SUITE_SETTINGS.speedMemory         = bool('pyt-speedmem', SUITE_SETTINGS.speedMemory);
    SUITE_SETTINGS.disableAutoplayNext = bool('pyt-noautonext', SUITE_SETTINGS.disableAutoplayNext);
    SUITE_SETTINGS.homeToSubs          = bool('pyt-hometosubs', SUITE_SETTINGS.homeToSubs);
    SUITE_SETTINGS.hideShorts          = bool('pyt-hideshorts', SUITE_SETTINGS.hideShorts);
    SUITE_SETTINGS.shortsRedirect      = bool('pyt-shortsredirect', SUITE_SETTINGS.shortsRedirect);
    SUITE_SETTINGS.hideWatched         = bool('pyt-hidewatched', SUITE_SETTINGS.hideWatched);
    SUITE_SETTINGS.hidePlayables       = bool('pyt-hideplayables', SUITE_SETTINGS.hidePlayables);
    SUITE_SETTINGS.hideAiFeatures      = bool('pyt-hideai', SUITE_SETTINGS.hideAiFeatures);
    SUITE_SETTINGS.disableAmbient      = bool('pyt-noambient', SUITE_SETTINGS.disableAmbient);
    SUITE_SETTINGS.ytKeywordBlocklist  = str('pyt-yt-keywords', SUITE_SETTINGS.ytKeywordBlocklist);
    SUITE_SETTINGS.ytChannelBlocklist  = str('pyt-yt-channels', SUITE_SETTINGS.ytChannelBlocklist);
    SUITE_SETTINGS.sponsorBlock        = bool('pyt-sponsorblock', SUITE_SETTINGS.sponsorBlock);
    SUITE_SETTINGS.sponsorCategories   = str('pyt-sponsorcats', SUITE_SETTINGS.sponsorCategories);
    SUITE_SETTINGS.notesEnabled        = bool('pyt-notes', SUITE_SETTINGS.notesEnabled);
    SUITE_SETTINGS.studySessionMinutes = num('pyt-session', SUITE_SETTINGS.studySessionMinutes);
    // Legacy mirror so a downgrade to v3 still finds a sane value.
    SUITE_SETTINGS.papyrusFont = SUITE_SETTINGS.fontMode === 'papyrus';

    _saveSettings(SUITE_SETTINGS);

    // Apply live changes (global)
    applyFontMode();

    // Apply live changes if on YouTube. Anything driven by the CSS built once
    // at document-start (grid columns, hover previews, the Shorts stylesheet)
    // still needs a reload — the panel says so rather than silently no-op'ing.
    if (ENV.isYouTube) {
        if (YT_HOOKS.applyFocusMode) YT_HOOKS.applyFocusMode();
        if (YT_HOOKS.applyFeedHygiene) YT_HOOKS.applyFeedHygiene();
        if (YT_HOOKS.resetFeedFilter) YT_HOOKS.resetFeedFilter();
        if (YT_HOOKS.filterFeed) YT_HOOKS.filterFeed(document);
        if (YT_HOOKS.syncSponsorBlock) YT_HOOKS.syncSponsorBlock();
        if (SUITE_SETTINGS.remainingTime) { if (YT_HOOKS.initRemainingTime) YT_HOOKS.initRemainingTime(); }
        else if (YT_HOOKS.destroyRemainingTime) YT_HOOKS.destroyRemainingTime();
    }

    if (_settingsOverlay) _settingsOverlay.classList.remove('active');
}

function toggleSettingsPanel() {
    if (!_settingsOverlay) createSettingsPanel();
    _settingsOverlay.classList.toggle('active');
    // Update blocklist count when panel opens
    if (_settingsOverlay.classList.contains('active')) {
        _updateBlockedCount();
    }
}

function _updateBlockedCount() {
    var el = document.getElementById('pyt-blocked-count');
    if (!el) return;
    var textarea = document.getElementById('pyt-blocked-sites');
    var lines = (textarea ? textarea.value : SUITE_SETTINGS.blockedSites || '').split('\n').filter(function(l) { return l.trim() && l.trim().indexOf('.') !== -1; });
    // Preset counts come from BLOCK_PRESETS so they can never drift out of sync
    // with the actual lists; live checkbox state wins over stored state.
    var presetCount = 0;
    for (var key in BLOCK_PRESETS) {
        var box = document.getElementById(PRESET_INPUT_IDS[key]);
        var on = box ? box.checked : !!SUITE_SETTINGS[key];
        if (on) presetCount += BLOCK_PRESETS[key].length;
    }
    var total = lines.length + presetCount;
    el.textContent = total > 0 ? total + ' domain' + (total > 1 ? 's' : '') + ' blocked' : 'No domains blocked';
}
const PRESET_INPUT_IDS = Object.freeze({ presetSocialMedia: 'pyt-preset-social', presetAiSlop: 'pyt-preset-aislop' });

// --- Floating Gear Button ---
// SVG gear icon (Material Design)
const GEAR_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
    + '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/>'
    + '</svg>';

function createGearButton() {
    if (document.getElementById('pyt-gear-btn')) return true;
    if (!document.body) return false; // signal: body not ready
    _gearButton = document.createElement('div');
    _gearButton.id = 'pyt-gear-btn';
    _gearButton.title = 'Suite Settings (Alt+S)';
    _gearButton.innerHTML = GEAR_SVG;
    _gearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggleSettingsPanel();
    });
    document.body.appendChild(_gearButton);
    return true; // signal: created OK
}

// --- Gear Button: Persistent creation with polling + watchdog ---
// Runs on Google AND YouTube (YouTube's SPA router wipes body children on some
// navigations, hence the watchdog). Alt+S keyboard shortcut works everywhere.
let _gearPollTimer = setInterval(function() {
    if (!document.body) return; // body not ready yet, keep polling
    if (document.getElementById('pyt-gear-btn')) {
        clearInterval(_gearPollTimer); // button exists, stop polling
        // But start a slower watchdog to re-create if Google removes it
        setInterval(function() {
            if (!document.getElementById('pyt-gear-btn')) createGearButton();
        }, 5000);
        return;
    }
    if (createGearButton()) clearInterval(_gearPollTimer);
}, 300);

// --- Global Keyboard Handler ---
// Uses CAPTURE phase so our handler fires BEFORE YouTube's own handlers
// which may stopPropagation in bubble phase.
// Supports: Alt+S (primary) + Ctrl+Shift+/ (secondary) + ESC (close)
function handleGlobalKeys(e) {
    // Don't capture when typing in inputs
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    // ESC = close settings panel if open
    if (e.key === 'Escape' && _settingsOverlay && _settingsOverlay.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        saveAndCloseSettings();
        return;
    }

    // Alt+S = Settings panel (primary shortcut — works on all keyboards)
    if (e.altKey && !e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        toggleSettingsPanel();
        return;
    }

    // Ctrl+? = Settings panel (secondary — Ctrl+Shift+/ on QWERTY)
    // Check multiple representations for cross-browser/keyboard compatibility:
    //   - e.key === '?' (Chrome + QWERTY when Ctrl+Shift+/ pressed)
    //   - e.shiftKey + e.key === '/' (Firefox may not transform to '?')
    //   - e.shiftKey + e.code === 'Slash' (layout-independent for US/UK)
    if (e.ctrlKey && (e.key === '?' || (e.shiftKey && (e.key === '/' || e.code === 'Slash')))) {
        e.preventDefault();
        e.stopPropagation();
        toggleSettingsPanel();
        return;
    }

    // Alt+P = cycle reading font (off -> papyrus -> serif -> dyslexic -> system)
    if (e.altKey && !e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        const modes = Object.keys(FONT_MODES);
        const next = modes[(modes.indexOf(SUITE_SETTINGS.fontMode) + 1) % modes.length];
        SUITE_SETTINGS.fontMode = next;
        SUITE_SETTINGS.papyrusFont = next === 'papyrus';
        _saveSettings(SUITE_SETTINGS);
        applyFontMode();
        showToast('Reading font: ' + FONT_MODES[next].label);
        return;
    }
}

// Attach with CAPTURE phase — fires before YouTube's handlers
document.addEventListener('keydown', handleGlobalKeys, true);


// ============================================================
// MODULE 7: REGION SETTER (runs early, before page loads)
// ============================================================
_safeRun('Module7:RegionSetter', function() {
    if (!SUITE_SETTINGS.regionEnabled || !SUITE_SETTINGS.region) return;
    var region = SUITE_SETTINGS.region.toUpperCase();
    if (!/^[A-Z]{2}$/.test(region)) return;
    if (!ENV.isGoogleSearch && !ENV.isYouTube) return;
    var url = new URL(location.href);
    if (url.searchParams.get('gl') === region) return;
    if (ENV.isGoogleSearch && location.pathname !== '/search' &&
        !location.pathname.startsWith('/search')) return;
    url.searchParams.set('gl', region);
    var redirectKey = '__pyt_region_set_' + region;
    if (sessionStorage.getItem(redirectKey) === location.pathname) return;
    sessionStorage.setItem(redirectKey, location.pathname);
    location.replace(url.toString());
});


// ============================================================
// MODULE 11: GOOGLE SEARCH URL CLEANER (strip tracking params)
// ============================================================
// Google appends dozens of tracking parameters to search URLs:
//   oq, gs_lcrp, gs_lp, aqs, sourceid, ie, oe, ei, ved, sca_esv,
//   sxsrf, sclient, bih, biw, dpr, uact, gs_ssp, ...
// Only a handful of params are functional. We use a whitelist approach:
// keep what matters, strip everything else, then redirect to clean URL.
// This runs once at page load (before DOM) to avoid a tracking payload.
_safeRun('Module11:SearchURLCleaner', function() {
    if (!ENV.isGoogleSearch) return;
    if (location.pathname !== '/search') return;

    // Functional parameters whitelist — everything else is tracking
    var KEEP_PARAMS = [
        'q',        // the actual search query
        'tbm',      // search type (isch=images, vid=videos, nws=news, shop=shopping)
        'tbs',      // search tools (time range, verbatim, etc.)
        'start',    // pagination offset
        'num',      // results per page
        'hl',       // interface language
        'gl',       // geo-location/region (used by our Region Setter)
        'lr',       // language restrict
        'cr',       // country restrict
        'safe',     // safe search
        'nfpr',     // no auto-correct
        'filter',   // show omitted results
        'udm',      // search mode (14=web only, strips AI overviews)
        'as_sitesearch', // site-specific search
        'as_q',     // advanced search query
        'as_epq',   // exact phrase
        'as_oq',    // any of these words
        'as_eq',    // none of these words
        'as_dt',    // include/exclude
        'as_filetype', // file type
    ];

    var url = new URL(location.href);
    var params = url.searchParams;

    // --- Web-only mode (udm=14) ---
    // udm=14 is Google's "Web" tab: plain blue links, no AI Overview, no
    // People-Also-Ask, no shopping/video carousels. For research and study this
    // is the single highest-signal change available on the search page.
    // Only applied to plain text searches: `tbm` (Images/News/...) and an
    // explicit `udm` from the user are always respected.
    var wantsWebOnly = SUITE_SETTINGS.webOnlyResults && params.get('q') &&
                       !params.get('tbm') && !params.get('udm');
    if (wantsWebOnly) params.set('udm', '14');

    // Nothing to clean if only 'q' is present and we did not add udm
    if (!wantsWebOnly && params.toString().split('&').length <= 1) return;

    var keepSet = {};
    for (var i = 0; i < KEEP_PARAMS.length; i++) keepSet[KEEP_PARAMS[i]] = true;

    // Collect params to remove
    var toRemove = [];
    params.forEach(function(value, key) {
        if (!keepSet[key]) toRemove.push(key);
    });

    // Only act if there's something to strip or a udm to add
    if (toRemove.length === 0 && !wantsWebOnly) return;

    for (var j = 0; j < toRemove.length; j++) params.delete(toRemove[j]);

    // Prevent infinite redirect loops: only clean once per navigation
    var cleanUrl = url.pathname + '?' + params.toString() + url.hash;
    if (cleanUrl === location.pathname + '?' + location.search.slice(1) + location.hash) return;

    // Adding udm=14 changes which results the server returns, so it needs a real
    // navigation. Pure param stripping is cosmetic, so replaceState is enough
    // there — it cleans the URL bar with no reload and no extra request.
    if (wantsWebOnly) {
        location.replace(cleanUrl);
    } else if (history.replaceState) {
        history.replaceState(null, '', cleanUrl);
    } else {
        location.replace(cleanUrl);
    }
});


// ============================================================
// MODULE 11b: UNIVERSAL LINK CLEANER (privacy layers P0-P2)
// ============================================================
// Module 1 (Don't Track Me Google) is a deep, Google-specific rewrite of the
// result links. This is the shallow, universal complement that also covers
// YouTube and any Google property Module 1 does not special-case. Three
// independent layers:
//   P0  intercept a redirect page before it ever loads (document-start)
//   P1  strip tracking parameters out of the address bar
//   P2  rewrite links in the DOM as they appear
// Losing any one of these degrades coverage; it never breaks the others.

// Click-id and campaign parameters that carry no page state. Deliberately does
// NOT include `_gl` (cross-domain analytics stitching, breaks sign-in flows)
// or `gbraid`/`wbraid` handling beyond the plain form.
const TRACKING_PARAM_RE = /^(utm_.*|fbclid|gclid|dclid|gclsrc|gad_source|gad_campaignid|gbraid|wbraid|msclkid|twclid|ttclid|igshid|igsh|mc_eid|mc_cid|_hsenc|_hsmi|__hstc|__hssc|__hsfp|hsCtaTracking|vero_id|vero_conv|oly_anon_id|oly_enc_id|__s|yclid|ysclid|_openstat|srsltid|irgwc|cjevent|cjdata|awc|wickedid|rb_clickid|tduid|iclid|s_cid|_branch_referrer|_branch_match_id|ml_subscriber|ml_subscriber_hash|bsft_clkid|bsft_eid|bsft_mid|bsft_uid|admitad_uid|mtm_.*|pk_.*|si|pp|feature|ref_src|ref_url|source_ve_path|pbjreload)$/i;

// Redirect hops we can resolve locally. Following these in the page instead of
// letting the browser make the round trip means the interstitial never learns
// the click happened.
function unwrapRedirect(href) {
    let url;
    try { url = new URL(href, location.href); } catch (e) { return null; }
    const host = url.hostname;
    let target = null;

    if (/(^|\.)google\.[a-z.]+$/.test(host) && url.pathname === '/url') {
        target = url.searchParams.get('q') || url.searchParams.get('url');
    } else if (/(^|\.)youtube\.com$/.test(host) && url.pathname === '/redirect') {
        target = url.searchParams.get('q');
    } else if (host === 'l.facebook.com' && url.pathname === '/l.php') {
        target = url.searchParams.get('u');
    }
    if (!target) return null;
    // Only ever follow http(s): a javascript: or data: target here would be an
    // open-redirect turned into script execution.
    if (!/^https?:\/\//i.test(target)) return null;
    return target;
}

function stripTrackingParams(href) {
    let url;
    try { url = new URL(href, location.href); } catch (e) { return null; }
    if (!url.search) return null;
    const doomed = [];
    url.searchParams.forEach(function(_v, k) { if (TRACKING_PARAM_RE.test(k)) doomed.push(k); });
    if (!doomed.length) return null;
    for (let i = 0; i < doomed.length; i++) url.searchParams.delete(doomed[i]);
    return url.href;
}

// --- P0: redirect interception, before the page renders ---
_safeRun('Privacy:P0:redirect', registerLayer('privacy', 'redirect-intercept', function() {
    const direct = unwrapRedirect(location.href);
    if (!direct) return false;
    location.replace(direct);
    return true;
}));

// --- P1: address-bar cleaning ---
// The Google /search page is owned by Module 11's stricter whitelist pass; this
// handles every other page (YouTube watch pages, Google Maps, Docs, ...).
_safeRun('Privacy:P1:addressbar', registerLayer('privacy', 'address-bar', function() {
    if (ENV.isGoogleSearch && location.pathname === '/search') return false;
    const cleaned = stripTrackingParams(location.href);
    if (!cleaned || cleaned === location.href) return false;
    if (history.replaceState) history.replaceState(null, '', cleaned);
    return true;
}));

// --- P2: DOM link rewriting ---
const _cleanedLinks = new WeakSet();
const cleanLinksIn = registerLayer('privacy', 'link-rewrite', function(root) {
    const scope = (root && root.querySelectorAll) ? root : document;
    const links = scope.querySelectorAll('a[href]');
    let changed = 0;
    for (let i = 0; i < links.length; i++) {
        const a = links[i];
        if (_cleanedLinks.has(a)) continue;
        _cleanedLinks.add(a);
        const href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#' || /^(javascript|mailto|data):/i.test(href)) continue;

        const direct = unwrapRedirect(a.href);
        if (direct) { a.href = direct; changed++; }
        const stripped = stripTrackingParams(a.href);
        if (stripped) { a.href = stripped; changed++; }
        // `ping` fires a beacon on click regardless of where href points.
        if (a.hasAttribute('ping')) { a.removeAttribute('ping'); changed++; }
    }
    return changed > 0;
});

_safeRun('Privacy:P2:links', function() {
    function sweep() { cleanLinksIn(document); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sweep, { once: true });
    else sweep();
    registerMutationCallback(function(mutations) {
        for (let i = 0; i < mutations.length; i++) {
            const added = mutations[i].addedNodes;
            for (let j = 0; j < added.length; j++) {
                if (added[j].nodeType === 1) cleanLinksIn(added[j]);
            }
        }
    });
    // Catch links rewritten in place right before navigation (Google swaps the
    // href on mousedown), which a mutation sweep alone would miss.
    document.addEventListener('mousedown', function(e) {
        const a = e.target && e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        _cleanedLinks.delete(a);
        cleanLinksIn(a.parentNode || document);
    }, true);
});


// ============================================================
// MODULE 12: GOOGLE SEARCH BLOCKLIST (hide sites from results)
// ============================================================
// Similar to uBlacklist — hides Google search results linking to blocked domains.
// Users add domains in settings (one per line), optionally toggle presets.
// Works on initial page load + dynamically loaded results (Endless Google).
if (ENV.isGoogleSearch) {
_safeRun('Module12:SearchBlocklist', function() {
    if (location.pathname !== '/search') return;

    // Build the active blocklist from user settings + enabled presets
    function buildBlocklist() {
        var domains = [];

        // User-defined sites
        var userSites = (SUITE_SETTINGS.blockedSites || '').split('\n');
        for (var i = 0; i < userSites.length; i++) {
            var d = userSites[i].trim().toLowerCase()
                .replace(/^\*?:?\/\/\*?\.?/, '') // strip *://*.
                .replace(/\/\*$/, '')             // strip trailing /*
                .replace(/^www\./, '');            // strip www.
            if (d && d.indexOf('.') !== -1) domains.push(d);
        }

        // Presets — sourced from BLOCK_PRESETS so the panel's counter and the
        // matcher can never disagree about what a preset contains.
        var presets = activePresetDomains();
        for (var j = 0; j < presets.length; j++) {
            if (domains.indexOf(presets[j]) === -1) domains.push(presets[j]);
        }

        return domains;
    }

    // Check if a URL matches any blocked domain
    function isBlockedUrl(href, blocklist) {
        if (!href) return false;
        try {
            var hostname = new URL(href).hostname.toLowerCase().replace(/^www\./, '');
            for (var i = 0; i < blocklist.length; i++) {
                // Exact match or subdomain match (e.g. "m.facebook.com" matches "facebook.com")
                if (hostname === blocklist[i] || hostname.endsWith('.' + blocklist[i])) return true;
            }
        } catch(e) {}
        return false;
    }

    // Hide a single result element
    function hideResult(el) {
        if (el.dataset.pytBlocked) return; // already processed
        el.dataset.pytBlocked = '1';
        el.style.setProperty('display', 'none', 'important');
    }

    // Scan and hide matching results in a container
    function scanResults(root) {
        var blocklist = buildBlocklist();
        if (blocklist.length === 0) return;

        // --- Strategy 1: Block known result containers ---
        // Google uses different DOM structures across tabs:
        //   Web:    .g, .MjjYud, .tF2Cxc
        //   Videos: video-voyager, .pkG3hd, .ct3b9e, [data-header-feature]
        //   News:   .WlydOe, .SoaBEf, .JJZKK
        //   All:    [data-hveid] is present on most result wrappers
        var RESULT_SELECTORS = '.g, .MjjYud, .tF2Cxc, video-voyager, .pkG3hd, .ct3b9e, .WlydOe, .SoaBEf, .JJZKK, [data-hveid]';

        var resultBlocks = root.querySelectorAll(RESULT_SELECTORS);
        for (var i = 0; i < resultBlocks.length; i++) {
            var block = resultBlocks[i];
            if (block.dataset.pytBlocked) continue;

            var links = block.querySelectorAll('a[href]');
            var matched = false;
            for (var j = 0; j < links.length; j++) {
                var href = links[j].getAttribute('href');
                if (!href || href === '#') continue;

                // Decode Google redirect URLs: /url?q=..., /url?url=...
                if (href.startsWith('/url')) {
                    var m = /[?&](?:q|url)=([^&]+)/.exec(href);
                    if (m) href = decodeURIComponent(m[1]); else continue;
                }
                // Skip internal Google navigation links
                if (href.startsWith('/search') || href.startsWith('/webhp') || href.startsWith('#')) continue;

                if (isBlockedUrl(href, blocklist)) { matched = true; break; }
            }

            if (matched) {
                // Walk up to find the best parent to hide
                var target = findHideTarget(block);
                hideResult(target);
            }
        }

        // --- Strategy 2: Broad sweep for any remaining links ---
        // Catches edge cases: new Google layouts, video carousels, featured snippets
        // We find all <a> linking to blocked domains, then walk up to the nearest
        // result-like container and hide it.
        var allLinks = root.querySelectorAll('a[href]');
        for (var k = 0; k < allLinks.length; k++) {
            var aHref = allLinks[k].getAttribute('href');
            if (!aHref || aHref === '#' || aHref.startsWith('/search') || aHref.startsWith('/webhp')) continue;

            // Decode /url redirects
            if (aHref.startsWith('/url')) {
                var m2 = /[?&](?:q|url)=([^&]+)/.exec(aHref);
                if (m2) aHref = decodeURIComponent(m2[1]); else continue;
            }

            if (!isBlockedUrl(aHref, blocklist)) continue;

            // Walk up from the <a> to find a result container to hide
            var container = allLinks[k].closest('.g, .MjjYud, .tF2Cxc, video-voyager, .pkG3hd, .ct3b9e, .WlydOe, .SoaBEf, .JJZKK, [data-hveid]');
            if (container) {
                hideResult(findHideTarget(container));
            } else {
                // No known container — walk up max 6 levels to find a reasonable block
                var el = allLinks[k].parentElement;
                for (var depth = 0; el && depth < 6; depth++) {
                    // Stop at a structural boundary (something that looks like a result card)
                    if (el.getAttribute('data-hveid') || el.getAttribute('data-ved') ||
                        (el.offsetHeight > 40 && el.offsetWidth > 200 && el.children.length >= 2)) {
                        hideResult(el);
                        break;
                    }
                    el = el.parentElement;
                }
            }
        }
    }

    // Find the outermost result wrapper to hide (avoids leaving empty gaps)
    function findHideTarget(block) {
        var target = block;
        // .MjjYud > .g — hide .MjjYud
        if (block.classList.contains('g') && block.parentElement && block.parentElement.classList.contains('MjjYud')) {
            target = block.parentElement;
        }
        // video-voyager is usually inside a wrapper div
        if (block.tagName === 'VIDEO-VOYAGER' && block.parentElement && block.parentElement.getAttribute('data-hveid')) {
            target = block.parentElement;
        }
        return target;
    }

    // Initial scan when DOM is ready
    function initBlocklist() {
        scanResults(document);
    }

    // Watch for new results (Endless Google, dynamic loading, tab switching)
    // Uses the shared MutationObserver to reduce overhead
    function observeNewResults() {
        let scanTimer = null;
        registerMutationCallback(function() {
            // Debounce: Google often adds many nodes in rapid succession
            if (scanTimer) clearTimeout(scanTimer);
            scanTimer = setTimeout(function() {
                scanTimer = null;
                scanResults(document);
            }, 150);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { initBlocklist(); observeNewResults(); }, { once: true });
    } else {
        initBlocklist();
        observeNewResults();
    }
}); // END Module 12
} // end if Google Search


// ============================================================
// MODULE 1: GOOGLE ANTI-TRACK (Don't Track Me Google v4.30+)
// ============================================================
_safeRun('Module1:GoogleAntiTrack', function() {

document.addEventListener('mousedown', handlePointerPress, true);
document.addEventListener('touchstart', handlePointerPress, { capture: true, passive: true });
document.addEventListener('click', handleClick, true);
let scriptCspNonce;
let needsCspNonce = typeof browser !== 'undefined';
const preferenceObservers = [];

let forceNoReferrer = true;
let noping = true;
let stripAiOverviews = false;   // owned by Module 11's webOnlyResults now

setupAggresiveUglyLinkPreventer();

if (typeof chrome == 'object' && chrome.storage) {
    (chrome.storage.sync || chrome.storage.local).get({
        forceNoReferrer: true, referrerPolicy: 'no-referrer', noping: true, stripAiOverviews: false,
    }, function(items) {
        if (items) {
            if (items.referrerPolicy === '') items.forceNoReferrer = false;
            forceNoReferrer = items.forceNoReferrer; noping = items.noping; stripAiOverviews = items.stripAiOverviews;
            callPreferenceObservers();
        }
    });
    chrome.storage.onChanged.addListener(function(changes) {
        if (changes.forceNoReferrer) forceNoReferrer = changes.forceNoReferrer.newValue;
        if (changes.noping) noping = changes.noping.newValue;
        if (changes.stripAiOverviews) stripAiOverviews = changes.stripAiOverviews.newValue;
        callPreferenceObservers();
    });
}

// (udm=14 handling lives in Module 11, driven by the webOnlyResults setting.)

function callImmediatelyAndOnPreferenceUpdate(callback) { callback(); preferenceObservers.push(callback); }
function callPreferenceObservers() { for (var i = 0; i < preferenceObservers.length; i++) preferenceObservers[i](); }
function getReferrerPolicy() { return forceNoReferrer ? 'origin' : ''; }
function updateReferrerPolicy(a) { if (a.referrerPolicy === 'no-referrer') return; var rp = getReferrerPolicy(); if (rp) a.referrerPolicy = rp; }

function handlePointerPress(e) {
    var a = e.target; while (a && !a.href) a = a.parentElement; if (!a) return;
    var inlineMousedown = a.getAttribute('onmousedown');
    if (inlineMousedown && /\ba?rwt\(/.test(inlineMousedown)) { a.removeAttribute('onmousedown'); a.removeAttribute('ping'); e.stopImmediatePropagation(); }
    var inlineTouchstart = a.getAttribute('ontouchstart');
    if (inlineTouchstart && /\ba?rwt\(/.test(inlineTouchstart)) a.removeAttribute('ontouchstart');
    var inlineClick = a.getAttribute('onclick');
    if (inlineClick && /\ba?rwt\(/.test(inlineClick)) a.removeAttribute('onclick');
    if (noping) a.removeAttribute('ping');
    var realLink = getRealLinkFromGoogleUrl(a);
    if (realLink) { a.href = realLink; realLink = getRealLinkFromGoogleUrl(a); if (realLink) a.href = realLink; }
    if (a.dataset && a.dataset.ved) a.removeAttribute('data-ved');
    updateReferrerPolicy(a);
    if (e.eventPhase === Event.CAPTURING_PHASE) { var eo = { capture: false, once: true }; a.addEventListener(e.type, handlePointerPress, eo); document.addEventListener(e.type, handlePointerPress, eo); }
}

const safelistDomains = /\.(zoom\.us|teams\.microsoft\.com|teams\.live\.com|webex\.com|gotomeeting\.com|whereby\.com)$/;

function handleClick(e) {
    if (e.button !== 0) return;
    var a = e.target; while (a && !a.href) a = a.parentElement; if (!a) return;
    if (a.dataset && a.dataset.url) { var realLink = getSanitizedIntentUrl(a.dataset.url); if (realLink) a.dataset.url = realLink; }
    if (!location.hostname.startsWith('mail.')) return;
    if (a.origin === location.origin) return;
    if (a.protocol !== 'http:' && a.protocol !== 'https:' && a.protocol !== 'ftp:') return;
    if (safelistDomains.test(a.hostname)) return;
    if (a.target === '_blank') { e.stopPropagation(); updateReferrerPolicy(a); }
}

function decodeGoogleNewsUrl(articleId) {
    try {
        var b64 = articleId.replace(/-/g, '+').replace(/_/g, '/'); while (b64.length % 4) b64 += '=';
        var decoded = atob(b64); var idx = decoded.indexOf('\x68\x74\x74\x70'); if (idx === -1) return;
        var url = ''; for (var i = idx; i < decoded.length; i++) { var code = decoded.charCodeAt(i); if (code < 32 || code > 126) break; url += decoded[i]; }
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
    } catch (e) {}
}

function getRealLinkFromGoogleUrl(a) {
    if (a.protocol !== 'https:' && a.protocol !== 'http:') return;
    var url, hn = a.hostname, pn = a.pathname;
    if ((hn === location.hostname || hn === 'www.google.com') && (pn === '/url' || pn === '/local_url' || pn === '/searchurl/rr.html' || pn === '/linkredirect')) {
        url = /[?&](?:q|url|dest)=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]);
        url = /[?&](?:q|url)=((?:%2[Ff]|\/)[^&]+)/.exec(a.search); if (url) return a.origin + decodeURIComponent(url[1]);
        url = /[#&]url=(https?[:%][^&]+)/.exec(a.hash); if (url) return decodeURIComponent(url[1]);
    }
    if (hn === 'googleweblight.com' && pn === '/fp') { url = /[?&]u=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); }
    if (hn === 'news.google.com' && (pn.startsWith('/articles/') || pn.startsWith('/read/') || pn.startsWith('/rss/articles/'))) { var parts = pn.split('/'); var articleId = parts[parts.length - 1]; if (articleId) return decodeGoogleNewsUrl(articleId); }
    if ((hn === 'www.youtube.com' || hn === 'youtube.com' || hn === 'm.youtube.com') && pn === '/redirect') { url = /[?&]q=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); }
    if ((hn === location.hostname || hn === 'www.google.com') && pn === '/imgres') { url = /[?&]imgrefurl=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); url = /[?&]imgurl=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); }
    if ((hn === location.hostname || hn === 'www.google.com') && pn.startsWith('/amp/s/')) { var ampUrl = pn.substring('/amp/s/'.length); if (ampUrl) return 'https://' + ampUrl + a.search + a.hash; }
    if (hn === 'scholar.google.com' && pn === '/scholar_url') { url = /[?&]url=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); }
    if (hn === 'translate.google.com' && pn === '/translate') { url = /[?&]u=((?:https?|ftp)[%:][^&]+)/.exec(a.search); if (url) return decodeURIComponent(url[1]); }
}

function getSanitizedIntentUrl(intentUrl) {
    if (!intentUrl.startsWith('intent:')) return;
    var BFU = ';S.browser_fallback_url='; var is = intentUrl.indexOf(BFU); if (is === -1) return;
    is += BFU.length; var ie = intentUrl.indexOf(';', is); ie = ie === -1 ? intentUrl.length : ie;
    var url = decodeURIComponent(intentUrl.substring(is, ie)); var realUrl = getRealLinkFromGoogleUrl(newURL(url)); if (!realUrl) return;
    return intentUrl.substring(0, is) + encodeURIComponent(realUrl) + intentUrl.substring(ie);
}

function setScriptContent(script, code) {
    var pageWindow = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
    try { if (pageWindow.trustedTypes && pageWindow.trustedTypes.createPolicy) { var policy = pageWindow.trustedTypes.createPolicy('dont-track-me-google-' + Math.random().toString(36).slice(2), { createScript: function(s) { return s; } }); script.textContent = policy.createScript(code); return; } } catch (e) {}
    script.textContent = code;
}

function setupAggresiveUglyLinkPreventer() {
    var s = document.createElement('script');
    if (getScriptCspNonce()) s.setAttribute('nonce', scriptCspNonce);
    else if (document.readyState !== 'complete' && needsCspNonce) { findScriptCspNonce(setupAggresiveUglyLinkPreventer); return; }
    setScriptContent(s, '(' + function(getRealLinkFromGoogleUrl) {
        var proto = HTMLAnchorElement.prototype;
        var hrefProp = Object.getOwnPropertyDescriptor(proto, 'href');
        var hrefGet = Function.prototype.call.bind(hrefProp.get);
        var hrefSet = Function.prototype.call.bind(hrefProp.set);
        Object.defineProperty(proto, 'href', { configurable: true, enumerable: true, get() { return hrefGet(this); }, set(v) { hrefSet(this, v); try { v = getRealLinkFromGoogleUrl(this); if (v) hrefSet(this, v); } catch (e) {} updateReferrerPolicy(this); }, });
        function replaceAMethod(n, f) { Object.defineProperty(proto, n, { configurable: true, enumerable: false, writable: true, value: f }); }
        var setAttribute = Function.prototype.call.bind(proto.setAttribute);
        replaceAMethod('setAttribute', function(name, value) { if (name === 'href' || name === 'HREF') this.href = value; else setAttribute(this, name, value); });
        var aDispatchEvent = Function.prototype.apply.bind(proto.dispatchEvent);
        replaceAMethod('dispatchEvent', function() { updateReferrerPolicy(this); return aDispatchEvent(this, arguments); });
        var aClick = Function.prototype.apply.bind(proto.click);
        replaceAMethod('click', function() { updateReferrerPolicy(this); return aClick(this, arguments); });
        var rpProp = Object.getOwnPropertyDescriptor(proto, 'referrerPolicy');
        var rpGet = Function.prototype.call.bind(rpProp.get); var rpSet = Function.prototype.call.bind(rpProp.set);
        var currentScript = document.currentScript;
        var getReferrerPolicy = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'referrerPolicy').get.bind(currentScript);
        function updateReferrerPolicy(a) { try { if (rpGet(a) === 'no-referrer') return; var rp = getReferrerPolicy(); if (rp) rpSet(a, rp); } catch (e) {} }
        currentScript.dataset.jsEnabled = 1;
    } + ')(' + getRealLinkFromGoogleUrl + ');');
    callImmediatelyAndOnPreferenceUpdate(function() { s.referrerPolicy = getReferrerPolicy(); });
    _appendToHead(s); s.remove();
    if (!s.dataset.jsEnabled) { cleanLinksWhenJsIsDisabled(); if (!needsCspNonce) { needsCspNonce = true; findScriptCspNonce(function() { if (scriptCspNonce) setupAggresiveUglyLinkPreventer(); }); } }
    else { blockAllTracking(); overwriteWindowOpen(); if (location.hostname === 'docs.google.com') cleanLinksWhenJsIsDisabled(); }
}

function blockAllTracking() {
    var s = document.createElement('script'); if (getScriptCspNonce()) s.setAttribute('nonce', scriptCspNonce);
    setScriptContent(s, '(' + function() {
        var isTrackingUrl = RegExp.prototype.test.bind(/^(?:(?:https?:\/\/[^\/]+)?\/)?(?:gen_204|log)(?:[?#]|$)/);
        var navProto = window.Navigator.prototype; var navProtoSendBeacon = navProto.sendBeacon;
        if (navProtoSendBeacon) { var sendBeacon = Function.prototype.apply.bind(navProtoSendBeacon); var cs = document.currentScript; var getId = Object.getOwnPropertyDescriptor(Element.prototype, 'id').get.bind(cs); navProto.sendBeacon = function(url) { try { if (isTrackingUrl(url) && getId() !== '_dtmg_do_not_touch_ping') return true; } catch(e) { if (isTrackingUrl(url)) return true; } return sendBeacon(this, arguments); }; }
        var originalFetch = window.fetch; if (originalFetch) { window.fetch = function(resource) { try { var url = (resource && typeof resource === 'object' && resource.url) ? resource.url : resource; if (typeof url === 'string' && isTrackingUrl(url)) return Promise.resolve(new Response('', {status: 204})); } catch (e) {} return originalFetch.apply(this, arguments); }; }
        var blockedXHRs = new WeakSet(); var xhrProto = XMLHttpRequest.prototype; var originalOpen = xhrProto.open; var originalSend = xhrProto.send;
        xhrProto.open = function(method, url) { try { if (typeof url === 'string' && isTrackingUrl(url)) blockedXHRs.add(this); else blockedXHRs.delete(this); } catch (e) {} return originalOpen.apply(this, arguments); };
        xhrProto.send = function() { try { if (blockedXHRs.has(this)) { Object.defineProperty(this, 'readyState', { value: 4, configurable: true }); Object.defineProperty(this, 'status', { value: 204, configurable: true }); Object.defineProperty(this, 'responseText', { value: '', configurable: true }); if (typeof this.onreadystatechange === 'function') this.onreadystatechange(); return; } } catch (e) {} return originalSend.apply(this, arguments); };
    } + ')();');
    callImmediatelyAndOnPreferenceUpdate(function() { s.id = noping ? '' : '_dtmg_do_not_touch_ping'; });
    _appendToHead(s); s.remove();
}

function overwriteWindowOpen() {
    var s = document.createElement('script'); if (getScriptCspNonce()) s.setAttribute('nonce', scriptCspNonce);
    setScriptContent(s, '(' + function() {
        var open = window.open;
        window.open = function(url, windowName, windowFeatures) {
            var isBlankUrl = !url || url === "about:blank";
            try { if (!isBlankUrl) { var a = document.createElement('a'); a.href = url; url = a.href; if (a.referrerPolicy && a.origin !== location.origin && !/\.google\.([a-z]+)$/.test(a.hostname) && !/\.(zoom\.us|teams\.microsoft\.com|teams\.live\.com|webex\.com)$/.test(a.hostname) && !/\bopener|noreferrer/.test(windowFeatures)) { windowFeatures = (windowFeatures ? windowFeatures + ',' : '') + 'noreferrer'; } } } catch (e) {}
            var win = open(url, windowName, windowFeatures);
            try { if (isBlankUrl && win) { var doc = win.document; var docWrite = win.Function.prototype.call.bind(doc.write); doc.write = function(markup) { try { markup = fixupDocMarkup(markup); } catch (e) {} return docWrite(this, markup); }; } } catch (e) {}
            return win;
        };
        function fixupDocMarkup(html) { return (html || '' + '').replace(/<meta [^>]*http-equiv=(["']?)refresh\1[^>]*>/i, function(m) { var doc = new DOMParser().parseFromString(m, 'text/html'); var meta = doc.querySelector('meta[http-equiv=refresh]'); return meta && fixupMetaUrl(meta) || m; }); }
        function fixupMetaUrl(meta) { var parts = /^(\d*;\s*url=)(.+)$/i.exec(meta.content); if (!parts) return; var a = document.createElement('a'); a.href = parts[2]; meta.content = parts[1] + a.href; var html = meta.outerHTML; if (a.referrerPolicy) html = '<meta name="referrer" content="no-referrer">' + html; return html; }
    } + ')();');
    _appendToHead(s); s.remove();
}

function cleanSingleLink(a) { var href = a.href && getRealLinkFromGoogleUrl(a); if (href) a.href = href; if (noping) a.removeAttribute('ping'); var onmousedown = a.getAttribute('onmousedown'); if (onmousedown && /\ba?rwt\(/.test(onmousedown)) a.removeAttribute('onmousedown'); if (a.hasAttribute('data-ved')) a.removeAttribute('data-ved'); }

function cleanLinksWhenJsIsDisabled() {
    if (document.readyState == 'complete') { cleanAllLinks(); return; }
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('DOMContentLoaded', function() { document.removeEventListener('mouseover', handleMouseOver); cleanAllLinks(); setupDynamicLinkCleaner(); }, {once: true});
    function cleanAllLinks() { var as = document.querySelectorAll('a[href]'); for (var i = 0; i < as.length; ++i) cleanSingleLink(as[i]); }
    function handleMouseOver(e) { if (e.target.tagName === 'A') cleanSingleLink(e.target); }
}

function setupDynamicLinkCleaner() {
    if (typeof MutationObserver === 'undefined') return;
    if (!ENV.isGoogleSearch && location.hostname !== 'news.google.com') return;
    // Uses the shared MutationObserver to reduce overhead
    let debounceTimer;
    registerMutationCallback(function(mutations) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            debounceTimer = null;
            for (let i = 0; i < mutations.length; i++) {
                const added = mutations[i].addedNodes;
                for (let j = 0; j < added.length; j++) {
                    const node = added[j];
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;
                    if (node.tagName === 'A' && node.href) cleanSingleLink(node);
                    const links = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
                    for (let k = 0; k < links.length; k++) cleanSingleLink(links[k]);
                }
            }
        }, 100);
    });
}

function getScriptCspNonce() { var scripts = document.querySelectorAll('script[nonce]'); for (var i = 0; i < scripts.length && !scriptCspNonce; ++i) scriptCspNonce = scripts[i].nonce; return scriptCspNonce; }
function findScriptCspNonce(callback) { var timer; function checkDOM() { if (getScriptCspNonce() || document.readyState === 'complete') { document.removeEventListener('DOMContentLoaded', checkDOM, true); if (timer) clearTimeout(timer); callback(); return; } timer = setTimeout(checkDOM, 50); } document.addEventListener('DOMContentLoaded', checkDOM, true); checkDOM(); }
function newURL(href) { try { return new URL(href); } catch (e) { var a = document.createElement('a'); a.href = href; return a; } }

}); // END MODULE 1


// ============================================================
// MODULE 6: GOOGLE ENDLESS SCROLL
// ============================================================
if (ENV.isGoogleSearch && SUITE_SETTINGS.endlessGoogle) {
_safeRun('Module6:EndlessGoogle', function() {
    if (location.href.indexOf('tbm=isch') !== -1) return;
    if (location.pathname !== '/search') return;
    if (window.top !== window.self) return;

    const loadWindowSize = 1.6;
    const filtersAll = ['#foot', '#bottomads'];
    const filtersCol = filtersAll.concat(['#extrares', '#imagebox_bigimages']);

    const endlessCSS = document.createElement('style');
    endlessCSS.textContent = '.pyt-page-divider{position:relative;display:flex;flex-direction:row-reverse;align-items:center;margin:1.5em 0;color:#808080;font-size:13px}.pyt-page-divider::before{content:"";background-color:#dadce0;height:1px;width:100%;margin:0 1.5em}html[dark] .pyt-page-divider::before{background-color:#3c4043}html[dark] .pyt-page-divider{color:#9aa0a6}.pyt-endless-msg{position:fixed;bottom:12px;left:12px;padding:6px 14px;background:#1a73e8;color:#fff;font-size:12px;border-radius:6px;z-index:99999;display:none;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.15)}.pyt-endless-msg.shown{display:block}';

    // Honour the page the user actually landed on: if they opened `&start=30`,
    // the next fetch must be 40, not 10.
    const startOffset = parseInt(new URL(location.href).searchParams.get('start'), 10) || 0;
    const RESULTS_PER_PAGE = parseInt(new URL(location.href).searchParams.get('num'), 10) || 10;
    const maxPages = Math.max(1, parseInt(SUITE_SETTINGS.endlessMaxPages, 10) || 5);
    let pageNumber = 1, prevScrollY = 0, nextPageLoading = false, noMoreResults = false, msgEl = null;

    function filterNode(node, filters) { for (var i = 0; i < filters.length; i++) { var child = node.querySelector(filters[i]); if (child && child.parentNode) child.parentNode.removeChild(child); } }

    function requestNextPage() {
        if (noMoreResults) return;
        if (pageNumber >= maxPages) {
            noMoreResults = true;
            if (msgEl) { msgEl.textContent = 'Endless scroll: page limit (' + maxPages + ') reached'; msgEl.classList.add('shown'); setTimeout(function() { msgEl.classList.remove('shown'); }, 3000); }
            return;
        }
        var nextUrl = new URL(location.href); if (!nextUrl.searchParams.has('q')) return;
        nextPageLoading = true;
        nextUrl.searchParams.set('start', String(startOffset + pageNumber * RESULTS_PER_PAGE));
        if (msgEl) msgEl.classList.add('shown');
        fetch(nextUrl.href, { credentials: 'same-origin' }).then(function(r) {
            // A redirect to /sorry/ is Google's rate-limit / CAPTCHA wall. Hammering
            // it makes things worse, so stop scrolling entirely and say so.
            if (r.redirected && r.url.indexOf('/sorry/') !== -1) throw new Error('__pyt_captcha__');
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
        }).then(function(text) {
            var doc = new DOMParser().parseFromString(text, 'text/html');
            var content = doc.querySelector('#center_col') || doc.querySelector('#rcnt');
            if (!content || (!content.querySelector('#rso') && !content.querySelector('.g'))) { noMoreResults = true; nextPageLoading = false; if (msgEl) msgEl.classList.remove('shown'); return; }
            content.id = 'pyt_page_' + pageNumber; filterNode(content, filtersCol); content.style.marginLeft = '0';
            var divider = document.createElement('div'); divider.textContent = 'Page ' + (pageNumber + 1); divider.className = 'pyt-page-divider';
            var container = document.querySelector('#center_col') || document.querySelector('#rcnt');
            if (container) { container.appendChild(divider); container.appendChild(content); }
            pageNumber++; nextPageLoading = false; if (msgEl) msgEl.classList.remove('shown');
        }).catch(function(err) {
            nextPageLoading = false;
            var captcha = err && err.message === '__pyt_captcha__';
            if (captcha) noMoreResults = true;
            else console.warn('[PrivacySuite] Endless scroll error:', err);
            if (msgEl) {
                msgEl.textContent = captcha ? 'Google rate-limited us — endless scroll paused' : 'Failed to load next page';
                msgEl.style.background = '#d93025';
                msgEl.classList.add('shown');
                setTimeout(function() {
                    msgEl.classList.remove('shown');
                    msgEl.textContent = 'Loading next page...';
                    msgEl.style.background = '#1a73e8';
                }, 3000);
            }
        });
    }

    function onScroll() {
        var y = window.scrollY; var delta = y - prevScrollY;
        var docHeight = Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0);
        if (!nextPageLoading && !noMoreResults && delta > 0 && y + window.innerHeight * loadWindowSize >= docHeight) requestNextPage();
        prevScrollY = y;
    }

    function initEndless() {
        prevScrollY = window.scrollY; window.addEventListener('scroll', onScroll, { passive: true }); filterNode(document, filtersAll);
        _appendToHead(endlessCSS);
        msgEl = document.createElement('div'); msgEl.className = 'pyt-endless-msg'; msgEl.textContent = 'Loading next page...';
        document.body.appendChild(msgEl);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEndless, { once: true });
    else initEndless();
}); // END Module 6
} // end if Google Search


// ============================================================
// YOUTUBE MODULES: SHARED INFRASTRUCTURE
// ============================================================
if (ENV.isYouTube) {
_safeRun('YouTube:SharedInit', function() {

// ============================================================
// AD DEFENCE — LAYER 0: API / NETWORK
// ============================================================
// The deepest layer: ad payloads are removed from YouTube's JSON before any
// renderer ever sees them. When this works, layers 1-5 have nothing to do.
// It must run before Module 5's own JSON.parse hook installs (Module 5 is at
// the bottom of this file and captures whatever JSON.parse is at that moment),
// so the two hooks chain instead of clobbering each other:
//     JSON.parse -> Module5 (age unlock) -> Layer 0 (ad strip) -> native
const _nativeJSONParse = JSON.parse;
const _nativeJSONStringify = JSON.stringify;

const AD_FIELDS = ['adPlacements', 'playerAds', 'adSlots', 'adBreakHeartbeatParams', 'adBreakParams', 'ad3Module', 'adSafetyReason'];
const AD_RENDERERS = ['adSlotRenderer', 'displayAdRenderer', 'promotedVideoRenderer', 'promotedSparklesWebRenderer', 'promotedSparklesTextSearchRenderer', 'compactPromotedVideoRenderer', 'compactPromotedItemRenderer', 'inFeedAdLayoutRenderer', 'carouselAdRenderer', 'linearAdSequenceRenderer', 'actionCompanionAdRenderer', 'bannerPromoRenderer', 'statementBannerRenderer', 'brandVideoSingletonRenderer', 'brandVideoShelfRenderer'];

// Cheap string pre-filter: walking a 3MB response object costs far more than
// scanning the raw text once, and the overwhelming majority carry no ads.
const AD_NEEDLES = AD_FIELDS.concat(AD_RENDERERS).map(function(k) { return '"' + k + '"'; }).concat(['"isAd":true']);
function textHasAds(text) {
    if (typeof text !== 'string') return false;
    for (let i = 0; i < AD_NEEDLES.length; i++) if (text.indexOf(AD_NEEDLES[i]) !== -1) return true;
    return false;
}

function isAdRenderer(item) {
    if (!item || typeof item !== 'object') return false;
    for (let i = 0; i < AD_RENDERERS.length; i++) if (Object.prototype.hasOwnProperty.call(item, AD_RENDERERS[i])) return true;
    return false;
}

// A feed entry is an ad if it *is* an ad renderer, or wraps one, or is a
// Shorts reel flagged isAd. These arrive as array members, so they must be
// spliced out rather than blanked — a null hole makes the renderer throw.
function isAdEntry(item) {
    if (!item || typeof item !== 'object') return false;
    if (isAdRenderer(item)) return true;
    if (item.richItemRenderer && isAdRenderer(item.richItemRenderer.content)) return true;
    if (item.richSectionRenderer && isAdRenderer(item.richSectionRenderer.content)) return true;
    const reel = (item.command && item.command.reelWatchEndpoint) || item.reelWatchEndpoint;
    if (reel && reel.adClientParams && reel.adClientParams.isAd) return true;
    return false;
}

// WeakSet guard: YouTube's response graphs contain cycles, and without it this
// recursion never terminates.
function stripAds(node, seen) {
    if (!node || typeof node !== 'object') return node;
    seen = seen || new WeakSet();
    if (seen.has(node)) return node;
    seen.add(node);

    if (Array.isArray(node)) {
        for (let i = node.length - 1; i >= 0; i--) {
            if (isAdEntry(node[i])) { node.splice(i, 1); continue; }
            stripAds(node[i], seen);
        }
        return node;
    }
    for (let i = 0; i < AD_FIELDS.length; i++) delete node[AD_FIELDS[i]];
    for (let i = 0; i < AD_RENDERERS.length; i++) delete node[AD_RENDERERS[i]];
    for (const k in node) if (node[k] && typeof node[k] === 'object') stripAds(node[k], seen);
    return node;
}

function stripAdsFromText(text) {
    if (!textHasAds(text)) return text;
    try { return _nativeJSONStringify(stripAds(_nativeJSONParse(text))); }
    catch (e) { return text; }
}

const _layerJsonParse = registerLayer('ads', 'json-parse', function(text, parsed) {
    if (!textHasAds(text)) return false;
    stripAds(parsed);
    return true;
});
JSON.parse = function(text, reviver) {
    const parsed = _nativeJSONParse.call(this, text, reviver);
    _layerJsonParse(text, parsed);
    return parsed;
};

// fetch() responses — YouTube reads most feeds through Response.json().
const _isYtApiUrl = function(url) {
    return typeof url === 'string' && (url.indexOf('/youtubei/v1/') !== -1 || url.indexOf('/watch?') !== -1 || url.indexOf('/playlist?') !== -1);
};
_safeRun('Ads:L0:fetch', function() {
    const nativeJson = Response.prototype.json;
    const nativeText = Response.prototype.text;
    const onJson = registerLayer('ads', 'response-json', function(url, data) {
        if (!_isYtApiUrl(url)) return false;
        stripAds(data);
        return true;
    });
    Response.prototype.json = function() {
        const self = this;
        return nativeJson.call(this).then(function(data) { onJson(self.url, data); return data; });
    };
    Response.prototype.text = function() {
        const self = this;
        return nativeText.call(this).then(function(txt) { return _isYtApiUrl(self.url) ? stripAdsFromText(txt) : txt; });
    };
});

// XHR responses — the legacy path, still used for some continuations.
_safeRun('Ads:L0:xhr', function() {
    const urls = new WeakMap();
    const nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        try { urls.set(this, new URL(url, location.href).href); } catch (e) { urls.set(this, String(url)); }
        return nativeOpen.apply(this, arguments);
    };
    function hookGetter(name, filter) {
        const d = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, name);
        if (!d || !d.get || !d.configurable) return;
        Object.defineProperty(XMLHttpRequest.prototype, name, {
            configurable: true, enumerable: d.enumerable,
            get: function() {
                const out = d.get.call(this);
                return _isYtApiUrl(urls.get(this)) ? filter(out) : out;
            }
        });
    }
    hookGetter('responseText', function(out) { return typeof out === 'string' ? stripAdsFromText(out) : out; });
    hookGetter('response', function(out) {
        if (typeof out === 'string') return stripAdsFromText(out);
        if (out && typeof out === 'object') stripAds(out);
        return out;
    });
});

// The bootstrap payloads inlined in the HTML — these are assigned before any
// network request happens, so they need their own trap.
_safeRun('Ads:L0:bootstrap', function() {
    ['ytInitialPlayerResponse', 'ytInitialData'].forEach(function(name) {
        const existing = Object.getOwnPropertyDescriptor(window, name);
        if (existing && !existing.configurable) { try { stripAds(window[name]); } catch (e) {} return; }
        let stored = window[name];
        if (stored) stripAds(stored);
        Object.defineProperty(window, name, {
            configurable: true, enumerable: true,
            get: function() { return stored; },
            set: function(v) { stripAds(v); stored = v; }
        });
    });
});

const gridCols = SUITE_SETTINGS.gridColumns || 5;

const ytStyleEl = document.createElement('style');
ytStyleEl.id = '__privacy_yt_suite_styles';
let ytCSS = '';

// --- Anti-Shorts CSS ---
if (SUITE_SETTINGS.hideShorts)
ytCSS += 'ytm-pivot-bar-item-renderer:has(.pivot-shorts),ytd-mini-guide-entry-renderer[aria-label="Shorts"],a.yt-simple-endpoint.style-scope.ytd-guide-entry-renderer[title="Shorts"],ytd-reel-shelf-renderer.style-scope:is(.ytd-item-section-renderer,.ytd-structured-description-content-renderer),ytd-rich-shelf-renderer[is-shorts],ytm-rich-section-renderer:has(a[href^="/shorts"]),ytm-reel-shelf-renderer:has(a[href^="/shorts"]),grid-shelf-view-model.ytGridShelfViewModelHost:has(a[href^="/shorts"]),[is-short],[is-shorts-grid] ytd-continuation-item-renderer,ytd-video-renderer:has(a[href^="/shorts"]),ytd-reel-item-renderer:has(a[href^="/shorts"]),ytd-rich-item-renderer:has(a[href^="/shorts"]),ytd-grid-video-renderer:has(a[href^="/shorts"]),ytd-compact-video-renderer:has(a[href^="/shorts"]),ytd-search ytd-shelf-renderer:has(a[href^="/shorts"]),ytm-reel-item-renderer:has(a[href^="/shorts"]),ytm-video-with-context-renderer:has(a[href^="/shorts"]),ytm-compact-video-renderer:has(a[href^="/shorts"]),.ytGridShelfViewModelGridShelfItem:has(a[href^="/shorts"]),ytd-browse ytd-item-section-renderer:has(yt-img-shadow#avatar):has(div#title-text):has(ytd-video-renderer):has(a[href^="/shorts"]){display:none!important}';

// --- Ad Blocking CSS ---
ytCSS += '#masthead-ad,ytd-rich-item-renderer.style-scope.ytd-rich-grid-row #content:has(.ytd-display-ad-renderer),.video-ads.ytp-ad-module,tp-yt-paper-dialog:has(yt-mealbar-promo-renderer),yt-mealbar-promo-renderer,ytmusic-mealbar-promo-renderer,ytmusic-statement-banner-renderer,ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"],#related #player-ads,#related ytd-ad-slot-renderer,ytd-ad-slot-renderer,ytd-popup-container:has(a[href="/premium"]),ad-slot-renderer,ytm-companion-ad-renderer,#player-ads,#panels>ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"],.ytp-featured-product,ytd-merch-shelf-renderer,.ytp-suggested-action,ytd-in-feed-ad-layout-renderer,ytd-banner-promo-renderer,.ytp-ad-avatar-lockup-card,ytd-promoted-sparkles-web-renderer,ytd-statement-banner-renderer,.ytp-ad-action-interstitial,.ytp-ad-overlay-container,.ytp-ad-image-overlay,ytd-promoted-video-renderer,ytd-brand-video-singleton-renderer{display:none!important}';
ytCSS += '#movie_player.ad-showing video.html5-main-video{filter:blur(40px) opacity(0.3) grayscale(0.8)!important;transition:filter 0.3s ease!important}';
ytCSS += '#movie_player.ad-showing .ytp-ad-text,#movie_player.ad-showing .ytp-ad-preview-container{filter:blur(3px) opacity(0.4)!important}';

// --- Hover Preview Blocker ---
if (SUITE_SETTINGS.hoverPreviewBlock) {
ytCSS += 'body:not([page-type="watch"]) ytd-moving-thumbnail-renderer,body:not([page-type="watch"]) .ytd-moving-thumbnail-renderer,ytd-thumbnail-overlay-loading-preview-renderer,.ytd-thumbnail-overlay-loading-preview-renderer,ytd-video-preview:not(#player-container ytd-video-preview),.ytd-video-preview:not(#player-container .ytd-video-preview),#video-preview-container:not(#player-container #video-preview-container),.video-preview-container:not(#player-container .video-preview-container),ytd-channel-video-player-renderer,#c4-player,ytd-player[context*="CHANNEL_TRAILER"]{display:none!important;visibility:hidden!important;height:0!important;width:0!important;overflow:hidden!important;pointer-events:none!important}';
ytCSS += 'ytd-thumbnail img,.ytd-thumbnail img{transition:none!important;opacity:1!important}';
}

// --- 5-Column Grid ---
ytCSS += 'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer,ytd-browse[page-subtype="channels"] ytd-rich-grid-renderer{--ytd-rich-grid-items-per-row:' + gridCols + '!important;--ytd-rich-grid-posts-per-row:' + gridCols + '!important;--ytd-rich-grid-slim-items-per-row:' + gridCols + '!important;--ytd-rich-grid-game-cards-per-row:' + gridCols + '!important;--ytd-rich-grid-mini-items-per-row:' + gridCols + '!important}';
ytCSS += 'ytd-browse[page-subtype="home"] ytd-rich-grid-row,ytd-browse[page-subtype="home"] #contents.ytd-rich-grid-row,ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-row,ytd-browse[page-subtype="subscriptions"] #contents.ytd-rich-grid-row,ytd-browse[page-subtype="channels"] ytd-rich-grid-row,ytd-browse[page-subtype="channels"] #contents.ytd-rich-grid-row{display:contents!important}';
ytCSS += 'ytd-browse[page-subtype="home"] ytd-rich-item-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-item-renderer{margin-right:calc(var(--ytd-rich-grid-item-margin,8px)/2)!important;margin-left:calc(var(--ytd-rich-grid-item-margin,8px)/2)!important}';
ytCSS += 'ytd-browse[page-subtype="home"] ytd-two-column-browse-results-renderer.grid:not(.grid-disabled),ytd-browse[page-subtype="subscriptions"] ytd-two-column-browse-results-renderer.grid:not(.grid-disabled){max-width:100%!important}';
ytCSS += 'ytd-browse[page-subtype="home"] ytd-two-column-browse-results-renderer.grid-5-columns,ytd-browse[page-subtype="home"] ytd-two-column-browse-results-renderer.grid-6-columns,ytd-browse[page-subtype="subscriptions"] ytd-two-column-browse-results-renderer.grid-5-columns,ytd-browse[page-subtype="subscriptions"] ytd-two-column-browse-results-renderer.grid-6-columns{width:100%!important;max-width:100%!important}';
ytCSS += 'ytd-browse[page-subtype="home"] ytd-rich-section-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-section-renderer{display:none!important}';
ytCSS += '@media(max-width:1200px){ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer{--ytd-rich-grid-items-per-row:3!important}}';
ytCSS += '@media(min-width:1201px) and (max-width:1600px){ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer{--ytd-rich-grid-items-per-row:4!important}}';
ytCSS += '@media(min-width:1601px){ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer{--ytd-rich-grid-items-per-row:' + gridCols + '!important}}';

// --- Watch Page Scroll Fix ---
ytCSS += 'ytd-page-manager,#page-manager.ytd-app{overflow-y:auto!important;overflow-x:hidden!important}ytd-app{overflow-y:auto!important}';
ytCSS += 'ytd-watch-flexy,ytd-watch-flexy #columns.ytd-watch-flexy,ytd-watch-flexy #primary.ytd-watch-flexy,ytd-watch-flexy #secondary.ytd-watch-flexy,ytd-watch-flexy #below.ytd-watch-flexy,ytd-watch-flexy #primary-inner.ytd-watch-flexy,ytd-watch-flexy #secondary-inner.ytd-watch-flexy{overflow:visible!important;max-height:none!important}';
ytCSS += 'ytd-watch-grid,ytd-watch-grid #primary.ytd-watch-grid,ytd-watch-grid #secondary.ytd-watch-grid,ytd-watch-grid #below.ytd-watch-grid{overflow:visible!important;max-height:none!important}';
ytCSS += 'ytd-watch-flexy[theater],ytd-watch-flexy[fullscreen]{overflow:visible!important}.ytp-fullscreen-grid{overflow:visible!important}';
ytCSS += 'html[watch-active] body,html body.watch-active{overflow-y:auto!important}ytd-watch-flexy:not([theater]):not([fullscreen]){min-height:0!important}';

// --- Still Watching popup ---
ytCSS += 'yt-confirm-dialog-renderer[dialog-type="confirm-interrupt"],tp-yt-paper-dialog:has(yt-confirm-dialog-renderer){display:none!important}';

// --- Focus Mode CSS ---
ytCSS += 'html.pyt-focus-mode ytd-watch-flexy #secondary.ytd-watch-flexy,html.pyt-focus-mode ytd-watch-flexy #related,html.pyt-focus-mode ytd-watch-next-secondary-results-renderer,html.pyt-focus-mode ytd-compact-video-renderer,html.pyt-focus-mode ytd-compact-radio-renderer{display:none!important}';
ytCSS += 'html.pyt-focus-mode #comments,html.pyt-focus-mode ytd-comments#comments{display:none!important}';
ytCSS += 'html.pyt-focus-mode .ytp-ce-element{display:none!important}';
ytCSS += 'html.pyt-focus-mode ytd-watch-flexy #primary.ytd-watch-flexy{max-width:100%!important}';
ytCSS += 'html.pyt-focus-mode .ytp-endscreen-content{display:none!important}';

// --- Remaining Time Display ---
ytCSS += '.pyt-remaining-time{display:inline-block;margin-left:8px;color:#aaa;font-size:12px;font-family:"Roboto",Arial,sans-serif;vertical-align:middle}';

ytStyleEl.textContent = ytCSS;
_appendToHead(ytStyleEl);

// *** MODULE 3: Shorts Redirect ***
// Build the watch URL properly. The old string-replace produced
// `/watch?v=ID?feature=share` for any Shorts link carrying a query, which
// YouTube reads as a video id of "ID?feature=share" and fails to load.
function shortsUrlToWatch(href) {
    let url;
    try { url = new URL(href, location.href); } catch (e) { return null; }
    const m = url.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (!m) return null;
    const watch = new URL('/watch', url.origin);
    watch.searchParams.set('v', m[1]);
    // Carry over the only parameters that mean anything on a watch page.
    const t = url.searchParams.get('t');
    if (t) watch.searchParams.set('t', t);
    const list = url.searchParams.get('list');
    if (list) watch.searchParams.set('list', list);
    return watch.href;
}

// Layer 1: we already landed on a Shorts URL — swap the document.
function redirectShorts() {
    if (!SUITE_SETTINGS.shortsRedirect) return false;
    const target = shortsUrlToWatch(location.href);
    if (!target) return false;
    location.replace(target);
    return true;
}

// Layer 2: rewrite Shorts links before they are ever clicked, so the Shorts
// player is not loaded and then thrown away.
const rewriteShortsLinks = registerLayer('shorts', 'link-rewrite', function(root) {
    if (!SUITE_SETTINGS.shortsRedirect) return false;
    const scope = (root && root.querySelectorAll) ? root : document;
    const links = scope.querySelectorAll('a[href*="/shorts/"]');
    let changed = 0;
    for (let i = 0; i < links.length; i++) {
        const target = shortsUrlToWatch(links[i].href);
        if (target) { links[i].href = target; changed++; }
    }
    return changed > 0;
});

redirectShorts();
let _lastHref = location.href;
function onYTNavigate() { if (_lastHref !== location.href) { _lastHref = location.href; redirectShorts(); } rewriteShortsLinks(document); }
document.addEventListener('yt-page-data-fetched', onYTNavigate);
document.addEventListener('yt-navigate-finish', onYTNavigate);
window.addEventListener('popstate', onYTNavigate);


// ============================================================
// MODULE 4: Ad Skip + Mute v3
// ============================================================
let _cachedPlayerEl = null, _lastAdState = false, _playerMutedBeforeAd = null, _preAdPlaybackRate = 1;

function _getPlayerEl() { return document.querySelector('.html5-video-player'); }
function _getMuteBtn() { const p = _getPlayerEl(); return p ? p.querySelector('.ytp-mute-button button') || p.querySelector('.ytp-mute-button') : null; }
function _isMutedViaButton() {
    // Strategy 1: YouTube Player API (language-independent, most reliable)
    const player = document.querySelector('#movie_player');
    if (player && typeof player.isMuted === 'function') {
        return player.isMuted();
    }
    // Strategy 2: Video element muted property
    const vid = document.querySelector('video.html5-main-video');
    if (vid) return vid.muted;
    // Strategy 3: Fallback to aria-label with expanded language support
    const btn = _getMuteBtn();
    if (!btn) return null;
    const label = btn.getAttribute('aria-label') || btn.getAttribute('title') || '';
    // Covers: English, German, French, Italian, Spanish, Portuguese, Dutch, Swedish,
    // Russian, Korean, Japanese, Chinese, Turkish, Polish, Arabic, Hindi
    return /unmute|einschalten|aufheben|activer le son|r\u00e9activer|attiva audio|activar sonido|ativar som|dempen opheffen|ljud p\u00e5|\u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a|\uC74C\uC18C\uAC70 \uD574\uC81C|\u30DF\u30E5\u30FC\u30C8\u89E3\u9664|\u53D6\u6D88\u9759\u97F3|sesi a\u00e7|sesi kapat/i.test(label);
}
function _clickMute() { if (_isMutedViaButton() === false) { const btn = _getMuteBtn(); if (btn) btn.click(); } }
function _clickUnmute() { if (_isMutedViaButton() === true) { const btn = _getMuteBtn(); if (btn) btn.click(); } }

function skipVideoAd() {
    if (location.pathname.startsWith('/shorts/')) return;
    var adShowing = document.querySelector('.ad-showing');
    var pieCountdown = !adShowing ? document.querySelector('.ytp-ad-timed-pie-countdown-container') : null;
    var surveyQuestions = (!adShowing && !pieCountdown) ? document.querySelector('.ytp-ad-survey-questions') : null;
    var isInAd = !!(adShowing || pieCountdown || surveyQuestions);
    var adVideo = document.querySelector('#movie_player video.html5-main-video, #ytd-player video.html5-main-video, #song-video video.html5-main-video');

    if (!isInAd) {
        if (_lastAdState && adVideo) {
            if (_playerMutedBeforeAd === false) _clickUnmute();
            if (adVideo.playbackRate !== _preAdPlaybackRate) adVideo.playbackRate = _preAdPlaybackRate;
            _playerMutedBeforeAd = null;
        }
        _lastAdState = false; return;
    }

    if (!_lastAdState && adVideo) {
        if (_playerMutedBeforeAd === null) { _playerMutedBeforeAd = _isMutedViaButton(); if (_playerMutedBeforeAd === null) _playerMutedBeforeAd = adVideo.muted; _preAdPlaybackRate = adVideo.playbackRate; }
    }

    if (!ENV.isYouTubeMobile) { _clickMute(); if (adVideo && !adVideo.muted) { adVideo.muted = true; adVideo.volume = 0; } }
    if (SUITE_SETTINGS.adSpeedUp && adVideo) adVideo.playbackRate = 16;

    let skipButton = document.querySelector(
        '.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern, ' +
        'button.ytp-ad-skip-button-modern, .ytp-ad-skip-button-slot button, ' +
        'button[class*="ytp-ad-skip"], .ytp-ad-skip-button-text'
    );
    // Fallback: locate the button by its visible label instead of its class,
    // so a class rename or a non-English UI does not disable skipping.
    if (!skipButton) {
        const playerEl = _getPlayerEl();
        if (playerEl && typeof findSkipButton === 'function') skipButton = findSkipButton(playerEl);
    }

    if (skipButton) {
        skipButton.click();
        if (adVideo && adVideo.duration && adVideo.currentTime > 0.5) adVideo.currentTime = adVideo.duration;
        if (!_lastAdState) { try { if (!_cachedPlayerEl) _cachedPlayerEl = document.querySelector('#ytd-player'); var player = (ENV.isYouTubeMobile || ENV.isYouTubeMusic) ? document.querySelector('#movie_player') : (_cachedPlayerEl && _cachedPlayerEl.getPlayer ? _cachedPlayerEl.getPlayer() : null); if (player && !ENV.isYouTubeMusic) { var vd = player.getVideoData(); var start = Math.floor(player.getCurrentTime()); if (_cachedPlayerEl && _cachedPlayerEl.loadVideoWithPlayerVars) _cachedPlayerEl.loadVideoWithPlayerVars({ videoId: vd.video_id, start: start }); else if (_cachedPlayerEl && _cachedPlayerEl.loadVideoByPlayerVars) _cachedPlayerEl.loadVideoByPlayerVars({ videoId: vd.video_id, start: start }); } } catch(e) {} }
    } else { if (adVideo && adVideo.duration) adVideo.currentTime = adVideo.duration; }
    _lastAdState = true;
}

function closeAdOverlays() {
    var containers = document.querySelectorAll('ytd-popup-container'); var removed = false;
    for (var i = containers.length; i--;) { if (containers[i].querySelector('a[href="/premium"]') || containers[i].querySelector('.ytd-enforcement-message-view-model')) { containers[i].remove(); removed = true; } }
    if (removed) { var bds = document.getElementsByTagName('tp-yt-iron-overlay-backdrop'); for (var j = bds.length; j--;) { bds[j].className = ''; bds[j].removeAttribute('opened'); bds[j].remove(); } var vid = document.querySelector('video.html5-main-video'); if (vid && vid.paused) try { vid.play(); } catch(e) {} }
}

function dismissStillWatching() {
    var confirmBtn = document.querySelector('yt-confirm-dialog-renderer #confirm-button button, .yt-confirm-dialog-renderer #confirm-button yt-button-shape button');
    if (confirmBtn) { confirmBtn.click(); var vid = document.querySelector('video.html5-main-video'); if (vid && vid.paused) try { vid.play(); } catch(e) {} }
}

function removeReelAds() { var parent = document.querySelector('ytd-reel-video-renderer'); if (parent && parent.querySelector('.ytd-ad-slot-renderer')) parent.remove(); }

let _adCheckInterval = null, _adIdleTicks = 0;
function adCheckTick() {
    try { skipVideoAd(); } catch(e) {} try { closeAdOverlays(); } catch(e) {} try { dismissStillWatching(); } catch(e) {}
    if (_lastAdState) _adIdleTicks = 0; else _adIdleTicks++;
    var nextInterval = _adIdleTicks < 20 ? 500 : (_adIdleTicks < 60 ? 1000 : 2000);
    clearTimeout(_adCheckInterval); _adCheckInterval = setTimeout(adCheckTick, nextInterval);
}

function initUnifiedYTObserver() {
    // Uses the shared MutationObserver to reduce overhead
    registerMutationCallback(function(mutations) {
        for (let i = 0; i < mutations.length; i++) {
            const added = mutations[i].addedNodes;
            for (let j = 0; j < added.length; j++) {
                const node = added[j];
                if (node.nodeType !== 1) continue;
                if (node.querySelector) {
                    const popup = node.querySelector('.ytd-enforcement-message-view-model');
                    if (popup && popup.parentNode) {
                        popup.parentNode.remove();
                        const bds = document.getElementsByTagName('tp-yt-iron-overlay-backdrop');
                        for (let k = bds.length; k--;) bds[k].remove();
                        const vid = document.querySelector('video.html5-main-video');
                        if (vid && vid.paused) try { vid.play(); } catch(e) {}
                    }
                }
                if (node.tagName === 'TP-YT-IRON-OVERLAY-BACKDROP') {
                    node.remove();
                    const vid2 = document.querySelector('video.html5-main-video');
                    if (vid2 && vid2.paused) try { vid2.play(); } catch(e) {}
                }
            }
        }
    });
}

// --- Scroll Fix ---
const SCROLL_CONTAINERS = ['ytd-page-manager', '#page-manager.ytd-app'];
const CONTENT_WRAPPERS = ['ytd-watch-flexy', 'ytd-watch-grid', 'ytd-watch-flexy #columns', 'ytd-watch-flexy #primary', 'ytd-watch-flexy #secondary', 'ytd-watch-flexy #below', 'ytd-watch-flexy #primary-inner', 'ytd-watch-flexy #secondary-inner', 'ytd-watch-grid #primary', 'ytd-watch-grid #secondary', 'ytd-watch-grid #below'];

function enforceScrollOnElement(el, isContainer) {
    if (!el || !el.style) return;
    if (isContainer) { var oy = el.style.getPropertyValue('overflow-y'), o = el.style.getPropertyValue('overflow'); if (oy === 'hidden' || oy === 'clip') el.style.setProperty('overflow-y', 'auto', 'important'); if (o === 'hidden' || o === 'clip') { el.style.setProperty('overflow-y', 'auto', 'important'); el.style.setProperty('overflow-x', 'hidden', 'important'); } }
    else { if (el.style.getPropertyValue('overflow') === 'hidden' || el.style.getPropertyValue('overflow') === 'clip') el.style.setProperty('overflow', 'visible', 'important'); if (el.style.getPropertyValue('overflow-y') === 'hidden' || el.style.getPropertyValue('overflow-y') === 'clip') el.style.setProperty('overflow-y', 'visible', 'important'); var mh = el.style.getPropertyValue('max-height'); if (mh && mh !== 'none' && mh !== '') el.style.setProperty('max-height', 'none', 'important'); }
}

function fixWatchPageScroll() {
    if (location.pathname !== '/watch') return;
    var i, el;
    for (i = 0; i < SCROLL_CONTAINERS.length; i++) { el = document.querySelector(SCROLL_CONTAINERS[i]); enforceScrollOnElement(el, true); }
    for (i = 0; i < CONTENT_WRAPPERS.length; i++) { el = document.querySelector(CONTENT_WRAPPERS[i]); enforceScrollOnElement(el, false); }
}

let _scrollObserver = null;
const _observedElements = new WeakSet();
function observeScrollElements() {
    if (!document.body) return;
    if (!_scrollObserver) { _scrollObserver = new MutationObserver(function(mutations) { for (var i = 0; i < mutations.length; i++) { if (mutations[i].attributeName !== 'style') continue; var el = mutations[i].target; var isC = (el.tagName && el.tagName.toLowerCase() === 'ytd-page-manager') || (el.id === 'page-manager' && el.classList.contains('ytd-app')); enforceScrollOnElement(el, isC); } }); }
    var allSel = SCROLL_CONTAINERS.concat(CONTENT_WRAPPERS);
    for (var i = 0; i < allSel.length; i++) { var el = document.querySelector(allSel[i]); if (el && !_observedElements.has(el)) { _scrollObserver.observe(el, { attributes: true, attributeFilter: ['style'] }); _observedElements.add(el); } }
}

// --- MODULE 8: Productivity Tools ---
let _speedApplied = false;
function applyDefaultSpeed() {
    // A speed remembered for this channel is a deliberate per-lecturer choice
    // and outranks the global default.
    if (typeof applyChannelSpeed === 'function' && applyChannelSpeed()) { _speedApplied = true; return; }
    if (_speedApplied) return; if (location.pathname !== '/watch') return;
    var vid = document.querySelector('video.html5-main-video'); if (!vid) return;
    var ts = SUITE_SETTINGS.defaultSpeed || 1.0;
    if (ts !== 1.0 && vid.readyState >= 1 && !document.querySelector('.ad-showing')) { vid.playbackRate = ts; _speedApplied = true; }
}

function applyAutoTheater() {
    if (!SUITE_SETTINGS.autoTheater || location.pathname !== '/watch') return;
    var wf = document.querySelector('ytd-watch-flexy');
    if (wf && !wf.hasAttribute('theater') && !wf.hasAttribute('fullscreen')) { var btn = document.querySelector('.ytp-size-button'); if (btn) btn.click(); }
}

// --- Auto Fullscreen ---
// YouTube's player handles the 'f' key to toggle fullscreen. Dispatching a
// synthetic KeyboardEvent to the player element triggers this handler, which
// bypasses the user-gesture requirement because it goes through YouTube's own
// code path (same as a real keyboard press).
// Fallback chain: 'f' key dispatch → button .click() → requestFullscreen API
let _fullscreenApplied = false;
let _fullscreenRetryTimer = null;
let _fullscreenRetryCount = 0;
const _FULLSCREEN_MAX_RETRIES = 8;

function applyAutoFullscreen() {
    if (!SUITE_SETTINGS.autoFullscreen || location.pathname !== '/watch') return;
    if (_fullscreenApplied) return;

    // Don't enter fullscreen during ads
    if (document.querySelector('.ad-showing')) return;

    // Already in fullscreen
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        _fullscreenApplied = true;
        return;
    }

    var player = document.querySelector('#movie_player');
    if (!player) {
        _scheduleFullscreenRetry();
        return;
    }

    // Check if video has loaded enough
    var vid = player.querySelector('video.html5-main-video');
    if (!vid || vid.readyState < 1) {
        _scheduleFullscreenRetry();
        return;
    }

    // Strategy 1: Dispatch 'f' key to the player (triggers YouTube's native handler)
    try {
        var fEvent = new KeyboardEvent('keydown', {
            key: 'f', code: 'KeyF', keyCode: 70, which: 70,
            bubbles: true, cancelable: true
        });
        player.dispatchEvent(fEvent);
    } catch(e) {}

    // Check if it worked after a tick
    setTimeout(function() {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            _fullscreenApplied = true;
            return;
        }

        // Strategy 2: Click the native fullscreen button
        var fsBtn = player.querySelector('.ytp-fullscreen-button');
        if (fsBtn) {
            try { fsBtn.click(); } catch(e) {}
        }

        // Strategy 3 (after another tick): Try the raw Fullscreen API
        setTimeout(function() {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                _fullscreenApplied = true;
                return;
            }
            try {
                if (player.requestFullscreen) player.requestFullscreen().catch(function(){});
                else if (player.webkitRequestFullscreen) player.webkitRequestFullscreen();
            } catch(e) {}

            // Final check
            setTimeout(function() {
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    _fullscreenApplied = true;
                } else if (_fullscreenRetryCount < _FULLSCREEN_MAX_RETRIES) {
                    // Maybe player wasn't fully ready — retry
                    _scheduleFullscreenRetry();
                }
            }, 200);
        }, 200);
    }, 200);
}

function _scheduleFullscreenRetry() {
    if (_fullscreenRetryTimer || _fullscreenRetryCount >= _FULLSCREEN_MAX_RETRIES) return;
    _fullscreenRetryCount++;
    _fullscreenRetryTimer = setTimeout(function() {
        _fullscreenRetryTimer = null;
        applyAutoFullscreen();
    }, 800);
}

// --- MODULE 9: Remaining Time Display ---
// Uses event-driven updates (~4/sec during playback) instead of rAF (~60/sec)
let _remainingTimeEl = null, _remainingTimeRAF = null, _remainingTimeInterval = null;

function initRemainingTime() {
    if (!SUITE_SETTINGS.remainingTime) return;
    const tc = document.querySelector('.ytp-time-display');
    if (!tc || _remainingTimeEl) return;
    _remainingTimeEl = document.createElement('span');
    _remainingTimeEl.className = 'pyt-remaining-time';
    tc.appendChild(_remainingTimeEl);

    // Listen to video events (fires ~4x/sec during playback, 0 when paused)
    const vid = document.querySelector('video.html5-main-video');
    if (vid) {
        vid.addEventListener('timeupdate', updateRemainingTime);
        vid.addEventListener('ratechange', updateRemainingTime);
    }
    // Fallback interval at 1Hz for edge cases (e.g. video element replaced)
    _remainingTimeInterval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();
}

function updateRemainingTime() {
    if (!_remainingTimeEl) return;
    const vid = document.querySelector('video.html5-main-video');
    if (!vid || !vid.duration || isNaN(vid.duration)) { _remainingTimeEl.textContent = ''; return; }
    const td = document.querySelector('.ytp-time-display');
    if (td && td.classList.contains('ytp-live')) { _remainingTimeEl.textContent = ''; return; }
    if (document.querySelector('.ad-showing')) { _remainingTimeEl.textContent = ''; return; }
    const remaining = (vid.duration - vid.currentTime) / (vid.playbackRate || 1);
    const h = Math.floor(remaining / 3600), m = Math.floor((remaining % 3600) / 60), s = Math.floor(remaining % 60);
    _remainingTimeEl.textContent = '(-' + (h > 0 ? h + ':' : '') + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ')';
}

function destroyRemainingTime() {
    // Clean up event listeners
    const vid = document.querySelector('video.html5-main-video');
    if (vid) {
        vid.removeEventListener('timeupdate', updateRemainingTime);
        vid.removeEventListener('ratechange', updateRemainingTime);
    }
    if (_remainingTimeEl && _remainingTimeEl.parentNode) _remainingTimeEl.parentNode.removeChild(_remainingTimeEl);
    _remainingTimeEl = null;
    if (_remainingTimeRAF) { cancelAnimationFrame(_remainingTimeRAF); _remainingTimeRAF = null; }
    if (_remainingTimeInterval) { clearInterval(_remainingTimeInterval); _remainingTimeInterval = null; }
}

// --- MODULE 10: Focus Mode ---
function applyFocusMode() {
    if (SUITE_SETTINGS.focusMode) document.documentElement.classList.add('pyt-focus-mode');
    else document.documentElement.classList.remove('pyt-focus-mode');
}

// --- YouTube-specific keyboard shortcuts ---
const SPEED_MAP = { '1': 1, '2': 1.5, '3': 2, '4': 3 };
function handleYTKeys(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    // Alt+F = Toggle Focus Mode
    if (e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        SUITE_SETTINGS.focusMode = !SUITE_SETTINGS.focusMode;
        _saveSettings(SUITE_SETTINGS);
        applyFocusMode();
        return;
    }

    // Alt+1-4 = Speed presets (watch pages only)
    if (e.altKey && SPEED_MAP[e.key] && location.pathname === '/watch') {
        e.preventDefault();
        var vid = document.querySelector('video.html5-main-video');
        if (vid) { vid.playbackRate = SPEED_MAP[e.key]; SUITE_SETTINGS.defaultSpeed = SPEED_MAP[e.key]; _saveSettings(SUITE_SETTINGS); }
    }
}


// ============================================================
// AD DEFENCE — LAYERS 1-5 (DOM side)
// ============================================================
// Layer 1 is the CSS injected above. Layers 2/3/5 follow. Layer 4 is the
// existing adaptive polling tick (adCheckTick). Each is independent: none
// calls another, and a throw in one cannot stop the rest.

const AD_ELEMENT_SELECTOR = [
    'ytd-ad-slot-renderer', 'ytd-display-ad-renderer', 'ytd-promoted-video-renderer',
    'ytd-promoted-sparkles-web-renderer', 'ytd-compact-promoted-video-renderer',
    'ytd-in-feed-ad-layout-renderer', 'ytd-banner-promo-renderer',
    'ytd-action-companion-ad-renderer', 'ytd-carousel-ad-renderer',
    'ytd-player-legacy-desktop-watch-ads-renderer', 'ytd-statement-banner-renderer',
    'ytm-companion-ad-renderer', 'ad-slot-renderer'
].join(',');

// A feed card whose *body* is an ad still occupies a grid cell, so the wrapper
// has to go, not just the inner renderer.
const FEED_WRAPPER_SELECTOR = [
    'ytd-rich-item-renderer', 'ytd-rich-section-renderer', 'ytd-video-renderer',
    'ytd-grid-video-renderer', 'ytd-compact-video-renderer', 'ytd-reel-item-renderer'
].join(',');

const sweepAds = registerLayer('ads', 'dom-sweep', function(root) {
    root = root || document;
    let removed = 0;
    if (root.nodeType === 1 && root.matches && root.matches(AD_ELEMENT_SELECTOR)) {
        const wrap = root.closest(FEED_WRAPPER_SELECTOR);
        (wrap || root).remove();
        return true;
    }
    if (!root.querySelectorAll) return false;
    const ads = root.querySelectorAll(AD_ELEMENT_SELECTOR);
    for (let i = 0; i < ads.length; i++) {
        const wrap = ads[i].closest(FEED_WRAPPER_SELECTOR);
        (wrap || ads[i]).remove();
        removed++;
    }
    return removed > 0;
});

// Anti-adblock nags. Matched by visible text rather than by class, because the
// class names are rotated far more often than the wording is.
const NAG_SELECTOR = 'tp-yt-paper-dialog,tp-yt-paper-toast,ytd-enforcement-message-view-model,ytd-modal-with-title-and-button-renderer,ytd-popup-container';
const NAG_PHRASES = ['ad blocker', 'adblock', 'ad-blocker', 'allow youtube ads', 'video player will be blocked', 'werbeblocker', 'bloqueur de pub', 'bloqueador de anuncios'];

const clearNags = registerLayer('ads', 'nag-removal', function(root) {
    root = root || document;
    const found = [];
    if (root.nodeType === 1 && root.matches && root.matches(NAG_SELECTOR)) found.push(root);
    if (root.querySelectorAll) {
        const list = root.querySelectorAll(NAG_SELECTOR);
        for (let i = 0; i < list.length; i++) found.push(list[i]);
    }
    let removed = false;
    for (let i = 0; i < found.length; i++) {
        const el = found[i];
        const text = (el.innerText || el.textContent || '').toLowerCase();
        if (!text) continue;
        let hit = el.querySelector && !!el.querySelector('a[href="/premium"], .ytd-enforcement-message-view-model');
        for (let j = 0; !hit && j < NAG_PHRASES.length; j++) if (text.indexOf(NAG_PHRASES[j]) !== -1) hit = true;
        if (!hit) continue;
        el.remove();
        removed = true;
    }
    if (removed) {
        // The modal backdrop and the scroll lock outlive the dialog itself.
        const backdrops = document.getElementsByTagName('tp-yt-iron-overlay-backdrop');
        for (let k = backdrops.length; k--;) backdrops[k].remove();
        document.documentElement.style.overflow = '';
        if (document.body) document.body.style.overflow = '';
        const vid = document.querySelector('video.html5-main-video');
        if (vid && vid.paused) { try { vid.play(); } catch (e) {} }
    }
    return removed;
});

// Layer 3: react the instant YouTube toggles `ad-showing` on the player, rather
// than up to 500ms later when the polling tick next runs.
let _playerClassObserver = null;
const attachPlayerObserver = registerLayer('ads', 'player-observer', function() {
    const player = document.querySelector('#movie_player, .html5-video-player');
    if (!player || player.__pytObserved) return false;
    player.__pytObserved = true;
    if (_playerClassObserver) _playerClassObserver.disconnect();
    _playerClassObserver = new MutationObserver(function() {
        try { skipVideoAd(); } catch (e) {}
    });
    _playerClassObserver.observe(player, { attributes: true, attributeFilter: ['class'] });
    try { skipVideoAd(); } catch (e) {}
    return true;
});

// A visible skip button, found by class first and by label text second so the
// script survives a class rename and works in non-English UIs.
const SKIP_TEXTS = ['skip ad', 'skip ads', 'skip', 'überspringen', 'passer', 'saltar', 'pular', 'пропустить', '跳过', 'تخطي'];
function findSkipButton(player) {
    const direct = player.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button, .ytp-ad-skip-button-container button, .ytp-ad-skip-button-slot button, button[class*="ytp-ad-skip"]');
    if (direct && _isVisible(direct)) return direct;
    const buttons = player.querySelectorAll('button, [role="button"]');
    for (let i = 0; i < buttons.length; i++) {
        const b = buttons[i];
        if (!_isVisible(b)) continue;
        const label = [b.textContent, b.getAttribute('aria-label'), b.getAttribute('title')].filter(Boolean).join(' ').trim().toLowerCase();
        if (!label) continue;
        for (let j = 0; j < SKIP_TEXTS.length; j++) if (label.indexOf(SKIP_TEXTS[j]) !== -1) return b;
    }
    return null;
}
function _isVisible(el) {
    if (!el || el.nodeType !== 1) return false;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return false;
    const st = getComputedStyle(el);
    return st.display !== 'none' && st.visibility !== 'hidden' && st.opacity !== '0';
}


// ============================================================
// LEARNING SYSTEM — shared helpers
// ============================================================
function ytVideoEl() {
    return document.querySelector('#movie_player video.html5-main-video') || document.querySelector('video.html5-main-video');
}
function ytVideoId() {
    try { return new URLSearchParams(location.search).get('v'); } catch (e) { return null; }
}
function ytTitle() {
    const el = document.querySelector('#above-the-fold #title h1, h1.ytd-watch-metadata, #container h1.title');
    return el ? el.textContent.trim() : (document.title || '').replace(/ - YouTube$/, '');
}
function ytChannel() {
    const el = document.querySelector('#owner #channel-name a, ytd-video-owner-renderer #channel-name a, ytd-channel-name a');
    return el ? el.textContent.trim() : '';
}
function isWatchPage() { return location.pathname === '/watch'; }


// ============================================================
// MODULE 13: STUDY NOTES (timestamped, per video, exportable)
// ============================================================
// Alt+N captures a note pinned to the current playback position. The whole
// point is that a note taken while watching a lecture is worth ten taken after,
// so capture has to cost one keystroke and never lose the timestamp.
function addTimestampedNote() {
    if (!SUITE_SETTINGS.notesEnabled || !isWatchPage()) return;
    const vid = ytVideoId(), video = ytVideoEl();
    if (!vid || !video) return;

    const t = Math.floor(video.currentTime);
    const wasPlaying = !video.paused;
    if (wasPlaying) video.pause();

    const text = window.prompt('Note at ' + fmtTime(t) + ':', '');
    if (wasPlaying) { try { video.play(); } catch (e) {} }
    if (text === null) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    const notes = storeGet('notes', {});
    if (!notes[vid]) notes[vid] = { title: ytTitle(), channel: ytChannel(), notes: [] };
    notes[vid].title = ytTitle() || notes[vid].title;
    notes[vid].channel = ytChannel() || notes[vid].channel;
    notes[vid].at = Date.now();
    notes[vid].notes.push({ t: t, text: trimmed });
    notes[vid].notes.sort(function(a, b) { return a.t - b.t; });

    prune(notes, 300, 365);
    if (storeSet('notes', notes)) showToast('Note saved at ' + fmtTime(t) + ' (' + notes[vid].notes.length + ' on this video)');
    else showToast('Could not save note — storage full');
}

function copyCurrentVideoNotes() {
    const vid = ytVideoId();
    const md = notesToMarkdown(vid);
    if (!md) { showToast('No notes on this video yet — Alt+N to add one'); return; }
    copyToClipboard(md).then(function() { showToast('Notes copied as Markdown'); });
}


// ============================================================
// MODULE 14: RESUME PLAYBACK + PER-CHANNEL SPEED MEMORY
// ============================================================
// Two separate stores: position is per video, speed is per channel (you watch
// one lecturer at 1.5x and another at 1x; the video id is the wrong key).
let _resumeSaveTimer = null, _resumeAppliedFor = null;

function saveResumePosition() {
    if (!SUITE_SETTINGS.resumePlayback || !isWatchPage()) return;
    const video = ytVideoEl(), vid = ytVideoId();
    if (!video || !vid || !isFinite(video.duration) || video.duration < 120) return;
    const map = storeGet('resume', {});
    map[vid] = { t: Math.floor(video.currentTime), d: Math.floor(video.duration), at: Date.now() };
    prune(map, 400, 60);
    storeSet('resume', map);
}

function applyResumePosition() {
    if (!SUITE_SETTINGS.resumePlayback || !isWatchPage()) return;
    const video = ytVideoEl(), vid = ytVideoId();
    if (!video || !vid || _resumeAppliedFor === vid) return;
    if (!isFinite(video.duration) || video.duration < 120) return;

    const saved = storeGet('resume', {})[vid];
    _resumeAppliedFor = vid;
    if (!saved) return;
    // Don't fight YouTube's own resume, and don't rewind someone who is
    // deliberately starting over: only jump if we are near the very beginning.
    if (video.currentTime > 15) return;
    // Skip trivial positions and finished videos.
    if (saved.t < 45 || saved.t > saved.d - 30) return;

    video.currentTime = saved.t;
    showToast('Resumed at ' + fmtTime(saved.t) + ' · Alt+0 to restart');
}

function channelKey() {
    const el = document.querySelector('#owner #channel-name a, ytd-video-owner-renderer #channel-name a');
    if (el && el.getAttribute('href')) return el.getAttribute('href');
    const name = ytChannel();
    return name ? 'name:' + name : null;
}

function saveChannelSpeed(rate) {
    if (!SUITE_SETTINGS.speedMemory || !isWatchPage()) return;
    const key = channelKey();
    if (!key || !rate || rate <= 0) return;
    const map = storeGet('speeds', {});
    map[key] = { rate: rate, at: Date.now() };
    prune(map, 200, 365);
    storeSet('speeds', map);
}

function applyChannelSpeed() {
    if (!SUITE_SETTINGS.speedMemory || !isWatchPage()) return false;
    const video = ytVideoEl(), key = channelKey();
    if (!video || !key) return false;
    const saved = storeGet('speeds', {})[key];
    if (!saved || !saved.rate) return false;
    if (video.playbackRate !== saved.rate) {
        video.playbackRate = saved.rate;
        showToast('Speed ' + saved.rate + 'x remembered for this channel');
    }
    return true;
}


// ============================================================
// MODULE 15: SPONSORBLOCK LITE (privacy-preserving)
// ============================================================
// Uses the hash-prefix endpoint: only the first 4 hex characters of
// SHA-256(videoId) leave the browser, so the API server cannot learn which
// video is being watched. Off by default — it is the one feature here that
// talks to a third party at all.
const SB_API = 'https://sponsor.ajay.app/api/skipSegments/';
let _sbSegments = [], _sbVideoId = null, _sbSkipped = new Set();

function sbCategories() {
    return (SUITE_SETTINGS.sponsorCategories || '').split(',').map(function(c) { return c.trim(); }).filter(Boolean);
}

function sbLoadSegments(videoId) {
    const cats = sbCategories();
    if (!cats.length || !videoId) return Promise.resolve([]);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(videoId)).then(function(buf) {
        const hex = Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
        const url = SB_API + hex.slice(0, 4) + '?categories=' + encodeURIComponent(JSON.stringify(cats));
        return fetch(url, { credentials: 'omit', referrerPolicy: 'no-referrer' });
    }).then(function(res) {
        if (!res.ok) return [];
        return res.json();
    }).then(function(list) {
        if (!Array.isArray(list)) return [];
        const mine = list.find(function(e) { return e.videoID === videoId; });
        return (mine && mine.segments) || [];
    }).catch(function(e) {
        console.warn('[PrivacySuite] SponsorBlock lookup failed:', e);
        return [];
    });
}

function sbSyncForCurrentVideo() {
    if (!SUITE_SETTINGS.sponsorBlock || !isWatchPage()) { _sbSegments = []; return; }
    const vid = ytVideoId();
    if (!vid || vid === _sbVideoId) return;
    _sbVideoId = vid;
    _sbSegments = [];
    _sbSkipped = new Set();
    sbLoadSegments(vid).then(function(segs) {
        if (ytVideoId() !== vid) return;   // navigated away mid-flight
        _sbSegments = segs;
        if (segs.length) showToast(segs.length + ' sponsor segment' + (segs.length > 1 ? 's' : '') + ' loaded');
    });
}

const sbTick = registerLayer('sponsor', 'skip', function() {
    if (!SUITE_SETTINGS.sponsorBlock || !_sbSegments.length) return false;
    const video = ytVideoEl();
    if (!video || video.paused) return false;
    const now = video.currentTime;
    for (let i = 0; i < _sbSegments.length; i++) {
        const seg = _sbSegments[i];
        if (!seg.segment) continue;
        const start = seg.segment[0], end = seg.segment[1];
        // Once skipped, a segment is never skipped again — otherwise rewinding
        // into it by hand would be undone immediately.
        if (_sbSkipped.has(i)) continue;
        if (now >= start && now < end - 0.5) {
            video.currentTime = end;
            _sbSkipped.add(i);
            showToast('Skipped ' + (seg.category || 'segment') + ' (' + fmtTime(end - start) + ')');
            return true;
        }
    }
    return false;
});


// ============================================================
// MODULE 16: FEED HYGIENE (anti-brainrot)
// ============================================================
const hygieneStyle = document.createElement('style');
hygieneStyle.id = '__pyt_feed_hygiene';
function applyFeedHygiene() {
    let css = '';
    if (SUITE_SETTINGS.hidePlayables) {
        css += 'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-playables]),ytd-rich-shelf-renderer[is-playables],'
             + 'ytd-mini-guide-entry-renderer[aria-label="Playables"],ytd-guide-entry-renderer:has(a[title="Playables"]),'
             + 'ytd-guide-entry-renderer:has(a[href*="/playables"]){display:none!important}';
    }
    if (SUITE_SETTINGS.hideAiFeatures) {
        // The "Ask" button and AI summaries: an answer generated from the video
        // is the opposite of watching it, which is the whole point here.
        css += '#ask-button,ytd-watch-metadata #ask,button[aria-label*="Ask" i],'
             + 'ytd-engagement-panel-section-list-renderer[target-id*="ask"],'
             + 'ytd-expandable-metadata-renderer:has(#ask),'
             + 'ytd-video-description-infocards-section-renderer{display:none!important}';
    }
    if (SUITE_SETTINGS.disableAmbient) {
        css += '#cinematics,#cinematics-container,.ytp-cinematics-container,#cinematics.ytd-watch-flexy{display:none!important}';
    }
    if (SUITE_SETTINGS.disableAutoplayNext) {
        css += '.ytp-endscreen-content,.ytp-ce-element,.ytp-autonav-endscreen-upnext-container{display:none!important}';
    }
    hygieneStyle.textContent = css;
    if (!hygieneStyle.isConnected) _appendToHead(hygieneStyle);
}

function parseList(raw) {
    return (raw || '').split('\n').map(function(l) { return l.trim().toLowerCase(); }).filter(Boolean);
}

const FEED_ITEM_SELECTOR = 'ytd-rich-item-renderer,ytd-video-renderer,ytd-grid-video-renderer,ytd-compact-video-renderer,ytd-playlist-video-renderer';

const filterFeed = registerLayer('focus', 'feed-filter', function(root) {
    const keywords = parseList(SUITE_SETTINGS.ytKeywordBlocklist);
    const channels = parseList(SUITE_SETTINGS.ytChannelBlocklist);
    const hideWatched = !!SUITE_SETTINGS.hideWatched;
    if (!keywords.length && !channels.length && !hideWatched) return false;

    const scope = (root && root.querySelectorAll) ? root : document;
    const items = scope.querySelectorAll(FEED_ITEM_SELECTOR);
    let hidden = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const titleEl = item.querySelector('#video-title, a#video-title-link, yt-formatted-string#video-title');
        const chanEl = item.querySelector('ytd-channel-name a, #channel-name a, #text.ytd-channel-name');
        const title = (titleEl ? (titleEl.textContent || titleEl.getAttribute('title') || '') : '').toLowerCase();
        const chan = (chanEl ? chanEl.textContent : '').toLowerCase();

        const sig = title.slice(0, 80) + '|' + chan.slice(0, 40);
        if (!sig.replace('|', '')) continue;          // not rendered yet
        if (item.dataset.pytSig === sig) continue;    // same card, already judged
        item.dataset.pytSig = sig;
        item.style.display = '';                      // recycled card: start clean

        let hide = false;
        for (let k = 0; !hide && k < keywords.length; k++) if (title.indexOf(keywords[k]) !== -1) hide = true;
        for (let c = 0; !hide && c < channels.length; c++) if (chan.indexOf(channels[c]) !== -1) hide = true;

        if (!hide && hideWatched) {
            // YouTube renders watch progress as an inline width percentage on
            // the resume-playback overlay; >90% counts as watched.
            const bar = item.querySelector('ytd-thumbnail-overlay-resume-playback-renderer #progress');
            if (bar) {
                const pct = parseFloat((bar.style.width || '').replace('%', ''));
                if (isFinite(pct) && pct >= 90) hide = true;
            }
        }
        if (hide) { item.style.display = 'none'; hidden++; }
    }
    return hidden > 0;
});

// Clearing the cached signatures forces every visible card to be judged again,
// which is what makes removing a keyword take effect immediately.
function resetFeedFilter() {
    const items = document.querySelectorAll('[data-pyt-sig]');
    for (let i = 0; i < items.length; i++) {
        delete items[i].dataset.pytSig;
        items[i].style.display = '';
    }
}

function applyHomeRedirect() {
    if (!SUITE_SETTINGS.homeToSubs) return;
    if (!ENV.isYouTubeDesktop && !ENV.isYouTubeMobile) return;
    if (location.pathname !== '/' || location.search) return;
    location.replace('/feed/subscriptions');
}

function disableAutoplayToggle() {
    if (!SUITE_SETTINGS.disableAutoplayNext || !isWatchPage()) return;
    const btn = document.querySelector('.ytp-autonav-toggle-button[aria-checked="true"]');
    if (btn) { const p = btn.closest('button') || btn; p.click(); }
}


// ============================================================
// MODULE 17: STUDY SESSION TIMER
// ============================================================
// Counts only time a video is actually playing in a visible tab, so leaving a
// paused tab open all afternoon does not burn the budget.
let _hudEl = null, _sessionSeconds = 0, _sessionWarned = false, _sessionTimer = null;

function todayKey() { return new Date().toISOString().slice(0, 10); }

function bumpDailyTotal(seconds) {
    const daily = storeGet('daily', {});
    const key = todayKey();
    daily[key] = (daily[key] || 0) + seconds;
    // Keep a fortnight of history; anything older is noise.
    const keys = Object.keys(daily).sort();
    while (keys.length > 14) delete daily[keys.shift()];
    storeSet('daily', daily);
    return daily[key];
}

function ensureHud() {
    if (_hudEl && _hudEl.isConnected) return _hudEl;
    if (!document.body) return null;
    _hudEl = document.createElement('div');
    _hudEl.id = 'pyt-hud';
    document.body.appendChild(_hudEl);
    return _hudEl;
}

function sessionTick() {
    const limit = parseInt(SUITE_SETTINGS.studySessionMinutes, 10) || 0;
    if (limit <= 0) { if (_hudEl) { _hudEl.remove(); _hudEl = null; } return; }

    const video = ytVideoEl();
    const watching = video && !video.paused && !video.ended && !document.hidden;
    let todayTotal = (storeGet('daily', {})[todayKey()] || 0);
    if (watching) {
        _sessionSeconds++;
        todayTotal = bumpDailyTotal(1);
    }

    const hud = ensureHud();
    if (!hud) return;
    hud.textContent = '⏱ ' + fmtTime(_sessionSeconds) + ' / ' + limit + 'm · today ' + fmtTime(todayTotal);

    if (_sessionSeconds >= limit * 60) {
        hud.classList.add('over');
        if (!_sessionWarned) {
            _sessionWarned = true;
            if (video && !video.paused) video.pause();
            showToast('Session limit reached (' + limit + ' min). Paused — Alt+R resets the timer.', 6000);
        }
    } else {
        hud.classList.remove('over');
    }
}

function resetSession() {
    _sessionSeconds = 0;
    _sessionWarned = false;
    if (_hudEl) _hudEl.classList.remove('over');
    showToast('Study session timer reset');
}


// ============================================================
// MODULE 18: A-B LOOP + LEARNING SHORTCUTS
// ============================================================
let _loopA = null, _loopB = null;

const abLoopTick = registerLayer('focus', 'ab-loop', function() {
    if (_loopA === null || _loopB === null) return false;
    const video = ytVideoEl();
    if (!video || video.paused) return false;
    if (video.currentTime >= _loopB || video.currentTime < _loopA - 1) {
        video.currentTime = _loopA;
        return true;
    }
    return false;
});

function setLoopPoint(which) {
    const video = ytVideoEl();
    if (!video) return;
    const t = video.currentTime;
    if (which === 'a') {
        _loopA = t;
        if (_loopB !== null && _loopB <= _loopA) _loopB = null;
        showToast('Loop start ' + fmtTime(t) + (_loopB === null ? ' · Alt+] to set the end' : ''));
    } else {
        if (_loopA === null) { showToast('Set the loop start first (Alt+[)'); return; }
        if (t <= _loopA) { showToast('Loop end must come after the start'); return; }
        _loopB = t;
        showToast('Looping ' + fmtTime(_loopA) + ' → ' + fmtTime(_loopB) + ' · Alt+\\ clears');
    }
}

function clearLoop() {
    _loopA = _loopB = null;
    showToast('A-B loop cleared');
}

function toggleTranscript() {
    // The transcript button lives in different places depending on the layout
    // experiment the account is in, so try each known home in turn.
    const candidates = [
        'button[aria-label*="transcript" i]',
        'ytd-video-description-transcript-section-renderer button',
        '#primary-button ytd-button-renderer button[aria-label*="ranscript"]'
    ];
    for (const sel of candidates) {
        const btn = document.querySelector(sel);
        if (btn && _isVisible(btn)) { btn.click(); return; }
    }
    showToast('Transcript button not found on this video');
}

function restartVideo() {
    const video = ytVideoEl();
    if (!video) return;
    video.currentTime = 0;
    showToast('Restarted from the beginning');
}

function handleLearningKeys(e) {
    if (!ENV.isYouTube) return;
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (!e.altKey || e.ctrlKey || e.metaKey) return;

    switch (e.code) {
        case 'KeyN':
            e.preventDefault();
            if (e.shiftKey) copyCurrentVideoNotes(); else addTimestampedNote();
            return;
        case 'BracketLeft':  e.preventDefault(); setLoopPoint('a'); return;
        case 'BracketRight': e.preventDefault(); setLoopPoint('b'); return;
        case 'Backslash':    e.preventDefault(); clearLoop(); return;
        case 'KeyT':         e.preventDefault(); toggleTranscript(); return;
        case 'Digit0':       e.preventDefault(); restartVideo(); return;
        case 'KeyR':         e.preventDefault(); resetSession(); return;
    }
}


// ============================================================
// LEARNING SYSTEM STARTUP
// ============================================================
function startLearningSystems() {
    YT_HOOKS.applyFocusMode      = applyFocusMode;
    YT_HOOKS.applyFeedHygiene    = applyFeedHygiene;
    YT_HOOKS.filterFeed          = filterFeed;
    YT_HOOKS.resetFeedFilter     = resetFeedFilter;
    YT_HOOKS.syncSponsorBlock    = sbSyncForCurrentVideo;
    YT_HOOKS.initRemainingTime   = initRemainingTime;
    YT_HOOKS.destroyRemainingTime = destroyRemainingTime;

    applyFeedHygiene();
    applyHomeRedirect();
    rewriteShortsLinks(document);
    filterFeed(document);

    document.addEventListener('keydown', handleLearningKeys, true);

    // One 1s heartbeat drives the session timer, the sponsor skipper and the
    // A-B loop. Each is registered as its own layer, so one throwing does not
    // stop the others from running on the next tick.
    _sessionTimer = setInterval(function() {
        sessionTick();
        sbTick();
        abLoopTick();
    }, 1000);

    // Position is saved on a slow timer rather than on every timeupdate — 4/sec
    // writes to localStorage would be pure waste.
    _resumeSaveTimer = setInterval(saveResumePosition, 5000);
    window.addEventListener('beforeunload', saveResumePosition);

    document.addEventListener('ratechange', function(e) {
        if (e.target && e.target.matches && e.target.matches('video.html5-main-video')) saveChannelSpeed(e.target.playbackRate);
    }, true);

    registerMutationCallback(function(mutations) {
        for (let i = 0; i < mutations.length; i++) {
            const added = mutations[i].addedNodes;
            for (let j = 0; j < added.length; j++) {
                const node = added[j];
                if (node.nodeType !== 1) continue;
                sweepAds(node);
                clearNags(node);
                rewriteShortsLinks(node);
            }
        }
        _idle(function() { filterFeed(document); });
        attachPlayerObserver();
    });
}

function onLearningNavigate() {
    _resumeAppliedFor = null;
    _sbSkipped = new Set();
    resetFeedFilter();
    clearLoopSilently();
    applyHomeRedirect();
    sbSyncForCurrentVideo();
    attachPlayerObserver();
    // The player needs a moment to report a real duration before we can decide
    // whether a stored position is still meaningful.
    setTimeout(function() {
        applyResumePosition();
        applyChannelSpeed();
        disableAutoplayToggle();
        filterFeed(document);
    }, 1200);
}

function clearLoopSilently() { _loopA = _loopB = null; }


// ============================================================
// STARTUP
// ============================================================
function startAllYTSystems() {
    adCheckTick();                 // ad layer 4 (polling fallback)
    initUnifiedYTObserver();
    attachPlayerObserver();        // ad layer 3 (instant)
    sweepAds(document);            // ad layer 2 (initial pass)
    clearNags(document);           // ad layer 5
    startLearningSystems();
    setInterval(function() { _idle(removeReelAds); }, 3000);

    fixWatchPageScroll(); observeScrollElements(); applyFocusMode();

    function onNavigate() {
        onLearningNavigate();
        fixWatchPageScroll(); _speedApplied = false; _fullscreenApplied = false; _fullscreenRetryCount = 0;
        if (_fullscreenRetryTimer) { clearTimeout(_fullscreenRetryTimer); _fullscreenRetryTimer = null; }
        destroyRemainingTime();
        requestAnimationFrame(function() {
            fixWatchPageScroll(); observeScrollElements(); applyDefaultSpeed();
            applyAutoTheater(); applyAutoFullscreen(); applyFocusMode();
            setTimeout(initRemainingTime, 1500);
        });
    }
    document.addEventListener('yt-navigate-finish', onNavigate);
    document.addEventListener('yt-page-data-updated', onNavigate);

    setInterval(function() {
        if (location.pathname === '/watch') { fixWatchPageScroll(); observeScrollElements(); applyDefaultSpeed(); }
        // Cheap re-arm: the player element is replaced on some navigations and
        // the observer would otherwise be watching a detached node.
        attachPlayerObserver();
    }, 5000);

    document.addEventListener('keydown', handleYTKeys);

    setTimeout(function() {
        applyDefaultSpeed(); applyAutoTheater(); applyAutoFullscreen(); initRemainingTime();
        onLearningNavigate();
    }, 2000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startAllYTSystems, { once: true });
else startAllYTSystems();

}); // END YouTube Shared Init
} // end if ENV.isYouTube


// ============================================================
// MODULE 2: YOUTUBE OLD STYLE UI (Non-Rounded Design v6.1.2)
// ============================================================
if (ENV.isYouTubeDesktop) {
_safeRun('Module2:YouTubeOldStyle', function() {

const ATTRS = ["darker-dark-theme", "darker-dark-theme-deprecate", "refresh"];
const CONFIGS = { BUTTON_REWORK: true };
const EXPFLAGS = {
    enable_channel_page_header_profile_section: false, enable_header_channel_handler_ui: false,
    kevlar_unavailable_video_error_ui_client: false, kevlar_refresh_on_theme_change: false,
    kevlar_modern_sd_v2: false, kevlar_watch_cinematics: false, kevlar_watch_comments_panel_button: false,
    kevlar_watch_grid: false, kevlar_watch_grid_hide_chips: false,
    kevlar_watch_metadata_refresh_no_old_secondary_data: false, kevlar_watch_modern_panels: false,
    kevlar_watch_panel_height_matches_player: false, smartimation_background: false,
    web_amsterdam_playlists: false, web_animated_actions: false, web_animated_like: false,
    web_animated_like_lazy_load: false, web_button_rework: true, web_button_rework_with_live: true,
    web_darker_dark_theme: false, web_enable_youtab: false, web_guide_ui_refresh: false,
    web_modern_ads: false, web_modern_buttons: true, web_modern_chips: false,
    web_modern_collections_v2: false, web_modern_dialogs: false, web_modern_playlists: false,
    web_modern_subscribe: true, web_modern_tabs: false, web_modern_typography: false,
    web_rounded_containers: false, web_rounded_thumbnails: false, web_searchbar_style: "default",
    web_segmented_like_dislike_button: false, web_sheets_ui_refresh: false, web_snackbar_ui_refresh: false,
    web_watch_rounded_player_large: false,
    web_player_enable_featured_product_banner_exclusives_on_desktop: false,
    fill_view_models_on_web_vod: true, kevlar_watch_flexy_metadata_height: "136",
    kevlar_watch_max_player_width: "1280", live_chat_over_engagement_panels: false,
    live_chat_scaled_height: false, live_chat_smaller_min_height: false,
    main_app_controller_extraction_batch_18: false, main_app_controller_extraction_batch_19: false,
    no_iframe_for_web_stickiness: false, optimal_reading_width_comments_ep: false,
    remove_masthead_channel_banner_on_refresh: false, small_avatars_for_comments: false,
    small_avatars_for_comments_ep: false, web_watch_compact_comments: false,
    web_watch_compact_comments_header: false, web_watch_log_theater_mode: false,
    web_watch_theater_chat: false, web_watch_theater_fixed_chat: false,
    wn_grid_max_item_width: 0, wn_grid_min_item_width: 0
};
const PLYRFLAGS = { web_rounded_containers: "false", web_rounded_thumbnails: "false" };

class YTP {
    static observer = new MutationObserver(this.onNewScript);
    static _config = {};
    static isObject(item) { return (item && typeof item === "object" && !Array.isArray(item)); }
    static mergeDeep(target, ...sources) { if (!sources.length) return target; const source = sources.shift(); if (this.isObject(target) && this.isObject(source)) { for (const key in source) { if (this.isObject(source[key])) { if (!target[key]) Object.assign(target, { [key]: {} }); this.mergeDeep(target[key], source[key]); } else { Object.assign(target, { [key]: source[key] }); } } } return this.mergeDeep(target, ...sources); }
    static onNewScript(mutations) { for (var mut of mutations) { for (var node of mut.addedNodes) { YTP.bruteforce(); } } }
    static start() { this.observer.observe(document, {childList: true, subtree: true}); }
    static stop() { this.observer.disconnect(); }
    static bruteforce() { if (!window.yt || !window.yt.config_) return; this.mergeDeep(window.yt.config_, this._config); }
    static setCfgMulti(configs) { this.mergeDeep(this._config, configs); }
    static setExpMulti(exps) { if (!("EXPERIMENT_FLAGS" in this._config)) this._config.EXPERIMENT_FLAGS = {}; this.mergeDeep(this._config.EXPERIMENT_FLAGS, exps); }
    static decodePlyrFlags(flags) { var obj = {}, d = flags.split("&"); for (var i = 0; i < d.length; i++) { var f = d[i].split("="); obj[f[0]] = f[1]; } return obj; }
    static encodePlyrFlags(flags) { var k = Object.keys(flags), r = ""; for (var i = 0; i < k.length; i++) { if (i > 0) r += "&"; r += k[i] + "=" + flags[k[i]]; } return r; }
    static setPlyrFlags(flags) { if (!window.yt || !window.yt.config_ || !window.yt.config_.WEB_PLAYER_CONTEXT_CONFIGS) return; var cc = window.yt.config_.WEB_PLAYER_CONTEXT_CONFIGS; if (!("WEB_PLAYER_CONTEXT_CONFIGS" in this._config)) this._config.WEB_PLAYER_CONTEXT_CONFIGS = {}; for (var cfg in cc) { var df = this.decodePlyrFlags(cc[cfg].serializedExperimentFlags); this.mergeDeep(df, flags); this._config.WEB_PLAYER_CONTEXT_CONFIGS[cfg] = { serializedExperimentFlags: this.encodePlyrFlags(df) }; } }
}

window.addEventListener("yt-page-data-updated", function tmp() { YTP.stop(); for (var i = 0; i < ATTRS.length; i++) document.documentElement.removeAttribute(ATTRS[i]); window.removeEventListener("yt-page-data-updated", tmp); });
YTP.start(); YTP.setCfgMulti(CONFIGS); YTP.setExpMulti(EXPFLAGS); YTP.setPlyrFlags(PLYRFLAGS);

var oldStyleCSS = document.getElementById('__privacy_yt_suite_styles');
if (oldStyleCSS) {
    oldStyleCSS.textContent += 'html[dark]{--yt-spec-general-background-a:#181818!important;--yt-spec-general-background-b:#0f0f0f!important;--yt-spec-brand-background-primary:rgba(33,33,33,0.98)!important;--yt-spec-brand-background-solid:#272727!important;--yt-spec-10-percent-layer:rgba(255,255,255,0.1)!important}html:not([dark]){--yt-spec-general-background-a:#f9f9f9!important;--yt-spec-general-background-b:#f1f1f1!important;--yt-spec-brand-background-primary:rgba(255,255,255,0.98)!important;--yt-spec-brand-background-solid:#fff!important;--yt-spec-10-percent-layer:rgba(0,0,0,0.1)!important}ytd-masthead{background:var(--yt-spec-brand-background-solid)!important}ytd-app{background:var(--yt-spec-general-background-a)!important}#background.ytd-masthead,ytd-mini-guide-renderer,ytd-mini-guide-entry-renderer,#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer.style-scope{background-color:var(--yt-spec-brand-background-solid)!important}#cinematics.ytd-watch-flexy{display:none!important}.style-scope.ytd-rich-item-renderer,ytd-thumbnail-overlay-toggle-button-renderer.style-scope.ytd-thumbnail{border-radius:2px!important}ytd-thumbnail[size="large"] a.ytd-thumbnail,ytd-thumbnail[size="large"]::before,ytd-thumbnail[size="medium"] a.ytd-thumbnail,ytd-thumbnail[size="medium"]::before{border-radius:0!important}#container.ytd-searchbox,.ytSearchboxComponentInputBox{border-radius:2px 0 0 2px!important}#search-icon-legacy.ytd-searchbox,.ytSearchboxComponentSearchButton{border-radius:0 2px 2px 0!important}yt-chip-cloud-chip-renderer{height:32px!important;border-radius:16px!important}ytd-menu-popup-renderer,.ytSheetViewModelContextual{border-radius:2px!important}#tooltip.tp-yt-paper-tooltip,.ytp-settings-menu{border-radius:2px!important}.ytp-videowall-still-image,ytd-multi-page-menu-renderer,#ytd-player.ytd-watch-flexy{border-radius:0!important}ytd-live-chat-frame[rounded-container],iframe.style-scope.ytd-live-chat-frame{border-radius:0!important}ytd-engagement-panel-section-list-renderer{border-radius:0!important}ytd-playlist-panel-renderer[modern-panels]:not([within-miniplayer]) #container.ytd-playlist-panel-renderer{border-radius:0!important}.yt-spec-button-shape-next--size-m{border-radius:2px!important;text-transform:uppercase!important}.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled{border-radius:2px!important;text-transform:uppercase!important}#subscribe-button ytd-subscribe-button-renderer button{background:#ff0000!important;border-radius:2px!important;text-transform:uppercase!important}yt-interaction.ytd-guide-entry-renderer,ytd-guide-entry-renderer,ytd-mini-guide-entry-renderer{border-radius:0!important}ytd-guide-entry-renderer[guide-refresh]{width:100%!important}.ytp-progress-bar .ytp-scrubber-button{opacity:0!important}.ytp-progress-bar:hover .ytp-scrubber-button{opacity:1!important}.ytp-cairo-refresh-signature-moments .ytp-play-progress,.ytp-play-progress,.html5-play-progress,.YtProgressBarLineProgressBarPlayedRefresh{background:#ff0000!important}.ytp-fine-scrubbing-container{display:none!important}#background.ytd-masthead{opacity:1!important}';
}

function restoreTrending() { try { var d = {"navigationEndpoint":{"commandMetadata":{"webCommandMetadata":{"url":"/feed/explore","webPageType":"WEB_PAGE_TYPE_BROWSE","apiUrl":"/youtubei/v1/browse"}},"browseEndpoint":{"browseId":"FEtrending"}},"icon":{"iconType":"EXPLORE"},"formattedTitle":{"simpleText":"Explore"},"accessibility":{"accessibilityData":{"label":"Explore"}},"isPrimary":true}; var g = document.querySelector('#items > ytd-guide-entry-renderer:nth-child(2)'); if (g) g.data = d; var m = document.querySelector('#items > ytd-mini-guide-entry-renderer:nth-child(2)'); if (m) m.data = d; } catch(e) {} }
function waitForElm(sel) {
    return new Promise(function(resolve) {
        if (document.querySelector(sel)) return resolve();
        var obs = new MutationObserver(function() { if (document.querySelector(sel)) { resolve(); obs.disconnect(); } });
        // At document-start there may be no root to observe yet; poll for one
        // rather than throwing an uncaught TypeError into the page.
        (function attach() {
            var root = document.body || document.documentElement;
            if (!root) { setTimeout(attach, 20); return; }
            obs.observe(root, { childList: true, subtree: true });
        })();
    });
}
waitForElm("#items.ytd-guide-section-renderer").then(restoreTrending);
waitForElm("#items.ytd-mini-guide-section-renderer").then(restoreTrending);

var abtnconfig = { unsegmentLikeButton: false, noFlexibleItems: true };
function updateBtns() { try { var wf = document.querySelector("ytd-watch-flexy"); if (!wf || !wf.data) return; var results = wf.data.contents.twoColumnWatchNextResults.results.results.contents; for (var i = 0; i < results.length; i++) { if (results[i].videoPrimaryInfoRenderer) { var actions = results[i].videoPrimaryInfoRenderer.videoActions.menuRenderer; if (abtnconfig.noFlexibleItems && actions.flexibleItems) { for (var j = 0; j < actions.flexibleItems.length; j++) actions.topLevelButtons.push(actions.flexibleItems[j].menuFlexibleItemRenderer.topLevelButton); delete actions.flexibleItems; } } } var temp = wf.data; wf.data = {}; wf.data = temp; } catch(e) {} }
document.addEventListener("yt-page-data-updated", function(e) { if (e.detail && e.detail.pageType == "watch") _idle(updateBtns); });

}); // END Module 2
} // end if ENV.isYouTubeDesktop


// ============================================================
// MODULE 5: YOUTUBE AGE RESTRICTION BYPASS (v2.5.9)
// ============================================================
if (ENV.isYouTube) {
_safeRun('Module5:AgeBypass', function() {

(function iife(ranOnce) {
    if (this !== window && !ranOnce) {
        // Inject into page context via script element instead of eval().
        // documentElement can still be null this early, so retry rather than
        // throw — throwing here loses the whole age-bypass module.
        (function inject() {
            const root = document.documentElement || document.head;
            if (!root) { setTimeout(inject, 10); return; }
            const _s = document.createElement('script');
            _s.textContent = '(' + iife.toString() + ')(true);';
            root.appendChild(_s);
            _s.remove();
        })();
        return;
    }

    const UNLOCKABLE_PLAYABILITY_STATUSES = ['AGE_VERIFICATION_REQUIRED', 'AGE_CHECK_REQUIRED', 'CONTENT_CHECK_REQUIRED', 'LOGIN_REQUIRED'];
    const VALID_PLAYABILITY_STATUSES = ['OK', 'LIVE_STREAM_OFFLINE'];
    const ACCOUNT_PROXY_SERVER_HOST = 'https://youtube-proxy.zerody.one';
    const VIDEO_PROXY_SERVER_HOST = 'https://ny.4everproxy.com';
    let ENABLE_UNLOCK_CONFIRMATION_EMBED = true, ENABLE_UNLOCK_NOTIFICATION = true, SKIP_CONTENT_WARNINGS = true;
    const GOOGLE_AUTH_HEADER_NAMES = ['Authorization', 'X-Goog-AuthUser', 'X-Origin'];
    const BLURRED_THUMBNAIL_SQP_LENGTHS = [32, 48, 56, 68, 72, 84, 88];

    var Config = window[Symbol()] = { UNLOCKABLE_PLAYABILITY_STATUSES, VALID_PLAYABILITY_STATUSES, ACCOUNT_PROXY_SERVER_HOST, VIDEO_PROXY_SERVER_HOST, ENABLE_UNLOCK_CONFIRMATION_EMBED, ENABLE_UNLOCK_NOTIFICATION, SKIP_CONTENT_WARNINGS, GOOGLE_AUTH_HEADER_NAMES, BLURRED_THUMBNAIL_SQP_LENGTHS };

    function isGoogleVideoUrl(url) { return url.host.includes('.googlevideo.com'); }
    function isGoogleVideoUnlockRequired(u, id) { return new URLSearchParams(u.search).get('gcr') && new URLSearchParams(u.search).get('id') === id; }

    const nativeJSONParse = window.JSON.parse;
    const nativeXMLHttpRequestOpen = window.XMLHttpRequest.prototype.open;
    const isDesktop = window.location.host !== 'm.youtube.com';
    const isMusic = window.location.host === 'music.youtube.com';
    const isEmbed = window.location.pathname.indexOf('/embed/') === 0;
    const isConfirmed = window.location.search.includes('unlock_confirmed');

    class Deferred { constructor() { return Object.assign(new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; }), this); } }
    function createElement(tag, opts) { const n = document.createElement(tag); opts && Object.assign(n, opts); return n; }
    function isObject(o) { return o !== null && typeof o === 'object'; }
    function findNestedObjectsByAttributeNames(obj, names) { var r = []; if (names.every(k => typeof obj[k] !== 'undefined')) r.push(obj); Object.keys(obj).forEach(k => { if (obj[k] && typeof obj[k] === 'object') r.push(...findNestedObjectsByAttributeNames(obj[k], names)); }); return r; }
    function pageLoaded() { if (document.readyState === 'complete') return Promise.resolve(); const d = new Deferred(); window.addEventListener('load', d.resolve, { once: true }); return d; }
    function createDeepCopy(o) { return nativeJSONParse(JSON.stringify(o)); }
    function getYtcfgValue(n) { var _w; return (_w = window.ytcfg) === null || _w === void 0 ? void 0 : _w.get(n); }
    function getSignatureTimestamp() { return getYtcfgValue('STS') || (() => { var _d; const p = (_d = document.querySelector('script[src*="/base.js"]')) === null || _d === void 0 ? void 0 : _d.src; if (!p) return; const x = new XMLHttpRequest(); x.open('GET', p, false); x.send(null); return parseInt(x.responseText.match(/signatureTimestamp:([0-9]*)/)[1]); })(); }
    function isUserLoggedIn() { if (typeof getYtcfgValue('LOGGED_IN') === 'boolean') return getYtcfgValue('LOGGED_IN'); if (typeof getYtcfgValue('DELEGATED_SESSION_ID') === 'string') return true; if (parseInt(getYtcfgValue('SESSION_INDEX')) >= 0) return true; return false; }
    function getCurrentVideoStartTime(vid) { if (window.location.href.includes(vid)) { var _r; const s = (_r = new URLSearchParams(window.location.search).get('t') || new URLSearchParams(window.location.search).get('start') || new URLSearchParams(window.location.search).get('time_continue')) === null || _r === void 0 ? void 0 : _r.replace('s', ''); if (s && !isNaN(s)) return parseInt(s); } return 0; }
    function setUrlParams(params) { const u = new URLSearchParams(window.location.search); for (const p in params) u.set(p, params[p]); window.location.search = u; }
    function waitForElement(sel, timeout) { const d = new Deferred(); const iv = setInterval(() => { const e = document.querySelector(sel); if (e) { clearInterval(iv); d.resolve(e); } }, 100); if (timeout) setTimeout(() => { clearInterval(iv); d.reject(); }, timeout); return d; }
    function parseRelativeUrl(url) { if (typeof url !== 'string') return null; if (url.indexOf('/') === 0) url = window.location.origin + url; try { return url.indexOf('https://') === 0 ? new window.URL(url) : null; } catch { return null; } }
    function isWatchNextObject(pd) { var _c; if (!(pd !== null && pd !== void 0 && pd.contents) || !(pd !== null && pd !== void 0 && (_c = pd.currentVideoEndpoint) !== null && _c !== void 0 && (_c = _c.watchEndpoint) !== null && _c !== void 0 && _c.videoId)) return false; return !!pd.contents.twoColumnWatchNextResults || !!pd.contents.singleColumnWatchNextResults; }
    function isWatchNextSidebarEmpty(pd) { if (isDesktop) { var _c1; const r = (_c1 = pd.contents) === null || _c1 === void 0 || (_c1 = _c1.twoColumnWatchNextResults) === null || _c1 === void 0 || (_c1 = _c1.secondaryResults) === null || _c1 === void 0 || (_c1 = _c1.secondaryResults) === null || _c1 === void 0 ? void 0 : _c1.results; return !r; } var _c2; const content = (_c2 = pd.contents) === null || _c2 === void 0 || (_c2 = _c2.singleColumnWatchNextResults) === null || _c2 === void 0 || (_c2 = _c2.results) === null || _c2 === void 0 || (_c2 = _c2.results) === null || _c2 === void 0 ? void 0 : _c2.contents; const result = content === null || content === void 0 ? void 0 : content.find(e => { var _i; return ((_i = e.itemSectionRenderer) === null || _i === void 0 ? void 0 : _i.targetId) === 'watch-next-feed'; }); return typeof (result === null || result === void 0 ? void 0 : result.itemSectionRenderer) !== 'object'; }
    function isPlayerObject(pd) { return (pd === null || pd === void 0 ? void 0 : pd.videoDetails) && (pd === null || pd === void 0 ? void 0 : pd.playabilityStatus); }
    function isEmbeddedPlayerObject(pd) { return typeof (pd === null || pd === void 0 ? void 0 : pd.previewPlayabilityStatus) === 'object'; }
    function isAgeRestricted(ps) { if (!(ps !== null && ps !== void 0 && ps.status)) return false; if (ps.desktopLegacyAgeGateReason) return true; if (Config.UNLOCKABLE_PLAYABILITY_STATUSES.includes(ps.status)) return true; var _e; return isEmbed && ((_e = ps.errorScreen) === null || _e === void 0 || (_e = _e.playerErrorMessageRenderer) === null || _e === void 0 || (_e = _e.reason) === null || _e === void 0 || (_e = _e.runs) === null || _e === void 0 || (_e = _e.find(x => x.navigationEndpoint)) === null || _e === void 0 || (_e = _e.navigationEndpoint) === null || _e === void 0 || (_e = _e.urlEndpoint) === null || _e === void 0 || (_e = _e.url) === null || _e === void 0 ? void 0 : _e.includes('/2802167')); }
    function isSearchResult(pd) { var _c3, _c4, _or; return typeof (pd === null || pd === void 0 || (_c3 = pd.contents) === null || _c3 === void 0 ? void 0 : _c3.twoColumnSearchResultsRenderer) === 'object' || (pd === null || pd === void 0 || (_c4 = pd.contents) === null || _c4 === void 0 || (_c4 = _c4.sectionListRenderer) === null || _c4 === void 0 ? void 0 : _c4.targetId) === 'search-feed' || (pd === null || pd === void 0 || (_or = pd.onResponseReceivedCommands) === null || _or === void 0 || (_or = _or.find(x => x.appendContinuationItemsAction)) === null || _or === void 0 || (_or = _or.appendContinuationItemsAction) === null || _or === void 0 ? void 0 : _or.targetId) === 'search-feed'; }
    function attach$4(obj, prop, onCall) { if (!obj || typeof obj[prop] !== 'function') return; let original = obj[prop]; obj[prop] = function() { try { onCall(arguments); } catch {} original.apply(this, arguments); }; }

    const logPrefix = '%cSimple-YouTube-Age-Restriction-Bypass:'; const logPrefixStyle = 'background-color: #1e5c85; color: #fff; font-size: 1.2em;';
    function error(err, msg) { console.error(logPrefix, logPrefixStyle, msg, err); }
    function info(msg) { console.info(logPrefix, logPrefixStyle, msg); }

    function attach$3(onInitialData) { interceptObjectProperty('playerResponse', (obj, pr) => { if (isObject(obj.response)) onInitialData(obj.response); pr.unlocked = false; onInitialData(pr); return pr.unlocked ? createDeepCopy(pr) : pr; }); window.addEventListener('DOMContentLoaded', () => { if (isObject(window.ytInitialData)) onInitialData(window.ytInitialData); }); }
    function interceptObjectProperty(prop, onSet) { var _o; const dk = '__SYARB_' + prop; const { get: getter, set: setter } = (_o = Object.getOwnPropertyDescriptor(Object.prototype, prop)) !== null && _o !== void 0 ? _o : { set(v) { this[dk] = v; }, get() { return this[dk]; } }; Object.defineProperty(Object.prototype, prop, { set(v) { setter.call(this, isObject(v) ? onSet(this, v) : v); }, get() { return getter.call(this); }, configurable: true }); }
    function attach$2(onJson) { window.JSON.parse = function() { const d = nativeJSONParse.apply(this, arguments); return isObject(d) ? onJson(d) : d; }; }
    function attach$1(onReq) { if (typeof window.Request !== 'function') return; window.Request = new Proxy(window.Request, { construct(target, args) { const [url, options] = args; try { const p = parseRelativeUrl(url); const m = onReq(p, options); if (m) args[0] = m.toString(); } catch (err) { error(err, 'Failed to intercept Request()'); } return Reflect.construct(...arguments); } }); }
    function attach(onXhr) { XMLHttpRequest.prototype.open = function(method, url) { try { let p = parseRelativeUrl(url); if (p) { const m = onXhr(method, p, this); if (m) arguments[1] = m.toString(); } } catch (err) { error(err, 'Failed to intercept XMLHttpRequest.open()'); } nativeXMLHttpRequestOpen.apply(this, arguments); }; }

    const lsPrefix = 'SYARB_';
    function set(k, v) { localStorage.setItem(lsPrefix + k, JSON.stringify(v)); }
    function get(k) { try { return JSON.parse(localStorage.getItem(lsPrefix + k)); } catch { return null; } }

    function getPlayer$1(payload, useAuth) { return sendInnertubeRequest('v1/player', payload, useAuth); }
    function getNext$1(payload, useAuth) { return sendInnertubeRequest('v1/next', payload, useAuth); }
    function sendInnertubeRequest(ep, payload, useAuth) {
        try {
            const x = new XMLHttpRequest();
            x.open('POST', '/youtubei/' + ep + '?key=' + getYtcfgValue('INNERTUBE_API_KEY') + '&prettyPrint=false', false);
            if (useAuth && isUserLoggedIn()) { x.withCredentials = true; Config.GOOGLE_AUTH_HEADER_NAMES.forEach(h => { x.setRequestHeader(h, get(h)); }); }
            x.send(JSON.stringify(payload));
            return nativeJSONParse(x.responseText);
        } catch (err) {
            error(err, 'Innertube request failed for ' + ep);
            return { errorMessage: 'Innertube request failed: ' + (err.message || err) };
        }
    }
    var innertube = { getPlayer: getPlayer$1, getNext: getNext$1 };

    let nextResponseCache = {};
    function getGoogleVideoUrl(u) { return Config.VIDEO_PROXY_SERVER_HOST + '/direct/' + btoa(u.toString()); }
    function getPlayer(payload) { if (!nextResponseCache[payload.videoId] && !isMusic && !isEmbed) payload.includeNext = 1; return sendRequest('getPlayer', payload); }
    function getNext(payload) { if (nextResponseCache[payload.videoId]) return nextResponseCache[payload.videoId]; return sendRequest('getNext', payload); }
    function sendRequest(ep, payload) {
        const qp = new URLSearchParams(payload);
        const url = Config.ACCOUNT_PROXY_SERVER_HOST + '/' + ep + '?' + qp + '&client=js';
        try {
            const x = new XMLHttpRequest();
            x.open('GET', url, false);
            x.send(null);
            if (x.status < 200 || x.status >= 400) {
                error(new Error('HTTP ' + x.status), 'Proxy API returned error status');
                return { errorMessage: 'Proxy returned HTTP ' + x.status };
            }
            const pr = nativeJSONParse(x.responseText);
            pr.proxied = true;
            if (pr.nextResponse) { nextResponseCache[payload.videoId] = pr.nextResponse; delete pr.nextResponse; }
            return pr;
        } catch (err) {
            error(err, 'Proxy API Error — server may be offline');
            return { errorMessage: 'Proxy connection failed: ' + (err.message || 'Network error') };
        }
    }
    var proxy = { getPlayer, getNext, getGoogleVideoUrl };

    function getUnlockStrategies$1(vid, reason) { var _g; const cn = getYtcfgValue('INNERTUBE_CLIENT_NAME') || 'WEB'; const cv = getYtcfgValue('INNERTUBE_CLIENT_VERSION') || '2.20220203.04.00'; const hl = getYtcfgValue('HL'); const theme = (_g = getYtcfgValue('INNERTUBE_CONTEXT').client.userInterfaceTheme) !== null && _g !== void 0 ? _g : document.documentElement.hasAttribute('dark') ? 'USER_INTERFACE_THEME_DARK' : 'USER_INTERFACE_THEME_LIGHT'; return [{ name: 'Content Warning Bypass', skip: !reason || !reason.includes('CHECK_REQUIRED'), optionalAuth: true, payload: { context: { client: { clientName: cn, clientVersion: cv, hl, userInterfaceTheme: theme } }, videoId: vid, racyCheckOk: true, contentCheckOk: true }, endpoint: innertube }, { name: 'Account Proxy', payload: { videoId: vid, clientName: cn, clientVersion: cv, hl, userInterfaceTheme: theme, isEmbed: +isEmbed, isConfirmed: +isConfirmed }, endpoint: proxy }]; }

    function getUnlockStrategies(vid, reason) { const cn = getYtcfgValue('INNERTUBE_CLIENT_NAME') || 'WEB'; const cv = getYtcfgValue('INNERTUBE_CLIENT_VERSION') || '2.20220203.04.00'; const sts = getSignatureTimestamp(); const start = getCurrentVideoStartTime(vid); const hl = getYtcfgValue('HL'); return [{ name: 'Content Warning Bypass', skip: !reason || !reason.includes('CHECK_REQUIRED'), optionalAuth: true, payload: { context: { client: { clientName: cn, clientVersion: cv, hl } }, playbackContext: { contentPlaybackContext: { signatureTimestamp: sts } }, videoId: vid, startTimeSecs: start, racyCheckOk: true, contentCheckOk: true }, endpoint: innertube }, { name: 'TV Embedded Player', requiresAuth: false, payload: { context: { client: { clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '2.0', clientScreen: 'WATCH', hl }, thirdParty: { embedUrl: 'https://www.youtube.com/' } }, playbackContext: { contentPlaybackContext: { signatureTimestamp: sts } }, videoId: vid, startTimeSecs: start, racyCheckOk: true, contentCheckOk: true }, endpoint: innertube }, { name: 'Creator + Auth', requiresAuth: true, payload: { context: { client: { clientName: 'WEB_CREATOR', clientVersion: '1.20210909.07.00', hl } }, playbackContext: { contentPlaybackContext: { signatureTimestamp: sts } }, videoId: vid, startTimeSecs: start, racyCheckOk: true, contentCheckOk: true }, endpoint: innertube }, { name: 'Account Proxy', payload: { videoId: vid, reason, clientName: cn, clientVersion: cv, signatureTimestamp: sts, startTimeSecs: start, hl, isEmbed: +isEmbed, isConfirmed: +isConfirmed }, endpoint: proxy }]; }

    var btnTpl = '<div style="margin-top:15px!important;padding:3px 10px;margin:0 auto;background-color:#4d4d4d;width:fit-content;font-size:1.2em;text-transform:uppercase;border-radius:3px;cursor:pointer"><div class="button-text"></div></div>';
    let buttons = {};
    async function addButton(id, text, bg, onClick) { const es = await waitForElement('.ytp-error', 2000); const be = createElement('div', { class: 'button-container', innerHTML: btnTpl }); be.getElementsByClassName('button-text')[0].innerText = text; if (bg) be.querySelector(':scope > div').style['background-color'] = bg; if (typeof onClick === 'function') be.addEventListener('click', onClick); if (buttons[id] && buttons[id].isConnected) return; buttons[id] = be; es.append(be); }
    function removeButton(id) { if (buttons[id] && buttons[id].isConnected) buttons[id].remove(); }
    const confirmBtnId = 'confirmButton';
    function isConfirmationRequired() { return !isConfirmed && isEmbed && Config.ENABLE_UNLOCK_CONFIRMATION_EMBED; }
    function requestConfirmation() { addButton(confirmBtnId, 'Click to unlock', null, () => { removeButton(confirmBtnId); setUrlParams({ unlock_confirmed: 1, autoplay: 1 }); }); }

    const template = isDesktop ? '<tp-yt-paper-toast></tp-yt-paper-toast>\n' : '<c3-toast><ytm-notification-action-renderer><div class="notification-action-response-text"></div></ytm-notification-action-renderer></c3-toast>\n';
    const nToastContainer = createElement('div', { id: 'toast-container', innerHTML: template });
    const nToast = nToastContainer.querySelector(':scope > *');
    if (isMusic) nToast.style['margin-bottom'] = '85px';
    if (!isDesktop) { nToast.nMessage = nToast.querySelector('.notification-action-response-text'); nToast.show = (msg) => { nToast.nMessage.innerText = msg; nToast.setAttribute('dir', 'in'); setTimeout(() => nToast.setAttribute('dir', 'out'), nToast.duration + 225); }; }
    async function show(message, duration = 5) { if (!Config.ENABLE_UNLOCK_NOTIFICATION || isEmbed) return; await pageLoaded(); if (document.visibilityState === 'hidden') return; if (!nToastContainer.isConnected) document.documentElement.append(nToastContainer); nToast.duration = duration * 1000; nToast.show(message); }
    var Toast = { show };

    const msgs = { success: 'Age-restricted video successfully unlocked!', fail: 'Unable to unlock this video — More info in dev console' };
    let lastPlayerUnlockVideoId = null, lastPlayerUnlockReason = null, lastProxiedGoogleVideoUrlParams, cachedPlayerResponse = {};
    function getLastProxiedGoogleVideoId() { return lastProxiedGoogleVideoUrlParams === null || lastProxiedGoogleVideoUrlParams === void 0 ? void 0 : lastProxiedGoogleVideoUrlParams.get('id'); }

    function unlockResponse$1(pr) {
        if (isConfirmationRequired()) { info('Unlock confirmation required.'); requestConfirmation(); return; }
        const vid = (pr.videoDetails === null || pr.videoDetails === void 0 ? void 0 : pr.videoDetails.videoId) || getYtcfgValue('PLAYER_VARS').video_id;
        const reason = (pr.playabilityStatus === null || pr.playabilityStatus === void 0 ? void 0 : pr.playabilityStatus.status) || (pr.previewPlayabilityStatus === null || pr.previewPlayabilityStatus === void 0 ? void 0 : pr.previewPlayabilityStatus.status);
        if (!Config.SKIP_CONTENT_WARNINGS && reason.includes('CHECK_REQUIRED')) return;
        lastPlayerUnlockVideoId = vid; lastPlayerUnlockReason = reason;
        const unlocked = getUnlockedPlayerResponse(vid, reason);
        if (unlocked.errorMessage) { Toast.show(msgs.fail + ' (ProxyError)', 10); throw new Error('Player Unlock Failed: ' + unlocked.errorMessage); }
        if (!Config.VALID_PLAYABILITY_STATUSES.includes(unlocked.playabilityStatus === null || unlocked.playabilityStatus === void 0 ? void 0 : unlocked.playabilityStatus.status)) { Toast.show(msgs.fail + ' (PlayabilityError)', 10); throw new Error('Player Unlock Failed'); }
        if (unlocked.proxied && unlocked.streamingData !== null && unlocked.streamingData !== void 0 && unlocked.streamingData.adaptiveFormats) { const ct = unlocked.streamingData.adaptiveFormats.find(x => x.signatureCipher); const vu = ct ? new URLSearchParams(ct.signatureCipher).get('url') : (unlocked.streamingData.adaptiveFormats.find(x => x.url) || {}).url; lastProxiedGoogleVideoUrlParams = vu ? new URLSearchParams(new window.URL(vu).search) : null; }
        if (pr.previewPlayabilityStatus) pr.previewPlayabilityStatus = unlocked.playabilityStatus;
        Object.assign(pr, unlocked); pr.unlocked = true; Toast.show(msgs.success);
    }

    function getUnlockedPlayerResponse(vid, reason) { if (cachedPlayerResponse.videoId === vid) return createDeepCopy(cachedPlayerResponse); const strategies = getUnlockStrategies(vid, reason); let unlocked = {}; strategies.every((s, i) => { if (s.skip || s.requiresAuth && !isUserLoggedIn()) return true; info('Trying Player Unlock #' + (i + 1) + ' (' + s.name + ')'); try { unlocked = s.endpoint.getPlayer(s.payload, s.requiresAuth || s.optionalAuth); } catch (err) { error(err, 'Player Unlock #' + (i + 1) + ' failed'); } const valid = Config.VALID_PLAYABILITY_STATUSES.includes(unlocked === null || unlocked === void 0 || (unlocked.playabilityStatus === null || unlocked.playabilityStatus === void 0 ? void 0 : unlocked.playabilityStatus.status)); if (valid) { if (!unlocked.trackingParams || !(unlocked.responseContext !== null && unlocked.responseContext !== void 0 && unlocked.responseContext.mainAppWebResponseContext !== null && unlocked.responseContext.mainAppWebResponseContext !== void 0 && unlocked.responseContext.mainAppWebResponseContext.trackingParam)) { unlocked.trackingParams = 'CAAQu2kiEwjor8uHyOL_AhWOvd4KHavXCKw='; unlocked.responseContext = { mainAppWebResponseContext: { trackingParam: 'kx_fmPxhoPZRzgL8kzOwANUdQh8ZwHTREkw2UqmBAwpBYrzRgkuMsNLBwOcCE59TDtslLKPQ-SS' } }; } if (s.payload.startTimeSecs && s.name === 'Account Proxy') unlocked.playerConfig = { playbackStartConfig: { startSeconds: s.payload.startTimeSecs } }; } return !valid; }); cachedPlayerResponse = { videoId: vid, ...createDeepCopy(unlocked) }; return unlocked; }

    let cachedNextResponse = {};
    function unlockResponse(orig) { const vid = orig.currentVideoEndpoint.watchEndpoint.videoId; if (!vid || vid !== lastPlayerUnlockVideoId) return; const unlocked = getUnlockedNextResponse(vid); if (isWatchNextSidebarEmpty(unlocked)) throw new Error('Sidebar Unlock Failed'); mergeNextResponse(orig, unlocked); }
    function getUnlockedNextResponse(vid) { if (cachedNextResponse.videoId === vid) return createDeepCopy(cachedNextResponse); const strategies = getUnlockStrategies$1(vid, lastPlayerUnlockReason); let unlocked = {}; strategies.every((s, i) => { if (s.skip) return true; info('Trying Next Unlock #' + (i + 1)); try { unlocked = s.endpoint.getNext(s.payload, s.optionalAuth); } catch (err) { error(err, 'Next Unlock failed'); } return isWatchNextSidebarEmpty(unlocked); }); cachedNextResponse = { videoId: vid, ...createDeepCopy(unlocked) }; return unlocked; }
    function mergeNextResponse(orig, unlocked) { if (isDesktop) { orig.contents.twoColumnWatchNextResults.secondaryResults = unlocked.contents.twoColumnWatchNextResults.secondaryResults; try { const ov = orig.contents.twoColumnWatchNextResults.results.results.contents.find(x => x.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer; const uv = unlocked.contents.twoColumnWatchNextResults.results.results.contents.find(x => x.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer; if (uv.description) ov.description = uv.description; else if (uv.attributedDescription) ov.attributedDescription = uv.attributedDescription; } catch(e) {} return; } var _un; const feed = (_un = unlocked.contents) === null || _un === void 0 || (_un = _un.singleColumnWatchNextResults) === null || _un === void 0 || (_un = _un.results) === null || _un === void 0 || (_un = _un.results) === null || _un === void 0 || (_un = _un.contents) === null || _un === void 0 ? void 0 : _un.find(x => { var _i; return ((_i = x.itemSectionRenderer) === null || _i === void 0 ? void 0 : _i.targetId) === 'watch-next-feed'; }); if (feed) orig.contents.singleColumnWatchNextResults.results.results.contents.push(feed); try { const od = orig.engagementPanels.find(x => x.engagementPanelSectionListRenderer).engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items.find(x => x.expandableVideoDescriptionBodyRenderer); const ud = unlocked.engagementPanels.find(x => x.engagementPanelSectionListRenderer).engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items.find(x => x.expandableVideoDescriptionBodyRenderer); if (ud.expandableVideoDescriptionBodyRenderer) od.expandableVideoDescriptionBodyRenderer = ud.expandableVideoDescriptionBodyRenderer; } catch(e) {} }

    function handleXhrOpen(method, url, xhr) { let pu = unlockGoogleVideo(url); if (pu) { Object.defineProperty(xhr, 'withCredentials', { set: () => {}, get: () => false }); return pu; } if (url.pathname.indexOf('/youtubei/') === 0) attach$4(xhr, 'setRequestHeader', ([hn, hv]) => { if (Config.GOOGLE_AUTH_HEADER_NAMES.includes(hn)) set(hn, hv); }); if (Config.SKIP_CONTENT_WARNINGS && method === 'POST' && ['/youtubei/v1/player', '/youtubei/v1/next'].includes(url.pathname)) attach$4(xhr, 'send', (args) => { if (typeof args[0] === 'string') args[0] = setContentCheckOk(args[0]); }); }
    function handleFetchRequest(url, opts) { let nu = unlockGoogleVideo(url); if (nu) { if (opts.credentials) opts.credentials = 'omit'; return nu; } if (url.pathname.indexOf('/youtubei/') === 0 && isObject(opts.headers)) { for (let h in opts.headers) if (Config.GOOGLE_AUTH_HEADER_NAMES.includes(h)) set(h, opts.headers[h]); } if (Config.SKIP_CONTENT_WARNINGS && ['/youtubei/v1/player', '/youtubei/v1/next'].includes(url.pathname)) opts.body = setContentCheckOk(opts.body); }
    function unlockGoogleVideo(url) { if (Config.VIDEO_PROXY_SERVER_HOST && isGoogleVideoUrl(url) && isGoogleVideoUnlockRequired(url, getLastProxiedGoogleVideoId())) return proxy.getGoogleVideoUrl(url); }
    function setContentCheckOk(body) { try { let p = JSON.parse(body); if (p.videoId) { p.contentCheckOk = true; p.racyCheckOk = true; return JSON.stringify(p); } } catch {} return body; }
    function processThumbnails(obj) { for (const t of findNestedObjectsByAttributeNames(obj, ['url', 'height'])) { if (t.url.indexOf('?sqp=') !== -1 && Config.BLURRED_THUMBNAIL_SQP_LENGTHS.includes(new URL(t.url).searchParams.get('sqp').length)) t.url = t.url.split('?')[0]; } }

    try { attach$3(processYtData); attach$2(processYtData); attach(handleXhrOpen); attach$1(handleFetchRequest); } catch (err) { error(err, 'Error while attaching data interceptors'); }

    function processYtData(ytData) {
        try { if (isPlayerObject(ytData) && isAgeRestricted(ytData.playabilityStatus)) unlockResponse$1(ytData); else if (isEmbeddedPlayerObject(ytData) && isAgeRestricted(ytData.previewPlayabilityStatus)) unlockResponse$1(ytData); } catch (err) { error(err, 'Video unlock failed'); }
        try { if (isWatchNextObject(ytData) && isWatchNextSidebarEmpty(ytData)) unlockResponse(ytData); if (isWatchNextObject(ytData.response) && isWatchNextSidebarEmpty(ytData.response)) unlockResponse(ytData.response); } catch (err) { error(err, 'Sidebar unlock failed'); }
        try { if (isSearchResult(ytData)) processThumbnails(ytData); } catch (err) { error(err, 'Thumbnail unlock failed'); }
        return ytData;
    }
})();

}); // END Module 5
} // end if ENV.isYouTube

// ============================================================
// END OF GOOGLE PRIVACY & YOUTUBE ENHANCEMENT SUITE
// ============================================================
})(); // END IIFE WRAPPER
