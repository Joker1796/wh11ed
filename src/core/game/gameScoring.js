// @ts-check
// Pure VP-scoring helpers that operate on ANY game object (the active `current` or a finished
// game from history). useTracker.js wraps these for the active game; the history view passes a
// stored game directly. Keeping the logic here is the single source of truth for the caps.

/** @typedef {import('../shared/roster.types.js').TrackerGame} TrackerGame */
/** @typedef {import('../shared/roster.types.js').TrackerPlayer} TrackerPlayer */

export const ROUND_COUNT = 5           // battle rounds in a game
export const PRIMARY_GAME_CAP = 45
export const FIXED_SECONDARY_CAP = 20 // each fixed secondary, over the game
export const TACTICAL_SECONDARY_CAP = 5 // each tactical secondary, per scoring ("up to 5VP")
export const SECONDARY_GAME_CAP = 45
export const BATTLE_READY_VP = 10

/** @param {TrackerGame} game @param {number} pi */
export function primaryTotal(game, pi) {
  const pl = game.players?.[pi]
  if (!pl) return 0
  return Math.min((pl.rounds || []).reduce((s, r) => s + (r.primary || 0), 0), PRIMARY_GAME_CAP)
}

export const SECONDARY_ROUND_CAP = 15 // across all secondaries, per battle round

// What a player's secondaries scored in each of the five rounds, every cap applied in the order
// the Event Companion states them (its VP table: "Secondary Missions 45VP (up to 15VP per battle
// round)*", "* In addition, you can gain a maximum of 20VP per Fixed Secondary Mission card"):
// a tactical card scores at most 5VP a time ("up to 5VP" on the cards), a fixed card at most
// 20VP over the game — spent round by round, so a card that hit 20 in round 3 adds nothing
// after — and all of it at most 15VP in a round. The 45VP game cap is secondaryTotal's.
/** @param {TrackerPlayer | null | undefined} player @returns {number[]} */
export function secondaryRounds(player) {
  const scored = player?.secondary?.scored || []
  const fixed = player?.secondaryMode === 'fixed'
  /** @type {Record<string, number>} */
  const fixedLeft = {}
  const out = []
  for (let r = 1; r <= ROUND_COUNT; r++) {
    let vp = 0
    for (const e of scored) {
      if (e?.round !== r) continue
      let v = e.vp || 0
      if (fixed) {
        const left = fixedLeft[e.slug] ?? FIXED_SECONDARY_CAP
        v = Math.min(v, left)
        fixedLeft[e.slug] = left - v
      } else {
        v = Math.min(v, TACTICAL_SECONDARY_CAP)
      }
      vp += v
    }
    out.push(Math.min(vp, SECONDARY_ROUND_CAP))
  }
  return out
}

/** @param {TrackerGame} game @param {number} pi */
export function secondaryTotal(game, pi) {
  const pl = game.players?.[pi]
  if (!pl) return 0
  return Math.min(secondaryRounds(pl).reduce((s, v) => s + v, 0), SECONDARY_GAME_CAP)
}

// Secondary VP scored in ONE battle round, with the per-card and per-round caps applied. The
// game-long 45VP cap is not — it belongs to no round — so the rounds of a game that hit it add
// up to a little more than the total. This is the SHAPE of the scoring, never a second opinion
// on the total: that is secondaryTotal's, and it is capped.
/** @param {TrackerPlayer | null | undefined} player @param {number} round */
export function secondaryInRound(player, round) {
  return secondaryRounds(player)[round - 1] || 0
}

// One player's five rounds: what each scored, and the running VP through it. The Battle-Ready
// bonus is NOT in here — it belongs to the game, not to a round; a caller building a running
// result adds it once (see broadcastPayload's per-round BP).
/** @param {TrackerGame | null | undefined} game @param {number} pi */
export function roundBreakdown(game, pi) {
  const pl = game?.players?.[pi]
  const out = []
  let cumulative = 0
  for (let i = 0; i < ROUND_COUNT; i++) {
    const primary = pl?.rounds?.[i]?.primary || 0
    const secondary = secondaryInRound(pl, i + 1)
    cumulative += primary + secondary
    out.push({ round: i + 1, primary, secondary, vp: primary + secondary, cumulativeVp: cumulative })
  }
  return out
}

