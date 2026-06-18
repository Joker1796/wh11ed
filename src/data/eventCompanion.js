// Warhammer Event Companion (v1.0) — pages 1–53.
// Bilingual shape { en, ru }; RU filled in a later pass (views fall back to EN).
//
// Prose pages are block lists rendered via RuleBlock (+ DataTable when `table`).
// The Layouts page is data-driven: 5 Force Dispositions form a 5×5 matrix; each
// unordered pairing is a `matchup` giving each side's Primary Mission + 3 layouts.
// Illustrations are placeholders (plug.png) until the real diagrams are added.

const PLUG = '/images/event/plug.png'

const en = {
  // ── Page 1: Mission Sequence ───────────────────────────────────────────────
  sequence: {
    introduction: {
      id: 'introduction',
      title: 'Introduction',
      body:
        'Welcome to the Warhammer Event Companion! This document is designed to help you ' +
        'run and play in organised events, from local leagues to the world championships. ' +
        'It uses the most recent Chapter Approved Mission Deck to create the best ' +
        'experiences for all hobbyists.\n\n' +
        'Within this companion, you’ll find a ready-made framework for levelling the ' +
        'playing field and getting games underway quickly. Its recommendations will be ' +
        'followed in full at most Games Workshop Warhammer Events, and are considered the ' +
        'official way to play Warhammer 40,000 in an event setting, but can be adapted to ' +
        'suit your own circumstances.\n\n' +
        'The recommendations are presented as follows:\n' +
        '▪ **Warhammer Event Mission Sequence:** Adjustments to the steps players would ' +
        'normally follow to generate a mission and prepare the battlefield.\n' +
        '▪ **Chapter Approved Mission Deck Errata & FAQs:** Updates to certain cards and ' +
        'answers to frequently asked questions.\n' +
        '▪ **Pairings and Rankings:** Advice for fairly pairing players and determining rankings.\n' +
        '▪ **Terrain Layouts:** A suite of carefully designed terrain setups to be used in ' +
        'conjunction with the Chapter Approved Mission Deck.\n' +
        '▪ **Base Size Guide:** The most up-to-date base sizes appropriate for all ' +
        'Warhammer 40,000 models that can be used in Warhammer Events.',
      note:
        "**Designer's Note:** This companion does not use the full contents of the Chapter " +
        'Approved Mission Deck; it has been written to provide the best experience in a ' +
        'Warhammer Event. For this reason we have not included the Deployment or Twist ' +
        'cards, which are left for pick-up-and-play games.\n\n' +
        'This companion does not include rules and recommendations for doubles, teams or ' +
        'Dominatus Warhammer Events. These can be found on warhammer-community.com.',
    },
    intro:
      'Before attending a Warhammer Event, each player musters their army; a Warhammer ' +
      'Event battle is then waged by completing the steps below.',
    blocks: [
      {
        id: 'step-1',
        title: '1 · Muster Armies',
        body:
          'Muster armies as described in the Warhammer 40,000 app, with the following ' +
          'exception: once they have mustered their army, a player selects **one Force ' +
          'Disposition card** available to them and records that on their roster.',
      },
      {
        id: 'step-2',
        title: '2 · Determine Mission',
        body:
          "Each player finds their opponent's Force Disposition symbol on their Force " +
          "Disposition card. The **Primary Mission** listed below that symbol is that " +
          "player's Primary Mission, which describes how to score VP.",
      },
      {
        id: 'step-3',
        title: '3 · Determine a Layout',
        body:
          'Each combination of Primary Missions has three recommended layouts, labelled ' +
          '**A**, **B** and **C**. As directed by the organiser, the players either use ' +
          'the layout specified or randomly determine which to use.',
      },
      {
        id: 'step-4',
        title: '4 · Create the Battlefield',
        body:
          'Missions are played on rectangular battlefields **44" by 60"** in size. ' +
          'Players set up the terrain areas as shown in the selected layout, then set up ' +
          'terrain features on those terrain areas as shown in the selected layout.',
      },
      {
        id: 'step-5',
        title: '5 · Determine Attacker and Defender',
        body:
          "Players look at the selected layout and agree which edges of the battlefield " +
          "correspond with the Attacker's and Defender's battlefield edges labelled on " +
          "the card.\n\n→ Roll off: the winner decides who will be the Attacker and who " +
          "will be the Defender.",
      },
      {
        id: 'step-6',
        title: '6 · Select Secondary Missions',
        body:
          'Secondary Mission cards detail additional ways to score VP. Players secretly ' +
          'note whether they will use **Tactical** or **Fixed** Secondary Missions. If ' +
          'using Fixed Missions, they also note which two Fixed Missions they will use. ' +
          'Players then reveal these decisions.',
      },
      {
        id: 'step-7',
        title: '7 · Declare Battle Formations',
        body:
          'Players secretly note down, in order:\n' +
          '▪ Which of their units will start the battle embarked within which [TRANSPORT].\n' +
          '▪ Which of their units will start the battle in strategic reserves.\n' +
          'Players then reveal these decisions.',
      },
      {
        id: 'step-8',
        title: '8 · Deploy Armies',
        body:
          'Players take it in turns to set up their units (excluding those in strategic ' +
          'reserves) one at a time, wholly within their deployment zone, starting with ' +
          'the **Defender**. If you set up a [TITANIC] unit when it is your turn, skip ' +
          'your next turn to set up a unit. Once you have finished, if your opponent has ' +
          'units not yet set up, they set up those units.',
      },
      {
        id: 'step-9',
        title: '9 · Redeploy Units',
        body:
          'Some rules let you redeploy certain units after both armies are deployed. ' +
          'Unless otherwise stated, resolve those rules in this step. Players alternate, ' +
          'starting with the Attacker. Units placed in strategic reserves in this step do ' +
          'not count towards the combined points value of your strategic reserves units.',
      },
      {
        id: 'step-10',
        title: '10 · Determine First Turn',
        body: '→ Roll off: the winner takes the first turn.',
      },
      {
        id: 'step-11',
        title: '11 · Resolve Pre-battle Rules',
        body:
          'Players alternate resolving any pre-battle rules units from their army may ' +
          'have, starting with the player who will take the first turn.',
      },
      {
        id: 'step-12',
        title: '12 · Begin the Battle',
        body: 'The first battle round begins.',
      },
      {
        id: 'step-13',
        title: '13 · End the Battle',
        body:
          'The battle ends after five battle rounds have been completed. Even if you have ' +
          'no models remaining at the start of your turn, players continue to play out ' +
          'their turns until the battle ends.',
      },
      {
        id: 'step-14',
        title: '14 · Determine Victor',
        body:
          'Each player scores **10VP** if their army is painted to a Battle Ready ' +
          'standard. At the end of the battle, the player with the most VP is the victor; ' +
          'if tied, the battle is a draw. The maximum VP from each source is listed ' +
          'below — any VP scored in excess of these maximums are ignored.',
        table: {
          title: 'Maximum VP per Source',
          headers: ['VP Source', 'Maximum VP'],
          rows: [
            ['Primary Mission', '45VP (up to 15VP per battle round)'],
            ['Secondary Missions', '45VP (up to 15VP per battle round)*'],
            ['Battle Ready Army', '10VP'],
          ],
        },
        tableNote: '* In addition, you can gain a maximum of 20VP per Fixed Secondary Mission card.',
      },
    ],
    secondary: [
      {
        id: 'fixed-missions',
        title: 'Fixed Missions',
        body:
          'Fixed Missions are those marked with the Fixed symbol. If you are using Fixed ' +
          'Missions, display your selected Fixed Mission cards face-up. Fixed Missions ' +
          'cannot be discarded and are active for you throughout the battle.',
      },
      {
        id: 'tactical-missions',
        title: 'Tactical Missions',
        body:
          'If you are using Tactical Missions, shuffle your Secondary Mission deck ' +
          'face-down.\n' +
          '▪ At the start of your Command phase, draw two Secondary Missions face-up from ' +
          'your Secondary Missions deck; these are active for you.\n' +
          '▪ (Once per battle) At the end of your Command phase, you can spend 1CP to ' +
          'discard one of your active Secondary Mission cards and draw one new card.',
      },
      {
        id: 'achieving-secondary',
        title: 'Achieving Secondary Missions',
        body:
          "At the end of each player's turn, each player does the following, starting " +
          'with the player whose turn it is:\n' +
          '▪ First, if you met the conditions on one or more Secondary Missions, you can ' +
          'gain the VP specified. If you do, and you are using Tactical Missions, discard ' +
          'that Secondary Mission — it is achieved.\n' +
          '▪ Then, if it is your turn and you are using Tactical Missions, you can discard ' +
          'one or more active Secondary Missions. If you do, you gain 1CP.',
      },
    ],
    designerNotes: [
      {
        id: 'cumulative-or',
        title: "'Cumulative' and 'Or' Conditions",
        body:
          "Some cards include a condition marked 'cumulative' that follows a normal " +
          'condition. If a player achieves the cumulative condition, they gain the VP for ' +
          "both that and the normal condition.\n\nSome cards include one or more 'or' " +
          'conditions following a normal condition. A player can only gain VP for one of ' +
          'these conditions or the normal condition.',
      },
      {
        id: 'leaves-battlefield',
        title: 'Leaves the Battlefield',
        body:
          'Some cards refer to a unit or units leaving the battlefield. A unit leaves the ' +
          'battlefield if it is destroyed, if it embarks on a [TRANSPORT], or if a rule ' +
          'removes that unit from the battlefield (e.g. to place it in strategic reserves).',
      },
      {
        id: 'one',
        title: 'One',
        body: "When a card states 'one', underlined, it means exactly one, not one or more.",
      },
      {
        id: 'vp-up-to-limit',
        title: 'VP Up to a Limit',
        body:
          'Some cards award VP up to a limit, e.g. (up to 5VP). In such cases, any VP you ' +
          'score in excess of this limit are ignored.',
      },
      {
        id: 'when-drawn',
        title: 'When Drawn',
        body:
          "Some Secondary Mission cards begin with a 'When Drawn' section. This section " +
          'only applies if you are using Tactical Secondary Missions.',
      },
    ],
  },

  // ── Page 7–8 + layouts: Terrain Layouts ────────────────────────────────────
  terrain: {
    intro:
      'These are the layouts used at Games Workshop events, designed by the Warhammer ' +
      'Studio to create risk-and-reward decisions with each player\'s objectives in mind. ' +
      'Each combination of Primary Missions has three recommended layouts (A, B and C). ' +
      'As directed by the organiser, players either use the layout specified or randomly ' +
      'determine which to use.\n\nSelect your Force Disposition and your opponent\'s below ' +
      'to view the matchup\'s Primary Missions and its three terrain layouts.',
    footprints: {
      title: 'Recommended Terrain Area Footprints',
      headers: ['Terrain Area Footprint Size', 'Quantity'],
      rows: [
        ['6" × 4"', '4'],
        ['10" × 2.5"', '2'],
        ['6" × 2"', '4'],
        ['7" × 11.5"', '4'],
        ['8" × 11.5" Polygon', '2'],
      ],
    },
    keyNote:
      'Each layout uses the terrain features from the Battlefields: Armageddon box in the ' +
      "'Warhammer recommended' build, each denoted as a **dense** (green) or **light** " +
      '(yellow) terrain feature. Letters (AB, CD, EF, GH) mark which terrain feature ' +
      'corresponds with the component markings on that terrain set. Space is purposely ' +
      'left between a terrain feature and the edge of its terrain area so a line of models ' +
      'can stand on the terrain area from the outside.',
    legend: [
      { id: 'dense', label: 'Dense Terrain', desc: 'Coloured green on the layouts.' },
      { id: 'light', label: 'Light Terrain', desc: 'Coloured yellow on the layouts.' },
      { id: 'atk-dz', label: "Attacker's Deployment Zone", desc: 'The Attacker sets up their units wholly within this area.' },
      { id: 'def-dz', label: "Defender's Deployment Zone", desc: 'The Defender sets up their units wholly within this area.' },
      { id: 'nml', label: "No Man's Land", desc: "The region not within either player's deployment zone." },
      { id: 'home-obj', label: 'Home Objective', desc: 'An objective marker in a player\'s own territory.' },
      { id: 'central-obj', label: 'Central Objective', desc: 'An objective marker in the centre of the battlefield.' },
      { id: 'expansion-obj', label: 'Expansion Objective', desc: 'An objective marker contested in No Man\'s Land.' },
    ],
  },

  // 5 Force Dispositions — the axes of the matrix.
  dispositions: [
    { id: 'take-and-hold', name: 'Take and Hold', symbol: PLUG },
    { id: 'purge-the-foe', name: 'Purge the Foe', symbol: PLUG },
    { id: 'disruption', name: 'Disruption', symbol: PLUG },
    { id: 'reconnaissance', name: 'Reconnaissance', symbol: PLUG },
    { id: 'priority-assets', name: 'Priority Assets', symbol: PLUG },
  ],

  // 15 unordered matchups. missionA/missionB = each side's Primary Mission.
  matchups: [
    { a: 'take-and-hold', b: 'take-and-hold', missionA: 'Battlefield Dominance', missionB: 'Battlefield Dominance' },
    { a: 'take-and-hold', b: 'purge-the-foe', missionA: 'Immovable Object', missionB: 'Unstoppable Force' },
    { a: 'take-and-hold', b: 'disruption', missionA: 'Determined Acquisition', missionB: 'Death Trap' },
    { a: 'take-and-hold', b: 'reconnaissance', missionA: 'Purge and Secure', missionB: 'Reconnaissance Sweep' },
    { a: 'take-and-hold', b: 'priority-assets', missionA: 'Inescapable Dominion', missionB: 'Secure Asset' },
    { a: 'purge-the-foe', b: 'purge-the-foe', missionA: 'Meatgrinder', missionB: 'Meatgrinder' },
    { a: 'purge-the-foe', b: 'disruption', missionA: 'Punishment', missionB: 'Delaying Action' },
    { a: 'purge-the-foe', b: 'reconnaissance', missionA: 'Consecrate', missionB: 'Triangulation' },
    { a: 'purge-the-foe', b: 'priority-assets', missionA: "Destroyer's Wrath", missionB: 'Vital Link' },
    { a: 'disruption', b: 'disruption', missionA: 'Outmanoeuvre', missionB: 'Outmanoeuvre' },
    { a: 'disruption', b: 'reconnaissance', missionA: 'Smoke and Mirrors', missionB: 'Surveil the Foe' },
    { a: 'disruption', b: 'priority-assets', missionA: 'Locate and Deny', missionB: 'Extract Relic' },
    { a: 'reconnaissance', b: 'reconnaissance', missionA: 'Gather Intel', missionB: 'Gather Intel' },
    { a: 'reconnaissance', b: 'priority-assets', missionA: 'Search and Scour', missionB: 'Vanguard Operation' },
    { a: 'priority-assets', b: 'priority-assets', missionA: 'Sabotage', missionB: 'Sabotage' },
  ].map(m => ({
    ...m,
    layouts: ['A', 'B', 'C'].map(id => ({ id, image: PLUG })),
  })),

  // ── Page 5–6: Pairings & Rankings ──────────────────────────────────────────
  pairings: {
    intro:
      'There are countless ways to run a Warhammer Event. The following recommendations ' +
      'are followed at most official Games Workshop events and are designed to create the ' +
      'fairest, most fun experience for every attendee, regardless of standing.',
    blocks: [
      {
        id: 'pairing-players',
        title: 'Pairing Players',
        body:
          'While the first round of most tournaments is randomly paired, subsequent rounds ' +
          'can be paired in a number of ways. We recommend pairing players by the following ' +
          'criteria:\n' +
          '▪ First — by record (the number of wins, losses and draws).\n' +
          '▪ Second — by win path (the timing of the rounds in which a player won or lost).\n' +
          '▪ Third — randomly within players of the same ranking.',
        note:
          "A player's 'win path' refers not to their number of wins and losses, but to the " +
          'timing of those wins and losses. Pairing by win path tends to pair players based ' +
          'on shared recent experience, improving the enjoyment of both.',
      },
      {
        id: 'ranking-players',
        title: 'Ranking Players',
        body:
          'To break ties between players who end an event with the same record, we recommend ' +
          'ranking players by the following criteria:\n' +
          '▪ First — by overall record (wins, losses and draws).\n' +
          "▪ Second — by their opponents' win records (strength of schedule).\n" +
          '▪ Third — by total Victory points (VP).',
        note:
          'We do not recommend using VP as a pairing metric, nor as a ranking metric until ' +
          'other metrics are exhausted: the VP scored in a game rarely tells a clear story ' +
          'about how close it actually was. Opponent win record is an ideal tie-breaker.',
      },
      {
        id: 'afterword',
        title: 'Afterword — What is the Point of a Warhammer Event?',
        body:
          "First and foremost, a tournament is not about celebrating the ultimate victor — " +
          'it is the experience of every single attendee that matters, and the recognition ' +
          'that, for most people, community and friendship are both the purpose and the ' +
          'outcome.\n\nBefore you roll a single dice, remember two things:\n' +
          '1. The person across the table shares your love of Warhammer.\n' +
          '2. By the time the dust settles, almost everyone will have lost a game.\n' +
          'Focus on this, and while most of you will have lost a game or two, you will all ' +
          'share victory in your experience of what it is to attend a Warhammer Event.',
      },
    ],
  },

  // ── Page 4: Errata & FAQs ──────────────────────────────────────────────────
  faq: {
    intro:
      'When playing in a Warhammer Event Mission, the following amendments to cards in the ' +
      'Chapter Approved Mission Deck are used. Questions are reviewed periodically and ' +
      'answered below.',
    errata: 'Chapter Approved Mission Deck errata: **None.**',
    items: [
      {
        q: 'Some Primary Mission cards let a player place operation markers on the battlefield. Can I remove these?',
        a: 'Your Primary Mission card will specify how and when you can remove operation markers from the battlefield. If it doesn\'t, you cannot remove operation markers.',
      },
      {
        q: "For the Death Trap Primary Mission, one objective reads 'One or more enemy units that started the turn within a terrain area were destroyed, if that terrain area is trapped.' Does that terrain area have to have been trapped at the point that enemy unit was destroyed?",
        a: 'No.',
      },
      {
        q: "For the Surveil the Foe Primary Mission, can I achieve the objective if I remove an operation marker after surveilling an enemy unit within range of an objective with that marker, as long as it is within the same turn?",
        a: 'Yes.',
      },
      {
        q: 'For the Vital Link Primary Mission, if there is more than one central objective, can I score the cumulative VP for my operation markers regardless of which central objective(s) they are within?',
        a: 'Yes, as long as you control the objective(s) those operation markers are within.',
      },
    ],
  },
}

// RU pass pending — views fall back to EN where a field is missing.
const ru = {}

export const eventCompanion = { en, ru }
