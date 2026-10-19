// Base sizes — what a datasheet stands on, and where that comes from (owner, 2026-10-19, after a
// player's "Blue and Brimstone Horrors are on 25mm").
//
// The source is wh40k-appdata's `datasheet.baseSize`, taken as it is: one size for the unit, or a
// "<model>: <size>" line per model where GW gives them (Sisters Novitiate, Skitarii Rangers…). A
// datasheet carries it in its own `baseSize` (lines kept, labels kept — "25mm / 60x35.5mm" with
// the names stripped said nothing about which model stands on which). What appdata does NOT say,
// we do not say either: until 2026-10-19 the July back-fill handed a unit's one size to every
// profile in it, and Pink Horrors' Blue and Brimstone Horrors were printed on 32mm.
//
// Three lists below, and `npm run bases` (scripts/check-bases.mjs) holds each of them to appdata:
//
// MODEL_BASES — a model of a unit that stands on another base than the unit's one size, printed
// on its profile. Each names its evidence: an appdata datasheet of that very model with that
// size. The gate fails when the evidence goes, when the size moves, or when GW starts giving the
// unit per-model sizes itself (then appdata says it and the entry is redundant).
//
// SAME_AS_UNIT — a model the scan finds on another base elsewhere that stands on the unit's base
// here, with why. Every case the scan finds must be in one list or the other, so an appdata
// update that brings a new one is decided by a person once, not printed silently.
//
// GUIDE_ONLY — datasheets appdata gives no size for, whose size we print from the Event
// Companion's Base Size Guide. Stale the day appdata gives one.

export const MODEL_BASES = [
  // The models a Pink Horror splits into. GW's Blue Horrors datasheet is these two models, on
  // 25mm; the Pink Horrors datasheet gives one size, its Pink Horrors' 32mm.
  { sheet: 'Pink Horrors', model: 'Blue Horror', size: '25mm', from: 'Blue Horrors' },
  { sheet: 'Pink Horrors', model: 'Brimstone Horror', size: '25mm', from: 'Blue Horrors' },
]

export const SAME_AS_UNIT = [
  { sheet: 'Blue Horrors', model: 'Blue Horror', why: 'the unit itself is these models on 25mm; 32mm is the Pink Horrors unit' },
  { sheet: 'Blue Horrors', model: 'Brimstone Horror', why: 'the unit itself is these models on 25mm; 32mm is the Pink Horrors unit' },
  { sheet: 'Beast Snagga Boyz', model: 'Nob', why: 'the squad’s leader on the squad’s base; 40mm is the Nobz unit' },
  { sheet: 'Kommandos', model: 'Nob', why: 'the squad’s leader on the squad’s base; 40mm is the Nobz unit' },
  { sheet: 'Stormboyz', model: 'Nob', why: 'the squad’s leader on the squad’s base; 40mm is the Nobz unit' },
  { sheet: 'Strike Squad', model: 'Justicar', why: 'a power-armoured Justicar; 40mm is the Terminator one' },
  { sheet: "Crowe's Sanctifiers Strike Squad", model: 'Justicar', why: 'a power-armoured Justicar; 40mm is the Terminator one' },
  { sheet: 'Brotherhood Terminator Squad', model: 'Justicar', why: 'a Terminator Justicar; 32mm is the power-armoured one' },
  { sheet: 'Paladin Squad', model: 'Paragon', why: 'a Terminator Paragon; 50mm is the Paragon Warsuit' },
  { sheet: 'Paragon Warsuits', model: 'Paragon', why: 'a Paragon Warsuit; 40mm is the Terminator Paragon' },
]

export const GUIDE_ONLY = [
  'Centaur RSV', // Hull — Event Companion, Base Size Guide (Astra Militarum)
]

// appdata's raw value as a datasheet stores it: its lines trimmed and an oval written the way
// this repo always has ("170x109mm", appdata "170 x 109mm", now and then "92 mm") — the names and the lines kept.
export function baseOf(raw) {
  return String(raw || '').split('\n').map((l) => l.trim().replace(/(\d)\s*x\s*(\d)/g, '$1x$2').replace(/(\d)\s+mm/g, '$1mm')).filter(Boolean).join('\n')
}
