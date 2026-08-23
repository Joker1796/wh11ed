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
- `rosterSummary.js` — the cached `{ points, unitCount, issues }` denormalised onto each stored
  roster, who writes it and the repair pass for rosters nobody did (see **Store** below)
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
- `rosterExport.js` — plain-text army list export in **three** shapes (`EXPORT_FORMATS`), EN names
  throughout (unit/detachment/wargear names stay English by project convention):
  - **`gw`** (default) — the Warhammer 40,000 app's own **11th-edition** export, which is what a TO
    asks for and what every list reader (BCP, New Recruit, 40kCompactor) parses first. It is not the
    10th's: several detachments at once with the battle size's **Detachment Points budget**, a
    **Force Dispositions** line (both read off the generated `dp`/`fd` fields on a detachment), and
    attached units as `Attached Unit N` blocks with `• Attached as: Leader (Character)` /
    `Bodyguard (Battleline)` — the character no longer carries a "leading" note. Sections are the
    app's three (`CHARACTERS`, `DEDICATED TRANSPORTS`, `OTHER DATASHEETS`); battleline has no
    heading of its own.
  - **`wtc`** — the tournament header format (New Recruit calls it WTC): a `+ KEY: value` block
    between `+++` bars, characters numbered `Char1…` so `+ WARLORD:` and `+ ENHANCEMENT:` can point
    at one, then a line per unit with its wargear inline, plus an indented `Attached to <unit>`
    line — the format's own way of stating an attachment, and what keeps a leader attached through
    a round trip.
  - **`wtc-compact`** — the same list with the per-profile bullets folded into the unit's own line.
    It is not a different grammar (the readers in circulation parse both with one parser), just a
    shorter body: a squad is one line instead of three.
  - **`compact`** — ours, one line per unit for a chat message; identical entries collapse to `2x`
    with their points **summed**, so the copy surcharge stays visible. The shortest thing here, at
    the price of being the one format nobody else parses.

  **Weapons come out as totals per model profile**, swaps already spent — `loadoutGroups()` reuses
  the same `modelsPerMini`/`swapsByMini` accounting the editor shows on screen, so the export prints
  the whole fielded loadout rather than only what the player changed. A datasheet with no recorded
  `defaults` falls back to the picks alone, which is the honest answer: we hold the roster bundle,
  not the datasheet.

  **The footer says `Exported with wh-rules.ru`, never the app's own `Exported with App Version:`.**
  Copying a layout is fine; signing somebody else's name to it is not — and a reader is entitled to
  know which tool and which points data (`APP_DATA_VERSION`) wrote the list.
