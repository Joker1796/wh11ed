import { ref } from 'vue'
import { API_BASE_URL } from '../config.js'

// Module-singleton auth store (same pattern as useLocale.js). App-wide: the account is not a
// tracker feature — both the tracker and the roster builder sync through it, and the way in and
// out is the navbar's account menu, reachable from any page.
//
// Security: the access token lives in memory only (never localStorage) — protects it from XSS.
// On reload it's gone and is re-obtained via a silent /auth/refresh against the HttpOnly cookie.

// 'idle' = not yet checked this load; 'authed' / 'anon' after a refresh attempt; 'down' — the
// server did not answer while the browser says it is online. Not 'anon': the refresh cookie is
// still there, and a screen that says "sign in" sends the player to a dead login page (the Yandex
// Cloud outage of 2026-10-11, when the gateway answered 502 to everything).
const status = ref('idle')
const user = ref(null) // { id, email, displayName }
let accessToken = null
let refreshing = null // de-dupes concurrent refreshes

function api(path) {
  return `${API_BASE_URL}${path}`
}

// ─── DEV-only mock ────────────────────────────────────────────────────────────────────────────
// Lets you exercise the signed-in UI locally without real OAuth (which redirects to the prod site).
// Everything here is behind `import.meta.env.DEV`, so Vite strips it from production builds.
const DEV = import.meta.env.DEV
const MOCK_FLAG = 'wh11ed-dev-mock-auth'
const MOCK_USER = { id: 'mock', email: 'test@local', displayName: 'Tester' }
let mockActive = false
const mockCloud = new Map() // gameId → full game blob (a fake backend store)
// Broadcast goes through localStorage, not a Map: the overlay is ANOTHER TAB of the same
// origin (per-tab module state can't reach it), and localStorage is the one same-origin
// channel a polling read loop can watch without a server in the loop.
const MOCK_BC_KEY = 'wh11ed-dev-mock-broadcast'
function mockBcRead() {
  try { return JSON.parse(localStorage.getItem(MOCK_BC_KEY) || 'null') } catch { return null }
}
function mockBcWrite(v) {
  try {
    if (v) localStorage.setItem(MOCK_BC_KEY, JSON.stringify(v))
    else localStorage.removeItem(MOCK_BC_KEY)
  } catch { /* ignore */ }
}
const mockRosterCloud = new Map() // rosterId → full roster blob
const mockRosterGraves = new Map() // rosterId → deletedAt (the API tombstones, so the mock does too)

function mockEnabled() {
  return DEV && mockActive
}

function mockJson(body, statusCode = 200) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}

function mockRosterMeta(r) {
  return {
    rosterId: r.id,
    name: r.name || '',
    faction: r.faction || null,
    updatedAt: r.updatedAt || 0,
    points: r.summary?.points || 0,
    unitCount: r.summary?.unitCount || 0,
  }
}

function mockMeta(g) {
  return {
    gameId: g.id,
    createdAt: g.createdAt,
    finishedAt: g.finishedAt,
    resultSummary: g.result?.totals ? g.result.totals.join('–') : '',
    players: g.players?.map((p) => p.name) ?? [],
  }
}

// A shared game (useParty.js) cannot be mocked: its whole point is another phone reached
// through a real server. On the stand the mock forwards /party calls to the local backend with
// a token that backend minted for the purpose (`npm run dev:jwt` in wh11ed-api), pasted into
// localStorage under this key. Without one, the forwarded call is simply 401 — the dialog
// then says the sync errored, which is the truth.
const DEV_JWT_KEY = 'wh11ed-dev-jwt'
function devJwt() {
  try { return localStorage.getItem(DEV_JWT_KEY) || '' } catch { return '' }
}

