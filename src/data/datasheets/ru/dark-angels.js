// Dark Angels — русский перевод листов данных. Делят 84 листа с генерик-Space Marines
// (тот же id и EN-текст) — переиспользуются из ./space-marines.js. Здесь переведены только
// 19 листов, уникальных для Dark Angels (Deathwing, Ravenwing, именные герои, три Legends).
// Конвенции те же (см. ./index.js).
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

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
  // Warhammer Legends of the Space Marines pack a Chapter army may field (2026-09-20) —
  // translated once in ./space-marines.js like every other shared sheet.
  'ancient-on-bike', 'apothecary-on-bike', 'assault-squad', 'assault-squad-with-jump-packs',
  'astartes-servitors', 'attack-bike-squad', 'bike-squad', 'caestus-assault-ram',
  'captain-on-bike', 'carab-culln-the-risen', 'cerberus', 'chaplain-venerable-dreadnought',
  'command-squad', 'company-champion-on-bike', 'company-veterans-on-bikes', 'deathstorm-drop-pod',
  'deimos-predator', 'deredeo-dreadnought', 'dreadnought-drop-pod', 'falchion',
  'fellblade', 'ferren-areios', 'fire-raptor-gunship', 'hunter',
  'imperial-space-marine', 'ironclad-dreadnought', 'javelin-attack-speeder', 'kratos',
  'land-raider-achilles', 'land-raider-excelsior', 'land-raider-helios', 'land-raider-prometheus',
  'land-raider-proteus', 'land-speeder-storm', 'land-speeder-tempest', 'land-speeder-tornado',
  'land-speeder-typhoon', 'leviathan-dreadnought', 'librarian-on-bike', 'librarian-with-jump-pack',
  'mastodon', 'mortis-dreadnought', 'primaris-company-champion', 'rapier-carrier',
  'relic-contemptor-dreadnought', 'relic-razorback', 'relic-terminator-squad', 'rhino-primaris',
  'scout-bike-squad', 'scout-sniper-squad', 'sicaran-arcus', 'sicaran-battle-tank',
  'sicaran-omega', 'sicaran-punisher', 'sicaran-venator', 'sokar-pattern-stormbird',
  'spartan', 'stalker', 'storm-eagle-gunship', 'tarantula-air-defence-battery',
  'tarantula-sentry-battery', 'techmarine-on-bike', 'terminus-ultra', 'terrax-pattern-termite',
  'thunderfire-cannon', 'thunderhawk-transporter', 'typhon', 'vanguard-veteran-squad',
  'venerable-dreadnought', 'vindicator-laser-destroyer', 'whirlwind-scorpius', 'xiphon-interceptor',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const FNP4_PSYCHIC =
  'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks.'
const TELEPORT_HOMER =
  'В начале битвы вы можете поставить один жетон Teleport Homer для этого юнита где угодно на поле боя вне зоны развёртывания вашего оппонента. Если вы это делаете, один раз за битву вы можете нацелить на этот юнит стратагему Rapid Ingress за 0 CP, но при отыгрыше этой стратагемы вы обязаны развернуть этот юнит в пределах 3" по горизонтали от этого жетона и не в пределах 8" по горизонтали от любых вражеских моделей. Затем этот жетон убирается.'
