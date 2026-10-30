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
  {
    version: '2.10.7',
    date: '2026-10-27',
    en: [
      { h: 'Whole site' },
      '**I found a way to stop Yandex Browser from translating the English version of the site automatically.** The EN switch now works with automatic translation turned on.',
      '**Inside another app’s browser the menu says where to install the app from.** Before, in the Yandex app the “Install app” button did nothing.',
      { h: 'Roster builder' },
      '**The roster builder checks who your army can include alongside whom, as the datasheets say.** Yvraine, The Visarch and The Yncarne cannot be in one army with an Epic Hero that is not Ynnari. Commander Farsight cannot be in one army with an Ethereal.',
      '**Some units are one per army.** These are Commissar Graves (mounted or on foot), Patriarch, Emperor’s Champion, Troupe Master, Death Jester and Shadowseer. In Ghosts of the Webway and Serpent’s Brood you can take up to three Troupe Masters, Death Jesters and Shadowseers.',
      '**The Devoted of Ynnead rules no longer show on the cards of Epic Heroes that are not Ynnari.**',
      '**On a unit card, what a core ability works against is a note under the Core line.** For example, “* vs mortal wounds and Psychic Attacks” under Feel No Pain 5+*. Before, a long one ran off a phone’s screen.',
      '**Modifiers in play and Possible modifiers fold like the Abilities.** Modifiers in play are open when the card opens.',
      { h: 'Datasheets' },
      '**I fixed the order of weapon profiles in a few places.**',
      '**Every hunter profile says what it hunts: “(vs MONSTER/VEHICLE)”.** The Chainfist, Thunder Hammer, Melta Rifle and Multi-melta of Dark Angels, Deathwatch and Space Wolves did not.',
      { h: 'Answers to bug reports' },
      'Does [Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) give +2” M only to the character? No. The enhancement says “This unit has”, not “This model has”. By the rules (19.04) this applies to the whole attached unit. So [Wulfen](/factions/space-wolves/datasheets/wulfen) with this character move 11”.',
      'The “Install app” button does nothing? The site is probably open inside another app, such as the Yandex app or VK. Such browsers cannot install apps. Open wh-rules.ru in Chrome or Yandex Browser and install the app from there.',
    ],
    ru: [
      { h: 'Весь сайт' },
      '**Я нашёл способ запретить Яндекс Браузеру автоматически переводить английскую версию сайта.** Переключатель EN теперь работает и при включённом автопереводе.',
      '**Если сайт открыт внутри другого приложения, меню подсказывает, откуда установить приложение.** Раньше в приложении Яндекс кнопка «Установить приложение» ничего не делала.',
      { h: 'Конструктор ростеров' },
      '**Конструктор проверяет, кого можно взять в одну армию, как написано в датащитах.** Yvraine, The Visarch и The Yncarne нельзя взять вместе с Epic Hero без Ynnari. Commander Farsight нельзя взять вместе с Ethereal.',
      '**Некоторые юниты можно взять только по одному.** Это Commissar Graves (верхом или пешком), Patriarch, Emperor’s Champion, Troupe Master, Death Jester и Shadowseer. В Ghosts of the Webway и Serpent’s Brood можно взять до трёх Troupe Master, Death Jester и Shadowseer.',
      '**Правила Devoted of Ynnead больше не показываются на карточках Epic Heroes без Ynnari.**',
      '**На карточке юнита условие способности из строки Core написано сноской под строкой.** Например, «* против смертельных ран и Psychic Attacks» под Feel No Pain 5+*. Раньше длинное условие уезжало за край экрана телефона.',
      '**Действующие и возможные модификаторы сворачиваются, как способности.** Действующие открыты, когда открываете карточку.',
      { h: 'Датащиты' },
      '**Я исправил порядок профилей оружия в нескольких местах.**',
      '**У каждого профиля hunter написано, против кого он: «(vs MONSTER/VEHICLE)».** У Chainfist, Thunder Hammer, Melta Rifle и Multi-melta у Dark Angels, Deathwatch и Space Wolves этого не было.',
      { h: 'Ответы на баг-репорты' },
      '[Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) даёт +2” M только персонажу? Нет. В тексте улучшения написано «This unit has», а не «This model has». По правилам (19.04) такое действует на весь объединённый отряд. Поэтому [Wulfen](/factions/space-wolves/datasheets/wulfen) с этим персонажем двигаются на 11”.',
      'Кнопка «Установить приложение» ничего не делает? Скорее всего, сайт открыт внутри другого приложения, например Яндекс или ВК. Такие браузеры не умеют устанавливать приложения. Откройте wh-rules.ru в Chrome или Яндекс Браузере и установите приложение оттуда.',
    ],
  },
  {
    version: '2.10.6',
    date: '2026-10-26',
    en: [
      { h: 'Roster builder' },
      '**[Tempestus Scions](/factions/astra-militarum/datasheets/tempestus-scions) led by a [Militarum Tempestus Command Squad](/factions/astra-militarum/datasheets/militarum-tempestus-command-squad) have [SUSTAINED HITS 1] on their ranged weapons.** The Tempestor Prime is in the Command Squad, and the card did not see him. Krieg units led by a Quartermaster Cadre with Medicae Servitors get Medi-packs the same way.',
      '**What an attached Leader carries reaches the card of the unit it leads.** For example, a Big Mek’s Kustom Force Field gives the Meganobz card its 4+ invulnerable save. Before, only the row in the list showed it.',
      '**A unit’s row in the list shows the weapon abilities its detachment gives, as its card does.** For example, in Darkflight Pursuit the ranged weapons of a Land Speeder or a Stormtalon Gunship have [IGNORES COVER]. Before, only the card showed it.',
      '**Two Shield Drones on one model add 2 to its Wounds.** On a Shas’ui in a Strike, Breacher or Pathfinder Team the card showed the bonus on two models, +1 W each. The same was true for Broadside and Crisis teams of several models.',
      '**When you print a roster, identical units share one unit card marked “×2”.** A unit in an attached unit always gets a card of its own.',
      { h: 'Tracker' },
      '**After the roll for the first turn, the Army tab shows each player their own army.** Before, if the second player won the roll, the army rule, the detachment rules and the list stayed with the other player.',
      { h: 'Answers to bug reports' },
      'Do Wulfen with [Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) stay at 9” M? I could not reproduce it. When the character with Wolf-Touched is attached to [Wulfen](/factions/space-wolves/datasheets/wulfen) in your list, they have 11”. If it keeps happening for you, please send a bug report with more details.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**[Tempestus Scions](/factions/astra-militarum/datasheets/tempestus-scions) под [Militarum Tempestus Command Squad](/factions/astra-militarum/datasheets/militarum-tempestus-command-squad) получают [SUSTAINED HITS 1] на дальнобойное оружие.** Tempestor Prime стоит в Command Squad, и карточка его не видела. Отряды Krieg под Quartermaster Cadre с Medicae Servitors так же получают Medi-packs.',
      '**Снаряжение присоединённого лидера видно на карточке отряда, который он ведёт.** Например, Kustom Force Field у Big Mek даёт карточке Meganobz 4+ InSv. Раньше это было видно только в строке списка.',
      '**Строка юнита в списке показывает способности оружия от детачмента, как и его карточка.** Например, в Darkflight Pursuit у Land Speeder и Stormtalon Gunship дальнобойное оружие получает [IGNORES COVER]. Раньше это было видно только на карточке.',
      '**Два Shield Drone на одной модели дают ей +2 W.** У Shas’ui в Strike, Breacher и Pathfinder Team карточка показывала бонус на двух моделях, по +1 W. То же было у Broadside и Crisis, если в отряде несколько моделей.',
      '**При печати ростера одинаковые юниты получают одну общую карточку с пометкой «×2».** Юнит в присоединённом отряде всегда печатается на своей карточке.',
      { h: 'Трекер' },
      '**После броска за первый ход вкладка «Армия» показывает каждому игроку его армию.** Раньше, если бросок выигрывал второй игрок, правило армии, правила детачментов и ростер оставались у соперника.',
      { h: 'Ответы на баг-репорты' },
      'Wulfen с [Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) остаются на 9” M? Я не смог это воспроизвести. Если персонаж с Wolf-Touched прикреплён к [Wulfen](/factions/space-wolves/datasheets/wulfen) в списке, у них 11”. Если у вас это повторяется, напишите, пожалуйста, подробнее в отчёте об ошибке.',
    ],
  },
  {
    version: '2.10.5',
    date: '2026-10-25',
    en: [
      { h: 'Roster builder' },
      '**A squad of 6–10 [Corsair Voidscarred](/factions/aeldari/datasheets/corsair-voidscarred) is built with its specialists.** The Shade Runner, Soul Weaver and Way Seeker are picked with the unit size. If your squad had specialists, pick its size again.',
      '**An option that needs a bigger unit says how many models it needs.**',
      '**An enhancement for its bearer and his unit no longer counts twice on the bearer.** With Wolf-Touched a Wolf Priest has +2” M, not +4”. 21 more enhancements had the same error.',
      '**A unit is offered only the enhancements its faction keyword allows.** For example, a Knight-Centura can no longer take a Custodes enhancement. If a unit already has one, the list marks it as an error.',
      '**Storm Shields, Shield Drones and other bearer wargear change the number on the card again.** Since 2.9.6 it stayed as printed.',
      '**A Legends unit can be led by every character its rule allows.** For example, a Captain and a Lieutenant can now lead Wolf Guard. The same goes for 20 more Legends units.',
      '**Cryptothralls, Tomb Crawlers, Servitors and similar units can join the unit their character leads.** It is “Join a unit” in the unit’s setup.',
      { h: 'Tracker' },
      '**The game setup ends with the Attacker and the Defender, as in the mission sequence.** The secondaries and the first turn are on the “Before the battle” tab.',
      '**Who goes first is marked after deployment.** Until it is, “Start Game” takes you to that step.',
      '**You invite the opponent from their card on the first step of a new game.** In a shared game each player picks secondaries on their own phone, and they show once the battle begins. The opponent’s missions can be read. Each phone chooses what it shows; the host decides only CP and phases.',
      '**A finished game goes to the history however you leave its screen.**',
      '**A game being set up leads the list of games.**',
      '**The Log and Stats tabs are switched on and off separately.**',
      '**Showing stratagems and spending CP on them are two settings.** Without the spending, the CP count has − and +. The “Base” preset works this way.',
      { h: 'Answers to your questions' },
      'Why can’t Corsair Voidscarred take a long rifle? Only a unit of 10 models can, and the specialists count towards the 10. The GW app says the same.',
      'Does Wolf-Touched make Wulfen faster? Yes, if the Wolf Priest is attached to them in your list.',
      'Why does Yandex Browser switch the site to Russian by itself? That is the browser’s automatic translation, not ours. The site now asks browsers not to translate it. If it still does, turn off automatic translation in the browser’s settings.',
      'Can a TOWERING or TITANIC model see over low terrain? No. A light or dense terrain feature blocks visibility whatever the height, both ways (13.10). Only an area one of the two models is within does not block. TOWERING only gives Plunging Fire within 12”.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Отряд [Corsair Voidscarred](/factions/aeldari/datasheets/corsair-voidscarred) из 6–10 моделей собирается со спецами.** Shade Runner, Soul Weaver и Way Seeker выбираются вместе с размером. Если у вас были спецы, выберите размер заново.',
      '**Опция, которой нужен отряд побольше, пишет, сколько моделей нужно.**',
      '**Улучшение на носителя и его отряд больше не считается у носителя дважды.** С Wolf-Touched у Wolf Priest +2” M, а не +4”. Так было ещё у 21 улучшения.',
      '**Юниту предлагаются только улучшения его фракционного ключевого слова.** Например, Knight-Centura больше не берёт улучшения Custodes. Уже выданное такое улучшение список отметит ошибкой.',
      '**Storm Shield, Shield Drone и другое снаряжение носителя снова меняют число на карточке.** С 2.9.6 оно оставалось как в датащите.',
      '**Отряд Legends ведут все персонажи, которых разрешает его правило.** Например, Wolf Guard теперь ведут Captain и Lieutenant. Так же ещё у 20 отрядов Legends.',
      '**Cryptothralls, Tomb Crawlers, Servitors и похожие отряды можно поставить в отряд, который ведёт их персонаж.** Это раздел «Войти в отряд» в настройке отряда.',
      { h: 'Трекер' },
      '**Настройка партии заканчивается на Attacker и Defender, как в последовательности миссии.** Вторичные и первый ход — на вкладке «Перед битвой».',
      '**Кто ходит первым, отмечается после расстановки.** Пока не отмечено, «Начать игру» ведёт к этому шагу.',
      '**Соперника можно пригласить с его карточки на первом шаге новой игры.** В совместной игре каждый выбирает вторичные на своём телефоне, они откроются в начале битвы. Миссии соперника можно читать. Каждый телефон сам выбирает, что показывать, хост решает только CP и фазы.',
      '**Законченная партия попадает в историю, как бы вы ни ушли с её экрана.**',
      '**Партия, которую настраивают, стоит первой в списке игр.**',
      '**Вкладки «Лог» и «Статистика» включаются по отдельности.**',
      '**Показ стратагем и трата CP на них — две настройки.** Без траты у счёта CP есть − и +. Так в пресете «Базовый».',
      { h: 'Ответы на вопросы' },
      'Почему у Corsair Voidscarred нет long rifle? Её берёт только отряд из 10 моделей, спецы входят в эти 10. Так же в приложении GW.',
      'Ускоряет ли Wolf-Touched отряд Wulfen? Да, если Wolf Priest прикреплён к нему в списке.',
      'Почему Яндекс Браузер сам переключает сайт на русский? Это автоперевод браузера, не наш. Сайт теперь просит его не переводить. Если переводит всё равно, выключите автоперевод в настройках браузера.',
      'Видит ли модель TOWERING или TITANIC поверх низкого террейна? Нет. Лёгкое или надёжное укрытие закрывает видимость при любой высоте, в обе стороны (13.10). Не закрывает только область, в которой стоит одна из моделей. TOWERING даёт только Plunging Fire в пределах 12”.',
    ],
  },
  {
    version: '2.10.4',
    date: '2026-10-23',
    en: [
      { h: 'Tracker' },
      '**The tracker has a custom battle size.** You can set the points limit, the Detachment Points and how many secondaries are drawn a turn: one, two or three. For example, 750 points with one secondary.',
      { h: 'Answers to your questions' },
      'Does the Farseer’s Branching Fates work on the Heavy Weapon Platform? Yes. Only the D-cannon Platform, Shadow Weaver Platform and Vibro Cannon Platform are SUPPORT WEAPON models. The platform in [Guardian Defenders](/factions/aeldari/datasheets/guardian-defenders) does not have this keyword.',
    ],
    ru: [
      { h: 'Трекер' },
      '**В трекере появился кастомный размер игры.** В нём можно задать лимит очков, DP и сколько вторичек берётся за ход: одну, две или три. Например, 750 очков и одна вторичка.',
      { h: 'Ответы на вопросы' },
      'Действует ли Branching Fates у Farseer на Heavy Weapon Platform? Да. SUPPORT WEAPON — это только D-cannon Platform, Shadow Weaver Platform и Vibro Cannon Platform. У платформы из отряда [Guardian Defenders](/factions/aeldari/datasheets/guardian-defenders) этого ключевого слова нет.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
