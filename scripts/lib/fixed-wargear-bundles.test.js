import { describe, expect, it } from 'vitest'
import { fixedWargearBundles } from './fixed-wargear-bundles.mjs'
import daemons from '../../src/data/roster/chaos-daemons.js'
import eaters from '../../src/data/roster/world-eaters.js'
import aeldari from '../../src/data/roster/aeldari.js'
import orks from '../../src/data/roster/orks.js'
import items from '../../src/data/roster/items.js'
import { optionItems, wargearGroupBlocker } from '../../src/core/roster/rosterEngine.js'

const options = (data, id, gi) => data.units.find(u => u.id === id).gear[gi].o.map(o => optionItems(o).map(([id, n]) => [items.items[id], n]))
describe('complete fixed-prefix replacements', () => {
  it('offers both complete Bloodthirster replacements in both factions', () => {
    for (const data of [daemons, eaters]) expect(options(data, 'bloodthirster', 0)).toEqual([
      [['Axe of Khorne', 1], ['Bloodflail', 1]], [['Axe of Khorne', 1], ['Lash of Khorne', 1]],
    ])
  })
  it('keeps the pistol with each Exarch blade and gates the shield on having that pistol', () => {
    expect(options(aeldari, 'dire-avengers', 0)).toEqual([
      [['Shuriken pistol', 1], ['Diresword', 1]], [['Shuriken pistol', 1], ['Power glaive', 1]],
    ])
    const def = aeldari.units.find(u => u.id === 'dire-avengers')
    expect(wargearGroupBlocker(def, { size: 0, wg: [] }, 2)).toBeTruthy()
    for (const oi of [0, 1]) expect(wargearGroupBlocker(def, { size: 0, wg: [[0, oi, 1]] }, 2)).toBeFalsy()
  })
  it('offers exactly the ten Kill Tank combinations with a rolla and three guns', () => {
    const sets = options(orks, 'kill-tank', 2)
    expect(sets).toHaveLength(10)
    expect(new Set(sets.map(s => JSON.stringify(s))).size).toBe(10)
    for (const set of sets) {
      expect(set.find(([name]) => name === 'Deff Rolla')).toEqual(['Deff Rolla', 1])
      expect(set.filter(([name]) => name !== 'Deff Rolla').reduce((sum, [, n]) => sum + n, 0)).toBe(3)
    }
  })
  it('refuses to silently flatten a recognized instruction with no alternatives', () => {
    expect(() => fixedWargearBundles({ text: 'This model can be equipped with 1 axe and one of the following:', fullTexts: [], vocab: [{ uuid: 'axe', name: 'axe' }], readItems: () => [['axe', 1]], legal: [] })).toThrow(/Missing alternatives/)
  })
})
