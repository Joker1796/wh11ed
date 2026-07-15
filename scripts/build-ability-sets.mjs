// One-off: group a datasheet's Primarch "pick one" abilities under a heading = the parent
// ability that references them, so a "(see below/left)" reference resolves to an explicit
// subsection. Moves the Primarch entries out of specialAbilities[] into abilitySets:
// [{ name: <parent ability name>, options: [{name,text}] }] and normalizes the parent's
// directional word to "see below" (our layout is single-column vertical).
// Only datasheets whose parent reference is detectable are touched. Run with --write.
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
const dsName = new Map(loadCsv('Datasheets.csv').map((d) => [d.id, d.name]))
const abilities = loadCsv('Datasheets_abilities.csv')

// per datasheet: parent ability name (Datasheet-type row referencing a set) + its Primarch option names
const parentOf = new Map()   // normDatasheet -> parent ability name (as in data)
const primarchOf = new Map() // normDatasheet -> Set(normOptionName)
const REF = /see below|see left|see right|see above|select one .*abilit/i
for (const a of abilities) {
  const dn = norm(dsName.get(a.datasheet_id))
  if (a.type === 'Datasheet' && REF.test(a.description || '')) { if (!parentOf.has(dn)) parentOf.set(dn, a.name) }
  if (a.type === 'Primarch') { if (!primarchOf.has(dn)) primarchOf.set(dn, new Set()); primarchOf.get(dn).add(norm(a.name)) }
}

let total = 0
for (const file of fs.readdirSync(DS_DIR).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const p = path.join(DS_DIR, file)
  const raw = fs.readFileSync(p, 'utf8')
  const m = raw.match(/^([\s\S]*?)export default\s*(\[[\s\S]*\])\s*$/)
  const arr = eval('(' + m[2] + ')')
  const touched = []
  for (const u of arr) {
    const dn = norm(u.name)
    const parent = parentOf.get(dn); const opts = primarchOf.get(dn)
    if (!parent || !opts || !Array.isArray(u.specialAbilities)) continue
    const options = [], keep = []
    for (const ab of u.specialAbilities) (opts.has(norm(ab.name)) ? options : keep).push(ab)
    if (!options.length) continue
    u.abilitySets = [...(u.abilitySets || []), { name: parent, options }]
    if (keep.length) u.specialAbilities = keep; else delete u.specialAbilities
    // normalise the parent ability's directional reference to "below"
    for (const ab of (u.abilities || [])) {
      if (norm(ab.name) === norm(parent)) ab.text = ab.text.replace(/see (left|right|above)/gi, 'see below')
    }
    touched.push(`${u.name}: “${parent}” ⊃ ${options.map((o) => o.name).join(', ')}`)
  }
  if (touched.length) {
    total += touched.length
    console.log(`\n${file}`); touched.forEach((t) => console.log('  ' + t))
    if (WRITE) fs.writeFileSync(p, m[1] + 'export default ' + JSON.stringify(arr, null, 2) + '\n')
  }
}
console.log(`\n${WRITE ? 'WROTE' : 'DRY-RUN'} — ability sets built: ${total}`)
