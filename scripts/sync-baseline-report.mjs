#!/usr/bin/env node
// What the sync baseline holds, by class — `npm run sync:baseline`.
//
// The baseline (scripts/lib/sync-baseline.json) is where a finding goes to stop being printed. On
// 2026-09-12 all 732 findings of the day went in at once with no reason, and the audit fell silent
// about the drift the Wahapedia import of July had left — aircraft printed with M 20+" while the app
// said "-" until an errata check found them in October. The rule since: every entry carries a
// reason, and a finding we can fix is fixed rather than accepted (hub journal
// 2026-10-03-baseline-to-app.md).
//
// Prints the classes with their counts (how many have no reason yet), and with `--list <class>`
// every entry of one class. `--unexplained` lists every entry that has no reason.
import { loadBaseline } from './lib/sync-baseline.mjs'
import { baselineClass } from './lib/sync-baseline-classes.mjs'

const baseline = loadBaseline()
const arg = (name) => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1] || '' }
const listClass = arg('--list')
const unexplained = process.argv.includes('--unexplained')

const byClass = new Map()
for (const [key, why] of Object.entries(baseline)) {
  const c = baselineClass(key)
  if (!byClass.has(c)) byClass.set(c, [])
  byClass.get(c).push([key, why])
}

if (listClass != null || unexplained) {
  for (const [c, rows] of byClass) {
    if (listClass && c !== listClass) continue
    for (const [key, why] of rows) if (!unexplained || !why) console.log(`${c} | ${key}${why ? `\n    why: ${why}` : ''}`)
  }
} else {
  const total = Object.keys(baseline).length
  const empty = Object.values(baseline).filter((w) => !w).length
  console.log(`sync baseline: ${total} entr(ies), ${empty} without a reason`)
  for (const [c, rows] of [...byClass].sort((a, b) => b[1].length - a[1].length)) {
    const n = rows.filter(([, w]) => !w).length
    console.log(`  ${String(rows.length).padStart(4)}  ${c}${n ? `  (${n} without a reason)` : ''}`)
  }
}
