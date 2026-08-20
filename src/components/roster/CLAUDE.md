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
`/roster/:id/add` (add units), `/roster/:id/view` (read-only), `/roster/shared` (import a shared
link).

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
  `sharedUnitIds` back in the same way `datasheets/index.js`'s `loadDatasheets` does, applying
  that Chapter's own `unitPoints` to the folded units (see Points below)
- Mutually-exclusive wargear groups (one group's pick depends on another group's, on the same
  datasheet+miniature) have no structural field in appdata linking them — the generator infers
  it; see the "deviation" comments in `gen-roster-data.mjs` around
  `base_miniature_loadout_wargear_option` before touching that logic.

**`npm run roster:data:check`** (`--check`, and part of `npm run sync`) regenerates everything in
memory and reports which files would change, writing nothing. Without it an appdata bump left the
largest generated surface of this feature quietly stale — every other generated sidecar in the repo
had a check and this one didn't.

### Points

**The brackets are appdata's, the prices are the Munitorum Field Manual's** (`src/data/mfm/*.js`,
scraped from the live list by `scripts/scrape-mfm.py` — the same source `sync-mfm-points.mjs` feeds
into the datasheet pages). Not a preference between two equal sources:

- appdata records **several parallel price rows per datasheet** — one per Chapter, and for Imperial
  Agents one per allied context. Mapped straight onto `sizes` they became unit-SIZE choices: two
  identical "5 models" pills at 80 and 75 points, the wrong one pre-selected. `pickPrices()` groups
  rows by what actually makes a bracket distinct (model range + `comp` — Corsair Voidscarred really
  does have three different 7-model builds) and collapses each group to one bracket. 79 rows
  collapse this way.
- Which of the parallel lists is this army's own? Where the MFM prices that size it says so
  outright; where it doesn't (Imperial Agents' "7-11 models") the row's **rank** decides, since the
  lists are parallel. Nothing is interpolated — a size the MFM doesn't price keeps an appdata
  number, just the one from the right list. The run names every such size, and the three units the
  MFM lists without a model count at all (Crusader Squad, Gretchin, Wolf Guard Headtakers, whose
  composition lives in a `note`), which keep appdata's prices — currently identical anyway.
- The copy tax stays appdata's `datasheet_points_step` (it knows WHICH copy the surcharge starts
  at, which the MFM only implies through its "1st-2nd"/"3rd+" notes); the generator cross-checks the
  surcharge those notes describe and reports a disagreement rather than shipping one.
- A shared Codex unit can cost a Chapter something else (Blood Angels' Bladeguard, everyone's
  Repulsor Executioner). Those 11 prices ride on the Chapter file as **`unitPoints`** — unit id →
  model count → points, only where they differ — and `loadRosterFaction` applies them to the folded
  units. Same fact, same source and the same numbers as `pointsOverrides` in
  `src/data/datasheets/<chapter>.js`; `index.test.js` pins the two together.

Before this the roster priced units from appdata alone and quoted a different number than the same
unit's own datasheet page — 30 brackets across 21 units, up to 35 points on Inquisitor Draxus.

**`LOADOUT_ITEM_FIXES`** is a named substitution table for a `base_miniature_loadout` row that
points at the wrong wargear item: appdata arms the Death Company Dreadnought with the BRUTALIS
Dreadnought's fists and bolt rifles, while its own printed loadout and its own swap instruction both
say blood fists. One entry today, applied only where the printed loadout and the option prose agree
against the table, and every application is printed by the run — a test pins the result so the table
gets dropped the moment upstream fixes the row.

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
  **Every question it asks about a unit must be asked the way the EDITOR asks it** — about the
  ENTRY, not the printed datasheet. `enhIneligible` reads `enhEligible(e, def, granted)` with the
  keyword an allegiance upgrade handed the entry, because that keyword is what made `enhOptionsFor`
  offer the enhancement in the first place; without it the editor offered Honoured Fallen to a
  Telemon Dreadnought and this file called the same list illegal.
  `unknownUnit` is the one issue about the DATA rather than the list: a roster outlives the
  generated files it was built against, and an id that no longer resolves is filtered out by every
  other reader (the grouped lists, the export, the points), so the unit used to vanish and the army
  to get quietly cheaper.
