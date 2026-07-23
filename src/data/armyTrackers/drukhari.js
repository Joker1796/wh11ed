// Drukhari — army-rule tracker spec: the Power From Pain / Pain token economy.
//
// A `counter` primitive: one growing/shrinking pool per player. Gains and the start-of-battle
// bonus are army-rule level (detachment-independent); detachments/stratagems/enhancements only add
// new ways to SPEND tokens (and one enhancement makes a unit always-Empowered for 0 tokens), so the
// counter's own maths is detachment-stable — hence `detachmentOverrides` is empty for now. Those
// extra spend-sinks are reference material we can surface per-detachment later without changing the
// pool.
//
// String fields are either a plain string (an English game term kept identical in both locales,
// like CP / "Pain tokens") or a bilingual { en, ru } object (rules text, which IS translated).
export default {
  slug: 'drukhari',
  kind: 'counter',

  // Links the widget back to the reference rule; English game term.
  ruleName: 'Power From Pain',
  // Resource label — an English game term (same convention as CP staying English in the tracker).
  label: 'Pain tokens',
  min: 0,

  // When the pool grows — shown as reminders next to the stepper (you bump it yourself).
  gains: [
    { en: '+1 at the start of your Command phase', ru: '+1 в начале твоей Command phase' },
    { en: '+1 each time an enemy unit is destroyed', ru: '+1 за каждый уничтоженный вражеский юнит' },
    {
      en: '+1 each time an enemy unit fails a Battle-shock test',
      ru: '+1 каждый раз, когда вражеский юнит проваливает Battle-shock тест',
    },
  ],

  note: {
    en: 'Spend tokens to Empower units and activate their Pain abilities. Start of battle: +2 per listed keyword combination your army contains (max 6).',
    ru: 'Трать токены, чтобы Empower юниты и активировать их Pain-способности. В начале битвы: +2 за каждую указанную в правиле комбинацию ключевых слов в армии (максимум 6).',
  },

  // Per-detachment overrides, keyed by (apostrophe/case-insensitive) detachment name. Empty for
  // Drukhari: detachments change how tokens are spent, not how the pool is counted.
  detachmentOverrides: {},
}
