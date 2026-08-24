// Read an army list somebody else's tool wrote, and turn it into one of ours.
//
// THE FORMATS (see rosterExport.js for the ones we write):
//   gw   the Warhammer 40,000 app's 11th-edition export — what a player has in their clipboard
//        after building a list in the app, and what tournament organisers ask for. listhammer.info
//        writes the SAME grammar in its detailed ("with wargear") mode, so one parser reads both;
//        the differences it tolerates rather than forks over are all cosmetic: capitalised
//        "Points", a thousands separator (2.000), `◦` for the weapons under a model line, plural
//        "Enhancements:", and a bare Force Disposition line where the app writes a labelled one.
//        The same site's plain-text mode is the same grammar again, with a LABELLED header
//        ("List Name:", "Factions Used:", "Army Points:", "Detachment(s):") closed by a row of
//        '+', section headings that end in a colon, and "pts" for "points".
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
import { allySourceOf, leadTypeFor, modelsPerMini, optionItems, optionLabel, unitPoints, wargearGroupCap } from './rosterEngine.js'

// GW's own section headings, plus the 10th-edition ones an older export may still carry.
// `m` so detectFormat can test it against a whole pasted list; parseGw tests it a line at a time.
const SECTIONS = /^(CHARACTERS?|EPIC HEROES|BATTLELINE|DEDICATED TRANSPORTS|OTHER DATASHEETS|ALLIED UNITS):?$/m
const BATTLE_SIZES = /^(Combat Patrol|Incursion|Strike Force|Onslaught|Custom)$/

// Bullets. The app writes `•` at every depth; listhammer writes `•` for a model line and `◦` for
// the weapons under it. Both mean "this line is a bullet", which is the tell the nesting rule in
// gwBody() reads — miss it and every weapon is taken for a model.
const BULLET = '[\u2022\u25e6\u2023\u25aa*]'
// How the two words for points are written: the app spells it out, listhammer's plain-text mode
// abbreviates it.
const PTS = '(?:pts?|points?)'
// "Khârn the Betrayer (115 points)", "Ghazghkull Thraka (235 Points)", "Dakka  (2.000 Points)",
// "War Dog Brigand (140 pts)".
const POINTS_LINE = new RegExp(`^(.+?)\\s*\\((\\d[\\d.,\\u00a0 ]*)\\s*${PTS}\\)$`, 'i')
// Points are whole numbers: a dot, comma or space inside one is a thousands separator, not a
// decimal point — listhammer writes a 2000-point list as "2.000 Points".
const num = (s) => +String(s).replace(/\D/g, '')

