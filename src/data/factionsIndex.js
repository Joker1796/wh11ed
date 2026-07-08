// Faction index for the /factions landing page. Grouped into the same sub-groups the
// Game Tracker's faction picker uses (see FACTION_GROUPS in composables/trackerFactions.js):
// Space Marines and its Chapters form their own "Astartes" group, separate from the rest of
// the Imperium. Membership mirrors the tracker's FACTION_GROUP_SLUGS (hand-kept in sync here
// rather than imported, so this file — loaded by FactionsListView/NavSidebar — doesn't pull in
// the heavy mfmFactions dataset the tracker lazy-loads). Within each group factions are sorted
// by name, matching the tracker (Astartes / Imperium / Chaos / Xenos).
//
// Only factions with a data file in src/data/factions/<slug>.js and `ready: true` link
// through; the rest render as "coming soon". Names are the factions' own English names (kept
// in both locales for now).
//
// Shape: { id: group key (label in ui.js factionGroup*), factions: [{ slug, name, ready }] }.
export const factionGroups = [
  {
    id: 'astartes',
    factions: [
      { slug: 'black-templars',     name: 'Black Templars', ready: true },
      { slug: 'blood-angels',       name: 'Blood Angels' },
      { slug: 'dark-angels',        name: 'Dark Angels', ready: true },
      { slug: 'deathwatch',         name: 'Deathwatch' },
      { slug: 'grey-knights',       name: 'Grey Knights' },
      { slug: 'space-marines',      name: 'Space Marines', ready: true },
      { slug: 'space-wolves',       name: 'Space Wolves' },
    ],
  },
  {
    id: 'imperium',
    factions: [
      { slug: 'adepta-sororitas',   name: 'Adepta Sororitas' },
      { slug: 'adeptus-custodes',   name: 'Adeptus Custodes', ready: true },
      { slug: 'adeptus-mechanicus', name: 'Adeptus Mechanicus', ready: true },
      { slug: 'astra-militarum',    name: 'Astra Militarum' },
      { slug: 'imperial-agents',    name: 'Imperial Agents' },
      { slug: 'imperial-knights',   name: 'Imperial Knights' },
      { slug: 'titan-legions',      name: 'Titan Legions' },
    ],
  },
  {
    id: 'chaos',
    factions: [
      { slug: 'chaos-daemons',       name: 'Chaos Daemons' },
      { slug: 'chaos-knights',       name: 'Chaos Knights' },
      { slug: 'chaos-space-marines', name: 'Chaos Space Marines' },
      { slug: 'chaos-titan-legions', name: 'Chaos Titan Legions' },
      { slug: 'death-guard',         name: 'Death Guard' },
      { slug: 'emperors-children',   name: 'Emperor’s Children' },
      { slug: 'thousand-sons',       name: 'Thousand Sons', ready: true },
      { slug: 'world-eaters',        name: 'World Eaters' },
    ],
  },
  {
    id: 'xenos',
    factions: [
      { slug: 'aeldari',            name: 'Aeldari', ready: true },
      { slug: 'drukhari',           name: 'Drukhari', ready: true },
      { slug: 'genestealer-cults',  name: 'Genestealer Cults' },
      { slug: 'leagues-of-votann',  name: 'Leagues of Votann' },
      { slug: 'necrons',            name: 'Necrons', ready: true },
      { slug: 'orks',               name: 'Orks', ready: true },
      { slug: 'tau-empire',         name: 'T’au Empire' },
      { slug: 'tyranids',           name: 'Tyranids', ready: true },
    ],
  },
]

// Resolve a slug to its index entry (or null). Used by FactionView to guard routes.
export function factionIndexBySlug(slug) {
  for (const g of factionGroups) {
    const f = g.factions.find((x) => x.slug === slug)
    if (f) return f
  }
  return null
}
