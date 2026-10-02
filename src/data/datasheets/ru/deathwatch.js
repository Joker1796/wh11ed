// Deathwatch — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
// Пересобран под Codex: Space Marines и его дополнения (app data 963). Здесь переведены только
// собственные листы Ордена; листы Codex: Space Marines, которые Орден берёт по id (`sharedUnitIds`
// EN-файла), переводятся один раз в ./space-marines.js и приходят через SHARED ниже.
// ▪ Способности ключуются по АНГЛИЙСКОМУ названию: переименованная GW способность требует нового
//   ключа, иначе её текст молча остаётся английским (`npm run parity` это ловит).
// ▪ Строки вооружения (loadout/options) переведены рамочно: «**Эта модель вооружена:** …», имена
//   предметов остаются английскими.
// ▪ Листы Legends из Faction Pack’а (source: 'faction-pack') бамп 963 не затронул — их RU прежний.
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

// Codex: Space Marines sheets folded into this Chapter by id — the EN file's `sharedUnitIds`
// (generated). Their RU lives once in ./space-marines.js; the spread below hands it through
// under this faction so a direct import of this module (scripts/gen-seo-routes.mjs) sees it too.
const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'apothecary',
  'apothecary-biologis', 'assault-intercessor-squad', 'assault-intercessors-with-jump-packs',
  'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient', 'bladeguard-veteran-squad',
  'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour', 'captain-in-phobos-armour',
  'captain-in-terminator-armour', 'captain-on-bike', 'captain-with-jump-pack',
  'centurion-assault-squad', 'centurion-devastator-squad', 'cerberus', 'chaplain',
  'chaplain-in-terminator-armour', 'chaplain-on-bike', 'chaplain-with-jump-pack',
  'company-heroes', 'desolation-squad', 'dreadnought', 'drop-pod', 'eliminator-squad',
  'eradicator-squad-with-heavy-bolters', 'eradicator-squad-with-melta-rifles', 'falchion',
  'firestrike-servo-turrets', 'gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant',
  'hammerfall-bunker', 'heavy-intercessor-squad', 'hellblaster-squad', 'impulsor',
  'inceptor-squad', 'incursor-squad', 'infernus-squad', 'infiltrator-squad', 'intercessor-squad',
  'invader-atvs', 'invictor-tactical-warsuit', 'judiciar', 'kratos', 'land-raider',
  'land-raider-crusader', 'land-raider-excelsior', 'land-raider-redeemer', 'land-speeder',
  'librarian', 'librarian-in-phobos-armour', 'librarian-in-terminator-armour', 'lieutenant',
  'lieutenant-in-phobos-armour', 'lieutenant-with-combi-weapon', 'mastodon', 'outrider-squad',
  'predator-annihilator', 'predator-destructor', 'rapier-carrier', 'razorback',
  'redemptor-dreadnought', 'reiver-squad', 'relic-razorback', 'repulsor', 'repulsor-executioner',
  'rhino', 'rhino-primaris', 'scout-bike-squad', 'sicaran', 'sternguard-veteran-squad',
  'storm-speeder-hailstrike', 'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike',
  'stormhawk-interceptor', 'stormraven-gunship', 'stormtalon-gunship',
  'tarantula-air-defence-battery', 'tarantula-sentry-battery', 'techmarine',
  'terrax-pattern-termite', 'thunderhawk-gunship', 'typhon', 'vanguard-veteran-squad',
  'vanguard-veteran-squad-with-jump-packs', 'venerable-dreadnought', 'vindicator', 'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'

