#!/usr/bin/env node
// Share links to the test rosters (scripts/lib/test-rosters.mjs) — the roster-links skill's links,
// for the lists that GW's text format cannot carry: own limits, no limit, a roster's exact picks.
// Open one → "Save to my rosters" → the list is in the builder. An archived list travels like any
// other: a share link carries what a list IS, not where its owner filed it.
//
// Usage: npm run test-rosters [-- --base https://wh-rules.ru] [--en]
import { TEST_ROSTERS, buildTestRoster } from './lib/test-rosters.mjs'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { encodeRoster } from '../src/composables/rosterShare.js'

const args = process.argv.slice(2)
const at = args.indexOf('--base')
const base = (at >= 0 ? args[at + 1] : 'http://localhost:5173').replace(/\/$/, '')
const prefix = args.includes('--en') ? '' : '/ru'

for (const spec of TEST_ROSTERS) {
  const faction = await loadRosterFaction(spec.faction, { allies: true })
  const roster = buildTestRoster(spec, { faction, items: rosterItems.items })
  console.log(`${spec.name}`)
  console.log(`  ${base}${prefix}/roster/shared#r=${await encodeRoster(roster)}`)
}
