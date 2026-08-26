// Lazy per-faction datasheet RU overlays. Each ./<slug>.js exports a sparse `default`
// object keyed by datasheet **id** with ONLY the translated prose for that sheet
// (flavor, ability texts, composition, loadout, options, damaged/leader/transport text).
// Unit names, weapon profiles, stats, keywords, core & faction rule names, and [BRACKET]
// tags stay English and inherit from EN. An optional `abilityNamesRu` named export maps
// English ability names → RU display names, which replace the ability name in the card
// header; the original is carried alongside as `nameEn` and the card shows it small, in
// brackets. Necrons instead carries the name inline via the per-sheet overlay's { name, text }
// form; both paths translate the header, and both record `nameEn`.
//
// Loaded on demand by FactionDatasheetView only in the RU locale, so the overlays never
// enter the EN bundle. Each ./<slug>.js is code-split into its own chunk via glob.
const modules = import.meta.glob(['./*.js', '!./index.js'])

// Resolves the RU overlay MODULE for a faction (or null). Returns the whole module
// namespace so both `default` (the id→overlay map) and `abilityNamesRu` are available
// from a single lazy import. For the 5 SM-Chapter codex factions (see `sharedIdsFor` in
// ../index.js), also folds in space-marines.js's own RU overlay entries for the shared
// unit ids — the chapter's own entry for an id wins if both exist.
export async function loadDatasheetsRu(slug) {
  const loader = modules[`./${slug}.js`]
  const own = loader ? await loader() : null
  const { sharedIdsFor } = await import('../index.js')
  const sharedIds = await sharedIdsFor(slug)
  if (!sharedIds) return own
  const smLoader = modules['./space-marines.js']
  const sm = smLoader ? await smLoader() : null
  const idSet = new Set(sharedIds)
  const sharedDefault = Object.fromEntries(
    Object.entries(sm?.default || {}).filter(([id]) => idSet.has(id)),
  )
  return {
    default: { ...sharedDefault, ...(own?.default || {}) },
    abilityNamesRu: { ...(sm?.abilityNamesRu || {}), ...(own?.abilityNamesRu || {}) },
  }
}

// Merge a sparse RU overlay for ONE datasheet over its EN object. Ability lists are keyed
// by the English ability name (robust to reordering); `abilities`/`wargearAbilities`/
// `specialAbilities` overlay values are { [enName]: ruText } maps — or, to also override the
// translated header name for that entry, { [enName]: { name, text } }.
// `composition`/`options` are full-replacement arrays (author them in EN order). Everything
// absent inherits EN.
// Shared RU headers for the ALL-CAPS structural rule/ability plates that recur, verbatim,
// across many factions (Warlord constraints, attach-swap rules, transport handling, order
// mechanics, …). Translating them once here keeps every faction consistent and avoids
// repeating the same name in each faction's `abilityNamesRu`. Only DESCRIPTIVE names live
// here — proprietary nouns, unit names and character/chapter names (CUSTODIAN GUARD, WAAAGH!
// WAZDAKKA, DEMETRIAN TITUS, …) are intentionally absent so they stay English (Necrons
// convention). A faction's own `abilityNamesRu` takes precedence over this map.
const SHARED_RULE_NAMES = {
  'SUPREME COMMANDER': 'Верховный командующий',
  'ATTACHED UNIT': 'Присоединённый юнит',
  'Attached Unit': 'Присоединённый юнит',
  'ATTACHMENT': 'Присоединение',
  'COMPANY HEROES': 'Герои роты',
  'LAST SURVIVOR': 'Последний выживший',
  'LONER': 'Одиночка',
  'ORDERS': 'Приказы',
  'EMBARKING': 'Погрузка',
  'EMBARKING WITHIN TRANSPORTS': 'Погрузка в Transport',
  'DEPLOYMENT': 'Развёртывание',
  'COMPACT': 'Компактность',
  'BODYGUARD': 'Телохранитель',
  'NAVY BODYGUARD': 'Флотский телохранитель',
  'SHADOW ASSIGNMENT': 'Теневое задание',
  'INDEPENDENT POWER': 'Независимая сила',
  'HUNTER ORGANISM': 'Организм-охотник',
  'MANIFESTATION OF DESTRUCTION': 'Воплощение разрушения',
  'INQUISITORIAL HENCHMEN': 'Приспешники инквизиции',
  'INSPIRING COMMANDER': 'Вдохновляющий командир',
  'SUPPORT ARTILLERY': 'Артиллерийская поддержка',
  'LOYAL PROTECTOR': 'Верный защитник',
  'Supreme Strategist': 'Верховный стратег',
  'Master of Battle': 'Мастер битвы',
  'CHOSEN OF THE EMPEROR': 'Избранник Императора',
  'LORD OF THE HOST': 'Владыка воинства',
  'Rites of Teleportation': 'Обряды телепортации',
  'Holy Vanguard': 'Святой авангард',
  'Holy Mission': 'Святая миссия',
  'PATH OF DAMNATION': 'Путь проклятия',
  'FORCE OF UNTAMED DESTRUCTION': 'Сила необузданного разрушения',
  'LIONS OF THE EMPEROR': 'Львы Императора',
  'HEROES OF ULTRAMAR': 'Герои Ultramar',
  'USING COMMISSAR GRAVES': 'Использование Commissar Graves',
  'ASPECT TRAINING': 'Обучение аспекту',
  'TRAVELLING PLAYERS': 'Странствующие актёры',
  'ARCHON’S RETINUE': 'Свита Archon',
  'LORD OF THE EIGHTBOUND': 'Владыка Eightbound',
}

