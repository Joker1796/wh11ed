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
        ru: { title: 'Партия начинается здесь', text: '«Новая игра» открывает настройку из четырёх шагов. Если партия уже идёт, кнопка вернёт в неё.' },
        en: { title: 'A game starts here', text: '“New game” opens a four-step setup. With a game in progress, this button takes you back to it.' },
      },
      {
        target: null,
        ru: { title: 'Из ростера — ещё быстрее', text: 'В меню «…» любого ростера есть «Начать партию с этим списком». Фракция, детачменты и сам список встанут в настройку сами.' },
        en: { title: 'Faster from a roster', text: 'Any roster’s “…” menu has “Start a game with this list”. The faction, detachments and the list itself fill the setup for you.' },
      },
      {
        target: 'home-coop',
        ru: { title: 'Совместная игра', text: 'Одна партия на двух–четырёх телефонах: каждый ведёт свою сторону. Хост создаёт лобби и отправляет ссылку или код.' },
        en: { title: 'Shared game', text: 'One game on two to four phones, each player keeps their own side. The host opens a lobby and sends a link or a code.' },
      },
      {
        target: 'home-history',
        ru: { title: 'История партий', text: 'Сыгранные партии. Нажмите на карточку — итог и «Продолжить игру». Со входом в аккаунт история хранится и в облаке.' },
        en: { title: 'Game history', text: 'Your finished games. Tap a card for the result and “Resume game”. Signed in, the history is kept in the cloud too.' },
      },
    ],
  },
  'setup-1': {
    steps: [
      {
        target: 'setup-gametype',
        ru: { title: 'Шаг 1 — армии', text: 'Сначала формат: один на один или Doubles, две армии на сторону.' },
        en: { title: 'Step 1 — armies', text: 'The format first: one on one, or Doubles with two armies a side.' },
      },
      {
        target: 'setup-size',
        ru: { title: 'Размер битвы', text: 'От него зависят очки армии и Detachment Points.' },
        en: { title: 'Battle size', text: 'It sets the army’s points and the Detachment Points.' },
      },
      {
        target: 'setup-player',
        ru: { title: 'Ваша армия', text: 'Имя, фракция и детачменты. Лучше приложить ростер: тогда в партии будут карточки юнитов, их правила и модификаторы.' },
        en: { title: 'Your army', text: 'Name, faction and detachments. Better still, attach a roster: the game then has your unit cards, their rules and modifiers.' },
      },
    ],
  },
  'setup-2': {
    steps: [
      {
        target: 'setup-twist',
        ru: { title: 'Шаг 2 — миссия', text: 'Твист выбирается здесь, а не в конце: он меняет саму миссию.' },
        en: { title: 'Step 2 — the mission', text: 'The twist is chosen here, not at the end: it changes the mission itself.' },
      },
      {
        target: 'setup-secondary',
        ru: { title: 'Вторичные миссии', text: 'Тактические — тянете карты каждый ход. Фиксированные — выбираете две сейчас.' },
        en: { title: 'Secondary missions', text: 'Tactical — you draw cards every turn. Fixed — you pick two now.' },
      },
      {
        target: 'setup-primary',
        ru: { title: 'Первичка', text: 'Карточка первичной миссии этой партии — уже с учётом твиста.' },
        en: { title: 'The primary', text: 'This game’s primary mission card, the twist already applied.' },
      },
    ],
  },
  'setup-3': {
    steps: [
      {
        target: 'setup-score',
        ru: { title: 'Шаг 3 — поле', text: 'Режим счёта: победные очки или Battle Points.' },
        en: { title: 'Step 3 — the field', text: 'The score mode: Victory Points or Battle Points.' },
      },
      {
        target: 'setup-attacker',
        ru: { title: 'Кто атакует', text: 'От роли зависит сторона стола на раскладке.' },
        en: { title: 'Who attacks', text: 'The role decides your side of the table on the layout.' },
      },
      {
        target: 'setup-first',
        ru: { title: 'Кто ходит первым', text: 'Первый ход задаёт порядок всей партии.' },
        en: { title: 'Who goes first', text: 'The first turn sets the order for the whole game.' },
      },
      {
        target: 'setup-layout',
        ru: { title: 'Раскладка', text: 'Рекомендованная раскладка террейна для этой миссии.' },
        en: { title: 'Layout', text: 'The recommended terrain layout for this mission.' },
      },
    ],
  },
  'setup-4': {
    steps: [
      {
        target: 'setup-opts-game',
        ru: { title: 'Шаг 4 — что отслеживать', text: 'Что выключено, на экране партии не появится. Включить можно и посреди игры.' },
        en: { title: 'Step 4 — what to track', text: 'Whatever is off does not appear on the game screen. You can switch it on mid-game.' },
      },
      {
        target: 'setup-opts-roster',
        ru: { title: 'С ростером', text: 'Если армия с ростером: фазы, напоминания и карточки юнитов в партии.' },
        en: { title: 'With a roster', text: 'For an army with a roster: phases, reminders and unit cards in the game.' },
      },
      {
        target: 'setup-start',
        ru: { title: 'В игру', text: 'Партия создастся, а первый ход начнётся отдельной кнопкой, когда закончите расстановку.' },
        en: { title: 'To the game', text: 'The game is created, and the first turn starts with its own button once you have deployed.' },
      },
    ],
  },
  game: {
    steps: [
      {
        target: 'game-line',
        ru: { title: 'Раунд и ход', text: 'Здесь видно, какой идёт раунд и чей сейчас ход. Точка слева — цвет стороны, которая ходит. В совместной игре она медленно мигает, пока телефоны синхронизированы.' },
        en: { title: 'Round and turn', text: 'This line shows the round and whose turn it is. The dot is the colour of the side on turn. In a shared game it slowly blinks while the phones are in sync.' },
      },
      {
        target: 'game-rounds',
        ru: { title: 'Раунды', text: 'Полоса — это пять раундов, текущий разбит на фазы обоих ходов. Нажмите на неё, чтобы открыть список раундов. Прошлый раунд можно открыть и поправить его счёт, а партия при этом останется на месте.' },
        en: { title: 'Rounds', text: 'The strip is the five rounds, the current one split into both turns’ phases. Tap it for the list of rounds. A past round opens for correcting its score, and the game stays where it is.' },
      },
      {
        target: 'game-score',
        ru: { title: 'Счёт', text: 'VP, CP и очки обеих сторон. У каждой стороны свой цвет — он идёт через весь экран.' },
        en: { title: 'The score', text: 'Both sides’ VP, CP and points. Each side has its colour, all down the screen.' },
      },
      {
        target: 'game-turnbar',
        when: (ctx) => !ctx.begun,
        ru: { title: 'Начать игру', text: 'Партия создана, но бой ещё не начат. Расставьте армии, отметьте юниты в резерве и нажмите «Начать игру». С этой кнопки начнётся первый ход и придут первые CP.' },
        en: { title: 'Start the game', text: 'The game is set up, but the battle has not begun. Deploy, mark the units in reserve and press “Start game”. The first turn and its first CP start with this button.' },
      },
      {
        target: 'game-turnbar',
        when: (ctx) => ctx.begun,
        ru: { title: 'Ход и фазы', text: 'Стрелками — по фазам, нажмите на фазу, чтобы выбрать её. «Завершить ход» сначала покажет, что ещё не начислено.' },
        en: { title: 'Turn and phases', text: 'The arrows walk the phases, tap the phase to pick one. “End turn” first shows what is not scored yet.' },
      },
      {
        target: 'game-tabs',
        ru: { title: 'Вкладки', text: 'Миссии, фаза, CP, армии, ростер, лог и статистика. Каждый новый ход открывается на «Миссиях».' },
        en: { title: 'Tabs', text: 'Missions, phase, CP, armies, roster, log and stats. Every new turn opens on Missions.' },
      },
      {
        target: 'game-missions',
        tab: 'missions',
        ru: { title: 'Миссии', text: 'Первичка и вторички обеих сторон: тянуть, начислять и сбрасывать карты.' },
        en: { title: 'Missions', text: 'Both sides’ primary and secondaries: draw, score and set cards aside.' },
      },
      {
        target: 'game-menu',
        ru: { title: 'Меню партии', text: 'Настройка, совместная игра, трансляция, завершить игру — и эти подсказки снова.' },
        en: { title: 'The game’s menu', text: 'Setup, shared game, broadcast, finishing the game — and these hints again.' },
      },
    ],
  },
  // The battle has begun: what the turn bar does now. Shown the moment "Start game" is pressed, so a
  // player who met the screen before the battle still gets it.
  turn: {
    steps: [
      {
        target: 'game-turnbar',
        ru: { title: 'Ход и фазы', text: 'Стрелками — по фазам, нажмите на фазу, чтобы выбрать её. Кнопка слева отменяет ход.' },
        en: { title: 'Turn and phases', text: 'The arrows walk the phases, tap the phase to pick one. The button on the left undoes the turn.' },
      },
      {
        target: 'game-turnbar',
        ru: { title: 'Завершить ход', text: '«Завершить ход» сначала покажет, что ещё не начислено и какие карты уйдут. Потом ход перейдёт сопернику.' },
        en: { title: 'End turn', text: '“End turn” first shows what is not scored yet and which cards leave. Then the turn passes to the opponent.' },
      },
    ],
  },
}
