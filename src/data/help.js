// The "How to use this" page (`/help`) — bilingual { en, ru }, same shape on both sides.
//
// WHAT BELONGS HERE. Only what a reader cannot work out by looking at the screen: the offline
// split (a tab is light, the installed app is not), where their data lives, why our points can
// disagree with a list built elsewhere, and the features that have no visible entry point until
// you know they exist (Ctrl+K, import, share, handing a roster to the tracker). Everything a
// button already says is left to the button.
//
// A section that describes one of the app's own sections carries `to` (the path, language-agnostic)
// and `toLabel` (its own, per locale): the article ends with a door into the thing it just
// explained, which is where a reader who came from the contents wants to go next. The three
// cross-cutting topics — search, offline, data — describe no single section and carry neither.
//
// EACH SECTION IS ITS OWN PAGE. `/help` lists them; `/help/<slug>` renders one, where the slug is
// the `id` without its `help-` prefix (`help-tracker` → `/help/tracker`). The id stays as the
// anchor so links written before the split still resolve — the `/help` route redirects a
// `#help-x` hash to the page. Renaming an id therefore changes a public URL: add a redirect.
//
// `body` uses the same block markup RuleBlock/renderRichText parse (`▪` bullets, `**bold**`,
// `[KEYWORD]`, `(NN.NN)` cross-refs), and the EN/RU halves must keep the same marker counts —
// the bilingual parity rule in wh11ed/CLAUDE.md applies here exactly as it does to rule text.
// `help-tracker` → `tracker`. One derivation, shared by the index, the topic page and the router's
// legacy-anchor redirect, so the three can never disagree about what a topic's URL is.
export const slugOf = (section) => section.id.replace(/^help-/, '')

