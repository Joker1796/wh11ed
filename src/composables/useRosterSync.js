import { computed, ref } from 'vue'
import { useAuth } from './useAuth.js'
import { useRosters, isDraft, SCHEMA_VERSION, normalizeCloudRoster } from './useRosters.js'
import { contentHash } from '../utils/contentHash.js'
import { stableJson } from '../utils/stableJson.js'
import { localData } from './localData.js'
import { getItem, setItem } from './safeStorage.js'
import { ui } from '../i18n/ui.js'
import { locale } from './useLocale.js'

// Cloud sync of army lists, layered over useAuth + useRosters — the roster counterpart of
// useCloudSync.js. The device database stays the primary store; the cloud is a best-effort copy and a
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
//  3. ONE REQUEST PER VISIT. Entering the roster screen costs a single GET /roster-sync (metadata,
//     no blobs); unchanged content hashes need no download.
//
// Conditional revisions protect saves; divergent variants survive as separate local copies.

const PENDING_KEY = 'wh11ed-rosters-pending'
const DELETED_KEY = 'wh11ed-rosters-deleted'

const syncing = ref(false)
const uploads = ref(0)
const uploading = computed(() => uploads.value > 0)
const conflict = ref(null)
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

// Canonical content hashes establish a base without trusting the device clock or downloading an
// unchanged roster. Persist only compact digests, scoped to the account that issued the revision.
const wire = (r) => ({ ...r, v: SCHEMA_VERSION })
const fingerprint = (r) => contentHash(wire(r))
const BASES_KEY = 'wh11ed-roster-cloud-bases'
const bases = (() => {
  try {
    return new Map(JSON.parse(getItem(BASES_KEY) || '[]').filter(([k, v]) => typeof k === 'string'
      && v && Number.isSafeInteger(v.revision) && v.revision > 0 && typeof v.hash === 'string'))
  } catch { return new Map() }
})()
const initial = new Map()
const intents = new Map()
const path = (id) => `/roster-sync/${encodeURIComponent(id)}`

