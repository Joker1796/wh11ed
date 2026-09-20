import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, effectScope } from 'vue'
import { useTypingPlaceholder } from './useTypingPlaceholder.js'

// Runs the composable inside a scope so onScopeDispose has something to hang on to.
function mount(examples, active, opts) {
  const scope = effectScope()
  const api = scope.run(() => useTypingPlaceholder(examples, active, opts))
  return { ...api, scope }
}

describe('useTypingPlaceholder', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('types an example letter by letter, holds it, deletes it and moves on', () => {
    const { text } = mount(ref(['ab', 'cd']), ref(true), { start: 0 })
    expect(text.value).toBe('')
    vi.advanceTimersByTime(500) // gap → first letter
    expect(text.value).toBe('a')
    vi.advanceTimersByTime(70)
    expect(text.value).toBe('ab')
    vi.advanceTimersByTime(1800) // hold, then one backspace
    expect(text.value).toBe('a')
    vi.advanceTimersByTime(35)
    expect(text.value).toBe('')
    vi.advanceTimersByTime(500)
    expect(text.value).toBe('c')
  })

  it('wraps around to the first example after the last', () => {
    const { text } = mount(ref(['a', 'b']), ref(true), { start: 1 })
    vi.advanceTimersByTime(500)
    expect(text.value).toBe('b')
    vi.advanceTimersByTime(1800 + 35 + 500)
    expect(text.value).toBe('a')
  })

  it('pauses while inactive and resumes from an empty box', () => {
    const active = ref(true)
    const { text } = mount(ref(['abc']), active, { start: 0 })
    vi.advanceTimersByTime(500 + 70)
    expect(text.value).toBe('ab')
    active.value = false
    vi.advanceTimersByTime(10_000)
    expect(text.value).toBe('ab') // frozen, not ticking
    active.value = true
    vi.advanceTimersByTime(500)
    expect(text.value).toBe('abc') // continues where it left off
  })

  it('restarts from empty when the example list changes (locale switch)', () => {
    const examples = ref(['abc'])
    const { text } = mount(examples, ref(true), { start: 0 })
    vi.advanceTimersByTime(500 + 70)
    expect(text.value).toBe('ab')
    examples.value = ['xyz']
    expect(text.value).toBe('')
    vi.advanceTimersByTime(500)
    expect(text.value).toBe('x')
  })

  it('stops ticking once the scope is disposed', () => {
    const { text, scope } = mount(ref(['abc']), ref(true), { start: 0 })
    vi.advanceTimersByTime(500)
    scope.stop()
    vi.advanceTimersByTime(10_000)
    expect(text.value).toBe('a')
  })

  it('is not animated with an empty list or under prefers-reduced-motion', () => {
    expect(mount(ref([]), ref(true)).animated.value).toBe(false)
    const mm = vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true })
    expect(mount(ref(['abc']), ref(true)).animated.value).toBe(false)
    mm.mockRestore()
  })
})
