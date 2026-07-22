// Death Guard — army-rule tracker spec: Nurgle's Gift / the Afflicted Plague pick + Contagion Range.
//
// A `selection` primitive with `once: true` (reusing the Black Templars battle-long pick): during
// Declare Battle Formations you choose one Plague, active for the whole game — stored once
// (army.choice), not per round. On top of that, this rule has a value that ESCALATES by battle round
// (Contagion Range: 3" in round 1, 6" from round 2), which no other primitive tracks — so the spec
// carries a `roundReadout` (round → display value) the card surfaces above the choice.
//
// Contagion Range / Afflicted / Plague and the Plague names stay English (matching the RU faction
// overlay's own convention); the Plague effect text is translated. No detachment changes the Plague
// set, so detachmentOverrides is empty.
export default {
  slug: 'death-guard',
  kind: 'selection',
  once: true,

  ruleName: "Nurgle's Gift",
  label: 'Plague',

  // A battle-round-gated readout shown above the choice: rounds listed in `byRound` use their value,
  // any other round uses `fallback`. Values are language-agnostic strings; label/note localize.
  roundReadout: {
    label: 'Contagion Range',
    byRound: { 1: '3"' },
    fallback: '6"',
    note: { en: 'max 12" after modifiers', ru: 'максимум 12" после модификаторов' },
  },

  options: [
    {
      id: 'skullsquirm-blight',
      name: 'Skullsquirm Blight',
      body: {
        en: 'Each time a model in this unit makes a melee attack, subtract 1 from the Hit roll.',
        ru: 'Каждый раз, когда модель этого юнита совершает атаку ближнего боя, вычитайте 1 из броска на попадание.',
      },
    },
    {
      id: 'rattlejoint-ague',
      name: 'Rattlejoint Ague',
      body: {
        en: 'Worsen the Save characteristic of models in this unit by 1.',
        ru: 'Ухудшите характеристику спас-броска моделей этого юнита на 1.',
      },
    },
    {
      id: 'scabrous-soulrot',
      name: 'Scabrous Soulrot',
      body: {
        en: 'Worsen the Move, Leadership and Objective Control characteristics of models in this unit by 1 (Objective Control to a minimum of 1).',
        ru: 'Ухудшите характеристики манёвра, лидерства и контроля целей моделей этого юнита на 1 (контроль целей — до минимума 1).',
      },
    },
  ],

  note: {
    en: 'Pick one Plague during Declare Battle Formations, active all game. While an enemy unit is within Contagion Range of a Death Guard model from your army it is Afflicted: subtract 1 from its Toughness, and it suffers your chosen Plague’s effect.',
    ru: 'Выберите один Plague в шаге «Объявление боевых построений», действует всю игру. Пока вражеский юнит в пределах Contagion Range модели Death Guard вашей армии, он Afflicted: вычтите 1 из его Toughness, и на него действует эффект выбранного Plague.',
  },

  detachmentOverrides: {},
}
