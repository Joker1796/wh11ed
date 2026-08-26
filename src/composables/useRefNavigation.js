import { useRouter } from 'vue-router'

// Chapters 01–25 all live on the one Core Rules page now, so a numeric ref only ever
// resolves to an anchor on it. Kept as a lookup (rather than dropped) because `resolveRef`
// still has to tell a real rule number from arbitrary trailing digits in a label.
const CORE_PATH = '/core-rules'
const CORE_CHAPTERS = 25

// The route a rule number belongs to, or null when the number isn't a chapter at all
// (arbitrary trailing digits in a label must not resolve to a link).
function chapterRoute(major) {
  const n = Number(major)
  return n >= 1 && n <= CORE_CHAPTERS ? CORE_PATH : null
}

// Within the Event Companion: refs of the form "Label EC:key" or "Label EC:key#anchor".
// All seven chapters live on the one /event-companion page now, so `key` no longer picks a
// route — it picks a DEFAULT anchor (the chapter's own), used whenever the ref doesn't name
// a more specific in-page anchor of its own (`#anchor`). Without this fallback, a ref like
// "Mission Sequence EC:sequence" (most of them have no explicit `#anchor`) would resolve to
// no anchor at all and land on the top of the merged page instead of the Sequence chapter.
const EVENT_PATH = '/event-companion'
const EVENT_CHAPTER_ANCHORS = {
  intro: 'ec-chapter-intro',
  sequence: 'ec-chapter-sequence',
  missions: 'ec-chapter-missions',
  layouts: 'ec-chapter-layouts',
  pairings: 'ec-chapter-pairings',
  teams: 'ec-chapter-teams',
  faq: 'ec-chapter-faq',
}

