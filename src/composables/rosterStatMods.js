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

import { ruleScopes, keywordsMatchTarget } from './ruleTargets.js'
import { enhKey, detKey } from './rosterModifiers.js'
import { phasesOf, phaseSidesOf } from './stratagemPhases.js'

// Which model profiles / weapon rows an effect addresses.
const WEAPON_TABLES = { ranged: ['ranged'], melee: ['melee'], weapon: ['ranged', 'melee'] }

// A narrower target than `on` can express: "the bearer's Psychic weapons only", "excluding Extra
// Attacks weapons". `only.tag` / `only.notTag` match the row's printed ability tags (which is what
// those phrases name — PSYCHIC, TORRENT, PISTOL, RAPID FIRE are weapon abilities), `only.name`
// matches the weapon by name. Prefix-matched and case-insensitive, because a tag carries its value
// with it ("RAPID FIRE 1") and a name can be qualified ("Plague Wind – overcharge").
//
// Without this the restriction had nowhere to live but the `when` prose, which meant the modifier
// could never be applied at all — a unit-wide +1 Strength would have hit weapons the rule doesn't
// touch. See conditions.js's `blocked-weapon`.
const norm = (s) => String(s ?? '').toLowerCase().trim()
function rowMatchesOnly(row, only) {
  if (!only) return true
  const tags = (row?.tags || []).map(norm)
  const has = (t) => tags.some((x) => x === norm(t) || x.startsWith(`${norm(t)} `))
  if (only.tag && !has(only.tag)) return false
  if (only.notTag && has(only.notTag)) return false
  if (only.name && !norm(row?.name).startsWith(norm(only.name))) return false
  return true
}

// Does the statement this effect was read from bear on this unit? `scope` is an index into
// ruleScopes(); a null scope means the effect belongs to the rule as a whole, so any statement
// matching is enough. An enhancement has no scope at all — the caller only passes it for the
// unit carrying it.
function effectApplies(effect, scopes, keywords, kind, factionKeywordSets) {
  // No scopes to gate on. Either the prose named no unit at all (fail-open, see ruleTargets), or
  // the record's kind is one whose prose addresses exactly the card it is applied to — an
  // enhancement modifies its own bearer, an allegiance choice its own chooser, a wargear rule
  // whoever took the item, a datasheet ability the card it is printed on (or the card of the unit
  // it is attached to, resolved by `target` before we ever get here), and applyStatMods never
  // reads scopes for those. An AURA is the exception among abilities: it addresses "a friendly
  // ADEPTA SORORITAS unit", and its scopes travel on the entry, so it lands here gated.
  if (!scopes?.length) return true
  const hits = (kws) => (sc) => sc.targets.some((t) => keywordsMatchTarget(kws, t))
    && !sc.excludes.some((x) => keywordsMatchTarget(kws, x))
  // The same "the extraction matched nobody, so distrust it" escape ruleTargets.js applies when
  // DISPLAYING the rule. Without it the two layers disagree: the prose block shows the rule to
  // everyone (fail-open) while its reviewed modifier silently applies to no one — a hand-read
  // effect quietly doing nothing is the worst of both.
  if (factionKeywordSets?.length && !factionKeywordSets.some((kws) => scopes.some(hits(kws)))) return true
  if (effect.scope == null) return scopes.some(hits(keywords))
  const sc = scopes[effect.scope]
  return sc ? hits(keywords)(sc) : false
}

