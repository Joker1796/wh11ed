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

  it('records the datasheet name, and drops the whole record — and its empty faction — on unmark', () => {
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    expect(collection.necrons.warriors).toEqual({ n: 1, name: 'Necron Warriors' })
    toggleOwned('necrons', 'warriors')
    expect(collection.necrons).toBeUndefined()
  })

  it('ignores a call without a faction or an id', () => {
    toggleOwned('', 'warriors', 'x')
    toggleOwned('necrons', '', 'x')
    expect(collection).toEqual({})
  })

  it('persists every change', () => {
    toggleOwned('necrons', 'warriors', 'Necron Warriors')
    expect(JSON.parse(localStorage.getItem('wh11ed-collection'))).toEqual({
      necrons: { warriors: { n: 1, name: 'Necron Warriors' } },
    })
    toggleOwned('necrons', 'warriors')
    expect(JSON.parse(localStorage.getItem('wh11ed-collection'))).toEqual({})
  })

  it('reads a saved collection back, and survives a corrupt or ill-shaped one', async () => {
    vi.resetModules()
    localStorage.setItem('wh11ed-collection', JSON.stringify({
      necrons: { warriors: { n: 3, name: 'Necron Warriors' }, junk: 'not a record' },
      tau: [],
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
})
