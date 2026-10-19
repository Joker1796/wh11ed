// GATE: a table or a column appdata carries that nobody has decided about (`npm run columns`).
//
// Lessons 103 and 105: the bundle builder and the generators read the columns someone once wrote
// them to read, and a column GW added later — a stratagem's second effect, a component's subtitle,
// a datasheet's model ceiling, an enhancement's required ability — was invisible to every gate for
// as long as it sat there. This gate lists every table's NON-EMPTY columns (top level and
// `localisations.en`) and compares them with scripts/lib/appdata-columns.json, the ones decided
// about. A new table, or a column that starts carrying data, fails until it is recorded — with
// where it is read, or why not. A recorded column that went empty or a table that went away is
// reported, not failed.
//
// Usage: npm run columns              # check
//        npm run columns -- --write   # record what is there now (read the diff: each new line is a decision)
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT } from './lib/sync-common.mjs'

const RECORD = path.join(ROOT, 'scripts/lib/appdata-columns.json')

function nonEmptyColumns(rows) {
  const cols = new Set()
  for (const r of rows) {
    for (const [k, v] of Object.entries(r)) {
      if (k === 'localisations') {
        for (const [lk, lv] of Object.entries(v?.en || {})) if (lv != null && lv !== '' && lv !== false) cols.add(`en.${lk}`)
      } else if (v != null && v !== '' && v !== false) cols.add(k)
    }
  }
  return [...cols].sort()
}

export async function run(argv = process.argv.slice(2)) {
  const dir = path.join(APPDATA, 'tables')
  if (!fs.existsSync(dir)) { console.log(`columns: wh40k-appdata not found at ${APPDATA}`); return 1 }
  const now = {}
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json') && !x.startsWith('_')).sort()) {
    const rows = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    if (Array.isArray(rows)) now[f.replace(/\.json$/, '')] = nonEmptyColumns(rows)
  }
  const recorded = fs.existsSync(RECORD) ? JSON.parse(fs.readFileSync(RECORD, 'utf8')) : { tables: {} }
  if (argv.includes('--write')) {
    const out = { note: recorded.note || '', tables: {} }
    for (const [t, cols] of Object.entries(now)) {
      out.tables[t] = { why: recorded.tables[t]?.why || '', columns: Object.fromEntries(cols.map((c) => [c, recorded.tables[t]?.columns?.[c] ?? ''])) }
    }
    fs.writeFileSync(RECORD, `${JSON.stringify(out, null, 2)}\n`)
    console.log(`columns: recorded ${Object.keys(now).length} tables — write each new column's reader (or why none) into ${path.relative(ROOT, RECORD)}`)
    return 0
  }
  const fresh = []; const gone = []
  for (const [t, cols] of Object.entries(now)) {
    const known = recorded.tables[t]
    if (!known) { if (cols.length) fresh.push(`new table ${t}: ${cols.join(', ')}`); continue }
    for (const c of cols) if (!(c in (known.columns || {}))) fresh.push(`${t}.${c} carries data now`)
  }
  for (const [t, known] of Object.entries(recorded.tables)) {
    if (!now[t]) { gone.push(`table ${t}`); continue }
    for (const c of Object.keys(known.columns || {})) if (!now[t].includes(c)) gone.push(`${t}.${c}`)
  }
  if (gone.length) console.log(`columns: no longer carrying data (re-record when convenient): ${gone.join(', ')}`)
  if (fresh.length) {
    console.log(`columns: ${fresh.length} appdata column(s) nobody has decided about — find where (or whether) each must be read, then \`npm run columns -- --write\` and say so beside it:\n  ${fresh.join('\n  ')}`)
    return 1
  }
  console.log(`columns: every non-empty column of ${Object.keys(now).length} appdata tables is recorded.`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
