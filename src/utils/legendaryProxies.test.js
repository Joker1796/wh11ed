import { describe, expect, it } from 'vitest'
import factionLegends from '../data/factionLegends.json'
import { loadDatasheets } from '../data/datasheets/index.js'
import { proxyPage, proxyPages, proxySlug } from './legendaryProxies.js'

// A retired unit's page lives beside the faction's units (/factions/<slug>/datasheets/<address>),
// its address made from its name: one that is a unit's id, or another retired unit's, would show
// the wrong page with nothing to say so.
describe('Legendary Proxies pages', () => {
  it('makes an address of the name', () => {
    expect(proxySlug('Ufthak Blackhawk')).toBe('ufthak-blackhawk')
    expect(proxySlug('Ba’ken’s Kustom Battlewagon')).toBe('bakens-kustom-battlewagon')
    expect(proxySlug('Land Raider Terminus Ultra')).toBe('land-raider-terminus-ultra')
  })

  for (const [slug, table] of Object.entries(factionLegends)) {
    it(`${slug}: every retired unit has an address of its own and a sheet to show`, async () => {
      const ids = new Set((await loadDatasheets(slug)).map((d) => d.id))
      const pages = proxyPages(table)
      expect(pages.length).toBe(table.proxies.filter((p) => p.id).reduce((n, p) => n + p.legacy.length, 0))
      const seen = new Set()
      for (const p of pages) {
        expect(ids.has(p.pid), `${p.name} → ${p.pid} is a unit's id`).toBe(false)
        expect(seen.has(p.pid), `${p.name} → ${p.pid} twice`).toBe(false)
        expect(ids.has(p.target), `${p.name} → ${p.target} is no sheet of ${slug}`).toBe(true)
        seen.add(p.pid)
      }
    })
  }

  it('finds a page by its address, and nothing for a unit\'s', () => {
    expect(proxyPage(factionLegends.orks, 'ufthak-blackhawk')).toMatchObject({ name: 'Ufthak Blackhawk', target: 'warboss' })
    expect(proxyPage(factionLegends.orks, 'warboss')).toBeNull()
  })
})

// A Russian reader types the retired unit's name in Russian: every one is findable so (the index's
// legacyRu slot, from src/data/legacyAliasesRu.js and the name-pattern rules), or waits for the
// owner's spelling by name.
describe('Legendary Proxies in Russian search', () => {
  const retired = new Set(Object.values(factionLegends).flatMap((t) => t.proxies.filter((p) => p.id).flatMap((p) => p.legacy)))

  it('every retired name has an RU alias in the index, or is pending', async () => {
    const { datasheetIndex } = await import('../data/datasheetIndex.js')
    const { LEGACY_ALIASES_PENDING } = await import('../data/legacyAliasesRu.js')
    const found = new Set()
    for (const [, , units] of datasheetIndex) for (const u of units) for (const n of Object.keys(u[5] || {})) found.add(n)
    const pending = new Set(LEGACY_ALIASES_PENDING)
    expect([...retired].filter((n) => !found.has(n) && !pending.has(n))).toEqual([])
    expect(LEGACY_ALIASES_PENDING.filter((n) => found.has(n) || !retired.has(n)), 'pending, but found or not retired').toEqual([])
  })

  it('names in legacyAliasesRu.js are retired units', async () => {
    const { legacyAliasesRu } = await import('../data/legacyAliasesRu.js')
    expect(Object.keys(legacyAliasesRu).filter((n) => !retired.has(n))).toEqual([])
  })
})