export function resolveRef(text) {
  const ev = text.match(/EC:([a-z-]+)(?:#([\w-]+))?$/)
  if (ev) {
    const defaultAnchor = EVENT_CHAPTER_ANCHORS[ev[1]] || null
    const label = text.replace(/\s*EC:[a-z-]+(?:#[\w-]+)?$/, '').trim()
    if (!defaultAnchor) return { label, route: null, anchor: null }
    return { label, route: EVENT_PATH, anchor: ev[2] || defaultAnchor }
  }

  // Three-level refs (x.x.x → SubRuleBlock anchor section-NN-NN-NN). Checked first so
  // the two-level matcher below doesn't capture only the leading x.x.
  const deep = text.match(/\b(\d{2})\.(\d{2})\.(\d{2})$/)
  if (deep) {
    const label = text.replace(/\s*\d{2}\.\d{2}\.\d{2}$/, '').trim()
    const route = chapterRoute(deep[1])
    if (!route) return { label, route: null, anchor: null }
    return { label, route, anchor: `section-${deep[1]}-${deep[2]}-${deep[3]}` }
  }

  const match = text.match(/\b(\d{2})\.(\d{2})$/)
  if (!match) return { label: text, route: null, anchor: null }
  const major = match[1]
  const minor = match[2]
  const label = text.replace(/\s*\d{2}\.\d{2}$/, '').trim()
  const route = chapterRoute(major)
  if (!route) return { label, route: null, anchor: null }
  let anchor
  if (minor === '00') {
    anchor = 'section-' + major
  } else if (major === '24') {
    anchor = 'ability-' + major + '_' + minor
  } else {
    anchor = 'section-' + major + '-' + minor
  }
  return { label, route, anchor }
}

// Multiple independent callers can each ask to scroll to an anchor for the very same
// navigation (e.g. navigateTo() right after a router.push, AND the destination page's own
// onMounted/route.hash watcher reacting to that same push) — their polling loops would
// otherwise run concurrently and race, each computing a position off `content-visibility:
// auto` geometry that's still settling, with whichever loop's window.scrollTo happens to
// fire last "winning" with a possibly stale value. A generation token makes every new
// scrollToAnchor() call supersede any still-running earlier one instead of fighting it.
let scrollGeneration = 0

// Run a scroll with NO animation, whatever the page's CSS says.
//
// `behavior: 'instant'` on its own is not enough: Safari only understood the value from 17.4, and
// before that the `scroll-behavior: smooth` this app sets on <html> (style.css) won — so each of
// the two scrolls below became an animation, and the second interrupted the first halfway. That is
// what an iPhone reader sees as "search sometimes lands in the wrong place". Neutralising the CSS
// for the duration works on every engine, including the ones that do support the option.
function instantly(fn) {
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  try { fn() } finally { root.style.scrollBehavior = prev }
}

// Is the viewport done moving? On iOS the search palette has the on-screen keyboard up, and
// closing it resizes the visual viewport over ~300ms while Safari scrolls the page itself — align
// during that and we are aiming at a moving target. Two consecutive frames of the same height is
// "settled"; a browser that never reports one is capped out by the caller so nothing can stall.
let lastViewportH = null
let steadyFrames = 0
function viewportSettled(elapsed) {
  const h = window.visualViewport?.height ?? window.innerHeight
  if (h === lastViewportH) steadyFrames++
  else { lastViewportH = h; steadyFrames = 0 }
  return steadyFrames >= 2 || elapsed > 500
}

// Robustly scroll the given element id into view below the sticky header. The target
// view (and its async illustrations) may not be laid out yet right after a route change,
// so poll up to ~1.5s for the element, then — once it exists — re-check after 400ms to
// correct for late-loading images shifting it.
export function scrollToAnchor(anchor, offset = 100) {
  const token = ++scrollGeneration
  // Stratagems render as StratCards with `strat-15-XX` ids, but numeric refs like (15.08)
  // resolve to `section-15-08`; fall back to the strat- id when there's no matching
  // section- element so those refs still land on the card.
  const findEl = () => document.getElementById(anchor)
    || (anchor.startsWith('section-') && document.getElementById(anchor.replace(/^section-/, 'strat-')))

  const align = () => {
    const el = findEl()
    if (!el) return false
    // `el.getBoundingClientRect().top + window.scrollY` looks right but isn't: on a fresh
    // navigation every `.core-chapter` (content-visibility: auto) is still collapsed to its
    // contain-intrinsic-size placeholder, including chapters that come BEFORE the target —
    // they're the target's siblings, not its ancestors, so resolving the target's own layout
    // does nothing for them, and their placeholder height (not their real one) throws the
    // hand-computed sum off, landing the scroll in an earlier chapter entirely.
    // scrollIntoView() doesn't have that problem — the browser resolves the true position
    // itself, correctly walking any still-collapsed content along the way.
    instantly(() => {
      el.scrollIntoView({ block: 'start' })
      window.scrollBy(0, -offset)
    })
    return true
  }
  // The 400ms follow-up is only meant to correct a few dozen px of drift from a late-loading
  // image — NOT to re-resolve the whole page again. Calling scrollIntoView() a second time
  // makes the browser re-settle content-visibility for every chapter from scratch (the ones
  // above are now far off-screen), and that second resolve landed WORSE than the first in
  // practice, jumping several sections backward. A plain getBoundingClientRect() delta is
  // safe here because the target's own chapter is already genuinely rendered by this point.
  const nudge = () => {
    if (tookOver) return    // the reader started scrolling themselves; do not yank the page back
    const el = findEl()
    if (!el) return
    const drift = el.getBoundingClientRect().top - offset
    // Instant, like the align above and for the same reason. This used to be `smooth`, which on a
    // phone meant a second animation still running when the keyboard finished dismissing.
    if (Math.abs(drift) > 4) instantly(() => window.scrollBy(0, drift))
  }

  // A reader who starts scrolling has taken the page over — the follow-up correction is then a
  // page yanked out from under them, which is worse than a few px of drift.
  let tookOver = false
  const onUser = () => { tookOver = true }
  const listen = (on) => {
    for (const ev of ['touchstart', 'wheel']) {
      if (on) window.addEventListener(ev, onUser, { passive: true })
      else window.removeEventListener(ev, onUser)
    }
  }
  listen(true)

  const start = performance.now()
  const tick = () => {
    if (token !== scrollGeneration) { listen(false); return } // superseded by a newer call
    const elapsed = performance.now() - start
    // Wait for the viewport before aligning, then for the element. Both can stall; the 1.5s cap
    // is the same one this loop has always had.
    if (viewportSettled(elapsed) && align()) {
      setTimeout(() => {
        if (token === scrollGeneration) nudge()
        listen(false)
      }, 400)
    } else if (elapsed < 1500) {
      requestAnimationFrame(tick)
    } else {
      listen(false)
    }
  }
  requestAnimationFrame(tick)
}

export function useRefNavigation() {
  const router = useRouter()

  async function navigateTo({ route, anchor }) {
    await router.push(anchor ? { path: route, hash: '#' + anchor } : { path: route })
    if (anchor) scrollToAnchor(anchor)
  }

  return { resolveRef, navigateTo }
}
