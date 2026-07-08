// Faction index for the /factions landing page. Curated to match the official faction
// grouping shown in the mockup (afctions_screen.png): Space Marines is a single entry
// (not the individual chapters that mfmFactions lists). Only factions with a data file in
// src/data/factions/<slug>.js and `ready: true` link through; the rest render as
// "coming soon". Names are the factions' own English names (kept in both locales for now).
//
// Shape: { id: group key (label in ui.js factionGroup*), factions: [{ slug, name, ready }] }.
export const factionGroups = [
  {
    id: 'imperium',
    factions: [
      { slug: 'adepta-sororitas',   name: 'Adepta Sororitas' },
      { slug: 'adeptus-custodes',   name: 'Adeptus Custodes', ready: true },
      { slug: 'adeptus-mechanicus', name: 'Adeptus Mechanicus', ready: true },
      { slug: 'astra-militarum',    name: 'Astra Militarum' },
      { slug: 'dark-angels',        name: 'Dark Angels', ready: true },
      { slug: 'grey-knights',       name: 'Grey Knights' },
      { slug: 'imperial-agents',    name: 'Imperial Agents' },
      { slug: 'imperial-knights',   name: 'Imperial Knights' },
      { slug: 'space-marines',      name: 'Space Marines', ready: true },
    ],
  },
  {
    id: 'xenos',
    factions: [
      { slug: 'aeldari',            name: 'Aeldari' },
      { slug: 'drukhari',           name: 'Drukhari' },
      { slug: 'genestealer-cults',  name: 'Genestealer Cults' },
      { slug: 'leagues-of-votann',  name: 'Leagues of Votann' },
      { slug: 'necrons',            name: 'Necrons', ready: true },
      { slug: 'orks',               name: 'Orks', ready: true },
      { slug: 'tau-empire',         name: 'T’au Empire' },
      { slug: 'tyranids',           name: 'Tyranids', ready: true },
    ],
  },
  {
    id: 'chaos',
    factions: [
      { slug: 'chaos-daemons',       name: 'Chaos Daemons' },
      { slug: 'chaos-knights',       name: 'Chaos Knights' },
      { slug: 'chaos-space-marines', name: 'Chaos Space Marines' },
      { slug: 'death-guard',         name: 'Death Guard' },
      { slug: 'emperors-children',   name: 'Emperor’s Children' },
      { slug: 'thousand-sons',       name: 'Thousand Sons' },
      { slug: 'world-eaters',        name: 'World Eaters' },
    ],
  },
  {
    id: 'unaligned',
    factions: [
      { slug: 'unaligned-forces', name: 'Unaligned Forces' },
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
