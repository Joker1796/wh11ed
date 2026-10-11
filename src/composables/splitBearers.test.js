// "The bearer only" wargear, end to end on the shipped data: the card's own pipeline (trim the
// weapons to the loadout, pick the records the entry carries, place them, apply) for the units the
// placement was written for, and for the one it must leave alone.
import { describe, it, expect } from 'vitest'
import { loadRosterFaction, rosterItems } from '../data/roster/index.js'
import { loadRosterModifiersFor } from '../data/rosterModifiers/index.js'
import { loadDatasheets } from '../data/datasheets/index.js'
import { overlaySheet, loadoutItemNames, itemKey } from './rosterModifiers.js'
import { applyStatMods, datasheetEntriesFor, splitBearers } from './rosterStatMods.js'

const items = rosterItems.items

// [group, option] of the first option on `def` that hands out `item`.
function pick(def, item) {
  for (const [gi, g] of (def.gear || []).entries()) {
    for (const [oi, o] of (g.o || []).entries()) {
      if (JSON.stringify(o).match(/\d+/g)?.some((id) => itemKey(items[id]) === itemKey(item))) return [gi, oi]
    }
  }
  throw new Error(`${def.id} offers no ${item}`)
}

async function card(slug, unitId, size, picks) {
  const def = (await loadRosterFaction(slug)).units.find((u) => u.id === unitId)
  const printed = (await loadDatasheets(slug)).find((d) => d.id === unitId)
  const records = (await loadRosterModifiersFor(slug)).entries.filter((e) => e.reviewed && e.effects?.length)
  const entry = { uid: 'u', id: unitId, size, wg: picks.map(([item, n]) => [...pick(def, item), n]) }
  const sheet = overlaySheet(printed, { def, entry, items }).sheet
  const entries = datasheetEntriesFor(records, { unitId, itemNames: loadoutItemNames(def, entry, items) })
  const placed = splitBearers(sheet, entries, def, entry, items)
  const kws = [...printed.keywords, ...printed.factionKeywords]
  return applyStatMods(placed.sheet, placed.entries, kws, [], new Set(), new Set())
}

const row = (r) => `${r.name}${r.qty ? ` ×${r.qty}` : ''}`

describe('splitBearers', () => {
  it('gives three Storm Shields in ten Terminators a row of their own, the first to the Sergeant', async () => {
    const res = await card('space-marines', 'terminator-assault-squad', 1, [['Storm Shield', 3]])
    expect(res.sheet.profiles.map((p) => [row(p), p.w])).toEqual([
      ['Terminator Sergeant', '4'],
      ['Terminator ×7', '3'],
      ['Terminator · Storm Shield ×2', '4'],
    ])
    expect(res.marks).toEqual(expect.arrayContaining(['profile:w:0', 'profile:w:2']))
    expect(res.marks).not.toContain('profile:w:1')
  })

  // A Chapter fields the Codex unit, and reads its records from the Space Marines file (2026-10-01).
  it('does the same for a Chapter fielding the Codex squad', async () => {
    const res = await card('blood-angels', 'terminator-assault-squad', 1, [['Storm Shield', 3]])
    expect(res.sheet.profiles.map((p) => [row(p), p.w])).toEqual([
      ['Terminator Sergeant', '4'],
      ['Terminator ×7', '3'],
      ['Terminator · Storm Shield ×2', '4'],
    ])
  })

  it('splits nothing when every model carries the shield — the number moves', async () => {
    const res = await card('space-marines', 'terminator-assault-squad', 0, [['Storm Shield', 5]])
    expect(res.sheet.profiles.map((p) => [row(p), p.w])).toEqual([
      ['Terminator Sergeant', '4'],
      ['Terminator', '4'],
    ])
  })

  it('no longer gives one Mortifier\'s Anchorite Sarcophagus to both', async () => {
    const res = await card('adepta-sororitas', 'mortifiers', 1, [['Anchorite Sarcophagus', 1]])
    expect(res.sheet.profiles.map((p) => [row(p), p.m, p.sv])).toEqual([
      ['Mortifiers ×1', '8"', '4+'],
      ['Mortifiers · Anchorite Sarcophagus ×1', '7"', '3+'],
    ])
  })

  it('splits a weapon every model holds — Reavers\' bladevanes and the Grav-talon', async () => {
    // Size 1 is four Reavers.
    const res = await card('drukhari', 'reavers', 1, [['Grav-talon', 1]])
    const blades = res.sheet.melee.filter((w) => w.name.startsWith('Bladevanes'))
    expect(blades.map((w) => [row(w), w.ap, w.tags.includes('LETHAL HITS')])).toEqual([
      ['Bladevanes ×3', '-1', false],
      ['Bladevanes · Grav-talon ×1', '-2', true],
    ])
  })

  it('places a Spotter on the weapons every model carries, and leaves the rest a note', async () => {
    // One Ridgerunner of three swaps its mining laser for a heavy mortar: the bearer's stubber is
    // certain, its heavy weapon is not.
    const res = await card('genestealer-cults', 'achilles-ridgerunners', 1, [['Spotter', 1], ['Heavy mortar', 1]])
    const sharper = res.sheet.ranged.filter((w) => w.bs === '3+').map(row)
    expect(sharper).toEqual(['Twin heavy stubber · Spotter ×1'])
    expect(res.notes.some((n) => n.source.endsWith('Spotter') && !n.applied)).toBe(true)
  })
})

// T'au drones are tokens, not models (army rule "Drones"): a Shield Drone adds 1 to its BEARER's
// Wounds, once per drone — the bearer may take two (player report, 2026-10-11; the GW app's Battle
// Forge accepts two on one Cadre Fireblade). The records said "the Shield Drone model only" and
// were never applied.
describe('splitBearers — T\'au Shield Drones', () => {
  it('adds 1 Wounds for one drone and 2 for two, on a model of its own', async () => {
    const w = async (n) => (await card('tau-empire', 'cadre-fireblade', 0, n ? [['Shield Drone', n]] : [])).sheet.profiles.map((p) => [row(p), Number(p.w)])
    const base = (await w(0))[0][1]
    expect(await w(1)).toEqual([['Cadre Fireblade', base + 1]])
    expect(await w(2)).toEqual([['Cadre Fireblade', base + 2]])
  })

  it('gives the Shas\'ui with a drone a row of its own in a Strike Team', async () => {
    const res = await card('tau-empire', 'strike-team', 0, [['Shield Drone', 1]])
    const rows = res.sheet.profiles.map((p) => [row(p), Number(p.w)])
    expect(rows).toEqual([['Strike Team ×9', rows[0][1]], ['Strike Team · Shield Drone ×1', rows[0][1] + 1]])
  })
})

// The same drone on a Legends sheet from a Faction Pack (gen-roster-modifiers' packSources): until
// 2026-10-11 these had no record at all.
describe('splitBearers — Legends T\'au Shield Drones', () => {
  it('adds 1 Wounds to a Commander in Crisis Battlesuit for each drone', async () => {
    const w = async (n) => Number((await card('tau-empire', 'commander-in-crisis-battlesuit', 0, n ? [['Shield Drone', n]] : [])).sheet.profiles[0].w)
    const base = await w(0)
    expect([await w(1), await w(2)]).toEqual([base + 1, base + 2])
  })
})
