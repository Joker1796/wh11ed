import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { unitSearchExamples, useUnitSearchGhost } from './useUnitSearchExamples.js'
import { datasheetSearchExamples } from '../data/datasheetSearchExamples.js'

describe('unitSearchExamples', () => {
  const [examples, alias] = datasheetSearchExamples.orks

  it('types the faction\'s own examples, the same in both locales', () => {
    expect(unitSearchExamples('orks', 'en')).toEqual(examples)
  })

  it('adds the RU alias second in the RU box', () => {
    expect(alias).toBeTruthy()
    expect(unitSearchExamples('orks', 'ru')).toEqual([examples[0], alias, ...examples.slice(1)])
  })

  it('has nothing to type for an unknown faction (the plain placeholder stays)', () => {
    expect(unitSearchExamples('nope', 'ru')).toEqual([])
  })
})

describe('useUnitSearchGhost', () => {
  let observed
  beforeEach(() => {
    vi.useFakeTimers()
    globalThis.IntersectionObserver = class {
      constructor(cb) { observed = cb }
      observe() {}
      disconnect() {}
    }
  })
  afterEach(() => {
    vi.useRealTimers()
    delete globalThis.IntersectionObserver
  })

  const host = (query) => mount(defineComponent({
    setup() {
      const el = ref(null)
      const ghost = useUnitSearchGhost({ slug: ref('orks'), locale: ref('en'), query, el })
      return () => h('div', { ref: el }, ghost.ghostText.value)
    },
  }))

  it('stops typing while the box is scrolled out of view, and goes on when it is back', async () => {
    const w = host(ref(''))
    vi.advanceTimersByTime(600)
    await w.vm.$nextTick()
    expect(w.text()).not.toBe('')
    observed([{ isIntersecting: false }])
    const frozen = w.text()
    vi.advanceTimersByTime(5000)
    await w.vm.$nextTick()
    expect(w.text()).toBe(frozen)
    observed([{ isIntersecting: true }])
    vi.advanceTimersByTime(5000)
    await w.vm.$nextTick()
    expect(w.text()).not.toBe(frozen)
  })

  it('does not type over what the reader has typed', async () => {
    const w = host(ref('boy'))
    vi.advanceTimersByTime(5000)
    await w.vm.$nextTick()
    expect(w.text()).toBe('')
  })
})
