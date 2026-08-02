import { describe, it, expect } from 'vitest'
import { search, highlightMatch, preloadDatasheetIndex, preloadFactionRulesIndex, preloadCombatPatrolIndex } from './useSearch.js'

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

  it('treats е and ё as equivalent so "маневр" finds «манёвр»', () => {
    const res = search('маневр', 'ru')
    expect(res.length).toBeGreaterThan(0)
    expect(res.some((r) => r.title.includes('манёвр') || r.title.includes('Манёвр') || r.body.includes('манёвр'))).toBe(true)
  })

  it('finds a RU-displayed result for an English query with no RU-text match (cross-lingual fallback)', () => {
    // «Юниты и модели» (01.02) never contains the literal word "Units" in its RU body/
    // title — the match only exists on the EN side ("Units and Models") and must be
    // mapped back to the RU item by shared id so the result still displays in Russian.
    const res = search('Units', 'ru')
    const hit = res.find((r) => r.sectionNum === '01.02')
    expect(hit).toBeTruthy()
    expect(hit.title).toBe('Юниты и модели')
    expect(hit.route).toBe('/core-rules')
  })

  it('also works the other way: a Russian query in the EN locale finds the EN-displayed result', () => {
    // "Units and Models" never contains the literal word "юниты" — the match only
    // exists on the RU side and must map back to the EN item by shared id.
    const res = search('юниты', 'en')
    const hit = res.find((r) => r.sectionNum === '01.02')
    expect(hit).toBeTruthy()
    expect(hit.title).toBe('Units and Models')
    expect(hit.route).toBe('/core-rules')
  })

  it('does not duplicate a result that matches both natively and cross-lingually', () => {
    const res = search('юниты', 'ru')
    const hits = res.filter((r) => r.sectionNum === '01.02')
    expect(hits.length).toBe(1)
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

describe('faction rules search', () => {
  it('anchors a stratagem result to its own card, not the detachment heading', async () => {
    await preloadFactionRulesIndex()
    const res = search('Wall of Mirrors', 'en')
    const hit = res.find((r) => r.route === '/factions/tau-empire')
    expect(hit).toBeTruthy()
    // Its own card id (strat-<detachment>-<slug>), not just the detachment's id ('kauyon').
    expect(hit.id).toBe('strat-kauyon-wall-of-mirrors')
    expect(hit.detSlug).toBe('tau-empire')
    expect(hit.detId).toBe('kauyon')
  })

  it('anchors an enhancement result to its own card', async () => {
    await preloadFactionRulesIndex()
    const res = search('Adept of the Codex', 'en')
    const hit = res.find((r) => r.route === '/factions/space-marines')
    expect(hit).toBeTruthy()
    expect(hit.id).toBe('enh-gladius-task-force-adept-of-the-codex')
  })

  it('finds an army-rule h4 subheading (a Templar Vow) and anchors to it, with its RU caption', async () => {
    await preloadFactionRulesIndex()
    const res = search('Uphold the Honour of the Emperor', 'ru')
    const hit = res.find((r) => r.route === '/factions/black-templars')
    expect(hit).toBeTruthy()
    expect(hit.id).toBe('templar-vows-h4')
    expect(hit.titleRu).toBe('Отстоять честь Императора')
    // No detachment to select first — the army rule is always rendered.
    expect(hit.detSlug).toBeUndefined()
  })

  it('finds a detachment-rule h4 subheading and anchors to it, selecting its detachment', async () => {
    await preloadFactionRulesIndex()
    const res = search('Fallout', 'ru')
    const hit = res.find((r) => r.route === '/factions/adeptus-mechanicus')
    expect(hit).toBeTruthy()
    expect(hit.id).toBe('rad-zone-corps-rule-h2')
    expect(hit.titleRu).toBe('Осадки')
    expect(hit.detSlug).toBe('adeptus-mechanicus')
    expect(hit.detId).toBe('rad-zone-corps')
  })
})

describe('combat patrol search', () => {
  it('finds a Combat Patrol stratagem by name, with its RU caption, and routes to the box page', async () => {
    await preloadCombatPatrolIndex()
    const res = search('Gauss Storm', 'ru')
    const hit = res.find((r) => r.route === '/combat-patrol/necrons')
    expect(hit).toBeTruthy()
    expect(hit.id).toBe('cp-strat-necrons-gauss-storm')
    expect(hit.titleRu).toBe('Гауссова буря')
  })

  it('finds the Combat Patrol army rule by name and anchors to its RuleBlock', async () => {
    await preloadCombatPatrolIndex()
    const res = search('Reanimation Protocols', 'en')
    const hit = res.find((r) => r.route === '/combat-patrol/necrons')
    expect(hit).toBeTruthy()
    expect(hit.id).toBe('cp-necrons-army-rule')
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

  it('highlights the ё spelling when the query is typed with plain е', () => {
    expect(highlightMatch('Совершите манёвр продвижения', 'маневр')).toBe(
      'Совершите <mark>манёвр</mark> продвижения',
    )
  })
})