// Shared RU body text for the handful of plates whose English is byte-for-byte identical on
// every datasheet that has them (Warlord requirement, Company Heroes, Last Survivor). Each
// entry is { en, ru }: the translation is only substituted when the sheet's actual English
// text matches `en` exactly, so a unit with a worded-differently variant (e.g. Ghazghkull's
// named Supreme Commander) is left untouched and must carry its own per-sheet overlay.
const SHARED_RULE_TEXTS = {
  'SUPREME COMMANDER': {
    en: 'If this model is in your army, it must be your Warlord.',
    ru: 'Если эта модель в вашей армии, она должна быть вашим WARLORD.',
  },
  'COMPANY HEROES': {
    en: 'You must attach one CAPTAIN or CHAPTER MASTER model to this unit. If this is not possible, this unit does not take part in the battle and counts as having been destroyed.',
    ru: 'Вы должны присоединить к этому юниту одну модель CAPTAIN или CHAPTER MASTER. Если это невозможно, этот юнит не участвует в битве и считается уничтоженным.',
  },
  'LAST SURVIVOR': {
    en: 'This model cannot be selected as your Warlord.',
    ru: 'Эту модель нельзя выбрать вашим WARLORD.',
  },
}

// RU body text for the recurring ALL-CAPS structural `rules` plates (Warlord constraints,
// attach-swap rules, transport/order mechanics, …), keyed by datasheet **id**. These plates
// are the same rule wherever they appear, so centralising them here translates all 19
// factions at once without editing each faction overlay — the plate NAME is translated by
// SHARED_RULE_NAMES above (or left English for proprietary/unit/character names). Datasheet
// ids are unique across factions except for genuinely shared sheets (e.g. `pink-horrors` in
// both Daemons and Thousand Sons), whose text is identical, so one entry serves both. A
// faction's own overlay `rules` entry (if any) always wins over this map.
const RULE_TEXTS_BY_ID = {
  // Adepta Sororitas
  'dominion-squad': { 'Holy Vanguard': 'Если во время шага Declare Battle Formations к этому юниту присоединён юнит Leader и этот юнит начинает битву погружённым в TRANSPORT, этот юнит Leader получает способность Scouts 6".' },
  'ministorum-priest': { 'Holy Mission': 'Если во время шага Declare Battle Formations эта модель присоединена к DOMINION SQUAD, она получает способность Scouts 6". Если во время шага Declare Battle Formations эта модель присоединена к SISTERS NOVITIATE SQUAD, она получает способность Infiltrators.' },
  // Adeptus Custodes
  'agamatus-custodians': { 'JETBIKE OUTRIDERS': 'Если модель из вашей армии со способностью Leader может быть присоединена к юниту Vertus Praetors, она может быть присоединена к этому юниту вместо этого.' },
  'aquilon-custodians': { 'LIONS OF THE EMPEROR': 'Если модель из вашей армии со способностью Leader может быть присоединена к юниту Allarus Custodians, она может быть присоединена к этому юниту вместо этого.' },
  'custodian-guard-with-adrasite-and-pyrithite-spears': { 'CUSTODIAN GUARD': 'Если модель ADEPTUS CUSTODES из вашей армии со способностью Leader может быть присоединена к юниту Custodian Guard, она может быть присоединена к этому юниту вместо этого.' },
  'sagittarum-custodians': { 'CUSTODIAN GUARD': 'Если модель ADEPTUS CUSTODES из вашей армии со способностью Leader может быть присоединена к юниту Custodian Guard, она может быть присоединена к этому юниту вместо этого.' },
  'venatari-custodians': { 'JUMP PACKS': 'Этот юнит не может погрузиться в Venerable Land Raider.' },
  // Adeptus Mechanicus
  'sydonian-skatros': { 'SYDONIAN SENTINEL': 'Эта модель не может быть вашим WARLORD.' },
  // Astra Militarum
  'aegis-defence-line': { 'DEPLOYMENT': 'Когда эта модель развёртывается, она состоит из 1 секции платформы, до 5 секций щита, до 2 секций разбитого щита и до 2 концевых секций. Все секции должны быть соединены друг с другом, образуя непрерывную линию обороны; две секции разбитого щита можно разместить либо в конце линии обороны, либо в её середине так, чтобы обе были в пределах 1/2" друг от друга (в этом случае эти две секции считаются соединёнными друг с другом). Все развёрнутые секции затем считаются одной моделью для всех игровых целей.' },
  'cadian-castellan': { 'ORDERS': 'Этот OFFICER может издать 2 Orders юнитам Regiment.' },
  'cadian-command-squad': { 'ORDERS': 'OFFICER этого юнита может издать 1 Order юниту Regiment.' },
  'cadian-heavy-weapons-squad': { 'EMBARKING': 'Пока юнит погружён в Transport, каждая модель занимает место 2 моделей, а каждое оружие этих моделей считается оружием 2 моделей для целей способности Firing Deck.' },
  'catachan-command-squad': { 'ORDERS': 'OFFICER этого юнита может издать 1 Order юниту Regiment.' },
  'catachan-heavy-weapons-squad': { 'EMBARKING': 'Пока юнит погружён в Transport, каждая модель занимает место 2 моделей, а каждое оружие этих моделей считается оружием 2 моделей для целей способности Firing Deck.' },
  'cyclops-demolition-vehicle': { 'COMPACT': 'Эта модель может погрузиться в модель Astra Militarum Transport, как если бы была моделью Infantry. Если она это делает, она занимает место 7 моделей.' },
  'gaunts-ghosts': { 'ORDERS': 'OFFICER этого юнита может издать до 2 Orders юнитам Regiment или GAUNT’S GHOSTS.' },
  'krieg-command-squad': { 'ORDERS': 'OFFICER этого юнита может издать 1 Order юниту Regiment.' },
  'krieg-heavy-weapons-squad': { 'EMBARKING': 'Пока юнит погружён в Transport, каждая модель Heavy Weapons Gunner занимает место 2 моделей, а каждое оружие этих моделей считается оружием 2 моделей для целей способности Firing Deck.' },
  'leman-russ-commander': { 'ORDERS': 'Этот OFFICER может издать до 2 Orders юнитам Squadron.' },
  'lord-marshal-dreir': { 'ORDERS': 'Этот OFFICER может издать до 3 Orders юнитам Regiment.' },
  'lord-solar-leontus': {
    'SUPREME COMMANDER': 'Если эта модель в вашей армии, она должна быть вашим WARLORD.',
    'ORDERS': 'Этот OFFICER может издать до 3 Orders:\n▪ юнитам Regiment\n▪ юнитам Squadron\n▪ юнитам Titanic',
  },
  'militarum-tempestus-command-squad': { 'ORDERS': 'OFFICER этого юнита может издать 1 Order юниту Regiment.' },
  'rogal-dorn-commander': { 'ORDERS': 'Этот OFFICER может издать до 2 Orders юнитам Squadron.' },
  'sly-marbo': { 'LONER': 'Эту модель нельзя выбрать вашим WARLORD.' },
  'ursula-creed': { 'ORDERS': 'Этот OFFICER может издать до 3 Orders юнитам Regiment.' },
  // Black Templars
  'crusader-squad': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Intercessor Squad, он может быть присоединён к этому юниту вместо этого.' },
  'sword-brethren-squad': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Intercessor Squad, он может быть присоединён к этому юниту вместо этого.' },
  // Blood Angels
  'death-company-marines': { 'ATTACHED UNIT': 'Если модель Chaplain из вашей армии со способностью Leader может быть присоединена к юниту Assault Intercessor Squad, она может быть присоединена к этому юниту вместо этого.' },
  'death-company-marines-with-bolt-rifles': { 'ATTACHED UNIT': 'Если модель Chaplain из вашей армии со способностью Leader может быть присоединена к юниту Intercessor Squad, она может быть присоединена к этому юниту вместо этого.' },
  'death-company-marines-with-jump-packs': { 'ATTACHED UNIT': 'Если модель Chaplain из вашей армии со способностью Leader может быть присоединена к юниту Assault Intercessors with Jump Packs, она может быть присоединена к этому юниту вместо этого.' },
  'sanguinary-guard': { 'ATTACHED UNIT': 'Если модель Captain из вашей армии со способностью Leader может быть присоединена к юниту Assault Intercessors with Jump Packs, она может быть присоединена к этому юниту вместо этого.' },
  // Chaos Daemons (pink-horrors shared with Thousand Sons)
  'daemon-prince-of-chaos': { 'DAEMONIC ALLEGIANCE': 'Когда вы выбираете эту модель для включения в свою армию, вы должны выбрать одно из следующих ключевых слов, которое она получит:\n▪ KHORNE\n▪ TZEENTCH\n▪ NURGLE\n▪ SLAANESH\nВыбранное ключевое слово также повлияет на некоторые характеристики этой модели, как указано на обороте.' },
  'daemon-prince-of-chaos-with-wings': { 'DAEMONIC ALLEGIANCE': 'Когда вы выбираете эту модель для включения в свою армию, вы должны выбрать одно из следующих ключевых слов, которое она получит:\n▪ KHORNE\n▪ TZEENTCH\n▪ NURGLE\n▪ SLAANESH\nВыбранное ключевое слово также повлияет на некоторые характеристики этой модели, как указано на обороте.' },
  'exalted-flamer': { 'MANIFESTATION OF DESTRUCTION': 'Эта модель не может быть вашим WARLORD, и ей нельзя давать улучшения.' },
  'pink-horrors': { 'HORRORS ARE PINK. HORRORS ARE BLUE. WHEREONCE THERE WAS ONE, NOW THERE ARE TWO.': 'Если в какой-либо момент этот юнит не содержит моделей PINK HORROR, используйте для этого юнита датащит BLUE HORRORS.\n\n**Примечание разработчика:** Пока этот юнит содержит одну или более моделей PINK HORROR, способности Sullen Malevolence и Exploding Horrors из датащита BLUE HORRORS не применяются к этому юниту.' },
  // Chaos Space Marines
  'nemesis-claw': { 'ATTACHED UNIT': 'Если юнит Character из вашей армии со способностью Leader (кроме Epic Hero) может быть присоединён к юниту Legionaries, он может быть присоединён к этому юниту вместо этого.' },
  // Dark Angels
  'deathwing-knights': { 'ATTACHED UNIT': 'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Terminator Squad, он может быть присоединён к этому юниту вместо этого.' },
  'deathwing-terminator-squad': { 'ATTACHED UNIT': 'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Terminator Squad, он может быть присоединён к этому юниту вместо этого.' },
  'inner-circle-companions': { 'Attached Unit': 'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Sternguard Veteran Squad, он может быть присоединён к этому юниту вместо этого.' },
  'ravenwing-black-knights': { 'ATTACHED UNIT': 'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Outrider Squad, он может быть присоединён к этому юниту вместо этого.' },
  // Deathwatch
  'deathwatch-terminator-squad': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Terminator Squad, он может быть присоединён к этому юниту вместо этого.' },
  'deathwatch-veterans': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Sternguard Veteran Squad, он может быть присоединён к этому юниту вместо этого.' },
  'decimus-kill-team': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Intercessor Squad, он может быть присоединён к этому юниту вместо этого.' },
  'fortis-kill-team': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Intercessor Squad, он может быть присоединён к этому юниту вместо этого.' },
  'spectrus-kill-team': { 'ATTACHED UNIT': 'Если Character из вашей армии со способностью Leader может быть присоединён к юниту Infiltrator Squad, он может быть присоединён к этому юниту вместо этого.\n\nЕсли во время шага Declare Battle Formations к этому юниту присоединён юнит Leader, этот юнит Leader получает способности Infiltrators и Scouts 6".' },
  // Drukhari
  'hand-of-the-archon': { 'ARCHON’S RETINUE': 'Если во время шага Declare Battle Formations к этому юниту присоединён юнит Leader, этот юнит Leader получает способность Scouts 7".' },
  // Genestealer Cults
  'patriarch': { 'SUPREME COMMANDER': '▪ Вы не можете включить в свою армию более одной модели PATRIARCH.\n▪ Если эта модель в вашей армии, она должна быть вашим WARLORD.' },
  // Imperial Agents (4 assassins share one text)
  'callidus-assassin': { 'SHADOW ASSIGNMENT': 'Эту модель нельзя выбрать вашим WARLORD.\n\nЕсли фракция вашей армии — AGENTS OF THE IMPERIUM, то во время шага Declare Battle Formations вы можете заменить эту модель другой моделью OFFICIO ASSASSINORUM при условии, что суммарная стоимость в очках новой модели не превышает стоимости в очках заменяемой модели. Ваша армия не может содержать дубликаты одной и той же модели (т.е. после замены модели по этому правилу в вашей армии не может быть более 1 VINDICARE ASSASSIN, более 1 CULEXUS ASSASSIN, более 1 EVERSOR ASSASSIN и более 1 CALLIDUS ASSASSIN).' },
  'culexus-assassin': { 'SHADOW ASSIGNMENT': 'Эту модель нельзя выбрать вашим WARLORD.\n\nЕсли фракция вашей армии — AGENTS OF THE IMPERIUM, то во время шага Declare Battle Formations вы можете заменить эту модель другой моделью OFFICIO ASSASSINORUM при условии, что суммарная стоимость в очках новой модели не превышает стоимости в очках заменяемой модели. Ваша армия не может содержать дубликаты одной и той же модели (т.е. после замены модели по этому правилу в вашей армии не может быть более 1 VINDICARE ASSASSIN, более 1 CULEXUS ASSASSIN, более 1 EVERSOR ASSASSIN и более 1 CALLIDUS ASSASSIN).' },
  'eversor-assassin': { 'SHADOW ASSIGNMENT': 'Эту модель нельзя выбрать вашим WARLORD.\n\nЕсли фракция вашей армии — AGENTS OF THE IMPERIUM, то во время шага Declare Battle Formations вы можете заменить эту модель другой моделью OFFICIO ASSASSINORUM при условии, что суммарная стоимость в очках новой модели не превышает стоимости в очках заменяемой модели. Ваша армия не может содержать дубликаты одной и той же модели (т.е. после замены модели по этому правилу в вашей армии не может быть более 1 VINDICARE ASSASSIN, более 1 CULEXUS ASSASSIN, более 1 EVERSOR ASSASSIN и более 1 CALLIDUS ASSASSIN).' },
  'vindicare-assassin': { 'SHADOW ASSIGNMENT': 'Эту модель нельзя выбрать вашим WARLORD.\n\nЕсли фракция вашей армии — AGENTS OF THE IMPERIUM, то во время шага Declare Battle Formations вы можете заменить эту модель другой моделью OFFICIO ASSASSINORUM при условии, что суммарная стоимость в очках новой модели не превышает стоимости в очках заменяемой модели. Ваша армия не может содержать дубликаты одной и той же модели (т.е. после замены модели по этому правилу в вашей армии не может быть более 1 VINDICARE ASSASSIN, более 1 CULEXUS ASSASSIN, более 1 EVERSOR ASSASSIN и более 1 CALLIDUS ASSASSIN).' },
  'grey-knights-terminator-squad': { 'Rites of Teleportation': 'Если во время шага Declare Battle Formations к этому юниту присоединены один или более юнитов INQUISITOR, модели в этих юнитах имеют способность Deep Strike.' },
  'inquisitorial-agents': { 'INQUISITORIAL HENCHMEN': 'Если фракция вашей армии — не AGENTS OF THE IMPERIUM, то за каждый юнит Inquisitor, включённый в вашу армию, вы можете включить в неё один юнит INQUISITORIAL AGENTS, который не учитывается в числе юнитов RETINUE, которые может включать ваша армия (см. Assigned Agents).' },
  'voidsmen-at-arms': { 'NAVY BODYGUARD': 'Если фракция вашей армии — не AGENTS OF THE IMPERIUM, то за каждый юнит Voidfarers Character, включённый в вашу армию, вы можете включить в неё один юнит VOIDSMEN-AT-ARMS, который не учитывается в числе юнитов RETINUE, которые может включать ваша армия (см. Assigned Agents).' },
  // Orks
  'boyz': { 'BODYGUARD': 'Если начальная численность этого юнита — 20, вы можете присоединить к нему до двух юнитов Leader вместо одного (но только если один из них — юнит WARBOSS). Если вы это делаете и этот юнит уничтожен, присоединённые к нему юниты Leader становятся отдельными юнитами со своей исходной начальной численностью.' },
  'breaka-boyz': { 'ATTACHED UNIT': 'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Boyz, он может быть присоединён к этому юниту вместо этого.' },
  'ghazghkull-thraka': { 'SUPREME COMMANDER': 'Если этот юнит в вашей армии, его модель Ghazghkull Thraka должна быть вашим WARLORD.' },
  'wazdakka-gutsmek': { 'WAAAGH! WAZDAKKA': 'Если эта модель — ваш WARLORD, юниты Warbiker из вашей армии имеют ключевое слово Battleline.' },
  // T'au Empire
  'commander-farsight': { 'INDEPENDENT POWER': 'Если ваша армия включает COMMANDER FARSIGHT, она не может включать юниты Ethereal. Если ваша армия включает юниты ETHEREAL, она не может включать COMMANDER FARSIGHT.' },
  'kroot-carnivores': { 'BODYGUARD': 'Если начальная численность этого юнита — 20, вы можете присоединить к нему до двух юнитов Leader вместо одного при условии, что эти Leader не являются дубликатами (например, вы не можете присоединить к этому юниту двух WAR SHAPER). Если вы это делаете и этот юнит уничтожен, присоединённые к нему юниты Leader становятся отдельными юнитами со своей исходной начальной численностью.' },
  // Tyranids
  'deathleaper': { 'HUNTER ORGANISM': 'Эта модель не может быть вашим WARLORD.' },
}

