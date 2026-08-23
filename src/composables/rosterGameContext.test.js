import { describe, it, expect } from 'vitest'
import { activeConditions, switchesFor, isAuto, clockOf, stampOf } from './rosterGameContext.js'

const player = (ctx, army, factionSlug = null) => ({ ctx, army, factionSlug })

describe('activeConditions', () => {
  it('holds an army switch only in the round it was flipped', () => {
    const p = player({ army: { 'tactic-furor': 2 } })
    expect(activeConditions(p, 2, null).has('tactic-furor')).toBe(true)
    expect(activeConditions(p, 3, null).has('tactic-furor')).toBe(false)
  })

  // An auto condition has ONE source. A leftover manual flip — from before that reader existed,
  // or from another faction's game — must not be able to contradict the tracker.
  it('ignores a hand-set value for a condition the tracker answers', () => {
    const p = player({ army: { 'imperative-protector': 1 } }, {}, 'adeptus-mechanicus')
    expect(activeConditions(p, 1, null).has('imperative-protector')).toBe(false)
  })

  // A Creations of Bile augmentation is chosen for the whole battle, so it must NOT expire with
  // the round the way an Imperative does — the duration in conditions.js is what tells them apart.
  // (Combat Drugs used to stand in for this here; they are per-round by their own wording — "until
  // the start of your next Command phase" — and were corrected to `round` on 2026-08-22.)
  it('keeps a battle-long switch across rounds', () => {
    const p = player({ army: { 'augment-hyperadrenal-infusion': 1 } })
    expect(activeConditions(p, 4, null).has('augment-hyperadrenal-infusion')).toBe(true)
  })

  it('expires a Combat Drug with the round it was selected in', () => {
    const p = player({ army: { 'drug-hypex': 2 } })
    expect(activeConditions(p, 2, null).has('drug-hypex')).toBe(true)
    expect(activeConditions(p, 3, null).has('drug-hypex')).toBe(false)
  })

  it('keys unit switches by the roster entry', () => {
    const p = player({ units: { u1: { 'unit-charged': 3 } } })
    expect(activeConditions(p, 3, { uid: 'u1' }).has('unit-charged')).toBe(true)
    expect(activeConditions(p, 3, { uid: 'u2' }).has('unit-charged')).toBe(false)
  })

  // The tracker already recorded the round the Waaagh! was called in, so the roster reads it
  // instead of asking again — two switches for one fact is how two cards start disagreeing.
  it('reads a called Waaagh! from the army-rule tracker', () => {
    const p = player({}, { toggleRounds: [2] }, 'orks')
    expect(activeConditions(p, 2, null).has('waaagh-active')).toBe(true)
    expect(activeConditions(p, 3, null).has('waaagh-active')).toBe(false)
    expect(isAuto('waaagh-active')).toBe(true)
  })

  it('reads the active Doctrina Imperative the same way', () => {
    const p = player({}, { selectionByRound: { 2: 'conqueror' } }, 'adeptus-mechanicus')
    expect(activeConditions(p, 2, null).has('imperative-conqueror')).toBe(true)
    expect(activeConditions(p, 2, null).has('imperative-protector')).toBe(false)
  })

  // The specs are built from shared primitives, so `toggleRounds` means "Waaagh!" only for Orks.
  // Without the faction check, the next faction to get a toggle spec would inherit it.
  it('does not read another faction\'s tracker primitive as its own', () => {
    const p = player({}, { toggleRounds: [1], selectionByRound: { 1: 'conqueror' } }, 'death-guard')
    expect(activeConditions(p, 1, null).has('waaagh-active')).toBe(false)
    expect(activeConditions(p, 1, null).has('imperative-conqueror')).toBe(false)
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

  // Nothing the PLAYER recorded is true. The clock still answers its own questions — battle round
  // 1 really is inside the "rounds 1-3" window whether or not anybody flipped anything.
  it('holds nothing but the clock for a game with no context recorded at all', () => {
    const recorded = (p, entry) => [...activeConditions(p, 1, entry)].filter((id) => !id.startsWith('rounds-'))
    expect(recorded(null, null)).toEqual([])
    expect(recorded({}, { uid: 'u1' })).toEqual([])
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
    const army = switchesFor(records, 'army', player({}, { toggleRounds: [1] }, 'orks'), 1, null)
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

// ── The clock (P3c) ───────────────────────────────────────────────────────────────────────────
// A switch records WHEN it was flipped as one monotonic stamp, so a state that lasts a phase can
// stop being true at the end of that phase instead of surviving to the round boundary.
const game = (over = {}) => ({ currentRound: 1, currentTurn: 0, currentPhase: 'command', settings: { trackPhases: true }, ...over })

describe('the clock', () => {
  it('numbers a moment so that a round-only stamp can never look like a phase', () => {
    expect(stampOf(clockOf(game()))).toBe(101)
    expect(stampOf(clockOf(game({ currentRound: 3, currentTurn: 1, currentPhase: 'fight' })))).toBe(315)
    // A game not keeping phases records the round alone…
    expect(stampOf(clockOf(game({ currentRound: 2, settings: {} })))).toBe(200)
    // …and a game saved before any of this stored the bare round number, which is below 100.
    expect(stampOf(2)).toBe(200)
  })

  it('answers whose turn it is from the player the card belongs to', () => {
    const g = game({ currentTurn: 1 })
    expect(clockOf(g, 1).mine).toBe(true)
    expect(clockOf(g, 0).mine).toBe(false)
  })

  // unit-dark-pact-invoked lasts a PHASE by its own rule. Before the clock the only boundary
  // available was the round, so it stayed true for four phases it had no business being true in.
  it('expires a phase-long switch at the end of that phase', () => {
    const shooting = clockOf(game({ currentPhase: 'shooting' }))
    const p = player({ units: { u1: { 'unit-dark-pact-invoked': stampOf(shooting) } } })
    expect(activeConditions(p, shooting, { uid: 'u1' }).has('unit-dark-pact-invoked')).toBe(true)
    const charge = clockOf(game({ currentPhase: 'charge' }))
    expect(activeConditions(p, charge, { uid: 'u1' }).has('unit-dark-pact-invoked')).toBe(false)
  })

  // unit-charged lasts a TURN: through every phase of the turn it was flipped in, and no further.
  it('expires a turn-long switch when the turn changes, not when the round does', () => {
    const mine = clockOf(game({ currentPhase: 'movement' }))
    const p = player({ units: { u1: { 'unit-charged': stampOf(mine) } } })
    expect(activeConditions(p, clockOf(game({ currentPhase: 'fight' })), { uid: 'u1' }).has('unit-charged')).toBe(true)
    const theirTurn = clockOf(game({ currentTurn: 1, currentPhase: 'movement' }))
    expect(activeConditions(p, theirTurn, { uid: 'u1' }).has('unit-charged')).toBe(false)
  })

  // Without a clock there is no boundary shorter than the round — which is what this file did
  // before, and still does for a game that isn't keeping phases.
  it('falls back to the round boundary when the game keeps no phases', () => {
    const untracked = (over) => clockOf(game({ settings: {}, ...over }))
    const p = player({ units: { u1: { 'unit-dark-pact-invoked': stampOf(untracked({})) } } })
    expect(activeConditions(p, untracked({}), { uid: 'u1' }).has('unit-dark-pact-invoked')).toBe(true)
    expect(activeConditions(p, untracked({ currentRound: 2 }), { uid: 'u1' }).has('unit-dark-pact-invoked')).toBe(false)
  })

  it('reads a value stored before stamps existed as a round', () => {
    const p = player({ army: { 'tactic-furor': 2 } })
    expect(activeConditions(p, clockOf(game({ currentRound: 2 })), null).has('tactic-furor')).toBe(true)
    expect(activeConditions(p, clockOf(game({ currentRound: 3 })), null).has('tactic-furor')).toBe(false)
  })

  it('answers a phase condition from the clock, on the right side of the turn', () => {
    const mine = clockOf(game({ currentPhase: 'shooting' }), 0)
    const theirs = clockOf(game({ currentPhase: 'shooting', currentTurn: 1 }), 0)
    expect(activeConditions(player({}), mine, null).has('phase-shooting')).toBe(true)
    expect(activeConditions(player({}), theirs, null).has('phase-shooting')).toBe(false)
    // The Fight phase belongs to nobody in particular — it happens in both turns.
    const fightTheirs = clockOf(game({ currentPhase: 'fight', currentTurn: 1 }), 0)
    expect(activeConditions(player({}), fightTheirs, null).has('phase-fight')).toBe(true)
  })

  it('answers no phase at all in a game that is not keeping them', () => {
    const untracked = clockOf(game({ currentPhase: 'shooting', settings: {} }), 0)
    expect(activeConditions(player({}), untracked, null).has('phase-shooting')).toBe(false)
  })

  it('offers a switch for an effect whose other half is a phase — but only once phases are kept', () => {
    const recs = [{ effects: [{ cond: ['unit-charged', 'phase-fight'] }] }]
    const entry = { uid: 'u1' }
    const kept = clockOf(game({ currentPhase: 'fight' }))
    expect(switchesFor(recs, 'unit', player({}), kept, entry).map((s) => s.id)).toEqual(['unit-charged'])
    const not = clockOf(game({ settings: {} }))
    expect(switchesFor(recs, 'unit', player({}), not, entry)).toEqual([])
  })
})

// ── P3d: what the clock made answerable ───────────────────────────────────────────────────────
describe('clock-answered conditions', () => {
  it('answers a battle-round window in any game, phases or not', () => {
    const late = clockOf(game({ currentRound: 4, settings: {} }))
    expect(activeConditions(player({}), late, null).has('rounds-3-5')).toBe(true)
    expect(activeConditions(player({}), late, null).has('rounds-1-3')).toBe(false)
    const early = clockOf(game({ currentRound: 2, settings: {} }))
    expect(activeConditions(player({}), early, null).has('rounds-1-3')).toBe(true)
  })

  it('offers no switch for a round window — the tracker already knows the round', () => {
    const recs = [{ effects: [{ cond: ['rounds-3-5'] }] }]
    const c = clockOf(game({ currentRound: 4 }))
    expect(switchesFor(recs, 'army', player({}), c, null)).toEqual([])
  })

  it('lets a phase and a switch together prove an effect', () => {
    const recs = [{ effects: [{ cond: ['phase-shooting', 'unit-disembarked'] }] }]
    const shooting = clockOf(game({ currentPhase: 'shooting' }), 0)
    const sw = switchesFor(recs, 'unit', player({}), shooting, { uid: 'u1' })
    expect(sw.map((s) => s.id)).toEqual(['unit-disembarked'])
    const p = player({ units: { u1: { 'unit-disembarked': stampOf(shooting) } } })
    const active = activeConditions(p, shooting, { uid: 'u1' })
    expect(active.has('phase-shooting') && active.has('unit-disembarked')).toBe(true)
  })
})

// ── Alternatives (2026-08-22) ─────────────────────────────────────────────────────────────────
describe('mutually exclusive switches', () => {
  it('groups the ids the rules call alternatives, and leaves the rest alone', async () => {
    const { conditions } = await import('../data/rosterModifiers/conditions.js')
    expect(conditions['order-take-aim'].group).toBe('order')
    expect(conditions['order-fix-bayonets'].group).toBe('order')
    expect(conditions['stance-dacatari'].group).toBe('ka-tah')
    // Blessings of Khorne activates up to TWO, so they are deliberately not a group.
    expect(conditions['blessing-warp-blades'].group).toBeUndefined()
  })

  // A game saved before the cap existed can hold all six augmentations at once. The store can't
  // fix that retroactively (it only sees writes), so the read caps it — otherwise every stat the
  // set touches is rewritten at the table.
  it('caps an over-filled group on read, keeping the newest', () => {
    const p = player({
      army: {
        'augment-cholinergic-accelerants': 101,
        'augment-hyperadrenal-infusion': 102,
        'augment-macrotensile-sinews': 103,
      },
    })
    const on = activeConditions(p, clockOf({ currentRound: 1 }), null)
    expect(on.has('augment-cholinergic-accelerants')).toBe(false)
    expect(on.has('augment-hyperadrenal-infusion')).toBe(true)
    expect(on.has('augment-macrotensile-sinews')).toBe(true)
  })

  it('leaves a group that fits well alone', () => {
    const p = player({ army: { 'augment-hyperadrenal-infusion': 101, 'augment-macrotensile-sinews': 101 } })
    const on = activeConditions(p, clockOf({ currentRound: 1 }), null)
    expect(on.has('augment-hyperadrenal-infusion')).toBe(true)
    expect(on.has('augment-macrotensile-sinews')).toBe(true)
  })
})

describe('stratagems', () => {
  const rec = (sid, dur) => ({ sid, kind: 'stratagem', name: sid, det: 'War Horde', dur, effects: [{ on: 'melee', stat: 's', op: 'add', value: 1, when: { en: 'x', ru: 'x' } }] })
  const entry = { uid: 'u1', id: 'boyz' }
  const spent = (at) => player({ strats: { u1: { 'krump': at } } })

  it('holds a phase-long stratagem only in the phase it was spent', async () => {
    const { activeStratagems } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'shooting', mine: true, tracked: true }
    const at = stampOf(clock)
    expect(activeStratagems(spent(at), clock, entry, [rec('krump', 'phase')]).has('krump')).toBe(true)
    expect(activeStratagems(spent(at), { ...clock, phase: 'fight' }, entry, [rec('krump', 'phase')]).has('krump')).toBe(false)
    // …and a turn-long one survives the phase change but not the round.
    expect(activeStratagems(spent(at), { ...clock, phase: 'fight' }, entry, [rec('krump', 'turn')]).has('krump')).toBe(true)
    expect(activeStratagems(spent(at), { ...clock, round: 3 }, entry, [rec('krump', 'turn')]).has('krump')).toBe(false)
    // A battle-long one never expires.
    expect(activeStratagems(spent(at), { ...clock, round: 5 }, entry, [rec('krump', 'battle')]).has('krump')).toBe(true)
  })

  it('offers a card the stratagems that would change something on it', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const clock = { round: 1, turn: 0, phase: 'fight', mine: true, tracked: true }
    const records = [rec('krump', 'phase'), { sid: 'nothing', kind: 'stratagem', name: 'nothing', dur: 'phase', effects: [] }]
    const out = stratagemsFor(records, spent(stampOf(clock)), clock, entry)
    expect(out).toHaveLength(1)      // the one with no effect is not worth a chip
    expect(out[0]).toMatchObject({ id: 'krump', on: true, duration: 'phase', det: 'War Horde' })
  })

  // Core Rules 01.07: a Battle-shocked unit cannot be targeted with stratagems. What it already has
  // stays flippable — the rule stops you targeting it, it does not undo what was spent first, and
  // taking a mis-tap back must never become impossible.
  it('blocks spending on a Battle-shocked unit, but not taking one back', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const clock = { round: 1, turn: 0, phase: 'fight', mine: true, tracked: true }
    const at = stampOf(clock)
    const p = player({ units: { u1: { 'unit-battle-shocked': at } }, strats: { u1: { krump: at } } })
    const out = stratagemsFor([rec('krump', 'phase'), rec('other', 'phase')], p, clock, entry)
    expect(out.find((s) => s.id === 'krump')).toMatchObject({ on: true, blocked: false })
    expect(out.find((s) => s.id === 'other')).toMatchObject({ on: false, blocked: true })
  })

  // Switching Battle-shock ON un-spends what the unit was running: a stratagem still affecting a
  // unit that may not be affected by one is a contradiction the player would have to undo by hand.
  it('names the ongoing stratagems a blocking condition takes off', async () => {
    const { stratagemsClearedBy } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'fight', mine: true, tracked: true }
    const at = stampOf(clock)
    const p = player({ strats: { u1: { krump: at, possess: at, stale: stampOf({ ...clock, round: 1 }) } } })
    const records = [rec('krump', 'phase'), rec('possess', 'battle'), rec('stale', 'phase')]
    const out = stratagemsClearedBy('unit-battle-shocked', records, p, clock, entry)
    expect(out).toEqual(['krump'])   // 'possess' was resolved for good, 'stale' expired on its own
  })

  it('takes nothing off for a condition that does not block stratagems', async () => {
    const { stratagemsClearedBy } = await import('./rosterGameContext.js')
    const clock = { round: 1, turn: 0, phase: 'fight', mine: true, tracked: true }
    const p = player({ strats: { u1: { krump: stampOf(clock) } } })
    expect(stratagemsClearedBy('unit-charged', [rec('krump', 'phase')], p, clock, entry)).toEqual([])
  })

  // 15.01: "unless otherwise stated, each player cannot target the same unit with more than one
  // stratagem in the same phase", and "each player cannot use the same stratagem more than once in
  // the same phase". Both are about the phase a stratagem was SPENT in, not about how long it lasts.
  it('holds the two per-phase limits of 15.01', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'shooting', mine: true, tracked: true }
    const records = [rec('krump', 'phase'), rec('other', 'turn'), rec('third', 'phase')]

    // One spent on this unit this phase: everything else on its card is out until the next phase.
    const p = player({ strats: { u1: { krump: stampOf(clock) } } })
    const out = stratagemsFor(records, p, clock, entry)
    expect(out.find((s) => s.id === 'krump')).toMatchObject({ on: true, blocked: false })
    expect(out.find((s) => s.id === 'other')).toMatchObject({ blocked: true, blockedBy: 'unitPhase' })

    // The same stratagem spent on ANOTHER unit this phase blocks it here, and only it.
    const p2 = player({ strats: { u2: { krump: stampOf(clock) } } })
    const out2 = stratagemsFor(records, p2, clock, entry)
    expect(out2.find((s) => s.id === 'krump')).toMatchObject({ blocked: true, blockedBy: 'usedPhase' })
    expect(out2.find((s) => s.id === 'other')).toMatchObject({ blocked: false, blockedBy: null })
  })

  it('lets the unit be targeted again in the next phase, in force or not', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'movement', mine: true, tracked: true }
    // A turn-long stratagem spent in the Movement phase: still rewriting the card in the Shooting
    // phase, and no obstacle at all to spending another one there.
    const p = player({ strats: { u1: { other: stampOf(clock) } } })
    const out = stratagemsFor([rec('krump', 'phase'), rec('other', 'turn')], p, { ...clock, phase: 'shooting' }, entry)
    expect(out.find((s) => s.id === 'other')).toMatchObject({ on: true })
    expect(out.find((s) => s.id === 'krump')).toMatchObject({ blocked: false })
  })

  // A game that keeps no phases stamps bare rounds, so "the same phase" cannot be answered — and
  // blocking the whole round would forbid a second stratagem the rules allow in a later phase.
  it('sits the per-phase limits out when the game keeps no clock', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'shooting', mine: false, tracked: false }
    const p = player({ strats: { u1: { krump: 2 } } })
    const out = stratagemsFor([rec('krump', 'phase'), rec('other', 'phase')], p, clock, entry)
    expect(out.find((s) => s.id === 'krump')).toMatchObject({ on: true })
    expect(out.find((s) => s.id === 'other')).toMatchObject({ blocked: false })
  })

  it('says nothing for an entry that spent none', async () => {
    const { activeStratagems } = await import('./rosterGameContext.js')
    expect(activeStratagems(player({}), 1, entry, [rec('krump', 'phase')]).size).toBe(0)
  })
})
