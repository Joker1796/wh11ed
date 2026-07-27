# appdata coverage plan — cross-machine handoff

**Principle:** wh11ed is a rules resource; `wh40k-appdata` is canon (see
[[feedback_appdata_canon]] / `APPDATA-SYNC-LESSONS.md`). We should pull and guardrail-check
**everything appdata carries that wh11ed also carries** — not just faction datasheets/detachments,
but the Game Tracker's mission data, the core rulebook, and the Event Companion. Anything we render
that appdata also encodes should have a report-only sync script watching it, the same way
`sync-appdata.mjs`/`sync-faction-text.mjs`/`sync-core.mjs`/`sync-tracker.mjs`/
`sync-enh-bodyguards.mjs`/`sync-leader-units.mjs`/`sync-detachment-details.mjs` already do.

This file lives in the repo (not assistant memory) specifically so it's readable from **either
machine** — memory doesn't sync between them (see `[[reference_nested_git_repos]]`,
`[[feedback_git_stash_safety]]`). Delete/trim sections as they're completed, same convention as
`DATASHEET-DRIFT-TODO.md` (now gone) and `MIGRATION.md`.

## Audit of current coverage (done 2026-07-27, cross-referenced against wh40k-appdata's
`SCHEMA.md`, 141 tables total)

**Already covered:**
- The ~48 tables `wh40k-appdata/scripts/build-factions.mjs` folds into the flat
  `factions/<slug>.json` bundle (datasheets, abilities, keywords, wargear profiles, invulnerable
  saves, army rules, detachment rules/stratagems/enhancements, unit composition) — read by
  `sync-appdata.mjs` (structure) and `sync-faction-text.mjs` (prose).
- `_core-content.json` (battle sizes, force dispositions, primary/secondary missions, twists, core
  stratagems) — read by `sync-tracker.mjs`.
- `_core-rules.json` (Core Rules publication, sections 01-23 + 25) — read by `sync-core.mjs`.
  Section 24 (Core Abilities/`reference.js`) is "wired separately" per that script's own header
  comment — **verify this actually runs**, the comment reads slightly ambiguous about whether it's
  done or still a stated follow-up.
- `conditional_keyword` — `gen-conditional-keywords.mjs` (`src/data/conditionalKeywords.json`).
- `detachment_detail` + `detachment_detail_bullet_point` — `sync-detachment-details.mjs` (added
  2026-07-27, see `APPDATA-SYNC-LESSONS.md` lesson 21).
- `enhancement_bodyguard_group(+_datasheet/_keyword)` — `sync-enh-bodyguards.mjs`.
- Leader/Support prose bullet lists — `sync-leader-units.mjs` (deliberately uses prose, not
  `datasheet_bodyguard_group*`, because that table has coverage gaps — see its own header comment).
- `faq` + `faq_config` — `gen-faction-faq.mjs` → `src/data/factionFaq.json`.

**Confirmed out of scope by design (don't build anything here):**
- `datasheet_points_step`, `detachment_faction_detachment_points_cost` — points are MFM territory,
  not appdata rules text (see `[[feedback_appdata_canon]]`).
- Every `isCombatPatrol` detachment/datasheet/publication — see `combatPatrolNames()` in
  `scripts/lib/sync-common.mjs`; wh11ed carries none of it (see the Combat Patrol section below for
  the one thing that might change here later).

## Tomorrow: 5 new guardrail scripts, in this order (ranked by how often this exact category
produced a real bug during the 30-faction reconciliation — see `APPDATA-SYNC-LESSONS.md`)

Each follows the established pattern: report-only, wired into `scripts/sync.mjs` (add a `run(...)`
line) + this repo's `npm run sync`, bridged via `src/data/sourceIds.json` where a stable uuid link
exists (never match by bare name alone — collisions are common, see `sync-leader-units.mjs`'s
header comment for the list of repeat names across factions).

