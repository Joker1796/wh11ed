// @ts-check
// Strict rules — a game agreed at the table to be played by the book (owner, 2026-10-19,
// `settings.strictRules`, off by default). Without it the tracker lets a player put things right
// any way they like; with it, what the rules forbid is refused, and a mistake is put right only
// while it is still the side's LAST action ("variant A": the same undo buttons as always, the
// older ones greyed with the reason).
//
// What strict refuses (useTracker.js asks `strictWhy` before each of these, the screen asks the
// same to grey its button and say why — a ui.js key `trackerStrict_<reason>`):
//   'random'    — choosing secondaries by hand: "draw two Secondary Missions" (Event Companion);
//   'noReturn'  — a drawn card back into the deck, or the turn's two cards taken back: either
//                 lets the hand be redrawn until it suits;
//   'noPencil'  — the CP count set by hand: CP come from Core CP, the bonus and spends only;
//   'pastRound' — scoring written into a round already over;
//   'pastTurn'  — scoring written into a turn of the live round already played — except the turn
//                 that just ended, while the side has done nothing in the new one (lateScoreOpen);
//   'lastOnly'  — taking back anything but the side's last action (a stratagem, the bonus point,
//                 a card set aside, a unit destroyed, an army-rule use);
//   'clockBack' — the clock moved back further than one step, or after anything was done since.
//
// "The last action" is read from the game, not recorded apart: every act the game keeps carries
// when it was made (`t`), so the side's newest stamp IS its last action. What the clock does by
// itself is left out — Core CP and the cards an ended turn sets aside are the clock's, and the
// phone that writes them may be seconds behind the one that moved it.

import { turnIndex } from './clock.js'

// Acts of one tap land a few ms apart (a stratagem played on a unit: the spend, then the unit's
// mark); two taps by a hand are further apart than this.
export const SAME_ACT_MS = 1000

/** @typedef {import('../shared/roster.types.js').TrackerGame} TrackerGame */
/** @typedef {import('../shared/roster.types.js').TrackerPlayer} TrackerPlayer */

/** @param {TrackerGame | null | undefined} g */
export function isStrict(g) {
  return !!g?.settings?.strictRules
}

// When this side last did something. `scores: false` leaves its scoring out — a score, and the
// correction act a score into a played turn writes (lateScoreOpen).
/** @param {TrackerPlayer | null | undefined} pl @param {{ scores?: boolean }} [opts] */
export function sideNewest(pl, { scores = true } = {}) {
  let t = 0
  /** @param {unknown} x */
  const at = (x) => { if (typeof x === 'number' && x > t) t = x }
  for (const e of pl?.cpLog || []) if (e.kind !== 'core') at(e.t)
  if (scores) for (const r of pl?.rounds || []) at(r?.t)
  for (const a of pl?.acts || []) if (scores || a.type !== 'fix') at(a.t)
  const s = pl?.secondary
  if (s) {
    if (scores) for (const e of s.scored || []) at(e.t)
    // A card stored as its bare slug (an older game) carries no time.
    for (const d of s.discarded || []) {
      const card = typeof d === 'string' ? null : d
      if (card?.auto == null) at(card?.t)
    }
    for (const v of Object.values(s.drawnAt || {})) at(v)
    for (const e of s.returned || []) at(e.t)
    for (const e of s.whenDrawn || []) at(e.t)
  }
  return t
}

// Is the act stamped `t` still this side's last? The clock moving since (`g.clockAt`) closes it
// too: an ended turn is a step taken after it.
/** @param {TrackerGame | null | undefined} g @param {number} pi @param {unknown} t */
export function isLatest(g, pi, t) {
  if (typeof t !== 'number') return false
  const newest = Math.max(sideNewest(g?.players?.[pi]), g?.clockAt || 0)
  return t >= newest - SAME_ACT_MS
}

// May the clock go back? One step, and only while nobody has done anything since it last moved.
// A game from before `clockAt` was kept says yes: there is nothing to read it from.
/** @param {TrackerGame | null | undefined} g */
export function canClockBack(g) {
  const clockAt = g?.clockAt
  if (!clockAt) return true
  if (g.clockBack) return false
  return (g.players || []).every((pl) => sideNewest(pl) <= clockAt + SAME_ACT_MS)
}

// The turn before the live one — `turn` a player index, as the clock keeps it — or null in the
// battle's first turn.
/** @param {TrackerGame | null | undefined} g */
export function previousTurn(g) {
  if (!g?.currentRound) return null
  if (turnIndex(g) === 1) return { round: g.currentRound, turn: 0 }
  return g.currentRound > 1 ? { round: g.currentRound - 1, turn: 1 } : null
}

// When the live turn began: the newest 'turn' act the clock wrote for it (actionLog), 0 if none.
/** @param {TrackerGame | null | undefined} g */
function turnBeganAt(g) {
  if (!g) return 0
  const R = g.currentRound, T = turnIndex(g)
  let t = 0
  for (const a of g.acts || []) if (a.type === 'turn' && a.round === R && a.turn === T && typeof a.t === 'number' && a.t > t) t = a.t
  return t
}

// May this side still score into the turn that just ended? A condition scored "at the end of your
// opponent's turn" falls due as the OTHER side ends it — in a shared game on the other phone, where
// this side is shown, not scored (Mikhail, 2026-11-04: Defend Stronghold could not be scored at all
// under strict rules). So the side has until it does anything in the new turn — a draw, a CP, a
// stratagem; its own late scores do not close it. Only that one turn, only while it is the one
// before the clock, and only the OTHER side's: a side's own turn it ended itself, past the check
// before the turn passes (TurnEndCheckModal).
/** @param {TrackerGame | null | undefined} g @param {number} pi @param {number} round @param {number | null | undefined} turn */
export function lateScoreOpen(g, pi, round, turn) {
  const prev = previousTurn(g)
  if (!prev || prev.round !== round || prev.turn !== turn || turn === pi) return false
  const began = turnBeganAt(g)
  return began > 0 && sideNewest(g?.players?.[pi], { scores: false }) <= began + SAME_ACT_MS
}
