import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

let ROSTER_ID = ''
const replace = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get id() { return ROSTER_ID } } }),
  useRouter: () => ({ push: vi.fn(), replace }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let RosterViewView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterViewView } = await import('./RosterViewView.vue'))
})

const stubs = {
  RosterUnitRulesModal: true,
  RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
}

async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

// The stat plates depend on a SEPARATE dynamic import (loadDatasheets, for the full sheet)
// from the one the unit's own name comes from (loadRosterFaction, the compact roster data) —
// under the full suite's parallel workers the two can resolve in either order, so waiting on
// the name text alone is not enough to guarantee the plates rendered too.
async function waitForSelector(w, selector, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.find(selector).exists()) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterViewView', () => {
  it('redirects to the list when the roster id is unknown', async () => {
    ROSTER_ID = 'missing'
    mount(RosterViewView, { global: { stubs } })
    await flushPromises()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('shows a setup hint for a roster with no faction yet', async () => {
    const store = useRosters()
    const r = store.createRoster('Blank')
    ROSTER_ID = r.id
    const w = mount(RosterViewView, { global: { stubs } })
    await flushPromises()
    const { ui } = await import('../../i18n/ui.js')
    expect(w.text()).toContain(ui.en.rosterViewNoFaction)
    expect(w.find('.rv-tabs').exists()).toBe(false)
  })

  it('lists units grouped by role, with points, and links Edit to the full editor', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    expect(w.text()).toContain('Intercessor Squad')
    expect(w.text()).toContain('80')   // default 5-model bracket points
    expect(w.text()).toContain('2000') // Strike Force limit
    expect(w.find('.hdr-icon').attributes('href')).toBe(`/roster/${r.id}`)
  })

  it('shows the base statline as plates, same chamfered-box style as DatasheetCard', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await waitForSelector(w, '.rvst')

    const plates = w.findAll('.rvst')
    expect(plates.length).toBe(6) // M/T/SV/W/LD/OC
    const labels = plates.map((p) => p.find('.rvst-label').text())
    expect(labels).toEqual(['M', 'T', 'SV', 'W', 'LD', 'OC'])
  })

  it('opens the unit rules preview modal when a unit row is clicked', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.find('.rvunit').trigger('click')
    const modal = w.find('roster-unit-rules-modal-stub')
    expect(modal.exists()).toBe(true)
    expect(modal.attributes('unitid')).toBe('intercessor-squad')
  })

  it('colours the invulnerable save as its own plate, separate from SV', async () => {
    const store = useRosters()
    const r = store.createRoster('Knights')
    r.faction = 'space-marines'
    // Captain in Terminator Armour has an invulnerable save (4++).
    r.units.push({ uid: 'u1', id: 'captain-in-terminator-armour', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Captain in Terminator Armour')
    await waitForSelector(w, '.rvst-inv')

    const inv = w.find('.rvst-inv')
    expect(inv.exists()).toBe(true)
    expect(inv.find('.rvst-label').text()).toBe('INV')
  })

  it('loads the army rule and selected detachment rule under the Rules tab', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[1].trigger('click') // Rules tab
    await waitFor(w, '1st Company Task Force')
    expect(w.text()).toContain('1st Company Task Force')
  })

  it('lists the selected detachment\'s stratagems under the Stratagems tab', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    await waitFor(w, '1st Company Task Force')
    expect(w.text()).toContain('1st Company Task Force')
    expect(w.find('.strat-grid').exists()).toBe(true)
  })

  it('the Stratagems tab groups by phase behind the same toggle as the standalone page', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = ['1st Company Task Force']
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    await waitFor(w, '1st Company Task Force')

    expect(w.find('.phase-group').exists()).toBe(false) // flat list by default
    await w.find('.strat-toggle').trigger('click')
    expect(w.find('.phase-group').exists()).toBe(true)
    // CollapseTransition always renders its slot (see roster/CLAUDE.md) — assert open state via
    // aria-expanded/the "is-open" class, not the grid's presence in the DOM.
    expect(w.find('.phase-head').attributes('aria-expanded')).toBe('false')

    await w.find('.phase-head').trigger('click')
    expect(w.find('.phase-head').attributes('aria-expanded')).toBe('true')
    expect(w.find('.collapse').classes()).toContain('is-open')
  })

  it('shows a hint under Stratagems when no detachment is picked yet', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterViewView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    await w.findAll('.rv-tab')[2].trigger('click') // Stratagems tab
    const { ui } = await import('../../i18n/ui.js')
    await waitFor(w, ui.en.rosterViewNoDetachment)
    expect(w.text()).toContain(ui.en.rosterViewNoDetachment)
  })
})
