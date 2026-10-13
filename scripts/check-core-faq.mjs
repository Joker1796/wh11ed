#!/usr/bin/env node
// GATE: every Core Rules FAQ and errata entry appdata carries (tables/faq.json, the Core Rules
// publication) is on our Reference page (src/data/reference.js → faqs / errata).
//
// Why this exists. `sync-core` compares the rule PROSE and deliberately strips FAQ blocks out of
// both sides — the app keeps its FAQs apart — and `companions` reads only the Event Companion
// PDFs. So the Core Rules FAQ was compared by nothing: the 26/08/2026 update added 17 answers
// ("When do the effects of a FLYING unit taking to the skies apply?" among them) and a player
// found them missing seven weeks later (2026-10-13).
//
// Matching is by wording, not identity: our entries are transcribed with tidier punctuation than
// appdata's ("worse then 6", "1 MW per fail"), so an appdata entry is matched to ours by the share
// of its words ours carries, one to one — two appdata questions answered "Yes." must not both land
// on one of ours. A question we print that appdata does not is a note, not a failure (GW can drop
// an answer; whether to drop ours is a decision). The words compared are the question AND the
// answer, so a question whose answer GW rewrote shows up as a weaker match in --verbose.
//
// Usage: npm run corefaq            # check
//        npm run corefaq -- --verbose   # print every match with its score
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT, loadModule, table } from './lib/sync-common.mjs'

const CORE_RULES = 'Core Rules'
const MIN = 0.6

/** @param {string} s */
const words = (s) => new Set(String(s || '').replace(/<[^>]+>|\*\*|__/g, '').toLowerCase().replace(/[’']/g, '')
  .replace(/[^a-z0-9]+/g, ' ').split(' ').filter((w) => w.length > 2))
/** @param {Set<string>} a @param {Set<string>} b */
const overlap = (a, b) => { let n = 0; for (const w of a) if (b.has(w)) n++; return n / Math.max(1, Math.min(a.size, b.size)) }
const plain = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

// Pair every appdata entry with one of ours, best scores first, each side used once.
function pair(app, ours, label, verbose) {
  const scores = []
  app.forEach((a, i) => ours.forEach((o, j) => scores.push([overlap(a.w, o.w), i, j])))
  scores.sort((x, y) => y[0] - x[0])
  const usedA = new Set(); const usedO = new Set(); const best = new Map()
  for (const [s, i, j] of scores) {
    if (s < MIN || usedA.has(i) || usedO.has(j)) continue
    usedA.add(i); usedO.add(j); best.set(i, [s, j])
  }
  const missing = app.filter((_, i) => !best.has(i))
  const extra = ours.filter((_, j) => !usedO.has(j))
  if (verbose) for (const [i, [s, j]] of best) console.log(`  ${s.toFixed(2)}  ${app[i].label.slice(0, 70)}  ~ ${ours[j].label.slice(0, 50)}`)
  console.log(`${label}: ${app.length} in appdata, ${best.size} matched, ${missing.length} missing, ${extra.length} ours only`)
  for (const m of missing) console.log(`  ✗ missing: ${m.label}`)
  for (const e of extra) console.log(`  · ours only: ${e.label}`)
  return missing.length
}

export async function run(args = process.argv.slice(2)) {
  const verbose = args.includes('--verbose')
  const pub = table('publication.json').find((p) => (p.localisations?.en?.name || p.name) === CORE_RULES)
  if (!pub) {
    console.error(`✗ no "${CORE_RULES}" publication in ${APPDATA}/tables/publication.json`)
    return 1
  }
  const rows = table('faq.json').filter((r) => r.publicationId === pub.id).map((r) => r.localisations?.en || {})
  const { faqs, errata } = await loadModule(path.join(ROOT, 'src/data/reference.js'))

  const appQ = rows.filter((r) => r.question).map((r) => ({ label: plain(r.question), w: words(`${r.question} ${r.answer}`) }))
  const ourQ = faqs.en.map((f) => ({ label: plain(f.q), w: words(`${f.q} ${f.a}`) }))
  const appE = rows.filter((r) => !r.question).map((r) => ({ label: plain(r.errataHeader), w: words(`${r.errataHeader} ${r.errataText}`) }))
  const ourE = errata.en.map((e) => ({ label: plain(e.header), w: words(`${e.header} ${e.body}`) }))

  const failed = pair(appQ, ourQ, 'Core Rules FAQ', verbose) + pair(appE, ourE, 'Core Rules errata', verbose)
  if (faqs.en.length !== faqs.ru.length || errata.en.length !== errata.ru.length) {
    console.log(`✗ EN/RU counts differ: faqs ${faqs.en.length}/${faqs.ru.length}, errata ${errata.en.length}/${errata.ru.length}`)
    return 1
  }
  if (failed) {
    console.log('\nAdd each missing entry to src/data/reference.js, EN and RU (hub skill ru-translate).')
    return 1
  }
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