- `rosterExport.js` — plain-text army list export, official-app style, EN names throughout
  (unit/detachment/wargear names stay English by project convention)
- `rosterShare.js` — roster → deflate-compressed base64url payload carried in the URL
  **hash** (`/roster/shared#r=<payload>`, never reaches the server/CDN). Version-prefixed
  decoder (`1.` = deflate-raw, `0.` = uncompressed fallback for engines without
  `CompressionStream`, i.e. Safari < 16.4). The payload also carries `v`, the STORAGE
  `SCHEMA_VERSION` — a link is as long-lived as a bookmark and holds the same indices-into-
  generated-data a stored roster does, so `importRoster` runs it through the same `migrateRoster`
  rather than trusting it. A payload with no `v` predates the field and is migrated from zero.
- `rosterHandoff.js` — pre-fills the Game Tracker's **setup draft** (`GameSetup` hydrates it
  on mount) rather than the saved-game format itself. A partial draft is fine: `GameSetup` merges
  its own defaults over whatever fields this sets. It also ATTACHES the roster (below) — arriving
  from "play this list" is the one moment the fielded list is known for certain.
- `rosterGameLink.js` — the roster↔game link, pure and store-free. See the section below.
- **`leadsFor(def, entry, detachments)`** (`rosterEngine.js`) — the units an ENTRY can attach to:
  its datasheet's own `leads` (minus any the roster's detachments gate out, see below) plus any its
  enhancement grants (`enhAttachOf`). 13 enhancements
  game-wide widen the attach list — Necrons' Murdermind gives a Cryptek the Destroyer squads,
  Astra Militarum's Abhuman Detail lets a Commissar join Ogryns — from appdata's
  `enhancement_bodyguard_group`, emitted by the generator as `attach` in the same `{ to, type }`
  shape `leads` uses. **Never read `def.leads` directly when an entry is in hand**: the picker
  (`leaderTargetsFor`), the reverse "attached leaders" list in both views, and `validateRoster`'s
  `leaderTargetInvalid` / `manyLeaders` checks all go through `leadsFor`, or a legal granted
  attach gets reported as an illegal one. The list holds one entry per target, printed first and
  a granted duplicate dropped, because callers read it both with `.find()` (first wins) and via
  `new Map()` (last wins) — two entries for one target would resolve to different types.
  Dropping the enhancement afterwards leaves the now-illegal attachment in place and lets
  `validateRoster` warn about it, rather than silently rewriting the roster.
  A lead can also carry **`reqDet`/`exclDet`** — a detachment uuid, matched against the `sid` on the
  roster's detachment objects. 59 leads carry each today, all Chaos Space Marines, where appdata
  states the same Pactbound Zealots attachments twice (once required-inside, once excluded-outside):
  the two halves cover every case, which is why ignoring both fields happened to give the right
  answer. It only happened to — one appdata bump away from a one-sided gate. `gatedLeads()` applies
  them and dedupes by target+type afterwards, since a collapsed pair must leave exactly one entry
  (callers read the list both with `.find()` and through `new Map()`).
- **`addUnitEntry` / `removeUnitEntry`** (`rosterEngine.js`) — the two operations every screen that
  edits a roster's `units` performs, kept in one place because the removal has a second half that is
  easy to forget: a Leader attached to the departing unit has to let go of it. The creation wizard's
  own copy did forget it. `useRosterEditing` and `RosterCreateView` both call these; a screen that
  writes to `roster.units` any other way is a bug waiting to be reported as "my leader is attached
  to nothing".
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

## Editing flow (reworked 2026-08-19)

The editor has **two** panels, not three: Settings and Units. "Units" is the roster's own list —
per-unit configuration in an inline accordion, which is what the third "Loadout" panel used to
hold. Browsing the faction catalogue to ADD a unit is **its own page**, `/roster/:id/add`, reached
from the dashed button at the top of the Units panel.

That page carries its own copy of `.rc-sticky` **and of `.btn-primary`/`.btn-ghost`** — scoped
styles can't cross a component, and forgetting the second one is what left its "Done" link
rendering as bare text on the first pass. Three screens now hold that same block: this page, the
editor and the creation wizard.