export const help = {
  en: {
    title: 'How to use this',
    intro: 'This is an app for playing 11th edition end to end: look a rule up, build the army list, then run the game with that list\'s own rules applied. Below are the parts that are not obvious from the screen. All of it is free, works without an account, and is meant for a phone at the table.',
    sections: [
      {
        id: 'help-search',
        title: 'Finding a rule fast',
        body: `The magnifier in the header — or **Ctrl + K** on a keyboard — opens search over everything at once: core rules, the Event Companion, faction rules, stratagems, enhancements and unit datasheets by name, each faction's FAQ and errata by heading, and this guide. Picking a result jumps to that exact paragraph, not just to the page it lives on.
▪ Inside a rule, an ALL-CAPS keyword or a bracketed ability such as [LETHAL HITS] opens its definition where you tapped it.
▪ A rule number in brackets — (03.02) — is a link to that rule.`,
      },
      {
        id: 'help-rules',
        title: 'Rules and factions',
        to: '/rules',
        toLabel: 'Open the rules',
        body: `**Every faction is here in full** — all 30 of them: the army rule, every detachment with its rule, stratagems and enhancements, and the datasheet of every unit, in both languages. That is the bulk of what this app is for.
▪ On a faction page, pick your detachment once — it is remembered, and the stratagems, enhancements and datasheet rules follow it everywhere.
▪ A datasheet carries its weapons, abilities, keywords and base sizes; the faction's own FAQ and errata sit on their own tab.
▪ The Core Rules are one page with the chapters in order, so a search result and a cross-reference always land in the same place. The Event Companion — missions, terrain layouts, pairings — is one page too.
▪ Playing a starter box instead? Combat Patrol has a small section of its own, with the fixed roster and rules each box plays. It is a side door, not the main one.`,
      },
      {
        id: 'help-rosters',
        title: 'Building an army list',
        to: '/roster',
        toLabel: 'Open the roster builder',
        body: `**Rosters** builds a list against the points from the current Munitorum Field Manual: pick units, wargear, leaders and enhancements, and the running total and the rules limits are checked as you go.
▪ **Already have a list elsewhere?** "Import" reads the text export from the Warhammer 40,000 app, from listhammer.info (with wargear or without) and from New Recruit (WTC and WTC-Compact). Everything we could not match is listed instead of silently dropped.
▪ **Allies** are there too: Agents of the Imperium in an Imperium army, a Knight or a Titan, Daemons with Chaos Space Marines, Brood Brothers in a Genestealer Cults list. They get their own section, cost what they cost as allies, and their limits — how many, how many points, which detachment unlocks them — are checked like everything else.
▪ **Export** writes the list back out in four shapes: the GW app's own format, WTC, WTC-Compact, and a short one for a chat.
▪ **Share** turns a list into a link. The list travels inside the link itself, so it never reaches a server, and whoever opens it needs no account.
▪ **Print it.** The printer button on a saved list opens a page that is the document itself: a one-sheet summary — the list, the army and detachment rules, the stratagems a line each — or the whole booklet with a card per unit, and a set of checkboxes between the two. It says how many sheets it will be as you tick them.
▪ A finished list can be handed to the tracker, and then its rules — auras, stratagems, states like Battle-shocked — are shown on the unit cards during the game.`,
      },
      {
        id: 'help-tracker',
        title: 'Tracking a game',
        to: '/tracker',
        toLabel: 'Open the tracker',
        body: `The tracker keeps score for both players: the mission and its secondaries, command points, and the per-round totals with a running Battle Points result.
▪ Start a game, and the app remembers it — closing the tab or losing signal mid-game changes nothing.
▪ **Not everything has to be tracked.** The last step of the setup — and the ⚙ Setup button during the game — lists the aids the app will keep alongside the missions: command points, each side's army rule, the turn-and-phase clock and its reminder of what applies in the phase you are in, and, with an army list attached, how much of that list's own rules it should follow — stratagems spent, auras, unit states, the sets you pick one option of each round. Turning one off only hides it: what it had recorded stays and comes back with it, and a rule that goes unclaimed is still printed on the card with the condition it is waiting for. Every row carries an "i" saying what it costs you.
▪ Finished games go to the history, where you can look back at how the score was made.
▪ Enough of them and the **statistics** page builds itself: win rate, average score, how you do on the play and on the receive, which factions beat you and which secondary cards actually pay. Under five games it shows counts rather than percentages, because three games are not a percentage.
▪ Sign in — the account button in the top bar, or the ⚙ menu on a phone — and the history and your army lists keep themselves in step across your devices: nothing to press, and a new phone starts where the old one left off.
▪ **One game, several phones.** The people icon beside the game controls shares the game you are playing: the others join by link, QR or a six-digit code — "Join a shared game" on the tracker page — pick who they are, and each scores their own side, while the board is the same for everyone within a few seconds. Only the host needs an account. The other side's card is on your screen, greyed: you see it — their list, their army rule's text — and they score it; that holds for the host too, until the host frees their seat in the sharing dialog — or ticks "Score both sides from this phone" there, for a guest who joined to watch. The gear on a joined phone sets only what this phone shows, such as the opponent's army-rule card. Losing signal changes nothing — play on, the phones catch up; the dot on the round bar says where the sync stands. When the game ends, everyone keeps it in their own history.`,
      },
      {
        id: 'help-broadcast',
        title: 'Broadcasting to OBS',
        body: `**A broadcast is a read-only live scoreboard** of the game you are tracking, for OBS or any browser on another device: you keep scoring on your phone, the overlay catches up within a few seconds. It needs a signed-in account — the link is served through the cloud — and a connection on both ends.
▪ **Turn it on.** In the game settings (step 4 of the setup, or the ⚙ Setup dialog mid-game) enable "Broadcast button (OBS)" — a broadcast button appears next to the game controls. Tap it, start the broadcast, copy the link.
▪ **In OBS**: add a **Browser Source**, paste the link, and give the source the size of the slot in your layout. The page background is transparent, so the panels sit straight on the video.
▪ **The overlay packs itself into whatever window it gets**: a wide slot puts the teams side by side, a tall one stacks them. Need a hard shape instead? Pick an aspect ratio (16:9, 4:3, 1:1, 9:16) under "Overlay options" and it holds that shape whatever the window does.
▪ **What it shows is chosen there too**: round and phase, team rosters, roles, CP, the VP breakdown, mission names, the secondary cards (played-out ones are hidden by default). The choice lives in the link itself — two OBS scenes can hold two differently configured links of one broadcast.
▪ **Who can see it:** anyone with the link, and only watch. "New link" cuts the old one off; "Stop broadcast" ends it. A broadcast nobody has updated for a week expires by itself.
▪ **What never leaves the phone:** army lists, rule switches, notes. The drawn secondary cards are shown — they are drawn face-up and are open information at the table.
▪ **Building your own overlay?** The same link serves the raw data: **api.wh-rules.ru/broadcast/<token>** answers with the whole public state of the match as JSON — round and phase, both sides with their players, CP, the VP breakdown, the secondary cards, and every battle round with its own score and Battle Points. It is open to any origin, so your own HTML/CSS can poll it and show whatever it likes. The broadcast dialog hands you that address ready to copy, next to the overlay link.
▪ **Ask politely and it will always answer.** Poll no faster than once a second and send the ETag back as If-None-Match: an unchanged game then costs almost nothing, on both ends. One address is capped at 60 reads a minute and answers 429 above that, because the whole app shares one budget with logins and list syncing. The app's own overlay asks every five seconds, and that is plenty for a scoreboard. The field-by-field contract is in the [API's README](https://github.com/Joker1796/wh11ed-api#the-broadcast-feed-for-custom-overlays).`,
      },
      {
        id: 'help-offline',
        title: 'Offline, and installing the app',
        body: `**A browser tab stays light on purpose** — it downloads the app and the text, and fetches pictures only as you look at them. That is the right trade for someone who opened one rule on the way to the club.
**The installed app goes fully offline.** Install it from the menu (⚙ → Install app; on an iPhone: Share → Add to Home Screen), open it once with a connection, and it downloads everything it needs. After that a venue with no signal changes nothing.
▪ **Want the lot without installing?** ⚙ → Download for offline. The button says how much it is before you tap it, and it does the same thing the installed app does for itself.
▪ Updates arrive by themselves and are never applied in the middle of a game.
▪ It is worth doing the first launch — or that download — at home, not in the queue at the event.`,
      },
      {
        id: 'help-data',
        title: 'Your data, and ours',
        body: `**Your lists and games live on your device**, not on a server — clearing the browser's data clears them too. **Nothing here needs an account:** every part of the app works signed out, with nothing locked, capped or nagged about. **Signing in adds a second home rather than moving them:** they then sync both ways, so a list saved on one device is on the next one you open, a game finished on the phone is in the history on the laptop, and a lost phone costs you nothing. Lists upload when you SAVE one, not on every keystroke, and if two devices changed the same list the later save wins. **The way in and out is the same on every page:** the account button in the top bar on a computer, the ⚙ menu on a phone — signing in returns you to the page you were on.
**Our rules and points have a version**, shown in the footer beside the app version. If a list you built somewhere else prices differently here, that is normally the two of us reading different Munitorum Field Manuals rather than an arithmetic error — the import shows both figures side by side for exactly that reason.
▪ **On an iPhone, a tab is not a safe place to keep them.** Safari clears a site's storage after about a week without a visit, and your lists and games are in it. Adding the app to the Home Screen exempts it, and signing in puts a copy in the cloud; either one is enough, and doing nothing is only fine if you play often.
▪ Found a rule that reads wrong, or a unit priced wrong? Write to the address in the footer, or open an issue in the repository. Say which faction and which unit, and it gets fixed in the next update.
▪ What changed and when is listed under the version number, on the changelog page.`,
      },
    ],
  },
  ru: {
    title: 'Как пользоваться',
    intro: 'Это приложение для игры в 11-ю редакцию целиком: посмотреть правило, собрать армейский лист и провести партию с применением правил этого листа. Ниже — то, что не видно с экрана. Всё бесплатно, работает без аккаунта и рассчитано на телефон за столом.',
    sections: [
      {
        id: 'help-search',
        title: 'Быстро найти правило',
        body: `Лупа в шапке — или **Ctrl + K** с клавиатуры — открывает поиск сразу по всему: основные правила, Event Companion, правила фракций, стратагемы, улучшения и датащиты юнитов по названию, FAQ и эррату каждой фракции по заголовку и эту справку. Выбранный результат ведёт к нужному абзацу, а не просто к странице, где он лежит.
▪ Внутри правила ключевое слово капсом или способность в квадратных скобках вроде [LETHAL HITS] открывает своё определение прямо там, где вы нажали.
▪ Номер правила в скобках — (03.02) — это ссылка на само правило.`,
      },
      {
        id: 'help-rules',
        title: 'Правила и фракции',
        to: '/rules',
        toLabel: 'Открыть правила',
        body: `**Каждая фракция есть целиком** — все 30: правило армии, все детачменты со своим правилом, стратагемами и улучшениями, и датащит каждого юнита, на двух языках. Это основной объём того, ради чего приложение существует.
▪ На странице фракции один раз выберите детачмент — выбор запоминается, и стратагемы, улучшения и правила датащитов следуют за ним повсюду.
▪ У датащита есть его оружие, способности, ключевые слова и размеры баз; FAQ и эррата фракции живут на отдельной вкладке.
▪ Основные правила — одна страница с главами по порядку, поэтому результат поиска и перекрёстная ссылка всегда приводят в одно и то же место. Event Companion — миссии, раскладки террейна, паринги — тоже одна страница.
▪ Играете стартовый набор? У Combat Patrol свой небольшой раздел с фиксированным составом и правилами каждой коробки. Это боковая дверь, а не главная.`,
      },
      {
        id: 'help-rosters',
        title: 'Собрать армейский лист',
        to: '/roster',
        toLabel: 'Открыть конструктор ростеров',
        body: `**Ростеры** собирают лист по очкам текущего Munitorum Field Manual: юниты, вооружение, лидеры и улучшения, а сумма и ограничения правил проверяются по ходу.
▪ **Лист уже собран где-то ещё?** «Импорт» читает текстовую выгрузку из приложения Warhammer 40,000, с listhammer.info (с вооружением и без) и из New Recruit (WTC и WTC-Compact). Всё, что не удалось сопоставить, показывается списком, а не пропадает молча.
▪ **Союзники** тоже на месте: Agents of the Imperium в имперской армии, рыцарь или титан, демоны у Chaos Space Marines, Brood Brothers в листе Genestealer Cults. У них своя секция, цена именно союзная, а ограничения — сколько штук, на сколько очков и какой детачмент их открывает — проверяются наравне со всем остальным.
▪ **Экспорт** отдаёт лист обратно в четырёх видах: формат приложения GW, WTC, WTC-Compact и короткий для чата.
▪ **Поделиться** превращает лист в ссылку. Лист едет внутри самой ссылки, то есть не попадает на сервер, а тому, кто её откроет, не нужен аккаунт.
▪ **Распечатать.** Кнопка принтера на сохранённом листе открывает страницу, которая и есть будущий документ: шпаргалка на один лист — список, армейское правило и правило детачмента, стратагемы по строке — или полный буклет с карточкой на каждый юнит, а между ними набор галок. Сколько получится листов, написано прямо там и меняется по ходу.
▪ Готовый лист можно передать в трекер — и тогда его правила (ауры, стратагемы, состояния вроде Battle-shocked) видны на карточках юнитов прямо во время партии.`,
      },
      {
        id: 'help-tracker',
        title: 'Вести партию',
        to: '/tracker',
        toLabel: 'Открыть трекер',
        body: `Трекер считает за обоих игроков: миссию и вторичные задачи, командные очки и суммы по раундам с текущим результатом в Battle Points.
▪ Начатая партия запоминается — закрыть вкладку или потерять сеть посреди игры ничего не меняет.
▪ **Отслеживать всё необязательно.** На последнем шаге настройки — и по кнопке ⚙ «Настройки» во время партии — перечислено, что приложение будет вести рядом с миссиями: командные очки, армейское правило каждой стороны, часы «ход и фаза» и напоминание о том, что действует в текущей фазе, а с прикреплённым листом — насколько подробно следовать правилам самого списка: потраченные стратагемы, ауры, состояния юнитов, наборы, из которых каждый раунд выбирают одно. Выключенное только прячется: записанное остаётся и вернётся вместе с ним, а незаявленное правило по-прежнему выписано на карточке вместе с условием, которого оно ждёт. У каждой строки есть «i» с объяснением, чего вы лишаетесь.
▪ Сыгранные партии уходят в историю, где видно, из чего сложился счёт.
▪ Из них сама собой складывается **статистика**: винрейт, средний счёт, как идут дела на первом и на втором ходу, кто вас обыгрывает и какие вторичные карты реально приносят очки. Пока партий меньше пяти, показываем счёт, а не проценты: три партии — это не процент.
▪ Войдите в аккаунт — кнопка аккаунта в верхней панели, на телефоне пункт в меню ⚙ — и история с армейскими листами сами держатся в актуальном состоянии на всех ваших устройствах: нажимать ничего не нужно, а новый телефон начинает с того же места.
▪ **Одна партия — несколько телефонов.** Значок с людьми рядом с кнопками партии делает её синхронизированной игрой: остальные подключаются по ссылке, QR или шестизначному коду — «Подключиться к синхронизированной игре» на странице трекера, — выбирают, кто они, и каждый ведёт свою сторону, а табло у всех одно с задержкой в несколько секунд. Аккаунт нужен только хосту. Карточка чужой стороны у вас на экране, но приглушена: вы её видите — лист, текст правила армии, — а ведут её они; это касается и хоста, пока он не освободит их место в окне партии — или не включит там «Вести обе стороны с этого телефона», если гость подключился только смотреть. Шестерёнка на подключившемся телефоне настраивает только то, что показывает этот телефон, — например, карточку правила армии соперника. Пропала связь — ничего не меняется: играйте дальше, телефоны догонят друг друга; точка на полосе раундов показывает, как дела у синхронизации. Когда партия закончится, каждый сохраняет её в свою историю.`,
      },
      {
        id: 'help-broadcast',
        title: 'Трансляция в OBS',
        body: `**Трансляция — живое табло вашей партии, только для чтения**, для OBS или любого браузера на другом устройстве: счёт ведётся с телефона, оверлей подхватывает изменения за несколько секунд. Нужны вход в аккаунт — ссылка работает через облако — и связь с обеих сторон.
▪ **Включение.** В настройках игры (шаг 4 сетапа или диалог ⚙ во время партии) включите «Кнопка трансляции (OBS)» — рядом с управлением игрой появится кнопка трансляции. Нажмите её, запустите трансляцию, скопируйте ссылку.
▪ **В OBS**: добавьте **Browser Source**, вставьте ссылку и задайте источнику размер слота вашего макета. Фон страницы прозрачный, панели лягут прямо на видео.
▪ **Оверлей сам вписывается в любое окно**: широкий слот кладёт команды рядом, вертикальный — столбиком. Нужна жёсткая форма? В «Настроить оверлей» выберите соотношение сторон (16:9, 4:3, 1:1, 9:16) — и он держит её при любом окне.
▪ **Что показывать — выбирается там же**: раунд и фаза, составы команд, роли, CP, разбивка VP, названия миссий, карты вторичек (отыгранные по умолчанию скрыты). Выбор живёт в самой ссылке — две сцены OBS могут держать две по-разному настроенные ссылки одной трансляции.
▪ **Кто видит:** любой, у кого есть ссылка, — и только смотрит. «Новая ссылка» обрывает старую; «Выключить» завершает трансляцию. Трансляция, которую неделю не обновляли, гаснет сама.
▪ **Что не покидает телефон:** армейские листы, свитчи правил, заметки. Вытянутые карты вторичек показываются — они тянутся в открытую и за столом являются открытой информацией.
▪ **Делаете свой оверлей?** Та же ссылка отдаёт сырые данные: **api.wh-rules.ru/broadcast/<токен>** возвращает всё публичное состояние матча в JSON — раунд и фазу, обе стороны с игроками, CP, разбивку VP, карты вторичек и каждый боевой раунд со своим счётом и Battle Points. Доступ открыт с любого origin, так что ваша вёрстка может опрашивать его и показывать что угодно. Готовый адрес лежит в диалоге трансляции, рядом со ссылкой на оверлей.
▪ **Спрашивайте вежливо, и вам всегда ответят.** Опрашивайте не чаще раза в секунду и возвращайте ETag заголовком If-None-Match: тогда неизменившаяся партия почти ничего не стоит обеим сторонам. На один адрес действует ограничение в 60 запросов в минуту, сверх него приходит 429 — бюджет у приложения общий, и его делят логины и синхронизация листов. Наш собственный оверлей спрашивает раз в пять секунд, и для табло этого с запасом. Описание каждого поля — в [README нашего API](https://github.com/Joker1796/wh11ed-api#the-broadcast-feed-for-custom-overlays).`,
      },
      {
        id: 'help-offline',
        title: 'Офлайн и установка приложения',
        body: `**Вкладка в браузере намеренно остаётся лёгкой** — она качает приложение и тексты, а картинки подтягивает по мере просмотра. Это правильный размен для того, кто открыл одно правило по дороге в клуб.
**Установленное приложение работает полностью офлайн.** Поставьте его из меню (⚙ → «Установить приложение»; на айфоне: «Поделиться» → «На экран «Домой»»), один раз откройте при связи — и оно скачает всё нужное. После этого площадка без сети ничего не меняет.
▪ **Хотите всё сразу, но без установки?** ⚙ → «Скачать для офлайна». На кнопке написан размер до того, как вы её нажмёте, а делает она то же самое, что установленное приложение делает само.
▪ Обновления приходят сами и никогда не применяются посреди партии.
▪ Первый запуск — или эту загрузку — стоит сделать дома, а не в очереди на ивенте.`,
      },
      {
        id: 'help-data',
        title: 'Ваши данные и наши',
        body: `**Ваши листы и партии хранятся на устройстве**, а не на сервере — очистка данных браузера удалит и их. **Аккаунт здесь ни для чего не обязателен:** без входа работает всё, ничего не заперто, не урезано и не выпрашивается. **Вход не переносит данные, а добавляет второй дом:** дальше они синхронизируются в обе стороны — лист, сохранённый на одном устройстве, открывается на следующем, партия, доигранная на телефоне, лежит в истории на ноутбуке, а потерянный телефон не стоит вам ничего. Листы уезжают в облако в момент **сохранения**, а не на каждое нажатие; если один и тот же лист меняли на двух устройствах, побеждает то сохранение, что позже. **Вход и выход находятся в одном месте на любой странице:** кнопка аккаунта в верхней панели, на телефоне — пункт в меню ⚙; после входа вы возвращаетесь на ту же страницу, с которой уходили.
**У наших правил и очков есть версия**, она показана в подвале рядом с версией приложения. Если лист, собранный в другом месте, оценивается у нас иначе, обычно это значит, что мы читаем разные выпуски Munitorum Field Manual, а не ошибку в арифметике — именно поэтому импорт показывает обе суммы рядом.
▪ **На айфоне вкладка — ненадёжное место для хранения.** Safari очищает хранилище сайта примерно через неделю без визитов, а списки и партии лежат именно там. Приложение, добавленное на экран «Домой», под эту чистку не попадает, а вход в аккаунт кладёт копию в облако; достаточно любого из двух, и ничего не делать можно только если вы играете часто.
▪ Нашли правило с ошибкой или неверные очки у юнита? Напишите на адрес в подвале или заведите issue в репозитории. Укажите фракцию и юнит — поправим в ближайшем обновлении.
▪ Что и когда менялось, перечислено под номером версии, на странице изменений.`,
      },
    ],
  },
}
