// Changelog / "What's New" — the source of truth for the update-notice banner AND the /changelog
// page. Bilingual, **newest entry first**: entry[0] is the latest release.
//
// HOW THE BANNER USES THIS: changelog.js ships inside the bundle, so `changelog[0].version` is always
// the newest note in the *currently running* build (it can never get ahead of the code). The banner
// shows when the visitor's stored "last seen version" differs from `changelog[0].version`; a
// first-ever visitor is seeded silently (no nag). See composables/useUpdateNotice.js.
//
// RELEASE PROCESS: when a deploy carries user-facing changes worth announcing, add a new entry at the
// TOP with the version it ships as (deploy.sh auto-bumps patch, so it's the next patch unless you
// bump manually) and a short EN/RU note list. Trivial/no-note deploys need no entry — they pass
// silently (the stored version advances without a banner). Keep notes short and player-facing.
//
// ONLY THE NEWEST FEW LIVE HERE: deploy.sh (step 0b, scripts/changelog-rollover.mjs) moves every entry
// past the fifth to wh11ed-api's archive, which the /changelog page fetches on request — DEPLOY.md,
// "Release notes archive". The rollover cuts this file by its layout: each entry opens on a line
// that is exactly `  {` — keep writing them that way.
//
// NOTE SHAPE: each `en`/`ru` item is either a plain string (a bullet) or `{ h: 'text' }` (a section
// heading, rendered without a bullet by ChangelogView). Keep the two locales structurally parallel —
// a heading at position i in `en` must be a heading at position i in `ru`.

