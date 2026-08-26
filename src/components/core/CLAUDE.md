# CLAUDE.md — Core Rules

Directory-scoped doc for the Core Rules chapters. Also read this when touching
`src/views/CoreRulesView.vue` (the page shell, lives in `src/views/` not this directory) or
the core-specific data files under `src/data/` listed below. For the general
data→view→`RuleBlock` rendering pipeline, `body` markup syntax, search, and keyword popover —
shared by Core Rules, Event Companion, faction pages and Combat Patrol alike — see root
`CLAUDE.md`'s Architecture section instead; not repeated here.

## One page, seven chapters

**The Core Rules are one page.** `/core-rules` (`src/views/CoreRulesView.vue`) renders all seven chapters at once, each as its own component in `src/components/core/` (`ChapterIntro`, `ChapterBasicRules`, …) — the chapter components are what own the data import, the EN/RU merge and their own special blocks (`ChapterBattlefields` renders the stratagem card grid; `ChapterBasicRules` the wound table, illustrations and definitions). Notes:

- The seven **former** routes (`/introduction`, `/basic-rules`, …) still resolve — they redirect to their chapter's anchor. `CORE_CHAPTER_ANCHORS` in `router/index.js` is the single registry for that mapping and for the `hash` on each `navGroups` entry; every core group now shares `path: '/core-rules'` and differs only by `hash`, so anything keying off a group must use path+hash (see `groupKey` in `NavSidebar.vue`).
- Each chapter's wrapper `<section>` carries `content-visibility: auto` so offscreen chapters cost no layout. Consequence: a chapter that hasn't been revealed yet has collapsed geometry, so **in-page jumps must go through `scrollToAnchor()`** (it polls for the element and re-scrolls after 400 ms) — a one-shot `getBoundingClientRect()` will land in the wrong place.
- The chapter components render **fragments** (no wrapper element), so scoped CSS in them can't rely on DOM nesting — use a modifier class instead (e.g. `.section-img--lead`).
- On desktop (≥1024px) rules are laid out in **two columns**: `.rule-columns` (`style.css`) is the same multicol masonry as `.strat-grid`, and `composables/columnChunks.js` decides what goes into a group. Wide blocks (anything with an `illustration`/`image`/`sideImage` or an `[img:` line in its body, plus tables and the stratagem grid) are lifted **out** of the group there — `column-span: all` only works on a direct child, and an image inside a rule body can't escape its column at all. The column CSS is inside a `min-width: 1024px` query, so below it the page is laid out exactly as it was when the chapters were seven pages. `/core-rules` is also the only page widened past 860px (`.main-content--wide`, 1280px).

## Adding a chapter/section

Add data to the appropriate file in `src/data/` following the `Section` shape (see root `CLAUDE.md` for the shape and `body` markup). The search index updates automatically. If it's a new chapter: add to `navGroups`/`navGroupsRu` in `src/router/index.js` (with its `hash`), create a component in `src/components/core/` and list it in `CoreRulesView`'s `chapters` — not a route.

## Data file shapes (bilingual `{ en: Section[], ru: Section[] }`)

- `basicRules.js` — EN and RU arrays merged by index at runtime in `ChapterBasicRules`.
- `battleRound.js`, `battlefields.js`, `advancedRules.js` — same bilingual shape; components merge EN/RU the same way.
- `reference.js` — exports `abilityIntro`, `coreAbilities`, `appendix`, `faqs`; each is `{ en: [...], ru: [...] }`. `coreAbilities` is the lookup table for `KeywordPopover` (root `CLAUDE.md`).
- `intro.js` — the welcome/intro page; shape is `{ en: {...}, ru: {...} }` (a single object, **not** an array). Rendered by `HomeView.vue` (`src/views/`, not a Core Rules chapter itself — the landing page).

## Battle-round "Turn Structure" diagram (07.02)

`TurnStructureDiagram.vue` (this directory), not baked-image banners — each locale's `battleRound.js` subsection carries a plain `steps: [{ icon, title, desc }]` array (7 entries: Start of Turn Step, the 5 phases, End of Turn Step), rendered as real (translatable, searchable) HTML rows. The **icon** is the only per-step asset, and it's shared by both locales — `turn/icon-<key>.webp` (`command`/`movement`/`shooting`/`charge`/`fight`/`turn-step`, the last shared by Start and End) is a small monochrome silhouette applied via CSS `mask-image` + `background-color: var(--text-muted)`, so it recolors for free with the light/dark theme instead of needing baked-color variants. These were cut once from the old EN banner plates (luminance-thresholded to an alpha mask, see git history for the extraction script) and are ~0.4–0.9 KB each — replacing the old per-locale baked banners (`turn/<slug>-banner-ru.webp` + the EN `turn/<slug>-PHASE.webp` plates, ~150–280 KB per locale) which had the title/description text burned into the raster. The subsection is marked `wide: true` (see `columnChunks.js`) so the diagram always spans the full measure instead of fighting the two-column balancer.

## Illustrations are locale-neutral

Unlike the old per-chapter pages, illustrations referenced by `image`/`sideImage`/`illustration`/inline `[img:]` are the **same file for both locales** — there is no `-ru` runtime path rewrite anywhere in this directory (or anywhere in the app: `grep -rn "ru\.png\|ruSrc" src/` is empty, and no `-ru`-suffixed file exists under `public/images/` anymore). If you're looking for the "`-ru` suffix" mechanism a much older version of this doc described (`BasicRulesView`/`AdvancedRulesView`/`BattlefieldsView` rewriting `image.replace('.png','-ru.png')`) — those views no longer exist; they were folded into these chapter components, and the per-locale illustration variants were retired at the same time. See `public/images/CLAUDE.md` for the current (locale-neutral) image pipeline.