A page rather than a tab or a modal, deliberately: on a phone the catalogue wants the whole
screen, and with a real route the hardware back button closes the catalogue instead of the entire
editor. Nothing is saved on the way in or out — both directions are plain navigation, because
every add already writes through to `useRosters.js`.

**`src/composables/useRosterEditing.js`** is what keeps those two routes honest. They edit ONE
roster from two screens and need the same faction data, points, validation and — critically — the
same `addUnit`/`removeUnit`. A second copy of `removeUnit` would be free to forget dropping a
leader attachment that pointed at the removed entry. It is not a store: each screen calls it and
gets its own reactive handles onto the same underlying roster object.

An issue raised from the add page concerns one entry, which lives in the editor, so the page
navigates to `/roster/:id?unit=<uid>` and the editor opens that accordion and clears the query.
That watcher is declared **after** `openUid` on purpose: it runs immediately during setup, and
referencing a `const` declared further down hits the temporal dead zone (it did).

The creation wizard keeps its three sequential steps, with step 2 now called "Add units". Its
step markers are buttons: any reachable step can be jumped to, steps 2-3 stay disabled until a
faction is picked (the same gate step 1's Next button uses), and jumping forward routes through
`goToUnits()` so the roster still gets created rather than being skipped past.

**The wizard's units are written through to the saved roster, not held until "Done"** (`syncUnits()`
in `RosterCreateView.vue`, called from add/remove and from `goToUnits`). They used to live in
component state until `finish()`, so leaving the way every other screen expects to be left — the
"Back to list" link at the top, a phone's back gesture, a reload — threw the whole list away and left
behind a roster that had been created on step 2 but was empty. `updateRoster` assigns the SAME array,
so its identity is shared with the store from then on and the per-entry edits made on step 3 ride
the store's own deep-watch autosave; that is why `pickFaction` empties it with `splice(0)` rather
than assigning a new one. Its add/remove go through `rosterEngine`'s `addUnitEntry`/`removeUnitEntry`
— the same implementation `useRosterEditing` uses, not a second copy.

## Russian for the wargear instructions

