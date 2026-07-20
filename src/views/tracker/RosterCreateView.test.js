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
    const smBtn = w.findAll('.fac').find((b) => b.text().includes('Space Marines'))
    await smBtn.trigger('click')
    expect(w.find('.ct-name').text()).toBe('Space Marines')

    // Detachment picker only becomes usable once a faction is chosen; wait for its data.
    await waitFor(w, '1st Company Task Force')
    await w.findAll('.btn-choose')[1].trigger('click') // opens DetachmentPickerModal
    const detBtn = w.findAll('.det').find((b) => b.text().includes('1st Company Task Force'))
    await detBtn.trigger('click')
    expect(w.text()).toContain('1st Company Task Force')

    // Step 2: add a unit, then finish.
    await w.find('.rc-actions .btn-primary').trigger('click')
    await waitFor(w, 'Intercessor Squad')
    const row = w.findAll('.rub-item').find((r) => r.text().includes('Intercessor Squad'))
    await row.find('.rub-add').trigger('click')

    await w.find('.rc-sticky .btn-primary').trigger('click')

    const store = useRosters()
    expect(store.rosters.value).toHaveLength(1)
    const r = store.rosters.value[0]
    expect(r.faction).toBe('space-marines')
    expect(r.detachments).toEqual(['1st Company Task Force'])
    expect(r.units).toHaveLength(1)
    expect(push).toHaveBeenCalledWith(`/roster/${r.id}`)
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
})
