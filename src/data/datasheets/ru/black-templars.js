// Black Templars — русский перевод листов данных (разреженный оверлей поверх EN, см. ./index.js).
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
  'firestrike-servo-turrets', 'hammerfall-bunker', 'heavy-intercessor-squad', 'hellblaster-squad',
  'inceptor-squad', 'incursor-squad', 'infernus-squad', 'infiltrator-squad', 'intercessor-squad',
  'invader-atvs', 'invictor-tactical-warsuit', 'judiciar', 'kratos', 'land-raider',
  'land-raider-crusader', 'land-raider-excelsior', 'land-raider-redeemer', 'land-speeder',
  'lieutenant', 'lieutenant-in-phobos-armour', 'lieutenant-with-combi-weapon', 'mastodon',
  'outrider-squad', 'predator-annihilator', 'predator-destructor', 'rapier-carrier', 'razorback',
  'redemptor-dreadnought', 'reiver-squad', 'relic-razorback', 'rhino', 'rhino-primaris',
  'scout-bike-squad', 'scout-squad', 'sicaran', 'sternguard-veteran-squad',
  'storm-speeder-hailstrike', 'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike',
  'stormhawk-interceptor', 'stormraven-gunship', 'stormtalon-gunship',
  'tarantula-air-defence-battery', 'tarantula-sentry-battery', 'techmarine',
  'terminator-assault-squad', 'terminator-squad', 'terrax-pattern-termite', 'thunderhawk-gunship',
  'typhon', 'vanguard-veteran-squad', 'vanguard-veteran-squad-with-jump-packs',
  'venerable-dreadnought', 'vindicator', 'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'

