import { onUnmounted, ref } from 'vue'

// `matchMedia` as a ref. Three places had written this out by hand — RosterUnitList (deciding
// between an inline accordion and a modal), GameSetup, useBackToTop — each with its own listener
// and its own cleanup, and the fourth was about to be written for the roster builder's desk
// layout.
//
// Absent `matchMedia` (jsdom) the ref stays false, which every caller reads as "the narrow
// arrangement": the layout with no teleport and no viewport maths in it, and so the deterministic
// one to test against.
export function useMediaQuery(query) {
  const matches = ref(false)
  const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query) : null
  if (!mq) return matches
  matches.value = mq.matches
  const onChange = (e) => { matches.value = e.matches }
  mq.addEventListener('change', onChange)
  onUnmounted(() => mq.removeEventListener('change', onChange))
  return matches
}
