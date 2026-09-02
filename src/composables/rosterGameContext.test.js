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

  // The tracker already recorded the round the War Cry was called in, so the roster reads it
  // instead of asking again — two switches for one fact is how two cards start disagreeing. But
  // riled up is not the War Cry's alone: thirty-two other Ork rules grant it one unit at a time,
  // so its OFF proves nothing and the per-unit switch survives (soft-auto, not auto).
  it('reads a called War Cry from the army-rule tracker', () => {
    const p = player({}, { toggleRounds: [2] }, 'orks')
    expect(activeConditions(p, 2, { uid: 'u1' }).has('riled-up')).toBe(true)
    expect(activeConditions(p, 3, { uid: 'u1' }).has('riled-up')).toBe(false)
    expect(isAuto('riled-up')).toBe(false)
  })

  // Two Orks datasheets state the condition outright — "This unit is riled up.", no trigger, no
  // window. They are riled up whatever the tracker says, and the chip is not theirs to flip. The
  // set that encodes this is hand-written, so the scan below is what keeps it honest.
  it('answers riled up from the datasheet for the two that state it outright', async () => {
    const p = player({}, {}, 'orks')
    for (const id of ['stompa', 'zodgrod-wortsnagga']) {
      expect(activeConditions(p, 1, { uid: 'u1', id }).has('riled-up')).toBe(true)
    }
    expect(activeConditions(p, 1, { uid: 'u1', id: 'boyz' }).has('riled-up')).toBe(false)

    const recs = [{ effects: [{ on: 'profile', stat: 'inv', op: 'set', value: '5+', when: {}, cond: ['riled-up'] }] }]
    const [sw] = switchesFor(recs, 'unit', p, 1, { uid: 'u1', id: 'stompa' })
    expect([sw.on, sw.auto]).toEqual([true, true])   // on, and not the player's to flip
    const [other] = switchesFor(recs, 'unit', p, 1, { uid: 'u1', id: 'boyz' })
    expect([other.on, other.auto]).toEqual([false, false])
  })

  // …and no OTHER datasheet may grow that wording without this being revisited.
  it('finds no other datasheet that states riled up unconditionally', async () => {
    const ds = (await import('../data/datasheets/orks.js')).default
    const flat = []
    for (const u of ds) {
      const texts = [
        ...(u.abilities || []).map((a) => a.text),
        ...(u.abilitySets || []).flatMap((s) => (s.options || []).map((o) => o.text)),
        ...(u.wargearAbilities || []).map((w) => w.text),
      ]
      // A line that IS the sentence — not one that hangs it off a trigger ("if…", "when…",
      // "while…", "until…"), which is what every other grant in the codex does.
      for (const t of texts) {
        for (const line of (t || '').split('\n')) {
          if (/^(?:▪\s*)?This unit is \*\*riled up\*\*\.$/.test(line.trim())) flat.push(u.id)
        }
      }
    }
    expect([...new Set(flat)].sort()).toEqual(['stompa', 'zodgrod-wortsnagga'])
  })

  it("still takes a unit's own riled-up switch with no War Cry called", () => {
    const p = player({ units: { u1: { 'riled-up': 3 } } }, {}, 'orks')
    expect(activeConditions(p, 3, { uid: 'u1' }).has('riled-up')).toBe(true)
    expect(activeConditions(p, 3, { uid: 'u2' }).has('riled-up')).toBe(false)
  })

  it('reads the active Doctrina Imperative the same way', () => {
    const p = player({}, { selectionByRound: { 2: 'conqueror' } }, 'adeptus-mechanicus')
    expect(activeConditions(p, 2, null).has('imperative-conqueror')).toBe(true)
    expect(activeConditions(p, 2, null).has('imperative-protector')).toBe(false)
  })

  // World Eaters run up to TWO Blessings a round, so the tracker stores an array — the reader has
  // to look inside it rather than compare, the way the single-pick Imperative does.
  it('reads the Blessings of Khorne that are up this round', () => {
    const p = player({}, { multiByRound: { 3: ['warp-blades', 'total-carnage'] } }, 'world-eaters')
    expect(activeConditions(p, 3, null).has('blessing-warp-blades')).toBe(true)
    expect(activeConditions(p, 3, null).has('blessing-martial-excellence')).toBe(false)
    expect(activeConditions(p, 4, null).has('blessing-warp-blades')).toBe(false)
    expect(isAuto('blessing-warp-blades')).toBe(true)
  })

  // The specs are built from shared primitives, so `toggleRounds` means "Waaagh!" only for Orks.
  // Without the faction check, the next faction to get a toggle spec would inherit it.
  it('does not read another faction\'s tracker primitive as its own', () => {
    const p = player({}, { toggleRounds: [1], selectionByRound: { 1: 'conqueror' }, multiByRound: { 1: ['warp-blades'] } }, 'death-guard')
    expect(activeConditions(p, 1, { uid: 'u1' }).has('riled-up')).toBe(false)
    expect(activeConditions(p, 1, null).has('imperative-conqueror')).toBe(false)
    expect(activeConditions(p, 1, null).has('blessing-warp-blades')).toBe(false)
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
      { on: 'melee', stat: 's', op: 'add', value: 1, when: {}, cond: ['imperative-conqueror'] },
      { on: 'melee', stat: 'a', op: 'add', value: 1, when: {}, cond: ['unit-charged'] },
      { on: 'melee', stat: 'd', op: 'add', value: 1, when: {}, cond: ['never'] },
      { on: 'ranged', stat: 'ap', op: 'add', value: -1, when: {}, cond: ['imperative-conqueror', 'phase-shooting'] },
      { on: 'profile', stat: 't', op: 'add', value: 1 },
    ],
  }]

  it('offers one switch per answerable condition at the asked-for scope', () => {
    const p = player({}, { selectionByRound: { 1: 'conqueror' } }, 'adeptus-mechanicus')
    const army = switchesFor(records, 'army', p, 1, null)
    expect(army.map((s) => s.id)).toEqual(['imperative-conqueror'])
    expect(army[0].on).toBe(true)
    expect(army[0].auto).toBe(true) // read from the tracker, so shown but not flippable here
  })

  it('offers the unit ones on the unit', () => {
    const unit = switchesFor(records, 'unit', player({ units: { u1: { 'unit-charged': 1 } } }), 1, { uid: 'u1' })
    expect(unit.map((s) => s.id)).toEqual(['unit-charged'])
    expect(unit[0].on).toBe(true)
  })

  // riled up is the one soft-auto condition: the War Cry proves it for everybody, and the unit's
  // own switch is still offered, because thirty-two other Ork rules grant it one unit at a time.
  it('keeps the riled-up switch on the unit even while the War Cry proves it', () => {
    const recs = [{ effects: [{ on: 'profile', stat: 'inv', op: 'set', value: '5+', when: {}, cond: ['riled-up'] }] }]
    const p = player({}, { toggleRounds: [1] }, 'orks')
    const unit = switchesFor(recs, 'unit', p, 1, { uid: 'u1' })
    expect(unit.map((s) => s.id)).toEqual(['riled-up'])
    expect(unit[0].on).toBe(true)
    expect(unit[0].auto).toBe(false)
    expect(switchesFor(recs, 'army', p, 1, null)).toEqual([])
  })

  // A switch that cannot change anything on the card is worse than no switch: it invites the
  // player to flip it and then quietly does nothing.
  it('offers nothing for conditions that can never be answered', () => {
    const only = [{ effects: [{ when: {}, cond: ['never'] }, { when: {}, cond: ['blocked-subset'] }] }]
    expect(switchesFor(only, 'army', player({}), 1, null)).toEqual([])
    expect(switchesFor(only, 'unit', player({}), 1, { uid: 'u1' })).toEqual([])
  })

  it('drops an effect whose OTHER condition is unanswerable, not just the bad half', () => {
    const army = switchesFor([{ effects: [{ when: {}, cond: ['imperative-conqueror', 'phase-shooting'] }] }], 'army', player({}), 1, null)
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

// An ability set is a choice about one model, keyed by the option's own record — like a spent
// stratagem, not like a state of the battle.
describe('ability-set picks', () => {
  const entry = { uid: 'u1', id: 'triumph-of-saint-katherine' }
  const option = (sid, name) => ({
    sid, kind: 'ability', name: `Triumph of Saint Katherine: ${name}`,
    ref: { kind: 'ability', unit: 'triumph-of-saint-katherine', set: 'Relics of the Matriarchs', pickLimit: 2 },
    effects: [],
  })
  const records = [option('fiery', 'The Fiery Heart (Aura)'), option('censer', 'Censer of the Sacred Rose (Aura)')]
  const picked = (at) => player({ picks: { u1: { fiery: at } } })

  it('offers every option of the set, whether or not it changes a number', async () => {
    const { pickSwitchesFor } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'command', mine: true, tracked: true }
    const out = pickSwitchesFor(records, picked(stampOf(clock)), clock, entry)
    expect(out).toHaveLength(2)                       // the Censer moves no number and is still a chip
    expect(out[0]).toMatchObject({ id: 'fiery', on: true, pick: true, group: 'set:Relics of the Matriarchs', groupLimit: 2 })
    expect(out[0].label.en).toBe('The Fiery Heart (Aura)')
    expect(out[0].from).toMatchObject({ owner: 'Triumph of Saint Katherine', set: 'Relics of the Matriarchs' })
    expect(out[1].on).toBe(false)
    // …and nothing for a unit whose card does not print the set.
    expect(pickSwitchesFor(records, picked(stampOf(clock)), clock, { uid: 'u2', id: 'battle-sisters-squad' })).toEqual([])
  })

  it('holds a pick for the battle round it was made in', async () => {
    const { activePicks, allPicks } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'command', mine: true, tracked: true }
    const at = stampOf(clock)
    expect(activePicks(picked(at), { ...clock, phase: 'fight', turn: 1 }, entry).has('fiery')).toBe(true)
    expect(activePicks(picked(at), { ...clock, round: 3 }, entry).has('fiery')).toBe(false)
    // Read army-wide for whoever the aura lands on, not only for the model that picked it.
    expect(allPicks(picked(at), clock).has('fiery')).toBe(true)
    expect(allPicks(picked(at), { ...clock, round: 3 }, entry).has('fiery')).toBe(false)
  })
})

