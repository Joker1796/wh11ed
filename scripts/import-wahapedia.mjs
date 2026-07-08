// Import faction detachment rules from the Wahapedia CSV exports into a DRAFT faction
// data file. Wahapedia's exports carry the 10th-edition codex rules text; our 11ed data
// pipeline is (highest priority wins): MFM > Faction Pack > Codex. So this script only
// produces the CODEX layer as a draft — the Faction-Pack "Rules Updates" and any
// detachments missing from Wahapedia (new-in-pack ones) are folded in by hand afterwards,
// exactly like the PDF-transcription workflow it replaces.
//
// Usage:
//   node scripts/import-wahapedia.mjs <slug> [--csv-dir DIR] [--out FILE]
//
//   <slug>     faction slug, must match src/data/mfm/<slug>.js (e.g. tau-empire)
//   --csv-dir  directory with pre-downloaded CSVs named <table>.csv; when omitted the
//              script downloads them from wahapedia.ru into node_modules/.cache/wahapedia
//   --out      output path (default: scripts/.drafts/<slug>.draft.js)
//
// What it does:
//   1. Loads src/data/mfm/<slug>.js — the authoritative 11ed detachment list (name, dp,
//      forceDisposition, unique, enhancement points).
//   2. Filters Wahapedia Detachment_abilities / Stratagems / Enhancements rows to the
//      detachments present in the MFM (10ed-only detachments are dropped; MFM detachments
//      missing from Wahapedia are reported for manual pack transcription).
//   3. Converts Wahapedia HTML to our RuleBlock/StratCard markup (** bold, ▪ bullets,
//      keyword spans stripped to plain text) and title-cases stratagem names.
//   4. Emits a draft module with the same shape as src/data/factions/*.js (armyRule left
//      as a TODO stub — army rules are not in the CSV exports).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TABLES = ['Factions', 'Detachment_abilities', 'Stratagems', 'Enhancements']
const BASE_URL = 'https://wahapedia.ru/wh40k10ed'

// ---------- args ----------
const args = process.argv.slice(2)
const slug = args.find((a) => !a.startsWith('--'))
if (!slug) {
  console.error('Usage: node scripts/import-wahapedia.mjs <slug> [--csv-dir DIR] [--out FILE]')
  process.exit(1)
}
const argVal = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : null
}
const csvDir = argVal('--csv-dir')
const outFile = argVal('--out') || path.join(ROOT, 'scripts', '.drafts', `${slug}.draft.js`)

// ---------- CSV loading ----------
async function loadTable(name) {
  let text
  if (csvDir) {
    text = fs.readFileSync(path.join(csvDir, `${name}.csv`), 'utf8')
  } else {
    const cache = path.join(ROOT, 'node_modules', '.cache', 'wahapedia')
    fs.mkdirSync(cache, { recursive: true })
    const file = path.join(cache, `${name}.csv`)
    if (!fs.existsSync(file)) {
      const res = await fetch(`${BASE_URL}/${name}.csv`)
      if (!res.ok) throw new Error(`download ${name}.csv: HTTP ${res.status}`)
      fs.writeFileSync(file, await res.text())
    }
    text = fs.readFileSync(file, 'utf8')
  }
  // Pipe-delimited with a trailing pipe; first line is the header (may carry a BOM).
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim())
  const header = lines[0].split('|').map((h) => h.trim()).filter(Boolean)
  return lines.slice(1).map((line) => {
    const cells = line.split('|')
    const row = {}
    header.forEach((h, i) => { row[h] = (cells[i] || '').trim() })
    return row
  })
}

