// Space Marines — русский перевод листов данных. Разреженный оверлей поверх EN-структуры
// (см. ./index.js): для каждого листа переведены только тексты (flavor, тексты
// способностей, loadout/options, damaged/leader/transport). Имена юнитов, оружие,
// характеристики, ключевые слова, core- и faction-правила, [BRACKET]-теги и ALL-CAPS
// названия способностей (INSPIRING COMMANDER, CHAPTER MASTER OF THE RAVEN GUARD и т.п.)
// остаются английскими и наследуются от EN. `abilityNamesRu` (внизу) даёт RU-подписи
// для названий способностей (Title-Case, не ALL-CAPS).

// Часто повторяющиеся тексты — выносим в константы для единообразия.
const CP_REDUCE =
  'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда его юнит выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.'
const WOUNDS_6 = 'Носитель имеет характеристику Ран (Wounds) 6.'
const INV4 = 'Носитель имеет инвулевый спас-бросок 4+.'
const INV5 = 'Носитель имеет инвулевый спас-бросок 5+.'
const LETHAL_LEADER =
  'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].'
const WOUND_PLUS1_MELEE =
  'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску ранения.'
const OC_PLUS1 =
  'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.'
const ASSAULT_RAMP =
  'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.'
const FNP4_PSYCHIC =
  'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks.'
const TACTICAL_PRECISION =
  'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания, если этот юнит ниже своей начальной численности, а также прибавьте 1 к броску ранения, если этот юнит ниже половинной численности.'
const IGNORES_COVER_STATIONARY =
  'Каждый раз, когда этот юнит остаётся неподвижным, до начала вашей следующей фазы перемещения дальнобойное оружие моделей этого юнита имеет способность [IGNORES COVER].'
const DAMAGE_MINUS1 =
  'Каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.'
