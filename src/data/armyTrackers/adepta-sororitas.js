// Adepta Sororitas — army-rule tracker spec: Acts of Faith / the Miracle dice pool.
//
// A `dice` primitive: a bank of D6 values. You gain a Miracle die (rolling its value) at the start
// of each battle round and whenever a Sororitas unit is destroyed, and spend one to substitute a
// dice roll for a unit with Acts of Faith. A die's value can't be changed once rolled, so the pool
// only adds (by rolled value) and removes (spends) — no in-place edit. Gains/spends are army-rule
// level (detachments add Acts, not new maths), so detachmentOverrides is empty. Keywords stay
// English; rules text is translated.
export default {
  slug: 'adepta-sororitas',
  kind: 'dice',

  ruleName: 'Acts of Faith',
  label: 'Miracle dice',

  gains: [
    { en: '+1 at the start of each battle round', ru: '+1 в начале каждого раунда боя' },
    {
      en: '+1 each time an Adepta Sororitas unit from your army is destroyed',
      ru: '+1 каждый раз, когда уничтожается отряд Adepta Sororitas твоей армии',
    },
    { en: 'Roll a D6 for each die gained — that is its value', ru: 'За каждый полученный кубик брось D6 — это его значение' },
  ],

  note: {
    en: 'Spend a die to substitute one roll for a unit with Acts of Faith — an Advance, Charge, Hit, Wound, Save, Damage or Battle-shock roll (the die counts as that unmodified result). A die\'s value can\'t be changed or re-rolled.',
    ru: 'Потрать кубик, чтобы заменить один бросок отряда со способностью Acts of Faith — Advance, Charge, Hit, Wound, Save, Damage или Battle-shock (кубик считается этим немодифицированным результатом). Значение кубика нельзя менять или перебрасывать.',
  },

  detachmentOverrides: {},
}
