// @ts-check
// Plain-text roster export, in the shapes the 40k community actually passes around. English names
// throughout (unit / detachment / wargear names are EN by project convention). Pure functions.
//
// SIX FORMATS, one resolved model:
//   gw       the Warhammer 40,000 app's own 11th-edition export — what a TO asks for and what every
//            list reader (BCP, New Recruit, 40kCompactor) parses first. Attached units come first
//            as their own blocks, then CHARACTERS / DEDICATED TRANSPORTS / OTHER DATASHEETS.
//   wtc      the tournament header format (New Recruit calls it WTC): a `+ KEY: value` block that a
//            judge reads at a glance, then one line per unit with its wargear inline.
//   wtc-compact  the same list with the per-profile breakdown folded away — New Recruit's own
//            shorter tournament export, and what the readers in circulation (40kCompactor,
//            ListForge) accept alongside plain WTC. Same grammar, fewer lines.
//   compact  one line per unit, ours, for pasting into a Discord channel; identical entries
//            collapse into `2x`, wargear and enhancement in brackets.
//   simple   War Organ's "simple" export: a name, the faction, the points, the detachments and
//            the disposition, then "Unit (N points)" per unit and nothing else — no wargear, no
//            collapsing. Asked for by a player (2026-10-05): the Discord lines, carrying their
//            wargear, wrapped two and three deep in a phone's chat.
//   rus      a Russian tournament's list, as the organisers' rules ask for it (Ordo Eventus): the
//            `+ PLAYER NAME / HIN / … / WARLORD / ENHANCEMENT` header, "Attached Unit N:" blocks,
//            units under keyword prefixes (CH1:, IN2:), only the swaps the player made. Asked
//            for by a contributor and the owner (2026-10-13).
//
// The 11th-edition app export differs from the 10th's in ways this file has to honour: several
// detachments at once with a Detachment Points budget, a Force Dispositions line, and attached
// units printed as `Attached Unit N` blocks with `• Attached as: Leader (Character)` / `Bodyguard`
// rather than a "leading" note on the character.
//
// WHAT WE CANNOT REPRODUCE. The app holds the full datasheet, so it prints every weapon of every
// model; we hold the roster bundle. Where a datasheet records its `defaults` we print the whole
// fielded loadout with swaps applied (the same modelsPerMini/swapsByMini accounting the editor
// shows on screen); where it does not, we fall back to listing only what the player CHANGED.
import {
  allegFor, bucketOf, chapterOf, dispositionCandidates, dispositionOf, enhancementPoints, leadTypeFor, mandatoryEnhancementFor, modelsPerMini,
  copiesHeld, copiesLeft, optionItems, optionLabel, pickMiniFor, rosterPoints, swapsByMini, unitPoints, wargearGroupLive, effectiveBattle, grantedKeywordsFor, orderedByName,
  miniName, modelCount, rosterDetachments, hasKeyword,
} from './rosterEngine.js'

/** @typedef {import('../shared/roster.types.js').Roster} Roster */
/** @typedef {import('../shared/roster.types.js').RosterFaction} RosterFaction */
/** @typedef {import('../shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../shared/roster.types.js').RosterEntry} RosterEntry */
/** @typedef {import('../shared/roster.types.js').Detachment} Detachment */
/** @typedef {import('../shared/roster.types.js').BattleSize} BattleSize */
/** One profile's share of a unit's loadout, as the export prints it. @typedef {{ name: string, models: number, items: Array<{ name: string, n: number }> }} GearOut */
/**
 * One roster entry, resolved for printing.
 * @typedef {object} ExportRow
 * @property {string} uid
 * @property {RosterEntry} entry
 * @property {RosterUnit} def
 * @property {string} name
 * @property {string} bucket
 * @property {boolean} ally
 * @property {number} pts
 * @property {number} models
 * @property {boolean} warlord
 * @property {{ label: string, value: string } | null} alleg
 * @property {ReturnType<typeof enhancementOf>} enh
 * @property {string | null} leaderOf
 * @property {GearOut[]} gear
 */
/** The whole list, resolved once for every format. @typedef {ReturnType<typeof resolve>} Resolved */
/** What the export needs besides the roster; `factionGroups` is the app's faction directory (src/data/factionsIndex.js), for the alliance a faction keyword line opens with. @typedef {{ faction?: RosterFaction | null, core?: { battleSizes?: BattleSize[] } | null, items?: Record<number, string> | null, factionGroups?: FactionGroup[] | null }} ExportContext */
/** @typedef {import('../shared/roster.types.js').FactionGroup} FactionGroup */

