# Google Privacy & YouTube Enhancement Suite

**A single userscript that makes Google and YouTube behave like tools instead of slot machines.**

It strips Google's click tracking, cleans tracking junk out of URLs, blocks YouTube ads in six independent ways, kills Shorts, and adds a small set of study features — timestamped notes, resume playback, per-channel speed memory, a session timer.

- **Version:** 4.0.0
- **License:** MIT
- **Greasy Fork:** https://greasyfork.org/en/scripts/568928
- **Dependencies:** none. One file, no build step, no `@require`, no npm.

---

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox) or [Violentmonkey](https://violentmonkey.github.io/).
2. Open [`Google Privacy & YouTube Enhancement Suite.js`](./Google%20Privacy%20%26%20YouTube%20Enhancement%20Suite.js), click **Raw**, and your userscript manager will offer to install it.
3. Open Google or YouTube and press **`Alt+S`** (or click the ⚙ button, bottom-right) to open settings.

> Installing from Greasy Fork instead gets you auto-updates. Installing from this repo does not — the `@downloadURL` still points at Greasy Fork, so a raw install will silently update itself to the published version.

---

## Why it's built in layers

Google and YouTube rename CSS classes, reshape the DOM, and change response formats constantly. Any single ad-blocking or tracker-stripping technique **will** break — usually quietly.

So nothing here relies on one trick. Each protection runs as several **independent** layers. None calls another. If one breaks, the rest keep working, and the broken one is recorded rather than silently swallowed.

### Ad blocking — 6 layers

| Layer | How it works | Breaks when… |
|---|---|---|
| **L0 · API** | Deletes ad payloads from YouTube's JSON before any renderer sees them — hooks `JSON.parse`, `fetch`, `XHR`, and the inline bootstrap data | YouTube renames its ad field keys |
| **L1 · CSS** | Static selectors hide anything that still renders | Element names change |
| **L2 · DOM** | Removes ad renderers *and their feed wrappers* (an ad card still occupies a grid cell otherwise) | Element names change |
| **L3 · Player** | Watches the player's `class` attribute — reacts the instant `ad-showing` appears | Player markup is rebuilt |
| **L4 · Poll** | Adaptive tick, 500 ms → 2 s. Last resort | Almost never |
| **L5 · Nag** | Removes anti-adblock dialogs, matched by their **wording**, not their class | Wording changes language you don't have |

When L0 works, layers 1–5 have nothing left to do.

### Privacy — 4 layers

| Layer | How it works |
|---|---|
| **P0** | Intercepts a redirect page *before it loads* (`google.com/url?q=`, `youtube.com/redirect?q=`, `l.facebook.com/l.php?u=`) so the interstitial never learns you clicked |
| **P1** | Strips tracking parameters from the address bar (`utm_*`, `fbclid`, `gclid`, `si`, `ved`, `ei`, ~40 more) |
| **P2** | Rewrites links in the page as they appear — unwraps redirects, strips params, removes `ping` beacons |
| **P3** | The deep Google-specific rewriting from *Don't Track Me Google* — referrer policy, `data-ved`, `onmousedown` handlers |

### Shorts — 3 layers

**S1** redirects a Shorts URL you already landed on · **S2** rewrites Shorts links *before* you click them, so the Shorts player never loads · **S3** hides shelves, tiles and sidebar entries with CSS.

You can see all layers live: open settings → **Diagnostics**.

---

## Features

### Google

| Feature | What it does |
|---|---|
| **Anti-tracking** | Real URLs in search results, no redirect hop, no `ping` beacons |
| **Web-only results** | Forces `udm=14` — plain blue links, no AI Overview, no carousels, no People-Also-Ask |
| **URL cleaner** | Whitelist approach: keeps `q`, `tbm`, `tbs`, `hl`, `gl`… strips everything else |
| **Endless scroll** | Auto-loads the next page. Capped (default 5 pages) and stops if Google rate-limits you |
| **Site blocklist** | Hide domains from results, uBlacklist-style. Presets for social media and content farms |
| **Region setter** | Force a country code for Google and YouTube |

### YouTube — cleanup

| Feature | What it does |
|---|---|
| **Ad blocking** | Six layers (above): skip, mute, blur, 16× speed-up, DOM removal, payload stripping |
| **SponsorBlock Lite** | Skips sponsor reads and intros. **Off by default.** Only a 4-character hash prefix of the video id ever leaves your browser — the API cannot learn what you watch |
| **Anti-Shorts** | Three layers (above) |
| **Age bypass** | Watch age-restricted videos without signing in |
| **Old-style UI** | Reverts rounded corners and the post-2022 layout |
| **5-column grid** | Denser home and subscriptions feeds (3–6 configurable) |
| **Hover previews off** | Thumbnails stop auto-playing |

### YouTube — focus

| Feature | What it does |
|---|---|
| **Keyword blocklist** | Hide any feed video whose title contains a word you list |
| **Channel blocklist** | Hide videos from named channels or `@handles` |
| **Hide watched** | Drops anything over 90 % watched out of your feeds |
| **Home → Subscriptions** | Skips the algorithmic feed entirely |
| **Hide Playables** | Removes the in-feed games shelf |
| **Hide AI features** | Removes the "Ask" button and AI video summaries |
| **Disable ambient mode** | Kills the glow behind the player (saves GPU too) |
| **Disable autoplay-next** | No auto-advance, no end cards. **On by default** — deliberate anti-rabbit-hole choice |
| **Focus mode** | Hides sidebar, comments and end cards on the watch page |

### YouTube — studying

| Feature | What it does |
|---|---|
| **Timestamped notes** | `Alt+N` pauses, asks for a note, pins it to the current second. Export the lot as Markdown with clickable timestamp links |
| **Resume playback** | Reopens a lecture where you left off (videos over 2 min, only if you're near the start, never if you'd already finished) |
| **Speed memory** | Remembers playback speed **per channel** — one lecturer at 1.5×, another at 1× |
| **A-B loop** | `Alt+[` / `Alt+]` to loop a passage; for a proof you need three times or a phrase you can't catch |
| **Session timer** | Set a limit; a HUD shows session and daily totals and pauses playback when you hit it. Counts only time actually playing in a visible tab |
| **Remaining time** | Time left, adjusted for playback rate |
| **Reading fonts** | Serif, dyslexia-friendly, Papyrus, or system — with a size control |

---

## Keyboard shortcuts

### Everywhere

| Key | Action |
|---|---|
| `Alt+S` or `Ctrl+?` | Open settings |
| `Alt+P` | Cycle reading font (off → papyrus → serif → dyslexic → system) |
| `Esc` | Close settings |

### YouTube only

| Key | Action |
|---|---|
| `Alt+N` | Add a note at the current timestamp |
| `Alt+Shift+N` | Copy this video's notes as Markdown |
| `Alt+[` | Set A-B loop start |
| `Alt+]` | Set A-B loop end |
| `Alt+\` | Clear the loop |
| `Alt+T` | Toggle the transcript panel |
| `Alt+0` | Restart the video from the beginning |
| `Alt+R` | Reset the study session timer |
| `Alt+F` | Toggle focus mode |
| `Alt+1` … `Alt+4` | Playback speed presets |

---

## Settings that need a page reload

Most settings apply the moment you hit **Save & Close**. These three are baked into a stylesheet built once at page load, so they need a refresh:

- Grid columns
- Hover preview blocking
- Hide Shorts (the CSS layer — the redirect layers still apply immediately)

---

## Notes and gotchas

**Settings don't sync between google.com and youtube.com.** `localStorage` is per-origin, and so is `google.com` vs `google.co.uk`. Use **Copy settings** / **Paste settings** at the bottom of the panel to move them across. This isn't laziness: switching to `GM_setValue` would move the whole script into Tampermonkey's sandbox and break the page-context hooks the anti-tracking and age-bypass modules depend on.

**SponsorBlock is off by default** because it's the only feature that talks to a third party at all. When you turn it on, the request carries four hex characters of `SHA-256(videoId)` — enough for the server to return a bucket of candidate videos, not enough for it to know which one is yours.

**Autoplay-next defaults to off.** If you liked auto-advancing playlists, turn it back on under **Playback**.

**Papyrus is no longer forced on.** v3 shipped with it on by default across every Google and YouTube page. It's now one option in a font picker, and the default is off.

**Something broken?** Open settings → **Diagnostics**. Every layer reports `ok`, `idle`, or `error` with a count. A layer showing `error` tells you exactly which technique the site broke; the others are still covering for it.

---

## What's deliberately *not* here

Some YouTube ad blockers run a "contract retry" loop: they inject markers into the `ytcfg` user-agent string, watch for playback failures, and force-reload the player. This suite doesn't. That machinery mutates innertube request identity and fights the age-bypass module's own innertube calls, breaking age-restricted playback. The six ad layers cover the same ads without touching request identity.

---

## Credit

Built on work from the userscript community — *Don't Track Me Google*, *Simple YouTube Age Restriction Bypass*, *YouTube Non-Rounded Design*, *Endless Google*, *YouTube and Google region setter*, plus techniques studied from *youtube-adb*, *YouTube Ads-Bypass*, *YouBlock*, and *General URL Cleaner Revived*.

See [`CONTEXT.md`](./CONTEXT.md) if you're an AI assistant picking this up cold, or a human who needs the architecture rather than the feature list.
