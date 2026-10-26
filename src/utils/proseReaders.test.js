import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { foldChars } from '../core/shared/foldName.js'
import { ruleScopes } from '../core/rules/ruleTargets.js'
import { stratagemTargetScopes } from '../core/rules/rosterStatMods.js'
import { parseWeaponTag } from '../core/rules/weaponTagQualifier.js'
import { isWeaponTagText } from '../composables/useRenderInline.js'
import { factionKeywordPatterns, factionKeywordsAt } from './factionKeywordMarkup.js'
import { factionUnitKeywords, factionKeywordNames } from '../data/factionUnitKeywords.js'
import { equippedCondition } from '../../scripts/lib/equippedCondition.mjs'
import { tagDefinitions } from '../../scripts/lib/own-abilities.mjs'
import { spawnPhrases } from '../../scripts/lib/spawnPhrases.mjs'
import { unitLinkPatterns, unitLinksAt } from './unitLinkMarkup.js'
import { spawnUnits } from '../data/factionUnitKeywords.js'
import { appliesWhileOf } from '../data/rosterModifiers/appliesWhile.js'
import { readDoctrineRule } from '../core/rules/doctrineRules.js'

// foldName.test.js holds every NAME matcher to one fold. This holds every READER of rule prose to
// it: a regex over raw text whose word class knows only "-" reads nothing where appdata typed
// U+2011 — "Friendly GRAV‑ASSAULT units" gave no scope, so Flare Shields stood on every unit of the
// army and its three stratagems were offered to all of them (a player's report, 2026-10-17); "a
// hot‐shot lasgun" (U+2010) dropped a wargear condition. Each reader must read a string and its
// folded copy alike — over every string of the data, so the next codex's spelling is caught here
// and not by a player. Compared after folding the raw result, so a reader may hand back the
// typographic apostrophe it read.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const strings = (v, acc = []) => {
  if (typeof v === 'string') acc.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, acc))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, acc))
  return acc
}
const objects = (v, keep, acc = []) => {
  if (Array.isArray(v)) v.forEach((x) => objects(x, keep, acc))
  else if (v && typeof v === 'object') { if (keep(v)) acc.push(v); Object.values(v).forEach((x) => objects(x, keep, acc)) }
  return acc
}
async function load(dir) {
  const out = []
  for (const f of fs.readdirSync(path.join(ROOT, dir)).filter((n) => n.endsWith('.js') && !n.includes('.test.'))) {
    out.push(await import(/* @vite-ignore */ path.join(ROOT, dir, f)))
  }
  return out
}

const factions = await load('src/data/factions')
const sheets = await load('src/data/datasheets')
const items = await import('../data/roster/items.js')
const prose = [...new Set([...strings(factions), ...strings(sheets)])]
// Only strings the fold changes can tell a reader that folds from one that does not.
const touched = prose.filter((s) => foldChars(s) !== s)

/** Every string the fold changes where `read` answers differently: [string, raw, folded]. */
function disagreements(list, read) {
  const out = []
  for (const s of list) {
    const raw = foldChars(JSON.stringify(read(s)) ?? '')
    const folded = JSON.stringify(read(foldChars(s))) ?? ''
    if (raw !== folded) out.push(`${s.slice(0, 90)}\n    raw:    ${raw.slice(0, 120)}\n    folded: ${folded.slice(0, 120)}`)
  }
  return out
}

describe('every prose reader reads a unicode hyphen as a hyphen', () => {
  it('has something to read', () => {
    expect(touched.length).toBeGreaterThan(200)
  })

  it('rule scopes (who a rule is for)', () => {
    expect(disagreements(touched, ruleScopes)).toEqual([])
  })

  it('stratagem targets', () => {
    const strats = objects(factions, (o) => typeof o.target === 'string' && typeof o.when === 'string')
      .filter((st) => foldChars(st.target) !== st.target || foldChars(st.when) !== st.when)
    expect(strats.length).toBeGreaterThan(0)
    const bad = strats.filter((st) => foldChars(JSON.stringify(stratagemTargetScopes(st)) ?? '')
      !== (JSON.stringify(stratagemTargetScopes({ target: foldChars(st.target), when: foldChars(st.when) })) ?? ''))
    expect(bad.map((st) => st.target)).toEqual([])
  })

  it('faction keywords marked in prose', () => {
    const p = factionKeywordPatterns(Object.keys(factionUnitKeywords), factionKeywordNames)
    expect(disagreements(touched, (s) => factionKeywordsAt(s, p))).toEqual([])
  })

  it('weapon ability tags', () => {
    const tags = [...new Set(touched.flatMap((s) => [...s.matchAll(/\[([A-Z][^\]\n]*)\]/g)].map((m) => m[1])))]
    expect(disagreements(tags, isWeaponTagText)).toEqual([])
    expect(disagreements(tags, parseWeaponTag)).toEqual([])
  })

  it('tag definitions in faction rules', () => {
    expect(disagreements(touched, (s) => [...tagDefinitions(s)])).toEqual([])
  })

  it('units an ability brings into the game', () => {
    expect(disagreements(touched, spawnPhrases)).toEqual([])
    const p = unitLinkPatterns(spawnUnits)
    expect(disagreements(touched, (s) => unitLinksAt(s, p))).toEqual([])
  })

  it('wargear conditions ("equipped with X")', () => {
    const texts = strings(items).filter((s) => foldChars(s) !== s)
    expect(texts.length).toBeGreaterThan(0)
    expect(disagreements(texts, equippedCondition)).toEqual([])
  })

  it('Combat Doctrines a rule makes active (doctrineRules)', () => {
    expect(disagreements(touched, readDoctrineRule)).toEqual([])
  })

  it('where a whole rule is in force (appliesWhile)', () => {
    for (const kind of ['enhancement', 'detachmentRule', 'stratagem']) {
      expect(disagreements(touched, (t) => appliesWhileOf(kind, t))).toEqual([])
    }
  })

  it('reads the cases that broke', () => {
    expect(ruleScopes('Friendly GRAV‑ASSAULT units have 4+ invulnerable save.')?.[0].targets).toEqual(['GRAV-ASSAULT'])
    expect(equippedCondition('1 Tempestus Scion equipped with a hot‐shot lasgun can be equipped with 1 regimental standard.'))
      .toEqual({ items: ['hot-shot lasgun'], negated: false })
    // several items, and the offers and limits that only look like a condition (2026-10-17)
    expect(equippedCondition('If this model is equipped with a plasma pistol and a power weapon, it can be equipped with:'))
      .toEqual({ items: ['plasma pistol', 'power weapon'], negated: false })
    expect(equippedCondition('1 model that is not equipped with either a HYLas rotary cannon or an ion beamer can be equipped with 1 multiwave comms array.'))
      .toEqual({ items: ['HYLas rotary cannon', 'ion beamer'], negated: true })
    expect(equippedCondition('This model can be equipped with 1 hunter‑killer missile.')).toBe(null)
    expect(equippedCondition('Any number of models can each be equipped with 1 smoke launcher.')).toBe(null)
    expect(equippedCondition('* A model cannot be equipped with more than one bellatus reaper chainsword.')).toBe(null)
    expect(parseWeaponTag('[ANTI‑VEHICLE 3+]')).toEqual({ base: 'ANTI', keywords: ['VEHICLE'], negated: false, anti: '3+' })
    expect(isWeaponTagText('SUPA‑HAZARDOUS')).toBe(true)
  })
})