export const EXPORT_FORMATS = ['gw', 'wtc', 'wtc-compact', 'compact', 'simple', 'rus']

// WTC writes the faction's alliance ahead of its name ("Xenos - T'au Empire"). Our index splits the
// Imperium in two (Space Marine chapters have their own group), which WTC does not.
/** @type {Record<string, string>} */
const ALLIANCE = { astartes: 'Imperium', imperium: 'Imperium', chaos: 'Chaos', xenos: 'Xenos' }

// A Chapter with a book of its own sits under the Adeptus Astartes keyword in WTC's line: "Imperium -
// Adeptus Astartes - Blood Angels" (2026-10-16, a player's note — ours printed "Imperium - Blood
// Angels"). Space Marines themselves are named by that keyword already, and one of the Codex's own
// Chapters follows it the same way: "Imperium - Adeptus Astartes - Salamanders" (Ordo Eventus's
// sample) — the Chapter the list names or declares (chapterOf), nothing when it is neither.
/** @param {Resolved} m */
function factionKeywordLine(m) {
  const slug = m.roster?.faction
  const group = (m.factionGroups || []).find((g) => g.factions.some((f) => f.slug === slug))
  const name = m.faction?.name || ''
  const parts = [group ? ALLIANCE[group.id] : undefined]
  if (group?.id === 'astartes' && slug !== 'space-marines') parts.push('Adeptus Astartes')
  return `+ FACTION KEYWORD: ${[...parts, name, m.chapter].filter(Boolean).join(' - ')}`
}

// GW's own section headings, and which of our five buckets land under each. Battleline has no
// heading of its own in the 11th-edition export — a battleline unit prints under OTHER DATASHEETS,
// or, when it is attached, as `Bodyguard (Battleline)`.
const GW_SECTIONS = [
  { title: 'CHARACTERS', buckets: ['epic', 'characters'] },
  { title: 'DEDICATED TRANSPORTS', buckets: ['transports'] },
  // Every bucket that isn't a Character or a Dedicated Transport — GW's export has four headings
  // and does not care how our screens sub-divide the rest, so splitting Vehicles/Infantry out of
  // "other" (2026-08-28) must not drop them off the page.
  { title: 'OTHER DATASHEETS', buckets: ['battleline', 'fortifications', 'vehicles', 'infantry', 'other'] },
]

// ── the resolved list, shared by all three emitters ──────────────────────────────────────────

// The wargear a unit entry actually fields, grouped by miniature profile the way the app groups it:
// [{ name: 'Khorne Berzerker Champion', models: 1, items: [{ name: 'Chainblade', n: 1 }] }].
// Counts are TOTALS (7 chainblades across 7 models), which is what the app prints, not the
// per-model quantity the editor shows.
//
// `null` from modelsPerMini means the split between profiles is unknown (a bracket that leaves two
// profiles free); we then keep the per-model quantity rather than inventing a total.
/**
 * @param {RosterUnit} def
 * @param {RosterEntry} entry
 * @param {Record<number, string> | null | undefined} items
 * @returns {GearOut[]}
 */
