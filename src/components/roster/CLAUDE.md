# CLAUDE.md — Roster Builder

Directory-scoped doc for the army list builder (`/roster*`). Loaded contextually instead of
living in the monolithic `wh11ed/CLAUDE.md` — this feature's code is spread across a few
directories (below), so also read this file when touching `src/composables/roster*.js`,
`src/data/roster/`, or `src/views/tracker/Roster*.vue` even though they sit elsewhere.
`wh11ed/CLAUDE.md`'s Game Tracker section has a one-line pointer here; that's the only
mention of the roster builder in the root doc — don't duplicate this content back into it.

## What this is

Build/validate/export/share a 40k army list, then hand it off to the Game Tracker. Its own
top-level nav section (`meta: { section: 'roster' }` on every `/roster*` route in
`router/index.js`, `isRosterRoute` in `useRouteSection.js`) — a `Rosters`/«Ростеры» link
sits next to `Tracker` in the desktop navbar and the mobile drawer, and its own bottom-nav
icon sits right after `Rules`. No subnav (single-page section, like the Factions list).
Decoupled from Tracker on 2026-08-03 — it used to ride with that section (`meta.section:
'tracker'`, a `trackerGroups` entry, a card on `TrackerHomeView`); if you find a stray
`isTrackerRoute` check gating roster behavior, or a reference to a roster card on the tracker
home page, it's stale from before the split.

Routes: `/roster` (list), `/roster/new` (creation wizard), `/roster/:id` (editor),
`/roster/:id/view` (read-only), `/roster/shared` (import a shared link).

## Generated data layer

`scripts/gen-roster-data.mjs` (`npm run roster:data`), sourced from `wh40k-appdata` — same
class of derived data as the datasheet/mfm pipelines (structural facts only, no rules prose):

- `src/data/roster/core.js` — battle sizes (points / DP / enhancement+duplicate limits)
- `src/data/roster/<slug>.js` — one per faction, 30/30 generated. Units link to their
  datasheet page via `sourceIds.json`'s `ds:` entries (`linked: true` + id); unmatched units
  get a slugified id and no link. 1034/1034 units currently linked; 1 dropped for missing
  points/composition (Imperial Knights' Sir Hekhtur — check the generator's console output
  after a re-run for any new drops).
- `src/data/roster/items.js` — wargear item names + group instruction text, interned once
  across all factions (most wargear is a free swap; only ~83 options carry a points delta)
- `src/data/roster/index.js` — `loadRosterFaction(slug)`, lazy per-faction (`import.meta.glob`,
  same PWA-light-entry-chunk discipline as `data/datasheets/index.js`), folds an SM-Chapter's
  `sharedUnitIds` back in the same way `datasheets/index.js`'s `loadDatasheets` does
- Mutually-exclusive wargear groups (one group's pick depends on another group's, on the same
  datasheet+miniature) have no structural field in appdata linking them — the generator infers
  it; see the "deviation" comments in `gen-roster-data.mjs` around
  `base_miniature_loadout_wargear_option` before touching that logic.
- The generator's own top-of-file comment claiming it "emits units without gear for now" is
  **stale** — full wargear-option parsing (groups, mutual-exclusion deviation tracking, the
  interned `items.js`) is implemented. Fix that comment next time the file is touched.

## Pure logic (`src/composables/roster*.js`)

No Vue, no store — testable without mounting anything. Not colocated with this component
directory; still part of this feature:

- `rosterEngine.js` — unit grouping (`UNIT_GROUPS`: epic/characters/battleline/transports/
  other, derived from keywords), points math, leader/warlord/enhancement eligibility, wargear
  group live-state
- `rosterValidation.js` — `validateRoster()`. Philosophy: **never block**, like the official
  app — always compute a total and surface `{ code, level: 'error'|'warn', uid?, params? }`
  issues for the user to judge rather than preventing an illegal list. `code` maps to an i18n
  message rendered by `RosterIssuesModal`. Per-unit duplicate cap: the battle size's limit,
  doubled for Battleline/Dedicated Transport, hard-capped at 1 for every Epic Hero regardless
  of battle size (rule 25).
- `rosterExport.js` — plain-text army list export, official-app style, EN names throughout
  (unit/detachment/wargear names stay English by project convention)
- `rosterShare.js` — roster → deflate-compressed base64url payload carried in the URL
  **hash** (`/roster/shared#r=<payload>`, never reaches the server/CDN). Version-prefixed
  decoder (`1.` = deflate-raw, `0.` = uncompressed fallback for engines without
  `CompressionStream`, i.e. Safari < 16.4).
