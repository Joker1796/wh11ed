// Shared helpers for the wh40k-appdata reconciliation scripts (sync-appdata.mjs,
// sync-tracker.mjs) — path resolution, name normalization, and appdata's `<b>/<k>/<ul>`
// markup → wh11ed's `**bold**`/ALL-CAPS/`▪` conversion. Kept in one place so both scripts
// treat a given piece of appdata text identically.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const APPDATA = process.env.WH40K_APPDATA_PATH || path.join(ROOT, '..', 'wh40k-appdata')

// The wh40k-appdata `data_version` this repo was last fully reconciled against. Bump this in the
// same commit that lands a re-sync so `npm run sync` can tell you when appdata has moved ahead
// (a newer app dump) and the audit needs re-running. Read appdata's current version from its
// tables/_meta.json.
export const SYNCED_DATA_VERSION = 895
export function appdataDataVersion() {
  const meta = path.join(APPDATA, 'tables', '_meta.json')
  return fs.existsSync(meta) ? JSON.parse(fs.readFileSync(meta, 'utf8')).data_version : null
}

// wh11ed faction slug → wh40k-appdata faction slug, wherever the two disagree. Shared by
// sync-appdata.mjs and gen-roster-data.mjs so both resolve the same bundle/faction keyword.
export const SLUG_MAP = {
  'space-marines': 'adeptus-astartes',
  'chaos-space-marines': 'heretic-astartes',
  'imperial-agents': 'agents-of-the-imperium',
  'aeldari': 'asuryani',
  'chaos-daemons': 'legiones-daemonica',
  'titan-legions': 'adeptus-titanicus',
  'chaos-titan-legions': 'titanicus-traitoris',
}

// Normalize a name for matching: fold quote/dash variants, strip a trailing "(...)"
// classification suffix ("Fear Made Manifest (Aura)"), case/whitespace-insensitive.
export const norm = (s) => (s || '').toLowerCase().replace(/(?:\s*\([^)]*\))+\s*$/, '').replace(/[’‘`]/g, "'").replace(/[-‐‑–—]/g, '-').replace(/\s+/g, ' ').trim()

export function appdataToMarkup(text) {
  if (!text) return ''
  let s = text
  s = s.replace(/<\/?ul[^>]*>/gi, '\n').replace(/<li[^>]*>/gi, '\n▪ ').replace(/<\/li>/gi, '')
  s = s.replace(/<br\s*\/?>/gi, '\n')
  s = s.replace(/<u>(.*?)<\/u>/gis, '__$1__')
  s = s.replace(/<k>(.*?)<\/k>/gis, (_, inner) => inner.toUpperCase())
  s = s.replace(/<b>(.*?)<\/b>/gis, '**$1**')
  s = s.replace(/<[^>]+>/g, '')
  s = s.split('\n').map((l) => l.trim()).join(' ').replace(/\s{2,}/g, ' ')
  return s.trim()
}

// A detachment/army rule's `body` is appdata's array of typed text blocks — flatten to one
// converted string for the report.
export function bodyText(body) {
  return (body || [])
    .map((b) => appdataToMarkup(b.text || b.trigger || b.effect || ''))
    .filter(Boolean)
    .join(' / ')
}

export function loadJson(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null
}
export async function loadModule(file) {
  return fs.existsSync(file) ? import(pathToFileURL(file)) : null
}

export function byNormName(list, nameOf) {
  const m = new Map()
  for (const item of list) m.set(norm(nameOf(item)), item)
  return m
}

// Compare two same-named lists. `scalarFields` are compared as digits-only exact-value
// mismatches (wh11ed sometimes writes "1CP"/free text, appdata a bare number); anything
// else is presence-only. `textOf` prints appdata's converted text next to a "missing" line.
export function diffByName(label, wh11edList, appdataList, nameOf11, nameOfApp, scalarFields = [], textOf = null) {
  const a = byNormName(wh11edList || [], nameOf11)
  const b = byNormName(appdataList || [], nameOfApp)
  const lines = []
  for (const [key, item] of b) {
    if (a.has(key)) continue
    lines.push(`  + missing in wh11ed: ${label} "${nameOfApp(item)}"`)
    const text = textOf?.(item)
    if (text) lines.push(`      ${text}`)
  }
  for (const [key, item] of a) {
    if (!b.has(key)) lines.push(`  - extra in wh11ed (not in appdata): ${label} "${nameOf11(item)}"`)
  }
  for (const [key, whItem] of a) {
    const appItem = b.get(key)
    if (!appItem) continue
    for (const f of scalarFields) {
      const [whField, appField] = Array.isArray(f) ? f : [f, f]
      const whVal = String(whItem[whField] ?? '').replace(/\D/g, '')
      const appVal = String(appItem[appField] ?? '').replace(/\D/g, '')
      if (whVal && appVal && whVal !== appVal) {
        lines.push(`  ~ ${label} "${nameOf11(whItem)}" ${whField} differs: wh11ed=${JSON.stringify(whItem[whField])} appdata=${JSON.stringify(appItem[appField])}`)
      }
    }
  }
  return lines
}