const WATCHER_IN_DARK =
  'Один раз за битву, в любой фазе, сразу после того как смертельная рана распределяется по модели ADEPTUS ASTARTES этого юнита, этот юнит может призвать Watcher in the Dark. Когда он это делает, до конца фазы модели этого юнита имеют способность Feel No Pain 4+ против смертельных ран.\n\n**Примечание разработчика:** положите рядом с юнитом жетон Watcher in the Dark, убрав его, когда эта способность будет задействована.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  ...Object.fromEntries(SHARED.map((id) => [id, smRu[id]])),

  asmodai: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Асмодей'],
    flavor:
      'Асмодай — самый успешный Interrogator-Chaplain Dark Angels. Неумолимый и лишённый юмора, в бою он возносит боевой дух братьев к новым высотам, превращая их в неудержимые машины убийства, распевая свои литании ненависти с непоколебимой верой.',
    abilities: {
      'Exemplar of Hate':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, вы можете перебросить бросок попадания.',
      'Feared Interrogator':
        'В начале фазы ближнего боя каждый вражеский юнит CHARACTER в пределах 6" от этой модели обязан пройти проверку боевого шока, вычтя 1 из этой проверки. Кроме того, каждый раз, когда эта модель уничтожает вражескую модель CHARACTER атакой ближнего боя, вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; crozius arcanum and power weapon.`,
    leader: { text: LEADER_TEXT },
  },

  azrael: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Азраэль'],
    flavor:
      'Верховный Великий магистр Азраэль — маяк вдохновения для тех, кто следует за ним, и ему воздают огромное уважение за талант стратега. Мастерский командир, он быстро схватывает меняющуюся обстановку боя и направляет свои силы с наибольшей выгодой. В гуще Азраэль обезглавливает врагов каждым ударом Sword of Secrets.',
    abilities: {
      'Supreme Grand Master':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [SUSTAINED HITS 1].',
      'Masterful Tactician':
        'В начале вашей фазы командования, если эта модель на поле боя, вы получаете 1 CP.',
    },
    wargear: {
      'The Lion Helm':
        'Модели юнита носителя имеют инвулевый спас-бросок 4+. Кроме того, один раз за битву, в любой фазе, носитель может призвать Watcher in the Dark. Когда он это делает, до конца фазы модели юнита носителя имеют способность Feel No Pain 4+ против смертельных ран.',
    },
    loadout: `${EQUIP_THIS} Lion’s Wrath; the Sword of Secrets; the Lion Helm.`,
    leader: { text: LEADER_TEXT },
  },

  belial: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Белиал'],
    flavor:
      'Белиал — прирождённый воин, убийца, чьё мастерство в бою всегда выделялось даже среди его постчеловеческих братьев. При всех своих способностях он стойкий перфекционист, корящий себя за каждую мнимую слабость. В бою он владеет Sword of Silence — обсидиановой реликвией Ордена, что словно поглощает окрестный звук.',
    abilities: {
      'Grand Master of the Deathwing':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, если засчитано критическое попадание, эта атака имеет способность [PRECISION].',
      'Strikes of Retribution':
        'Каждый раз, когда атака ближнего боя распределяется по этой модели, после того как юнит атакующей модели закончил свои атаки, бросьте один D6 (максимум шесть D6 за атакующий юнит): за каждый 4+ атакующий юнит получает 1 смертельную рану.',
    },
    loadout: `${EQUIP_THIS} master-crafted storm bolter; the Sword of Silence.`,
    leader: { text: LEADER_TEXT },
  },

  // Warhammer Legends, from the Faction Pack (EN sheet carries source: 'faction-pack').
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

  'deathwing-knights': {
    flavor:
      'Deathwing Knights — высшие сеятели смерти Ордена, чьи удары ломают хребет врагу одним махом. Снаряжённые фамильным военным снаряжением, они телепортируются в самое сердце жесточайшего боя, ведомые Knight Master — вихрями смертоносного разрушения.',
    abilities: {
      'Teleport Homer': TELEPORT_HOMER,
      'Inner Circle':
        'Каждый раз, когда атака распределяется по модели этого юнита, вычтите 1 из характеристики Урона (Damage) этой атаки.',
    },
    wargear: {
      'Watcher in the Dark': WATCHER_IN_DARK,
    },
    loadout:
      '**Knight Master вооружён:** great weapon of the Unforgiven.\n\n**Каждый Deathwing Knight вооружён:** mace of absolution.',
    options: [
      'great weapon of the Unforgiven у Knight Master можно заменить на 1 relic weapon.',
      'Всем Deathwing Knight в этом юните их mace of absolution можно заменить на 1 power weapon.',
      'Этот юнит можно снабдить 1 Watcher in the Dark.',
    ],
  },

  // Warhammer Legends, from the Faction Pack.
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
    loadout: `${EQUIP_THIS} storm bolter; master-crafted power weapon.`,
    options: [
      'storm bolter и master-crafted power weapon этой модели можно заменить либо на 1 twin lightning claws, либо на два разных вида оружия из следующего списка:\n▪ 1 storm bolter\n▪ 1 chainfist\n▪ 1 mace of absolution\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield',
    ],
    leader: { text: LEADER_TEXT },
  },

  'deathwing-terminator-squad': {
    flavor:
      'Стремительно развёртываясь на поле боя пылающим телепортационным ударом или в бронированном корпусе крупного транспорта, Deathwing Terminator Squad обрушивают на врага тяжёлый огонь или ввязываются с ним в жестокую схватку, дробя его thunder hammer или кромсая lightning claws.',
    abilities: {
      'Teleport Homer': TELEPORT_HOMER,
      Deathwing:
        'Каждый раз, когда модель этого юнита совершает атаку, вы можете игнорировать любые или все модификаторы характеристик Навыка стрельбы (Ballistic Skill) или Навыка ближнего боя (Weapon Skill) этой атаки и/или броска попадания. Кроме того, каждый раз, когда модель этого юнита совершает атаку по вашей цели Oath of Moment (см. Codex: Space Marines), прибавьте 1 к броску попадания.',
    },
    wargear: {
      'Watcher in the Dark': WATCHER_IN_DARK,
    },
    loadout:
      '**Deathwing Sergeant вооружён:** storm bolter; power weapon.\n\n**Каждый Deathwing Terminator вооружён:** storm bolter; power fist.',
    options: [
      'Любому числу Deathwing Terminator их power fist можно заменить на 1 chainfist.',
      'За каждые 5 моделей в этом юните 1 Deathwing Terminator может заменить свой storm bolter на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 storm bolter и 1 cyclone missile launcher (storm bolter этой модели заменить нельзя)',
      'Этот юнит можно снабдить 1 Watcher in the Dark.',
    ],
  },

  ezekiel: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Иезекииль', 'Изекиль'],
    flavor:
      'Иезекииль — Великий магистр библиариев. Мастер интерромантии, его варп-шёпоты рвут рассудок врагов. Его клинок, известный как Traitor’s Bane, был выкован, чтобы разить тех, кто обратился против Императора. Это грозное force weapon, что, по слухам, навеки заточает души Падших.',
    abilities: {
      'Psychic Hood': FNP4_PSYCHIC,
      'Engulfing Fear (Psychic)':
        'В вашей фазе стрельбы вы можете выбрать один вражеский юнит в пределах 18" от этой модели. Этот вражеский юнит обязан пройти проверку боевого шока.',
    },
    wargear: {
      'Book of Salvation':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Атак (Attacks) оружия ближнего боя моделей этого юнита. Когда эта модель уничтожается, каждый дружественный юнит ADEPTUS ASTARTES в пределах 6" от этой модели обязан пройти проверку боевого шока.',
    },
    loadout: `${EQUIP_THIS} the Deliverer; Mind Wipe; Traitor’s Bane; Book of Salvation.`,
    leader: { text: LEADER_TEXT },
  },

  'inner-circle-companions': {
    flavor:
      'Владея калибанскими greatsword с захватывающим дух мастерством, окутанные дымом благовоний своих жаровен суда, Inner Circle Companions прорубают багровый путь сквозь врагов. Это зловещие воины — сражаются ли они как союзник или враг, ибо бьются в тишине, если не считать воя сервоприводов их брони и хруста клинков сквозь плоть и кость.',
    abilities: {
      'Braziers of Judgement':
        '▪ Этот юнит имеет Stealth.\n▪ Атаки ближнего боя, что нацеливаются на этот юнит, имеют -1 к броскам попадания.',
      'Enmity for the Unworthy':
        'Каждый раз, когда модель этого юнита совершает атаку по юниту CHARACTER, прибавьте 1 к броску попадания.',
    },
    loadout: `**Каждый Inner Circle Companion вооружён:** heavy bolt pistol; Calibanite greatsword.`,
  },

  'land-speeder-vengeance': {
    flavor:
      'Обладая более крупным шасси и антигравитационными двигателями, Land Speeder Vengeance несёт более тяжёлое оружие, чем прочие Land Speeder, а потому оснащён plasma storm battery. В бою его экипаж применяет это мощное оружие, чтобы обрушивать сокрушительный огонь, поспевая при этом за стремительной охотой Ravenwing.',
    abilities: {
      'Storm of Vengeance':
        'Один раз за ход, в фазе стрельбы вашего оппонента, когда другой дружественный юнит ADEPTUS ASTARTES в пределах 6" от этой модели уничтожается, одна модель из вашей армии с этой способностью может задействовать её. Если она это делает, после того как атакующий юнит закончил свои атаки, эта модель может стрелять, как если бы это была ваша фаза стрельбы, но при отыгрыше этих атак она может нацеливаться только на этот вражеский юнит (и только если он допустимая цель).',
    },
    loadout: `${EQUIP_THIS} heavy bolter; plasma storm battery; close combat weapon.`,
    options: ['heavy bolter этой модели можно заменить на 1 assault cannon.'],
  },

  lazarus: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Лазарь'],
    flavor:
      'Магистр Лазарь владеет своим мечом Enmity’s Edge со всем воинским мастерством, что подобает Company Master Dark Angels. Даже в самом свирепом бою он являет спокойствие, сохраняя самообладание и отдавая мастерские приказы, что принесли великие победы.',
    abilities: {
      'Intractable Will':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6. На 4+ не убирайте её из игры; эта уничтоженная модель может сражаться после того, как юнит атакующей модели закончил свои атаки, а затем убирается из игры.',
      'The Spiritshield Helm':
        'Эта модель имеет способность Feel No Pain 3+ против Psychic Attacks и смертельных ран.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Enmity’s Edge.`,
    leader: { text: LEADER_TEXT },
  },

  'lion-eljonson': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Лев Эль’Джонсон', 'Лев Эльджонсон', 'Лев'],
    flavor:
      'Лев Эль’Джонсон выходит из окутанных туманом теневых царств, словно древний странствующий рыцарь, охотящийся на ужасы галактики. Огромным клинком Fealty примарх рассекает чудовищнейших из тварей, а Emperor’s Shield вспыхивает светом и силой в ответ на свирепые удары врагов.',
    abilities: {
      'Primarch of the First Legion':
        'В начале вашей фазы командования выберите две способности Primarch of the First Legion. До начала вашей следующей фазы командования эта модель имеет эти способности.',
      'The Emperor’s Shield':
        'Каждый раз, когда атака нацеливается на эту модель, если характеристика Силы (Strength) этой атаки больше характеристики Стойкости (Toughness) этой модели, вычтите 1 из броска ранения.',
      'Dark Angels Bodyguard':
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов ADEPTUS ASTARTES INFANTRY, она имеет способность Lone Operative.',
    },
    special: {
      'Mist-wreathed Shadow Realms':
        'В вашей фазе командования, если этот юнит не связан боем, вы можете задействовать эту способность. Если вы это делаете:\n▪ Поместите этот юнит в Strategic Reserves.\n▪ Этот юнит может совершить манёвр прибытия в вашей следующей фазе движения (в том числе в ваш первый ход).',
      'Martial Exemplar (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от этой модели, каждый раз, когда модель этого юнита совершает атаку ближнего боя, перебросьте бросок попадания, равный 1, и бросок ранения, равный 1.',
      'No Hiding From the Watchers (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от этой модели, модели этого юнита имеют способность Feel No Pain 4+ против смертельных ран.',
    },
    loadout: `${EQUIP_THIS} Arma Luminis; Fealty.`,
    options: ['Нет.'],
  },

  'nephilim-jetfighter': {
    flavor:
      'Обтекаемые перехватчики «воздух–воздух», Nephilim Jetfighter совершают молниеносные манёвры в скоростной войне. Эти пилоты постоянно подталкивают Techmarine к улучшениям и доработкам их машин, чтобы сделать их быстрее и смертоноснее, — и результаты оказались поистине значительными.',
    abilities: {
      'Lightning-fast Manoeuvres':
        'Дальнобойные атаки, что нацеливаются на этот юнит, имеют -1 к броскам ранения.',
    },
    loadout: `${EQUIP_THIS} avenger mega bolter; blacksword missiles; twin heavy bolter; armoured hull.`,
    options: ['avenger mega bolter этой модели можно заменить на 1 Nephilim lascannons.'],
    damaged: { note: 'осталось 1–3 ран', text: dmgHitMinus('1–3') },
  },

  'ravenwing-black-knights': {
    flavor:
      'Ravenwing Black Knights — величайшие воины 2-й роты, элитные бойцы, что берут за образец рыцарей-охотников на чудовищ старого Калибана. Они мчатся к врагу, взмахивая своими corvus hammer с такой силой, что их шипастый конец пробивает даже толстейшую броню.',
    abilities: {
      'Knights of Caliban':
        'Каждый раз, когда этот юнит выбирается для схватки, если он совершил манёвр нападения в этот ход, до конца фазы оружие ближнего боя моделей этого юнита имеет способности [ANTI-MONSTER 4+] и [ANTI-VEHICLE 4+].',
    },
    loadout: `**Каждая модель вооружена:** bolt pistol; plasma talon; Black Knight combat weapon.`,
    options: [
      'За каждые 3 модели в этом юните 1 модель может заменить свой plasma talon на 1 Astartes grenade launcher.',
    ],
  },

  'ravenwing-command-squad': {
    flavor:
      'Ravenwing Command Squad мчатся в бой в самой голове охоты. С их чемпионом, готовым к дуэли за честь роты, штандартом Ancient, что развевается на ветру, словно рыцарский вымпел, и Apothecary под рукой, чтобы исцелить тяжелейшие раны, эти грозные воины помогают собратьям загонять даже опаснейшую добычу.',
    abilities: {
      Narthecium:
        'Пока этот юнит содержит Ravenwing Apothecary, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER и Invader ATV) в этот юнит.',
      'Astartes Banner':
        'Пока этот юнит содержит Ravenwing Ancient, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Honour or Death':
        'Пока этот юнит содержит Ravenwing Champion, прибавьте 1 к броскам продвижения и нападения для этого юнита. Когда вы нацеливаете стратагему Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
    },
    loadout:
      '**Ravenwing Champion вооружён:** bolt pistol; plasma talon; master-crafted power weapon.\n\n**Каждая прочая модель вооружена:** bolt pistol; plasma talon; Black Knight combat weapon.',
    options: [
      'За каждые 3 модели в этом юните у 1 модели её plasma talon можно заменить на 1 Astartes grenade launcher.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'ravenwing-dark-talon': {
    flavor:
      'Dark Talon — штурмовой летательный аппарат ближнего боя, созданный, чтобы помочь Ravenwing хватать самую упорную или докучливую добычу. В этой роли ему помогает вооружение времён Тёмной эры технологий — например, эмпирейски заряженный rift cannon и зловещая стазис-бомба, что сковывает жертв в зоне замедленного времени.',
    abilities: {
      'Stasis Bomb':
        'В конце фазы схватки вашего оппонента выберите один видимый вражеский юнит (исключая юниты AIRCRAFT и юниты с Lone Operative) в пределах 24" от этого юнита. Этот вражеский юнит замедлен (slowed) до конца следующей фазы движения вашего оппонента:\n▪ Пока юнит замедлен, в фазе движения вашего оппонента, когда этот юнит выбирается для перемещения, если он не остаётся неподвижным, бросьте один D6:\n▪ На 1–4 этот юнит получает D3 смертельные раны и имеет -2" M.\n▪ На 5–6 этот юнит получает 2D3 смертельные раны и имеет -3" M.',
    },
    loadout: `${EQUIP_THIS} rift cannon; 2 hurricane bolters; armoured hull.`,
    damaged: { note: 'осталось 1–3 ран', text: dmgHitMinus('1–3') },
  },

  'ravenwing-darkshroud': {
    flavor:
      'На каждом Darkshroud установлена загадочная статуя, что пережила гибель Калибана и напиталась энергиями, высвобожденными тем катаклизмом. Искусством Dark Angels эти энергии усиливаются и используются, чтобы скрыть братьев рядом с Darkshroud от взора врага.',
    abilities: {
      'Icon of Old Caliban (Aura)':
        'Дружественные юниты ADEPTUS ASTARTES в пределах 6" от этого юнита имеют Stealth.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; close combat weapon.`,
    options: ['heavy bolter этой модели можно заменить на 1 assault cannon.'],
  },

  // Warhammer Legends, from the Faction Pack.
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
    loadout: `${EQUIP_THIS} twin assault cannon; twin heavy bolter; power weapon.`,
  },

  sammael: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Саммаэль'],
    flavor:
      'Саммаэль идёт на войну на джетбайке Corvex — реликвии Тёмной эры технологий. На этом древнем скакуне командир Ravenwing врывается в схватку, и storm bolter с plasma cannon наносят чудовищный урон, прежде чем он подходит для добивания с Raven Sword — фамильным клинком с бритвенной кромкой, что никогда не тупится.',
    abilities: {
      'Grand Master of the Ravenwing':
        '▪ Дальнобойные атаки этого юнита имеют [ASSAULT].\n▪ Когда этот юнит выбирается совершить advance move, это продвижение не мешает этому юниту иметь право объявить нападение.\n▪ Этот юнит имеет MOBILE.',
      'Cut Off Their Escape':
        'Каждый раз, когда вражеский юнит (исключая MONSTER и VEHICLE) в дистанции ввязывания юнита этой модели выбирается для отступления, модели этого вражеского юнита обязаны пройти проверки Desperate Escape, как если бы их юнит был в боевом шоке. При этом, если этот вражеский юнит также в боевом шоке по другим причинам, вычтите 1 из каждой из этих проверок Desperate Escape.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted plasma cannon; twin storm bolter; the Raven Sword.`,
    leader: { text: LEADER_TEXT },
  },
}

