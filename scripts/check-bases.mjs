// GATE: base sizes against wh40k-appdata (`npm run bases`). The lists it holds and why they
// exist: scripts/lib/model-bases.mjs. Fails on:
//   - a datasheet whose `baseSize` is not appdata's (lines and model names kept), or that has one
//     where appdata has none and GUIDE_ONLY does not say where it came from;
//   - a profile carrying a size no MODEL_BASES entry gives it — the July back-fill handed a unit's
//     one size to every profile, Pink Horrors' 25mm Blue and Brimstone Horrors included;
//   - a MODEL_BASES entry whose evidence (an appdata datasheet of that model at that size) is
//     gone, or whose unit appdata now sizes per model itself, or that no datasheet applies;
//   - a model the scan finds on another base elsewhere, decided in neither MODEL_BASES nor
//     SAME_AS_UNIT — so an appdata update that brings one waits for a person — and an entry of
//     either that the scan no longer finds.
import fs from 'node:fs'
import path from 'node:path'
import { APPDATA, ROOT, loadJson, loadModule } from './lib/sync-common.mjs'
import { MODEL_BASES, SAME_AS_UNIT, GUIDE_ONLY, baseOf } from './lib/model-bases.mjs'

const tables = path.join(APPDATA, 'tables')
const sheets = loadJson(path.join(tables, 'datasheet.json'))
const minis = loadJson(path.join(tables, 'miniature.json'))
if (!sheets || !minis) {
  console.error(`bases: wh40k-appdata not found at ${APPDATA}`)
  process.exit(1)
}
const en = (r) => r.localisations?.en || {}
const appById = new Map(sheets.map((d) => [d.id, d]))
const modelsOf = new Map()
for (const m of minis) {
  if (!modelsOf.has(m.datasheetId)) modelsOf.set(m.datasheetId, new Set())
  modelsOf.get(m.datasheetId).add(en(m).name)
}
const fold = (s) => String(s || '').toLowerCase().replace(/\s+/g, '')
const single = (raw) => /^[\d.]+\s*mm$/i.test(baseOf(raw))
const live = sheets.filter((d) => !d.isLegends)
const sheetsNamed = (name) => live.filter((d) => en(d).name === name)

const fails = []
const fail = (msg) => fails.push(msg)

// ── Our datasheets against theirs ──
const sourceIds = loadJson(path.join(ROOT, 'src/data/sourceIds.json')) || {}
const applied = new Set() // "sheet|model" of MODEL_BASES entries some datasheet prints
const guideSeen = new Set()
const dsDir = path.join(ROOT, 'src/data/datasheets')
for (const file of fs.readdirSync(dsDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.includes('.test.'))) {
  const slug = file.replace(/\.js$/, '')
  const ours = (await loadModule(path.join(dsDir, file)))?.default || []
  for (const d of ours) {
    const app = appById.get(sourceIds[slug]?.[`ds:${d.id}`])
    if (!app) continue // a Faction Pack Legends sheet, or one appdata does not carry
    const want = baseOf(en(app).baseSize)
    const name = en(app).name
    if (!want) {
      if (d.baseSize && !GUIDE_ONLY.includes(name)) fail(`${slug} "${d.name}": baseSize ${JSON.stringify(d.baseSize)} where appdata has none — add it to GUIDE_ONLY with its source, or drop it`)
      if (d.baseSize) guideSeen.add(name)
    } else if (d.baseSize !== want) {
      fail(`${slug} "${d.name}": baseSize ${JSON.stringify(d.baseSize ?? null)}, appdata ${JSON.stringify(want)}`)
    }
    for (const p of d.profiles || []) {
      if (!p.baseSize) continue
      const entry = MODEL_BASES.find((e) => e.sheet === name && fold(e.model) === fold(p.name))
      if (!entry) fail(`${slug} "${d.name}" profile "${p.name}": baseSize ${JSON.stringify(p.baseSize)} with no MODEL_BASES entry — appdata sizes the unit, not the model`)
      else if (fold(entry.size) !== fold(p.baseSize)) fail(`${slug} "${d.name}" profile "${p.name}": baseSize ${JSON.stringify(p.baseSize)}, MODEL_BASES says ${entry.size}`)
      else applied.add(`${entry.sheet}|${entry.model}`)
    }
    for (const e of MODEL_BASES.filter((x) => x.sheet === name)) {
      if (!(d.profiles || []).some((p) => fold(p.name) === fold(e.model))) fail(`${slug} "${d.name}": no profile "${e.model}" for its MODEL_BASES entry`)
    }
  }
}
for (const name of GUIDE_ONLY) {
  if (!guideSeen.has(name)) fail(`GUIDE_ONLY "${name}": no datasheet prints a guide size for it any more (appdata gives one, or it is gone) — remove it`)
}

