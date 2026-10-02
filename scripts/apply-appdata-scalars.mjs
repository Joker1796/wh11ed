#!/usr/bin/env node
// apply-appdata-scalars.mjs — carry appdata's NUMBERS into hand-authored datasheet files: statline
// characteristics, weapon characteristics / range / tags, and the invulnerable save. Prose is never
// touched (that is sync:text's report and a human's edit); points are sync:mfm's.
//
//   node scripts/apply-appdata-scalars.mjs <slug> [<slug> …] | --all     # report
//   node scripts/apply-appdata-scalars.mjs … --write                     # rewrite the files
//
// Written for app data 963, where GW re-statted every Astartes body in the game at once (T4→T5,
// bolt weapons S4→S5 and AP0→-1) across a dozen factions — several hundred single-number edits
// that `npm run sync` lists one per line and nobody should type by hand.
//
// Matching is the one sync-appdata.mjs uses (profile by name, a weapon row through the sourceIds
// `wg:` bridge, then matchWeapon), so what this writes is exactly what that report flagged — and a
// finding recorded in scripts/lib/sync-baseline.json is an accepted difference, so it is skipped
// (the C'TAN POWER tags on the Tesseract Vault, 600-odd more). A unit wh11ed collapsed to one
// profile row is updated only when all of appdata's statlines agree with each other.
//
// A positive AP is not a value. In 963 every Combi-weapon and Storm bolter of the CSM family and
// the Grey Knights reads "1" where the same item everywhere else went to "-1" in the same rework —
// the minus is missing, so "-1" is written and each one is listed with "!".
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, SLUG_MAP, norm, looseName, isWeaponType, loadJson, loadModule, byNormName, matchWeapon, combatPatrolNames } from './lib/sync-common.mjs'

const args = process.argv.slice(2)
const WRITE = args.includes('--write')
let slugs = args.filter((a) => !a.startsWith('--'))
if (args.includes('--all')) {
  slugs = fs.readdirSync(path.join(ROOT, 'src/data/datasheets')).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js')).map((f) => f.replace(/\.js$/, ''))
}
if (!slugs.length) { console.log('Usage: node scripts/apply-appdata-scalars.mjs <slug>… | --all [--write]'); process.exit(1) }

const STAT = [['m', 'M'], ['t', 'T'], ['sv', 'Sv'], ['w', 'W'], ['ld', 'Ld'], ['oc', 'OC']]
const WEAPON = { ranged: [['range', 'range'], ['a', 'A'], ['bs', 'BS'], ['s', 'S'], ['ap', 'AP'], ['d', 'D']], melee: [['a', 'A'], ['ws', 'WS'], ['s', 'S'], ['ap', 'AP'], ['d', 'D']] }
const smap = loadJson(path.join(ROOT, 'src/data/sourceIds.json')) || {}
const baseline = loadJson(path.join(ROOT, 'scripts/lib/sync-baseline.json')) || {}
const accepted = (line) => Object.prototype.hasOwnProperty.call(baseline, line)
const cp = combatPatrolNames()
let total = 0
let refused = 0

