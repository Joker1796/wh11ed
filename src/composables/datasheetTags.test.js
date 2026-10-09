import { describe, expect, it } from 'vitest'
import { foldName, preloadDatasheetTags, unitTagHit, queryWords, wordsIn } from './datasheetTags.js'

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
