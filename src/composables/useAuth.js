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

async function loadUser() {
  const res = await fetch(api('/me'), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  user.value = res.ok ? await res.json() : null
}

// POST /auth/refresh (sends the HttpOnly cookie). Sets the access token + user, or marks anon.
// Returns true on success. Network errors (no backend / offline) resolve to false, never throw.
async function refresh() {
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
  if (!(await serverUp())) {
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
  // Full-page navigation: the backend 302s to the provider and back to /tracker/auth-callback —
  // on THIS site: the API serves the tracker's beta subdomain too, and returns to an allow-listed
  // origin that asks (wh11ed-api, `?return=`).
  window.location.href = api(`/auth/${provider}/login?return=${encodeURIComponent(window.location.origin)}`)
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

// Signed in already: give this account an email + password (a Yandex account's second way in),
// or change the password. Both through authedFetch; /me is re-read so the menu follows.
async function accountCall(path, body) {
  try {
    const res = await authedFetch(`/auth/email/${path}`, { method: 'POST', body: JSON.stringify(body) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error || (res.status >= 500 ? 'server' : 'invalid_input') }
    await loadUser()
    return { ok: true, ...data }
  } catch {
    return { ok: false, error: navigator.onLine === false ? 'network' : 'server' }
  }
}
const addPasswordLogin = (email, password, locale) => accountCall('add', { email, password, ...linkContext(locale) })
const changePassword = (current, password) => accountCall('password', { current, password })

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
    addPasswordLogin,
    changePassword,
  }
}