- `rosterImport.js` — the way back in: read a list somebody else's tool wrote (`detectFormat` →
  `parseList` → `matchFaction` → `matchRoster`), in the formats `rosterExport.js` writes — the GW
  app's 11th-edition export and the WTC/New Recruit header format — plus **both listhammer.info
  modes** (added 2026-08-24). `RosterImportModal.vue`
  (from the roster list's "Import" button) shows the report and only then creates the list, landing
  the reader in the EDITOR, because whatever failed to match is theirs to finish.

  **Best-effort, never silent.** A list is prose written by another program against another points
  file, so everything that could not be placed is named: units missing from our data, a detachment
  we don't have, wargear that matched no option. A unit is never dropped quietly — what is not shown
  cannot be fixed by hand.

  **Points are recomputed, never trusted.** `report.points` carries three numbers: what the list
  STATED in its header, what its matched units stated (`statedUnits`), and what those units cost
  HERE. A difference is normally a data-version difference, and saying so is the whole reason the
  stated figure is kept.

  Two parsing details that took a real export to find:
  - **The bullet, not the indent, tells a model line from a weapon.** `  • 2x Chaos Spawn` with
    `    • 2x Hideous mutations` under it is a model group; `  • 1x Gorechild` with `    1x Plasma
    pistol` under it is one model carrying two weapons. Both indent identically — the deeper line's
    BULLET is the only difference, and reading it wrong doubles a unit's model count.
  - **A weapon belongs to the profile it was printed under.** The sergeant and the squad often have
    a group each offering the same weapon; `miniIndexOf` matches the model line's name against
    `def.minis` so the pick lands in the right group and prices the unit correctly. The same option
    named once per profile is merged into ONE pick — two triples would charge for it twice.

  **The WTC family is read by ONE tolerant parser**, because New Recruit's plain and compact exports
  differ only in how much of the body they spell out. It accepts `•` and `*` bullets, `pts` /
  `points` / `pt`, a quantity with or without its `x`, any `Char1:` / `Infa6:`-style reference
  prefix, and indented `9 with Bolt pistol, Chainsword` detail lines — where the leading number
  counts MODELS, so each item it lists is carried that many times over. The `+++` header is read as
  a SOURCE, not a summary: a compact export often states an enhancement only there, and the warlord
  only by its `Char1:` reference.

  **An attachment is a line, and either side can carry it** (`Attached to <unit>`), so the matcher
  makes the CHARACTER of the pair the leader whichever way round it was written.

  **listhammer.info's detailed mode is the GW app's grammar**, so it goes through the same parser
  rather than a fork of it. Everything that differs is cosmetic and is tolerated in one place each:
  capitalised `Points`, a thousands separator (`2.000 Points` — points are integers, so a dot inside
  one is never a decimal point), `◦` for the weapons under a model line (added to `BULLET`, which is
  what the nesting rule reads), lower-case `Attached unit 1`, plural `Enhancements:`, and a bare
  Force Disposition line where the app writes a labelled one — **which is why the faction is the
  FIRST bare line and not the last**, or the army comes out as "Take and Hold".

  **`listhammer-compact` is its short mode and needs its own parser.** One line per unit, an
  attached unit written as its members joined with `" + "` (leaders first, the unit they joined
  last — the Bodyguard/Leader/Support roles are reconstructed from that order), counts in MODELS,
  and an `Enhancement:` line under the group rather than beside the unit that carries it. It is
  detected by what it LACKS — nothing bulleted, only the header priced — because its footer is the
  only marker and nobody is obliged to paste it. It carries **no faction, no detachment and no
  battle size at all**, so `RosterImportModal` asks for the faction (a plain `<select>` off the
  light `factionsIndex`, not the tracker's picker, which would drag `mfmFactions` into the roster
  list's chunk) and says plainly that enhancements cannot be placed until a detachment is chosen.

  Two matcher rules came out of reading a real listhammer list, and both apply to the GW app too:
  - **A model line is only a model if the datasheet has a profile by that name.** `• 1x Ammo Runt`
    is printed exactly like `• 9x Flash Git`, so counting it made a ten-model unit eleven, which
    fell into the 5-model bracket and priced Flash Gitz at half. `gwBody` keeps the lines,
    `matchRoster` checks them against `def.minis` and passes the strays on as gear — where an
    attached extra may still match a wargear option.
  - **An enhancement's kind tag is ignored on both sides.** Our generated data keeps it inside the
    name for some factions (`Dead Shiny Shootas (Upgrade)`), the app leaves it off, listhammer
    prints it — three spellings of one enhancement, compared through `enhKey`.

  **Leader AND Support both attach.** A bodyguard unit holds one of each (two independent slots, see
  `leaderTargetsFor`), and the app names them that way; matching only `Leader` left the second
  character of a block unattached.

  Both listhammer modes are pinned end to end against the real generated Orks bundle: every unit of
  the detailed export prices exactly as the site stated it, and the short export — given the faction
  and detachments the screen asks for — comes out as the same army.

  **What each format cannot carry**, pinned by the round-trip tests: neither WTC shape has a field
  for the list's own NAME, so an imported one comes back as "Roster" — everything else, attachment
  included, survives. The GW format survives a round trip whole.
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

The other Russian on this screen is the **wargear info modal** (`WeaponProfileModal`, the ⓘ next
to a pick). Weapon names and stat lines stay English, and so does the modal's title — it is the
item's own name out of `items.js`. But a handful of items grant an ABILITY instead of a weapon
profile (Kabalite Icon, Resurrection Orb), and that prose IS translated: the modal matches on the
English sheet (item names and the overlay's own keys are English) and takes only the text from
`loadDatasheetsRu`/`localizeSheet`, pairing the two lists by position. The ability's *name* is left
English on purpose, so it stays the same string as the title right above it. Datasheet RU coverage
is complete — every faction's abilities/wargear/special/rules texts are translated — so a missing
translation here means a component that never loaded the overlay, not a gap in the data.

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

**Drafts.** A roster the creation wizard is still working on carries `draft: true` and
`draftStep`; a saved list carries neither, so "no flag" reads as "saved" and every roster that
predates this is one — no migration. The store hands out the two halves separately
(`savedRosters` / `draftRosters`) so each screen picks one deliberately, and `saveDraft(id)`
(the wizard's "Save") **removes** the flags rather than setting them false, leaving a roster
indistinguishable from one that never was a draft. A draft is real and persisted — that is the
whole point — but it is not a list: it shows only on the Drafts tab of `/roster`, and
`RosterPickerModal` never offers one to a game, because what it holds right now isn't what will
be fielded. The flags never travel: `rosterShare.js`'s `PICK` is a whitelist, so a share link or
a game snapshot carries the army and nothing about how it was made.

**`roster.summary` (`{ points, unitCount, issues }`) is a CACHE**, and `rosterSummary.js` owns the
rules around it. It exists precisely because of the line above: points live in the faction chunk,
and the two screens that show them — `RosterListView` and the tracker's `RosterPickerModal` — must
not load one. So it can only ever be as good as its last writer, and **every screen that changes a
roster while holding its faction data has to write it**: `useRosterEditing` (the editor and the
add-units page) and `RosterCreateView`. That is what went wrong once already — only the editor
wrote it, so a list built end-to-end in the wizard showed "0 pts" on both screens while its own
page priced it correctly. `refreshSummaries()` is the safety net under those writers, called on
mount by both readers: it prices only a roster whose cache is missing or contradicted by its own
unit count (a share-link import, anything older than this mechanism), one faction chunk per
faction involved, and writes straight onto the roster object so the repair doesn't bump
`updatedAt` — the list screen shows that date, and repairing a number is not the user editing.

## Cloud sync (`src/composables/useRosterSync.js`)

Lists sync to `wh11ed-api` (`/rosters`, the same four routes `/games` has), layered over
`useAuth` + `useRosters` exactly the way `useCloudSync.js` layers over the tracker.
`localStorage` stays the primary store; the cloud is a best-effort copy and a failure never
blocks list building. Three rules decide everything in that file, and **none of them is an
accident** — each was a decision:

- **Saved lists only.** A draft never leaves the device (`domain/roster.ts` rejects one with 422
  even if a client bug tried). It isn't a list yet.
- **Uploads follow the Save CLICK, not the edit.** The store autosaves every keystroke locally,
  but the cloud must not collect half-built intermediate versions, so `saveToCloud(id)` is called
  from the deliberate moments — the editor's `save()`, the wizard's `finish()`, a duplicate — and
  from nowhere else. A list edited but not saved simply stays newer on this device; the sync pass
  sees the cloud holds an older copy and **deliberately leaves it alone**. Do not "fix" that by
  pushing every local-newer roster.
- **One request per visit.** `RosterListView`'s `onMounted` runs the single pass: one
  `GET /rosters` returning metadata (no blobs), then only the uploads/downloads that metadata
  proves are needed. There is no manual Sync button, same as the tracker home.

Conflicts are **last-write-wins on the client's `updatedAt`** (a plain `Date.now()`, so it trusts
the device clock — chosen over a server stamp for cost) and the screen says so afterwards.
`RosterCloudBar.vue` is the only place any of this is visible: on `/roster`, where the pass runs,
and on a saved list's view page, which is where the editor's Save lands — that is how the click
that saved a list gets an answer.

**Deletes are tombstones, and the authoritative one is the server's.** `DELETE /rosters/{id}?at=`
empties the row and stamps it with the deleting device's clock; the list endpoint reports those
graves alongside live lists. That is what makes a delete propagate: without it, the second device
would see an id the cloud lacks, conclude "not backed up yet" and upload the list straight back.
The rules that follow from having both timestamps on one scale:

- A grave **removes the local copy** on every other device (counted in the notice as `removed`).
- A list whose `updatedAt` is **newer than the grave** survives and is re-uploaded — an explicit
  Save after a delete is a statement that this list should exist, and the Save wins.
- A draft is never buried, whatever the cloud says: it was never up there to begin with.

`wh11ed-rosters-deleted` in `localStorage` is now only a **retry queue** for deletes made offline
or signed out. Once the server's listing shows the grave, the local note is dropped — the server
is what keeps the list from coming back. The other set, `wh11ed-rosters-pending`, holds ids whose
save hasn't landed. A saved list the cloud has **never** seen (no row, no grave) is pushed by the
pass regardless of the pending set — that is what makes the first sign-in upload the whole
existing collection, and what eventually uploads a share-link import (`RosterSharedView`
deliberately doesn't upload on the spot: an imported list is unpriced until a screen with faction
data touches it).

## Views (`src/views/tracker/Roster*.vue`, not in this directory)

`RosterListView` (two tabs — saved lists and drafts; a draft card continues the wizard instead
of opening a list that isn't finished, and carries Delete on the card itself: its actions sheet
only ever held that one item, so the kebab was an extra tap for nothing. Saved lists keep the
sheet — they have three things to offer),
`RosterCreateView` (4-ish-step wizard, mirrors `GameSetup`'s pattern; its "Save" button,
`finish()`, clears the draft flags and lands on the roster's read-only view, not the editor.
**Everything it collects is a draft from the moment a faction is picked** — the first choice that
means anything, and what every later step depends on; before that, opening the wizard and
wandering off leaves no trace. The draft's id goes into the wizard's own URL
(`router.replace` → `/roster/new?draft=<id>`), which is what makes a reload, a back gesture or a
detour resume THIS draft on the step it was left on instead of starting a second one; step 1's
fields and the step index are written through by a watcher, and the units by `syncUnits()` — after
which the wizard and the draft share one array, so per-unit edits on step 3 ride the store's own
autosave. On resume a `?draft=` id pointing at a SAVED roster is ignored: that one belongs to the
editor, and this screen ends in "Save"),
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
chrome, keyed off the roster's faction slug),
`ConditionChips` (the one way a condition switch is drawn — see "Live rules" below; purely
presentational, the parent decides what a flip means).

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

**Eight kinds of source feed it**: army rules, detachment rules, enhancements, allegiance abilities —
and, since 2026-08-22, a DATASHEET's own abilities, its WARGEAR, the CORE RULES and STRATAGEMS. The last two are where most of
the game's numbers actually live: 436 ability candidates and 136 wargear ones, all reviewed.

**Wargear** (`kind: 'wargear'`, from appdata's `datasheet.wargear[].ruleText`) is an item, not a
rule, so it applies only once the entry actually TOOK it: `ctx.itemNames` is the set of normalised
item names the loadout fields (`loadoutItemNames`), and `ref.item` is matched against it. Without
that a Storm Shield's 4+ invulnerable would print on every model that could have taken one. `null`
itemNames — the add-unit preview, which cannot know the loadout — shows nothing rather than
everything: unlike a weapon row there is no printed line being hidden. Five items read "while the
bearer is leading a unit" and carry `target: 'led'`, answered from `ctx.leaderItemNames`.

**A lesson from the same day:** the candidate heuristic had no pattern for `has a Move
characteristic of 7"` — a SET rather than a delta, and the wording nearly every wargear rule uses.
68 records were invisible for that reason alone, including the one that started the hunt (a
Mortifier taking an Anchorite Sarcophagus and its stats not moving). If a rule that plainly changes
a number has no record, suspect the wording before the pipeline.

**Stratagems** (`kind: 'stratagem'`) are the largest source of all — 1427 across the game, 423
candidates, all reviewed — and the only one that is not a standing fact. A stratagem is SPENT: on one
unit, for a stated window, when the player decides to. So:

- The record carries **`dur`** (`phase` / `turn` / `round` / `battle`), read from its own prose.
  Expiry is the same stamp comparison a switch uses, so a stratagem spent in the Shooting phase
  stops rewriting the card in the Fight phase without anyone remembering to turn it off. **`phase`
  is the default and the overwhelming majority** (234 of 264 records with effects): a stratagem with
  no stated window lasts until the end of the phase. `round` is for the windows that outlive the
  player turn — "until the start of your next Command phase" (11 records) and "until the end of the
  battle round" (1) — where `turn` would drop a defensive buff exactly when it matters, during the
  opponent's turn; it still errs EARLY against the true window, which is the standing preference.
  Where one stratagem states two windows (Sororitas' To the Heart of Heresy: Strength for the turn,
  AP for the phase) the record takes the one that covers its effects; there is no per-effect `dur`,
  and nothing needs one so far.
- **A stratagem's own timing is enforced on the chips too** (`blockedBy: 'wrongPhase'`): its WHEN
  line names the phase, and often the side ("Your opponent's Shooting phase"), which `phasesOf` /
  `phaseSidesOf` already read for the Stratagems tab's "usable now" filter. `resolveModifierEntries`
  attaches the pair to the record as `slot` — the one pass holding both the record and the faction
  data it was read from — and the chip is dimmed, not hidden: holding Armour of Contempt for the
  opponent's Shooting phase is worth knowing. One already in force is never blocked, whatever phase
  it is now.
- **A blocked chip has to LOOK blocked, and say why on itself** (fixed 2026-08-23, reported as
  "why don't these stratagems press?"). It was `disabled` and carried its reason in `title` — but
  the only style on it was `cursor: default`, which is nothing at all on the screen this is read on,
  and a `title` never opens under a finger. So an inert chip was pixel-identical to a live one.
  `ConditionChips` now dims it and dashes its border, and writes the reason on a second line inside
  the chip — but only the reasons that belong to that ONE chip (`wrongPhase`, `usedPhase`); the
  block-wide two (Battle-shock, the unit already targeted) stay in the header above the group, where
  they are said once instead of on every chip.
- **The two per-phase limits of 15.01 are enforced on the chips** (`stratagemsFor` → `blockedBy`):
  a unit already targeted this phase blocks every other stratagem on its card (`unitPhase`), and a
  stratagem already used this phase — on this unit or another — blocks itself (`usedPhase`). Both
  compare the stamp a stratagem was SPENT at against the current one, never its duration: a
  turn-long stratagem spent in the Movement phase is still in force in the Shooting phase and is no
  obstacle to spending another one there. **Only where the game keeps phases**: without a phase
  clock every stamp is a bare round, "the same phase" is unanswerable, and blocking a whole round
  would forbid play the rules allow. The "unless otherwise stated" stratagem that may legally double
  up has an escape hatch — un-spend the other one, which is never blocked.
- **Being spent IS the condition**, so a stratagem's effects need no `cond` — `activeStrats` (the
  set of record ids the player says are up, from `player.ctx.strats[uid]`) answers it. A `cond` on
  top is for what the stratagem asks BEYOND being spent ("…against MONSTER targets"), and those stay
  footnotes exactly as they would anywhere else.
- State lives in `player.ctx.strats[uid][sid]`, apart from `ctx.units`: several stratagems can be up
  at once, they are alternatives to nothing, and they are keyed by record rather than by condition.
- The chips are on the unit's card, above the datasheet — that is where the number they change is,
  and choosing a unit is the whole point of spending one. The Stratagems tab is unchanged.
- No keyword gate (`SCOPELESS`): WHICH unit a stratagem was spent on is the player's to say, not
  this layer's to infer from "one ADEPTUS ASTARTES INFANTRY unit".

**Ability sets** (`subAbilities` in appdata, added 2026-08-23) are the ninth thing a record can hang
off — and until then the generator walked straight past them. A set is "at the start of the battle
round, select up to two of the abilities in the Relics of the Matriarchs section; until the start of
the next battle round this model has those abilities": the PARENT's prose is the picking
instruction and changes no number, and the options that do live under it. 16 sets across the game,
52 options, 16 of which touch a characteristic — one of them is why the Triumph of Saint Katherine's
card showed nothing at all. **EVERY option gets a record**, whether or not it changes a number (the generator's `always` flag —
the only source exempt from `isCandidate`): a set showing two of its six options is a tally nobody
can read, and following the choice is the whole point of these chips. 52 records, 16 of them with
effects.

**Which option is up is a CHOICE, not a condition** — the same shape as a spent stratagem, and
deliberately not vocabulary:

- state lives in `player.ctx.picks[uid][sid]`, keyed by the option's own record, stamped when it
  was picked and lasting the **battle round** every set's wording gives it;
- the cap is the set's own size (`ref.pickLimit`, read from the parent's "select up to two"), and
  `setUnitPick` evicts the oldest pick when a full set gains one — the store never learns what a
  set IS, the caller passes the siblings;
- the effects carry **no `cond`**: `effectLive`'s `byChoice` treats a stratagem and a set option
  alike, and `applyStatMods` gates them whether or not they carry a `when` (a reviewer leaving it
  null must not turn the gate off);
- **picks are read army-wide** (`allPicks`): 15 of the 16 sets are on a unique model, and a relic
  picked on the Triumph feeds an aura landing on the Sisters, whose own `ctx.picks` know nothing
  about it. The Drukhari Raider is the one non-unique exception and would share one choice between
  two of them — the price of not threading the source entry through every apply pass.

The chips are **on the unit's row** (behind the chevron, with its states and auras): the choice
belongs to that model. Each carries `from` (`{ owner, ability, set, unit }`), which
`RosterViewView.withRuleInfo` turns into what a reader needs — the group headed by **the unit and
the set**, the chip **named the way that unit's card names it** (the RU overlay's translation, via
the `ruleInfo` map — abilities, sets and options, keyed by their ENGLISH name), and an **"i"**
opening the rule text in the same popover a core ability uses. **A button that opens that popover
itself must carry `data-kw-open`** (`opensPopover`, checked by App.vue's document listener): that
listener's job is "a click anywhere else closes the popover", and the opener's own click bubbles
straight into it — without the marker the popover opens and shuts in one tap, which is exactly what
the chips' "i" did. Aura chips carry the same three, for
the same reason: they name a rule printed on somebody else's card.

**Auras** (`target: 'aura'`) are the first modifier that reaches a unit the record was not printed
on. Three answers, and only one of them is a question for the player:

- **The bearer's own unit — free.** Core Rules 22.01: "while a model with an aura ability is on the
  battlefield, it is always within range of its own aura ability." No chip, no range, nothing to
  ask.
- **The unit the bearer is attached to (and, from the other side, a Character standing in an aura's
  unit) — also free**: the model is inside that unit, at 0". Read from the attachment the roster
  already records.
- **Anybody else — a chip on that unit's row**, behind the chevron next to Battle-shock, because it
  is a distance on the table and only the player can see it. Offered only while the aura's own rule
  is actually running (`aurasReaching`'s `active`): an unselected relic changes nothing, and a
  switch that moves no number is what this layer refuses to show anywhere else. State lives in `player.ctx.auras[uid][sid]` — keyed by
  the RECORD, like a spent stratagem, since an aura is a relationship with another model rather
  than a state of this one — and lasts a **battle round** (`activeAuras`): what starts and stops an
  aura is movement, and asking again every phase would be a tap per unit per phase.

Two things make auras different from every other ability record:

- **They are keyword-gated.** "A friendly ADEPTA SORORITAS unit within 6" of this model" says
  nothing about the Rhino beside it, so the aura is the one ability that does NOT get the
  `SCOPELESS` pass. The gate travels on the record as `ref.scopes`, derived from the prose by the
  generator (`auraRef` → `ruleScopes`) because the record itself stores no prose to read it from in
  the browser; re-derived every run, so it cannot drift from the wording. Prose the extractor
  cannot read leaves it absent and the effect applies ungated — the same fail-open direction
  `ruleTargets.js` takes everywhere.
- **Which chips are offered is `aurasReaching()`**: the source must be a DIFFERENT entry of this
  same roster, the unit must pass that keyword gate, and the automatic cases above are excluded —
  otherwise every unit's row grows a chip for every aura in the game.
- **A DETACHMENT RULE's aura is the exception to "a different entry"**: its carrier is named by
  keyword, not by datasheet, so the chip is headed by the detachment and offered once to every unit
  the rule reaches. Its gate is read off the reach clause alone and may not fail open — see the
  section on it further down.

The effects themselves carry **no `when`**: being in range IS the condition, and the resolution
above has already answered it by the time `applyStatMods` sees the entry (a `cond` on top still
means what it always did — Excessive Vigour's "if that unit made a Charge move this turn").

**The unit row's chip strip** holds ONE chip and a chevron: Battle-shock stays out (every unit in
the game can be in it, and it is marked every Command phase), everything else — states only some of
this unit's rules read, auras radiating from other models in the list — folds into a collapsed strip
under it, with the count on the handle. The chevron is rendered only when there is something behind
it. A Sororitas list with a Triumph put three stacked chips on every row and buried the numbers they
belong to; that is what this exists to prevent.

**An aura chip names its ability in the reader's language.** The unit half stays English by project
convention, but the ability is translated on its own card (the RU overlay), and a chip spelling it
in English would leave the reader matching two spellings of one rule. `RosterViewView` builds a
`nameEn → name` map per unit from `localizeSheet` (abilities and ability-set options alike) and only
in the RU locale — the same overlay the card fetches, so nothing new rides in the EN bundle.

**A granted CORE ability** (`stat: 'core'`, `op: 'grant'`, `on: 'unit'`) is the third kind of grant,
added 2026-08-23 because a Hospitaller's "models in that unit have the Feel No Pain 5+ ability" was
prose and nothing else. It is returned from `applyStatMods` like a granted keyword — never written
into the sheet — and `DatasheetCard` prints it on the **Core line** beside the printed ones, dashed
and starred, with its source in the title. **196 are stated** across 192 records: 97 plain grants to
the record's own unit ("This unit has Stealth", "Models in the bearer's unit have the Deep Strike
ability"), 11 to a LED unit, 8 auras, 8 keyword-scoped detachment rules, and 28 spent by a stratagem.

**The qualifier rides in the value, behind the name.** 94 of these grants bite only against certain
attacks, and a bare `Feel No Pain 4+` on the Core line would be a plain error — so the value reads
`Feel No Pain 4+ (vs mortal wounds)`. KeywordPopover resolves a core ability by matching the
rulebook name against the START of the text, which is why the qualifier may never lead; `index.test.js`
pins both halves of that (starts with a real core ability, and never spells it " against ").

**A review pass has to look at the reviewed EMPTIES too.** The first sweep only read records
awaiting review, and the Triumph's Icon of the Valorous Heart had been closed as an empty an hour
earlier — by the ability-set pass, before a core grant was expressible at all. Three grants were
invisible for that reason. Whenever a NEW kind of effect becomes expressible, re-read the empties:
they are the records that were told "we cannot say this", and that is exactly what changed.

**And a template is not a policy.** That first sweep stated 57 of these and this file recorded the
rest as "partial in a way the layer cannot say". The 2026-08-23 audit of all 5011 sources found the
opposite: 261 grants sat in reviewed empties, and 97 of them were the plainest possible form — the
templates simply did not know "Models in the bearer's unit have…" or "Friendly SAGITAUR units have
Scouts 6"". Detachment rules were blamed on structured bodies here; their bodies are flat sentences
and the shape of the template was the whole obstacle. When a pass closes an order of magnitude fewer
records than the corpus suggests, doubt the reader before the corpus.

**`improve` is only for the roll-shaped characteristics** (`sv`/`bs`/`ws`/`ld`/`inv`, where a lower
number is better). `applyValue` REFUSES it anywhere else and returns null, so an effect written
`{stat:'ap', op:'improve'}` reads as reviewed and silently does nothing — six AP modifiers were
dead that way until 2026-08-23, the Triumph's Petals of the Bloody Rose among them. For AP the
reviewer writes `add: -1`, for Attacks `add: 1`. `index.test.js` now fails on any other pairing.

**Core rules** (`coreRules.js`, hand-written, outside the faction glob) are the smallest: Battle-shock
turning a unit's OC into `-`. It is the one core rule that rewrites a printed characteristic, it
applies to every unit of every faction, and `unit-battle-shocked` was already in the vocabulary —
which is why the switch now shows on every unit's row.

Battle-shock's *other* effect on this layer is that a Battle-shocked unit may not be affected by a
Stratagem at all, and that is enforced from both sides — the condition carries `blocksStratagems`
in `conditions.js` so the rule is stated once rather than as an id spelled out in the code:

- ahead of the fact, `stratagemsFor()` marks the ones it has not got `blocked`, so they cannot be tapped;
- after it, switching Battle-shock ON un-spends what the unit was already running
  (`stratagemsClearedBy()` → the view's `toggleUnitCondFor`). Leaving a spent stratagem rewriting
  the card of a unit that may not be affected by one is a contradiction the player would otherwise
  have to spot and undo by hand.

A battle-long stratagem is deliberately left alone: its effect (Daemonic Possession's DAEMON) was
resolved when it was spent and nothing takes it back, while a phase- or turn-long one is still
affecting the unit. Both handlers — the row's chips and the card's — go through `toggleUnitCondFor`
for exactly this reason: two switches for one fact must do the same thing.

Three things are specific to the ABILITY source:

- **It can address another unit.** "If this unit is attached to a unit … add 1 to the Strength
  characteristic of melee weapons equipped by Bodyguard models in that unit" is printed on Fabius
  Bile's card and rewrites the card of whoever he joined. An effect therefore carries `target`:
  absent (self), `led` (the unit this one is attached to — 94 effects), or `leader` (the Character
  leading THIS unit — the direction exists and is tested, but no record needs it yet: every ability
  pointing that way modifies a Wound roll or grants Feel No Pain, neither of which is a statline).
  `datasheetEntriesFor()` resolves both cross directions from the attachment the roster records; the
  ordinary resolver skips `ref.kind === 'ability'` entirely.
- **No keyword gate.** An ability is printed on the card it addresses, so `SCOPELESS` includes it
  alongside enhancements, allegiance abilities and wargear — there is no prose naming who it bears on.
- **`sid` is not a bare uuid here.** 56 abilities are published once and printed on several
  datasheets (Custodes' Turbo-boost is on both jetbike units), and each needs a record with its own
  `ref.unit`, so the sid is `<uuid>:<datasheet-slug>`.

Three things hold this together and are easy to break:

- **One record per army rule, deduped by NAME in the generator.** appdata publishes an army rule
  once per publication it appears in, and a Combat Patrol box reprints the codex's rule — so the
  same rule arrives 2+ times under different uuids. Every copy resolves to the same single
  `facEn.armyRule`, so the effects were applied once per copy: doubled footnotes, and a doubled
  NUMBER wherever the condition is proven — Adeptus Mechanicus' Doctrina Imperatives is answered
  automatically from the tracker, so its +1 BS was silently +2 in any game with an Imperative
  running (found 2026-08-22, 16 factions affected). The reprints are not byte-identical, hence
  name-keyed rather than prose-keyed; the smallest uuid wins so the pick is stable.
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
- **What the gate rejects is not unreviewed — it is INVISIBLE.** `isCandidate` decides whether a
  rule gets a skeleton at all, so a wording it does not know reaches no queue and no reader. The
  2026-08-23 audit ran every one of the 5011 sources the generator sees against a looser probe and
  found 103 real modifiers behind five holes, all now patched: `improve THAT unit's` (the article
  an aura naturally uses — two +1 Ld auras had no record for that one word), a bracketed weapon
  ability granted with any subject other than "attacks/weapons" (66 sources), a characteristic set
  as "its Objective Control characteristic **is** 0" (Blood Angels' Black Rage, on six datasheets),
  a multiplied one ("double the Objective Control characteristic"), and "change the Attacks
  characteristic … to 3D6". Keep the gate loose: a false positive costs one line in the queue, a
  false negative costs a rule nobody will ever see again. `generator.test.js` pins all five.
- **`bodyText()` must keep every text field of a block, not the first.** A `triggerEffectAccordion`
  holds the condition in `trigger` and the RULE in `effect`, and `text || trigger || effect` kept
  the trigger and threw the rule away — Aeldari's Battle Focus manoeuvres ("add 2" to the Move
  characteristic") reached neither this generator nor the two text-drift guards that share the
  helper (`sync-faction-text`, `appdata-text-diff`), which were comparing our full prose against
  half of appdata's. Fixed 2026-08-23; the drift count over all 30 factions is unchanged at 239,
  so nothing was papering over a real difference.
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

#### Authoring a record

The generator writes the skeleton; `effects`, `when`, `cond` and `reviewed` are the human's and
survive regeneration. The shape, fixed since the layer was built:

```js
{ scope: 0, on: 'melee', stat: 's', op: 'add', value: 2,
  only: { tag: 'PSYCHIC' }, alt: 1,
  when: { en: '…', ru: '…' }, cond: ['unit-charged'] }
```

- `on` — `profile` | `ranged` | `melee` | `weapon` (both weapon tables) | `unit` (keyword grants)
- `stat` — datasheet keys `m/t/sv/w/ld/oc/inv`, weapon `a/bs/ws/s/ap/d/range`, plus `ability` and
  `keyword` for grants (`op: 'grant'`, `value` the name — `SUSTAINED HITS 1`, unbracketed)
- `op` — `add` | `set` | `improve`. `improve` is only for roll-shaped characteristics (saves, Ld,
  BS/WS), where better means lower. For a plain number the reviewer writes `add` with the sign the
  rule implies: AP is printed negative, so "+1 AP" is `add: -1`.
- `when: null` means unconditional — and unconditional is the only thing that rewrites a number
  without proof. Anything else needs both a bilingual `when` and a `cond`.
- A rule whose reading is "changes no printed number" is kept with `effects: []` and
  `reviewed: true` — otherwise the generator proposes it again forever.

Run `npm run modifiers` to refresh skeletons, `npm run modifiers:queue` to write the working list
(`MODIFIER-QUEUE.local.json`, gitignored), `npm run modifiers:check` to fail on anything unreviewed
or stale. The check is part of `npm run sync` — see `DATA-SYNC.md`.

**A lesson worth not relearning** (2026-08-22): the candidate heuristic tests the prose for things
like `+1 OC` or `+2" M`, and `bodyText()` hands it appdata's emphasis intact (`+2" **M**`). Two
asterisks between the number and the letter hid **141 rules** from the scan — a Custodes detachment
that plainly says +2" M had no record at all. `isCandidate` strips `**` before testing now; if a
rule that obviously changes a number is missing, suspect the markup before the pipeline.

## A roster attached to a game (`rosterGameLink.js`)

A tracker game can carry each player's army list. **Optional on both sides** — a game with no
lists is the normal case and nothing in the tracker may require one. Attaching happens in the setup
wizard — the roster field in step 1 (`RosterPickerModal.vue`), or automatically when the game was
started from a roster via `rosterHandoff.js` — **and, since 2026-08-22, mid-game** from
`EditSetupModal.vue`, with the same picker restricted to the faction already in play (a game that
started without a list used to be a dead end). What the two attachments are allowed to decide
differs; see `src/components/tracker/CLAUDE.md`.

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

### What a printed ability is doing (`src/composables/abilityStatus.js`)

Tier C reads faction RULES; a datasheet's own abilities are in no dataset at all, so on a card they
are prose and nothing else — no statement of whether they are doing anything. Most of them could not
have one (per attack, per target, on a dice roll) and guessing would be worse than silence. **One
family can be answered honestly, and it is a big one:** ~110 abilities open with "While this model is
leading a unit…", 8 with the mirror image ("while a CHARACTER model is leading this unit"), and
whether a model is leading or is being led is a fact the LIST records.

So the card states that fact — "ведёт отряд Intercessor Squad" beside the ability, or "не присоединён
— не действует", with the whole row dimmed. Two deliberate limits:

- **The badge names the PRECONDITION, not the conclusion.** Several of these abilities carry a
  second condition in the same sentence ("…leading a unit that is below its Starting Strength"), so
  "leading X" is a fact we know and "not attached" is a conclusion we can draw; "in effect" is not.
- **Read from the ENGLISH prose**, like `ruleTargets.js` — the RU overlay translates the sentence,
  and a translated sentence is not something to pattern-match. The map is keyed by English ability
  name, which is what `nameEn` carries once the overlay has renamed the header.
- Only with roster context. On a datasheet being READ there is no attachment to report, and an
  unconditional "not attached" would be a statement about nothing.

**The English name is kept.** `localizeSheet` records `nameEn` whenever it renames a header, and
`DatasheetCard` shows it small, in brackets. Everything AROUND an ability on screen — detachment
rules, enhancements, stratagems, the augmentation chips — stays English by project convention, so a
translated header with no original was the one name on the card that could not be matched to the
codex or said out loud to an opponent.

**Every note says where it came from.** The footnotes under the stats are grouped by source and each
group is headed by it — `Army rule`, `Detachment · Creations of Bile`, `Enhancement`, `Leader ·
Fabius Bile`, `Ability`, `Wargear`, `Stratagem · War Horde`, `Core rule`, `Mark`. Text only, no colour of its own: the card already carries the
faction accent and five source colours would fight it. Three of the six labels are the block below's
own words, reused rather than reworded, so the same rule reads the same whether the reader meets it
as a footnote or as a block. Ability records carry `owner` and `from` (self / led / leader) for
exactly this — the record's stored name is `"<unit>: <ability>"` and the two halves have to travel
apart.

**Two lists, and which one a note is in.** `applyStatMods` stamps every note with **`live`** — is
this modifier in force right now? — and the card renders the two apart (`noteSections`):

- **«Modifiers in play»** (`dsModifiers`) — the live ones. `live` is NOT `applied`: a modifier in
  force that had nothing computable to change (no melee row to add to, a dice value) is live with
  `applied: false` and belongs here, because it IS in play.
- **«Possible modifiers»** (`dsModifiersPossible`) — an accordion, closed, everything waiting on a
  condition **except the core rules** (`possibleModNotes`): a core rule applies to every unit of
  every army in every game, so against one roster it says nothing — Battle-shock's OC would be a
  line on every unit of every list being planned, and in this app that rule mostly decides whether
  the unit can be targeted with a stratagem at all, which is a table question, not a list one.
  **Only off the table.** In a game the caller passes `hidePossible` and they are not
  rendered at all: a block headed "in play" must not list what is not, and mid-battle a list of what
  MIGHT be true is one more thing to scroll past. Nothing is lost — the condition and its switch are
  on the rule block below the card, which is where it is flipped.
- Above the unit list, out of a game, the same idea at roster scale: **`RosterViewView`'s
  `possibleGroups`** collects the not-live notes of the roster-wide sources only (army rule,
  detachment rule) from the cards' own notes, deduped per rule, and shows them in the
  place the switch strip takes during a game. An ability, a wargear rule or an enhancement belongs
  to the one unit that carries it and stays on that unit's card.
- Of the 1429 hand-authored effects, **502 carry a sentinel** (`never`/`blocked-subset`/
  `blocked-weapon`) and so can never be live. Off the table they read as "possible", which is a
  slight stretch — they are really "yours to apply by hand" — but a third list for them would cost
  more than it explains.

**Off the table the ROSTER still answers for itself.** `rosterConditions(entry)` (rosterGameContext)
answers the `scope: 'roster'` conditions with no game anywhere — today only `unit-leading`, which
proves the 18 enhancement effects worded "while the bearer is leading a unit". Both the card
(`RosterUnitRulesModal`'s `activeConds`) and the row (`RosterViewView`'s `activeFor`) use it, so
they agree. Deliberately NOT `activeConditions` with an empty player: that also answers the
clock-scoped ids, and a null clock reads as round 1 — "during battle rounds 1-3" would switch itself
on in a list nobody is playing yet.

**A modifier note opens its own rule.** A note the caller could resolve to prose carries
`hasSource`, and then the rule's name in the footnote under the stats opens it in the same popover a
core ability uses (`mod-source-click` → `RosterUnitRulesModal`'s `modSource`). Before that, seeing
"+2\" M · Experimental Augmentations" meant going to find that rule in another block of the same
card.

### Live rules — what is true right now

Tier C rewrites a printed number only when the modifier is unconditional. Opened from a game, it
can also rewrite one whose condition the game PROVES — which is the reason to open a list mid-battle
at all. Three files, one idea:

- **`src/data/rosterModifiers/conditions.js`** — the vocabulary. Every conditional effect carries
  `cond`, a list of condition ids that must all hold, hand-assigned in the same review pass that
  wrote `effects` (161 distinct `when` wordings; there is no grammar to parse, but the STATES a game
  can be in are enumerable). Each id declares its `scope` — who answers it — and its `duration`.
  **125 of the pre-2026-08-22 275 conditional effects are answerable**; the rest carry a **sentinel** (`never`,
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
  **`group` makes ids alternatives**: only so many of a group can be on, enforced on WRITE in
  `useTracker` (`enforceGroupLimit`) rather than in a view, so no caller can forget. The rules say
  it in words — "select one of the Orders below", and for Orders even how it resolves ("any Order
  subsequently issued to that unit replaces the current one"). **`GROUP_LIMITS`** carries the size
  of a group that holds more than one: Creations of Bile's six augmentations pick TWO ("either
  select one from the list below, or randomly determine two"), and without the cap all six could be
  switched on at once, each rewriting a stat — a Fabius Bile read 8"/T5 against a printed 6"/T4.
  A full group EVICTS its oldest member rather than refusing the tap, so it stays changeable in one
  gesture the way a single-slot group is; ties on the stamp break on insertion order.
  `activeConditions` applies the same cap on READ, because a game saved before the cap existed can
  still hold six. Ungrouped where the rule allows any number: Blessings of Khorne activates up to
  two, Combat Drugs can be rolled two at a time.
  Datasheet abilities added five ids of their own: `unit-stationary` ("each time this unit Remains
  Stationary…"), `unit-engaged`, `unit-empowered` (Drukhari spend a Pain token to Empower a unit;
  the tracker banks the tokens but does not record which unit was Empowered), and the three
  `protocol-*` ids a Cybernetica Datasmith puts its KASTELAN ROBOTS into — one group, battle-long,
  since a protocol "remains until it enters a different one".
  **A "select one of N" rule is a switch, not a sentinel** — Martial Ka'tah's stances, Grey Knights'
  Channelled Force, Hagiomnifex's five abilities are things only the player knows, which is exactly
  what a switch is for. Marking one `never` (as the first review pass did) leaves the card showing a
  note it could have applied.
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

**The clock.** A switch stores WHEN it was flipped as one monotonic stamp — `round*100 + turn*10 +
phase` — so every duration is a single comparison: `phase` wants the same stamp, `turn` the same
round and turn, `round` the same round, `battle` anything. That matters because five conditions
last a phase by their own rules and four last a turn; with the round as the only boundary they
stayed true through phases they had no business being true in.

Two things degrade it, both deliberately: a game not keeping phases (`settings.trackPhases`, off by
default) records round-only stamps, and a game saved before stamps existed holds a bare round
number — which can never be mistaken for a stamp, since the smallest real one is 100. Either way
every duration falls back to the round boundary, which is what this layer did before the clock
existed. Clearing EARLY is the safe direction: a stale switch would silently rewrite a number.

**`scope: 'clock'` conditions are answered by the tracker, never by a switch** — same one-source
law as `auto`. Two kinds: a `phase` id names the phase and whose turn it must be (`side: 'own'` for
"your Shooting phase", `'any'` for the Fight phase, which happens in both), and only a game keeping
phases can answer one; a `rounds` id names a battle-round window (Mont'ka's 1-3, Kauyon's 3-5) and
answers in EVERY game, because the round is always known. `clockOf(game, pi)` builds what the
answers are read from, `stampOf(clock)` is what a switch stores.

**Where the switches are** (settled 2026-08-22 — a state is flipped where the thing it changes is
READ, never in a strip that says nothing about which rule it feeds):

- **Above the unit list** — army-wide states. Facts about the battle, not about one unit.
- **On the unit's row in the list**, under its stats (`.rvunit-conds`) — that unit's own states.
  These are what a player flips every turn (charged, advanced, remained stationary), and opening a
  card for that is a step too many. The row had to stop being one big `<button>` to hold them.
- **On the ability**, inside the card (`DatasheetCard`'s `abilitySwitches`) — the states that
  ability's own modifier records name. Only `self` records: an ability printed on a Leader's card is
  not in this sheet's list, and its condition belongs to the unit it addresses.
- **Inside the rule**, in the "In effect for this unit" block, army-wide ones included
  (`gameCtx.armySwitches`) — the place a player MEETS Creations of Bile's augmentations is the
  detachment rule on a unit's card.

**Every chip that raises a question answers it — through the "i" beside it** (2026-08-23).
`ConditionChips` has always drawn that button for a switch carrying `info: { name, text }`, which
until now only an ability-set pick and an aura had. Two more kinds now do:

- **A stratagem chip opens the stratagem itself.** `RosterUnitRulesModal.stratSource()` finds the
  card the way `modSource` finds a detachment rule — by the detachment the record names, then by
  `enhKey` inside it — and `stratText()` writes it out as bold-labelled `WHEN / TARGET / EFFECT /
  RESTRICTIONS` lines, prefixed by the CP. **Not** StratCard's layout: `renderRichText` knows
  nothing of its `◈ LABEL |` info-cards, and reproducing them here would be a second renderer to
  keep in step. The flavour text is dropped — the one field that says nothing about the rule. The
  faction bundle it reads is the localised one, so the popover reads in the modal's own locale, and
  the RU name rides in the popover header (`openRule`'s new `sub` argument, drawn as `.kw-name-ru`)
  the way it rides under the chip. This is also the real answer to "why won't this chip press?" —
  the WHEN line names the phase the chip is refusing you in.
- **A game-state chip opens the core rule that defines it** — `conditions.js`'s new `hint`
  field, written in both locales (`RosterViewView.withRuleInfo` picks one) and free to use the same
  body markup as any rule text, so `(01.07)` navigates and `[gloss:battle-shocked:…]` opens its
  definition. Nine states have one: charged, advanced, remained stationary, engaged, Battle-shocked
  and not, arrived from Reserves, disembarked, at starting strength. A state that is some FACTION's
  rule (an Imperative, an Order, a Kastelan protocol) deliberately has none — its text lives in that
  rule's own body, a pointer this dictionary does not hold, and a hand-written paraphrase of
  somebody else's rule is how the two quietly come to disagree. Reaching those needs the id →
  rule + `### ` subheading map the search index already builds through `extractSubheadings.js`;
  until then no `hint` means no button, which is the honest state.

`index.test.js` guards the hints: both locales present, and every `(nn.nn)` in one resolves to a
`section-…` id that still exists in `basicRules` / `advancedRules` / `battleRound` — a renumbered
section must fail here, not under a reader's finger.

**A stratagem chip carries its Russian name under the English one** (2026-08-23), the same pairing
`StratCard` renders on the card itself: the name stays English, because that is what the printed
card and the GW app both say, and the translation is a display line. It is keyed by the English name
off the faction RU module's `stratNamesRu` — which the modal now keeps alongside the overlay it
already loads, since nothing else in the chip pipeline holds that map. The same gap existed one
level up: `RosterViewView`'s Rules and Stratagems tabs render `RuleBlock`'s `subtitle` and
`StratCard`'s `nameRu`, but its loader never attached any of the RU name maps, so those lines had
never appeared — `withRuNames()` now does it there the way `useFactionPage` does it for the faction
page (army rule, detachment, detachment rule, stratagems, enhancements).

`RosterUnitRulesModal` has **no switch strip of its own** any more. All four places render
`ConditionChips.vue` (`src/components/`, not this directory — it is not roster-specific) and write
to the same store through one handler that routes on the switch's own `scope`, so no two of them can
disagree. A FINISHED game reached from the history list
(`/tracker/history/:gid/roster/:pi`) shows the same screen as a record: the recorded context still
shapes the numbers, but there are no controls. Only conditions the roster's own rules actually name are
offered, and only ones that can be answered — a switch that changes nothing on screen is worse than
no switch. State lives in the game (`player.ctx.army` / `player.ctx.units[uid]`, written by
`useTracker`'s `setArmyCondition`/`setUnitCondition`), never in the roster.

**The stratagems tab reads the clock too.** In a live game keeping phases it offers a "usable now"
filter — what this player can use in the slot the game is standing on. `phasesOf` (grouping, used
by the standalone stratagems page too) is deliberately untouched; `phaseSidesOf` is the extra half
that reads WHOSE phase the timing names, and `usableInSlot` is the predicate. A history record is
excluded: its clock stopped where the game ended.

**User decisions behind all of this** (2026-08-20/22), none derivable from the code: both players
may have a list and neither must; the roster link is an ornament, never a precondition; context
state lives in the game, not in the roster; a faction with no tracker spec still gets a plain
army-level switch; positional and per-attack conditions are never automated; wounds, casualties and
table position are out of scope — this is a reference that knows the rules in play, not a
battlefield. Phases are opt-in per game and offered only where a list is attached, since the roster
screen is the only thing that reads them.

## Known gaps

See `ROSTER-BUILDER-PROGRESS.md` at the repo root for the current open-questions list — kept there
rather than here since that file is the transient tracking doc and this one is the stable
reference. Cloud backup used to head that list; it was built on 2026-08-22 (see "Cloud sync"
above) and the backend half still has to be deployed. The overlay's own tracking docs
(`ROSTER-MODIFIERS-PROGRESS.md`, `ROSTER-IN-GAME-PROGRESS.md`) were retired into this file on
2026-08-22, once their last phases closed; their journals are in the git history.

One modelling gap, now CONTAINED rather than open: appdata gives a faction several army rules, our
faction files one (sometimes a merge, `Synapse & Shadow in the Warp`). A record for a rule we do not
model separately used to resolve through `ref: {kind:'armyRule'}` anyway and read the wrong body for
its scopes — T'au's `Drones` reading `For the Greater Good`. `resolveModifierEntries` now requires
the names to answer to each other (containment either way, apostrophes and case aside), so such a
record is dropped instead of mis-resolved. The gap itself remains: `Drones` has no home until the
faction files model more than one army rule.

**What the audit of 2026-08-22 found is NOT a source, and why** (so nobody re-checks): `ability:
core` (1308 — rulebook abilities the app already carries), `wargearRules` (1371 — build
instructions, not effects), `ability: faction` (1145 — an empty pointer at the army rule, though it
is the key to modelling several of those), `damageAbility` (243 — almost all "-1 to the Hit roll",
and the tracker deliberately does not count wounds), mission twists and core stratagems (one
candidate each). What the layer STILL cannot express, whatever the source: modifiers on an INCOMING
attack ("-1 to the Damage of that attack" — 15 records, the largest single family of reviewed
empties), debuffs on an ENEMY unit, and an op for a MULTIPLIED characteristic ("double the Objective
Control", "triple the Attacks") — those last are proposed and closed as empties on purpose, so the
rule is on the record rather than invisible.

**An AURA hangs off an ability, a piece of wargear or an ENHANCEMENT.** The first two find their
radiating entry through `ref.unit` — the datasheet the rule is printed on. An enhancement has no
`ref.unit`: which model wears the relic is the roster's answer, so it is resolved by NAME instead
(added 2026-08-23, for the eight relics that buff the units around their bearer):

- the generator gives an enhancement `ref.scopes` the same way it does an ability (`auraRef`), and
  `index.test.js` lets `kind: 'enhancement'` carry `target` — for `aura` and nothing else;
- `resolveModifierEntries` SPLITS such a record: the ordinary effects stay ungated (an enhancement
  addresses its bearer), the aura effects come back as a second entry carrying `scopes`, so the
  bearer collects them only if the bearer matches the gate. 22.01 puts the model inside its own
  aura; it does not make a Captain part of the DEATH COMPANY, and Sanguinary Tear's +1 Strength
  must not land on the Captain wearing it;
- `datasheetEntriesFor` covers the other two cards — `leaderEnhNames` (the unit the bearer joined,
  certain by 22.01, no chip) and `auraOn` (anyone the player marked);
- `aurasReaching` finds the source by `enhKey(u.enh) === enhKey(rec.name)` over the roster list, so
  `rosterUnits` now carries `enh` (chosen or mandatory, as everywhere else in this feature).

**A DETACHMENT RULE can grant an aura too** (2026-08-23) — "Friendly IMPERIAL KNIGHTS models have
the following ability: Assisted Targeting (Aura): while a friendly ADEPTUS MECHANICUS unit is within
6"…". I had this filed as needing TWO keyword gates and therefore a second scope field. It does not:
the problem was never the record shape but what the reader was given. `ruleScopes` over the whole
body MERGES the carrier and the receiver into one gate (Cogbound Alliance →
`[IMPERIAL KNIGHTS, ADEPTUS MECHANICUS]`), which is what would have handed the buff to the carrier.
Read the REACH CLAUSE alone and the same function returns exactly the receiving gate. So:

- the generator's `detachmentAuraScopes` matches `While a/an … within N" of …` inside a body that
  carries an `(Aura)` label, and stores `ruleScopes` of that clause as `ref.scopes`. It is
  **fail-closed**, unlike every other reader here: a detachment rule addresses the whole army, so an
  unreadable gate would splash over the entire list rather than over one card. Two different reach
  clauses (Custodes' Revered Companions buffs each way) cannot be said by one record either, and
  return nothing. `index.test.js` refuses `target: 'aura'` on a detachment rule without a gate;
- the CARRIER is not modelled at all. Nothing in the list vouches for it and the player is judging
  the 6" anyway, so `aurasReaching` offers one chip headed by the DETACHMENT
  ("Brandfast Oathband · Mobile Sensor Relays", its name and text taken from the detachment's own
  localised rule rather than from `ruleInfo`'s datasheet lookup) to every unit the reach clause
  names — and only while that detachment is fielded (`detIds`, fail-closed for the same reason);
- `resolveModifierEntries` therefore keeps the aura effects OUT of the automatic path (the rest of
  the rule stays gated by its body's own scopes, as before), and `datasheetEntriesFor` delivers them
  when the chip is marked;
- `effectApplies` grew a `strict` flag for exactly this case: the "the extraction matched no
  datasheet, so distrust it" escape is right for a rule printed on one card and wrong for one
  addressing the army. Questor Forgepact's aura names ADEPTUS MECHANICUS — allies this list cannot
  field — and failing open there would buff every Knight. Reaching nobody is the honest answer, and
  Cogbound Alliance stays an empty record because of it.

Two records carry it: `Mobile Sensor Relays` (SUSTAINED HITS 1 for LEAGUES OF VOTANN INFANTRY near a
TRANSPORT) and `Ensorcelled Animus` (+1 WS in melee for SEKHETAR ROBOTS near a PSYKER — previously a
`never` sentinel). Both gates are pinned by name in `index.test.js` rather than trusted to the next
generator run: a gate is only as good as the reading behind it, and nothing else in the record shows
what it reads.

Writing them turned up a hole in that reader, fixed the same day: **`ruleScopes` knew the slash
alternation and not the English list** — "a WRAITHBLADES, WRAITHGUARD or WRAITHLORD unit" kept
WRAITHLORD alone and "friendly JAKHALS or GOREMONGERS units" matched nothing at all. `KW_ALT` now
spans `,`/`or`/`and` runs. Measured over all 30 factions, that moved 16 rules to MORE units (each
one a rule that had been hiding from units it names — Ork Bully Boyz never reached Nobz, Wrath of
the Rock reached 57 fewer units than it names) and two the other way, both correctly: Skitarii
Hunter Cohort and Cult of Blood name their targets in a list, so they had matched no keyword end to
end and been shown to the whole army by escape 2. Two aura records gained a gate they should always
have had — Abaddon's Mark of Chaos Ascendant (HERETIC ASTARTES INFANTRY/MOUNTED excluding DAMNED)
and GSC's Martial Espionage — so their chips no longer offer themselves to units the prose never
names. The numbers are in `ruleTargets.js`'s own header; re-measure the same way after touching
those patterns, and diff the per-rule visible unit SETS, not just the totals.

Still empty on purpose: Cogbound Alliance (above), Aeldari's `Shepherds of the Dead` (grants a
faction ability, which this layer has no `stat` for) and World Eaters' `Idols of Khorne`, which now
reads its gate but needs one of three once-per-battle idols to be the one selected this round — a
pick this layer does not model for a detachment rule.

Of the conditional effects that stay sentinels, the reasons are worth knowing before trying to
shrink the number: 26 name part of a unit the rule's own prose gives no statement for
(`blocked-subset`), a handful restrict to a weapon chosen at deployment that nothing records
(`blocked-weapon`), and the rest are `never` — resolved per attack, by range, by an aura, or by a
once-per-battle activation the player simply decides. Adding a phase clock (2026-08-22) freed
eleven of them and no more; the remainder are not waiting on machinery.

What is still genuinely missing, feature-wise: import reads the GW app, listhammer.info (both
modes) and the WTC family, but no `.ros` (BattleScribe is dead — BSData targets New Recruit now),
and **export** writes a GW-app-shaped text that is close to but not byte-exact with the real thing.
