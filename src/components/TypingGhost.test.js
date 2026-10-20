import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import TypingGhost from './TypingGhost.vue'
import { useTypingPlaceholder } from '../composables/useTypingPlaceholder.js'

// The example a search box types re-renders the ghost alone. Read by the host, it re-rendered the
// host on every letter — the roster catalogue and the card open over it (2026-10-20).
describe('TypingGhost', () => {
  afterEach(() => vi.useRealTimers())
  it('types without re-rendering the box that holds it', async () => {
    vi.useFakeTimers()
    let hostRenders = 0
    const Host = defineComponent({
      setup() {
        const { ghost } = useTypingPlaceholder(ref(['Necron Warriors']), ref(true), { start: 0 })
        return () => { hostRenders++; return h('div', [h(TypingGhost, { ghost })]) }
      },
    })
    const w = mount(Host)
    const before = hostRenders
    vi.advanceTimersByTime(500 + 70 * 6)
    await nextTick()
    expect(w.find('.tg-text').text()).toBe('Necron')
    expect(hostRenders).toBe(before)
  })
})
