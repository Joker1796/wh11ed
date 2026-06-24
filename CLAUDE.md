# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run deploy   # build + upload to the Yandex Object Storage bucket (see Deployment)
npm run images:webp  # convert new illustration jpg/png in public/images/ to WebP (see Image organization)
npm run icons        # regenerate PWA / home-screen icons from the "W" mark (see PWA)
```

No linter configured. **Tests:** Vitest (`npm test` = `vitest run`, `npm run test:watch`), config in `vitest.config.js` (jsdom env, `src/test-setup.js` installs a clean in-memory localStorage). Specs live next to source as `src/**/*.test.js` and focus on the tracker: pure scoring/BP/winner logic (`gameScoring.test.js`), pure tracker helpers (`useTracker.helpers.test.js`), the module-singleton store with `vi.resetModules()` between cases (`useTracker.store.test.js`), and components via `@vue/test-utils` (`ScoreBoard`/`GameSetup`/`modals`). Test files are not imported by the app, so they never reach the build/precache.

## Architecture

Vue 3 SPA using hash-based routing (`createWebHashHistory`). No backend. All content is static JS data files.

**Navigation model:** Two levels.

- **Top navbar** (`App.vue`) — three sections: "Core Rules", "Event Companion", and "Tracker". `isEventRoute` (path starts with `/event-companion`) and `isTrackerRoute` (starts with `/tracker`) switch which subnav renders.
- **Subnav** (sticky bar below navbar) — for Core Rules: route links (Introduction / Basic Rules / Battle Round / Battlefields / Advanced / Reference). For Event Companion: Introduction / Sequence / Missions / Terrain & Layouts / Pairings / FAQs. For Tracker: Game Tracker / Current Game.
- `router/index.js` exports `navGroups`/`navGroupsRu` (Core), `eventGroups`/`eventGroupsRu` (Event), **and** `trackerGroups`/`trackerGroupsRu` (Tracker); `NavSidebar.vue` renders all three as labelled mobile sections.
- **Mobile** (≤900px): the navbar links + subnav are hidden; a hamburger opens `NavSidebar.vue` (the drawer, for in-section navigation) and a fixed **bottom nav** in `App.vue` with icons: Core Rules / Event Companion / **Missions** (`/event-companion/missions`) / Tracker. The bottom nav uses its own short RU labels (`navCoreRulesShort` «Правила», `navEventShort` «Путеводитель`) so they fit; the top navbar keeps the full names. `isMissionsRoute` highlights the Missions item (Event Companion stays active for the other `/event-companion/*` routes).

**Data → View pipeline:**

```
src/data/*.js  →  src/views/*View.vue  →  src/components/RuleBlock.vue
```

Each view imports its data file, iterates sections/subsections, and renders them via `RuleBlock` (the universal rule renderer). Views handle special cases themselves (e.g. `BattlefieldsView` renders stratagem cards; `BasicRulesView` renders wound table, illustrations, definitions).

**Data file shapes — all bilingual `{ en: Section[], ru: Section[] }`:**

