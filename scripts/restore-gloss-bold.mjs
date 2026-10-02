// restore-gloss-bold.mjs — put back the bold the canon gives a game term, where our hand-written
// prose dropped it AND the glossary knows the term, so `npm run gloss` can make it a popover.
//
//   node scripts/restore-gloss-bold.mjs            # report what it would mark, write nothing
//   node scripts/restore-gloss-bold.mjs --show     # …and print each term it would mark, EN ⇄ RU
//   node scripts/restore-gloss-bold.mjs --write    # mark EN and RU, then run `npm run gloss`
//
// Why (owner, 2026-09-30): glossary popovers in every faction, "as GW does" — only where appdata
// bolds the term. Space Marines and Orks are generated from appdata and carry its bold; the other
// factions' prose was typed by hand and carries almost none, so the gloss pass had nothing to link.
// This is the emphasis gate's class C (check-emphasis.mjs `collect().Cspans`: a span the canon
// bolds, our sentence contains, and nothing of ours marks), narrowed to the spans the glossary
// resolves.
//
// EN and RU move together or not at all — `npm run parity` holds the two sides to the same markers,
// and a popover on one side only is a desync. The RU twin of an EN string is the pair `parity` itself
// checks (PARITY_PAIRS_OUT); the Russian wording of the term comes from gloss-bold-terms' RU_FORMS.
// A string is marked only when:
//   • its pair agrees on the ALL-CAPS keywords and the numbers (a pair that does not is mis-paired);
//   • the term occurs as many times in RU (in a known form) as in EN, outside any existing markup;
//   • both strings are a literal of a data file, verbatim (an interpolated body is left alone).
// Everything else is reported and left as it was, on both sides.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { collect } from './check-emphasis.mjs'
import { prime, glossString, RU_FORMS, literals, cook, raw } from './gloss-bold-terms.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const WRITE = process.argv.includes('--write')

// The EN → RU pairs `parity` checks, by EN text. An EN string with two different RU twins is
// ambiguous and skipped.
function pairsByEn() {
  const out = path.join(os.tmpdir(), `parity-pairs-${process.pid}.json`)
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/parity-check.mjs')], { env: { ...process.env, PARITY_PAIRS_OUT: out }, stdio: 'ignore' })
  } catch { /* parity's own exit code is not ours; the pairs are written either way */ }
  const map = new Map()
  for (const [, en, ru] of JSON.parse(fs.readFileSync(out, 'utf8'))) {
    if (!map.has(en)) map.set(en, new Set())
    map.get(en).add(ru)
  }
  fs.rmSync(out, { force: true })
  return map
}

// The same string with every existing marking blanked out, length kept — a match inside one is not
// a free occurrence of the term.
const MARKUP = /\*\*[\s\S]*?\*\*|__[\s\S]*?__|\[[^\]]*\]/g
const masked = (s) => s.replace(MARKUP, (m) => ' '.repeat(m.length))

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const enRe = (text) => new RegExp(`(?<![\\p{L}\\d])${esc(text).replace(/\s+/g, '\\s+')}(?![\\p{L}\\d])`, 'giu')
// A RU_FORMS entry is anchored for a whole span; inside a sentence it is bounded by letters instead.
const ruRe = (re) => new RegExp(`(?<!\\p{L})(?:${re.source.replace(/^\^/, '').replace(/\$$/, '').replace(/\$\|\^/g, '|')})(?!\\p{L})`, 'giu')

