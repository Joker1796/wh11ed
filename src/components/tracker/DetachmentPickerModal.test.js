import { describe, it, expect, afterEach } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import DetachmentPickerModal from './DetachmentPickerModal.vue'

// BaseModal renders through <Teleport to="body">, so the buttons land outside the component's own
// tree — search the document, as the other modal tests do.
const body = () => new DOMWrapper(document.body)
const det = (name, extra = {}) => ({ name, dp: 1, forceDisposition: 'Take and Hold', ...extra })

const mountPicker = (detachments, selected = []) => (wrapper = mount(DetachmentPickerModal, {
  props: { detachments, selected, maxDp: 3, dpSpent: selected.length },
  attachTo: document.body,
}))
const buttonFor = (name) => body().findAll('button.det').find((b) => b.text().includes(name))

// Teleported content survives unmount-by-GC, so wipe it — otherwise the next mount's query finds
// the previous test's buttons.
let wrapper = null
afterEach(() => { wrapper?.unmount(); document.body.innerHTML = '' })

describe('DetachmentPickerModal — tags', () => {
  const list = [
    det('Awakened Dynasty', { unique: 'DYNASTY' }),
    det('Hand of the Dynasty', { unique: 'DYNASTY' }),
    det('Hypercrypt Legion', { unique: 'HYPERCRYPT' }),
    det('Canoptek Court'),
  ]

  it('shows the tag alongside DP and disposition', () => {
    mountPicker(list)
    expect(buttonFor('Awakened Dynasty').text()).toContain('DYNASTY')
  })

  // Core rules 25.04: "…cannot be taken with another DYNASTY detachment". Taken off the list
  // rather than greyed (2026-08-28): once a budget is spent most of the list is unpickable, and a
  // page of dimmed rows reads as a broken screen. What went, and why, is said once above the list.
  it('takes a second detachment sharing the tag off the list, and nothing else', () => {
    mountPicker(list, ['Awakened Dynasty'])
    expect(buttonFor('Hand of the Dynasty')).toBeUndefined()
    expect(buttonFor('Hypercrypt Legion')).toBeDefined()
    expect(buttonFor('Canoptek Court')).toBeDefined()
    // The selected one stays — that's how it gets deselected.
    expect(buttonFor('Awakened Dynasty')).toBeDefined()
    expect(body().find('.det-hidden').text()).toContain('1')
  })

  it('offers only what the remaining Detachment Points can pay for', () => {
    // 3 DP spent of 3: nothing else fits, so nothing else is offered — and the count says so.
    wrapper = mount(DetachmentPickerModal, {
      props: { detachments: list, selected: ['Canoptek Court'], maxDp: 3, dpSpent: 3 },
      attachTo: document.body,
    })
    expect(body().findAll('button.det')).toHaveLength(1)
    expect(buttonFor('Canoptek Court')).toBeDefined()
    expect(body().find('.det-hidden').text()).toContain('3')
  })

  // The way back: with a spent budget the list is otherwise a dead end.
  it('offers to clear the selection, and only while there is one', () => {
    mountPicker(list)
    expect(body().find('.det-clear').exists()).toBe(false) // nothing chosen, nothing hidden
    wrapper.unmount()
    document.body.innerHTML = ''
    mountPicker(list, ['Awakened Dynasty'])
    const clear = body().find('.det-clear')
    expect(clear.attributes('disabled')).toBeUndefined()
    clear.trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})
