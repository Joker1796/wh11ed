// One-off: move Wahapedia "Special (правая колонка)" abilities from each datasheet's
// specialAbilities[] into rules[] (each renders as its own standalone plate in
// DatasheetCard, like the necrons Silent King's SUPREME COMMANDER / TRIARCHAL MENHIRS).
// The signal is the CSV ability `type`: "Special (…)" = plate rule; "Fortification"/
// "Primarch" stay grouped in specialAbilities. Preserves hand edits (operates on the
// current file contents, not a re-import). Run: node scripts/move-special-to-rules.mjs [--write]
import fs from 'node:fs'
import path from 'node:path'

const WRITE = process.argv.includes('--write')
const CSV = process.env.WAHA_CSV || '/private/tmp/claude-501/-Users-evgeni-PhpstormProjects-11/9fd64f47-3317-4f2a-96af-a8ea3735cbd6/scratchpad'
const DS_DIR = 'src/data/datasheets'

const norm = (s) => (s || '').toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim()

function loadCsv(name) {
  const lines = fs.readFileSync(path.join(CSV, name), 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim())
  const header = lines[0].split('|').map((h) => h.trim()).filter(Boolean)
  return lines.slice(1).map((line) => {
    const cells = line.split('|'); const row = {}
    header.forEach((h, i) => { row[h] = (cells[i] || '').trim() }); return row
  })
}

const datasheets = loadCsv('Datasheets.csv')
const dsName = new Map(datasheets.map((d) => [d.id, d.name]))
const abilities = loadCsv('Datasheets_abilities.csv')
// set of `${normDatasheet}||${normAbility}` that are Special-column (→ plate)
const special = new Set()
for (const a of abilities) {
  if (/^Special/.test(a.type)) special.add(`${norm(dsName.get(a.datasheet_id))}||${norm(a.name)}`)
}

let totalMoved = 0
for (const file of fs.readdirSync(DS_DIR).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const p = path.join(DS_DIR, file)
  const raw = fs.readFileSync(p, 'utf8')
  const m = raw.match(/^([\s\S]*?)export default\s*(\[[\s\S]*\])\s*$/)
  const arr = eval('(' + m[2] + ')')
  const moved = []
  for (const u of arr) {
    if (!Array.isArray(u.specialAbilities)) continue
    const keep = [], promote = []
    for (const ab of u.specialAbilities) {
      if (special.has(`${norm(u.name)}||${norm(ab.name)}`)) promote.push(ab); else keep.push(ab)
    }
    if (!promote.length) continue
    u.rules = [...(u.rules || []), ...promote]
    if (keep.length) u.specialAbilities = keep; else delete u.specialAbilities
    moved.push(`${u.name}: ${promote.map((x) => x.name).join(', ')}`)
  }
  if (moved.length) {
    totalMoved += moved.length
    console.log(`\n${file} (${moved.length})`)
    moved.forEach((l) => console.log('  ' + l))
    if (WRITE) fs.writeFileSync(p, m[1] + 'export default ' + JSON.stringify(arr, null, 2) + '\n')
  }
}
console.log(`\n${WRITE ? 'WROTE' : 'DRY-RUN'} — units with promoted plate rules: ${totalMoved}`)
