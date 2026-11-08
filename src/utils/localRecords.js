import { stableJson } from './stableJson.js'

export const LOCAL_KEYS = ['wh11ed-rosters', 'wh11ed-tracker-current', 'wh11ed-tracker-history', 'wh11ed-tracker-setup-draft']
function unique(entries) {
  const records = new Map(entries)
  if (records.size !== entries.length) throw new Error('Duplicate local record identity')
  return records
}

// Split collections into independently versioned records. Moving a game between current and
// history is still one transaction; editing one roster never rewrites another tab's collection.
export function recordsFor(key, raw) {
  const value = raw === null ? null : JSON.parse(raw)
  if (key === LOCAL_KEYS[0]) {
    if (value !== null && !Array.isArray(value?.rosters)) throw new Error('Invalid roster envelope')
    return unique((value?.rosters || []).map((r) => {
      if (!r || typeof r.id !== 'string') throw new Error('Invalid roster identity')
      return [`roster/${r.id}`, stableJson({ ...r, v: Number.isInteger(r.v) ? r.v : value.v || 0 })]
    }))
  }
  if (key === LOCAL_KEYS[2]) {
    if (value !== null && !Array.isArray(value)) throw new Error('Invalid game history')
    return unique((value || []).map((g) => {
      if (!g || typeof g.id !== 'string') throw new Error('Invalid game identity')
      return [`history/${g.id}`, stableJson(g)]
    }))
  }
  return new Map([[key === LOCAL_KEYS[1] ? 'current' : 'setup', value === null ? null : stableJson(value)]])
}

export function localView(records) {
  const live = records.filter((r) => r.value !== null)
  const rosters = live.filter((r) => r.key.startsWith('roster/')).map((r) => JSON.parse(r.value))
  const version = rosters.reduce((v, r) => Math.max(v, r.v || 0), 0)
  const history = live.filter((r) => r.key.startsWith('history/')).map((r) => JSON.parse(r.value))
  history.sort((a, b) => String(b.finishedAt || b.createdAt || '').localeCompare(String(a.finishedAt || a.createdAt || '')))
  const item = (key) => live.find((r) => r.key === key)?.value ?? null
  return new Map([
    [LOCAL_KEYS[0], JSON.stringify({ v: version, rosters })],
    [LOCAL_KEYS[1], item('current')],
    [LOCAL_KEYS[2], JSON.stringify(history)],
    [LOCAL_KEYS[3], item('setup')],
  ])
}

export function changesFor(entries, baseline) {
  const ops = []
  for (const [key, raw] of entries) {
    const before = recordsFor(key, baseline.get(key) ?? null)
    const after = recordsFor(key, raw)
    for (const id of new Set([...before.keys(), ...after.keys()])) {
      const value = after.get(id) ?? null
      if ((before.get(id) ?? null) !== value) ops.push({ key: id, value })
    }
  }
  return ops
}

const object = (v) => !!v && typeof v === 'object' && !Array.isArray(v)
const rosterShape = (v, version = v?.v) => object(v) && typeof v.id === 'string' && !!v.id
  && typeof v.name === 'string' && Array.isArray(v.units)
  && v.units.every((u) => object(u) && (version < 3 || u.wg == null || (Array.isArray(u.wg) && u.wg.every(Array.isArray))))
const gameShape = (v) => object(v) && typeof v.id === 'string' && !!v.id
  && Array.isArray(v.players) && v.players.length === 2 && v.players.every(object) && object(v.settings)
const setupShape = (v) => object(v) && Array.isArray(v.players) && v.players.length === 2 && v.players.every(object) && object(v.settings)

// This fingerprint is only an index for quarantine entries, not proof of equality. The database
// compares the complete source before reusing an existing slot, including hash collisions.
function issue(sourceKey, index, reason, raw) {
  const text = `${sourceKey}/${index}/${reason}/${raw}`
  let hash = 2166136261
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619)
  return { key: `quarantine/${(hash >>> 0).toString(16)}`, sourceKey, index, reason, raw }
}

