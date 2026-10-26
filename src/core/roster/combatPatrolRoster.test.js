// A Combat Patrol box as the list a Combat Patrol game carries (combatPatrolRoster.js), on the
// real data: every box's units as many times as the box holds them, its Warlord, the enhancement
// on the unit it names, and every unit resolvable to a card (its sheet in combatPatrol.js).
import { describe, it, expect } from 'vitest'
import { combatPatrol } from '../../data/combatPatrol.js'
import { loadRosterFaction } from '../../data/roster/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { combatPatrolRoster, defaultCombatPatrolEnhancement } from './combatPatrolRoster.js'

let n = 0
const uid = () => `u${++n}`

describe('a Combat Patrol box as a list', () => {
  it("fields the Orks box: both Boyz units, the Warboss as Warlord, the default enhancement on him", async () => {
    const box = combatPatrol.en.factions.find((b) => b.id === 'orks')
    const faction = await loadRosterFaction('orks', { cp: 'orks' })
    const r = combatPatrolRoster(box, faction, defaultCombatPatrolEnhancement(box), uid)
    expect(r.cp).toBe('orks')
    expect(r.units.map((u) => u.id).sort()).toEqual(['ardmob-boyz', 'ardmob-boyz-kustom-shoota', 'ardmob-gretchin', 'ardmob-warboss', 'ardmob-wartrakk', 'ardmob-weirdboy'])
    expect(r.units.filter((u) => u.warlord).map((u) => u.id)).toEqual(['ardmob-warboss'])
    expect(r.units.find((u) => u.enh)).toMatchObject({ id: 'ardmob-warboss', enh: 'Rallying War Cry' })
    // …and the other enhancement is an Upgrade on the Wartrakk.
    const other = combatPatrolRoster(box, faction, 'Extra Platin’', uid)
    expect(other.units.find((u) => u.enh)).toMatchObject({ id: 'ardmob-wartrakk' })
  })

  it('gives every box all its units, a Warlord, a bearer for each enhancement, and a sheet for each unit', async () => {
    for (const box of combatPatrol.en.factions) {
      const faction = await loadRosterFaction(box.slug, { cp: box.id })
      const sheets = new Set((await loadDatasheets(box.slug, { cp: box.id })).map((d) => d.id))
      const held = box.datasheets.reduce((s, d) => s + (d.count || 1), 0)
      for (const e of box.enhancements) {
        const r = combatPatrolRoster(box, faction, e.name, uid)
        expect(r.units.length, `${box.id}: units`).toBe(held)
        expect(r.units.filter((u) => u.warlord).length, `${box.id}: Warlord`).toBe(1)
        expect(r.units.filter((u) => u.enh).length, `${box.id}: a bearer for ${e.name}`).toBe(1)
        for (const u of r.units) expect(sheets.has(u.id), `${box.id}: sheet for ${u.id}`).toBe(true)
      }
    }
  })
})