function loadoutGroups(def, entry, items) {
  if (!items) return []
  const defaults = def.defaults || []
  const perMini = modelsPerMini(def, entry)
  /** @type {Map<number, { name: string, models: number, items: Map<string, number> }>} */
  const groups = new Map()
  /** @param {number} m */
  const at = (m) => {
    let g = groups.get(m)
    if (!g) {
      g = {
        name: miniName(def, m),
        models: perMini?.get(m) ?? modelCount(def, entry),
        items: new Map(),
      }
      groups.set(m, g)
    }
    return g
  }
  /** @param {number} m @param {string | undefined} name @param {number} n */
  const add = (m, name, n) => {
    if (!name || n <= 0) return
    const g = at(m)
    g.items.set(name, (g.items.get(name) || 0) + n)
  }

  let removed = null
  if (defaults.length) {
    removed = swapsByMini(def, entry, perMini)
    for (const [m, list] of defaults) {
      const models = perMini?.get(m)
      for (const [id, c, total] of list) {
        // A `total` quantity is the profile's, not each model's (one of the two Gun Servitors has
        // the heavy bolter), so it is printed as recorded rather than multiplied out, less the
        // copies a swap took (copiesHeld).
        const take = removed.get(`${m}:${id}`) || 0
        if (total) { add(m, items[id], copiesHeld(c, total, models, take)); continue }
        add(m, items[id], models == null ? c : copiesLeft(c, models, take))
      }
    }
  }
  // …and what the player picked on top, under the profile that gave the replaced weapon up
  // (pickMiniFor — for a unit-wide group that is a display convention, see swapsByMini).
  for (const [gi, oi, n] of entry?.wg || []) {
    const grp = def?.gear?.[gi]
    if (!grp || !wargearGroupLive(def, entry, gi)) continue
    const opt = grp.o?.[oi]
    if (!opt) continue
    if (defaults.length) {
      const m = pickMiniFor(def, entry, gi)
      for (const [id, q] of optionItems(opt)) add(m, items[id], q * (n || 1))
    } else {
      // No recorded default loadout: the option's own label is all we can honestly print, and it
      // stands alone rather than beside weapons we don't know about.
      add(grp.m ?? 0, optionLabel(opt, items), n || 1)
    }
  }

  // What a model gave up that its printed lines could not have held came off an option's copies —
  // a chained swap ("bolt pistol → hand flamer" after a swap that handed the pistol out), or a
  // printed item handed back by one option and taken by another group (the Deathwatch Terminator's
  // cyclone storm bolter, a player 2026-10-08). The same reading as rosterModifiers'
  // loadoutItemCopies, so the export and the card print one loadout.
  if (removed) {
    const printed = new Set(defaults.flatMap(([m, list]) => list.map(([id]) => `${m}:${id}`)))
    for (const [key, take] of removed) {
      const [m, id] = key.split(':').map(Number)
      const models = perMini?.get(m)
      if (!take) continue
      let left = take
      if (printed.has(key)) {
        if (models == null) continue
        left -= models
      }
      for (const g of [groups.get(m), ...[...groups.values()].filter((x) => x !== groups.get(m))]) {
        if (left <= 1e-9 || !g) continue
        const have = g.items.get(items[id]) || 0
        const d = Math.min(have, left)
        if (d >= have) g.items.delete(items[id])
        else g.items.set(items[id], have - d)
        left -= d
      }
    }
  }

  return [...groups.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, g]) => ({
      name: g.name,
      models: g.models,
      items: [...g.items].map(([name, n]) => ({ name, n })).sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((g) => g.items.length)
}

// The same loadout as one total per weapon, for the importer to hold a list against. `null` where
// the totals are not known: no printed loadout recorded, or a split between profiles left open.
/**
 * @param {RosterUnit} def
 * @param {RosterEntry} entry
 * @param {Record<number, string> | null | undefined} items
 * @returns {Map<string, number> | null}
 */
export function fieldedTotals(def, entry, items) {
  if (!items || !def?.defaults?.length || !modelsPerMini(def, entry)) return null
  /** @type {Map<string, number>} */
  const out = new Map()
  for (const g of loadoutGroups(def, entry, items)) for (const it of g.items) out.set(it.name, (out.get(it.name) || 0) + it.n)
  return out
}

/**
 * @param {RosterUnit} def
 * @param {RosterEntry} entry
 * @param {Detachment[]} detachments
 */
function enhancementOf(def, entry, detachments) {
  if (entry?.enh) {
    const found = (detachments || []).flatMap((d) => d.enhancements || []).find((e) => e.name === entry.enh)
    return { name: entry.enh, pts: enhancementPoints(detachments, entry, def), type: found?.type || 'miniature', mandatory: false }
  }
  const m = mandatoryEnhancementFor(def, detachments)
  return m ? { name: m.name, pts: m.pts, type: m.type || 'miniature', mandatory: true } : null
}

/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {ExportContext} [ctx]
 */
function resolve(roster, { faction, core, items, factionGroups } = {}) {
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  /** @param {string} id */
  const defOf = (id) => defMap.get(id)
  const detachments = rosterDetachments(roster, faction)
  const battle = effectiveBattle(roster, core)
  const total = rosterPoints(roster?.units, defOf, detachments)

  // Copy index per datasheet id, in list order — the 2nd and 3rd copy pay the step surcharge, and
  // the export has to sum points exactly as the editor does.
  /** @type {Map<string, number>} */
  const seen = new Map()
  // Every unit the faction data files under an allied context, whichever group and whether or not
  // the selected Detachment unlocks it: the export prints what the list HOLDS, and an allied unit
  // is worth naming as one even when it is there illegally (the issues list is where legality is
  // argued). Attached allies stay inside their Attached Unit block, exactly as the app prints them.
  const allyIds = new Set((faction?.allies || []).flatMap((g) => g.ids || []))
  /** @type {ExportRow[]} */
  const rows = []
  for (const entry of roster?.units || []) {
    const def = defOf(entry.id)
    if (!def) continue
    const copy = (seen.get(entry.id) || 0) + 1
    seen.set(entry.id, copy)
    const alleg = allegFor(def, detachments)
    rows.push({
      uid: entry.uid,
      entry,
      def,
      name: def.name,
      // Same gated question the screens ask: a Detachment's Battleline grant decides the section
      // this unit is exported under, not the datasheet's "could be Battleline" flag.
      bucket: bucketOf(def, faction ? grantedKeywordsFor(def, detachments).map((g) => g.kw) : null),
      ally: allyIds.has(entry.id),
      pts: unitPoints(def, entry, copy, detachments),
      models: modelCount(def, entry),
      warlord: !!entry.warlord,
      alleg: alleg && entry.alleg ? { label: alleg.t || 'Allegiance', value: entry.alleg } : null,
      enh: enhancementOf(def, entry, detachments),
      leaderOf: entry.leaderOf || null,
      gear: loadoutGroups(def, entry, items),
    })
  }

  // In the order the screen reads them — by name inside a section (rosterEngine's sectionsOf),
  // copies of one datasheet in adding order — so a printed page and the exported text agree line
  // for line. The copy index above was assigned in adding order, as the screen assigns it.
  const ordered = orderedByName(rows, (r) => r.name)

  // Attached units, the way the app blocks them: one block per bodyguard, its leaders above it,
  // the blocks in the order of their hosts. A leader whose target is gone from the list is not
  // attached to anything and prints loose.
  const byUid = new Map(ordered.map((r) => [r.uid, r]))
  /** @type {Map<string, ExportRow[]>} */
  const leadersOf = new Map()
  for (const r of ordered) {
    if (!r.leaderOf || !byUid.has(r.leaderOf)) continue
    let leaders = leadersOf.get(r.leaderOf)
    if (!leaders) leadersOf.set(r.leaderOf, (leaders = []))
    leaders.push(r)
  }
  const attached = orderedByName([...leadersOf.entries()].flatMap(([uid, leaders]) => {
    const body = byUid.get(uid)
    return body ? [{ leaders, body }] : []
  }), (g) => g.body.name)
  const inAttached = new Set(attached.flatMap((g) => [g.body.uid, ...g.leaders.map((l) => l.uid)]))
  const loose = ordered.filter((r) => !inAttached.has(r.uid))

  const sizeName = battle.custom
    ? 'Custom'
    : (core?.battleSizes?.find((b) => b.id === roster?.battleSize)?.name || '')

  // The army's own Force Disposition — the declared one where its detachments disagree, and never
  // a list of every candidate: an army list states the card it plays, not the ones it could have.
  return { rows, loose, attached, detachments, battle, total, sizeName, faction, roster, items, factionGroups, disposition: dispositionOf(roster, detachments), chapter: chapterOf(roster, faction) }
}

// ── GW app, 11th edition ─────────────────────────────────────────────────────────────────────

// The app nests the weapons under a model line whenever there IS a model line — a named profile, or
// a multi-model unit of one profile ("• 2x Chaos Spawn"). A lone model carries its weapons directly.
// Within a group the first weapon takes the bullet and the rest are aligned under it, which is the
// app's own layout, not a typo.
/** @param {ExportRow} row */
function gwGear(row) {
  const out = []
  const nested = row.gear.length > 1 || row.models > 1
  for (const g of row.gear) {
    if (nested) {
      out.push(`  • ${g.models}x ${g.name || row.name}`)
      g.items.forEach((it, i) => out.push(`${i === 0 ? '    • ' : '      '}${it.n}x ${it.name}`))
    } else {
      g.items.forEach((it, i) => out.push(`${i === 0 ? '  • ' : '    '}${it.n}x ${it.name}`))
    }
  }
  return out
}

/** @param {ExportRow} row @param {string | null} attachedAs */
function gwUnit(row, attachedAs) {
  const out = [`${row.name} (${row.pts} points)`]
  if (attachedAs) out.push(`• Attached as: ${attachedAs}`)
  if (row.warlord) out.push('  • Warlord')
  if (row.alleg) out.push(`  • ${row.alleg.label}: ${row.alleg.value}`)
  // An enhancement that upgrades the whole unit is printed above its weapons; one carried by a
  // character is printed below them. Both spellings come from the app's own exports.
  const e = row.enh
  const enh = e ? `  • Enhancement: ${e.name}${e.type === 'upgrade' ? ' (Upgrade)' : ''}` : null
  if (enh && e?.type === 'upgrade') out.push(enh)
  out.push(...gwGear(row))
  if (enh && e?.type !== 'upgrade') out.push(enh)
  return out
}

/** @param {Resolved} m @param {{ app: string, data: string | number } | undefined} version */
function gwText(m, version) {
  const lines = [`${m.roster?.name || 'Roster'} (${m.total} points)`, '']
  if (m.faction?.name) lines.push(m.faction.name)
  // A list with no limit has no battle-size line: GW's format knows only the three sizes and a
  // number, and an importer reading none falls back to Strike Force.
  if (!m.battle.unlimited) lines.push(`${m.sizeName ? `${m.sizeName} ` : ''}(${m.battle.points} points)`)
  if (m.detachments.length) {
    const names = m.detachments.map((d) => d.name)
    const joined = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0]
    // No limit, no budget to state: the line keeps its shape (the importer finds the detachments
    // by it) and says what the detachments spend.
    const dp = m.battle.unlimited ? m.detachments.reduce((s, d) => s + (d.dp || 0), 0) : m.battle.dp
    lines.push(`${joined} (${dp} Detachment Points)`)
    // The one the army DECLARED. Undeclared (several detachments, nobody has chosen) prints the
    // candidates as it always did — the line then states the choice that is still open rather than
    // vanishing, and the importer takes only a single name as a declaration.
    const fds = m.disposition ? [m.disposition] : dispositionCandidates(m.detachments)
    if (fds.length) lines.push(`Force Dispositions: ${fds.join(', ')}`)
  }

  if (m.attached.length) {
    lines.push('', 'Attached Units')
    m.attached.forEach((g, i) => {
      lines.push(`Attached Unit ${i + 1}`)
      // The two attaching roles are different words in the app: a Support unit joins the same
      // bodyguard a Leader does, and calling Masters of the Maelstrom a Leader (Character) both
      // misstates what it is and loses which of the host's two slots it fills.
      for (const l of g.leaders) {
        const type = leadTypeFor(l.def, l.entry, g.body.def, m.detachments)
        // A unit that joins a led unit (Cryptothralls, Servitors) is neither: the app's word for
        // it is not known to us, so ours — and the importer reads it back.
        lines.push('', ...gwUnit(l, type === 'support' ? 'Support' : type === 'join' ? 'Retinue' : 'Leader (Character)'))
      }
      const role = g.body.bucket === 'battleline' ? 'Bodyguard (Battleline)' : 'Bodyguard'
      lines.push('', ...gwUnit(g.body, role), '')
    })
  }

  for (const section of GW_SECTIONS) {
    const rows = m.loose.filter((r) => !r.ally && section.buckets.includes(r.bucket))
    if (!rows.length) continue
    lines.push(section.title)
    for (const r of rows) lines.push('', ...gwUnit(r, null))
    lines.push('')
  }

  // The app's own heading for units that are in the army without its Faction keyword — and one our
  // own importer already reads, so a list exported here comes back in whole.
  const allies = m.loose.filter((r) => r.ally)
  if (allies.length) {
    lines.push('ALLIED UNITS')
    for (const r of allies) lines.push('', ...gwUnit(r, null))
    lines.push('')
  }

  // Deliberately NOT the app's own "Exported with App Version…" line: this list was not exported by
  // the app, and a reader (or a parser) is entitled to know which tool and which points data wrote
  // it. The shape is kept close enough that the same readers still recognise the footer.
  lines.push(`Exported with wh-rules.ru${version ? ` — App Version: v${version.app}, Data Version: v${version.data}` : ''}`)
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd()
}

