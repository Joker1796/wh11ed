import { describe, it, expect } from 'vitest'
import { rosterSnapshot, rosterFromPlayer, hasRoster } from './rosterGameLink.js'
import { SCHEMA_VERSION } from './useRosters.js'

const roster = {
  id: 'r1', name: 'My List', faction: 'space-marines', detachments: ['Gladius Task Force'],
  battleSize: 'strike-force', customPoints: 2000,
  summary: { points: 1985, unitCount: 2, issues: 0 },   // recomputed on read, must not travel
  units: [
    { uid: 'a', id: 'captain', size: 0, warlord: true, enh: 'Artificer Armour' },
    { uid: 'b', id: 'intercessor-squad', size: 1, wg: [[0, 1, 1]] },
  ],
}

describe('rosterSnapshot', () => {
  it('stores the roster in its compact form, stamped with the storage schema version', () => {
    const snap = rosterSnapshot(roster)
    expect(snap.v).toBe(SCHEMA_VERSION)
    expect(snap.units).toEqual(roster.units)
    expect(snap.detachments).toEqual(['Gladius Task Force'])
    expect(snap.summary).toBeUndefined()
    expect(snap.id).toBeUndefined() // provenance lives in player.rosterId, not in the snapshot
  })

  it('returns null for anything that is not a roster', () => {
    expect(rosterSnapshot(null)).toBeNull()
    expect(rosterSnapshot({ name: 'no units' })).toBeNull()
  })

  // wh11ed-api rejects a synced game over 64 KB (config.maxGameBytes) and BOTH players' lists share
  // that budget with the game itself, so the snapshot has to stay in the ids-and-indices form.
  it('stays small enough for two lists to fit a synced game', () => {
    const big = {
      ...roster,
      units: Array.from({ length: 60 }, (_, i) => ({
        uid: `00000000-0000-4000-8000-${String(i).padStart(12, '0')}`,
        id: 'intercessor-squad', size: 1, count: 10, wg: [[0, 1, 1], [2, 0, 1]], enh: 'Artificer Armour',
      })),
    }
    const bytes = JSON.stringify(rosterSnapshot(big)).length
    expect(bytes).toBeLessThan(12 * 1024)
  })
})

describe('rosterFromPlayer', () => {
  it('reads the snapshot back as a roster, carrying the provenance id', () => {
    const r = rosterFromPlayer({ rosterId: 'r1', roster: rosterSnapshot(roster) })
    expect(r.id).toBe('r1')
    expect(r.name).toBe('My List')
    expect(r.units).toEqual(roster.units)
    expect(r.v).toBeUndefined()
  })

  // A game is kept for months and restored from the cloud on other devices, so its snapshot can
  // predate the current schema — and wargear/size picks are INDICES into generated data that the
  // generator renumbers. Without the migration an old game would show a different weapon.
  it('migrates a snapshot written under an older schema', () => {
    const old = { v: 2, name: 'Old', faction: 'orks', detachments: [], battleSize: 'strike-force', units: [{ uid: 'a', id: 'boyz', size: 3, wg: [[1, 2, 1]] }] }
    const r = rosterFromPlayer({ rosterId: null, roster: old })
    expect(r.units[0].wg).toBeUndefined()  // v3: renumbered wargear indices are dropped
    expect(r.units[0].size).toBeUndefined() // v4: renumbered size brackets are dropped
    expect(r.units[0].id).toBe('boyz')      // everything else survives
    expect(r.id).toBeNull()
  })

  it('does not mutate the stored snapshot while migrating', () => {
    const player = { rosterId: null, roster: { v: 2, name: 'Old', units: [{ uid: 'a', id: 'boyz', wg: [[1, 2, 1]] }] } }
    rosterFromPlayer(player)
    expect(player.roster.units[0].wg).toEqual([[1, 2, 1]])
  })

  it('returns null when the player has no list attached', () => {
    expect(rosterFromPlayer(null)).toBeNull()
    expect(rosterFromPlayer({})).toBeNull()
    expect(rosterFromPlayer({ roster: { v: 4 } })).toBeNull()
  })
})

describe('hasRoster', () => {
  it('is false for a player who fielded no saved list — the normal case', () => {
    expect(hasRoster({ name: 'Opponent' })).toBe(false)
    expect(hasRoster({ roster: rosterSnapshot(roster) })).toBe(true)
  })
})
