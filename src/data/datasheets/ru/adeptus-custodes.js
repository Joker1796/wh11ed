// Adeptus Custodes — русский перевод листов данных. Разреженный оверлей поверх EN
// (см. ./index.js): переведены только тексты (flavor, тексты способностей, loadout/options,
// damaged/leader/transport). Имена юнитов/оружия, характеристики, ключевые слова (Adeptus
// Custodes, Anathema Psykana), названия правил (Ka’tah Stances, Psychic Attacks), [BRACKET]-
// теги и ALL-CAPS-названия способностей остаются английскими. `abilityNamesRu` (внизу) даёт
// RU-подписи названий.

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const TURBO_BOOST =
  'Каждый раз, когда этот юнит продвигается, не делайте бросок продвижения. Вместо этого до конца фазы прибавьте 6" к характеристике Перемещения (Move) моделей этого юнита.'
const FROM_GOLDEN_LIGHT =
  'Один раз за битву, в конце хода вашего оппонента, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, вы можете убрать его с поля боя и поместить в Strategic Reserves.'
const VEXILLA = 'Прибавьте 1 к характеристике Контроля целей (OC) моделей юнита носителя.'
const PRAESIDIUM_SHIELD = 'Прибавьте 1 к характеристике Ран (Wounds) носителя.'
const DAUGHTERS_ABYSS =
  'Модели этого юнита имеют способность Feel No Pain 3+ против Psychic Attacks и смертельных ран.'
const DAUGHTER_ABYSS =
  'Эта модель имеет способность Feel No Pain 3+ против Psychic Attacks и смертельных ран.'
const STAND_VIGIL =
  'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок ранения, равный 1. Пока этот юнит находится в радиусе маркера цели, который вы контролируете, вы можете вместо этого перебросить бросок ранения.'
const ASSAULT_RAMP =
  'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.'
