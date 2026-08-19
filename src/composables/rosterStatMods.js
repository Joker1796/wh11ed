// Apply the numeric modifier layer (Tier C) to a datasheet. Pure — no Vue, no data imports; the
// caller hands in the records it loaded and the rule prose they were read from.
//
// THE ONE RULE THIS FILE ENFORCES: a number is only ever rewritten when the modifier is
// UNCONDITIONAL. Anything with a `when` is annotated beside the printed value and the value is
// left alone. 40k modifiers are overwhelmingly conditional — a phase, a range, an aura, once per
// battle — and a card showing T6 when the +1 only applies while a Waaagh! is running is worse
// than a card showing T5 with a note. The same goes for a value this file cannot compute (a
// Damage of "D6+2" with "+1"): it degrades to an annotation rather than inventing arithmetic.
//
// Scope comes from ruleTargets.js, never from the record — see the generator's header for why.

import { ruleScopes, keywordsMatchTarget } from './ruleTargets.js'

// Which model profiles / weapon rows an effect addresses.
const WEAPON_TABLES = { ranged: ['ranged'], melee: ['melee'], weapon: ['ranged', 'melee'] }

// Does the statement this effect was read from bear on this unit? `scope` is an index into
// ruleScopes(); a null scope means the effect belongs to the rule as a whole, so any statement
// matching is enough. An enhancement has no scope at all — the caller only passes it for the
// unit carrying it.
function effectApplies(effect, scopes, keywords, kind) {
  if (kind === 'enhancement') return true
  if (!scopes?.length) return true // ungated prose — the rule itself was already shown to this unit
  const hits = (sc) => sc.targets.some((t) => keywordsMatchTarget(keywords, t))
    && !sc.excludes.some((x) => keywordsMatchTarget(keywords, x))
  if (effect.scope == null) return scopes.some(hits)
  const sc = scopes[effect.scope]
  return sc ? hits(sc) : false
}

// Arithmetic on a printed characteristic, or null when it can't be done honestly.
// Characteristics come in four printed shapes: a plain number ("5"), a distance ('6"'), a
// skill/save roll ("3+") and a dice expression ("D6+2"). Only the first three are computable.
export function applyValue(current, op, value) {
  const raw = String(current ?? '').trim()
  if (!raw) return null
  if (op === 'set') return String(value)

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

  const plain = raw.match(/^(\d+)$/)
  if (plain) {
    if (op !== 'add') return null
    return String(Math.max(0, Number(plain[1]) + Number(value)))
  }

  return null // "D6+2", "N/A", a range like "18-36" — annotate instead of guessing
}

function noteOf(entry, effect, applied) {
  return {
    source: entry.name,
    det: entry.det,
    kind: entry.kind,
    on: effect.on,
    stat: effect.stat,
    op: effect.op,
    value: effect.value,
    when: effect.when || null,
    applied,
  }
}

// entries: [{ name, det, kind, body, effects }] — records the caller resolved to their prose.
// Returns the sheet to render (a copy when anything changed, the same object when not), the
// notes to print under it, and the set of cells that were rewritten, keyed
// `profile:<stat>:<profileIndex>` / `<ranged|melee>:<stat>:<rowIndex>` for the card to mark.
export function applyStatMods(sheet, entries, keywords) {
  if (!sheet || !entries?.length) return { sheet, notes: [], marks: [] }

  let out = null // cloned lazily — an all-conditional unit must keep the original object identity
  const notes = []
  const marks = new Set()
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
    const scopes = entry.kind === 'enhancement' ? null : ruleScopes(entry.body)
    for (const effect of entry.effects || []) {
      if (!effectApplies(effect, scopes, keywords, entry.kind)) continue

      // Conditional: never touch the number, just say what would change and when.
      if (effect.when) {
        notes.push(noteOf(entry, effect, false))
        continue
      }

      const rows = effect.on === 'profile'
        ? (sheet.profiles || []).map((p, i) => ({ p, i, key: `profile:${effect.stat}:${i}` }))
        : (WEAPON_TABLES[effect.on] || []).flatMap((t) =>
          (sheet[t] || []).map((w, i) => ({ p: w, i, key: `${t}:${effect.stat}:${i}` })))

      let changed = false
      for (const row of rows) {
        const next = applyValue(row.p[effect.stat], effect.op, effect.value)
        if (next == null || next === String(row.p[effect.stat])) continue
        const dest = effect.on === 'profile'
          ? target().profiles[row.i]
          : target()[row.key.split(':')[0]][row.i]
        dest[effect.stat] = next
        marks.add(row.key)
        changed = true
      }
      // Nothing computable (every value was a dice expression, or the unit has no such row) —
      // report it as an annotation rather than dropping the modifier on the floor.
      notes.push(noteOf(entry, effect, changed))
    }
  }

  return { sheet: out || sheet, notes, marks: [...marks] }
}
