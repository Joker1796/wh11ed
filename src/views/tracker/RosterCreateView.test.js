import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

let RosterCreateView, useRosters

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  push.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
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

    // Step 2 → 3 ("Next"). Every step's .rc-panel stays in the DOM at once (v-show, not v-if) —
    // index into .rc-panel (1 = step 2, 2 = step 3) rather than a bare .rc-sticky query, which
    // would match step 2's regardless of which is shown.
    const panels = w.findAll('.rc-panel')
    await panels[1].find('.rc-sticky .btn-primary').trigger('click')

    // Step 3: the added unit's tile expands into its config fields (size/wargear/etc.) on click
    // — CollapseTransition always renders the slot, so open state shows via aria-expanded/the
    // "is-open" class it toggles, not the fields' presence in the DOM.
    const tile = panels[2].findAll('.rcunit-row').find((b) => b.text().includes('Intercessor Squad'))
    const collapse = tile.element.parentElement.querySelector('.collapse')
    expect(tile.attributes('aria-expanded')).toBe('false')
    expect(collapse.classList.contains('is-open')).toBe(false)
    await tile.trigger('click')
    expect(tile.attributes('aria-expanded')).toBe('true')
    expect(collapse.classList.contains('is-open')).toBe(true)
    expect(panels[2].find('.rcunit-fields .ues-h').exists()).toBe(true) // fields did render

    await panels[2].find('.rc-sticky .btn-primary').trigger('click') // Done

    const store = useRosters()
    expect(store.rosters.value).toHaveLength(1)
    const r = store.rosters.value[0]
    expect(r.faction).toBe('space-marines')
    expect(r.detachments).toEqual(['1st Company Task Force'])
    expect(r.units).toHaveLength(1)
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}/view`)
  })

  it('step 3 keeps only one unit tile open at a time', async () => {
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
    await row.find('.rub-add').trigger('click') // a 2nd copy, so step 3 has two tiles

    const panels = w.findAll('.rc-panel')
    await panels[1].find('.rc-sticky .btn-primary').trigger('click') // → step 3

    const tiles = panels[2].findAll('.rcunit-row')
    expect(tiles).toHaveLength(2)
    await tiles[0].trigger('click')
    expect(tiles[0].attributes('aria-expanded')).toBe('true')
    expect(tiles[1].attributes('aria-expanded')).toBe('false')

    await tiles[1].trigger('click')
    expect(tiles[0].attributes('aria-expanded')).toBe('false') // opening the 2nd closed the 1st
    expect(tiles[1].attributes('aria-expanded')).toBe('true')
  })

  it('step 3 shows the default loadout right on the (collapsed) tile', async () => {
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
    await panels[1].find('.rc-sticky .btn-primary').trigger('click') // → step 3
    const tile = panels[2].findAll('.rcunit-row').find((b) => b.find('.rcunit-name').text() === 'Intercessor Squad')
    expect(tile.find('.rcunit-loadout').exists()).toBe(true)
    expect(tile.text()).toContain('Bolt rifle') // its default loadout, not just an upgrade count
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

  it('does not create a roster until step 1 is submitted, and reuses it on Back/Next', async () => {
    const store = useRosters()
    const w = mount(RosterCreateView, { global: { stubs } })
    expect(store.rosters.value).toHaveLength(0)

    await w.findAll('.btn-choose')[0].trigger('click')
    await waitFor(w, 'Space Marines')
    await w.findAll('.fac-link').find((b) => b.text().includes('Space Marines')).trigger('click')
    expect(store.rosters.value).toHaveLength(0) // picking a faction alone doesn't save it

    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click')
    await w.findAll('.det').find((b) => b.text().includes('1st Company Task Force')).trigger('click')
    expect(store.rosters.value).toHaveLength(0) // nor does picking a detachment

    await w.find('.rc-actions .btn-primary').trigger('click') // Next → now it exists
    expect(store.rosters.value).toHaveLength(1)
    const savedId = store.rosters.value[0].id

    // Back to step 1, change the battle size, forward again — same roster, not a duplicate.
    await w.find('.rc-sticky-actions .btn-ghost').trigger('click')
    await w.findAll('.seg button').find((b) => b.text() === 'Custom').trigger('click')
    await w.find('.bsize-input').setValue(750)
    await w.find('.rc-actions .btn-primary').trigger('click')

    expect(store.rosters.value).toHaveLength(1)
    expect(store.rosters.value[0].id).toBe(savedId)
    expect(store.rosters.value[0].battleSize).toBe('custom')
    expect(store.rosters.value[0].customPoints).toBe(750)
  })
})
