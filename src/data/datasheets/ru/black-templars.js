// Black Templars — русский перевод листов данных. Делят 81 лист с генерик-Space Marines
// (тот же id и EN-текст) — они переиспользуются из ./space-marines.js. Здесь переведены
// только 9 листов, уникальных для Black Templars. Конвенции те же (см. ./index.js).
import smRu, { abilityNamesRu as smNames } from './space-marines.js'

const SHARED = [
  'aggressor-squad', 'ancient', 'ancient-in-terminator-armour', 'apothecary',
  'apothecary-biologis', 'assault-intercessor-squad', 'assault-intercessors-with-jump-packs',
  'astraeus', 'ballistus-dreadnought', 'bladeguard-ancient', 'bladeguard-veteran-squad',
  'brutalis-dreadnought', 'captain', 'captain-in-gravis-armour', 'captain-in-phobos-armour',
  'captain-in-terminator-armour', 'captain-with-jump-pack', 'centurion-assault-squad',
  'centurion-devastator-squad', 'chaplain', 'chaplain-in-terminator-armour', 'chaplain-on-bike',
  'chaplain-with-jump-pack', 'company-heroes', 'desolation-squad', 'devastator-squad',
  'dreadnought', 'drop-pod', 'eliminator-squad', 'eradicator-squad',
  'eradicator-squad-with-heavy-bolters', 'firestrike-servo-turrets', 'gladiator-lancer',
  'gladiator-reaper', 'gladiator-valiant', 'hammerfall-bunker', 'heavy-intercessor-squad',
  'hellblaster-squad', 'impulsor', 'inceptor-squad', 'incursor-squad', 'infernus-squad',
  'infiltrator-squad', 'intercessor-squad', 'invader-atv', 'invictor-tactical-warsuit',
  'judiciar', 'land-raider', 'land-raider-crusader', 'land-raider-redeemer', 'land-speeder',
  'lieutenant', 'lieutenant-in-phobos-armour', 'lieutenant-in-reiver-armour',
  'lieutenant-with-combi-weapon', 'outrider-squad', 'predator-annihilator', 'predator-destructor',
  'razorback', 'redemptor-dreadnought', 'reiver-squad', 'repulsor', 'repulsor-executioner',
  'rhino', 'scout-squad', 'sternguard-veteran-squad', 'storm-speeder-hailstrike',
  'storm-speeder-hammerstrike', 'storm-speeder-thunderstrike', 'stormhawk-interceptor',
  'stormraven-gunship', 'stormtalon-gunship', 'suppressor-squad', 'tactical-squad',
  'techmarine', 'terminator-assault-squad', 'terminator-squad', 'thunderhawk-gunship',
  'vanguard-veteran-squad-with-jump-packs', 'vindicator', 'whirlwind',
]

const LEADER_TEXT = 'Эту модель можно присоединить к следующим юнитам:'
const EQUIP_THIS = '**Эта модель вооружена:**'
const EQUIP_EVERY = '**Каждая модель вооружена:**'

