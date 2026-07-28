# appdata coverage plan — cross-machine handoff

**Principle:** wh11ed is a rules resource; `wh40k-appdata` is canon (see
[[feedback_appdata_canon]] / `APPDATA-SYNC-LESSONS.md`). We should pull and guardrail-check
**everything appdata carries that wh11ed also carries** — not just faction datasheets/detachments,
but the Game Tracker's mission data, the core rulebook, and the Event Companion. Anything we render
that appdata also encodes should have a report-only sync script watching it, the same way
`sync-appdata.mjs`/`sync-faction-text.mjs`/`sync-core.mjs`/`sync-tracker.mjs`/
`sync-enh-bodyguards.mjs`/`sync-leader-units.mjs`/`sync-detachment-details.mjs`/
`sync-wargear-options.mjs`/`sync-ally-inclusion.mjs` already do.

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
- `loadout_choice(_set/_wargear_item)`, `limited_wargear_choice(_set/_wargear_item)` + `wargear_limit`,
  `all_model_wargear_choice(_set/_wargear_item)`, `base_miniature_loadout(_wargear_option)` —
  `sync-wargear-options.mjs` (added 2026-07-28). Presence-only (not a structural 1:1 match — see
  its own header). Tuned out several false-positive classes across two triage passes
  (curly-quote/hyphen normalization, word-form numbers ("twice"/"up to two"), redundant whole-unit
  scaling caps — both the family-1 `miniatureId: null` case AND family-2 sets that duplicate a
  family-1 set's items (Tau Crisis suit drones), leading articles, irregular -y→-ies plurals, the 5
  SM-Chapter sourceIds fallback). Down to **10 flags, every one individually verified** (not just
  pattern-matched) — see `APPDATA-SYNC-LESSONS.md` lesson 23 for the full re-verification pass
  (2026-07-28, prompted by a sanity-check request — the first write-up of this list called two of
  these "plausible naming variants" without actually checking, which was too hasty):
  - **imperial-agents' "Nuncio-acquila" ×3** — CONFIRMED appdata self-contradiction: the
    `wargear_item` catalog name has a typo ("Nuncio-**acquila**"), but that same item's OWN ability
    ruleText (`agents-of-the-imperium.json`'s `wargear[].ruleText`, the Designer's Note) spells it
    "Nuncio‐**aquila**" — matching wh11ed exactly. wh11ed is right; the catalog name is the typo.
  - **blood-angels' Death Company Dreadnought "Brutalis fists/bolt rifles"** — CONFIRMED appdata
    self-contradiction, a **new failure mode**: the structural `base_miniature_loadout_wargear_option`
    row for this datasheet points at the *generic* `wargear_item` ids ("Brutalis fists"/"Brutalis
    bolt rifles", shared with the plain `Brutalis Dreadnought` chassis) instead of this datasheet's
    own Blood-Angels-renamed ids ("Blood fists"/"Blood fist bolt rifles") — while the SAME
    datasheet's flat bundle (`blood-angels.json`'s `wargear[]` array, generated from a different
    appdata pipeline stage) correctly has "Blood fists"/"Blood fist bolt rifles". wh11ed already
    says "blood fists" — matches the correct (flat-bundle) side, not the buggy join.
  - **leagues-of-votann's Hekaton Land Fortress "Panspectral Scanner"** — this one WAS a real
    wh11ed typo (not appdata's fault this time — its flat bundle agrees with itself, one word):
    the datasheet's own wargear-ability name was already correctly "Panspectral Scanner" elsewhere
    in the same file, only the `loadout` string's inline mention had drifted to "pan spectral
    scanner" (two words, lowercase). **Fixed**, EN+RU.
  - **Structural per-hardpoint splits, individually re-traced against wh11ed's own `loadout`/
    `options` text (not just categorized by pattern)**: Battlewagon's "3" — the appdata set's 3
    items (`'Ard Case`/`Grabbin' klaw`/`Wreckin' ball`) are exactly the 3 bullets under "any of the
    following," so the cap is self-evident from the list length, no digit needed. Deff Dread's "4"
    — `loadout` literally states "2 big shootas; 2 dread klaws" = 4 independently-swappable
    mounts, matching appdata's limit=4 exactly. War Dog Moirax/Armiger Moirax/Chaos Warhound
    Titan/Warhound Titan's "2" — each states its 2 weapon-mount swaps as two separate full
    sentences ("This model's X can be replaced with…" / "…Y can be replaced with…"), so "2" is the
    count of sentences, not an omitted total.
- `allied_faction(+_datasheet/_keyword/_parent_faction_keyword/_points_limit/_required_detachment)`,
  `faction_keyword_allied_faction` — `sync-ally-inclusion.mjs` (added 2026-07-28). 21 total
  `allied_faction` rows; 13 gate on ≥1 detachment (checked, 32 detachment-checks total since a row
  can span several), 8 are universal (no gating detachment at all).
  **Found along the way:** a detachment's ally clause can legitimately live in the *faction's*
  `armyRule.body` instead of the detachment's own `rule.body` — Drukhari's "Corsairs and Travelling
  Players" and chaos-space-marines' "Cults of the Dark Gods" are both Faction-Pack additions (per
  their own inline source comments) that turned an older per-detachment restriction appdata's
  `allied_faction_required_detachment` table still lists into a blanket army-wide rule; the script
  checks both locations. Of the 5 flags that remain (all Drukhari, "Asuryani" not found): confirmed
  non-issue — Corsairs/Anhrathe have no `faction_keyword` of their own in appdata (only a plain
  `keyword`), so appdata approximates their identity as "Asuryani" (the nearest umbrella), while
  wh11ed's actual text correctly says "Harlequins and Anhrathe" (more precise than appdata's tag).
  **Self-review pass (same day) fixed 3 real bugs in the universal-rule check**, found by asking
  "what's still not certain here" rather than accepting the first clean run: (a) the shared-keyword
  fallback accepted generic words ("Chaos"/"Infantry", 24-55% of all datasheets in the game) as an
  ally-identity signal — now filtered by game-wide frequency (>2% = too generic); (b) the points
  regex only matched "pts", not "points" (Questor Forgepact/Iconoclast Fiefdom both write "points"
  in full — false-flagged until fixed); (c) most seriously, bare name-presence when searching a
  whole faction file counted a **restriction** ("your army cannot include any Agents of the
  Imperium Deathwatch units") and a faction's own **self-reference** (searching aeldari.js for
  "Asuryani" — its own name, used constantly in targeting text) as false "found"s. Replaced with a
  `bodyGrantsInclusion` check requiring the established idiom "can include … <ally>" with no
  "cannot" in between.
  **Correction, same day (2026-07-28):** the "only 1 of 8 present, 7 missing" conclusion above was
  itself wrong — a false positive in the checker, not a real content gap. The check searched every
  RECEIVING faction's whole file for the clause, but GW actually publishes this kind of rule as a
  single named army rule on the ALLY's own codex page (Chaos Daemons' "Daemonic Pact", Imperial
  Knights' "Freeblades", Titan Legions'/Chaos Titan Legions' "Titanic Support", Imperial Agents'
  "Assigned Agents") — not copy-pasted into every faction that can take it. wh11ed already follows
  that same convention for **all 8** universal rows, verbatim (verified word-for-word against
  Wahapedia's 10th-edition transcriptions, cross-checked against appdata's own battle-size/keyword
  numbers — see APPDATA-SYNC-LESSONS.md lesson 24). `sync-ally-inclusion.mjs` was fixed to check the
  ally's own page first (`resolvedOnOwnPage` in the script) before falling back to the
  per-receiving-faction search; a clean run now reports all 8 as either found on the ally's own page
  (7) or found via the pre-existing per-faction search (Harlequins→Asuryani). **There is no missing
  ally-inclusion content and no content-authoring task here** — script #2 is fully done and verified.

  **Real gaps found and fixed 2026-07-28** (appdata is canon — see `[[feedback_appdata_canon]]`):
  Devastator Squad was missing the "heavy flamer" weapon-swap option entirely (no `ranged[]` profile,
  no `options` mention) despite appdata carrying it structurally across all 4 factions that share
  the unit — added the profile (12", D6, N/A, S5, AP-1, D1, [TORRENT]/[IGNORES COVER], reusing the
  identical profile already used elsewhere in `space-marines.js`) and the option line, EN+RU, fixed
  once in the shared pool. Death Company Marines with Jump Packs' power fist/power weapon swap said
  "1 model" but appdata's bracket is 2 at the unit's 5-model minimum (irregular scaling — 3 at 10,
  not a clean double) — corrected the base count to "up to 2 models"; the 10-model→3 nuance is left
  unstated (same "why fabricate an uncertain ratio" reasoning as the structural-noise cases above).

  **Resolved 2026-07-28 (no wh11ed change needed) — verified, not just dismissed:** Inquisitorial
  Agents' Tome-skull structural bracket (`wargear_limit`) reads 6/11-model where the other 3
  brackets on the same unit read 5/10 — first glance called this an appdata inconsistency, but that
  was wrong; re-derived it properly instead. The 3 "5/10" sets are scoped to `miniatureId` = the
  **Inquisitorial Agent** miniature specifically (checked against `miniature.json`), so their
  `modelCount` counts *that sub-type only*. Tome-skull's set is the sole one with
  `miniatureId: null` — not scoped to one miniature — so its `modelCount` counts the **whole unit**
  (Agents + Gun Servitors) instead, a different but equally valid basis, not a typo. Checked whether
  the two bases actually agree given this datasheet's composition (5–10 Agents, 1–2 Gun Servitors,
  *2 Servitors only allowed with 10 Agents*): every legal roster is either 5–9 Agents+1 Servitor (6–10
  models total) or 10 Agents+1–2 Servitors (11–12 total) — so ⌊agents/5⌋ and the ≥6/≥11 total-model
  thresholds produce the identical Tome-skull count in **every** valid composition (the Servitor cap
  being locked to 10 Agents is exactly what makes "total ≥ 11" and "agents = 10" coincide). appdata
  is encoding the same "for every 5 Agents" rule via a total-model proxy that only works because of
  that composition constraint — confirmed self-consistent, not a data quirk. wh11ed's prose already
  matches (verbatim, cross-checked against `agents-of-the-imperium.json`'s `wargearRules`). The
  printed 10th-ed card (user-provided) additionally confirmed the composition itself (no Ogryns, no
  Auspex/Cloaking/Personal Teleporter options, different ability set) changed since 10th ed in a way
  wh11ed and current appdata both already reflect correctly — nothing to backport from the old card.

**Confirmed out of scope by design (don't build anything here):**
- `datasheet_points_step`, `detachment_faction_detachment_points_cost` — points are MFM territory,
  not appdata rules text (see `[[feedback_appdata_canon]]`).
- Every `isCombatPatrol` detachment/datasheet/publication — see `combatPatrolNames()` in
  `scripts/lib/sync-common.mjs`; wh11ed carries none of it (see the Combat Patrol section below for
  the one thing that might change here later).

## Tomorrow: 3 more guardrail scripts, in this order (ranked by how often this exact category
produced a real bug during the 30-faction reconciliation — see `APPDATA-SYNC-LESSONS.md`)

Each follows the established pattern: report-only, wired into `scripts/sync.mjs` (add a `run(...)`
line) + this repo's `npm run sync`, bridged via `src/data/sourceIds.json` where a stable uuid link
exists (never match by bare name alone — collisions are common, see `sync-leader-units.mjs`'s
header comment for the list of repeat names across factions).

**Done:** `sync-wargear-options.mjs` (wargear/loadout structural options), `sync-ally-inclusion.mjs`
(allied-faction inclusion clauses) — see the "Already covered" list above.

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
