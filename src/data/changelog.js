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
    version: '2.1.9',
    date: '2026-07-30',
    en: [
      { h: 'Combat Patrol' },
      'Added a full Combat Patrol section — hand-written rules for all 24 factions\' starter-box content (detachment rule, army rule, stratagems, enhancements and the fixed roster\'s datasheets), reachable under the new "Rules" menu alongside Core Rules and the Event Companion.',
      'The Game Tracker can now score a Combat Patrol game: a "Game Type" toggle at the start of setup restricts army/detachment selection to the box\'s own content, auto-fills its fixed Force Disposition, and shows its stratagems during the game instead of a normal detachment\'s.',
    ],
    ru: [
      { h: 'Combat Patrol' },
      'Добавлен полноценный раздел Combat Patrol — авторские правила стартовых наборов для всех 24 фракций (правило детачмента, армейское правило, стратагемы, улучшения и датащиты фиксированного состава), доступен в новом меню «Правила» рядом с Основными правилами и Путеводителем по ивентам.',
      'Трекер партии теперь умеет считать игру Combat Patrol: переключатель «Тип игры» в начале настройки ограничивает выбор армии/детачмента содержимым коробки, сам подставляет её фиксированную Force Disposition и показывает её стратагемы во время игры вместо обычного детачмента.',
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
