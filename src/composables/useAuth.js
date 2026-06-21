import { ref } from 'vue'
import { API_BASE_URL } from '../config.js'

// Module-singleton auth store (same pattern as useLocale.js). Used ONLY in the tracker section.
//
// Security: the access token lives in memory only (never localStorage) — protects it from XSS.
// On reload it's gone and is re-obtained via a silent /auth/refresh against the HttpOnly cookie.

// 'idle' = not yet checked this load; 'authed' / 'anon' after a refresh attempt.
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
        status.value = 'anon'
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
      status.value = 'anon'
      return false
    } finally {
      refreshing = null
    }
  })()
  return refreshing
}

// One-shot silent restore — call when entering the tracker. No-op if already resolved.
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

function login(provider) {
  // Full-page navigation: the backend 302s to the provider and back to /#/tracker/auth-callback.
  window.location.href = api(`/auth/${provider}/login`)
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

export function useAuth() {
  return { status, user, login, logout, refresh, ensureSession, authedFetch }
}
