// Thousand Sons — army-rule tracker spec: Cabal of Sorcerers / the four Rituals.
//
// A `multi` primitive (same one World Eaters' Blessings use): at the start of your Shooting phase
// each eligible Sorcerer may attempt a Ritual, and each Ritual can be manifested only ONCE per turn.
// So the trackable state is a per-turn checklist of which of the four Rituals have gone off — exactly
// a capped multi-select that resets each round (army.multiByRound). The app doesn't roll the Psychic
// test (the player does on the table); `req` carries each Ritual's Warp Charge as a reminder, and the
// body notes the escalating high-roll tier (10+/11+/12+).
//
// max is 4 (the four Rituals) — there's no tighter cap the app can enforce (how many you attempt
// depends on how many Sorcerers you field), and a Ritual is inherently once-per-turn (multi dedupes).
// The tracker's granularity is the battle round, not the individual turn, so the checklist resets per
// round like the other per-round trackers. Ritual names stay English; rules text is translated.
export default {
  slug: 'thousand-sons',
  kind: 'multi',
  max: 4,

  ruleName: 'Cabal of Sorcerers',
  label: 'Rituals',

  options: [
    {
      id: 'destinys-ruin',
      name: "Destiny's Ruin",
      req: 'WC 5',
      body: {
        en: 'Select one enemy unit within 24" and visible. Until the end of the phase, each time a Thousand Sons or Scintillating Legions model attacks it, re-roll a Hit roll of 1. If the Psychic test result was 10+, you can re-roll any Hit roll instead.',
        ru: 'Выбери вражеский отряд в пределах 24" и в видимости. До конца фазы каждый раз, когда модель Thousand Sons или Scintillating Legions атакует его, перебрасывай Hit roll 1. Если результат Psychic test был 10+ — можно перебрасывать любой Hit roll.',
      },
    },
    {
      id: 'temporal-surge',
      name: 'Temporal Surge',
      req: 'WC 6',
      body: {
        en: 'Select one friendly Thousand Sons or Scintillating Legions unit not within Engagement Range, within 24" and visible. It can make a Normal move of up to D6" (up to 6" if the Psychic test result was 10+). It can\'t declare a charge this turn.',
        ru: 'Выбери дружественный отряд Thousand Sons или Scintillating Legions вне Engagement Range, в пределах 24" и в видимости. Он делает Normal move до D6" (до 6", если результат Psychic test был 10+). В этот ход он не может объявлять charge.',
      },
    },
    {
      id: 'doombolt',
      name: 'Doombolt',
      req: 'WC 7',
      body: {
        en: 'Select one enemy unit within 24" and visible (with the Lone Operative caveats). It suffers D3 mortal wounds (D3+3 if the Psychic test result was 11+).',
        ru: 'Выбери вражеский отряд в пределах 24" и в видимости (с оговорками про Lone Operative). Он получает D3 mortal wounds (D3+3, если результат Psychic test был 11+).',
      },
    },
    {
      id: 'twist-of-fate',
      name: 'Twist of Fate',
      req: 'WC 9',
      body: {
        en: 'Select one enemy unit within 24" and visible. Until the end of the phase, each time a Thousand Sons or Scintillating Legions model attacks it, improve that attack\'s Armour Penetration by 1 (by 2 if the Psychic test result was 12+).',
        ru: 'Выбери вражеский отряд в пределах 24" и в видимости. До конца фазы каждый раз, когда модель Thousand Sons или Scintillating Legions атакует его, улучшай Armour Penetration этой атаки на 1 (на 2, если результат Psychic test был 12+).',
      },
    },
  ],

  note: {
    en: 'At the start of your Shooting phase, each eligible model may attempt one Ritual (a model attempts at most one per turn; each Ritual can be attempted only once per turn). Psychic test: roll 2D6 (optional Channel the Warp: +1D6, but on any double or triple the model\'s unit suffers D3 mortal wounds). The Ritual manifests if the total meets its Warp Charge.',
    ru: 'В начале твоей Shooting phase каждая подходящая модель может попытаться выполнить один ритуал (модель — не более одного за ход; каждый ритуал — только раз за ход). Psychic test: брось 2D6 (опц. Channel the Warp: +1D6, но при любом дубле или трипле отряд модели получает D3 mortal wounds). Ритуал срабатывает, если сумма ≥ его Warp Charge.',
  },

  detachmentOverrides: {},
}