// Arithmetic on a printed characteristic, or null when it can't be done honestly.
// Characteristics come in four printed shapes: a plain number ("5"), a distance ('6"'), a
// skill/save roll ("3+") and a dice expression ("D6+2"). Only the first three are computable.
export function applyValue(current, op, value) {
  const raw = String(current ?? '').trim()
  // `set` before the empty check: "the bearer has a 5+ invulnerable save" GRANTS a characteristic
  // the datasheet doesn't print at all, which is the commonest set there is.
  if (op === 'set') return String(value)
  if (!raw) return null

  const roll = raw.match(/^(\d+)\+$/)
  if (roll) {
    // A roll improves by going DOWN, and 2+ is the floor no modifier can beat.
    const n = Number(roll[1])
    const next = op === 'improve' ? n - Number(value) : n + Number(value)
    return `${Math.max(2, Math.min(6, next))}+`
  }

  const dist = raw.match(/^(\d+)"$/)
  if (dist) {
    if (op !== 'add') return null
    return `${Math.max(0, Number(dist[1]) + Number(value))}"`
  }

  // Signed, and deliberately NOT clamped at zero: Armour Penetration is printed negative, and
  // "improve the AP by 1" is authored as `add: -1` (-2 → -3). `improve` is reserved for the
  // roll-shaped characteristics above, where better means a lower number; for a plain one the
  // reviewer writes `add` with the sign the rule implies, since "improve" means +2 for Objective
  // Control and -1 for AP and no single op can be both.
  const plain = raw.match(/^-?\d+$/)
  if (plain) {
    if (op !== 'add') return null
    return String(Number(raw) + Number(value))
  }

  return null // "D6+2", "N/A", a range like "18-36" — annotate instead of guessing
}

// A grant is an effect whose "value" is a name rather than a number: `stat: 'keyword'` gives the
// unit a keyword (which can then make OTHER rules apply to it — Necrons' Destroyer Ankh grants
// DESTROYER CULT, and Cold Fervour's first bullet gives every DESTROYER CULT model +2 Strength),
// `stat: 'ability'` gives its weapons a bracketed ability. Modelled as an effect rather than a
// second system so `when`, `scope` and the whole applicability machinery are shared.
const isGrant = (effect) => effect.op === 'grant'

// Records whose prose addresses exactly one unit — the one the caller resolved them FOR — so
// ruleScopes() has nothing to gate on. Everything else is army- or detachment-wide prose that
// names who it bears on, and is gated by keyword.
const SCOPELESS = new Set(['enhancement', 'allegiance', 'ability', 'wargear', 'stratagem'])

// `live` — is this modifier in force RIGHT NOW? Not the same question as `applied`: a modifier
// that is in force but had nothing computable to change (a dice value, no matching weapon row)
// is live with `applied: false`, and it belongs with the ones that did rewrite a number. What is
// NOT live is a conditional effect whose condition the game has not proven — the card shows those
// apart (in a game, not at all: a block headed "in effect" must not list what is not).
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
    when: effect.when || null,
    // The conditions that let a conditional modifier through, or null for an unconditional one.
    // Its presence is what distinguishes "always true" from "true right now".
    via,
    applied,
    live,
  }
}

// Does the game say every condition on this effect holds? An effect with no `cond` at all is
// unreviewed markup, and is treated as unproven — never as unconditional.
function condHolds(cond, active) {
  return Array.isArray(cond) && cond.length > 0 && cond.every((id) => active?.has(id))
}

// Is a CONDITIONAL effect proven right now? One predicate for all three passes (alternates, the
// apply pass, keyword grants), because they must agree: an effect that rewrote a number but was
// skipped by the grant pass would leave the card claiming a keyword it does not have, or the other
// way round.
//
// A stratagem is proven by being SPENT, and its effects usually carry no `cond` at all — the whole
// condition is that someone paid for it. Everywhere else an absent `cond` still means "nobody has
// read this yet" and stays unproven. Getting that backwards made every stratagem a footnote that
// never applied, however many chips were lit.
function effectLive(entry, effect, active, activeStrats) {
  if (entry.kind === 'stratagem' && !activeStrats?.has(entry.sid)) return false
  if (effect.cond?.length) return condHolds(effect.cond, active)
  return entry.kind === 'stratagem'
}

