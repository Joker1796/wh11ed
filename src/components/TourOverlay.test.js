import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// A tap on the lit element ends the chapter and reaches the element; a tap on the dim does neither
// (report 2faa29a6, 2026-11-04: "enter your name", and the name field under the light took no tap).
describe('TourOverlay — a tap on the light', () => {
  const realRects = Element.prototype.getClientRects
  const realBox = Element.prototype.getBoundingClientRect
  const realFromPoint = document.elementFromPoint
  let wrapper, useTour, field

  beforeEach(async () => {
    vi.useFakeTimers()
    vi.resetModules()
    localStorage.clear()
    localStorage.setItem('wh11ed-tour-auto', 'on')
    // jsdom lays nothing out: the lit element is a 200×40 box at (20, 100), the rest has none.
    Element.prototype.getClientRects = function () { return this.dataset?.tour ? [{}] : [] }
    Element.prototype.getBoundingClientRect = function () {
      return this.dataset?.tour
        ? { left: 20, top: 100, right: 220, bottom: 140, width: 200, height: 40 }
        : { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }
    }
    const lit = document.createElement('div')
    lit.dataset.tour = 'home-cta'
    field = document.createElement('input')
    lit.appendChild(field)
    document.body.appendChild(lit)
    document.elementFromPoint = (x, y) => (x >= 20 && x <= 220 && y >= 100 && y <= 140 ? field : document.body)
    ;({ useTour } = await import('../composables/useTour.js'))
    const { default: TourOverlay } = await import('./TourOverlay.vue')
    wrapper = mount(TourOverlay, { attachTo: document.body })
    useTour().maybeStart('home')
    vi.advanceTimersByTime(900)
    for (let n = 0; n < 4; n++) { await nextTick(); await flushPromises() }
    vi.advanceTimersByTime(100) // the frame that measures the light
    await nextTick()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.useRealTimers()
    Element.prototype.getClientRects = realRects
    Element.prototype.getBoundingClientRect = realBox
    document.elementFromPoint = realFromPoint
    document.body.innerHTML = ''
  })

  const tap = (x, y) => document.querySelector('.tour-block').dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: x, clientY: y }))

  it('a tap on the dim keeps the chapter and reaches nothing', () => {
    expect(useTour().active.value?.id).toBe('home')
    tap(300, 400)
    expect(useTour().active.value?.id).toBe('home')
    expect(document.activeElement).not.toBe(field)
  })

  it('a tap on the lit field ends the chapter and focuses the field', () => {
    expect(useTour().active.value?.id).toBe('home')
    tap(60, 120)
    expect(useTour().active.value).toBe(null)
    expect(document.activeElement).toBe(field)
  })
})
