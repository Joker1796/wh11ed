// Read an army list somebody else's tool wrote, and turn it into one of ours.
//
// THE TWO FORMATS THAT MATTER (see rosterExport.js for the same two on the way out):
//   gw   the Warhammer 40,000 app's 11th-edition export — what a player has in their clipboard
//        after building a list in the app, and what tournament organisers ask for.
//   wtc  the tournament header format (New Recruit's "WTC" and its "NR-GW" sibling, which share
//        the `+++` header block).
//
// BEST-EFFORT, NEVER SILENT. A list is prose written by another program against another points
// file: names drift, weapons are spelled differently, a datasheet may not exist in our data at all.
// So every step reports what it could not place — `report.units[].gear.missing`, `report.missing`,
// and the points COMPUTED here beside the points the text STATED. A unit is never dropped quietly:
// what we failed to match is what the reader has to fix by hand, and they can only fix what they
// are shown.
//
// POINTS ARE NEVER TRUSTED FROM THE TEXT. They are recomputed from our own MFM data; the stated
// figure rides along only so the difference can be shown. A list exported against last month's
// points is not a bug in the import.
import { factionGroups } from '../data/factionsIndex.js'
import { optionItems, optionLabel, unitPoints } from './rosterEngine.js'

// GW's own section headings, plus the 10th-edition ones an older export may still carry.
const SECTIONS = /^(CHARACTERS?|EPIC HEROES|BATTLELINE|DEDICATED TRANSPORTS|OTHER DATASHEETS|ALLIED UNITS)$/
const BATTLE_SIZES = /^(Combat Patrol|Incursion|Strike Force|Onslaught|Custom)$/