const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
// Стандартная сноска «−1 к попаданию при повреждении» (у многих техник/дредноутов).
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'adrax-agatone': {
    flavor:
      'Капитан 3-й роты Саламандр — сфокусированная сила разрушения, что бьёт в бою сильно и точно, не зная усталости. Неимоверно сильный, он мастерски владеет своим могучим thunder hammer, поражая врагов с каждого замаха. Тех, кого Агатон не сразит таким образом, он выжигает яростными залпами своего hand-flamer по имени Drakkis.',
    abilities: {
      'Unto the Anvil':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, вы можете перебросить бросок ранения.',
      'Lord of the Pyroclasts':
        'Пока вражеский юнит находится в дистанции ввязывания этой модели, уменьшите вдвое характеристику Контроля целей (OC) моделей этого вражеского юнита.',
    },
    loadout: `${EQUIP_THIS} Drakkis; Malleus Noctum.`,
    leader: { text: LEADER_TEXT },
  },

  'aethon-shaan': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Этон Шаан'],
    flavor:
      'Как Магистр Ордена Гвардии Ворона, Этон Шаан воплощает самые терпеливые и коварные черты наследия своего примарха. Когда же он решает ударить из теней, то делает это с внезапной холодной яростью, вырываясь вперёд, и увитые молниями Claws of Severax сверкают среди фонтанов вражеской крови.',
    abilities: {
      'Master of Shadows':
        'В вашей фазе командования вы можете выбрать один юнит из армии вашего оппонента. До начала вашей следующей фазы командования каждый раз, когда юнит ADEPTUS ASTARTES из вашей армии объявляет нападение, находясь в пределах 12" от этого вражеского юнита, вы можете перебросить бросок нападения, но он обязан объявить этот вражеский юнит целью этого нападения (если возможно).',
      'Blackwing Mantle':
        'Вы можете нацелить стратагему Rapid Ingress/Heroic Intervention на этот юнит, независимо от любых других применений этой стратагемы в этой фазе. Если вы это делаете:\n▪ Это применение стоит на 1 CP меньше.\n▪ Это применение не мешает применить эту стратагему на других юнитах в этой фазе.',
    },
    special: {
      'CHAPTER MASTER OF THE RAVEN GUARD':
        'В начале шага Declare Battle Formations, если ваша армия включает AETHON SHAAN и Kayvaan Shrike, до конца битвы ваш юнит KAYVAAN SHRIKE теряет способность Lone Operative и заменяет своё ключевое слово CHAPTER MASTER на CAPTAIN.',
    },
    loadout: `${EQUIP_THIS} 1 heavy bolt pistol; 1 Claws of Severax.`,
  },

  'aggressor-squad': {
    flavor:
      'Способные возглавить сокрушительное наступление или сломать самый упорный вражеский штурм, Aggressor — ходячие керамитовые бастионы. Они превосходны в ближнем бою и обрушивают на врага потоки убийственного огня, прежде чем раздавить его своими энергетическими кулаками.',
    abilities: {
      'Close-quarters Firepower':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по ближайшей допустимой цели, улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1.',
    },
    loadout: `${EQUIP_EVERY} flamestorm gauntlets; twin power fists.`,
    options: [
      'Всем моделям этого юнита их flamestorm gauntlets можно заменить на 1 auto boltstorm gauntlets и 1 fragstorm grenade launcher.',
    ],
  },

  ancient: {
    flavor:
      'Ancient несут драгоценные штандарты Ордена. Эти славные реликвии присутствовали в самых значимых битвах Ордена, и их тонко выделанные узоры увековечивают бесчисленные кампании и героические деяния. Это символы беззаветной преданности и нерушимой верности братьев.',
    abilities: {
      'Astartes Banner': OC_PLUS1,
      'Unbreakable Duty':
        'Пока эта модель находится в радиусе маркера цели и/или в пределах 6" от центра поля боя, она имеет способность Feel No Pain 4+.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; bolt rifle; close combat weapon.`,
    options: ['bolt rifle и close combat weapon этой модели можно заменить на 1 power weapon.'],
    leader: { text: LEADER_TEXT },
  },

  'ancient-in-terminator-armour': {
    flavor:
      'Носить священные штандарты космодесанта — важнейшая задача. Символы мощи Ордена, за которые космодесантники с радостью отдадут жизнь, а потому Ancient часто становятся целью. Облачённые в броню Terminator, они почти неуязвимы для вражеского огня, и штандарт всегда реет гордо.',
    abilities: {
      'Astartes Banner': OC_PLUS1,
      'Keep the Banner High': TACTICAL_PRECISION,
    },
    wargear: {
      'Terminator Storm Shield': WOUNDS_6,
    },
    loadout: `${EQUIP_THIS} storm bolter; power fist.`,
    options: [
      'power fist этой модели можно заменить на одно из следующего:\n▪ 1 chainfist\n▪ 1 close combat weapon\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'storm bolter и power fist этой модели можно заменить на одно из следующего:\n▪ 1 twin lightning claws\n▪ 1 thunder hammer и 1 Terminator storm shield',
    ],
    leader: { text: LEADER_TEXT },
  },

  apothecary: {
    flavor:
      'Помимо полевой хирургии, долг Apothecary — извлекать ген-семя павших, сохраняя тем самым Орден для будущих поколений. Для этого Apothecary снаряжён так, чтобы даровать покой тем, кто слишком тяжело ранен, и умело извлечь их драгоценные прогеноидные железы.',
    abilities: {
      Narthecium:
        'Пока эта модель возглавляет юнит, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER) в этот юнит.',
      'Gene-seed Recovery':
        'Когда юнит-Bodyguard этой модели уничтожен, бросьте один D6: на 2+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; reductor pistol; close combat weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'apothecary-biologis': {
    flavor:
      'Облачённый в броню Gravis, Apothecary Biologis способен продвигаться сквозь бури вражеского огня, держа наготове vivispectrum, чтобы взять образцы биоматериала для последующего анализа — будь то плоть ксеносов, оболочки вирусного оружия или эзотерическая ген-техника.',
    abilities: {
      'Surgical Precision': LETHAL_LEADER,
      Vivispectrum:
        'Если юнит этой модели уничтожает вражеский юнит в результате атаки ближнего боя, до конца битвы эта модель имеет характеристику Контроля целей (OC) 9.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; close combat weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'assault-intercessor-squad': {
    flavor:
      'Assault Intercessor — одни из самых распространённых штурмовых юнитов в арсенале Ордена. Стреляя из heavy bolt pistol на сближении, они бросаются в схватку, где быстро расправляются с врагом жестокими взмахами своих chainsword.',
    abilities: {
      'Targeted Intercession':
        'Каждый раз, когда модель этого юнита выбирает вражеский юнит целью атаки ближнего боя, перебросьте бросок ранения, равный 1. Если этот вражеский юнит находится в радиусе маркера цели, вы можете вместо этого перебросить бросок ранения.',
    },
    loadout: `${EQUIP_EVERY} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'heavy bolt pistol у Assault Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 plasma pistol',
      'Astartes chainsword у Assault Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
    ],
  },

  'assault-intercessors-with-jump-packs': {
    flavor:
      'Благодаря мощным jump pack эти воины парят над полем боя, врезаясь во врага и разя его в упор огнём bolt pistol и яростными ударами chainsword, прежде чем сорваться к следующей цели.',
    abilities: {
      'Hammer of Wrath':
        'Каждый раз, когда этот юнит завершает манёвр нападения, выберите один вражеский юнит в дистанции ввязывания от него, затем бросьте один D6 за каждую модель этого юнита в дистанции ввязывания от этого вражеского юнита: за каждый результат 4+ этот вражеский юнит получает 1 смертельную рану.',
    },
    loadout: `**Каждая модель вооружена:** heavy bolt pistol; Astartes chainsword.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Assault Intercessor with Jump Pack его heavy bolt pistol можно заменить на 1 plasma pistol.',
      'Astartes chainsword у Assault Intercessor Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 power weapon\n▪ 1 power fist',
      'heavy bolt pistol у Assault Intercessor Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 plasma pistol',
    ],
  },

  astraeus: {
    flavor:
      'Astraeus — исполинский гравитационный танк, вооружённый грозным оружием. Смертоноснее всего его twin macro-accelerator cannon, способный обрушивать крупнокалиберные ферро-карбидные снаряды, что разрывают танки, авиацию и пехоту. А его пустотные щиты выдерживают даже самые ожесточённые вражеские контратаки.',
    abilities: {
      'Suppression Fire':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый в этой фазе одной или более атаками её twin macro-accelerator cannon. До начала вашего следующего хода, пока эта модель на поле боя, этот вражеский юнит подавлен. Пока юнит подавлен, каждый раз, когда его модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_THIS} 2 Astraeus las-rippers; ironhail heavy stubber; storm bolter; twin heavy bolter; twin macro-accelerator cannon; armoured hull.`,
    options: [
      '2 Astraeus las-rippers этой модели можно заменить на 2 plasma eradicators.',
      'twin heavy bolter этой модели можно заменить на 1 twin lascannon.',
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
    ],
    damaged: {
      note: 'осталось 1–8 ран',
      text: 'Пока у этой модели осталось 1–8 ран, вычтите 4 из её характеристики Контроля целей (OC), и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'ballistus-dreadnought': {
    flavor:
      'Ballistus Dreadnought — ходячая огневая точка. В экранированном саркофаге в сердце этого боевого шагохода покоятся смертные останки павшего героя Ордена. Через сеть нейронных связей он ведёт боевую машину, нацеливая на вражескую броню или элитную пехоту батареи убийственного тяжёлого оружия.',
    abilities: {
      'Ballistus Strike':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, который не ниже половинной численности, вы можете перебросить бросок попадания.',
    },
    loadout: `${EQUIP_THIS} Ballistus missile launcher; Ballistus lascannon; twin storm bolter; armoured feet.`,
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'bladeguard-ancient': {
    flavor:
      'Bladeguard Ancient несут честь нести в бой драгоценные штандарты своего Ордена. Самые почитаемые из них хранят останки павших героев Ордена; в их присутствии боевые братья вдохновляются повторить легендарные деяния этих образцов древности.',
    abilities: {
      'Astartes Banner': OC_PLUS1,
      'Deeds of Heroism':
        'Один раз за битву, когда эта модель выбирается для схватки, она может задействовать эту способность. Если она это делает, до конца фазы прибавьте 1 к характеристике Атак (Attacks) оружия ближнего боя моделей юнита этой модели.',
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; close combat weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'bladeguard-veteran-squad': {
    flavor:
      'Bladeguard Veteran — неумолимые воины, что неотступно наступают с воздетыми клинками, — сущий образ благородных рыцарей из мифов. Члены элитной 1-й ветеранской роты своего Ордена, каждый из этих несказанно опытных космодесантников сражался за Империум на бессчётных мирах.',
    abilities: {
      Bladeguard:
        'Один раз за ход, за юнит. В фазе боя, когда этот юнит выбирается сражаться или когда вражеский юнит выбирает этот юнит целью, вы можете выбрать одно из следующего:\n▪ Атаки этого юнита в ближнем бою имеют +1 к броскам попадания.\n▪ Или: атаки, нацеленные на этот юнит, имеют -1 к броскам попадания.',
    },
    loadout: `${EQUIP_EVERY} heavy bolt pistol; master-crafted power weapon.`,
    options: [
      'heavy bolt pistol у Bladeguard Veteran Sergeant можно заменить на одно из следующего:\n▪ 1 neo-volkite pistol\n▪ 1 plasma pistol',
    ],
  },

  'brutalis-dreadnought': {
    flavor:
      'Brutalis Dreadnought — таран и оружие ужаса. Устремляясь к вражеским линиям, он осыпает их градом противопехотного огня. Но главная угроза кроется в его массивных, обёрнутых керамитом кулаках или когтях, что могут раздавить бронированного воина, как гнилой плод, и пробить стену бункера, как пергамент.',
    abilities: {
      'Brutalis Charge':
        'Каждый раз, когда эта модель завершает манёвр нападения, выберите один вражеский юнит в дистанции ввязывания от неё и бросьте один D6: на 2–3 этот вражеский юнит получает D3 смертельные раны; на 4–5 — 3 смертельные раны; на 6 — D3+3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} twin Icarus ironhail heavy stubber; twin heavy bolter; Brutalis bolt rifles; Brutalis fists.`,
    options: [
      'twin heavy bolter этой модели можно заменить на 1 twin multi-melta.',
      'Brutalis fists и Brutalis bolt rifles этой модели можно заменить на 1 Brutalis talons.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'caanok-var': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Каанок Вар'],
    flavor:
      'Железный капитан клановой роты Аверний, Каанок Вар — непревзойдённый вождь и воин-чемпион. Командуя, он являет холодную, расчётливую точность, но в нём тлеет жгучая ярость, и в бою он крушит врага карающими ударами своего power maul по имени Axiom.',
    abilities: {
      'Cold and Calculating':
        'Каждый раз, когда модель юнита этой модели совершает атаку по юниту MONSTER или VEHICLE, эта атака имеет способность [LETHAL HITS]. Каждый раз, когда модель юнита этой модели совершает атаку по любому другому юниту, эта атака имеет способность [SUSTAINED HITS 1].',
      'Cerebrex Logic Engine':
        '▪ В начале шага Declare Battle Formations вы можете выбрать один юнит ADEPTUS ASTARTES INFANTRY из вашей армии. До конца битвы этот юнит получает способность Scouts 6".\n▪ После того как оба игрока развернули свои армии, вы можете выбрать один юнит ADEPTUS ASTARTES из вашей армии и переразвернуть его. При этом вы можете поместить этот юнит в Strategic Reserves, если хотите, независимо от того, сколько юнитов уже в Strategic Reserves.',
    },
    loadout: `${EQUIP_THIS} 1 storm bolter; 1 Axiom`,
    leader: { text: LEADER_TEXT },
  },

  captain: {
    flavor:
      'Ведя ударные силы космодесанта с передовой, Captain воплощают силу и мастерство воинов под их началом. Это образцы стратегического гения с веками боевого опыта, и их великие деяния нередко вознаграждаются древними артефактами из хранилищ Ордена.',
    abilities: {
      'Rites of Battle': CP_REDUCE,
      'Finest Hour':
        'Один раз за битву, в начале фазы ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы прибавьте 3 к характеристике Атак (Attacks) оружия ближнего боя этой модели, и это оружие имеет способность [DEVASTATING WOUNDS].',
    },
    wargear: {
      'Relic Shield': WOUNDS_6,
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted bolter; close combat weapon.`,
    options: [
      'bolt pistol, master-crafted bolter и close combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 heavy bolt pistol и 1 power fist\n▪ 1 heavy bolt pistol и 1 master-crafted power weapon\n▪ 1 neo-volkite pistol и 1 power fist\n▪ 1 neo-volkite pistol и 1 master-crafted power weapon\n▪ 1 plasma pistol и 1 power fist\n▪ 1 plasma pistol и 1 master-crafted power weapon\n▪ 1 heavy bolt pistol, 1 master-crafted power weapon и 1 relic shield',
      'close combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 master-crafted power weapon\n▪ 1 power fist',
    ],
    leader: { text: LEADER_TEXT },
  },

  'captain-in-gravis-armour': {
    flavor:
      'Облачённый в несокрушимую броню Gravis, капитан космодесанта может бесстрашно шагать в самые лютые огненные бури поля боя. Надеть броню Gravis — значит явить величайшую решимость сокрушить врага, как бы глубоко тот ни окопался.',
    abilities: {
      'Rites of Battle': CP_REDUCE,
      'Refuse to Yield':
        'Каждый раз, когда атака распределяется по этой модели, уменьшите вдвое характеристику Урона (Damage) этой атаки.',
    },
    loadout: `${EQUIP_THIS} master-crafted heavy bolt rifle; master-crafted power weapon.`,
    options: [
      'master-crafted heavy bolt rifle и master-crafted power weapon этой модели можно заменить на:\n▪ 1 boltstorm gauntlet, 1 power fist и 1 relic chainsword\n▪ 1 boltstorm gauntlet, 1 power fist и 1 relic blade\n▪ 1 boltstorm gauntlet, 1 power fist и 1 relic fist',
    ],
    leader: { text: LEADER_TEXT },
  },

  'captain-in-phobos-armour': {
    flavor:
      'Все Primaris-космодесантники, служа в 10-й роте, обучены разведке, скрытности и диверсиям. Облачившись в броню Phobos, капитан соединяет эти навыки со своим невероятным боевым мастерством и добытым потом стратегическим опытом, ведя ударные отряды воинов Vanguard на опасные тайные задания.',
    abilities: {
      'Rites of Battle': CP_REDUCE,
      'Master of Deceit':
        'После того как оба игрока развернули свои армии, если ваша армия включает одну или более моделей с этой способностью, вы можете выбрать до трёх дружественных юнитов ADEPTUS ASTARTES INFANTRY и переразвернуть все эти юниты. При этом любой из этих юнитов можно поместить в Strategic Reserves, независимо от того, сколько юнитов уже в Strategic Reserves.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; instigator bolt carbine; combat knife.`,
    leader: { text: LEADER_TEXT },
  },

  'captain-in-terminator-armour': {
    flavor:
      'От капитанов космодесанта ждут, что они сражаются с передовой, и мало какая броня позволяет делать это столь же успешно, как латы Terminator. Грозно стойкий, такой доспех защищает капитана ото всего, кроме самого убийственного вражеского огня, и позволяет ему развёртываться телепортационным ударом в самое сердце врага.',
    abilities: {
      'Rites of Battle': CP_REDUCE,
      'Unstoppable Valour': 'Вы можете перебрасывать броски нападения для юнита этой модели.',
    },
    loadout: `${EQUIP_THIS} storm bolter; relic weapon.`,
    options: [
      'storm bolter этой модели можно заменить на 1 combi-weapon.',
      'relic weapon этой модели можно заменить на 1 relic fist.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'captain-titus': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Тит', 'Деметриан Тит', 'Титус'],
    flavor:
      'Неустанный поборник Ультрамара с волей из несгибаемого адаманта, капитан Деметриан Тит одержал бессчётные победы вопреки, казалось бы, невозможному. Обладая прославленными командными талантами, Тит по-настоящему в своей стихии в гуще боя, где сражается без устали и не отступает даже перед тяжкими ранами.',
    abilities: {
      'Press the Attack':
        'Оружие моделей юнита этой модели имеет способность [SUSTAINED HITS 1].',
      'Honour of Ultramar':
        'Если эта модель уничтожена атакой ближнего боя и ещё не сражалась в этой фазе, бросьте один D6: на 2+ не убирайте её из игры. Эта модель может сражаться после того, как атакующий юнит закончил свои атаки. Если в результате этих атак уничтожена одна или более вражеских моделей, эта модель восстанавливает D3 потерянные раны и не уничтожается; иначе она убирается из игры.',
    },
    special: {
      'DEMETRIAN TITUS': 'Ваша армия не может включать более одного юнита Titus.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted bolter; master-crafted chainsword.`,
    leader: { text: LEADER_TEXT },
  },

  'captain-with-jump-pack': {
    flavor:
      'Многие капитаны космодесанта предпочитают ярость и скорость, изобретая хитроумные стратегии, чтобы обрушить их на врага с сокрушительным эффектом. Будучи непревзойдёнными воинами и вдохновляющими вождями, они нигде не уместнее, чем на самом острие битвы. С jump pack капитаны ведут своих воинов как наконечник копья своих штурмов.',
    abilities: {
      'Angel’s Wrath':
        'Пока эта модель возглавляет юнит, каждый раз, когда этот юнит завершает манёвр нападения, до конца хода прибавьте 1 к характеристике Силы (Strength) оружия ближнего боя моделей этого юнита.',
      'Rites of Battle': CP_REDUCE,
    },
    wargear: {
      'Relic Shield': WOUNDS_6,
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'heavy bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 plasma pistol\n▪ 1 hand flamer',
      'Astartes chainsword этой модели можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 relic weapon',
      'heavy bolt pistol и Astartes chainsword этой модели можно заменить на 1 thunder hammer и 1 relic shield.',
      'Если эта модель вооружена heavy bolt pistol и Astartes chainsword, её можно снабдить 1 relic shield. При этом heavy bolt pistol и Astartes chainsword этой модели заменить нельзя.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'cato-sicarius': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Сикарий', 'Като Сикарий'],
    flavor:
      'Благородный отпрыск Талассара, Като Сикарий — один из самых прославленных чемпионов Ультрамаринов. Как капитан Victrix Honour Guard, Сикарий являет высшее фехтовальное искусство и подлинно мастерски владеет молниеносным штурмом, развёртывая своих воинов с решительностью и быстротой, рождёнными абсолютной уверенностью.',
    abilities: {
      'Knight Champion of Macragge':
        'В фазе движения вашего оппонента, если вражеский юнит завершает манёвр в пределах 8" от этого юнита, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, этот юнит может совершить обычный манёвр до 6".',
      'Honour or Death':
        'Вы можете нацелить стратагему Heroic Intervention на этот юнит, независимо от любых других применений этой стратагемы в этой фазе. Если вы это делаете:\n▪ Это применение стоит на 1 CP меньше.\n▪ Это применение не мешает применить эту стратагему на других юнитах в этой фазе.',
    },
    loadout: `${EQUIP_THIS} 1 artisan plasma pistol; 1 Talassarian tempest blade.`,
    leader: { text: LEADER_TEXT },
  },

  'centurion-assault-squad': {
    flavor:
      'Мало какая технология лучше приспособлена для осадной войны, чем боевой костюм Centurion. Врезаясь в громовые бури вражеского огня, Centurion Assault Squad вскрывают своими ревущими осадными бурами бронированные бункеры и разрывают танки на части.',
    abilities: {
      'Annihilator Protocols':
        'Оружие ближнего боя моделей этого юнита имеет способность [SUSTAINED HITS 2] при нацеливании на юниты MONSTER, VEHICLE или FORTIFICATION.',
    },
    wargear: {
      'Centurion Assault Launcher': 'Носитель имеет ключевое слово Grenades.',
    },
    loadout: `${EQUIP_EVERY} twin flamer; siege drills; Centurion bolters.`,
    options: [
      'Любому числу моделей их twin flamer можно заменить на 1 twin meltagun.',
      'Любому числу моделей их Centurion bolters можно заменить на 1 Centurion assault launcher.',
    ],
  },

  'centurion-devastator-squad': {
    flavor:
      'Centurion Devastator Squad господствуют на поле боя, и само их присутствие диктует ход событий. Они часто действуют со Stormraven Gunship, что доставляют космодесантников в их громоздких костюмах на новую позицию, где те служат бронированной огневой базой, зачищая занятые врагом рубежи от всякого сопротивления.',
    abilities: {
      'Decimator Protocols':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку, перебросьте бросок попадания, равный 1. Если цель этой атаки — вражеский юнит в радиусе маркера цели, вы можете вместо этого перебросить бросок попадания.',
    },
    loadout: `${EQUIP_EVERY} grav-cannon; Centurion bolters; Centurion fists.`,
    options: [
      'Любому числу моделей их Centurion bolters можно заменить на 1 Centurion missile launcher.',
      'Любому числу моделей их grav-cannon можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon',
    ],
  },

  chaplain: {
    flavor:
      'С плащом, вздымающимся в жаре битвы, и полыхающим absolvor pistol, Chaplain целеустремлённо шагают в бой, и гром их проповеди слышен даже сквозь яростный лязг сражения. Без отдыха они призывают братьев к победе, закаляя их сердца, разум и души, сколь бы свиреп ни был враг.',
    abilities: {
      'Litany of Hate': WOUND_PLUS1_MELEE,
      'Spiritual Leader':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит ADEPTUS ASTARTES, который в боевом шоке и находится в пределах 12" от этой модели. Этот юнит больше не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; crozius arcanum.`,
    leader: { text: LEADER_TEXT },
  },

  'chaplain-in-terminator-armour': {
    flavor:
      'Каждого космодесантника поднимают на войну литании их капелланов, и нигде эта духовная опора не важнее, чем среди крови и ужаса абордажей и высадок на плацдармы. Потому Chaplain обучены носить грозную броню Terminator, чтобы сражаться бок о бок с братьями-ветеранами.',
    abilities: {
      'Litany of Hate': WOUND_PLUS1_MELEE,
      'Recitation of Faith':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против смертельных ран.',
    },
    wargear: {
      'Relic Shield': WOUNDS_6,
    },
    loadout: `${EQUIP_THIS} storm bolter; crozius arcanum.`,
    options: ['storm bolter этой модели можно заменить на 1 relic shield.'],
    leader: { text: LEADER_TEXT },
  },

  'chaplain-on-bike': {
    flavor:
      'Когда Chaplain выходит на поле на байке типа Raider, он способен поспевать даже за самым стремительным броском брони или прорывом-наконечником. Сражаясь в таком деле, он призывает братьев к победе, рыча катехизисы и бросаясь очертя голову на врага под свист crozius arcanum.',
    abilities: {
      'Litany of Hate': WOUND_PLUS1_MELEE,
      'Catechism of Fire':
        'Каждый раз, когда юнит этой модели выбирается для стрельбы, вы можете выбрать один вражеский юнит в пределах 12" от этой модели и видимый ей. До конца фазы дальнобойное оружие моделей юнита этой модели имеет способность [DEVASTATING WOUNDS] при нацеливании на этот вражеский юнит.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; twin bolt rifle; crozius arcanum.`,
    leader: { text: LEADER_TEXT },
  },

  'chaplain-with-jump-pack': {
    flavor:
      'Всегда и повсюду на поле боя нужны рычащие литании капелланов, чтобы будить сердца братьев и вселять страх во врага. С jump pack Chaplain может громом обрушиться туда, где он нужнее всего, или сам возглавить яростный штурм вражеских позиций.',
    abilities: {
      'Litany of Hate': WOUND_PLUS1_MELEE,
      'Exhortation of Rage':
        'Каждый раз, когда юнит этой модели выбирается для схватки, вы можете выбрать один вражеский юнит в дистанции ввязывания от юнита этой модели и бросить один D6: на 4–5 этот вражеский юнит получает D3 смертельные раны; на 6 — 3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; crozius arcanum.`,
    options: [
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 Absolvor bolt pistol',
    ],
    leader: { text: LEADER_TEXT },
  },

  'chief-librarian-tigurius': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Тигурий'],
    flavor:
      'Бросаясь в бой, Тигурий обрушивает на врага бурю психической ярости. Разряды энергии срываются с его посоха, швыряя врагов по воздуху и сжигая их души в пепел. Но ценнее всего для Ордена острое предвидение Верховного Librarian — малейшая его интуиция стоит больше, чем предсказания целой армии стратегов и шпионов.',
    abilities: {
      'Hood of Hellfire':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks и смертельных ран.',
      'Master of Prescience (Psychic)':
        '▪ Этот юнит имеет [core:Stealth].\n▪ Атаки ближнего боя, нацеленные на этот юнит, имеют -1 к броскам попадания.\n▪ (Один раз за раунд боя, на армию) Когда вы нацеливаете стратагему Counteroffensive/Fire Overwatch/Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Storm of the Emperor’s Wrath; Rod of Tigurius.`,
    leader: { text: LEADER_TEXT },
  },

  'company-heroes': {
    flavor:
      'Самые героические братья роты сражаются бок о бок с высокопоставленными офицерами Ордена. Эти ветераны и специалисты служат почётной гвардией и оказывают командиру важнейшую поддержку. Company Champion защищают честь своей роты боевым мастерством, Ancient берегут вдохновляющие штандарты, а Company Veteran обрушивают град огня из реликтового болтерного оружия.',
    abilities: {
      'Astartes Banner':
        'Пока этот юнит содержит Ancient, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Command Squad':
        'Пока модель CHARACTER возглавляет этот юнит, каждый раз, когда атака нацеливается на этот юнит, вычтите 1 из броска ранения.',
    },
    loadout:
      '**Ancient вооружён:** bolt pistol; bolt rifle; close combat weapon.\n\n**Company Champion вооружён:** bolt pistol; master-crafted power weapon.\n\n**Один Company Veteran вооружён:** bolt pistol; master-crafted heavy bolter; close combat weapon.\n\n**Один Company Veteran вооружён:** bolt pistol; master-crafted bolt rifle; close combat weapon.',
  },

  'darnath-lysander': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Лисандр', 'Дарнат Лисандр'],
    flavor:
      'Вздымая свой storm shield по имени Rampart и взмахивая Fist of Dorn, Лисандр пробивается сквозь врагов, как военный корабль сквозь штормовое море. Каждый удар молота обращает противников в кровавое месиво, сметая с ног целые шеренги. И всё это время упрямый хмурый оскал Лисандра не дрогнет, а его решимость абсолютна.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах TERMINATOR ASSAULT SQUAD and TERMINATOR SQUAD из вашей армии имеют характеристику Objective Control (OC) 2, пока они не подвержены боевому шоку.',
      'Icon of Obstinacy':
        'Каждый раз, когда атака нацеливается на юнит этой модели, если характеристика Силы (Strength) этой атаки больше или равна характеристике Стойкости (Toughness) этого юнита, вычтите 1 из броска ранения.',
      Rampart:
        'Один раз за битву, в начале любой фазы, эта модель может задействовать эту способность. Если она это делает, до конца фазы эта модель имеет инвулевый спас-бросок 2+.',
    },
    special: {
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Terminator Assault Squad и Terminator Squad из вашей армии имеют характеристику Контроля целей (OC) 2, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} 1 Fist of Dorn.`,
    leader: { text: LEADER_TEXT },
  },

  'desolation-squad': {
    flavor:
      'Desolation Marine специализируются на том, чтобы сеять повсеместное опустошение в рядах врага. Пуская ли боеголовки прямой наводкой в массы пехоты или вражескую броню, или обрушивая на врага залпы из castellan launcher, эти воины взимают со врага страшную дань.',
    abilities: {
      'Targeter Optics': IGNORES_COVER_STATIONARY,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; castellan launcher; superfrag rocket launcher; close combat weapon.`,
    options: [
      'Всем моделям этого юнита их superfrag rocket launcher можно заменить на 1 superkrak rocket launcher.',
      'superfrag rocket launcher или superkrak rocket launcher у Desolation Sergeant можно заменить на 1 vengor launcher.',
    ],
  },

  'devastator-squad': {
    flavor:
      'Devastator Squad громят врага на дальней дистанции подавляющим огнём тяжёлого оружия, уничтожая всех, кто попал под яростные залпы. Заняв идеальную огневую позицию, они прочно её удерживают, обеспечивая братьям плотный прикрывающий огонь на их продвижении.',
    abilities: {
      Signum: IGNORES_COVER_STATIONARY,
      'Armorium Cherub':
        'Один раз за битву, после броска попадания для модели этого юнита, вы можете изменить этот результат на немодифицированный 6.\n\n**Примечание разработчика:** положите рядом с юнитом жетон Armorium Cherub, убрав его, как только эта способность будет задействована.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: [
      'До 4 Devastator Marine их boltgun можно заменить на одно из следующего:\n▪ 1 grav-cannon\n▪ 1 heavy bolter\n▪ 1 lascannon\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon',
      'bolt pistol и boltgun у Devastator Sergeant можно заменить на два разных оружия из следующего списка:*\n▪ 1 Astartes chainsword\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* Эта модель может быть вооружена только двумя дальнобойными оружиями, если одно из них — Pistol (и только одним Pistol).',
      '* Эта модель может быть вооружена двумя дальнобойными оружиями, только если одно из них — Pistol (и у неё может быть лишь один Pistol).',
    ],
  },

  dreadnought: {
    flavor:
      'Dreadnought — двуногие боевые шагоходы, пилотируемые павшими веками назад героями Ордена, которых сохраняют живыми эзотерические технологии в древнем саркофаге в сердце Dreadnought. Оснащённые убийственным тяжёлым оружием, они уничтожают врага издалека или раздавливают его в кашу в жестокой схватке.',
    abilities: {
      'Wisdom of the Ancients (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES INFANTRY находится в пределах 6" от этой модели, каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1.',
    },
    loadout: `${EQUIP_THIS} assault cannon; storm bolter; Dreadnought combat weapon.`,
    options: [
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 twin lascannon',
      'Dreadnought combat weapon и storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 missile launcher и 1 close combat weapon\n▪ 1 heavy flamer и 1 Dreadnought combat weapon',
    ],
  },

  'drop-pod': {
    flavor:
      'Пущенные с кораблей на низкой орбите, Drop Pod с космодесантом врезаются в поле боя, и их люки распахиваются от яростного удара. За считаные секунды отряд вырывается наружу с огнём наперевес. Такие смертоносные удары ввергают врага в смятение, когда его линии рвутся в неистовом штурме.',
    abilities: {
      'Drop Pod Assault':
        'Эта модель обязана начать битву в Резерве и может быть развёрнута на шаге Подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии. Любые юниты, погружённые в эту модель, обязаны немедленно высадиться после того, как она развёрнута на поле боя, и должны быть размещены дальше 8" от всех вражеских моделей.',
      'Combat Disembarkation':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она развёрнута на поле боя, этот юнит по-прежнему может объявить нападение в этот ход.',
      'Deployment Complete':
        'Как только этот юнит развёрнут на поле боя и все юниты внутри него высадились, до конца битвы юниты не могут погружаться в этот TRANSPORT.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели Centurion, Gravis, Jump Pack, Wulfen или Terminator.',
  },

  'eliminator-squad': {
    flavor:
      'Eliminator Squad — непревзойдённые убийцы, смертоносные снайперы, что таятся в тенях поля боя незримо для врага. Часами они лежат в засаде ради идеального выстрела, а их изощрённые прицелы снабжают их важнейшими данными, чтобы они никогда не промахнулись.',
    abilities: {
      'Reposition Under Covering Fire':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если он содержит Eliminator Sergeant, вооружённого instigator bolt carbine, этот юнит может совершить обычный манёвр. Если он это делает, до конца хода этот юнит не может объявить нападение.',
      'Mark the Target':
        'Каждый раз, когда этот юнит остаётся неподвижным, до начала вашей следующей фазы перемещения дальнобойное оружие моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; bolt sniper rifle; close combat weapon.`,
    options: [
      'bolt sniper rifle у Eliminator Sergeant можно заменить на одно из следующего:\n▪ 1 instigator bolt carbine\n▪ 1 las fusil',
      'Всем Eliminator в этом юните их bolt sniper rifle можно заменить на 1 las fusil.',
    ],
  },

  'eradicator-squad': {
    flavor:
      'Перед расплавляющей яростью Eradicator Squad тяжёлая броня и укреплённые позиции почти беспомощны. Eradicator носят более тяжёлую броню Gravis образца Mk X, что позволяет им невредимо шагать сквозь волны встречного огня, прежде чем в упор пустить в ход своё разрушительное оружие.',
    abilities: {
      'Total Obliteration':
        'Каждый раз, когда дальнобойная атака модели этого юнита нацеливается на модель MONSTER или VEHICLE, вы можете перебросить бросок попадания, бросок ранения и бросок урона.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; melta rifle; close combat weapon.`,
    options: [
      'За каждые 3 модели в этом юните у 1 Eradicator его melta rifle можно заменить на 1 multi-melta.',
    ],
  },

  'eradicator-squad-with-heavy-bolters': {
    flavor:
      'Тяжёлая броня Mk X Gravis этих специалистов огневой поддержки позволяет им переносить бури встречных снарядов. Стоя незыблемо, они отвечают огнём своих беспощадных heavy bolter, выкашивая вражескую пехоту и разрывая лёгкую бронетехнику точными выстрелами по слабым местам корпусов.',
    abilities: {
      'Overlapping Detonations':
        'В вашей фазе стрельбы, когда этот юнит выбирается для стрельбы, вы можете выбрать один вражеский юнит (не MONSTER/VEHICLE), видимый ему. При совершении атак heavy bolter этого юнита, нацеленные на выбранный юнит, имеют [BLAST 1].',
    },
    loadout:
      'Каждая модель вооружена: 1 bolt pistol; 1 heavy bolter; 1 close combat weapon.',
  },

  'firestrike-servo-turrets': {
    flavor:
      'Преимущественно оборонительное оружие, Firestrike Servo-turret обрушивает испепеляющие залпы, прикрывая фланги или базу космодесанта. Установленные на гравитационные брюшные плиты, они парят над полем боя к идеальным огневым позициям, откуда истребляют наступающего врага.',
    abilities: {
      'Sentinel Protocols':
        'Каждый раз, когда вы выбираете этот юнит для стратагемы Fire Overwatch, при отыгрыше этой стратагемы попадания засчитываются на немодифицированных бросках попадания 4+.',
    },
    loadout: `${EQUIP_EVERY} twin Firestrike las-talon; close combat weapon.`,
    options: [
      'Любому числу моделей их twin Firestrike las-talon можно заменить на 1 twin Firestrike autocannon.',
    ],
  },

  'gladiator-lancer': {
    flavor:
      'С безукоризненной точностью Gladiator Lancer выбивает самую тяжёлую вражескую броню, и его laser destroyer прожигает в корпусах дымящиеся дыры. Дальнобойность его тяжёлого орудия такова, что он устраняет угрозы для космодесанта ещё до встречи с ними, проносясь мимо горящих остовов к своим целям.',
    abilities: {
      'Aquilon Optics':
        'Каждый раз, когда эта модель выбирается для стрельбы, при отыгрыше этих атак вы можете перебросить один бросок попадания, один бросок ранения и один бросок урона.',
    },
    loadout: `${EQUIP_THIS} Lancer laser destroyer; 2 storm bolters; armoured hull.`,
    options: [
      '2 storm bolters этой модели можно заменить на 2 fragstorm grenade launchers.',
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
      'Эту модель можно снабдить 1 Icarus rocket pod.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'gladiator-reaper': {
    flavor:
      'Когда пушки Gladiator Reaper раскручиваются до полного хода, гул от них заставляет зубы всех, кто рядом, ныть от силы вибраций. За считаные секунды тысячи стреляных гильз изливаются на бронированную шкуру танка, а враги стираются из бытия бурей огня.',
    abilities: {
      'Reaping Tally':
        'twin heavy onslaught gatling cannon этой модели имеет способность [SUSTAINED HITS 2] при нацеливании на юниты INFANTRY.',
    },
    loadout: `${EQUIP_THIS} 2 tempest bolters; twin heavy onslaught gatling cannon; armoured hull.`,
    options: [
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
      'Эту модель можно снабдить 1 Icarus rocket pod.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'gladiator-valiant': {
    flavor:
      'Valiant обрушивает испепеляющие залпы, сопровождая транспорты или поддерживая пехоту в свирепом бою, с равной лёгкостью пересекая бурные потоки, засасывающие топи и бурлящие лавовые озёра. Его twin las-talon плюются смертью, быстро расправляясь с вражеской бронёй и вскрывая укреплённые позиции.',
    abilities: {
      'Priority Target Acquisition':
        'Каждый раз, когда эта модель совершает атаку своим twin las-talon по ближайшему допустимому юниту MONSTER или VEHICLE, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} 2 multi-meltas; twin las-talon; armoured hull.`,
    options: [
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
      'Эту модель можно снабдить 1 Icarus rocket pod.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'hammerfall-bunker': {
    flavor:
      'Hammerfall Bunker запускаются с кораблей космодесанта так же, как Drop Pod. Автоматизированные средства блокирования зон, укомплектованные жёстко запрограммированными сервиторами, они выполняют всевозможные боевые роли, включая закрепление плацдармов, срыв вражеских штурмов и сеяние хаоса в тылу врага.',
    abilities: {
      Fortification:
        'Пока вражеский юнит находится в дистанции ввязывания только одного или более FORTIFICATION из вашей армии:\n▪ Этот юнит по-прежнему можно выбирать целью дальнобойных атак, но каждый раз, когда такая атака совершается, если только она не совершается из Pistol, вычтите 1 из броска попадания.\n▪ Моделям этого юнита не нужно проходить проверки Desperate Escape из-за отступления в боевом шоке, кроме тех, что при этом пройдут через вражеские модели.',
      'Ceramite Cover':
        'Каждый раз, когда дальнобойная атака распределяется по модели, если эта модель не полностью видима каждой модели атакующего юнита из-за этого FORTIFICATION, эта модель имеет Benefit of Cover против этой атаки.',
      'Defensive Array':
        'Вы можете нацелить стратагему Fire Overwatch на этот FORTIFICATION за 0 CP, и можете сделать это, даже если вы уже нацелили эту стратагему на другой юнит в этот ход. Этот FORTIFICATION можно выбрать целью этой стратагемы только один раз за ход.',
    },
    loadout: `${EQUIP_THIS} Hammerfall heavy bolter array; Hammerfall missile launcher.`,
    options: [
      'Hammerfall heavy bolter array этой модели можно заменить на 1 Hammerfall heavy flamer array.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
  },

  'heavy-intercessor-squad': {
    flavor:
      'Облачённые в толстую броню Gravis, Heavy Intercessor закрепляют местность и непоколебимы в обороне. Всегда готовые к любому признаку вражеской контратаки, они стоят твёрдо, обрушивая залпы тяжёлого огня, что держат на расстоянии всех, кроме самых упорных или безрассудных врагов.',
    abilities: {
      'Unyielding in the Face of the Foe':
        'Пока этот юнит находится в радиусе маркера цели, который вы контролируете, каждый раз, когда атака с характеристикой Урона (Damage) 1 распределяется по модели этого юнита, прибавьте 1 к любому спас-броску по броне против этой атаки.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; heavy bolt rifle; close combat weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Heavy Intercessor его heavy bolt rifle можно заменить на 1 heavy bolter.',
    ],
  },

  'hellblaster-squad': {
    flavor:
      'Мало кто из врагов переживёт добела раскалённую ярость Hellblaster Squad. Будь то Tyranid Hive Tyrant, Ork Warboss или боевой танк Heretic Astartes — все обращаются в пепел и шлак под жгучим, метким плазменным огнём, что льётся из свирепого оружия Hellblaster.',
    abilities: {
      'For the Chapter!':
        'Каждый раз, когда модель этого юнита уничтожается, бросьте один D6: на 3+ не убирайте её из игры. Уничтоженная модель может стрелять после того, как юнит атакующей модели закончил свои атаки, а затем убирается из игры. При отыгрыше этих атак любые проверки Hazardous для этой атаки автоматически проходятся.\n\n**Примечание разработчика:** эта способность срабатывает, даже когда модель этого юнита уничтожена в результате провала проверки Hazardous, — а значит, такая модель может выстрелить дважды в одной фазе.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; plasma incinerator; close combat weapon.`,
    options: ['bolt pistol у Hellblaster Sergeant можно заменить на 1 plasma pistol.'],
  },

  impulsor: {
    flavor:
      'Оснащённый векторными двигателями, что делают его быстрее любого другого гравитационного танка в арсеналах космодесанта, Impulsor — крайне универсальный транспорт, применяемый всеми Primaris-космодесантниками для быстрой высадки и фланговых манёвров. Особенно его ценят силы Vanguard.',
    abilities: {
      'Assault Vehicle':
        'Юниты могут высаживаться из этого TRANSPORT после того, как он совершил продвижение. Юниты, что так делают, считаются совершившими обычный манёвр и не могут объявить нападение в этот ход.',
    },
    wargear: {
      'Orbital Comms Array (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от носителя, каждый раз, когда вы нацеливаете стратагему на этот юнит, бросьте один D6: на 5+ вы получаете 1 CP.',
      'Shield Dome': INV5,
    },
    loadout: `${EQUIP_THIS} 2 storm bolters; armoured hull.`,
    options: [
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
      '2 storm bolters этой модели можно заменить на 2 fragstorm grenade launchers.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 bellicatus missile array\n▪ 1 ironhail skytalon array\n▪ 1 orbital comms array\n▪ 1 shield dome',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 7 моделей Tacticus или PHOBOS INFANTRY. Она не может перевозить модели Jump Pack.',
  },

  'inceptor-squad': {
    flavor:
      'Оснащённые тяжёлыми jump pack, Inceptor Squad — превосходные ударные войска, наносящие врагу сокрушительные удары. Падая к поверхности с самой границы атмосферы мира, они бьют с разрушительной силой, обрушивая ураган огня, что обращает целые отряды вражеской пехоты в кровавую взвесь.',
    abilities: {
      'Meteoric Descent':
        'В вашей фазе перемещения, когда этот юнит развёртывается на поле боя с помощью способности Deep Strike, он может совершить метеорный спуск. Если он это делает, этот юнит можно развернуть где угодно на поле боя дальше 6" по горизонтали от всех вражеских юнитов, но до конца хода он не может объявить нападение.',
    },
    loadout: `${EQUIP_EVERY} assault bolters; close combat weapon.`,
    options: [
      'Всем моделям этого юнита их assault bolters можно заменить на 1 plasma exterminators.',
    ],
  },

  'incursor-squad': {
    flavor:
      'Агрессивная лёгкая пехота, Incursor специализируются на штурме вражеских укреплений и уничтожении важнейших объектов. С грозным набором ауспексов и сенсорного оборудования они видят врагов сквозь стены и предугадывают их движения — а очередью из карабина или ударами ножа сражают их.',
    abilities: {
      'Multi-spectrum Array':
        'Каждый раз, когда этот юнит отстрелялся, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественный юнит ADEPTUS ASTARTES совершает атаку по этому вражескому юниту, прибавьте 1 к броску попадания.',
    },
    wargear: {
      'Haywire Mine':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один вражеский юнит в пределах 3" от носителя и бросить один D6: на 2+ этот вражеский юнит получает D3 смертельные раны, или 2D3 смертельные раны, если это юнит Vehicle.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; occulus bolt carbine; paired combat blades.`,
    options: ['Одного Incursor можно снабдить 1 haywire mine.'],
  },

  'infernus-squad': {
    flavor:
      'Infernus Squad выжигают целые полосы вражеских рядов огненными бурями, что вырываются из их pyreblaster. Специалисты ближнего штурма, они пускают струи горящего прометия в траншеи и бункеры врага, сквозь плотные руины и скрывающую растительность, чтобы ни один враг не ушёл от их огненного гнева.',
    abilities: {
      'Incendiary Terror':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, вы можете выбрать один вражеский юнит INFANTRY, поражённый одной или более из этих атак, сделанных pyreblaster. Этот вражеский юнит обязан пройти проверку боевого шока, вычтя 1 из этой проверки.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; pyreblaster; close combat weapon.`,
  },

  'infiltrator-squad': {
    flavor:
      'Infiltrator Squad — мастера тайных операций, всесторонне обученные самообеспечению и навыкам выживания. Оснащённые omni-scrambler, что калечат вражескую связь, они сеют хаос среди врагов, а затем сражают их градом меткого болтерного огня.',
    abilities: {
      'Omni-scramblers':
        'Вражеские юниты, что развёртываются на поле боя из Резерва, не могут быть размещены в пределах 12" от этого юнита.',
    },
    wargear: {
      'Helix Gauntlet': 'Модели юнита носителя имеют способность Feel No Pain 6+.',
      'Infiltrator Comms Array':
        'Каждый раз, когда вы нацеливаете стратагему на юнит носителя, бросьте один D6: на 5+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; marksman bolt carbine; close combat weapon.`,
    options: [
      '1 Infiltrator можно снабдить 1 helix gauntlet.*',
      '1 Infiltrator можно снабдить 1 Infiltrator comms array.*',
      '* Эти опции нельзя взять на одну и ту же модель.',
    ],
  },

  'intercessor-squad': {
    flavor:
      'Intercessor Squad способны обрушивать карающий огонь на продвижении или удерживать рубеж против врага. У них есть доступ к целому ряду болтерного оружия под самые разные боевые задачи — от поражения врагов на дальней дистанции до зачистки бункерных комплексов.',
    abilities: {
      'Objective Secured':
        'В конце вашей фазы командования, если этот юнит находится в радиусе маркера цели, который вы контролируете, этот маркер цели остаётся под вашим контролем до тех пор, пока уровень контроля вашего оппонента над тем маркером цели не окажется выше вашего в конце фазы.',
      'Hail of Bolts':
        'В вашей фазе стрельбы, когда этот юнит выбирается для стрельбы, выберите до одного видимого вражеского юнита. При совершении этих атак атаки Bolt Rifle этого юнита, нацеленные на тот вражеский юнит, имеют +2 A.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; bolt rifle; close combat weapon.`,
    options: [
      'bolt rifle у Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 hand flamer\n▪ 1 plasma pistol\n▪ 1 power weapon',
      'close combat weapon у Intercessor Sergeant можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'За каждые 5 моделей в этом юните 1 модель, вооружённую bolt rifle, можно снабдить 1 Astartes grenade launcher.',
    ],
  },

  'invader-atv': {
    flavor:
      'Invader — крайне гибкая вездеходная машина, идеально приспособленная для агрессивной разведки. Оснащённая либо multi-melta, либо onslaught gatling cannon, она способна быстро обрушить карающий огонь на уязвимые участки вражеской линии или стремительно настичь и уничтожить разведывательные элементы противника.',
    abilities: {
      'Outrider Escort':
        'Один раз за ход, в фазе стрельбы вашего оппонента, когда другой дружественный юнит ADEPTUS ASTARTES MOUNTED в пределах 6" от этой модели выбирается целью атаки, одна модель из вашей армии с этой способностью может задействовать её. Если она это делает, после того как этот вражеский юнит закончил свои атаки, эта модель может стрелять, как если бы это была ваша фаза стрельбы, но при отыгрыше этих атак она может нацеливаться только на этот вражеский юнит (и только если он допустимая цель).',
    },
    loadout: `${EQUIP_THIS} bolt pistol, twin bolt rifle; onslaught gatling cannon; close combat weapon.`,
    options: ['onslaught gatling cannon этой модели можно заменить на 1 multi-melta.'],
  },

  'invictor-tactical-warsuit': {
    flavor:
      'Оснащённый бесшумными реакторами и сервоприводами, Invictor Tactical Warsuit — боевой шагоход, идеально подходящий для поддержки операций Vanguard и самостоятельных действий в отрыве от основных ударных сил космодесанта. В бою ими управляют отборные воины, преданные защите своих братьев.',
    abilities: {
      'Vanguard Support':
        'Один раз за ход, в фазе стрельбы вашего оппонента, когда дружественный юнит ADEPTUS ASTARTES PHOBOS INFANTRY в пределах 6" от этой модели выбирается целью атаки, эта модель может задействовать эту способность. Если она это делает, после того как юнит этой вражеской модели закончил свои атаки, эта модель может стрелять, как если бы это была ваша фаза стрельбы, но при отыгрыше этих атак она может нацеливаться только на этот вражеский юнит (и только если он допустимая цель).',
    },
    loadout: `${EQUIP_THIS} fragstorm grenade launcher; heavy bolter; incendium cannon; twin ironhail heavy stubber; Invictor fist.`,
    options: [
      'incendium cannon этой модели можно заменить на 1 twin ironhail autocannon.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'iron-father-feirros': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Фейррос', 'Малькаан Фейррос'],
    flavor:
      'Малькаан Фейррос — один из старейших и мудрейших Iron Father. Но его радикальные убеждения и колкий юмор смягчают его тайные технологические речи. Он Master of the Forge Железных Рук, что ведёт братьев Ордена и машинные духи его боевых машин к точному разрушению.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах HEAVY INTERCESSOR SQUAD из вашей армии имеют характеристику Objective Control (OC) 3, пока они не подвержены боевому шоку.',
      'Rites of Tempering':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+.',
      'Iron Father':
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов ADEPTUS ASTARTES VEHICLE, она имеет способность Lone Operative.',
      'Master of the Forge':
        'В вашей фазе командования выберите одну дружественную модель ADEPTUS ASTARTES VEHICLE в пределах 3" от этой модели. Эта модель восстанавливает до 3 потерянных ран и, до начала вашей следующей фазы командования, каждый раз, когда эта модель VEHICLE совершает атаку, прибавьте 1 к броску попадания. Вы не можете выбрать для этой способности юнит, который уже был выбран для способности Blessing of the Omnissiah в этой фазе, и наоборот.',
    },
    special: {
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Heavy Intercessor Squad из вашей армии имеют характеристику Контроля целей (OC) 3, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Gorgon’s Wrath; Harrowhand; Medusan manipuli.`,
    leader: { text: LEADER_TEXT },
  },

  judiciar: {
    flavor:
      'Давшие обет молчания, Judiciar не проповедуют вслух — вместо этого их деяния и есть литания ярости. Держа tempormortis в одной руке и огромный клинок в другой, они обязаны доказать свою достойность в бою, чтобы вступить в собственно Капелланство, свершая это актами преданности и умерщвлением врагов.',
    abilities: {
      Tempormortis: 'Пока эта модель возглавляет юнит, этот юнит имеет способность Fights First.',
      'Silent Fury':
        'Каждый раз, когда эта модель уничтожает вражескую модель CHARACTER, до конца битвы прибавьте 1 к характеристике Атак (Attacks) её executioner relic blade.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; executioner relic blade.`,
    leader: { text: LEADER_TEXT },
  },

  'kayvaan-shrike': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Шрайк', 'Кайваан Шрайк'],
    flavor:
      'Кайваан Шрайк — первейший воин Ордена Гвардии Ворона и образец учения Коракса. Мастер засады, скрытности и бдительности, он ведёт своих воинов в дерзких рейдах, партизанских кампаниях и точечных ударах, бесшумно падая с небес, прежде чем разорвать врагов свирепыми взмахами Raven’s Talons.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах ASSAULT INTERCESSORS WITH JUMP PACKS из вашей армии имеют характеристику Objective Control (OC) 2, пока они не подвержены боевому шоку.',
      'Trifold Path of Shadow':
        'Пока эта модель возглавляет юнит, этот юнит нельзя выбирать целью дальнобойных атак, если только атакующая модель не находится в пределах 12".',
      'Echo of the Ravenspire':
        'В конце хода вашего оппонента, если юнит этой модели не находится в дистанции ввязывания одного или более вражеских юнитов, вы можете убрать тот юнит с поля боя и поместить его в Strategic Reserves.',
    },
    special: {
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Assault Intercessors with Jump Packs из вашей армии имеют характеристику Контроля целей (OC) 2, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} Blackout; the Raven’s Talons.`,
    leader: { text: LEADER_TEXT },
  },

  'korsarro-khan': {
    flavor:
      'Как капитан 3-й роты Белых Шрамов и Master of the Hunt, Кор’сарро Хан преследует и казнит величайших живущих врагов Ордена. Неутомимый охотник, он выслеживает добычу среди звёзд, загоняет её и сносит ей голову мастерским взмахом своего смертоносного клинка Moonfang.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах OUTRIDER SQUAD из вашей армии имеют характеристику Objective Control (OC) 3, пока они не подвержены боевому шоку.',
      'For the Khan!':
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [ASSAULT], а оружие ближнего боя моделей этого юнита — способность [LANCE].',
      'Trophy Taker':
        'Каждый раз, когда эта модель уничтожает вражескую модель CHARACTER, вы получаете 1 CP.',
    },
    special: {
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Outrider Squad из вашей армии имеют характеристику Контроля целей (OC) 3, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Moonfang.`,
    leader: { text: LEADER_TEXT },
  },

  'land-raider': {
    flavor:
      'Land Raider — подвижные крепости, что проносят отряды космодесанта сквозь самые яростные огненные бури без единой царапины. Их машинные духи столь могучи, что если экипаж перебит, они берут управление на себя, делая танк поистине грозным средством.',
    abilities: {
      'Assault Ramp': ASSAULT_RAMP,
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; 2 godhammer lascannons; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'land-raider-crusader': {
    flavor:
      'Land Raider Crusader — непревзойдённый штурмовой танк. Его туша позволяет крушить вражескую оборону, а исполинская огневая мощь рвёт защитников в клочья. С увеличенной транспортной вместимостью, взломав вражескую оборону, он изливает из своих люков космодесантников, чтобы вырезать уцелевших врагов.',
    abilities: {
      'Assault Ramp': ASSAULT_RAMP,
    },
    loadout: `${EQUIP_THIS} 2 hurricane bolters; twin assault cannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 16 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'land-raider-redeemer': {
    flavor:
      'В жестоком городском бою выбить окопавшегося врага бывает невозможно. Но не для Land Raider Redeemer. Когда он пускает в ход свои flamestorm cannon, все, кто попал в бушующий ад горящего прометия, обречены, а бункеры, доты, разрушенные фабрикаты и разбитые жилблоки очищаются от врага.',
    abilities: {
      'Assault Ramp': ASSAULT_RAMP,
    },
    loadout: `${EQUIP_THIS} 2 flamestorm cannons; twin assault cannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 14 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'land-speeder': {
    flavor:
      'Проносясь над полем боя на гудящих грави-двигателях, Land Speeder совершает стремительные штурмовые заходы, обрушивая на врага шквал огня, а затем уносится прочь, прежде чем противник успеет ответить. Это ценный ресурс быстрой разведки для сил космодесанта на поле боя, превосходно обеспечивающий высокомобильную огневую поддержку.',
    abilities: {
      'Purgation Run':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, он может совершить обычный манёвр до D6". Если он это делает, до конца хода этот юнит не имеет права объявлять нападение.',
    },
    loadout: `${EQUIP_THIS} multi-melta; onslaught gatling cannon; stormfury missile launcher; close combat weapon.`,
    options: ['onslaught gatling cannon этой модели можно заменить на 1 heavy flamer.'],
  },

  librarian: {
    flavor:
      'Librarian — боевые псайкеры космодесанта и хранители знаний. Владея пугающими эмпирейскими энергиями, они одной мыслью способны раздавить череп врага, воздвигнуть силовые щиты для защиты братьев от встречного огня и метать разряды псионической мощи.',
    abilities: {
      'Psychic Hood': FNP4_PSYCHIC,
      'Mental Fortress (Psychic)':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют инвулевый спас-бросок 4+.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Smite; force weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'librarian-in-phobos-armour': {
    flavor:
      'Многие Librarian в ходе долгого и опасного обучения постигают тайные искусства сокрытия и иллюзии. Облачившись в броню Phobos, они выходят на поле и используют эти навыки, чтобы затуманивать разум врагов, вырывать из их умов важнейшие боевые планы и обращать тени врага против него самого.',
    abilities: {
      'Psychic Hood': FNP4_PSYCHIC,
      'Shrouding (Psychic)':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Stealth, и этот юнит нельзя выбирать целью дальнобойных атак, если только атакующая модель не находится в пределах 12".',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Smite; force weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'librarian-in-terminator-armour': {
    flavor:
      'Силы Librarian Ордена придают смертоносную псионическую остроту его элитным пехотным наконечникам. Будь то изнурительные абордажи, свирепый городской бой или передовая против подавляющего численного превосходства врага, Librarian в броне Terminator разят врага своими мощными псионическими энергиями.',
    abilities: {
      'Psychic Hood': FNP4_PSYCHIC,
      'Veil of Time (Psychic)':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [SUSTAINED HITS 1].',
    },
    loadout: `${EQUIP_THIS} Smite; force weapon.`,
    options: ['Эту модель можно снабдить одним из следующего:\n▪ 1 combi-weapon\n▪ 1 storm bolter'],
    leader: { text: LEADER_TEXT },
  },

  lieutenant: {
    flavor:
      'Lieutenant, помимо того что они крайне способные тактики и стратеги, ещё и высококлассные воины. Знатоки всего смертоносного оружия братьев, которыми они так часто командуют и бок о бок с которыми сражаются, они выкрикивают приказы и координируют атаки братьев, разя при этом врага собственным арсеналом мощного оружия.',
    abilities: {
      'Tactical Precision': LETHAL_LEADER,
      'Target Priority':
        'Юнит этой модели может стрелять и объявлять нападение в ход, в который он отступал.',
    },
    wargear: {
      'Storm Shield': INV4,
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted bolter; close combat weapon.`,
    options: [
      'master-crafted bolter этой модели можно заменить на одно из следующего:\n▪ 1 plasma pistol\n▪ 1 master-crafted power weapon\n▪ 1 power fist',
      'bolt pistol, master-crafted bolter и close combat weapon этой модели можно заменить на 1 neo volkite pistol, 1 master-crafted power weapon и 1 storm shield.',
      'bolt pistol этой модели можно заменить на 1 heavy bolt pistol.',
      'close combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 master-crafted power weapon\n▪ 1 power fist',
    ],
    leader: { text: LEADER_TEXT },
  },

  'lieutenant-in-phobos-armour': {
    flavor:
      'Крайне умелые боевые командиры, Lieutenant способны вести самостоятельные силы разведки, диверсии и убийства далеко за имперскими линиями. Это смертоносные воины, и последним ощущением бессчётных врагов было холодное прикосновение ножа лейтенанта космодесанта к их горлу.',
    abilities: {
      'Tactical Precision': LETHAL_LEADER,
      'Strategic Dispersal':
        'В вашей фазе стрельбы, после того как юнит этой модели отстрелялся, если он не находится в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр до 6". Если он это делает, до конца хода этот юнит не может объявить нападение.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted bolt carbine; paired combat blades.`,
    leader: { text: LEADER_TEXT },
  },

  'lieutenant-in-reiver-armour': {
    flavor:
      'Когда командиру космодесанта нужно сломить врага ужасом, он спускает с поводка отряды под началом лейтенантов в снаряжении Reiver Squad. Под мастерским водительством лейтенанта эти силы становятся сильнее суммы своих частей и обращают вражеские контингенты в бегство.',
    abilities: {
      'Tactical Precision': LETHAL_LEADER,
      'Deadly Terror':
        'Пока эта модель возглавляет юнит, увеличьте радиус способности Terror Troops этого юнита на 3".',
    },
    loadout: `${EQUIP_THIS} master-crafted special issue bolt pistol; combat knife.`,
    leader: { text: LEADER_TEXT },
  },

  'lieutenant-with-combi-weapon': {
    flavor:
      'Некоторым лейтенантам в броне Phobos поручают действовать в тылу врага, выступая умелыми убийцами и сборщиками разведданных. К тому времени, как прибудет основная ударная группа космодесанта, они уже ввергли врага в смятение и собрали невероятные тактические данные, что почти гарантируют успех штурма.',
    abilities: {
      'Priority Objective Identified':
        'В начале первого раунда боя, если ваша армия включает одну или более моделей с этой способностью, вы можете выбрать один маркер цели на поле боя. До конца битвы, пока одна или более моделей с этой способностью на поле боя, каждый раз, когда дружественная модель ADEPTUS ASTARTES совершает атаку по вражескому юниту в радиусе этого маркера цели, перебросьте бросок ранения, равный 1.',
      'Evade and Survive':
        'В фазе перемещения вашего оппонента, если вражеский юнит завершает манёвр в пределах 8" от этого юнита, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, этот юнит может совершить обычный манёвр до 6".',
    },
    loadout: `${EQUIP_THIS} combi-weapon; paired combat blades.`,
  },

  'marneus-calgar-in-armour-of-antilochus': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Калгар', 'Марней Калгар'],
    flavor:
      'И вдохновляющий вождь, и непревзойдённый воин, Марней Калгар идёт в бой, облачённый в Armour of Antilochus. Стирая полчища врагов залпами болтерных снарядов из Gauntlets of Ultramar и разрывая всякого, кто по глупости встал перед ним, он — зодчий разрушения, чей дар великой стратегии неоспорим.',
    abilities: {
      'Inspiring Leader':
        'Этот юнит может стрелять и объявлять нападение в ход, в который он продвигался или отступал.',
      'Master Tactician':
        'В начале вашей фазы командования, если эта модель — ваш WARLORD и находится на поле боя, вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} 1 Gauntlets of Ultramar.`,
    leader: { text: LEADER_TEXT },
  },

  'outrider-squad': {
    flavor:
      'Outrider Squad продвигаются впереди основных линий космодесанта, прикрывают фланги крупных построений и выслеживают вражеских лазутчиков. Когда завязывается бой, они проводят молниеносные наскоки на укреплённые позиции и настигают тех, кто пытается уйти от мести Ордена.',
    abilities: {
      'Thunderous Impact':
        'Каждый раз, когда модель этого юнита совершает атаку ближнего боя, если этот юнит совершил манёвр нападения в этот ход, улучшите характеристики Силы (Strength) и Урона (Damage) этой атаки на 1.',
    },
    loadout:
      '**Outrider Sergeant и каждый Outrider вооружены:** heavy bolt pistol; twin bolt rifle; Astartes chainsword.\n\n**Invader ATV вооружён:** bolt pistol; twin bolt rifle; onslaught gatling cannon; close combat weapon.',
    options: [
      'onslaught gatling cannon у Invader ATV можно заменить на 1 multi-melta.',
    ],
  },

  'pedro-kantor': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Кантор', 'Педро Кантор'],
    flavor:
      'Педро Кантор — превосходный боец и вдохновляющий вождь. Магистр Ордена Кровавых Кулаков выкашивает вражескую пехоту из Dorn’s Arrow, разрывая её градом масс-реактивных болтов. Тех, кто совершает ошибку, подойдя слишком близко — будь то боевой танк или пехотинец, — он крушит громовыми ударами Fist of Retribution.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах STERNGUARD VETERAN SQUAD из вашей армии имеют характеристику Objective Control (OC) 2, пока они не подвержены боевому шоку.',
      'Oath of Rynn':
        'Один раз за битву, в начале фазы командования любого игрока, эта модель может задействовать эту способность. Когда она это делает, до конца хода прибавьте 1 к характеристике Атак (Attacks) оружия моделей юнита этой модели.',
      'To the Last': TACTICAL_PRECISION,
    },
    special: {
      'CRIMSON FISTS':
        'Эта модель из Ордена Crimson Fists, преемника Imperial Fists. Для всех целей правил она считается моделью Imperial Fists, но её нельзя включить в армию, которая включает любые другие модели Imperial Fists Epic Hero.',
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Sternguard Veteran Squad из вашей армии имеют характеристику Контроля целей (OC) 2, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} Dorn’s Arrow; Fist of Retribution.`,
    leader: { text: LEADER_TEXT },
  },

  'predator-annihilator': {
    flavor:
      'Predator Annihilator превосходно ведут бронированные наконечники, двигаясь на высокой скорости и не переставая вести огонь. Их экипажи гордятся особенно свирепыми машинными духами и с радостью врываются в самую гущу боя, чтобы разнести вражеские бронеколонны и плотные бункерные комплексы.',
    abilities: {
      Annihilator:
        'Каждый раз, когда дальнобойная атака этой модели распределяется по модели MONSTER или VEHICLE, вы можете перебросить бросок урона.',
    },
    loadout: `${EQUIP_THIS} Predator twin lascannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'predator-destructor': {
    flavor:
      'Predator Destructor служат Императору более десяти тысяч лет с непоколебимой стойкостью, доказывая себя истреблением полчищ вражеской пехоты, срывом штурмов и опустошением лёгкой техники. Для вечно уступающего в числе космодесанта их огневая мощь издавна незаменима.',
    abilities: {
      Destructor:
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту INFANTRY, улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1.',
    },
    loadout: `${EQUIP_THIS} Predator autocannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  razorback: {
    flavor:
      'Razorback заменяет часть транспортной вместимости Rhino башней с тяжёлым оружием и обеспечивает огневую поддержку бронированным пехотным штурмам, доставляя при этом на бой собственный груз воинов. Он столь успешен, что во многих Орденах выполняет и дополнительные роли, в частности как мобильный командный центр.',
    abilities: {
      'Fire Support':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественная модель, что высадилась из этого TRANSPORT в этот ход, совершает атаку по этому вражескому юниту, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; armoured tracks.`,
    options: [
      'twin heavy bolter этой модели можно заменить на 1 twin lascannon.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR или TACTICUS (исключая модели TACTICUS CHARACTER, что начали битву присоединёнными к юниту, не являющемуся TACTICUS).',
  },

  'redemptor-dreadnought': {
    flavor:
      'Redemptor Dreadnought — одни из крупнейших в своём роде, что когда-либо выставлял Adeptus Astartes. Вооружённые до зубов, они могут быть снаряжены так, чтобы полностью уничтожить практически любую цель на поле боя градом снарядов или перегретой плазмой.',
    abilities: {
      'Duty Eternal': DAMAGE_MINUS1,
    },
    loadout: `${EQUIP_THIS} Twin fragstorm grenade launcher; heavy flamer; heavy onslaught gatling cannon; Redemptor fist.`,
    options: [
      'Эту модель можно снабдить 1 Icarus rocket pod.',
      'heavy flamer этой модели можно заменить на 1 onslaught gatling cannon.',
      'heavy onslaught gatling cannon этой модели можно заменить на 1 macro plasma incinerator.',
      'twin fragstorm grenade launcher этой модели можно заменить на 1 twin storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'reiver-squad': {
    flavor:
      'Войска ужаса быстрой высадки, Reiver Squad часто развёртываются на грави-парашютах и направляющих плоскостях, приземляясь с безукоризненной точностью. Действуя почти в совершенной скрытности, чтобы достичь идеальной точки удара, они, когда готовы, обрушивают свою ярость, устремляясь вперёд с усиленным гортанным рёвом и залпами огня.',
    abilities: {
      'Fearsome Assault':
        'В начале фазы ближнего боя каждый вражеский юнит в дистанции ввязывания одного или более юнитов с этой способностью обязан пройти проверку боевого шока, вычтя 1 из этой проверки.',
      'Terror Troops (Aura)':
        'Пока вражеский юнит (исключая MONSTER и VEHICLE) находится в пределах 3" от одного или более юнитов с этой способностью, вычтите 1 из характеристики Контроля целей (OC) моделей этого вражеского юнита.',
    },
    wargear: {
      'Grapnel Launcher':
        'Каждый раз, когда юнит носителя совершает обычный манёвр, продвижение, отступление или манёвр нападения, игнорируйте любое вертикальное расстояние при определении общего расстояния, на которое носитель может быть перемещён в этом манёвре.',
      'Reiver Grav-chute': 'Носитель имеет способность Deep Strike.',
    },
    loadout: `${EQUIP_EVERY} special issue bolt pistol; combat knife.`,
    options: [
      'Всем моделям этого юнита их combat knife можно заменить на 1 bolt carbine и 1 close combat weapon.',
      'Если Reiver Sergeant вооружён 1 bolt carbine, его можно снабдить 1 combat knife.',
      'Каждую модель этого юнита можно снабдить 1 Reiver grav-chute.',
      'Каждую модель этого юнита можно снабдить 1 grapnel launcher.',
    ],
  },

  repulsor: {
    flavor:
      'Одетый в передовую броневую обшивку и вооружённый под любую боевую ситуацию, Repulsor не только безопасно доставляет пассажиров, но и обеспечивает превосходную огневую поддержку. Опасная местность ему почти не помеха: его брюшные плиты направляют гравитационные энергии, что дробят препятствия под массой машины.',
    abilities: {
      'Emergency Combat Embarkation':
        'Один раз за ход, в фазе нападения вашего оппонента, после того как вражеский юнит выбрал цели для своего нападения, но до того как он совершит манёвр нападения, вы можете выбрать один юнит ADEPTUS ASTARTES из вашей армии, который был выбран целью этого нападения. Если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов и каждая его модель находится в пределах 3" от этого TRANSPORT, он может погрузиться в этот TRANSPORT. Затем нападающий юнит может выбрать новые цели для своего нападения.',
    },
    loadout: `${EQUIP_THIS} heavy onslaught gatling cannon; hunter-slayer missile; Repulsor defensive array; twin heavy bolter; armoured hull.`,
    options: [
      'twin heavy bolter этой модели можно заменить на 1 twin lascannon.',
      'heavy onslaught gatling cannon этой модели можно заменить на 1 las-talon.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 14 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'repulsor-executioner': {
    flavor:
      'Основанный на шасси Repulsor, Repulsor Executioner жертвует частью транспортной вместимости ради мощного башенного оружия. Даже крупнейшие боевые танки может искалечить луч heavy laser destroyer, а испепеляющие залпы macro plasma incinerator способны стереть пехотные построения.',
    abilities: {
      Executioner:
        'Каждый раз, когда эта модель совершает атаку по юниту, который ниже половинной численности, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} heavy onslaught gatling cannon; macro plasma incinerator; Repulsor Executioner defensive array; twin heavy bolter; twin Icarus ironhail heavy stubber; armoured hull.`,
    options: [
      'macro plasma incinerator этой модели можно заменить на 1 heavy laser destroyer.',
      'Эту модель можно снабдить 1 ironhail heavy stubber.',
      'Эту модель можно снабдить 1 Icarus rocket pod.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 7 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  rhino: {
    flavor:
      'Транспорт Rhino служит космодесанту десять тысяч лет и входит во многие их ударные силы. С надёжными системами самопочинки Rhino — крепкая машина, что способна быстро пройти кошмарные поля боя, чтобы доставить свой смертоносный груз космодесантников в самое сердце битвы.',
    abilities: {
      'Self Repair': 'В конце вашей фазы командования эта модель восстанавливает 1 потерянную рану.',
    },
    loadout: `${EQUIP_THIS} storm bolter; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR или TACTICUS (исключая модели TACTICUS CHARACTER, что начали битву присоединёнными к юниту, не являющемуся TACTICUS).',
  },

  'roboute-guilliman': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Жиллиман', 'Гиллиман', 'Жиля', 'Робуте', 'Жилиман'],
    flavor:
      'В одной руке Жиллимана пылает горящий Emperor’s Sword. Другая закована в Hand of Dominion — латную перчатку, которой Жиллиман разрывает танки. Но величайшее его оружие — стратегический блеск: его враги переиграны и передуманы ещё до того, как битва началась.',
    abilities: {
      'Author of the Codex':
        'В начале вашей фазы командования выберите две способности Author of the Codex (см. слева). До начала вашей следующей фазы командования эта модель имеет эти способности.',
      'Ultramarines Bodyguard':
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов ADEPTUS ASTARTES INFANTRY, она имеет способность Lone Operative.',
      'Armour of Fate':
        'Когда эта модель уничтожается впервые, бросьте один D6 в конце фазы: на 3+ снова поставьте эту модель на поле боя как можно ближе к месту, где она была уничтожена, и не в дистанции ввязывания каких-либо вражеских моделей, с 6 оставшимися ранами.',
    },
    special: {
      'Primarch of the XIII (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от этой модели, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита, и вы можете перебрасывать проверки боевого шока и лидерства для этого юнита.',
      'Master of Battle':
        'В начале вашей фазы командования, после того как вы выбрали цель Oath of Moment, выберите второй вражеский юнит. До начала вашей следующей фазы командования, если ваша цель Oath of Moment уничтожена, этот второй вражеский юнит становится вашей целью Oath of Moment, пока вы не выберете новую.',
      'Supreme Strategist':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда дружественный юнит ADEPTUS ASTARTES в пределах 12" от этой модели выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.',
    },
    loadout: `${EQUIP_THIS} Hand of Dominion; Emperor’s Sword.`,
  },

  'scout-squad': {
    flavor:
      'Неофиты космодесанта, Scout постигают своё смертоносное ремесло в дерзких заданиях в отрыве от основных сил. Ведомые опытными сержантами-ветеранами, они проникают на вражеские позиции, зачищают возможные зоны высадки, устраивают засады, срывают линии снабжения и выполняют всевозможные иные задачи, чтобы ослабить врага.',
    abilities: {
      'Guerrilla Tactics':
        'В конце хода вашего оппонента, если этот юнит находится дальше 6" от всех вражеских моделей, вы можете убрать его с поля боя и поместить в Strategic Reserves.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: [
      'boltgun у Scout Sergeant можно заменить на 1 Astartes chainsword.',
      'Любому числу моделей их boltgun можно заменить на одно из следующего:\n▪ 1 Astartes shotgun\n▪ 1 combat knife',
      'За каждые 5 моделей в этом юните у 1 Scout его boltgun можно заменить на 1 Scout sniper rifle.',
      'За каждые 5 моделей в этом юните у 1 Scout его boltgun можно заменить на одно из следующего:\n▪ 1 heavy bolter\n▪ 1 missile launcher',
    ],
  },

  'sternguard-veteran-squad': {
    flavor:
      'Sternguard Veteran обладают непоколебимым спокойствием и славятся среди братьев образцовой меткостью в самых свирепых битвах. Искусные во всём дальнобойном оружии Ордена, они всегда там, где их прицельные залпы лучше всего сокрушат врага.',
    abilities: {
      'Sternguard Focus':
        'Каждый раз, когда модель этого юнита совершает атаку по вашей цели Oath of Moment, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_EVERY} Sternguard bolt pistol; Sternguard bolt rifle; close combat weapon.`,
    options: [
      'Sternguard bolt rifle у Sternguard Veteran Sergeant можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 combi-weapon\n▪ 1 power weapon\n▪ 1 power fist\n▪ 1 Astartes chainsword и 1 Sternguard bolt rifle*\n▪ 1 power weapon и 1 Sternguard bolt rifle*\n▪ 1 power fist и 1 Sternguard bolt rifle*\n* Sternguard bolt rifle этой модели после этого заменить нельзя.',
      'Любому числу Sternguard Veteran их Sternguard bolt rifle можно заменить на 1 combi-weapon.',
      'За каждые 5 моделей в этом юните у 1 Sternguard Veteran его Sternguard bolt rifle можно заменить на одно из следующего:\n▪ 1 pyrecannon\n▪ 1 Sternguard heavy bolter',
      '* Sternguard bolt rifle этой модели заменить нельзя.',
    ],
  },

  'storm-speeder-hailstrike': {
    flavor:
      'Hailstrike вооружён столь тяжело, что способен уничтожать целые полосы пехоты залпами испепеляющих снарядов. Проносясь над полем боя, его специализированное вооружение разбивает нападающие построения и рвёт баррикады и укрепления.',
    abilities: {
      Hailstrike:
        'Каждый раз, когда эта модель отстрелялась, выберите один вражеский юнит (исключая MONSTER и VEHICLE), поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественный юнит ADEPTUS ASTARTES совершает дальнобойную атаку по этому вражескому юниту, улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1. Один и тот же вражеский юнит может быть затронут этой способностью только один раз за фазу.',
    },
    loadout: `${EQUIP_THIS} 2 fragstorm grenade launchers; onslaught gatling cannon; twin ironhail heavy stubber; close combat weapon.`,
  },

  'storm-speeder-hammerstrike': {
    flavor:
      'Hammerstrike превосходно выкуривает врагов из траншейных и бункерных сетей. Проносясь низко над полем боя, он применяет жгучие мельта-залпы и залпы ракет, чтобы взломать линии обороны врага настежь.',
    abilities: {
      Hammerstrike:
        'Каждый раз, когда эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы этот вражеский юнит не может иметь Benefit of Cover.',
    },
    loadout: `${EQUIP_THIS} Hammerstrike missile launcher; 2 krakstorm grenade launchers; melta destroyer; close combat weapon.`,
  },

  'storm-speeder-thunderstrike': {
    flavor:
      'Thunderstrike переигрывают врага на каждом ходу, целясь в уязвимые места брони, топливные баки и ракетные боеукладки, чтобы обратить танки в бушующие огненные шары. Всего один Thunderstrike способен сорвать бронированный прорыв, и пока он на поле боя, мало кто из врагов в безопасности.',
    abilities: {
      Thunderstrike:
        'Каждый раз, когда эта модель отстрелялась, выберите один вражеский юнит MONSTER или VEHICLE, поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественный юнит ADEPTUS ASTARTES совершает дальнобойную атаку по этому вражескому юниту, прибавьте 1 к броску ранения.',
    },
    loadout: `${EQUIP_THIS} stormfury missiles; Thunderstrike las-talon; twin Icarus rocket pod; close combat weapon.`,
  },

  'stormhawk-interceptor': {
    flavor:
      'Stormhawk Interceptor — высотные истребители, созданные исключительно для достижения господства в воздухе. Сброшенные с маг-люлек орбитальных кораблей, эти одетые в керамит машины ввязываются в жестокие воздушные бои с вражеской авиацией и защищены средствами противодействия, что выстреливают пылающие ловушки.',
    abilities: {
      Interceptor:
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, что может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} twin assault cannon; skyhammer missile launcher; las-talon; armoured hull.`,
    options: [
      'skyhammer missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 typhoon missile launcher',
      'las-talon этой модели можно заменить на 1 Icarus stormcannon.',
    ],
  },

  'stormraven-gunship': {
    flavor:
      'Stormraven превосходно сочетает роль надёжного боевого десантного корабля и смертоносного воздушного бойца. Вместительный десантный отсек и толстые слои брони позволяют ему эффективно перевозить отряды космодесанта — а благодаря магна-захватам даже Dreadnought — в самое сердце битвы.',
    abilities: {
      'Armoured Resilience': DAMAGE_MINUS1,
    },
    loadout: `${EQUIP_THIS} 2 stormstrike missile launchers; twin assault cannon; typhoon missile launcher; armoured hull.`,
    options: [
      'twin assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy plasma cannon\n▪ 1 twin lascannon',
      'typhoon missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta',
      'Эту модель можно снабдить 2 hurricane bolters.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY и 1 модель Dreadnought. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'stormtalon-gunship': {
    flavor:
      'Быстрый и маневренный, Stormtalon — воздушный перехватчик, оптимизированный для сопровождения Stormraven Gunship. Достаточно быстрый для воздушного боя, его пилот может включить репульсорные системы Stormtalon, делая его достаточно проворным, чтобы плотно поддерживать пехоту в обороне или атаке.',
    abilities: {
      'Strafing Run':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, что не может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} skyhammer missile launcher; twin assault cannon; armoured hull.`,
    options: [
      'skyhammer missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon\n▪ 1 typhoon missile launcher',
    ],
  },

  'suboden-khan': {
    flavor:
      'Истинный сын Чогориса, Субоден Хан ведёт Первое Братство Белых Шрамов из седла своего грави-байка по имени Thunder. Мастер кавалерийской войны, он ведёт свои силы в эпических гонах и стремительных бросках, проламывая вражеские линии и безжалостно настигая бегущих врагов.',
    abilities: {
      'Spear of Chogoris':
        'Юнит этой модели может стрелять и объявлять нападение в ход, в который он продвигался или отступал. Если этот юнит и так может стрелять и объявлять нападение в ход, в который он продвигался, то вместо этого прибавьте 1 к броскам продвижения и нападения для этого юнита.',
      'Skilled Riders':
        'Каждый раз, когда модель юнита этой модели совершает обычный манёвр, продвижение, отступление или манёвр нападения, она может двигаться по горизонтали сквозь элементы ландшафта.',
    },
    loadout: `${EQUIP_THIS} 1 heavy bolt pistol; 1 onslaught gatling cannon; Stormtooth; power sword.`,
    leader: { text: LEADER_TEXT },
  },

  'suppressor-squad': {
    flavor:
      'Одетые в броню, что выдерживает свирепую отдачу их оружия и страшные перегрузки грави-спусков, Suppressor быстро занимают ключевые позиции на поле боя. Оттуда они обрушивают потоки бронебойных снарядов, что децимируют вражескую пехоту и заставляют уцелевших нырять в укрытие.',
    abilities: {
      'Suppression Fire':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит, поражённый одной или более из этих атак, сделанных accelerator autocannon. До начала вашего следующего хода, пока этот юнит на поле боя, этот вражеский юнит подавлен. Пока юнит подавлен, каждый раз, когда его модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_EVERY} accelerator autocannon; bolt pistol; close combat weapon.`,
  },

  'tactical-squad': {
    flavor:
      'Tactical Squad десять тысяч лет составляют костяк Орденов космодесанта. Имея доступ к широкому набору оружия, они выжигают полосы вражеской пехоты, вычищают поля боя от тяжелобронированных врагов или пробивают горящие дыры в танках.',
    abilities: {
      'Combat Squads':
        'В начале шага Declare Battle Formations, до того как какие-либо юниты развёрнуты, этот юнит можно разделить на два юнита, каждый по пять моделей.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: [
      'boltgun у 1 Tactical Marine можно заменить на одно из следующего:\n▪ 1 flamer\n▪ 1 heavy bolter\n▪ 1 grav-cannon\n▪ 1 grav-gun\n▪ 1 lascannon\n▪ 1 meltagun\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon\n▪ 1 plasma gun',
      'boltgun у 1 Tactical Marine можно заменить на одно из следующего:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 meltagun\n▪ 1 plasma gun',
      'bolt pistol и boltgun у Tactical Sergeant можно заменить на 1 twin lightning claws либо на два разных оружия из следующего списка:*\n▪ 1 Astartes chainsword\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* Эта модель может быть вооружена только двумя дальнобойными оружиями, если одно из них — Pistol (и только одним Pistol).',
      '* Эта модель может быть вооружена двумя дальнобойными оружиями, только если одно из них — Pistol (и у неё может быть лишь один Pistol).',
    ],
  },

  techmarine: {
    flavor:
      'Techmarine беззаветно шагают сквозь встречный огонь, чтобы успокоить машинные духи израненных боевых машин, ловко отгибая повреждённые броневые плиты, чтобы починить перегоревшую проводку, и выправляя покорёженные панели своими сервоприводами и механодендритами.',
    abilities: {
      Techmarine:
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов ADEPTUS ASTARTES VEHICLE, она имеет способность Lone Operative.',
      'Blessing of the Omnissiah':
        'В вашей фазе командования вы можете выбрать одну дружественную модель ADEPTUS ASTARTES VEHICLE в пределах 3" от этой модели. Эта модель восстанавливает до D3 потерянных ран и, до начала вашей следующей фазы командования, каждый раз, когда эта модель Vehicle совершает атаку, прибавьте 1 к броску попадания. Каждую модель можно выбрать для этой способности только один раз за ход.',
      'Vengeance of the Omnissiah':
        'Если дружественная модель ADEPTUS ASTARTES VEHICLE уничтожена в пределах 12" от этой модели, до конца битвы Omnissian power axe этой модели имеет характеристику Атак (Attacks) 7.',
    },
    loadout: `${EQUIP_THIS} forge bolter; grav-pistol; Omnissian power axe; servo-arm.`,
    leader: { text: LEADER_TEXT },
  },

  'terminator-assault-squad': {
    flavor:
      'Terminator Assault Squad вооружены сокрушительным оружием ближнего боя, идеальным для свирепых штурмов и жестоких абордажей. Они бросаются на величайших воинов врага, кромсая их lightning claws или дробя черепа thunder hammer.',
    abilities: {
      'Teleport Homer':
        'В начале битвы вы можете поставить один жетон Teleport Homer для этого юнита где угодно на поле боя вне зоны развёртывания вашего оппонента. Если вы это делаете, один раз за битву вы можете нацелить на этот юнит стратагему Rapid Ingress за 0 CP, но при отыгрыше этой стратагемы вы обязаны развернуть этот юнит в пределах 3" по горизонтали от этого жетона и не в пределах 8" по горизонтали от любых вражеских моделей. Затем этот жетон убирается.',
      'Terminatus Assault':
        'В начале фазы ближнего боя каждый вражеский юнит в дистанции ввязывания этого юнита обязан пройти проверку боевого шока.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.',
    },
    loadout: `${EQUIP_EVERY} thunder hammer; storm shield.`,
    options: [
      'Любому числу моделей их thunder hammer и storm shield можно заменить на 1 twin lightning claws.',
    ],
  },

  'terminator-squad': {
    flavor:
      'Броня Terminator — чудо технологии, что позволяет носителю пережить что угодно, от перегрузок телепортации до сотрясающих землю артобстрелов. Так снаряжённые, Terminator Squad могут возникать в гуще врага или неудержимо шагать к нему через поле, не переставая вести огонь.',
    abilities: {
      'Teleport Homer':
        'В начале битвы вы можете поставить один жетон Teleport Homer для этого юнита где угодно на поле боя вне зоны развёртывания вашего оппонента. Если вы это делаете, один раз за битву вы можете нацелить на этот юнит стратагему Rapid Ingress за 0 CP, но при отыгрыше этой стратагемы вы обязаны развернуть этот юнит в пределах 3" по горизонтали от этого жетона и не в пределах 8" по горизонтали от любых вражеских моделей. Затем этот жетон убирается.',
      'Fury of the First':
        'Каждый раз, когда модель этого юнита совершает атаку по вашей цели Oath of Moment, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_EVERY} storm bolter; power fist.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Terminator его storm bolter можно заменить на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 cyclone missile launcher и 1 storm bolter.*\n* storm bolter этой модели после этого заменить нельзя.',
      'Любому числу моделей их power fist можно заменить на 1 chainfist.',
      'power fist у Terminator Sergeant можно заменить на 1 power weapon.',
      '* storm bolter этой модели заменить нельзя.',
    ],
  },

  'thunderhawk-gunship': {
    flavor:
      'Thunderhawk Gunship с отличием служат космодесанту со времён Великого крестового похода, сочетая роли орбитального десантного корабля, тяжёлого штурмовика и среднего бомбардировщика. Для своих размеров Thunderhawk вооружены грозно: главное орудие происходит от кораблей класса «фрегат», плюс множество дополнительного оружия.',
    abilities: {
      'Aerial Assault':
        'Каждый раз, когда юнит со способностью Deep Strike высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    wargear: {
      'Thunderhawk Cluster Bombs':
        'Каждый раз, когда носитель завершает обычный манёвр, вы можете выбрать один вражеский юнит, над которым он прошёл в этом манёвре, и бросить шесть D6: за каждый 3+ этот юнит получает 1 смертельную рану.',
    },
    loadout: `${EQUIP_THIS} 2 lascannons; Thunderhawk heavy cannon; 4 twin heavy bolters; armoured hull; Thunderhawk cluster bombs.`,
    options: [
      'Thunderhawk heavy cannon этой модели можно заменить на 1 turbo-laser destructor.',
      'Thunderhawk cluster bombs этой модели можно заменить на 1 hellstrike missile battery.',
    ],
    damaged: { note: 'осталось 1–10 ран', text: dmgHitMinus('1–10') },
    transport:
      'Эта модель имеет транспортную вместимость 30 моделей Adeptus Astartes Infantry или Adeptus Astartes Mounted. Каждая модель Jump Pack, Wulfen, Gravis или Terminator занимает место 2 моделей. Каждая модель Centurion занимает место 3 моделей. Каждая модель MOUNTED занимает место 4 моделей.',
  },

  'tor-garadon': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Гарадон', 'Тор Гарадон'],
    flavor:
      'Выстрел за выстрелом отскакивают от несокрушимых лат брони Gravis Тора Гарадона, пока он продвигается по полю боя. Остроумный и с талантом к импровизированной войне, Гарадон направляет смертоносный огонь своих воинов сочетанием природного мастерства и передовых данных наведения, что подаёт ему его signum-массив.',
    abilities: {
      'Signum Array':
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [IGNORES COVER].',
      'Siege Captain':
        'Каждый раз, когда эта модель совершает атаку по юниту MONSTER, VEHICLE или FORTIFICATION, улучшите характеристики Силы (Strength), Пробития брони (Armour Penetration) и Урона (Damage) этой атаки на 2.',
    },
    loadout: `${EQUIP_THIS} artificer grav-gun; Hand of Defiance.`,
    leader: { text: LEADER_TEXT },
  },

  'uriel-ventris': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Вентрис', 'Уриэль Вентрис'],
    flavor:
      'Умелый воин и мастерский вождь, Уриэль Вентрис — один из способнейших командиров Ультрамаринов, пусть и вольнодумец. Прослужив в Deathwatch, прежде чем стать капитаном, он впитал стратегии братьев из множества других Орденов, что дало ему широту тактического чутья, превосходящую многих его собратьев.',
    abilities: {
      'Unorthodox Strategist':
        'Один раз за ход, когда ваш оппонент выбирает целью стратагемы юнит из своей армии в пределах 12" от этой модели, эта модель может задействовать эту способность. Если она это делает, увеличьте стоимость этого применения этой стратагемы на 1 CP.',
      'Master of the Fleet':
        'На шаге Declare Battle Formations, если ваша армия включает эту модель, выберите один юнит PHOBOS, GRAVIS или TACTICUS ADEPTUS ASTARTES INFANTRY из вашей армии. Этот юнит получает способность Deep Strike.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Invictus; Sword of Idaeus.`,
    leader: { text: LEADER_TEXT },
  },

  'vanguard-veteran-squad-with-jump-packs': {
    flavor:
      'На поле боя Vanguard Veteran Squad с jump pack — непревзойдённые войска быстрого реагирования и тараны линий. С огромными шлейфами огня за спиной они прибывают в идеальное время и место, чтобы обеспечить решительность штурма или наглухо сломить вражеский прорыв.',
    abilities: {
      'Vanguard Assault':
        'Каждый раз, когда этот юнит завершает манёвр нападения, до конца хода оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
    },
    wargear: {
      'Storm Shield': INV4,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; Vanguard Veteran weapon.`,
    options: [
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 storm shield\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'Всем моделям их bolt pistol и Vanguard Veteran weapon можно заменить на 1 Heavy Bolt Pistol и 1 Master-crafted Power Weapon.',
      'За каждые 5 моделей этого юнита 1 модель может заменить свой Heavy Bolt Pistol на 1 plasma pistol.',
    ],
  },

  'victrix-honour-guard': {
    flavor:
      'Состоящая из ветеранов Первой роты, что являют выверенное государственное искусство и непревзойдённое владение оружием, Victrix Honour Guard служат телохранителями старших офицеров Ордена. Избранные за самоотверженность в бою, воины Victrix Honour Guard с радостью отдадут жизни, защищая своих подопечных.',
    abilities: {
      'Ultramarines Honour Guard':
        'Пока модель Captain или Chapter Master возглавляет этот юнит, каждый раз, когда атака нацеливается на этот юнит, вычтите 1 из броска ранения.',
      'Glory of Ultramar':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если модель этого юнита была уничтожена этими атаками, этот юнит может совершить рывок (surge move) до D6".',
    },
    wargear: {
      'Banner of Macragge':
        'Один раз за битву, в начале фазы ближнего боя, носитель может задействовать эту способность. Если он это делает, до конца фазы прибавьте 1 к характеристикам Силы (Strength) и Атак (Attacks) оружия ближнего боя моделей юнита носителя.',
    },
    special: {
      'ATTACHED UNIT':
        'Если юнит Captain или Chapter Master из вашей армии можно присоединить к юниту Company Heroes, его можно вместо этого присоединить к этому юниту.',
    },
    loadout:
      '**Chapter Ancient вооружён:** 1 master-crafted power weapon; banner of Macragge.\n\n**Chapter Champion вооружён:** 1 blades of honour.\n\n**Каждая модель Victrix Honour Guard вооружена:** 1 master-crafted bolt carbine; 1 master-crafted power weapon.',
  },

  vindicator: {
    flavor:
      'Vindicator — специализированный осадный танк. Он способен смести препятствия своим массивным щитом, вкатываясь на идеальную огневую позицию, чтобы пустить в ход demolisher cannon — оружие столь разрушительное, что оно с ужасающей лёгкостью разносит вражеские укрепления, уничтожает колонны пехоты и разбивает бронированные танки.',
    abilities: {
      'Siege Shield':
        'При совершении дальнобойных атак своим demolisher cannon эта модель может нацеливаться на вражеские юниты в своей дистанции ввязывания (при условии, что никакие другие дружественные юниты также не находятся в дистанции ввязывания этого вражеского юнита). Кроме того, при совершении дальнобойных атак эта модель не получает штраф к своим броскам попадания за нахождение в дистанции ввязывания одного или более вражеских юнитов.',
    },
    loadout: `${EQUIP_THIS} demolisher cannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'vulkan-hestan': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Хестан', 'Вулкан Хестан'],
    flavor:
      'Вступая в бой с оружием своего примарха в руках, Forgefather повергает всех, кто ему противостоит. Искатель утраченных реликвий Вулкана, Хестан неустанен в своих поисках, готов пробиться сквозь любого врага и встретить любую опасность, лишь бы исполнить свои клятвы.',
    abilities: {
      'Inspiring Commander':
        'Если вы включаете эту модель в свою армию, до конца битвы модели без ключевого слова CHARACTER в юнитах INFERNUS SQUAD из вашей армии имеют характеристику Objective Control (OC) 2, пока они не подвержены боевому шоку.',
      Forgefather:
        'В вашей фазе стрельбы выберите один вражеский юнит в пределах 24" от этой модели и видимый ей. До конца фазы каждый раз, когда дружественная модель ADEPTUS ASTARTES совершает дальнобойную атаку оружием Torrent или Melta по этому вражескому юниту, вы можете перебросить бросок ранения.',
      'Seeker of the Unfound':
        'Когда эта модель впервые ставится на поле боя, выберите один маркер цели на поле боя. Пока эта модель находится в радиусе этого маркера цели, она имеет характеристику Контроля целей (OC) 10, характеристику Лидерства (Leadership) 5+ и способность Feel No Pain 4+.',
    },
    special: {
      'INSPIRING COMMANDER':
        'Если вы включаете эту модель в свою армию, до конца битвы модели, не являющиеся CHARACTER, в юнитах Infernus Squad из вашей армии имеют характеристику Контроля целей (OC) 2, пока они не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} 1 bolt pistol; 1 Gauntlet of the Forge; 1 Spear of Vulkan.`,
    leader: { text: LEADER_TEXT },
  },

  'wardens-of-ultramar': {
    flavor:
      'Хотя обычно они рассеяны по командным звеньям армий капитана Тита, его ближайшие советники и соратники, когда того требует обстановка, сражаются бок о бок как одно целое. В такие мгновения они сплавляют трансчеловеческую мощь, вдохновляющее величие, боевое мастерство, псионическую силу и чистую хитрость в могучий сплав, что больше суммы своих частей.',
    abilities: {
      'Second Company Banner':
        'Пока этот юнит содержит Ancient Gadriel, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита. Пока этот юнит содержит Ancient Gadriel и Captain Titus, также улучшите характеристику Лидерства (Leadership) моделей этого юнита на 1.',
      'Strategium Command':
        'После того как оба игрока развернули свои армии, если этот юнит на поле боя (или любой TRANSPORT, в который он погружён, на поле боя), выберите до трёх юнитов ADEPTUS ASTARTES из вашей армии и переразверните их. При этом вы можете поместить эти юниты в Strategic Reserves, независимо от того, сколько юнитов уже в Strategic Reserves.',
    },
    wargear: {
      'Refractor Field': INV5,
      'Storm Shield': INV4,
    },
    loadout:
      '**Ancient Gadriel вооружён:** bolt rifle; close combat weapon.\n\n**Veteran Sergeant Metaurus вооружён:** heavy bolt pistol; master-crafted power weapon; storm shield.\n\n**Gaius Silva вооружён:** archeotech laspistol; power weapon; refractor field.\n\n**Aemelia Minervas вооружена:** archeotech laspistol; power weapon.\n\n**Dainal Kornelius вооружён:** Astropathic Blast; force stave.\n\n**Lucia Vestha вооружена:** archeotech laspistol; close combat weapon.',
    leader: { text: LEADER_TEXT, footer: '* Этот юнит не может присоединиться к Attached-юниту, и только CAPTAIN TITUS может присоединиться к юниту, к которому присоединился этот юнит.' },
  },

  whirlwind: {
    flavor:
      'Град ракет насыщает землю всякий раз, когда бьёт Whirlwind, создавая ковёр взрывов, что швыряет во все стороны смертоносную шрапнель или обжигающее пламя. Whirlwind ведёт огонь со скрытых позиций в поддержку атак космодесанта, используя свою скорость, чтобы поспевать за штурмом.',
    abilities: {
      'Pinning Bombardment':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, если одна или более из этих атак, сделанных её Whirlwind vengeance launcher, поразили вражеский юнит INFANTRY, этот юнит обязан пройти проверку боевого шока.',
    },
    loadout: `${EQUIP_THIS} Whirlwind vengeance launcher; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  // Warhammer Legends, from the Faction Pack v1.2 (see `source: "faction-pack"` in the EN file).
  'ferren-areios': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Феррен Арейос', 'Арейос'],
    flavor:
      'Феррен Арейос — грозный боевой лидер, заслуживший доверие и уважение своего примарха в кровавых боях Индомитского крестового похода. Ныне возведённый в ранг капитана 6-й роты, он ведёт своих боевых братьев с отвагой и честью, врубаясь в самую гущу схватки с thunder hammer в руках.',
    abilities: {
      'Master of Rites':
        'В вашей фазе командования выберите одно из следующего, что действует на юнит этой модели до конца хода:\n▪ Юнит этой модели может стрелять в ход, в который он продвигался.\n▪ Юнит этой модели может объявлять нападение в ход, в который он продвигался.\n▪ Юнит этой модели может стрелять и объявлять нападение в ход, в который он отступал.',
      'Unrelenting and Uncompromising':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, вы можете игнорировать любые или все модификаторы характеристик Навыка стрельбы (BS) или Навыка ближнего боя (WS) этой атаки и/или все модификаторы броска попадания.',
    },
    loadout: `${EQUIP_THIS} heavy bolt pistol; relic thunder hammer.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'land-raider-helios': {
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} 2 godhammer lascannons; Helios launcher; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION — место 3 моделей.',
  },

  'mortis-dreadnought': {
    abilities: {
      'Mortis Strike':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, который не ниже половинной численности, вы можете перебросить бросок попадания.',
    },
    loadout: `${EQUIP_THIS} 2 twin heavy bolters; armoured feet.`,
    options: ['2 twin heavy bolters этой модели можно заменить на одно из следующего:\n▪ 2 assault cannons\n▪ 2 Dreadnought inferno cannons\n▪ 2 heavy plasma cannons\n▪ 2 missile launchers\n▪ 2 multi-meltas\n▪ 2 twin autocannons\n▪ 2 twin lascannons'],
  },

  'deimos-predator': {
    abilities: {
      'Armoured Spearhead':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту, перебросьте бросок попадания, равный 1, и, если этот юнит находится в радиусе маркера цели, который вы не контролируете, вы можете вместо этого перебросить бросок попадания.',
    },
    wargear: {
      Conversion:
        'Каждый раз, когда этим оружием совершается атака, если цель находится более чем в 12" от носителя, немодифицированный успешный бросок попадания 4+ считается критическим попаданием.',
    },
    loadout: `${EQUIP_THIS} plasma destroyer; armoured tracks.`,
    options: [
      'plasma destroyer этой модели можно заменить на одно из следующего:\n▪ 1 conversion beam cannon\n▪ 1 infernus cannon\n▪ 1 magna-melta cannon',
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 heavy flamers*\n▪ 2 lascannons\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'chaplain-venerable-dreadnought': {
    abilities: {
      'Spiritual Leader':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит ADEPTUS ASTARTES, который в боевом шоке и находится в пределах 12" от этой модели. Этот юнит больше не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} assault cannon; storm bolter; Dreadnought combat weapon.`,
    options: [
      'storm bolter и Dreadnought combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 heavy flamer и 1 Dreadnought combat weapon\n▪ 1 assault cannon\n▪ 1 Dreadnought inferno cannon\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 twin lascannon',
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 Dreadnought inferno cannon\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 storm bolter и 1 Dreadnought combat weapon\n▪ 1 heavy flamer и 1 Dreadnought combat weapon\n▪ 1 twin lascannon',
    ],
  },

  'land-speeder-tempest': {
    abilities: {
      'Isolate and Destroy':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту, если в пределах 6" от этой цели нет других юнитов из армии вашего оппонента, прибавьте 1 к броску ранения.',
    },
    loadout: `${EQUIP_THIS} assault cannon; Tempest salvo launcher; armoured hull.`,
    options: ['Нет.'],
  },

  'carab-culln-the-risen': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Караб Кулн Восставший', 'Кулн'],
    abilities: {
      'Rites of Battle':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может быть выбран целью стратагемы за 0 CP, даже если другой юнит вашей армии уже был выбран целью этой стратагемы в этой фазе.',
      'Death-hold':
        'При совершении дальнобойных атак эта модель не получает штраф к броскам попадания за нахождение в дистанции ввязывания одного или более вражеских юнитов.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; 2 heavy flamers; 3 hunter-killer missiles; twin assault cannon; Tarsus Scorpii.`,
    options: ['Нет.'],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'caestus-assault-ram': {
    abilities: {
      'Into the Foe':
        'Если юнит высаживается из этого TRANSPORT прежде, чем он переместится, до конца хода этот юнит может нападать в ход, в который он продвигался.',
    },
    loadout: `${EQUIP_THIS} firefury missile batteries; twin magna-melta; armoured hull.`,
    options: ['Нет.'],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION — место 3 моделей.',
  },

  'land-raider-prometheus': {
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} 2 quad heavy bolters; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION — место 3 моделей.',
  },

  'venerable-dreadnought': {
    abilities: {
      'Wisdom of the Ancients (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES INFANTRY находится в пределах 6" от этой модели, каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1.',
    },
    loadout: `${EQUIP_THIS} assault cannon; storm bolter; armoured feet; Dreadnought combat weapon.`,
    options: [
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 heavy plasma cannon*\n▪ 1 multi-melta\n▪ 1 twin autocannon\n▪ 1 twin heavy bolter\n▪ 1 twin heavy flamer\n▪ 1 twin lascannon\n▪ 1 Dreadnought inferno cannon',
      'storm bolter и Dreadnought combat weapon этой модели можно заменить на одно из следующего:\n▪ 1 heavy flamer и 1 Dreadnought combat weapon\n▪ 1 missile launcher*\n▪ 1 twin autocannon\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'rhino-primaris': {
    abilities: {
      'Self Repair':
        'В конце вашей фазы командования эта модель восстанавливает 1 потерянную рану.',
      'Orbital Comms Array (Aura)':
        'Пока дружественный юнит ADEPTUS ASTARTES находится в пределах 6" от носителя, каждый раз, когда вы нацеливаете стратагему на этот юнит, бросьте один D6: на 5+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} twin plasma gun; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR или TACTICUS (исключая модели TACTICUS CHARACTER, что начали битву присоединёнными к юниту, не являющемуся TACTICUS).',
  },

  'land-raider-excelsior': {
    abilities: {
      'Rites of Battle':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может быть выбран целью стратагемы за 0 CP, даже если другой юнит вашей армии уже был выбран целью этой стратагемы в этой фазе.',
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} grav-cannon; 2 godhammer lascannons; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 combi-weapon.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION — место 3 моделей.',
  },

  'imperial-space-marine': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['имперский космодесантник'],
    abilities: {
      'Swift Assault':
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [ASSAULT].',
      'Unbreakable Duty':
        'Пока эта модель находится в радиусе маркера цели и/или в пределах 6" от центра поля боя, она имеет способность Feel No Pain 4+.',
    },
    rules: {
      'ATTACHED UNIT':
        'Вы можете присоединить эту модель к одному из указанных выше юнитов, даже если к нему уже присоединена одна модель CHARACTER. Если вы это делаете и этот юнит-телохранитель уничтожен, присоединённые к нему юниты Leader становятся отдельными юнитами со своей исходной начальной численностью.',
    },
    loadout: `${EQUIP_THIS} disintegration combi-gun; disintegration pistol; close combat weapon.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'terminus-ultra': {
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} 3 Terminus lascannons; 2 lascannons; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'relic-razorback': {
    abilities: {
      'Fire Support':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, по которому она нанесла одно или более попаданий в этой фазе. До конца фазы каждый раз, когда дружественная модель, что высадилась из этого TRANSPORT в этот ход, совершает атаку по этому вражескому юниту, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; armoured tracks.`,
    options: [
      'twin heavy bolter этой модели можно заменить на одно из следующего:\n▪ 1 multi-melta\n▪ 1 twin assault cannon\n▪ 1 twin lascannon',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR или TACTICUS (исключая модели TACTICUS CHARACTER, что начали битву присоединёнными к юниту, не являющемуся TACTICUS).',
  },

  'company-veterans-on-bikes': {
    abilities: {
      'Vanguard Assault':
        'Каждый раз, когда этот юнит завершает манёвр нападения, до конца хода оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
    },
    wargear: {
      'Storm Shield':
        'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'COMMAND SQUAD BODYGUARD':
        'Если модель из вашей армии со способностью Leader может быть присоединена к Bike Squad, вместо этого её можно присоединить к этому юниту.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; twin boltgun; Astartes chainsword.`,
    options: [
      'bolt pistol у Veteran Biker Sergeant можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 storm bolter',
      'Astartes chainsword у Veteran Biker Sergeant можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'Любому числу Veteran Bikers их bolt pistols можно заменить на одно из следующего:\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield',
      'Любому числу Veteran Bikers их Astartes chainswords можно заменить на одно из следующего:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 grav-pistol\n▪ 1 meltagun\n▪ 1 plasma gun*\n▪ 1 plasma pistol*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'company-champion-on-bike': {
    abilities: {
      'Honour or Death':
        'Пока эта модель возглавляет юнит, прибавьте 1 к броскам продвижения и нападения для этого юнита. Когда вы нацеливаете стратагему Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
      'Martial Superiority':
        'Каждый раз, когда эта модель совершает атаку ближнего боя по юниту CHARACTER, вы можете перебросить бросок попадания и бросок ранения.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; master-crafted power weapon.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'ancient-on-bike': {
    abilities: {
      'Astartes Banner':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Unbreakable Duty':
        'Пока эта модель находится в радиусе маркера цели и/или в пределах 6" от центра поля боя, она имеет способность Feel No Pain 4+.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; Astartes chainsword.`,
    options: ['bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer'],
    leader: { text: LEADER_TEXT },
  },

  'apothecary-on-bike': {
    abilities: {
      Narthecium:
        'Пока эта модель возглавляет юнит, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER) в этот юнит.',
      'Gene-seed Recovery':
        'Когда юнит-телохранитель этой модели уничтожен, бросьте один D6: на 2+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; Astartes chainsword.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'techmarine-on-bike': {
    abilities: {
      Techmarine:
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов ADEPTUS ASTARTES VEHICLE, она имеет способность Lone Operative.',
      'Blessing of the Omnissiah':
        'В вашей фазе командования вы можете выбрать одну дружественную модель ADEPTUS ASTARTES VEHICLE в пределах 3" от этой модели. Эта модель восстанавливает до D3 потерянных ран и, до начала вашей следующей фазы командования, каждый раз, когда эта модель VEHICLE совершает атаку, прибавьте 1 к броску попадания. Каждую модель можно выбрать для этой способности только один раз за ход.',
      'Vengeance of the Omnissiah':
        'Если дружественная модель ADEPTUS ASTARTES VEHICLE уничтожена в пределах 12" от этой модели, до конца битвы Omnissian power axe этой модели имеет характеристику Атак (Attacks) 7.',
    },
    wargear: {
      Conversion:
        'Каждый раз, когда этим оружием совершается атака, если цель находится более чем в 12" от носителя, немодифицированный успешный бросок попадания 4+ считается критическим попаданием.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; Omnissian power axe.`,
    options: [
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 storm bolter',
      'Omnissian power axe этой модели можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 thunder hammer',
      'Эта модель должна быть снабжена одним из следующего:\n▪ 1 servo arm\n▪ 1 conversion beamer\n▪ 1 flamer, 1 plasma cutter и 2 servo-arms\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'librarian-on-bike': {
    abilities: {
      'Psychic Hood':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks.',
      'Mental Fortress (Psychic)':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют инвулевый спас-бросок 4+.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; force weapon.`,
    options: ['bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter'],
    leader: { text: LEADER_TEXT },
  },

  'thunderhawk-transporter': {
    abilities: {
      'Aerial Deployment':
        'Если эта модель начинает игру в режиме Hover и в стратегических резервах, её можно выставить в шаге подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии.',
    },
    loadout: `${EQUIP_THIS} hellstrike missile battery; 4 twin heavy bolters; armoured hull.`,
    options: ['Нет.'],
    damaged: {
      note: 'осталось 1–10 ран',
      text: 'Пока у этой модели осталось 1–10 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 15 моделей ADEPTUS ASTARTES INFANTRY или ADEPTUS ASTARTES MOUNTED. Каждая модель JUMP PACK, WULFEN, GRAVIS или TERMINATOR занимает место 2 моделей. Каждая модель CENTURION занимает место 3 моделей. Каждая модель MOUNTED занимает место 4 моделей. Эта модель также может перевозить до 2 моделей ADEPTUS ASTARTES VEHICLE (исключая модели AIRCRAFT и TITANIC). Модели, погружённые в TRANSPORT VEHICLES, которые сами перевозятся этой моделью, не учитываются в транспортной вместимости этой модели.',
  },

  'tarantula-air-defence-battery': {
    abilities: {
      'Sentry Programming':
        'Вы можете выбрать эту модель целью стратагемы Fire Overwatch за 0 CP и можете сделать это, даже если вы уже выбирали целью этой стратагемы другой юнит в этот ход. Эту модель можно выбрать целью этой стратагемы только раз за ход.',
    },
    loadout: `${EQUIP_THIS} Tarantula air defence missiles; armoured hull.`,
    options: ['Нет.'],
  },

  'chaplain-cassius': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['капеллан Кассий', 'Кассий'],
    abilities: {
      'Catechism of Death':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
      'Inspired Retribution':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6. На 4+ не убирайте её из игры; эта уничтоженная модель может сражаться после того, как юнит атакующей модели закончил свои атаки, а затем убирается из игры.',
    },
    loadout: `${EQUIP_THIS} Infernus; artificer crozius.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'sergeant-chronus': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['сержант Хронус', 'Хронус'],
    abilities: {
      'Tank Commander':
        'Пока эта модель командует моделью VEHICLE (см. оборот):\n▪ Дальнобойное оружие этой модели VEHICLE имеет характеристику Навыка стрельбы (BS) 2+.\n▪ Каждый раз, когда эта модель VEHICLE выбирается для стрельбы, вы можете перебросить один бросок ранения при отыгрыше этих атак.',
      Chronus:
        'Когда эта модель высаживается из модели VEHICLE, которой она командовала, она имеет способность Lone Operative до конца битвы.',
    },
    rules: {
      'TANK COMMANDER':
        'Если ваша армия включает одну или более моделей VEHICLE из перечисленных ниже, Sergeant Chronus должен начать битву погружённым в одну из этих моделей, как если бы она была TRANSPORT. Sergeant Chronus может высадиться из этой VEHICLE, только если она уничтожена. Пока он погружён таким образом, Sergeant Chronus считается командующим этой VEHICLE.\n▪ Hunter\n▪ Land Raider\n▪ Land Raider Crusader\n▪ Land Raider Redeemer\n▪ Predator Annihilator\n▪ Predator Destructor\n▪ Stalker\n▪ Vindicator\n▪ Whirlwind',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Chronus’ servo-arm.`,
    options: ['Нет.'],
  },

  'sergeant-telion': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['сержант Телион', 'Телион'],
    abilities: {
      'Voice of Experience':
        'Пока эта модель возглавляет юнит, улучшите характеристику Контроля целей (OC) моделей этого юнита на 1, и каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания.',
      'Guiding Hand':
        'Пока эта модель возглавляет юнит, каждый раз, когда этот юнит выбирается для стрельбы или боя, выберите одну из следующих способностей, которую до конца фазы получает оружие моделей этого юнита:\n▪ [LETHAL HITS]\n▪ [PRECISION]\n▪ [SUSTAINED HITS 1]',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Quietus; combat knife.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'captain-on-bike': {
    abilities: {
      'Swift Assault':
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [ASSAULT].',
      'Rites of Battle':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может быть выбран целью стратагемы за 0 CP, даже если другой юнит вашей армии уже был выбран целью этой стратагемы в этой фазе.',
    },
    wargear: {
      'Relic Shield':
        'Носитель имеет характеристику Ран (Wounds) 7.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; twin boltgun; Astartes chainsword.`,
    options: [
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 combi-weapon**\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter**\n▪ 1 relic shield*\n▪ 1 relic weapon\n▪ 1 power fist\n▪ 1 thunder hammer',
      'Astartes chainsword этой модели можно заменить на одно из следующего:\n▪ 1 close combat weapon и 1 relic shield*\n▪ 1 power fist\n▪ 1 relic weapon',
      'bolt pistol и Astartes chainsword этой модели можно заменить на 1 twin lightning claws.\n* Не более одного на модель.\n** Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'astartes-servitors': {
    abilities: {
      Mindlock:
        'Пока модель TECHMARINE возглавляет этот юнит, улучшите характеристики Навыка стрельбы (BS) и Навыка ближнего боя (WS) дальнобойного и ближнего оружия моделей Astartes Servitor этого юнита на 1.',
    },
    rules: {
      'SERVITOR RETINUE':
        'В начале шага Declare Battle Formations этот юнит может присоединиться к одному другому юниту из вашей армии, который возглавляет TECHMARINE. Если он это делает, до конца битвы каждая модель этого юнита считается частью этого юнита-телохранителя, и его начальная численность соответственно увеличивается.',
    },
    loadout: `${EQUIP_EVERY} Servitor servo-arm.`,
    options: ['До 2 моделей могут заменить свои Servitor servo-arm на одно из следующего:\n▪ 1 heavy bolter и 1 close combat weapon\n▪ 1 multi-melta и 1 close combat weapon\n▪ 1 plasma cannon и 1 close combat weapon'],
  },

  'vanguard-veteran-squad': {
    abilities: {
      'Vanguard Assault':
        'Каждый раз, когда этот юнит завершает манёвр нападения, до конца хода оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
    },
    wargear: {
      'Storm Shield':
        'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Assault Intercessor Squad, его также можно присоединить к этому юниту.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; heirloom weapon.`,
    options: ['Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 storm shield\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol'],
  },

  'ironclad-dreadnought': {
    abilities: {
      'Siege-breaker Protocols':
        'Каждый раз, когда эта модель совершает атаку ближнего боя по юниту VEHICLE или FORTIFICATION, прибавьте 1 к броску попадания и прибавьте 1 к броску ранения.',
    },
    wargear: {
      'Ironclad Assault Launchers':
        'Носитель имеет ключевое слово GRENADES.',
    },
    loadout: `${EQUIP_THIS} meltagun; storm bolter; Dreadnought combat weapon; seismic hammer.`,
    options: [
      'seismic hammer этой модели можно заменить на 1 Dreadnought chainfist.',
      'Dreadnought combat weapon и storm bolter этой модели можно заменить на 1 hurricane bolter.',
      'storm bolter этой модели можно заменить на 1 heavy flamer.',
      'meltagun этой модели можно заменить на 1 heavy flamer.',
      'Эту модель можно снабдить до 2 hunter-killer missiles.',
      'Эту модель можно снабдить 1 Ironclad assault launchers.',
    ],
  },

  'assault-squad': {
    abilities: {
      'Chainsword Doctrines':
        'Каждый раз, когда этот юнит выбирается для боя, выберите одну из следующих способностей, которую до конца фазы получают все Astartes chainswords моделей этого юнита:\n▪ [SUSTAINED HITS 1]\n▪ [LETHAL HITS]\n▪ [LANCE]',
    },
    wargear: {
      'Astartes Shield':
        'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Assault Intercessor Squad, его также можно присоединить к этому юниту.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; Astartes chainsword.`,
    options: [
      'bolt pistol у Assault Sergeant можно заменить на одно из следующего:\n▪ 1 grav-pistol*\n▪ 1 hand flamer*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol',
      'Astartes chainsword у Assault Sergeant можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'Assault Sergeant может сделать одно из следующего:\n▪ Заменить свои bolt pistol и Astartes chainsword на 1 twin lightning claws.\n▪ Быть снабжённым 1 Astartes shield.',
      'До 2 Assault Marines могут заменить свои bolt pistol и Astartes chainsword на одно из следующего:\n▪ 1 plasma pistol и 1 Astartes chainsword\n▪ 1 flamer и 1 close combat weapon\n▪ 1 meltagun и 1 close combat weapon\n▪ 1 plasma gun и 1 close combat weapon',
      'За каждые 5 моделей в этом юните у 1 модели её Astartes chainsword можно заменить на 1 eviscerator.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'assault-squad-with-jump-packs': {
    abilities: {
      'Hammer of Wrath':
        'Каждый раз, когда этот юнит завершает манёвр нападения, выберите один вражеский юнит в дистанции ввязывания от него и бросьте один D6 за каждую модель этого юнита: за каждый 4+ этот вражеский юнит получает 1 смертельную рану.',
    },
    wargear: {
      'Astartes Shield':
        'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Assault Intercessors with Jump Packs, его также можно присоединить к этому юниту.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; Astartes chainsword.`,
    options: [
      'bolt pistol у Assault Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 grav-pistol*\n▪ 1 hand flamer*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol',
      'Astartes chainsword у Assault Sergeant with Jump Pack можно заменить на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'Assault Sergeant with Jump Pack может сделать одно из следующего:\n▪ Заменить свои bolt pistol и Astartes chainsword на 1 twin lightning claws.\n▪ Быть снабжённым 1 Astartes shield.',
      'До 2 Assault Marines with Jump Packs могут заменить свои bolt pistol и Astartes chainsword на одно из следующего:\n▪ 1 plasma pistol и 1 Astartes chainsword\n▪ 1 flamer и 1 close combat weapon\n▪ 1 meltagun и 1 close combat weapon\n▪ 1 plasma gun и 1 close combat weapon',
      'За каждые 5 моделей в этом юните у 1 модели её Astartes chainsword можно заменить на 1 eviscerator.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'primaris-company-champion': {
    abilities: {
      'Honour or Death':
        'Пока эта модель возглавляет юнит, прибавьте 1 к броскам продвижения и нападения для этого юнита. Когда вы нацеливаете стратагему Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
      'Martial Superiority':
        'Каждый раз, когда эта модель совершает атаку ближнего боя по юниту CHARACTER, вы можете перебросить бросок попадания и бросок ранения.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted power weapon.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'command-squad': {
    abilities: {
      Narthecium:
        'Пока в этом юните есть Apothecary, в вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая модели CHARACTER) в этот юнит.',
      'Astartes Banner':
        'Пока в этом юните есть Company Ancient, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Honour or Death':
        'Пока в этом юните есть Company Champion, прибавьте 1 к броскам продвижения и нападения для этого юнита. Когда вы нацеливаете стратагему Heroic Intervention на этот юнит, это применение стоит на 1 CP меньше.',
    },
    wargear: {
      'Astartes Shield':
        'Носитель имеет инвулевый спас-бросок 4+.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к юниту Company Heroes, его также можно присоединить к этому юниту.',
    },
    loadout: '**Apothecary вооружён:** bolt pistol; Astartes chainsword.\n\n**Company Ancient вооружён:** bolt pistol; close combat weapon.\n\n**Company Champion вооружён:** bolt pistol; Champion’s blade; Astartes shield.\n\n**Каждый Company Veteran вооружён:** bolt pistol; boltgun; close combat weapon.',
    options: [
      'Любому числу моделей их bolt pistol можно заменить на одно из следующего:\n▪ 1 hand flamer*\n▪ 1 grav-pistol*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol*',
      'Любому числу Company Veterans их bolt pistol можно заменить на 1 Astartes shield.',
      'Любому числу Company Veterans их bolt pistol и boltgun можно заменить на 1 twin lightning claws.',
      'bolt pistol у Company Ancient можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon*',
      'Любому числу Company Veterans их boltgun можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 Astartes shield\n▪ 1 combi-weapon*\n▪ 1 flamer\n▪ 1 heavy bolter*\n▪ 1 heavy flamer*\n▪ 1 grav-cannon*\n▪ 1 grav-gun\n▪ 1 lascannon*\n▪ 1 meltagun\n▪ 1 missile launcher*\n▪ 1 multi-melta*\n▪ 1 plasma cannon*\n▪ 1 plasma gun\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'relic-terminator-squad': {
    abilities: {
      'Fury of the First':
        'Каждый раз, когда модель этого юнита совершает атаку, вы можете игнорировать любые или все модификаторы характеристики Навыка стрельбы (BS) или Навыка ближнего боя (WS) этой атаки и/или броска попадания. Кроме того, каждый раз, когда модель этого юнита совершает атаку по вражескому юниту, который вы выбрали для способности Oath of Moment в этот ход, прибавьте 1 к броску попадания.',
    },
    wargear: {
      'Grenade Harness':
        'Носитель имеет ключевое слово GRENADES.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Terminator Squad, его также можно присоединить к этому юниту.',
    },
    loadout: `${EQUIP_EVERY} combi-bolter; power fist.`,
    options: [
      'combi-bolter у Relic Terminator Sergeant можно заменить на одно из следующего:\n▪ 1 plasma blaster\n▪ 1 volkite charger',
      'За каждые 5 моделей в этом юните у 1 Relic Terminator его combi-bolter можно заменить на одно из следующего:\n▪ 1 heavy flamer\n▪ 1 reaper autocannon',
      'За каждые 5 моделей в этом юните 1 модель можно снабдить 1 grenade harness.',
      'Любому числу моделей их power fist можно заменить на 1 power weapon.',
      'Любому числу моделей их power fist можно заменить на 1 chainfist.',
      'Любому числу моделей их combi-bolter и power fist можно заменить на 1 twin lightning claws.',
    ],
  },

  'scout-sniper-squad': {
    abilities: {
      'Concealed Positions':
        'Этот юнит можно выбрать целью дальнобойной атаки, только если атакующая модель находится в пределах 12".',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; scout sniper rifle; close combat weapon.`,
    options: ['У 1 Scout Sniper его scout sniper rifle можно заменить на 1 missile launcher.'],
  },

  'tyrannic-war-veterans': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['ветераны Тиранических войн'],
    abilities: {
      'Tyrannic War Veterans':
        'Оружие моделей этого юнита имеет способность [DEVASTATING WOUNDS] при атаках по юнитам TYRANIDS.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: ['Нет.'],
  },

  'bike-squad': {
    abilities: {
      'Turbo-boost':
        'Каждый раз, когда этот юнит продвигается, не делайте для него бросок продвижения. Вместо этого до конца фазы прибавьте 6" к характеристике Перемещения (Move) моделей этого юнита.',
    },
    rules: {
      'ATTACHED UNITS':
        'Если юнит CHARACTER из вашей армии со способностью Leader может быть присоединён к Outrider Squad, его также можно присоединить к этому юниту.',
    },
    loadout: '**Biker Sergeant и каждый Space Marine Biker вооружены:** bolt pistol; twin boltgun; close combat weapon.\n\n**Attack Bike вооружён:** bolt pistol; heavy bolter; twin boltgun; close combat weapon.',
    options: [
      'bolt pistol у Biker Sergeant можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 boltgun*\n▪ 1 combi-weapon*\n▪ 1 hand flamer\n▪ 1 grav-pistol\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'Любому числу Space Marine Bikers их bolt pistol можно заменить на 1 Astartes chainsword.',
      'До 2 Space Marine Bikers могут заменить свои bolt pistol на одно из следующего:\n▪ 1 flamer*\n▪ 1 grav-gun*\n▪ 1 meltagun*\n▪ 1 plasma gun*\n▪ 1 plasma pistol',
      'heavy bolter у Attack Bike можно заменить на 1 multi-melta.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'attack-bike-squad': {
    abilities: {
      'Outrider Escort':
        'Один раз за ход, в фазе стрельбы вашего оппонента, когда дружественный юнит ADEPTUS ASTARTES MOUNTED в пределах 6" от этого юнита выбирается целью атаки, этот юнит может задействовать эту способность. Если он это делает, после того как этот вражеский юнит закончил свои атаки, этот юнит может стрелять, как если бы это была ваша фаза стрельбы, но при отыгрыше этих атак он может нацеливаться только на этот вражеский юнит (и только если он допустимая цель).',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; heavy bolter; twin boltgun; close combat weapon.`,
    options: ['Любому числу моделей их heavy bolter можно заменить на 1 multi-melta.'],
  },

  'scout-bike-squad': {
    abilities: {
      Outflank:
        'Когда этот юнит прибывает из стратегических резервов, его можно выставить в зоне развёртывания вашего оппонента (все прочие ограничения сохраняются).',
    },
    loadout: `${EQUIP_EVERY} Astartes shotgun; bolt pistol; twin boltgun; combat knife.`,
    options: [
      'bolt pistol у Scout Biker Sergeant можно заменить на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 boltgun*\n▪ 1 combi-weapon*\n▪ 1 hand flamer*\n▪ 1 grav-pistol*\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'Любому числу моделей их twin boltgun можно заменить на 1 Astartes grenade launcher.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'land-speeder-tornado': {
    abilities: {
      'Strafing Enfilade':
        'Каждый раз, когда эта модель завершает обычный манёвр, вы можете выбрать один вражеский юнит (исключая юниты MONSTER и VEHICLE), над которым она прошла во время этого манёвра, затем бросить шесть D6: за каждый 4+ этот вражеский юнит получает 1 смертельную рану.',
    },
    loadout: `${EQUIP_THIS} assault cannon; heavy bolter; close combat weapon.`,
    options: [
      'heavy bolter этой модели можно заменить на 1 multi-melta.',
      'assault cannon этой модели можно заменить на 1 heavy flamer.',
    ],
  },

  'land-speeder-typhoon': {
    abilities: {
      'Fire and Redeploy':
        'В вашей фазе стрельбы каждый раз, когда эта модель отстрелялась, если она не находится в дистанции ввязывания каких-либо вражеских юнитов, она может совершить обычный манёвр до D6". Если она это делает, до конца хода эта модель не может объявлять нападение.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; Typhoon missile launcher; close combat weapon.`,
    options: ['heavy bolter этой модели можно заменить на 1 multi-melta.'],
  },

  'librarian-with-jump-pack': {
    abilities: {
      'Psychic Hood':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks.',
      'Might of Heroes (Psychic)':
        'Пока эта модель возглавляет юнит, улучшите характеристики Силы (Strength) и Бронебойности (AP) оружия ближнего боя моделей этого юнита на 1.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Smite; force weapon.`,
    options: ['bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter'],
    leader: { text: LEADER_TEXT },
  },

  'thunderfire-cannon': {
    abilities: {
      'Tremor Shells':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если вражеский юнит INFANTRY был поражён одной или более атаками, совершёнными thunderfire cannon этого юнита в этой фазе, до конца следующего хода вашего оппонента этот вражеский юнит потрясён (shaken). Пока юнит потрясён, вычтите 2 из характеристики Перемещения (Move) этого юнита и вычтите 2 из бросков продвижения и нападения для этого юнита.',
      'Crewed Artillery':
        'Если одна модель этого юнита уничтожена, оставшаяся модель этого юнита также уничтожается.',
    },
    loadout: '**Techmarine Gunner вооружён:** bolt pistol; flamer; plasma cutter; Gunner’s servo-arms; close combat weapon.\n\n**Thunderfire Cannon вооружена:** thunderfire cannon; close combat weapon.',
    options: ['Нет.'],
  },

  hunter: {
    abilities: {
      'Hunter Missile Targeting':
        'Каждый раз, когда эта модель совершает атаку своей skyspear missile launcher по юниту MONSTER или VEHICLE, эта атака попадает при немодифицированном броске попадания 2+.',
    },
    loadout: `${EQUIP_THIS} skyspear missile launcher; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  stalker: {
    abilities: {
      'Skyfire Protocols':
        'Каждый раз, когда вы нацеливаете стратагему Overwatch на эту модель сразу после того, как вражеский юнит, который может FLY, начинает или завершает обычный манёвр, продвижение или отступление, при отыгрыше этой стратагемы, помимо стрельбы по этому вражескому юниту, вы можете выбрать до трёх дополнительных вражеских юнитов в пределах 24" от этой модели, которые могут FLY; эта модель может также стрелять по каждому из этих юнитов своими Icarus stormcannons (при условии, что каждый из них — допустимая цель), но при этом для попадания требуется немодифицированный бросок попадания 6.',
    },
    loadout: `${EQUIP_THIS} 2 Icarus stormcannons; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'land-speeder-storm': {
    abilities: {
      'Storm Assault':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} Cerberus launcher; heavy bolter; close combat weapon.`,
    options: ['Нет.'],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей. Она может перевозить только модели SCOUT SQUAD, SCOUT SNIPER SQUAD и SERGEANT TELION.',
  },

  kratos: {
    flavor:
      'Обладая внушительным набором вариантов вооружения и мощно бронированным корпусом, Kratos — почтенный штурмовой танк, по праву заслуживший свою репутацию среди воинств как лоялистских, так и еретических командиров. Наступая рядом с построениями бронированной пехоты, машина обеспечивает сокрушительную огневую поддержку, способную переломить ход целых сражений.',
    abilities: {
      'Line-breaker':
        'При совершении дальнобойных атак эта модель может нацеливаться оружием Blast на вражеские юниты в своей дистанции ввязывания (при условии, что никакие другие дружественные юниты также не находятся в дистанции ввязывания этого вражеского юнита). Кроме того, при совершении дальнобойных атак эта модель не получает штраф к броскам попадания за нахождение в дистанции ввязывания одного или более вражеских юнитов.',
    },
    loadout: `${EQUIP_THIS} autocannon; Kratos battle cannon; 4 heavy bolters; armoured tracks.`,
    options: [
      'Kratos battle cannon этой модели можно заменить на одно из следующего:\n▪ 1 melta blast-gun\n▪ 1 volkite cardanelle',
      '2 heavy bolters этой модели можно заменить на одно из следующего:\n▪ 2 autocannons\n▪ 2 lascannons*\n▪ 2 volkite calivers',
      '2 heavy bolters этой модели можно заменить на одно из следующего:\n▪ 2 heavy flamers*\n▪ 2 lascannons*\n▪ 2 volkite culverins',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 combi-weapon*\n▪ 1 havoc launcher\n▪ 1 heavy bolter*\n▪ 1 heavy flamer*\n▪ 1 multi-melta*\n▪ 1 twin boltgun',
      'Эту модель можно снабдить 1 hunter-killer missile.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'deredeo-dreadnought': {
    flavor:
      'Хотя Deredeo Dreadnought делит многие основные системы с прославленным классом Contemptor, он был создан специально как платформа тяжёлого вооружения, сочетая превосходную огневую мощь с гибкостью шагохода. Ныне редкие, Deredeo — драгоценное достояние: их живучесть и убойная сила решали исход бесчисленных сражений.',
    abilities: {
      'Deredeo Strike':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, который не ниже половинной численности, вы можете перебросить бросок попадания.',
    },
    loadout: `${EQUIP_THIS} anvilus autocannon battery; twin heavy bolter; armoured feet.`,
    options: [
      'anvilus autocannon battery этой модели можно заменить на одно из следующего:\n▪ 1 arachnus heavy lascannon battery\n▪ 1 hellfire plasma cannonade\n▪ 1 volkite falconet battery',
      'twin heavy bolter этой модели можно заменить на 1 twin heavy flamer.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 aiolos missile launcher\n▪ 1 boreas air defence missiles',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'relic-contemptor-dreadnought': {
    flavor:
      'Реликвии утраченной эпохи военного конструирования, дредноуты Contemptor — образец боевой универсальности. Лучшее тому доказательство — широчайший набор оружейных манипуляторов, совместимых с шасси Contemptor: от обычного тяжёлого оружия и силовых кулаков до самых экзотических образцов стрелкового вооружения, что ещё встречаются на полях сражений 41-го тысячелетия.',
    abilities: {
      'Even In Death I Serve':
        'Когда эта модель уничтожается впервые, уберите её из игры, не отыгрывая её способность Deadly Demise. Затем, в конце фазы, бросьте один D6: на 2+ снова поставьте эту модель на поле боя как можно ближе к месту, где она была уничтожена, и не в дистанции ввязывания каких-либо вражеских юнитов, с D6 оставшимися ранами.',
    },
    wargear: {
      Conversion:
        'Каждый раз, когда атака этим оружием нацелена на юнит более чем в 12" от носителя, немодифицированный успешный бросок попадания 4+ считается критическим попаданием.',
    },
    loadout: `${EQUIP_THIS} 2 heavy plasma cannons; armoured feet.`,
    options: [
      'Каждое из heavy plasma cannons этой модели можно заменить на одно из следующего:\n▪ 1 conversion beam cannon\n▪ 1 kheres-pattern assault cannon\n▪ 1 multi-melta*\n▪ 1 twin autocannon*\n▪ 1 twin heavy bolter*\n▪ 1 twin lascannon*\n▪ 1 twin volkite culverin\n▪ 1 Dreadnought chainfist и 1 combi-bolter\n▪ 1 Dreadnought combat weapon и 1 combi-bolter',
      'Каждое из combi-bolters этой модели можно заменить на одно из следующего:\n▪ 1 graviton blaster\n▪ 1 heavy flamer*\n▪ 1 plasma blaster*',
      'Эту модель можно снабдить 1 cyclone missile launcher.\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
  },

  'leviathan-dreadnought': {
    flavor:
      'Leviathan Dreadnought стал плодом секретной программы разработок на самой Терре, соединившей древние технологии, чтобы создать свирепо мощную осадную и охотничью машину. Однако «Левиафаны» оказались столь же дороги, сколь и смертоносны, и из немногих изготовленных ныне уцелела лишь горстка.',
    abilities: {
      'Duty Eternal':
        'Каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.',
    },
    loadout: `${EQUIP_THIS} 2 heavy flamers; 2 grav-flux bombards; armoured feet.`,
    options: [
      'Каждое из grav-flux bombards этой модели можно заменить на одно из следующего:\n▪ 1 cyclonic melta lance\n▪ 1 storm cannon\n▪ 1 meltagun и 1 Leviathan siege claw\n▪ 1 meltagun и 1 Leviathan siege drill',
      '2 heavy flamers этой модели можно заменить на 2 twin volkite calivers.',
      'Эту модель можно снабдить 3 hunter-killer missiles.',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'javelin-attack-speeder': {
    flavor:
      'Javelin Attack Speeder — чрезвычайно живучая разведывательно-ударная машина, некогда широко применявшаяся Легионес Астартес, но ныне почти исчезнувшая с театров войны 41-го тысячелетия. Незаменимые «Дротики» порой доверяют лишь самым лучшим пилотам, которые используют увеличенную дальность машины, чтобы наносить решающий урон в тылу врага.',
    abilities: {
      'Fire and Redeploy':
        'В вашей фазе стрельбы каждый раз, когда эта модель отстрелялась, если она не находится в дистанции ввязывания каких-либо вражеских юнитов, она может совершить обычный манёвр до D6". Если она это делает, до конца хода эта модель не может объявлять нападение.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; Javelin missile launcher; close combat weapon.`,
    options: [
      'Javelin missile launcher этой модели можно заменить на 2 lascannons.',
      'heavy bolter этой модели можно заменить на 1 multi-melta.',
      'Эту модель можно снабдить до 2 hunter-killer missiles.',
    ],
  },

  'deathstorm-drop-pod': {
    flavor:
      'Deathstorm Drop Pod служит средством доставки на поле боя не войск или техники, а автоматических оружейных систем — таких как ракетные установки Whirlwind или штурмовые пушки. Заняв позицию, это грозное оружие обрушивает шквал огня, расчищая путь для полномасштабного наземного штурма.',
    abilities: {
      'Deathstorm Assault':
        'Эта модель должна начинать битву в резервах, но она не учитывается в любых ограничениях на максимальное число юнитов в резервах, с которыми вы можете начать битву. Эту модель можно выставить в шаге подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии.',
    },
    loadout: `${EQUIP_THIS} deathstorm cannon array.`,
    options: ['deathstorm cannon array этой модели можно заменить на 1 deathstorm missile array.'],
  },

  'land-raider-proteus': {
    flavor:
      'Древний и почтенный Land Raider служит космодесантникам с самых первых дней их существования, а старейшие его варианты известны как образцы Proteus. Эти тяжелобронированные бастионы некогда действовали как передовые штурмовые машины в миссиях эксплораторов, и редкие уцелевшие экземпляры по-прежнему служат Империуму как реликтовые машины высочайшего почёта.',
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    wargear: {
      'Explorator Augury Web':
        'Вражеские юниты, которые выставляются на поле боя как подкрепления, нельзя выставить в пределах 12" от носителя, но носитель должен вдвое уменьшить свою транспортную вместимость.',
    },
    loadout: `${EQUIP_THIS} 2 twin lascannons; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy bolter\n▪ 1 multi-melta\n▪ 1 twin heavy bolter\n▪ 1 twin heavy flamer',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
      'Эту модель можно снабдить 1 explorator augury web.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION или OBLITERATOR — место 3 моделей.',
  },

  'land-raider-achilles': {
    flavor:
      'Achilles считается одним из редчайших вариантов Land Raider: каждый из них выкован индивидуально под пристальным взором старших адептов Омниссии. Результат — штурмовая машина, исключительно устойчивая к энергетическому оружию. Безнаказанно устремляясь вперёд с рёвом, Achilles подавляет самых разных врагов своей thunderfire cannon и мультимельтами.',
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} quad launcher; 2 twin volkite culverins; armoured tracks.`,
    options: [
      '2 twin volkite culverins этой модели можно заменить на 2 twin multi-meltas.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION или OBLITERATOR — место 3 моделей.',
  },

  'sicaran-battle-tank': {
    flavor:
      'Sicaran — один из редчайших реликтовых танков на полях сражений 41-го тысячелетия. Его уникальная конструкция восходит к Великому крестовому походу. Самая грозная из характерных систем «Сикарана» — спаренная ускорительная пушка, чьи точность и скорострельность далеко превосходят другое оружие своего класса.',
    abilities: {
      'Armoured Spearhead':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту, перебросьте бросок попадания, равный 1, и, если этот юнит находится в радиусе маркера цели, который вы не контролируете, вы можете вместо этого перебросить бросок попадания.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; Herakles-pattern autocannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'sicaran-arcus': {
    flavor:
      'Sicaran Arcus изначально задумывался, чтобы снабжать малые, лишённые поддержки силы Астартес узкоспециализированными оружейными системами, и сочетает мощное шасси Sicaran с установкой Arcus, способной выпускать широкий спектр боеголовок. Несмотря на загадочное порицание Адептус Механикус, уцелевшие экземпляры танка продолжают с великой честью служить в бою.',
    abilities: {
      'Specialised Weapon System':
        'Каждый раз, когда эта модель совершает атаку по вражескому юниту, который вы выбрали для способности Oath of Moment, эта атака имеет способность [IGNORES COVER] и может игнорировать штраф к броскам попадания при атаках оружием Indirect Fire по целям, которые ей не видны.',
    },
    loadout: `${EQUIP_THIS} Arcus multi-launcher; heavy bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'sicaran-venator': {
    flavor:
      'Построенный на прославленном шасси Sicaran, Venator — древняя порода истребителей танков, оснащённых нейтронной лазерной системой. Сочетание подвижности, защиты и противотанковой огневой мощи делает уцелевшие «Венаторы» высоко ценимыми любыми силами, которым посчастливилось ими владеть.',
    abilities: {
      'Ferocious Assault':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по ближайшему допустимому юниту MONSTER или VEHICLE, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; Venator neutron laser; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'sicaran-punisher': {
    flavor:
      'В последние дни Великого крестового похода роторную пушку «Каратель» установили на универсальный корпус Sicaran Punisher — грозной боевой машины, способной уничтожать массы пехоты и лёгкую технику ливнем крупнокалиберных снарядов.',
    abilities: {
      'Rotating Death':
        'Punisher rotary cannon этой модели имеет способность [SUSTAINED HITS 1] при атаках по юнитам INFANTRY.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; Punisher rotary cannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'sicaran-omega': {
    flavor:
      'Переоборудованный так, чтобы корпус Sicaran мог нести более тяжёлое вооружение, Omega — грозный охотник на танки с бесчисленными победами на счету. Конструкция использует скорость двигателей «Сикарана», чтобы обрушить подавляющую огневую мощь в упор: танк мчится вперёд, устраивая засады и уничтожая неповоротливые осадные танки вражеских колонн.',
    abilities: {
      'Overwhelming Short-range Firepower':
        'Каждый раз, когда эта модель совершает атаку по ближайшему допустимому вражескому юниту, перебросьте бросок попадания, равный 1, и перебросьте бросок ранения, равный 1.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; omega plasma array; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'rapier-carrier': {
    flavor:
      'Rapier Armoured Carrier — громоздкая гусеничная платформа, чьи истоки восходят к заре звёздной империи человечества. Совместимая с разнообразным тяжёлым вооружением, «Рапира» чаще всего несёт мощную счетверённую лазпушку, известную как лазерный разрушитель, что делает её компактным, но грозным противотанковым средством.',
    abilities: {
      'Powerful Volley':
        'Каждый раз, когда эта модель стреляет в вашей фазе стрельбы, если она оставалась неподвижной в этом ходу, всё оружие [HEAVY] моделей этого юнита имеет способность [LETHAL HITS].',
    },
    loadout: `${EQUIP_THIS} boltgun; quad heavy bolter; close combat weapon.`,
    options: ['quad heavy bolter этой модели можно заменить на одно из следующего:\n▪ 1 graviton cannon\n▪ 1 laser destroyer\n▪ 1 quad launcher'],
  },

  'whirlwind-scorpius': {
    flavor:
      'Scorpius — вариант Whirlwind, разработанный во время Ереси Хоруса для борьбы с тяжелобронированной пехотой. Оттого уцелевшие экземпляры — прямое и горькое напоминание о массовом братоубийстве, поглотившем Легионы Императора. Пусковая система, механизмы наведения и подача боеприпасов этого танка не похожи ни на одну другую модель, что в ходу в 41-м тысячелетии, и потому вызывают благоговение и у техножрецов, и у технодесантников.',
    abilities: {
      'Pinning Bombardment':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, если одна или более из этих атак, сделанных её Scorpius multi-launcher, поразили вражеский юнит INFANTRY, этот юнит должен пройти проверку боевого шока.',
    },
    loadout: `${EQUIP_THIS} Scorpius multi-launcher; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'vindicator-laser-destroyer': {
    flavor:
      'Отказавшись от менее разборчивой огневой мощи demolisher cannon, «Виндикаторы» с лазерными разрушителями предназначены для точечного уничтожения вражеской бронетехники. Это оружие впервые объединили с тяжелобронированным шасси Deimos в мрачные дни Ереси Хоруса, и с тех пор репутация Vindicator Laser Destroyer как смертоносного охотника на танки остаётся незыблемой.',
    abilities: {
      Annihilator:
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту MONSTER или VEHICLE, перебросьте бросок урона, равный 1.',
    },
    loadout: `${EQUIP_THIS} laser volley cannon; storm bolter; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'dreadnought-drop-pod': {
    flavor:
      'Крупнее и прочнее пехотных собратьев, десантные капсулы для дредноутов дают командирам космодесанта возможность доставлять бронированные шагоходы прямо на театр боевых действий. Ещё раскалённая после метеорного спуска сквозь атмосферу, капсула распахивает аппарели, извергая свой смертоносный груз в самую гущу врага.',
    abilities: {
      'Drop Pod Assault':
        'Эта модель должна начинать битву в резервах, но ни она, ни погружённые в неё юниты не учитываются в любых ограничениях на максимальное число юнитов в резервах, с которыми вы можете начать битву. Эту модель можно выставить в шаге подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии. Любые погружённые в эту модель юниты должны немедленно высадиться после того, как она выставлена на поле боя, и должны быть выставлены дальше 9" от всех вражеских моделей. После того как эта модель выставлена на поле боя, никакие юниты не могут в неё погрузиться.',
    },
    loadout: '**Эта модель вооружена:** ничем.',
    options: ['Нет.'],
    transport:
      'Эта модель имеет транспортную вместимость 1 модель DREADNOUGHT.',
  },

  'terrax-pattern-termite': {
    flavor:
      'Изначально созданный на Терре для выкорчёвывания роющих ксеносов во времена Великого крестового похода, штурмовой бур «Термит» быстро нашёл применение у сообразительных командиров: он прогрызает фундаменты вражеских бастионов или выныривает за баррикадами и линиями окопов, чтобы опустошить их защитников.',
    abilities: {
      'Termite Assault':
        'Эта модель должна начинать битву в резервах, но ни она, ни погружённые в неё юниты не учитываются в любых ограничениях на максимальное число юнитов в резервах, с которыми вы можете начать битву. Эту модель можно выставить в шаге подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии. Любые погружённые в эту модель юниты могут высадиться после того, как она выставлена на поле боя, и при этом должны быть выставлены дальше 9" от всех вражеских моделей.',
    },
    loadout: `${EQUIP_THIS} Terrax melta cutter; 2 combi-bolters; Termite drill.`,
    options: ['2 combi-bolters этой модели можно заменить на одно из следующего:\n▪ 2 heavy flamers\n▪ 2 twin volkite chargers'],
    damaged: {
      note: 'осталось 1–5 ран',
      text: 'Пока у этой модели осталось 1–5 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей ADEPTUS ASTARTES INFANTRY. Она не может перевозить модели JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR, OBLITERATOR, POSSESSED или TACTICUS (исключая модели TACTICUS CHARACTER, что начали битву присоединёнными к юниту, не являющемуся TACTICUS).',
  },

  'xiphon-interceptor': {
    flavor:
      'Перехватчики образца Xiphon — стремительные боевые летательные аппараты космодесанта с древней родословной, созданные, чтобы блистать и в операциях в пустоте, и в атмосферных ударах. Оснащённый грозным сочетанием лазпушек и интеллектуальных боеголовок, «Ксифон» способен обратить в дымящиеся обломки почти любую цель.',
    abilities: {
      Interceptor:
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, который может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} 2 twin lascannons; Xiphon missile battery; armoured hull.`,
    options: ['Нет.'],
    damaged: {
      note: 'осталось 1–4 ран',
      text: 'Пока у этой модели осталось 1–4 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  'storm-eagle-gunship': {
    flavor:
      'Storm Eagle — многоцелевая штурмовая и транспортная машина, способная действовать между орбитой и поверхностью; она сочетает щедрую десантовместимость с сокрушительной огневой мощью и превосходной управляемостью для машины своих размеров. В последние годы число «Грозовых орлов» на действительной службе начало расти, что намекает на восстановление производства в некоем пока неизвестном месте.',
    abilities: {
      'Armoured Resilience':
        'Каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.',
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; 2 twin hellstrike launchers; vengeance launcher; armoured hull.`,
    options: [
      'twin heavy bolter этой модели можно заменить на одно из следующего:\n▪ 1 twin multi-melta\n▪ 1 typhoon missile launcher',
      '2 twin hellstrike launchers этой модели можно заменить на 2 twin lascannons.',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 22 модели ADEPTUS ASTARTES INFANTRY и 1 модель DREADNOUGHT. Каждая модель JUMP PACK, WULFEN, GRAVIS, TERMINATOR или POSSESSED занимает место 2 моделей, а каждая модель CENTURION или OBLITERATOR — место 3 моделей.',
  },

  'fire-raptor-gunship': {
    flavor:
      'Вариант Storm Eagle, Fire Raptor был создан, чтобы обеспечивать подавляющую воздушную огневую мощь штурмовым силам Легионес Астартес. Машина быстро прославилась опустошительным ливнем болтов и ракет, который способна обрушить, и немногие уцелевшие боеспособные экземпляры считаются бесценным достоянием.',
    abilities: {
      'Strafing Run':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, который не может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} twin avenger bolt cannon; 2 twin autocannons; 2 twin hellstrike launchers; armoured hull.`,
    options: [
      '2 twin hellstrike launchers этой модели можно заменить на 2 twin lascannons.',
      '2 twin autocannons этой модели можно заменить на 2 quad heavy bolters.',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  typhon: {
    flavor:
      'До создания Typhon осадная пушка «Дредхаммер» применялась лишь на стационарных сверхтяжёлых орудиях, стиравших города в пыль. Установка этого могучего оружия на танк породила подвижный и тяжелобронированный разрушитель крепостей, которому нет равных среди прочих реликвий в арсеналах космодесанта.',
    abilities: {
      'Sunderer of Fortresses':
        'Каждый раз, когда эта модель совершает атаку по VEHICLE, улучшите характеристики Силы (Strength) и Урона (Damage) этой атаки на 1 (если эта атака нацелена на юнит FORTIFICATION, вместо этого улучшите характеристики Силы (Strength) и Урона (Damage) этой атаки на 2).',
    },
    loadout: `${EQUIP_THIS} dreadhammer siege cannon; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  cerberus: {
    flavor:
      'Главное оружие Cerberus — нейтронно-импульсная батарея, чьи системы старше самого Великого крестового похода. Питаемое атомантическим дуговым реактором, это исполинское противотанковое орудие выпускает пульсирующий луч интенсивной радиации, что прорезает даже толстейшую броню и сеет хаос в хрупких системах внутри.',
    abilities: {
      'Atomantic Arc-reactor':
        'Каждый раз, когда этот юнит стреляет своей Cerberus neutron pulse array в вашей фазе стрельбы, если он оставался неподвижным в этом ходу, это оружие имеет способность [LETHAL HITS].',
    },
    loadout: `${EQUIP_THIS} Cerberus neutron pulse array; armoured tracks.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  spartan: {
    flavor:
      'Бронированный транспорт поистине исполинских размеров, Spartan — тяжёлый штурмовой танк, созданный, чтобы доставлять крупные отряды войск в самое сердце вражеской территории, стряхивая огонь, который уничтожил бы машины послабее, пока его счетверённые лазпушки собирают собственную жатву.',
    abilities: {
      'Assault Ramp':
        'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} 2 quad lascannons; twin heavy bolter; armoured tracks.`,
    options: [
      '2 quad lascannons этой модели можно заменить на 2 laser destroyers.',
      'twin heavy bolter этой модели можно заменить на 1 twin heavy flamer.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter',
    ],
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 28 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION или OBLITERATOR — место 3 моделей.',
  },

  fellblade: {
    flavor:
      'Ныне редкая жемчужина в арсеналах лоялистов и предателей, Fellblade — легендарная боевая машина, оснащённая набором оружия, почти неизвестного в 41-м тысячелетии. Первейшее из них — ускорительная пушка, использующая сложные вакуумные технологии для стрельбы высокоскоростными снарядами, которые способны выдержать немногие цели.',
    abilities: {
      'Rolling Fortress':
        'Каждый раз, когда дальнобойная атака распределяется по модели из вашей армии, если эта модель не полностью видима каждой модели атакующего юнита из-за этой модели Fellblade, эта модель имеет Benefit of Cover против этой атаки.',
    },
    loadout: `${EQUIP_THIS} demolisher cannon; Fellblade accelerator cannon; 2 quad lascannons; twin heavy bolter; armoured tracks.`,
    options: [
      '2 quad lascannons этой модели можно заменить на одно из следующего:\n▪ 2 laser destroyers\n▪ 2 quad heavy bolters',
      'twin heavy bolter этой модели можно заменить на 1 twin heavy flamer.',
      'Эту модель можно снабдить 1 havoc launcher.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 combi-weapon*\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter\n* Профиль этого оружия приведён на карте Adeptus Astartes Legends Armoury.',
    ],
    damaged: {
      note: 'осталось 1–8 ран',
      text: 'Пока у этой модели осталось 1–8 ран, вычтите 4 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  falchion: {
    flavor:
      'Falchion был разработан, чтобы вооружить Легионес Астартес непревзойдённым истребителем танков, и апокалиптическая мощь его спаренной вулканической пушки вскоре стала легендой. Верная своему имени, вулканическая пушка обращает камень и металл в огненную магму, и прямое попадание из неё может оказаться смертельным даже для титанических боевых машин.',
    abilities: {
      'Titan-killer':
        'Каждый раз, когда эта модель совершает дальнобойную атаку своей twin Falchion volcano cannon по юниту MONSTER или VEHICLE, эта атака имеет способность [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_THIS} 2 quad lascannons; twin heavy bolter; twin Falchion volcano cannon; armoured tracks.`,
    options: [
      '2 quad lascannons этой модели можно заменить на 2 laser destroyers.',
      'twin heavy bolter этой модели можно заменить на 1 twin heavy flamer.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter',
    ],
    damaged: {
      note: 'осталось 1–8 ран',
      text: 'Пока у этой модели осталось 1–8 ран, вычтите 4 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
  },

  mastodon: {
    flavor:
      'Mastodon — один из тяжелейших штурмовых транспортов, когда-либо применявшихся космодесантом; его берегут для самых укреплённых позиций. Превосходя размерами Land Raider в несколько раз, «Мастодонт» прежде всего доставляет бронированных воинов прямо в брешь, пробитую осадной мельта-батареей на его бронированном носу.',
    abilities: {
      'Inviolable Transport':
        'Один раз за раунд боя, когда атака распределяется по этой модели, вы можете изменить характеристику Урона (Damage) этой атаки на 0.',
    },
    loadout: `${EQUIP_THIS} 2 heavy flamers; 2 lascannons; siege melta array; skyreaper battery; armoured tracks.`,
    options: [
      '2 heavy flamers этой модели можно заменить на одно из следующего:\n▪ 2 heavy bolters\n▪ 2 lascannons\n▪ 2 volkite culverins',
      '2 lascannons этой модели можно заменить на одно из следующего:\n▪ 2 heavy bolters\n▪ 2 heavy flamers\n▪ 2 volkite culverins',
    ],
    damaged: {
      note: 'осталось 1–10 ран',
      text: 'Пока у этой модели осталось 1–10 ран, вычтите 6 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 45 моделей ADEPTUS ASTARTES INFANTRY. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель CENTURION или OBLITERATOR — место 3 моделей. Эта модель также может перевозить до 2 моделей DREADNOUGHT или HELBRUTE (эти модели занимают место числа моделей, равного их характеристике Ран (Wounds): например, DREADNOUGHT с характеристикой Ран 8 займёт место 8 моделей).',
  },

  'sokar-pattern-stormbird': {
    flavor:
      'Stormbird был конструктивным предшественником канонерки Thunderhawk, задуманным как специализированный высокозащищённый орбитальный штурмовой корабль, способный высадить ударную группу космодесанта под плотным наземным огнём. Хотя «Грозовую птицу» во многом вытеснил Thunderhawk, её возможности как мобильного бастиона и огневой базы никогда не упускают из виду те фракции, что ею ещё владеют.',
    abilities: {
      'Aerial Assault':
        'Каждый раз, когда юнит со способностью Deep Strike высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.',
    },
    loadout: `${EQUIP_THIS} hellstrike missile battery; 3 twin heavy bolters; 4 twin lascannons; armoured hull.`,
    options: ['Нет.'],
    damaged: {
      note: 'осталось 1–13 ран',
      text: 'Пока у этой модели осталось 1–13 ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    transport:
      'Эта модель имеет транспортную вместимость 55 моделей ADEPTUS ASTARTES INFANTRY или ADEPTUS ASTARTES MOUNTED. Каждая модель JUMP PACK, WULFEN, GRAVIS, POSSESSED или TERMINATOR занимает место 2 моделей, а каждая модель MOUNTED, CENTURION или OBLITERATOR — место 3 моделей. Эта модель также может перевозить до 1 модели RHINO (эта модель — и любые погружённые в неё модели — занимают место 25 моделей).',
  },

  'tarantula-sentry-battery': {
    flavor:
      'Автоматические турели «Тарантул» — самоходные оружейные системы, идеально подходящие для сдерживания и запрета доступа в район. Снабжённые простыми логическими машинами и оснащённые лазпушками либо тяжёлыми болтерами, они способны выкашивать вражескую пехоту или останавливать бронетехнику на месте, почти не отвлекая внимания своих операторов.',
    abilities: {
      'Sentinel Protocols':
        'Каждый раз, когда вы выбираете этот юнит для стратагемы Fire Overwatch, при отыгрыше этой стратагемы попадания засчитываются на немодифицированных бросках попадания 4+.',
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; armoured hull.`,
    options: ['twin heavy bolter этой модели можно заменить на 1 twin lascannon.'],
  },
}

// RU-подписи названий способностей (Title-Case). Показываются мелкой строкой под
// английским названием. ALL-CAPS названия (INSPIRING COMMANDER и т.п.) остаются
// английскими и здесь не перечислены.
export const abilityNamesRu = {
  'Aerial Assault': 'Воздушный штурм',
  'Angel’s Wrath': 'Гнев ангела',
  Annihilator: 'Аннигилятор',
  'Annihilator Protocols': 'Протоколы аннигилятора',
  'Aquilon Optics': 'Оптика «Аквилон»',
  'Armorium Cherub': 'Херувим арсенала',
  'Armour of Fate': 'Доспех судьбы',
  'Armoured Resilience': 'Бронированная стойкость',
  'Assault Ramp': 'Штурмовая аппарель',
  'Assault Vehicle': 'Штурмовая машина',
  'Astartes Banner': 'Штандарт астартес',
  'Author of the Codex': 'Автор Кодекса',
  'Ballistus Strike': 'Удар «Баллистус»',
  'Banner of Macragge': 'Штандарт Макрагга',
  'Blackwing Mantle': 'Мантия Чёрного крыла',
  Bladeguard: 'Клинковая гвардия',
  'Blessing of the Omnissiah': 'Благословение Омниссии',
  'Brutalis Charge': 'Натиск «Бруталис»',
  'Catechism of Fire': 'Катехизис огня',
  'Centurion Assault Launcher': 'Штурмовой пусковой «Центурион»',
  'Ceramite Cover': 'Керамитовое укрытие',
  'Cerebrex Logic Engine': 'Логический движок «Церебрекс»',
  'Close-quarters Firepower': 'Огневая мощь ближнего боя',
  'Cold and Calculating': 'Холодный расчёт',
  'Combat Disembarkation': 'Боевая высадка',
  'Combat Squads': 'Боевое разделение',
  'Vanguard Support': 'Поддержка авангарда',
  'Inspiring Commander': 'Вдохновляющий командир',
  'Command Squad': 'Командный отряд',
  'Deadly Terror': 'Смертоносный ужас',
  'Decimator Protocols': 'Протоколы децимации',
  'Deeds of Heroism': 'Деяния героизма',
  'Defensive Array': 'Оборонительный массив',
  'Deployment Complete': 'Развёртывание завершено',
  Destructor: 'Разрушитель',
  'Drop Pod Assault': 'Штурм капсулой высадки',
  'Duty Eternal': 'Вечный долг',
  'Echo of the Ravenspire': 'Эхо Вороньего шпиля',
  'Emergency Combat Embarkation': 'Экстренная боевая погрузка',
  'Evade and Survive': 'Уклонись и выживи',
  Executioner: 'Палач',
  'Exhortation of Rage': 'Воззвание ярости',
  'Fearsome Assault': 'Устрашающий штурм',
  'Priority Target Acquisition': 'Захват приоритетной цели',
  'Finest Hour': 'Звёздный час',
  'Fire Support': 'Огневая поддержка',
  'For the Chapter!': 'За Орден!',
  'For the Khan!': 'За Хана!',
  Forgefather: 'Отец кузни',
  Fortification: 'Укрепление',
  'Fury of the First': 'Ярость Первой роты',
  'Gene-seed Recovery': 'Извлечение ген-семени',
  'Glory of Ultramar': 'Слава Ультрамара',
  'Grapnel Launcher': 'Пусковой крюк-кошка',
  'Guerrilla Tactics': 'Партизанская тактика',
  Hailstrike: 'Град-удар',
  'Hammer of Wrath': 'Молот гнева',
  Hammerstrike: 'Молот-удар',
  'Haywire Mine': 'Хэйвайр-мина',
  'Helix Gauntlet': 'Перчатка «Геликс»',
  'Honour of Ultramar': 'Честь Ультрамара',
  'Honour or Death': 'Честь или смерть',
  'Hood of Hellfire': 'Капюшон адского огня',
  'Icon of Obstinacy': 'Икона упорства',
  'Incendiary Terror': 'Зажигательный ужас',
  'Infiltrator Comms Array': 'Массив связи «Инфильтратор»',
  'Inspiring Leader': 'Вдохновляющий вождь',
  Interceptor: 'Перехватчик',
  'Iron Father': 'Железный отец',
  'Keep the Banner High': 'Держи штандарт высоко',
  'Knight Champion of Macragge': 'Рыцарь-чемпион Макрагга',
  'Litany of Hate': 'Литания ненависти',
  'Lord of the Pyroclasts': 'Владыка пирокластов',
  'Mark the Target': 'Отметь цель',
  'Master Tactician': 'Мастер-тактик',
  'Master of Deceit': 'Мастер обмана',
  'Master of Prescience (Psychic)': 'Мастер предвидения (Психика)',
  'Master of Shadows': 'Мастер теней',
  'Master of the Fleet': 'Мастер флота',
  'Master of the Forge': 'Мастер кузни',
  'Mental Fortress (Psychic)': 'Ментальная крепость (Психика)',
  'Meteoric Descent': 'Метеорный спуск',
  'Multi-spectrum Array': 'Мультиспектральный массив',
  Narthecium: 'Нартециум',
  'Oath of Rynn': 'Клятва Ринна',
  'Objective Secured': 'Цель закреплена',
  'Omni-scramblers': 'Омни-глушители',
  'Orbital Comms Array (Aura)': 'Орбитальный массив связи (Аура)',
  'Outrider Escort': 'Эскорт «Аутрайдер»',
  'Overlapping Detonations': 'Перекрывающиеся детонации',
  'Pinning Bombardment': 'Прижимающий обстрел',
  'Press the Attack': 'Дави атаку',
  'Priority Objective Identified': 'Приоритетная цель определена',
  'Psychic Hood': 'Психический капюшон',
  Rampart: 'Бастион',
  'Recitation of Faith': 'Речитатив веры',
  'Refractor Field': 'Рефракторное поле',
  'Refuse to Yield': 'Не уступать',
  'Reiver Grav-chute': 'Грави-парашют «Ривер»',
  'Relic Shield': 'Реликтовый щит',
  'Reposition Under Covering Fire': 'Смена позиции под прикрытием',
  'Rites of Battle': 'Обряды битвы',
  'Rites of Tempering': 'Обряды закалки',
  'Reaping Tally': 'Жатва',
  'Second Company Banner': 'Штандарт Второй роты',
  'Seeker of the Unfound': 'Искатель ненайденного',
  'Self Repair': 'Самопочинка',
  'Sentinel Protocols': 'Протоколы часового',
  'Trifold Path of Shadow': 'Тройственный путь тени',
  'Shield Dome': 'Купол-щит',
  'Targeted Intercession': 'Прицельное вмешательство',
  'Shrouding (Psychic)': 'Сокрытие (Психика)',
  'Siege Captain': 'Осадный капитан',
  'Siege Shield': 'Осадный щит',
  Signum: 'Сигнум',
  'Signum Array': 'Массив «Сигнум»',
  'Silent Fury': 'Безмолвная ярость',
  'Skilled Riders': 'Умелые наездники',
  'Spear of Chogoris': 'Копьё Чогориса',
  'Spiritual Leader': 'Духовный вождь',
  'Sternguard Focus': 'Сосредоточенность «Стернгард»',
  'Storm Shield': 'Штормовой щит',
  'Strafing Run': 'Штурмовой заход',
  'Strategic Dispersal': 'Стратегическое рассредоточение',
  'Strategium Command': 'Командование стратегиума',
  'Suppression Fire': 'Подавляющий огонь',
  'Surgical Precision': 'Хирургическая точность',
  'Tactical Precision': 'Тактическая точность',
  'Hail of Bolts': 'Град болтов',
  'Target Priority': 'Приоритет цели',
  'Purgation Run': 'Зачистка',
  'Targeter Optics': 'Оптика наводчика',
  Techmarine: 'Техножрец',
  'Teleport Homer': 'Телепорт-маяк',
  Tempormortis: 'Темпормортис',
  'Terminator Storm Shield': 'Штормовой щит Terminator',
  'Terminatus Assault': 'Штурм «Терминатус»',
  'Terror Troops (Aura)': 'Войска ужаса (Аура)',
  'Unstoppable Valour': 'Неудержимая доблесть',
  'Thunderhawk Cluster Bombs': 'Кассетные бомбы «Тандерхок»',
  'Thunderous Impact': 'Громовой удар',
  Thunderstrike: 'Громовой удар',
  'To the Last': 'До последнего',
  'Total Obliteration': 'Полное уничтожение',
  'Trophy Taker': 'Взятие трофея',
  'Ultramarines Bodyguard': 'Телохранитель Ультрамаринов',
  'Ultramarines Honour Guard': 'Почётная гвардия Ультрамаринов',
  'Unbreakable Duty': 'Нерушимый долг',
  'Unorthodox Strategist': 'Неортодоксальный стратег',
  'Unto the Anvil': 'На наковальню',
  'Unyielding in the Face of the Foe': 'Непоколебимы перед врагом',
  'Vanguard Assault': 'Штурм «Вангард»',
  'Veil of Time (Psychic)': 'Завеса времени (Психика)',
  'Vengeance of the Omnissiah': 'Месть Омниссии',
  Vivispectrum: 'Вивиспектрум',
  'Wisdom of the Ancients (Aura)': 'Мудрость древних (Аура)',
  'Master of Rites': 'Мастер обрядов',
  'Unrelenting and Uncompromising': 'Неумолимый и бескомпромиссный',
  'Mortis Strike': 'Удар «Мортиса»',
  'Isolate and Destroy': 'Изолировать и уничтожить',
  'Into the Foe': 'На врага',
  'Death-hold': 'Мёртвая хватка',
  'Swift Assault': 'Стремительный штурм',
  'Martial Superiority': 'Воинское превосходство',
  'Aerial Deployment': 'Воздушное развёртывание',
  'Sentry Programming': 'Программа часового',
  'Catechism of Death': 'Катехизис смерти',
  'Inspired Retribution': 'Вдохновлённое возмездие',
  'Tank Commander': 'Командир танка',
  Chronus: 'Хронус',
  'Voice of Experience': 'Голос опыта',
  'Guiding Hand': 'Направляющая рука',
  Mindlock: 'Разумозамок',
  'Astartes Shield': 'Щит астартес',
  'Siege-breaker Protocols': 'Протоколы взлома осады',
  'Ironclad Assault Launchers': 'Штурмовые пусковые «Айронклада»',
  'Chainsword Doctrines': 'Доктрины цепного меча',
  'Grenade Harness': 'Гранатная сбруя',
  'Concealed Positions': 'Скрытые позиции',
  'Tyrannic War Veterans': 'Ветераны Тиранических войн',
  'Turbo-boost': 'Турбоускорение',
  Outflank: 'Обход с фланга',
  'Strafing Enfilade': 'Продольный обстрел',
  'Fire and Redeploy': 'Выстрелил — сменил позицию',
  'Might of Heroes (Psychic)': 'Мощь героев (Психика)',
  'Tremor Shells': 'Сейсмические снаряды',
  'Crewed Artillery': 'Артиллерия с расчётом',
  'Hunter Missile Targeting': 'Наведение ракет «Хантера»',
  'Skyfire Protocols': 'Протоколы зенитного огня',
  'Storm Assault': 'Штурм «Шторма»',
  'Line-breaker': 'Таранщик линий',
  'Deredeo Strike': 'Удар «Деродео»',
  'Even In Death I Serve': 'И в смерти я служу',
  'Deathstorm Assault': 'Штурм «Смертельной бури»',
  'Explorator Augury Web': 'Авгурная сеть эксплораторов',
  'Specialised Weapon System': 'Специализированная оружейная система',
  'Ferocious Assault': 'Свирепый натиск',
  'Rotating Death': 'Вращающаяся смерть',
  'Overwhelming Short-range Firepower': 'Подавляющая огневая мощь в упор',
  'Powerful Volley': 'Мощный залп',
  'Termite Assault': 'Штурм «Термита»',
  'Sunderer of Fortresses': 'Сокрушитель крепостей',
  'Atomantic Arc-reactor': 'Атомантический дуговой реактор',
  'Rolling Fortress': 'Катящаяся крепость',
  'Titan-killer': 'Убийца титанов',
  'Inviolable Transport': 'Неприкосновенный транспорт',
  Conversion: 'Конверсия',
  'Armoured Spearhead': 'Бронированный наконечник',
  'ATTACHED UNITS': 'Присоединяемые юниты',
  'SERVITOR RETINUE': 'Свита сервиторов',
  'COMMAND SQUAD BODYGUARD': 'Телохранители командного отделения',
  'TANK COMMANDER': 'Командир танка',
}