// Stand-in for the API: same shapes useCloudSync expects, no network.
function mockFetch(path, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase()
  if (path.startsWith('/party')) {
    return fetch(api(path), {
      ...opts,
      headers: {
        ...(opts.headers || {}),
        Authorization: `Bearer ${devJwt()}`,
        ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
      },
    })
  }
  if (path === '/me') return mockJson(MOCK_USER)
  if (path === '/games' && method === 'GET') {
    return mockJson({ games: [...mockCloud.values()].map(mockMeta) })
  }
  if (path === '/rosters' && method === 'GET') {
    return mockJson({
      rosters: [
        ...[...mockRosterCloud.values()].map(mockRosterMeta),
        ...[...mockRosterGraves].map(([rosterId, deletedAt]) => ({ rosterId, deleted: true, deletedAt })),
      ],
    })
  }
  const mr = path.match(/^\/rosters\/([^?]+)\??(.*)$/)
  if (mr) {
    const id = decodeURIComponent(mr[1])
    if (method === 'PUT') {
      mockRosterCloud.set(id, JSON.parse(opts.body))
      mockRosterGraves.delete(id)
      return mockJson({ ok: true, rosterId: id })
    }
    if (method === 'GET') {
      const r = mockRosterCloud.get(id)
      return r ? mockJson(r) : mockJson({ error: 'not_found' }, 404)
    }
    if (method === 'DELETE') {
      if (mockRosterCloud.has(id)) {
        mockRosterGraves.set(id, Number(new URLSearchParams(mr[2]).get('at')) || Date.now())
      }
      mockRosterCloud.delete(id)
      return mockJson({ ok: true })
    }
  }
  // Bug reports: accept and drop — the stand has no inbox, and the modal only needs an ok.
  if (path === '/feedback' && method === 'POST') return mockJson({ ok: true })
  // Broadcast (matched before the generic /games/:id, which would swallow the sub-path).
  const mb = path.match(/^\/games\/(.+)\/broadcast$/)
  if (mb) {
    const gameId = decodeURIComponent(mb[1])
    if (method === 'POST') {
      const token = 'mock-' + Math.random().toString(36).slice(2, 10)
      mockBcWrite({ token, gameId, payload: null, updatedAt: null })
      return mockJson({ token })
    }
    if (method === 'GET') {
      const b = mockBcRead()
      return b && b.gameId === gameId ? mockJson({ token: b.token }) : mockJson({ error: 'not_found' }, 404)
    }
    if (method === 'DELETE') {
      mockBcWrite(null)
      return mockJson({ ok: true })
    }
  }
  const ml = path.match(/^\/broadcast\/live\/(.+)$/)
  if (ml && method === 'PUT') {
    const b = mockBcRead()
    if (!b || b.gameId !== decodeURIComponent(ml[1])) return mockJson({ error: 'not_found' }, 404)
    mockBcWrite({ ...b, payload: JSON.parse(opts.body), updatedAt: new Date().toISOString() })
    return mockJson({ ok: true })
  }
  const m = path.match(/^\/games\/(.+)$/)
  if (m) {
    const id = decodeURIComponent(m[1])
    if (method === 'PUT') {
      mockCloud.set(id, JSON.parse(opts.body))
      return mockJson({ ok: true })
    }
    if (method === 'GET') {
      const g = mockCloud.get(id)
      return g ? mockJson(g) : mockJson({ error: 'not_found' }, 404)
    }
    if (method === 'DELETE') {
      mockCloud.delete(id)
      return mockJson({ ok: true })
    }
  }
  return mockJson({ error: 'mock_unhandled' }, 404)
}

function setMockAuthed() {
  mockActive = true
  accessToken = 'mock'
  user.value = MOCK_USER
  status.value = 'authed'
}

// The stand's token, fetched rather than pasted. A shared game is the one thing the dev mock
// cannot fake — it needs a real server — so the test sign-in asks the local backend for the
// same token `npm run dev:jwt` prints and keeps it where the /party forwarder looks. The route
// exists only on the stand (DEV_JWT=1 in its compose file); anywhere else this is one failed
// request that changes nothing, and the sign-in itself does not wait for it.
async function fetchDevJwt() {
  try {
    const res = await fetch(`${API_BASE_URL}/dev/jwt`)
    if (!res.ok) return
    const { token } = await res.json()
    if (token) localStorage.setItem(DEV_JWT_KEY, token)
  } catch { /* no stand running — the dialogs say what is missing */ }
}