// ── WTC ──────────────────────────────────────────────────────────────────────────────────────

// A unit's wargear on one line. `all` folds the per-profile groups in as well, which is the only
// difference between WTC and its compact form.
/** @param {ExportRow} row @param {boolean} [all] */
function inlineGear(row, all = false) {
  const groups = all || row.gear.length === 1 || !row.gear.some((g) => g.name) ? row.gear : []
  const merged = new Map()
  for (const g of groups) for (const it of g.items) merged.set(it.name, (merged.get(it.name) || 0) + it.n)
  return [...merged]
    .sort((a, b) => a[0].localeCompare(b[0]))   // stable order, so two exports of one list diff cleanly
    .map(([name, n]) => (n > 1 ? `${n}x ${name}` : name))
}

/** @param {Resolved} m @param {boolean} [compact] */
function wtcText(m, compact = false) {
  const bar = '+'.repeat(47)
  const chars = m.rows.filter((r) => r.bucket === 'epic' || r.bucket === 'characters')
  const refOf = new Map(chars.map((r, i) => [r.uid, `Char${i + 1}`]))
  /** @param {ExportRow} r */
  const label = (r) => (refOf.has(r.uid) ? `${refOf.get(r.uid)}: ${r.name}` : r.name)

  const out = [bar]
  out.push(factionKeywordLine(m))
  if (m.detachments.length) {
    const fds = m.disposition ? [m.disposition] : dispositionCandidates(m.detachments)
    out.push(`+ DETACHMENT: ${m.detachments.map((d) => d.name).join(', ')}${fds.length ? ` (${fds.join(', ')})` : ''}`)
  }
  out.push(`+ TOTAL ARMY POINTS: ${m.total}pts`)
  out.push('+')
  const warlord = m.rows.find((r) => r.warlord)
  if (warlord) out.push(`+ WARLORD: ${label(warlord)}`)
  const enhanced = m.rows.flatMap((r) => (r.enh ? [{ r, enh: r.enh }] : []))
  enhanced.forEach(({ r, enh }, i) => {
    out.push(`${i === 0 ? '+ ENHANCEMENT: ' : '& '}${enh.name} (on ${label(r)})`)
  })
  out.push(`+ NUMBER OF UNITS: ${m.rows.length}`)
  out.push(bar, '')

  // Characters first with their reference numbers, then everything else — the order the judge's
  // eye expects, and the one the header's `on Char4:` pointers rely on.
  for (const r of [...chars, ...m.rows.filter((x) => !refOf.has(x.uid))]) {
    const head = refOf.has(r.uid)
      ? `${refOf.get(r.uid)}: ${r.models}x ${r.name} (${r.pts} pts)`
      : `${r.models}x ${r.name} (${r.pts} pts)`
    const inline = [...(r.warlord ? ['Warlord'] : []), ...(r.alleg ? [`${r.alleg.label}: ${r.alleg.value}`] : []), ...inlineGear(r, compact)]
    out.push(inline.length ? `${head}: ${inline.join(', ')}` : head)
    if (!compact && r.gear.length > 1) {
      for (const g of r.gear) {
        out.push(`• ${g.models}x ${g.name}: ${g.items.map((it) => (it.n > 1 ? `${it.n}x ${it.name}` : it.name)).join(', ')}`)
      }
    }
    if (r.enh) out.push(`Enhancement: ${r.enh.name} (+${r.enh.pts} pts)`)
    // Who this unit joined. The format has a line for it and the readers in circulation parse it,
    // so writing it is what keeps an attachment alive through an export/import round trip.
    const led = r.leaderOf ? m.rows.find((x) => x.uid === r.leaderOf) : null
    if (led) out.push(`  Attached to ${led.name}`)
  }
  return out.join('\n').trimEnd()
}