// Apostrophes are the single most common reason a name fails to match: the app writes T’au with a
// typographic one, our data and half the community write T'au.
export const norm = (s) => (s || '')
  .replace(/[‘’ʼ`´]/g, "'")
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase()

// ── format detection ─────────────────────────────────────────────────────────────────────────

export function detectFormat(text) {
  const t = text || ''
  if (/^\s*\++\s*$/m.test(t) && /^\+ (FACTION KEYWORD|TOTAL ARMY POINTS):/m.test(t)) return 'wtc'
  if (/^Attached Unit \d+$/m.test(t) || /^Exported with App Version:/m.test(t) || SECTIONS.test(t)) return 'gw'
  if (/\(\d+ points\)/.test(t)) return 'gw'
  return null
}

// ── the GW app ───────────────────────────────────────────────────────────────────────────────

// One unit's indented body. The app nests weapons UNDER a model line when the unit has more than
// one model ("• 2x Chaos Spawn" → "  • 2x Hideous mutations"), and prints them directly when it has
// one. Both shapes indent the same, so the tell is the BULLET: a bulleted line at depth 4 means the
// depth-2 lines above it are model groups; an unbulleted one is the second weapon of a single model.
function gwBody(entries) {
  const nested = entries.some((e) => e.indent >= 4 && e.bullet)
  if (!nested) return { models: null, weapons: entries.map(({ n, name }) => ({ n, name, mini: null })) }
  const top = Math.min(...entries.map((e) => e.indent))
  let models = 0
  let mini = null
  const weapons = []
  for (const e of entries) {
    // The model line names the profile the weapons under it belong to — which is what lets the
    // matcher tell the sergeant's plasma pistol from the squad's.
    if (e.indent === top) { models += e.n; mini = e.name; continue }
    weapons.push({ n: e.n, name: e.name, mini })
  }
  return { models: models || null, weapons }
}

function parseGw(text) {
  const out = { format: 'gw', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [] }
  let unit = null
  let entries = []
  let group = null       // the `Attached Unit N` this unit belongs to, if any
  let seenHeader = false
  let lastPlain = ''

  const flush = () => {
    if (!unit) return
    Object.assign(unit, gwBody(entries))
    out.units.push(unit)
    unit = null
    entries = []
  }

  for (const raw of (text || '').split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, '')
    if (!line.trim()) continue
    const indent = line.match(/^ */)[0].length
    const t = line.trim()

    if (/^Exported with/.test(t)) { flush(); break }
    if (t === 'Attached Units') { flush(); continue }
    const att = t.match(/^Attached Unit (\d+)$/)
    if (att) { flush(); group = `g${att[1]}`; continue }
    if (SECTIONS.test(t)) { flush(); group = null; continue }
    if (/^Force Dispositions:/.test(t)) continue

    const dets = t.match(/^(.+?) \((\d+) Detachment Points?\)$/)
    if (dets) {
      out.detachments = dets[1].split(/,\s*|\s+and\s+/).map((s) => s.trim()).filter(Boolean)
      continue
    }

    const head = indent === 0 && t.match(/^(.+?) \((\d+) points\)$/)
    if (head) {
      const [, name, pts] = head
      if (!seenHeader) { out.name = name; out.stated = +pts; seenHeader = true; continue }
      if (BATTLE_SIZES.test(name)) { out.limit = +pts; out.faction = out.faction || lastPlain; continue }
      flush()
      unit = { name, pts: +pts, group, role: null, warlord: false, enh: null, alleg: null, attachedAs: null }
      continue
    }

    if (unit) {
      const as = t.match(/^• Attached as: (.+)$/)
      if (as) { unit.attachedAs = as[1]; continue }
      if (/^• Warlord$/.test(t)) { unit.warlord = true; continue }
      const enh = t.match(/^• Enhancement: (.+?)(?: \(Upgrade\))?$/)
      if (enh) { unit.enh = enh[1]; continue }
      const item = t.match(/^(•\s*)?(?:(\d+)x )?(.+)$/)
      if (item) {
        // A "Label: Value" line that isn't a weapon is the allegiance the rules make you note.
        const mark = item[3].match(/^([^:]+): (.+)$/)
        if (mark && !/^\d/.test(item[3])) { unit.alleg = mark[2]; continue }
        entries.push({ indent, bullet: !!item[1], n: +(item[2] || 1), name: item[3] })
      }
      continue
    }
    // A bare line before the battle size is the faction ("World Eaters").
    if (indent === 0) lastPlain = t
  }
  flush()
  if (!out.faction) out.faction = lastPlain
  return out
}

// ── WTC / New Recruit ────────────────────────────────────────────────────────────────────────

const wtcGear = (tail) => (tail || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const m = s.match(/^(?:(\d+)x )?(.+)$/)
    return { n: +(m[1] || 1), name: m[2] }
  })

function parseWtc(text) {
  const out = { format: 'wtc', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [] }
  const warlordRef = { value: null }
  let unit = null
  const flush = () => {
    if (!unit) return
    delete unit.fromProfiles
    out.units.push(unit)
    unit = null
  }

  for (const raw of (text || '').split(/\r?\n/)) {
    const t = raw.trim()
    if (!t || /^\++$/.test(t)) continue

    const kv = t.match(/^\+ ([A-Z ]+): ?(.*)$/)
    if (kv) {
      const [, key, value] = kv
      if (key === 'FACTION KEYWORD') out.faction = value.includes(' - ') ? value.split(' - ').slice(1).join(' - ') : value
      else if (key === 'DETACHMENT') out.detachments = value.replace(/\s*\([^)]*\)\s*$/, '').split(/,\s*/).filter(Boolean)
      else if (key === 'TOTAL ARMY POINTS') out.stated = parseInt(value, 10) || 0
      else if (key === 'WARLORD') warlordRef.value = value
      continue
    }
    if (/^[+&]/.test(t)) continue   // the enhancement continuation lines are read off the units

    const enh = t.match(/^Enhancement: (.+?) \(\+?\d+ ?pts?\)$/i)
    if (enh && unit) { unit.enh = enh[1]; continue }

    const profile = t.match(/^• (?:(\d+)x )?(.+?): (.*)$/)
    if (profile && unit) {
      // The head line already stated the unit's size ("10x Khorne Berzerkers"); the profile lines
      // then break that same 10 down. They REPLACE the head's count rather than adding to it.
      if (!unit.fromProfiles) { unit.models = 0; unit.fromProfiles = true }
      unit.models += +(profile[1] || 1)
      unit.weapons.push(...wtcGear(profile[3]).map((g) => ({ ...g, mini: profile[2] })))
      continue
    }

    const head = t.match(/^(?:(Char\d+): )?(?:(\d+)x )?(.+?) \((\d+) ?pts?\)(?:: (.*))?$/i)
    if (head) {
      flush()
      const [, ref, n, name, pts, tail] = head
      unit = { name, pts: +pts, ref: ref || null, group: null, warlord: false, enh: null, alleg: null, models: null, weapons: [], fromProfiles: false }
      for (const g of wtcGear(tail)) {
        if (/^warlord$/i.test(g.name)) { unit.warlord = true; continue }
        const mark = g.name.match(/^([^:]+): (.+)$/)
        if (mark) { unit.alleg = mark[2]; continue }
        unit.weapons.push(g)
      }
      // A `• 1x Profile:` line sets the model count itself; a plain `10x Unit` head carries it.
      if (n) unit.models = +n
      continue
    }
  }
  flush()

  if (warlordRef.value) {
    const ref = warlordRef.value.split(':')[0].trim()
    const name = norm(warlordRef.value.split(':').slice(1).join(':') || warlordRef.value)
    const hit = out.units.find((u) => u.ref === ref) || out.units.find((u) => norm(u.name) === name)
    if (hit) hit.warlord = true
  }
  return out
}

export function parseList(text, format = null) {
  const f = format || detectFormat(text)
  if (f === 'wtc') return parseWtc(text)
  if (f === 'gw') return parseGw(text)
  return null
}

// ── matching a parsed list against our own data ──────────────────────────────────────────────

// The faction the list names, as one of ours. WTC writes the alliance in front ("Xenos - Aeldari"),
// which parseWtc has already stripped.
export function matchFaction(name) {
  const want = norm(name)
  if (!want) return null
  for (const g of factionGroups) {
    for (const f of g.factions) {
      if (norm(f.name) === want) return f.slug
    }
  }
  for (const g of factionGroups) {
    for (const f of g.factions) {
      if (want.includes(norm(f.name)) || norm(f.name).includes(want)) return f.slug
    }
  }
  return null
}

// Every wargear option of a datasheet, by the names it could be written under: the option's own
// label ("Hexrifle + Torturer's tool") and each item inside it.
function optionIndex(def, items) {
  const idx = new Map()
  const put = (key, ref) => {
    if (!key) return
    if (!idx.has(key)) idx.set(key, [])
    idx.get(key).push(ref)
  }
  def?.gear?.forEach((g, gi) => {
    g.o?.forEach((o, oi) => {
      const ref = { gi, oi, m: g.m ?? 0, stepper: g.in === 'stepper' }
      put(norm(optionLabel(o, items)), ref)
      const inside = optionItems(o)
      if (inside.length === 1) put(norm(items?.[inside[0][0]]), ref)
    })
  })
  return idx
}

// Which miniature profile a weapon line was printed under, as an index into `def.minis` — the
// sergeant and the squad often have a group each offering the same weapon, and picking the wrong
// one prices the unit wrong.
function miniIndexOf(def, name) {
  if (!name || !(def?.minis?.length > 1)) return null
  const want = norm(name)
  const hit = def.minis.findIndex((m) => norm(m?.n) === want)
  return hit >= 0 ? hit : null
}

const defaultNames = (def, items) => new Set(
  (def?.defaults || []).flatMap(([, list]) => list.map(([id]) => norm(items?.[id]))).filter(Boolean),
)

// The size bracket whose model range holds `models`; the datasheet's own default when the list
// doesn't say (a single-model unit, or a format that omits the count).
function sizeIndexFor(def, models) {
  const sizes = def?.sizes || []
  if (models) {
    const hit = sizes.findIndex((s) => models >= (s.per?.[0] ?? 1) && models <= (s.per?.[1] ?? s.per?.[0] ?? 1))
    if (hit >= 0) return hit
  }
  const def0 = sizes.findIndex((s) => s.default)
  return def0 >= 0 ? def0 : 0
}

// Turn a parsed list into a roster payload plus a report of everything that did not land.
// `faction` is the ROSTER bundle (src/data/roster/<slug>.js), not the rules one.
export function matchRoster(parsed, { faction, core, items } = {}) {
  // `stated` is the list's own header total (which includes units we may have failed to match);
  // `statedUnits` sums only the units that DID match, so the two figures beside `computed` say
  // whether a difference is our points data or a unit that went missing.
  const report = { name: parsed?.name || '', units: [], missing: [], detachments: { matched: [], missing: [] }, points: { stated: parsed?.stated || 0, statedUnits: 0, computed: 0 } }
  if (!parsed || !faction) return { payload: null, report }

  for (const d of parsed.detachments || []) {
    const hit = (faction.detachments || []).find((x) => norm(x.name) === norm(d))
    if (hit) report.detachments.matched.push(hit.name)
    else report.detachments.missing.push(d)
  }

  const battle = (core?.battleSizes || []).find((b) => b.points === parsed.limit)
  const payload = {
    name: parsed.name || 'Roster',
    faction: faction.slug,
    detachments: report.detachments.matched,
    battleSize: battle?.id || (parsed.limit ? 'custom' : 'strike-force'),
    units: [],
  }
  if (!battle && parsed.limit) payload.customPoints = parsed.limit

  const byName = new Map((faction.units || []).map((u) => [norm(u.name), u]))
  const copies = new Map()
  const groups = new Map()

  for (const pu of parsed.units || []) {
    const def = byName.get(norm(pu.name))
    if (!def) { report.missing.push({ name: pu.name, pts: pu.pts }); continue }

    const size = sizeIndexFor(def, pu.models)
    const bracket = def.sizes?.[size]
    const entry = { uid: `i${payload.units.length + 1}`, id: def.id, size }
    if (pu.models && (bracket?.per?.[1] ?? 0) > (bracket?.per?.[0] ?? 0)) entry.count = pu.models
    if (pu.warlord) entry.warlord = true
    if (pu.alleg) entry.alleg = pu.alleg

    const line = { name: def.name, id: def.id, models: pu.models || null, gear: { picked: [], missing: [] }, enh: null, points: { stated: pu.pts, computed: 0 } }

    // Wargear: only what DEVIATES from the printed loadout is a pick. Everything the datasheet
    // already comes with is in the text too, and must not be read as a choice.
    const printed = defaultNames(def, items)
    const idx = optionIndex(def, items)
    const picks = new Map()
    for (const w of pu.weapons || []) {
      const key = norm(w.name)
      if (!key || printed.has(key)) continue
      const refs = idx.get(key)
      if (!refs?.length) { line.gear.missing.push(w.name); continue }
      const want = miniIndexOf(def, w.mini)
      const ref = (want != null && refs.find((r) => r.m === want)) || refs[0]
      // The same option named twice (once per profile) is ONE pick, not two — two triples would
      // charge the unit twice for it.
      const k = `${ref.gi}:${ref.oi}`
      const at = picks.get(k)
      if (at) { if (ref.stepper) at[2] += (w.n || 1) } else picks.set(k, [ref.gi, ref.oi, ref.stepper ? (w.n || 1) : 1])
      line.gear.picked.push(w.name)
    }
    if (picks.size) entry.wg = [...picks.values()]

    if (pu.enh) {
      const found = (faction.detachments || [])
        .filter((d) => payload.detachments.includes(d.name))
        .flatMap((d) => d.enhancements || [])
        .find((e) => norm(e.name) === norm(pu.enh))
      if (found) entry.enh = found.name
      line.enh = { name: pu.enh, ok: !!found }
    }

    const copy = (copies.get(def.id) || 0) + 1
    copies.set(def.id, copy)
    const dets = (faction.detachments || []).filter((d) => payload.detachments.includes(d.name))
    line.points.computed = unitPoints(def, entry, copy, dets)
    report.points.computed += line.points.computed
    report.points.statedUnits += pu.pts || 0

    payload.units.push(entry)
    report.units.push(line)

    if (pu.group) {
      if (!groups.has(pu.group)) groups.set(pu.group, [])
      groups.get(pu.group).push({ entry, attachedAs: pu.attachedAs })
    }
  }

  // Attached units: the app blocks a leader with the unit it joined, so the block IS the link.
  for (const members of groups.values()) {
    const body = members.find((m) => /^bodyguard/i.test(m.attachedAs || ''))
    if (!body) continue
    for (const m of members) {
      if (m === body || !/^leader/i.test(m.attachedAs || '')) continue
      m.entry.leaderOf = body.entry.uid
    }
  }

  return { payload, report }
}
