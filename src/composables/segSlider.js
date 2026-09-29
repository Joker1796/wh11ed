// The lit half of every `.seg` slides to the button just picked instead of jumping (owner,
// 2026-09-28) — app-wide, from one observer, the way pressFeedback.js serves every button: `.seg`
// is written by hand in a dozen places and none of them has to know.
//
// Until the first switch a `.seg` draws exactly as it always did (the `.on` button paints its own
// accent). On the first switch the observer measures the button that LOST `.on` and the one that
// gained it, gives the `.seg` a `seg-ready` class — from then on the accent is its `::before`
// plate (style.css, present but unseen until then) and the buttons are transparent over it —
// puts the plate on the old button, and moves it to the new one. Its duration is `--motion-med`,
// so reduced motion jumps. A later
// resize (a locale switch changes the labels' widths) re-seats the plate without animating.
//
// A MutationObserver on class changes only, filtered to buttons whose parent is a `.seg`: no
// component had to change, and a `.seg` rendered anywhere later is covered as it stands.

const ready = new WeakSet()
let resizer = null

function place(seg, btn, still) {
  if (!btn) {
    seg.style.setProperty('--seg-w', '0px')
    return
  }
  if (still) seg.classList.add('seg-still')
  // Inside the button's border, not over it: the divider between two buttons is the second one's
  // `border-left`, in a translucent colour, and a plate under it showed through as the lit half
  // spilling past its button (owner, 2026-09-28).
  seg.style.setProperty('--seg-x', `${btn.offsetLeft + btn.clientLeft}px`)
  seg.style.setProperty('--seg-y', `${btn.offsetTop + btn.clientTop}px`)
  seg.style.setProperty('--seg-w', `${btn.clientWidth}px`)
  seg.style.setProperty('--seg-h', `${btn.clientHeight}px`)
  if (still) {
    // Settle the plate where it is before anything moves it, or the two changes fold into one.
    void getComputedStyle(seg, '::before').transform
    seg.classList.remove('seg-still')
  }
}

const litOf = (seg) => seg.querySelector(':scope > button.on')

function onMutations(records) {
  const moves = new Map() // seg → the button that was lit before this batch
  for (const r of records) {
    const btn = r.target
    const seg = btn.parentElement
    if (btn.tagName !== 'BUTTON' || !seg?.classList.contains('seg')) continue
    const wasOn = /(^|\s)on(\s|$)/.test(r.oldValue || '')
    if (wasOn !== btn.classList.contains('on') && !moves.has(seg)) moves.set(seg, null)
    if (wasOn && !btn.classList.contains('on')) moves.set(seg, btn)
  }
  for (const [seg, prev] of moves) {
    if (!ready.has(seg)) {
      if (!prev) continue // nothing to slide from: leave the plain drawing alone
      seg.classList.add('seg-ready')
      place(seg, prev, true)
      ready.add(seg)
      resizer?.observe(seg)
    }
    place(seg, litOf(seg), false)
  }
}

export function installSegSlider(root = document) {
  if (typeof MutationObserver === 'undefined') return
  if (typeof ResizeObserver !== 'undefined') {
    // An observer reports every target once as soon as it is observed — that first report is
    // the switch that just started it, and re-seating then would cancel the very first slide.
    const seen = new WeakSet()
    resizer = new ResizeObserver((entries) => {
      for (const e of entries) {
        if (!seen.has(e.target)) { seen.add(e.target); continue }
        place(e.target, litOf(e.target), true)
      }
    })
  }
  new MutationObserver(onMutations).observe(root, {
    subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true,
  })
}
