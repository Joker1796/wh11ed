// @ts-check
// Apply the numeric modifier layer (Tier C) to a datasheet. Pure — no Vue, no data imports; the
// caller hands in the records it loaded and the rule prose they were read from.
//
// THE ONE RULE THIS FILE ENFORCES: a number is only ever rewritten when the modifier is
// UNCONDITIONAL — or when the caller can prove the condition holds right now. Anything else with
// a `when` is annotated beside the printed value and the value is left alone.
//
// The proof comes from `active`, a set of condition ids the game says are true (built by
// rosterGameContext.js from a live tracker game). An effect's `cond` lists the ids that must ALL
// hold; anything not in the set — including every effect whose condition can never be answered
// (see conditions.js's sentinels) — stays an annotation. A note that WAS applied this way keeps
// its `when` text and carries `via`, so the card can say "T6 because the Waaagh! is on" rather
// than presenting a context-dependent number as if it were printed. 40k modifiers are overwhelmingly conditional — a phase, a range, an aura, once per
// battle — and a card showing T6 when the +1 only applies while a Waaagh! is running is worse
// than a card showing T5 with a note. The same goes for a value this file cannot compute (a
// Damage of "D6+2" with "+1"): it degrades to an annotation rather than inventing arithmetic.
//
// Scope comes from ruleTargets.js, never from the record — see the generator's header for why.

import { ruleScopes, scopesMisread, scopeHits } from './ruleTargets.js'
import { enhKey, detKey, itemKey, loadoutItemCopies, weaponRowClaimer, loadoutItemNames, wargearConditions } from './rosterModifiers.js'
import { modelsPerMini, mandatoryEnhancementFor } from './rosterEngine.js'
import { phasesOf, phaseSidesOf } from './stratagemPhases.js'
import { conditions } from '../data/rosterModifiers/conditions.js'
import { dominates } from './abilityDominance.js'
import { foldName } from '../utils/foldName.js'

/** @typedef {import('./roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('./roster.types.js').RosterEntry} RosterEntry */
/** @typedef {import('./roster.types.js').PrintedSheet} PrintedSheet */
/** @typedef {import('./roster.types.js').ModEntry} ModEntry */
/** @typedef {import('./roster.types.js').ModifierEffect} ModifierEffect */
/** @typedef {Set<string> | null | undefined} IdSet */
/** @typedef {import('./roster.types.js').RuleScope} RuleScope */
/** @typedef {import('./ruleTargets.js').UnitKeywords} UnitKeywords */
/** @typedef {import('../data/data.types.js').DatasheetProfile} DatasheetProfile */
/** Every datasheet's keywords in the faction — for the "extraction matched nobody" escape. @typedef {string[][] | null | undefined} KeywordSets */

// Which model profiles / weapon rows an effect addresses.
/** @type {Record<string, Array<'ranged' | 'melee'>>} */
const WEAPON_TABLES = { ranged: ['ranged'], melee: ['melee'], weapon: ['ranged', 'melee'] }

// A narrower target than `on` can express: "the bearer's Psychic weapons only", "excluding Extra
// Attacks weapons". `only.tag` / `only.notTag` match the row's printed ability tags (which is what
// those phrases name — PSYCHIC, TORRENT, PISTOL, RAPID FIRE are weapon abilities), `only.name`
// matches the weapon by name. Prefix-matched and case-insensitive, because a tag carries its value
// with it ("RAPID FIRE 1") and a name can be qualified ("Plague Wind – overcharge").
//
// `only.notName` is the same match, inverted, and a LIST — because the wording that needs it is a
// list: "weapons equipped by models in this unit (excluding blast pistols, blasters and dark
// lances)". One name at a time could not say that, so the Drukhari rule granting it was applied to
// every weapon on the card, including the three the rule names to leave out.
//
// Without this the restriction had nowhere to live but the `when` prose, which meant the modifier
// could never be applied at all — a unit-wide +1 Strength would have hit weapons the rule doesn't
// touch. See conditions.js's `blocked-weapon`.
/** @param {unknown} s */
const norm = foldName
/**
 * @param {{ name?: string, tags?: string[] } | null | undefined} row
 * @param {ModifierEffect['only']} only
 */
function rowMatchesOnly(row, only) {
  if (!only) return true
  const tags = (row?.tags || []).map(norm)
  /** @param {string} t */
  const has = (t) => tags.some((x) => x === norm(t) || x.startsWith(`${norm(t)} `))
  if (only.tag && !has(only.tag)) return false
  if (only.notTag && has(only.notTag)) return false
  if (only.name && !norm(row?.name).startsWith(norm(only.name))) return false
  if (only.notName?.some((n) => norm(row?.name).startsWith(norm(n)))) return false
  return true
}

// An ability that acts on the hit roll means nothing on a [TORRENT] weapon: that attack hits
// without one (24.37), so it never scores the critical hit [SUSTAINED HITS] and [LETHAL HITS] need
// (24.36, 24.23) and has no roll for [HEAVY] to add 1 to (24.16). [IGNORES COVER] answers cover,
// whose one effect is -1 BS on a RANGED attack (13.08): nothing on a melee weapon, nothing on a
// TORRENT one either, which has no BS to worsen.
// The rules that grant these say "weapons equipped by models in this unit" and GW does not carve
// TORRENT out, so the card did: Alpha Invader printed [SUSTAINED HITS 1] on the Raveners' venom
// bolt, and a player pointed out it can never trigger (report, 2026-10-17). Here rather than an
// `only.notTag` on each record because it is a rule of the game, not of any one modifier — 92
// grants in 21 factions could reach such a weapon. The sweep that followed (2026-10-17) found the
// same shape for HEAVY on TORRENT and IGNORES COVER on melee/TORRENT.
const NEEDS_HIT_ROLL = ['SUSTAINED HITS', 'LETHAL HITS', 'HEAVY', 'IGNORES COVER']
const RANGED_ONLY = ['IGNORES COVER']
/** @param {unknown} ability @param {unknown[]} tags @param {string} table 'ranged' | 'melee' */
export function idleOnRow(ability, tags, table) {
  // "LETHAL HITS: non-VEHICLE" is LETHAL HITS with a target qualifier (Space Marines' Tactical
  // Precision and others) — the name is what stands before the colon.
  const own = { tags: [String(ability).split(':')[0].trim()] }
  /** @param {string[]} list */
  const is = (list) => list.some((a) => rowMatchesOnly(own, { tag: a }))
  if (table === 'melee' && is(RANGED_ONLY)) return true
  return is(NEEDS_HIT_ROLL) && rowMatchesOnly({ tags: tags.map(String) }, { tag: 'TORRENT' })
}

// Does the statement this effect was read from bear on this unit? `scope` is an index into
// ruleScopes(); a null scope means the effect belongs to the rule as a whole, so any statement
// matching is enough. An enhancement has no scope at all — the caller only passes it for the
// unit carrying it.
/**
 * @param {{ scope?: number, reach?: string[] }} effect
 * @param {RuleScope[] | null | undefined} scopes
 * @param {UnitKeywords} keywords the card's own and its attached unit's (ruleTargets' scopeHits), or one list for a unit standing alone
 * @param {string} kind
 * @param {KeywordSets} factionKeywordSets
 * @param {boolean} [strict] a detachment rule's aura: an unreadable gate reaches nobody
 */
function effectApplies(effect, scopes, keywords, kind, factionKeywordSets, strict = false) {
  // An effect that names whom it reaches itself (`reach`) — a Bondsman ability goes to "one friendly
  // ARMIGER model", in a rule the generator's prose reader cannot gate — is gated by that alone.
  if (effect.reach?.length) return scopeHits({ targets: effect.reach, excludes: [] }, keywords)
  // No scopes to gate on. Either the prose named no unit at all (fail-open, see ruleTargets), or
  // the record's kind is one whose prose addresses exactly the card it is applied to — an
  // enhancement modifies its own bearer, an allegiance choice its own chooser, a wargear rule
  // whoever took the item, a datasheet ability the card it is printed on (or the card of the unit
  // it is attached to, resolved by `target` before we ever get here), and applyStatMods never
  // reads scopes for those. An AURA is the exception among abilities: it addresses "a friendly
  // ADEPTA SORORITAS unit", and its scopes travel on the entry, so it lands here gated.
  if (!scopes?.length) return true
  // The same "the extraction matched nobody, so distrust it" escape ruleTargets.js applies when
  // DISPLAYING the rule. Without it the two layers disagree: the prose block shows the rule to
  // everyone (fail-open) while its reviewed modifier silently applies to no one — a hand-read
  // effect quietly doing nothing is the worst of both.
  // …except when the gate is an AURA's and the rule behind it is the DETACHMENT's. That escape
  // trades a too-narrow gate for a too-wide one, which is the right trade for a rule printed on one
  // card and the wrong one for a rule that addresses the whole army: Questor Forgepact's aura names
  // ADEPTUS MECHANICUS, a faction whose datasheets this list cannot field at all, and failing open
  // there would hand every Knight a buff meant for allies that are not in the game. Reaching nobody
  // is the honest answer. (With the keyword vocabulary loaded, scopesMisread says so itself: a
  // target made of real keywords that nobody here carries is not a misread.)
  if (!strict && factionKeywordSets?.length && scopesMisread(scopes, factionKeywordSets)) return true
  if (effect.scope == null) return scopes.some((sc) => scopeHits(sc, keywords))
  const sc = scopes[effect.scope]
  return sc ? scopeHits(sc, keywords) : false
}

// The limits a characteristic keeps after every modifier (02.02.01): [best, worst] for a roll —
// a Leadership of 5+ improved by 1 stays 5+, it never shows 4+ (Malevolent Locus on Abaddon did,
// 2026-10-17) — and the lowest a number or a distance can fall to. AP is printed negative, so its
// limit is a ceiling: "cannot be worse than 0".
/** @type {Record<string, [number, number]>} */
const ROLL_LIMITS = { ld: [5, 8], ws: [2, 6], bs: [2, 6] }
/** @type {Record<string, number>} */
const LEAST = { t: 1, a: 1, s: 1, d: 1, oc: 0, m: 1, range: 1 }
// "Characteristics of '-', '*' and 'N/A' can never be modified" (02.02.01) — a TORRENT weapon's BS
// stays '-' whatever sets it (Auto-divinatory Targeting on the Kastelan Robots' incendine combustor).
const UNMODIFIABLE = /^(?:-|\*|N\/A)$/i

// Arithmetic on a printed characteristic, or null when it can't be done honestly.
// Characteristics come in four printed shapes: a plain number ("5"), a distance ('6"'), a
// skill/save roll ("3+") and a dice expression ("D6+2"). Only the first three are computable.
/**
 * @param {unknown} current
 * @param {string} op
 * @param {unknown} value
 * @param {string | null} [stat]
 * @param {string | null} [best] the rule's own limit on a roll ("3+" — Take Cover! "cannot improve
 *   a model's Save to better than 3+"); a model already better than it keeps what it has
 * @returns {string | null}
 */
