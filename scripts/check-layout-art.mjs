#!/usr/bin/env node
// GATE: the Event Companion's 45 Terrain Layout diagrams, against the artwork GW actually ships.
//
// Why this exists. The layout pictures live nowhere in wh40k-appdata — only in the app's compiled
// APK resources — so every reconciliation script we own was structurally blind to them, and
// `sync-layouts.mjs` only checks the matchup↔letter PAIRING, never the picture. On 2026-08-26 GW
// redrew 27 of the 45 battlefields (their own PDF lists them under "LAYOUTS UPDATED"); wh11ed kept
// serving the July artwork on 60% of the matchups for three weeks, and nothing said a word. The
// APK sitting in ../sources/apk is all it took to know.
//
// What it checks:
//   1. ARTWORK — every layout resource in the newest APK against scripts/lib/layout-art.json (the
//      hashes recorded when we last extracted). A difference is a redraw: re-run
//      `node scripts/extract-layout-images.mjs`, which bumps the changed layouts' filenames.
//   2. BOOKKEEPING — every path src/data/eventCompanion.js references exists on disk as .webp and
//      -sm.webp, no orphan layout-*.webp is left behind, and the manifest covers all 45.
//   3. EDGES — the attacker/defender battlefield edges (`layoutEdges`, hand-read from the source
//      PDF) against the deployment-zone tint in the picture itself. A redraw can rotate a layout,
//      and that table is the one thing about it nobody regenerates. Diagonal deployments tint both
//      axes and are reported as unresolvable rather than guessed at.
//
// No APK in ../sources/apk (a fresh clone, CI) → checks 2 and 3 still run; 1 says so out loud
// instead of passing quietly.
//
// Usage: npm run layouts
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import {
  ROOT, OUT_DIR, layoutList, fileBase, publicPath, findLatestXapk, openApk, hashApk, loadManifest,
} from './lib/layout-art.mjs'

const DATA_FILE = join(ROOT, 'src', 'data', 'eventCompanion.js')

function parseMap(src, name) {
  const body = src.match(new RegExp(`const ${name} = \\{([\\s\\S]*?)\\n\\}`))
  if (!body) throw new Error(`${name} not found in eventCompanion.js`)
  const out = {}
  for (const line of body[1].split('\n')) {
    const key = line.match(/^\s*'([^']+)':/)
    if (!key) continue
    for (const letter of ['A', 'B', 'C']) {
      const m = line.match(new RegExp(`${letter}: '([^']+)'`))
      if (m) out[`${key[1]}|${letter}`] = m[1]
    }
  }
  return out
}

// Mean (red − blue) of one quarter of the picture: the deployment zones are tinted red for the
// Attacker and blue for the Defender, so the axis with the bigger spread is the axis they sit on.
async function tintAxis(file) {
  const img = sharp(file)
  const { width, height } = await img.metadata()
  // stats() reads the INPUT image, not the result of the pipeline — extract to a buffer first,
  // or every region reports the mean of the whole picture (and every layout looks diagonal).
  const mean = async (left, top, w, h) => {
    const buf = await sharp(file).extract({ left, top, width: w, height: h }).toBuffer()
    const { channels } = await sharp(buf).stats()
    return channels[0].mean - channels[2].mean
  }
  const qw = Math.floor(width / 4)
  const qh = Math.floor(height / 4)
  const [l, r, t, b] = await Promise.all([
    mean(0, 0, qw, height),
    mean(width - qw, 0, qw, height),
    mean(0, 0, width, qh),
    mean(0, height - qh, width, qh),
  ])
  return { dv: l - r, dh: t - b }
}

