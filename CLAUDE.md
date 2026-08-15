# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**wh11ed** is a bilingual (EN/RU) reference for the **Warhammer 40,000 11th edition** rules plus an
offline tracker for a game in progress — live at [wh11ed.ru](https://wh11ed.ru), moving to
wh-rules.ru. This repo is the frontend, and the frontend is ~99% of the product: every rule, every
page and the tracker all live here, with no backend involved.

> **🚚 АКТИВНЫЙ КУРС — миграция домена `wh11ed.ru` → `wh-rules.ru`.** Идёт фазовый переезд
> (автосинк → грейс → баннер → грейс → катовер с 301). **`MIGRATION.md` — источник правды**,
> читать его в начале любой сессии на любой машине (память Claude между машинами не
> синхронизируется). Финал = один домен, `wh11ed.ru` → 301. Сейчас: **Фаза 2 АКТИВНА
> (с 2026-08-15, v2.2.6)** — pre-баннер «сайт переезжает» живёт на `wh11ed.ru`, host-aware
> функция бэкенда задеплоена, логин работает на обоих доменах. Дальше ~неделя грейса, затем
> Фаза 3 (катовер + 301). Живой прод пока остаётся `wh11ed.ru`.

The audience is players at a table — someone looking a rule up mid-game, usually on a phone, often
on bad reception. That shapes most of the decisions below.

**Four things to know before changing anything:**

- **The centre of gravity is data, not code.** The bulk of the repo, and the bulk of the risk, is
  the bilingual rule data in `src/data/`. The characteristic bug here isn't a logic error — it's an
  **EN↔RU desync**: block-marker counts that no longer match, unbalanced `**`, a gloss added on one
  side only. Check that first on any text change (see *Bilingual content conventions*).
- **Light in a tab, fully offline once installed.** A casual visitor gets a light, fast site; the
  *installed* PWA reaches full offline through a one-time warm-up. Anything that inflates what a
  browser tab downloads fights the central product decision (see *PWA*).
- **Documented "don't fix this" invariants exist** — no body scroll-lock in modals, `-ru` images
  that look unused but aren't, images deliberately kept out of `globPatterns`, dynamic imports of
  heavy data files, `index.html` uploaded with `cp` and not `sync`. Before "fixing" something that
  looks wrong, search this file for it: the reason is usually written down, along with what broke
  last time.
- **No linter.** Match the surrounding code. Tests are Vitest (`npm test`).

**Where to start:** *Architecture* below is the map — the data→view pipeline and the navigation
model. This file is the engineering reference; `README.md` is the product overview for users.

**Large features have their own scoped `CLAUDE.md`**, loaded contextually instead of living
here — read the one for the directory you're touching: `src/components/core/CLAUDE.md` (Core
Rules), `src/components/event/CLAUDE.md` (Event Companion), `src/components/tracker/CLAUDE.md`
(Game Tracker), `src/components/roster/CLAUDE.md` (Roster Builder), `src/views/faction/CLAUDE.md`
(faction pages), `src/views/combat-patrol/CLAUDE.md` (Combat Patrol), `public/images/CLAUDE.md`
(image pipeline). This file covers what's shared across all of them (the rendering engine, nav,
search, deployment, bilingual conventions) plus anything without a dedicated directory.

## How this repo relates to the others

The product is split across separate repositories, cloned side by side into one working folder.
They are **not** submodules: each versions and deploys independently.

