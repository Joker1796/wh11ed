// Roster modifier overlay — what a datasheet looks like for ONE roster entry, as opposed to the
// bare printed sheet. Pure functions, no Vue, no store (same discipline as rosterEngine.js /
// rosterValidation.js). See src/components/roster/CLAUDE.md ("Modifier overlay"); this file is
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

import { wargearGroupLive, findEnhancement, mandatoryEnhancementFor, optionItems, modelsPerMini, swapsByMini, allegKeyword, allegItems, grantedKeywordsFor } from './rosterEngine.js'
// Rule-granted keywords moved to rosterEngine.js, which needs them to answer whether a unit can
// carry an enhancement; re-exported here because this is where every caller already imports them.
export { grantedKeywordsFor, detKey } from './rosterEngine.js'

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
  for (const g of def?.gear || []) for (const o of g.o || []) for (const [id] of optionItems(o)) add(id)
  return byName
}

// The wargear item ids this entry actually fields, or `null` when there's nothing to compute from
// (no entry — e.g. the add-unit browser's preview, where no unit exists yet — or a datasheet with
// no default loadout recorded). `null` means "don't filter anything", never "fields nothing".
//
// The default-vs-swap accounting is shared with rosterEngine.js's defaultLoadoutLines() — both call
// modelsPerMini()/swapsByMini(). A multi-miniature datasheet (Sergeant + squad) used to subtract
// nothing at all, for want of a per-profile model count; `sizes[i].comp` supplies it now. What
// still subtracts nothing: a unit-wide group, and a bracket that leaves two profiles free. In those
// we only ADD what was picked — a swapped-away weapon may linger, but one the unit still has is
// never removed. That asymmetry is deliberate; see filterWeapons.
export function loadoutItemIds(def, entry) {
  if (!def || !entry || !def.defaults?.length) return null

  const perMini = modelsPerMini(def, entry)
  const removed = swapsByMini(def, entry, perMini)

  const kept = new Set()
  for (const [m, list] of def.defaults) {
    const models = perMini?.get(m)
    for (const [id, c] of list) {
      const take = removed.get(`${m}:${id}`) || 0
      // `take` counts MODELS OF THIS PROFILE that gave the item up; `c` is its per-model quantity.
      // A profile whose model count is unknown keeps everything — never hide a weapon on a guess.
      if (!take || models == null || c * Math.max(0, models - take) > 0) kept.add(id)
    }
  }
  for (const [gi, oi] of entry.wg || []) {
    if (!wargearGroupLive(def, entry, gi)) continue
    const opt = def.gear?.[gi]?.o?.[oi]
    // An option can grant more than one item (a bundle) — see rosterEngine's optionItems.
    if (opt) for (const [id] of optionItems(opt)) kept.add(id)
  }
  // The Soul Grinder's mark arms it: "this model is additionally equipped with: phlegm
  // bombardment". Detachments aren't in scope here — Daemonic Allegiance is ungated, and a gated
  // group with a weapon doesn't exist — so the choice alone decides.
  for (const id of allegItems(def, entry, [])) kept.add(id)
  return kept
}

