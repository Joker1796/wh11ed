// Blood Angels — русский перевод листов данных. Blood Angels делят 84 листа с генерик-
// Space Marines (тот же id и тот же EN-текст) — они переиспользуются напрямую из
// ./space-marines.js (DRY: правится в одном месте). Здесь переведены только 15 листов,
// уникальных для Blood Angels (Death Company, Sanguinary Guard, именные герои и т.п.).
// Конвенции те же (см. ./index.js): имена юнитов/оружия, характеристики, keywords,
// core/faction-правила, [BRACKET]-теги и ALL-CAPS-названия способностей — по-английски.
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

// Листы, идентичные генерик-Space Marines (наследуют перевод оттуда).
const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'apothecary',
  'apothecary-biologis', 'assault-intercessor-squad', 'assault-intercessors-with-jump-packs',
  'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient', 'bladeguard-veteran-squad',
  'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour', 'captain-in-phobos-armour',
  'captain-in-terminator-armour', 'captain-with-jump-pack', 'centurion-assault-squad',
  'centurion-devastator-squad', 'chaplain', 'chaplain-in-terminator-armour', 'chaplain-on-bike',
  'chaplain-with-jump-pack', 'company-heroes', 'desolation-squad', 'devastator-squad',
  'dreadnought', 'drop-pod', 'eliminator-squad', 'eradicator-squad',
  'eradicator-squad-with-heavy-bolters', 'firestrike-servo-turrets', 'gladiator-lancer',
  'gladiator-reaper', 'gladiator-valiant', 'hammerfall-bunker', 'heavy-intercessor-squad',
  'hellblaster-squad', 'impulsor', 'inceptor-squad', 'incursor-squad', 'infernus-squad',
  'infiltrator-squad', 'intercessor-squad', 'invader-atv', 'invictor-tactical-warsuit',
  'judiciar', 'land-raider', 'land-raider-crusader', 'land-raider-redeemer', 'land-speeder',
  'librarian', 'librarian-in-phobos-armour', 'librarian-in-terminator-armour', 'lieutenant',
  'lieutenant-in-phobos-armour', 'lieutenant-in-reiver-armour', 'lieutenant-with-combi-weapon',
  'outrider-squad', 'predator-annihilator', 'predator-destructor', 'razorback',
  'redemptor-dreadnought', 'reiver-squad', 'repulsor', 'repulsor-executioner', 'rhino',
  'scout-squad', 'sternguard-veteran-squad', 'storm-speeder-hailstrike',
  'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike', 'stormhawk-interceptor',
  'stormraven-gunship', 'stormtalon-gunship', 'suppressor-squad', 'tactical-squad',
  'techmarine', 'terminator-assault-squad', 'terminator-squad', 'thunderhawk-gunship',
  'vanguard-veteran-squad-with-jump-packs', 'vindicator', 'whirlwind',
]

// Общие для нескольких листов тексты.
const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const CP_REDUCE =
  'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда он выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.'
const FINEST_HOUR =
  'Один раз за битву, в начале фазы ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы прибавьте 3 к характеристике Атак (Attacks) оружия ближнего боя этой модели, и это оружие имеет способность [DEVASTATING WOUNDS].'
const BLACK_RAGE =
  'Каждый раз, когда модель этого юнита совершает атаку ближнего боя, вы можете перебросить бросок попадания. Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей Blood Angels Character или не в пределах 12" от одной или более дружественных моделей Chaplain, его нельзя выбрать для отступления, а характеристика Контроля целей (OC) его моделей равна 0.'
