// Imperial Agents — русский перевод листов данных. Разреженный оверлей поверх EN (см.
// ./index.js): переведены только тексты (flavor, тексты способностей, loadout/options,
// damaged/leader/transport). Имена юнитов/оружия, характеристики, ключевые слова, названия
// правил и оружия, [BRACKET]-теги остаются английскими; composition наследуется от EN.
// `abilityNamesRu` (внизу) даёт RU-подписи под английскими названиями способностей.

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'
const INV4 = 'Носитель имеет инвулевый спас-бросок 4+.'
const DEATH_TO_ALIEN =
  'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1. Если цель этой атаки не имеет ключевых слов IMPERIUM или CHAOS, вы можете вместо этого перебросить бросок попадания.'
const AUTHORITY =
  'Пока эта модель возглавляет юнит, она может погружаться в любой TRANSPORT, в который может погружаться её юнит телохранителей (Bodyguard).'
const NUNCIO =
  'Один раз за битву, в начале любой фазы командования, вы можете выбрать один маркер цели в пределах 6" от носителя. Все вражеские юниты (исключая MONSTERS и VEHICLES) в радиусе этого маркера цели обязаны пройти проверку боевого шока. Каждый маркер цели может быть целью этой способности только один раз за ход.\n\n**Примечание разработчика:** положите один жетон Nuncio-aquila рядом с носителем, убрав его, когда он задействует эту способность.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  'aquila-kill-team': {
    flavor:
      'Aquila Kill Team снаряжены так, чтобы встречать разнообразные или неведомые ужасы выверенным и стратегически гибким ответом.',
    abilities: {
      'Death to the Alien': DEATH_TO_ALIEN,
      'Kill Team':
        'Каждый раз, когда атака нацеливается на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, используйте характеристику Стойкости большинства моделей этого юнита при определении того, какой бросок требуется, чтобы эта атака успешно ранила. Если два или более значений Стойкости представлены поровну, используйте наибольшее.\n\nПри определении того, какие модели этого юнита могут погружаться в Transport, модели Gravis Veteran занимают место 2 моделей, но в остальном могут погружаться в любой TRANSPORT, в который может погружаться их юнит, даже несмотря на то, что аналогичные модели в других юнитах имеют ключевое слово GRAVIS.\n\n**Примечание разработчика:** хотя допущения в правиле выше заставляют некоторые модели вести себя иначе, чем аналогичные модели в других юнитах, оно призвано упростить правила транспортов.',
    },
    wargearAbilities: { 'Astartes Shield': INV4 },
    specialAbilities: {
      'ATTACHED UNIT':
        'Если юнит Character вашей армии можно присоединить к юниту Deathwatch Kill Team, вместо этого его можно присоединить к этому юниту.',
    },
    loadout:
      '**Каждый Kill Team Sergeant вооружён:** plasma pistol; power weapon.\n\n**Каждый Gravis Veteran вооружён:** infernus heavy bolter; bolt pistol; close combat weapon.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** stalker bolt rifle; bolt pistol; close combat weapon.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** bolt pistol; heavy thunder hammer.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** Deathwatch marksman bolt carbine; special-issue bolt pistol; close combat weapon.\n\n**Если юнит содержит 10 моделей, 1 Deathwatch Veteran вооружён:** special-issue bolt pistol; xenophase blade.',
    options: [
      'За каждые 5 моделей в юните у до 1 модели её infernus heavy bolter можно заменить на одно из следующего:\n▪ 1 frag cannon.\n▪ 1 hellstorm bolt rifle и 1 Astartes grenade launcher.',
      'За каждые 5 моделей в юните у до 1 модели её heavy thunder hammer можно заменить на 1 power weapon и 1 Astartes shield.',
      'За каждые 5 моделей в юните у до 1 модели её stalker bolt rifle можно заменить на 1 plasma incinerator.',
      'За каждые 5 моделей в юните у до 1 модели её Deathwatch marksman bolt carbine можно заменить на 1 combat knife.',
    ],
  },

  'callidus-assassin': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['ассасин-каллидус', 'каллидус', 'калидус'],
    flavor:
      'Там, где действует Callidus Assassin, расцветает анархия. С помощью меняющего облик наркотика полиморфина они втираются в ближайшее окружение цели, саботируя системы и сея дезинформацию, прежде чем сойтись с жертвой — залпами разрушающего разум пистолета и взмахами загадочного клинка.',
    abilities: {
      'Acrobatic Escape':
        '▪ В конце фазы ближнего боя, если этот юнит связан ближним боем, он может совершить манёвр отступления до D6".\n▪ В конце хода вашего оппонента, если этот юнит находится более чем в 3" от всех вражеских юнитов, вы можете задействовать эту способность. Если вы это делаете:\n▪ Поместите этот юнит в стратегические резервы.\n▪ Этот юнит обязан совершить манёвр прибытия (ingress move) в вашей следующей фазе движения (включая ваш первый ход).',
      'Reign of Confusion':
        'Один раз за ход, когда ваш оппонент выбирает целью стратагемы юнит своей армии в пределах 12" от этой модели, эта модель может задействовать эту способность. Если она это делает, увеличьте стоимость этого применения этой стратагемы на 1 CP.',
    },
    loadout: `${EQUIP_THIS} neural shredder; phase sword and poison blades.`,
  },

  'corvus-blackstar': {
    flavor:
      'Corvus Blackstar — обтекаемые, скрытные летательные аппараты, что используются для высадки kill team в кишащие врагом зоны или даже в цитадели ксеносов. Залпом ракет Blackstar добывают господство в воздухе и зачищают целевую точку, прежде чем включить парящие двигатели и доставить свой смертоносный груз элитных воинов.',
    abilities: {
      'Blackstar Cluster Launcher':
        'Каждый раз, когда эта модель завершает обычный манёвр, вы можете выбрать один вражеский юнит, над которым она прошла в этом манёвре, и бросить шесть D6: за каждый 5+ этот юнит получает 1 смертельную рану.',
    },
    wargearAbilities: {
      'Auspex Array': 'Дальнобойное оружие носителя имеет способность [IGNORES COVER].',
      'Infernum Halo-launcher': 'Носитель имеет ключевое слово SMOKE.',
    },
    loadout: `${EQUIP_THIS} 2 Blackstar rocket launchers; twin assault cannon; armoured hull.`,
    options: [
      'twin assault cannon этой модели можно заменить на 1 twin lascannon.',
      '2 Blackstar rocket launchers этой модели можно заменить на 2 stormstrike missile launchers.',
      'Эту модель можно снабдить 1 hurricane bolter.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 auspex array\n▪ 1 infernum halo-launcher',
    ],
    damaged: { note: 'осталось 1–5 ран', text: dmgHitMinus('1–5') },
    transport: 'Эта модель имеет транспортную вместимость 12 моделей DEATHWATCH INFANTRY.',
  },

  'culexus-assassin': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['ассасин-кулексус', 'кулексус'],
    flavor:
      'Culexus Assassin источает вокруг себя ауру гнетущего страха. Их главные цели — псайкеры, которых само присутствие этих бездушных убийц терзает мукой, а под чародейскими залпами animus speculum ни одна ведьма долго не живёт.',
    abilities: {
      'Etheric Emergence':
        'В вашей фазе движения, когда эта модель выставляется на поле боя способностью Deep Strike, она может совершить эфирное явление (etheric emergence). Если она это делает, эту модель можно выставить где угодно на поле боя более чем в 6" по горизонтали от всех вражеских юнитов, но до конца хода она не вправе объявлять нападение.',
      Abomination: 'Эта модель имеет способность Feel No Pain 2+ против Psychic Attacks.',
      'Soulless Horror':
        'Один раз за битву, в начале любой фазы командования, эта модель может задействовать эту способность. Если она это делает, каждый вражеский юнит в пределах 9" от этой модели обязан пройти проверку боевого шока, вычитая 1 из этой проверки (или вычитая 2, если этот юнит — PSYKER).',
    },
    wargearAbilities: {
      'Psychic Assassin':
        'Каждый раз, когда вы выбираете юнит PSYKER целью для этого оружия, пока эти атаки не будут отыграны, характеристика Attacks этого оружия становится равной 6.',
    },
    loadout: `${EQUIP_THIS} animus speculum; life-draining touch.`,
  },

  'deathwatch-kill-team': {
    flavor:
      'Навыки Deathwatch Veteran оттачивались в их прежнем Ордене десятилетиями, порой веками. За долгую вахту против многоликих угроз ксеносов каждый ветеран учится вооружаться так, чтобы наилучшим образом послужить текущей миссии, и отряды несут набор оружия, способного повергнуть любого врага.',
    abilities: { 'Death to the Alien': DEATH_TO_ALIEN },
    wargearAbilities: { 'Astartes Shield': INV4 },
    loadout: '**Каждая модель вооружена:** boltgun; power weapon.',
    options: [
      'За каждые 5 моделей в этом юните у до 2 моделей их boltgun и power weapon можно заменить на одно из следующего:\n▪ 1 boltgun и 1 Astartes shield\n▪ 1 power weapon и 1 Astartes shield',
      'За каждые 5 моделей в этом юните у до 2 моделей их boltgun и power weapon можно заменить на 1 Deathwatch thunder hammer.',
      'За каждые 5 моделей в этом юните у 1 модели её boltgun и power weapon можно заменить на 1 stalker-pattern boltgun и 1 close combat weapon.',
      'За каждые 5 моделей в этом юните у до 2 моделей их boltgun и power weapon можно заменить на 1 Deathwatch shotgun и 1 close combat weapon.',
      'За каждые 5 моделей в этом юните у 1 модели её boltgun и power weapon можно заменить на 1 frag cannon и 1 close combat weapon.',
      'За каждые 5 моделей в этом юните у 1 модели её boltgun и power weapon можно заменить на 1 infernus heavy bolter и 1 close combat weapon.',
      'boltgun и power weapon у 1 модели можно заменить на 1 Black Shield blades.',
      'power weapon у Watch Sergeant можно заменить на 1 xenophase blade.',
      'boltgun у Watch Sergeant можно заменить на 1 combi-weapon.',
    ],
  },

  'eversor-assassin': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['ассасин-эверсор', 'эверсор'],
    flavor:
      'Берсерки-убийцы, накачанные нестабильными химическими стимуляторами, Eversor Assassin — ураганы клинков и когтей. Их спускают с цепи как оружие террора и истребления — убить не только назначенную цель, но и всех вокруг неё.',
    abilities: {
      Frenzon: 'Эта модель вправе стрелять и объявлять нападение в ход, в который она продвигалась.',
      Overkill:
        'Один раз за битву, в вашей фазе движения, эта модель может задействовать эту способность перед тем, как совершить обычный манёвр. Если она это делает, до конца хода прибавьте 6" к характеристике Движения (Move) этой модели и прибавьте 3 к характеристике Атак (Attacks) её оружия ближнего боя.',
    },
    loadout: `${EQUIP_THIS} executioner pistol; power sword and neuro gauntlet.`,
  },

  'exaction-squad': {
    flavor:
      'Самые опытные и хладнокровные Арбитраторы образуют Exaction Squad, чтобы выслеживать и брать живьём опасных преступников. Они без колебаний сокрушают всякого на своём пути, безжалостно забивая дубинками или срезая шквалом тяжёлого огня, и не останавливаются, пока цель не взята под стражу.',
    abilities: {
      'Imperial Law':
        'В начале битвы выберите один юнит армии вашего оппонента. Каждый раз, когда модель этого юнита совершает атаку по этому юниту, эта атака имеет способности [LETHAL HITS] и [PRECISION].',
    },
    wargearAbilities: {
      'Arbites Medi-kit':
        'В начале вашей фазы командования, если юнит носителя ниже своей начальной численности, вы можете вернуть в этот юнит до D3 уничтоженных Exaction Vigilant.',
      'Nuncio Aquila': NUNCIO,
      'Soulguilt Scanner': 'Дальнобойное оружие моделей юнита носителя имеет способность [IGNORES COVER].',
    },
    loadout:
      '**Каждый Proctor-Exactant и Exaction Vigilant вооружён:** Arbites combat shotgun; Arbites shotpistol; close combat weapon.\n\n**Cyber-mastiff вооружён:** mechanical bite.',
    options: [
      'У до 2 Exaction Vigilant их Arbites combat shotgun можно заменить на одно из следующего (дубликаты не допускаются):\n▪ 1 executioner shotgun\n▪ 1 Arbites grenade launcher\n▪ 1 heavy stubber\n▪ 1 webber',
      '1 Exaction Vigilant, вооружённого Arbites combat shotgun, можно снабдить 1 excruciator maul.*',
      '1 другого Exaction Vigilant, вооружённого Arbites combat shotgun, можно снабдить 1 Arbites medi-kit.*',
      '1 другого Exaction Vigilant, вооружённого Arbites combat shotgun, можно снабдить 1 soulguilt scanner.*',
      'Proctor-Exactant можно снабдить 1 nuncio aquila.',
      '* Arbites combat shotgun этой модели заменить нельзя.',
    ],
  },

  'grey-knights-terminator-squad': {
    flavor:
      'Grey Knights — первейшая охотящаяся на демонов элита Империума. В их рядах мало воинов страшнее и искуснее их Terminator. Потому, когда могущественные имперские агенты взывают о помощи против инфернальных угроз, на зов часто отвечают именно эти братья.',
    abilities: {
      'Hammerhand (Psychic)':
        'Каждый раз, когда модель этого юнита совершает манёвр нападения, до конца хода оружие ближнего боя моделей этого юнита имеет способность [LETHAL HITS].',
    },
    wargearAbilities: {
      'Ancient’s Banner': 'Прибавьте 1 к характеристике Контроля целей (OC) моделей юнита носителя.',
      Narthecium: 'В вашей фазе командования вы можете вернуть 1 уничтоженную модель (исключая CHARACTER) в юнит носителя.',
    },
    loadout: '**Каждая модель вооружена:** storm bolter; Nemesis force weapon.',
    options: [
      '1 Grey Knights Terminator его storm bolter можно заменить на одно из следующего:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon',
      '1 Grey Knights Terminator, вооружённого storm bolter, можно снабдить 1 Ancient’s banner.*',
      'У 1 Grey Knights Terminator его storm bolter можно заменить на 1 narthecium.*',
      '* Нельзя выбрать обе эти опции для одной и той же модели.',
    ],
  },

  'imperial-navy-breachers': {
    flavor:
      'Искушённые в опасных абордажах, эти элитные Armsmen — агрессивное и прямое орудие командира своего боевого корабля. Они носят полностью герметичную пустотную броню и владеют крепким оружием, оптимизированным для боя в тесноте, а некоторые несут более специализированное снаряжение для взлома вражеских переборок.',
    abilities: {
      'Breaching Team':
        'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок ранения, равный 1. Если цель находится в радиусе маркера цели, вы можете вместо этого перебросить бросок ранения.',
      Gheistskull:
        'Один раз за битву, когда вы выбираете этот юнит целью стратагемы Grenade, вы можете выбрать целью один вражеский юнит, видимый этому юниту и в пределах 18" от него, который не находится в дистанции ввязывания юнитов вашей армии, вместо юнита в пределах 8".',
      'CAT Unit':
        'Один раз за битву, когда этот юнит выбран стрелять, до конца фазы дальнобойное оружие моделей этого юнита получает способность [IGNORES COVER].\n\n**Примечание разработчика:** положите рядом с этим юнитом один жетон Gheistskull и один жетон CAT Unit, убирая соответствующий жетон, когда способность задействована.',
    },
    wargearAbilities: { 'Endurant Shield': INV4 },
    loadout:
      '**Navis Sergeant-at-Arms вооружён:** Navis shotgun; close combat weapon.\n\n**Один Navis Armsman вооружён:** Navis las-volley; close combat weapon.\n\n**Один другой Navis Armsman вооружён:** Navis heavy shotgun; close combat weapon; endurant shield.\n\n**Каждая другая модель вооружена:** Navis shotgun; close combat weapon.',
    options: [
      'Navis shotgun у Navis Sergeant-at-Arms можно заменить на одно из следующего:\n▪ 1 autopistol и 1 chainsword\n▪ 1 bolt pistol и 1 power weapon',
      'У 1 Navis Armsman его Navis las-volley можно заменить на одно из следующего:\n▪ 1 meltagun\n▪ 1 plasma gun',
      'У 1 Navis Armsman его Navis shotgun можно заменить на 1 autopistol и 1 power weapon.',
      'У 1 Navis Armsman его Navis shotgun можно заменить на 1 autopistol и 1 chainfist.',
      '1 Navis Armsman можно снабдить 1 demolition charge.',
    ],
  },

  'imperial-rhino': {
    flavor:
      'Один из самых узнаваемых и вездесущих бронетранспортёров пехоты Империума, Rhino столь же надёжен, сколь и живуч. Вместительный десантный отсек, способность к самопочинке и крепления для storm bolter и hunter-killer missile снискали ему репутацию рабочей лошадки имперских армий.',
    abilities: {
      'Self Repair': 'В начале вашей фазы командования эта модель восстанавливает 1 потерянную рану.',
    },
    loadout: `${EQUIP_THIS} storm bolter; armoured tracks.`,
    options: ['Эту модель можно снабдить 1 hunter-killer missile.'],
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей AGENTS OF THE IMPERIUM INFANTRY. Она не может перевозить модели TERMINATOR или OFFICIO ASSASSINORUM.',
  },

  inquisitor: {
    flavor:
      'Долг инквизиторов — расследовать заговоры ксеносов, порчу, мутации, ересь, культы, псайкеров-отступников и всё прочее, что они сочтут достойным внимания. Их власть такова, что нет ничего вне их полномочий и никого вне их правосудия. Если сочтут нужным, они могут приказать уничтожить целые миры.',
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      'Power of the Rosette':
        'Каждый раз, когда вы выбираете юнит этой модели целью стратагемы, бросьте один D6: на 3+ вы получаете 1 CP.',
    },
    wargearAbilities: {
      'Blessed Wardings': 'Пока носитель возглавляет юнит, модели этого юнита имеют инвулевый спас-бросок 6+.',
      'Psychic Gifts': 'Носитель имеет ключевое слово PSYKER.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Inquisitorial melee weapon; blessed wardings.`,
    options: [
      'bolt pistol этой модели можно заменить на 1 combi-weapon.',
      'blessed wardings этой модели можно заменить на 1 psychic gifts и 1 Psychic Shock Wave.',
      'Если эта модель снабжена 1 psychic gifts, её Inquisitorial melee weapon можно заменить на 1 force weapon.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-coteaz': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Котеаз'],
    flavor:
      'Пуританин Ordo Malleus, инквизитор Котеаз каждый час бодрствования проводит за изучением докладов своих бесчисленных агентов — или лицом к лицу с демонами, еретиками и чужаками в открытом бою. Он отказывается обращать силу Варпа себе на пользу и вместо этого направляет её на борьбу с демоническим и на суд над теми, кому недостаёт чистоты.',
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      'Malefic Wardings (Psychic)':
        'Пока эта модель возглавляет юнит, модели этого юнита имеют инвулевый спас-бросок 6+, а против Psychic Attacks и атак моделей DAEMON — инвулевый спас-бросок 4+.',
      'Spy Network':
        'Каждый раз, когда ваш оппонент получает CP в результате способности, бросьте один D6: на 2+ вы тоже получаете 1 CP.',
    },
    wargearAbilities: {
      'Glovodan Psyber-eagle':
        'В вашей фазе командования вы можете выбрать один вражеский юнит в пределах 18" от носителя. До начала вашей следующей фазы командования этот юнит не может иметь Benefit of Cover.\n\n**Примечание разработчика:** положите жетон Glovodan Psyber-eagle рядом с выбранным юнитом как напоминание.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Psychic Blast; Nemesis daemon hammer; Glovodan psyber-eagle.`,
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-draxus': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Драксус', 'Кирия Драксус'],
    flavor:
      'Дерзкая и целеустремлённая инквизитор Ordo Xenos, Кирия Драксус — специалист по охоте на некронов. Радикальная во взглядах, она принимает необходимость сотрудничать с некоторыми чужаками ради защиты Империума. О некронах она узнала от аэльдари, а свои псионические способности отточила под наставничеством как ксеносов, так и людей.',
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      'Xenos Hunter':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку по вражескому юниту, не имеющему ключевых слов IMPERIUM или CHAOS, прибавьте 1 к броску попадания.',
      'Psychic Veil (Psychic)':
        'В вашей фазе командования этот PSYKER может задействовать эту способность. Если он это делает, бросьте один D6: на 1 юнит этого PSYKER получает D3 смертельные раны; на 2+ до начала вашей следующей фазы командования юнит этого PSYKER можно выбирать целью дальнобойной атаки, только если атакующая модель находится в пределах 18".',
    },
    loadout: `${EQUIP_THIS} Dirgesinger; Psychic Tempest; power fist.`,
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-greyfax': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Грейфакс'],
    flavor:
      'Инквизитора Грейфакс страшатся даже многие в её собственном ордене — Ordo Hereticus. Лишённая жалости и раскаяния, она воин с железной волей. К тому же она могущественный псайкер: телепатические способности позволяют ей распознавать ложь допрашиваемых. Некоторые клеймят Грейфакс опасной радикалкой, но её преданность Империуму неоспорима.',
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      Psyoculum:
        'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [ANTI-PSYKER 4+].',
      'No Mercy':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку по юниту, что ниже половинной численности, прибавьте 1 к броску попадания.',
    },
    loadout: `${EQUIP_THIS} Castigation; condemnor stake; master-crafted power sword.`,
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-kroyle': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['Кройл', 'Инигох Кройл'],
    flavor:
      'Радикальный инквизитор Ordo Xenos, Инигох Кройл — непревзойдённый охотник на чудовищ-ксеносов. Со спины покорённого гарралиска Кройл выслеживает и настигает добычу-ксеносов, валя даже самых грозных целей пропитанными ядом выстрелами своего Jindarii tox-cycler.',
    abilities: {
      'On My Signal, Fire!':
        'После того как этот юнит отстрелялся, вы можете выбрать один вражеский юнит, поражённый этими атаками. До конца фазы каждый раз, когда модель AGENTS OF THE IMPERIUM или IMPERIUM INFANTRY BATTLELINE из вашей армии совершает атаку по этому вражескому юниту, вы можете перебросить бросок попадания.',
      'Tox-cycler':
        'В вашей фазе стрельбы, после того как этот юнит отстрелялся, если эта модель добилась попадания своим Jindarii tox-cycler, до конца битвы прибавьте 2 к характеристикам Силы (Strength) и Урона (Damage) этого оружия (до максимальной характеристики Урона 6).',
    },
    loadout: `${EQUIP_THIS} Jindarii tox-cycler; stubcarbine; butcher blade; Garralisk’s claws and teeth.`,
    options: ['Нет.'],
  },

  'inquisitorial-agents': {
    flavor:
      'В помощь своим эзотерическим и запутанным миссиям многие инквизиторы содержат свиты избранных лиц редкого таланта, мастерства и силы. Пёстрые собрания бойцов, фанатиков, учёных и псайкеров, они без устали трудятся в тени, оберегая Империум.',
    abilities: {
      'Loyal Henchmen':
        'Пока модель Inquisitor возглавляет этот юнит, каждый раз, когда по этому юниту совершается атака, вычтите 1 из броска ранения.',
    },
    wargearAbilities: {
      'Tome-skull':
        'Один раз за битву за каждый Tome-skull, которым снабжён этот юнит, в начале любой фазы вы можете выбрать либо один дружественный юнит AGENTS OF THE IMPERIUM, который в боевом шоке и в пределах 6" от этого юнита, либо один вражеский юнит в пределах 6" от этого юнита. Если вы выбрали дружественный юнит, он больше не в боевом шоке. Если вы выбрали вражеский юнит, он обязан пройти проверку боевого шока.\n\n**Примечание разработчика:** положите нужное число жетонов Tome-skull рядом с юнитом в начале битвы, убирая по одному каждый раз, когда юнит задействует эту способность.',
    },
    loadout:
      '*Этот юнит может содержать 2 Gun Servitor, только если он также содержит 10 Inquisitorial Agents.\n\n**Каждый Inquisitorial Agent вооружён:** agent firearm; agent melee weapon.\n\n**Каждый Gun Servitor вооружён:** heavy bolter; agent melee weapon.',
    options: [
      'За каждые 5 Inquisitorial Agents в этом юните его можно снабдить 1 Tome-skull.',
      'За каждые 5 Inquisitorial Agents в этом юните 1 Inquisitorial Agent можно снабдить 1 plasma pistol.**',
      'За каждые 5 Inquisitorial Agents в этом юните 1 Inquisitorial Agent можно снабдить 1 eviscerator.**',
      'За каждые 5 Inquisitorial Agents в этом юните 1 Inquisitorial Agent можно снабдить 1 mystic stave.**',
      'Любое число Gun Servitor может заменить свой heavy bolter на одно из следующего:\n▪ 1 multi-melta\n▪ 1 plasma cannon',
      '** Одну и ту же модель нельзя снабдить более чем одной из этих опций снаряжения.',
    ],
  },

  'inquisitorial-chimera': {
    flavor:
      'Chimera — гибрид бронетранспортёра и лёгкого танка, простой в массовом производстве и чрезвычайно универсальный. Машины на службе имперских агентов несут богатый выбор вооружения: они стремительно доставляют пассажиров в бой, а затем прикрывают их плотным огнём, пока те выполняют свои миссии.',
    abilities: {
      'Rapid Deployment':
        'Юниты могут высаживаться из этого TRANSPORT после того, как он продвигался. Юниты, поступившие так, считаются совершившими обычный манёвр в этой фазе и не могут объявлять нападение в этот же ход, но в остальном действуют как обычно.',
    },
    loadout: `${EQUIP_THIS} multi-laser; heavy bolter; lasgun array; armoured tracks.`,
    options: [
      'heavy bolter этой модели можно заменить на 1 heavy flamer.',
      'multi-laser этой модели можно заменить на одно из следующего:\n▪ 1 heavy bolter*\n▪ 1 heavy flamer*\n\n* Это оружие заменить нельзя.',
      'Эту модель можно снабдить одним из следующего:\n▪ 1 heavy stubber\n▪ 1 storm bolter',
      'Эту модель можно снабдить 1 hunter-killer missile.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 13 моделей INQUISITOR INFANTRY и INQUISITORIAL AGENT. Она не может перевозить модели TERMINATOR.',
  },

  'ministorum-priest': {
    flavor:
      'В бесконечной войне человечества за выживание вера и фанатизм — оружие не слабее клинка или огнестрела. Ministorum Priest воплощают эту истину: они шагают в бой, ревя боевые песнопения, что вдохновляют союзников и ужасают врагов. Одни крушат черепа и кости врагов ударами потрескивающих силовых булав, другие сжигают жертв пламенем виндиктор-оружия.',
    abilities: {
      'Holy Hatred':
        'Пока эта модель возглавляет юнит, оружие ближнего боя моделей этого юнита имеет способность [SUSTAINED HITS 1].',
      Zealot:
        'Один раз за битву, в фазе ближнего боя, эта модель может задействовать эту способность. Если она это делает, до конца фазы улучшите характеристики Силы (Strength) и Атак (Attacks) оружия ближнего боя этой модели на 3.',
    },
    loadout: `${EQUIP_THIS} zealot’s vindictor.`,
    options: ['zealot’s vindictor этой модели можно заменить на 1 holy pistol и 1 power weapon.'],
    leader: {
      text: LEADER_TEXT,
    },
  },

  navigator: {
    flavor:
      'Надменные аристократы, чья ценность для Империума огромна, навигаторы выходят на поле боя лишь изредка — как правило, ради некой жизненно важной миссии для хозяина своего пустотного корабля. В такие часы их дар видеть изменчивые приливы Варпа делает их мощным активом — как и сжигающий души взгляд их мутантного третьего глаза.',
    abilities: {
      'Gaze into the Empyrean (Psychic)':
        'Вражеские юниты, выставляемые на поле боя как Подкрепления, не могут быть выставлены в пределах 12" от этой модели.',
      'Third Eye (Psychic)':
        'В начале вашей фазы стрельбы выберите один вражеский юнит в пределах 12" от этой модели и видимый ей. Этот юнит обязан пройти проверку боевого шока, вычитая 2 из результата, если это юнит INFANTRY. Если проверка провалена, этот вражеский юнит получает 3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} laspistol; force-orb cane.`,
    leader: { text: LEADER_TEXT },
  },

  'rogue-trader-entourage': {
    flavor:
      'Вольные торговцы — отчаянные исследователи, безжалостные завоеватели и хитрые купцы, что исследуют и осваивают неизведанные области галактики во имя Империума. Их семьи владеют Торговым патентом, что отмечает их принадлежность к имперской элите. Одни командуют целыми армадами, у других — лишь малая свита последователей.',
    abilities: {
      'Backroom Deals':
        'Если ваша армия содержит один или более юнитов с этой способностью, на шаге Declare Battle Formations выберите один из них. Пока выбранный юнит возглавляет юнит, модели этого юнита имеют способность Infiltrators.',
      'Warrant of Trade':
        'Если ваша армия включает один или более юнитов с этой способностью, после того как оба игрока развернули свои армии, выберите до D3 юнитов IMPERIUM BATTLELINE из вашей армии и передислоцируйте их. При этом вы можете выставить эти юниты в стратегических резервах независимо от того, сколько юнитов уже находится в стратегических резервах.',
    },
    wargearAbilities: {
      'Healing Serum':
        'В начале вашей фазы командования, если юнит носителя ниже своей начальной численности, вы можете вернуть в юнит носителя до D3 уничтоженных моделей (исключая CHARACTER).',
    },
    loadout:
      '**Rogue Trader вооружён:** household pistol; monomolecular cane-rapier.\n\n**Death Cult Assassin вооружена:** dartmask; Death Cult power blade.\n\n**Lectro-Maester вооружён:** voltaic pistol; close combat weapon.\n\n**Rejuvenat Adept вооружён:** laspistol; close combat weapon; healing serum.',
    leader: { text: LEADER_TEXT },
  },

  sanctifiers: {
    abilities: {
      'Ministorum Sermon':
        'Пока этот юнит содержит MINISTORUM PRIEST, каждый раз, когда модель этого юнита совершает атаку ближнего боя, прибавьте 1 к броску ранения.',
      Cherub:
        'Один раз за битву вы можете нацелить на этот юнит стратагему Command Re-roll за 0 CP — даже если в этой фазе вы уже нацеливали эту стратагему на другой юнит.\n\n**Примечание разработчика:** положите жетон Cherub рядом с юнитом, убрав его, когда способность будет задействована.',
    },
    wargearAbilities: {
      'Salvationist Medikit':
        'В вашей фазе командования, если носитель на поле боя, вы можете вернуть в этот юнит до D3 уничтоженных моделей (исключая модели CHARACTER).',
      'Simulacrum Imperialis': 'Улучшите характеристику Лидерства (Leadership) моделей юнита носителя на 1.',
    },
    specialAbilities: {
      'ATTACHED UNIT':
        'Если модель Ministorum Priest или Inquisitor из вашей армии со способностью Leader может быть присоединена к Sisters of Battle Squad, вместо этого её можно присоединить к этому юниту. Если модель MINISTORUM PRIEST или INQUISITOR из вашей армии присоединяется к этому юниту на шаге Declare Battle Formations, эта модель получает способность Scouts 6".',
    },
    loadout:
      '**Miraculist вооружена:** holy fire; burning hands.\n\n**Salvationist вооружена:** close combat weapon; Salvationist medikit.\n\n**Death Cult Assassin вооружена:** Death Cult blades.\n\n**1 Missionary вооружён:** plasma gun; Sanctifier melee weapon.\n\n**1 Missionary вооружён:** Ministorum flamer; Sanctifier melee weapon.\n\n**Каждый Sanctifier вооружён:** Ministorum hand flamer; Sanctifier melee weapon.',
    options: [
      'У 1 модели Missionary её 1 plasma gun можно заменить на 1 meltagun.',
      '1 модель Missionary, вооружённую 1 plasma gun, можно снабдить 1 holy fire (plasma gun этой модели заменить нельзя).',
      'У 1 модели Sanctifier её 1 Sanctifier melee weapon можно заменить на 1 Ministorum hand flamer и 1 close combat weapon.',
      'У 1 модели Sanctifier её 1 Sanctifier melee weapon можно заменить на 1 close combat weapon и 1 simulacrum imperialis.',
    ],
  },

  'sisters-of-battle-immolator': {
    flavor:
      'Immolator — бронетранспортёр, широко используемый Adepta Sororitas. Под стать их фанатичной манере войны его вооружение тяготеет к агрессивной огневой мощи ближней дистанции, лучше всего применимой среди плотного террейна или в атаке. Бесчисленные еретики и ксеносы обращены в пепел огненными залпами этих орудий очищения.',
    abilities: {
      'Purge and Cleanse':
        'Каждый раз, когда эта модель отстрелялась, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы этот вражеский юнит не может иметь Benefit of Cover.',
    },
    loadout: `${EQUIP_THIS} heavy bolter; immolation flamers; armoured tracks.`,
    options: [
      'immolation flamers этой модели можно заменить на одно из следующего:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta',
      'Эту модель можно снабдить 1 hunter-killer missile.',
    ],
    transport:
      'Эта модель имеет транспортную вместимость 6 моделей ORDO HERETICUS INFANTRY.\n\nВ начале шага Declare Battle Formations вы можете выбрать один SISTERS OF BATTLE SQUAD из вашей армии. Если вы это делаете, этот юнит делится на два юнита с как можно более равным числом моделей (при делении юнита так отметьте, какие модели образуют каждый из двух новых юнитов). Один из этих юнитов обязан начать битву погружённым в этот TRANSPORT; другой может начать битву погружённым в другой TRANSPORT или быть развёрнут как отдельный юнит.',
  },

  'sisters-of-battle-squad': {
    flavor:
      'Adepta Sororitas — или Боевые Сёстры — воинствующая рука имперской веры. Облачённые в освящённую силовую броню и вооружённые арсеналом мощного оружия средней и ближней дистанции, эти фанатичные воительницы превосходно выжигают гнёзда ереси и расстреливают врагов Золотого Трона, где бы те ни находились. Они ценные союзницы для любого имперского агента.',
    abilities: {
      'Defenders of the Faith':
        'В конце вашей фазы командования, если этот юнит находится в радиусе маркера цели, который вы контролируете, этот маркер цели остаётся под вашим контролем, пока уровень контроля вашего оппонента над этим маркером цели не станет выше вашего в конце какой-либо фазы.',
      'Incensor Cherub':
        'Один раз за битву вы можете нацелить на этот юнит стратагему Command Re-roll за 0 CP — даже если в этой фазе вы уже нацеливали эту стратагему на другой юнит.\n\n**Примечание разработчика:** положите жетон Incensor Cherub рядом с юнитом, убрав его, когда способность будет задействована.',
    },
    wargearAbilities: {
      'Simulacrum Imperials': 'Улучшите характеристику Лидерства (Leadership) моделей юнита носителя на 1.',
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

  'subductor-squad': {
    flavor:
      'Силуэт Subductor — один из самых узнаваемых и внушающих страх среди преступных сословий Империума. Неся штурмовые щиты паттерна Subjugation и потрескивающие шоковые булавы, они — жестокие бойцы передней линии, способные раздавить самое упорное сопротивление.',
    abilities: {
      'Dedication to Duty':
        'Каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если эта модель ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте её из игры. Уничтоженная модель может сражаться после того, как юнит атакующей модели завершит свои атаки, и затем убирается из игры.',
    },
    wargearAbilities: { 'Nuncio Aquila': NUNCIO },
    loadout:
      '**Каждый Proctor-Subductor и Subductor вооружён:** Arbites shotpistol; shock maul.\n\n**Cyber-mastiff вооружён:** mechanical bite.',
    options: ['Proctor-Subductor можно снабдить 1 nuncio aquila.'],
  },

  'vigilant-squad': {
    flavor:
      'Vigilant жестоко выметают виновных из бытия фирменным боевым дробовиком Adeptus Arbites. Эти мрачные Арбитраторы всегда начеку к злодеянию и непреклонны в его каре, обрушивая опустошительные залпы в упор.',
    abilities: {
      'Merciless Judgement':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по юниту, что ниже половинной численности, прибавьте 1 к броску ранения.',
    },
    wargearAbilities: { 'Nuncio Aquila (Aura)': NUNCIO },
    loadout:
      '**Каждый Proctor-Vigilant и Vigilant вооружён:** Arbites combat shotgun; Arbites shotpistol; close combat weapon.\n\n**Cyber-mastiff вооружён:** mechanical bite.',
    options: [
      'У до 2 Vigilant их Arbites combat shotgun можно заменить на одно из следующего (дубликаты не допускаются):\n▪ 1 executioner shotgun\n▪ 1 Arbites grenade launcher\n▪ 1 heavy stubber\n▪ 1 webber',
      'Proctor-Vigilant можно снабдить 1 nuncio aquila.',
    ],
  },

  'vindicare-assassin': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['ассасин-виндикар', 'виндикар'],
    flavor:
      'Приглушённый треск exitus rifle Vindicare Assassin — всё, что большинство когда-либо узнаёт о его присутствии. Это — и брызги мозга жертвы. Смертоносные стрелки, они находят идеальную огневую позицию, чтобы выцелить добычу, а против более многочисленных врагов быстро множат счёт тел выстрел за мастерским выстрелом.',
    abilities: {
      'Dead-shot':
        'Когда этот юнит выбирается для стрельбы и пока он не отстреляется: вражеские юниты не имеют способность [core:Lone Operative]; скрытые вражеские юниты получают +15" к радиусу обнаружения.',
      Shieldbreaker:
        'Один раз за битву, при выборе целей для exitus rifle этой модели, она может выстрелить зарядом-щитоломом (shieldbreaker round). Если она это делает, до конца фазы каждый раз, когда эта модель совершает атаку этим оружием, прибавьте 1 к броску ранения, и любой успешный бросок ранения приносит критическое ранение.',
    },
    loadout: `${EQUIP_THIS} exitus pistol; exitus rifle; Vindicare combat knife.`,
  },

  'voidsmen-at-arms': {
    flavor:
      'Voidsmen-at-Arms обеспечивают безопасность на кораблях многих вольных торговцев. Хорошо вымуштрованные и зачастую хорошо снаряжённые, они прекрасно умеют драться в коридорах судов и прочих стеснённых местах.',
    abilities: {
      'Masters of Close Confines':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по ближайшей допустимой цели, эта атака имеет способность [LETHAL HITS].',
    },
    loadout:
      '**Voidmaster вооружён:** artificer shotgun; laspistol; close combat weapon.\n\n**Один Voidsman вооружён:** laspistol; Voidsman rotor cannon; close combat weapon.\n\n**Каждый другой Voidsman вооружён:** lasgun; laspistol; close combat weapon.\n\n**Canid вооружён:** vicious bite.',
  },

  'watch-captain-artemis': {
    flavor:
      'Прирождённый выживальщик с дикого мира и бывший член мрачного Ордена Mortifactors, Артемис ведёт Watch Company Таласа-Прайм. Известный своим чутьём на уловки ксеносов, он всё ещё смакует перспективу насилия — будь то клинком, мутагенным кислотным огнём Hellfire Extremis или искажающей время стазис-гранатой.',
    abilities: {
      'Tactical Instinct':
        'Пока эта модель возглавляет юнит, оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'Unstoppable Champion':
        'Когда эта модель уничтожается впервые, бросьте один D6 в конце фазы. На 2+ снова поставьте эту модель на поле боя как можно ближе к месту, где она была уничтожена, и не в дистанции ввязывания каких-либо вражеских юнитов, с 1 оставшейся раной.',
    },
    loadout: `${EQUIP_THIS} Hellfire Extremis; master-crafted power weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'watch-master': {
    flavor:
      'Первейшие охотники на ксеносов в галактике, каждый Watch Master командует одной из бдительных крепостей Ордена. Эти вожди обладают веками стратегических и эзотерических знаний об ужасах, что осаждают человечество. В бою трещащие клинки и особые болты их vigil spear уничтожают любого ксеноса перед ними.',
    abilities: {
      'Strategic Knowledge':
        'Пока эта модель возглавляет юнит, этот юнит может стрелять и объявлять нападение в ход, в который он продвигался или отступал.',
      'Rites of Battle':
        'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда его юнит выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.',
    },
    loadout: `${EQUIP_THIS} vigil spear.`,
    leader: { text: LEADER_TEXT },
  },

  // Warhammer Legends, from the Faction Pack v1.1 (EN sheets carry source: 'faction-pack').
  daemonhost: {
    flavor:
      'Демонхосты — духи эмпиреев, обрядом заключённые в тело смертного. Некоторые служат подневольными прислужниками в свите инквизитора, обладая сонмом потусторонних способностей. Создать демонхоста — решение поистине смелое или безрассудное: вырвавшиеся на свободу духи с наслаждением мстят своим пленителям.',
    abilities: {
      'Malefic Warding': 'Пока модель INQUISITOR возглавляет юнит, включающий одну или более моделей DAEMONHOST, модели этого юнита имеют инвулевый спас-бросок 5+.',
      'Bound Daemon': 'Пока модель INQUISITOR возглавляет юнит, включающий одну или более моделей DAEMONHOST, характеристика Контроля целей (OC) моделей DAEMONHOST этого юнита равна 1.',
    },
    rules: {
      'INQUISITORIAL RETINUE':
        'Если фракция вашей армии не AGENTS OF THE IMPERIUM, то за каждую уникальную пару из 1 юнита INQUISITORIAL AGENTS и 1 юнита DAEMONHOST в вашей армии увеличьте максимальное число юнитов RETINUE, разрешённых в вашей армии, на 1.\n\nВ начале шага Declare Battle Formations этот юнит может присоединиться к одному юниту INQUISITORIAL AGENTS из вашей армии, который возглавляет модель INQUISITOR (к юниту не может быть присоединено больше одного юнита DAEMONHOST). Если он это делает, до конца битвы каждая модель этого юнита считается частью этого юнита-телохранителя, и его начальная численность соответственно увеличивается.',
    },
    loadout: `${EQUIP_EVERY} unholy gaze; Warp grasp.`,
  },

  'damned-legionnaires': {
    abilities: {
      'Grim Spectres': 'В вашей фазе стрельбы, после того как этот юнит отстрелялся, выберите один вражеский юнит, поражённый одной или более из этих атак. Этот вражеский юнит должен пройти проверку боевого шока, вычитая при этом 1 из результата.',
    },
    loadout: `${EQUIP_EVERY} boltgun; close combat weapon.`,
    options: [
      'boltgun у Legionnaire Sergeant можно заменить на одно из следующего:\n▪ 1 bolt pistol и 1 power weapon\n▪ 1 plasma pistol и 1 power weapon\n▪ 1 bolt pistol и 1 Astartes chainsword\n▪ 1 plasma pistol и 1 Astartes chainsword',
      'boltgun одного Legionnaire можно заменить на одно из следующего:\n▪ 1 heavy flamer\n▪ 1 multi-melta',
      'boltgun одного Legionnaire можно заменить на одно из следующего:\n▪ 1 flamer\n▪ 1 meltagun\n▪ 1 plasma gun',
    ],
  },

  'deathwatch-terminator-squad': {
    flavor:
      'Несокрушимые воины, удостоенные чести носить громоздкие доспехи Терминатора, вдохновляют своих братьев одним видом. Терминаторы Deathwatch несут мощнейшее оружие ближнего боя, а сила и прочность их брони позволяют им нести тяжелейший огонь прямо в скрытые логова ксеносов.',
    abilities: {
      'Terminatus Assault': 'Каждый раз, когда этот юнит завершает манёвр нападения, каждый вражеский юнит в дистанции ввязывания этого юнита должен пройти проверку боевого шока.',
      'Teleport Homer':
        'В начале битвы вы можете поставить один жетон Teleport Homer для этого юнита где угодно на поле боя вне зоны развёртывания вашего оппонента. Если вы это делаете, один раз за битву вы можете нацелить на этот юнит стратагему Rapid Ingress за 0 CP, но при отыгрыше этой стратагемы вы обязаны развернуть этот юнит в пределах 3" от этого жетона и не в пределах 8" от любых вражеских моделей. Затем этот жетон убирается.',
    },
    wargear: { 'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.' },
    rules: { 'ATTACHED UNIT': 'Если CHARACTER из вашей армии со способностью Leader может быть присоединён к DEATHWATCH KILL TEAM, он может быть присоединён к этому юниту вместо этого.' },
    loadout: `${EQUIP_EVERY} power fist; storm bolter.`,
    options: [
      'До 3 Deathwatch Terminators могут заменить свой storm bolter на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 cyclone missile launcher и 1 storm bolter (storm bolter этой модели заменить нельзя)',
      'Любое число моделей может заменить свои power fist и storm bolter на одно из следующего:\n▪ 1 storm bolter и 1 power weapon\n▪ 1 storm bolter и 1 chainfist\n▪ 1 twin lightning claws\n▪ 1 thunder hammer и 1 storm shield',
    ],
  },

  'fortis-kill-team': {
    flavor:
      'Доработанные после первоначального замысла магистра Дозора Морделая, Fortis Kill Teams — образец высшей приспособляемости варианта Tacticus силовой брони Mk X, бесшовно сочетающий разнообразные роли ближней поддержки и смертоносную огневую мощь.',
    abilities: {
      'Kill Team': 'Каждый раз, когда атака нацелена на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, для определения броска, необходимого для ранения, используйте характеристику Стойкости большинства моделей этого юнита. Если две или более характеристики Стойкости делят большинство, используйте наибольшее значение.\n\nДля определения того, какие модели этого юнита могут погрузиться в TRANSPORT, модели Kill Team Terminator, Kill Team Outrider, Kill Team Biker и модели с прыжковым ранцем занимают место 2 моделей каждая, но в остальном могут погружаться в любой TRANSPORT, в который может погрузиться их юнит, даже если похожие модели в других юнитах имеют ключевые слова TERMINATOR, MOUNTED или JUMP PACK.\n\nДля взаимодействия с элементами ландшафта все модели юнитов с этой способностью считаются моделями INFANTRY, даже если похожие модели в других юнитах могут иметь ключевые слова MOUNTED или JUMP PACK.\n\n**Примечание разработчика:** хотя абстракции этого правила заставляют некоторые модели вести себя иначе, чем похожие модели в других юнитах, они созданы, чтобы свести к минимуму сложные правила движения, транспорта и преимущества укрытия.',
      'Fortis Doctrines': 'Каждый раз, когда модель этого юнита совершает атаку по юниту ниже половинной численности, прибавьте 1 к броску попадания.',
    },
    rules: { 'ATTACHED UNIT': 'Если CHARACTER из вашей армии со способностью Leader может быть присоединён к DEATHWATCH KILL TEAM, он может быть присоединён к этому юниту вместо этого.', TRANSPORT: 'Этот юнит не может погружаться в IMPERIAL RHINO.' },
    loadout:
      '**Каждый Kill Team Intercessor вооружён:** bolt pistol; bolt rifle; close combat weapon.\n\n**Каждый Kill Team Intercessor с plasma incinerator вооружён:** bolt pistol; plasma incinerator; close combat weapon.\n\n**Каждый Kill Team Intercessor с heavy bolt pistol вооружён:** heavy bolt pistol; Astartes chainsword.\n\n**Каждый Kill Team Outrider вооружён:** bolt pistol; twin bolt rifle; Astartes chainsword.',
    options: [
      'bolt rifle 1 Kill Team Intercessor можно заменить на одно из следующего:\n▪ 1 hand flamer\n▪ 1 plasma pistol\n▪ 1 Astartes chainsword\n▪ 1 Long Vigil melee weapon',
      '1 модель, снаряжённая bolt rifle, может заменить свой close combat weapon на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 Long Vigil melee weapon',
      'За каждые 5 моделей в этом юните bolt rifle 1 модели можно заменить на 1 Long Vigil ranged weapon.',
      'Любое число Kill Team Intercessors с plasma incinerators может заменить свой bolt pistol на 1 plasma pistol.',
    ],
  },

  'indomitor-kill-team': {
    flavor:
      'Состоящие из воинов в более тяжёлом варианте Gravis брони Mk X, Indomitor Kill Teams — подвижные бастионы, способные обрушить огневую мощь эскадрона боевых танков. Перед ними равно рвутся на части и орды ксеносов, и чудовищные твари.',
    abilities: {
      'Kill Team': 'Каждый раз, когда атака нацелена на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, для определения броска, необходимого для ранения, используйте характеристику Стойкости большинства моделей этого юнита. Если две или более характеристики Стойкости делят большинство, используйте наибольшее значение.\n\nДля определения того, какие модели этого юнита могут погрузиться в TRANSPORT, модели Kill Team Terminator, Kill Team Outrider, Kill Team Biker и модели с прыжковым ранцем занимают место 2 моделей каждая, но в остальном могут погружаться в любой TRANSPORT, в который может погрузиться их юнит, даже если похожие модели в других юнитах имеют ключевые слова TERMINATOR, MOUNTED или JUMP PACK.\n\nДля взаимодействия с элементами ландшафта все модели юнитов с этой способностью считаются моделями INFANTRY, даже если похожие модели в других юнитах могут иметь ключевые слова MOUNTED или JUMP PACK.\n\n**Примечание разработчика:** хотя абстракции этого правила заставляют некоторые модели вести себя иначе, чем похожие модели в других юнитах, они созданы, чтобы свести к минимуму сложные правила движения, транспорта и преимущества укрытия.',
      'Indomitor Doctrines': 'Каждый раз, когда модель этого юнита совершает атаку, прибавьте 1 к броску попадания, если этот юнит ниже своей начальной численности, а также прибавьте 1 к броску ранения, если этот юнит ниже половинной численности.',
    },
    wargear: { 'Jump Pack': 'Носитель имеет характеристику Движения (Move) 10" и может двигаться сквозь модели и элементы ландшафта, как если бы их не было.' },
    rules: {
      'ATTACHED UNIT': 'Если юнит CHARACTER из вашей армии может быть присоединён к DEATHWATCH KILL TEAM, он может быть присоединён к этому юниту вместо этого.',
      TRANSPORT: 'Этот юнит не может погружаться в IMPERIAL RHINO.',
    },
    loadout:
      '**Каждый Kill Team Heavy Intercessor вооружён:** bolt pistol; heavy bolt rifle; close combat weapon.\n\n**Каждый Kill Team Heavy Intercessor с power fists вооружён:** flamestorm gauntlets; power fists.\n\n**Каждый Kill Team Heavy Intercessor с melta rifle вооружён:** bolt pistol; melta rifle; close combat weapon.\n\n**Каждый Kill Team Heavy Intercessor с jump pack вооружён:** assault bolters; close combat weapon; jump pack.',
    options: [
      'За каждые 5 моделей в этом юните 1 модель, снаряжённая heavy bolt rifle, может заменить свой heavy bolt rifle на 1 heavy bolter.',
      '1 модель, снаряжённая melta rifle, может заменить свой melta rifle на 1 multi-melta.',
      'Любое число моделей, снаряжённых flamestorm gauntlets, может заменить свои flamestorm gauntlets на 1 auto boltstorm gauntlets и 1 fragstorm grenade launcher.',
      'Любое число моделей, снаряжённых assault bolters, может заменить свои assault bolters на 1 plasma exterminators.',
    ],
  },

  'inquisitor-eisenhorn': {
    aliasesRu: ['Эйзенхорн', 'Айзенхорн'],
    flavor:
      'Инквизитор Эйзенхорн из Ордо Ксенос — человек огромной силы воли и решимости. Он пойдёт на всё, чтобы сохранить Империум, и за свои действия дважды объявлялся предателем — и оба раза был признан верным. Эйзенхорн ещё и могучий телепат, способный принудить отдельных людей и даже целые группы следовать его указаниям.',
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      'Malus Codicium': 'Пока эта модель возглавляет юнит, удвойте характеристику Атак (Attacks) оружия ближнего боя моделей DAEMONHOST этого юнита.',
      'Dominate Will (Psychic)':
        'В начале фазы стрельбы вашего оппонента выберите один вражеский юнит INFANTRY в пределах 12" от этой модели и видимый ей и бросьте один D6: на 1 эта модель получает D3 смертельных ран; на 2–5 до конца фазы каждый раз, когда модель этого юнита совершает атаку, вычтите 1 из броска попадания; на 6 до конца фазы этот юнит не имеет права стрелять.',
    },
    loadout: `${EQUIP_THIS} artificer bolt pistol; Mind Assault; runestaff and Barbarisater.`,
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-in-terminator-armour': {
    abilities: {
      'Authority of the Inquisition': AUTHORITY,
      'Power of the Rosette': 'Каждый раз, когда вы нацеливаете стратагему на юнит этой модели, бросьте один D6: на 3+ вы получаете 1 CP.',
    },
    wargear: {
      'Blessed Wardings': 'Пока носитель возглавляет юнит, модели этого юнита имеют инвулевый спас-бросок 6+.',
      'Psychic Gifts': 'Носитель имеет ключевое слово PSYKER.',
    },
    loadout: `${EQUIP_THIS} storm bolter; Inquisitorial melee weapon; blessed wardings.`,
    options: [
      'storm bolter этой модели можно заменить на 1 combi-weapon.',
      'blessed wardings этой модели можно заменить на 1 psychic gifts и 1 psychic shock wave.',
      'Если эта модель снаряжена 1 psychic gifts, её Inquisitorial melee weapon можно заменить на 1 force weapon.',
      'Если эта модель снаряжена 1 psychic gifts, её storm bolter можно заменить на 1 psycannon.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'inquisitor-karamazov': {
    aliasesRu: ['Карамазов'],
    flavor:
      'Инквизитор Карамазов — один из самых безжалостных и бескомпромиссных в Ордо Еретикус. В его действиях нет ни хитрости, ни уловок, и на милосердие у него нет времени. Карамазов водил огромные крестоносные армии и вершил суд над еретиками со своего Трона Правосудия — древнего двуногого боевого святилища.',
    abilities: {
      'Throne of Judgement (Aura)': 'Пока дружественный юнит находится в пределах 6" от этой модели, улучшите характеристику Лидерства (Leadership) моделей этого юнита на 1. Пока вражеский юнит находится в пределах 6" от этой модели, ухудшите характеристику Лидерства (Leadership) моделей этого юнита на 1.',
      'Unsubtle Crusader': 'В начале шага Declare Battle Formations вы можете выбрать до трёх юнитов AGENTS OF THE IMPERIUM INFANTRY из вашей армии или один юнит IMPERIUM BATTLELINE из вашей армии — эти юниты получают способность Scouts 6".',
    },
    loadout: `${EQUIP_THIS} master-crafted multi-melta; master-crafted power sword.`,
  },

  'inquisitor-ostromandeus': {
    aliasesRu: ['Остромандеус'],
    abilities: {
      'Authority of the Inquisition': 'Пока этот юнит возглавляет юнит, он может погружаться в любой TRANSPORT, в который может погружаться его юнит телохранителей (Bodyguard).',
      'Ward Against the Malefic Arts': 'Пока этот юнит возглавляет юнит, каждый раз, когда Psychic Attack нацелена на этот юнит, вычтите 1 из броска попадания и вычтите 1 из броска ранения.',
      'Vox-cast Proclamations (Aura)': 'Каждый раз, когда ваш оппонент нацеливает стратагему на юнит своей армии, если этот юнит в пределах 12" от модели Inquisitor Ostromandeus этого юнита, увеличьте стоимость этого применения этой стратагемы на 1 CP.',
    },
    wargear: {
      'Vox-skull':
        'Один раз за битву, в начале любой фазы, вы можете выбрать один вражеский юнит (исключая MONSTERS и VEHICLES) в пределах 12" от носителя. Этот юнит должен пройти проверку боевого шока; если проверка провалена, до конца вашего следующего хода этот юнит не может иметь Benefit of Cover.\n\n**Примечание разработчика:** положите рядом с юнитом жетон vox-skull, убрав его, когда эта способность задействована.',
    },
    loadout: '**Inquisitor Ostromandeus вооружён:** inferno pistol; power sword; vox-skull.\n\n**Stentor-I-52 вооружён:** hydraulic vox-ram.',
    leader: { text: 'Этот юнит можно присоединить к следующим юнитам:' },
  },

  'janus-draik': {
    aliasesRu: ['Янус Драйк'],
    abilities: { 'Backroom Deals': 'Если ваша армия содержит один или более юнитов с этой способностью, в шаге Declare Battle Formations выберите один из них. Пока выбранный юнит возглавляет юнит, модели этого юнита имеют способность Infiltrators.', 'Warrant of Trade': 'Если ваша армия включает один или более юнитов с этой способностью, после того как оба игрока развернули армии, выберите до D3 юнитов IMPERIUM BATTLELINE из вашей армии и передислоцируйте их. При этом вы можете выставить эти юниты в стратегических резервах независимо от того, сколько юнитов уже находится в стратегических резервах.' },
    loadout: `${EQUIP_THIS} heirloom pistol; monomolecular rapier.`,
    leader: { text: LEADER_TEXT },
  },

  'jokaero-weaponsmith': {
    flavor:
      'Эти ксеносы — техносаванты с инстинктивным пониманием механизмов и технологических систем. Имея достаточно времени и материалов, они способны смастерить почти что угодно и сделать грозным даже самое простое оружие с помощью небольших — хотя и озадачивающих — улучшений.',
    abilities: {
      'Inconceivable Augmentation': 'Пока эта модель возглавляет юнит, дальнобойное оружие моделей этого юнита имеет способность [LETHAL HITS].',
      'A Weaponsmith, Not a Warlord': 'Эту модель нельзя выбрать вашим WARLORD. Пока модель INQUISITOR возглавляет юнит, включающий одну или более моделей JOKAERO WEAPONSMITH, характеристика Контроля целей (OC) моделей JOKAERO WEAPONSMITH этого юнита равна 1.',
    },
    rules: {
      'INQUISITORIAL AGENT': 'Если фракция вашей армии не AGENTS OF THE IMPERIUM, то за каждую уникальную пару из 1 юнита INQUISITORIAL AGENTS и 1 юнита JOKAERO WEAPONSMITH в вашей армии увеличьте максимальное число юнитов CHARACTER, разрешённых в вашей армии, на 1.',
    },
    loadout: `${EQUIP_THIS} Jokaero weapons; close combat weapon.`,
    leader: {
      text: LEADER_TEXT,
      footer: 'Вы можете присоединить эту модель к юниту INQUISITORIAL AGENTS, даже если к нему уже присоединён один юнит INQUISITOR. Если так, и этот юнит-телохранитель уничтожается, присоединённые к нему юниты-лидеры становятся отдельными юнитами со своими исходными начальными численностями.',
    },
  },

  'kill-team-cassius': {
    flavor:
      'Kill Team Cassius — элитный отряд специалистов даже среди ветеранов Таласа Прайм. Отобранные лично капелланом Кассием для несанкционированной миссии, они вместе с ним раскрыли первый зафиксированный культ генокрадов на Госар Квинтус. С тех пор они сражались вместе много раз и не отступают ни перед каким ужасом ксеносов.',
    abilities: {
      'Kill Team': 'Каждый раз, когда атака нацелена на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, для определения броска, необходимого для ранения, используйте характеристику Стойкости большинства моделей этого юнита. Если две или более характеристики Стойкости делят большинство, используйте наибольшее значение.\n\nДля определения того, какие модели этого юнита могут погрузиться в TRANSPORT, модели Kill Team Terminator, Kill Team Outrider, Kill Team Biker и модели с прыжковым ранцем занимают место 2 моделей каждая, но в остальном могут погружаться в любой TRANSPORT, в который может погрузиться их юнит, даже если похожие модели в других юнитах имеют ключевые слова TERMINATOR, MOUNTED или JUMP PACK.\n\nДля взаимодействия с элементами ландшафта все модели юнитов с этой способностью считаются моделями INFANTRY, даже если похожие модели в других юнитах могут иметь ключевые слова MOUNTED или JUMP PACK.\n\n**Примечание разработчика:** хотя абстракции этого правила заставляют некоторые модели вести себя иначе, чем похожие модели в других юнитах, они созданы, чтобы свести к минимуму сложные правила движения, транспорта и преимущества укрытия.',
      'Catechism of Death': 'Пока этот юнит содержит Chaplain Cassius, оружие ближнего боя моделей этого юнита имеет способность [DEVASTATING WOUNDS].',
      Unflinching: 'Вы можете перебрасывать проверки боевого шока для этого юнита.',
    },
    wargear: {
      'Jump Pack': 'Носитель имеет характеристику Движения (Move) 12" и может двигаться сквозь модели и элементы ландшафта, как если бы их не было.',
      'Psychic Hood': 'Модели юнита носителя имеют способность Feel No Pain 4+ против Psychic Attacks.',
    },
    rules: { CASSIUS: 'Ваша армия не может содержать одновременно CHAPLAIN CASSIUS и KILL TEAM CASSIUS.' },
    loadout:
      '**Chaplain Cassius вооружён:** artificer crozius; bolt pistol.\n\n**Vael Donatus вооружён:** boltgun; bolt pistol; close combat weapon.\n\n**Zameon Gydrael вооружён:** Long Vigil ranged weapon; Long Vigil melee weapon.\n\n**Rodricus Grytt вооружён:** frag cannon; bolt pistol; close combat weapon.\n\n**Antor Delassio вооружён:** Long Vigil ranged weapon; Long Vigil melee weapon; jump pack.\n\n**Edryc Setorax вооружён:** twin lightning claws; jump pack.\n\n**Jensus Natorian вооружён:** Psychic Cleanse; bolt pistol; force weapon; psychic hood.\n\n**Drenn Redblade вооружён:** Long Vigil melee weapon; boltgun.\n\n**Garran Branatar вооружён:** heavy flamer; Long Vigil ranged weapon; power fist.\n\n**Ennox Sorrlock вооружён:** Long Vigil ranged weapon; close combat weapon.\n\n**Jetek Suberei вооружён:** Deathwatch twin boltgun; Long Vigil melee weapon.',
  },

  'neyam-shai-murad': {
    aliasesRu: ['Нейам Шай Мурад'],
    abilities: { 'Backroom Deals': 'Если ваша армия содержит один или более юнитов с этой способностью, в шаге Declare Battle Formations выберите один из них. Пока выбранный юнит возглавляет юнит, модели этого юнита имеют способность Infiltrators.', 'Warrant of Trade': 'Если ваша армия включает один или более юнитов с этой способностью, после того как оба игрока развернули армии, выберите до D3 юнитов IMPERIUM BATTLELINE из вашей армии и передислоцируйте их. При этом вы можете выставить эти юниты в стратегических резервах независимо от того, сколько юнитов уже находится в стратегических резервах.' },
    loadout: `${EQUIP_THIS} negotiator pistols; close combat weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'proteus-kill-team': {
    flavor:
      'Сама универсальность их вооружения в сочетании с живучестью и манёвренностью не оставляет удивления в том, что Proteus Kill Teams совершали чудеса воинского искусства на бесчисленных враждебных мирах на протяжении всей истории Империума.',
    abilities: {
      'Kill Team': 'Каждый раз, когда атака нацелена на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, для определения броска, необходимого для ранения, используйте характеристику Стойкости большинства моделей этого юнита. Если две или более характеристики Стойкости делят большинство, используйте наибольшее значение.\n\nДля определения того, какие модели этого юнита могут погрузиться в TRANSPORT, модели Kill Team Terminator, Kill Team Outrider, Kill Team Biker и модели с прыжковым ранцем занимают место 2 моделей каждая, но в остальном могут погружаться в любой TRANSPORT, в который может погрузиться их юнит, даже если похожие модели в других юнитах имеют ключевые слова TERMINATOR, MOUNTED или JUMP PACK.\n\nДля взаимодействия с элементами ландшафта все модели юнитов с этой способностью считаются моделями INFANTRY, даже если похожие модели в других юнитах могут иметь ключевые слова MOUNTED или JUMP PACK.\n\n**Примечание разработчика:** хотя абстракции этого правила заставляют некоторые модели вести себя иначе, чем похожие модели в других юнитах, они созданы, чтобы свести к минимуму сложные правила движения, транспорта и преимущества укрытия.',
      'Proteus Doctrines': 'Каждый раз, когда модель этого юнита совершает атаку по юниту, который не ниже половинной численности, прибавьте 1 к броску попадания.',
    },
    wargear: { 'Astartes Shield': INV4, 'Jump Pack': 'Носитель имеет характеристику Движения (Move) 12" и может двигаться сквозь модели и элементы ландшафта, как если бы их не было.', 'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.' },
    rules: { 'ATTACHED UNIT': 'Если CHARACTER из вашей армии со способностью Leader может быть присоединён к DEATHWATCH KILL TEAM, он может быть присоединён к этому юниту вместо этого.' },
    loadout:
      '**Каждый Kill Team Veteran вооружён:** boltgun; Long Vigil melee weapon; close combat weapon.\n\n**Каждый Kill Team Veteran с Jump Pack вооружён:** Long Vigil melee weapon; close combat weapon; jump pack.\n\n**Каждый Kill Team Biker вооружён:** twin boltgun; close combat weapon.\n\n**Каждый Kill Team Terminator вооружён:** storm bolter; power fist.',
    options: [
      'Любое число Kill Team Veterans может заменить свои boltgun и Long Vigil melee weapon на:\n▪ 1 Long Vigil ranged weapon\n▪ 1 boltgun и 1 Astartes shield\n▪ 1 Long Vigil melee weapon и 1 Astartes shield',
      'За каждые 5 моделей в этом юните до 2 моделей могут заменить свои boltgun и Long Vigil melee weapon на 1 Deathwatch thunder hammer.',
      'За каждые 5 моделей в юните до 2 моделей могут заменить свои boltgun и Long Vigil melee weapon на одно из следующего:\n▪ 1 frag cannon\n▪ 1 Infernus heavy bolter',
      'Любое число моделей Kill Team Biker можно снарядить одним из следующего:\n▪ 1 bolt pistol\n▪ 1 Long Vigil melee weapon',
      'До 3 моделей могут заменить свой storm bolter на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 cyclone missile launcher и 1 storm bolter (storm bolter этой модели заменить нельзя)',
      'Любое число моделей Kill Team Terminator может заменить свои power fist и storm bolter на одно из следующего:\n▪ 1 storm bolter и 1 power weapon\n▪ 1 storm bolter и 1 chainfist\n▪ 1 twin lightning claws\n▪ 1 Terminator thunder hammer и 1 storm shield',
    ],
  },

  'spectrus-kill-team': {
    flavor:
      'Зловещие, безмолвные и почти невидимые, пока не нанесут удар, Spectrus Kill Teams искусны нести смерть и вблизи, и издалека. Облачённые в облегающую броню Mk X Phobos, они специализируются на контроле поля боя и дестабилизации врага.',
    abilities: {
      'Kill Team': 'Каждый раз, когда атака нацелена на этот юнит, если он содержит модели с разными характеристиками Стойкости (Toughness), до тех пор пока атакующий юнит не завершит свои атаки, для определения броска, необходимого для ранения, используйте характеристику Стойкости большинства моделей этого юнита. Если две или более характеристики Стойкости делят большинство, используйте наибольшее значение.\n\nДля определения того, какие модели этого юнита могут погрузиться в TRANSPORT, модели Kill Team Terminator, Kill Team Outrider, Kill Team Biker и модели с прыжковым ранцем занимают место 2 моделей каждая, но в остальном могут погружаться в любой TRANSPORT, в который может погрузиться их юнит, даже если похожие модели в других юнитах имеют ключевые слова TERMINATOR, MOUNTED или JUMP PACK.\n\nДля взаимодействия с элементами ландшафта все модели юнитов с этой способностью считаются моделями INFANTRY, даже если похожие модели в других юнитах могут иметь ключевые слова MOUNTED или JUMP PACK.\n\n**Примечание разработчика:** хотя абстракции этого правила заставляют некоторые модели вести себя иначе, чем похожие модели в других юнитах, они созданы, чтобы свести к минимуму сложные правила движения, транспорта и преимущества укрытия.',
      'Spectrus Doctrines': 'В конце хода вашего оппонента, если этот юнит дальше 6" от всех вражеских юнитов, вы можете убрать его с поля боя и поместить в стратегические резервы.',
    },
    wargear: {
      'Helix Gauntlet': 'Модели юнита носителя имеют способность Feel No Pain 6+.',
      'Infiltrator Comms Array': 'Каждый раз, когда вы нацеливаете стратагему на юнит носителя, бросьте один D6: на 5+ вы получаете 1 CP.',
      'Jump Pack': 'Носитель имеет характеристику Движения (Move) 12" и может двигаться сквозь модели и элементы ландшафта, как если бы их не было.',
    },
    rules: { 'ATTACHED UNIT': 'Если CHARACTER из вашей армии со способностью Leader может быть присоединён к DEATHWATCH KILL TEAM, он может быть присоединён к этому юниту вместо этого.', TRANSPORT: 'Этот юнит не может погружаться в IMPERIAL RHINO.' },
    loadout:
      '**Каждый Kill Team Infiltrator вооружён:** bolt pistol; marksman bolt carbine; close combat weapon.\n\n**Каждый Kill Team Infiltrator с bolt sniper rifle вооружён:** bolt pistol; bolt sniper rifle; close combat weapon.\n\n**Каждый Kill Team Infiltrator с jump pack вооружён:** bolt pistol; accelerator autocannon; close combat weapon; jump pack.\n\n**Каждый Kill Team Infiltrator с occulus bolt carbine вооружён:** bolt pistol; occulus bolt carbine; paired combat blades.\n\n**Каждый Kill Team Infiltrator с combat knife вооружён:** special-issue bolt pistol; combat knife.',
    options: [
      'Одну модель, снаряжённую marksman bolt carbine, можно снарядить 1 helix gauntlet.*',
      'Одну модель, снаряжённую marksman bolt carbine, можно снарядить 1 Infiltrator comms array.*\n* Эти опции нельзя брать на одну и ту же модель.',
      'Одна модель может заменить свой bolt sniper rifle на 1 bolt carbine.',
      'Любое число моделей может заменить свой bolt sniper rifle на 1 las fusil.',
      'Любое число моделей может заменить свой combat knife на 1 bolt carbine и 1 close combat weapon.',
    ],
  },

  'ur-025': {
    // Search-only aliases: they affect Ctrl+K only, never shown as the unit's name.
    aliasesRu: ['УР-025'],
    abilities: {
      'Self Repair': 'В начале вашей фазы командования эта модель восстанавливает 1 потерянную рану.',
      'Evade and Survive': 'В фазе движения вашего оппонента, когда вражеский юнит завершает обычный манёвр, продвижение или отступление в пределах 8" от этой модели, если эта модель не находится в дистанции ввязывания одного или более вражеских юнитов, она может совершить обычный манёвр.',
    },
    loadout: `${EQUIP_THIS} Mk 1 assault weapon; power claw.`,
  },

  'veteran-bike-squad': {
    flavor:
      'Противопоставляя свою скорость, силу и огневую мощь быстрейшим из ксеносов, байкеры-ветераны — искусные охотники. В долгих миссиях на опасной территории они оценивают каждую слабость врага, отрезают пути отхода и используют скорость для внезапных ударов с неожиданных углов.',
    abilities: {
      'Turbo-boost': 'Каждый раз, когда этот юнит продвигается, не делайте для него бросок продвижения. Вместо этого до конца фазы прибавьте 6" к характеристике Движения (Move) моделей этого юнита.',
    },
    wargear: { 'Astartes Shield': INV4 },
    loadout: `${EQUIP_EVERY} bolt pistol; close combat weapon; twin boltgun.`,
    options: [
      'Veteran Biker Sergeant можно снарядить одним из следующего:\n▪ 1 Long Vigil ranged weapon\n▪ 1 Long Vigil melee weapon\n▪ 1 xenophase blade\n▪ 1 Astartes shield',
      'Любое число моделей Veteran Biker можно снарядить 1 Long Vigil melee weapon.',
    ],
  },
}

// RU-подписи под английскими названиями способностей (сабтайтл в карточке).
export const abilityNamesRu = {
  'Death to the Alien': 'Смерть чужаку',
  'Kill Team': 'Истребительная команда',
  'Astartes Shield': 'Щит астартес',
  'ATTACHED UNIT': 'Присоединяемый юнит',
  'Acrobatic Escape': 'Акробатический уход',
  'Reign of Confusion': 'Владычество смятения',
  'Blackstar Cluster Launcher': 'Кассетный пусковой «Блэкстар»',
  'Auspex Array': 'Массив ауспексов',
  'Infernum Halo-launcher': 'Гало-пусковой «Инфернум»',
  'Etheric Emergence': 'Эфирное явление',
  Abomination: 'Мерзость',
  'Soulless Horror': 'Бездушный ужас',
  Frenzon: 'Френзон',
  Overkill: 'Сверхубийство',
  'Imperial Law': 'Имперский закон',
  'Arbites Medi-kit': 'Аптечка арбитрес',
  'Nuncio Aquila': 'Нунцио-аквила',
  'Nuncio Aquila (Aura)': 'Нунцио-аквила (Аура)',
  'Soulguilt Scanner': 'Сканер вины души',
  'Hammerhand (Psychic)': 'Молоторукость (Психика)',
  'Ancient’s Banner': 'Штандарт Ancient',
  Narthecium: 'Нартециум',
  'Breaching Team': 'Абордажная команда',
  Gheistskull: 'Гайст-череп',
  'CAT Unit': 'Блок CAT',
  'Endurant Shield': 'Щит стойкости',
  'Self Repair': 'Самопочинка',
  'Authority of the Inquisition': 'Власть Инквизиции',
  'Power of the Rosette': 'Сила розетты',
  'Blessed Wardings': 'Благословенные обереги',
  'Psychic Gifts': 'Псионические дары',
  'Malefic Wardings (Psychic)': 'Обереги от скверны (Психика)',
  'Spy Network': 'Сеть шпионов',
  'Glovodan Psyber-eagle': 'Гловоданский псайбер-орёл',
  'Xenos Hunter': 'Охотница на ксеносов',
  'Psychic Veil (Psychic)': 'Псионическая вуаль (Психика)',
  Psyoculum: 'Псиокулум',
  'No Mercy': 'Без пощады',
  'On My Signal, Fire!': 'Огонь по моему сигналу!',
  'Tox-cycler': 'Токс-циклер',
  'Loyal Henchmen': 'Верные приспешники',
  'Tome-skull': 'Том-череп',
  'Rapid Deployment': 'Быстрое развёртывание',
  'Holy Hatred': 'Святая ненависть',
  Zealot: 'Фанатик',
  'Gaze into the Empyrean (Psychic)': 'Взор в Эмпиреи (Психика)',
  'Third Eye (Psychic)': 'Третий глаз (Психика)',
  'Backroom Deals': 'Закулисные сделки',
  'Warrant of Trade': 'Торговый патент',
  'Healing Serum': 'Целебная сыворотка',
  'Ministorum Sermon': 'Проповедь Министорума',
  Cherub: 'Херувим',
  'Salvationist Medikit': 'Аптечка Salvationist',
  'Simulacrum Imperialis': 'Симулякрум Империалис',
  'Simulacrum Imperials': 'Симулякрум Империалис',
  'Defenders of the Faith': 'Защитники веры',
  'Incensor Cherub': 'Херувим-кадильщик',
  'Purge and Cleanse': 'Очисти и выжги',
  'Dedication to Duty': 'Преданность долгу',
  'Merciless Judgement': 'Беспощадный приговор',
  'Dead-shot': 'Без промаха',
  Shieldbreaker: 'Щитолом',
  'Masters of Close Confines': 'Мастера тесных отсеков',
  'Tactical Instinct': 'Тактический инстинкт',
  'Unstoppable Champion': 'Неудержимый чемпион',
  'Strategic Knowledge': 'Стратегическое знание',
  'Rites of Battle': 'Ритуалы битвы',
  // Legends (Faction Pack)
  'Malefic Warding': 'Малефическая защита',
  'Bound Daemon': 'Связанный демон',
  'Grim Spectres': 'Мрачные призраки',
  'Terminatus Assault': 'Штурм Терминатус',
  'Teleport Homer': 'Телепортационный маяк',
  'Storm Shield': 'Штормовой щит',
  'Fortis Doctrines': 'Доктрины Fortis',
  'Indomitor Doctrines': 'Доктрины Indomitor',
  'Jump Pack': 'Прыжковый ранец',
  'Malus Codicium': 'Малус Кодициум',
  'Dominate Will (Psychic)': 'Подчинить волю (Psychic)',
  'Throne of Judgement (Aura)': 'Трон Правосудия (Аура)',
  'Unsubtle Crusader': 'Прямолинейный крестоносец',
  'Ward Against the Malefic Arts': 'Защита от малефических искусств',
  'Vox-cast Proclamations (Aura)': 'Вокс-воззвания (Аура)',
  'Vox-skull': 'Вокс-череп',
  'Inconceivable Augmentation': 'Немыслимое усовершенствование',
  'A Weaponsmith, Not a Warlord': 'Оружейник, а не полководец',
  'Catechism of Death': 'Катехизис смерти',
  Unflinching: 'Непоколебимые',
  'Psychic Hood': 'Псионический капюшон',
  'Proteus Doctrines': 'Доктрины Proteus',
  'Spectrus Doctrines': 'Доктрины Spectrus',
  'Helix Gauntlet': 'Перчатка-геликс',
  'Infiltrator Comms Array': 'Антенна связи инфильтратора',
  'Evade and Survive': 'Уклониться и выжить',
  'Turbo-boost': 'Турбоускорение',
}