describe('auras', () => {
  const entry = { uid: 'u1', id: 'battle-sisters-squad' }
  const marked = (at) => player({ auras: { u1: { 'fiery-heart': at } } })

  // A battle round: what starts or stops an aura is movement, and asking again every phase would
  // be a tap per unit per phase for a fact that rarely changes inside one round.
  it('holds a mark for the round it was made in', async () => {
    const { activeAuras } = await import('./rosterGameContext.js')
    const clock = { round: 2, turn: 0, phase: 'movement', mine: true, tracked: true }
    const at = stampOf(clock)
    expect(activeAuras(marked(at), { ...clock, phase: 'fight', turn: 1 }, entry).has('fiery-heart')).toBe(true)
    expect(activeAuras(marked(at), { ...clock, round: 3 }, entry).has('fiery-heart')).toBe(false)
    expect(activeAuras(player({}), clock, entry).size).toBe(0)
  })

  it('renders each one as a chip naming where it comes from', async () => {
    const { auraSwitchesFor } = await import('./rosterGameContext.js')
    const clock = { round: 1, turn: 0, phase: 'movement', mine: true, tracked: true }
    const reaching = [{ sid: 'fiery-heart', source: 'Triumph of Saint Katherine', sourceUid: 'a', name: 'The Fiery Heart (Aura)' }]
    const [chip] = auraSwitchesFor(reaching, marked(stampOf(clock)), clock, entry)
    expect(chip).toMatchObject({ id: 'fiery-heart', on: true, auto: false, aura: true })
    expect(chip.label.en).toBe('Triumph of Saint Katherine · The Fiery Heart (Aura)')
    // The RU card names the ability in Russian, so the chip does too — the unit's name stays
    // English by project convention, the ability's does not.
    const [ru] = auraSwitchesFor([{ ...reaching[0], nameRu: 'Огненное сердце (Аура)' }], player({}), clock, entry)
    expect(ru.label.ru).toBe('Triumph of Saint Katherine · Огненное сердце (Аура)')
    expect(chip.label.ru).toBe(chip.label.en)   // …and falls back to English when there is none
  })
})

