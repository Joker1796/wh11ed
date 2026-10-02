// Space Wolves — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
// Пересобран под Codex: Space Marines и его дополнения (app data 963). Здесь переведены только
// собственные листы Ордена; листы Codex: Space Marines, которые Орден берёт по id (`sharedUnitIds`
// EN-файла), переводятся один раз в ./space-marines.js и приходят через SHARED ниже.
// ▪ Способности ключуются по АНГЛИЙСКОМУ названию: переименованная GW способность требует нового
//   ключа, иначе её текст молча остаётся английским (`npm run parity` это ловит).
// ▪ Строки вооружения (loadout/options) переведены рамочно: «**Эта модель вооружена:** …», имена
//   предметов остаются английскими.
// ▪ Листы Legends из Faction Pack’а (source: 'faction-pack') бамп 963 не затронул — их RU прежний.
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

// Codex: Space Marines sheets folded into this Chapter by id — the EN file's `sharedUnitIds`
// (generated). Their RU lives once in ./space-marines.js; the spread below hands it through
// under this faction so a direct import of this module (scripts/gen-seo-routes.mjs) sees it too.
const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'assault-intercessor-squad',
  'assault-intercessors-with-jump-packs', 'astraeus', 'ballistus-dreadnought',
  'bladeguard-ancient', 'bladeguard-veteran-squad', 'brutalis-dreadnought', 'captain',
  'captain-in-gravis-armour', 'captain-in-phobos-armour', 'captain-in-terminator-armour',
  'captain-on-bike', 'captain-with-jump-pack', 'centurion-assault-squad',
  'centurion-devastator-squad', 'cerberus', 'chaplain', 'chaplain-in-terminator-armour',
  'chaplain-on-bike', 'chaplain-with-jump-pack', 'company-heroes', 'desolation-squad',
  'dreadnought', 'drop-pod', 'eliminator-squad', 'eradicator-squad-with-heavy-bolters',
  'eradicator-squad-with-melta-rifles', 'falchion', 'firestrike-servo-turrets',
  'gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant', 'hammerfall-bunker',
  'heavy-intercessor-squad', 'hellblaster-squad', 'impulsor', 'inceptor-squad', 'incursor-squad',
  'infernus-squad', 'infiltrator-squad', 'intercessor-squad', 'invader-atvs',
  'invictor-tactical-warsuit', 'judiciar', 'kratos', 'land-raider', 'land-raider-crusader',
  'land-raider-excelsior', 'land-raider-redeemer', 'land-speeder', 'librarian',
  'librarian-in-phobos-armour', 'librarian-in-terminator-armour', 'lieutenant',
  'lieutenant-in-phobos-armour', 'lieutenant-with-combi-weapon', 'mastodon', 'outrider-squad',
  'predator-annihilator', 'predator-destructor', 'rapier-carrier', 'razorback',
  'redemptor-dreadnought', 'reiver-squad', 'relic-razorback', 'repulsor', 'repulsor-executioner',
  'rhino', 'rhino-primaris', 'scout-bike-squad', 'scout-squad', 'sicaran',
  'sternguard-veteran-squad', 'storm-speeder-hailstrike', 'storm-speeder-hammerstrike',
  'storm-speeder-thunderstrike', 'stormhawk-interceptor', 'stormraven-gunship',
  'stormtalon-gunship', 'tarantula-air-defence-battery', 'tarantula-sentry-battery', 'techmarine',
  'terminator-assault-squad', 'terminator-squad', 'terrax-pattern-termite', 'thunderhawk-gunship',
  'typhon', 'vanguard-veteran-squad', 'vanguard-veteran-squad-with-jump-packs', 'vindicator',
  'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'

