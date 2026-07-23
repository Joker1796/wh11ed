# Appdata reconciliation (912) — handoff for machine 2

You are **machine 2**. Machine 1 is the coordinator. This file is your full brief — read it after
`git pull` and work only your assigned slice. When in doubt, do NOT guess: skip and note it.

## What & why

`npm run sync` historically compared datasheet **ability names** and points, but **never** compared
datasheet **keyword lists** or **full rule text**. So over several app versions wh11ed drifted from
the canonical `wh40k-appdata` on: keywords (missing/extra/renamed), datasheet ability wording, and
faction rule text. We are catching up all of it. The 909→912 delta itself was a no-op; this is
**accumulated** drift.

## Policy (non-negotiable)

- **`wh40k-appdata` is canon. Mirror it VERBATIM.** If appdata and wh11ed disagree on a real value,
  change wh11ed to appdata — even for pre-existing drift.
- **Keep appdata's exact spelling, even when it looks like a typo** (e.g. appdata keyword
  `Ghazgkull Thraka` without the `h`, `Kustom Boost-blasta`). Rationale: never risk mistaking a real
  rules change for a typo. Do **not** "correct" appdata.
- **Internal keywords `Frame` / `Mobile` are kept too** — add them where appdata has them.
- **Do NOT strip glosses or layout markup** (`[gloss:…]`, `**bold**`, ALL-CAPS keywords, cross-refs).
  Comparison normalizes markup; the stored data keeps it.
- **Keywords stay English in both locales** — the RU datasheet files carry no `keywords`, so keyword
  edits are **EN only** (`src/data/datasheets/<slug>.js`, not `ru/`).
- **Ability / rule TEXT changes are bilingual** — update EN **and** RU, keeping EN↔RU block parity
  (same count of `▪ ◈ → ### ◆ [img:]` markers) and balanced `**`. ALL-CAPS keywords and
  unit/detachment/stratagem names stay English in RU. Appdata is English-only, so RU is authored by
  hand following the project conventions (see `wh11ed/CLAUDE.md` → *Bilingual content conventions*).
- After any batch: `npm run build` must pass and `npm test` stay green.

## Appdata location

Sibling repo `../wh40k-appdata` (already at data_version 912). If it's elsewhere, set
`WH40K_APPDATA_PATH`. Pull it first so you're on 912.

## Layer 1 — keywords (tool ready, do this first)

Reconcile datasheet `keywords[]` to appdata verbatim with the tool:

```bash
node scripts/appdata-keywords.mjs --faction <your,slugs>          # dry-run, review
node scripts/appdata-keywords.mjs --apply --faction <your,slugs>  # write
```

