import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth.js'
import { useTracker, isValidGame } from './useTracker.js'

// Cloud backup of finished games, layered over useAuth + useTracker. localStorage stays the
// primary store; the cloud is a best-effort backup — failures never disrupt the tracker.

const SYNCED_KEY = 'wh11ed-tracker-synced'
const DELETED_KEY = 'wh11ed-tracker-deleted'

// A game's cloud "version" = id + finishedAt. Tracking versions (not just ids) means a game
// that was backed up, then resumed and changed, shows as NOT in sync and re-uploads — instead
// of the stale cloud copy falsely showing as synced. finishedAt changes on every (re-)finish
// and GET /games returns it, so local and cloud versions are directly comparable.
const gameSig = (g) => `${g.id}:${g.finishedAt || ''}`
const metaSig = (m) => `${m.gameId}:${m.finishedAt || ''}`

const syncing = ref(false)
const lastError = ref(null)
// Sets of version signatures (id:finishedAt). Legacy persisted entries were bare ids (no ':')
// — drop them on load; the next cloud check re-seeds from real cloud versions.
const syncedSigs = ref(new Set([...loadSet(SYNCED_KEY)].filter((s) => s.includes(':'))))
const cloudSigs = ref(new Set(syncedSigs.value)) // authoritative after a GET /games (seeded for instant icons)
const cloudMetas = ref([]) // last GET /games result, for "missing locally" math
// Tombstones: games deleted locally whose cloud copy must NOT be restored by syncNow — and
// whose cloud DELETE is retried until it lands (covers deleting while offline / signed out).
const deletedIds = ref(loadSet(DELETED_KEY))
const checked = ref(false) // a successful cloud check happened this session
let initialised = false

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function persist(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]))
  } catch {
    /* ignore quota / private mode */
  }
}

function markSynced(game) {
  const sig = gameSig(game)
  syncedSigs.value = new Set(syncedSigs.value).add(sig)
  cloudSigs.value = new Set(cloudSigs.value).add(sig)
  persist(SYNCED_KEY, syncedSigs.value)
}

// Forget every version of a game we no longer keep in the cloud (after a successful DELETE / 404).
function unmarkSyncedId(id) {
  const drop = (set) => new Set([...set].filter((s) => !s.startsWith(`${id}:`)))
  syncedSigs.value = drop(syncedSigs.value)
  cloudSigs.value = drop(cloudSigs.value)
  cloudMetas.value = cloudMetas.value.filter((m) => m.gameId !== id)
  persist(SYNCED_KEY, syncedSigs.value)
}

function addTombstone(id) {
  deletedIds.value = new Set(deletedIds.value).add(id)
  persist(DELETED_KEY, deletedIds.value)
}

function clearTombstone(id) {
  if (!deletedIds.value.has(id)) return
  const d = new Set(deletedIds.value); d.delete(id); deletedIds.value = d
  persist(DELETED_KEY, deletedIds.value)
}

