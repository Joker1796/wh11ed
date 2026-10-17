import { describe, it, expect } from 'vitest'
import { markUnitLinks, unitLinkPatterns, unitLinksAt } from './unitLinkMarkup.js'
import { spawnUnits } from '../data/factionUnitKeywords.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const p = unitLinkPatterns(spawnUnits)

describe('a unit an ability brings into the game is a tap on its name', () => {
  it('is generated for the four abilities that do it', () => {
    expect(spawnUnits).toEqual({
      'Mucolid Spores': ['tyranids', 'mucolid-spores'],
      'Ripper Swarms': ['tyranids', 'ripper-swarms'],
      'Spore Mines': ['tyranids', 'spore-mines'],
    })
  })

  it('in English, as written or in capitals', () => {
    expect(markUnitLinks('you can add one new Ripper Swarms unit to your army', p))
      .toBe('you can add one new <span class="unit-link" data-slug="tyranids" data-unit="ripper-swarms">Ripper Swarms</span> unit to your army')
    expect(unitLinksAt('add one new SPORE MINES unit', p)).toEqual([['tyranids', 'spore-mines', 12, 11]])
    expect(unitLinksAt('add one new <strong>SPORE MINES</strong> unit', p)).toEqual([['tyranids', 'spore-mines', 20, 11]])
  })

  it('in Russian', () => {
    expect(unitLinksAt('вы можете добавить в свою армию один новый юнит Ripper Swarms из D3 моделей', p).map((x) => x[1])).toEqual(['ripper-swarms'])
  })

  it('not where the name is not a unit coming in', () => {
    expect(unitLinksAt('Seed Spore Mines', p)).toEqual([])
    expect(unitLinksAt('Each time this SPORE MINES unit is destroyed', p)).toEqual([])
    expect(unitLinksAt('Посев Spore Mines', p)).toEqual([])
  })

  it('reaches the rendered text', () => {
    const { renderInline } = useRenderInline()
    expect(renderInline('add one new Spore Mines unit')).toContain('class="unit-link"')
  })
})