// The NAMES of the wargear this entry fields, normalised — the key a wargear modifier record is
// matched on (rosterStatMods' datasheetEntriesFor). Names rather than ids because our item ids are
// integers interned across factions and mean nothing to appdata, while the name is what the uuid
// bridge stores on both sides. `null` when the loadout cannot be computed, which reads as "say
// nothing" rather than "equipped with nothing".
export function loadoutItemNames(def, entry, items) {
  const kept = loadoutItemIds(def, entry)
  if (!kept || !items) return null
  const out = new Set()
  for (const id of kept) { const n = norm(items[id]); if (n) out.add(n) }
  return out
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

// Enhancement names disagree between the roster layer (src/data/roster/<slug>.js, straight from
// appdata: typographic ’, "(Aura)"/"(Upgrade)" baked into the name) and the hand-authored faction
// files (ASCII, those two carried as separate booleans) — 132 of 898 names differ, none of them a
// real content gap. Lives here rather than in EnhancementRuleModal.vue, which is where it was
// written, so the modal's rule-block lookup and that component share one implementation.
export function enhKey(s) {
  return (s || '')
    .replace(/\s*\((?:Upgrade|Aura)\)\s*/gi, ' ')
    .toLowerCase()
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
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

// ── Rule sources ─────────────────────────────────────────────────────────────────────────────
// WHICH rules bear on this entry — not their text, which lives in the heavy hand-authored
// faction bundle (src/data/factions/<slug>.js) that only a component should be pulling in. This
// stays a pure list of descriptors; RosterUnitRulesModal resolves each to its prose.
//
// Deliberately NOT keyword-gated (the phase plan floated it): deciding "does this detachment rule
// touch this unit" means parsing prose, and a wrong guess here hides a rule that actually applies
// — the exact failure this whole layer exists to avoid. What IS structural gets gated: an
// enhancement shows only on the unit carrying it, a Leader's abilities only on the unit it's
// attached to. Army-wide rules are shown army-wide, labelled with where they come from, and the
// reader judges. They render as collapsed accordions, so the cost of showing one is a line.
export function ruleSourcesFor(ctx) {
  const { entry, detachments, units } = ctx || {}
  if (!entry && !detachments?.length) return [] // no roster context at all — a plain preview
  const out = []

  const enh = entryContext(ctx)?.enhancement
  if (enh) out.push({ kind: 'enhancement', name: enh.name })

  for (const d of detachments || []) {
    const name = typeof d === 'string' ? d : d?.name
    if (name) out.push({ kind: 'detachment', name })
  }

  // No 'armyRule' descriptor on purpose: the army rule is reached from the card's own "Faction:"
  // line (DatasheetCard's `linkedFactionRules`), which is the datasheet's own statement of which
  // army rule it has — more precise than anything this layer could infer, and it correctly offers
  // nothing on the 128 sheets that have no faction ability at all.

  // Leaders attached TO this unit: their abilities are what the reader is missing when looking at
  // a Bodyguard unit's card. The other direction (this unit being the Leader) is already the
  // "Attached to X" chip from entryContext — no need to repeat that unit's rules here.
  if (entry) {
    for (const u of units || []) {
      if (u.leaderOf && u.leaderOf === entry.uid && u.id) out.push({ kind: 'leader', unitId: u.id })
    }
  }
  return out
}

// The one entry point a view calls: given the printed sheet and this entry's roster context,
// return the sheet to render plus the notes to show alongside it.
//
// `ctx` is optional and partial by design — the add-unit browser previews a unit that isn't in
// the roster yet, so it has a faction and detachments but no entry. Anything missing simply means
// that source contributes nothing; an absent ctx returns the printed sheet untouched, which is
// exactly the pre-overlay behaviour.
//
// ctx: { def, entry, items, unitId, factionSlug, detachments, leaderTargets, units }
// returns: { sheet, grantedKeywords, context, ruleSources, notes }. `notes` is reserved for Tier
// C's attributed stat annotations and stays empty until then — `ruleSources` is Tier B's own
// thing and does not belong in it.
export function overlaySheet(sheet, ctx) {
  if (!sheet) return { sheet, grantedKeywords: [], context: null, ruleSources: [], notes: [] }
  const { def, entry, items, unitId, factionSlug, detachments } = ctx || {}
  return {
    sheet: filterWeapons(sheet, def, entry, items),
    // …plus the keyword the entry chose for itself. The sidecar can't carry these: which mark a
    // unit took is a per-list decision, not a property of the datasheet (which is exactly why
    // gen-conditional-keywords.mjs skips appdata's 274 allegiance rows).
    grantedKeywords: [
      ...grantedKeywordsFor(unitId || def?.id, factionSlug, detachments),
      ...[allegKeyword(def, entry, detachments)].filter(Boolean),
    ],
    context: entryContext(ctx),
    ruleSources: ruleSourcesFor(ctx),
    notes: [],
  }
}
