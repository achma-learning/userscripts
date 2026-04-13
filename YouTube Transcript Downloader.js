// ==UserScript==
// @name         YouTube Transcript Downloader
// @namespace    yt-transcript-dl
// @version      1.0.0
// @description  Download YouTube video transcripts/captions as timestamped text files via the player API
// @author       achma-learning
// @license      MIT
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/live_chat*
// @exclude      *://accounts.youtube.com/*
// @exclude      *://studio.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=YouTube.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// Approach: Instead of scraping the rendered transcript panel (fragile, language-dependent),
// this script uses YouTube's internal player API to fetch caption data directly.
// #movie_player.getPlayerResponse() exposes caption track URLs, which we fetch
// in json3 format for structured timestamp + text data.

(() => {
'use strict';

if (window.__YT_TRANSCRIPT_DL_LOADED__) return;
window.__YT_TRANSCRIPT_DL_LOADED__ = true;

// ─── Constants ───────────────────────────────────────────────────────
const BUTTON_ID = 'yt-transcript-dl-btn';
const DIALOG_ID = 'yt-transcript-lang-dialog';
const STYLE_ID  = 'yt-transcript-dl-styles';

// ─── CSS Injection ───────────────────────────────────────────────────
const styleEl = document.createElement('style');
styleEl.id = STYLE_ID;
styleEl.textContent = `
    #${BUTTON_ID} {
        position: fixed;
        bottom: 70px;
        right: 20px;
        z-index: 999999;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #282828;
        border: 1px solid #3a3f4a;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: background 0.3s, transform 0.2s, opacity 0.3s;
    }
    #${BUTTON_ID}:hover {
        background: #3a3f4a;
        transform: scale(1.1);
    }
    #${BUTTON_ID} svg {
        width: 22px;
        height: 22px;
        fill: #e0e0e0;
        pointer-events: none;
    }
    #${BUTTON_ID}:hover svg { fill: #fff; }
    :fullscreen #${BUTTON_ID} { display: none !important; }

    #${DIALOG_ID} {
        position: fixed;
        inset: 0;
        z-index: 9999999;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #${DIALOG_ID} > div {
        background: #212121;
        border-radius: 12px;
        padding: 20px;
        min-width: 280px;
        max-width: 400px;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    #${DIALOG_ID} h3 {
        color: #fff;
        margin: 0 0 16px;
        font-size: 16px;
        font-family: 'Roboto', Arial, sans-serif;
    }
    #${DIALOG_ID} button {
        display: block;
        width: 100%;
        padding: 10px 14px;
        margin-bottom: 6px;
        background: #333;
        color: #e0e0e0;
        border: 1px solid #444;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        text-align: left;
        font-family: 'Roboto', Arial, sans-serif;
        transition: background 0.2s;
    }
    #${DIALOG_ID} button:hover { background: #444; }
    #${DIALOG_ID} button.yt-tdl-cancel {
        margin-top: 10px;
        text-align: center;
        background: transparent;
        border-color: #555;
        color: #aaa;
    }
    #${DIALOG_ID} button.yt-tdl-cancel:hover { background: #2a2a2a; }
`;
(document.head || document.documentElement).appendChild(styleEl);

// ─── Utility Functions ───────────────────────────────────────────────

function formatTimestamp(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
        return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function sanitizeFilename(name) {
    return name.replace(/[\\/:*?"<>|]/g, '_').substring(0, 200);
}

function getVideoTitle() {
    const pr = getPlayerResponse();
    if (pr && pr.videoDetails && pr.videoDetails.title) {
        return pr.videoDetails.title;
    }
    return document.title.replace(/ - YouTube$/, '').trim() || 'transcript';
}

// ─── Core Transcript Functions ───────────────────────────────────────

function getPlayerResponse() {
    // Primary: player API (works after SPA navigation)
    const player = document.querySelector('#movie_player');
    if (player && typeof player.getPlayerResponse === 'function') {
        return player.getPlayerResponse();
    }
    // Fallback: initial page data (available on first load)
    if (window.ytInitialPlayerResponse) {
        return window.ytInitialPlayerResponse;
    }
    return null;
}

function getCaptionTracks() {
    const pr = getPlayerResponse();
    if (!pr) return null;
    const tracks = pr.captions
        && pr.captions.playerCaptionsTracklistRenderer
        && pr.captions.playerCaptionsTracklistRenderer.captionTracks;
    return (Array.isArray(tracks) && tracks.length > 0) ? tracks : null;
}

async function fetchTranscript(track) {
    // Append fmt=json3 for structured JSON instead of XML
    const separator = track.baseUrl.includes('?') ? '&' : '?';
    const url = track.baseUrl + separator + 'fmt=json3';
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
}

function formatTranscript(json3Data) {
    const events = json3Data.events || [];
    const lines = [];

    for (const event of events) {
        // Skip non-text events (newline markers, format changes)
        if (!event.segs) continue;

        const text = event.segs
            .map(function(seg) { return seg.utf8 || ''; })
            .join('')
            .replace(/\n/g, ' ')
            .trim();

        if (!text) continue;

        const timestamp = formatTimestamp(event.tStartMs || 0);
        lines.push('[' + timestamp + '] ' + text);
    }

    return lines.join('\n');
}

// ─── Download Helper ─────────────────────────────────────────────────

function triggerDownload(text, filename) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        URL.revokeObjectURL(url);
        a.remove();
    }, 100);
}

// ─── Button State Feedback ───────────────────────────────────────────

function setButtonState(btn, state, message) {
    if (!btn) return;
    btn.dataset.state = state;

    if (state === 'loading') {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
        btn.title = 'Downloading...';
    } else if (state === 'success') {
        btn.style.background = '#10b981';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.title = 'Download complete!';
        setTimeout(function() { setButtonState(btn, 'idle'); }, 2500);
    } else if (state === 'error') {
        btn.style.background = '#ef4444';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.title = message || 'Error';
        setTimeout(function() { setButtonState(btn, 'idle'); }, 3000);
    } else { // idle
        btn.style.background = '';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.title = 'Download Transcript (Ctrl+Shift+D)';
    }
}

// ─── Floating Download Button ────────────────────────────────────────

function createDownloadButton() {
    if (document.getElementById(BUTTON_ID)) return;
    if (!document.body) return;

    const btn = document.createElement('div');
    btn.id = BUTTON_ID;
    btn.title = 'Download Transcript (Ctrl+Shift+D)';

    // Transcript/download SVG icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z');
    svg.appendChild(path);
    btn.appendChild(svg);

    btn.addEventListener('click', handleDownloadClick);
    document.body.appendChild(btn);
}

function destroyDownloadButton() {
    const btn = document.getElementById(BUTTON_ID);
    if (btn) btn.remove();
}

// ─── Language Selector Dialog ────────────────────────────────────────

function showLanguageSelector(tracks, onSelect) {
    // Remove existing dialog (idempotent)
    const existing = document.getElementById(DIALOG_ID);
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = DIALOG_ID;

    const panel = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = 'Select transcript language';
    panel.appendChild(title);

    for (const track of tracks) {
        const btn = document.createElement('button');
        const label = (track.name && track.name.simpleText) || track.languageCode;
        const isAuto = track.kind === 'asr';
        btn.textContent = label + (isAuto ? ' (auto-generated)' : '');
        btn.addEventListener('click', function() {
            overlay.remove();
            document.removeEventListener('keydown', onEsc);
            onSelect(track);
        });
        panel.appendChild(btn);
    }

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'yt-tdl-cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', function() {
        overlay.remove();
        document.removeEventListener('keydown', onEsc);
    });
    panel.appendChild(cancelBtn);

    overlay.appendChild(panel);

    // Click outside to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
            document.removeEventListener('keydown', onEsc);
        }
    });

    // ESC to close
    function onEsc(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', onEsc);
        }
    }
    document.addEventListener('keydown', onEsc);

    document.body.appendChild(overlay);
}

