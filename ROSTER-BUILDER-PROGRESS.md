# Roster Builder — status

Written 2026-08-03 after merging `main` into `feat/roster-builder` (branch had diverged 13
days / 396 main commits). Transient tracking doc — architecture reference lives in
`src/components/roster/CLAUDE.md` (directory-scoped, loads contextually instead of bloating
`wh11ed/CLAUDE.md`); this file is just the "what's left" list so it doesn't get re-derived
from the commit log again. Delete once every item below is closed.

## Status: functionally complete v1, undocumented (now documented)

The commit history (`git log --oneline <merge-base>..055cf56`) runs through named phases —
Phase 2a (derived data layer) → Phase 9 ("hand off to the tracker") — followed by a round of
polish commits (warlord/enhancement eligibility, tabbed editor, accordions, wargear group
order). The core loop (build a list → validate → export/share → hand off to the Game Tracker)
is implemented and tested.

## Open items

1. **`RosterUnitRulesModal` doesn't overlay live modifiers.** It renders the unit's *base*
   datasheet only — a chosen enhancement, wargear pick, or Warlord trait that changes a
   stat/ability isn't reflected in the preview. Explicitly flagged in the component's own
   comment (`src/components/roster/RosterUnitRulesModal.vue:4-7`). The roster entry (wargear
   picks, enhancement, warlord flag) is already available to the caller — this is a "do the
   overlay" task, not a "find the data" task.
   **Grew into its own multi-phase task on 2026-08-19 — plan, decisions and progress now live
   in `ROSTER-MODIFIERS-PROGRESS.md`.** Short version of what the research found: appdata has
   almost no structural modifiers (6 ability + 2 weapon-profile links across 961 enhancements),
   so an overlay attributes rather than silently recomputes — same philosophy as the existing
   `grantedKeywords` prop on `DatasheetCard`.
2. **No cloud backup.** Game Tracker history syncs to `wh11ed-api`; rosters are
   `localStorage`-only (`useRosters.js`). Unclear whether that's a deliberate v1 scope cut
   (rosters are meant to be quick/disposable, sharing already covers cross-device via the
   link) or a planned follow-up — worth a decision before calling this "done", not
   something to build blind.
3. **Stale comment** in `scripts/gen-roster-data.mjs`'s header claiming it "emits units
   without gear for now" — **fixed 2026-08-19** while working on item 5.

