// Orks — army-rule tracker spec: Waaagh!.
//
// A `toggle` primitive: once per battle, at the start of your Command phase, you can call a Waaagh!.
// The tracker records the round it was called (a single fire) and reveals its effects; a reset
// clears it (undo a mis-tap). The exact active window ("until the start of your next Command
// phase") is fuzzy in round terms, so the card records WHEN it was called rather than claiming an
// on/off window the tracker can't pin down precisely.
//
// A real detachment override: the Bully Boyz Detachment rule "Da Boss Is Watchin'" lets you call a
// SECOND Waaagh! (with a Warboss on the board). That's a Detachment rule — not an enhancement — so
// the tracker can auto-detect it from player.detachments and only then offer the second fire.
// Keywords/characteristics stay English.
export default {
  slug: 'orks',
  kind: 'toggle',

  // label doubles as the rule name here (both are "Waaagh!"), so no separate ruleName.
  label: 'Waaagh!',
  // Base: once per battle. (Bully Boyz raises this to 2 — see detachmentOverrides.)
  maxUses: 1,

  // What applies while the Waaagh! is active — revealed once it's called.
  effect: {
    name: 'Waaagh! active',
    body: {
      en: `▪ Units from your army with this ability are eligible to declare a charge in a turn in which they Advanced.
▪ Add 1 to the Strength and Attacks characteristics of melee weapons equipped by models from your army with this ability.
▪ Models from your army with this ability have a 5+ invulnerable save.`,
      ru: `▪ Отряды твоей армии с этой способностью могут объявлять charge в ход, в котором они совершили Advance.
▪ Добавь 1 к характеристикам Strength и Attacks melee-оружия моделей твоей армии с этой способностью.
▪ Модели твоей армии с этой способностью получают 5+ invulnerable save.`,
    },
  },

  note: {
    en: 'Once per battle, at the start of your Command phase — active until the start of your next Command phase.',
    ru: 'Раз за бой, в начале твоей Command phase — активен до начала твоей следующей Command phase.',
  },

  // Keyed by the (normalized) detachment name the tracker stores in player.detachments.
  detachmentOverrides: {
    'bully boyz': {
      maxUses: 2,
      againLabel: { en: 'Second Waaagh!', ru: 'Второй Waaagh!' },
      note: {
        en: "Once per battle, at the start of your Command phase — active until the start of your next Command phase. Bully Boyz (Da Boss Is Watchin'): with a Warboss on the board you can call a second Waaagh!, which only counts for Warboss, Nobz and Meganobz units.",
        ru: "Раз за бой, в начале твоей Command phase — активен до начала твоей следующей Command phase. Bully Boyz (Da Boss Is Watchin'): при Warboss на столе можно вызвать второй Waaagh!, который действует только на отряды Warboss, Nobz и Meganobz.",
      },
    },
  },
}
