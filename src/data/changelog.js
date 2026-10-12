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
    version: '2.8.1',
    date: '2026-10-12',
    en: [
      { h: 'Datasheets' },
      'The Emperor’s Children Sorcerer and Lord Exultant now have Toughness 5, as the codex errata of 30 September requires. The site takes its datasheets from the GW app. The errata raised Toughness for four units, but the app’s datasheets got it for only two of them. So I missed the other two. I now also check the datasheets against the errata itself.',
      'The close combat weapon of the Grey Knights Purifier Squad now has Strength 5, as the codex errata requires.',
      'I improved my comparison scripts and checked all 234 characteristic changes from the errata of eight codexes. The rest were already right.',
      { h: 'Answers to your questions' },
      'Why can’t Black Templars take Gladius Task Force? The GW app and the Munitorum Field Manual do not give it to them either. So the roster builder does not offer it.',
      'Why can’t a Necrons Overlord take an Overlord’s blade and a Resurrection Orb together? By the datasheet, the orb is only for a model without a tachyon arrow. The tachyon arrow is replaced only together with the blade.',
    ],
    ru: [
      { h: 'Датащиты' },
      'У Sorcerer и Lord Exultant из Emperor’s Children теперь Toughness 5. Так требует эррата кодекса от 30 сентября. Сайт берёт датащиты из приложения GW. Эррата подняла Toughness четырём юнитам, а в датащитах приложения её подняли только двум. Поэтому я пропустил остальные два. Теперь я дополнительно сверяю датащиты с самой эрратой.',
      'У close combat weapon в Purifier Squad из Grey Knights теперь Strength 5. Так требует эррата кодекса.',
      'Я доработал скрипты сравнения и сверил все 234 изменения характеристик из эррат восьми кодексов. Остальные уже были верными.',
      { h: 'Ответы на вопросы' },
      'Почему у Black Templars нет Gladius Task Force? Его не дают им ни приложение GW, ни Munitorum Field Manual. Поэтому конструктор его не предлагает.',
      'Почему Overlord у Necrons не может взять Overlord’s blade и Resurrection Orb вместе? По датащиту сферу берёт только модель без tachyon arrow. А tachyon arrow меняется только вместе с blade.',
    ],
  },
  {
    version: '2.8.0',
    date: '2026-10-11',
    en: [
      { h: 'Account' },
      'You can now sign in with an email and a password. Open the ⚙ menu, tap “Sign in” and choose “Create an account”. Signing in with Yandex stays.',
      'If you sign in with Yandex, you can add an email sign-in from the ⚙ menu. It is the same account: your lists and games stay where they are.',
      'If you forget your password, tap “Forgot your password?” in the sign-in window. A link to set a new one comes to your email.',
    ],
    ru: [
      { h: 'Аккаунт' },
      'Теперь можно войти по почте и паролю. В меню ⚙ нажмите «Войти» и выберите «Регистрация». Вход через Яндекс остаётся.',
      'Если вы входите через Яндекс, в меню ⚙ можно добавить вход по почте. Это тот же аккаунт: ваши ростеры и партии остаются на месте.',
      'Забыли пароль — нажмите «Забыли пароль?» в окне входа. На почту придёт ссылка, чтобы задать новый.',
    ],
  },
  {
    version: '2.7.22',
    date: '2026-10-11',
    en: [
      { h: 'Cloud' },
      'I am getting the cloud ready to move to a new server. Nothing changes for you in this update.',
    ],
    ru: [
      { h: 'Облако' },
      'Готовлю облако к переезду на новый сервер. Для вас в этом обновлении ничего не меняется.',
    ],
  },
  {
    version: '2.7.21',
    date: '2026-10-11',
    en: [
      { h: 'Roster builder' },
      'A Support unit that is not attached to any unit now shows an error. By the rules each Support unit must be attached to a unit.',
      'In a unit’s fields, “Can be led by” and “Can lead” follow every catalogue filter: “Fits the points left”, “In my collection” and hidden Legends.',
      'A T’au Shield Drone now adds 1 to its bearer’s Wounds on the unit card. Two drones add 2. In a squad, the model with a drone gets its own row.',
      'A Commander in Coldstar Battlesuit and a Commander in Enforcer Battlesuit can now take two of the same drone, as their datasheet allows.',
      'Legends unit cards now count their own abilities and wargear, like every other unit: the numbers change and weapons get their abilities.',
      'If one model takes two of the same melee weapon, the second one is marked “fights with one”. A model fights with one melee weapon, so the list warns you that the second copy adds nothing. There is no warning when the unit’s own ability rewards the pair.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      'Юнит Support, который ни к кому не присоединён, теперь отмечен ошибкой. По правилам каждый Support должен быть присоединён к отряду.',
      'В полях юнита списки «Кто может возглавить» и «Кого может возглавить» учитывают все фильтры каталога: «Влезает в остаток», «Есть в коллекции» и скрытые Legends.',
      'Shield Drone у T’au теперь добавляет носителю 1 к Wounds на карточке юнита. Два дрона добавляют 2. В отряде модель с дроном показана отдельной строкой.',
      'Commander in Coldstar Battlesuit и Commander in Enforcer Battlesuit теперь могут взять два одинаковых дрона, как разрешает их датащит.',
      'Карточки юнитов Legends теперь учитывают их способности и снаряжение, как у остальных юнитов: меняются характеристики, у оружия появляются способности.',
      'Если одной модели взять два одинаковых оружия ближнего боя, у второго стоит пометка «бьёт одним». Модель бьёт одним оружием ближнего боя, поэтому проверка списка предупреждает, что вторая копия ничего не добавляет. Если способность юнита даёт бонус за пару, предупреждения нет.',
    ],
  },
  {
    version: '2.7.20',
    date: '2026-10-09',
    en: [
      { h: 'Beta of the new game tracker' },
      'You can try the new game tracker at {link:beta.wh-rules.ru}. The tracker on this site stays as it was.',
      'A game started in the beta is played only in the beta, and a game from this site only here. If the host plays in the other version, the join page gives you a link there.',
      'In the beta the tracker and the roster builder have a tutorial. It goes through the screen step by step and opens the tabs for you. You can run it again from the {btn:gear} menu.',
      { h: 'The app on your phone' },
      'The site no longer asks to be installed on your first visit.',
      'It offers the app once: after your first saved roster, your first game or on your third visit. The app works with no signal.',
      'On an iPhone the app does not see the rosters and games from Safari. If you have any, the site first asks you to sign in. After that they appear in the app too.',
      { h: 'Deathwatch Support' },
      'A roster on Deathwatch Support had no rule, enhancement or stratagems for it. This was in Space Marines, Black Templars, Blood Angels, Dark Angels and Space Wolves lists. Now they are in the roster’s Rules tab, on the unit cards and in the game.',
      'In the tracker, a Chapter on Gauntlet Task Force, Phobos Shock Force or Spearpoint Task Force had no line for its detachment rule under “In this phase”. Now it has.',
      { h: 'Roster builder' },
      'On a phone and a tablet the detachment list did not mark the detachments you had picked. It also kept offering ones that no longer fit your DP. Now the picked ones are marked, and there is a {key:Clear selection} button.',
      'While the unit search had text, a group in the unit list could not be closed. Now a tap on its header closes it.',
      'Unit search finds a unit by its words in any order and in any case of a Russian word. Before, «темпестус сционов» found nothing. This works in the roster builder, on a faction’s units page and in the search ({key:Ctrl+K}).',
      'In Pactbound Zealots a CHARACTER can lead only a unit with the same Mark of Chaos. Before, an EPIC HERO such as Abaddon the Despoiler could lead a unit of any mark. Now the builder offers only matching units and marks the list with an error.',
      'An army with Legiones Daemonica units under Daemonic Pact now gets an error if, for one god, there are more units without BATTLELINE than with it.',
      { h: 'Signing in' },
      'If Yandex refuses to sign you in, the site now says why and offers to try again. Before, it quietly took you back to the page. Yandex refuses, for example, child accounts and work accounts of organisations.',
      { h: 'Help' },
      'I updated “How to use this”. Buttons and paths in it are named as on the screen.',
    ],
    ru: [
      { h: 'Бета нового трекера партии' },
      'Новый трекер партии можно попробовать на {link:beta.wh-rules.ru}. Трекер на этом сайте остаётся прежним.',
      'Партия из беты играется только в бете, а партия с этого сайта — только здесь. Если хост играет в другой версии, страница подключения даст ссылку туда.',
      'В бете у трекера и конструктора ростеров есть туториал. Он проходит по экрану шаг за шагом и сам открывает вкладки. Пройти его ещё раз можно в меню {btn:gear}.',
      { h: 'Приложение на телефоне' },
      'Сайт больше не просит установить его при первом визите.',
      'Он предложит поставить приложение один раз: после первого сохранённого ростера, первой партии или на третий визит. Приложение работает без сети.',
      'На iPhone приложение не видит ростеры и партии из Safari. Если они у вас есть, сайт сначала предложит войти. После входа они появятся и в приложении.',
      { h: 'Deathwatch Support' },
      'У ростера на Deathwatch Support не было его правила, улучшения и стратагем. Так было в списках Space Marines, Black Templars, Blood Angels, Dark Angels и Space Wolves. Теперь они есть во вкладке «Правила» ростера, на карточках юнитов и в партии.',
      'В трекере у орденов на Gauntlet Task Force, Phobos Shock Force и Spearpoint Task Force в блоке «В этой фазе» не было правила детачмента. Теперь оно есть.',
      { h: 'Конструктор ростеров' },
      'На телефоне и планшете список детачментов не отмечал выбранные. В нём оставались и те, что уже не помещаются в DP. Теперь выбранные отмечены, и есть кнопка {key:Сбросить выбор}.',
      'Пока в поиске юнитов был текст, раздел списка юнитов нельзя было закрыть. Теперь он закрывается нажатием на заголовок.',
      'Поиск юнитов находит юнит по словам в любом порядке и в любом падеже. Раньше «темпестус сционов» не находил ничего. Так работает в конструкторе, на странице юнитов фракции и в поиске ({key:Ctrl+K}).',
      'В Pactbound Zealots CHARACTER может вести только отряд с той же Меткой Хаоса. Раньше EPIC HERO, например Abaddon the Despoiler, мог вести отряд с любой Меткой. Теперь конструктор предлагает только подходящие отряды и отмечает ошибку в списке.',
      'Армия с юнитами Legiones Daemonica по правилу Daemonic Pact теперь получает ошибку, если у одного бога юнитов без BATTLELINE больше, чем с BATTLELINE.',
      { h: 'Вход' },
      'Если Яндекс не пускает вас на сайт, сайт теперь объясняет почему и предлагает попробовать ещё раз. Раньше он молча возвращал на страницу. Яндекс не пускает, например, детские аккаунты и рабочие аккаунты организаций.',
      { h: 'Справка' },
      'Я обновил справку «Как пользоваться». Кнопки и пути в ней называются так, как на экране.',
    ],
  },
  {
    version: '2.7.19',
    date: '2026-10-09',
    en: [
      { h: 'Roster builder' },
      'The last update gave a unit a “Can be led by” block. Now the other way round works too: a Character has a “Can lead” block. Press “+” next to a unit, and the unit joins the roster with this Character attached.',
      'If the Character already leads another unit, the builder asks before moving it.',
      'The roster’s “…” menu has “Start a game with this list” again. It opens the game setup with the faction, detachments and this roster already in place.',
      'In the Deathwatch Terminator Squad a model with a Cyclone Missile Launcher can no longer take a Thunder Hammer and Storm Shield. The GW app does not allow it either. The same goes for the Legends Deathwing Command Squad and Proteus Kill Team.',
      'A weapon a model gave up to two swaps no longer stays on the roster card. The Deathwatch Terminator Squad used to keep extra Storm Bolters.',
      'A weapon an enhancement gives stands in the Character’s weapon table, marked “enhancement”. For example, Imperium’s Sword.',
      { h: 'Roster in a game' },
      'A Space Marines unit card shows all three Combat Doctrines. Tactical was missing.',
      'A wargear ability shows only while a model carries that wargear. A Captain without a Relic Shield no longer gets its +1 W.',
      { h: 'Whole site' },
      'New icons everywhere: the header, the menu, the bottom bar, faction tabs, rosters.',
      'Button sounds can be switched on in the {btn:gear} menu. They are off by default.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      'В прошлом обновлении у отряда появился блок «Кто может возглавить». Теперь есть и обратный: у персонажа — блок «Кого может возглавить». Нажмите «+» у отряда, и он добавится в ростер уже с этим персонажем.',
      'Если персонаж уже возглавляет другой отряд, конструктор спросит, перенести ли его.',
      'В меню «…» ростера снова есть «Начать партию с этим списком». Кнопка открывает настройку партии, где уже выбраны фракция, детачменты и этот ростер.',
      'В Deathwatch Terminator Squad модель с Cyclone Missile Launcher больше не может взять Thunder Hammer и Storm Shield. Приложение GW тоже этого не разрешает. То же у Legends Deathwing Command Squad и Proteus Kill Team.',
      'Оружие, которое модель отдала двум заменам, больше не остаётся в карточке ростера. Раньше у Deathwatch Terminator Squad оставались лишние Storm Bolter.',
      'Оружие от улучшения стоит в таблице оружия персонажа с пометкой «улучшение». Например, Imperium’s Sword.',
      { h: 'Ростер в партии' },
      'Карточка отряда Space Marines показывает все три Combat Doctrines. Раньше не было Tactical.',
      'Способность снаряжения видна, только пока его носит модель. Captain без Relic Shield больше не получает его +1 W.',
      { h: 'Весь сайт' },
      'Новые иконки везде: в шапке, меню, нижней панели, вкладках фракций и ростерах.',
      'В меню {btn:gear} можно включить звук кнопок. По умолчанию он выключен.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
