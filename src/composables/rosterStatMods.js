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
  // An enhancement modifies its own bearer, an allegiance choice its own chooser, and a datasheet
  // ability is printed on the very card it addresses (or on the card of the unit it is attached
  // to, resolved by `target` before we ever get here) — none has prose aimed at some other unit,
  // so there is nothing to gate on.
  if (kind === 'enhancement' || kind === 'allegiance' || kind === 'ability') return true
  if (!scopes?.length) return true // ungated prose — the rule itself was already shown to this unit
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
const SCOPELESS = new Set(['enhancement', 'allegiance', 'ability'])

function noteOf(entry, effect, applied, via = null) {
  return {
    source: entry.name,
    det: entry.det,
    kind: entry.kind,
    // Only a datasheet ability has these: the unit whose card the ability is printed on, and which
    // direction it reached this card from (self / led / leader — abilityEntriesFor). Together with
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
  }
}

// Does the game say every condition on this effect holds? An effect with no `cond` at all is
// unreviewed markup, and is treated as unproven — never as unconditional.
function condHolds(cond, active) {
  return Array.isArray(cond) && cond.length > 0 && cond.every((id) => active?.has(id))
}

// entries: [{ name, det, kind, body, effects }] — records the caller resolved to their prose.
// Returns the sheet to render (a copy when anything changed, the same object when not), the
// notes to print under it, the set of cells that were rewritten, keyed
// `profile:<stat>:<profileIndex>` / `<ranged|melee>:<stat>:<rowIndex>` for the card to mark, and
// the keywords granted to the unit (which the caller must fold into `keywords` and re-run — see
// grantedKeywordsFrom).
export function applyStatMods(sheet, entries, keywords, factionKeywordSets, active = null) {
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
    const scopes = SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body)
    const effects = entry.effects || []

    // "…add 2 to the Attacks characteristic INSTEAD." An alternate names the effect it replaces
    // (`alt`, an index into this record's own effects); while it is in force the one it replaces
    // is skipped entirely, so the two can never stack into +3. Its note carries the "instead"
    // wording, which is what explains the missing base line.
    const replaced = new Set()
    for (const eff of effects) {
      if (eff.alt == null) continue
      if (!effectApplies(eff, scopes, keywords, entry.kind, factionKeywordSets)) continue
      if (eff.when && !condHolds(eff.cond, active)) continue
      replaced.add(eff.alt)
    }

    for (const [index, effect] of effects.entries()) {
      if (replaced.has(index)) continue
      if (!effectApplies(effect, scopes, keywords, entry.kind, factionKeywordSets)) continue

      // Conditional and unproven: never touch the number, just say what would change and when.
      const live = effect.when ? condHolds(effect.cond, active) : false
      if (effect.when && !live) {
        notes.push(noteOf(entry, effect, false))
        continue
      }
      const via = live ? effect.cond : null

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
export function grantedKeywordsFrom(entries, keywords, factionKeywordSets, active = null) {
  const out = []
  for (const entry of entries || []) {
    const scopes = SCOPELESS.has(entry.kind) ? null : ruleScopes(entry.body)
    for (const effect of entry.effects || []) {
      if (effect.op !== 'grant' || effect.stat !== 'keyword') continue
      if (effect.when && !condHolds(effect.cond, active)) continue
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
// Datasheet abilities that bear on ONE roster entry. Three directions, and which one a record
// takes is stated by its effect's `target`:
//   self    (the default) the ability is printed on this unit's own card
//   led     it is printed on an attached LEADER's card and addresses the unit being led
//           ("…add 1 to the Strength characteristic of melee weapons equipped by Bodyguard models
//           in that unit" — Fabius Bile's Enhanced Warriors)
//   leader  it is printed on the BODYGUARD unit's card and addresses the Character leading it
//           ("while a CHARACTER model is leading this unit, that model has Feel No Pain 4+")
// The two cross directions are why this is a separate resolver: every other record in this layer
// rewrites the card it was found on, and an ability is the first thing that can rewrite another.
//
// `ctx.leaderUnitIds` are the datasheet ids attached TO this entry, `ctx.ledUnitId` the datasheet
// id of the unit this entry leads. Both come from the roster, which records the attachment — there
// is nothing to infer and nothing to ask the player.
export function abilityEntriesFor(records, { unitId, leaderUnitIds = [], ledUnitId = null } = {}) {
  const out = []
  for (const rec of records || []) {
    if (rec.kind !== 'ability' || rec.ref?.kind !== 'ability') continue
    const of = (t) => (rec.effects || []).filter((e) => (e.target || 'self') === t)
    // A record's name is "<unit>: <ability>". Split rather than reformat: the card labels an
    // effect by WHERE it came from ("LEADER · Fabius Bile") and names the rule separately, so
    // both halves have to travel apart.
    const at = rec.name.indexOf(': ')
    const owner = at === -1 ? null : rec.name.slice(0, at)
    const name = at === -1 ? rec.name : rec.name.slice(at + 2)
    const push = (effects, from) => { if (effects.length) out.push({ ...rec, body: '', effects, name, owner, from }) }
    if (rec.ref.unit === unitId) push(of('self'), 'self')
    if (leaderUnitIds.includes(rec.ref.unit)) push(of('led'), 'led')
    if (ledUnitId && rec.ref.unit === ledUnitId) push(of('leader'), 'leader')
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
    // Datasheet abilities are resolved by abilityEntriesFor() above — they hang off a unit, not
    // off a rule this function can look up in the faction bundle.
    if (rec.ref.kind === 'ability') continue
    if (rec.ref.kind === 'allegiance') {
      // Applies only to the unit that made this exact choice. `alleg` is `{ g, opt }` — the
      // datasheet's allegiance group and what this entry picked (rosterEngine's allegFor/entry).
      // No body: the ability's prose addresses its own model, so there are no scopes to read.
      if (alleg?.g === rec.ref.g && alleg?.opt === rec.ref.opt) out.push({ ...rec, body: '' })
      continue
    }
    if (rec.ref.kind === 'armyRule') {
      if (facEn.armyRule?.body) out.push({ ...rec, body: facEn.armyRule.body })
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

