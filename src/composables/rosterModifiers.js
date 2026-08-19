// Roster modifier overlay — what a datasheet looks like for ONE roster entry, as opposed to the
// bare printed sheet. Pure functions, no Vue, no store (same discipline as rosterEngine.js /
// rosterValidation.js). See ROSTER-MODIFIERS-PROGRESS.md for the phased plan; this file is
// Tier A: it trims the weapon tables to the loadout the entry actually fields, resolves the
// keywords the roster's detachments grant it, and reports the roster facts that aren't on the
// datasheet at all (Warlord, enhancement, attachment). `notes` stays empty until Phase B.
//
// GUIDING RULE (why this doesn't just "apply the rules"): 40k modifiers are overwhelmingly
// CONDITIONAL (a phase, a range, a target, an aura, once per battle), and wh40k-appdata carries
// almost none of them structurally — 961 enhancements yield 6 ability links and 2 weapon-profile
// links, everything else is prose. GW's own app doesn't recompute statlines either. So this layer
// only ever changes what it can derive STRUCTURALLY, and everything judgement-based is surfaced as
// an attributed note instead — the same "mark it, don't fake it" treatment DatasheetCard already
// gives rule-granted keywords via its `grantedKeywords` prop.

import { wargearGroupLive, findEnhancement, mandatoryEnhancementFor } from './rosterEngine.js'
import { slugify } from '../data/slugify.js'
import conditionalKeywords from '../data/conditionalKeywords.json'

// Name matching between two independently-generated datasets: wargear item names live in
// src/data/roster/items.js (interned from appdata's `wargear_item`), weapon rows live in
// src/data/datasheets/<slug>.js. They agree on wording but not always on glyphs.
const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()

// A weapon row belongs to a wargear item when it IS that item, or when it's one of that item's
// firing modes — appdata models a multi-mode weapon as one wargear item with several profiles,
// which the datasheet files spell out as separate rows ("Plasma pistol – standard" / "– supercharge").
// The parenthesised form covers the same idea written a different way ("Heavy flamer (twin-linked)").
function rowMatchesItem(row, item) {
  if (!item) return false
  return row === item || row.startsWith(`${item} – `) || row.startsWith(`${item} - `) || row.startsWith(`${item} (`)
}

// Every wargear item this datasheet can ever field: its default loadout plus every option on
// offer. Returns normalised-name → ids, because a name can legitimately intern to more than one
// id (the same weapon published under two appdata uuids) and a row claimed by any of them must
// answer to all of them.
function itemNameIndex(def, items) {
  const byName = new Map()
  const add = (id) => {
    const n = norm(items?.[id])
    if (!n) return
    if (!byName.has(n)) byName.set(n, [])
    if (!byName.get(n).includes(id)) byName.get(n).push(id)
  }
  for (const [, list] of def?.defaults || []) for (const [id] of list) add(id)
  for (const g of def?.gear || []) for (const o of g.o || []) add(o[0])
  return byName
}