export default {
  ...Object.fromEntries(SHARED.map((id) => [id, smRu[id]])),

  castellan: {
    flavor:
      'Castellan ведёт каждую боевую роту крестового похода и служит проводником воли своего Marshal. На них возложена телесная и духовная чистота действующих крепостей Ордена, и они отточили терпеливую мудрость, к которой обращаются в бою наравне со своей тактической точностью и свирепостью ближнего боя.',
    abilities: {
      'Vehement Aggression':
        'Пока эта модель возглавляет юнит, каждый раз, когда этот юнит выбирается для схватки, пройдите проверку лидерства для этого юнита: если пройдена, до конца фазы каждый раз, когда модель этого юнита совершает атаку, вы можете перебросить бросок попадания; если провалена, до конца фазы каждый раз, когда модель этого юнита совершает атаку, перебросьте бросок попадания, равный 1.',
      'Prioritised Eradication':
        'Каждый раз, когда модель юнита этой модели совершает атаку ближнего боя, что уничтожает один или более вражеских юнитов, бросьте один D6: на 4+ вы получаете 1 CP.',
    },
    loadout: `${EQUIP_THIS} combi-weapon; master-crafted power weapon.`,
    options: [
      'combi-weapon этой модели можно заменить на 1 heavy bolt pistol.',
      'master-crafted power weapon этой модели можно заменить на 1 Astartes chainsword.',
    ],
    leader: { text: LEADER_TEXT },
  },

  'chaplain-grimaldus': {
    flavor:
      'Верховный капеллан Гримальдус — маяк имперской веры. Его стойкость такова, что многие братья верят в его непобедимость. Воля его нераздельна, рвение холодно-яростно, а боевое мастерство подтверждено вереницей поверженных врагов у его ног. Его Cenobyte Servitor ковыляют на войну рядом с ним, неся с собой священные реликвии веры.',
    abilities: {
      'Litanies of the Devout':
        'Пока этот юнит возглавляет юнит и содержит модель Chaplain Grimaldus, каждый раз, когда модель этого юнита совершает атаку ближнего боя, вы можете перебросить бросок попадания.',
      'Temple Relics':
        'В вашей фазе командования, если этот юнит содержит одну или более моделей Cenobyte Servitor, выберите одну способность Temple Relics (см. слева). До начала вашей следующей фазы командования модель Chaplain Grimaldus этого юнита имеет эту способность.',
    },
    special: {
      'Banner of the Emperor Victorious':
        'Прибавьте 1 к броскам продвижения и нападения для этого юнита.',
      'Column from the Major Altar':
        'Прибавьте 1 к характеристике Стойкости (Toughness) моделей этого юнита.',
      'Water from the Stoup of Elucidation':
        'Улучшите характеристику Пробития брони (Armour Penetration) оружия ближнего боя моделей этого юнита на 1.',
    },
    loadout:
      '* Если модель Chaplain Grimaldus этого юнита будет уничтожена, все оставшиеся модели Cenobyte Servitor этого юнита также уничтожаются. При погрузке в Transport и находясь погружёнными в TRANSPORT, каждая модель Cenobyte Servitor этого юнита занимает место 0 моделей.\n\n**Chaplain Grimaldus вооружён:** plasma pistol; artificer crozius.\n\n**Каждый Cenobyte Servitor вооружён:** close combat weapon.',
    leader: { text: LEADER_TEXT },
  },

  'crusade-ancient': {
    flavor:
      'Неся иконы и священные штандарты своего крестового похода, эти ветераны-стражи — почтённые воины исключительной решимости и стойкости. Они вздымают гобелены, что изображают победы похода и славу Бога-Императора, призывая собратьев Black Templars к новым вершинам оружейной ненависти.',
    abilities: {
      'Vengeful Exhortation':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита уничтожается атакой ближнего боя, если она ещё не сражалась в этой фазе, бросьте один D6: на 4+ не убирайте её из игры. Уничтоженная модель может сражаться после того, как атакующий юнит закончил свои атаки, а затем убирается из игры.',
      'Martial Honour':
        'Когда модель юнита этой модели впервые совершает атаку ближнего боя, что уничтожает один или более вражеских юнитов, до конца битвы, пока юнит этой модели не в боевом шоке, прибавьте 5 к характеристике Контроля целей (OC) этой модели.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; master-crafted power weapon.`,
    leader: { text: LEADER_TEXT },
  },

  'crusader-squad': {
    flavor:
      'Crusader Squad врываются в бой с полыхающими bolt rifle и воющими chainsword. Initiate направляют струи огня из pyreblaster или обрушивают на врага трещащие power fist, а суровые Neophyte яростно сражаются, доказывая своё воинское достоинство под строгим взглядом наставников.',
    abilities: {
      'Righteous Zeal':
        'В фазе стрельбы вашего оппонента, каждый раз, когда вражеский юнит отстрелялся, если какие-либо модели этого юнита были уничтожены в результате этих атак, этот юнит может совершить манёвр Righteous Zeal. Для этого бросьте один D6 и прибавьте 2 к результату: модели этого юнита перемещаются на число дюймов до этого результата, но этот юнит обязан завершить манёвр как можно ближе к ближайшему вражескому юниту (исключая AIRCRAFT). При этом эти модели можно переместить в дистанцию ввязывания этого вражеского юнита. Этот юнит не может совершить манёвр Righteous Zeal, пока он в боевом шоке или в дистанции ввязывания одного или более вражеских юнитов, и может совершить лишь один такой манёвр за фазу.',
    },
    loadout:
      '**Sword Brother вооружён:** heavy bolt pistol; master-crafted power weapon.\n\n**Каждый Initiate вооружён:** bolt pistol; bolt rifle; close combat weapon.\n\n**Каждый Neophyte вооружён:** bolt pistol; Astartes chainsword.',
    options: [
      'heavy bolt pistol у Sword Brother можно заменить на 1 pyre pistol.',
      'Любому числу Neophyte их bolt pistol и Astartes chainsword можно заменить на 1 Neophyte firearm и 1 close combat weapon.',
      'Любому числу Initiate их bolt rifle можно заменить на 1 heavy bolt pistol и 1 Astartes chainsword.',
      'За каждые 10 моделей в этом юните у до 2 Initiate их bolt rifle можно заменить на одно из следующего:\n▪ 1 heavy bolt pistol и 1 power fist\n▪ 1 pyreblaster',
    ],
  },

  'emperors-champion': {
    flavor:
      'Смиренный воин, коснувшийся величия, Emperor’s Champion шагает в бой, окутанный божественным светом. Яростные удары врага звенят о его почти непробиваемый Armour of Faith. В ответ Emperor’s Champion выискивает вождей врага и разящими взмахами своего Black Sword повергает их.',
    abilities: {
      'Armour of Faith':
        'Один раз за фазу, когда атака распределяется по этой модели и спас-бросок провален, вы можете изменить характеристику Урона (Damage) этой атаки на 0.',
      'Sigismund’s Heir':
        'Каждый раз, когда юнит этой модели объявляет нападение, если одна или более целей этого нападения имеют ключевое слово CHARACTER, прибавьте 2 к броску нападения. Один раз за битву, когда юнит этой модели выбирается для схватки, если этот юнит находится в дистанции ввязывания одного или более вражеских юнитов CHARACTER, эта модель может задействовать эту способность. Если она это делает, до конца фазы оружие ближнего боя этой модели имеет способность [DEVASTATING WOUNDS].',
    },
    special: {
      'CHOSEN OF THE EMPEROR':
        'Вы не можете включить в свою армию более одной модели EMPEROR’S CHAMPION.',
    },
    loadout: `${EQUIP_THIS} bolt pistol; Black Sword.`,
    leader: { text: LEADER_TEXT },
  },

  execrator: {
    flavor:
      'Execrator — живые образцы клятв своих братьев, свирепые воины-жрецы, что ведут Black Templars в смертоносных буйствах. Они учат, что война — достойнейшая часовня для воинов, и каждый разящий удар их crozius arcanum сопровождается ревностной бранью и рыком проповедей.',
    abilities: {
      'Remorseless Persecution':
        'Пока эта модель возглавляет юнит, этот юнит может объявить нападение в ход, в который он продвигался.',
      'Condemnatory Annihilation':
        'Каждый раз, когда юнит этой модели отсражался, если в результате этих атак был уничтожен один или более вражеских юнитов, каждый вражеский юнит в пределах 6" от этой модели обязан пройти проверку боевого шока.',
    },
    loadout: `${EQUIP_THIS} absolvor bolt pistol; crozius arcanum.`,
    options: [
      'absolvor bolt pistol этой модели можно заменить на 1 pyre pistol.',
      'Если эта модель вооружена absolvor bolt pistol, её можно снабдить 1 master-crafted power weapon (absolvor bolt pistol этой модели заменить нельзя).',
    ],
    leader: { text: LEADER_TEXT },
  },

  'high-marshal-helbrecht': {
    flavor:
      'Хелбрехт — живое воплощение воинского духа своего Ордена. Владея Sword of the High Marshals, он врывается в схватку, рыча клятвы мести, ведя неудержимую атаку. Братья следуют за ним без вопросов, ибо верят: где ступает Верховный маршал Хелбрехт, там идёт и сам Император.',
    abilities: {
      'Crusade of Wrath':
        'Пока эта модель возглавляет юнит, прибавьте 1 к характеристикам Атак (Attacks) и Силы (Strength) оружия ближнего боя моделей этого юнита.',
      'High Marshal':
        'В начале фазы ближнего боя выберите один вражеский юнит в дистанции ввязывания юнита этой модели и бросьте один D6, прибавляя 1 к результату за каждые пять моделей в юните этой модели: на 2–3 этот вражеский юнит получает D3 смертельные раны; на 4–5 — 3 смертельные раны; на 6+ — D3+3 смертельные раны.',
    },
    loadout: `${EQUIP_THIS} Ferocity; Sword of the High Marshals.`,
    options: ['Нет.'],
    leader: { text: LEADER_TEXT },
  },

  marshal: {
    flavor:
      'Каждый крестовый поход Black Templars ведёт Marshal. По рангу схожие с капитанами других Орденов, Marshal — грозные бойцы и образцы стратегической проницательности. Обеспечивать чистоту и успех похода — священный долг, и Marshal сражаются освящённым реликтовым оружием, служа маяками благочестивого рвения для своих воинов.',
    abilities: {
      'Inspirational Exemplar':
        'Пока эта модель возглавляет юнит, каждый раз, когда модель этого юнита совершает атаку ближнего боя, немодифицированный бросок попадания 5+ засчитывается как критическое попадание.',
      'Pious Fervour':
        'Каждый раз, когда юнит этой модели выбирается для схватки, до конца фазы прибавьте 1 к характеристике Атак (Attacks) master-crafted power weapon этой модели за каждый вражеский юнит в пределах 6" от этой модели (максимум +3).',
    },
    loadout: `${EQUIP_THIS} plasma pistol; master-crafted power weapon.`,
    options: ['plasma pistol этой модели можно заменить на 1 combi-weapon.'],
    leader: { text: LEADER_TEXT },
  },

  'sword-brethren-squad': {
    flavor:
      'Каждый Sword Brother заслужил своё место в свите Marshal деяниями непоколебимой веры и зрелищного насилия. На поле боя они — жнущие вихри: неудержимые, бескомпромиссные и вооружённые смертоносным набором оружия, они обрушиваются на врага во имя Императора.',
    abilities: {
      'Exploit Their Cowardice':
        'Каждый раз, когда вражеский юнит в дистанции ввязывания этого юнита выбирается для отступления, после того как он завершил это отступление, если этот юнит не находится в дистанции ввязывания одного или более вражеских юнитов, он может совершить обычный манёвр.',
    },
    loadout: `${EQUIP_EVERY} heavy bolt pistol; Astartes chainsword.`,
    options: [
      'Любому числу Sword Brother их Astartes chainsword можно заменить на 1 master-crafted power weapon.',
      'За каждые 5 моделей в этом юните у 1 Sword Brother его Astartes chainsword можно заменить на 1 thunder hammer.',
      'За каждые 5 моделей в этом юните у 1 Sword Brother его heavy bolt pistol можно заменить на 1 plasma pistol.',
      'За каждые 5 моделей в этом юните у до 2 Sword Brother их heavy bolt pistol можно заменить на 1 pyre pistol.',
      'За каждые 5 моделей в этом юните у 1 Sword Brother его heavy bolt pistol и Astartes chainsword можно заменить на 1 twin lightning claws.',
    ],
  },
}

export const abilityNamesRu = {
  ...smNames,
  'Vehement Aggression': 'Яростный напор',
  'Prioritised Eradication': 'Приоритетное истребление',
  'Litanies of the Devout': 'Литании верных',
  'Temple Relics': 'Храмовые реликвии',
  'Banner of the Emperor Victorious': 'Штандарт Императора-победителя',
  'Column from the Major Altar': 'Колонна с Главного алтаря',
  'Water from the Stoup of Elucidation': 'Вода из чаши Прозрения',
  'Vengeful Exhortation': 'Мстительный призыв',
  'Martial Honour': 'Воинская честь',
  'Righteous Zeal': 'Праведное рвение',
  'Armour of Faith': 'Доспех веры',
  'Sigismund’s Heir': 'Наследник Сигизмунда',
  'Remorseless Persecution': 'Беспощадное преследование',
  'Condemnatory Annihilation': 'Обличающее уничтожение',
  'Crusade of Wrath': 'Крестовый поход гнева',
  'High Marshal': 'Верховный маршал',
  'Inspirational Exemplar': 'Вдохновляющий образец',
  'Pious Fervour': 'Благочестивое рвение',
  'Exploit Their Cowardice': 'Используй их трусость',
}
