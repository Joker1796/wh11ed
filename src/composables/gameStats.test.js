import { describe, it, expect } from 'vitest'
import { MIN_SAMPLE, buildStats, isResult, outcomeOf, rosterRecords, youIndex } from './gameStats.js'

// A finished game, described from your side. `youFirst` decides the STORED order (players[0] is
// always the first-turn player), which is the whole reason nothing here may index by 0.
function mk({ you = {}, opp = {}, vp = [0, 0], youFirst = true, settings = {}, ...rest } = {}) {
  const player = (p, isYou) => ({
    isYou,
    name: isYou ? 'Me' : 'Them',
    factionSlug: null,
    detachments: [],
    rounds: Array.from({ length: 5 }, () => ({ primary: 0, picks: {} })),
    secondaryMode: 'tactical',
    secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: [] },
    ...p,
  })
  const y = player(you, true)
  const o = player(opp, false)
  return {
    id: 'g' + Math.random().toString(36).slice(2),
    phase: 'finished',
    settings: { battleSize: 'strikeForce', ...settings },
    players: youFirst ? [y, o] : [o, y],
    result: { totals: youFirst ? [vp[0], vp[1]] : [vp[1], vp[0]] },
    ...rest,
  }
}

describe('outcomeOf', () => {
  it('reads your side by the isYou flag, not by index', () => {
    const g = mk({ vp: [80, 60], youFirst: false })
    expect(youIndex(g)).toBe(1)
    expect(outcomeOf(g).vp).toEqual([80, 60])
    expect(outcomeOf(g).side).toBe('win')
  })

  it('falls back to index 0 on a game saved before the flag existed', () => {
    const g = mk({ vp: [80, 60] })
    delete g.players[0].isYou
    expect(youIndex(g)).toBe(0)
    expect(outcomeOf(g).vp).toEqual([80, 60])
  })

  it('a concession decides the game regardless of the score', () => {
    expect(outcomeOf(mk({ vp: [90, 20], endReason: 'friendly-concede' })).side).toBe('loss')
    expect(outcomeOf(mk({ vp: [20, 90], endReason: 'opponent-concede' })).side).toBe('win')
    expect(outcomeOf(mk({ vp: [90, 20], endReason: 'friendly-concede' })).bp).toEqual([0, 20])
  })

  it('in BP mode a ≤5 VP gap is a draw, as the Battle Points table has it', () => {
    const bp = { settings: { scoreMode: 'bp' } }
    expect(outcomeOf(mk({ vp: [80, 77], ...bp })).side).toBe('draw')
    expect(outcomeOf(mk({ vp: [80, 77] })).side).toBe('win')   // …but on raw VP it is a win
  })
})

describe('isResult', () => {
  it('leaves out a game that was shelved rather than played out', () => {
    expect(isResult(mk({ endReason: 'early' }))).toBe(false)
    expect(isResult(mk({ endReason: 'friendly-concede' }))).toBe(true)
    expect(isResult(mk())).toBe(true)
    expect(isResult({ ...mk(), phase: 'playing' })).toBe(false)
  })
})

describe('buildStats — the headline record', () => {
  const history = [
    mk({ vp: [90, 60] }),                       // win
    mk({ vp: [50, 70] }),                       // loss
    mk({ vp: [65, 65] }),                       // draw
    mk({ endReason: 'early', vp: [10, 10] }),   // not a result at all
  ]

  it('counts a draw as half a win and says how many games it left out', () => {
    const s = buildStats(history)
    expect(s.games).toBe(3)
    expect(s.skipped).toBe(1)
    expect(s.record).toEqual({ w: 1, l: 1, d: 1 })
    expect(s.winrate).toBeCloseTo(0.5)
    expect(s.avgFor).toBeCloseTo((90 + 50 + 65) / 3)
    expect(s.avgAgainst).toBeCloseTo((60 + 70 + 65) / 3)
    expect(s.avgDiff).toBeCloseTo(s.avgFor - s.avgAgainst)
  })

  // The threshold is the whole defence against "67% winrate" printed off three games.
  it('marks the sample as too small until MIN_SAMPLE games are in', () => {
    expect(buildStats(history).enough).toBe(false)
    const many = Array.from({ length: MIN_SAMPLE }, () => mk({ vp: [90, 60] }))
    expect(buildStats(many).enough).toBe(true)
  })

  it('reads the current streak off the front of the list and the best win run anywhere in it', () => {
    const s = buildStats([
      mk({ vp: [90, 60] }), mk({ vp: [90, 60] }),                       // the run you are on
      mk({ vp: [40, 80] }),
      mk({ vp: [90, 60] }), mk({ vp: [90, 60] }), mk({ vp: [90, 60] }), // a longer one, earlier
    ])
    expect(s.current).toEqual({ side: 'win', len: 2 })
    expect(s.bestWin).toBe(3)
  })

  it('returns a usable empty shape with no games at all', () => {
    const s = buildStats([])
    expect(s.games).toBe(0)
    expect(s.winrate).toBe(0)
    expect(s.current).toEqual({ side: null, len: 0 })
    expect(s.rounds).toHaveLength(5)
    expect(s.byFaction).toEqual([])
  })
})

