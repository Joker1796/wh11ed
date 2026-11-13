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
    version: '2.11.3',
    date: '2026-11-13',
    en: [
      { h: 'Roster export', kind: 'roster' },
      '**The “Russian tournament” export no longer loses equipment.** Weapon counts and every weapon of a unit are written as the list has them.',
      { h: 'Roster import', kind: 'roster' },
      '**More hand-typed lists import correctly.** Attached characters in a block with no closing line are recognised. So are unit labels typed in Cyrillic letters and enhancements written without “(Aura)”.',
      { h: 'App updates', kind: 'site' },
      '**Clearing out old files no longer interrupts an app update.** It used to end in “Could not finish the update”.',
    ],
    ru: [
      { h: 'Экспорт ростеров', kind: 'roster' },
      '**Экспорт в формате «Русский турнир» больше не теряет снаряжение.** Количество оружия и все пушки отряда записываются так, как они стоят в списке.',
      { h: 'Импорт ростеров', kind: 'roster' },
      '**Больше списков, набранных вручную, импортируются правильно.** Распознаются прикреплённые персонажи в блоке без закрывающей строки. Также распознаются метки юнитов, набранные русскими буквами, и улучшения без «(Aura)».',
      { h: 'Обновление приложения', kind: 'site' },
      '**Уборка старых файлов больше не прерывает обновление приложения.** Раньше из-за неё появлялось «Не удалось завершить обновление».',
    ],
  },
  {
    version: '2.11.2',
    date: '2026-11-12',
    en: [
      { h: 'Cloud rosters', kind: 'roster' },
      '**Fixed equipment and unit sizes resetting when a roster is downloaded from the cloud.**',
      { h: 'Roster import', kind: 'roster' },
      '**Fixed equipment and enhancement parsing when importing rosters.** If the model count cannot be determined, a warning appears.',
      { h: 'App updates', kind: 'site' },
      '**Files used by the open version are preserved while an update is prepared.**',
      { h: 'Game history', kind: 'tracker' },
      '**Both copies of a game are kept when saving conflicts with history.** A warning appears instead of a silent replacement.',
    ],
    ru: [
      { h: 'Облачные ростеры', kind: 'roster' },
      '**Исправлен сброс снаряжения и размера отрядов при загрузке ростера из облака.**',
      { h: 'Импорт ростеров', kind: 'roster' },
      '**Исправлено чтение снаряжения и улучшений при импорте ростеров.** Если количество моделей не удаётся определить, появляется предупреждение.',
      { h: 'Обновление приложения', kind: 'site' },
      '**При подготовке обновления сохраняются файлы открытой версии.**',
      { h: 'История партий', kind: 'tracker' },
      '**При конфликте с историей сохраняются обе копии партии.** Вместо молчаливой замены появляется предупреждение.',
    ],
  },
  {
    version: '2.11.1',
    date: '2026-11-10',
    en: [
      { h: 'Core Rules' },
      '**Numbered steps in the rules now show the correct numbers.**',
      { h: 'Opening sections', kind: 'site' },
      '**If a section cannot load, the site now offers a retry.** An abandoned transition no longer reloads a page you opened afterwards.',
      '**Rules can open while saved lists and games are being prepared.** The roster list loads less code before it appears.',
      { h: 'App updates', kind: 'site' },
      '**If an update has not finished downloading, the app shows “Continue”.** It retries temporary download failures automatically. “Update” appears after all files have been verified.',
      { h: 'Roster builder', kind: 'roster' },
      '**[Bloodthirster](/factions/chaos-daemons/datasheets/bloodthirster) now takes Axe of Khorne together with Bloodflail or Lash of Khorne.** I also fixed the linked equipment choices for [Dire Avengers](/factions/aeldari/datasheets/dire-avengers) and [Kill Tank](/factions/orks/datasheets/kill-tank). An old choice that cannot be restored unambiguously is kept for you to check.',
      '**[Soul Grinder](/factions/chaos-daemons/datasheets/soul-grinder) now gets its additional weapon only from the chosen god.** The separate manual picker can no longer add another god’s weapon.',
      '**An open tab now picks up lists and games saved in another tab.** Your pending edits stay in place; a conflicting save still asks which version to keep.',
      { h: 'Russian rules text', kind: 'rules' },
      '**I clarified the Russian wording for rules that improve re-rolls of 1 to re-rolls of any result.**',
      { h: 'Answers to bug reports' },
      '[Tempestus Scions](/factions/astra-militarum/datasheets/tempestus-scions) re-roll Wound rolls in both cases, as in the GW app. Normally they re-roll results of 1. If the target is within range of an objective marker, they can re-roll any result instead.',
    ],
    ru: [
      { h: 'Базовые правила' },
      '**Нумерованные пункты в правилах снова показывают правильные номера.**',
      { h: 'Открытие разделов', kind: 'site' },
      '**Если раздел не загрузился, сайт предлагает повторить попытку.** Отменённый переход больше не перезагружает страницу, которую вы открыли после него.',
      '**Правила открываются, пока сайт готовит сохранённые ростеры и партии.** Для показа списка ростеров загружается меньше кода.',
      { h: 'Обновление приложения', kind: 'site' },
      '**Если обновление скачалось не до конца, приложение показывает «Продолжить».** При временном сбое оно само повторяет скачивание. Кнопка «Обновить» появляется после проверки всех файлов.',
      { h: 'Конструктор ростеров', kind: 'roster' },
      '**[Bloodthirster](/factions/chaos-daemons/datasheets/bloodthirster) теперь берёт Axe of Khorne вместе с Bloodflail или Lash of Khorne.** Я также исправил связанные варианты снаряжения у [Dire Avengers](/factions/aeldari/datasheets/dire-avengers) и [Kill Tank](/factions/orks/datasheets/kill-tank). Если старый выбор нельзя восстановить однозначно, он сохранится для вашей проверки.',
      '**[Soul Grinder](/factions/chaos-daemons/datasheets/soul-grinder) теперь получает дополнительное оружие только по выбранному богу.** Отдельный ручной выбор больше не позволяет добавить оружие другого бога.',
      '**Открытая вкладка теперь подхватывает ростеры и партии, сохранённые в другой вкладке.** Ваши несохранённые правки остаются на месте; при конфликте сайт по-прежнему спрашивает, какой вариант сохранить.',
      { h: 'Перевод правил', kind: 'rules' },
      '**Я уточнил перевод правил, где переброс единиц расширяется до переброса любого результата.**',
      { h: 'Ответы на баг-репорты' },
      '[Tempestus Scions](/factions/astra-militarum/datasheets/tempestus-scions) в обоих случаях перебрасывают броски на ранение, как в приложении GW. Обычно перебрасываются единицы. Если цель в радиусе маркера цели, вместо этого можно перебросить любой результат.',
    ],
  },
  {
    version: '2.11.0',
    date: '2026-11-08',
    en: [
      { h: 'Dominatus campaigns' },
      '**A new section with the rules of the Dominatus deck.** Every card of the deck is in it.',
      '**You can now run a Dominatus campaign on the site.** The Warmaster creates it in the Campaigns section and sends players a link. The campaign’s battles are played in the tracker.',
      '**In the roster builder you can give Upgrade cards to units.** In the game, the card’s text is shown on the unit’s card.',
      { h: 'Tracker' },
      '**An army rule on the Phase tab now opens in a window.** Before, the site took you to the army tab. A unit ability named in the rule is highlighted on the unit’s card.',
      { h: 'Your data on this device' },
      '**Lists and games are now stored differently.** If the phone closes the site while it is saving, nothing is lost. On the first open after the update the site moves your data. If that takes longer than half a second, a strip with a counter appears.',
      '**A list open in two tabs is no longer overwritten.** Before, the last save erased the changes made in the other tab. Now the site asks which version to keep.',
      '**Fixed: after an update a section sometimes did not open or a button did nothing.** It happened with Create list and Start game. The site switched to the new version before it had finished downloading. Now the new version switches on only after it is fully downloaded. If some part fails to load, the site loads it again.',
      { h: 'Roster builder' },
      '**Fixed saving to the cloud.** Before, a change made on one device could erase a change made on another. Now, if the list in the cloud has changed, both versions are kept.',
      '**Fixed wargear in old Space Marines and Chapter lists.** After the new codex came out on 30 September, some units in lists built before it showed the wrong weapon. For example, an Intercessor Sergeant had a power fist instead of a hand flamer. Where possible, the site restored the right choice itself. Where not, the unit asks you to check its wargear.',
      '**A list from a newer version of the site opens read-only.** This happens if you saved it on another device where the site has already updated. Before, an older version could read such a list with mistakes. You can edit it after the site updates.',
      { h: 'Answers to bug reports' },
      '**[Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) can be given to only one unit in the army.** A bug report came in without a list. In it, Wolf-Touched on a [Wolf Guard Battle Leader](/factions/space-wolves/datasheets/wolf-guard-battle-leader) showed a duplicate warning. This is not a site error. Wolf-Touched is an ordinary enhancement, and each enhancement can be taken once per army. So only one Wolf Guard Battle Leader with Wolf-Touched can join [Wulfen](/factions/space-wolves/datasheets/wulfen). If you see this warning with Wolf-Touched on a single unit, please send the report again with the list. Open the list, choose {do:feedback} and tick “Attach the open roster”.',
    ],
    ru: [
      { h: 'Кампании Dominatus' },
      '**Новый раздел с правилами колоды Dominatus.** В нём все карты колоды.',
      '**Кампанию Dominatus теперь можно вести прямо на сайте.** Warmaster создаёт её в разделе «Кампании» и отправляет игрокам ссылку. Битвы кампании играются в трекере.',
      '**В конструкторе ростеров можно назначать юнитам Upgrade-карты.** В игре текст карты виден на карточке юнита.',
      { h: 'Трекер' },
      '**Правило армии на вкладке «Фаза» теперь открывается в окне.** Раньше сайт уводил на вкладку армии. Способность юнита, о которой говорит правило, подсвечивается на его карточке.',
      { h: 'Ваши данные на устройстве' },
      '**Изменился способ хранения списков и партий.** Если телефон закроет сайт во время сохранения, ничего не пропадёт. При первом открытии после обновления сайт переносит ваши данные. Если это займёт больше полсекунды, появится плашка со счётчиком.',
      '**Список, открытый в двух вкладках, больше не затирается.** Раньше последнее сохранение стирало изменения из другой вкладки. Теперь сайт спросит, какую версию оставить.',
      '**Исправлена ошибка, когда после обновления не открывался раздел или не нажималась кнопка.** Так бывало с кнопками «Создать лист» и «Начать игру». Сайт переключался на новую версию, пока она скачалась не до конца. Теперь новая версия включается только после полной загрузки. Если какая-то часть не загрузилась, сайт загрузит её ещё раз.',
      { h: 'Конструктор ростеров' },
      '**Исправлено сохранение в облако.** Раньше правка с одного устройства могла стереть правку с другого. Теперь, если список в облаке изменился, сохраняются обе версии.',
      '**Исправлено снаряжение в старых списках Space Marines и орденов.** После выхода нового кодекса 30 сентября в списках, собранных раньше, у некоторых юнитов показывалось не то оружие. Например, у сержанта Intercessor вместо ручного огнемёта стоял силовой кулак. Где можно, сайт сам вернул правильный выбор. Где нельзя, юнит просит проверить снаряжение.',
      '**Список из более новой версии сайта открывается только для просмотра.** Так бывает, если вы сохранили его на другом устройстве, где сайт уже обновился. Раньше старая версия могла прочитать такой список с ошибками. Редактировать его можно после обновления сайта.',
      { h: 'Ответы на баг-репорты' },
      '**[Wolf-Touched](/factions/space-wolves#enh-saga-of-the-beastslayer-wolf-touched) можно дать только одному юниту в армии.** Пришёл баг-репорт без приложенного листа. В нём Wolf-Touched на [Wolf Guard Battle Leader](/factions/space-wolves/datasheets/wolf-guard-battle-leader) вызывал предупреждение о задвоении. Это не ошибка сайта. Wolf-Touched является обычным улучшением, а каждое улучшение берётся в армию один раз. Поэтому к [Wulfen](/factions/space-wolves/datasheets/wulfen) можно присоединить только одного Wolf Guard Battle Leader с Wolf-Touched. Если вы видите это предупреждение, когда Wolf-Touched стоит только на одном юните, пришлите отчёт ещё раз вместе с листом. Откройте лист, выберите {do:feedback} и отметьте «Приложить открытый ростер».',
    ],
  },
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
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
