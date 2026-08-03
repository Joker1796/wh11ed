// Leagues of Votann — army-rule tracker spec: Prioritised Efficiency / the Yield Points economy.
//
// A `counter` primitive with a THRESHOLD: at the end of your Command phase, your units switch
// ability based on how many YP you have — under 7 they have Hostile Acquisition, 7+ Fortify
// Takeover (until your next Command phase). The counter shows the active ability at the current
// value. YP gains are army-rule level; detachments/stratagems add extra ways to gain or spend YP,
// but the pool maths and the threshold are unchanged, so `detachmentOverrides` stays empty (those
// extras are reference material). Same string convention as the other specs (plain string = English
// game term; { en, ru } = translated rules text). Ability names are game terms — kept English.
export default {
  slug: 'leagues-of-votann',
  kind: 'counter',

  ruleName: 'Prioritised Efficiency',
  label: 'Yield points',
  min: 0,

  // Which ability is active at the current YP (checked at the end of your Command phase). Each
  // state carries its rule text (`body`, RuleBlock/RuleBody markup), revealed on demand in the card.
  // Ability names are game terms (English); the bodies are rules text (translated).
  threshold: {
    at: 7,
    below: {
      name: 'Hostile Acquisition',
      body: {
        en: `▪ Each time a model in this unit makes an attack that targets an enemy unit within range of one or more objective markers, add 1 to the Hit roll.
▪ You can re-roll Advance and Charge rolls made for this unit.`,
        ru: `▪ Каждый раз, когда модель в этом отряде совершает атаку по вражескому отряду в радиусе одного или более маркеров объектива, добавь 1 к Hit roll.
▪ Можешь перебрасывать Advance и Charge roll этого отряда.`,
      },
    },
    atOrAbove: {
      name: 'Fortify Takeover',
      body: {
        en: `▪ Each time a model in this unit makes an attack that targets an enemy unit, if this unit is within range of one or more objective markers you control, add 1 to the Hit roll.
▪ Each time an attack targets this unit, if the Strength characteristic of that attack is greater than this unit's Toughness characteristic and this unit is not a VEHICLE, subtract 1 from the Wound roll.`,
        ru: `▪ Каждый раз, когда модель в этом отряде совершает атаку по вражескому отряду, если отряд в радиусе одного или более контролируемых тобой маркеров объектива, добавь 1 к Hit roll.
▪ Каждый раз, когда атака нацелена на этот отряд, если Strength атаки больше Toughness отряда и отряд не VEHICLE, вычти 1 из Wound roll.`,
      },
    },
  },

  // Checked at the end of each player's Command phase.
  gains: [
    {
      en: '+1 if you control an objective in your deployment zone',
      ru: '+1 если контролируешь объектив в своей зоне развёртывания',
    },
    {
      en: 'Round 2+: +1 if you control an objective outside your deployment zone',
      ru: 'Раунд 2+: +1 если контролируешь объектив вне своей зоны развёртывания',
    },
    {
      en: 'Round 2+: +1 if you control 2+ objectives outside your deployment zone',
      ru: 'Раунд 2+: +1 если контролируешь 2+ объектива вне своей зоны развёртывания',
    },
    {
      en: 'Round 2+: +1 if you control more objectives than your opponent',
      ru: 'Раунд 2+: +1 если контролируешь больше объективов, чем оппонент',
    },
  ],

  note: {
    en: 'Your army changes ability only at the end of your Command phase — spending or gaining YP before that check can flip Hostile Acquisition ↔ Fortify Takeover. YP cannot go below 0.',
    ru: 'Армия меняет способность только в конце твоей Command phase — трата или добор YP до этой проверки переключает Hostile Acquisition ↔ Fortify Takeover. YP не может уйти ниже 0.',
  },

  detachmentOverrides: {},
}
