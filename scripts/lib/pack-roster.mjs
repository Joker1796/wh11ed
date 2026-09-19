// Roster entries for the Legends datasheets that come from a Faction Pack PDF rather than appdata
// (`source: 'faction-pack'` in src/data/datasheets/<slug>.js). appdata never had these — no
// miniature table, no wargear_option rows, no loadout table — so everything the roster needs is
// read from the datasheet's own printed text: `composition` for the profiles and sizes, `loadout`
// for what each profile starts with, `options` for the swaps. The option sentences are the same
// dozen templates GW prints on every sheet, and every reading here is FAIL-CLOSED: a sentence that
// matches no template, a subject that names no profile, a bracket the composition cannot hold —
// each is reported by name and the piece it would have produced is left out, never guessed.
//
// Consumed by gen-roster-data.mjs, which interns item names and instruction texts through the same
// `fx` the appdata units use (an item the pack shares with appdata — "Bolt pistol" — gets appdata's
// id, so the importer, the stock rule and the export cannot tell the two sources apart).
import { norm } from './sync-common.mjs'

const WORD_NUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 }
const num = (s) => (s == null ? null : WORD_NUM[String(s).toLowerCase()] ?? Number(s))
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s)
const clean = (s) => String(s || '').replace(/[’‘`]/g, '’').replace(/\s+/g, ' ').trim()
// Footnote markers on a sentence or a bullet ("…following list:*", "duplicates***:") — the
// footnote itself is a separate line the reader keeps as part of the instruction text.
const unstar = (s) => s.replace(/\*+(?=[:.]?$)/, '').replace(/\*+$/, '').trim()

// ---- Names -----------------------------------------------------------------------------------
// The prose pluralises and counts what the item table does not ("2 hellflamers", "Veteran
// Bikers’"), so a match tries the printed form, then the singular.
function singulars(n) {
  const out = [n]
  if (/ies$/.test(n)) out.push(n.replace(/ies$/, 'y'))
  if (/(ches|shes|xes|ses)$/.test(n)) out.push(n.replace(/es$/, ''))
  if (/s$/.test(n)) out.push(n.replace(/s$/, ''))
  return out
}
// A plural-blind key: every word to its singular, hyphens to spaces — "Kill Team Intercessors with
// plasma incinerators" and "Kill Team Intercessor with plasma incinerator" are one profile, and
// "servo arm" is "servo-arm". The last resort of every name match here; exact forms are tried first.
function pkey(s) {
  return norm(s).replace(/-/g, ' ').split(' ').map((w) => {
    if (w.length < 4) return w
    if (/ves$/.test(w)) return w.replace(/ves$/, 'f') // knives / knife, wolves / wolf
    if (/fe$/.test(w)) return w.replace(/fe$/, 'f')
    if (/(oes|ches|shes|xes|sses)$/.test(w)) return w.replace(/es$/, '')
    if (/ies$/.test(w)) return w.replace(/ies$/, 'y')
    if (/s$/.test(w) && !/ss$/.test(w)) return w.replace(/s$/, '')
    return w
  }).join(' ')
}
function findName(raw, dict) {
  const n = norm(raw).replace(/^\d+\s+/, '')
  for (const c of singulars(n)) if (dict.has(c)) return dict.get(c)
  const k = pkey(n)
  for (const [key, v] of dict) if (pkey(key) === k) return v
  return null
}

// ---- Composition → profiles and sizes ------------------------------------------------------
// "1 Biker Sergeant", "2-5 Space Marine Bikers", "0-1 Attack Bike". A line that is not a count
// and a name ("One of the following:", the alternatives under it) fails the whole reading.
// A named crew — "8 Kill Team Veterans: Vael Donatus, Zameon Gydrael, …", "1 Kill Team Terminator
// (Garran Branatar)" — keeps the names as aliases of the profile, so the loadout paragraphs written
// per member land on it.
// "1 Master of Ordnance, 1 Officer of the Fleet and 1 Astropath" is three lines in one. "One of the
// following:" over two such lines (the Death Korps Grenadier Squad: 1+9, or 1+7+1 Heavy Weapons
// Team) is folded into one range per profile — wider than the two legal builds, and said so.
function parseComposition(lines, report, who) {
  const minis = []
  const push = (m) => {
    const at = minis.find((x) => norm(x.n) === norm(m.n))
    if (at) { at.min = Math.min(at.min, m.min); at.max = Math.max(at.max, m.max) } else minis.push(m)
  }
  let alternatives = false
  for (const raw of lines || []) {
    let line = clean(raw).replace(/\s+–\s+Epic Hero$/, '')
    if (/^one of the following:$/i.test(line)) { alternatives = true; continue }
    const aliases = []
    line = line.replace(/\s*\(([^)]*)\)\s*$/, (_, a) => { aliases.push(a); return '' })
    line = line.replace(/:\s*(.*)$/, (_, a) => { aliases.push(...a.split(/,\s*/)); return '' })
    const parts = line.split(/,\s*|\s+and\s+/i).map((x) => x.trim()).filter(Boolean)
    const read = parts.map((x) => x.match(/^(\d+)(?:-(\d+))?\s+(.+)$/))
    if (!read.every(Boolean)) { report.composition.push(`${who}: "${raw}"`); return null }
    const seen = new Set()
    for (const m of read) { push({ n: m[3].trim(), min: Number(m[1]), max: Number(m[2] ?? m[1]), aliases: parts.length === 1 ? aliases.map((a) => a.trim()).filter(Boolean) : [] }); seen.add(norm(m[3])) }
    // A profile one alternative fields and another does not starts at 0.
    if (alternatives) for (const x of minis) if (!seen.has(norm(x.n))) x.min = 0
  }
  if (alternatives) {
    const alts = lines.filter((l) => !/^one of the following:$/i.test(clean(l)))
    for (const x of minis) if (!alts.every((l) => norm(l).includes(norm(x.n)))) x.min = 0
    report.note.push(`${who}: "one of the following" compositions folded into one range per profile`)
  }
  return minis.length ? minis : null
}

// Points brackets from the MFM rows the datasheet already carries: a row prices the sizes above
// the previous row up to its own count, as the app reads the Munitorum's "5 models / 10 models".
function sizes(points, minis, report, who) {
  const lo = minis.reduce((s, m) => s + m.min, 0)
  const hi = minis.reduce((s, m) => s + m.max, 0)
  const rows = (points || []).map((p) => ({ models: Number(p.models), pts: p.points }))
    .filter((p) => Number.isFinite(p.models) && Number.isFinite(p.pts)).sort((a, b) => a.models - b.models)
  const out = []
  let prev = null
  for (const r of rows) {
    if (r.models < lo || r.models > hi) { report.bracket.push(`${who}: ${r.models} models priced, composition holds ${lo}–${hi}`); continue }
    const per = [prev == null ? lo : prev + 1, r.models]
    const s = { pts: r.pts, per }
    if (minis.length > 1) {
      // Each profile's feasible range inside this bracket, narrowed by what the others must and
      // may field — [m, n] when fixed, [m, min, max] when the player chooses.
      const comp = minis.map((m, i) => {
        const othersMin = lo - m.min
        const othersMax = hi - m.max
        const a = Math.max(m.min, per[0] - othersMax)
        const b = Math.min(m.max, per[1] - othersMin)
        return a === b ? [i, a] : [i, a, b]
      })
      // Kept only when the parts add up to the bracket exactly, as the appdata reader keeps its
      // table: two open-ended profiles (a Bike Squad's Bikers AND its Attack Bike) sum wider than
      // the bracket, and every reader then falls back the way it does for the Deathwatch teams.
      const sum = comp.reduce((a, c) => [a[0] + c[1], a[1] + (c[2] ?? c[1])], [0, 0])
      if (comp.every((c) => c[1] <= (c[2] ?? c[1])) && sum[0] === per[0] && sum[1] === per[1]) s.comp = comp
      else report.note.push(`${who}: ${per.join('–')} models split over ${minis.map((m) => m.n).join(' / ')} is not one range — no per-profile counts`)
    }
    out.push(s)
    prev = r.models
  }
  if (out.length) out[0].default = 1
  return out
}

// ---- Loadout → defaults --------------------------------------------------------------------
// "**The Apothecary is equipped with:** bolt pistol; Astartes chainsword." — one paragraph per
// subject; "This model" / "Every model" is every profile, a name is that profile, "X and every Y"
// both. Returns [[miniIndex, [name, …]], …] or null when a subject cannot be placed.
// A paragraph about ONE model of a profile — "One Nightmare Hulk", "1 Lesk’s Hero" (four times,
// four different kits), a crew member by name — is a profile TOTAL, not a per-model kit: the
// roster's `[id, count, total]` third slot, the same mark the Servitor Battleclade's lone heavy
// bolter carries. "Every other Nightmare Hulk" is the per-model remainder.
function parseLoadout(text, minis, findMini, report, who) {
  const out = new Map() // mini → { each: [name…], total: [name…] }
  const paras = String(text || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
  for (const p of paras) {
    if (/^\*\*Designer/.test(p)) continue
    const m = clean(p).match(/^\*\*(.+?) (?:is|are|are both|are each) equipped with:\*\*\s*(.*)$/)
    if (!m) { report.note.push(`${who}: loadout paragraph skipped — ${p.slice(0, 60)}`); continue }
    const subject = m[1]
    let targets
    let total = false
    if (/^(this model|every model|each model|this unit|all models)$/i.test(subject)) targets = minis.map((_, i) => i)
    else {
      targets = []
      for (const part of subject.split(/\s+and\s+/i)) {
        const one = /^(one|1)\s+/i.test(part)
        const name = part.replace(/^(the|every other|every|each|an?|one|1)\s+/i, '').trim()
        const mi = findMini(name)
        if (mi == null) { report.loadout.push(`${who}: subject "${subject}"`); return null }
        if (one || minis[mi].aliases?.some((a) => norm(a) === norm(name))) total = true
        targets.push(mi)
      }
    }
    const items = m[2].replace(/\.$/, '').split(/;\s*/).map((s) => s.trim()).filter((s) => s && !/^nothing$/i.test(s))
    for (const mi of targets) {
      if (!out.has(mi)) out.set(mi, { each: [], total: [] })
      const row = out.get(mi)
      for (const it of items) {
        if (total) row.total.push(it)
        else if (!row.each.includes(it)) row.each.push(it)
      }
    }
  }
  return out
}

// ---- Options → wargear groups ----------------------------------------------------------------
// The VALUE half of a sentence — what the model gets. Either a list ("one of the following:", "up
// to two of the following, and can take duplicates:", "two different weapons from the following
// list:") drawn from the bullets, or an inline set ("1 twin Decimator claw and 2 hellflamers").
// Returns { options: [[name, count][]], limit, dup, stepper } or null.
function parseValue(value, bullets) {
  const v = unstar(clean(value))
  const list = () => bullets.map(parseSet).filter(Boolean)
  let m
  if (/^one of the following:$/i.test(v)) return bullets.length ? { options: list(), limit: 1, dup: 1 } : null
  if ((m = v.match(/^up to (\w+) of the following(, and can take duplicates)?:$/i))) {
    const n = num(m[1])
    return bullets.length && n ? { options: list(), limit: n, dup: m[2] ? n : 1 } : null
  }
  if (/^two different (?:weapons|options) from the following list:$/i.test(v)) return bullets.length ? { options: list(), limit: 2, dup: 1 } : null
  if ((m = v.match(/^either (\d+ .+?), or two different weapons from the following list:$/i))) {
    const claws = parseSet(m[1])
    return bullets.length && claws ? { options: [claws, ...list()], limit: 2, dup: 1 } : null
  }
  if (/:$/.test(v) && bullets.length) return null // a list head this reader does not know
  if ((m = v.match(/^up to (\d+) (.+?)\.?$/i))) {
    const one = parseSet(`1 ${m[2]}`)
    return one ? { options: [one], limit: Number(m[1]), dup: Number(m[1]), stepper: true } : null
  }
  const set = parseSet(v.replace(/\.$/, ''))
  return set ? { options: [set], limit: 1, dup: 1 } : null
}

// "1 flamer, 1 plasma cutter and 2 servo-arms" → [["flamer", 1], ["plasma cutter", 1], ["servo-arm", 2]].
// A bare name ("Starcannon") is one of it. Every piece has to look like an item, or nothing does.
function parseSet(s) {
  const parts = unstar(clean(s)).replace(/\.$/, '').split(/,\s*|\s+and\s+/i).map((x) => x.trim()).filter(Boolean)
  if (!parts.length) return null
  const out = []
  for (const p of parts) {
    const m = p.match(/^(\d+)\s+(.+)$/)
    if (m) out.push([m[2], Number(m[1])])
    else if (/^[A-Za-z][A-Za-z0-9’' -]*$/.test(p)) out.push([p, 1])
    else return null
  }
  return out
}

// One option sentence → a draft group, or null (reported by the caller). `minis` and `findMini`
// answer "which profile"; `maxModels` sizes the "for every N models" tables.
//
// Every template resolves to the same four facts: WHO (a profile index, or unit-wide), HOW MANY
// models the allowance covers (one, up to N, N per 5, any number), WHAT is given up (`given`, a
// phrase or nothing for a plain "can be equipped with") and the VALUE.
function parseOption(text, ctx) {
  const lines = String(text).split('\n').map((s) => s.trim()).filter(Boolean)
  // "…can replace their boltgun and Long Vigil melee weapon with:" is a list head that forgot to
  // say so; "The Assault Sergeant can do one of the following:" is handled by the caller.
  const head = clean(lines[0]).replace(/\bwith:$/, 'with one of the following:')
  const bullets = lines.slice(1).filter((l) => /^[▪◦•■▫]/.test(l)).map((l) => l.replace(/^[▪◦•■▫]\s*/, ''))
  if (/^none\.?$/i.test(head)) return { none: true }
  const { single, findMini, maxModels } = ctx

  // Head forms, most specific first. `who` is the profile phrase (null = "this model"/"models"),
  // `n` the models covered (null = any number), `per` the "for every N" step, `given` the phrase
  // of what is given up, `value` the rest; `cond` a "[not] equipped with X" gate.
  const forms = [
    // If this model is equipped with 1 psychic gifts, its X can be replaced with …
    [/^If this model is equipped with (?:1 |a |an )?(.+?), its (.+?) can be replaced with (.+)$/i, (m) => ({ n: 1, given: m[2], value: m[3], cond: [m[1], true] })],
    // 1 Pox Rider that is not equipped with a daemonic icon can be equipped with …
    [/^(\d+|One) (.+?) that is not equipped with (?:a |an |1 )?(.+?) can be equipped with (.+)$/i, (m) => ({ n: num(m[1]), who: m[2], value: m[4], cond: [m[3], false] })],
    // For every 5 models in this unit, [up to] 2 <who>[’s X] can be replaced / equipped / replace …
    [/^For every (\d+) models in (?:this|the) unit, (?:up to )?(\d+|one|two) (.+?)(?:’s|s’) (.+?) can be replaced with (.+)$/i, (m) => ({ per: num(m[1]), n: num(m[2]), who: m[3], given: m[4], value: m[5] })],
    [/^For every (\d+) models in (?:this|the) unit, (?:up to )?(\d+|one|two) (.+?) can (?:each )?replace (?:its|their) (.+?) with (.+)$/i, (m) => ({ per: num(m[1]), n: num(m[2]), who: m[3], given: m[4], value: m[5] })],
    [/^For every (\d+) models in (?:this|the) unit, (?:up to )?(\d+|one|two) (.+?) can (?:each )?have (?:its|their) (.+?) replaced with (.+)$/i, (m) => ({ per: num(m[1]), n: num(m[2]), who: m[3], given: m[4], value: m[5] })],
    [/^For every (\d+) models in (?:this|the) unit, (?:up to )?(\d+|one|two) (.+?) can (?:each )?be equipped with (.+)$/i, (m) => ({ per: num(m[1]), n: num(m[2]), who: m[3], value: m[4] })],
    // If this unit contains 10 or more models, … (a floor on an otherwise ordinary sentence)
    [/^If this unit contains (\d+) or more models, (.+)$/i, (m) => ({ floor: Number(m[1]), rest: cap(m[2]) })],
    // Any number of <who> can each have their X replaced with … / replace their X with … / be equipped with …
    [/^Any number of (.+?) can (?:each )?have (?:its|their) (.+?) replaced with (.+)$/i, (m) => ({ who: m[1], given: m[2], value: m[3] })],
    [/^Any number of (.+?) can (?:each )?replace (?:its|their) (.+?) with (.+)$/i, (m) => ({ who: m[1], given: m[2], value: m[3] })],
    [/^Any number of (.+?) can (?:each )?be equipped with (.+)$/i, (m) => ({ who: m[1], value: m[2] })],
    [/^Any number of (.+?)(?:’s|s’) (.+?) can each be replaced with (.+)$/i, (m) => ({ who: m[1], given: m[2], value: m[3] })],
    // Up to 2 <who> can each have their X replaced with … / be equipped with …
    [/^Up to (\d+) (.+?) can (?:each )?have (?:its|their) (.+?) replaced with (.+)$/i, (m) => ({ n: Number(m[1]), who: m[2], given: m[3], value: m[4] })],
    [/^Up to (\d+) (.+?) can (?:each )?replace (?:its|their) (.+?) with (.+)$/i, (m) => ({ n: Number(m[1]), who: m[2], given: m[3], value: m[4] })],
    [/^Up to (\d+) (.+?) can (?:each )?be equipped with (.+)$/i, (m) => ({ n: Number(m[1]), who: m[2], value: m[3] })],
    // This model’s X can be replaced with … / Each|Both|2 of this model’s X …
    [/^This model’s (.+?) can be replaced with (.+)$/i, (m) => ({ n: 1, given: m[1], value: m[2] })],
    [/^(Each|Both|\d+) of this model’s (.+?) can be replaced with (.+)$/i, (m) => ({ n: 1, copies: m[1], given: m[2], value: m[3] })],
    [/^This (?:model|unit) can be equipped with (.+)$/i, (m) => ({ n: 1, value: m[1] })],
    [/^This model must be equipped with (.+)$/i, (m) => ({ n: 1, value: m[1], must: true })],
    // 1 <who>’s X can be replaced with … / One model can replace its X with … / 1 model can be equipped with …
    [/^(\d+|One) (.+?)(?:’s|s’) (.+?) can be replaced with (.+)$/i, (m) => ({ n: num(m[1]), who: m[2], given: m[3], value: m[4] })],
    [/^(\d+|One) (.+?) can (?:each )?replace (?:its|their) (.+?) with (.+)$/i, (m) => ({ n: num(m[1]), who: m[2], given: m[3], value: m[4] })],
    [/^(\d+|One) (.+?) can (?:each )?have (?:its|their) (.+?) replaced with (.+)$/i, (m) => ({ n: num(m[1]), who: m[2], given: m[3], value: m[4] })],
    [/^(\d+|One) (.+?) can (?:each )?be equipped with (.+)$/i, (m) => ({ n: num(m[1]), who: m[2], value: m[3] })],
    // The <who>’s X can be replaced with … / The <who> can be equipped with …
    [/^(?:The |An |A )?([A-Z].*?)(?:’s|s’) (.+?) can be replaced with (.+)$/, (m) => ({ n: 1, who: m[1], given: m[2], value: m[3] })],
    [/^(?:The |An |A )?([A-Z].*?) can be equipped with (.+)$/, (m) => ({ n: 1, who: m[1], value: m[2] })],
  ]
  let f = null
  for (const [re, read] of forms) { const m = head.match(re); if (m) { f = read(m); break } }
  if (!f) return null
  if (f.rest) {
    const inner = parseOption([f.rest, ...lines.slice(1)].join('\n'), ctx)
    if (!inner || inner.none) return null
    inner.floor = f.floor
    return inner
  }

  // WHO → a profile index, unit-wide, or one model of a single-profile unit. "models"/"model" is
  // generic: the whole unit. A qualifier after the name ("Kill Team Intercessors with plasma
  // incinerators", "model equipped with a heavy bolt rifle") narrows to a subset this reader
  // cannot see, so it is dropped with a note rather than refused.
  let who = f.who ? clean(f.who).replace(/\s+models?$/i, '') : null
  let note = null
  let qualifier = null
  if (who) {
    const q = who.match(/^(.+?) (?:equipped )?with (?:a |an |1 )?(.+)$/i)
    // …unless the whole phrase IS a profile ("Kill Team Intercessors with plasma incinerators").
    if (q && findMini(who) == null && (/^models?$/i.test(q[1]) || findMini(q[1]) != null)) { qualifier = q[2]; who = q[1] }
  }
  let m = null, all = false
  if (!who || /^(models?|this model)$/i.test(who)) { if (!single) all = true; else m = 0 }
  else {
    const mi = findMini(who)
    if (mi == null) return { fail: `subject "${who}"` }
    m = mi
  }
  // A generic "model" on a multi-profile unit with an unbounded count is unit-wide; a single
  // model's own sentence is that profile (or the only one).
  if (single) { all = false; m = 0 }

  const value = parseValue(f.value, bullets)
  if (!value) return { fail: `value "${unstar(clean(f.value)).slice(0, 60)}"` }

  const g = { m, all, qualifier, given: f.given ? clean(f.given) : null, options: value.options, note, must: !!f.must }
  if (f.cond) g.cond = f.cond
  // HOW MANY → the pick control and its cap. One model: a checkbox (or a stepper for "up to N
  // hunter-killer missiles" on one model). Several: a stepper, capped by n / the per-5 table /
  // nothing ("any number").
  const single1 = f.n === 1 && !f.per
  g.in = single1 && !value.stepper ? 'checkbox' : 'stepper'
  if (single1 && value.stepper) g.lim = [[0, value.limit, value.dup]]
  else if (single1) { if (value.limit > 1) g.lim = [[0, value.limit, value.dup]] }
  else if (f.per) {
    const rows = []
    for (let k = 1; k * f.per <= maxModels; k++) rows.push([k * f.per, k * f.n])
    if (!rows.length) return { fail: `"for every ${f.per}" on a ${maxModels}-model unit` }
    g.lim = rows
  } else if (f.n != null) g.lim = [[0, f.n]]
  if (f.floor) g.lim = (g.lim || [[0, 1]]).map((r) => [Math.max(r[0], f.floor), ...r.slice(1)])
  if (f.copies) g.copies = f.copies // "Each of"/"Both of"/"2 of this model's X": per copy
  return g
}

// ---- The unit ----------------------------------------------------------------------------------
// `sheet` is the datasheet entry; `ctx` carries the faction's other units (for Leader targets),
// the interners and the report. Returns the roster unit, or null when the sheet cannot be read.
export function packRosterUnit(sheet, ctx) {
  const { report, item, text, unitIdByName, allegFor } = ctx
  const who = sheet.name
  const minis = parseComposition(sheet.composition, report, who)
  if (!minis) return null
  const single = minis.length === 1
  const miniDict = new Map()
  for (const [i, mi] of minis.entries()) {
    for (const c of singulars(norm(mi.n))) miniDict.set(c, i)
    for (const a of mi.aliases || []) miniDict.set(norm(a), i)
  }
  const findMini = (name) => {
    const n = norm(name).replace(/^(the|every|each|an?)\s+/, '').replace(/\s+models?$/, '')
    for (const c of singulars(n)) if (miniDict.has(c)) return miniDict.get(c)
    const k = pkey(n)
    for (const [key, i] of miniDict) if (pkey(key) === k) return i
    if (single && /^(model|models)$/.test(n)) return 0
    return null
  }

  const sz = sizes(sheet.points, minis, report, who)
  if (!sz.length) { report.noPoints.push(who); return null }
  const maxModels = Math.max(...sz.map((s) => s.per[1]))

  // Item names the sheet itself prints — weapon profiles and wargear abilities — so an option's
  // "1 hunter-killer missile" resolves to the sheet's own "Hunter-killer missile" spelling.
  const printed = new Map()
  for (const w of [...(sheet.ranged || []), ...(sheet.melee || [])]) {
    const n = w.name.replace(/\s+–\s+.*$/, '')
    printed.set(norm(n), n)
  }
  for (const a of sheet.wargearAbilities || []) printed.set(norm(a.name), a.name)
  const seenItems = new Map() // every item name this unit resolved → id (conditions look here)
  const resolve = (raw) => {
    const hit = findName(raw, printed)
    const bare = clean(raw).replace(/^\d+\s+/, '')
    if (!hit) report.unknownItem.push(`${who}: "${bare}"`)
    const id = item(hit || cap(bare))
    seenItems.set(norm(hit || bare), id)
    return id
  }

  const loadout = parseLoadout(sheet.loadout, minis, findMini, report, who)
  const defaults = []
  const defaultNames = new Map() // mini → Map(norm name → id)
  if (loadout) {
    for (const [mi, { each, total }] of [...loadout].sort((a, b) => a[0] - b[0])) {
      const row = []
      const dict = new Map()
      const add = (n, isTotal) => {
        const m = n.match(/^(\d+)\s+(.+)$/)
        const id = resolve(m ? m[2] : n)
        const count = m ? Number(m[1]) : 1
        const at = isTotal ? row.find(([i, , t]) => i === id && t) : null
        if (at) at[1] += count
        else row.push(isTotal ? [id, count, 1] : [id, count])
        for (const c of singulars(norm(m ? m[2] : n))) dict.set(c, id)
      }
      for (const n of each) add(n, false)
      for (const n of total) add(n, true)
      defaults.push([mi, row])
      defaultNames.set(mi, dict)
    }
  }

  const gear = []
  const drafts = []
  const ctxOpt = { single, findMini, maxModels }
  // "The Assault Sergeant can do one of the following: ▪ Replace its X with 1 Y. ▪ Be equipped
  // with 1 Z." — one choice written as two sentences. Each bullet becomes a group of its own, the
  // later ones gated on the first being untouched (the same one-sided exclusion the appdata
  // reader gives a daemonic icon / instrument pair).
  const optionTexts = []
  for (const raw of sheet.options || []) {
    const lines = String(raw).split('\n').map((s) => s.trim()).filter(Boolean)
    const dm = clean(lines[0]).match(/^(?:The )?(.+?) can do one of the following:$/i)
    const heads = dm && lines.length > 1 ? lines.slice(1).map((l) => l.replace(/^[▪◦•■▫]\s*/, '')).map((b) => {
      let m
      if ((m = b.match(/^Replace its (.+?) with (.+)$/i))) return `The ${dm[1]}’s ${m[1]} can be replaced with ${m[2]}`
      if ((m = b.match(/^Be equipped with (.+)$/i))) return `The ${dm[1]} can be equipped with ${m[1]}`
      return null
    }) : null
    if (heads?.every(Boolean)) heads.forEach((head, i) => optionTexts.push({ raw, head, exclusive: i > 0 }))
    else optionTexts.push({ raw })
  }
  let firstOfDo = null
  for (const { raw, head, exclusive } of optionTexts) {
    const opt = parseOption(head || raw, ctxOpt)
    if (opt?.none) continue
    if (!opt || opt.fail) { report.option.push(`${who}: ${opt?.fail || 'no template'} — ${String(raw).split('\n')[0].slice(0, 80)}`); continue }
    // "1 model equipped with a melta rifle" on a many-profile team names the profile that carries
    // it — when exactly one does; otherwise the qualifier is dropped with a note.
    if (opt.qualifier && opt.all) {
      const carriers = [...defaultNames].filter(([, dict]) => findName(opt.qualifier, dict) != null).map(([mi]) => mi)
      if (carriers.length === 1) { opt.all = false; opt.m = carriers[0] }
      else opt.note = `qualifier "${opt.qualifier}" ignored`
    } else if (opt.qualifier) opt.note = `qualifier "${opt.qualifier}" ignored`
    if (opt.note) report.note.push(`${who}: ${opt.note} — ${String(raw).split('\n')[0].slice(0, 70)}`)
    if (opt.must) report.note.push(`${who}: "must be equipped with" read as an ordinary choice`)
    // What is given up → item ids in the profile's printed loadout; an unresolved phrase leaves
    // the group without `rep` (the stock rule and the loadout line then leave it alone).
    let rep = null
    if (opt.given) {
      const dicts = opt.all ? [...defaultNames.values()] : [defaultNames.get(opt.m)].filter(Boolean)
      const merged = new Map(dicts.flatMap((d) => [...d]))
      const parts = opt.given.split(/,\s*|\s+and\s+/i).map((s) => s.trim()).filter(Boolean)
      const ids = parts.map((p) => findName(p, merged))
      if (ids.every((x) => x != null)) rep = [...new Set(ids)]
      else report.rep.push(`${who}: "${opt.given}"`)
    }
    // A generic "models" allowance whose swap only ONE profile can make ("Up to 3 models can each
    // have their storm bolter replaced…" on a team where only the Terminators carry one) belongs
    // to that profile — the reading every per-profile cap and the loadout line need.
    if (opt.all && rep?.length) {
      const carriers = [...defaultNames].filter(([, dict]) => rep.every((id) => [...dict.values()].includes(id))).map(([mi]) => mi)
      if (carriers.length === 1) { opt.all = false; opt.m = carriers[0] }
    }
    const grp = { ...(opt.all ? { all: 1 } : { m: opt.m }), t: text(String(raw)), in: opt.in, o: opt.options.map((set) => [set.length === 1 && set[0][1] === 1 ? resolve(set[0][0]) : set.map(([n, c]) => [resolve(n), c])]) }
    if (opt.lim) grp.lim = opt.lim
    if (rep) grp.rep = rep
    // "Each of this model's 2 X" / "Both of" — one swap per copy: the loadout count is the cap.
    if (opt.copies && rep?.length) {
      const row = defaults.find(([mi]) => mi === opt.m)?.[1] || []
      const copies = /^\d+$/.test(opt.copies) ? Number(opt.copies) : Math.max(1, ...rep.map((id) => row.find(([i]) => i === id)?.[1] || 1))
      if (copies > 1) { grp.cp = copies; grp.in = 'stepper' }
    }
    if (rep?.length && grp.in !== 'stepper' && /^\s*(?:all models|any number of)\b/i.test(String(raw))) grp.repall = 1
    if (head && !exclusive) firstOfDo = grp
    else if (head && firstOfDo) grp.cond = [gear.indexOf(firstOfDo), 0]
    drafts.push({ grp, cond: opt.cond, m: opt.m, all: opt.all })
    gear.push(grp)
  }
  // "[not] equipped with X" → a sibling on the same profile whose sole option is X (its toggle),
  // or whose swap gives X up; anything else stays ungated, as the appdata reader does.
  const grants = (grp) => grp.o.flatMap((o) => (Array.isArray(o[0]) ? o[0].map(([id]) => id) : [o[0]]))
  for (const d of drafts) {
    if (!d.cond) continue
    const [name, positive] = d.cond
    const id = findName(name, seenItems)
    // A sibling whose pick GRANTS the item (its only option, or a bundle — the Inquisitor's
    // "psychic gifts and psychic shock wave") gates positively; one whose swap GIVES IT UP, the
    // other way round.
    const sib = id && drafts.find((s) => s !== d && s.m === d.m && grants(s.grp).includes(id) && !s.grp.rep?.includes(id))
    if (sib) { d.grp.cond = [gear.indexOf(sib.grp), positive ? 1 : 0]; continue }
    const repSib = id && drafts.find((s) => s !== d && s.m === d.m && s.grp.rep?.includes(id))
    if (repSib) { d.grp.cond = [gear.indexOf(repSib.grp), positive ? 0 : 1]; continue }
    report.note.push(`${who}: condition "${name}" left ungated`)
  }

  const kws = sheet.keywords || []
  const flags = { legends: 1 }
  const has = (k) => kws.some((x) => norm(x) === norm(k))
  if (has('Character')) flags.char = 1
  if (has('Epic Hero')) flags.epic = 1
  if (/even if .* already been attached/i.test(sheet.leader?.footer || '')) flags.alongside = 1

  const unit = { id: sheet.id, name: sheet.name, kws, flags, sizes: sz, linked: 1 }
  if (!single) unit.minis = minis.map((m) => ({ n: m.n }))
  if (defaults.length) unit.defaults = defaults
  if (gear.length) unit.gear = gear
  const alleg = allegFor?.(sheet)
  if (alleg) unit.alleg = alleg
  if (sheet.leader?.units?.length) {
    const type = (sheet.core || '').split(/,\s*/).some((c) => /^support$/i.test(c)) && !/^leader$/i.test(sheet.core || '') ? 'support' : 'leader'
    const leads = []
    const leadKw = []
    for (const name of sheet.leader.units) {
      const to = unitIdByName.get(norm(name))
      if (to) { leads.push({ to, type }); continue }
      // "Imperium Battleline Infantry" is keywords, not a unit: kept as `leadKw` (the runtime asks
      // the units actually in the list) and resolved here against this faction's own units.
      const kw = name.split(/\s+/)
      const hits = ctx.unitsByKw?.(kw) || []
      if (hits.length) {
        leadKw.push({ kw, type })
        for (const id of hits) if (id !== sheet.id) leads.push({ to: id, type })
      } else report.lead.push(`${who} → ${name}`)
    }
    const seen = new Set()
    const unique = leads.filter((l) => !seen.has(`${l.to}|${l.type}`) && seen.add(`${l.to}|${l.type}`))
    if (unique.length) unit.leads = unique
    if (leadKw.length) unit.leadKw = leadKw
  }
  return unit
}

export function emptyPackReport() {
  return { units: 0, composition: [], bracket: [], noPoints: [], loadout: [], option: [], rep: [], unknownItem: [], note: [], lead: [] }
}
