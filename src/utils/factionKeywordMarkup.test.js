import { describe, it, expect } from 'vitest'
import { factionKeywordPatterns, factionKeywordsAt, markFactionKeywords } from './factionKeywordMarkup.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const p = factionKeywordPatterns(
  ['Endless Multitude', 'Synapse', 'Khorne', 'Nurgle', 'Anhrathe', 'Aspect Warriors', 'Berzerkers'],
  { Berzerkers: ['Khorne Berzerkers'], Nurgle: ['Beasts of Nurgle'] },
)
const found = (t) => factionKeywordsAt(t, p).map(([k]) => k)

describe('faction keywords in rule prose', () => {
  it('finds a keyword before "unit/model" in English and after «юнит/модель» in Russian', () => {
    expect(found('Up to two Endless Multitude units from your army')).toEqual(['Endless Multitude'])
    expect(found('До двух юнитов Endless Multitude вашей армии')).toEqual(['Endless Multitude'])
    expect(found('within 6" of one or more friendly Synapse models')).toEqual(['Synapse'])
  })

  it('finds every keyword of a list', () => {
    expect(found('One Anhrathe or Aspect Warriors unit')).toEqual(['Anhrathe', 'Aspect Warriors'])
    expect(found('Один юнит Anhrathe, Aspect Warriors или Khorne вашей армии')).toEqual(['Anhrathe', 'Aspect Warriors', 'Khorne'])
  })

  // The same words are plain prose, or a name, elsewhere.
  it('leaves a keyword alone where it is not standing as one', () => {
    expect(found('while within Synapse Range of your army')).toEqual([])
    expect(found('That Khorne Berzerkers unit')).toEqual([])
    expect(found('юнит Khorne Berzerkers вашей армии')).toEqual([])
    expect(found('модель Beasts of Nurgle в этом юните')).toEqual([])
  })

  it('wraps each one as a span naming it, and nothing else', () => {
    expect(markFactionKeywords('One Anhrathe or Aspect Warriors unit.', p)).toBe(
      'One <span class="fkw" data-fkw="Anhrathe">Anhrathe</span> or <span class="fkw" data-fkw="Aspect Warriors">Aspect Warriors</span> unit.',
    )
    expect(markFactionKeywords('No keyword here.', p)).toBe('No keyword here.')
  })

  // The generated list is what the renderer uses: Endless Multitude is in it (the player's example).
  it('is what the renderer marks', () => {
    const { renderInline } = useRenderInline()
    expect(renderInline('One Endless Multitude unit from your army.')).toContain('<span class="fkw" data-fkw="Endless Multitude">')
    expect(renderInline('Each Synapse Range ability')).not.toContain('fkw')
  })
})