// entries: [{ name, det, kind, body, effects }] — records the caller resolved to their prose.
// Returns the sheet to render (a copy when anything changed, the same object when not), the
// notes to print under it, the set of cells that were rewritten, keyed
// `profile:<stat>:<profileIndex>` / `<ranged|melee>:<stat>:<rowIndex>` for the card to mark, and
// the keywords granted to the unit (which the caller must fold into `keywords` and re-run — see
// grantedKeywordsFrom).
export function applyStatMods(sheet, entries, keywords, factionKeywordSets, active = null, activeStrats = null) {
  if (!sheet || !entries?.length) return { sheet, notes: [], marks: [], keywords: [] }

  let out = null // cloned lazily — an all-conditional unit must keep the original object identity
  const notes = []
  const marks = new Set()
  const granted = []
  // The sheet as it stands RIGHT NOW: the working copy once anything has been written, the
  // original before that. Every effect must read through this, not from `sheet` — two modifiers
  // touching the same cell (a +2 Attacks from an enhancement and a +1 from a detachment rule)
  // would otherwise both compute from the printed value and the second would overwrite the first
  // instead of stacking on it.
  const current = () => out || sheet
  const target = () => {
    if (!out) {
      out = { ...sheet }
      if (sheet.profiles) out.profiles = sheet.profiles.map((p) => ({ ...p }))
      if (sheet.ranged) out.ranged = sheet.ranged.map((w) => ({ ...w }))
      if (sheet.melee) out.melee = sheet.melee.map((w) => ({ ...w }))
    }
    return out
  }

  for (const entry of entries) {
    // `entry.scopes` is an aura's keyword gate, carried on the record (ref.scopes, derived from the
    // prose by the generator) because the record itself holds no prose to read it from here.
    const scopes = entry.scopes || (SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body))
    const effects = entry.effects || []

    // "…add 2 to the Attacks characteristic INSTEAD." An alternate names the effect it replaces
    // (`alt`, an index into this record's own effects); while it is in force the one it replaces
    // is skipped entirely, so the two can never stack into +3. Its note carries the "instead"
    // wording, which is what explains the missing base line.
    const replaced = new Set()
    for (const eff of effects) {
      if (eff.alt == null) continue
      if (!effectApplies(eff, scopes, keywords, entry.kind, factionKeywordSets)) continue
      if (eff.when && !effectLive(entry, eff, active, activeStrats)) continue
      replaced.add(eff.alt)
    }

    for (const [index, effect] of effects.entries()) {
      if (replaced.has(index)) continue
      if (!effectApplies(effect, scopes, keywords, entry.kind, factionKeywordSets)) continue

      // Conditional and unproven: never touch the number, just say what would change and when.
      // A STRATAGEM is its own condition: it was spent on this unit or it was not, and `activeStrats`
      // is the set of records the player says are in force (keyed by sid, expiring on their own
      // `dur` — see rosterGameContext's activeStratagems). An extra `cond` on top still has to hold,
      // which is how "…against MONSTER targets" stays a footnote even while the stratagem is up.
      const live = effect.when ? effectLive(entry, effect, active, activeStrats) : false
      if (effect.when && !live) {
        notes.push(noteOf(entry, effect, false, null, false))
        continue
      }
      // `via` is what PROVED a conditional effect, for the card's "applied, but only because…"
      // treatment. A stratagem was proved by being spent, which its own note already says.
      const via = live ? (effect.cond || []) : null

      if (isGrant(effect)) {
        if (effect.stat === 'keyword') {
          granted.push({ kw: String(effect.value), source: entry.name, det: entry.det })
          notes.push(noteOf(entry, effect, true, via))
          continue
        }
        // A weapon ability joins that row's printed tags, in the same shape DatasheetCard reads.
        let added = false
        for (const table of WEAPON_TABLES[effect.on] || []) {
          const rows = current()[table] || []
          for (let i = 0; i < rows.length; i++) {
            if (!rowMatchesOnly(current()[table][i], effect.only)) continue
            const tags = current()[table][i].tags || []
            if (tags.some((t) => String(t).toUpperCase() === String(effect.value).toUpperCase())) continue
            const dest = target()[table][i]
            dest.tags = [...tags, String(effect.value)]
            marks.add(`${table}:tags:${i}`)
            added = true
          }
        }
        notes.push(noteOf(entry, effect, added, via))
        continue
      }

      const tables = effect.on === 'profile' ? ['profiles'] : (WEAPON_TABLES[effect.on] || [])
      const markPrefix = (t) => (t === 'profiles' ? 'profile' : t)

      let changed = false
      for (const table of tables) {
        const rows = current()[table] || []
        for (let i = 0; i < rows.length; i++) {
          // `only` never applies to a model profile — it names weapons.
          if (table !== 'profiles' && !rowMatchesOnly(current()[table][i], effect.only)) continue
          const before = current()[table][i][effect.stat]
          const next = applyValue(before, effect.op, effect.value)
          if (next == null || next === String(before)) continue
          target()[table][i][effect.stat] = next
          marks.add(`${markPrefix(table)}:${effect.stat}:${i}`)
          changed = true
        }
      }
      // Nothing computable (every value was a dice expression, or the unit has no such row) —
      // report it as an annotation rather than dropping the modifier on the floor.
      notes.push(noteOf(entry, effect, changed, via))
    }
  }

  return { sheet: out || sheet, notes, marks: [...marks], keywords: granted }
}