4. **`lockDs` inverted eligibility for all 13 attach-granting enhancements — FIXED 2026-08-19.**
   Reported as Necrons' Murdermind being offered on Skorpekh Destroyers though its own text says
   **CRYPTEK** model only.

   Cause: `gen-roster-data.mjs` read appdata's `enhancement_bodyguard_group` (+ `_datasheet`) as a
   whitelist of datasheets allowed to TAKE the enhancement and emitted it as `lockDs`. Those
   tables actually list the units the *bearer* may attach to — which this repo already documented
   correctly in `scripts/sync-enh-bodyguards.mjs`'s header. The gate fired in both directions:
   Murdermind was offered on the four Destroyer datasheets and refused to all 7 Crypteks;
   Slippery Git landed on Kommandos and not the Warboss; Catechism of Divine Penitence on
   Repentia Squad and not the Canoness; Wolf-touched on Wulfen. All 13 enhancements carrying such
   a group were affected, across ~10 factions.

   Fix: that one source was removed from the generator and the roster data regenerated (13
   `lockDs` entries gone). **`lockDs` itself stayed** — the first fix sketch here was wrong about
   that. Its other source, the hand-curated `ENH_LOCK_FIXES`, is legitimate and load-bearing: 36
   "(Upgrade)"-type enhancements name one unit in their prose while appdata records no
   unit-specific keyword at all, so without the lock they show on any Character of the faction
   (Necrons' Enlivened Sentinels appearing on Immortals). Regression tests in
   `rosterEngine.test.js` pin both halves — real data for the attach-granting ones, a fixture for
   the curated lock. The regeneration also brought the roster data up from appdata 913 to 925,
   which added 4 Aeldari units (Clanblade, Dragon Knights, Leystalker, Stonesinger) and changed
   no points, sizes or detachments.

   **Follow-up, also done (2026-08-19):** the attach those tables really describe is now modelled.
   `enhancement_bodyguard_group` is read again — for its actual meaning — and emitted as `attach`
   on the enhancement, so taking Murdermind widens a Cryptek's attachment picker to the Destroyer
   squads instead of leaving it at Immortals. `rosterEngine.js`'s new `leadsFor()` is the single
   place that merges a datasheet's printed `leads` with an entry's granted ones; the picker, the
   reverse "attached leaders" lists and `validateRoster`'s two attachment checks all go through
   it. 13 enhancements across 10 factions grant an attach; all 13 resolve within their own
   faction.

5. **A wargear option can be a BUNDLE of items — FIXED 2026-08-19.**
   Reported on Drukhari Wracks: the instruction offers "1 model's twin torturer's
   tools can be replaced with **1 hexrifle and 1 torturer's tool**", but the checkboxes only let
   you take the hexrifle.

   Not a rendering bug — it goes down to appdata. A `wargear_option` row carries exactly ONE
   `wargearItemId`; the "…and 1 torturer's tool" half of the swap exists only in the group's
   prose. The GW app's own model is a multi-select over those items, with the prose as the
   constraint; `gen-roster-data.mjs` reads the same flat list and `UnitEditorFields`'s `mode()`
   turns any group of 2+ options into a one-of radio. So a bundle option silently loses its
   other half, and the entry's loadout — hence the export, and Tier A's weapon-table trim —
   is missing a weapon the model really has.

   Measured across all 30 factions: **182 of 1475 wargear groups, on 125 units**, name two or
   more of their own items in a single option. Two shapes:
   - **105 plain bundles** — a whole group whose one instruction is a bundle ("This model's
     zealot's vindictor can be replaced with 1 holy pistol and 1 power weapon"). There is no
     choice to make here at all; it should be a single toggle granting both items, and today it
     renders as a 2-way radio where either pick is wrong.
   - **77 bullet bundles** — a real one-of list where at least one bullet combines items
     ("◦ 1 heavy bolter and 1 Mortifier flamer / ◦ 2 Mortifier flamers"). The choice is genuine;
     it is the option that needs to be a set.

   A milder third class (~181 groups) is the **quantity** in the prose — "replaced with 2 bright
   lances" against a single item row. Harmless where it stands, since the weapon table lists a
   name once regardless, but the same parse would fix it.

   **What was built.** `gen-roster-data.mjs`'s `linkWargearBundles` reads the pairing out of the
   prose — and then verifies it against structure, which is what makes it more than a guess:
   appdata's `loadout_choice` enumerates each miniature's complete legal loadouts (1145 of 1146
   datasheets have them), so every set the prose yields must fit inside one of them. **172 groups
   rewritten; 1 left flat** (Space Marines' Lieutenant, whose appdata text reads "1 neo- volkite
   pistol" with a stray space, so the name doesn't resolve — exactly the fail-open case). The run
   prints the leftovers by name.

   Reading the list turned up two shapes the first pass missed, both now handled: appdata uses
   four bullet markers (`◦ ■ ▫ •`), and one list (Grey Knights' Brotherhood Terminator Squad) has
   no marker at all — just a head line ending in ':' with an option per line, plus a `*` footnote
   that is a remark about the options rather than one of them. `splitInstruction` in
   `rosterEngine.js` reads the same shapes for rendering and returns that footnote separately.

   Option slot 0 became polymorphic (item id, or the full `[[id, count], …]` set) with
   `optionItems`/`optionLabel` as its only readers — see `src/components/roster/CLAUDE.md`.
   Because a pick is stored as an index INTO the option list, the renumbering forced
   `useRosters.js` SCHEMA_VERSION 2: v1 rosters lose their `wg` picks rather than have an old
   index silently re-read as a different weapon. Everything else about them survives.

6. **How many models may take an option — FIXED 2026-08-19**, the other half of item 5.

   `wargear_option_group` says what a squad may take, never how many models may take it. That was
   guessed from the instruction text, and the guess was wrong both ways: "Up to 4 Dominions can
   each…" read as no cap at all, "For every 5 models, up to 2 Seraphim" as one. Not cosmetic —
   `unitWargearPoints` multiplies a paid option by its count, so a wrong cap misprices the army.

   appdata has it structurally, in the family the generator used to dismiss as redundant:
   `limited_wargear_choice_set` repeats the same choices and `wargear_limit` gives the cap as a
   step table keyed by unit size, with a duplicate cap per threshold (Cadian Shock Troops: 2 picks
   / 1 of a kind at 10 models, 4 / 2 at 20 — hoisting that to the group would misread half the
   brackets). **219 groups capped**; 43 ambiguous + 82 cross-group sets left alone, and one group
   left uncapped because the prose contradicts the table (named in the run). The quantity class
   from item 5 is partly answered here too — a matched set carries the count ("2 inferno pistols").

   Consequences worth knowing: the cap now decides the editor's MODE, so a group letting several
   models each take something is per-option steppers sharing a budget even where appdata calls it
   a checkbox (that was rendering as one choice for the whole squad); a group whose threshold the
   unit hasn't reached says so in words rather than disappearing, so an existing pick can still be
   cleared; and `validateRoster` gained `overWargearLimit`/`overWargearDup` for the list that was
   legal until its unit shrank.

   Still open, and smaller than it looked: the quantity in prose OUTSIDE a limited set ("this
   model's 2 starcannons can be replaced with 2 bright lances") — display-only, since a weapon
   table lists a name once regardless.

7. **The same instruction shown twice — FIXED 2026-08-19.** Reported on Drukhari Wracks ("На
   каждые 5 моделей в отряде:" appearing twice).

   appdata hangs option groups off MINIATURES, not off the datasheet, so a bullet about the whole
   unit is recorded once per miniature profile — checkbox on the leader model, stepper on the
   rank-and-file one. Not just a repeated heading: each copy carried its own allowance, so the
   swap could be taken twice.

   `mergeMiniatureDuplicates` folds a pair into one unit-wide group (`all: 1`, no `m`) when the
   instruction text AND the option sets match — a leader with a real separate allowance is always
   worded differently, so it can't collide. **101 pairs across 50 units**; in all of them the
   copies agreed on what they replace. Running it before the limit matching was the bigger win:
   identical groups were what made a limited set ambiguous, so ambiguity fell 43 → 1 and capped
   groups rose 219 → 261.

   The text match is **whitespace-normalised**, which is the whole of the follow-up commit: the
   two copies are typed into appdata twice and one pair (Deathwatch Terminator Squad) differs by
   a trailing space, so it interned as a different text id and the first, exact version of the
   fold walked past it. It is deliberately **not** order-normalised — a reordered option list is
   a different statement, not the same one written twice.

   A corpus scan of every within-unit pair sharing an option set says what is left, and both
   classes are meant to stay: 7 pairs share the lead-in but differ in options (Battle Sisters'
   "1 Battle Sister's boltgun can be replaced with one of the following" is printed once for the
   special- and once for the heavy-weapon slot — two allowances, and GW prints it that way too),
   and 15 share the options under different text (a base allowance plus an "if this unit contains
   10 models" one). Exact, whitespace-variant and reordered duplicates are all at zero, and
   `src/data/roster/index.test.js` keys its invariant on the normalised text so the next one
   fails a test rather than doubling a section.

   SCHEMA_VERSION 3 for the same reason as v2 — group indices moved, and a stale index would
   quietly mean a different weapon.

## Where the merge-into-main work is recorded

The `main`-catch-up merge itself (conflict resolution, a stale test fixed for `BaseModal`'s
`<Teleport>`, `getFaction()` → `loadFaction()` call-site updates) is documented in the merge
commit message (`git log --grep "Merge branch 'main' into feat/roster-builder"`), not
repeated here — this file is about the feature's own state, not that housekeeping.
