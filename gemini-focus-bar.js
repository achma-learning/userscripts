// ==UserScript==
// @name         gemini-focus-bar
// @namespace    gemini-focus-bar
// @version      1.0.0
// @description  Press "/" anywhere on Gemini to focus the prompt input bar
// @author       achma-learning
// @license      MIT
// @match        *://gemini.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
'use strict';

if (window.__GEMINI_FOCUS_BAR_LOADED__) return;
window.__GEMINI_FOCUS_BAR_LOADED__ = true;

// Gemini renders its prompt input as a contenteditable inside <rich-textarea>.
// We try a few selectors so the script keeps working if one rolls out a tweak.
const INPUT_SELECTORS = [
    'rich-textarea div.ql-editor[contenteditable="true"]',
    'rich-textarea [contenteditable="true"]',
    'div.ql-editor[contenteditable="true"]',
    'textarea[aria-label*="prompt" i]',
    'textarea',
];

function findInput() {
    for (const sel of INPUT_SELECTORS) {
        const el = document.querySelector(sel);
        if (el && el.offsetParent !== null) return el;
    }
    return null;
}

function isTypingTarget(el) {
    if (!el) return false;
    if (el.isContentEditable) return true;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

function focusInput(el) {
    el.focus();
    // For contenteditable, put the caret at the end so typing continues naturally.
    if (el.isContentEditable) {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if ('setSelectionRange' in el) {
        const end = el.value.length;
        el.setSelectionRange(end, end);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key !== '/') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;

    const input = findInput();
    if (!input) return;

    e.preventDefault();
    e.stopPropagation();
    focusInput(input);
}, true);

})();
