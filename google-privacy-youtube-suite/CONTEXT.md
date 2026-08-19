# Google Privacy & YouTube Enhancement Suite — AI Context File
_Last synced: 2026-08-19 @ 7da8de7_

## 1. What This Is (Plain English)

- **In one sentence:** One browser userscript that strips Google's click-tracking, blocks YouTube ads six different ways in case any one of them stops working, deletes Shorts, and bolts on study tools — timestamped notes, resume-where-you-left-off, and a session timer.
- **Why it exists:** Google and YouTube are optimised to keep you clicking. This drags them back toward being usable for research and lectures. It started as a merge of six separate userscripts (anti-tracking, endless scroll, age bypass, anti-Shorts, old UI, region setter) that were fighting each other when installed side by side.
- **Who uses it:** Mostly the author, plus ~1,000 installs on Greasy Fork (script ID 568928). Public enough that a silent breakage is embarrassing; not so public that a bad release is a crisis.
- **Vibe:** Polished personal tool. Heavily commented, defensively written, zero dependencies on purpose. Big single file rather than a build pipeline, because userscripts ship as one file anyway.

## 2. How To Run It

There is **no build, no install, no test runner, no package manager**. It is one `.js` file.

- **Setup once:** Install Tampermonkey or Violentmonkey in the browser. Nothing else.
- **Run dev:** Open the file in the userscript manager's editor, paste, save, reload google.com or youtube.com. Press `Alt+S` for the settings panel.
- **Build / deploy:** Copy the file's contents into the Greasy Fork editor at https://greasyfork.org/en/scripts/568928. The `@downloadURL` / `@updateURL` (lines 214–215) already point there, so users auto-update from Greasy Fork — **not** from this repo.
- **Required env vars:** none. No secrets, no API keys.

### How to actually test a change

There is no test file in the repo, but the working method is a headless-Chromium harness — it found six real bugs that reading the code did not:

```js
// node, with playwright available
await ctx.addInitScript(userscriptSource);   // simulates @run-at document-start
await ctx.route('**/*', r => r.fulfill({ body: stubHtml }));
await page.goto('https://www.youtube.com/watch?v=test&si=TRACKME');
// then: assert zero pageerror/console-error, and probe the DOM
```

Route-fulfilling a stub page at the real hostname is the trick — the script gates almost everything on `location.hostname` (`ENV`, line 346), so a `data:` or `localhost` page exercises none of it.

## 3. Tech Stack

- **Language + runtime:** Plain ES2020 JavaScript running in the browser. No transpiler, no TypeScript, no `.nvmrc` — nothing in this repo is a Node project.
- **Framework / key libraries:** None. Zero dependencies is deliberate (`@grant none`, no `@require`).
- **What kind of project:** Userscript (Tampermonkey / Violentmonkey / Greasemonkey). Single file, 3,571 lines.
- **External services:** Exactly one, and it's opt-in: `sponsor.ajay.app` (SponsorBlock), off by default. Uses the hash-prefix endpoint, so only 4 hex characters of `SHA-256(videoId)` leave the browser.
- **Key metadata** (lines 5–10): `@version 4.0.0` · `@license MIT` · `@run-at document-start` · `@grant none` · `@noframes` · 199 `@match` lines (every Google ccTLD plus youtube.com, youtube-nocookie.com, music.youtube.com).

## 4. Code Map (The Important Files Only)

The repo holds several unrelated userscripts. This folder is self-contained.

- `google-privacy-youtube-suite/Google Privacy & YouTube Enhancement Suite.js` — **the entire project.** Open this first. The header comment block (lines 218–332) documents the layer architecture and the full changelog; read that before the code.
- `google-privacy-youtube-suite/README.md` — human-facing feature guide and keyboard shortcuts.
- `../index.html` — a standalone "Userscript Hub" registry page listing curated userscripts. **Conflict:** its entry at `index.html:737` labels script ID 568928 as "Don't Track Me Google", but 568928 is *this* suite (see `@downloadURL`, line 214). The registry is stale, the metadata block is right.
- `../senior-userscript-engineer.md` — the system prompt the author uses when generating userscripts. Useful for matching house style.

