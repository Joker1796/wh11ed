// The tracker tour's chapters (useTour.js, TourOverlay.vue) — a PROTOTYPE for the owner to correct
// (2026-10-08). One chapter per screen of the game's flow, in its order. A step names the element
// it lights by its `data-tour` value — `target: { phone, desk }` where the two layouts differ
// (desk = wider than 900px) — or none, for a card in the middle of a dimmed screen. `tab` opens
// that tab of the game screen first. `when(ctx)` keeps a step to a state of the screen (the ctx
// its screen passes: the game screen says whether the battle has `begun`).

export const TOUR_CHAPTERS = {
  home: {
    steps: [
      {
        target: 'home-cta',
        ru: { title: 'Новая игра', text: 'Нажмите «Новая игра», чтобы начать партию. Откроется настройка из четырёх шагов: армии, миссия, поле и что отслеживать. Если партия уже идёт, здесь будет кнопка «Продолжить игру».' },

        en: { title: 'New game', text: 'Press “New game” to start a game. A four-step setup opens: armies, mission, field and what to track. With a game in progress, this button says “Resume game”.' },

      },
      {
        target: null,
        ru: { title: 'Партия из ростера', text: 'Откройте ростер, нажмите «…» и выберите «Начать партию с этим списком». Так партию можно начать прямо из ростера: фракция, детачменты и сам ростер встанут в настройку сами.' },

        en: { title: 'A game from a roster', text: 'Open a roster, press “…” and pick “Start a game with this list”. That starts a game straight from the roster: the faction, detachments and the roster itself fill the setup for you.' },

      },
      {
        target: 'home-coop',
        ru: { title: 'Совместная игра', text: 'Нажмите, если играете на нескольких телефонах. Каждый игрок ведёт свою сторону на своём телефоне. Один игрок создаёт партию и отправляет остальным ссылку или код.' },

        en: { title: 'Shared game', text: 'Press this when you play on several phones. Each player keeps their own side on their own phone. One player creates the game and sends the others a link or a code.' },

      },
      {
        target: 'home-history',
        ru: { title: 'История партий', text: 'Нажмите на карточку, чтобы увидеть итог партии или продолжить её. Здесь ваши сыгранные партии. Если вы вошли в аккаунт, история хранится и в облаке.' },

        en: { title: 'Game history', text: 'Tap a card to see a game’s result or to resume it. Your finished games are here. When you are signed in, the history is kept in the cloud too.' },

      },
    ],
  },
  'setup-1': {
    steps: [
      {
        target: 'setup-gametype',
        ru: { title: 'Тип игры', text: 'Выберите, как вы играете. Одиночная — один игрок против одного. Парная (Doubles) — два на два, у каждой стороны по две армии. Комбат патруль — небольшие армии из стартовых наборов.' },

        en: { title: 'Game type', text: 'Choose how you play. Singles is one player against one. Doubles is two against two, with two armies a side. Combat Patrol is small armies from the starter boxes.' },

      },
      {
        target: 'setup-size',
        ru: { title: 'Размер игры', text: 'Выберите размер игры. Он задаёт лимит очков армии и число очков детачмента (DP).' },

        en: { title: 'Game size', text: 'Choose the game size. It sets the army’s points limit and the Detachment Points (DP).' },

      },
      {
        target: 'setup-player',
        ru: { title: 'Ваша армия', text: 'Впишите своё имя, выберите фракцию и детачменты. Если у вас есть ростер, приложите его кнопкой справа от фракции. Тогда в партии будут карточки ваших юнитов с их правилами. Ниже так же заполните армию соперника.' },

        en: { title: 'Your army', text: 'Enter your name, pick your faction and detachments. If you have a roster, attach it with the button to the right of the faction. The game then has your unit cards with their rules. Fill in the opponent’s army below the same way.' },

      },
    ],
  },
  'setup-2': {
    steps: [
      {
        target: 'setup-twist',
        ru: { title: 'Твист', text: 'Нажмите «Выбрать твист» и выберите его из списка или возьмите случайный. Твист — дополнительное правило партии, которое меняет миссию.' },

        en: { title: 'Twist', text: 'Press “Choose twist” and pick one from the list, or take a random one. A twist is an extra rule of the game that changes the mission.' },

      },
      {
        target: 'setup-secondary',
        ru: { title: 'Вторичные миссии', text: 'Выберите, как вы играете вторичные миссии. Тактические — каждый ход вы берёте новые карты из колоды. Фиксированные — вы выбираете две миссии сейчас, и они остаются на всю партию.' },

        en: { title: 'Secondary missions', text: 'Choose how you play secondary missions. Tactical: you draw new cards from the deck every turn. Fixed: you pick two missions now, and they stay for the whole game.' },

      },
      {
        target: 'setup-primary',
        ru: { title: 'Первичная миссия', text: 'Нажмите на карточку, чтобы прочитать правила первичной миссии вашей партии. Твист в ней уже учтён.' },

        en: { title: 'Primary mission', text: 'Tap the card to read your game’s primary mission. The twist is already applied to it.' },

      },
    ],
  },
  'setup-3': {
    steps: [
      {
        target: 'setup-score',
        ru: { title: 'Счёт', text: 'Выберите, как считать результат. VP — победные очки за партию. BP — Battle Points, турнирные очки по итогам партии.' },

        en: { title: 'Score', text: 'Choose how the result is counted. VP is the game’s Victory Points. BP is Battle Points, the tournament points for the result.' },

      },
      {
        target: 'setup-attacker',
        ru: { title: 'Attacker', text: 'Отметьте, кто атакует. От этого зависит, с какой стороны стола вы расставляетесь.' },

        en: { title: 'Attacker', text: 'Mark who attacks. It decides which side of the table you deploy on.' },

      },
      {
        target: 'setup-first',
        ru: { title: 'Первый ход', text: 'Отметьте, кто ходит первым. Этот порядок ходов сохранится на всю партию.' },

        en: { title: 'First turn', text: 'Mark who goes first. This turn order stays for the whole game.' },

      },
      {
        target: 'setup-layout',
        ru: { title: 'Расстановка поля', text: 'Поставьте террейн на столе по этой схеме. Это рекомендованная расстановка для вашей миссии.' },

        en: { title: 'Layout', text: 'Set the terrain on the table by this map. It is the recommended layout for your mission.' },

      },
    ],
  },
  'setup-4': {
    steps: [
      {
        target: 'setup-opts-game',
        ru: { title: 'Что отслеживать', text: 'Выберите, что трекер будет вести за вас: фазы, CP, правила армий. Выключенное не появится на экране партии. Включить его можно и посреди игры, в настройке партии.' },

        en: { title: 'What to track', text: 'Choose what the tracker keeps for you: phases, CP, army rules. Whatever is off does not appear on the game screen. You can switch it on mid-game, in the game’s setup.' },

      },
      {
        target: 'setup-opts-roster',
        ru: { title: 'Ростер и модификаторы', text: 'Включите эти пункты, если к армии приложен ростер. Например, живые модификаторы покажут в карточке юнита, что изменили правила.' },

        en: { title: 'Roster and modifiers', text: 'Switch these on when a roster is attached to the army. For example, live modifiers show on a unit’s card what the rules changed.' },

      },
      {
        target: 'setup-look',
        ru: { title: 'Цвета сторон', text: 'Отметьте «Настроить цвета», чтобы выбрать цвет каждой стороны самому. Без этого каждая сторона окрашена в цвет своей фракции — здесь видно, как это будет выглядеть. Выбор действует только на вашем телефоне.' },
        en: { title: 'Side colours', text: 'Tick “Customise colours” to choose each side’s colour yourself. Otherwise each side wears its faction’s colour — this shows how it will look. The choice applies to your phone only.' },
      },
      {
        target: 'setup-start',
        ru: { title: 'Перейти к игре', text: 'Нажмите, когда всё готово. Откроется экран партии. Бой начнётся отдельной кнопкой, когда вы расставите армии.' },

        en: { title: 'Go to the game', text: 'Press this when everything is ready. The game screen opens. The battle starts with its own button once you have deployed.' },

      },
    ],
  },
  game: {
    steps: [
      {
        target: 'game-line',
        ru: { title: 'Раунд и ход', text: 'Здесь написано, какой сейчас раунд и чей ход. Точка слева окрашена в цвет стороны, которая ходит. В совместной игре точка медленно мигает, пока телефоны синхронизированы.' },
        en: { title: 'Round and turn', text: 'This line says which round it is and whose turn. The dot on the left has the colour of the side on turn. In a shared game the dot slowly blinks while the phones are in sync.' },
      },
      {
        target: 'game-rounds',
        when: (ctx) => ctx.phases,
        ru: { title: 'Раунды', text: 'Нажмите на полосу, чтобы открыть список раундов. Там можно открыть прошлый раунд и поправить его счёт. Полоса — это пять раундов партии, текущий разбит на фазы обоих ходов.' },
        en: { title: 'Rounds', text: 'Tap the strip to open the list of rounds. There you can open a past round and correct its score. The strip is the game’s five rounds, the current one split into both turns’ phases.' },
      },
      {
        target: 'game-rounds',
        when: (ctx) => !ctx.phases,
        ru: { title: 'Раунды', text: 'Нажмите на полосу, чтобы открыть список раундов. Там можно открыть прошлый раунд и поправить его счёт. Полоса — это пять раундов партии.' },
        en: { title: 'Rounds', text: 'Tap the strip to open the list of rounds. There you can open a past round and correct its score. The strip is the game’s five rounds.' },
      },
      {
        target: 'game-score',
        ru: { title: 'Счёт', text: 'Нажмите на карточку стороны, и вкладки ниже покажут её данные. На карточках счёт обеих сторон: победные очки или BP, первичка, вторичка и CP. У каждой стороны свой цвет.' },
        en: { title: 'Score', text: 'Tap a side’s card, and the tabs below show that side. The cards hold both sides’ score: Victory Points or BP, primary, secondary and CP. Each side has its own colour.' },
      },
      {
        target: 'game-reserves',
        when: (ctx) => !ctx.begun && ctx.lists,
        ru: { title: 'Резервы', text: 'Нажмите «Отметить резервы», если какие-то юниты не выходят на стол при расстановке, а остаются в стратегическом резерве. Их нужно отметить до начала боя. Откроется ваш ростер, и туториал покажет, где это сделать.' },
        en: { title: 'Reserves', text: 'Press “Mark reserves” if some units stay in Strategic Reserves instead of deploying. They are marked before the battle. Your roster opens, and the tutorial shows where to do it.' },
      },
      {
        target: 'game-start',
        when: (ctx) => !ctx.begun,
        ru: { title: 'Начать игру', text: 'Расставьте армии на столе и нажмите «Начать игру». Пока бой не начат: с этой кнопки начнётся первый ход, и придут первые CP.' },
        en: { title: 'Start game', text: 'Deploy your armies on the table and press “Start game”. The battle has not begun yet: the first turn starts with this button, and the first CP arrive.' },
      },
      {
        target: 'game-turnbar',
        when: (ctx) => ctx.begun,
        ru: { title: 'Ход и фазы', text: 'Переключайте фазы хода стрелками. Нажмите на название фазы, чтобы выбрать её из списка. Кнопка «Завершить ход» передаёт ход сопернику.' },
        en: { title: 'Turn and phases', text: 'Switch the turn’s phases with the arrows. Tap the phase’s name to pick it from a list. “End turn” passes the turn to the opponent.' },
      },
      {
        target: 'game-tabs',
        ru: { title: 'Вкладки', text: 'Нажмите на значок, чтобы открыть вкладку: миссии, фаза, CP, армии, ростер, лог или статистика. Каждый новый ход открывается на вкладке «Миссии».' },
        en: { title: 'Tabs', text: 'Tap an icon to open a tab: missions, phase, CP, armies, roster, log or stats. Every new turn opens on the Missions tab.' },
      },
      {
        target: 'game-missions',
        tab: 'missions',
        ru: { title: 'Миссии', text: 'Отмечайте выполненные миссии, чтобы начислить очки. Здесь первичная и вторичные миссии. В тактическом режиме здесь же вы берёте новые карты и сбрасываете ненужные.' },
        en: { title: 'Missions', text: 'Mark the missions you achieve to score them. The primary and secondary missions are here. In tactical mode you also draw new cards and discard ones you do not need here.' },
      },
      {
        target: 'game-menu',
        ru: { title: 'Меню партии', text: 'Нажмите «…», чтобы открыть меню партии: настройка, совместная игра, трансляция и завершение игры. Отсюда же можно снова открыть туториал.' },
        en: { title: 'The game’s menu', text: 'Press “…” to open the game’s menu: setup, the shared game, the broadcast and finishing the game. The tutorial opens from here again too.' },
      },
    ],
  },
  // Marking the reserves: shown the first time "Mark reserves" is pressed (owner, 2026-10-09: the
  // button used to leave the player on the roster with nothing said).
  reserves: {
    steps: [
      {
        target: 'game-tabs',
        ru: { title: 'Ваш ростер', text: 'Открылась вкладка «Ростер». Здесь ваши юниты, и у каждого отмечено, где он: на поле боя, в стратегическом резерве или уничтожен.' },
        en: { title: 'Your roster', text: 'The Roster tab is open. Your units are here, and each one shows where it is: on the battlefield, in Strategic Reserves or destroyed.' },
      },
      {
        target: 'unit-status',
        ru: { title: 'Статус юнита', text: 'Нажмите эту кнопку у юнита, который остаётся в резерве, и выберите «В стратегическом резерве». Повторите для каждого такого юнита. Иконка на кнопке покажет выбранный статус.' },
        en: { title: 'Unit status', text: 'Press this button on a unit that stays in reserve, and pick “In Strategic Reserves”. Do the same for each such unit. The icon on the button shows the chosen status.' },
      },
      {
        target: 'game-score',
        when: (ctx) => ctx.otherList && !ctx.shared,
        ru: { title: 'Резервы соперника', text: 'Нажмите на карточку счёта соперника, и на вкладке появится его ростер. Его резервы отмечаются так же.' },
        en: { title: 'The opponent’s reserves', text: 'Tap the opponent’s score card, and the tab shows their roster. Their reserves are marked the same way.' },
      },
      {
        target: 'game-score',
        when: (ctx) => ctx.otherList && ctx.shared,
        ru: { title: 'Резервы соперника', text: 'В совместной игре соперник отмечает свои резервы сам, на своём телефоне.' },
        en: { title: 'The opponent’s reserves', text: 'In a shared game the opponent marks their own reserves, on their phone.' },
      },
      {
        target: 'game-start',
        ru: { title: 'Когда резервы отмечены', text: 'Нажмите «Начать игру». Когда юнит выйдет из резерва на стол, откройте его статус снова и выберите «На поле боя».' },
        en: { title: 'With the reserves marked', text: 'Press “Start game”. When a unit arrives from reserves, open its status again and pick “On the battlefield”.' },
      },
    ],
  },
  // The battle has begun: what the turn bar does now. Shown the moment "Start game" is pressed, so a
  // player who met the screen before the battle still gets it.
  turn: {
    steps: [
      {
        target: 'game-turnbar',
        ru: { title: 'Ход и фазы', text: 'Переключайте фазы хода стрелками. Нажмите на название фазы, чтобы выбрать её из списка. Кнопка с круглой стрелкой отменяет последний ход.' },
        en: { title: 'Turn and phases', text: 'Switch the turn’s phases with the arrows. Tap the phase’s name to pick it from a list. The round-arrow button undoes the last turn.' },
      },
      {
        target: 'game-turnbar',
        ru: { title: 'Завершить ход', text: 'Нажмите «Завершить ход», когда закончите ход. Сначала трекер покажет, что ещё не начислено и какие карты уйдут. Потом ход перейдёт сопернику.' },
        en: { title: 'End turn', text: 'Press “End turn” when your turn is done. The tracker first shows what is not scored yet and which cards leave. Then the turn passes to the opponent.' },
      },
    ],
  },
}
