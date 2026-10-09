// The player's real path to the installed app (owner, 2026-10-09): they find a rule from a search,
// read it on the SITE, come back, build a list or track a game — and only then does an app on the
// phone start to pay (no signal at the table, nothing lost). So the site does not ask for an
// install on arrival; it offers one once, at the first sign the player uses it for real.
//
// Light on purpose: App.vue and the navbar read it on every page, so it touches localStorage
// directly instead of importing the roster or tracker stores.
import { getItem, setItem } from './safeStorage.js'
import { isStandaloneDisplay } from './standalone.js'

export const VISITS_KEY = 'wh11ed-visits'
export const OFFER_KEY = 'wh11ed-install-offer' // set once the player answered the offer
export const APP_FIRST_KEY = 'wh11ed-app-first-run' // the installed app's own first launch, seen
const SESSION_KEY = 'wh11ed-visit-counted'
const OFFER_SESSION_KEY = 'wh11ed-install-offer-shown'

// The stand only (stripped from a build): `?preview=offer | offer-ios | first | first-ios` shows the
// offer or the installed app's first card in any browser, the iPhone wording included — a dev
// server cannot be installed, so neither would ever come up there by itself.
export const preview = import.meta.env.DEV && typeof location !== 'undefined'
  ? new URLSearchParams(location.search).get('preview')
  : null

const json = (key, fallback) => {
  try { return JSON.parse(getItem(key) || 'null') ?? fallback } catch { return fallback }
}

// One visit per browser session, however many pages it opens.
export function countVisit() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch { return }
  setItem(VISITS_KEY, String((Number(getItem(VISITS_KEY)) || 0) + 1))
}

// What this browser holds: saved lists (not drafts) and games, finished or running.
export function localWork() {
  const env = json('wh11ed-rosters', {})
  const rosters = (Array.isArray(env.rosters) ? env.rosters : []).filter((r) => r && !r.draft).length
  const history = json('wh11ed-tracker-history', [])
  const current = json('wh11ed-tracker-current', null)
  const games = (Array.isArray(history) ? history.length : 0) + (current?.phase === 'playing' ? 1 : 0)
  return { rosters, games }
}

// Any iPhone or iPad, whatever the browser: there an installed app keeps its own storage, apart
// from Safari's.
export function isIos() {
  if (preview?.endsWith('-ios')) return true
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  return /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

// Where the offer may appear: never over a game in progress, a list being built or a join.
const BUSY = [/^\/tracker\/game/, /^\/tracker\/join/, /^\/roster\/new/, /^\/roster\/[^/]+$/, /^\/broadcast/]

// The offer is due when this browser can install, has not answered it, and the player has used the
// site for real: a saved list, a game, or a third visit.
export function offerDue(path, { installable }) {
  if (!installable || isStandaloneDisplay() || getItem(OFFER_KEY)) return false
  try { if (sessionStorage.getItem(OFFER_SESSION_KEY)) return false } catch { /* show it */ }
  if (BUSY.some((re) => re.test(path))) return false
  const { rosters, games } = localWork()
  return rosters > 0 || games > 0 || (Number(getItem(VISITS_KEY)) || 0) >= 3
}
// Shown this session: not again on every page until it is answered.
export function offerShown() {
  try { sessionStorage.setItem(OFFER_SESSION_KEY, '1') } catch { /* ignore */ }
}
export function offerAnswered() { setItem(OFFER_KEY, '1') }

// The installed app's first launch: its own short welcome, once.
export const appFirstRunDue = () => isStandaloneDisplay() && !getItem(APP_FIRST_KEY)
export const appFirstRunSeen = () => setItem(APP_FIRST_KEY, '1')
