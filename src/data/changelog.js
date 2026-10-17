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
    version: '2.9.6',
    date: '2026-10-17',
    en: [
      { h: 'Roster builder' },
      '**Grav-Assault Force rules are only on GRAV-ASSAULT units now.** Flare Shields stood on every unit’s card, Dreadnoughts included. Its three stratagems were offered to every unit too. This is on a unit’s card in a roster and in a game.',
      '**A Tempestus Scion can take the regimental standard only while he keeps his hot-shot lasgun.** The builder let a Scion with a special weapon take it as well.',
      '**[Canoness](/factions/adepta-sororitas/datasheets/canoness) can take the rod of office only with a plasma pistol and a power weapon.** The builder let her take it with anything. I checked every option of this kind. Four more units had the same problem, among them Corsair Voidscarred with the Faolchú and Hernkyn Pioneers.',
      '**The unit editor shows the whole default wargear.** It used to show only what no option replaces. A Kill Tank, whose every gun can be swapped, showed nothing.',
      '**Units that another unit’s ability adds to the game stand under that unit.** [Ripper Swarms](/factions/tyranids/datasheets/ripper-swarms) are under a [Parasite of Mortrex](/factions/tyranids/datasheets/parasite-of-mortrex), [Spore Mines](/factions/tyranids/datasheets/spore-mines) under [Biovores](/factions/tyranids/datasheets/biovores) and the [Harpy](/factions/tyranids/datasheets/harpy), [Mucolid Spores](/factions/tyranids/datasheets/mucolid-spores) under a [Sporocyst](/factions/tyranids/datasheets/sporocyst). A tap opens their card. It is also on the card of the unit that adds them. This is in a roster and in a game.',
      '**The name of such a unit in the ability’s text opens its card.** This works everywhere the ability is shown.',
      '**[SUSTAINED HITS], [LETHAL HITS] and [HEAVY] are no longer added to [TORRENT] weapons.** Such a weapon hits without a hit roll, so these abilities never work on it. Alpha Invader gave [SUSTAINED HITS 1] to the venom bolt of [Hyperadapted Raveners](/factions/tyranids/datasheets/hyperadapted-raveners).',
      '**[IGNORES COVER] is no longer added to melee weapons and [TORRENT] weapons.** Cover only worsens the BS of a ranged attack.',
      '**Rules no longer take a characteristic past its limits in the Core Rules.** Ld stays between 5+ and 8+ on the card. A BS of “-” stays “-”.',
      '**When a unit or a weapon already has an ability, the card shows only the better one.** Two instances of an ability never add up. [SUSTAINED HITS 1] from a rule no longer stands next to a printed [SUSTAINED HITS 2], nor Scouts 6" next to Scouts 7". Feel No Pain 5+ from a rule replaces a printed 6+.',
      { h: 'Probable GW mistakes' },
      '**[Corsair Cloud Dancer Band](/factions/aeldari/datasheets/corsair-cloud-dancer-band), [Firestorm](/factions/aeldari/datasheets/firestorm) and [Warp Hunter](/factions/aeldari/datasheets/warp-hunter): the twin shuriken catapult has AP 3.** This is how the Aeldari Faction Pack prints it. The same weapon has AP -1 on other datasheets. I show it as the PDF prints it for now.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Правила Grav-Assault Force теперь только у юнитов GRAV-ASSAULT.** Flare Shields стоял на карточке каждого юнита, в том числе у дредноутов. Три его стратагемы тоже предлагались любому юниту. Это видно на карточке юнита в ростере и в партии.',
      '**Tempestus Scion может взять regimental standard, только если у него остаётся hot-shot lasgun.** Конструктор давал взять знамя и Scion со спецоружием.',
      '**[Canoness](/factions/adepta-sororitas/datasheets/canoness) может взять rod of office только с plasma pistol и power weapon.** Конструктор давал взять его с чем угодно. Я проверил все такие опции. Ещё у четырёх юнитов было то же самое, среди них Corsair Voidscarred с Faolchú и Hernkyn Pioneers.',
      '**Редактор юнита показывает всё стандартное снаряжение.** Раньше там было только то, что нельзя заменить. У Kill Tank, где можно заменить любое оружие, блок был пустым.',
      '**Юниты, которых добавляет в партию способность другого юнита, стоят под ним.** [Ripper Swarms](/factions/tyranids/datasheets/ripper-swarms) стоят под [Parasite of Mortrex](/factions/tyranids/datasheets/parasite-of-mortrex), [Spore Mines](/factions/tyranids/datasheets/spore-mines) под [Biovores](/factions/tyranids/datasheets/biovores) и [Harpy](/factions/tyranids/datasheets/harpy), [Mucolid Spores](/factions/tyranids/datasheets/mucolid-spores) под [Sporocyst](/factions/tyranids/datasheets/sporocyst). По тапу открывается их карточка. Она есть и в карточке юнита, который их добавляет. Это видно в ростере и в партии.',
      '**Имя такого юнита в тексте способности открывает его карточку.** Это работает везде, где видна способность.',
      '**[SUSTAINED HITS], [LETHAL HITS] и [HEAVY] больше не добавляются оружию с [TORRENT].** Такое оружие попадает без броска, и эти способности у него не работают. У [Hyperadapted Raveners](/factions/tyranids/datasheets/hyperadapted-raveners) Alpha Invader давал [SUSTAINED HITS 1] и venom bolt.',
      '**[IGNORES COVER] больше не добавляется оружию ближнего боя и оружию с [TORRENT].** Укрытие ухудшает BS только у стрелковой атаки.',
      '**Правила больше не выводят характеристику за пределы из базовых правил.** Ld на карточке остаётся между 5+ и 8+. BS «-» остаётся «-».',
      '**Если у юнита или оружия способность уже есть, карточка показывает только лучшую.** Одинаковые способности не складываются. [SUSTAINED HITS 1] от правила больше не стоит рядом с напечатанным [SUSTAINED HITS 2], а Scouts 6" рядом со Scouts 7". Feel No Pain 5+ от правила заменяет напечатанный 6+.',
      { h: 'Вероятные ошибки GW' },
      '**[Corsair Cloud Dancer Band](/factions/aeldari/datasheets/corsair-cloud-dancer-band), [Firestorm](/factions/aeldari/datasheets/firestorm) и [Warp Hunter](/factions/aeldari/datasheets/warp-hunter): у twin shuriken catapult AP 3.** Так напечатано в Faction Pack Aeldari. У того же оружия на других датащитах AP -1. Пока показываю как в PDF.',
    ],
  },
  {
    version: '2.9.5',
    date: '2026-10-16',
    en: [
      { h: 'Roster builder' },
      '**A rule for units with a keyword now reaches the whole attached unit.** In Experimental Prototype Cadre, Crisis Battlesuits led by a Commander now have +6" Range too. By the Core Rules (19.03), an attached unit has the keywords of every unit in it. A rule for models with a keyword still applies to those models only. This is on a unit’s card in a roster and in a game.',
      '**The ⓘ next to a modifier from part of an army rule opens that part.** On Custodes cards, Daughters of the Abyss opened Martial Ka’tah. The same applies to Synapse, Drones, the Deathwing and the Ravenwing, among others.',
      '**Every wargear option is in Russian.** 62 of them were in English, among them the Hearthkyn Warriors’ weapons.',
      { h: 'Whole site' },
      '**In a browser tab the site always opens in its latest version.** It no longer keeps a copy of itself there. If you visited before, a plate will ask you once to apply the change. Offline works in the installed app.',
      '**When a new version comes out while the site is open, a plate says so.** Press Update or follow any link.',
      '**A unit’s composition is in Russian too.** The names stay English, as everywhere.',
      { h: 'Combat Patrol', kind: 'rules' },
      '**The Rallying War Cry enhancement is in Russian.** It was in English.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Правило для юнитов с ключевым словом теперь действует на весь отряд с лидером.** В Experimental Prototype Cadre у Crisis Battlesuits под Commander теперь тоже +6" к дальности. По Core Rules (19.03) у отряда с лидером есть ключевые слова всех юнитов в нём. Правило для моделей с ключевым словом по-прежнему действует только на эти модели. Это видно на карточке юнита в ростере и в партии.',
      '**ⓘ у модификатора из части правила армии открывает эту часть.** На карточках кустодес Daughters of the Abyss открывал Martial Ka’tah. Так же теперь у Synapse, Drones, Deathwing, Ravenwing и других.',
      '**Все варианты снаряжения теперь по-русски.** 62 из них были на английском, среди них оружие Hearthkyn Warriors.',
      { h: 'Весь сайт' },
      '**Во вкладке браузера сайт теперь всегда открывается в последней версии.** Он больше не хранит там свою копию. Если вы заходили раньше, плашка один раз попросит применить изменение. Офлайн работает в установленном приложении.',
      '**Если новая версия выходит, пока сайт открыт, об этом скажет плашка.** Нажмите «Обновить» или перейдите по любой ссылке.',
      '**Состав отряда теперь по-русски.** «4‑9 моделей Intercessor» вместо «4‑9 Intercessor models». Названия остаются английскими, как везде.',
      { h: 'Combat Patrol', kind: 'rules' },
      '**Улучшение Rallying War Cry теперь по-русски.** Раньше оно было на английском.',
    ],
  },
  {
    version: '2.9.4',
    date: '2026-10-16',
    en: [
      { h: 'Warhammer 40,000 app changes', kind: 'rules', patch: '995' },
      '**The data of GW app 2.8.1 is in.** GW fixed two mistakes of the previous update.',
      '**[Death Company Captain](/factions/blood-angels/datasheets/death-company-captain): the power fist is A6 WS2+ again.** This is the mistake I wrote about in 2.9.0.',
      '**[Kayvaan Shrike](/factions/space-marines/datasheets/kayvaan-shrike) is an EPIC HERO in the app too.** Here he already was: I had applied it from Chapter Approved.',
      '**New keywords.** Company Heroes and Ravenwing Command Squad are CHARACTER. Victrix Honour Guard are EPIC HERO, Wardens of Ultramar are PSYKER. Talonstrike Kill Team and Aquila Kill Team are GRAVIS and TACTICUS. Wolf Guard Headtakers are BEASTS instead of BEAST.',
      '**Aquilon Terminators are on 50mm bases.** Before, 40mm.',
      '**The Impulsor’s wargear options are on its page.** One of four systems, Fragstorm Grenade Launchers instead of the Storm Bolters, and an Ironhail Heavy Stubber. The roster builder already had them.',
      { h: 'Whole site' },
      '**The site no longer reloads itself while you are using it.** When an update comes out, a notice with an Update button appears at the bottom. If you do not press it, the new version opens the next time you start the app.',
      '**Opening the app after an update takes you straight to the new version.** While it loads you see “Updating to 2.9.4…”. Before, the old version opened first and reloaded a few seconds later.',

      { h: 'Faction rules', kind: 'rules' },
      '**A weapon ability printed on the unit’s own page now opens its own text.** Tapping [PSYCHIC ASSASSIN] on the Culexus Assassin opened [PSYCHIC] instead. Ten more opened nothing at all, among them [CONVERSION] on Chaos Knights and [PLASMA WARHEAD] on the Deathstrike. Now such a tag opens its text wherever it appears, here too.',
      { h: 'Roster builder' },
      '**A Deathwatch list no longer limits Deathwatch units to 500 points.** That limit is for other Space Marine Chapters that take Deathwatch units along. A Blood Angels list, for example, still has it.',
      '**Sanctifiers can take either a meltagun or holy fire, not both.** Only one Missionary has a plasma gun, and both options are for that gun.',
    ],
    ru: [
      { h: 'Изменения приложения Warhammer 40,000', kind: 'rules', patch: '995' },
      '**Внесены данные приложения GW 2.8.1.** GW исправил две ошибки прошлого обновления.',
      '**[Death Company Captain](/factions/blood-angels/datasheets/death-company-captain): у power fist снова A6 WS2+.** Это та ошибка, о которой я писал в 2.9.0.',
      '**[Kayvaan Shrike](/factions/space-marines/datasheets/kayvaan-shrike) теперь EPIC HERO и в приложении.** У меня он уже был им: я применил это по Chapter Approved.',
      '**Новые ключевые слова.** Company Heroes и Ravenwing Command Squad — CHARACTER. Victrix Honour Guard — EPIC HERO, Wardens of Ultramar — PSYKER. Talonstrike Kill Team и Aquila Kill Team — GRAVIS и TACTICUS. У Wolf Guard Headtakers BEASTS вместо BEAST.',
      '**Aquilon Terminators стоят на базах 50 мм.** Раньше было 40 мм.',
      '**Опции снаряжения Impulsor есть на его странице.** Одна из четырёх систем, Fragstorm Grenade Launchers вместо Storm Bolters и Ironhail Heavy Stubber. В конструкторе ростеров они уже были.',
      { h: 'Весь сайт' },
      '**Сайт больше не перезагружается сам, пока вы им пользуетесь.** Когда выходит обновление, внизу появляется плашка с кнопкой «Обновить». Если её не нажать, новая версия откроется при следующем запуске приложения.',
      '**Если открыть приложение после обновления, сразу откроется новая версия.** Пока она загружается, видно «Обновляю до 2.9.4…». Раньше сначала открывалась старая версия и через несколько секунд перезагружалась.',

      { h: 'Правила фракций', kind: 'rules' },
      '**Способность оружия, напечатанная на странице юнита, теперь открывает свой текст.** Раньше [PSYCHIC ASSASSIN] у Culexus Assassin открывал [PSYCHIC]. Ещё десять не открывались вовсе, среди них [CONVERSION] у Chaos Knights и [PLASMA WARHEAD] у Deathstrike. Теперь такая способность открывает свой текст везде, где она упомянута, и здесь тоже.',
      { h: 'Конструктор ростеров' },
      '**В списке Deathwatch юниты Deathwatch больше не ограничены 500 очками.** Это ограничение для других орденов Space Marines, которые берут юниты Deathwatch с собой. В списке Blood Angels, например, оно осталось.',
      '**Sanctifiers могут взять либо мельту, либо Holy fire, но не оба.** Плазма есть только у одного Missionary, и обе опции — для неё.',
    ],
  },
  {
    version: '2.9.3',
    date: '2026-10-16',
    en: [
      { h: 'Combat Patrol', kind: 'rules' },
      '**A box page shows how many of each unit the box holds.** The Tyranids box has two Termagant units, for example. The Orks box has two ’Ardmob Boyz units, one with a kombi-rokkit, one with a kustom shoota. Before, it showed one Boyz unit with an option the box does not have.',
      { h: 'Faction rules', kind: 'rules' },
      '**A unit’s page shows what its wargear costs.** Under the points table: Heavy psycannon +15 pts on a Nemesis Dreadknight, for example. These are the Munitorum Field Manual prices the roster builder already charges.',
      '**On a unit’s page, three Shield-Captains and four more Custodes units now show the price of a repeat unit.** The points table had one price only. A second Shield-Captain costs 200 points, not 180.',
      { h: 'Roster builder' },
      '**A unit’s card in a roster shows only the detachment rules that are about it.** Runt Swarm’s rule for GRETCHIN units no longer shows on a Battlewagon, for example. A unit’s datasheet name now counts as its keyword, as the Core Rules say.',
      '**A WTC export of a Space Marine Chapter list names its faction in full.** A Blood Angels list reads “Imperium - Adeptus Astartes - Blood Angels”. Before, Adeptus Astartes was missing. The same goes for Dark Angels, Space Wolves, Black Templars and Deathwatch.',
      { h: 'Tracker' },
      '**The Take Cover! Order is now in the list of Orders during a game.** With it the unit’s Save improves by 1, but no better than 3+.',
      '**Citation in Savagery now lasts the whole battle.** Before, the tracker switched it off after the first battle round.',
      '**Cryptek units no longer get [ANTI-INFANTRY 3+] in every Shooting phase.** By the rule, it is one of five abilities you select for the unit each time it shoots.',
      { h: 'Whole site' },
      '**Search finds a name with a hyphen however you type it.** “grav-tank” finds the Caladius Grav-Tank.',
    ],
    ru: [
      { h: 'Combat Patrol', kind: 'rules' },
      '**На странице набора видно, сколько каких отрядов в нём.** Например, в наборе тиранидов два отряда Termagants. В наборе орков два отряда ’Ardmob Boyz: у одного kombi-rokkit, у другого kustom shoota. Раньше там был один отряд Boyz с опцией, которой в наборе нет.',
      { h: 'Правила фракций', kind: 'rules' },
      '**На странице юнита видно, сколько стоит его снаряжение.** Это строка под таблицей очков: например, Heavy psycannon у Nemesis Dreadknight — +15 очков. Это цены Munitorum Field Manual, которые конструктор ростеров уже учитывает.',
      '**На странице юнита у трёх Shield-Captain и ещё четырёх юнитов Custodes появилась цена повторного отряда.** В таблице очков была только одна цена. Второй Shield-Captain стоит 200 очков, а не 180.',
      { h: 'Конструктор ростеров' },
      '**На карточке юнита в ростере видны только те правила детачмента, которые к нему относятся.** Например, правило Runt Swarm для отрядов GRETCHIN больше не видно на Battlewagon. Название юнита теперь считается его ключевым словом, как сказано в базовых правилах.',
      '**В экспорте WTC у орденов Space Marines фракция теперь записана полностью.** У списка Blood Angels это «Imperium - Adeptus Astartes - Blood Angels». Раньше Adeptus Astartes пропускался. Так же у Dark Angels, Space Wolves, Black Templars и Deathwatch.',
      { h: 'Трекер' },
      '**Приказ Take Cover! теперь есть в списке приказов во время партии.** С ним сейв отряда улучшается на 1, но не лучше 3+.',
      '**Citation in Savagery теперь действует всю битву.** Раньше трекер выключал её после первого раунда.',
      '**Отряды Cryptek больше не получают [ANTI-INFANTRY 3+] в каждой фазе стрельбы.** По правилу это одна из пяти способностей, которую вы выбираете отряду, когда он стреляет.',
      { h: 'Весь сайт' },
      '**Поиск находит название с дефисом, как его ни напиши.** По «grav-tank» находится Caladius Grav-Tank.',
    ],
  },
  {
    version: '2.9.2',
    date: '2026-10-15',
    en: [
      { h: 'Whole site' },
      '**You can let the site send me its errors.** It is off until you turn it on: ⚙ → “Send error reports”. Only the error text and the page go, with no account and nothing personal. If you are signed in, the site asks once.',
      '**The points PDF now has wargear prices and the Chapters’ own units.** Under a unit, what each piece of its wargear costs. Ultramarines, Imperial Fists and the other Chapters’ units are in it too. The files on the [GW changes page](/patches) are already the new ones.',
      { h: 'Roster builder' },
      '**A detachment’s rules in the detachment picker no longer close when you open its enhancements or stratagems.** Thanks for the report.',
      '**Black Templars’ Gladiator Valiant costs 145 points again.** Since 2.9.1 the builder also charged 20 points for its two starting multi-meltas. Only a third multi-melta costs extra, 10 points.',
      '**A Chaos Daemons Soul Grinder no longer gets the Daemon Prince’s bonus for its god.** With Khorne it got +2 Strength on its melee weapons, with Nurgle +1 Toughness, with Slaanesh +2" Move. Its god only adds a weapon and a keyword. Chaos Space Marines had the same kind of mix-up between the two Mark of Chaos lists, and it is fixed too.',
      { h: 'Combat Patrol', kind: 'rules' },
      '**Every Combat Patrol box now has its mission.** It is on the box page, on the new Mission tab. The box’s stratagems and enhancements moved to the Rules tab.',
      '**There is a page on [how to play Combat Patrol](/combat-patrol/how-to-play).** It has the order of the game, the three deployment maps and how the winner is decided.',
      '**A Combat Patrol game in the tracker follows its own rules.** Each player scores their box’s mission. There are no secondaries. The battlefield is one of the three Combat Patrol maps, and you can roll a D6 for it. Crushing Impact, Explosives and Rapid Ingress are not on the stratagems page during the game.',
    ],
    ru: [
      { h: 'Весь сайт' },
      '**Сайт может отправлять мне свои ошибки, если вы разрешите.** Пока вы не включите, отправка выключена: ⚙ → «Отправлять отчёты об ошибках». Уходят только текст ошибки и страница, без аккаунта и личных данных. Если вы вошли в аккаунт, сайт спросит один раз.',
      '**В PDF с ценами появились цены снаряжения и юниты орденов.** Под юнитом — сколько стоит каждая штука его снаряжения. Юниты Ultramarines, Imperial Fists и других орденов теперь тоже там. Файлы на [странице изменений GW](/patches) уже новые.',
      { h: 'Конструктор ростеров' },
      '**Правила детачмента в окне выбора детачментов больше не закрываются, когда разворачиваете улучшения или стратагемы.** Спасибо за баг-репорт.',
      '**Gladiator Valiant у Black Templars снова стоит 145 очков.** С версии 2.9.1 конструктор брал ещё 20 очков за две стартовые мульти-мельты. Доплата нужна только за третью мульти-мельту, 10 очков.',
      '**Soul Grinder у Chaos Daemons больше не получает бонус Daemon Prince за своего бога.** С Khorne он получал +2 к силе оружия ближнего боя, с Nurgle +1 к стойкости, со Slaanesh +2" к движению. Его бог даёт только оружие и ключевое слово. У Chaos Space Marines так же путались два списка Mark of Chaos, это тоже исправлено.',
      { h: 'Combat Patrol', kind: 'rules' },
      '**У каждого набора Combat Patrol появилась его миссия.** Она на странице набора, на новой вкладке «Миссия». Стратагемы и улучшения набора переехали на вкладку «Правила».',
      '**Появилась страница [«Как играть в Combat Patrol»](/combat-patrol/how-to-play).** На ней порядок партии, три карты расстановки и как определяется победитель.',
      '**Партия Combat Patrol в трекере идёт по своим правилам.** Каждый игрок считает миссию своего набора. Вторичных миссий нет. Поле — одна из трёх карт Combat Patrol, её можно выбрать броском D6. Crushing Impact, Explosives и Rapid Ingress во время партии не показываются на странице стратагем.',
    ],
  },
  {
    version: '2.9.1',
    date: '2026-10-14',
    en: [
      { h: 'Roster builder' },
      '**Wargear the MFM prices costs points again, starting wargear included.** I was wrong in 2.9.0: the MFM does list wargear prices, under each unit. For example, the [Shield-Captain](/factions/adeptus-custodes/datasheets/shield-captain)’s Praesidium Shield is 25, the [Victrix Honour Guard](/factions/space-marines/datasheets/victrix-honour-guard) banner is 15, and a Leman Russ hull weapon is 5.',
      '**The Black Templars [Gladiator Valiant](/factions/black-templars/datasheets/gladiator-valiant) is 165.** The MFM charges 10 for each of its two multi-meltas on top of 145. The GW app does not charge for them.',
      { h: 'Tracker' },
      '**In Combat Patrol you choose the box.** Adeptus Custodes have three. Before, the tracker always took Tristraen’s Gilded Blades, with its detachment and stratagems.',
      { h: 'Whole site' },
      '**The GW changes page shows every faction at first.** Your own pick is still remembered on this device.',
      '**The points PDF for the 14 October update is on the [GW changes page](/patches).** In Russian and in English.',
    ],
    ru: [
      { h: 'Конструктор ростеров' },
      '**Снаряжение, у которого в MFM есть цена, снова стоит очки, и стартовое тоже.** В 2.9.0 я ошибся: цены снаряжения в MFM есть, они указаны под каждым отрядом. Например, Praesidium Shield у [Shield-Captain](/factions/adeptus-custodes/datasheets/shield-captain) стоит 25, знамя [Victrix Honour Guard](/factions/space-marines/datasheets/victrix-honour-guard) 15, а орудие корпуса Leman Russ 5.',
      '**[Gladiator Valiant](/factions/black-templars/datasheets/gladiator-valiant) у Black Templars стоит 165.** MFM берёт по 10 за каждую из двух его мульти-мелт сверх 145. Приложение GW их не считает.',
      { h: 'Трекер' },
      '**В Combat Patrol вы выбираете бокс.** У Adeptus Custodes их три. Раньше трекер всегда брал Tristraen’s Gilded Blades, с его детачментом и стратагемами.',
      { h: 'Весь сайт' },
      '**Страница изменений GW сначала показывает все фракции.** Ваш выбор на этом устройстве по-прежнему запоминается.',
      '**PDF с ценами обновления от 14 октября — на [странице изменений GW](/patches).** На русском и на английском.',
    ],
  },
]

// The latest entry drives the banner + the stored "last seen version". Exported so the composable
// and the view don't both hard-code `[0]`.
export const latestEntry = changelog[0] ?? null
