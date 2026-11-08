const DB_NAME = 'wh11ed-local-data'
const TIMEOUT_MS = 5000

export function openLocalDatabase({ factory = globalThis.indexedDB, name = DB_NAME } = {}) {
  return new Promise((resolve, reject) => {
    if (!factory) return reject(new Error('IndexedDB unavailable'))
    const request = factory.open(name, 1)
    let settled = false
    const timer = setTimeout(() => fail(new Error('Local database open timed out')), TIMEOUT_MS)
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
  return {
    close: () => db.close(),
    read: () => read('records'),
    recovery: () => read('recovery'),
    metadata: () => read('meta'),
    migrate(records, legacy) {
      return transaction(['records', 'meta'], 'readwrite', (tx, done) => {
        const meta = tx.objectStore('meta')
        const marker = meta.get('migration')
        marker.onsuccess = () => {
          if (marker.result) { done(false); return }
          for (const record of records) tx.objectStore('records').put({ ...record, revision: 1 })
          meta.put({ key: 'legacy', entries: [...legacy] })
          meta.put({ key: 'legacy-original', entries: [...legacy] })
          meta.put({ key: 'migration', version: 1 })
          done(true)
        }
      })
    },
    acknowledgeLegacy(entries) {
      return transaction(['meta'], 'readwrite', (tx) => tx.objectStore('meta').put({ key: 'legacy', entries: [...entries] }))
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
        const apply = () => {
          const conflicts = ops.filter((op) => (rows.get(op.key)?.revision || 0) !== (expected[op.key] || 0)
            && (rows.get(op.key)?.value ?? null) !== op.value)
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
          if (receipt.result && (receipt.result.submission === key || receipt.result.sequence >= sequence)) {
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
