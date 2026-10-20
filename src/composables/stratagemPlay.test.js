import { describe, it, expect } from 'vitest'
import { stratTargetSide, recordFor, deckStratFor, targetBlock } from './stratagemPlay.js'
import { usableEntries } from '../data/rosterModifiers/index.js'
import { normName } from './gameStratagems.js'

describe('stratTargetSide', () => {
  it('reads whose unit a stratagem is aimed at off its English TARGET line', () => {
    expect(stratTargetSide({ _target: 'One unit from your army that was selected as the target of one or more of the attacking unit’s attacks.' })).toBe('own')
    expect(stratTargetSide({ _target: 'That CHARACTER unit' })).toBe('own')
    expect(stratTargetSide({ _target: 'That unit or model' })).toBe('own')
    expect(stratTargetSide({ _target: 'One enemy unit within 12" of your WARLORD.' })).toBe('enemy')
    expect(stratTargetSide({ _target: 'Your army.' })).toBeNull()
    expect(stratTargetSide({})).toBeNull()
  })
})

describe('recordFor / deckStratFor', () => {
  const deck = [{ _detId: 'd1', _enName: 'No Prey Too Big', _key: 'x|No Prey Too Big' }]
  const rec = { sid: 's1', ref: { kind: 'stratagem', det: 'd1', name: 'No Prey too Big' } }
  it('pairs a card record with its deck stratagem, case and apostrophes aside', () => {
    expect(recordFor(deck[0], [rec])).toBe(rec)
    expect(deckStratFor(rec, deck)).toBe(deck[0])
    expect(deckStratFor({ ...rec, ref: { ...rec.ref, det: 'd2' } }, deck)).toBeNull()
  })

  // Every stratagem the card can switch on must have its twin in the deck the CP is spent from,
  // or ticking it would spend nothing. The records point at a detachment by id and name the
  // stratagem; the deck is that detachment's stratagems (gameStratagems.js keeps their id).
  it('finds a deck stratagem for every card record, in every faction', async () => {
    const mods = import.meta.glob('../data/rosterModifiers/*.js', { eager: true })
    const facs = import.meta.glob('../data/factions/*.js')
    // A Combat Patrol box's stratagems are in its own deck (`cp:<box id>`, gameStratagems).
    const { combatPatrol } = await import('../data/combatPatrol.js')
    const { combatPatrolDetachment } = await import('./rosterFactionRules.js')
    const boxDecks = (slug) => combatPatrol.en.factions.filter((b) => b.slug === slug)
      .flatMap((b) => combatPatrolDetachment(combatPatrol.en, b.id).stratagems.map((s) => ({ _detId: `cp:${b.id}`, _enName: s.name })))
    const missing = []
    for (const [path, loader] of Object.entries(facs)) {
      const slug = path.split('/').pop().replace('.js', '')
      const recs = usableEntries(mods[`../data/rosterModifiers/${slug}.js`]?.default).filter((r) => r.ref?.kind === 'stratagem')
      if (!recs.length) continue
      const m = await loader()
      const en = (m.default ?? Object.values(m)[0])?.en
      const deck = [...(en?.detachments || []).flatMap((d) => (d.stratagems || []).map((s) => ({ _detId: d.id, _enName: s.name, _det: normName(d.name) }))), ...boxDecks(slug)]
      for (const r of recs) if (!deckStratFor(r, deck)) missing.push(`${slug}: ${r.name}`)
    }
    expect(missing).toEqual([])
  })
})

describe('targetBlock', () => {
  const clock = { round: 2, turn: 0, phase: 'shooting', mine: true, tracked: true }
  it('refuses a unit a stratagem was played on in this phase, from the card or the CP tab', () => {
    const side = { cpLog: [{ kind: 'spend', round: 2, turn: 0, phase: 'shooting', target: { uid: 'u1' } }] }
    expect(targetBlock(side, side, clock, { uid: 'u1' })).toBe('unitPhase')
    expect(targetBlock(side, side, clock, { uid: 'u2' })).toBeNull()
    expect(targetBlock(side, side, { ...clock, phase: 'fight' }, { uid: 'u1' })).toBeNull()
    const card = { ctx: { strats: { u3: { s: 2 * 100 + 0 + 3 } } } }
    expect(targetBlock({}, card, clock, { uid: 'u3' })).toBe('unitPhase')
  })
})
