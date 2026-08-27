import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const push = vi.fn()
const replace = vi.fn()
// The wizard rewrites its own URL to /roster/new?draft=<id> and reads that id back on mount, so
// the route's query is part of the fixture: set `query.draft` before mounting to resume a draft.
const query = {}
vi.mock('vue-router', () => ({
  useRouter: () => ({ push, replace }),
  useRoute: () => ({ query }),
}))

let RosterCreateView, useRosters, draftResume

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  push.mockClear()
  replace.mockClear()
  for (const k of Object.keys(query)) delete query[k]
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  draftResume = (await import('../../composables/useRosterDraftResume.js')).useRosterDraftResume()
  ;({ default: RosterCreateView } = await import('./RosterCreateView.vue'))
})

const BaseModalStub = {
  props: ['title', 'maxWidth', 'maxHeight', 'zIndex'],
  template: '<div class="modal-stub"><slot name="header" /><slot /></div>',
}
const stubs = { BaseModal: BaseModalStub, RouterLink: { props: ['to'], template: '<a><slot /></a>' } }

// Faction/unit data loads via dynamic import kicked off from an immediate watch — poll (with
// real timers) until it lands, same pattern as RosterEditorView.test.js.
async function waitFor(w, needle, tries = 60) {
  for (let i = 0; i < tries; i++) {
    await flushPromises()
    if (w.text().includes(needle)) return
    await new Promise((r) => setTimeout(r, 25))
  }
}