// ---------- HTML → our markup ----------
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ')
}
function htmlToMarkup(html) {
  if (!html) return ''
  let s = html
  // bullet lists → ▪ lines
  s = s.replace(/<\/?ul[^>]*>/gi, '\n')
  s = s.replace(/<li[^>]*>/gi, '\n▪ ').replace(/<\/li>/gi, '')
  // line breaks / paragraphs
  s = s.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?p[^>]*>/gi, '\n')
  // bold → ** (drop bold on keyword spans first: they're stripped to plain text)
  s = s.replace(/<span[^>]*class="kw[^"]*"[^>]*>(.*?)<\/span>/gis, '$1')
  s = s.replace(/<b>(.*?)<\/b>/gis, '**$1**').replace(/<strong>(.*?)<\/strong>/gis, '**$1**')
  s = s.replace(/<\/?i>/gi, '')
  // everything else (links, divs, imgs, tooltips) → plain text
  s = s.replace(/<[^>]+>/g, '')
  s = decodeEntities(s)
  // tidy whitespace: no trailing spaces, max one blank line, tight ▪ lists
  s = s.split('\n').map((l) => l.trim()).join('\n')
  s = s.replace(/\n{3,}/g, '\n\n')
  s = s.replace(/\n\n(▪ )/g, '\n$1')
  // empty-bold artefacts
  s = s.replace(/\*\*\s*\*\*/g, '')
  return s.trim()
}
// "MULTISENSORY SCANNING" → "Multisensory Scanning" (keep small words lowered mid-name)
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'from', 'in', 'is', 'no', 'not', 'of', 'off', 'on', 'or', 'the', 'to', 'with'])
function titleCase(name) {
  const words = name.toLowerCase().split(/\s+/)
  return words
    .map((w, i) => {
      if (i > 0 && SMALL.has(w)) return w
      // keep hyphenated halves capitalised: "info-screed" → "Info-Screed"
      return w.replace(/(^|[-'’])([a-z])/g, (m, p, c) => p + c.toUpperCase())
    })
    .join(' ')
}
const normName = (s) =>
  s.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ').replace(/\s*\((upgrade|aura)\)\s*$/, '').trim()
const slugify = (s) =>
  normName(s).replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// turn: "Your turn" | "Opponent's turn" | "Either player's turn"
function turnOf(v) {
  const t = v.toLowerCase()
  if (t.startsWith('your')) return 'your'
  if (t.startsWith('opponent')) return 'opponent'
  return 'either'
}
// stratagem description → { when, target, effect, restrictions }
function splitStrat(html) {
  const out = { when: '', target: '', effect: '', restrictions: '' }
  const parts = html.split(/<b>\s*(WHEN|TARGET|EFFECT|RESTRICTIONS)\s*:\s*<\/b>/i)
  // parts: [preamble, KEY, text, KEY, text, ...]
  for (let i = 1; i < parts.length; i += 2) {
    out[parts[i].toLowerCase()] = htmlToMarkup(parts[i + 1] || '')
  }
  if (!out.when && !out.effect) out.effect = htmlToMarkup(html) // unexpected shape — dump it all
  return out
}

// ---------- main ----------
const mfmUrl = pathToFileURL(path.join(ROOT, 'src', 'data', 'mfm', `${slug}.js`)).href
const mfm = (await import(mfmUrl)).default

const [factions, detAbilities, stratagems, enhancements] = await Promise.all(TABLES.map(loadTable))

const fac = factions.find((f) => normName(f.name) === normName(mfm.name))
if (!fac) {
  console.error(`Faction "${mfm.name}" not found in Wahapedia Factions.csv`)
  process.exit(1)
}
const fid = fac.id
console.log(`Faction: ${mfm.name} (wahapedia id ${fid})`)

const byDet = (rows) => {
  const m = new Map()
  for (const r of rows) {
    if (r.faction_id !== fid || !r.detachment) continue
    const k = normName(r.detachment)
    if (!m.has(k)) m.set(k, [])
    m.get(k).push(r)
  }
  return m
}
const detRules = byDet(detAbilities)
const detStrats = byDet(stratagems)
const detEnh = byDet(enhancements)

const q = (s) => JSON.stringify(s) // safe JS string literal
const missing = []
const blocks = []

for (const d of mfm.detachments) {
  const k = normName(d.name)
  const rules = detRules.get(k) || []
  const strats = detStrats.get(k) || []
  const enh = detEnh.get(k) || []
  if (!rules.length && !strats.length && !enh.length) {
    missing.push(d.name)
    continue
  }

  // Detachment rule: single ability → plain body; several → `### ` subsections.
  let ruleName, ruleFlavor, ruleBody
  if (rules.length === 1) {
    ruleName = rules[0].name
    ruleFlavor = htmlToMarkup(rules[0].legend)
    ruleBody = htmlToMarkup(rules[0].description)
  } else {
    ruleName = rules.map((r) => r.name).join(' & ')
    ruleFlavor = htmlToMarkup(rules[0]?.legend || '')
    ruleBody = rules.map((r) => `### ${r.name}\n${htmlToMarkup(r.description)}`).join('\n\n')
  }

  const stratBlocks = strats.map((s) => {
    const p = splitStrat(s.description)
    return `        {
          name: ${q(titleCase(s.name))},
          sublabel: ${q(s.type.replace(/\s*–\s*/, ' – '))},
          cp: ${q(`${s.cp_cost}CP`)},
          turn: ${q(turnOf(s.turn))},
          flavor: ${q(htmlToMarkup(s.legend))},
          when: ${q(p.when)},
          target: ${q(p.target)},
          effect: ${q(p.effect)},
          restrictions: ${q(p.restrictions)},
        },`
  })

  // Enhancement points come from the MFM (11ed), not Wahapedia's 10ed cost column.
  const mfmEnh = new Map(d.enhancements.map((e) => [normName(e.name), e]))
  const enhBlocks = enh.map((e) => {
    const isAura = /\(aura\)\s*$/i.test(e.name)
    const isUpgrade = /\(upgrade\)\s*$/i.test(e.name)
    const clean = e.name.replace(/\s*\((Aura|Upgrade)\)\s*$/i, '')
    const m = mfmEnh.get(normName(e.name))
    const pts = m ? m.points : null
    const ptsNote = m ? '' : ' // TODO: not in MFM — check the faction pack'
    const upg = m && /\(upgrade\)/i.test(m.name)
    return `        {
          name: ${q(clean)},
          points: ${pts ?? 0},${ptsNote}${isAura ? '\n          aura: true,' : ''}${isUpgrade || upg ? '\n          upgrade: true,' : ''}
          flavor: ${q(htmlToMarkup(e.legend))},
          body: ${q(htmlToMarkup(e.description))},
        },`
  })
  // MFM enhancements that Wahapedia doesn't have (renamed/new in 11ed) — flag them.
  const extraEnh = d.enhancements.filter((e) => !enh.some((w) => normName(w.name) === normName(e.name)))

  blocks.push(`    {
      id: ${q(slugify(d.name))},
      name: ${q(d.name)},
      source: 'codex', // TODO: set 'faction-pack' if this detachment comes from the pack
      dp: ${d.dp},
      forceDisposition: ${q(d.forceDisposition)},${d.unique ? `\n      unique: ${q(d.unique)},` : ''}
      rule: {
        name: ${q(ruleName)},
        flavor: ${q(ruleFlavor)},
        body: ${q(ruleBody)},
      },
      stratagems: [
${stratBlocks.join('\n')}
      ],
      enhancements: [
${enhBlocks.join('\n')}${extraEnh.length ? `\n        // TODO missing from Wahapedia (add from faction pack): ${extraEnh.map((e) => e.name).join(', ')}` : ''}
      ],
    },`)

  console.log(`  ✓ ${d.name}: ${rules.length} rule row(s), ${strats.length} stratagems, ${enh.length}/${d.enhancements.length} enhancements`)
}

const draft = `// DRAFT — generated by scripts/import-wahapedia.mjs from the Wahapedia CSV exports
// (10th-edition codex text). Before shipping:
//   1. Write the armyRule (not present in the CSV exports — see the faction page or codex).
//   2. Fold in the Faction-Pack "Rules Updates" (inline-comment each change).
//   3. Add detachments missing below (marked at end of file) from the faction pack text.
//   4. Review stratagem names' title-casing and keyword casing.
const en = {
  slug: ${q(slug)},
  name: ${q(mfm.name)},

  armyRule: {
    id: 'TODO',
    name: 'TODO',
    flavor: '',
    body: \`TODO\`,
  },

  detachments: [
${blocks.join('\n\n')}
  ],

  datasheets: [],
}

export const TODO_EXPORT = { en, ru: en }
${missing.length ? `\n// MISSING FROM WAHAPEDIA (transcribe from the faction pack):\n${missing.map((m) => `//   - ${m}`).join('\n')}\n` : ''}`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, draft)
console.log(`\nDraft written: ${path.relative(ROOT, outFile)}`)
if (missing.length) console.log(`Missing from Wahapedia (need pack transcription): ${missing.join(', ')}`)