export function localizeSheet(en, overlay, abilityNamesRu) {
  if (!en) return en
  const o = overlay || {}
  const names = { ...SHARED_RULE_NAMES, ...(abilityNamesRu || {}) }
  const s = { ...en }

  if (o.flavor) s.flavor = o.flavor
  if (o.transport) s.transport = o.transport
  if (o.loadout) s.loadout = o.loadout
  if (o.composition) s.composition = o.composition
  if (o.options) s.options = o.options
  if (o.damaged) s.damaged = { ...en.damaged, ...o.damaged }
  if (o.leader) s.leader = { ...en.leader, ...o.leader }

  // Abilities: translate the display name in the header from the global map and swap in the
  // translated text from this sheet's per-list overlay map, keyed by English name. An
  // overlay entry can also be { name, text } to override the header name for that entry.
  const localizeAbilities = (list, textMap) =>
    (list || []).map((a) => {
      const out = { ...a }
      // Translate the ability NAME directly in the card header. The global map is keyed by the
      // original English name; the per-sheet overlay's { name, text } form can override it
      // further (Necrons-style). The English original is kept in `nameEn` whenever the header
      // actually changed — everything AROUND an ability on screen (detachment rules, enhancements,
      // stratagems, the augmentation chips) stays English by project convention, so a translated
      // header with no original is the one name on the card that cannot be matched to the codex or
      // said out loud to an opponent. DatasheetCard renders it small, in brackets.
      if (names[a.name]) out.name = names[a.name]
      const overlay = textMap && textMap[a.name]
      if (typeof overlay === 'string') {
        out.text = overlay
      } else if (overlay) {
        if (overlay.name) out.name = overlay.name
        if (overlay.text) out.text = overlay.text
      }
      if (out.name !== a.name) out.nameEn = a.name
      // Fall back to the shared body only when this sheet still holds the exact English
      // it was written for (so worded-differently variants are never silently mistranslated).
      const shared = SHARED_RULE_TEXTS[a.name]
      if (shared && out.text === a.text && (a.text || '').trim() === shared.en) out.text = shared.ru
      return out
    })

  // Overlays were authored with both key spellings (`wargear`/`special` in the earlier
  // files, `wargearAbilities`/`specialAbilities` in later ones) — accept both, or the
  // short-form texts are silently ignored.
  if (en.abilities) s.abilities = localizeAbilities(en.abilities, o.abilities)
  if (en.wargearAbilities) s.wargearAbilities = localizeAbilities(en.wargearAbilities, o.wargearAbilities || o.wargear)
  if (en.specialAbilities) s.specialAbilities = localizeAbilities(en.specialAbilities, o.specialAbilities || o.special)
  // `rules` — standalone named datasheet rules, each rendered as its own card (see
  // DatasheetCard.vue), distinct from the grouped `specialAbilities` card. The shared
  // by-id text map covers the recurring structural plates; a faction's own `rules` entry
  // wins over it.
  if (en.rules) s.rules = localizeAbilities(en.rules, { ...RULE_TEXTS_BY_ID[en.id], ...o.rules })

  // `abilitySets` — Primarch/named-character "pick one" groups; heading = parent ability name.
  // Overlay: { [setName]: { name?: ruHeading, options: { [enName]: ruText | {name,text} } } }.
  // Option translations authored under the old `specialAbilities` map (before these abilities
  // were grouped into a set) still apply as a fallback, so overlays needn't be migrated.
  if (en.abilitySets) s.abilitySets = en.abilitySets.map((set) => {
    const so = (o.abilitySets && o.abilitySets[set.name]) || {}
    const textMap = { ...(o.specialAbilities || o.special || {}), ...(so.options || {}) }
    const out = { ...set, options: localizeAbilities(set.options, textMap) }
    if (names[set.name] || so.name) out.name = names[set.name] || so.name
    if (out.name !== set.name) out.nameEn = set.name
    return out
  })

  return s
}
