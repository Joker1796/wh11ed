import { describe, expect, it } from 'vitest'
import { migrateRoster } from './useRosters.js'
import { rosterPayload } from './rosterShare.js'
import { DATA_REV } from '../data/rosterIndexMoves.js'

const oldRoster = (faction, id, pick) => ({ id: 'saved', name: 'Saved list', faction, dv: 1, units: [{ uid: 'entry', id, wg: [pick] }] })
describe('saved partial loadouts', () => {
  it.each(['chaos-daemons', 'world-eaters'])('completes the two unambiguous %s Bloodthirster selections', faction => {
    for (const [old, next] of [[1, 0], [2, 1]]) {
      const migrated = migrateRoster(oldRoster(faction, 'bloodthirster', [0, old, 1]), 13)
      expect(migrated.dv).toBe(DATA_REV)
      expect(migrated.units[0].wg).toEqual([[0, next, 1]])
      expect(migrated.units[0].gearRecovery).toBeUndefined()
    }
  })
  it.each([
    ['chaos-daemons', 'bloodthirster', [0, 0, 1], 'axe of khorne×1'],
    ['world-eaters', 'bloodthirster', [0, 0, 1], 'axe of khorne×1'],
    ['aeldari', 'dire-avengers', [0, 0, 1], 'shuriken pistol×1'],
    ['orks', 'kill-tank', [2, 1, 1], 'kannon×1'],
  ])('preserves ambiguous %s %s choices across another read and a shared payload', (faction, id, pick, meaning) => {
    const migrated = migrateRoster(oldRoster(faction, id, pick), 13)
    expect(migrated.units[0].gearRecovery).toEqual([{ pick, meaning }])
    expect(migrated.units[0].gearCheck).toBeTruthy()
    const payload = JSON.parse(JSON.stringify(rosterPayload(migrated)))
    const again = migrateRoster(payload, payload.v)
    expect(again.units[0].gearRecovery).toEqual([{ pick, meaning }])
    expect(again.units[0].wg).toBeUndefined()
  })
})
