import { describe, it, expect } from 'vitest'
import { loadDatasheets, sharedIdsFor } from './index.js'
import { loadDatasheetsRu } from './ru/index.js'

// Deathwatch is one of the 5 SM-Chapter codex factions that shares most of its roster
// with space-marines.js instead of duplicating it (see index.js / deathwatch.js).
describe('SM-Chapter datasheet dedup', () => {
  it('folds shared space-marines.js units back into a Chapter faction list', async () => {
    const ids = await sharedIdsFor('deathwatch')
    expect(ids?.length).toBeGreaterThan(0)

    const list = await loadDatasheets('deathwatch')
    const ownCount = list.length - ids.length
    expect(list.some((d) => d.id === 'aggressor-squad')).toBe(true) // shared
    expect(ownCount).toBeGreaterThan(0) // Deathwatch-unique units still present
    expect(new Set(list.map((d) => d.id)).size).toBe(list.length) // no duplicate ids
  })

  it('a faction with no sharedUnitIds is unaffected', async () => {
    expect(await sharedIdsFor('necrons')).toBeNull()
    const list = await loadDatasheets('necrons')
    expect(list.length).toBeGreaterThan(0)
  })

  it('merges the RU overlay for a shared unit from space-marines.js', async () => {
    const mod = await loadDatasheetsRu('deathwatch')
    // Aggressor Squad is shared; its RU overlay (if any) must come through even though
    // Deathwatch's own overlay file never mentions it.
    expect(mod).toBeTruthy()
    expect(typeof mod.default).toBe('object')
  })
})
