import { describe, it, expect } from 'vitest'
import {
  SLICE_NAMES, sideOfSlice, sliceGame, assembleGame, applySlice, changedSlices, stableJson,
} from './gameSlices.js'

const snap = (name) => ({ v: 7, name, faction: 'orks', units: [{ uid: 'a', id: 'boyz', wg: [[0, 1, 1]] }] })

function game(over = {}) {
  return {
    id: 'g1', createdAt: '2026-09-17T10:00:00.000Z', phase: 'playing',
    currentRound: 2, currentTurn: 1, currentPhase: 'shooting',
    settings: { firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', trackCP: true },
    players: [
      {
        isYou: true, name: 'Me', factionSlug: 'orks', detachments: ['War Horde'], disposition: 'd0', role: 'attacker',
        secondaryMode: 'tactical', battleReady: true, rosterId: 'r1', roster: snap('Mine'),
        primarySlug: 'p0', cp: 3, army: { counter: 2 }, ctx: { units: { a: { charged: 120 } } },
        rounds: [{ primary: 5, picks: { '0:0': 1 } }, { primary: 0, picks: {} }],
        secondary: { deck: ['x', 'y'], hand: ['z'], drawn: { z: 1 }, discarded: [], scored: [] },
      },
      {
        isYou: false, name: 'Opp', factionSlug: 'necrons', detachments: [], disposition: 'd1', role: 'defender',
        secondaryMode: 'fixed', battleReady: false, rosterId: null, roster: null,
        primarySlug: 'p1', cp: 1, army: {},
        rounds: [{ primary: 0, picks: {} }, { primary: 0, picks: {} }],
        secondary: { deck: [], hand: ['f1', 'f2'], drawn: { f1: 1, f2: 1 }, discarded: [], scored: [] },
      },
    ],
    ...over,
  }
}

function doublesGame() {
  const g = game()
  g.settings.gameType = 'doubles'
  g.players[0] = {
    ...g.players[0], name: 'Team A', teamName: 'Team A', factionSlug: null, detachments: [], rosterId: null, roster: null,
    forceType: 'convenience',
    members: [
      { name: 'A1', factionSlug: 'orks', detachments: ['War Horde'], rosterId: 'r1', roster: snap('A1'), army: { counter: 1 } },
      { name: 'A2', factionSlug: 'necrons', detachments: [], rosterId: null, roster: null, army: {} },
    ],
  }
  return g
}

describe('sideOfSlice', () => {
  it('maps side/roster slices to their side and the shared one to null', () => {
    expect(SLICE_NAMES.map(sideOfSlice)).toEqual([null, 0, 1, 0, 1])
    expect(sideOfSlice('players')).toBeNull()
  })
})

describe('sliceGame / assembleGame', () => {
  it('round-trips a singles game exactly', () => {
    const g = game()
    expect(assembleGame(sliceGame(g), { you: 0 })).toEqual(g)
  })
  it('round-trips a doubles game, members and their lists included', () => {
    const g = doublesGame()
    expect(assembleGame(sliceGame(g), { you: 0 })).toEqual(g)
  })
  it('keeps the roster out of the side slice and the device flag out of every slice', () => {
    const s = sliceGame(game())
    expect(s.side0).not.toHaveProperty('roster')
    expect(s.side0).not.toHaveProperty('rosterId')
    expect(s.side0).not.toHaveProperty('isYou')
    expect(s.shared).not.toHaveProperty('players')
    expect(s.roster0).toEqual({ rosterId: 'r1', roster: snap('Mine') })
    expect(s.roster1).toEqual({ rosterId: null, roster: null })
    const d = sliceGame(doublesGame())
    expect(d.side0.members[0]).not.toHaveProperty('roster')
    expect(d.side0.members[0].army).toEqual({ counter: 1 })
    expect(d.roster0.members[0]).toEqual({ rosterId: 'r1', roster: snap('A1') })
  })
  it('never aliases the source tree', () => {
    const g = game()
    const s = sliceGame(g)
    s.side0.cp = 99
    s.roster0.roster.units.push({ uid: 'b' })
    expect(g.players[0].cp).toBe(3)
    expect(g.players[0].roster.units).toHaveLength(1)
  })
  it('assembles the joiner as You on the side they picked; a missing roster slice is "no list"', () => {
    const { roster0, roster1, ...rest } = sliceGame(game())
    const g = assembleGame(rest, { you: 1 })
    expect(g.players.map((p) => p.isYou)).toEqual([false, true])
    expect(g.players[0]).toMatchObject({ rosterId: null, roster: null })
  })
})

describe('applySlice', () => {
  it('writes another device\'s side in place and touches nothing else', () => {
    const g = game()
    const pl0 = g.players[0], pl1 = g.players[1]
    const remote = sliceGame(game())
    remote.side1.cp = 7
    remote.side1.rounds[1].primary = 10
    remote.side1.secondary.scored.push({ slug: 'f1', round: 2, picks: { '0:0': 1 }, vp: 4 })
    // Local edits on the OTHER slices, made before the remote slice lands.
    g.players[0].cp = 5
    g.currentPhase = 'fight'

    expect(applySlice(g, 'side1', remote.side1)).toBe(true)
    expect(g.players[1]).toBe(pl1)                      // identity kept — readers hold this object
    expect(g.players[0]).toBe(pl0)
    expect(g.players[1].cp).toBe(7)
    expect(g.players[1].rounds[1].primary).toBe(10)
    expect(g.players[1].secondary.scored).toHaveLength(1)
    expect(g.players[1].isYou).toBe(false)              // the device flag is local
    expect(g.players[0].cp).toBe(5)                     // the other side's edit survived
    expect(g.currentPhase).toBe('fight')                // so did the shared one
  })
  it('keeps the local device\'s isYou even when the remote side carries the opposite flag', () => {
    const g = game()
    applySlice(g, 'side0', { ...sliceGame(game()).side0, isYou: false })
    expect(g.players[0].isYou).toBe(true)
  })
  it('leaves this side\'s roster alone when its side slice lands', () => {
    const g = game()
    applySlice(g, 'side0', { ...sliceGame(game()).side0, cp: 9 })
    expect(g.players[0].roster).toEqual(snap('Mine'))
    expect(g.players[0].rosterId).toBe('r1')
    expect(g.players[0].cp).toBe(9)
  })
  it('keeps this phone\'s handles and its own army-card toggles out of the shared slice', () => {
    const g = game({ party: { id: 'p', token: 't' }, broadcast: { token: 'b' } })
    g.settings.trackArmyYou = true
    g.settings.trackArmyOpp = false
    const s = sliceGame(g)
    expect(s.shared).not.toHaveProperty('party')
    expect(s.shared).not.toHaveProperty('broadcast')
    expect(s.shared.settings).not.toHaveProperty('trackArmyYou')
    expect(s.shared.settings).not.toHaveProperty('trackArmyOpp')
    // …and a remote shared slice, however it was built, cannot overwrite them.
    applySlice(g, 'shared', { ...s.shared, party: { id: 'theirs' }, settings: { ...s.shared.settings, trackArmyYou: false, layout: 'B' } })
    expect(g.party).toEqual({ id: 'p', token: 't' })
    expect(g.broadcast).toEqual({ token: 'b' })
    expect(g.settings.trackArmyYou).toBe(true)
    expect(g.settings.trackArmyOpp).toBe(false)
    expect(g.settings.layout).toBe('B')
  })
  it('replaces the shared slice wholesale — a key gone remotely is gone locally', () => {
    const g = game({ phase: 'finished', finishedAt: '2026-09-17T12:00:00.000Z', endReason: 'played', result: { totals: [1, 2] } })
    const remote = sliceGame(game()).shared // resumed: playing, no finish metadata
    applySlice(g, 'shared', remote)
    expect(g.phase).toBe('playing')
    expect(g).not.toHaveProperty('finishedAt')
    expect(g).not.toHaveProperty('result')
    expect(g.players).toHaveLength(2)
  })
  it('attaches and detaches a list through the roster slice, on a side and on a member', () => {
    const g = game()
    applySlice(g, 'roster1', { rosterId: 'r2', roster: snap('Theirs') })
    expect(g.players[1].roster).toEqual(snap('Theirs'))
    expect(g.players[1].cp).toBe(1)
    applySlice(g, 'roster0', { rosterId: null, roster: null })
    expect(g.players[0].roster).toBeNull()
    expect(g.players[0].name).toBe('Me')

    const d = doublesGame()
    const m1 = d.players[0].members[1]
    applySlice(d, 'roster0', { rosterId: null, roster: null, members: [{ rosterId: null, roster: null }, { rosterId: 'r9', roster: snap('A2') }] })
    expect(d.players[0].members[1]).toBe(m1)
    expect(d.players[0].members[1].roster).toEqual(snap('A2'))
    expect(d.players[0].members[0].roster).toBeNull()
    expect(d.players[0].members[0].army).toEqual({ counter: 1 })
  })
  it('a doubles side slice keeps each member\'s list', () => {
    const d = doublesGame()
    const remote = sliceGame(doublesGame()).side0
    remote.members[0].army.counter = 4
    applySlice(d, 'side0', remote)
    expect(d.players[0].members[0].army.counter).toBe(4)
    expect(d.players[0].members[0].roster).toEqual(snap('A1'))
  })
  it('refuses an unknown slice or a game without two players', () => {
    const g = game()
    expect(applySlice(g, 'players', {})).toBe(false)
    expect(applySlice(null, 'shared', {})).toBe(false)
    expect(applySlice({ players: [{}] }, 'side0', {})).toBe(false)
    expect(g).toEqual(game())
  })
  it('after applying every slice the game equals the remote one (minus the device flag)', () => {
    const local = game()
    const theirs = game()
    theirs.currentRound = 4
    theirs.players[0].cp = 8
    theirs.players[1].rosterId = 'r5'
    theirs.players[1].roster = snap('Late')
    for (const [name, data] of Object.entries(sliceGame(theirs))) applySlice(local, name, data)
    expect(local).toEqual(theirs)
  })
})

describe('changedSlices / stableJson', () => {
  it('names only the slices whose data differs, whatever the key order', () => {
    const a = sliceGame(game())
    const g = game()
    g.players[1].cp = 4
    // Rebuild side0 with its keys in another order — the same data, not a change.
    const p0 = g.players[0]
    g.players[0] = Object.fromEntries(Object.keys(p0).reverse().map((k) => [k, p0[k]]))
    expect(changedSlices(a, sliceGame(g))).toEqual(['side1'])
  })
  it('treats a missing slice as changed and undefined values as absent', () => {
    expect(changedSlices({ shared: { a: 1 }, side0: {} }, { shared: { a: 1, b: undefined } })).toEqual(['side0'])
    expect(stableJson({ b: [1, { d: 2, c: 3 }], a: undefined })).toBe('{"b":[1,{"c":3,"d":2}]}')
  })
})