const caps = (s) => (s.replace(MARKUP, (m) => m.replace(/^\*\*|\*\*$/g, '')).match(/\b[A-Z][A-Z'’-]{2,}\b/g) || []).sort().join(' ')
const nums = (s) => (s.match(/\d+/g) || []).sort().join(' ')

// Every match of `re` in `s` outside markup, as [start, end], trailing punctuation trimmed.
function hits(s, res) {
  const m = masked(s)
  const out = []
  for (const re of res) {
    for (const x of m.matchAll(re)) {
      const t = x[0].replace(/[.,;:!?)»"]+$/, '')
      if (!out.some(([a, b]) => x.index < b && a < x.index + t.length)) out.push([x.index, x.index + t.length])
    }
  }
  return out.sort((a, b) => a[0] - b[0])
}
const wrap = (s, spans) => spans.reduceRight((acc, [a, b]) => `${acc.slice(0, a)}**${acc.slice(a, b)}**${acc.slice(b)}`, s)

await prime()
const idOf = (t) => (glossString(`**${t}**`, 'en')[0].match(/\[gloss:([a-z0-9-]+):/) || [])[1] || null
const ruOf = pairsByEn()
const { Cspans } = await collect()

const report = { spans: Cspans.length, glossary: 0, marked: 0, skipped: {} }
const skip = (why) => { report.skipped[why] = (report.skipped[why] || 0) + 1 }
const edits = new Map() // old EN → { en, ru: oldRu, ruNew }

for (const c of Cspans) {
  const id = idOf(c.text)
  if (!id) continue
  report.glossary++
  // A slash list ("eligible to shoot/declare a charge") is one span in EN and two phrases in RU;
  // a RU form matches only one of them, which would mark half the list.
  if (c.text.includes('/')) { skip('slash list'); continue }
  const rus = ruOf.get(c.whText)
  if (!rus || rus.size !== 1) { skip(rus ? 'two RU twins' : 'no RU twin'); continue }
  const prev = edits.get(c.whText)
  const en = prev?.en ?? c.whText
  const ru = prev?.ruNew ?? [...rus][0]
  if (caps(c.whText) !== caps([...rus][0]) || nums(c.whText) !== nums([...rus][0])) { skip('pair disagrees on keywords/numbers'); continue }
  const enSpans = hits(en, [enRe(c.text)])
  const forms = RU_FORMS.filter(([, i]) => i === id).map(([re]) => ruRe(re))
  const ruSpans = hits(ru, forms)
  if (!enSpans.length) { skip('EN wording differs'); continue }
  if (!ruSpans.length) { skip('no RU form'); continue }
  if (enSpans.length !== ruSpans.length) { skip('EN and RU counts differ'); continue }
  const added = [...(prev?.added || []), [enSpans.map(([a, b]) => en.slice(a, b)), ruSpans.map(([a, b]) => ru.slice(a, b))]]
  edits.set(c.whText, { en: wrap(en, enSpans), ru: [...rus][0], ruNew: wrap(ru, ruSpans), added })
  report.marked++
}

// Write: every data-file literal whose text is an old string gets the new one. A pair is written
// only when BOTH sides were found.
const dataFiles = []
for (const dir of ['src/data/factions', 'src/data/datasheets']) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.js') && !e.name.endsWith('.test.js')) dataFiles.push(p)
  })
  walk(path.join(ROOT, dir))
}
const sources = new Map(dataFiles.map((f) => [f, fs.readFileSync(f, 'utf8')]))
const where = new Map() // text → [file, …]
for (const [f, src] of sources) {
  for (const lit of literals(src)) {
    if (lit.holes.length) continue
    const t = cook(lit.parts[0])
    if (!where.has(t)) where.set(t, new Set())
    where.get(t).add(f)
  }
}
const ready = [...edits].filter(([oldEn, e]) => {
  if (where.has(oldEn) && where.has(e.ru)) return true
  skip('not a verbatim literal')
  report.marked--
  return false
})

// --show: what each pair gets marked, EN beside RU, for reading before --write.
if (process.argv.includes('--show')) {
  for (const [, e] of ready) for (const [en, ru] of e.added) console.log(`${en.join(' | ')}  ⇄  ${ru.join(' | ')}`)
}

if (WRITE) {
  const swap = new Map()
  for (const [oldEn, e] of ready) { swap.set(oldEn, e.en); swap.set(e.ru, e.ruNew) }
  for (const [f, src] of sources) {
    let out = ''
    let at = 0
    let n = 0
    for (const lit of literals(src)) {
      if (lit.holes.length) continue
      const next = swap.get(cook(lit.parts[0]))
      if (next === undefined) continue
      out += src.slice(at, lit.start) + lit.quote + raw(next, lit.quote) + lit.quote
      at = lit.end
      n++
    }
    if (n) fs.writeFileSync(f, out + src.slice(at))
  }
}

console.log(`restore-gloss-bold: ${report.spans} class-C span(s), ${report.glossary} the glossary knows, ${report.marked} ${WRITE ? 'marked' : 'markable'} in EN and RU`)
for (const [why, n] of Object.entries(report.skipped).sort((a, b) => b[1] - a[1])) console.log(`  left alone — ${why}: ${n}`)
if (WRITE && report.marked) console.log('  next: `npm run gloss`, then `npm run parity` and `npm run emphasis`')
