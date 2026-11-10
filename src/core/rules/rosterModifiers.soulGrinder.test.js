import { describe, expect, it } from 'vitest'
import faction from '../../data/roster/chaos-daemons.js'
import sheets from '../../data/datasheets/chaos-daemons.js'
import gear from '../../data/roster/items.js'
import { overlaySheet } from './rosterModifiers.js'
import { migrateRoster } from '../../composables/useRosters.js'

const def = faction.units.find(unit => unit.id === 'soul-grinder')
const sheet = sheets.find(unit => unit.id === 'soul-grinder')
const weapons = { Khorne: 'Torrent of burning blood', Tzeentch: 'Warp gaze', Nurgle: 'Phlegm bombardment', Slaanesh: 'Scream of despair' }
const view = entry => overlaySheet(sheet, { def, entry: { id: def.id, size: 0, ...entry }, items: gear.items }).sheet

describe('Soul Grinder equipment belongs to its allegiance', () => {
  it.each(Object.entries(weapons))('%s grants only %s, regardless of an obsolete manual pick', (alleg, weapon) => {
    for (const option of [0, 1, 2, 3]) expect(view({ alleg, wg: [[1, option, 1]] }).ranged.map(row => row.name)).toEqual(['Harvester cannon', weapon])
  })
  it('does not grant any divine weapon before a god is chosen', () => {
    expect(view({ wg: [[1, 0, 1]] }).ranged.map(row => row.name)).toEqual(['Harvester cannon'])
  })
  it('keeps the independent sword replacement', () => {
    const names = view({ alleg: 'Nurgle', wg: [[0, 0, 1]] }).melee.map(row => row.name)
    expect(names).toContain('Warpclaw')
    expect(names).not.toContain('Warpsword')
  })
  it('does not expose a manual choice of a god weapon', () => {
    expect(def.gear).toHaveLength(1)
  })
  it('keeps the obsolete selection as a nonblocking correction across a second read', () => {
    const old = { id: 'old', name: 'Old', faction: faction.slug, dv: 2, units: [{ uid: 'u', id: def.id, alleg: 'Nurgle', wg: [[0, 0, 1], [1, 0, 1]] }] }
    const migrated = migrateRoster(old, 13)
    expect(migrated.units[0].wg).toEqual([[0, 0, 1]])
    expect(migrated.units[0].gearRecovery).toEqual([{ pick: [1, 0, 1], meaning: 'torrent of burning blood×1', automatic: true }])
    expect(migrateRoster(JSON.parse(JSON.stringify(migrated)), 13).units[0].gearRecovery).toEqual(migrated.units[0].gearRecovery)
    expect(view(migrated.units[0]).ranged.map(row => row.name)).toEqual(['Harvester cannon', weapons.Nurgle])
  })
})

it('treats an automatic correction as a warning, keeping a missing mark an error', async () => {
  const { validateRoster } = await import('../roster/rosterValidation.js')
  const { default: core } = await import('../../data/roster/core.js')
  const entry = { uid: 'u', id: def.id, size: 0, gearCheck: 2, gearRecovery: [{ pick: [1, 0, 1], meaning: 'torrent of burning blood×1', automatic: true }] }
  const issues = alleg => validateRoster({ faction: faction.slug, battleSize: 'strike-force', detachments: [], units: [{ ...entry, alleg }] }, { faction, core, items: gear.items }).issues
  expect(issues('Nurgle').find(issue => issue.code === 'gearAutomatic').level).toBe('warn')
  expect(issues('Nurgle').some(issue => issue.code === 'gearRecovery')).toBe(false)
  expect(issues(undefined).some(issue => issue.code === 'allegMissing' && issue.level === 'error')).toBe(true)
})

it('still recognizes stock equipment on definitions without an allegiance grant', async () => {
  const { weaponRowClaimer } = await import('./rosterModifiers.js')
  expect(weaponRowClaimer(undefined, gear.items)).toBeNull()
  for (const alleg of [undefined, {}, { o: [{ n: 'No weapon' }] }]) {
    expect(weaponRowClaimer({ ...def, alleg }, gear.items)('Harvester cannon')).toBeTruthy()
  }
})