### 1. `sync-wargear-options.mjs` — wargear/loadout structural options
**Tables:** `loadout_choice` + `loadout_choice_set` + `loadout_choice_wargear_item`,
`limited_wargear_choice` + `limited_wargear_choice_set` + `limited_wargear_choice_wargear_item`,
`all_model_wargear_choice` + `all_model_wargear_choice_set` + `all_model_wargear_choice_wargear_item`,
`base_miniature_loadout` + `base_miniature_loadout_wargear_option`, `wargear_limit`.
**Why first:** by far the largest source of past manual fixes (detached footnotes, wrong option
counts, missing options entirely — Boyz/Warboss/Kasrkin/Skitarii Rangers etc, repeated across
nearly every faction commit on the closed branch). Currently only checked via
`sync-faction-text.mjs`'s best-effort fuzzy word-overlap against `wargearRules` prose — never
against the actual structural choice/limit data.
**Approach:** for each wh11ed datasheet's `options[]` entries, resolve the datasheet via
`sourceIds.json`'s `ds:<id>` bridge, then reconstruct appdata's choice sets for that datasheet/
miniature and check (a) every choice set has *some* matching wh11ed option (not necessarily 1:1 —
appdata sometimes splits what wh11ed presents as one option, and vice versa; a presence/count check
per wargear item is more robust than trying to match option-block boundaries), (b) `count`/limit
fields (how many models can take it, `wargear_limit.limitedWargearChoiceSetId`/`modelCount`/
`choiceLimit`/`duplicateLimit`) agree with wh11ed's stated numbers ("for every 5 models…", "up to
3…"). Expect noise from merged-profile datasheets (see lesson 5/6) — may need the same manual
`node -e` fallback those already require.

### 2. `sync-ally-inclusion.mjs` — allied-faction inclusion clauses
**Tables:** `allied_faction` + `allied_faction_datasheet` + `allied_faction_keyword`
(+`_slotless_keyword_group`+`_donor_keyword`+`_receiver_keyword`) + `allied_faction_points_limit` +
`allied_faction_parent_faction_keyword` + `allied_faction_required_detachment`,
`faction_keyword_allied_faction`.
**Why:** every "ally-inclusion" prose block found this whole project (Blood Legions, Scintillating
Legions, Plague Legions, Legions of Excess, Harlequins in Reaper's Wager, Devoted of Ynnead's
Yvraine/Yncarne requirement) needed a manual multi-table grep (lesson 13). This is exactly the
pattern a script should do once and remember.
**Approach:** bridge each wh11ed detachment via `sourceIds.json`, find its `allied_faction` row(s)
via `allied_faction_required_detachment`, resolve the points brackets via
`allied_faction_points_limit` × `battle_size`, resolve the ally faction's display name via
`allied_faction_parent_faction_keyword` → `faction_keyword`, and check the wh11ed detachment rule
body contains the points brackets and ally-faction name. Also worth surfacing (not necessarily
flagging as a hard miss, since lesson 17 says some ally factions have literally no appdata file at
all): which `allied_faction` rows exist with **no** corresponding wh11ed prose at all — that's
either a real gap or a lesson-17 categorical one, needs human judgment either way, but currently
nobody is even listing them.

### 3. `sync-roster-restrictions.mjs` — roster-composition requirements/exclusions
**Tables:** `restriction_group_detachment_limit` + `keyword_restriction_group` +
`keyword_restriction_group_keyword`, `detachment_excluded_datasheet`,
`faction_keyword_excluded_datasheet`, `unit_composition_required_detachment`,
`unit_composition_required_faction_keyword`.
**Why:** "army must include 3+ X" (Houndpack Lance) and "cannot include datasheet Y" (Black Spear
Task Force's Legends exclusions, minus the Legends ones themselves per lesson 14/15) are exactly
this. Small table (7 rows in `restriction_group_detachment_limit`, 16 in
`keyword_restriction_group`) but each row is high-signal.
**Approach:** for each `restriction_group_detachment_limit` row, resolve
`keyword_restriction_group_keyword` → `keyword.json` name, check the bridged wh11ed detachment's
rule body states the same min/max count for that keyword. For `detachment_excluded_datasheet` /
`faction_keyword_excluded_datasheet`, resolve the datasheet name and check it's named in a
Restrictions-style paragraph — expect the Legends exception (lesson 14) to need an explicit
allow-list of "known-excluded-because-Legends" names so it doesn't get flagged every run.

### 4. `sync-enhancement-restrictions.mjs` — enhancement eligibility constraints
**Tables:** `enhancement_required_keyword_group` + `_faction_keyword` + `_keyword`,
`enhancement_excluded_keyword`, `enhancement_required_wargear_item`,
`enhancement_datasheet_ability`, `enhancement_wargear_item_profile`.
**Why:** the "X model only" / "excluding Y models" prefix on an enhancement's body — found missing
once already this session (necrons' "Veil of Darkness", confirmed via
`enhancement_required_keyword_group_faction_keyword` → "Necrons"), fixed by luck of asking the
right follow-up question rather than a standing check.
**Approach:** for each wh11ed enhancement, bridge via `sourceIds.json`'s `enh:` key (check it
exists — if not, may need adding to `gen-source-ids.mjs` first), resolve the required faction
keyword/keyword name(s), check the enhancement body's leading restriction clause names it. Same for
`enhancement_excluded_keyword` ("excluding DAMNED models" style exclusions).

