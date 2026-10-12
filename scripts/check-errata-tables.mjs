// GATE: every codex errata that changes characteristics in a table ("Change the following unit
// characteristics" / "…weapon characteristics") is what our datasheets print. Exits non-zero.
// `npm run errata-tables`, inside `npm run sync`.
//
// Why a gate of its own: GW publishes these tables in Updates & Errata and then re-keys the
// statlines by hand, and the hand misses rows. On 2026-10-12 a player found the Emperor's Children
// Sorcerer still at T4 — the table raises it to T5 and appdata 963–972 only raised the squads. The
// weapon rows had the same slip (AP "1" for AP-1 on 41 sheets), caught one by one before this gate
// existed. Comparing appdata with itself never finds it: only the errata text says what is right.
//
// Every line of every table is parsed and checked against OUR sheet (src/data/datasheets) — what a
// player reads. A line the parser cannot read fails; a name it cannot place fails unless it is
// written below with the reason. So a new table, a rewritten one and a regeneration that lost a
// correction all turn this red. The fix for a real mismatch is an entry in
// scripts/lib/appdata-exceptions.mjs (kind unit-stat / weapon-stat), not an edit of the sheet.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { APPDATA, ROOT, SLUG_MAP, norm, looseName, table, allFactionBundles } from './lib/sync-common.mjs'

const STATS = ['M', 'T', 'Sv', 'W', 'Ld', 'OC']
const WEAPON_STATS = ['A', 'BS', 'WS', 'S', 'AP', 'D']

// An errata name that is not our sheet's name, per publication: the errata's spelling → ours.
// Each one is a reading of GW's text, so each says why.
export const UNIT_ALIASES = {
  'Codex: Emperor’s Children': {
    'Lord Kakophanist': 'Lord Kakophonist', // the errata's typo
  },
  'Codex: Chaos Space Marines': {
    'Chaos Terminators': 'Chaos Terminator Squad', // the weapon rows use the box name
  },
  'Codex: Grey Knights': {
    Purifier: 'Purifier Squad', // the errata's truncation
  },
}

// A unit the errata lists for a weapon it does not carry on our sheet — nor in appdata. Written
// down so the line is read, not skipped: if the weapon ever appears, the check runs as usual, and
// an entry no line consults any more is reported.
export const NOT_CARRIED = {
  'Codex: Chaos Space Marines': {
    'Havocs|Bolt Pistol': 'appdata 972 gives Havocs no bolt pistol; the errata line lists them anyway.',
  },
}

const ourSlugOf = (appSlug) => Object.keys(SLUG_MAP).find((k) => SLUG_MAP[k] === appSlug) || appSlug

function publicationSlugs() {
  const out = new Map()
  for (const { appSlug, bundle } of allFactionBundles()) {
    for (const p of bundle?.publications || []) if (!out.has(p.name)) out.set(p.name, ourSlugOf(appSlug))
  }
  return out
}

const publicationName = (() => {
  const byId = new Map(table('publication.json').map((p) => [p.id, p.localisations?.en?.name]))
  return (id) => byId.get(id)
})()

// One table → { units: [{stat, value, names}], weapons: [{weapon, changes: [[stat, value]], names}], unread: [line] }
export function parseErrataTable(text) {
  const out = { units: [], weapons: [], unread: [] }
  let mode = null
  let carry = ''
  for (const raw of text.replace(/\*\*/g, '').split('\n')) {
    const line = (carry ? `${carry} ` : '') + raw.trim()
    carry = ''
    if (!line) continue
    if (/^Change the following unit characteristics/i.test(line)) { mode = 'units'; continue }
    if (/^Change the following weapon characteristics/i.test(line)) { mode = 'weapons'; continue }
    if (/^Changes\s*-\s*Units$/i.test(line) || /^Weapon\s*-\s*Changes\s*-\s*Units$/i.test(line)) continue
    if (mode === 'units') {
      const m = line.match(new RegExp(`^(${STATS.join('|')})\\s*(\\d+\\+?|\\d+")\\s*-?\\s*(.+)$`))
      if (m) out.units.push({ stat: m[1], value: m[2], names: splitNames(m[3]) })
      else out.unread.push(line)
      continue
    }
    if (mode === 'weapons') {
      const re = new RegExp(`(?:^|[\\s,-])(${WEAPON_STATS.join('|')})\\s*(-\\s*\\d+|\\d+\\+?|D\\d+(?:\\+\\d+)?)(?=[\\s,-]|$)`, 'g')
      const hits = [...line.matchAll(re)]
      if (!hits.length) {
        // A weapon name broken across two lines ("Inferno" / "Combi-weapon - S5 - …").
        if (!/\d/.test(line)) { carry = line; continue }
        out.unread.push(line)
        continue
      }
      const first = hits[0].index + (/^[\s,-]/.test(hits[0][0]) ? 1 : 0)
      const last = hits.at(-1)
      const weapon = line.slice(0, first).replace(/[\s-]+$/, '').trim()
      const names = splitNames(line.slice(last.index + last[0].length))
      if (!weapon || !names.length) { out.unread.push(line); continue }
      out.weapons.push({ weapon, changes: hits.map((h) => [h[1], h[2].replace(/\s+/g, '')]), names })
      continue
    }
    out.unread.push(line)
  }
  if (carry) out.unread.push(carry)
  return out
}

const splitNames = (s) => s.replace(/^[\s,-]+/, '').split(',').map((x) => x.trim()).filter(Boolean)

