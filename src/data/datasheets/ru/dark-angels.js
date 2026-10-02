// Dark Angels — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
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

  asmodai: {
    aliasesRu: ['Асмодей'],
    flavor:
      'Асмодай — самый успешный Interrogator-Chaplain Dark Angels. Неумолимый и лишённый юмора, в бою он возносит боевой дух братьев к новым высотам, превращая их в неудержимые машины убийства, распевая свои литании ненависти с непоколебимой верой.',
    abilities: {
      'Feared Interrogator':
        'В начале фазы ближнего боя каждый вражеский юнит CHARACTER в пределах 6" от этой модели совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**.',
      'Exemplar of Hate':
        'Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Crozius Arcanum and Power Weapon; 1 Heavy Bolt Pistol.',
    leader: { text: LEADER_TEXT },
  },

  azrael: {
    aliasesRu: ['Азраэль'],
    flavor:
      'Верховный Великий магистр Азраэль — маяк вдохновения для тех, кто следует за ним, и ему воздают огромное уважение за талант стратега. Мастерский командир, он быстро схватывает меняющуюся обстановку боя и направляет свои силы с наибольшей выгодой. В гуще Азраэль обезглавливает врагов каждым ударом Sword of Secrets.',
    abilities: {
      'Masterful Tactician':
        'В вашей фазе движения выберите не более одного **[gloss:visible:видимого]** дружественного юнита ADEPTUS ASTARTES в пределах 9" от этой модели и выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**. Эта **боевая доктрина** активна для того юнита до начала вашей следующей фазы командования.',
      'Watcher in the Dark (Once per battle, per unit)':
        'В любой фазе, когда этот юнит получает **[gloss:mortal-wound:смертельную рану]**, этот юнит может призвать Watcher in the Dark. Если он это делает, этот юнит имеет [core:Feel No Pain 4+] против **смертельных ран**.',
      'Supreme Grand Master': 'Атаки этого юнита имеют [SUSTAINED HITS 1].',
    },
    wargearAbilities: {
      'The Lion Helm': 'Этот юнит имеет 4+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Lion\'s Wrath; The Lion Helm; 1 The Sword of Secrets.',
    leader: { text: LEADER_TEXT },
  },

  belial: {
    aliasesRu: ['Белиал'],
    flavor:
      'Белиал — прирождённый воин, убийца, чьё мастерство в бою всегда выделялось даже среди его постчеловеческих братьев. При всех своих способностях он стойкий перфекционист, корящий себя за каждую мнимую слабость. В бою он владеет Sword of Silence — обсидиановой реликвией Ордена, что словно поглощает окрестный звук.',
    abilities: {
      'Grand Master of the Deathwing':
        'Атаки этого юнита, нацеленные на вражеский юнит CHARACTER, имеют +1 к **[gloss:wound-roll:броскам на ранение]**.',
      'Strikes of Retribution':
        'В фазе ближнего боя, когда эта модель **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 2+ не убирайте эту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), эта модель убирается с поля боя.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Master-crafted Storm Bolter; 1 The Sword of Silence.',
    leader: { text: LEADER_TEXT },
  },

  'deathwing-knights': {
    flavor:
      'Deathwing Knights — высшие сеятели смерти Ордена, чьи удары ломают хребет врагу одним махом. Снаряжённые фамильным военным снаряжением, они телепортируются в самое сердце жесточайшего боя, ведомые Knight Master — вихрями смертоносного разрушения.',
    abilities: {
      'Inner Circle':
        '▪ Атаки, нацеленные на этот юнит, имеют -1 **[gloss:damage-roll:D]**.\n▪ Этот юнит нельзя выбрать целью **стратагемы Tactical Dreadnought Fortitude**.',
      'Teleport Homer (Once per battle, per unit)':
        'В начале битвы вы можете выставить на поле боя один жетон Teleport Homer для этого юнита. Если вы это делаете:\n▪ Когда вы выбираете этот юнит целью **стратагемы Rapid Ingress**, вы можете использовать тот жетон Teleport Homer. Если вы это делаете, это применение стоит на 1 CP меньше, но при отыгрыше этой **[gloss:stratagem:стратагемы]** этот юнит должен быть выставлен в пределах 3" от того жетона Teleport Homer и не в пределах 8" от вражеского юнита. Затем тот жетон Teleport Homer убирается с поля боя.\n▪ Если вражеский юнит завершает манёвр в пределах 1" от того жетона Teleport Homer, тот жетон Teleport Homer убирается с поля боя.',
    },
    wargearAbilities: {
      'Watcher in the Dark':
        'Один раз за битву, в любой фазе, сразу после того как смертельная рана распределена на модель **ADEPTUS ASTARTES** этого юнита, этот юнит может призвать Watcher in the Dark. Когда он это делает, до конца фазы модели этого юнита имеют способность Feel No Pain 4+ против смертельных ран.\n\n***Примечание разработчика**: положите рядом с юнитом жетон Watcher in the Dark и уберите его, когда эта способность будет использована.*',
    },
    loadout:
      '**Модель Knight Master вооружена:** 1 Great Weapon of the Unforgiven.\n**Каждая модель Deathwing Knights вооружена:** 1 Mace of Absolution.',
    options: [
      'Этот юнит можно снабдить 1 Watcher in the Dark',
      'Всем моделям Deathwing Knight этого юнита можно заменить их Mace of Absolution на 1 Power Weapon.',
      'Модели Knight Master можно заменить её Great Weapon of the Unforgiven на 1 Relic Weapon.',
    ],
  },

  'deathwing-terminator-squad': {
    flavor:
      'Стремительно развёртываясь на поле боя пылающим телепортационным ударом или в бронированном корпусе крупного транспорта, Deathwing Terminator Squad обрушивают на врага тяжёлый огонь или ввязываются с ним в жестокую схватку, дробя его thunder hammer или кромсая lightning claws.',
    abilities: {
      Deathwing:
        'Атаки этого юнита могут игнорировать модификаторы:\n▪ **[gloss:ballistic-skill:BS]** и **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Бросков на попадание]**.',
    },
    wargearAbilities: {
      'Watcher in the Dark':
        'Один раз за битву, в любой фазе, сразу после того как смертельная рана распределена на модель **ADEPTUS ASTARTES** этого юнита, этот юнит может призвать Watcher in the Dark. Когда он это делает, до конца фазы модели этого юнита имеют способность Feel No Pain 4+ против смертельных ран.\n\n***Примечание разработчика**: положите рядом с юнитом жетон Watcher in the Dark и уберите его, когда эта способность будет использована.*',
    },
    loadout: '**Каждая модель вооружена:** 1 Power Fist; 1 Storm Bolter.',
    options: [
      'Любому числу моделей Deathwing Terminator можно заменить их Power Fist на 1 Chainfist.',
      'За каждые 5 моделей в этом юните 1 модели Deathwing Terminator можно заменить её Storm Bolter на одно из следующего: 1 Assault Cannon, 1 Heavy Flamer, 1 Plasma Cannon, 1 Storm Bolter и 1 Cyclone Missile Launcher (Storm Bolter этой модели нельзя заменить)',
      'Модели Deathwing Sergeant можно заменить её Power Fist на одно из следующего: 1 Chainfist, 1 Power Weapon',
    ],
  },

  ezekiel: {
    aliasesRu: ['Иезекииль', 'Изекиль'],
    flavor:
      'Иезекииль — Великий магистр библиариев. Мастер интерромантии, его варп-шёпоты рвут рассудок врагов. Его клинок, известный как Traitor’s Bane, был выкован, чтобы разить тех, кто обратился против Императора. Это грозное force weapon, что, по слухам, навеки заточает души Падших.',
    abilities: {
      'Psychic Hood':
        'Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:psychic-attack:психических атак]** и **[gloss:mortal-wound:смертельных ран]**.',
      'Book of Salvation': 'Атаки ближнего боя этого юнита имеют +1 **[gloss:attack-dice:A]**.',
      'Chief Librarian (psyker level 3)':
        'Эта модель имеет **психические способности**, перечисленные в разделе Psychic Abilities.',
    },
    abilitySets: {
      'Chief Librarian (psyker level 3)': {
        options: {
          'Engulfing Fear (psychic level 1)':
            'В вашей фазе стрельбы, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ Выберите один вражеский юнит в пределах 12” от этой модели. Тот юнит совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**.',
          'Whispers of the Shadow Forest (psychic level 1)':
            'Когда вражеский юнит выбирает целью этот юнит, если этот юнит не **[gloss:battle-shocked:в боевом шоке]**, вы можете совершить для него **[gloss:psychic-roll:псайкерский бросок]**, бросив один D6. Если вы это делаете:\n▪ На 1 этот юнит **в боевом шоке**.\n▪ До конца фазы атаки, нацеленные на этот юнит, имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
        },
      },
    },
    loadout:
      '**Эта модель вооружена:** 1 Mind Wipe; 1 The Deliverer; 1 Traitor\'s Bane.',
    leader: { text: LEADER_TEXT },
  },

  'inner-circle-companions': {
    flavor:
      'Владея калибанскими greatsword с захватывающим дух мастерством, окутанные дымом благовоний своих жаровен суда, Inner Circle Companions прорубают багровый путь сквозь врагов. Это зловещие воины — сражаются ли они как союзник или враг, ибо бьются в тишине, если не считать воя сервоприводов их брони и хруста клинков сквозь плоть и кость.',
    abilities: {
      'Braziers of Judgement':
        '▪ Этот юнит имеет [core:Stealth].\n▪ Атаки ближнего боя, нацеленные на этот юнит, имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
      'Emnity for the Unworthy':
        'Атаки этого юнита, нацеленные на юнит CHARACTER, имеют +1 к **[gloss:hit-roll:броскам на попадание]**.',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Calibanite Greatsword; 1 Heavy Bolt Pistol.',
  },

  'land-speeder-vengeance': {
    flavor:
      'Обладая более крупным шасси и антигравитационными двигателями, Land Speeder Vengeance несёт более тяжёлое оружие, чем прочие Land Speeder, а потому оснащён plasma storm battery. В бою его экипаж применяет это мощное оружие, чтобы обрушивать сокрушительный огонь, поспевая при этом за стремительной охотой Ravenwing.',
    abilities: {
      'Storm of Vengeance (Once per turn, per unit)':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если эти атаки **[gloss:destroyed:уничтожили]** дружественный юнит DARK ANGELS в пределах 6" от этого юнита, вы можете использовать эту способность. Если вы это делаете, этот юнит стреляет по правилам **обычной стрельбы**, но при этом может выбирать целью только тот вражеский юнит.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Heavy Bolter; 1 Plasma Storm Battery.',
    options: [
      'Heavy Bolter этой модели можно заменить на 1 Assault Cannon.',
    ],
  },

  lazarus: {
    aliasesRu: ['Лазарь'],
    flavor:
      'Магистр Лазарь владеет своим мечом Enmity’s Edge со всем воинским мастерством, что подобает Company Master Dark Angels. Даже в самом свирепом бою он являет спокойствие, сохраняя самообладание и отдавая мастерские приказы, что принесли великие победы.',
    abilities: {
      'The Spiritshield Helm':
        'Этот юнит имеет [core:Feel No Pain 3+] против **[gloss:psychic-attack:психических атак]** и **[gloss:mortal-wound:смертельных ран]**.',
      'Intractable Will':
        'В фазе ближнего боя, когда модель этого юнита **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 4+ не убирайте ту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), та модель убирается с поля боя.',
    },
    loadout: '**Эта модель вооружена:** 1 Bolt Pistol; 1 Enmity\'s Edge.',
    leader: { text: LEADER_TEXT },
  },

  'lion-eljonson': {
    aliasesRu: ['Лев Эль’Джонсон', 'Лев Эльджонсон', 'Лев'],
    flavor:
      'Лев Эль’Джонсон выходит из окутанных туманом теневых царств, словно древний странствующий рыцарь, охотящийся на ужасы галактики. Огромным клинком Fealty примарх рассекает чудовищнейших из тварей, а Emperor’s Shield вспыхивает светом и силой в ответ на свирепые удары врагов.',
    abilities: {
      'The Emperor\'s Shield':
        'Атаки, нацеленные на этот юнит, чья **[gloss:strength:S]** больше **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.',
      'Dark Angels Bodyguard':
        'Пока этот юнит находится в пределах 3" от дружественного юнита DARK ANGELS INFANTRY, этот юнит имеет [core:Lone Operative].',
      'Master Strategist':
        'В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования, __в дополнение__ к любой другой **боевой доктрине**.',
      'Primarch of the First Legion':
        'В начале вашей фазы командования вы можете выбрать не более двух способностей из раздела Primarch of the First Legion. До начала вашей следующей фазы командования эта модель имеет эти способности.',
      'The Watchers':
        'Этот юнит имеет [core:Feel No Pain 4+] против **[gloss:psychic-attack:психических атак]** и **[gloss:mortal-wound:смертельных ран]**.',
    },
    rules: {
      'Supreme Commander':
        'Если эта модель в вашей армии, она должна быть вашим WARLORD.',
    },
    abilitySets: {
      'Primarch of the First Legion': {
        options: {
          'Mist-wreathed Shadow Realms':
            'В вашей фазе командования, если этот юнит **[gloss:unengaged:не в ближнем бою]**, вы можете использовать эту способность. Если вы это делаете:\n▫ Поместите этот юнит в **[gloss:strategic-reserves:стратегические резервы]**.\n▫ Этот юнит может совершить **[gloss:ingress-move:манёвр прибытия]** в вашей следующей фазе движения (в том числе в ваш первый ход).',
          'Martial Exemplar':
            'Пока дружественный юнит DARK ANGELS находится в пределах 6" от этого юнита, атаки ближнего боя того юнита могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
          'No Hiding from the Watchers':
            'Пока дружественный юнит DARK ANGELS находится в пределах 6" от этого юнита, тот юнит имеет [core:Feel No Pain 5+] против **[gloss:psychic-attack:психических атак]** и **[gloss:mortal-wound:смертельных ран]**.',
        },
      },
    },
    loadout: '**Эта модель вооружена:** 1 Arma Luminis; 1 Fealty.',
  },

  'nephilim-jetfighter': {
    flavor:
      'Обтекаемые перехватчики «воздух–воздух», Nephilim Jetfighter совершают молниеносные манёвры в скоростной войне. Эти пилоты постоянно подталкивают Techmarine к улучшениям и доработкам их машин, чтобы сделать их быстрее и смертоноснее, — и результаты оказались поистине значительными.',
    abilities: {
      'Lightning-fast Manoeuvres':
        'Дальнобойные атаки, нацеленные на этот юнит, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Avenger Mega Bolter; 1 Blacksword Missiles; 1 Twin Heavy Bolter.',
    options: [
      'Twin Heavy Bolter этой модели можно заменить на 1 Nephilim Lascannons.',
    ],
  },

  'ravenwing-black-knights': {
    flavor:
      'Ravenwing Black Knights — величайшие воины 2-й роты, элитные бойцы, что берут за образец рыцарей-охотников на чудовищ старого Калибана. Они мчатся к врагу, взмахивая своими corvus hammer с такой силой, что их шипастый конец пробивает даже толстейшую броню.',
    abilities: {
      'Knights of Caliban':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют [ANTI-MONSTER/VEHICLE 4+].',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.',
    options: [
      'За каждые 3 модели в этом юните 1 модели можно заменить её Plasma Talon на 1 Grenade Launcher.',
    ],
  },

  'ravenwing-command-squad': {
    flavor:
      'Ravenwing Command Squad мчатся в бой в самой голове охоты. С их чемпионом, готовым к дуэли за честь роты, штандартом Ancient, что развевается на ветру, словно рыцарский вымпел, и Apothecary под рукой, чтобы исцелить тяжелейшие раны, эти грозные воины помогают собратьям загонять даже опаснейшую добычу.',
    abilities: {
      Narthecium:
        'Пока этот юнит содержит RAVENWING APOTHECARY, в вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3+1 ран.',
      'Astartes Banner':
        'Пока этот юнит содержит RAVENWING ANCIENT, этот юнит имеет +1 **[gloss:objective-control:OC]**.',
      'Honour or Death':
        'Пока этот юнит содержит RAVENWING CHAMPION:\n▪ Этот юнит имеет +1 к **[gloss:advance-roll:броскам продвижения]** и **[gloss:charge-roll:броскам нападения]**.\n▪ Когда вы выбираете этот юнит целью **[gloss:heroic-intervention:стратагемы Heroic Intervention]**, это применение стоит на 1 CP меньше.',
    },
    loadout:
      '**Модель Ravenwing Ancient вооружена:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.\n**Модель Ravenwing Apothecary вооружена:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.\n**Модель Ravenwing Champion вооружена:** 1 Bolt Pistol; 1 Master-crafted Power Weapon; 1 Plasma Talon.',
    options: [
      'За каждые 3 модели в этом юните 1 модели можно заменить её Plasma Talon на 1 Grenade Launcher.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'ravenwing-dark-talon': {
    flavor:
      'Dark Talon — штурмовой летательный аппарат ближнего боя, созданный, чтобы помочь Ravenwing хватать самую упорную или докучливую добычу. В этой роли ему помогает вооружение времён Тёмной эры технологий — например, эмпирейски заряженный rift cannon и зловещая стазис-бомба, что сковывает жертв в зоне замедленного времени.',
    abilities: {
      'Stasis Bomb':
        'В конце фазы ближнего боя вашего оппонента выберите один видимый вражеский юнит (исключая юниты AIRCRAFT/[core:Lone Operative]) в пределах 24" от этого юнита. Тот вражеский юнит **замедлен** до конца следующей фазы движения вашего оппонента:\n▪ Пока юнит **замедлен**, в фазе движения вашего оппонента, когда тот юнит **[gloss:selected-to-move:выбран для движения]**, если тот юнит не **остаётся неподвижным**, бросьте один D6:\n▪ На 1-4 тот юнит получает D3 **[gloss:mortal-wound:смертельные раны]** и имеет -2” **[gloss:move-characteristic:M]**.\n▪ На 5-6 тот юнит получает 2D3 **смертельные раны** и имеет -3” **M**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 2 Hurricane Bolter; 1 Rift Cannon.',
  },

  'ravenwing-darkshroud': {
    flavor:
      'На каждом Darkshroud установлена загадочная статуя, что пережила гибель Калибана и напиталась энергиями, высвобожденными тем катаклизмом. Искусством Dark Angels эти энергии усиливаются и используются, чтобы скрыть братьев рядом с Darkshroud от взора врага.',
    abilities: {
      'Icon of Old Caliban':
        'Пока дружественный юнит DARK ANGELS находится в пределах 6" от этого юнита, тот юнит имеет [core:Stealth].',
    },
    loadout: '**Эта модель вооружена:** 1 Armoured Hull; 1 Heavy Bolter.',
    options: [
      'Heavy Bolter этой модели можно заменить на 1 Assault Cannon.',
    ],
  },

  sammael: {
    aliasesRu: ['Саммаэль'],
    flavor:
      'Саммаэль идёт на войну на джетбайке Corvex — реликвии Тёмной эры технологий. На этом древнем скакуне командир Ravenwing врывается в схватку, и storm bolter с plasma cannon наносят чудовищный урон, прежде чем он подходит для добивания с Raven Sword — фамильным клинком с бритвенной кромкой, что никогда не тупится.',
    abilities: {
      'Cut Off Their Escape':
        'Когда вражеский юнит **[gloss:engaged:в ближнем бою]** с этим юнитом (исключая юниты MONSTER/VEHICLE) совершает **[gloss:fall-back-move:отступление]**, тот вражеский юнит обязан использовать **[gloss:desperate-escape:режим отчаянного бегства]**. Если тот вражеский юнит **[gloss:battle-shocked:в боевом шоке]**, ‑1 к этим **[gloss:hazard-roll:броскам на опасность]**.',
      'Grand Master of the Ravenwing':
        '▪ Этот юнит имеет MOBILE.\n▪ В вашей фазе командования вы можете использовать эту способность. Если вы это делаете, выберите одну **[gloss:sm-combat-doctrine:боевую доктрину]**, которая будет активна для этого юнита до начала вашей следующей фазы командования.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Bolt Pistol; 1 Master-crafted Plasma Cannon; 1 The Raven Sword; 1 Twin Storm Bolter.',
    leader: { text: LEADER_TEXT },
  },

  // Warhammer Legends from the Faction Pack (EN unchanged by the 963 bump — RU kept as it was).

  'deathwing-command-squad': {
    flavor:
      'Порой отделение Deathwing формируется в почётную стражу, сопровождающую высокопоставленных членов Внутреннего круга — библиариев, дознавателей-капелланов и даже магистров рот. Вместе они ведут своих братьев прямо в сердце битвы, туда, где их умения нужнее всего.',
    abilities: {
      Narthecium:
        'Пока этот юнит содержит Apothecary, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER) в этот юнит.',
      'Astartes Banner':
        'Пока этот юнит содержит Ancient, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Honour or Death':
        'Пока этот юнит содержит Company Champion, прибавьте 1 к броскам продвижения и нападения для этого юнита. Когда вы нацеливаете стратагему Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.',
    },
    rules: {
      'ATTACHED UNIT':
        'Если юнит Character из вашей армии со способностью Leader может быть присоединён к юниту Terminator Squad, он может быть присоединён к этому юниту вместо этого.',
    },
    loadout:
      '**Deathwing Ancient вооружён:** storm bolter; power fist.\n\n**Deathwing Apothecary вооружён:** storm bolter; chainfist.\n\n**Deathwing Champion вооружён:** halberd of Caliban.\n\n**Каждый Deathwing Command Terminator вооружён:** storm bolter; power fist.',
    options: [
      'Любому числу Deathwing Command Terminator их storm bolter и power fist можно заменить на одно из следующего:\n▪ 1 twin lightning claws\n▪ 1 thunder hammer и 1 storm shield',
      'Любому числу Deathwing Command Terminator их power fist можно заменить на 1 chainfist.',
      'power fist 1 Deathwing Command Terminator можно заменить на 1 power weapon.',
      'За каждые 5 моделей в этом юните 1 Deathwing Command Terminator может заменить свой storm bolter на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 storm bolter и 1 cyclone missile launcher (storm bolter этой модели заменить нельзя)',
      'Этот юнит можно снабдить 1 Watcher in the Dark.*\n* Правила Watcher in the Dark приведены на датащите Deathwing Knights.',
    ],
  },

  'deathwing-strikemaster': {
    flavor:
      'Deathwing Strikemaster служат лейтенантами Deathwing. Чтобы заслужить столь почётный чин, они совершили деяния огромной отваги на бесчисленных полях сражений, оттачивая своё мастерство воинов и командиров. В бою они направляют братьев Deathwing с умением и гордостью, неся врагу смерть.',
    abilities: {
      'Tactical Precision':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Vanquish the Foe':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту ниже половинной численности, прибавьте 1 к броску попадания и прибавьте 1 к броску ранения.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 6.',
    },
    loadout:
      '**Эта модель вооружена:** storm bolter; master-crafted power weapon.',
    options: [
      'storm bolter и master-crafted power weapon этой модели можно заменить либо на 1 twin lightning claws, либо на два разных вида оружия из следующего списка:\n▪ 1 storm bolter\n▪ 1 chainfist\n▪ 1 mace of absolution\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield',
    ],
    leader: { text: LEADER_TEXT },
  },

  'ravenwing-talonmaster': {
    flavor:
      'Talonmaster на Land Speeder, оснащённом дополнительными ауспик-сканерами и вокс-кастерами, направляет огонь Ravenwing, и его снаряжение не даёт укрыться ни одной добыче. Он находит даже врагов, ищущих временного убежища в густой местности, и раскрывает их положение всем воинам Ravenwing.',
    abilities: {
      Talonmaster:
        'Пока эта модель находится в пределах 3" от одного или более других дружественных юнитов ADEPTUS ASTARTES MOUNTED или ADEPTUS ASTARTES FLY VEHICLE, эта модель имеет способность Lone Operative.',
      'Nowhere to Hide':
        'Пока дружественный юнит ADEPTUS ASTARTES MOUNTED или ADEPTUS ASTARTES FLY VEHICLE находится в пределах 6" от этой модели, дальнобойное оружие моделей этого юнита имеет способность [IGNORES COVER].',
      'Master of Manoeuvre':
        'В фазе движения вашего оппонента, когда вражеский юнит завершает обычный манёвр, продвижение или отступление в пределах 8" от этой модели, если эта модель не находится в дистанции ввязывания одного или более вражеских юнитов, эта модель может совершить обычный манёвр до 6".',
    },
    loadout:
      '**Эта модель вооружена:** twin assault cannon; twin heavy bolter; power weapon.',
  },
}

// RU headers for this Chapter's own ability names (the generic Space Marines ones come from
// smNames; descriptive names only — character, unit and proprietary names stay English).
export const abilityNamesRu = {
  ...smNames,
  'Astartes Banner': 'Штандарт астартес',
  'Book of Salvation': 'Книга спасения',
  'Braziers of Judgement': 'Жаровни суда',
  'Chief Librarian (psyker level 3)': 'Главный библиотекарий (псайкерский уровень 3)',
  'Cut Off Their Escape': 'Отрежь им отход',
  'Dark Angels Bodyguard': 'Телохранитель Dark Angels',
  'Deathwing': 'Deathwing',
  'Emnity for the Unworthy': 'Вражда к недостойным',
  'Engulfing Fear (psychic level 1)': 'Поглощающий страх (псайкерский уровень 1)',
  'Exemplar of Hate': 'Образец ненависти',
  'Feared Interrogator': 'Грозный дознаватель',
  'Grand Master of the Deathwing': 'Великий магистр Deathwing',
  'Grand Master of the Ravenwing': 'Великий магистр Ravenwing',
  'Honour or Death': 'Честь или смерть',
  'Icon of Old Caliban': 'Икона старого Калибана',
  'Inner Circle': 'Внутренний круг',
  'Intractable Will': 'Несгибаемая воля',
  'Knights of Caliban': 'Рыцари Калибана',
  'Lightning-fast Manoeuvres': 'Молниеносные манёвры',
  'Martial Exemplar': 'Воинский образец',
  'Master of Manoeuvre': 'Мастер манёвра',
  'Master Strategist': 'Мастер-стратег',
  'Masterful Tactician': 'Мастерский тактик',
  'Mist-wreathed Shadow Realms': 'Окутанные туманом теневые царства',
  'Narthecium': 'Нартециум',
  'No Hiding from the Watchers': 'От Стражей не укрыться',
  'Nowhere to Hide': 'Негде спрятаться',
  'Primarch of the First Legion': 'Примарх Первого легиона',
  'Psychic Hood': 'Психический капюшон',
  'Stasis Bomb': 'Стазис-бомба',
  'Storm of Vengeance (Once per turn, per unit)': 'Буря возмездия (раз за ход, на юнит)',
  'Storm Shield': 'Штормовой щит',
  'Strikes of Retribution': 'Удары возмездия',
  'Supreme Commander': 'Верховный командующий',
  'Supreme Grand Master': 'Верховный Великий магистр',
  'Tactical Precision': 'Тактическая точность',
  'Talonmaster': 'Мастер когтей',
  'Teleport Homer (Once per battle, per unit)': 'Телепорт-маяк (раз за битву, на юнит)',
  'The Emperor\'s Shield': 'Щит Императора',
  'The Lion Helm': 'Львиный шлем',
  'The Spiritshield Helm': 'Шлем духовного щита',
  'The Watchers': 'Стражи',
  'Vanquish the Foe': 'Сокруши врага',
  'Watcher in the Dark': 'Страж во тьме',
  'Watcher in the Dark (Once per battle, per unit)': 'Страж во тьме (раз за битву, на юнит)',
  'Whispers of the Shadow Forest (psychic level 1)': 'Шёпот Сумрачного леса (псайкерский уровень 1)',
}
