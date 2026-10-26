import { describe, it, expect, beforeAll } from 'vitest'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { loadRosterModifiersFor, usableEntries } from '../../data/rosterModifiers/index.js'
import { attachmentContext, datasheetEntriesFor, applyStatMods } from './rosterStatMods.js'

// "While this unit contains a Tempestor Prime, ranged weapons equipped by models in this unit have
// [SUSTAINED HITS 1]" — the Command Squad's rule reaches the Scions it leads, but the Tempestor
// Prime stands in the Command Squad, so it is that part's models that prove it, not the Scions'
// (a player's report, 2026-10-26: the Scions' guns never got the tag).
const items = rosterItems.items || rosterItems
let fac, records
beforeAll(async () => {
  fac = await loadRosterFaction('astra-militarum')
  records = usableEntries(await loadRosterModifiersFor('astra-militarum'))
})
const E = (uid, id, extra = {}) => ({ uid, id, size: 0, ...extra })
const ctxFor = (entry, units) => ({
  unitId: entry.id,
  ...attachmentContext(entry, units, { defOf: (u) => fac.units.find((d) => d.id === u.id), sheetOf: () => null, items }),
})

describe('a led rule gated on a model of the part it came from', () => {
  it('Tempestus Command Squad: the Scions it leads get [SUSTAINED HITS 1]', () => {
    const scions = E('s', 'tempestus-scions')
    const units = [scions, E('c', 'militarum-tempestus-command-squad', { leaderOf: 's' })]
    const entries = datasheetEntriesFor(records, ctxFor(scions, units)).filter((e) => e.owner === 'Militarum Tempestus Command Squad')
    expect(entries.map((e) => e.from)).toEqual(['led'])
    const sheet = { name: 'Tempestus Scions', ranged: [{ name: 'Hot-shot lasgun', tags: [] }], melee: [] }
    const keywords = { unit: ['INFANTRY', 'TEMPESTUS SCIONS'], faction: ['ASTRA MILITARUM'] }
    expect(applyStatMods(sheet, entries, keywords, []).sheet.ranged[0].tags).toContain('SUSTAINED HITS 1')
    // The proof is the Command Squad's: without it (the code before the fix) the tag stays off.
    const unproven = entries.map(({ proves, ...e }) => e)
    expect(applyStatMods(sheet, unproven, keywords, []).sheet.ranged[0].tags).not.toContain('SUSTAINED HITS 1')
  })

  it('Quartermaster Cadre Squad: its Medicae Servitors prove Medi-packs for the Krieg it leads', () => {
    const krieg = E('k', 'death-korps-of-krieg')
    const units = [krieg, E('q', 'quartermaster-cadre-squad', { leaderOf: 'k' })]
    const medi = datasheetEntriesFor(records, ctxFor(krieg, units)).find((e) => e.name === 'Medicae Medi-packs')
    expect(medi?.from).toBe('led')
    expect([...(medi?.proves || [])]).toContain('contains-medicae-servitors')
  })

  it('a part proves nothing for a unit it is not attached to', () => {
    const scions = E('s', 'tempestus-scions')
    const ctx = ctxFor(scions, [scions, E('c', 'militarum-tempestus-command-squad')])
    expect(ctx.partGear.size).toBe(0)
    expect(datasheetEntriesFor(records, ctx).some((e) => e.owner === 'Militarum Tempestus Command Squad')).toBe(false)
  })
})

// The unit card and the roster screen read the Attached unit through attachmentContext() since the
// same report: the card had been assembling its own and lost what the Leaders carry, so a Big Mek's
// Kustom Force Field reached the Meganobz row in the list but not the card behind it.
describe('attachmentContext — what the attached Leaders carry', () => {
  it('a Big Mek’s Kustom Force Field reaches the Meganobz it leads', async () => {
    const orks = await loadRosterFaction('orks')
    const orkRecords = usableEntries(await loadRosterModifiersFor('orks'))
    const nobz = E('n', 'meganobz')
    const units = [nobz, E('b', 'big-mek-in-mega-armour', { leaderOf: 'n', wg: [[0, 1, 1]] })]
    const ctx = { unitId: 'meganobz', ...attachmentContext(nobz, units, { defOf: (u) => orks.units.find((d) => d.id === u.id), sheetOf: () => null, items }) }
    expect([...ctx.leaderItemNames]).toContain('kustom force field')
    expect(datasheetEntriesFor(orkRecords, ctx).find((e) => /Kustom Force Field/.test(e.name))?.from).toBe('led')
  })
})
