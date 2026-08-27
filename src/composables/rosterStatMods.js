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
// `only.notName` is the same match, inverted, and a LIST — because the wording that needs it is a
// list: "weapons equipped by models in this unit (excluding blast pistols, blasters and dark
// lances)". One name at a time could not say that, so the Drukhari rule granting it was applied to
// every weapon on the card, including the three the rule names to leave out.
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
  if (only.notName?.some((n) => norm(row?.name).startsWith(norm(n)))) return false
  return true
}

// Does the statement this effect was read from bear on this unit? `scope` is an index into
// ruleScopes(); a null scope means the effect belongs to the rule as a whole, so any statement
// matching is enough. An enhancement has no scope at all — the caller only passes it for the
// unit carrying it.
function effectApplies(effect, scopes, keywords, kind, factionKeywordSets, strict = false) {
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
  // …except when the gate is an AURA's and the rule behind it is the DETACHMENT's. That escape
  // trades a too-narrow gate for a too-wide one, which is the right trade for a rule printed on one
  // card and the wrong one for a rule that addresses the whole army: Questor Forgepact's aura names
  // ADEPTUS MECHANICUS, a faction whose datasheets this list cannot field at all, and failing open
  // there would hand every Knight a buff meant for allies that are not in the game. Reaching nobody
  // is the honest answer.
  if (!strict && factionKeywordSets?.length && !factionKeywordSets.some((kws) => scopes.some(hits(kws)))) return true
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

// The number inside a weapon ability: "RAPID FIRE 2" → 2. Abilities that carry one always print it
// last; one that carries none ("TWIN-LINKED") returns null and is left alone rather than guessed at.
const TAGGED = /^(.*?)\s+(-?\d+)$/
export function bumpTag(tag, name, delta) {
  const m = TAGGED.exec(String(tag).trim())
  if (!m) return null
  if (norm(m[1]) !== norm(name)) return null
  return `${m[1]} ${Number(m[2]) + Number(delta)}`
}

// Just the two fields an `only` clause reads, copied off the working sheet so a later write to it
// cannot change what an earlier clause of the same record was looking at.
const ROW_TABLES = ['ranged', 'melee', 'profiles']
function snapshotRows(sheet) {
  const out = {}
  for (const t of ROW_TABLES) {
    if (sheet[t]) out[t] = sheet[t].map((r) => ({ name: r.name, tags: r.tags ? [...r.tags] : r.tags }))
  }
  return out
}

// A grant is an effect whose "value" is a name rather than a number: `stat: 'keyword'` gives the
// unit a keyword (which can then make OTHER rules apply to it — Necrons' Destroyer Ankh grants
// DESTROYER CULT, and Cold Fervour's first bullet gives every DESTROYER CULT model +2 Strength),
// `stat: 'core'` gives the UNIT one of the rulebook's core abilities (Feel No Pain 5+, Stealth,
// Lone Operative); `stat: 'ability'` gives its weapons a bracketed ability. Modelled as an effect rather than a
// second system so `when`, `scope` and the whole applicability machinery are shared.
const isGrant = (effect) => effect.op === 'grant'

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

// `unit-leading` is the one condition a RECORD can prove by itself: an effect that arrived on this
// card `from: 'led'` is here only because a Leader carrying it is attached to this unit, so asking
// the roster again — against the bodyguard entry, which leads nobody — would answer no and gate off
// a rule that plainly applies. Everything else is answered by `active` alone.
const proven = (id, active, entry) => !!active?.has(id) || (id === 'unit-leading' && entry?.from === 'led')

// Does the game say every condition on this effect holds? An effect with no `cond` at all is
// unreviewed markup, and is treated as unproven — never as unconditional.
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
const byChoice = (entry) => entry.kind === 'stratagem' || !!entry.ref?.set
function effectLive(entry, effect, active, chosen) {
  if (byChoice(entry) && !chosen?.has(entry.sid)) return false
  if (effect.cond?.length) return condHolds(effect.cond, active, entry)
  return byChoice(entry)
}

// entries: [{ name, det, kind, body, effects }] — records the caller resolved to their prose.
// Returns the sheet to render (a copy when anything changed, the same object when not), the
// notes to print under it, the set of cells that were rewritten, keyed
// `profile:<stat>:<profileIndex>` / `<ranged|melee>:<stat>:<rowIndex>` for the card to mark, and
// the keywords granted to the unit (which the caller must fold into `keywords` and re-run — see
// grantedKeywordsFrom).
export function applyStatMods(sheet, entries, keywords, factionKeywordSets, active = null, chosen = null) {
  if (!sheet || !entries?.length) return { sheet, notes: [], marks: [], keywords: [], core: [] }

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
      if (sheet.profiles) out.profiles = sheet.profiles.map((p) => ({ ...p }))
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
    const gated = (eff) => !!eff.when || byChoice(entry)
    const replaced = new Set()
    for (const eff of effects) {
      if (eff.alt == null) continue
      if (!effectApplies(eff, scopes, keywords, entry.kind, factionKeywordSets, strict)) continue
      if (gated(eff) && !effectLive(entry, eff, active, chosen)) continue
      replaced.add(eff.alt)
    }

    for (const [index, effect] of effects.entries()) {
      if (replaced.has(index)) continue
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
        for (const table of WEAPON_TABLES[effect.on] || []) {
          const rows = current()[table] || []
          for (let i = 0; i < rows.length; i++) {
            if (!rowMatchesOnly(asFound[table][i], effect.only)) continue
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

      // The other half of "…or, if that attack already HAS [RAPID FIRE], +1 to the value of that
      // [RAPID FIRE]". `value` carries the ability's name and the amount to add ("RAPID FIRE 1" =
      // +1 to RAPID FIRE) — the same shape the grant above uses, because the two halves of such a
      // rule are authored as a pair and read side by side in the data. Gate the row with
      // `only.tag`, exactly as the grant half gates itself with `only.notTag`.
      if (effect.stat === 'ability' && effect.op === 'add') {
        const at = TAGGED.exec(String(effect.value).trim())
        let bumped = false
        if (at) {
          for (const table of WEAPON_TABLES[effect.on] || []) {
            const rows = current()[table] || []
            for (let i = 0; i < rows.length; i++) {
              if (!rowMatchesOnly(asFound[table][i], effect.only)) continue
              const tags = current()[table][i].tags || []
              const next = tags.map((t) => bumpTag(t, at[1], at[2]) ?? t)
              if (next.every((t, k) => t === tags[k])) continue
              target()[table][i].tags = next
              marks.add(`${table}:tags:${i}`)
              bumped = true
            }
          }
        }
        notes.push(noteOf(entry, effect, bumped, via))
        continue
      }

      const tables = effect.on === 'profile' ? ['profiles'] : (WEAPON_TABLES[effect.on] || [])
      const markPrefix = (t) => (t === 'profiles' ? 'profile' : t)

      let changed = false
      for (const table of tables) {
        const rows = current()[table] || []
        for (let i = 0; i < rows.length; i++) {
          // `only` never applies to a model profile — it names weapons.
          if (table !== 'profiles' && !rowMatchesOnly(asFound[table][i], effect.only)) continue
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

  return { sheet: out || sheet, notes, marks: [...marks], keywords: granted, core }
}

// The keywords these records grant this unit, WITHOUT applying anything else. Callers need them
// before gating any rule, because a granted keyword decides which rules bear on the unit at all;
// running the full apply pass first would gate on the un-granted keyword set. A conditional grant
// counts only when `active` proves it — the same test the numbers get, so the keyword layer and
// the number layer can never disagree about whether a rule is on.
export function grantedKeywordsFrom(entries, keywords, factionKeywordSets, active = null, chosen = null) {
  const out = []
  for (const entry of entries || []) {
    const scopes = entry.scopes || (SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body))
    for (const effect of entry.effects || []) {
      if (effect.op !== 'grant' || effect.stat !== 'keyword') continue
      if ((effect.when || byChoice(entry)) && !effectLive(entry, effect, active, chosen)) continue
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
export function gateStratagems(entries, keywords, factionKeywordSets) {
  return (entries || []).filter((e) => (
    e.kind !== 'stratagem' ||
    effectApplies({}, e.targetScopes, keywords, e.kind, factionKeywordSets)
  ))
}

// The keywords of the OTHER halves of this entry's attached unit — the bodyguard it joined, plus
// anything else attached to that bodyguard (a unit can hold a Leader and a Support at once). Empty
// for an entry standing on its own, which is what makes this safe to add to any keyword set.
//
// `keywordsOf(unitId)` is the caller's lookup into the datasheets it has already loaded; the
// attachment itself is read from the roster, which records it, so nothing here is inferred.
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

export function datasheetEntriesFor(records, { unitId, leaderUnitIds = [], ledUnitId = null, itemNames = null, leaderItemNames = null, leaderEnhNames = null, auraOn = null, detIds = null } = {}) {
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
      // 19.04, on the leader's own card: his "models in that unit" reaches him too — but only
      // once there IS a unit, which the roster answers and no player has to be asked.
      if (ledUnitId) push(of('unit'), 'self')
      // 22.01: "while a model with an aura ability is on the battlefield, it is always within
      // range of its own aura ability" — so the bearer's own unit needs no switch and no range.
      pushAura('self')
    }
    if (leaderUnitIds.includes(rec.ref.unit)) {
      push(of('led'), 'led')
      push(of('unit'), 'led')
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
  keywords = [], factionKeywordSets = null, active = null, chosen = null, leaderEnhNames = null,
  detIds = null,
} = {}) {
  const out = []
  const automatic = new Set([unitId, ...leaderUnitIds, ledUnitId].filter(Boolean))
  // An aura whose own rule is not running changes nothing if marked: the Triumph's Fiery Heart
  // does nothing until it is one of the two relics picked this round. Offering the chip anyway is
  // offering a switch that moves no number, which is exactly what this layer refuses to do
  // elsewhere (switchesFor's `answerable`).
  const proven = (rec, e) => (!rec.ref?.set || chosen?.has(rec.sid))
    && (!e.cond?.length || e.cond.every((id) => active?.has(id)))
  for (const rec of records || []) {
    if (rec.ref?.kind !== 'ability' && rec.ref?.kind !== 'wargear'
      && rec.ref?.kind !== 'enhancement' && rec.ref?.kind !== 'detachmentRule') continue
    const reaching = (rec.effects || []).filter((e) => e.target === 'aura' && proven(rec, e))
    if (!reaching.length) continue
    // A DETACHMENT RULE's aura has no source ENTRY: the models carrying it are named by keyword, and
    // the player is judging the 6" anyway. So the chip says where the rule comes from — the
    // detachment — and is offered once, to every unit the reach clause names, provided that
    // detachment is on the table. No `detIds`, no chip: a rule from a detachment this army is not
    // playing must never offer a switch.
    if (rec.ref.kind === 'detachmentRule') {
      if (!detIds?.has(rec.ref.det)) continue
      if (!reaching.some((e) => effectApplies(e, rec.ref.scopes, keywords, rec.kind, factionKeywordSets, true))) continue
      out.push({ sid: rec.sid, source: rec.det, sourceUid: null, unit: null, name: rec.name, det: rec.ref.det })
      continue
    }
    // An ENHANCEMENT aura radiates from an ENTRY, not from a datasheet: which model wears the relic
    // is the roster's answer, so the source is found by the enhancement's name and the two certain
    // cases (the bearer itself, and the unit the bearer is attached to) are skipped by entry rather
    // than by unit id.
    if (rec.ref.kind === 'enhancement') {
      if (leaderEnhNames?.has(rec.name)) continue
      if (!reaching.some((e) => effectApplies(e, rec.ref.scopes, keywords, rec.kind, factionKeywordSets))) continue
      for (const u of rosterUnits) {
        if (!u.enh || enhKey(u.enh) !== enhKey(rec.name) || u.uid === entryUid) continue
        out.push({ sid: rec.sid, source: u.name || u.id, sourceUid: u.uid, unit: u.id, name: rec.name })
      }
      continue
    }
    if (automatic.has(rec.ref.unit)) continue
    // The same fail-open escapes the apply pass uses, so a chip is offered exactly when the
    // modifier behind it would land.
    if (!reaching.some((e) => effectApplies(e, rec.ref.scopes, keywords, rec.kind, factionKeywordSets))) continue
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
    // A stratagem belongs to a detachment the same way its rules do, so it is fielded or it is not.
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
      // …and WHO it may be spent on, from the same line the player reads before spending it:
      // "TARGET: One DAMNED unit from your army…". Kept apart from `scopes` — which gates an
      // EFFECT against the card it is being applied to — because this gates the stratagem itself
      // against the unit it would be USED on, and the two are judged with different keyword sets
      // (see gateStratagems). Ungated when the target names nobody of yours, which is every
      // stratagem aimed at an enemy unit.
      const targetScopes = st?.target ? ruleScopes(st.target) : null
      out.push({ ...rec, body: '', slot, targetScopes })
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
      // Its AURA effects are not facts about the army the way the rest of the rule is — they reach
      // whoever is standing near a model that carries it, which only the player can say. They leave
      // through the chip (datasheetEntriesFor's `auraOn`); what stays here is the rest of the rule,
      // gated as every detachment rule is, by the scopes read off its own body.
      const own = (rec.effects || []).filter((e) => e.target !== 'aura')
      if (det.rule?.body && (own.length || !(rec.effects || []).length)) out.push({ ...rec, body: det.rule.body, effects: own })
    } else if (rec.ref.kind === 'enhancement') {
      if (!enhancementName || enhKey(rec.name) !== enhKey(enhancementName)) continue
      const found = det.enhancements?.find((x) => enhKey(x.name) === enhKey(rec.name))
      if (!found?.body) continue
      // An enhancement AURA reaches whole units, so it is the one part of an enhancement that does
      // NOT simply address its bearer: it comes with the keyword gate its prose named (`ref.scopes`,
      // read by the generator), and the bearer collects it only if the bearer matches that gate —
      // 22.01 puts the model inside its own aura, it does not make a Captain part of the DEATH
      // COMPANY. Split so the rest of the enhancement stays ungated, as every enhancement is.
      const aura = (rec.effects || []).filter((e) => e.target === 'aura')
      const own = (rec.effects || []).filter((e) => e.target !== 'aura')
      if (own.length || !aura.length) out.push({ ...rec, body: found.body, effects: own })
      if (aura.length) out.push({ ...rec, body: found.body, effects: aura, scopes: rec.ref.scopes || null, from: 'self' })
    }
  }
  return out
}

