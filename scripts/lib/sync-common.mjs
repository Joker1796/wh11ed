// Shared helpers for the wh40k-appdata reconciliation scripts (sync-appdata.mjs,
// sync-tracker.mjs) — path resolution, name normalization, and appdata's `<b>/<k>/<ul>`
// markup → wh11ed's `**bold**`/ALL-CAPS/`▪` conversion. Kept in one place so both scripts
// treat a given piece of appdata text identically.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const APPDATA = process.env.WH40K_APPDATA_PATH || path.join(ROOT, '..', 'wh40k-appdata')

// wh11ed faction slug → wh40k-appdata bundle/faction-keyword slug, for the 7 factions GW renamed
// between the app dump and wh11ed's own filenames. Every other faction shares the same slug in both.
// Single source of truth — imported by the reconciliation scripts (gen-source-ids, sync-appdata,
// sync-tracker, gen-faction-faq). Invert it (appdata slug → wh11ed slug) when going the other way.
export const SLUG_MAP = {
  'space-marines': 'adeptus-astartes',
  'chaos-space-marines': 'heretic-astartes',
  'imperial-agents': 'agents-of-the-imperium',
  aeldari: 'asuryani',
  'chaos-daemons': 'legiones-daemonica',
  'titan-legions': 'adeptus-titanicus',
  'chaos-titan-legions': 'titanicus-traitoris',
}

// The wh40k-appdata `data_version` this repo was last fully reconciled against. Bump this in the
// same commit that lands a re-sync so `npm run sync` can tell you when appdata has moved ahead
// (a newer app dump) and the audit needs re-running. Single source of truth is the shipped
// src/data/appDataVersion.js (the footer shows it too) — bump it there.
export { APP_DATA_VERSION as SYNCED_DATA_VERSION } from '../../src/data/appDataVersion.js'
export function appdataDataVersion() {
  const meta = path.join(APPDATA, 'tables', '_meta.json')
  return fs.existsSync(meta) ? JSON.parse(fs.readFileSync(meta, 'utf8')).data_version : null
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
  s = s.replace(/&#x?[0-9a-f]+;/gi, ' ') // stray numeric HTML entities (e.g. &#x20;) in appdata text
  // Collapse incidental line-wraps into flowing prose, but keep a real `\n` before each bullet
  // line so it survives as a genuine list item — matching the hand-authored body convention (see
  // e.g. factions/grey-knights.js's "One Foot in the Future") — rather than being flattened into
  // an inline "▪ text ▪ text" run that renders as plain text. appdata sometimes hand-types the
  // bullet *inside* a `**bold**`/`__underline__` run ("**▪ Company Heroes Rule:**") or right after
  // an opening quote ("'■ Ranged weapons…") and sometimes uses `■` instead of `▪` — normalize all
  // of that so the bullet is always the line's leading char and buildRich's `^[▪•]` list-item
  // check (useRenderInline.js) recognizes it.
  const BULLET_LEAD = /^(\*{1,2}|__|['’‘"«])?[▪■][ \t]*/
  const normalizeBullet = (l) => {
    const m = l.match(BULLET_LEAD)
    return m ? `▪ ${m[1] || ''}${l.slice(m[0].length)}` : l
  }
  s = s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .reduce((acc, l) => (!acc ? normalizeBullet(l) : BULLET_LEAD.test(l) ? `${acc}\n${normalizeBullet(l)}` : `${acc} ${l}`), '')
    .replace(/[ \t]{2,}/g, ' ')
  return s.trim()
}

// A detachment/army rule's `body` is appdata's array of typed text blocks — flatten to one
// converted string for the report. Flavour blocks (loreAccordion/quote) are skipped: wh11ed
// stores flavour in a separate `flavor` field, so including them would flag every rule.
export function bodyText(body) {
  return (body || [])
    .filter((b) => b.type !== 'loreAccordion' && b.type !== 'quote' && b.type !== 'image')
    .map((b) => appdataToMarkup(b.text || b.trigger || b.effect || ''))
    .filter(Boolean)
    .join('\n')
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
