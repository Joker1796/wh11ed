import { describe, it, expect } from 'vitest'
import {
  PRIMARY_GAME_CAP, FIXED_SECONDARY_CAP, TACTICAL_SECONDARY_CAP, SECONDARY_GAME_CAP, SECONDARY_ROUND_CAP, BATTLE_READY_VP,
  primaryTotal, secondaryTotal, secondaryRounds, secondaryInRound, grandTotal, leader,
  battlePointsFromVp, battlePoints, BP_TABLE, concededSide, endReasonFor,
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
  it('caps at the per-game primary cap (45)', () => {
    const g = { players: [withPrimary([15, 15, 15, 15, 15]), player()] }
    expect(primaryTotal(g, 0)).toBe(PRIMARY_GAME_CAP)
    expect(PRIMARY_GAME_CAP).toBe(45)
  })
})

describe('secondaryTotal', () => {
  it('tactical: caps each scoring at 5VP ("up to 5VP"), then sums', () => {
    const g = game({ secondary: { scored: [{ round: 1, vp: 5 }, { round: 1, vp: 3 }] } })
    expect(secondaryTotal(g, 0)).toBe(8)
    // "For each … 3VP" scoring 4 units → 12, but a tactical secondary is capped at 5 each.
    const over = game({ secondary: { scored: [{ round: 1, vp: 12 }, { round: 2, vp: 10 }] } })
    expect(secondaryTotal(over, 0)).toBe(10)
    expect(TACTICAL_SECONDARY_CAP).toBe(5)
  })
  it('tactical: also caps the game total at 45', () => {
    const many = game({ secondary: { scored: Array.from({ length: 10 }, (_, i) => ({ round: 1 + (i % 5), vp: 5 })) } })
    expect(secondaryTotal(many, 0)).toBe(SECONDARY_GAME_CAP)
    expect(SECONDARY_GAME_CAP).toBe(45)
  })
  it('fixed: caps each mission at 20 before the 45 game cap', () => {
    const g = game({
      secondaryMode: 'fixed',
      secondary: { scored: [{ slug: 'a', round: 1, vp: 15 }, { slug: 'a', round: 2, vp: 15 }, { slug: 'b', round: 3, vp: 8 }] },
    })
    // 'a' capped 30→20, 'b' 8 → 28
    expect(secondaryTotal(g, 0)).toBe(28)
    expect(FIXED_SECONDARY_CAP).toBe(20)
  })
  // Event Companion VP table: "45VP (up to 15VP per battle round)" — for both modes.
  it('caps a battle round at 15VP across all cards, and the curve says the same', () => {
    const tac = player({ secondary: { scored: [
      { slug: 'a', round: 2, vp: 5 }, { slug: 'b', round: 2, vp: 5 }, { slug: 'c', round: 2, vp: 5 }, { slug: 'd', round: 2, vp: 4 },
    ] } })
    expect(secondaryTotal({ players: [tac] }, 0)).toBe(SECONDARY_ROUND_CAP)
    expect(secondaryRounds(tac)).toEqual([0, 15, 0, 0, 0])
    expect(secondaryInRound(tac, 2)).toBe(15)
    // A fixed card's 20 is spent round by round, by what the card scored (a: 12 in round 1,
    // so only 8 left for round 2); the round's 15 is applied after, over all the cards.
    const fix = player({ secondaryMode: 'fixed', secondary: { scored: [
      { slug: 'a', round: 1, vp: 12 }, { slug: 'b', round: 1, vp: 8 }, { slug: 'a', round: 2, vp: 12 },
    ] } })
    expect(secondaryRounds(fix)).toEqual([15, 8, 0, 0, 0])
    expect(SECONDARY_ROUND_CAP).toBe(15)
  })
})

describe('grandTotal', () => {
  it('adds primary + secondary + battle-ready bonus', () => {
    const g = {
      players: [
        player({ rounds: [{ primary: 10 }, { primary: 5 }, {}, {}, {}], secondary: { scored: [{ round: 1, vp: 5 }] }, battleReady: true }),
        player(),
      ],
    }
    expect(grandTotal(g, 0)).toBe(15 + 5 + BATTLE_READY_VP)
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

// A concede is a SIDE. players[0] is the first-turn player, not "you" — and a shared game is read
// by two phones with opposite "you" (2026-09-27: the result screen crowned the player who conceded
// when they had gone second).
describe('concededSide', () => {
  const g = (over) => ({ players: [player({ isYou: false }), player({ isYou: true })], ...over })

  it('reads an older game\'s reason against this phone\'s side', () => {
    const youWentSecond = g({ endReason: 'friendly-concede' })
    expect(concededSide(youWentSecond)).toBe(1)
    expect(leader(youWentSecond)).toBe(0)
    expect(battlePoints(youWentSecond)).toEqual([20, 0])
    expect(endReasonFor(youWentSecond)).toBe('friendly-concede')
  })

  it('trusts the recorded side over the reason — the other phone of a shared game', () => {
    // Side 0 conceded on its own phone ("friendly"); this phone plays side 1.
    const read = g({ endReason: 'friendly-concede', concededBy: 0 })
    expect(concededSide(read)).toBe(0)
    expect(leader(read)).toBe(1)
    expect(endReasonFor(read)).toBe('opponent-concede')
  })

  it('is -1 for a game that was played out', () => {
    expect(concededSide(g({ endReason: 'played' }))).toBe(-1)
    expect(endReasonFor(g({ endReason: 'played' }))).toBe('played')
  })
})