// The wargear item ids this entry actually fields, or `null` when there's nothing to compute from
// (no entry — e.g. the add-unit browser's preview, where no unit exists yet — or a datasheet with
// no default loadout recorded). `null` means "don't filter anything", never "fields nothing".
//
// The default-vs-swap accounting mirrors rosterEngine.js's defaultLoadoutLines(), including its
// restriction to single-miniature units: a `rep` list is per-miniature, and a multi-miniature
// datasheet (Sergeant + squad, say) has no single squad count to spend it against. For those we
// only ADD what was picked and never subtract — which can leave a swapped-away weapon on the
// table, but never removes one the unit still has. That asymmetry is deliberate; see filterWeapons.
export function loadoutItemIds(def, entry) {
  if (!def || !entry || !def.defaults?.length) return null

  const removed = new Map() // item id -> number of models that swapped their copy away
  let squadCount = null
  if (!(def.minis?.length > 0)) {
    const size = def.sizes?.[entry.size ?? 0] || def.sizes?.[0]
    squadCount = entry.count ?? size?.per?.[0] ?? 1
    for (const [gi, , n] of entry.wg || []) {
      const g = def.gear?.[gi]
      if (!g?.rep?.length || !wargearGroupLive(def, entry, gi)) continue
      const consumed = g.in === 'stepper' ? (n || 1) : squadCount
      for (const id of g.rep) removed.set(id, (removed.get(id) || 0) + consumed)
    }
  }

  const kept = new Set()
  for (const [, list] of def.defaults) {
    for (const [id, c] of list) {
      const take = removed.get(id) || 0
      // `take` counts MODELS that gave this item up; `c` is its per-model quantity.
      if (!take || c * Math.max(0, squadCount - take) > 0) kept.add(id)
    }
  }
  for (const [gi, oi] of entry.wg || []) {
    if (!wargearGroupLive(def, entry, gi)) continue
    const opt = def.gear?.[gi]?.o?.[oi]
    if (opt) kept.add(opt[0])
  }
  return kept
}

// Trim a sheet's weapon tables to the entry's actual loadout.
//
// CONSERVATIVE BY CONSTRUCTION: a row is hidden only when some wargear item positively CLAIMS it
// and none of the ids behind that claim survive in the loadout. A row no item claims stays —
// measured across all 30 factions, 2.8% of weapon rows (139 of 5038) are named in a way no
// wargear item matches (a datasheet's fixed weapon spelled differently from its item, a profile
// with no item at all). Hiding those would delete a weapon the unit really has, which is a worse
// failure than leaving a swapped-away one on screen, so the unmatched case always errs towards
// showing more.
function filterWeapons(sheet, def, entry, items) {
  const kept = loadoutItemIds(def, entry)
  if (!kept) return sheet
  const byName = itemNameIndex(def, items)
  if (!byName.size) return sheet

  // Longest name first: a shorter item name must never claim a row that a longer, more specific
  // one also matches (the same longest-first discipline the auto-bold pass uses).
  const names = [...byName.keys()].sort((a, b) => b.length - a.length)

  const drop = (row) => {
    const r = norm(row?.name)
    const claim = names.find((n) => rowMatchesItem(r, n))
    if (!claim) return false // unclaimed → always shown, see the note above
    return !byName.get(claim).some((id) => kept.has(id))
  }

  const ranged = sheet.ranged?.filter((w) => !drop(w))
  const melee = sheet.melee?.filter((w) => !drop(w))
  const rangedChanged = ranged && ranged.length !== sheet.ranged.length
  const meleeChanged = melee && melee.length !== sheet.melee.length
  if (!rangedChanged && !meleeChanged) return sheet // identity preserved when nothing was trimmed

  const out = { ...sheet }
  // An emptied table is dropped outright rather than left as a headed, rowless table — the same
  // shape a datasheet with no ranged/melee weapons has, which DatasheetCard already handles.
  if (rangedChanged) { if (ranged.length) out.ranged = ranged; else delete out.ranged }
  if (meleeChanged) { if (melee.length) out.melee = melee; else delete out.melee }
  return out
}

// ── Rule-granted keywords ────────────────────────────────────────────────────────────────────
// src/data/conditionalKeywords.json already lists the keywords a unit GAINS from an army or
// detachment rule (see the root CLAUDE.md); FactionDatasheetView gates them on the detachment
// picked in useFactionChoice. Here the gate is the roster's own selected detachments instead —
// same sidecar, same DatasheetCard `grantedKeywords` prop, different source of "which detachment
// is active". Nothing new is generated for this.

// The sidecar keys detachments by their wh11ed id, the roster refers to them by their appdata
// display name, so matching means slugifying the name. NOT the shared slugify() alone: appdata
// spells "Dëlve Assault Shift" with a diaeresis, which slugify() drops to `d-lve-assault-shift`
// and would silently fail to match the `delve-assault-shift` id (24 of 25 gated grants matched
// without this, one didn't — the same silent-no-op class as the enhancement apostrophe bug).
// Stripping combining marks first fixes it; slugify() itself is load-bearing for DOM ids and the
// search index, so it stays untouched.
const detKey = (name) => slugify((name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''))

