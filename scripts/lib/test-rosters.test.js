import { describe, it, expect } from 'vitest'
import { TEST_ROSTERS, buildTestRoster } from './test-rosters.mjs'
import core from '../../src/data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../src/data/roster/index.js'
import { validateRoster } from '../../src/core/roster/rosterValidation.js'
import { buildRosterText, EXPORT_FORMATS } from '../../src/core/roster/rosterExport.js'
import { detectFormat, factionCandidates, matchFaction, matchRoster, parseList, pickFaction } from '../../src/core/roster/rosterImport.js'
import { factionGroups } from '../../src/data/factionsIndex.js'
import { rosterPoints } from '../../src/core/roster/rosterEngine.js'

// Each test roster is held to what it is FOR (see test-rosters.mjs): a renamed unit, a retired
// detachment or an option that changed its label fails here, not in front of the owner.
describe('test rosters', () => {
  for (const spec of TEST_ROSTERS) {
    it(`${spec.key}: builds and validates as intended`, async () => {
      const faction = await loadRosterFaction(spec.faction, { allies: true })
      const roster = buildTestRoster(spec, { faction, items: rosterItems.items })
      // An archived list is never judged; hold the same list, un-archived, to its expectation.
      const { issues } = validateRoster({ ...roster, archived: undefined }, { faction, core, items: rosterItems.items })
      const errors = [...new Set(issues.filter((i) => i.level === 'error').map((i) => i.code))].sort()
      if (spec.expect.legal) expect(errors).toEqual([])
      else expect(errors).toEqual([...spec.expect.errors].sort())
    })
  }
})

// RELEASE-CHECKLIST 2.6 [A]: what the export writes, the import reads back as the same list — the
// same datasheets, the same detachments, every weapon placed and the same points. EVERY format the
// export offers (owner, 2026-10-29: a list exported for a Russian tournament did not import; the
// formats here were a list of three, and the three added later were never put in it). What a
// format does not carry is not asked of it: the simple list has no wargear, enhancement, Warlord
// or attachment — its datasheets, detachments and points must still come back.
// A list's unit lines in the chat export, order aside: each line with what its brackets list sorted.
const unitLines = (text) => text.split('\n').filter((l) => l.startsWith('•'))
  .map((l) => l.replace(/\[(.*)\]/, (_, inner) => `[${inner.split(', ').sort().join(', ')}]`)).sort()

describe('test rosters survive export → import', () => {
  for (const format of EXPORT_FORMATS) {
    for (const spec of TEST_ROSTERS.filter((x) => !x.expect.errors)) {
      it(`${spec.key} (${format})`, async () => {
        const faction = await loadRosterFaction(spec.faction, { allies: true })
        const ctx = { faction, core, items: rosterItems.items, factionGroups }
        const roster = buildTestRoster(spec, ctx)
        const text = buildRosterText(roster, ctx, format)
        const parsed = parseList(text, detectFormat(text), factionGroups)
        // The army comes back too, as the import window finds it: by name, or — for a name several
        // factions go by — by the list (2026-10-29: every Chaos Space Marines export asked).
        const among = factionCandidates(parsed.faction)
        const bundles = await Promise.all(among.map(async (slug) => ({ slug, faction: await loadRosterFaction(slug) })))
        expect(matchFaction(parsed.faction, factionGroups) || pickFaction(parsed, bundles, ctx)).toBe(spec.faction)
        const { payload, report } = matchRoster(parsed, ctx)
        expect(report.missing).toEqual([])
        expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
        expect(report.detachments.matched.sort()).toEqual([...roster.detachments].sort())
        expect(payload.units.map((u) => u.id).sort()).toEqual(roster.units.map((u) => u.id).sort())
        const defOf = (id) => faction.units.find((u) => u.id === id)
        const dets = faction.detachments.filter((d) => roster.detachments.includes(d.name))
        if (format === 'simple') {
          // No enhancement in the list, so the points it brings are not asked back.
          const bare = (units) => units.map(({ enh, ...u }) => u)
          expect(rosterPoints(bare(payload.units), defOf, dets)).toBe(rosterPoints(bare(roster.units), defOf, dets))
          return
        }
        expect(rosterPoints(payload.units, defOf, dets)).toBe(rosterPoints(roster.units, defOf, dets))
        // …and the same LIST, not only the same total: every weapon on the profile that carries it,
        // the same attachments, Warlord and enhancements. The chat export prints exactly those, a line
        // per unit — so two lists whose unit lines read alike are alike (2026-10-14, after unit-wide
        // options became one copy per profile: a Sergeant's pick must come back as the Sergeant's).
        // Order is not compared: the import lists units and picks in the order the text gives them.
        expect(unitLines(buildRosterText(payload, ctx, 'compact'))).toEqual(unitLines(buildRosterText(roster, ctx, 'compact')))
        // The points limit, where the format has a field for it: the GW app's states the battle size
        // (not "No limit", which it leaves out, nor a custom number's own limits); a WTC header has
        // only the army's total, so a list comes back at the importer's default.
        if (format === 'gw' && !spec.customLimits && spec.battleSize !== 'none') expect(payload.battleSize).toBe(roster.battleSize)
      })
    }
  }
})
