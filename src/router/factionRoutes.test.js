import { describe, it, expect } from 'vitest'
import { router } from './index.js'
import { PREFETCH } from './prefetch.js'

// A faction's three pages are children of one route (the hero and its tabs stay mounted across
// them, see FactionPagesView); the unit page is a page of its own, a level deeper. The page swap
// in App.vue keys off the parent record, and router/prefetch.js off `meta.prefetch`.
const at = (path) => router.resolve(path)

describe('faction routes', () => {
  it('nests the three faction pages under one parent, in both locales', () => {
    for (const p of ['/factions/orks', '/factions/orks/datasheets', '/factions/orks/faq', '/ru/factions/orks/faq']) {
      const r = at(p)
      expect(r.matched.length, p).toBe(2)
      expect(r.params.slug).toBe('orks')
      expect(r.meta.section).toBe('faction')
    }
    // the same parent record for all three — that is what keeps the hero mounted
    expect(new Set(['/factions/orks', '/factions/orks/datasheets', '/factions/orks/faq'].map((p) => at(p).matched[0].path)).size).toBe(1)
  })

  it('keeps the unit page a route of its own', () => {
    const r = at('/factions/orks/datasheets/boyz')
    expect(r.matched.length).toBe(1)
    expect(r.params.unit).toBe('boyz')
  })

  it('names a prefetch for every faction page, and every name exists', () => {
    for (const p of ['/factions/orks', '/factions/orks/datasheets', '/factions/orks/faq', '/factions/orks/datasheets/boyz']) {
      const name = at(p).meta.prefetch
      expect(name, p).toBeTruthy()
      expect(typeof PREFETCH[name], name).toBe('function')
    }
  })

  it('still redirects the old detachments path onto the faction page', () => {
    expect(at('/factions/orks/detachments').redirectedFrom || at('/factions/orks/detachments').matched[0].redirect).toBeTruthy()
  })
})
