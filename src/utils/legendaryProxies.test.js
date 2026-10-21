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
