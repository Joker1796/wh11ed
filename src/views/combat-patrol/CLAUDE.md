# CLAUDE.md — Combat Patrol

Directory-scoped doc for `/combat-patrol*`. New as of 2026-08-03 — earlier this feature only
had scattered one-line mentions inside root `CLAUDE.md`'s Search and Faction-pages
paragraphs; this consolidates what exists into one place. Also read this when touching
`src/data/combatPatrol.js`/`combatPatrolRu.js`/`combatPatrolIndex.js`/`combatPatrolSearchIndex.js`
(flat data files, not in this directory) or `scripts/sync-combat-patrol.mjs`/
`scripts/gen-combat-patrol-search-index.mjs`.

## What this is

Fixed-roster starter-box content for each faction's Combat Patrol box — a separate boxed game
mode from the main matched-play rules this app otherwise covers. One combined per-faction page
(`CombatPatrolFactionView.vue`, `/combat-patrol/:slug`): detachment rule, army rule (**as
printed in the box** — sometimes pre-errata relative to the faction's Codex, e.g. Necrons'
"reanimates D3" vs the Codex's errata'd "heals D3"), stratagems, enhancements, and the box's
fixed-composition datasheets, all on one scrolling page (long enough to get the same "Back to
top" FAB treatment as the Core Rules pages — `isCombatPatrolFactionRoute` in
`useRouteSection.js`). `CombatPatrolIndexView.vue` (`/combat-patrol`) is the faction-picker
grid, grouped the same way `FactionsListView` groups factions, with the same pin/favorite
mechanism (`FavoriteStar.vue`, `isFactionPinned`/`toggleFaction`).

## One box, one page (2026-10-14)

A faction can have several Combat Patrol boxes (Adeptus Custodes: Tristraen's Gilded Blades,
Aquilan Talon, Aquilan Wing since app data 981), so the unit of this feature is the **box**, not
the faction. Every entry in `combatPatrol.js`/`combatPatrolIndex.js` has an `id` — the box's URL
key (`/combat-patrol/:slug`, the param IS the box id) and the stem of its anchors and search
entries — and a `slug`, which stays the FACTION's (accent, emblem, faction name). A faction's
first box keeps `id` = slug, so every URL and anchor from before the split still resolves; a
further box is `<slug>-<slug(boxName)>`. The index page shows one tile per box, while pinning
stays per faction (a pinned faction takes all its boxes to the top). The RU overlay matches a box
by `id` — never by faction name, which three boxes now share.

## Data

`src/data/combatPatrol.js` — one file for all ~24 CP factions (each box's content is small: 1
detachment rule, 1 army-rule copy, 2-3 stratagems, 1-2 enhancements, 4-5 datasheets — no
per-faction file split like `src/data/factions/*.js`). Datasheets reuse the exact field shape
`DatasheetCard.vue` already renders (lowercase stat keys `m/t/sv/w/ld/oc`,
`a/bs/ws/s/ap/d`); `faction` is the plain army-rule name shown on the card (not a lookup — CP
text can legitimately differ from the Codex copy of the same-named rule); CP datasheets carry
no `points`/`options` (fixed loadout, not scored) — both fields are simply omitted.

`src/data/combatPatrolRu.js` — sparse RU translation overlay, deep-merged over `en` via the
same `deepOverlay()` mechanism `src/data/factions/ru/*.js` uses. Only translated prose lives
here (flavor/body/example/ability text/etc); every name (faction/detachment/stratagem/
enhancement/unit/weapon) stays absent and inherits from EN, matching the project's
"names stay English" convention. Entries match their EN counterpart by `name` (most types) or
`id` (datasheets). **The translation-brief doc this file's header references,
`COMBAT-PATROL-RU-TRANSLATION-TASK.md`, no longer exists at the repo root** (translation pass
presumably finished and the punch-list file was deleted, but the code comment pointing to it
wasn't cleaned up) — don't go looking for it; the field-by-field rules it described are the
same bilingual conventions documented in root `CLAUDE.md`.

`src/data/combatPatrolIndex.js` — lightweight slug/name/boxName-only index (the CP counterpart
to `factionsIndex.js`), read by `router/index.js`'s drawer nav and `useSeoMeta.js`'s per-box
meta title so those don't have to statically import the full `combatPatrol.js` (detachment
rules, stratagems, enhancements, every datasheet for all 24 factions). The full file is
dynamically `import()`ed only by the two views above, once a CP route is actually visited.
Kept in sync with `combatPatrol.js` by `scripts/sync-combat-patrol.mjs`'s index-drift check.

`src/data/combatPatrolSearchIndex.js` — this feature's own compact search index (`npm run
combat-patrol:index`, `scripts/gen-combat-patrol-search-index.mjs`), same names+subheadings
shape as `factionRulesIndex.js`. No detachment to select before navigating (a CP box has
exactly one fixed rule/army-rule/roster, unlike a normal faction page's multi-detachment
picker) — see root `CLAUDE.md`'s Architecture → Search for the full mechanism and the
`cp-<box id>-rule` / `cp-<box id>-army-rule` / `cp-strat-<box id>-<slug(name)>` /
`cp-enh-<box id>-<slug(name)>` anchor-id scheme `CombatPatrolFactionView.vue` and the generator
must keep in sync.

## Verifying against appdata

`node scripts/sync-combat-patrol.mjs` — report-only, matches each authored box to its own
appdata detachment and "Combat Patrol: `<box name>`" publication by box name, and checks DP/Force
Disposition, the detachment rule's name, which army-rule row links to the box's
own publication (or, for a box that prints none — the Aquilan boxes — the faction abilities its
datasheets carry), and the stratagem/enhancement/datasheet name sets
+ each enhancement's `isCombatPatrolDefault` flag against `wh40k-appdata`. Also scans every
appdata faction bundle for an `isCombatPatrol` detachment (box) not yet authored in
`combatPatrol.js` — run it after an appdata version bump to catch newly-added CP boxes.

## See also

**Combat Patrol content is dropped from every other appdata reconciliation script**
(`combatPatrolNames()` in `scripts/lib/sync-common.mjs`) — this app is matched-play only, so
`sync-appdata.mjs`/`sync-faction-text.mjs`/etc. must never flag a CP-only datasheet/detachment
as "missing from wh11ed". `sync-combat-patrol.mjs` above is the one exception that actually
checks this content, on purpose.

## The box page is four tabs (2026-09-28)

`CombatPatrolFactionView` shows one part of the box at a time — **Rules** (the detachment rule and
the army rule), **Stratagems**, **Enhancements**, **Units** — on the shared `PageTabs`, only the tabs
the box has, fading over each other (`fade`; a sideways slide until 2026-09-29). One long page was
the owner's complaint. A panel not on screen is not in the DOM, so anything that links INTO the
page must open the right tab first: `tabForAnchor` maps the anchor ids above (`cp-strat-…`,
`cp-enh-…`, `cp-<slug>-rule…`, and the old section ids `#stratagems` / `#enhancements` /
`#datasheets` / `#rule` / `#army-rule`) to a tab on every hash change, then `scrollToAnchor`s to it.
A new anchor scheme has to be added there as well as to the generator, or search hits into it
land on the Rules tab with nothing to scroll to.
