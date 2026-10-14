// Adeptus Custodes — русский перевод листов данных. Разреженный оверлей поверх EN
// (см. ./index.js): переведены только тексты (flavor, тексты способностей, loadout/options,
// leader/transport); composition наследуется от EN. Имена юнитов/оружия, характеристики,
// ключевые слова, [BRACKET]-теги и названия core-правил остаются английскими.
// `abilityNamesRu` (внизу) даёт RU-подписи названий.
//
// Пересобран под Codex: Adeptus Custodes (app data 981), который переписал все листы. Старый
// перевод перенесён только там, где английский текст не изменился (flavor и строки leader);
// остальное переведено заново по образцу Space Marines 963. Термин армейского правила
// **readied** — «**[gloss:ac-readied:наготове]**».

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const VEXILLA =
  '▪ Этот юнит имеет +1 **[gloss:objective-control:OC]**.\n▪ Этот юнит может игнорировать модификаторы своего **[gloss:leadership:Ld]**.'
const VEXILLA_OPTION = '1 модель можно снабдить 1 Vexilla.'
const MASTER_OF_KATAHS =
  'Если этот юнит не **[gloss:ac-readied:наготове]**, вы можете использовать эту способность. Если вы это делаете, этот юнит **наготове**.'
const ASSAULT_VEHICLE =
  'В вашей фазе движения, когда этот юнит завершает **[gloss:advance-move:продвижение]**, юниты, погруженные в него, могут совершить **[gloss:shock-disembark-move:ударный манёвр высадки]**.'
const STRENGTH_OVER_TOUGHNESS =
  'Атаки по этому юниту с **[gloss:strength:S]** больше, чем **[gloss:toughness:T]** этого юнита, имеют -1 к **[gloss:wound-roll:броскам на ранение]**.'
const CASCADE_OPTION =
  'Twin Lastrum Bolt Cannon этой модели можно заменить на 1 Twin Neutronium Cascade Projectors.'
const TAKE_WING =
  'В конце фазы ближнего боя вашего оппонента, если этот юнит **[gloss:unengaged:не в ближнем бою]**, вы можете поместить этот юнит в **[gloss:strategic-reserves:стратегические резервы]**.'
const CASCADE_MINE =
  'В начале любой фазы вы можете выбрать один вражеский юнит в пределах 3" от этого юнита и бросить один D6. На 2+:\n▪ Тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ __Или:__ если тот вражеский юнит — юнит VEHICLE/MONSTER, он получает 2D3 **смертельных ран**.'
const objectiveClause = (tag) =>
  `Атаки этого юнита имеют ${tag}, если выполняется любое из следующего:\n▪ Этот юнит находится в радиусе действия **[gloss:objective:цели]**.\n▪ Юнит, по которому совершаются эти атаки, находится в радиусе действия **цели**.`