describe('buildStats — breakdowns', () => {
  it('splits by your faction, the opponent’s, and every detachment the list carried', () => {
    const s = buildStats([
      mk({ you: { factionSlug: 'orks', detachments: ['Bully Boyz', 'War Horde'] }, opp: { factionSlug: 'aeldari' }, vp: [90, 60] }),
      mk({ you: { factionSlug: 'orks', detachments: ['War Horde'] }, opp: { factionSlug: 'orks' }, vp: [40, 80] }),
    ])
    expect(s.byFaction.map((r) => [r.key, r.games, r.w])).toEqual([['orks', 2, 1]])
    expect(s.byOpponent.map((r) => r.key).sort()).toEqual(['aeldari', 'orks'])
    // A two-detachment army counts for both — that is what "how does this detachment do" means.
    expect(s.byDetachment.find((r) => r.key === 'War Horde').games).toBe(2)
    expect(s.byDetachment.find((r) => r.key === 'Bully Boyz').games).toBe(1)
  })

  it('derives "did I go first" from the stored order, not from a settings flag', () => {
    const s = buildStats([
      mk({ vp: [90, 60] }),                    // you are players[0] → you went first
      mk({ vp: [40, 80], youFirst: false }),   // …and here you did not
    ])
    expect(s.firstTurn.find((r) => r.key === 'first')).toMatchObject({ games: 1, w: 1 })
    expect(s.firstTurn.find((r) => r.key === 'second')).toMatchObject({ games: 1, l: 1 })
  })

  it('keeps a breakdown row’s rate out of the way until it has enough games', () => {
    const s = buildStats([mk({ you: { factionSlug: 'orks' }, vp: [90, 60] })])
    expect(s.byFaction[0].enough).toBe(false)
    expect(s.byFaction[0].winrate).toBe(1)   // computed, but the UI is told not to trust it
  })
})

describe('buildStats — scoring shape', () => {
  it('averages primary per round and runs a cumulative VP curve for both sides', () => {
    const rounds = (...v) => v.map((primary) => ({ primary, picks: {} }))
    const s = buildStats([
      mk({
        you: {
          rounds: rounds(0, 10, 10, 10, 5),
          secondary: { drawn: {}, discarded: [], scored: [{ slug: 'a', round: 2, vp: 5 }] },
        },
        opp: { rounds: rounds(2, 2, 2, 2, 2) },
        vp: [50, 10],
      }),
    ])
    expect(s.rounds.map((r) => r.you)).toEqual([0, 10, 10, 10, 5])
    expect(s.rounds.map((r) => r.opp)).toEqual([2, 2, 2, 2, 2])
    expect(s.rounds.map((r) => r.youCum)).toEqual([0, 15, 25, 35, 40]) // primary + the round-2 card
    expect(s.rounds[4].oppCum).toBe(10)
  })

  it('splits the average score into primary, secondary and the battle-ready bonus', () => {
    const s = buildStats([
      mk({
        you: {
          battleReady: true,
          rounds: [10, 10, 10, 0, 0].map((primary) => ({ primary, picks: {} })),
          secondary: { drawn: {}, discarded: [], scored: [{ slug: 'a', round: 2, vp: 5 }] },
        },
        vp: [45, 0],
      }),
    ])
    expect(s.split.you).toEqual({ primary: 30, secondary: 5, bonus: 10 })
  })

  it('tallies your secondary cards: taken, scored, binned — and clamps a tactical scoring at 5VP', () => {
    const s = buildStats([
      mk({
        you: {
          secondary: {
            drawn: { 'behind-lines': 2, 'no-prisoners': 1 },
            discarded: [{ slug: 'no-prisoners', round: 3 }],
            scored: [{ slug: 'behind-lines', round: 2, vp: 8 }],   // 8 is not a thing: capped at 5
          },
        },
        vp: [5, 0],
      }),
    ])
    const behind = s.secondaries.find((x) => x.slug === 'behind-lines')
    expect(behind).toMatchObject({ drawn: 1, scored: 1, vp: 5, avgVp: 5 })
    expect(s.secondaries.find((x) => x.slug === 'no-prisoners')).toMatchObject({ drawn: 1, scored: 0, discarded: 1 })
  })
})

describe('rosterRecords', () => {
  it('keeps a record per attached list and names it from the snapshot the game carries', () => {
    const withList = (id, name, vp) => mk({ you: { rosterId: id, roster: { name } }, vp })
    const recs = rosterRecords([
      withList('r1', 'Green Tide', [90, 60]),
      withList('r1', 'Green Tide', [40, 80]),
      withList('r2', 'Speed Freeks', [70, 65]),
      mk({ vp: [50, 50] }),                      // no list attached — not a roster's record
    ])
    expect(recs.get('r1')).toMatchObject({ games: 2, w: 1, l: 1, name: 'Green Tide' })
    expect(recs.get('r2')).toMatchObject({ games: 1, w: 1 })
    expect(recs.size).toBe(2)
  })
})
