// Deathwatch — русский перевод листов данных. Делят 79 листов с генерик-Space Marines
// (тот же id и EN-текст) — переиспользуются из ./space-marines.js. Здесь переведены только
// 10 листов, уникальных для Deathwatch (kill teams, терминаторы, ветераны, герои).
// Конвенции те же (см. ./index.js); composition (с «OR» / «10 MODELS MAXIMUM») наследуется
// от EN, как и у прочих фракций.
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'apothecary',
  'apothecary-biologis', 'assault-intercessor-squad', 'assault-intercessors-with-jump-packs',
  'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient', 'bladeguard-veteran-squad',
  'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour', 'captain-in-phobos-armour',
  'captain-in-terminator-armour', 'captain-with-jump-pack', 'centurion-assault-squad',
  'centurion-devastator-squad', 'chaplain', 'chaplain-in-terminator-armour', 'chaplain-on-bike',
  'chaplain-with-jump-pack', 'company-heroes', 'desolation-squad', 'dreadnought', 'drop-pod',
  'eliminator-squad', 'eradicator-squad', 'eradicator-squad-with-heavy-bolters',
  'firestrike-servo-turrets', 'gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant',
  'hammerfall-bunker', 'heavy-intercessor-squad', 'hellblaster-squad', 'impulsor',
  'inceptor-squad', 'incursor-squad', 'infernus-squad', 'infiltrator-squad', 'intercessor-squad',
  'invader-atv', 'invictor-tactical-warsuit', 'judiciar', 'land-raider', 'land-raider-crusader',
  'land-raider-redeemer', 'land-speeder', 'librarian', 'librarian-in-phobos-armour',
  'librarian-in-terminator-armour', 'lieutenant', 'lieutenant-in-phobos-armour',
  'lieutenant-in-reiver-armour', 'lieutenant-with-combi-weapon', 'outrider-squad',
  'predator-annihilator', 'predator-destructor', 'razorback', 'redemptor-dreadnought',
  'reiver-squad', 'repulsor', 'repulsor-executioner', 'rhino', 'sternguard-veteran-squad',
  'storm-speeder-hailstrike', 'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike',
  'stormhawk-interceptor', 'stormraven-gunship', 'stormtalon-gunship', 'suppressor-squad',
  'techmarine', 'thunderhawk-gunship', 'vanguard-veteran-squad-with-jump-packs', 'vindicator',
  'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const INV4 = 'Носитель имеет инвулевый спас-бросок 4+.'
const CP_REDUCE =
  'Один раз за раунд боя один юнит вашей армии с этой способностью может задействовать её, когда его юнит выбирается целью стратагемы. Если он это делает, уменьшите стоимость этого применения этой стратагемы на 1 CP.'
const DEATH_TO_ALIEN =
  'Каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1. Если цель этой атаки не имеет ключевых слов IMPERIUM или CHAOS, вы можете вместо этого перебросить бросок попадания.'
const dmgHitMinus = (range) =>
  `Пока у этой модели осталось ${range} ран, каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.`

