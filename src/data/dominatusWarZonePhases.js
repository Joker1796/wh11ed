// When each Location's war zone rule bites, read by hand — for the tracker's phase reminder
// (usePhaseRules). Owner, 2026-11-04: of the 19 rules only three name a phase in their words
// (Landing Craft, Surgical Insertion, Second Wave); the rest fire on an action — an ingress move, a
// charge declared, a ranged attack, the end of the round — or hold the whole battle, and the
// reminder, which read the phase from the text (phaseEntryOf), never showed them.
//
// The shape is phaseEntryOf's, so the reminder reads both the same way:
//   p  — the phases it bites in (BATTLE_PHASES);
//   s  — whose turn, per phase: 'own' (the side on turn), 'opp' (the side not on turn), 'both';
//   m  — 'start' / 'end' of a phase, where the rule fires there (absent = during the phase).
// Or `at: 'round-end'` — the end of the battle round (the turn that closes it, as a Dominatus
// Agenda's moment); or `none` with why there is no phase to show it in.
//
// A rule "binds both sides" (their words say "a player", "each player", "a unit"): `s` names the
// turn the trigger happens in, and both players' reminders read it there.
//
// dominatusWarZonePhases.test.js holds every rule of the deck to one entry, and an entry to the
// phases the rule's own words name where phaseEntryOf reads any.

/** @type {Record<string, { p?: string[], s?: Record<string, string>, m?: Record<string, string>, at?: 'round-end', none?: string }>} */
export const warZonePhases = {
  // The Mannheim Gap
  'Canyon Walls': { p: ['movement'], s: { movement: 'both' }, m: { movement: 'end' } }, // an ingress move: Reinforcements, and Rapid Ingress in the other turn
  'Rock Falls': { p: ['movement', 'charge'], s: { movement: 'own', charge: 'own' } }, // a move ended, not pile-in or consolidation
  // Volcanus Archipelago
  'Landing Craft': { p: ['movement'], s: { movement: 'both' } },
  'Rapid Reinforcements': { p: ['movement'], s: { movement: 'opp' }, m: { movement: 'end' } }, // Rapid Ingress: the end of the opponent's Movement phase
  // The Morpheon Line
  'Defence Networks': { p: ['shooting'], s: { shooting: 'both' } }, // ranged attacks
  'Foxholes': { p: ['movement'], s: { movement: 'own' } }, // remains stationary
  // Cerbera Base
  'Shrouding Smoke': { p: ['shooting'], s: { shooting: 'both' } }, // visibility: whom a unit can shoot
  'Ash Clouds': { p: ['movement'], s: { movement: 'both' } }, // an AIRCRAFT's ingress, a flight taken to the skies
  // Victorinius Spaceport
  'Surgical Insertion': { p: ['movement'], s: { movement: 'both' } },
  // Blackfire Death Pits
  'Treacherous Terrain': { p: ['movement', 'charge'], s: { movement: 'own', charge: 'own' } }, // stationary or advance; a charge declared
  'Veteran Fighters': { p: ['shooting'], s: { shooting: 'own' } }, // an action starts in the Shooting phase
  // Eyes of the Emperor Observatory
  'Second Wave': { p: ['command'], s: { command: 'both' }, m: { command: 'start' } },
  'Orbital Lance Bombardment': { at: 'round-end' },
  // Titangrave
  'Vermillion Sanction': { none: 'the Upgrades are chosen before the battle (pre-battle step 7), where the setup reads the fourth' },
  'Shielded Mek Shops': { p: ['movement'], s: { movement: 'both' } }, // set up by a move type: ingress, disembarking
  'Titan Clash': { p: ['shooting', 'fight'], s: { shooting: 'own', fight: 'both' } }, // the attacker's hit and wound rolls
  // Hive Acheron Subsprawl
  'Tunnel Fighters': { p: ['charge'], s: { charge: 'own' } }, // the charge after an ingress; the units are picked at Declare Battle Formations
  'One Shall Stand, One Shall Fall': { p: ['fight'], s: { fight: 'both' } }, // Epic Challenge
  'Lead from the Front': { p: ['command'], s: { command: 'own' } }, // battle-shock rolls
}