export const changelog = [
  {
    version: '2.7.18',
    date: '2026-10-07',
    en: [
      { h: 'Roster builder: wargear' },
      'I reworked wargear in the unit editor. Each swap group starts with a row for the default weapon. Next to it you see how many models still carry it. Above the groups is only what cannot be replaced.',
      'For Havocs, the Stormboyz Nob and the Scout Bike Squad Sergeant the default weapons stand among the options. Take one off with “−” and put another on with “+”.',
      'Where six or more models can swap a weapon, you can type the number of swaps. Press the number between “−” and “+”.',
      'A swap only one model can make is now a choice of two rows, not a 0/1 counter.',
      'The builder keeps the “one per model” limits from datasheet footnotes, for example on the Knight Destrier and the Hive Tyrant. The extra option is greyed out.',
      'Swaps are fixed for the Wolf Guard Pack Leader, Deathwing Strikemaster, Chaos Bikers, Talos, Kratos, Hernkyn Pioneers and Secutarii Peltasts. If your roster has an impossible pick, the roster shows an error.',
      'The Deathwatch Terminator Squad no longer has a separate “Power Fist” option. The GW app does not accept it. If you had picked it, the pick is removed.',
      'Legends units now show their swap options as a list.',
      { h: 'Datasheets: who may join a unit' },
      'A unit’s datasheet has “Led by” and “Supported by” blocks. Where an enhancement allows the attachment, press “Character”. It opens the list of those who can take it.',
      'Chaos Space Marines Legends leaders can now join the Nemesis Claw and Red Corsairs Raiders, and the Inquisitor in Terminator Armour and Inquisitor Ostromandeus can join Sanctifiers.',
      { h: 'Roster builder: enhancements' },
      'An enhancement marked like “Archon model only” can now go on that unit only. Before, 36 such enhancements were offered to other units too, and 10 were closed to their own. A roster with an enhancement on the wrong unit shows an error.',
      'In Steel Hammer you can now make a Legends TITANIC tank a Character too, such as a Macharius or a Stormblade.',
      { h: 'Roster builder: leaders' },
      'The unit editor has a “Can be led by” block at the bottom. Press “+”, and the Character is added to your list already attached to this unit. Moving a Character from another unit now asks first.',
      'The “Can be led by” block was made by {who:Creego}, who sent it to the project on GitHub. He also moved the “Undo” offer after deleting a unit on a wide screen into the bottom bar. Thank you!',
      { h: 'Force Disposition' },
      'Six detachments, such as Vow-sworn Crusaders, had the wrong Force Disposition chip on the roster list and in the game setup. Now the chip is right, and the game setup has the Detachment Points too.',
    ],
    ru: [
      { h: 'Конструктор ростеров: снаряжение' },
      'Я переделал снаряжение в редакторе отряда. Каждая группа замен начинается со строки стандартного оружия. Рядом видно, у скольких моделей оно осталось. Над группами теперь только то, что заменить нельзя.',
      'У Havocs, Nob в Stormboyz и сержанта Scout Bike Squad стандартное оружие стоит среди вариантов. Снимите его «−» и наденьте другое «+».',
      'Если оружие могут заменить 6 и больше моделей, число замен можно набрать. Нажмите на число между «−» и «+».',
      'Замену, которую может сделать одна модель, теперь выбирают из двух строк, а не счётчиком 0/1.',
      'Конструктор соблюдает ограничения «на одну модель» из сносок датащитов, например у Knight Destrier и Hive Tyrant. Лишний вариант погашен.',
      'Исправлены замены у Wolf Guard Pack Leader, Deathwing Strikemaster, Chaos Bikers, Talos, Kratos, Hernkyn Pioneers и Secutarii Peltasts. Если в вашем ростере стоит невозможный выбор, ростер покажет ошибку.',
      'У Deathwatch Terminator Squad больше нет отдельного варианта «Power Fist». Приложение GW его не принимает. Если вы его выбирали, выбор снят.',
      'У отрядов Legends варианты замены теперь идут списком.',
      { h: 'Датащиты: кто может присоединиться' },
      'На датащите отряда есть блоки «Кто возглавляет» и «Кто поддерживает». Если присоединиться позволяет улучшение, нажмите «Персонаж». Откроется список тех, кто может его взять.',
      'Legends-лидеры Chaos Space Marines теперь могут присоединяться к Nemesis Claw и Red Corsairs Raiders, а Inquisitor in Terminator Armour и Inquisitor Ostromandeus — к Sanctifiers.',
      { h: 'Конструктор ростеров: улучшения' },
      'Улучшение с пометкой вроде «Archon model only» теперь можно дать только этому юниту. Раньше 36 таких улучшений предлагались и другим юнитам, а 10 были закрыты для своих. Ростер, где улучшение стоит не на том юните, покажет ошибку.',
      'В Steel Hammer персонажем теперь можно сделать и Legends-танк TITANIC, например Macharius или Stormblade.',
      { h: 'Конструктор ростеров: лидеры' },
      'Внизу редактора отряда есть блок «Кто может возглавить». Нажмите «+», и персонаж добавится в список уже прикреплённым к отряду. Перенос персонажа от другого отряда теперь требует подтверждения.',
      'Блок «Кто может возглавить» сделал {who:Creego} и прислал его в проект на GitHub. Ещё он перенёс плашку «Вернуть» после удаления отряда на широком экране в нижнюю панель. Спасибо!',
      { h: 'Force Disposition' },
      'У шести детачментов, например Vow-sworn Crusaders, не было верной плашки Force Disposition в списке ростеров и в настройке партии. Теперь она верная, а в настройке партии есть и очки детачмента.',
    ],
  },
  {
    version: '2.7.17',
    date: '2026-10-06',
    en: [
      { h: 'Roster builder' },
      'The list you edited last is now at the top of your lists. Pinned lists stay above it. Just opening a list does not move it.',
      'The “Fits the points left” filter now hides units that are already in your list too. A unit stays while one more copy of it fits. Before, units in the list were never hidden.',
    'The Rules tab of a roster now shows your detachments’ enhancements. Under each one you see which unit has taken it. If it is still free, you see which units can take it. The same shows in the builder under {btn:shield}.',
    'The faction filter on your lists is now remembered. The page opens on the faction you picked last time.',
    'The Tankbustas Nob now swaps only one Rokkit Pistol for a Smash Hammer. Before, both pistols disappeared.',
    { h: 'Faction rules' },
    'Faction rule texts now match the GW app word for word. What the app applies on its own is in an “Also applies” plate under the rule: keywords units gain, limits on allied units, which units an enhancement’s bearer can join, an enhancement’s weapon.',
    '“Hide lore” now hides lore inside rules too. Before, Tyranids lore stayed in the army rule and in the Vanguard Onslaught detachment.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      'Список, который вы меняли последним, теперь стоит первым. Закреплённые списки по-прежнему выше всех. Если список просто открыть, он не сдвигается.',
      'Фильтр «Влезает в остаток» теперь прячет и юниты, которые уже есть в списке. Юнит остаётся, пока влезает ещё одна его копия. Раньше юниты из списка не прятались никогда.',
    'На вкладке «Правила» в ростере теперь есть улучшения ваших детачментов. Под каждым написано, какой юнит его взял. Если улучшение свободно, написано, какие юниты могут его взять. То же видно в конструкторе по кнопке {btn:shield}.',
    'Фильтр по фракции в списке ростеров теперь запоминается. Страница открывается на той фракции, которую вы выбрали в прошлый раз.',
    'У Tankbustas ноб теперь меняет на Smash Hammer только один Rokkit Pistol. Раньше пропадали оба.',
    { h: 'Правила фракций' },
    'Текст правил фракций теперь совпадает с приложением GW слово в слово. То, что приложение применяет само, вынесено в плашку «Действует также» под правилом: ключевые слова для юнитов, лимиты на союзников, к каким отрядам можно присоединить носителя улучшения, оружие улучшения.',
    'Кнопка «скрыть лор» теперь прячет и лор внутри правил. Раньше у Tyranids он оставался в правиле армии и в детачменте Vanguard Onslaught.',
    ],
  },
  {
    version: '2.7.16',
    date: '2026-10-05',
    en: [
      { h: 'Roster builder' },
      'You can now take the Nightforged Battery Upgrade up to three times, like any other Upgrade. It is in the Dark Angels Darkflight Pursuit detachment. Before, the roster builder let you take it only once.',
      'The mistake came from the data of the official GW app. There, this Upgrade is limited to one copy. All the other Upgrades there are limited to three. By the muster rules, you can take any Upgrade up to three times.',
      { h: 'Points' },
      'The Munitorum Field Manual was updated today. No prices changed. GW fixed one label: Gretchin cost 80 points for 20 models. Before, the Orks unit page said 11 models.',
      { h: 'Tracker: Doubles and shared games' },
      'A shared game can now be Doubles. Before you open the lobby, enter your name and choose the game type. For Doubles, also enter the names of both teams.',
      'On the join screen, seats are grouped by team. Free seats have a dashed border. The first seat of the host’s team is the host’s.',
      'In Doubles, one phone fills in both armies of a team. The screens now say so.',
      '“Close the lobby” now cancels the shared game completely. The players who joined leave, and the setup is not kept.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      'Upgrade Nightforged Battery теперь можно взять до трёх раз, как любой другой Upgrade. Он есть в детачменте Dark Angels Darkflight Pursuit. Раньше конструктор давал взять его только один раз.',
      'Ошибка пришла из данных официального приложения GW. Там у этого Upgrade стоит лимит в одну копию. У всех остальных Upgrade там стоит три. По правилам сбора армии любой Upgrade можно взять до трёх раз.',
      { h: 'Очки' },
      'Сегодня обновился Munitorum Field Manual. Цены не изменились. GW исправили одну подпись: Gretchin стоят 80 очков за 20 моделей. Раньше на странице юнита у орков было написано 11 моделей.',
      { h: 'Трекер: парная и совместная игра' },
      'Совместную игру теперь можно начать в парном формате. Перед запуском лобби впишите своё имя и выберите тип игры. Для парной игры впишите ещё названия обеих команд.',
      'На экране подключения места сгруппированы по командам. Свободные места обведены пунктиром. Первое место в команде хоста занято хостом.',
      'В парной игре обе армии команды заполняет один телефон. Теперь это написано на экране.',
      '«Закрыть лобби» теперь отменяет совместную игру целиком. Подключившиеся игроки выходят, настройка не сохраняется.',
    ],
  },
  {
version: '2.7.15',
    date: '2026-10-05',
    en: [
      { h: 'Space Marines detachments' },
      'The pages of Deathwatch, Blood Angels, Dark Angels, Space Wolves and Black Templars now have the Space Marines detachments. Before, they had only the Chapter’s own.',
      'Detachment lists show the army’s own detachments first, then the Space Marines ones. This is the same on faction pages, in the roster builder and in the tracker.',
      'A Deathwatch list can no longer take Deathwatch Support. By the rules, only the Space Marines and the other Chapters can take it. Its rules are still on the Deathwatch page.',
      { h: 'Roster builder' },
      'The points you have left are now shown under the total. You can turn this off in the roster settings.',
      { h: 'Colours' },
      'I worked on the colours. Grey captions are easier to read in both themes. A faction’s colour in text is a little darker. Buttons in the dark theme are a little darker too.',
    ],
    ru: [
      { h: 'Детачменты Space Marines' },
      'На страницах Deathwatch, Blood Angels, Dark Angels, Space Wolves и Black Templars теперь есть детачменты Space Marines. Раньше там были только детачменты самого ордена.',
      'В списках детачментов сначала идут детачменты армии, потом детачменты Space Marines. Так на страницах фракций, в конструкторе ростеров и в трекере.',
      'В список Deathwatch больше нельзя взять Deathwatch Support. По правилам его берут только Space Marines и другие ордены. Его правила по-прежнему есть на странице Deathwatch.',
      { h: 'Конструктор ростеров' },
      'Под итогом очков теперь видно, сколько очков осталось. Это можно выключить в настройках ростера.',
      { h: 'Цвета' },
      'Я поработал над цветами. Серые подписи стало легче читать в обеих темах. Цвет фракции в тексте стал чуть темнее. Кнопки в тёмной теме тоже стали чуть темнее.',
    ],
  },
  {
    version: '2.7.14',
    date: '2026-10-05',
    en: [
      { h: 'Unit cards on narrow phones' },
      'On phones about 360px wide, a Legends unit card did not fit the screen, and the page scrolled sideways. Now on a narrow screen the Legends badge stands upright to the right of OC. On the narrowest phones it moves under the characteristics.',
      'The weapons table now stays a table on every phone. Before, on phones narrower than 360px it turned into cards, one for each weapon. Long weapon names wrap to a second line.',
      { h: 'Search' },
      'Search results take less space: a phone screen shows almost twice as many units. If a unit was found by a nickname or an ability, that word now stands in the line with the faction, not on a line of its own.',
      { h: 'Roster builder' },
      'If you untick “Check legality”, the roster is not checked at all: no errors, no warnings, and points over the limit are not red. Instead the roster has an “Unchecked” mark. Before, the box only lifted the limit on unit copies.',
      'When you pick a detachment, each one has a {btn:info} button on the right. It opens the detachment’s rule, enhancements and stratagems, so you can read a detachment before you take it. The button is in the roster builder and in the tracker’s game setup.',
      'Before, a Grey Knights Purifier Squad of ten showed no number next to its Nemesis force weapon if the squad took psycannons. Now the number is there. A Black Templars Crusader Squad had the same problem with its close combat weapon.',
      'I checked every unit’s default wargear against the text of its datasheet and found eight more errors. Before, a Land Raider had one Godhammer lascannon instead of two, and a World Eaters Defiler one excruciator cannon instead of two. Commissar Graves, Intranzia Fraye, Cthonian Earthshakers, Corsair Voidscarred and Gellerpox Infected had similar errors. Now the numbers match the datasheet, and Wolf Guard Headtakers without wolves no longer show the wolves’ weapon.',
      'I also checked every wargear swap. Before, some swaps added the new weapon but did not remove the old one. This happened when the weapon came from another swap, for example a Death Company Marine’s bolt pistol for a hand flamer. Fire Dragons had the same problem with the Exarch’s fusion gun. Now the old weapon goes away.',
      'GW’s PDF has an error on two Legends units. Cultist Mob with Firearms is printed with the plain Cultist Mob’s weapons, and Munitorum Servitors that take a heavy weapon are left with no melee weapon. I fixed this in the roster builder: the cultists start with autoguns, and servitors with a heavy weapon get a close combat weapon. The datasheet text stays as GW printed it.',
      'The list export has a new “Simple” format, like War Organ’s. It has only the name, the faction, the detachments and one line per unit with its points, no wargear.',
    ],
    ru: [
      { h: 'Карточка юнита на узком телефоне' },
      'На телефонах шириной около 360px карточка юнита Legends не помещалась в экран, и страница прокручивалась вбок. Теперь на узком экране бейдж Legends стоит вертикально справа от OC. На самых узких телефонах он уходит под характеристики.',
      'Таблица оружия теперь остаётся таблицей на любом телефоне. Раньше на телефонах уже 360px она превращалась в карточки, по одной на каждое оружие. Длинные названия оружия переносятся на вторую строку.',
      { h: 'Поиск' },
      'Результаты поиска занимают меньше места: на экран телефона помещается почти вдвое больше юнитов. Если юнит найден по прозвищу или способности, это слово теперь стоит в строке с фракцией, а не отдельной строкой.',
      { h: 'Конструктор ростеров' },
      'Если снять галочку «Проверять легитимность», ростер не проверяется совсем: нет ни ошибок, ни предупреждений, превышение очков не подсвечивается красным. Вместо этого у ростера стоит пометка «Без проверок». Раньше галочка снимала только лимит копий юнита.',
      'При выборе детачмента у каждого справа есть кнопка {btn:info}. Она открывает правило детачмента, его улучшения и стратагемы, и детачмент можно прочитать до того, как взять. Кнопка есть в конструкторе и при настройке партии в трекере.',
      'Раньше у Purifier Squad из Grey Knights в десять моделей не было числа рядом с Nemesis force weapon, если отряд брал Psycannon. Теперь число есть. У Crusader Squad из Black Templars так же было с close combat weapon.',
      'Я сверил снаряжение по умолчанию у всех отрядов с текстом их датащитов и нашёл ещё восемь ошибок. Раньше у Land Raider был один Godhammer Lascannon вместо двух, у Defiler из World Eaters — один excruciator cannon вместо двух. Похожие ошибки были у Commissar Graves, Intranzia Fraye, Cthonian Earthshakers, Corsair Voidscarred и Gellerpox Infected. Теперь числа совпадают с датащитом, а Wolf Guard Headtakers без волков больше не показывают оружие волков.',
      'Ещё я проверил все замены снаряжения. Раньше некоторые замены добавляли новое оружие, но не убирали старое. Так было, если менялось оружие, которое пришло из другой замены, например у Death Company Marines bolt pistol на hand flamer. У Fire Dragons так было с фузганом экзарха. Теперь старое оружие при замене уходит.',
      'В PDF от GW у двух отрядов Legends ошибка. Cultist Mob with Firearms напечатан с оружием обычного Cultist Mob, а у Munitorum Servitors после замены на тяжёлое оружие не остаётся оружия ближнего боя. В конструкторе я это поправил: культисты начинают с autogun, а сервиторы с тяжёлым оружием получают close combat weapon. Текст датащита оставил как у GW.',
      'В экспорте листа появился формат «Простой», как в War Organ. В нём только название, фракция, детачменты и по строке на юнит с его очками, без снаряжения.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
