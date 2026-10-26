// A rule that hands out several things as a list ("Friendly TECH-PRIEST models have: ▪ 4+ InSv
// ▪ Feel No Pain 5+") had no record, so the card never showed it (player report edb4f838,
// 2026-10-18). This is that case end to end, on the shipped data: the record, its resolution under
// the detachment, and the card it lands on — and the units the rule does not name.
import { describe, it, expect } from 'vitest'
import records from './adeptus-mechanicus.js'
import { adeptusMechanicus } from '../factions/adeptus-mechanicus.js'
import { applyStatMods, resolveModifierEntries } from '../../core/rules/rosterStatMods.js'

const facEn = adeptusMechanicus.en
const sheet = (name) => ({ name, profiles: [{ name, m: '6"', t: '4', sv: '2+', w: '4', ld: '6+', oc: '1' }], ranged: [], melee: [] })

describe('Lords of the Forge — War-form Mantles', () => {
  const entries = resolveModifierEntries(records.entries, facEn, ['Lords of the Forge'], null)

  it('gives a TECH-PRIEST a 4+ invulnerable save and Feel No Pain 5+', () => {
    const out = applyStatMods(sheet('Tech-Priest Dominus'), entries, ['Tech-Priest Dominus', 'Tech-Priest', 'Character', 'Infantry', 'Adeptus Mechanicus'])
    expect(out.sheet.profiles[0].inv).toBe('4+')
    expect(out.core.map((c) => c.ability)).toEqual(expect.arrayContaining(['Feel No Pain 5+']))
  })

  it('gives nothing to a unit that is not a TECH-PRIEST', () => {
    const out = applyStatMods(sheet('Skitarii Rangers'), entries, ['Skitarii Rangers', 'Battleline', 'Infantry', 'Skitarii', 'Adeptus Mechanicus'])
    expect(out.sheet.profiles[0].inv).toBeUndefined()
    expect(out.core.map((c) => c.ability)).not.toEqual(expect.arrayContaining(['Feel No Pain 5+']))
  })

  it('stays with its detachment', () => {
    const other = resolveModifierEntries(records.entries, facEn, ['Cohort Cybernetica'], null)
    expect(other.some((e) => e.name === 'War-form Mantles')).toBe(false)
  })
})
