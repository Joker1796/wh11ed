import { describe, it, expect } from 'vitest'

// A title-caser once wrote "At the Tyrant’S Command" and seven more like it into the stratagem
// names, in both languages and the search index (found 2026-10-19). The datasheet names were
// checked for case; these were not. A lower-case letter, an apostrophe, a capital S: never a name.
const modules = import.meta.glob(['./factions/*.js', '!./factions/index.js'], { eager: true })

describe('faction rule names', () => {
  it('carry no title-caser "’S"', () => {
    const bad = []
    for (const [file, mod] of Object.entries(modules)) {
      const en = Object.values(mod).find((v) => v?.en)?.en
      for (const d of en?.detachments || []) {
        for (const x of [d, ...(d.stratagems || []), ...(d.enhancements || [])]) {
          if (/[a-z][’']S\b/.test(x?.name || '')) bad.push(`${file}: ${x.name}`)
        }
      }
    }
    expect(bad).toEqual([])
  })
})
