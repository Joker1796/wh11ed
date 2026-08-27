import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RosterPrintSheet from './RosterPrintSheet.vue'
import { ui } from '../../i18n/ui.js'
import { presetSettings, PRINT_OPTIONS, printOptionOn } from '../../data/rosterPrintOptions.js'
import { loadRosterFaction } from '../../data/roster/index.js'
import { loadRosterFactionRules, normName } from '../../composables/rosterFactionRules.js'

vi.mock('vue-router', () => ({
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

// Real Necron data: a detachment with a rule, stratagems and enhancements, and one unit in it.
const ROSTER = {
  id: 'r1',
  name: 'Cursed list',
  faction: 'necrons',
  detachments: ['Cursed Legion'],
  battleSize: 'strike-force',
  units: [{ uid: 'u1', id: 'necron-warriors', size: 0 }],
}

let factionData
let detachments
let rulesFaction

beforeEach(async () => {
  factionData = await loadRosterFaction('necrons', { allies: false })
  const loaded = await loadRosterFactionRules('necrons', 'en')
  rulesFaction = loaded.faction
  detachments = ROSTER.detachments.map((n) => loaded.lookup.get(normName(n))).filter(Boolean)
})

// The view resolves every row through the table's parent rule before handing it over; the sheet
// is given plain booleans, so the spec does the same thing rather than inventing its own shape.
function resolve(overrides = {}, preset = 'compact') {
  const settings = { ...presetSettings(preset), ...overrides }
  const out = {}
  for (const o of PRINT_OPTIONS) out[o.id] = printOptionOn(settings, o.id)
  return out
}

const sheet = (opts) => mount(RosterPrintSheet, {
  props: { roster: ROSTER, factionData, rulesFaction, detachments, opts },
  // The cards resolve a datasheet apiece and are tested on their own.
  global: { stubs: { RosterPrintUnitCard: { name: 'RosterPrintUnitCard', template: '<div class="card" />' } } },
})

describe('the header and the list', () => {
  it('names the list, the faction, the detachment and what it cost', () => {
    const w = sheet(resolve())
    const head = w.find('.rps-head').text()
    expect(head).toContain('Cursed list')
    expect(head).toContain('Necrons')
    expect(head).toContain('Cursed Legion')
    expect(head).toContain('2000')
  })

  // Which MFM we priced against is the answer to the argument a printed list actually gets into.
  it('stamps the data version and the date it was printed', () => {
    expect(sheet(resolve()).find('.rps-head').text()).toContain(ui.en.printDataVersion)
  })

  // The list is the ARMY, not reference — so it is the one section a cheat sheet may not want,
  // and the header (whose list, which detachment, how many points) stays either way.
  it('can be left out, and the header stays', () => {
    const w = sheet(resolve({ rosterList: false }))
    expect(w.find('.rps-list').exists()).toBe(false)
    expect(w.find('.rps-head').text()).toContain('Cursed list')
  })

  // With the cards printed, every loadout is on a card a few pages later.
  it('drops the wargear column when the cards carry the loadout', () => {
    expect(sheet(resolve()).find('.c-gear').exists()).toBe(true)
    expect(sheet(resolve({}, 'full')).find('.c-gear').exists()).toBe(false)
  })

  it('prints a row per unit, with its price', () => {
    const rows = sheet(resolve()).findAll('.rps-list .rps-row')
    expect(rows).toHaveLength(1)
    expect(rows[0].text()).toContain('Necron Warriors')
    expect(rows[0].find('.c-pts').exists()).toBe(true)
  })

  it('drops every price when prices are off', () => {
    const w = sheet(resolve({ points: false }))
    expect(w.find('.c-pts').exists()).toBe(false)
    expect(w.find('.rps-head').text()).not.toContain('2000')
  })
})

describe('the reference sections', () => {
  it('prints the army rule and the detachment rule', () => {
    const text = sheet(resolve()).text()
    expect(text).toContain(ui.en.factionArmyRule)
    expect(text).toContain('Cursed Legion')
  })

  it('leaves out what was not asked for', () => {
    const w = sheet(resolve({ armyRule: false, detachmentRules: false, stratagems: false }))
    expect(w.text()).not.toContain(ui.en.factionArmyRule)
    expect(w.find('.rps-strats').exists()).toBe(false)
  })

  // The compact sheet's biggest saving: the name, its cost and its window, and nothing else.
  it('prints a stratagem as name, cost and window until its text is asked for', () => {
    const compact = sheet(resolve())
    expect(compact.findAll('.rps-strat').length).toBeGreaterThan(0)
    expect(compact.find('.rps-strat .rps-cp').exists()).toBe(true)
    expect(compact.find('.rps-strat-when').exists()).toBe(true)
    expect(compact.find('.rps-strat-text').exists()).toBe(false)
    expect(sheet(resolve({}, 'full')).find('.rps-strat-text').exists()).toBe(true)
  })

  // Every stratagem has to be on the paper: one whose timing names no phase is not one to lose.
  it('prints as many stratagem lines as the detachment has', async () => {
    const w = sheet(resolve())
    await flushPromises()
    const printed = new Set(w.findAll('.rps-strats .rps-strat .c-strat').map((n) => n.text().trim()))
    const expected = new Set((detachments[0].stratagems || []).map((st) => st.name))
    expect(printed).toEqual(expected)
  })
})

describe('the cards', () => {
  it('are absent in the compact sheet and one per unit in the full one', () => {
    expect(sheet(resolve()).findAll('.card')).toHaveLength(0)
    expect(sheet(resolve({}, 'full')).findAll('.card')).toHaveLength(1)
  })

})
