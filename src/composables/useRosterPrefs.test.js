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
})
