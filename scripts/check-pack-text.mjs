#!/usr/bin/env node
// GATE: the Legends datasheets transcribed from GW's Faction Packs, against the pack's own text
// (`npm run pack-text`).
//
// check-packs.mjs reads the pack's VERSION line and nothing else: a typo made while transcribing, or
// a number GW changed without a new version, would stand forever — the app does not carry these
// sheets, and no other check reads them (2026-10-20). This one reads each sheet's page out of the
// newest pack PDF on this machine (`pdftotext -layout`) and looks for what survives the two-column
// layout as a line: the characteristics, every weapon profile's numbers in a row (range, A, BS/WS,
// S, AP, D), each keyword on the KEYWORDS line and each ability's name.
//
// A finding a reader decided about goes to scripts/lib/pack-text-baseline.json with its reason, as
// the sync baseline does; an entry that matches nothing is reported as stale. The PDFs are not in git:
// a faction with no PDF is reported as not checked. Requires `pdftotext` (poppler).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule } from './lib/sync-common.mjs'
import { PACKS, packFiles, slugOf, versionOf } from './check-packs.mjs'
import { foldChars } from '../src/core/shared/foldName.js'

const BASELINE = path.join(ROOT, 'scripts', 'lib', 'pack-text-baseline.json')
const STAT_HEAD = /^\s*M\s+T\s+SV\s+W\s+LD\s+OC\b/

// One spelling for both sides: foldChars' dashes and apostrophes, GW's curly quotes and inch marks, the
// control characters pdftotext leaves in (a bell before "ALL MODELS"), upper case, single spaces.
const norm = (s) => foldChars(String(s || '')).replace(/\p{Cc}/gu, ' ').replace(/[“”″]/g, '"')
  .replace(/\s+/g, ' ').trim().toUpperCase()
const tokens = (s) => norm(s).split(' ').filter(Boolean)
const hasRun = (line, run) => {
  const t = tokens(line)
  for (let i = 0; i + run.length <= t.length; i++) if (run.every((x, j) => t[i + j] === x)) return true
  return false
}

/**
 * Each sheet's pages of a pack: from its name over the M T SV… header to the next sheet's name.
 * A sheet starts a page (pdftotext marks the break with \f); a header further down the page is a
 * second model line of the same sheet, under that model's name ("LESK'S VETERANS").
 */
export function sheetBlocks(text) {
  const lines = text.split('\n')
  const starts = []
  lines.forEach((l, i) => {
    if (!STAT_HEAD.test(l)) return
    let j = i - 1
    while (j >= 0 && !lines[j].trim()) j--
    if (j < 0 || !lines[j].startsWith('\f')) return
    // The name is the left column: "WEBWAY GATE      WARHAMMER LEGENDS" carries the banner beside it.
    starts.push({ at: j, name: lines[j].replace(/^\f/, '').trim().split(/\s{3,}/)[0] })
  })
  return starts.map((h, k) => ({ name: h.name, lines: lines.slice(h.at, starts[k + 1]?.at ?? lines.length) }))
}

const STATS = ['m', 't', 'sv', 'w', 'ld', 'oc']

// A profile printed elsewhere in the pack: "The profiles for these weapons can be found on the Space
// Wolves Armoury card" (Long Fangs, the Deathwatch Kill Teams). Away from the sheet the numbers alone
// say little, so the weapon's name must stand on that line or just above it (a long name wraps).
function inPack(packLines, name, run) {
  const base = norm(name.split(/\s+[–-]\s+/)[0])
  return packLines.some((l, i) => hasRun(l, run) && norm(packLines.slice(Math.max(0, i - 2), i + 1).join(' ')).includes(base))
}

