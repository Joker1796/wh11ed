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
// `color` — Wahapedia-style faction theming, applied by FactionLayout as the page's --accent:
// `light` is the light-theme value (dark enough for white text on active chips), `dark` the
// dark-theme value (brighter, readable on the dark background — same idea as the app's own
// #8b2a33 → #c8585e accent pair).
//
// Shape: { id: group key (label in ui.js factionGroup*), factions: [{ slug, name, ready, color }] }.
export const factionGroups = [
  {
    id: 'astartes',
    factions: [
      { slug: 'black-templars',     name: 'Black Templars', ready: true, color: { light: '#3d4248', dark: '#9aa3ad' } },
      { slug: 'blood-angels',       name: 'Blood Angels', ready: true, color: { light: '#9b1c1c', dark: '#e06666' } },
      { slug: 'dark-angels',        name: 'Dark Angels', ready: true, color: { light: '#1d5e34', dark: '#4fae74' } },
      { slug: 'deathwatch',         name: 'Deathwatch', ready: true, color: { light: '#4a5560', dark: '#98a6b4' } },
      { slug: 'grey-knights',       name: 'Grey Knights', ready: true, color: { light: '#4f6d7a', dark: '#8fb3c2' } },
      { slug: 'space-marines',      name: 'Space Marines', ready: true, color: { light: '#1f4e8c', dark: '#6b9fd8' } },
      { slug: 'space-wolves',       name: 'Space Wolves', ready: true, color: { light: '#56707f', dark: '#9cc0d1' } },
    ],
  },
  {
    id: 'imperium',
    factions: [
      { slug: 'adepta-sororitas',   name: 'Adepta Sororitas', ready: true, color: { light: '#7a1230', dark: '#d16781' } },
      { slug: 'adeptus-custodes',   name: 'Adeptus Custodes', ready: true, color: { light: '#8a6d1a', dark: '#d4af37' } },
      { slug: 'adeptus-mechanicus', name: 'Adeptus Mechanicus', ready: true, color: { light: '#9c3b1a', dark: '#e07a52' } },
      { slug: 'astra-militarum',    name: 'Astra Militarum', ready: true, color: { light: '#4e5d2e', dark: '#a3b36b' } },
      { slug: 'imperial-agents',    name: 'Imperial Agents', ready: true, color: { light: '#33635c', dark: '#6fb3a8' } },
      { slug: 'imperial-knights',   name: 'Imperial Knights', ready: true, color: { light: '#2e5f8a', dark: '#7fb0da' } },
      { slug: 'titan-legions',      name: 'Titan Legions', ready: true, color: { light: '#6b3f24', dark: '#b98a63' } },
    ],
  },
  {
    id: 'chaos',
    factions: [
      { slug: 'chaos-daemons',       name: 'Chaos Daemons', ready: true, color: { light: '#8a2c1e', dark: '#de7256' } },
      { slug: 'chaos-knights',       name: 'Chaos Knights', ready: true, color: { light: '#5b2b66', dark: '#b07cc0' } },
      { slug: 'chaos-space-marines', name: 'Chaos Space Marines', ready: true, color: { light: '#7c1f3a', dark: '#d06080' } },
      { slug: 'chaos-titan-legions', name: 'Chaos Titan Legions', ready: true, color: { light: '#5d3a28', dark: '#b08464' } },
      { slug: 'death-guard',         name: 'Death Guard', ready: true, color: { light: '#5c6e1f', dark: '#a9c04e' } },
      { slug: 'emperors-children',   name: 'Emperor’s Children', ready: true, color: { light: '#99377c', dark: '#e07fc4' } },
      { slug: 'thousand-sons',       name: 'Thousand Sons', ready: true, color: { light: '#1f6e8c', dark: '#5fb6d8' } },
      { slug: 'world-eaters',        name: 'World Eaters', ready: true, color: { light: '#a01a12', dark: '#e8695f' } },
    ],
  },
  {
    id: 'xenos',
    factions: [
      { slug: 'aeldari',            name: 'Aeldari', ready: true, color: { light: '#1f7e86', dark: '#5cc4cc' } },
      { slug: 'drukhari',           name: 'Drukhari', ready: true, color: { light: '#1c5f52', dark: '#55b3a0' } },
      { slug: 'genestealer-cults',  name: 'Genestealer Cults', ready: true, color: { light: '#5d3a8c', dark: '#a785d9' } },
      { slug: 'leagues-of-votann',  name: 'Leagues of Votann', ready: true, color: { light: '#a3641c', dark: '#d99a4e' } },
      { slug: 'necrons',            name: 'Necrons', ready: true, color: { light: '#1d7a4c', dark: '#45c98a' } },
      { slug: 'orks',               name: 'Orks', ready: true, color: { light: '#467a1e', dark: '#8cc25a' } },
      { slug: 'tau-empire',         name: 'T’au Empire', ready: true, color: { light: '#99551a', dark: '#d69a55' } },
      { slug: 'tyranids',           name: 'Tyranids', ready: true, color: { light: '#7a3b6b', dark: '#cc82ba' } },
    ],
  },
]

// Resolve a slug to its index entry (or null). Used by the faction views to guard routes
// and by FactionLayout for the per-faction page color.
export function factionIndexBySlug(slug) {
  for (const g of factionGroups) {
    const f = g.factions.find((x) => x.slug === slug)
    if (f) return f
  }
  return null
}
