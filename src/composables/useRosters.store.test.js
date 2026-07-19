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
    expect(stored()).toEqual({ v: 1, rosters: [r] })
  })

  it('prepends new rosters (most recent first)', () => {
    const a = store.createRoster('A')
    const b = store.createRoster('B')
    expect(store.rosters.value.map((r) => r.id)).toEqual([b.id, a.id])
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

  it('starts empty when storage is absent or corrupt', async () => {
    localStorage.setItem(KEY, 'not json{')
    vi.resetModules()
    const reloaded = (await import('./useRosters.js')).useRosters()
    expect(reloaded.rosters.value).toEqual([])
  })
})
