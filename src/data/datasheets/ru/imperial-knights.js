// Imperial Knights — русский перевод листов данных. Разреженный оверлей поверх EN
// (см. ./index.js). Переведены только тексты; имена юнитов/оружия, ключевые слова
// (Title-Case: Armiger, Imperium, Vehicle, Monster, Titanic, Towering, Fortification…),
// [BRACKET]-теги ([LETHAL HITS], [LANCE]…), названия стратагем (Tank Shock, Heroic
// Intervention) и теги способностей (Bondsman)/(Psychic) остаются английскими.
// `abilityNamesRu` — RU-подписи названий способностей.

const dmg = (range, oc) =>
  `Пока у этой модели осталось ${range} ран, вычтите ${oc} из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`
const NONE = ['Нет.']
// Общие тексты, повторяющиеся между Imperial и Chaos Knights.
const SUNDERER =
  'Каждый раз, когда эта модель совершает атаку по Vehicle, улучшите характеристики Силы (Strength) и Урона (Damage) этой атаки на 1. Если эта атака нацелена на Fortification, улучшите характеристики Силы (Strength) и Урона (Damage) этой атаки на 2 вместо этого.'
const BASTION_FIREPOWER =
  'Каждый раз, когда эта модель остаётся на месте, до конца хода оружие дальнего боя этой модели имеет способность [LETHAL HITS].'
const SEARING_FLAMES =
  'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак, совершённых Acheron flame cannon. До конца фазы этот вражеский юнит не может иметь преимущество укрытия.'
const MACRO_EXTINCTION =
  'Каждый раз, когда эта модель совершает атаку по юниту Monster или Vehicle, прибавьте 1 к броску попадания. Если эта цель — Titanic или Towering, прибавьте 1 и к броску ранения.'
const STORM_OF_BOLTS =
  'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один юнит (исключая Monster и Vehicle), поражённый одной или более из этих атак. До начала вашего следующего хода, пока эта модель на поле боя, этот вражеский юнит подавлен (suppressed). Пока юнит подавлен, каждый раз, когда модель этого юнита совершает атаку, вычтите 1 из броска попадания.'
const SHOCK_CHARGE =
  'Вы можете выбрать эту модель целью стратагемы Tank Shock за 0 CP и можете сделать это, даже если вы уже выбирали целью этой стратагемы другой юнит в этой фазе.'
const PROTECTION_PROTOCOLS =
  'Вы можете выбрать этот юнит целью стратагемы Heroic Intervention за 0 CP и можете сделать это, даже если вы уже выбирали целью этой стратагемы другой юнит в этой фазе.'
const REPAIR_AUTOSIM =
  'В конце вашей фазы командования эта модель восстанавливает до D3 потерянных ран.'
const GRAV_PINNED =
  'В вашей фазе стрельбы, после того как эта модель отстрелялась, если вражеский юнит Infantry был поражён одной или более из этих атак, совершённых graviton crusher, до конца следующего хода вашего противника этот вражеский юнит гравипригвождён (grav-pinned). Пока юнит гравипригвождён, вычтите 2 из характеристики Движения (Move) этого юнита и вычтите 2 из бросков нападения, сделанных для этого юнита.'
const ION_AEGIS =
  'Пока дружественная модель Armiger находится в пределах 6" от этой модели, каждый раз, когда атака дальнего боя нацеливается на эту модель, она имеет преимущество укрытия против этой атаки.'
const RELOAD_MELTA =
  'Questoris heavy stubber этой модели можно заменить на 1 meltagun.'
const CARAPACE_OPTION =
  'Эту модель можно снарядить одним из следующего:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon'

