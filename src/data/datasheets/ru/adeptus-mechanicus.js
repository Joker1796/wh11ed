// Adeptus Mechanicus — русский перевод листов данных. Разреженный оверлей поверх EN
// (см. ./index.js): переведены только тексты (flavor, тексты способностей, loadout/options,
// damaged/leader/transport). Имена юнитов/оружия, характеристики, ключевые слова (Adeptus
// Mechanicus, Skitarii, Tech-Priest, Omnissiah), названия правил/протоколов (Canticles of
// the Omnissiah, Motive Force, Kastelan Robots), [BRACKET]-теги и ALL-CAPS-названия
// способностей остаются английскими. `abilityNamesRu` (внизу) даёт RU-подписи.

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const CHAFF = 'Носитель имеет ключевое слово SMOKE.'
// «Command Uplink» и «Enhanced data-tether»: тот же текст (носитель как цель стратагемы).
const STRAT_CP_BEARER =
  'Каждый раз, когда вы выбираете юнит носителя целью стратагемы, бросьте один D6: на 5+ вы получаете 1 CP.'
// «Broad Spectrum Data-tether» (способность): тот же смысл, но про «этот юнит».
const STRAT_CP_UNIT =
  'Каждый раз, когда вы нацеливаете стратагему на этот юнит, бросьте один D6: на 5+ вы получаете 1 CP.'
const OMNISPEX =
  'Дальнобойное оружие моделей юнита носителя имеет способность [IGNORES COVER].'
