// Pure VP-scoring helpers that operate on ANY game object (the active `current` or a finished
// game from history). useTracker.js wraps these for the active game; the history view passes a
// stored game directly. Keeping the logic here is the single source of truth for the caps.

export const PRIMARY_GAME_CAP = 50
export const FIXED_SECONDARY_CAP = 20 // each fixed secondary, over the game
export const TACTICAL_SECONDARY_CAP = 5 // each tactical secondary, per scoring ("up to 5VP")
export const SECONDARY_GAME_CAP = 40
export const BATTLE_READY_VP = 10

export function primaryTotal(game, pi) {
  const pl = game.players?.[pi]
  if (!pl) return 0
  return Math.min((pl.rounds || []).reduce((s, r) => s + (r.primary || 0), 0), PRIMARY_GAME_CAP)
}

export function secondaryTotal(game, pi) {
  const pl = game.players?.[pi]
  if (!pl) return 0
  const scored = pl.secondary?.scored || []
  let total
  if (pl.secondaryMode === 'fixed') {
    const bySlug = {}
    for (const e of scored) bySlug[e.slug] = (bySlug[e.slug] || 0) + e.vp
    total = Object.values(bySlug).reduce((s, v) => s + Math.min(v, FIXED_SECONDARY_CAP), 0)
  } else {
    // Tactical secondaries score "up to 5VP" per scoring (e.g. "For each … 3VP (up to 5VP)").
    total = scored.reduce((s, e) => s + Math.min(e.vp, TACTICAL_SECONDARY_CAP), 0)
  }
  return Math.min(total, SECONDARY_GAME_CAP)
}

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
export function battlePointsFromVp(vpA, vpB) {
  const d = Math.abs(vpA - vpB)
  const b = BP_TABLE.find(x => d <= x.max)
  return vpA >= vpB ? [b.win, b.lose] : [b.lose, b.win]
}
// A conceded game gives the win — and a full 20–0 BP swing — to the other player.
export function battlePoints(game) {
  if (!game) return [0, 0]
  if (game.endReason === 'friendly-concede') return [0, 20]
  if (game.endReason === 'opponent-concede') return [20, 0]
  return battlePointsFromVp(grandTotal(game, 0), grandTotal(game, 1))
}

export function leader(game) {
  if (!game) return -1
  // A conceded game is won by the other player regardless of points.
  if (game.endReason === 'friendly-concede') return 1   // "You" (player 0) conceded
  if (game.endReason === 'opponent-concede') return 0   // opponent (player 1) conceded
  // In BP mode the winner is decided by Battle Points (so a ≤5 VP gap is a 10–10 draw).
  const [a, b] = game.settings?.scoreMode === 'bp'
    ? battlePoints(game)
    : [grandTotal(game, 0), grandTotal(game, 1)]
  if (a === b) return -1
  return a > b ? 0 : 1
}
