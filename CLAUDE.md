# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

No test suite or linter configured.

## Architecture

Vue 3 SPA using hash-based routing (`createWebHashHistory`). No backend. All content is static JS data files.

**Navigation model:** Two-level nav. Top level = route groups defined in `src/router/index.js` (`navGroups`). Second level = in-page anchor scroll to `#section-NN`. `App.vue` renders the top navbar + subnav dynamically from `navGroups`.

**Data → View pipeline:**

```
src/data/*.js  →  src/views/*View.vue  →  src/components/RuleBlock.vue
```

Each view imports its data file, iterates sections/subsections, and renders them using `RuleBlock` (the universal rule renderer). Views handle special cases themselves (e.g. `BattlefieldsView` renders stratagem cards; `BasicRulesView` renders wound table, illustrations, definitions).

**Data file shapes:**

- `basicRules.js` — `{ en: Section[], ru: Section[] }`. Bilingual; EN and RU arrays are merged by index at runtime in `BasicRulesView`.
- `battleRound.js`, `battlefields.js`, `advancedRules.js`, `reference.js` — plain `Section[]`, English only.

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

`▪` lines within an `info-card` block are appended as `items[]` to the last card row. `→` lines break out of `info-card` mode — use `▪` instead for sub-items within info-card rows.

**`useRenderInline.js`** processes inline markup in all text fields: `**bold**`, `__underline__`, `[KEYWORD]` → `.keyword` span (triggers `KeywordPopover`), `(NN.NN)` / `(NN)` → `.cross-ref` span (triggers scroll navigation), `{red/blue/green:TEXT}` → colored strong, `[def:id:label]` → clickable definition, `Unmodified N` → dice icon.

**Special subsection types:**

- `sectionNum: ''` — renders as `SectionTocBlock` (chapter TOC intro), not a `RuleBlock`
- `isGroupLabel: true` — renders as `GroupLabelBlock` (sub-group header, used in `BattleRoundView` and `BattlefieldsView`)
- `renderAfterStratagems: true` — in `BattlefieldsView`, renders after the stratagem card grid instead of before it (used for Snap Shooting 15.09)

**Cross-references** (`seeAlso: ['Rule Name NN.NN']`) are resolved by `useRefNavigation.js` and rendered by `SeeAlsoBlock`. Click navigates to `#section-NN-NN`.

**Search** (`Ctrl+K`) — `useSearch.js` builds a flat index at import time from all data files. Searches `title`, `sectionNum`, `body`, `note` fields.

**Keyword popover** — `useKeywordPopover.js` is a singleton; any click on `.keyword` span opens `KeywordPopover.vue` with the ability text looked up from `reference.js` (`coreAbilities`).

## Image organization

```
public/images/
  basics/      — datasheets, moving, coherency, engagement
  attack/      — attack sequence example diagrams
  command/     — battle-shock examples
  visibility/  — visibility rule diagrams
  move/        — move type cards + making-a-charge-move, pile-in diagrams
  shoot/       — shooting type cards
  fight/       — fight phase diagrams + consolidation
  turn/        — phase icon images (used in battle round turn structure)
  terrain/     — terrain rule diagrams
```

## Adding a new section

1. Add data to the appropriate file in `src/data/` following the existing `Section` shape.
2. If it's a new top-level nav group: add to `navGroups` in `src/router/index.js`, add a route, create a view, import in `App.vue` subnav logic.
3. The search index updates automatically.

## PDF source

`public/sources/WH40k_11ed.pdf` — the authoritative source. Always verify rule text against it when editing data files.