// ── Each MODEL_BASES entry's evidence ──
for (const e of MODEL_BASES) {
  const key = `${e.sheet}|${e.model}`
  const units = sheetsNamed(e.sheet)
  if (!units.length) fail(`MODEL_BASES ${key}: appdata has no datasheet "${e.sheet}"`)
  for (const u of units) {
    if (!single(en(u).baseSize)) fail(`MODEL_BASES ${key}: appdata now sizes "${e.sheet}" per model (${JSON.stringify(baseOf(en(u).baseSize))}) — the entry is redundant, drop it`)
    if (!modelsOf.get(u.id)?.has(e.model)) fail(`MODEL_BASES ${key}: "${e.sheet}" has no model "${e.model}" in appdata`)
  }
  const from = sheetsNamed(e.from)
  if (!from.length) fail(`MODEL_BASES ${key}: its evidence "${e.from}" is gone from appdata`)
  for (const f of from) {
    if (!modelsOf.get(f.id)?.has(e.model)) fail(`MODEL_BASES ${key}: its evidence "${e.from}" no longer has the model "${e.model}"`)
    if (fold(baseOf(en(f).baseSize)) !== fold(e.size)) fail(`MODEL_BASES ${key}: its evidence "${e.from}" is now ${JSON.stringify(baseOf(en(f).baseSize))}, not ${e.size}`)
  }
  if (!applied.has(key)) fail(`MODEL_BASES ${key}: no datasheet prints it on the profile`)
}

// ── The scan: a model of a one-size unit that stands on another base in another datasheet ──
const elsewhere = new Map() // model → Set of "<sheet>@<size>"
for (const d of live) {
  if (!single(en(d).baseSize)) continue
  for (const m of modelsOf.get(d.id) || []) {
    if (!elsewhere.has(m)) elsewhere.set(m, new Set())
    elsewhere.get(m).add(`${en(d).name}@${fold(baseOf(en(d).baseSize))}`)
  }
}
const found = new Set()
for (const d of live) {
  const models = modelsOf.get(d.id) || new Set()
  if (!single(en(d).baseSize) || models.size < 2) continue
  const size = fold(baseOf(en(d).baseSize))
  for (const m of models) {
    const other = [...(elsewhere.get(m) || [])].filter((x) => !x.startsWith(`${en(d).name}@`) && !x.endsWith(`@${size}`))
    if (!other.length) continue
    const key = `${en(d).name}|${m}`
    found.add(key)
    const decided = MODEL_BASES.some((e) => `${e.sheet}|${e.model}` === key) || SAME_AS_UNIT.some((e) => `${e.sheet}|${e.model}` === key)
    if (!decided) fail(`scan: "${m}" in "${en(d).name}" (${size}) stands on another base in ${other.join(', ')} — decide it: MODEL_BASES (its own size, with the evidence) or SAME_AS_UNIT (with why)`)
  }
}
for (const e of SAME_AS_UNIT) {
  if (!found.has(`${e.sheet}|${e.model}`)) fail(`SAME_AS_UNIT ${e.sheet}|${e.model}: the scan no longer finds it — remove it`)
}

if (fails.length) {
  console.error(`bases: ${fails.length} problem(s)\n  ${fails.join('\n  ')}`)
  process.exit(1)
}
console.log(`bases: ok — ${MODEL_BASES.length} model sizes, ${SAME_AS_UNIT.length} decided as the unit's, ${GUIDE_ONLY.length} from the guide`)