export function applyValue(current, op, value, stat = null, best = null) {
  const raw = String(current ?? '').trim()
  // A model has one invulnerable save and uses the best it has been given: an aura's "6+
  // invulnerable save" does not take a Neurotyrant's printed 4+ away (a player's report,
  // 2026-09-25). Every other `set` is the rule's own number, whatever was there before.
  if (op === 'set' && stat === 'inv') {
    const had = raw.match(/^(\d+)\+$/)
    const given = String(value).match(/^(\d+)\+$/)
    if (had && given && Number(had[1]) <= Number(given[1])) return raw
  }
  // An invulnerable save is the exception: "-" there is no save, and a rule that gives one is the
  // commonest set there is.
  if (stat !== 'inv' && UNMODIFIABLE.test(raw)) return null
  // `set` before the empty check: "the bearer has a 5+ invulnerable save" GRANTS a characteristic
  // the datasheet doesn't print at all.
  if (op === 'set') return String(value)
  if (!raw) return null
  // A dice amount ("add 2D6 to the Move", "+D3 Attacks") is not arithmetic on a number: annotated,
  // never "NaN" on the card.
  if (!Number.isFinite(Number(value))) return null

  const roll = raw.match(/^(\d+)\+$/)
  if (roll) {
    // A roll improves by going DOWN, and 2+ is the floor no modifier can beat — or the rule's own.
    const n = Number(roll[1])
    const [least, most] = ROLL_LIMITS[stat ?? ''] || [2, 6]
    const floor = Math.max(least, Number(String(best ?? '').match(/^(\d)\+$/)?.[1]) || least)
    if (op === 'improve' && n <= floor) return raw
    const next = op === 'improve' ? n - Number(value) : n + Number(value)
    return `${Math.max(floor, Math.min(most, next))}+`
  }

  const dist = raw.match(/^(\d+)"$/)
  if (dist) {
    if (op !== 'add') return null
    return `${Math.max(LEAST[stat ?? ''] ?? 0, Number(dist[1]) + Number(value))}"`
  }

  // Signed, and deliberately NOT clamped at zero: Armour Penetration is printed negative, and
  // "improve the AP by 1" is authored as `add: -1` (-2 → -3). `improve` is reserved for the
  // roll-shaped characteristics above, where better means a lower number; for a plain one the
  // reviewer writes `add` with the sign the rule implies, since "improve" means +2 for Objective
  // Control and -1 for AP and no single op can be both.
  const plain = raw.match(/^-?\d+$/)
  // `mul` — "double the Attacks characteristic" (Eisenhorn's Malus Codicium on Warp grasp). It was
  // `add: 4` on a 4-attack profile until 2026-10-19, right only while the profile kept its 4. A dice
  // amount ("D6") is not doubled here: annotated, like any other dice arithmetic.
  if (plain && op === 'mul') return String(Number(raw) * Number(value))
  if (plain) {
    if (op !== 'add') return null
    const next = Number(raw) + Number(value)
    if (stat === 'ap') return String(Math.min(0, next))
    return String(Math.max(LEAST[stat ?? ''] ?? -Infinity, next))
  }

  return null // "D6+2", "N/A", a range like "18-36" — annotate instead of guessing
}

// The number inside a weapon ability: "RAPID FIRE 2" → 2. Abilities that carry one always print it
// last; one that carries none ("TWIN-LINKED") returns null and is left alone rather than guessed at.
const TAGGED = /^(.*?)\s+(-?\d+)$/
/**
 * @param {string} tag
 * @param {string} name
 * @param {number | string} delta
 */
export function bumpTag(tag, name, delta) {
  const m = TAGGED.exec(String(tag).trim())
  if (!m) return null
  if (norm(m[1]) !== norm(name)) return null
  return `${m[1]} ${Number(m[2]) + Number(delta)}`
}

// Just the two fields an `only` clause reads, copied off the working sheet so a later write to it
// cannot change what an earlier clause of the same record was looking at.
const ROW_TABLES = ['ranged', 'melee', 'profiles']
/** @param {{ name?: string, tags?: string[] }} r */
const copyRowTags = (r) => ({ name: r.name, tags: r.tags ? [...r.tags] : r.tags })
/** @param {DatasheetProfile} p */
const copyProfile = (p) => ({ ...p })
/**
 * @param {PrintedSheet} sheet
 * @returns {Record<string, Array<{ name?: string, tags?: string[] }>>}
 */
function snapshotRows(sheet) {
  /** @type {Record<string, Array<{ name?: string, tags?: string[] }>>} */
  const out = {}
  for (const t of ROW_TABLES) {
    if (sheet[t]) out[t] = sheet[t].map(copyRowTags)
  }
  return out
}

// `rows` — the rows an effect was PLACED on, per table, by splitBearers: a Storm Shield's +1 W
// belongs to the row of the models that carry it, not to every profile of the unit. Absent, every
// row the effect's `on`/`only` select is in.
/** @param {ModifierEffect} effect @param {string} table @param {number} i */
const inRows = (effect, table, i) => !effect.rows || !!effect.rows[table]?.includes(i)

// A grant is an effect whose "value" is a name rather than a number: `stat: 'keyword'` gives the
// unit a keyword (which can then make OTHER rules apply to it — Necrons' Destroyer Ankh grants
// DESTROYER CULT, and Cold Fervour's first bullet gives every DESTROYER CULT model +2 Strength),
// `stat: 'core'` gives the UNIT one of the rulebook's core abilities (Feel No Pain 5+, Stealth,
// Lone Operative); `stat: 'ability'` gives its weapons a bracketed ability. Modelled as an effect rather than a
// second system so `when`, `scope` and the whole applicability machinery are shared.
/** @param {ModifierEffect} effect */
const isGrant = (effect) => effect.op === 'grant'

// The dice a modifier can be added to rather than a printed number: `stat: 'hit'` / `'wound'` with
// `op: 'add'`. Always annotated, never applied — see the apply pass.
export const ROLL_STATS = new Set(['hit', 'wound'])

// Records whose prose addresses exactly one unit — the one the caller resolved them FOR — so
// ruleScopes() has nothing to gate on. Everything else is army- or detachment-wide prose that
// names who it bears on, and is gated by keyword.
//
// A STRATAGEM is in here because its EFFECT addresses the unit it was spent on ("until the end of
// the phase, each time a model in your unit makes an attack…"), whoever that is. WHICH units may
// be picked is a different question, asked once against the stratagem's own TARGET line before the
// record ever reaches this pass — see gateStratagems.
const SCOPELESS = new Set(['enhancement', 'allegiance', 'ability', 'wargear', 'stratagem'])

// `live` — is this modifier in force RIGHT NOW? Not the same question as `applied`: a modifier
// that is in force but had nothing computable to change (a dice value, no matching weapon row)
// is live with `applied: false`, and it belongs with the ones that did rewrite a number. What is
// NOT live is a conditional effect whose condition the game has not proven — the card shows those
// apart (in a game, not at all: a block headed "in effect" must not list what is not).
/**
 * @param {ModEntry} entry
 * @param {ModifierEffect} effect
 * @param {boolean} applied
 * @param {string[] | null} [via]
 * @param {boolean} [live]
 */
function noteOf(entry, effect, applied, via = null, live = true) {
  return {
    source: entry.name,
    det: entry.det,
    kind: entry.kind,
    // Only a datasheet ability has these: the unit whose card the ability is printed on, and which
    // direction it reached this card from (self / led / leader / wargear — datasheetEntriesFor).
    // Together with
    // `kind` they are what the card's source label is built from.
    owner: entry.owner || null,
    from: entry.from || null,
    on: effect.on,
    stat: effect.stat,
    op: effect.op,
    value: effect.value,
    // A condition the LIST proved — a Leader attached, a pair of weapons taken — is a fact about the
    // roster, not a state the game can leave, so its wording is dropped once proven: "while a
    // CHARACTER is leading this unit" under a line on the unit that Character leads says nothing.
    // Anything the game or a switch proved keeps it (see the template's `via` treatment).
    when: via?.length && via.every((id) => conditions[id]?.scope === 'roster') ? null : (effect.when || null),
    // The conditions that let a conditional modifier through, or null for an unconditional one.
    // Its presence is what distinguishes "always true" from "true right now".
    via,
    applied,
    live,
    // A dice modifier: never rewrites the table, and the card says so beside it.
    roll: effect.on !== 'incoming' && ROLL_STATS.has(effect.stat || ''),
    // A modifier on an attack made AGAINST this unit ("subtract 1 from the Wound roll"): the
    // attacker's number, not this card's, so nothing on the card moves; `vs` narrows the attacks.
    incoming: effect.on === 'incoming',
    vs: effect.vs || null,
  }
}

// `unit-leading` is the one condition a RECORD can prove by itself: an effect that arrived on this
// card `from: 'led'` is here only because a Leader carrying it is attached to this unit, so asking
// the roster again — against the bodyguard entry, which leads nobody — would answer no and gate off
// a rule that plainly applies. The other thing a record carries is `proves`: what the loadout of the
// unit it came FROM shows (datasheetEntriesFor's `partGear`) — "while this unit contains a Tempestor
// Prime" is about the Command Squad that leads the Scions, and the Scions' own list entry has no
// Tempestor Prime to show (a player's report, 2026-10-26). Everything else is answered by `active`.
/** @param {string} id @param {IdSet} active @param {ModEntry | null} entry */
const proven = (id, active, entry) => !!active?.has(id) || !!entry?.proves?.has(id) || (id === 'unit-leading' && (entry?.from === 'led' || entry?.from === 'co'))

// Does the game say every condition on this effect holds? An effect with no `cond` at all is
// unreviewed markup, and is treated as unproven — never as unconditional.
/** @param {string[] | null | undefined} cond @param {IdSet} active @param {ModEntry | null} [entry] */
function condHolds(cond, active, entry = null) {
  return Array.isArray(cond) && cond.length > 0 && cond.every((id) => proven(id, active, entry))
}

// Is a CONDITIONAL effect proven right now? One predicate for all three passes (alternates, the
// apply pass, keyword grants), because they must agree: an effect that rewrote a number but was
// skipped by the grant pass would leave the card claiming a keyword it does not have, or the other
// way round.
//
// Two kinds of record are proven by the player naming the RECORD rather than by a condition: a
// stratagem, which is proven by being SPENT, and an ability set's option, proven by being the one
// PICKED this round. Their effects usually carry no `cond` at all — the whole condition is the
// choice — so `chosen` (the set of record ids the player says are up: spent stratagems plus picked
// options) answers for them. Everywhere else an absent `cond` still means "nobody has read this
// yet" and stays unproven. Getting that backwards made every stratagem a footnote that never
// applied, however many chips were lit.
// A rule the player switches on as one of a set (`ref.set` — only datasheet abilities carry one).
/** @param {ModEntry} rec */
const isSetRule = (rec) => rec.ref?.kind === 'ability' && !!rec.ref.set
/** @param {ModEntry} entry */
const byChoice = (entry) => entry.kind === 'stratagem' || isSetRule(entry)
/** @param {ModEntry} entry @param {ModifierEffect} effect @param {IdSet} active @param {IdSet} chosen */
function effectLive(entry, effect, active, chosen) {
  // "Select one friendly VEHICLE model within 3\" of this model. Until your next Command phase…" — the
  // aura chip the player marks on that unit IS the selection, so nothing else proves it: not the
  // bearer's own unit (22.01 puts it in range, not in the choice), not the unit it leads.
  if (effect.selected) return entry.from === 'aura' && (!effect.cond?.length || condHolds(effect.cond, active, entry))
  // A once-per-battle effect is proven the same way, by the use the player marked — `chosen` holds
  // the records whose use is still inside its window (rosterGameContext's activeUses). Per EFFECT,
  // not per record: Standard of the Emperor Ascendant gives +1 OC for good and +1 A once.
  if ((byChoice(entry) || effect.once) && !chosen?.has(entry.sid)) return false
  if (effect.cond?.length) return condHolds(effect.cond, active, entry)
  return byChoice(entry) || !!effect.once
}

// entries: [{ name, det, kind, body, effects }] — records the caller resolved to their prose.
// Returns the sheet to render (a copy when anything changed, the same object when not), the
// notes to print under it, the set of cells that were rewritten, keyed
// `profile:<stat>:<profileIndex>` / `<ranged|melee>:<stat>:<rowIndex>` for the card to mark, and
// the keywords granted to the unit (which the caller must fold into `keywords` and re-run — see
// grantedKeywordsFrom).
/**
 * @param {PrintedSheet | null | undefined} sheet
 * @param {ModEntry[] | null | undefined} entries
 * @param {UnitKeywords} keywords the card's own and its attached unit's (ruleTargets' scopeHits), or one list for a unit standing alone
 * @param {KeywordSets} factionKeywordSets
 * @param {IdSet} [active] conditions proven true
 * @param {IdSet} [chosen] stratagems and set rules the player switched on
 */
export function applyStatMods(sheet, entries, keywords, factionKeywordSets, active = null, chosen = null) {
  if (!sheet || !entries?.length) return { sheet, notes: [], marks: [], keywords: [], core: [] }

  /** @type {PrintedSheet | null} */
  let out = null // cloned lazily — an all-conditional unit must keep the original object identity
  const notes = []
  const marks = new Set()
  const granted = []
  const core = []
  // The sheet as it stands RIGHT NOW: the working copy once anything has been written, the
  // original before that. Every effect must read through this, not from `sheet` — two modifiers
  // touching the same cell (a +2 Attacks from an enhancement and a +1 from a detachment rule)
  // would otherwise both compute from the printed value and the second would overwrite the first
  // instead of stacking on it.
  const current = () => out || sheet
  const target = () => {
    if (!out) {
      out = { ...sheet }
      if (sheet.profiles) out.profiles = sheet.profiles.map(copyProfile)
      if (sheet.ranged) out.ranged = sheet.ranged.map((w) => ({ ...w }))
      if (sheet.melee) out.melee = sheet.melee.map((w) => ({ ...w }))
    }
    return out
  }

  for (const entry of entries) {
    // The rows as THIS record found them. `only` clauses are judged against this rather than
    // against the running copy, because the clauses of one rule describe the printed profile, not
    // each other's output: "[RAPID FIRE 1] — or, if the attack already HAS [RAPID FIRE], +1 to that
    // value" is an either/or, and reading the second clause after the first had granted the tag
    // made every weapon take both and land one higher than the rule allows. Effects of DIFFERENT
    // records still chain, which is the stacking the running copy exists for.
    //
    // A real copy of the two fields `only` reads, not a reference: a grant rewrites `row.tags` on
    // the working sheet in place, and once any earlier record has forced that copy into existence
    // `current()` IS the object being written to.
    const asFound = (entry.effects || []).some((e) => e.only) ? snapshotRows(current()) : current()
    // `entry.scopes` is an aura's keyword gate, carried on the record (ref.scopes, derived from the
    // prose by the generator) because the record itself holds no prose to read it from here.
    const scopes = entry.scopes || (SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body))
    // An aura gate on an army-wide rule is not allowed to fail open — see effectApplies.
    const strict = !!entry.scopes && entry.kind === 'detachmentRule'
    const effects = entry.effects || []

    // "…add 2 to the Attacks characteristic INSTEAD." An alternate names the effect it replaces
    // (`alt`, an index into this record's own effects); while it is in force the one it replaces
    // is skipped entirely, so the two can never stack into +3. Its note carries the "instead"
    // wording, which is what explains the missing base line.
    // An entry the player has to CHOOSE (a stratagem, an ability set's option) is gated whether or
    // not its effect carries a `when`: unspent and unpicked mean the same thing as an unproven
    // condition, and a reviewer leaving `when` null must not turn the gate off.
    /** @param {ModifierEffect} eff */
    const gated = (eff) => !!eff.when || byChoice(entry) || !!eff.once
    const replaced = new Set()
    for (const eff of effects) {
      if (eff.alt == null || eff.ruledOut) continue
      if (!effectApplies(eff, scopes, keywords, entry.kind, factionKeywordSets, strict)) continue
      if (gated(eff) && !effectLive(entry, eff, active, chosen)) continue
      replaced.add(eff.alt)
    }

    for (const [index, effect] of effects.entries()) {
      // The list answered this effect's condition, and answered no (gateStratagems): not a note either.
      if (replaced.has(index) || effect.ruledOut) continue
      // A state the rule puts the unit or army in, with no number of its own (an Order that only
      // grants a move, a Vow, a Hyper-adaptation): it exists to be a switch (switchesFor), and the
      // card has nothing to change or footnote for it.
      if (effect.op === 'state') continue
      if (!effectApplies(effect, scopes, keywords, entry.kind, factionKeywordSets, strict)) continue

      // Conditional and unproven: never touch the number, just say what would change and when.
      // A STRATAGEM is its own condition: it was spent on this unit or it was not, and `chosen`
      // is the set of records the player says are in force (keyed by sid, expiring on their own
      // `dur` — see rosterGameContext's activeStratagems). An extra `cond` on top still has to hold,
      // which is how "…against MONSTER targets" stays a footnote even while the stratagem is up.
      const live = gated(effect) ? effectLive(entry, effect, active, chosen) : false
      if (gated(effect) && !live) {
        notes.push(noteOf(entry, effect, false, null, false))
        continue
      }
      // `via` is what PROVED a conditional effect, for the card's "applied, but only because…"
      // treatment. A stratagem was proved by being spent, which its own note already says.
      const via = live ? (effect.cond || []) : null

      // An attack AGAINST this unit is worse for the attacker — "-1 to wound", "worsen the AP by 1",
      // "-1 Damage". The number is the attacker's, so no cell of this card is rewritten: the note
      // is listed, live or possible like any other, and says whose roll it is.
      if (effect.on === 'incoming') {
        notes.push(noteOf(entry, effect, false, via))
        continue
      }

      if (isGrant(effect)) {
        if (effect.stat === 'keyword') {
          granted.push({ kw: String(effect.value), source: entry.name, det: entry.det })
          notes.push(noteOf(entry, effect, true, via))
          continue
        }
        // A CORE ability handed to the unit — "models in that unit have the Feel No Pain 6+
        // ability". Not a characteristic, but it belongs on the card's Core line with the printed
        // ones: a reader looking for what this unit has now should not have to find it in the
        // prose of a rule printed on another model's card. Returned rather than written into the
        // sheet, the same way a granted keyword is.
        if (effect.stat === 'core') {
          core.push({ ability: String(effect.value), source: entry.name, det: entry.det })
          notes.push(noteOf(entry, effect, true, via))
          continue
        }
        // A weapon ability joins that row's printed tags, in the same shape DatasheetCard reads.
        let added = false
        for (const table of WEAPON_TABLES[effect.on || ''] || []) {
          const rows = current()[table] || []
          for (let i = 0; i < rows.length; i++) {
            if (!rowMatchesOnly(asFound[table]?.[i], effect.only) || !inRows(effect, table, i)) continue
            /** @type {string[]} */
            const tags = rows[i].tags || []
            if (idleOnRow(effect.value, tags, table)) continue
            // One instance of an ability at a time (24.02): a grant the row already has as well or
            // better is not added, and one that is better takes the worse one's place.
            if (tags.some((t) => dominates(t, effect.value))) continue
            // the clone has every row the sheet has, so this is the same row, writable
            const dest = target()[table]?.[i]
            if (dest) dest.tags = [...tags.filter((t) => !dominates(effect.value, t)), String(effect.value)]
            marks.add(`${table}:tags:${i}`)
            added = true
          }
        }
        notes.push(noteOf(entry, effect, added, via))
        continue
      }

      // The other half of "…or, if that attack already HAS [RAPID FIRE], +1 to the value of that
      // [RAPID FIRE]". `value` carries the ability's name and the amount to add ("RAPID FIRE 1" =
      // +1 to RAPID FIRE) — the same shape the grant above uses, because the two halves of such a
      // rule are authored as a pair and read side by side in the data. Gate the row with
      // `only.tag`, exactly as the grant half gates itself with `only.notTag`.
      if (effect.stat === 'ability' && effect.op === 'add') {
        const at = TAGGED.exec(String(effect.value).trim())
        let bumped = false
        if (at) {
          for (const table of WEAPON_TABLES[effect.on || ''] || []) {
            const rows = current()[table] || []
            for (let i = 0; i < rows.length; i++) {
              if (!rowMatchesOnly(asFound[table]?.[i], effect.only) || !inRows(effect, table, i)) continue
              /** @type {string[]} */
              const tags = rows[i].tags || []
              const next = tags.map((t) => bumpTag(t, at[1], at[2]) ?? t)
              if (next.every((t, k) => t === tags[k])) continue
              const dest = target()[table]?.[i]
              if (dest) dest.tags = next
              marks.add(`${table}:tags:${i}`)
              bumped = true
            }
          }
        }
        notes.push(noteOf(entry, effect, bumped, via))
        continue
      }

      // A modifier to a ROLL — "each time a model in that unit makes an attack, add 1 to the Hit
      // roll". Not a characteristic: +1 to the Hit roll is not BS 3+ → 2+ (roll modifiers cap at
      // ±1 and an unmodified 1 still fails), so no cell is ever rewritten. It is still in force, so
      // it is a LIVE note, and `roll` tells the card to explain why the table above did not move.
      if (ROLL_STATS.has(effect.stat || '')) {
        notes.push(noteOf(entry, effect, false, via))
        continue
      }

      const tables = effect.on === 'profile' ? ['profiles'] : (WEAPON_TABLES[effect.on || ''] || [])
      /** @param {string} t */
      const markPrefix = (t) => (t === 'profiles' ? 'profile' : t)

      let changed = false
      for (const table of tables) {
        const rows = current()[table] || []
        for (let i = 0; i < rows.length; i++) {
          // `only` never applies to a model profile — it names weapons.
          if (table !== 'profiles' && !rowMatchesOnly(asFound[table][i], effect.only)) continue
          if (!inRows(effect, table, i)) continue
          const stat = effect.stat || ''
          const before = current()[table][i][stat]
          const next = applyValue(before, effect.op, effect.value, stat, effect.best)
          if (next == null || next === String(before)) continue
          target()[table][i][stat] = next
          marks.add(`${markPrefix(table)}:${stat}:${i}`)
          changed = true
        }
      }
      // Nothing computable (every value was a dice expression, or the unit has no such row) —
      // report it as an annotation rather than dropping the modifier on the floor.
      notes.push(noteOf(entry, effect, changed, via))
    }
  }

  return { sheet: out || sheet, notes, marks: [...marks], keywords: granted, core }
}

