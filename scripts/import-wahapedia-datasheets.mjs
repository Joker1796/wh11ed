// Generate per-faction datasheet data files from the Wahapedia CSV exports.
//
// Usage:
//   node scripts/import-wahapedia-datasheets.mjs <slug> [<slug> ...]
//   node scripts/import-wahapedia-datasheets.mjs --all
//
// For each faction slug (matching src/data/mfm/<slug>.js), the unit roster is taken from
// the MFM (units + subfaction units — the authoritative 11ed list, with points), matched
// against Wahapedia's Datasheets.csv by name, and written to
// src/data/datasheets/<slug>.js as `export default [...]`. Units present in the MFM but
// missing from Wahapedia (new-in-pack datasheets) are listed in a trailing comment for a
// later manual pass. The files are lazy-loaded per faction via src/data/datasheets/index.js
// so they never enter the main FactionView chunk.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import EXTRAS from './datasheet-extras.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = path.join(ROOT, 'node_modules', '.cache', 'wahapedia')
const OUT_DIR = path.join(ROOT, 'src', 'data', 'datasheets')
const BASE_URL = 'https://wahapedia.ru/wh40k10ed'
const TABLES = ['Factions', 'Abilities', 'Datasheets', 'Datasheets_models', 'Datasheets_wargear', 'Datasheets_abilities', 'Datasheets_keywords', 'Datasheets_unit_composition', 'Datasheets_options', 'Datasheets_leader']

// Space Marine chapters share the SM faction id on Wahapedia.
const FACTION_ID_OVERRIDES = {
  'blood-angels': 'SM', 'dark-angels': 'SM', 'black-templars': 'SM', 'deathwatch': 'SM', 'space-wolves': 'SM',
}
// MFM unit name → Wahapedia datasheet name, where the two disagree (normName forms).
const UNIT_ALIASES = {
  'vyper': 'vypers',
  'myphitic blight-haulers': 'myphitic blight-hauler',
}