describe('rosterConditions', () => {
  it('answers what the list itself knows, and nothing else', async () => {
    const { rosterConditions } = await import('./rosterGameContext.js')
    expect([...rosterConditions({ uid: 'u1', leaderOf: 'u2' })]).toEqual(['unit-leading'])
    expect(rosterConditions({ uid: 'u1' }).size).toBe(0)
    // Not activeConditions with an empty player: a null clock reads as round 1, and "during
    // battle rounds 1-3" would switch itself on in a list nobody is playing yet.
    expect(rosterConditions({ uid: 'u1', leaderOf: 'u2' }).has('rounds-1-3')).toBe(false)
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

  // A stratagem states the moment it may be used, and a game keeping a clock knows whether that
  // moment is now. The chip is dimmed rather than hidden: knowing you are holding Armour of
  // Contempt for the opponent's Shooting phase is worth a line on the card.
  it('refuses a stratagem outside the phase its own timing names', async () => {
    const { stratagemsFor } = await import('./rosterGameContext.js')
    const shooting = { round: 2, turn: 0, phase: 'shooting', mine: true, tracked: true }
    const timed = { ...rec('krump', 'phase'), slot: { phases: ['fight'], sides: { fight: 'own' } } }
    const untimed = rec('any-time', 'phase')       // no timing read — never blocked on that account

    const out = stratagemsFor([timed, untimed], player({}), shooting, entry)
    expect(out.find((s) => s.id === 'krump')).toMatchObject({ blocked: true, blockedBy: 'wrongPhase' })
    expect(out.find((s) => s.id === 'any-time')).toMatchObject({ blocked: false })

    // …in the Fight phase it is offered — but only on this player's own turn, which is what its
    // timing line said.
    const fight = { ...shooting, phase: 'fight' }
    expect(stratagemsFor([timed], player({}), fight, entry)[0]).toMatchObject({ blocked: false })
    expect(stratagemsFor([timed], player({}), { ...fight, mine: false }, entry)[0])
      .toMatchObject({ blocked: true, blockedBy: 'wrongPhase' })

    // A game that keeps no phases cannot answer the question and does not pretend to.
    expect(stratagemsFor([timed], player({}), { ...shooting, tracked: false }, entry)[0])
      .toMatchObject({ blocked: false })

    // …and one already in force stays flippable, whatever phase it is now.
    const spentEarlier = player({ strats: { u1: { krump: stampOf({ ...shooting, phase: 'fight' }) } } })
    expect(stratagemsFor([{ ...timed, dur: 'turn' }], spentEarlier, shooting, entry)[0])
      .toMatchObject({ on: true, blocked: false })
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
