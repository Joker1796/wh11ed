// Full-TEXT reconciliation report against appdata canon — the layer `npm run sync` never covered.
//
// `sync-appdata.mjs` diffs entity NAMES and scalar fields (points, cp, dp) but not rule text, so
// wording drifted across app versions (e.g. Necrons "Timesplinter Mantle" changed entirely and no
// audit noticed). This tool compares the TEXT of name-matched pairs:
//
//   --datasheets   datasheet abilities (appdata type 'datasheet') — wh11ed abilities[].text
//   --factions     army-rule body · detachment rule body · stratagem when/target/effect/restrictions
//                  · enhancement body
//
// Comparison is SEMANTIC: both sides are normalized (appdata `<b>/<k>/<ul>` via appdataToMarkup;
// wh11ed glosses `[gloss:id:label]` → label, `**`/`__`/block markers stripped; quotes/dashes/case
// folded) so glosses and layout markup never count as differences — per policy the stored data
// keeps them. REPORT-ONLY: text fixes are applied by hand, bilingually (EN + RU), because RU must
// be authored to the project conventions (appdata is English-only).
//
// Usage:
//   node scripts/appdata-text-diff.mjs --datasheets [--faction slugs] [--full]
//   node scripts/appdata-text-diff.mjs --factions   [--faction slugs] [--full]
//
// Output: one line per mismatch with a similarity %, worst first; --full also prints both texts
// (appdata's already converted to wh11ed markup — ready to paste as the new EN).
import fs from 'node:fs'
import path from 'node:path'
import { APPDATA, ROOT, norm, appdataToMarkup, bodyText, loadModule } from './lib/sync-common.mjs'

const ALIAS = { 'space-marines': 'adeptus-astartes', 'chaos-space-marines': 'heretic-astartes' }
const args = process.argv.slice(2)
const MODE_DS = args.includes('--datasheets')
const MODE_FAC = args.includes('--factions')
const FULL = args.includes('--full')
// --apply-en (datasheets mode only): rewrite each mismatched ability's EN text in place with
// appdata's converted text — safe because datasheet files carry no gloss tokens (checked), so the
// converted markup IS the target wording verbatim. RU stays manual.
const APPLY_EN = args.includes('--apply-en')
// appdata flattens bullets to " ▪ " — restore wh11ed's newline-bullet form; normalize U+2010.
const toEnText = (s) => s.replace(/‐/g, '-').replace(/\s*▪ /g, '\n▪ ').replace(/^\n/, '')
const only = (() => {
  const i = args.indexOf('--faction')
  return i >= 0 && args[i + 1] ? new Set(args[i + 1].split(',')) : null
})()
if (!MODE_DS && !MODE_FAC) {
  console.log('usage: node scripts/appdata-text-diff.mjs --datasheets|--factions [--faction a,b] [--full]')
  process.exit(1)
}

// Semantic normalization — deliberately aggressive: anything that survives this and still differs
// is a real wording difference, not markup.
function sem(s) {
  return String(s || '')
    .replace(/\[gloss:[^:\]]+:([^\]]*)\]/g, '$1')
    .replace(/\[def:[^:\]]+:([^\]]*)\]/g, '$1')
    .replace(/\{(?:red|blue|green):([^}]*)\}/g, '$1')
    .replace(/\*\*|__|###/g, '')
    .replace(/[▪◆◈→•]/g, ' ')
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[-‐‑–—]/g, '-')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}"'+%/.\-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
// Dice coefficient over word arrays — same "overlap" idea sync-core uses for its report.
function similarity(a, b) {
  const wa = sem(a).split(' ').filter(Boolean)
  const wb = sem(b).split(' ').filter(Boolean)
  if (!wa.length && !wb.length) return 1
  const count = new Map()
  for (const w of wa) count.set(w, (count.get(w) || 0) + 1)
  let hit = 0
  for (const w of wb) { const c = count.get(w) || 0; if (c > 0) { hit++; count.set(w, c - 1) } }
  return (2 * hit) / (wa.length + wb.length)
}

const findings = [] // { where, sim, app, wh }
function compare(where, whText, appText) {
  if (sem(whText) === sem(appText)) return
  findings.push({ where, sim: similarity(whText, appText), app: appText, wh: whText })
}

const dsDir = path.join(ROOT, 'src', 'data', 'datasheets')
const facDir = path.join(ROOT, 'src', 'data', 'factions')
const slugs = fs.readdirSync(MODE_DS ? dsDir : facDir)
  .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))
  .map((f) => f.replace('.js', ''))

