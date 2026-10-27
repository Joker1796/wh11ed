import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { coreAbilityText, coreAbilityParts } from './datasheetParts.js'
import { ui } from '../i18n/ui.js'

// A granted core ability's narrowing in Russian (acceptance, 2026-10-18: "Feel No Pain 5+ (vs mortal
// wounds)" in English on a Russian card). Every wording the modifier layer writes needs its entry.
describe('coreAbilityText', () => {
  it('translates the narrowing, keeps the name', () => {
    expect(coreAbilityText('Feel No Pain 5+ (vs mortal wounds)', ui.ru)).toBe('Feel No Pain 5+ (против смертельных ран)')
    expect(coreAbilityText('Feel No Pain 5+ (vs mortal wounds)', ui.en)).toBe('Feel No Pain 5+ (vs mortal wounds)')
    expect(coreAbilityText('Stealth', ui.ru)).toBe('Stealth')
  })
  it('every narrowing in the modifier layer has its Russian', () => {
    const dir = path.resolve(__dirname, '../data/rosterModifiers')
    const missing = new Set()
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.js') && !n.includes('.test.'))) {
      const text = fs.readFileSync(path.join(dir, f), 'utf8')
      for (const m of text.matchAll(/"stat": "core",\s*"op": "grant",\s*"value": "[^"]*\(([^)"]*)\)"/g)) {
        if (!ui.ru.coreQualifiers[m[1]]) missing.add(`${f}: ${m[1]}`)
      }
    }
    expect([...missing]).toEqual([])
  })
  it('…and every narrowing a datasheet prints on its Core line', () => {
    const dir = path.resolve(__dirname, '../data/datasheets')
    const missing = new Set()
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.js') && !n.includes('.test.'))) {
      const text = fs.readFileSync(path.join(dir, f), 'utf8')
      for (const m of text.matchAll(/"core": "([^"]*)"/g)) {
        for (const part of m[1].split(/,\s*/)) {
          const q = part.match(/\(([^)]*)\)$/)
          if (q && !ui.ru.coreQualifiers[q[1]]) missing.add(`${f}: ${q[1]}`)
        }
      }
    }
    expect([...missing]).toEqual([])
  })
})

// The card's Core line: the ability in its tag, the narrowing after it as text (2026-10-27).
describe('coreAbilityParts', () => {
  it('splits off the narrowing, translated', () => {
    expect(coreAbilityParts('Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)', ui.ru)).toEqual({ name: 'Feel No Pain 5+', cond: 'против смертельных ран и Psychic Attacks' })
    expect(coreAbilityParts('Deadly Demise D6+3 (Szarekh model only)', ui.en)).toEqual({ name: 'Deadly Demise D6+3', cond: 'Szarekh model only' })
    expect(coreAbilityParts('Scouts 6"', ui.ru)).toEqual({ name: 'Scouts 6"', cond: '' })
  })
})
