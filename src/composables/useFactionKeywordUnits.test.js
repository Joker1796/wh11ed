import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

vi.mock('../data/factionUnitKeywords.js', () => ({
  factionUnitKeywords: { 'Endless Multitude': ['tyranids'], Khorne: ['chaos-daemons', 'world-eaters'] },
  factionKeywordNames: {},
}))

const SHEETS = {
  tyranids: [
    { id: 'termagants', name: 'Termagants', keywords: ['Endless Multitude'] },
    { id: 'hormagaunts', name: 'Hormagaunts', keywords: ['Endless Multitude'] },
    { id: 'carnifex', name: 'Carnifex', keywords: ['Monster'] },
  ],
  'chaos-daemons': [{ id: 'bloodletters', name: 'Bloodletters', keywords: ['Khorne'] }],
  'world-eaters': [{ id: 'berzerkers', name: 'Khorne Berzerkers', keywords: ['Khorne'] }],
}
const load = async (slug) => SHEETS[slug]

let mod
beforeEach(async () => {
  vi.resetModules()
  mod = await import('./useFactionKeywordUnits.js')
})

const withContext = (ctx) => mount(defineComponent({ setup() { mod.useKeywordContext(() => ctx); return () => h('div') } }))

describe('the units a faction keyword lists', () => {
  it('lists the units of the one faction that carries it', async () => {
    await mod.openFactionKeyword('Endless Multitude', null, { load })
    expect(mod.useFactionKeywordUnits().shown.value.units.map((u) => u.id)).toEqual(['hormagaunts', 'termagants'])
  })

  it("puts the list on screen's own units first, marked", async () => {
    withContext({ faction: 'tyranids', unitIds: ['termagants'] })
    await mod.openFactionKeyword('Endless Multitude', null, { load })
    const units = mod.useFactionKeywordUnits().shown.value.units
    expect(units.map((u) => [u.id, u.own])).toEqual([['termagants', true], ['hormagaunts', false]])
  })

  it('narrows a shared keyword to the faction on screen, and shows every one without it', async () => {
    await mod.openFactionKeyword('Khorne', 'world-eaters', { load })
    expect(mod.useFactionKeywordUnits().shown.value.units.map((u) => u.id)).toEqual(['berzerkers'])
    await mod.openFactionKeyword('Khorne', null, { load })
    const units = mod.useFactionKeywordUnits().shown.value.units
    expect(units.map((u) => [u.id, u.faction])).toEqual([['bloodletters', 'chaos-daemons'], ['berzerkers', 'world-eaters']])
  })
})