// ── Discord-compact ──────────────────────────────────────────────────────────────────────────

/** @param {Resolved} m */
function compactText(m) {
  const head = [m.roster?.name, m.faction?.name, m.detachments.map((d) => d.name).join(', ')]
    .filter(Boolean)
    .join(' — ')
  const cap = m.battle.unlimited ? '' : `/${m.battle.points}`
  const lines = [`${head}${head ? ' — ' : ''}${m.total}${cap} pts`]
  // A list held to the player's own limits (a custom size) says which, so the reader in the chat
  // is not checking it against a printed size. English, like every line this format writes.
  if (m.battle.ownLimits) {
    const b = m.battle
    lines.push(`Own limits: ${b.dp} DP · ${b.enhLimit} enhancements · ${b.dupLimit} copies · ${b.lineLimit} Battleline`)
  }
  lines.push('')

  // Identical entries collapse: same datasheet, same size, same loadout, same enhancement. Points
  // are summed rather than multiplied, so the copy surcharge stays visible in the total.
  const bag = new Map()
  for (const r of m.rows) {
    const tags = [
      ...(r.warlord ? ['Warlord'] : []),
      ...(r.alleg ? [r.alleg.value] : []),
      ...(r.enh ? [`Enh: ${r.enh.name}`] : []),
      ...(r.entry.wg || []).map(([gi, oi, n]) => {
        const opt = r.def?.gear?.[gi]?.o?.[oi]
        return opt && wargearGroupLive(r.def, r.entry, gi) ? `${(n ?? 1) > 1 ? `${n}x ` : ''}${optionLabel(opt, m.items)}` : null
      }).filter(Boolean),
    ]
    const led = r.leaderOf ? m.rows.find((x) => x.uid === r.leaderOf) : null
    if (led) tags.push(`leads ${led.name}`)
    const key = `${r.def.id}|${r.models}|${tags.join('|')}`
    const hit = bag.get(key)
    if (hit) { hit.n += 1; hit.pts += r.pts } else bag.set(key, { n: 1, pts: r.pts, row: r, tags })
  }
  for (const { n, pts, row, tags } of bag.values()) {
    const size = row.models > 1 ? ` (${row.models})` : ''
    lines.push(`• ${n > 1 ? `${n}x ` : ''}${row.name}${size} — ${pts} pts${tags.length ? ` [${tags.join(', ')}]` : ''}`)
  }
  return lines.join('\n').trimEnd()
}

