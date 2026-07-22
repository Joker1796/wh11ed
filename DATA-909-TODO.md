# Data reconciliation to app data_version 909 — remaining work (machine 2)

> Temporary hand-off note. Delete this file once the tasks below are done.

**Context.** The official Warhammer 40,000 App reached **v2.2.0 / data_version 909**
(the 895→909 dataslate). `wh40k-appdata` was rebuilt from the v2.2.0 `dump.json` and
pushed (it's now at 909 — pull it). Machine 1 already reconciled the mechanical bulk on
`main` (all pushed):

- detachment **dp / Force Disposition** (87) — `src/data/mfm/*.js`
- **datasheet points** (221 auto + 6 hand-fixed) — `src/data/datasheets/*.js`
- **enhancement points** (23) — `src/data/factions/*.js`
- two **Ork stratagem names** (Krushin' Impact, Cut’ Em Down) + RU keys
- **missions**: no real change (identical 895↔909 — documented false-positives, no-op)

`SYNCED_DATA_VERSION` is still 895 on purpose — bump it to 909 only after the below is done.

## Your tasks

### 1. Two new detachments (from appdata 909)
Transcribe into the faction data, following the existing detachment structure in each file:
- **Orks → "Equatorial Hordes"** — source `../wh40k-appdata/factions/orks.json`.
- **Space Marines → "Vengeful Hosts"** — source `../wh40k-appdata/factions/adeptus-astartes.json`.

For each: the detachment **rule**, **stratagems** and **enhancements** →
`src/data/factions/<slug>.js`; its **dp / forceDisposition / enhancement points** →
`src/data/mfm/<slug>.js`; and the **RU overlay** (names + translated text) →
`src/data/factions/ru/<slug>.js`. Mind EN↔RU parity and the ALL-CAPS-keywords-stay-English rule.

### 2. Core rules
Add the **5 new subsections** appdata 909 has and wh11ed lacks (from
`../wh40k-appdata/factions/_core-rules.json`), keeping EN↔RU parity:
- `01.04.05` Table Quarters → `src/data/basicRules.js`
- `09.07.01` Desperate Escape → `basicRules.js`
- `14.02.01` Controlling an Objective at the End of a Phase → `battlefields.js`
- `20.01.02` Strategic Reserves at the End of the Battle → `advancedRules.js`
- `24.28.01` Precision and Devastating Wounds → `reference.js` (nest under the ability)

Then review the ~15 **"low text overlap"** `sync-core` findings
(basicRules / battleRound / battlefields / advancedRules / reference / muster): most are
wh11ed's intentionally condensed app-text, but check each against `_core-rules.json` for a
real 909 errata rewording. (The `24 / 24.11.01 / 24.24.01 / 24.26.01 "missing"` findings are
false positives — that content already exists nested inside `reference.js` `coreAbilities`.)

### 3. FAQ
Reconcile the core-rules FAQ — `reference.js` `faqs` (35 en entries) — against appdata 909's
FAQ table (`../wh40k-appdata/tables/faq.json`), limited to the **core-rules publication**
(most of the 837 rows are per-datasheet errata already baked into the datasheet data — skip those).

## Finish
- `npm run sync` — should be clean apart from the documented false-positives:
  mission paraphrase/vpCap/cumulative; allied/loadout datasheet points representation
  (e.g. Watch Master 105, Deathwatch Kill Team 200); the 24.x nested-subsection "missing";
  and Outrider Squad's malformed `{ "points": 60 }` tier (a pre-existing data bug — either
  fix its `models` or drop the tier).
- `npm run build` && `npm test` green.
- Bump `SYNCED_DATA_VERSION` → **909** in `scripts/lib/sync-common.mjs`.
- Delete this file.
