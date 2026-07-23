// Genestealer Cults — army-rule tracker spec: Cult Ambush / the Resurgence-point pool.
//
// A `counter` primitive with a battle-size `start`: unlike Drukhari's Pain tokens (which begin at 0
// and grow), you START the battle with a pool of Resurgence points fixed by battle size (Incursion 6
// / Strike Force 10 / Onslaught 14) and spend down over the whole game — the pool does NOT refresh
// each round (that's the Aeldari `pool` primitive). So the widget defaults an untouched counter to
// `start[battleSize]` instead of 0, and you step it DOWN as you resurrect destroyed units.
//
// The "Deeds That Speak to the Masses" enhancement grants +2 starting points, but the tracker
// doesn't record enhancement picks (only detachments), so that can't be a `start` override — it's a
// manual +2 the player bumps, called out in the note. No detachment changes the starting pool, so
// detachmentOverrides is empty. Unit/keyword names stay English; rules text is translated.
export default {
  slug: 'genestealer-cults',
  kind: 'counter',

  ruleName: 'Cult Ambush',
  label: 'Resurgence points',
  min: 0,

  // Starting pool by the tracker's battleSize id (src/composables/useTracker.js BATTLE_SIZES). The
  // card defaults an untouched counter to this (see ArmyTrackerCard `counterStart`).
  start: { incursion: 6, strikeForce: 10, onslaught: 14 },

  // One-tap resurrect costs: each entry subtracts `cost` Resurgence points from the pool when a unit
  // of that type + Starting Strength is destroyed. Labels are unit names (kept English) + the model
  // count, language-agnostic. The card disables an entry the pool can't afford.
  spends: [
    { label: 'Aberrants ×5', cost: 4 },
    { label: 'Aberrants ×10', cost: 8 },
    { label: 'Acolytes / Metamorphs ×5', cost: 2 },
    { label: 'Acolytes / Metamorphs ×10', cost: 4 },
    { label: 'Atalan Jackals ×5', cost: 2 },
    { label: 'Atalan Jackals ×10', cost: 6 },
    { label: 'Neophytes ×10', cost: 3 },
    { label: 'Neophytes ×20', cost: 6 },
    { label: 'Purestrains ×5', cost: 2 },
    { label: 'Purestrains ×10', cost: 6 },
  ],

  note: {
    en: 'When a unit whose every model has Cult Ambush is destroyed, spend the points above to return it in Cult Ambush at Starting Strength and place a Cult Ambush marker. Points are set at the start of battle and are not replenished. The Deeds That Speak to the Masses enhancement starts you with +2.',
    ru: 'Когда уничтожен отряд, где у всех моделей есть Cult Ambush, потрать указанные очки, чтобы вернуть его в Cult Ambush на Starting Strength и поставить маркер Cult Ambush. Очки задаются в начале боя и не восполняются. Энхансмент Deeds That Speak to the Masses даёт +2 к старту.',
  },

  detachmentOverrides: {},
}