export default {
  aleya: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Алея'],
    flavor:
      'Алея — ветеран своего ордена и свирепая, преданная охотница на ведьм и чародеев. За много лет она развила невероятное тактическое чутьё, а также глубокое знание своей добычи. Она применяет эти навыки, чтобы выискивать псайкеров-отступников, повергая их взмахами своего клинка Somnus.',
    abilities: {
      'Tactical Perception': 'Этот юнит имеет [core:Fights First].',
      'Tenacious Spirit':
        '▪ Пока этот юнит ниже своей **[gloss:starting-strength:начальной численности]**, атаки этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**.\n▪ Пока этот юнит ниже **[gloss:half-strength:половинной численности]**, атаки этого юнита имеют +1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    loadout: `${EQUIP_THIS} 1 Somnus.`,
    leader: { text: LEADER_TEXT },
  },

  'allarus-custodians': {
    flavor:
      'Даже среди Adeptus Custodes Allarus Custodian славятся своими деяниями. Телепортируясь в опаснейшие вражеские цитадели, они полагаются на несокрушимую стойкость своих лат Terminator, что защищают их, пока они выслеживают демагогов и генералов. Сражаясь как отдельные герои, они стремительно вырывают сердце из обороны врага.',
    abilities: {
      'Slayer of Tyrants':
        'Атаки ближнего боя этого юнита по юниту с **[gloss:toughness:T]** больше, чем **T** этого юнита, имеют +1 к **[gloss:wound-roll:броскам на ранение]**.',
    },
    wargearAbilities: {
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} 1 Balistus Grenade Launcher; 1 Guardian Spear.`,
    options: [
      VEXILLA_OPTION,
      'Всем моделям этого юнита их Guardian Spear можно заменить на 1 Castellan Axe.',
    ],
  },

  'anathema-psykana-rhino': {
    flavor:
      'Rhino Безмолвного Сестринства — больше, чем просто бронетранспортёры. Многие служат Империуму сотни, если не тысячи лет. Крайне крепкие машины, их просторная вместимость и мощные двигатели помогают им безопасно нести свой смертоносный груз Сестёр в жесточайшие битвы.',
    abilities: {
      'Assault Vehicle': ASSAULT_VEHICLE,
    },
    loadout: `${EQUIP_THIS} 1 Armoured Tracks; 1 Storm Bolter.`,
    options: ['Эту модель можно снабдить 1 Hunter‑killer Missile.'],
    transport:
      'Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 12 моделей ANATHEMA PSYKANA INFANTRY.',
  },

  'aquilon-terminators-with-solarite-power-gauntlets': {
    abilities: {
      'Dread Foe':
        'Атаки ближнего боя этого юнита по юниту (исключая юниты MONSTER/VEHICLE) имеют +1 **[gloss:armour-penetration:AP]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Adrathic Combi‑destructor; 1 Solarite Power Gauntlet.`,
  },

  'aquilon-terminators-with-solarite-power-talons': {
    abilities: {
      'Reap a Terrible Tally':
        'Атаки этого юнита по юниту INFANTRY могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
    },
    loadout: `${EQUIP_EVERY} 1 Lastrum Storm Bolter; 1 Solarite Power Talon.`,
    options: [
      'Всем моделям этого юнита их Lastrum Storm Bolter можно заменить на 1 Infernus Firepike.',
    ],
  },

  'ares-gunship': {
    flavor:
      'Ares Gunship впервые заслужил свою славу на Древней Терре и с тех пор сокрушал врагов Императора на сотнях миров. Ужаснее всего в арсенале Ares — arachnus magna-blaze cannon, чьи запредельные энергии пронзают плотнейшую броню, оставляя след из остовов и трупов везде, где разворачивается Ares.',
    abilities: {
      'Infernus Firebombs':
        'В конце фазы ближнего боя вашего оппонента выберите один **[gloss:visible:видимый]** вражеский юнит (исключая юниты с [core:Lone Operative] и юниты AIRCRAFT) в пределах 24" от этого юнита:\n▪ Дальнобойные атаки по тому вражескому юниту имеют [IGNORES COVER] до конца вашего следующего хода.\n▪ Бросьте один D6 за каждую модель того вражеского юнита:\n▪ На 6 тот вражеский юнит получает 1 **[gloss:mortal-wound:смертельную рану]** (максимум 6 **смертельных ран**).',
    },
    loadout: `${EQUIP_THIS} 2 Arachnus Heavy Blaze Cannon; 1 Arachnus Magna-blaze Cannon; 1 Armoured Hull.`,
  },

  'blade-champion': {
    flavor:
      'Задача Blade Champion — распознать величайшую угрозу на поле боя и обеспечить её стремительное уничтожение. Для этого он отлично вооружён: он владеет потрескивающими археотех-клинками в разных стилях боя — Behemor, Hurricanis и Victus, — каждый из которых идеален против своего рода врагов.',
    abilities: {
      'Swift Onslaught':
        'Этот юнит может:\n▪ Перебрасывать **[gloss:advance-roll:броски продвижения]**.\n▪ Перебрасывать **[gloss:charge-roll:броски нападения]**.',
      'Sword of the Throne':
        'В начале первого раунда боя выберите один вражеский юнит **[gloss:ac-mark:меткой]** этой модели:\n▪ Атаки этой модели по её **метке** имеют +1 к **[gloss:wound-roll:броскам на ранение]**.\n▪ Каждый раз, когда **метка** этой модели **[gloss:destroyed:уничтожена]**, выберите один вражеский юнит новой **меткой** этой модели.',
    },
    loadout: `${EQUIP_THIS} 1 Vaultswords.`,
    leader: { text: LEADER_TEXT },
  },

  'caladius-annihilator-grav-tank': {
    abilities: {
      'Advanced Firepower':
        'Дальнобойные атаки этого юнита по юниту MONSTER/VEHICLE могут:\n▪ Перебросить __один__ **[gloss:hit-roll:бросок на попадание]**.\n▪ Перебросить __один__ **[gloss:wound-roll:бросок на ранение]**.\n▪ Перебросить __один__ **[gloss:damage-roll:бросок на урон]**.',
    },
    loadout: `${EQUIP_THIS} 1 Arachnus Blaze Carronade; 1 Armoured Hull; 1 Twin Lastrum Bolt Cannon.`,
    options: [CASCADE_OPTION],
  },

  'caladius-grav-tank': {
    flavor:
      'Caladius Grav-tank сплавляет одну из тяжелейших огневых мощей в арсенале Custodian Guard с высокоподвижным, живучим шасси. Взяв главным вооружением либо twin iliastus accelerator cannon, либо twin arachnus heavy blaze cannon, Caladius превосходен в целом ряде боевых ролей, намного превосходя более примитивные машины своего класса.',
    abilities: {
      'Destructor Optics':
        'Дальнобойные атаки этого юнита по юниту (исключая юниты MONSTER/VEHICLE) имеют +1 **[gloss:armour-penetration:AP]**.',
    },
    loadout: `${EQUIP_THIS} 1 Armoured Hull; 1 Iliastus Accelerator Cannon; 1 Twin Lastrum Bolt Cannon.`,
    options: [CASCADE_OPTION],
  },

  'contemptor-achillus-dreadnought': {
    flavor:
      'Contemptor-Achillus добавляет ещё большую утончённость к и без того прославленному чертежу — почитаемому Contemptor Dreadnought, — вооружая своего обитателя могучим dreadspear, что одинаково способен выжигать врагов на расстоянии и повергать их одним выпадом своего пылающего клинка.',
    abilities: {
      'Unyielding Ancient': STRENGTH_OVER_TOUGHNESS,
    },
    loadout: `${EQUIP_THIS} 1 Dreadspear; 2 Lastrum Storm Bolter.`,
    options: [
      '2 Lastrum Storm Bolter этой модели можно заменить на одно из следующего:\n▪ 2 Adrathic Combi‑destructor\n▪ 2 Twin Infernus Incinerator',
    ],
  },

  'contemptor-galatus-dreadnought': {
    flavor:
      'Как Sentinel Guard древнего Legio Custodes, Contemptor-Galatus вооружён силовым клинком и боевым щитом, пусть и типа, намного превосходящего по размеру и мощи. В сочетании с и без того живучим шасси Contemptor это снаряжение позволяет Galatus безнаказанно шагать сквозь ад битвы, повергая элитную пехоту и калеча технику.',
    abilities: {
      'Unyielding Ancient': STRENGTH_OVER_TOUGHNESS,
    },
    loadout: `${EQUIP_THIS} 1 Warblade.`,
  },

  'coronus-grav-carrier': {
    flavor:
      'Coronus Grav-carrier — основной тактический транспорт Adeptus Custodes. Их репульсорная подвесная технология и flare-экранирование дают им скорость и живучесть, чтобы по воле сходиться с мириадами угроз или уклоняться от них, карая цели мощным башенным оружием, пока они несут элитных пассажиров на передовую битвы.',
    abilities: {
      'Assault Vehicle': ASSAULT_VEHICLE,
      'Repulsor Suspensor Technology (Once per phase, per unit)':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если этот юнит потерял рану в результате этих атак и **[gloss:unengaged:не в ближнем бою]**, этот юнит может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до D6".',
    },
    loadout: `${EQUIP_THIS} 1 Armoured Hull; 1 Twin Arachnus Blaze Cannon; 1 Twin Lastrum Bolt Cannon.`,
    options: [CASCADE_OPTION],
    transport:
      'Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 8 моделей ADEPTUS CUSTODES INFANTRY. Она не может перевозить модели JUMP PACK.',
  },

  'custodian-guard-sodality': {
    abilities: {
      'Impenetrable Defence': objectiveClause('[SUSTAINED HITS 1: **non**‑MONSTER/VEHICLE]'),
    },
    wargearAbilities: {
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} 1 Guardian Spear.`,
    options: [VEXILLA_OPTION],
  },

  'custodian-guard-sodality-with-adrasite-spears': {
    abilities: {
      'Stand Vigil':
        'Атаки этого юнита могут:\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.\n▪ __Или:__ если этот юнит находится в радиусе действия **[gloss:objective:цели]**, перебрасывать **броски на ранение**.',
    },
    loadout: `${EQUIP_EVERY} 1 Adrasite Spear.`,
  },

  'custodian-guard-sodality-with-pyrithite-spears': {
    abilities: {
      'No Foe Shall Stand (Once per battle, per unit)':
        'Дальнобойные атаки этого юнита имеют [LETHAL HITS] и [IGNORES COVER].',
    },
    loadout: `${EQUIP_EVERY} 1 Pyrithite Spear.`,
  },

  'custodian-wardens': {
    flavor:
      'Ветераны с веками службы за плечами, Custodian Warden — хладнокровные воины, поклявшиеся сражаться как живые крепости, которые не пробьёт ни один враг. С пугающей яростью и железной волей эти воины рассекают врагов надвое мощными взмахами энергетических лезвий своих копий и топоров.',
    abilities: {
      'Living Fortress': 'Атаки по этому юниту имеют -1 **[gloss:armour-penetration:AP]**.',
    },
    wargearAbilities: {
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} 1 Guardian Spear.`,
    options: [
      'Всем моделям этого юнита их Guardian Spear можно заменить на 1 Castellan Axe.',
      VEXILLA_OPTION,
    ],
  },

  'gyrfalcon-jetbike-sodality': {
    abilities: {
      'Death Blow':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют +1 **[gloss:armour-penetration:AP]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Lastrum Bolt Cannon; 1 Solarite Power Lance.`,
    options: [
      'Всем моделям этого юнита их Lastrum Bolt Cannon можно заменить на одно из следующего:\n▪ 1 Adrathic Devastator\n▪ 1 Arachnus Volley Cannon\n▪ 1 Twin Corvae Las‑pulser',
    ],
  },

  'knight-centura': {
    flavor:
      'Knight-Centura — предводительницы кадров Sisters of Silence и хранительницы их традиций. Они заслужили уважение своих Сестёр годами службы, безупречным боевым мастерством, мощью и самообладанием как Null и энциклопедическим знанием того, как лучше всего охотиться на ведьм и чародеев.',
    abilities: {
      'Seeker’s Instincts':
        '▪ Этот юнит имеет +2" **[gloss:move-characteristic:M]**.\n▪ Этот юнит может перебрасывать **[gloss:advance-roll:броски продвижения]** и **[gloss:charge-roll:броски нападения]**.',
      'Corner the Quarry':
        'Когда вражеский юнит (исключая юниты MONSTER/VEHICLE) **[gloss:engaged:в ближнем бою]** с этим юнитом совершает **[gloss:fall-back-move:отступление]**, тот вражеский юнит обязан использовать **[gloss:desperate-escape:режим отчаянного бегства]**. Если тот вражеский юнит **[gloss:battle-shocked:в боевом шоке]**, -1 к этим **[gloss:hazard-roll:броскам на опасность]**.',
    },
    loadout: `${EQUIP_THIS} 1 Executioner Greatblade.`,
    options: [
      'Executioner Greatblade этой модели можно заменить на одно из следующего:\n▪ 1 Master‑crafted Boltgun и 1 Gun Stock\n▪ 1 Master‑crafted Flamer и 1 Gun Stock',
    ],
    leader: { text: LEADER_TEXT },
  },

  'orion-assault-dropship': {
    flavor:
      'Тяжелобронированный Orion — непревзойдённый штурмовой корабль, созданный, чтобы переносить атаки, пока он высаживает свой грозный груз Custodian Guard. С полыхающим болтерным и энергетическим оружием Orion стремительно расчищает зону высадки и выпускает пассажиров, прежде чем взмыть ввысь, чтобы обрушить смерть на любые другие угрозы, что попали в его прицел.',
    abilities: {
      'Assault Dropship':
        'В вашей фазе движения, когда дружественный юнит ADEPTUS CUSTODES выбран для совершения **тактического манёвра высадки** из этого юнита, если тот юнит затем выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает тот юнит **[gloss:eligible-to-charge:права объявлять нападение]**.',
    },
    loadout: `${EQUIP_THIS} 2 Arachnus Heavy Blaze Cannon; 1 Armoured Hull; 2 Spiculus Heavy Bolt Launcher; 2 Twin Lastrum Bolt Cannon.`,
    transport:
      'Эта модель имеет вместимость транспорта 12 моделей Adeptus Custodes Infantry. Или 1 модель Dreadnought. Пока эта модель перевозит 1 юнит DREADNOUGHT, она также имеет вместимость транспорта 6 моделей ADEPTUS CUSTODES INFANTRY.',
  },

  'pallas-grav-attack': {
    flavor:
      'Созданный как высокоманевренный охотник-убийца, Pallas Grav-attack даёт Adeptus Custodes способность к стремительному удару, используя свою проворность и универсальный twin arachnus blaze cannon, чтобы наносить сокрушительные наскоки на врага или настигать бегущие цели, что ускользнули от наземных войск Custodes.',
    abilities: {
      'Mobile Hunter':
        'В вашей фазе стрельбы, когда этот юнит отстрелялся, вы можете использовать эту способность. Если вы это делаете:\n▪ Этот юнит может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до D6".\n▪ Этот юнит __не__ имеет **[gloss:eligible-to-charge:права объявлять нападение]** до конца хода.',
    },
    loadout: `${EQUIP_THIS} 1 Armoured Hull; 1 Twin Arachnus Blaze Cannon.`,
    options: [
      'Twin Arachnus Blaze Cannon этой модели можно заменить на 1 Twin Iliastus Accelerator Fusil.',
    ],
  },

  'prosecutor-squad': {
    abilities: {
      'Purity of Execution':
        'В вашей фазе стрельбы вы можете выбрать один **[gloss:visible:видимый]** вражеский юнит в пределах 18" от этого юнита. Тот юнит **обнаружен**:\n▪ Пока юнит **обнаружен**, он имеет +3" к **[gloss:detection-range:радиусу обнаружения]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Boltgun; 1 Gun Stock.`,
  },

  'sagittarum-custodians-sodality': {
    abilities: {
      'Disintegration Beams (Once per battle, per unit)':
        'В вашей фазе стрельбы вы можете использовать эту способность. Если вы это делаете, дальнобойные атаки этого юнита имеют [DEVASTATING WOUNDS].',
      'Saturation Volleys':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, вы можете выбрать один вражеский юнит NON-MONSTER/VEHICLE, поражённый этими атаками. Тот юнит **[gloss:sm-suppressed:подавлен]** до начала вашего следующего хода:\n▪ Пока юнит **подавлен**, атаки этого юнита имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Adrastus Bolt Caliver; 1 Misericordia.`,
  },

  'sentinel-guard-sodality': {
    abilities: {
      'Stand Vigil': objectiveClause('[LETHAL HITS: **non**‑MONSTER/VEHICLE]'),
    },
    wargearAbilities: {
      'Praesidium Shield': STRENGTH_OVER_TOUGHNESS,
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} 1 Praesidium Shield; 1 Sentinel Blade.`,
    options: [VEXILLA_OPTION],
  },

  'shield-captain': {
    flavor:
      'Shield-Captain — одни из величайших воинов Империума. Каким бы оружием они ни сражались, они владеют им в совершенстве. Их тактические и стратегические таланты непревзойдённы: одним взглядом они читают прилив и отлив войны и направляют свои силы соответственно.',
    abilities: {
      'Vengeful Surge (Once per battle, per unit)':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если модель этого юнита потеряла рану в результате этих атак, этот юнит может совершить **[gloss:surge-move:стремительный манёвр]** на расстояние до D6+2".',
      'Master of Ka’tahs (Once per battle round, per unit)': MASTER_OF_KATAHS,
    },
    wargearAbilities: {
      'Praesidium Shield': 'Атаки, распределённые на эту модель, имеют -1 **[gloss:damage-roll:D]**.',
    },
    loadout: `${EQUIP_THIS} 1 Praesidium Shield; 1 Pyrithite Spear.`,
    options: [
      'Pyrithite Spear этой модели можно заменить на 1 Eternity‑pattern Paragon Blade.',
      'Pyrithite Spear и Praesidium Shield этой модели можно заменить на одно из следующего:\n▪ Castellan Axe\n▪ Guardian Spear',
    ],
    leader: { text: LEADER_TEXT },
  },

  'shield-captain-in-allarus-terminator-armour': {
    flavor:
      'Shield-Captain и без того один из грознейших бойцов и непревзойдённых стратегов Империума. Облачённый в почти непробиваемую броню Terminator из аурамита, он становится ещё могущественнее — ходячая крепость имперской мощи, способная выдержать даже самые сокрушительные удары.',
    abilities: {
      'Archeotech Teleport‑shunter (Once per battle, per unit)':
        'В вашей фазе движения, если этот юнит **[gloss:unengaged:не в ближнем бою]** и не был **[gloss:selected-to-move:выбран для движения]** в этой фазе, вы можете использовать эту способность. Если вы это делаете, поместите этот юнит в **[gloss:strategic-reserves:стратегические резервы]**, и этот юнит обязан совершить **[gloss:ingress-move:манёвр прибытия]** в этой фазе.',
      'Master of Ka’tahs (Once per battle round, per unit)': MASTER_OF_KATAHS,
    },
    loadout: `${EQUIP_THIS} 1 Balistus Grenade Launcher; 1 Guardian Spear.`,
    options: ['Guardian Spear этой модели можно заменить на 1 Castellan Axe.'],
    leader: { text: LEADER_TEXT },
  },

  'shield-captain-on-dawneagle-jetbike': {
    flavor:
      'Все Shield-Captain — решительные воины, не терпящие помех своей миссии, но самые быстрые в мысли и действии из них взмывают в бой на джетбайках Dawneagle. Они врезаются в самое сердце вражеских линий, собирая кровавую жатву своими interceptor lance, а затем уносятся прочь на ревущих грав-двигателях, чтобы ударить снова в другом месте.',
    abilities: {
      'Master of Ka’tahs (Once per battle round, per unit)': MASTER_OF_KATAHS,
      'Sweeping Advance (Once per battle, per unit)':
        'В конце фазы ближнего боя, если этот юнит **[gloss:eligible-to-fight:имел право сражаться]** в этой фазе:\n▪ Если этот юнит **[gloss:unengaged:не в ближнем бою]**, он может совершить **[gloss:normal-move:обычный манёвр]**.\n▪ __Или:__ если этот юнит **[gloss:engaged:в ближнем бою]**, он может совершить **[gloss:fall-back-move:отступление]**.',
    },
    loadout: `${EQUIP_THIS} 1 Interceptor Lance; 1 Salvo Launcher.`,
    options: ['Salvo Launcher этой модели можно заменить на 1 Hurricane Bolter.'],
    leader: { text: LEADER_TEXT },
  },

  'telemon-heavy-dreadnought': {
    flavor:
      'Честь заточения в Telemon Heavy Dreadnought выпадает самым прославленным Custodian, чью боевую доблесть сочли под стать чистой мощи Telemon. Заключённые внутри, такие души сражаются дальше рядом с братьями, устремляясь ли вперёд с праведной яростью или отражая штурмы своим spiculus bolt launcher.',
    abilities: {
      'Guardian Eternal': 'Дальнобойные атаки по этому юниту имеют -1 **[gloss:damage-roll:D]**.',
    },
    loadout: `${EQUIP_THIS} 1 Dual Caestus Fists; 1 Spiculus Bolt Launcher; 2 Twin Neutronium Cascade Projectors.`,
    options: [
      'Dual Caestus Fists и 2 Twin Neutronium Cascade Projectors этой модели можно заменить на одно из следующего:\n▪ 1 Adrathic Desolator, 1 Caestus Fist и 1 Twin Neutronium Cascade Projectors\n▪ 1 Arachnus Storm Cannon, 1 Caestus Fist и 1 Twin Neutronium Cascade Projectors\n▪ 1 Caestus Fist, 1 Iliastus Accelerator Culverin и 1 Twin Neutronium Cascade Projectors',
    ],
  },

  'trajann-valoris': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Траянн Валорис'],
    flavor:
      'Воинская доблесть Траянна Валориса приближается к доблести примархов древности. Watcher’s Axe он может рассечь саркофаг Chaos Helbrute одним взмахом или использовать встроенное в него болтерное оружие — известное как Eagle’s Scream, — чтобы выкашивать вражескую пехоту залпами адамантиевых бронебойных болтов.',
    abilities: {
      'Captain‑General (Aura)':
        'Дружественные юниты ADEPTUS CUSTODES (исключая юниты MONSTER/VEHICLE) в пределах 6" от этой модели могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
      'Moment Shackle (Once per battle, per army)':
        'В начале любой фазы вы можете выбрать одно из следующего, что действует до конца фазы:\n▪ Оружие Watcher’s Axe этой модели имеет +3 **[gloss:attack-dice:A]**.\n▪ Эта модель имеет 3+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout: `${EQUIP_THIS} 1 Eagle’s Scream; 1 Watcher’s Axe.`,
    leader: { text: LEADER_TEXT },
  },

  valerian: {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Валериан'],
    flavor:
      'Своевольный воин, Валериан относительно недавно в Custodes, но уже отмечен для величия. Его порыв нести смерть врагам Императора за пределами Терры высоко ценится в эти тёмные времена, и бессчётные враги пали от его guardian spear по имени Gnosis.',
    abilities: {
      'Golden Laurels': 'Атаки по этому юниту имеют -1 **[gloss:armour-penetration:AP]**.',
      "Hero of Lion's Gate (Once per battle, per unit)":
        'После того как для этой модели сделан **[gloss:hit-roll:бросок на попадание]**, **[gloss:wound-roll:бросок на ранение]** или **[gloss:save-roll:спасбросок]**, вы можете изменить результат на немодифицированную 6.',
    },
    loadout: `${EQUIP_THIS} 1 Gnosis.`,
    leader: { text: LEADER_TEXT },
  },

  'venatari-with-kinetic-destroyers': {
    abilities: {
      'Take Wing': TAKE_WING,
      'Neutronium Cascade Mine (Once per battle, per unit)': CASCADE_MINE,
      'Strike from the Skies':
        'В вашей фазе стрельбы, если этот юнит совершил **[gloss:ingress-move:манёвр прибытия]** в этот ход, дальнобойные атаки этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Kinetic Destroyer; 1 Tarsus Buckler.`,
  },

  'venatari-with-verutum-lances': {
    abilities: {
      'Take Wing': TAKE_WING,
      'Swift Ruin (Once per phase, per army)':
        'Вы можете выбрать этот юнит целью **стратагемы Rapid Ingress**, независимо от любых других применений этой **[gloss:stratagem:стратагемы]** в этой фазе. Если вы это делаете:\n▪ Это применение стоит -1 CP.\n▪ Это применение __не__ мешает применять эту **стратагему** к другим юнитам в этой фазе.',
      'Neutronium Cascade Mine (Once per battle, per unit)': CASCADE_MINE,
    },
    loadout: `${EQUIP_EVERY} 1 Verutum Lance.`,
  },

  'venerable-contemptor-dreadnought': {
    flavor:
      'Эти громадные боевые шагоходы пилотируются павшими веками назад героями, которых сохраняют живыми незаменимые технологии. Оснащённые оружием, что может плавить броню и разрывать пехоту, Venerable Contemptor Dreadnought наносят страшный урон, всё это время защищённые атомантическими щитами и протоколами саморемонта.',
    abilities: {
      'Unyielding Ancient (Once per battle, per unit)':
        'В конце фазы, в которой эта модель была **[gloss:destroyed:уничтожена]**, бросьте один D6:\n▪ На 2+ снова поставьте эту модель на поле боя как можно ближе к месту, где она была **уничтожена**, **[gloss:unengaged:не в ближнем бою]** и с 3 оставшимися ранами.',
    },
    loadout: `${EQUIP_THIS} 1 Combi-bolter; 1 Contemptor Fist; 1 Multi-melta.`,
    options: ['Multi-melta этой модели можно заменить на 1 Kheres-pattern Assault Cannon.'],
  },

  'venerable-land-raider': {
    flavor:
      'Land Raider — тяжело вооружённые подвижные крепости. Обладая сверхпрочной адамантиевой бронёй и грозным набором оружия, они и их груз воинов Custodian могут переломить ход войны одним залпом, а их машинные духи столь мощны, что могут сражаться дальше, даже если экипаж перебит.',
    abilities: {
      'Assault Ramp':
        'В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, юниты, погруженные в него, могут совершить **[gloss:assault-disembark-move:штурмовой манёвр высадки]**.',
    },
    loadout: `${EQUIP_THIS} 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Twin Heavy Bolter.`,
    options: [
      'Эту модель можно снабдить 1 Storm Bolter.',
      'Эту модель можно снабдить 1 Hunter-killer Missile.',
    ],
    transport: 'Эта модель имеет вместимость транспорта 6 моделей Adeptus Custodes Infantry.',
  },

  'vertus-praetors': {
    flavor:
      'Ветераны, что видели бой на сотне миров, эти Custodian знают, что ценность скорости — в том, чтобы направлять свою мощь точно туда и тогда, где и когда она нужнее всего. Мастера и ближнего боя, и стрельбы, они наносят пронзающие удары и смертоносные залпы с точностью даже на огромной скорости.',
    abilities: {
      'Quicksilver Execution':
        'Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют [SUSTAINED HITS 1].',
    },
    loadout: `${EQUIP_EVERY} 1 Interceptor Lance; 1 Salvo Launcher.`,
    options: [
      'Всем моделям этого юнита их Salvo Launcher можно заменить на 1 Hurricane Bolter.',
    ],
  },

  'vigilator-squad': {
    abilities: {
      'Deft Parry':
        'Атаки ближнего боя по этому юниту имеют -1 к **[gloss:hit-roll:броскам на попадание]**.',
    },
    loadout: `${EQUIP_EVERY} 1 Executioner Greatblade.`,
  },

  'witchseeker-squad': {
    abilities: {
      'Sanctified Flames':
        'В вашей фазе стрельбы, когда этот юнит отстрелялся, вы можете выбрать один вражеский юнит, поражённый этими атаками. Тот вражеский юнит совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**, если тот вражеский юнит — юнит PSYKER.',
    },
    loadout: `${EQUIP_EVERY} 1 Flamer; 1 Gun Stock.`,
  },
}

export const abilityNamesRu = {
  'Advanced Firepower': 'Передовая огневая мощь',
  'Archeotech Teleport‑shunter (Once per battle, per unit)':
    'Археотехнический телепорт-шунтер (раз за битву, на юнит)',
  'Assault Dropship': 'Штурмовой десантный корабль',
  'Assault Ramp': 'Штурмовая аппарель',
  'Assault Vehicle': 'Штурмовая машина',
  'Captain‑General (Aura)': 'Капитан-генерал (Аура)',
  'Corner the Quarry': 'Загнать добычу',
  'Death Blow': 'Смертельный удар',
  'Deft Parry': 'Ловкое парирование',
  'Destructor Optics': 'Деструкторная оптика',
  'Disintegration Beams (Once per battle, per unit)': 'Дезинтеграционные лучи (раз за битву, на юнит)',
  'Dread Foe': 'Грозный враг',
  'Golden Laurels': 'Золотые лавры',
  'Guardian Eternal': 'Вечный страж',
  "Hero of Lion's Gate (Once per battle, per unit)": 'Герой Львиных Врат (раз за битву, на юнит)',
  'Impenetrable Defence': 'Непробиваемая оборона',
  'Infernus Firebombs': 'Зажигательные бомбы Infernus',
  'Living Fortress': 'Живая крепость',
  'Master of Ka’tahs (Once per battle round, per unit)': 'Мастер ка’тах (раз за раунд боя, на юнит)',
  'Mobile Hunter': 'Мобильный охотник',
  'Moment Shackle (Once per battle, per army)': 'Оковы мгновения (раз за битву, на армию)',
  'Neutronium Cascade Mine (Once per battle, per unit)': 'Нейтрониевая каскадная мина (раз за битву, на юнит)',
  'No Foe Shall Stand (Once per battle, per unit)': 'Ни один враг не устоит (раз за битву, на юнит)',
  'Praesidium Shield': 'Щит Praesidium',
  'Purity of Execution': 'Чистота исполнения',
  'Quicksilver Execution': 'Ртутная казнь',
  'Reap a Terrible Tally': 'Страшная жатва',
  'Repulsor Suspensor Technology (Once per phase, per unit)':
    'Репульсорная подвеска (раз за фазу, на юнит)',
  'Sanctified Flames': 'Освящённое пламя',
  'Saturation Volleys': 'Насыщающие залпы',
  'Seeker’s Instincts': 'Инстинкты искателя',
  'Slayer of Tyrants': 'Убийца тиранов',
  'Stand Vigil': 'Нести стражу',
  'Strike from the Skies': 'Удар с небес',
  'Sweeping Advance (Once per battle, per unit)': 'Стремительное продвижение (раз за битву, на юнит)',
  'Swift Onslaught': 'Стремительный натиск',
  'Swift Ruin (Once per phase, per army)': 'Стремительная погибель (раз за фазу, на армию)',
  'Sword of the Throne': 'Меч Трона',
  'Tactical Perception': 'Тактическое чутьё',
  'Take Wing': 'Встать на крыло',
  'Tenacious Spirit': 'Цепкий дух',
  'Unyielding Ancient': 'Несгибаемый древний',
  'Unyielding Ancient (Once per battle, per unit)': 'Несгибаемый древний (раз за битву, на юнит)',
  'Vengeful Surge (Once per battle, per unit)': 'Мстительный рывок (раз за битву, на юнит)',
  Vexilla: 'Vexilla',
}
