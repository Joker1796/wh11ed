// Command points as a ledger, not a number.
//
// A player's CP used to be one number with a stepper. Mikhail's prototype (2026-09) keeps where
// every point came from and went to — Core CP each turn, the one bonus point a round, the spends —
// and the plan in the hub journal (2026-08-26-cp-tracking.md) named the same thing as the one
// piece everything else needs: without a record, an automatic +1 is a number that jumped and
// nobody can say why, or take it back.
//
// `player.cpLog` is that record: `{ kind, amount, round, turn, source?, ref?, name? }`, amount
// signed.
//   kind 'core'   — Core CP, +1 to both players at each Command phase (battleRound.js, "Gain Core
//                   CP": "both players gain 1CP each turn"). One per (round, turn), both sides.
//   kind 'bonus'  — any other gain. At most ONE per battle round per player (Event Companion,
//                   "Generating Command Points": "Excluding Core CP, each player can gain a
//                   maximum of 1CP per battle round (including the CP gained when a player
//                   discards an active Secondary Mission card)"). source 'manual' (an ability, a
//                   rule — the player says so) or 'discard' (the end-of-turn discard, ref = slug).
//   kind 'spend'  — CP spent: source 'redraw' (the once-per-battle 1CP secondary replacement),
//                   'strat' (a stratagem, ref = its id).
//   kind 'adjust' — a hand correction from the stepper: what the ledger does not explain.
// `player.cp` stays the balance every reader already uses (the score cards, the broadcast, the
// history): `cpBase` + the sum of the ledger, never below 0. `cpBase` is what an older game had
// on its stepper when the ledger started — such a game keeps its number and gains a ledger from
// the next change on.
//
// Everything here is pure over a player object; useTracker.js wraps it for the live game.

export const CP_BONUS_PER_ROUND = 1

export function ledger(pl) {
  if (!Array.isArray(pl.cpLog)) {
    pl.cpBase = pl.cp || 0
    pl.cpLog = []
  }
  return pl.cpLog
}

export function recomputeCp(pl) {
  const sum = (pl.cpLog || []).reduce((s, e) => s + (e.amount || 0), 0)
  pl.cp = Math.max(0, (pl.cpBase || 0) + sum)
  return pl.cp
}

// Every entry carries when it was made (`t`, ms): the game log is read by battle round and turn,
// and within one turn it is this that puts the latest act on top (gameLog.js).
export function addEntry(pl, entry) {
  if (entry.t == null) entry.t = Date.now()
  ledger(pl).push(entry)
  recomputeCp(pl)
  return entry
}

export function removeEntries(pl, pred) {
  const log = ledger(pl)
  const keep = log.filter(e => !pred(e))
  if (keep.length === log.length) return 0
  pl.cpLog = keep
  recomputeCp(pl)
  return log.length - keep.length
}

// The round's bonus entry, if one was gained — the cap is one.
export function bonusIn(pl, round) {
  return (pl.cpLog || []).find(e => e.kind === 'bonus' && e.round === round) || null
}

// The stepper's value set by hand: the difference goes in as an 'adjust' entry.
export function adjustTo(pl, value, round, turn) {
  ledger(pl)
  const delta = Math.max(0, value) - recomputeCp(pl)
  if (delta) addEntry(pl, { kind: 'adjust', amount: delta, round, turn })
}

// Clock positions compare as round, then turn.
export function clockBefore(r1, t1, r2, t2) {
  return r1 < r2 || (r1 === r2 && t1 < t2)
}

// What the ledger spent and on what, oldest first — the stats page's list.
export function spends(pl) {
  return (pl.cpLog || []).filter(e => e.kind === 'spend')
}