/** What of one sheet the pack's page does not say. */
export function sheetFindings(sheet, lines, packLines = []) {
  const out = []
  for (const p of sheet.profiles || []) {
    const run = STATS.map((k) => norm(p[k]))
    if (!lines.some((l) => hasRun(l, run))) out.push(`stats ${p.name}: ${run.join(' ')}`)
  }
  for (const [kind, list] of [['ranged', sheet.ranged], ['melee', sheet.melee]]) {
    for (const w of list || []) {
      const run = [kind === 'melee' ? 'MELEE' : norm(w.range), norm(w.a), norm(kind === 'melee' ? w.ws : w.bs), norm(w.s), norm(w.ap), norm(w.d)]
      if (!lines.some((l) => hasRun(l, run)) && !inPack(packLines, w.name, run)) out.push(`weapon ${w.name}: ${run.join(' ')}`)
    }
  }
  // "KEYWORDS:", or per model: "KEYWORDS – ALL MODELS: … | MINKA LESK ONLY: …" over two lines.
  const kwAt = lines.findIndex((l) => /\bKEYWORDS\b/.test(l.replace(/FACTION KEYWORDS:/g, '')))
  const kwText = kwAt < 0 ? '' : norm(lines.slice(kwAt, kwAt + 4).join(' ').replace(/FACTION KEYWORDS:/g, ' '))
  for (const k of sheet.keywords || []) if (!kwText.includes(norm(k))) out.push(`keyword ${k}`)
  const all = norm(lines.join(' '))
  for (const a of sheet.abilities || []) {
    const name = norm(String(a.name || '').replace(/\s*\([^)]*\)\s*$/, ''))
    if (name && !all.includes(name)) out.push(`ability ${a.name}`)
  }
  return out
}

export async function run(args = process.argv.slice(2)) {
  try { execFileSync('pdftotext', ['-v'], { stdio: 'ignore' }) } catch {
    console.log('pack-text: pdftotext (poppler) not installed — nothing checked')
    return 0
  }
  const newest = new Map()
  for (const f of packFiles(PACKS)) {
    const slug = slugOf(f)
    const v = slug && versionOf(f)
    const was = newest.get(slug)
    if (v && (!was || v.localeCompare(was.version, undefined, { numeric: true }) > 0)) newest.set(slug, { version: v, file: f })
  }
  const baseline = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {}
  const record = args.includes('--baseline')
  const dir = path.join(ROOT, 'src/data/datasheets')
  const findings = []
  const unchecked = []
  let sheets = 0
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.includes('.test.'))) {
    const slug = file.replace(/\.js$/, '')
    const own = ((await loadModule(path.join(dir, file)))?.default || []).filter((d) => d.source === 'faction-pack')
    if (!own.length) continue
    const pack = newest.get(slug)
    if (!pack) { unchecked.push(slug); continue }
    const text = execFileSync('pdftotext', ['-layout', pack.file, '-'], { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] })
    const blocks = new Map(sheetBlocks(text).map((b) => [norm(b.name), b]))
    const packLines = text.split('\n')
    for (const d of own) {
      sheets++
      const b = blocks.get(norm(d.name))
      const found = b ? sheetFindings(d, b.lines, packLines) : ['not found in the pack']
      for (const f of found) findings.push(`${slug} · ${d.name} · ${f}`)
    }
  }
  if (record) {
    const next = Object.fromEntries(findings.map((k) => [k, baseline[k] ?? '']))
    fs.writeFileSync(BASELINE, `${JSON.stringify(next, null, 2)}\n`)
    console.log(`pack-text: ${findings.length} finding(s) recorded in ${path.relative(ROOT, BASELINE)} — give each a reason`)
    return 0
  }
  const fresh = findings.filter((k) => !Object.hasOwn(baseline, k))
  const stale = Object.keys(baseline).filter((k) => !findings.includes(k))
  if (unchecked.length) console.log(`pack-text: no Faction Pack PDF for ${unchecked.join(', ')} in ${PACKS} — not checked`)
  for (const k of fresh) console.log(`  ✗ ${k}`)
  for (const k of stale) console.log(`  ⚠ baseline entry matches nothing (fixed, or reworded): ${k}`)
  console.log(`pack-text: ${sheets} Legends sheet(s) read against their pack; ${fresh.length} new finding(s), ${findings.length - fresh.length} known, ${stale.length} stale.`)
  return fresh.length || stale.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
