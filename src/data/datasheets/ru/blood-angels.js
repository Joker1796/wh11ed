// Blood Angels — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
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
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'apothecary',
  'apothecary-biologis', 'assault-intercessor-squad', 'assault-intercessors-with-jump-packs',
  'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient', 'bladeguard-veteran-squad',
  'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour', 'captain-in-phobos-armour',
  'captain-in-terminator-armour', 'captain-on-bike', 'captain-with-jump-pack',
  'centurion-assault-squad', 'centurion-devastator-squad', 'cerberus', 'chaplain',
  'chaplain-in-terminator-armour', 'chaplain-on-bike', 'chaplain-with-jump-pack',
  'company-heroes', 'desolation-squad', 'dreadnought', 'drop-pod', 'eliminator-squad',
  'eradicator-squad-with-heavy-bolters', 'eradicator-squad-with-melta-rifles', 'falchion',
  'firestrike-servo-turrets', 'gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant',
  'hammerfall-bunker', 'heavy-intercessor-squad', 'hellblaster-squad', 'impulsor',
  'inceptor-squad', 'incursor-squad', 'infernus-squad', 'infiltrator-squad', 'intercessor-squad',
  'invader-atvs', 'invictor-tactical-warsuit', 'judiciar', 'kratos', 'land-raider',
  'land-raider-crusader', 'land-raider-excelsior', 'land-raider-redeemer', 'land-speeder',
  'librarian', 'librarian-in-phobos-armour', 'librarian-in-terminator-armour', 'lieutenant',
  'lieutenant-in-phobos-armour', 'lieutenant-with-combi-weapon', 'mastodon', 'outrider-squad',
  'predator-annihilator', 'predator-destructor', 'rapier-carrier', 'razorback',
  'redemptor-dreadnought', 'reiver-squad', 'relic-razorback', 'repulsor', 'repulsor-executioner',
  'rhino', 'rhino-primaris', 'scout-bike-squad', 'scout-squad', 'sicaran',
  'sternguard-veteran-squad', 'storm-speeder-hailstrike', 'storm-speeder-hammerstrike',
  'storm-speeder-thunderstrike', 'stormhawk-interceptor', 'stormraven-gunship',
  'stormtalon-gunship', 'tarantula-air-defence-battery', 'tarantula-sentry-battery', 'techmarine',
  'terminator-assault-squad', 'terminator-squad', 'terrax-pattern-termite', 'thunderhawk-gunship',
  'typhon', 'vanguard-veteran-squad', 'vanguard-veteran-squad-with-jump-packs',
  'venerable-dreadnought', 'vindicator', 'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'

