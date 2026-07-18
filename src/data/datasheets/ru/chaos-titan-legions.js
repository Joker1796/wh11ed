// Chaos Titan Legions — русский перевод листов данных. Те же 4 датащита, что и Titan
// Legions (см. ./titan-legions.js), но с keyword Chaos вместо Imperium и своими id/названиями
// (Chaos Reaver Titan и т.п. — appdata уже даёт их отдельным, полностью переоформленным
// набором листов, а не выводит перезаписью общих). Разреженный оверлей: переведены только
// тексты (flavor, тексты способностей, loadout, options, damaged). Имена юнитов/оружия,
// характеристики, keywords, [BRACKET]-теги, core/faction-правила остаются английскими.
// `abilityNamesRu` (внизу) даёт RU-подписи для названий способностей.

const EQUIP_THIS = '**Эта модель вооружена:**'

export default {
  'chaos-reaver-titan': {
    flavor:
      'Reaver Titan — исполинские богомашины, обладающие поистине разрушительной огневой мощью. От apocalypse launcher, установленного на карапасе, до laser blaster на руке — Reaver с лёгкостью сметает пехотные порядки, а его void shields и толстый адамантиевый корпус сводят на нет все, кроме самых пробивных вражеских ударов.',
    abilities: {
      'Striding Colossus':
        'Каждый раз, когда вы нацеливаете стратагему на эту модель, вы обязаны потратить втрое больше заявленной стоимости этой стратагемы в CP.',
      'God-machine':
        'Эта модель может стрелять и объявлять нападение в ход, в который она отступила.',
    },
    damaged: {
      note: 'осталось 1–20 ран',
      text: 'Пока у этой модели осталось 1–20 ран, вычтите 10 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_THIS} Reaver apocalypse launcher; Reaver gatling blaster; Reaver laser blaster; Reaver feet.`,
    options: [
      'Reaver gatling blaster этой модели можно заменить на одно из следующего:\n▪ 1 Reaver laser blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon\n▪ 1 Reaver power fist',
      'Reaver laser blaster этой модели можно заменить на одно из следующего:\n▪ 1 Reaver gatling blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon',
    ],
  },

  'chaos-warbringer-nemesis-titan': {
    flavor:
      'Warbringer Nemesis Titan — исполинская боевая машина, созданная для уничтожения вражеских целей класса «титан» на дистанции. Действуя как выделенная платформа огневой поддержки, Nemesis благодаря усиленной лобовой броне легко выдерживает большую часть ответного огня, а его defence batteries обеспечивают надёжную защиту от атак с воздуха.',
    abilities: {
      'Striding Colossus':
        'Каждый раз, когда вы нацеливаете стратагему на эту модель, вы обязаны потратить втрое больше заявленной стоимости этой стратагемы в CP.',
      'Titanic Fire Support':
        'В вашей фазе стрельбы, после того как эта модель выстрелила, выберите один вражеский юнит, поражённый одной или более из этих атак. До конца фазы каждый раз, когда дружественная модель CHAOS совершает атаку, нацеленную на этот вражеский юнит, при критическом ранении улучшайте характеристику Бронепробития (AP) этой атаки на 1.',
    },
    damaged: {
      note: 'осталось 1–26 ран',
      text: 'Пока у этой модели осталось 1–26 ран, вычтите 10 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_THIS} 2 anvillus defence batteries; 3 ardex-defensor maulers; Nemesis quake cannon; Reaver gatling blaster; Reaver laser blaster; Nemesis feet.`,
    options: [
      'Nemesis quake cannon этой модели можно заменить на 1 Nemesis volcano cannon.',
      'Reaver gatling blaster этой модели можно заменить на одно из следующего:\n▪ 1 Reaver laser blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon',
      'Reaver laser blaster этой модели можно заменить на одно из следующего:\n▪ 1 Reaver gatling blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon',
    ],
  },

  'chaos-warhound-titan': {
    flavor:
      'Warhound — глаза и уши Titan Legions, используемые для опасных разведывательных и рейдовых операций. Несмотря на то, что это самый малый класс титанов, один Warhound способен легко переломить ход битвы, поддерживая наземные силы: чистая мощь его вооружения и брони превосходит возможности большинства противников.',
    abilities: {
      'Striding Colossus':
        'Каждый раз, когда вы нацеливаете стратагему на эту модель, вы обязаны потратить вдвое больше заявленной стоимости этой стратагемы в CP.',
      'Flank Speed':
        'Каждый раз, когда эта модель продвигается, не делайте бросок продвижения для неё. Вместо этого до конца фазы прибавьте 8" к характеристике Перемещения (Move) этой модели.',
    },
    damaged: {
      note: 'осталось 1–13 ран',
      text: 'Пока у этой модели осталось 1–13 ран, вычтите 8 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_THIS} Warhound plasma blastgun; Warhound vulcan mega-bolter; Warhound feet.`,
    options: [
      'Warhound plasma blastgun этой модели можно заменить на одно из следующего:\n▪ 1 Warhound inferno gun\n▪ 1 Warhound turbo-laser destructor\n▪ 1 Warhound vulcan mega-bolter',
      'Warhound vulcan mega-bolter этой модели можно заменить на одно из следующего:\n▪ 1 Warhound inferno gun\n▪ 1 Warhound plasma blastgun\n▪ 1 Warhound turbo-laser destructor',
    ],
  },

  'chaos-warlord-titan': {
    flavor:
      'Warlord Titan — исполинское воплощение гнева Omnissiah. Обладая разрушительной мощью небольшого военного корабля и стойкостью крепости, Warlord властвует почти над любым противником, неся гибель каждым громовым залпом своего оружия и сокрушая уцелевших сотрясающей землю поступью.',
    abilities: {
      'Striding Colossus':
        'Каждый раз, когда вы нацеливаете стратагему на эту модель, вы обязаны потратить вчетверо больше заявленной стоимости этой стратагемы в CP.',
      'Wrath of the Omnissiah':
        'В вашей фазе стрельбы, после того как эта модель выстрелила, выберите один вражеский юнит, поражённый одной или более из этих атак. Этот юнит обязан пройти проверку боевого шока.',
    },
    damaged: {
      note: 'осталось 1–33 ран',
      text: 'Пока у этой модели осталось 1–33 ран, вычтите 15 из характеристики Контроля целей (OC) этой модели, и каждый раз, когда эта модель совершает атаку, вычтите 1 из броска попадания.',
    },
    loadout: `${EQUIP_THIS} 2 apocalypse launchers; 2 ardex-defensor lascannons; 2 ardex-defensor maulers; macro gatling blaster; arioch power claw; Warlord feet.`,
    options: [
      '2 apocalypse launchers этой модели можно заменить на 2 laser blasters.',
      'Arioch power claw этой модели можно заменить на одно из следующего:\n▪ 1 belicosa volcano cannon\n▪ 1 macro gatling blaster\n▪ 1 mori quake cannon\n▪ 1 sunfury plasma annihilator',
      'Macro gatling blaster этой модели можно заменить на одно из следующего:\n▪ 1 arioch power claw\n▪ 1 belicosa volcano cannon\n▪ 1 mori quake cannon\n▪ 1 sunfury plasma annihilator',
    ],
  },
}

export const abilityNamesRu = {
  'Striding Colossus': 'Шагающий колосс',
  'God-machine': 'Машина-бог',
  'Titanic Fire Support': 'Титаническая огневая поддержка',
  'Flank Speed': 'Полный ход',
  'Wrath of the Omnissiah': 'Гнев Omnissiah',
}