// The keywords these records grant this unit, WITHOUT applying anything else. Callers need them
// before gating any rule, because a granted keyword decides which rules bear on the unit at all;
// running the full apply pass first would gate on the un-granted keyword set. A conditional grant
// counts only when `active` proves it — the same test the numbers get, so the keyword layer and
// the number layer can never disagree about whether a rule is on.
/**
 * @param {ModEntry[] | null | undefined} entries
 * @param {UnitKeywords} keywords the card's own and its attached unit's (ruleTargets' scopeHits), or one list for a unit standing alone
 * @param {KeywordSets} factionKeywordSets
 * @param {IdSet} [active]
 * @param {IdSet} [chosen]
 */
export function grantedKeywordsFrom(entries, keywords, factionKeywordSets, active = null, chosen = null) {
  const out = []
  for (const entry of entries || []) {
    const scopes = entry.scopes || (SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body))
    for (const effect of entry.effects || []) {
      if (effect.op !== 'grant' || effect.stat !== 'keyword') continue
      if ((effect.when || byChoice(entry) || effect.once) && !effectLive(entry, effect, active, chosen)) continue
      if (!effectApplies(effect, scopes, keywords, entry.kind, factionKeywordSets, !!entry.scopes && entry.kind === 'detachmentRule')) continue
      out.push({ kw: String(effect.value), source: entry.name, det: entry.det })
    }
  }
  return out
}

