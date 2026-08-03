// World Eaters — army-rule tracker spec: Blessings of Khorne.
//
// A `multi` primitive: at the start of each battle round you roll eight D6 and activate UP TO TWO
// Blessings (each once per round), so — unlike the single-pick `selection` — the per-round choice is
// a capped set. The app doesn't roll or read the dice (the player does that on the table); it just
// tracks which up-to-two Blessings are active this round and surfaces their rules. Each Blessing's
// dice requirement rides along in `req` as a reminder ("Double 3+" = a double/triple of that value or
// higher). The choice resets every battle round (stored in army.multiByRound[round]).
//
// The option `body` texts condense each Blessing's rules (specs never import faction data); ability
// keywords stay English, rules text translated. No detachment changes the Blessing set → empty
// detachmentOverrides.
export default {
  slug: 'world-eaters',
  kind: 'multi',
  max: 2,

  ruleName: 'Blessings of Khorne',
  label: 'Blessings',

  options: [
    {
      id: 'unbridled-bloodlust',
      name: 'Unbridled Bloodlust',
      req: 'Double 1+',
      body: { en: 'This unit has +1 to Charge rolls.', ru: 'У отряда +1 к Charge rolls.' },
    },
    {
      id: 'rage-fuelled-invigoration',
      name: 'Rage-Fuelled Invigoration',
      req: 'Double 2+',
      body: {
        en: 'Each time a model in this unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".',
        ru: 'Каждый раз при Pile-in или Consolidation move модель отряда может двигаться до 6" вместо 3".',
      },
    },
    {
      id: 'total-carnage',
      name: 'Total Carnage',
      req: 'Double 3+',
      body: {
        en: 'Each time a model in this unit is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. It can fight after the attacking unit finishes its attacks, then is removed.',
        ru: 'Каждый раз, когда модель отряда уничтожается melee-атакой и ещё не дралась в этой фазе, брось D6: на 4+ не убирай её. Она может драться после того, как атакующий отряд закончит атаки, затем убирается.',
      },
    },
    {
      id: 'martial-excellence',
      name: 'Martial Excellence',
      req: 'Double 4+',
      body: {
        en: 'Melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.',
        ru: 'Melee-оружие моделей отряда получает [SUSTAINED HITS 1].',
      },
    },
    {
      id: 'warp-blades',
      name: 'Warp Blades',
      req: 'Double 5+',
      body: {
        en: 'Melee weapons equipped by models in this unit have the [LETHAL HITS] ability.',
        ru: 'Melee-оружие моделей отряда получает [LETHAL HITS].',
      },
    },
    {
      id: 'decapitating-strikes',
      name: 'Decapitating Strikes',
      req: 'Double 6',
      body: {
        en: 'Each time a model in this unit makes a melee attack that targets an INFANTRY unit, that attack has the [DEVASTATING WOUNDS] ability.',
        ru: 'Каждый раз, когда модель отряда делает melee-атаку по отряду INFANTRY, атака получает [DEVASTATING WOUNDS].',
      },
    },
  ],

  note: {
    en: 'At the start of the battle round, roll eight D6 and activate up to two Blessings (each once per round). A Blessing needs a double or triple of its value or higher among your dice; unused dice are discarded. Once activated, it applies to all units from your army with this ability until the end of the battle round.',
    ru: 'В начале раунда боя брось восемь D6 и активируй до двух благословений (каждое раз за раунд). Благословению нужен дубль или трипл своего значения или выше среди твоих кубиков; неиспользованные кубики сбрасываются. Активированное действует на все отряды твоей армии с этой способностью до конца раунда боя.',
  },

  detachmentOverrides: {},
}
