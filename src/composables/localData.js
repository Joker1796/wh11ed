import { reactive } from 'vue'
import { LOCAL_KEYS, changesFor, localView, recordsFor } from '../utils/localRecords.js'
import { openLocalDatabase } from '../utils/localDatabase.js'

const JOURNAL = 'wh11ed-local-pending/'
const MARKER = 'wh11ed-local-data-version'
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
  const state = reactive({ phase: 'idle', error: null, conflict: null, notice: 0, saving: false })
  const actor = uid()
  const journalKey = namespace + actor
  const subscribers = new Set()
  let db, initialized, releaseActor
  let records = new Map(), baseline = new Map(), cache = new Map()
  let desired = new Map(), running = null, journal = null
  let staging = Promise.resolve()
  let sequence = 0
  let paused = false
  let legacySource = new Map()

  const fail = (error) => { state.error = error instanceof Error ? error.message : String(error); state.notice++ }
  const legacy = () => new Map(LOCAL_KEYS.map((key) => [key, storage.getItem(key)]))
  const setRecords = (rows) => {
    records = new Map(rows.map((r) => [r.key, r]))
    baseline = localView(rows)
  }
  const publish = () => { for (const fn of subscribers) fn() }
  const expectedFor = (ops) => Object.fromEntries(ops.map((op) => [op.key, records.get(op.key)?.revision || 0]))
  function pending() { return changesFor(desired, baseline) }
  function stage(ops = pending(), expected = expectedFor(ops)) {
    journal = { key: `${actor}/${++sequence}`, ops, expected }
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
            const changes = changesFor(source, legacySource)
            let legacyConflict = false
            if (changes.length) {
              const candidate = { key: `legacy/${uid()}`, ops: changes, expected: Object.fromEntries(changes.map((op) => [op.key, 1])) }
              const imported = await db.commit(candidate)
              if (!imported.ok) { reportConflict(imported, candidate); legacyConflict = true }
            }
            await db.acknowledgeLegacy([...source])
            legacySource = source
            if (legacyConflict) return false
          }
          const ops = pending()
          if (!ops.length) {
            if (state.conflict && overrides) { await db.resolveRecovery(state.conflict.key); state.conflict = null; paused = false }
            desired.clear()
            if (journal) clearJournal(journal)
            break
          }
          const snapshot = new Map(desired)
          const expected = expectedFor(ops)
          if (overrides) for (const row of overrides.records) if (row.key in expected) expected[row.key] = row.revision
          stage(ops, expected)
          const submitted = journal
          const result = await db.commit({ ...submitted, confirmed: !!overrides, replaces: state.conflict?.key })
          if (!result.ok) { reportConflict(result, submitted); return false }
          for (const row of result.updated) records.set(row.key, row)
          // The baseline is the submitted view, never a later edit made while IDB was writing.
          for (const [key, value] of snapshot) {
            baseline.set(key, value)
            if (desired.get(key) === value) desired.delete(key)
          }
          clearJournal(submitted)
          state.error = null
          state.conflict = null
          paused = false
          overrides = null
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
        db = await open()
        if (locks) {
          let held
          const acquired = new Promise((resolve) => { held = resolve })
          locks.request(journalKey, () => new Promise((resolve) => { releaseActor = resolve; held() })).catch((error) => { held(); fail(error) })
          await acquired
        }
        const rows = []
        for (const [key, raw] of source) for (const [id, value] of recordsFor(key, raw)) if (value !== null) rows.push({ key: id, value })
        const created = await db.migrate(rows, source)
        const saved = await db.read()
        if (created && rows.some((r) => saved.find((s) => s.key === r.key)?.value !== r.value)) throw new Error('Local migration verification failed')
        setRecords(saved)
        if (!created) {
          const previous = (await db.metadata()).find((row) => row.key === 'legacy')
          if (!previous) throw new Error('Missing migration backup')
          const ops = changesFor(source, new Map(previous.entries))
          if (ops.length) {
            await replay({ key: `legacy/${uid()}`, ops, expected: Object.fromEntries(ops.map((op) => [op.key, 1])) }, '')
            await db.acknowledgeLegacy([...source])
          }
        }
        legacySource = source
        await recoverJournals()
        setRecords(await db.read())
        cache = new Map(baseline)
        const unresolved = []
        for (const candidate of (await db.recovery()).filter((row) => row.status === 'conflict')) {
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
        try { storage.setItem(MARKER, '1') } catch { /* The IDB migration marker is authoritative. */ }
        state.phase = 'ready'
        publish()
        return true
      } catch (error) { fail(error); state.conflict = null; state.phase = 'error'; return false }
    })()
    return initialized
  }

  return {
    state,
    initialize,
    getItem(key) { return state.phase === 'ready' ? cache.get(key) ?? null : storage.getItem(key) },
    subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn) },
    async backup() {
      if (!db) throw new Error('Local database is unavailable')
      return {
        format: 1,
        items: Object.fromEntries(localView(await db.read())),
        recovery: await db.recovery(),
        legacy: (await db.metadata()).find((row) => row.key === 'legacy-original')?.entries || [],
      }
    },
    write(entries, { requireJournal = false } = {}) {
      if (state.phase === 'idle') {
        // Unit tests and non-booted consumers retain the old synchronous contract. The browser
        // always initializes before mounting the app and never takes this path after migration.
        for (const [key, value] of entries) if (value === null) storage.removeItem(key); else storage.setItem(key, value)
        return true
      }
      if (state.phase !== 'ready') { fail(new Error('Local data is not ready')); return false }
      const oldDesired = new Map(desired), oldCache = new Map(cache), oldJournal = journal
      for (const [key, value] of entries) { desired.set(key, value); cache.set(key, value) }
      const durable = stage()
      if (!durable && requireJournal) { desired = oldDesired; cache = oldCache; journal = oldJournal; return false }
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
    async close() { await staging; await pump(); releaseActor?.(); db?.close() },
  }
}

export const localData = createLocalData()