// Drop the stratagems this unit could not be picked as the target of. A stratagem is spent ON a
// unit, and its TARGET line names which units qualify ("One DAMNED unit from your army that has not
// been selected to shoot this phase") — so a card that cannot be that unit must not carry the
// stratagem's chip in a game, nor list its modifier among what could happen to it out of one. Chaos
// Cult is the detachment that made this plain: five of its six stratagems are DAMNED-only, and
// every Legionaries squad in the list was being offered all of them.
//
// The KEYWORD SET this is judged against is the ATTACHED unit's, not the card's — Core Rules 19.03,
// "an attached unit has all of the keywords of all of its component units, [and] is affected by any
// rule that applies to units with any of those keywords". A Chaos Lord leading a Cultist Mob is in a
// DAMNED unit and can be the target, so his card offers the stratagem too. See
// attachedUnitKeywords(), which is what the callers build that set with.
//
// Fail-open exactly like every other gate here (ruleTargets.js's three escapes): a target line that
// names no unit of yours, or names one no datasheet in the faction matches, gates nothing.
// The keyword gate on a stratagem's TARGET line. Two shapes in the corpus: the line names the unit
// itself ("One DAMNED unit from your army that has not been selected to shoot this phase"), and
// the line points BACK at the unit the WHEN line named — "TARGET: That HERETIC ASTARTES INFANTRY
// FLY unit." after "WHEN: Fight phase, when a friendly HERETIC ASTARTES INFANTRY FLY unit that made
// a Charge move this turn is selected to fight". 80 of the 308 stratagems with a modifier are
// written the second way, and "That …" names nobody in ruleScopes' terms, so every one of them
// was offered to the whole army: a player found Murdertalon Raiders' Plunging Talons (INFANTRY FLY)
// under his Terminators' possible modifiers, and Seize the Prize — whose "excluding MONSTERS and
// VEHICLES" is in its WHEN line, the TARGET being just "That HERETIC ASTARTES unit" — under his
// Defiler's (2026-09-19). For a back-reference the WHEN line is the statement of the target,
// exclusions and all; the target line itself, read as "friendly …", is the fallback for a WHEN
// line that names the unit some other way. Fail-open as before wherever neither reads.
//
// A TARGET line is about the reader's own unit unless it says "enemy" — "One GREY KNIGHTS unit that
// was selected as the target of one or more of the attacking unit's attacks" has no "from your
// army" because the line has no other side to be about — so a line ruleScopes reads as nobody is
// read once more with "Friendly" in place of its opening count. Lowercase "enemy" after the count
// stops the rewrite (no /i flag: the lookahead must mean a capital), and a run that then matches
// no datasheet still falls to escape 3.
const OWN_UNIT_LEAD = /^(?:That|One|Two|Three|Up to \w+|Any number of|One or more|Two or more|One other|One of those)\s+(?=[A-Z])/
/**
 * @param {{ target?: string, when?: string } | null | undefined} st
 */
export function stratagemTargetScopes(st) {
  if (!st) return null
  const target = (st.target || '').replace(/\*\*/g, '')
  if (!target) return null
  // "That … unit", or a model "in that unit" (Eye of the Gods: "One HERETIC ASTARTES CHARACTER
  // model in that unit", the WHEN line carrying the exclusions) — the WHEN line names the unit.
  if (/^That\b|\bin that unit\b/i.test(target)) return ruleScopes(st.when || '') ?? ruleScopes(target.replace(/^That\s+/i, 'Friendly '))
  return ruleScopes(target) ?? (OWN_UNIT_LEAD.test(target) ? ruleScopes(target.replace(OWN_UNIT_LEAD, 'Friendly ')) : null)
}

/**
 * @param {ModEntry[] | null | undefined} entries
 * @param {UnitKeywords} keywords the card's own and its attached unit's (ruleTargets' scopeHits), or one list for a unit standing alone
 * @param {KeywordSets} factionKeywordSets
 * @param {Set<string> | null} [active] what is true for this entry — a target the list decides
 *   ("One DEATH GUARD Attached unit", "Your NECRONS WARLORD") is the record's `appliesWhile`
 * @param {boolean} [listKnows] false for a preview with no roster entry: a rule's own `appliesWhile`
 *   is then unanswered rather than unmet
 * @returns {ModEntry[]}
 */
export function gateStratagems(entries, keywords, factionKeywordSets, active = null, listKnows = true) {
  const kept = (entries || []).filter((e) => {
    const held = (e.appliesWhile || []).every((id) => !!active?.has(id))
    if (e.kind === 'stratagem') return effectApplies({}, e.targetScopes, keywords, e.kind, factionKeywordSets) && held
    // Any other rule in force only inside an attached unit (Command Protocols, a Leader-only
    // enhancement) leaves the card's effects as well as its "in effect" list — it stood under
    // "possible modifiers" on a Monolith and a lone Nekrosor (acceptance, 2026-10-18). A preview
    // with no entry has no attachment to ask about, and keeps it, as the rule list does.
    return !listKnows || held
  })
  if (!listKnows) return kept
  // The same answer one level down: an EFFECT whose condition the list decides and has decided
  // against ("…and −1 AP while a NECRONS CHARACTER is leading the unit" on a unit nobody leads —
  // Protocol of the Hungry Void) is not a possibility the game can still bring about, so it is not
  // offered as one. Only conditions of `scope: 'roster'`; anything the game answers stays a note.
  // Not a `placed` one: "the bearer only" is answered after this, by splitBearers, not by `active`.
  /** @param {ModEntry} e @param {ModifierEffect} eff */
  const decidedAgainst = (e, eff) => (eff.cond || []).some((id) => conditions[id]?.scope === 'roster' && !conditions[id].placed && !proven(id, active, e))
  return kept.map((e) => {
    const effects = e.effects || []
    if (!effects.some((eff) => decidedAgainst(e, eff))) return e
    // Marked, not spliced out: an `alt` names an effect by its index (applyStatMods skips `ruledOut`).
    return { ...e, effects: effects.map((eff) => (decidedAgainst(e, eff) ? { ...eff, ruledOut: true } : eff)) }
  })
}

// The keywords of the OTHER halves of this entry's attached unit — the bodyguard it joined, plus
// anything else attached to that bodyguard (a unit can hold a Leader and a Support at once). Empty
// for an entry standing on its own, which is what makes this safe to add to any keyword set.
//
// `keywordsOf(unitId)` is the caller's lookup into the datasheets it has already loaded; the
// attachment itself is read from the roster, which records it, so nothing here is inferred.
/**
 * @param {Partial<RosterEntry> | null | undefined} entry
 * @param {RosterEntry[] | null | undefined} units
 * @param {((unitId: string) => string[] | null | undefined) | null | undefined} keywordsOf
 * @returns {string[]}
 */
export function attachedUnitKeywords(entry, units, keywordsOf) {
  if (!entry || !keywordsOf) return []
  const hostUid = entry.leaderOf || entry.uid
  const out = []
  for (const u of units || []) {
    if (u.uid === entry.uid) continue
    if (u.uid !== hostUid && u.leaderOf !== hostUid) continue
    out.push(...(keywordsOf(u.id) || []))
  }
  return out
}

// Turn stored records into the `{ ...record, body }` entries applyStatMods wants, dropping every
// one that doesn't bear on this entry. Shared by the unit-rules modal and the roster's read-only
// list — two copies of this gating would drift, and a modifier applied in one place but not the
// other is exactly the bug that would follow.
//
// `facEn` is the ENGLISH faction bundle: the rule bodies feed ruleTargets.js, which reads English
// prose. `detachmentNames` is what the roster actually fields — a modifier from a detachment you
// didn't take is not in play, whatever its rule says. `enhancementName` is the one this entry
// carries (chosen or mandatory), since an enhancement only ever modifies its own bearer.
// The records that hang off a DATASHEET rather than off a rule: its own abilities, and the wargear
// it can be equipped with. Both are resolved from the entry, not from the faction bundle.
//
// An ABILITY has three directions, and which one a record takes is stated by its effect's
// `target`:
//   self    (the default) the ability is printed on this unit's own card
//   led     it is printed on an attached LEADER's card and addresses the unit being led, WITHOUT
//           that leader ("…add 1 to the Strength characteristic of melee weapons equipped by
//           Bodyguard models in that unit" — Fabius Bile's Enhanced Warriors). GW writes
//           "Bodyguard models" exactly when it means to leave the Character out, which is rare.
//   unit    "while this model is leading a unit, models in that unit have…" — the ordinary Leader
//           wording, and the one that includes the leader himself: Core Rules 19.04, "abilities
//           that affect a unit (or models in it) apply to EVERY model in an attached unit". So it
//           lands on both cards — the led unit's, and the leader's own while he is leading one
//           (a leader standing alone leads nobody, and the rule says nothing). Until 2026-08-25
//           these were written `led`, which is why a Succubus's own blades never got the
//           [SUSTAINED HITS 1] her Storm of Blades hands the Wyches she is standing in.
//   leader  it is printed on the BODYGUARD unit's card and addresses the Character leading it
//           ("while a CHARACTER model is leading this unit, that model has Feel No Pain 4+")
// The two cross directions are why this is a separate resolver: every other record in this layer
// rewrites the card it was found on, and an ability is the first thing that can rewrite another.
//
// WARGEAR usually has one: it modifies its bearer, and only once the bearer actually took it —
// plus the same `led` direction for the handful whose rule reads "while the bearer is leading a
// unit", answered from `ctx.leaderItemNames` (what the attached Leaders are carrying). `ctx.itemNames`
// is the set of normalised item names this entry fields (rosterModifiers' loadoutItemIds resolved
// through the shared item table) — without it a Storm Shield's 4+ invulnerable would print on every
// model that could have taken one.
//
// `ctx.leaderUnitIds` are the datasheet ids attached TO this entry, `ctx.ledUnitId` the datasheet
// id of the unit this entry leads, `ctx.coLeaderUnitIds` the OTHER Characters attached to that same
// unit (a Leader and a Support share one Attached unit). All three come from the roster, which
// records the attachment — there is nothing to infer and nothing to ask the player.
// `ctx.partGear` maps each of those attached datasheet ids to the conditions its own loadout proves
// (rosterModifiers' wargearConditions); a record from that part carries it as `proves`.
// Our army-rule name against the record's, apostrophes and case aside. Containment either way:
// a merged name covers the record it was merged from, and a record named for the whole rule still
// matches when our name is the longer one.
/** @param {string | null | undefined} s */
const normRule = foldName
/** @param {string | null | undefined} recName @param {string | null | undefined} ourName */
export function armyRuleMatches(recName, ourName) {
  const a = normRule(recName)
  const b = normRule(ourName)
  if (!a || !b) return false
  return a === b || a.includes(b) || b.includes(a)
}