for (const slug of slugs) {
  const file = path.join(ROOT, 'src/data/datasheets', `${slug}.js`)
  const bundle = loadJson(path.join(APPDATA, 'factions', `${SLUG_MAP[slug] || slug}.json`))
  if (!bundle || !fs.existsSync(file)) continue
  const sheets = (await loadModule(file)).default
  const appByName = byNormName((bundle.datasheets || []).filter((d) => !d.isCombatPatrol && !cp.datasheets.has(norm(d.name))), (d) => d.name)
  const ids = smap[slug] || {}
  const lines = []
  const set = (obj, key, value, label) => {
    if (String(obj[key] ?? '') === String(value ?? '')) return
    lines.push(`  ${label}: ${JSON.stringify(obj[key])} → ${JSON.stringify(value)}`)
    obj[key] = value
    total++
  }

  for (const d of sheets) {
    const app = appByName.get(norm(d.name))
    if (!app || d.source === 'faction-pack') continue
    // Statlines.
    const statByName = byNormName(app.statlines || [], (s) => s.name)
    const allSame = (app.statlines || []).every((s) => STAT.every(([, af]) => s[af] === app.statlines[0][af]))
    for (const p of d.profiles || []) {
      const s = statByName.get(norm(p.name)) || (d.profiles.length === 1 && allSame ? app.statlines?.[0] : null)
      if (!s) { if ((app.statlines || []).length) lines.push(`  ? ${d.name} · profile "${p.name}" — no single appdata statline to take`); continue }
      for (const [wf, af] of STAT) {
        if (s[af] == null) continue
        if (accepted(`~ datasheet "${d.name}" profile "${p.name}" ${wf.toUpperCase()} differs: wh11ed=${JSON.stringify(p[wf])} appdata=${JSON.stringify(s[af])}`)) continue
        set(p, wf, s[af], `${d.name} · ${p.name} ${wf.toUpperCase()}`)
      }
    }
    // Invulnerable save: only the unambiguous shape (one save, not scoped to a model).
    const inv = app.invulnerableSaves || []
    if (inv.length === 1 && !inv[0].miniatureId && inv[0].save) {
      for (const p of d.profiles || []) if (p.inv && p.inv !== inv[0].save) set(p, 'inv', inv[0].save, `${d.name} · ${p.name} InSv`)
    }
    // Weapons.
    const byId = new Map((app.wargear || []).map((w) => [w.id, w]))
    for (const kind of ['ranged', 'melee']) {
      const isRanged = kind === 'ranged'
      for (const w of d[kind] || []) {
        const wgId = ids[`wg:${d.id}:${norm(w.name)}`]
        const item = (wgId && byId.get(wgId)) || matchWeapon(w.name, isRanged, app.wargear)
        if (!item) continue
        const profiles = (item.profiles || []).filter((p) => isWeaponType(p.type, isRanged))
        const pick = (fold) => profiles.filter((p) => fold(w.name).endsWith(fold(p.name))).sort((a, b) => b.name.length - a.name.length)[0]
        const p = profiles.length <= 1 ? profiles[0] : pick(norm) || pick(looseName)
        if (!p) continue
        for (const [wf, af] of WEAPON[kind]) {
          if (p[af] == null) continue
          const finding = wf === 'range'
            ? `~ datasheet "${d.name}" weapon "${w.name}" range differs: wh11ed=${JSON.stringify(w.range)} appdata=${JSON.stringify(p.range)}`
            : `~ datasheet "${d.name}" weapon "${w.name}" ${wf.toUpperCase()} differs: wh11ed=${JSON.stringify(w[wf])} appdata=${JSON.stringify(p[af])}`
          if (accepted(finding)) continue
          let value = p[af]
          if (af === 'AP' && /^[1-9]/.test(String(value))) {
            value = `-${value}`
            lines.push(`  ! ${d.name} · ${w.name} AP — appdata says ${JSON.stringify(p[af])} (the minus is missing); writing ${JSON.stringify(value)}`)
            refused++
          }
          set(w, wf, value, `${d.name} · ${w.name} ${wf.toUpperCase()}`)
        }
        const appTags = [...(p.tags || [])].map((t) => t.toUpperCase())
        const whTags = (w.tags || []).map((t) => t.toUpperCase())
        const tagFinding = `~ datasheet "${d.name}" weapon "${w.name}" tags differ: wh11ed=${JSON.stringify([...whTags].sort())} appdata=${JSON.stringify([...appTags].sort())}`
        if (!accepted(tagFinding) && [...appTags].sort().join('|') !== [...whTags].sort().join('|')) {
          lines.push(`  ${d.name} · ${w.name} tags: ${JSON.stringify(w.tags)} → ${JSON.stringify(appTags)}`)
          w.tags = appTags
          total++
        }
      }
    }
  }

  if (!lines.length) continue
  console.log(`\n=== ${slug}`)
  lines.forEach((l) => console.log(l))
  if (WRITE) {
    const src = fs.readFileSync(file, 'utf8')
    const at = src.indexOf('export default ')
    fs.writeFileSync(file, `${src.slice(0, at)}export default ${JSON.stringify(sheets, null, 2)}\n`)
  }
}
console.log(`\n${total} value(s) ${WRITE ? 'written' : 'to write'}; ${refused} of them a positive AP read as negative (see "!")`)
