import { describe, it, expect } from 'vitest'
import { usableEntries } from './index.js'

// Every faction file in this directory, read eagerly — this is a test, not the app (the app
// loads one faction at a time; see index.js).
const files = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'], { eager: true, import: 'default' })

const ON = new Set(['profile', 'ranged', 'melee', 'weapon', 'unit'])
const OP = new Set(['add', 'set', 'improve', 'grant'])
const STAT = new Set(['m', 't', 'sv', 'w', 'ld', 'oc', 'inv', 'a', 'bs', 'ws', 's', 'ap', 'd', 'range', 'keyword', 'ability'])

const allEntries = Object.entries(files).flatMap(([file, data]) =>
  (data?.entries || []).map((e) => ({ file, e })))

describe('rosterModifiers data', () => {
  it('ships a file per faction, each with the current format version', () => {
    expect(Object.keys(files).length).toBeGreaterThanOrEqual(30)
    for (const [file, data] of Object.entries(files)) {
      expect(data.formatVersion, file).toBe(1)
      expect(typeof data.slug, file).toBe('string')
      expect(Array.isArray(data.entries), file).toBe(true)
    }
  })

  it('identifies every record by a unique appdata uuid within its faction', () => {
    // The uuid is the record's identity — it is what survives GW renaming a rule. Two records
    // sharing one would make the generator's stale/orphan classification ambiguous.
    for (const [file, data] of Object.entries(files)) {
      const sids = (data.entries || []).map((e) => e.sid)
      expect(new Set(sids).size, file).toBe(sids.length)
    }
  })

  it('pins every record to the prose it was read from', () => {
    for (const { file, e } of allEntries) {
      expect(e.sid, `${file} ${e.name}`).toMatch(/^[0-9a-f-]{36}$/)
      expect(e.hash, `${file} ${e.name}`).toMatch(/^[0-9a-f]{8}$/)
      expect(typeof e.ver, `${file} ${e.name}`).toBe('number')
    }
  })

  it('accepts effects only on a reviewed record', () => {
    // The reverse — effects sitting on an unreviewed skeleton — would mean somebody authored a
    // modifier and forgot to mark it read, and usableEntries would silently drop it.
    for (const { file, e } of allEntries) {
      if (e.effects?.length) expect(e.reviewed, `${file} ${e.name}`).toBe(true)
    }
  })

  it('validates every hand-authored effect', () => {
    for (const { file, e } of allEntries) {
      for (const eff of e.effects || []) {
        const where = `${file} ${e.name}`
        expect(ON.has(eff.on), `${where}: on=${eff.on}`).toBe(true)
        expect(OP.has(eff.op), `${where}: op=${eff.op}`).toBe(true)
        expect(STAT.has(eff.stat), `${where}: stat=${eff.stat}`).toBe(true)
        expect(['number', 'string'], where).toContain(typeof eff.value)
        if (eff.scope != null) expect(Number.isInteger(eff.scope) && eff.scope >= 0, where).toBe(true)
        // A grant names a keyword or a weapon ability, so its value is always a non-empty string,
        // and only `grant` may carry those two stats.
        if (eff.op === 'grant') {
          expect(['keyword', 'ability'], where).toContain(eff.stat)
          expect(typeof eff.value === 'string' && eff.value.length > 0, where).toBe(true)
          expect(eff.stat === 'keyword' ? eff.on === 'unit' : eff.on !== 'unit' && eff.on !== 'profile', where).toBe(true)
        } else {
          expect(['keyword', 'ability'].includes(eff.stat), where).toBe(false)
        }
        // A conditional effect must say its condition in BOTH languages: it is rendered as an
        // annotation next to the characteristic, and a missing side would show blank in that
        // locale. `null` is the deliberate "this always applies" value, not a missing field.
        if (eff.when !== null) {
          expect(typeof eff.when?.en, `${where}: when.en`).toBe('string')
          expect(typeof eff.when?.ru, `${where}: when.ru`).toBe('string')
          expect(eff.when.en.length, `${where}: when.en`).toBeGreaterThan(0)
          expect(eff.when.ru.length, `${where}: when.ru`).toBeGreaterThan(0)
        }
      }
    }
  })

  it('exposes only reviewed records that actually carry an effect', () => {
    const data = { entries: [
      { reviewed: true, effects: [{ on: 'profile' }] },
      { reviewed: true, effects: [] }, // reviewed and found to change nothing
      { reviewed: false, effects: [{ on: 'profile' }] }, // authored but not signed off
    ] }
    expect(usableEntries(data)).toHaveLength(1)
    expect(usableEntries(null)).toEqual([])
  })
})
