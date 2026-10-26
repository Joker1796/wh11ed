// "Two of one melee weapon on one model": legal, and by 04.01 worth nothing unless the unit's own
// rule rewards the pair (owner, 2026-10-11). End to end on the shipped data.
import { describe, it, expect } from 'vitest'
import { loadRosterFaction, rosterItems } from '../data/roster/index.js'
import { loadRosterModifiersFor } from '../data/rosterModifiers/index.js'
import { loadDatasheets } from '../data/datasheets/index.js'
import { idleMeleeCopies, overlaySheet } from '../core/rules/rosterModifiers.js'
import { validateRoster, issueText } from '../core/roster/rosterValidation.js'
import rosterCore from '../data/roster/core.js'
import { ui } from '../i18n/ui.js'

const items = rosterItems.items

async function idle(slug, unitId, wg) {
  const def = (await loadRosterFaction(slug)).units.find((u) => u.id === unitId)
  const sheet = (await loadDatasheets(slug)).find((d) => d.id === unitId)
  const records = (await loadRosterModifiersFor(slug)).entries
  const entry = { uid: 'u', id: unitId, size: 0, wg }
  return { def, sheet, entry, names: idleMeleeCopies(def, entry, items, sheet, records) }
}

describe('a second copy of a melee weapon', () => {
  it('is marked on the card and warned about when nothing rewards it — a Decimator\'s two claws', async () => {
    const { def, sheet, entry, names } = await idle('chaos-space-marines', 'decimator', [[0, 3, 9]])
    const melee = overlaySheet(sheet, { def, entry, items }).sheet.melee
    expect(melee.filter((w) => w.name === 'Decimator claw').map((w) => w.copy || 1)).toEqual([1, 2])
    expect(names).toEqual(['Decimator claw'])
  })

  // A Talos's two macro-scalpels (its printed loadout); the Telemon's caestus pair was the example
  // until Codex: Adeptus Custodes (data 981) took that rule away.
  it('is marked but not warned about when the unit\'s rule rewards the pair — a Talos\'s macro-scalpels', async () => {
    const { def, sheet, entry, names } = await idle('drukhari', 'talos', [])
    expect(overlaySheet(sheet, { def, entry, items }).sheet.melee.some((w) => w.copy)).toBe(true)
    expect(names).toEqual([])
  })

  it('reaches the list\'s warnings, named, in both languages', async () => {
    const faction = await loadRosterFaction('chaos-space-marines')
    const roster = { faction: 'chaos-space-marines', units: [{ uid: 'a', id: 'decimator', size: 0, wg: [[0, 3, 9]] }] }
    const { issues } = validateRoster(roster, { faction, core: rosterCore, items, idleCopies: () => ['Decimator claw'] })
    const iss = issues.find((i) => i.code === 'meleeCopyIdle')
    expect(iss.level).toBe('warn')
    expect(issueText(iss, ui.ru)).toMatch(/^Decimator: два Decimator claw/)
    expect(issueText(iss, ui.en)).toMatch(/^Decimator: two Decimator claw/)
  })
})