export function useRosterSync() {
  const { status, authedFetch, user } = useAuth()
  const { rosters, savedRosters, rosterById, adoptFromCloud, deleteRoster, preserveCloudConflict } = useRosters()
  for (const r of rosters.value) if (!initial.has(r.id)) initial.set(r.id, fingerprint(r))
  const account = () => user?.value?.id || 'session'
  const key = (id, scope = account()) => `${scope}/${id}`
  const base = (id, scope) => bases.get(key(id, scope))
  const enabled = computed(() => status.value === 'authed')
  const authed = () => status.value === 'authed'
  const pendingCount = computed(() => savedRosters.value.filter((r) => pendingIds.value.has(r.id)).length)
  const checkAccount = (scope) => { if (scope !== account()) throw new Error('Account changed during sync') }
  const snapshot = (r) => r ? JSON.parse(JSON.stringify(r)) : null
  const unchanged = (id, r) => stableJson(rosterById(id)) === stableJson(r)
  const hashFor = async (r, scope) => { const hash = await fingerprint(r); checkAccount(scope); return hash }
  const request = async (url, options, scope) => {
    const res = await authedFetch(url, { ...options, ...(scope !== 'session' ? { expectedUserId: scope } : {}) })
    checkAccount(scope)
    return res
  }
  const read = async (res, scope) => { const value = await res.json(); checkAccount(scope); return value }
  async function remember(r, revision, serverHash, scope) {
    const hash = await fingerprint(r)
    checkAccount(scope)
    if ((base(r.id, scope)?.revision || 0) > revision) return
    bases.set(key(r.id, scope), { revision, hash, serverHash })
    setItem(BASES_KEY, JSON.stringify([...bases].filter(([k, v]) => !k.startsWith('session/') && v.hash?.startsWith('sha256:'))))
  }
  async function remote(id, scope) {
    const res = await request(path(id), undefined, scope)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`roster read: ${res.status}`)
    const data = await read(res, scope)
    const roster = normalizeCloudRoster(data.roster)
    if (!roster || roster.id !== id || !Number.isSafeInteger(data.revision) || data.revision < 1) throw new Error('Invalid roster revision response')
    return { roster, revision: data.revision, contentHash: data.contentHash }
  }
  async function preserve(id, theirs, scope, saved) {
    const copy = preserveCloudConflict(id, theirs?.roster ?? null, ui[locale.value].rosterConflictSuffix, { draft: !saved })
    if (!copy) {
      conflict.value = { localSaveFailed: true }
      throw new Error('Could not preserve the local conflict copy')
    }
    conflict.value = { id, copyId: copy.id, draft: !saved }
    clearPending(id)
    if (theirs) await remember(theirs.roster, theirs.revision, theirs.contentHash, scope)
    if (saved) {
      markPending(copy.id)
      return put(copy, scope, false)
    }
    return true
  }
  async function put(roster, scope = account(), retry = true) {
    const id = roster.id
    const intent = intents.get(key(id, scope)) || 0
    const submitted = JSON.parse(JSON.stringify(wire(roster)))
    const res = await request(path(id), { method: 'PUT', body: JSON.stringify({ roster: submitted, baseRevision: base(id, scope)?.revision || 0 }) }, scope)
    if (res.ok) {
      const data = await read(res, scope)
      if (!Number.isSafeInteger(data.revision) || data.revision < 1) throw new Error('Conditional roster protocol unavailable')
      await remember(submitted, data.revision, data.contentHash, scope)
      if ((intents.get(key(id, scope)) || 0) === intent) clearPending(id)
      return true
    }
    const data = await read(res, scope).catch(() => ({}))
    checkAccount(scope)
    if (res.status === 409 && data.error === 'conflict') {
      if ((intents.get(key(id, scope)) || 0) !== intent) return false
      const theirs = await remote(id, scope)
      if ((intents.get(key(id, scope)) || 0) !== intent) return false
      const nowLocal = rosterById(id)
      if (!nowLocal || isDraft(nowLocal)) return false
      if (theirs) {
        const theirHash = await hashFor(theirs.roster, scope)
        const known = base(id, scope)
        if (theirHash === await hashFor(nowLocal, scope)) {
          await remember(theirs.roster, theirs.revision, theirs.contentHash, scope)
          clearPending(id)
          return true
        }
        if (retry && (theirHash === known?.hash || theirHash === await initial.get(id))) {
          await remember(theirs.roster, theirs.revision, theirs.contentHash, scope)
          return put(submitted, scope, false)
        }
      }
      // Edits made after Save are unfinished work, not permission to upload a later snapshot.
      checkAccount(scope)
      if ((intents.get(key(id, scope)) || 0) !== intent || !rosterById(id)) return false
      const stillSubmitted = stableJson(wire(rosterById(id))) === stableJson(submitted)
      const preserved = await preserve(id, theirs, scope, stillSubmitted)
      return stillSubmitted && preserved
    }
    if ([413, 422].includes(res.status) || (res.status === 409 && data.error === 'quota_exceeded')) clearPending(id)
    lastError.value = `roster ${id}: ${res.status}`
    return false
  }

  async function saveToCloud(id) {
    const roster = rosterById(id)
    if (!roster || isDraft(roster)) return false
    const submitted = snapshot(roster)
    const scope = account()
    intents.set(key(id, scope), (intents.get(key(id, scope)) || 0) + 1)
    markPending(id)
    clearTombstone(id)
    if (!authed()) return false
    uploads.value++
    lastError.value = null
    conflict.value = null
    try {
      if (localData.state.phase !== 'idle' && !await localData.flush()) return false
      const ok = await put(submitted, scope)
      if (ok) { savedAt.value = Date.now(); pulled.value = null }
      return ok
    } catch (e) { lastError.value = e instanceof Error ? e.message : String(e); return false }
    finally { uploads.value-- }
  }

  async function remove(id, scope) {
    let revision = base(id, scope)?.revision || 0
    const send = () => request(`${path(id)}?baseRevision=${revision}&at=${Date.now()}`, { method: 'DELETE' }, scope)
    let res = await send()
    if (res.status === 409) {
      const theirs = await remote(id, scope)
      if (!theirs) { clearTombstone(id); return true }
      const hash = await fingerprint(theirs.roster)
      const matches = hash === base(id, scope)?.hash || hash === await initial.get(id)
      checkAccount(scope)
      if (matches) {
        revision = theirs.revision
        res = await send()
      } else {
        adoptFromCloud(theirs.roster)
        await remember(theirs.roster, theirs.revision, theirs.contentHash, scope)
        conflict.value = { id, deletionRefused: true }
        clearTombstone(id)
        return false
      }
    }
    if (res.ok || res.status === 404) { clearTombstone(id); return true }
    throw new Error(`roster delete: ${res.status}`)
  }
  async function removeFromCloud(id) {
    if (isDraft(rosterById(id))) return
    addTombstone(id)
    clearPending(id)
    if (!authed()) return
    try { await remove(id, account()) }
    catch (e) { lastError.value = e instanceof Error ? e.message : String(e) }
  }

  async function syncNow() {
    if (syncing.value || !authed()) return
    syncing.value = true
    lastError.value = null
    conflict.value = null
    savedAt.value = 0
    const scope = account()
    try {
      if (localData.state.phase !== 'idle' && !await localData.flush()) return
      const res = await request('/roster-sync', undefined, scope)
      if (!res.ok) throw new Error(`list failed: ${res.status}`)
      const body = await read(res, scope)
      if (body.protocol !== 2 || !Array.isArray(body.rosters)) throw new Error('Conditional roster protocol unavailable')
      const cloud = new Map(body.rosters.map((m) => [m.rosterId, m]))
      checked.value = true
      for (const id of [...deletedIds.value]) {
        const meta = cloud.get(id)
        if (!meta || meta.deleted) clearTombstone(id)
        else if (await remove(id, scope)) cloud.delete(id)
      }
      let added = 0, updated = 0, removed = 0, failures = 0
      for (const [id, meta] of cloud) {
        if (deletedIds.value.has(id)) continue
        const local = snapshot(rosterById(id))
        if (isDraft(local)) continue
        const known = base(id, scope)
        if (meta.deleted) {
          if (!local) continue
          const hash = await hashFor(local, scope)
          if (!unchanged(id, local)) continue
          if (hash === known?.hash || (hash.startsWith('sha256:') && hash === meta.contentHash)) {
            deleteRoster(id)
            clearPending(id)
            removed++
          } else await preserve(id, null, scope, pendingIds.value.has(id))
          continue
        }
        if (local && pendingIds.value.has(id)) continue // push the deliberate save below
        if (local) {
          const hash = await hashFor(local, scope)
          if (!unchanged(id, local)) continue
          if (meta.contentHash === hash) { await remember(local, meta.revision, meta.contentHash, scope); continue }
          if (known?.revision === meta.revision && known.serverHash === meta.contentHash) continue
        }
        const theirs = await remote(id, scope)
        if (!theirs) continue // deleted between listing and read; the next visit sees its tombstone
        if (!unchanged(id, local)) continue
        if (!local) { adoptFromCloud(theirs.roster); added++ }
        else {
          const hash = await hashFor(local, scope)
          const theirHash = await hashFor(theirs.roster, scope)
          if (!unchanged(id, local)) continue
          if (hash !== theirHash && hash !== known?.hash) {
            await preserve(id, theirs, scope, false)
            continue
          }
          adoptFromCloud(theirs.roster)
          updated++
        }
        await remember(theirs.roster, theirs.revision, theirs.contentHash, scope)
      }
      for (const r of [...savedRosters.value]) {
        if (deletedIds.value.has(r.id)) continue
        const meta = cloud.get(r.id)
        if (meta && !pendingIds.value.has(r.id)) continue
        if (!await put(r, scope)) failures++
      }
      pulled.value = added || updated || removed ? { added, updated, removed } : null
      if (failures) lastError.value = `${failures} roster(s) failed to upload`
    } catch (e) { lastError.value = e instanceof Error ? e.message : String(e) }
    finally { syncing.value = false }
  }
  return { rosters, syncing, uploading, lastError, conflict, checked, pulled, savedAt, pendingCount, enabled, saveToCloud, removeFromCloud, syncNow }
}
