# Battle Record (`/tracker/stats`)

Statistics over the tracker's finished games. Read-only end to end: nothing in this feature writes
a game, a roster or a preference. Split in two, the same way the rest of the tracker is:

| Piece | Where | Job |
|---|---|---|
| `composables/gameStats.js` | pure module | all aggregation, no Vue, no formatting, no i18n |
| `views/tracker/TrackerStatsView.vue` | route `/tracker/stats` | how the numbers read (labels, ordering, what is allowed to be a percentage) |
| `components/tracker/stats/Stat*.vue` | here | three dumb charts: `StatCurve` (SVG line), `StatBars` (bar list), `StatStack` (stacked bar) |

Entry points: the record strip above the history on `/tracker`, the `.rrec` badge on each card in
`/roster`, and the strip under the header of a saved roster's page. The route is private — like
`/tracker/game` it is neither in `STATIC_ROUTES` nor in the sitemap.

## The four rules that keep it honest

1. **Everything is from YOUR side.** Which stored index that is varies (`newGame` reorders players
   so `players[0]` is whoever had the first turn), so the side is always resolved through
   `youIndex()` — `isYou`, with `?? 0` for games saved before the flag existed. This is also why
   "did I go first" is read off the array position and not off `settings.firstTurn`, which is
   normalised to 1 at setup.
2. **`MIN_SAMPLE` (5).** Under it, no percentage is printed — the headline card shows `—` and every
   breakdown row shows its raw `W–L–D` and dims (`.dim`). Rows are never hidden for being small:
   the games happened. If you add a breakdown, carry `enough` through to the UI.
3. **An unfinished game is not a result.** `endReason: 'early'` is what `archiveCurrent()` writes
   when a live game is shelved to start another; those are excluded and counted in `skipped`, which
   the page states out loud. Concessions *are* results (`friendly-concede` → loss, and a 20–0 BP
   sweep), matching `gameScoring.leader()` and the history cards.
4. **Stored totals win.** `vpTotals()` prefers `result.totals` — the VP as they stood at the finish
   — and only recomputes for records too old to have it. Re-scoring an old game under today's caps
   would quietly rewrite history.

## Charts

Hand-rolled inline SVG on the theme's CSS variables. **Do not add a chart library**: the smallest
credible one costs more than the whole tracker section, the PWA precache is a product constraint
(see the Offline section in `wh11ed/CLAUDE.md`), and these are two polylines and some rectangles.
Every chart prints its numbers as text as well — that is the phone-sized and screen-reader version,
not decoration.

Series colours are fixed by meaning: you = `--accent`, opponent = `--text-dim` dashed; win gold
`#e3b341` and loss red `#c0392b` are the same two the history cards use.

## Known approximation

`rounds[].youCum` adds per-round secondary VP with the *tactical* per-scoring cap (5VP) applied per
entry. The fixed-secondary cap (20VP) is a whole-game cap and cannot be applied per round, so a
fixed-secondary player's curve can read slightly high in the middle rounds. The end-of-game numbers
(`split`, `avgFor`) go through `gameScoring`, so they are exact — the curve is the shape of the
scoring, not a second opinion on the total.

## Reading the history without the tracker store

`gameStats.js` owns `HISTORY_KEY` and a `loadHistory()` one-shot read; `useTracker.js` imports the
key from here and stays the only **writer**. Screens outside the tracker (the roster list, a
roster's page) use `loadHistory()` — they cannot change a game, so a non-reactive read is correct
and they do not need the store. Anything **inside** the tracker must pass `useTracker()`'s live
`history` ref instead, or it will show a stale record the moment a game is archived.
