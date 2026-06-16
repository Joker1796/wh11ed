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

**Navigation model:** Two levels.

- **Top navbar** (`App.vue`) — "Core Rules" link + "Factions" hover mega-dropdown. The mega-dropdown shows all 22 factions grouped into three columns (Imperium / Chaos / Xenos); data comes from `factionGroupsEn/Ru` exported by `src/router/index.js`.
- **Subnav** (sticky bar below navbar) — always visible. On core rules routes shows anchor links to `#section-NN`. On faction routes (`/factions/*`) shows three section links: Rules / Files / FAQ.

**Data → View pipeline:**

```
src/data/*.js  →  src/views/*View.vue  →  src/components/RuleBlock.vue
```

Each view imports its data file, iterates sections/subsections, and renders them via `RuleBlock` (the universal rule renderer). Views handle special cases themselves (e.g. `BattlefieldsView` renders stratagem cards; `BasicRulesView` renders wound table, illustrations, definitions).

**Data file shapes — all bilingual `{ en: Section[], ru: Section[] }`:**

- `basicRules.js` — EN and RU arrays merged by index at runtime in `BasicRulesView`.
- `battleRound.js`, `battlefields.js`, `advancedRules.js` — same bilingual shape; views merge EN/RU the same way.
- `reference.js` — exports `abilityIntro`, `coreAbilities`, `appendix`, `faqs`; each is `{ en: [...], ru: [...] }`. `coreAbilities` is the lookup table for `KeywordPopover`.

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

## Factions

Faction pages live in `src/views/factions/` and their data in `src/data/factions/`.

**Orks** is the only fully implemented faction. All others render `FactionStubView.vue` (stub for all three sections).

**Faction routing:** nested routes under `/factions/orks/` with `OrksLayout.vue` as the parent (hero section + `<RouterView />`). Children: `rules` → `OrksRulesView.vue`, `files` → `OrksFactionFilesView.vue`, `faq` → `OrksFaqView.vue`. Stub factions use a single dynamic catch-all: `/factions/:slug/:section` → `FactionStubView.vue`; name/category looked up from `src/data/factions/factionsConfig.js`.

**Faction data shape** (`src/data/factions/orks.js`):

```js
{
  name, subfaction, lore,
  files: [{ desc, path, type }],
  faqs:  [{ q, a }],
  armyRule: { name, text },
  detachments: [
    {
      id,           // kebab-case, used for anchor IDs and filter state
      name,
      source,       // '10ed' | '11ed'
      description,  // optional flavor text from Faction Pack (11ed only)
      rule: { name, text },
      enhancements: [{ name, pts?, restriction, text }],
      stratagems:   [{ name, cp, type, turn, when, target, effect }]
    }
  ]
}
```

**Rules view pattern** (`OrksRulesView.vue`):
- Army rule block at the top.
- Sticky detachment filter bar (`top: calc(var(--navbar-height) + var(--subnav-height))`).
- Table of Contents grid of detachment links.
- Loop over `filteredDetachments`, rendering `DetachmentBlock` + `EnhancementCard` grid + `StratCard` grid per detachment.

**Faction-specific components:** `DetachmentBlock.vue`, `EnhancementCard.vue`, `StratCard.vue`.

## Adding content

**New core-rules section:** Add data to the appropriate file in `src/data/` following the `Section` shape. The search index updates automatically. If it's a new top-level nav group: add to `navGroups` in `src/router/index.js`, add a route, create a view.

**New faction (fully implemented):** Create `src/data/factions/<faction>.js` with the shape above (including `files` and `faqs`). Create `<Faction>Layout.vue` (hero), `<Faction>RulesView.vue`, `<Faction>FilesView.vue`, `<Faction>FaqView.vue` following the Orks pattern. Add nested routes in `router/index.js` and add the slug → `{ name, category }` entry to `factionsConfig.js`. Add the faction to the appropriate array (`imperiumFactions`, `chaosFactions`, or `xenosFactions`) — it will appear in the navbar mega-dropdown automatically.

**New faction (stub):** Add the faction to the array in `router/index.js` and add the slug to `factionsConfig.js` — the catch-all route handles it automatically, no view file needed.

## Image organization

```
public/images/
  basics/      — datasheets, moving, coherency, engagement
  attack/      — attack sequence example diagrams
  command/     — battle-shock examples
  visibility/  — visibility rule diagrams
  move/        — move type cards + charge/pile-in diagrams
  shoot/       — shooting type cards
  fight/       — fight phase diagrams + consolidation
  turn/        — phase icon images
  terrain/     — terrain rule diagrams
```

## PDF source

`public/sources/WH40k_11ed.pdf` — the authoritative source. Always verify rule text against it when editing data files.
