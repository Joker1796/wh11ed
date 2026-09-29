// The page swap's two moments, for App.vue's route <Transition> (a plain `fade`, `mode="out-in"`).
// Pages slid sideways down and up a chain and rose from below after the bottom chips until
// 2026-09-29; the owner found the moves jerky and every swap fades now.

// The moment in a page swap when the new page is in the document but not yet visible (its
// transition's `enter`). router/index.js waits for it before setting the scroll, so the reset
// happens while nothing is on screen — not at the click, under a page still fading out. Not
// the old page's after-leave: between the two the document is only as tall as the chrome, a
// scroll set then is clamped to nothing, and the browser's scroll anchoring moved it again once
// the new page arrived (measured 2026-09-28).
let gapWaiters = []
let holding = null // the page container kept from shrinking through a swap, and its release

// `@before-leave`: mark the page on its way out (App.vue's sticky-bar reserve keys off it) and
// keep its container at the page's height until the next one has grown into it. Otherwise the
// document collapses to one screen between the pages, the scroll is clamped to nothing — so a
// reset to the top is a no-op — and the browser, still holding the old offset, puts it back once
// the new page's data arrives: a faction page opened from halfway down the list landed at 572px
// instead of the top (measured 2026-09-28).
export function pageLeaving(el) {
  el.classList?.add('page-leaving')
  const box = el.parentElement
  if (!box || !el.offsetHeight) return
  release()
  box.style.minHeight = `${box.offsetHeight}px`
  holding = { box }
}

// `@enter`: the new page is in the document, still invisible — the moment to set the scroll
// (router/index.js waits for it). The hold comes off as soon as the page has grown into it, or
// once it has stopped growing for 300ms (a page that is simply shorter: holding it longer only
// leaves a blank band above the footer), and after 1.5s whatever happens.
export function pageArrived(el) {
  const ws = gapWaiters
  gapWaiters = []
  ws.forEach((w) => w())
  const h = holding
  if (!h) return
  const need = parseFloat(h.box.style.minHeight) || 0
  const done = () => { if (holding === h) release() }
  h.timer = setTimeout(done, 1500)
  const settle = () => { clearTimeout(h.still); h.still = setTimeout(done, 300) }
  settle()
  if (typeof ResizeObserver !== 'undefined' && el?.nodeType === 1) {
    h.ro = new ResizeObserver(() => { if (el.offsetHeight >= need) done(); else settle() })
    h.ro.observe(el)
  }
}

function release() {
  if (!holding) return
  clearTimeout(holding.timer)
  clearTimeout(holding.still)
  holding.ro?.disconnect()
  holding.box.style.minHeight = ''
  holding = null
}
export function pageSwapGap(timeoutMs = 600) {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, timeoutMs)
    gapWaiters.push(() => { clearTimeout(t); resolve() })
  })
}
