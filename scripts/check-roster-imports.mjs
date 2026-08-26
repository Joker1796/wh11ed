#!/usr/bin/env node
// check-roster-imports.mjs — run real army lists through the importer and report what it got wrong.
//
//   python3 scripts/fetch-listhammer.py --corpus /tmp/lists.json
//   npx vite-node scripts/check-roster-imports.mjs /tmp/lists.json      # the whole corpus
//   npx vite-node scripts/check-roster-imports.mjs list.txt [more.txt]  # single pasted lists
//   …--all   report every list, not only the ones with something wrong
//
// vite-node, not node: this imports the app's own modules, which are ESM with Vite's resolution.
//
// READ THE SUMMARY BEFORE THE LINES. Most lists in any real corpus were exported against an OLDER
// points file — the export says which in its footer ("Data Version: v925") — and their points are
// SUPPOSED to differ from ours. The summary splits on that: a mismatch in a list exported against
// the version we hold is a bug here, one in an older list is last month's MFM. Ignore the split and
// the noise buries the signal (604 lists: 217 "broken", of which 3 actually were).
import { readFileSync } from 'node:fs'
import { detectFormat, matchFaction, matchRoster, parseList } from '../src/composables/rosterImport.js'
import { validateRoster } from '../src/composables/rosterValidation.js'
import core from '../src/data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../src/data/roster/index.js'
import { APP_DATA_VERSION } from '../src/data/appDataVersion.js'

const args = process.argv.slice(2)
const ALL = args.includes('--all')
const files = args.filter((a) => !a.startsWith('--'))
if (!files.length) {
  console.error('usage: check-roster-imports.mjs <corpus.json | list.txt …> [--all]')
  process.exit(1)
}

// A corpus row and a pasted file end up as the same thing: a name and the text.
const lists = files.flatMap((f) => (f.endsWith('.json')
  ? JSON.parse(readFileSync(f, 'utf8')).map((r) => ({ label: `${r.faction} · ${r.playerName || r.listId || ''}`, text: r.listText }))
  : [{ label: f, text: readFileSync(f, 'utf8') }]))

const cache = new Map()
const faction = async (slug) => {
  if (!cache.has(slug)) cache.set(slug, await loadRosterFaction(slug, { allies: true }))
  return cache.get(slug)
}
// Against OUR version, not the corpus's own high-water mark — one list in the corpus states a
// version that does not exist (a digit too many), and taking the highest let that typo define what
// "current" meant and emptied the bucket that matters.
const version = (t) => +(/Data Version:\s*v?(\d+)/.exec(t || '')?.[1] || 0)

let clean = 0
const tally = { current: [0, 0], older: [0, 0], unstated: [0, 0] }
for (const { label, text } of lists) {
  const notes = []
  let mismatch = false
  try {
    const parsed = parseList(text, detectFormat(text))
    if (!parsed?.units?.length) notes.push('not a list we can read')
    else {
      const slug = matchFaction(parsed.faction)
      if (!slug) notes.push(`no faction in ${JSON.stringify(parsed.faction)}`)
      else {
        const f = await faction(slug)
        const { payload, report } = matchRoster(parsed, { faction: f, core, items: rosterItems.items })
        const roster = { ...payload, faction: slug, detachments: report.detachments.matched }
        const issues = validateRoster(roster, { faction: f, core }).issues.filter((i) => i.level === 'error')
        mismatch = !!report.points.stated && report.points.computed !== report.points.stated
        if (mismatch) notes.push(`points ${report.points.computed} / ${report.points.stated} stated`)
        for (const u of report.missing) notes.push(`no datasheet: ${u.name}`)
        for (const d of report.detachments.missing) notes.push(`no detachment: ${d}`)
        for (const u of report.units) {
          for (const g of u.gear.missing) notes.push(`${u.name}: unplaced wargear "${g}"`)
          if (u.enh && !u.enh.ok) notes.push(`${u.name}: unknown enhancement "${u.enh.name}"`)
        }
        for (const i of issues) notes.push(`invalid: ${i.code} ${JSON.stringify(i.params || {})}`)
      }
    }
  } catch (e) {
    notes.push(`threw: ${e.message}`)
  }
  const v = version(text)
  const bucket = !v ? 'unstated' : v === APP_DATA_VERSION ? 'current' : 'older'
  tally[bucket][0]++
  if (mismatch) tally[bucket][1]++
  if (!notes.length) clean++
  if (notes.length || ALL) console.log(`${notes.length ? '✗' : '✓'} ${label}\n${notes.map((n) => `    ${n}`).join('\n')}`)
}

console.log(`\n${clean} of ${lists.length} lists imported with nothing to report.`)
console.log('points differing from the list\'s own total, by the data version it was exported against:')
for (const [k, [n, bad]] of Object.entries(tally)) {
  if (n) console.log(`  ${k.padEnd(9)} ${String(bad).padStart(4)} of ${n}${k === 'current' ? `  ← v${APP_DATA_VERSION}, the only ones that mean anything` : ''}`)
}
