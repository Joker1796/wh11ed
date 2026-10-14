// Lightweight Combat Patrol index — one row per BOX (id/slug/name/boxName), no rule text or
// datasheets. `id` is the box's URL key (/combat-patrol/<id>); `slug` is its faction's, and a
// faction can have several boxes (see the header of combatPatrol.js). The counterpart to
// factionsIndex.js: router/nav.js's drawer nav (combatPatrolGroups), the box picker
// (CombatPatrolIndexView) and seoMetaData.js's per-box meta title only need these fields, so they
// read this file instead of statically importing the full src/data/combatPatrol.js (detachment
// rules, stratagems, enhancements and every fixed-roster datasheet of every box). That full file
// is dynamically import()ed only by the box page itself, once a CP route is actually visited —
// keeping it out of the app's root bundle (router/index.js sits in the module graph of virtually
// every page). Kept in sync with combatPatrol.js by scripts/sync-combat-patrol.mjs's index-drift
// check.
export const combatPatrolIndex = [
  { id: 'necrons', slug: 'necrons', name: 'Necrons', boxName: "Amonhotekh's Guard" },
  { id: 'space-marines', slug: 'space-marines', name: 'Space Marines', boxName: 'Assault Force' },
  { id: 'orks', slug: 'orks', name: 'Orks', boxName: "'Ardmob" },
  { id: 'tau-empire', slug: 'tau-empire', name: "T'au Empire", boxName: 'Sudden Dawn Cadre' },
  { id: 'astra-militarum', slug: 'astra-militarum', name: 'Astra Militarum', boxName: "Drayden's Lance" },
  { id: 'adepta-sororitas', slug: 'adepta-sororitas', name: 'Adepta Sororitas', boxName: 'Sanctuary Guardians' },
  { id: 'adeptus-custodes', slug: 'adeptus-custodes', name: 'Adeptus Custodes', boxName: "Tristraen's Gilded Blades" },
  { id: 'adeptus-custodes-aquilan-talon', slug: 'adeptus-custodes', name: 'Adeptus Custodes', boxName: 'Aquilan Talon' },
  { id: 'adeptus-custodes-aquilan-wing', slug: 'adeptus-custodes', name: 'Adeptus Custodes', boxName: 'Aquilan Wing' },
  { id: 'adeptus-mechanicus', slug: 'adeptus-mechanicus', name: 'Adeptus Mechanicus', boxName: 'Purge Corps Deltic-9' },
  { id: 'imperial-agents', slug: 'imperial-agents', name: 'Imperial Agents', boxName: "Inquisitor's Hand" },
  { id: 'aeldari', slug: 'aeldari', name: 'Aeldari', boxName: "Kygharil's Protectors" },
  { id: 'black-templars', slug: 'black-templars', name: 'Black Templars', boxName: 'Vow-Sworn of Vedrenn' },
  { id: 'blood-angels', slug: 'blood-angels', name: 'Blood Angels', boxName: 'Sanguinary Spearhead' },
  { id: 'dark-angels', slug: 'dark-angels', name: 'Dark Angels', boxName: 'The Vengeful Brethren' },
  { id: 'death-guard', slug: 'death-guard', name: 'Death Guard', boxName: 'Maggot Lords' },
  { id: 'drukhari', slug: 'drukhari', name: 'Drukhari', boxName: 'Coven of Agonies' },
  { id: 'emperors-children', slug: 'emperors-children', name: 'Emperor’s Children', boxName: 'Callous Blades' },
  { id: 'genestealer-cults', slug: 'genestealer-cults', name: 'Genestealer Cults', boxName: 'Claw of Ascension' },
  { id: 'grey-knights', slug: 'grey-knights', name: 'Grey Knights', boxName: 'Crowe’s Sanctifiers' },
  { id: 'chaos-space-marines', slug: 'chaos-space-marines', name: 'Chaos Space Marines', boxName: 'Zarkan’s Daemonkin' },
  { id: 'leagues-of-votann', slug: 'leagues-of-votann', name: 'Leagues of Votann', boxName: 'Bane-slayer’s Bulwark' },
  { id: 'space-wolves', slug: 'space-wolves', name: 'Space Wolves', boxName: 'Askar’s Wolfpack' },
  { id: 'thousand-sons', slug: 'thousand-sons', name: 'Thousand Sons', boxName: 'Prism of Zadophon' },
  { id: 'tyranids', slug: 'tyranids', name: 'Tyranids', boxName: 'The Vardenghast Swarm' },
  { id: 'world-eaters', slug: 'world-eaters', name: 'World Eaters', boxName: 'Frenzied Reavers' },
]
