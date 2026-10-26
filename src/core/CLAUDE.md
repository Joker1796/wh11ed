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
| `roster/` | building and checking a list: the engine, validation, limits, enhancement eligibility, export and import, wargear, Combat Patrol rosters |
| `rules/` | reading rules and applying them: modifier records onto a card, who a rule targets, doctrines, ability states, the game context a list is read in, stratagem phases, weapon tags |
| `game/` | a game: scoring, mission timing, the CP ledger, the action log, unit status, strict rules |
| `shared/` | what all of them use: `foldName`, the roster/modifier types |

What is NOT core, though it is pure: helpers that exist for a screen (column chunks, anchors, the
segmented slider, plurals, colours, the HTML sanitizer, label formatting) stay in the app. The test is
the question "is this a rule of the game, or a way of showing one?".

## Moving code in

- `git mv` the file, so its history follows it; fix the imports; no re-export left behind at the old
  path, no copy of a function in two places.
- A hidden data import becomes a parameter. Where a function needs a whole reference (a vocabulary, a
  table of conditions), pass it as one argument — no service locator, no container.
- Before and after every move: `npm test`, `npm run typecheck`, `npm run lint`, and the golden master
  (`npm run golden`, see `golden/README.md`) unchanged byte for byte.
