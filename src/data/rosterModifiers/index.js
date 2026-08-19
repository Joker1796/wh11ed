// Lazy per-faction access to the numeric modifier layer (Tier C — see
// ROSTER-MODIFIERS-PROGRESS.md). Same code-splitting discipline as data/roster/index.js and
// data/datasheets/index.js: one chunk per faction, fetched only when a roster's unit card is
// actually opened, never statically imported into anything the light entry chunk can reach.
//
// This whole directory is DETACHABLE by design. Every file in it is generated skeletons plus
// hand-read effects; nothing else in the app writes here, and nothing here is written into the
// hand-authored faction files. Delete the directory and `loadRosterModifiers` resolves to null
// for every faction, which the overlay treats as "no numeric modifiers" — the card falls back to
// Tiers A+B, attributed prose with printed numbers, and stays correct.
const loaders = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'], { import: 'default' })

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

// The records that are actually usable: reviewed by a human AND carrying at least one effect.
// An unreviewed skeleton is bookkeeping — it means "somebody still has to read this rule" — and
// must never reach a reader as though it were a finished answer.
export function usableEntries(data) {
  return (data?.entries || []).filter((e) => e.reviewed && e.effects?.length)
}