### 5. `sync-army-rule-exclusions.mjs` — army-rule-level Chapter/faction exclusions
**Tables:** `army_rule_faction_keyword`, `army_rule_excluded_from_command_bunker_faction_keyword`.
**Why:** suspected structural home of things like Oath of Moment's "Space Marine Chapters"
merged-card exclusion list (Black Templars ADEPTUS ASTARTES PSYKER ban + vehicle list, Space Wolves
Apothecary/Devastator/Tactical ban, Deathwatch mono-Chapter + excluded-unit list) — found and fixed
by hand during the original space-marines commit, never re-checked structurally since.
**Approach:** unverified how cleanly these two tables map to that specific prose block — **spend
the first 30 minutes on this one just reading the raw rows for `adeptus-astartes`'s army rule and
comparing to the actual wh11ed text**, before writing the comparison logic. May turn out to be a
smaller/different shape than the other four scripts.

## Investigation tasks (do BEFORE deciding whether points 6-7 below are even buildable)

- **Event Companion vs appdata.** Nothing currently checks `eventCompanion.js` (Introduction/
  Sequence/Pairings prose, or the Terrain & Layouts page) against appdata at all. First question:
  does `wh40k-appdata`'s `publication` table even have an Event Companion entry? (`isCoreRules`/
  `isLegends`/`isCombatPatrol` flags on `publication` suggest a few known categories — check if
  there's a 4th kind, or if Event Companion simply isn't tracked, in which case this is a lesson-17-
  style categorical gap, not a missed table.)
- **Terrain & Layouts / mission_layout family.** `mission_layout` + `mission_layout_linked_deployment`
  + `mission_deployment` + `mission_preset` + `force_disposition_mission_recommended_preset` +
  `mission_pack_briefing(+_narrative_point)` + `mission_pack_location(+_location_bonus/_warzone_rule)`
  are NOT in `_core-content.json`, so `sync-tracker.mjs` never sees them. wh11ed's own 45-layout
  A/B/C matchup data (`EventLayoutsView.vue`, `LayoutCard.vue`) was hand-extracted from the PDF via
  pymupdf per `CLAUDE.md` — check whether these tables actually encode the same
  layout↔deployment↔matchup pairings appdata-side, and if so whether they're rich enough to become
  a genuine source of truth (or at least a guardrail) instead of/alongside the current PDF-vector
  extraction pipeline. Don't assume yes or no — actually read a few rows first.
- **`sync-core.mjs` section 24.** Confirm whether Core Abilities (`reference.js`) is actually diffed
  anywhere, per the ambiguity in that script's own header comment ("is a follow-up" vs "wired
  separately below" — these read as contradictory on a second look).

## Future scope (not scheduled — flag for later, needs a product decision first)

**Combat Patrol support.** Every `isCombatPatrol` detachment/datasheet/enhancement/publication is
currently filtered out everywhere (`combatPatrolNames()` in `scripts/lib/sync-common.mjs`) and
wh11ed carries zero Combat Patrol content. Adding it would be a genuinely new product surface, not
a sync-guardrail — open questions to settle before scoping real work:
- Combat Patrol boxes have their OWN copy of shared rules, sometimes **pre-errata** (documented
  precedent: Necrons' Reanimation Protocols reads "reanimates D3" in the CP box vs the Codex's
  errata'd "heals D3" — see `sync-common.mjs`'s own comment). Would CP content need its own,
  separately-maintained pre-errata text, or would we intentionally show the Codex-errata'd version
  even in a CP context (diverging from what the physical/app CP box says)?
  - Combat Patrol rosters are fixed, 0-point army lists with detachment-name-prefixed unit variants
  — this doesn't fit the existing per-faction `datasheets`/`factions` data shape (which assumes
  normal matched-play army building) without new fields/UI, not just new data rows.
  - Scope size: 30 factions × 1 Combat Patrol detachment/publication each (confirmed count from this
    session's audit) — worth a rough size estimate once the shape question above is answered.

## Deploy log
- 2026-07-27 — v2.1.6 deployed: floating faction buttons (desktop) + mobile utility bar,
  Vehicles/Infantry unit-list split, full 30-faction datasheet/rules reconciliation vs appdata
  (PR #264), `sync-detachment-details.mjs` guardrail.
