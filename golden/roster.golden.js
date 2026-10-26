import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { describe, it, expect } from 'vitest'
import core from '../src/data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { validateRoster } from '../src/core/roster/rosterValidation.js'
import { buildRosterText, EXPORT_FORMATS } from '../src/core/roster/rosterExport.js'
import { detectFormat, matchRoster, parseList } from '../src/core/roster/rosterImport.js'
import { factionGroups } from '../src/data/factionsIndex.js'
import { everyUnitRoster, rosterPoints, cardOf, plain, hash, stringify } from './harness.js'

const items = rosterItems.items
// Every faction the roster builder has (one file each), or a few named in GOLDEN_FACTIONS.
const ALL = fs.readdirSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/roster')).filter((f) => f.endsWith('.js') && !['index.js', 'core.js', 'items.js'].includes(f) && !f.includes('.test.')).map((f) => f.replace(/\.js$/, '')).sort()
const FACTIONS = (process.env.GOLDEN_FACTIONS || '').split(',').filter(Boolean)
const RUN = FACTIONS.length ? FACTIONS : ALL

describe('golden: every unit of a faction, per detachment', () => {
  for (const slug of RUN) {
    it(slug, async () => {
      const faction = await loadRosterFaction(slug, { allies: true })
      const defOf = (id) => faction.units.find((u) => u.id === id)
      // Cards are kept once each and referred to by key: most of a faction's cards read the same
      // under every detachment, and writing them out per detachment tripled the file.
      const cardTable = {}
      const keyOf = (card) => {
        const text = JSON.stringify(card)
        const key = `${card?.sheet?.name || 'none'}#${hash(text)}`
        cardTable[key] = card
        return key
      }
      const out = {}
      for (const det of faction.detachments) {
        const roster = everyUnitRoster({ ...faction, slug }, det.name, items)
        const ctx = { faction, core, items, factionGroups }
        const dets = faction.detachments.filter((d) => d.name === det.name)
        const cards = {}
        for (const entry of roster.units) {
          cards[entry.uid] = keyOf(await cardOf(entry.id, slug, { def: defOf(entry.id), entry, items, units: roster.units, detachments: dets, defOf }))
        }
        out[det.name] = plain({
          attached: roster.units.filter((u) => u.leaderOf).map((u) => [u.id, u.leaderOf]),
          points: rosterPoints(roster.units, defOf, dets),
          issues: validateRoster(roster, ctx).issues,
          // A line each, so a changed line reads as one in the diff rather than as a new hash.
          text: Object.fromEntries(EXPORT_FORMATS.map((f) => [f, buildRosterText(roster, ctx, f).split('\n')])),
          // …and what the importer makes of the formats it reads back.
          reimport: Object.fromEntries(['gw', 'wtc'].map((f) => {
            const text = buildRosterText(roster, ctx, f)
            const { payload, report } = matchRoster(parseList(text, detectFormat(text), factionGroups), ctx)
            return [f, { units: payload.units.map(({ uid, ...u }) => u), report }]
          })),
          cards,
        })
      }
      const sorted = Object.fromEntries(Object.keys(cardTable).sort().map((k) => [k, cardTable[k]]))
      await expect(stringify({ detachments: out, cards: sorted }) + '\n').toMatchFileSnapshot(`./__snapshots__/${slug}.json`)
    })
  }
})
