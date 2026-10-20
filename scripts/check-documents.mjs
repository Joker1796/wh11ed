#!/usr/bin/env node
// GATE: every edition of GW's rules documents found in the hub's ../sources is in the list the patch
// notes read (scripts/patch-notes/documents.json) — `npm run documents`, `-- --write` to add them.
//
// The documents are the Faction Packs (the Legends datasheets, 239 of ours are read from them) and
// the Event Companions (the mission rules, Doubles, Teams, Dominatus). The app carries neither, so
// appdata's history cannot tell the patch notes when one moved: until 2026-10-20 the 26 August
// Event Companion never showed on /patches, and the 14 October packs only as a line written by hand.
// The PDFs are not in git and differ from machine to machine, so what was seen is written down here,
// in git, and gen-patch-notes reads the list — an update shows each document whose version moved.
//
// An edition is { doc, version, published, file }. `doc` is `pack:<faction slug>` or
// `companion:<main|doubles|teams|dominatus>`. `published` is GW's own date: the file name says it
// (eng_14-10_… is 14 October), and the year is the PDF's. The files of 26 August carry no date in
// their names (eng_wh40k_…) — GW's August set, recorded as that day.
//
// Fails when a PDF on this machine is an edition the list does not hold: read what moved (the packs
// gate and the companions gate say what to do with it), then record it with --write. Requires
// `pdftotext` and `pdfinfo` (poppler); without them, or without the PDFs, it says what it could not
// check rather than passing quietly.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ROOT } from './lib/sync-common.mjs'
import { PACKS, packFiles, slugOf, versionOf as packVersion } from './check-packs.mjs'
import { KINDS as COMPANIONS } from './check-companion-pdfs.mjs'

export const DOCUMENTS = path.join(ROOT, 'scripts', 'patch-notes', 'documents.json')
const SOURCES = path.join(ROOT, '..', 'sources')
const AUGUST_SET = '2026-08-26'

const poppler = (tool, args) => {
  try { return execFileSync(tool, args, { encoding: 'utf8', maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'ignore'] }) } catch { return null }
}
const companionVersion = (file) => poppler('pdftotext', ['-l', '3', file, '-'])?.match(/VERSION\s+(\d+\.\d+)/)?.[1] || null

/** GW's date for a file: dd-mm from its name, the year from the PDF; null for a name GW did not give it. */
export function publishedOf(file, created = null) {
  const name = path.basename(file)
  const m = name.match(/^eng_(\d\d)-(\d\d)_/)
  if (m) {
    let year = created?.getFullYear() ?? new Date().getFullYear()
    // A file made in December and published in January belongs to the next year.
    if (created && Number(m[2]) < created.getMonth() + 1 - 6) year++
    return `${year}-${m[2]}-${m[1]}`
  }
  return /^eng_wh40k_/.test(name) ? AUGUST_SET : null
}
const createdOf = (file) => {
  const d = poppler('pdfinfo', [file])?.match(/^CreationDate:\s*(.+)$/m)?.[1]
  const t = d ? new Date(d.replace(/\s+[A-Z]{3,4}$/, '')) : null
  return t && !Number.isNaN(t.getTime()) ? t : null
}

/** Every edition on this machine: packs under ../sources/Faction pack 11 ed, companions in ../sources. */
export function editionsOnDisk() {
  const out = []
  for (const f of packFiles(PACKS)) {
    const slug = slugOf(f)
    const version = slug && packVersion(f)
    if (version) out.push({ doc: `pack:${slug}`, version, published: publishedOf(f, createdOf(f)), file: path.basename(f) })
  }
  const loose = fs.existsSync(SOURCES) ? fs.readdirSync(SOURCES).filter((f) => f.toLowerCase().endsWith('.pdf')) : []
  for (const f of loose) {
    const kind = COMPANIONS.find((k) => k.test(f))
    const full = path.join(SOURCES, f)
    const version = kind && companionVersion(full)
    if (version) out.push({ doc: `companion:${kind.id}`, version, published: publishedOf(f, createdOf(full)), file: f })
  }
  return out
}

export const loadDocuments = () => (fs.existsSync(DOCUMENTS) ? JSON.parse(fs.readFileSync(DOCUMENTS, 'utf8')) : [])
const same = (a, b) => a.doc === b.doc && a.version === b.version

export async function run(args = process.argv.slice(2)) {
  if (poppler('pdftotext', ['-v']) === null && poppler('pdfinfo', ['-v']) === null) {
    console.log('documents: pdftotext/pdfinfo (poppler) not installed — nothing checked')
    return 0
  }
  const known = loadDocuments()
  const found = editionsOnDisk()
  const fresh = []
  for (const e of found) {
    // One edition can lie around twice (a hand-renamed copy): the copy with GW's name is the record.
    if (known.some((k) => same(k, e)) || fresh.some((k) => same(k, e) && k.published)) continue
    const i = fresh.findIndex((k) => same(k, e))
    if (i >= 0) fresh[i] = e
    else fresh.push(e)
  }
  const undated = fresh.filter((e) => !e.published)
  if (args.includes('--write')) {
    if (undated.length) {
      console.log(`documents: no GW date in the name of ${undated.map((e) => e.file).join(', ')} — give it its GW file name, or write the entry by hand`)
      return 1
    }
    const all = [...known, ...fresh].sort((a, b) => a.doc.localeCompare(b.doc) || a.published.localeCompare(b.published))
    fs.writeFileSync(DOCUMENTS, `${JSON.stringify(all, null, 2)}\n`)
    console.log(`documents: ${fresh.length} edition(s) recorded, ${all.length} in ${path.relative(ROOT, DOCUMENTS)}`)
    return 0
  }
  if (!found.length) {
    console.log(`documents: no GW PDFs in ${SOURCES} — not checked`)
    return 0
  }
  if (fresh.length) {
    console.log(`documents: ${fresh.length} edition(s) on this machine the patch notes do not know — read them, then \`npm run documents -- --write\`:`)
    for (const e of fresh) console.log(`  ${e.doc} v${e.version} (${e.published || 'no date'}) ${e.file}`)
    return 1
  }
  console.log(`documents: all ${found.length} PDF(s) on this machine recorded (${known.length} edition(s) in the list).`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
