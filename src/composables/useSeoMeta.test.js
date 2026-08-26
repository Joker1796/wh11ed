import { describe, it, expect, beforeEach } from 'vitest'
import { applyRouteMeta, setDatasheetName } from './useSeoMeta.js'

function descContent() {
  return document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
}

function canonicalHref() {
  return document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
}

function alternateHref(hreflang) {
  return document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)?.getAttribute('href') || ''
}

function ogUrl() {
  return document.querySelector('meta[property="og:url"]')?.getAttribute('content') || ''
}

describe('applyRouteMeta', () => {
  beforeEach(() => {
    document.head
      .querySelectorAll('meta[name="description"], meta[property="og:url"], link[rel="canonical"], link[rel="alternate"]')
      .forEach((el) => el.remove())
    document.title = ''
  })

  // The literals below are what a crawler and a shared link actually show, so they are pinned
  // rather than derived — and they move when the product's positioning does. The landing gets its
  // OWN title; everything unrecognised falls back to the default one.
  it('sets the project landing title + default description on home', () => {
    applyRouteMeta('/', 'en')
    expect(document.title).toBe('Warhammer 40,000 11th Edition — rules, army lists and a live game tracker')
    expect(descContent()).toMatch(/Bilingual/)
  })

  it('appends the brand suffix for a plain page name (EN)', () => {
    applyRouteMeta('/core-rules', 'en')
    expect(document.title).toBe('Core Rules — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/core concepts and datasheets/)
  })

  it('localizes title and description (RU)', () => {
    applyRouteMeta('/core-rules', 'ru')
    expect(document.title).toBe('Основные правила — Warhammer 40,000')
    expect(descContent()).toMatch(/базовые концепции и листы данных/)
  })

  // The seven former Core Rules chapter routes and the six former Event Companion chapter
  // routes only redirect now, so they have no meta entry of their own and fall through to
  // the default.
  it('falls back to the default for the retired per-chapter routes', () => {
    applyRouteMeta('/basic-rules', 'en')
    expect(document.title).toBe('Warhammer 40,000 11th Edition — Rules, Rosters & Game Tracker')
    expect(canonicalHref()).toBe('')

    applyRouteMeta('/event-companion/missions', 'en')
    expect(document.title).toBe('Warhammer 40,000 11th Edition — Rules, Rosters & Game Tracker')
    expect(canonicalHref()).toBe('')
  })

  it('gives the merged Event Companion page its own title + description (EN/RU)', () => {
    applyRouteMeta('/event-companion', 'en')
    expect(document.title).toBe('Event Companion — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/pre-game mission sequence/)

    applyRouteMeta('/event-companion', 'ru')
    expect(document.title).toBe('Event Companion — Warhammer 40,000')
    expect(descContent()).toMatch(/предбоевая последовательность/)
  })

  it('does not double-append a suffix when the title already has an em dash', () => {
    applyRouteMeta('/tracker/game', 'en')
    expect(document.title).toBe('Current Game — Tracker')
    expect((document.title.match(/—/g) || []).length).toBe(1)
  })

  it('falls back to the tracker entry for dynamic /tracker/* routes', () => {
    applyRouteMeta('/tracker/history/abc123', 'en')
    expect(document.title).toBe('Game Tracker — Warhammer 40,000 11th Ed')
  })

  it('falls back to the default for unknown routes', () => {
    applyRouteMeta('/totally-unknown', 'ru')
    expect(document.title).toBe('Warhammer 40,000 11-я редакция — правила, ростеры и трекер партии')
  })

  it('reuses a single <meta name="description"> element across calls', () => {
    applyRouteMeta('/core-rules', 'en')
    applyRouteMeta('/stratagems', 'ru')
    expect(document.querySelectorAll('meta[name="description"]').length).toBe(1)
    expect(descContent()).toMatch(/Базовые стратагемы/)
  })

  it('sets a self-referential canonical + og:url + hreflang pair per route (EN)', () => {
    applyRouteMeta('/core-rules', 'en')
    expect(canonicalHref()).toBe('https://wh-rules.ru/core-rules')
    expect(ogUrl()).toBe('https://wh-rules.ru/core-rules')
    expect(alternateHref('en')).toBe('https://wh-rules.ru/core-rules')
    expect(alternateHref('ru')).toBe('https://wh-rules.ru/ru/core-rules')
    expect(alternateHref('x-default')).toBe('https://wh-rules.ru/core-rules')
  })

  it('canonicalizes the RU variant to itself (/ru/...), not to the EN URL', () => {
    applyRouteMeta('/core-rules', 'ru')
    expect(canonicalHref()).toBe('https://wh-rules.ru/ru/core-rules')
    expect(ogUrl()).toBe('https://wh-rules.ru/ru/core-rules')
  })

  it('uses /ru (not /ru/) for the home RU alternate', () => {
    applyRouteMeta('/', 'en')
    expect(canonicalHref()).toBe('https://wh-rules.ru/')
    expect(alternateHref('ru')).toBe('https://wh-rules.ru/ru')
  })

  it('reuses single canonical/alternate elements across navigations', () => {
    applyRouteMeta('/core-rules', 'en')
    applyRouteMeta('/stratagems', 'en')
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1)
    expect(document.querySelectorAll('link[rel="alternate"]').length).toBe(3)
    expect(canonicalHref()).toBe('https://wh-rules.ru/stratagems')
  })

  it('removes the canonical trio on non-indexable routes', () => {
    applyRouteMeta('/core-rules', 'en')
    applyRouteMeta('/tracker/history/abc123', 'en')
    expect(canonicalHref()).toBe('')
    expect(ogUrl()).toBe('')
    expect(document.querySelectorAll('link[rel="alternate"]').length).toBe(0)
  })

  it('removes the canonical trio on unknown (404) routes', () => {
    applyRouteMeta('/core-rules', 'en')
    applyRouteMeta('/totally-unknown', 'en')
    expect(canonicalHref()).toBe('')
  })

  it('gives a faction rules page its own templated title + indexable canonical', () => {
    applyRouteMeta('/factions/space-marines', 'en')
    expect(document.title).toBe('Space Marines — Army Rules & Detachments — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/army rule, detachments, stratagems/i)
    expect(canonicalHref()).toBe('https://wh-rules.ru/factions/space-marines')
    expect(alternateHref('ru')).toBe('https://wh-rules.ru/ru/factions/space-marines')
  })

  it('titles the datasheets list page per faction', () => {
    applyRouteMeta('/factions/orks/datasheets', 'en')
    expect(document.title).toBe('Orks Datasheets — Warhammer 40,000 11th Ed')
    expect(canonicalHref()).toBe('https://wh-rules.ru/factions/orks/datasheets')
  })

  it('uses a slug-derived unit name until the view supplies the real one, then upgrades it', () => {
    applyRouteMeta('/factions/orks/datasheets/bannernob', 'en')
    expect(document.title).toBe('Bannernob — Orks Datasheet — Warhammer 40,000 11th Ed')
    // a slug that does not prettify cleanly stays wrong until the view registers the real name
    applyRouteMeta('/factions/space-marines/datasheets/cato-sicarius', 'en')
    expect(document.title).toBe('Cato Sicarius — Space Marines Datasheet — Warhammer 40,000 11th Ed')
    setDatasheetName('/factions/space-marines/datasheets/cato-sicarius', 'Cato Sicarius')
    expect(document.title).toBe('Cato Sicarius — Space Marines Datasheet — Warhammer 40,000 11th Ed')
    expect(canonicalHref()).toBe('https://wh-rules.ru/factions/space-marines/datasheets/cato-sicarius')
  })

  it('localizes faction-page phrasing but keeps the English faction/unit name (RU)', () => {
    applyRouteMeta('/factions/space-marines', 'ru')
    expect(document.title).toBe('Space Marines — правила фракции — Warhammer 40,000')
    expect(descContent()).toMatch(/армейское правило/i)
  })
})
