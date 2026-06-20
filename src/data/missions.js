// GDM 2026 mission cards — Warhammer 40,000 11th ed. primary & secondary missions.
// Source: https://game-datamissions.com/11th/{primary,secondary}-missions
// Rules are published only as card IMAGES; this text was transcribed from those cards
// (download them with `python3 scripts/fetch-mission-cards.py`; `image` holds each path).
//
// EN-only data: `ru` aliases `en` (mission names/rules are language-agnostic).
//
// primary  = { type, deck, slug, name, opponent, mirror?, image, blocks }
//   deck = your Force Disposition; opponent = the matchup disposition; mirror when same.
// secondary = { type, role:'attacker'|'defender', slug, name, category, image, blocks }
//   block = { kind?:'fixed'|'tactical', heading, when?, rows:[{ text, vp, modifier? }] }
//   vp is a number, or a '+N' string for cumulative bonuses; modifier ∈ 'or'|'cumulative'.

const primary = [
  {
    type: 'primary', deck: 'take-and-hold', slug: 'battlefield-dominance', name: 'Battlefield Dominance', opponent: 'Take and Hold', mirror: true,
    image: '/assets/11th/primary-missions/take-and-hold/battlefield-dominance.png',
    blocks: [
      {
        heading: 'First & Second Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control more objectives than your opponent.', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'For each objective you control.', vp: 3 },
          { text: 'For each of those objectives (excluding your home objective) if you control your home objective.', vp: '+2', modifier: 'cumulative' },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'take-and-hold', slug: 'determined-acquisition', name: 'Determined Acquisition', opponent: 'Disruption',
    image: '/assets/11th/primary-missions/take-and-hold/determined-acquisition.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each objective you control that you did not control at the start of the turn (excluding your home objective).', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'For each objective you control.', vp: 3 },
          { text: 'For each of those objectives that is within your opponent\'s territory.', vp: '+3', modifier: 'cumulative' },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'take-and-hold', slug: 'immovable-object', name: 'Immovable Object', opponent: 'Purge the Foe',
    image: '/assets/11th/primary-missions/take-and-hold/immovable-object.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control one or more central objectives.', vp: 3 },
        ],
      },
      {
        heading: 'Second to Fourth Battle Round', when: 'End of your Command phase',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 5 },
        ],
      },
      {
        heading: 'Fifth Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'take-and-hold', slug: 'inescapable-dominion', name: 'Inescapable Dominion', opponent: 'Priority Assets',
    image: '/assets/11th/primary-missions/take-and-hold/inescapable-dominion.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control three or more objectives.', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control two or more objectives.', vp: 5 },
          { text: 'You control more objectives than your opponent.', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control your opponent\'s home objective.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'take-and-hold', slug: 'purge-and-secure', name: 'Purge and Secure', opponent: 'Reconnaissance',
    image: '/assets/11th/primary-missions/take-and-hold/purge-and-secure.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were destroyed this turn by a friendly unit that was within range of one or more objectives.', vp: 3 },
          { text: 'One or more enemy units that started the turn within range of one or more objectives were destroyed this turn.', vp: 3, modifier: 'or' },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'You control one or more objectives that you did not control at the start of the turn (excluding your home objective).', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'purge-the-foe', slug: 'consecrate', name: 'Consecrate', opponent: 'Reconnaissance',
    image: '/assets/11th/primary-missions/purge-the-foe/consecrate.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or two objectives are consecrated.', vp: 3 },
          { text: 'Three or more objectives are consecrated.', vp: 6, modifier: 'or' },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control at least one objective (excluding your home).', vp: 4 },
          { text: 'You control more objectives than your opponent.', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'The enemy home objective has been consecrated.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'purge-the-foe', slug: 'destroyers-wrath', name: 'Destroyer\'s Wrath', opponent: 'Priority Assets',
    image: '/assets/11th/primary-missions/purge-the-foe/destroyers-wrath.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were destroyed this turn.', vp: 3 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
          { text: 'You control more objectives than your opponent.', vp: 6 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.', vp: 4 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'purge-the-foe', slug: 'meatgrinder', name: 'Meatgrinder', opponent: 'Purge the Foe', mirror: true,
    image: '/assets/11th/primary-missions/purge-the-foe/meatgrinder.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were destroyed this turn.', vp: 3 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.', vp: 5 },
          { text: 'You control your opponent\'s home objective.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'purge-the-foe', slug: 'punishment', name: 'Punishment', opponent: 'Disruption',
    image: '/assets/11th/primary-missions/purge-the-foe/punishment.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'One or more condemned enemy units left the battlefield this turn.', vp: 5 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
          { text: 'You control more objectives than your opponent.', vp: 5 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control your opponent\'s home objective.', vp: 8 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'purge-the-foe', slug: 'unstoppable-force', name: 'Unstoppable Force', opponent: 'Take and Hold',
    image: '/assets/11th/primary-missions/purge-the-foe/unstoppable-force.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were destroyed this turn.', vp: 3 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'You control one or more objectives you did not control at the start of the turn (excluding your home objective).', vp: 3 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control one or more central objectives.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'reconnaissance', slug: 'gather-intel', name: 'Gather Intel', opponent: 'Reconnaissance', mirror: true,
    image: '/assets/11th/primary-missions/reconnaissance/gather-intel.png',
    blocks: [
      {
        heading: 'First Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control one or more central objectives.', vp: 6 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'For each friendly unit that extracted intelligence this turn (see reverse).', vp: 7 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'Three or more of your operation markers are on the battlefield.', vp: 5 },
          { text: 'One of your operation markers is within range of your opponent\'s home objective.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'reconnaissance', slug: 'reconnaissance-sweep', name: 'Reconnaissance Sweep', opponent: 'Take and Hold',
    image: '/assets/11th/primary-missions/reconnaissance/reconnaissance-sweep.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'Three or more friendly units are wholly within three different table quarters, and not within 6" of the centre of the battlefield.', vp: 3 },
          { text: 'Four or more friendly units are wholly within four different table quarters, and not within 6" of the centre of the battlefield.', vp: 6, modifier: 'or' },
        ],
      },
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each enemy unit destroyed this turn.', vp: 1 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'reconnaissance', slug: 'search-and-scour', name: 'Search and Scour', opponent: 'Priority Assets',
    image: '/assets/11th/primary-missions/reconnaissance/search-and-scour.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control one or more central objectives.', vp: 3 },
          { text: 'One or more enemy units that started the turn within a terrain area are destroyed.', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'No enemy units are wholly within your territory.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'reconnaissance', slug: 'surveil-the-foe', name: 'Surveil the Foe', opponent: 'Disruption',
    image: '/assets/11th/primary-missions/reconnaissance/surveil-the-foe.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were surveilled this turn (see reverse), unless each of those units is within range of one or more objectives that have one or more operation markers within range of them.', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
          { text: 'You control more objectives than your opponent.', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'No enemy operation markers are on the battlefield.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'reconnaissance', slug: 'triangulation', name: 'Triangulation', opponent: 'Purge the Foe',
    image: '/assets/11th/primary-missions/reconnaissance/triangulation.png',
    blocks: [
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'One objective is triangulated (see reverse).', vp: 3 },
          { text: 'Two objectives are triangulated.', vp: 6, modifier: 'or' },
          { text: 'Three or more objectives are triangulated.', vp: 10, modifier: 'or' },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control four or more objectives.', vp: 10 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'priority-assets', slug: 'extract-relic', name: 'Extract Relic', opponent: 'Disruption',
    image: '/assets/11th/primary-missions/priority-assets/extract-relic.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit performed a sensor sweep this turn (see reverse).', vp: 4 },
          { text: 'One or more enemy units that started the turn within range of one or more objectives are destroyed.', vp: 3 },
          { text: 'Only one of your opponent\'s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'Only one of your opponent\'s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'priority-assets', slug: 'sabotage', name: 'Sabotage', opponent: 'Priority Assets', mirror: true,
    image: '/assets/11th/primary-missions/priority-assets/sabotage.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each friendly unit that committed sabotage this turn (see reverse).', vp: 3 },
          { text: 'For each of those units that is within range of one or more objectives in your opponent\'s territory.', vp: '+2', modifier: 'cumulative' },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'priority-assets', slug: 'secure-asset', name: 'Secure Asset', opponent: 'Take and Hold',
    image: '/assets/11th/primary-missions/priority-assets/secure-asset.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit secured the asset this turn (see reverse).', vp: 4 },
          { text: 'At least one enemy unit that started the turn within range of one or more central objectives was destroyed.', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
          { text: 'You control three or more objectives.', vp: 4 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'priority-assets', slug: 'vanguard-operation', name: 'Vanguard Operation', opponent: 'Reconnaissance',
    image: '/assets/11th/primary-missions/priority-assets/vanguard-operation.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit performed a vanguard operation this turn (see reverse).', vp: 4 },
          { text: 'One or more enemy units were destroyed this turn.', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control your opponent\'s home objective.', vp: 10 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'priority-assets', slug: 'vital-link', name: 'Vital Link', opponent: 'Purge the Foe',
    image: '/assets/11th/primary-missions/priority-assets/vital-link.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control one or more central objectives.', vp: 2 },
          { text: 'For each of your operation markers within range of one of those objectives (see reverse).', vp: '+1', modifier: 'cumulative' },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
          { text: 'One or more of those objectives is a central objective.', vp: '+4', modifier: 'cumulative' },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'You control your opponent\'s home objective.', vp: 10 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'disruption', slug: 'death-trap', name: 'Death Trap', opponent: 'Take and Hold',
    image: '/assets/11th/primary-missions/disruption/death-trap.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each terrain area trapped this turn (see reverse).', vp: 2 },
          { text: 'For each of those terrain areas that is an objective.', vp: '+3', modifier: 'cumulative' },
        ],
      },
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'At least one enemy unit that started the turn in a terrain area has been destroyed, provided that terrain area is trapped.', vp: 3 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control at least one objective (excluding your home objective).', vp: 4 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'disruption', slug: 'delaying-action', name: 'Delaying Action', opponent: 'Purge the Foe',
    image: '/assets/11th/primary-missions/disruption/delaying-action.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each enemy unit destroyed this turn.', vp: 2 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control at least one objective (excluding home objectives).', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'You control at least one central objective and at least one expansion objective.', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'disruption', slug: 'locate-and-deny', name: 'Locate and Deny', opponent: 'Priority Assets',
    image: '/assets/11th/primary-missions/disruption/locate-and-deny.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'At least one enemy unit that started its turn within range of an objective has been destroyed.', vp: 4 },
          { text: 'Only one of your operation markers remains (see reverse), with a unit of yours in that terrain area and no enemy units there.', vp: 4 },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control at least one objective (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'Only one of your operation markers remains, with a unit of yours in that terrain area and no enemy units there.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'disruption', slug: 'outmanoeuvre', name: 'Outmanoeuvre', opponent: 'Disruption', mirror: true,
    image: '/assets/11th/primary-missions/disruption/outmanoeuvre.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control the enemy home objective.', vp: 10 },
        ],
      },
      {
        heading: 'First Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'Second & Third Battle Round', when: 'End of your Command phase',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 5 },
        ],
      },
      {
        heading: 'Fourth Battle Round Onwards', when: 'End of your turn',
        rows: [
          { text: 'For each objective you control (excluding your home objective).', vp: 6 },
        ],
      },
    ],
  },
  {
    type: 'primary', deck: 'disruption', slug: 'smoke-and-mirrors', name: 'Smoke and Mirrors', opponent: 'Reconnaissance',
    image: '/assets/11th/primary-missions/disruption/smoke-and-mirrors.png',
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each objective that is a decoy (see reverse).', vp: 2 },
          { text: 'For each of those objectives that is within your opponent\'s territory.', vp: '+2', modifier: 'cumulative' },
        ],
      },
      {
        heading: 'Second Battle Round Onwards', when: 'End of your Command phase (or the end of your turn in the fifth battle round)',
        rows: [
          { text: 'You control at least one objective (excluding your home objective).', vp: 4 },
        ],
      },
      {
        heading: 'End of Battle',
        rows: [
          { text: 'At least four objectives are decoys.', vp: 10 },
        ],
      },
    ],
  },
]

