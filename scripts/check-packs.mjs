// GATE: the Faction Pack PDFs against the Legends sheets transcribed from them (`npm run packs`).
//
// 239 Legends datasheets come from GW's Faction Packs (`source: 'faction-pack'`, see the hub's
// `legends-from-pack` skill), each stamped with the pack's VERSION line it was read from
// (`sourceVersion`). Nothing read that stamp: a republished pack — 1.3 → 1.4 changed Aeldari and
// Sororitas sheets on 2026-10-14 — was noticed only because someone looked (found 2026-10-19).
// This gate reads the PDFs out of the hub's gitignored ../sources folder, the way
// check-companion-pdfs.mjs reads the Event Companions, and fails when a faction's newest pack is
// newer than a sheet transcribed from it. The failure is the reminder: read the pack's changes,
// re-transcribe what moved, and stamp the sheets with the new version.
//
// The PDFs are not in git and differ from machine to machine: a faction with no PDF found is
// reported as not checked, never passed silently. Requires `pdftotext` (poppler).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule } from './lib/sync-common.mjs'

const PACKS = path.join(ROOT, '..', 'sources', 'Faction pack 11 ed')
// The file names say the faction in GW's own spelling, typos included.
const ALIAS = { 'imperia-agents': 'imperial-agents', 'adeptus-titanicus': 'titan-legions' }

function packFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? packFiles(p) : e.name.endsWith('.pdf') ? [p] : []
  })
}
const slugOf = (file) => {
  const m = path.basename(file).toLowerCase().match(/faction_pack_(.+?)-[a-z0-9]{8,}-[a-z0-9]+\.pdf$/)
  if (!m) return null
  const s = m[1].replace(/[_]+/g, '-')
  return ALIAS[s] || s
}
const versionOf = (file) => {
  try {
    const text = execFileSync('pdftotext', ['-l', '3', file, '-'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    return text.match(/FACTION PACK:\s*VERSION\s+(\d+(?:\.\d+)*)/i)?.[1] || null
  } catch { return null }
}
const newer = (a, b) => {
  const x = String(a).split('.').map(Number); const y = String(b).split('.').map(Number)
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0)
  return false
}

export async function run() {
  const newest = new Map() // slug -> { version, file }
  for (const f of packFiles(PACKS)) {
    const slug = slugOf(f); const v = slug && versionOf(f)
    if (!v) continue
    if (!newest.has(slug) || newer(v, newest.get(slug).version)) newest.set(slug, { version: v, file: path.basename(f) })
  }
  const dsDir = path.join(ROOT, 'src/data/datasheets')
  const fails = []; const unchecked = []; let sheets = 0
  for (const file of fs.readdirSync(dsDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.includes('.test.'))) {
    const slug = file.replace(/\.js$/, '')
    const own = ((await loadModule(path.join(dsDir, file)))?.default || []).filter((d) => d.source === 'faction-pack')
    if (!own.length) continue
    sheets += own.length
    const pack = newest.get(slug)
    if (!pack) { unchecked.push(slug); continue }
    const behind = own.filter((d) => newer(pack.version, d.sourceVersion))
    if (behind.length) fails.push(`${slug}: pack ${pack.version} (${pack.file}) is newer than ${behind.length} sheet(s) read from ${[...new Set(behind.map((d) => d.sourceVersion))].join(', ')} — ${behind.slice(0, 4).map((d) => d.name).join(', ')}${behind.length > 4 ? '…' : ''}`)
  }
  if (unchecked.length) console.log(`packs: no Faction Pack PDF found for ${unchecked.join(', ')} in ${PACKS} — not checked`)
  if (fails.length) {
    console.log(`packs: ${fails.length} faction(s) with a newer pack than their Legends sheets — read its changes, re-transcribe, re-stamp sourceVersion:\n  ${fails.join('\n  ')}`)
    return 1
  }
  console.log(`packs: ${sheets} Legends sheet(s) read from the newest pack on this machine (${newest.size} pack PDF(s) found).`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
