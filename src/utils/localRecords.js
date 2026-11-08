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
