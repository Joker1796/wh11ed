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

  it('sets the project landing title + default description on home', () => {
    applyRouteMeta('/', 'en')
    expect(document.title).toBe('Warhammer 40,000 11th Edition — Rules, Event Companion & Tracker')
    expect(descContent()).toMatch(/Bilingual/)
  })

  it('gives the Core Rules introduction its own title at /introduction', () => {
    applyRouteMeta('/introduction', 'en')
    expect(document.title).toBe('Introduction — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/Bilingual/)
  })

  it('appends the brand suffix for a plain page name (EN)', () => {
    applyRouteMeta('/basic-rules', 'en')
    expect(document.title).toBe('Basic Rules — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/Core concepts/)
  })

  it('localizes title and description (RU)', () => {
    applyRouteMeta('/basic-rules', 'ru')
    expect(document.title).toBe('Основные правила — Warhammer 40,000')
    expect(descContent()).toMatch(/Базовые концепции/)
  })

  it('does not double-append a suffix when the title already has an em dash', () => {
    applyRouteMeta('/event-companion/missions', 'en')
    expect(document.title).toBe('Missions — Event Companion')
    expect((document.title.match(/—/g) || []).length).toBe(1)
  })

  it('falls back to the tracker entry for dynamic /tracker/* routes', () => {
    applyRouteMeta('/tracker/history/abc123', 'en')
    expect(document.title).toBe('Game Tracker — Warhammer 40,000 11th Ed')
  })

  it('falls back to the default for unknown routes', () => {
    applyRouteMeta('/totally-unknown', 'ru')
    expect(document.title).toBe('Warhammer 40,000 — Основные правила 11-й редакции')
  })

  it('reuses a single <meta name="description"> element across calls', () => {
    applyRouteMeta('/basic-rules', 'en')
    applyRouteMeta('/reference', 'ru')
    expect(document.querySelectorAll('meta[name="description"]').length).toBe(1)
    expect(descContent()).toMatch(/Базовые способности/)
  })

  it('sets a self-referential canonical + og:url + hreflang pair per route (EN)', () => {
    applyRouteMeta('/basic-rules', 'en')
    expect(canonicalHref()).toBe('https://wh11ed.ru/basic-rules')
    expect(ogUrl()).toBe('https://wh11ed.ru/basic-rules')
    expect(alternateHref('en')).toBe('https://wh11ed.ru/basic-rules')
    expect(alternateHref('ru')).toBe('https://wh11ed.ru/basic-rules?lang=ru')
    expect(alternateHref('x-default')).toBe('https://wh11ed.ru/basic-rules')
  })

  it('canonicalizes the RU variant to itself (?lang=ru), not to the EN URL', () => {
    applyRouteMeta('/basic-rules', 'ru')
    expect(canonicalHref()).toBe('https://wh11ed.ru/basic-rules?lang=ru')
    expect(ogUrl()).toBe('https://wh11ed.ru/basic-rules?lang=ru')
  })

  it('uses /?lang=ru (not //?lang=ru) for the home RU alternate', () => {
    applyRouteMeta('/', 'en')
    expect(canonicalHref()).toBe('https://wh11ed.ru/')
    expect(alternateHref('ru')).toBe('https://wh11ed.ru/?lang=ru')
  })

  it('reuses single canonical/alternate elements across navigations', () => {
    applyRouteMeta('/basic-rules', 'en')
    applyRouteMeta('/reference', 'en')
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1)
    expect(document.querySelectorAll('link[rel="alternate"]').length).toBe(3)
    expect(canonicalHref()).toBe('https://wh11ed.ru/reference')
  })

  it('removes the canonical trio on non-indexable routes', () => {
    applyRouteMeta('/basic-rules', 'en')
    applyRouteMeta('/tracker/history/abc123', 'en')
    expect(canonicalHref()).toBe('')
    expect(ogUrl()).toBe('')
    expect(document.querySelectorAll('link[rel="alternate"]').length).toBe(0)
  })

  it('removes the canonical trio on unknown (404) routes', () => {
    applyRouteMeta('/reference', 'en')
    applyRouteMeta('/totally-unknown', 'en')
    expect(canonicalHref()).toBe('')
  })

  it('gives a faction rules page its own templated title + indexable canonical', () => {
    applyRouteMeta('/factions/space-marines', 'en')
    expect(document.title).toBe('Space Marines — Army Rules & Detachments — Warhammer 40,000 11th Ed')
    expect(descContent()).toMatch(/army rule, detachments, stratagems/i)
    expect(canonicalHref()).toBe('https://wh11ed.ru/factions/space-marines')
    expect(alternateHref('ru')).toBe('https://wh11ed.ru/factions/space-marines?lang=ru')
  })

  it('titles the datasheets list page per faction', () => {
    applyRouteMeta('/factions/orks/datasheets', 'en')
    expect(document.title).toBe('Orks Datasheets — Warhammer 40,000 11th Ed')
    expect(canonicalHref()).toBe('https://wh11ed.ru/factions/orks/datasheets')
  })

  it('uses a slug-derived unit name until the view supplies the real one, then upgrades it', () => {
    applyRouteMeta('/factions/orks/datasheets/bannernob', 'en')
    expect(document.title).toBe('Bannernob — Orks Datasheet — Warhammer 40,000 11th Ed')
    // a slug that does not prettify cleanly stays wrong until the view registers the real name
    applyRouteMeta('/factions/space-marines/datasheets/cato-sicarius', 'en')
    expect(document.title).toBe('Cato Sicarius — Space Marines Datasheet — Warhammer 40,000 11th Ed')
    setDatasheetName('/factions/space-marines/datasheets/cato-sicarius', 'Cato Sicarius')
    expect(document.title).toBe('Cato Sicarius — Space Marines Datasheet — Warhammer 40,000 11th Ed')
    expect(canonicalHref()).toBe('https://wh11ed.ru/factions/space-marines/datasheets/cato-sicarius')
  })

  it('localizes faction-page phrasing but keeps the English faction/unit name (RU)', () => {
    applyRouteMeta('/factions/space-marines', 'ru')
    expect(document.title).toBe('Space Marines — правила фракции — Warhammer 40,000')
    expect(descContent()).toMatch(/армейское правило/i)
  })
})
