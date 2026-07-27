// Adepta Sororitas — русский перевод листов данных. Разреженный оверлей поверх EN
// (см. ./index.js): переведены только тексты (flavor, тексты способностей, loadout/options,
// damaged/leader/transport). Имена юнитов/оружия, характеристики, ключевые слова, названия
// правил и механик (Miracle dice, Act of Faith, Adepta Sororitas, simulacrum imperialis),
// [BRACKET]-теги и ALL-CAPS-названия способностей остаются английскими. `abilityNamesRu`
// (внизу) даёт RU-подписи названий.

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const SACRED_COMMAND =
  'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда он выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.'
const SIMULACRUM =
  'В конце вашей фазы командования за каждый маркер цели, который вы контролируете и в радиусе которого есть один или более юнитов из вашей армии с этой способностью, бросьте один D6: на 4+ вы получаете 1 Miracle dice со значением, равным этому результату.'
const CHERUB =
  'Один раз за битву, после того как этот юнит совершил Act of Faith, вы получаете 1 Miracle dice.\n**Примечание разработчика:** положите рядом с юнитом жетон Cherub, убрав его, как только эта способность будет задействована.'
const SACRED_BANNER = 'Вы можете перебрасывать броски продвижения и нападения для юнита носителя.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'aestred-thurga-and-agathae-dolan': {
    flavor:
      'Эстред Турга — и сама по себе могучая воительница, но с великим смирением сознаёт, что древний реликтовый штандарт, что она несёт, куда важнее, чем она когда-либо сможет быть. Она с радостью умрёт, защищая Auto-Tapestry of the Emperor’s Judgement, а Сёстры, что сражаются рядом, вдохновляются на великие деяния веры в его присутствии — деяния, записываемые Хагиолатером, Агатой Долан.',
    abilities: {
      'Auto-Tapestry of the Emperor’s Judgement':
        'Пока этот юнит возглавляет юнит и содержит модель Aestred Thurga, оружие моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
      'Recount the Deeds of the Saints':
        'Пока этот юнит возглавляет юнит и содержит модель Agathae Dolan, каждый раз, когда этот юнит уничтожает вражеский юнит, вы получаете 1 Miracle dice. Когда эта модель Agathae Dolan уничтожается, вы получаете D3 Miracle dice.',
    },
    loadout:
      '**Aestred Thurga вооружена:** bolt pistol; Blade of Vigil.\n\n**Agathae Dolan вооружена:** bolt pistol; scribe’s staff.',
    leader: { text: LEADER_TEXT },
  },

  'arco-flagellants': {
    flavor:
      'Arco-flagellant снабжены кибернетическим оружием и подкожными помпами со стимуляторами в наказание за прошлые проступки. Когда начинается бой, их тела заряжаются кодовым словом, и их спускают на врага. Любого противника, до которого они добираются, они рвут в клочья кибер-имплантированными цепами.',
    abilities: {
      'Extremis Trigger Word':
        'Каждый раз, когда этот юнит выбирается для схватки, вы можете призвать его крайнее кодовое слово. Если вы это делаете, до конца фазы arco-flail моделей этого юнита имеют характеристику Атак (Attacks) 6 и способность [HAZARDOUS].',
    },
    loadout: `${EQUIP_EVERY} arco-flails.`,
  },

  'battle-sisters-squad': {
    flavor:
      'Battle Sister из Orders Militant — искусные и набожные воительницы. Куда бы они ни продвигались, свет Императора распространяется, как святой рассвет. В их присутствии являются чудеса, что отводят удары врага или пожирают противников огнём возмездия, пока Сёстры выкашивают еретиков громовыми залпами своих boltgun.',
    abilities: {
      Cherub: CHERUB,
      'Defenders of the Faith':
        'В конце вашей фазы командования, если этот юнит находится в радиусе маркера цели, который вы контролируете, этот маркер цели остаётся под вашим контролем, пока Уровень контроля (Level of Control) вашего оппонента над этим маркером не окажется больше вашего в конце какой-либо фазы.',
    },
    wargear: {
      'Simulacrum Imperialis': SIMULACRUM,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: [
      'boltgun у Sister Superior можно заменить на одно из следующего:\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 condemnor boltgun\n▪ 1 inferno pistol\n▪ 1 Ministorum hand flamer\n▪ 1 plasma pistol',
      'Sister Superior можно снабдить одним из следующего:\n▪ 1 chainsword\n▪ 1 power weapon',
      'boltgun у 1 Battle Sister можно заменить на одно из следующего:\n▪ 1 artificer-crafted storm bolter\n▪ 1 meltagun\n▪ 1 Ministorum flamer',
      'boltgun у 1 Battle Sister можно заменить на одно из следующего:\n▪ 1 artificer-crafted storm bolter\n▪ 1 heavy bolter\n▪ 1 meltagun\n▪ 1 Ministorum flamer\n▪ 1 Ministorum heavy flamer\n▪ 1 multi-melta',
      '1 Battle Sister, вооружённую 1 boltgun, можно снабдить 1 simulacrum imperialis (boltgun этой модели заменить нельзя).',
    ],
  },

  canoness: {
    flavor:
      'Военные и духовные командиры Orders Militant, Canoness — в равной мере ветераны-воительницы с десятилетиями опыта и сияющие образцы чистоты. Обладая безупречными лидерскими качествами, тактическим гением и безмерной верой, они — маяки и благочестивой добродетели, и святого гнева.',
    abilities: {
      'Sacred Command': SACRED_COMMAND,
      'The Emperor’s Grace':
        'Один раз за битву, в начале любой фазы, эта модель может задействовать эту способность. Если она это делает, до конца фазы эта модель имеет инвулевый спас-бросок 2+.',
    },
    wargear: {
      'Null Rod':
        'Модели юнита носителя имеют способность Feel No Pain 4+ против смертельных ран и Psychic Attacks.',
      'Rod of Office':
        'Каждый раз, когда модель юнита носителя совершает атаку, перебросьте бросок попадания, равный 1.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; hallowed chainsword.`,
    options: [
      'bolt pistol этой модели можно заменить на одно из следующего:\n▪ 1 condemnor boltgun\n▪ 1 inferno pistol\n▪ 1 plasma pistol',
      'hallowed chainsword этой модели можно заменить на одно из следующего:\n▪ 1 blessed blade\n▪ 1 power weapon',
      'Если эта модель вооружена hallowed chainsword, её можно снабдить одним из следующего:\n▪ 1 brazier of holy fire\n▪ 1 null rod',
      'Если эта модель вооружена plasma pistol и power weapon, её можно снабдить:\n▪ 1 rod of office',
    ],
    leader: { text: LEADER_TEXT },
  },

  'canoness-with-jump-pack': {
    flavor:
      'Многие Canoness идут в бой с jump pack, используя их, чтобы спускаться с небес и вершить правосудие Императора. Сочетая стратегический опыт с боевым мастерством, они ведут отряды крылатых воительниц в бушующее сердце битвы.',
    abilities: {
      'Sacred Command': SACRED_COMMAND,
      'Divine Deliverance':
        'Один раз за битву, в начале фазы ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы прибавьте 3 к характеристике Атак (Attacks) оружия ближнего боя этой модели, и это оружие имеет способность [DEVASTATING WOUNDS].',
    },
    loadout: `${EQUIP_THIS} blessed halberd.`,
    options: [
      'blessed halberd этой модели можно заменить на одно из следующего:\n▪ 1 holy eviscerator\n▪ 1 Ministorum hand flamer и 1 power weapon',
    ],
    leader: { text: LEADER_TEXT },
  },

  castigator: {
    flavor:
      'Castigator — мощные боевые танки Adepta Sororitas. Они обеспечивают превосходную огневую поддержку Battle Sister благодаря широкому набору оружия, проламывая вражеские линии и истребляя целые полосы вражеской пехоты за считаные секунды.',
    abilities: {
      'Rites of Castigation':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца хода каждый раз, когда дружественный юнит ADEPTA SORORITAS совершает дальнобойную атаку по этому вражескому юниту, улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1. Один и тот же вражеский юнит может быть затронут этой способностью только один раз за ход.',
    },
    loadout: `${EQUIP_THIS} Castigator autocannons; 3 heavy bolters; armoured tracks.`,
    options: [
      'Castigator autocannons этой модели можно заменить на 1 Castigator battle cannon.',
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'celestian-insidiants': {
    flavor:
      'Celestian Insidiant — теневые фигуры, что специализируются на выслеживании ведьм и прочих еретиков для пленения или убийства. Пользуясь хитростью и мастерством, чтобы подкрасться к врагам, они внезапно взрываются действием среди рычащих молитв и проклятий, разя добычу огнём condemnor и повергая её клинком и булавой.',
    abilities: {
      'Rituale Nullificatus':
        'Модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks и смертельных ран.',
      'Virtue of Intolerance':
        'В начале битвы выберите один юнит из армии вашего оппонента как добычу этого юнита. Каждый раз, когда модель этого юнита совершает атаку по своей добыче, эта атака имеет способность [PRECISION], и вы можете перебросить бросок попадания. Эту способность можно задействовать, даже если этот юнит погружён в Transport.',
    },
    wargear: {
      'Simulacrum Imperialis': SIMULACRUM,
      'Denuncia Oratory':
        'Каждый раз, когда добыча юнита носителя уничтожается, вы можете выбрать новый юнит из армии вашего оппонента как его добычу.',
    },
    special: {
      'ATTACHED UNIT':
        'Если юнит Character из вашей армии можно присоединить к юниту Dominion Squad, его можно вместо этого присоединить к этому юниту.',
    },
    loadout: `**Каждая модель вооружена:** condemnor bolt pistol; null mace.`,
    options: [
      'condemnor bolt pistol у Celestian Insidiant Superior можно заменить на 1 inferno pistol.',
      'До 2 Celestian Insidiant их condemnor bolt pistol можно заменить на 1 Ministorum hand flamer.',
      'До 2 Celestian Insidiant их condemnor bolt pistol и null mace можно заменить на 1 blessed sword.',
      'condemnor bolt pistol и null mace у одного Celestian Insidiant можно заменить на 1 virge of admonition.',
      'condemnor bolt pistol у одного Celestian Insidiant можно заменить на 1 denuncia oratory.',
      'Одного Celestian Insidiant, вооружённого 1 condemnor bolt pistol, можно снабдить 1 simulacrum imperialis (condemnor bolt pistol этой модели заменить нельзя).',
    ],
  },

  'celestian-sacresants': {
    flavor:
      'Часть целестианской элиты Orders Militant, Celestian Sacresant — специалисты ближнего боя, что — вместо роли телохранителей — облечены святым поиском. Будь то добыть священные реликвии или очистить места скверны, Sacresant неустанны в своём стремлении к победе.',
    abilities: {
      'Sworn Protectors':
        'Пока ADEPTA SORORITAS CHARACTER возглавляет этот юнит, каждый раз, когда атака нацеливается на этот юнит, вычтите 1 из броска ранения.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; hallowed mace.`,
    options: [
      'Любому числу моделей их hallowed mace можно заменить на 1 anointed halberd.',
      'bolt pistol у Sacresant Superior можно заменить на одно из следующего:\n▪ 1 inferno pistol\n▪ 1 Ministorum hand flamer\n▪ 1 plasma pistol',
      'hallowed mace у Sacresant Superior можно заменить на 1 spear of the faithful.',
    ],
  },

  daemonifuge: {
    flavor:
      'Эфраэль Стерн, Daemonifuge, способна являть странные силы, что некоторые считают колдовством. Но она — ревностная защитница Имперского Кредо с непоколебимой преданностью. Вместе со своим спутником-эльдари, Kyganil, Стерн обращает свою усиленную силу и скорость против врагов Императора.',
    abilities: {
      'Holy Judgement':
        'В начале вашей фазы стрельбы выберите один вражеский юнит в пределах 12" от модели Ephrael Stern этого юнита и видимый ей. Этот юнит обязан пройти проверку боевого шока, вычтя 2 из результата, если это юнит CHAOS. Если проверка провалена, этот вражеский юнит получает 3 смертельные раны.',
      'Mysterious Saviours':
        'Вы можете нацелить стратагему Heroic Intervention на этот юнит, независимо от любых других применений этой стратагемы в этой фазе. Если вы это делаете:\n▪ Это применение стоит на 1 CP меньше.\n▪ Это применение не мешает применить эту стратагему на других юнитах в этой фазе.',
    },
    loadout:
      '**Ephrael Stern вооружена:** bolt pistol; Sanctity.\n\n**Kyganil of the Bloody Tears вооружён:** the Outcast’s Weapons.',
  },

  dialogus: {
    flavor:
      'Dialogus заглушает боевые кличи врага возгласами восторженной хвалы Богу-Императору. Она транслирует свои литургии Сёстрам через их вокс-бусины и сенсорные массивы, а её laud hailer усиливает вдохновляющую риторику молитв и гимнов по всему полю боя.',
    abilities: {
      'Laud Hailer':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит ADEPTA SORORITAS, который в боевом шоке и находится в пределах 12" от этой модели. Этот юнит больше не в боевом шоке.',
      'Stirring Rhetoric':
        'Пока эта модель возглавляет юнит, каждый раз, когда юнит этой модели совершает Act of Faith, значение одного из Miracle dice, использованных в этом Act of Faith, сначала меняется на 6.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Dialogus staff.`,
    leader: { text: LEADER_TEXT },
  },

  dogmata: {
    flavor:
      'Зоркими глазами Сёстры Dogmata выискивают проступки в своём Ордене. Их боятся не меньше, чем уважают: одним словом они могут обречь Сестру на Repentia. Криками молитв и мощными взмахами булав они являют путь праведности и показывают, чего Сёстрам ждать, если те не исполнят свой долг.',
    abilities: {
      'Executioner of Heretics (Aura)':
        'Пока вражеский юнит находится в пределах 6" от этой модели, ухудшите характеристику Лидерства (Leadership) моделей этого юнита на 1.',
      'Unflinching Determination':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; mace of the righteous.`,
    leader: { text: LEADER_TEXT },
  },

  'dominion-squad': {
    flavor:
      'Dominion Squad бьют стремительно и яростно, как молния, зачищая бункеры, захватывая стратегические точки и притупляя контратаки жестокими залпами из своих flamer и meltagun. Они агрессивны, но не порывисты, сочетая жажду убийства с пониманием тактической ценности и неся праведность туда, где она нужнее всего.',
    abilities: {
      Cherub: CHERUB,
      'Righteous Awareness':
        'В фазе перемещения вашего оппонента, если вражеский юнит завершает манёвр в пределах 8" от этого юнита, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр до D6".',
    },
    wargear: {
      'Simulacrum Imperialis': SIMULACRUM,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; boltgun; close combat weapon.`,
    options: [
      'boltgun у Dominion Superior можно заменить на одно из следующего:\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 condemnor boltgun\n▪ 1 inferno pistol\n▪ 1 Ministorum hand flamer\n▪ 1 plasma pistol',
      'Dominion Superior можно снабдить одним из следующего:\n▪ 1 chainsword\n▪ 1 power weapon',
      'До 4 Dominion их boltgun можно заменить на одно из следующего:\n▪ 1 artificer-crafted storm bolter\n▪ 1 meltagun\n▪ 1 Ministorum flamer',
      '1 Dominion, вооружённого 1 boltgun, можно снабдить 1 simulacrum imperialis (boltgun этой модели заменить нельзя).',
    ],
  },

  exorcist: {
    flavor:
      'Каждый всплеск нот, исполненный артиллеристом Exorcist, загружает решения наведения и координаты попадания, чтобы залпы трижды благословлённых ракет летели во врага. Больше, чем артиллерийские танки, Exorcist — передвижные храмы величию Императора, что вещают вдохновляющие боевые песнопения.',
    abilities: {
      'Devastating Refrain':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, если одна или более из этих атак, сделанных оружием Indirect Fire, поразили вражеский юнит, этот юнит обязан пройти проверку боевого шока. Каждый раз, когда такая атака уничтожает вражескую модель со способностью Deadly Demise, способность Deadly Demise этой модели наносит смертельные раны на броске D6 5+, а не на 6.',
    },
    loadout: `${EQUIP_THIS} Exorcist missile launcher; heavy bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Exorcist missile launcher этой модели можно заменить на 1 Exorcist conflagration rockets.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  hospitaller: {
    flavor:
      'Hospitaller — телесные и духовные целительницы. Они обладают медицинским мастерством, а также служат источником веры для нуждающихся, шепча мантры бодрости, чтобы притупить боль, и вознося молитвы, чтобы успокоить воспалённый разум. Они быстро движутся по полю боя, работая в торжественном спокойствии, невзирая на тягчайшие условия.',
    abilities: {
      'Medicus Ministorum':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+.',
      'Sacred Healing':
        'Пока эта модель возглавляет юнит, в вашей фазе командования вы можете вернуть до 1 уничтоженной модели (исключая модели CHARACTER) в этот юнит. Если хотите, вы можете сначала сбросить 1 Miracle dice; если вы это делаете, вы можете вместо этого вернуть до D3+1 уничтоженных моделей (исключая модели CHARACTER) в этот юнит.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; chirurgeon’s tools.`,
    leader: { text: LEADER_TEXT },
  },

  imagifier: {
    flavor:
      'Священнейшая роль Imagifier — превозносить добродетели павших Сестёр и проповедовать сказания об их святых деяниях. Imagifier вздымают ввысь великие стяги с образом мученицы, испещрённые святыми текстами, и идут туда, где бой всего гуще, чтобы читать литании и вдохновлять сестёр.',
    abilities: {
      'Litany of Deeds':
        'Каждый раз, когда вы получаете Miracle dice в результате уничтожения юнита или модели ADEPTA SORORITAS из вашей армии, если этот юнит или модель были уничтожены в пределах 12" от этой модели, вы можете перебросить результат этого Miracle dice, прежде чем добавить его в свой пул Miracle dice.',
      'Stanchion of Holy Martyrs':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют характеристику Спас-броска (Save) 2+ и инвулевый спас-бросок 4+.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; boltgun; close combat weapon.`,
    leader: { text: LEADER_TEXT },
  },

  immolator: {
    flavor:
      'Этот вариант Rhino обладает агрессивным машинным духом и оснащён замысловатой башней с мощной оружейной системой. Это делает его идеальным для стремительных бросков, чтобы зачищать вражеские опорные пункты, обеспечивая огневую поддержку войскам, что он везёт в бой, и служа эскортом бронеколонн.',
    abilities: {
      'Purge and Cleanse':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы этот вражеский юнит не может иметь Benefit of Cover.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; immolation flamers; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'immolation flamers этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей Adepta Sororitas Infantry. Она не может перевозить модели Jump Pack или the Triumph of Saint Katherine.\n\nВ начале шага Declare Battle Formations вы можете выбрать один Battle Sisters Squad, Dominion Squad или Sisters Novitiate Squad из вашей армии. Если вы это делаете, этот юнит делится на два юнита с как можно более равным числом моделей (при делении юнита так отметьте, какие модели образуют каждый из двух новых юнитов. Если вы делите юнит со способностью Cherub, только один из новых юнитов может задействовать эту способность за битву — отметьте, какой именно). Один из этих юнитов обязан начать битву погружённым в этот TRANSPORT; другой может начать битву погружённым в другой Transport или может быть развёрнут как отдельный юнит.',
  },

  'intranzia-fraye': {
    flavor:
      'Едущая в бой на своём Throne of Blame, Интранция Фрай разит нечистых, выкрикивая вокс-усиленные обличения. Враги, выделенные для её суда, становятся средоточием гнева её сестёр: Adepta Sororitas яростно стремятся очистить этих еретиков, дабы самим не быть осуждёнными и наказанными их нетерпимой Dogmata Superior.',
    abilities: {
      'Righteous Denunciation':
        'В начале фазы ближнего боя каждый вражеский юнит в пределах 6" от этой модели обязан пройти проверку боевого шока, вычтя 1 из этой проверки.',
      'Judged for Execution':
        'В конце вашей фазы перемещения вы можете выбрать один вражеский юнит в пределах 18" от этой модели и видимый ей. До начала вашей следующей фазы командования каждый раз, когда дружественная модель ADEPTA SORORITAS совершает атаку по этому вражескому юниту, эта атака имеет способность [LETHAL HITS].',
    },
    loadout: `${EQUIP_THIS} 2 heavy bolters, 2 Ministorum heavy flamers; 1 melta missile array; 1 Mace of Saint Praxedes; 1 Throne of Blame.`,
    options: ['Нет.'],
  },

  'junith-eruita': {
    flavor:
      'Джунит Эруита несётся в бой, окутанная святым огнём. Она парит над полем боя на гудящих волнах энергии в кафедре Saint Holline’s Basilica. Её присутствие и голос вдохновляют всех вокруг, наполняя их верой, а её heavy flamer окатывают врагов очищающим пламенем.',
    abilities: {
      'The Pulpit of Saint Holline’s Basilica':
        'Этот юнит имеет STEALTH. Атаки ближнего боя, что нацеливаются на этот юнит, имеют -1 к броскам попадания.',
      'Fiery Conviction':
        'Если эта модель на поле боя в начале вашей фазы командования, вы можете выбрать одно из следующего:\n▪ Сбросить 1 Miracle dice и получить 1 CP.\n▪ Пройти проверку лидерства для этой модели; если она пройдена, получить 1 CP.',
    },
    loadout: `${EQUIP_THIS} twin Ministorum heavy flamer; Mace of Castigation.`,
    leader: { text: LEADER_TEXT },
  },

  'ministorum-priest': {
    flavor:
      'Роль Ministorum Priest — обуздывать веру имперских воинов в бою. Часто они присоединяются к Войнам Веры — хотя не редкость, когда такую войну ведёт сам Ministorum Priest. Они полны грозного религиозного пыла, что подстрекает верных, пока они рычат катехизисы ненависти.',
    abilities: {
      'Righteous Smiting':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску ранения.',
      Zealot:
        'Один раз за битву, в фазе ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы улучшите характеристики Силы (Strength) и Атак (Attacks) оружия ближнего боя этой модели на 3.',
    },
    loadout: `${EQUIP_THIS} zealot’s vindictor.`,
    options: ['zealot’s vindictor этой модели можно заменить на 1 holy pistol и 1 power weapon.'],
    leader: { text: LEADER_TEXT },
  },

  mortifiers: {
    flavor:
      'Пилот Mortifier — Sister Repentia, что бежала с поля боя. Прикрученные внутри бронированной оболочки Mortifier, они не могут двигаться, говорить или слышать. Терпя нескончаемый стыд и агонию, они, гонимые безумием и болью, прорубают путь увечий и разрушения сквозь врага.',
    abilities: {
      'Anguish of the Unredeemed':
        'Каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6. На 2+ не убирайте её из игры; эта уничтоженная модель может сражаться после того, как атакующий юнит закончил свои атаки, а затем убирается из игры.',
    },
    wargear: {
      'Anchorite Sarcophagus':
        'Носитель имеет характеристику Перемещения (Move) 7" и характеристику Спас-броска (Save) 3+.',
    },
    loadout: `${EQUIP_EVERY} 2 heavy bolters; twin penitent buzz-blades.`,
    options: [
      '1 модель можно снабдить 1 anchorite sarcophagus.',
      'Любому числу моделей их 2 heavy bolters можно заменить на одно из следующего:\n▪ 1 heavy bolter и 1 Mortifier flamer\n▪ 2 Mortifier flamers',
      'Любому числу моделей их twin penitent buzz-blades можно заменить на одно из следующего:\n▪ 1 twin penitent flails\n▪ 1 penitent buzz-blade и 1 penitent flail',
    ],
  },

  'morvenn-vahl': {
    flavor:
      'Агрессивная, дерзкая и немногословная, Морвенн Валь ведёт Adepta Sororitas с передовой. Выходя на поле в древнем Paragon Warsuit, она разит врага за врагом оглушительными очередями Fidelis, сокрушительными залпами ракет и точными выпадами Lance of Illumination.',
    abilities: {
      'Abbess Sanctorum':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, вы можете перебросить бросок попадания и бросок ранения.',
      'Righteous Repugnance':
        'Каждый раз, когда юнит этой модели выбирается для стрельбы или схватки, вы можете сбросить 1 Miracle dice. Если вы это делаете, до конца фазы прибавьте 3 к характеристике Атак (Attacks) Fidelis и Lance of Illumination. Каждый раз, когда вражеский юнит уничтожается этой моделью, вы получаете 1 Miracle dice.',
    },
    loadout: `${EQUIP_THIS} Fidelis; Paragon missile launcher; Lance of Illumination.`,
    leader: { text: LEADER_TEXT },
  },

  palatine: {
    flavor:
      'Palatine — крайне способные и опытные командиры Миссий Adepta Sororitas. Непоколебимые в вере и цели, они служат превосходным примером Battle Sister, что следуют за ними. Это делает их мощной силой на поле боя, вдохновляющей ревностных воительниц на победу.',
    abilities: {
      'Fury of the Righteous':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Rapturous Blows':
        'Каждый раз, когда юнит этой модели выбирается для схватки, вы можете сбросить 1 Miracle dice. Если вы это делаете, до конца фазы каждый раз, когда атака ближнего боя этой модели наносит ранение, цель этой атаки получает 1 смертельную рану в дополнение к любому обычному урону.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Palatine blade.`,
    options: ['bolt pistol этой модели можно заменить на 1 plasma pistol.'],
    leader: { text: LEADER_TEXT },
  },

  'paragon-warsuits': {
    flavor:
      'Пилот должен обладать безмерной верой, чтобы дух Paragon Warsuit доверился ей. Ей нужно и невероятное мастерство, чтобы управлять его системой управления, что позволяет совершать крайне сложные и плавные движения. Овладение Paragon Warsuit делает Сестру способной сойтись с грознейшими врагами и выйти победительницей.',
    abilities: {
      'Righteous Paragons':
        'Каждый раз, когда модель этого юнита совершает атаку по юниту MONSTER или VEHICLE, прибавьте 1 к броску попадания и 1 к броску ранения.',
    },
    loadout: `${EQUIP_EVERY} bolt pistol; heavy bolter; Paragon storm bolters; Paragon war blade.`,
    options: [
      'Любому числу моделей их Paragon storm bolters можно заменить на 1 Paragon grenade launchers.',
      'Любому числу моделей их Paragon war blade можно заменить на 1 Paragon war mace.',
      'Любому числу моделей их heavy bolter можно заменить на одно из следующего:\n▪ 1 Ministorum heavy flamer\n▪ 1 multi-melta',
    ],
  },

  'penitent-engines': {
    flavor:
      'Пилоты Penitent Engine подвергаются страшной агонии благодаря усилителям мучений, вживлённым в их синапсы. Они прокладывают след разрушения своими flamer, прежде чем броситься очертя голову на врага, гонимые виной и болью, невзирая на опасность. Всё, что они оставляют за собой, — сплошная бойня.',
    abilities: {
      'Endless Suffering': 'Этот юнит может объявить нападение в ход, в который он продвигался.',
    },
    loadout: `${EQUIP_EVERY} penitent flamers; twin penitent buzz-blades.`,
    options: [
      'Любому числу моделей их twin penitent buzz-blades можно заменить на одно из следующего:\n▪ 1 penitent buzz-blade и 1 penitent flail\n▪ 1 twin penitent flails',
    ],
  },

  'repentia-squad': {
    flavor:
      'Sister Repentia несутся по полю боя, воя молитвы, полные жажды искупить прошлые проступки. Под надзором сурового надсмотрщика в лице Repentia Superior, что вечно бдит на предмет греховности, Repentia ныне существуют лишь чтобы истреблять врагов Императора и потому рвутся вперёд, не заботясь о собственной безопасности. Каждая ищет искупления актами самоотверженной храбрости и яростной преданности.',
    abilities: {
      'Overseer of Redemption':
        'Пока этот юнит содержит модель Repentia Superior, каждый раз, когда модель Sister Repentia в этом юните совершает атаку ближнего боя, вы можете перебросить бросок попадания и бросок ранения.',
    },
    loadout:
      '**Repentia Superior вооружена:** bolt pistol; neural whips.\n\n**Каждая Sister Repentia вооружена:** penitent eviscerator.',
  },

  'retributor-squad': {
    flavor:
      'Retributor — крайне опытные воительницы и одни из лучших снайперов своего Ордена. Лишь самые хладнокровные Battle Sister вступают в их ряды. Обеспечивать огневую поддержку на дальней дистанции — задача, что требует превосходного умения расставлять приоритеты целей, а также способности оптимизировать решения стрельбы и выявлять слабые места врага.',
    abilities: {
      Cherubs:
        'Дважды за битву, после того как этот юнит совершил Act of Faith, вы получаете 1 Miracle dice.\n**Примечание разработчика:** положите рядом с юнитом два жетона Cherub, убирая по одному каждый раз, когда эта способность задействована.',
      'Storm of Retribution':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку, эта модель может перебросить бросок попадания, равный 1, и перебросить бросок ранения, равный 1. Если такая атака нацелена на вражеский юнит, что уничтожил один или более юнитов Adepta Sororitas из вашей армии за битву, также прибавьте 1 к броску попадания и 1 к броску ранения.',
    },
    loadout:
      '**Retributor Superior вооружена:** bolt pistol; boltgun; close combat weapon.\n\n**Каждая Retributor вооружена:** bolt pistol; heavy bolter; close combat weapon.',
    options: [
      'boltgun у Retributor Superior можно заменить на одно из следующего:\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 condemnor boltgun\n▪ 1 inferno pistol\n▪ 1 Ministorum hand flamer\n▪ 1 plasma pistol',
      'Retributor Superior можно снабдить одним из следующего:\n▪ 1 chainsword\n▪ 1 power weapon',
      'heavy bolter каждой Retributor можно заменить на одно из следующего:\n▪ 1 Ministorum heavy flamer\n▪ 1 multi-melta',
    ],
  },

  'saint-celestine': {
    flavor:
      'Saint Celestine — живое воплощение мощи Императора, и она излучает святой свет. Под ним верные наполняются отвагой, а еретики испытывают всепоглощающий ужас. Окружённая своими избранными чемпионками Geminae, она жестами способна исцелять больных или разить, как сам суд Императора, повергая врага божественной силой.',
    abilities: {
      'Healing Tears':
        'Пока этот юнит содержит модель Celestine, в вашей фазе командования, если этот юнит ниже своей начальной численности, в этот юнит возвращается либо одна уничтоженная модель Geminae Superia, либо до D3 других моделей-Bodyguard.',
      Lifewards:
        'Пока этот юнит содержит одну или более моделей Geminae Superia, Celestine имеет способность Feel No Pain 4+.',
      'Miraculous Intervention':
        'Когда модель Celestine этого юнита уничтожается впервые, бросьте один D6 в конце фазы. На 2+ снова поставьте эту модель Celestine на поле боя как можно ближе к месту, где она была уничтожена, и не в дистанции ввязывания каких-либо вражеских юнитов, с полными ранами.',
    },
    loadout:
      '**Saint Celestine вооружена:** the Ardent Blade.\n\n**Каждая Geminae Superia вооружена:** bolt pistol; power weapon.',
    leader: { text: LEADER_TEXT },
  },

  sanctifiers: {
    abilities: {
      'Ministorum Sermon':
        'Пока этот юнит содержит MINISTORUM PRIEST, оружие ближнего боя моделей этого юнита имеет способность [SUSTAINED HITS 1].',
      Cherub: CHERUB,
    },
    wargear: {
      'Salvationist Medikit':
        'В вашей фазе командования, если носитель на поле боя, вы можете вернуть до D3 уничтоженных моделей (исключая модели CHARACTER) в этот юнит.',
      'Simulacrum Imperialis': SIMULACRUM,
    },
    special: {
      'ATTACHED UNIT':
        'Если Ministorum Priest из вашей армии со способностью Leader можно присоединить к Battle Sisters Squad, его можно вместо этого присоединить к этому юниту. Если MINISTORUM PRIEST из вашей армии присоединён к этому юниту на шаге Declare Battle Formations, эта модель получает способность Scouts 6".',
    },
    loadout:
      '**Miraculist вооружён:** holy fire; burning hands.\n\n**Salvationist вооружён:** close combat weapon; Salvationist medikit.\n\n**Death Cult Assassin вооружён:** Death Cult blades.\n\n**1 Missionary вооружён:** plasma gun; Sanctifier melee weapon.\n\n**1 Missionary вооружён:** Ministorum flamer; Sanctifier melee weapon.\n\n**Каждый Sanctifier вооружён:** Ministorum hand flamer; Sanctifier melee weapon.',
    options: [
      'plasma gun у 1 модели Missionary можно заменить на 1 meltagun.',
      '1 модель Missionary, вооружённую 1 plasma gun, можно снабдить 1 holy fire (plasma gun этой модели заменить нельзя).',
      'Sanctifier melee weapon у 1 модели Sanctifier можно заменить на 1 Ministorum hand flamer и 1 close combat weapon.',
      'Sanctifier melee weapon у 1 модели Sanctifier можно заменить на 1 close combat weapon и 1 simulacrum imperialis.',
    ],
  },

  'seraphim-squad': {
    flavor:
      'Seraphim сражаются в авангарде Adepta Sororitas. Лишь Battle Sister с превосходной ловкостью отбираются в их ряды: они стреляют с безукоризненной точностью, двигаясь на огромной скорости. Они должны уметь приземлиться с невероятной точностью, срубить врагов и отступить за считаные удары сердца.',
    abilities: {
      'Angelic Ascent':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если он не находится в дистанции ввязывания каких-либо вражеских юнитов, он может совершить обычный манёвр до 6". Если он это делает, до конца хода этот юнит не может объявить нападение.',
    },
    loadout: `${EQUIP_EVERY} 2 bolt pistols; close combat weapon.`,
    options: [
      'За каждые 5 моделей в юните у до 2 Seraphim их 2 bolt pistols можно заменить на одно из следующего:\n▪ 2 inferno pistols\n▪ 2 Ministorum hand flamers',
      '2 bolt pistols у Seraphim Superior можно заменить на одно из следующего:\n▪ 1 bolt pistol и 1 chainsword\n▪ 1 bolt pistol и 1 plasma pistol\n▪ 1 bolt pistol и 1 power weapon\n▪ 1 plasma pistol и 1 chainsword\n▪ 1 plasma pistol и 1 power weapon',
    ],
  },

  'sisters-novitiate-squad': {
    flavor:
      'Sister Novitiate — юные новобранцы Adepta Sororitas. Обученные Drill Abbot из Schola Progenium, они приписываются к Order Militant, чтобы набраться боевого опыта и доказать свою доблесть в горниле войны.',
    abilities: {
      'Impetuous Fervour':
        'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1. Если цель этой атаки — вражеский юнит в радиусе маркера цели, вы можете вместо этого перебросить бросок попадания.',
    },
    wargear: {
      'Sacred Banner': SACRED_BANNER,
      'Simulacrum Imperialis': SIMULACRUM,
    },
    loadout:
      '**Novitiate Superior вооружена:** bolt pistol; boltgun; close combat weapon.\n\n**Каждая Sister Novitiate вооружена:** autopistol; autogun; close combat weapon.',
    options: [
      'bolt pistol и boltgun у Novitiate Superior можно заменить на одно из следующего:\n▪ 1 bolt pistol и 1 power weapon\n▪ 1 plasma pistol и 1 power weapon',
      'autogun у 1 Sister Novitiate можно заменить на 1 sacred banner.',
      'autogun у 1 Sister Novitiate можно заменить на 1 simulacrum imperialis.',
      'До 2 Sister Novitiate их autogun можно заменить на 1 Ministorum flamer.',
      'Любому числу Sister Novitiate их autogun и close combat weapon можно заменить на 1 Novitiate melee weapons.',
    ],
  },

  'sororitas-rhino': {
    flavor:
      'Rhino — основной транспорт Adepta Sororitas, и перед битвой их благословляют Enginseer и жрецы Ministorum. Они прочны, надёжны и просты в управлении. Благодаря несокрушимым машинным духам они редко ломаются и быстро несут воительниц внутри туда, где те нужны.',
    abilities: {
      'Self Repair': 'В начале вашей фазы командования эта модель восстанавливает 1 потерянную рану.',
    },
    loadout: `${EQUIP_THIS} storm bolter; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Adepta Sororitas Infantry. Она не может перевозить модели Jump Pack или the Triumph of Saint Katherine.',
  },

  'triumph-of-saint-katherine': {
    flavor:
      'В центре Triumph — благословенный одр, на котором покоятся смертные останки Saint Katherine, под светильником, что хранит её огненное сердце. Куда бы ни шёл Triumph, с ним идёт сияние Императора. Слава мученицы-Матриарха распространяется, и Battle Sister наполняются убеждённостью очистить врагов человечества.',
    abilities: {
      'Relics of the Matriarchs':
        'В начале раунда боя выберите до двух способностей из раздела Relics of the Matriarchs (см. слева). До начала следующего раунда боя эта модель имеет эти способности.',
      'Solemn Procession':
        'Каждый раз, когда вы получаете 1 Miracle dice в начале раунда боя, если эта модель на поле боя, не бросайте D6 для определения значения этого Miracle dice; он имеет значение 6.',
    },
    special: {
      'The Fiery Heart (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, прибавьте 2" к характеристике Перемещения (Move) этого юнита и прибавьте 1 к броскам продвижения и нападения для этого юнита.',
      'Censer of the Sacred Rose (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, вы можете перебрасывать проверки боевого шока для этого юнита.',
      'Simulacrum of the Ebon Chalice (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, этот юнит может совершать до двух Acts of Faith за фазу, а не только один.',
      'Simulacrum of the Argent Shroud (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, каждый раз, когда модель этого юнита совершает дальнобойную атаку, перебросьте бросок ранения, равный 1.',
      'Icon of the Valorous Heart (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, модели этого юнита имеют способность Feel No Pain 6+.',
      'Petals of the Bloody Rose (Aura)':
        'Пока дружественный юнит ADEPTA SORORITAS находится в пределах 6" от этой модели, улучшите характеристику Пробития брони (Armour Penetration) оружия ближнего боя моделей этого юнита на 1.',
    },
    loadout: `${EQUIP_THIS} bolt pistols; relic weapons.`,
    damaged: {
      note: 'осталось 1–6 ран',
      text: 'Пока у этой модели осталось 1–6 ран, характеристики Атак (Attacks) всего её оружия делятся пополам, и вы можете выбрать лишь одну способность при использовании её способности Relics of the Matriarchs вместо двух.',
    },
    leader: { text: LEADER_TEXT },
  },

  'zephyrim-squad': {
    flavor:
      'Лишь те, кто испытывает прямую и постоянную связь с Императором, становятся Zephyrim. Это божественные разрушительницы, фигуры бездонной страсти и цельности. На поле боя они повергают врагов с беспощадной точностью, а их ангельское пение заглушает крики умирающих.',
    abilities: {
      'Embodied Prophecy':
        'Каждый раз, когда этот юнит выбирается для схватки, выберите одну из следующих способностей, чтобы применить её к оружию ближнего боя моделей этого юнита до конца фазы:\n▪ [SUSTAINED HITS 1]\n▪ [LETHAL HITS]\nЕсли этот юнит совершил манёвр нападения в этот ход, до конца фазы вместо этого выберите обе способности выше, чтобы применить их к оружию ближнего боя моделей этого юнита.',
    },
    wargear: {
      'Sacred Banner': SACRED_BANNER,
    },
    loadout: `${EQUIP_EVERY} bolt pistol; power weapon.`,
    options: [
      'Zephyrim Superior можно снабдить 1 sacred banner.',
      'bolt pistol у Zephyrim Superior можно заменить на 1 plasma pistol.',
    ],
  },
}

export const abilityNamesRu = {
  'Righteous Paragons': 'Праведные образцы',
  'Endless Suffering': 'Нескончаемое страдание',
  'Overseer of Redemption': 'Надзиратель искупления',
  Cherubs: 'Херувимы',
  'Storm of Retribution': 'Буря возмездия',
  'Healing Tears': 'Целительные слёзы',
  Lifewards: 'Хранители жизни',
  'Miraculous Intervention': 'Чудесное вмешательство',
  'Ministorum Sermon': 'Проповедь Ministorum',
  'Salvationist Medikit': 'Аптечка спасенца',
  'Angelic Ascent': 'Ангельский взлёт',
  'Impetuous Fervour': 'Порывистый пыл',
  'Sacred Banner': 'Священный штандарт',
  'Self Repair': 'Самопочинка',
  'Relics of the Matriarchs': 'Реликвии Матриархов',
  'Solemn Procession': 'Торжественная процессия',
  'The Fiery Heart (Aura)': 'Огненное сердце (Аура)',
  'Censer of the Sacred Rose (Aura)': 'Кадило Священной Розы (Аура)',
  'Simulacrum of the Ebon Chalice (Aura)': 'Симулякрум Эбеновой Чаши (Аура)',
  'Simulacrum of the Argent Shroud (Aura)': 'Симулякрум Серебряного Савана (Аура)',
  'Icon of the Valorous Heart (Aura)': 'Икона Доблестного Сердца (Аура)',
  'Petals of the Bloody Rose (Aura)': 'Лепестки Кровавой Розы (Аура)',
  'Embodied Prophecy': 'Воплощённое пророчество',
  'Righteous Awareness': 'Праведная бдительность',
  'Devastating Refrain': 'Сокрушительный рефрен',
  'Medicus Ministorum': 'Medicus Ministorum',
  'Sacred Healing': 'Священное исцеление',
  'Litany of Deeds': 'Литания деяний',
  'Stanchion of Holy Martyrs': 'Стяг святых мучеников',
  'Purge and Cleanse': 'Очисти и выжги',
  'Righteous Denunciation': 'Праведное обличение',
  'Judged for Execution': 'Приговорён к казни',
  'The Pulpit of Saint Holline’s Basilica': 'Кафедра Saint Holline’s Basilica',
  'Fiery Conviction': 'Огненная убеждённость',
  'Righteous Smiting': 'Праведная кара',
  Zealot: 'Фанатик',
  'Anguish of the Unredeemed': 'Мука неискупленных',
  'Anchorite Sarcophagus': 'Саркофаг анахорета',
  'Abbess Sanctorum': 'Abbess Sanctorum',
  'Righteous Repugnance': 'Праведное отвращение',
  'Fury of the Righteous': 'Ярость праведных',
  'Rapturous Blows': 'Восторженные удары',
  'Auto-Tapestry of the Emperor’s Judgement': 'Авто-гобелен Суда Императора',
  'Recount the Deeds of the Saints': 'Перечисли деяния святых',
  'Extremis Trigger Word': 'Крайнее кодовое слово',
  Cherub: 'Херувим',
  'Defenders of the Faith': 'Защитники веры',
  'Simulacrum Imperialis': 'Симулякрум Империалис',
  'Sacred Command': 'Священное командование',
  'The Emperor’s Grace': 'Милость Императора',
  'Null Rod': 'Нуль-жезл',
  'Rod of Office': 'Жезл сана',
  'Divine Deliverance': 'Божественное избавление',
  'Rites of Castigation': 'Обряды кары',
  'Rituale Nullificatus': 'Rituale Nullificatus',
  'Virtue of Intolerance': 'Добродетель нетерпимости',
  'Denuncia Oratory': 'Denuncia Oratory',
  'Sworn Protectors': 'Присяжные защитники',
  'Holy Judgement': 'Святой суд',
  'Mysterious Saviours': 'Загадочные спасители',
  'Laud Hailer': 'Laud hailer',
  'Stirring Rhetoric': 'Воодушевляющая риторика',
  'Executioner of Heretics (Aura)': 'Палач еретиков (Аура)',
  'Unflinching Determination': 'Непоколебимая решимость',
}