export function useCloudSync() {
  const { status, authedFetch } = useAuth()
  const { history } = useTracker()

  const pendingUploadCount = computed(
    () => history.value.filter((g) => !cloudSigs.value.has(gameSig(g))).length,
  )
  const pendingDownloadCount = computed(() => {
    const local = new Set(history.value.map((g) => g.id))
    return cloudMetas.value.filter((m) => !local.has(m.gameId)).length
  })
  const inSync = computed(
    () => checked.value && pendingUploadCount.value === 0 && pendingDownloadCount.value === 0,
  )
  // After a cloud check, distinguishes "all backed up" from "the cloud simply has nothing".
  const cloudEmpty = computed(() => cloudMetas.value.length === 0)

  function isBackedUp(game) {
    return cloudSigs.value.has(gameSig(game))
  }

  async function uploadGame(game) {
    const res = await authedFetch(`/games/${encodeURIComponent(game.id)}`, {
      method: 'PUT',
      body: JSON.stringify(game),
    })
    if (res.ok) {
      markSynced(game)
      return true
    }
    return false
  }

  // Delete a game's cloud backup (called alongside the local history delete). Best-effort:
  // tombstone it first so it can't be restored by a later syncNow, then DELETE on the API.
  // If we're offline / signed out, the tombstone keeps the deletion pending until syncNow
  // (or the next deleteGame) can push it through.
  async function deleteGame(id) {
    addTombstone(id)
    unmarkSyncedId(id)
    if (status.value !== 'authed') return
    try {
      const res = await authedFetch(`/games/${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok || res.status === 404) clearTombstone(id) // gone from the cloud
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    }
  }

  // Read-only: fetch the cloud game list to drive the "backed up" icons + in-sync status.
  async function refreshCloudList() {
    if (status.value !== 'authed') return
    try {
      const res = await authedFetch('/games')
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const { games = [] } = await res.json()
      cloudMetas.value = games
      // Merge (don't replace) with our optimistic synced set: a just-PUT game may not yet
      // appear in a lagging read-replica's list, and replacing would flap its icon to pending.
      cloudSigs.value = new Set([...syncedSigs.value, ...games.map(metaSig)])
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
      // Push every local game; remember how many PUTs failed so we can surface it instead
      // of silently reporting success (failed games also stay out of cloudSigs → still shown
      // as pending, but without this the user gets no error at all).
      let uploadFailures = 0
      for (const g of history.value) {
        if (cloudSigs.value.has(gameSig(g))) continue // this exact version is already in the cloud
        const ok = await uploadGame(g)
        if (!ok) uploadFailures++
      }

      const res = await authedFetch('/games')
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const { games = [] } = await res.json()
      cloudMetas.value = games
      // Merge (don't replace) with our optimistic synced set: a just-PUT game may not yet
      // appear in a lagging read-replica's list, and replacing would flap its icon to pending.
      cloudSigs.value = new Set([...syncedSigs.value, ...games.map(metaSig)])
      checked.value = true

      const localIds = new Set(history.value.map((g) => g.id))
      const restored = []
      for (const meta of games) {
        if (localIds.has(meta.gameId)) continue
        // Deleted locally (maybe while offline): honor it — finish the cloud DELETE now and
        // never restore it, instead of pulling the game back from the cloud.
        if (deletedIds.value.has(meta.gameId)) {
          const del = await authedFetch(`/games/${encodeURIComponent(meta.gameId)}`, { method: 'DELETE' })
          if (del.ok || del.status === 404) clearTombstone(meta.gameId)
          continue
        }
        const r = await authedFetch(`/games/${encodeURIComponent(meta.gameId)}`)
        if (!r.ok) continue
        const game = await r.json()
        // Guard against a malformed cloud blob wedging the history render.
        if (isValidGame(game)) restored.push(game)
      }
      if (restored.length) {
        const merged = [...history.value, ...restored]
        merged.sort((a, b) =>
          String(b.finishedAt || b.createdAt).localeCompare(String(a.finishedAt || a.createdAt)),
        )
        history.value = merged
      }

      if (uploadFailures > 0) {
        lastError.value = `${uploadFailures} game(s) failed to upload`
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
    // Track by version signature, not id: a game backed up earlier, then resumed and changed,
    // gets a new finishedAt → a new signature → it re-uploads automatically (its stale cloud
    // copy is overwritten by the same-id PUT).
    const knownSigs = new Set(history.value.map(gameSig))
    watch(
      history,
      (games) => {
        if (status.value !== 'authed') return
        for (const g of games) {
          const sig = gameSig(g)
          if (knownSigs.has(sig)) continue
          // Optimistically mark known to avoid a concurrent duplicate upload, but drop it
          // on failure so a transient error stays retryable on the next history change
          // (previously a failed PUT permanently skipped the game for the session).
          knownSigs.add(sig)
          uploadGame(g).then((ok) => { if (!ok) knownSigs.delete(sig) })
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
    cloudEmpty,
    pendingUploadCount,
    pendingDownloadCount,
    isBackedUp,
    uploadGame,
    deleteGame,
    syncNow,
    refreshCloudList,
    init,
  }
}
