# CLAUDE.md — `src/core/`

The rules of the game as plain functions: building and checking a list, reading the rules that bear
on a unit and applying them to its card, scoring and keeping a game. Separated from the data and from
the app on 2026-10-26 (hub journal `2026-10-26-data-split-stage1`) so the same core can one day be read
by more than this app — and so a reader of any function here can see everything it depends on in its
arguments.

## The one rule

**The core imports nothing from outside `src/core`.** Not Vue, not the browser, not `src/data`, not the
app's composables, components, screens, router, i18n or utils. Data reaches a core function as an
argument; the app loads it and passes it in.

Held twice:
- `eslint.config.js` — `no-restricted-imports` with a message saying what to do instead, and only the
  language's own globals (a `window` or `localStorage` here is `no-undef`);
- `boundary.test.js` — every import, including a dynamic `import()` the linter does not see, resolves
  inside `src/core`.

Tests here may load real data: they are the app's tests of the core, and the boundary is about what
ships.

## Layout

| Folder | What lives there |
|---|---|
| `roster/` | building and checking a list: the engine, validation, limits, enhancement eligibility, export and import, Combat Patrol rosters |
| `rules/` | reading rules and applying them: modifier records onto a card, who a rule targets, doctrines, ability states, the game context a list is read in, stratagem phases, weapon tags and multi-profile weapons; `unitRules.js` — one unit's rules worked out the one way |
| `game/` | a game: whose turn it is and the clock (`clock.js`), scoring, a mission card's rules (`missionCards.js`), mission timing, the CP ledger, the action log, unit status, strict rules |
| `shared/` | what all of them use: `foldName`, the roster/modifier types |

What is NOT core, though it is pure: helpers that exist for a screen (column chunks, anchors, the
segmented slider, plurals, colours, the HTML sanitizer, label formatting, the battle-size chips, the
rows under a unit in a list, how a swap group is drawn, the wargear "i" lookup) stay in the app. The test is
the question "is this a rule of the game, or a way of showing one?".

## One unit, one way

A unit's numbers are read on its card (`src/composables/rosterUnitCard.js`) and on its row in the
roster screen (`RosterViewView`). Both call `rules/unitRules.js` — the keywords its records grant,
the stratagems it can be the target of, the stat pass — and differ only in where their game state
comes from. Until 2026-10-26 each assembled the sequence itself, and the rows had drifted (they left
out the keywords the list's detachments grant). A third reader of a unit's numbers calls the same
two functions.

## How data reaches the core

Two ways, and nothing else:

- **On the thing it describes**, written there by the generator. A unit carries the keywords its rules
  grant it (`grants`, a Chapter's borrowed Codex units the Chapter's `sharedGrants`) and what its items
  stand for (`stands`); an enhancement carries the weapons it gives (`weapons`). `gen-roster-data`
  writes them, and its `--check` holds them to their sources.
- **As an argument.** The keyword vocabulary (`vocabulary` — ruleTargets' `scopesMisread` and the
  rosterStatMods gates), the faction directory for import and export (`factionGroups`), the game clock
  (`GameClock`, built by the app in `src/composables/gameClock.js` because two of its answers are
  tracker settings), a mission card (`cardBlocksOf`). The app's loaders live with the data
  (`src/data/datasheets/index.js`'s `loadKeywordVocabulary`).

**The rule for choosing between the two** (owner, 2026-10-26): a fact about ONE entity goes on that
entity; a reference table shared by many goes in as an argument. One exception stands, on purpose and
for now: `stands` is a fact about an ITEM (a Gun Drone is the twin pulse carbine for any unit that
takes it), but each unit carries the entries for its own items, written by the same generator
function that writes items.js's table, so the two cannot drift. It moves into the item table when
the core takes one `RuleSet` — the items with their `stands`, the keyword vocabulary, the faction
directory, later the condition dictionary — the first step of the rule-bundles stage (hub journal
`2026-10-19-core-split`). Do not add a second such copy; take the table instead.

What the core OWNS outright is the vocabulary of the game itself, not a version of its rules: the
condition dictionary (`rules/conditions.js`), the five Force Dispositions (`roster/dispositions.js`),
which factions are Chapters of the Codex (`shared/smChapters.js`), slugs (`shared/slugify.js`), and the
shape of the data it reads (`shared/roster.types.js`, `shared/data.types.js`). Data may import these;
the core never imports data.

## Types

Every module here starts with `// @ts-check` and is listed in `tsconfig.json`'s `include`
(`strictNullChecks` + `noImplicitAny`); `typeChecked.test.js` fails on one that is not. No JSDoc
casts — `src/composables/typecheckCasts.test.js` — a value that may be missing is guarded in code.

## Moving code in

- `git mv` the file, so its history follows it; fix the imports; no re-export left behind at the old
  path, no copy of a function in two places.
- A hidden data import becomes a parameter. Where a function needs a whole reference (a vocabulary, a
  table of conditions), pass it as one argument — no service locator, no container.
- Before and after every move: `npm test`, `npm run typecheck`, `npm run lint`, and the golden master
  (`npm run golden`, see `golden/README.md`) unchanged byte for byte.
