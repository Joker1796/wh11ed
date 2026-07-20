import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

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
    await w.findAll('.act-btn')[0].trigger('click')
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}`)
  })

  it('kebab menu: Duplicate adds a copy to the store', async () => {
    const store = useRosters()
    store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await w.findAll('.act-btn')[1].trigger('click')
    expect(store.rosters.value).toHaveLength(2)
  })

  it('kebab menu: Delete asks for confirmation before removing the roster', async () => {
    const store = useRosters()
    store.createRoster('Test list')
    const w = mount(RosterListView, { global: { stubs } })
    await w.find('.kebab').trigger('click')
    await w.findAll('.act-btn')[2].trigger('click')
    // Not removed yet — ConfirmModal is up.
    expect(store.rosters.value).toHaveLength(1)
    await w.find('.modal-foot .btn-primary').trigger('click')
    expect(store.rosters.value).toHaveLength(0)
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
