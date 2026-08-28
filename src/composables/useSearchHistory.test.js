import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSearchHistory } from './useSearchHistory.js'

const { history, remember, forget, clearHistory } = useSearchHistory()

beforeEach(() => {
  clearHistory()
  localStorage.clear()
})

describe('useSearchHistory', () => {
  it('keeps the newest query first and never lists one twice', () => {
    remember('chosen')
    remember('objective')
    remember('chosen')
    expect(history.value).toEqual(['chosen', 'objective'])
  })

  // Same search, different shift key — one entry, and the spelling last typed is the one kept.
  it('matches case-insensitively', () => {
    remember('Chosen')
    remember('chosen')
    expect(history.value).toEqual(['chosen'])
  })

  it('trims and ignores blank queries', () => {
    remember('  charge  ')
    remember('   ')
    remember('')
    remember(null)
    expect(history.value).toEqual(['charge'])
  })

  it('caps the list at 7, dropping the oldest', () => {
    for (const q of ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']) remember(q)
    expect(history.value).toHaveLength(7)
    expect(history.value[0]).toBe('a8')
    expect(history.value).not.toContain('a1')
  })

  it('forgets one entry and clears them all', () => {
    remember('charge')
    remember('objective')
    forget('CHARGE')
    expect(history.value).toEqual(['objective'])
    clearHistory()
    expect(history.value).toEqual([])
  })

  it('persists every change', () => {
    remember('charge')
    expect(JSON.parse(localStorage.getItem('wh11ed-search-history'))).toEqual(['charge'])
    forget('charge')
    expect(JSON.parse(localStorage.getItem('wh11ed-search-history'))).toEqual([])
  })

  it('reads the saved list back, and shrugs off a corrupt one', async () => {
    localStorage.setItem('wh11ed-search-history', JSON.stringify(['charge', 42, '', 'objective']))
    vi.resetModules()
    const fresh = (await import('./useSearchHistory.js')).useSearchHistory()
    expect(fresh.history.value).toEqual(['charge', 'objective'])

    localStorage.setItem('wh11ed-search-history', '{not json')
    vi.resetModules()
    const broken = (await import('./useSearchHistory.js')).useSearchHistory()
    expect(broken.history.value).toEqual([])
  })
})
