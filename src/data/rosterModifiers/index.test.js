import { describe, it, expect } from 'vitest'
import { usableEntries } from './index.js'
import { conditions, SENTINELS, isSentinel, isAnswerable } from './conditions.js'

// Every faction file in this directory, read eagerly — this is a test, not the app (the app
// loads one faction at a time; see index.js).
const files = import.meta.glob(['./*.js', '!./index.js', '!./conditions.js', '!./coreRules.js', '!./*.test.js'], { eager: true, import: 'default' })

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
      // The appdata uuid, optionally suffixed with the datasheet it was attached to: 56 abilities
      // are published once and printed on several datasheets, and each needs its own record
      // (a different `ref.unit`). The uuid still leads, so the identity is unchanged.
      expect(e.sid, `${file} ${e.name}`).toMatch(/^[0-9a-f-]{36}(:[a-z0-9-]+)?$/)
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
      for (const [i, eff] of (e.effects || []).entries()) {
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
          // …and its machine-readable half, so "cannot be automated" and "nobody has looked at
          // this yet" can never look the same. A sentinel IS an answer; a missing `cond` is not.
          expect(Array.isArray(eff.cond) && eff.cond.length > 0, `${where}: cond`).toBe(true)
          for (const id of eff.cond) {
            expect(isSentinel(id) || !!conditions[id], `${where}: unknown condition "${id}"`).toBe(true)
          }
        } else {
          expect(eff.cond, `${where}: cond on an unconditional effect`).toBeUndefined()
        }
        // An "instead" variant names the effect it replaces, by index into this record's own
        // effects. A dangling or self-referential index would silently suppress the wrong line —
        // or nothing at all.
        if (eff.alt !== undefined) {
          expect(Number.isInteger(eff.alt), `${where}: alt`).toBe(true)
          expect(eff.alt, `${where}: alt`).toBeGreaterThanOrEqual(0)
          expect(eff.alt, `${where}: alt out of range`).toBeLessThan(e.effects.length)
          expect(eff.alt, `${where}: alt points at itself`).not.toBe(i)
          // An UNCONDITIONAL alternate would suppress its base forever, which is not what
          // "instead" means — the replacement always depends on something.
          expect(eff.when, `${where}: unconditional alternate`).not.toBeNull()
        }
        // WHOSE card the effect lands on. Only a record that hangs off a DATASHEET can address
        // another unit — an ability printed on a Leader's card, a Kustom Force Field worn by one —
        // and everything else rewrites the card its rule was already shown on, so a stray `target`
        // there would apply to nobody and still look reviewed. `leader` is an ability's alone: a
        // wargear rule pointing back at the Character has no way to say which item it came from.
        if (eff.target !== undefined) {
          expect(['self', 'led', 'leader'], `${where}: target`).toContain(eff.target)
          expect(['ability', 'wargear'], `${where}: target on a rule record`).toContain(e.kind)
          if (e.kind === 'wargear') expect(eff.target, `${where}: wargear target`).toBe('led')
          expect(eff.target, `${where}: target 'self' is the default, leave it out`).not.toBe('self')
        }
        // A weapon filter ("Psychic weapons only") — the narrower target `on` cannot express.
        if (eff.only !== undefined) {
          const keys = Object.keys(eff.only)
          expect(keys.length, `${where}: only`).toBeGreaterThan(0)
          for (const k of keys) {
            expect(['tag', 'notTag', 'name'], `${where}: only.${k}`).toContain(k)
            expect(typeof eff.only[k], `${where}: only.${k}`).toBe('string')
          }
          // It filters weapon ROWS, so an effect on a model profile has no business carrying one.
          expect(eff.on, `${where}: only on a profile effect`).not.toBe('profile')
        }
      }
    }
  })

  // The vocabulary is only worth having if it stays tied to the corpus: an id nothing uses is
  // dead weight that reads as supported, and a label missing a locale would render blank on the
  // switch that turns the effect on.
  it('keeps the condition vocabulary in step with the records that use it', () => {
    const used = new Set()
    for (const { e } of allEntries) for (const eff of e.effects || []) for (const id of eff.cond || []) used.add(id)
    for (const id of Object.keys(conditions)) {
      expect(used.has(id), `condition "${id}" is defined but no effect uses it`).toBe(true)
    }
    for (const [id, c] of Object.entries(conditions)) {
      expect(['army', 'unit', 'roster', 'clock'], `${id}.scope`).toContain(c.scope)
      // A clock condition has to say WHAT it asks the clock: a phase (and whose) or a round window.
      if (c.scope === 'clock') expect(!!c.phase || Array.isArray(c.rounds), `${id} asks the clock what?`).toBe(true)
      expect(['phase', 'turn', 'round', 'battle'], `${id}.duration`).toContain(c.duration)
      expect(c.label?.en?.length, `${id}.label.en`).toBeGreaterThan(0)
      expect(c.label?.ru?.length, `${id}.label.ru`).toBeGreaterThan(0)
    }
    for (const [id, s] of Object.entries(SENTINELS)) {
      expect(s.en?.length, `${id}.en`).toBeGreaterThan(0)
      expect(s.ru?.length, `${id}.ru`).toBeGreaterThan(0)
    }
  })

  it('answers only what it can actually answer', () => {
    expect(isAnswerable(['waaagh-active'])).toBe(true)
    expect(isAnswerable(['waaagh-active', 'unit-charged'])).toBe(true)
    expect(isAnswerable(['never'])).toBe(false)
    expect(isAnswerable(['blocked-subset'])).toBe(false)
    // One un-answerable half is enough to keep the whole effect a note. A phase is answerable
    // only in a game keeping phases, so a Waaagh!-in-the-Shooting-phase bonus is a note by default
    // and a number once the clock is running.
    expect(isAnswerable(['waaagh-active', 'phase-shooting'])).toBe(false)
    expect(isAnswerable(['waaagh-active', 'phase-shooting'], { phases: true })).toBe(true)
    // A battle-round window needs no clock setting — every game knows its round.
    expect(isAnswerable(['rounds-3-5'])).toBe(true)
    expect(isAnswerable(['made-this-up'])).toBe(false)
    expect(isAnswerable([])).toBe(false)
    expect(isAnswerable(undefined)).toBe(false)
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

describe('core rules as a modifier source', () => {
  it('states Battle-shock as one reviewed effect, on a condition the app can answer', async () => {
    const { coreModifiers } = await import('./coreRules.js')
    expect(coreModifiers).toHaveLength(1)
    const [bs] = coreModifiers
    expect(bs.kind).toBe('core')
    expect(bs.effects).toEqual([{
      on: 'profile', stat: 'oc', op: 'set', value: '-',
      when: { en: 'while this unit is Battle-shocked', ru: 'пока отряд Battle-shocked' },
      cond: ['unit-battle-shocked'],
    }])
    expect(conditions['unit-battle-shocked']).toBeTruthy()
  })

  it('is not globbed as a faction file', async () => {
    expect(Object.keys(files).some((f) => f.includes('coreRules'))).toBe(false)
  })
})
