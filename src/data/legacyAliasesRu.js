// Search-only RU aliases for the RETIRED units of the Legendary Proxies tables
// (src/data/factionLegends.json) — the names that have no datasheet of their own and are fielded
// as another unit ("Ufthak Blackhawk" → Warboss). The counterpart of a datasheet's `aliasesRu`
// in its RU overlay, keyed by the retired unit's English name (a Chapter's table repeats the Space
// Marines' names, and one spelling serves them all).
//
// Applied by scripts/gen-datasheet-index.mjs together with the name-pattern rules of
// datasheetAliasRulesRu.js (a "Land Raider Helios" is found by «лендак» with no entry here), into
// the name index's `legacyRu` slot (Ctrl+K) and the tag index (the faction's unit list). Every retired name must be findable in Russian — the community's
// rendering from the glossary first, then a transliteration (owner, 2026-10-22: a transliteration
// may always be added) — `legendaryProxies.test.js` fails on a name with neither, unless it waits
// in LEGACY_ALIASES_PENDING for the owner's spelling. Re-run `npm run datasheets:index` after an
// edit.
export const legacyAliasesRu = {
  // Space Marines and their Chapters
  'Sergeant Telion': ['сержант Телион', 'Телион'],
  'Sergeant Chronus': ['сержант Хрон', 'Хрон', 'Хронус'],
  'Pedro Kantor': ['Педро Кантор', 'Кантор'],
  'Uriel Ventris': ['Уриель Вентрис', 'Уриил Вентрис', 'Вентрис'],
  'Marneus Calgar in Armour of Antilochus': ['Марней Калгар', 'Калгар', 'доспех Антилоха'],
  'Tactical Squad': ['тактическое отделение', 'тактикал сквад'],
  'Assault Squad': ['штурмовое отделение', 'ассолт сквад'],
  'Assault Squad with Jump Packs': ['штурмовое отделение с прыжковыми ранцами', 'ассолт сквад'],
  'Command Squad': ['командное отделение', 'командник'],
  'Bike Squad': ['мотоциклетное отделение', 'байкеры'],
  'Attack Bike Squad': ['отделение ударных мотоциклов', 'ударный мотоцикл', 'аттак байк'],
  'Company Veterans on Bikes': ['ветераны роты на мотоциклах', 'байкеры-ветераны'],
  'Hunter': ['«Охотник»', 'Хантер'],
  'Stalker': ['«Ловчий»', 'Сталкер'],
  'Thunderfire Cannon': ['пушка «Громобой»', 'Громобой', 'тандерфаер'],
  'Spartan Assault Tank': ['штурмовой танк «Спартанец»', 'Спартанец', 'Спартан'],
  'Carab Culln the Risen': ['Караб Куллн', 'Куллн'],
  'Ferren Aerios': ['Феррен Аэриос', 'Аэриос'],
  'Suppressor Squad': ['Супрессоры', 'отделение супрессоров'],
  'Tyrannic War Veterans': ['ветераны Тиранидских войн'],
  'Fellblade Super-heavy Battle Tank': ['«Разящий клинок»', 'Феллблейд'],
  'Javelin Attack Speeder': ['ударный спидер «Дротик»', 'Джавелин'],
  'Caestus Assault Ram': ['штурмовой таран «Цест»', 'Цестус'],
  'Xiphon Interceptor': ['перехватчик «Ксифон»', 'Ксифон'],
  'Storm Eagle Gunship': ['«Грозовой орёл»', 'Шторм Игл'],
  'Fire Raptor Gunship': ['«Огненная птица»', 'Файр Раптор'],
  'Sokar-pattern Stormbird': ['«Грозовая птица»', 'Штормбёрд', 'Сокар'],
  // Orks
  'Ufthak Blackhawk': ['Уфтхак Чёрный Гребень', 'Уфтхак', 'Уфтак', 'Блэкхок'],
  'Boomdakka Snazzwagon': ['Бумдакка Сназзвагон', 'Сназзвагон'],
  'Kustom Boosta-blasta': ['Кастом Буста-бласта', 'Буста-бласта'],
  'Megatrakk Scrapjet': ['Мегатракк Скрапджет', 'Скрапджет'],
  'Shokkjump Dragsta': ['Шокджамп Драгста', 'Драгста', 'гоняла'],
  'Attack Fighta': ['Атак Файта', 'истрибила'],
  'Wurrboy': ['Вуррбой'],
  'Fighta-Bommer': ['истрибила-бомбила', 'Файта-Боммер'],
  'Big Gunz': ['большие пушки', 'биг ганз'],
  'Kannonwagon': ['Каннонвагон'],
  'Mega Dread': ['Мега Дред', 'мегадред'],
  'Meka Dread': ['Мека Дред', 'мекадред'],
}

// Retired names still waiting for the owner's spelling — the index test lets these through, and
// the list printed by the generator keeps them in view. Empty it, not grow it.
export const LEGACY_ALIASES_PENDING = []
