import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cacheMigration, calmNow, applyMigration, VISIBLE_MS, STILL_NAV_MS, STILL_SCROLL_MS, _resetCacheMigration } from './cacheMigration.js'

const NOW = 1_000_000
const calm = {
  visibleMs: VISIBLE_MS, now: NOW, navigating: false, lastNav: NOW - STILL_NAV_MS, lastScroll: NOW - STILL_SCROLL_MS,
  warmup: 'idle', workerBusy: false, held: false, update: 'idle', notice: false, dialog: false,
}

describe('moving a tab off its worker', () => {
  beforeEach(() => {
    _resetCacheMigration()
    localStorage.clear()
  })

  it('waits for a calm moment — every one of its conditions', () => {
    expect(calmNow(calm)).toBe(true)
    const restless = {
      'in view under 10 s': { visibleMs: VISIBLE_MS - 1 },
      'a page loading': { navigating: true },
      'a page changed just now': { lastNav: NOW - STILL_NAV_MS + 1 },
      'scrolling': { lastScroll: NOW - STILL_SCROLL_MS + 1 },
      'downloading': { warmup: 'warming' },
      'the worker installing or waiting': { workerBusy: true },
      'reloads held': { held: true },
      'an update plate up': { update: 'ready' },
      '"What\'s new" up': { notice: true },
      'a dialog the app opened': { dialog: true },
    }
    for (const [why, change] of Object.entries(restless)) expect(calmNow({ ...calm, ...change }), why).toBe(false)
  })

  it('Apply: the worker off, then its caches, and the offline download forgotten', async () => {
    cacheMigration.phase = 'shown'
    localStorage.setItem('wh11ed-offline-warmed', '780.abc')
    const order = []
    const reg = { unregister: vi.fn(async () => { order.push('unregister'); return true }) }
    await applyMigration({ registration: async () => reg, drop: async () => { order.push('drop') } })
    expect(order).toEqual(['unregister', 'drop'])
    expect(cacheMigration.phase).toBe('done')
    expect(localStorage.getItem('wh11ed-offline-warmed')).toBe(null)
  })

  it('a worker that would not go: the caches stay, the plate goes, the next visit asks again', async () => {
    cacheMigration.phase = 'shown'
    const drop = vi.fn()
    await applyMigration({ registration: async () => ({ unregister: async () => { throw new Error('no') } }), drop })
    expect(drop).not.toHaveBeenCalled()
    expect(cacheMigration.phase).toBe('idle')
  })

  it('does nothing unless the plate is up', async () => {
    const drop = vi.fn()
    await applyMigration({ registration: async () => null, drop })
    expect(drop).not.toHaveBeenCalled()
  })
})
