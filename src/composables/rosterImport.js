// Read an army list somebody else's tool wrote, and turn it into one of ours.
//
// THE FORMATS (see rosterExport.js for the ones we write):
//   gw   the Warhammer 40,000 app's 11th-edition export — what a player has in their clipboard
//        after building a list in the app, and what tournament organisers ask for. listhammer.info
//        writes the SAME grammar in its detailed ("with wargear") mode, so one parser reads both;
//        the differences it tolerates rather than forks over are all cosmetic: capitalised
//        "Points", a thousands separator (2.000), `◦` for the weapons under a model line, plural
//        "Enhancements:", and a bare Force Disposition line where the app writes a labelled one.
//   listhammer-compact  the same site's short mode: one line per unit, attached units joined with
//        " + ", model counts, and no wargear. What shapes the import screen is what it does NOT
//        carry: no faction, no detachment and no battle size anywhere in the text, so the faction
//        has to be asked for. See parseListhammerCompact.
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
import { allySourceOf, optionItems, optionLabel, unitPoints } from './rosterEngine.js'

// GW's own section headings, plus the 10th-edition ones an older export may still carry.
// `m` so detectFormat can test it against a whole pasted list; parseGw tests it a line at a time.
const SECTIONS = /^(CHARACTERS?|EPIC HEROES|BATTLELINE|DEDICATED TRANSPORTS|OTHER DATASHEETS|ALLIED UNITS)$/m
const BATTLE_SIZES = /^(Combat Patrol|Incursion|Strike Force|Onslaught|Custom)$/

// Bullets. The app writes `•` at every depth; listhammer writes `•` for a model line and `◦` for
// the weapons under it. Both mean "this line is a bullet", which is the tell the nesting rule in
// gwBody() reads — miss it and every weapon is taken for a model.
const BULLET = '[\u2022\u25e6\u2023\u25aa*]'
// "Khârn the Betrayer (115 points)", "Ghazghkull Thraka (235 Points)", "Dakka  (2.000 Points)".
const POINTS_LINE = new RegExp(`^(.+?)\\s*\\((\\d[\\d.,\\u00a0 ]*)\\s*points?\\)$`, 'i')
// Points are whole numbers: a dot, comma or space inside one is a thousands separator, not a
// decimal point — listhammer writes a 2000-point list as "2.000 Points".
const num = (s) => +String(s).replace(/\D/g, '')

