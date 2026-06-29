// GDM 2026 mission cards — Warhammer 40,000 11th ed. primary & secondary missions.
// Source: https://game-datamissions.com/11th/{primary,secondary}-missions
// Rules are published only as card IMAGES; this text was transcribed from those cards
// (download them with `python3 scripts/fetch-mission-cards.py`; `image` holds each path).
//
// EN-only data: `ru` aliases `en` (mission names/rules are language-agnostic).
//
// primary  = { type, deck, slug, name, opponent, mirror?, image, lore?, briefing?, blocks }
//   deck = your Force Disposition; opponent = the matchup disposition; mirror when same.
//   lore = the card's flavour text (the collapsible "Lore" panel in the official app),
//     shown after the title on the Missions page and hidden by the "hide lore" toggle.
// secondary = { type, role:'attacker'|'defender', slug, name, category, image, lore?, briefing?, whenDrawn?, blocks }
//   block = { kind?:'fixed'|'tactical', heading, when?, rows:[{ text, vp, modifier? }] }
//   vp is a number, or a '+N' string for cumulative bonuses; modifier ∈ 'or'|'cumulative'.
//   whenDrawn = the card's WHEN DRAWN deck action, applied one-tap in the tracker (tactical only):
//       { mode:'discard'|'shuffle', gate?:'first-round'|{ pairedActive:'<slug>' } }
//     mode 'discard' = card leaves play (not redrawable); 'shuffle' = card returns to deck.
//     gate omitted = board-state condition the app can't check (always offered; briefing is the
//     reminder). Language-agnostic logic (lives in EN only; survives the RU briefing overlay).
//   briefing = the card's intro text above the scoring blocks (only some cards have one),
//     an array of parts (rendered in order); each part is either
//       { label?, text }                       — a paragraph (label e.g. 'When Drawn', uppercased in UI)
//       { action, rows:[{ label, text }] }      — an OBJECTIVE ACTION block (Cleanse/Plunder)
//     Plain text, no markdown (matches rows.text). Transcribed from the card fronts and, for
//     the primary OBJECTIVE ACTION cards, from the official app (which reveals the card reverse).

import { missionsRu } from './missionsRu.js'

