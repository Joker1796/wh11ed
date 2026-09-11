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

  // An army plays ONE Force Disposition, and the setup screen is where it is declared: with one
  // detachment it just states the answer, with two that disagree it asks.
  it('states the Force Disposition, and asks for a declaration when detachments disagree', async () => {
    const fac = (await import('../../data/roster/space-marines.js')).default
    // The cheapest of each, so two of them still fit the battle size's Detachment Points.
    const byFd = (fd) => fac.detachments.filter((d) => d.fd === fd).sort((a, b) => a.dp - b.dp)[0].name
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.detachments = [byFd('Take and Hold')]
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await flushPromises()
    await w.findAll('.page-tab')[0].trigger('click') // the editor opens on Units
    // Wait for the DISPOSITION, not for the detachment's name: the name is on the roster and
    // renders immediately, while the Force Disposition it implies comes out of the faction data
    // this view imports dynamically.
    await waitFor(w, 'Take and Hold')
    expect(w.find('.disp-opts').exists()).toBe(false)

    store.updateRoster(r.id, { detachments: [byFd('Take and Hold'), byFd('Purge the Foe')] })
    await flushPromises()
    const seg = w.find('.disp-opts')
    expect(seg.exists()).toBe(true)
    expect(seg.findAll('button').map((b) => b.text())).toEqual(['Take and Hold', 'Purge the Foe'])
    await seg.findAll('button')[1].trigger('click')
    expect(store.rosterById(r.id).disposition).toBe('Purge the Foe')
  })

  // The header's hand-off to the tracker is gone (2026-08-28, on request): a list is attached to
  // a game from the tracker's own side, where somebody starting a game already is.
  it('offers no tracker hand-off from the editor header', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')
    expect(w.find('.red-head .bi-clipboard-data').exists()).toBe(false)
    expect(push).not.toHaveBeenCalled()
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

  it('duplicates a configured unit, without its warlord title, right after the original', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 1, count: 8, warlord: true })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    await w.findAll('.rul-dup')[0].trigger('click')
    expect(r.units).toHaveLength(2)
    expect(r.units[1]).toMatchObject({ id: 'intercessor-squad', size: 1, count: 8 })
    expect(r.units[1].warlord).toBeUndefined()
  })

  // Adding a unit through the catalogue stops at the duplicate cap; this is the one control that
  // could add one without going through it.
  it('offers no copy button at the duplicate cap', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'adrax-agatone', size: 0 }) // Epic Hero — cap of 1 at any size
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Adrax Agatone')

    expect(w.find('.rul-dup').exists()).toBe(false)
    // Through the store's own reactive handle: createRoster returns the RAW object, and a
    // mutation on that is invisible to the render.
    store.rosterById(r.id).checkLegality = false // the cap is only enforced while checking is on
    await flushPromises()
    expect(w.find('.rul-dup').exists()).toBe(true)
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

  // The catalogue used to be a page of its own (/roster/:id/add) and the Units tab a link to it;
  // adding a unit and pricing its wargear were a navigation apart.
  it('shows the catalogue beside the list, on the tab itself', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    ROSTER_ID = r.id
    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    expect(w.find('.roster-panes .rp-catalog .rub').exists()).toBe(true)
    expect(w.find('.roster-panes .rp-list .rul-unit').exists()).toBe(true)
    expect(w.findAll('a').some((a) => a.attributes('href') === `/roster/${r.id}/add`)).toBe(false)
  })

  it('adds a unit from the catalogue without leaving the tab', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    ROSTER_ID = r.id
    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    const row = w.findAll('.rub-item').find((x) => x.find('.rub-name').text().startsWith('Intercessor Squad'))
    await row.find('.rub-add').trigger('click')
    expect(r.units).toHaveLength(1)
    expect(push).not.toHaveBeenCalled()
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
    expect(w.find('.rul-row').attributes('aria-expanded')).toBe('true')
    QUERY = {}
  })

  // Removing a unit used to mean going back to the add-units browser and pressing "−" there,
  // which takes the LAST copy — not necessarily the line you were looking at.
  it('deletes the exact line its trash button belongs to', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    r.faction = 'space-marines'
    r.units.push({ uid: 'u1', id: 'intercessor-squad', size: 0 })
    r.units.push({ uid: 'u2', id: 'captain', size: 0, leaderOf: 'u1' })
    ROSTER_ID = r.id

    const w = mount(RosterEditorView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    // Match on the row's own NAME: the Captain's row also mentions the squad, in its
    // "attached to" tag.
    const rows = w.findAll('.rul-unit')
    const squad = rows.find((row) => row.find('.rur-name').text().trim() === 'Intercessor Squad')
    await squad.find('.rul-del').trigger('click')

    expect(r.units.map((u) => u.uid)).toEqual(['u2'])
    // …and the Captain that was attached to it isn't left pointing at a unit that has gone.
    expect(r.units[0].leaderOf).toBeUndefined()
  })
})

