import { computed, ref } from 'vue'
import { useAuth } from './useAuth.js'
import { useRosters, isDraft, SCHEMA_VERSION } from './useRosters.js'

// Cloud sync of army lists, layered over useAuth + useRosters — the roster counterpart of
// useCloudSync.js. localStorage stays the primary store; the cloud is a best-effort copy and a
// failure never blocks list building.
//
// Three deliberate rules shape everything here:
//
//  1. SAVED LISTS ONLY. A wizard draft is not a list yet, so it never leaves the device (the API
//     rejects one anyway). `savedRosters` is the whole scope.
//  2. UPLOADS ARE CLICKS, NOT EDITS. The store autosaves every keystroke to localStorage, but the
//     cloud must not collect intermediate versions: `saveToCloud()` is called from the deliberate
//     "Save" moments (the editor's Save, the wizard's finish, import, duplicate) and nowhere else.
//     A list edited but never saved simply stays newer on this device.
//  3. ONE REQUEST PER VISIT. Entering the roster screen costs a single GET /rosters (metadata,
//     no blobs); blobs are fetched only for the ids whose `updatedAt` actually moved.
//
// Conflicts are last-write-wins on the client's `updatedAt` (a plain Date.now()), which is what
// the user asked for: whoever saved last wins, and the screen says the list was updated.

const PENDING_KEY = 'wh11ed-rosters-pending'
const DELETED_KEY = 'wh11ed-rosters-deleted'

const syncing = ref(false)
const uploading = ref(false)
const lastError = ref(null)
const checked = ref(false) // a successful cloud check happened this session
// What the last sync changed, for the "your lists were updated" notice:
// { added, updated, removed } — a list buried on another device counts as news too.
const pulled = ref(null)
// Set by a successful save-triggered upload, cleared by the next sync — that is how the roster
// view can say "saved to the cloud" right after the click that saved it.
const savedAt = ref(0)
// Ids whose save has not landed in the cloud yet (offline, signed out, a failed PUT). Persisted,
// so a list saved while offline still uploads on the next visit — and so a list that is merely
// being edited is NOT in here.
const pendingIds = ref(loadSet(PENDING_KEY))
// Deletions this device made whose DELETE hasn't reached the API yet (deleted offline / signed
// out). Purely a retry queue: once the server holds its own tombstone, this note is dropped —
// the server's copy is what actually keeps the list from coming back, here and everywhere else.
const deletedIds = ref(loadSet(DELETED_KEY))

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
  } catch { /* ignore quota / private mode */ }
}

function addTo(refSet, key, id) {
  if (refSet.value.has(id)) return
  refSet.value = new Set(refSet.value).add(id)
  persist(key, refSet.value)
}

function removeFrom(refSet, key, id) {
  if (!refSet.value.has(id)) return
  const next = new Set(refSet.value)
  next.delete(id)
  refSet.value = next
  persist(key, refSet.value)
}

const markPending = (id) => addTo(pendingIds, PENDING_KEY, id)
const clearPending = (id) => removeFrom(pendingIds, PENDING_KEY, id)
const addTombstone = (id) => addTo(deletedIds, DELETED_KEY, id)
const clearTombstone = (id) => removeFrom(deletedIds, DELETED_KEY, id)

// What travels: the stored roster plus the schema version, exactly like a share link. A blob
// uploaded by an older build is then migrated on the way back in (useRosters' adoptFromCloud).
const payload = (r) => JSON.stringify({ ...r, v: SCHEMA_VERSION })

const path = (id) => `/rosters/${encodeURIComponent(id)}`