- `rosterHandoff.js` — pre-fills the Game Tracker's **setup draft** (`GameSetup` hydrates it
  on mount) rather than the saved-game format itself — `wh11ed-api`'s `domain/game.ts`
  contract is untouched by this feature. A partial draft is fine: `GameSetup` merges its own
  defaults over whatever fields this sets.
- **`capKeyOf(def)`** (`rosterEngine.js`) — the identity a unit's duplicate cap
  (`duplicateLimit`) is grouped by. Defaults to the datasheet's own `id`; an optional `charId`
  field is the extension point for the real (currently unrepresented in any faction's
  `src/data/roster/<slug>.js`) 40k case of one named Epic Hero published as two distinct
  datasheets — GW caps them as ONE slot even though the `id`s differ. `duplicateCounts()`
  (`rosterValidation.js`) is the shared tally built on top of it. **"Check legality"**
  (`roster.checkLegality`, per-roster, default `true`) is the player-facing toggle: on, it
  live-enforces `duplicateLimit` by disabling `RosterUnitBrowser`'s "+" button once a unit's
  cap group is full; off, unlimited adding (today's pre-toggle behaviour). This is layered on
  top of, not a replacement for, `validateRoster()`'s own always-on `overDuplicate` issue — the
  two share the same `capKeyOf` grouping so they never disagree. Toggled on the creation
  wizard's step 1 (`RosterCreateView.vue`, last field) and the editor's Settings tab
  (`RosterEditorView.vue`) — both write straight to the roster object. A count strictly OVER
  its cap (not just at it — unreachable through the "+" button itself, but reachable by lowering
  the battle size on step 1 *after* units were added under a bigger one) turns
  `RosterUnitBrowser`'s `N/limit` badge red (`.rub-count.over`). `RosterCreateView.vue` now also
  runs `validateRoster()` live (previously editor-only) and shows the same `issues-badge` +
  `RosterIssuesModal` the editor's header has, next to the points readout in both step 2 and
  step 3's `.rc-sticky` — so `overDuplicate` (and everything else `validateRoster` catches) is
  visible during the wizard, not just after `finish()` lands on the read-only view.

## Store

`src/composables/useRosters.js` — module singleton, same pattern as `useTracker.js`/
`useLocale.js`, persisted to `localStorage['wh11ed-rosters']`. Schema-versioned
(`SCHEMA_VERSION`, bump + extend `migrate()` on any shape change). Deliberately imports **no**
faction data files — the list screen must stay in the light entry chunk; only the editor
dynamic-imports the heavy per-faction `src/data/roster/<slug>.js`.

## Views (`src/views/tracker/Roster*.vue`, not in this directory)

`RosterListView`, `RosterCreateView` (4-ish-step wizard, mirrors `GameSetup`'s pattern; its
"Done" button, `finish()`, lands on the roster's read-only view, not the editor),
`RosterEditorView` (tabbed; fixed footer bar — `.rc-sticky`, same class and CSS as
`RosterCreateView.vue`'s own wizard bar, copied not shared — with the points readout + issues
badge on the left and Cancel/Save on the right, always visible across all three tabs, not just
one step. "Save" is a pure navigation shortcut to that same read-only view (`save()` →
`/roster/:id/view`) — every edit already autosaves to `useRosters.js`'s reactive store, there's
nothing left to actually persist; "Cancel" is a plain `RouterLink` back to `/roster`, same
non-destructive idea. Reusing the literal `.rc-sticky` class name is load-bearing, not
cosmetic: `App.vue`'s `.app-layout:has(.rc-sticky)` selector — which reserves
`--roster-sticky-h` so `MobileUtilityBar`'s floating buttons rise above this bar instead of
overlapping it — matches by class name alone, regardless of which view rendered it),
`RosterViewView` (read-only; Units / Rules / Stratagems tabs, the latter two loading faction
rule text via `loadFaction()` from `data/factions/index.js` — **async**, not the old sync
`getFaction()`, see below — on first open of either tab, sharing one fetch since a detachment
object carries both `.rule` and `.stratagems`). Its Stratagems tab is deliberately the same
setup as the standalone `/stratagems` page (`StratagemsView.vue`): the by-phase/as-list toggle
(same `localStorage['wh11ed-stratagems-by-phase']` key, so the preference is shared, not
learned twice), phase accordions via `stratagemPhases.js`'s `phasesOf`/`phaseLabel`/
`PHASE_ORDER`, and the same masonry `.strat-grid` — just pre-filtered to the roster's own
detachments (flattened, no filter row) instead of that page's core/you/opp filter.

Its **Units tab** shows the base statline as small chamfered plates (`.rvst`/`.rvst-box`,
scaled-down copies of `DatasheetCard.vue`'s own `.ds-stat`/`.ds-stat-box`), invulnerable save
as its own trailing accent-coloured plate (`.rvst-inv`, last — not DatasheetCard's own
shield-under-SV layout, no room for that in a one-line row). Clicking a row opens
`RosterUnitRulesModal` (same as `RosterUnitBrowser`'s own row-click preview while adding units)
with the unit's full, unfiltered datasheet — an inline accordion with a
`loadoutSheetOf`-filtered/merged card was tried (weapons trimmed to the entry's actual loadout,
Leader+Bodyguard combined into one card) and reverted: it read as visually nested/padded rather
than one card, and the merged-unit case looked worse than just showing each datasheet in full.
If this is revisited, check git history around 2026-08 for what didn't work before repeating it.
`RosterSharedView` (import landing for a `rosterShare.js` link).

## Components (this directory)

`RosterUnitBrowser` (add-unit list/search), `UnitEditorFields` (wargear/enhancement/warlord
pick UI for one unit), `WeaponProfileModal`, `EnhancementRuleModal` (loads the enhancement's
rule text via `loadFaction()`, same as `RosterViewView`), `RosterIssuesModal` (renders
`validateRoster()`'s issues), `RosterExportModal` (wraps `rosterExport.js`),
`RosterUnitRulesModal` (wraps `DatasheetCard` with its `collapsible` prop — see Known gaps;
used both by `RosterUnitBrowser`'s row-click preview while adding units and by
`RosterViewView`'s Units tab — see Views above; takes an optional `ctx` for the modifier
overlay, see below),
`FactionAccentScope` (per-faction accent-color CSS custom-property scope for the editor
chrome, keyed off the roster's faction slug).

**`RosterUnitRulesModal`'s `.modal-body` cancels `DatasheetCard`'s own ≤480px `.ds-card`
full-viewport bleed** (`width: 100vw; margin-left: calc(50% - 50vw)`) via a `:deep(.ds-card)`
override. That escape is correct only when `.ds-card` sits directly in an unpadded container —
nested in `.modal-body`'s own `0.35rem` side padding, the `50%` term resolves against that
padded box instead of the true viewport, so the escape lands a few px short/long and the modal
gains a small horizontal scroll (most visible once a unit has an Abilities/Special Abilities
group — `DsAccordion`'s `.ds-group-btn`, `width: 100%`, then measures against
`.ds-ability-group`'s own edge-bled, now-over-wide box). `.ds-card`'s *internal*
bleed-to-its-own-edge for the header/weapon-table/ability-group zones is untouched and stays
correct once `.ds-card` itself is back to a normal in-flow block — only the escape-to-viewport
part is cancelled.

**`RosterUnitRulesModal` themes itself with `FactionAccentScope`, wrapped inside its own
`.modal-body`** rather than by the caller wrapping the whole component (the way
`UnitEditorFields.vue` does for `WeaponProfileModal`/`EnhancementRuleModal`). It has to be — this
component's own `BaseModal` already teleports to `<body>`, so a second `<Teleport>` a caller puts
*around* it (as `UnitEditorFields.vue` does for `rulesOpen`) re-parents the actual modal DOM to
`<body>` a second time, right past the outer `FactionAccentScope`'s wrapping `div` — CSS custom
properties only cascade through real DOM ancestry, not the logical component tree, so that outer
wrap never reaches the card (confirmed empirically: `.modal-overlay`'s `--accent` stayed the
app's default red there, while `.modal-body`'s own nested scope was correctly Ork green). Scoping
it inside `.modal-body` keeps it a genuine ancestor of `DatasheetCard` with no teleport in
between, so it works for all three places this modal opens from (`RosterUnitBrowser`'s preview,
`RosterViewView`'s Units tab, and `UnitEditorFields`' "Show datasheet" link) without depending on
what the caller does.

**`getFaction()` doesn't exist anymore** — `src/data/factions/index.js` was refactored
(async, code-split `loadFaction(slug)`) after this feature's early commits; `RosterViewView.vue`
and `EnhancementRuleModal.vue` were updated to `await loadFaction(slug)` when `main` was
merged in (2026-08-03). If you find another `getFaction` call site while extending this
feature, it's stale — same fix.

**`BaseModal` renders via `<Teleport to="body">`** (added on `main` after this feature's
early modal work) — any new test mounting a component that renders `BaseModal` (or a wrapper
around it, like `RosterUnitRulesModal`) must assert against `new DOMWrapper(document.body)`,
not the mounted wrapper's own `.text()`/`.find()` — the teleported content lives outside the
wrapper's DOM subtree. See `RosterUnitRulesModal.test.js` or
`src/components/tracker/modals.test.js` for the pattern.

## Modifier overlay (`src/composables/rosterModifiers.js`)

`RosterUnitRulesModal` renders the sheet a roster ENTRY fields, not the printed one, via
`overlaySheet(sheet, ctx)` — a pure function alongside the other `roster*.js` composables.
`ctx` (`{ def, entry, items }`) is optional and partial: `UnitEditorFields` and
`RosterViewView` pass it, `RosterUnitBrowser`'s preview deliberately doesn't (nothing is in
the roster yet, so every option should still show). No ctx → the printed sheet, unchanged.

Tier A does three things:

1. **Trims the weapon tables** to the entry's actual loadout (2000 of 5038 rows across all
   factions disappear from a freshly-added unit's card).
2. **Resolves rule-granted keywords** — the existing `conditionalKeywords.json` sidecar, gated on
   the ROSTER's detachments instead of `useFactionChoice`, handed to `DatasheetCard`'s existing
   `grantedKeywords` prop. Detachment names are matched to sidecar ids by
   `slugify(name.normalize('NFD') minus combining marks)` — **not the shared `slugify()` alone**,
   which drops the diaeresis in "Dëlve Assault Shift" and silently misses that grant (24/25
   without the strip, 25/25 with it). `slugify()` itself is load-bearing for DOM ids and the
   search index, so it stays as it is.
3. **Reports roster facts absent from the datasheet** (`entryContext`) as chips above the card:
   Warlord, the enhancement carried (chosen or mandatory), and what the unit is attached to.
   An attachment is only shown when `leaderTargets` can resolve it to a name — never as a uid.

Tier B adds attributed prose under the card (`ruleSourcesFor` says WHICH rules bear on the
entry; the modal resolves each to its text from the lazily-imported faction bundle): the
enhancement carried, each of the roster's detachment rules, the army rule, and the abilities of
any Leader attached to this unit — each in a collapsed `DsAccordion` labelled with its source.

**There is deliberately no keyword gating on those blocks.** Deciding "does this detachment rule
touch this unit" means parsing prose, and a wrong guess HIDES a rule that applies — the failure
this layer exists to prevent. Only structural facts gate: an enhancement shows on its bearer, a
Leader's abilities on the unit it's attached to. Gating the army rule on the datasheet's own
`faction` ability line was measured and rejected: it matches only 712 of 1039 datasheets, with 22
distinct mismatch classes (a datasheet lists "Synapse" where `armyRule` is named "Synapse &
Shadow in the Warp"; Death Guard's sheets say "Pact of Decay" against an `armyRule` named
"Nurgle's Gift") and 128 sheets carrying no such field at all — wh11ed's single `armyRule` object
is not 1:1 with a sheet's faction ability, which is why `sync-army-rule-coverage` exists.

Name matching across the two datasets is centralised here: `enhKey()` (moved out of
`EnhancementRuleModal.vue`, which now imports it, so the two lookups can't drift) and `detKey()`.

Two rules make the weapon trim safe, and **neither is cosmetic** — read before changing the
matching:

- **A row no wargear item claims is never hidden.** 2.8% of real weapon rows (139 of 5038) match
  no item name — a fixed weapon spelled differently from its item, or a profile with no item at
  all. Hiding those would delete a weapon the unit really has.
- **A multi-miniature datasheet only ever gains rows, never loses them.** A `rep` list is
  per-miniature and there's no single squad count to spend it against, so the subtraction
  accounting (mirrored from `rosterEngine.js`'s `defaultLoadoutLines()`) is restricted to
  single-miniature units, exactly as that function does.

An empty ranged table on a freshly-added unit is usually CORRECT, not a bug — 26 datasheets
(Nemesis Dreadknight, Wraithknight with Ghostglaive, Canoness with Jump Pack…) have a default
loadout with no ranged weapon at all, and every gun on their card is an option nobody picked yet.

The wider plan (attributed prose blocks, the numeric modifier sidecar, and how it all survives an
appdata bump) lives in `ROSTER-MODIFIERS-PROGRESS.md` at the repo root.

## Known gaps

See `ROSTER-BUILDER-PROGRESS.md` at the repo root for the current open-questions list (no cloud
backup) — kept there rather than here since that file is the transient tracking doc and this one
is the stable reference. The modifier overlay has its own tracking doc,
`ROSTER-MODIFIERS-PROGRESS.md` (see the section above).
