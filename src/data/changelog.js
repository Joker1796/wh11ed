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
// bump manually) and a short EN/RU note list. Trivial/无-note deploys need no entry — they pass
// silently (the stored version advances without a banner). Keep notes short and player-facing.
//
// NOTE SHAPE: each `en`/`ru` item is either a plain string (a bullet) or `{ h: 'text' }` (a section
// heading, rendered without a bullet by ChangelogView). Keep the two locales structurally parallel —
// a heading at position i in `en` must be a heading at position i in `ru`.

export const changelog = [
  {
    version: '2.2.5',
    date: '2026-08-07',
    en: [
      'Follow-up correctness pass on the rules data: Las-talon range corrected back to 36", Repentia Squad\'s Catechism of Divine Penitence attachment restored, Game Tracker deployment-point budgets fixed for three Space Marine Chapter detachments, and base-size notes added for a few multi-model units.',
    ],
    ru: [
      'Дополнительная сверка данных правил: дальность Las-talon возвращена на 36", восстановлена фраза о прикреплении Catechism of Divine Penitence к Repentia Squad, исправлен бюджет очков развёртывания в трекере для трёх детачментов SM-глав, добавлены пометки о базах для нескольких многомодельных юнитов.',
    ],
  },
  {
    version: '2.2.4',
    date: '2026-08-06',
    en: [
      'Rules data updated to match the latest Warhammer 40,000 app release (v2.4.0) — points, unit stats, wargear options and rule text refreshed across all factions, plus 4 new Aeldari Exodite units (Clanblade, Dragon Knights, Leystalker, Stonesinger).',
    ],
    ru: [
      'Данные правил обновлены под последний релиз приложения Warhammer 40,000 (v2.4.0) — очки, характеристики юнитов, варианты вооружения и тексты правил освежены по всем фракциям, плюс 4 новых юнита Aeldari Exodites (Clanblade, Dragon Knights, Leystalker, Stonesinger).',
    ],
  },
  {
    version: '2.2.3',
    date: '2026-08-05',
    en: [
      'Search now recognizes many more Russian nicknames and transliterations for datasheet units — dozens of additional named characters plus class-wide coverage for several vehicle and troop types (Necrons, Orks and others).',
    ],
    ru: [
      'Поиск теперь понимает больше русских прозвищ и транслитераций для юнитов на датащитах — добавлены десятки именных персонажей и покрытие для нескольких типов техники и пехоты целыми классами (Necrons, Orks и другие).',
    ],
  },
  {
    version: '2.2.2',
    date: '2026-08-02',
    en: [
      { h: 'New' },
      'Search now finds sub-rule headings inside faction/detachment rules (Vows, Doctrines, Stances and the like) and jumps straight to them, and it now covers Combat Patrol content too (rules, stratagems, enhancements) — previously missing.',
      'Datasheet keywords are now clickable — tap one to see every other unit in the faction sharing it, linking straight to that unit\'s page.',
      'The Turn Structure diagram (Battle Round, 07.02) was rebuilt as a lightweight live diagram instead of large per-language image banners — sharper, and much smaller to download.',
      'Search now understands Russian nicknames and transliterations for named characters and unit types (e.g. Ghazghkull → Газя, Terminator → термос, Abaddon → Абба) — unit names still display in English, but you can now search for them in Russian.',
      'The /changelog page now shows the 5 most recent versions with a "Show more" button instead of the full history at once.',
      { h: 'Fixes' },
      'Long unit names in the "Units" dropdown (e.g. "Overlord with Translocation Shroud") no longer get cut off.',
      'Tiny, illegible ability/weapon keyword badges on datasheets (e.g. [DEVASTATING WOUNDS], Deep Strike, Leader) are now readable.',
      'Unit names with a base size (e.g. "(⌀50mm)") no longer wrap awkwardly with the last word of the name dragged onto the base size\'s line.',
      'The EN/RU language switch is a bit wider, with more breathing room around the labels.',
      'Fixed a Russian-translation slip: several rules used the word for "permit/allow" where the English said "resolve" (carry out an attack/ability) — it read like the rule granted permission instead of describing an action. Affected the battle round diagram, a Combat Patrol enhancement, and a handful of faction FAQ entries.',
    ],
    ru: [
      { h: 'Новое' },
      'Поиск теперь находит заголовки под-правил внутри правил фракций/детачментов (Vows, Doctrines, Stances и т.п.) и сразу переходит к нужному месту, а также охватывает контент Combat Patrol (правило, стратагемы, улучшения) — раньше их не было в поиске.',
      'Ключевые слова на датащитах теперь кликабельны — по клику открывается список всех остальных юнитов фракции с этим ключевым словом со ссылками на их страницы.',
      'Диаграмма «Структура хода» (боевой раунд, 07.02) переделана в лёгкую живую диаграмму вместо больших картинок-баннеров для каждого языка — стала чётче и заметно легче для загрузки.',
      'Поиск теперь понимает русские прозвища и транслитерации имён именных персонажей и типов юнитов (например, Ghazghkull → Газя, Terminator → термос, Abaddon → Абба) — названия юнитов по-прежнему отображаются на английском, но искать их теперь можно и по-русски.',
      'Страница /changelog теперь показывает 5 последних версий с кнопкой «Показать ещё» вместо всей истории сразу.',
      { h: 'Исправления' },
      'Длинные названия юнитов в выпадающем списке «Юниты» (например, «Overlord with Translocation Shroud») больше не обрезаются многоточием.',
      'Мелкие нечитаемые бейджи способностей/оружия на датащитах (например, [DEVASTATING WOUNDS], Deep Strike, Leader) стали читаемыми.',
      'Названия юнитов с размером базы (например, «(⌀50mm)») больше не переносятся некрасиво, утаскивая последнее слово названия на строку с размером базы.',
      'Переключатель языка EN/RU стал чуть шире — больше воздуха вокруг букв.',
      'Исправлена ошибка перевода: в нескольких местах вместо «разыграть» (совершить атаку/способность) стояло «разрешить» (в смысле «позволить») — из-за этого правило читалось как разрешение, а не как действие. Задело диаграмму боевого раунда, одну из улучшений Combat Patrol и несколько записей FAQ фракций.',
    ],
  },
  {
    version: '2.2.1',
    date: '2026-08-02',
    en: [
      'Mobile menu: "Rules" now expands into three separate collapsible sections — Core Rules, Event Companion and Combat Patrol — each with its own chapter list, instead of one long combined list.',
    ],
    ru: [
      'Мобильное меню: раздел «Правила» теперь раскрывается на три отдельных сворачиваемых пункта — «Основные правила», «Путеводитель по ивентам» и «Комбат патруль» — каждый со своим списком глав, вместо одного длинного общего списка.',
    ],
  },
  {
    version: '2.2.0',
    date: '2026-08-02',
    en: [
      { h: 'Core Rules & Event Companion' },
      'Core Rules and the Event Companion are now each a single scrolling page instead of seven separate ones — a table of contents at the top (also reachable any time from a floating button), and on desktop the rules flow in two columns so there\'s less scrolling to read a section.',
      'The Event Companion\'s "Teams" chapter is now reachable from the navigation and search — previously it only existed as a direct link.',
      'Core Rules illustrations (attack sequence diagrams, terrain placement, charge/pile-in/fight/consolidation moves and more) were replaced with official artwork from GW\'s own app instead of older PDF crops — noticeably sharper.',
      { h: 'Presentation' },
      'Move/Shooting/Charge/Fight/Deploy "type" rule cards (Normal Move, Assault Shooting, Disembark Move, etc.) have a new look — a dark header distinct from stratagem cards, easier to spot at a glance while flipping through a phase.',
      'The small xx.xx.xx sub-rule blocks changed color from yellow/gold to a muted grey-olive tone.',
      'Fixed several places where two-column desktop/tablet layout made text overlap or tables/cards too cramped (Battlefields, Advanced Rules, Reference, Muster).',
      'The search/language/lore/theme buttons in the header are now a consistent size, and the language switch is now a slider instead of a single letter — the current language reads at a glance.',
      { h: 'Fixes' },
      'Fixed jumping to a Core Rules section from another page (e.g. a "(NN.NN)" cross-reference or the FAQ) sometimes landing on the wrong section.',
    ],
    ru: [
      { h: 'Core Rules & Event Companion' },
      'Основные правила и Путеводитель по ивентам теперь каждый — одна длинная прокручиваемая страница вместо семи отдельных: оглавление наверху (и в любой момент — по плавающей кнопке), а на десктопе текст идёт в две колонки, чтобы меньше скроллить.',
      'Раздел «Teams» в Путеводителе по ивентам теперь виден в навигации и поиске — раньше на него можно было попасть только по прямой ссылке.',
      'Иллюстрации основных правил (диаграммы боевой последовательности, расстановка террейна, движения при charge/pile-in/fight/consolidation и другие) заменены на официальную графику из приложения ГВ вместо старых кропов PDF — стали заметно чётче.',
      { h: 'Оформление' },
      'Карточки правил-«типов» (Normal Move, Assault Shooting, Disembark Move и т.п. в фазах движения/стрельбы/charge/fight/расстановки) получили новый вид — тёмная шапка, визуально отличная от карточек стратагем, чтобы быстрее находить их взглядом.',
      'Мелкие блоки правил вида xx.xx.xx сменили цвет с жёлто-золотого на приглушённый серо-оливковый.',
      'Исправлены места, где на десктопе/планшете в двухколоночной раскладке текст налезал друг на друга или таблицы/карточки были слишком тесными (разделы Battlefields, Advanced Rules, Reference, Muster).',
      'Кнопки поиска/языка/лора/темы в шапке сайта теперь одного размера, а переключатель языка — «свич»-переключатель вместо одной буквы, состояние читается сразу.',
      { h: 'Исправления' },
      'Исправлен переход к разделу основных правил с другой страницы (например, по ссылке «(NN.NN)» или из FAQ) — иногда открывался не тот раздел.',
    ],
  },
  {
    version: '2.1.10',
    date: '2026-07-30',
    en: [
      { h: 'Faction rules' },
      'The Russian text of several army rules stopped short of the English: Space Marines\' Oath of Moment was missing the Chapter restrictions and the whole Deathwatch section, T\'au Empire\'s was missing the Drones reference, Blood Angels\' was missing The Sons of Sanguinius, and Space Wolves\' was missing Curse of the Wulfen — all now translated in full.',
      'Four detachments were missing their "Keywords" section in English, so the Battleline keyword each grants was invisible there: Chaos Cult (Traitor Guardsmen Squad), Dread Mob (Gretchin), Kroot Hunting Pack (Kroot Carnivore) and Warpmeld Pact (Tzaangors) — added.',
      'Emperor\'s Children\'s "Coterie of the Conceited" showed its Pact points table as one unreadable run of text in Russian, and Chaos Knights\' "Storm of Darkness" had its two effects merged into a single sentence with a duration the rule does not have — both fixed.',
      'Black Templars\' vow abilities ran as flowing prose in Russian where the English lists them as bullets — restored.',
      'Chaos Titan Legions\' army rule was missing the line giving the army\'s Force Disposition (Take and Hold) — added.',
      { h: 'Presentation' },
      'Faction keywords (ADEPTUS ASTARTES, HERETIC ASTARTES, ASTRA MILITARUM, …) are now bold everywhere they appear, the way the rulebooks print them — and identically in both languages.',
      'A faction\'s rules page now loads only that faction\'s data instead of all thirty, so it opens noticeably faster on a slow connection.',
    ],
    ru: [
      { h: 'Правила фракций' },
      'Русский текст нескольких армейских правил обрывался раньше английского: у Space Marines в Oath of Moment не хватало ограничений по орденам и целого раздела Deathwatch, у T\'au Empire — справочника Drones, у Blood Angels — The Sons of Sanguinius, у Space Wolves — Curse of the Wulfen. Всё переведено полностью.',
      'У четырёх детачментов в английской версии не было раздела «Keywords», из-за чего не было видно выдаваемое им ключевое слово Battleline: Chaos Cult (Traitor Guardsmen Squad), Dread Mob (Gretchin), Kroot Hunting Pack (Kroot Carnivore) и Warpmeld Pact (Tzaangors) — добавлено.',
      'У Emperor\'s Children в «Coterie of the Conceited» таблица Pact points показывалась одним нечитаемым куском текста, а у Chaos Knights в «Storm of Darkness» два эффекта были слиты в одно предложение и получили длительность, которой в правиле нет — исправлено.',
      'Способности обетов Black Templars в русской версии шли сплошным текстом там, где в английской они идут списком — восстановлено.',
      'В армейском правиле Chaos Titan Legions не хватало строки о Force Disposition армии (Take and Hold) — добавлено.',
      { h: 'Оформление' },
      'Ключевые слова фракций (ADEPTUS ASTARTES, HERETIC ASTARTES, ASTRA MILITARUM, …) теперь везде выделены жирным, как они печатаются в правилах, — и одинаково в обоих языках.',
      'Страница правил фракции теперь загружает данные только этой фракции вместо всех тридцати, поэтому заметно быстрее открывается на медленном соединении.',
    ],
  },
  {
    version: '2.1.9',
    date: '2026-07-30',
    en: [
      { h: 'Combat Patrol' },
      'Added a full Combat Patrol section — hand-written rules for all 24 factions\' starter-box content (detachment rule, army rule, stratagems, enhancements and the fixed roster\'s datasheets), reachable under the new "Rules" menu alongside Core Rules and the Event Companion.',
      'The Game Tracker can now score a Combat Patrol game: a "Game Type" toggle at the start of setup restricts army/detachment selection to the box\'s own content, auto-fills its fixed Force Disposition, and shows its stratagems during the game instead of a normal detachment\'s.',
      'The Game Tracker\'s army-rule card now shows for every faction, not just the ones with a live counter — factions without one get a read-only "How it works" reference to their army rule\'s text instead.',
      { h: 'Event Companion' },
      'Mission and Twist names now show a Russian translation underneath, the same way stratagems already do.',
      'Fixed the desktop "Back to top" button not appearing on Event Companion pages.',
    ],
    ru: [
      { h: 'Combat Patrol' },
      'Добавлен полноценный раздел Combat Patrol — авторские правила стартовых наборов для всех 24 фракций (правило детачмента, армейское правило, стратагемы, улучшения и датащиты фиксированного состава), доступен в новом меню «Правила» рядом с Основными правилами и Путеводителем по ивентам.',
      'Трекер партии теперь умеет считать игру Combat Patrol: переключатель «Тип игры» в начале настройки ограничивает выбор армии/детачмента содержимым коробки, сам подставляет её фиксированную Force Disposition и показывает её стратагемы во время игры вместо обычного детачмента.',
      'Карточка армейского правила в Трекере партии теперь показывается для всех фракций, а не только для тех, где есть живой счётчик — у остальных вместо него справка «Как работает» с текстом самого правила.',
      { h: 'Путеводитель по ивентам' },
      'Названия миссий и твистов теперь показывают русский перевод под собой — так же, как это уже работает у стратагем.',
      'Исправлена кнопка «Наверх» на десктопе — не появлялась в разделе «Путеводитель по ивентам».',
    ],
  },
  {
    version: '2.1.8',
    date: '2026-07-29',
    en: [
      'Assassins (Callidus, Culexus, Eversor, Vindicare) and the Necron C’tan Shards/Transcendent C’tan were missing their higher points cost when taken in the Veiled Blade Elimination Force / Pantheon of Woe detachment — added.',
      'Several units shared with the Space Marines Chapters (Assault Intercessor Squad, Assault Intercessors/Vanguard Veterans/Bladeguard Veterans With Jump Packs, Captain/Chaplain With Jump Pack, Outrider Squad, Repulsor Executioner) now show the correct, higher points cost for Blood Angels (and, for the Repulsor Executioner, Deathwatch/Space Wolves/Dark Angels too) instead of the generic Space Marines price.',
      'Necrons\' "Pantheon of Woe" detachment rule was missing the short flavour line for each of its 4 Necrodermal Binding abilities (Singularity Matrix, Quantum Goad, Animus Damper, Reletavistic Tether) — added.',
      'The Bladeguard Veteran Squad\'s "Bladeguard" ability was on stale, pre-errata wording — updated to the current rule (a per-turn choice between +1 to hit or -1 to hit against it, instead of the old re-roll-a-1 version).',
      'T\'au Empire\'s army rule page was missing the "Drones" reference section (Guardian/Marker/Shield/Gun/Missile Drone) — added.',
      'Space Wolves\' "Wolf-touched" and "Grimnar\'s Mark" enhancements were missing their "can be attached to" note (Wulfen/Wulfen with Storm Shields, and Wolf Guard Terminators respectively) — added.',
      'Watch Captain Artemis and Watch Master (Imperial Agents) could only lead an Aquila or Deathwatch Kill Team — added the Deathwatch Terminator Squad, Fortis, Indomitor and Spectrus Kill Teams they can also lead.',
      'Updated all Game Tracker detachment and enhancement points to Munitorum Field Manual v1.1.',
    ],
    ru: [
      'У Ассасинов (Callidus, Culexus, Eversor, Vindicare) и C’tan Shard/Transcendent C’tan (Necrons) не хватало повышенной стоимости очков при взятии в детачмент Veiled Blade Elimination Force / Pantheon of Woe — добавлено.',
      'Несколько юнитов, общих с Орденами Space Marines (Assault Intercessor Squad, Assault Intercessors/Vanguard Veterans/Bladeguard Veterans With Jump Packs, Captain/Chaplain With Jump Pack, Outrider Squad, Repulsor Executioner), теперь показывают верную, более высокую стоимость очков для Blood Angels (а для Repulsor Executioner — ещё и для Deathwatch/Space Wolves/Dark Angels) вместо общей цены Space Marines.',
      'В правиле детачмента Necrons «Pantheon of Woe» не хватало короткой фразы-флейвора для каждой из 4 способностей Necrodermal Binding (Singularity Matrix, Quantum Goad, Animus Damper, Reletavistic Tether) — добавлено.',
      'Способность Bladeguard Veteran Squad «Bladeguard» была на устаревшей, дошедшей до эрраты формулировке — обновлена до актуального правила (выбор раз за ход между +1 к попаданию или -1 к попаданию по юниту, вместо старого переброса 1).',
      'На странице армейского правила T\'au Empire не хватало раздела-справочника «Drones» (Guardian/Marker/Shield/Gun/Missile Drone) — добавлено.',
      'У усилений Space Wolves «Wolf-touched» и «Grimnar\'s Mark» не хватало пометки «может быть присоединён к» (Wulfen/Wulfen with Storm Shields и Wolf Guard Terminators соответственно) — добавлено.',
      'Watch Captain Artemis и Watch Master (Imperial Agents) могли возглавлять только Aquila или Deathwatch Kill Team — добавлены Deathwatch Terminator Squad, Fortis, Indomitor и Spectrus Kill Team, которые они также могут возглавлять.',
      'Обновлены очки детачментов и усилений в Трекере партии до Munitorum Field Manual v1.1.',
    ],
  },
  {
    version: '2.1.7',
    date: '2026-07-28',
    en: [
      'Devastator Squad (Space Marines and the Chapters that share it) was missing "heavy flamer" as a weapon option — added.',
      'Corrected how many Death Company Marines with Jump Packs (Blood Angels) can swap their chainsword for a power fist or power weapon.',
      'Fixed a "Panspectral Scanner" typo on the Leagues of Votann Hekaton Land Fortress.',
      'The Space Marines enhancement "Scroll of Proclamation" was missing its "Adeptus Astartes model only" restriction — added.',
      'Space Wolves was missing the "Curse of the Wulfen" army rule (bonus Objective Control near a Space Wolves Character or Wolf Priest) — added.',
      'Blood Angels was missing "The Sons of Sanguinius" (the rule limiting an army to a single Chapter) — added.',
      'Several T’au Empire units (Breacher Team, Strike Team, Ethereal, Pathfinder Team, Broadside Battlesuits, Cadre Fireblade, both Commander battlesuits, all 3 Crisis Battlesuit variants) let you equip a Guardian/Marker/Shield Drone without explaining what it does — added the missing ability text for each.',
      'Chaos Daemons: Be’lakor, the Greater Daemons and the God-specific Daemon Heralds were not showing the SHADOW LEGION keyword their own datasheet grants when the Shadow Legion detachment is active.',
      'A keyword a unit gains from an army/detachment rule (rather than having it printed) is now marked with a `*` on the datasheet page, with a footnote naming where it comes from.',
      'A Character\'s "can be attached to" list no longer shows a dead (unclickable) name when that unit only exists on a different faction\'s page — it\'s hidden there instead, since you\'d never actually take it while building this faction\'s army.',
      'A remaining unlinked name in that same list (e.g. Dark Angels\' "Deathwing Command Squad", or "Relic Terminator Squad") is a Warhammer Legends unit — those aren\'t covered by this site yet, but will get their own page once they\'re available in GW\'s own app data.',
      'The Event Companion was missing the "Generating Command Points" rule (max 1CP per battle round from non-Core sources) — added, plus an example illustrating "win path" in the Pairing Players rule.',
      'Core Rules: fixed several small gaps found by re-checking the whole rulebook against the source data — Healing/Regaining Wounds now notes Character models can\'t be revived that way, large models set up from Strategic Reserves note the Aircraft exception, embarking now covers Dedicated Transports being destroyed if left empty, and "bodyguard" was missing from one attached-unit rule\'s wording.',
      'Core Rules: two more gaps found in the same pass — reviving a model into an embarked unit was missing the check for remaining Transport Capacity, and Fill Your Army Roster was missing the exception that lets an Incursion battle use a single 3DP detachment.',
      'Fixed the "Crushing Impact" core stratagem: it said to roll dice equal to the enemy model\'s Toughness, when the rule actually uses your own MONSTER/VEHICLE\'s Toughness.',
      'The 45 Terrain Layout diagrams (Event Companion) are now sharper (pulled from the game\'s own app instead of a PDF crop) — and each one now has a "Measurements / Clean" toggle to switch between the version with inch callouts and a simplified view.',
      'Layout diagrams can now be opened full-size (tap/click the image) — useful since they\'re packed with small detail — with the same "Measurements / Clean" toggle available right there.',
    ],
    ru: [
      'У Devastator Squad (Space Marines и Ордена, использующие этот же юнит) не хватало варианта вооружения «heavy flamer» — добавлен.',
      'Исправлено количество моделей Death Company Marines with Jump Packs (Blood Angels), которым можно заменить chainsword на power fist или power weapon.',
      'Исправлена опечатка «Panspectral Scanner» у Hekaton Land Fortress (Leagues of Votann).',
      'У улучшения Space Marines «Scroll of Proclamation» не хватало ограничения «Adeptus Astartes model only» — добавлено.',
      'У Space Wolves не хватало армейского правила «Curse of the Wulfen» (бонус к контролю над целью рядом с Space Wolves Character или Wolf Priest) — добавлено.',
      'У Blood Angels не хватало правила «The Sons of Sanguinius» (ограничение армии одним орденом) — добавлено.',
      'У нескольких юнитов T’au Empire (Breacher Team, Strike Team, Ethereal, Pathfinder Team, Broadside Battlesuits, Cadre Fireblade, оба Commander battlesuit, все 3 варианта Crisis Battlesuit) можно было снарядить Guardian/Marker/Shield Drone без объяснения, что они делают — добавлен недостающий текст способностей.',
      'Chaos Daemons: Be’lakor, Greater Daemons и специфичные для богов Daemon Heralds не показывали ключевое слово SHADOW LEGION, которое им даёт собственный датащит при активном детачменте Shadow Legion.',
      'Ключевое слово, которое юнит получает от армейского правила или детачмента (а не напечатано на листе), теперь помечено «*» на странице датащита, со сноской о том, откуда оно взялось.',
      'Список «можно присоединить к» у персонажа больше не показывает мёртвые (некликабельные) названия юнитов, которые существуют только на странице другой фракции — теперь они скрыты, раз их всё равно нельзя взять при сборке армии этой фракции.',
      'Оставшееся название без ссылки в этом же списке (например, «Deathwing Command Squad» у Dark Angels или «Relic Terminator Squad») — это юнит Warhammer Legends. Такие юниты пока не охвачены сайтом, но получат свою страницу, как только появятся в данных приложения GW.',
      'В Event Companion не хватало правила «Начисление командных очков» (не более 1CP за раунд боя не из базовых источников) — добавлено, плюс пример к «пути побед» в правиле Pairing Players.',
      'Основные правила: исправлено несколько мелких пробелов, найденных при повторной сверке всего свода правил с исходными данными — в разделе про исцеление/восстановление ран уточнено, что модели CHARACTER так возродить нельзя, у установки крупных моделей из стратегических резервов добавлено исключение для AIRCRAFT, погрузка теперь учитывает уничтожение пустого DEDICATED TRANSPORT, и в одном правиле про объединённые юниты не хватало слова «телохранителей».',
      'Основные правила: ещё два пробела, найденные в той же сверке — при возрождении модели в юнит на транспорте не хватало проверки оставшейся вместимости транспорта, а в разделе «Заполнение ростера армии» не хватало исключения, разрешающего в битве Incursion взять один детачмент на 3DP.',
      'Исправлена базовая стратагема «Crushing Impact»: было указано бросать кубы по стойкости вражеской модели, хотя по правилам используется стойкость своей модели MONSTER/VEHICLE.',
      '45 диаграмм расстановки террейна (Event Companion) стали чётче (взяты из самого приложения игры вместо кропа PDF) — и у каждой теперь есть переключатель «С размерами / Без размеров».',
      'Диаграммы расстановки теперь можно открыть в полный размер (тап/клик по картинке) — пригодится, там много мелких деталей — с тем же переключателем «С размерами / Без размеров» прямо там.',
    ],
  },
  {
    version: '2.1.6',
    date: '2026-07-27',
    en: [
      'On a faction page, the floating buttons (desktop) and the new floating bar above the bottom navigation (mobile) now jump straight to either other tab (Rules/Units/FAQ) instead of cycling through them one at a time.',
      'Mobile gained its own version of those floating buttons — a back-to-top button, plus a compact "To game" button whenever a game is in progress — all shown together above the bottom navigation only when relevant, so they never get in the way of reading.',
      'The faction unit list now splits out Vehicles and Infantry into their own groups instead of lumping them into "Other Units" — those two Unit Types made up the bulk of that catch-all group.',
      'Every faction’s datasheets and detachment rules were checked unit-by-unit against the current official rules and corrected wherever they’d drifted — wrong stats, missing wargear options, stale unit names, incomplete abilities and more, across all 30 factions.',
      'Restored several detachments’ missing Chapter-restriction and Battleline-keyword text (Blood Angels, Dark Angels, Black Templars, Space Wolves, Space Marines, Adeptus Custodes) — the rule cards read correctly again; nothing about how those detachments actually play has changed.',
    ],
    ru: [
      'На странице фракции плавающие кнопки (десктоп) и новая плавающая панель над нижней навигацией (мобильные) теперь ведут сразу на нужный таб (Правила/Юниты/FAQ), а не переключают их по кругу.',
      'На мобильных появился свой аналог этих кнопок — кнопка «наверх», а также компактная кнопка «К партии», когда партия активна — все они показываются над нижней навигацией только когда это уместно, не мешая чтению.',
      'В списке юнитов фракции Vehicle и Infantry теперь выделены в отдельные группы, а не свалены в «Прочие юниты» — именно эти два типа составляли основную массу этой группы.',
      'Датащиты и правила детачментов всех фракций сверены юнит за юнитом с актуальными официальными правилами и исправлены везде, где нашёлся дрейф — неверные характеристики, пропавшие варианты вооружения, устаревшие названия юнитов, неполные способности и другое, по всем 30 фракциям.',
      'Восстановлен пропавший текст ограничений по ордену и грантов ключевого слова Battleline у нескольких детачментов (Blood Angels, Dark Angels, Black Templars, Space Wolves, Space Marines, Adeptus Custodes) — карточки правил снова читаются верно, сама игровая механика этих детачментов не менялась.',
    ],
  },
  {
    version: '2.1.5',
    date: '2026-07-27',
    en: [
      { h: 'FAQ & errata' },
      'The per-faction FAQ tab (added last release) is now available in Russian for all 30 factions, not just English.',
      'Fixed bulleted FAQ/errata answers rendering as one run-on line instead of a proper list.',
      { h: 'Points & rules corrections' },
      'Corrected several stale Munitorum Field Manual points values: Black Templars’ Impulsor, Space Marines’ Repulsor Executioner and Vanguard Veteran Squad With Jump Packs, and Genestealer Cults’ Atalan Jackals (which also gained a missing 9-model price tier).',
      'Fixed Gretchin’s unit composition text (a missing “0-” prefix had made 3 of its 5 legal squad sizes look unavailable).',
      'Removed an “Agents of the Imperium (allied)” price line from several Imperial Agents/Assassins units that doesn’t appear on the live MFM.',
      'Corrected rules-text drift against the latest errata across many factions (Aeldari, Necrons, Chaos Daemons, Grey Knights, Imperial Agents, Genestealer Cults, Black Templars, Chaos Knights, Dark Angels, Imperial Knights, Orks, Space Marines) — army rules, stratagems, enhancements and datasheet abilities.',
    ],
    ru: [
      { h: 'FAQ и эррата' },
      'Вкладка FAQ по фракциям (добавленная в прошлом релизе) теперь доступна на русском для всех 30 фракций, а не только на английском.',
      'Исправлены маркированные списки в ответах FAQ/эрраты — раньше они сливались в одну строку вместо настоящего списка.',
      { h: 'Исправления очков и правил' },
      'Исправлены устаревшие значения очков (Munitorum Field Manual): Impulsor у Black Templars, Repulsor Executioner и Vanguard Veteran Squad With Jump Packs у Space Marines, Atalan Jackals у Genestealer Cults — у последних также добавлен недостающий вариант отряда на 9 моделей.',
      'Исправлен текст состава отряда Gretchin (не хватало префикса «0-»), из-за чего 3 из 5 легальных размеров отряда выглядели недоступными.',
      'Убрана строка цены «Agents of the Imperium (allied)» у нескольких юнитов Imperial Agents/ассасинов — в актуальном MFM её нет.',
      'Исправлены расхождения текста правил с последними эрратами у множества фракций (Aeldari, Necrons, Chaos Daemons, Grey Knights, Imperial Agents, Genestealer Cults, Black Templars, Chaos Knights, Dark Angels, Imperial Knights, Orks, Space Marines) — армейские правила, стратагемы, улучшения и способности листов данных.',
    ],
  },
  {
    version: '2.1.4',
    date: '2026-07-25',
    en: [
      'Faction pages now have an FAQ tab — the official Games Workshop FAQ and errata for that faction, with an Errata / FAQ switch. (In English, as GW publishes them.) Space Marine Chapters also show the shared Codex: Space Marines entries.',
      'Fixed the “This model can be attached to the following units” list on Character datasheets — many Characters were showing units they can’t actually lead (and a stray duplicate entry). Every attach list is now reconciled against the official app’s data.',
      'Added a “back to top” button on the rules pages and faction pages (desktop) for a quick jump to the top of long pages.',
    ],
    ru: [
      'На страницах фракций появилась вкладка FAQ — официальные FAQ и errata Games Workshop по этой фракции, с переключателем Errata / FAQ. (На английском, как их публикует GW.) У чаптеров Space Marines показываются и общие записи из Codex: Space Marines.',
      'Исправлен список «Эту модель можно присоединить к следующим юнитам» на листах данных персонажей — у многих персонажей отображались юниты, которых они не могут возглавлять (и лишний повтор). Все списки присоединения сверены с данными официального приложения.',
      'Добавлена кнопка «наверх» на страницах правил и фракций (десктоп) — быстрый возврат к началу длинных страниц.',
    ],
  },
  {
    version: '2.1.3',
    date: '2026-07-25',
    en: [
      'Datasheets now show keywords a unit gains from its army or detachment rule (e.g. Deathwing/Ravenwing from The Unforgiven, detachment-granted Battleline) alongside its printed keywords.',
      'Fixed the update-notice banner rendering under the iOS status bar on the installed app.',
    ],
    ru: [
      'Листы данных теперь показывают ключевые слова, которые юнит получает от правила армии или детачмента (например, Deathwing/Ravenwing от The Unforgiven, Battleline от детачмента), вместе с напечатанными.',
      'Исправлена плашка об обновлении — она больше не наезжает на строку состояния iOS в установленном приложении.',
    ],
  },
  {
    version: '2.1.2',
    date: '2026-07-25',
    en: [
      { h: 'Rules readability' },
      'Bulleted rules text now renders as a proper list everywhere it appears — faction enhancements, stratagems, datasheet abilities and the keyword pop-ups — instead of collapsing every point onto one run-on line.',
      'Enhancements that attach the bearer to a specific unit now spell that attachment out, so you can see the condition at a glance.',
    ],
    ru: [
      { h: 'Читаемость правил' },
      'Маркированные списки в тексте правил теперь отображаются настоящим списком везде, где встречаются — в улучшениях фракций, стратагемах, способностях листов данных и всплывающих подсказках ключевых слов, — а не сливаются в одну строку.',
      'Улучшения, прикрепляющие носителя к конкретному юниту, теперь явно показывают это — условие прикрепления видно сразу.',
    ],
  },
  {
    version: '2.1.0',
    date: '2026-07-23',
    en: [
      { h: 'Army-rule trackers' },
      'Game setup now has “Track your army rule” and “Track opponent’s army rule” checkboxes, right next to Track CP — available for 11 factions. Turn one on and each player gets an in-game card for their faction’s mechanic: Sisters of Battle Miracle dice, Leagues of Votann Yield points, Drukhari Pain tokens, Orks’ Waaagh!, Aeldari Battle Focus, and more.',
      'The card is tinted in the faction’s colour; tap through resources and picks as you play. When the game ends, the results screen recaps it all — picks by round, tokens or dice left, when the Waaagh! was called.',
      { h: 'Game history' },
      'Finished games in the tracker now read like a scoreboard card — you vs your opponent, each side’s faction, the result, and whether it was scored by Victory or Battle Points. Tap a card to reopen the full breakdown.',
      { h: 'Update notices' },
      'When a newer version ships, a banner now points you to this “What’s New” page — and you can open it any time from the version number in the footer.',
      { h: 'Rules data' },
      'Every faction’s rules, datasheet abilities and keywords have been reconciled against the latest GW app release (data version 912) — corrected wording, missing abilities and keyword lists, in both English and Russian.',
    ],
    ru: [
      { h: 'Трекеры правил армии' },
      'В настройках партии, рядом с «Считать CP», появились галочки «Следить за своим правилом армии» и «Следить за правилом оппонента» — для 11 фракций. Включите — и во время игры у каждого игрока будет карточка механики своей фракции: Miracle dice у Sisters of Battle, Yield points у Leagues of Votann, Pain tokens у Drukhari, Waaagh! у Orks, Battle Focus у Aeldari и другие.',
      'Карточка окрашена в цвет фракции; отмечайте на ней ресурсы и выборы по ходу партии. По завершении игры экран результатов покажет итог — выбор по раундам, остаток жетонов или кубов, когда был вызван Waaagh!.',
      { h: 'История партий' },
      'Завершённые игры в трекере теперь выглядят как карточка-табло — вы против оппонента, фракция каждой стороны, результат и по каким очкам был счёт (Victory или Battle Points). Тап по карточке открывает полную детализацию.',
      { h: 'Оповещения об обновлениях' },
      'При выходе новой версии сверху появляется плашка со ссылкой на эту страницу «Что нового» — а открыть её можно в любой момент по номеру версии в подвале.',
      { h: 'Данные правил' },
      'Правила всех фракций, способности листов данных и ключевые слова сверены с последней версией приложения GW (data version 912) — исправлены формулировки, добавлены недостающие способности и списки ключевых слов, на английском и русском.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
