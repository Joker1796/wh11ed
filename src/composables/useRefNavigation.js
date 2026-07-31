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
const EVENT_MAP = {
  intro: '/event-companion',
  sequence: '/event-companion/sequence',
  missions: '/event-companion/missions',
  layouts: '/event-companion/layouts',
  pairings: '/event-companion/pairings',
  teams: '/event-companion/teams',
  faq: '/event-companion/faq',
}

export function resolveRef(text) {
  const ev = text.match(/EC:([a-z-]+)(?:#([\w-]+))?$/)
  if (ev) {
    const route = EVENT_MAP[ev[1]] || null
    const label = text.replace(/\s*EC:[a-z-]+(?:#[\w-]+)?$/, '').trim()
    return { label, route, anchor: route ? (ev[2] || null) : null }
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

// Robustly scroll the given element id into view below the sticky header. The target
// view (and its async illustrations) may not be laid out yet right after a route change,
// so poll up to ~1.5s for the element, then — once it exists — re-scroll after 400ms to
// correct for late-loading images shifting it.
export function scrollToAnchor(anchor, offset = 100) {
  const doScroll = () => {
    // Stratagems render as StratCards with `strat-15-XX` ids, but numeric refs like
    // (15.08) resolve to `section-15-08`; fall back to the strat- id when there's no
    // matching section- element so those refs still land on the card.
    const el = document.getElementById(anchor)
      || (anchor.startsWith('section-') && document.getElementById(anchor.replace(/^section-/, 'strat-')))
    if (!el) return false
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    return true
  }
  const start = performance.now()
  const tick = () => {
    if (doScroll()) {
      setTimeout(doScroll, 400)
    } else if (performance.now() - start < 1500) {
      requestAnimationFrame(tick)
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
