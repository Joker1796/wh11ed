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
    version: '2.7.6',
    date: '2026-09-30',
    en: [
      { h: 'Faction emblems' },
      'Every faction now has its emblem: in the faction lists, beside the name on a faction’s page and a Combat Patrol page, and stamped into the background of roster, game and Combat Patrol cards.',
      { h: 'Keywords in the rules' },
      'You can now tap a faction keyword in the text of rules, for example “Endless Multitude” in a Tyranids stratagem. A list of the units with this keyword opens. If you read from a roster, the units of your list come first.',
      { h: 'Rosters on a computer' },
      'On a wide screen the list of rosters, the open roster and a unit’s card stand side by side. While no roster is open, the right side shows your game statistics.',
      'When you come back to Rosters, the list you opened last opens again.',
      { h: 'Rosters' },
      'A faction picker is now above your lists. A list can be pinned to the top from its “…” menu. Lists show 20 at a time, “Show more” adds the next ones.',
      'The Statistics button moved from each roster’s page to the heading of the roster list.',
      'Import reads the Force Disposition written on a line of its own, as listhammer.info does. An imported list opens on its settings.',
      'If you save a list with no Force Disposition, the builder asks first.',
      { h: 'Tracker' },
      'The score in the game history is bigger, and the Back and Next buttons in the game setup now stay at the bottom of the screen.',
      'On a finished game’s screen the winner’s column used to be shorter. Now both are the same height.',
      'A big redesign of the tracker is still in progress.',
      { h: 'Animations' },
      'Tabs and pages change with a plain fade, without a sideways move. In the roster builder on a phone, the catalogue’s search no longer resets after the settings.',
    ],
    ru: [
      { h: 'Эмблемы фракций' },
      'У каждой фракции теперь своя эмблема: в списках фракций, рядом с названием на странице фракции и Комбат патруля, а на карточках ростеров, партий и наборов Комбат патруля — отпечатком на фоне.',
      { h: 'Ключевые слова в правилах' },
      'Ключевое слово фракции в тексте правил теперь можно нажать, например «Endless Multitude» в стратагеме Tyranids. Откроется список юнитов с этим словом. Если вы читаете из ростера, юниты вашего списка стоят первыми.',
      { h: 'Ростеры на компьютере' },
      'На широком экране список ростеров, открытый ростер и карточка юнита стоят рядом. Пока ростер не открыт, справа показывается статистика ваших партий.',
      'Когда вы возвращаетесь в «Ростеры», снова открывается последний лист.',
      { h: 'Ростеры' },
      'Над списками появился выбор фракции. Лист можно закрепить сверху через меню «…». Листы показываются по 20, «Показать ещё» добавляет следующие.',
      'Кнопка «Статистика» переехала со страницы ростера в шапку списка ростеров.',
      'Импорт читает Force Disposition, записанную отдельной строкой, как на listhammer.info. Импортированный лист открывается на настройках.',
      'Если сохранить лист без Force Disposition, конструктор сначала переспросит.',
      { h: 'Трекер' },
      'Счёт в истории партий стал крупнее, а кнопки «Назад» и «Далее» в настройке партии теперь всегда внизу экрана.',
      'Раньше на экране законченной партии колонка победителя была короче. Теперь обе одной высоты.',
      'Большой редизайн трекера по-прежнему в работе.',
      { h: 'Анимации' },
      'Вкладки и страницы сменяются простым затуханием, без сдвига вбок. В конструкторе на телефоне поиск в каталоге больше не сбрасывается после настроек.',
    ],
  },
  {
    version: '2.7.5',
    date: '2026-09-28',
    en: [
      { h: 'Unit search: examples and Russian nicknames' },
      'An empty unit search on a faction’s page and in the roster builder now shows example queries. The site search already did this.',
      'Russian nicknames of units, such as «бойз», «лендак» or «дред», now work in these two searches too. Before, only the site search understood them.',
      { h: 'Animations' },
      'The site is smoother now: buttons react to a tap, blocks open softly, pages and tabs change with an animation. The rules contents scrolls the page to the place instead of jumping. With “reduce motion” on in the system, there are no animations.',
      'The tracker does not have the new animations yet: a big redesign of it is on the way.',
      { h: 'Roster builder' },
      'Before, a Carnifex with two pairs of crushing claws showed “×2”, and it looked like 8 attacks. Now it shows two rows of 4 attacks. A model fights with only one melee weapon.',
      'Before, a bonus for a pair of weapons was only a note on the card. Now, if you took the pair, the bonus is in the numbers. This is Talos, Helbrute, Telemon, Wulfen Dreadnought and Knight Destrier.',
      'Before, five Flash Gitz showed “Choppa ×17”. Now it is “×5”. Tempestus Aquilons, Company Heroes and Imperial Navy Breachers are fixed too.',
      'Before, with Warrior Bioform Onslaught the Leader-beasts rule showed on the card of every Tyranids unit. Now it shows only on Tyranid Warriors and the Primes. Aspect Host and Kabalite Cartel are fixed the same way.',
      'The weapon profile window is now in the faction’s colour, and its table is larger on a phone.',
      { h: 'Factions' },
      'Before, a pinned faction or unit showed twice: in “Pinned” and in its own group. Now it is only in “Pinned”.',
      'The factions page now shows the same faction cards as the menu, in the factions’ colours. On a computer they are in four columns.',
      { h: 'Combat Patrol' },
      'The box cards are now in the factions’ colours. A box’s page is split into tabs: Rules, Stratagems, Enhancements, Units.',
      { h: 'Thank you' },
      'Thank you to everyone who sends bug reports and ideas: much of this update came from your messages. And thank you to everyone who supported the project with a donation: it gives me a lot of energy to keep going.',
    ],
    ru: [
      { h: 'Поиск юнитов: примеры и русские прозвища' },
      'В пустом поиске юнитов на странице фракции и в конструкторе теперь появляются примеры запросов. Так уже было в поиске по сайту.',
      'Русские прозвища юнитов, например «бойз», «лендак» или «дред», теперь работают и в этих двух поисках. Раньше их понимал только поиск по сайту.',
      { h: 'Анимации' },
      'Сайт стал плавнее: кнопки отзываются на нажатие, блоки раскрываются мягко, страницы и вкладки сменяются с анимацией. Содержание правил прокручивает страницу к нужному месту, а не перебрасывает. Если в системе включено «уменьшить движение», анимаций нет.',
      'Трекер пока без новых анимаций: для него готовится большой редизайн.',
      { h: 'Конструктор' },
      'Раньше у Карнифекса с двумя парами crushing claws стояло «×2», и казалось, что атак 8. Теперь там две строки по 4 атаки. В бою модель бьёт только одним оружием ближнего боя.',
      'Раньше бонус за пару оружия был только сноской в карточке. Теперь, если пара взята, бонус сразу в цифрах. Это Talos, Helbrute, Telemon, Wulfen Dreadnought и Knight Destrier.',
      'Раньше у пяти Flash Gitz стояло «Choppa ×17». Теперь «×5». Так же исправлены Tempestus Aquilons, Company Heroes и Imperial Navy Breachers.',
      'Раньше с Warrior Bioform Onslaught правило Leader-beasts стояло в карточке каждого юнита Tyranids. Теперь только у Tyranid Warriors и Primes. Так же исправлены Aspect Host и Kabalite Cartel.',
      'Окно с профилем оружия теперь в цвете фракции, а таблица в нём на телефоне крупнее.',
      { h: 'Фракции' },
      'Раньше закреплённые фракции и юниты стояли дважды: в «Закреплённых» и в своей группе. Теперь только в «Закреплённых».',
      'На странице фракций теперь такие же карточки в цветах фракций, как в меню. На компьютере они стоят в четыре колонки.',
      { h: 'Комбат патруль' },
      'Карточки наборов теперь в цветах фракций. Страница набора разделена на вкладки: Правила, Стратагемы, Улучшения, Юниты.',
      { h: 'Спасибо' },
      'Спасибо всем, кто присылает баг-репорты и идеи: многое в этом обновлении появилось благодаря вам. И спасибо всем, кто поддержал проект донатом: это очень заряжает меня делать его дальше.',
    ],
  },
  {
    version: '2.7.4',
    date: '2026-09-28',
    en: [
      { h: 'Search: units by ability and keyword' },
      'A unit can now be found by its abilities and keywords, not only by its name: type “deep strike”, “fly” or “Tide of Muscle”. This works in the site search, in the unit search on a faction’s page and in the roster builder’s unit list. The search by ability starts from the third letter.',
      { h: 'Roster builder' },
      'The builder’s columns now reach down to the points bar, on a phone and on a computer. Before, an empty strip stayed above the bar.',
      'Importing from listhammer now recognises wargear of three or more items written on one line, such as “Vexilla, Misericordia and Praesidium Shield” on Custodian Guard. Before, that line went to the unmatched wargear, and the option had to be picked by hand.',
      { h: 'Site' },
      'I fixed a caching error after site updates. If the site was open during an update, the menu buttons could stop responding and sections would not open. Only clearing the browser cache helped. Now the page reloads into the new version by itself.',
      { h: 'Checked a report: detachment points' },
      'A player reported that a 3000-point battle should allow 4DP, not 3. I checked it against the Warhammer 40,000 app. Onslaught allows 3DP, the same as Strike Force: only the points total grows. The site shows it correctly.',
    ],
    ru: [
      { h: 'Поиск: юниты по способностям и keywords' },
      'Юнит теперь можно найти не только по имени, но и по способностям и keywords: наберите «deep strike», «fly» или «Tide of Muscle». Это работает в поиске по сайту, в поиске юнитов на странице фракции и в списке юнитов конструктора. Поиск по способностям начинается с третьей буквы.',
      { h: 'Конструктор ростеров' },
      'Колонки конструктора теперь доходят до самой панели с очками, на телефоне и на компьютере. Раньше над панелью оставалась пустая полоса.',
      'Импорт с listhammer теперь узнаёт вооружение из трёх и более предметов, записанное одной строкой, например «Vexilla, Misericordia and Praesidium Shield» у Custodian Guard. Раньше такая строка попадала в несопоставленное вооружение, и вариант приходилось выбирать вручную.',
      { h: 'Сайт' },
      'Я исправил ошибку с кэшем после обновлений сайта. Если сайт был открыт во время обновления, кнопки в меню могли перестать нажиматься, а разделы — не открываться. Помогала только очистка кэша браузера. Теперь страница в таком случае сама перезагружается на новую версию.',
      { h: 'Проверил сообщение: очки детачментов' },
      'Игрок написал, что в битве на 3000 очков должно быть 4DP, а не 3. Я сверил это с приложением Warhammer 40,000. В Onslaught 3DP, как и в Strike Force: растёт только число очков. На сайте всё указано верно.',
    ],
  },
  {
    version: '2.7.3',
    date: '2026-09-27',
    en: [
      { h: 'Roster builder' },
      'The star button is gone from the unit list. Units from your collection are marked there with a star badge in the faction’s colour. To mark a unit, tap {btn:star} in its card, next to the close button.',
      'The Warlord is marked with a white flag badge under the unit’s name, and with a white label in the unit card. A unit with SUPREME COMMANDER becomes the Warlord by itself if the list has no Warlord yet. If you remove it, the flag goes to another unit with that rule.',
      'Broadside, Crisis Fireknife, Crisis Starscythe and Crisis Sunforge Battlesuits can take up to two items from their list for each model. Before, Broadsides got one pick for the whole unit, and Crisis suits could take more than allowed. A Broadside cannot carry a twin plasma rifle and a twin smart missile system together. Piranhas can take two seeker missiles per model, not one.',
      'The Legends Crisis and XV9 Hazard Battlesuits follow the same per-model limits. For Crisis Battlesuits the builder also reads the datasheet’s footnotes: at most three ranged weapons per model, and one of each starred item, counting the burst cannon swap.',
      'On a computer, a new list’s page no longer scrolls before you pick a faction.',
      'On phones up to 480px wide, the last row of both panes went under the points bar. Both panes now end above the bar.',
      { h: 'Combat Patrol: Maggot Lords' },
      'On the Maggot Lords page, Contagion Range is now 9" from the third battle round, as in the Codex. Before, it stayed at 6" there.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      'Кнопка-звёздочка из списка юнитов убрана. Юниты из вашей коллекции отмечены там бейджем со звёздочкой в цвете фракции. Отметить юнит можно звёздочкой {btn:star} в его карточке, рядом с крестиком.',
      'Варлорд отмечен белым бейджем с флажком под названием юнита, а в карточке юнита — белой плашкой. Юнит с правилом SUPREME COMMANDER сам становится варлордом, если варлорда в списке ещё нет. Если такой юнит удалить, флажок переходит к другому юниту с этим правилом.',
      'Broadside, Crisis Fireknife, Crisis Starscythe и Crisis Sunforge Battlesuits могут взять до двух предметов из списка на каждую модель. Раньше Broadside получали один выбор на весь отряд, а Crisis могли взять больше положенного. Одна модель Broadside не может нести twin plasma rifle и twin smart missile system вместе. Piranhas могут взять по две seeker missiles на модель, а не по одной.',
      'У Legends Crisis и XV9 Hazard Battlesuits действуют те же ограничения на модель. У Crisis Battlesuits конструктор учитывает и сноски датащита: не больше трёх стрелковых на модель и не больше одного каждого предмета со звёздочкой, считая замену burst cannon.',
      'На компьютере страница нового ростера больше не прокручивается, пока не выбрана фракция.',
      'На телефонах шириной до 480px последняя строка обеих колонок уходила под панель с очками. Теперь колонки заканчиваются над ней.',
      { h: 'Combat Patrol: Maggot Lords' },
      'На странице Maggot Lords Contagion Range с третьего раунда боя теперь 9", как в Кодексе. Раньше там оставалось 6".',
    ],
  },
  {
    version: '2.7.2',
    date: '2026-09-26',
    en: [
      { h: 'Roster builder: removing a detachment' },
      'When you remove a detachment while creating a list, units drop the enhancements that came with it. This already worked in the editor. Before, the new list showed an error instead, and the enhancement had to be removed by hand.',
      { h: 'Roster builder: warnings on a computer' },
      'On a wide screen the check mark next to the points turns yellow when the list is legal but still owes an answer, for example an undeclared Force Disposition. Before, it stayed green there.',
      { h: 'Roster builder: list settings' },
      'The first step of a new list and the Settings tab of the editor are now the same compact card. The detachment row shows the Detachment Points used in both places. On a phone the whole first step fits the screen.',
      { h: 'Roster builder: a worse invulnerable save no longer replaces a better one' },
      'If a rule gave a model a worse invulnerable save than it already had, the worse one was shown. For example, a Neurotyrant with Zoanthropes got 6+ from their Warp Field instead of its own 4+. Now the better one stays.',
      { h: 'Unit pages: base size' },
      'When the base size does not fit next to a unit’s name, it now sits right under the name. Before, it took a whole line as tall as the name.',
      { h: 'Event Companion: menu on a computer' },
      'The top menu now has a Doubles item, and FAQ opens the FAQ. Before, the FAQ item led to Doubles, and the FAQ had no item at all.',
      { h: 'Death Guard: Contagion Range' },
      'From the third battle round, Contagion Range is now 9". Before, both the faction page and the game tracker stopped at 6".',
      { h: 'Army rules: figures drawn as pictures' },
      'I checked every army and detachment rule where the GW app draws its figures as a picture. The World Eaters Blessings Martial Excellence, Warp Blades and Decapitating Strikes now list the triples they also accept. The T’au Drones section now has the Gun Drone and Missile Drone weapon profiles.',
    ],
    ru: [
      { h: 'Конструктор: снятие детачмента' },
      'Если снять детачмент при создании ростера, юниты теряют улучшения из этого детачмента. В редакторе так было и раньше. Раньше новый ростер вместо этого показывал ошибку, и улучшение приходилось снимать вручную.',
      { h: 'Конструктор: предупреждения на компьютере' },
      'На широком экране значок рядом с очками становится жёлтым, если список корректен, но в нём остался вопрос, например не заявлена Force Disposition. Раньше там оставалась зелёная галочка.',
      { h: 'Конструктор: настройки ростера' },
      'Первый шаг создания ростера и вкладка «Настройки» в редакторе теперь одна и та же компактная карточка. В строке детачмента в обоих местах видно, сколько Detachment Points потрачено. На телефоне первый шаг целиком помещается на экран.',
      { h: 'Конструктор: инвуль не ухудшается от чужих правил' },
      'Если правило даёт инвуль хуже того, что у модели уже есть, раньше показывался худший. Например, у Нейротирана с Зоантропами Warp Field ставил 6+ вместо его 4+. Теперь остаётся лучший.',
      { h: 'Страницы юнитов: размер базы' },
      'Если размер базы не помещается рядом с названием юнита, он стоит вплотную под названием. Раньше он занимал целую строку высотой с само название.',
      { h: 'Event Companion: меню на компьютере' },
      'В верхнем меню появился пункт Doubles, а пункт FAQ открывает FAQ. Раньше FAQ вёл на Doubles, а своего пункта у FAQ не было.',
      { h: 'Death Guard: Contagion Range' },
      'С третьего раунда боя Contagion Range теперь 9". Раньше и страница фракции, и трекер партии останавливались на 6".',
      { h: 'Правила армий: цифры с картинок' },
      'Я сверил все правила армий и детачментов, где приложение GW рисует цифры картинкой. У World Eaters в благословениях Martial Excellence, Warp Blades и Decapitating Strikes теперь указаны триплеты, на которые они тоже срабатывают. У T’au в разделе Drones появились профили оружия Gun Drone и Missile Drone.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
