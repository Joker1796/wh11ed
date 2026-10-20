import { describe, it, expect } from 'vitest'
import rosterItemsData from '../data/roster/items.js'
import { MISSPELT, infoKey, infoKeys, sheetHas, abilityKey } from './wargearInfo.js'

// Every wargear option of every unit in the builder has an info button, and the window it opens
// must show something — a weapon row or a rule — on the unit's own sheet or, for a rule printed on
// another of the faction's sheets (a Watcher in the Dark), on that one. A player found the Gun
// Drone's window empty (2026-10-19); 27 options of 2809 were.
// The faction files only: the folder also holds core.js, items.js, index.js and tests.
const rosters = import.meta.glob(['../data/roster/*.js', '!../data/roster/{core,items,index}.js', '!../data/roster/*.test.js'], { eager: true, import: 'default' })
const sheetsOf = import.meta.glob('../data/datasheets/*.js', { import: 'default' })

const optionIds = (u) => {
  const ids = new Set()
  for (const g of u.gear || []) for (const o of g.o || []) {
    const head = o?.[0]
    for (const id of Array.isArray(head) ? head.map((x) => x[0]) : [head]) if (id != null) ids.add(id)
  }
  return ids
}

describe('wargear info window', () => {
  it('finds something for every option of every unit', async () => {
    const empty = []
    for (const [path, r] of Object.entries(rosters)) {
      const slug = path.match(/([a-z-]+)\.js$/)[1]
      const load = sheetsOf[`../data/datasheets/${slug}.js`]
      if (!load || !r?.units) continue
      const sheets = await load()
      for (const u of r.units) {
        const sheet = sheets.find((d) => d.id === u.id)
        if (!sheet) continue
        for (const id of optionIds(u)) {
          const name = rosterItemsData.items[id]
          if (!name) continue
          const keys = infoKeys([name])
          if (sheetHas(sheet, keys)) continue
          if (sheets.some((d) => (d.wargearAbilities || []).some((a) => keys.has(abilityKey(a))))) continue
          empty.push(`${slug} · ${u.name}: ${name}`)
        }
      }
    }
    expect(empty).toEqual([])
  })

  it('keeps a misspelling only while appdata still has it', () => {
    const names = new Set(Object.values(rosterItemsData.items).map(infoKey))
    for (const typo of Object.keys(MISSPELT)) expect(names.has(typo), typo).toBe(true)
  })
})
