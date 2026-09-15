#!/usr/bin/env node
// GATE: the four Event Companion PDFs GW publishes, against what wh11ed carries.
//
// Why this exists, and why appdata is not enough. `sync-event-companion.mjs` diffs our prose
// against wh40k-appdata's copy of the companions — but two things live ONLY in the PDFs:
//   • the Chapter Approved Mission Deck FAQ. There is no appdata table for it (checked by
//     publicationId and by ruleContainerId: zero rows), so when the 26/08/2026 update added four
//     answers, nothing we own could see them. They sat missing for three weeks.
//   • the companion's own VERSION and its WHAT'S NEW list — the one place GW says out loud that
//     something changed, including things no diff would catch (e.g. "Layouts updated").
// So this gate reads the PDFs themselves, out of the hub's gitignored ../sources folder, and
// compares them with scripts/lib/companion-pdfs.json — the versions we have actually read.
//
// A new PDF dropped into ../sources with a higher VERSION fails the gate until someone reads its
// WHAT'S NEW and re-records it with --write. That is the point: the failure IS the reminder.
//
// Dominatus is recorded as deliberately not implemented (it only adapts the separate Dominatus
// deck, whose contents GW ships nowhere — appdata's mission_pack_location* tables are empty), so
// it is version-tracked and nothing more. If that ever changes, the version bump will say so.
//
// Requires `pdftotext` (poppler). Without it, or without the PDFs, the gate says what it could
// not check instead of passing quietly.
//
// Usage: npm run companions          # check
//        npm run companions -- --write   # re-record after reading a new PDF
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, HUB } from './lib/layout-art.mjs'
import { loadModule } from './lib/sync-common.mjs'

const SOURCES = join(HUB, 'sources')
const BASELINE = join(ROOT, 'scripts', 'lib', 'companion-pdfs.json')
const write = process.argv.includes('--write')

// Which PDF is which. GW renames the files on every republish (the June set is `eng_12-06_…`, the
// August one `eng_wh40k_…`), so match on what the name still says rather than on the whole name,
// and prefer the newest file when several editions are lying around.
const KINDS = [
  { id: 'doubles', label: 'Warhammer Doubles', test: (f) => /doubles/i.test(f) },
  { id: 'teams', label: 'Warhammer Teams', test: (f) => /teams/i.test(f) },
  { id: 'dominatus', label: 'Warhammer Dominatus', test: (f) => /dominatus/i.test(f) },
  { id: 'main', label: 'Warhammer Event Companion', test: (f) => /event_companion/i.test(f) },
]

function findPdfs() {
  if (!existsSync(SOURCES)) return {}
  const files = readdirSync(SOURCES).filter((f) => f.toLowerCase().endsWith('.pdf'))
  const out = {}
  for (const f of files) {
    const kind = KINDS.find((k) => k.test(f))
    if (!kind || out[kind.id]?.file === f) continue
    const full = join(SOURCES, f)
    const prev = out[kind.id]
    const mtime = statSync(full).mtimeMs
    // Newest wins — an older edition left in the folder is history, not the current rules.
    if (!prev || mtime > prev.mtime) out[kind.id] = { file: f, path: full, mtime }
  }
  return out
}

// stderr is ignored on purpose: poppler prints a "Syntax Warning: Invalid Font Weight" per page
// for these files, which would bury the gate's own output.
const text = (path) =>
  execFileSync('pdftotext', ['-layout', path, '-'], { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString()

const versionOf = (t) => (t.match(/VERSION\s+(\d+\.\d+)/) || [])[1] || null

/** The WHAT'S NEW bullets — GW's own summary of the update, worth printing when a version moves. */
function whatsNew(t) {
  const start = t.indexOf("WHAT'S NEW")
  if (start < 0) return []
  return t
    .slice(start, start + 900)
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('▪'))
    .map((l) => l.replace(/^▪\s*/, '').replace(/\s{2,}.*$/, '').trim())
    .filter(Boolean)
    .slice(0, 8)
}

/** Every `Q:` in the main companion's errata section, unwrapped from the PDF's hard line breaks. */
function faqQuestions(t) {
  const start = t.indexOf('ERRATA AND FAQS')
  if (start < 0) return []
  const body = t.slice(start, t.indexOf('PAIRINGS AND RANKINGS', start) + 1 || undefined)
  const flat = body.split('\n').map((l) => l.trim()).join(' ').replace(/\s{2,}/g, ' ')
  return [...flat.matchAll(/Q:\s*(.+?)\s*A:/g)].map((m) => m[1].trim())
}

const norm = (s) =>
  s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s) => new Set(norm(s).split(' ').filter((w) => w.length > 3))
