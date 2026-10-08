import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useOutsideTap } from './useOutsideTap.js'

// A trigger and its panel, open; `under` is a button elsewhere on the page.
function setup() {
  const open = ref(true)
  const trigger = ref(null)
  const panel = ref(null)
  const w = mount(defineComponent({
    setup() {
      useOutsideTap(open, () => [trigger.value, panel.value], () => { open.value = false })
      return () => h('div', [
        h('button', { ref: trigger, id: 'trigger', onClick: () => { open.value = !open.value } }),
        h('div', { ref: panel, id: 'panel' }, [h('button', { id: 'item' })]),
        h('button', { id: 'under' }),
      ])
    },
  }), { attachTo: document.body })
  return { w, open, el: (id) => w.find(`#${id}`).element }
}
const tap = (el) => {
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
  el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0 }))
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}
let w
afterEach(() => w?.unmount())

describe('useOutsideTap', () => {
  it('lets a tap on the trigger reach it: pressed, heard, and it toggles the dropdown shut', async () => {
    const s = setup(); w = s.w
    const pressed = vi.fn()
    document.addEventListener('pointerdown', pressed) // pressFeedback listens here
    tap(s.el('trigger'))
    document.removeEventListener('pointerdown', pressed)
    expect(pressed).toHaveBeenCalled()
    expect(s.open.value).toBe(false)
  })

  it('leaves taps inside the panel alone', () => {
    const s = setup(); w = s.w
    tap(s.el('item'))
    expect(s.open.value).toBe(true)
  })

  it('closes on a tap outside and swallows it, as a backdrop did', async () => {
    const s = setup(); w = s.w
    const pressed = vi.fn()
    const clicked = vi.fn()
    document.addEventListener('pointerdown', pressed)
    s.el('under').addEventListener('click', clicked)
    tap(s.el('under'))
    document.removeEventListener('pointerdown', pressed)
    expect(s.open.value).toBe(false)
    expect(pressed).not.toHaveBeenCalled()
    expect(clicked).not.toHaveBeenCalled()
    await nextTick()
    tap(s.el('under')) // closed now: the page is the page again
    expect(clicked).toHaveBeenCalledTimes(1)
  })

  it('keeps it open when a drag outside turns into a scroll', () => {
    const s = setup(); w = s.w
    const under = s.el('under')
    under.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }))
    under.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }))
    expect(s.open.value).toBe(true)
  })
})
