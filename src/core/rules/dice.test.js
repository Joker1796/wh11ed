import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { addToDice, formatDice, parseDice } from './dice.js'
import { applyValue } from './rosterStatMods.js'

describe('dice values', () => {
  it.each([
    ['D6', 1, 'D6+1'],
    ['D6+1', 1, 'D6+2'],
    ['D3+3', 1, 'D3+4'],
    ['2D6', 1, '2D6+1'],
    ['2D6+2', 2, '2D6+4'],
    ['D3+3', -1, 'D3+2'],
    ['D6+1', -1, 'D6'],
    ['D3', -1, null], // "D3-1" would lie about the low end: a characteristic never drops below 1
    ['D6+1', -2, null],
    ['D6', 0.5, null],
    ['6', 1, null], // not dice
    ['D6x2', 1, null],
  ])('%s with %s → %s', (value, delta, out) => {
    expect(addToDice(value, delta)).toBe(out)
  })

  it('reads and writes back every shape the same', () => {
    for (const v of ['D3', 'D6', 'D3+3', 'D6+2', '2D6', '2D6+1', '2D3']) expect(formatDice(/** @type {*} */ (parseDice(v)))).toBe(v)
    expect(parseDice('0D6')).toBe(null)
  })

  // applyValue's dice rule: Attacks and Damage, adding a whole number — nothing else.
  it('applies dice arithmetic only to A and D, only by adding', () => {
    expect(applyValue('D6', 'add', 1, 'a')).toBe('D6+1')
    expect(applyValue('D3+3', 'add', 1, 'd')).toBe('D3+4')
    expect(applyValue('D6', 'mul', 2, 'a')).toBe(null)
    expect(applyValue('D6', 'add', 'D3', 'a')).toBe(null) // "+D3 Attacks" — dice added to dice
    expect(applyValue('D6', 'add', 1, 's')).toBe(null)
    expect(applyValue('2D6', 'add', 1, 'm')).toBe(null)
  })
})

// The gate (owner, 2026-11-04: "so that it does not break when one appears"): every Attacks and
// Damage value the data prints is a number, one of the dice shapes dice.js reads, or "-". A new
// shape GW starts printing ("D6-1", "3D3", "D6x2") fails here instead of being left alone on every
// card a modifier reaches.
describe('every Attacks and Damage value in the data has a shape the stat pass knows', () => {
  const KNOWN = (v) => /^\d+$/.test(v) || v === '-' || parseDice(v) != null
  it('datasheets and enhancement weapons', async () => {
    const files = readdirSync('src/data/datasheets').filter((f) => /^[a-z-]+\.js$/.test(f) && f !== 'index.js')
    const odd = []
    let seen = 0
    const walk = (o, where) => {
      if (Array.isArray(o)) { o.forEach((x) => walk(x, where)); return }
      if (!o || typeof o !== 'object') return
      if (typeof o.name === 'string' && ('a' in o || 'd' in o) && ('range' in o || 'ap' in o)) {
        for (const k of ['a', 'd']) {
          if (!(k in o)) continue
          seen++
          if (!KNOWN(String(o[k]).trim())) odd.push(`${where} · ${o.name} · ${k}=${o[k]}`)
        }
      }
      for (const v of Object.values(o)) walk(v, where)
    }
    for (const f of files) walk(await import(`../../data/datasheets/${f}`), f)
    walk(await import('../../data/enhancementWeapons.js'), 'enhancementWeapons.js')
    expect(files.length).toBeGreaterThan(25)
    expect(seen).toBeGreaterThan(10000) // the walk reached the weapons, not an empty shell
    expect(odd).toEqual([])
  })
})
