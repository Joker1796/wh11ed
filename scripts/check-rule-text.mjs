#!/usr/bin/env node
// Faction rule text — the gate. `npm run ruletext`. Exits non-zero.
//
// Two questions, both of which slipped past the rest of the audit (hub journal
// 2026-10-06-rule-text-app-parity.md: a "KEYWORDS" paragraph was dropped from a Death Guard
// detachment's English in July and stayed in the Russian until a player's eye found it):
//
//   1. Does our ENGLISH rule text still read as the GW app prints it? sync-faction-text compares
//      every army rule, detachment rule, enhancement and stratagem with wh40k-appdata; every
//      difference we keep on purpose is recorded with its reason in scripts/lib/sync-baseline.json
//      (the same baseline `npm run sync` reads). A difference that is not recorded fails here —
//      `npm run sync` only prints it. What the app applies as data rather than prints (keyword
//      grants, restrictions, who the bearer can lead, an enhancement's weapon) is not in the rule
//      text at all: it lives in src/data/factions/extras/<slug>.js and is drawn in its own plate.
//   2. Does the RUSSIAN say it in the same shape? For every prose field the overlay translates,
//      the same number of paragraphs as the English, the same lore lines ("> …") — and every
//      extras entry has both languages with the same number of lines. A paragraph added or removed
//      on one side only is exactly how the two drifted apart.
//
// Skipped (with a line saying so) when wh40k-appdata is not cloned beside this repo: question 1
// needs it, question 2 still runs.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, loadModule } from './lib/sync-common.mjs'
import { applyBaseline, loadBaseline } from './lib/sync-baseline.mjs'
import { deepOverlay } from '../src/data/deepOverlay.js'

const slugs = fs.readdirSync(path.join(ROOT, 'src/data/factions'))
  .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.includes('.test.'))
  .map((f) => f.replace(/\.js$/, ''))
let failed = 0

// ── 1. English ↔ the app ─────────────────────────────────────────────────────────────────────
if (fs.existsSync(APPDATA)) {
  const { run } = await import('./sync-faction-text.mjs')
  const lines = []
  const log = console.log
  console.log = (...a) => lines.push(a.join(' '))
  try { await run(['--all']) } finally { console.log = log }
  const { kept, suppressed } = applyBaseline(lines.flatMap((l) => l.split('\n')), loadBaseline())
  const fresh = kept.filter((l) => /^\s{0,4}[~+\-?]\s/.test(l))
  if (fresh.length) {
    failed += fresh.length
    console.log(`✗ ${fresh.length} rule text(s) differ from the GW app and are not in scripts/lib/sync-baseline.json:\n`)
    console.log(kept.filter((l) => l.trim()).join('\n'))
    console.log('\n  Make our English read as the app prints it; or, for a difference we keep on purpose, record it')
    console.log('  with its reason (`npm run sync -- --baseline`, then write the reason). What the app applies as data')
    console.log('  goes to src/data/factions/extras/<slug>.js, not into the rule text.')
  } else {
    console.log(`✓ rule text = the GW app (${suppressed} recorded difference(s) kept on purpose)`)
  }
} else {
  console.log('ruletext: wh40k-appdata not found next to this repo — the app comparison is skipped.')
}

// ── 2. English ↔ Russian, by shape ───────────────────────────────────────────────────────────
const paras = (s) => String(s || '').split(/\n\s*\n/).filter((x) => x.trim())
const lore = (s) => String(s || '').split('\n').map((l, i) => (l.startsWith('> ') ? i : -1)).filter((i) => i >= 0).join(',')
const shapeIssues = []
let pairs = 0
function same(where, en, ru) {
  if (typeof en !== 'string' || typeof ru !== 'string' || en === ru) return
  pairs++
  if (paras(en).length !== paras(ru).length) shapeIssues.push(`${where}: ${paras(en).length} paragraph(s) in EN, ${paras(ru).length} in RU`)
  else if (lore(en) !== lore(ru)) shapeIssues.push(`${where}: lore lines ("> ") at ${lore(en) || 'none'} in EN, ${lore(ru) || 'none'} in RU`)
}
for (const slug of slugs) {
  const en = Object.values(await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`)) || {})[0]?.en
  const ruMod = await loadModule(path.join(ROOT, 'src/data/factions/ru', `${slug}.js`))
  if (!en) continue
  if (ruMod?.default) {
    const ru = deepOverlay(en, ruMod.default)
    same(`${slug} army rule`, en.armyRule?.body, ru.armyRule?.body)
    ;(en.detachments || []).forEach((d, i) => {
      const r = ru.detachments?.[i]
      if (!r) return
      same(`${slug} "${d.name}" rule`, d.rule?.body, r.rule?.body)
      ;(d.enhancements || []).forEach((e, j) => same(`${slug} "${d.name}" enhancement "${e.name}"`, e.body, r.enhancements?.[j]?.body))
      ;(d.stratagems || []).forEach((s, j) => {
        for (const k of ['when', 'target', 'effect', 'restrictions']) same(`${slug} "${d.name}" stratagem "${s.name}" ${k}`, s[k], r.stratagems?.[j]?.[k])
      })
    })
  }
  const extras = (await loadModule(path.join(ROOT, 'src/data/factions/extras', `${slug}.js`)))?.default || {}
  for (const [key, items] of Object.entries(extras)) {
    items.forEach((x, i) => {
      if (!x.en || !x.ru) shapeIssues.push(`${slug} extras ${key}[${i}]: needs both "en" and "ru"`)
      else if (x.en.split('\n').length !== x.ru.split('\n').length) shapeIssues.push(`${slug} extras ${key}[${i}]: ${x.en.split('\n').length} line(s) in EN, ${x.ru.split('\n').length} in RU`)
    })
    const [, detId, enhName] = key.match(/^(?:det|enh):([^:]+)(?::(.+))?$/) || []
    const det = (en.detachments || []).find((d) => d.id === detId)
    if (!det || (enhName && !(det.enhancements || []).some((e) => e.name === enhName))) shapeIssues.push(`${slug} extras ${key}: names no detachment/enhancement of ours`)
  }
}
if (shapeIssues.length) {
  failed += shapeIssues.length
  console.log(`✗ ${shapeIssues.length} EN↔RU shape issue(s) in faction rule text:\n  ${shapeIssues.join('\n  ')}`)
} else {
  console.log(`✓ EN↔RU: ${pairs} translated rule text(s), same paragraphs and lore lines; extras in both languages`)
}
process.exit(failed ? 1 : 0)