// ── Simple (War Organ) ───────────────────────────────────────────────────────────────────────

// "АспектХост [Aeldari] - (2000 points)", "Detachments: Aspect Host", the disposition alone on the
// next line, a blank, then every unit in the screen's order as "Autarch (90 points)". A row's
// points already carry its enhancement, so the lines add up to the total in the header.
/** @param {Resolved} m */
function simpleText(m) {
  const name = m.roster?.name || m.faction?.name || ''
  const lines = [`${name}${m.faction?.name ? ` [${m.faction.name}]` : ''} - (${m.total} points)`]
  if (m.detachments.length) lines.push(`Detachments: ${m.detachments.map((d) => d.name).join(', ')}`)
  const fds = m.disposition ? [m.disposition] : dispositionCandidates(m.detachments)
  if (fds.length) lines.push(fds.join(', '))
  lines.push('')
  for (const r of orderedByName(m.rows, (x) => x.name)) lines.push(`${r.name} (${r.pts} points)`)
  return lines.join('\n').trimEnd()
}

// ── Russian tournament (Ordo Eventus) ────────────────────────────────────────────────────────

// A Russian tournament's list, written to the rules an organiser publishes with the event — the
// owner's own club's (Ordo Eventus, "Правила составления ростера", 2025; 2026-10-13), the most
// precise of the ones collected: the `+ PLAYER NAME / ARMY NAME / HIN / FACTION KEYWORD /
// DETACHMENT / FORCE DISPOSITION / TOTAL ARMY POINTS / WARLORD / ENHANCEMENT` header (HIN is the
// player's rating number, "-" until they have one; ONE disposition, the one they play), every
// attachment as an "Attached Unit N:" block, the rest under keyword prefixes (EH1:, CH1:, IN2: …),
// the model count only where the unit's size can vary, and of a unit's wargear only the swaps the
// player made — never the printed loadout, kept or fixed (owner, 2026-10-13, after a reviewer
// found "2x Melta Rifle" beside the one multi-melta). A first draft followed 40001format.xyz and
// printed the whole loadout; a second printed every changeable item, kept ones included.

