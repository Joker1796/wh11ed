import { describe, it, expect, beforeAll } from 'vitest'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { loadRosterModifiersFor, usableEntries } from '../../data/rosterModifiers/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { coreModifiers } from '../../data/rosterModifiers/coreRules.js'
import { unitKeywordVocabulary } from '../../data/unitKeywordVocabulary.js'
import { loadFactionWithCodex } from '../../composables/rosterFactionRules.js'
import { grantedKeywords } from '../roster/rosterEngine.js'
import { resolveModifierEntries } from './rosterStatMods.js'
import { unitKeywordsOf } from './ruleTargets.js'
import { unitRules, unitStatMods } from './unitRules.js'

// The roster screen's rows worked a unit's rules out without the keywords the list's detachments
// grant it, so Darkflight Pursuit's "RAVENWING … [IGNORES COVER]" reached a Land Speeder's card and
// never its row (found 2026-10-26 by comparing the two over every faction). Both now call unitRules,
// and it takes those keywords as `granted`.
describe('unitRules', () => {
  let world, sheet, def, dets, records
  const entry = { uid: 'u', id: 'land-speeder', size: 0 }
  beforeAll(async () => {
    const faction = await loadRosterFaction('dark-angels')
    def = faction.units.find((u) => u.id === 'land-speeder')
    dets = faction.detachments.filter((d) => d.name === 'Darkflight Pursuit')
    sheet = (await loadDatasheets('dark-angels')).find((d) => d.id === 'land-speeder')
    const facEn = (await loadFactionWithCodex('dark-angels', 'en')).en
    records = { core: coreModifiers, attached: [], faction: resolveModifierEntries(usableEntries(await loadRosterModifiersFor('dark-angels')), facEn, ['Darkflight Pursuit'], null, null) }
    world = { factionKeywordSets: (await loadDatasheets('dark-angels')).map(unitKeywordsOf), vocabulary: unitKeywordVocabulary }
  })
  const run = (granted) => {
    const input = { records, printed: unitKeywordsOf(sheet), granted, attached: [], active: new Set(), chosen: new Set() }
    return unitStatMods(sheet, unitRules(world, input), world, input, { def, entry, items: rosterItems.items })
  }
  const tagsOf = (out) => out.sheet.ranged.flatMap((w) => w.tags || [])

  it('reads a rule through the keywords the list grants the unit', () => {
    expect(tagsOf(run(grantedKeywords(def, entry, dets)))).toContain('IGNORES COVER')
    expect(tagsOf(run([]))).not.toContain('IGNORES COVER')
  })

  it('refuses to work without the keyword vocabulary', () => {
    const input = { records, printed: [], granted: [], attached: [], active: null, chosen: null }
    expect(() => unitRules({ factionKeywordSets: [], vocabulary: null }, input)).toThrow(/vocabulary/)
  })
})
