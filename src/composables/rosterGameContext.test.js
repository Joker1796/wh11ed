import { describe, it, expect } from 'vitest'
import { activeConditions, switchesFor, isAuto } from './rosterGameContext.js'

const player = (ctx, army) => ({ ctx, army })

describe('activeConditions', () => {
  it('holds an army switch only in the round it was flipped', () => {
    const p = player({ army: { 'imperative-protector': 2 } })
    expect(activeConditions(p, 2, null).has('imperative-protector')).toBe(true)
    expect(activeConditions(p, 3, null).has('imperative-protector')).toBe(false)
  })

  // A Combat Drug is chosen for the battle, so it must NOT expire with the round the way an
  // Imperative does — the duration in conditions.js is what tells the two apart.
  it('keeps a battle-long switch across rounds', () => {
    const p = player({ army: { 'drug-hypex': 1 } })
    expect(activeConditions(p, 4, null).has('drug-hypex')).toBe(true)
  })

  it('keys unit switches by the roster entry', () => {
    const p = player({ units: { u1: { 'unit-charged': 3 } } })
    expect(activeConditions(p, 3, { uid: 'u1' }).has('unit-charged')).toBe(true)
    expect(activeConditions(p, 3, { uid: 'u2' }).has('unit-charged')).toBe(false)
  })

  // The tracker already recorded the round the Waaagh! was called in, so the roster reads it
  // instead of asking again — two switches for one fact is how two cards start disagreeing.
  it('reads a called Waaagh! from the army-rule tracker', () => {
    const p = player({}, { toggleRounds: [2] })
    expect(activeConditions(p, 2, null).has('waaagh-active')).toBe(true)
    expect(activeConditions(p, 3, null).has('waaagh-active')).toBe(false)
    expect(isAuto('waaagh-active')).toBe(true)
  })

  it('answers "is leading a unit" from the list itself', () => {
    expect(activeConditions(player({}), 1, { uid: 'a', leaderOf: 'b' }).has('unit-leading')).toBe(true)
    expect(activeConditions(player({}), 1, { uid: 'a' }).has('unit-leading')).toBe(false)
  })

  // The phase the game is in is not tracked, so a phase-scoped condition can never come out true
  // — an effect gated on one stays an annotation however the switches are set.
  it('never reports a phase condition as true', () => {
    const p = player({ army: { 'phase-shooting': 1 } })
    expect(activeConditions(p, 1, null).has('phase-shooting')).toBe(false)
  })

  it('is empty for a game with no context recorded at all', () => {
    expect(activeConditions(null, 1, null).size).toBe(0)
    expect(activeConditions({}, 1, { uid: 'u1' }).size).toBe(0)
  })
})

describe('switchesFor', () => {
  const records = [{
    effects: [
      { on: 'melee', stat: 's', op: 'add', value: 1, when: {}, cond: ['waaagh-active'] },
      { on: 'melee', stat: 'a', op: 'add', value: 1, when: {}, cond: ['unit-charged'] },
      { on: 'melee', stat: 'd', op: 'add', value: 1, when: {}, cond: ['never'] },
      { on: 'ranged', stat: 'ap', op: 'add', value: -1, when: {}, cond: ['waaagh-active', 'phase-shooting'] },
      { on: 'profile', stat: 't', op: 'add', value: 1 },
    ],
  }]

  it('offers one switch per answerable condition at the asked-for scope', () => {
    const army = switchesFor(records, 'army', player({}, { toggleRounds: [1] }), 1, null)
    expect(army.map((s) => s.id)).toEqual(['waaagh-active'])
    expect(army[0].on).toBe(true)
    expect(army[0].auto).toBe(true) // read from the tracker, so shown but not flippable here
  })

  it('offers the unit ones on the unit', () => {
    const unit = switchesFor(records, 'unit', player({ units: { u1: { 'unit-charged': 1 } } }), 1, { uid: 'u1' })
    expect(unit.map((s) => s.id)).toEqual(['unit-charged'])
    expect(unit[0].on).toBe(true)
  })

  // A switch that cannot change anything on the card is worse than no switch: it invites the
  // player to flip it and then quietly does nothing.
  it('offers nothing for conditions that can never be answered', () => {
    const only = [{ effects: [{ when: {}, cond: ['never'] }, { when: {}, cond: ['blocked-subset'] }] }]
    expect(switchesFor(only, 'army', player({}), 1, null)).toEqual([])
    expect(switchesFor(only, 'unit', player({}), 1, { uid: 'u1' })).toEqual([])
  })

  it('drops an effect whose OTHER condition is unanswerable, not just the bad half', () => {
    const army = switchesFor([{ effects: [{ when: {}, cond: ['waaagh-active', 'phase-shooting'] }] }], 'army', player({}), 1, null)
    expect(army).toEqual([])
  })

  it('lists a condition once however many effects name it', () => {
    const twice = [{ effects: [{ when: {}, cond: ['unit-charged'] }] }, { effects: [{ when: {}, cond: ['unit-charged'] }] }]
    expect(switchesFor(twice, 'unit', player({}), 1, { uid: 'u1' })).toHaveLength(1)
  })
})
