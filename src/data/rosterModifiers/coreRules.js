// Modifiers that come from the CORE RULES, not from any faction — the handful of places where the
// rulebook itself rewrites a printed characteristic.
//
// WHY THIS FILE IS HAND-WRITTEN AND SITS APART. Everything else in this directory is generated
// skeletons keyed by an appdata uuid, one file per faction (see the generator's header). Core
// rules have no uuid — they are numbered (`num`), they belong to no faction, and they change once
// an edition — so they are neither generated nor globbed as a faction file; index.js and the tests
// exclude this one the same way they exclude conditions.js.
//
// WHAT QUALIFIES. Only a core rule that rewrites a value on the datasheet, for a state this app can
// already answer. Battle-shock is the whole list today: it is the one core rule that changes a
// printed characteristic, it applies to every unit in every game, and `unit-battle-shocked` is
// already in the condition vocabulary and already switchable on a unit's row.
//
// Deliberately NOT here: rules that change rolls rather than characteristics (Cover, Benefit of
// Cover), which the layer cannot express and which the core-rules reader already carries in full.
//
// Battle-shock does TWO more things beyond the OC, and neither is a modifier: the unit cannot be
// targeted with stratagems, and it cannot start an action. The first is enforced where it can be —
// rosterGameContext's stratagemsFor marks a Battle-shocked unit's unspent stratagems `blocked`, so
// the card will not let you spend one. The second has nothing to enforce: the tracker does not
// model actions at all.
export const coreModifiers = [
  {
    kind: 'core',
    // Core Rules 01.07, Battle-shock Rolls: "While a unit is battle-shocked: The Objective Control
    // (OC) characteristic of all of its models is modified to '-'".
    num: '01.07',
    name: 'Battle-shock',
    effects: [
      {
        on: 'profile',
        stat: 'oc',
        op: 'set',
        value: '-',
        when: { en: 'while this unit is Battle-shocked', ru: 'пока отряд Battle-shocked' },
        cond: ['unit-battle-shocked'],
      },
    ],
  },
]