// The `### <name>` section of an army rule's body (up to the next `### ` heading), or null. A
// heading may carry its Russian after a pipe in RU bodies; the EN body this reads has none.
/** @param {string | null | undefined} body @param {string | null | undefined} name @returns {string | null} */
export function armyRuleSection(body, name) {
  if (!body || !name) return null
  const want = normRule(name)
  const parts = body.split(/^### /m).slice(1)
  for (const p of parts) {
    const nl = p.indexOf('\n')
    const head = nl < 0 ? p : p.slice(0, nl)
    if (normRule(head.split('|')[0]) === want) return nl < 0 ? '' : p.slice(nl + 1).trim()
  }
  return null
}

// The enhancements worn by the OTHER members of the Attached unit an entry belongs to — its
// bodyguard and every Character attached to that bodyguard, or, for the bodyguard itself, the
// Characters attached to it — as `enhKey`s. An Upgrade reads "This unit…", and 19.04 makes a rule
// that affects a unit affect every model in the Attached unit, so a Furious Assault bought for a
// Tactical Squad is the Captain's too, and one bought for the Captain is the squad's (a player's
// report, 2026-10-03). `enhOf(u)` names an entry's enhancement, chosen or mandatory.
/**
 * @param {Partial<RosterEntry> | null | undefined} entry
 * @param {RosterEntry[] | null | undefined} units
 * @param {(u: RosterEntry) => string | null | undefined} enhOf
 * @returns {Set<string>}
 */
export function attachedEnhKeys(entry, units, enhOf) {
  if (!entry) return new Set()
  const host = entry.leaderOf || entry.uid
  const members = (units || []).filter((u) => u.uid === host || u.leaderOf === host)
  return new Set(members.filter((u) => u.uid !== entry.uid).map(enhOf).filter(Boolean).map(enhKey))
}

/**
 * @param {ModEntry[] | null | undefined} records
 * @param {{ unitId?: string, leaderUnitIds?: string[], ledUnitId?: string | null, coLeaderUnitIds?: string[], joinedUnitIds?: string[], itemNames?: Set<string> | null, leaderItemNames?: Set<string> | null, partGear?: Map<string, Set<string>> | null, leaderEnhNames?: Set<string> | null, attachedEnhKeys?: Set<string> | null, auraOn?: Set<string> | null, detIds?: Set<string> | null }} [opts]
 * @returns {ModEntry[]}
 */
export function datasheetEntriesFor(records, { unitId, leaderUnitIds = [], ledUnitId = null, coLeaderUnitIds = [], joinedUnitIds = [], itemNames = null, leaderItemNames = null, partGear = null, leaderEnhNames = null, attachedEnhKeys = null, auraOn = null, detIds = null } = {}) {
  const out = []
  for (const rec of records || []) {
    // A DETACHMENT RULE's aura radiates from a keyword, not from an entry ("friendly IMPERIAL
    // KNIGHTS models have the following ability…"), so there is no attachment to read it off and
    // nothing about it is certain from the list: it arrives only when the player marks the chip.
    // `detIds` is the detachments actually fielded — a mark can only exist because a chip was
    // offered for one, so a caller that cannot say (the unit-rules modal) passes nothing.
    if (rec.ref?.kind === 'detachmentRule') {
      const aura = (rec.effects || []).filter((e) => e.target === 'aura')
      if (!aura.length || !auraOn?.has(rec.sid)) continue
      if (detIds && !detIds.has(rec.ref.det)) continue
      out.push({ ...rec, body: '', effects: aura, from: 'aura', scopes: rec.ref.scopes || null })
      continue
    }
    // An ENHANCEMENT aura reaches this unit in two ways this function can answer. Its bearer's own
    // card gets it from resolveModifierEntries (that is the entry that took the relic); here we
    // cover the two OTHER cards: the unit the bearer is attached to, where 22.01 puts the model
    // inside the aura with no distance to judge, and any entry the player has marked. Same keyword
    // gate as an ability aura — `ref.scopes`, read off the prose by the generator.
    if (rec.ref?.kind === 'enhancement') {
      // "Models in the bearer's unit have the Deep Strike ability" — a relic that addresses the
      // whole unit rather than the one model 19.04 reserves for an enhancement's own effects. The
      // BEARER's card gets it from resolveModifierEntries like any other enhancement line; here it
      // reaches the unit he joined, which is the card the wearer is not on.
      const led = (rec.effects || []).filter((e) => e.target === 'led')
      if (led.length && leaderEnhNames?.has(rec.name)) out.push({ ...rec, body: '', effects: led, from: 'led' })
      // "This unit…" — an Upgrade's own wording (`target: 'unit'`): every card of the Attached unit
      // its bearer is part of, whichever end of the attachment the bearer is (attachedEnhKeys).
      const whole = (rec.effects || []).filter((e) => e.target === 'unit')
      if (whole.length && attachedEnhKeys?.has(enhKey(rec.name))) out.push({ ...rec, body: '', effects: whole, from: 'unit' })
      const aura = (rec.effects || []).filter((e) => e.target === 'aura')
      if (!aura.length) continue
      const scopes = rec.ref.scopes || null
      if (leaderEnhNames?.has(rec.name)) out.push({ ...rec, body: '', effects: aura, from: 'led', scopes })
      else if (auraOn?.has(rec.sid)) out.push({ ...rec, body: '', effects: aura, from: 'aura', scopes })
      continue
    }
    if (rec.kind === 'wargear' && rec.ref?.kind === 'wargear') {
      const at = rec.name.indexOf(': ')
      const split = { name: at === -1 ? rec.name : rec.name.slice(at + 2), owner: at === -1 ? null : rec.name.slice(0, at) }
      // Worn by this unit. No itemNames at all means the caller cannot say what is equipped (the
      // add-unit preview), and a wargear rule is then not shown — unlike a weapon row there is no
      // printed line it would be hiding, so silence is the safe direction.
      const own = (rec.effects || []).filter((e) => (e.target || 'self') === 'self')
      if (own.length && rec.ref.unit === unitId && itemNames?.has(rec.ref.item)) {
        out.push({ ...rec, body: '', effects: own, ...split, from: 'wargear' })
      }
      // …or worn by a Leader attached to this unit, for the handful of items whose rule reads
      // "while the bearer is leading a unit" (a Kustom Force Field, an Inquisitor's Blessed
      // Wardings). `unit` covers the model wearing it as well (19.04, above); `led` is the
      // Bodyguard-only wording, which no wargear rule uses today.
      const led = (rec.effects || []).filter((e) => e.target === 'led')
      if (led.length && leaderUnitIds.includes(rec.ref.unit) && leaderItemNames?.has(rec.ref.item)) {
        out.push({ ...rec, body: '', effects: led, ...split, from: 'led' })
      }
      const whole = (rec.effects || []).filter((e) => e.target === 'unit')
      if (whole.length) {
        if (rec.ref.unit === unitId && itemNames?.has(rec.ref.item) && ledUnitId) {
          out.push({ ...rec, body: '', effects: whole, ...split, from: 'self' })
        } else if (leaderUnitIds.includes(rec.ref.unit) && leaderItemNames?.has(rec.ref.item)) {
          out.push({ ...rec, body: '', effects: whole, ...split, from: 'led' })
        }
      }
      // A wargear AURA (a Plague Marine's Icon of Despair) reaches units around the model wearing
      // it — including, by 22.01, its own. Same keyword gate as an ability aura.
      const aura = (rec.effects || []).filter((e) => e.target === 'aura')
      if (aura.length) {
        const scopes = rec.ref.scopes || null
        if (rec.ref.unit === unitId && itemNames?.has(rec.ref.item)) {
          out.push({ ...rec, body: '', effects: aura, ...split, from: 'self', scopes })
        } else if (leaderUnitIds.includes(rec.ref.unit) && leaderItemNames?.has(rec.ref.item)) {
          out.push({ ...rec, body: '', effects: aura, ...split, from: 'led', scopes })
        } else if (rec.ref.unit !== unitId && auraOn?.has(rec.sid)) {
          out.push({ ...rec, body: '', effects: aura, ...split, from: 'aura', scopes })
        }
      }
      continue
    }
    if (rec.kind !== 'ability' || rec.ref?.kind !== 'ability') continue
    const ref = rec.ref
    /** @param {string} t */
    const of = (t) => (rec.effects || []).filter((e) => (e.target || 'self') === t)
    // A record's name is "<unit>: <ability>". Split rather than reformat: the card labels an
    // effect by WHERE it came from ("LEADER · Fabius Bile") and names the rule separately, so
    // both halves have to travel apart.
    const at = rec.name.indexOf(': ')
    const owner = at === -1 ? null : rec.name.slice(0, at)
    const name = at === -1 ? rec.name : rec.name.slice(at + 2)
    /** @param {ModifierEffect[]} effects @param {string} from */
    const push = (effects, from) => {
      if (!effects.length) return
      const proves = from === 'led' || from === 'co' ? partGear?.get(ref.unit) : null
      out.push({ ...rec, body: '', effects, name, owner, from, ...(proves?.size ? { proves } : {}) })
    }
    // An AURA (`target: 'aura'`) reaches whole units rather than one card, so it travels with the
    // keyword gate its prose named (Core Rules 22.01 wording: "a friendly ADEPTA SORORITAS unit
    // within 6" of this model") — without it a Rhino would collect the buff meant for the Sisters.
    /** @param {string} from */
    const pushAura = (from) => {
      const effects = of('aura')
      if (effects.length) out.push({ ...rec, body: '', effects, name, owner, from, scopes: ref.scopes || null })
    }
    if (ref.unit === unitId) {
      push(of('self'), 'self')
      // 19.04, on the leader's own card: his "models in that unit" reaches him too — but only
      // once there IS a unit, which the roster answers and no player has to be asked.
      if (ledUnitId) push(of('unit'), 'self')
      // 22.01: "while a model with an aura ability is on the battlefield, it is always within
      // range of its own aura ability" — so the bearer's own unit needs no switch and no range.
      pushAura('self')
    }
    if (leaderUnitIds.includes(ref.unit)) {
      push(of('led'), 'led')
      push(of('unit'), 'led')
      // The aura's model is INSIDE this unit, at 0" — same certainty, from the list alone.
      pushAura('led')
    }
    // A second Character in the same Attached unit — a Chaplain beside the Ancient whose +1 OC the
    // squad has. 19.04 hands a rule that affects the unit to EVERY model in it, Characters
    // included: `unit` ("models in that unit") says so outright, and a record that applies to its
    // own model AND to the unit it leads (`self` + `led`: "this unit…", "this model's unit…") is a
    // whole-unit rule by its shape. A `led` with no `self` twin is the narrow "Bodyguard models"
    // wording, which a Character is not (a player's report, 2026-10-02).
    if (coLeaderUnitIds.includes(ref.unit) && ref.unit !== unitId) {
      push(of('unit'), 'co')
      if (of('self').length) push(of('led'), 'co')
      pushAura('co')
    }
    // A unit that joined the unit this Character leads (Cryptothralls, Servitors): its rule for "that
    // CRYPTEK model" (Bound Creation) is about the Character, as a Bodyguard's would be.
    if (joinedUnitIds.includes(ref.unit)) push(of('leader'), 'joined')
    if (ledUnitId && ref.unit === ledUnitId) {
      push(of('leader'), 'leader')
      pushAura('leader')   // …and the Character standing in that unit is inside its aura too
    }
    // Anyone else is a question only the player can answer: it is a distance on the table.
    if (ref.unit !== unitId && auraOn?.has(rec.sid)) pushAura('aura')
  }
  return out
}

// WHICH AURAS THE PLAYER COULD MARK ON THIS UNIT — the only part of an aura the app cannot answer
// itself. The bearer's own unit and the unit it is attached to are certain (22.01, above); everyone
// else is a distance on the table, so those get a chip, and only these:
//   · the aura's source is a DIFFERENT entry of this same roster (nothing else can be near it),
//   · this unit passes the aura's own keyword gate — "a friendly ADEPTA SORORITAS unit" says
//     nothing about the Rhino parked beside it, and a chip that can change nothing is worse than
//     no chip at all,
//   · and the source is not already leading this unit / led by it, where the answer is automatic.
// `rosterUnits` is the list as the caller holds it: `{ uid, id, name }` per entry.
/**
 * @param {ModEntry[] | null | undefined} records
 * @param {{ unitId?: string, entryUid?: string, rosterUnits?: Array<{ uid: string, id: string, name?: string, enh?: string }>, leaderUnitIds?: string[], ledUnitId?: string | null, keywords?: UnitKeywords, factionKeywordSets?: KeywordSets, active?: IdSet, chosen?: IdSet, leaderEnhNames?: Set<string> | null, detIds?: Set<string> | null }} [opts]
 */
export function aurasReaching(records, {
  unitId, entryUid, rosterUnits = [], leaderUnitIds = [], ledUnitId = null,
  keywords = [], factionKeywordSets = null, active = null, chosen = null, leaderEnhNames = null,
  detIds = null,
} = {}) {
  const out = []
  const automatic = new Set([unitId, ...leaderUnitIds, ledUnitId].filter(Boolean))
  // An aura whose own rule is not running changes nothing if marked: the Triumph's Fiery Heart
  // does nothing until it is one of the two relics picked this round. Offering the chip anyway is
  // offering a switch that moves no number, which is exactly what this layer refuses to do
  // elsewhere (switchesFor's `answerable`).
  /** @param {ModEntry} rec @param {ModifierEffect} e */
  const proven = (rec, e) => (!isSetRule(rec) || chosen?.has(rec.sid))
    && (!e.cond?.length || e.cond.every((id) => active?.has(id)))
  for (const rec of records || []) {
    if (rec.ref?.kind !== 'ability' && rec.ref?.kind !== 'wargear'
      && rec.ref?.kind !== 'enhancement' && rec.ref?.kind !== 'detachmentRule') continue
    const ref = rec.ref
    const reaching = (rec.effects || []).filter((e) => e.target === 'aura' && proven(rec, e))
    if (!reaching.length) continue
    // An aura that reaches only the unit its rule SELECTS is never answered by the list: the unit the
    // bearer leads is a candidate like any other, so it is offered the chip too.
    const picked = reaching.every((e) => e.selected)
    // A DETACHMENT RULE's aura has no source ENTRY: the models carrying it are named by keyword, and
    // the player is judging the 6" anyway. So the chip says where the rule comes from — the
    // detachment — and is offered once, to every unit the reach clause names, provided that
    // detachment is on the table. No `detIds`, no chip: a rule from a detachment this army is not
    // playing must never offer a switch.
    if (ref.kind === 'detachmentRule') {
      if (!detIds?.has(ref.det)) continue
      if (!reaching.some((e) => effectApplies(e, ref.scopes, keywords, rec.kind, factionKeywordSets, true))) continue
      out.push({ sid: rec.sid, source: rec.det, sourceUid: null, unit: null, name: rec.name, det: ref.det })
      continue
    }
    // An ENHANCEMENT aura radiates from an ENTRY, not from a datasheet: which model wears the relic
    // is the roster's answer, so the source is found by the enhancement's name and the two certain
    // cases (the bearer itself, and the unit the bearer is attached to) are skipped by entry rather
    // than by unit id.
    if (ref.kind === 'enhancement') {
      if (leaderEnhNames?.has(rec.name) && !picked) continue
      if (!reaching.some((e) => effectApplies(e, ref.scopes, keywords, rec.kind, factionKeywordSets))) continue
      for (const u of rosterUnits) {
        if (!u.enh || enhKey(u.enh) !== enhKey(rec.name) || u.uid === entryUid) continue
        out.push({ sid: rec.sid, source: u.name || u.id, sourceUid: u.uid, unit: u.id, name: rec.name })
      }
      continue
    }
    if (automatic.has(ref.unit) && !picked) continue
    // The same fail-open escapes the apply pass uses, so a chip is offered exactly when the
    // modifier behind it would land.
    if (!reaching.some((e) => effectApplies(e, ref.scopes, keywords, rec.kind, factionKeywordSets))) continue
    for (const u of rosterUnits) {
      if (u.id !== ref.unit || u.uid === entryUid) continue
      const at = rec.name.indexOf(': ')
      out.push({
        sid: rec.sid,
        source: u.name || u.id,       // the entry the aura radiates from, as the list names it
        sourceUid: u.uid,
        unit: ref.unit,           // …and its datasheet, for the caller's RU name lookup
        name: at === -1 ? rec.name : rec.name.slice(at + 2),
      })
    }
  }
  return out
}

/**
 * The allegiance an entry chose, as resolveModifierEntries matches records against it — or null.
 * @param {{ alleg?: { g?: string, gid?: string } } | null | undefined} def the unit's definition
 * @param {{ alleg?: string } | null | undefined} entry the roster entry
 */
export function allegianceChoiceOf(def, entry) {
  return entry?.alleg && def?.alleg ? { g: def.alleg.g, gid: def.alleg.gid, opt: entry.alleg } : null
}

/** An effect with its direction left out: the same change, whoever it is aimed at. @param {ModifierEffect} e */
const effectKey = (e) => JSON.stringify({ ...e, target: undefined })

/**
 * @param {ModEntry[] | null | undefined} records
 * @param {import('../data/data.types.js').FactionRules | null | undefined} facEn the faction's English rules bundle
 * @param {Array<string | { name?: string } | null | undefined> | null | undefined} detachmentNames
 * @param {string | null | undefined} enhancementName
 * @param {{ g?: string, gid?: string, opt?: string } | null | undefined} alleg the entry's allegiance group and pick (allegianceChoiceOf)
 * @returns {ModEntry[]}
 */
export function resolveModifierEntries(records, facEn, detachmentNames, enhancementName, alleg) {
  if (!facEn || !records?.length) return []
  const fielded = new Set((detachmentNames || [])
    .map((d) => detKey(typeof d === 'string' ? d : d?.name))
    .filter(Boolean))
  const out = []
  for (const rec of records) {
    const ref = rec.ref
    if (!ref) continue
    // Datasheet abilities and wargear rules are resolved by datasheetEntriesFor() above — they hang off a unit, not
    // off a rule this function can look up in the faction bundle.
    if (ref.kind === 'ability' || ref.kind === 'wargear') continue
    if (ref.kind === 'allegiance') {
      // Applies only to the unit that made this exact choice in this exact group. `alleg` is
      // `{ g, gid, opt }` (allegianceChoiceOf). Group by id, not name: several appdata groups share
      // one ("Daemonic Allegiance" ×3), each with its own rules (report 77ab9e8d, 2026-10-15).
      // No body: the ability's prose addresses its own model, so there are no scopes to read.
      if (alleg?.g === ref.g && alleg?.gid === ref.gid && alleg?.opt === ref.opt) out.push({ ...rec, body: '' })
      continue
    }
    // A stratagem belongs to a detachment the same way its rules do, so it is fielded or it is not.
    if (ref.kind === 'stratagem') {
      const det = (facEn.detachments || []).find((d) => d.id === ref.det)
      if (!det || !fielded.has(detKey(det.name))) continue
      // …and WHEN it may be used, from the stratagem's own English timing line, so the chip can
      // refuse a stratagem in a phase the game does not allow it in (rosterGameContext's
      // stratagemsFor). Read here because this is the one place that has both the record and the
      // faction data it came from; `facEn` is always the English bundle, which is what phasesOf
      // must be given.
      const st = (det.stratagems || []).find((x) => enhKey(x.name) === enhKey(ref.name || rec.name))
      const slot = st?.when ? { phases: phasesOf(st.when), sides: phaseSidesOf(st.when) } : null
      // …and WHO it may be spent on, from the same line the player reads before spending it:
      // "TARGET: One DAMNED unit from your army…". Kept apart from `scopes` — which gates an
      // EFFECT against the card it is being applied to — because this gates the stratagem itself
      // against the unit it would be USED on, and the two are judged with different keyword sets
      // (see gateStratagems). Ungated when the target names nobody of yours, which is every
      // stratagem aimed at an enemy unit.
      const targetScopes = st ? stratagemTargetScopes(st) : null
      out.push({ ...rec, body: '', slot, targetScopes })
      continue
    }
    if (ref.kind === 'armyRule') {
      // appdata gives a faction SEVERAL army rules (Space Marines have three); we model one, and
      // `ref: {kind:'armyRule'}` can only point at that one. A record written against a rule we do
      // not model separately would silently read the wrong prose — T'au's `Drones` reading the body
      // of `For the Greater Good` — and gate its effects on that rule's targets. So the names have
      // to answer to each other: either is allowed to contain the other, because our own names are
      // sometimes a deliberate merge (`Synapse & Shadow in the Warp` covers a record named
      // `Synapse`), but two unrelated names drop the record rather than mis-resolve it.
      if (facEn.armyRule?.body && armyRuleMatches(rec.name, facEn.armyRule.name)) {
        out.push({ ...rec, body: facEn.armyRule.body })
      } else {
        // …or a rule folded into ours as a `### ` section (gen-faction-rules folds a codex's
        // several army rules into one block: Custodes' Aegis of the Emperor under Martial Ka'tah).
        // Its own section is its prose, so its scopes are read from it alone.
        const section = armyRuleSection(facEn.armyRule?.body, rec.name)
        if (section) out.push({ ...rec, body: section })
      }
      continue
    }
    const det = (facEn.detachments || []).find((d) => d.id === ref.det)
    if (!det || !fielded.has(detKey(det.name))) continue
    if (ref.kind === 'detachmentRule') {
      // Its AURA effects are not facts about the army the way the rest of the rule is — they reach
      // whoever is standing near a model that carries it, which only the player can say. They leave
      // through the chip (datasheetEntriesFor's `auraOn`); what stays here is the rest of the rule,
      // gated as every detachment rule is, by the scopes read off its own body.
      const own = (rec.effects || []).filter((e) => e.target !== 'aura')
      if (det.rule?.body && (own.length || !(rec.effects || []).length)) out.push({ ...rec, body: det.rule.body, effects: own })
    } else if (ref.kind === 'enhancement') {
      if (!enhancementName || enhKey(rec.name) !== enhKey(enhancementName)) continue
      const found = det.enhancements?.find((x) => enhKey(x.name) === enhKey(rec.name))
      if (!found?.body) continue
      // An enhancement AURA reaches whole units, so it is the one part of an enhancement that does
      // NOT simply address its bearer: it comes with the keyword gate its prose named (`ref.scopes`,
      // read by the generator), and the bearer collects it only if the bearer matches that gate —
      // 22.01 puts the model inside its own aura, it does not make a Captain part of the DEATH
      // COMPANY. Split so the rest of the enhancement stays ungated, as every enhancement is.
      // "This unit has +2" Move" is written as a `self` effect AND a `led` copy for the unit he
      // joins (gen-roster-modifiers' "this model's unit" shape). The bearer is the `self` half; the
      // copy is for the Bodyguard's card, and on his own it counted twice — a Wolf Priest with
      // Wolf-Touched moved 11" off a printed 7" (a player's report, 2026-10-24). A `led` with no
      // twin ("models in the bearer's unit") still reaches him: 19.04, he is one of those models.
      const aura = (rec.effects || []).filter((e) => e.target === 'aura')
      const selfOf = (rec.effects || []).filter((e) => (e.target || 'self') === 'self').map(effectKey)
      const own = (rec.effects || []).filter((e) => e.target !== 'aura' && !(e.target === 'led' && selfOf.includes(effectKey(e))))
      if (own.length || !aura.length) out.push({ ...rec, body: found.body, effects: own })
      if (aura.length) out.push({ ...rec, body: found.body, effects: aura, scopes: ref.scopes || null, from: 'self' })
    }
  }
  return out
}

// "The bearer has +1 Wounds" — a wargear modifier that bears on the models that TOOK the item, not
// on the unit (cond `wargear-bearer`). The card is per profile and the table per weapon, so the
// list answers it the only way a card can: the models that carry the item get a row of their own,
// and the modifier is applied to that row alone. Three Storm Shields in a Terminator Assault Squad
// of ten print "Terminator Sergeant" with W 4*, "Terminator ×6" with W 3 and "Terminator · Storm
// Shield ×2" with W 4* (player request, 2026-10-01); a shield on every model is no split at all,
// just the rewritten number.
//
// Who carries it comes from the copies the loadout holds (loadoutItemCopies). An item picked from
// a unit-wide group belongs to no profile, so its copies go to the profiles in the datasheet's own
// order — the first to the Sergeant/Exarch/Champion, as the owner decided; across the units this
// covers the profiles a unit-wide group spans have identical statlines, so the order only names the
// row. A WEAPON row is split only when every model of the unit holds one copy of it (Reavers'
// bladevanes): an Achilles Ridgerunner's Spotter sharpens "the bearer's ranged weapons", and which
// of the unit's heavy mortars and missile launchers the bearer fires is something the list does not
// record. Whatever cannot be placed — an unknown count, a profile the minis do not name, a second
// item landing on models already given one — stays the conditional note it was, never a guess.
//
// An ENHANCEMENT is placed the same way (2026-10-20, a player's report). It is one model's (19.04),
// and a handful of Characters are units of several — Company Heroes, a Command Squad, a Dark
// Apostle with his Disciples — where "This model's ranged attacks have +1 A, S, AP and D" had
// rewritten every pistol and rifle in the unit. The bearer is the model its "X model only" names
// (ANCIENT → the Ancient), else the sheet's first model the unit holds exactly one of (the
// Tempestor Prime, not the first-printed Scion), else the first — the owner's call. It gets the
// profile effects on its own row and the weapon effects on the weapons IT carries, read from the
// loadout's copies per model; a weapon it does not carry is left alone. What cannot be placed —
// an ability like Feel No Pain, a loadout the list cannot pin to a model — stays the note "The
// bearer only" rather than reaching the whole unit. A Character standing alone is untouched.
//
// Returns the sheet to apply to and the entries to apply: a placed effect carries `rows`, the
// indices it may touch, per table (rosterStatMods' applyStatMods); a wargear one also loses its
// condition, an enhancement one keeps whatever else it had.
const BEARER = 'wargear-bearer'
/** @typedef {'profiles' | 'ranged' | 'melee'} BearerTable */
/** Models of one row that carry the same items; no items is the row as printed. @typedef {{ items: string[], n: number, times?: number, effects?: ModifierEffect[] }} BearerGroup */
/**
 * @param {PrintedSheet | null | undefined} sheet
 * @param {ModEntry[] | null | undefined} entries
 * @param {RosterUnit | null | undefined} def
 * @param {Partial<RosterEntry> | null | undefined} entry
 * @param {Record<number, string> | null | undefined} items
 */
export function splitBearers(sheet, entries, def, entry, items) {
  /** @param {ModEntry} e */
  const isBearer = (e) => e.kind === 'wargear' && e.ref?.kind === 'wargear' && !!e.ref.item && (e.effects || []).some((x) => x.cond?.includes(BEARER))
  // The bearer's own enhancement entry (resolveModifierEntries) — not one reaching this card from
  // an attached Character (`from`), and only its untargeted effects: `led`, `unit` and `aura` are
  // the unit's by their own wording.
  /** @param {ModEntry} e */
  const isEnh = (e) => e.kind === 'enhancement' && !e.from && (e.effects || []).some((x) => !x.target)
  if (!sheet || !entries?.some((e) => isBearer(e) || isEnh(e))) return { sheet, entries }
  const copies = loadoutItemCopies(def, entry)
  const perMini = modelsPerMini(def, entry)
  if (!perMini) return { sheet, entries }

  // Which printed profile a mini is: by name, or the only one there is. The plural is folded — the
  // roster data names a profile "Kill Team Bikers" where the sheet prints "KILL TEAM BIKER".
  /** @type {DatasheetProfile[]} */
  const profiles = sheet.profiles || []
  /** @param {string | null | undefined} s */
  const singular = (s) => itemKey(s).replace(/s\b/g, '')
  /** @param {number} m @returns {number | null} */
  const profileOf = (m) => {
    if (profiles.length === 1) return 0
    const want = singular(def?.minis?.[m]?.n)
    const i = want ? profiles.findIndex((p) => singular(p.name) === want) : -1
    return i < 0 ? null : i
  }
  // A mini this entry fields no model of needs no profile: a Proteus Kill Team of five Veterans
  // is not held up by the jump-pack Veterans its sheet prints no row of their own for.
  const minis = [...perMini.keys()].filter((m) => (perMini.get(m) ?? 0) > 0).sort((a, b) => a - b)
  /** @type {Map<number, number>} profile index → models */
  const modelsOf = new Map()
  for (const m of minis) {
    const p = profileOf(m)
    if (p == null) return { sheet, entries }
    modelsOf.set(p, (modelsOf.get(p) || 0) + (perMini.get(m) ?? 0))
  }
  const unitModels = [...modelsOf.values()].reduce((a, n) => a + n, 0)

  // Bearers of one item, per profile index — or null when they cannot be placed. Each profile
  // answers with its LAYERS: how many models hold a first copy, how many a second, and so on —
  // the shape loadoutItemCopies gives a mini's slots, where picks past the model count are further
  // copies on the same models. A T'au Shas'ui with two Shield Drones is [1, 1]: one model, two
  // drones, and "add 1 to the bearer's Wounds" twice over (2026-10-11).
  /** @param {string} itemName @returns {Map<number, number[]> | null} */
  const bearersOf = (itemName) => {
    if (!copies || !items) return null
    const ids = [...copies.keys()].filter((id) => itemKey(items[id]) === itemName)
    // Every count known, or nothing is placed: a bearer is never put on a guess.
    const slots = []
    for (const s of ids.flatMap((id) => copies.get(id) || [])) {
      if (s.n == null) return null
      slots.push({ m: s.m, n: s.n })
    }
    if (!slots.length) return null
    /** @type {Map<number, number[]>} */
    const out = new Map()
    /** @param {number} p @param {number} n */
    const add = (p, n) => {
      const layers = out.get(p) || []
      // A copy goes on the models already holding the most copies that still have room for one.
      let left = n
      for (let k = 0; left > 0; k++) {
        const room = (k === 0 ? modelsOf.get(p) ?? 0 : layers[k - 1]) - (layers[k] || 0)
        const take = Math.min(left, room)
        if (take > 0) { layers[k] = (layers[k] || 0) + take; left -= take }
        if (k > layers.length) return false
      }
      out.set(p, layers)
      return true
    }
    let loose = 0
    for (const s of slots) {
      if (s.m == null) { loose += s.n; continue }
      const p = profileOf(s.m)
      if (p == null || !add(p, s.n)) return null
    }
    // Copies from a unit-wide group belong to no profile: first copies go out in the datasheet's
    // own order (the first to the Sergeant), then second copies the same way, and so on. Counted
    // against each PROFILE's models — several minis can share one printed profile (a Crisis team's
    // Shas'vre and Shas'ui are one "Crisis Battlesuits" row) — and a second layer is dealt at all:
    // until 2026-10-12 neither was, so a drone or a shield on every model, or two on one, placed
    // nothing and the bonus vanished from the card (a player's report: Shield Drones at the maximum).
    const order = [...new Set(minis.map(profileOf))].filter((p) => p != null)
    for (let k = 0; loose > 0; k++) {
      let dealt = 0
      for (const p of order) {
        const layers = out.get(p) || []
        const room = (k === 0 ? modelsOf.get(p) ?? 0 : layers[k - 1] || 0) - (layers[k] || 0)
        const take = Math.min(loose, room)
        if (take <= 0) continue
        layers[k] = (layers[k] || 0) + take
        out.set(p, layers)
        loose -= take
        dealt += take
      }
      if (!dealt) break
    }
    return loose ? null : out
  }
  // Models per number of copies held: layers [3, 1] are two models with one copy and one with two.
  /** @param {number[]} layers @returns {Array<[number, number]>} */
  const byCopies = (layers) => {
    /** @type {Array<[number, number]>} */
    const out = []
    layers.forEach((n, k) => {
      const exactly = n - (layers[k + 1] || 0)
      if (exactly > 0) out.push([k + 1, exactly])
    })
    return out
  }

  // Each row as groups of models that carry the same items; a group with no items is the row as
  // printed. A second item may only be given to models that carry nothing yet.
  /** @type {Record<BearerTable, Map<number, BearerGroup[]>>} */
  const groups = { profiles: new Map(), ranged: new Map(), melee: new Map() }
  /** @param {BearerTable} table @param {number} i @param {number} models @returns {BearerGroup[]} */
  const groupsOf = (table, i, models) => {
    let list = groups[table].get(i)
    if (!list) groups[table].set(i, (list = [{ items: [], n: models }]))
    return list
  }
  /** @param {BearerGroup[]} list @param {string} item @param {number} n @param {number} [times] */
  const give = (list, item, n, times = 1) => {
    const bare = list.find((g) => !g.items.length)
    if (!bare || bare.n < n) return null
    bare.n -= n
    const g = { items: [times > 1 ? `${item} ×${times}` : item], n, times, effects: [] }
    list.push(g)
    return g
  }

  // Pass 1: which group each effect lands on. The effects of one record share their groups — the
  // Shieldvanes' Save and Move are one set of models — so a row is split once per item, not once
  // per effect. A profile effect is placed whole or not at all.
  const placed = new Map() // effect object → the groups it lands on
  const partial = new Set() // weapon effects some of whose rows could not be placed
  for (const e of entries.filter(isBearer)) {
    if (e.ref?.kind !== 'wargear' || !copies || !items) continue // isBearer: only a wargear rule names an item
    const item = e.ref.item
    const by = bearersOf(item)
    if (!by) continue
    const labelId = [...copies.keys()].find((id) => itemKey(items[id]) === item)
    const label = labelId == null ? item : items[labelId]
    const total = [...by.values()].reduce((a, layers) => a + layers.reduce((x, n) => x + n, 0), 0)
    const mine = new Map() // `${table}:${row}:${copies}` → this record's group there
    /** @param {BearerTable} table @param {number} i @param {number} models @param {number} n @param {number} [times] */
    const groupAt = (table, i, models, n, times = 1) => {
      const k = `${table}:${i}:${times}`
      if (!mine.has(k)) mine.set(k, give(groupsOf(table, i, models), label, n, times))
      return mine.get(k)
    }
    for (const effect of e.effects) {
      if (!effect.cond?.includes(BEARER) || effect.cond.length !== 1) continue
      const spots = []
      if (effect.on === 'profile') {
        const want = [...by].filter(([, layers]) => layers[0])
        const fits = want.every(([p, layers]) => [...mine.keys()].some((k) => k.startsWith(`profiles:${p}:`))
          || (groupsOf('profiles', p, modelsOf.get(p) ?? 0).find((g) => !g.items.length)?.n ?? 0) >= layers[0])
        if (!fits) continue
        for (const [p, layers] of want) {
          for (const [times, n] of byCopies(layers)) spots.push(groupAt('profiles', p, modelsOf.get(p) ?? 0, n, times))
        }
      } else {
        for (const table of WEAPON_TABLES[effect.on || ''] || []) {
          for (const [i, w] of (sheet[table] || []).entries()) {
            if (!rowMatchesOnly(w, effect.only)) continue
            const g = (w.qty || 1) === unitModels ? groupAt(table, i, unitModels, total) : null
            if (g) spots.push(g)
            else partial.add(effect)
          }
        }
      }
      if (spots.length) placed.set(effect, spots)
    }
  }

  // Enhancements: one bearer model, `b` a mini index.
  const unplaced = new Set() // enhancement effects left as the bearer's note
  const enhEntries = unitModels > 1 ? entries.filter(isEnh) : []
  const claimer = enhEntries.length && copies && items ? weaponRowClaimer(def, items) : null
  // How many copies of a weapon row the bearer holds — null when the list cannot say (an item from
  // a unit-wide group, a count unknown, a row no item claims, a profile-level copy among several).
  /** @param {number} b @param {string} rowName @returns {number | null} */
  const heldBy = (b, rowName) => {
    const ids = claimer?.(rowName)
    if (!ids || !copies) return null
    const slots = ids.flatMap((id) => copies.get(id) || [])
    if (slots.some((s) => s.m == null || s.n == null)) return null
    const mine = slots.filter((s) => s.m === b && (s.n ?? 0) > 0)
    if (mine.some((s) => (s.n ?? 0) < (perMini.get(b) ?? 0))) return null
    return mine.length
  }
  for (const e of enhEntries) {
    const b = enhBearer(e.body, minis, def, perMini)
    const p = b == null ? null : profileOf(b)
    const mine = new Map()
    /** @param {BearerTable} table @param {number} i @param {number} models @param {number} n */
    const groupAt = (table, i, models, n) => {
      const k = `${table}:${i}`
      if (!mine.has(k)) mine.set(k, give(groupsOf(table, i, models), e.name, n))
      return mine.get(k)
    }
    for (const effect of e.effects || []) {
      if (effect.target) continue
      if (p == null || b == null) { unplaced.add(effect); continue }
      if (effect.on === 'profile') {
        const g = groupAt('profiles', p, modelsOf.get(p) ?? 0, 1)
        if (g) placed.set(effect, [g])
        else unplaced.add(effect)
        continue
      }
      const tables = WEAPON_TABLES[effect.on || '']
      if (!tables) { unplaced.add(effect); continue }
      const spots = []
      for (const table of tables) {
        for (const [i, w] of (sheet[table] || []).entries()) {
          if (!rowMatchesOnly(w, effect.only)) continue
          const held = heldBy(b, w.name)
          if (held === 0) continue
          const g = held == null ? null : groupAt(table, i, w.qty || 1, held)
          if (g) spots.push(g)
          else partial.add(effect)
        }
      }
      // No spot and nothing unknown: the bearer carries none of these weapons — placed on no row.
      if (spots.length || !partial.has(effect)) placed.set(effect, spots)
      else unplaced.add(effect)
    }
  }
  if (!placed.size && !unplaced.size) return { sheet, entries }

  // Pass 2: rebuild the touched tables, a row per group, and remember where each group went.
  const out = { ...sheet }
  const where = new Map() // group → { table, index }
  /** @type {BearerTable[]} */
  const bearerTables = ['profiles', 'ranged', 'melee']
  for (const table of bearerTables) {
    if (!groups[table].size) continue
    const rows = []
    for (const [i, row] of (sheet[table] || []).entries()) {
      const list = groups[table].get(i)
      if (!list) { rows.push(row); continue }
      const live = list.filter((g) => g.n > 0)
      for (const g of live) {
        where.set(g, { table, index: rows.length })
        // A group that is the whole row keeps the row's own name: nothing is split, a number moves.
        if (live.length === 1) { rows.push(row); continue }
        const name = g.items.length ? `${row.name} · ${g.items.join(', ')}` : row.name
        rows.push({ ...row, name, qty: g.n })
      }
    }
    out[table] = rows
  }

  /** @param {ModifierEffect} x */
  const bearerNote = (x) => ({ ...x, cond: [...(x.cond || []), BEARER] })
  const placedEntries = entries.map((e) => {
    if (enhEntries.includes(e)) {
      return {
        ...e,
        effects: e.effects.flatMap((x) => {
          if (unplaced.has(x)) return [bearerNote(x)]
          const spots = placed.get(x)
          if (!spots) return [x]
          /** @type {Record<string, number[]>} */
          const rows = {}
          for (const g of spots) {
            const at = where.get(g)
            if (at) (rows[at.table] ||= []).push(at.index)
          }
          const done = { ...x, rows }
          return partial.has(x) ? [done, bearerNote(x)] : [done]
        }),
      }
    }
    if (!isBearer(e) || !e.effects.some((x) => placed.has(x))) return e
    return {
      ...e,
      // A weapon effect placed on some rows and not others (a Spotter: the stubber every model
      // carries, but not the heavy weapon only some do) is applied where it could be and stays a
      // note for the rest.
      effects: e.effects.flatMap((x) => {
        const spots = placed.get(x)
        if (!spots) return [x]
        // One applied effect per number of copies: two Shield Drones add twice what one does. Only
        // an `add` multiplies — a SET ("has a Move characteristic of 7\"") is the same with two.
        const byTimes = new Map()
        for (const g of spots) {
          const at = where.get(g)
          if (!at) continue
          const t = x.op === 'add' && typeof x.value === 'number' ? (g.times || 1) : 1
          if (!byTimes.has(t)) byTimes.set(t, {})
          ;(byTimes.get(t)[at.table] ||= []).push(at.index)
        }
        const done = [...byTimes].map(([t, rows]) => ({ ...x, value: t > 1 ? Number(x.value) * t : x.value, cond: null, when: null, rows }))
        return partial.has(x) ? [...done, x] : done
      }),
    }
  })
  return { sheet: out, entries: placedEntries }
}

// Which model of a unit carries its enhancement — a mini index among `minis` (the ones fielded), or
// null. "ANCIENT model only", "DARK APOSTLE or DAMNED model only": a model whose name holds one of
// the named words is the bearer; otherwise the first model the unit holds exactly one of, and
// otherwise the first. Keywords name the unit as a whole (every Company Hero is INFANTRY), so a
// phrase that names no single model leaves the choice to the order.
/**
 * @param {string | undefined} body
 * @param {number[]} minis
 * @param {RosterUnit | null | undefined} def
 * @param {Map<number, number>} perMini
 * @returns {number | null}
 */
function enhBearer(body, minis, def, perMini) {
  if (!minis.length) return null
  /** @param {string | null | undefined} s */
  const words = (s) => ` ${itemKey(s).replace(/s\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim()} `
  const text = String(body || '').replace(/\*\*|__|<[^>]+>/g, '').replace(/^\s*Upgrade:\s*/i, '')
  const head = /^(.+?)\s+models?\b/i.exec(text.split('\n')[0] || '')?.[1] || ''
  const named = head.replace(/\([^)]*\)/g, ' ').split(/\/|,|\bor\b/i).map((p) => words(p)).filter((p) => p.trim())
  const hit = minis.find((m) => named.some((p) => words(def?.minis?.[m]?.n).includes(p)))
  if (hit != null) return hit
  return minis.find((m) => perMini.get(m) === 1) ?? minis[0]
}

