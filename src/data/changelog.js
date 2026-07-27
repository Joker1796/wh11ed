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
    version: '2.1.6',
    date: '2026-07-27',
    en: [
      'On a faction page, the floating buttons (desktop) and the new floating bar above the bottom navigation (mobile) now jump straight to either other tab (Rules/Units/FAQ) instead of cycling through them one at a time.',
      'Mobile gained its own version of those floating buttons — a back-to-top button, plus a compact "To game" button whenever a game is in progress — all shown together above the bottom navigation only when relevant, so they never get in the way of reading.',
      'The faction unit list now splits out Vehicles and Infantry into their own groups instead of lumping them into "Other Units" — those two Unit Types made up the bulk of that catch-all group.',
      'Restored several detachments’ missing Chapter-restriction and Battleline-keyword text (Blood Angels, Dark Angels, Black Templars, Space Wolves, Space Marines, Adeptus Custodes) — the rule cards read correctly again; nothing about how those detachments actually play has changed.',
    ],
    ru: [
      'На странице фракции плавающие кнопки (десктоп) и новая плавающая панель над нижней навигацией (мобильные) теперь ведут сразу на нужный таб (Правила/Юниты/FAQ), а не переключают их по кругу.',
      'На мобильных появился свой аналог этих кнопок — кнопка «наверх», а также компактная кнопка «К партии», когда партия активна — все они показываются над нижней навигацией только когда это уместно, не мешая чтению.',
      'В списке юнитов фракции Vehicle и Infantry теперь выделены в отдельные группы, а не свалены в «Прочие юниты» — именно эти два типа составляли основную массу этой группы.',
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
