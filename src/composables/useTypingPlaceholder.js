import { ref, watch, onScopeDispose } from 'vue'

// Cycles a list of example queries through an empty input the way a person would type them:
// letter by letter, a pause to read, backspaced, on to the next. Returns `text` (what to show
// now) and `animated` — false when the user asked for reduced motion or there is nothing to
// cycle, in which case the caller keeps its static placeholder.
//
// `examples` and `active` are refs: the list follows the locale, and `active` goes false while
// the user has typed something (the ghost text is hidden then, so ticking would be waste).

const TYPE_MS = 70
const DELETE_MS = 35
const HOLD_MS = 1800 // fully typed, waiting to be read
const GAP_MS = 500 // empty, before the next example starts

export function useTypingPlaceholder(examples, active, { start } = {}) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const animated = ref(!reduce && examples.value.length > 0)
  const text = ref('')

  let timer = null
  let index = start ?? Math.floor(Math.random() * Math.max(examples.value.length, 1))
  let shown = 0 // characters of examples[index] on screen
  let deleting = false

  function schedule(ms) {
    timer = setTimeout(step, ms)
  }

  function step() {
    const list = examples.value
    if (!list.length) return
    const word = list[index % list.length]
    if (!deleting) {
      shown++
      text.value = word.slice(0, shown)
      if (shown < word.length) return schedule(TYPE_MS)
      deleting = true
      return schedule(HOLD_MS)
    }
    shown--
    text.value = word.slice(0, shown)
    if (shown > 0) return schedule(DELETE_MS)
    deleting = false
    index = (index + 1) % list.length
    schedule(GAP_MS)
  }

  function stop() {
    clearTimeout(timer)
    timer = null
  }

  function run() {
    stop()
    if (!animated.value || !active.value) return
    schedule(GAP_MS)
  }

  // Sync watchers: a stale timer must not fire between the change and the next tick (nothing
  // here touches the DOM, so there is no batching to gain). A locale switch mid-word would
  // leave a half-typed example of the other language: restart from an empty box instead.
  watch(examples, () => {
    shown = 0
    deleting = false
    text.value = ''
    animated.value = !reduce && examples.value.length > 0
    run()
  }, { flush: 'sync' })
  watch(active, run, { immediate: true, flush: 'sync' })
  onScopeDispose(stop)

  return { text, animated }
}
