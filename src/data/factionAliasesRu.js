// Search-only RU aliases for FACTION landing pages («некроны» → /factions/necrons), keyed by
// the faction's slug from factionsIndex.js. The RU counterpart to matching the EN faction name:
// faction names stay English everywhere in the UI (see CLAUDE.md's Bilingual content
// conventions) — this is purely a search-matching aid, same contract as
// datasheetAliasRulesRu.js, and it lives in its own module (not on factionsIndex.js, which
// rides in the root bundle) so the strings load only with the search chunk.
//
// Matching is substring + apostrophe-blind (see foldName in useSearch.js), so the longer
// inflected form covers the shorter query: «эльдары» answers to «эльдар». Community names and
// widespread jargon, same sourcing spirit as the datasheet aliases; two-letter abbreviations
// («ба», «дг») are left out — as substrings they match far too much.
export const factionAliasesRu = {
  'black-templars': ['чёрные храмовники', 'храмовники', 'темплары'],
  'blood-angels': ['кровавые ангелы'],
  'dark-angels': ['тёмные ангелы', 'дарк ангелы'],
  deathwatch: ['караул смерти', 'дезвотч'],
  'grey-knights': ['серые рыцари', 'грей найты'],
  'space-marines': ['космодесант', 'космодесантники', 'спейсмарины'],
  'space-wolves': ['космические волки', 'космоволки'],
  'adepta-sororitas': ['сёстры битвы', 'сорориты', 'сестринство'],
  'adeptus-custodes': ['кустодес', 'кустодии', 'кустодианская гвардия'],
  'adeptus-mechanicus': ['механикус', 'адмех'],
  'astra-militarum': ['астра милитарум', 'имперская гвардия', 'гвардия'],
  'imperial-agents': ['агенты империума', 'инквизиция'],
  'imperial-knights': ['имперские рыцари'],
  'titan-legions': ['легионы титанов', 'титаны'],
  'chaos-daemons': ['демоны хаоса', 'демоны'],
  'chaos-knights': ['рыцари хаоса'],
  'chaos-space-marines': ['хаос спейсмарины', 'хаосмарины', 'хаоситы', 'хсм', 'чсм'],
  'chaos-titan-legions': ['легионы титанов хаоса', 'титаны хаоса'],
  'death-guard': ['гвардия смерти', 'дезгвардия'],
  'emperors-children': ['дети императора'],
  'thousand-sons': ['тысяча сынов'],
  'world-eaters': ['пожиратели миров', 'ворлдитеры'],
  aeldari: ['эльдары', 'аэльдари'],
  drukhari: ['друкари', 'тёмные эльдары', 'дэльдары'],
  'genestealer-cults': ['культы генокрадов', 'генокрады'],
  'leagues-of-votann': ['лиги вотанна', 'вотанн', 'сквоты'],
  necrons: ['некроны', 'некры'],
  orks: ['орки'],
  'tau-empire': ['тау', 'империя тау', 'т’ау'],
  tyranids: ['тираниды', 'ниды'],
}
