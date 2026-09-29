import { watch } from 'vue'
import { motionMs } from './motionToken.js'

// Moves elements between places — including from one section to another — as if each were the
// same card travelling (FLIP). Every element under `root` carrying `data-flip="<key>"` is measured
// before `source` changes the DOM and slid from there to wherever the element with the same key
// stands afterwards, whatever list or section rendered it. <TransitionGroup> cannot do this: it
// only moves children of one group, and a pinned faction leaves its group for another.
//
// A key with no earlier position (a heading that just appeared) fades in; one that is gone simply
// is. Duration is the `--motion-move` token, so reduced motion (token → 0) skips the whole thing.
// Driven by watchers rather than update hooks because the list is often rendered in a slot, which
// re-renders the CHILD (BaseModal), not the component that owns the data.
// `onAppear(nodes)`, optional, is handed the elements whose keys are new this time (after they have
// started fading in) — a caller that wants to point at what just arrived does it there.
export function useFlipMove(source, root, { onAppear } = {}) {
  let before = null

  watch(source, () => { before = positions(root.value) }, { flush: 'pre', deep: true })
  watch(source, () => {
    const was = before
    before = null
    const el = root.value
    if (!was || !el) return
    const ms = motionMs('--motion-move')
    const appeared = []
    for (const node of el.querySelectorAll('[data-flip]')) {
      // A node on its way out — a <TransitionGroup> leave (the `sift` recipe hides it outright)
      // still in the DOM with the same key as its replacement — is not a place anything travels to.
      if ([...node.classList].some((c) => c.endsWith('-leave-active'))) continue
      const prev = was.get(node.dataset.flip)
      if (!prev) {
        appeared.push(node)
        if (ms) node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: 'ease' })
        continue
      }
      if (!ms) continue
      const now = node.getBoundingClientRect()
      const dx = prev.left - now.left
      const dy = prev.top - now.top
      if (!dx && !dy) continue
      node.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: ms, easing: 'ease' },
      )
    }
    if (appeared.length) onAppear?.(appeared)
  }, { flush: 'post', deep: true })
}

function positions(el) {
  const map = new Map()
  if (!el) return map
  for (const node of el.querySelectorAll('[data-flip]')) map.set(node.dataset.flip, node.getBoundingClientRect())
  return map
}
