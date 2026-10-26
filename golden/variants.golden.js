import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { loadRosterModifiersFor } from '../src/data/rosterModifiers/index.js'
import { enhOptionsFor } from '../src/core/roster/rosterEngine.js'
import { conditions } from '../src/core/rules/conditions.js'
import { everyUnitRoster, cardOf, hash, stringify } from './harness.js'

// The golden master's second file (README.md): what roster.golden.js's plain lists never ask —
// an enhancement worn, wargear taken, a game in which every condition holds, every stratagem is
// spent and every once-per-battle rule used. Recorded from the code of 2026-10-26 (after the core
// split's step 7), to hold the steps that follow.
const items = rosterItems.items
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ALL = fs.readdirSync(path.join(HERE, '../src/data/roster')).filter((f) => f.endsWith('.js') && !['index.js', 'core.js', 'items.js'].includes(f) && !f.includes('.test.')).map((f) => f.replace(/\.js$/, '')).sort()
const FACTIONS = (process.env.GOLDEN_FACTIONS || '').split(',').filter(Boolean)
const RUN = FACTIONS.length ? FACTIONS : ALL
const EVERYTHING_TRUE = new Set(Object.keys(conditions))

describe('golden: enhancements, wargear and a game where everything holds', () => {
  for (const slug of RUN) {
    it(slug, async () => {
      const faction = await loadRosterFaction(slug, { allies: true })
      const defOf = (id) => faction.units.find((u) => u.id === id)
      const sids = new Set(((await loadRosterModifiersFor(slug))?.entries || []).map((e) => e.sid))
      const game = { active: EVERYTHING_TRUE, chosen: sids }
      const cardTable = {}
      const keyOf = (card) => {
        const key = `${card?.sheet?.name || 'none'}#${hash(JSON.stringify(card))}`
        cardTable[key] = card
        return key
      }
      const out = {}
      for (const det of faction.detachments) {
        const roster = everyUnitRoster({ ...faction, slug }, det.name, items)
        const dets = faction.detachments.filter((d) => d.name === det.name)
        const ctxOf = (entry, units = roster.units) => ({ def: defOf(entry.id), entry, items, units, detachments: dets, defOf })
        // Each enhancement on the first unit that may carry it.
        const enh = {}
        for (const e of det.enhancements || []) {
          const bearer = roster.units.find((u) => enhOptionsFor(defOf(u.id), dets, roster.units, u.uid).some((o) => o.name === e.name && o.eligible))
          if (!bearer) { enh[e.name] = null; continue }
          const entry = { ...bearer, enh: e.name, enhDet: det.name }
          const units = roster.units.map((u) => (u.uid === bearer.uid ? entry : u))
          enh[e.name] = [bearer.id, keyOf(await cardOf(entry.id, slug, ctxOf(entry, units)))]
        }
        // Every unit with the first option of each wargear group taken once, and in a game where
        // everything holds.
        const gear = {}
        const live = {}
        for (const u of roster.units) {
          const def = defOf(u.id)
          const wg = (def.gear || []).map((g, gi) => [gi, 0, 1])
          if (wg.length) {
            const entry = { ...u, wg }
            gear[u.uid] = keyOf(await cardOf(entry.id, slug, ctxOf(entry, roster.units.map((x) => (x.uid === u.uid ? entry : x)))))
          }
          live[u.uid] = keyOf(await cardOf(u.id, slug, ctxOf(u), game))
        }
        out[det.name] = { enh, gear, live }
      }
      const sorted = Object.fromEntries(Object.keys(cardTable).sort().map((k) => [k, cardTable[k]]))
      await expect(stringify({ detachments: out, cards: sorted }) + '\n').toMatchFileSnapshot(`./__snapshots__/variants/${slug}.json`)
    })
  }
})
