// Grey Knights — русский перевод листов данных. Разреженный оверлей поверх EN (см. ./index.js):
// переведены только тексты (flavor, тексты способностей, loadout/options, damaged/leader/
// transport). Имена юнитов/оружия, характеристики, ключевые слова (Grey Knights), названия
// правил и оружия (Nemesis force weapon, Psychic, storm bolter), [BRACKET]-теги и ALL-CAPS-
// названия способностей остаются английскими. `abilityNamesRu` (внизу) даёт RU-подписи.

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const ASSAULT_RAMP =
  'Каждый раз, когда юнит высаживается из этой модели после того, как она совершила обычный манёвр, этот юнит по-прежнему может объявить нападение в этот ход.'
const WARRIOR_STRATEGIST =
  'Один раз за раунд боя одна модель из вашей армии с этой способностью может задействовать её, когда её юнит выбирается целью стратагемы. Если она это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.'
const ANCIENTS_BANNER =
  'Прибавьте 1 к характеристике Контроля целей (OC) моделей юнита носителя.'
const APOTHECARYS_NARTHECIUM =
  'В вашей фазе командования, если носитель не уничтожен, вы можете вернуть 1 уничтоженную модель (исключая CHARACTER) в юнит носителя.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'brother-captain': {
    flavor:
      'Как сильная левая рука своих Grand Master, Brother-Captain — закалённые командиры поля боя и могучие воины. Они обращают свои огромные псионические дары на стремительное уничтожение врагов, усиливая мощь братьев, чуя скрытые слабости противника и подавая бескомпромиссный пример тем, кто идёт за ними.',
    abilities: {
      'Hammerhand (Psychic)':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
      'Eye of Judgement (Psychic)':
        'Каждый раз, когда эта модель совершает атаку, вы можете перебросить бросок ранения.',
    },
    loadout: `${EQUIP_THIS} storm bolter; Nemesis force weapon.`,
    options: [
      'storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'brotherhood-champion': {
    flavor:
      'Brotherhood Champion служит образцом боевого мастерства, к которому стремятся все Grey Knight. Это воин непревзойдённого умения, что наставляет новобранцев в искусстве клинка. На поле боя эти особые воины подают братьям беспощадный пример, выискивая военных вождей вражеского воинства и повергая их в жестоких дуэлях, где важна лишь победа.',
    abilities: {
      'Clarion of Haste (Psychic)':
        'Пока эта модель возглавляет юнит, этот юнит может объявить нападение в ход, в который он продвигался.',
      'Inspiring Exemplar':
        'Каждый раз, когда эта модель уничтожает вражескую модель CHARACTER в фазе ближнего боя, вы получаете 1 CP и, до конца битвы, прибавьте 1 к характеристике Атак (Attacks) её Nemesis force weapon.',
    },
    loadout: `${EQUIP_THIS} storm bolter; Nemesis force weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'brotherhood-chaplain': {
    flavor:
      'Chaplain хранят духовную святость своих братьев и Ордена в целом. Они распевают литании священной стойкости и беспощадного рвения, проецируя их и в форме зычной, вокс-усиленной проповеди, и телепатическим чародейством прямо в умы собратьев. Так Chaplain помогают укрепить и без того грозную решимость Grey Knight.',
    abilities: {
      'Zealous Path':
        'Пока эта модель возглавляет юнит, вы можете перебрасывать броски нападения для этого юнита.',
      'Litanies of Sanctity':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один дружественный юнит Grey Knights, который в боевом шоке и находится в пределах 12" от этой модели. Этот юнит больше не в боевом шоке.',
    },
    loadout: `${EQUIP_THIS} storm bolter; crozius arcanum.`,
    leader: { text: LEADER_TEXT },
  },

  'brotherhood-librarian': {
    flavor:
      'Даже в Ордене могучих псайкеров Librarian Grey Knight повелевают энергиями Варпа с выверенным контролем и сокрушительной мощью. Прикрывая братьев кружащими бурями псионического пламени и охранными сигилами, вплетёнными в их тайное снаряжение, Librarian копят свою истинную силу, прежде чем высвободить её в вихрях сокрушительного чародейского уничтожения.',
    abilities: {
      'Sanctic Hood':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют способность Feel No Pain 4+ против Psychic Attacks.',
      'Haloed in Soulfire (Psychic)':
        'Пока эта модель возглавляет юнит, этот юнит можно выбирать целью атаки, только если атакующая модель находится в пределах 18".',
    },
    loadout: `${EQUIP_THIS} Nemesis force weapon; Vortex of Doom.`,
    options: [
      'Эту модель можно снабдить одним из следующего:\n▪ 1 combi-weapon\n▪ 1 storm bolter',
    ],
    leader: { text: LEADER_TEXT },
  },

  'brotherhood-techmarine': {
    flavor:
      'В тех случаях, когда долг ведёт их на поле боя, Techmarine Grey Knight обращают всё своё тайное инженерное знание на сохранение незаменимых боевых машин Ордена. Полагаясь больше на дары Омниссии, чем на псионические таланты, столь широко используемые их братьями, Techmarine обращают против врага мощные клинки и огнестрел.',
    abilities: {
      Techmarine:
        'Пока эта модель находится в пределах 3" от одного или более дружественных юнитов Grey Knights Vehicle, она имеет способность Lone Operative.',
      'Blessing of the Omnissiah':
        'В вашей фазе командования вы можете выбрать одну дружественную модель Grey Knights Vehicle в пределах 3" от этой модели. Эта модель восстанавливает до D3 потерянных ран и, до начала вашей следующей фазы командования, каждый раз, когда эта модель VEHICLE совершает атаку, прибавьте 1 к броску попадания. Каждую модель можно выбрать для этой способности только один раз за ход.',
      'Guardians of the Machine':
        'Каждый раз, когда вражеский юнит завершает манёвр нападения в дистанции ввязывания одного или более дружественных юнитов Grey Knights Vehicle и в пределах 6" от этого юнита, вы можете нацелить стратагему Heroic Intervention на этот юнит, независимо от любых других применений этой стратагемы в этой фазе. Если вы это делаете: это применение стоит на 1 CP меньше; это применение не мешает применить эту стратагему на других юнитах в этой фазе.',
    },
    loadout: `${EQUIP_THIS} forge bolter; grav-pistol; Omnissian power axe; servo-arm.`,
    leader: { text: LEADER_TEXT },
  },

  'brotherhood-terminator-squad': {
    flavor:
      'Массивно бронированные, тяжело вооружённые и беспощадно преданные своему священному долгу, Terminator Grey Knight образуют несокрушимое сердце многих ударных сил. Некоторые отряды сопровождают Apothecary, чьи narthecium раздают целебные бальзамы, чтобы остановить тяжёлые раны, или Ancient, что вздымают тонко выделанные штандарты, вдохновляя братьев на войне.',
    abilities: {
      'Force Edge (Psychic)':
        'Каждый раз, когда модель этого юнита совершает атаку ближнего боя по юниту (исключая MONSTER и VEHICLE), улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1.',
    },
    wargear: {
      'Ancient’s Banner': ANCIENTS_BANNER,
      'Apothecary’s Narthecium': APOTHECARYS_NARTHECIUM,
    },
    loadout: `${EQUIP_EVERY} storm bolter; Nemesis force weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Terminator его storm bolter можно заменить на одно из следующего:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon',
      'У 1 Terminator его storm bolter можно заменить на 1 Apothecary’s narthecium.',
      'storm bolter у 1 Terminator можно заменить на одно из следующего:\n▪ 1 incinerator и 1 Ancient’s banner\n▪ 1 psilencer и 1 Ancient’s banner\n▪ 1 psycannon и 1 Ancient’s banner\n▪ 1 storm bolter и 1 Ancient’s banner*',
      '* storm bolter этой модели заменить нельзя.',
    ],
  },

  'castellan-crowe': {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Кроу'],
    flavor:
      'Castellan Crowe бросается в бой, окутанный ослепительным псионическим огнём — отличительным знаком его ордена. Хоть он никогда не будет столь глуп, чтобы отпереть запретную силу Black Blade of Antwyr, он всё же владеет пленённым клинком с огромным мастерством и силой, используя его, свой storm bolter и мощную псионическую мощь, чтобы прорубить путь сквозь врагов.',
    abilities: {
      'Champion of the Order of Purifiers (Psychic)':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристике Атак (Attacks) оружия Purifying Flame моделей этого юнита.',
      'Foesight (Psychic)':
        'Каждый раз, когда эта модель совершает атаку по юниту CHARACTER, вы можете перебросить бросок попадания.',
    },
    loadout: `${EQUIP_THIS} Purifying Flame; storm bolter; Black Blade of Antwyr.`,
    leader: { text: LEADER_TEXT },
  },

  'grand-master': {
    flavor:
      'Grand Master — вожди братств Grey Knight и одни из их величайших воинов. Более того, это искусные боевые псайкеры, способные усиливать свою боевую мощь плотно сфокусированной эмпирейской силой, и стратегические учёные, чьё владение стратегиями войны против сверхъестественного и злобного не имеет себе равных.',
    abilities: {
      'Warrior Strategist': WARRIOR_STRATEGIST,
      'Might of Titan (Psychic)':
        'Один раз за битву, в начале фазы ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы прибавьте 3 к характеристикам Атак (Attacks) и Силы (Strength) оружия ближнего боя этой модели.',
    },
    loadout: `${EQUIP_THIS} storm bolter; Nemesis force weapon.`,
    options: [
      'storm bolter этой модели можно заменить на одно из следующего:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon',
    ],
    leader: { text: LEADER_TEXT },
  },

  'grand-master-in-nemesis-dreadknight': {
    flavor:
      'Пилотируя Nemesis Dreadknight, Grand Master может пускать в ход вооружение, обычно доступное лишь боевым танкам. Усиленная его псионической мощью и сервоприводной силой, чтобы владеть огромным и ужасающим оружием ближнего боя, чистая убийственная мощь такого воина поистине ужасна.',
    abilities: {
      'Surge of Wrath (Psychic)':
        'Каждый раз, когда эта модель совершает атаку ближнего боя по юниту MONSTER или VEHICLE, вы можете перебросить бросок попадания, бросок ранения и бросок урона.',
      'Warrior Strategist': WARRIOR_STRATEGIST,
    },
    loadout: `${EQUIP_THIS} dreadfists.`,
    options: [
      'dreadfists этой модели можно заменить на одно из следующего:\n▪ 1 Nemesis daemon greathammer\n▪ 1 Nemesis flail\n▪ 1 Nemesis greatsword\n▪ 1 Nemesis mace',
      'Эту модель можно снабдить до двумя из следующего, но нельзя брать дубликаты:\n▪ 1 gatling psilencer\n▪ 1 heavy incinerator\n▪ 1 heavy psycannon\n▪ 1 sublimator',
      'Эту модель можно снабдить 1 fragstorm grenade launcher.',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'grand-master-voldus': {
    // Search-only aliases (see ALIASES-PROGRESS.md) — never displayed as the unit's name.
    aliasesRu: ['Волдус'],
    flavor:
      'Grand Master Aldrik Voldus владеет могучим Malleus Argyrum — демоническим молотом, чья головка пляшет чародейским пламенем, против которого мало кто из врагов устоит. Один из мощнейших псайкеров, что знал его Орден за годы, он также обладает силой обрушивать волны душевного огня на врагов и заклинать святилища пляшущего псионического свечения, что укрывают его братьев от вреда.',
    abilities: {
      'Sanctuary (Psychic)':
        '▪ Этот юнит имеет Stealth.\n▪ Атаки ближнего боя, нацеленные на этот юнит, имеют -1 к броскам попадания.',
      'Hammer Aflame (Psychic)':
        'Каждый раз, когда юнит этой модели сражается, вы можете выбрать один вражеский юнит в дистанции ввязывания юнита этой модели и бросить один D6: на 2–3 этот вражеский юнит получает 1 смертельную рану; на 4–5 — D3 смертельные раны; на 6 — D3+3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} Searing Purity; storm bolter; Malleus Argyrum.`,
    leader: { text: LEADER_TEXT },
  },

  'grey-knights-thunderhawk-gunship': {
    flavor:
      'Могучие Thunderhawk Gunship служат Ордену Grey Knight так же, как любому другому. Мощные, универсальные летательные аппараты, они высаживают отряды сынов Титана в самое сердце битвы, истребляя полчища врагов широким набором противопехотного и противотанкового оружия.',
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
      'Thunderhawk cluster bombs этой модели можно заменить на 1 hellstrike missile battery.',
      'Thunderhawk heavy cannon этой модели можно заменить на 1 turbo-laser destructor.',
    ],
    damaged: { note: 'осталось 1–10 ран', text: dmgHitMinus('1–10') },
    transport:
      'Эта модель имеет транспортную вместимость 30 моделей Grey Knights Infantry. Каждая модель Terminator занимает место 2 моделей.',
  },

  'interceptor-squad': {
    flavor:
      'Interceptor Squad воплощают способность Grey Knight стремительно реагировать на кризисы и внезапные угрозы. Их телепортеры позволяют им мерцать в реальном пространстве и из него, совершая короткие телепорт-«рывки» и раз за разом вырываясь из Варпа с полыхающими орудиями и поющими Nemesis force weapon, пока они кромсают ничего не подозревающего врага.',
    abilities: {
      'Personal Teleporters':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если он не находится в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр до 6", как если бы это была ваша фаза движения. Если он это делает, до конца хода этот юнит не может объявить нападение.',
    },
    loadout: `${EQUIP_EVERY} storm bolter; Nemesis force weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Interceptor его storm bolter и Nemesis force weapon можно заменить на одно из следующего:\n▪ 1 incinerator и 1 close combat weapon\n▪ 1 psilencer и 1 close combat weapon\n▪ 1 psycannon и 1 close combat weapon',
    ],
  },

  'land-raider': {
    flavor:
      'Грозный Land Raider — идеальный бронированный транспортный танк для Grey Knight. Его арсенал мощной огневой мощи более чем достаточен, чтобы выкашивать полчища врагов и разносить их бронеподдержку в лом, пока Land Raider с рёвом несётся вперёд, чтобы доставить пассажиров в самое сердце потрясённых вражеских линий.',
    abilities: {
      'Assault Ramp': ASSAULT_RAMP,
    },
    loadout: `${EQUIP_THIS} 2 godhammer lascannons; twin heavy bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 multi-melta.',
      'Эту модель можно снабдить 1 storm bolter.',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Grey Knights Infantry. Каждая модель Terminator занимает место 2 моделей.',
  },

  'land-raider-crusader': {
    flavor:
      'Созданный для штурма линий обороны и траншей, Land Raider Crusader обрушивает испепеляющий противопехотный огонь на продвижении. Grey Knight часто используют его, чтобы прорваться сквозь защитников ритуальных мест и остановить их дьявольские обряды призыва.',
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
      'Эта модель имеет транспортную вместимость 16 моделей Grey Knights Infantry. Каждая модель Terminator занимает место 2 моделей.',
  },

  'land-raider-redeemer': {
    flavor:
      'Оружие ужаса, у которого мало равных, Land Raider Redeemer несёт огромные flamestorm cannon. Те, что выставляют Grey Knight, извергают дуги ослепительного освящённого пламени, что поджигает и душу, и психику, а не только плоть, делая эти танки исключительным средством, чтобы выкуривать сверхъестественные ужасы и окопавшихся еретиков из плотнейших укрытий.',
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
      'Эта модель имеет транспортную вместимость 14 моделей Grey Knights Infantry. Каждая модель Terminator занимает место 2 моделей.',
  },

  'nemesis-dreadknight': {
    flavor:
      'Nemesis Dreadknight владеют огромными Nemesis force weapon и обеспечивают сокрушительную тяжёлую огневую мощь. Тяжёлое псионическое присутствие их пилотов в сочетании с сервоприводной скоростью и мощью позволяет этим экзо-костюмам шагать сквозь ряды врагов, как гиганты, не обращая внимания на тех, кто пытается преградить им путь.',
    abilities: {
      'Indomitable Spirit (Psychic)':
        'Эта модель может стрелять и объявлять нападение в ход, в который она продвигалась или отступала.',
    },
    loadout: `${EQUIP_THIS} dreadfists.`,
    options: [
      'dreadfists этой модели можно заменить на одно из следующего:\n▪ 1 Nemesis daemon greathammer\n▪ 1 Nemesis greatsword',
      'Эту модель можно снабдить до двумя из следующего, но нельзя брать дубликаты:\n▪ 1 gatling psilencer\n▪ 1 heavy incinerator\n▪ 1 heavy psycannon',
    ],
    damaged: { note: 'осталось 1–4 ран', text: dmgHitMinus('1–4') },
  },

  'paladin-squad': {
    flavor:
      'Даже среди изысканных рядов Grey Knight Paladin — исключительные воины, чьи мощные псионические силы безупречно переплетаются с их боевым владением клинком, чтобы сокрушать даже могущественнейших врагов. Часто сопровождаемые Apothecary или несущими штандарт Ancient, они — излюбленные телохранители и Brother-Captain, и Grand Master.',
    abilities: {
      'Attuned Onslaught (Psychic)':
        'Каждый раз, когда этот юнит совершает манёвр нападения, до конца хода прибавьте 1 к характеристике Урона (Damage) оружия ближнего боя моделей PALADIN SQUAD в этом юните.',
    },
    wargear: {
      'Ancient’s Banner': ANCIENTS_BANNER,
      "Apothecary's Narthecium": APOTHECARYS_NARTHECIUM,
    },
    loadout: `${EQUIP_EVERY} storm bolter; Nemesis force weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у до 2 Paladin их storm bolter можно заменить на одно из следующего:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon',
      'У 1 Paladin его storm bolter можно заменить на 1 Apothecary’s narthecium.',
      'storm bolter у 1 Paladin можно заменить на одно из следующего:\n▪ 1 incinerator и 1 Ancient’s banner\n▪ 1 psilencer и 1 Ancient’s banner\n▪ 1 psycannon и 1 Ancient’s banner\n▪ 1 storm bolter и 1 Ancient’s banner*',
      '* storm bolter этой модели заменить нельзя.',
    ],
  },

  'purgation-squad': {
    flavor:
      'Обеспечивая жизненно важную поддержку тяжёлым огнём для высокоподвижных штурмов, столь любимых Grey Knight, Purgation Squad состоят из мастеров-снайперов, вооружённых мощным огнестрелом. Фокусируя свой псионический потенциал, чтобы обнаруживать врагов, скрытых в плотнейших укрытиях, и даже изгибать свои выстрелы в воздухе в поисках добычи, они оставляют врага съёжившимся в жалком ужасе своими залпами.',
    abilities: {
      'Righteous Persecution':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит (исключая MONSTER и VEHICLE), поражённый одной или более из этих атак: до начала вашего следующего хода этот вражеский юнит пригвождён. Пока юнит пригвождён, вычтите 2 из его характеристики Перемещения (Move) и вычтите 2 из бросков нападения для него.',
    },
    loadout: `${EQUIP_EVERY} storm bolter; Nemesis force weapon.`,
    options: [
      'До 4 Purgator их storm bolter и Nemesis force weapon можно заменить на одно из следующего:\n▪ 1 incinerator и 1 close combat weapon\n▪ 1 psilencer и 1 close combat weapon\n▪ 1 psycannon и 1 close combat weapon',
    ],
  },

  'purifier-squad': {
    flavor:
      'Order of Purifiers воплощает святость цели Grey Knight. Они неподкупны и фанатичны, обладают незапятнанным духом. Телепортированные в самое сердце демонических легионов, они часто сражаются как наконечник, откуда обрушивают очищающий огонь, что выжигает осквернённых в пепел.',
    abilities: {
      'Sanctity of Purpose':
        'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок ранения, равный 1. Если цель находится в радиусе маркера цели, вы можете вместо этого перебросить бросок ранения.',
    },
    loadout: `${EQUIP_EVERY} Purifying Flame; storm bolter; Nemesis force weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у до 2 Purifier их storm bolter и Nemesis force weapon можно заменить на одно из следующего:\n▪ 1 incinerator и 1 close combat weapon\n▪ 1 psilencer и 1 close combat weapon\n▪ 1 psycannon и 1 close combat weapon',
    ],
  },

  razorback: {
    flavor:
      'Razorback — переработка Rhino, что жертвует частью транспортной вместимости ради боеприпасов и энергоячеек корпусного тяжёлого оружия, идеальная для быстрой переброски элитных отрядов Grey Knight в силовой броне в бой. Так Razorback способны обрушивать слаженный прикрывающий огонь, пока их пассажиры высаживаются.',
    abilities: {
      'Fire Focus':
        'В вашей фазе стрельбы, после того как эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца хода каждый раз, когда дружественная модель, что высадилась из этого TRANSPORT в этот ход, совершает атаку по этому вражескому юниту, улучшите характеристику Пробития брони (Armour Penetration) этой атаки на 1. Один и тот же вражеский юнит может быть затронут этой способностью только один раз за ход.',
    },
    loadout: `${EQUIP_THIS} twin heavy bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 storm bolter.',
      'twin heavy bolter этой модели можно заменить на 1 twin lascannon.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей Grey Knights Infantry. Она не может перевозить модели Terminator.',
  },

  rhino: {
    flavor:
      'Неустрашимые, прочные и сурово живучие, Rhino тысячелетиями были вездесущим бронетранспортёром космодесанта. Те, что выставляют Grey Knight, тяжело заворожены, их корпуса пронизаны truesilver-психосхемами, что удваивают защиту Aegis поблизости.',
    abilities: {
      'Truesilver Aegis (Aura)':
        'Пока дружественный юнит Grey Knights целиком в пределах 6" от этого юнита, модели этого юнита имеют способность Feel No Pain 6+ против смертельных ран.',
    },
    loadout: `${EQUIP_THIS} storm bolter; armoured tracks.`,
    options: [
      'Эту модель можно снабдить 1 hunter-killer missile.',
      'Эту модель можно снабдить 1 дополнительным storm bolter.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Grey Knights Infantry. Она не может перевозить модели Terminator.',
  },

  'stormhawk-interceptor': {
    flavor:
      'Столь же задиристый, сколь быстрый и проворный, Stormhawk Interceptor — исключительный истребитель завоевания господства в воздухе. С Grey Knight в кресле пилота и корпусом, испещрённым чародейскими оберегами, эта машина способна сбивать крылатых демонических абоминаций с небес и уничтожать еретическую авиацию в жестоких воздушных боях.',
    abilities: {
      Interceptor:
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, что может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} las-talon; skyhammer missile launcher; twin assault cannon; armoured hull.`,
    options: [
      'las-talon этой модели можно заменить на 1 icarus stormcannon.',
      'skyhammer missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 typhoon missile launcher',
    ],
  },

  'stormraven-gunship': {
    flavor:
      'Мощные летательные аппараты ближней поддержки, Stormraven Gunship способны высаживать Grey Knight и даже почитаемого Dreadnought там, где эмпирейские возмущения не дают телепортироваться. Живучие и ощетинившиеся тяжёлым оружием, Stormraven превосходны в бронированных штурмах и огненных зачистках зон высадки.',
    abilities: {
      'Armoured Resilience':
        'Каждый раз, когда атака распределяется по этой модели, вычтите 1 из характеристики Урона (Damage) этой атаки.',
    },
    loadout: `${EQUIP_THIS} 2 stormstrike missile launchers; twin assault cannon; typhoon missile launcher; armoured hull.`,
    options: [
      'Эту модель можно снабдить 2 hurricane bolters.',
      'twin assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy plasma cannon\n▪ 1 twin lascannon',
      'typhoon missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Grey Knights Infantry и 1 модель Grey Knights Venerable Dreadnought. Каждая модель Terminator занимает место 2 моделей.',
  },

  'stormtalon-gunship': {
    flavor:
      'Stormtalon Gunship — крайне маневренные летательные аппараты, универсальные в своей роли и выборе цели. Часто неся эскортную службу для более крупных машин, они выслеживают порождённых Варпом врагов. Используя векторные форсажи, их пилоты обрушивают удары по земле, насыщая зоны телепортации огнём и расчищая их для братьев.',
    abilities: {
      'Strafing Run':
        'Каждый раз, когда эта модель совершает дальнобойную атаку по юниту, что не может FLY, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} skyhammer missile launcher; twin assault cannon; armoured hull.`,
    options: [
      'skyhammer missile launcher этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon\n▪ 1 typhoon missile launcher',
    ],
  },

  'strike-squad': {
    flavor:
      'Strike Squad действуют как авангардные силы, применяя телепорт-технологии и чародейство, чтобы возникать глубоко во вражеских линиях. Заняв позицию, они обрушивают сокрушительные шоковые штурмы на неготовых врагов, владея арсеналом Nemesis force weapon, тяжёлой огневой мощи и псионической ярости, чтобы захватывать и чародейски заворачивать важнейшие тактические точки.',
    abilities: {
      'Sanctifying Ritual (Psychic)':
        'В конце вашей фазы командования, если этот юнит находится в радиусе маркера цели, который вы контролируете, этот маркер цели остаётся под вашим контролем, пока уровень контроля вашего оппонента над этим маркером цели не станет больше вашего в конце фазы.',
    },
    loadout: `${EQUIP_EVERY} storm bolter; Nemesis force weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у 1 Grey Knight его storm bolter и Nemesis force weapon можно заменить на одно из следующего:\n▪ 1 incinerator и 1 close combat weapon\n▪ 1 psilencer и 1 close combat weapon\n▪ 1 psycannon и 1 close combat weapon',
    ],
  },

  'venerable-dreadnought': {
    flavor:
      'Древние Grey Knight, заточённые в саркофаги Venerable Dreadnought, направляют своё мощное тяжёлое оружие и удары гидравлических кулаков с отточенным веками мастерством. Но их многовековая мудрость и опыт ценнее всего, помогая им командовать ударными силами и предлагая псионическое водительство их братьям.',
    abilities: {
      'Guidance of the Ancients (Psychic)':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы каждый раз, когда модель Grey Knights из вашей армии совершает атаку по этому юниту, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} assault cannon; storm bolter; Dreadnought combat weapon.`,
    options: [
      'assault cannon этой модели можно заменить на одно из следующего:\n▪ 1 heavy plasma cannon\n▪ 1 twin lascannon',
      'storm bolter этой модели можно заменить на 1 heavy flamer.',
    ],
  },
}

export const abilityNamesRu = {
  'Indomitable Spirit (Psychic)': 'Несокрушимый дух (Психика)',
  'Attuned Onslaught (Psychic)': 'Настроенный натиск (Психика)',
  'Ancient’s Banner': 'Штандарт Ancient',
  'Apothecary’s Narthecium': 'Нартециум Apothecary',
  "Apothecary's Narthecium": 'Нартециум Apothecary',
  'Righteous Persecution': 'Праведное преследование',
  'Sanctity of Purpose': 'Святость цели',
  'Fire Focus': 'Фокус огня',
  'Truesilver Aegis (Aura)': 'Эгид истинного серебра (Аура)',
  Interceptor: 'Перехватчик',
  'Armoured Resilience': 'Бронированная стойкость',
  'Strafing Run': 'Штурмовой заход',
  'Sanctifying Ritual (Psychic)': 'Освящающий ритуал (Психика)',
  'Guidance of the Ancients (Psychic)': 'Водительство древних (Психика)',
  'Hammerhand (Psychic)': 'Молоторукость (Психика)',
  'Eye of Judgement (Psychic)': 'Око Суда (Психика)',
  'Clarion of Haste (Psychic)': 'Клич спешки (Психика)',
  'Inspiring Exemplar': 'Вдохновляющий образец',
  'Zealous Path': 'Ревностный путь',
  'Litanies of Sanctity': 'Литании святости',
  'Sanctic Hood': 'Санктический капюшон',
  'Haloed in Soulfire (Psychic)': 'В ореоле душевного огня (Психика)',
  Techmarine: 'Техножрец',
  'Blessing of the Omnissiah': 'Благословение Омниссии',
  'Guardians of the Machine': 'Стражи машины',
  'Force Edge (Psychic)': 'Силовая кромка (Психика)',
  'Ancient’s Banner': 'Штандарт Ancient',
  'Apothecary’s Narthecium': 'Нартециум Apothecary',
  'Champion of the Order of Purifiers (Psychic)': 'Чемпион Ордена Очистителей (Психика)',
  'Foesight (Psychic)': 'Взор на врага (Психика)',
  'Warrior Strategist': 'Воин-стратег',
  'Might of Titan (Psychic)': 'Мощь Титана (Психика)',
  'Surge of Wrath (Psychic)': 'Прилив гнева (Психика)',
  'Sanctuary (Psychic)': 'Святилище (Психика)',
  'Hammer Aflame (Psychic)': 'Пылающий молот (Психика)',
  'Aerial Assault': 'Воздушный штурм',
  'Thunderhawk Cluster Bombs': 'Кассетные бомбы «Тандерхок»',
  'Personal Teleporters': 'Личные телепортеры',
  'Assault Ramp': 'Штурмовая аппарель',
}
