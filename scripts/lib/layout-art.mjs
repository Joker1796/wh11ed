// Shared plumbing for the Event Companion's 45 Terrain Layout diagrams: where the artwork comes
// from (the GW app's APK), what each layout's file is called, and the manifest that records the
// bytes we last extracted.
//
// Why a manifest exists. The pictures are not in wh40k-appdata — only the app's compiled
// resources carry them (see extract-layout-images.mjs) — so nothing in the ordinary `npm run sync`
// could see GW redrawing a battlefield. On 2026-08-26 they redrew 27 of the 45, and wh11ed went on
// serving the July artwork on 60% of the matchups until a player asked about something else
// entirely. The manifest is the missing memory: hash every layout resource at extraction time,
// then `npm run layouts` can compare a newer APK against it and say exactly which ones moved.
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const HUB = join(ROOT, '..')
export const APPDATA = join(HUB, 'wh40k-appdata')
export const APK_DIR = join(HUB, 'sources', 'apk')
export const OUT_DIR = join(ROOT, 'public', 'images', 'event')
export const MANIFEST_PATH = join(ROOT, 'scripts', 'lib', 'layout-art.json')

// The same 5 dispositions / 15 unordered matchups as src/data/eventCompanion.js.
export const DISPOSITIONS = [
  ['take-and-hold', 'Take and Hold'],
  ['purge-the-foe', 'Purge the Foe'],
  ['disruption', 'Disruption'],
  ['reconnaissance', 'Reconnaissance'],
  ['priority-assets', 'Priority Assets'],
]
export const MATCHUPS = [
  ['take-and-hold', 'take-and-hold'], ['take-and-hold', 'purge-the-foe'], ['take-and-hold', 'disruption'],
  ['take-and-hold', 'reconnaissance'], ['take-and-hold', 'priority-assets'], ['purge-the-foe', 'purge-the-foe'],
  ['purge-the-foe', 'disruption'], ['purge-the-foe', 'reconnaissance'], ['purge-the-foe', 'priority-assets'],
  ['disruption', 'disruption'], ['disruption', 'reconnaissance'], ['disruption', 'priority-assets'],
  ['reconnaissance', 'reconnaissance'], ['reconnaissance', 'priority-assets'], ['priority-assets', 'priority-assets'],
]
export const LETTERS = ['A', 'B', 'C']

/** Every layout as `{ a, b, letter, key }`, in the data file's own order. */
export function layoutList() {
  const out = []
  for (const [a, b] of MATCHUPS) for (const letter of LETTERS) out.push({ a, b, letter, key: `${a}|${b}|${letter}` })
  return out
}

/** appdata's mission_layout id per layout key (both matchup orderings resolve to the same row). */
export function uuidByKey() {
  const slugByName = new Map(DISPOSITIONS.map(([slug, name]) => [name, slug]))
  const rows = JSON.parse(readFileSync(join(APPDATA, 'tables', 'mission_layout.json'), 'utf8'))
  const out = new Map()
  for (const row of rows) {
    const m = (row.localisations?.en?.name || '').match(/^(.+?) \/ (.+?) - Layout ([ABC])$/)
    if (!m) continue // the 3 generic "Mission Layout A/B/C" placeholders
    const slugA = slugByName.get(m[1])
    const slugB = slugByName.get(m[2])
    if (!slugA || !slugB) continue
    out.set(`${slugA}|${slugB}|${m[3]}`, row.id)
    out.set(`${slugB}|${slugA}|${m[3]}`, row.id)
  }
  return out
}

/** The two APK resources per layout: the diagram with inch callouts, and the clean one. */
export function resourcePaths(uuid) {
  const u = uuid.replace(/-/g, '_')
  return { measurement: `res/drawable/ic_measurement_layout_${u}.webp`, clean: `res/drawable/ic_layout_${u}.webp` }
}

// File naming, and the one rule that makes it safe: an image may never be edited in place (the
// bucket caches 30 days, the service worker's /images/ route is CacheFirst and never revalidates),
// so new artwork means a new NAME. Version 2 is what the first APK pull shipped under — keep its
// legacy spelling so the 18 layouts GW did NOT redraw stay byte-identical URLs and nobody
// re-downloads them. From 3 on, both variants carry the number.
export function fileBase(a, b, letter, version) {
  const stem = `layout-${a}-${b}-${letter.toLowerCase()}`
  return version <= 2
    ? { measurement: `${stem}-v2`, clean: `${stem}-clean` }
    : { measurement: `${stem}-v${version}`, clean: `${stem}-clean-v${version}` }
}

export const publicPath = (base) => `/images/event/${base}.png`

export function findLatestXapk(arg) {
  if (arg) return arg
  if (!existsSync(APK_DIR)) return null
  const files = readdirSync(APK_DIR)
    .filter((f) => f.endsWith('.xapk'))
    .map((f) => join(APK_DIR, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
  return files[0] || null
}

/** Unpack the inner APK once; the caller cleans up. */
export function openApk(xapkPath) {
  const work = mkdtempSync(join(tmpdir(), 'wh11ed-layout-art-'))
  execFileSync('unzip', ['-o', '-q', xapkPath, 'com.gamesworkshop.w40k.apk', '-d', work])
  return {
    apkPath: join(work, 'com.gamesworkshop.w40k.apk'),
    dir: work,
    cleanup: () => rmSync(work, { recursive: true, force: true }),
  }
}

/** One resource's bytes, or null when the APK does not carry it. */
export function readResource(apkPath, resPath) {
  try {
    return execFileSync('unzip', ['-p', apkPath, resPath], { maxBuffer: 64 * 1024 * 1024 })
  } catch {
    return null
  }
}

export const sha = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 16)

export function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return { source: null, layouts: {} }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
}

export function saveManifest(manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
}

/** Hash every layout resource in one APK: key → { measurement, clean } (null when absent). */
export function hashApk(apkPath) {
  const uuids = uuidByKey()
  const out = {}
  for (const { key } of layoutList()) {
    const uuid = uuids.get(key)
    if (!uuid) { out[key] = { measurement: null, clean: null, missing: 'no appdata mission_layout row' }; continue }
    const res = resourcePaths(uuid)
    const m = readResource(apkPath, res.measurement)
    const c = readResource(apkPath, res.clean)
    out[key] = { measurement: m ? sha(m) : null, clean: c ? sha(c) : null }
  }
  return out
}