// "Castellan Axe (ranged)" names the ranged profile; "(ranged and melee)" both.
function weaponRows(sheet, weapon) {
  const m = weapon.match(/^(.*?)\s*\((ranged|melee|ranged and melee)\)$/i)
  const name = m ? m[1] : weapon
  const lists = !m ? [...(sheet.ranged || []), ...(sheet.melee || [])]
    : m[2].toLowerCase() === 'ranged' ? sheet.ranged || [] : m[2].toLowerCase() === 'melee' ? sheet.melee || []
      : [...(sheet.ranged || []), ...(sheet.melee || [])]
  const base = (r) => r.name.split(' – ')[0]
  const exact = lists.filter((r) => norm(base(r)) === norm(name))
  return exact.length ? exact : lists.filter((r) => looseName(base(r)) === looseName(name))
}

export async function checkErrataTables() {
  const problems = []
  const slugs = publicationSlugs()
  const sheetsBySlug = new Map()
  const sheetsOf = async (slug) => {
    if (!sheetsBySlug.has(slug)) {
      const file = path.join(ROOT, 'src/data/datasheets', `${slug}.js`)
      sheetsBySlug.set(slug, fs.existsSync(file) ? (await import(pathToFileURL(file).href)).default : null)
    }
    return sheetsBySlug.get(slug)
  }
  const used = new Set()
  let tables = 0
  let checked = 0
  for (const r of table('faq.json')) {
    const text = r.localisations?.en?.errataText || ''
    if (!/Change the following (unit|weapon) characteristics/i.test(text)) continue
    tables++
    const pub = publicationName(r.publicationId)
    const slug = slugs.get(pub)
    const sheets = slug && (await sheetsOf(slug))
    if (!sheets) { problems.push(`${pub}: no datasheets of ours to check this table against`); continue }
    const aliases = UNIT_ALIASES[pub] || {}
    const notCarried = NOT_CARRIED[pub] || {}
    // "Masters of the Maelstrom: Katar Garrix" names one model of a sheet: its statline only.
    const target = (name) => {
      if (aliases[name]) used.add(`${pub}|alias|${name}`)
      const [unit, model] = (aliases[name] || name).split(/:\s*/)
      const sheet = sheets.find((x) => norm(x.name) === norm(unit)) || sheets.find((x) => looseName(x.name) === looseName(unit))
      return sheet && { sheet, profiles: (sheet.profiles || []).filter((pr) => !model || norm(pr.name) === norm(model)) }
    }
    const t = parseErrataTable(text)
    for (const line of t.unread) problems.push(`${pub}: cannot read the errata line "${line}"`)
    for (const u of t.units) {
      for (const name of u.names) {
        const hit = target(name)
        if (!hit?.profiles.length) { problems.push(`${pub}: "${name}" (${u.stat}${u.value}) is not a sheet or model of ours — a new unit, or a name to add to UNIT_ALIASES`); continue }
        const { sheet } = hit
        checked++
        const off = hit.profiles.filter((p) => String(p[u.stat.toLowerCase()]) !== u.value)
        if (off.length) problems.push(`${pub}: ${sheet.name} ${u.stat} is ${JSON.stringify(off.map((p) => p[u.stat.toLowerCase()]))}, the errata says ${u.value}`)
      }
    }
    for (const w of t.weapons) {
      for (const name of w.names) {
        const sheet = target(name)?.sheet
        if (!sheet) { problems.push(`${pub}: "${name}" (${w.weapon}) is not a sheet of ours — a new unit, or a name to add to UNIT_ALIASES`); continue }
        const rows = weaponRows(sheet, w.weapon)
        if (!rows.length) {
          if (notCarried[`${name}|${w.weapon}`]) used.add(`${pub}|nc|${name}|${w.weapon}`)
          else problems.push(`${pub}: ${sheet.name} has no "${w.weapon}" — a new name, or a NOT_CARRIED entry with the reason`)
          continue
        }
        checked++
        for (const [stat, value] of w.changes) {
          const off = rows.filter((row) => String(row[stat.toLowerCase()]).replace(/\s+/g, '') !== value)
          if (off.length) problems.push(`${pub}: ${sheet.name} ${off.map((x) => x.name).join(', ')} ${stat} is ${JSON.stringify(off.map((x) => x[stat.toLowerCase()]))}, the errata says ${value}`)
        }
      }
    }
  }
  // A recorded reading nobody needs any more hides the next real miss: report it.
  for (const [pub, m] of Object.entries(UNIT_ALIASES)) for (const n of Object.keys(m)) if (!used.has(`${pub}|alias|${n}`)) problems.push(`UNIT_ALIASES "${n}" (${pub}) is in no errata table any more — drop it`)
  for (const [pub, m] of Object.entries(NOT_CARRIED)) for (const k of Object.keys(m)) if (!used.has(`${pub}|nc|${k}`)) problems.push(`NOT_CARRIED "${k}" (${pub}) is in no errata table any more — drop it`)
  return { problems, tables, checked }
}

export async function run() {
  if (!fs.existsSync(path.join(APPDATA, 'tables', 'faq.json'))) {
    console.error(`errata tables: no wh40k-appdata at ${APPDATA}`)
    return 1
  }
  const { problems, tables, checked } = await checkErrataTables()
  if (problems.length) {
    console.error(`errata tables: ${problems.length} problem(s)\n`)
    for (const p of problems) console.error(`  ✗ ${p}`)
    return 1
  }
  console.log(`errata tables: ${tables} table(s), ${checked} unit/weapon change(s) — our sheets print every one.`)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
