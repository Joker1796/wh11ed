// The numbers on the Dominatus Upgrade cards, read by hand into the modifier layer's own effect
// shape (src/components/roster/CLAUDE.md → "Authoring a record"), so a card given to a unit changes
// that unit's card in the game the way an enhancement does (owner, 2026-11-03, stage 3b). Keyed by
// the deck's slug (src/data/dominatus.js `upgrades`).
//
//   effects — the card's own: no `target` is the bearer ("this model"), `target: 'unit'` the bearer's
//             unit and the Attached unit it is part of ("this unit", 19.04).
//   bonus   — the effects of its bonus, when the bonus applies on the unit
//             (core/dominatus/upgrades.js upgradeBonusApplies): `replace` where the card says
//             "instead", else added to the card's own.
//   note    — why a card has no effects: what it does is not a number this card prints (a re-roll,
//             a mortal wound, a choice in the moment, CP, a rule of the campaign).
//
// `src/core/dominatus/upgradeMods.test.js` holds every card of the deck to an entry here, and every
// number and every granted name to the card's English text.

const when = (en, ru) => ({ en, ru })
const NOT_SHOCKED = { when: when('while this unit is not battle-shocked', 'пока отряд не Battle-shocked'), cond: ['unit-not-battle-shocked'] }

/** @type {Record<string, { effects: object[], bonus?: { replace: boolean, effects: object[] }, note?: string }>} */
export const dominatusUpgradeMods = {
  // ── Battle Honours ──
  'kingslayer': {
    effects: [{ on: 'melee', stat: 'ability', op: 'grant', value: 'PRECISION', when: null }],
    note: 're-rolling hits against a CHARACTER is a dice rule, not a number',
  },
  'fire-and-fury': {
    effects: [
      { on: 'ranged', target: 'unit', stat: 'ability', op: 'grant', value: 'ASSAULT', when: null },
      { on: 'ranged', target: 'unit', stat: 'ability', op: 'grant', value: 'HEAVY', when: null },
    ],
    note: 'the bonus is a re-roll of 1s',
  },
  'shadow-stalker': { effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Stealth', when: null }] },
  'undying-duty': { effects: [], note: 'mortal wounds after an enemy fights' },
  'grim-veterans': {
    effects: [{ on: 'profile', target: 'unit', stat: 'oc', op: 'add', value: 1, ...NOT_SHOCKED }],
    note: 'the bonus is a re-roll of leadership rolls',
  },
  'wraith-of-ruin': { effects: [], note: 'visibility beyond 18"' },
  'swift-as-the-wind': {
    effects: [{ on: 'profile', target: 'unit', stat: 'm', op: 'add', value: 2, when: null }],
    bonus: { replace: true, effects: [{ on: 'profile', target: 'unit', stat: 'm', op: 'add', value: 3, when: null }] },
  },
  'battle-hungry': { effects: [], note: 're-rolls of charge and advance rolls' },
  'ferocious-combatant': {
    effects: [{ on: 'melee', target: 'unit', stat: 'ability', op: 'grant', value: 'SUSTAINED HITS 1', when: null }],
    bonus: { replace: false, effects: [{ on: 'melee', stat: 'ability', op: 'grant', value: 'CLEAVE 1', when: null }] },
  },
  'breach-and-burn': { effects: [], note: 'only against a target within 18" in your Shooting phase' },
  'path-to-conquest': { effects: [], note: 'a rule of the campaign phase, carried by no unit' },
  // ── Battle Skills ──
  'terrifying-presence': { effects: [], note: 'a battle-shock roll for an enemy unit' },
  'tactical-redeployment': { effects: [], note: 'the Redeploy Units step' },
  'tempered-in-battle': { effects: [], note: 'what the unit may do after falling back' },
  'front-line-champion': { effects: [], note: 're-rolling hits within 9"' },
  'fortunes-favoured': { effects: [], note: 'once per battle, used as attacks come in' },
  'high-strategy': { effects: [], note: 'CP at the start of the battle (the CP ledger, settleStartCp)' },
  'natural-leader': { effects: [], note: 'an aura on other units' },
  'lead-from-the-front': {
    effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Scouts 6"', when: null }],
    bonus: { replace: true, effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Scouts 9"', when: null }] },
  },
  'born-survivor': {
    effects: [{ on: 'unit', stat: 'core', op: 'grant', value: 'Feel No Pain 6+', when: null }],
    bonus: { replace: true, effects: [{ on: 'unit', stat: 'core', op: 'grant', value: 'Feel No Pain 5+', when: null }] },
  },
  // ── Relics: Liberators ──
  'blade-of-sacrifice': { effects: [], note: 'wounds chosen in the moment, for one phase' },
  'strategic-laurels': { effects: [], note: 'CP from a leadership roll' },
  'the-emperors-tarot': { effects: [], note: 'the mission deck' },
  'vortex-grenade': { effects: [], note: 'once per battle, mortal wounds' },
  'master-crafted-armour': {
    effects: [
      { on: 'profile', stat: 'inv', op: 'set', value: '4+', when: null },
      { on: 'profile', stat: 't', op: 'add', value: 1, when: null },
      { on: 'profile', stat: 'sv', op: 'improve', value: 1, when: null },
      { on: 'profile', stat: 'w', op: 'add', value: 1, when: null },
    ],
  },
  // ── Relics: Oppressors ──
  'ruinator': { effects: [], note: 'once per battle, for one phase' },
  'temporal-talisman': { effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Fights First', when: null }] },
  'personal-teleporter': {
    effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Deep Strike', when: null }],
    note: 'Rapid Ingress for 0CP once per battle is the CP tab\'s',
  },
  'enhanced-bionics': { effects: [], note: 'wounds regained, and set back up once' },
  'powerfield-projector': { effects: [], note: 'an invulnerable save against ranged attacks only, and mortal wounds' },
  // ── Relics: Raiders ──
  'displacer-field': { effects: [], note: 'once per battle, into strategic reserves' },
  'disruption-orb': { effects: [], note: 'an aura on enemy stratagems' },
  'cloak-of-shadows': { effects: [{ on: 'unit', target: 'unit', stat: 'core', op: 'grant', value: 'Infiltrators', when: null }] },
  'maelstrom-clarion': { effects: [], note: 'where enemy units may arrive' },
  'fate-forged-weapon': {
    effects: [
      { on: 'melee', stat: 'ap', op: 'add', value: -1, when: null },
      { on: 'melee', stat: 'd', op: 'add', value: 1, when: null },
    ],
    note: 're-rolling wounds in the Fight phase is a dice rule',
  },
}
