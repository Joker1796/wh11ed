import { computed, onMounted, onScopeDispose, ref } from 'vue'
import { datasheetSearchExamples } from '../data/datasheetSearchExamples.js'
import { useTypingPlaceholder } from './useTypingPlaceholder.js'

// The typing examples of a faction-scoped unit search — the faction page's box and the roster
// catalogue's — the same way the palette types its own (useTypingPlaceholder, drawn by
// TypingGhost.vue inside a `.typing-field`). The examples are the faction's own
// (scripts/gen-datasheet-index.mjs picks them from the data the box matches): a unit, an ability
// of the faction, a core ability, a keyword — and in RU, second in the cycle, an alias of a unit,
// the thing a Russian reader would not guess the box understands.
//
// Unlike the palette's, these boxes stay on the page: the cycle stops while the box is scrolled
// out of view or the tab is in the background, so it never ticks unseen.
export function unitSearchExamples(slug, locale) {
  const [examples, alias] = datasheetSearchExamples[slug] || [[], null]
  if (locale !== 'ru' || !alias) return examples
  return [examples[0], alias, ...examples.slice(1)].filter(Boolean)
}

// `slug`, `locale`, `query` — refs/getters; `el` — the ref of the box's wrapper.
export function useUnitSearchGhost({ slug, locale, query, el }) {
  const onScreen = ref(true)
  const pageShown = ref(typeof document === 'undefined' || document.visibilityState !== 'hidden')
  let observer = null
  const onVisibility = () => { pageShown.value = document.visibilityState !== 'hidden' }
  onMounted(() => {
    document.addEventListener('visibilitychange', onVisibility)
    if (typeof IntersectionObserver === 'undefined' || !el.value) return
    observer = new IntersectionObserver(([e]) => { onScreen.value = e.isIntersecting })
    observer.observe(el.value)
  })
  onScopeDispose(() => {
    observer?.disconnect()
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility)
  })
  const { text, animated } = useTypingPlaceholder(
    computed(() => unitSearchExamples(slug.value, locale.value)),
    computed(() => query.value === '' && onScreen.value && pageShown.value),
  )
  return { ghostText: text, typing: animated }
}
