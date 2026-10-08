import { motionMs } from './motionToken.js'

// A dialog goes away the way it came (owner, 2026-10-08: every dialog of the tracker appearing and
// leaving smoothly, and one changing into another smoothly too).
//
// BaseModal is mounted by its consumer's `v-if`, so the moment it is told to close it is already
// being unmounted — a <Transition> leave phase inside it has nothing to play on, and one outside it
// would have to outlive that v-if in every one of the app's dialogs. It also used to be the reason
// close stayed instant: a leave phase kept the real dialog in the DOM and raced useModalA11y's focus
// restore. So the real dialog goes at once, as before — focus returns, nothing of it is reachable —
// and a COPY of it plays the leave: inert, hidden from assistive tech, removed when it is done.
//
// One dialog closing as another opens (a stratagem's card handing over to its play dialog) is a
// SWAP: the dim behind them stays put — the leaving copy drops its backdrop at once and the new one
// opens with its backdrop already there (`swapping()`, read by BaseModal as it mounts) — and only
// the two sheets move.

const ghosts = new Map() // copy → its backdrop's fade

// Is a dialog leaving right now? A dialog opening meanwhile is a swap, not a fresh open.
export function swapping() {
  return ghosts.size > 0
}

// A new dialog arrived while copies are leaving: they hand the dim over to it.
export function handOver() {
  for (const [g, dimming] of ghosts) {
    dimming.cancel() // an animation outranks the inline style below
    g.style.background = 'transparent'
  }
}

export function leaveCopy(overlay) {
  if (!overlay?.isConnected || typeof overlay.animate !== 'function') return
  const ms = motionMs('--motion-med')
  if (!ms) return
  const sheet = overlay.querySelector('.modal')
  const ghost = overlay.cloneNode(true)
  ghost.classList.remove('modal-enter-active', 'modal-enter-from', 'modal-enter-to')
  ghost.setAttribute('aria-hidden', 'true')
  ghost.inert = true
  ghost.style.pointerEvents = 'none'
  // Ids would be doubled while the copy lives (the title's, any field's).
  for (const el of ghost.querySelectorAll('[id]')) el.removeAttribute('id')
  const dim = getComputedStyle(overlay).backgroundColor
  document.body.appendChild(ghost)
  // A copy starts at the top of whatever scrolled: put each scroll back where the reader left it.
  const from = [overlay, ...overlay.querySelectorAll('*')]
  const to = [ghost, ...ghost.querySelectorAll('*')]
  from.forEach((el, i) => { if (el.scrollTop) to[i].scrollTop = el.scrollTop })

  const phone = window.matchMedia('(max-width: 560px)').matches
  const easing = 'cubic-bezier(0.4, 0, 1, 1)'
  ghosts.set(ghost, ghost.animate([{ backgroundColor: dim }, { backgroundColor: 'transparent' }], { duration: ms, easing, fill: 'forwards' }))
  // From where the reader saw it — a dialog closed while still rising is mid-transform.
  const start = (sheet && getComputedStyle(sheet).transform) || 'none'
  const out = ghost.querySelector('.modal')?.animate(
    phone
      ? [{ transform: start }, { transform: 'translateY(100%)' }]
      : [{ transform: start, opacity: 1 }, { transform: 'scale(0.94)', opacity: 0 }],
    { duration: ms, easing, fill: 'forwards' },
  )
  const done = () => { ghosts.delete(ghost); ghost.remove() }
  if (out) out.onfinish = done
  else setTimeout(done, ms)
}