// Who stands with whom in an Attached unit, for datasheetEntriesFor() — one reading for the unit
// card and the roster screen, which each wrote it out. A unit that JOINED a led unit (`joins`:
// Cryptothralls, Servitors, Court of the Archon) leads nobody: the Characters leading that unit
// lead it too (its models count as part of the Bodyguard unit), and a Character standing there
// takes its rules for "that CRYPTEK model" (`joinedUnitIds`). `isJoiner` is the caller's (it holds
// the roster's definitions).
/**
 * @template {{ uid?: string, id?: string, leaderOf?: string | null }} T
 * @param {T} entry
 * @param {T[]} units
 * @param {(u: T) => boolean} isJoiner
 * @returns {{ leaders: T[], ledUnitId: string | null, coLeaderUnitIds: string[], joinedUnitIds: string[] }}
 */
export function attachmentOf(entry, units, isJoiner) {
  const list = units || []
  if (entry.leaderOf && isJoiner(entry)) {
    const leaders = list.filter((u) => u.leaderOf === entry.leaderOf && u.uid !== entry.uid && !isJoiner(u))
    return { leaders, ledUnitId: null, coLeaderUnitIds: [], joinedUnitIds: [] }
  }
  const mates = entry.leaderOf ? list.filter((u) => u.leaderOf === entry.leaderOf && u.uid !== entry.uid) : []
  return {
    leaders: list.filter((u) => u.leaderOf === entry.uid),
    ledUnitId: entry.leaderOf ? list.find((u) => u.uid === entry.leaderOf)?.id || null : null,
    coLeaderUnitIds: /** @type {string[]} */ (mates.filter((u) => !isJoiner(u)).map((u) => u.id)),
    joinedUnitIds: /** @type {string[]} */ (mates.filter(isJoiner).map((u) => u.id)),
  }
}

