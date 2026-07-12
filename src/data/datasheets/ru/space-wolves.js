// Space Wolves — русский перевод листов данных. Делят 80 листов с генерик-Space Marines
// (тот же id и EN-текст) — переиспользуются из ./space-marines.js. Здесь переведены только
// 21 лист, уникальный для Space Wolves (Blood Claws/Grey Hunters/Wulfen/Thunderwolf,
// именные герои). Конвенции те же (см. ./index.js).
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'assault-intercessor-squad',
  'assault-intercessors-with-jump-packs', 'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient',
  'bladeguard-veteran-squad', 'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour',
  'captain-in-phobos-armour', 'captain-in-terminator-armour', 'captain-with-jump-pack',
  'centurion-assault-squad', 'centurion-devastator-squad', 'chaplain', 'chaplain-in-terminator-armour',
  'chaplain-on-bike', 'chaplain-with-jump-pack', 'company-heroes', 'desolation-squad', 'dreadnought',
  'drop-pod', 'eliminator-squad', 'eradicator-squad', 'eradicator-squad-with-heavy-bolters',
  'firestrike-servo-turrets', 'gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant',
  'hammerfall-bunker', 'heavy-intercessor-squad', 'hellblaster-squad', 'impulsor', 'inceptor-squad',
  'incursor-squad', 'infernus-squad', 'infiltrator-squad', 'intercessor-squad', 'invader-atv',
  'invictor-tactical-warsuit', 'judiciar', 'land-raider', 'land-raider-crusader',
  'land-raider-redeemer', 'land-speeder', 'librarian', 'librarian-in-phobos-armour',
  'librarian-in-terminator-armour', 'lieutenant', 'lieutenant-in-phobos-armour',
  'lieutenant-in-reiver-armour', 'lieutenant-with-combi-weapon', 'outrider-squad',
  'predator-annihilator', 'predator-destructor', 'razorback', 'redemptor-dreadnought', 'reiver-squad',
  'repulsor', 'repulsor-executioner', 'rhino', 'scout-squad', 'sternguard-veteran-squad',
  'storm-speeder-hailstrike', 'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike',
  'stormhawk-interceptor', 'stormraven-gunship', 'stormtalon-gunship', 'suppressor-squad',
  'techmarine', 'terminator-assault-squad', 'terminator-squad', 'thunderhawk-gunship',
  'vanguard-veteran-squad-with-jump-packs', 'vindicator', 'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const INV4 = 'Носитель имеет инвулевый спас-бросок 4+.'
const WOUNDS_6 = 'Носитель имеет характеристику Ран (Wounds) 6.'
const WOUNDS_4 = 'Носитель имеет характеристику Ран (Wounds) 4.'
const DEATH_TOTEM = 'Каждый раз, когда носитель совершает атаку ближнего боя, перебросьте бросок попадания, равный 1.'
const LITANY_OF_HATE =
  'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску ранения.'
const HAYWIRE_MINE =
  'Один раз за битву, в начале любой фазы, вы можете выбрать один вражеский юнит в пределах 3" от носителя и бросить один D6: на 2+ этот вражеский юнит получает D3 смертельные раны, или 2D3 смертельные раны, если это юнит VEHICLE.'
// «Hunting Hounds» с разным подлежащим (модели, что получают OC 1).
const huntingHounds = (subject) =>
  `Пока этот юнит находится в пределах 6" от одной или более дружественных моделей Space Wolves Character (исключая модели Wulfen), если этот юнит не в боевом шоке, ${subject} имеют характеристику Контроля целей (OC) 1.`

