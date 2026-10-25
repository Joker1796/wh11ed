// The tracker tour's chapters (useTour.js, TourOverlay.vue) — a PROTOTYPE for the owner to correct
// (2026-10-08). One chapter per screen of the game's flow, in its order. A step names the element
// it lights by its `data-tour` value — `target: { phone, desk }` where the two layouts differ
// (desk = wider than 900px) — or none, for a card in the middle of a dimmed screen. `show` puts the
// screen in the state the step tells about first — a tab of the game screen opened, a side picked
// (useTourShow, answered by the screen that owns the state). `when(ctx)` keeps a step to a state of
// the screen (the ctx its screen passes: the game screen says whether the battle has `begun`).

// The game screen's tabs that show ONE side, named for a sentence (the log shows both).
const SIDE_TABS = {
  ru: { missions: 'миссии', phase: (c) => (c.phases ? 'фазу' : 'ход'), cp: 'CP', armies: 'армию', stats: 'статистику' },
  en: { missions: 'missions', phase: (c) => (c.phases ? 'phase' : 'turn'), cp: 'CP', armies: 'army', stats: 'stats' },
}
const sideTabs = (ctx, lang) => (ctx.tabs || ['missions', 'armies'])
  .map((id) => SIDE_TABS[lang][id]).filter(Boolean)
  .map((n) => (typeof n === 'function' ? n(ctx) : n)).join(', ')

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
        ru: { title: 'Партия из ростера', text: 'Откройте ростер, нажмите «⋮» и выберите «Начать партию с этим списком». Так партию можно начать прямо из ростера: фракция, детачменты и сам ростер встанут в настройку сами.' },

        en: { title: 'A game from a roster', text: 'Open a roster, press “⋮” and pick “Start a game with this list”. That starts a game straight from the roster: the faction, detachments and the roster itself fill the setup for you.' },

      },
      {
        target: 'home-coop',
        ru: { title: 'Подключиться', text: 'Нажмите, чтобы подключиться к чужой партии по коду, ссылке или QR-коду. Каждый ведёт свою сторону на своём устройстве. Чтобы позвать соперника к себе, начните новую партию и нажмите «Пригласить» в его карточке.' },

        en: { title: 'Join a game', text: 'Press this to join someone else’s game by code, link or QR code. Each player keeps their own side on their own device. To call an opponent into yours, start a new game and press “Invite” on their card.' },

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
        when: (ctx) => !ctx.lobby,
        ru: { title: 'Тип игры', text: 'Выберите, как вы играете. Одиночная — один игрок против одного. Парная (Doubles) — два на два, у каждой стороны по две армии. Комбат патруль — небольшие армии из стартовых наборов.' },

        en: { title: 'Game type', text: 'Choose how you play. Singles is one player against one. Doubles is two against two, with two armies a side. Combat Patrol is small armies from the starter boxes.' },

      },
      {
        target: 'setup-gametype',
        when: (ctx) => ctx.lobby,
        ru: { title: 'Тип игры', text: 'После приглашения тип игры уже не поменять: к нему привязаны места подключившихся устройств.' },
        en: { title: 'Game type', text: 'Once you have invited, the game type cannot change: the joined devices’ seats depend on it.' },
      },
      {
        target: 'setup-size',
        ru: { title: 'Размер игры', text: 'Выберите размер игры. Он задаёт лимит очков армии и число очков детачмента (DP).' },

        en: { title: 'Game size', text: 'Choose the game size. It sets the army’s points limit and the Detachment Points (DP).' },

      },
      {
        target: 'setup-player',
        when: (ctx) => !ctx.lobby,
        ru: { title: 'Ваша армия', text: 'Впишите своё имя, выберите фракцию и детачменты. Если у вас есть ростер, приложите его кнопкой справа от фракции. Тогда в партии будут карточки ваших юнитов с их правилами. Армию соперника заполните так же.' },

        en: { title: 'Your army', text: 'Enter your name, pick your faction and detachments. If you have a roster, attach it with the button to the right of the faction. The game then has your unit cards with their rules. Fill in the opponent’s army the same way.' },

      },
      {
        target: 'setup-player',
        when: (ctx) => ctx.lobby && !ctx.doubles,
        ru: { title: 'Ваша армия', text: 'Впишите своё имя, выберите фракцию и детачменты. Если у вас есть ростер, приложите его кнопкой справа от фракции. Сторону соперника он заполняет сам, на своём устройстве.' },
        en: { title: 'Your army', text: 'Enter your name, pick your faction and detachments. If you have a roster, attach it with the button to the right of the faction. The opponent fills in their own side, on their device.' },
      },
      {
        target: 'setup-player',
        when: (ctx) => ctx.lobby && ctx.doubles,
        ru: { title: 'Ваша команда', text: 'Заполните обе армии своей команды: имена, фракции, детачменты, ростеры. Команду соперника заполняет её игрок, на своём устройстве.' },
        en: { title: 'Your team', text: 'Fill in both armies of your team: names, factions, detachments, rosters. The opposing team is filled in by its player, on their device.' },
      },
      {
        target: 'setup-invite',
        when: (ctx) => !ctx.lobby,
        ru: { title: 'Пригласить', text: 'Нажмите, если соперник ведёт свою сторону на своём телефоне. Откроются код, QR-код и ссылка. Аккаунт нужен только вам.' },
        en: { title: 'Invite', text: 'Press this if the opponent keeps their side on their own phone. The code, the QR code and the link open. Only you need an account.' },
      },
      {
        target: 'setup-invite',
        when: (ctx) => ctx.lobby,
        ru: { title: 'Код приглашения', text: 'Нажмите, чтобы снова показать код, QR-код и ссылку. Там же видно, кто подключился.' },
        en: { title: 'Invitation code', text: 'Press to show the code, the QR code and the link again. It also shows who has joined.' },
      },
      {
        target: 'lobby-other',
        when: (ctx) => ctx.lobby,
        ru: { title: 'Сторона соперника', text: 'Здесь появится то, что заполнил соперник, когда он нажмёт «Готово». До этого здесь ожидание. Если соперник не может заполнить сторону сам, нажмите «Заполнить самому».' },
        en: { title: 'The opponent’s side', text: 'What the opponent filled in shows here once they press “Done”. Until then this waits. If they cannot fill it in themselves, press “Fill it in myself”.' },
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
        target: 'setup-strict',
        ru: { title: 'Правила', text: 'Выберите «Строго», чтобы играть по правилам без исправлений задним числом. Карты тянутся только случайно, отменить можно только последнее действие. После начала партии это не меняется.' },

        en: { title: 'Rules', text: 'Choose Strict to play by the book, with no corrections after the fact. Cards are drawn at random, and only the last action can be taken back. It cannot be changed once the game starts.' },

      },
      {
        target: 'setup-attacker',
        ru: { title: 'Attacker', text: 'Отметьте, кто атакует. От этого зависит, с какой стороны стола вы расставляетесь.' },

        en: { title: 'Attacker', text: 'Mark who attacks. It decides which side of the table you deploy on.' },

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
        target: 'setup-presets',
        ru: { title: 'Готовые наборы', text: 'Выберите набор: «Минимальный» — только счёт и миссии, «Базовый» — ещё CP, помощь с миссиями, счётчики армий, модификаторы и вкладки «Лог» и «Статистика», «Максимальный» — всё. Галочки ниже можно менять и после выбора, набор тогда называется «Свой».' },
        en: { title: 'Ready sets', text: 'Pick a set: “Minimal” is the score and the missions, “Base” adds CP, the mission help, the army counters, the modifiers and the Log and Stats tabs, “Maximal” is everything. You can still change the boxes below; the set is then called “Your own”.' },
      },
      {
        target: 'setup-opts-game',
        ru: { title: 'Ход и армии', text: 'Выберите, что трекер будет вести за вас: CP, фазы, проверку миссий перед передачей хода, правила армий. Выключенное не появится на экране партии. Включить его можно и посреди игры, в настройке партии.' },

        en: { title: 'Turn and armies', text: 'Choose what the tracker keeps for you: CP, phases, the mission check before the turn passes, army rules. Whatever is off does not appear on the game screen. You can switch it on mid-game, in the game’s setup.' },

      },
      {
        target: 'setup-opts-roster',
        ru: { title: 'Список армии', text: 'Эти пункты работают, если к армии приложен ростер. Живые модификаторы покажут в карточке юнита, что изменили правила; подробные переключатели свёрнуты под «Подробнее».' },

        en: { title: 'Army list', text: 'These work when a roster is attached to the army. Live modifiers show on a unit’s card what the rules changed; the finer switches are folded under “Details”.' },

      },
      {
        target: 'setup-look',
        ru: { title: 'Экран', text: 'Здесь вкладки «Лог» и «Статистика», трансляция и цвета сторон. Отметьте «Настроить цвета», чтобы выбрать цвет каждой стороны самому; без этого каждая сторона окрашена в цвет своей фракции.' },
        en: { title: 'Screen', text: 'The Log and Stats tabs, the broadcast and the side colours are here. Tick “Customise colours” to choose each side’s colour yourself; otherwise each side wears its faction’s colour.' },
      },
      {
        target: 'setup-start',
        when: (ctx) => !ctx.lobby,
        ru: { title: 'Перейти к игре', text: 'Нажмите, когда всё готово. Откроется экран партии с шагами перед битвой: вторичные миссии, расстановка, кубовка на первый ход. Бой начнётся отдельной кнопкой.' },

        en: { title: 'Go to the game', text: 'Press this when everything is ready. The game screen opens with the steps before the battle: secondary missions, deployment, the roll for the first turn. The battle starts with its own button.' },

      },
      {
        target: 'setup-start',
        when: (ctx) => ctx.lobby,
        ru: { title: 'Перейти к игре', text: 'Нажмите, когда всё готово и соперник отправил свою сторону. Партия откроется на всех устройствах сразу, с шагами перед битвой: каждый выберет вторичные миссии на своём устройстве. Бой начнётся отдельной кнопкой.' },
        en: { title: 'Go to the game', text: 'Press this when everything is ready and the opponent has sent their side. The game opens on every device at once, with the steps before the battle: each player chooses their secondary missions on their own device. The battle starts with its own button.' },
      },
    ],
  },
  game: {
    steps: [
      {
        target: 'game-line',
        ru: { title: 'Раунд и ход', text: 'Здесь написано, какой сейчас раунд и чей ход. Точка слева окрашена в цвет стороны, которая ходит. В совместной игре точка медленно мигает, пока устройства синхронизированы.' },
        en: { title: 'Round and turn', text: 'This line says which round it is and whose turn. The dot on the left has the colour of the side on turn. In a shared game the dot slowly blinks while the devices are in sync.' },
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
        show: { side: 'you' },
        ru: (c) => ({ title: 'Счёт', text: `Здесь счёт обеих сторон: победные очки или BP, первичка, вторичка${c.cp ? ' и CP' : ''}. У каждой стороны свой цвет. Карточка выбранной стороны обведена её цветом.` }),
        en: (c) => ({ title: 'Score', text: `Both sides’ score is here: Victory Points or BP, primary, secondary${c.cp ? ' and CP' : ''}. Each side has its own colour. The chosen side’s card is outlined in it.` }),
      },
      {
        target: 'game-score',
        show: { side: 'opp', tab: 'missions' },
        when: (ctx) => !ctx.doubles,
        ru: (c) => ({ title: 'Сторона соперника', text: `Нажмите на карточку соперника, и вкладки ниже покажут его: ${sideTabs(c, 'ru')}. Сейчас выбран соперник. С новым ходом вкладки снова покажут сторону, которая ходит.` }),
        en: (c) => ({ title: 'The opponent’s side', text: `Tap the opponent’s card, and the tabs below show their side: ${sideTabs(c, 'en')}. The opponent is chosen now. With each new turn the tabs go back to the side on turn.` }),
      },
      {
        target: 'game-score',
        show: { side: 'opp', tab: 'missions' },
        when: (ctx) => ctx.doubles,
        ru: (c) => ({ title: 'Команда соперника', text: `Нажмите на карточку команды соперника, и вкладки ниже покажут её: ${sideTabs(c, 'ru').replace('армию', 'армии')}. Сейчас выбрана команда соперника. С новым ходом вкладки снова покажут команду, которая ходит.` }),
        en: (c) => ({ title: 'The opposing team', text: `Tap the opposing team’s card, and the tabs below show that team: ${sideTabs(c, 'en').replace('army', 'armies')}. The opposing team is chosen now. With each new turn the tabs go back to the team on turn.` }),
      },
      {
        target: 'game-prebattle',
        show: { side: null },
        when: (ctx) => !ctx.begun,
        ru: { title: 'Перед битвой', text: 'Пройдите шаги по порядку, как в последовательности миссии. Шаг 6 — выберите вторичные миссии, шаг 10 — отметьте, кто выиграл кубовку на первый ход. Без этих двух бой не начнётся.' },
        en: { title: 'Before the battle', text: 'Go through the steps in order, as in the mission sequence. At step 6 choose your secondary missions, at step 10 mark who won the roll for the first turn. The battle does not start without these two.' },
      },
      {
        target: 'game-reserves',
        show: { side: null },
        when: (ctx) => !ctx.begun && ctx.reserves,
        ru: { title: 'Резервы', text: 'Нажмите «Отметить резервы», если какие-то юниты не выходят на стол при расстановке, а остаются в стратегическом резерве. Их нужно отметить до начала боя. Откроется ваш ростер, и туториал покажет, где это сделать.' },
        en: { title: 'Reserves', text: 'Press “Mark reserves” if some units stay in Strategic Reserves instead of deploying. They are marked before the battle. Your roster opens, and the tutorial shows where to do it.' },
      },
      {
        target: 'game-start',
        show: { side: null },
        when: (ctx) => !ctx.begun && ctx.canTurn !== false,
        ru: (c) => ({ title: 'Начать игру', text: `Расставьте армии на столе и нажмите «Начать игру». Пока бой не начат: с этой кнопки начнётся первый ход${c.cp ? ', и придут первые CP' : ''}.` }),
        en: (c) => ({ title: 'Start game', text: `Deploy your armies on the table and press “Start game”. The battle has not begun yet: the first turn starts with this button${c.cp ? ', and the first CP arrive' : ''}.` }),
      },
      {
        target: 'game-start',
        show: { side: null },
        when: (ctx) => !ctx.begun && ctx.canTurn === false,
        ru: { title: 'Начать игру', text: '«Начать игру» нажимает игрок, который ходит первым, на своём устройстве. У вас эта кнопка серая. Бой начнётся на всех устройствах сразу.' },
        en: { title: 'Start game', text: '“Start game” is pressed by the player who goes first, on their device. Here the button is grey. The battle starts on every device at once.' },
      },
      {
        target: 'game-turnbar',
        show: { side: null },
        when: (ctx) => ctx.begun && ctx.canTurn === false,
        ru: (c) => ({ title: 'Ход соперника', text: `Сейчас ходит соперник: ${c.phases ? 'фазы переключает и ход завершает он' : 'ход завершает он'}, на своём устройстве. У вас эти кнопки серые, а всё, что он делает, сразу видно здесь.` }),
        en: (c) => ({ title: 'The opponent’s turn', text: `The opponent is on turn: ${c.phases ? 'they step the phases and end the turn' : 'they end the turn'}, on their device. Here the buttons are grey, and everything they do shows here at once.` }),
      },
      {
        target: 'game-turnbar',
        show: { side: null },
        when: (ctx) => ctx.begun && ctx.canTurn !== false && ctx.phases,
        ru: { title: 'Ход и фазы', text: 'Переключайте фазы хода стрелками. Нажмите на название фазы, чтобы выбрать её из списка. Кнопка «Завершить ход» передаёт ход сопернику.' },
        en: { title: 'Turn and phases', text: 'Switch the turn’s phases with the arrows. Tap the phase’s name to pick it from a list. “End turn” passes the turn to the opponent.' },
      },
      {
        target: 'game-turnbar',
        show: { side: null },
        when: (ctx) => ctx.begun && ctx.canTurn !== false && !ctx.phases,
        ru: { title: 'Ход', text: 'Нажмите «Завершить ход», чтобы передать ход сопернику. «Отменить ход» возвращает последний ход.' },
        en: { title: 'Turn', text: 'Press “End turn” to pass the turn to the opponent. “Undo turn” takes the last turn back.' },
      },
      {
        target: 'game-tabs',
        when: (ctx) => !ctx.wide,
        show: { tab: 'missions', side: null },
        ru: { title: 'Вкладки', text: 'Нажмите на значок, чтобы открыть вкладку. Открытая вкладка подписана словом. Дальше туториал откроет каждую по очереди. Каждый новый ход открывается на вкладке «Миссии».' },
        en: { title: 'Tabs', text: 'Tap an icon to open a tab. The open tab is named in words. Next the tutorial opens each one in turn. Every new turn opens on the Missions tab.' },
      },
      {
        target: 'game-tabs',
        when: (ctx) => ctx.wide,
        show: { tab: 'missions', side: null },
        ru: { title: 'Вкладки', text: 'Нажмите на вкладку, чтобы открыть её. Открытая вкладка залита цветом. Дальше туториал откроет каждую по очереди. Каждый новый ход открывается на вкладке «Миссии».' },
        en: { title: 'Tabs', text: 'Click a tab to open it. The open tab is filled with colour. Next the tutorial opens each one in turn. Every new turn opens on the Missions tab.' },
      },
      {
        target: 'game-missions',
        show: { tab: 'missions' },
        ru: { title: 'Миссии', text: 'Отмечайте выполненные миссии, чтобы начислить очки. Нажмите на миссию, чтобы открыть её условия. Здесь первичная и вторичные миссии. В тактическом режиме здесь же вы берёте новые карты и сбрасываете ненужные.' },
        en: { title: 'Missions', text: 'Mark the missions you achieve to score them. Tap a mission to open its conditions. The primary and secondary missions are here. In tactical mode you also draw new cards and discard ones you do not need here.' },
      },
      {
        target: 'game-panel-phase',
        show: { tab: 'phase' },
        when: (ctx) => ctx.tabs?.includes('phase') && ctx.phases,
        ru: { title: 'Фаза', text: 'Здесь то, что действует в текущей фазе: правила армии и детачмента, способности юнитов и стратагемы этой фазы. Нажмите на строку, чтобы открыть правило или карточку юнита. Число на значке вкладки — сколько правил у этой фазы.' },
        en: { title: 'Phase', text: 'What works in the current phase is here: the army and detachment rules, the units’ abilities and this phase’s stratagems. Tap a line to open the rule or the unit’s card. The number on the tab’s icon is how many rules this phase has.' },
      },
      {
        target: 'game-panel-phase',
        show: { tab: 'phase' },
        when: (ctx) => ctx.tabs?.includes('phase') && !ctx.phases,
        ru: { title: 'Ход', text: 'Здесь то, что действует в каждой фазе хода: правила армии и детачмента, способности юнитов и стратагемы. Нажмите на строку, чтобы открыть правило или карточку юнита.' },
        en: { title: 'Turn', text: 'What works in each phase of the turn is here: the army and detachment rules, the units’ abilities and the stratagems. Tap a line to open the rule or the unit’s card.' },
      },
      {
        target: 'game-panel-cp',
        show: { tab: 'cp' },
        when: (ctx) => ctx.tabs?.includes('cp'),
        // A game that does not play stratagems here (`trackStratPlay` off) shows only the counter.
        ru: (ctx) => (ctx.stratPlay
          ? { title: 'CP и стратагемы', text: 'Нажмите на цену стратагемы, чтобы сыграть её: CP спишутся сами. Если правило изменило цену или нужно указать отряд, нажмите ⚙ рядом. Стратагемы, которые сейчас сыграть нельзя, отмечены с причиной.' }
          : { title: 'Командные очки', text: 'Командные очки начисляются сами. «Бонус 1 CP» — очко из правила, одно за раунд. Карандаш поправляет счёт, если он разошёлся со столом. Чтобы играть стратагемы прямо здесь, включите их в настройках партии.' }),
        en: (ctx) => (ctx.stratPlay
          ? { title: 'CP and stratagems', text: 'Tap a stratagem’s cost to play it: the CP are taken off by themselves. If a rule changed the cost or the unit matters, tap the ⚙ beside it. The ones that cannot be played now say why.' }
          : { title: 'Command Points', text: 'Command Points come by themselves. “Bonus 1 CP” is a point from a rule, one a round. The pencil corrects the count if it drifts from the table’s. To play stratagems right here, turn them on in the game’s settings.' }),
      },
      {
        target: 'game-panel-armies',
        show: { tab: 'armies' },
        ru: { title: 'Армия', text: 'Здесь армия стороны: сверху правила, которыми она играет, — армейское правило и правила детачментов, под ними юниты из ростера. Счётчики армейского правила, например Waaagh!, ведутся здесь же.' },
        en: { title: 'Army', text: 'The side’s army is here: on top the rules it plays by — the army rule and the detachment rules — and under them the units of its roster. The army rule’s counters, Waaagh! for example, are kept here too.' },
      },
      {
        target: 'game-members',
        show: { tab: 'armies', side: 'you', member: 'partner' },
        when: (ctx) => ctx.doubles,
        ru: { title: 'Армия партнёра', text: 'Нажмите на имя, чтобы открыть армию партнёра. В парной игре у команды две армии, у каждой свои правила и счётчики. Сейчас открыта армия партнёра.' },
        en: { title: 'The partner’s army', text: 'Tap a name to open your partner’s army. In doubles a team has two armies, each with its own rules and counters. The partner’s army is open now.' },
      },
      {
        target: 'game-roster',
        show: { tab: 'armies' },
        when: (ctx) => ctx.lists,
        ru: { title: 'Ростер', text: 'Нажмите на юнит, чтобы открыть его карточку. Под правилами армии — приложенный ростер стороны. Числа в карточках уже с поправками от правил, которые действуют в партии.' },
        en: { title: 'Roster', text: 'Tap a unit to open its card. Under the army’s rules is the side’s attached roster. The numbers on the cards already carry what the rules in play change.' },
      },
      {
        target: 'game-panel-log',
        show: { tab: 'log', member: 'mine' },
        when: (ctx) => ctx.tabs.includes('log'),
        ru: (c) => ({ title: 'Лог', text: `Здесь всё, что случилось в партии, по раундам: ${c.cp ? 'очки, CP, стратагемы' : 'очки'}. Лог показывает обе стороны сразу. Его можно скопировать текстом.` }),
        en: (c) => ({ title: 'Log', text: `Everything that happened in the game is here, by round: ${c.cp ? 'points, CP, stratagems' : 'points'}. The log shows both sides at once. It can be copied as text.` }),
      },
      {
        target: 'game-panel-stats',
        show: { tab: 'stats' },
        when: (ctx) => ctx.tabs.includes('stats'),
        ru: (c) => ({ title: 'Статистика', text: `Здесь очки стороны по раундам: первичка, вторичка${c.cp ? ' и CP' : ''}. Так видно, в каком раунде что набрано.` }),
        en: (c) => ({ title: 'Stats', text: `The side’s points by round are here: primary, secondary${c.cp ? ' and CP' : ''}. It shows what was scored in which round.` }),
      },
      {
        target: 'game-menu',
        show: { tab: 'missions', side: null, member: 'mine' },
        ru: (c) => ({ title: 'Меню партии', text: `Нажмите «…», чтобы открыть меню партии: настройки, совместная игра, ${c.broadcast ? 'трансляция и ' : ''}завершение игры. Отсюда же можно снова открыть туториал.` }),
        en: (c) => ({ title: 'The game’s menu', text: `Press “…” to open the game’s menu: setup, the shared game, ${c.broadcast ? 'the broadcast and ' : ''}finishing the game. The tutorial opens from here again too.` }),
      },
    ],
  },
  // Marking the reserves: shown the first time "Mark reserves" is pressed (owner, 2026-10-09: the
  // button used to leave the player on the roster with nothing said).
  reserves: {
    steps: [
      {
        target: 'game-roster',
        show: { tab: 'armies' },
        ru: { title: 'Ваш ростер', text: 'Открылась вкладка «Армия». Под правилами — ваши юниты, и у каждого отмечено, где он: на поле боя, в стратегическом резерве или уничтожен.' },
        en: { title: 'Your roster', text: 'The Army tab is open. Under the rules are your units, and each one shows where it is: on the battlefield, in Strategic Reserves or destroyed.' },
      },
      {
        target: 'unit-status',
        ru: { title: 'Статус юнита', text: 'Нажмите эту кнопку у юнита, который остаётся в резерве, и выберите «В стратегическом резерве». Повторите для каждого такого юнита. Иконка на кнопке покажет выбранный статус.' },
        en: { title: 'Unit status', text: 'Press this button on a unit that stays in reserve, and pick “In Strategic Reserves”. Do the same for each such unit. The icon on the button shows the chosen status.' },
      },
      {
        target: 'game-score',
        show: { side: 'opp', tab: 'armies' },
        when: (ctx) => ctx.otherList && !ctx.shared,
        ru: { title: 'Резервы соперника', text: 'Нажмите на карточку счёта соперника, и во вкладке «Армия» появится его ростер — как сейчас. Его резервы отмечаются так же.' },
        en: { title: 'The opponent’s reserves', text: 'Tap the opponent’s score card, and the Army tab shows their roster — as it does now. Their reserves are marked the same way.' },
      },
      {
        target: 'game-score',
        when: (ctx) => ctx.otherList && ctx.shared,
        ru: { title: 'Резервы соперника', text: 'В совместной игре соперник отмечает свои резервы сам, на своём устройстве.' },
        en: { title: 'The opponent’s reserves', text: 'In a shared game the opponent marks their own reserves, on their device.' },
      },
      {
        target: 'game-start',
        show: { side: null },
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
        when: (ctx) => ctx.canTurn === false,
        ru: (c) => ({ title: 'Бой начался', text: `${c.phases ? 'Фазы переключает и ход завершает' : 'Ход завершает'} тот, кто ходит, на своём устройстве. Когда ход перейдёт к вам, кнопки внизу оживут.` }),
        en: (c) => ({ title: 'The battle has begun', text: `Whoever is on turn ${c.phases ? 'steps the phases and ends the turn' : 'ends the turn'}, on their device. When the turn passes to you, the buttons below come alive.` }),
      },
      {
        target: 'game-turnbar',
        when: (ctx) => ctx.canTurn !== false && ctx.phases,
        ru: { title: 'Ход и фазы', text: 'Переключайте фазы хода стрелками. Нажмите на название фазы, чтобы выбрать её из списка. Кнопка с круглой стрелкой отменяет последний ход.' },
        en: { title: 'Turn and phases', text: 'Switch the turn’s phases with the arrows. Tap the phase’s name to pick it from a list. The round-arrow button undoes the last turn.' },
      },
      {
        target: 'game-turnbar',
        when: (ctx) => ctx.canTurn !== false,
        ru: (c) => ({ title: 'Завершить ход', text: `Нажмите «Завершить ход», когда закончите ход. ${c.turnChecks ? 'Сначала трекер покажет, что ещё не начислено и какие карты уйдут. Потом ход перейдёт сопернику.' : 'Ход сразу перейдёт сопернику.'}${c.phases ? '' : ' «Отменить ход» возвращает последний ход.'}` }),
        en: (c) => ({ title: 'End turn', text: `Press “End turn” when your turn is done. ${c.turnChecks ? 'The tracker first shows what is not scored yet and which cards leave. Then the turn passes to the opponent.' : 'The turn passes to the opponent at once.'}${c.phases ? '' : ' “Undo turn” takes the last turn back.'}` }),
      },
    ],
  },

  // ── The roster builder (owner, 2026-10-09) ──────────────────────────────────────────────────────
  // The list of lists: on a phone its own page, on a desk the left column beside the open roster.
  'roster-list': {
    steps: [
      {
        target: 'roster-new',
        ru: { title: 'Создать лист', text: 'Нажмите «Создать лист», чтобы собрать ростер. Сначала вы выберете фракцию и детачменты, потом добавите юниты.' },
        en: { title: 'New list', text: 'Press “New list” to build a roster. First you pick the faction and detachments, then you add units.' },
      },
      {
        target: 'roster-import',
        ru: { title: 'Импорт', text: 'Нажмите «Импорт», чтобы вставить готовый список текстом — например, из приложения GW или New Recruit. Ростер соберётся сам.' },
        en: { title: 'Import', text: 'Press “Import” to paste a finished list as text — from the GW app or New Recruit, for example. The roster builds itself.' },
      },
      {
        target: 'roster-stats',
        when: (ctx) => !ctx.statsOpen,
        ru: { title: 'Статистика', text: 'Нажмите кнопку с графиком, чтобы увидеть свои сыгранные партии: победы, соперников, вторичные миссии и итоги по каждому ростеру.' },
        en: { title: 'Statistics', text: 'Press the button with the chart to see your finished games: wins, opponents, secondary missions and how each roster did.' },
      },
      {
        target: 'roster-stats',
        when: (ctx) => ctx.statsOpen,
        ru: { title: 'Статистика', text: 'Посмотрите справа свои сыгранные партии: победы, соперников, вторичные миссии и итоги по каждому ростеру. Когда открыт ростер, кнопка «Статистика» возвращает сюда.' },
        en: { title: 'Statistics', text: 'See your finished games on the right: wins, opponents, secondary missions and how each roster did. With a roster open, “Statistics” brings you back here.' },
      },
      // One step for the three tabs, not one each (owner, 2026-10-19: a roster opened from this
      // list ran this chapter and the roster's back to back, eighteen cards).
      {
        target: 'roster-tabs',
        show: { listTab: 'saved' },
        when: (ctx) => ctx.any,
        ru: { title: 'Разделы', text: 'Нажмите на вкладку, чтобы переключить раздел. «Списки» — сохранённые ростеры. «Черновики» — начатые и ещё не сохранённые. «Архив» — убранные из списков, их можно вернуть из меню «⋮».' },
        en: { title: 'Sections', text: 'Tap a tab to switch the section. “Lists” holds your saved rosters. “Drafts” holds the ones you started and have not saved. “Archive” holds the ones you put away; they come back from the “⋮” menu.' },
      },
      {
        target: 'roster-tabs',
        when: (ctx) => !ctx.any,
        ru: { title: 'Ваши ростеры', text: 'Здесь будут ваши ростеры: сохранённые — в «Списках», недостроенные — в «Черновиках», убранные — в «Архиве». Пока здесь пусто.' },
        en: { title: 'Your rosters', text: 'Your rosters will be here: saved ones under “Lists”, unfinished ones under “Drafts”, put away ones under “Archive”. It is empty for now.' },
      },
      {
        target: 'roster-card',
        show: { listTab: 'saved' },
        when: (ctx) => ctx.cards,
        ru: { title: 'Карточка ростера', text: 'Нажмите на карточку, чтобы открыть ростер. На ней фракция, Force Disposition, детачменты, очки и число ошибок.' },
        en: { title: 'A roster’s card', text: 'Tap a card to open the roster. It shows the faction, Force Disposition, detachments, points and the number of problems.' },
      },
      {
        target: 'roster-card-menu',
        show: { listTab: 'saved' },
        when: (ctx) => ctx.cards,
        ru: { title: 'Меню ростера', text: 'Нажмите «⋮», чтобы открыть меню ростера: начать партию с этим списком, редактировать, экспорт, дублировать, закрепить сверху, убрать в архив или удалить.' },
        en: { title: 'The roster’s menu', text: 'Press “⋮” to open the roster’s menu: start a game with this list, edit, export, duplicate, pin to the top, archive or delete.' },
      },
      {
        target: 'roster-cloud',
        show: { listTab: 'saved' },
        ru: { title: 'Где хранятся ростеры', text: 'Здесь видно, где лежат ваши ростеры. Без входа они хранятся только на этом устройстве. Войдите в аккаунт в меню ⚙, и ростеры будут на всех ваших устройствах.' },
        en: { title: 'Where rosters are kept', text: 'This says where your rosters are kept. Signed out, they live on this device only. Sign in from the ⚙ menu, and your rosters are on all your devices.' },
      },
      {
        target: 'roster-new',
        when: (ctx) => !ctx.any,
        ru: { title: 'Первый ростер', text: 'Нажмите «Создать лист», чтобы собрать первый ростер. Туториал проведёт вас по шагам. Если лист уже собран в другом месте, нажмите «Импорт».' },
        en: { title: 'Your first roster', text: 'Press “New list” to build your first roster. The tutorial walks you through it. If the list is already built elsewhere, press “Import”.' },
      },
    ],
  },
  // The roster's own page, outside a game.
  'roster-view': {
    steps: [
      {
        target: 'rv-head',
        when: (ctx) => ctx.points !== false,
        show: { viewTab: 'units' },
        ru: { title: 'Ростер', text: 'Здесь название ростера и его очки из лимита. Если очков больше лимита, число станет красным.' },
        en: { title: 'The roster', text: 'The roster’s name and its points out of the limit are here. Over the limit, the number turns red.' },
      },
      {
        target: 'rv-head',
        when: (ctx) => ctx.points === false,
        show: { viewTab: 'units' },
        ru: { title: 'Ростер', text: 'Здесь название ростера. Его очки из лимита — на карточке в списке слева. Если очков станет больше лимита, число появится и здесь, красным.' },
        en: { title: 'The roster', text: 'The roster’s name is here. Its points out of the limit are on its card in the list on the left. Over the limit, the number shows here too, in red.' },
      },
      {
        target: 'rv-edit',
        ru: { title: 'Редактировать', text: 'Нажмите на карандаш, чтобы изменить ростер: юниты, вооружение, детачменты.' },
        en: { title: 'Edit', text: 'Press the pencil to change the roster: units, wargear, detachments.' },
      },
      {
        target: 'rv-issues',
        when: (ctx) => ctx.issues,
        ru: { title: 'Ошибки', text: 'Нажмите на эту строку, чтобы увидеть, что в ростере не по правилам. Из списка можно перейти к юниту с ошибкой.' },
        en: { title: 'Problems', text: 'Tap this line to see what in the roster breaks the rules. From the list you can go to the unit at fault.' },
      },
      {
        target: 'rv-possible',
        when: (ctx) => ctx.possible,
        ru: { title: 'Возможные модификаторы', text: 'Нажмите, чтобы раскрыть список. Это правила, которые меняют характеристики юнитов при условии, — например, когда юнит атаковал. В партии они учитываются, когда условие выполнено.' },
        en: { title: 'Possible modifiers', text: 'Tap to open the list. These are rules that change a unit’s characteristics on a condition — when it charged, for example. In a game they count once the condition is met.' },
      },
      // The four tabs in one step rather than a step each (see roster-list's).
      {
        target: 'rv-tabs',
        show: { viewTab: 'units' },
        ru: { title: 'Вкладки', text: 'Нажмите на вкладку, чтобы переключить раздел. «Правила» — правило армии и правила детачментов. «Стратагемы» — стратагемы детачментов. «Миссии» — первичная миссия против каждой Force Disposition соперника.' },
        en: { title: 'Tabs', text: 'Tap a tab to switch the section. “Rules” holds the army rule and the detachment rules. “Stratagems” holds the detachment stratagems. “Missions” holds the primary mission against each of the opponent’s Force Dispositions.' },
      },
      {
        target: 'rv-unit',
        show: { viewTab: 'units' },
        ru: { title: 'Юниты', text: 'Нажмите на юнит, чтобы открыть его карточку: характеристики, оружие и способности. Улучшения и правила детачмента в ней уже учтены.' },
        en: { title: 'Units', text: 'Tap a unit to open its card: characteristics, weapons and abilities. Enhancements and the detachment’s rules are already applied to it.' },
      },
      {
        target: 'rv-menu',
        show: { viewTab: 'units' },
        ru: { title: 'Меню ростера', text: 'Нажмите «⋮» и выберите «Начать партию с этим списком», чтобы сыграть этим ростером. Здесь же экспорт, копирование списка целиком, печать и архив.' },
        en: { title: 'The roster’s menu', text: 'Press “⋮” and pick “Start a game with this list” to play with this roster. Export, copying the whole list, printing and the archive are here too.' },
      },
    ],
  },
  // The roster's settings: the creator's first step, the editor's settings mode, the desk's line.
  'roster-setup': {
    steps: [
      {
        target: 'rs-name',
        ru: { title: 'Название', text: 'Впишите название ростера. Его видно в списке ростеров и в партии.' },
        en: { title: 'Name', text: 'Enter the roster’s name. It shows in the list of rosters and in a game.' },
      },
      {
        target: 'rs-size',
        ru: { title: 'Лимит очков', text: 'Выберите размер игры. Он задаёт лимит очков и число очков детачмента (DP). Можно задать и свой лимит.' },
        en: { title: 'Points limit', text: 'Choose the game size. It sets the points limit and the Detachment Points (DP). You can set your own limit too.' },
      },
      {
        target: 'rs-faction',
        ru: { title: 'Фракция', text: 'Выберите фракцию армии. От неё зависят юниты в каталоге и детачменты.' },
        en: { title: 'Faction', text: 'Choose the army’s faction. The units in the catalogue and the detachments depend on it.' },
      },
      {
        target: 'rs-detachments',
        ru: { title: 'Детачменты', text: 'Выберите детачменты, когда фракция выбрана. Каждый стоит очков детачмента (DP). Сколько потрачено, видно в подписи поля.' },
        en: { title: 'Detachments', text: 'Choose the detachments once the faction is chosen. Each costs Detachment Points (DP). The field’s caption shows how many are spent.' },
      },
      {
        target: 'rs-notes',
        ru: { title: 'Заметки', text: 'Запишите план на игру или напоминания. Заметки видно на странице ростера.' },
        en: { title: 'Notes', text: 'Write down a game plan or reminders. The notes show on the roster’s page.' },
      },
      {
        target: 'rs-check',
        ru: { title: 'Проверка правил', text: 'Снимите галочку «Проверять легитимность», если собираете ростер не по правилам — например, для дружеской игры. Тогда конструктор не будет отмечать ошибки.' },
        en: { title: 'Rules check', text: 'Untick “Check legality” when the roster is not meant to follow the rules — for a friendly game, say. The builder then marks no problems.' },
      },
      {
        target: 'rs-more',
        ru: { title: 'Ещё настройки', text: 'Нажмите «…», чтобы открыть заметки и проверку правил. Снимите там галочку «Проверять легитимность», если собираете ростер не по правилам.' },
        en: { title: 'More settings', text: 'Press “…” to open the notes and the rules check. Untick “Check legality” there when the roster is not meant to follow the rules.' },
      },
      {
        target: 'rc-next',
        ru: { title: 'Дальше — юниты', text: 'Нажмите «Далее», когда выберете фракцию. На следующем шаге вы добавите юниты.' },
        en: { title: 'Next — units', text: 'Press “Next” once the faction is chosen. On the next step you add units.' },
      },
    ],
  },
  // The units: the catalogue and the list (and on a desk the chosen unit's fields), in the creator
  // and the editor alike.
  'roster-units': {
    steps: [
      {
        target: 'rw-catalog',
        show: { filters: false, firstGroup: true },
        ru: { title: 'Каталог', text: 'Нажмите «+», чтобы добавить юнит в ростер. Нажмите на название, чтобы прочитать карточку юнита. Здесь все юниты фракции по разделам.' },
        en: { title: 'Catalogue', text: 'Press “+” to add a unit to the roster. Tap a name to read the unit’s card. All the faction’s units are here, by section.' },
      },
      {
        target: 'cat-search',
        ru: { title: 'Поиск', text: 'Введите название юнита, способность или ключевое слово, чтобы найти юнит.' },
        en: { title: 'Search', text: 'Type a unit’s name, an ability or a keyword to find a unit.' },
      },
      {
        target: 'cat-filters-body',
        show: { filters: true },
        ru: { title: 'Фильтры', text: 'Нажмите на воронку, чтобы открыть фильтры. Например, «Влезает в остаток» оставит юниты, которые помещаются в оставшиеся очки.' },
        en: { title: 'Filters', text: 'Press the funnel to open the filters. “Fits what is left”, for example, keeps the units that fit the points still free.' },
      },
      {
        target: 'cat-rules',
        show: { filters: false },
        ru: { title: 'Правила фракции', text: 'Нажмите, чтобы прочитать правило армии и правила выбранных детачментов, не уходя из ростера.' },
        en: { title: 'Faction rules', text: 'Press to read the army rule and the chosen detachments’ rules without leaving the roster.' },
      },
      {
        target: 'rw-list',
        show: { demoUnit: true },
        ru: { title: 'Ваш ростер', text: 'Нажмите на юнит, чтобы настроить его: число моделей, вооружение, улучшения, лидера. Здесь юниты ростера по разделам.' },
        en: { title: 'Your roster', text: 'Tap a unit to set it up: models, wargear, enhancements, a leader. The roster’s units are here, by section.' },
      },
      {
        target: 'rw-editor',
        show: { demoUnit: true },
        ru: { title: 'Настройка юнита', text: 'Нажмите на юнит в ростере, и здесь откроются его настройки: модели, вооружение, улучшения.' },
        en: { title: 'The unit’s setup', text: 'Tap a unit in the roster, and its setup opens here: models, wargear, enhancements.' },
      },
      {
        target: 'rw-tally',
        show: { demoUnit: true },
        ru: { title: 'Очки и ошибки', text: 'Нажмите на значок рядом с очками, чтобы увидеть, что в ростере не по правилам. Здесь очки ростера из лимита.' },
        en: { title: 'Points and problems', text: 'Tap the mark beside the points to see what in the roster breaks the rules. The roster’s points out of the limit are here.' },
      },
      {
        target: 'rw-save',
        show: { demoUnit: true },
        ru: { title: 'Сохранить', text: 'Нажмите «Сохранить», когда закончите. Если вы вошли в аккаунт, ростер сохранится и в облаке.' },
        en: { title: 'Save', text: 'Press “Save” when you are done. When you are signed in, the roster is saved to the cloud too.' },
      },
    ],
  },
  // The editor on a phone: two modes on one switch at the bottom.
  'roster-edit': {
    steps: [
      {
        target: 'red-mode',
        show: { editorMode: 'settings' },
        ru: { title: 'Настройка', text: 'Нажмите на шестерёнку, чтобы открыть настройку ростера: название, размер игры, фракцию и детачменты.' },
        en: { title: 'Setup', text: 'Press the gear to open the roster’s setup: name, game size, faction and detachments.' },
      },
      {
        target: 'red-mode',
        show: { editorMode: 'units' },
        ru: { title: 'Юниты', text: 'Нажмите на вторую кнопку, чтобы вернуться к юнитам: каталог слева, ваш ростер справа.' },
        en: { title: 'Units', text: 'Press the second button to go back to the units: the catalogue on the left, your roster on the right.' },
      },
    ],
  },
  // The Force Disposition field comes with the detachments, after the setup's chapter has been
  // and gone on a new roster — so it has a chapter of its own, shown when the field appears.
  'roster-disposition': {
    steps: [
      {
        target: 'rs-disposition',
        ru: { title: 'Force Disposition', text: 'Выберите Force Disposition армии. Её дают выбранные детачменты, и от неё зависит первичная миссия в партии.' },
        en: { title: 'Force Disposition', text: 'Choose the army’s Force Disposition. The chosen detachments offer it, and the primary mission of a game depends on it.' },
      },
    ],
  },
  // ── Playing on several phones (owner, 2026-10-09) ───────────────────────────────────────────────
  // The game screen of a shared game, after its own chapter.
  shared: {
    steps: [
      {
        target: 'game-score',
        show: { side: null },
        when: (ctx) => !ctx.doubles,
        ru: { title: 'Совместная игра', text: 'Это устройство ведёт вашу сторону: её миссии, CP и счётчики. Если соперник подключился со своего устройства, его сторону здесь можно открыть и читать, но менять её может только он.' },
        en: { title: 'Shared game', text: 'This device keeps your side: its missions, CP and counters. When the opponent has joined from their device, their side opens and reads here, but only their device changes it.' },
      },
      {
        target: 'game-score',
        show: { side: null },
        when: (ctx) => ctx.doubles,
        ru: { title: 'Совместная игра', text: 'Это устройство ведёт вашу команду: её миссии, CP и счётчики. Команду соперника здесь можно открыть и читать, но менять её может только устройство её игрока.' },
        en: { title: 'Shared game', text: 'This device keeps your team: its missions, CP and counters. The opposing team opens and reads here, but only its player’s device changes it.' },
      },
      {
        target: 'game-line',
        ru: { title: 'Синхронизация', text: 'Изменения приходят на другие устройства за несколько секунд. Пока всё синхронизировано, точка слева медленно мигает. Если связи нет, вместо точки появится значок — нажмите на него, чтобы узнать причину.' },
        en: { title: 'Sync', text: 'Changes reach the other devices within seconds. While everything is in sync, the dot on the left blinks slowly. Without a connection a mark takes its place — tap it to see why.' },
      },
      {
        target: 'game-menu',
        when: (ctx) => ctx.host,
        ru: { title: 'Участники', text: 'Нажмите «…» и выберите «Совместная игра»: там код и ссылка для приглашения и список подключённых. Там же можно отключить устройство, передать роль хоста или закончить совместную игру.' },
        en: { title: 'Who is in', text: 'Press “…” and pick “Shared game”: the code and link to invite, and who has joined. You can also disconnect a device, hand the host role over or end the shared game there.' },
      },
      {
        target: 'game-menu',
        when: (ctx) => !ctx.host,
        ru: { title: 'Участники', text: 'Нажмите «…» и выберите «Совместная игра»: там видно, кто подключён. Оттуда же можно выйти из партии.' },
        en: { title: 'Who is in', text: 'Press “…” and pick “Shared game”: it shows who has joined. You can leave the game from there too.' },
      },
    ],
  },
  // A guest's own side of a shared setup.
  'lobby-guest': {
    steps: [
      {
        target: 'setup-player',
        when: (ctx) => !ctx.doubles,
        ru: { title: 'Ваша сторона', text: 'Заполните свою сторону: имя, фракцию и детачменты. Если у вас есть ростер, приложите его кнопкой справа от фракции. Миссию и поле выбирает хост.' },
        en: { title: 'Your side', text: 'Fill in your side: name, faction and detachments. If you have a roster, attach it with the button to the right of the faction. The host chooses the mission and the field.' },
      },
      {
        target: 'setup-player',
        when: (ctx) => ctx.doubles,
        ru: { title: 'Ваша команда', text: 'Заполните обе армии своей команды: имена, фракции, детачменты, ростеры. Миссию и поле выбирает хост.' },
        en: { title: 'Your team', text: 'Fill in both armies of your team: names, factions, detachments, rosters. The host chooses the mission and the field.' },
      },
      {
        target: 'lobby-done',
        ru: { title: 'Готово', text: 'Нажмите «Готово», когда всё заполнено. Хост увидит, что вы выбрали, и сможет начать партию.' },
        en: { title: 'Done', text: 'Press “Done” when everything is filled in. The host sees what you chose and can start the game.' },
      },
    ],
  },
  // A guest waiting for the host after "Done".
  'lobby-wait': {
    steps: [
      {
        target: 'lobby-wait',
        ru: { title: 'Ожидание', text: 'Ваша сторона у хоста. Партия откроется здесь сама, когда хост её начнёт.' },
        en: { title: 'Waiting', text: 'Your side is with the host. The game opens here by itself when the host starts it.' },
      },
      {
        target: 'lobby-change',
        ru: { title: 'Изменить', text: 'Нажмите, чтобы изменить свою сторону. Пока хост выбирает армии, правка сразу ваша. Позже это просьба, и хост её подтвердит.' },
        en: { title: 'Change', text: 'Press to change your side. While the host is on the armies, the change is yours at once. Later it is a request the host answers.' },
      },
      {
        target: 'lobby-phone-settings',
        ru: { title: 'Настройки телефона', text: 'Нажмите, чтобы выбрать, что этот телефон покажет в игре. Подсчёт CP и фазы выбирает хост.' },
        en: { title: 'This phone’s settings', text: 'Press to choose what this phone shows in the game. Command points and phases are the host’s choice.' },
      },
      {
        target: 'lobby-takeover',
        ru: { title: 'Забрать редактирование', text: 'Вашу сторону сейчас заполняет другое устройство. Нажмите, чтобы заполнять её самому.' },
        en: { title: 'Take editing over', text: 'Another device is filling in your side now. Press to fill it in yourself.' },
      },
      {
        target: 'lobby-leave',
        ru: { title: 'Отключиться', text: 'Нажмите, чтобы выйти из партии.' },
        en: { title: 'Leave', text: 'Press to leave the game.' },
      },
    ],
  },
}