// Apostrophes are the single most common reason a name fails to match: the app writes T’au with a
// typographic one, our data and half the community write T'au.
export const norm = (s) => (s || '')
  .replace(/[‘’ʼ`´]/g, "'")
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase()

// Exactly one of our own faction names — used to tell a list titled after its author from a list
// whose header line is the faction itself. Deliberately strict, unlike matchFaction's fallback
// pass: a loose match here would eat the title of a list called "Orks go fast".
const isFactionName = (t) => factionGroups.some((g) => g.factions.some((f) => norm(f.name) === norm(t)))

// ── format detection ─────────────────────────────────────────────────────────────────────────

export function detectFormat(text) {
  const t = text || ''
  if (/^\s*\++\s*$/m.test(t) && /^\+ (FACTION KEYWORD|TOTAL ARMY POINTS):/m.test(t)) return 'wtc'
  if (isCompactList(t)) return 'listhammer-compact'
  if (/^attached units?( \d+)?$/im.test(t) || /^Exported with App Version:/m.test(t) || SECTIONS.test(t)) return 'gw'
  // Last resort: any line that prices something. Not just the first — a list's own title line is
  // sometimes unpriced, and then the only points in the file are on its units.
  if (/\((\d[\d.,\u00a0 ]*)\s*points?\)/i.test(t)) return 'gw'
  return null
}

// The short listhammer mode carries no marker of its own except a footer nobody is obliged to
// paste, so it is recognised by what it LACKS: nothing is bulleted, and only the header line
// prices anything — every other line is a bare unit (or an enhancement note under one).
function isCompactList(text) {
  const lines = (text || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const bullet = new RegExp(`^${BULLET}`)
  if (lines.some((l) => bullet.test(l))) return false
  const body = lines.filter((l) => !/^Exported (with|from)/i.test(l))
  if (body.length < 3 || !POINTS_LINE.test(body[0])) return false
  return !body.slice(1).some((l) => POINTS_LINE.test(l))
}

// ── the GW app ───────────────────────────────────────────────────────────────────────────────

// One unit's indented body. The app nests weapons UNDER a model line when the unit has more than
// one model ("• 2x Chaos Spawn" → "  • 2x Hideous mutations"), and prints them directly when it has
// one. Both shapes indent the same, so the tell is the BULLET: a bulleted line at depth 4 means the
// depth-2 lines above it are model groups; an unbulleted one is the second weapon of a single model.
function gwBody(entries) {
  const nested = entries.some((e) => e.indent >= 4 && e.bullet)
  if (!nested) {
    // Indentation is the ONLY thing separating a model line from a weapon here, and a paste can
    // arrive with it stripped (copied out of a rendered page rather than the clipboard export) —
    // every line then sits at column 0, bullets and all. So every line is offered as a candidate
    // model line, sharing objects with `weapons` so the matcher — which alone knows the
    // datasheet's profiles — can move one across instead of counting it twice.
    const weapons = entries.map(({ n, name }) => ({ n, name, mini: null }))
    return { models: null, weapons, modelLines: weapons, flatBody: true }
  }
  const top = Math.min(...entries.map((e) => e.indent))
  let models = 0
  let mini = null
  const weapons = []
  const modelLines = []
  for (const e of entries) {
    // The model line names the profile the weapons under it belong to — which is what lets the
    // matcher tell the sergeant's plasma pistol from the squad's.
    if (e.indent === top) { models += e.n; mini = e.name; modelLines.push({ n: e.n, name: e.name }); continue }
    weapons.push({ n: e.n, name: e.name, mini })
  }
  // The lines are kept as well as counted: a unit's attached extra is printed exactly like a model
  // ("• 1x Ammo Runt"), and only the datasheet knows which is which — see matchRoster.
  return { models: models || null, weapons, modelLines }
}

function parseGw(text) {
  const out = { format: 'gw', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [] }
  let unit = null
  let entries = []
  let group = null       // the `Attached Unit N` this unit belongs to, if any
  let seenHeader = false
  // The header is everything before the army starts being described: the title (which can run to a
  // dozen lines), the faction, the detachment line, the battle size. A priced line inside it is the
  // LIST's points, not a unit's — a title can print its own points several lines below its name.
  let inHeader = true
  const plains = []      // the bare lines: the title's own continuation lines, and the faction

  const flush = () => {
    if (!unit) return
    Object.assign(unit, gwBody(entries))
    out.units.push(unit)
    unit = null
    entries = []
  }

  const AS = new RegExp(`^${BULLET}?\\s*Attached as: (.+)$`, 'i')
  const WARLORD = new RegExp(`^${BULLET}?\\s*Warlord$`, 'i')
  // The app writes one enhancement per unit and calls it "Enhancement:"; listhammer pluralises the
  // label and tags the kind after the name ("Dead Shiny Shootas (Upgrade)").
  const ENH = new RegExp(`^${BULLET}?\\s*Enhancements?:\\s*(.+?)(?:\\s*\\((?:Upgrade|Miniature|Unit)\\))?$`, 'i')
  const ITEM = new RegExp(`^(${BULLET}\\s*)?(?:(\\d+)x )?(.+)$`)

  for (const raw of (text || '').split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, '')
    if (!line.trim()) continue
    const indent = line.match(/^ */)[0].length
    const t = line.trim()

    if (/^Exported (with|from)/i.test(t)) { flush(); break }
    if (/^attached units$/i.test(t)) { flush(); inHeader = false; continue }
    const att = t.match(/^attached unit (\d+)$/i)
    if (att) { flush(); inHeader = false; group = `g${att[1]}`; continue }
    if (SECTIONS.test(t)) { flush(); inHeader = false; group = null; continue }
    if (/^Force Dispositions?:/i.test(t)) continue

    const dets = t.match(/^(.+?) \((\d+) Detachment Points?\)$/i)
    if (dets) {
      // The line joins several detachments with commas and a final "and" — but a detachment name
      // can CONTAIN "and" ("Legends of Saga and Song and Saga of the Great Wolf" is two of them),
      // and no punctuation says where one ends. Splitting here can only guess, so the raw line is
      // carried through as well and matchRoster — which knows the faction's actual detachments —
      // resolves it against them.
      inHeader = false
      out.detachmentLine = dets[1].trim()
      out.detachments = dets[1].split(/,\s*|\s+and\s+/).map((s) => s.trim()).filter(Boolean)
      continue
    }

    const head = indent === 0 && POINTS_LINE.exec(t)
    if (head) {
      const name = head[1].trim()
      const pts = num(head[2])
      if (BATTLE_SIZES.test(name)) { out.limit = pts; inHeader = false; continue }
      // Still in the header, and the list's own points haven't been read yet: this line is the
      // title's, whether or not the title already gave its name on a bare line above. A poem for a
      // list name ends "(A poem written by Luis Untermeyer c. 1922) (2000 points)", and reading
      // that as a 2000-point unit also cost the list its faction — the faction line below it was
      // swallowed as part of that unit's body.
      if (inHeader && !out.stated) {
        if (!seenHeader) { out.name = name; seenHeader = true }
        out.stated = pts
        continue
      }
      flush()
      unit = { name, pts, group, role: null, warlord: false, enh: null, alleg: null, attachedAs: null }
      continue
    }

    if (unit) {
      const as = t.match(AS)
      if (as) { unit.attachedAs = as[1]; continue }
      if (WARLORD.test(t)) { unit.warlord = true; continue }
      const enh = t.match(ENH)
      if (enh) { unit.enh = enh[1].trim(); continue }
      const item = t.match(ITEM)
      if (item) {
        // A "Label: Value" line that isn't a weapon is the allegiance the rules make you note.
        const mark = item[3].match(/^([^:]+): (.+)$/)
        if (mark && !/^\d/.test(item[3])) { unit.alleg = mark[2]; continue }
        entries.push({ indent, bullet: !!item[1], n: +(item[2] || 1), name: item[3] })
      }
      continue
    }
    if (indent !== 0) continue
    // The first bare line is the list's NAME — priced or not: listhammer omits the points from the
    // header of some lists, and without this the name took the faction's place and the import
    // failed with "unknown faction: Bootcamp 11th die Zweite". A first line that IS one of our
    // faction names is the faction, though, so a paste that starts at that line still works.
    if (!seenHeader && !isFactionName(t)) { out.name = t; seenHeader = true; continue }
    if (isFactionName(t)) inHeader = false          // the title is over once the army is named
    plains.push(t)
  }
  flush()
  // Which bare line is the faction? Not "the one after the title": a list name runs to several
  // lines as often as a player is funny, and the Force Disposition is a bare line too. So the
  // faction is the bare line that ANSWERS as one — by name, then by our looser reading — and
  // everything else is the title around it. Nothing answering leaves it empty, which the import
  // screen turns into "choose the faction" rather than into a failure.
  //
  // The LAST such line, because a Chapter is printed under its parent ("Space Marines" then "Dark
  // Angels") and the Chapter is the army: taking the first gave a Dark Angels list the Space
  // Marines data, which has no Azrael, no Deathwing Knights and neither of its detachments.
  const answers = plains.filter(isFactionName)
  const loose = plains.filter((t) => matchFaction(t))
  out.faction = answers[answers.length - 1] || loose[loose.length - 1] || plains[0] || ''
  return out
}

// ── listhammer.info, short mode ──────────────────────────────────────────────────────────────
//
// One line per unit; an attached unit is its members joined with " + ", leaders first and the
// unit they joined last — the order the site's own detailed export prints them in. The count in
// front of a name is MODELS, not units: "2x Ghazghkull Thraka" is Ghazghkull plus Makari, and
// "20x Boyz" is nineteen Boyz and a Nob. There is no wargear here at all, so an imported unit
// gets its datasheet's printed loadout and the reader adjusts from there.
function parseListhammerCompact(text) {
  const out = { format: 'listhammer-compact', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [] }
  let seenHeader = false
  let members = []
  let groups = 0

  for (const raw of (text || '').split(/\r?\n/)) {
    const t = raw.trim()
    if (!t) continue
    if (/^Exported (with|from)/i.test(t)) break

    const head = POINTS_LINE.exec(t)
    if (!seenHeader && head) { out.name = head[1].trim(); out.stated = num(head[2]); seenHeader = true; continue }

    // "Enhancement: Git-Spotter Squig" is printed UNDER the group, never beside the unit that
    // carries it, so it goes to the first member still without one — the leader, in practice.
    const enh = t.match(/^Enhancements?:\s*(.+?)(?:\s*\((?:Upgrade|Miniature|Unit)\))?$/i)
    if (enh) {
      const target = members.find((m) => !m.enh)
      if (target) target.enh = enh[1].trim()
      continue
    }

    const parts = t.split(/\s+\+\s+/).map((p) => p.trim()).filter(Boolean)
    if (!parts.length) continue
    const group = parts.length > 1 ? `g${++groups}` : null
    members = parts.map((p, i) => {
      const m = p.match(/^(?:(\d+)x\s+)?(.+)$/)
      return {
        name: m[2].trim(),
        pts: 0,
        group,
        role: null,
        warlord: false,
        enh: null,
        alleg: null,
        // The bodyguard is last; the first character is the Leader and any in between take the
        // second (Support) slot the same unit can hold.
        attachedAs: !group ? null : i === parts.length - 1 ? 'Bodyguard' : i === 0 ? 'Leader' : 'Support',
        models: m[1] ? +m[1] : null,
        weapons: [],
      }
    })
    out.units.push(...members)
  }
  return out
}

// ── WTC / New Recruit (plain and compact) ────────────────────────────────────────────────────
//
// One parser for the whole family. New Recruit writes the same `+++` header for its WTC and
// WTC-Compact exports and only varies how much of the body it spells out — the compact one folds
// the per-profile breakdown into the unit's own line — so the grammar below is deliberately
// tolerant: `•` or `*` bullets, `pts`/`points`/`pt`, a quantity with or without its `x`, and any
// `Char1:` / `Infa6:`-style reference prefix.

const PTS = '(?:pts?|points?)'
const REF = '[A-Za-z]+\\d+'

const wtcGear = (tail) => (tail || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const m = s.match(/^(?:(\d+)x? )?(?:with )?(.+)$/i)
    return { n: +(m[1] || 1), name: m[2].trim() }
  })

// The `+++ … +++` block. Returns where the body starts, so a list with no header at all still
// parses from line 0.
function wtcHeader(lines, out) {
  let i = 0
  while (i < lines.length && !lines[i].trim()) i++
  if (!lines[i]?.trim().startsWith('+++')) return 0
  i++
  for (; i < lines.length && !lines[i].trim().startsWith('+++'); i++) {
    const t = lines[i].trim()
    if (!/^[+&]/.test(t)) continue
    const content = t.slice(1).trim()

    // `& …` continues the ENHANCEMENT list above it.
    const enh = /^&/.test(t) ? content : (content.match(/^ENHANCEMENT:\s*(.*)$/i) || [])[1]
    if (enh) {
      const on = enh.match(new RegExp(`^(.*?)\\s*\\(on\\s+(${REF})?\\s*:?\\s*(.*)\\)$`, 'i'))
      out.enhancements.push(on
        ? { name: on[1].trim(), onRef: on[2] || null, onName: on[3]?.trim() || null }
        : { name: enh.trim(), onRef: null, onName: null })
      continue
    }

    const faction = content.match(/^FACTION KEYWORD:\s*(.*)$/i)
    if (faction) {
      // "Xenos - T'au Empire" — the alliance is everything before the FIRST hyphen.
      const v = faction[1].trim()
      const cut = v.indexOf('-')
      out.faction = cut === -1 ? v : v.slice(cut + 1).trim()
      continue
    }
    const det = content.match(/^DETACHMENT:\s*(.*)$/i)
    if (det) { out.detachments = det[1].replace(/\s*\([^)]*\)/g, '').split(/,\s*/).map((d) => d.trim()).filter(Boolean); continue }
    const pts = content.match(new RegExp(`^TOTAL ARMY POINTS:\\s*(\\d+)`, 'i'))
    if (pts) { out.stated = +pts[1]; continue }
    const wl = content.match(new RegExp(`^WARLORD:\\s*(${REF})?\\s*:?\\s*(.*)$`, 'i'))
    if (wl) { out.warlord = { ref: wl[1] || null, name: wl[2]?.trim() || '' }; continue }
  }
  return i + 1
}

function parseWtc(text) {
  const lines = (text || '').split(/\r?\n/).map((l) => l.replace(/\u00a0/g, ' '))
  const out = { format: 'wtc', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [], enhancements: [], warlord: null }
  const start = wtcHeader(lines, out)

  let unit = null
  let mini = null          // the profile the following indented lines belong to
  const flush = () => { if (unit) { delete unit.fromProfiles; out.units.push(unit); unit = null; mini = null } }

  for (let i = start; i < lines.length; i++) {
    const raw = lines[i]
    const t = raw.trim()
    if (!t || /^\++$/.test(t)) continue

    const enh = t.match(new RegExp(`^(?:[•*]\\s*)?Enhancement:\\s*(.*?)\\s*\\(\\+?\\d+ ?${PTS}\\)$`, 'i'))
    if (enh && unit) { unit.enh = enh[1]; continue }

    // Who this unit joined. Which side of the pair carries the line varies, so only the LINK is
    // recorded here; the matcher decides which of the two is the leader once it knows the
    // datasheets (rosterImport's `attachedTo` handling).
    const att = t.match(/^Attached to\s+(.+)$/i)
    if (att && unit) { unit.attachedTo = att[1].trim(); continue }

    if (/^[•*]/.test(t)) {
      const body = t.slice(1).trim()
      const cut = body.indexOf(':')
      const head = (cut === -1 ? body : body.slice(0, cut)).trim()
      const m = head.match(/^(?:(\d+)x? )?(.*)$/)
      const n = +(m?.[1] || 1)
      mini = m?.[2]?.trim() || null
      if (unit) {
        if (!unit.fromProfiles) { unit.models = 0; unit.fromProfiles = true }
        unit.models += n
        // Kept as well as counted, the same way gwBody keeps them: matchRoster is the only place
        // that knows whether a profile is one of this datasheet's own.
        ;(unit.modelLines || (unit.modelLines = [])).push({ n, name: mini })
        if (cut !== -1) unit.weapons.push(...wtcGear(body.slice(cut + 1)).map((g) => ({ ...g, mini })))
      }
      continue
    }

    // An indented continuation: "9 with Bolt pistol, Chainsword" under the profile above it. The
    // leading number counts MODELS, so each item it lists is carried that many times over.
    if (/^\s/.test(raw) && unit) {
      const detail = t.match(/^(\d+)?\s*(?:with\s+)?(.*)$/i)
      if (detail?.[2]) {
        const models = +(detail[1] || 1)
        unit.weapons.push(...wtcGear(detail[2]).map((g) => ({ ...g, n: g.n * models, mini })))
        continue
      }
    }

    const head = t.match(new RegExp(`^(?:(${REF}): )?(?:(\\d+)x? )?(.+?) \\((\\d+) ?${PTS}\\)(?:: (.*))?$`, 'i'))
    if (head) {
      flush()
      const [, ref, n, name, pts, tail] = head
      unit = { name, pts: +pts, ref: ref || null, group: null, warlord: false, enh: null, alleg: null, attachedTo: null, models: n ? +n : null, weapons: [], fromProfiles: false }
      mini = null
      for (const g of wtcGear(tail)) {
        if (/^warlord$/i.test(g.name)) { unit.warlord = true; continue }
        const mark = g.name.match(/^([^:]+): (.+)$/)
        if (mark) { unit.alleg = mark[2]; continue }
        unit.weapons.push({ ...g, mini: null })
      }
    }
  }
  flush()

  // The header names the warlord and every enhancement, by reference or by name. A compact export
  // may say it ONLY there, so the header is read as a source and not merely as a summary.
  if (out.warlord) {
    const want = norm(out.warlord.name)
    const hit = out.units.find((u) => u.ref === out.warlord.ref) || out.units.find((u) => norm(u.name) === want)
    if (hit) hit.warlord = true
  }
  for (const e of out.enhancements) {
    const hit = out.units.find((u) => e.onRef && u.ref === e.onRef)
      || out.units.find((u) => e.onName && norm(u.name) === norm(e.onName) && !u.enh)
    if (hit && !hit.enh) hit.enh = e.name
  }
  return out
}

export function parseList(text, format = null) {
  const f = format || detectFormat(text)
  if (f === 'wtc') return parseWtc(text)
  if (f === 'listhammer-compact') return parseListhammerCompact(text)
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
// label ("Hexrifle + Torturer's tool") and each item inside it — INCLUDING each half of a bundled
// option. An export names what the models carry, never what the option is called, so a swap for
// "1 hyperphase sword and 1 dispersion shield" arrives as two lines; indexing only single-item
// options left both unplaceable and the swap untaken, which silently imported a Lychguard unit
// still holding its printed warscythes.
function optionIndex(def, items) {
  const idx = new Map()
  const put = (key, ref) => {
    if (!key) return
    if (!idx.has(key)) idx.set(key, [])
    const at = idx.get(key)
    if (!at.some((r) => r.gi === ref.gi && r.oi === ref.oi)) at.push(ref)
  }
  def?.gear?.forEach((g, gi) => {
    g.o?.forEach((o, oi) => {
      const ref = { gi, oi, m: g.m ?? 0, stepper: g.in === 'stepper' }
      put(norm(optionLabel(o, items)), ref)
      for (const [id] of optionItems(o)) put(norm(items?.[id]), ref)
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

// Enhancement names, compared with the kind tag ignored on both sides: our data carries it inside
// the name for some factions ("Dead Shiny Shootas (Upgrade)"), the GW app leaves it off, and
// listhammer prints it — three spellings of one enhancement.
const enhKey = (s) => norm(String(s || '').replace(/\s*\((?:upgrade|miniature|unit)\)\s*$/i, ''))

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
// The app writes every selected detachment on one line, joined with commas and a final "and" —
// and half a dozen detachment names contain "and" themselves, so the line is genuinely ambiguous
// as text. It stops being ambiguous once the faction's own detachments are known: carve the
// longest known names out of the line first (a longer name wins over a shorter one inside it),
// and whatever text is left over, minus the separators, is a detachment we don't have.
//
// Case and apostrophe folding only — both leave the string's length alone, so an index into the
// folded copy is an index into the original and the leftovers can be reported as written.
const fold = (s) => String(s || '').replace(/[‘’ʼ`´]/g, "'").toLowerCase()
export function resolveDetachmentLine(line, known) {
  const hay = fold(line)
  const taken = new Array(hay.length).fill(false)
  const free = (at, len) => { for (let i = at; i < at + len; i++) if (taken[i]) return false; return true }
  const hits = []
  for (const det of [...known].sort((a, b) => (b.name || '').length - (a.name || '').length)) {
    const needle = fold(det.name)
    if (!needle) continue
    for (let from = 0; ; ) {
      const at = hay.indexOf(needle, from)
      if (at < 0) break
      if (free(at, needle.length)) {
        for (let i = at; i < at + needle.length; i++) taken[i] = true
        hits.push({ at, name: det.name })
        break                                   // one detachment can only be selected once
      }
      from = at + 1
    }
  }
  const rest = [...line].map((c, i) => (taken[i] ? ' ' : c)).join('')
  return {
    matched: hits.sort((a, b) => a.at - b.at).map((h) => h.name),
    missing: rest.split(/,|\band\b/i).map((x) => x.trim()).filter(Boolean),
  }
}