| Repo | What it is |
|---|---|
| [wh-rules.ru](https://github.com/Joker1796/wh-rules.ru) | the umbrella — what the project is made of and how to assemble it. No code |
| **wh11ed** | this repo: the whole app |
| [wh11ed-api](https://github.com/Joker1796/wh11ed-api) | optional backend — login and cloud backup of tracker history |

**This repo is self-contained:** it builds, tests and runs with none of the others present. Only
login and cloud sync need `wh11ed-api` (`VITE_API_BASE_URL`, defaulting to a local dev server), and
without it the rest of the app is unaffected.

**The one real coupling** is the saved-game envelope: `wh11ed-api`'s `domain/game.ts` validates it,
so changing the tracker's game format or the auth flow means checking the backend too.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run deploy   # build + upload to the Yandex Object Storage bucket (see Deployment)
npm run sync     # audit all data against wh40k-appdata: version check + sourceIds + faction structure/text/tracker/core diffs (report-only) — see DATA-SYNC.md for the full update procedure
npm run sync:text    # just the faction rule/stratagem/enhancement/ability PROSE diff vs appdata (errata drift; a slug or --all)
npm run sync:mfm     # audit datasheet points against src/data/mfm/* (scraped from the live MFM by scripts/scrape-mfm.py); --write applies the diff — see DATA-SYNC.md
npm run images:webp  # convert new illustration jpg/png in public/images/ to WebP (see Image organization)
npm run faction-rules:index  # regenerate the faction-rules name index for search (see Search)
npm run icons        # regenerate PWA / home-screen icons from the "W" mark (see PWA)
npm run screenshots  # regenerate the manifest install-dialog screenshots (see PWA)
npm run splash       # regenerate the iOS apple-touch-startup-image launch screens (see PWA)
```

No linter configured. **Tests:** Vitest (`npm test` = `vitest run`, `npm run test:watch`), config in `vitest.config.js` (jsdom env, `src/test-setup.js` installs a clean in-memory localStorage). Specs live next to source as `src/**/*.test.js`: pure scoring/BP/winner logic (`gameScoring.test.js`), pure tracker helpers (`useTracker.helpers.test.js`), the module-singleton store with `vi.resetModules()` between cases (`useTracker.store.test.js`), components via `@vue/test-utils` (`ScoreBoard`/`GameSetup`/`modals`), the search index (`useSearch.test.js`), and the cloud-backup layer with `vi.mock`'d auth/tracker deps (`useCloudSync.test.js`). Test files are not imported by the app, so they never reach the build/precache.

## Architecture

Vue 3 SPA using HTML5 history routing (`createWebHistory`) — clean paths like `/core-rules`, each indexable by search engines. No backend. All content is static JS data files.

**History-mode SEO machinery** (how deep links work on a static bucket):
- The bucket serves `index.html` as its ErrorDocument (HTTP **404**) for unknown paths — fine for users, but crawlers skip 404s. So the deploy uploads an **index.html copy under every public route key** (`introduction`, `event-companion/missions`, …) → those return **200**. The route list + `sitemap.xml` are generated by `scripts/gen-seo-routes.mjs` (runs as part of `npm run build`; auto-picks up faction/datasheet pages from data files when they exist). `STATIC_ROUTES` in that script must be kept in sync when adding a page.
- Per-route `canonical`/`og:url`/`hreflang` are set at runtime by `useSeoMeta.js` — **never hardcode them in `index.html`** (every deep URL serves the same file; a static canonical would collapse all pages into `/`).
- Unknown paths render `NotFoundView` (catch-all route) which injects `noindex` while mounted.
- Old `/#/path` links are rewritten by a tiny inline shim at the top of `index.html` (`location.replace`, keeps the query even inside the hash — the pre-migration OAuth callback relies on that). Keep the shim — it's what makes old bookmarks/shared links work forever.

**Navigation model:** Two levels.

- **Top navbar** (`App.vue`) — sections "Core Rules", "Event Companion", "Tracker", "Factions". (The `/links` page of source PDFs is deliberately NOT in the navbar or the drawer — only its card on the landing page links to it.) `isEventRoute` (path starts with `/event-companion`) and `isTrackerRoute` (starts with `/tracker`) switch which subnav renders. **Factions** is a `.nav-dropdown`: the link still navigates to `/factions`, but on **hover / focus-within** (desktop only — `.navbar-links` is `display:none` ≤900px) it opens a pure-CSS grouped mega-menu of all factions (2-column grid from `data/factionsIndex.js` via `groupLabelKey`, links to `/factions/:slug`, "coming soon" for non-ready). No JS state — reveal is CSS `:hover`/`:focus-within` with a transparent `padding-top` bridge.
- **Subnav** (sticky bar below navbar) — for Core Rules: **anchor** links (Introduction / Basic Rules / Battle Round / Battlefields / Advanced / Reference / Muster), since all seven are chapters of the one `/core-rules` page; the highlight follows the scroll-spy (`activeSectionId` in `useActiveSection.js`), not the URL. For Event Companion, the same anchor-link recipe on the merged `/event-companion` page: Introduction / Sequence / Missions / Terrain & Layouts / Pairings / Teams / FAQs. For Tracker: Game Tracker / Current Game / Stratagems. The `/stratagems` page rides with the **tracker** subnav (`subNavItems` returns `trackerSubNavItems` when `isTrackerRoute || isStratagemsRoute`) so reaching it from the tracker keeps those tabs in view (desktop has no "Back to game" bar).
- `router/index.js` exports `navGroups`/`navGroupsRu` (Core), `eventGroups`/`eventGroupsRu` (Event), **and** `trackerGroups`/`trackerGroupsRu` (Tracker); `NavSidebar.vue` renders all three as labelled mobile sections.
- **Mobile** (≤900px): the navbar links + subnav are hidden; a hamburger opens `NavSidebar.vue` (the drawer, for in-section navigation) and a fixed **bottom nav** in `App.vue` with icons: Core Rules / **Factions** / **Stratagems** (`/stratagems`) / Tracker. **Factions** is a `<button>` (not a link) that opens `FactionsNavModal.vue` — a lightweight grouped faction list (driven by the light `data/factionsIndex.js`, links to `/factions/:slug`, closes on pick). On any faction-with-slug page (rules page, datasheets list, or a single unit's datasheet) an **additional** «Units» link is inserted in the middle, pointing to that faction's `/factions/:slug/datasheets` list — also shown, pointing at the "You" player's faction, from anywhere while a tracker game is in progress. The two are mutually exclusive: `isUnitsRoute` (`isFactionDetailRoute && path.includes('/datasheets')`) highlights **Units** and suppresses **Factions**' own `isFactionRoute` highlight, so only one is ever lit — browsing a faction's rules page lights Factions, browsing its datasheets list or a single unit lights Units instead. The bottom nav uses its own short RU labels (`navCoreRulesShort` «Правила», `navStratagemsShort` «Стратагемы»; Factions/Units reuse `navFactions`/`factionDatasheets`) so they fit; the top navbar keeps the full names (Event Companion stays in the top navbar/drawer — Missions is no longer in the bottom nav, only reachable via the Event subnav/drawer). `isStratagemsRoute` highlights its item. The bottom-nav is an always-dark surface, so the active item uses `--accent-on-dark` (the light theme's `--accent` is invisible on it); the Factions `<button>` gets a native-chrome reset (`button.bn-item`).
- **Mobile utility bar** (`MobileUtilityBar.vue`, mobile only, floats just above the bottom nav): one shared strip of small icon buttons for everything that would otherwise fight over that corner — additive, not exclusive, all can show together: **resume** (a game in progress, `useTracker().current.phase === 'playing'`, on any non-tracker/non-landing route with no full-screen modal/drawer open — `showResumeGame` in `App.vue`) → an icon button to `/tracker/game`; **faction tabs** (on a faction hero page with its in-page tab nav scrolled out of view) → the mobile equivalent of the desktop FAB column below, contributed via `useContributeMobileActions('faction-tabs', …)` in `FactionLayout.vue`; **back-to-top**, always rightmost, only once actually scrolled past the threshold. The bar itself hides only when none of the three apply. A shared `--mobile-bar-h` var (set on `.app-layout`, sized whenever the bar is visible) lifts the content bottom-padding and the offline-warmup toast above it so nothing overlaps. Back-to-top's scroll-threshold logic (`useBackToTop.js`) is shared with the desktop-only `BackToTopButton.vue` and `FactionLayout.vue`'s own FAB. The reverse case — a fixed bar from a *view* claiming that same bottom-right corner, like the Roster Builder wizard's Back/Next bar (`RosterCreateView.vue`'s `.rc-sticky`, see `src/components/roster/CLAUDE.md`) — doesn't move; `App.vue` reserves its height in `--roster-sticky-h` (`.app-layout:has(.rc-sticky)`) and `MobileUtilityBar`'s own bottom offset adds it, so the utility bar rises above it instead of overlapping it and blocking the click.

**Data → View pipeline:**

```
src/data/*.js  →  src/views/*View.vue  →  src/components/RuleBlock.vue
```

Each view imports its data file, iterates sections/subsections, and renders them via `RuleBlock` (the universal rule renderer). Views handle special cases themselves.

**The Core Rules are one page** (`/core-rules`) and **the Event Companion is one page too**
(`/event-companion`) — each renders all seven of its chapters at once, each chapter its own
component (`content-visibility: auto`, `scrollToAnchor()` for in-page jumps, former per-chapter
routes still resolve via redirect). See `src/components/core/CLAUDE.md` and
`src/components/event/CLAUDE.md` for the mechanics, the two-column layout, and each one's
data file shapes (`basicRules.js`/`battleRound.js`/`battlefields.js`/`advancedRules.js`/
`reference.js`/`intro.js` for Core; `eventCompanion.js`/`missions.js` for Event).

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
- `renderAfterStratagems: true` — in `ChapterBattlefields`, renders after the stratagem card grid (used for Snap Shooting 15.09)

**Cross-references** (`seeAlso: ['Rule Name NN.NN']`) are resolved by `useRefNavigation.js` and rendered by `SeeAlsoBlock`. Click navigates to `#section-NN-NN`.

**Search** (`Ctrl+K`) — `useSearch.js` builds a flat index lazily (per locale) from all data files. Searches `title`, `sectionNum`, `body`, `note` fields. **Datasheet units are searchable by name** via `src/data/datasheetIndex.js` — a compact generated name-only index (`npm run datasheets:index`, re-run after adding or renaming a unit), dynamic-imported when the palette opens so the heavy per-faction datasheet files never ride in the search bundle. **Faction army rules/detachments/stratagems/enhancements are searchable by name** the same way, via `src/data/factionRulesIndex.js` (`npm run faction-rules:index`, re-run after adding/renaming/renumbering any of those) — a full-text version was tried and rejected (~3.5 MB, too heavy for a chunk fetched just by opening the palette in a browser tab); names only keeps it light. Clicking a detachment/stratagem/enhancement result calls `useFactionChoice().setDetachment()` (and `setChapter()` for a chapter-locked one) **before** navigating, because `FactionRuleView` only renders the currently-active detachment — its section wouldn't exist in the DOM to scroll to otherwise. A stratagem/enhancement result anchors to its **own card**, not just the detachment heading: `StratCard`/the enhancement `<article>` in `FactionRuleView.vue` carry `id="strat-<detId>-<slug(name)>"`/`id="enh-<detId>-<slug(name)>"` (`slugify()` in `src/data/slugify.js`, shared with the generator so the two always agree), and `gen-faction-rules-index.mjs` bakes the same id into each entry's `id` field. **A result whose title stays English by convention (stratagems, enhancements, detachments, missions, twists) also carries `titleRu`** in the RU locale — the same translated-subline pairing `StratCard`/`RuleBlock`/`MissionCard`/`TwistCard` render on the page itself — and `SearchModal.vue` shows it as a small muted line under the title. `useSearch.js` reuses each source's own `nameRu`/`titleRu` field; adding a name-stays-English item type to search should populate this the same way rather than leaving results EN-only in RU. **Each army-rule/detachment-rule body's `### English | Russian` h4 subheadings** (Vows/Doctrines/Stances-type sub-rules) are searchable too — `gen-faction-rules-index.mjs`/`gen-combat-patrol-search-index.mjs` extract them via `src/data/extractSubheadings.js` and anchor them with `h4AnchorId(ruleId, n)` (`src/composables/anchors.js`), the same id `RuleBody.vue` computes when rendering `### ` lines, so a hit lands on the exact subheading. The RU caption comes from the RU-locale-merged body, not the EN source — see the generator's `subheadings()` comment for why (a translator sometimes replaces the heading outright instead of using the pipe form, so both EN and RU bodies are parsed and paired by position). A detachment-rule's `RuleBlock` needs its own `:id` (`` `${det.id}-rule` `` in `FactionRuleView.vue`) for this to have anywhere to anchor to — the army-rule one already had one (`armyRule.id`). **Combat Patrol (`/combat-patrol/:slug`) has its own compact search index**, `src/data/combatPatrolSearchIndex.js` (`npm run combat-patrol:index`) — same names+subheadings shape as `factionRulesIndex.js`, generated from `combatPatrol.js`/`combatPatrolRu.js` (whose overlay already carries `nameRu` directly on each entry, no separate name-dictionary indirection). No detachment to select before navigating (a CP box has exactly one fixed rule/army-rule/roster); `CombatPatrolFactionView.vue`'s `RuleBlock`s/`StratCard`s/enhancement `<article>`s carry `cp-<slug>-rule` / `cp-<slug>-army-rule` / `cp-strat-<slug>-<slug(name)>` / `cp-enh-<slug>-<slug(name)>` ids matching the generator.

**Keyword popover** — `useKeywordPopover.js` is a singleton; any click on `.keyword` span opens `KeywordPopover.vue` with the ability text looked up from `reference.js` (`coreAbilities`) / the Event Companion glossary. **Perf:** those two big data files are **dynamically `import()`ed on first keyword click** (not statically), so they stay out of the entry chunk that loads on every page — `open()` is async. Keep it that way (don't re-add a static import).

**Stratagem cards** — `StratCard.vue` renders core rulebook stratagems in `ChapterBattlefields.vue` (`src/components/core/`, section 15) **and** on the standalone **`StratagemsView.vue`** (`/stratagems`) — a stripped-down game-time quick reference (just the card grid, no surrounding prose), reusing the same EN/RU `useBilingualSections` merge to pull section 15's `stratagems`. That page is reachable only via the mobile bottom-nav (and direct URL on desktop) — deliberately not in `navGroups`/`NavSidebar`/the top navbar. **When a tracker game is in progress** (`useTracker().current.phase === 'playing'`) it also shows each player's **detachment** stratagems behind a filter bar (Core / Mine / Opponent's); with no active game it stays core-only with no filters. Detachment stratagems come from the faction rules data (`data/factions/*`), **dynamically `import()`ed** so the heavy faction bundle never enters this page's chunk unless a game is on. MFM detachment names (from the tracker) are matched to faction-data detachments **apostrophe/case-insensitively**, and the five Codex-sharing chapters (Black Templars, Blood Angels, Dark Angels, Deathwatch, Space Wolves) fall back to `space-marines` data for the shared detachments (Gladius Task Force, etc.). RU cards + name sublines reuse the faction RU overlay (`loadFactionRu`/`deepOverlay`/`stratNamesRu`, same as `useFactionPage`).

A **"By phase / As list" toggle** (persisted to `localStorage['wh11ed-stratagems-by-phase']`) regroups the visible cards into collapsible per-phase accordions (Command / Movement / Shooting / Charge / Fight / Any, via `CollapseTransition`, **closed by default**). Phase is derived from the **English** `when` timing text by `src/composables/stratagemPhases.js` (`phasesOf`) — never the localized string — so the grouping is identical EN/RU (core keys off `battlefields.en` §15 by index, detachment strats off `data.en`). A stratagem spanning several phases ("…Shooting phase or the Fight phase") shows under **each** of them; the `any` group is reserved for stratagems that literally work in "any phase" (plus a no-phase-detected fallback). On ≤480px the toolbar's toggle collapses to icon-only so all buttons fit one row.

**Faction pages** (`FactionRuleView.vue`/`FactionDatasheetView.vue`, army choice persisted via
`useFactionChoice.js`, `FactionPickerBar.vue`) — see `src/views/faction/CLAUDE.md`.

**Combat Patrol** (`/combat-patrol/:slug`, fixed-roster starter-box content, its own compact
search index) — see `src/views/combat-patrol/CLAUDE.md`.

**`sourceId` map (`src/data/sourceIds.json`)** — a generated **sidecar** mapping each faction
entity (army rule, detachments, stratagems, enhancements, datasheets) to its stable source UUID
from `wh40k-appdata` (the private sibling repo treated as the authoritative rules source). It's an
external file, **not** an inline field: the faction data files (`src/data/factions/*.js`) are
hand-authored — helper-generated stratagems, name-only entities, comments — so an id can't be
safely written into them; the datasheet files could carry it inline but the map keeps one uniform,
regenerable mechanism. Shape: `{ "<slug>": { "<kind>:<key>": "<uuid>" } }` where `kind` is
`armyrule|det|strat|enh|ds|wg` and `key` is the entity's own wh11ed `id` (datasheets `ds:<id>`,
detachments `det:<id>`) or its normalized name (strat/enh scoped under their detachment; `wg` — a
datasheet's `ranged[]`/`melee[]` weapon row — scoped under its datasheet id, `wg:<ds-id>:<name>`;
the uuid identifies the appdata **wargear item**, not one profile, so several wh11ed rows of a
multi-mode weapon legitimately share it). `id` is
load-bearing (URLs, `RouterLink`s) and never changes; the map exists purely so `sync-appdata.mjs`
can match an entity across a `data_version` bump even after GW renames it — a stable-id bridge, not
read by any view. Regenerate with `node scripts/gen-source-ids.mjs` (`--check` fails if stale);
built by name-matching wh11ed↔appdata, so run it while names still agree. On the next bump
`sync-appdata.mjs` uses it to report a `⟲ renamed` line (same id, new appdata name) instead of a
spurious missing+extra pair. Datasheets map 1:1 (100%); a residue of strat/enh name-variants stays
unmapped and is the same set the name-diff already surfaces.

**Rule-granted keywords (`src/data/conditionalKeywords.json`)** — a generated **sidecar** listing
keywords a unit *gains from an army/detachment rule* rather than having printed on its datasheet
(Dark Angels' Deathwing/Ravenwing via **The Unforgiven**, Battleline granted inside a detachment,
etc.). GW/appdata never print these on the sheet — they're conditional grants — so `DatasheetCard`
merges them into the keyword line at render time, indistinguishable from the printed ones (via its
optional `grantedKeywords` prop; `FactionDatasheetView` computes it from the faction slug + the
active detachment in `useFactionChoice`). Source of truth is appdata's structural
`conditional_keyword` table; the generator (`scripts/gen-conditional-keywords.mjs`, `npm run
condkeywords`, `--check` in `npm run sync`) imports only the **roster-faction-keyword** grants
(always-on for that Chapter's page) and **detachment** grants (gated on the active pick), and skips
the per-unit **allegiance/Mark-of-Chaos** grants (KHORNE/TZEENTCH/… — a per-model army-list choice
the static page doesn't model). appdata datasheet/detachment UUIDs are translated to wh11ed ids by
**inverting `sourceIds.json`**, so it stays automatic across bumps: regenerate and new grants land
themselves. Shape: `{ "<slug>": { "<unit-id>": [{ "kw": "Deathwing" }, { "kw": "Battleline", "det":
"company-of-hunters" }] } }` (no `det` = unconditional on that faction). Already-printed / off-page
grants are dropped at generation (render de-dupes too).

**SM-Chapter datasheet dedup** — the 5 Chapter codex files (`black-templars.js`, `blood-angels.js`,
`dark-angels.js`, `deathwatch.js`, `space-wolves.js`) don't duplicate datasheets that are identical
to their `space-marines.js` counterpart; each instead exports a `sharedUnitIds: string[]` alongside
its own (chapter-unique or diverging) datasheets. `loadDatasheets`/`loadDatasheetsRu`
(`src/data/datasheets/index.js` / `ru/index.js`) fold the referenced `space-marines.js` entries back
in transparently, so every other consumer (`FactionDatasheetsView`, `FactionDatasheetView`,
`gen-datasheet-index.mjs`, `gen-seo-routes.mjs`) sees one flat per-faction list — ids/URLs are
unaffected either way. A unit is folded into the shared pool whenever `wh40k-appdata` doesn't list a
Chapter-specific override for it under that Chapter's own publication — cross-checked during the
appdata reconciliation (see `AUDIT-PROGRESS.md`'s Follow-up), which found the Chapter files had
drifted far more than believed: only **6 units total, all in Black Templars** (Impulsor, Land Raider
Crusader, Repulsor, Repulsor Executioner, Sternguard Veteran Squad, Terminator Squad) are genuinely
Chapter-unique; everything else that looked "differing" was stale duplication (missing keywords,
pre-errata ability text, outdated points, wrong core-ability labels) that had silently drifted out of
sync with the shared pool. Each Chapter's `ru/<slug>.js` RU overlay was already ahead of this — its
own `SHARED` list already assumed the correct fold — so only the EN files needed the catch-up.

## Bilingual content conventions

The data is the bulk of the repo and the EN/RU arrays are edited in lockstep. When touching `body`/`note`/`example` text:

- **Glosses (popover, preferred):** term glosses are an inline token `[gloss:<id>:<visible label>]` (rendered by `useRenderInline.js` → `.gloss` span; a click/tap opens `KeywordPopover` via `App.vue`'s global handler → `openGloss`). `<id>` keys a central `src/data/glossary.js` entry `{ term, en, ru }` — `term` is the English original shown in the popover header (same in both locales), `en`/`ru` are short 1–2 sentence definitions. **Define each term once** in `glossary.js`; reuse the id across occurrences (the `<visible label>` carries the local inflection, e.g. RU `[gloss:base:базы]` / EN `[gloss:base:base]`). Add tokens in **both** the EN and RU subsections. The token is not a block marker, so EN↔RU block parity is unaffected. Don't gloss terms already covered by `KeywordPopover` (ALL-CAPS keywords like INFANTRY/VEHICLE, `[BRACKET]` abilities from `coreAbilities`) — they have their own popover.
- **Glosses (legacy parenthetical, being migrated):** most data still carries the English original in parens — `РУС (ENG)`, e.g. `критическому ранению (critical wound)` — but this form is for ordinary (non-caps) terms only, written as `**рус** (eng)`. **ALL-CAPS keywords (INFANTRY, AIRCRAFT, WARLORD, …) are never translated** — use the bare English keyword in RU text too (no Russian rendering, no parens, e.g. `модель CHARACTER`, not `ТЕХНИКИ (VEHICLE)`), and leave it unbolded (the renderer bolds it). `[BRACKET]` ability names stay English (KeywordPopover lookup). The paired EN subsection (same `id`/`sectionNum`) is the source of truth for the English term. Migrate these to the `[gloss:…]` token form above as sections are touched.
- **Bold (`**…**`):** game terms are emphasized wherever the official PDF emphasizes them, in **both** languages. Do not bold things the renderer already bolds (ALL-CAPS keywords, `◈ LABEL |` info-card labels) or anything inside `seeAlso` refs / image paths. `### h4` headings render through `renderInline` too, so inline markup (`**bold**`, `[KEYWORD]`, cross-refs) works there — `**…**` adds emphasis on top of the heading's own (CSS) weight; only use it where the PDF emphasizes a term within the heading.
- **EN↔RU structural parity:** the per-section counts of block markers (`▪ ◈ → ### ◆ [img:]`) must match between `en` and `ru`. After bulk edits, verify: `**` is balanced (even, no `****`), parity holds, and `npm run build` passes.
- **RU transliteration:** follow the source's apostrophes, using the typographic `’` (U+2019) — `Kauyon` → «кауйон» (none), `Mont’ka` → «монт’ка», `T'au` → «т’ау». Latin forms inside RU text keep their own (`T'au Empire`, the `T'AU EMPIRE` keyword). These match the Russian community's translation guide; that guide covers Black Library prose, so it applies to **flavour text and transliteration only** and never overrides the rule above that unit/detachment/stratagem names and ALL-CAPS keywords stay English. Settled cases are recorded here as they're decided — that's the source of truth for this repo.
- **Astra Militarum `Order`/`Orders`** (the Voice of Command mechanic) are translated as «приказ»/«приказы», unlike named mechanics such as Space Marines' Combat Doctrine which stay English — decided 2026-07-22. Specific order names (`Move! Move! Move!`, `Take Aim!`, …) stay English and bold in the ability's own listing, or in «guillemets» when referenced from prose elsewhere. Glossed via `[gloss:am-order:…]` (`src/data/glossary.js`) on the first occurrence in the army rule body and the first occurrence in each detachment (rule/stratagems/enhancements combined) — not every occurrence.

> **Maintainers only.** The guide itself lives in `wh-glossary`, a **private** reference repo (34k EN→RU pairs extracted from the community's docx). It is not public and contributors neither have nor need it — nothing in this repo depends on it, and decisions from it land in this file. If you do have it cloned alongside: **grep it, never read it whole** — `grep -iP '^Kauyon\t' ../wh-glossary/terms/*.tsv`, conventions in its `conventions.md`.

The source rulebook PDF lives in `sources/` (gitignored). Extract text with `pdftotext -layout`, and bold runs with `pdftohtml -s -i -noframes -hidden <pdf> out.html` (yields `<b>` tags).

**Event Companion asset extraction** (layout diagrams, edge markers, legend icons — pymupdf
against the source PDF) — see `src/components/event/CLAUDE.md`.

## Game Tracker

Third top-level section (`/tracker`) — a client-side, offline 2-player VP tracker for a game
of 40k 11th ed. **Not part of the rules-reference data pipeline above.** See
`src/components/tracker/CLAUDE.md` for the setup wizard, scoring, secondaries, twists and
data shapes. **Roster Builder** (`/roster*`) is its own top-level nav section (next to
Tracker, not nested in it) and hands a built roster off to this one — see
`src/components/roster/CLAUDE.md`.

## Adding content

**New core-rules section** — see `src/components/core/CLAUDE.md`.

## Image organization

`public/images/` — one folder per rules chapter, WebP conversion pipeline (`scripts/gen-webp.mjs`), the `AppImage` rendering component, and the illustration re-cutting recipe. See `public/images/CLAUDE.md`.

## PWA

The site is an installable PWA via **`vite-plugin-pwa`** (Workbox `generateSW`), configured in `vite.config.js`. `base` is `'/'` (root-hosted) so the service worker controls scope `/`.

> **🔒 Product requirement — light web/tab, full offline for the installed app after warm-up.** A casual visitor in a **browser tab** must get a light, responsive site: the SW precaches **only the app shell** (`workbox.globPatterns` = `js/css/html/svg/woff2/png`, with `globIgnores: ['**/images/**']`), and the ~27 MB of images load lazily as they're viewed (`workbox.runtimeCaching`, CacheFirst, cache `wh11ed-images`). The **installed app** still reaches *full* offline, but via a one-time **warm-up** (not an instant post-install guarantee): on the first online standalone launch, `src/composables/useOfflineWarmup.js` fetches every URL in `dist/image-manifest.json` so the CacheFirst route stores them all. Do **not** move images back into `globPatterns` — that re-bloats the tab download, which is exactly what this split fixes.

- **Manifest** is defined inline in the `VitePWA({ manifest })` config; the plugin emits `dist/manifest.webmanifest` and injects the `<link>` into `index.html`. It carries `id: '/'`, app `shortcuts` (Game Tracker, Missions — clean history-mode paths, e.g. `/tracker`) and `screenshots` (wide + narrow, for the richer Chrome/Android install dialog). iOS-only tags (`apple-touch-icon`, `apple-mobile-web-app-*`, `theme-color`, and the `apple-touch-startup-image` launch-screen links) are hand-written in `index.html`.
- **Icons** (`public/pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`) **and `favicon.svg`** are generated from the "W" mark by `scripts/gen-pwa-icons.mjs` (`npm run icons`, uses `sharp`). The "W" (and the WH11ED wordmark on the screenshots) is drawn in the **display font Sofia Sans Extra Condensed 800** — the same `var(--font-display)` as the headings. Since `sharp`/librsvg can't resolve the `@fontsource` woff by family name, `scripts/lib/w-mark.mjs` extracts the glyph **outlines** with `opentype.js` (a devDep) and emits a plain `<path>`, so the output is font-independent and reproducible from `node_modules` (no system-font install). Compose glyph-by-glyph via `charToGlyph` — `font.getPath(string)` throws on this font's `ccmp` GSUB lookup. The install-dialog **screenshots** (`public/screenshot-{wide,narrow}.png`, `npm run screenshots`) and **iOS launch screens** (`public/splash/apple-splash-*.png`, `npm run splash`) use the same helper (branded `#242428` + "W", not real UI captures — swap for real ones later if desired). The splash `<link>` media queries in `index.html` must stay in sync with the device list in `scripts/gen-ios-splash.mjs`.
- **Install affordance:** Chromium fires `beforeinstallprompt` → a custom "Install app" item in the settings menu calls the native prompt (`useInstallPrompt.js`). iOS has no such event, so on iOS Safari (detected in `useInstallPrompt.js`, excludes in-app/non-Safari browsers and standalone) the same menu item opens `InstallHintModal.vue` with the "Add to Home Screen" steps (EN/RU in `i18n/ui.js`).
- **Shell precache + lazy images:** `workbox.globPatterns` precaches only the app shell — JS/CSS/HTML, SVG, the root PWA icons (`png`), **and** the fonts (`.woff2`) — a few MB, so a tab loads fast. `globIgnores: ['**/images/**']` keeps `/images/**` out of the precache; those are served by a CacheFirst `runtimeCaching` rule (cache `wh11ed-images`, stable non-hashed names, `maxEntries` bounds growth). Fonts (Inter, EB Garamond) and bootstrap-icons are **self-hosted** via `@fontsource` + the `bootstrap-icons` package, imported in `src/fonts.js` (no external CDN), so their hashed woff2 are precached. Weights mirror the former Google Fonts request (Inter 400/500/600/700/800; EB Garamond 400/600/700 + 400 italic); `@fontsource` ships all subsets incl. Cyrillic for RU. To change fonts/weights, edit `src/fonts.js`.
- **Offline warm-up (installed app):** a tiny inline Vite plugin in `vite.config.js` walks `public/images/**` at build and emits `dist/image-manifest.json` (the list of every `/images/**` URL). `src/composables/useOfflineWarmup.js` (kicked off from `App.vue` via `OfflineWarmupToast.vue`) runs **only** when standalone (`isStandaloneDisplay()`) + online: it fetches the manifest and then every image (bounded concurrency) so the CacheFirst route fills `wh11ed-images` → full offline. It's idempotent via `localStorage['wh11ed-offline-warmed']`, keyed to a checksum of the manifest, so it runs once after install and **re-runs only when a deploy changes the image set**. The `OfflineWarmupToast` shows an unobtrusive "Preparing offline… N/Total" → "Ready to use offline" chip (labels `warmingOffline`/`offlineReady` in `i18n/ui.js`); a normal tab never warms and never shows it.
- **Updates (silent, no button):** `registerType: 'prompt'` (NOT `autoUpdate`), but there is **no longer an "Update" button** — `UpdateToast.vue` is now a **headless** component (renders nothing) that registers the SW via `useRegisterSW()` (`virtual:pwa-register/vue`) and applies updates automatically. A new deploy downloads in the background; once `needRefresh` flips true it's applied at a moment that won't interrupt play: a **normal browser tab** applies + reloads immediately (state survives via `localStorage`); the **installed PWA** applies at a *safe* moment — on returning to the foreground (`visibilitychange`) or when leaving the live game screen — but **never while on an active tracker game** (`route.path` starts with `/tracker/game`), so we don't reload mid-game. `cleanupOutdatedCaches` purges stale **precache** on activation (it does **not** touch the `wh11ed-images` runtime cache — that's bounded by `maxEntries` and relies on the rename-on-change rule). Works only if the SW itself isn't long-cached — see Deployment. (Under prompt mode the registration is bundled via `workbox-window`; no separate `registerSW.js` is emitted.) **The SW is only checked for updates at registration by default, so `UpdateToast.vue`'s `onRegisteredSW` polls `registration.update()` hourly + on return to the foreground (guarded by `navigator.onLine`)** — otherwise a kept-open tab or a backgrounded installed PWA never learns about a new deploy.
- **Resume last view (standalone only):** in the installed PWA the app reopens on the last page *and* the section the user was reading; a normal browser tab is untouched. Standalone is detected via `isStandaloneDisplay()` (`src/composables/standalone.js`, the single source for `display-mode: standalone` / iOS `navigator.standalone`). The last location is stored in `localStorage['wh11ed-last-route']` as `path` or `path#section-anchor`. **Restore** is a one-time `router.beforeEach` in `src/router/index.js` (runs before the first view mounts, so it never flashes home; skips deep links and `/tracker/auth-callback`). **Persistence** lives in `useViewRestore.js` (called once in `App.vue`): since scrolling never changes the URL hash, a rAF-throttled scroll-spy (`currentSectionId()`) records the topmost section anchor — `section-*` / `ability-*` / Event Companion `step-*`,`missions-*`,`pairing-*`,`ranking-*` ids — and writes `path#anchor` back; on launch it re-runs the robust `scrollToAnchor()` (extracted from `useRefNavigation.js`) to correct for late-loading illustrations.

## Motion & animations

All motion is hand-rolled Vue `<Transition>`/`<TransitionGroup>` + native CSS — **no animation
libraries** (don't add GSAP/@vueuse/motion/animate.css).

- **Motion tokens** live in `src/style.css` (`--motion-fast .15s`, `--motion-med .22s`,
  `--motion-flash .45s`). **Every animation must derive its duration from a token** — the single
  `@media (prefers-reduced-motion: reduce)` override there zeroes all three, disabling motion
  app-wide in one place. Don't hard-code seconds (older hover micro-transitions still do; new work shouldn't).
- **Reusable global transition classes** (also in `style.css`, use by `name=`): `fade` (opacity,
  single toggled elements), `list` (opacity + `position:absolute` leave + `list-move` FLIP, for
  `TransitionGroup` lists — the list container needs `position: relative` to contain leavers),
  `fade-pop` (dropdowns/anchored menus), `slide-up` (fixed bottom bars). `.vp-flash` is the
  value-change color pulse re-triggered by `useFlashOnChange.js`.
- **`CollapseTransition.vue`** — shared height-collapse wrapper for accordions/disclosures of
  **unknown/variable height** (rule bodies, briefings, legends). **State-driven: pass the open state
  as `:show`** (not a `v-if`/`v-show` inside the slot — the wrapper hides the collapsed content
  itself). Pure CSS via the grid `0fr → 1fr` row trick (inner clip is `overflow:hidden;
  min-height:0`), so padding/margins collapse for free with no per-frame padding/box-sizing churn and
  no synchronous `scrollHeight` read — this is what fixed the mobile jank of the old Web-Animations
  version. `contain: layout paint` scopes the reflow to the subtree; collapsed content leaves the
  a11y tree via delayed `visibility`. Duration is `--motion-med`, so reduced-motion (token → 0)
  collapses instantly. Slot may have any number of root nodes. Used by `SubRuleBlock`, the tracker
  picker modals (`Twist/Mission/SecondaryPickerModal`), `ScoringModal` (briefing), `ScoreBreakdown`,
  `EventLayoutsView` (LAYOUTS KEY), and `NavSidebar` (both the section- and group-level drawer
  accordions). Prefer it over per-component `max-height` caps — don't reintroduce them.
- **`BaseModal` animates open only** (`<Transition name="modal" appear>`); **close is intentionally
  instant** — a leave phase races the focus-restore in `useModalA11y.js`. Don't "fix" it.
- **Page transitions**: `App.vue` wraps `<RouterView>` in `<Transition name="fade" mode="out-in">`
  keyed on `$route.path`. Kept at `--motion-fast`; scroll-to-anchor (`scrollToAnchor` in
  `useRefNavigation.js`) polls the DOM for ~1.5s so the short mount delay doesn't break it.

## Deployment

Hosted at **wh11ed.ru** on a **Yandex Object Storage** bucket (`wh11ed.ru`) behind **Yandex CDN**. Deploy with `npm run deploy` (runs `deploy.sh`), which builds and `aws s3 sync`s `dist/` with tiered `Cache-Control`:

- `assets/*` (content-hashed, incl. `workbox-*.js`) → `public, max-age=31536000, immutable`
- images / favicon / PWA icons / `og-image.png` (stable names) → `public, max-age=31536000`
- `sw.js` / `registerSW.js` / `manifest.webmanifest` → `no-cache` (**must** revalidate, or PWA updates never reach clients)
- `robots.txt` / `sitemap.xml` → `public, max-age=3600` (1 h — excluded from the 1-year tier so crawlers pick up changes; a stale sitemap would otherwise be served for a year; `sitemap.xml` is **generated** into `dist/` by `scripts/gen-seo-routes.mjs`, there is no static copy in `public/`)
- `index.html` → `public, max-age=3600` (1 hour) — uploaded via `aws s3 cp`, **not** `sync` (sync silently skips it: stable name + constant size defeats its size/mtime check, leaving a stale entry point that points at `--delete`d assets → broken site after purge). Don't change it back to `sync`.
- **SEO route keys** (step 3b) — an `index.html` copy under every path from `dist/.seo-routes.txt` (1 h, forced `text/html`), so deep links return 200 (see Architecture). These keys exist only in the bucket, not in `dist/` — step 2 derives `--exclude`s for their top-level segments so its `--delete` never removes them. Removed routes leave stale keys; harmless (SPA shows its noindex 404).

`deploy.sh` **auto-bumps `package.json` (`BUMP=patch` by default)** before building — use `BUMP=none npm run deploy` to ship the current version as-is, or `BUMP=minor`/`major`. When it bumps (`BUMP` ≠ `none`), it also **commits + pushes** the bump (`chore: release vX.Y.Z`) to `origin main` once the deploy succeeds — so deploy from `main` with a clean tree (uncommitted changes outside `package.json`/`package-lock.json`, or being on another branch, aborts the deploy before it builds anything).

Uploads via the S3-compatible API (endpoint `storage.yandexcloud.net`, AWS CLI profile `yc`). **The CDN purge now runs automatically** at the end of `deploy.sh`: `CDN_RESOURCE_ID` is read from the gitignored `.env.deploy` (copy `.env.deploy.example`) and `yc` is resolved even off-PATH (`~/yandex-cloud/bin/yc`); a purge failure warns instead of aborting (upload is already done). Override with another id, or run `CDN_RESOURCE_ID= npm run deploy` to skip. Manual fallback: `yc cdn cache purge --resource-id <cdn-resource-id> --path '/*'`. The CDN resource must cache **according to origin headers** (honor-origin) or it overrides per-file `Cache-Control` with a single TTL. Because images are cached a year under stable names, **rename a file when you change an image** (or the browser keeps the old one). Full runbook: `DEPLOY.md`.
