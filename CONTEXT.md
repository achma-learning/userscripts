# achma-learning/userscripts — AI Context File
_Last synced: 2026-10-10 @ bc55f0f_

## 1. What This Is (Plain English)

- **In one sentence:** A personal toolbox of small browser add-ons ("userscripts") that make Google, YouTube, Claude.ai and Gemini less distracting and more useful for studying, plus one unrelated Windows lock-down tool.
- **Why it exists:** Google and YouTube are built to keep you scrolling. These scripts strip tracking, ads and Shorts, and add study features (notes, resume playback, timers). The Claude script queues prompts so they send by themselves when your usage limit resets.
- **Who uses it:** Mostly the author. The Privacy Suite is also public on Greasy Fork (script 568928, ~1,000 installs). Everything else is personal.
- **Vibe:** Scrappy personal tools, each one a single file. The Privacy Suite is the polished one. No build system, no tests, on purpose.

## 2. How To Run It

There is nothing to install and nothing to build. Every `.js` file is one complete userscript.

- **Setup once:** Install Tampermonkey or Violentmonkey in your browser.
- **Run dev:** Open the userscript manager → "Create new script" → paste the whole file → save → reload the target site (google.com, youtube.com, claude.ai, gemini.google.com).
- **Build / deploy:**
  - `google-custom.js` → auto-updates from `raw.githubusercontent.com/.../main/google-custom.js` (`google-custom.js:213-214`). Merging to `main` **is** the release.
  - The Privacy Suite → paste into the Greasy Fork editor for script 568928. It updates from Greasy Fork, **not** from this repo.
  - Everything else → no update URL. Users have to re-paste by hand.
  - `index.html` → open it in a browser. Not deployed anywhere (_hosting not yet figured out_).
  - `windows-safe-mode/` → on Windows, double-click `FaradayMode.bat` (asks for admin once).
- **Required env vars:** none. No API keys anywhere.

### How to test a change (the only method that has found real bugs)

Use headless Chromium with Playwright. **Route-fulfil a stub page at the real hostname.** The scripts check `location.hostname`, so a `localhost` page tests nothing.

```js
await ctx.addInitScript(src);                     // = @run-at document-start, BEFORE <html> exists
await ctx.route('**/*', r => r.fulfill({ contentType: 'text/html; charset=utf-8', body: stub }));
await page.goto('https://www.youtube.com/shorts/ID?feature=share');
// assert: no pageerror, no "[PrivacySuite] … error" console lines, page.url() is right
```

`addInitScript` runs before `<html>` exists, the same as Tampermonkey's "instant" injection. That is the harshest case, so test it. For `@grant GM_*` scripts, shim `GM_getValue`/`GM_setValue` and inject with `page.addScriptTag`.

## 3. Tech Stack

- **Language + runtime:** Plain browser JavaScript (ES2020). No transpiler and no TypeScript. There is no `package.json`, so nothing here is a Node project. PowerShell 5.1 and batch files for `windows-safe-mode/`.
- **Framework / key libraries:** None. Zero dependencies, no `@require`.
- **What kind of project:** A collection of standalone userscripts, a static HTML registry page, and a Windows hardening tool.
- **External services (all of them):**
  - `sponsor.ajay.app` — SponsorBlock, Privacy Suite only, opt-in.
  - `youtube-proxy.zerody.one` + `ny.4everproxy.com` — age-restriction bypass (Module 5 in both Google/YouTube scripts). Contacted only when you open an age-restricted video (`google-custom.js` "ACCOUNT_PROXY_SERVER_HOST").
  - `youtube.com/api/timedtext` — Transcript Downloader, same-origin.
  - User-supplied webhook URL — `claude-automation.js`, optional.
  - Google Fonts — `index.html` only.

## 4. Code Map (The Important Files Only)

| File | Lines | What it is |
|---|---|---|
| `google-privacy-youtube-suite/Google Privacy & YouTube Enhancement Suite.js` | 3.6k | **The flagship.** Public on Greasy Fork. Has its own `CONTEXT.md` next to it. Read that before touching it. |
| `google-custom.js` | 2.9k | The **older sibling fork** of the suite (v4.3.x). Same module numbers, but it lacks the suite's layer system. Auto-updates from `main`. |
| `claude-automation.js` | 0.8k | claude.ai: schedule one send, or run a queue of prompts with random gaps. Resumes when the usage limit resets. Uses `GM_*` storage. |
| `YouTube Transcript Downloader.js` | 0.4k | A floating button / `Ctrl+Shift+D` that saves captions as a `.txt` with timestamps. |
| `gemini-focus-bar.js` | 74 | Press `/` on Gemini to jump to the prompt box. |
| `index.html` | 1.1k | "Userscript Hub": a curated registry with a generator that builds one "install all selected" userscript. The data is the `SCRIPTS` array (`index.html:700-870`). |
| `windows-safe-mode/` | — | **Not a userscript.** "Faraday Mode" Windows lock-down with three modes, a tray icon and a password gate. Has its own `README.md`. |
| `senior-userscript-engineer.md` | — | The system prompt the author uses to generate scripts. It is the house style guide. |
| `userscript used as a build model.txt` | — | The original feature wishlist and upstream sources that became the suite / google-custom. |
| `README.md` | — | A scratch list of userscript sites and favourite scripts. Not real docs. |