export default {
  ...Object.fromEntries(SHARED.map((id) => [id, smRu[id]])),

  'arjac-rockfist': {
    flavor:
      'Арьяк Роккфист — исполинская гора мышц и молчаливая наковальня стойкости. Владея огромным Foehammer (что напоминает о его прежней роли Iron Priest кузни), Арьяк крушит врагов сокрушительной силой. Как личный чемпион Великого Волка, Арьяк блюдёт честь Ордена.',
    abilities: {
      'Anvil of Endurance':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте уничтоженную модель из игры. Уничтоженная модель может сражаться после того, как атакующий юнит закончил свои атаки, а затем убирается из игры.',
      'Champion of the Kingsguard':
        'Каждый раз, когда эта модель совершает атаку ближнего боя по юниту CHARACTER, вы можете перебросить бросок попадания и бросок ранения.',
    },
    loadout: `${EQUIP_THIS} Foehammer.`,
    leader: { text: LEADER_TEXT },
  },

  'bjorn-the-fell-handed': {
    flavor:
      'Древнейший из всех космодесантников и последний из Роты Русса, Бьорн Свирепорукий сражается тысячелетиями в саркофаге Dreadnought. Space Wolves чтят Бьорна как живую связь с их глубочайшим прошлым, пробуждая его лишь в час крайней нужды, и он всё ещё бьётся столь же яростно, как когда-то рядом с Руссом.',
    abilities: {
      'Legendary Tenacity':
        'Каждый раз, когда атака нацеливается на эту модель, если характеристика Силы (Strength) этой атаки больше характеристики Стойкости (Toughness) этой модели, вычтите 1 из броска ранения.',
      'Ancient Tactician':
        'В начале вашей фазы командования, если эта модель на поле боя, вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} assault cannon; heavy flamer; Trueclaw.`,
    options: [
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 helfrost cannon\n▪ 1 multi-melta',
    ],
  },

  'blood-claws': {
    flavor:
      'Юные и пылкие воины, полные воинственного задора, Blood Claw жаждут показать себя в свирепом бою. С неустанным пылом они бросаются очертя голову на врага, балансируя на грани между чистым героизмом и безрассудством. Многие великие саги начинаются с охот за славой Blood Claw.',
    abilities: {
      'Berserk Charge': 'Этот юнит может объявить нападение в ход, в который он продвигался.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; Astartes chainsword.`,
    options: [
      'bolt pistol у Blood Claw Pack Leader можно заменить на 1 plasma pistol.',
      'Astartes chainsword у Blood Claw Pack Leader можно заменить на 1 power weapon.',
    ],
  },

  'fenrisian-wolves': {
    flavor:
      'Среди самых свирепых и разумных хищников галактики, Fenrisian Wolves сопровождают сынов Русса в бой, следуя за ними, как стая следует за вожаком. Даже самые поджарые из них ростом с человека, но они бесшумно крадутся, прежде чем наброситься стремительным, слаженным вихрем острых как бритва зубов и когтей.',
    abilities: {
      'Predatory Instinct':
        'Один раз за ход, когда вражеский юнит завершает обычный манёвр, продвижение или отступление в пределах 9" от этого юнита, он может совершить обычный манёвр до D6".',
      'Hunting Hounds': huntingHounds('модели этого юнита'),
    },
    loadout: `${EQUIP_EVERY} teeth and claws.`,
  },

  'grey-hunters': {
    flavor:
      'С их врождённой первобытной агрессией, укрощённой (но никогда не подавленной) бессчётными победами, Grey Hunter терпеливы, хитры и гибки. Одни стаи берут и удерживают рубеж, обрушивая залпы дисциплинированного огня, другие крадутся по флангам. Когда капкан расставлен, Grey Hunter бросаются на добивание.',
    abilities: {
      'Cunning Hunters':
        'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок ранения, равный 1. Если цель находится в радиусе маркера цели, вы можете вместо этого перебросить бросок ранения.',
    },
    loadout: `${EQUIP_EVERY} bolt carbine; bolt pistol; Astartes chainsword.`,
    options: [
      'bolt carbine у Grey Hunter Pack Leader можно заменить на 1 plasma pistol.',
      'Astartes chainsword у Grey Hunter Pack Leader можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
    ],
  },

  'iron-priest': {
    flavor:
      'Techmarine Space Wolves — Iron Priest — хранители тайного технологического знания, которым они чинят повреждённые боевые машины Ордена и успокаивают их оскорблённые машинные духи. Прежде всего воины Фенриса, Iron Priest без колебаний обратят своё эзотерическое оружие против врага, если нужно.',
    abilities: {
      'Iron Priest':
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов Adeptus Astartes Vehicle, она имеет способность Lone Operative.',
      'Gift of the Iron Wolf':
        'В вашей фазе командования вы можете выбрать одну дружественную модель Adeptus Astartes Vehicle в пределах 3" от этой модели. Эта модель восстанавливает до D3 потерянных ран и, до начала вашей следующей фазы командования, выберите одно дальнобойное оружие этой модели, чтобы оно имело способность [RAPID FIRE 1]. Каждую модель можно выбрать для этой способности или для способности Blessing of the Omnissiah только один раз за ход.',
      'Judgement of the Omnissiah':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту в дистанции ввязывания одного или более дружественных юнитов Adeptus Astartes Vehicle, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} helfrost pistol; tempest hammer and servo-arm.`,
    leader: { text: LEADER_TEXT },
  },

  'logan-grimnar': {
    flavor:
      'Логан Гримнар — Великий Волк и Верховный Король Фенриса — один из дольше всех служащих Магистров Орденов. Ведя войну против всех, кто угрожает Space Wolves или Империуму, Гримнар харизмой и веками героических побед обессмертил себя как одного из самых прославленных воинов галактики.',
    abilities: {
      'High King of Fenris':
        'Один раз за раунд боя, в вашей фазе перемещения, вы можете выбрать один дружественный юнит Space Wolves, что в Резерве. Если вы это делаете, до конца фазы, для целей развёртывания этого юнита на поле боя, считайте номер текущего раунда боя на единицу большим, чем он есть.',
      'Guile of the Wolf (Aura)':
        'Каждый раз, когда ваш оппонент нацеливает стратагему на юнит из своей армии, если этот юнит находится в пределах 12" от этой модели, увеличьте стоимость этого применения этой стратагемы на 1 CP (это не складывается с любыми другими правилами, что увеличивают стоимость этой стратагемы в CP).',
    },
    special: {
      'EMBARKING WITHIN TRANSPORTS':
        'Эта модель может погружаться в дружественные модели Adeptus Astartes Transport, что могут перевозить модели Terminator. При этом она занимает место 4 моделей Infantry.',
    },
    loadout: `${EQUIP_THIS} storm bolter; Axe Morkai; Tyrnak and Fenrir.`,
    leader: { text: LEADER_TEXT },
  },

  murderfang: {
    flavor:
      'В час нужды из-под Клыка спускают неистовую механическую тварь, чьи чудовищно жестокие когти рвут врагов в кровавые клочья. Орден зовёт её Murderfang. Её истинная личность неизвестна, ибо её бессмысленные рычащие ярости лишены речи; ныне она известна лишь как сила необузданного разрушения.',
    abilities: {
      'Murder-maker (Aura)':
        'В фазе ближнего боя, каждый раз, когда атака нацеливается на дружественный юнит Wulfen в пределах 6" от этой модели, если модель этого юнита уничтожается в результате этой атаки, если эта модель ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте уничтоженную модель из игры; она может сражаться после того, как атакующий юнит закончил свои атаки, а затем убирается из игры.',
      'Bestial Fury': 'Вы можете перебрасывать броски продвижения и нападения для этой модели.',
    },
    special: {
      'FORCE OF UNTAMED DESTRUCTION': 'Эта модель не может быть вашим WARLORD.',
    },
    loadout: `${EQUIP_THIS} heavy flamer; storm bolter; Murderclaws.`,
  },

  'njal-stormcaller': {
    flavor:
      'Призывая ледяные бураны, чтобы рассеять врагов, Ньял Буревестник — стихийное средоточие псионической ярости. Он Верховный Рунный Жрец Space Wolves и владеет трещащим посохом, которым нейтрализует вражеские чары.',
    abilities: {
      'Wind Walker (Psychic)':
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [ASSAULT], и каждый раз, когда этот юнит продвигается, не делайте бросок продвижения. Вместо этого до конца фазы прибавьте 6" к характеристике Перемещения (Move) моделей этого юнита.',
      'Tempest’s Wrath (Psychic)':
        'В вашей фазе стрельбы, после того как юнит этой модели отстрелялся, выберите один вражеский юнит (исключая MONSTER и VEHICLE), поражённый одной или более из этих атак, сделанных Living Lightning этой модели. До начала вашего следующего хода этот вражеский юнит охвачен бурей. Пока юнит охвачен бурей, вычтите 6" из характеристики Дальности (Range) дальнобойного оружия моделей этого юнита (до минимума 12").',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Living Lightning; Staff of the Stormcaller.`,
    leader: { text: LEADER_TEXT },
  },

  'ragnar-blackmane': {
    flavor:
      'Безмерно уверенный в себе и всегда рвущийся первым в схватку, Волчий Лорд Рагнар Чёрная Грива регулярно ведёт свою Великую Роту в сокрушительные планетарные вторжения. Уже не столь горяч, как в юности, Рагнар в берсеркерской ярости всё ещё яростный ураган насилия, а его ужасающий вой леденит кровь врагов.',
    abilities: {
      'War Howl':
        'Пока эта модель возглавляет юнит Blood Claws, каждый раз, когда модель этого юнита совершает атаку ближнего боя, вы можете перебросить бросок ранения. Пока эта модель возглавляет юнит Wolf Guard Headtakers, этот юнит может объявить нападение в ход, в который он продвигался.',
      'Battle-lust':
        'Каждый раз, когда эта модель завершает манёвр нападения, до конца хода прибавьте 2 к характеристике Атак (Attacks) Frostfang этой модели.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Frostfang.`,
    leader: { text: LEADER_TEXT },
  },

  'thunderwolf-cavalry': {
    flavor:
      'Thunderwolf — чудовищные одиночные альфа-хищники, и лишь самая бесстрашная элита Wolf Guard обладает властностью, чтобы верхом на них идти на войну. Когда они нападают, дробящие челюсти рвут бронеплиты, плоть и кость с дикарской свирепостью, а всадники Thunderwolf рубят врага с героической яростью.',
    abilities: {
      'Thunderous Charge':
        'Каждый раз, когда модель этого юнита совершает атаку ближнего боя своим Wolf Guard weapon, если она совершила манёвр нападения в этот ход, прибавьте 1 к характеристике Урона (Damage) этой атаки.',
    },
    wargear: {
      'Storm Shield': INV4,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; teeth and claws; Wolf Guard weapon.`,
    options: [
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 storm shield',
      'За каждые 3 модели в этом юните у одной модели её bolt pistol можно заменить на 1 plasma pistol.',
    ],
  },

  'ulrik-the-slayer': {
    flavor:
      'Образец мудрости и опыта, Ульрик Убийца наставил многих величайших чемпионов Space Wolves. Он Волчий Верховный Жрец, вдохновляющий всех, кто сражается рядом, своей агрессией и воинским мастерством. Обращая свой грозный взор на могучих врагов, Ульрик даёт тяжкие клятвы повергнуть их.',
    abilities: {
      'Slayer’s Oath':
        'В начале битвы выберите одно из следующих ключевых слов как Slayer’s Oath этой модели: CHARACTER; MONSTER; VEHICLE. Когда юнит этой модели впервые уничтожает юнит с ключевым словом Slayer’s Oath этой модели, если правило вашего детачмента имеет Saga, до конца битвы юнит этой модели получает преимущества этого правила детачмента, как если бы эта Saga была завершена.',
      Oathbound:
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску попадания. Если эта атака нацелена на юнит, что имеет ключевое слово Slayer’s Oath этой модели (см. выше), также прибавьте 1 к броску ранения.',
    },
    loadout: `${EQUIP_THIS} plasma pistol; artificer crozius arcanum.`,
    leader: { text: LEADER_TEXT },
  },

  'venerable-dreadnought': {
    flavor:
      'Venerable Dreadnought — бесценные реликвии, пропитанные веками битв. Древние воины в сердце каждого из них — живые легенды Space Wolves, с мудростью, глубокой как океан, и интуицией, острой как зубы кракена. Пробуждённые от дремоты, они сражаются как владыки битвы, словно сойдя со страниц саг, чтобы убивать во имя Русса.',
    abilities: {
      'Fervour of the Ancients (Aura)':
        'Пока дружественный юнит Space Wolves находится в пределах 6" от этой модели, прибавьте 1 к броскам продвижения и нападения для этого юнита.',
    },
    wargear: {
      'Blizzard Shield': INV4,
    },
    loadout: `${EQUIP_THIS} assault cannon; storm bolter; Dreadnought combat weapon.`,
    options: [
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 helfrost cannon\n▪ 1 multi-melta',
      'storm bolter этой модели можно заменить на 1 heavy flamer.',
      'assault cannon, storm bolter и Dreadnought combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 Fenrisian greataxe, 1 blizzard shield и 1 storm bolter\n▪ 1 Fenrisian greataxe, 1 blizzard shield и 1 heavy flamer',
    ],
  },

  'wolf-guard-battle-leader': {
    flavor:
      'Все они могучие чемпионы, и Волчьи Лорды доверяют этим воинам бремя лидерства; они являют исключительный дар стратегического командования. Как члены Wolf Guard, Battle Leader имеют доступ к ряду реликтового оружия, что позволяет им вести своих воинов в схватку, как велит фенрисская традиция.',
    abilities: {
      'Tempered Ferocity':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [SUSTAINED HITS 1], и каждый раз, когда модель этого юнита совершает атаку по вражескому юниту в пределах 6", перебросьте бросок попадания, равный 1.',
      'Heroic Last Stand':
        'Если эта модель уничтожена атакой ближнего боя, если она ещё не сражалась в этой фазе, бросьте один D6: на 2+ не убирайте её из игры. Уничтоженная модель может сражаться после того, как атакующий юнит закончил свои атаки, а затем убирается из игры.',
    },
    wargear: {
      'Storm Shield': WOUNDS_6,
    },
    loadout: `${EQUIP_THIS} master-crafted power weapon; storm shield.`,
    options: [
      'master-crafted power weapon этой модели можно заменить на 1 thunder hammer.',
      'storm shield этой модели можно заменить на одно из следующего:\n▪ 1 master-crafted bolt carbine\n▪ 1 master-crafted heavy bolt pistol\n▪ 1 plasma pistol',
    ],
    leader: { text: LEADER_TEXT },
  },

  'wolf-guard-headtakers': {
    flavor:
      'Долг Wolf Guard Headtakers — прорывать вражескую линию и выслеживать командиров и чемпионов. В этом деле им помогают стаи фенрисских охотничьих волков. Эти хитрые твари рассеивают вражеские построения и травят добычу Headtaker, позволяя их хозяевам сблизиться и вершить правосудие Всеотца своим мастерским оружием.',
    abilities: {
      'Let Loose the Wolves':
        'В начале шага Declare Battle Formations разделите этот юнит на два юнита: один со всеми его моделями HEADTAKERS и один со всеми его моделями HUNTING WOLVES, с соответствующими новыми начальными численностями.',
      Headhunters:
        'В начале битвы выберите один юнит из армии вашего оппонента как добычу этого юнита. Оружие моделей HEADTAKERS этого юнита имеет способности [DEVASTATING WOUNDS] и [PRECISION] при нацеливании на его добычу. Каждый раз, когда добыча этого юнита уничтожается, выберите один новый вражеский юнит как добычу этого юнита. Эту способность можно задействовать, даже если этот юнит погружён в Transport.',
      'Hunting Hounds': huntingHounds('модели HUNTING WOLVES этого юнита'),
    },
    wargear: {
      'Storm Shield': INV4,
    },
    loadout:
      '**Каждый Wolf Guard Headtaker вооружён:** heavy bolt pistol; master-crafted power weapon; storm shield.\n\n**Каждый Hunting Wolf вооружён:** teeth and claws.',
    options: [
      'Всем моделям этого юнита их master-crafted power weapon и storm shield можно заменить на 1 paired master-crafted power weapons.',
    ],
  },

  'wolf-guard-terminators': {
    flavor:
      'Wolf Guard украшают свою броню Terminator тотемами, трофеями и знаками чести, добытыми за годы битв. Они сражаются на острие штурмов, жадно ища славы, пока вражеский огонь безвредно отскакивает от их реликтовой брони, а земля дрожит под их тяжёлой поступью, когда они разят с ошеломляющим мастерством.',
    abilities: {
      'Rugged Resilience':
        'Каждый раз, когда атака нацеливается на этот юнит, если характеристика Силы (Strength) этой атаки больше характеристики Стойкости (Toughness) этого юнита, вычтите 1 из броска ранения.',
    },
    wargear: {
      'Storm Shield': WOUNDS_4,
    },
    loadout:
      '**Wolf Guard Terminator Pack Leader вооружён:** storm bolter; master-crafted power weapon.\n\n**Каждый Wolf Guard Terminator вооружён:** storm bolter; master-crafted power weapon.',
    options: [
      'Любому числу моделей их storm bolter можно заменить на 1 storm shield.',
      'За каждые 5 моделей в этом юните 1 Wolf Guard Terminator может заменить свои storm bolter и master-crafted power weapon на 1 assault cannon и 1 powerfist.',
      'storm bolter и master-crafted power weapon у Wolf Guard Terminator Pack Leader можно заменить на одно из следующего:\n▪ 1 relic greataxe\n▪ 1 twin lightning claws',
    ],
  },

  'wolf-priest': {
    flavor:
      'Wolf Priest — старшие мудрецы, что пекутся о духовном и телесном благополучии братьев. В бою они вдохновляют, рыча литании и отрывки из эпических саг. Облачённые в чёрное, увешанные шаманскими тотемами и в жутких шлемах из волчьих черепов, они ужасны на вид.',
    abilities: {
      'Healing Balms':
        'Пока эта модель возглавляет юнит, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER) в этот юнит.',
      'Litany of Hate': LITANY_OF_HATE,
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; crozius arcanum.`,
    leader: { text: LEADER_TEXT },
  },

  'wolf-scouts': {
    flavor:
      'Wolf Scouts поручено действовать впереди основных штурмовых сил Space Wolves, проникая на вражеские позиции и захватывая или выводя из строя ключевые точки. Более чем способные действовать в одиночку долгое время, они используют хитрость и свирепость, чтобы отвлекать и изводить врага.',
    abilities: {
      'Deadly Stalkers':
        'Каждый раз, когда модель этого юнита совершает атаку по вражескому юниту, если в пределах 6" от этой цели нет других юнитов из армии вашего оппонента, прибавьте 1 к броску ранения.',
      'Hunting Hounds': huntingHounds('модели Hunting Wolves этого юнита'),
    },
    wargear: {
      'Haywire Mine': HAYWIRE_MINE,
    },
    loadout:
      '**Wolf Scout Pack Leader вооружён:** plasma pistol; power weapon.\n\n**Каждый Wolf Scout вооружён:** plasma pistol; combat blade.\n\n**Каждый Hunting Wolf вооружён:** teeth and claws.',
    options: [
      'plasma pistol у 1 Wolf Scout можно заменить на 1 plasma gun.',
      '1 Wolf Scout, вооружённого plasma pistol, можно снабдить 1 haywire mine (plasma pistol этой модели заменить нельзя).',
      'plasma pistol и combat blade у 1 Wolf Scout можно заменить на 1 bolt pistol, 1 Thunderclap и 1 runic stave.',
      'Если этот юнит содержит 12 моделей, plasma pistol у 1 Wolf Scout можно заменить на 1 instigator bolt carbine.',
    ],
  },

  wulfen: {
    flavor:
      'Wulfen существуют на грани постоянной берсеркерской ярости, и их леденящий вой пробуждает внутреннего зверя в сынах Русса поблизости. Wulfen — звероподобные воины, изменённые Проклятием, что таится в крови всех потомков Волчьего Короля. Это охотники, что прыгают вперёд с оскаленными клыками и растопыренными когтями, разрывая врагов с нечеловеческой скоростью.',
    abilities: {
      'Savage Frenzy':
        'Каждый раз, когда вражеский юнит (исключая MONSTER и VEHICLE) в дистанции ввязывания этого юнита отступает, все модели этого вражеского юнита обязаны пройти проверку Desperate Escape. При этом, если этот вражеский юнит в боевом шоке, вычтите 1 из каждой из этих проверок.',
    },
    wargear: {
      'Death Totem': DEATH_TOTEM,
    },
    loadout: `${EQUIP_EVERY} Wulfen weapons; death totem.`,
    options: [
      'Любому числу моделей их death totem можно заменить на 1 stormfrag auto-launcher.',
    ],
  },

  'wulfen-dreadnought': {
    flavor:
      'Даже на грани смерти и заточённый в саркофаг Dreadnought, воин всё ещё может поддаться Проклятию Wulfen. Сочленения и сервоприводы дёргаются и содрогаются, как мышцы обезумевшего зверя, пока Wulfen Dreadnought рвётся терзать и потрошить. Из излучателей ревёт зловещий вой — его бессмысленный голод по насилию.',
    abilities: {
      'Bestial Rage':
        'Каждый раз, когда вражеский юнит выбирается для стрельбы, после того как этот юнит отстрелялся, если эта модель потеряла одну или более ран в результате этих атак, эта модель может совершить манёвр Bestial Rage. Для этого бросьте один D6, прибавив 2 к результату: эту модель можно переместить на число дюймов до результата, но она обязана завершить манёвр как можно ближе к ближайшему вражескому юниту (исключая AIRCRAFT). При этом эту модель можно переместить в дистанцию ввязывания этого вражеского юнита. Каждая модель может совершить лишь один манёвр Bestial Rage за фазу.',
      'Violent Fury':
        'Если эта модель вооружена двумя оружиями ближнего боя, эти профили оружия имеют способность [TWIN-LINKED].',
    },
    wargear: {
      'Blizzard Shield': INV4,
    },
    loadout: `${EQUIP_THIS} storm bolter; Fenrisian greataxe; great wolf claw.`,
    options: [
      'Fenrisian greataxe или great wolf claw и storm bolter этой модели можно заменить на 1 blizzard shield и 1 heavy flamer.',
      'Если эта модель не вооружена storm bolter, её heavy flamer можно заменить на 1 storm bolter.',
    ],
  },

  'wulfen-with-storm-shields': {
    flavor:
      'Столкнувшись с бронированными построениями или чудовищными ксеносами, Space Wolves могут вооружить своих воинов Wulfen thunder hammer и storm shield. Так снаряжённые, Wulfen отражают даже тяжелейший шквал огня и сближаются с добычей, обрушивая свои thunder hammer и с лёгкостью вскрывая усиленную броню.',
    abilities: {
      'Hammer Blow':
        'В фазе ближнего боя, после того как этот юнит отсражался, выберите один вражеский юнит MONSTER или VEHICLE, поражённый одной или более из этих атак. До конца следующего хода этот вражеский юнит подавлен. Пока юнит подавлен, каждый раз, когда его модель совершает атаку, вычтите 1 из броска попадания.',
    },
    wargear: {
      'Death Totem': DEATH_TOTEM,
    },
    loadout: `${EQUIP_EVERY} thunder hammer; death totem.`,
    options: [
      'Любому числу моделей их death totem можно заменить на 1 stormfrag auto-launcher.',
    ],
  },
}

export const abilityNamesRu = {
  ...smNames,
  'Anvil of Endurance': 'Наковальня стойкости',
  'Champion of the Kingsguard': 'Чемпион Королевской гвардии',
  'Legendary Tenacity': 'Легендарная цепкость',
  'Ancient Tactician': 'Древний тактик',
  'Berserk Charge': 'Берсеркерский натиск',
  'Predatory Instinct': 'Хищный инстинкт',
  'Hunting Hounds': 'Охотничьи гончие',
  'Cunning Hunters': 'Хитрые охотники',
  'Iron Priest': 'Железный Жрец',
  'Gift of the Iron Wolf': 'Дар Железного Волка',
  'Judgement of the Omnissiah': 'Суд Омниссии',
  'High King of Fenris': 'Верховный Король Фенриса',
  'Guile of the Wolf (Aura)': 'Волчья хитрость (Аура)',
  'Murder-maker (Aura)': 'Сеятель смерти (Аура)',
  'Bestial Fury': 'Звериная ярость',
  'Wind Walker (Psychic)': 'Идущий по ветру (Психика)',
  'Tempest’s Wrath (Psychic)': 'Гнев бури (Психика)',
  'War Howl': 'Боевой вой',
  'Battle-lust': 'Боевое неистовство',
  'Thunderous Charge': 'Громовой натиск',
  'Slayer’s Oath': 'Клятва Убийцы',
  Oathbound: 'Связанный клятвой',
  'Fervour of the Ancients (Aura)': 'Пыл древних (Аура)',
  'Blizzard Shield': 'Щит бурана',
  'Tempered Ferocity': 'Закалённая свирепость',
  'Heroic Last Stand': 'Героический последний бой',
  'Let Loose the Wolves': 'Спустить волков',
  Headhunters: 'Охотники за головами',
  'Rugged Resilience': 'Суровая стойкость',
  'Healing Balms': 'Целебные бальзамы',
  'Deadly Stalkers': 'Смертоносные преследователи',
  'Savage Frenzy': 'Дикое неистовство',
  'Death Totem': 'Тотем смерти',
  'Bestial Rage': 'Звериное буйство',
  'Violent Fury': 'Яростное неистовство',
  'Hammer Blow': 'Удар молота',
}
