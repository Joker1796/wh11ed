import { describe, it, expect, beforeEach } from 'vitest'
import { applyRouteMeta } from './useSeoMeta.js'

function descContent() {
  return document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
}

describe('applyRouteMeta', () => {
  beforeEach(() => {
    document.head.querySelectorAll('meta[name="description"]').forEach((el) => el.remove())
    document.title = ''
  })

  it('sets the full site title + default description on home', () => {
    applyRouteMeta('/', 'en')
    expect(document.title).toBe('Warhammer 40,000 — Core Rules 11th Edition')
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
})
