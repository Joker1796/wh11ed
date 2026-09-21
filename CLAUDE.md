# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**WH Rules** is a bilingual (EN/RU) app for **playing Warhammer 40,000 11th edition** — live at
[wh-rules.ru](https://wh-rules.ru). It began as a rules reference and that is still its foundation,
but the centre of the product has moved: the arc is now **look a rule up → build the army list →
run the game with that list's rules applied** (the roster builder, and the modifier overlay the
tracker shows on a unit's card). Position it that way in any user-facing copy. This repo is the
frontend, and the frontend is ~99% of the product: every rule, every page, the roster builder and
the tracker all live here, with no backend involved — **and nothing in the app requires an
account**; signing in only syncs lists and history between devices.


> **Имя продукта — «WH Rules»** (`short_name` в манифесте, iOS-title, og:site_name, JSON-LD,
> вордмарк на скриншотах установки); полное — «Warhammer 40,000 11th Edition — Rules, Rosters &
> Game Tracker». Старое `WH11ED` в UI/метаданных не осталось. **Но `wh11ed-*` ключи `localStorage` и
> имя рантайм-кэша `wh11ed-images` НЕ переименовывать** — это пользовательские данные: смена
> префикса потеряет всю историю партий, избранное и настройки, а смена имени кэша заставит
> установленные PWA заново качать ~27 МБ картинок.

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
- **The linter is a gate, not a style opinion.** `npm run lint` (ESLint + `eslint-plugin-vue`,
  config in `eslint.config.js`, a step in `ci.yml`) reports nothing on a clean tree, so anything
  it says is new. It formats the templates too (one attribute per line, plugin indentation) — so
  **a line break in a template is not free**: Vue's `condense` turns the break between a tag and
  its text into a real space. Harmless where the text is an element's only child (a block box
  drops edge whitespace), visible where it sits in an inline flow beside a sibling — which is why
  the footer version, the back-links and the print card's assembled lines are written the way
  they are. Never build an output string out of adjacent template fragments; build it in script.
  Every opt-out in that config carries its reason in a comment — read it before switching a rule
  on or off. Tests are Vitest (`npm test`).

**Where to start:** *Architecture* below is the map — the data→view pipeline and the navigation
model. This file is the engineering reference; `README.md` is the product overview for users.

**Most of the detail lives in a scoped `CLAUDE.md`**, loaded contextually instead of living here.
Read the one for the directory you're touching:

| Where | What it covers |
|---|---|
| `src/data/CLAUDE.md` | bilingual conventions, generated sidecars, the data gates, RU search aliases, `/help` content |
| `src/components/CLAUDE.md` | motion, shared UI primitives, modal chrome, square corners, what the phone demands |
| `src/components/core/CLAUDE.md` | Core Rules (one page, seven chapters) |
| `src/components/event/CLAUDE.md` | Event Companion |
| `src/components/tracker/CLAUDE.md` | Game Tracker |
| `src/components/tracker/stats/CLAUDE.md` | Statistics — the battle-record page |
| `src/components/roster/CLAUDE.md` | Roster Builder |
| `src/views/faction/CLAUDE.md` | faction pages |
| `src/views/combat-patrol/CLAUDE.md` | Combat Patrol |
| `public/images/CLAUDE.md` | image pipeline |
| `DEPLOY.md` | PWA, caching, the deploy runbook |

This file is the map: what the app is, how it is laid out, how a route becomes a page, and the
invariants with no single directory to live in.

## How this repo relates to the others

The product is split across separate repositories, cloned side by side into one working folder.
They are **not** submodules: each versions and deploys independently.

