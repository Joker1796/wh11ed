const DB_NAME = 'wh11ed-local-data'
const TIMEOUT_MS = 5000
// Opening is retried once by localData, so the two attempts together stay near the old bound.
const OPEN_TIMEOUT_MS = 2500

export function openLocalDatabase({ factory = globalThis.indexedDB, name = DB_NAME } = {}) {
  return new Promise((resolve, reject) => {
    if (!factory) return reject(new Error('IndexedDB unavailable'))
    const request = factory.open(name, 1)
    let settled = false
    const timer = setTimeout(() => fail(new Error('Local database open timed out')), OPEN_TIMEOUT_MS)
    const fail = (error) => { if (!settled) { settled = true; clearTimeout(timer); reject(error) } }
    request.onupgradeneeded = () => {
      const db = request.result
      for (const store of ['records', 'meta', 'recovery']) if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: 'key' })
    }
    request.onerror = () => fail(request.error)
    request.onblocked = () => fail(new Error('Local database upgrade blocked by another tab'))
    request.onsuccess = () => {
      if (settled) { request.result.close(); return }
      settled = true
      clearTimeout(timer)
      const db = request.result
      db.onversionchange = () => db.close()
      resolve(database(db))
    }
  })
}

function database(db) {
  // All dependent reads and writes stay in IDB request callbacks. No network or unrelated
  // Promise can let WebKit auto-commit the transaction between the revision check and write.
  function transaction(stores, mode, run) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(stores, mode)
      let result
      const timer = setTimeout(() => { try { tx.abort() } catch { /* already complete */ } }, TIMEOUT_MS)
      tx.oncomplete = () => { clearTimeout(timer); resolve(result) }
      tx.onabort = tx.onerror = () => { clearTimeout(timer); reject(tx.error || new Error('Local transaction aborted')) }
      try { run(tx, (value) => { result = value }) } catch (error) { tx.abort(); reject(error) }
    })
  }
  const read = (store) => transaction([store], 'readonly', (tx, done) => {
    const r = tx.objectStore(store).getAll()
    r.onsuccess = () => done(r.result)
  })
  function quarantine(tx, issues) {
    const store = tx.objectStore('recovery')
    for (const entry of issues) {
      const save = (attempt = 0) => {
        const key = attempt ? `${entry.key}/${attempt}` : entry.key
        const r = store.get(key)
        r.onsuccess = () => {
          const previous = r.result
          if (!previous) { store.put({ ...entry, key, status: 'quarantined', at: Date.now() }); return }
          // The key is a short hash: an occupied slot holding different data is a collision.
          const sameEntry = previous.raw === entry.raw && previous.sourceKey === entry.sourceKey && previous.index === entry.index
          if (!sameEntry) save(attempt + 1)
        }
      }
      save()
    }
  }
  return {
    close: () => db.close(),
    read: () => read('records'),
    recovery: () => read('recovery'),
    metadata: () => read('meta'),
    meta(key) {
      return transaction(['meta'], 'readonly', (tx, done) => {
        const r = tx.objectStore('meta').get(key)
        r.onsuccess = () => done(r.result || null)
      })
    },
    migrate(records, legacy, { issues = [], onProgress = () => {} } = {}) {
      return transaction(['records', 'meta', 'recovery'], 'readwrite', (tx, done) => {
        const meta = tx.objectStore('meta')
        const marker = meta.get('migration')
        marker.onsuccess = () => {
          if (marker.result) { done(false); return }
          let written = 0
          onProgress({ done: 0, total: records.length })
          for (const record of records) {
            const r = tx.objectStore('records').put({ ...record, revision: 1 })
            r.onsuccess = () => onProgress({ key: record.key, done: ++written, total: records.length })
          }
          quarantine(tx, issues)
          meta.put({ key: 'legacy', entries: [...legacy] })
          meta.put({ key: 'legacy-original', entries: [...legacy] })
          meta.put({ key: 'migration', version: 1, at: Date.now() })
          done(true)
        }
      })
    },
    acknowledgeLegacy(entries, issues = []) {
      return transaction(['meta', 'recovery'], 'readwrite', (tx) => {
        quarantine(tx, issues)
        tx.objectStore('meta').put({ key: 'legacy', entries: [...entries] })
      })
    },
    putMeta(row) {
      return transaction(['meta'], 'readwrite', (tx) => tx.objectStore('meta').put(row))
    },
    // The localStorage copy stops being a source. `legacy-original` keeps the exact original.
    retireLegacy(keys) {
      return transaction(['meta'], 'readwrite', (tx) => {
        const meta = tx.objectStore('meta')
        meta.put({ key: 'legacy', entries: keys.map((key) => [key, null]) })
        meta.put({ key: 'legacy-retired', at: Date.now() })
      })
    },
    quarantine(issues) {
      return transaction(['recovery'], 'readwrite', (tx) => quarantine(tx, issues))
    },
    resolveRecovery(key) {
      return transaction(['recovery'], 'readwrite', (tx) => {
        const store = tx.objectStore('recovery'), r = store.get(key)
        r.onsuccess = () => { if (r.result) store.put({ ...r.result, status: 'resolved' }) }
      })
    },
    stageConflict(candidate) {
      return transaction(['recovery'], 'readwrite', (tx) => tx.objectStore('recovery').put({ ...candidate, status: 'conflict', at: Date.now() }))
    },
    commit({ key, ops, expected, confirmed = false, at = Date.now(), replaces }) {
      return transaction(['records', 'recovery', 'meta'], 'readwrite', (tx, done) => {
        const records = tx.objectStore('records')
        const split = key.lastIndexOf('/')
        const sequence = Number(key.slice(split + 1))
        const receiptKey = Number.isSafeInteger(sequence) ? `writer/${key.slice(0, split)}` : `receipt/${key}`
        const meta = tx.objectStore('meta')
        const receipt = meta.get(receiptKey)
        const rows = new Map()
        let remaining = ops.length
        // A record conflicts when it moved since the writer read it, unless it already holds
        // exactly the value being written (two tabs making the same change agree).
        const isConflict = (op) => {
          const row = rows.get(op.key)
          const moved = (row?.revision || 0) !== (expected[op.key] || 0)
          return moved && (row?.value ?? null) !== op.value
        }
        const apply = () => {
          const conflicts = ops.filter(isConflict)
          const before = ops.map((op) => rows.get(op.key) || { key: op.key, value: null, revision: 0 })
          // The candidate is durable even when the revision check refuses it. Confirmation also
          // keeps the replaced version, so both sides can be recovered after a crash or restart.
          if (conflicts.length || confirmed) tx.objectStore('recovery').put({ key, ops, before, at, status: conflicts.length ? 'conflict' : 'committed', confirmed })
          if (replaces && replaces !== key) {
            const recovery = tx.objectStore('recovery'), previous = recovery.get(replaces)
            previous.onsuccess = () => { if (previous.result) recovery.put({ ...previous.result, status: 'resolved' }) }
          }
          if (conflicts.length) { done({ ok: false, conflicts, before }); return }
          const updated = []
          for (const op of ops) {
            const old = rows.get(op.key)
            if ((old?.value ?? null) === op.value) { if (old) updated.push(old); continue }
            const next = { ...op, revision: (old?.revision || 0) + 1 }
            records.put(next)
            updated.push(next)
          }
          meta.put({ key: receiptKey, sequence, submission: key })
          done({ ok: true, updated })
        }
        receipt.onsuccess = () => {
          // Clearing the synchronous journal can fail AFTER IDB commits. A later restart must
          // recognize that old submission even if another tab has since changed the record.
          const last = receipt.result
          const alreadyCommitted = last && (last.submission === key || last.sequence >= sequence)
          if (alreadyCommitted) {
            done({ ok: true, updated: [], replayed: true }); return
          }
          if (!remaining) { done({ ok: true, updated: [] }); return }
          for (const op of ops) {
            const r = records.get(op.key)
            r.onsuccess = () => { rows.set(op.key, r.result); if (!--remaining) apply() }
          }
        }
      })
    },
  }
}
