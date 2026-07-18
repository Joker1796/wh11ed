# wh40k-appdata faction audit — progress tracker

Context: `wh40k-appdata` (private sibling repo, official GW app dump) is now treated as the
100%-authoritative rules source. `scripts/sync-appdata.mjs <slug>` reports what's missing,
extra, or scalar-mismatched in wh11ed's faction/datasheet data compared to it. This file
tracks the faction-by-faction pass through that report — split across two machines working
in parallel. Update this file (tick the box) as part of the same PR that fixes a faction, so
the other machine's next `git pull` sees it's done.

## Protocol (run on both machines)

1. Before EACH faction: `git checkout main && git pull --ff-only` — picks up any
   `scripts/sync-appdata.mjs` false-positive fixes the other machine made.
2. `node scripts/sync-appdata.mjs <slug>` — for every line in the report:
   - `+ missing in wh11ed`: verify against the printed appdata text, then add it (EN + RU,
     following the faction's existing conventions — glosses, bold, ALL-CAPS keywords, etc).
   - `- extra in wh11ed`: check whether it's a genuine removed/renamed/Legends entity, or a
     false positive (e.g. a naming variant — see known false-positive classes below). Fix or
     leave with a one-line reason.
   - `~ ... differs`: check both sides' source before "fixing" — several of these turned out
     to be wh11ed being *more* correct than appdata's flattened points join (see below).
3. `npm run build && npx vitest run` must stay green.
4. Tick this faction's box below, commit it together with the fix.
5. Branch `fix/audit-<slug>`, push, `gh pr create`, `gh pr merge --squash --delete-branch`
   (auto-merge for these audit fixes is pre-authorized — no need to ask per-PR).
6. If a faction reveals a new systematic false positive in the script itself, fix
   `scripts/sync-appdata.mjs` in the same PR (like the ones already found — see below) so
   every faction after it benefits.

## Known false-positive classes already filtered (don't re-report these as bugs)

- **Combat Patrol content.** Publications flagged `isCombatPatrol` (e.g. "Combat Patrol:
  Claw of Ascension") are a separate boxed game mode with fixed 0-point rosters and
  detachment-name-prefixed unit variants; wh11ed is matched-play only and carries none of
  it. `sync-appdata.mjs` now derives the CP datasheet/detachment name sets from the raw
  appdata `tables/` (the bundle flags detachments but not datasheets) and drops them before
  diffing — so a whole missing "detachment + N datasheets, all 0pts" block is almost always
  just a Combat Patrol box, not a real gap.
- The U+2010 hyphen (`‐`) in some appdata names (e.g. "Bio‐horror Disruption") — added to the
  name-normaliser's dash class alongside the U+2011 one.
- wh11ed's `"1CP"` vs appdata's bare `"1"` stratagem CP formatting.
- A `(Aura)`/`(Psychic)` classification suffix wh11ed appends to some enhancement/ability
  names that appdata's bare name doesn't carry.
- Unicode hyphen variants in appdata names (U+2010 HYPHEN, U+2011 non-breaking hyphen) vs a
  regular hyphen-minus in wh11ed's — norm() folds `-–—‑‐` all to `-`.
- MFM "copy tax" points tiers (`note: "1st-2nd"` vs `"3rd+"`, pricier for spamming the same
  unit) — appdata's composition join only exposes the base price. wh11ed having *two* prices
  here is correct, not a bug.
- appdata's own `unit_composition` join occasionally yields duplicate rows for the same
  price — de-duped before comparing.
- Some single-model units carry a **second, higher appdata "default" composition at the same
  1-model size** (imperial-agents Assassins — Callidus 100/**140**, Culexus 85/**125**,
  Eversor 120/**145**, Vindicare 125/**155**, the lone **Agent of the Imperium** allied price;
  necrons C'tan Shards — Deceiver 330/**375**, Nightbringer 360/**405**, Void Dragon 345/**380**,
  Transcendent 340/**380**, provenance unclear). wh11ed shows the base/standard price; leave
  these `~ points differ` lines as-is, don't "fix" to appdata's higher tier.
- For the 5 SM-Chapter factions (black-templars/blood-angels/dark-angels/deathwatch/
  space-wolves): most of the `extra` list is NOT a real gap — appdata's own per-chapter
  bundle only lists that Chapter's exclusive publications, while wh11ed's list (correctly)
  also includes units shared with `space-marines.js`. Only look at `missing`/`differs` for
  these 5; skim `extra` for genuine renames/removals but don't chase the shared-pool units.
- **appdata itself can have a typo** — Blood Angels' "Martial Examplars" is appdata's own
  misspelling of "Martial Exemplars" (wh11ed already had it right). Likewise orks' Bully
  Boyz stratagem: appdata's "Cut' Em Down" mis-places the apostrophe; wh11ed's "Cut 'Em
  Down" is correct — left alone. Don't blindly copy a
  "missing"/"extra" name pair without a sanity check on which side is actually correct
  English.

## Real bugs found so far (patterns to watch for elsewhere)

- An ability's `name` field literally matching the *unit's own name* instead of the ability's
  real name (Deathwatch's Watch Master: ability named "Watch Master" instead of "Rites of
  Battle" — same text, wrong header, in both EN and RU). Check any "extra ability" that reads
  like a unit/character name.
- A stray keyword that leaked from one Chapter's copy into `space-marines.js`'s shared copy
  of a unit (found: "Deathwing" (Dark Angels-only) on the shared Terminator Squad/Land Raider
  Crusader — **fixed** while auditing dark-angels, confirmed against appdata's generic
  Adeptus Astartes copy that neither should carry it, and that dark-angels.js's own
  chapter-local copies already correctly have it).
- Apostrophe-position typos changing meaning ("Fools' Flight" → should be "Fool's Flight",
  Chaos Daemons) — check the stratagem's actual effect text to judge singular vs plural.
- **A Chapter's own bonus ability on a shared-name unit got errata'd and wh11ed still has the
  old one** (Black Templars: Terminator Squad/Land Raider Crusader/Repulsor/Repulsor
  Executioner/Sternguard Veteran Squad each had one datasheet ability swapped for a
  differently-named, differently-worded one in appdata — a real balance/Faction-Pack update,
  not a naming variant). This is exactly why B4 correctly left these chapter-local instead of
  folding them into the shared `space-marines.js` pool — check "differs" units for **all 5
  SM-Chapter factions** for the same pattern, not just missing/extra. Conversely, if an
  ability's *text* is byte-identical to the shared version and only the *name* differs
  (Gladiator Reaper's "Rotating Death" == "Reaping Tally" in appdata's Black Templars view,
  same rules text) — that's a cosmetic chapter-flavored name, not worth duplicating the whole
  datasheet to fix; leave it.
- **A datasheet's `faction`/`core` summary string can be stale generic text** — Black Templars
  had 41 datasheets saying `"faction": "Oath of Moment"` (the generic Space Marines army rule)
  instead of `"faction": "Templar Vows"` (their own). `sync-appdata.mjs` doesn't check this
  field at all (out of scope for the script), so **manually grep each chapter/faction's
  datasheet file for the generic army-rule name** (`grep -c '"faction": "<generic name>"'`)
  and cross-check against the faction's own `armyRule.name` in `src/data/factions/<slug>.js`.

## Machine A — 13 factions (~266 wu)

- [x] adepta-sororitas
- [x] adeptus-custodes
- [x] adeptus-mechanicus
- [x] aeldari
- [x] astra-militarum
- [x] black-templars
- [x] blood-angels
- [x] chaos-knights
- [x] chaos-space-marines
- [x] dark-angels
- [ ] death-guard
- [ ] drukhari
- [ ] emperors-children

## Machine B — 13 factions (~313 wu)

- [x] genestealer-cults
- [x] grey-knights
- [x] imperial-agents
- [x] imperial-knights
- [x] leagues-of-votann
- [x] necrons
- [x] orks
- [ ] space-marines
- [ ] space-wolves
- [ ] tau-empire
- [ ] thousand-sons
- [ ] tyranids
- [ ] world-eaters

## Already done (before the split)

- [x] chaos-daemons
- [x] deathwatch

## Follow-up (after every faction above is checked off)

The 5 SM-Chapter factions (black-templars, blood-angels, dark-angels, deathwatch,
space-wolves) each still carry a chapter-local "differs" set of units that are the *same
unit* as a `space-marines.js` one but not byte-identical (see CLAUDE.md's SM-Chapter
datasheet dedup note — this was deliberately left unresolved during the dedup, pending this
audit). Once every faction above is clear, revisit those and decide whether any should be
folded into the shared pool now that appdata gives a reconciliation source.