const primary = [
  {
    type: 'primary', deck: 'take-and-hold', slug: 'battlefield-dominance', name: 'Battlefield Dominance', opponent: 'Take and Hold', mirror: true,
    image: '/assets/11th/primary-missions/take-and-hold/battlefield-dominance.png',
    lore: 'This battlefield holds great significance for the wider war effort. You must seize control of it. Let nothing stand in your way.',
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
    lore: 'The resistance arrayed against you is formidable indeed, yet your orders are clear; take and hold the ground ahead, heedless of the cost.',
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
    lore: 'Obstinance is often the key to victory. Weather everything the enemy throws at you. If your opponent is to take any ground, they will have to wade through their own dead to do so.',
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
    lore: 'Your first priority must be to dominate the battlefield. Seize strongpoints and dig in. Only then may you turn your full attention to slaughtering the foe.',
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
    lore: 'Enemy pickets and reconnaissance have engaged your vanguard. Move forward, seize defensive positions and repel the assault at all costs.',
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
    lore: 'Whether in the name of grand ideals or simply to satisfy the thirst of their terrible gods, your warriors must consecrate this battlefield with the blood of their foes.',
    briefing: [
      { label: 'Consecrate', text: 'When a friendly unit destroys an enemy unit it becomes a consecration unit. At the end of your turn, each consecration unit in range of an objective (excluding your home objective) not yet consecrated consecrates it — place an operation marker there; the unit then is no longer a consecration unit.' },
    ],
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
    lore: 'Victory here shall not be measured in ground taken or plunder seized, but in the mangled corpses of your foes and the grisly trophies hewn from their bodies.',
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
    lore: 'Vicious and without relent, this battle has descended into base savagery. Only one path to victory remains: kill more of the enemy than they can kill of you.',
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
    lore: 'Those who resist must be punished. Make a bloody example of them, and leave none in doubt as to your mastery.',
    briefing: [
      { label: 'Start of Your Turn', text: 'Choose one to three enemy units on the battlefield that are within range of objectives and/or destroyed at least one friendly unit during the previous turn. If you cannot do so, choose any enemy unit on the battlefield instead. From now until the start of your next turn, those units are condemned.' },
    ],
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
    lore: 'The enemy are arrayed before you in number, and well prepared for the coming assault. Smash through their defences. Grind them to dust.',
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
    lore: 'The nature and motivation of the foe remains unclear. Test their mettle and seize pertinent intelligence from the field of battle.',
    briefing: [
      { action: 'Extract Intelligence', rows: [
        { label: 'Starts', text: 'Your Shooting phase, from the second battle round onwards.' },
        { label: 'Units', text: 'One unit within range of one objective (excluding your home objective) that does not have any of your operation markers within range of it.' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'Place one of your operation markers within range of that objective.' },
      ] },
    ],
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
          { text: 'For each friendly unit that completed the Extract Intelligence action this turn.', vp: 7 },
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
    lore: 'Enemy movements have aroused suspicion. Disperse your forces, probe their lines and decipher their intentions.',
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
    lore: 'Forward elements report enemy movement in this sector. Move out, locate the foes and halt their operation before it gathers momentum.',
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
    lore: 'Information is power. Evaluate the strengths and weaknesses of the enemy and feed this crucial information back to your superiors.',
    briefing: [
      { text: "Each time a friendly unit ends a move within range of one objective that has any of your opponent's operation markers within range of it, remove those operation markers from the battlefield." },
      { action: 'Surveil the Foe', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit.' },
        { label: 'Use Limit', text: 'Unlimited.' },
        { label: 'Completes', text: 'Immediately.' },
        { label: 'Effect', text: 'Select one enemy unit within 18" of and visible to your unit that has not been surveilled this turn: until the end of the turn, that enemy unit is surveilled.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'One or more enemy units were surveilled this turn, unless each of those units is within range of one or more objectives that have one or more operation markers within range of them.', vp: 4 },
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
    lore: 'By acquiring and transmitting precise coordinates, your forces will be able to summon reinforcements, saturate the battlefield with artillery fire or call in other means of support.',
    briefing: [
      { action: 'Triangulate', rows: [
        { label: 'Starts', text: 'Your Shooting phase, from the second battle round onwards.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective).' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'That objective is triangulated: place one of your operation markers within range of that objective.' },
      ] },
    ],
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
          { text: 'One objective is triangulated.', vp: 3 },
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
    lore: 'A priceless relic saturated with eldritch power lies somewhere on the field of battle. Secure the sensor array at the heart of the battlefield and direct its energies to locating the prize.',
    briefing: [
      { action: 'Sensor Sweep', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one central objective.' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'Your unit performs a sensor sweep: remove one operation marker from the battlefield.' },
        { label: 'Restriction', text: 'A unit cannot start this action if there is only one operation marker on the battlefield.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit performed a sensor sweep this turn.', vp: 4 },
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
    lore: 'Strike deep behind enemy lines, sabotage supply routes, fortifications and heavy weapons. By doing so you may lay the groundwork for future offensives.',
    briefing: [
      { action: 'Sabotage', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One unit within range of one objective (excluding your home objective).' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.' },
        { label: 'Completes', text: 'End of your turn, if that unit controls that objective.' },
        { label: 'Effect', text: 'Your unit commits sabotage.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each friendly unit that committed sabotage this turn.', vp: 3 },
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
    lore: 'A vital asset has been lost amidst the chaos of battle. You must secure the item at all costs.',
    briefing: [
      { action: 'Secure Asset', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective).' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'Your unit secures the asset.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit secured the asset this turn.', vp: 4 },
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
    lore: 'Striking deep beyond the front lines, your forces must employ speed and cunning to secure their objectives before the enemy responds.',
    briefing: [
      { action: 'Vanguard Operation', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: "One friendly unit within one terrain area that is within your opponent's territory." },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if no enemy units are within that terrain area.' },
        { label: 'Effect', text: 'Your unit performs a vanguard operation.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'A friendly unit performed a vanguard operation this turn.', vp: 4 },
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
    lore: 'A key communications node is located in the midst of this battlefield. Control of this node is crucial to the continued success of your armies. Ensure it does not fall into enemy hands.',
    briefing: [
      { action: 'Maintain Control', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one central objective.' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'Place one of your operation markers within range of that objective.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'You control one or more central objectives.', vp: 2 },
          { text: 'For each of your operation markers within range of one of those objectives.', vp: '+1', modifier: 'cumulative' },
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
    lore: 'Even the most potent enemy force can be undone with sufficient preparation. Lay minefields, dig trenches and draw the enemy into pre-prepared killing zones.',
    briefing: [
      { action: 'Booby Trap', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective) or within one terrain area that is not within your deployment zone, that you have not yet trapped (see below).' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within a different terrain area.' },
        { label: 'Completes', text: 'Immediately.' },
        { label: 'Effect', text: 'That terrain area is trapped: place one of your operation markers within that terrain area.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each terrain area trapped this turn.', vp: 2 },
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
    lore: 'Your enemies are on the march. Commit your warriors to battle and make the foe pay a bloody price for every foot of ground.',
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
    lore: 'The enemy is searching for an asset of value. By cunning or by force of arms, prevent its retrieval.',
    briefing: [
      { label: 'Start of the Battle', text: 'Select five terrain areas not within your deployment zone; for each one, place one of your operation markers within it. If you cannot, do so for each terrain area that is not within your deployment zone.' },
      { action: 'Sensor Sweep', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one central objective.' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'Your unit performs a sensor sweep: remove one operation marker from the battlefield.' },
        { label: 'Restriction', text: 'A unit cannot start this action if there is only one operation marker on the battlefield.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'At least one enemy unit that started its turn within range of an objective has been destroyed.', vp: 4 },
          { text: 'Only one of your operation markers remains, with a unit of yours in that terrain area and no enemy units there.', vp: 4 },
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
    lore: 'Speed and positioning are key in any battle. Outflank the enemy, seize high ground and routes of resupply. Choke them to death.',
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
    lore: 'Cunning is as potent a weapon as overwhelming force. Outnumbered or outgunned, you must make use of subterfuge and misdirection to pick the enemy apart.',
    briefing: [
      { action: 'Decoy', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective) that is not decoyed (see below).' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.' },
        { label: 'Completes', text: 'End of your turn, if your unit controls that objective.' },
        { label: 'Effect', text: 'That objective is decoyed: place one of your operation markers within range of that objective.' },
      ] },
    ],
    blocks: [
      {
        heading: 'Any Battle Round', when: 'End of your turn',
        rows: [
          { text: 'For each objective that is a decoy.', vp: 2 },
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
    lore: 'Target and eliminate the most numerous and potent of enemy infantry to shatter their battle line.',
    whenDrawn: { mode: 'discard' },
    briefing: [
      { label: 'When Drawn', text: 'If no enemy units with a Starting Strength of 13 or more are on the battlefield, you may discard this card and draw one new Secondary Mission card.' },
    ],
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
    lore: 'Target and eliminate the most numerous and potent of enemy infantry to shatter their battle line.',
    whenDrawn: { mode: 'discard' },
    briefing: [
      { label: 'When Drawn', text: 'If no enemy units with a Starting Strength of 13 or more are on the battlefield, you may discard this card and draw one new Secondary Mission card.' },
    ],
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
    lore: 'An opportunity to seize a valuable asset has been identified, but the enemy are likely to use it as bait in a trap. Move to secure the site, but be wary of enemy ambushes.',
    briefing: [
      { label: 'When Drawn', text: "Your opponent selects one objective (excluding home objectives) within No Man's Land to be your tempting target." },
    ],
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
    lore: 'An opportunity to seize a valuable asset has been identified, but the enemy are likely to use it as bait in a trap. Move to secure the site, but be wary of enemy ambushes.',
    briefing: [
      { label: 'When Drawn', text: "Your opponent selects one objective (excluding home objectives) within No Man's Land to be your tempting target." },
    ],
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
    lore: 'The enemy looks to their champions for courage. Identify and eliminate them with extreme prejudice.',
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
    lore: 'The enemy looks to their champions for courage. Identify and eliminate them with extreme prejudice.',
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
    lore: "Bold and defiant, your chosen champions taunt the foe, drawing them on. Should they hold fast in the face of the inevitable response, the enemy's momentum will surely falter.",
    briefing: [
      { label: 'When Drawn', text: 'Choose one friendly unit on the battlefield, or embarked within a TRANSPORT on the battlefield, to be your beacon unit.' },
    ],
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
    lore: "Bold and defiant, your chosen champions taunt the foe, drawing them on. Should they hold fast in the face of the inevitable response, the enemy's momentum will surely falter.",
    briefing: [
      { label: 'When Drawn', text: 'Choose one friendly unit on the battlefield, or embarked within a TRANSPORT on the battlefield, to be your beacon unit.' },
    ],
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
    lore: 'Your orders are clear: break through the enemy and cut off their escape routes.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: 'Your orders are clear: break through the enemy and cut off their escape routes.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: 'Prioritise the destruction of heavily armoured assets. Bring them down at all costs.',
    whenDrawn: { mode: 'discard' },
    briefing: [
      { label: 'When Drawn', text: 'If there are no enemy models on the battlefield with a Wounds characteristic of 10 or more, you may discard this card and draw one new Secondary Mission card.' },
    ],
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
    lore: 'Prioritise the destruction of heavily armoured assets. Bring them down at all costs.',
    whenDrawn: { mode: 'discard' },
    briefing: [
      { label: 'When Drawn', text: 'If there are no enemy models on the battlefield with a Wounds characteristic of 10 or more, you may discard this card and draw one new Secondary Mission card.' },
    ],
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
    lore: 'The strategic prizes in this region must be guarded at all costs – a duty that falls upon a chosen few.',
    briefing: [
      { label: 'When Drawn / Start of Your Turn', text: 'For each objective, you may pick one friendly unit on the battlefield to guard that objective. From then until the start of your next turn, that objective counts as guarded by your army for as long as the chosen unit is within range of it and you control it.' },
    ],
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
    lore: 'The strategic prizes in this region must be guarded at all costs – a duty that falls upon a chosen few.',
    briefing: [
      { label: 'When Drawn / Start of Your Turn', text: 'For each objective, you may pick one friendly unit on the battlefield to guard that objective. From then until the start of your next turn, that objective counts as guarded by your army for as long as the chosen unit is within range of it and you control it.' },
    ],
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
    lore: 'The heart of the battlefield is key to victory. Dominate the centre ground, and you shall be one step closer to achieving your goals.',
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
    lore: 'The heart of the battlefield is key to victory. Dominate the centre ground, and you shall be one step closer to achieving your goals.',
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
    lore: 'Your forces have identified a series of tainted objectives in this area. Purify these locations.',
    whenDrawn: { mode: 'shuffle', gate: { pairedActive: 'plunder' } },
    briefing: [
      { label: 'When Drawn', text: 'If you have the Plunder Secondary Mission active, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
      { action: 'Cleanse', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective).' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.' },
        { label: 'Completes', text: 'End of your turn, if that unit is controlling that objective.' },
        { label: 'Effect', text: 'That objective is cleansed by your army.' },
      ] },
    ],
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
    lore: 'Your forces have identified a series of tainted objectives in this area. Purify these locations.',
    whenDrawn: { mode: 'shuffle', gate: { pairedActive: 'plunder' } },
    briefing: [
      { label: 'When Drawn', text: 'If you have the Plunder Secondary Mission active, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
      { action: 'Cleanse', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One friendly unit within range of one objective (excluding your home objective).' },
        { label: 'Use Limit', text: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.' },
        { label: 'Completes', text: 'End of your turn, if that unit is controlling that objective.' },
        { label: 'Effect', text: 'That objective is cleansed by your army.' },
      ] },
    ],
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
    lore: 'You are charged with the defence of a critical objective. It must not be permitted to fall into enemy hands.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: 'You are charged with the defence of a critical objective. It must not be permitted to fall into enemy hands.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: "Intimidation is a potent weapon. Demonstrate your battlefield supremacy with a brutal show of force and erode what remains of the enemy's morale.",
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
    lore: "Intimidation is a potent weapon. Demonstrate your battlefield supremacy with a brutal show of force and erode what remains of the enemy's morale.",
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
    lore: 'Probe their lines and engage any resistance. Stretch the foe to breaking point.',
    briefing: [
      { text: 'You have a presence in a table quarter if one or more friendly units (excluding AIRCRAFT and battle-shocked units) are wholly within that table quarter and are not within 6" of the centre of the battlefield.' },
    ],
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
    lore: 'Probe their lines and engage any resistance. Stretch the foe to breaking point.',
    briefing: [
      { text: 'You have a presence in a table quarter if one or more friendly units (excluding AIRCRAFT and battle-shocked units) are wholly within that table quarter and are not within 6" of the centre of the battlefield.' },
    ],
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
    lore: 'You must break the enemy line and establish a forward position to launch fresh assaults.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: 'You must break the enemy line and establish a forward position to launch fresh assaults.',
    whenDrawn: { mode: 'shuffle', gate: 'first-round' },
    briefing: [
      { label: 'When Drawn', text: 'During the first battle round, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
    ],
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
    lore: 'Show no mercy. Exterminate your enemies.',
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
    lore: 'Show no mercy. Exterminate your enemies.',
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
    lore: 'Exploit the flanks; use your speed and momentum to surround the foe and catch them in the jaws of a trap.',
    briefing: [
      { label: "Designer's Note", text: 'Opposite battlefield edges are those parallel to each other.' },
    ],
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
    lore: 'Exploit the flanks; use your speed and momentum to surround the foe and catch them in the jaws of a trap.',
    briefing: [
      { label: "Designer's Note", text: 'Opposite battlefield edges are those parallel to each other.' },
    ],
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
    lore: 'The enemy holds your assigned objectives. Commit your forces in full and sweep them from these locations post-haste.',
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
    lore: 'The enemy holds your assigned objectives. Commit your forces in full and sweep them from these locations post-haste.',
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
    lore: 'Unguarded prizes lie strewn across the field of battle. Secure them and deny them to the enemy.',
    whenDrawn: { mode: 'shuffle', gate: { pairedActive: 'cleanse' } },
    briefing: [
      { label: 'When Drawn', text: 'If you have the Cleanse Secondary Mission active, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
      { action: 'Plunder', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One unit within a terrain area that is not within your territory.' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'Immediately.' },
        { label: 'Effect', text: 'That terrain area is plundered.' },
      ] },
    ],
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
    lore: 'Unguarded prizes lie strewn across the field of battle. Secure them and deny them to the enemy.',
    whenDrawn: { mode: 'shuffle', gate: { pairedActive: 'cleanse' } },
    briefing: [
      { label: 'When Drawn', text: 'If you have the Cleanse Secondary Mission active, you may shuffle this card back into your Secondary Mission deck and then draw one new Secondary Mission card.' },
      { action: 'Plunder', rows: [
        { label: 'Starts', text: 'Your Shooting phase.' },
        { label: 'Units', text: 'One unit within a terrain area that is not within your territory.' },
        { label: 'Use Limit', text: 'Once per turn.' },
        { label: 'Completes', text: 'Immediately.' },
        { label: 'Effect', text: 'That terrain area is plundered.' },
      ] },
    ],
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
    lore: 'You must advance swiftly into no man\'s land and seize it before the enemy can, lest they take control of the battlefield.',
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
    lore: 'You must advance swiftly into no man\'s land and seize it before the enemy can, lest they take control of the battlefield.',
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

// Overlay the RU block text (heading / when / rows.text) onto a single English mission.
// Mirrors the `localize` helper in useTracker.js — name and all logic fields stay English.
function localizeMission(m, role) {
  const tr = role ? missionsRu.secondary[`${m.slug}|${role}`] : missionsRu.primary[m.slug]
  if (!tr) return m
  return {
    ...m,
    // briefing is replaced wholesale (RU mirrors the EN structure, maintained in lockstep).
    ...(tr.briefing ? { briefing: tr.briefing } : {}),
    ...(tr.lore ? { lore: tr.lore } : {}),
    blocks: m.blocks.map((b, bi) => {
      const tb = tr.blocks[bi]
      if (!tb) return b
      return {
        ...b,
        heading: tb.heading ?? b.heading,
        when: b.when != null ? (tb.when ?? b.when) : b.when,
        rows: b.rows.map((r, ri) => ({ ...r, text: (tb.rows && tb.rows[ri]) || r.text })),
      }
    }),
  }
}

// Localized mission catalogue for the Missions reference page ({ primary, secondary }).
// Mirrors the getEventContent(locale) pattern: EN is returned as-is; RU overlays missionsRu.
export function getMissions(locale) {
  if (locale !== 'ru') return en
  return {
    primary: en.primary.map(m => localizeMission(m, null)),
    secondary: en.secondary.map(m => localizeMission(m, m.role)),
  }
}
