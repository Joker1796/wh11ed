import { beforeEach, describe, it, expect, vi } from 'vitest'

// The store is a module singleton (shared ref + localStorage). Reset the module and storage
// before each test so cases stay isolated (same approach as useTracker.store.test.js).
let mod, store

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useRosters.js')
  store = mod.useRosters()
})

const KEY = 'wh11ed-rosters'
const stored = () => JSON.parse(localStorage.getItem(KEY))

describe('createRoster', () => {
  it('creates a roster with defaults and persists it immediately', () => {
    const r = store.createRoster('My list')
    expect(r.id).toBeTruthy()
    expect(r.name).toBe('My list')
    expect(r.battleSize).toBe('strike-force')
    expect(r.units).toEqual([])
    expect(store.rosters.value).toHaveLength(1)
    // saveNow() wrote synchronously in the current schema envelope
    expect(stored()).toEqual({ v: mod.SCHEMA_VERSION, rosters: [r] })
  })

  it('prepends new rosters (most recent first)', () => {
    const a = store.createRoster('A')
    const b = store.createRoster('B')
    expect(store.rosters.value.map((r) => r.id)).toEqual([b.id, a.id])
  })
})

describe('importRoster', () => {
  it('saves a share payload as a new roster of its own', () => {
    const r = store.importRoster({ v: 4, name: 'Shared', faction: 'orks', units: [{ uid: 'a', id: 'boyz', size: 1, wg: [[0, 1, 1]] }] })
    expect(r.id).toBeTruthy()
    expect(r.units[0]).toMatchObject({ id: 'boyz', size: 1, wg: [[0, 1, 1]] })
    expect(stored().rosters).toHaveLength(1)
    expect(r.v).toBeUndefined() // the version travelled with the payload, not into the roster
  })

  // A link is as long-lived as a bookmark and carries indices into generated data that later
  // regenerations renumber. Importing used to skip the migration the stored envelope goes through,
  // so an old payload was saved with picks pointing at whatever now sits at that index.
  it('migrates a payload from an older schema instead of trusting its indices', () => {
    const old = { v: 2, name: 'Old link', faction: 'orks', units: [{ uid: 'a', id: 'boyz', size: 3, count: 20, wg: [[0, 1, 1]] }] }
    const r = store.importRoster(old)
    expect(r.units[0].wg).toBeUndefined()
    expect(r.units[0].size).toBeUndefined()
    expect(r.units[0].count).toBeUndefined()
    expect(r.units[0].id).toBe('boyz') // everything else survives
  })

  it('treats a payload with no version at all as the oldest one', () => {
    const r = store.importRoster({ name: 'Ancient', faction: 'orks', units: [{ uid: 'a', id: 'boyz', size: 2, wg: [[0, 0, 1]] }] })
    expect(r.units[0].wg).toBeUndefined()
    expect(r.units[0].size).toBeUndefined()
  })

  it('refuses anything that is not roster-shaped', () => {
    expect(store.importRoster(null)).toBeNull()
    expect(store.importRoster({ name: 'no units' })).toBeNull()
  })
})

describe('duplicateRoster', () => {
  it('deep-clones with a new id, a copy suffix, and places it after the source', () => {
    const a = store.createRoster('A')
    a.units.push({ uid: 'u1' })
    const copy = store.duplicateRoster(a.id)
    expect(copy.id).not.toBe(a.id)
    expect(copy.name).toBe('A (copy)')
    expect(copy.units).toEqual(a.units)
    expect(copy.units).not.toBe(a.units) // deep clone, not shared reference
    expect(store.rosters.value.map((r) => r.id)).toEqual([a.id, copy.id])
  })

  it('returns null for an unknown id', () => {
    expect(store.duplicateRoster('nope')).toBeNull()
  })
})

describe('deleteRoster / renameRoster / updateRoster', () => {
  it('removes a roster', () => {
    const a = store.createRoster('A')
    store.createRoster('B')
    store.deleteRoster(a.id)
    expect(store.rosters.value.map((r) => r.name)).toEqual(['B'])
  })

  it('renames and bumps updatedAt', () => {
    const a = store.createRoster('A')
    const before = a.updatedAt
    a.updatedAt = before - 1000 // pretend it was saved earlier
    store.renameRoster(a.id, 'Renamed')
    expect(store.rosterById(a.id).name).toBe('Renamed')
    expect(store.rosterById(a.id).updatedAt).toBeGreaterThan(before - 1000)
  })

  it('patches fields via updateRoster', () => {
    const a = store.createRoster('A')
    store.updateRoster(a.id, { faction: 'space-marines', battleSize: 'incursion' })
    expect(store.rosterById(a.id).faction).toBe('space-marines')
    expect(store.rosterById(a.id).battleSize).toBe('incursion')
  })
})

describe('importRoster', () => {
  it('imports as a new roster with a fresh id', () => {
    const a = store.createRoster('A')
    const payload = JSON.parse(JSON.stringify(a))
    const imported = store.importRoster(payload, 'Imported')
    expect(imported.id).not.toBe(a.id)
    expect(imported.name).toBe('Imported')
    expect(store.rosters.value).toHaveLength(2)
  })

  it('rejects a malformed object', () => {
    expect(store.importRoster({ nope: true })).toBeNull()
  })
})

