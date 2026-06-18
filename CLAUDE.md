# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run deploy   # build + upload to the Yandex Object Storage bucket (see Deployment)
```

No test suite or linter configured.

## Architecture

Vue 3 SPA using hash-based routing (`createWebHashHistory`). No backend. All content is static JS data files.

**Navigation model:** Two levels.

- **Top navbar** (`App.vue`) — two sections: "Core Rules" and "Event Companion". `isEventRoute` (path starts with `/event-companion`) switches which subnav renders.
- **Subnav** (sticky bar below navbar) — for Core Rules: route links (Introduction / Basic Rules / Battle Round / Battlefields / Advanced / Reference). For Event Companion: Introduction / Sequence / Layouts / Pairings / FAQs.
- `router/index.js` exports `navGroups`/`navGroupsRu` (Core) **and** `eventGroups`/`eventGroupsRu` (Event); `NavSidebar.vue` renders both as labelled mobile sections.

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
- `eventCompanion.js` — the Event Companion section (`{ en, ru }`, single objects). Exports `getEventContent(locale)` which deep-merges `ru` over `en` by index/key (RU carries only translated fields; ids/images and mission-deck card names inherit from EN). Prose pages render via `RuleBlock`; `src/views/event/` holds the views, including the interactive 5×5 `MissionMatrix.vue` on the Layouts page. The `glossary[]` feeds `KeywordPopover` for event terms; within-section links use `EC:<key>` tokens resolved by `useRefNavigation.js`.

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
- **Bold (`**…**`):** game terms are emphasized wherever the official PDF emphasizes them, in **both** languages. Do not bold things the renderer already bolds (ALL-CAPS keywords, `◈ LABEL |` info-card labels, `### h4` headings) or anything inside `seeAlso` refs / image paths.
- **EN↔RU structural parity:** the per-section counts of block markers (`▪ ◈ → ### ◆ [img:]`) must match between `en` and `ru`. After bulk edits, verify: `**` is balanced (even, no `****`), parity holds, and `npm run build` passes.

The source rulebook PDF lives in `sources/` (gitignored). Extract text with `pdftotext -layout`, and bold runs with `pdftohtml -s -i -noframes -hidden <pdf> out.html` (yields `<b>` tags).

## Adding content

**New core-rules section:** Add data to the appropriate file in `src/data/` following the `Section` shape. The search index updates automatically. If it's a new top-level nav group: add to `navGroups`/`navGroupsRu` in `src/router/index.js`, add a route, create a view.

## Image organization

`public/images/` has one folder per rules chapter (`intro`, `moving`, `coherency`, `visibility`, `command`, `turn`, `attack`, `charge`, `fight`, `terrain`, `monsters`, `attached`, `surge`, `fire`, `shoot`). Image markup references them as `[img:/images/<folder>/<name>.png|alt]`. RU variants use a `-ru` suffix on the filename (e.g. `making-a-charge-move-ru.png`).

## Deployment

Hosted at **wh11ed.ru** on a **Yandex Object Storage** bucket (`wh11ed.ru`) behind **Yandex CDN**. Deploy with `npm run deploy` (runs `deploy.sh`), which builds and `aws s3 sync`s `dist/` with tiered `Cache-Control`:

- `assets/*` (content-hashed) → `public, max-age=31536000, immutable`
- images / favicon (stable names) → `public, max-age=31536000`
- `index.html` → `public, max-age=86400` (1 day)

Uploads via the S3-compatible API (endpoint `storage.yandexcloud.net`, AWS CLI profile `yc`). Set `CDN_RESOURCE_ID` to auto-purge the CDN; otherwise purge manually after deploy. The CDN resource must cache **according to origin headers** (honor-origin) or it overrides per-file `Cache-Control` with a single TTL. Because images are cached a year under stable names, **rename a file when you change an image** (or the browser keeps the old one). Full runbook: `DEPLOY.md`.
