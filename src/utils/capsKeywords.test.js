import { describe, it, expect } from 'vitest'
import { capsKeywordsIn, isScannedSource, modelNamesOf } from './capsKeywords.js'
import { capsKeywords } from '../data/capsKeywords.js'
import { unitKeywordVocabulary } from '../data/unitKeywordVocabulary.js'
import { useRenderInline } from '../composables/useRenderInline.js'

// The renderer bolds the capitals src/data/capsKeywords.js lists, and that list is generated
// (`npm run datasheets:index`). A keyword written in capitals after the last run would render
// plain beside its bold neighbours — the half-bold "ORKS AIRCRAFT/DEFFKOPTAS" this came from.
const sheetFiles = import.meta.glob(['../data/datasheets/*.js', '!../data/datasheets/*.test.js', '!../data/datasheets/index.js'], { import: 'default', eager: true })
const sources = import.meta.glob(['../data/**/*.js', '!../data/**/*.test.js'], { query: '?raw', import: 'default', eager: true })

describe('keywords written in capitals', () => {
  it('are all in the generated list (run `npm run datasheets:index`)', () => {
    const vocabulary = new Set(unitKeywordVocabulary)
    for (const sheets of Object.values(sheetFiles)) for (const sheet of sheets || []) for (const n of modelNamesOf(sheet)) vocabulary.add(n)
    const found = new Set()
    for (const text of Object.values(sources)) if (isScannedSource(text)) capsKeywordsIn(text, vocabulary, found)
    expect([...found].sort()).toEqual([...capsKeywords].sort())
  })

  it('are bolded whole, and a word that is no keyword is not', () => {
    const { renderInline } = useRenderInline()
    const html = renderInline('While a friendly ORKS AIRCRAFT/DEFFKOPTAS unit is riled up. WHEN this NON-MONSTER/VEHICLE, IRON-MASTER, one BRIMSTONE HORROR model')
    expect(html).toContain('<strong>DEFFKOPTAS</strong>')
    expect(html).toContain('<strong>NON-MONSTER</strong>')
    expect(html).toContain('<strong>IRON-MASTER</strong>')
    expect(html).toContain('<strong>BRIMSTONE HORROR</strong>')
    expect(html).not.toContain('<strong>WHEN</strong>')
    expect(html).not.toContain('IRON-<strong>')
  })
})
