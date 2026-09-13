import { ref, computed, watch, effectScope } from 'vue'
import { useAuth } from './useAuth.js'
import { useTracker } from './useTracker.js'
import { broadcastPayload } from './broadcastPayload.js'

// Live broadcast of the CURRENT game (the OBS overlay's data source). The token rides inside
// the game object (`current.broadcast = { token }`) so it survives reloads through the normal
// tracker persistence; the projected payload is pushed to wh11ed-api, debounced, whenever the
// game changes. Best-effort like cloud sync: a failed push never disturbs the tracker.

const PUSH_DELAY = 1500
const pushing = ref(false)
const lastError = ref(null)
let pushTimer = null
let watcherArmed = false

export function useBroadcast() {
  const { status, authedFetch } = useAuth()
  const { current } = useTracker()

  const token = computed(() => current.value?.broadcast?.token || null)
  const enabled = computed(() => !!token.value)
  // The overlay URL a viewer (OBS Browser Source) opens.
  const shareUrl = computed(() =>
    token.value && typeof window !== 'undefined'
      ? `${window.location.origin}/broadcast/${token.value}`
      : null,
  )
  const canBroadcast = computed(() => status.value === 'authed')

  async function pushNow() {
    const g = current.value
    if (!g?.broadcast?.token || status.value !== 'authed') return
    const body = broadcastPayload(g)
    if (!body) return
    pushing.value = true
    try {
      const res = await authedFetch(`/broadcast/live/${encodeURIComponent(g.id)}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      })
      // 404 = the broadcast row is gone (expired, or revoked from another device): drop the
      // local token so the UI honestly shows "off" instead of pushing into the void forever.
      if (res.status === 404) delete g.broadcast
      else if (!res.ok) lastError.value = `push failed: ${res.status}`
      else lastError.value = null
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    } finally {
      pushing.value = false
    }
  }

  function schedulePush() {
    if (pushTimer) return
    pushTimer = setTimeout(() => {
      pushTimer = null
      pushNow()
    }, PUSH_DELAY)
  }

  // Armed once per app load, from the broadcast UI (the only place that can turn this on).
  // Deep-watching `current` is the same recipe the store's own persistence uses.
  //
  // In a DETACHED effect scope, deliberately: init() runs inside a component's setup, and a
  // bare watch() there is adopted by that component and dies with it — leaving the game
  // screen killed the pushes while `watcherArmed` stayed true, so nothing ever re-armed and
  // the overlay silently froze on the last delivered snapshot. The watcher must live as long
  // as the app, like the store's own persistence watcher.
  function init() {
    if (watcherArmed) return
    watcherArmed = true
    const scope = effectScope(true)
    scope.run(() => {
      watch(
        current,
        (g) => {
          if (g?.broadcast?.token && status.value === 'authed') schedulePush()
        },
        { deep: true },
      )
    })
  }

  async function enable() {
    const g = current.value
    if (!g || status.value !== 'authed') return false
    lastError.value = null
    try {
      const res = await authedFetch(`/games/${encodeURIComponent(g.id)}/broadcast`, { method: 'POST' })
      if (!res.ok) {
        lastError.value = `enable failed: ${res.status}`
        return false
      }
      const { token: t } = await res.json()
      g.broadcast = { token: t }
      init()
      pushNow() // the overlay should have data the moment the link exists
      return true
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
      return false
    }
  }

  // A fresh token replaces the old one server-side — the old link dies. Same call as enable.
  const regenerate = enable

  async function disable() {
    const g = current.value
    if (!g) return
    delete g.broadcast
    if (status.value !== 'authed') return
    try {
      await authedFetch(`/games/${encodeURIComponent(g.id)}/broadcast`, { method: 'DELETE' })
    } catch (e) {
      // The local token is already gone; the server row expires by TTL if this never lands.
      lastError.value = e instanceof Error ? e.message : String(e)
    }
  }

  return { enabled, token, shareUrl, canBroadcast, pushing, lastError, enable, regenerate, disable, init, pushNow }
}