function overlap(a, b) {
  const wa = words(a)
  const wb = words(b)
  if (!wa.size || !wb.size) return 0
  let inter = 0
  for (const w of wa) if (wb.has(w)) inter++
  return inter / Math.min(wa.size, wb.size)
}

export async function run() {
  const errors = []
  const notes = []
  const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : { companions: {} }
  const next = { companions: {} }

  try {
    execFileSync('pdftotext', ['-v'], { stdio: 'ignore' })
  } catch {
    console.log('\ncompanion PDFs — pdftotext (poppler) not installed; nothing checked')
    return 0
  }

  const found = findPdfs()
  for (const kind of KINDS) {
    const pdf = found[kind.id]
    const was = baseline.companions?.[kind.id]
    if (!pdf) {
      notes.push(`${kind.label}: no PDF in ../sources — not checked (download it from warhammer-community.com)`)
      if (was) next.companions[kind.id] = was
      continue
    }
    const t = text(pdf.path)
    const version = versionOf(t)
    const record = { version, file: pdf.file, implemented: was?.implemented ?? kind.id !== 'dominatus' }
    if (kind.id === 'main') record.faq = faqQuestions(t).length

    if (!was) {
      errors.push(`${kind.label} v${version}: never recorded — read it and re-record with --write`)
    } else if (was.version !== version) {
      errors.push(`${kind.label}: ${was.version} → ${version} — GW republished it. What they say changed:`)
      for (const line of whatsNew(t)) errors.push(`      ▪ ${line}`)
      errors.push(`      → read it, land what it changes, then: npm run companions -- --write`)
    }

    // The FAQ is the part no diff against appdata can see.
    if (kind.id === 'main') {
      const pdfQs = faqQuestions(t)
      const ec = (await loadModule(join(ROOT, 'src', 'data', 'eventCompanion.js'))).getEventContent('en')
      const ourQs = (ec.faq.items || []).map((i) => i.q)
      for (const q of pdfQs) {
        if (!ourQs.some((our) => overlap(q, our) >= 0.6)) {
          errors.push(`Chapter Approved Mission Deck FAQ — answer missing from eventCompanion.js:`)
          errors.push(`      Q: ${q}`)
        }
      }
      for (const our of ourQs) {
        if (!pdfQs.some((q) => overlap(q, our) >= 0.6)) {
          notes.push(`we carry a FAQ entry the current PDF no longer lists: "${our.slice(0, 70)}…"`)
        }
      }
      if (pdfQs.length !== ourQs.length) {
        notes.push(`FAQ count: PDF ${pdfQs.length}, wh11ed ${ourQs.length}`)
      }
    }
    if (kind.id === 'dominatus' && record.implemented === false) {
      notes.push('Dominatus is deliberately not implemented (it only adapts the separate Dominatus deck, which GW ships nowhere)')
    }
    next.companions[kind.id] = record
  }

  if (write) {
    writeFileSync(BASELINE, JSON.stringify(next, null, 2) + '\n')
    console.log('\ncompanion PDFs — baseline re-recorded:')
    for (const [id, r] of Object.entries(next.companions)) console.log(`    · ${id}: v${r.version} (${r.file})`)
    return 0
  }

  const versions = Object.entries(next.companions)
    .map(([id, r]) => `${id} v${r.version}${r.faq ? ` (${r.faq} FAQ)` : ''}${r.implemented === false ? ' — not implemented' : ''}`)
    .join(', ')
  console.log(`\ncompanion PDFs — ${versions || 'none found'}`)
  for (const n of notes) console.log(`    · ${n}`)
  if (!errors.length) {
    console.log('    ✓ versions match what we have read, and every FAQ answer in the PDF is in the data')
    return 0
  }
  for (const e of errors) console.log(`    ✗ ${e}`)
  return 1
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
if (isMain) process.exit(await run())
