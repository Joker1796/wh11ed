// Lightweight Combat Patrol index — slug/name/boxName only, no rule text or datasheets. The
// counterpart to factionsIndex.js: router/index.js's drawer nav (combatPatrolGroups) and
// useSeoMeta.js's per-box meta title both only need these three fields, so they read this file
// instead of statically importing the full src/data/combatPatrol.js (detachment rules,
// stratagems, enhancements and every fixed-roster datasheet for all 24 factions). That full file
// is dynamically import()ed only by the two Combat Patrol views themselves, once a CP route is
// actually visited — keeping it out of the app's root bundle (router/index.js sits in the module
// graph of virtually every page). Kept in sync with combatPatrol.js by
// scripts/sync-combat-patrol.mjs's index-drift check.
export const combatPatrolIndex = [
  { slug: 'necrons', name: 'Necrons', boxName: "Amonhotekh's Guard" },
  { slug: 'space-marines', name: 'Space Marines', boxName: 'Assault Force' },
  { slug: 'orks', name: 'Orks', boxName: "'Ardmob" },
  { slug: 'tau-empire', name: "T'au Empire", boxName: 'Sudden Dawn Cadre' },
  { slug: 'astra-militarum', name: 'Astra Militarum', boxName: "Drayden's Lance" },
  { slug: 'adepta-sororitas', name: 'Adepta Sororitas', boxName: 'Sanctuary Guardians' },
  { slug: 'adeptus-custodes', name: 'Adeptus Custodes', boxName: "Tristraen's Gilded Blades" },
  { slug: 'adeptus-mechanicus', name: 'Adeptus Mechanicus', boxName: 'Purge Corps Deltic-9' },
  { slug: 'imperial-agents', name: 'Imperial Agents', boxName: "Inquisitor's Hand" },
  { slug: 'aeldari', name: 'Aeldari', boxName: "Kygharil's Protectors" },
  { slug: 'black-templars', name: 'Black Templars', boxName: 'Vow-Sworn of Vedrenn' },
  { slug: 'blood-angels', name: 'Blood Angels', boxName: 'Sanguinary Spearhead' },
  { slug: 'dark-angels', name: 'Dark Angels', boxName: 'The Vengeful Brethren' },
  { slug: 'death-guard', name: 'Death Guard', boxName: 'Maggot Lords' },
  { slug: 'drukhari', name: 'Drukhari', boxName: 'Coven of Agonies' },
  { slug: 'emperors-children', name: 'Emperor’s Children', boxName: 'Callous Blades' },
  { slug: 'genestealer-cults', name: 'Genestealer Cults', boxName: 'Claw of Ascension' },
  { slug: 'grey-knights', name: 'Grey Knights', boxName: 'Crowe’s Sanctifiers' },
  { slug: 'chaos-space-marines', name: 'Chaos Space Marines', boxName: 'Zarkan’s Daemonkin' },
  { slug: 'leagues-of-votann', name: 'Leagues of Votann', boxName: 'Bane-slayer’s Bulwark' },
  { slug: 'space-wolves', name: 'Space Wolves', boxName: 'Askar’s Wolfpack' },
  { slug: 'thousand-sons', name: 'Thousand Sons', boxName: 'Prism of Zadophon' },
  { slug: 'tyranids', name: 'Tyranids', boxName: 'The Vardenghast Swarm' },
  { slug: 'world-eaters', name: 'World Eaters', boxName: 'Frenzied Reavers' },
]