export async function run() {
  const errors = []
  const notes = []
  const src = readFileSync(DATA_FILE, 'utf8')
  const images = parseMap(src, 'layoutImages')
  const clean = parseMap(src, 'layoutImagesClean')
  const edges = parseMap(src, 'layoutEdges')
  const manifest = loadManifest()
  const layouts = layoutList()

  // ── 1. artwork vs the APK ──────────────────────────────────────────────────────────
  const xapk = findLatestXapk()
  if (!xapk) {
    notes.push('no *.xapk in ../sources/apk — the artwork itself was NOT checked (bookkeeping and edges were)')
  } else {
    const apk = openApk(xapk)
    const current = hashApk(apk.apkPath)
    apk.cleanup()
    const redrawn = []
    for (const { key, a, b, letter } of layouts) {
      const now = current[key]
      const was = manifest.layouts[key]
      if (!now || (!now.measurement && !now.clean)) { errors.push(`APK has no artwork for ${a} / ${b} — Layout ${letter}`); continue }
      if (!was) { errors.push(`manifest has no record for ${a} / ${b} — Layout ${letter} (re-seed it)`); continue }
      if (was.measurement !== now.measurement || was.clean !== now.clean) redrawn.push(`${a} / ${b} — Layout ${letter}`)
    }
    if (redrawn.length) {
      errors.push(`${redrawn.length} layout(s) redrawn since ${manifest.source || 'the recorded APK'} (now ${xapk.split('/').pop()}):`)
      for (const r of redrawn) errors.push(`    ⟲ ${r}`)
      errors.push('    → node scripts/extract-layout-images.mjs   (bumps their filenames, then images:webp + images:dims + imghash --write)')
    }
  }

  // ── 2. bookkeeping ─────────────────────────────────────────────────────────────────
  const referenced = new Set()
  for (const [key, path] of [...Object.entries(images), ...Object.entries(clean)]) {
    const base = path.replace('/images/event/', '').replace(/\.png$/, '')
    referenced.add(`${base}.webp`)
    referenced.add(`${base}-sm.webp`)
    for (const suffix of ['.webp', '-sm.webp']) {
      if (!existsSync(join(OUT_DIR, `${base}${suffix}`))) errors.push(`${key}: referenced ${base}${suffix} is not on disk`)
    }
  }
  for (const file of readdirSync(OUT_DIR)) {
    if (file.startsWith('layout-') && file.endsWith('.webp') && !referenced.has(file)) {
      errors.push(`orphan image nothing references: ${file}`)
    }
  }
  for (const { key, a, b, letter } of layouts) {
    const entry = manifest.layouts[key]
    if (!entry) { errors.push(`manifest missing ${a} / ${b} — Layout ${letter}`); continue }
    const expect = fileBase(a, b, letter, entry.version)
    if (images[key] !== publicPath(expect.measurement)) errors.push(`${key}: data points at ${images[key]}, manifest says v${entry.version} (${publicPath(expect.measurement)})`)
    if (clean[key] !== publicPath(expect.clean)) errors.push(`${key}: clean variant is ${clean[key]}, manifest says ${publicPath(expect.clean)}`)
  }

  // ── 3. edges vs the picture ────────────────────────────────────────────────────────
  let ambiguous = 0
  for (const { key, a, b, letter } of layouts) {
    const path = images[key]
    if (!path) continue
    const file = join(OUT_DIR, path.replace('/images/event/', '').replace(/\.png$/, '.webp'))
    if (!existsSync(file)) continue
    const { dv, dh } = await tintAxis(file)
    const strong = Math.max(Math.abs(dv), Math.abs(dh))
    const weak = Math.min(Math.abs(dv), Math.abs(dh))
    if (strong === 0 || weak / strong > 0.8) { ambiguous++; continue } // diagonal deployment — unresolvable by tint
    const seen = Math.abs(dv) > Math.abs(dh) ? 'v' : 'h'
    if (edges[key] && edges[key] !== seen) {
      errors.push(`${a} / ${b} — Layout ${letter}: layoutEdges says '${edges[key]}', the picture's deployment zones read '${seen}'`)
    }
  }
  if (ambiguous) notes.push(`${ambiguous} layout(s) tint both axes (diagonal deployment) — their edge orientation can only be read by eye`)

  console.log(`\nlayout art — ${layouts.length} layouts, ${Object.keys(manifest.layouts).length} recorded (source: ${manifest.source || 'none'})`)
  for (const n of notes) console.log(`    · ${n}`)
  if (!errors.length) {
    console.log('    ✓ artwork matches the recorded APK, every file is referenced, edges agree with the pictures')
    return 0
  }
  for (const e of errors) console.log(`    ✗ ${e}`)
  return 1
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
if (isMain) process.exit(await run())