- `basicRules.js` — EN and RU arrays merged by index at runtime in `BasicRulesView`.
- `battleRound.js`, `battlefields.js`, `advancedRules.js` — same bilingual shape; views merge EN/RU the same way.
- `reference.js` — exports `abilityIntro`, `coreAbilities`, `appendix`, `faqs`; each is `{ en: [...], ru: [...] }`. `coreAbilities` is the lookup table for `KeywordPopover`.
- `intro.js` — the welcome/intro page; shape is `{ en: {...}, ru: {...} }` (a single object, **not** an array). Rendered by `HomeView.vue`.
- `eventCompanion.js` — the Event Companion section (`{ en, ru }`, single objects). Exports `getEventContent(locale)` which deep-merges `ru` over `en` by index/key (RU carries only translated fields; ids/images, mission-deck card names, and disposition/legend `icon` paths inherit from EN). Prose pages render via `RuleBlock`; `src/views/event/` holds the views. The `glossary[]` feeds `KeywordPopover` for event terms; within-section links use `EC:<key>` tokens resolved by `useRefNavigation.js`.
  - **Missions catalogue:** `EventMissionsView.vue` (`/event-companion/missions`) browses all 25 primary (grouped by the 5 Force Dispositions) + 18 secondary missions, rendered from the tracker's mission data via `getMissions(locale)` (in `missions.js`) and a read-only `MissionCard.vue` (styled like the tracker `ScoringModal` rows). Has a filter bar: type (All / Primary / Secondary / **Twists**) + Force Disposition chips (primary only). Attacker/Defender secondary pools are identical, so it lists the 18 once. The **Twists** filter shows the 6 optional pre-game modifiers (`eventCompanion.js` `twists`, rendered by `TwistCard.vue`); they're also selectable in the Game Tracker setup.
  - **Terrain & Layouts (one page):** `EventLayoutsView.vue` (`/event-companion/layouts`) = terrain prose + footprints `DataTable` + the collapsible **LAYOUTS KEY** legend (show/hide persisted to `localStorage` key `wh11ed-event-key-hidden`) + the interactive 5×5 `MissionMatrix.vue` + matchup viewer (`LayoutCard.vue`). (The former separate `/event-companion/matrix` page was merged in here.)
  - **Data shapes:** `dispositions[]` = the 5 Force Dispositions (`{ id, name, icon }`); `matchups[]` (15, generated) each carry `layouts:[{id:'A'|'B'|'C', image, edge:'h'|'v'}]` resolved from the `layoutImages`/`layoutEdges` lookups keyed by `${a}|${b}`; `terrain.legend[]` = the LAYOUTS KEY entries (`{ id, label, desc, icon }`, grouped in the view by id into terrain / zones / edges / objectives).
  - **Edge bars per layout:** `LayoutCard` draws the attacker (red ✕) / defender (blue shield) battlefield-edge bars on the sides given by `layout.edge` — `'h'` = top/bottom (`marker-{attacker,defender}.webp`), `'v'` = left/right (`marker-{attacker,defender}-v.webp`). The `edge` orientation per layout was read from the source PDF's vector marker lines (red line = attacker edge, blue = defender) for all 45 layouts; gutters are equal in both orientations so the image size doesn't jump across A/B/C tabs.
  - **Assets** (`public/images/event/`) are all extracted from the source PDF: 45 layout diagrams `layout-<a>-<b>-<letter>`, the `marker-attacker`/`marker-defender` edge bars, `legend-*` key icons, and `dispo-*` disposition emblems. On disk these are now **WebP** (see Image organization) though the data still references them by their `.jpg`/`.png` paths. The matrix is text-only on desktop and icon-only on mobile (fits without horizontal scroll).

Locale is a singleton (`useLocale.js`, `'en' | 'ru'`, persisted to localStorage); views pick `ru[i]` over `en[i]` via the merge pattern and inherit non-translated fields (`id`, `image`, `illustration`, `definitions`) from EN.

A `Section` has `{ id, num, title, page, description, subsections[] }`. A subsection has `{ id, sectionNum, title, body, note?, example?, seeAlso?, sideImage?, illustration?, image?, definitions?, isGroupLabel?, renderAfterStratagems? }`.

**`body` string markup** (parsed by `RuleBlock.vue` into typed blocks):

| Prefix | Block type | Renders as |
|--------|-----------|------------|
| `◈ LABEL \| content` | `info-card` | labeled grid rows (move/shoot/fight type cards) |
| `▪ text` | `ul` | bullet list |
| `1. text` | `ol` | ordered list |
| `→ text` | `flow` | flow-arrow list |
| `◆ cond → outcome` | `result-table` | pass/fail colored rows |
| `### text` | `h4` | subheading |
| `[img:/images/path.png]` | `img` / `img-group` | inline image(s) |
| plain text | `p` | paragraph |

`▪` lines within an `info-card` block are appended as `items[]` to the last card row. `→` lines break out of `info-card` mode — use `▪` for sub-items within info-card rows.

**`useRenderInline.js`** processes inline markup in all text fields: `**bold**`, `__underline__`, `[KEYWORD]` → `.keyword` span (triggers `KeywordPopover`), `(NN.NN)` / `(NN)` → `.cross-ref` span (triggers scroll navigation), `{red/blue/green:TEXT}` → colored strong, `[def:id:label]` → clickable definition, `Unmodified N` → dice icon.

**Special subsection types:**

- `sectionNum: ''` — renders as `SectionTocBlock` (chapter TOC intro), not a `RuleBlock`
- `isGroupLabel: true` — renders as `GroupLabelBlock` (sub-group header)
- `renderAfterStratagems: true` — in `BattlefieldsView`, renders after the stratagem card grid (used for Snap Shooting 15.09)

