# CLAUDE.md — Faction pages

Directory-scoped doc for the per-faction rules/datasheet pages. The views live here
(`FactionRuleView.vue`, `FactionDatasheetView.vue`, `FactionDatasheetsView.vue`,
`FactionFaqView.vue`), but supporting composables/components are flat elsewhere — read this
file when touching those too: `src/composables/useFactionPage.js`, `useFactionChoice.js`,
`src/components/FactionPickerBar.vue`, `FactionDetachmentPickerModal.vue`, `FactionLayout.vue`
(the shared hero/tab-nav wrapper), `FactionsNavModal.vue` (mobile faction picker).

For the underlying faction data files (`src/data/factions/*.js`), their `sourceId`
sidecar (`src/data/sourceIds.json`), rule-granted keywords
(`src/data/conditionalKeywords.json`) and the SM-Chapter datasheet dedup mechanism — see root
`CLAUDE.md`'s Architecture section (those are build/data-pipeline mechanisms spanning
`scripts/*.mjs` too, not owned by this directory).

## Faction pages

`FactionRuleView.vue` (`/factions/:slug`, army rule + the active detachment's rule / stratagems / enhancements) and `FactionDatasheetView.vue` (`/factions/:slug/datasheets/:unit`, a `DatasheetCard`) both read faction data via `useFactionPage.js`. The **active detachment** and, for Space Marines, the chosen **Chapter** are one shared "army choice" held in `src/composables/useFactionChoice.js` — a **module singleton** persisted per faction slug to `localStorage['wh11ed-faction-choice']` (`{ slug: { det, chapter } }`; migrates the pre-chapter `wh11ed-faction-detachment` map once), so a pick on the rules page is reflected on the datasheets page and vice-versa. The UI is **`FactionPickerBar.vue`** — a bar sticky under the navbar (full-viewport-bleed background) that renders the Chapter and/or Detachment as compact "label + value + chevron" pill buttons opening `FactionDetachmentPickerModal.vue` (a `BaseModal`-based option list reused for both, via its optional `title`/`tag` props); it only renders when a faction has >1 detachment. Chapter↔detachment consistency (a chapter-locked detachment implies its chapter) lives in the bar, not the store.

In `DatasheetCard`, bodyguard-unit names under a Character's **Leader/Support** ability are `RouterLink`s to those units' own datasheets (name→id via `FactionDatasheetView`'s `unitIndex`, always built from **EN** names); the group heading shows "Support" vs "Leader" (`dsSupport`/`dsLeader`) from the sheet's `core` field. **A printed/granted keyword is clickable** (`keywordLinksEnabled` prop, opt-in per caller — off by default) and emits `keyword-click`; `FactionDatasheetView` catches it and opens `KeywordUnitsModal.vue` listing every other unit in the SAME faction's roster carrying that keyword (`src/utils/keywordUnits.js`, checks both `keywords` and per-model `keywordsByModel`), each linking to its own datasheet page. Faction keywords (ORKS, ADEPTUS ASTARTES…) are deliberately never clickable — virtually the whole roster shares those. `CombatPatrolFactionView` passes no `keyword-links-enabled` (units render inline on one page, not as separate routes, so there's nowhere for the modal's links to go — see `src/views/combat-patrol/CLAUDE.md`) — keywords there stay plain text.

## See also

**Mobile faction hero tabs** (in-page Rules/Units switch that promotes to `MobileUtilityBar` once scrolled out of view, via `useContributeMobileActions('faction-tabs', …)` in `FactionLayout.vue`) — documented in root `CLAUDE.md`'s Navigation model section since it's part of the shared mobile-chrome mechanism, not specific to this directory.

**Search by faction/unit name** (`datasheetIndex.js`, `factionRulesIndex.js`) — root `CLAUDE.md`'s Architecture → Search.