export default {
  ...Object.fromEntries(SHARED.map((id) => [id, smRu[id]])),

  'corvus-blackstar': {
    flavor:
      'Corvus Blackstar — обтекаемые, скрытные летательные аппараты, что используются для высадки kill team в кишащие врагом зоны или даже в цитадели ксеносов. Залпом ракет Blackstar добывают господство в воздухе и зачищают целевую точку, прежде чем включить парящие двигатели и доставить свой смертоносный груз элитных воинов.',
    abilities: {
      'Blackstar Cluster Launcher':
        'Каждый раз, когда эта модель завершает обычный манёвр, вы можете выбрать один вражеский юнит, над которым она прошла в этом манёвре, и бросить шесть D6: за каждый 5+ этот юнит получает 1 смертельную рану.',
    },
    wargear: {
      'Auspex Array':
        'Дальнобойное оружие носителя имеет способность [IGNORES COVER].',
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
    transport:
      'Эта модель имеет транспортную вместимость 12 моделей Adeptus Astartes Infantry или Kill Team. Каждая модель Jump Pack, Gravis или Terminator занимает место 2 моделей, а каждая модель Centurion — место 3 моделей.',
  },

  'deathwatch-terminator-squad': {
    flavor:
      'Несокрушимые воины, удостоенные носить громоздкую броню Terminator, — вдохновляющее зрелище для братьев. Deathwatch Terminator несут мощнейшее оружие ближнего боя, а сила и прочность их брони позволяет им вносить тяжелейший огонь прямо в скрытые логова ксеносов.',
    abilities: {
      'Terminatus Assault':
        'Вы можете перебрасывать броски нападения для этого юнита. Каждый раз, когда этот юнит завершает манёвр нападения, каждый вражеский юнит в дистанции ввязывания этого юнита обязан пройти проверку боевого шока. Если этот вражеский юнит не имеет ключевых слов IMPERIUM или CHAOS, вычтите 1 из этой проверки.',
      'Teleport Homer':
        'В начале битвы вы можете поставить один жетон Teleport Homer для этого юнита где угодно на поле боя вне зоны развёртывания вашего оппонента. Если вы это делаете, один раз за битву вы можете нацелить на этот юнит стратагему Rapid Ingress за 0 CP, но при отыгрыше этой стратагемы вы обязаны развернуть этот юнит в пределах 3" от этого жетона и не в пределах 9" по горизонтали от одного или более вражеских юнитов. Затем этот жетон убирается.',
    },
    wargear: {
      'Storm Shield': 'Носитель имеет характеристику Ран (Wounds) 4.',
    },
    loadout: `**Каждая модель вооружена:** power fist; storm bolter.`,
    options: [
      'До 3 Deathwatch Terminator их storm bolter можно заменить на одно из следующего:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 cyclone missile launcher и 1 storm bolter (storm bolter этой модели заменить нельзя)',
      'Любому числу моделей их power fist и storm bolter можно заменить на одно из следующего:\n▪ 1 storm bolter и 1 power weapon\n▪ 1 storm bolter и 1 chainfist\n▪ 1 thunder hammer и 1 storm shield\n▪ 1 twin lightning claws',
    ],
  },

  'deathwatch-veterans': {
    flavor:
      'Навыки Deathwatch Veteran оттачивались в их прежнем Ордене десятилетиями, порой веками. За долгую вахту против многоликих угроз ксеносов каждый ветеран учится вооружаться так, чтобы наилучшим образом послужить текущей миссии, и отряды несут набор оружия, способного повергнуть любого врага.',
    abilities: {
      'Death to the Alien': DEATH_TO_ALIEN,
    },
    wargear: {
      'Astartes Shield': INV4,
    },
    loadout: `**Каждая модель вооружена:** boltgun; power weapon.`,
    options: [
      'За каждые 5 моделей в этом юните у до 2 моделей их boltgun и power weapon можно заменить на одно из следующего:\n▪ 1 boltgun, 1 Astartes shield и 1 close combat weapon\n▪ 1 power weapon и 1 Astartes shield',
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

  'decimus-kill-team': {
    flavor:
      'Decimus Kill Team обеспечивает соразмерный угрозе ответ любой инопланетной опасности на уровне отряда. Каждый воин этого отборного отряда обладает собственной специализацией и набором мощного вооружения, что делает их погибелью не только для ксеносов, но и для любого врага, которому не повезло встать у них на пути.',
    abilities: {
      'Death to the Alien': DEATH_TO_ALIEN,
    },
    wargear: {
      'Astartes Shield': INV4,
    },
    loadout:
      '**Kill Team Sergeant вооружён:** plasma pistol; power weapon.\n\n**Каждый Gravis Veteran вооружён:** infernus heavy bolter; bolt pistol; close combat weapon.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** stalker bolt rifle; bolt pistol; close combat weapon.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** bolt pistol; heavy thunder hammer.\n\n**За каждые 5 моделей в юните 1 Deathwatch Veteran вооружён:** Deathwatch marksman bolt carbine; special-issue bolt pistol; close combat weapon.\n\n**Если юнит содержит 10 моделей, 1 Deathwatch Veteran вооружён:** special-issue bolt pistol; xenophase blade.',
    options: [
      'За каждые 5 моделей в юните у до 1 модели её infernus heavy bolter можно заменить на одно из следующего:\n▪ 1 frag cannon\n▪ 1 hellstorm bolt rifle и 1 Astartes grenade launcher',
      'За каждые 5 моделей в юните у до 1 модели её heavy thunder hammer можно заменить на 1 power weapon и 1 Astartes shield.',
      'За каждые 5 моделей в юните у до 1 модели её stalker bolt rifle можно заменить на 1 plasma incinerator.',
      'За каждые 5 моделей в юните у до 1 модели её Deathwatch marksman bolt carbine можно заменить на 1 combat knife.',
    ],
  },

  'fortis-kill-team': {
    flavor:
      'Ещё более отточенные из первоначального замысла Watch Master Морделая, Fortis Kill Team являют высшую приспособляемость варианта Tacticus брони Mk X, безупречно сочетая целый ряд ролей ближней поддержки со смертоносной огневой мощью.',
    abilities: {
      'Fortis Doctrines':
        'Каждый раз, когда модель этого юнита совершает атаку по юниту, что ниже своей начальной численности, прибавьте 1 к броску попадания. Если эта атака нацелена на юнит, что ниже половинной численности, вместо этого прибавьте 1 к броску попадания и 1 к броску ранения.',
    },
    loadout:
      '**Kill Team Sergeant и каждый Kill Team Intercessor вооружены:** bolt pistol; Deathwatch bolt rifle; close combat weapon.\n\n**Каждый Kill Team Intercessor with plasma incinerator вооружён:** bolt pistol; plasma incinerator; close combat weapon.\n\n**Каждый Kill Team Intercessor with heavy bolt pistol вооружён:** heavy bolt pistol; Astartes chainsword.\n\n**Каждый Kill Team Intercessor with pyreblaster вооружён:** bolt pistol; pyreblaster; close combat weapon.\n\n**Каждый Kill Team Intercessor with superfrag rocket launcher вооружён:** bolt pistol; castellan launcher; superfrag rocket launcher; close combat weapon.',
    options: [
      'Kill Team Sergeant может заменить свой Deathwatch bolt rifle на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 hand flamer\n▪ 1 plasma pistol\n▪ 1 power weapon',
      'Kill Team Sergeant может заменить свой close combat weapon на одно из следующего:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer',
      'За каждые 5 моделей в этом юните 1 модель, вооружённую Deathwatch bolt rifle, можно снабдить 1 Astartes grenade launcher.',
      'Одна модель, вооружённая plasma incinerator, может заменить свой bolt pistol на 1 plasma pistol.',
      '1 модель может заменить свой superfrag rocket launcher на 1 vengor launcher.',
      'Любому числу моделей их superfrag rocket launcher можно заменить на 1 superkrak rocket launcher.',
    ],
  },

  'indomitor-kill-team': {
    flavor:
      'Составленные из воинов в более тяжёлом варианте Gravis брони Mk X, Indomitor Kill Team — подвижные бастионы, способные обрушить огневую мощь эскадрона боевых танков. Перед ними разрываются на части и полчища ксеносов, и чудовищные твари.',
    abilities: {
      'Indomitor Doctrines':
        'Каждый раз, когда модель этого юнита совершает дальнобойную атаку по ближайшей допустимой цели или совершает атаку ближнего боя в ход, в который она совершила манёвр нападения, улучшите характеристику Силы (Strength) этой атаки на 2.',
    },
    special: {
      'ATTACHED UNIT':
        'Если юнит Character из вашей армии можно присоединить к Heavy Intercessor Squad, его можно вместо этого присоединить к этому юниту.',
    },
    loadout:
      '**Каждый Kill Team Heavy Intercessor вооружён:** bolt pistol; Deathwatch heavy bolt rifle; close combat weapon.\n\n**Каждый Kill Team Heavy Intercessor with power fists вооружён:** flamestorm gauntlets; twin power fists.\n\n**Каждый Kill Team Heavy Intercessor with melta rifle вооружён:** bolt pistol; melta rifle; close combat weapon.',
    options: [
      'За каждые 5 моделей в этом юните 1 модель может заменить свой Deathwatch heavy bolt rifle на 1 Deathwatch heavy bolter.',
      '1 модель может заменить свой melta rifle на 1 multi-melta.',
      'Любому числу моделей их flamestorm gauntlets можно заменить на 1 auto boltstorm gauntlets и 1 fragstorm grenade launcher.',
    ],
  },

  'spectrus-kill-team': {
    flavor:
      'Зловещие, безмолвные и почти невидимые до удара, Spectrus Kill Team искусны в том, чтобы нести смерть и вблизи, и издали. Облачённые в облегающую броню Mk X Phobos, они специализируются на контроле поля боя и дестабилизации врага.',
    abilities: {
      'Spectrus Doctrines':
        'В конце хода вашего оппонента, если этот юнит находится дальше 6" от всех вражеских юнитов, вы можете убрать его с поля боя и поместить в Strategic Reserves.',
    },
    wargear: {
      'Helix Gauntlet': 'Модели юнита носителя имеют способность Feel No Pain 6+.',
      'Infiltrator Comms Array':
        'Каждый раз, когда вы нацеливаете стратагему на юнит носителя, бросьте один D6: на 5+ вы получаете 1 CP.',
      'Instigator Bolt Carbine':
        'В вашей фазе стрельбы, после того как юнит носителя отстрелялся, юнит носителя может совершить обычный манёвр. Если он это делает, до конца хода юнит носителя не может объявить нападение.',
    },
    loadout:
      '**Каждый Kill Team Infiltrator вооружён:** bolt pistol; Deathwatch marksman bolt carbine; close combat weapon.\n\n**Каждый Kill Team Infiltrator with bolt sniper rifle вооружён:** bolt pistol; bolt sniper rifle; close combat weapon.\n\n**Каждый Kill Team Infiltrator with Deathwatch occulus bolt carbine вооружён:** bolt pistol; Deathwatch occulus bolt carbine; paired combat blades.\n\n**Каждый Kill Team Infiltrator with combat knife вооружён:** special-issue bolt pistol; combat knife.',
    options: [
      'Одну модель, вооружённую Deathwatch marksman bolt carbine, можно снабдить одним из следующего:\n▪ 1 helix gauntlet\n▪ 1 Infiltrator comms array',
      'Одна модель может заменить свой bolt sniper rifle на 1 instigator bolt carbine.',
      'Любому числу моделей их bolt sniper rifle можно заменить на 1 las fusil.',
      'Любому числу моделей их combat knife можно заменить на 1 Deathwatch bolt carbine и 1 close combat weapon.',
    ],
  },

  'talonstrike-kill-team': {
    flavor:
      'Ныряя с ганшипов или продвигаясь силовыми прыжками через зону боевых действий, братья Talonstrike Kill Team сокрушают добычу в ошеломляюще внезапных штурмах. Они атакуют воющими chainsword и залпами тяжёлого огня в упор. Рёв их jump pack следует за каждым стремительным убийством, пока они настигают следующую цель.',
    abilities: {
      'Talonstrike Doctrines':
        'Каждый раз, когда этот юнит развёртывается на поле боя, до конца хода:\n▪ Улучшите характеристику Пробития брони (Armour Penetration) оружия моделей этого юнита на 1.\n▪ Оружие ближнего боя моделей этого юнита имеет способность [LANCE].',
    },
    special: {
      'ATTACHED UNIT':
        'Если юнит Character из вашей армии со способностью Leader можно присоединить к Assault Intercessors with Jump Packs, его можно вместо этого присоединить к этому юниту.',
    },
    loadout:
      '**Kill Team Sergeant with Jump Pack вооружён:** heavy bolt pistol; Astartes chainsword.\n\n**Каждый Kill Team Intercessor with Jump Pack вооружён:** heavy bolt pistol; Astartes chainsword.\n\n**Каждый Kill Team Heavy Intercessor with Jump Pack вооружён:** assault bolters; close combat weapon.',
    options: [
      'Kill Team Sergeant with Jump Pack может заменить свой heavy bolt pistol на одно из следующего:\n▪ 1 hand flamer\n▪ 1 plasma pistol',
      'Kill Team Sergeant with Jump Pack может заменить свой Astartes chainsword на одно из следующего:\n▪ 1 power fist\n▪ 1 power weapon',
      'За каждые 5 моделей в этом юните 1 модель может заменить свой heavy bolt pistol на 1 plasma pistol.',
      'Любому числу моделей их assault bolters можно заменить на 1 plasma exterminators.',
    ],
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
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  'watch-master': {
    flavor:
      'Первейшие охотники на ксеносов в галактике, каждый Watch Master командует одной из бдительных крепостей Ордена. Эти вожди обладают веками стратегических и эзотерических знаний об ужасах, что осаждают человечество. В бою трещащие клинки и особые болты их vigil spear уничтожают любого ксеноса перед ними.',
    abilities: {
      'Strategic Knowledge':
        'Пока эта модель возглавляет юнит, этот юнит может стрелять и объявлять нападение в ход, в который он продвигался или отступал.',
      'Rites of Battle': CP_REDUCE,
    },
    loadout: `${EQUIP_THIS} vigil spear.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },
}

export const abilityNamesRu = {
  ...smNames,
  'Blackstar Cluster Launcher': 'Кассетный пусковой «Блэкстар»',
  'Auspex Array': 'Массив ауспексов',
  'Infernum Halo-launcher': 'Гало-пусковой «Инфернум»',
  'Death to the Alien': 'Смерть чужаку',
  'Astartes Shield': 'Щит астартес',
  'Fortis Doctrines': 'Доктрины «Фортис»',
  'Indomitor Doctrines': 'Доктрины «Индомитор»',
  'Spectrus Doctrines': 'Доктрины «Спектрус»',
  'Instigator Bolt Carbine': 'Instigator bolt carbine',
  'Talonstrike Doctrines': 'Доктрины «Талонстрайк»',
  'Tactical Instinct': 'Тактический инстинкт',
  'Unstoppable Champion': 'Неудержимый чемпион',
  'Strategic Knowledge': 'Стратегическое знание',
}
