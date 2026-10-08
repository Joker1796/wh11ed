// Roster modifier overlay — what a datasheet looks like for ONE roster entry, as opposed to the
// bare printed sheet. Pure functions, no Vue, no store (same discipline as rosterEngine.js /
// rosterValidation.js). See src/components/roster/CLAUDE.md ("Modifier overlay"); this file is
// Tier A: it trims the weapon tables to the loadout the entry actually fields (and states how
// many of each weapon that loadout holds), resolves the
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

import { copiesHeld, wargearGroupCap, wargearGroupLive, findEnhancement, mandatoryEnhancementFor, optionItems, modelsPerMini, swapsByMini, allegFor, allegKeyword, allegItems, grantedKeywordsFor, detKey } from './rosterEngine.js'
import { conditions } from '../data/rosterModifiers/conditions.js'
import rosterItemsData from '../data/roster/items.js'
import ENH_WEAPONS from '../data/enhancementWeapons.js'
// Rule-granted keywords moved to rosterEngine.js, which needs them to answer whether a unit can
// carry an enhancement; re-exported here because this is where every caller already imports them.
export { grantedKeywordsFor, detKey } from './rosterEngine.js'

// Name matching between two independently-generated datasets: wargear item names live in
// src/data/roster/items.js (interned from appdata's `wargear_item`), weapon rows live in
// src/data/datasheets/<slug>.js. They agree on wording but not always on glyphs: the apostrophe
// is typographic on one side and ASCII on the other, and 39 item names carry a NON-BREAKING
// hyphen (U+2011, "Master‑crafted power weapon") where the datasheet row has a plain one. Every
// dash-class code point (Unicode Pd) folds to ASCII '-' for the same reason the apostrophe does —
// a glyph is not a spelling. Before this fold an Archon who swapped his huskblade for a
// master-crafted power weapon showed BOTH rows on his card (a player reported it, 2026-09-20):
// the option's row was unclaimed, and an unclaimed row is always shown (see filterWeapons).
// Mirrored by `normItemName` in scripts/gen-roster-modifiers.mjs — a wargear record's `ref.item`
// is compared against `loadoutItemNames` with this key, so the two must agree.
const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\p{Pd}/gu, '-').replace(/\s+/g, ' ').trim()
export { norm as itemKey }

// A weapon row belongs to a wargear item when it IS that item, or when it's one of that item's
// firing modes — appdata models a multi-mode weapon as one wargear item with several profiles,
// which the datasheet files spell out as separate rows ("Plasma pistol – standard" / "– supercharge";
// the en dash is a plain hyphen by the time `norm` has run on the row). The parenthesised form
// covers the same idea written a different way ("Heavy flamer (twin-linked)").
function rowMatchesItem(row, item) {
  if (!item) return false
  return row === item || row.startsWith(`${item} - `) || row.startsWith(`${item} (`)
}

// Every wargear item this datasheet can ever field: its default loadout plus every option on
// offer. Returns normalised-name → ids, because a name can legitimately intern to more than one
// id (the same weapon published under two appdata uuids) and a row claimed by any of them must
// answer to all of them.
const STANDS = rosterItemsData.stands || {}

