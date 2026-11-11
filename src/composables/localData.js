import { reactive } from 'vue'
import { LOCAL_KEYS, changesFor, localView, inspectLegacy, legacyChanges, inspectStoredRecords, retiredLegacyIssues } from '../utils/localRecords.js'
import { openLocalDatabase } from '../utils/localDatabase.js'

const JOURNAL = 'wh11ed-local-pending/'
const MARKER = 'wh11ed-local-data-version'
// How long the original localStorage keys stay after migration: the window in which a tab of an
// older build may still be open and writing them. Afterwards IDB `legacy-original` is the backup.
export const LEGACY_RETIRE_MS = 30 * 24 * 60 * 60 * 1000
const noLegacy = () => new Map(LOCAL_KEYS.map((key) => [key, null]))
const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
// Do not touch the browser's storage getter at import time: SecurityError must never stop the
// rules reference from booting. Initialization reports it only when personal data is needed.
const browserStorage = {
  get length() { return globalThis.localStorage.length },
  key: (i) => globalThis.localStorage.key(i),
  getItem: (key) => globalThis.localStorage.getItem(key),
  setItem: (key, value) => globalThis.localStorage.setItem(key, value),
  removeItem: (key) => globalThis.localStorage.removeItem(key),
}

// Browser-facing cache over the transactional database. Legacy keys remain a migration backup;
// the tiny per-tab journal bridges the gap between a synchronous tap and asynchronous IDB commit.
// No dataset or tracker import belongs here: this is also read by the lightweight app shell.
export function createLocalData({ storage = browserStorage, open = openLocalDatabase, locks = globalThis.navigator?.locks, namespace = JOURNAL } = {}) {
  const state = reactive({ phase: 'idle', error: null, conflict: null, notice: 0, saving: false, quarantineCount: 0,
    progress: { step: 'opening', done: 0, total: 0, rosters: { done: 0, total: 0 }, games: { done: 0, total: 0 } } })
  const actor = uid()
  const journalKey = namespace + actor
  const subscribers = new Set()
  const captures = new Set()
  let channel, refreshTask, refreshAgain = false, stopLive = () => {}
  let db, initialized, releaseActor
  let records = new Map(), baseline = new Map(), cache = new Map()
  let desired = new Map(), running = null, journal = null
  let staging = Promise.resolve()
  let sequence = 0
  let paused = false
  let legacySource = new Map()
  let retired = false

  const fail = (error) => { state.error = error instanceof Error ? error.message : String(error); state.notice++ }
  const legacy = () => new Map(LOCAL_KEYS.map((key) => [key, storage.getItem(key)]))
  const setRecords = (rows) => {
    const inspected = inspectStoredRecords(rows)
    records = new Map(inspected.valid.map((r) => [r.key, r]))
    baseline = localView(inspected.valid)
    return inspected.issues
  }
  const publish = () => Promise.all([...subscribers].map(fn => fn()))
  const expectedFor = (ops) => Object.fromEntries(ops.map((op) => [op.key, records.get(op.key)?.revision || 0]))
  const notify = () => {
    try { channel?.postMessage({ actor }) } catch { /* Focus refresh also covers missed signals. */ }
  }
  function startLive() {
    if (namespace !== JOURNAL || storage !== browserStorage || typeof window === 'undefined') return
    const refresh = () => { if (state.phase === 'ready') api.refresh().catch(fail) }
    const visible = () => { if (document.visibilityState === 'visible') refresh() }
    if (typeof window.BroadcastChannel === 'function') {
      channel = new window.BroadcastChannel('wh-rules-local-data')
      channel.onmessage = (event) => { if (event.data?.actor !== actor) refresh() }
    }
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', visible)
    stopLive = () => { channel?.close(); channel = undefined; window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', visible) }
  }
  async function refresh() {
    if (state.phase !== 'ready') return false
    if (refreshTask) { refreshAgain = true; return refreshTask }
    refreshTask = (async () => {
      // Capture store edits before advancing any baseline, including the debounce window.
      for (const capture of captures) capture()
      await pump()
      const rows = await db.read()
      for (const capture of captures) capture()
      // A write can start while that read is in flight. Read again after it settles.
      if (running) { refreshAgain = true; return false }
      const inspected = inspectStoredRecords(rows)
      if (inspected.issues.length) { fail(new Error('Updated local records could not be read')); return false }
      const ops = pending()
      const dirty = new Set([...ops.map(op => op.key), ...(state.conflict?.keys || [])])
      const merged = new Map(inspected.valid.map(row => [row.key, row]))
      // Dirty records keep their original revision, so refresh can never hide a conflict.
      for (const key of dirty) {
        if (records.has(key)) merged.set(key, records.get(key))
        else merged.delete(key)
      }
      records = merged
      baseline = localView([...records.values()])
      const view = new Map(records)
      for (const op of ops) {
        if (op.value === null) view.delete(op.key)
        else view.set(op.key, op)
      }
      const next = localView([...view.values()])
      const changed = LOCAL_KEYS.some(key => next.get(key) !== cache.get(key))
      cache = next
      // Rebase only clean entities in collection envelopes. Leaving the old envelope here
      // would turn another tab's additions/deletions into this tab's next write.
      desired = new Map(LOCAL_KEYS.filter(key => cache.get(key) !== baseline.get(key)).map(key => [key, cache.get(key)]))
      if (changed) await publish()
      return !state.conflict && !state.error
    })()
    try { return await refreshTask } finally {
      refreshTask = null
      if (refreshAgain) { refreshAgain = false; queueMicrotask(() => api.refresh().catch(fail)) }
    }
  }
  async function importLegacy(source, previous) {
    const planned = legacyChanges(source, previous)
    let ok = true
    if (planned.ops.length) {
      const current = new Map((await db.read()).map((row) => [row.key, row]))
      // The old build edited from the snapshot it last saw. Its change applies only to a record
      // that still holds that snapshot; anything else becomes a conflict (revision -1 never matches).
      const unchangedSinceSnapshot = (op) => {
        const row = current.get(op.key)
        const snapshotValue = planned.before.get(op.key) ?? null
        return (row?.value ?? null) === snapshotValue && (planned.before.has(op.key) || !row)
      }
      const expected = Object.fromEntries(planned.ops.map((op) =>
        [op.key, unchangedSinceSnapshot(op) ? current.get(op.key)?.revision || 0 : -1]))
      const candidate = { key: `legacy/${uid()}`, ops: planned.ops, expected }
      const result = await db.commit(candidate)
      if (!result.ok) { reportConflict(result, candidate); ok = false }
    }
    await db.acknowledgeLegacy([...source], planned.issues)
    legacySource = source
    state.quarantineCount = (await db.recovery()).filter((row) => row.status === 'quarantined').length
    return ok
  }
  async function absorbRetired(source) {
    const issues = retiredLegacyIssues(source)
    if (!issues.length) return
    await db.quarantine(issues)
    for (const key of LOCAL_KEYS) { try { storage.removeItem(key) } catch { /* Kept in recovery; retried at next start. */ } }
    state.quarantineCount = (await db.recovery()).filter((row) => row.status === 'quarantined').length
  }
  async function retireLegacy() {
    await db.retireLegacy(LOCAL_KEYS)
    retired = true
    legacySource = noLegacy()
    for (const key of LOCAL_KEYS) { try { storage.removeItem(key) } catch { /* absorbRetired finishes it later. */ } }
  }
  // A successful submission may clear only the requirement it captured. A later edit can
  // arrive while that transaction is pending, including while a confirmation is committing.
  let confirmationGeneration = 0
  let requireConfirmation = 0
  function pending() { return changesFor(desired, baseline) }
  function stage(ops = pending(), expected = expectedFor(ops), confirmed = false) {
    // An impossible revision also protects the candidate from older code that ignores the
    // requiresConfirmation field. A real confirmation supplies the observed revisions.
    if (requireConfirmation && !confirmed) expected = Object.fromEntries(ops.map(op => [op.key, -1]))
    journal = { key: `${actor}/${++sequence}`, ops, expected, requiresConfirmation: !!requireConfirmation && !confirmed }
    try { storage.setItem(journalKey, JSON.stringify(journal)); return true }
    catch (error) { fail(error); return false }
  }
  function clearJournal(submitted) {
    if (journal?.key !== submitted.key) return
    try { storage.removeItem(journalKey) } catch { /* IDB has committed; a replay is idempotent. */ }
    journal = null
  }
  function reportConflict(result, submitted) {
    state.conflict = { key: submitted.key, records: result.before, keys: result.conflicts.map((r) => r.key) }
    state.notice++
    paused = true
  }
  async function pump(confirmation = null) {
    if (running) { await running; if (confirmation) return pump(confirmation); return !state.error && !state.conflict }
    if (!db || (paused && !confirmation)) return false
    running = (async () => {
      state.saving = true
      try {
        let overrides = confirmation
        while (desired.size) {
          const source = legacy()
          if (LOCAL_KEYS.some((key) => source.get(key) !== legacySource.get(key))) {
            if (retired) await absorbRetired(source)
            else if (!await importLegacy(source, legacySource)) return false
          }
          const ops = pending()
          const snapshot = new Map(desired)
          const submittedConfirmation = requireConfirmation
          // The displayed candidate may have changed while legacy import / another commit
          // was in flight. A decision never grants permission to a different candidate.
          if (overrides && overrides.key !== state.conflict?.key) return false
          if (!ops.length) {
            const submitted = journal
            if (state.conflict && overrides) {
              await db.resolveRecovery(overrides.key)
              if (state.conflict?.key === overrides.key) { state.conflict = null; paused = false }
            }
            for (const [key, value] of snapshot) if (desired.get(key) === value) desired.delete(key)
            if (requireConfirmation === submittedConfirmation) requireConfirmation = 0
            if (submitted) clearJournal(submitted)
            overrides = null
            continue
          }
          const expected = expectedFor(ops)
          if (overrides) for (const row of overrides.records) if (row.key in expected) expected[row.key] = row.revision
          stage(ops, expected, !!overrides)
          const submitted = journal
          const replaces = state.conflict?.key
          const result = await db.commit({ ...submitted, confirmed: !!overrides, replaces })
          if (!result.ok) { reportConflict(result, submitted); return false }
          for (const row of result.updated) records.set(row.key, row)
          notify()
          // The baseline is the submitted view, never a later edit made while IDB was writing.
          for (const [key, value] of snapshot) {
            baseline.set(key, value)
            if (desired.get(key) === value) desired.delete(key)
          }
          clearJournal(submitted)
          state.error = null
          if (state.conflict?.key === replaces) { state.conflict = null; paused = false }
          overrides = null
          if (requireConfirmation === submittedConfirmation) requireConfirmation = 0
        }
        return true
      } catch (error) { fail(error); return false }
      finally { state.saving = false }
    })()
    try { return await running } finally { running = null }
  }

  async function replay(candidate, key) {
    if (!candidate || !Array.isArray(candidate.ops) || !candidate.expected || typeof candidate.key !== 'string') throw new Error('Invalid pending local save')
    const result = await db.commit(candidate)
    if (!result.ok) reportConflict(result, candidate)
    // The candidate is now either committed or durably kept by the database as a conflict.
    try { if (storage.getItem(key) === JSON.stringify(candidate)) storage.removeItem(key) }
    catch { /* The transaction receipt makes a surviving journal safe to replay again. */ }
  }
  async function recoverJournals() {
    const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i)).filter((key) => key?.startsWith(namespace) && key !== journalKey)
    if (keys.length && !locks) throw new Error('Pending local recovery requires Web Locks')
    for (const key of keys) {
      const recover = async () => {
        const raw = storage.getItem(key)
        if (raw) await replay(JSON.parse(raw), key)
      }
      // An open tab owns its journal for its lifetime. Recover only journals whose owner is
      // gone; a suspended live tab may still be about to finish its original IDB transaction.
      if (locks) await locks.request(key, { ifAvailable: true }, async (lock) => { if (lock) await recover() })
    }
  }
  async function initialize() {
    if (initialized) return initialized
    state.phase = 'loading'
    initialized = (async () => {
      try {
        const source = legacy()
        // WebKit occasionally leaves the first open of a session hanging; a fresh request usually
        // succeeds. One retry, then the original error, so a real failure is still reported.
        db = await open().catch(async (first) => {
          await new Promise((resolve) => setTimeout(resolve, 300))
          return open().catch(() => { throw first })
        })
        if (locks) {
          let held
          const acquired = new Promise((resolve) => { held = resolve })
          locks.request(journalKey, () => new Promise((resolve) => { releaseActor = resolve; held() })).catch((error) => { held(); fail(error) })
          await acquired
        }
        let created = false, rows = []
        const marker = await db.meta('migration')
        if (!marker) {
          state.progress.step = 'preparing'
          const inspected = inspectLegacy(source)
          rows = [...inspected.records].filter(([, value]) => value !== null).map(([key, value]) => ({ key, value }))
          state.progress.rosters = { done: 0, total: rows.filter((r) => r.key.startsWith('roster/')).length }
          state.progress.games = { done: 0, total: rows.filter((r) => r.key.startsWith('history/') || r.key === 'current').length }
          state.progress.total = rows.length
          state.progress.step = 'copying'
          created = await db.migrate(rows, source, { issues: inspected.issues, onProgress: ({ key, done, total }) => {
            state.progress.done = done; state.progress.total = total
            if (key?.startsWith('roster/')) state.progress.rosters.done++
            else if (key?.startsWith('history/') || key === 'current') state.progress.games.done++
          } })
        }
        state.progress.step = created ? 'verifying' : 'reading'
        const saved = await db.read()
        const savedById = new Map(saved.map((r) => [r.key, r.value]))
        if (created && rows.some((r) => savedById.get(r.key) !== r.value)) throw new Error('Local migration verification failed')
        const storedIssues = setRecords(saved)
        if (storedIssues.length) await db.quarantine(storedIssues)
        retired = !!await db.meta('legacy-retired')
        let legacyClean = true
        if (retired) await absorbRetired(source)
        else if (!created) {
          const previous = await db.meta('legacy') || await db.meta('legacy-original')
          const previousEntries = new Map(previous?.entries || [])
          if (LOCAL_KEYS.some((key) => source.get(key) !== previousEntries.get(key))) legacyClean = await importLegacy(source, previousEntries)
        }
        legacySource = retired ? noLegacy() : source
        state.progress.step = 'recovering'
        await recoverJournals()
        const replayIssues = setRecords(await db.read())
        if (replayIssues.length) await db.quarantine(replayIssues)
        cache = new Map(baseline)
        const unresolved = []
        const recovery = await db.recovery()
        state.quarantineCount = recovery.filter((row) => row.status === 'quarantined').length
        for (const candidate of recovery.filter((row) => row.status === 'conflict')) {
          const owner = candidate.key.slice(0, candidate.key.lastIndexOf('/'))
          if (owner === 'legacy') unresolved.push(candidate)
          else if (locks) await locks.request(namespace + owner, { ifAvailable: true }, (lock) => { if (lock) unresolved.push(candidate) })
          else throw new Error('Pending local recovery requires Web Locks')
        }
        // Keep every candidate in recovery. Present one decision at a time; loading a candidate
        // does not change the authoritative records until the player confirms replacement.
        if (unresolved.length) {
          const candidate = unresolved.sort((a, b) => b.at - a.at)[0]
          const pendingRecords = new Map(records)
          for (const op of candidate.ops) pendingRecords.set(op.key, { ...op, revision: records.get(op.key)?.revision || 0 })
          cache = localView([...pendingRecords.values()])
          desired = new Map(cache)
          state.conflict = { key: candidate.key, records: candidate.before, keys: candidate.ops.map((op) => op.key) }
          paused = true
          state.notice++
        }
        if (!retired && !created && marker) {
          if (!marker.at) await db.putMeta({ ...marker, at: Date.now() })
          else if (Date.now() - marker.at > LEGACY_RETIRE_MS && legacyClean && !unresolved.length
            && LOCAL_KEYS.every((key) => storage.getItem(key) === legacySource.get(key))) await retireLegacy()
        }
        try { storage.setItem(MARKER, '1') } catch { /* The IDB migration marker is authoritative. */ }
        state.phase = 'ready'
        startLive()
        await publish()
        return true
      } catch (error) { fail(error); state.conflict = null; state.phase = 'error'; return false }
    })()
    return initialized
  }

  const api = {
    state,
    reportError: fail,
    initialize,
    refresh,
    beforeRefresh(fn) { captures.add(fn); return () => captures.delete(fn) },
    getItem(key) { return state.phase === 'ready' ? cache.get(key) ?? null : storage.getItem(key) },
    subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn) },
    async backup() {
      if (!db) throw new Error('Local database is unavailable')
      const rawRecords = await db.read()
      return {
        format: 1,
        items: Object.fromEntries(localView(inspectStoredRecords(rawRecords).valid)),
        records: rawRecords,
        pending: journal,
        recovery: await db.recovery(),
        legacy: (await db.meta('legacy-original'))?.entries || [],
      }
    },
    write(entries, { requireJournal = false, confirmReplacement = false } = {}) {
      if (state.phase === 'idle') {
        // Unit tests and non-booted consumers retain the old synchronous contract. The browser
        // always initializes before mounting the app and never takes this path after migration.
        for (const [key, value] of entries) if (value === null) storage.removeItem(key); else storage.setItem(key, value)
        return true
      }
      if (state.phase !== 'ready') { fail(new Error('Local data is not ready')); return false }
      const undo = { desired: new Map(desired), cache: new Map(cache), journal, requireConfirmation }
      if (confirmReplacement || requireConfirmation || paused) requireConfirmation = ++confirmationGeneration
      for (const [key, value] of entries) { desired.set(key, value); cache.set(key, value) }
      let durable
      try { durable = stage() }
      catch (error) {
        ;({ desired, cache, journal, requireConfirmation } = undo)
        fail(error)
        return false
      }
      if (!durable && requireJournal) {
        // A critical change must not exist only in memory: roll the view back to before it.
        ;({ desired, cache, journal, requireConfirmation } = undo)
        return false
      }
      state.notice++
      if (!paused) void pump()
      else {
        // Vue wraps state.conflict in proxies. IndexedDB needs a plain JSON snapshot, including
        // the nested before[] rows; passing reactive objects raises DataCloneError in browsers.
        const candidate = JSON.parse(JSON.stringify({ ...journal, before: state.conflict.records }))
        const previous = state.conflict.key
        state.conflict = { ...state.conflict, key: candidate.key }
        staging = staging.then(async () => { await db.stageConflict(candidate); await db.resolveRecovery(previous) }).catch(fail)
      }
      return durable
    },
    async flush() {
      await staging
      return state.phase === 'ready' ? pump() : state.phase === 'idle'
    },
    async confirm(conflict) {
      await staging
      if (state.phase !== 'ready' || conflict?.key !== state.conflict?.key) return false
      return pump(conflict)
    },
    async close() { await staging; await pump(); stopLive(); releaseActor?.(); db?.close() },
  }
  return api
}

export const localData = createLocalData()
