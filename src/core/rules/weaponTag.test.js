// Every weapon tag a datasheet prints opens ITS rule when tapped: a Core Rules ability by its exact
// name once the parameters are off, or an ability the sheet itself prints — never a core ability
// whose name it merely begins with, and never nothing. 2026-10-16: [PSYCHIC ASSASSIN] (Culexus
// Assassin) opened [PSYCHIC], and eight tags with text on their own sheet ([CONVERSION],
// [PLASMA WARHEAD], …) opened nothing.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { baseTag, sheetRuleForTag } from './weaponTag.js'
import { lookup } from '../../composables/useKeywordPopover.js'
import { coreAbilities } from '../../data/reference.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'

const data = { coreAbilities, eventCompanion }
const DS = path.join(import.meta.dirname, '../../data/datasheets')
const slugs = fs.readdirSync(DS).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js')).map((f) => f.slice(0, -3))
const rulesOf = (s) => ['wargearAbilities', 'abilities', 'specialAbilities'].flatMap((k) => s[k] || [])

describe('baseTag', () => {
  it.each([
    ['SUSTAINED HITS 2', 'SUSTAINED HITS'], ['MELTA D3', 'MELTA'], ['ANTI-PSYKER 2+', 'ANTI'],
    ['LETHAL HITS: VEHICLE', 'LETHAL HITS'], ['RAPID FIRE D6+3', 'RAPID FIRE'], ['Scouts 6"', 'SCOUTS'],
    ['Feel No Pain 5+', 'FEEL NO PAIN'], ['PSYCHIC ASSASSIN', 'PSYCHIC ASSASSIN'],
  ])('%s → %s', (tag, base) => expect(baseTag(tag)).toBe(base))
})

describe('a tapped keyword opens its own rule', () => {
  it('a tag that only begins with a core name is not that ability', () => {
    expect(lookup('PSYCHIC ASSASSIN', data, 'en')).toBe(null)
    expect(lookup('SUSTAINED HITS 2', data, 'en')?.name).toBe('[SUSTAINED HITS]')
    expect(lookup('ANTI-PSYKER 2+', data, 'en')?.name).toBe('[ANTI]')
    expect(lookup('Scouts 6"', data, 'en')?.name).toBe('Scouts')
    expect(lookup('LETHAL HITS: VEHICLE', data, 'ru')?.name).toBe('[LETHAL HITS]')
  })

  it('every weapon tag on every datasheet, EN and RU: the core ability of that name, or the sheet\'s own', async () => {
    const wrong = []
    let own = 0
    for (const slug of slugs) {
      const en = await loadDatasheets(slug)
      const mod = await loadDatasheetsRu(slug).catch(() => null)
      for (const sheet of en) {
        // The sheet as a Russian reader's card gets it (rosterUnitCard.js, FactionDatasheetView).
        const ruSheet = localizeSheet(sheet, mod?.default?.[sheet.id], mod?.abilityNamesRu)
        for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
          for (const tag of w.tags || []) {
            for (const [loc, s] of [['en', sheet], ['ru', ruSheet]]) {
              const mine = sheetRuleForTag(tag, rulesOf(s))
              const core = lookup(tag, data, loc)
              if (mine) {
                own++
                // The sheet's own text wins; a core ability of the same name would be shadowed.
                if (core) wrong.push(`${slug}/${sheet.id} [${tag}] ${loc}: sheet's own rule shadows ${core.name}`)
                continue
              }
              if (!core) wrong.push(`${slug}/${sheet.id} [${tag}] ${loc}: opens nothing`)
              else if (core.name.replace(/^\[|\]$/g, '').toUpperCase() !== baseTag(tag)) wrong.push(`${slug}/${sheet.id} [${tag}] ${loc}: opens ${core.name}`)
            }
          }
        }
      }
    }
    expect([...new Set(wrong)]).toEqual([])
    expect(own).toBeGreaterThan(0)
  }, 120000)
})
