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
▪ **Export** is in a list's ⋮ menu. It writes the list out in five formats: the GW app's, WTC, WTC-Compact, Discord and plain.
▪ **To share a list**, press "Copy share link" in the same window. The list travels inside the link, so it never reaches a server. Whoever opens it needs no account.
▪ **To print**, pick "Print" in the ⋮ menu. You get a one-sheet summary or a full booklet with a card per unit, and checkboxes in between. The page says how many sheets it will take.
▪ **To play with a list**, pick "Start a game with this list" in its ⋮ menu. The tracker's setup opens with the faction, the detachments and the list already in. During the game the list's rules — auras, stratagems, states like Battle-shocked — show on the unit cards.`,
      },
      {
        id: 'help-tracker',
        title: 'Tracking a game',
        to: '/tracker',
        toLabel: 'Open the tracker',
        body: `The tracker keeps score for both players: the primary and secondary missions, command points, and the totals by round with a running Battle Points result.
▪ The game in progress is remembered. Closing the tab or losing signal mid-game changes nothing.
**What to track**
▪ The last step of the setup lists what the app keeps beside the missions: command points, each side's army rule, the turn-and-phase clock and what applies in the current phase. With an army list attached, it also asks how closely to follow the list's own rules: stratagems spent, auras, unit states.
▪ During the game the same list is under the "Setup" button.
▪ Turning a row off only hides it. What it recorded stays and comes back with it.
▪ Every row has an "i" that says what it does.
**History and statistics**
▪ A finished game goes to the history. Tap it to see how the score was made, or to resume it.
▪ The **statistics** page builds itself from the history: win rate, average score, going first and second, which factions beat you, which secondary cards pay. Under five games it shows counts, not percentages.
▪ Sign in from the ⚙ menu, and the history and your lists are the same on all your devices. There is nothing to press: a new phone starts where the old one left off.
**Setting a game up together**
▪ On the tracker page press "Shared game", then "Start a new one". Choose the game type and press "Open the lobby". Only you need an account.
▪ The others press "Shared game", then "Join a game", and enter the code — or open your link or QR code.
▪ Each guest fills in their own side on their device: name, faction, detachments, list. Then they press "Done". Nothing leaves their phone before that.
▪ You choose the mission, the battlefield, who goes first and what to track. You start the game once the other side is in.
▪ A side is filled in by one phone: the first to join it. It can hand the right over to a partner.
▪ While you are on the armies step, a guest changes their side freely. Once you have moved on, they ask, and you answer.
**One game, several phones**
▪ A game already running is shared from the people icon beside the game's buttons. The others join the same way, by code, link or QR, and pick their side.
▪ Each phone scores its own side. The board is the same on every phone within a few seconds.
▪ The other side's card is on your screen, greyed: you can read it, they score it. The host too, until it frees their seat in the sharing window. "Score both sides from this device" is there for a guest who only came to watch.
▪ Losing signal changes nothing: play on, and the devices catch up. The dot on the round bar shows how the sync is doing.
▪ When the game ends, each player keeps it in their own history.`,
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
        body: `**The site in a browser tab stays light on purpose.** It loads the text, and pictures only as you look at them. That suits someone who opened one rule on the way to the club.
**Playing at a table, put it on your phone as an app.** It then works with no signal: the rules, your lists and the tracker.
▪ **To install:** ⚙ → "Install app". On an iPhone: Safari's Share button → "Add to Home Screen".
▪ **On an iPhone, sign in before you install.** There the installed app keeps its data apart from Safari and does not see the lists and games you made in the browser. Once you are signed in, they show up in the app too. On Android the app and the browser share them.
▪ Open the installed app once with a connection: it downloads everything it needs. The bottom of the screen shows how far it is.
▪ **Want it all without installing?** ⚙ → "Download for offline". The button says how much it is before you tap it.
▪ Updates arrive by themselves and are never applied in the middle of a game.
▪ Do the first launch at home, not in the queue at the event.`,
      },
      {
        id: 'help-data',
        title: 'Your data, and ours',
        body: `**Your lists and games live on your device**, not on a server — clearing the browser's data clears them too. **Nothing here needs an account:** every part of the app works signed out, with nothing locked, capped or nagged about. **Signing in adds a second home rather than moving them:** they then sync both ways, so a list saved on one device is on the next one you open, a game finished on the phone is in the history on the laptop, and a lost phone costs you nothing. Lists upload when you SAVE one, not on every keystroke, and if two devices changed the same list the later save wins. **Sign in and out from the ⚙ menu** on any page. Signing in brings you back to the page you were on.