### Landmarks inside the one big file

| Line | What lives there |
|---|---|
| 1–215 | `==UserScript==` metadata. 199 `@match` lines — long, but do not "tidy" it |
| 218–332 | Architecture + changelog doc block. The real design doc |
| 359 | `SETTINGS_KEY` and the 37-key `DEFAULT_SETTINGS` object |
| 446 | `registerLayer()` — the defence-in-depth wrapper everything routes through |
| 469 | `YT_HOOKS` — bridge letting the top-level settings panel call into the YouTube closure |
| 489 | `_appendToHead()` — queues DOM appends until a root exists |
| 786 | `storeGet` / `storeSet` / `prune` — namespaced localStorage with size + age caps |
| 864 | `createSettingsPanel()` — built with DOM APIs, never `innerHTML` |
| 1427 | Module 11b: universal link cleaner (privacy layers P0–P2) |
| 1543 | Module 12: Google search blocklist |
| 1719 | Module 1: Google anti-track (the *Don't Track Me Google* port) |
| 2025 | Start of the YouTube closure — everything YouTube-side is scoped inside it |
| 2028 | **Ad Layer 0** — JSON/fetch/XHR/bootstrap ad-payload stripping |
| 2612 | Ad Layers 1–5 (CSS, DOM sweep, player observer, poll, nag removal) |
| 2750 | Module 13: study notes |
| 2930 | Module 16: feed hygiene |
| 3251 | `startAllYTSystems()` — the YouTube entry point |
| 3386 | Module 5: age restriction bypass |

### localStorage keys it owns

`__pyt_suite_settings__` (settings) · `__pyt_notes` · `__pyt_resume` · `__pyt_speeds` · `__pyt_daily`

All map-shaped stores go through `prune()` (line 851) with a max-entry and max-age cap, so they can't grow unbounded.

## 5. Rules For Editing This Code

- **Zero dependencies. Keep `@grant none`.** This is not a style preference — it is load-bearing. `@grant none` runs the script in *page context*, which is the only way Module 1's link interception and Module 5's `JSON.parse` / `window.ytcfg` hooks can see the page's own objects. Adding any `@grant` moves the script into Tampermonkey's sandbox and silently breaks both.
- **Never use `innerHTML` for anything user-controlled.** The settings panel is built with `_el()` / `document.createElement` throughout (line 870). The only `innerHTML` in the file is a hardcoded SVG constant.
- **Every new protection is a layer, not a replacement.** Wrap it in `registerLayer(group, name, fn)` so a failure is recorded rather than thrown into the page. Never let one layer call another.
- **New settings need four edits:** the `DEFAULT_SETTINGS` object, a control in `createSettingsPanel()`, a read in `saveAndCloseSettings()` (line 1132), and — if it applies without a reload — an entry in `YT_HOOKS`. Forgetting the third is silent.
- **YouTube-side code lives inside the closure at line 2025.** Top-level code (the settings panel) cannot see it. Do not "fix" this with `typeof someYtFn === 'function'` — that is always false from the top level and was a real bug. Publish through `YT_HOOKS` instead.
- **Assume nothing exists at document-start.** `document.head`, `document.body`, even `document.documentElement` may be null. Use `_appendToHead()`; guard every `MutationObserver.observe()`.
- **Declare before you call.** The file uses `let`/`const` at module scope; a call placed above a declaration is a TDZ crash, not a harmless `undefined`. See §6.
- **Comment *why*, not *what*.** The file's density of "this looks wrong but here's the browser quirk" comments is the point. Match it.

## 6. Fragile Bits & Landmines

### The `JSON.parse` hook chain — order is load-bearing
Two modules hook `JSON.parse`. Layer 0 (line 2036) installs first and captures the native. Module 5 (line 3420) installs later and captures *Layer 0's* hook as its "native". The result chains correctly:

```
JSON.parse → Module 5 (age unlock) → Layer 0 (ad strip) → native
```

**Move either module and one of them stops running.** Layer 0 must stay above Module 5 in file order.

### Hard-won fixes — do not "simplify" these

- **`forceNoReferrer` declared before `setupAggresiveUglyLinkPreventer()` is called** (line 1730). A previous `var`→`let` refactor put the read above the declaration. Under `var` it hoisted to `undefined` (falsy, harmless); under `let` it threw a ReferenceError that `_safeRun` swallowed — so the entire Google anti-tracking module was dead on every Google page with no visible symptom. If you reorder this block, re-verify on a real google.com search.
- **`shortsUrlToWatch()`** (line 2232) parses the URL properly instead of `href.replace('/shorts/','/watch?v=')`. The old string replace produced `/watch?v=ID?feature=share` for any Shorts link carrying a query — an unloadable video id.
- **`stripAds()` uses a `WeakSet` cycle guard** (line 2072). YouTube's response graphs contain cycles; without it the recursion never returns.
- **`stripAds()` splices ad entries out of arrays rather than nulling them.** A null hole in a feed array makes the renderer throw.
- **Ad entries are removed *with their feed wrapper*.** Removing only the inner `ytd-ad-slot-renderer` leaves an empty grid cell.
- **`textHasAds()` string pre-check before parsing.** Walking a 3 MB response object costs far more than scanning the raw text once; most responses have no ads.
- **Feed filter caches a title+channel signature, not a boolean flag** (`data-pyt-sig`, in `filterFeed`, line 2965). YouTube recycles renderer elements across navigations, so a plain "already checked" flag leaves a recycled card wrongly hidden.
- **Nag removal matches dialog *wording*, not class names** (`NAG_PHRASES`, line 2655). Anti-adblock class names rotate constantly; the wording rarely does.
- **Skip-button lookup falls back to visible label text** (`findSkipButton`, line 2707), covering class renames and non-English UIs.

### Works, but be careful

- **Module 5 (age bypass, line 3386)** is a minified third-party port with mangled identifiers (`attach$1`…`attach$4`, `_c1`, `_or`). It is effectively read-only. Update it by re-porting upstream, not by editing in place.
- **Module 2 (old-style UI)** is a large block of `EXPFLAGS` experiment toggles. Individually meaningless; collectively they revert the layout. Don't prune ones that "look unused".
- **The 199 `@match` lines** look like bloat. They are every Google ccTLD. Trimming them silently disables the script for users on `google.co.ma`, `google.de`, etc.

### Known limitation, not a bug
**Settings do not sync across origins.** `localStorage` is per-origin, so google.com, google.co.uk and youtube.com each keep their own copy. Fixing it "properly" would require `GM_setValue`, which requires `@grant`, which breaks page context (§5). The Copy/Paste settings buttons are the accepted workaround.

## 7. Current State

- **Last shipped:** v4.0.0 (commit `7da8de7`, PR #19). Rebuilt around layered defence; added the learning modules; fixed six bugs including the dead Google anti-tracking module and the settings panel being unable to re-apply anything on YouTube.
- **Working on now:** Documentation — moving the script into its own folder with this file and a human README.
- **Next up:**
  1. Publish v4.0.0 to Greasy Fork (script 568928) so existing installs get it.
  2. Fix `index.html:737`, which still labels 568928 as "Don't Track Me Google".
  3. Consider committing the Playwright harness from §2 as a real test file — it is currently recreated ad hoc each time.

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

No `package.json`, no lockfile, no `tsconfig.json`, no `Dockerfile`, no `.env.example`, no `.nvmrc`, no `.github/workflows/`, no `LICENSE` file (MIT is declared in the userscript header only), no `dependabot.yml`, no test suite. None of these are missing pieces — a single-file userscript needs none of them. Do not add a build pipeline without a specific reason.