export default {
  ...Object.fromEntries(SHARED.filter((id) => smRu[id]).map((id) => [id, smRu[id]])),

  castellan: {
    flavor:
      'Castellan ведёт каждую боевую роту крестового похода и служит проводником воли своего Marshal. На них возложена телесная и духовная чистота действующих крепостей Ордена, и они отточили терпеливую мудрость, к которой обращаются в бою наравне со своей тактической точностью и свирепостью ближнего боя.',
    abilities: {
      'Vehement Aggression':
        'В фазе ближнего боя, когда этот юнит **[gloss:selected-to-fight:выбран для боя]**, вы можете использовать эту способность. Если вы это делаете, совершите для этого юнита **[gloss:leadership-roll:бросок на лидерство]**:\n▪ Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.\n▪ __Или:__ если бросок успешен — атаки ближнего боя этого юнита:\n▪ Могут перебрасывать **броски на попадание**, равные 1.\n▪ Могут перебрасывать **[gloss:wound-roll:броски на ранение]**, равные 1.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Combi-weapon; 1 Master-crafted Power Weapon.',
    options: [
      'Combi-weapon этой модели можно заменить на 1 Heavy Bolt Pistol.',
      'Master-crafted Power Weapon этой модели можно заменить на 1 Chainsword.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'chaplain-grimaldus': {
    aliasesRu: ['Гримальд', 'Гримальдус'],
    flavor:
      'Верховный капеллан Гримальдус — маяк имперской веры. Его стойкость такова, что многие братья верят в его непобедимость. Воля его нераздельна, рвение холодно-яростно, а боевое мастерство подтверждено вереницей поверженных врагов у его ног. Его Cenobyte Servitor ковыляют на войну рядом с ним, неся с собой священные реликвии веры.',
    abilities: {
      'Temple Relics':
        'В начале вашей фазы командования, если этот юнит содержит одну или более моделей CENOBYTE SERVITOR, выберите не более одной способности из раздела Temple Relics. До начала вашей следующей фазы командования эта модель имеет ту способность.',
      'Litanies of the Devout':
        'Атаки ближнего боя этого юнита могут перебрасывать **[gloss:hit-roll:броски на попадание]**.',
      'Faithful Cenobytes':
        '▪ Если модель Chaplain Grimaldus этого юнита **[gloss:destroyed:уничтожена]**, оставшиеся модели Cenobyte Servitor этого юнита также **уничтожаются**.\n▪ Каждая модель Cenobyte Servitor этого юнита занимает 0 мест **[gloss:transport-capacity:вместимости транспорта]**.',
    },
    abilitySets: {
      'Temple Relics': {
        options: {
          'Banner of the Emperor Victorious':
            'Этот юнит имеет +1 к **[gloss:advance-roll:броскам продвижения]** и **[gloss:charge-roll:броскам нападения]**.',
          'Column from the Major Altar': 'Этот юнит имеет +1 **[gloss:toughness:T]**.',
          'Water from the Stoup of Elucidation': 'Атаки ближнего боя этого юнита имеют +1 **[gloss:armour-penetration:AP]**.',
        },
      },
    },
    loadout:
      '**Модель Chaplain Grimaldus вооружена:** 1 Artificier Crozius; 1 Plasma Pistol.\n**Каждая модель Cenobyte Servitor вооружена:** 1 Servitor Combat Weapon.',
    leader: { text: LEADER_TEXT },
  },

  'crusade-ancient': {
    flavor:
      'Неся иконы и священные штандарты своего крестового похода, эти ветераны-стражи — почтённые воины исключительной решимости и стойкости. Они вздымают гобелены, что изображают победы похода и славу Бога-Императора, призывая собратьев Black Templars к новым вершинам оружейной ненависти.',
    abilities: {
      'Vengeful Exhortation':
        'В фазе ближнего боя вы можете использовать эту способность. Если вы это делаете, когда модель этого юнита **[gloss:destroyed:уничтожена]**, если этот юнит ещё не был **[gloss:selected-to-fight:выбран для боя]** в этой фазе, бросьте один D6:\n▪ На 4+ не убирайте эту модель с поля боя. Когда ваш юнит отсражался или в конце фазы (что наступит раньше), эта модель убирается с поля боя.',
      'Martial Honour (Once per battle, per unit)':
        'Если атаки ближнего боя этого юнита **[gloss:destroyed:уничтожили]** вражеский юнит в этой фазе, вы можете использовать эту способность. Если вы это делаете, до конца битвы эта модель имеет +5 **[gloss:objective-control:OC]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Bolt Pistol; 1 Master-crafted Power Weapon.',
    leader: { text: LEADER_TEXT },
  },

  'crusader-squad': {
    flavor:
      'Crusader Squad врываются в бой с полыхающими bolt rifle и воющими chainsword. Initiate направляют струи огня из pyreblaster или обрушивают на врага трещащие power fist, а суровые Neophyte яростно сражаются, доказывая своё воинское достоинство под строгим взглядом наставников.',
    abilities: {
      'Righteous Zeal':
        'В фазе стрельбы вашего оппонента, когда вражеский юнит отстрелялся, если модель этого юнита была **[gloss:destroyed:уничтожена]** этими атаками, этот юнит может совершить **[gloss:surge-move:стремительный манёвр]** на расстояние до D6+1".',
    },
    loadout:
      '**Модель Sword Brother вооружена:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.\n**Каждая модель Neophyte вооружена:** 1 Bolt Pistol; 1 Neophyte Chainsword.\n**Каждая модель Initiate вооружена:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Knives and Fists.',
    options: [
      'Любому числу моделей Initiate можно заменить их Bolt Rifle на 1 Heavy Bolt Pistol и 1 Initiate Chainsword.',
      'Любому числу моделей Neophyte можно заменить их Bolt Pistol и Neophyte Chainsword на 1 Shotgun и 1 Combat Knife.',
      'Модели Sword Brother можно заменить её Heavy Bolt Pistol на 1 Hand Flamer.',
      'За каждые 10 моделей в этом юните до 2 моделей Initiate можно заменить их Bolt Rifle на одно из следующего: 1 Heavy Bolt Pistol и 1 Power Fist, 1 Pyreblaster',
    ],
  },

  'emperors-champion': {
    flavor:
      'Смиренный воин, коснувшийся величия, Emperor’s Champion шагает в бой, окутанный божественным светом. Яростные удары врага звенят о его почти непробиваемый Armour of Faith. В ответ Emperor’s Champion выискивает вождей врага и разящими взмахами своего Black Sword повергает их.',
    abilities: {
      'Chosen of the Emperor':
        'Вы не можете включить в свою армию более одного юнита EMPEROR\'S CHAMPION.',
      'Armour of Faith': 'Атаки, распределённые на эту модель, имеют ‑1 **[gloss:damage-roll:D]**.',
      'Sigismund\'s Heir': 'Этот юнит имеет +1 к **[gloss:charge-roll:броскам нападения]**.',
    },
    loadout: '**Эта модель вооружена:** 1 Black Sword; 1 Bolt Pistol.',
    leader: { text: LEADER_TEXT },
  },

  execrator: {
    flavor:
      'Execrator — живые образцы клятв своих братьев, свирепые воины-жрецы, что ведут Black Templars в смертоносных буйствах. Они учат, что война — достойнейшая часовня для воинов, и каждый разящий удар их crozius arcanum сопровождается ревностной бранью и рыком проповедей.',
    abilities: {
      'Remorseless Persecution':
        'В вашей фазе движения, когда этот юнит выбран для совершения **[gloss:advance-move:продвижения]**, это **продвижение** не лишает этот юнит права **[gloss:declare-charge:объявлять нападение]**.',
      'Condemnatory Annihilation':
        'После того как этот юнит отсражался, если в этой фазе этот юнит **[gloss:destroyed:уничтожил]** вражескую модель, каждый вражеский юнит **[gloss:engaged:в ближнем бою]** с этим юнитом совершает **[gloss:battle-shock-test:бросок на боевой шок]** с -1 к этому **броску на боевой шок**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.',
    options: [
      'Absolvor Bolt Pistol этой модели можно заменить на 1 Hand Flamer.',
      'Если эта модель вооружена 1 Absolvor Bolt Pistol, её можно снабдить 1 Master-crafted Power Weapon (1 Absolvor Bolt Pistol этой модели нельзя заменить).',
    ],
    leader: { text: LEADER_TEXT },
  },

  'gladiator-lancer': {
    flavor:
      'С безукоризненной точностью Gladiator Lancer выбивает самую тяжёлую вражескую броню, и его laser destroyer прожигает в корпусах дымящиеся дыры. Дальнобойность его тяжёлого орудия такова, что он устраняет угрозы для космодесанта ещё до встречи с ними, проносясь мимо горящих остовов к своим целям.',
    abilities: {
      'Aquilon Optics':
        'Дальнобойные атаки этого юнита, нацеленные на юнит MONSTER/VEHICLE, могут:\n▪ Перебросить __один__ **[gloss:hit-roll:бросок на попадание]**.\n▪ Перебросить __один__ **[gloss:wound-roll:бросок на ранение]**.\n▪ Перебросить __один__ **[gloss:damage-roll:бросок урона]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Laser Destroyer.',
    options: ['Эту модель можно снабдить 1 Multi-melta'],
  },

  'gladiator-reaper': {
    flavor:
      'Когда пушки Gladiator Reaper раскручиваются до полного хода, гул от них заставляет зубы всех, кто рядом, ныть от силы вибраций. За считаные секунды тысячи стреляных гильз изливаются на бронированную шкуру танка, а враги стираются из бытия бурей огня.',
    abilities: {
      'Reaping Tally':
        'Дальнобойные атаки этого юнита, нацеленные на юнит (исключая юниты MONSTER/VEHICLE), имеют +1 **[gloss:armour-penetration:AP]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Twin Heavy Onslaught Gatling Cannon.',
    options: ['Эту модель можно снабдить 1 Multi-melta'],
  },

  'gladiator-valiant': {
    flavor:
      'Valiant обрушивает испепеляющие залпы, сопровождая транспорты или поддерживая пехоту в свирепом бою, с равной лёгкостью пересекая бурные потоки, засасывающие топи и бурлящие лавовые озёра. Его twin las-talon плюются смертью, быстро расправляясь с вражеской бронёй и вскрывая укреплённые позиции.',
    abilities: {
      'Priority Target Acquisition':
        'Дальнобойные атаки этого юнита, нацеленные на юнит в пределах 12" от этого юнита, имеют +1 **[gloss:strength:S]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 2 Multi-melta; 1 Twin Las-talon.',
    options: ['Эту модель можно снабдить 1 Multi-melta'],
  },

  'high-marshal-helbrecht': {
    aliasesRu: ['Хелбрехт'],
    flavor:
      'Хелбрехт — живое воплощение воинского духа своего Ордена. Владея Sword of the High Marshals, он врывается в схватку, рыча клятвы мести, ведя неудержимую атаку. Братья следуют за ним без вопросов, ибо верят: где ступает Верховный маршал Хелбрехт, там идёт и сам Император.',
    abilities: {
      'High Marshal':
        'В начале фазы ближнего боя выберите не более одного вражеского юнита **[gloss:engaged:в ближнем бою]** с этим юнитом и бросьте один D6:\n▪ На 2-3 тот вражеский юнит получает D3 **[gloss:mortal-wound:смертельные раны]**.\n▪ На 4-5 тот вражеский юнит получает 3 **смертельные раны**.\n▪ На 6+ тот вражеский юнит получает D3+3 **смертельные раны**.',
      'Crusade of Wrath':
        'Атаки ближнего боя этого юнита имеют:\n▪ +1 **[gloss:attack-dice:A]**.\n▪ +1 **[gloss:strength:S]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Ferocity; 1 Sword of the High Marshals.',
    leader: { text: LEADER_TEXT },
  },

  impulsor: {
    flavor:
      'Оснащённый векторными двигателями, что делают его быстрее любого другого гравитационного танка в арсеналах космодесанта, Impulsor — крайне универсальный транспорт, применяемый всеми Primaris-космодесантниками для быстрой высадки и фланговых манёвров. Особенно его ценят силы Vanguard.',
    abilities: {
      'Rapid Disembarkation':
        'В вашей фазе движения, когда этот юнит завершает **[gloss:advance-move:продвижение]**, юниты, погружённые в этот юнит, могут совершить **[gloss:shock-disembark-move:ударный манёвр высадки]** (стр. 157).',
    },
    wargearAbilities: {
      'Orbital Comms Array': 'Этот юнит имеет [core:Scouts 6"].',
      'Shield Dome': 'Этот юнит имеет 5+ **[gloss:invulnerable-save:InSv]**.',
    },
    loadout: '**Эта модель вооружена:** 1 Armoured Hull; 1 Storm Bolters.',
    options: [
      'Storm bolters этой модели можно заменить на 1 Fragstorm grenade launchers.',
      'Эту модель можно снабдить одним из следующего: 1 Ironhail heavy stubber, 1 Multi-melta',
      'Эту модель можно снабдить одним из следующего: 1 Bellicatus missile array, 1 Orbital Comms Array, 1 Shield Dome',
    ],
    transport:
      'Эта модель имеет вместимость транспорта 7 моделей Adeptus Astartes Infantry. Она не может перевозить модели Terminator и Jump Pack. Каждая модель Gravis занимает место 2 моделей.',
  },

  marshal: {
    flavor:
      'Каждый крестовый поход Black Templars ведёт Marshal. По рангу схожие с капитанами других Орденов, Marshal — грозные бойцы и образцы стратегической проницательности. Обеспечивать чистоту и успех похода — священный долг, и Marshal сражаются освящённым реликтовым оружием, служа маяками благочестивого рвения для своих воинов.',
    abilities: {
      'Inspirational Exemplar':
        'Атаки ближнего боя этого юнита имеют +1 к **[gloss:hit-roll:броскам на попадание]**.',
      'Pious Fervour':
        'Когда этот юнит **[gloss:selected-to-fight:выбран для боя]**, вы можете использовать эту способность. Если вы это делаете, атаки ближнего боя этой модели имеют +1 **[gloss:attack-dice:A]** за каждый вражеский юнит в пределах 6" от этой модели (максимум +3 **A**).',
    },
    loadout:
      '**Эта модель вооружена:** 1 Master-crafted Power Weapon; 1 Plasma Pistol.',
    options: ['Plasma Pistol этой модели можно заменить на 1 Combi-weapon.'],
    leader: { text: LEADER_TEXT },
  },

  repulsor: {
    flavor:
      'Одетый в передовую броневую обшивку и вооружённый под любую боевую ситуацию, Repulsor не только безопасно доставляет пассажиров, но и обеспечивает превосходную огневую поддержку. Опасная местность ему почти не помеха: его брюшные плиты направляют гравитационные энергии, что дробят препятствия под массой машины.',
    abilities: {
      'Combat Embarkation':
        'В фазе нападения вашего оппонента, когда вражеский юнит выбрал **[gloss:charge-target:цели нападения]**, вы можете выбрать один дружественный юнит ADEPTUS ASTARTES, **[gloss:unengaged:не находящийся в ближнем бою]**, который был одной из этих **целей нападения** и может погрузиться в этот TRANSPORT. Если каждая модель того юнита находится в пределах 3" от этого TRANSPORT, тот юнит может погрузиться в этот TRANSPORT. Затем тот вражеский юнит может выбрать новые **цели нападения** для этого **[gloss:charge-move:манёвра нападения]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Onslaught Gatling Cannon; 1 Hunter-slayer Missile; 1 Twin Heavy Bolter.',
    options: [
      'Twin heavy bolter этой модели можно заменить на 1 Twin lascannon.',
      'Эту модель можно снабдить 1 Multi-melta',
      'Heavy onslaught gatling cannon этой модели можно заменить на 1 Las-talon.',
    ],
    transport:
      'Эта модель имеет вместимость транспорта 14 моделей Adeptus Astartes Infantry. Каждая модель Terminator, Gravis, Jump Pack, Wulfen занимает место 2 моделей.',
  },

  'repulsor-executioner': {
    flavor:
      'Основанный на шасси Repulsor, Repulsor Executioner жертвует частью транспортной вместимости ради мощного башенного оружия. Даже крупнейшие боевые танки может искалечить луч heavy laser destroyer, а испепеляющие залпы macro plasma incinerator способны стереть пехотные построения.',
    abilities: {
      Executioner:
        'Дальнобойные атаки этого юнита, нацеленные на юнит, который не **[gloss:half-strength:ниже половинной численности]**, имеют +1 к **[gloss:hit-roll:броскам на попадание]**.',
    },
    loadout:
      '**Эта модель вооружена:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Laser Destroyer; 1 Heavy Onslaught Gatling Cannon; 1 Twin Heavy Bolter.',
    options: [
      'Всем моделям этого юнита можно заменить их Heavy laser destroyer на 1 Macro plasma incinerator.',
      'Эту модель можно снабдить 1 Multi-melta',
    ],
    transport:
      'Эта модель имеет вместимость транспорта 7 моделей Adeptus Astartes Infantry. Каждая модель Terminator, Gravis, Jump Pack, Wulfen занимает место 2 моделей.',
  },

  'sword-brethren-squad': {
    flavor:
      'Каждый Sword Brother заслужил своё место в свите Marshal деяниями непоколебимой веры и зрелищного насилия. На поле боя они — жнущие вихри: неудержимые, бескомпромиссные и вооружённые смертоносным набором оружия, они обрушиваются на врага во имя Императора.',
    abilities: {
      'Exploit their Cowardice':
        'В фазе движения вашего оппонента, когда вражеский юнит, который был **[gloss:engaged:в ближнем бою]** с этим юнитом, завершает **[gloss:fall-back-move:отступление]**, если этот юнит **[gloss:unengaged:не в ближнем бою]**, он может совершить **[gloss:normal-move:обычный манёвр]** на расстояние до 6".',
    },
    loadout:
      '**Каждая модель вооружена:** 1 Chainsword; 1 Heavy Bolt Pistol.',
    options: [
      'За каждые 4 модели в этом юните до 2 моделей можно заменить их Heavy Bolt Pistol на 1 Hand Flamer.',
      'Любому числу моделей можно заменить их Chainsword на 1 Master-crafted Power Weapon.',
      'За каждые 4 модели в этом юните 1 модели можно заменить её Chainsword на 1 Thunder Hammer.',
      'За каждые 4 модели в этом юните 1 модели можно заменить её Heavy Bolt Pistol на 1 Plasma Pistol.',
      'За каждые 4 модели в этом юните 1 модели можно заменить её Heavy Bolt Pistol и Chainsword на 1 Twin Lightning Claws.',
    ],
  },
}

// RU headers for this Chapter's own ability names (the generic Space Marines ones come from
// smNames; descriptive names only — character, unit and proprietary names stay English).
export const abilityNamesRu = {
  ...smNames,
  'Aquilon Optics': 'Оптика «Аквилон»',
  'Armour of Faith': 'Доспех веры',
  'Banner of the Emperor Victorious': 'Штандарт Императора-победителя',
  'Chosen of the Emperor': 'Избранник Императора',
  'Column from the Major Altar': 'Колонна с Главного алтаря',
  'Combat Embarkation': 'Боевая погрузка',
  'Condemnatory Annihilation': 'Обличающее уничтожение',
  'Crusade of Wrath': 'Крестовый поход гнева',
  'Executioner': 'Палач',
  'Exploit their Cowardice': 'Используй их трусость',
  'Faithful Cenobytes': 'Верные ценобиты',
  'High Marshal': 'Верховный маршал',
  'Inspirational Exemplar': 'Вдохновляющий образец',
  'Litanies of the Devout': 'Литании верных',
  'Martial Honour (Once per battle, per unit)': 'Воинская честь (раз за битву, на юнит)',
  'Orbital Comms Array': 'Орбитальный массив связи',
  'Pious Fervour': 'Благочестивое рвение',
  'Priority Target Acquisition': 'Захват приоритетной цели',
  'Rapid Disembarkation': 'Быстрая высадка',
  'Reaping Tally': 'Жатва',
  'Remorseless Persecution': 'Беспощадное преследование',
  'Righteous Zeal': 'Праведное рвение',
  'Shield Dome': 'Купол-щит',
  'Sigismund\'s Heir': 'Наследник Сигизмунда',
  'Temple Relics': 'Храмовые реликвии',
  'Vehement Aggression': 'Яростный напор',
  'Vengeful Exhortation': 'Мстительный призыв',
  'Water from the Stoup of Elucidation': 'Вода из чаши Прозрения',
}