**Our rules and points have a version**, shown in the footer beside the app version. If a list you built somewhere else prices differently here, that is normally the two of us reading different Munitorum Field Manuals rather than an arithmetic error — the import shows both figures side by side for exactly that reason.
▪ **On an iPhone, a tab is not a safe place to keep them.** Safari clears a site's storage after about a week without a visit, and your lists and games are in it. Adding the app to the Home Screen exempts it, and signing in puts a copy in the cloud; either one is enough, and doing nothing is only fine if you play often.
▪ Found a rule that reads wrong, or a unit priced wrong? Press ⚙ → "Report a bug". Say which faction and which unit, and it gets fixed in the next update.
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
▪ **Экспорт** — в меню ⋮ листа. Он отдаёт лист в пяти форматах: приложение GW, WTC, WTC-Compact, Discord и простой.
▪ **Чтобы поделиться листом**, нажмите «Копировать ссылку» в том же окне. Лист едет внутри ссылки и не попадает на сервер. Тому, кто её откроет, аккаунт не нужен.
▪ **Чтобы распечатать**, выберите «Печать» в меню ⋮. Получится шпаргалка на один лист или полный буклет с карточкой на каждый юнит, а между ними — набор галочек. Сколько выйдет листов, написано на странице.
▪ **Чтобы сыграть листом**, выберите «Начать партию с этим списком» в его меню ⋮. Настройка трекера откроется с фракцией, детачментами и самим листом. Во время партии правила листа — ауры, стратагемы, состояния вроде Battle-shocked — видны на карточках юнитов.`,
      },
      {
        id: 'help-tracker',
        title: 'Вести партию',
        to: '/tracker',
        toLabel: 'Открыть трекер',
        body: `Трекер считает за обоих игроков: первичную и вторичные миссии, командные очки и суммы по раундам с текущим результатом в Battle Points.
▪ Начатая партия запоминается. Закрыть вкладку или потерять сеть посреди игры ничего не меняет.
**Что отслеживать**
▪ На последнем шаге настройки перечислено, что приложение ведёт рядом с миссиями: командные очки, правило армии каждой стороны, часы «ход и фаза» и что действует в текущей фазе. С прикреплённым листом добавляется, насколько подробно следовать его правилам: потраченные стратагемы, ауры, состояния юнитов.
▪ Во время партии тот же список открывается кнопкой «Настройки».
▪ Выключенная строка только прячется. Записанное остаётся и вернётся вместе с ней.
▪ У каждой строки есть «i» с объяснением, что она делает.
**История и статистика**
▪ Доигранная партия уходит в историю. Нажмите на неё, чтобы увидеть, из чего сложился счёт, или продолжить её.
▪ Страница **статистики** складывается из истории сама: винрейт, средний счёт, первый и второй ход, кто вас обыгрывает, какие вторичные карты приносят очки. Пока партий меньше пяти, она показывает количество, а не проценты.
▪ Войдите в аккаунт в меню ⚙, и история с листами будут одинаковыми на всех ваших устройствах. Нажимать ничего не нужно: новый телефон начинает с того же места.
**Настроить партию вместе**
▪ На странице трекера нажмите «Совместная игра», затем «Начать новую». Выберите тип игры и запустите лобби. Аккаунт нужен только вам.
▪ Остальные нажимают «Совместная игра», затем «Подключиться», и вводят код — или открывают вашу ссылку или QR-код.
▪ Каждый гость заполняет свою сторону на своём устройстве: имя, фракцию, детачменты, лист. Потом нажимает «Готово». До этого с его телефона ничего не уходит.
▪ Вы выбираете миссию, поле, очерёдность хода и что отслеживать. Партию начинаете вы, когда сторона соперника на месте.
▪ Сторону заполняет один телефон — тот, что подключился к ней первым. Он может передать право партнёру.
▪ Пока вы на шаге «Армии», гость меняет свою сторону свободно. Когда вы ушли дальше, он просит, а вы отвечаете.
**Одна партия на нескольких телефонах**
▪ Уже идущей партией можно поделиться значком с людьми рядом с кнопками партии. Остальные подключаются так же — по коду, ссылке или QR — и выбирают свою сторону.
▪ Каждый телефон ведёт свою сторону. Табло у всех одно, с задержкой в несколько секунд.
▪ Чужая сторона на вашем экране приглушена: читать её можно, ведёт её другое устройство. Хоста это тоже касается, пока он не освободит это место в окне совместной игры. Там же есть «Вести обе стороны с этого устройства» — для гостя, который подключился только смотреть.
▪ Пропала связь — играйте дальше, устройства догонят друг друга. Точка на полосе раундов показывает, как идёт синхронизация.
▪ Когда партия закончится, каждый сохраняет её в свою историю.`,
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
        body: `**Сайт во вкладке браузера намеренно лёгкий.** Он загружает тексты, а картинки — по мере просмотра. Это удобно тому, кто открыл одно правило по дороге в клуб.
