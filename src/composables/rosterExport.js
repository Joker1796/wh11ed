// Plain-text roster export, in the shapes the 40k community actually passes around. English names
// throughout (unit / detachment / wargear names are EN by project convention). Pure functions.
//
// FOUR FORMATS, one resolved model:
//   gw       the Warhammer 40,000 app's own 11th-edition export — what a TO asks for and what every
//            list reader (BCP, New Recruit, 40kCompactor) parses first. Attached units come first
//            as their own blocks, then CHARACTERS / DEDICATED TRANSPORTS / OTHER DATASHEETS.
//   wtc      the tournament header format (New Recruit calls it WTC): a `+ KEY: value` block that a
//            judge reads at a glance, then one line per unit with its wargear inline.
//   wtc-compact  the same list with the per-profile breakdown folded away — New Recruit's own
//            shorter tournament export, and what the readers in circulation (40kCompactor,
//            ListForge) accept alongside plain WTC. Same grammar, fewer lines.
//   compact  one line per unit, ours, for pasting into a Discord channel; identical entries
//            collapse into `2x`. The shortest thing here, at the price of not being a format
//            anybody else parses.
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
  allegFor, bucketOf, dispositionCandidates, dispositionOf, enhancementPoints, leadTypeFor, mandatoryEnhancementFor, modelsPerMini,
  optionItems, optionLabel, pickMiniFor, rosterPoints, swapsByMini, unitPoints, wargearGroupLive, effectiveBattle, grantedKeywordsFor } from './rosterEngine.js'
import { factionGroups } from '../data/factionsIndex.js'

export const EXPORT_FORMATS = ['gw', 'wtc', 'wtc-compact', 'compact']

