// Pure VP-scoring helpers that operate on ANY game object (the active `current` or a finished
// game from history). useTracker.js wraps these for the active game; the history view passes a
// stored game directly. Keeping the logic here is the single source of truth for the caps.

export const PRIMARY_GAME_CAP = 50
export const FIXED_SECONDARY_CAP = 20 // each fixed secondary, over the game
export const SECONDARY_GAME_CAP = 40
export const BATTLE_READY_VP = 10

export function primaryTotal(game, pi) {
  const pl = game.players[pi]
  return Math.min(pl.rounds.reduce((s, r) => s + (r.primary || 0), 0), PRIMARY_GAME_CAP)
}

export function secondaryTotal(game, pi) {
  const pl = game.players[pi]
  let total
  if (pl.secondaryMode === 'fixed') {
    const bySlug = {}
    for (const e of pl.secondary.scored) bySlug[e.slug] = (bySlug[e.slug] || 0) + e.vp
    total = Object.values(bySlug).reduce((s, v) => s + Math.min(v, FIXED_SECONDARY_CAP), 0)
  } else {
    total = pl.secondary.scored.reduce((s, e) => s + e.vp, 0)
  }
  return Math.min(total, SECONDARY_GAME_CAP)
}

export function grandTotal(game, pi) {
  const bonus = game.players[pi].battleReady ? BATTLE_READY_VP : 0
  return primaryTotal(game, pi) + secondaryTotal(game, pi) + bonus
}

export function leader(game) {
  if (!game) return -1
  const a = grandTotal(game, 0)
  const b = grandTotal(game, 1)
  if (a === b) return -1
  return a > b ? 0 : 1
}