**Если играете за столом, поставьте сайт на телефон как приложение.** Тогда он работает без сети: правила, ростеры и трекер.
▪ **Как поставить:** ⚙ → «Установить приложение». На айфоне: кнопка «Поделиться» в Safari → «На экран „Домой“».
▪ **На айфоне сначала войдите в аккаунт.** Там установленное приложение хранит данные отдельно от Safari и не видит ростеры и партии, сделанные в браузере. После входа они появятся и в приложении. На Android приложение и браузер видят одни и те же данные.
▪ Один раз откройте установленное приложение при связи: оно скачает всё нужное. Как идёт загрузка, видно внизу экрана.
▪ **Хотите всё сразу, но без установки?** ⚙ → «Скачать для офлайна». На кнопке написан размер ещё до нажатия.
▪ Обновления приходят сами и никогда не применяются посреди партии.
▪ Первый запуск лучше сделать дома, а не в очереди на ивенте.`,
      },
      {
        id: 'help-data',
        title: 'Ваши данные и наши',
        body: `**Ваши листы и партии хранятся на устройстве**, а не на сервере — очистка данных браузера удалит и их. **Аккаунт здесь ни для чего не обязателен:** без входа работает всё, ничего не заперто, не урезано и не выпрашивается. **Вход не переносит данные, а добавляет второй дом:** дальше они синхронизируются в обе стороны — лист, сохранённый на одном устройстве, открывается на следующем, партия, доигранная на телефоне, лежит в истории на ноутбуке, а потерянный телефон не стоит вам ничего. Листы уезжают в облако в момент **сохранения**, а не на каждое нажатие; если один и тот же лист меняли на двух устройствах, побеждает то сохранение, что позже. **Вход и выход — в меню ⚙** на любой странице. После входа вы вернётесь на ту же страницу.
**У наших правил и очков есть версия**, она показана в подвале рядом с версией приложения. Если лист, собранный в другом месте, оценивается у нас иначе, обычно это значит, что мы читаем разные выпуски Munitorum Field Manual, а не ошибку в арифметике — именно поэтому импорт показывает обе суммы рядом.
▪ **На айфоне вкладка — ненадёжное место для хранения.** Safari очищает хранилище сайта примерно через неделю без визитов, а списки и партии лежат именно там. Приложение, добавленное на экран «Домой», под эту чистку не попадает, а вход в аккаунт кладёт копию в облако; достаточно любого из двух, и ничего не делать можно только если вы играете часто.
▪ Нашли правило с ошибкой или неверные очки у юнита? Нажмите ⚙ → «Сообщить об ошибке». Укажите фракцию и юнит — поправим в ближайшем обновлении.
▪ Что и когда менялось, перечислено под номером версии, на странице изменений.`,
      },
    ],
  },
}
