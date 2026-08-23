import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

let RosterListView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  push.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ default: RosterListView } = await import('./RosterListView.vue'))
})

// BaseModal wraps its consumer's markup in focus-trap/transition machinery that isn't
// relevant here — a passthrough stub keeps the header/default slot content (the kebab
// actions sheet, ConfirmModal's message/buttons) so it can still be interacted with.
const BaseModalStub = {
  props: ['title', 'maxWidth', 'maxHeight', 'zIndex'],
  template: '<div class="modal-stub"><slot name="header" /><slot /></div>',
}
const stubs = { BaseModal: BaseModalStub, RouterLink: { props: ['to'], template: '<a><slot /></a>' } }

// The actions sheet is picked by LABEL, never by index: it has grown twice already, and a
// positional selector silently starts clicking the neighbouring action when it does.
const act = (w, label) => w.findAll('.act-btn').find((b) => b.text() === label)

describe('RosterListView', () => {
  it('shows the empty state and routes New to the creation wizard', async () => {
    const w = mount(RosterListView, { global: { stubs } })
    expect(w.find('.empty').exists()).toBe(true)
    await w.find('.btn-primary').trigger('click')
    expect(push).toHaveBeenCalledWith('/roster/new')
  })

  it('clicking a card opens the read-only view, not the editor', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.roster').trigger('click')
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}/view`)
  })

  it('kebab menu: Edit routes to the full editor', async () => {
    const store = useRosters()
    const r = store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await act(w, 'Edit').trigger('click')
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}`)
  })

  it('kebab menu: Duplicate adds a copy to the store', async () => {
    const store = useRosters()
    store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await act(w, 'Duplicate').trigger('click')
    expect(store.rosters.value).toHaveLength(2)
  })

  it('kebab menu: Delete asks for confirmation before removing the roster', async () => {
    const store = useRosters()
    store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await act(w, 'Delete').trigger('click')
    // Not removed yet — ConfirmModal is up.
    expect(store.rosters.value).toHaveLength(1)
    await w.find('.modal-foot .btn-primary').trigger('click')
    expect(store.rosters.value).toHaveLength(0)
  })

  // Drafts are the wizard's unfinished business: their own tab, and a click continues the wizard
  // rather than opening a list that isn't finished.
  it('keeps drafts out of the saved tab and opens them back in the wizard', async () => {
    const store = useRosters()
    const saved = store.createRoster('Saved list')
    const draft = store.createRoster('Half a list')
    store.updateRoster(draft.id, { draft: true, draftStep: 2 })

    const w = mount(RosterListView, { global: { stubs } })
    expect(w.findAll('.roster')).toHaveLength(1)
    expect(w.find('.rname').text()).toBe('Saved list')

    const tabs = w.findAll('.rl-tabs button')
    expect(tabs[0].text()).toContain('1')
    expect(tabs[1].text()).toContain('1')
    await tabs[1].trigger('click')

    expect(w.findAll('.roster')).toHaveLength(1)
    expect(w.find('.rname').text()).toBe('Half a list')
    expect(w.find('.rstep').text()).toBe('step 2 of 3')

    await w.find('.roster').trigger('click')
    expect(push).toHaveBeenCalledWith({ path: '/roster/new', query: { draft: draft.id } })
    expect(push).not.toHaveBeenCalledWith(`/roster/${saved.id}/view`)
  })

  // A draft's sheet only ever held Delete, so the card carries it directly — one tap, no menu.
  it('deletes a draft straight from its card, still behind the confirmation', async () => {
    const store = useRosters()
    const draft = store.createRoster('Half a list')
    store.updateRoster(draft.id, { draft: true })

    const w = mount(RosterListView, { global: { stubs } })
    await w.findAll('.rl-tabs button')[1].trigger('click')
    const btn = w.find('.kebab')
    expect(btn.classes()).toContain('danger')
    expect(btn.find('.bi-trash').exists()).toBe(true)

    await btn.trigger('click')
    expect(w.findAll('.act-btn')).toHaveLength(0)   // no actions sheet on the way
    expect(store.rosters.value).toHaveLength(1)     // and not gone until confirmed
    await w.find('.modal-foot .btn-primary').trigger('click')
    expect(store.rosterById(draft.id)).toBe(null)
  })

  it('keeps the full actions sheet for a saved list', async () => {
    const store = useRosters()
    store.createRoster('A list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    // Edit / Export / Duplicate / Delete — picked by label everywhere else in this file, so the
    // sheet can grow without a positional index quietly pointing at the wrong action.
    expect(w.findAll('.act-btn').map((b) => b.text())).toEqual(['Edit', 'Export roster', 'Duplicate', 'Delete'])
  })

  // A finished list is passed on more often than it is edited, so it exports from here too — which
  // means this screen has to fetch the faction bundle it otherwise never loads.
  it('kebab menu: Export opens the export sheet once the faction data is in', async () => {
    const store = useRosters()
    const r = store.createRoster('Exportable')
    store.updateRoster(r.id, { faction: 'world-eaters', detachments: [], battleSize: 'strike-force' })
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await act(w, 'Export roster').trigger('click')
    for (let i = 0; i < 40 && !w.find('.rex').exists(); i++) {
      await flushPromises()
      await new Promise((res) => setTimeout(res, 10))
    }
    expect(w.find('.rex').exists()).toBe(true)
    expect(w.findAll('.rex-fmt').map((b) => b.text())).toEqual(['GW app', 'WTC', 'WTC-Compact', 'Discord'])
    w.unmount()
  })

  it('shows a faction accent and flags a list over its points limit', async () => {
    const store = useRosters()
    const r = store.createRoster('Big list')
    store.updateRoster(r.id, { faction: 'space-marines', summary: { points: 2500, unitCount: 1, issues: 0 } })
    const w = mount(RosterListView, { global: { stubs } })
    expect(w.find('.roster').classes()).toContain('themed')
    expect(w.find('.rfaction').text()).toBe('Space Marines')
    expect(w.find('.rpoints').classes()).toContain('over')
  })
})