export default {
  ...Object.fromEntries(SHARED.filter((id) => smRu[id]).map((id) => [id, smRu[id]])),

  'arjac-rockfist': {
    aliasesRu: ['Арьяк', 'Арьяк Роккфист'],
    flavor:
      'Арьяк Роккфист — исполинская гора мышц и молчаливая наковальня стойкости. Владея огромным Foehammer (что напоминает о его прежней роли Iron Priest кузни), Арьяк крушит врагов сокрушительной силой. Как личный чемпион Великого Волка, Арьяк блюдёт честь Ордена.',
    abilities: {
      'Anvil of Endurance':
        'В фазе ближнего боя, когда модель этого юнита **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 4+ не убирайте ту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), та модель затем убирается с поля боя.',
      'Champion of the Kingsguard':
        'Атаки этой модели, нацеленные на юнит CHARACTER:\n▪ Могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Могут перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
    },
    loadout: '**Эта модель вооружена:** 1 Foehammer.',
    leader: { text: LEADER_TEXT },
  },

  'bjorn-the-fell-handed': {
    aliasesRu: ['Бьорн', 'Бьорн Разящая Рука'],
    flavor:
      'Древнейший из всех космодесантников и последний из Роты Русса, Бьорн Свирепорукий сражается тысячелетиями в саркофаге Dreadnought. Space Wolves чтят Бьорна как живую связь с их глубочайшим прошлым, пробуждая его лишь в час крайней нужды, и он всё ещё бьётся столь же яростно, как когда-то рядом с Руссом.',
    abilities: {
      'Legendary Tenacity':
        'Атаки, нацеленные на этот юнит, чья **[gloss:strength:S]** больше **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.',
      'Ancient Tactician (Once per turn, per army)':
        'Когда вы выбираете этот юнит целью **[gloss:stratagem:стратагемы]**, это применение стоит на 1 CP меньше.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Assault Cannon; 1 Heavy Flamer; 1 Trueclaw.',
    options: [
      'Assault Cannon этой модели можно заменить на одно из следующего: 1 Helfrost Cannon, 1 Multi-melta',
    ],
  },

  'blood-claws': {
    flavor:
      'Юные и пылкие воины, полные воинственного задора, Blood Claw жаждут показать себя в свирепом бою. С неустанным пылом они бросаются очертя голову на врага, балансируя на грани между чистым героизмом и безрассудством. Многие великие саги начинаются с охот за славой Blood Claw.',
    abilities: {
      'Berserk Charge':
        'Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает этот юнит права **[gloss:declare-charge:объявлять нападение]**.',
    },
    loadout: '**Каждая модель вооружена:** 1 Bolt Pistol; 1 Chainsword.',
    options: [
      'Модели Blood Claw Pack Leader можно заменить её Chainsword на 1 Power Weapon.',
      'Модели Blood Claw Pack Leader можно заменить её Bolt Pistol на 1 Plasma Pistol.',
    ],
  },

  'fenrisian-wolves': {
    flavor:
      'Среди самых свирепых и разумных хищников галактики, Fenrisian Wolves сопровождают сынов Русса в бой, следуя за ними, как стая следует за вожаком. Даже самые поджарые из них ростом с человека, но они бесшумно крадутся, прежде чем наброситься стремительным, слаженным вихрем острых как бритва зубов и когтей.',
    abilities: {
      'Predatory Instinct (Once per battle round, per unit)':
        'В фазе движения вашего оппонента, когда вражеский юнит завершает манёвр в пределах 8" от этого юнита, если этот юнит **[gloss:unengaged:не в ближнем бою]**, этот юнит может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до D6".',
      'Hunting Hounds':
        'Пока этот юнит находится в пределах 6" от дружественной модели SPACE WOLVES CHARACTER (исключая WULFEN), если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, этот юнит имеет +1 **[gloss:objective-control:OC]**.',
    },
    loadout: '**Каждая модель вооружена:** 1 Teeth and Claws.',
  },

  'grey-hunters': {
    flavor:
      'С их врождённой первобытной агрессией, укрощённой (но никогда не подавленной) бессчётными победами, Grey Hunter терпеливы, хитры и гибки. Одни стаи берут и удерживают рубеж, обрушивая залпы дисциплинированного огня, другие крадутся по флангам. Когда капкан расставлен, Grey Hunter бросаются на добивание.',
    abilities: {
      'Cunning Hunters':
        'В фазе ближнего боя, если этот юнит находится в радиусе **[gloss:objective:цели]**, атаки ближнего боя этого юнита:\n▪ Имеют +1 **[gloss:strength:S]**.\n▪ Имеют +1 **[gloss:armour-penetration:AP]**.',
      'Old Greymanes':
        'На шаге Declare Battle Formations вы можете разделить этот юнит на два юнита с как можно более равным числом моделей в каждом (разделяя юнит таким образом, запишите, какие модели входят в каждый из двух новых юнитов).',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Bolt Carbine; 1 Bolt Pistol; 1 Chainsword.',
    options: [
      'Модели Grey Hunter Pack Leader можно заменить её Chainsword на одно из следующего: 1 Power Fist, 1 Power Weapon',
      'Модели Grey Hunter Pack Leader можно заменить её Bolt Pistol на 1 Plasma Pistol.',
    ],
  },

  'iron-priest': {
    flavor:
      'Techmarine Space Wolves — Iron Priest — хранители тайного технологического знания, которым они чинят повреждённые боевые машины Ордена и успокаивают их оскорблённые машинные духи. Прежде всего воины Фенриса, Iron Priest без колебаний обратят своё эзотерическое оружие против врага, если нужно.',
    abilities: {
      'Gift of the Iron Wolf':
        'В вашей фазе движения, в начале или в конце манёвра этого юнита, выберите не более одной дружественной модели SPACE WOLVES VEHICLE в пределах 3" от этой модели:\n▪ Та модель VEHICLE **[gloss:heal:восстанавливает]** D3 ран.\n▪ Атаки той модели VEHICLE могут игнорировать модификаторы **[gloss:hit-roll:бросков на попадание]** и **[gloss:wound-roll:бросков на ранение]** до начала вашей следующей фазы движения.\n\nВы не можете выбирать одну и ту же модель VEHICLE для этой способности более одного раза за фазу.',
      'Iron Priest':
        'Пока эта модель находится в пределах 3" от дружественного юнита SPACE WOLVES VEHICLE, эта модель имеет [core:Lone Operative].',
      'Judgement of the Omnissiah':
        'Атаки этой модели, нацеленные на вражеский юнит **[gloss:engaged:в ближнем бою]** с дружественным SPACE WOLVES VEHICLE, могут перебрасывать **[gloss:wound-roll:броски на ранение]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Helfrost Pistol; 1 Tempest Hammer and Servo-arm.',
    leader: { text: LEADER_TEXT },
  },

  'logan-grimnar': {
    aliasesRu: ['Логан Гримнар'],
    flavor:
      'Логан Гримнар — Великий Волк и Верховный Король Фенриса — один из дольше всех служащих Магистров Орденов. Ведя войну против всех, кто угрожает Space Wolves или Империуму, Гримнар харизмой и веками героических побед обессмертил себя как одного из самых прославленных воинов галактики.',
    abilities: {
      'Guile of the Wolf':
        'В начале каждой фазы **[gloss:sm-combat-doctrine:assault doctrine]**, **devastator doctrine** и **tactical doctrine** активны для этого юнита.',
      'High King of Fenris (Once per battle round, per unit)':
        'В вашей фазе движения выберите не более одного дружественного юнита SPACE WOLVES в **[gloss:strategic-reserves:стратегических резервах]**. Если вы это делаете, когда тот юнит совершает **[gloss:ingress-move:манёвр прибытия]**, считайте номер текущего раунда боя на единицу больше, чем он есть на самом деле.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Axe Morkai; 1 Storm Bolter; 1 Tyrnak and Fenrir.',
    leader: { text: LEADER_TEXT },
  },

  murderfang: {
    aliasesRu: ['Смертоклык'],
    flavor:
      'В час нужды из-под Клыка спускают неистовую механическую тварь, чьи чудовищно жестокие когти рвут врагов в кровавые клочья. Орден зовёт её Murderfang. Её истинная личность неизвестна, ибо её бессмысленные рычащие ярости лишены речи; ныне она известна лишь как сила необузданного разрушения.',
    abilities: {
      'Murder-maker':
        'В фазе ближнего боя, когда дружественная модель WULFEN в пределах 6" от этого юнита **[gloss:destroyed:уничтожена]**, если юнит той модели ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 4+ не убирайте ту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), та модель убирается с поля боя.',
      'Bestial Fury':
        'Этот юнит:\n▪ Может перебрасывать **[gloss:advance-roll:броски продвижения]**.\n▪ Может перебрасывать **[gloss:charge-roll:броски нападения]**.',
    },
    rules: {
      'Force of Untamed Destruction': 'Эта модель не может быть вашим WARLORD.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Heavy Flamer; 1 Murderclaws; 1 Storm Bolter.',
  },

  'njal-stormcaller': {
    aliasesRu: ['Ньял', 'Ньял Буревестник'],
    flavor:
      'Призывая ледяные бураны, чтобы рассеять врагов, Ньял Буревестник — стихийное средоточие псионической ярости. Он Верховный Рунный Жрец Space Wolves и владеет трещащим посохом, которым нейтрализует вражеские чары.',
    abilities: {
      'Wind Walker':
        '▪ Дальнобойные атаки этого юнита имеют [ASSAULT].\n▪ Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, этот юнит может изменить **[gloss:advance-roll:бросок продвижения]** на 6.',
      'High Rune Priest (psyker level 3)':
        'Эта модель имеет **психические способности**, перечисленные в разделе Runic Abilities.',
    },
    abilitySets: {
      'High Rune Priest (psyker level 3)': {
        options: {
          'Murderous Hurricane (psychic level 1)':
            'В вашей фазе движения, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Выберите один **[gloss:visible:видимый]** вражеский юнит в пределах 12". Тот вражеский юнит не может совершать атаки **[gloss:snap-shooting:стрельбы навскидку]**.',
          'Storm Caller (psychic level 1)':
            'Когда вражеский юнит выбирает целью этот юнит, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ До конца фазы этот юнит имеет -3" к **[gloss:detection-range:радиусу обнаружения]**.',
          'Tempest\'s Wrath (psychic level 1)':
            'В вашей фазе стрельбы, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Выберите один **[gloss:visible:видимый]** вражеский юнит в пределах 18". Тот вражеский юнит **[gloss:sm-suppressed:подавлен]** до начала вашего следующего хода:\n▪ Пока юнит **подавлен**, атаки того юнита имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
        },
      },
    },
    loadout:
      '**Эта модель вооружена:** 1 Bolt Pistol; 1 Living Lightning; 1 Staff of the Stormcaller.',
    leader: { text: LEADER_TEXT },
  },

  'ragnar-blackmane': {
    aliasesRu: ['Рагнар Чёрная Грива', 'Рагнар Черногривый'],
    flavor:
      'Безмерно уверенный в себе и всегда рвущийся первым в схватку, Волчий Лорд Рагнар Чёрная Грива регулярно ведёт свою Великую Роту в сокрушительные планетарные вторжения. Уже не столь горяч, как в юности, Рагнар в берсеркерской ярости всё ещё яростный ураган насилия, а его ужасающий вой леденит кровь врагов.',
    abilities: {
      'War Howl':
        '▪ Пока эта модель присоединена к юниту BLOOD CLAWS, атаки ближнего боя этого юнита имеют +1 **[gloss:strength:S]** и [SUSTAINED HITS 1].\n▪ Пока эта модель присоединена к юниту WOLF GUARD HEADTAKERS, когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает этот юнит права **[gloss:declare-charge:объявлять нападение]**.',
      'Battle-lust':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этой модели имеют +2 **[gloss:attack-dice:A]**.',
    },
    loadout: '**Эта модель вооружена:** 1 Bolt Pistol; 1 Frostfang.',
    leader: { text: LEADER_TEXT },
  },

  'thunderwolf-cavalry': {
    flavor:
      'Thunderwolf — чудовищные одиночные альфа-хищники, и лишь самая бесстрашная элита Wolf Guard обладает властностью, чтобы верхом на них идти на войну. Когда они нападают, дробящие челюсти рвут бронеплиты, плоть и кость с дикарской свирепостью, а всадники Thunderwolf рубят врага с героической яростью.',
    abilities: {
      'Thunderous Charge':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют:\n▪ +1 **[gloss:strength:S]**.\n▪ +1 **[gloss:damage-roll:D]**.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Bolt Pistol; 1 Teeth and Claws; 1 Wolf Guard Weapon.',
    options: [
      'За каждые 3 модели в этом юните 1 модели можно заменить её Bolt Pistol на 1 Plasma Pistol.',
      'Любому числу моделей можно заменить их Bolt Pistol на 1 Boltgun и 1 Storm Shield.',
    ],
  },

  'ulrik-the-slayer': {
    aliasesRu: ['Ульрик Убийца'],
    flavor:
      'Образец мудрости и опыта, Ульрик Убийца наставил многих величайших чемпионов Space Wolves. Он Волчий Верховный Жрец, вдохновляющий всех, кто сражается рядом, своей агрессией и воинским мастерством. Обращая свой грозный взор на могучих врагов, Ульрик даёт тяжкие клятвы повергнуть их.',
    abilities: {
      'Slayer\'s Oath':
        'В начале первого раунда боя вы выбираете не более одного вражеского юнита CHARACTER/MONSTER/VEHICLE, который станет **клятвой убийцы** этого юнита:\n▪ Атаки этого юнита, нацеленные на **клятву убийцы** этого юнита, могут игнорировать модификаторы вашего юнита:\n▪ **[gloss:ballistic-skill:BS]** и **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Бросков на попадание]**.',
      Oathbound:
        '▪ Атаки ближнего боя этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**.\n▪ __Или:__ атаки ближнего боя этого юнита, нацеленные на **клятву убийцы** этого юнита, имеют +1 к **броскам на попадание** и **[gloss:wound-roll:броскам на ранение]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Artificer Crozius Arcanum; 1 Plasma Pistol.',
    leader: { text: LEADER_TEXT },
  },

  'venerable-dreadnought': {
    flavor:
      'Venerable Dreadnought — бесценные реликвии, пропитанные веками битв. Древние воины в сердце каждого из них — живые легенды Space Wolves, с мудростью, глубокой как океан, и интуицией, острой как зубы кракена. Пробуждённые от дремоты, они сражаются как владыки битвы, словно сойдя со страниц саг, чтобы убивать во имя Русса.',
    abilities: {
      'Fervour of the Ancients':
        'Дружественные юниты SPACE WOLVES в пределах 6" от этого юнита:\n▪ Имеют +1 к **[gloss:advance-roll:броскам продвижения]**.\n▪ Имеют +1 к **[gloss:charge-roll:броскам нападения]**.',
    },
    wargearAbilities: {
      'Blizzard Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**',
    },
    loadout:
      '**Эта модель вооружена:** 1 Assault Cannon; 1 Dreadnought Combat Weapon; 1 Storm Bolter.',
  },

  'wolf-guard-battle-leader': {
    flavor:
      'Все они могучие чемпионы, и Волчьи Лорды доверяют этим воинам бремя лидерства; они являют исключительный дар стратегического командования. Как члены Wolf Guard, Battle Leader имеют доступ к ряду реликтового оружия, что позволяет им вести своих воинов в схватку, как велит фенрисская традиция.',
    abilities: {
      'Tempered Ferocity':
        '▪ Атаки этого юнита имеют [SUSTAINED HITS 1].\n▪ Атаки этого юнита, нацеленные на вражеский юнит в пределах 6" от этого юнита, могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.',
      'Heroic Last Stand':
        'В фазе ближнего боя, когда эта модель **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 2+ не убирайте эту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), эта модель убирается с поля боя.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет +1 **[gloss:wounds:W]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Master-crafted Power Weapon; 1 Plasma Pistol.',
    options: [
      'Master-crafted Power Weapon этой модели можно заменить на 1 Thunder Hammer.',
      'Plasma Pistol этой модели можно заменить на 1 Storm Shield.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-headtakers': {
    flavor:
      'Долг Wolf Guard Headtakers — прорывать вражескую линию и выслеживать командиров и чемпионов. В этом деле им помогают стаи фенрисских охотничьих волков. Эти хитрые твари рассеивают вражеские построения и травят добычу Headtaker, позволяя их хозяевам сблизиться и вершить правосудие Всеотца своим мастерским оружием.',
    abilities: {
      'Let Loose the Wolves':
        'В начале шага Declare Battle Formations вы можете разделить этот юнит на два юнита: один со всеми моделями Wolf Guard Headtaker и всеми моделями **leader/support**, другой со всеми моделями Hunting Wolves — с соответствующими новыми **[gloss:starting-strength:начальными численностями]**.',
      'Hunting Hounds':
        'Пока этот юнит находится в пределах 6" от дружественной модели SPACE WOLVES CHARACTER (исключая WULFEN), если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, модели Hunting Wolf имеют +1 **[gloss:objective-control:OC]**.',
      Headhunters:
        'В начале первого раунда боя выберите не более одного вражеского юнита, который станет **добычей** этого юнита:\n▪ Атаки этого юнита, нацеленные на **добычу** этого юнита, имеют [DEVASTATING WOUNDS] и [PRECISION].\n▪ Каждый раз, когда **добыча** этого юнита **[gloss:destroyed:уничтожена]**, выберите один вражеский юнит, который станет **добычей** этого юнита.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout:
      '**Каждая модель Hunting Wolf вооружена:** 1 Teeth and Claws.\n**Каждая модель Wolf Guard Headtaker вооружена:** 1 Heavy Bolt Pistol; 1 Paired Master-crafted Power Weapons.',
    options: [
      'Любому числу моделей Wolf Guard Headtaker можно заменить их Paired Master-crafted Power Weapons на 1 Master-crafted Power Weapon и 1 Storm Shield.',
    ],
  },

  'wolf-guard-terminators': {
    flavor:
      'Wolf Guard украшают свою броню Terminator тотемами, трофеями и знаками чести, добытыми за годы битв. Они сражаются на острие штурмов, жадно ища славы, пока вражеский огонь безвредно отскакивает от их реликтовой брони, а земля дрожит под их тяжёлой поступью, когда они разят с ошеломляющим мастерством.',
    abilities: {
      'Rugged Resilience':
        'Атаки, нацеленные на этот юнит, чья **[gloss:strength:S]** больше **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет +1 **[gloss:wounds:W]**.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Master-crafted Power Weapon; 1 Storm Bolter.',
    options: [
      'Модели Wolf Guard Terminator Pack Leader можно заменить её Storm Bolter и Master-crafted Power Weapon на одно из следующего: 1 Relic Greataxe, 1 Twin Lightning Claws',
      'За каждые 5 моделей в этом юните 1 модели Wolf Guard Terminator можно заменить её Storm Bolter и Master-crafted Power Weapon на 1 Assault Cannon и 1 Power Fist.',
      'Любому числу моделей можно заменить их Storm Bolter на 1 Storm Shield.',
    ],
  },

  'wolf-priest': {
    flavor:
      'Wolf Priest — старшие мудрецы, что пекутся о духовном и телесном благополучии братьев. В бою они вдохновляют, рыча литании и отрывки из эпических саг. Облачённые в чёрное, увешанные шаманскими тотемами и в жутких шлемах из волчьих черепов, они ужасны на вид.',
    abilities: {
      'Litany of Hate': 'Атаки ближнего боя этого юнита имеют [LANCE].',
      'Healing Balms':
        'В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3+1 ран.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.',
    leader: { text: LEADER_TEXT },
  },

  'wolf-scouts': {
    flavor:
      'Wolf Scouts поручено действовать впереди основных штурмовых сил Space Wolves, проникая на вражеские позиции и захватывая или выводя из строя ключевые точки. Более чем способные действовать в одиночку долгое время, они используют хитрость и свирепость, чтобы отвлекать и изводить врага.',
    abilities: {
      'Hunting Hounds':
        'Пока этот юнит находится в пределах 6" от дружественной модели SPACE WOLVES CHARACTER (исключая WULFEN), если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, модели Hunting Wolf имеют +1 **[gloss:objective-control:OC]**.',
      'Deadly Stalkers':
        'Атаки этого юнита, нацеленные на вражеский юнит, находящийся дальше 6" от любых других вражеских юнитов, имеют +1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    wargearAbilities: {
      'Haywire Mine (Once per battle, per unit)':
        'В вашей фазе стрельбы выберите не более одного **[gloss:visible:видимого]** вражеского юнита в пределах 6" от этого юнита и бросьте один D6. На 2+:\n▪ Тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ __Или:__ если тот вражеский юнит — юнит VEHICLE, тот вражеский юнит получает 2D3 **смертельные раны**.',
    },
    loadout:
      '**Модель Wolf Scout Pack Leader вооружена:** 1 Plasma Pistol; 1 Power Weapon.\n**Каждая модель Hunting Wolf вооружена:** 1 Teeth and Claws.\n**Каждая модель Wolf Scout вооружена:** 1 Combat Knife; 1 Plasma Pistol.',
    options: [
      '1 модели Wolf Scout можно заменить её Plasma Pistol и Combat Knife на одно из следующего: 1 Bolt Pistol, 1 Runic Stave, 1 Thunderclap',
      'За каждые 12 моделей в этом юните 1 модели Wolf Scout можно заменить её Plasma Pistol на 1 Instigator Bolt Carbine.',
      '1 модель, вооружённую 1 Plasma Pistol, можно снабдить 1 Haywire Mine',
      '1 модели Wolf Scout можно заменить её Plasma Pistol на 1 Plasma Gun.',
    ],
  },

  wulfen: {
    flavor:
      'Wulfen существуют на грани постоянной берсеркерской ярости, и их леденящий вой пробуждает внутреннего зверя в сынах Русса поблизости. Wulfen — звероподобные воины, изменённые Проклятием, что таится в крови всех потомков Волчьего Короля. Это охотники, что прыгают вперёд с оскаленными клыками и растопыренными когтями, разрывая врагов с нечеловеческой скоростью.',
    abilities: {
      'Savage Frenzy':
        'Когда вражеский юнит **[gloss:engaged:в ближнем бою]** с вашим юнитом (исключая юниты MONSTER/VEHICLE) совершает **[gloss:fall-back-move:отступление]**, тот вражеский юнит обязан использовать **[gloss:desperate-escape:режим отчаянного бегства]**. Если тот вражеский юнит **[gloss:battle-shocked:в боевом шоке]**, -1 к этим **[gloss:hazard-roll:броскам на опасность]**.',
    },
    wargearAbilities: {
      'Death Totem':
        'Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.',
    },
    loadout: '**Каждая модель вооружена:** Death Totem; 1 Wulfen Weapons.',
  },

  'wulfen-dreadnought': {
    flavor:
      'Даже на грани смерти и заточённый в саркофаг Dreadnought, воин всё ещё может поддаться Проклятию Wulfen. Сочленения и сервоприводы дёргаются и содрогаются, как мышцы обезумевшего зверя, пока Wulfen Dreadnought рвётся терзать и потрошить. Из излучателей ревёт зловещий вой — его бессмысленный голод по насилию.',
    abilities: {
      'Bestial Rage':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если этот юнит потерял рану в результате этих атак, этот юнит может совершить **[gloss:surge-move:стремительный манёвр]** на расстояние до D6+1".',
      'Violent Fury':
        'Если эта модель вооружена двумя оружиями ближнего боя, атаки ближнего боя этого юнита имеют [TWIN-LINKED].',
    },
    wargearAbilities: {
      'Blizzard Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**',
    },
    loadout:
      '**Эта модель вооружена:** 1 Fenrisian Great Axe; 1 Great Wolf Claw; 1 Storm Bolter.',
    options: [
      'Storm Bolter этой модели можно заменить на 1 Heavy Flamer.',
      'Fenrisian Great Axe этой модели можно заменить на 1 Blizzard Shield.',
    ],
  },

  'wulfen-with-storm-shields': {
    flavor:
      'Столкнувшись с бронированными построениями или чудовищными ксеносами, Space Wolves могут вооружить своих воинов Wulfen thunder hammer и storm shield. Так снаряжённые, Wulfen отражают даже тяжелейший шквал огня и сближаются с добычей, обрушивая свои thunder hammer и с лёгкостью вскрывая усиленную броню.',
    abilities: {
      'Hammer Blow':
        'В фазе ближнего боя, когда этот юнит отсражался, выберите не более одного вражеского юнита MONSTER/VEHICLE, поражённого этими атаками. Если вы это делаете, тот вражеский юнит **[gloss:sm-suppressed:подавлен]** до начала вашего следующего хода:\n▪ Пока юнит **подавлен**, атаки того юнита имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
    },
    wargearAbilities: {
      'Death Totem':
        'Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Stormfrag Auto-launcher; 1 Thunder Hammer.',
    options: [
      'Любому числу моделей можно заменить их Stormfrag Auto-launcher на 1 Death Totem.',
    ],
  },

  // Warhammer Legends from the Faction Pack (EN unchanged by the 963 bump — RU kept as it was).

  'canis-wolfborn': {
    aliasesRu: ['Канис Волкорожденный', 'Канис Вольфборн', 'Канис'],
    abilities: {
      'Born of Wolves':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [SUSTAINED HITS 1].',
      'Alpha Predator':
        'Каждый раз, когда эта модель завершает манёвр нападения, выберите один вражеский юнит в дистанции ввязывания от неё и бросьте один D6: на 2–3 этот вражеский юнит получает D3 смертельные раны; на 4–5 — 3 смертельные раны; на 6 — D3+3 смертельные раны.',
    },
    loadout:
      '**Эта модель вооружена:** bolt pistol; crushing teeth and claws; Wolf claws.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  cyberwolf: {
    abilities: {
      'Alpha Hunter':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Scouts 6".',
      'Close In for the Kill':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту ниже половинной численности, прибавьте 1 к броску попадания и прибавьте 1 к броску ранения.',
    },
    rules: {
      WOLFKIN:
        'Эта модель не может быть вашим WARLORD и не может получать Enhancement.',
    },
    loadout: '**Эта модель вооружена:** teeth and claws.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'harald-deathwolf': {
    aliasesRu: ['Харальд Волк Смерти', 'Харальд Смерти-Волк', 'Харальд'],
    abilities: {
      'Lord of the Wolfkin':
        'Пока эта модель возглавляет юнит, каждый раз, когда этот юнит совершает манёвр нападения, до конца хода crushing teeth and claws моделей этого юнита имеют способность [DEVASTATING WOUNDS].',
      'Mantle of the Troll King':
        'Один раз за фазу, при разрешении атаки по этой модели, после того как вы сделали спас-бросок за эту модель, вы можете изменить характеристику Урона (Damage) этой атаки на 0.',
    },
    loadout:
      '**Эта модель вооружена:** bolt pistol; crushing teeth and claws; Glacius.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'hounds-of-morkai': {
    abilities: {
      'Morkai’s Howl':
        'В вашей фазе стрельбы вы можете выбрать один вражеский юнит в пределах 12" от этого юнита (если этот юнит возглавляет LIEUTENANT IN REIVER ARMOUR, вы можете вместо этого выбрать один вражеский юнит в пределах 18"). Этот юнит должен пройти проверку боевого шока, вычтя 1 из результата, если это юнит PSYKER. Если проверка провалена, помимо боевого шока этот юнит оглушён (Stunned) до начала вашей следующей фазы стрельбы. Пока юнит оглушён, каждый раз, когда модель этого юнита совершает Psychic Attack, вычтите 1 из броска попадания.',
    },
    rules: {
      'ATTACHED UNIT':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Reiver Squad, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout:
      '**Каждая модель вооружена:** Morkai bolt pistol; Morkai combat knife.',
    options: ['Нет.'],
  },

  'krom-dragongaze': {
    aliasesRu: ['Кром Драконий Взор', 'Кром'],
    abilities: {
      'Refuse to Accept Defeat':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания, если этот юнит ниже своей начальной численности, а также прибавьте 1 к броску ранения, если этот юнит ниже половинной численности.',
      'The Fierce Eye':
        'В вашей фазе стрельбы вы можете выбрать один вражеский юнит INFANTRY в пределах 12" от этой модели и видимый ей. Этот вражеский юнит должен пройти проверку боевого шока.',
    },
    loadout: '**Эта модель вооружена:** bolt pistol; Wyrmclaw.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'logan-grimnar-on-stormrider': {
    aliasesRu: ['Логан Гримнар', 'Гримнар на санях', 'Оседлавший Бурю'],
    abilities: {
      'High King of Fenris':
        'Один раз за битву, в вашей фазе нападения, эта модель может задействовать эту способность. Если она это делает, до конца хода вы можете перебрасывать броски нападения для юнитов ADEPTUS ASTARTES из вашей армии, и до конца хода каждый раз, когда модель ADEPTUS ASTARTES из вашей армии совершает атаку ближнего боя, вы можете перебросить бросок попадания.',
      'The Great Wolf':
        'Каждый раз, когда эта модель уничтожает вражеский юнит, вы получаете 1 CP.',
    },
    rules: {
      'LOGAN GRIMNAR':
        'Ваша армия не может включать одновременно LOGAN GRIMNAR и LOGAN GRIMNAR ON STORMRIDER.',
    },
    loadout:
      '**Эта модель вооружена:** storm bolter; the Axe Morkai; flurry of teeth and claws.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'long-fangs': {
    abilities: {
      'Fire Discipline':
        'Каждый раз, когда этот юнит остаётся неподвижным, если он включает Long Fang Pack Leader, вы можете выбрать один вражеский юнит, видимый этой модели. До конца хода каждый раз, когда модель этого юнита совершает дальнобойную атаку по этому вражескому юниту, перебросьте бросок попадания, равный 1.',
      'Armorium Cherub':
        'Один раз за битву, после броска попадания для модели этого юнита, вы можете изменить этот результат на немодифицированный 6.\n\n**Примечание разработчика:** положите рядом с юнитом жетон Armorium Cherub, убрав его, как только эта способность будет задействована.',
    },
    rules: {
      'ATTACHED UNIT':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Devastator Squad, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout:
      '**Каждая модель вооружена:** boltgun; bolt pistol; close combat weapon.',
    options: [
      'Любому числу Long Fang их boltgun можно заменить на одно из следующего:\n▪ 1 grav-cannon\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 lascannon\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon',
      'boltgun у Long Fang Pack Leader можно заменить на одно из следующего:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 meltagun\n▪ 1 plasma gun\n▪ 1 plasma pistol',
      'close combat weapon у Long Fang Pack Leader можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon',
    ],
  },

  'lukas-the-trickster': {
    aliasesRu: ['Лукас Ловкач', 'Лукас Трикстер', 'Лукас'],
    abilities: {
      'Pelt of the Doppegangrel':
        'Пока эта модель возглавляет юнит, каждый раз, когда атака нацеливается на этот юнит, вычтите 1 из броска попадания.',
      'Last Laugh':
        'Если эта модель уничтожена атакой ближнего боя, после того как атакующий юнит закончил свои атаки, бросьте один D6: на 4+ атакующий юнит получает D6 смертельных ран и оказывается в боевом шоке.',
    },
    rules: {
      'MASTER OF MISCHIEF': 'Эта модель не может быть вашим WARLORD.',
    },
    loadout:
      '**Эта модель вооружена:** plasma pistol; Claw of the Jackalwolf.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  skyclaws: {
    abilities: {
      Headstrong:
        'Вы можете перебрасывать броски нападения для этого юнита. Каждый раз, когда этот юнит совершает манёвр нападения, до конца хода каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску попадания.',
    },
    rules: {
      'ATTACHED UNIT':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Assault Intercessors with Jump Packs или Assault Squad with Jump Packs, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout:
      '**Каждая модель вооружена:** bolt pistol; Astartes chainsword.',
    options: [
      'bolt pistol у Skyclaw Pack Leader можно заменить на 1 plasma pistol.',
      'Astartes chainsword у Skyclaw Pack Leader можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
      'До 2 Skyclaw их bolt pistol и Astartes chainsword можно заменить на одно из следующего:\n▪ 1 plasma pistol и 1 Astartes chainsword\n▪ 1 flamer и 1 close combat weapon\n▪ 1 grav-gun и 1 close combat weapon\n▪ 1 meltagun и 1 close combat weapon\n▪ 1 plasma gun и 1 close combat weapon',
    ],
  },

  'stormfang-gunship': {
    abilities: {
      'Frozen Prey':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, если вражеский юнит MONSTER или VEHICLE был поражён одной или более из этих атак, совершённых helfrost destructor этой модели, до конца следующего хода вашего оппонента этот вражеский юнит заморожен (Frozen). Пока юнит заморожен, вычтите 2 из его характеристики Движения (Move) и вычтите 2 из бросков продвижения и нападения для этого юнита.',
    },
    loadout:
      '**Эта модель вооружена:** helfrost destructor; 2 skyhammer missile launchers; twin stormstrike missile launcher; armoured hull.',
    options: [
      '2 skyhammer missile launchers этой модели можно заменить на одно из следующего:\n▪ 2 twin multi-meltas\n▪ 2 twin heavy bolters',
      'twin stormstrike missile launcher этой модели можно заменить на 1 twin lascannon.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text:
        'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  stormwolf: {
    flavor:
      'Stormwolf позволяют сынам Русса нести бой врагу, где бы тот ни прятался. В их просторных отсеках стаи воинов с невероятной скоростью доставляются в самую гущу врага. Пока стаи выпрыгивают в атаку, Stormwolf заливают местность шквалом тяжёлого огня, а затем взмывают на поиски новых целей.',
    abilities: {
      'Into the Foe':
        'Если юнит высаживается из этого TRANSPORT прежде, чем он переместится, до конца хода этот юнит может нападать в ход, в который он продвигался.',
    },
    loadout:
      '**Эта модель вооружена:** 2 skyhammer missile launchers; twin helfrost cannon; twin lascannon; armoured hull.',
    options: [
      '2 skyhammer missile launchers этой модели можно заменить на одно из следующего:\n▪ 2 twin heavy bolters\n▪ 2 twin multi-meltas',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text:
        'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 16 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'wolf-guard': {
    abilities: {
      'Chosen Companions':
        'Пока модель CHARACTER возглавляет этот юнит, каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'ATTACHED UNIT':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Sternguard Veteran Squad или Vanguard Veteran Squad, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout: '**Каждая модель вооружена:** bolt pistol; heirloom weapon.',
    options: [
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 storm shield',
    ],
  },

  'wolf-guard-battle-leader-in-terminator-armour': {
    abilities: {
      'Tactical Precision':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Huskarl to the Jarl':
        'Пока эта модель присоединена к юниту, содержащему другую модель CHARACTER, все модели CHARACTER этого юнита имеют способность Feel No Pain 4+.',
    },
    wargear: {
      'Relic Shield': 'Носитель имеет характеристику Ран (Wounds) 6.',
    },
    loadout: '**Эта модель вооружена:** storm bolter; power weapon.',
    options: [
      'power weapon этой модели можно заменить на одно из следующего:\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 relic shield и 1 close combat weapon\n▪ 1 thunder hammer',
      'storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 combi-weapon',
      'storm bolter и power weapon этой модели можно заменить на 1 twin lightning claws.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-battle-leader-on-thunderwolf': {
    flavor:
      'Battle Leader — чемпионы, обладающие великой тактической проницательностью; их лорд лично отбирает их, чтобы вести собственные отряды. Самые агрессивные нередко предпочитают идти на войну верхом на Thunderwolf.',
    abilities: {
      'Tactical Precision':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Aggressive Hunter':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если модель этого юнита была уничтожена в результате этих атак, этот юнит может совершить **[gloss:surge-move:рывок]** (Surge move) до D6".',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет инвулевый спас-бросок 4+.',
    },
    loadout:
      '**Эта модель вооружена:** bolt pistol; crushing teeth and claws; relic weapon.',
    options: [
      'relic weapon этой модели можно заменить на одно из следующего:\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield и 1 close combat weapon',
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 combi-weapon\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 relic weapon\n▪ 1 thunder hammer',
      'bolt pistol и relic weapon этой модели можно заменить на 1 twin lightning claws.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-pack-leader': {
    abilities: {
      'Inspiring Leader':
        'Пока эта модель возглавляет юнит, один раз за битву, когда для этого юнита проходится проверка боевого шока, вы можете перебросить эту проверку.',
      'Pack Leader':
        'Эта модель не может быть вашим WARLORD и не может получать Enhancement.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет инвулевый спас-бросок 4+.',
    },
    loadout:
      '**Эта модель вооружена:** bolt pistol; boltgun; close combat weapon.',
    options: [
      'bolt pistol и boltgun этой модели можно заменить на два разных оружия из следующего списка:*\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* Эта модель может быть вооружена только двумя дальнобойными оружиями, если одно из них — Pistol (и только одним Pistol).',
      'bolt pistol и boltgun этой модели можно заменить на 1 twin lightning claws.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-pack-leader-in-terminator-armour': {
    flavor:
      'Те Wolf Guard, кому дарована грубая мощь брони Terminator, шагают по полю боя почти неуязвимыми чемпионами. В стаях, которые они ведут, они служат несокрушимыми наковальнями: своей устрашающей громадой они держат строй братьев по оружию и с разрушительной силой обрушивают на врага своё украшенное оружие.',
    abilities: {
      'Inspiring Leader':
        'Пока эта модель возглавляет юнит, один раз за битву, когда для этого юнита проходится проверка боевого шока, вы можете перебросить эту проверку.',
      'Pack Leader':
        'Эта модель не может быть вашим WARLORD и не может получать Enhancement.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.',
    },
    loadout: '**Эта модель вооружена:** storm bolter; power weapon.',
    options: [
      'storm bolter и power weapon этой модели можно заменить на два разных варианта из следующего списка:*\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 cyclone missile launcher и 1 storm bolter\n▪ 1 storm bolter\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield\n* Эта модель может быть вооружена только двумя дальнобойными оружиями, если одно из них — cyclone missile launcher, а другое — storm bolter или combi-weapon.',
      'storm bolter и power weapon этой модели можно заменить на 1 twin lightning claws.',
      'storm bolter этой модели можно заменить на 1 combi-weapon.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-pack-leader-with-jump-pack': {
    abilities: {
      'Inspiring Leader':
        'Пока эта модель возглавляет юнит, один раз за битву, когда для этого юнита проходится проверка боевого шока, вы можете перебросить эту проверку.',
      'Pack Leader':
        'Эта модель не может быть вашим WARLORD и не может получать Enhancement.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет инвулевый спас-бросок 4+.',
    },
    loadout: '**Эта модель вооружена:** bolt pistol; Astartes chainsword.',
    options: [
      'bolt pistol и Astartes chainsword этой модели можно заменить на два разных оружия из следующего списка:*\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* Эта модель может быть вооружена только двумя дальнобойными оружиями, если одно из них — Pistol (и только одним Pistol).',
      'bolt pistol и Astartes chainsword этой модели можно заменить на 1 twin lightning claws.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-lord-on-thunderwolf': {
    abilities: {
      'Rites of Battle':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может быть выбран целью стратагемы за 0 CP, даже если другой юнит вашей армии уже был выбран целью этой стратагемы в эту фазу.',
      'Speed of the Hunter':
        'Прибавьте 1 к броскам продвижения и нападения для юнита этой модели.',
    },
    wargear: {
      'Relic Shield': 'Носитель имеет характеристику Ран (Wounds) 7.',
    },
    loadout:
      '**Эта модель вооружена:** bolt pistol; crushing teeth and claws; relic weapon.',
    options: [
      'relic weapon этой модели можно заменить на одно из следующего:\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 relic shield и 1 close combat weapon',
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 combi-weapon\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 relic weapon\n▪ 1 thunder hammer',
      'bolt pistol и relic weapon этой модели можно заменить на 1 twin lightning claws.',
    ],
    leader: { text: LEADER_TEXT },
  },
}

// RU headers for this Chapter's own ability names (the generic Space Marines ones come from
// smNames; descriptive names only — character, unit and proprietary names stay English).
export const abilityNamesRu = {
  ...smNames,
  'Aggressive Hunter': 'Агрессивный охотник',
  'Alpha Hunter': 'Альфа-охотник',
  'Alpha Predator': 'Альфа-хищник',
  'Ancient Tactician (Once per turn, per army)': 'Древний тактик (раз за ход, на армию)',
  'Anvil of Endurance': 'Наковальня стойкости',
  'Armorium Cherub': 'Херувим арсенала',
  'Battle-lust': 'Боевое неистовство',
  'Berserk Charge': 'Берсеркерский натиск',
  'Bestial Fury': 'Звериная ярость',
  'Bestial Rage': 'Звериное буйство',
  'Blizzard Shield': 'Щит бурана',
  'Born of Wolves': 'Рождённый волками',
  'Champion of the Kingsguard': 'Чемпион Королевской гвардии',
  'Chosen Companions': 'Избранные соратники',
  'Close In for the Kill': 'Добить жертву',
  'Cunning Hunters': 'Хитрые охотники',
  'Deadly Stalkers': 'Смертоносные преследователи',
  'Death Totem': 'Тотем смерти',
  'Fervour of the Ancients': 'Пыл древних',
  'Fire Discipline': 'Огневая дисциплина',
  'Force of Untamed Destruction': 'Сила необузданного разрушения',
  'Frozen Prey': 'Замороженная добыча',
  'Gift of the Iron Wolf': 'Дар Железного Волка',
  'Guile of the Wolf': 'Волчья хитрость',
  'Hammer Blow': 'Удар молота',
  'Haywire Mine (Once per battle, per unit)': 'Хэйвайр-мина (раз за битву, на юнит)',
  'Headhunters': 'Охотники за головами',
  'Headstrong': 'Своевольные',
  'Healing Balms': 'Целебные бальзамы',
  'Heroic Last Stand': 'Героический последний бой',
  'High King of Fenris': 'Верховный Король Фенриса',
  'High King of Fenris (Once per battle round, per unit)': 'Верховный Король Фенриса (раз за раунд боя, на юнит)',
  'High Rune Priest (psyker level 3)': 'Верховный рунический жрец (псайкерский уровень 3)',
  'Hunting Hounds': 'Охотничьи гончие',
  'Huskarl to the Jarl': 'Хускарл ярла',
  'Inspiring Leader': 'Вдохновляющий вождь',
  'Into the Foe': 'На врага',
  'Iron Priest': 'Железный Жрец',
  'Judgement of the Omnissiah': 'Суд Омниссии',
  'Last Laugh': 'Последний смех',
  'Legendary Tenacity': 'Легендарная цепкость',
  'Let Loose the Wolves': 'Спустить волков',
  'Litany of Hate': 'Литания ненависти',
  'Lord of the Wolfkin': 'Владыка волчьего рода',
  'Mantle of the Troll King': 'Мантия Короля троллей',
  'MASTER OF MISCHIEF': 'Мастер проказ',
  'Morkai’s Howl': 'Вой Моркаи',
  'Murder-maker': 'Сеятель смерти',
  'Murderous Hurricane (psychic level 1)': 'Смертоносный ураган (псайкерский уровень 1)',
  'Oathbound': 'Связанный клятвой',
  'Old Greymanes': 'Старые Седогривые',
  'Pack Leader': 'Вожак стаи',
  'Pelt of the Doppegangrel': 'Шкура доппегангрела',
  'Predatory Instinct (Once per battle round, per unit)': 'Хищный инстинкт (раз за раунд боя, на юнит)',
  'Refuse to Accept Defeat': 'Не признавать поражения',
  'Relic Shield': 'Реликтовый щит',
  'Rites of Battle': 'Обряды битвы',
  'Rugged Resilience': 'Суровая стойкость',
  'Savage Frenzy': 'Дикое неистовство',
  'Slayer\'s Oath': 'Клятва Убийцы',
  'Speed of the Hunter': 'Скорость охотника',
  'Storm Caller (psychic level 1)': 'Призыватель бури (псайкерский уровень 1)',
  'Storm Shield': 'Штормовой щит',
  'Tactical Precision': 'Тактическая точность',
  'Tempered Ferocity': 'Закалённая свирепость',
  'Tempest\'s Wrath (psychic level 1)': 'Гнев бури (псайкерский уровень 1)',
  'The Fierce Eye': 'Яростный взор',
  'The Great Wolf': 'Великий Волк',
  'Thunderous Charge': 'Громовой натиск',
  'Violent Fury': 'Яростное неистовство',
  'War Howl': 'Боевой вой',
  'Wind Walker': 'Идущий по ветру',
  'WOLFKIN': 'Волчий род',
}
