// A page per retired unit of a faction's Legendary Proxies table (owner, 2026-10-21): "Ufthak
// Blackhawk" lives at /factions/orks/datasheets/ufthak-blackhawk beside the real units, and shows
// the sheet it is fielded as (Warboss). Not in the unit list; reached from the table, the "Proxy"
// badge and search. The address is made from the name — `legendaryProxies.test.js` holds every one
// apart from the faction's datasheet ids and from each other.
import { foldName } from './foldName.js'

/** The address of a retired unit's page, from its name. @param {string} name */
export function proxySlug(name) {
  // foldName first, so every apostrophe and dash appdata types reads as the plain one.
  return foldName(name).normalize('NFKD').replace(/\p{M}/gu, '')
    .replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/**
 * Every retired unit of a table, one page each.
 * @param {{ proxies?: Array<{ legacy: string[], use: string, id?: string }> } | null | undefined} legends
 * @returns {Array<{ pid: string, name: string, target: string, use: string }>}
 */
export function proxyPages(legends) {
  return (legends?.proxies || []).flatMap((p) => (p.id ? p.legacy.map((name) => ({ pid: proxySlug(name), name, target: p.id, use: p.use })) : []))
}

/** The page at this address, or null. @param {Parameters<typeof proxyPages>[0]} legends @param {string} pid */
export function proxyPage(legends, pid) {
  return proxyPages(legends).find((p) => p.pid === pid) || null
}
