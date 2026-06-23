import { useRouter } from 'vue-router'

const ROUTE_MAP = {
  '01': '/basic-rules', '02': '/basic-rules', '03': '/basic-rules',
  '04': '/basic-rules', '05': '/basic-rules', '06': '/basic-rules',
  '07': '/battle-round', '08': '/battle-round', '09': '/battle-round',
  '10': '/battle-round', '11': '/battle-round', '12': '/battle-round',
  '13': '/battlefields', '14': '/battlefields', '15': '/battlefields',
  '16': '/battlefields',
  '17': '/advanced-rules', '18': '/advanced-rules', '19': '/advanced-rules',
  '20': '/advanced-rules', '21': '/advanced-rules', '22': '/advanced-rules',
  '23': '/advanced-rules',
  '24': '/reference',
}

// Within the Event Companion: refs of the form "Label EC:key" or "Label EC:key#anchor".
const EVENT_MAP = {
  intro: '/event-companion',
  sequence: '/event-companion/sequence',
  missions: '/event-companion/missions',
  layouts: '/event-companion/layouts',
  pairings: '/event-companion/pairings',
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
    const route = ROUTE_MAP[deep[1]]
    if (!route) return { label, route: null, anchor: null }
    return { label, route, anchor: `section-${deep[1]}-${deep[2]}-${deep[3]}` }
  }

  const match = text.match(/\b(\d{2})\.(\d{2})$/)
  if (!match) return { label: text, route: null, anchor: null }
  const major = match[1]
  const minor = match[2]
  const label = text.replace(/\s*\d{2}\.\d{2}$/, '').trim()
  const route = ROUTE_MAP[major]
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

export function useRefNavigation() {
  const router = useRouter()

  async function navigateTo({ route, anchor }) {
    await router.push(anchor ? { path: route, hash: '#' + anchor } : { path: route })
    if (!anchor) return
    const scrollToAnchor = () => {
      const el = document.getElementById(anchor)
      if (!el) return false
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
      return true
    }
    // The target view (and its async illustrations) may not be laid out yet right
    // after the route change. Poll up to ~1.5s for the element, then — once it
    // exists — re-scroll after 400ms to correct for late-loading images shifting it.
    const start = performance.now()
    const tick = () => {
      if (scrollToAnchor()) {
        setTimeout(scrollToAnchor, 400)
      } else if (performance.now() - start < 1500) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }

  return { resolveRef, navigateTo }
}