const SELF_REPAIR = 'В начале вашей фазы командования эта модель восстанавливает 1 потерянную рану.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'agamatus-custodians': {
    flavor:
      'Agamatus Custodian берут в скакуны джетбайки типа Gyrfalcon, чья мощь несёт тяжёлую броню всадников и мощный lastrum bolt cannon или иное тайное оружие. Сближаясь с врагом, Agamatus Custodian обрушивают эту огневую мощь с точностью, прежде чем нанести смертельный удар своими interceptor lance.',
    abilities: {
      'Turbo-boost': TURBO_BOOST,
      'Implacable Vanguard':
        'Один раз за битву, в вашей фазе стрельбы, после того как этот юнит отстрелялся, если он не находится в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр до 6". Если он это делает, до конца хода этот юнит не может объявить нападение.',
    },
    loadout: `${EQUIP_EVERY} lastrum bolt cannon; interceptor lance.`,
    options: [
      'Любому числу моделей их lastrum bolt cannon можно заменить на одно из следующего:\n▪ 1 adrathic devastator\n▪ 1 twin las-pulsar',
    ],
  },

  aleya: {
    flavor:
      'Алея — ветеран своего ордена и свирепая, преданная охотница на ведьм и чародеев. За много лет она развила невероятное тактическое чутьё, а также глубокое знание своей добычи. Она применяет эти навыки, чтобы выискивать псайкеров-отступников, повергая их взмахами своего клинка Somnus.',
    abilities: {
      'Tactical Perception':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Fights First.',
      'Tenacious Spirit':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания, если этот юнит ниже своей начальной численности, а также прибавьте 1 к броску ранения, если этот юнит ниже половинной численности.',
      'Daughter of the Abyss': DAUGHTER_ABYSS,
    },
    loadout: `${EQUIP_THIS} Somnus.`,
    leader: { text: LEADER_TEXT },
  },

  'allarus-custodians': {
    flavor:
      'Даже среди Adeptus Custodes Allarus Custodian славятся своими деяниями. Телепортируясь в опаснейшие вражеские цитадели, они полагаются на несокрушимую стойкость своих лат Terminator, что защищают их, пока они выслеживают демагогов и генералов. Сражаясь как отдельные герои, они стремительно вырывают сердце из обороны врага.',
    abilities: {
      'Slayers of Tyrants':
        'Каждый раз, когда модель этого юнита совершает атаку по юниту CHARACTER, MONSTER или VEHICLE, вы можете перебросить бросок ранения.',
      'From Golden Light': FROM_GOLDEN_LIGHT,
    },
    wargear: {
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} balistus grenade launcher; guardian spear.`,
    options: [
      'Любому числу моделей их guardian spear можно заменить на 1 castellan axe.',
      'guardian spear у 1 модели можно заменить на 1 vexilla и 1 misericordia.',
    ],
  },

  'anathema-psykana-rhino': {
    flavor:
      'Rhino Безмолвного Сестринства — больше, чем просто бронетранспортёры. Многие служат Империуму сотни, если не тысячи лет. Крайне крепкие машины, их просторная вместимость и мощные двигатели помогают им безопасно нести свой смертоносный груз Сестёр в жесточайшие битвы.',
    abilities: {
      'Daughters of the Abyss': DAUGHTER_ABYSS,
      'Self Repair': SELF_REPAIR,
    },
    loadout: `${EQUIP_THIS} storm bolter; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Anathema Psykana Infantry.',
  },

  'aquilon-custodians': {
    flavor:
      'Aquilon Custodian — тяжёлая штурмовая пехота Custodian Guard, и каждый воин наделён бронёй и снаряжением древнего происхождения и безупречной работы. Заключённые в гибкую, но крайне прочную броню Terminator типа Aquilon, они шагают через опаснейшие зоны боевых действий, чтобы вершить смерть.',
    abilities: {
      'Heavy Assault Infantry':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по ближайшей допустимой цели, перебросьте бросок ранения, равный 1.',
      'From Golden Light': FROM_GOLDEN_LIGHT,
    },
    loadout: `${EQUIP_EVERY} lastrum storm bolter; solerite power gauntlet.`,
    options: [
      'Любому числу моделей их lastrum storm bolter можно заменить на одно из следующего:\n▪ 1 infernus firepike\n▪ 1 twin adrathic destructor',
      'Любому числу моделей их solerite power gauntlet можно заменить на 1 solerite power talon.',
    ],
  },

  'ares-gunship': {
    flavor:
      'Ares Gunship впервые заслужил свою славу на Древней Терре и с тех пор сокрушил врагов Императора на сотнях миров. Ужаснее всего в наступательных возможностях Ares — arachnus magna-blaze cannon, чьи предельные энергии пронзают плотнейшую броню, оставляя след из остовов и трупов всюду, где высаживается Ares.',
    abilities: {
      'Infernus Firebombs':
        'Каждый раз, когда эта модель завершает обычный манёвр, вы можете выбрать один вражеский юнит, над которым она прошла в этом манёвре. До конца хода модели этого юнита не могут иметь Benefit of Cover. Кроме того, бросьте один D6 за каждую модель этого юнита: за каждый 6 этот юнит получает 1 смертельную рану.',
    },
    loadout: `${EQUIP_THIS} 2 arachnus heavy blaze cannons; arachnus magna-blaze cannon; armoured hull.`,
    options: ['Нет.'],
    damaged: { note: 'осталось 1–7 ран', text: dmgHitMinus('1–7') },
  },

  'blade-champion': {
    flavor:
      'Blade Champion — живое оружие в руке Императора. Его роль — определить величайшую угрозу на поле боя, будь то могучий вождь, воинство убийц или смертоносная боевая машина, а затем пустить в ход свои археотех-клинки и особые стили боя, чтобы обеспечить их стремительное и полное уничтожение.',
    abilities: {
      'Swift Onslaught':
        'Пока эта модель возглавляет юнит, вы можете перебрасывать броски нападения для этого юнита.',
      'Martial Inspiration':
        'Один раз за битву, в вашей фазе нападения, юнит этой модели может объявить нападение в ход, в который он продвигался.',
    },
    loadout: `${EQUIP_THIS} vaultswords.`,
    leader: { text: LEADER_TEXT },
  },

  'caladius-grav-tank': {
    flavor:
      'Caladius Grav-tank сплавляет одну из тяжелейших огневых мощей в арсенале Custodian Guard с высокоподвижным, живучим шасси. Взяв главным вооружением либо twin iliastus accelerator cannon, либо twin arachnus heavy blaze cannon, Caladius превосходен в целом ряде боевых ролей, намного превосходя более примитивные машины своего класса.',
    abilities: {
      'Advanced Firepower':
        'Каждый раз, когда эта модель совершает атаку своим twin iliastus accelerator cannon по вражескому юниту (исключая MONSTER и VEHICLE), эта атака имеет способность [LETHAL HITS]. Каждый раз, когда эта модель совершает атаку своим twin arachnus heavy blaze cannon по вражескому юниту MONSTER или VEHICLE, эта атака имеет способность [LETHAL HITS].',
    },
    loadout: `${EQUIP_THIS} twin iliastus accelerator cannon; twin lastrum bolt cannon; armoured hull.`,
    options: [
      'twin iliastus accelerator cannon этой модели можно заменить на 1 twin arachnus heavy blaze cannon.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
  },

  'contemptor-achillus-dreadnought': {
    flavor:
      'Contemptor-Achillus добавляет ещё большую утончённость к и без того прославленному чертежу — почитаемому Contemptor Dreadnought, — вооружая своего обитателя могучим dreadspear, что одинаково способен выжигать врагов на расстоянии и повергать их одним выпадом своего пылающего клинка.',
    abilities: {
      'Dread Foe':
        'Каждый раз, когда эта модель выбирается для схватки, вы можете выбрать один вражеский юнит в дистанции ввязывания от неё и бросить один D6, прибавив 2 к результату, если эта модель совершила манёвр нападения в этот ход: на 4–5 этот вражеский юнит получает D3 смертельные раны; на 6+ — 3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} 2 lastrum storm bolters; Achillus dreadspear.`,
    options: [
      '2 lastrum storm bolters этой модели можно заменить на одно из следующего:\n▪ 2 infernus incinerators\n▪ 2 twin adrathic destructors\n▪ 1 lastrum storm bolter и 1 infernus incinerator\n▪ 1 lastrum storm bolter и 1 twin adrathic destructor\n▪ 1 infernus incinerator и 1 twin adrathic destructor',
    ],
  },

  'contemptor-galatus-dreadnought': {
    flavor:
      'Как Sentinel Guard древнего Legio Custodes, Contemptor-Galatus вооружён силовым клинком и боевым щитом, пусть и типа, намного превосходящего по размеру и мощи. В сочетании с и без того живучим шасси Contemptor это снаряжение позволяет Galatus безнаказанно шагать сквозь ад битвы, повергая элитную пехоту и калеча технику.',
    abilities: {
      'Galatus Shield':
        'Каждый раз, когда атака ближнего боя нацеливается на эту модель, вычтите 1 из броска ранения.',
    },
    loadout: `${EQUIP_THIS} Galatus warblade.`,
    options: ['Нет.'],
  },

  'coronus-grav-carrier': {
    flavor:
      'Coronus Grav-carrier — основной тактический транспорт Adeptus Custodes. Их репульсорная подвесная технология и flare-экранирование дают им скорость и живучесть, чтобы по воле сходиться с мириадами угроз или уклоняться от них, карая цели мощным башенным оружием, пока они несут элитных пассажиров на передовую битвы.',
    abilities: {
      'Fire Support':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественная модель, что высадилась из этого TRANSPORT в этот ход, совершает атаку по этому вражескому юниту, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} twin arachnus blaze cannon; twin lastrum bolt cannon; armoured hull.`,
    options: ['Нет.'],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 8 моделей Adeptus Custodes Infantry.',
  },

  'custodian-guard': {
    flavor:
      'Эти воины образуют костяк щитовых рот, и каждый из них — ужасающая сила разрушения, равная сильнейшим из врагов. Вооружены ли они guardian spear или sentinel blade, их выстрелы легли безукоризненно, а каждый разрез, выпад и парирование — мастер-класс владения клинком.',
    abilities: {
      'Stand Vigil': STAND_VIGIL,
      'Sentinel Storm':
        'Один раз за битву, в вашей фазе стрельбы, после того как этот юнит отстрелялся, он может выстрелить снова.',
    },
    wargear: {
      'Praesidium Shield': PRAESIDIUM_SHIELD,
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} guardian spear.`,
    options: [
      'Любому числу моделей их guardian spear можно заменить на 1 sentinel blade и 1 praesidium shield.',
      'guardian spear у 1 модели можно заменить на одно из следующего:\n▪ 1 vexilla и 1 misericordia\n▪ 1 vexilla, 1 misericordia и 1 praesidium shield',
    ],
  },

  'custodian-guard-with-adrasite-and-pyrithite-spears': {
    flavor:
      'Фирменное вооружение Custodian Guard сочетает смертоносные силовые клинки и встроенное дальнобойное оружие. Хотя guardian spear — самое узнаваемое из этих мощных устройств, для особых задач болтерное оружие, что они несут, можно заменить на adrathic destructor у adrasite spear или мельта-лучи у pyrithite spear.',
    abilities: {
      'Stand Vigil': STAND_VIGIL,
      'No Foe Shall Stand':
        'Один раз за битву, в начале вашей фазы стрельбы, этот юнит может задействовать эту способность. Если он это делает, до конца фазы дальнобойное оружие моделей этого юнита имеет способности [LETHAL HITS] и [IGNORES COVER].',
    },
    loadout: `${EQUIP_EVERY} adrasite spear.`,
    options: [
      'Любому числу моделей их adrasite spear можно заменить на 1 pyrithite spear.',
    ],
  },

  'custodian-wardens': {
    flavor:
      'Ветераны с веками службы, Custodian Warden — хладнокровные воины, что поклялись сражаться как живые крепости, которые не пробьёт ни один враг. С пугающей яростью и железной волей эти воины рассекают врагов надвое огромными взмахами, движимыми их чудовищной физической силой.',
    abilities: {
      'Resolute Will':
        'Пока CHARACTER возглавляет этот юнит, каждый раз, когда атака нацеливается на этот юнит, если характеристика Силы (Strength) этой атаки больше характеристики Стойкости (Toughness) этого юнита, вычтите 1 из броска ранения.',
      'Living Fortress':
        'Один раз за битву, в начале любой фазы, этот юнит может задействовать эту способность. Если он это делает, до конца фазы модели этого юнита имеют способность Feel No Pain 4+.',
    },
    wargear: {
      Vexilla: VEXILLA,
    },
    loadout: `${EQUIP_EVERY} guardian spear.`,
    options: [
      'Любому числу моделей их guardian spear можно заменить на 1 castellan axe.',
      '1 модель можно снабдить 1 vexilla.',
    ],
  },

  'knight-centura': {
    flavor:
      'Knight-Centura — вожди кадров Sisters of Silence и хранительницы их традиций. Они заслужили уважение своих Сестёр годами службы, безупречным боевым мастерством, безмерной мощью как Null и энциклопедическим знанием ведьмы и чародея.',
    abilities: {
      'Seeker’s Instincts':
        'Пока эта модель возглавляет юнит, прибавьте 2" к характеристике Перемещения (Move) моделей этого юнита и прибавьте 2 к броскам продвижения и нападения для этого юнита.',
      'Daughter of the Abyss': DAUGHTER_ABYSS,
      'Corner the Quarry':
        'Каждый раз, когда вражеский юнит (исключая MONSTER и VEHICLE) в дистанции ввязывания юнита этой модели отступает, все модели этого вражеского юнита обязаны пройти проверку Desperate Escape. При этом, если этот вражеский юнит в боевом шоке, вычтите 1 из каждой из этих проверок.',
    },
    loadout: `${EQUIP_THIS} executioner greatblade.`,
    options: [
      'executioner greatblade этой модели можно заменить на одно из следующего:\n▪ 1 master-crafted boltgun и 1 close combat weapon\n▪ 1 Witchseeker flamer и 1 close combat weapon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'orion-assault-dropship': {
    flavor:
      'Тяжелобронированный Orion — непревзойдённый штурмовой корабль, созданный, чтобы переносить атаки, пока он высаживает свой грозный груз Custodian Guard. С полыхающим болтерным и энергетическим оружием Orion стремительно расчищает зону высадки и выпускает пассажиров, прежде чем взмыть ввысь, чтобы обрушить смерть на любые другие угрозы, что попали в его прицел.',
    abilities: {
      'Assault Dropship':
        'Если юнит высаживается из этого TRANSPORT прежде, чем он переместится, до конца хода этот юнит может нападать в ход, в который он продвигался.',
    },
    loadout: `${EQUIP_THIS} 2 arachnus heavy blaze cannons; 2 twin lastrum bolt cannons; 2 spiculus heavy bolt launchers; armoured hull.`,
    options: ['Нет.'],
    damaged: { note: 'осталось 1–7 ран', text: dmgHitMinus('1–7') },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Adeptus Custodes Infantry. Эта модель также может перевозить 1 Venerable Contemptor Dreadnought, 1 Contemptor-Achillus Dreadnought или 1 Contemptor Galatus-Dreadnought; при этом её транспортная вместимость снижается до 6 моделей ADEPTUS CUSTODES INFANTRY.',
  },

  'pallas-grav-attack': {
    flavor:
      'Созданный как высокоманевренный охотник-убийца, Pallas Grav-attack даёт Adeptus Custodes способность к стремительному удару, используя свою проворность и универсальный twin arachnus blaze cannon, чтобы наносить сокрушительные наскоки на врага или настигать бегущие цели, что ускользнули от наземных войск Custodes.',
    abilities: {
      'Merciless Hunter':
        'В вашей фазе стрельбы, каждый раз, когда эта модель совершает атаку по вражескому юниту, что ниже половинной численности, прибавьте 1 к броску ранения.',
    },
    loadout: `${EQUIP_THIS} twin arachnus blaze cannon; armoured hull.`,
    options: ['Нет.'],
  },

  prosecutors: {
    flavor:
      'Защищённые от злобы ведьм своей редкой антипсионической мутацией и от пуль и клинков врага своей тонко выделанной силовой бронёй, Prosecutor наступают, не дрогнув, в самое сердце битвы. Их bolter гремят без устали, и каждый разрывной снаряд обрывает очередную еретическую жизнь.',
    abilities: {
      'Daughters of the Abyss': DAUGHTERS_ABYSS,
      'Purity of Execution':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по юниту PSYKER, эта атака имеет способности [PRECISION] и [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_EVERY} boltgun; close combat weapon.`,
  },

  'sagittarum-custodians': {
    flavor:
      'В отличие от большинства воинов Adeptus Custodes, Sagittarum Guard специализируются на умерщвлении врагов на расстоянии, обрушивая грозные залпы из своих adrastus bolt caliver или тем же оружием стирая ближние угрозы точными дезинтеграционными лучами, безупречно переключаясь между режимами стрельбы.',
    abilities: {
      'Saturation Volleys':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит (исключая MONSTER и VEHICLE), поражённый одной или более из этих атак. До начала вашего следующего хода, пока этот юнит на поле боя, этот вражеский юнит подавлен. Пока юнит подавлен, каждый раз, когда его модель совершает атаку, вычтите 1 из броска попадания.',
      'Disintegration Beams':
        'Один раз за битву, в начале вашей фазы стрельбы, этот юнит может задействовать эту способность. Если он это делает, до конца фазы дальнобойное оружие моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_EVERY} adrastus bolt caliver; misericordia.`,
    options: ['Нет.'],
  },

  'shield-captain': {
    flavor:
      'Shield-Captain — одни из величайших воинов Империума. Каким бы оружием они ни владели, они являют абсолютное мастерство им. Их тактические и стратегические способности почти не знают равных, и они одним взглядом читают прилив и отлив войны, направляя свои силы соответственно.',
    abilities: {
      'Master of the Stances':
        'Один раз за битву, когда юнит этой модели выбирается для схватки, он может задействовать эту способность. Если он это делает, до отыгрыша этой схватки для этого юнита активны оба Ka’tah Stances, а не только один.',
      'Strategic Mastery':
        'Один раз за раунд боя вы можете выбрать одну модель из вашей армии с этой способностью. Юнит этой модели может быть выбран целью стратагемы. Если это так, уменьшите стоимость этого применения этой стратагемы на 1 CP.',
    },
    wargear: {
      'Praesidium shield': PRAESIDIUM_SHIELD,
    },
    loadout: `${EQUIP_THIS} guardian spear.`,
    options: [
      'guardian spear этой модели можно заменить на одно из следующего:\n▪ 1 castellan axe\n▪ 1 sentinel blade\n▪ 1 sentinel blade и 1 praesidium shield\n▪ 1 pyrithite spear и 1 praesidium shield',
    ],
    leader: { text: LEADER_TEXT },
  },

  'shield-captain-in-allarus-terminator-armour': {
    flavor:
      'Shield-Captain и без того один из грознейших бойцов и непревзойдённых стратегов Империума. Облачённый в почти непробиваемую броню Terminator из аурамита, он становится ещё могущественнее — ходячая крепость имперской мощи, способная телепортироваться прямо в бой во вспышке золотого света.',
    abilities: {
      'Auramite and Adamantine':
        'Один раз за битву, в начале любой фазы, эта модель может задействовать эту способность. Если она это делает, до конца фазы каждый раз, когда атака распределяется по этой модели, измените характеристику Урона (Damage) этой атаки на 1.',
      'Strategic Mastery':
        'Один раз за раунд боя вы можете выбрать одну модель из вашей армии с этой способностью и нацелить стратагему на юнит этой модели. Если это так, уменьшите стоимость этого применения этой стратагемы на 1 CP.',
    },
    loadout: `${EQUIP_THIS} balistus grenade launcher; guardian spear.`,
    options: ['guardian spear этой модели можно заменить на 1 castellan axe.'],
    leader: { text: LEADER_TEXT },
  },

  'shield-captain-on-dawneagle-jetbike': {
    flavor:
      'Все Shield-Captain — решительные воины, что не терпят помех своей миссии. Те Shield-Captain, что быстрее всех в мысли и действии, взмывают в бой на джетбайках Dawneagle, врезаясь в самое сердце врага. Хоть эти воины кажутся высокомерными, это далеко не так — их самоуверенность в полной мере оправдана их мастерством.',
    abilities: {
      'Sweeping Advance':
        'Один раз за битву, в конце фазы ближнего боя, если юнит этой модели сражался в этой фазе: если он в дистанции ввязывания одного или более вражеских юнитов, он может совершить отступление, или, если он не в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр.',
      'Strategic Mastery':
        'Один раз за раунд боя вы можете выбрать одну модель из вашей армии с этой способностью и нацелить стратагему на юнит этой модели. Если это так, уменьшите стоимость этого применения этой стратагемы на 1 CP.',
    },
    loadout: `${EQUIP_THIS} salvo launcher; interceptor lance.`,
    options: ['salvo launcher этой модели можно заменить на 1 Vertus hurricane bolter.'],
    leader: { text: LEADER_TEXT },
  },

  'telemon-heavy-dreadnought': {
    flavor:
      'Честь заточения в Telemon Heavy Dreadnought выпадает самым прославленным Custodian, чью боевую доблесть сочли под стать чистой мощи Telemon. Заключённые внутри, такие души сражаются дальше рядом с братьями, устремляясь ли вперёд с праведной яростью или отражая штурмы своим spiculus bolt launcher.',
    abilities: {
      'Guardian Eternal':
        'Каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.',
      'Devoted to Destruction':
        'Если эта модель вооружена 2 Telemon caestus в дополнение к своему оружию armoured feet, прибавьте 2 к характеристике Атак (Attacks) этих Telemon caestus.',
    },
    loadout: `${EQUIP_THIS} 2 iliastus accelerator culverins; spiculus bolt launcher; armoured feet.`,
    options: [
      '2 iliastus accelerator culverins этой модели можно заменить на одно из следующего:\n▪ 2 arachnus storm cannons\n▪ 2 Telemon caestus и 2 twin plasma projectors\n▪ 1 iliastus accelerator culverin и 1 arachnus storm cannon\n▪ 1 iliastus accelerator culverin, 1 Telemon caestus и 1 twin plasma projector\n▪ 1 arachnus storm cannon, 1 Telemon caestus и 1 twin plasma projector',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'trajann-valoris': {
    flavor:
      'Воинская доблесть Траянна Валориса приближается к доблести примархов древности. Watcher’s Axe он может рассечь саркофаг Chaos Helbrute одним взмахом или использовать встроенное в него болтерное оружие — известное как Eagle’s Scream, — чтобы выкашивать вражескую пехоту залпами адамантиевых бронебойных болтов.',
    abilities: {
      'Captain-General':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, вы можете игнорировать любые или все модификаторы характеристик Навыка стрельбы (Ballistic Skill) или Навыка ближнего боя (Weapon Skill) этой атаки и/или все модификаторы броска попадания.',
      'Moment Shackle':
        'Один раз за битву, в начале фазы ближнего боя, вы можете выбрать одно из следующего, что действует до конца фазы:\n▪ Оружие ближнего боя Watcher’s Axe этой модели имеет характеристику Атак (Attacks) 12.\n▪ Эта модель имеет инвулевый спас-бросок 2+.',
    },
    loadout: `${EQUIP_THIS} Watcher’s Axe.`,
    leader: { text: LEADER_TEXT },
  },

  valerian: {
    flavor:
      'Своевольный воин, Валериан относительно недавно в Custodes, но уже отмечен для величия. Его порыв нести смерть врагам Императора за пределами Терры высоко ценится в эти тёмные времена, и бессчётные враги пали от его guardian spear по имени Gnosis.',
    abilities: {
      'Golden Laurels':
        'Пока эта модель возглавляет юнит, каждый раз, когда атака ближнего боя нацеливается на этот юнит, ухудшите характеристику Пробития брони (Armour Penetration) этой атаки на 1.',
      'Hero of Lion’s Gate':
        'Один раз за битву, после того как для этой модели сделан бросок попадания, бросок ранения или спас-бросок, вы можете изменить результат этого броска на немодифицированный 6.',
    },
    loadout: `${EQUIP_THIS} Gnosis.`,
    leader: { text: LEADER_TEXT },
  },

  'venatari-custodians': {
    flavor:
      'Роль Venatari Custodian почитается как высокая честь в Adeptus Custodes, даруемая тем, у кого острейшее орлиное боевое чутьё. Эти воздушные охотничьи отряды мастерски используют свои археотех-jump pack, чтобы бить с небес, пикируя в гущу врага, чтобы нести стремительную погибель своими пистолетами и древковым оружием.',
    abilities: {
      'Strike from the Skies':
        'Этот юнит может стрелять и объявлять нападение в ход, в который он отступал.',
      'Swooping Dive':
        'Один раз за битву вы можете нацелить стратагему Rapid Ingress на этот юнит за 0 CP, и можете сделать это, даже если вы уже нацелили эту стратагему на другой юнит в этой фазе.',
    },
    wargear: {
      'Tarsis Buckler': 'Носитель имеет характеристику Ран (Wounds) 4.',
    },
    loadout: `${EQUIP_EVERY} Venatari lance.`,
    options: [
      'Любому числу моделей их Venatari lance можно заменить на 1 kinetic destroyer и 1 tarsus buckler.',
    ],
  },

  'venerable-contemptor-dreadnought': {
    flavor:
      'Эти громадные боевые шагоходы пилотируются павшими веками назад героями, которых сохраняют живыми незаменимые технологии. Оснащённые оружием, что может плавить броню и разрывать пехоту, Venerable Contemptor Dreadnought наносят страшный урон, всё это время защищённые атомантическими щитами и протоколами саморемонта.',
    abilities: {
      'Unyielding Ancient':
        'Когда эта модель уничтожается впервые, уберите её из игры, не отыгрывая её способность Deadly Demise. Затем, в конце фазы, бросьте один D6: на 2+ снова поставьте эту модель на поле боя как можно ближе к месту, где она была уничтожена, и не в дистанции ввязывания каких-либо вражеских юнитов, с D6 оставшимися ранами.',
    },
    loadout: `${EQUIP_THIS} combi-bolter; multi-melta; Contemptor combat weapon.`,
    options: ['multi-melta этой модели можно заменить на 1 Kheres-pattern assault cannon.'],
  },

  'venerable-land-raider': {
    flavor:
      'Land Raider — тяжело вооружённые подвижные крепости. Обладая сверхпрочной адамантиевой бронёй и грозным набором оружия, они и их груз воинов Custodian могут переломить ход войны одним залпом, а их машинные духи столь мощны, что могут сражаться дальше, даже если экипаж перебит.',
    abilities: {
      'Assault Ramp': ASSAULT_RAMP,
    },
    loadout: `${EQUIP_THIS} 2 godhammer lascannons; twin heavy bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей Adeptus Custodes Infantry.',
  },

  'vertus-praetors': {
    flavor:
      'Ветераны, что видели бой на сотне миров, эти Custodian знают, что ценность скорости — в том, чтобы направлять свою мощь точно туда и тогда, где и когда она нужнее всего. Мастера и ближнего боя, и стрельбы, они наносят пронзающие удары и смертоносные залпы с точностью даже на огромной скорости.',
    abilities: {
      'Turbo-boost': TURBO_BOOST,
      'Quicksilver Execution':
        'Один раз за битву, после того как этот юнит завершил обычный манёвр или продвижение, вы можете выбрать один вражеский юнит (исключая юниты MONSTER и VEHICLE), над которым он прошёл в этом манёвре, затем бросить один D6 за каждую модель этого юнита: за каждый 2+ этот вражеский юнит получает 2 смертельные раны.',
    },
    loadout: `${EQUIP_EVERY} salvo launcher; interceptor lance.`,
    options: [
      'Любому числу моделей их salvo launcher можно заменить на 1 Vertus hurricane bolter.',
    ],
  },

  vigilators: {
    flavor:
      'Вернейший способ положить конец злотворному буйству ведьмы — снести ей голову с плеч. Такова доктрина Vigilator, что призраками скользят по полю боя, прежде чем броситься очертя голову в бой, и их двуручные силовые клинки поют пронзительную песнь смерти.',
    abilities: {
      'Daughters of the Abyss': DAUGHTERS_ABYSS,
      'Deft Parry':
        'Каждый раз, когда атака ближнего боя нацеливается на этот юнит, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_EVERY} executioner greatblade.`,
  },

  witchseekers: {
    flavor:
      'Witchseeker владеют освящёнными flamer, выслеживая ведьм и в запутанных коридорах, и в грязных траншеях. Сближаясь со своей еретической добычей, они обрушивают ревущий пожар, чтобы испепелить врага, как и любой погребальный костёр.',
    abilities: {
      'Daughters of the Abyss': DAUGHTERS_ABYSS,
      'Sanctified Flames':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит, поражённый одной или более из этих атак. Этот вражеский юнит обязан пройти проверку боевого шока.',
    },
    loadout: `${EQUIP_EVERY} Witchseeker flamer; close combat weapon.`,
    options: ['Нет.'],
  },
}

export const abilityNamesRu = {
  'Guardian Eternal': 'Вечный страж',
  'Devoted to Destruction': 'Преданный разрушению',
  'Captain-General': 'Капитан-генерал',
  'Moment Shackle': 'Оковы мгновения',
  'Golden Laurels': 'Золотые лавры',
  'Hero of Lion’s Gate': 'Герой Львиных Врат',
  'Strike from the Skies': 'Удар с небес',
  'Swooping Dive': 'Пикирующий налёт',
  'Tarsis Buckler': 'Баклер Tarsis',
  'Unyielding Ancient': 'Несгибаемый древний',
  'Assault Ramp': 'Штурмовая аппарель',
  'Quicksilver Execution': 'Ртутная казнь',
  'Deft Parry': 'Ловкое парирование',
  'Sanctified Flames': 'Освящённое пламя',
  'Resolute Will': 'Непреклонная воля',
  'Living Fortress': 'Живая крепость',
  'Seeker’s Instincts': 'Инстинкты искателя',
  'Corner the Quarry': 'Загнать добычу',
  'Assault Dropship': 'Штурмовой десантный корабль',
  'Merciless Hunter': 'Беспощадный охотник',
  'Purity of Execution': 'Чистота исполнения',
  'Saturation Volleys': 'Насыщающие залпы',
  'Disintegration Beams': 'Дезинтеграционные лучи',
  'Master of the Stances': 'Мастер стоек',
  'Strategic Mastery': 'Стратегическое мастерство',
  'Praesidium shield': 'Щит Praesidium',
  'Auramite and Adamantine': 'Аурамит и адамантий',
  'Sweeping Advance': 'Стремительное продвижение',
  'Turbo-boost': 'Турбо-ускорение',
  'Implacable Vanguard': 'Неумолимый авангард',
  'Tactical Perception': 'Тактическое чутьё',
  'Tenacious Spirit': 'Цепкий дух',
  'Daughter of the Abyss': 'Дочь Бездны',
  'Slayers of Tyrants': 'Убийцы тиранов',
  'From Golden Light': 'Из золотого света',
  Vexilla: 'Vexilla',
  'Daughters of the Abyss': 'Дочери Бездны',
  'Self Repair': 'Самопочинка',
  'Heavy Assault Infantry': 'Тяжёлая штурмовая пехота',
  'Infernus Firebombs': 'Зажигательные бомбы Infernus',
  'Swift Onslaught': 'Стремительный натиск',
  'Martial Inspiration': 'Воинское вдохновение',
  'Advanced Firepower': 'Передовая огневая мощь',
  'Dread Foe': 'Грозный враг',
  'Galatus Shield': 'Щит Galatus',
  'Fire Support': 'Огневая поддержка',
  'Stand Vigil': 'Нести стражу',
  'Sentinel Storm': 'Буря часового',
  'Praesidium Shield': 'Щит Praesidium',
  'No Foe Shall Stand': 'Ни один враг не устоит',
}
