import { describe, it, expect } from 'vitest'
import { capsKeywordsIn, capsNamesOf, isScannedSource } from './capsKeywords.js'
import { capsKeywords } from '../data/capsKeywords.js'
import { unitKeywordVocabulary } from '../data/unitKeywordVocabulary.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { unitKeywordsOf } from '../core/rules/ruleTargets.js'
import { combatPatrol } from '../data/combatPatrol.js'
import { foldName } from '../core/shared/foldName.js'

// The renderer bolds the capitals src/data/capsKeywords.js lists, and that list is generated
// (`npm run datasheets:index`). A keyword written in capitals after the last run would render
// plain beside its bold neighbours — the half-bold "ORKS AIRCRAFT/DEFFKOPTAS" this came from.
const sheetFiles = import.meta.glob(['../data/datasheets/*.js', '!../data/datasheets/*.test.js', '!../data/datasheets/index.js'], { import: 'default', eager: true })
const sources = import.meta.glob(['../data/**/*.js', '!../data/**/*.test.js'], { query: '?raw', import: 'default', eager: true })
const modules = import.meta.glob(['../data/**/*.js', '!../data/**/*.test.js', '!../data/*Index.js'], { eager: true })

// A run of capitals the renderer bolds in part, each with why it stays so. Everything else in the
// data reads whole: 134 such runs in 43 phrases on 2026-10-20 (AQUILAN WING, TYRANID WARRIORS,
// SHIELD‑CAPTAIN…), when the list knew no Combat Patrol keyword and no non-breaking hyphen.
const HALF_BOLD_OK = {
  'VETERAN HEAVY WEAPONS TEAM': 'GW’s wording; no model of that name exists, HEAVY WEAPONS TEAM does',
  'DEATH RIDER SQUADRON COMMANDER': 'GW’s wording for a model no sheet carries; DEATH RIDER is the keyword',
  'LIEUTENANT IN REIVER ARMOUR': 'a sheet that left the game; LIEUTENANT and REIVER are keywords',
  'T’AU INFANTRY': 'T’AU alone is no keyword (T’AU EMPIRE is)',
  'DISCIPLES OF BE’LAKOR': 'a rule’s title written in capitals, BE’LAKOR the keyword in it',
  'DEATHWATCH ALLIES': 'a rule’s title written in capitals',
  'SHADOW LEGION UNDIVIDED': 'UNDIVIDED is no keyword',
  'VEHICLE UNITS': 'UNITS is the plain word',
  'MINKA LESK ONLY': 'ONLY is the plain word',
  'SZAREKH MODEL': 'MODEL is the plain word',
}

describe('keywords written in capitals', () => {
  it('are all in the generated list (run `npm run datasheets:index`)', () => {
    const vocabulary = new Set(unitKeywordVocabulary)
    for (const sheets of Object.values(sheetFiles)) for (const sheet of sheets || []) for (const n of capsNamesOf(sheet)) vocabulary.add(n)
    for (const box of combatPatrol.en.factions) {
      for (const sheet of box.datasheets || []) for (const n of [...unitKeywordsOf(sheet).map(foldName), ...capsNamesOf(sheet)]) vocabulary.add(n)
    }
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
    // U+2011, the non-breaking hyphen: one word, bolded whole or not at all.
    expect(renderInline('SHIELD‑CAPTAIN IN ALLARUS TERMINATOR ARMOUR model only')).toContain('<strong>SHIELD‑CAPTAIN IN ALLARUS TERMINATOR ARMOUR</strong>')
    expect(renderInline('Friendly TYRANID WARRIORS with Ranged Bio-weapons')).toContain('<strong>TYRANID WARRIORS</strong>')
    expect(renderInline('one ADEPTUS CUSTODES AQUILAN WING unit')).toContain('<strong>AQUILAN WING</strong>')
  })

  // The renderer's output, not the source: a run is half bold when some of its capital words come
  // out <strong> and some do not. Names are left out (a heading is bold whole anyway).
  it('read whole wherever the data writes them, or are listed with a reason', () => {
    const { renderInline } = useRenderInline()
    const B = '\u0001' // marks a word that came out bold
    const TOKEN = `${B}?[A-Z][A-Z’'\\u2011-]*[A-Z]`
    const RUN = new RegExp(`(?<![\\p{L}\\p{N}’'\\u2011-])${TOKEN}(?: ${TOKEN})+(?![\\p{L}\\p{N}’'\\u2011-])`, 'gu')
    const found = new Set()
    const seen = new WeakSet()
    const walk = (v, key) => {
      if (typeof v === 'string') {
        if (key === 'name' || !/[A-Z]{2,} [A-Z]{2,}/.test(v)) return
        const flat = String(renderInline(v))
          .replace(/<strong[^>]*>(.*?)<\/strong>/g, (_, s) => s.replace(/<[^>]+>/g, '').replace(/(?<![\p{L}’'\u2011-])(?=[A-Z])/gu, B))
          .replace(/<[^>]+>/g, '')
        for (const m of flat.matchAll(RUN)) {
          const bold = m[0].split(' ').filter((w) => w.startsWith(B)).length
          if (bold && bold < m[0].split(' ').length) found.add(m[0].replaceAll(B, ''))
        }
      } else if (v && typeof v === 'object' && !seen.has(v)) {
        seen.add(v)
        for (const [k, x] of Object.entries(v)) walk(x, k)
      }
    }
    for (const mod of Object.values(modules)) walk(mod, '')
    expect([...found].filter((p) => !HALF_BOLD_OK[p]).sort()).toEqual([])
    // …and an exception the data no longer needs goes.
    expect(Object.keys(HALF_BOLD_OK).filter((p) => !found.has(p))).toEqual([])
  })
})