const ATTACHED_SKITARII =
  'Если юнит Character из вашей армии можно присоединить к юниту Skitarii Rangers, его можно вместо этого присоединить к этому юниту.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'archaeopter-fusilave': {
    flavor:
      'Изменяемая нагрузка Archaeopter Fusilave из глубинных зарядов взрывчатки определяет его как сокрушительный бомбардировщик и машину зачистки. Tech-Priest используют целые эскадрильи, чтобы сравнивать вражескую оборону и выкуривать укрывшихся еретиков, а также расчищать перспективные места для дальнейшего изучения в Поиске Знаний.',
    abilities: {
      'Bomb Rack':
        'Каждый раз, когда эта модель завершает обычный манёвр, вы можете выбрать один вражеский юнит, над которым она прошла в этом манёвре, и бросить шесть D6: за каждый 4+ этот юнит получает 1 смертельную рану.',
    },
    wargear: {
      'Chaff Launcher': CHAFF,
      'Command Uplink': STRAT_CP_BEARER,
    },
    loadout: `${EQUIP_THIS} cognis heavy stubber array; armoured hull; command uplink.`,
    options: ['command uplink этой модели можно заменить на 1 chaff launcher.'],
  },

  'archaeopter-stratoraptor': {
    flavor:
      'Stratoraptor использует векторные двигатели Archaeopter и адаптируемый профиль крыла, чтобы превосходить в роли штурмового ганшипа. Его набор тяжёлого оружия — со смесью высокой мощности и высокой скорострельности — делает Stratoraptor смертельной угрозой и для окопавшейся пехоты, и для тяжелобронированной техники.',
    abilities: {
      'Strafing Run':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по вражескому юниту (исключая юниты, что могут FLY), прибавьте 1 к броску попадания.',
    },
    wargear: {
      'Chaff Launcher': CHAFF,
      'Command Uplink': STRAT_CP_BEARER,
    },
    loadout: `${EQUIP_THIS} 2 cognis heavy stubbers; 2 heavy phosphor blasters; twin cognis lascannon; armoured hull; command uplink.`,
    options: ['command uplink этой модели можно заменить на 1 chaff launcher.'],
  },

  'archaeopter-transvector': {
    flavor:
      'Идеальные транспорты воздушной высадки, Transvector используются в огромных количествах флотами Explorator для разведки и быстрой эвакуации перед лицом врага. Они невероятно проворны, и их вживлённые пилоты способны перекраивать крылья под меняющуюся атмосферу, направляя свои cognis heavy stubber, чтобы выкашивать наступающих врагов.',
    abilities: {
      'Aerial Deployment':
        'Если эта модель начинает игру в режиме Hover и в Strategic Reserves, её можно развернуть на шаге Подкреплений вашей первой, второй или третьей фазы перемещения, независимо от любых правил миссии.',
    },
    wargear: {
      'Chaff Launcher': CHAFF,
      'Command Uplink': STRAT_CP_BEARER,
    },
    loadout: `${EQUIP_THIS} cognis heavy stubber array; armoured hull; command uplink.`,
    options: ['command uplink этой модели можно заменить на 1 chaff launcher.'],
    transport:
      'Эта модель имеет транспортную вместимость 11 моделей Skitarii Infantry или Tech-Priest Infantry. Она не может перевозить модели Jump Pack или Kataphron.',
  },

  'belisarius-cawl': {
    flavor:
      'Боевая форма Белизария Кола — многоконечностный биомеханический гибрид. Передовые бионические протезы дают ему безмерную силу и живучесть, а извивающиеся щупальца стремительно чинят его кибернетическое тело. Десять тысяч лет Кол искоренял врагов Империума и до сих пор ведёт приверженцев Бога-Машины в святом стяжании.',
    abilities: {
      'Canticles of the Omnissiah':
        'В начале вашей фазы командования выберите одну из способностей в разделе Canticles of the Omnissiah. До начала вашей следующей фазы командования эта модель имеет эту способность.',
      'Mechanicus Bodyguard':
        'Пока эта модель находится в пределах 3" от одного или более других дружественных юнитов ADEPTUS MECHANICUS, она имеет способность Lone Operative.',
      'Self-repair Mechanisms':
        'В начале вашей фазы командования эта модель восстанавливает до D3 потерянных ран.',
    },
    special: {
      'Invocation of Machine Vengeance':
        'В начале вашей фазы командования выберите один юнит из армии вашего оппонента. До начала вашей следующей фазы командования этот вражеский юнит — ваша цель Machine Vengeance. Каждый раз, когда модель дружественного юнита Adeptus Mechanicus совершает атаку по вашей цели Machine Vengeance, вы можете перебросить бросок попадания.',
      'Mantra of Discipline':
        'Эта модель имеет ключевое слово BATTLELINE и следующую способность:\n▪ **Binharic Courage (Aura):** Пока дружественный юнит ADEPTUS MECHANICUS находится в пределах 6" от этой модели, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита, и каждый раз, когда вы проходите проверку боевого шока или лидерства для этого юнита, прибавьте 1 к этой проверке.',
      'Shroudpsalm (Aura)':
        'Пока дружественный юнит ADEPTUS MECHANICUS находится в пределах 6" от этой модели, этот юнит имеет способность Stealth.',
    },
    loadout: `${EQUIP_THIS} solar atomiser; arc scourge; Cawl’s Omnissian axe; mechadendrite hive.`,
  },

  'corpuscarii-electro-priests': {
    flavor:
      'Electro-Priest фракции Corpuscarii накапливают огромный электрический потенциал, ревностно распевая свои боевые песнопения. Они проводят Motive Force через свои тела, жаждя разделить его озарение, высвобождая его из перчаток сверкающими дугами электрической мощи, что скачут от цели к цели.',
    abilities: {
      'Electro-shock':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит (исключая MONSTER и VEHICLE), поражённый одной или более из этих атак. До конца следующего хода вашего оппонента этот вражеский юнит под шоком. Пока юнит под шоком, вычтите 2" из его характеристики Перемещения (Move) и вычтите 2 из бросков продвижения и нападения для него.',
    },
    loadout: `${EQUIP_EVERY} electrostatic gauntlets.`,
  },

  'cybernetica-datasmith': {
    flavor:
      'Datasmith оптимизируют программирование своих роботизированных подопечных. Эти Tech-Priest применяют ритуалы и бинарные гимны, чтобы благословлять doctrina wafer, которыми они изменяют протоколы роботов, попутно опустошая врагов Омниссии залпами ионизирующего излучения из своих археотех-пистолетов.',
    abilities: {
      'Battle Protocols':
        'В начале битвы, если эта модель возглавляет юнит KASTELAN ROBOTS, этот юнит входит в Aegis Protocols (см. ниже). В вашей фазе командования, если эта модель возглавляет юнит KASTELAN ROBOTS, вы можете выбрать один протокол из перечисленных ниже, в который этот юнит войдёт. Как только юнит входит в протокол, он остаётся в нём, пока не войдёт в другой.\n▪ **Protector Protocol:** Прибавьте 2 к характеристике Атак (Attacks) дальнобойного оружия моделей KASTELAN ROBOT в этом юните.\n▪ **Conqueror Protocol:** Прибавьте 2 к характеристике Атак (Attacks) оружия ближнего боя моделей KASTELAN ROBOT в этом юните.\n▪ **Aegis Protocol:** Прибавьте 1 к характеристике Стойкости (Toughness) моделей KASTELAN ROBOT в этом юните.',
    },
    loadout: `${EQUIP_THIS} Mechanicus pistol; power fist.`,
    leader: { text: LEADER_TEXT },
  },

  'fulgurite-electro-priests': {
    flavor:
      'Трещащие мощью, украденной у убитых, Fulgurite Electro-Priest — фанатичные культисты Бога-Машины. Своими тяжёлыми, окованными медью посохами они разят богохульников, что растрачивают Motive Force, высасывая её из воинов-еретиков и запасая святую энергию в своих конденсаторах, где она питает их поле voltagheist.',
    abilities: {
      'Electro-infusion':
        'Пока модель CHARACTER возглавляет этот юнит, каждый раз, когда атака нацеливается на этот юнит, вычтите 1 из броска ранения.',
    },
    loadout: `${EQUIP_EVERY} electroleech stave.`,
  },

  'hastarii-exterminators': {
    flavor:
      'Эти тяжелобронированные Skitarii обрушивают испепеляющую огневую мощь с повышенной эффективностью. Расширяющиеся энергетические конусы их eradication caster нарушают цель на молекулярном уровне, грубо калеча или полностью стирая жертв. В сочетании с наплечными arc blaster этот арсенал позволяет Hastarii Exterminator выбивать сердце из вражеской боевой линии.',
    abilities: {
      'Broad-spectrum Targeting Augurs':
        'Каждый раз, когда модель этого юнита совершает атаку eradication caster по юниту (исключая юниты MONSTER и VEHICLE), эта атака имеет способность [SUSTAINED HITS 1].',
    },
    special: {
      'ATTACHED UNIT': ATTACHED_SKITARII,
    },
    loadout:
      '**Hastarii Exterminator Alpha вооружён:** Hastarii arc blaster; eradication caster; power weapon.\n\n**Каждый Hastarii Exterminator вооружён:** Hastarii arc blaster; eradication caster; close combat weapon.',
    options: ['Нет.'],
  },

  'hastarii-fusiliers': {
    flavor:
      'Роль Hastarii Fusilier — обрушивать подавляющую огневую мощь на самые тяжелобронированные средства врага. Пока их наплечные phosphor blaster отбивают вражеские контратаки, Fusilier дают залп за залпом, обращая боевые танки, элитную пехоту и чудовищных тварей в пылающие остовы и выгоревшие туши.',
    abilities: {
      'Monocular Targeting Helms':
        'Каждый раз, когда модель этого юнита совершает атаку neutron fusil по юниту MONSTER или VEHICLE, эта атака имеет способность [IGNORES COVER].',
    },
    special: {
      'ATTACHED UNIT': ATTACHED_SKITARII,
    },
    loadout:
      '**Hastarii Fusilier Alpha вооружён:** neutron fusil; Hastarii phosphor blaster; power weapon.\n\n**Каждый Hastarii Fusilier вооружён:** neutron fusil; Hastarii phosphor blaster; close combat weapon.',
    options: ['Нет.'],
  },

  'ironstrider-ballistarii': {
    flavor:
      'Ironstrider Ballistarii — быстрые боевые шагоходы, пилотируемые ветеранами-стрелками. Они плавно пробираются по полю боя, прежде чем пробудить полностью проснувшиеся машинные духи своего оружия, чтобы получить быстро вычисленные решения стрельбы. Высвободив свою разрушительную огневую мощь, они переразвёртываются в поисках новых целей.',
    abilities: {
      'Elevated Strider':
        'Этот юнит может стрелять в ход, в который он отступал или продвигался, и вы можете перебрасывать проверки Desperate Escape для моделей этого юнита.',
      'Broad Spectrum Data-tether': STRAT_CP_UNIT,
    },
    loadout: `${EQUIP_EVERY} twin cognis autocannon; Ironstrider feet.`,
    options: [
      'Любому числу моделей их twin cognis autocannon можно заменить на 1 twin cognis lascannon.',
    ],
  },

  'kastelan-robots': {
    flavor:
      'Kastelan Robots — гигантские автоматы из тёмного прошлого человечества, укрытые толстой бронёй и передовыми силовыми полями. Безотказно следуя предзаданным доктринам, Kastelan — бастионы в обороне и почти неудержимы в атаке, обрушивая тяжёлую огневую мощь и дробящие взмахи своих гигантских кулаков.',
    abilities: {
      'Robotic Bodyguard':
        'Пока модель Cybernetica Datasmith возглавляет этот юнит, эта модель имеет способность Feel No Pain 4+.',
      'Repulsor Grid':
        'Каждый раз, когда дальнобойная атака распределяется по модели KASTELAN ROBOT в этом юните, на немодифицированном спас-броске 6 атакующий юнит получает 1 смертельную рану после того, как он закончил свои атаки.',
    },
    loadout: `${EQUIP_EVERY} incendine combustor; twin Kastelan fist.`,
    options: [
      'Любому числу моделей их twin Kastelan fist можно заменить на одно из следующего:\n▪ 1 Kastelan phosphor blaster и 1 Kastelan fist\n▪ 1 twin Kastelan phosphor blaster и 1 close combat weapon',
      'Любому числу моделей их incendine combustor можно заменить на 1 heavy phosphor blaster.',
    ],
  },

  'kataphron-breachers': {
    flavor:
      'Kataphron Breachers — крупные боевые сервиторы, что перемалывают путь вперёд на тяжёлых гусеницах. Это идеальное средство, чтобы взламывать вражеские боевые линии и бастионы залпами тяжёлого оружия и ударами боевых насадок, а любой вражеский огонь отражается толстой бронёй и поглощается слоями бионики.',
    abilities: {
      'Breaching Command':
        'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1. Пока этот юнит находится в пределах 6" от одного или более дружественных юнитов Adeptus Mechanicus Battleline, вы можете вместо этого перебросить бросок попадания.',
    },
    loadout: `${EQUIP_EVERY} heavy arc rifle; arc claw.`,
    options: [
      'Любому числу моделей их heavy arc rifle можно заменить на 1 torsion cannon.',
      'Любому числу моделей их arc claw можно заменить на 1 hydraulic claw.',
    ],
  },

  'kataphron-destroyers': {
    flavor:
      'Эти биомеханические конструкты действуют как подвижные платформы тяжёлого оружия, неся большие эзотерические пушки, а также оружие ближней обороны. Их баллистические подпрограммы можно настроить действовать независимо от предзаданных боевых протоколов, что делает их гибким средством разрушения.',
    abilities: {
      'Sentinel Directives':
        'Каждый раз, когда вы нацеливаете стратагему Fire Overwatch на этот юнит, при разрешении этой стратагемы попадания засчитываются на немодифицированных бросках попадания 5+.',
    },
    loadout: `${EQUIP_EVERY} heavy grav-cannon; phosphor blaster; close combat weapon.`,
    options: [
      'Любому числу моделей их heavy grav-cannon можно заменить на 1 Kataphron plasma culverin.',
      'Любому числу моделей их phosphor blaster можно заменить на 1 cognis flamer.',
    ],
  },

  'onager-dunecrawler': {
    flavor:
      'Паря над руинами войны на подушке распылённых газов, Onager Dunecrawler — архаичные боевые танки передовой. Они устремляются вперёд неудержимыми бронированными волнами и поддерживают продвижение пехоты, удерживая испепеляющие залпы, чтобы калечить вражеские боевые машины и сметать полчища меньших врагов.',
    abilities: {
      'Emanatus Force Field (Aura)':
        'Пока дружественная модель ADEPTUS MECHANICUS BATTLELINE целиком в пределах 6" от этой модели, эта модель BATTLELINE имеет инвулевый спас-бросок 4+ против дальнобойных атак.',
      'Scuttling Walker':
        'Каждый раз, когда эта модель совершает обычный манёвр, продвижение или отступление, она может двигаться сквозь дружественные модели Monster и Vehicle и участки элементов ландшафта высотой 4" или менее.',
    },
    wargear: {
      'Broad spectrum data-tether':
        'Носитель теряет ключевое слово SMOKE, но каждый раз, когда вы нацеливаете стратагему на носителя, бросьте один D6: на 5+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} eradication beamer; Dunecrawler legs.`,
    options: [
      'eradication beamer этой модели можно заменить на одно из следующего:\n▪ 1 daedalus missile launcher и 1 Icarus array\n▪ 1 neutron laser и 1 cognis heavy stubber\n▪ 1 twin Onager heavy phosphor blaster',
      'Эту модель можно снабдить 1 дополнительным cognis heavy stubber.',
      'Эту модель можно снабдить 1 broad spectrum data-tether.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'pteraxii-skystalkers': {
    flavor:
      'У Pteraxii Skystalker сознание урезано до тех пор, пока не останется почти ничего, кроме оптимизированных реакций. Это маневренные, сверхъестественные воздушные охотники, что выслеживают добычу с выгодных позиций, прежде чем спикировать и обрушить испепеляющий град бритвенно-острых флешетт.',
    abilities: {
      'Ride the Thermals':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если он не находится в дистанции ввязывания одного или более вражеских юнитов, он может сделать одно из следующего:\n▪ Совершить обычный манёвр до 6".\n▪ Совершить обычный манёвр до 12", при условии, что каждая модель этого юнита завершает манёвр целиком в пределах 6" от одного или более дружественных юнитов Adeptus Mechanicus Battleline.\nВ любом случае, если он это делает, до конца хода этот юнит не может объявить нападение.',
    },
    loadout:
      '**Pteraxii Skystalker Alpha вооружён:** flechette blaster; taser goad.\n\n**Каждый Pteraxii Skystalker вооружён:** flechette carbine; close combat weapon.',
  },

  'pteraxii-sterylizors': {
    flavor:
      'Sterylizor — истребители кибернетических организмов-паразитов на кораблях и в мануфакторумах, что рьяно обрушивают химический огонь своих phosphor torch на врагов Бога-Машины. Они спускаются стаями с небес на перепончатых крыльях-ранцах, с наготове жестокими когтями, жаждя увидеть, как враги корчатся в пламени.',
    abilities: {
      'Searing Conflagration':
        'Каждый раз, когда модель этого юнита совершает атаку phosphor torch по вражескому юниту в радиусе маркера цели, перебросьте бросок ранения, равный 1. Если этот юнит также в пределах 6" от одного или более дружественных юнитов ADEPTUS MECHANICUS BATTLELINE, каждый раз, когда такая атака нацелена на такой юнит, вы можете вместо этого перебросить бросок ранения.',
    },
    loadout:
      '**Pteraxii Sterylizor Alpha вооружён:** flechette blaster; Pteraxii talons; taser goad.\n\n**Каждый Pteraxii Sterylizor вооружён:** phosphor torch; Pteraxii talons.',
  },

  'serberys-raiders': {
    flavor:
      'Дальняя разведка и авангард, Raider из Serberys Corps используют передовые наборы сенсоров в своих киберпсовых скакунах, чтобы выявлять вражеских лазутчиков. Они удерживают карающий темп огня из карабинов, двигаясь на высокой скорости, а когда добыче больше некуда бежать, Raider обнажают сабли и бросаются в схватку.',
    abilities: {
      'Tactica Obliqua':
        'В фазе перемещения вашего оппонента, если вражеский юнит завершает манёвр в пределах 8" от этого юнита, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, он может сделать одно из следующего:\n▪ Совершить обычный манёвр до D6".\n▪ Совершить обычный манёвр до 6", при условии, что каждая модель этого юнита завершает манёвр целиком в пределах 6" от одного или более дружественных юнитов Adeptus Mechanicus Battleline.',
    },
    wargear: {
      'Enhanced data-tether': STRAT_CP_BEARER,
    },
    loadout:
      '**Serberys Raider Alpha вооружён:** Mechanicus pistol; galvanic carbine; cavalry sabre and clawed limbs.\n\n**Каждый Serberys Raider вооружён:** galvanic carbine; cavalry sabre and clawed limbs.',
    options: ['1 Serberys Raider можно снабдить 1 enhanced data-tether.'],
  },

  'serberys-sulphurhounds': {
    flavor:
      'Кавалерийские эскадроны Sulphurhound — агрессивные ударные войска и таранщики линий. Скачущие механические звери дышат струями испепеляющего фосфора и потрошат врага рвущими когтями, а элитные всадники-Skitarii разряжают добела раскалённый пистолетный огонь, проламывая линии обороны, прежде чем вернуться за уцелевшими.',
    abilities: {
      'Line-breakers':
        'Каждый раз, когда этот юнит завершает манёвр нападения, выберите один вражеский юнит в дистанции ввязывания от него и бросьте один D6 за каждую модель этого юнита в дистанции ввязывания от этого вражеского юнита, прибавив 2 к результату, если этот юнит начал свой манёвр нападения в пределах 6" от одного или более дружественных юнитов ADEPTUS MECHANICUS BATTLELINE. За каждый 4+ этот вражеский юнит получает 1 смертельную рану.',
    },
    loadout:
      '**Serberys Sulphurhound Alpha вооружён:** Mechanicus pistol; sulphur breath; cavalry arc maul; clawed limbs.\n\n**Каждый Serberys Sulphurhound вооружён:** 2 phosphor pistols; sulphur breath; clawed limbs.',
    options: [
      'За каждые 3 модели в этом юните у 1 Serberys Sulphurhound его 2 phosphor pistols можно заменить на 1 phosphor blast carbine и 1 phosphor pistol.',
    ],
  },

  'servitor-battleclade': {
    flavor:
      'Servitor Battleclade дают своим владыкам Adeptus Mechanicus расходное и крайне универсальное боевое средство в поле. Часто отправляемые, чтобы добыть важный археотех или данные, их смесь огневой мощи, ближней ударной силы и набора серво-инструментов позволяет их Underseer выполнить любую поставленную задачу.',
    abilities: {
      'Network Override':
        'Пока этот юнит содержит одну или более моделей Tech-Priest, этот юнит:\n▪ Может выполнять Action в ход, в который он продвигался.\n▪ Может стрелять в ход, в который он начал Action.',
    },
    special: {
      'ATTACHED UNIT':
        'Если юнит Character из вашей армии со способностью Leader можно присоединить к юниту Kataphron Breachers, его можно вместо этого присоединить к этому юниту.',
    },
    loadout:
      '**Servitor Underseer вооружён:** Mechanicus pistol; dataspikes.\n\n**1 Gun Servitor вооружён:** heavy arc rifle; servo-claw.\n\n**1 Gun Servitor вооружён:** heavy bolter; servo-claw.\n\n**Каждый Combat Servitor вооружён:** phosphor blaster; servo-claw.',
    options: [
      'phosphor blaster у 1 модели Combat Servitor можно заменить на 1 meltagun.',
      'До 3 моделей Combat Servitor их phosphor blaster можно заменить на 1 incendine igniter.',
    ],
  },

  'sicarian-infiltrators': {
    flavor:
      'Sicarian Infiltrator транслируют помеховые частоты, что глушат авгуры и болезненно нарушают чувства врага. Так укрытые, Infiltrator выполняют разведывательные и обходные задания, усиливая свой сенсорный шквал, чтобы обрушить вражескую связь и атаковать незримо сквозь возникшую анархию.',
    abilities: {
      'Voices in the Code':
        'В начале фазы ближнего боя каждый вражеский юнит в дистанции ввязывания одного или более юнитов с этой способностью обязан пройти проверку боевого шока.',
      'Neurostatic Interference (Aura)':
        'Пока вражеский юнит находится в пределах 6" от этого юнита, каждый раз, когда для этого юнита проходится проверка боевого шока или лидерства, вычтите 1 из этой проверки. Пока этот юнит находится в пределах 6" от одного или более дружественных юнитов Adeptus Mechanicus Battleline, вместо этого вычтите 2 из этой проверки.',
    },
    loadout: `${EQUIP_EVERY} stubcarbine; power weapon.`,
    options: [
      'Любому числу моделей их stubcarbine и power weapon можно заменить на 1 flechette blaster и 1 taser goad.',
    ],
  },

  'sicarian-ruststalkers': {
    flavor:
      'Ruststalker спускают как оружие страха, чтобы выслеживать сбившиеся серво-юниты и еретиков-богохульников или набрасываться на изолированные вражеские юниты и убивать вражеских вождей. Как и их собратья Sicarian, стилтоподобные конечности Ruststalker позволяют им загонять добычу, прежде чем изрезать её микровибрирующими трансзвуковыми клинками.',
    abilities: {
      'Optimised Gait':
        'Прибавьте 1 к броскам продвижения и нападения для этого юнита. Пока этот юнит находится в пределах 6" от одного или более дружественных юнитов Adeptus Mechanicus Battleline, вместо этого прибавьте 2 к броскам продвижения и нападения для этого юнита.',
    },
    loadout: `${EQUIP_EVERY} transonic razor and chordclaw.`,
    options: [
      'Любому числу Sicarian Ruststalker их transonic razor and chordclaw можно заменить на 1 transonic blades.',
      'transonic razor and chordclaw у Sicarian Ruststalker Princeps можно заменить на 1 transonic blades and chordclaw.',
    ],
  },

  'skitarii-marshal': {
    flavor:
      'Marshal ведут маниплы и когорты воинов Skitarii. Это ветераны бессчётных крестовых походов, удостоенные нести улучшенные аугментации. Marshal стоят посредниками между формированиями Skitarii и их жреческими владыками, применяя священные аплинки, чтобы приблизить доктрины своих воинов к святому совершенству.',
    abilities: {
      'Control Edict':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку, вы можете перебросить бросок попадания.',
      'Servo-skull Uplink':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит Skitarii, который в боевом шоке и находится в пределах 6" от этой модели. Этот юнит больше не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} Mechanicus pistol; control stave.`,
    leader: { text: LEADER_TEXT },
  },

  'skitarii-rangers': {
    flavor:
      'Ranger неустанно преследуют добычу месяцами или даже годами, выслеживая жертву до самой смерти. Они несут старинные длинноствольные galvanic rifle, чьи заряженные боеприпасы передают сверкающий разряд при попадании, оставляя добычу дымящейся оболочкой, пока Ranger уже наводятся на следующую цель.',
    abilities: {
      'Objective Scouted':
        'В конце вашей фазы командования, если этот юнит находится в радиусе маркера цели, который вы контролируете, этот маркер цели остаётся под вашим контролем, даже если у вас нет моделей в его радиусе, пока ваш оппонент не установит над ним контроль в начале или конце любого хода.',
    },
    wargear: {
      'Enhanced data-tether': STRAT_CP_BEARER,
      Omnispex: OMNISPEX,
    },
    loadout: `${EQUIP_EVERY} galvanic rifle; close combat weapon.`,
    options: [
      'Skitarii Ranger Alpha можно снабдить 1 Alpha combat weapon.',
      'galvanic rifle у Skitarii Ranger Alpha можно заменить на 1 Mechanicus pistol.',
      'galvanic rifle у 1 Skitarii Ranger можно заменить на 1 arc rifle.',
      'galvanic rifle у 1 Skitarii Ranger можно заменить на 1 plasma caliver.',
      'galvanic rifle у 1 Skitarii Ranger можно заменить на 1 transuranic arquebus.',
      '1 Skitarii Ranger, вооружённого galvanic rifle, можно снабдить одним из следующего:\n▪ 1 enhanced data-tether*\n▪ 1 omnispex*',
      '* galvanic rifle этой модели заменить нельзя.',
    ],
  },

  'skitarii-vanguard': {
    flavor:
      'Гипероблучённые выстрелы карабинов Skitarii Vanguard делают так, что те, кто иначе пережил бы рану, всё равно заболевают и умирают. Vanguard пропитаны этим излучением, испуская изнуряющую ауру, к которой сами невосприимчивы. Это закаляет их для боя в токсичнейших зонах ради защиты интересов Tech-Priest.',
    abilities: {
      'Rad-saturation (Aura)':
        'Пока вражеский юнит (исключая юниты VEHICLE) находится в пределах 3" от этого юнита, вычтите 1 из характеристики Контроля целей (OC) моделей этого вражеского юнита.',
    },
    wargear: {
      'Enhanced data-tether': STRAT_CP_BEARER,
      Omnispex: OMNISPEX,
    },
    loadout: `${EQUIP_EVERY} radium carbine; close combat weapon.`,
    options: [
      'Skitarii Vanguard Alpha можно снабдить 1 Alpha combat weapon.',
      'radium carbine у Skitarii Vanguard Alpha можно заменить на 1 Mechanicus pistol.',
      'radium carbine у 1 Skitarii Vanguard можно заменить на 1 arc rifle.',
      'radium carbine у 1 Skitarii Vanguard можно заменить на 1 plasma caliver.',
      'radium carbine у 1 Skitarii Vanguard можно заменить на 1 transuranic arquebus.',
      '1 Skitarii Vanguard, вооружённого radium carbine, можно снабдить одним из следующего:\n▪ 1 enhanced data-tether*\n▪ 1 omnispex*',
      '* radium carbine этой модели заменить нельзя.',
    ],
  },

  'skorpius-disintegrator': {
    flavor:
      'Паря над руинами войны на подушке распылённых газов, Skorpius Disintegrator — архаичные боевые танки передовой. Они устремляются вперёд неудержимыми бронированными волнами и поддерживают продвижение пехоты, удерживая испепеляющие залпы, чтобы калечить вражеские боевые машины и сметать полчища меньших врагов.',
    abilities: {
      'Broad Spectrum Data-tether': STRAT_CP_UNIT,
      'Blistering Salvoes':
        'Каждый раз, когда эта модель совершает атаку belleros energy cannon по юниту INFANTRY, прибавьте 1 к броску попадания. Каждый раз, когда эта модель совершает атаку ferrumite cannon по юниту MONSTER или VEHICLE, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} belleros energy cannon; 3 cognis heavy stubbers; disruptor missile launcher; armoured hull.`,
    options: ['belleros energy cannon этой модели можно заменить на 1 ferrumite cannon.'],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'skorpius-dunerider': {
    flavor:
      'Skorpius Dunerider позволяют forge lord перебрасывать отряды своей киборг-пехоты на передовую, подавляя врага быстро переразвёрнутой массой. Dunerider налетают на вражескую оборону в облаке химического дыма, насыщая местность крупнокалиберными выстрелами, пока их груз воинов высаживается.',
    abilities: {
      'Broad Spectrum Data-tether': STRAT_CP_UNIT,
      'Fire Support':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, по которому она нанесла одно или более попаданий в этой фазе. До конца фазы каждый раз, когда дружественная модель, что высадилась из этого Transport в этот ход, совершает атаку по этому вражескому юниту, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} cognis heavy stubber array; armoured hull.`,
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Adeptus Mechanicus Infantry. Она не может перевозить модели Jump Pack, Kataphron или Sydonian Skatros.',
  },

  'sydonian-dragoons-with-radium-jezzails': {
    flavor:
      'Шагая сквозь дымку собственного священного благовония, длинноногие движки, на которых едут Sydonian Dragoon, вечно в движении. Dragoon метят добычу выстрелами светящегося фосфора или облучёнными снарядами, что позволяет им обнаруживать жертву сквозь липкую дымку и настигать её громовой давкой.',
    abilities: {
      'Focused Hunters':
        'В начале битвы выберите один юнит из армии вашего оппонента. До конца битвы каждый раз, когда модель этого юнита совершает атаку по этому юниту, вы можете перебросить бросок попадания.',
      'Broad Spectrum Data-tether': STRAT_CP_UNIT,
    },
    loadout: `${EQUIP_EVERY} phosphor serpenta; radium jezzail; Ironstrider feet.`,
  },

  'sydonian-dragoons-with-taser-lances': {
    flavor:
      'Шагая сквозь дымку собственного священного благовония, длинноногие движки, на которых едут Sydonian Dragoon, вечно в движении. Dragoon метят добычу выстрелами светящегося фосфора или облучёнными снарядами, что позволяет им обнаруживать жертву сквозь липкую дымку и настигать её громовой давкой.',
    abilities: {
      'Dynamic Efficiency':
        'Этот юнит может объявить нападение в ход, в который он продвигался или отступал, и вы можете перебрасывать проверки Desperate Escape для моделей этого юнита.',
      'Broad Spectrum Data-tether': STRAT_CP_UNIT,
    },
    loadout: `${EQUIP_EVERY} phosphor serpenta; taser lance.`,
  },

  'sydonian-skatros': {
    flavor:
      'Sydonian Skatros — зловещий часовой, неподвижный, пока враг не забредёт в прицел снайпера. С протокольной точностью и передовым сканером, известным как achillan eye, они наводятся на слабые места врагов и обрушивают точный огонь, что сеет панику и агонию, лучше подтачивая боевой дух врага.',
    abilities: {
      'Dread Snipers':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. Этот юнит обязан пройти проверку боевого шока.',
      'Achillan Eye':
        'Каждый раз, когда эта модель совершает атаку radium jezzail по юниту INFANTRY, вы можете перебросить бросок ранения. Каждый раз, когда эта модель совершает атаку Skatros transuranic arquebus по юниту MONSTER или VEHICLE, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} Mechanicus pistol; radium jezzail; Sydonian feet.`,
    options: ['radium jezzail этой модели можно заменить на 1 Skatros transuranic arquebus.'],
  },

  'tech-priest-dominus': {
    flavor:
      'Tech-Priest Dominus — теократические генералы армий кузнечного мира. Они ведут собрания воинов в бинарной молитве и направляют подчинённых точными стратегиями. Это владыки машин, способные и исцелять повреждения своих творений, и уничтожать осквернённые движки врага.',
    abilities: {
      'Lord of the Machine Cult':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 5+. Если этот юнит имеет ключевое слово Electro-Priests, модели этого юнита вместо этого имеют способность Feel No Pain 4+.',
      'Data-spike':
        'В начале фазы ближнего боя вы можете выбрать один вражеский юнит VEHICLE в дистанции ввязывания юнита этой модели и бросить один D6: на 4+ этот вражеский юнит получает D6 смертельные раны и, до конца фазы, характеристика Навыка ближнего боя (Weapon Skill) оружия ближнего боя этого вражеского юнита ухудшается на 1.',
    },
    loadout: `${EQUIP_THIS} macrostubber; volkite blaster; Omnissian axe.`,
    options: [
      'macrostubber этой модели можно заменить на 1 phosphor serpenta.',
      'volkite blaster этой модели можно заменить на 1 eradication ray.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'tech-priest-enginseer': {
    flavor:
      'Самые распространённые в жречестве кузнечного мира, Enginseer обслуживают многие механизмы Империума — реакторы, боевые танки и даже звездолёты. У них интуитивная связь со священными аппаратами, и они способны пробуждать самые упрямые машинные духи шёпотом машинного кантика.',
    abilities: {
      Enginseer:
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов Adeptus Mechanicus Vehicle, если только она не возглавляет юнит, она имеет способность Lone Operative.',
      'Omnissiah’s Blessing':
        'В вашей фазе командования выберите одну дружественную модель ADEPTUS MECHANICUS в пределах 3" от этой модели. Эта модель восстанавливает до D3 потерянных ран и, если это модель VEHICLE, до начала вашей следующей фазы командования эта модель имеет способность Feel No Pain 5+. Каждую модель можно выбрать для этой способности только один раз за фазу командования.',
      'Vengeance for the Omnissiah':
        'Если дружественная модель Adeptus Mechanicus Vehicle уничтожена в пределах 12" от этой модели, до конца битвы Omnissian axe этой модели имеет характеристику Атак (Attacks) 6.',
    },
    loadout: `${EQUIP_THIS} Mechanicus pistol; Omnissian axe; servo-arm.`,
    leader: { text: LEADER_TEXT },
  },

  'tech-priest-manipulus': {
    flavor:
      'Среди аугментаций Tech-Priest Manipulus — гальваническая ячейка, из которой они направляют мощные заряды Motive Force. Они высасывают источники энергии досуха и используют её, чтобы перегружать ячейки вооружения своих воинов, всё это время защищая свою божественную работу залпами собственного тайного оружия.',
    abilities: {
      'Galvanic Field':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Defend the Divine Work':
        'Один раз за битву, в начале любой фазы, эта модель может задействовать эту способность. Если она это делает, до конца фазы все модели юнита этой модели имеют инвулевый спас-бросок 4+.',
    },
    loadout: `${EQUIP_THIS} magnarail lance; Omnissian staff.`,
    options: ['magnarail lance этой модели можно заменить на 1 transonic cannon.'],
    leader: { text: LEADER_TEXT },
  },

  technoarcheologist: {
    flavor:
      'Technoarcheologist — искатели божественных арканов, движимые желанием раскрыть сокрытое и проанализировать его возможности. Закалённые жизнью на опасных рубежах Империума, эти жрецы применяют когитативные инстинкты, чтобы обнаруживать приближающихся врагов, и пробуждают своих сервиторов-стражей к действенным режимам атаки.',
    abilities: {
      'Seekers of Divine Arcana':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Контроля целей (OC) моделей этого юнита.',
      'Cogitative Instincts':
        'Вражеские юниты, что развёртываются на поле боя как Подкрепления, не могут быть размещены в пределах 12" по горизонтали от этой модели.',
    },
    loadout: `${EQUIP_THIS} Mechanicus pistol; servo-arc claw.`,
    leader: { text: LEADER_TEXT },
  },

  'thulia-ghuld': {
    flavor:
      'Аватар воинского аспекта Омниссии, Тулия Гульд внушает фанатичную преданность марсианским когортам, что она ведёт на войну. Своим Jericho-class conversion resonator она обращает полосы врагов в рассеивающуюся звуковую энергию, а её Rod of the War Forge излучает несущие волны, чтобы подстегнуть её воинов в бой.',
    abilities: {
      'Rod of the War Forge':
        'В вашей фазе командования выберите одну из способностей в разделе Icon of War (см. следующую страницу). До начала вашей следующей фазы командования эта модель имеет эту способность.',
      'Mechanicus Bodyguard':
        'Пока эта модель находится в пределах 3" от одного или более других дружественных юнитов ADEPTUS MECHANICUS, она имеет способность Lone Operative.',
      'Cybernetic Augmentation':
        'Эта модель может двигаться сквозь элементы ландшафта, но не может завершить манёвр внутри стены, пола и т. п. Эту модель можно поставить или завершить манёвр на любом уровне пола RUINS, но если этот уровень не первый этаж, она может сделать это, только если её основание не свисает с пола на этом уровне.',
      'Secutor of Olympus':
        'В начале вашей фазы стрельбы выберите один вражеский юнит VEHICLE в пределах 12" от этой модели и бросьте один D6: на 2+ этот вражеский юнит получает D3+1 смертельные раны.',
    },
    special: {
      'Fanatical Devotion':
        'Вы можете выбрать один дружественный юнит Skitarii или THULIA GHULD в пределах 6" от этой модели; до начала вашей следующей фазы командования этот юнит может стрелять и объявлять нападение в ход, в который он продвигался.',
      'Adaptive Tactics':
        'Вы можете выбрать один дружественный юнит Skitarii или THULIA GHULD в пределах 6" от этой модели; до начала вашей следующей фазы командования этот юнит может стрелять и объявлять нападение в ход, в который он отступал.',
      'The Fires of Mars':
        'Вы можете выбрать один дружественный юнит Skitarii или THULIA GHULD в пределах 6" от этой модели; до начала вашей следующей фазы командования для этого юнита активны и Conqueror Imperative, и Protector Imperative.',
    },
    loadout: `${EQUIP_THIS} Jericho-class conversion resonator; Rod of the War Forge.`,
  },
}

export const abilityNamesRu = {
  'Fire Support': 'Огневая поддержка',
  'Focused Hunters': 'Сосредоточенные охотники',
  'Dynamic Efficiency': 'Динамическая эффективность',
  'Dread Snipers': 'Грозные снайперы',
  'Achillan Eye': 'Глаз achillan',
  'Lord of the Machine Cult': 'Владыка Культа Машины',
  'Data-spike': 'Data-spike',
  Enginseer: 'Enginseer',
  'Omnissiah’s Blessing': 'Благословение Омниссии',
  'Vengeance for the Omnissiah': 'Месть за Омниссию',
  'Galvanic Field': 'Гальваническое поле',
  'Defend the Divine Work': 'Защити божественную работу',
  'Seekers of Divine Arcana': 'Искатели божественных арканов',
  'Cogitative Instincts': 'Когитативные инстинкты',
  'Rod of the War Forge': 'Rod of the War Forge',
  'Cybernetic Augmentation': 'Кибернетическая аугментация',
  'Secutor of Olympus': 'Секутор Олимпа',
  'Fanatical Devotion': 'Фанатичная преданность',
  'Adaptive Tactics': 'Адаптивная тактика',
  'The Fires of Mars': 'Огни Марса',
  'Emanatus Force Field (Aura)': 'Силовое поле Emanatus (Аура)',
  'Scuttling Walker': 'Снующий шагоход',
  'Broad spectrum data-tether': 'Широкоспектральный data-tether',
  'Ride the Thermals': 'Оседлать термики',
  'Searing Conflagration': 'Испепеляющий пожар',
  'Tactica Obliqua': 'Tactica Obliqua',
  'Enhanced data-tether': 'Улучшенный data-tether',
  'Line-breakers': 'Таранщики линий',
  'Network Override': 'Обход сети',
  'Voices in the Code': 'Голоса в коде',
  'Neurostatic Interference (Aura)': 'Нейростатическая помеха (Аура)',
  'Optimised Gait': 'Оптимизированная поступь',
  'Control Edict': 'Управляющий эдикт',
  'Servo-skull Uplink': 'Аплинк серво-черепа',
  'Objective Scouted': 'Цель разведана',
  Omnispex: 'Omnispex',
  'Rad-saturation (Aura)': 'Рад-насыщение (Аура)',
  'Blistering Salvoes': 'Испепеляющие залпы',
  'Bomb Rack': 'Бомбовая стойка',
  'Chaff Launcher': 'Chaff launcher',
  'Command Uplink': 'Командный аплинк',
  'Strafing Run': 'Штурмовой заход',
  'Aerial Deployment': 'Воздушное развёртывание',
  'Canticles of the Omnissiah': 'Canticles of the Omnissiah',
  'Mechanicus Bodyguard': 'Телохранитель Mechanicus',
  'Self-repair Mechanisms': 'Механизмы саморемонта',
  'Invocation of Machine Vengeance': 'Призыв Машинной Мести',
  'Mantra of Discipline': 'Мантра дисциплины',
  'Shroudpsalm (Aura)': 'Псалом-покров (Аура)',
  'Electro-shock': 'Электрошок',
  'Battle Protocols': 'Боевые протоколы',
  'Electro-infusion': 'Электро-вливание',
  'Broad-spectrum Targeting Augurs': 'Широкоспектральные авгуры наведения',
  'Monocular Targeting Helms': 'Моноокулярные шлемы наведения',
  'Elevated Strider': 'Возвышенный шагоход',
  'Broad Spectrum Data-tether': 'Широкоспектральный data-tether',
  'Robotic Bodyguard': 'Роботизированный телохранитель',
  'Repulsor Grid': 'Репульсорная сетка',
  'Breaching Command': 'Команда прорыва',
  'Sentinel Directives': 'Директивы часового',
}
