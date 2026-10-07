import { describe, it, expect, beforeEach, vi } from 'vitest'

// The module is a singleton read once on import — each case imports a fresh copy.
async function fresh() {
  vi.resetModules()
  return (await import('./useRosterPrefs.js')).useRosterPrefs()
}

describe('useRosterPrefs', () => {
  beforeEach(() => localStorage.clear())

  it('shows points left by default', async () => {
    expect((await fresh()).showPointsLeft.value).toBe(true)
  })

  it('keeps a player’s own "off"', async () => {
    localStorage.setItem('wh11ed-roster-points-left', '0')
    expect((await fresh()).showPointsLeft.value).toBe(false)
  })

  // One switch for the catalogue and the "Can be led by" list, under the key the catalogue
  // always used — a choice made before it moved here is kept.
  it('shows Legends by default and keeps a stored "hide"', async () => {
    expect((await fresh()).hideLegends.value).toBe(false)
    localStorage.setItem('wh11ed-roster-filter-legends', '1')
    expect((await fresh()).hideLegends.value).toBe(true)
  })
})
