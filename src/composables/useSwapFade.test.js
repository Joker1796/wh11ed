import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { useSwapFade } from './useSwapFade.js'

afterEach(() => { document.documentElement.style.removeProperty('--motion-swap') })

// A panel whose content switches in place: `which` picks it, the shown element is faded in.
function panel() {
  const which = ref(0)
  const el = ref(null)
  const w = mount(defineComponent({
    setup() {
      useSwapFade(which, () => el.value)
      return () => h('div', { ref: el }, String(which.value))
    },
  }))
  el.value.animate = vi.fn()
  return { w, which, animate: el.value.animate }
}

describe('useSwapFade', () => {
  it('fades the new content in on a switch, not on the first show', async () => {
    document.documentElement.style.setProperty('--motion-swap', '0.6s')
    const { w, which, animate } = panel()
    expect(animate).not.toHaveBeenCalled()
    which.value = 1
    await w.vm.$nextTick(); await w.vm.$nextTick()
    expect(animate).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-in-out' })
  })

  it('does nothing under reduced motion (the token is 0)', async () => {
    document.documentElement.style.setProperty('--motion-swap', '0s')
    const { w, which, animate } = panel()
    which.value = 1
    await w.vm.$nextTick(); await w.vm.$nextTick()
    expect(animate).not.toHaveBeenCalled()
  })
})
