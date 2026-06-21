import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth.js'
import { useTracker } from './useTracker.js'

// Cloud backup of finished games, layered over useAuth + useTracker. localStorage stays the
// primary store; the cloud is a best-effort backup — failures never disrupt the tracker.

const SYNCED_KEY = 'wh11ed-tracker-synced'

const syncing = ref(false)
const lastError = ref(null)
const syncedIds = ref(loadSynced()) // persisted optimistic record of what we've uploaded/seen
const cloudIds = ref(new Set(syncedIds.value)) // authoritative after a GET /games (seeded for instant icons)
const cloudMetas = ref([]) // last GET /games result, for "missing locally" math
const checked = ref(false) // a successful cloud check happened this session
let initialised = false

function loadSynced() {
  try {
    const raw = localStorage.getItem(SYNCED_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function persistSynced() {
  try {
    localStorage.setItem(SYNCED_KEY, JSON.stringify([...syncedIds.value]))
  } catch {
    /* ignore quota / private mode */
  }
}

function markSynced(id) {
  syncedIds.value = new Set(syncedIds.value).add(id)
  cloudIds.value = new Set(cloudIds.value).add(id)
  persistSynced()
}

export function useCloudSync() {
  const { status, authedFetch } = useAuth()
  const { history } = useTracker()

  const pendingUploadCount = computed(
    () => history.value.filter((g) => !cloudIds.value.has(g.id)).length,
  )
  const pendingDownloadCount = computed(() => {
    const local = new Set(history.value.map((g) => g.id))
    return cloudMetas.value.filter((m) => !local.has(m.gameId)).length
  })
  const inSync = computed(
    () => checked.value && pendingUploadCount.value === 0 && pendingDownloadCount.value === 0,
  )

  function isBackedUp(id) {
    return cloudIds.value.has(id)
  }

  async function uploadGame(game) {
    const res = await authedFetch(`/games/${encodeURIComponent(game.id)}`, {
      method: 'PUT',
      body: JSON.stringify(game),
    })
    if (res.ok) {
      markSynced(game.id)
      return true
    }
    return false
  }

  // Read-only: fetch the cloud game list to drive the "backed up" icons + in-sync status.
  async function refreshCloudList() {
    if (status.value !== 'authed') return
    try {
      const res = await authedFetch('/games')
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const { games = [] } = await res.json()
      cloudMetas.value = games
      cloudIds.value = new Set(games.map((g) => g.gameId))
      checked.value = true
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    }
  }

  // Push every local game (idempotent), then pull any cloud games missing locally.
  async function syncNow() {
    if (syncing.value || status.value !== 'authed') return
    syncing.value = true
    lastError.value = null
    try {
      for (const g of history.value) await uploadGame(g)

      const res = await authedFetch('/games')
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const { games = [] } = await res.json()
      cloudMetas.value = games
      cloudIds.value = new Set(games.map((g) => g.gameId))
      checked.value = true

      const localIds = new Set(history.value.map((g) => g.id))
      const restored = []
      for (const meta of games) {
        if (localIds.has(meta.gameId)) continue
        const r = await authedFetch(`/games/${encodeURIComponent(meta.gameId)}`)
        if (r.ok) restored.push(await r.json())
      }
      if (restored.length) {
        const merged = [...history.value, ...restored]
        merged.sort((a, b) =>
          String(b.finishedAt || b.createdAt).localeCompare(String(a.finishedAt || a.createdAt)),
        )
        history.value = merged
      }
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    } finally {
      syncing.value = false
    }
  }

  // Auto-upload games finished during THIS authed session (not the pre-existing backlog —
  // that's what syncNow is for). Baselines the known ids once.
  function init() {
    if (initialised) return
    initialised = true
    const knownIds = new Set(history.value.map((g) => g.id))
    watch(
      history,
      (games) => {
        if (status.value !== 'authed') return
        for (const g of games) {
          if (knownIds.has(g.id)) continue
          knownIds.add(g.id)
          uploadGame(g) // fire-and-forget; best-effort
        }
      },
      { deep: true },
    )
  }

  return {
    syncing,
    lastError,
    checked,
    inSync,
    pendingUploadCount,
    pendingDownloadCount,
    isBackedUp,
    uploadGame,
    syncNow,
    refreshCloudList,
    init,
  }
}