export function matchRoster(parsed, { faction, core, items } = {}) {
  // `stated` is the list's own header total (which includes units we may have failed to match);
  // `statedUnits` sums only the units that DID match, so the two figures beside `computed` say
  // whether a difference is our points data or a unit that went missing.
  const report = { name: parsed?.name || '', units: [], missing: [], detachments: { matched: [], missing: [] }, points: { stated: parsed?.stated || 0, statedUnits: 0, computed: 0 } }
  if (!parsed || !faction) return { payload: null, report }

  if (parsed.detachmentLine) {
    const { matched, missing } = resolveDetachmentLine(parsed.detachmentLine, faction.detachments || [])
    report.detachments.matched = matched
    report.detachments.missing = missing
  } else {
    for (const d of parsed.detachments || []) {
      const hit = (faction.detachments || []).find((x) => norm(x.name) === norm(d))
      if (hit) report.detachments.matched.push(hit.name)
      else report.detachments.missing.push(d)
    }
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

  // Name -> datasheet. Allied units are in this list too (the import screen loads them), and two
  // datasheets can share a name across that line: Astra Militarum and Imperial Agents each have a
  // Ministorum Priest, and an AM list saying "Ministorum Priest" means its own. So the army's own
  // entry always wins; an allied one is taken only where the army has nothing by that name — which
  // is what lets an Inquisitor Draxus in a Custodes list resolve at all.
  const byName = new Map()
  for (const u of faction.units || []) {
    const key = norm(u.name)
    const prev = byName.get(key)
    if (!prev || (allySourceOf(prev.id) && !allySourceOf(u.id))) byName.set(key, u)
  }
  const copies = new Map()
  const groups = new Map()
  const attachments = []

  for (const pu of parsed.units || []) {
    const def = byName.get(norm(pu.name))
    if (!def) { report.missing.push({ name: pu.name, pts: pu.pts }); continue }

    // A top-level bullet is a MODEL only if the datasheet has a profile by that name. Both the app
    // and listhammer print a unit's attached extra the same way a model is printed ("• 1x Ammo
    // Runt" beside "• 9x Flash Git"), and counting one as a model drops the unit into the wrong
    // size bracket — a ten-Git unit priced as five. Anything the datasheet doesn't know as a
    // profile is passed on as gear instead, where it may still match a wargear option.
    let models = pu.models
    let weapons = pu.weapons || []
    let modelLines = pu.modelLines || []
    // A profile the game HAS but no list can buy. Sir Hekhtur is the pilot who climbs out when
    // Canis Rex is destroyed: appdata gives him no points and no composition, so the roster layer
    // drops him and records the name (`noBuild`) — but every exporter still prints "1x Sir Hekhtur"
    // and his two weapons inside the Canis Rex entry, because that is how the datasheet reads. His
    // lines are neither models of this unit nor wargear it could take, so they are passed over
    // rather than reported: the entry costs what it costs, and there is nothing to fix.
    const noBuild = new Set((faction.noBuild || []).map((n) => norm(n)))
    if (noBuild.size) {
      const isNoBuild = (name) => noBuild.has(norm(name))
      const dropped = modelLines.filter((l) => isNoBuild(l.name))
      modelLines = modelLines.filter((l) => !isNoBuild(l.name))
      weapons = weapons.filter((w) => !isNoBuild(w.mini) && !isNoBuild(w.name))
      // The model count is the sum of those profile lines in both parsers, so it loses them too.
      if (dropped.length && models != null) models = models - dropped.reduce((n, l) => n + (l.n || 1), 0) || null
    }
    // …and a single-profile datasheet has no `minis` at all, so it answers under its own name
    // ("• 2x Chaos Spawn"), which is otherwise reported as wargear nobody could place. Its models
    // are named in the SINGULAR while the datasheet is plural ("• 5x Ranger" on Rangers), so that
    // one comparison folds the plural — 158 datasheets game-wide are named that way, and on
    // several of them (Rangers: 5 models 60pts, 6-10 models 110pts) the count decides the price.
    // Only for the datasheet's own name: a profile name is compared exactly, as it is written.
    const bare = (t) => norm(t).replace(/s$/, '')
    const self = bare(def.name)
    const known = new Set((def.minis || []).map((m) => norm(m?.n)).filter(Boolean))
    const isModel = (name) => known.has(norm(name)) || bare(name) === self
    const lines = modelLines
    if (lines.length) {
      const real = lines.filter((l) => isModel(l.name))
      if (real.length && real.length !== lines.length) {
        models = real.reduce((n, l) => n + l.n, 0) || null
        // An indented body listed its model lines apart from the weapons, so the strays join them;
        // a flat one listed everything together, so the real model lines leave (same objects).
        weapons = pu.flatBody
          ? weapons.filter((w) => !real.includes(w))
          : [...weapons, ...lines.filter((l) => !isModel(l.name)).map((l) => ({ n: l.n, name: l.name, mini: null }))]
      }
    }

    const size = sizeIndexFor(def, models)
    const bracket = def.sizes?.[size]
    const entry = { uid: `i${payload.units.length + 1}`, id: def.id, size }
    if (models && (bracket?.per?.[1] ?? 0) > (bracket?.per?.[0] ?? 0)) entry.count = models
    if (pu.warlord) entry.warlord = true
    if (pu.alleg) entry.alleg = pu.alleg

    const line = { name: def.name, id: def.id, models: models || null, gear: { picked: [], missing: [] }, enh: null, points: { stated: pu.pts, computed: 0 } }

    // Wargear: only what DEVIATES from the printed loadout is a pick. Everything the datasheet
    // already comes with is in the text too, and must not be read as a choice.
    const printed = defaultNames(def, items)
    const idx = optionIndex(def, items)

    // A swap TAKES SOMETHING AWAY, and the export lists what the models are actually holding — so a
    // group whose replaced items are all still there in full was not taken. That is the only thing
    // telling two groups offering the same weapon apart: a Forgefiend's ectoplasma cannon comes
    // either from its autocannons or from its jaws, and with "2x Hades autocannon" still listed it
    // can only have come from the jaws. Picking the wrong group charged the swap twice.
    const listed = new Map()
    for (const w of weapons) {
      const k = norm(w.name)
      listed.set(k, (listed.get(k) || 0) + (w.n || 1))
    }
    const printedCount = new Map()
    for (const [, list] of def.defaults || []) {
      for (const [id, n] of list || []) {
        const k = norm(items?.[id])
        if (k) printedCount.set(k, (printedCount.get(k) || 0) + (n || 1))
      }
    }
    const untouched = (gi) => {
      const rep = def.gear?.[gi]?.rep || []
      if (!rep.length) return false
      return rep.every((id) => {
        const k = norm(items?.[id])
        const was = printedCount.get(k) || 0
        return was > 0 && (listed.get(k) || 0) >= was
      })
    }
    const picks = new Map()
    const key2 = (r) => `${r.gi}:${r.oi}`
    const usedGroups = new Set()
    for (const w of weapons) {
      const key = norm(w.name)
      if (!key || printed.has(key)) continue
      const refs = idx.get(key)
      if (!refs?.length) { line.gear.missing.push(w.name); continue }
      const want = miniIndexOf(def, w.mini)
      const own = want != null ? refs.filter((r) => r.m === want) : []
      const all = own.length ? own : refs
      const touched = all.filter((r) => !untouched(r.gi))
      const pool = touched.length ? touched : all
      // One weapon name can be offered by SEVERAL groups — a Defiler may swap its baleflamer AND
      // its missile launcher for a heavy reaper autocannon, two paid picks in two groups spelled
      // by two identical lines. So a repeat looks for a group that hasn't been used yet before it
      // falls back to the one already picked, where the old rule still holds: the same option
      // named once per profile is ONE pick, not two (two triples would charge for it twice).
      let left = w.n || 1
      while (left > 0) {
        // A free GROUP first, and only then a free option inside a group already used: a group is
        // one model's choice ("this model's scatter laser can be replaced with one of…"), so two
        // different weapons that both appear in it came from two different groups. A Falcon lists a
        // bright lance and a shuriken cannon, and the shuriken cannon is offered by the scatter
        // laser's group as well as by the twin shuriken catapult's — taking it from the first put
        // two picks in a group that allows one.
        const ref = pool.find((r) => !usedGroups.has(r.gi)) || pool.find((r) => !picks.has(key2(r))) || pool[0]
        const k = key2(ref)
        const at = picks.get(k)
        if (at) {
          // A stepper counts MODELS. Another line naming the same weapon adds to that count; a line
          // naming the OTHER HALF of a bundle is restating the same models ("10x Hyperphase sword"
          // then "10x Dispersion Shield" is ten swaps, not twenty), so it takes the larger figure.
          if (ref.stepper) at.n = at.names.has(key) ? at.n + left : Math.max(at.n, left)
          at.names.add(key)
          break
        }
        usedGroups.add(ref.gi)
        picks.set(k, { gi: ref.gi, oi: ref.oi, n: ref.stepper ? left : 1, names: new Set([key]) })
        if (ref.stepper) break
        left -= 1
      }
      line.gear.picked.push(w.name)
    }
    if (picks.size) entry.wg = [...picks.values()].map((p) => [p.gi, p.oi, p.n])

    if (pu.enh) {
      const found = (faction.detachments || [])
        .filter((d) => payload.detachments.includes(d.name))
        .flatMap((d) => d.enhancements || [])
        .find((e) => enhKey(e.name) === enhKey(pu.enh))
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
    if (pu.attachedTo) attachments.push({ entry, def, target: pu.attachedTo })
  }

  // WTC states the pair as a line on one of them ("Attached to X") — but not always on the same
  // side, so the CHARACTER of the two is taken as the leader whichever way round it was written.
  const rowOf = new Map(payload.units.map((u, i) => [norm(report.units[i]?.name), { entry: u, def: byName.get(norm(report.units[i]?.name)) }]))
  for (const a of attachments) {
    const other = rowOf.get(norm(a.target))
    if (!other || other.entry === a.entry) continue
    const isChar = (d) => !!(d?.flags?.char || d?.flags?.epic)
    const leader = isChar(a.def) ? a : (isChar(other.def) ? other : null)
    if (!leader) continue
    const body = leader === a ? other : a
    leader.entry.leaderOf = body.entry.uid
  }

  // The GW app blocks a leader with the unit it joined, so there the block IS the link. Both
  // attaching roles count: a bodyguard unit holds a Leader and a Support at once (two independent
  // slots — see leaderTargetsFor in rosterEngine.js), and the app names them exactly that way.
  for (const members of groups.values()) {
    const body = members.find((m) => /^bodyguard/i.test(m.attachedAs || ''))
    if (!body) continue
    for (const m of members) {
      if (m === body || !/^(leader|support)/i.test(m.attachedAs || '')) continue
      m.entry.leaderOf = body.entry.uid
    }
  }

  return { payload, report }
}
