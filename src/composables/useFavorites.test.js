import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFavorites, GLOBAL_SCOPE } from './useFavorites.js'

const { favorites, isFactionPinned, toggleFaction, pinnedFactionsFrom, favoriteUnitIds, isUnitFavorite, toggleUnitFavorite } = useFavorites()

beforeEach(() => {
  for (const k of Object.keys(favorites)) delete favorites[k]
  localStorage.clear()
})

const groups = [
  { factions: [{ slug: 'orks', name: 'Orks' }, { slug: 'necrons', name: 'Necrons' }] },
  { factions: [{ slug: 'aeldari', name: 'Aeldari' }] },
]

describe('pinned factions', () => {
  it('pins and unpins', () => {
    expect(isFactionPinned('orks')).toBe(false)
    toggleFaction('orks')
    expect(isFactionPinned('orks')).toBe(true)
    toggleFaction('orks')
    expect(isFactionPinned('orks')).toBe(false)
  })

  // Order is the timestamp, not a stored position — one less thing for two devices to disagree
  // about, and it reads the way the "Pinned" group wants it.
  it('lists the newest pin first and drops a faction that no longer exists', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    toggleFaction('orks')
    vi.setSystemTime(2000)
    toggleFaction('aeldari')
    vi.setSystemTime(3000)
    toggleFaction('gone-faction')
    expect(pinnedFactionsFrom(groups).map((f) => f.slug)).toEqual(['aeldari', 'orks'])
    vi.useRealTimers()
  })

  it('keeps pins out of the per-faction favourites', () => {
    toggleFaction('orks')
    toggleUnitFavorite('orks', 'boyz')
    expect(Object.keys(favorites[GLOBAL_SCOPE])).toEqual(['orks'])
    expect(favoriteUnitIds('orks')).toEqual(['boyz'])
  })
})

describe('favourite datasheets', () => {
  it('stars and unstars, per faction', () => {
    toggleUnitFavorite('orks', 'boyz')
    expect(isUnitFavorite('orks', 'boyz')).toBe(true)
    expect(isUnitFavorite('necrons', 'boyz')).toBe(false)
    toggleUnitFavorite('orks', 'boyz')
    expect(isUnitFavorite('orks', 'boyz')).toBe(false)
    expect(favoriteUnitIds('orks')).toEqual([])
  })

  it('ignores a call without a faction or an id', () => {
    toggleUnitFavorite('', 'boyz')
    toggleUnitFavorite('orks', '')
    toggleFaction('')
    expect(favorites).toEqual({})
  })
})

describe('reading an older store back', () => {
  it('carries pre-timestamp pins and stars over, stamped as "already there"', async () => {
    vi.resetModules()
    localStorage.setItem('wh11ed-favorites', JSON.stringify({
      factions: ['aeldari', 'orks'],
      units: { orks: ['boyz', 'nobz'], necrons: 'junk' },
    }))
    const fresh = (await import('./useFavorites.js')).useFavorites()
    expect(fresh.isFactionPinned('aeldari')).toBe(true)
    expect(fresh.isFactionPinned('orks')).toBe(true)
    expect(fresh.favoriteUnitIds('orks').sort()).toEqual(['boyz', 'nobz'])
    expect(fresh.favorites.necrons).toBeUndefined()
    expect(fresh.favorites['@factions'].orks).toEqual({ at: 0 })
  })

  it('survives a corrupt store', async () => {
    vi.resetModules()
    localStorage.setItem('wh11ed-favorites', '{not json')
    const broken = (await import('./useFavorites.js')).useFavorites()
    expect(broken.favorites).toEqual({})
  })
})
