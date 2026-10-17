import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useModalA11y } from './useModalA11y.js'

const Dialog = defineComponent({
  props: { onShut: { type: Function, required: true } },
  setup(props) {
    const root = ref(null)
    useModalA11y(root, () => props.onShut())
    return () => h('div', { ref: root, tabindex: -1 })
  },
})

// Acceptance, 2026-10-18: Escape over a datasheet opened from the roster editor closed both.
describe('useModalA11y — Escape', () => {
  it('closes only the dialog on top', async () => {
    const lower = vi.fn()
    const upper = vi.fn()
    const a = mount(Dialog, { props: { onShut: lower }, attachTo: document.body })
    const b = mount(Dialog, { props: { onShut: upper }, attachTo: document.body })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(upper).toHaveBeenCalledTimes(1)
    expect(lower).not.toHaveBeenCalled()
    b.unmount()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(lower).toHaveBeenCalledTimes(1)
    a.unmount()
  })
})