/** @param {TrackerGame} game @param {number} pi */
export function grandTotal(game, pi) {
  const bonus = game.players?.[pi]?.battleReady ? BATTLE_READY_VP : 0
  return primaryTotal(game, pi) + secondaryTotal(game, pi) + bonus
}

// Battle Points (Teams Event Companion p.4): each player scores BP from the VP
// differential of their game; the two players' BP always sum to 20. Single source for
// both the calculation and the in-app help table.
export const BP_TABLE = [
  { max: 5, label: '0–5', win: 10, lose: 10 }, { max: 10, label: '6–10', win: 11, lose: 9 },
  { max: 15, label: '11–15', win: 12, lose: 8 }, { max: 20, label: '16–20', win: 13, lose: 7 },
  { max: 25, label: '21–25', win: 14, lose: 6 }, { max: 30, label: '26–30', win: 15, lose: 5 },
  { max: 35, label: '31–35', win: 16, lose: 4 }, { max: 40, label: '36–40', win: 17, lose: 3 },
  { max: 45, label: '41–45', win: 18, lose: 2 }, { max: 50, label: '46–50', win: 19, lose: 1 },
  { max: Infinity, label: '51+', win: 20, lose: 0 },
]
/** @param {number} vpA @param {number} vpB @returns {[number, number]} */
export function battlePointsFromVp(vpA, vpB) {
  const d = Math.abs(vpA - vpB)
  // The last row's `max` is Infinity, so a row is always found; the fallback says so to the checker.
  const b = BP_TABLE.find(x => d <= x.max) || BP_TABLE[BP_TABLE.length - 1]
  return vpA >= vpB ? [b.win, b.lose] : [b.lose, b.win]
}
// This device's own side. `isYou` is absent on the oldest games, whose owner was always the first
// player — hence the fallback to 0.
/** @param {TrackerGame | null | undefined} game */
export function youIndex(game) {
  const i = (game?.players || []).findIndex((p) => p?.isYou)
  return i >= 0 ? i : 0
}

// Which side conceded (0 | 1), or -1. A game finished since 2026-09-27 records the SIDE
// (`concededBy`), because `endReason` says "you" / "the opponent" from the view of the phone that
// finished it — and players[0] is the first-turn player, not necessarily "you", and in a shared
// game the other phone reads the same game with the opposite "you". An older game has only the
// reason, recorded on this very phone, so it is read against this phone's side.
/** @param {TrackerGame | null | undefined} game @returns {number} */
export function concededSide(game) {
  if (!game) return -1
  if (game.concededBy === 0 || game.concededBy === 1) return game.concededBy
  const you = youIndex(game)
  if (game.endReason === 'friendly-concede') return you
  if (game.endReason === 'opponent-concede') return 1 - you
  return -1
}

// How the game ended, said from THIS phone's side — the key the result screens label.
/** @param {TrackerGame | null | undefined} game */
export function endReasonFor(game) {
  const c = concededSide(game)
  if (c < 0) return game?.endReason || null
  return c === youIndex(game) ? 'friendly-concede' : 'opponent-concede'
}

// A conceded game gives the win — and a full 20–0 BP swing — to the other player.
/** @param {TrackerGame | null | undefined} game @returns {[number, number]} */
export function battlePoints(game) {
  if (!game) return [0, 0]
  const c = concededSide(game)
  if (c >= 0) return c === 0 ? [0, 20] : [20, 0]
  return battlePointsFromVp(grandTotal(game, 0), grandTotal(game, 1))
}

/** @param {TrackerGame | null | undefined} game */
export function leader(game) {
  if (!game) return -1
  // A conceded game is won by the other player regardless of points.
  const c = concededSide(game)
  if (c >= 0) return 1 - c
  // In BP mode the winner is decided by Battle Points (so a ≤5 VP gap is a 10–10 draw).
  const [a, b] = game.settings?.scoreMode === 'bp'
    ? battlePoints(game)
    : [grandTotal(game, 0), grandTotal(game, 1)]
  if (a === b) return -1
  return a > b ? 0 : 1
}