// Everything datasheetEntriesFor() needs to know about the Attached unit an entry stands in, read
// in ONE place. The unit card and the roster screen used to assemble it each on their own, and the
// card lost two facts on the way: what the attached Leaders carry (a Kustom Force Field reached the
// Boyz row in the list, not the card behind it) and what their models prove (a Tempestor Prime in
// the Command Squad — a player's report, 2026-10-26). `defOf` names any entry's roster definition
// (the caller's own for an edited entry), `sheetOf` its printed datasheet, `items` the item table.
/**
 * @param {RosterEntry} entry
 * @param {RosterEntry[] | null | undefined} units
 * @param {{ defOf: (u: RosterEntry) => any, sheetOf: (id: string) => any, items: any, detachments?: any }} ctx
 */
export function attachmentContext(entry, units, { defOf, sheetOf, items, detachments }) {
  const list = units || []
  const at = attachmentOf(entry, list, (u) => !!defOf(u)?.joins)
  /** @param {RosterEntry} u */
  const enhOf = (u) => u.enh || mandatoryEnhancementFor(defOf(u), detachments)?.name || null
  const leaderItemNames = new Set()
  const leaderEnhNames = new Set()
  for (const u of at.leaders) {
    for (const n of loadoutItemNames(defOf(u), u, items) || []) leaderItemNames.add(n)
    const n = enhOf(u)
    if (n) leaderEnhNames.add(n)
  }
  // What each OTHER part's models prove, by datasheet id — the parts whose records reach this card
  // as `led` (its Leaders) or `co` (the Characters beside it in the unit it leads).
  const coLeaders = entry.leaderOf ? list.filter((u) => u.leaderOf === entry.leaderOf && u.uid !== entry.uid) : []
  /** @type {Map<string, Set<string>>} */
  const partGear = new Map()
  for (const u of [...at.leaders, ...coLeaders]) {
    const gear = wargearConditions(defOf(u), u, items, sheetOf(u.id))
    if (gear.size) partGear.set(u.id, new Set([...(partGear.get(u.id) || []), ...gear]))
  }
  return {
    leaderUnitIds: at.leaders.map((u) => u.id),
    ledUnitId: at.ledUnitId,
    coLeaderUnitIds: at.coLeaderUnitIds,
    joinedUnitIds: at.joinedUnitIds,
    // What this entry is actually carrying — a Storm Shield's 4+ invulnerable is not a fact about
    // the datasheet, it is a fact about the model that took the shield.
    itemNames: loadoutItemNames(defOf(entry), entry, items),
    // What the attached Leaders are carrying, and which enhancements they wear: an enhancement aura
    // covers the unit its bearer joined with no distance to judge (22.01).
    leaderItemNames,
    leaderEnhNames,
    partGear,
    // …and what every other member of this Attached unit carries, for an Upgrade's "This unit…".
    attachedEnhKeys: attachedEnhKeys(entry, list, enhOf),
  }
}
