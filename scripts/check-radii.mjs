#!/usr/bin/env node
// Guards the squared-corner design: `border-radius` is not a thing we sprinkle.
//
// Before 2026-08-25 the app carried 314 radius declarations across 100 files, at 4px, 5px or
// 6px depending on which day the file was written — the same kind of element rounded three
// different ways. That is what an unenforced default decays into, so this check keeps the
// squaring from decaying the same way. Run by `npm run radii`.
//
// Adding a radius is allowed — it just has to be a decision. Put it in ALLOWED with the reason.
//
// EVERY spelling counts, not just the `border-radius` shorthand. Until 2026-08-27 this only
// matched that one, so four `border-top-left-radius: 4px` sat on the weapon-table headers in plain
// sight with the check reporting a clean sweep — the corners a reader could see were the ones it
// could not. The longhands and the logical properties (`border-start-end-radius`…) are the same
// declaration written another way and are matched the same.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

// A circle is a shape, not a rounded box — spinners, dots, round counters. Always fine.
const CIRCLE = '50%'

const ALLOWED = [
  { file: 'src/style.css', value: '0', why: 'the one global reset — browsers round form controls on their own' },
  { file: 'src/style.css', value: '2px', why: 'focus ring — matches the outline it sits under' },
  { file: 'src/style.css', value: '3px', why: 'scrollbar thumb — OS chrome, not our surface' },
  { file: 'src/components/SearchModal.vue', value: '2px', why: 'search-hit highlight behind text' },
  { file: 'src/components/BaseModal.vue', value: '12px 12px 0 0', why: 'mobile bottom sheet — the round top edge is what says it slid up' },
]

const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (name.endsWith('.vue') || name.endsWith('.css')) files.push(p)
  }
})('src')

const offenders = []
for (const p of files) {
  const rel = relative('.', p)
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    const m = line.match(/(border-(?:[a-z]+-){0,2}radius):\s*([^;}]+)/)
    if (!m) return
    const [, prop, raw] = m
    const value = raw.trim()
    if (value === CIRCLE) return
    if (ALLOWED.some((a) => a.file === rel && a.value === value)) return
    offenders.push(`${rel}:${i + 1}  ${prop}: ${value}`)
  })
}

if (offenders.length) {
  console.error(`✗ ${offenders.length} unlisted border-radius declaration(s):\n`)
  for (const o of offenders) console.error('  ' + o)
  console.error(`\nCorners are square by default (see "Corners & surfaces" in CLAUDE.md).`)
  console.error(`If this one is deliberate, add it to ALLOWED in scripts/check-radii.mjs with the reason.`)
  process.exit(1)
}
console.log(`✓ radii: ${ALLOWED.length} listed exceptions + circles, nothing else`)
