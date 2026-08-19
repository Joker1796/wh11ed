import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// Mock the router: the editor reads route.params.id and calls router.replace when a roster
// is missing. RouterLink is stubbed to a plain anchor so the template renders.
let ROSTER_ID = ''
let QUERY = {}
const replace = vi.fn()
const push = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get id() { return ROSTER_ID } }, get query() { return QUERY }, path: '/roster/x' }),
  useRouter: () => ({ push, replace }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a><slot /></a>' },
}))

let RosterEditorView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  push.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterEditorView } = await import('./RosterEditorView.vue'))
})

const stubs = {
  FactionPickerModal: true,
  NumberStepper: true,
  RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
}

// The editor loads faction data via a dynamic import kicked off from an immediate watch.
// Poll (with real timers) until the expected content renders — the first import of a large
// data chunk can take more than a microtask flush to transform.
async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterEditorView', () => {
  it('redirects to the list when the roster id is unknown', async () => {
    ROSTER_ID = 'missing'
    const w = mount(RosterEditorView, { global: { stubs } })
    await flushPromises()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('loads faction data and renders a unit with its points', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    expect(w.text()).toContain('Intercessor Squad')
    expect(w.text()).toContain('80')   // default 5-model bracket points
    expect(w.text()).toContain('2000') // Strike Force limit
  })

  it('taxes a duplicate datasheet by copy index in the total', async () => {
    const store = useRosters()
    const r = store.createRoster('Knights')
    r.faction = 'chaos-knights'
    // Chaos Acastus Knight Porphyrion: 725, +75 on the 2nd copy (Phase 0 copy-tax).
    r.units.push({ uid: 'a', id: 'chaos-acastus-knight-porphyrion', size: 0 })
    r.units.push({ uid: 'b', id: 'chaos-acastus-knight-porphyrion', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, '1525')

    // Denormalised summary total = 725 + 800.
    expect(store.rosterById(r.id).summary.points).toBe(1525)
    expect(w.text()).toContain('1525')
  })

  it('uses a custom battle-size points total as the limit', async () => {
    const store = useRosters()
    const r = store.createRoster('Custom')
    r.faction = 'space-marines'
    r.battleSize = 'custom'
    r.customPoints = 500
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    expect(w.text()).toContain('80')  // unit points
    expect(w.text()).toContain('500') // custom limit
  })

  it('surfaces validation errors in the summary and header badge', async () => {
    const store = useRosters()
    const r = store.createRoster('No warlord')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 }) // battleline, no warlord possible
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    // A list with units but no Warlord is illegal → at least one error is denormalised.
    expect(store.rosterById(r.id).summary.issues).toBeGreaterThan(0)
    expect(w.find('.issues-badge.has-err').exists()).toBe(true)
  })

  it('the footer Save button navigates to the read-only view (edits already autosave to the store)', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    expect(w.find('.rc-points').text()).toContain('80')
    await w.find('.rc-sticky .btn-primary').trigger('click')
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}/view`)
  })

  it('the footer Cancel button links back to the roster list', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    expect(w.find('.rc-sticky .btn-ghost').attributes('href')).toBe('/roster')
  })

  it('links to the add-units page instead of embedding the catalogue', async () => {
    // The faction catalogue moved to /roster/:id/add — the Units tab is the roster's own list
    // now, and this link is the only way in.
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    ROSTER_ID = r.id
    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Add units')
    const link = w.findAll('a').find((a) => a.text().includes('Add units'))
    expect(link).toBeTruthy()
    expect(link.attributes('href')).toBe(`/roster/${r.id}/add`)
  })

  it('opens the entry an issue points at when arriving with ?unit=', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id
    QUERY = { unit: 'u1' }
    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    expect(w.find('.redu-row').attributes('aria-expanded')).toBe('true')
    QUERY = {}
  })
})

