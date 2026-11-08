import { describe, it, expect } from 'vitest'
import { LOCAL_KEYS, changesFor, localView, recordsFor, inspectLegacy, legacyChanges } from './localRecords.js'

const env = (rosters, v = 13) => JSON.stringify({ v, rosters })
const rosterKey = LOCAL_KEYS[0]
describe('local record identity', () => {
  it('changes one roster without deleting a different roster created in another tab', () => {
    const base = new Map([[rosterKey, env([{ id: 'a', name: 'Base' }])]])
    expect(changesFor([[rosterKey, env([{ id: 'a', name: 'Edited' }])]], base)).toEqual([
      { key: 'roster/a', value: '{"id":"a","name":"Edited","v":13}' },
    ])
  })
  it('keeps per-roster migration versions when different generations coexist', () => {
    const rows = [
      { key: 'roster/old', value: '{"id":"old","v":4}' },
      { key: 'roster/new', value: '{"id":"new","v":13}' },
    ]
    const view = localView(rows)
    expect(recordsFor(rosterKey, view.get(rosterKey))).toEqual(new Map(rows.map((r) => [r.key, r.value])))
  })
  it('does not mistake JSON property order for an edit', () => {
    const before = env([{ id: 'a', name: 'A', units: [] }])
    const after = env([{ units: [], name: 'A', id: 'a' }])
    expect(changesFor([[rosterKey, after]], new Map([[rosterKey, before]]))).toEqual([])
  })
  it('keeps a deletion as an explicit tombstone instead of touching the whole collection', () => {
    const before = env([{ id: 'a' }, { id: 'b' }])
    expect(changesFor([[rosterKey, env([{ id: 'b' }])]], new Map([[rosterKey, before]]))).toEqual([{ key: 'roster/a', value: null }])
  })
  it('rejects duplicate identities instead of silently dropping one legacy variant', () => {
    expect(() => recordsFor(rosterKey, env([{ id: 'a', name: 'First' }, { id: 'a', name: 'Second' }]))).toThrow(/duplicate/i)
  })
  it('represents archive and resume as current/history changes that can share one transaction', () => {
    const game = JSON.stringify({ id: 'g', phase: 'finished' })
    const base = new Map([[LOCAL_KEYS[1], game], [LOCAL_KEYS[2], '[]']])
    expect(changesFor([[LOCAL_KEYS[1], null], [LOCAL_KEYS[2], `[${game}]`]], base)).toEqual([
      { key: 'current', value: null }, { key: 'history/g', value: game },
    ])
  })
})

describe('legacy migration quarantine', () => {
  const good = { id: 'good', name: 'Working list', units: [] }
  it('keeps healthy rosters when one entry is null, and retains the rejected source', () => {
    const raw = env([good, null])
    const result = inspectLegacy(new Map([[rosterKey, raw]]))
    expect(result.records.get('roster/good')).toBe('{"id":"good","name":"Working list","units":[],"v":13}')
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0]).toMatchObject({ sourceKey: rosterKey, index: 1, raw: 'null' })
    expect(result.completeKeys.has(rosterKey)).toBe(false)
  })
  it('retains a duplicate variant without replacing the first roster', () => {
    const result = inspectLegacy(new Map([[rosterKey, env([good, { ...good, name: 'Other variant' }])]]))
    expect(result.records.size).toBe(1)
    expect(result.issues[0].raw).toContain('Other variant')
    expect(result.issues[0].reason).toBe('duplicate')
  })
  it('isolates broken history and a roster with a malformed unit', () => {
    const result = inspectLegacy(new Map([[rosterKey, env([good, { id: 'bad', name: 'Bad', units: [null] }])], [LOCAL_KEYS[2], '[null]']]))
    expect([...result.records.keys()]).toEqual(['roster/good'])
    expect(result.issues).toHaveLength(2)
  })
  it('does not translate a broken legacy container into deletions of healthy IDB records', () => {
    const before = new Map([[rosterKey, env([good])]])
    const after = new Map([[rosterKey, '{broken json']])
    expect(legacyChanges(after, before).ops).toEqual([])
    expect(legacyChanges(after, before).issues[0].raw).toBe('{broken json')
  })
  it('does not infer deletes from an incomplete collection, but accepts healthy additions', () => {
    const before = new Map([[rosterKey, env([good])]])
    const after = new Map([[rosterKey, env([{ id: 'new', name: 'New', units: [] }, null])]])
    expect(legacyChanges(after, before).ops.map((r) => r.key)).toEqual(['roster/new'])
  })
})
