import { ref } from 'vue'
import { API_BASE_URL } from '../config.js'

// Module-singleton auth store (same pattern as useLocale.js). App-wide: the account is not a
// tracker feature — both the tracker and the roster builder sync through it, and the way in and
// out is the navbar's account menu, reachable from any page.
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

// ─── DEV-only mock ────────────────────────────────────────────────────────────────────────────
// Lets you exercise the signed-in UI locally without real OAuth (which redirects to the prod site).
// Everything here is behind `import.meta.env.DEV`, so Vite strips it from production builds.
const DEV = import.meta.env.DEV
const MOCK_FLAG = 'wh11ed-dev-mock-auth'
const MOCK_USER = { id: 'mock', email: 'test@local', displayName: 'Tester' }
let mockActive = false
const mockCloud = new Map() // gameId → full game blob (a fake backend store)
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

// Stand-in for the API: same shapes useCloudSync expects, no network.
function mockFetch(path, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase()
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

function mockSignIn() {
  if (!DEV) return
  setMockAuthed()
  try {
    localStorage.setItem(MOCK_FLAG, '1')
  } catch {
    /* ignore */
  }
}

function mockSignOut() {
  mockActive = false
  mockCloud.clear()
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

function login(provider, returnTo) {
  const path = safeReturnPath(returnTo)
  try {
    if (path) sessionStorage.setItem(RETURN_KEY, path)
    else sessionStorage.removeItem(RETURN_KEY)
  } catch {
    /* ignore private mode — the callback just falls back to its default */
  }
  // Full-page navigation: the backend 302s to the provider and back to /tracker/auth-callback.
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
  return {
    status,
    user,
    login,
    logout,
    refresh,
    ensureSession,
    authedFetch,
    takeReturnPath,
    // DEV-only test helpers (no-ops / stripped in production):
    dev: DEV,
    mockSignIn,
    mockSignOut,
  }
}