// The keywords these records grant this unit, WITHOUT applying anything else. Callers need them
// before gating any rule, because a granted keyword decides which rules bear on the unit at all;
// running the full apply pass first would gate on the un-granted keyword set. A conditional grant
// counts only when `active` proves it — the same test the numbers get, so the keyword layer and
// the number layer can never disagree about whether a rule is on.
export function grantedKeywordsFrom(entries, keywords, factionKeywordSets, active = null, activeStrats = null) {
  const out = []
  for (const entry of entries || []) {
    const scopes = SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body)
    for (const effect of entry.effects || []) {
      if (effect.op !== 'grant' || effect.stat !== 'keyword') continue
      if (effect.when && !effectLive(entry, effect, active, activeStrats)) continue
      if (!effectApplies(effect, scopes, keywords, entry.kind, factionKeywordSets)) continue
      out.push({ kw: String(effect.value), source: entry.name, det: entry.det })
    }
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
//   led     it is printed on an attached LEADER's card and addresses the unit being led
//           ("…add 1 to the Strength characteristic of melee weapons equipped by Bodyguard models
//           in that unit" — Fabius Bile's Enhanced Warriors)
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
// id of the unit this entry leads. Both come from the roster, which records the attachment — there
// is nothing to infer and nothing to ask the player.
// Our army-rule name against the record's, apostrophes and case aside. Containment either way:
// a merged name covers the record it was merged from, and a record named for the whole rule still
// matches when our name is the longer one.
const normRule = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
function armyRuleMatches(recName, ourName) {
  const a = normRule(recName)
  const b = normRule(ourName)
  if (!a || !b) return false
  return a === b || a.includes(b) || b.includes(a)
}

export function datasheetEntriesFor(records, { unitId, leaderUnitIds = [], ledUnitId = null, itemNames = null, leaderItemNames = null, auraOn = null } = {}) {
  const out = []
  for (const rec of records || []) {
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
      // …or worn by a Leader attached to this unit, for the five items whose rule reads "while the
      // bearer is leading a unit" (a Kustom Force Field, an Inquisitor's Blessed Wardings).
      const led = (rec.effects || []).filter((e) => e.target === 'led')
      if (led.length && leaderUnitIds.includes(rec.ref.unit) && leaderItemNames?.has(rec.ref.item)) {
        out.push({ ...rec, body: '', effects: led, ...split, from: 'led' })
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
    const of = (t) => (rec.effects || []).filter((e) => (e.target || 'self') === t)
    // A record's name is "<unit>: <ability>". Split rather than reformat: the card labels an
    // effect by WHERE it came from ("LEADER · Fabius Bile") and names the rule separately, so
    // both halves have to travel apart.
    const at = rec.name.indexOf(': ')
    const owner = at === -1 ? null : rec.name.slice(0, at)
    const name = at === -1 ? rec.name : rec.name.slice(at + 2)
    const push = (effects, from) => { if (effects.length) out.push({ ...rec, body: '', effects, name, owner, from }) }
    // An AURA (`target: 'aura'`) reaches whole units rather than one card, so it travels with the
    // keyword gate its prose named (Core Rules 22.01 wording: "a friendly ADEPTA SORORITAS unit
    // within 6" of this model") — without it a Rhino would collect the buff meant for the Sisters.
    const pushAura = (from) => {
      const effects = of('aura')
      if (effects.length) out.push({ ...rec, body: '', effects, name, owner, from, scopes: rec.ref.scopes || null })
    }
    if (rec.ref.unit === unitId) {
      push(of('self'), 'self')
      // 22.01: "while a model with an aura ability is on the battlefield, it is always within
      // range of its own aura ability" — so the bearer's own unit needs no switch and no range.
      pushAura('self')
    }
    if (leaderUnitIds.includes(rec.ref.unit)) {
      push(of('led'), 'led')
      // The aura's model is INSIDE this unit, at 0" — same certainty, from the list alone.
      pushAura('led')
    }
    if (ledUnitId && rec.ref.unit === ledUnitId) {
      push(of('leader'), 'leader')
      pushAura('leader')   // …and the Character standing in that unit is inside its aura too
    }
    // Anyone else is a question only the player can answer: it is a distance on the table.
    if (rec.ref.unit !== unitId && auraOn?.has(rec.sid)) pushAura('aura')
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
export function aurasReaching(records, {
  unitId, entryUid, rosterUnits = [], leaderUnitIds = [], ledUnitId = null,
  keywords = [], factionKeywordSets = null,
} = {}) {
  const out = []
  const automatic = new Set([unitId, ...leaderUnitIds, ledUnitId].filter(Boolean))
  for (const rec of records || []) {
    if (rec.ref?.kind !== 'ability' && rec.ref?.kind !== 'wargear') continue
    if (!(rec.effects || []).some((e) => e.target === 'aura')) continue
    if (automatic.has(rec.ref.unit)) continue
    // The same fail-open escapes the apply pass uses, so a chip is offered exactly when the
    // modifier behind it would land.
    if (!(rec.effects || []).some((e) => effectApplies(e, rec.ref.scopes, keywords, rec.kind, factionKeywordSets))) continue
    for (const u of rosterUnits) {
      if (u.id !== rec.ref.unit || u.uid === entryUid) continue
      const at = rec.name.indexOf(': ')
      out.push({
        sid: rec.sid,
        source: u.name || u.id,       // the entry the aura radiates from, as the list names it
        sourceUid: u.uid,
        unit: rec.ref.unit,           // …and its datasheet, for the caller's RU name lookup
        name: at === -1 ? rec.name : rec.name.slice(at + 2),
      })
    }
  }
  return out
}

export function resolveModifierEntries(records, facEn, detachmentNames, enhancementName, alleg) {
  if (!facEn || !records?.length) return []
  const fielded = new Set((detachmentNames || [])
    .map((d) => detKey(typeof d === 'string' ? d : d?.name))
    .filter(Boolean))
  const out = []
  for (const rec of records) {
    if (!rec.ref) continue
    // Datasheet abilities and wargear rules are resolved by datasheetEntriesFor() above — they hang off a unit, not
    // off a rule this function can look up in the faction bundle.
    if (rec.ref.kind === 'ability' || rec.ref.kind === 'wargear') continue
    if (rec.ref.kind === 'allegiance') {
      // Applies only to the unit that made this exact choice. `alleg` is `{ g, opt }` — the
      // datasheet's allegiance group and what this entry picked (rosterEngine's allegFor/entry).
      // No body: the ability's prose addresses its own model, so there are no scopes to read.
      if (alleg?.g === rec.ref.g && alleg?.opt === rec.ref.opt) out.push({ ...rec, body: '' })
      continue
    }
    // A stratagem belongs to a detachment the same way its rules do, so it is fielded or it is not;
    // WHICH unit it was spent on is the player's to say, not this layer's to infer, so there are no
    // scopes to read and no keyword gate (SCOPELESS).
    if (rec.ref.kind === 'stratagem') {
      const det = (facEn.detachments || []).find((d) => d.id === rec.ref.det)
      if (!det || !fielded.has(detKey(det.name))) continue
      // …and WHEN it may be used, from the stratagem's own English timing line, so the chip can
      // refuse a stratagem in a phase the game does not allow it in (rosterGameContext's
      // stratagemsFor). Read here because this is the one place that has both the record and the
      // faction data it came from; `facEn` is always the English bundle, which is what phasesOf
      // must be given.
      const st = (det.stratagems || []).find((x) => enhKey(x.name) === enhKey(rec.ref.name || rec.name))
      const slot = st?.when ? { phases: phasesOf(st.when), sides: phaseSidesOf(st.when) } : null
      out.push({ ...rec, body: '', slot })
      continue
    }
    if (rec.ref.kind === 'armyRule') {
      // appdata gives a faction SEVERAL army rules (Space Marines have three); we model one, and
      // `ref: {kind:'armyRule'}` can only point at that one. A record written against a rule we do
      // not model separately would silently read the wrong prose — T'au's `Drones` reading the body
      // of `For the Greater Good` — and gate its effects on that rule's targets. So the names have
      // to answer to each other: either is allowed to contain the other, because our own names are
      // sometimes a deliberate merge (`Synapse & Shadow in the Warp` covers a record named
      // `Synapse`), but two unrelated names drop the record rather than mis-resolve it.
      if (facEn.armyRule?.body && armyRuleMatches(rec.name, facEn.armyRule.name)) {
        out.push({ ...rec, body: facEn.armyRule.body })
      }
      continue
    }
    const det = (facEn.detachments || []).find((d) => d.id === rec.ref.det)
    if (!det || !fielded.has(detKey(det.name))) continue
    if (rec.ref.kind === 'detachmentRule') {
      if (det.rule?.body) out.push({ ...rec, body: det.rule.body })
    } else if (rec.ref.kind === 'enhancement') {
      if (!enhancementName || enhKey(rec.name) !== enhKey(enhancementName)) continue
      const found = det.enhancements?.find((x) => enhKey(x.name) === enhKey(rec.name))
      if (found?.body) out.push({ ...rec, body: found.body })
    }
  }
  return out
}

