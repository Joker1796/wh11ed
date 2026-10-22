import { describe, expect, it } from 'vitest'
import { foldName, preloadDatasheetTags, retiredAliasHit, unitTagHit, queryWords, wordsIn } from './datasheetTags.js'
import { proxiesMatching } from './useFactionLegends.js'
import factionLegends from '../data/factionLegends.json'

describe('unit tags', () => {
  it('finds a unit by its own ability, a core ability, a keyword and an RU ability name', async () => {
    await preloadDatasheetTags()
    expect(unitTagHit('orks', 'boyz', foldName('Tide'))).toBe('Tide of Muscle')
    expect(unitTagHit('orks', 'boyz', foldName('Mob'))).toBe('Mob')
    expect(unitTagHit('orks', 'boyz', foldName('Вал мус'))).toBe('Вал мускулов')
    expect(unitTagHit('space-marines', 'terminator-squad', foldName('deep strike'))).toBe('Deep Strike')
  })

  it("finds a Chapter's folded-in Space Marines sheet under the Chapter", async () => {
    await preloadDatasheetTags()
    expect(unitTagHit('blood-angels', 'terminator-squad', foldName('deep strike'))).toBe('Deep Strike')
  })

  it('stays silent below three characters, and for an unknown unit', async () => {
    await preloadDatasheetTags()
    expect(unitTagHit('orks', 'boyz', 'mo')).toBe(null)
    expect(unitTagHit('orks', 'no-such-unit', 'mob')).toBe(null)
  })
  it("a faction's unit list finds a retired unit by its Russian name", async () => {
    await preloadDatasheetTags()
    expect(retiredAliasHit('orks', 'Ufthak Blackhawk', foldName('уфтхак'))).toBe('Уфтхак Чёрный Гребень')
    expect(retiredAliasHit('orks', 'Ufthak Blackhawk', foldName('уф'))).toBe(null)
    expect(proxiesMatching(factionLegends.orks.proxies, 'уфтхак', 'orks').map((p) => p.legacy)).toEqual([['Ufthak Blackhawk']])
    // A Chapter's table has its own aliases, the name-pattern ones included.
    expect(proxiesMatching(factionLegends['black-templars'].proxies, 'лендак', 'black-templars').length).toBeGreaterThan(0)
  })
})

// A player's report (2026-10-09): "темпестус сционов" found nothing — the RU name is
// "сционы Темпестус", the other word order, and the query was in the genitive.
describe('queryWords / wordsIn', () => {
  it('matches the words in any order', () => {
    expect(wordsIn('сционы Темпестус', queryWords('темпестус сционы'))).toBe(true)
    expect(wordsIn('Tempestus Scions', queryWords('scions tempestus'))).toBe(true)
  })
  it('drops a Russian case ending from a word of five letters or more', () => {
    expect(wordsIn('сционы Темпестус', queryWords('темпестус сционов'))).toBe(true)
    expect(wordsIn('Орки', queryWords('орков'))).toBe(true)
    expect(wordsIn('Терминаторы', queryWords('терминаторов'))).toBe(true)
  })
  it('keeps short words whole: a nickname is not a stem', () => {
    expect(queryWords('газя')).toEqual(['газя'])
    expect(wordsIn('Газгкулл Трака', queryWords('газя'))).toBe(false)
  })
  it('needs every word', () => {
    expect(wordsIn('Tempestus Scions', queryWords('tempestus aquilons'))).toBe(false)
  })
})

describe('foldName (search)', () => {
  // appdata spells "Caladius Grav‑Tank" with a non-breaking hyphen nobody types (2026-10-15).
  it('finds a name with a typographic hyphen or apostrophe from the plain one', () => {
    expect(foldName('Caladius Grav‑Tank')).toContain(foldName('grav-tank'))
    expect(foldName('Hell’s Last')).toBe(foldName("Hell's Last"))
  })
})