// `detachments` accepts either the resolved detachment objects the editor/browser pass around
// (`curDetachments`) or the bare name strings a roster stores — being permissive here is what
// keeps a call site from silently wiring the wrong one.
export function grantedKeywordsFor(unitId, factionSlug, detachments) {
  const grants = conditionalKeywords[factionSlug]?.[unitId]
  if (!grants?.length) return []
  const picked = new Map() // detKey -> display name, for the footnote
  for (const d of detachments || []) {
    const name = typeof d === 'string' ? d : d?.name
    if (name) picked.set(detKey(name), name)
  }
  const out = []
  const seen = new Set()
  // Army-wide grants first: when the same keyword arrives both ways, the unconditional claim is
  // the truer one to footnote.
  for (const g of [...grants.filter((g) => !g.det), ...grants.filter((g) => g.det)]) {
    if (g.det && !picked.has(g.det)) continue
    if (seen.has(g.kw)) continue
    seen.add(g.kw)
    out.push({ kw: g.kw, detName: g.det ? picked.get(g.det) : null, extra: !!g.extra })
  }
  return out
}

// ── Entry context ────────────────────────────────────────────────────────────────────────────
// The handful of roster facts that aren't on the datasheet at all and would otherwise force the
// reader back to the editor to check: is this the Warlord, what enhancement is it carrying, who
// is it attached to. Returns null when the entry carries none of them, so the header strip only
// appears when it has something to say.
//
// A mandatory enhancement (rosterEngine.js's mandatoryEnhancementFor — Necrons' Pantheon of Woe
// and friends) is reported alongside a chosen one, since the unit is stuck with it whether or not
// `entry.enh` was ever set. `attachedTo` resolves through `leaderTargets` (the same
// leaderTargetsFor() list the editor's attachment picker uses); without that list the attachment
// is simply not reported rather than reported as a raw uid.
export function entryContext(ctx) {
  const { def, entry, detachments, leaderTargets } = ctx || {}
  if (!entry) return null

  let enhancement = null
  if (entry.enh) {
    const found = findEnhancement(detachments, entry.enh)
    enhancement = { name: entry.enh, pts: found?.pts || 0, mandatory: false }
  } else {
    const auto = mandatoryEnhancementFor(def, detachments)
    if (auto) enhancement = { name: auto.name, pts: auto.pts || 0, mandatory: true }
  }

  const warlord = entry.warlord === true
  const attachedTo = entry.leaderOf
    ? (leaderTargets || []).find((t) => t.uid === entry.leaderOf)?.name || null
    : null

  if (!warlord && !enhancement && !attachedTo) return null
  return { warlord, enhancement, attachedTo }
}

// The one entry point a view calls: given the printed sheet and this entry's roster context,
// return the sheet to render plus the notes to show alongside it.
//
// `ctx` is optional and partial by design — the add-unit browser previews a unit that isn't in
// the roster yet, so it has a faction and detachments but no entry. Anything missing simply means
// that source contributes nothing; an absent ctx returns the printed sheet untouched, which is
// exactly the pre-overlay behaviour.
//
// ctx: { def, entry, items, unitId, factionSlug, detachments, leaderTargets }
// returns: { sheet, grantedKeywords, context, notes } — `notes` is always an array; it stays
// empty until Phase B.
export function overlaySheet(sheet, ctx) {
  if (!sheet) return { sheet, grantedKeywords: [], context: null, notes: [] }
  const { def, entry, items, unitId, factionSlug, detachments } = ctx || {}
  return {
    sheet: filterWeapons(sheet, def, entry, items),
    grantedKeywords: grantedKeywordsFor(unitId || def?.id, factionSlug, detachments),
    context: entryContext(ctx),
    notes: [],
  }
}
