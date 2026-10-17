// The rows that hang under a unit in every list without being an entry of it: who comes WITH the
// unit (`crew` — Sir Hekhtur under Canis Rex, owner 2026-10-04) and who its abilities bring into the
// game (`spawns` — Ripper Swarms under a Parasite of Mortrex, a player's report 2026-10-17). Both
// come from the roster data (gen-roster-data), neither costs points or configures, and a tap opens
// the sheet's printed card. The editor's list and the view's (a game's too) draw the same rows.

/**
 * @param {{ crew?: Array<{ id: string, name: string }>, spawns?: Array<{ id: string, name: string, rule: string }> } | null | undefined} def
 * @returns {Array<{ id: string, name: string, kind: 'crew' | 'spawn', rule?: string }>}
 */
export function companionRows(def) {
  return [
    ...(def?.crew || []).map((c) => ({ ...c, kind: /** @type {const} */ ('crew') })),
    ...(def?.spawns || []).map((s) => ({ ...s, kind: /** @type {const} */ ('spawn') })),
  ]
}