function itemNameIndex(def, items) {
  const byName = new Map()
  const put = (n, id) => {
    if (!byName.has(n)) byName.set(n, [])
    if (!byName.get(n).includes(id)) byName.get(n).push(id)
  }
  const add = (id) => {
    const n = norm(items?.[id])
    if (!n) return
    put(n, id)
    // …and the weapon the item stands for, when its one profile bears another name (a Gun Drone
    // is the twin pulse carbine): the row is the item's, and leaves with it (items.js `stands`).
    for (const w of STANDS[n] || []) put(norm(w), id)
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
// nothing at all, for want of a per-profile model count; `sizes[i].comp` supplies it now, and a
// unit-wide group is spent against the squad (see swapsByMini). What still subtracts nothing is a
// bracket that leaves two profiles free — there we only ADD what was picked, so a swapped-away
// weapon may linger, but one the unit still has is never removed. That asymmetry is deliberate;
// see filterWeapons.
export function loadoutItemIds(def, entry) {
  const counts = loadoutItemCounts(def, entry)
  return counts && new Set(counts.keys())
}

// HOW MANY of each item, keyed by item id — the same walk as above, carrying the one thing an id
// set cannot state. `null` for an item whose quantity can't be pinned down (a profile whose model
// count is unknown): fielded, quantity unsaid. Same asymmetry as everywhere else here — a weapon
// is never hidden on a guess, and a number is never invented on one.
//
// The count is the UNIT's, not one model's. Per-model is not even well defined on a multi-profile
// datasheet: a Sister Superior and her squad hold the same boltgun as two separate `defaults`
// rows, so "per model" there is a sum of two ones. The unit total is defined for every shape, it
// is what the weapon table's reader is about to roll, and it moves with the unit's size.
export function loadoutItemCounts(def, entry) {
  const copies = loadoutItemCopies(def, entry)
  if (!copies) return null
  const counts = new Map()
  for (const [id, slots] of copies) {
    counts.set(id, slots.reduce((a, s) => (a == null || s.n == null ? null : a + s.n), 0))
  }
  return counts
}

// The same walk, one level finer: every COPY of an item the entry fields, as a slot — which
// profile holds it (`m`, or null for a unit-wide group), and on how many of that profile's models
// (`n`, null when unknown). A copy is one line of a model's loadout: the default loadout's "2
// macro-scalpels" is two slots on every Talos, and a Carnifex that takes crushing claws in BOTH of
// its option lines holds two slots of them, one per line. Summed, the slots are loadoutItemCounts.
//
// Why the finer answer exists (2026-09-28): a model fights with ONE melee weapon (04.01), so two
// copies of the same melee weapon on one model are not twice the attacks — and the unit total
// "×2" on a lone Carnifex's claws read exactly that way to a player. filterWeapons asks for the
// slots and prints one row per copy a model can hold (meleeRowsFor).
//
// Order is the loadout's own: defaults first, then the option groups in the order the entry
// picked them. Only the slot's position within its profile matters downstream.
export function loadoutItemCopies(def, entry) {
  if (!def || !entry || !def.defaults?.length) return null

  const perMini = modelsPerMini(def, entry)
  const removed = swapsByMini(def, entry, perMini)

  // Two sources can hand the entry the same item — a Defiler whose baleflamer AND missile launcher
  // are both traded for a heavy reaper autocannon fields two of them, one from each group — so
  // each source is a slot of its own, and the total adds them.
  const copies = new Map()
  const slot = (id, m, n) => {
    if (!copies.has(id)) copies.set(id, [])
    copies.get(id).push({ m, n })
  }

  for (const [m, list] of def.defaults) {
    const models = perMini?.get(m)
    // A profile the chosen size fields none of holds nothing: Wolf Guard Headtakers without their
    // Hunting Wolves kept a "Teeth and Claws" row on the card, uncounted, until 2026-10-05.
    if (models === 0) continue
    for (const [id, c, total] of list) {
      const take = removed.get(`${m}:${id}`) || 0
      // `take` counts MODELS OF THIS PROFILE that gave the item up; `c` is its per-model quantity.
      // A profile whose model count is unknown keeps everything — never hide a weapon on a guess.
      if (!take || models == null || copiesHeld(c, total, models, take) > 0) {
        // `total` marks a quantity that belongs to the PROFILE rather than to each of its models —
        // the single heavy bolter among two Gun Servitors — so it stands as written and is never
        // multiplied, the same reading rosterEngine's defaultLoadoutLines() gives it. It is one
        // slot held by that many models, never two on one — fewer once a swap took some.
        if (total) slot(id, m, copiesHeld(c, total, models, take))
        else if (models == null) for (let k = 0; k < c; k++) slot(id, m, null)
        else {
          // `take` can be a share of a model (rosterEngine's pickShare: one catapult of a
          // Wraithlord's two): the models stripped outright hold nothing, and ONE more model has
          // given up that many of its copies — its last ones, so it drops out of the top slots.
          const whole = Math.floor(take + 1e-9)
          const part = Math.round(c * (take - whole))
          for (let k = 0; k < c; k++) {
            const holders = Math.max(0, models - whole - (part && k >= c - part ? 1 : 0))
            if (holders || !take) slot(id, m, holders)
          }
        }
      }
    }
  }
  for (const [gi, oi, n] of entry.wg || []) {
    if (!wargearGroupLive(def, entry, gi)) continue
    const g = def.gear?.[gi]
    const opt = g?.o?.[oi]
    if (!opt) continue
    // How many times the pick was taken, mirroring swapsByMini's `consumed` so that what a swap
    // adds and what it removes are counted the same way: a stepper carries the model count, a
    // checkbox is one model unless the instruction hands the swap to the whole profile (`repall`).
    // A unit-wide group belongs to no profile, so there is no per-profile count to clamp its
    // stepper by — the group's own cap has already done that, and none of the 81 is a `repall`.
    //
    // A stepper is clamped to what the profile can hold, and that is not always its model count: a
    // Wraithknight takes two of the same heavy weapon (the group's cap, 2 on one model) and a
    // Wraithlord two flamers for its two shuriken catapults (`cp`, copies per model) — clamped to
    // the model count, both read as one (a player's report, 2026-09-30). The clamp is still there
    // for what it was for: a squad shrunk under a stale pick.
    const models = g.all ? null : perMini?.get(g.m ?? 0)
    const room = models == null ? null : Math.max(models * (g.cp || 1), wargearGroupCap(def, entry, gi)?.limit ?? 0)
    let picks = 1
    if (g.in === 'stepper') picks = room == null ? (n || 1) : Math.min(n || 1, room)
    else if (g.repall && !g.all) picks = models == null ? null : models
    // A slot's `n` counts MODELS, so picks past the model count are further copies on the same
    // models — a second slot, not one slot on a model that does not exist.
    const layers = []
    if (picks == null || !models) layers.push(picks)
    else for (let left = picks; left > 0; left -= models) layers.push(Math.min(left, models))
    // An option can grant more than one item (a bundle) — see rosterEngine's optionItems — and
    // "2 X" in one option is two slots on each model that took it.
    for (const [id, c] of optionItems(opt)) {
      for (let k = 0; k < c; k++) for (const held of layers) slot(id, g.all ? null : (g.m ?? 0), held)
    }
  }
  // A CHAINED swap gives up what another option handed out, not what the model was printed with:
  // "boltgun and close combat weapon → Astartes chainsword and bolt pistol", then "bolt pistol →
  // hand flamer". The ledger counts it like any swap, but only printed lines were ever reduced, so
  // the bolt pistol stayed beside the hand flamer (found 2026-10-05 sweeping every swap; 13 groups,
  // Death Company Marines, Furioso, Dire Avengers, Corsairs, Wracks…). What a profile gave up that
  // it was not printed with comes off the copies the options added, first ones first.
  //
  // A PRINTED item can be given up twice on one model too: an option hands it back ("cyclone
  // missile launcher and 1 storm bolter") and another group takes it ("power fist and storm bolter →
  // thunder hammer and storm shield"). The printed lines can lose no more than the profile's
  // models; the rest of what the ledger counts came off copies an option added — else they stayed
  // on the card (a player, 2026-10-08: four storm bolters on a squad that kept one).
  const printed = new Set(def.defaults.flatMap(([m, list]) => list.map(([id]) => `${m}:${id}`)))
  for (const [key, take] of removed) {
    if (!take) continue
    const [m, id] = key.split(':').map(Number)
    const models = perMini?.get(m)
    if (printed.has(key) && models == null) continue
    // The profile's own copies first, then the unit-wide ones (a Desolation Sergeant gives up the
    // superkrak launcher a whole-unit group handed every model).
    let left = printed.has(key) ? take - models : take
    if (left <= 1e-9) continue
    for (const own of [true, false]) {
      for (const sl of copies.get(id) || []) {
        if (left <= 0) break
        if ((own ? sl.m !== m : sl.m != null) || sl.n == null) continue
        const d = Math.min(sl.n, left)
        sl.n -= d
        left -= d
      }
    }
    const kept = (copies.get(id) || []).filter((sl) => sl.n !== 0)
    if (kept.length) copies.set(id, kept)
    else copies.delete(id)
  }
  // The Soul Grinder's mark arms it: "this model is additionally equipped with: phlegm
  // bombardment". Detachments aren't in scope here — Daemonic Allegiance is ungated, and a gated
  // group with a weapon doesn't exist — so the choice alone decides.
  for (const id of allegItems(def, entry, [])) slot(id, 0, 1)
  return copies
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
// measured across all 30 factions, 0.5% of weapon rows (45 of 9,209, 2026-09-20) are named in a
// way no wargear item matches (a drone's weapon the drone item stands for, a Librarian's Smite, a
// datasheet's fixed weapon spelled differently from its item — "Close-combat weapon"). Hiding
// those would delete a weapon the unit really has, which is a worse failure than leaving a
// swapped-away one on screen, so the unmatched case always errs towards showing more.
//
// The claim itself is `weaponRowClaimer`, exported so the data-wide test in
// src/data/roster/index.test.js can walk every sheet's unclaimed rows and catch the next glyph
// `norm` doesn't fold — the non-breaking hyphen went unnoticed until a player met it.
export function weaponRowClaimer(def, items) {
  const byName = itemNameIndex(def, items)
  if (!byName.size) return null

  // Longest name first: a shorter item name must never claim a row that a longer, more specific
  // one also matches (the same longest-first discipline the auto-bold pass uses).
  const names = [...byName.keys()].sort((a, b) => b.length - a.length)

  // The item ids behind a row name, or null when nothing claims it.
  return (name) => {
    const r = norm(name)
    const claim = names.find((n) => rowMatchesItem(r, n))
    return claim ? byName.get(claim) : null
  }
}

// How a melee row prints, given the copies of it the entry fields: one row per copy a model can
// hold, each counting the models that hold THAT copy. A model fights with one melee weapon (04.01),
// so a second copy on the same model adds no attacks — but summed into one "×2" it read as double
// the attacks (a lone Carnifex with crushing claws from both of its option lines, player report
// 2026-09-28). Two identical rows say what is true: the model has two, and strikes with one.
//
// A copy's rank is its position among the copies ITS profile holds: the Boyz' choppas and their
// Nob's are both first copies, so they stay one row (×10); only a second copy on the same
// profile opens a second row. Unit-wide groups belong to no profile and count as first copies —
// the conservative reading, which never invents a second weapon on one model.
//
// [EXTRA ATTACKS] weapons are not split: the model attacks with ALL of them (24.11), so two Extra
// Klaws on a Deff Dread really are twice the attacks and "×2" says so. Neither is a row whose
// count is unknown anywhere — an unknown says nothing, as everywhere in this file.
//
// Two grants to one profile are only a SECOND copy when the profile has too few models to hold
// them one each. Raptors take a close combat weapon with each of several bundles ("1 flamer and 1
// close combat weapon", "1 meltagun and …") — four grants, four different Raptors out of ten, and
// read as ranks they printed four identical rows (player report, 2026-09-30). Where the grants fit
// the profile's models, they are one row with their sum.
function meleeRowsFor(w, slots, perMini) {
  if ((w.tags || []).some((t) => /^extra attacks$/i.test(t))) return null
  if (slots.some((s) => s.n == null)) return null
  const byProfile = new Map()
  for (const s of slots) {
    if (!s.n) continue
    const k = s.m == null ? 'all' : s.m
    if (!byProfile.has(k)) byProfile.set(k, [])
    byProfile.get(k).push(s.n)
  }
  for (const [k, list] of byProfile) {
    const models = k === 'all' ? null : perMini?.get(k)
    const sum = list.reduce((a, n) => a + n, 0)
    if (models != null && list.length > 1 && sum <= models) byProfile.set(k, [sum])
  }
  const ranks = []
  for (const list of byProfile.values()) list.forEach((n, r) => { ranks[r] = (ranks[r] || 0) + n })
  if (ranks.length < 2) return null
  return ranks.map((n) => (n > 1 ? { ...w, qty: n } : { ...w }))
}

// The wargear conditions (conditions.js, `gear`) this entry's loadout proves — "if this model is
// equipped with two macro-scalpels", "two melee weapons in addition to its close combat weapon".
// Answered from the copies each model holds, the same count the weapon table prints, and only
// where it holds for EVERY model of a profile: one Talos of two with the pair leaves the note up,
// because the rule is about that model and the card is about the unit. A profile whose model count
// is unknown proves nothing, and neither does a unit-wide group (no profile to pin it to) — the
// asymmetry of this whole file: a rule is applied on proof, never on a guess.
//
// `sheet` is the PRINTED datasheet: its melee rows say which items are melee weapons, and a row
// name is what `gear` names.
export function wargearConditions(def, entry, items, sheet) {
  const out = new Set()
  const copies = loadoutItemCopies(def, entry)
  const perMini = modelsPerMini(def, entry)
  const claim = weaponRowClaimer(def, items)
  if (!copies || !perMini || !claim || !sheet?.melee?.length) return out

  // The melee items, by the row that names them (a weapon with two firing modes is one weapon:
  // "Fenrisian great axe – strike" and "– sweep" are both the axe).
  const nameOf = new Map()
  for (const w of sheet.melee) {
    for (const id of claim(w.name) || []) if (!nameOf.has(id)) nameOf.set(id, norm(w.name).split(' - ')[0])
  }
  // Per profile: how many copies of each melee item every one of its models holds.
  const held = new Map()
  for (const [id, slots] of copies) {
    const name = nameOf.get(id)
    if (!name) continue
    for (const sl of slots) {
      const models = sl.m == null ? null : perMini.get(sl.m)
      if (!models || sl.n !== models) continue
      if (!held.has(sl.m)) held.set(sl.m, new Map())
      const per = held.get(sl.m)
      per.set(id, { name, n: (per.get(id)?.n || 0) + 1 })
    }
  }

  const starts = (name, n) => name.startsWith(norm(n))
  for (const [cid, c] of Object.entries(conditions)) {
    const g = c.gear
    if (!g) continue
    const holds = [...held.values()].some((byName) => {
      const list = [...byName.values()]
      if (g.copies) return list.some((r) => starts(r.name, g.name) && r.n >= g.copies)
      if (g.melee) {
        const n = list.filter((r) => !(g.besides || []).some((b) => starts(r.name, b))).reduce((a, r) => a + r.n, 0)
        return n >= g.melee
      }
      if (g.all) return g.all.every((want) => list.some((r) => starts(r.name, want) && r.n >= 1))
      return false
    })
    if (holds) out.add(cid)
  }
  return out
}

function filterWeapons(sheet, def, entry, items) {
  const copies = loadoutItemCopies(def, entry)
  const counts = loadoutItemCounts(def, entry)
  const perMini = modelsPerMini(def, entry)
  if (!counts) return sheet
  const claim = weaponRowClaimer(def, items)
  if (!claim) return sheet
  const claimOf = (row) => claim(row?.name)

  // Trim the table to what the entry fields, and stamp the quantity on what stays. One pass
  // because it is one question — which item is this row, and how many of it does the unit hold —
  // and two passes could answer it differently.
  const take = (rows, melee) => {
    if (!rows) return { rows, changed: false }
    const out = []
    let changed = false
    for (const w of rows) {
      const ids = claimOf(w)
      if (!ids) { out.push(w); continue } // unclaimed → always shown, never counted, see above
      const fielded = ids.filter((id) => counts.has(id))
      if (!fielded.length) { changed = true; continue } // claimed, and no id behind it survived
      const split = melee ? meleeRowsFor(w, fielded.flatMap((id) => copies.get(id) || []), perMini) : null
      if (split) { out.push(...split); changed = true; continue }
      // A weapon name interns to exactly one item id in every unit def in the data, and no
      // datasheet lists a name twice (both asserted in src/data/roster/index.test.js), so this
      // sum is one weapon's quantity rather than two different weapons conflated by their name.
      // An unknown anywhere in it makes the row's count unknown, and an unknown count says
      // nothing at all — the reader is told less, never told wrong.
      const qty = fielded.reduce((a, id) => (a == null || counts.get(id) == null ? null : a + counts.get(id)), 0)
      if (qty > 1) { out.push({ ...w, qty }); changed = true } else out.push(w)
    }
    return { rows: out, changed }
  }

  const ranged = take(sheet.ranged, false)
  const melee = take(sheet.melee, true)
  // The wargear abilities follow the same question: a Relic Shield's "+1 W" printed for a Captain
  // who kept his bolter read as a shield the card forgot to count (owner, 2026-10-07). An ability
  // no item of the unit claims is kept, as an unclaimed weapon row is. Matched by the ENGLISH name
  // — the RU sheet carries it as `nameEn`, and item names are English.
  const gear = (() => {
    if (!sheet.wargearAbilities) return { rows: null, changed: false }
    const rows = sheet.wargearAbilities.filter((a) => {
      const ids = claimOf({ name: a.nameEn || a.name })
      return !ids || ids.some((id) => counts.has(id))
    })
    return { rows, changed: rows.length !== sheet.wargearAbilities.length }
  })()
  if (!ranged.changed && !melee.changed && !gear.changed) return sheet // identity preserved when nothing changed

  const out = { ...sheet }
  // An emptied table is dropped outright rather than left as a headed, rowless table — the same
  // shape a datasheet with no ranged/melee weapons has, which DatasheetCard already handles.
  if (ranged.changed) { if (ranged.rows.length) out.ranged = ranged.rows; else delete out.ranged }
  if (melee.changed) { if (melee.rows.length) out.melee = melee.rows; else delete out.melee }
  if (gear.changed) { if (gear.rows.length) out.wargearAbilities = gear.rows; else delete out.wargearAbilities }
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

// An enhancement's prose, by name, from a faction's detachments — the list's OWN detachments first.
// A name is not unique within a faction: Astra Militarum has a Grand Strategist in both Armoured
// Infantry and Combined Arms, and a search of every detachment in file order showed the Combined
// Arms list the other one's text (a player's report, 2026-10-01). The rest of the faction is the
// fallback for a list whose detachment the prose file does not carry by that name.
// `own`: the roster's detachments, as names or as objects with a `name`.
export function findEnhancementProse(detachments, name, own) {
  const target = enhKey(name)
  const mine = new Set((own || []).map((d) => detKey(typeof d === 'string' ? d : d?.name)))
  const find = (ds) => {
    for (const d of ds) {
      const e = d?.enhancements?.find((x) => enhKey(x.name) === target)
      if (e) return e
    }
    return null
  }
  const all = [...(detachments || [])]
  return find(all.filter((d) => mine.has(detKey(d?.name)))) || find(all)
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
function allegGrant(def, entry, detachments) {
  const kw = allegKeyword(def, entry, detachments)
  if (!kw) return []
  return [{ kw, detName: null, extra: false, alleg: allegFor(def, detachments)?.t || null }]
}

// The weapons the entry's enhancement gives it ("This model has the following weapon:") join its
// own table, marked as the enhancement's (`enh`, DatasheetCard's tag) — at the bottom of the card,
// in the enhancement's plate, a player forgot the bearer had them at all (2026-10-08). The rows
// come from appdata's own profile (scripts/gen-enhancement-weapons.mjs).
function withEnhancementWeapons(sheet, entry) {
  const given = entry?.enh && ENH_WEAPONS[enhKey(entry.enh)]
  if (!given || !(given.melee.length || given.ranged.length)) return sheet
  const out = { ...sheet }
  for (const kind of ['ranged', 'melee']) {
    if (given[kind].length) out[kind] = [...(sheet[kind] || []), ...given[kind].map((w) => ({ ...w, enh: entry.enh }))]
  }
  return out
}

export function overlaySheet(sheet, ctx) {
  if (!sheet) return { sheet, grantedKeywords: [], context: null, ruleSources: [], notes: [] }
  const { def, entry, items, unitId, factionSlug, detachments } = ctx || {}
  return {
    sheet: withEnhancementWeapons(filterWeapons(sheet, def, entry, items), entry),
    // …plus the keyword the entry chose for itself. The sidecar can't carry these: which mark a
    // unit took is a per-list decision, not a property of the datasheet (which is exactly why
    // gen-conditional-keywords.mjs skips appdata's 274 allegiance rows).
    //
    // In the SHAPE the rest of this list uses. `allegKeyword` answers with a bare string, which is
    // what the engine's own keyword lists want (rosterValidation, the editors' `canWarlord`), and
    // dropping that string in among `{ kw, detName, extra }` objects meant every reader of this
    // array read `undefined` — and `rosterUnitCard`'s allGrantedKeywords threw on it, so the whole
    // card rendered NOTHING. Both Daemon Princes and the Soul Grinder must choose a Daemonic
    // Allegiance, so their card and their printed sheet were simply blank; 87 more datasheets go
    // the same way once the detachment that offers their mark is fielded (Pactbound Zealots alone
    // is 43). `alleg` carries the group's own title so the footnote can say where it came from —
    // a mark is the reader's choice for THIS model, not something the faction hands out.
    grantedKeywords: [
      ...grantedKeywordsFor(unitId || def?.id, factionSlug, detachments),
      ...allegGrant(def, entry, detachments),
    ],
    context: entryContext(ctx),
    ruleSources: ruleSourcesFor(ctx),
    notes: [],
  }
}
