// Lazy per-faction access to the numeric modifier layer (Tier C — see
// src/components/roster/CLAUDE.md). Same code-splitting discipline as data/roster/index.js and
// data/datasheets/index.js: one chunk per faction, fetched only when a roster's unit card is
// actually opened, never statically imported into anything the light entry chunk can reach.
//
// This whole directory is DETACHABLE by design. Every file in it is generated skeletons plus
// hand-read effects; nothing else in the app writes here, and nothing here is written into the
// hand-authored faction files. Delete the directory and `loadRosterModifiers` resolves to null
// for every faction, which the overlay treats as "no numeric modifiers" — the card falls back to
// Tiers A+B, attributed prose with printed numbers, and stays correct.
// conditions.js is the shared `cond` vocabulary and coreRules.js the rulebook's own modifiers —
// neither is a faction, so both are excluded and the glob keeps meaning "one entry per faction".
import { SM_CHAPTERS } from '../smChapters.js'
import { borrowedFrom, detachmentSources } from '../detachmentSources.js'

const loaders = import.meta.glob(['./*.js', '!./index.js', '!./conditions.js', '!./coreRules.js', '!./*.test.js'], { import: 'default' })

// One faction's records, or null when the faction has no file (or the layer was removed).
export async function loadRosterModifiers(slug) {
  const loader = loaders[`./${slug}.js`]
  if (!loader) return null
  try {
    return await loader()
  } catch {
    return null
  }
}

// The records a LIST of this faction reads: its own, then those of every file it borrows a
// detachment from (detachmentSources). A Chapter fields Codex: Space Marines units and detachments,
// so it reads every Space Marines record but the army rule — without them a Blood Angels list on
// Gladius Task Force had none of its detachment's modifiers, and its Terminator Assault Squads
// none of their Storm Shields (2026-10-01); the Chapter's file carries its own Combat Doctrines,
// and both would apply it twice. From any other file a list reads only the detachments it borrows
// (a Space Marines list on Deathwatch Support reads Mission Tactics, not the Deathwatch's army).
// Every record is still gated by unit, detachment and keyword downstream, so the rest cannot reach
// a card it does not bear on.
export async function loadRosterModifiersFor(slug) {
  const own = await loadRosterModifiers(slug)
  const entries = [...(own?.entries || [])]
  const seen = new Set(entries.map((e) => e.sid))
  for (const from of detachmentSources(slug).slice(1)) {
    const data = await loadRosterModifiers(from)
    if (!data) continue
    const lent = from === 'space-marines' && SM_CHAPTERS.has(slug) ? null : borrowedFrom(slug, from)
    for (const e of data.entries) {
      if (seen.has(e.sid) || e.kind === 'armyRule' || (lent && !lent.has(e.det))) continue
      seen.add(e.sid)
      entries.push(e)
    }
  }
  return entries.length === (own?.entries.length || 0) ? own : { ...(own || { slug }), entries }
}

// The records that are actually usable: reviewed by a human AND carrying at least one effect.
// An unreviewed skeleton is bookkeeping — it means "somebody still has to read this rule" — and
// must never reach a reader as though it were a finished answer.
export function usableEntries(data) {
  return (data?.entries || []).filter((e) => e.reviewed && e.effects?.length)
}

// An ABILITY SET's options, reviewed but not necessarily carrying a modifier: the player picks one
// (or two) each round and wants to see the whole set, so the ones that change no number are chips
// too. Kept apart from usableEntries() — nothing here is applied to a statline, and the apply pass
// must never see a record with no effects.
export function pickEntries(data) {
  return (data?.entries || []).filter((e) => e.reviewed && e.ref?.set)
}