**Cross-references** (`seeAlso: ['Rule Name NN.NN']`) are resolved by `useRefNavigation.js` and rendered by `SeeAlsoBlock`. Click navigates to `#section-NN-NN`.

**Search** (`Ctrl+K`) — `useSearch.js` builds a flat index at import time from all data files. Searches `title`, `sectionNum`, `body`, `note` fields.

**Keyword popover** — `useKeywordPopover.js` is a singleton; any click on `.keyword` span opens `KeywordPopover.vue` with the ability text looked up from `reference.js` (`coreAbilities`).

**Stratagem cards** — `StratCard.vue` renders core rulebook stratagems in `BattlefieldsView` (section 15).

## Bilingual content conventions

The data is the bulk of the repo and the EN/RU arrays are edited in lockstep. When touching `body`/`note`/`example` text:

- **Glosses:** RU game terms carry the English original in parens — `РУС (ENG)`, e.g. `критическому ранению (critical wound)`, `ТЕХНИКИ (VEHICLE)`. ALL-CAPS keywords stay unbolded (the renderer bolds them); other terms use `**рус** (eng)`. `[BRACKET]` ability names stay English (KeywordPopover lookup). The paired EN subsection (same `id`/`sectionNum`) is the source of truth for the English term.
- **Bold (`**…**`):** game terms are emphasized wherever the official PDF emphasizes them, in **both** languages. Do not bold things the renderer already bolds (ALL-CAPS keywords, `◈ LABEL |` info-card labels) or anything inside `seeAlso` refs / image paths. `### h4` headings render through `renderInline` too, so inline markup (`**bold**`, `[KEYWORD]`, cross-refs) works there — `**…**` adds emphasis on top of the heading's own (CSS) weight; only use it where the PDF emphasizes a term within the heading.
- **EN↔RU structural parity:** the per-section counts of block markers (`▪ ◈ → ### ◆ [img:]`) must match between `en` and `ru`. After bulk edits, verify: `**` is balanced (even, no `****`), parity holds, and `npm run build` passes.

The source rulebook PDF lives in `sources/` (gitignored). Extract text with `pdftotext -layout`, and bold runs with `pdftohtml -s -i -noframes -hidden <pdf> out.html` (yields `<b>` tags).

**Image/vector extraction (Event Companion assets)** uses **pymupdf** (`pip install pymupdf`) against `sources/eng_12-06_warhammer40000_event_companion-*.pdf`. Layout pages are printed pp. 9–53 = page indices 8–52. Techniques used: layout diagrams cropped to the battlefield-frame rect `fitz.Rect(128, 277.8, 468.1, 740.2)`; transparent vector elements (edge-marker bars, objective/legend icons) via `page.add_redact_annot(bbox)` + `apply_redactions(images=PDF_REDACT_IMAGE_REMOVE, graphics=PDF_REDACT_LINE_ART_NONE)` then `get_pixmap(..., alpha=True)` (strips the raster parchment background, keeps the vector); disposition emblems are raster XObjects with soft masks, extracted by combining `fitz.Pixmap(doc, xref)` (CMYK→RGB) with `fitz.Pixmap(doc, smask)` for transparency.

## Game Tracker

Third top-level section (`/tracker`) — a client-side, offline 2-player VP tracker for a game of 40k 11th ed. **Not part of the rules-reference data pipeline above.** Alpha (red banner via `AlphaBanner.vue`).

**State:** `src/composables/useTracker.js` — a module-singleton store (same pattern as `useLocale`) persisted to localStorage under `wh11ed-tracker-current` (active game) and `wh11ed-tracker-history` (finished games), via deep `watch`. A game = `{ id, phase: 'setup'|'playing'|'finished', currentRound, settings:{trackCP,firstTurn,layout:'A'|'B'|'C',battleSize:'incursion'|'strikeForce',twist,twistMission}, players:[P,P] }`. `battleSize` (rule 25.03) sets the setup DP budget (`BATTLE_SIZES` in `useTracker.js`: Incursion 2 DP / Strike Force 3 DP); `twist`/`twistMission` are the optional pre-game Twist (see below). Player = `{ name, factionSlug, detachments[], disposition, role, secondaryMode:'tactical'|'fixed', battleReady, primarySlug, cp, rounds:[{primary, picks{'bi:ri':count}}×5], secondary:{deck,hand,drawn{slug→round},discarded:[{slug,round}],scored:[{slug,round,picks,vp}]} }`.

