import { describe, it, expect } from 'vitest'
import textsRu from './texts.js'
import items from '../items.js'

// The Russian here is GENERATED from the English by scripts/gen-roster-texts-ru.mjs, so what's
// worth pinning isn't a wording but the two invariants the generator promises: it never emits a
// half-translated line, and it never claims an id the English side doesn't have.
describe('roster wargear instructions in Russian', () => {
  const values = Object.values(textsRu)

  it('covers a useful share of the corpus without claiming all of it', () => {
    const total = Object.keys(items.texts).length
    expect(values.length).toBeGreaterThan(total * 0.7)
    expect(values.length).toBeLessThanOrEqual(total)
  })

  it('only carries ids that exist in the English source', () => {
    for (const id of Object.keys(textsRu)) expect(items.texts[id], id).toBeTruthy()
  })

  it('leaves no English sentence frame behind on the first line', () => {
    // Weapon and unit names stay English by convention, so only the FRAME is checked — the
    // verbs and connectives that would betray a sentence the generator half-understood.
    const frame = /\b(can be replaced|can be equipped|one of the following|any number of|up to \d|for every \d|in this unit)\b/i
    const leaked = values.filter((v) => frame.test(v.split('\n')[0]))
    expect(leaked).toEqual([])
  })

  it('keeps the bullet list a list, one option per line', () => {
    // The markers are what the editor renders as separate rows; a translation that folds them
    // onto one line reads as a single run-on sentence offering everything at once.
    for (const [id, ru] of Object.entries(textsRu)) {
      const en = items.texts[id]
      if (!/\n\s*[◦•]/.test(en)) continue
      const count = (s) => (s.match(/[◦•]/g) || []).length
      expect(count(ru), id).toBe(count(en))
      expect(/[◦•]/.test(ru.split('\n')[0]), id).toBe(false)
    }
  })

  it('leaves no doubled space or dangling noun from a slot that resolved to nothing', () => {
    expect(values.filter((v) => /\s{2,}|моделей\s+models?\b/.test(v.split('\n')[0]))).toEqual([])
  })
})
