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

  it('opens the unit rules preview when a unit row is clicked', async () => {
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
})