**Setup is a four-step wizard** (`GameSetup.vue`, internal `step` ref): step 1 "Armies" (battle size, then per-player name + faction + detachments + **attacker/defender role** + battle ready); step 2 "Mission" (active disposition, secondary mode + fixed picks, full primary `MissionCard`); step 3 "Battlefield" (recommended layout A/B/C via `LayoutCard`); step 4 "Deployment" (who goes first, Track CP, and the twist). The step indicator collapses to a compact "N / 4" on phones (`≤560px`). The two players are labelled **"You" / "Opponent"** (`trackerYou`/`trackerOpponent`) throughout the tracker (also the empty-name fallback in `RoundTracker`/`ScoreBoard`/`ScoreBreakdown`/history); player 1's name pre-fills from the most recent finished game (editable). The chosen `settings.layout` is shown next to the round label in `RoundTracker`. Parent contract unchanged (`@start`/`@cancel`).

The **twist** is chosen on step 4 via a "Choose twist" button that opens `TwistPickerModal.vue` — a full-screen (bottom-sheet on mobile) accordion list of the twist rules with per-twist "Select" + a "Random twist" button; picking one returns to step 4. Mirrored World's shared-mission sub-picker stays inline on step 4.

**Setup is persisted as a draft** (`setupDraft` in `useTracker.js`, localStorage `wh11ed-tracker-setup-draft`, same auto-save machinery as `current`/`history`): the in-progress wizard (step + players + settings) survives reloads and navigating away. The Tracker home shows a **"Continue setup"** button when a draft exists; "New game" clears the draft and starts fresh; `start()`/cancel clear it. GameSetup hydrates from the draft at init (before its reset watchers register) and deep-watches its state back into the draft.

**Scoring** is by *condition*, not free entry: each mission block row is scored via `ScoringModal.vue` (a count stepper for "For each…" rows, a checkbox otherwise); `picks` store per-row counts keyed `blockIdx:rowIdx`, and VP = Σ count·rowVP. Caps: primary **15/round**, **50/game**; fixed secondary **20** each; secondary **40** total; Battle Ready **+10**. `scorableBlocks(slug, role, round, locale)` round-gates blocks by their English heading (`BLOCK_ROUNDS`) — e.g. "Second Battle Round Onwards"/"End of Battle" aren't scorable in round 1 — and derives the per-each flag from the **English** text (display text is localized). Lookup/logic always read `missions.en` (slug/VP/structure are language-agnostic); `missionBySlug(slug, role, locale)` overlays `missionsRu.js` text for display only. **`or` brackets are mutually exclusive:** setting one bracket row clears the competing rows in its group (`orSiblingKeys` in `setPrimaryRow`/`scoreSecondaryRow`); per-tally "For each…/Each time…" `or` rows stay independent (and don't show the "Or" label).

