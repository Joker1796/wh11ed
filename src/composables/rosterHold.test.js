import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { holdGroup, holdCounts, holdWg, stockLeft } from './rosterHold.js'
import { fixedLoadoutLines, modelsPerMini, overdrawnGroups, swapOverdraft, unitWargearPoints } from './rosterEngine.js'
import shared from '../data/roster/items.js'

const dir = path.resolve(__dirname, '../data/roster')
const factions = await Promise.all(fs.readdirSync(dir)
  .filter((f) => f.endsWith('.js') && !f.includes('.test.') && !['index.js', 'items.js', 'core.js'].includes(f))
  .map(async (f) => (await import(path.join(dir, f))).default))
const groups = factions.flatMap((d) => d.units.flatMap((def) => (def.gear || []).flatMap((g, gi) => (holdGroup(def, gi) ? [{ slug: d.slug, def, gi }] : []))))

// Every way to spread `models` over `rows` rows.
function* spreads(models, rows) {
  if (rows === 1) { yield [models]; return }
  for (let n = 0; n <= models; n++) for (const rest of spreads(models - n, rows - 1)) yield [n, ...rest]
}

describe('swap groups drawn as what the models hold', () => {
  it('covers the groups whose rows include the weapons they replace', () => {
    const names = groups.map(({ slug, def }) => `${slug}: ${def.name}`)
    expect(names).toContain('chaos-space-marines: Havocs')
    expect(names).toContain('orks: Stormboyz')
    expect(names).toContain('space-marines: Scout Bike Squad')
  })

  it('reads the Havocs stock loadout as two of each cannon', () => {
    const { def, gi } = groups.find((x) => x.def.id === 'havocs')
    expect(holdCounts(def, { unitId: 'havocs', size: 0, wg: [] }, gi)).toEqual([2, 0, 2, 0, 0])
  })

  // The translation holdWg makes is the only new thing — so every distribution of every group, at
  // every size, goes through the engine and has to come back as what was asked, with nothing
  // overdrawn and nothing charged twice.
  it('round-trips every distribution through the engine', () => {
    let checked = 0
    for (const { def, gi } of groups) {
      const g = def.gear[gi]
      for (let size = 0; size < def.sizes.length; size++) {
        const base = { unitId: def.id, size, wg: [] }
        const models = modelsPerMini(def, base)?.get(g.m ?? 0)
        if (!models) continue
        const stock = holdCounts(def, base, gi)
        if (!stock) continue
        for (const want of spreads(Math.min(models, 4), g.o.length)) {
          const counts = models > 4 ? want.map((n, oi) => n + (oi === stock.indexOf(Math.max(...stock)) ? models - 4 : 0)) : want
          const entry = { ...base, wg: holdWg(def, base, gi, counts) }
          const where = `${def.name} size ${size} ${JSON.stringify(counts)}`
          expect(holdCounts(def, entry, gi), where).toEqual(counts)
          expect(swapOverdraft(def, entry), where).toEqual([])
          expect([...overdrawnGroups(def, entry)], where).toEqual([])
          const priced = counts.reduce((s, n, oi) => s + n * (g.o[oi][1] || 0), 0)
          expect(unitWargearPoints(def, entry), where).toBe(counts.every((n, oi) => n === stock[oi]) ? 0 : priced)
          checked++
        }
      }
    }
    expect(checked).toBeGreaterThan(50)
  })

  it('stores the stock loadout as no swaps at all', () => {
    for (const { def, gi } of groups) {
      const base = { unitId: def.id, size: 0, wg: [] }
      const stock = holdCounts(def, base, gi)
      if (stock) expect(holdWg(def, base, gi, stock)).toEqual([])
    }
  })
})

const unit = (slug, name) => factions.find((d) => d.slug === slug).units.find((u) => u.name === name)

describe('the stock row of a swap group', () => {
  it('counts the models that still carry what the group replaces', () => {
    const def = unit('necrons', 'Necron Warriors')
    const entry = { unitId: def.id, size: 0, wg: [] }
    expect(stockLeft(def, entry, 0)).toBe(10)
    expect(stockLeft(def, { ...entry, wg: [[0, 0, 3]] }, 0)).toBe(7)
  })

  it('shows the same pistols in both groups that replace them', () => {
    const def = unit('space-marines', 'Vanguard Veteran Squad')
    const entry = { unitId: def.id, size: 0, wg: [[0, 0, 1], [1, 2, 2]] }
    expect(stockLeft(def, entry, 0)).toBe(2)
    expect(stockLeft(def, entry, 1)).toBe(2)
  })

  it('never reads below zero, in any group, with nothing picked', () => {
    for (const d of factions) {
      for (const def of d.units) {
        (def.gear || []).forEach((g, gi) => {
          const n = stockLeft(def, { unitId: def.id, size: 0, wg: [] }, gi)
          if (n != null) expect(n, `${def.name} g${gi}`).toBeGreaterThanOrEqual(0)
        })
      }
    }
  })
})

describe('wargear that cannot be replaced', () => {
  const lines = (slug, name) => {
    const def = unit(slug, name)
    return fixedLoadoutLines(def, shared.items, { unitId: def.id, size: 0, wg: [] }).map((l) => `${l.mini}: ${l.items}`)
  }

  it('lists only what no group replaces', () => {
    expect(lines('necrons', 'Necron Warriors')).toEqual([': Close combat weapon'])
    expect(lines('chaos-space-marines', 'Havocs')).toEqual(['Havoc: Close Combat Weapon'])
    expect(lines('space-marines', 'Vanguard Veteran Squad')).toEqual(['Vanguard Veteran: Heirloom Weapon', 'Vanguard Veteran Sergeant: Heirloom Weapon'])
  })

  it('does not move when a pick is made', () => {
    const def = unit('necrons', 'Necron Warriors')
    const at = (wg) => fixedLoadoutLines(def, shared.items, { unitId: def.id, size: 0, wg })
    expect(at([[0, 0, 10]])).toEqual(at([]))
  })
})