export const abilityNamesRu = {
  ...smNames,
  'Exemplar of Hate': 'Образец ненависти',
  'Feared Interrogator': 'Грозный дознаватель',
  'Supreme Grand Master': 'Верховный Великий магистр',
  'Masterful Tactician': 'Мастерский тактик',
  'The Lion Helm': 'Львиный шлем',
  'Grand Master of the Deathwing': 'Великий магистр Deathwing',
  'Strikes of Retribution': 'Удары возмездия',
  'Inner Circle': 'Внутренний круг',
  'Watcher in the Dark': 'Страж во тьме',
  Deathwing: 'Deathwing',
  'Engulfing Fear (Psychic)': 'Поглощающий страх (Психика)',
  'Book of Salvation': 'Книга спасения',
  'Braziers of Judgement': 'Жаровни суда',
  'Enmity for the Unworthy': 'Вражда к недостойным',
  'Storm of Vengeance': 'Буря возмездия',
  'Intractable Will': 'Несгибаемая воля',
  'The Spiritshield Helm': 'Шлем духовного щита',
  'Primarch of the First Legion': 'Примарх Первого легиона',
  'The Emperor’s Shield': 'Щит Императора',
  'Dark Angels Bodyguard': 'Телохранитель Dark Angels',
  'Mist-wreathed Shadow Realms': 'Окутанные туманом теневые царства',
  'Martial Exemplar (Aura)': 'Воинский образец (Аура)',
  'No Hiding From the Watchers (Aura)': 'От Стражей не укрыться (Аура)',
  'Lightning-fast Manoeuvres': 'Молниеносные манёвры',
  'Knights of Caliban': 'Рыцари Калибана',
  'Stasis Bomb': 'Стазис-бомба',
  'Icon of Old Caliban (Aura)': 'Икона старого Калибана (Аура)',
  'Grand Master of the Ravenwing': 'Великий магистр Ravenwing',
  'Cut Off Their Escape': 'Отрежь им отход',
  // Legends (Faction Pack)
  Talonmaster: 'Мастер когтей',
  'Nowhere to Hide': 'Негде спрятаться',
  'Master of Manoeuvre': 'Мастер манёвра',
  'Vanquish the Foe': 'Сокруши врага',
}
