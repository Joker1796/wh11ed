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
    .replace(/(?<![\p{L}\p{N}])'|'(?![\p{L}\p{N}])/gu, '') // quote marks (keeps in-word apostrophes)
    .replace(/\.(?=\s|$)/g, '') // sentence-final periods — punctuation, not wording (keeps decimals)
    .replace(/(?<=\p{L})\.(?=\p{L})/gu, ' ') // missing space after a period ("phase.just") — appdata artifact
    .replace(/\s+/g, ' ')
    .replace(/\s*\/\s*/g, '/') // stray spaces around "/" in slashed keyword pairs
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
    const mod = await loadModule(path.join(dsDir, `${slug}.js`))
    const units = Array.isArray(mod.default) ? mod.default : []
    const appDs = new Map((app.datasheets || []).map((d) => [norm(d.name), d]))
    for (const u of units) {
      const a = appDs.get(norm(u.name))
      if (!a) continue
      const appAb = new Map((a.abilities || []).filter((x) => x.type === 'datasheet').map((x) => [norm(x.name), x]))
      for (const ab of u.abilities || []) {
        const match = appAb.get(norm(ab.name))
        if (!match) continue // name presence is sync-appdata's job
        const appText = appdataToMarkup(match.rules) + (match.restriction ? ' ' + appdataToMarkup(match.restriction) : '')
        compare(`${slug} · ${u.name} · ability "${ab.name}"`, ab.text, appText)
      }
    }
  }

  if (MODE_FAC) {
    const mod = await loadModule(path.join(facDir, `${slug}.js`))
    const fac = (Object.values(mod).find((v) => v && v.en) || {}).en
    if (!fac) continue
    // Army rule: wh11ed sometimes folds all army rules into one body (### headings), so accept a
    // match against either the same-named appdata rule alone or all of them joined (name + body).
    if (fac.armyRule) {
      // appdata sometimes lists the same army rule twice — dedupe by name for the joined candidate.
      const seen = new Set()
      const ars = (app.armyRules || []).filter((r) => !seen.has(norm(r.name)) && seen.add(norm(r.name)))
      const appAr = ars.find((r) => norm(r.name) === norm(fac.armyRule.name))
      const candidates = [
        appAr && bodyText(appAr.body),
        ars.length > 1 && ars.map((r) => `${r.name}\n${bodyText(r.body)}`).join('\n'),
      ].filter(Boolean)
      if (candidates.length && !candidates.some((c) => sem(c) === sem(fac.armyRule.body))) {
        const best = candidates
          .map((c) => [similarity(fac.armyRule.body, c), c])
          .sort((x, y) => y[0] - x[0])[0][1]
        compare(`${slug} · army rule "${fac.armyRule.name}"`, fac.armyRule.body, best)
      }
    }
    const appDet = new Map((app.detachments || []).map((d) => [norm(d.name), d]))
    for (const det of fac.detachments || []) {
      const a = appDet.get(norm(det.name))
      if (!a) continue
      if (det.rule) {
        // wh11ed folds a det's rules into one body ("Rule A & Rule B" with ### headings), so when
        // no single appdata rule matches by name, compare against all of them joined (name + body).
        const appRule = (a.rules || []).find((r) => norm(r.name) === norm(det.rule.name))
        const appText = appRule
          ? bodyText(appRule.body)
          : (a.rules || []).map((r) => `${r.name}\n${bodyText(r.body)}`).join('\n')
        if (appText) compare(`${slug} · ${det.name} · rule "${det.rule.name}"`, det.rule.body, appText)
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