// The prefixes, in the order the list is written. A unit takes the first that fits it.
/** @type {Array<[string, (r: ExportRow) => boolean]>} */
const RUS_PREFIXES = [
  ['EH', (r) => r.bucket === 'epic'],
  ['CH', (r) => r.bucket === 'characters'],
  ['BL', (r) => r.bucket === 'battleline'],
  ['DT', (r) => r.bucket === 'transports'],
  ['FO', (r) => r.bucket === 'fortifications'],
  ['IN', (r) => hasKeyword(r.def, 'Infantry') || hasKeyword(r.def, 'Swarm')],
  ['MO', (r) => hasKeyword(r.def, 'Mounted')],
  ['BE', (r) => hasKeyword(r.def, 'Beast')],
  ['VE', (r) => hasKeyword(r.def, 'Vehicle')],
  ['MN', (r) => hasKeyword(r.def, 'Monster')],
]
const RUS_ORDER = ['EH', 'CH', 'BL', 'IN', 'MO', 'BE', 'VE', 'MN', 'DT', 'FO', 'AU']
/** @param {ExportRow} r */
const rusPrefix = (r) => (r.ally ? 'AU' : RUS_PREFIXES.find(([, fits]) => fits(r))?.[0] || 'IN')

// What the player changed, and nothing else: each option taken, with how many models took it
// ("1x Multi-melta" on a three-model Eradicator Squad, never the two melta rifles left). The
// owner's ruling (2026-10-13): the printed loadout is on the datasheet, the list says the swaps.
/** @param {ExportRow} r @param {Record<number, string> | null | undefined} items */
function swappedGear(r, items) {
  const taken = new Map()
  for (const [gi, oi, n] of r.entry.wg || []) {
    const opt = r.def?.gear?.[gi]?.o?.[oi]
    if (!opt || !wargearGroupLive(r.def, r.entry, gi)) continue
    const label = optionLabel(opt, items)
    taken.set(label, (taken.get(label) || 0) + (n ?? 1))
  }
  return [...taken]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, n]) => (n > 1 || r.models > 1 ? `${n}x ${label}` : label))
}

