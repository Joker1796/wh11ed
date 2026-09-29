import { describe, it, expect } from 'vitest'
import { datasheetSearchExamples } from './datasheetSearchExamples.js'
import { datasheetIndex } from './datasheetIndex.js'
import { datasheetTagIndex } from './datasheetTagIndex.js'
import { foldName, TAG_MIN } from '../composables/datasheetTags.js'

// The examples a faction's unit search types into its empty box are an invitation to try them:
// each one must find a unit when typed, by the same matching the box does — the unit's name, or
// one of its tags (abilities, keywords, RU aliases). A data bump that renames an ability would
// otherwise leave the box suggesting a query that finds nothing.
function finds(slug, query) {
  const q = foldName(query)
  const units = datasheetIndex.find(([s]) => s === slug)?.[2] || []
  const [table, byUnit] = datasheetTagIndex[slug] || [[], {}]
  return units.some(([id, name, , , legends]) => !legends && (foldName(name).includes(q)
    || (q.length >= TAG_MIN && (byUnit[id] || []).some((i) => foldName(table[i]).includes(q)))))
}

describe('datasheetSearchExamples', () => {
  const factions = datasheetIndex.map(([slug]) => slug)

  it('covers every faction with a unit search', () => {
    expect(Object.keys(datasheetSearchExamples).sort()).toEqual([...factions].sort())
  })

  for (const [slug, [examples, alias]] of Object.entries(datasheetSearchExamples)) {
    it(`${slug}: every example finds a unit`, () => {
      expect(examples.length).toBeGreaterThanOrEqual(2)
      for (const e of [...examples, ...(alias ? [alias] : [])]) {
        expect(e.length, e).toBeLessThanOrEqual(22)
        expect(finds(slug, e), e).toBe(true)
      }
      if (alias) expect(alias).toMatch(/[а-яё]/i)
    })
  }
})
