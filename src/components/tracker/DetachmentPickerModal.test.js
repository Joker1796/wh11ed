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

  it('bars a second detachment sharing the tag, and nothing else', () => {
    // Core rules 25.04: "…cannot be taken with another DYNASTY detachment". Greyed rather than
    // hidden, so the reason is visible.
    mountPicker(list, ['Awakened Dynasty'])
    expect(buttonFor('Hand of the Dynasty').attributes('disabled')).toBeDefined()
    expect(buttonFor('Hand of the Dynasty').text()).toContain('tag already taken')
    expect(buttonFor('Hypercrypt Legion').attributes('disabled')).toBeUndefined()
    expect(buttonFor('Canoptek Court').attributes('disabled')).toBeUndefined()
    // The selected one stays clickable — that's how it gets deselected.
    expect(buttonFor('Awakened Dynasty').attributes('disabled')).toBeUndefined()
  })
})
