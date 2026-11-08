import { beforeEach, describe, it, expect, vi } from 'vitest'

// Roster data revisions (rosterIndexMoves.js): a stored list's indices are carried across
// generations of the data by meaning, a list from a newer build is never rewritten, and the one
// generation that moved indices with no migration — data 963 — is repaired once.

const KEY = 'wh11ed-rosters'
const stored = () => JSON.parse(localStorage.getItem(KEY))
const seed = (envelope) => localStorage.setItem(KEY, JSON.stringify(envelope))
const load = async () => {
  vi.resetModules()
  const mod = await import('./useRosters.js')
  return { mod, store: mod.useRosters() }
}

beforeEach(() => {
  localStorage.clear()
  vi.doUnmock('../data/rosterIndexMoves.js')
})

describe('roster data revisions', () => {
  it('applies every generation between the list and this build, then stamps the revision', async () => {
    vi.doMock('../data/rosterIndexMoves.js', () => ({
      DATA_REV: 3,
      default: {
        1: { 'necrons:immortals': { wg: { '0.0': '0.1', '0.1': 0 } } },
        2: { 'necrons:immortals': { wg: { '0.1': '1.0' }, s: { 1: 0 } } },
      },
    }))
    seed({ v: 13, rosters: [
      { id: 'a', name: 'Rev 1', faction: 'necrons', units: [{ uid: 'u', id: 'immortals', size: 1, wg: [[0, 0, 2], [0, 1, 1]] }] },
      { id: 'b', name: 'Rev 2', faction: 'necrons', dv: 2, units: [{ uid: 'u', id: 'immortals', size: 1, wg: [[0, 0, 2], [0, 1, 1]] }] },
    ] })
    const { store } = await load()
    const [a, b] = store.rosters.value
    expect(a.units[0]).toMatchObject({ wg: [[1, 0, 2]], size: 0 })
    expect(b.units[0]).toMatchObject({ wg: [[0, 0, 2], [1, 0, 1]], size: 0 })
    expect([a.dv, b.dv]).toEqual([3, 3])
  })

  it('a new list and a share payload carry the revision', async () => {
    const { mod, store } = await load()
    const r = store.createRoster('New')
    expect(r.dv).toBe(mod.DATA_REV)
    const { rosterPayload } = await import('./rosterShare.js')
    expect(rosterPayload(r)).toMatchObject({ v: mod.SCHEMA_VERSION, dv: mod.DATA_REV })
  })
})

describe('a list from a newer build', () => {
  it('is read untouched and never written back changed', async () => {
    const { mod } = await load()
    const newer = { id: 'n', name: 'From the future', faction: 'necrons', v: mod.SCHEMA_VERSION + 1, dv: mod.DATA_REV,
      units: [{ uid: 'u', id: 'immortals', size: 7, wg: [[9, 9, 1]] }] }
    seed({ v: mod.SCHEMA_VERSION, rosters: [newer] })
    const { mod: m2, store } = await load()
    const r = store.rosters.value[0]
    expect(m2.isFromNewerVersion(r)).toBe(true)
    expect(r.units[0]).toEqual(newer.units[0])
    expect(store.updateRoster('n', { name: 'Edited here' })).toBe(null)
    store.renameRoster('n', 'Renamed here')
    expect(store.setArchived('n', true)).toBe(null)
    // Even a screen writing to the object directly cannot reach storage.
    r.units[0].wg = []
    store.saveNow()
    expect(stored().rosters[0]).toEqual(newer)
  })

  it('a later data revision alone marks it too', async () => {
    const { mod } = await load()
    expect(mod.isFromNewerVersion({ dv: mod.DATA_REV + 1 })).toBe(true)
    expect(mod.isFromNewerVersion({ dv: mod.DATA_REV })).toBe(false)
    expect(mod.isFromNewerVersion({})).toBe(false)
  })
})

describe('data 963 repair', () => {
  // Real data: data 963 swapped the Intercessor Sergeant's two groups. Before it, group 0 option 1
  // was the hand flamer and group 1 option 1 the power fist; after it they are 1.1 and 0.1.
  const before = Date.UTC(2026, 8, 20)
  const after = Date.UTC(2026, 9, 20)
  const list = (extra) => ({ id: 'r', name: 'SM', faction: 'space-marines', ...extra,
    units: [{ uid: 'u', id: 'intercessor-squad', wg: [[0, 1], [1, 1]] }, { uid: 'n', id: 'necron-warriors', wg: [[0, 1]] }] })

  it('reads a list untouched since 963 through its moves', async () => {
    seed({ v: 8, rosters: [list({ createdAt: before, updatedAt: before })] })
    const { store } = await load()
    const [sm] = store.rosters.value[0].units
    expect(sm.wg).toEqual([[1, 1], [0, 1]])
    expect(sm.gearCheck).toBeUndefined()
  })

  it('marks an entry whose pick has no counterpart', async () => {
    seed({ v: 8, rosters: [{ ...list({ createdAt: before, updatedAt: before }), units: [{ uid: 'u', id: 'intercessor-squad', wg: [[1, 0]] }] }] })
    const { store } = await load()
    const [sm] = store.rosters.value[0].units
    expect(sm.wg).toBeUndefined()
    expect(sm.gearCheck).toBe(963)
  })

  it('only marks a list saved since, and leaves later lists and other factions alone', async () => {
    seed({ v: 8, rosters: [
      list({ id: 'saved-since', createdAt: before, updatedAt: after }),
      list({ id: 'newer', createdAt: after, updatedAt: after }),
    ] })
    const { store } = await load()
    const [since, newer] = store.rosters.value
    expect(since.units[0]).toMatchObject({ wg: [[0, 1], [1, 1]], gearCheck: 963 })
    expect(since.units[1].gearCheck).toBeUndefined()
    expect(newer.units[0].gearCheck).toBeUndefined()
    expect(newer.units[0].wg).toEqual([[0, 1], [1, 1]])
  })

  it('marks, never moves, an old list stored in a newer envelope (the whole envelope was restamped on every save)', async () => {
    seed({ v: 13, rosters: [list({ createdAt: before, updatedAt: before })] })
    const { store } = await load()
    const [sm, other] = store.rosters.value[0].units
    expect(sm).toMatchObject({ wg: [[0, 1], [1, 1]], gearCheck: 963 })
    expect(other.gearCheck).toBeUndefined()
  })

  it('a list from after 963 in a newer envelope is left alone', async () => {
    seed({ v: 13, rosters: [list({ createdAt: after, updatedAt: after })] })
    const { store } = await load()
    expect(store.rosters.value[0].units[0].gearCheck).toBeUndefined()
  })

  it('applies once: a list stamped with a revision is not repaired again', async () => {
    seed({ v: 8, rosters: [list({ createdAt: before, updatedAt: before })] })
    const first = await load()
    first.store.saveNow()
    const { store } = await load()
    expect(store.rosters.value[0].units[0].wg).toEqual([[1, 1], [0, 1]])
  })
})
