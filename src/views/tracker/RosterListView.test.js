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

  // Player request 2026-09-29: several armies' lists, narrowed to one by a row of faction chips.
  describe('faction filter', () => {
    const make = (store, name, faction) => { const r = store.createRoster(name); r.faction = faction; return r }
    const names = (w) => w.findAll('.rname').map((n) => n.text())

    it('is not offered while every list is of one faction', async () => {
      const store = useRosters()
      make(store, 'A', 'orks'); make(store, 'B', 'orks')
      const w = mount(RosterListView, { global: { stubs } })
      expect(w.find('.rl-factions').exists()).toBe(false)
    })

    it('narrows the lists to one faction, and "All" lets go', async () => {
      const store = useRosters()
      make(store, 'Waaagh', 'orks'); make(store, 'Bugs', 'tyranids'); make(store, 'More bugs', 'tyranids')
      const w = mount(RosterListView, { global: { stubs } })
      const select = w.find('.rl-factions select')
      expect(select.findAll('option').map((o) => o.text())).toEqual(['All (3)', 'Orks (1)', 'Tyranids (2)'])
      await select.setValue('tyranids')
      expect(names(w).sort()).toEqual(['Bugs', 'More bugs'])
      await select.setValue('')
      expect(names(w)).toHaveLength(3)
    })

    // A player request (2026-10-06): the page opens on the faction picked last time.
    it('remembers the faction picked, and forgets it on "All"', async () => {
      const store = useRosters()
      make(store, 'Waaagh', 'orks'); make(store, 'Bugs', 'tyranids')
      const w = mount(RosterListView, { global: { stubs } })
      await w.find('.rl-factions select').setValue('tyranids')
      w.unmount()
      const again = mount(RosterListView, { global: { stubs } })
      expect(names(again)).toEqual(['Bugs'])
      expect(again.find('.rl-factions select').element.value).toBe('tyranids')
      await again.find('.rl-factions select').setValue('')
      again.unmount()
      expect(names(mount(RosterListView, { global: { stubs } }))).toHaveLength(2)
    })

    it('shows everything again once the picked faction has no list left', async () => {
      const store = useRosters()
      make(store, 'Waaagh', 'orks'); const b = make(store, 'Bugs', 'tyranids'); make(store, 'Mechs', 'necrons')
      const w = mount(RosterListView, { global: { stubs } })
      await w.find('.rl-factions select').setValue('tyranids')
      expect(names(w)).toEqual(['Bugs'])
      store.deleteRoster(b.id)
      await flushPromises()
      expect(names(w)).toHaveLength(2)
    })
  })

  // Owner, 2026-10-06: the list changed last comes first; a pinned one stays above it.
  // Player report b337c3bf (2026-10-07): the list stores appdata's spelling of a detachment, the
  // MFM its own, and an exact match dropped Vow-sworn Crusaders' Purge the Foe. With two
  // detachments the chip then showed the OTHER one's disposition instead.
  it('shows the Force Disposition chip whichever way the MFM spells the detachment', async () => {
    const store = useRosters()
    const one = store.createRoster('Crusade')
    one.faction = 'black-templars'; one.detachments = ['Vow-sworn Crusaders']
    const w = mount(RosterListView, { global: { stubs } })
    await vi.waitFor(async () => { await flushPromises(); expect(w.find('.rfd').exists()).toBe(true) }, { timeout: 15000 })
    expect(w.find('.rfd').text()).toBe('Purge the Foe')
  })

  it('puts the list edited last on top, under the pinned ones', async () => {
    const store = useRosters()
    const { toggleRosterPin } = await import('../../composables/useRosterPins.js')
    const old = store.createRoster('Old')
    const mid = store.createRoster('Mid')
    const pinned = store.createRoster('Pinned')
    old.updatedAt = 1000; mid.updatedAt = 2000; pinned.updatedAt = 500
    toggleRosterPin(pinned.id)
    const w = mount(RosterListView, { global: { stubs } })
    const names = () => w.findAll('.rname').map((n) => n.text())
    expect(names()).toEqual(['Pinned', 'Mid', 'Old'])
    store.renameRoster(old.id, 'Old, edited')
    await flushPromises()
    expect(names()).toEqual(['Pinned', 'Old, edited', 'Mid'])
  })

  it('shows twenty lists, and "Show more" the next twenty', async () => {
    const store = useRosters()
    for (let i = 0; i < 45; i++) store.createRoster(`L${i}`)
    const w = mount(RosterListView, { global: { stubs } })
    expect(w.findAll('.roster')).toHaveLength(20)
    await w.find('.show-more').trigger('click')
    expect(w.findAll('.roster')).toHaveLength(40)
    await w.find('.show-more').trigger('click')
    expect(w.findAll('.roster')).toHaveLength(45)
    expect(w.find('.show-more').exists()).toBe(false)
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
    // Edit / Export / Duplicate / Pin / Archive / Delete — picked by label everywhere else in this file, so the
    // sheet can grow without a positional index quietly pointing at the wrong action.
    expect(w.findAll('.act-btn').map((b) => b.text())).toEqual(['Edit', 'Export roster', 'Duplicate', 'Pin to top', 'Move to archive', 'Delete'])
  })

  // The archive (player request, 2026-10-02): a list kept for reference leaves the saved tab for
  // its own, wears no issue count there, and comes back the same way.
  it('moves a list to the archive tab and back', async () => {
    const store = useRosters()
    const r = store.createRoster('All my models')
    store.updateRoster(r.id, { summary: { points: 4200, unitCount: 0, issues: 3 } })
    const w = mount(RosterListView, { global: { stubs } })
    expect(w.find('.issues').exists()).toBe(true)

    await w.find('.kebab').trigger('click')
    await act(w, 'Move to archive').trigger('click')
    expect(store.rosterById(r.id).archived).toBe(true)
    expect(store.activeRosters.value).toHaveLength(0)
    await flushPromises()
    expect(w.findAll('.roster')).toHaveLength(0)

    const tabs = w.findAll('.rl-tabs button')
    expect(tabs.map((t) => t.text())).toEqual(['Lists0', 'Drafts0', 'Archive1'])
    await tabs[2].trigger('click')
    await flushPromises()
    expect(w.find('.rname').text()).toBe('All my models')
    expect(w.find('.issues').exists()).toBe(false)

    await w.find('.kebab').trigger('click')
    await act(w, 'Restore from archive').trigger('click')
    expect('archived' in store.rosterById(r.id)).toBe(false)
    expect(store.activeRosters.value).toHaveLength(1)
  })

  it('shows the total alone on a list with no limit', async () => {
    const store = useRosters()
    const r = store.createRoster('Everything')
    store.updateRoster(r.id, { battleSize: 'none', summary: { points: 4200, unitCount: 0, issues: 0 } })
    const w = mount(RosterListView, { global: { stubs } })
    expect(w.find('.rpoints').text()).toBe('4200 pts')
    expect(w.find('.rpoints').classes()).not.toContain('over')
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
    expect(w.findAll('.rex-fmt option').map((o) => o.text())).toEqual(['GW app', 'WTC', 'WTC-Compact', 'Discord', 'Simple'])
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

  // The badge is the only thing on this screen that reads the tracker's history, and it reads it
  // straight from storage (gameStats.loadHistory) — so the test seeds the key, not the store.
  it('shows a list’s battle record on its card, and nothing on a list that never played', async () => {
    const store = useRosters()
    const played = store.createRoster('Green Tide')
    store.createRoster('Untested list')
    const player = (isYou, rosterId) => ({
      isYou, name: '', factionSlug: null, detachments: [], rosterId,
      rounds: Array.from({ length: 5 }, () => ({ primary: 0, picks: {} })),
      secondaryMode: 'tactical', secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: [] },
    })
    const game = (vp) => ({
      id: 'g' + vp.join(''), phase: 'finished', settings: { battleSize: 'strikeForce' },
      players: [player(true, played.id), player(false, null)], result: { totals: vp },
    })
    localStorage.setItem('wh11ed-tracker-history', JSON.stringify([game([90, 60]), game([40, 80])]))

    const w = mount(RosterListView, { global: { stubs } })
    await flushPromises()
    const cards = w.findAll('.roster')
    const green = cards.find((c) => c.text().includes('Green Tide'))
    expect(green.find('.rrec').text()).toContain('1–1–0')
    expect(cards.find((c) => c.text().includes('Untested list')).find('.rrec').exists()).toBe(false)
  })

})