async function loadTable(name) {
  fs.mkdirSync(CACHE, { recursive: true })
  const file = path.join(CACHE, `${name}.csv`)
  if (!fs.existsSync(file)) {
    const res = await fetch(`${BASE_URL}/${name}.csv`)
    if (!res.ok) throw new Error(`download ${name}.csv: HTTP ${res.status}`)
    fs.writeFileSync(file, await res.text())
  }
  const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim())
  const header = lines[0].split('|').map((h) => h.trim()).filter(Boolean)
  return lines.slice(1).map((line) => {
    const cells = line.split('|')
    const row = {}
    header.forEach((h, i) => { row[h] = (cells[i] || '').trim() })
    return row
  })
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ')
}
function htmlToMarkup(html) {
  if (!html) return ''
  let s = html
  s = s.replace(/<\/?ul[^>]*>/gi, '\n')
  s = s.replace(/<li[^>]*>/gi, '\n▪ ').replace(/<\/li>/gi, '')
  s = s.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?p[^>]*>/gi, '\n')
  s = s.replace(/<span[^>]*class="kw[^"]*"[^>]*>(.*?)<\/span>/gis, (m, inner) => {
    const letters = inner.replace(/[^A-Za-z]/g, '')
    const upper = letters.replace(/[^A-Z]/g, '')
    if (letters && upper.length / letters.length >= 0.6 && upper.length !== letters.length) return inner.toUpperCase()
    return inner
  })
  s = s.replace(/<b>(.*?)<\/b>/gis, '**$1**').replace(/<strong>(.*?)<\/strong>/gis, '**$1**')
  s = s.replace(/<\/?i>/gi, '')
  s = s.replace(/<[^>]+>/g, '')
  s = decodeEntities(s)
  s = s.split('\n').map((l) => l.trim()).join('\n')
  s = s.replace(/\n{3,}/g, '\n\n').replace(/\n\n(▪ )/g, '\n$1')
  s = s.replace(/\*\*\s*\*\*/g, '')
  s = s.replace(/\b[A-Za-z]{3,}\b/g, (w) => {
    const upper = w.replace(/[^A-Z]/g, '')
    return upper.length / w.length >= 0.6 && upper.length !== w.length ? w.toUpperCase() : w
  })
  return s.trim()
}
const normName = (s) => s.toLowerCase().replace(/[’`]/g, "'").replace(/‑/g, '-').replace(/\s+/g, ' ').trim()
const slugify = (s) => normName(s).replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ── load everything once ──
const [factions, abilities, datasheets, models, wargear, dsAbilities, keywords, composition, options, leaders] = await Promise.all(TABLES.map(loadTable))
const abilityName = new Map(abilities.map((a) => [a.id, a.name]))
const dsById = new Map(datasheets.map((d) => [d.id, d]))
const groupBy = (rows, key) => {
  const m = new Map()
  for (const r of rows) {
    if (!m.has(r[key])) m.set(r[key], [])
    m.get(r[key]).push(r)
  }
  return m
}
const modelsBy = groupBy(models, 'datasheet_id')
const wargearBy = groupBy(wargear, 'datasheet_id')
const abilitiesBy = groupBy(dsAbilities, 'datasheet_id')
const keywordsBy = groupBy(keywords, 'datasheet_id')
const compositionBy = groupBy(composition, 'datasheet_id')
const optionsBy = groupBy(options, 'datasheet_id')
const leaderBy = groupBy(leaders, 'leader_id')

// Wahapedia stores bare numbers for some stats — restore the codex notation.
const fmtRange = (v) => (/^\d+$/.test(v) ? `${v}"` : v)
const fmtPlus = (v) => (/^\d+$/.test(v) ? `${v}+` : v)

function buildDatasheet(row, mfmUnit) {
  const id = row.id
  const out = { id: slugify(row.name), name: row.name }
  if (mfmUnit) out.points = mfmUnit.options
  if (row.legend) out.flavor = htmlToMarkup(row.legend)

  // profiles
  const profs = (modelsBy.get(id) || []).map((m) => {
    const p = { name: m.name, m: m.M, t: m.T, sv: m.Sv, w: m.W, ld: m.Ld, oc: m.OC }
    if (m.inv_sv && m.inv_sv !== '-') p.inv = fmtPlus(m.inv_sv)
    if (m.inv_sv_descr) p.invNote = htmlToMarkup(m.inv_sv_descr)
    return p
  })
  out.profiles = profs

  // weapons
  const ranged = []
  const melee = []
  for (const w of wargearBy.get(id) || []) {
    const tags = w.description ? htmlToMarkup(w.description).split(/,\s*/).map((t) => t.toUpperCase()).filter(Boolean) : []
    if (w.type === 'Melee') {
      melee.push({ name: w.name, tags, a: w.A, ws: fmtPlus(w.BS_WS), s: w.S, ap: w.AP, d: w.D })
    } else {
      ranged.push({ name: w.name, tags, range: fmtRange(w.range), a: w.A, bs: fmtPlus(w.BS_WS), s: w.S, ap: w.AP, d: w.D })
    }
  }
  if (ranged.length) out.ranged = ranged
  if (melee.length) out.melee = melee

  // abilities
  const core = []
  const faction = []
  const other = []
  const wg = []
  const special = []
  for (const a of abilitiesBy.get(id) || []) {
    const nm = a.name || abilityName.get(a.ability_id) || ''
    const withParam = a.parameter ? `${nm} ${a.parameter}` : nm
    if (a.type === 'Core') core.push(withParam)
    else if (a.type === 'Faction') faction.push(withParam)
    else if (a.type === 'Wargear') wg.push({ name: nm, text: htmlToMarkup(a.description) })
    else if (a.type === 'Datasheet') other.push({ name: nm, text: htmlToMarkup(a.description) })
    else if (a.type === 'Primarch' || a.type === 'Special' || a.type.startsWith('Fortification')) {
      special.push({ name: withParam, text: htmlToMarkup(a.description) })
    }
    // 'Wargear profile' rows (bracket-keyword definitions) are skipped — the [TAG] on the
    // weapon line is enough, and shared ones resolve via KeywordPopover.
  }
  if (core.length) out.core = core.join(', ')
  if (faction.length) out.faction = faction.join(', ')
  if (other.length) out.abilities = other
  if (wg.length) out.wargearAbilities = wg
  if (special.length) out.specialAbilities = special
  if (row.damaged_w) out.damaged = { note: `${row.damaged_w} wounds remaining`, text: htmlToMarkup(row.damaged_description) }

  // composition / loadout / options / transport / leader
  const comp = (compositionBy.get(id) || []).map((c) => htmlToMarkup(c.description)).filter(Boolean)
  if (comp.length) out.composition = comp
  if (row.loadout) out.loadout = htmlToMarkup(row.loadout)
  const opts = (optionsBy.get(id) || []).map((o) => htmlToMarkup(o.description)).filter(Boolean)
  if (opts.length) out.options = opts
  if (row.transport) out.transport = htmlToMarkup(row.transport)
  const led = (leaderBy.get(id) || []).map((l) => dsById.get(l.attached_id)?.name).filter(Boolean)
  if (led.length) {
    out.leader = { text: htmlToMarkup(row.leader_head || 'This model can be attached to the following units:'), units: led }
    if (row.leader_footer) out.leader.footer = htmlToMarkup(row.leader_footer)
  }

  // keywords
  const kws = keywordsBy.get(id) || []
  out.keywords = kws.filter((k) => k.is_faction_keyword !== 'true').map((k) => k.keyword)
  out.factionKeywords = kws.filter((k) => k.is_faction_keyword === 'true').map((k) => k.keyword)
  return out
}

async function generate(slug) {
  const mfm = (await import(pathToFileURL(path.join(ROOT, 'src', 'data', 'mfm', `${slug}.js`)).href)).default
  const fid = FACTION_ID_OVERRIDES[slug] || factions.find((f) => normName(f.name) === normName(mfm.name))?.id
  if (!fid) { console.error(`${slug}: faction id not found`); return }

  // MFM roster: units + subfaction units (points attached from the MFM options)
  const roster = [...mfm.units]
  for (const sf of mfm.subfactions || []) roster.push(...sf.units)

  // candidate datasheets: the faction's own + (for allied subfactions like Harlequins /
  // Ynnari under Aeldari) any name match across factions as a fallback
  const own = datasheets.filter((d) => d.faction_id === fid && d.virtual !== 'true')
  const byName = new Map()
  for (const d of own) byName.set(normName(d.name), d)
  for (const d of datasheets) if (d.virtual !== 'true' && !byName.has(normName(d.name))) byName.set(normName(d.name), d)

  const sheets = []
  const missing = []
  for (const u of roster) {
    const key = UNIT_ALIASES[normName(u.name)] || normName(u.name)
    const row = own.find((d) => normName(d.name) === key) || byName.get(key)
    if (!row) {
      // New-in-pack datasheets absent from Wahapedia: hand-transcribed in datasheet-extras.mjs
      const extra = EXTRAS[key]
      if (extra) sheets.push({ id: extra.id, name: extra.name, points: u.options, ...extra })
      else missing.push(u.name)
      continue
    }
    sheets.push(buildDatasheet(row, u))
  }
  sheets.sort((a, b) => a.name.localeCompare(b.name))

  fs.mkdirSync(OUT_DIR, { recursive: true })
  const body = `// ${mfm.name} — datasheets. Generated by scripts/import-wahapedia-datasheets.mjs from
// the Wahapedia CSV exports (unit roster and points from src/data/mfm/${slug}.js).
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default ${JSON.stringify(sheets, null, 2)}
${missing.length ? `\n// MISSING FROM WAHAPEDIA (new-in-pack datasheets, add manually later):\n${missing.map((m) => `//   - ${m}`).join('\n')}\n` : ''}`
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.js`), body)
  console.log(`${slug}: ${sheets.length} datasheets${missing.length ? `, missing ${missing.length}: ${missing.join(', ')}` : ''}`)
}

const args = process.argv.slice(2)
const slugs = args.includes('--all')
  ? fs.readdirSync(path.join(ROOT, 'src', 'data', 'factions')).filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => f.replace('.js', ''))
  : args.filter((a) => !a.startsWith('--'))
for (const slug of slugs) await generate(slug)
