import { describe, it, expect } from 'vitest'
import { missions } from '../data/missions.js'
import { scoringMoment, lockedNow, turnEndChecks, cardMoments } from './missionTiming.js'

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

describe('turnEndChecks / cardMoments', () => {
  // A tiny stand-in for the mission data: slug → EN blocks; scorable returns them with bi.
  const MISSIONS = {
    beacon: [{ heading: 'Any Battle Round', when: "End of your opponent's turn or the end of the fifth battle round (whichever comes first)", kind: 'tactical' }],
    mine: [{ heading: 'Any Battle Round', when: 'End of your turn', kind: 'tactical' }],
    prim: [{ heading: 'Any Battle Round', when: 'End of your turn' }, { heading: 'End of Battle', when: '' }],
    cmd: [{ heading: 'Any Battle Round', when: 'End of your Command phase' }],
    always: [{ heading: 'Any Battle Round', when: 'While this card is active', kind: 'tactical' }],
  }
  const missionEn = (slug) => ({ blocks: MISSIONS[slug] })
  const scorable = (slug) => MISSIONS[slug].map((b, bi) => ({ ...b, bi, rows: [] }))
  const game = (round, turn) => ({
    phase: 'playing', currentRound: round, currentTurn: turn,
    players: [
      { role: 'attacker', secondaryMode: 'tactical', primarySlug: 'prim', secondary: { hand: ['beacon', 'mine'] } },
      { role: 'defender', secondaryMode: 'tactical', primarySlug: 'prim', secondary: { hand: ['beacon'] } },
    ],
  })
  const brief = (checks) => checks.map((c) => `${c.pi}:${c.slug || 'primary'}:${c.blocks.map((b) => b.bi).join(',')}`)

  it('shows the side on turn\'s end-of-your-turn conditions and the other side\'s end-of-opponent\'s-turn ones', () => {
    expect(brief(turnEndChecks(game(2, 0), scorable, missionEn))).toEqual(['0:mine:0', '0:primary:0', '1:beacon:0'])
    expect(brief(turnEndChecks(game(2, 1), scorable, missionEn))).toEqual(['0:beacon:0', '1:primary:0'])
  })

  // Misha, 2026-10-20: "Discard, gain CP and end the turn" opened the check with that very card in
  // it — it could be marked achieved AND pay its CP.
  it('leaves out the card the turn ends by discarding', () => {
    expect(brief(turnEndChecks(game(2, 0), scorable, missionEn, { pi: 0, slug: 'mine' }))).toEqual(['0:primary:0', '1:beacon:0'])
    // Only that side's copy: the other side's card of the same name stays.
    expect(brief(turnEndChecks(game(2, 0), scorable, missionEn, { pi: 0, slug: 'beacon' }))).toEqual(['0:mine:0', '0:primary:0', '1:beacon:0'])
    // A list: every card marked to go at the end of the turn.
    expect(brief(turnEndChecks(game(2, 0), scorable, missionEn, [{ pi: 0, slug: 'mine' }, { pi: 1, slug: 'beacon' }]))).toEqual(['0:primary:0'])
  })

  it('adds the End of Battle and the fifth-round fallback on the turn that closes the battle', () => {
    expect(brief(turnEndChecks(game(5, 1), scorable, missionEn))).toEqual(['0:beacon:0', '0:primary:1', '1:beacon:0', '1:primary:0,1'])
  })

  // The Turn tab's layout of one side's turn: each card once per moment it scores at, the end of
  // the owner's Command phase apart from the end of the turn; "while active" has no moment.
  const moments = (g, pi) => cardMoments(g, pi, scorable, missionEn, (slug) => slug).map((c) => `${c.at}:${c.slug || 'primary'}`)
  it('places a side\'s cards at the step of the turn they score in', () => {
    const g = game(2, 0)
    g.players[0].primarySlug = 'cmd'
    g.players[0].secondary.hand = ['mine', 'beacon', 'always']
    expect(moments(g, 0)).toEqual(['command-end:primary', 'turn-end:mine'])
    expect(moments(g, 1)).toEqual(['turn-end:beacon'])
    // the opponent's turn: the end-of-your-turn cards wait, the opponent's-turn one is due
    expect(moments(game(2, 1), 0)).toEqual(['turn-end:beacon'])
  })
})
