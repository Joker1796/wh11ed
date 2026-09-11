import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { resolveRef, scrollToAnchor } from './useRefNavigation.js'

describe('resolveRef — EC: (Event Companion) tokens', () => {
  it('resolves to the chapter anchor by default when the ref names no explicit #anchor', () => {
    // Most EC: refs in the prose have no explicit anchor — without a default, this used to
    // resolve to no anchor at all, landing on the top of the merged page instead of the
    // chapter (a regression once all seven chapters became one page).
    expect(resolveRef('Mission Sequence EC:sequence')).toEqual({
      label: 'Mission Sequence',
      route: '/event-companion',
      anchor: 'ec-chapter-sequence',
    })
    expect(resolveRef('Terrain & Layouts EC:layouts')).toEqual({
      label: 'Terrain & Layouts',
      route: '/event-companion',
      anchor: 'ec-chapter-layouts',
    })
    expect(resolveRef('Teams EC:teams')).toEqual({
      label: 'Teams',
      route: '/event-companion',
      anchor: 'ec-chapter-teams',
    })
  })

  it('an explicit #anchor overrides the chapter default', () => {
    expect(resolveRef('Muster Armies EC:sequence#step-1')).toEqual({
      label: 'Muster Armies',
      route: '/event-companion',
      anchor: 'step-1',
    })
  })

  it('an unknown EC: key resolves to no route', () => {
    expect(resolveRef('Nowhere EC:nope')).toEqual({
      label: 'Nowhere',
      route: null,
      anchor: null,
    })
  })
})

describe('resolveRef — core rule numbers', () => {
  it('resolves a two-level rule number to its section anchor on /core-rules', () => {
    expect(resolveRef('Moving Models 03.02')).toEqual({
      label: 'Moving Models',
      route: '/core-rules',
      anchor: 'section-03-02',
    })
  })

  it('does not treat an out-of-range chapter number as a rule reference', () => {
    expect(resolveRef('Some Label 99.01')).toEqual({
      label: 'Some Label',
      route: null,
      anchor: null,
    })
  })
})

// scrollToAnchor is the one piece of this module with real browser behaviour in it, and the bug it
// was rewritten for is invisible on a desktop: an iPhone reader picking a search result sometimes
// landed in the wrong place. Both halves of the cause are pinned here.
describe('scrollToAnchor', () => {
  let el
  let scrolls

  // The align waits for two steady frames before it fires, so give the loop a handful of them.
  const frames = () => new Promise((r) => setTimeout(r, 120))

  beforeEach(() => {
    scrolls = []
    document.documentElement.style.scrollBehavior = 'smooth'
    el = document.createElement('div')
    el.id = 'section-03-02'
    // jsdom implements neither of these; record what a browser would have been asked to do, and
    // record the CSS in force AT THAT MOMENT — which is the whole point of the fix.
    el.scrollIntoView = vi.fn(() => scrolls.push({ kind: 'into', css: document.documentElement.style.scrollBehavior }))
    document.body.appendChild(el)
    window.scrollBy = vi.fn((...args) => scrolls.push({ kind: 'by', args, css: document.documentElement.style.scrollBehavior }))
  })
  afterEach(() => {
    document.body.innerHTML = ''
    document.documentElement.style.scrollBehavior = ''
  })

  // The page sets `scroll-behavior: smooth` on <html>, and Safari understood `behavior:'instant'`
  // only from 17.4 — so before this, both scrolls animated and the second interrupted the first.
  it('scrolls with the page’s smooth behaviour switched off, and puts it back', async () => {
    scrollToAnchor('section-03-02')
    await frames()
    expect(scrolls.length).toBeGreaterThanOrEqual(2)
    expect(scrolls.map((s) => s.kind)).toEqual(['into', 'by'])
    expect(scrolls.every((s) => s.css === 'auto')).toBe(true)         // …during
    expect(document.documentElement.style.scrollBehavior).toBe('smooth') // …and restored after
  })

  it('offsets below the sticky header, without relying on the behavior option', async () => {
    scrollToAnchor('section-03-02', 120)
    await frames()
    const by = scrolls.find((s) => s.kind === 'by')
    expect(by.args).toEqual([0, -120])          // positional form: no options bag to be ignored
    expect(el.scrollIntoView).toHaveBeenCalledWith({ block: 'start' })
  })

  // On iOS the search palette has the keyboard up; dismissing it resizes the visual viewport over
  // ~300ms while Safari scrolls the page itself. Aligning mid-flight is aiming at a moving target.
  it('waits for the visual viewport to stop moving before it aligns', async () => {
    let h = 500
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: { get height() { return h } } })
    const shrink = setInterval(() => { h -= 10 }, 5)
    scrollToAnchor('section-03-02')
    await new Promise((r) => setTimeout(r, 100))
    expect(scrolls).toHaveLength(0)              // still moving → nothing scrolled yet
    clearInterval(shrink)
    await frames()
    expect(scrolls.length).toBeGreaterThan(0)    // settled → aligned
    delete window.visualViewport
  })

  it('leaves the page alone once the reader starts scrolling themselves', async () => {
    vi.useFakeTimers()
    try {
      scrollToAnchor('section-03-02')
      await vi.advanceTimersByTimeAsync(60)
      const afterAlign = scrolls.length
      expect(afterAlign).toBeGreaterThan(0)
      el.getBoundingClientRect = () => ({ top: 400 })   // a big drift the nudge would correct
      window.dispatchEvent(new Event('touchstart'))
      await vi.advanceTimersByTimeAsync(500)
      expect(scrolls).toHaveLength(afterAlign)          // …but the reader took over
    } finally {
      vi.useRealTimers()
    }
  })
})
