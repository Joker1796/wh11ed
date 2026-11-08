import { describe, it, expect } from 'vitest'
import { LOCAL_KEYS, changesFor, localView, recordsFor } from './localRecords.js'

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