describe('RosterCreateView', () => {
  it('walks the wizard — faction, detachment, unit — then creates the roster', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })

    // Step 1: pick a faction.
    const choices = w.findAll('.btn-choose')
    await choices[0].trigger('click') // opens the tracker's FactionPickerModal
    await waitFor(w, 'Space Marines')
    const smBtn = w.findAll('.fac-link').find((b) => b.text().includes('Space Marines'))
    await smBtn.trigger('click')
    expect(w.find('.ct-name').text()).toBe('Space Marines')

    // Detachment picker only becomes usable once a faction is chosen; wait for its data.
    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click') // opens DetachmentPickerModal
    const detBtn = w.findAll('.det').find((b) => b.text().includes('1st Company Task Force'))
    await detBtn.trigger('click')
    expect(w.text()).toContain('1st Company Task Force')

    // Step 2: add a unit, remove it via the "-" button that appears once added, then re-add
    // and finish.
    await w.find('.rc-actions .btn-primary').trigger('click')
    await waitFor(w, 'Intercessor Squad')
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Intercessor Squad'))
    await row.find('.rub-add').trigger('click')
    expect(row.find('.rub-remove').exists()).toBe(true)
    await row.find('.rub-remove').trigger('click')
    expect(row.find('.rub-remove').exists()).toBe(false)
    await row.find('.rub-add').trigger('click')

    // Both panes are the same step now — the unit that was just added is in the list beside the
    // catalogue, and its tile expands into its config fields (size/wargear/etc.) on click.
    // CollapseTransition always renders the slot, so open state shows via aria-expanded/the
    // "is-open" class it toggles, not the fields' presence in the DOM. Every step's .rc-panel
    // stays in the DOM at once (v-show, not v-if), so index into .rc-panel rather than querying
    // .rc-sticky bare.
    const panels = w.findAll('.rc-panel')
    const tile = panels[1].findAll('.rul-row').find((b) => b.text().includes('Intercessor Squad'))
    const collapse = tile.element.parentElement.parentElement.querySelector('.collapse')
    expect(tile.attributes('aria-expanded')).toBe('false')
    expect(collapse.classList.contains('is-open')).toBe(false)
    await tile.trigger('click')
    expect(tile.attributes('aria-expanded')).toBe('true')
    expect(collapse.classList.contains('is-open')).toBe(true)
    expect(panels[1].find('.rul-fields .ues-h').exists()).toBe(true) // fields did render

    await panels[1].find('.rc-sticky .btn-primary').trigger('click') // Save

    const store = useRosters()
    expect(store.rosters.value).toHaveLength(1)
    const r = store.rosters.value[0]
    expect(r.faction).toBe('space-marines')
    expect(r.detachments).toEqual(['1st Company Task Force'])
    expect(r.units).toHaveLength(1)
    // The list screens read the cached summary, not the units — a wizard-built roster used to
    // reach them priced at 0 because only the editor ever wrote one (rosterSummary.js).
    expect(r.summary.unitCount).toBe(1)
    expect(r.summary.points).toBeGreaterThan(0)
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}/view`)
  })

  it('keeps only one unit tile open at a time', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })
    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click')
    await w.findAll('.det').find((b) => b.text().includes('1st Company Task Force')).trigger('click')

    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2
    await waitFor(w, 'Intercessor Squad')
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Intercessor Squad'))
    await row.find('.rub-add').trigger('click')
    await row.find('.rub-add').trigger('click') // a 2nd copy, so the list has two tiles

    const panels = w.findAll('.rc-panel')
    const tiles = panels[1].findAll('.rul-row')
    expect(tiles).toHaveLength(2)
    await tiles[0].trigger('click')
    expect(tiles[0].attributes('aria-expanded')).toBe('true')
    expect(tiles[1].attributes('aria-expanded')).toBe('false')

    await tiles[1].trigger('click')
    expect(tiles[0].attributes('aria-expanded')).toBe('false') // opening the 2nd closed the 1st
    expect(tiles[1].attributes('aria-expanded')).toBe('true')
  })

  // The collapsed tile names what distinguishes THIS entry — how many models, what was picked —
  // and not the default loadout, which is identical on every copy of the datasheet and is printed
  // on the datasheet itself (RosterUnitRow.vue).
  it('shows the model count on the (collapsed) tile, not the default loadout', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })
    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click')
    await w.findAll('.det').find((b) => b.text().includes('1st Company Task Force')).trigger('click')

    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2
    await waitFor(w, 'Intercessor Squad')
    // Exact match — "Intercessor Squad" is also a substring of "Assault Intercessor Squad".
    const row = w.findAll('.rub-item').find((r) => r.find('.rub-name').text() === 'Intercessor Squad')
    await row.find('.rub-add').trigger('click')

    const panels = w.findAll('.rc-panel')
    const tile = panels[1].findAll('.rul-row').find((b) => b.find('.rur-name').text().trim() === 'Intercessor Squad')
    expect(tile.text()).toContain('5 models') // the bracket it was added at
    expect(tile.text()).not.toContain('Bolt rifle') // the default loadout lives in the accordion
  })

  it('flags units as over the duplicate cap (red badge + issues count) after the battle size is lowered', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })
    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click')
    await w.findAll('.det').find((b) => b.text().includes('1st Company Task Force')).trigger('click')
    await w.find('.mh-close').trigger('click') // close DetachmentPickerModal — its .modal-stub
    // would otherwise still be in the DOM (never auto-closes) and shadow RosterIssuesModal's own
    // .modal-stub later in this test.

    // 2000pts (Strike Force, the default) → dupLimit high enough that 3 Captains are legal.
    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2
    await waitFor(w, 'Captain')
    const row = w.findAll('.rub-item').find((r) => r.find('.rub-name').text() === 'Captain')
    await row.find('.rub-add').trigger('click')
    await row.find('.rub-add').trigger('click')
    await row.find('.rub-add').trigger('click')
    expect(row.find('.rub-count').classes()).not.toContain('over')
    const errCountBefore = Number(w.find('.issues-badge').text().match(/\d+/)?.[0] || 0)

    // Back to step 1, shrink the battle size — the cap shrinks with it, out from under the
    // 3 Captains already on the list.
    await w.find('.rc-sticky-actions .btn-ghost').trigger('click') // → step 1
    await w.findAll('.seg button').find((b) => b.text() === '1000').trigger('click') // Incursion, dupLimit 2
    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2 again

    // .text() drops the whitespace between the name and the count badge (a rendering quirk
    // already worked around with CSS elsewhere, not fixable at the DOM-text level) — "Captain"
    // now reads as "Captain3/2", not "Captain 3/2". Match the name prefix instead of the exact
    // "Captain" string used above, which no longer applies once a count badge is showing.
    const rowAfter = w.findAll('.rub-item').find((r) => /^Captain(\d|$)/.test(r.find('.rub-name').text()))
    expect(rowAfter.find('.rub-count').classes()).toContain('over')
    const badge = w.find('.issues-badge')
    expect(badge.classes()).toContain('has-err')
    const errCountAfter = Number(badge.text().match(/\d+/)?.[0] || 0)
    expect(errCountAfter).toBeGreaterThan(errCountBefore) // the new overDuplicate issue landed

    // The badge opens RosterIssuesModal with the overDuplicate issue: 3 in the army, max 2.
    await badge.trigger('click')
    expect(w.find('.modal-stub').text()).toContain('3 in the army (max 2)')
  })

  // The wizard used to hold its units in component state until "Done", so leaving any other way —
  // the "Back to list" link, a phone's back gesture, a reload — threw away everything picked and
  // left behind a roster that had been created but was empty.
  it('writes each added unit through to the saved roster, not only on Done', async () => {
    const store = useRosters()
    const w = mount(RosterCreateView, { global: { stubs } })
    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2, creates the roster
    await waitFor(w, 'Intercessor Squad')

    const row = w.findAll('.rub-item').find((r) => r.find('.rub-name').text() === 'Intercessor Squad')
    await row.find('.rub-add').trigger('click')
    expect(store.rosters.value[0].units).toHaveLength(1) // saved without reaching step 3

    await row.find('.rub-add').trigger('click')
    expect(store.rosters.value[0].units).toHaveLength(2)
    await row.find('.rub-remove').trigger('click')
    expect(store.rosters.value[0].units).toHaveLength(1)

    // …and a per-unit edit made on step 3 rides the same array (the store's own deep-watch save).
    const panels = w.findAll('.rc-panel')
    const tile = panels[1].findAll('.rul-row').find((b) => b.find('.rur-name').text().trim() === 'Intercessor Squad')
    await tile.trigger('click')
    expect(store.rosters.value[0].units[0]).toBe(w.vm.units[0])
  })

  // The wizard performs the same removal the editor does — through rosterEngine, not a second
  // implementation, which used to forget that a Leader has to let go of a unit that leaves.
  it('lets go of a Leader attached to a unit removed on step 2', async () => {
    const store = useRosters()
    const w = mount(RosterCreateView, { global: { stubs } })
    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    await w.find('.rc-actions .btn-primary').trigger('click')
    await waitFor(w, 'Intercessor Squad')

    const squad = w.findAll('.rub-item').find((r) => r.find('.rub-name').text() === 'Intercessor Squad')
    await squad.find('.rub-add').trigger('click')
    const captain = w.findAll('.rub-item').find((r) => r.find('.rub-name').text() === 'Captain')
    await captain.find('.rub-add').trigger('click')

    const units = store.rosters.value[0].units
    const target = units.find((u) => u.id === 'intercessor-squad')
    units.find((u) => u.id === 'captain').leaderOf = target.uid

    await squad.find('.rub-remove').trigger('click')
    expect(units.find((u) => u.id === 'captain').leaderOf).toBeUndefined()
  })

  it('supports a custom battle size, using the matching bracket to show the points limit', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })
    const custom = w.findAll('.seg button').find((b) => b.text() === 'Custom')
    await custom.trigger('click')
    await w.find('.bsize-input').setValue(500)
    expect(w.find('.rc-points').text()).toContain('/ 500')
  })

  it('keeps the Next button disabled until a faction is chosen', async () => {
    const w = mount(RosterCreateView, { global: { stubs } })
    expect(w.find('.rc-actions .btn-primary').attributes('disabled')).toBeDefined()
  })

  // The draft: opening the wizard leaves no trace, but from the first choice that means
  // something — the faction — everything is written through, so a reload can't lose it.
  it('starts a draft when the faction is picked, and keeps writing step 1 into it', async () => {
    const store = useRosters()
    const w = mount(RosterCreateView, { global: { stubs } })
    expect(store.rosters.value).toHaveLength(0)

    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    expect(store.rosters.value).toHaveLength(1)
    const draftId = store.rosters.value[0].id
    expect(store.rosters.value[0].draft).toBe(true)
    expect(store.rosters.value[0].faction).toBe('space-marines')
    // The id goes into the URL, which is what makes a reload resume THIS draft.
    expect(replace).toHaveBeenCalledWith({ path: '/roster/new', query: { draft: draftId } })

    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click')
    await w.findAll('.det').find((b) => b.text().includes('1st Company Task Force')).trigger('click')
    await flushPromises()
    expect(store.rosters.value).toHaveLength(1) // written through, not a second roster
    expect(store.rosters.value[0].detachments).toEqual(['1st Company Task Force'])

    await w.find('.rc-actions .btn-primary').trigger('click') // → step 2
    expect(store.rosters.value[0].draftStep).toBe(2)

    // Back to step 1, change the battle size, forward again — same roster, not a duplicate.
    await w.find('.rc-sticky-actions .btn-ghost').trigger('click')
    await w.findAll('.seg button').find((b) => b.text() === 'Custom').trigger('click')
    await w.find('.bsize-input').setValue(750)
    await w.find('.rc-actions .btn-primary').trigger('click')
    await flushPromises()

    expect(store.rosters.value).toHaveLength(1)
    expect(store.rosters.value[0].id).toBe(draftId)
    expect(store.rosters.value[0].battleSize).toBe('custom')
    expect(store.rosters.value[0].customPoints).toBe(750)
  })

  it('resumes a draft from the URL, on the step it was left on', async () => {
    const store = useRosters()
    const r = store.createRoster('Half a list')
    store.updateRoster(r.id, {
      draft: true,
      draftStep: 3, // a draft left on the old configure step resumes on the step that absorbed it
      faction: 'space-marines',
      detachments: ['1st Company Task Force'],
      battleSize: 'incursion',
      units: [{ uid: 'a', id: 'intercessor-squad', size: 0 }],
    })
    query.draft = r.id

    const w = mount(RosterCreateView, { global: { stubs } })
    await waitFor(w, 'Intercessor Squad')

    // Step 2 is the visible panel, holding the unit the draft already had.
    const panels = w.findAll('.rc-panel')
    expect(panels[1].isVisible()).toBe(true)
    expect(panels[1].text()).toContain('Intercessor Squad')
    expect(w.find('input[type="text"]').element.value).toBe('Half a list')
    expect(w.text()).toContain('1st Company Task Force')
    expect(store.rosters.value).toHaveLength(1) // resumed, not re-created

    // Saving from here clears the draft flags — it's an ordinary list now.
    await panels[1].find('.rc-sticky .btn-primary').trigger('click')
    expect(store.rosters.value[0].draft).toBeUndefined()
    expect(store.rosters.value[0].draftStep).toBeUndefined()
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}/view`)
  })

  // A saved roster is the editor's business; the wizard ends in "Save" and would offer to save
  // something already saved.
  it('ignores a ?draft= id that points at a saved roster', async () => {
    const store = useRosters()
    const r = store.createRoster('Finished list')
    store.updateRoster(r.id, { faction: 'space-marines' })
    query.draft = r.id

    const w = mount(RosterCreateView, { global: { stubs } })
    await flushPromises()
    expect(w.findAll('.rc-panel')[0].isVisible()).toBe(true) // fresh wizard, step 1
    expect(w.find('input[type="text"]').element.value).toBe('')
  })

  // Leaving this screen to go read a rule is the normal way to use it, and the draft survives
  // that on its own — but the way BACK didn't, since /roster opens on Saved lists and a draft
  // isn't one. The wizard notes itself on the way out; App.vue turns that into a floating chip.
  describe('the way back', () => {
    function startedDraft() {
      const store = useRosters()
      const r = store.createRoster('Half-built')
      store.updateRoster(r.id, { faction: 'space-marines', draft: true, draftStep: 2 })
      return r
    }

    it('remembers the draft it was showing when it unmounts', async () => {
      const r = startedDraft()
      query.draft = r.id

      const w = mount(RosterCreateView, { global: { stubs } })
      await flushPromises()
      w.unmount()

      expect(draftResume.pendingDraftId.value).toBe(r.id)
    })

    it('forgets it on the way in — being here IS the way back', async () => {
      const r = startedDraft()
      draftResume.rememberDraft(r.id)
      query.draft = r.id

      mount(RosterCreateView, { global: { stubs } })
      expect(draftResume.pendingDraftId.value).toBeNull()
    })

    it('has nothing to offer when no faction was picked, since there is no draft yet', async () => {
      const w = mount(RosterCreateView, { global: { stubs } })
      await flushPromises()
      w.unmount()

      expect(draftResume.pendingDraftId.value).toBeNull()
    })
  })
})
