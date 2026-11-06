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
    version: '2.10.12',
    date: '2026-11-07',
    en: [
      { h: 'Answers to bug reports' },
      '**In a game with strict rules you can score a mission that counts at the end of your opponent’s turn.** Defend Stronghold is one. In a game on two devices, your device asks about it when your opponent ends the turn. You can tick it until you do anything in your own turn. Before, such a mission could not be scored in that game.',
      '**[Watch Master](/factions/imperial-agents/datasheets/watch-master) in an Imperial Agents army can lead [Deathwatch Terminator Squad](/factions/imperial-agents/datasheets/deathwatch-terminator-squad).** Its Leader rule says so. But for Imperial Agents this unit is Legends. The GW app does not have it, and events usually do not allow it. [Watch Master](/factions/deathwatch/datasheets/watch-master) in a Deathwatch army does not lead Terminators.',
      { h: 'Account' },
      '**The site no longer signs you out by itself.** It happened when the site was open in two tabs or the connection dropped for a moment.',
    ],
    ru: [
      { h: 'Ответы на баг-репорты' },
      '**В игре по строгим правилам можно засчитать миссию, которая засчитывается в конце хода соперника.** Например, Defend Stronghold. В игре на двух устройствах ваше устройство само спросит о ней, когда соперник завершит ход. Отметить её можно, пока вы ничего не сделали в своём ходу. Раньше в такой игре её нельзя было засчитать.',
      '**[Watch Master](/factions/imperial-agents/datasheets/watch-master) в армии Imperial Agents может вести [Deathwatch Terminator Squad](/factions/imperial-agents/datasheets/deathwatch-terminator-squad).** Так написано в его правиле Leader. Но у Imperial Agents это юнит Legends. В приложении GW его нет, и на турнирах его обычно не разрешают. [Watch Master](/factions/deathwatch/datasheets/watch-master) в армии Deathwatch терминаторов не ведёт.',
      { h: 'Аккаунт' },
      '**Сайт больше не выходит из аккаунта сам.** Так бывало, когда сайт был открыт в двух вкладках или связь на миг пропадала.',
    ],
  },
  {
    version: '2.10.11',
    date: '2026-11-04',
    en: [
      { h: 'Answers to bug reports' },
      '**When two Characters lead one unit, the gear and enhancements of each reach the other too.** The Lion Helm on Azrael gives a 4+ InSv to the whole unit, the Lieutenant with him included. Before, only the Bodyguard models got it.',
      '**The file for Tabletop Simulator gives each model the wargear you chose for it.** Before, a Wolf Guard Terminator could get the power fist without the assault cannon it comes with.',
      '**Trygon Prime goes only on a Trygon that is a CHARACTER.** In Subterranean Assault you can make up to two Trygons Characters: pick “Character” on the unit. Such a Trygon can take Trygon Prime and can be your Warlord. Before, the roster builder gave Trygon Prime to any Trygon.',
      '**A bonus to Attacks or Damage reaches weapons whose value is a dice roll.** With Tzagulla the Sorcerer in Terminator Armour’s Infernal Gaze has D6+1 Attacks. Damage D3+3 with +1 shows as D3+4. Before, such weapons kept the printed value. If a rule does not change every weapon, the card says so beside it.',
      { h: 'The app on your phone' },
      '**The installed app opens on a bad connection too.** If the page you left last time does not load, the app opens the home page. Before, it could stay blank.',
      '**A section that does not load no longer leaves the button dead.** The app tries again by itself and then opens the section anew.',
      '**The menu says “Downloaded for offline” only when everything is downloaded.** If an update did not finish downloading, the menu offers to download again.',
      { h: 'Tracker' },
      '**You can tap what the tutorial lights up.** The tutorial closes and the tap works. Before, a tap on the lit name field did nothing.',
    ],
    ru: [
      { h: 'Ответы на баг-репорты' },
      '**Когда отряд ведут два персонажа, снаряжение и улучшения каждого действуют и на другого.** The Lion Helm у Azrael даёт 4+ InSv всему отряду, и Lieutenant рядом с ним тоже. Раньше его получали только телохранители.',
      '**Файл для Tabletop Simulator даёт каждой модели то снаряжение, которое вы ей выбрали.** Раньше Wolf Guard Terminator мог получить power fist без assault cannon, с которым он идёт в паре.',
      '**Trygon Prime можно взять только на Trygon, который стал CHARACTER.** В Subterranean Assault до двух Trygon можно сделать персонажами: выберите у юнита «Character». Такой Trygon может взять Trygon Prime и стать варлордом. Раньше конструктор давал Trygon Prime любому Trygon.',
      '**Прибавка к атакам и урону доходит до оружия, у которого в значении бросок кубика.** С Tzagulla у Infernal Gaze Sorcerer in Terminator Armour атаки D6+1. Урон D3+3 с прибавкой +1 показан как D3+4. Раньше у такого оружия оставалось напечатанное значение. Если правило меняет не всё оружие, на карточке рядом об этом написано.',
      { h: 'Приложение на телефоне' },
      '**Установленное приложение открывается и при плохой связи.** Если экран, который вы открывали в прошлый раз, не загрузился, приложение откроет главную. Раньше оно могло остаться пустым.',
      '**Раздел, который не загрузился, больше не оставляет кнопку без ответа.** Приложение само пробует ещё раз, а потом открывает раздел заново.',
      '**В меню написано «Скачано для офлайна», только когда скачано всё.** Если обновление скачалось не до конца, меню предложит скачать ещё раз.',
      { h: 'Трекер' },
      '**На то, что подсветило обучение, можно сразу нажать.** Обучение закроется, а нажатие сработает. Раньше нажатие на подсвеченное поле имени ничего не делало.',
    ],
  },
  {
    version: '2.10.10',
    date: '2026-11-02',
    en: [
      { h: 'Answers to bug reports' },
      '**Base sizes come from the GW app.** For Gyrfalcon Jetbike Sodality the app gives a 75×42mm oval. The kit’s page in the GW store says 90×52mm. The site shows the size from the app.',
      '**The Russian “until that unit has attacked” reads the same everywhere.** I fixed it in 13 faction rules and stratagems and in 2 places of the Core Rules.',
      '**Champion of the First Company can go only on a TERMINATOR CHARACTER.** Wolf Guard Terminators have no CHARACTER keyword, so they cannot take it. The GW app has it the same way.',
      { h: 'Units' },
      '**A faction’s units open on a bad connection too.** If a faction’s data does not load the first time, the site loads it again by itself. Before, the Units page and the unit card in the roster builder could stay empty.',
      { h: 'Tracker' },
      '**The Missions tab of a synced game no longer breaks.** This happened when one side’s data reached the phone incomplete.',
    ],
    ru: [
      { h: 'Ответы на баг-репорты' },
      '**Размеры подставок берутся из приложения GW.** У Gyrfalcon Jetbike Sodality там указан овал 75×42mm. На странице набора в магазине GW написано 90×52mm. Сайт показывает размер из приложения.',
      '**«Пока тот вражеский юнит не завершит свои атаки» теперь написано везде одинаково.** Раньше в части правил было «отатакует», «заатакует» или «не атакует». Я исправил 13 правил и стратагем армий и 2 места в основных правилах.',
      '**Champion of the First Company можно дать только персонажу с TERMINATOR.** У Wolf Guard Terminators нет keyword CHARACTER, поэтому им его не дать. В приложении GW так же.',
      { h: 'Юниты' },
      '**Юниты фракции открываются и при плохой связи.** Если данные фракции не загрузились с первого раза, сайт сам загружает их ещё раз. Раньше страница юнитов и карточка юнита в конструкторе могли остаться пустыми.',
      { h: 'Трекер' },
      '**Вкладка «Миссии» в синхронизированной игре больше не ломается.** Это случалось, когда данные одной из сторон приходили на телефон неполными.',
    ],
  },
  {
    version: '2.10.9',
    date: '2026-10-30',
    en: [
      { h: 'Roster builder' },
      '**A roster can go to Tabletop Simulator.** The “Export roster” window has a “File for Tabletop Simulator” button. Upload the file to yellowscribe.link and enter the code you get in the Yellowscribe mod. The models on the table get their profiles, weapons and abilities.',
      '**The export window opens on the format you chose last time.**',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Ростер можно перенести в Tabletop Simulator.** В окне «Экспорт листа» есть кнопка «Файл для Tabletop Simulator». Загрузите файл на yellowscribe.link и введите полученный код в мод Yellowscribe. Модели на столе получат характеристики, оружие и способности.',
      '**Окно экспорта открывается на формате, который вы выбрали в прошлый раз.**',
    ],
  },
  {
    version: '2.10.8',
    date: '2026-10-29',
    en: [
      { h: 'Roster builder' },
      '**The import reads every format the roster builder exports.** These are Russian tournament, Discord and Simple. Before, a Russian tournament list lost some of its units, and a Discord list did not import at all.',
      '**A Simple list has no model counts, so the import takes a unit’s size from its points.** If two sizes cost the same, the import window says the size was guessed.',
      '**A list marked Heretic Astartes imports as the legion it is.** The import tells by the detachment and the units. If the list does not say, it asks only among Chaos Space Marines, World Eaters, Death Guard, Thousand Sons and Emperor’s Children.',
      '**Agents of the Imperium, Aeldari, Titan Legions and Chaos Titan Legions lists no longer ask for their faction on import.**',
      { h: 'Tracker' },
      '**In a finished game, either side’s roster has a “…” menu: Export roster and Save to my rosters.** This is how you can keep your opponent’s list. If you save the same list again, the site asks first and links to the copy you already have.',
      '**On a wide screen a finished game’s roster opens in three columns: the game, the list and a unit’s card.** The game column shows every list of the game and the score. The Game stats button opens the score round by round.',
      '**You can compare two units side by side, also from different rosters of the game.** It works as on a faction’s unit list: press ◫ on the card, then pick the second unit.',
      '**On a wide screen the roster page of a game in progress shows the units and the card side by side.**',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Импорт читает все форматы, в которые конструктор выгружает лист.** Это «Русский турнир», Discord и «Простой». Раньше лист для русского турнира терял часть юнитов, а лист для Discord не импортировался совсем.',
      '**В «Простом» формате нет числа моделей, поэтому импорт берёт размер отряда по его очкам.** Если два размера стоят одинаково, окно импорта пишет, что размер угадан.',
      '**Лист с подписью Heretic Astartes импортируется как свой легион.** Импорт узнаёт его по детачменту и юнитам. Если по листу не понять, он спрашивает только среди Chaos Space Marines, World Eaters, Death Guard, Thousand Sons и Emperor’s Children.',
      '**Списки Agents of the Imperium, Aeldari, Titan Legions и Chaos Titan Legions больше не спрашивают фракцию при импорте.**',
      { h: 'Трекер' },
      '**В завершённой партии у ростера любой стороны есть меню «…»: «Экспорт листа» и «Сохранить к себе».** Так можно забрать себе лист соперника. Если сохранить тот же лист ещё раз, сайт сначала спросит и даст ссылку на уже сохранённый.',
      '**На широком экране ростер из завершённой партии открывается в три колонки: партия, лист и карточка юнита.** В колонке партии все её листы и счёт. Кнопка «Статистика партии» показывает очки по раундам.',
      '**Два юнита можно сравнить рядом, в том числе из разных ростеров партии.** Это работает как в списке юнитов фракции: нажмите ◫ на карточке и выберите второй юнит.',
      '**На широком экране страница ростера в идущей партии показывает юниты и карточку рядом.**',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