// Only legacy input is tolerant. Ordinary writes keep recordsFor's strict contract, so an
// incomplete read can never silently become a request to delete the rest of a collection.
export function inspectLegacy(entries) {
  const records = new Map(), sections = new Map(), completeKeys = new Set(), issues = []
  for (const [key, raw] of entries) {
    const section = new Map()
    sections.set(key, section)
    let value
    try { value = raw === null ? null : JSON.parse(raw) }
    catch { issues.push(issue(key, null, 'json', raw)); continue }
    const rosters = key === LOCAL_KEYS[0], history = key === LOCAL_KEYS[2]
    let complete = true
    if (rosters || history) {
      const list = value === null ? [] : rosters ? value?.rosters : value
      if (!Array.isArray(list)) { issues.push(issue(key, null, 'container', raw)); continue }
      for (let index = 0; index < list.length; index++) {
        const item = list[index]
        if (!(rosters ? rosterShape(item, Number.isInteger(item?.v) ? item.v : value.v || 0) : gameShape(item))) {
          issues.push(issue(key, index, 'shape', JSON.stringify(item))); complete = false; continue
        }
        const id = `${rosters ? 'roster' : 'history'}/${item.id}`
        if (section.has(id)) { issues.push(issue(key, index, 'duplicate', JSON.stringify(item))); complete = false; continue }
        section.set(id, stableJson(rosters ? { ...item, v: Number.isInteger(item.v) ? item.v : value.v || 0 } : item))
      }
    } else {
      if (value !== null && !(key === LOCAL_KEYS[1] ? gameShape(value) : setupShape(value))) {
        issues.push(issue(key, null, 'shape', raw)); continue
      }
      section.set(key === LOCAL_KEYS[1] ? 'current' : 'setup', value === null ? null : stableJson(value))
    }
    if (complete) completeKeys.add(key)
    for (const [id, payload] of section) records.set(id, payload)
  }
  return { records, sections, completeKeys, issues }
}

export function legacyChanges(entries, previous) {
  const after = inspectLegacy(entries), before = inspectLegacy(previous), ops = []
  for (const [key, raw] of entries) {
    if (raw === previous.get(key)) continue
    const old = before.sections.get(key) || new Map(), next = after.sections.get(key) || new Map()
    for (const id of new Set([...old.keys(), ...next.keys()])) {
      if (!next.has(id) && !after.completeKeys.has(key)) continue
      const value = next.get(id) ?? null
      if ((old.get(id) ?? null) !== value) ops.push({ key: id, value })
    }
  }
  return { ops, before: before.records, issues: after.issues }
}

// After retirement the legacy keys are not a source any more. Whatever an old build still wrote
// there is kept in recovery, never imported over the database and never dropped unseen.
export function retiredLegacyIssues(entries) {
  return [...entries].filter(([, raw]) => raw !== null).map(([key, raw]) => issue(key, null, 'retired-legacy', raw))
}

export function inspectStoredRecords(rows) {
  const valid = [], issues = []
  for (const row of rows) {
    if (row.value === null) { valid.push(row); continue }
    try {
      const value = JSON.parse(row.value)
      const good = row.key.startsWith('roster/') ? rosterShape(value) && `roster/${value.id}` === row.key
        : row.key.startsWith('history/') ? gameShape(value) && `history/${value.id}` === row.key
          : row.key === 'current' ? gameShape(value) : row.key === 'setup' ? setupShape(value) : false
      if (!good || !Number.isSafeInteger(row.revision) || row.revision < 1) throw new Error('Invalid stored record')
      valid.push(row)
    } catch { issues.push(issue(`indexeddb/${row.key}`, null, 'stored-record', JSON.stringify(row))) }
  }
  return { valid, issues }
}
