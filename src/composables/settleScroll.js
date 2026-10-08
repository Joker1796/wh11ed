// A block switching in place for a SHORTER one (another side's stratagems, roster or army card)
// shortens the page under a reader scrolled near its foot, and the browser clamps the scroll in
// one frame — the screen leaps up (owner, 2026-10-08). So the page keeps its height through the
// switch (`hold`, before the DOM changes), and after it (`settle`) glides to the new foot, or
// further up by `by` px when the caller wants its tabs back in view, before letting go. The glide
// is timed off the fade's token, so reduced motion moves the page in one step, as before.
//
// The new foot is read off a zero-height marker kept at the end of <body>: the held min-height
// only extends the body below it, so the marker still stands where the content now ends.

let marker = null
let held = null // { tail, frame, to, ms } while a hold is on

function markerTop() {
  if (!marker?.isConnected) {
    marker = document.createElement('div')
    marker.setAttribute('aria-hidden', 'true')
    document.body.appendChild(marker)
  }
  return marker.getBoundingClientRect().top + window.scrollY
}

function release() {
  if (!held) return
  cancelAnimationFrame(held.frame)
  document.body.style.minHeight = ''
  held = null
}

export function hold() {
  if (held) {
    cancelAnimationFrame(held.frame) // a switch mid-glide: keep the height it was holding
    return
  }
  const doc = document.documentElement.scrollHeight
  held = { tail: doc - markerTop(), frame: 0, to: Infinity }
  document.body.style.minHeight = getComputedStyle(document.body).height
}

// Several panels kept built may switch on one tap (each fades its own side in): every settle of
// one hold names a place, and a frame later the glide goes to the highest of them. The new foot is
// read from then on: a screen may still fit its height to the new block after the switch (the
// tracker's fitHeight, on the next tick), and a foot read before that let the page leap at the end.
export function settle(ms, by = 0) {
  if (!held) return
  held.to = Math.min(held.to, window.scrollY + by)
  held.ms = ms
  cancelAnimationFrame(held.frame)
  held.frame = requestAnimationFrame(glide)
}

// Where the glide is going: the place asked for, but never below the content's foot — read again
// on every frame, since a block can still grow or shrink while the page travels (stratagems that
// arrive a moment after their tab).
const target = () => Math.max(0, Math.min(held.to, markerTop() + held.tail - window.innerHeight))

function glide() {
  const from = window.scrollY
  const ms = held.ms
  if (target() >= from || !ms) {
    const to = target()
    release()
    if (to < from) window.scrollTo({ top: to, behavior: 'instant' })
    return
  }
  const t0 = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - t0) / ms)
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 // ease-in-out, as the fade
    window.scrollTo({ top: from + (target() - from) * eased, behavior: 'instant' })
    if (t < 1) held.frame = requestAnimationFrame(step)
    else release()
  }
  held.frame = requestAnimationFrame(step)
}