// Apostrophes are the single most common reason a name fails to match: the app writes T’au with a
// typographic one, our data and half the community write T'au. Appdata does the same with the
// hyphen, inconsistently and in its own data rather than in anyone's export: 25 weapon names carry
// a non-breaking (U+2011) or unicode (U+2010) hyphen where the rest of the game uses a plain one —
// "Psyko‑gatler", "Kombi‑rokkit", every "master‑crafted" weapon Space Wolves field, the Votann
// "Autoch‑pattern bolter". Every list writes them with the hyphen on the keyboard, and every one
// of those weapons came back as wargear that could not be placed. The ampersand is the third:
// listhammer prints "Genestealer Claws & Talons" where the datasheet reads "claws and talons",
// and every Tyranid melee weapon in a list is written that way. Nothing in our data spells a name
// with an ampersand, so the two forms can only ever be the same name.
//
// And the third is the plural, which the two sides disagree about in BOTH directions and in any
// word of a name: our data has "Genestealers claws and talons" against the list's "Genestealer
// Claws & Talons", "Tyranid Warrior" against "5x Tyranid Warriors", "Rangers" against "5x
// Ranger". So every word gives up its final s. Nothing in the game is told apart by that letter:
// across all 30 factions no two datasheets, detachments, enhancements, profiles or wargear items
// fold together, and the only names that do are one weapon written both ways (Bolt pistol / Bolt
// pistols). The count and the price ride on this — a plural read as wargear drops a six-model unit
// into the three-model bracket.
export const norm = (s) => (s || '')
  .replace(/[‘’ʼ`´]/g, "'")
  .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
  .replace(/&/g, ' and ')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase()
  .replace(/s\b/g, '')

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
  if (new RegExp(`\\((\\d[\\d.,\\u00a0 ]*)\\s*${PTS}\\)`, 'i').test(t)) return 'gw'
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

// Some exports print an attached unit TWICE — once inside its `Attached Unit N` block, so the
// reader can see who joined whom, and once under its own section, so the army list is complete. A
// Tyranids list shows its two Tyrant Guard in both places and then states a total that counts them
// once: 2000, where the printed entries add up to 2320.
//
// A unit can also stand in TWO blocks, because it plays a different part in each: Masters of the
// Maelstrom is the bodyguard Huron Blackheart joins, and the Support unit attached to a Chosen
// squad, so the export prints it under both headings and charges for it once. That repeat is not
// dropped — each of its two blocks states an attachment we would otherwise lose — it is folded
// onto the copy that stays, which joins both blocks (`also`).
//
// Which is why this is decided by ARITHMETIC and never by shape. Repeats are only folded away when
// the excess over the list's own stated total is EXACTLY the entries that appear twice — otherwise
// a Deathwatch list that really does field one Indomitor Kill Team attached and another on its own
// (the entries add up to the stated total, so there is no excess) would silently lose 275 points.
// Each surviving entry can account for at most one repeat. Against a loose copy the attached one
// stays, because it is the one carrying the attachment; between two blocks the parts are carried
// by whichever copy stays, so it takes on the other's as well.
function foldRepeatedAttachments(out) {
  const stated = out.stated
  if (!stated) return
  const over = out.units.reduce((n, u) => n + (u.pts || 0), 0) - stated
  if (over <= 0) return
  const claimed = new Set()
  const dupes = []
  const twinOf = (u, fits) => out.units.find((a) => a !== u && !claimed.has(a) && !dupes.includes(a)
    && a.pts === u.pts && norm(a.name) === norm(u.name) && fits(a))
  const body = (u) => /^bodyguard/i.test(u.attachedAs || '')
  for (const u of out.units) {
    // The parts a unit can play are one bodyguard and one attaching role (Leader or Support), so
    // two blocks naming it in the SAME part are two units, however alike. Blocks that label
    // nothing say nothing either way, and are left alone.
    const twin = u.group
      ? twinOf(u, (a) => a.group && a.group !== u.group && !!a.attachedAs && !!u.attachedAs && body(a) !== body(u))
      : twinOf(u, (a) => !!a.group)
    if (!twin) continue
    claimed.add(twin)
    dupes.push(u)
    if (u.group) (twin.also = twin.also || []).push({ group: u.group, attachedAs: u.attachedAs })
  }
  if (!dupes.length || dupes.reduce((n, u) => n + (u.pts || 0), 0) !== over) return
  out.units = out.units.filter((u) => !dupes.includes(u))
  out.repeated = dupes.length
}

function parseGw(text) {
  const out = { format: 'gw', name: '', faction: '', limit: 0, stated: 0, detachments: [], units: [] }
  let unit = null
  let entries = []
  let group = null       // the `Attached Unit N` this unit belongs to, if any
  let groups = 0         // …numbered here when the block is headed by its members' names instead
  let inAttached = false // inside the ATTACHED UNITS section
  let seenHeader = false
  let labelled = false   // a labelled header field has been read, so the next '+' row closes it
  // The header is everything before the army starts being described: the title (which can run to a
  // dozen lines), the faction, the detachment line, the battle size. A priced line inside it is the
  // LIST's points, not a unit's — a title can print its own points several lines below its name.
  let inHeader = true
  let labelledFaction = ''   // set when the header names the faction outright, rather than by a bare line
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
    if (/^attached units:?$/i.test(t)) { flush(); inHeader = false; inAttached = true; continue }
    const att = t.match(/^attached unit (\d+):?$/i)
    if (att) { flush(); inHeader = false; inAttached = true; group = `g${att[1]}`; continue }
    if (SECTIONS.test(t)) { flush(); inHeader = false; inAttached = false; group = null; continue }
    if (/^Force Dispositions?:/i.test(t)) continue

    // listhammer's plain-text mode LABELS its header instead of writing it as bare lines, and
    // closes it with a row of '+'. What is labelled is read from the label — inferring which bare
    // line is the faction (below) is only needed when nothing says which.
    if (inHeader) {
      // A row of '+' CLOSES that header — but the same site also writes it as a fence, opening the
      // block with an identical row. Closing on the opening one lost the whole header: the title
      // came out as "List Name: …", the army had no points, no faction and no detachment, and with
      // no detachment its enhancement was rejected as one this army cannot take.
      if (/^\++$/.test(t)) { if (labelled) inHeader = false; continue }
      const kv = t.match(/^([^:]{2,40}):\s*(.*)$/)
      const key = kv && kv[1].replace(/\s*\([^)]*\)/g, '').trim().toLowerCase()
      const val = kv && kv[2].trim()
      if (key === 'list name') { out.name = val; seenHeader = true; labelled = true; continue }
      // "Chaos Knights, Heretic Astartes" — the army's own faction first, its allies after. The
      // allied units come with the ally's own datasheets, which is a matter for the faction data,
      // not for this line.
      if (key === 'faction' || key === 'factions' || key === 'factions used') {
        labelledFaction = val.split(',').map((f) => f.trim()).find((f) => matchFaction(f)) || val
        labelled = true
        continue
      }
      if (key === 'army points' || key === 'total points') { out.stated = num(val); labelled = true; continue }
      if (key === 'detachment' || key === 'detachments') {
        out.detachmentLine = val
        out.detachments = val.split(/,\s*|\s+and\s+/).map((d) => d.trim()).filter(Boolean)
        labelled = true
        continue
      }
      // Labels with nothing to add: the enhancements are printed again under the units that carry
      // them, and the disposition is not part of a list we can store.
      if (/^(disposition|army enhancements|mission)$/.test(key || '')) { labelled = true; continue }
    }

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
      // An attached block can be headed by its MEMBERS' names joined with " + " and the pair's
      // total, instead of by "Attached Unit N" — the same shape the site's compact mode uses. The
      // line is the block, not a unit: read as one it was a datasheet nobody could find, and the
      // units under it stood alone because nothing said they belonged together.
      if (inAttached && / \+ /.test(name)) { flush(); group = `g${++groups}`; continue }
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
  foldRepeatedAttachments(out)
  const answers = plains.filter(isFactionName)
  const loose = plains.filter((t) => matchFaction(t))
  out.faction = labelledFaction || answers[answers.length - 1] || loose[loose.length - 1] || plains[0] || ''
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
  const body = lines.slice(start).join('\n')

  // A list can arrive as the WTC HEADER over somebody else's body: listhammer re-exports a New
  // Recruit list that way, keeping the `+++` block and printing the army in its own grammar —
  // "Attached Unit 1" blocks, section headings, "Attached as:" lines, and bullets that mix model
  // lines with weapons. Read as WTC every bullet counted as a profile (a ten-model Death Company
  // came out as 31 models and half price) and the attachments were lost outright. The body is
  // whose grammar it is, so it goes to that parser; the header above it still says what only the
  // header says (faction, detachment, warlord, enhancements).
  if (/^attached units?( \d+)?$/im.test(body) || SECTIONS.test(body)) {
    const gw = parseGw(body)
    out.units = gw.units
    out.name = out.name || gw.name
    if (!out.stated) out.stated = gw.stated
    if (!out.limit) out.limit = gw.limit
    if (!out.detachments.length && gw.detachments.length) {
      out.detachments = gw.detachments
      if (gw.detachmentLine) out.detachmentLine = gw.detachmentLine
    }
    return fromHeader(out)
  }

  let unit = null
  let mini = null          // the profile the following indented lines belong to
  const flush = () => { if (unit) { delete unit.fromProfiles; out.units.push(unit); unit = null; mini = null } }

  for (let i = start; i < lines.length; i++) {
    const raw = lines[i]
    const t = raw.trim()
    if (!t || /^\++$/.test(t)) continue

    const enh = t.match(new RegExp(`^(?:[•*]\\s*)?Enhancement:\\s*(.*?)\\s*\\(\\+?\\d+ ?${PTS}\\)$`, 'i'))
    if (enh && unit) { unit.enh = enh[1]; continue }

    // Who this unit joined. Which side of the pair carries the line varies, and one export carries
    // it on BOTH — the unit says "Attached to Warboss[2]" and the Warboss says "Leading Boyz[3]" —
    // so only the LINK is recorded here; the matcher decides which of the two is the leader once it
    // knows the datasheets (rosterImport's `attachedTo` handling). They accumulate: a bodyguard
    // unit holds a Leader and a Support at once, and reading one line per unit dropped whichever
    // came first (a Boyz mob attached to Ghazghkull AND a Bannernob kept only the Bannernob).
    const att = t.match(/^(?:Attached to|Leading|Supporting)\s+(.+)$/i)
    if (att && unit) { unit.attachedTo.push(att[1].trim()); continue }

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
        // "• 1x Tempestor Prime: Warlord, Command rod" — the app writes the token on the unit's
        // own line, this export writes it on the model that IS the warlord.
        if (cut !== -1) {
          for (const g of wtcGear(body.slice(cut + 1))) {
            if (/^warlord$/i.test(g.name)) { unit.warlord = true; continue }
            unit.weapons.push({ ...g, mini })
          }
        }
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
      unit = { name, pts: +pts, ref: ref || null, group: null, warlord: false, enh: null, alleg: null, attachedTo: [], loose: [], models: n ? +n : null, weapons: [], fromProfiles: false }
      mini = null
      for (const g of wtcGear(tail)) {
        if (/^warlord$/i.test(g.name)) { unit.warlord = true; continue }
        const mark = g.name.match(/^([^:]+): (.+)$/)
        if (mark) { unit.alleg = mark[2]; continue }
        unit.weapons.push({ ...g, mini: null })
      }
      continue
    }

    // Anything else inside a unit's block. Kept rather than dropped: one export states an
    // attachment with no vocabulary we could match on, naming the RULE that does the attaching
    // ("Loyal Protector Cadian Command Squad[1]"), and matchRoster is the only place that can tell
    // such a line from a stray — it alone knows what the other units in the list are.
    if (unit) unit.loose.push(t)
  }
  flush()

  return fromHeader(out)
}

// The header names the warlord and every enhancement, by reference or by name. A compact export
// may say it ONLY there, so the header is read as a source and not merely as a summary.
function fromHeader(out) {
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

// The Chapters that have no book of their own and play out of Codex: Space Marines — the six
// `space-marines.js` lists as its `chapters`. An export names the Chapter, not the codex, and the
// five Chapters that DO have their own data file (Black Templars, Blood Angels, Dark Angels,
// Deathwatch, Space Wolves) are already factions here and match by name.
// Through norm(), which takes the final s off every word — spelling these out by hand is how the
// first version of this matched Raven Guard and nothing else.
const CODEX_CHAPTERS = new Set(['Imperial Fists', 'Iron Hands', 'Raven Guard', 'Salamanders', 'Ultramarines', 'White Scars'].map(norm))
const ASTARTES_KEYWORD = norm('Adeptus Astartes')

// The faction the list names, as one of ours. WTC writes the alliance in front ("Xenos - Aeldari"),
// which parseWtc has already stripped.
export function matchFaction(name) {
  const want = norm(name)
  if (!want) return null
  // An export can name SEVERAL, most specific first: "Factions Used: Raven Guard, Adeptus Astartes"
  // is one army, stated as its Chapter and then as the keyword every Astartes army shares. Read as
  // one string it matched nothing at all, and a list whose faction doesn't resolve imports as
  // nothing — every unit in it is looked up against that faction's data. So each part is a
  // candidate, in the order written, and the whole string stays the first of them so a name that
  // legitimately contains a comma is unaffected.
  const parts = want.split(',').map((s) => s.trim()).filter(Boolean)
  const cands = parts.length > 1 ? [want, ...parts] : [want]
  for (const w of cands) {
    for (const g of factionGroups) {
      for (const f of g.factions) {
        if (norm(f.name) === w) return f.slug
      }
    }
  }
  // A Chapter before the looser reading below: it is the more specific statement of the two, and
  // that reading would answer "Ultramarines" with nothing anyway.
  for (const w of cands) if (CODEX_CHAPTERS.has(w)) return 'space-marines'
  // The looser reading stays on the WHOLE string, as it always was. Running it per part would let a
  // fragment be matched by the "a faction name contains it" direction — a list titled "Blood, Sweat
  // and Tears" would come back as Blood Angels — and it gains nothing: a part that CONTAINS a
  // faction name is contained in the whole string too, so that direction is already covered.
  for (const g of factionGroups) {
    for (const f of g.factions) {
      if (want.includes(norm(f.name)) || norm(f.name).includes(want)) return f.slug
    }
  }
  // Last, and only if nothing above spoke: the keyword covers every Astartes army, so it is a guess
  // — but it is the codex of that name, and the alternative is importing nothing. A list that is
  // really Blood Angels says so first (WTC and the GW app both do), and a wrong guess is visible
  // rather than silent: its units come back as ones we don't have.
  if (cands.includes(ASTARTES_KEYWORD)) return 'space-marines'
  return null
}

// Every wargear option of a datasheet, by the names it could be written under: the option's own
// label ("Hexrifle + Torturer's tool") and each item inside it — INCLUDING each half of a bundled
// option. An export names what the models carry, never what the option is called, so a swap for
// "1 hyperphase sword and 1 dispersion shield" arrives as two lines; indexing only single-item
// options left both unplaceable and the swap untaken, which silently imported a Lychguard unit
// still holding its printed warscythes.
function optionIndex(def, items, entry) {
  const idx = new Map()
  const put = (key, ref) => {
    if (!key) return
    if (!idx.has(key)) idx.set(key, [])
    const at = idx.get(key)
    if (!at.some((r) => r.gi === ref.gi && r.oi === ref.oi)) at.push(ref)
  }
  def?.gear?.forEach((g, gi) => {
    g.o?.forEach((o, oi) => {
      // Stepper or single pick — read exactly as the editor reads it (UnitEditorFields' mode()):
      // a group whose cap allows several picks is a set of steppers sharing one budget whatever
      // appdata calls its input. A T'au Commander's "up to three of the following, and can take
      // duplicates" is a checkbox with a cap of 3, and counting it as one pick per copy spilled
      // his second and third missile pods into the group that replaces his burst cannon — a
      // second pick in a group that allows one, so a legal Commander came out illegal.
      const ref = { gi, oi, m: g.m ?? 0, stepper: g.in === 'stepper' || (wargearGroupCap(def, entry, gi)?.limit || 0) > 1 }
      put(norm(optionLabel(o, items)), ref)
      for (const [id] of optionItems(o)) put(norm(items?.[id]), ref)
    })
  })
  return idx
}

// A model line can carry the model's loadout in its own name — "Jakhal w/ mauler chainblade",
// "2x Khorne Berzerker w/ eviscerator and plasma pistol", "9x Cultist w/ autopistol and brutal
// assault weapon". Only the head names the profile, and the loadout is printed again as its own
// lines underneath, so nothing is lost by cutting it: read whole, the line named no profile the
// datasheet has, so those models went uncounted (a ten-model Jakhal pack came out as eight).
const profileHead = (name) => String(name || '').split(/\s+w\/\s+/i)[0].trim()

// Which miniature profile a weapon line was printed under, as an index into `def.minis` — the
// sergeant and the squad often have a group each offering the same weapon, and picking the wrong
// one prices the unit wrong.
function miniIndexOf(def, name) {
  if (!name || !(def?.minis?.length > 1)) return null
  const want = norm(profileHead(name))
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

// Whether a model count is one the datasheet can actually be fielded at.
const fitsBracket = (def, models) => models != null
  && (def?.sizes || []).some((s) => models >= (s.per?.[0] ?? 1) && models <= (s.per?.[1] ?? s.per?.[0] ?? 1))

// The size bracket whose model range holds `models`; the datasheet's own default when the list
// doesn't say (a single-model unit, or a format that omits the count).
// `perMini` is what the list says about the SPLIT between profiles, when it says anything. Two
// brackets can hold the same number of models and differ only in how they may be divided: an
// Indomitor Kill Team is either ten Heavy Intercessors (`comp` [[0,10],[1,0],[2,0]]) or three to
// sixteen models mixed from all three profiles, both at 275 points. Taking the first that fits the
// COUNT gave a 4/3/3 kill team the ten-of-one bracket, where the other two profiles have no models
// — and every wargear group belonging to them was then capped at zero.
function sizeIndexFor(def, models, perMini = null) {
  const sizes = def?.sizes || []
  const inRange = (s) => models >= (s.per?.[0] ?? 1) && models <= (s.per?.[1] ?? s.per?.[0] ?? 1)
  const admits = (s) => !perMini?.size || !s.comp?.length || s.comp.every(([mi, a, b]) => {
    const n = perMini.get(mi) || 0
    return b == null ? n === a : n >= a && n <= b
  })
  if (models) {
    const fits = sizes.findIndex((s) => inRange(s) && admits(s))
    if (fits >= 0) return fits
    const hit = sizes.findIndex(inRange)
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

// A stepper group counts MODELS, and the count has to be read PER PROFILE. Within one profile a
// line naming the other half of a bundle is restating the same models ("1x Storm Shield" then "1x
// Thunder hammer" is one swapped model, not two) so the halves take the larger figure, while the
// same weapon named twice adds. Across profiles the swaps are different models and add up: a
// Deathwatch Terminator Squad prints its sergeant's thunder hammer and storm shield apart from the
// squad's, and folding all four lines into one bucket charged for three swapped models instead of
// two — five points a squad.
// …and a weapon SEVERAL groups offer says nothing about how many models any one of them swapped.
// A Deathwatch Kill Team's frag cannon, infernus heavy bolter and Deathwatch shotgun each come
// "and 1 close combat weapon", so a line reading "4x Close combat weapon" over two frag cannons
// and two infernus bolters is four models split between two groups — attributed whole to the
// first, it read as four frag cannons in a group that allows two, and called a legal list illegal.
// So a bundle is counted by the item that IDENTIFIES it, and a shared one only when there is
// nothing else to go on.
function count(pick, mini, key, n, shared) {
  const at = mini || ''
  const by = pick.byMini.get(at) || new Map()
  by.set(key, (by.get(key) || 0) + n)
  pick.byMini.set(at, by)
  if (shared) pick.shared.add(key)
}
function stepperCount(pick) {
  let total = 0
  for (const by of pick.byMini.values()) {
    const own = [...by].filter(([key]) => !pick.shared.has(key)).map(([, n]) => n)
    total += Math.max(...(own.length ? own : [...by.values()]))
  }
  return total || 1
}

export function matchRoster(parsed, { faction, core, items } = {}) {
  // `stated` is the list's own header total (which includes units we may have failed to match);
  // `statedUnits` sums only the units that DID match, so the two figures beside `computed` say
  // whether a difference is our points data or a unit that went missing.
  const report = { name: parsed?.name || '', units: [], missing: [], repeated: parsed?.repeated || 0, detachments: { matched: [], missing: [] }, points: { stated: parsed?.stated || 0, statedUnits: 0, computed: 0 } }
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
  const loose = []

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
    // The detachment keyword an entry chose for itself is printed among the model's own lines —
    // "• Houndpack Lance Character" — with nothing to mark it as anything but wargear, so it is
    // recognised by what the datasheet offers: the allegiance group's own name and its options.
    // (The app labels the mark instead, "Mark of Chaos: Khorne", which parseGw has already read.)
    let alleg = pu.alleg
    if (!alleg && def.alleg?.o?.length) {
      const forms = new Map()
      for (const o of def.alleg.o || []) {
        for (const f of [o.n, `${def.alleg.det || ''} ${o.n}`, `${def.alleg.t || ''} ${o.n}`, `${def.alleg.t || ''}: ${o.n}`]) {
          if (norm(f)) forms.set(norm(f), o.n)
        }
      }
      const hit = weapons.find((w) => forms.has(norm(w.name))) || modelLines.find((l) => forms.has(norm(l.name)))
      if (hit) {
        alleg = forms.get(norm(hit.name))
        weapons = weapons.filter((w) => w !== hit)
        modelLines = modelLines.filter((l) => l !== hit)
      }
    }

    // …and a single-profile datasheet has no `minis` at all, so it answers under its own name
    // ("• 2x Chaos Spawn"), which is otherwise reported as wargear nobody could place — 158
    // datasheets game-wide are named that way, and on several of them (Rangers: 5 models 60pts,
    // 6-10 models 110pts) the count decides the price. Both comparisons go through `norm`, which
    // folds the plural: a list may print either number of either name.
    const self = norm(def.name)
    const known = new Set((def.minis || []).map((m) => norm(m?.n)).filter(Boolean))
    const isModel = (name) => known.has(norm(name)) || norm(name) === self
      || known.has(norm(profileHead(name))) || norm(profileHead(name)) === self
    const lines = modelLines
    const held = defaultNames(def, items)
    for (const key of optionIndex(def, items).keys()) held.add(key)
    if (lines.length) {
      const real = lines.filter((l) => isModel(l.name))
      // A flat body offered every line as a candidate, so only the lines the datasheet knows as
      // profiles are models — anything else it cannot vouch for is wargear until proven otherwise
      // (the arithmetic below is what may still promote it).
      if (pu.flatBody && real.length && real.length !== lines.length) {
        models = real.reduce((n, l) => n + l.n, 0) || null
        weapons = weapons.filter((w) => !real.includes(w))
      }
      // A body with structure already SAID which lines are models, and the parser counted them. So
      // the only ones that leave are those the datasheet knows as WARGEAR: an attached extra is
      // printed exactly like a model ("• 1x Ammo Runt" beside "• 9x Flash Git") and counting it
      // drops a ten-Git unit into the five-model bracket, at half price. A model line under a name
      // we simply do not have — a WTC export collapses Gaunt's Ghosts' five named Ghosts into "5x
      // Tanith Ghost" — is still a model line, and dropping those cost the unit five of its six.
      if (!pu.flatBody) {
        const gearLines = lines.filter((l) => !isModel(l.name) && held.has(norm(l.name)))
        if (gearLines.length && real.length) {
          models = (models || 0) - gearLines.reduce((n, l) => n + (l.n || 1), 0) || null
          weapons = [...weapons, ...gearLines.map((l) => ({ n: l.n, name: l.name, mini: null }))]
        }
      }
    }
    // A count no bracket allows is not a count. Exports do not agree on how a profile is named:
    // listhammer's plain-text mode writes "Beastman" for a FELLGOR BEASTMEN profile and folds the
    // loadout into the name ("9x Cultist w/ autopistol and brutal assault weapon" for a CHAOS
    // CULTIST), so only the champion answered `isModel` and a ten-model mob came out as one model
    // — priced right by luck, since one model is below the smallest bracket and falls back to it.
    // So when the count is impossible, the lines the datasheet cannot place as WARGEAR either are
    // read as models instead, and only if THAT count fits a bracket: a line we merely failed to
    // understand still changes nothing, and a unit whose models we did read is never touched.
    if (pu.flatBody && lines.length && !fitsBracket(def, models)) {
      const strays = lines.filter((l) => !held.has(norm(l.name)))
      const promoted = strays.reduce((n, l) => n + (l.n || 1), 0)
      if (promoted && fitsBracket(def, promoted)) {
        models = promoted
        weapons = weapons.filter((w) => !strays.includes(w))
      }
    }

    // What the list says about the split between profiles, for the bracket choice below.
    const perMini = new Map()
    for (const l of modelLines) {
      const mi = miniIndexOf(def, l.name)
      if (mi != null) perMini.set(mi, (perMini.get(mi) || 0) + (l.n || 1))
    }
    const size = sizeIndexFor(def, models, perMini)
    const bracket = def.sizes?.[size]
    const entry = { uid: `i${payload.units.length + 1}`, id: def.id, size }
    if (models && (bracket?.per?.[1] ?? 0) > (bracket?.per?.[0] ?? 0)) entry.count = models
    if (pu.warlord) entry.warlord = true
    if (alleg) entry.alleg = alleg

    const line = { name: def.name, id: def.id, models: models || null, gear: { picked: [], missing: [] }, enh: null, points: { stated: pu.pts, computed: 0 } }

    // Wargear: only what DEVIATES from the printed loadout is a pick. Everything the datasheet
    // already comes with is in the text too, and must not be read as a choice.
    const printed = defaultNames(def, items)
    const idx = optionIndex(def, items, entry)

    // A bundle the export writes as ONE name: "2 with Sergeant's autogun and close combat weapon"
    // is the pair our data offers as a single option, whose own label joins its items with " + " —
    // so the line answered to neither the label nor an item, and the swap was lost silently (it is
    // free, so the points said nothing). Split only when the whole name is unknown and EVERY part
    // is known: "Genestealer claws and talons" is one weapon, and it resolves as one.
    const knownGear = (name) => { const k = norm(name); return !!k && (printed.has(k) || idx.has(k)) }
    weapons = weapons.flatMap((w) => {
      if (knownGear(w.name) || !/ and /i.test(w.name)) return [w]
      const parts = w.name.split(/ and /i).map((x) => x.trim())
      return parts.every(knownGear) ? parts.map((name) => ({ ...w, name })) : [w]
    })

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
    // How many of each item the PRINTED loadout puts on the table — per profile where the export
    // says which profile a weapon is on, and unit-wide as the fallback. `defaults` counts one
    // model's (see gen-roster-data.mjs), except an entry marked TOTAL, which is the profile's.
    const perProfile = modelsPerMini(def, entry)
    const printedPer = new Map()  // `${miniIndex|*}:${item}` → copies
    const printedCount = new Map()
    const bump = (map, k, n) => map.set(k, (map.get(k) || 0) + n)
    for (const [m, list] of def.defaults || []) {
      const n = perProfile?.get(m) || 0
      for (const [id, c, total] of list || []) {
        const k = norm(items?.[id])
        if (!k) continue
        // Where the models can't be split between profiles at all (two open-ended ones — see
        // modelsPerMini, the Deathwatch kill teams) the printed loadout absorbs the item whatever
        // the count, which is exactly how this read before counting came into it.
        const copies = !perProfile ? Infinity : total ? (c || 1) : (c || 1) * n
        bump(printedPer, `${m}:${k}`, copies)
        bump(printedCount, k, copies)
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
    // Whether a group can still take a pick, read as the editor reads it (UnitEditorFields' mode):
    // a stepper spends its cap, a one-of group holds exactly one. Without this the leftovers of a
    // weapon a Commander carries three of went back into the group that swaps his burst cannon —
    // which allows one pick — and the list came out illegal on wargear it is entitled to.
    const roomIn = (gi) => {
      const cap = wargearGroupCap(def, entry, gi)?.limit ?? null
      const limit = def.gear?.[gi]?.in === 'stepper' || (cap || 0) > 1 ? (cap ?? Infinity) : 1
      let used = 0
      for (const p of picks.values()) if (p.gi === gi) used += p.stepper ? stepperCount(p) : p.n
      return used < limit
    }
    // How well an option ANSWERS the list: a bundled option ("1 boltstorm gauntlet, 1 power fist
    // and 1 relic blade") is one pick that puts three weapons on the model, and the Captain in
    // Gravis Armour offers three such bundles differing only in the last item. Scoring each
    // candidate by how much of it the list actually names — minus what it does not — is what tells
    // the relic-blade bundle from the relic-chainsword one; a plain single-item option scores 1
    // either way, so nothing else changes.
    const fitOf = (r) => {
      const opt = def.gear?.[r.gi]?.o?.[r.oi]
      if (!opt) return 0
      const names = optionItems(opt).map(([id]) => norm(items?.[id])).filter(Boolean)
      if (names.length < 2) return 1
      return names.reduce((n, x) => n + (listed.has(x) ? 1 : -1), 0)
    }
    // What the printed loadout already accounts for is not a pick — but by COUNT, not by name. A
    // Crisis Fireknife comes with a plasma rifle and a missile pod and can trade either for the
    // other, so its swaps show up only as "2x Missile pod" where one was printed. Reading the name
    // alone made both directions invisible: three swaps, 15 points, on a squad that also pays for
    // the pod it starts with.
    const perLeft = new Map(printedPer)
    const anyLeft = new Map(printedCount)
    const absorb = (w, key) => {
      let n = w.n || 1
      const draw = (amount, pk) => {
        if (!amount) return
        if (pk) perLeft.set(pk, (perLeft.get(pk) || 0) - amount)
        anyLeft.set(key, (anyLeft.get(key) || 0) - amount)
        n -= amount
      }
      const mi = miniIndexOf(def, w.mini)
      const pk = mi == null ? null : `${mi}:${key}`
      if (pk) draw(Math.min(perLeft.get(pk) || 0, anyLeft.get(key) || 0, n), pk)
      // The profile the export named has none of this left — but a datasheet can field several
      // profiles under one NAME (an Aquila Kill Team lists four "Deathwatch Veteran"s, each with
      // its own loadout), and the name is all the export gives. So what the rest of the unit still
      // has printed answers for it before it counts as a deviation; the unit-wide stock is what
      // keeps the total honest either way.
      draw(Math.min(anyLeft.get(key) || 0, n), null)
      return n
    }
    // An export can name a model's loadout as ONE composite line and then print the items it is
    // made of underneath — "2x Cyclone Missile Launcher & Storm Bolter" above its own "2x Cyclone
    // missile launcher" and "2x Storm bolter", "Bolt Rifle w/ Grenade Launcher" above "Bolt Rifle"
    // and "Astartes grenade launcher". The composite names no weapon any datasheet has, so it was
    // reported as wargear we could not place: three such lines on a Space Marines list whose every
    // point, pick and model count was right.
    //
    // Only when every half is ALSO named on its own line in the same unit. Then the composite is a
    // restatement and its items are already counted — dropping it loses nothing, and re-feeding the
    // halves instead would count them twice (two cyclone missile launchers become four, and the
    // squad takes a swap it is not entitled to). A composite standing ALONE still gets reported: it
    // is then the only statement of that loadout there is, and we did fail to place it.
    const restates = (w) => {
      const parts = String(w.name || '').split(/\s+(?:&|w\/|and)\s+/i).map(norm).filter(Boolean)
      if (parts.length < 2) return false
      const others = weapons.filter((o) => o !== w).map((o) => norm(o.name))
      return parts.every((p) => others.some((o) => o === p || o.endsWith(` ${p}`)))
    }
    for (const w of weapons) {
      const key = norm(w.name)
      if (!key) continue
      const extra = absorb(w, key)
      if (extra <= 0) continue
      const refs = idx.get(key)
      // More of an item than the printed loadout records, and no option on the datasheet grants it:
      // the printed COUNT is what's short (appdata gives a Defiler one excruciator cannon where its
      // own loadout text and the model both say two), and reporting that would blame the list for
      // our data. Only a name the datasheet doesn't know at all is unmatched wargear.
      if (!refs?.length) { if (!printed.has(key) && !restates(w)) line.gear.missing.push(w.name); continue }
      const want = miniIndexOf(def, w.mini)
      const own = want != null ? refs.filter((r) => r.m === want) : []
      const all = own.length ? own : refs
      const touched = all.filter((r) => !untouched(r.gi))
      const fitted = touched.length ? touched : all
      const best = Math.max(...fitted.map(fitOf))
      const pool = fitted.filter((r) => fitOf(r) === best)
      // The rest, best first — where a weapon the list holds SEVERAL of spills once the best-fitting
      // option has taken its share. A Forgefiend with three ectoplasma cannons has made both of its
      // swaps: the jaws bundle (which fits two of the printed names, so it wins the first cannon)
      // grants one, and the pair that replaces the Hades autocannons grants the other two. Without
      // the spill the leftovers were absorbed into the bundle already picked and the second swap —
      // ten points of it — went missing.
      const rest = fitted.filter((r) => fitOf(r) !== best).sort((a, b) => fitOf(b) - fitOf(a))
      // Does this name pick out a group at all, or is it the half several of them have in common?
      const shared = new Set(pool.map((r) => r.gi)).size > 1
      const holds = (r) => picks.get(key2(r))?.names.has(key)
      // How many of this weapon ONE pick of that option grants. "This model's lasher tendrils can
      // be replaced with 2 magma cutters" is a single swap, and the export prints what the model
      // ends up holding ("2x Magma cutters") — counted as two picks it filled a group that allows
      // one, and called a stock Maulerfiend illegal.
      const per = (r) => {
        const opt = def.gear?.[r.gi]?.o?.[r.oi]
        const hit = opt ? optionItems(opt).find(([id]) => norm(items?.[id]) === key) : null
        return Math.max(1, hit?.[1] || 1)
      }
      let left = extra
      while (left > 0) {
        // Where this weapon goes, in order:
        //  1. an option already picked that does NOT yet list this weapon — the other half of a
        //     bundle, not a second choice (the Captain's power fist joins his boltstorm gauntlet);
        //  2. a group nothing has been spent from — a group is one model's choice, so two
        //     different weapons offered by it came from two different groups (a Falcon's bright
        //     lance and shuriken cannon), and a REPEAT of one weapon is a second swap in a second
        //     group (a Defiler's two heavy reaper autocannons);
        //  3. an option of a group already used, and failing that the first candidate.
        const ref = pool.find((r) => picks.has(key2(r)) && !holds(r))
          || pool.find((r) => !usedGroups.has(r.gi))
          || rest.find((r) => !usedGroups.has(r.gi))
          || pool.find((r) => !picks.has(key2(r)) && roomIn(r.gi))
          || rest.find((r) => !picks.has(key2(r)) && roomIn(r.gi))
          || pool.find((r) => !picks.has(key2(r)))
          || pool[0]
        const k = key2(ref)
        const at = picks.get(k)
        const step = per(ref)
        if (at) {
          if (ref.stepper) count(at, w.mini, key, Math.ceil(left / step), shared)
          at.names.add(key)
          break
        }
        usedGroups.add(ref.gi)
        const pick = { gi: ref.gi, oi: ref.oi, stepper: ref.stepper, n: 1, byMini: new Map(), shared: new Set(), names: new Set([key]) }
        if (ref.stepper) count(pick, w.mini, key, Math.ceil(left / step), shared)
        picks.set(k, pick)
        if (ref.stepper) break
        left -= step
      }
      line.gear.picked.push(w.name)
    }
    if (picks.size) entry.wg = [...picks.values()].map((p) => [p.gi, p.oi, p.stepper ? stepperCount(p) : p.n])

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

    // One entry, possibly two blocks: a Support unit that is itself led stands in the block it
    // supports and in the one its own leader joined it in (see foldRepeatedAttachments).
    for (const m of [{ group: pu.group, attachedAs: pu.attachedAs }, ...(pu.also || [])]) {
      if (!m.group) continue
      if (!groups.has(m.group)) groups.set(m.group, [])
      groups.get(m.group).push({ entry, def, attachedAs: m.attachedAs })
    }
    for (const target of pu.attachedTo || []) attachments.push({ entry, def, target })
    for (const line of pu.loose || []) loose.push({ entry, def, line })
  }

  // WTC states the pair as a line on one of them ("Attached to X") — but not always on the same
  // side, so the CHARACTER of the two is taken as the leader whichever way round it was written.
  //
  // The line names a unit, and a list holds three units of that name: "Attached to Warboss[2]" is
  // the SECOND Warboss the list prints. Without the index every such line pointed at whichever
  // Warboss was stored last, and three characters piled onto one mob — so the rows are kept in list
  // order and the index picks among them.
  const dets = (faction.detachments || []).filter((d) => payload.detachments.includes(d.name))
  const rowsOf = new Map()
  payload.units.forEach((u, i) => {
    const key = norm(report.units[i]?.name)
    if (!rowsOf.has(key)) rowsOf.set(key, [])
    rowsOf.get(key).push({ entry: u, def: byName.get(key) })
  })
  const rowFor = (target) => {
    const at = String(target || '').match(/^(.*?)\s*\[(\d+)\]$/)
    const rows = rowsOf.get(norm(at ? at[1] : target)) || []
    return at ? rows[+at[2] - 1] : rows[0]
  }
  //
  // Which of the two is the leader is a question the DATASHEETS answer, and only where they have no
  // answer does the Character flag decide it. Both units in a pair can be Characters — an Ogryn
  // Bodyguard joins a Cadian Command Squad, which is itself a Character unit leading Shock Troops —
  // and taking the line's own subject as the leader got that backwards. It cost the attachment
  // outright: a leader holds one link, so the wrong one silently replaced the right one.
  const isChar = (d) => !!(d?.flags?.char || d?.flags?.epic)
  const linkFor = (a, other) => {
    if (!other || other.entry === a.entry) return null
    const forward = leadTypeFor(a.def, a.entry, other.def, dets)
    const back = leadTypeFor(other.def, other.entry, a.def, dets)
    if (forward && !back) return { leader: a, body: other, legal: true }
    if (back && !forward) return { leader: other, body: a, legal: true }
    const leader = isChar(a.def) ? a : (isChar(other.def) ? other : null)
    return leader ? { leader, body: leader === a ? other : a, legal: !!forward } : null
  }
  const links = attachments.map((a) => linkFor(a, rowFor(a.target))).filter(Boolean)

  // A line whose only mark is the name of the rule that attaches: an Ogryn Bodyguard says "Loyal
  // Protector Cadian Command Squad[1]" where every other export writes "Attached to". The
  // vocabulary is open — the rule's name is whatever its datasheet calls it — so the line is read
  // by what it RESOLVES to: the longest tail naming another unit in the list, kept only when the
  // datasheets say the two may attach. Everything else stays what it was, a line we did not read.
  for (const l of loose) {
    const words = l.line.split(' ')
    for (let i = 1; i < words.length; i++) {
      const link = linkFor(l, rowFor(words.slice(i).join(' ')))
      if (link?.legal) { links.push(link); break }
    }
  }

  // The legal pairings are made first: a link the rules allow is never displaced by one that only
  // the Character flag suggested, whichever order the list happened to state them in.
  for (const link of [...links.filter((l) => l.legal), ...links.filter((l) => !l.legal)]) {
    if (link.leader.entry.leaderOf) continue
    link.leader.entry.leaderOf = link.body.entry.uid
  }

  // The GW app blocks a leader with the unit it joined, so there the block IS the link. Both
  // attaching roles count: a bodyguard unit holds a Leader and a Support at once (two independent
  // slots — see leaderTargetsFor in rosterEngine.js), and the app names them exactly that way.
  for (const members of groups.values()) {
    // A block may carry no labels at all: listhammer prints "Attached Unit 3" and then the two
    // datasheets, and the header is the whole statement. The DATASHEETS then say which of them is
    // the bodyguard — the one the others are allowed to join — and only a pairing the rules permit
    // is made, so a block we read wrong leaves its units standing alone rather than attached to
    // something they may not join.
    const unlabelled = members.every((m) => !m.attachedAs)
    const canLead = (m, host) => m !== host && !!leadTypeFor(m.def, m.entry, host.def, dets)
    let body = members.find((m) => /^bodyguard/i.test(m.attachedAs || ''))
    if (!body && unlabelled && members.length > 1) {
      const fits = members.filter((host) => members.some((m) => canLead(m, host)))
      if (fits.length === 1) [body] = fits
    }
    if (!body) continue
    for (const m of members) {
      if (m === body) continue
      // A missing "Attached as:" line is not a missing attachment. An Attached Unit block exists to
      // say who joined whom, so anything else in a block that HAS a bodyguard is attached to it —
      // one export prints "Attached as: Bodyguard" under the Tyrant Guard and nothing at all under
      // the Hive Tyrant above it, and reading only the label left the character standing alone.
      if (m.attachedAs && !/^(leader|support)/i.test(m.attachedAs)) continue
      if (unlabelled && !canLead(m, body)) continue
      m.entry.leaderOf = body.entry.uid
    }
  }

  return { payload, report }
}
