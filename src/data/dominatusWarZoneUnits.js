// Which units' cards a Location's war zone rule belongs on, read by hand (owner, 2026-11-05: a rule
// of the campaign that bears on a unit is marked on its card). Text only: the app applies none of
// these, the card says so.
//
//   all     — every unit (it says "a unit" and holds for the unit's own numbers or keywords);
//   kws     — a unit with any of these keywords (a roster unit's `kws`, compared without case; the
//             deck's FLYING is the `Fly` the roster data prints);
//   warlord — the army's Warlord;
//   none    — not on a card, and why: the rule is about the table, a move any unit may make, or a
//             stratagem, and repeating it on every unit of the list would say nothing.
//
// dominatusWarZoneUnits.test.js holds every rule of the deck to one entry.

/** @type {Record<string, { all?: true, kws?: string[], warlord?: true, none?: string }>} */
export const warZoneUnits = {
  // The Mannheim Gap
  'Canyon Walls': { none: 'the battlefield edges and where an ingress move may end' },
  'Rock Falls': { none: 'any move ended near a canyon wall, a matter of the table' },
  // Volcanus Archipelago
  'Landing Craft': { none: 'a choice among the units in reserves, not a unit\'s own rule' },
  'Rapid Reinforcements': { none: 'the price of a stratagem' },
  // The Morpheon Line
  'Defence Networks': { all: true },
  'Foxholes': { kws: ['Infantry'] },
  // Cerbera Base
  'Shrouding Smoke': { all: true },
  'Ash Clouds': { kws: ['Aircraft', 'Fly'] },
  // Victorinius Spaceport
  'Surgical Insertion': { none: 'a choice among the units in reserves, not a unit\'s own rule' },
  // Blackfire Death Pits
  'Treacherous Terrain': { none: 'a hazard roll for any unit, and the charge roll by the target\'s terrain' },
  'Veteran Fighters': { kws: ['Battleline'] },
  // Eyes of the Emperor Observatory
  'Second Wave': { none: 'adds units to the army, once per battle' },
  'Orbital Lance Bombardment': { none: 'a random objective at the end of the round' },
  // Titangrave
  'Vermillion Sanction': { none: 'the number of Upgrades in a battle, counted at upgradeLimit' },
  'Shielded Mek Shops': { none: 'any unit set up near an objective, a matter of the table' },
  'Titan Clash': { kws: ['Monster', 'Vehicle', 'Titanic'] },
  // Hive Acheron Subsprawl
  'Tunnel Fighters': { kws: ['Infantry'] },
  'One Shall Stand, One Shall Fall': { none: 'the price of a stratagem' },
  'Lead from the Front': { warlord: true },
}
