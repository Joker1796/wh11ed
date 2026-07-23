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

### Layer 2–3 slices (full coverage)

- **Machine 2:** grey-knights, imperial-knights, necrons, orks, space-marines, tau-empire,
  tyranids, space-wolves, thousand-sons, world-eaters, genestealer-cults
- **Machine 1:** adeptus-custodes, adeptus-mechanicus, adepta-sororitas, astra-militarum,
  black-templars, blood-angels, chaos-daemons, chaos-knights, chaos-space-marines, dark-angels,
  death-guard, deathwatch, drukhari, emperors-children, leagues-of-votann, aeldari

## Workflow

1. `git pull` (both this repo and `../wh40k-appdata`).
2. Branch: `git checkout -b sync/kw-m2` off the latest `sync/appdata-912` (or `main` once merged).
3. Run the tool `--apply` on your factions; resolve every SKIP by hand.
4. `npm run build` (green) + `npm test` (green).
5. Commit per faction or as one "sync: mirror keywords to appdata 912 (machine 2 slice)".
6. Push, open a PR to `main`, and tell machine 1 the branch/PR + any SKIPs you couldn't resolve.

**Do not merge to `main` yourself** — machine 1 coordinates merges.
