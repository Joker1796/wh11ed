# Golden master

What the rules engine makes of every faction, written down before a refactor and compared after each
step. Built for separating the core from the data (hub journal `2026-10-26-data-split-stage1`), kept
for the next refactor of the same kind.

**What is captured** (`roster.golden.js`, `harness.js`): for every faction the roster builder has and
every one of its detachments, a list holding every unit once at its default size, each Character
attached to the first unit it may lead. For that list — the points, the validation issues, the text
of all six export formats, and every unit's card as `useRosterUnitCard` resolves it (the sheet after
modifiers, the notes, granted keywords and core abilities, ability states, the rules that reach it).
Long prose is reduced to a hash; cards identical across detachments are stored once.

**`variants.golden.js`** adds what those plain lists never ask: each enhancement worn by the first unit
that may carry it, every unit with the first option of each wargear group taken, and every unit in
a game where every condition holds and every stratagem, picked option and once-per-battle rule is
spent (`gameCtx` with all condition ids and all record sids). Its baseline was recorded from the core
split's step 7 (`78fa3c26`), not the commit before the refactor: its harness needs the split's own
API, and it was added to hold the steps that come after.

**The snapshots are not in git** (`golden/__snapshots__/`, ~77 MB for 30 factions). They are a local
baseline: any GW data update rewrites thousands of cards, so as a standing gate they would be
re-accepted blind. The harness is deterministic, so a baseline is rebuilt from any commit:

```bash
git switch --detach <base commit>   # the commit before the refactor (78fa3c26 or later for variants)
npm run golden:baseline             # writes golden/__snapshots__/ (~8 min, one worker)
git switch -                        # back to the work
npm run golden                      # compare; a mismatch names the faction and shows the diff
GOLDEN_FACTIONS=necrons,orks npm run golden   # a few factions only
```

A changed snapshot is either a bug the refactor found (fixed in its own commit, baseline rebuilt on
purpose) or a regression (undo the step). Never re-baseline to make a run pass.
