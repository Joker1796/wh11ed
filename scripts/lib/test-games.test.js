import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { TEST_GAMES, playTestGames } from './test-games.mjs'
import * as mod from '../../src/composables/useTracker.js'
import { gameBegun } from '../../src/composables/useTracker.js'

// Each test game is played through the store and must stop where its spec says, with the armies
// it was given — a spec that no longer plays (a renamed roster, a faction without detachments, a
// clock that moved) is caught here rather than on the stand.
describe('test games', () => {
  it('play to where each one is meant to stop', async () => {
    localStorage.clear()
    const games = await playTestGames(mod, mod.useTracker(), nextTick, { now: 0 })
    expect(games).toHaveLength(TEST_GAMES.length)
    for (const [n, G] of TEST_GAMES.entries()) {
      const g = games[n]
      expect(g.id, G.key).toBe(`seed-${G.key}`)
      expect(g.endReason, G.key).toBe('early')
      if (!G.upTo) {
        expect(gameBegun(g), G.key).toBe(false)
        continue
      }
      const [R, T, P] = G.upTo
      expect([g.currentRound, g.currentTurn, g.currentPhase], G.key).toEqual([R, T, P || 'command'])
      expect(g.players.every((p) => p.disposition), G.key).toBe(true)
      // Something was scored, or the screen shows nothing worth checking.
      expect(g.players.some((p) => p.rounds.some((r) => r.primary > 0)), G.key).toBe(true)
      const lists = g.players.flatMap((p) => (p.members || [p]).map((m) => !!m.roster))
      const meant = G.sides.flatMap((s) => (G.doubles ? s : [s]).map((a) => !!a[1]))
      expect(lists, G.key).toEqual(meant)
    }
  })
})
