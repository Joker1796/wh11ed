import { describe, it, expect } from 'vitest'
import {
  PRIMARY_GAME_CAP, FIXED_SECONDARY_CAP, SECONDARY_GAME_CAP, BATTLE_READY_VP,
  primaryTotal, secondaryTotal, grandTotal, leader,
  battlePointsFromVp, battlePoints, BP_TABLE,
} from './gameScoring.js'

// ---- minimal game-object builders ----------------------------------------------------
function player(o = {}) {
  return {
    battleReady: false,
    secondaryMode: 'tactical',
    rounds: [0, 0, 0, 0, 0].map(() => ({ primary: 0, picks: {} })),
    secondary: { scored: [] },
    ...o,
  }
}
function game(p0 = {}, p1 = {}, extra = {}) {
  return { players: [player(p0), player(p1)], settings: {}, ...extra }
}
function withPrimary(perRound) {
  return player({ rounds: perRound.map(v => ({ primary: v, picks: {} })) })
}

describe('primaryTotal', () => {
  it('sums per-round primary VP', () => {
    expect(primaryTotal(game(), 0)).toBe(0)
    const g = { players: [withPrimary([10, 10, 5, 0, 0]), player()] }
    expect(primaryTotal(g, 0)).toBe(25)
  })
  it('caps at the per-game primary cap (50)', () => {
    const g = { players: [withPrimary([15, 15, 15, 15, 15]), player()] }
    expect(primaryTotal(g, 0)).toBe(PRIMARY_GAME_CAP)
    expect(PRIMARY_GAME_CAP).toBe(50)
  })
})

describe('secondaryTotal', () => {
  it('tactical: sums scored VP, capped at 40', () => {
    const g = game({ secondary: { scored: [{ vp: 12 }, { vp: 10 }] } })
    expect(secondaryTotal(g, 0)).toBe(22)
    const over = game({ secondary: { scored: [{ vp: 30 }, { vp: 30 }] } })
    expect(secondaryTotal(over, 0)).toBe(SECONDARY_GAME_CAP)
    expect(SECONDARY_GAME_CAP).toBe(40)
  })
  it('fixed: caps each mission at 20 before the 40 game cap', () => {
    const g = game({
      secondaryMode: 'fixed',
      secondary: { scored: [{ slug: 'a', vp: 15 }, { slug: 'a', vp: 15 }, { slug: 'b', vp: 8 }] },
    })
    // 'a' capped 30→20, 'b' 8 → 28
    expect(secondaryTotal(g, 0)).toBe(28)
    expect(FIXED_SECONDARY_CAP).toBe(20)
  })
})

describe('grandTotal', () => {
  it('adds primary + secondary + battle-ready bonus', () => {
    const g = {
      players: [
        player({ rounds: [{ primary: 10 }, { primary: 5 }, {}, {}, {}], secondary: { scored: [{ vp: 7 }] }, battleReady: true }),
        player(),
      ],
    }
    expect(grandTotal(g, 0)).toBe(15 + 7 + BATTLE_READY_VP)
    expect(BATTLE_READY_VP).toBe(10)
  })
})

describe('battlePointsFromVp', () => {
  it('matches the Teams Event Companion table', () => {
    expect(battlePointsFromVp(86, 54)).toEqual([16, 4])  // diff 32
    expect(battlePointsFromVp(54, 86)).toEqual([4, 16])
    expect(battlePointsFromVp(60, 58)).toEqual([10, 10]) // diff 2
    expect(battlePointsFromVp(50, 50)).toEqual([10, 10]) // exact tie
    expect(battlePointsFromVp(100, 40)).toEqual([20, 0]) // diff 60 → 51+
  })
  it('every bracket sums to 20 and the higher VP takes the bigger BP', () => {
    for (const { win, lose } of BP_TABLE) expect(win + lose).toBe(20)
    // walk one VP at a time across all brackets
    for (let diff = 0; diff <= 60; diff++) {
      const [a, b] = battlePointsFromVp(50 + diff, 50)
      expect(a + b).toBe(20)
      expect(a).toBeGreaterThanOrEqual(b)
    }
  })
})

describe('battlePoints (game)', () => {
  it('derives from VP when played out', () => {
    const g = { players: [withPrimary([15, 15, 0, 0, 0]), withPrimary([4, 0, 0, 0, 0])] }
    // 30 vs 4 → diff 26 → 15/5
    expect(battlePoints(g)).toEqual([15, 5])
  })
  it('a concede is a 20–0 swing to the winner', () => {
    expect(battlePoints({ endReason: 'opponent-concede', players: [player(), player()] })).toEqual([20, 0])
    expect(battlePoints({ endReason: 'friendly-concede', players: [player(), player()] })).toEqual([0, 20])
  })
})

describe('leader', () => {
  it('VP mode: higher grand total wins, equal is a draw', () => {
    expect(leader({ players: [withPrimary([10, 0, 0, 0, 0]), withPrimary([5, 0, 0, 0, 0])], settings: {} })).toBe(0)
    expect(leader({ players: [withPrimary([5, 0, 0, 0, 0]), withPrimary([10, 0, 0, 0, 0])], settings: {} })).toBe(1)
    expect(leader({ players: [withPrimary([7, 0, 0, 0, 0]), withPrimary([7, 0, 0, 0, 0])], settings: {} })).toBe(-1)
  })
  it('concede overrides points', () => {
    const g = { players: [withPrimary([50, 0, 0, 0, 0]), player()], settings: {}, endReason: 'opponent-concede' }
    expect(leader(g)).toBe(0)
    g.endReason = 'friendly-concede'
    expect(leader(g)).toBe(1)  // player 0 wins on VP but conceded
  })
  it('BP mode: a ≤5 VP gap is a draw (10–10)', () => {
    const close = { players: [withPrimary([12, 0, 0, 0, 0]), withPrimary([10, 0, 0, 0, 0])], settings: { scoreMode: 'bp' } }
    expect(leader(close)).toBe(-1)               // diff 2 → 10–10
    const clear = { players: [withPrimary([30, 0, 0, 0, 0]), withPrimary([10, 0, 0, 0, 0])], settings: { scoreMode: 'bp' } }
    expect(leader(clear)).toBe(0)                // diff 20 → 13–7
  })
})

describe('backward compatibility with partial/old game data', () => {
  it('does not throw on missing players / rounds / secondary / settings', () => {
    expect(grandTotal({ players: [] }, 0)).toBe(0)
    expect(grandTotal({ players: [{}] }, 0)).toBe(0)
    expect(primaryTotal({ players: [{}] }, 0)).toBe(0)
    expect(secondaryTotal({ players: [{ secondaryMode: 'fixed' }] }, 0)).toBe(0)
    expect(leader(null)).toBe(-1)
    expect(leader({ players: [{}, {}] })).toBe(-1)   // no settings, no rounds → 0 vs 0 → draw
  })
})
