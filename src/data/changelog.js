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
  {
    version: '2.7.13',
    date: '2026-10-03',
    en: [
      { h: 'Rosters: archive' },
      'You can move a roster to the archive from the “⋯” menu on its card or page. The archive is a new tab after Drafts. Rosters in the archive are not checked for errors and do not appear when you pick a roster for a game. You can bring a roster back from the same menu.',
      { h: 'Roster builder' },
      'When you create a roster, you now pick the points limit first, before the faction. You can pick 1000, 2000, 3000, Custom or No limit. Each option lists its limits: Detachment Points, enhancements, unit copies and Battleline copies.',
      'No limit removes all limits. The roster shows only its total points.',
      'With Custom you can set your own limits. To do this, press the button next to the limit field. Such a roster has a mark next to its points on its card, and its page says “Custom limits apply” next to the points. Tap either to see the limits.',
      'If you lower the limit and your detachments no longer fit, the Next button does not work. The reason is shown next to it.',
      { h: 'Game tracker' },
      'When you pick a roster for a game, rosters over the battle size are hidden. Press “Show” to see them, and you can still pick one. If you make the battle size smaller after picking a roster, a warning appears under it.',
      'A roster with custom limits has its mark in the tracker too: in game setup, in the lobby and next to the Roster button during the game. Tap it in the game to see the limits.',
      'You can now open the rosters of a finished game. Open the game in History and tap a player’s roster. The back button returns you to the game.',
      { h: 'Fixes' },
      'Upgrades such as Furious Assault now work for the whole unit, including attached characters. If a squad has the upgrade, it also shows on its Leaders’ cards. If a character has it, it also shows on the squad’s card. This covers 30 upgrades in 17 factions.',
      'When you swap a Havoc’s heavy weapon, the old one now leaves the unit. Before, the new weapon was added next to it. The default loadout is fixed too: two Havocs have an autocannon and two have a lascannon. Before, every Havoc had an autocannon. Swaps on Imperial Navy Breachers, Purifier Squad and Sanctifiers also kept the old weapon, and Voidsmen-at-Arms had one lasgun too many.',
      'On a printed roster, stratagem descriptions no longer show service markup in square brackets and asterisks. Importing a list in WTC format no longer gives an enhancement to a second unit with the same name.',
      'In the Veiled Blade Elimination Force detachment, Eversor and Vindicare Assassins now get their Extremis abilities and cost 15 and 20 points more, as the detachment rule requires. Before, nobody could take those two.',
      'Imperial Agents as allies: each Inquisitor lets one Inquisitorial Agents unit, and each Voidfarers character one Voidsmen-at-Arms unit, not count towards the Retinue limit. Before, such a list showed an error. Inquisitorial Agents of 7–11 models now cost 120 points as allies, not 100.',
      'Intraneural Biotech now reads as in GW’s errata of 30 September: Heroic Intervention for this Eversor costs 1 CP less and does not block other uses of that Stratagem.',
      'A Leader’s list of units on a datasheet now shows every line of the rule. Four Inquisitors had lost “Imperium Battleline Infantry”, and 30 more datasheets had lost units the rule names.',
      'Importing a list where a character is written as “-> Name” under its unit now attaches the character to that unit. Before, such characters were lost.',
      'A Crisis team without drones no longer shows the Twin pulse carbine. This weapon belongs to the Gun Drone. Other drones and Tesla spheres had the same problem.',
      'Sir Hekhtur now has a row of his own under Canis Rex in a roster, in the builder and in a game. Tap it to open his card. Before, his card was not in rosters or games.',
      'In Red Corsairs Raiders, a power fist now replaces the reaver’s blade, and a meltagun replaces the boltgun. Before, both replaced the boltgun, and the blades stayed on the card. A unit of 10 can take up to two of each.',
      { h: 'Where the rules come from' },
      'Every datasheet on the site matches the official GW app. If a printed codex has it differently, I follow the app. Points come from the Munitorum Field Manual: GW says it is always the most accurate.',
    ],
    ru: [
      { h: 'Ростеры: архив' },
      'Ростер можно убрать в архив через меню «⋯» на его карточке или странице. Архив — это новая вкладка после «Черновиков». Ростеры в архиве не проверяются на ошибки и не появляются при выборе ростера на партию. Вернуть ростер из архива можно через то же меню.',
      { h: 'Конструктор ростеров' },
      'При создании ростера лимит очков теперь выбирается первым, до фракции. Можно выбрать 1000, 2000, 3000, «Свой» или «Без лимита». У каждого варианта указаны его ограничения: Detachment Points, улучшения, копии юнита и копии Battleline.',
      '«Без лимита» снимает все ограничения. Ростер показывает только сумму очков.',
      'При лимите «Свой» можно задать свои ограничения. Для этого нажмите кнопку рядом с полем лимита. У такого ростера на карточке рядом с очками есть значок, а на его странице рядом с очками написано «Действуют кастомные лимиты». Нажмите на любой из них, чтобы увидеть ограничения.',
      'Если вы уменьшили лимит и детачменты в него не помещаются, кнопка «Далее» не работает. Рядом с ней написана причина.',
      { h: 'Трекер партии' },
      'При выборе ростера на партию ростеры больше размера битвы скрыты. Нажмите «Показать», чтобы их увидеть, — такой ростер всё равно можно взять. Если уменьшить размер битвы после выбора ростера, под ним появится предупреждение.',
      'Значок кастомных лимитов теперь есть и в трекере: в настройке партии, в лобби и рядом с кнопкой «Ростер» во время игры. Нажмите на него в игре, чтобы увидеть ограничения.',
      'Ростеры сыгранной партии теперь можно открыть. Откройте партию в «Истории» и нажмите на ростер игрока. Кнопка «Назад» вернёт вас к партии.',
      { h: 'Исправления' },
      'Апгрейды вроде Furious Assault теперь действуют на весь отряд вместе с прикреплёнными персонажами. Если апгрейд у отряда, он виден и на карточках его лидеров. Если апгрейд у персонажа, он виден и на карточке отряда. Это касается 30 апгрейдов в 17 фракциях.',
      'Если заменить тяжёлое оружие у Havocs, старое теперь уходит из отряда. Раньше новое оружие добавлялось рядом со старым. Состав по умолчанию тоже исправлен: у двух Havocs autocannon, у двух — lascannon. Раньше autocannon был у каждого. Замены у Imperial Navy Breachers, Purifier Squad и Sanctifiers тоже оставляли старое оружие, а у Voidsmen-at-Arms был лишний lasgun.',
      'На печати ростера описания стратагем больше не показывают служебную разметку в квадратных скобках и звёздочках. Импорт списка в формате WTC больше не отдаёт улучшение второму отряду с тем же именем.',
      'В детачменте Veiled Blade Elimination Force ассасины Eversor и Vindicare теперь получают свои способности Extremis и стоят на 15 и 20 очков дороже, как требует правило детачмента. Раньше эти два улучшения никто не мог взять.',
      'Imperial Agents союзниками: каждый Inquisitor позволяет одному отряду Inquisitorial Agents, а каждый персонаж Voidfarers — одному отряду Voidsmen-at-Arms не считаться в лимит Retinue. Раньше такой ростер показывал ошибку. Inquisitorial Agents из 7–11 моделей союзником теперь стоят 120 очков, а не 100.',
      'Intraneural Biotech теперь звучит как в эррате GW от 30 сентября: Heroic Intervention для этого Eversor стоит на 1 CP дешевле и не мешает другим применениям этой стратагемы.',
      'Список отрядов для Leader на датащите теперь показывает все строки правила. У четырёх инквизиторов пропадала строка «Imperium Battleline Infantry», ещё у 30 датащитов пропадали отряды, которые правило называет.',
      'Импорт списка, где персонаж записан как «-> Имя» под своим отрядом, теперь прикрепляет персонажа к этому отряду. Раньше такие персонажи терялись.',
      'Отряд Crisis без дронов больше не показывает Twin pulse carbine. Это оружие Gun Drone. Та же ошибка была у других дронов и у Tesla spheres.',
      'Под Canis Rex теперь есть строка Sir Hekhtur — в ростере, в конструкторе и в партии. Нажмите на неё, чтобы открыть его карточку. Раньше его карточки не было ни в ростерах, ни в партии.',
      'У Red Corsairs Raiders power fist теперь заменяет reaver’s blade, а meltagun — boltgun. Раньше оба заменяли boltgun, и мечи оставались на карточке. В отряде из 10 моделей можно взять до двух того и другого.',
      { h: 'Откуда берутся правила' },
      'Все датащиты на сайте совпадают с официальным приложением GW. Если в печатном кодексе написано иначе, я беру вариант из приложения. Очки — из Munitorum Field Manual: GW говорит, что он всегда самый точный.',
    ],
  },
  {
    version: '2.7.12',
    date: '2026-10-02',
    en: [
      { h: 'Fixes' },
      'A Leader’s “this unit” rules now reach the unit he leads. For example, a Chaplain’s Litany of Hate gives [LANCE] to his squad’s melee weapons, and an Ancient gives his squad +1 OC. A second character attached to the same squad gets them too. Before, the roster showed them on the Leader’s own card only. I checked every such rule in the game: 40 of them, from the Librarian’s Psychic Hood to Stealth from a Fluxmaster.',
      'Weapon abilities limited to certain targets, such as [LETHAL HITS: non-MONSTER/VEHICLE] or [ANTI-MONSTER/VEHICLE 4+], used to show as plain text. Now they are tags like the others. Tap one to see the rule and, above it, which targets it works against.',
      'On a datasheet, weapon names and numbers are larger and in the same font as the characteristics. On a phone the tags run under the whole weapon row, so a long tag no longer breaks inside its frame.',
      'On a phone, a weapon with several profiles shows its name once, on a line of its own, and each profile under it by its own name: “standard”, “supercharge”. Weapon names there now almost never take two lines.',
      'On the patch notes page, pinning a faction in the faction list no longer switches the list from “All factions” to “My factions”.',
    ],
    ru: [
      { h: 'Исправления' },
      'Правила лидера про «this unit» теперь действуют на отряд, к которому он прикреплён. Например, Litany of Hate у капеллана даёт [LANCE] оружию ближнего боя всего отряда, а Ancient даёт отряду +1 OC. Второй персонаж, прикреплённый к тому же отряду, тоже их получает. Раньше конструктор показывал их только на карточке самого лидера. Я проверил все такие правила в игре — их 40, от Psychic Hood у библиариев до Stealth от Fluxmaster.',
      'Способности оружия с ограничением по целям, например [LETHAL HITS: non-MONSTER/VEHICLE] или [ANTI-MONSTER/VEHICLE 4+], показывались простым текстом. Теперь это такие же теги, как остальные. Нажмите на тег — откроется правило, а над ним сказано, против каких целей он действует.',
      'В листе данных названия оружия и цифры профиля крупнее и тем же шрифтом, что характеристики. На телефоне теги идут под всей строкой оружия, и длинный тег больше не ломается внутри рамки.',
      'На телефоне у оружия с несколькими профилями название теперь написано один раз, отдельной строкой, а под ним профили своими именами: «standard», «supercharge». Названия оружия там почти перестали переноситься на две строки.',
      'На странице изменений правил закрепление фракции в списке фракций больше не переключает его со «Всех фракций» на «Мои фракции».',
    ],
  },
  {
    version: '2.7.11',
    date: '2026-10-02',
    en: [
      { h: 'GW update of 2 October' },
      'GW updated the app and re-priced Space Marines on 2 October. 42 Space Marines units cost something else now, in every Chapter that fields them as well. The update has its own entry on the “[GW patch notes](/patches)” page, and the points PDF is rebuilt.',
      'Five detachment tags are gone: ACROBATIC (Aeldari), KABAL, WYCH CULT and COVENS (Drukhari), PURESTRAIN (Genestealer Cults). These detachments can now be taken together, and the roster builder no longer warns about it.',
      'The storm bolter of the Grey Knights, the Anathema Psykana Rhino and the Imperial Rhino has A2 instead of A3. The Death Company Captain’s power fist has A6 and WS 2+ instead of A3 and WS 3+. Tormentors have T5. Logan Grimnar’s storm bolter is a ranged weapon now. Wolf Guard Headtakers have new points and keywords. A storm shield for Thunderwolf Cavalry and Wolf Guard Terminators now costs 5 points a model; the roster builder counts it.',
      'On the patch notes page each update shows its release date, and added or removed detachment tags are listed with the other changes.',
      { h: 'All points in one file' },
      'On the same page the list now starts with “MFM 1.5 points · data 972”. Open it and press “Download” to get a PDF with the points of all 30 factions; the changes of the latest update are highlighted. The file is in the language the site is in.',
      { h: 'Roster: the Missions tab' },
      'A roster’s page has a new Missions tab. It lists five matchups for your list’s Force Disposition, one for each disposition your opponent can have. Each shows your Primary Mission and your opponent’s, and tapping one opens its card. If both players get the same mission, it is shown once.',
      'The disposition declared in the roster is ticked. If your detachments offer more than one, tap another to see its matchups — the list does not change. To declare it, press “Change” next to it and then “Save”.',
      { h: 'Primary Mission matrix' },
      'The Missions chapter of the Event Companion now opens its Primary Missions with the matrix: your disposition down the side, your opponent’s across the top, the mission in the cell. On a phone it is shown row by row. Tapping a mission scrolls to its card.',
      { h: 'Menu' },
      'The side menu on a phone is simpler: the Core Rules, the Event Companion and Combat Patrol are now sections of their own, not items inside “Rules”. Only the page you are on is highlighted.',
      'The Rules window in the bottom bar now links to “GW patch notes”.',
      'The contents of the Core Rules and of the Event Companion can be folded. The site remembers it for each of the two pages.',
      { h: 'Fixes' },
      'An allied Leader could not be attached to an allied unit. For example, in a Grey Knights list Watch Captain Artemis from Agents of the Imperium could not join an Aquila Kill Team. Now he can, and so can every allied Leader in any army.',
    ],
    ru: [
      { h: 'Обновление GW от 2 октября' },
      'GW 2 октября обновила приложение и цены Space Marines. У 42 юнитов Space Marines новые цены — и у всех орденов, которые их берут. На странице «[Изменения правил GW](/patches)» это отдельное обновление, а PDF с ценами пересобран.',
      'Сняты пять тегов детачментов: ACROBATIC (Aeldari), KABAL, WYCH CULT и COVENS (Drukhari), PURESTRAIN (Genestealer Cults). Такие детачменты теперь можно брать вместе, и конструктор больше не предупреждает об этом.',
      'Storm bolter у Grey Knights, Anathema Psykana Rhino и Imperial Rhino теперь A2 вместо A3. Power fist у Death Company Captain — A6 и WS 2+ вместо A3 и WS 3+. У Tormentors T5. Storm bolter у Logan Grimnar теперь оружие дальнего боя. У Wolf Guard Headtakers новые цены и ключевые слова. Storm shield у Thunderwolf Cavalry и Wolf Guard Terminators теперь стоит 5 очков за модель — конструктор это учитывает.',
      'На странице изменений правил у каждого обновления видна дата выхода, а добавленные и снятые теги детачментов показаны вместе с остальными изменениями.',
      { h: 'Все цены одним файлом' },
      'Там же список теперь начинается с блока «Цены из MFM 1.5 · данные 972». Откройте его и нажмите «Скачать» — это PDF с ценами всех 30 фракций, изменения последнего обновления выделены цветом. Файл на языке сайта.',
      { h: 'Ростер: вкладка «Миссии»' },
      'На странице ростера появилась вкладка «Миссии». Там пять матчапов для диспозиции вашего списка — по одному на каждую диспозицию соперника. В каждом видно вашу основную миссию и миссию соперника, нажатие открывает её карточку. Если миссия у обоих одна, она показана один раз.',
      'Диспозиция, заявленная в ростере, отмечена галочкой. Если детачменты дают несколько, нажмите на другую — вкладка покажет её матчапы, а список не изменится. Чтобы заявить её, нажмите появившуюся рядом кнопку «Сменить», а затем «Сохранить».',
      { h: 'Матрица основных миссий' },
      'В путеводителе по ивентам, в главе «Миссии», основные миссии теперь начинаются с матрицы: ваша диспозиция слева, диспозиция соперника сверху, в клетке миссия. На телефоне матрица показана по строкам. Нажатие на миссию прокручивает к её карточке.',
      { h: 'Меню' },
      'Боковое меню на телефоне стало проще: основные правила, путеводитель по ивентам и Комбат патруль теперь отдельные разделы, а не пункты внутри «Правил». Подсвечена только страница, на которой вы находитесь.',
      'В окне «Правила» в нижнем меню появилась ссылка на «Изменения правил GW».',
      'Содержание основных правил и путеводителя по ивентам можно свернуть. Сайт запомнит это для каждой из двух страниц.',
      { h: 'Исправления' },
      'Союзного Leader нельзя было прикрепить к союзному отряду. Например, в списке Grey Knights Watch Captain Artemis из Agents of the Imperium не прикреплялся к Aquila Kill Team. Теперь прикрепляется — как и любой союзный Leader в любой армии.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
