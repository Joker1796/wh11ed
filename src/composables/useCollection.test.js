import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCollection } from './useCollection.js'

const { collection, isOwned, toggleOwned } = useCollection()

// Module singleton: one instance for the whole file, so each test starts by emptying it.
beforeEach(() => {
  for (const k of Object.keys(collection)) delete collection[k]
  localStorage.clear()
})

describe('useCollection', () => {
  it('marks and unmarks one datasheet', () => {
    expect(isOwned('necrons', 'warriors')).toBe(false)
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    expect(isOwned('necrons', 'warriors')).toBe(true)
    toggleOwned('necrons', 'warriors')
    expect(isOwned('necrons', 'warriors')).toBe(false)
  })

  // Allied datasheets are browsed inside another army's catalogue, so the faction slug is what
  // keeps two factions' identical ids apart.
  it('keys the mark by faction, not by id alone', () => {
    toggleOwned('necrons', 'captain', 'Captain')
    expect(isOwned('space-marines', 'captain')).toBe(false)
    expect(isOwned('necrons', 'captain')).toBe(true)
  })

  it('records the datasheet name and when the mark was made', () => {
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    const cell = collection.necrons.warriors
    expect(cell.n).toBe(1)
    expect(cell.name).toBe('Necron Warriors')
    expect(cell.at).toBeGreaterThan(0)
  })

  // The mark is not deleted but tombstoned: a key that merely vanished would be brought back by
  // the next device that still held it.
  it('leaves a tombstone behind when unmarked, not an empty space', () => {
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    toggleOwned('necrons', 'warriors')
    expect(collection.necrons.warriors).toEqual({ at: expect.any(Number), del: 1 })
    expect(isOwned('necrons', 'warriors')).toBe(false)
  })

  it('ignores a call without a faction or an id', () => {
    toggleOwned('', 'warriors', 'x')
    toggleOwned('necrons', '', 'x')
    expect(collection).toEqual({})
  })

  it('persists every change under the current format version', () => {
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    const saved = JSON.parse(localStorage.getItem('wh11ed-collection'))
    expect(saved.v).toBe(2)
    expect(saved.scopes.necrons.warriors).toMatchObject({ n: 1, name: 'Necron Warriors' })
  })

  it('reads a saved collection back, and survives a corrupt or ill-shaped one', async () => {
    vi.resetModules()
    localStorage.setItem('wh11ed-collection', JSON.stringify({
      v: 2,
      scopes: {
        necrons: { warriors: { n: 3, name: 'Necron Warriors', at: 5 }, junk: 'not a record' },
        tau: [],
      },
    }))
    const fresh = (await import('./useCollection.js')).useCollection()
    expect(fresh.isOwned('necrons', 'warriors')).toBe(true)
    expect(fresh.collection.necrons.warriors.n).toBe(3)
    expect(fresh.isOwned('necrons', 'junk')).toBe(false)
    expect(fresh.collection.tau).toBeUndefined()

    vi.resetModules()
    localStorage.setItem('wh11ed-collection', '{not json')
    const broken = (await import('./useCollection.js')).useCollection()
    expect(broken.collection).toEqual({})
  })

  // A shelf marked before the app kept timestamps. It must survive the upgrade, and it must lose
  // to any deliberate act afterwards — hence `at: 0`.
  it('carries a pre-timestamp collection over, stamped as "already there"', async () => {
    vi.resetModules()
    localStorage.setItem('wh11ed-collection', JSON.stringify({
      necrons: { warriors: { n: 2, name: 'Necron Warriors' } },
      tau: 'junk',
    }))
    const fresh = (await import('./useCollection.js')).useCollection()
    expect(fresh.isOwned('necrons', 'warriors')).toBe(true)
    expect(fresh.collection.necrons.warriors).toEqual({ n: 2, name: 'Necron Warriors', at: 0 })
    expect(fresh.collection.tau).toBeUndefined()
  })
})