const DEATH_VISION =
  'Если эта модель уничтожена атакой ближнего боя, после того как атакующий юнит закончил свои атаки, вы можете бросить один D6, прибавив 2 к результату, если атакующий юнит содержит вражеского WARLORD: на 2–3 этот вражеский юнит получает D3 смертельные раны; на 4–5 — 3 смертельные раны; на 6+ — D3+3 смертельные раны.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  ...Object.fromEntries(SHARED.map((id) => [id, smRu[id]])),

  astorath: {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Асторат'],
    flavor:
      'Где сыны Сангвиния на грани Чёрной Ярости — туда и идёт Асторат. Полный решимости даровать этим воинам славную последнюю победу, он сражается как одержимый, снося головы врагам, ведя за собой исходящих пеной космодесантников, охваченных безудержной яростью.',
    abilities: {
      'Redeemer of the Lost':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6. На 4+ не убирайте её из игры; эта уничтоженная модель может сражаться после того, как юнит атакующей модели закончил свои атаки, а затем убирается из игры.',
      'Mass of Doom':
        'Каждый раз, когда юнит этой модели совершает манёвр нападения, до конца хода оружие ближнего боя моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_THIS} the Executioner’s Axe.`,
    leader: { text: LEADER_TEXT },
  },

  'baal-predator': {
    flavor:
      'Только у Blood Angels и их преемников есть доступ к STC, необходимому для производства Baal Predator. С ревущими двигателями эти танки способны поспевать за стремительными атаками Blood Angels или мчаться на поддержку орбитальных ударов, обрушивая при этом на врага потоки огня.',
    abilities: {
      'Overcharged Engines': 'Вы можете перебрасывать броски продвижения для этой модели.',
    },
    loadout: `${EQUIP_THIS} twin assault cannon; armoured tracks.`,
    options: [
      'twin assault cannon этой модели можно заменить на 1 Baal flamestorm cannon.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 heavy flamers',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'blood-angels-captain': {
    flavor:
      'Капитаны Ордена Blood Angels — могучие воины, наделённые тактическим и стратегическим гением. Верные культуре своего Ордена, они идут на войну в тонко выделанной артифисерской броне и с набором смертоносного реликтового оружия из Арсенала Ордена.',
    abilities: {
      'Rites of Battle': CP_REDUCE,
      'Finest Hour': FINEST_HOUR,
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; master-crafted chainsword.`,
    options: [
      'heavy bolt pistol этой модели можно заменить на 1 inferno pistol.',
      'master-crafted chainsword этой модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 relic weapon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'chief-librarian-mephiston': {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Мефистон'],
    flavor:
      'Мефистон — неимоверно мощный воин и псайкер. Он единственный из Blood Angels, кто, как известно, подавил Чёрную Ярость, воскреснув из состояния близкой смерти с исключительной силой, мощью и скоростью. Многие шепчутся за его спиной, спрашивая, какую цену он заплатил за такое преображение.',
    abilities: {
      'The Quickening (Psychic)':
        'Эта модель может объявить нападение в ход, в который она продвигалась.',
      'Transfixing Gaze (Aura, Psychic)':
        'Пока вражеский юнит находится в пределах 6" от этой модели, каждый раз, когда этот юнит выбирается для отступления, он обязан пройти проверку лидерства. Если эта проверка провалена, этот юнит вместо этого обязан остаться неподвижным в этой фазе.',
    },
    loadout: `${EQUIP_THIS} plasma pistol; Fury of the Ancients; Vitarus.`,
  },

  'commander-dante': {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Данте'],
    flavor:
      'Данте парит над полем боя, сияя в своей золотой броне, прежде чем с рёвом ринуться в кровавый бой на огненных шлейфах. Оказавшись в гуще, пронзительный взгляд его посмертной маски леденит врагов от ужаса, а безукоризненно выверенные удары Axe Mortalis повергают врага за врагом.',
    abilities: {
      'Warden of the Imperium Nihilus':
        'Пока эта модель возглавляет юнит, прибавьте 1 к броскам продвижения и нападения для этого юнита, и каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания.',
      'Death Mask of Sanguinius':
        'В начале фазы ближнего боя каждый вражеский юнит в пределах 6" от этой модели обязан пройти проверку боевого шока, вычтя 1 из этой проверки.',
    },
    loadout: `${EQUIP_THIS} Perdition Pistol; the Axe Mortalis.`,
    leader: { text: LEADER_TEXT },
  },

  'death-company-captain': {
    flavor:
      'Никто из сынов Сангвиния не защищён от воздействия Чёрной Ярости. Если капитан поддаётся Изъяну, он облачается в чёрное и снаряжается реликтовым оружием для одной последней битвы. Наделённые силой из глубин своего безумия, Death Company Captain истребляют врагов в яростном исступлении, ища искупления в смерти.',
    abilities: {
      'Forlorn Hero':
        'Пока эта модель возглавляет юнит, если только этот юнит не начинает битву погружённым в Transport, модели этого юнита имеют способность Scouts 6".',
      'Black Rage': BLACK_RAGE,
      'Death Vision of Sanguinius': DEATH_VISION,
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; master-crafted chainsword.`,
    options: [
      'heavy bolt pistol этой модели можно заменить на 1 inferno pistol.',
      'master-crafted chainsword этой модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 relic weapon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'death-company-captain-with-jump-pack': {
    flavor:
      'Никто из сынов Сангвиния не защищён от воздействия Чёрной Ярости. Если капитан поддаётся Изъяну, он облачается в чёрное и снаряжается реликтовым оружием для одной последней битвы. Наделённые силой из глубин своего безумия, Death Company Captain истребляют врагов в яростном исступлении, ища искупления в смерти.',
    abilities: {
      'Lost to Fury':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [SUSTAINED HITS 1].',
      'Black Rage': BLACK_RAGE,
      'Death Vision of Sanguinius': DEATH_VISION,
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'heavy bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 plasma pistol\n▪ 1 hand flamer',
      'master-crafted chainsword этой модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 relic weapon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'death-company-dreadnought': {
    flavor:
      'Даже заточения в саркофаге Dreadnought недостаточно, чтобы сдержать Чёрную Ярость. Death Company Dreadnought — словно яростные тараны, отчаянно рвущиеся врезаться во врага и разорвать его. Это мощное оружие ужаса, спущенное с поводка, чтобы причинить как можно больше урона.',
    abilities: {
      'Black Rage': BLACK_RAGE,
      'Driven by Fury':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если эта модель потеряла рану в результате этих атак, этот юнит может совершить рывок (Surge move) до D6+2".',
    },
    loadout: `${EQUIP_THIS} twin Icarus ironhail heavy stubber; twin heavy bolter; blood fist bolt rifles; blood fists.`,
    options: [
      'twin heavy bolter этой модели можно заменить на 1 twin multi-melta.',
      'blood fists и blood fist bolt rifles этой модели можно заменить на 1 blood talons.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'death-company-marines': {
    flavor:
      'Члены Death Company охвачены берсеркерской яростью, доведённые до безумия страшными видениями и галлюцинациями. В бою они не ищут ничего, кроме смерти, и столь велика их свирепость, что они едва вздрагивают даже от тяжелейших ран, не думая ни о чём, кроме уничтожения врагов.',
    abilities: {
      'Black Rage': BLACK_RAGE,
      'An Honourable Death in Combat':
        'Каждый раз, когда модель этого юнита совершает атаку, эта атака имеет способность [SUSTAINED HITS 1], если этот юнит ниже своей начальной численности, или способность [SUSTAINED HITS 2], если этот юнит ниже половинной численности.',
    },
    loadout: `${EQUIP_EVERY} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'heavy bolt pistol у 1 модели можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'За каждые 5 моделей в этом юните у 1 модели её Astartes chainsword можно заменить на 1 eviscerator.',
      'Astartes chainsword у 1 модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
    ],
  },

  'death-company-marines-with-bolt-rifles': {
    flavor:
      'Каждый Blood Angel почувствовал крушение надежд, когда первый из Primaris-космодесантников, приведённых в Орден Робаутом Жиллиманом, пал жертвой Чёрной Ярости. С великой скорбью этих братьев ввели в Death Company. Их сила в сочетании с яростью Чёрной Ярости — ужасающее зрелище.',
    abilities: {
      'Black Rage': BLACK_RAGE,
      'Visions of Heresy':
        'Этот юнит может перебрасывать броски нападения. Когда вы нацеливаете стратагему Fire Overwatch или Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; bolt rifle; close combat weapon.`,
    options: [
      'bolt rifle у 1 модели можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'За каждые 5 моделей в этом юните у 1 модели её bolt rifle и close combat weapon можно заменить на 1 eviscerator.',
      'За каждые 5 моделей в этом юните 1 модель, вооружённую bolt rifle, можно снабдить 1 Astartes grenade launcher.',
      'close combat weapon у 1 модели можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
    ],
  },

  'death-company-marines-with-jump-packs': {
    flavor:
      'Свирепость, вызванную Чёрной Яростью, нельзя исцелить — а потому её нужно использовать в полной мере. Снабжённые jump pack, Death Company Marine обретают огромную скорость и мобильность, что в союзе с их мстительной яростью делает их смертоносными ударными войсками.',
    abilities: {
      'Black Rage': BLACK_RAGE,
      'Savage Fury': 'Вы можете перебрасывать броски нападения для этого юнита.',
    },
    loadout: `${EQUIP_EVERY} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 модели её heavy bolt pistol можно заменить на 1 plasma pistol.',
      'За каждые 5 моделей в этом юните у 1 модели её Astartes chainsword можно заменить на 1 eviscerator.',
      'Astartes chainsword у 1 модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
      'За каждые 5 моделей в этом юните у 1 модели её heavy bolt pistol и Astartes chainsword можно заменить на одно из следующего:\n▪ 1 hand flamer и 1 Astartes chainsword\n▪ 1 hand flamer и 1 power fist\n▪ 1 hand flamer и 1 power weapon\n▪ 1 heavy bolt pistol и 1 power fist\n▪ 1 heavy bolt pistol и 1 power weapon\n▪ 1 inferno pistol и 1 Astartes chainsword\n▪ 1 inferno pistol и 1 power fist\n▪ 1 inferno pistol и 1 power weapon\n▪ 1 plasma pistol и 1 Astartes chainsword\n▪ 1 plasma pistol и 1 power fist\n▪ 1 plasma pistol и 1 power weapon',
    ],
  },

  lemartes: {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Лемартес'],
    flavor:
      'Жизнь Лемарта — непрерывная битва. Воин железной воли, он каким-то образом сохраняет ясность рассудка, хотя и поддался Чёрной Ярости. Он ведёт Death Company Blood Angels как Хранитель Потерянных, владея древним оружием, известным как Blood Crozius. Его вдохновение сделало Death Company ещё грознее.',
    abilities: {
      'Guardian of the Lost':
        'Пока эта модель возглавляет юнит, каждый раз, когда атака распределяется по модели этого юнита, вычтите 1 из характеристики Урона (Damage) этой атаки.',
      'Fury Unbound':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; the Blood Crozius.`,
    leader: { text: LEADER_TEXT },
  },

  'sanguinary-guard': {
    flavor:
      'Sanguinary Guard испытаны разумом, телом и духом так, как мало кто из их братьев. Облачённые в незаменимую золотую броню, что, как полагают, восходит к Ереси Хоруса, и вооружённые традиционным реликтовым оружием своего положения, мало кто воплощает идеал гневного ангела больше, чем они.',
    abilities: {
      'Angelic Visage':
        'Каждый раз, когда атака ближнего боя нацеливается на этот юнит, вычтите 1 из броска попадания.',
      'Heirs of Azkaellon':
        'Пока модель Character возглавляет этот юнит, каждый раз, когда атака ближнего боя нацеливается на этот юнит, вычтите 1 из броска ранения.',
    },
    wargear: {
      'Sanguinary Banner':
        'Прибавьте 1 к характеристике Контроля целей (OC) моделей юнита носителя.',
    },
    loadout: `${EQUIP_EVERY} Angelus boltgun; encarmine blade.`,
    options: [
      'Любому числу моделей их encarmine blade можно заменить на 1 encarmine spear.',
      'За каждые 3 модели в этом юните у 1 модели её Angelus boltgun можно заменить на 1 inferno pistol.',
      'Одну модель можно снабдить 1 Sanguinary banner.',
    ],
  },

  'sanguinary-priest': {
    flavor:
      'Sanguinary Priest — это Apothecary Blood Angels, отвечающие как за душу Ордена, так и за его тело. Своими попечениями и церемониями они призывают Blood Angels принять Красную Жажду, обуздать её и обрушить свою ярость на врага.',
    abilities: {
      'Sanguinary Priest':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+.',
      'Blood Chalice':
        'Пока эта модель возглавляет юнит, улучшите характеристику Пробития брони (Armour Penetration) оружия ближнего боя моделей этого юнита на 1.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; Astartes chainsword.`,
    leader: { text: LEADER_TEXT },
  },

  'the-sanguinor': {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Сангвинор'],
    flavor:
      'Сангвинор — загадочная фигура, что сражается лишь на битвах наивысшей важности, когда нужда Blood Angels наибольшая. Он вселяет в сынов Сангвиния столько же отваги, сколько страха во врага, и проносится по полю, будто воля Сангвиния, обретшая плоть.',
    abilities: {
      'Aura of Fervour (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от этой модели, вы можете перебрасывать проверки боевого шока и лидерства для этого юнита.',
      'Miraculous Saviour':
        '(Один раз за битву, за армию) В конце фазы нападения вашего оппонента (кроме первого раунда боя) вы можете выбрать один вражеский юнит, что совершил манёвр нападения в этой фазе. Этот юнит может совершить ingress move и обязан быть выставлен в дистанции ввязывания этого вражеского юнита. Этот манёвр не мешает этому юниту иметь право перемещаться.',
    },
    loadout: `${EQUIP_THIS} encarmine broadsword.`,
  },
}

export const abilityNamesRu = {
  ...smNames,
  'Redeemer of the Lost': 'Искупитель потерянных',
  'Mass of Doom': 'Палица гибели',
  'Overcharged Engines': 'Форсированные двигатели',
  'The Quickening (Psychic)': 'Ускорение (Психика)',
  'Transfixing Gaze (Aura, Psychic)': 'Пронзающий взгляд (Аура, Психика)',
  'Warden of the Imperium Nihilus': 'Страж Империума Нихилус',
  'Death Mask of Sanguinius': 'Посмертная маска Сангвиния',
  'Forlorn Hero': 'Обречённый герой',
  'Black Rage': 'Чёрная Ярость',
  'Death Vision of Sanguinius': 'Предсмертное видение Сангвиния',
  'Lost to Fury': 'Утрачен в ярости',
  'Driven by Fury': 'Гонимый яростью',
  'An Honourable Death in Combat': 'Достойная смерть в бою',
  'Visions of Heresy': 'Видения Ереси',
  'Savage Fury': 'Дикая ярость',
  'Guardian of the Lost': 'Хранитель потерянных',
  'Fury Unbound': 'Ярость без оков',
  'Angelic Visage': 'Ангельский лик',
  'Heirs of Azkaellon': 'Наследники Азкаэллона',
  'Sanguinary Banner': 'Штандарт Сангвиния',
  'Sanguinary Priest': 'Кровавый жрец',
  'Blood Chalice': 'Чаша крови',
  'Aura of Fervour (Aura)': 'Аура рвения (Аура)',
  'Miraculous Saviour': 'Чудесный спаситель',
}