### Inside `google-custom.js` (open these spots first)
`ENV` hostname gates (line 406) · `DEFAULT_SETTINGS` (421) · `_appendToHead` / `_whenRoot` (497–520) · settings panel (`createSettingsPanel`) · Module 1 anti-track (`_safeRun('Module1…'`) · the YouTube block starts at `if (ENV.isYouTube) {` · Module 5 age bypass is near the end.

### Storage keys
- `google-custom`: `__gcustom_settings_v4__` (it migrates `__pyt_suite_settings__` once), plus a resume-position cache. All in `localStorage`, per origin.
- Privacy Suite: `__pyt_*` keys (see its CONTEXT.md §4).
- `claude-automation`: `GM_*` keys `ca_sched_v9` and `ca_queue_v9`.
- `index.html`: `localStorage.ush_selected`.

## 5. Rules For Editing This Code

- **One file = one script. No build step, no npm, no `@require`.** Users paste the file, so it must be self-contained.
- **The Google/YouTube scripts must stay `@grant none`.** That keeps them in page context. Module 1's link hooks and Module 5's `JSON.parse` / `ytcfg` hooks only work there. Adding any `@grant` silently breaks both.
- **`@grant GM_xmlhttpRequest` needs `@connect`** for every host it calls (`claude-automation.js` uses `@connect *` because the webhook URL is user-chosen).
- **At `document-start`, assume nothing exists**, not even `document.documentElement`. Use `_appendToHead()` / `_whenRoot()`. Observe `document`, not `document.body`.
- **Declare `let`/`const` before the first call that reads them.** A read above the declaration throws a TDZ error. `_safeRun` swallows it, so the whole module dies with no visible error. This happened in both Google scripts.
- **No `innerHTML` with page or user content.** Build DOM with `createElement` and `textContent`. Hardcoded SVG constants are the only exception.
- **Don't trim the ~199 `@match` lines.** They are every Google country domain.
- **Bump `@version` on every change.** Tampermonkey only auto-updates when the version goes up. Add a changelog entry in the header comment (that's the house habit).
- **Comment the *why*.** Match the files' "this looks wrong, here's the browser quirk" comment style.
- **Port fixes both ways between the suite and `google-custom.js`.** They share most code, and bugs fixed in one have stayed in the other before.

## 6. Fragile Bits & Landmines

### Shared by both Google/YouTube scripts
- **The `JSON.parse` hook chain order matters.** In the suite, ad-stripping Layer 0 must come before Module 5 (see the suite's CONTEXT.md §6).
- **Module 5 (age bypass) is a minified third-party port** (`attach$1…$4`). Treat it as read-only and re-port it from upstream.
- **Module 2's long `EXPFLAGS` list** reverts YouTube's layout. Entries that look unused still matter.
- **YouTube-side functions live inside `if (ENV.isYouTube) { … }`.** Strict mode makes those function declarations block-scoped. So in `google-custom.js:~1010-1020`, the settings panel's `typeof applyFocusMode === 'function'` checks are **always false**: on YouTube, "Save" never applies focus mode, the HUD or resume until reload. The suite fixed this with `YT_HOOKS`. **Still open in google-custom** (see §7).

### `claude-automation.js`
- **Limit detection scans page text.** `findLimitText()` walks every text node looking for "reset" / "usage limit". It must skip its own UI (`IGNORE_SEL`). Before v9.0.1, the script's own label "Auto from reset timer" made every page look rate-limited. Scheduled messages were re-sent up to 3 times (75 min and 5 h later), and the queue never got past message 1.
- **Chat-message exclusion is best-effort.** It relies on selectors (`[data-testid="user-message"]`, `[data-is-streaming]`, `.font-claude-message`). If claude.ai renames them, a prompt containing "reset" will look like a limit again.
- **AM/PM matters:** "reset at 5:00 PM" means 17:00. The `AMPM` group in `CLOCK_RES` handles it.

### `windows-safe-mode/`
- **Paths with spaces or parentheses** broke the installer before. That is why it uses `cmd /c call "<path>"` and a hand-quoted `ProcessStartInfo` (`install.ps1:29-31, 64-75`). Don't "simplify" to `Start-Process -ArgumentList`.
- **`auth.ps1` writes only with `Write-Host`**, never `Write-Error`, so red text never covers the password prompt (that was an earlier fix).

### Docs that disagree with the code (the code wins)
- `index.html:743` labels Greasy Fork 568928 as "Don't Track Me Google". It is the Privacy Suite.
- `windows-safe-mode/README.md` intro says left-click toggles "Safe ↔ Normal". Its own tray table says it cycles through three modes.
- Before this sync, the suite's CONTEXT.md said SponsorBlock was the only external service. Module 5 also calls two proxy hosts (now corrected there).

## 7. Current State

- **Last shipped:** Privacy Suite v4.0.0 (layered ad defence and learning modules), now in its own folder with docs (PR #20).
- **Working on now:** This sync. A bug sweep fixed and tested in headless Chromium:
  - `google-custom.js` 4.3.1:
    - Module 1 anti-tracking was dead because of the TDZ bug, and every click on a Google page threw an error.
    - The Shorts redirect built `/watch?v=ID?feature=share`.
    - With instant injection, the whole script crashed before `<html>` existed.
  - `claude-automation.js` 9.0.1:
    - It treated its own UI as a limit banner (the self-match above).
    - It misread 12-hour times ("5:00 PM" as 05:00).
    - `@connect` was missing.
- **Next up:**
  1. Port `YT_HOOKS` into `google-custom.js` so saving settings applies on YouTube without a reload (§6).
  2. Publish Privacy Suite v4.0.0 to Greasy Fork, and fix the `index.html:743` label.
  3. Commit the Playwright harness from §2 as `tests/smoke.mjs`. It is currently rebuilt by hand every session.

### Known open bugs (not fixed yet, smallest first)
- `claude-automation`:
  - Clicking "▶ Start" ignores prompts typed but not saved with "💾 Save queue". It runs the old list.
  - The ✕ (cancel) button calls `pauseQueue()` even for a single schedule. The status then says "⏸ Paused at 0/0" and the ✕ stays visible.
  - `Alt+Shift+S/Q` check `e.key`. On macOS, Option changes the character, so they never fire. Use `e.code`.
  - Export revokes the blob URL right after `click()`, which can cancel the download in Firefox.
  - A schedule missed by more than 10 s (browser closed) is silently dropped, not sent late.
  - `waitForResponse()` treats "send button enabled" as "Claude finished". The button stays disabled while the input is empty, so each step may wait the full 5-minute timeout. Better: watch for the Stop button or `[data-is-streaming]`.
- `index.html`:
  - The generated installer uses `@match *://*/*`, so its "Install N scripts" button appears on **every website** until it is removed.
  - The code preview's highlighter wraps `"…"` inside its own `class="…"` attributes, which garbles URLs in the preview (the downloaded file is fine).
  - `JSON.parse(localStorage…)` has no `try`.
- `Transcript Downloader`: YouTube now often requires a proof-of-origin (`pot`) token on `timedtext`. Without it, the fetch returns an empty body and `response.json()` throws. The button just turns red.
- `google-custom.js`: it has no `@noframes`, so it runs (and adds a gear button) inside every Google/YouTube iframe.
- `windows-safe-mode` (**security**):
  - The SYSTEM boot task runs `FaradayMode.bat` from wherever it was unzipped, often a user-writable Downloads folder. Anything running as that user can edit the `.bat` (SYSTEM code at next boot) or edit `auth.ps1` to `exit 0` (bypassing the password).
  - Fix: install copies to `%ProgramFiles%\FaradayMode` (admin-only) and points both tasks there.
  - Also, `auth.ps1 -Verify` allows access if `auth.dat` is missing.

## 8. Update Protocol (Verbatim)

> **For the AI Assistant:** When asked to "Update CONTEXT.md":
> 1. Re-run Phase 0 — check for new `GEMINI.md` / `CLAUDE.md` / `.github/` files.
> 2. Re-scan the tree, manifests, and `.github/workflows/` for drift.
> 3. Read our recent conversation for new decisions, fragile bits discovered, or shifted goals.
> 4. Refresh the `_Last synced_` line with today's date and current commit SHA.
> 5. Rewrite — do not append. One clean source of truth. Preserve still-true content, revise the rest.
> 6. Keep §1 and §2 in plain English. Keep the file under ~350 lines.

---

### Absent by design (checked, not found)
No `package.json` / lockfile / `tsconfig` / `Dockerfile` / `.env.example` / `.nvmrc` / `.github/workflows/` / `dependabot.yml` / `LICENSE` file (MIT is declared in each script header only) / tests. No other AI memory files (`CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`). A pile of single-file userscripts needs none of these. Don't add a build pipeline without a concrete reason.