**Tactical secondaries** (`SecondaryDeck.vue`): random "Draw card", **"Choose"** a specific card from a picker modal, and a per-card "⋯" actions modal — *Set aside* (`discardFromHand`, keeps VP) or *Return to deck* (`returnSecondaryToDeck`, full undo: drops the card's VP, redrawable). `drawSpecificSecondary`/`returnSecondaryToDeck` live in `useTracker.js`. Fixed mode is locked at setup.

**Data:** `src/data/missions.js` (`{ en, ru:en }`, 25 primary + 36 secondary; primary auto-selected by the two players' dispositions via `primaryFor`; also exports `getMissions(locale)` for the Event Companion Missions page); `src/data/missionsRu.js` (RU overlay of block text — **mission names & dispositions stay English**); detachments/factions from `src/data/mfmFactions.js`. The mission rules themselves are published only as card images, so `missions.js` was vision-transcribed (see `scripts/fetch-mission-cards.py`); MFM points data is scraped by `scripts/scrape-mfm.py`.

**Files:** views `src/views/tracker/{TrackerHomeView,TrackerGameView}.vue`; components `src/components/tracker/{GameSetup,RoundTracker,SecondaryDeck,ScoringModal,ScoreBoard,ScoreBreakdown,NumberStepper,AlphaBanner}.vue`. The finished screen shows score boxes + a collapsible GDM-style per-round breakdown grid (`ScoreBreakdown.vue`). Out of scope: Deployment Zones.

**Twists** (optional pre-game modifiers, rule data in `eventCompanion.js` `twists` and browsable on the Missions page — see Event Companion) are selectable in setup step 2 (pick / **Random** / **No Twist**). The chosen `settings.twist` applies to both players for the whole game and is shown as a collapsible reminder in `RoundTracker`. Two twists change the Primary Mission **mechanically** via `derivePrimary(myDisp, oppDisp, settings)` (the single primary-derivation point, used by both `makePlayer` and the setup preview): **Scrambled Communications** swaps the two players' primaries; **Mirrored World** sets both players to one shared mission from `MIRROR_MISSIONS` (the five `mirror:true` primaries) — chosen in setup or randomly resolved in `newGame` (persisted to `settings.twistMission`).

**RU-locale terms in the tracker stay English on purpose:** mission names, **Force Disposition**, "Battle Ready", "Attacker"/"Defender", "CP" — only mission *rules text* is translated. (Note: in the core rules RU, **Charge** is translated as «нападение» — "Фаза нападения"; **Surge** keeps «рывок».)

**Command Point / CP** (glossary: `sources/Vse_pamyatki_i_glossarii_po_vakhe.docx`) — in the **rules** RU text, full mentions read «командное очко (CP)» / «командные очки (CP)» (English kept in parens); inline costs/numbers stay English («1 CP», «+1 CP»). The tracker/`ui.js` keep bare «CP» (see above).

## Adding content

**New core-rules section:** Add data to the appropriate file in `src/data/` following the `Section` shape. The search index updates automatically. If it's a new top-level nav group: add to `navGroups`/`navGroupsRu` in `src/router/index.js`, add a route, create a view.

## Image organization

`public/images/` has one folder per rules chapter (`intro`, `moving`, `coherency`, `visibility`, `command`, `turn`, `attack`, `charge`, `fight`, `terrain`, `monsters`, `attached`, `surge`, `fire`, `shoot`). Image markup references them as `[img:/images/<folder>/<name>.png|alt]`. RU variants use a `-ru` suffix on the filename (e.g. `making-a-charge-move-ru.png`).

**The `-ru` suffix is applied at RUNTIME** for section `image`/`sideImage`/`illustration` — `BasicRulesView`/`AdvancedRulesView`/`BattlefieldsView` rewrite the src in the RU locale (`ruSrc`/`.replace('.png','-ru.png')`). So the data holds the BASE path and the `-ru.webp` files won't show up in a static grep — **don't "clean up" `-ru` images as unused.** (Body `[img:]` images instead carry explicit `-ru` paths in the RU data.)

**Battle-round phase banners (`turn/<slug>-banner-ru.webp`):** full-width RU phase plates (number + icon + title + description) shown stacked in the Battle Round «Turn Structure» block (07.02, RU only). Extracted from the core-rules PDF page 29 (blank plates in `sources/*-banner-blank.png`), translated with **Saar SP Demo** (`sources/fonts/`, narrow display font — has Cyrillic, no digits) via pymupdf+sharp; the cut bottom-right corner is made transparent. `RuleBlock`'s `.img-group` is a flex column with `gap` (the `<img>`s are flex items because `AppImage`'s `<picture>` is `display:contents`; an `img + img` margin would NOT work). EN keeps the small phase icons.

**Illustrations are stored as WebP** (for the app-like build). The data files and components still reference the original `.jpg`/`.png` paths — the `AppImage` component (`src/components/AppImage.vue`) maps the extension to WebP at render time, serving `<name>.webp` on desktop and an 800px `<name>-sm.webp` via `<picture>` at `≤640px`. So **keep writing `.jpg`/`.png` paths in data** (including the runtime `-ru` suffix); do not rewrite them to `.webp`.

**Rendering path:** every illustration `<img>` goes through `AppImage` — in `RuleBlock.vue` (`sideImage`, inline `[img:]` body images, `img-group`), `BasicRulesView.vue` (section `image`, `illustration`), and `LayoutCard.vue` (`layout.image`). Icons stay as plain `<img>` (markers, `icon:` dispo/legend, the QR). `AppImage` uses `inheritAttrs:false` + `v-bind="$attrs"` to forward `class`/`style` onto the inner `<img>`, and its `<picture>` is `display:contents` so the img stays the float/flex child of the parent. Consequence: **parent scoped CSS that targets the img must use `:deep()`** (e.g. `:deep(.side-image)`, `.section-illustration :deep(img)`), since the img now lives inside the child component.

`scripts/gen-webp.mjs` (`npm run images:webp`, needs the `sharp` devDep) does the conversion. It handles two cases and **deletes the original** in both:

- **Illustrations** → `<name>.webp` + `<name>-sm.webp` (800px mobile copy). `isIllustration()`: all `*.jpg/*.jpeg` **except** `event/legend-*.jpg`, plus `intro/datasheet.png` and `turn/*.png`. JPEG sources → lossy WebP; PNG sources → lossless WebP (preserves alpha).
- **Icons** (`iconSpec()`, matched by basename) → a single downscaled `<name>.webp` (no `-sm`), sized ~2× their CSS display: `marker-*` 800px lossless, `dispo-*` 128px lossy, `legend-*` 192px lossy. They render via plain `<img>` (the `icon:` data field / hardcoded `src`), **not** `AppImage`.

The script is idempotent and re-runnable — add a new image as `.jpg/.png`, run it, and it converts + deletes the original (back-filling a missing `-sm.webp` next to an existing illustration `.webp`; icons are skipped in back-fill).

**Left as-is:** `wh40k-app-qr.png` — a 288px 1-bit (2-colour) indexed PNG (~640 B), pre-sized to ~2× its display; kept out of the WebP pipeline on purpose (WebP can't store a 1-bit palette, so it'd be larger and softer). And `favicon.svg`.

**Re-cutting illustrations from the core-rules PDF** (used for the EN phase placards `turn/*PHASE*`/`*TURN-STEP*` and the `command/battle-shock-examples*` panels — straight, consistent crops that replace crooked hand-cut ones). General recipe, with Python+PIL (or pymupdf) + `cwebp`:

1. **Render** the page at 600 dpi: `pdftoppm -f N -l N -r 600 -png sources/WH40k_11ed_CORE-Rules_*.pdf /tmp/p` → a 3780×5434 PNG (page index = printed page no.).
2. **Crop axis-aligned bboxes.** The source elements are straight, so a rectangular bbox auto-fixes human crookedness. Detect bands by brightness/colour (page bg is dark on p.29, cream ~RGB 245 on p.31); **stacked elements share one left/right `x` range** — derive it from the cleanest element and reuse, varying only the per-element `y`. Downscale (LANCZOS) to the existing file's width (placards 1100, battle-shock 1190).
3. **Phase placards (p.29):** `x[354:3543]`, 7 y-bands. The banners have a **45° chamfered bottom-right corner**; a rectangular crop fills it with dark page bg → a black triangle (obvious on the light plates). Fix: add an alpha channel and make that corner transparent — `alpha=0` where `(W-1-x)+(H-1-y) < ~75` source px (≈25px at output). Build the mask at source res so the downscale anti-aliases the diagonal.
4. **Battle-shock panels (p.31):** `x[355:2221]`, 4 y-bands (~1865×1075). Crops can land on the cream page edge → thin **white/light border lines**; trim outer rows/cols whose mean brightness `>140` before resizing.
5. **Encode directly with `cwebp`, not `npm run images:webp`** — `gen-webp.mjs` forces *lossless* for `.png` and ignores `command/*.png` (not an illustration there), and a `.jpg` intermediate would double-compress. Use lossy: placards `cwebp -q 82 -alpha_q 100` (full) / `-q 78 -alpha_q 100` (`-sm`); battle-shock `cwebp -q 74` / `-q 70` with `-resize 800 0` for the `-sm`. Overwrite the existing `.webp` + `-sm.webp` **keeping the same filenames** (EN only — the `-ru` variants carry translated text not on the English page, leave them). Then `npm run build`. Note: these are photographic, so lossy ≈ the old quality in bytes; lower `q` is what makes them lighter. (History: PRs #26/#28/#29.)

## PWA

The site is an installable PWA via **`vite-plugin-pwa`** (Workbox `generateSW`), configured in `vite.config.js`. `base` is `'/'` (root-hosted) so the service worker controls scope `/`.

> **🔒 Product requirement — full offline immediately after install.** The app MUST work fully offline (every rule, image, font, icon) right after install, with no online "warm-up" visit. So the SW **precaches everything** (`workbox.globPatterns` = all assets). Do **not** move content (esp. `images/event/**`) to `runtimeCaching` — that defers loading to the first online visit and breaks the requirement. The ~27 MB precache is intentional; only optimizations that *reduce its weight* (compression, breakpoints) are allowed, never deferral.

- **Manifest** is defined inline in the `VitePWA({ manifest })` config; the plugin emits `dist/manifest.webmanifest` and injects the `<link>` into `index.html`. iOS-only tags (`apple-touch-icon`, `apple-mobile-web-app-*`, `theme-color`) are hand-written in `index.html`.
- **Icons** (`public/pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`) are generated from the "W" mark by `scripts/gen-pwa-icons.mjs` (`npm run icons`, uses `sharp`). `favicon.svg` stays for the browser tab.
- **Full offline:** `workbox.globPatterns` precaches the app shell, every image (`.webp`) **and** the fonts (`.woff2`) — ~28 MB, so install downloads everything and the app works fully offline. Fonts (Inter, EB Garamond) and bootstrap-icons are **self-hosted** via `@fontsource` + the `bootstrap-icons` package, imported in `src/fonts.js` (no external CDN), so their hashed woff2 are precached. Weights mirror the former Google Fonts request (Inter 400/500/600/700/800; EB Garamond 400/600/700 + 400 italic); `@fontsource` ships all subsets incl. Cyrillic for RU. To change fonts/weights, edit `src/fonts.js`.
- **Updates (prompt + toast):** `registerType: 'prompt'` (NOT `autoUpdate`). A new deploy is downloaded in the background; `UpdateToast.vue` watches `needRefresh` from `useRegisterSW()` (`virtual:pwa-register/vue`) and shows an "Update available → Update" toast. The SW activates (and the page reloads) only when the user clicks Update — so we never auto-reload mid-game in the tracker. `cleanupOutdatedCaches` purges stale precache on activation. Works only if the SW itself isn't long-cached — see Deployment. (Under prompt mode the registration is bundled via `workbox-window`; no separate `registerSW.js` is emitted.)

## Deployment

Hosted at **wh11ed.ru** on a **Yandex Object Storage** bucket (`wh11ed.ru`) behind **Yandex CDN**. Deploy with `npm run deploy` (runs `deploy.sh`), which builds and `aws s3 sync`s `dist/` with tiered `Cache-Control`:

- `assets/*` (content-hashed, incl. `workbox-*.js`) → `public, max-age=31536000, immutable`
- images / favicon / PWA icons / `og-image.png` (stable names) → `public, max-age=31536000`
- `sw.js` / `registerSW.js` / `manifest.webmanifest` → `no-cache` (**must** revalidate, or PWA updates never reach clients)
- `robots.txt` / `sitemap.xml` → `public, max-age=3600` (1 h — excluded from the 1-year tier so crawlers pick up changes; a stale sitemap would otherwise be served for a year)
- `index.html` → `public, max-age=86400` (1 day) — uploaded via `aws s3 cp`, **not** `sync` (sync silently skips it: stable name + constant size defeats its size/mtime check, leaving a stale entry point that points at `--delete`d assets → broken site after purge). Don't change it back to `sync`.

`deploy.sh` **auto-bumps `package.json` (`BUMP=patch` by default)** before building — use `BUMP=none npm run deploy` to ship the current version as-is, or `BUMP=minor`/`major`.

Uploads via the S3-compatible API (endpoint `storage.yandexcloud.net`, AWS CLI profile `yc`). Set `CDN_RESOURCE_ID` to auto-purge the CDN; otherwise (the default — it's unset locally) purge manually after **every** deploy or the new build never reaches users: `yc cdn cache purge --resource-id bc8raqgpcdeagfb6ygn6 --path '/*'` (prod CDN resource id; `yc` at `~/yandex-cloud/bin`). The CDN resource must cache **according to origin headers** (honor-origin) or it overrides per-file `Cache-Control` with a single TTL. Because images are cached a year under stable names, **rename a file when you change an image** (or the browser keeps the old one). Full runbook: `DEPLOY.md`.
