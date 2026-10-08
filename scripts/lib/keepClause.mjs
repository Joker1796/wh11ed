// "(that model's boltgun cannot be replaced)" — the item a model keeps LOCKED: it still carries it,
// and no other group may take it (rosterEngine's stock rule, `keep`). One reading for both roster
// readers: the appdata generator learnt it 2026-09-24, the Faction Pack reader did not, and three
// Legends sheets let a cyclone Terminator trade the storm bolter he was told to keep (a player's
// report, 2026-10-08). "This weapon cannot be replaced" names no item the model started with and
// is left alone. Each match's group 1 is the item phrase.
export const KEEP_RE = /\b(?:that|this|these)\s+models?(?:'s|’s|s'|s’|'|’)\s+((?:\d+\s+)?[a-z][a-z0-9' ’‐‑–,-]*?)\s+cannot be replaced/gi
