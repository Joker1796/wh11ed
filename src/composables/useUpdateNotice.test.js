import { beforeEach, describe, it, expect, vi } from 'vitest'
import { latestEntry } from '../data/changelog.js'

const KEY = 'wh11ed-last-seen-version'

// The composable seeds/reads storage at module-init, so re-import it fresh per case.
async function fresh() {
  vi.resetModules()
  return (await import('./useUpdateNotice.js')).useUpdateNotice()
}

describe('useUpdateNotice', () => {
  beforeEach(() => localStorage.clear())

  it('seeds a first-ever visitor silently — no banner', async () => {
    const n = await fresh()
    expect(n.visible.value).toBe(false)
    expect(localStorage.getItem(KEY)).toBe(latestEntry.version)
  })

  it('shows the banner to a returning visitor (other wh11ed-* state, no last-seen yet)', async () => {
    // e.g. a device that used the tracker before this mechanism ever shipped.
    localStorage.setItem('wh11ed-tracker-history', '[]')
    const n = await fresh()
    expect(n.visible.value).toBe(true)
    expect(localStorage.getItem(KEY)).toBe(null) // not seeded — stays until markSeen
  })

  it('shows the banner (for the latest entry) when the stored version is older', async () => {
    localStorage.setItem(KEY, '0.0.0')
    const n = await fresh()
    expect(n.visible.value).toBe(true)
    expect(n.entry.version).toBe(latestEntry.version)
  })

  it('markSeen clears the banner and stores the latest version', async () => {
    localStorage.setItem(KEY, '0.0.0')
    const n = await fresh()
    n.markSeen()
    expect(n.visible.value).toBe(false)
    expect(localStorage.getItem(KEY)).toBe(latestEntry.version)
  })

  it('stays silent when the stored version already matches the latest', async () => {
    localStorage.setItem(KEY, latestEntry.version)
    const n = await fresh()
    expect(n.visible.value).toBe(false)
  })
})
