// @ts-check
// A roster as a BattleScribe `.ros` file — for Yellowscribe (yellowscribe.link), which turns the file
// into a code its Tabletop Simulator mod reads, and the models on the table get their profiles,
// weapons and abilities. Asked for by a player (VK, 2026-10-30): "missing Yellowscribe or a TTS import".
//
// NOT a BattleScribe roster. A real `.ros` names every entry by its catalogue id; we have no BSData
// catalogues and Yellowscribe does not read them: its parser (bin/roszParser.js) checks the game system
// id and then reads names and shape only. So this is the subset it reads, and nothing else:
//   - `force > selections > selection[type=unit]` — a unit, its models as `selection[type=model]`
//     stacks with `number`; a one-model unit is itself a `selection[type=model]`;
//   - `profile[typeName=Unit]` — M T SV W LD OC InSv; `Ranged Weapons` / `Melee Weapons`;
//     `Abilities`, the text in the first characteristic;
//   - a weapon as an `upgrade` under its model, its `number` the STACK's total (BattleScribe's
//     convention — the parser divides by the model count); a weapon of every model as an `upgrade`
//     of the unit with `from="group"`;
//   - `categories` — required on every unit (the parser reads `categories[0]` unguarded), faction
//     keywords as `Faction: X`.
// Checked by hand against the live service on 2026-10-30 (hub journal 2026-10-30-yellowscribe-tts),
// and held to that parser's reading by rosterRos.test.js.
//
// English only: Yellowscribe and TTS are, and names and keywords stay English in this project anyway.
// Datasheets only — what the army's rules change about a unit (rosterModifiers) does not travel.
import { resolve } from './rosterExport.js'
import { weaponRowClaimer } from '../rules/rosterModifiers.js'
import { foldName, infoKey } from '../shared/foldName.js'

/** @typedef {import('../shared/roster.types.js').Roster} Roster */
/** @typedef {import('../shared/roster.types.js').WeaponRow} WeaponRow */
/** @typedef {import('../shared/data.types.js').Datasheet} Datasheet */
/** @typedef {import('../shared/data.types.js').NamedText} NamedText */
/** @typedef {import('./rosterExport.js').ExportContext} ExportContext */
/** @typedef {import('./rosterExport.js').ExportRow} ExportRow */

// BattleScribe's id for Warhammer 40,000 11th edition — the one value Yellowscribe checks.
const GAME_SYSTEM_11E = 'sys-352e-adc2-7639-d610'

/** @param {unknown} s */
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Our rule prose as plain text: a glossary token is its visible label, a core rule its name, bold and
// italics drop. Weapon keywords in brackets ("[DEVASTATING WOUNDS]") stay — that is how GW prints them.
/** @param {unknown} s */
const plain = (s) => String(s ?? '')
  .replace(/\[gloss:[^:\]]*:([^\]]*)\]/g, '$1')
  .replace(/\[core:([^\]]*)\]/g, '$1')
  .replace(/\*\*|__/g, '')

/** @param {Record<string, unknown>} o */
const chars = (o) => `<characteristics>${Object.entries(o)
  .map(([k, v]) => `<characteristic name="${k}">${esc(v)}</characteristic>`).join('')}</characteristics>`

/**
 * The file. `sheets` holds the full datasheets by the id the ROSTER uses (an ally's namespaced:
 * `imperial-agents:draxus`); a unit without one goes out with its name, keywords and models only.
 * @param {Partial<Roster> | null | undefined} roster
 * @param {ExportContext & { sheets: Map<string, Datasheet> }} ctx
 * @returns {string}
 */
