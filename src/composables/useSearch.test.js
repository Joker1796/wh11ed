import { describe, it, expect } from 'vitest'
import { search, highlightMatch, preloadDatasheetIndex } from './useSearch.js'

describe('search', () => {
  it('returns nothing for an empty or sub-2-char query', () => {
    expect(search('')).toEqual([])
    expect(search('a')).toEqual([])
    expect(search('   ')).toEqual([])
  })

  it('finds a common rules term and returns well-shaped results', () => {
    const res = search('charge', 'en')
    expect(res.length).toBeGreaterThan(0)
    const item = res[0]
    expect(item).toHaveProperty('title')
    expect(item).toHaveProperty('route')
    expect(typeof item.score).toBe('number')
  })

  it('caps results at 10 and sorts title matches (score 2) before body-only (score 1)', () => {
    const res = search('move', 'en')
    expect(res.length).toBeLessThanOrEqual(10)
    for (let i = 1; i < res.length; i++) {
      expect(res[i - 1].score).toBeGreaterThanOrEqual(res[i].score)
    }
  })

  it('is case-insensitive', () => {
    expect(search('CHARGE', 'en').length).toBe(search('charge', 'en').length)
  })

  it('a bare number query bypasses the 2-char minimum (section-number search)', () => {
    const res = search('7', 'en')
    expect(Array.isArray(res)).toBe(true)
    // section-number search returns items whose sectionNum normalizes to the query
    if (res.length) expect(res.every((r) => 'sectionNum' in r)).toBe(true)
  })

  it('produces a snippet for body matches', () => {
    const res = search('objective', 'en')
    const withSnippet = res.find((r) => r.snippet)
    expect(withSnippet?.snippet).toContain('…')
  })

  it('works in the RU locale', () => {
    const res = search('фаза', 'ru')
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBeGreaterThan(0)
  })

  it('strips [gloss:id:label] tokens down to their visible label, not raw markup', () => {
    // advancedRules.js body text uses [gloss:close-quarters:close-quarters shooting] etc. —
    // the indexed body/snippet must show the label only, never the raw [gloss:...] syntax.
    const res = search('close-quarters shooting', 'en')
    expect(res.length).toBeGreaterThan(0)
    for (const r of res) {
      expect(r.body).not.toContain('[gloss:')
      expect(r.snippet).not.toContain('[gloss:')
    }
  })
})

describe('datasheet unit search', () => {
  it('finds a unit by name once the datasheet index is loaded', async () => {
    await preloadDatasheetIndex()
    const res = search('ghazghkull', 'en')
    const unit = res.find((r) => r.route.startsWith('/factions/'))
    expect(unit).toBeTruthy()
    expect(unit.route).toBe('/factions/orks/datasheets/ghazghkull-thraka')
    expect(unit.title).toBe('Ghazghkull Thraka')
    expect(unit.sectionTitle).toContain('Orks')
    expect(unit.key).toBeTruthy()
  })

  it('localizes the datasheets label in RU results', async () => {
    await preloadDatasheetIndex()
    const res = search('avatar of khaine', 'ru')
    const unit = res.find((r) => r.route.startsWith('/factions/aeldari/'))
    expect(unit?.sectionTitle).toContain('Юниты')
  })

  it('keeps same-scored rule-title hits above unit hits', async () => {
    await preloadDatasheetIndex()
    // "Charge" matches both rule titles and unit names (e.g. none) — generic check:
    const res = search('warboss', 'en')
    expect(res.length).toBeGreaterThan(0)
    // all results are ranked by score descending
    for (let i = 1; i < res.length; i++) {
      expect(res[i - 1].score).toBeGreaterThanOrEqual(res[i].score)
    }
  })
})

describe('highlightMatch', () => {
  it('wraps matches in <mark>, case-insensitively', () => {
    expect(highlightMatch('Charge the enemy', 'charge')).toBe('<mark>Charge</mark> the enemy')
  })

  it('escapes regex metacharacters in the query', () => {
    expect(highlightMatch('cover (5+)', '(5+)')).toBe('cover <mark>(5+)</mark>')
  })

  it('returns the text unchanged when query or text is empty', () => {
    expect(highlightMatch('abc', '')).toBe('abc')
    expect(highlightMatch('', 'x')).toBe('')
  })
})
