// GATE: fail when a figure GW prints as a PICTURE inside an army or detachment rule is missing from
// wh11ed's text of that rule. Exits non-zero. `npm run imgrules`.
//
// WHY THIS EXISTS. On 2026-09-25 a player wrote that Death Guard's Contagion Range stops at 6" from
// the second battle round, when it goes to 9" from the third. The codex says so — but not in words:
// the app draws the three steps as images, and the only text they carry is the image's `altText`
// ("From the third battle round, the Contagion Range is nine inches."). Every prose comparison
// (sync-faction-text, omissions) reads appdata's `text` components and skips images, so the missing
// step was invisible to all of them. The same sweep found World Eaters' Blessings without their
// triples ("Double 5+ or Triple 2+") and T'au's Gun/Missile Drones without their weapon profiles.
//
// WHAT IS CHECKED. Every `image` component with an altText that belongs to a non-Combat-Patrol army
// rule or detachment rule. From its altText: each "double N" / "triple N" / "any double|triple" must
// appear in our rule's text, and so must every number (number words are read as digits on both
// sides). Numbers are a coarse net on purpose — a table of battle sizes or a weapon profile is
// nothing BUT numbers, and a step that is missing is a number that is missing.
//
// Usage:
//   node scripts/check-image-rules.mjs            # gate, exit 1 on any finding
//   node scripts/check-image-rules.mjs --verbose  # also list what passed and what ALLOW suppressed
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, SLUG_MAP, norm, loadJson, loadModule, byNormName, table, combatPatrolNames, APPDATA, NUMBER_WORDS } from './lib/sync-common.mjs'

// Pictures wh11ed deliberately does not transcribe as numbers. Keep the reason concrete.
const ALLOW = []

// Lowercase, number words and ordinals as digits, typographic marks folded — both sides go through
// this. Ordinals because a picture can be a banner ("Battle round two onwards") over prose that
// counts the other way ("during the second, third, fourth and fifth battle rounds").
const ORDINALS = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
const WORD_RE = new RegExp(`\\b(${NUMBER_WORDS.join('|')})\\b`, 'g')
const ORD_RE = new RegExp(`\\b(${ORDINALS.join('|')})\\b`, 'g')
function flat(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\*\*|__/g, '')
    .replace(WORD_RE, (w) => String(NUMBER_WORDS.indexOf(w)))
    .replace(ORD_RE, (w) => String(ORDINALS.indexOf(w)))
}

// The facts one altText commits to, each with the pattern our text has to match.
function factsOf(alt) {
  const t = flat(alt)
  const facts = []
  const diceNums = new Set()
  for (const m of t.matchAll(/\b(double|triple)\s+(\d+)/g)) {
    facts.push({ label: `${m[1]} ${m[2]}`, re: new RegExp(`\\b${m[1]}\\s+${m[2]}\\b`) })
    diceNums.add(m[2])
  }
  for (const m of t.matchAll(/\bany\s+(double|triple)\b/g)) {
    // "any double" is what our text prints as "Double 1+".
    facts.push({ label: `any ${m[1]}`, re: new RegExp(`\\bany\\s+${m[1]}\\b|\\b${m[1]}\\s+1\\+`) })
  }
  for (const n of new Set(t.match(/\d+/g) || [])) {
    if (diceNums.has(n)) continue
    facts.push({ label: n, re: new RegExp(`(?<!\\d)${n}(?!\\d)`) })
  }
  return facts
}

export async function run(argv = process.argv.slice(2)) {
  const VERBOSE = argv.includes('--verbose')
  if (!fs.existsSync(path.join(APPDATA, 'tables'))) {
    console.log('imgrules: wh40k-appdata not found next to this repo — skipped.')
    return 0
  }

  // appdata rule id → the images drawn inside it.
  const imagesByOwner = new Map()
  for (const c of table('rule_container_component.json')) {
    const alt = c?.localisations?.en?.altText
    const owner = c.armyRuleId || c.detachmentRuleId
    if (c.type !== 'image' || !alt || !owner) continue
    const list = imagesByOwner.get(owner) || []
    list.push({ id: c.id, order: c.displayOrder, alt })
    imagesByOwner.set(owner, list)
  }

  const cp = combatPatrolNames()
  const reached = new Set()
  const findings = []
  let checked = 0

  function check(where, ownerId, text) {
    const imgs = imagesByOwner.get(ownerId)
    if (!imgs) return
    reached.add(ownerId)
    const ours = flat(text)
    for (const img of imgs.sort((a, b) => a.order - b.order)) {
      checked++
      const missing = factsOf(img.alt).filter((f) => !f.re.test(ours)).map((f) => f.label)
      const allowed = ALLOW.find((a) => a.id === img.id)
      if (!missing.length) {
        if (VERBOSE) console.log(`  ok  ${where}: ${img.alt}`)
      } else if (allowed) {
        if (VERBOSE) console.log(`  allowed  ${where}: ${img.alt} — ${allowed.why}`)
      } else {
        findings.push(`${where}\n      picture: ${img.alt}\n      not in our text: ${missing.join(', ')}`)
      }
    }
  }

  const factionDir = path.join(ROOT, 'src/data/factions')
  for (const file of fs.readdirSync(factionDir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js')).sort()) {
    const slug = file.replace(/\.js$/, '')
    const bundle = loadJson(path.join(APPDATA, 'factions', `${SLUG_MAP[slug] || slug}.json`))
    const en = Object.values((await loadModule(path.join(factionDir, file))) || {})[0]?.en
    if (!bundle || !en) continue

    // wh11ed keeps ONE combined army rule — several appdata army rules (Drones inside T'au's) fold
    // into it — so every non-Combat-Patrol army rule of the faction is checked against that body.
    for (const r of (bundle.armyRules || []).filter((a) => !cp.armyRuleIds.has(a.id))) {
      check(`${slug} · army rule "${r.name}"`, r.id, en.armyRule?.body)
    }

    const ourDetByName = byNormName(en.detachments || [], (d) => d.name)
    for (const appDet of (bundle.detachments || []).filter((d) => !cp.detachments.has(norm(d.name)))) {
      const ours = ourDetByName.get(norm(appDet.name))
      for (const r of appDet.rules || []) {
        check(`${slug} · detachment "${appDet.name}" · rule "${r.name}"`, r.id, ours?.rule?.body)
      }
    }
  }

  // Pictures in a rule no faction reached — a Combat Patrol box's own copy, or a rule we do not
  // carry. Not a failure (the other gates own "rule missing"), but worth a line so a new one shows.
  const unreached = [...imagesByOwner.keys()].filter((id) => !reached.has(id))
  const staleAllow = ALLOW.filter((a) => ![...imagesByOwner.values()].flat().some((i) => i.id === a.id))

  console.log(`imgrules: ${checked} picture(s) checked in ${reached.size} rule(s); ${unreached.length} rule(s) with pictures outside the factions' own rules (Combat Patrol copies) skipped.`)
  for (const a of staleAllow) console.log(`  stale ALLOW entry (picture no longer in appdata): ${a.id}`)
  if (findings.length) {
    console.log(`\n✗ ${findings.length} picture(s) whose figures our text does not carry:\n`)
    for (const f of findings) console.log(`  ${f}\n`)
    return 1
  }
  console.log('✓ every figure GW prints as a picture is in our text')
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exitCode = await run()
