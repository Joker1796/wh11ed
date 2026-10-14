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
    version: '2.8.3',
    date: '2026-10-14',
    en: [
      { h: 'GW rule changes', kind: 'rules', patch: '981' },
      '**Codex: Adeptus Custodes is here.** The new army rules, 13 detachments and the new datasheets are on the [faction page](/factions/adeptus-custodes). Points are from MFM v1.6.',
      '**Your Custodes lists are moved to the new codex.** A unit GW renamed stays in the list under its new name. Its wargear is reset, and so is its size where the size options changed. Check each Custodes list before a game.',
      '**The errata from GW app 2.8.0 is in.** Changes for Adepta Sororitas, Adeptus Mechanicus, Aeldari, Black Templars, Blood Angels, Dark Angels, Deathwatch, Grey Knights, Imperial Agents, Orks, Space Marines and Space Wolves.',
      '**[Kayvaan Shrike](/factions/space-marines/datasheets/kayvaan-shrike) is an EPIC HERO again.** GW’s Space Marines update document of 14 October says so, and the app did not take it in. I applied it from the document, so a list can take him once.',
      '**The Legends datasheets match GW’s Faction Packs of 14 October.** Adepta Sororitas, Adeptus Mechanicus, Imperial Agents, Tyranids and Aeldari. The Legends [Repressor](/factions/adepta-sororitas/datasheets/repressor) and [Battle Sanctum](/factions/adepta-sororitas/datasheets/battle-sanctum) gained the FRAME keyword.',
      '**The Core Rules have two new sections.** [01.02.12](/core-rules#section-01-02-12) Replacing One Model with Another and [01.04.06](/core-rules#section-01-04-06) Drawing a Line. [09.07.01](/core-rules#section-09-07-01) Desperate Escape Test is updated.',
      '**New GW answers are in the FAQ.** In the Core Rules reference and on ten faction pages.',
      { h: 'Probable GW mistakes', kind: 'errors' },
      '**For now I take the GW app’s data word for word.** Below is what looks like their mistake. They will most likely fix it in the next few days, and I will follow.',
      '**[Death Company Captain](/factions/blood-angels/datasheets/death-company-captain): the power fist is A3 WS3+.** It was A6 WS2+. The Relic Weapon on the same sheet is A7 WS2+.',
      '**[Bjorn the Fell-handed](/factions/space-wolves/datasheets/bjorn-the-fell-handed): the Assault Cannon is BS 3+.** The Space Wolves errata changes Bjorn’s BS to 2+ without naming a weapon, and the datasheet in the app did not change.',
      '**In the app a [Shield-Captain](/factions/adeptus-custodes/datasheets/shield-captain) with his spear and shield costs 205 points.** The app adds 25 for the Pyrithite Spear and Praesidium Shield he starts with. I follow the MFM for points, so here he costs 180.',
      { h: 'Roster builder' },
      '**A unit costs exactly what the MFM says.** The GW app charges extra for the wargear some units start with: a Leman Russ, a Ravager, a Repulsor Executioner, Victrix Honour Guard, Achilles Ridgerunners and two kinds of Crisis Battlesuits. The builder used to add that too. Now only the wargear you pick costs points.',
      '**An option several kinds of model can take now goes to a model you choose.** Each kind of model has its own choice, and they share one limit. Before, in [Wracks](/factions/drukhari/datasheets/wracks) the Acothyst could end up with a weapon you could not change, and the list was marked invalid.',
      '**A unit’s options are grouped by kind of model.** Each kind has its own card with its name on top, the Sergeant first. His own options and the shared ones stand together.',
      '**A swap that is only possible after another one stands under it.** For example, the Acothyst’s power weapon appears under the special weapon he took.',
      '**Several swaps of the same weapon are one block.** The weapon the models start with is one line in it. A long instruction that repeats the options below is folded under “full text”.',
      '**Import gives an option to the model the list names.** If the list names none, the Sergeant gets it first, then the other models. Your saved lists were moved the same way. You can hand an option to another model with two taps.',
      { h: 'Answers to your questions' },
      'Why do [Hellflayers](/factions/chaos-daemons/datasheets/hellflayers) have a 5+ invulnerable save and not 4+? The GW app gives them 5+, and the errata does not change it. The GW app is my canon, and I follow it.',
    ],
    ru: [
      { h: 'Изменения правил GW', kind: 'rules', patch: '981' },
      '**Вышел Codex: Adeptus Custodes.** Новые армейские правила, 13 детачментов и новые датащиты — на [странице фракции](/factions/adeptus-custodes). Очки по MFM v1.6.',
      '**Ваши списки Custodes перенесены на новый кодекс.** Отряд, который GW переименовал, остаётся в списке под новым именем. Снаряжение у него сброшено, размер тоже — если поменялись варианты состава. Проверьте каждый список Custodes перед игрой.',
      '**Внесена эррата из приложения GW 2.8.0.** Правки у Adepta Sororitas, Adeptus Mechanicus, Aeldari, Black Templars, Blood Angels, Dark Angels, Deathwatch, Grey Knights, Imperial Agents, Orks, Space Marines и Space Wolves.',
      '**[Kayvaan Shrike](/factions/space-marines/datasheets/kayvaan-shrike) снова EPIC HERO.** Так сказано в документе GW с правками Space Marines от 14 октября, а в приложение эта правка не попала. Я применил её по документу, поэтому взять его в список можно один раз.',
      '**Датащиты Legends сверены с Faction Pack’ами GW от 14 октября.** Adepta Sororitas, Adeptus Mechanicus, Imperial Agents, Tyranids и Aeldari. У Legends [Repressor](/factions/adepta-sororitas/datasheets/repressor) и [Battle Sanctum](/factions/adepta-sororitas/datasheets/battle-sanctum) появился кейворд FRAME.',
      '**В основных правилах два новых раздела.** [01.02.12](/core-rules#section-01-02-12) «Замена одной модели другой» и [01.04.06](/core-rules#section-01-04-06) «Проведение линии». Обновлён [09.07.01](/core-rules#section-09-07-01) «Проверка отчаянного побега».',
      '**Новые ответы GW в FAQ.** В справочнике основных правил и на страницах десяти фракций.',
      { h: 'Вероятные ошибки GW', kind: 'errors' },
      '**Пока я беру данные приложения GW дословно.** Ниже то, что похоже на их ошибку. Скорее всего, они поправят это в ближайшие дни, и я обновлю данные следом.',
      '**[Death Company Captain](/factions/blood-angels/datasheets/death-company-captain): у power fist A3 WS3+.** Раньше было A6 WS2+. У Relic Weapon на том же листе A7 WS2+.',
      '**[Bjorn the Fell-handed](/factions/space-wolves/datasheets/bjorn-the-fell-handed): у Assault Cannon BS 3+.** Эррата Space Wolves меняет BS Bjorn на 2+, но не называет оружие. Датащит в приложении не изменился.',
      '**В приложении [Shield-Captain](/factions/adeptus-custodes/datasheets/shield-captain) со своими копьём и щитом стоит 205 очков.** Приложение добавляет 25 за стартовые Pyrithite Spear и Praesidium Shield. Очки я беру по MFM, поэтому у меня он стоит 180.',
      { h: 'Конструктор ростеров' },
      '**Отряд стоит ровно столько, сколько в MFM.** Приложение GW берёт доплату за стартовое снаряжение у некоторых отрядов: Leman Russ, Ravager, Repulsor Executioner, Victrix Honour Guard, Achilles Ridgerunners и двух видов Crisis Battlesuits. Раньше конструктор тоже её добавлял. Теперь очки стоит только то снаряжение, которое вы выбрали.',
      '**Опцию, которую могут взять разные модели отряда, теперь получает модель, которую вы выбрали.** Выбор есть у каждого вида моделей, лимит у них общий. Раньше в [Wracks](/factions/drukhari/datasheets/wracks) Acothyst мог получить оружие, которое нельзя было поменять, и список считался ошибочным.',
      '**Опции отряда разложены по видам моделей.** У каждого вида своя карточка с названием сверху, сержант первым. Его собственные опции и общие стоят вместе.',
      '**Замена, которая возможна только после другой, стоит под ней.** Например, power weapon у Acothyst появляется под выбранным особым оружием.',
      '**Несколько замен одного оружия собраны в один блок.** Стандартное оружие в нём стоит одной строкой. Длинный текст инструкции, который повторяет строки ниже, свёрнут под «полный текст».',
      '**Импорт отдаёт опцию той модели, которую называет список.** Если модель не названа, опцию получает сержант, потом остальные модели. Ваши сохранённые списки перенесены так же. Отдать опцию другой модели можно двумя нажатиями.',
      { h: 'Ответы на вопросы' },
      'Почему у [Hellflayers](/factions/chaos-daemons/datasheets/hellflayers) инвуль 5+, а не 4+? В приложении GW у них 5+, и эррата это не меняет. Приложение GW для меня канон, и я следую ему.',
    ],
  },
  {
    version: '2.8.2',
    date: '2026-10-14',
    en: [
      { h: 'Faction rules', kind: 'rules' },
      '**On a computer a faction’s page is wider.** Long army and detachment rules run in two columns, as in the Core Rules.',
      '**The Russian name of a subheading in a rule now stands right after the English one.** I added the missing translations for Orks and the five Space Marines Chapters.',
      { h: 'GW rule changes', kind: 'rules' },
      '**A price that changed is coloured.** Red if it went up, green if it went down.',
      '**The page remembers the faction you picked.**',
      { h: 'Roster builder' },
      '**Allies can no longer take an enhancement or be the Warlord.** The allied rule forbids both, and before the builder offered them and then marked the list as invalid. For example, a [Changecaster](/factions/chaos-daemons/datasheets/changecaster) in a Chaos Space Marines list. Where an ally group allows enhancements, they stay.',
      '**[Be’lakor](/factions/chaos-daemons/datasheets/belakor) as an ally no longer has to be the Warlord.** Chaos Space Marines and Chaos Knights take him as an ally. His rule says he must be the Warlord, and the allied rule forbids it. The allied rule wins. Before, a list with him was invalid whichever way you set it.',
      '**New export format: Russian tournament.** Open a list, choose Export and pick the format. The header has the player, the HIN, the Warlord and the enhancements. Attached units come as blocks, the rest by prefix (CH1, IN2…), and of the wargear only your swaps are listed. Type your name and HIN once, and the next export remembers them.',
      '**A list’s Missions tab now shows the layouts.** Tap Layouts on an opponent’s row to see the three layouts for that matchup. Tap one to open it full size.',
      '**A pinned list can be unpinned right from its card.** Tap the pin. The site asks first, so a stray tap does not reorder your lists.',
      { h: 'Answers to your questions' },
      'Can I take a 3 DP detachment in an Incursion game? Yes, if it is your only detachment. If another detachment is already chosen, remove it first. Then the 3 DP detachments appear in the list.',
    ],
    ru: [
      { h: 'Правила фракций', kind: 'rules' },
      '**На компьютере страница фракции стала шире.** Длинные правила армии и детачмента идут в две колонки, как в основных правилах.',
      '**Русское название подзаголовка в правиле теперь стоит сразу после английского.** Я дописал недостающие переводы у Orks и пяти орденов Space Marines.',
      { h: 'Изменения правил GW', kind: 'rules' },
      '**Изменившаяся цена выделена цветом.** Красным, если выросла, зелёным, если упала.',
      '**Страница запоминает выбранную фракцию.**',
      { h: 'Конструктор ростеров' },
      '**Союзникам больше нельзя дать улучшение или сделать их Warlord.** Правило союзников запрещает и то, и другое, а раньше конструктор это предлагал и потом помечал список как неверный. Например, [Changecaster](/factions/chaos-daemons/datasheets/changecaster) в списке Chaos Space Marines. Там, где группа союзников разрешает улучшения, они остаются.',
      '**[Be’lakor](/factions/chaos-daemons/datasheets/belakor) союзником больше не обязан быть Warlord.** У Chaos Space Marines и Chaos Knights он приходит союзником. Его правило требует быть Warlord, а правило союзников это запрещает. Правило союзников сильнее. Раньше список с ним был неверным при любом выборе.',
      '**Новый формат экспорта: «Русский турнир».** Откройте ростер, нажмите «Экспорт» и выберите формат. В шапке игрок, HIN, Warlord и улучшения. Присоединённые юниты идут блоками, остальные по префиксам (CH1, IN2…), а из снаряжения указаны только ваши замены. Имя и HIN достаточно ввести один раз, следующий экспорт их запомнит.',
      '**На вкладке «Миссии» ростера теперь видны расстановки.** Нажмите «Расстановки» в строке соперника, и под ней появятся три расстановки для этой пары. Нажатие на расстановку открывает её крупно.',
      '**Закреплённый лист можно открепить прямо с карточки.** Нажмите на булавку. Сайт переспросит, чтобы список не перестроился от случайного касания.',
      { h: 'Ответы на вопросы' },
      'Можно ли взять детачмент за 3 DP в битве Incursion? Да, если он единственный. Если уже выбран другой детачмент, сначала снимите его. Тогда детачменты за 3 DP появятся в списке.',
    ],
  },
  {
    version: '2.8.1',
    date: '2026-10-12',
    en: [
      { h: 'Checking against the GW app' },
      'I improved the scripts that check the site against the GW app. They now also read the codex errata and the Core Rules FAQ. Here is what they found.',
      '**Toughness 5** for the Emperor’s Children [Sorcerer](/factions/emperors-children/datasheets/sorcerer) and [Lord Exultant](/factions/emperors-children/datasheets/lord-exultant), as the codex errata of 30 September requires. The errata raised Toughness for four units, but the app’s datasheets got it for only two of them.',
      '**Strength 5** for the close combat weapon of the Grey Knights [Purifier Squad](/factions/grey-knights/datasheets/purifier-squad), as the codex errata requires. The other 232 characteristic changes from the errata of eight codexes were already right.',
      '**17 Core Rules FAQ answers** from recent updates that the site was missing are now [on the Core Rules page](/core-rules#section-faq). For example, when a FLYING unit taking to the skies takes effect, and whether a critical hit on 4+ works when snap shooting.',
      { h: 'Roster builder' },
      '**I tidied up the roster builder’s code** and fixed a few small errors in how lists are checked.',
      '**Wargear bonuses on the unit card** now show when every model in the unit has the wargear. Before, the bonus vanished: a Shield Drone on every [Crisis suit](/factions/tau-empire/datasheets/crisis-battlesuits) or [Broadside](/factions/tau-empire/datasheets/broadside-battlesuits), a brute shield on every [Bullgryn](/factions/astra-militarum/datasheets/bullgryn-squad), a storm shield on every [Wolf Guard](/factions/space-wolves/datasheets/wolf-guard-terminators). Two Shield Drones on one Broadside now add 2 Wounds.',
      '**Space Marines leaders join Deathwatch squads** brought by Deathwatch Support. For example, an [Ancient in Terminator Armour](/factions/space-marines/datasheets/ancient-in-terminator-armour) can join a [Deathwatch Terminator Squad](/factions/deathwatch/datasheets/deathwatch-terminator-squad), as his datasheet says. The same goes for the Chapters, and for Imperial Agents leaders with Adepta Sororitas Sanctifiers.',
      '**The [Talos](/factions/drukhari/datasheets/talos) counts its macro-scalpel swaps correctly.** Before, the builder could save a fractional number, such as 1.5 ichor injectors. If your list has one, it now shows a warning. Set the count again and the warning goes away.',
      '**The [Decimator](/factions/chaos-space-marines/datasheets/decimator)** can no longer swap both butcher cannons when one of them is already replaced.',
      { h: 'Tracker' },
      '**Two Orders at once** for a unit led by [Ursula Creed](/factions/astra-militarum/datasheets/ursula-creed), or by a [Militarum Tempestus Command Squad](/factions/astra-militarum/datasheets/militarum-tempestus-command-squad) with a Command Rod. Before, the second Order replaced the first.',
      { h: 'Answers to your questions' },
      'Why can’t Black Templars take Gladius Task Force? The GW app and the Munitorum Field Manual do not give it to them either. So the roster builder does not offer it.',
      'Why can’t a Necrons [Overlord](/factions/necrons/datasheets/overlord) take an Overlord’s blade and a Resurrection Orb together? By the datasheet, the orb is only for a model without a tachyon arrow. The tachyon arrow is replaced only together with the blade.',
      'Why can’t a [Deathwatch Terminator](/factions/deathwatch/datasheets/deathwatch-terminator-squad) take a plasma cannon and a chainfist together? The plasma cannon replaces the storm bolter. The chainfist comes only in exchange for the power fist and the storm bolter together. A model with a plasma cannon has no storm bolter left to give.',
      'Why can’t Dark Angels take Wrath of the Rock together with Terminator Storm Force? Both detachments have the TERMINATOR tag. A list cannot take two detachments with the same tag. The Munitorum Field Manual and the GW app both give them this tag. In the roster builder the tag is shown on the detachment’s card.',
      { h: 'Thank you' },
      'Thank you to everyone who supports the project financially and to everyone who sends bug reports.',
      'The last few days were stressful. With your support we got through all of it. We made the site as resilient to failures as is possible in the current situation.',
    ],
    ru: [
      { h: 'Сверка с приложением GW' },
      'Я доработал скрипты, которые сверяют сайт с приложением GW. Теперь они читают ещё эррату кодексов и FAQ базовых правил. Вот что они нашли.',
      '**Toughness 5** у [Sorcerer](/factions/emperors-children/datasheets/sorcerer) и [Lord Exultant](/factions/emperors-children/datasheets/lord-exultant) из Emperor’s Children. Так требует эррата кодекса от 30 сентября. Эррата подняла Toughness четырём юнитам, а в датащитах приложения её подняли только двум.',
      '**Strength 5** у close combat weapon в [Purifier Squad](/factions/grey-knights/datasheets/purifier-squad) из Grey Knights. Так требует эррата кодекса. Остальные 232 изменения характеристик из эррат восьми кодексов уже были верными.',
      '**17 ответов из FAQ базовых правил** из последних обновлений, которых не было на сайте, теперь [на странице правил](/core-rules#section-faq). Например, когда начинает действовать подъём в небо у юнита FLYING и работает ли критическое попадание на 4+ при стрельбе навскидку.',
      { h: 'Конструктор ростеров' },
      '**Я навёл порядок в коде конструктора ростеров** и исправил несколько мелких ошибок в проверке списков.',
      '**Прибавка от снаряжения на карточке юнита** теперь видна, когда оно есть у каждой модели отряда. Раньше прибавка пропадала: Shield Drone на каждом [Crisis](/factions/tau-empire/datasheets/crisis-battlesuits) или [Broadside](/factions/tau-empire/datasheets/broadside-battlesuits), brute shield у каждого [Bullgryn](/factions/astra-militarum/datasheets/bullgryn-squad), storm shield у каждого [Wolf Guard](/factions/space-wolves/datasheets/wolf-guard-terminators). Два Shield Drone на одном Broadside теперь дают +2 к ранам.',
      '**Лидеры Space Marines присоединяются к отрядам Deathwatch** из Deathwatch Support. Например, [Ancient in Terminator Armour](/factions/space-marines/datasheets/ancient-in-terminator-armour) присоединяется к [Deathwatch Terminator Squad](/factions/deathwatch/datasheets/deathwatch-terminator-squad), как написано в его датащите. То же у орденов, и у лидеров Imperial Agents с Sanctifiers у Adepta Sororitas.',
      '**[Talos](/factions/drukhari/datasheets/talos) правильно считает замены macro-scalpel.** Раньше конструктор мог сохранить дробное число, например 1.5 ichor injector. Если такое есть в вашем ростере, теперь там предупреждение. Выставьте количество заново, и оно пропадёт.',
      '**[Decimator](/factions/chaos-space-marines/datasheets/decimator)** больше не может заменить обе butcher cannon, если одна из них уже заменена.',
      { h: 'Трекер' },
      '**Два приказа сразу** у отряда, который ведёт [Ursula Creed](/factions/astra-militarum/datasheets/ursula-creed) или [Militarum Tempestus Command Squad](/factions/astra-militarum/datasheets/militarum-tempestus-command-squad) с Command Rod. Раньше второй приказ заменял первый.',
      { h: 'Ответы на вопросы' },
      'Почему у Black Templars нет Gladius Task Force? Его не дают им ни приложение GW, ни Munitorum Field Manual. Поэтому конструктор его не предлагает.',
      'Почему [Overlord](/factions/necrons/datasheets/overlord) у Necrons не может взять Overlord’s blade и Resurrection Orb вместе? По датащиту сферу берёт только модель без tachyon arrow. А tachyon arrow меняется только вместе с blade.',
      'Почему [Deathwatch Terminator](/factions/deathwatch/datasheets/deathwatch-terminator-squad) не может взять plasma cannon и chainfist вместе? Plasma cannon заменяет storm bolter. А chainfist выдаётся только взамен power fist и storm bolter вместе. У модели с plasma cannon storm bolter уже нет.',
      'Почему Dark Angels не могут взять Wrath of the Rock вместе с Terminator Storm Force? У обоих детачментов тег TERMINATOR. Два детачмента с одним тегом в один список брать нельзя. Этот тег им дают и Munitorum Field Manual, и приложение GW. В конструкторе тег подписан на карточке детачмента.',
      { h: 'Спасибо' },
      'Спасибо всем, кто поддерживает проект деньгами, и всем, кто присылает баг-репорты.',
      'Последние дни были непростыми. Благодаря вашей поддержке мы со всем справились. Мы сделали сайт настолько устойчивым к сбоям, насколько это вообще возможно в текущей обстановке.',
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
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