The group instruction shown above each wargear choice ("The Sister Superior's boltgun can be
replaced with one of the following:") comes from appdata via `items.js`'s `texts` and is English.
`src/data/roster/ru/texts.js` is its Russian, **generated** by `scripts/gen-roster-texts-ru.mjs`
(`npm run roster:texts-ru`, `--check` in `npm run sync`), loaded lazily by `UnitEditorFields` and
only in the RU locale.

Generated rather than hand-translated for the same reason the modifier layer pins hashes: 967
strings regenerated on every appdata bump would go stale as fast as GW ships datasheets. They are
also formulaic — a dozen sentence frames wrapped around weapon and unit names, and those names
stay English by project convention, so only the frame needs translating.

**The generator is fail-open and must stay that way.** A sentence is translated only when a frame
matches end to end AND its captured slots pass two guards: the owner/subject must be a bare noun
phrase (a lazy capture otherwise swallows a leading condition and emits confident nonsense), and
the value must not contain a second frame ("…replaced with 1 shuriken pistol and one of the
following:"). Anything else is left out of the file and the UI shows the English original —
a fully English line reads fine, half-translated Russian does not. Coverage sits around 82%; the
run prints it, and a drop after a bump means GW introduced a new wording, not noise.

`src/data/roster/ru/texts.test.js` pins the invariants rather than any wording: no English
sentence frame survives on a translated line, no id exists that the English side doesn't have, no
doubled space or dangling noun from a slot that resolved to nothing. Both guards above were added
because that test caught real output.

The instruction is often a sentence followed by a bullet list of the options ("…one of the
following:\n◦ 1 hexrifle and 1 torturer's tool"). appdata carries those as real newlines with a
`◦`/`•` marker, which collapse into one run-on line when interpolated into a template — so
`splitInstruction()` (`rosterEngine.js`, pure) splits head from bullets and the editor renders the
bullets as a list. The RU generator emits the same line structure (its own test pins the marker
count against the English), so both locales render identically.

## Bundled wargear options

**One option can grant SEVERAL items** — "1 model's twin torturer's tools can be replaced with
1 hexrifle **and** 1 torturer's tool" is one choice, not two. appdata has no field for it: a
`wargear_option` row carries exactly one item and the pairing lives only in the group's
instruction prose, so a flat read (what this generated until 2026-08-19) offers the two items as
rival picks and silently drops half of every swap — from the loadout, the export, and Tier A's
weapon-table trim.

`gen-roster-data.mjs`'s **`linkWargearBundles`** parses the pairing out of the prose and then
**verifies it against structure**: `loadout_choice` enumerates each miniature's complete legal
loadouts (1145 of 1146 datasheets have them), so every set the prose yields must fit inside one
of them. Prose alone would be a guess. 172 groups are rewritten this way; the run prints the ones
left flat, by name, so a "missing swap" report can be checked against that list.

Two guards keep it fail-open, and both currently reject real groups — don't remove them to raise
the number: every option appdata lists must be named by the prose (else the prose is describing
something else), and a multi-item set must be backed by the enumeration. A rejected group is
emitted exactly as appdata lists it, never as a guessed pair.

**Slot 0 of an option is therefore polymorphic** — an item id, or the full `[[id, count], …]`
set. **`optionItems(o)`/`optionLabel(o, items)` in `rosterEngine.js` are the only readers of that
polymorphism**; anything that unpacks `o[0]` itself loses the second half of a bundle. That is
what `loadoutItemIds`, `wargearNames`, the editor rows and the data-shape tests all go through.

Because a pick is stored as an INDEX into the option list, rewriting the lists renumbered them —
hence `useRosters.js` SCHEMA_VERSION 2, which drops `wg` from rosters saved under v1 rather than
re-interpreting an old index as a different weapon.

## One bullet, recorded once per miniature

A datasheet bullet that talks about the UNIT ("Any number of models can each have their hallowed
mace replaced…", "For every 5 models in this unit, 1 model's…") is stored by appdata **once per
miniature profile** — a checkbox on the single leader model, a stepper on the rank-and-file one —
because option groups hang off miniatures, not off the datasheet. Rendered straight that is the
same instruction printed twice, and each copy carries its own allowance, so the swap could be
taken twice.

`mergeMiniatureDuplicates` folds them into one group with `all: 1` and **no `m`** (no miniature
owns it, so the editor prints no miniature name). Safety comes from matching the exact
instruction text AND the exact option sets: a leader with a genuinely separate allowance is
always worded differently ("The Sister Superior's boltgun…"), so it never collides; two copies on
the same miniature are left alone. 101 pairs across 50 units.

The text comparison is **whitespace-normalised** — the two copies are typed into appdata twice and
one pair (Deathwatch Terminator Squad) differs by a trailing space — but **not** order-normalised:
a reordered option list is a different statement. What deliberately stays unmerged is a repeated
lead-in with DIFFERENT options: "1 Battle Sister's boltgun can be replaced with one of the
following" appears twice on that datasheet, once for a special weapon and once for a heavy one,
and GW prints it that way too.

It runs **before** the limits below, deliberately — two identical groups are exactly what made a
limited set ambiguous, and folding them first took the ambiguous count from 43 to 1 and the
capped groups from 219 to 261.

## How many models may take it

The other half of the same gap: `wargear_option_group` says WHAT a squad may take, never HOW
MANY models may take it. That lives in its own family — `limited_wargear_choice_set` repeats the
same choices, and `wargear_limit` gives the cap as a step table keyed by unit size
(`{modelCount: 5, choiceLimit: 1}, {modelCount: 10, choiceLimit: 2}` = "for every 5 models,
1 model"), with a `duplicateLimit` that **belongs to the threshold, not to the set** (Cadian
Shock Troops: 2 picks / 1 of a kind at 10 models, 4 / 2 at 20).

Before this the cap was guessed from the instruction text, and the guess was wrong in both
directions — "Up to 4 Dominions can each…" read as no cap at all, "For every 5 models, up to 2
Seraphim" as one. That is not cosmetic: a paid option's points are multiplied by the count, so a
wrong cap misprices the army.

`linkWargearLimits` attaches a set to a group only when its choices are exactly that group's
options (and its miniature, when it names one), no other group on the unit matches equally well,
**and the prose doesn't contradict it** — a set matches by ITEMS, so one describing a wider
allowance over the same weapons would otherwise attach and hand out extra models. That last guard
currently saves exactly one group (Blood Angels' Death Company Marines with Jump Packs: prose says
one model, the table says two), and the run names it. 219 groups end up capped; the 43 ambiguous
and 82 cross-group sets are left alone.

`wargearGroupCap(def, entry, gi)` reads the applicable row from the live model count — **not the
size bracket**, since a 6-10 bracket at 6 models is still below a 10-model threshold. `null` =
no structural cap, keep the old prose-derived behaviour; `{limit: 0}` = the group genuinely
offers nothing at this size ("if this unit contains 10 models…" in a 5-model squad), which the
editor states in words instead of hiding, so an existing pick can still be cleared.

**The cap is what picks the editor's mode**, not appdata's `inputType` alone: a group allowing
several models becomes per-option steppers sharing one budget (`stepMax` = remaining budget,
never more than the duplicate cap), whatever appdata calls it — "Up to 2 Vigilants can each…"
was a checkbox, i.e. one choice for the whole squad. Limit 1 stays the familiar radio/toggle.

`validateRoster` reports `overWargearLimit` / `overWargearDup` rather than trimming: the editor
caps as you click, so a violation means the list was legal and then the unit shrank, and which
weapon to give up is the player's call.

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
`ctx` (`{ def, entry, items, detachments, leaderTargets, units }`) is optional and partial —
each call site passes only what it alone knows, and the modal adds `unitId`/`factionSlug` from
its own props. `RosterUnitBrowser`'s preview passes only `detachments`: the unit isn't in the
roster yet, so there is no loadout to reflect, but the roster's detachments already apply. No ctx
at all → the printed sheet with every option, exactly the pre-overlay behaviour.

Tier A does four things:

1. **Trims the weapon tables** to the entry's actual loadout (2000 of 5038 rows across all
   factions disappear from a freshly-added unit's card).
2. **Resolves rule-granted keywords** — the existing `conditionalKeywords.json` sidecar, gated on
   the ROSTER's detachments instead of `useFactionChoice`, handed to `DatasheetCard`'s existing
   `grantedKeywords` prop. Detachment names are matched to sidecar ids by
   `slugify(name.normalize('NFD') minus combining marks)` — **not the shared `slugify()` alone**,
   which drops the diaeresis in "Dëlve Assault Shift" and silently misses that grant (24/25
   without the strip, 25/25 with it). `slugify()` itself is load-bearing for DOM ids and the
   search index, so it stays as it is.
3. **Hides the build-choice blocks** — Unit Composition, the default-loadout sentence and Wargear
   Options (`DatasheetCard`'s `hideChoices` prop). Each describes a decision the roster has already
   made, and the printed loadout sentence contradicts the weapon tables once those are trimmed.
   The Leader "can be attached to" list is deliberately KEPT: it is rules text about how the
   attachment works, and it stays useful for an entry that hasn't been attached yet.
4. **Reports roster facts absent from the datasheet** (`entryContext`) as chips above the card:
   Warlord, the enhancement carried (chosen or mandatory), and what the unit is attached to.
   An attachment is only shown when `leaderTargets` can resolve it to a name — never as a uid.

Tier B adds attributed prose INSIDE the card, in `DatasheetCard`'s `#before-keywords` slot —
directly above its closing Keywords line, so the roster context reads as part of the datasheet
rather than as an appendix after it (the slot exists for exactly this; the card itself stays
unaware of the roster). `ruleSourcesFor` says WHICH rules bear on the entry and the modal resolves
each to its text from the lazily-imported faction bundle: the enhancement carried, each of the
roster's detachment rules, and the abilities of any Leader attached to this unit.

**The block is not itself an accordion** — what applies is always visible and only the individual
rule bodies collapse, so there is one level of chevrons and opening it can't dump four long rule
bodies at once. It is marked as not-printed-on-the-card by borrowing the card's own vocabulary for
a block of a different kind (`.ds-damaged`'s left accent bar) plus a **dashed** border and an
accent-text heading instead of the printed groups' solid accent bar with white text. Everything
keys off `--accent`, so it holds in all 30 faction colours and both themes; introducing a fixed
hue would fight them.

**The army rule is deliberately NOT one of these blocks.** It opens from the card's own
`Faction:` line, which becomes a clickable `.keyword` exactly like a core ability and shows the
rule in the same `KeywordPopover` (`useKeywordPopover`'s `openRule`, added for a caller that
already holds the text). That line is the datasheet's own statement of which army rule it has, so
it beats anything this layer could infer — and the 128 sheets with no faction line (Anathema
Psykana, Aeldari wraith constructs, aircraft) correctly offer nothing to open, because they
genuinely don't have one. The card takes the openable names in `linkedFactionRules` and matches
them against the comma-separated parts of `sheet.faction` apostrophe-insensitively ("Martial
Ka’tah" vs "Martial Ka'tah"); unmatched parts stay plain text.

Detachment rules are gated by **`src/composables/ruleTargets.js`** — the keyword layer.
A rule almost always names its own target ("Speed Freeks units from your army…", "friendly
ADEPTUS CUSTODES TERMINATOR models"), so the gate is read from the same string that renders and
can never drift from it, which a generated sidecar eventually would. **Always fed the ENGLISH
body** (`rulesFactionEn` in the modal): keywords stay English but the prose around them is
translated, so gating the RU text would silently stop matching.

Read that file's header before touching the patterns. **The design is fail-open on purpose** —
wrongly hiding a rule is much worse than wrongly showing one — with three independent escapes:
a rule that never mentions your own units isn't gated; a rule where ANY passage talks about your
units without naming a keyword isn't gated (this is what saves multi-part rules like Aeldari's
Battle Focus, which names VEHICLE in one of five triggers and would otherwise vanish for every
infantry unit); and an extraction matching no unit in the whole faction is distrusted and ignored
(7 rules, prose abbreviating a faction keyword — "Votann units" against LEAGUES OF VOTANN).

A rule is read as one `{ targets, excludes }` **per statement** — paragraph, `###` section or
`▪ ` bullet — and applies when ANY statement does. Splitting by bullet is load-bearing: Necrons'
Cold Fervour is two bullets, the first naming DESTROYER CULT and the second every other NECRONS
model except MONSTER, and merging them would let the second bullet's exclusion cancel the first
bullet's own target. Exclusions are safe by nature — one that names no keyword ("excluding
Battle-shocked units") excludes nobody. Four wordings the patterns must keep handling, each of
which silently ungated whole rules before it was covered: a sentence-opening `Friendly` (spelled
`[Ff]riendly`, NOT the /i flag, which would also make the keyword pattern's capitalisation
case-insensitive and destroy the one signal that marks a keyword), a slash alternation
("Immortals/Necron Warriors units"), a parenthetical between the noun and "from your army", and
singular/plural drift both ways (rules say "Vyper units", the datasheet keyword is VYPERS).

Measured across all 30 factions: 225 of 268 detachment rules are gated, 30 of them carry an
exclusion, 41% of (unit, rule) pairs are hidden, and no unit is left seeing none of its faction's
rules. **Re-run that measurement after touching the patterns** — the numbers are the only way to
tell a sharper gate from a wrongly-hiding one.

An earlier attempt to gate the army rule on the datasheet's own `faction` ability line was
measured and rejected — 712 of 1039 sheets match, 22 distinct mismatch classes, 128 sheets with
no such field — because wh11ed's single `armyRule` object is not 1:1 with a sheet's faction
ability line. Don't retry it; that is what `sync-army-rule-coverage` exists for.

The enhancement and Leader blocks are gated structurally instead (bearer, and the unit joined),
so they never go through this layer, and the army rule no longer needs it at all.

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

### Tier C — the numbers themselves

`src/data/rosterModifiers/<slug>.js` (generated skeletons + hand-read `effects`) →
`src/composables/rosterStatMods.js` (pure) → `DatasheetCard`'s `statMarks`/`statNotes` props.

**An unconditional modifier rewrites the printed value and marks it with `*`; a conditional one
never touches the number and is annotated instead.** That asymmetry is the whole point: most 40k
modifiers are conditional, and a card reading T6 when the +1 only holds while a Waaagh! is running
is worse than one reading T5 with a note. A value the layer cannot compute honestly ("D6+2" plus
1) degrades to an annotation rather than inventing arithmetic — see `applyValue`.

Three things hold this together and are easy to break:

- **A record is tied to its prose by a hash** (`hash`, sha1 of the normalised English text) and to
  its rule by an appdata uuid (`sid`) plus a wh11ed-side pointer (`ref`, resolved through
  `sourceIds.json`). Matching by id, not by name, so a GW rename moves the record with the rule.
  `npm run modifiers:check` (also part of `npm run sync`) reports `stale` the moment the wording
  moves under a reviewed record — that is the only warning that a hand-read effect may now be
  wrong. Never hand-edit `hash`.
- **Scope is not stored.** Which units a rule bears on comes from `ruleTargets.js`; an effect only
  names a `scope` INDEX into `ruleScopes()` so it binds to one statement of a multi-part rule.
  A second copy of the scope in the data would be free to drift from the prose.
- **Only `reviewed` records with effects are ever applied** (`usableEntries`). An unreviewed
  skeleton means "somebody still has to read this rule", not "no effect".
- **`grantedKeywordsFrom` runs before the apply pass, in BOTH readers.** A granted keyword decides
  which rules bear on the unit at all (Necrons' Destroyer Ankh gives its bearer DESTROYER CULT, and
  only then does Cold Fervour reach it), so gating on the un-granted set answers a different
  question. `RosterUnitRulesModal` always did this; `RosterViewView`'s own compact stat plates
  didn't, which let a plate and the card behind it disagree — the one thing the two sharing
  `rosterStatMods.js` exists to prevent. No current record makes them differ (8 unconditional
  keyword grants, none gating a profile stat), so this is a latent case kept closed, not a repair.
  That view also memoizes the pass per entry (`statModCache`) rather than re-running it for each of
  the six plates in a row.

The layer is detachable: delete `src/data/rosterModifiers/` and `loadRosterModifiers` resolves to
null, the card keeps its printed numbers, and Tiers A+B are unaffected. Nothing is written into
the hand-authored faction files.

The review backlog, the update procedure and the format reference live in
`ROSTER-MODIFIERS-PROGRESS.md` at the repo root.

## A roster attached to a game (`rosterGameLink.js`)

A tracker game can carry each player's army list. **Optional on both sides** — a game with no
lists is the normal case and nothing in the tracker may require one. Attaching happens **only in
the setup wizard**: the roster field in step 1 (`RosterPickerModal.vue`), or automatically when
the game was started from a roster via `rosterHandoff.js`.

**A snapshot, not a reference.** `player.roster` holds the list itself; `player.rosterId` is
provenance only and may dangle. A game outlives the roster it was played with — the list gets
edited between games, deleted, or never existed locally at all (an opponent's arrives as a share
link and is deliberately NOT saved to the collection). A finished game in history, or one restored
from the cloud on another device, still has to show the army that was fielded.

- **Same shape as a share link.** `rosterSnapshot()` is `rosterShare.js`'s `rosterPayload()` — one
  definition of "a roster in transit", so a snapshot and a link migrate identically.
- **Migrated on READ** (`rosterFromPlayer`), not on write: wargear/size picks are indices into
  generated data the generator renumbers, and a game is kept for months. Same treatment
  `importRoster` gives a share payload.
- **Size.** `wh11ed-api` caps a synced game at 64 KB (`config.maxGameBytes`) and both players share
  that budget with the game itself, so the snapshot stays in the stored ids-and-indices form —
  never resolved names or datasheets. `rosterGameLink.test.js` pins it (~150 bytes per entry).
- **The list decides the army.** Picking a roster in the wizard sets that player's faction, and
  `resolveArmyChoice()` takes the detachments from it; switching faction afterwards DETACHES it,
  because a list describes one army and would otherwise sit there labelling the wrong one.

**Viewing it in game:** `/tracker/game/roster/:pi` renders `RosterViewView` — the same screen as
`/roster/:id/view`, fed from the game's snapshot instead of the store (back link to the game, no
edit pencil). Deliberately not a second copy of the screen: this is where the live-rules layer
(active Waaagh! etc.) will hang. `useTracker.js` is **dynamically imported** there — it statically
pulls the mission/event datasets (~280 KB of source) and the ordinary roster route must not carry
them. Entry point: the chip under each player's detachments in `RoundTracker.vue`.

### Live rules — what is true right now

Tier C rewrites a printed number only when the modifier is unconditional. Opened from a game, it
can also rewrite one whose condition the game PROVES — which is the reason to open a list mid-battle
at all. Three files, one idea:

- **`src/data/rosterModifiers/conditions.js`** — the vocabulary. Every conditional effect carries
  `cond`, a list of condition ids that must all hold, hand-assigned in the same review pass that
  wrote `effects` (161 distinct `when` wordings; there is no grammar to parse, but the STATES a game
  can be in are enumerable). Each id declares its `scope` — who answers it — and its `duration`.
  **100 of the 217 conditional effects are answerable**; the rest carry a **sentinel** (`never`,
  `blocked-subset`, `blocked-weapon`) that says why not. **A missing `cond` is not "unconditional" —
  it is unreviewed, and is treated as unproven.**

  Two of the original four blockers were removed by giving the effect somewhere to put the
  restriction instead of the prose, and both are worth knowing before authoring a record:
  - **`only`** — a target narrower than `on` can express. `{ tag }` / `{ notTag }` match the
    weapon's printed ability (PSYCHIC, TORRENT, PISTOL, RAPID FIRE — which is exactly what those
    phrases name), `{ name }` matches the weapon by name; both prefix-matched, since a tag carries
    its value ("RAPID FIRE 1"). What is left blocked needs a choice the data doesn't record — "one
    melee weapon, selected at the start of the battle".
  - **`alt`** — the index, within the same record, of the effect this one REPLACES. While an
    alternate is in force its base is skipped entirely, so "+1, or +2 instead" can never become
    +3. An alternate must be conditional (an unconditional one would suppress its base forever)
    and, where its prose names several characteristics, the record carries one alternate per
    characteristic. Pinned by `index.test.js`.
  - A subset naming part of the unit ("Penitent models, while…") still belongs in `scope`, the
    index of the rule statement that says it — 10 were moved there; 26 remain where the rule's own
    prose has no statement matching the subset.
- **`src/composables/rosterGameContext.js`** — the answers. Each id is answered from exactly ONE
  source: `auto` (the tracker already knows — a called Waaagh! from the Ork toggle spec, the active
  Doctrina Imperative from the Adeptus Mechanicus selection spec), `roster` (the list already says
  so — a Leader's attachment), or a switch the player flips. **Every auto reader checks the faction
  first**: the specs are built from shared primitives, so `army.toggleRounds` means "Waaagh!" only
  for Orks. Most trackers record something other than what the conditions ask about (Drukhari count
  Pain tokens, not the active Combat Drug), so those stay switches. An auto condition is deliberately NOT hand-flippable: two sources for
  one fact is how this card and the tracker card next to it start disagreeing.
- **`rosterStatMods.js`** takes the resulting set as `active`. A proven effect is applied AND keeps
  its condition text, with `via` naming what proved it — `DatasheetCard` renders that third state
  (`ds-mod-live`) distinctly from both a printed value and an unmet condition.

**The clock is the battle round.** A switch stores the round it was flipped in, and anything whose
rule lasts less than the whole battle is true only in that round. The tracker has no phases and no
notion of whose turn it is, so that is the only honest clock — and clearing EARLY is the safe
direction, since a stale switch would silently rewrite a number. Conditions scoped to a phase are
marked in the vocabulary and never come out true until that changes.

**Where the switches are:** army-wide ones above the unit list in `RosterViewView` (facts about the
battle); per-unit ones on the unit's own card in `RosterUnitRulesModal` (`gameCtx` prop, `toggle-cond`
event), next to the number they change. A FINISHED game reached from the history list
(`/tracker/history/:gid/roster/:pi`) shows the same screen as a record: the recorded context still
shapes the numbers, but there are no controls. Only conditions the roster's own rules actually name are
offered, and only ones that can be answered — a switch that changes nothing on screen is worse than
no switch. State lives in the game (`player.ctx.army` / `player.ctx.units[uid]`, written by
`useTracker`'s `setArmyCondition`/`setUnitCondition`), never in the roster.

Plan, research and open questions: `ROSTER-IN-GAME-PROGRESS.md`.

## Known gaps

See `ROSTER-BUILDER-PROGRESS.md` at the repo root for the current open-questions list (no cloud
backup) — kept there rather than here since that file is the transient tracking doc and this one
is the stable reference. The modifier overlay has its own tracking doc,
`ROSTER-MODIFIERS-PROGRESS.md` (see the section above).