// WTC writes the faction's alliance ahead of its name ("Xenos - T'au Empire"). Our index splits the
// Imperium in two (Space Marine chapters have their own group), which WTC does not.
const ALLIANCE = { astartes: 'Imperium', imperium: 'Imperium', chaos: 'Chaos', xenos: 'Xenos' }

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
function loadoutGroups(def, entry, items) {
  if (!items) return []
  const perMini = modelsPerMini(def, entry)
  const groups = new Map()
  const at = (m) => {
    if (!groups.has(m)) {
      groups.set(m, {
        name: def.minis?.length > 1 ? (def.minis[m]?.n || '') : '',
        models: perMini?.get(m) ?? (entry?.count ?? def.sizes?.[entry?.size ?? 0]?.per?.[0] ?? 1),
        items: new Map(),
      })
    }
    return groups.get(m)
  }
  const add = (m, name, n) => {
    if (!name || n <= 0) return
    const g = at(m)
    g.items.set(name, (g.items.get(name) || 0) + n)
  }

  if (def?.defaults?.length) {
    const removed = swapsByMini(def, entry, perMini)
    for (const [m, list] of def.defaults) {
      const models = perMini?.get(m)
      for (const [id, c, total] of list) {
        // A `total` quantity is the profile's, not each model's (one of the two Gun Servitors has
        // the heavy bolter), so it is printed as recorded rather than multiplied out.
        if (total) { add(m, items[id], c); continue }
        const take = removed.get(`${m}:${id}`) || 0
        add(m, items[id], models == null ? c : c * Math.max(0, models - take))
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
    if (def?.defaults?.length) {
      const m = pickMiniFor(def, entry, gi)
      for (const [id, q] of optionItems(opt)) add(m, items[id], q * (n || 1))
    } else {
      // No recorded default loadout: the option's own label is all we can honestly print, and it
      // stands alone rather than beside weapons we don't know about.
      add(grp.m ?? 0, optionLabel(opt, items), n || 1)
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

function enhancementOf(def, entry, detachments) {
  if (entry?.enh) {
    const found = (detachments || []).flatMap((d) => d.enhancements || []).find((e) => e.name === entry.enh)
    return { name: entry.enh, pts: enhancementPoints(detachments, entry, def), type: found?.type || 'miniature', mandatory: false }
  }
  const m = mandatoryEnhancementFor(def, detachments)
  return m ? { name: m.name, pts: m.pts, type: m.type || 'miniature', mandatory: true } : null
}

function resolve(roster, { faction, core, items } = {}) {
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  const defOf = (id) => defMap.get(id)
  const detachments = (roster?.detachments || [])
    .map((name) => (faction?.detachments || []).find((d) => d.name === name))
    .filter(Boolean)
  const battle = effectiveBattle(roster, core)
  const total = rosterPoints(roster?.units, defOf, detachments)

  // Copy index per datasheet id, in list order — the 2nd and 3rd copy pay the step surcharge, and
  // the export has to sum points exactly as the editor does.
  const seen = new Map()
  // Every unit the faction data files under an allied context, whichever group and whether or not
  // the selected Detachment unlocks it: the export prints what the list HOLDS, and an allied unit
  // is worth naming as one even when it is there illegally (the issues list is where legality is
  // argued). Attached allies stay inside their Attached Unit block, exactly as the app prints them.
  const allyIds = new Set((faction?.allies || []).flatMap((g) => g.ids || []))
  const rows = []
  for (const entry of roster?.units || []) {
    const def = defOf(entry.id)
    if (!def) continue
    const copy = (seen.get(entry.id) || 0) + 1
    seen.set(entry.id, copy)
    const size = def.sizes?.[entry.size ?? 0] || def.sizes?.[0]
    const alleg = allegFor(def, detachments)
    rows.push({
      uid: entry.uid,
      entry,
      def,
      name: def.name,
      // Same gated question the screens ask: a Detachment's Battleline grant decides the section
      // this unit is exported under, not the datasheet's "could be Battleline" flag.
      bucket: bucketOf(def, faction?.slug ? grantedKeywordsFor(entry.id, faction.slug, detachments).map((g) => g.kw) : null),
      ally: allyIds.has(entry.id),
      pts: unitPoints(def, entry, copy, detachments),
      models: entry.count ?? size?.per?.[0] ?? 1,
      warlord: !!entry.warlord,
      alleg: alleg && entry.alleg ? { label: alleg.t || 'Allegiance', value: entry.alleg } : null,
      enh: enhancementOf(def, entry, detachments),
      leaderOf: entry.leaderOf || null,
      gear: loadoutGroups(def, entry, items),
    })
  }

  // Attached units, the way the app blocks them: one block per bodyguard, its leaders above it.
  // A leader whose target is gone from the list is not attached to anything and prints loose.
  const byUid = new Map(rows.map((r) => [r.uid, r]))
  const leadersOf = new Map()
  for (const r of rows) {
    if (!r.leaderOf || !byUid.has(r.leaderOf)) continue
    if (!leadersOf.has(r.leaderOf)) leadersOf.set(r.leaderOf, [])
    leadersOf.get(r.leaderOf).push(r)
  }
  const attached = [...leadersOf.entries()].map(([uid, leaders]) => ({ leaders, body: byUid.get(uid) }))
  const inAttached = new Set(attached.flatMap((g) => [g.body.uid, ...g.leaders.map((l) => l.uid)]))
  const loose = rows.filter((r) => !inAttached.has(r.uid))

  const sizeName = battle.custom
    ? 'Custom'
    : (core?.battleSizes?.find((b) => b.id === roster?.battleSize)?.name || '')

  // The army's own Force Disposition — the declared one where its detachments disagree, and never
  // a list of every candidate: an army list states the card it plays, not the ones it could have.
  return { rows, loose, attached, detachments, battle, total, sizeName, faction, roster, disposition: dispositionOf(roster, detachments) }
}

// ── GW app, 11th edition ─────────────────────────────────────────────────────────────────────

// The app nests the weapons under a model line whenever there IS a model line — a named profile, or
// a multi-model unit of one profile ("• 2x Chaos Spawn"). A lone model carries its weapons directly.
// Within a group the first weapon takes the bullet and the rest are aligned under it, which is the
// app's own layout, not a typo.
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

function gwUnit(row, attachedAs) {
  const out = [`${row.name} (${row.pts} points)`]
  if (attachedAs) out.push(`• Attached as: ${attachedAs}`)
  if (row.warlord) out.push('  • Warlord')
  if (row.alleg) out.push(`  • ${row.alleg.label}: ${row.alleg.value}`)
  // An enhancement that upgrades the whole unit is printed above its weapons; one carried by a
  // character is printed below them. Both spellings come from the app's own exports.
  const enh = row.enh ? `  • Enhancement: ${row.enh.name}${row.enh.type === 'upgrade' ? ' (Upgrade)' : ''}` : null
  if (enh && row.enh.type === 'upgrade') out.push(enh)
  out.push(...gwGear(row))
  if (enh && row.enh.type !== 'upgrade') out.push(enh)
  return out
}

function gwText(m, version) {
  const lines = [`${m.roster?.name || 'Roster'} (${m.total} points)`, '']
  if (m.faction?.name) lines.push(m.faction.name)
  lines.push(`${m.sizeName ? `${m.sizeName} ` : ''}(${m.battle.points} points)`)
  if (m.detachments.length) {
    const names = m.detachments.map((d) => d.name)
    const joined = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0]
    lines.push(`${joined} (${m.battle.dp} Detachment Points)`)
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
        lines.push('', ...gwUnit(l, type === 'support' ? 'Support' : 'Leader (Character)'))
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
function inlineGear(row, all = false) {
  const groups = all || row.gear.length === 1 || !row.gear.some((g) => g.name) ? row.gear : []
  const merged = new Map()
  for (const g of groups) for (const it of g.items) merged.set(it.name, (merged.get(it.name) || 0) + it.n)
  return [...merged]
    .sort((a, b) => a[0].localeCompare(b[0]))   // stable order, so two exports of one list diff cleanly
    .map(([name, n]) => (n > 1 ? `${n}x ${name}` : name))
}

function wtcText(m, compact = false) {
  const bar = '+'.repeat(47)
  const chars = m.rows.filter((r) => r.bucket === 'epic' || r.bucket === 'characters')
  const refOf = new Map(chars.map((r, i) => [r.uid, `Char${i + 1}`]))
  const label = (r) => (refOf.has(r.uid) ? `${refOf.get(r.uid)}: ${r.name}` : r.name)

  const slug = m.roster?.faction
  const group = factionGroups.find((g) => g.factions.some((f) => f.slug === slug))
  const alliance = ALLIANCE[group?.id]

  const out = [bar]
  out.push(`+ FACTION KEYWORD: ${alliance ? `${alliance} - ` : ''}${m.faction?.name || ''}`)
  if (m.detachments.length) {
    const fds = m.disposition ? [m.disposition] : dispositionCandidates(m.detachments)
    out.push(`+ DETACHMENT: ${m.detachments.map((d) => d.name).join(', ')}${fds.length ? ` (${fds.join(', ')})` : ''}`)
  }
  out.push(`+ TOTAL ARMY POINTS: ${m.total}pts`)
  out.push('+')
  const warlord = m.rows.find((r) => r.warlord)
  if (warlord) out.push(`+ WARLORD: ${label(warlord)}`)
  const enhanced = m.rows.filter((r) => r.enh)
  enhanced.forEach((r, i) => {
    out.push(`${i === 0 ? '+ ENHANCEMENT: ' : '& '}${r.enh.name} (on ${label(r)})`)
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

function compactText(m) {
  const head = [m.roster?.name, m.faction?.name, m.detachments.map((d) => d.name).join(', ')]
    .filter(Boolean)
    .join(' — ')
  const lines = [`${head}${head ? ' — ' : ''}${m.total}/${m.battle.points} pts`, '']

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
        return opt && wargearGroupLive(r.def, r.entry, gi) ? `${n > 1 ? `${n}x ` : ''}${optionLabel(opt, m.items)}` : null
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

// ── entry point ──────────────────────────────────────────────────────────────────────────────

// `version` (optional) is `{ app, data }` for the GW-format footer — the caller has them, this
// module does not import either.
export function buildRosterText(roster, ctx = {}, format = 'gw') {
  const m = resolve(roster, ctx)
  m.items = ctx.items
  if (format === 'wtc') return wtcText(m)
  if (format === 'wtc-compact') return wtcText(m, true)
  if (format === 'compact') return compactText(m)
  return gwText(m, ctx.version)
}