describe('persistence + load', () => {
  it('reloads saved rosters and drops malformed entries', async () => {
    const good = mod.makeRoster('Good')
    localStorage.setItem(KEY, JSON.stringify({ v: 1, rosters: [good, { junk: 1 }, null] }))
    vi.resetModules()
    const reloaded = (await import('./useRosters.js')).useRosters()
    expect(reloaded.rosters.value).toHaveLength(1)
    expect(reloaded.rosters.value[0].name).toBe('Good')
  })

  it('migrates a legacy single detachment and drops uuid-shaped leftovers', async () => {
    const legacy = { ...mod.makeRoster('Legacy'), detachment: '01c7258d-72a9-4df9-bea2-b4f7bfdaebb8', detachments: undefined }
    const withSid = { ...mod.makeRoster('Sid'), detachments: ['Gladius', 'be00d308-504e-4da9-a254-98f21ce84e18'] }
    localStorage.setItem(KEY, JSON.stringify({ v: 1, rosters: [legacy, withSid] }))
    vi.resetModules()
    const reloaded = (await import('./useRosters.js')).useRosters()
    expect(reloaded.rosters.value[0].detachments).toEqual([]) // sid can't map to a name → dropped
    expect(reloaded.rosters.value[0].detachment).toBeUndefined()
    expect(reloaded.rosters.value[1].detachments).toEqual(['Gladius']) // uuid removed, name kept
  })

  it('starts empty when storage is absent or corrupt', async () => {
    localStorage.setItem(KEY, 'not json{')
    vi.resetModules()
    const reloaded = (await import('./useRosters.js')).useRosters()
    expect(reloaded.rosters.value).toEqual([])
  })
})

describe('schema → v3', () => {
  it('drops wargear picks, whose option indices v2 renumbered, and keeps everything else', async () => {
    // The generator merged the items of a bundled option into ONE option ("1 hexrifle and 1
    // torturer's tool") and folded per-miniature duplicates of a unit-wide group, so both stored
    // indices can now point at a different weapon. Re-picking is the honest outcome; silently
    // re-interpreting the index is not.
    localStorage.setItem('wh11ed-rosters', JSON.stringify({
      v: 1,
      rosters: [{ id: 'r1', name: 'Old', createdAt: 1, updatedAt: 1, units: [{ uid: 'u1', id: 'wracks', size: 0, wg: [[0, 1, 1]], enh: 'Murdermind' }] }],
    }))
    vi.resetModules()
    const { useRosters } = await import('./useRosters.js')
    const [r] = useRosters().rosters.value
    expect(r.units[0].wg).toBeUndefined()
    expect(r.units[0].enh).toBe('Murdermind')
  })
})

describe('schema → v4', () => {
  it('drops the size index the folded brackets renumbered, and keeps everything else', async () => {
    // appdata publishes a bracket twice when the same composition also appears under an ally
    // grouping keyword; the generator folded 42 of those, so a stored bracket index can point at a
    // different size. Falling back to the unit's default bracket is honest; re-reading is not.
    localStorage.setItem('wh11ed-rosters', JSON.stringify({
      v: 3,
      rosters: [{ id: 'r1', name: 'Old', createdAt: 1, updatedAt: 1, units: [{ uid: 'u1', id: 'wracks', size: 2, count: 9, wg: [[0, 1, 1]], enh: 'Murdermind' }] }],
    }))
    vi.resetModules()
    const { useRosters } = await import('./useRosters.js')
    const [r] = useRosters().rosters.value
    expect(r.units[0].size).toBeUndefined()
    expect(r.units[0].count).toBeUndefined()
    expect(r.units[0].wg).toEqual([[0, 1, 1]])
    expect(r.units[0].enh).toBe('Murdermind')
  })
})


describe('schema → v5', () => {
  it('drops the picks of the two units whose options became one bundle, and nobody else’s', async () => {
    // The generator learned to read a pairing whose instruction misspells one of its own items
    // ("1 tarsus buckler" for the Tarsis buckler): the Venatari Custodians' lance swap and the
    // Rogal Dorn's turret swap each went from two options to one. Only those two can hold a stale
    // index, so a blanket wipe of every roster's wargear would cost far more than it fixes.
    localStorage.setItem('wh11ed-rosters', JSON.stringify({
      v: 4,
      rosters: [{
        id: 'r1',
        name: 'Old',
        createdAt: 1,
        updatedAt: 1,
        units: [
          { uid: 'u1', id: 'venatari-custodians', size: 1, count: 6, wg: [[0, 1, 1]] },
          { uid: 'u2', id: 'astra-militarum/rogal-dorn-battle-tank', wg: [[0, 1, 1]] },
          { uid: 'u3', id: 'wracks', size: 2, count: 9, wg: [[0, 1, 1]], enh: 'Murdermind' },
        ],
      }],
    }))
    vi.resetModules()
    const { useRosters } = await import('./useRosters.js')
    const [r] = useRosters().rosters.value
    expect(r.units[0].wg).toBeUndefined()
    expect(r.units[0].count).toBe(6) // the size and everything else stay
    expect(r.units[1].wg).toBeUndefined()
    expect(r.units[2].wg).toEqual([[0, 1, 1]])
  })
})