for (const slug of slugs) {
  if (only && !only.has(slug)) continue
  const appFile = path.join(APPDATA, 'factions', `${ALIAS[slug] || slug}.json`)
  if (!fs.existsSync(appFile)) continue
  const app = JSON.parse(fs.readFileSync(appFile, 'utf8'))

  if (MODE_DS) {
    const file = path.join(dsDir, `${slug}.js`)
    const mod = await loadModule(file)
    const units = Array.isArray(mod.default) ? mod.default : []
    const appDs = new Map((app.datasheets || []).map((d) => [norm(d.name), d]))
    let txt = APPLY_EN ? fs.readFileSync(file, 'utf8') : null
    let fileChanged = false
    for (const u of units) {
      const a = appDs.get(norm(u.name))
      if (!a) continue
      const appAb = new Map((a.abilities || []).filter((x) => x.type === 'datasheet').map((x) => [norm(x.name), x]))
      for (const ab of u.abilities || []) {
        const match = appAb.get(norm(ab.name))
        if (!match) continue // name presence is sync-appdata's job
        const appText = appdataToMarkup(match.rules) + (match.restriction ? ' ' + appdataToMarkup(match.restriction) : '')
        compare(`${slug} · ${u.name} · ability "${ab.name}"`, ab.text, appText)
        if (APPLY_EN && sem(ab.text) !== sem(appText)) {
          // Locate: datasheet-level name (4-space) → this ability's name → its "text" JSON string.
          const di = txt.indexOf(`    "name": ${JSON.stringify(u.name)}`)
          const ai = di >= 0 ? txt.indexOf(`"name": ${JSON.stringify(ab.name)}`, di) : -1
          const ti = ai >= 0 ? txt.indexOf('"text": ', ai) : -1
          if (ti < 0) { console.log(`  SKIP apply ${u.name}/${ab.name}: not located`); continue }
          const vs = ti + '"text": '.length
          let ve = vs + 1 // scan the JSON string for its unescaped closing quote
          while (ve < txt.length && !(txt[ve] === '"' && txt[ve - 1] !== '\\')) ve++
          const cur = JSON.parse(txt.slice(vs, ve + 1))
          if (sem(cur) !== sem(ab.text)) { console.log(`  SKIP apply ${u.name}/${ab.name}: file text unexpected`); continue }
          txt = txt.slice(0, vs) + JSON.stringify(toEnText(appText)) + txt.slice(ve + 1)
          fileChanged = true
        }
      }
    }
    if (APPLY_EN && fileChanged) fs.writeFileSync(file, txt)
  }

  if (MODE_FAC) {
    const mod = await loadModule(path.join(facDir, `${slug}.js`))
    const fac = (Object.values(mod).find((v) => v && v.en) || {}).en
    if (!fac) continue
    // Army rule: match by name among appdata's armyRules.
    if (fac.armyRule) {
      const appAr = (app.armyRules || []).find((r) => norm(r.name) === norm(fac.armyRule.name))
      if (appAr) compare(`${slug} · army rule "${fac.armyRule.name}"`, fac.armyRule.body, bodyText(appAr.body))
    }
    const appDet = new Map((app.detachments || []).map((d) => [norm(d.name), d]))
    for (const det of fac.detachments || []) {
      const a = appDet.get(norm(det.name))
      if (!a) continue
      if (det.rule) {
        const appRule = (a.rules || []).find((r) => norm(r.name) === norm(det.rule.name)) || (a.rules || [])[0]
        if (appRule) compare(`${slug} · ${det.name} · rule "${det.rule.name}"`, det.rule.body, bodyText(appRule.body))
      }
      const appStrat = new Map((a.stratagems || []).map((s) => [norm(s.name), s]))
      for (const st of det.stratagems || []) {
        const as = appStrat.get(norm(st.name))
        if (!as) continue
        compare(
          `${slug} · ${det.name} · stratagem "${st.name}"`,
          [st.when, st.target, st.effect, st.restrictions].filter(Boolean).join(' '),
          [as.when, as.target, as.effect, as.restriction].filter(Boolean).map(appdataToMarkup).join(' '),
        )
      }
      const appEnh = new Map((a.enhancements || []).map((e) => [norm(e.name), e]))
      for (const en of det.enhancements || []) {
        const ae = appEnh.get(norm(en.name))
        if (!ae) continue
        compare(`${slug} · ${det.name} · enhancement "${en.name}"`, en.body, appdataToMarkup(ae.rules))
      }
    }
  }
}

findings.sort((x, y) => x.sim - y.sim)
for (const f of findings) {
  console.log(`~ ${(f.sim * 100).toFixed(0).padStart(3)}%  ${f.where}`)
  if (FULL) {
    console.log(`    appdata: ${f.app}`)
    console.log(`    wh11ed:  ${f.wh}\n`)
  }
}
console.log(`\n${findings.length} text mismatch(es).`)