function mockSignIn() {
  if (!DEV) return
  setMockAuthed()
  try {
    localStorage.setItem(MOCK_FLAG, '1')
  } catch {
    /* ignore */
  }
  fetchDevJwt()
}

function mockSignOut() {
  try { localStorage.removeItem(DEV_JWT_KEY) } catch { /* ignore */ }
  mockActive = false
  mockCloud.clear()
  mockBcWrite(null)
  mockRosterCloud.clear()
  mockRosterGraves.clear()
  accessToken = null
  user.value = null
  status.value = 'anon'
  try {
    localStorage.removeItem(MOCK_FLAG)
  } catch {
    /* ignore */
  }
}

// Restore a mock session across dev-server reloads.
if (DEV) {
  try {
    if (localStorage.getItem(MOCK_FLAG) === '1') setMockAuthed()
  } catch {
    /* ignore */
  }
}

async function loadUser() {
  const res = await fetch(api('/me'), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  user.value = res.ok ? await res.json() : null
}

// POST /auth/refresh (sends the HttpOnly cookie). Sets the access token + user, or marks anon.
// Returns true on success. Network errors (no backend / offline) resolve to false, never throw.
async function refresh() {
  if (mockEnabled()) {
    setMockAuthed()
    return true
  }
  if (refreshing) return refreshing
  refreshing = (async () => {
    try {
      const res = await fetch(api('/auth/refresh'), { method: 'POST', credentials: 'include' })
      if (!res.ok) {
        accessToken = null
        user.value = null
        if (res.status >= 500) serverDown()
        else status.value = 'anon'
        return false
      }
      const data = await res.json()
      accessToken = data.accessToken
      await loadUser()
      status.value = 'authed'
      return true
    } catch {
      accessToken = null
      user.value = null
      // A 502 with no CORS headers reaches the page as a network error, the same as no signal at
      // all; only the browser's own flag tells the two apart.
      if (navigator.onLine === false) status.value = 'anon'
      else serverDown()
      return false
    } finally {
      refreshing = null
    }
  })()
  return refreshing
}

// While the server is down, ask again every minute the page is on screen, and at once when the
// page comes back into view or the browser back online — a player who keeps the tab open sees
// the account return by itself, no reload.
const RETRY_DOWN_MS = 60_000
let retryTimer = null
function serverDown() {
  status.value = 'down'
  if (retryTimer || typeof window === 'undefined') return
  const retry = () => {
    if (status.value !== 'down') return stopRetry()
    if (document.visibilityState !== 'hidden') refresh()
  }
  retryTimer = setInterval(retry, RETRY_DOWN_MS)
  window.addEventListener('online', retry)
  document.addEventListener('visibilitychange', retry)
  stopRetry = () => {
    clearInterval(retryTimer)
    retryTimer = null
    window.removeEventListener('online', retry)
    document.removeEventListener('visibilitychange', retry)
  }
}
let stopRetry = () => {}

// Is the server there at all? Asked before a sign-in leaves the page: the login route is a
// full-page trip, and with the API down it lands on the gateway's bare 502.
async function serverUp() {
  try {
    const res = await fetch(api('/health'), { signal: AbortSignal.timeout(5000) })
    return res.ok
  } catch {
    return false
  }
}

// One-shot silent restore — App.vue calls it once on boot, because the navbar's account menu
// shows the signed-in state on every page. No-op if already resolved.
async function ensureSession() {
  if (status.value === 'idle') await refresh()
}

// Bearer fetch against the API with a single transparent refresh+retry on 401.
async function authedFetch(path, opts = {}) {
  if (mockEnabled()) return mockFetch(path, opts)
  const doFetch = () =>
    fetch(api(path), {
      ...opts,
      headers: {
        ...(opts.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
      },
    })
  let res = await doFetch()
  if (res.status === 401 && (await refresh())) res = await doFetch()
  return res
}

// Where to land after signing in. The backend always sends the browser to one fixed path (its
// APP_AFTER_LOGIN_URL env), so the callback view is the only one that knows where the user came
// from — it reads this back. sessionStorage, not localStorage: the value belongs to this tab's
// round trip and must not outlive it.
const RETURN_KEY = 'wh11ed-auth-return'

// Only same-site absolute paths are honoured. A leading `//` (or anything else) would be an
// open redirect wearing a relative path's clothes.
function safeReturnPath(path) {
  return typeof path === 'string' && /^\/(?!\/)/.test(path) ? path : null
}

// Read once and clear: a return path is spent by the redirect it caused.
function takeReturnPath() {
  let raw = null
  try {
    raw = sessionStorage.getItem(RETURN_KEY)
    sessionStorage.removeItem(RETURN_KEY)
  } catch {
    /* ignore private mode */
  }
  return safeReturnPath(raw)
}

// Resolves false, without leaving the page, when the server does not answer — `status` is then
// 'down' and the screen says so.
async function login(provider, returnTo) {
  if (!mockEnabled() && !(await serverUp())) {
    serverDown()
    return false
  }
  const path = safeReturnPath(returnTo)
  try {
    if (path) sessionStorage.setItem(RETURN_KEY, path)
    else sessionStorage.removeItem(RETURN_KEY)
  } catch {
    /* ignore private mode — the callback just falls back to its default */
  }
  // Full-page navigation: the backend 302s to the provider and back to /tracker/auth-callback.
  window.location.href = api(`/auth/${provider}/login`)
  return true
}

async function logout() {
  try {
    await fetch(api('/auth/logout'), { method: 'POST', credentials: 'include' })
  } catch {
    /* best-effort */
  }
  accessToken = null
  user.value = null
  status.value = 'anon'
}

// ─── Email + password (wh11ed-api routes/email-auth.ts) ──────────────────────────────────────
// Each call that signs in gets the refresh cookie back (credentials: 'include') and then runs the
// same refresh() a Yandex sign-in does, so the rest of the app cannot tell the two apart.
// Resolves { ok, error?, … }: `error` is the API's code ('bad_credentials', 'email_taken',
// 'too_many', 'link_invalid', 'mail_failed', 'invalid_input') or 'network' / 'server'.
async function emailCall(path, body) {
  try {
    const res = await fetch(api(`/auth/email/${path}`), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) return { ok: true, ...data }
    return { ok: false, error: data.error || (res.status >= 500 ? 'server' : 'invalid_input') }
  } catch {
    return { ok: false, error: navigator.onLine === false ? 'network' : 'server' }
  }
}

// Where a mailed link should point: this site (the beta's links lead back to the beta).
const linkContext = (locale) => ({ locale, origin: typeof location !== 'undefined' ? location.origin : undefined })

async function signedIn(result) {
  if (result.ok) await refresh()
  return result
}

const loginWithPassword = async (email, password) => signedIn(await emailCall('login', { email, password }))
const register = async (email, password, locale) => signedIn(await emailCall('register', { email, password, ...linkContext(locale) }))
const forgotPassword = (email, locale) => emailCall('forgot', { email, ...linkContext(locale) })
const resetPassword = async (token, password) => signedIn(await emailCall('reset', { token, password }))
async function verifyEmail(token) {
  const r = await emailCall('verify', { token })
  if (r.ok && status.value === 'authed') await loadUser()
  return r
}
async function resendVerification(locale) {
  try {
    const res = await authedFetch('/auth/email/resend', { method: 'POST', body: JSON.stringify(linkContext(locale)) })
    const data = await res.json().catch(() => ({}))
    return res.ok ? { ok: true, ...data } : { ok: false, error: data.error || 'server' }
  } catch {
    return { ok: false, error: 'network' }
  }
}

export function useAuth() {
  return {
    status,
    user,
    login,
    logout,
    refresh,
    ensureSession,
    authedFetch,
    takeReturnPath,
    loginWithPassword,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    // DEV-only test helpers (no-ops / stripped in production):
    dev: DEV,
    mockSignIn,
    mockSignOut,
  }
}