export function buildRosterRos(roster, ctx) {
  const m = resolve(roster, ctx)
  let seq = 0
  const id = () => `whr-${(++seq).toString(16).padStart(4, '0')}`
  const units = [...m.attached.flatMap((g) => [...g.leaders, g.body]), ...m.loose]
    .map((r) => unitXml(r, ctx.sheets.get(r.entry.id), ctx.items || {}, id))
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<roster id="${id()}" name="${esc(roster?.name || 'WH Rules')}" battleScribeVersion="2.03" gameSystemId="${GAME_SYSTEM_11E}" gameSystemName="Warhammer 40,000 11th Edition" xmlns="http://www.battlescribe.net/schema/rosterSchema">
<forces><force id="${id()}" name="${esc(m.faction?.name || '')}" catalogueName="${esc(m.faction?.name || '')}"><selections>
${units.join('\n')}
</selections></force></forces></roster>
`
}

/**
 * @param {ExportRow} r
 * @param {Datasheet | undefined} sheet
 * @param {Record<number, string>} items
 * @param {() => string} id
 */
function unitXml(r, sheet, items, id) {
  const profile = (/** @type {string} */ name, /** @type {string} */ type, /** @type {Record<string, unknown>} */ o) =>
    `<profile id="${id()}" name="${esc(name)}" typeName="${type}">${chars(o)}</profile>`
  const ability = (/** @type {string} */ name, /** @type {string} */ text) => profile(name, 'Abilities', { Description: plain(text) })
  /** @param {WeaponRow} w */
  const weapon = (w) => w.range
    ? profile(w.name, 'Ranged Weapons', { Range: w.range, A: w.a, BS: w.bs, S: w.s, AP: w.ap, D: w.d, Keywords: (w.tags || []).join(', ') || '-' })
    : profile(w.name, 'Melee Weapons', { Range: 'Melee', A: w.a, WS: w.ws, S: w.s, AP: w.ap, D: w.d, Keywords: (w.tags || []).join(', ') || '-' })
  /** @param {string} name @param {number} n @param {string} body @param {boolean} [group] */
  const upgrade = (name, n, body, group = false) =>
    `<selection id="${id()}" name="${esc(name)}" number="${n}" type="upgrade"${group ? ' from="group"' : ''}>${body ? `<profiles>${body}</profiles>` : ''}</selection>`

  // Which weapon rows each fielded item is: the claim the card's weapon table makes (rosterModifiers'
  // weaponRowClaimer — item names against row names, a multi-profile weapon's rows under its one
  // item, the items a unit's `stands` stand in for). A row no item claims is a weapon every model
  // has whatever it takes (a Librarian's Smite, a fixed "Close combat weapon" spelled apart from its
  // item): it goes on the unit. A fortification with no recorded loadout has no claims at all — all
  // its rows go on the unit.
  const rows = [...(sheet?.ranged || []), ...(sheet?.melee || [])]
  const claim = weaponRowClaimer(r.def, items)
  /** @type {Map<string, WeaponRow[]>} */
  const rowsOf = new Map()
  /** @type {WeaponRow[]} */
  const everyModel = []
  for (const w of rows) {
    const ids = claim?.(w.name)
    if (!ids || !r.gear.length) { everyModel.push(w); continue }
    for (const itemId of ids) {
      const key = foldName(items[itemId])
      rowsOf.set(key, [...(rowsOf.get(key) || []), w])
    }
  }
  const gearAbility = (/** @type {string} */ name) => (sheet?.wargearAbilities || []).find((a) => infoKey(a.name) === infoKey(name))
  /** @param {string} name @param {number} n */
  const item = (name, n) => {
    const own = rowsOf.get(foldName(name))
    const ab = gearAbility(name)
    return upgrade(name, n, [...(own || []).map(weapon), ab ? ability(ab.name, ab.text) : ''].join(''))
  }

  // Models: the stacks the export prints, a profile per stack. A stack the export leaves out for
  // holding nothing still stands on the table, so the count the export lost comes back as one more.
  const stacks = r.gear.flatMap((g) => splitStack(g.name || r.name, g.models, g.items))
  const missing = r.models - stacks.reduce((s, g) => s + g.n, 0)
  if (missing > 0) stacks.push({ name: r.name, n: missing, items: [] })
  if (!stacks.length) stacks.push({ name: r.name, n: r.models, items: [] })

  const enh = r.enh
    ? upgrade(r.enh.name, 1, [...(r.enh.weapons?.ranged || []), ...(r.enh.weapons?.melee || [])].map(weapon).join('') + ability(r.enh.name, 'Enhancement'))
    : ''

  const abilities = [
    ...(sheet?.core ? [ability('Core', sheet.core)] : []),
    ...(sheet?.faction ? [ability('Faction', sheet.faction)] : []),
    ...[...(sheet?.abilities || []), ...(sheet?.specialAbilities || []), ...(sheet?.rules || [])].map((a) => ability(a.name, a.text)),
    ...(sheet?.damaged ? [ability(`Damaged${sheet.damaged.note ? `: ${sheet.damaged.note}` : ''}`, sheet.damaged.text)] : []),
  ]
  const head = `<profiles>${(sheet?.profiles || []).map((p) =>
    profile(p.name || r.name, 'Unit', { M: p.m, T: p.t, SV: p.sv, W: p.w, LD: p.ld, OC: p.oc, InSv: p.inv || '-' })).join('')}${abilities.join('')}</profiles>`
  const keywords = [
    ...(sheet?.factionKeywords || r.def.fkws || []).map((k) => `Faction: ${k}`),
    ...(sheet?.keywords || r.def.kws || []),
    ...(r.warlord ? ['Warlord'] : []),
  ]
  const categories = `<categories>${keywords.map((k) => `<category id="${id()}" name="${esc(k)}" primary="false"/>`).join('')}</categories>`
  const shared = everyModel.map((w) => upgrade(w.name, 1, weapon(w), true)).join('')

  // One model: the unit IS the model, its gear under it.
  if (stacks.length === 1 && stacks[0].n === 1) {
    const gear = stacks[0].items.map((it) => item(it.name, it.n)).join('') + shared + enh
    return `<selection id="${id()}" name="${esc(r.name)}" number="1" type="model">${head}${gear ? `<selections>${gear}</selections>` : ''}${categories}</selection>`
  }
  const models = stacks.map((s, i) => {
    // The enhancement rides on the first stack — a character's, where the unit has one.
    const gear = s.items.map((it) => item(it.name, it.n)).join('') + (i === 0 ? enh : '')
    return `<selection id="${id()}" name="${esc(s.name)}" number="${s.n}" type="model">${gear ? `<selections>${gear}</selections>` : ''}</selection>`
  }).join('')
  return `<selection id="${id()}" name="${esc(r.name)}" number="1" type="unit">${head}<selections>${models}${shared}</selections>${categories}</selection>`
}

// A stack in whole weapons. The export counts a profile's loadout as totals — 2 autocannons and
// 2 heavy bolters across 4 Havocs — and BattleScribe's convention is a stack whose every model holds
// the same: Yellowscribe divides each total by the stack's size, and 4 Havocs got half an autocannon
// each. So the models are dealt their items one by one — what every model holds first, then each
// remainder to the models holding the fewest so far, the most common item first (7 lasguns and
// 2 plasma guns among 9 Armsmen land on different models) — and the alike are stacked again.
/**
 * @param {string} name
 * @param {number} n
 * @param {Array<{ name: string, n: number }>} items
 * @returns {Array<{ name: string, n: number, items: Array<{ name: string, n: number }> }>}
 */
function splitStack(name, n, items) {
  if (n <= 1 || items.every((it) => it.n % n === 0)) return [{ name, n, items }]
  /** @type {Array<Map<string, number>>} */
  const models = Array.from({ length: n }, () => new Map())
  const extra = new Array(n).fill(0)
  for (const it of [...items].sort((a, b) => b.n - a.n)) {
    const each = Math.floor(it.n / n)
    if (each) for (const m of models) m.set(it.name, each)
    // The remainder is fewer than the models: one each, never two on one model.
    const given = new Set()
    for (let left = it.n % n; left > 0; left--) {
      let i = -1
      for (let j = 0; j < n; j++) if (!given.has(j) && (i < 0 || extra[j] < extra[i])) i = j
      given.add(i)
      models[i].set(it.name, (models[i].get(it.name) || 0) + 1)
      extra[i]++
    }
  }
  /** @type {Map<string, { name: string, n: number, items: Array<{ name: string, n: number }> }>} */
  const alike = new Map()
  for (const m of models) {
    const key = [...m].sort().join('|')
    const s = alike.get(key)
    if (s) s.n++
    else alike.set(key, { name, n: 1, items: [...m].map(([k, c]) => ({ name: k, n: c })) })
  }
  // Each stack's items are per model by now; a stack states its totals.
  return [...alike.values()].map((s) => ({ ...s, items: s.items.map((it) => ({ name: it.name, n: it.n * s.n })) }))
}
