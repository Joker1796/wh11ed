// Adeptus Mechanicus — army-rule tracker spec: Doctrina Imperatives.
//
// A `selection` primitive: at the start of each battle round you pick one Imperative, active for
// your whole army until the end of that round. It resets every round, so the tracker keys the pick
// by round. Only Protector and Conqueror are selectable (the "Aggressor/Bulwark Imperative" you'll
// see in Rad-Zone Corps are stratagems, not selectable Imperatives; no detachment adds a selectable
// one), so `detachmentOverrides` is empty — but the resolver's option-merge machinery is in place
// for any faction that does add options. Ability names are game terms (English); bodies are rules
// text (translated). Weapon/characteristic keywords ([HEAVY], Ballistic Skill, …) stay English.
export default {
  slug: 'adeptus-mechanicus',
  kind: 'selection',

  ruleName: 'Doctrina Imperatives',
  label: 'Doctrina Imperative',

  options: [
    {
      id: 'protector',
      name: 'Protector Imperative',
      body: {
        en: `▪ Ranged weapons equipped by models in this unit have the [HEAVY] ability.
▪ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.
▪ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.`,
        ru: `▪ Ranged-оружие моделей этого отряда получает способность [HEAVY].
▪ Улучши характеристику Ballistic Skill ranged-оружия моделей этого отряда на 1.
▪ Каждый раз, когда melee-атака нацелена на этот отряд, если у отряда есть ключевое слово Battleline и/или он в пределах 6" от одного или более дружественных отрядов Adeptus Mechanicus Battleline, вычти 1 из Hit roll.`,
      },
    },
    {
      id: 'conqueror',
      name: 'Conqueror Imperative',
      body: {
        en: `▪ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.
▪ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.
▪ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.`,
        ru: `▪ Ranged-оружие моделей этого отряда получает способность [ASSAULT].
▪ Улучши характеристику Weapon Skill melee-оружия моделей этого отряда на 1.
▪ Каждый раз, когда модель этого отряда совершает атаку, если у отряда есть ключевое слово Battleline и/или он в пределах 6" от одного или более дружественных отрядов Adeptus Mechanicus Battleline, улучши Armour Penetration этой атаки на 1.`,
      },
    },
  ],

  note: {
    en: 'At the start of each battle round, pick one Imperative — it stays active for your whole army until the end of that round.',
    ru: 'В начале каждого раунда боя выбери один Imperative — он активен для всей армии до конца этого раунда.',
  },

  detachmentOverrides: {},
}
