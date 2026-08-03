// Search-only RU aliases that apply to a whole CLASS of unit by name pattern, not one specific
// datasheet id — e.g. every Terminator-type datasheet across every faction ("Blightlord
// Terminators", "Terminator Squad", "Chaos Terminator Squad", …) should all be findable via the
// widespread community nickname "термосы". This is the pattern-based counterpart to the
// per-unit `aliasesRu` field in src/data/datasheets/ru/<slug>.js (for one-off named characters
// like Ghazghkull/Abaddon) — see ALIASES-PROGRESS.md for how the two combine and the sourcing/
// approval process behind this specific list (reviewed line-by-line with the user against
// wh-glossary/terms/game.tsv + a filtered community-jargon pass).
//
// Applied by scripts/gen-datasheet-index.mjs: every datasheet whose EN `name` matches `pattern`
// gets `aliasesRu` merged in (in addition to any of its own per-unit aliases). Order doesn't
// matter — a unit can match more than one rule.
//
// Never displayed as the unit's "name" anywhere — unit names stay English (see CLAUDE.md's
// Bilingual content conventions). Purely a search-matching aid.
export const datasheetAliasRulesRu = [
  { pattern: /\bTerminators?\b/i, aliasesRu: ['терминатор', 'термосы'] },
  { pattern: /\bDreadnoughts?\b/i, aliasesRu: ['дредноут', 'дред'] },
  { pattern: /\bRhino\b/i, aliasesRu: ['Носорог', 'рина', 'ринка', 'рино'] },
  { pattern: /\bLand Raider\b/i, aliasesRu: ['Лэндрейдер', 'лендак'] },
  { pattern: /\bLand Speeder\b/i, aliasesRu: ['Лэндспидер', 'Спидер'] },
  { pattern: /\bChaplain\b/i, aliasesRu: ['капеллан'] },
  { pattern: /\bLibrarian\b/i, aliasesRu: ['библиарий', 'либр'] },
  { pattern: /\bApothecary\b/i, aliasesRu: ['апотекарий'] },
  { pattern: /\bScouts?\b/i, aliasesRu: ['скаут'] },
  { pattern: /\bWarboss(es)?\b/i, aliasesRu: ['варбосс'] },
  { pattern: /\bBig Mek\b/i, aliasesRu: ['большой мек', 'бигмек', 'биг мек'] },
  { pattern: /\bNobz\b/i, aliasesRu: ['нобы'] },
  { pattern: /\bGretchin\b/i, aliasesRu: ['гретчины', 'греча', 'гречка'] },
  { pattern: /\bBloodthirster\b/i, aliasesRu: ['Кровожад', 'Бладфистер', 'бладфист'] },
  { pattern: /\bDefiler\b/i, aliasesRu: ['Осквернитель', 'Дефайлер', 'Деф'] },
  { pattern: /\bDaemon Prince\b/i, aliasesRu: ['князь демонов', 'Демонпринц'] },
  { pattern: /\bObliterators?\b/i, aliasesRu: ['облитератор', 'облы', 'обля', 'обли'] },
  { pattern: /\bPossessed\b/i, aliasesRu: ['одержимый', 'Посессед', 'поцессед'] },
  { pattern: /\bHellhound\b/i, aliasesRu: ['Адская гончая', 'Хелхаунд'] },
  { pattern: /\bChimera\b/i, aliasesRu: ['Химера'] },
  { pattern: /\bOgryns?\b/i, aliasesRu: ['огрин'] },
  { pattern: /\bBasilisk\b/i, aliasesRu: ['Василиск'] },
  { pattern: /\bLeman Russ\b/i, aliasesRu: ['Леман Русс'] },
  { pattern: /\bCrisis\b/i, aliasesRu: ['БСК Кризис', 'крайсис', 'крайзис'] },
  { pattern: /\bEthereal\b/i, aliasesRu: ['эфирный'] },
  { pattern: /\bImmortals?\b/i, aliasesRu: ['Бессмертный', 'Иммортал'] },
  { pattern: /\bWraiths?\b/i, aliasesRu: ['врайты'] },
  { pattern: /\bFlayed Ones\b/i, aliasesRu: ['Освежёванные', 'Флайды', 'флейды'] },
  { pattern: /\bCarnifex(es)?\b/i, aliasesRu: ['карнифекс'] },
  { pattern: /\bLictor\b/i, aliasesRu: ['ликтор'] },
  { pattern: /\bAvatar\b/i, aliasesRu: ['аватара Кхаина', 'Аватар', 'кейн', 'кайн'] },
  { pattern: /\bWraithlord\b/i, aliasesRu: ['призрачный властелин', 'врейтлорд', 'врайтлорд'] },
  { pattern: /\bFalcon\b/i, aliasesRu: ['Соколица', 'сокол', 'фалькон', 'фалкон'] },
  { pattern: /\bDark Reapers\b/i, aliasesRu: ['Тёмные Жнецы', 'Дарк Риперы'] },
  { pattern: /\bFire Dragons\b/i, aliasesRu: ['Огненные Драконы', 'Файр Дрэгон', 'Файер Дрегонс'] },
  { pattern: /\bHowling Banshees\b/i, aliasesRu: ['Воющие Баньши', 'баньши'] },
  { pattern: /\bPredator\b/i, aliasesRu: ['Хищник'] },
  { pattern: /\bVindicator\b/i, aliasesRu: ['Поборник'] },
  { pattern: /\bGenestealers?\b/i, aliasesRu: ['генокрад'] },
  { pattern: /\bPlague Marines?\b/i, aliasesRu: ['чумной десантник', 'чумные'] },
  { pattern: /\bCustodian Guard\b/i, aliasesRu: ['Кустодианская Гвардия', 'Кустодианская Стража'] },
  { pattern: /\bBattle Sisters Squad\b/i, aliasesRu: ['боевые сёстры'] },
  { pattern: /\bDevastator\b/i, aliasesRu: ['опустошитель', 'девастатор'] },
  { pattern: /\bBoyz\b/i, aliasesRu: ['парни', 'бойз'] },
  { pattern: /\bTrukk\b/i, aliasesRu: ['грузавоз', 'трак', 'трук'] },
  { pattern: /\bMeganobz\b/i, aliasesRu: ['меганобы'] },
  { pattern: /\bMonolith\b/i, aliasesRu: ['монолит'] },
  { pattern: /\bWave Serpent\b/i, aliasesRu: ['Волновой змей', 'серпент'] },
  { pattern: /\bBerzerkers?\b/i, aliasesRu: ['берсерки кхорна'] },
  { pattern: /\bNoise Marines?\b/i, aliasesRu: ['шумовой десантник', 'нойзы'] },
  { pattern: /\bCultists?\b/i, aliasesRu: ['культист', 'культисты'] },
  { pattern: /\bRiptide\b/i, aliasesRu: ['риптайд'] },
  { pattern: /\bGhostkeel\b/i, aliasesRu: ['Фантом', 'госткил'] },
  { pattern: /\bBullgryn\b/i, aliasesRu: ['буллгрин', 'быкогрин'] },
  { pattern: /\bWolf Guard\b/i, aliasesRu: ['Волчья гвардия'] },
  { pattern: /\bWhirlwind\b/i, aliasesRu: ['Вихрь'] },
  { pattern: /\bFire Prism\b/i, aliasesRu: ['Огненная призма', 'файр призм'] },
  { pattern: /\bDeathmarks?\b/i, aliasesRu: ['смертоуказатель', 'дезмарк'] },
  {
    pattern: /\bDoomsday Ark\b/i,
    aliasesRu: ['Ковчег Судный день', 'дда', 'думсдей арка', 'Ковчег Судного дня'],
  },
  { pattern: /\bWar Walkers?\b/i, aliasesRu: ['боевой шагоход', 'шагоход', 'волкер'] },
]
