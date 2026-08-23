// The "How to use this" page (`/help`) — bilingual { en, ru }, same shape on both sides.
//
// WHAT BELONGS HERE. Only what a reader cannot work out by looking at the screen: the offline
// split (a tab is light, the installed app is not), where their data lives, why our points can
// disagree with a list built elsewhere, and the features that have no visible entry point until
// you know they exist (Ctrl+K, import, share, handing a roster to the tracker). Everything a
// button already says is left to the button.
//
// `body` uses the same block markup RuleBlock/renderRichText parse (`▪` bullets, `**bold**`,
// `[KEYWORD]`, `(NN.NN)` cross-refs), and the EN/RU halves must keep the same marker counts —
// the bilingual parity rule in wh11ed/CLAUDE.md applies here exactly as it does to rule text.
export const help = {
  en: {
    title: 'How to use this',
    intro: 'This is an app for playing 11th edition end to end: look a rule up, build the army list, then run the game with that list\'s own rules applied. Below are the parts that are not obvious from the screen. All of it is free, works without an account, and is meant for a phone at the table.',
    sections: [
      {
        id: 'help-search',
        title: 'Finding a rule fast',
        body: `The magnifier in the header — or **Ctrl + K** on a keyboard — opens search over everything at once: core rules, the Event Companion, faction rules, stratagems, enhancements and unit datasheets by name. Picking a result jumps to that exact paragraph, not just to the page it lives on.
▪ Inside a rule, an ALL-CAPS keyword or a bracketed ability such as [LETHAL HITS] opens its definition where you tapped it.
▪ A rule number in brackets — (03.02) — is a link to that rule.`,
      },
      {
        id: 'help-rules',
        title: 'Rules and factions',
        body: `**Every faction is here in full** — all 30 of them: the army rule, every detachment with its rule, stratagems and enhancements, and the datasheet of every unit, in both languages. That is the bulk of what this app is for.
▪ On a faction page, pick your detachment once — it is remembered, and the stratagems, enhancements and datasheet rules follow it everywhere.
▪ A datasheet carries its weapons, abilities, keywords and base sizes; the faction's own FAQ and errata sit on their own tab.
▪ The Core Rules are one page with the chapters in order, so a search result and a cross-reference always land in the same place. The Event Companion — missions, terrain layouts, pairings — is one page too.
▪ Playing a starter box instead? Combat Patrol has a small section of its own, with the fixed roster and rules each box plays. It is a side door, not the main one.`,
      },
      {
        id: 'help-rosters',
        title: 'Building an army list',
        body: `**Rosters** builds a list against the points from the current Munitorum Field Manual: pick units, wargear, leaders and enhancements, and the running total and the rules limits are checked as you go.
▪ **Already have a list elsewhere?** "Import" reads the text export from the Warhammer 40,000 app and from New Recruit (WTC and WTC-Compact). Everything we could not match is listed instead of silently dropped.
▪ **Export** writes the list back out in four shapes: the GW app's own format (what a tournament organiser asks for), WTC, WTC-Compact, and a short one for a chat.
▪ **Share** turns a list into a link. The list travels inside the link itself, so it never reaches a server, and whoever opens it needs no account.
▪ A finished list can be handed to the tracker, and then its rules — auras, stratagems, states like Battle-shocked — are shown on the unit cards during the game.`,
      },
      {
        id: 'help-tracker',
        title: 'Tracking a game',
        body: `The tracker keeps score for both players: the mission and its secondaries, command points, and the per-round totals with a running Battle Points result. It is meant to be used with one thumb while the other hand holds dice.
▪ Start a game, and the app remembers it — closing the tab or losing signal mid-game changes nothing.
▪ Finished games go to the history, where you can look back at how the score was made.
▪ Enough of them and the **statistics** page builds itself: win rate, average score, how you do on the play and on the receive, which factions beat you and which secondary cards actually pay. Under five games it shows counts rather than percentages, because three games are not a percentage.
▪ Sign in, and the history and your army lists keep themselves in step across your devices — nothing to press, and a new phone starts where the old one left off.`,
      },
      {
        id: 'help-offline',
        title: 'Offline, and installing the app',
        body: `**A browser tab stays light on purpose** — it downloads the app and the text, and fetches pictures only as you look at them. That is the right trade for someone who opened one rule on the way to the club.
**The installed app goes fully offline.** Install it from the menu (⚙ → Install app; on an iPhone: Share → Add to Home Screen), open it once with a connection, and it downloads everything it needs. After that a venue with no signal changes nothing.
▪ Updates arrive by themselves and are never applied in the middle of a game.
▪ It is worth doing the first launch at home, not in the queue at the event.`,
      },
      {
        id: 'help-data',
        title: 'Your data, and ours',
        body: `**Your lists and games live on your device**, not on a server — clearing the browser's data clears them too. **Nothing here needs an account:** every part of the app works signed out, with nothing locked, capped or nagged about. **Signing in adds a second home rather than moving them:** they then sync both ways, so a list saved on one device is on the next one you open, a game finished on the phone is in the history on the laptop, and a lost phone costs you nothing. Lists upload when you SAVE one, not on every keystroke, and if two devices changed the same list the later save wins.
**Our rules and points have a version**, shown in the footer beside the app version. If a list you built somewhere else prices differently here, that is normally the two of us reading different Munitorum Field Manuals rather than an arithmetic error — the import shows both figures side by side for exactly that reason.
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
        body: `Лупа в шапке — или **Ctrl + K** с клавиатуры — открывает поиск сразу по всему: основные правила, Event Companion, правила фракций, стратагемы, улучшения и датащиты юнитов по названию. Выбранный результат ведёт к нужному абзацу, а не просто к странице, где он лежит.
▪ Внутри правила ключевое слово капсом или способность в квадратных скобках вроде [LETHAL HITS] открывает своё определение прямо там, где вы нажали.
▪ Номер правила в скобках — (03.02) — это ссылка на само правило.`,
      },
      {
        id: 'help-rules',
        title: 'Правила и фракции',
        body: `**Каждая фракция есть целиком** — все 30: правило армии, все детачменты со своим правилом, стратагемами и улучшениями, и датащит каждого юнита, на двух языках. Это основной объём того, ради чего приложение существует.
▪ На странице фракции один раз выберите детачмент — выбор запоминается, и стратагемы, улучшения и правила датащитов следуют за ним повсюду.
▪ У датащита есть его оружие, способности, ключевые слова и размеры баз; FAQ и эррата фракции живут на отдельной вкладке.
▪ Основные правила — одна страница с главами по порядку, поэтому результат поиска и перекрёстная ссылка всегда приводят в одно и то же место. Event Companion — миссии, раскладки террейна, паринги — тоже одна страница.
▪ Играете стартовый набор? У Combat Patrol свой небольшой раздел с фиксированным составом и правилами каждой коробки. Это боковая дверь, а не главная.`,
      },
      {
        id: 'help-rosters',
        title: 'Собрать армейский лист',
        body: `**Ростеры** собирают лист по очкам текущего Munitorum Field Manual: юниты, вооружение, лидеры и улучшения, а сумма и ограничения правил проверяются по ходу.
▪ **Лист уже собран где-то ещё?** «Импорт» читает текстовую выгрузку из приложения Warhammer 40,000 и из New Recruit (WTC и WTC-Compact). Всё, что не удалось сопоставить, показывается списком, а не пропадает молча.
▪ **Экспорт** отдаёт лист обратно в четырёх видах: формат приложения GW (его просят на турнирах), WTC, WTC-Compact и короткий для чата.
▪ **Поделиться** превращает лист в ссылку. Лист едет внутри самой ссылки, то есть не попадает на сервер, а тому, кто её откроет, не нужен аккаунт.
▪ Готовый лист можно передать в трекер — и тогда его правила (ауры, стратагемы, состояния вроде Battle-shocked) видны на карточках юнитов прямо во время партии.`,
      },
      {
        id: 'help-tracker',
        title: 'Вести партию',
        body: `Трекер считает за обоих игроков: миссию и вторичные задачи, командные очки и суммы по раундам с текущим результатом в Battle Points. Он рассчитан на то, что вы работаете одним пальцем, а во второй руке кубики.
▪ Начатая партия запоминается — закрыть вкладку или потерять сеть посреди игры ничего не меняет.
▪ Сыгранные партии уходят в историю, где видно, из чего сложился счёт.
▪ Из них сама собой складывается **статистика**: винрейт, средний счёт, как идут дела на первом и на втором ходу, кто вас обыгрывает и какие вторичные карты реально приносят очки. Пока партий меньше пяти, показываем счёт, а не проценты: три партии — это не процент.
▪ Войдите в аккаунт — и история с армейскими листами сами держатся в актуальном состоянии на всех ваших устройствах: нажимать ничего не нужно, а новый телефон начинает с того же места.`,
      },
      {
        id: 'help-offline',
        title: 'Офлайн и установка приложения',
        body: `**Вкладка в браузере намеренно остаётся лёгкой** — она качает приложение и тексты, а картинки подтягивает по мере просмотра. Это правильный размен для того, кто открыл одно правило по дороге в клуб.
**Установленное приложение работает полностью офлайн.** Поставьте его из меню (⚙ → «Установить приложение»; на айфоне: «Поделиться» → «На экран «Домой»»), один раз откройте при связи — и оно скачает всё нужное. После этого площадка без сети ничего не меняет.
▪ Обновления приходят сами и никогда не применяются посреди партии.
▪ Первый запуск стоит сделать дома, а не в очереди на ивенте.`,
      },
      {
        id: 'help-data',
        title: 'Ваши данные и наши',
        body: `**Ваши листы и партии хранятся на устройстве**, а не на сервере — очистка данных браузера удалит и их. **Аккаунт здесь ни для чего не обязателен:** без входа работает всё, ничего не заперто, не урезано и не выпрашивается. **Вход не переносит данные, а добавляет второй дом:** дальше они синхронизируются в обе стороны — лист, сохранённый на одном устройстве, открывается на следующем, партия, доигранная на телефоне, лежит в истории на ноутбуке, а потерянный телефон не стоит вам ничего. Листы уезжают в облако в момент **сохранения**, а не на каждое нажатие; если один и тот же лист меняли на двух устройствах, побеждает то сохранение, что позже.
**У наших правил и очков есть версия**, она показана в подвале рядом с версией приложения. Если лист, собранный в другом месте, оценивается у нас иначе, обычно это значит, что мы читаем разные выпуски Munitorum Field Manual, а не ошибку в арифметике — именно поэтому импорт показывает обе суммы рядом.
▪ Нашли правило с ошибкой или неверные очки у юнита? Напишите на адрес в подвале или заведите issue в репозитории. Укажите фракцию и юнит — поправим в ближайшем обновлении.
▪ Что и когда менялось, перечислено под номером версии, на странице изменений.`,
      },
    ],
  },
}
