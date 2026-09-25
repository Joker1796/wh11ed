#!/usr/bin/env node
// Guards against shared UI primitives being copy-pasted between components.
//
// Scoped styles do not cross a component boundary, so the tempting fix for "these two screens
// need the same button" is to paste the rule into both. Do that a few times and the copies drift:
// before 2026-08-25 `.btn-primary` lived in ten files with five different paddings, three font
// sizes and two weights, and `.modal-head` in twelve with four private variants — all of them
// nominally one thing. What is genuinely shared belongs in style.css (see "Buttons", "Modal
// chrome", "Segmented control", …); what is genuinely per-screen stays scoped and overrides it.
//
// This check fails when one rule body appears verbatim in THRESHOLD or more components. Run by
// `npm run dupes`.
//
// The threshold was 3 until 2026-09-25, and nearly every duplicate the component audit found that
// day was a PAIR — two screens that copied each other and then drifted (a badge that never learned
// the warning colour, a subnav whose labels shifted by one). So it is 2 now, with the pairs that
// existed then recorded in scripts/lib/css-dupes-baseline.json: a new pair fails, and so does a
// third copy of a recorded one. `npm run dupes -- --baseline` re-records it — read the diff before
// committing it; a line leaving the file is a pair someone merged, a line arriving is a new copy.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const THRESHOLD = 2
const BASELINE = 'scripts/lib/css-dupes-baseline.json'
const recording = process.argv.includes('--baseline')

// Blocks that are legitimately repeated.
const IGNORE = [
  /^[^{]*\{\s*[^;{}]+;?\s*\}$/,   // one-declaration rules — too small to be a shared primitive

  // A page hero is page IDENTITY, not a shared control: the landing page sets its title at
  // 3.74rem, a faction at 3rem, the changelog at 2rem, and those differences are the point. The
  // four plain index pages happening to agree is a coincidence, not a contract — making it one
  // would mean a global with half a dozen per-page exceptions, which is worse than the copies.
  /^\.hero(-title|-desc|-subtitle)?\s*\{/,
]

const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (name.endsWith('.vue')) files.push(p)
  }
})('src')

const seen = new Map()
for (const p of files) {
  const src = readFileSync(p, 'utf8')
  const style = src.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || []
  for (const block of style) {
    for (const m of block.matchAll(/^\.([\w-][^{}\n]*)\{([^{}]*)\}/gm)) {
      const rule = `.${m[1].trim()} {${m[2].replace(/\s+/g, ' ')}}`
      if (IGNORE.some((re) => re.test(rule))) continue
      if (!seen.has(rule)) seen.set(rule, new Set())
      seen.get(rule).add(relative('.', p))
    }
  }
}

const dupes = [...seen].filter(([, where]) => where.size >= THRESHOLD)
  .sort((a, b) => b[1].size - a[1].size || (a[0] < b[0] ? -1 : 1))

if (recording) {
  const out = {}
  for (const [rule, where] of dupes) out[rule] = [...where].sort()
  writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n')
  console.log(`✓ css: recorded ${dupes.length} accepted duplicate(s) in ${BASELINE}`)
  process.exit(0)
}

let accepted = {}
try { accepted = JSON.parse(readFileSync(BASELINE, 'utf8')) } catch { /* no baseline: everything counts */ }
// A recorded rule stays accepted only while it is in no file it was not recorded in.
const offenders = dupes.filter(([rule, where]) => {
  const known = accepted[rule]
  return !known || [...where].some((f) => !known.includes(f))
})
const stale = Object.keys(accepted).filter((rule) => !dupes.some(([r]) => r === rule))

if (offenders.length) {
  console.error(`✗ ${offenders.length} rule(s) copied into ${THRESHOLD}+ components:\n`)
  for (const [rule, where] of offenders) {
    console.error(`  ${where.size}x  ${rule.slice(0, 110)}`)
    console.error(`      ${[...where].join(', ')}\n`)
  }
  console.error('Move what is shared into src/style.css and leave only the differences scoped.')
  process.exit(1)
}
const note = stale.length ? ` (${stale.length} recorded one(s) gone — re-record with --baseline)` : ''
console.log(`✓ css: no new rule body copied into ${THRESHOLD}+ components; ${dupes.length} recorded${note}`)
