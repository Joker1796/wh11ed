// A Detachment whose rule hands the CHARACTER keyword to units it names by keyword, "in the Muster
// Armies step" — appdata carries it as an allegiance group listing its OWN datasheets, so a
// Faction Pack Legends unit that fits the rule had no choice (owner, 2026-10-07: 11 Legends
// TITANIC tanks in Steel Hammer). Group slug -> the keywords the rule text names. A new group of
// this kind fails the run until its rule is read here (characterGrantUnread in
// gen-roster-data.mjs); `src/data/roster/index.test.js` holds every unit that fits a rule to it.
export const CHARACTER_GRANTS = {
  'steel-hammer-keywords': ['astra militarum', 'titanic'], // "one or more ASTRA MILITARUM TITANIC units"
  'houndpack-lance-keyword': ['war dog'], // "select three WAR DOG units"
  'solar-spearhead-keywords': ['adeptus custodes', 'walker'], // "up to 2 ADEPTUS CUSTODES WALKER models"
  'subterranean-assault-keywords': ['trygon'], // "up to 2 Trygon models"
}