export function useRosterSync() {
  const { status, authedFetch } = useAuth()
  const { rosters, savedRosters, rosterById, adoptFromCloud, deleteRoster } = useRosters()

  // `enabled` is for the status line; the async functions below read `status.value` directly at
  // call time instead — a computed would cache across the sign-in that is precisely what they are
  // asking about (same reason useCloudSync.js checks the ref inline).
  const enabled = computed(() => status.value === 'authed')
  const authed = () => status.value === 'authed'
  // Lists whose save hasn't reached the cloud — the honest count behind the status line.
  const pendingCount = computed(
    () => savedRosters.value.filter((r) => pendingIds.value.has(r.id)).length,
  )

  async function put(roster) {
    const res = await authedFetch(path(roster.id), { method: 'PUT', body: payload(roster) })
    if (res.ok) {
      clearPending(roster.id)
      return true
    }
    // 413 / 422 / 409 are verdicts, not hiccups: this list will be refused every time (too big,
    // malformed, over quota). Stop re-queuing it every visit, but leave the error visible.
    if (res.status === 413 || res.status === 422 || res.status === 409) {
      clearPending(roster.id)
      lastError.value = `roster ${roster.id}: ${res.status}`
    }
    return false
  }

  // The "Save" click. Queues the list first (so an offline save still uploads later), then tries
  // immediately. Never called from an autosave — see rule 2 at the top.
  async function saveToCloud(id) {
    const roster = rosterById(id)
    if (!roster || isDraft(roster)) return false
    markPending(id)
    clearTombstone(id) // re-saving an id we had deleted resurrects it deliberately
    if (!authed()) return false
    uploading.value = true
    lastError.value = null
    try {
      const ok = await put(roster)
      if (ok) {
        savedAt.value = Date.now()
        pulled.value = null
      }
      return ok
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
      return false
    } finally {
      uploading.value = false
    }
  }

  // Deleting a list locally. Tombstone first so a later sync can't restore it, then DELETE.
  // Offline / signed out, the tombstone keeps the deletion pending until a sync can push it.
  async function removeFromCloud(id) {
    // A draft was never uploaded, so there is nothing to delete and no reason to keep a
    // tombstone for it around.
    const local = rosterById(id)
    if (local && isDraft(local)) return
    addTombstone(id)
    clearPending(id)
    if (!authed()) return
    try {
      const res = await authedFetch(`${path(id)}?at=${Date.now()}`, { method: 'DELETE' })
      if (res.ok || res.status === 404) clearTombstone(id)
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    }
  }

  // The whole per-visit pass: one metadata GET, then only the work that metadata proves is needed.
  async function syncNow() {
    if (syncing.value || !authed()) return
    syncing.value = true
    lastError.value = null
    savedAt.value = 0
    try {
      const res = await authedFetch('/rosters')
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const body = await res.json()
      // The listing mixes live lists with tombstones (`deleted: true`) — a list deleted on
      // another device. They drive completely different logic, so they are split here.
      const cloud = new Map()
      const graves = new Map() // id → the deleting device's clock
      for (const m of body.rosters || []) {
        if (m.deleted) graves.set(m.rosterId, m.deletedAt || 0)
        else cloud.set(m.rosterId, m)
      }
      checked.value = true

      // 1. Our own deletions. The server keeps its own tombstone, so once it has one this
      //    device's local note has done its job. A list the cloud doesn't know at all needs no
      //    note either — nothing there can restore it.
      for (const id of [...deletedIds.value]) {
        if (graves.has(id) || !cloud.has(id)) {
          clearTombstone(id)
          continue
        }
        const del = await authedFetch(`${path(id)}?at=${Date.now()}`, { method: 'DELETE' })
        if (del.ok || del.status === 404) {
          clearTombstone(id)
          cloud.delete(id)
          graves.set(id, Date.now())
        }
      }

      // 2. Deletions from elsewhere. A list buried in the cloud goes here too — unless this
      //    device saved it AFTER the burial, which is the one case where a delete loses: an
      //    explicit Save is a statement that this list should exist, and step 3 uploads it again.
      let removed = 0
      for (const [id, deletedAt] of graves) {
        const local = rosterById(id)
        if (!local || isDraft(local)) continue
        if ((local.updatedAt || 0) > deletedAt) continue
        deleteRoster(id)
        clearPending(id)
        removed++
      }

      // 3. Push. Queued saves, plus any saved list the cloud has never seen — that second half is
      //    what makes the first sign-in upload the entire existing collection. A list the cloud
      //    already holds at an older version is NOT pushed: those are the unsaved edits rule 2
      //    keeps out of the cloud.
      let failures = 0
      for (const r of savedRosters.value) {
        if (deletedIds.value.has(r.id)) continue
        if (cloud.has(r.id) && !pendingIds.value.has(r.id)) continue
        const ok = await put(r)
        if (ok) cloud.set(r.id, { rosterId: r.id, updatedAt: r.updatedAt || 0 })
        else failures++
      }

      // 4. Pull. Anything the cloud holds and we don't, or holds in a newer version.
      let added = 0
      let updated = 0
      for (const meta of cloud.values()) {
        if (deletedIds.value.has(meta.rosterId)) continue
        const local = rosterById(meta.rosterId)
        if (local) {
          // Our own copy failed to upload just now — it is the newer one; don't overwrite it
          // with the stale cloud version we were about to replace.
          if (pendingIds.value.has(meta.rosterId)) continue
          if (!((meta.updatedAt || 0) > (local.updatedAt || 0))) continue
        }
        const one = await authedFetch(path(meta.rosterId))
        if (!one.ok) continue
        const blob = await one.json()
        if (!adoptFromCloud(blob)) continue
        if (local) updated++
        else added++
      }

      pulled.value = added || updated || removed ? { added, updated, removed } : null
      if (failures > 0) lastError.value = `${failures} roster(s) failed to upload`
    } catch (e) {
      lastError.value = e instanceof Error ? e.message : String(e)
    } finally {
      syncing.value = false
    }
  }

  return {
    rosters,
    syncing,
    uploading,
    lastError,
    checked,
    pulled,
    savedAt,
    pendingCount,
    enabled,
    saveToCloud,
    removeFromCloud,
    syncNow,
  }
}