const secondary = [
  {
    type: 'secondary', role: 'attacker', slug: 'a-grievous-blow', name: 'A Grievous Blow', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/attacker/a-grievous-blow.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit with a Starting Strength of 13 or more that is destroyed this turn.', vp: 4 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'One or more enemy units with a Starting Strength of 13 or more were destroyed this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'a-grievous-blow', name: 'A Grievous Blow', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/defender/a-grievous-blow.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit with a Starting Strength of 13 or more that is destroyed this turn.', vp: 4 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'One or more enemy units with a Starting Strength of 13 or more were destroyed this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'a-tempting-target', name: 'A Tempting Target', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/a-tempting-target.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control your tempting target.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'a-tempting-target', name: 'A Tempting Target', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/a-tempting-target.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control your tempting target.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'assassination', name: 'Assassination', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/attacker/assassination.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'While this card is active',
        rows: [
          { text: 'Each time an enemy CHARACTER model with a Wounds characteristic of 4 or higher is destroyed.', vp: 4 },
          { text: 'Each time an enemy CHARACTER model with a Wounds characteristic of less than 4 is destroyed.', vp: 3, modifier: 'or' },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of either player\'s turn',
        rows: [
          { text: 'One or more enemy CHARACTER models were destroyed this turn.', vp: 5 },
          { text: 'All enemy CHARACTER models have been destroyed during the battle.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'assassination', name: 'Assassination', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/defender/assassination.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'While this card is active',
        rows: [
          { text: 'Each time an enemy CHARACTER model with a Wounds characteristic of 4 or higher is destroyed.', vp: 4 },
          { text: 'Each time an enemy CHARACTER model with a Wounds characteristic of less than 4 is destroyed.', vp: 3, modifier: 'or' },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of either player\'s turn',
        rows: [
          { text: 'One or more enemy CHARACTER models were destroyed this turn.', vp: 5 },
          { text: 'All enemy CHARACTER models have been destroyed during the battle.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'beacon', name: 'Beacon', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/beacon.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'Your beacon unit is on the battlefield and outside your deployment zone.', vp: 3 },
          { text: 'Your beacon unit is on the battlefield and outside your territory.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'beacon', name: 'Beacon', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/beacon.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'Your beacon unit is on the battlefield and outside your deployment zone.', vp: 3 },
          { text: 'Your beacon unit is on the battlefield and outside your territory.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'behind-enemy-lines', name: 'Behind Enemy Lines', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/behind-enemy-lines.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each friendly unit (excluding AIRCRAFT and battle-shocked units) wholly within your opponent\'s deployment zone.', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'behind-enemy-lines', name: 'Behind Enemy Lines', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/behind-enemy-lines.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each friendly unit (excluding AIRCRAFT and battle-shocked units) wholly within your opponent\'s deployment zone.', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'bring-it-down', name: 'Bring it Down', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/attacker/bring-it-down.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy model with a Wounds characteristic of 10 or more that is destroyed this turn.', vp: 4 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'One or more enemy models with a Wounds characteristic of 10 or more were destroyed this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'bring-it-down', name: 'Bring it Down', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/defender/bring-it-down.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy model with a Wounds characteristic of 10 or more that is destroyed this turn.', vp: 4 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'One or more enemy models with a Wounds characteristic of 10 or more were destroyed this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'burden-of-trust', name: 'Burden of Trust', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/burden-of-trust.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'For each objective guarded by your army.', vp: 2 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'burden-of-trust', name: 'Burden of Trust', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/burden-of-trust.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'For each objective guarded by your army.', vp: 2 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'centre-ground', name: 'Centre Ground', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/centre-ground.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 3" of the centre of the battlefield, while no enemy units are within 3" of that centre.', vp: 3 },
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 3" of the centre of the battlefield, while no enemy units are within 6" of that centre.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'centre-ground', name: 'Centre Ground', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/centre-ground.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 3" of the centre of the battlefield, while no enemy units are within 3" of that centre.', vp: 3 },
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 3" of the centre of the battlefield, while no enemy units are within 6" of that centre.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'cleanse', name: 'Cleanse', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/cleanse.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One objective was cleansed by your army this turn.', vp: 2 },
          { text: 'Two or more objectives were cleansed by your army this turn.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'cleanse', name: 'Cleanse', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/cleanse.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One objective was cleansed by your army this turn.', vp: 2 },
          { text: 'Two or more objectives were cleansed by your army this turn.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'defend-stronghold', name: 'Defend Stronghold', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/defend-stronghold.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Second Battle Round Onwards', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'You control your home objective.', vp: 3 },
          { text: 'You control your home objective and no enemy units are within your deployment zone.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'defend-stronghold', name: 'Defend Stronghold', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/defend-stronghold.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Second Battle Round Onwards', when: 'End of your opponent\'s turn or the end of the fifth battle round (whichever comes first)',
        rows: [
          { text: 'You control your home objective.', vp: 3 },
          { text: 'You control your home objective and no enemy units are within your deployment zone.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'display-of-might', name: 'Display of Might', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/display-of-might.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'There are more friendly units than enemy units (excluding AIRCRAFT and battle-shocked units) wholly within No Man\'s Land.', vp: 2 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn',
        rows: [
          { text: 'There are more friendly units than enemy units (excluding AIRCRAFT and battle-shocked units) wholly within No Man\'s Land.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'display-of-might', name: 'Display of Might', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/display-of-might.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'There are more friendly units than enemy units (excluding AIRCRAFT and battle-shocked units) wholly within No Man\'s Land.', vp: 2 },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your opponent\'s turn',
        rows: [
          { text: 'There are more friendly units than enemy units (excluding AIRCRAFT and battle-shocked units) wholly within No Man\'s Land.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'engage-on-all-fronts', name: 'Engage on All Fronts', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/attacker/engage-on-all-fronts.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You have a presence in three table quarters.', vp: 2 },
          { text: 'You have a presence in four table quarters.', vp: 4, modifier: 'or' },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You have a presence in three table quarters.', vp: 3 },
          { text: 'You have a presence in four table quarters.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'engage-on-all-fronts', name: 'Engage on All Fronts', category: 'Fixed / Tactical',
    image: '/assets/11th/secondary-missions/defender/engage-on-all-fronts.png',
    blocks: [
      {
        kind: 'fixed', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You have a presence in three table quarters.', vp: 2 },
          { text: 'You have a presence in four table quarters.', vp: 4, modifier: 'or' },
        ],
      },
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You have a presence in three table quarters.', vp: 3 },
          { text: 'You have a presence in four table quarters.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'forward-position', name: 'Forward Position', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/forward-position.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control your opponent\'s home objective and/or each expansion objective.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'forward-position', name: 'Forward Position', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/forward-position.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control your opponent\'s home objective and/or each expansion objective.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'no-prisoners', name: 'No Prisoners', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/no-prisoners.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit destroyed this turn.', vp: 2 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'no-prisoners', name: 'No Prisoners', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/no-prisoners.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit destroyed this turn.', vp: 2 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'outflank', name: 'Outflank', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/outflank.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 6" of one or more battlefield edges and not within your territory.', vp: 3 },
          { text: 'Two or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 6" of opposite battlefield edges, with at least one of those units not within your territory.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'outflank', name: 'Outflank', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/outflank.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 6" of one or more battlefield edges and not within your territory.', vp: 3 },
          { text: 'Two or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 6" of opposite battlefield edges, with at least one of those units not within your territory.', vp: 5, modifier: 'or' },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'overwhelming-force', name: 'Overwhelming Force', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/overwhelming-force.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit that started the turn within range of one or more objectives and is destroyed.', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'overwhelming-force', name: 'Overwhelming Force', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/overwhelming-force.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of a turn',
        rows: [
          { text: 'For each enemy unit that started the turn within range of one or more objectives and is destroyed.', vp: 3 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'plunder', name: 'Plunder', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/plunder.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A terrain area was plundered this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'plunder', name: 'Plunder', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/plunder.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A terrain area was plundered this turn.', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'attacker', slug: 'secure-no-man-s-land', name: 'Secure No Man\'s Land', category: 'Tactical',
    image: '/assets/11th/secondary-missions/attacker/secure-no-man-s-land.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control two or more objectives within No Man\'s Land (excluding your home objective).', vp: 5 },
        ],
      },
    ],
  },
  {
    type: 'secondary', role: 'defender', slug: 'secure-no-man-s-land', name: 'Secure No Man\'s Land', category: 'Tactical',
    image: '/assets/11th/secondary-missions/defender/secure-no-man-s-land.png',
    blocks: [
      {
        kind: 'tactical', heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control two or more objectives within No Man\'s Land (excluding your home objective).', vp: 5 },
        ],
      },
    ],
  },
]

const en = { primary, secondary }

export const missions = { en, ru: en }