export default {
  'acastus-knight-asterius': {
    flavor:
      'Как и его сородич Porphyrion, гигантский Acastus Knight Asterius — реликт утраченной технологической эпохи. Вооружённый парой twin conversion beam cannon, karacnos mortar battery и двумя volkite culverin, Asterius способен проламывать стены могучих крепостей и очищать бастионы градом фугасов, а его толстая бронированная шкура делает его почти неуязвимым для оружейного огня.',
    abilities: { 'Sunderer of Fortresses': SUNDERER },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** 2 Asterius volkite culverins; karacnos mortar battery; 2 twin conversion beam cannons; titanic feet.',
    options: NONE,
  },

  'acastus-knight-porphyrion': {
    flavor:
      'Один из самых тяжеловооружённых и бронированных среди всех шасси Knight, Acastus Knight Porphyrion размерами и мощью приближается даже к боевым машинам Collegia Titanica и безраздельно царит над любым врагом, не оснащённым специальными контрмерами. Гигантский торс Porphyrion несёт, среди прочего оружия, пару twin magna lascannon, способных испепелить самые могучие бронированные цели.',
    abilities: { 'Bastion of Firepower': BASTION_FIREPOWER },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** 2 Acastus autocannons; Acastus ironstorm missile pod; 2 twin magna lascannons; titanic feet.',
    options: [
      '2 Acastus autocannons этой модели можно заменить на одно из следующего:\n▪ 2 lascannons\n▪ 1 Acastus autocannon и 1 lascannon',
      'Acastus ironstorm missile pod этой модели можно заменить на 1 helios defence missiles.',
    ],
  },

  'armiger-helverin': {
    flavor:
      'С фланговых позиций, из передовых огневых точек и скача вперёд в засаде, эти быстрые Knight-костюмы обрушивают град тяжёлого огня. Среди ключевых стратегических ролей Helverin — анфиладный огонь, разведка и подавление: их autocannon выпускают сотни снарядов в минуту, и связанные клятвой стаи этих боевых машин способны разбить вражеский штурм за секунды.',
    abilities: {
      'Suppression Protocols':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит (исключая Monster и Vehicle), поражённый одной или более из этих атак, совершённых Armiger autocannon. До начала вашего следующего хода этот вражеский юнит подавлен (suppressed). Пока юнит подавлен, каждый раз, когда модель этого юнита совершает атаку, вычтите 1 из броска попадания.',
    },
    damaged: { note: 'осталось 1–5 ран', text: dmg('1–5', 3) },
    loadout:
      '**Эта модель вооружена:** 2 Armiger autocannons; Questoris heavy stubber; armoured feet.',
    options: [RELOAD_MELTA],
  },

  'armiger-moirax': {
    flavor:
      'Если более крупные породы Knight заточены под лобовые штурмы, охоту на танки и пролом крепостей, то меньший и более проворный Armiger Moirax — прирождённый застрельщик, что вырывается вперёд неповоротливых боевых машин и добивает уязвимые цели. Armiger Moirax можно оснастить рядом эзотерических энергетических орудий — крайне действенных, но почти невозможных для замены или ремонта.',
    abilities: { 'Protection Protocols': PROTECTION_PROTOCOLS },
    damaged: { note: 'осталось 1–5 ран', text: dmg('1–5', 3) },
    loadout:
      '**Эта модель вооружена:** graviton pulsar; volkite veuglaire; armoured feet.',
    options: [
      'volkite veuglaire этой модели можно заменить на одно из следующего:\n▪ 1 siege claw и 1 rad cleanser\n▪ 1 graviton pulsar\n▪ 1 lightning lock\n▪ 1 conversion beam cannon',
      'graviton pulsar этой модели можно заменить на одно из следующего:\n▪ 1 siege claw и 1 rad cleanser\n▪ 1 lightning lock\n▪ 1 conversion beam cannon\n▪ 1 volkite veuglaire',
    ],
  },

  'armiger-warglaive': {
    flavor:
      'Armiger Warglaive — проворные и целеустремлённые Knight, обладающие исключительной скоростью, что позволяет им обгонять большинство машин. Жаждущие славы, их пилоты-Bondsmen агрессивно рыщут по полям боя впереди своих владык. Их манёвренность вкупе с оружием, что плавит и прорезает тяжёлую броню, делают их грозными охотниками на вражеские боевые машины и громадных чудищ.',
    abilities: {
      'Impetuous Glory':
        'Каждый раз, когда эта модель совершает манёвр нападения, до конца хода прибавьте 1 к характеристике Атак (Attacks) профиля reaper chain-cleaver – strike этой модели и прибавьте 2 к характеристике Атак (Attacks) профиля reaper chain-cleaver – sweep этой модели.',
    },
    damaged: { note: 'осталось 1–5 ран', text: dmg('1–5', 3) },
    loadout:
      '**Эта модель вооружена:** Questoris heavy stubber; thermal spear; reaper chain-cleaver.',
    options: [RELOAD_MELTA],
  },

  'canis-rex': {
    flavor:
      'Canis Rex — последний неосквернённый осколок Дома Cerberan. Под управлением своего пилота, сэра Хектура, Canis Rex стал прославленной легендой. Свирепость — а порой и явная интуитивная самостоятельность — его духа машины делает этого Knight смертоносным на поле боя. Пульсирующими залпами лазерного огня и сокрушительными взмахами исполинского кулака он безжалостно давит поработителей-угнетателей.',
    abilities: {
      'Legendary Freeblade':
        'Один раз за ход, когда вы выбираете эту модель целью стратагемы, вы можете уменьшить стоимость этого применения этой стратагемы на 1 CP.',
      Chainbreaker:
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит Imperium, что находится в боевом шоке и в пределах 12" от этой модели. Этот юнит больше не в боевом шоке.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Canis Rex вооружён:** las-impulsor; Questoris multi-laser; Freedom’s Hand.',
  },

  'cerastus-knight-acheron': {
    flavor:
      'Cerastus Knight Acheron — боевая машина, созданная не только уничтожать, но и внушать ужас. Вооружённые грозным reaper chainfist, twin heavy bolter и flame cannon образца Acheron, они используются как оружие истребления, и ничто не собьёт их с их мрачного дела, пока враг не будет полностью раздавлен.',
    abilities: {
      'Acheron’s Duty (Bondsman)':
        'Пока на модель действует эта способность, в начале фазы ближнего боя каждый вражеский юнит в дистанции ввязывания одного или более юнитов с этой способностью должен пройти проверку на боевой шок, вычитая 1 из результата.',
      'Searing Flames': SEARING_FLAMES,
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** Acheron flame cannon; twin heavy bolter; reaper chainfist.',
    options: NONE,
  },

  'cerastus-knight-atrapos': {
    flavor:
      'Один из редчайших и мощнейших Knight, Atrapos был создан в начале Великого Крестового Похода, чтобы нести особо редкое и мощное оружие с единственной целью — уничтожением боевых машин еретиков и ксеносов. Говорят, что Knight Atrapos несут в себе холодный, всё уничтожающий голод, и что пилотировать такого — значит заигрывать с безумием.',
    abilities: {
      'Atrapos’ Duty (Bondsman)':
        'Пока на модель действует эта способность, каждый раз, когда эта модель совершает атаку по модели Titanic или Towering, вы можете перебросить бросок попадания и перебросить бросок ранения.',
      'Macro-extinction Protocols': MACRO_EXTINCTION,
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** Atrapos lascutter; graviton singularity cannon.',
    options: NONE,
  },

  'cerastus-knight-castigator': {
    flavor:
      'Вооружённый грозной bolt cannon образца Castigator, Knight Castigator косит плотные построения пехоты громовым дождём болтов, стирая орды, что могли бы задавить другие образцы Knight одной лишь численностью. Расчистив себе путь, Knight Castigator шагает вперёд, чтобы вскрыть лёгкую технику или чудовищных хитиновых тварей своим tempest warblade.',
    abilities: {
      'Castigator’s Duty (Bondsman)':
        'Пока на модель действует эта способность, её оружие дальнего боя имеет способность [SUSTAINED HITS 1], а характеристика Бронепробития (AP) её оружия дальнего боя улучшена на 1.',
      'Storm of Bolts': STORM_OF_BOLTS,
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout: '**Эта модель вооружена:** Castigator bolt cannon; tempest warblade.',
    options: NONE,
  },

  'cerastus-knight-lancer': {
    flavor:
      'Lancer — наиболее известный вариант быстрого и проворного шасси Cerastus. Оснащённые мощным shock lance и щитом ion gauntlet, Knight Lancer идеально подходят для поединков с титаническими врагами лицом к лицу и часто вырываются вперёд основной линии боя, чтобы сразить в поединке ценнейшие боевые машины врага.',
    abilities: {
      'Lancer’s Duty (Bondsman)':
        'Пока на модель действует эта способность, она имеет право начать нападение в ход, в который она продвигалась.',
      'Shock Charge': SHOCK_CHARGE,
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout: '**Эта модель вооружена:** Cerastus shock lance.',
    options: NONE,
  },

  'knight-castellan': {
    flavor:
      'Построенный на шасси класса Dommus, двойное плазменное ядро Knight Castellan питает целый арсенал оружейных систем, что делает его одним из ведущих артиллерийских Knight среди домов. Совместный огонь нескольких таких машин может сравниться с батареей военного корабля Имперского флота и вырвать сердце из вражеской армии.',
    abilities: {
      'Ion Aegis (Aura)': ION_AEGIS,
      'Titan Hunter':
        'Каждый раз, когда атака дальнего боя этой модели распределяется по модели Monster или Vehicle, вы можете перебросить бросок урона (Damage).',
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** plasma decimator; 2 shieldbreaker missile launchers; 2 twin meltaguns; twin siegebreaker cannon; volcano lance; titanic feet.',
    options: [
      '2 shieldbreaker missile launchers и twin siegebreaker cannon этой модели можно заменить на 1 shieldbreaker missile launcher и 2 twin siegebreaker cannons.',
    ],
  },

  'knight-crusader': {
    flavor:
      'Вооружённый ощетинившимся арсеналом тяжёлого и дальнобойного оружия, Knight Crusader занимает ключевые огневые позиции и обрушивает на врага залп за залпом. Пилоты Knight Crusader охотно ведут свои костюмы даже на открытую местность в поисках лучшего места для стрельбы и почитаются собратьями за особо исполнительных и самоотверженных.',
    abilities: {
      'Crusader’s Duty (Bondsman)':
        'Пока на модель действует эта способность, каждый раз, когда эта модель совершает атаку дальнего боя, прибавьте 1 к броску попадания.',
      'Punishing Salvoes':
        'В вашей фазе движения, если эта модель остаётся на месте, до конца хода оружие дальнего боя этой модели имеет способность [SUSTAINED HITS 1].',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** avenger gatling cannon; heavy flamer; meltagun; thermal cannon; titanic feet.',
    options: [
      'meltagun этой модели можно заменить на 1 Questoris heavy stubber.',
      'thermal cannon этой модели можно заменить на:\n▪ 1 rapid-fire battle cannon и 1 Questoris heavy stubber',
      'Эту модель можно снарядить одним из следующего:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon',
    ],
  },

  'knight-defender': {
    flavor:
      'Knight Defender используют артефакты с древней технологией, самоотверженно защищая своих союзников. Едва понятным оружием их пилоты выпускают перегретые болты, что детонируют со звёздной яркостью, и лучи, что взрывным образом превращают материю в энергию, а колышущийся покров пустотного щита ограждает союзников от вреда.',
    abilities: {
      'Defender’s Duty (Bondsman)':
        'Пока на модель действует эта способность, каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.',
      'Selfless Protector':
        'Каждый раз, когда атака дальнего боя распределяется по модели Imperial Knights из вашей армии, если эта модель не полностью видима каждой модели атакующего юнита из-за этой модели Knight Defender, эта модель имеет преимущество укрытия и инвульнерабельный спасбросок 4+ против этой атаки.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** conversion beam obliterator; plasma executor; twin incendine combustor; phosphor blaster; titanic feet.',
  },

  'knight-destrier': {
    flavor:
      'Knight Destrier проворен и быстроног. Используя ракетные ускорители, умелые пилоты придают своему наскоку ещё большую скорость, вгрызаясь во врага thundershock spear или reaper chainsword, а затем скашивая уцелевших остатков разбитого противника градом снарядов chastiser gatling или взрывными боеприпасами своих frag bombard.',
    abilities: {
      'Ram Jets':
        'Каждый раз, когда этот юнит выбирается совершить обычный манёвр или продвижение, до конца фазы прибавьте D3" к характеристике Движения (Move) этой модели.',
      Thundercharge:
        'Если эта модель снаряжена thundershock spear и bellatus reaper chainsword, прибавьте 2 к характеристике Атак (Attacks) оружия ближнего боя этой модели.',
      'Saturation Fire':
        'Каждый раз, когда эта модель совершает атаку дальнего боя по юниту, что находится в пределах дальности одного или более маркеров целей, эта атака имеет способность [IGNORES COVER].',
    },
    damaged: { note: 'осталось 1–6 ран', text: dmg('1–6', 4) },
    loadout:
      '**Эта модель вооружена:** 1 chastiser gatling cannon;\n1 frag bombard; 1 Questoris heavy stubber; 1 titanic feet.',
    options: [
      'chastiser gatling cannon этой модели можно заменить на одно из следующего:\n▪ 1 bellatus reaper chainsword*\n▪ 1 thundershock spear*',
      'frag bombard этой модели можно заменить на одно из следующего:\n▪ 1 bellatus reaper chainsword*\n▪ 1 thundershock spear*',
      '* Модель не может быть снаряжена более чем одним bellatus reaper chainsword или более чем одним thundershock spear.',
    ],
  },

  'knight-errant': {
    flavor:
      'Эти агрессивные штурмовые Knight ближнего боя превосходно охотятся и разят вражеские танки и боевых зверей. Они яростно бросаются в самую гущу сражения, выпуская шипящие залпы перегретой энергии и смертоносные взмахи своего исполинского боевого оружия. Их охота нескончаема: они переходят к новым целям, пока за их спиной остывают оплавленные руины.',
    abilities: {
      'Errant’s Duty (Bondsman)':
        'Пока на модель действует эта способность, вы можете перебрасывать броски продвижения, сделанные для этой модели, а оружие дальнего боя этой модели имеет способность [ASSAULT].',
      'Aggressive Assault':
        'Каждый раз, когда эта модель совершает атаку дальнего боя по ближайшей допустимой цели, прибавьте 1 к броску попадания.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** meltagun; thermal cannon; reaper chainsword.',
    options: [
      'meltagun этой модели можно заменить на 1 Questoris heavy stubber.',
      'reaper chainsword этой модели можно заменить на 1 thunderstrike gauntlet.',
      CARAPACE_OPTION,
    ],
  },

  'knight-gallant': {
    flavor:
      'Gallant — самые неугомонные и воинственные из Knight, чьи духи машин описывают как порывистые и сверх меры воинственные. Их пилоты агрессивны и дерзки, порой их трудно сдержать, и они безрассудны в своей бесстрашной ярости сойтись с врагом и показать свою сокрушительную мощь в поединках чести вплотную.',
    abilities: {
      'Gallant’s Duty (Bondsman)':
        'Пока на модель действует эта способность, вы можете перебрасывать броски нападения, сделанные для этой модели, и каждый раз, когда эта модель совершает атаку ближнего боя, вы можете перебросить бросок попадания.',
      'Martial Pride':
        'Каждый раз, когда этот юнит совершает Консолидацию, модели в нём могут пройти дополнительные 3", при условии что ваш юнит может завершить этот манёвр в дистанции ввязывания одного или более вражеских юнитов.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** meltagun; thunderstrike gauntlet; reaper chainsword.',
    options: [
      'meltagun этой модели можно заменить на 1 Questoris heavy stubber.',
      CARAPACE_OPTION,
    ],
  },

  'knight-paladin': {
    flavor:
      'Эти крайне универсальные Knight составляют стратегический костяк многих ланс. Хоть и не специализированные, они любимы большинством домов за сочетание rapid-fire battle cannon — артиллерийского орудия прямой наводки — и мощного оружия ближнего боя. Бывалые Знатные высоко ценят эти костюмы.',
    abilities: {
      'Paladin’s Duty (Bondsman)':
        'Пока на модель действует эта способность, оружие этой модели имеет способность [LETHAL HITS], а оружие ближнего боя этой модели имеет способность [LANCE].',
      'Seasoned Noble':
        'Каждый раз, когда эта модель совершает атаку дальнего боя по ближайшей допустимой цели, улучшите характеристику Бронепробития (AP) этой атаки на 1.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** meltagun; Questoris heavy stubber; rapid-fire battlecannon; reaper chainsword.',
    options: [
      'meltagun этой модели можно заменить на 1 Questoris heavy stubber.',
      'reaper chainsword этой модели можно заменить на 1 thunderstrike gauntlet.',
      CARAPACE_OPTION,
    ],
  },

  'knight-preceptor': {
    flavor:
      'Knight Preceptor воплощают Рыцарский Кодекс. Их пилоты сближаются с врагом на почётную дистанцию, вступают в бой с уважительной силой и убивают с деловитостью, достойной их положения. Обычно этими Knight управляют седые ветераны, подавая пример младшим товарищам, выслеживая самых грозных врагов.',
    abilities: {
      'Mentor (Bondsman)':
        'Каждый раз, когда модель, на которую действует эта способность, совершает атаку по добыче (quarry) этой модели, вы можете перебросить бросок ранения.',
      'Exemplar of the Code':
        'В начале битвы выберите один юнит из армии вашего противника, чтобы он стал добычей (quarry) этой модели. Каждый раз, когда эта модель совершает атаку по своей добыче, вы можете перебросить бросок ранения. Каждый раз, когда добыча этой модели уничтожается, вы можете выбрать новый юнит из армии вашего противника, чтобы он стал её добычей.',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** las-impulsor; Preceptor multi-laser; reaper chainsword.',
    options: [
      'Questoris multi-laser этой модели можно заменить на одно из следующего:\n▪ 1 meltagun\n▪ 1 Questoris heavy stubber',
      'reaper chainsword этой модели можно заменить на 1 thunderstrike gauntlet.',
      CARAPACE_OPTION,
    ],
  },

  'knight-valiant': {
    flavor:
      'Этот нависающий Knight сокрушает врагов Империума подавляющей огневой мощью на ближней дистанции. Среди своего шквала пушечного огня и ракетных ударов он высвобождает неотвратимую огненную бурю, что способна истребить накатывающие орды или проломить вражеские линии боя, а своим потрескивающим гарпуном он безнаказанно уничтожает куда более крупных исполинов.',
    abilities: {
      'Ion Aegis (Aura)': ION_AEGIS,
      Thundershock:
        'В вашей фазе стрельбы каждый раз, когда вы выбираете цель для thundercoil harpoon этой модели, бросьте один D6 за целевой юнит и один D6 за каждый другой вражеский юнит в пределах 6" от целевого юнита. На 4+ юнит, за который делается бросок, поражается разрядами дуговой энергии; после разрешения всех атак этой модели по целевому юниту каждый юнит, поражённый дуговой энергией, получает D3 смертельные раны.',
    },
    damaged: { note: 'осталось 1–10 ран', text: dmg('1–10', 5) },
    loadout:
      '**Эта модель вооружена:** conflagration cannon; 2 shieldbreaker missile launchers; thundercoil harpoon; 2 twin meltaguns; twin siegebreaker cannon; titanic feet.',
    options: [
      '2 shieldbreaker missile launchers и twin siegebreaker cannon этой модели можно заменить на 1 shieldbreaker missile launcher и 2 twin siegebreaker cannons.',
    ],
  },

  'knight-warden': {
    flavor:
      'С avenger gatling cannon, что выплёвывает сотни бронебойных снарядов длиной в фут за минуту, эти Knight отлично подходят для истребления вражеской пехоты, лёгкой техники и транспортов. Сами костюмы обладают волевыми духами машин, и пилотировать такого — большая честь и знак достижения для Знатного.',
    abilities: {
      'Warden’s Duty (Bondsman)':
        'Пока на модель действует эта способность, оружие этой модели имеет способность [SUSTAINED HITS 1], а оружие дальнего боя этой модели имеет способность [IGNORES COVER].',
      'Thin Their Ranks':
        'Каждый раз, когда эта модель совершает атаку дальнего боя по вражескому юниту (исключая Monster и Vehicle), эта атака имеет способность [DEVASTATING WOUNDS].',
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** avenger gatling cannon; heavy flamer; meltagun; reaper chainsword.',
    options: [
      'meltagun этой модели можно заменить на 1 Questoris heavy stubber.',
      'reaper chainsword этой модели можно заменить на 1 thunderstrike gauntlet.',
      CARAPACE_OPTION,
    ],
  },

  'questoris-knight-magaera': {
    flavor:
      'Knight Magaera — чудо утраченных технологий: от ремонтных авто-симулякров до почти непробиваемого ionic flare shield. Эти эзотерические устройства делают Magaera идеальным для шоковых штурмов и прорывных действий, позволяя Knight невредимым прорываться сквозь самые укреплённые позиции и истреблять врагов ужасающими залпами своей lightning cannon.',
    abilities: {
      'Magaera’s Duty (Bondsman)':
        'Пока на модель действует эта способность, каждый раз, когда эта модель совершает атаку дальнего боя по ближайшей допустимой цели, улучшите характеристики Силы (Strength) и Бронепробития (AP) этой атаки на 1.',
      'Repair Auto-simulacra': REPAIR_AUTOSIM,
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** lightning cannon; phased plasma-fusil; reaper chainsword.',
    options: [
      'reaper chainsword этой модели можно заменить на 1 hekaton siege claw и 1 twin rad cleanser.',
    ],
  },

  'questoris-knight-styrix': {
    flavor:
      'Knight Styrix — крайне изощрённая машина, скрупулёзно созданная для истребления пехоты и вспомогательной техники. Залпы встроенной graviton gun пригвождают незадачливые цели на месте, а косящие вольтические лучи и вскипающие плоть разряды rad-cleanser собирают тяжёлую дань жизней.',
    abilities: {
      'Styrix’s Duty (Bondsman)':
        'Пока на модель действует эта способность, каждый раз, когда эта модель выбирается для стрельбы или ближнего боя, после того как она разрешит все свои атаки, выберите один вражеский юнит, поражённый одной или более из этих атак; этот юнит должен пройти проверку на боевой шок, вычитая 1 из проверки.',
      'Grav-pinned': GRAV_PINNED,
    },
    damaged: { note: 'осталось 1–9 ран', text: dmg('1–9', 5) },
    loadout:
      '**Эта модель вооружена:** graviton crusher; volkite chierovile; reaper chainsword.',
    options: [
      'reaper chainsword этой модели можно заменить на 1 hekaton siege claw и 1 twin rad cleanser.',
    ],
  },
}

// RU-подписи названий способностей. Теги (Bondsman)/(Aura) — (Bondsman) остаётся
// английским как ключевое слово; (Aura) → (Аура) по установленной конвенции.
export const abilityNamesRu = {
  'Sunderer of Fortresses': 'Сокрушитель крепостей',
  'Bastion of Firepower': 'Бастион огневой мощи',
  'Suppression Protocols': 'Протоколы подавления',
  'Protection Protocols': 'Протоколы защиты',
  'Impetuous Glory': 'Стремительная слава',
  'Legendary Freeblade': 'Легендарный Вольный Клинок',
  Chainbreaker: 'Разрыватель оков',
  'Acheron’s Duty (Bondsman)': 'Долг Ахерона (Bondsman)',
  'Searing Flames': 'Испепеляющее пламя',
  'Atrapos’ Duty (Bondsman)': 'Долг Атрапоса (Bondsman)',
  'Macro-extinction Protocols': 'Протоколы макро-истребления',
  'Castigator’s Duty (Bondsman)': 'Долг Кастигатора (Bondsman)',
  'Storm of Bolts': 'Шторм болтов',
  'Lancer’s Duty (Bondsman)': 'Долг Лансера (Bondsman)',
  'Shock Charge': 'Ударный натиск',
  'Ion Aegis (Aura)': 'Ионная эгида (Аура)',
  'Titan Hunter': 'Охотник на титанов',
  'Crusader’s Duty (Bondsman)': 'Долг Крестоносца (Bondsman)',
  'Punishing Salvoes': 'Карающие залпы',
  'Defender’s Duty (Bondsman)': 'Долг Защитника (Bondsman)',
  'Selfless Protector': 'Самоотверженный защитник',
  'Ram Jets': 'Реактивные ускорители',
  Thundercharge: 'Громовой заряд',
  'Saturation Fire': 'Насыщающий огонь',
  'Errant’s Duty (Bondsman)': 'Долг Странника (Bondsman)',
  'Aggressive Assault': 'Агрессивный штурм',
  'Gallant’s Duty (Bondsman)': 'Долг Галланта (Bondsman)',
  'Martial Pride': 'Воинская гордость',
  'Paladin’s Duty (Bondsman)': 'Долг Паладина (Bondsman)',
  'Seasoned Noble': 'Опытный Знатный',
  'Mentor (Bondsman)': 'Наставник (Bondsman)',
  'Exemplar of the Code': 'Образец Кодекса',
  'Warden’s Duty (Bondsman)': 'Долг Стража (Bondsman)',
  'Thin Their Ranks': 'Проредить ряды',
  Thundershock: 'Громовой разряд',
  'Magaera’s Duty (Bondsman)': 'Долг Магеры (Bondsman)',
  'Repair Auto-simulacra': 'Ремонтные авто-симулякры',
  'Styrix’s Duty (Bondsman)': 'Долг Стирикса (Bondsman)',
  'Grav-pinned': 'Гравипригвождение',
}