// ─── Main Download Handler ───────────────────────────────────────────

async function downloadTrack(track) {
    const json3 = await fetchTranscript(track);
    const text = formatTranscript(json3);
    if (!text) throw new Error('Transcript is empty');
    const title = sanitizeFilename(getVideoTitle());
    const lang = track.languageCode || '';
    const filename = title + (lang ? ' [' + lang + ']' : '') + '.txt';
    triggerDownload(text, filename);
}

async function handleDownloadClick() {
    const btn = document.getElementById(BUTTON_ID);

    try {
        setButtonState(btn, 'loading');

        const tracks = getCaptionTracks();
        if (!tracks) {
            setButtonState(btn, 'error', 'No captions available for this video');
            return;
        }

        if (tracks.length === 1) {
            await downloadTrack(tracks[0]);
            setButtonState(btn, 'success');
        } else {
            // Multiple tracks: show language selector
            setButtonState(btn, 'idle');
            showLanguageSelector(tracks, async function(track) {
                setButtonState(btn, 'loading');
                try {
                    await downloadTrack(track);
                    setButtonState(btn, 'success');
                } catch (e) {
                    console.error('[TranscriptDL]', e);
                    setButtonState(btn, 'error', 'Download failed: ' + e.message);
                }
            });
        }
    } catch (e) {
        console.error('[TranscriptDL]', e);
        setButtonState(btn, 'error', 'Error: ' + e.message);
    }
}

// ─── Keyboard Shortcut ──────────────────────────────────────────────

document.addEventListener('keydown', function(e) {
    // Skip if user is typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    // Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (location.pathname === '/watch') {
            handleDownloadClick();
        }
    }
}, true);

// ─── SPA Navigation Handling ─────────────────────────────────────────

function onNavigate() {
    if (location.pathname === '/watch') {
        requestAnimationFrame(function() {
            if (!document.getElementById(BUTTON_ID)) createDownloadButton();
        });
    } else {
        destroyDownloadButton();
    }
}

document.addEventListener('yt-navigate-finish', onNavigate);
document.addEventListener('yt-page-data-updated', onNavigate);

// ─── Init ────────────────────────────────────────────────────────────

function init() {
    if (location.pathname === '/watch') {
        createDownloadButton();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
    init();
}

})();