The tool edits only the per-datasheet `keywords` array, keeps formatting, and **refuses** any
datasheet whose current keywords don't match what it expects (name collision / already edited) —
those print as `SKIP …`. **Handle every SKIP by hand** (find the right datasheet, set its keywords to
appdata's list verbatim). Then `npm run build`.

### Your assigned factions (machine 2)

```
grey-knights, imperial-knights, necrons, orks, space-marines, tau-empire, tyranids
```

Machine 1 takes: adeptus-custodes, adeptus-mechanicus, astra-militarum, black-templars,
blood-angels, chaos-knights, dark-angels, death-guard, deathwatch, drukhari, emperors-children.

Known SKIP you'll hit: `tyranids/Raveners` (two Ravener datasheets collide) — fix by hand.
Necrons `Catacomb Command Barge` (+Noble) is already done by machine 1 on `sync/appdata-912`.

## Layer 2 — datasheet ability text · Layer 3 — faction rule text (UNLOCKED)

Tool: `scripts/appdata-text-diff.mjs` (report-only; fixes are manual, EN + RU).

```bash
node scripts/appdata-text-diff.mjs --datasheets --faction <slugs> --full   # Layer 2
node scripts/appdata-text-diff.mjs --factions   --faction <slugs> --full   # Layer 3
```

It compares SEMANTIC text (glosses/markup normalized away), so every reported line is a real
wording difference. Worst-similarity first; `--full` prints appdata's text already converted to
wh11ed markup (`**bold**`, CAPS keywords, `▪`) — use it as the new EN wording **verbatim**, with
these touch-ups only:
- Normalize appdata's exotic hyphen `‐` to `-`; keep our `\n▪ ` line form for bullets.
- Keep an existing `[gloss:…]` token only if the surrounding wording is unchanged; don't add new ones.
- Old "intentional divergence" comments (e.g. Necrons header re Faction-Pack/wahapedia) are
  OBSOLETE where appdata now differs — appdata wins; update the comment.
- RU: retranslate to mirror the new EN (block parity, balanced `**`, ALL-CAPS keywords and
  unit/detachment/stratagem names stay English).

Scope today: ~230 datasheet-ability + ~656 faction-rule mismatches, most ≥95% (small drift).
Work faction by faction, commit per faction, `npm run build` + `npm test` after each.

### Machine-2 task list (updated 2026-07-23 EOD — machine 1 is out of budget; EVERYTHING below
### is yours now. Machine 1 only reviews/merges PRs and runs the deploy.)

**Status:** Layer 1 (keywords) DONE everywhere (dry-run 0). Layer 2 done for the old machine-1
slice (PR #245). Remaining, in order:

1. **Layer 2, your slice:** grey-knights, imperial-knights, necrons, orks, space-marines,
   tau-empire, tyranids, space-wolves, thousand-sons, world-eaters, genestealer-cults.
   `--apply-en` handles EN; RU by hand for material changes only (cosmetic EN rephrases with an
   already-accurate RU stay). Reusable RU patterns from PR #245: CP-refund «…может задействовать
   её, когда он выбирается целью стратагемы…», objective-control «…пока Уровень контроля (Level of
   Control) вашего оппонента… не окажется больше вашего в конце какой-либо фазы», Stealth+melee
   «Этот юнит имеет Stealth… имеют -1 к броскам попадания», ingress move — англ. термин.
2. **Missing abilities (add, EN+RU):** Cybernetica Datasmith «Data-severed» (adeptus-mechanicus),
   Intercessor Squad «Hail of Bolts» replacing «Target Elimination» (space-marines; check the five
   Chapter files' shared pool — see CLAUDE.md on SM dedup).
3. **Layer 3, ALL factions (both former slices):** `--factions --full`, fixes by hand EN+RU.
   No `--apply-en` for factions (faction files carry glosses/RU objects) — manual, or extend the
   tool carefully first if that pays off.
4. **Changelog:** add ONE bullet to the 2.1.0 entry (src/data/changelog.js, keep EN/RU heading
   positions aligned): rules data updated to the latest GW app version (data version 912) — e.g.
   under a «Данные правил» heading or appended to an existing section.
5. **GSC army tracker rework** (src/data/armyTrackers/genestealer-cults.js +
   ArmyTrackerCard/ArmySpendModal + useTracker `player.army`):
   - «+2» button for the Deeds That Speak to the Masses enhancement — visible/usable ONLY in
     battle round 1 (it's a starting-pool bonus).
   - Spending points must RECORD the resurrected unit: e.g. `army.resurrected: [{label, cost}]`
     (keep it `.passthrough()`-compatible with the backend envelope).
   - New accordion BELOW «Как работает» (same `army-acc` + CollapseTransition design): list of
     resurrected units + an undo button per entry (refunds the cost, removes the entry).
   - Show the resurrected list in the results recap (ArmyRuleSummary) for GSC.

Branch per task, PR to main, do NOT merge — machine 1 merges. After everything lands: machine 1
deploys 2.1.0 with `BUMP=minor npm run deploy` (both domains, per MIGRATION.md).

## Workflow

1. `git pull` (both this repo and `../wh40k-appdata`).
2. Branch: `git checkout -b sync/kw-m2` off the latest `sync/appdata-912` (or `main` once merged).
3. Run the tool `--apply` on your factions; resolve every SKIP by hand.
4. `npm run build` (green) + `npm test` (green).
5. Commit per faction or as one "sync: mirror keywords to appdata 912 (machine 2 slice)".
6. Push, open a PR to `main`, and tell machine 1 the branch/PR + any SKIPs you couldn't resolve.

**Do not merge to `main` yourself** — machine 1 coordinates merges.