export default {
  ...Object.fromEntries(SHARED.filter((id) => smRu[id]).map((id) => [id, smRu[id]])),

  'corvus-blackstar': {
    flavor:
      'Corvus Blackstar — обтекаемые, скрытные летательные аппараты, что используются для высадки kill team в кишащие врагом зоны или даже в цитадели ксеносов. Залпом ракет Blackstar добывают господство в воздухе и зачищают целевую точку, прежде чем включить парящие двигатели и доставить свой смертоносный груз элитных воинов.',
    abilities: {
      'Blackstar Cluster Launcher':
        'В вашей фазе движения, когда этот юнит завершает **[gloss:normal-move:обычный манёвр]**, выберите не более одного вражеского юнита, над которым этот юнит прошёл во время этого манёвра, и бросьте шесть D6:\n▪ За каждый 4+ тот юнит получает 1 **[gloss:mortal-wound:смертельную рану]**.',
    },
    wargearAbilities: {
      'Auspex Array':
        'Дальнобойное оружие носителя имеет способность **[IGNORES COVER]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; Auspex Array; 2 Blackstar Rocket Launcher; 1 Twin Assault Cannon.',
    options: [
      'Эту модель можно снабдить 1 Hurricane Bolter',
      '2 Blackstar Rocket Launchers этой модели можно заменить на 2 Stormstrike Missile Launchers.',
      'Twin Assault Cannon этой модели можно заменить на 1 Twin Lascannon.',
    ],
    transport:
      'Эта модель имеет **[gloss:transport-capacity:вместимость транспорта]** 12 моделей DEATHWATCH INFANTRY. Каждая модель GRAVIS/JUMP PACK/TERMINATOR занимает место 2 моделей.',
  },

  'deathwatch-terminator-squad': {
    flavor:
      'Несокрушимые воины, удостоенные носить громоздкую броню Terminator, — вдохновляющее зрелище для братьев. Deathwatch Terminator несут мощнейшее оружие ближнего боя, а сила и прочность их брони позволяет им вносить тяжелейший огонь прямо в скрытые логова ксеносов.',
    abilities: {
      'Terminatus Assault':
        '▪ Этот юнит может перебрасывать **[gloss:charge-roll:броски нападения]**.\n▪ После того как этот юнит завершил **[gloss:charge-move:манёвр нападения]**, каждый вражеский юнит **[gloss:engaged:в ближнем бою]** с этим юнитом совершает **[gloss:battle-shock-test:бросок на боевой шок]**, с -1 к этому **броску на боевой шок**, если это юнит NON-IMPERIUM/CHAOS.',
      'Teleport Homer':
        'В начале битвы вы можете выставить на поле боя один жетон Teleport Homer для этого юнита. Если вы это делаете:\n▪ Когда вы выбираете этот юнит целью **стратагемы Rapid Ingress**, вы можете использовать тот жетон Teleport Homer. Если вы это делаете, это применение стоит на 1 CP меньше, но при отыгрыше этой **[gloss:stratagem:стратагемы]** этот юнит должен быть выставлен в пределах 3" от того жетона Teleport Homer и не в пределах 8" от вражеского юнита. Затем тот жетон Teleport Homer убирается с поля боя.\n▪ Если вражеский юнит завершает манёвр в пределах 1" от того жетона Teleport Homer, тот жетон Teleport Homer убирается с поля боя.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет +1 **[gloss:wounds:W]**.',
    },
    loadout: '**Каждая модель вооружена:** 1 Power Fist; 1 Storm Bolter.',
    options: [
      'До 3 моделей Deathwatch Terminator можно заменить их Storm Bolter на одно из следующего: 1 Assault Cannon, 1 Cyclone Missile Launcher и 1 Storm Bolter, 1 Heavy Flamer, 1 Plasma Cannon',
      'Любому числу моделей можно заменить их Power Fist и Storm Bolter на одно из следующего: 1 Storm Bolter и 1 Chainfist, 1 Storm Bolter и 1 Power Weapon, 1 Thunder Hammer и 1 Storm Shield, 1 Twin Lightning Claws',
    ],
  },

  'deathwatch-veterans': {
    flavor:
      'Навыки Deathwatch Veteran оттачивались в их прежнем Ордене десятилетиями, порой веками. За долгую вахту против многоликих угроз ксеносов каждый ветеран учится вооружаться так, чтобы наилучшим образом послужить текущей миссии, и отряды несут набор оружия, способного повергнуть любого врага.',
    abilities: {
      'Death to the Alien':
        'Атаки этого юнита могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ __Или:__ если цель этих атак не имеет IMPERIUM/CHAOS — перебрасывать **броски на попадание**.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout: '**Каждая модель вооружена:** 1 Boltgun; 1 Power Weapon.',
    options: [
      'Модели Watch Sergeant можно заменить её Boltgun на 1 Combi-weapon.',
      'За каждые 5 моделей в этом юните 1 модели Deathwatch Veteran можно заменить её Boltgun и Power Weapon на 1 Stalker-pattern Boltgun и 1 Knives and Fists.',
      'За каждые 5 моделей в этом юните 1 модели Deathwatch Veteran можно заменить её Boltgun и Power Weapon на 1 Infernus Heavy Bolter и 1 Knives and Fists.',
      'Модели Watch Sergeant можно заменить её Power Weapon на 1 Xenophase Blade.',
      'За каждые 5 моделей в этом юните до 2 моделей Deathwatch Veteran можно заменить их Boltgun и Power Weapon на 1 Deathwatch Shotgun и 1 Knives and Fists.',
      'За каждые 5 моделей в этом юните до 2 моделей Deathwatch Veteran можно заменить их Boltgun и Power Weapon на 1 Heavy Thunder Hammer.',
      'За каждые 5 моделей в этом юните 1 модели Deathwatch Veteran можно заменить её Boltgun и Power Weapon на 1 Frag Cannon и 1 Knives and Fists.',
      '1 модели Deathwatch Veteran можно заменить её Boltgun и Power Weapon на 1 Black Shield Blades.',
      'За каждые 5 моделей в этом юните до 2 моделей Deathwatch Veteran можно заменить их Boltgun и Power Weapon на одно из следующего: 1 Boltgun и 1 Storm Shield, 1 Power Weapon и 1 Storm Shield',
    ],
  },

  'decimus-kill-team': {
    flavor:
      'Decimus Kill Team обеспечивает соразмерный угрозе ответ любой инопланетной опасности на уровне отряда. Каждый воин этого отборного отряда обладает собственной специализацией и набором мощного вооружения, что делает их погибелью не только для ксеносов, но и для любого врага, которому не повезло встать у них на пути.',
    abilities: {
      'Death to the Alien':
        'Атаки этого юнита могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ __Или:__ если цель этих атак не имеет IMPERIUM/CHAOS — перебрасывать **броски на попадание**.',
    },
    wargearAbilities: {
      'Storm Shield': 'Эта модель имеет 4+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout:
      '**Модель Deathwatch Veteran with Xenophase Blade and Special-issue Bolt Pistol вооружена:** 1 Special-issue Bolt Pistol; 1 Xenophase Blade.\n**Модель Kill Team Sergeant вооружена:** 1 Plasma Pistol; 1 Power Weapon.\n**Каждая модель Deathwatch Veteran with Deathwatch Marksman Bolt Carbine, Special-issue Bolt Pistol and Knives and Fists вооружена:** 1 Deathwatch Marksman Bolt Carbine; 1 Knives and Fists; 1 Special-issue Bolt Pistol.\n**Каждая модель Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol вооружена:** 1 Bolt Pistol; 1 Heavy Thunder Hammer.\n**Каждая модель Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fists вооружена:** 1 Bolt Pistol; 1 Knives and Fists; 1 Stalker Bolt Rifle.\n**Каждая модель Gravis Veteran вооружена:** 1 Bolt Pistol; 1 Infernus Heavy Bolter; 1 Knives and Fists.',
    options: [
      'За каждые 5 моделей в этом юните 1 модели Gravis Veteran можно заменить её Infernus Heavy Bolter на одно из следующего: 1 Frag Cannon, 1 Hellstorm Bolt Rifle и 1 Grenade Launcher',
      'За каждые 5 моделей в этом юните 1 модели Deathwatch Veteran with Stalker Bolt Rifle, Bolt Pistol and Knives and Fist можно заменить её Stalker Bolt Rifle на 1 Plasma Incinerator.',
      'За каждые 5 моделей в этом юните 1 модели Deathwatch Veteran with Heavy Thunder Hammer and Bolt Pistol можно заменить её Heavy Thunder Hammer на 1 Power Weapon и 1 Storm Shield.',
    ],
  },

  'fortis-kill-team': {
    flavor:
      'Ещё более отточенные из первоначального замысла Watch Master Морделая, Fortis Kill Team являют высшую приспособляемость варианта Tacticus брони Mk X, безупречно сочетая целый ряд ролей ближней поддержки со смертоносной огневой мощью.',
    abilities: {
      'Fortis Doctrines':
        'Атаки этого юнита, нацеленные на юнит,\n▪ **[gloss:below-starting-strength:ниже начальной численности]**, имеют +1 к **[gloss:hit-roll:броскам на попадание]**.\n▪ __Или:__ на **[gloss:half-strength:половинной численности]** или ниже — имеют +1 к **броскам на попадание** и **[gloss:wound-roll:броскам на ранение]**.',
    },
    loadout:
      '**Модель Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fists вооружена:** 1 Castellan Launcher; 1 Knives and Fists; 1 Superfrag Rocket Launcher.\n**Модель Kill Team Sergeant вооружена:** 1 Bolt Pistol; 1 Deathwatch Bolt Rifle; 1 Knives and Fists.\n**Каждая модель Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fists вооружена:** 1 Bolt Pistol; 1 Knives and Fists; 1 Plasma Incinerator.\n**Каждая модель Kill Team Intercessor with Deathwatch Bolt Rifle, Bolt Pistol and Knives and Fists вооружена:** 1 Bolt Pistol; 1 Deathwatch Bolt Rifle; 1 Knives and Fists.\n**Каждая модель Kill Team Intercessor with Heavy Bolt Pistol and Chainsword вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.\n**Каждая модель Kill Team Intercessor with Pyreblaster, Bolt Pistol and Knives and Fists вооружена:** 1 Bolt Pistol; 1 Knives and Fists; 1 Pyreblaster.',
    options: [
      'Модели Kill Team Sergeant можно заменить её Knives and Fists на одно из следующего: 1 Chainsword, 1 Power Fist, 1 Power Weapon, 1 Thunder Hammer',
      'Модели Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fist можно заменить её Superfrag Rocket Launcher на 1 Superkrak Rocket Launcher.',
      '1 модели Kill Team Intercessor with Castellan Launcher, Superfrag Rocket Launcher and Knives and Fist можно заменить её Superfrag Rocket Launcher на 1 Vengor Launcher.',
      'За каждые 5 моделей в этом юните 1 модель, вооружённую Deathwatch Bolt Rifle, можно снабдить 1 Astartes Grenade Launcher.',
      '1 модели Deathwatch Intercessor with Plasma Incinerator, Bolt Pistol and Knives and Fist можно заменить её Bolt Pistol на 1 Plasma Pistol.',
      'Модели Kill Team Sergeant можно заменить её Deathwatch Bolt Rifle на одно из следующего: 1 Chainsword, 1 Hand Flamer, 1 Plasma Pistol, 1 Power Weapon',
    ],
  },

  'indomitor-kill-team': {
    flavor:
      'Составленные из воинов в более тяжёлом варианте Gravis брони Mk X, Indomitor Kill Team — подвижные бастионы, способные обрушить огневую мощь эскадрона боевых танков. Перед ними разрываются на части и полчища ксеносов, и чудовищные твари.',
    abilities: {
      'Indomitor Doctrines':
        '▪ Дальнобойные атаки этого юнита, нацеленные на ближайший доступный вражеский юнит, имеют +1 **[gloss:strength:S]**.\n▪ Если этот юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, атаки ближнего боя этого юнита имеют +1 **S**.',
    },
    loadout:
      '**Каждая модель Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fists вооружена:** 1 Flamestorm Gauntlets; 1 Twin Power Fists.\n**Каждая модель Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fists вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Melta Rifle.\n**Каждая модель Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists вооружена:** 1 Ceramite Fists; 1 Deathwatch Heavy Bolt Rifle.',
    options: [
      'За каждые 5 моделей в этом юните 1 модели Kill Team Heavy Intercessor with Deathwatch Heavy Bolt Rifle and Ceramite Fists. можно заменить её Deathwatch Heavy Bolt Rifle на 1 Deathwatch Heavy Bolter.',
      '1 модели Kill Team Heavy Intercessor with Melta Rifle, Bolt Pistol and Ceramite Fist можно заменить её Melta Rifle на 1 Multi-melta.',
      'Любому числу моделей Kill Team Heavy Intercessor with Flamestorm Gauntlets and Twin Power Fist можно заменить их Flamestorm Gauntlets на 1 Auto Boltstorm Gauntlets и 1 Fragstorm Grenade Launcher.',
    ],
  },

  'spectrus-kill-team': {
    flavor:
      'Зловещие, безмолвные и почти невидимые до удара, Spectrus Kill Team искусны в том, чтобы нести смерть и вблизи, и издали. Облачённые в облегающую броню Mk X Phobos, они специализируются на контроле поля боя и дестабилизации врага.',
    abilities: {
      'Helix Gauntlet':
        'В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3 ран.',
      'Spectrus Doctrines':
        'В конце фазы ближнего боя вашего оппонента, если этот юнит **[gloss:unengaged:не в ближнем бою]**, вы можете поместить этот юнит в **[gloss:strategic-reserves:стратегические резервы]**.',
    },
    wargearAbilities: {
      'Helix Gauntlet':
        'В вашей фазе командования этот юнит **[gloss:heal:восстанавливает]** D3 ран.',
    },
    loadout:
      '**Каждая модель Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fists вооружена:** 1 Bolt Pistol; 1 Bolt Sniper Rifle; 1 Ceramite Fists.\n**Каждая модель Kill Team Infiltrator with Deathwatch Occulus Bolt Carbine, Bolt Pistol and Paired Combat Blades вооружена:** 1 Bolt Pistol; 1 Deathwatch Occulus Bolt Carbine; 1 Paired Combat Blades.\n**Каждая модель Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife вооружена:** 1 Combat Knife; 1 Special-issue Bolt Pistol.\n**Каждая модель Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fists вооружена:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Deathwatch Marksman Bolt Carbine.',
    options: [
      'Любому числу моделей Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fist можно заменить их Bolt Sniper Rifle на 1 Instigator Bolt Carbine.',
      'Любому числу моделей Kill Team Infiltrator with Special-issue Bolt Pistol and Combat Knife можно заменить их Combat Knife на 1 Deathwatch Bolt Carbine и 1 Ceramite Fists.',
      'Любому числу моделей Kill Team Infiltrator with Bolt Sniper Rifle, Bolt Pistol and Ceramite Fist можно заменить их Bolt Sniper Rifle на 1 Las Fusil.',
      '1 модели Kill Team Infiltrator with Deathwatch Marksman Bolt Carbine, Bolt Pistol and Ceramite Fist можно заменить её Deathwatch Marksman Bolt Carbine на 1 Helix Gauntlet.',
    ],
  },

  'talonstrike-kill-team': {
    flavor:
      'Ныряя с ганшипов или продвигаясь силовыми прыжками через зону боевых действий, братья Talonstrike Kill Team сокрушают добычу в ошеломляюще внезапных штурмах. Они атакуют воющими chainsword и залпами тяжёлого огня в упор. Рёв их jump pack следует за каждым стремительным убийством, пока они настигают следующую цель.',
    abilities: {
      'Talonstrike Doctrines':
        'В ход, в который этот юнит был выставлен на поле боя:\n▪ Атаки этого юнита имеют +1 **[gloss:armour-penetration:AP]**.\n▪ Атаки ближнего боя этого юнита имеют [LANCE].',
    },
    loadout:
      '**Модель Kill Team Sergeant with Jump Pack вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.\n**Каждая модель Kill Team Heavy Intercessor with Jump Pack вооружена:** 1 Assault Bolters; 1 Ceramite Fists.\n**Каждая модель Kill Team Intercessor with Jump Pack вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.',
    options: [
      'Любому числу моделей Kill Team Heavy Intercessor with Jump Pack можно заменить их Assault Bolters на 1 Plasma Exterminator.',
      'Модели Kill Team Sergeant with Jump Pack можно заменить её Chainsword на одно из следующего: 1 Power Fist, 1 Power Weapon',
      'За каждые 5 моделей в этом юните 1 модели Kill Team Intercessor with Jump Pack можно заменить её Heavy Bolt Pistol на 1 Plasma Pistol.',
      'Модели Kill Team Sergeant with Jump Pack можно заменить её Heavy Bolt Pistol на одно из следующего: 1 Hand Flamer, 1 Plasma Pistol',
    ],
  },

  'watch-captain-artemis': {
    aliasesRu: ['Артемис'],
    flavor:
      'Прирождённый выживальщик с дикого мира и бывший член мрачного Ордена Mortifactors, Артемис ведёт Watch Company Таласа-Прайм. Известный своим чутьём на уловки ксеносов, он всё ещё смакует перспективу насилия — будь то клинком, мутагенным кислотным огнём Hellfire Extremis или искажающей время стазис-гранатой.',
    abilities: {
      'Tactical Instinct': 'Атаки этого юнита имеют [SUSTAINED HITS 1].',
      'Unstoppable Champion (Once per battle, per army)':
        'В конце фазы, в которой эта модель была **[gloss:destroyed:уничтожена]**, бросьте один D6:\n▪ На 2+ снова выставьте эту модель на поле боя как можно ближе к месту, где она была **уничтожена, не в ближнем бою**, с 3 оставшимися ранами.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Hellfire Extremis; 1 Master-crafted Power Weapon.',
    leader: { text: LEADER_TEXT },
  },

  'watch-master': {
    aliasesRu: ['Мастер Дозора', 'Вотчмастер', 'Вочмастер'],
    flavor:
      'Первейшие охотники на ксеносов в галактике, каждый Watch Master командует одной из бдительных крепостей Ордена. Эти вожди обладают веками стратегических и эзотерических знаний об ужасах, что осаждают человечество. В бою трещащие клинки и особые болты их vigil spear уничтожают любого ксеноса перед ними.',
    abilities: {
      'Watch Master':
        'Атаки этой модели, нацеленные на юнит CHARACTER, могут:\n▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ Перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
      'Strategic Knowledge':
        '▪ Дальнобойные атаки этого юнита имеют [ASSAULT].\n▪ Когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает этот юнит права **[gloss:declare-charge:объявлять нападение]**.\n▪ Когда этот юнит выбран для совершения **[gloss:fall-back-move:отступления]**, это **отступление** не лишает этот юнит права **стрелять** и **объявлять нападение**.',
      'Purgatus Quarry':
        'В начале первого раунда боя выберите не более одного вражеского юнита, который станет **целью охоты** этого юнита:\n▪ Атаки этого юнита, нацеленные на **цель охоты** этого юнита, могут перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.\n▪ Каждый раз, когда **цель охоты** этого юнита **[gloss:destroyed:уничтожена]**, выберите не более одного вражеского юнита, который станет **целью охоты** этого юнита.',
    },
    loadout: '**Эта модель вооружена:** 1 Vigil Spear.',
    leader: { text: LEADER_TEXT },
  },
}

// RU headers for this Chapter's own ability names (the generic Space Marines ones come from
// smNames; descriptive names only — character, unit and proprietary names stay English).
export const abilityNamesRu = {
  ...smNames,
  'Auspex Array': 'Массив ауспексов',
  'Blackstar Cluster Launcher': 'Кассетный пусковой «Блэкстар»',
  'Death to the Alien': 'Смерть чужаку',
  'Fortis Doctrines': 'Доктрины «Фортис»',
  'Helix Gauntlet': 'Перчатка «Геликс»',
  'Indomitor Doctrines': 'Доктрины «Индомитор»',
  'Purgatus Quarry': 'Добыча Пургатуса',
  'Spectrus Doctrines': 'Доктрины «Спектрус»',
  'Storm Shield': 'Штормовой щит',
  'Strategic Knowledge': 'Стратегическое знание',
  'Tactical Instinct': 'Тактический инстинкт',
  'Talonstrike Doctrines': 'Доктрины «Талонстрайк»',
  'Teleport Homer': 'Телепорт-маяк',
  'Terminatus Assault': 'Штурм «Терминатус»',
  'Unstoppable Champion (Once per battle, per army)': 'Неудержимый чемпион (раз за битву, на армию)',
  'Watch Master': 'Мастер Стражи',
}
