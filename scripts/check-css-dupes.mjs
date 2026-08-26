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
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const THRESHOLD = 3

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

const offenders = [...seen].filter(([, where]) => where.size >= THRESHOLD)
  .sort((a, b) => b[1].size - a[1].size)

if (offenders.length) {
  console.error(`✗ ${offenders.length} rule(s) copied into ${THRESHOLD}+ components:\n`)
  for (const [rule, where] of offenders) {
    console.error(`  ${where.size}x  ${rule.slice(0, 110)}`)
    console.error(`      ${[...where].join(', ')}\n`)
  }
  console.error('Move what is shared into src/style.css and leave only the differences scoped.')
  process.exit(1)
}
console.log(`✓ css: no rule body copied into ${THRESHOLD}+ components`)
