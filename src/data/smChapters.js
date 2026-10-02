// The five Space Marine Chapters with a Codex Supplement of their own. Each is its own faction slug
// here, draws the rest of its army from Codex: Space Marines (the datasheet fold, the Codex
// detachments) and, since app data 963, shares its army rule — Combat Doctrines — word for word.
// Kept in its own tiny module so the tracker, the roster and the stratagem page can all import it
// without pulling each other's bundles along.
export const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])

// Codex: Space Marines itself plus the five Chapters.
export const SM_FAMILY = new Set(['space-marines', ...SM_CHAPTERS])