export default {
  ...Object.fromEntries(SHARED.filter((id) => smRu[id]).map((id) => [id, smRu[id]])),

  astorath: {
    aliasesRu: ['Асторат'],
    flavor:
      'Где сыны Сангвиния на грани Чёрной Ярости — туда и идёт Асторат. Полный решимости даровать этим воинам славную последнюю победу, он сражается как одержимый, снося головы врагам, ведя за собой исходящих пеной космодесантников, охваченных безудержной яростью.',
    abilities: {
      'Mass of Doom':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют [DEVASTATING WOUNDS: non-MONSTER/VEHICLE].',
      'Redeemer of the Lost':
        'В фазе ближнего боя, когда модель этого юнита **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6, с +1 к этому броску, если та модель была **[gloss:engaged:в ближнем бою]** с вражеским юнитом, чья **[gloss:toughness:T]** больше или равна **T** этого юнита:\n▪ На 4+ не убирайте ту модель с поля боя. Когда этот юнит отсражался или в конце фазы (что наступит раньше), та модель убирается с поля боя.',
    },
    loadout: '**Эта модель вооружена:** 1 The Executioner\'s Axe.',
    leader: { text: LEADER_TEXT },
  },

  'baal-predator': {
    flavor:
      'Только у Blood Angels и их преемников есть доступ к STC, необходимому для производства Baal Predator. С ревущими двигателями эти танки способны поспевать за стремительными атаками Blood Angels или мчаться на поддержку орбитальных ударов, обрушивая при этом на врага потоки огня.',
    abilities: {
      'Overcharged Engines': 'Этот юнит может перебрасывать **[gloss:advance-roll:броски продвижения]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Tracks; 1 Twin Assault Cannon.',
    options: [
      'Эту модель можно снабдить одним из следующего: 2 Heavy Bolters, 2 Heavy Flamers',
      'Twin Assault Cannon этой модели можно заменить на 1 Baal Flamestorm Cannon.',
      'Эту модель можно снабдить 1 Storm Bolter',
      'Эту модель можно снабдить 1 Hunter-killer Missile',
    ],
  },

  'blood-angels-captain': {
    flavor:
      'Капитаны Ордена Blood Angels — могучие воины, наделённые тактическим и стратегическим гением. Верные культуре своего Ордена, они идут на войну в тонко выделанной артифисерской броне и с набором смертоносного реликтового оружия из Арсенала Ордена.',
    abilities: {
      'Finest Hour (Once per battle, per unit)':
        'В фазе ближнего боя, когда этот юнит **[gloss:selected-to-fight:выбран для боя]**, вы можете использовать эту способность. Если вы это делаете, атаки ближнего боя этой модели имеют:\n▪ +3 **[gloss:attack-dice:A]**.\n▪ [DEVASTATING WOUNDS].',
      'Strategic Acumen':
        'В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Chainsword.',
    options: [
      'Master-crafted Chainsword этой модели можно заменить на одно из следующего: 1 Power Fist, 1 Relic Weapon',
      'Heavy Bolt Pistol этой модели можно заменить на 1 Inferno Pistol.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'chief-librarian-mephiston': {
    aliasesRu: ['Мефистон'],
    flavor:
      'Мефистон — неимоверно мощный воин и псайкер. Он единственный из Blood Angels, кто, как известно, подавил Чёрную Ярость, воскреснув из состояния близкой смерти с исключительной силой, мощью и скоростью. Многие шепчутся за его спиной, спрашивая, какую цену он заплатил за такое преображение.',
    abilities: {
      'Chief Librarian (psyker level 3)':
        'Эта модель имеет **психические способности**, перечисленные в разделе Psychic Abilities.',
    },
    abilitySets: {
      'Chief Librarian (psyker level 3)': {
        options: {
          'Quickening (psychic level 1)':
            'В вашей фазе командования, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ **[gloss:sm-combat-doctrine:assault doctrine]** активна для этого юнита __в дополнение__ к любой другой **боевой доктрине** до начала вашей следующей фазы командования.',
          'Transfixing Gaze (psychic level 2)':
            'В начале фазы движения вашего оппонента, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Когда вражеский юнит в пределах 6" совершает **[gloss:fall-back-move:отступление]**, тот вражеский юнит должен совершить **[gloss:leadership-roll:бросок на лидерство]**. Если бросок провален, тот вражеский юнит должен остаться неподвижным (Основные правила, 09.04).',
        },
      },
    },
    loadout:
      '**Эта модель вооружена:** 1 Fury of the Ancients; 1 Plasma Pistol; 1 Vitarus.',
  },

  'commander-dante': {
    aliasesRu: ['Данте'],
    flavor:
      'Данте парит над полем боя, сияя в своей золотой броне, прежде чем с рёвом ринуться в кровавый бой на огненных шлейфах. Оказавшись в гуще, пронзительный взгляд его посмертной маски леденит врагов от ужаса, а безукоризненно выверенные удары Axe Mortalis повергают врага за врагом.',
    abilities: {
      'Death Mask of Sanguinius':
        'В начале фазы ближнего боя каждый вражеский юнит в пределах 6" от этой модели совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**.',
      'Warden of the Imperium Nihilus':
        '**[gloss:sm-combat-doctrine:assault doctrine]** и **tactical doctrine** активны для этого юнита __в дополнение__ к любой другой **боевой доктрине**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Perdition Pistol; 1 The Axe Mortalis.',
    leader: { text: LEADER_TEXT },
  },

  'death-company-captain': {
    flavor:
      'Никто из сынов Сангвиния не защищён от воздействия Чёрной Ярости. Если капитан поддаётся Изъяну, он облачается в чёрное и снаряжается реликтовым оружием для одной последней битвы. Наделённые силой из глубин своего безумия, Death Company Captain истребляют врагов в яростном исступлении, ища искупления в смерти.',
    abilities: {
      'Forlorn Hero': 'Этот юнит имеет [core:Scouts 6"].',
      'Black Rage':
        '▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей BLOOD ANGELS CHARACTER или не в пределах 12" от одной или более дружественных моделей CHAPLAIN, он не может совершать **[gloss:fall-back-move:отступление]**, а его **[gloss:objective-control:OC]** изменяется до 0.',
      'Death Visions of Sanguinius':
        'В фазе ближнего боя, когда вражеский юнит отсражался, если эта модель была **[gloss:destroyed:уничтожена]** этими атаками, вы можете использовать эту способность. Если вы это делаете, бросьте один D6, с +2 к этому броску, если эта модель была **[gloss:engaged:в ближнем бою]** с вражеским юнитом WARLORD:\n▪ На 2-3 тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ На 4-5 тот вражеский юнит получает 3 **смертельные раны**.\n▪ На 6+ тот вражеский юнит получает D3+3 **смертельные раны**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Chainsword.',
    options: [
      'Master-crafted Chainsword этой модели можно заменить на одно из следующего: 1 Power Fist, 1 Relic Weapon',
      'Heavy Bolt Pistol этой модели можно заменить на 1 Inferno Pistol.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'death-company-captain-with-jump-pack': {
    flavor:
      'Никто из сынов Сангвиния не защищён от воздействия Чёрной Ярости. Если капитан поддаётся Изъяну, он облачается в чёрное и снаряжается реликтовым оружием для одной последней битвы. Наделённые силой из глубин своего безумия, Death Company Captain истребляют врагов в яростном исступлении, ища искупления в смерти.',
    abilities: {
      'Death Visions of Sanguinius':
        'В фазе ближнего боя, когда вражеский юнит отсражался, если эта модель была **[gloss:destroyed:уничтожена]** этими атаками, вы можете использовать эту способность. Если вы это делаете, бросьте один D6, с +2 к этому броску, если эта модель была **[gloss:engaged:в ближнем бою]** с вражеским юнитом WARLORD:\n▪ На 2-3 тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ На 4-5 тот вражеский юнит получает 3 **смертельные раны**.\n▪ На 6+ тот вражеский юнит получает D3+3 **смертельные раны**.',
      'Lost to Fury': 'Атаки ближнего боя этого юнита имеют [SUSTAINED HITS 1].',
      'Black Rage':
        '▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей BLOOD ANGELS CHARACTER или не в пределах 12" от одной или более дружественных моделей CHAPLAIN, он не может совершать **[gloss:fall-back-move:отступление]**, а его **[gloss:objective-control:OC]** изменяется до 0.',
    },
    wargearAbilities: {
      'Relic Shield': 'Эта модель имеет +1 **[gloss:wounds:W]**.',
    },
    loadout: '**Эта модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.',
    options: [
      'Astartes Chainsword и Heavy Bolt Pistol этой модели можно заменить на 1 Thunder Hammer и 1 Relic Shield.',
      'Astartes Chainsword этой модели можно заменить на одно из следующего: 1 Power Fist, 1 Relic Weapon',
      'Astartes Chainsword и Heavy Bolt Pistol этой модели можно заменить на 1 Astartes Chainsword и 1 Relic Shield (Astartes Chainsword этой модели нельзя заменить).',
      'Heavy Bolt Pistol этой модели можно заменить на одно из следующего: 1 Hand Flamer, 1 Plasma Pistol',
    ],
    leader: { text: LEADER_TEXT },
  },

  'death-company-dreadnought': {
    flavor:
      'Даже заточения в саркофаге Dreadnought недостаточно, чтобы сдержать Чёрную Ярость. Death Company Dreadnought — словно яростные тараны, отчаянно рвущиеся врезаться во врага и разорвать его. Это мощное оружие ужаса, спущенное с поводка, чтобы причинить как можно больше урона.',
    abilities: {
      'Black Rage':
        '▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей BLOOD ANGELS CHARACTER или не в пределах 12" от одной или более дружественных моделей CHAPLAIN, он не может совершать **[gloss:fall-back-move:отступление]**, а его **[gloss:objective-control:OC]** изменяется до 0.',
      'Driven by Fury':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если по этому юниту попали этими атаками, он может совершить **[gloss:surge-move:стремительный манёвр]** на расстояние до D6+1".',
    },
    loadout:
      '**Эта модель вооружена:** 1 Blood Fist Bolt Rifles; 1 Blood Fists; 1 Twin Heavy Bolter; 1 Twin Icarus Ironhail Heavy Stubber.',
    options: [
      'Twin Heavy Bolter этой модели можно заменить на 1 Twin Multi-melta.',
      'Blood Fist Bolt Rifles и Blood Fists этой модели можно заменить на 1 Blood Talons.',
    ],
  },

  'death-company-marines': {
    flavor:
      'Члены Death Company охвачены берсеркерской яростью, доведённые до безумия страшными видениями и галлюцинациями. В бою они не ищут ничего, кроме смерти, и столь велика их свирепость, что они едва вздрагивают даже от тяжелейших ран, не думая ни о чём, кроме уничтожения врагов.',
    abilities: {
      'Black Rage':
        '▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей BLOOD ANGELS CHARACTER или не в пределах 12" от одной или более дружественных моделей CHAPLAIN, он не может совершать **[gloss:fall-back-move:отступление]**, а его **[gloss:objective-control:OC]** изменяется до 0.',
      'An Honourable Death in Combat':
        'Атаки этого юнита:\n▪ Имеют [SUSTAINED HITS 1], если этот юнит ниже **[gloss:starting-strength:начальной численности]**.\n▪ __Или:__ имеют [SUSTAINED HITS 2], если этот юнит ниже **[gloss:half-strength:половинной численности]**.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.',
    options: [
      'Любому числу моделей можно заменить их Chainsword на 1 Bolt Rifle Fire и 1 Combat Blade.',
      'За каждые 5 моделей в этом юните 1 модели можно заменить её Chainsword на 1 Eviscerator.',
      '1 модели можно заменить её Heavy Bolt Pistol на одно из следующего: 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol',
      'За каждые 5 моделей в этом юните 1 модель, вооружённую 1 Bolt Rifle, можно снабдить 1 Grenade Launcher.',
      '1 модели можно заменить её Chainsword на одно из следующего: 1 Power Fist, 1 Power Weapon, 1 Thunder Hammer',
    ],
  },

  'death-company-marines-with-jump-packs': {
    flavor:
      'Свирепость, вызванную Чёрной Яростью, нельзя исцелить — а потому её нужно использовать в полной мере. Снабжённые jump pack, Death Company Marine обретают огромную скорость и мобильность, что в союзе с их мстительной яростью делает их смертоносными ударными войсками.',
    abilities: {
      'Savage Fury': 'Этот юнит имеет +1 к **[gloss:charge-roll:броскам нападения]**.',
      'Black Rage':
        '▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Пока этот юнит не находится в пределах 6" от одной или более дружественных моделей BLOOD ANGELS CHARACTER или не в пределах 12" от одной или более дружественных моделей CHAPLAIN, он не может совершать **[gloss:fall-back-move:отступление]**, а его **[gloss:objective-control:OC]** изменяется до 0.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.',
    options: [
      'За каждые 5 моделей в этом юните 1 модели можно заменить её Chainsword на 1 Power Fist.',
      'За каждые 5 моделей в этом юните 1 модели можно заменить её Heavy Bolt Pistol на 1 Hand Flamer.',
      'За каждые 5 моделей в этом юните до 2 моделей можно заменить их Chainsword на 1 Power Weapon.',
      'За каждые 5 моделей в этом юните 1 модели можно заменить её Heavy Bolt Pistol на 1 Inferno Pistol.',
      'За каждые 5 моделей в этом юните до 2 моделей можно заменить их Heavy Bolt Pistol на 1 Plasma Pistol.',
      'За каждые 5 моделей в этом юните 1 модели можно заменить её Chainsword на 1 Eviscerator.',
    ],
  },

  lemartes: {
    aliasesRu: ['Лемартес'],
    flavor:
      'Жизнь Лемарта — непрерывная битва. Воин железной воли, он каким-то образом сохраняет ясность рассудка, хотя и поддался Чёрной Ярости. Он ведёт Death Company Blood Angels как Хранитель Потерянных, владея древним оружием, известным как Blood Crozius. Его вдохновение сделало Death Company ещё грознее.',
    abilities: {
      'Fury Unbound': 'Атаки ближнего боя этого юнита имеют [LETHAL HITS].',
      'Guardian of the Lost': 'Атаки, нацеленные на этот юнит, имеют -1 **[gloss:damage-roll:D]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 The Blood Crozius.',
    leader: { text: LEADER_TEXT },
  },

  'sanguinary-guard': {
    flavor:
      'Sanguinary Guard испытаны разумом, телом и духом так, как мало кто из их братьев. Облачённые в незаменимую золотую броню, что, как полагают, восходит к Ереси Хоруса, и вооружённые традиционным реликтовым оружием своего положения, мало кто воплощает идеал гневного ангела больше, чем они.',
    abilities: {
      'Angelic Visage':
        'Атаки ближнего боя, нацеленные на этот юнит, имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
      'Heirs of Azkaellon':
        'Атаки, нацеленные на этот юнит, чья **[gloss:strength:S]** больше **[gloss:toughness:T]** этого юнита, имеют ‑1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Angelus Boltgun; 1 Encarmine Weapon.',
    options: [
      'За каждые 3 модели в этом юните 1 модели можно заменить её Angelus Boltgun на 1 Inferno Pistol.',
    ],
  },

  'sanguinary-priest': {
    flavor:
      'Sanguinary Priest — это Apothecary Blood Angels, отвечающие как за душу Ордена, так и за его тело. Своими попечениями и церемониями они призывают Blood Angels принять Красную Жажду, обуздать её и обрушить свою ярость на врага.',
    abilities: {
      'Blood Chalice': 'Этот юнит имеет +1 **[gloss:toughness:T]**.',
      'Narthecium (Once per turn, per unit)':
        'В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3+1 ран.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Chainsword.',
    leader: { text: LEADER_TEXT },
  },

  'the-sanguinor': {
    aliasesRu: ['Сангвинор'],
    flavor:
      'Сангвинор — загадочная фигура, что сражается лишь на битвах наивысшей важности, когда нужда Blood Angels наибольшая. Он вселяет в сынов Сангвиния столько же отваги, сколько страха во врага, и проносится по полю, будто воля Сангвиния, обретшая плоть.',
    abilities: {
      'Aura of Fervour':
        'Дружественные юниты ADEPTUS ASTARTES в пределах 12" от этой модели могут перебрасывать **[gloss:leadership-roll:броски на лидерство]**.',
      'Miraculous Saviour (Once per battle, per army)':
        'В конце фазы нападения вашего оппонента (кроме первого раунда боя) выберите не более одного вражеского юнита, совершившего **[gloss:charge-move:манёвр нападения]** в этой фазе. Этот юнит может совершить **[gloss:ingress-move:манёвр прибытия]** и должен быть выставлен **[gloss:engaged:в ближнем бою]** с тем вражеским юнитом. Этот манёвр не лишает этот юнит **права двигаться**.',
    },
    loadout:
      'Модель Sanguinor\n**Эта модель вооружена:** 1 Encarmine Broadsword.',
  },

  // Warhammer Legends from the Faction Pack (EN unchanged by the 963 bump — RU kept as it was).

  'brother-corbulo': {
    aliasesRu: ['Корбуло', 'брат Корбуло'],
    flavor:
      'Сангвинарный Верховный Жрец, брат Корбуло, глубоко почитаем за преданность Ордену, благородство и дар предвидения — способность, которой, как многие верят, обладал и сам Сангвиний. На поле боя он спешит к раненым братьям, рубя любых врагов на своём пути мощными взмахами Heaven’s Teeth.',
    abilities: {
      'Sanguinary Priest':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+.',
      'The Red Grail':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Атак (Attacks) оружия ближнего боя моделей этого юнита.',
    },
    loadout: '**Эта модель вооружена:** bolt pistol; Heaven’s Teeth.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'captain-tycho': {
    aliasesRu: ['капитан Тихо', 'Тихо'],
    flavor:
      'Капитан Тихо некогда был одним из самых одарённых командиров Blood Angels, образцом всех идеалов своего Ордена. В бесчисленных битвах с орками на Армагеддоне он снискал славу и известность — и там же получил рану, навсегда изменившую его жизнь.',
    abilities: {
      'Gifted Commander':
        'Пока эта модель возглавляет юнит, каждый раз, когда этот юнит выбирается для стрельбы, выберите одну из следующих способностей, которую до конца фазы получает дальнобойное оружие моделей этого юнита:\n▪ [ASSAULT]\n▪ [HEAVY]\n▪ [RAPID FIRE 1]',
      Embittered:
        'Когда атака впервые распределяется на эту модель, после того как атакующий юнит закончил свои атаки, до конца битвы измените характеристику Атак (Attacks) Dead Man’s Hand этой модели на 12.',
    },
    rules: {
      TYCHO:
        'Ваша армия не может включать одновременно CAPTAIN TYCHO и TYCHO THE LOST.',
    },
    loadout:
      '**Эта модель вооружена:** Blood Song; bolt pistol; Dead Man’s Hand.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'death-company-dreadnought-with-magna-grapple': {
    flavor:
      'Даже заточения в саркофаге Dreadnought недостаточно, чтобы сдержать Чёрную Ярость. Death Company Dreadnought — словно яростные тараны, отчаянно рвущиеся врезаться во врага и разорвать его. Это мощное оружие ужаса, спущенное с поводка, чтобы причинить как можно больше урона.',
    abilities: {
      'Black Rage':
        'Каждый раз, когда эта модель совершает атаку, вы можете перебросить бросок попадания. Пока эта модель не находится в пределах 12" от одной или более дружественных моделей CHAPLAIN, её нельзя выбрать для отступления, а её характеристика Контроля целей (OC) равна 0.',
      'Frenzied Reprisal':
        'Один раз за ход, в фазе боя, когда вражеский юнит выбирает этот юнит целью, после того как этот юнит разрешил свои атаки, этот юнит может сражаться (даже если он уже сражался в этой фазе) и должен быть выбран для схватки следующим.',
      'Magna-grapple':
        'Прибавьте 2 к броскам нападения для этой модели, если одна или более целей этого нападения — юнит MONSTER или VEHICLE.',
    },
    wargear: {
      'Smoke Launchers':
        'Носитель теряет способность Magna-grapple и получает ключевое слово SMOKE.',
    },
    loadout:
      '**Эта модель вооружена:** meltagun; storm bolter; twin Furioso fists.',
    options: [
      'storm bolter этой модели можно заменить на 1 heavy flamer.',
      'meltagun этой модели можно заменить на 1 heavy flamer.',
      'Furioso fists этой модели можно заменить на 1 blood talons.',
      'Эту модель можно снабдить 1 smoke launchers.',
    ],
  },

  'death-company-marines-with-boltguns': {
    flavor:
      'Члены Death Company охвачены берсеркерской яростью, доведённые до безумия страшными видениями и галлюцинациями. В бою они не ищут ничего, кроме смерти, и столь велика их свирепость, что они едва вздрагивают даже от тяжелейших ран, не думая ни о чём, кроме уничтожения врагов.',
    abilities: {
      'Black Rage':
        'Каждый раз, когда модель этого юнита совершает атаку, вы можете перебросить бросок попадания. Пока этот юнит не находится в пределах 12" от одной или более дружественных моделей CHAPLAIN, его нельзя выбрать для отступления, а характеристика Контроля целей (OC) его моделей равна 0.',
      'An Honourable Death in Combat':
        'Каждый раз, когда модель этого юнита совершает атаку, эта атака имеет способность [SUSTAINED HITS 1], если этот юнит ниже своей начальной численности, или способность [SUSTAINED HITS 2], если этот юнит ниже половинной численности.',
    },
    rules: {
      'DEATH COMPANY':
        'Если модель CHAPLAIN из вашей армии со способностью Leader может быть присоединена к Tactical Squad, она может быть присоединена к этому юниту вместо этого.\n\nЕсли юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к юниту Death Company Marines, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout: '**Каждая модель вооружена:** boltgun; close combat weapon.',
    options: [
      'Любому числу моделей их boltgun и close combat weapon можно заменить на одно из следующего:\n▪ 1 Astartes chainsword и 1 bolt pistol\n▪ 1 thunder hammer',
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'Любому числу моделей их Astartes chainsword можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
    ],
  },

  'death-company-marines-with-boltguns-and-jump-packs': {
    flavor:
      'Члены Death Company охвачены берсеркерской яростью, доведённые до безумия страшными видениями и галлюцинациями. В бою они не ищут ничего, кроме смерти, и столь велика их свирепость, что они едва вздрагивают даже от тяжелейших ран, не думая ни о чём, кроме уничтожения врагов.',
    abilities: {
      'Black Rage':
        'Каждый раз, когда модель этого юнита совершает атаку, вы можете перебросить бросок попадания. Пока этот юнит не находится в пределах 12" от одной или более дружественных моделей CHAPLAIN, его нельзя выбрать для отступления, а характеристика Контроля целей (OC) его моделей равна 0.',
      'An Honourable Death in Combat':
        'Каждый раз, когда модель этого юнита совершает атаку, эта атака имеет способность [SUSTAINED HITS 1], если этот юнит ниже своей начальной численности, или способность [SUSTAINED HITS 2], если этот юнит ниже половинной численности.',
    },
    rules: {
      'DEATH COMPANY':
        'Если модель CHAPLAIN из вашей армии со способностью Leader может быть присоединена к Assault Intercessors with Jump Packs или Assault Squad with Jump Packs, она может быть присоединена к этому юниту вместо этого.\n\nЕсли юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к юниту Death Company Marines with Jump Packs, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout: '**Каждая модель вооружена:** boltgun; close combat weapon.',
    options: [
      'Любому числу моделей их boltgun и close combat weapon можно заменить на одно из следующего:\n▪ 1 Astartes chainsword и 1 bolt pistol\n▪ 1 thunder hammer',
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'Любому числу моделей их Astartes chainsword можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
    ],
  },

  'furioso-dreadnought': {
    flavor:
      'Уникальные для Ордена, Furioso часто оснащаются вооружением, какое есть только у Blood Angels, — от кромсающей пехоту heavy frag cannon до magna-grapple. Гарпуны последнего на адамантиевых цепях пробивают броню, позволяя Furioso подтягивать врагов к себе.',
    abilities: {
      'Wrathful Rampage':
        'Каждый раз, когда эта модель выбирается для схватки, вы можете выбрать один вражеский юнит в дистанции ввязывания от неё и бросить один D6, прибавив 2 к результату, если эта модель совершила манёвр нападения в этот ход: на 4–5 этот вражеский юнит получает D3 смертельные раны; на 6+ — 3 смертельные раны.',
    },
    wargear: {
      'Magna-grapple':
        'Носитель теряет ключевое слово SMOKE, но прибавьте 2 к броскам нападения для носителя, если одна или более целей этого нападения — юнит MONSTER или VEHICLE.',
    },
    loadout:
      '**Эта модель вооружена:** heavy frag cannon; Furioso fist; storm bolter.',
    options: [
      'heavy frag cannon и Furioso fist этой модели можно заменить на одно из следующего:\n▪ 1 blood talons и 1 meltagun\n▪ 1 twin Furioso fists и 1 meltagun',
      'storm bolter этой модели можно заменить на 1 heavy flamer.',
      'meltagun этой модели можно заменить на 1 heavy flamer.',
      'Эту модель можно снабдить 1 magna-grapple.',
    ],
  },

  'gabriel-seth': {
    aliasesRu: ['Габриэль Сет', 'Сет'],
    flavor:
      'Габриэль Сет — воин ужасающей ярости, бесстрашно бросающийся в самую гущу схватки вихрем бешенства и дикости. Он владеет Blood Reaver — огромным двуручным цепным мечом, которым способен разрубить даже самых чудовищных врагов.',
    abilities: {
      'Lord of Slaughter':
        'Пока эта модель возглавляет юнит, этот юнит может объявить нападение в ход, в который он продвигался.',
      'Whirlwind of Gore':
        'Каждый раз, когда эта модель сражается, до конца этой схватки прибавьте 1 к характеристике Атак (Attacks) Blood Reaver этой модели за каждые 5 вражеских моделей в пределах 6" от этой модели.',
    },
    rules: {
      'FLESH TEARERS':
        'Эта модель из Ордена Flesh Tearers, преемников Blood Angels. Для всех игровых целей она считается моделью BLOOD ANGELS, но не может быть включена в армию, включающую любые другие модели BLOOD ANGELS EPIC HERO.',
    },
    loadout: '**Эта модель вооружена:** bolt pistol; Blood Reaver.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'librarian-dreadnought': {
    flavor:
      'Связь Blood Angels с варпом столь сильна, что Librarian, заточённые в Dreadnought, сохраняют свою связь с ним. Это опасные противники — со всей адамантиевой мощью Dreadnought и способностью вскипятить кровь в жилах врага или разорвать его лучами энергии.',
    abilities: {
      'Shield of Sanguinius (Aura, Psychic)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от этой модели, модели этого юнита имеют способность Feel No Pain 5+ против смертельных ран и Psychic Attacks.',
      'Wings of Sanguinius (Psychic)':
        'Один раз за ход, в конце вашей фазы движения, один PSYKER из вашей армии с этой способностью может её задействовать. Если он это делает, бросьте один D6: на 1 этот PSYKER получает D3 смертельные раны; на 2+ выберите один дружественный юнит ADEPTUS ASTARTES INFANTRY в пределах 12" от этого PSYKER, уберите выбранный юнит с поля боя и выставьте его снова в любом месте поля боя более чем в 8" по горизонтали от всех вражеских моделей.',
    },
    loadout:
      '**Эта модель вооружена:** Blood Lance; storm bolter; Furioso fist; Furioso force halberd.',
    options: [
      'storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 heavy flamer\n▪ 1 meltagun',
    ],
  },

  'sanguinary-priest-with-jump-pack': {
    flavor:
      'Sanguinary Priest — это Apothecary Blood Angels, отвечающие как за душу Ордена, так и за его тело. Своими попечениями и церемониями они призывают Blood Angels принять Красную Жажду, обуздать её и обрушить свою ярость на врага.',
    abilities: {
      'Sanguinary Priest':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+.',
      'Blood Chalice':
        'Пока эта модель возглавляет юнит, улучшите характеристику Пробития брони (Armour Penetration) оружия ближнего боя моделей этого юнита на 1.',
    },
    loadout: '**Эта модель вооружена:** bolt pistol; Astartes chainsword.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'tycho-the-lost': {
    aliasesRu: ['Тихо Потерянный', 'Тихо'],
    flavor:
      'В Третьей войне за Армагеддон ярость наконец поглотила капитана Тихо, как поглотит она всех сынов Сангвиния, и он занял своё место в Death Company. Он косил орков очередями Blood Song и разрядами цифрового оружия, встроенного в его левую перчатку, известную как Dead Man’s Hand.',
    abilities: {
      'Forlorn Hero':
        'Пока эта модель возглавляет юнит, этот юнит может объявить нападение в ход, в который он продвигался.',
      'Black Rage':
        'Каждый раз, когда эта модель совершает атаку, вы можете перебросить бросок попадания. Пока эта модель не находится в пределах 12" от одной или более дружественных моделей CHAPLAIN, её нельзя выбрать для отступления, а её характеристика Контроля целей (OC) равна 0.',
      'Death Vision of Sanguinius':
        'Если эта модель уничтожена атакой ближнего боя, после того как атакующий юнит закончил свои атаки, вы можете бросить один D6, прибавив 2 к результату, если атакующий юнит содержит вражеского WARLORD: на 2–3 этот вражеский юнит получает 3 смертельные раны; на 4–5 — D3+3 смертельные раны; на 6+ — D6+3 смертельные раны.',
    },
    rules: {
      TYCHO:
        'Ваша армия не может включать одновременно CAPTAIN TYCHO и TYCHO THE LOST.',
    },
    loadout:
      '**Эта модель вооружена:** Blood Song; bolt pistol; Dead Man’s Hand.',
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },
}

// RU headers for this Chapter's own ability names (the generic Space Marines ones come from
// smNames; descriptive names only — character, unit and proprietary names stay English).
export const abilityNamesRu = {
  ...smNames,
  'An Honourable Death in Combat': 'Достойная смерть в бою',
  'Angelic Visage': 'Ангельский лик',
  'Aura of Fervour': 'Аура рвения',
  'Black Rage': 'Чёрная Ярость',
  'Blood Chalice': 'Чаша крови',
  'Chief Librarian (psyker level 3)': 'Главный библиотекарий (псайкерский уровень 3)',
  'DEATH COMPANY': 'Рота Смерти',
  'Death Mask of Sanguinius': 'Посмертная маска Сангвиния',
  'Death Vision of Sanguinius': 'Предсмертное видение Сангвиния',
  'Death Visions of Sanguinius': 'Смертные видения Сангвиния',
  'Driven by Fury': 'Гонимый яростью',
  'Embittered': 'Ожесточённый',
  'Finest Hour (Once per battle, per unit)': 'Звёздный час (раз за битву, на юнит)',
  'Forlorn Hero': 'Обречённый герой',
  'Frenzied Reprisal': 'Неистовое возмездие',
  'Fury Unbound': 'Ярость без оков',
  'Gifted Commander': 'Одарённый командир',
  'Guardian of the Lost': 'Хранитель потерянных',
  'Heirs of Azkaellon': 'Наследники Азкаэллона',
  'Lord of Slaughter': 'Владыка резни',
  'Lost to Fury': 'Утрачен в ярости',
  'Magna-grapple': 'Магна-захват',
  'Mass of Doom': 'Палица гибели',
  'Miraculous Saviour (Once per battle, per army)': 'Чудесный спаситель (раз за битву, на армию)',
  'Narthecium (Once per turn, per unit)': 'Нартециум (раз за ход, на юнит)',
  'Overcharged Engines': 'Форсированные двигатели',
  'Quickening (psychic level 1)': 'Ускорение (псайкерский уровень 1)',
  'Redeemer of the Lost': 'Искупитель потерянных',
  'Relic Shield': 'Реликтовый щит',
  'Sanguinary Priest': 'Кровавый жрец',
  'Savage Fury': 'Дикая ярость',
  'Shield of Sanguinius (Aura, Psychic)': 'Щит Сангвиния (Аура, Психика)',
  'Smoke Launchers': 'Дымовые пусковые установки',
  'Strategic Acumen': 'Стратегическая проницательность',
  'The Red Grail': 'Красный Грааль',
  'Transfixing Gaze (psychic level 2)': 'Сковывающий взгляд (псайкерский уровень 2)',
  'Warden of the Imperium Nihilus': 'Страж Империума Нихилус',
  'Whirlwind of Gore': 'Кровавый вихрь',
  'Wings of Sanguinius (Psychic)': 'Крылья Сангвиния (Психика)',
  'Wrathful Rampage': 'Гневное буйство',
}
