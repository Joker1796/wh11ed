import { describe, it, expect } from 'vitest'
import { missions } from '../data/missions.js'
import { scoringMoment, lockedNow } from './missionTiming.js'

// The gate: every scoring block of every card has a known moment. A new phrasing in the data
// (an erratum, a new mission pack) fails here instead of scoring in the wrong turn.
describe('missionTiming — the data', () => {
  it('knows the moment of every scoring block of every primary and secondary card', () => {
    const unknown = []
    for (const m of [...missions.en.primary, ...missions.en.secondary]) {
      m.blocks.forEach((b, bi) => {
        if (!scoringMoment(b)) unknown.push(`${m.slug}#${bi}: ${b.heading} | ${b.when}`)
      })
    }
    expect(unknown).toEqual([])
  })

  it('finds the cards that score at the end of the opponent\'s turn', () => {
    const opp = new Set()
    for (const m of missions.en.secondary) {
      if (m.blocks.some(b => scoringMoment(b)?.at === 'opp-turn')) opp.add(m.name)
    }
    // The four the prototype had to list by hand, found by the data alone.
    for (const name of ['Beacon', 'Burden of Trust', 'Defend Stronghold', 'Display of Might']) {
      expect(opp.has(name)).toBe(true)
    }
  })
})

describe('missionTiming — lockedNow', () => {
  const opp = { at: 'opp-turn' }
  const oppR5 = { at: 'opp-turn', fallback: 'r5' }
  const live = { round: 2, liveRound: 2, lastTurn: false }

  it('refuses an "end of your opponent\'s turn" condition during your own turn only', () => {
    expect(lockedNow(opp, { ...live, pi: 0, turn: 0 })).toBe(true)
    expect(lockedNow(opp, { ...live, pi: 0, turn: 1 })).toBe(false)
    expect(lockedNow({ at: 'your-turn' }, { ...live, pi: 0, turn: 1 })).toBe(false)
  })

  it('lets the owner score it on the turn that closes round five', () => {
    const r5 = { round: 5, liveRound: 5, lastTurn: true, pi: 1, turn: 1 }
    expect(lockedNow(oppR5, r5)).toBe(false)
    expect(lockedNow(opp, r5)).toBe(true)
  })

  it('never refuses a correction to a past round', () => {
    expect(lockedNow(opp, { round: 1, liveRound: 2, lastTurn: false, pi: 0, turn: 0 })).toBe(false)
  })
})