| Repo | What it is |
|---|---|
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
npm run lint     # GATE: ESLint + eslint-plugin-vue (see eslint.config.js; runs in CI)
npm run deploy   # build + upload to the Yandex Object Storage bucket (see Deployment)
npm run sync     # audit all data against wh40k-appdata: version check + sourceIds + faction structure/text/tracker/core diffs (report-only) — see DATA-SYNC.md for the full update procedure
npm run sync -- --baseline  # re-record scripts/lib/sync-baseline.json (the accepted findings the report above suppresses) — read the diff before committing it
npm run sync:text    # just the faction rule/stratagem/enhancement/ability PROSE diff vs appdata (errata drift; a slug or --all)
npm run sync:mfm     # audit datasheet points against src/data/mfm/* (scraped from the live MFM by scripts/scrape-mfm.py); --write applies the diff — see DATA-SYNC.md
npm run omissions    # GATE: fail when appdata's Core Rules say something wh11ed's transcription does not (see Data gates)
npm run parity       # GATE: EN↔RU parity — factions, rulebook, datasheets, missions/CP/FAQ (see Data gates)
npm run detmeta      # GATE: a faction page's detachment dp / Force Disposition vs the MFM (see Data gates)
npm run wtags        # GATE: every weapon tag printed on a datasheet must have text somewhere (see Data gates)
npm run dsrules      # GATE: a named rule appdata files on a datasheet must be on ours too (see Data gates)
npm run coregrants   # GATE: a rule that hands a unit a core ability must say so in the modifier layer (see Data gates)
npm run emphasis     # GATE: emphasis the canon carries that our prose dropped (see Data gates)
npm run layouts      # GATE: the 45 layout diagrams against the app's own artwork (see Data gates)
npm run companions   # GATE: the four Event Companion PDFs — version + the FAQ appdata does not carry
npm run radii        # fail on any border-radius outside the listed exceptions (see Corners & surfaces)
npm run dupes        # fail when one CSS rule body is copied into 3+ components (see Shared UI primitives)
npm run a11y         # GATE: render a sample of pages in Chrome (needs dist/) — text contrast in both themes, 24px tap targets, no sideways scroll; baseline in scripts/lib/a11y-baseline.json (see src/components/CLAUDE.md)
npm run imghash      # GATE (also in CI): fail when an image under public/images/ was edited in place instead of renamed (see PWA)
npm run images:webp  # convert new illustration jpg/png in public/images/ to WebP (see Image organization)
npm run faction-rules:index  # regenerate the faction-rules name index for search (see Search)
npm run phases:index # regenerate the per-phase rule index the tracker's phase reminder reads (see Game Tracker)
npm run icons        # regenerate PWA / home-screen icons from the "W" mark (see PWA)
npm run screenshots  # regenerate the manifest install-dialog screenshots (see PWA)
npm run splash       # regenerate the iOS apple-touch-startup-image launch screens (see PWA)
```

**Lint:** `npm run lint` — ESLint with `eslint-plugin-vue`; `eslint.config.js` records, for every rule that is off, why. **Tests:** Vitest (`npm test` = `vitest run`, `npm run test:watch`), config in `vitest.config.js` (jsdom env, `src/test-setup.js` installs a clean in-memory localStorage). Specs live next to source as `src/**/*.test.js`: pure scoring/BP/winner logic (`gameScoring.test.js`), pure tracker helpers (`useTracker.helpers.test.js`), the module-singleton store with `vi.resetModules()` between cases (`useTracker.store.test.js`), components via `@vue/test-utils` (`ScoreBoard`/`GameSetup`/`modals`), the search index (`useSearch.test.js`), and the cloud-backup layer with `vi.mock`'d auth/tracker deps (`useCloudSync.test.js`). Test files are not imported by the app, so they never reach the build/precache.

## Architecture

Vue 3 SPA using HTML5 history routing (`createWebHistory`) — clean paths like `/core-rules`, each indexable by search engines. No backend. All content is static JS data files.

**History-mode SEO machinery** (how deep links work on a static bucket):
- **Every route key gets its OWN generated HTML** (real `<title>`, description, canonical/hreflang and a real body — a datasheet page carries its statline, weapons, abilities and keywords) built by `scripts/gen-seo-routes.mjs` into **`seo-html/`**. 🔒 **That directory must never move into `dist/`**: `workbox.globPatterns` precaches `**/*.html`, so 3141 pages in `dist/` would land in the service worker's precache and destroy the light-tab requirement. Titles come from `src/composables/seoMetaData.js` — the same module the app uses at runtime, so the crawler and the reader can't be shown different things. Who sees this markup: crawlers and first-time visitors; anyone with the service worker installed gets the cached shell via `navigateFallback` and never does.
- The bucket serves `index.html` as its ErrorDocument (HTTP **404**) for unknown paths — fine for users, but crawlers skip 404s. So the deploy uploads a page under every public route key (`introduction`, `event-companion/missions`, …) → those return **200**. The route list + `sitemap.xml` are generated by `scripts/gen-seo-routes.mjs` (runs as part of `npm run build`; auto-picks up faction/datasheet pages from data files when they exist). `STATIC_ROUTES` in that script must be kept in sync when adding a page.
- **The locale is part of the path: EN is the bare URL, RU lives under `/ru/…`** (moved off `?lang=ru` on 2026-08-26 — the bucket keys objects by path only and the CDN ignores query strings, so the two languages were literally the same object; the bucket keys objects by path only). One route record serves both, via the optional `/:lang(ru)?` segment from `src/router/locale.js`. **Any comparison against a route path must go through `stripLocale()`** — a bare `route.path.startsWith('/roster')` silently stops matching in Russian. Links may stay written bare (`to="/rules"`); a router guard adds the prefix for a Russian reader.
- Per-route `canonical`/`og:url`/`hreflang` are set at runtime by `useSeoMeta.js` — **never hardcode them in `index.html`** (every deep URL serves the same file; a static canonical would collapse all pages into `/`).
- Unknown paths render `NotFoundView` (catch-all route) which injects `noindex` while mounted.
- Old `/#/path` links are rewritten by a tiny inline shim at the top of `index.html` (`location.replace`, keeps the query even inside the hash — the pre-migration OAuth callback relies on that). Keep the shim — it's what makes old bookmarks/shared links work forever.


**First-visit card** (`WelcomeModal.vue` + `useWelcome.js`, key `wh11ed-welcome-seen`): three facts
a reader cannot get from the screen — what is here, that the *installed* app goes fully offline, and
that their lists live on the device — plus a link to `/help`. **Landing page only**: most visitors
arrive from a search engine straight into a rule and are mid-question, and a card across that is an
interruption, not a welcome. Shown once; dismissing (or following the link) is permanent, and the
decision is taken on mount rather than in a route watcher, so navigating to `/` later in a session
never raises it.

**Navigation model:** Two levels.

- **Top navbar** (`App.vue`) — sections "Core Rules", "Event Companion", "Tracker", "Factions". (The `/links` page of source PDFs is deliberately NOT in the navbar or the drawer — only its card on the landing page links to it.) `isEventRoute` (path starts with `/event-companion`) and `isTrackerRoute` (starts with `/tracker`) switch which subnav renders. **Factions** is a `.nav-dropdown`: the link still navigates to `/factions`, but on **hover / focus-within** (desktop only — `.navbar-links` is `display:none` ≤900px) it opens a pure-CSS grouped mega-menu of all factions (2-column grid from `data/factionsIndex.js` via `groupLabelKey`, links to `/factions/:slug`, "coming soon" for non-ready). No JS state — reveal is CSS `:hover`/`:focus-within` with a transparent `padding-top` bridge.
- **The account lives in the navbar, not in a section** (`AccountMenu.vue`, `useAccountActions.js`).
  Both the tracker's history and the roster builder's lists sync through one account, but until
  2026-09-01 the only sign-in button was on the tracker home and the roster list simply told the
  reader to go there. Desktop gets its own button in `.navbar-actions` (a `fade-pop` dropdown, the
  gear menu's recipe); ≤900px it hides and the same two entries sit inside the **⚙ menu**, next to
  the theme and lore toggles — the mobile navbar keeps its four buttons. `login(provider, returnTo)`
  stashes the current path in `sessionStorage` and `AuthCallbackView` spends it, because the backend
  always redirects to one fixed path (`APP_AFTER_LOGIN_URL`) whichever page you started from —
  changing that path means deploying `wh11ed-api`, returning to it costs nothing. `App.vue` calls
  `ensureSession()` once on boot (it used to be the tracker's job, on entry), and the tracker home
  and roster list re-run their sync pass on a status change, for a sign-in with no page load behind
  it. The section screens report sync state only; neither offers a way in.
- **Subnav** (sticky bar below navbar) — for Core Rules: **anchor** links (Introduction / Basic Rules / Battle Round / Battlefields / Advanced / Reference / Muster), since all seven are chapters of the one `/core-rules` page; the highlight follows the scroll-spy (`activeSectionId` in `useActiveSection.js`), not the URL. For Event Companion, the same anchor-link recipe on the merged `/event-companion` page: Introduction / Sequence / Missions / Terrain & Layouts / Pairings / Teams / Doubles / FAQs. For Tracker: Game Tracker / Current Game / Stratagems. The `/stratagems` page rides with the **tracker** subnav (`subNavItems` returns `trackerSubNavItems` when `isTrackerRoute || isStratagemsRoute`) so reaching it from the tracker keeps those tabs in view (desktop has no "Back to game" bar).
- `router/index.js` exports `navGroups`/`navGroupsRu` (Core), `eventGroups`/`eventGroupsRu` (Event), **and** `trackerGroups`/`trackerGroupsRu` (Tracker); `NavSidebar.vue` renders all three as labelled mobile sections.
- **Mobile** (≤900px): the navbar links + subnav are hidden; a hamburger opens `NavSidebar.vue` (the drawer, for in-section navigation) and a fixed **bottom nav** in `App.vue` with **five fixed** icons: Rules / **Rosters** (`/roster`) / **Factions** / **Stratagems** (`/stratagems`) / Tracker — nothing appears or disappears under the thumb. **Factions** is a `<button>` (not a link) that opens `FactionsNavModal.vue` — a lightweight grouped faction list (driven by the light `data/factionsIndex.js`, links to `/factions/:slug`, closes on pick). A sixth, **conditional** «Units» item used to be inserted here (on any faction-with-slug page, and — pointing at the "You" player's faction — anywhere during a tracker game); it was **removed** in favour of a button on the player's card in the tracker (`RoundTracker.vue`), which knows *whose* faction it is and so reaches the opponent's datasheets too, while the faction pages already carry their own Rules/Units tabs in the hero (`FactionLayout.vue` → `MobileUtilityBar`). `isUnitsRoute`/`unitsNavPath` went with it, and **Factions** simply lights on any faction route again. The bottom nav uses its own short RU labels (`navCoreRulesShort` «Правила», `navStratagemsShort` «Стратагемы»; Factions reuses `navFactions`) so they fit; the top navbar keeps the full names (Event Companion stays in the top navbar/drawer — Missions is no longer in the bottom nav, only reachable via the Event subnav/drawer). `isStratagemsRoute` highlights its item. The bottom-nav is an always-dark surface, so the active item uses `--accent-on-dark` (the light theme's `--accent` is invisible on it); the Factions `<button>` gets a native-chrome reset (`button.bn-item`).
- **Mobile utility bar** (`MobileUtilityBar.vue`, mobile only, floats just above the bottom nav): one shared strip of small icon buttons for everything that would otherwise fight over that corner — additive, not exclusive, all can show together: **resume** (a game in progress, `useTracker().current.phase === 'playing'`, on any non-tracker/non-landing route with no full-screen modal/drawer open — `showResumeGame` in `App.vue`) → an icon button to `/tracker/game`; **faction tabs** (on a faction hero page with its in-page tab nav scrolled out of view) → the mobile equivalent of the desktop FAB column below, contributed via `useContributeMobileActions('faction-tabs', …)` in `FactionLayout.vue`; **resume roster** (a creation wizard left mid-build — `resumeDraftId` in `App.vue`, fed by `useRosterDraftResume.js`) → a chip back to *that* draft, `?draft=<id>` and all, because the wizard resumes by id and a bare `/roster/new` would start a second one; **back-to-top**, always rightmost, only once actually scrolled past the threshold. The bar itself hides only when none of them apply. Both resume chips are **text**, not icons, and both are session-scoped by design — a game in progress and a draft you just walked away from, not every draft you ever left (see `src/components/roster/CLAUDE.md`). A shared `--mobile-bar-h` var (set on `.app-layout`, sized whenever the bar is visible) lifts the content bottom-padding and the offline-warmup toast above it so nothing overlaps. Back-to-top's scroll-threshold logic (`useBackToTop.js`) is shared with the desktop-only `BackToTopButton.vue` and `FactionLayout.vue`'s own FAB. The reverse case — a fixed bar from a *view* claiming that same bottom-right corner, like the Roster Builder wizard's Back/Next bar (`RosterCreateView.vue`'s `.rc-sticky`, see `src/components/roster/CLAUDE.md`) — doesn't move; `App.vue` reserves its height in `--roster-sticky-h` (`.app-layout:has(.rc-sticky)`) and `MobileUtilityBar`'s own bottom offset adds it, so the utility bar rises above it instead of overlapping it and blocking the click.

**Data → View pipeline:**

```
src/data/*.js  →  src/views/*View.vue  →  src/components/RuleBlock.vue
```

Each view imports its data file, iterates sections/subsections, and renders them via `RuleBlock` (the universal rule renderer). Views handle special cases themselves.

**The Core Rules are one page** (`/core-rules`) and **the Event Companion is one page too**
(`/event-companion`) — each renders all of its chapters at once (seven and eight respectively),
each chapter its own component (`content-visibility: auto`, `scrollToAnchor()` for in-page jumps, former per-chapter
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

**Search** (`Ctrl+K`) — `useSearch.js` builds a flat index lazily (per locale) from all data files. Searches `title`, `sectionNum`, `body`, `note` fields. **Name/alias matching is apostrophe-blind** (`foldName`: lowercase + ё→е + strip `’'` — so «ктан», «к'тан» and "ctan" all reach C’tan); body/title matching keeps the 1:1 `foldYo` only, because the snippet slicing reuses folded-string indices against the original text — don't fold apostrophes there. The final answer is capped at **20** results (a class-wide alias like «терминатор» legitimately matches more than ten datasheets). **Faction landing pages are searchable by name** — EN names from `factionsIndex.js`, RU aliases from `src/data/factionAliasesRu.js` (its own module so the strings ride in the search chunk, not the root bundle), scored above name-only hits so the faction's page leads its units. **Datasheet units are searchable by name** via `src/data/datasheetIndex.js` — a compact generated name-only index (`npm run datasheets:index`, re-run after adding or renaming a unit), dynamic-imported when the palette opens so the heavy per-faction datasheet files never ride in the search bundle. **Faction army rules/detachments/stratagems/enhancements are searchable by name** the same way, via `src/data/factionRulesIndex.js` (`npm run faction-rules:index`, re-run after adding/renaming/renumbering any of those) — a full-text version was tried and rejected (~3.5 MB, too heavy for a chunk fetched just by opening the palette in a browser tab); names only keeps it light. Clicking a detachment/stratagem/enhancement result calls `useFactionChoice().setDetachment()` (and `setChapter()` for a chapter-locked one) **before** navigating, because `FactionRuleView` only renders the currently-active detachment — its section wouldn't exist in the DOM to scroll to otherwise. A stratagem/enhancement result anchors to its **own card**, not just the detachment heading: `StratCard`/the enhancement `<article>` in `FactionRuleView.vue` carry `id="strat-<detId>-<slug(name)>"`/`id="enh-<detId>-<slug(name)>"` (`slugify()` in `src/data/slugify.js`, shared with the generator so the two always agree), and `gen-faction-rules-index.mjs` bakes the same id into each entry's `id` field. **A result whose title stays English by convention (stratagems, enhancements, detachments, missions, twists) also carries `titleRu`** in the RU locale — the same translated-subline pairing `StratCard`/`RuleBlock`/`MissionCard`/`TwistCard` render on the page itself — and `SearchModal.vue` shows it as a small muted line under the title. `useSearch.js` reuses each source's own `nameRu`/`titleRu` field; adding a name-stays-English item type to search should populate this the same way rather than leaving results EN-only in RU. **Each army-rule/detachment-rule body's `### English | Russian` h4 subheadings** (Vows/Doctrines/Stances-type sub-rules) are searchable too — `gen-faction-rules-index.mjs`/`gen-combat-patrol-search-index.mjs` extract them via `src/data/extractSubheadings.js` and anchor them with `h4AnchorId(ruleId, n)` (`src/composables/anchors.js`), the same id `RuleBody.vue` computes when rendering `### ` lines, so a hit lands on the exact subheading. The RU caption comes from the RU-locale-merged body, not the EN source — see the generator's `subheadings()` comment for why (a translator sometimes replaces the heading outright instead of using the pipe form, so both EN and RU bodies are parsed and paired by position). A detachment-rule's `RuleBlock` needs its own `:id` (`` `${det.id}-rule` `` in `FactionRuleView.vue`) for this to have anywhere to anchor to — the army-rule one already had one (`armyRule.id`). **Combat Patrol (`/combat-patrol/:slug`) has its own compact search index**, `src/data/combatPatrolSearchIndex.js` (`npm run combat-patrol:index`) — same names+subheadings shape as `factionRulesIndex.js`, generated from `combatPatrol.js`/`combatPatrolRu.js` (whose overlay already carries `nameRu` directly on each entry, no separate name-dictionary indirection). No detachment to select before navigating (a CP box has exactly one fixed rule/army-rule/roster); `CombatPatrolFactionView.vue`'s `RuleBlock`s/`StratCard`s/enhancement `<article>`s carry `cp-<slug>-rule` / `cp-<slug>-army-rule` / `cp-strat-<slug>-<slug(name)>` / `cp-enh-<slug>-<slug(name)>` ids matching the generator. **Recent queries** (`useSearchHistory.js` — module singleton + `localStorage`, key `wh11ed-search-history`, 7 entries) fill the palette's empty state in place of the "type 2 characters" hint; arrow keys and Enter walk whichever list is on screen. A query is recorded in `navigate()`, i.e. only once it took the user somewhere — recording on every keystroke would store the prefixes of one real search. Queries are stored, not result objects, because datasheet/detachment ids move with each appdata bump and a stored result would rot into a dead anchor. Import the composable **only from `SearchModal.vue`**: the modal is `defineAsyncComponent`-split to keep `useSearch.js` out of the root bundle, and an import from `App.vue` would drag the history back into it.

**Keyword popover** — `useKeywordPopover.js` is a singleton; any click on `.keyword` span opens `KeywordPopover.vue` with the ability text looked up from `reference.js` (`coreAbilities`) / the Event Companion glossary. **Perf:** those two big data files are **dynamically `import()`ed on first keyword click** (not statically), so they stay out of the entry chunk that loads on every page — `open()` is async. Keep it that way (don't re-add a static import).

**Stratagem cards** — `StratCard.vue` renders core rulebook stratagems in `ChapterBattlefields.vue` (`src/components/core/`, section 15) **and** on the standalone **`StratagemsView.vue`** (`/stratagems`) — a stripped-down game-time quick reference (just the card grid, no surrounding prose), reusing the same EN/RU `useBilingualSections` merge to pull section 15's `stratagems`. That page is reachable only via the mobile bottom-nav (and direct URL on desktop) — deliberately not in `navGroups`/`NavSidebar`/the top navbar. **When a tracker game is in progress** (`useTracker().current.phase === 'playing'`) it also shows each player's **detachment** stratagems behind a filter bar (**All** / Core / Mine / Opponent's). **All is the default while a game is on** — mid-game the question is "what can anyone play right now", not "whose deck am I in" — and in it each detachment card's sublabel is prefixed with its owner's name, because two players can field the SAME detachment and the two copies are otherwise identical (that prefix is also what keeps their `stratKey`s apart). With no active game the page stays core-only with no filters. Detachment stratagems come from the faction rules data (`data/factions/*`), **dynamically `import()`ed** so the heavy faction bundle never enters this page's chunk unless a game is on. MFM detachment names (from the tracker) are matched to faction-data detachments **apostrophe/case-insensitively**, and the five Codex-sharing chapters (Black Templars, Blood Angels, Dark Angels, Deathwatch, Space Wolves) fall back to `space-marines` data for the shared detachments (Gladius Task Force, etc.). RU cards + name sublines reuse the faction RU overlay (`loadFactionRu`/`deepOverlay`/`stratNamesRu`, same as `useFactionPage`).

A **"By phase / As list" toggle** (persisted to `localStorage['wh11ed-stratagems-by-phase']`) regroups the visible cards into collapsible per-phase accordions (Command / Movement / Shooting / Charge / Fight / Any, via `CollapseTransition`, **closed by default**). Phase is derived from the **English** `when` timing text by `src/composables/stratagemPhases.js` (`phasesOf`) — never the localized string — so the grouping is identical EN/RU (core keys off `battlefields.en` §15 by index, detachment strats off `data.en`). A stratagem spanning several phases ("…Shooting phase or the Fight phase") shows under **each** of them; the `any` group is reserved for stratagems that literally work in "any phase" (plus a no-phase-detected fallback). On ≤480px the toolbar's toggle collapses to icon-only so all buttons fit one row.

**Faction pages** (`FactionRuleView.vue`/`FactionDatasheetView.vue`, army choice persisted via
`useFactionChoice.js`, `FactionPickerBar.vue`) — see `src/views/faction/CLAUDE.md`.

**Combat Patrol** (`/combat-patrol/:slug`, fixed-roster starter-box content, its own compact
search index) — see `src/views/combat-patrol/CLAUDE.md`.


## Bilingual content, sidecars and gates

The EN/RU conventions, the generated sidecars (`sourceIds.json`, `conditionalKeywords.json`, the
SM-Chapter datasheet fold), the five gates that fail a build and the RU search aliases are all in
`src/data/CLAUDE.md`. **Read it before touching any rule text** — the characteristic bug in this
repo is an EN↔RU desync, and that file is where the rules against it are written down.

## UI conventions

Motion, the shared primitives in `style.css`, modal chrome, square corners (`npm run radii`) and
the phone-first rules including vertical density: `src/components/CLAUDE.md`.

## PWA and deployment

The precache split (light tab, full offline on request), the offline warm-up, silent updates,
cache tiers and the deploy runbook: `DEPLOY.md`.

## Game Tracker

Third top-level section (`/tracker`) — a client-side, offline 2-player VP tracker for a game
of 40k 11th ed. **Not part of the rules-reference data pipeline above.** See
`src/components/tracker/CLAUDE.md` for the setup wizard, scoring, secondaries, twists and
data shapes. **Statistics** (`/tracker/stats`) reads those finished games back as a battle record —
win rate, turn order, matchups, secondary cards, per-roster records — see
`src/components/tracker/stats/CLAUDE.md` (in particular the `MIN_SAMPLE` rule: no percentage under
five games). **Roster Builder** (`/roster*`) is its own top-level nav section (next to
Tracker, not nested in it) and hands a built roster off to this one — see
`src/components/roster/CLAUDE.md`. Its two building screens have a **third layout above 1200px**
(added 2026-09-01): settings on one bar, then catalogue / list / the chosen unit's fields as three
columns. That is the only screen with a width of its own — `main-content--desk` in `App.vue`,
1600px, inside a `min-width: 1200px` query so nothing below the threshold moves.


## Adding content

**New core-rules section** — see `src/components/core/CLAUDE.md`.

## Image organization

`public/images/` — one folder per rules chapter, WebP conversion pipeline (`scripts/gen-webp.mjs`), the `AppImage` rendering component, and the illustration re-cutting recipe. See `public/images/CLAUDE.md`.

