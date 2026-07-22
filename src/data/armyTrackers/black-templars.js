// Black Templars — army-rule tracker spec: Templar Vows.
//
// A `selection` primitive with `once: true` — a BATTLE-LONG pick, not the per-round choice AdMech's
// Doctrina Imperatives make. At the start of the first battle round you select one of four Vows to
// be active for your Adeptus Astartes units for the whole game, so the choice is stored once
// (army.choice) rather than keyed by round. (Only Black Templars use Templar Vows; the other five
// SM chapters keep Oath of Moment, which isn't a fixed-set pick — so this spec is BT-only.)
//
// The option `body` texts are self-contained condensations of each Vow's rules (the specs never
// import faction data), keyword names kept English, rules text translated. No detachment changes the
// Vow set, so detachmentOverrides is empty.
export default {
  slug: 'black-templars',
  kind: 'selection',
  once: true,

  ruleName: 'Templar Vows',
  label: 'Templar Vow',

  options: [
    {
      id: 'abhor-the-witch',
      name: 'Abhor the Witch, Destroy the Witch',
      body: {
        en: 'Melee attacks that target a Psyker unit have the [PRECISION] ability. When this unit declares a charge and an enemy Psyker unit is within 12", you can re-roll the Charge roll (if you do, it must end engaged with one or more of those Psyker units).',
        ru: 'Melee-атаки по отряду Psyker получают [PRECISION]. Когда отряд объявляет charge и вражеский Psyker в пределах 12", можно перебросить Charge roll (тогда отряд должен закончить charge move engaged с одним из этих Psyker-отрядов).',
      },
    },
    {
      id: 'accept-any-challenge',
      name: 'Accept Any Challenge, No Matter the Odds',
      body: {
        en: 'Each time a model in this unit makes a melee attack, if the attack’s Strength is less than or equal to the target’s Toughness, add 1 to the Wound roll.',
        ru: 'Каждый раз, когда модель отряда делает melee-атаку, если Strength атаки ≤ Toughness цели, добавь 1 к Wound roll.',
      },
    },
    {
      id: 'suffer-not-the-unclean',
      name: 'Suffer Not the Unclean to Live',
      body: {
        en: 'This unit is eligible to declare a charge in a turn in which it Fell Back. Each time a model in it makes a Pile-in or Consolidation move, it does not need to end closer to the closest enemy model, provided it ends as close as possible to the closest enemy unit.',
        ru: 'Отряд может объявить charge в ход, когда он совершил Fall Back. Каждый раз при Pile-in или Consolidation move модель не обязана заканчивать ближе к ближайшей вражеской модели, если заканчивает как можно ближе к ближайшему вражескому отряду.',
      },
    },
    {
      id: 'uphold-the-honour',
      name: 'Uphold the Honour of the Emperor',
      body: {
        en: 'Infantry only. At the end of your Command phase, if within range of an objective marker you control, it stays under your control until your opponent’s Level of Control over it is greater at the end of a phase. If the mission features Actions, this unit is eligible to start an Action in a turn in which it Advanced.',
        ru: 'Только Infantry. В конце твоей Command phase, если отряд в пределах objective marker под твоим контролем, он остаётся твоим, пока Level of Control противника не станет выше в конце фазы. Если в миссии есть Actions, отряд может начать Action в ход, когда он Advanced.',
      },
    },
  ],

  note: {
    en: 'Chosen once at the start of the first battle round and active for your Adeptus Astartes units for the rest of the game.',
    ru: 'Выбирается один раз в начале первого раунда и действует на твои Adeptus Astartes-отряды до конца игры.',
  },

  detachmentOverrides: {},
}
