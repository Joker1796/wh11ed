// The help demos show real units and real rules; this holds their numbers to the data, so a
// codex change that moves them fails here instead of leaving a help that shows the wrong thing.
import { describe, it, expect } from 'vitest'
import { MODIFIERS_DEMO as D } from './demos.js'

describe('help demos', () => {
  it("Live modifiers: the Canoness's printed statline and what the enhancement makes of it", async () => {
    const sheet = (await import(`../../../data/datasheets/${D.faction}.js`)).default.find((d) => d.id === D.datasheet)
    const { name, ...printed } = sheet.profiles[0]
    expect(name).toBe(D.unit)
    expect(printed).toEqual(D.profile)
    const recs = (await import(`../../../data/rosterModifiers/${D.faction}.js`)).default.entries
    const rec = recs.find((r) => r.kind === 'enhancement' && r.name === D.enhancement)
    expect(rec.effects).toContainEqual(expect.objectContaining({ on: 'profile', stat: 'sv', op: 'set', when: null }))
    const sv = rec.effects.find((e) => e.stat === 'sv').value
    expect(D.inList.find((p) => p.label === 'SV')).toEqual({ label: 'SV', value: sv, mod: true })
  })
})

describe('help demos — the chips, the stratagem, the units', async () => {
  const { CHIP_DEMOS, STRATAGEM_DEMO } = await import('./demos.js')
  it('labels every chip as the game does', async () => {
    const { conditions } = await import('../../../data/rosterModifiers/conditions.js')
    for (const sw of [...CHIP_DEMOS['unit-states'].switches, ...CHIP_DEMOS['battle-shock'].switches, ...CHIP_DEMOS['army-states'].switches]) {
      expect(conditions[sw.id]?.label, sw.id).toEqual(sw.label)
    }
  })
  it("names Triumph of Saint Katherine's real relics", async () => {
    const tri = (await import('../../../data/datasheets/adepta-sororitas.js')).default.find((d) => d.name === 'Triumph of Saint Katherine')
    const set = tri.abilitySets.find((s) => s.name === 'Relics of the Matriarchs')
    expect(CHIP_DEMOS['ability-sets'].switches.map((s) => s.label.en)).toEqual(set.options.map((o) => o.name))
  })
  it("names a real aura and a real core stratagem", async () => {
    const recs = (await import('../../../data/rosterModifiers/chaos-daemons.js')).default.entries
    expect(recs.some((r) => r.name === 'Bloodthirster: Daemon Lord of Khorne' && r.effects?.some((e) => e.target === 'aura'))).toBe(true)
    const { loadCoreStratagems } = await import('../../../composables/gameStratagems.js')
    const core = await loadCoreStratagems('en')
    expect(core.map((s) => s.name)).toContain(STRATAGEM_DEMO)
    expect(core.map((s) => s.name)).toContain(CHIP_DEMOS.stratagems.switches[0].label.en)
  })
})
