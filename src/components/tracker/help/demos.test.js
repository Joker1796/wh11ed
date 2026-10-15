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
