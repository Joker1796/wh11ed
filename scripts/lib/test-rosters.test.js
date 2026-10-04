import { describe, it, expect } from 'vitest'
import { TEST_ROSTERS, buildTestRoster } from './test-rosters.mjs'
import core from '../../src/data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../src/data/roster/index.js'
import { validateRoster } from '../../src/composables/rosterValidation.js'
import { buildRosterText } from '../../src/composables/rosterExport.js'
import { detectFormat, matchRoster, parseList } from '../../src/composables/rosterImport.js'
import { rosterPoints } from '../../src/composables/rosterEngine.js'

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
// same datasheets, the same detachments, every weapon placed and the same points. The formats an
// importer cannot read back (compact is for a chat, not for a machine) are left out.
describe('test rosters survive export → import', () => {
  for (const format of ['gw', 'wtc']) {
    for (const spec of TEST_ROSTERS.filter((x) => !x.expect.errors)) {
      it(`${spec.key} (${format})`, async () => {
        const faction = await loadRosterFaction(spec.faction, { allies: true })
        const ctx = { faction, core, items: rosterItems.items }
        const roster = buildTestRoster(spec, ctx)
        const text = buildRosterText(roster, ctx, format)
        const { payload, report } = matchRoster(parseList(text, detectFormat(text)), ctx)
        expect(report.missing).toEqual([])
        expect(report.units.flatMap((u) => u.gear.missing)).toEqual([])
        expect(report.detachments.matched.sort()).toEqual([...roster.detachments].sort())
        expect(payload.units.map((u) => u.id).sort()).toEqual(roster.units.map((u) => u.id).sort())
        const defOf = (id) => faction.units.find((u) => u.id === id)
        const dets = faction.detachments.filter((d) => roster.detachments.includes(d.name))
        expect(rosterPoints(payload.units, defOf, dets)).toBe(rosterPoints(roster.units, defOf, dets))
      })
    }
  }
})
