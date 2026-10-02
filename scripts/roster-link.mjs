#!/usr/bin/env node
// roster-link.mjs — turn an army list as text into a link that opens it in the roster builder.
//
//   npx vite-node scripts/roster-link.mjs list.txt [more.txt …]          # links to the local stand
//   npx vite-node scripts/roster-link.mjs list.txt --base https://wh-rules.ru --en
//
// The text is anything the builder's own Import window reads (the GW app's export, listhammer,
// New Recruit…), and goes through the same importer — so a list that would not import cleanly by
// hand is reported here instead of silently turning into a different list. The link is the one
// the builder's Share button makes (`/roster/shared#r=…`, rosterShare.js): opening it shows the
// roster and offers to save a copy. Nothing is sent anywhere — the roster rides in the URL hash.
//
// vite-node, not node: this imports the app's own modules, which are ESM with Vite's resolution.
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import { detectFormat, matchFaction, matchRoster, parseList } from '../src/composables/rosterImport.js'
import { encodeRoster } from '../src/composables/rosterShare.js'
import core from '../src/data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'

const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : dflt }
const base = opt('--base', 'http://localhost:5173').replace(/\/$/, '')
const prefix = args.includes('--en') ? '' : '/ru'
const files = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--base')
if (!files.length) {
  console.error('usage: roster-link.mjs <list.txt …> [--base URL] [--en]')
  process.exit(1)
}

let bad = 0
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const parsed = parseList(text, detectFormat(text))
  const slug = parsed?.units?.length ? matchFaction(parsed.faction) : null
  if (!slug) { console.log(`✗ ${file}: not a list the importer can read`); bad++; continue }
  const faction = await loadRosterFaction(slug, { allies: true })
  const { payload, report } = matchRoster(parsed, { faction, core, items: rosterItems.items })
  const problems = [
    ...report.missing.map((u) => `no datasheet: ${u.name}`),
    ...report.detachments.missing.map((d) => `no detachment: ${d}`),
    ...report.units.flatMap((u) => u.gear.missing.map((g) => `${u.name}: unplaced wargear "${g}"`)),
  ]
  if (problems.length) { console.log(`✗ ${file}\n  ${problems.join('\n  ')}`); bad++; continue }
  const roster = { ...payload, faction: slug, detachments: report.detachments.matched, name: payload.name || basename(file, '.txt') }
  const pts = report.points.stated ? `${report.points.computed}/${report.points.stated} pts` : `${report.points.computed} pts`
  console.log(`✓ ${roster.name} — ${slug}, ${roster.units.length} units, ${pts}`)
  console.log(`  ${base}${prefix}/roster/shared#r=${await encodeRoster(roster)}`)
}
process.exit(bad ? 1 : 0)