/** @param {Resolved} m @param {{ player?: string, hin?: string }} [who] */
function rusText(m, who = {}) {
  const bar = '+'.repeat(47)
  const fds = m.disposition ? [m.disposition] : dispositionCandidates(m.detachments)

  // The order the units are written in: the attached blocks first, then every other unit by its
  // prefix. Numbers count per prefix across the whole list, so the header can point at "CH1".
  const led = new Set(m.rows.filter((r) => r.leaderOf).map((r) => r.leaderOf))
  const hosts = m.rows.filter((r) => led.has(r.uid) && !r.leaderOf)
  const blocks = hosts.map((h) => [...m.rows.filter((x) => x.leaderOf === h.uid), h])
  const inBlock = new Set(blocks.flat().map((r) => r.uid))
  /** @type {Array<[string, ExportRow[]]>} */
  const rest = RUS_ORDER.map((p) => [p, orderedByName(m.rows.filter((r) => !inBlock.has(r.uid) && rusPrefix(r) === p), (r) => r.name)])
  /** @type {Map<string, string>} */
  const ref = new Map()
  /** @type {Map<string, number>} */
  const count = new Map()
  for (const r of [...blocks.flat(), ...rest.flatMap(([, rows]) => rows)]) {
    const p = rusPrefix(r)
    count.set(p, (count.get(p) || 0) + 1)
    ref.set(r.uid, `${p}${count.get(p)}`)
  }

  const warlord = m.rows.find((r) => r.warlord)
  const enhanced = m.rows.filter((r) => r.enh)
  const out = [
    bar,
    `+ PLAYER NAME: ${who.player || ''}`.trimEnd(),
    `+ ARMY NAME: ${m.roster?.name || ''}`.trimEnd(),
    `+ HIN: ${who.hin || '-'}`,
    factionKeywordLine(m),
    `+ DETACHMENT: ${m.detachments.map((d) => d.name).join(', ')}`.trimEnd(),
    `+ FORCE DISPOSITION: ${fds[0] || ''}`.trimEnd(),
    `+ TOTAL ARMY POINTS: ${m.total}pts`,
    `+ WARLORD: ${warlord ? warlord.name : '-'}`,
    `+ ENHANCEMENT: ${enhanced.length ? enhanced.map((r) => `${ref.get(r.uid)}: ${r.enh?.name}`).join(', ') : '-'}`,
    bar,
  ]

  /** @param {ExportRow} r */
  const line = (r) => {
    const sz = r.def?.sizes || []
    const varies = sz.length > 1 || sz.some((s) => s.per && s.per[0] !== s.per[1])
    const parts = [
      ...(r.alleg ? [r.alleg.value] : []),
      ...swappedGear(r, m.items),
      ...(r.enh ? [r.enh.name] : []),
      ...(r.warlord ? ['Warlord'] : []),
    ]
    return `${ref.get(r.uid)}: ${varies ? `(${r.models}) ` : ''}${r.name}${parts.length ? `: ${parts.join(', ')}` : ''} (${r.pts} pts)`
  }

  blocks.forEach((rows, i) => out.push('', `Attached Unit ${i + 1}:`, ...rows.map(line)))
  for (const [, rows] of rest) if (rows.length) out.push('', ...rows.map(line))
  return out.join('\n').trimEnd()
}

// ── entry point ──────────────────────────────────────────────────────────────────────────────

// `version` (optional) is `{ app, data }` for the GW-format footer — the caller has them, this
// module does not import either.
/**
 * @param {Partial<Roster> | null | undefined} roster
 * @param {ExportContext & { version?: { app: string, data: string | number }, who?: { player?: string, hin?: string } }} [ctx]
 * @param {string} [format] one of EXPORT_FORMATS
 * @returns {string}
 */
export function buildRosterText(roster, ctx = {}, format = 'gw') {
  const m = resolve(roster, ctx)
  if (format === 'wtc') return wtcText(m)
  if (format === 'wtc-compact') return wtcText(m, true)
  if (format === 'compact') return compactText(m)
  if (format === 'simple') return simpleText(m)
  if (format === 'rus') return rusText(m, ctx.who)
  return gwText(m, ctx.version)
}
