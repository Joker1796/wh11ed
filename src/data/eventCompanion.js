// Warhammer Event Companion (v1.0) — pages 1–53.
// Bilingual shape { en, ru }; RU filled in a later pass (views fall back to EN).
//
// Prose pages are block lists rendered via RuleBlock (+ DataTable when `table`).
// The Layouts page is data-driven: 5 Force Dispositions form a 5×5 matrix; each
// unordered pairing is a `matchup` giving each side's Primary Mission + 3 layouts.
// Layout diagrams default to a placeholder (plug.png); real ones extracted from the
// source PDF are wired in per matchup/layout via `layoutImages` below.

const PLUG = '/images/event/plug.png'

// Real layout diagrams (extracted from the source PDF), keyed by `${a}|${b}` then
// layout id. Anything not listed falls back to the PLUG placeholder. The `a|b` key
// uses the same ordering as the `matchups` array literal below (that order is fixed).
const layoutImages = {
  'take-and-hold|take-and-hold': { A: '/images/event/layout-take-and-hold-take-and-hold-a.jpg', B: '/images/event/layout-take-and-hold-take-and-hold-b.jpg', C: '/images/event/layout-take-and-hold-take-and-hold-c.jpg' },
  'take-and-hold|purge-the-foe': { A: '/images/event/layout-take-and-hold-purge-the-foe-a.jpg', B: '/images/event/layout-take-and-hold-purge-the-foe-b.jpg', C: '/images/event/layout-take-and-hold-purge-the-foe-c.jpg' },
  'take-and-hold|disruption': { A: '/images/event/layout-take-and-hold-disruption-a.jpg', B: '/images/event/layout-take-and-hold-disruption-b.jpg', C: '/images/event/layout-take-and-hold-disruption-c.jpg' },
  'take-and-hold|reconnaissance': { A: '/images/event/layout-take-and-hold-reconnaissance-a.jpg', B: '/images/event/layout-take-and-hold-reconnaissance-b.jpg', C: '/images/event/layout-take-and-hold-reconnaissance-c.jpg' },
  'take-and-hold|priority-assets': { A: '/images/event/layout-take-and-hold-priority-assets-a.jpg', B: '/images/event/layout-take-and-hold-priority-assets-b.jpg', C: '/images/event/layout-take-and-hold-priority-assets-c.jpg' },
  'purge-the-foe|purge-the-foe': { A: '/images/event/layout-purge-the-foe-purge-the-foe-a.jpg', B: '/images/event/layout-purge-the-foe-purge-the-foe-b.jpg', C: '/images/event/layout-purge-the-foe-purge-the-foe-c.jpg' },
  'purge-the-foe|disruption': { A: '/images/event/layout-purge-the-foe-disruption-a.jpg', B: '/images/event/layout-purge-the-foe-disruption-b.jpg', C: '/images/event/layout-purge-the-foe-disruption-c.jpg' },
  'purge-the-foe|reconnaissance': { A: '/images/event/layout-purge-the-foe-reconnaissance-a.jpg', B: '/images/event/layout-purge-the-foe-reconnaissance-b.jpg', C: '/images/event/layout-purge-the-foe-reconnaissance-c.jpg' },
  'purge-the-foe|priority-assets': { A: '/images/event/layout-purge-the-foe-priority-assets-a.jpg', B: '/images/event/layout-purge-the-foe-priority-assets-b.jpg', C: '/images/event/layout-purge-the-foe-priority-assets-c.jpg' },
  'disruption|disruption': { A: '/images/event/layout-disruption-disruption-a.jpg', B: '/images/event/layout-disruption-disruption-b.jpg', C: '/images/event/layout-disruption-disruption-c.jpg' },
  'disruption|reconnaissance': { A: '/images/event/layout-disruption-reconnaissance-a.jpg', B: '/images/event/layout-disruption-reconnaissance-b.jpg', C: '/images/event/layout-disruption-reconnaissance-c.jpg' },
  'disruption|priority-assets': { A: '/images/event/layout-disruption-priority-assets-a.jpg', B: '/images/event/layout-disruption-priority-assets-b.jpg', C: '/images/event/layout-disruption-priority-assets-c.jpg' },
  'reconnaissance|reconnaissance': { A: '/images/event/layout-reconnaissance-reconnaissance-a.jpg', B: '/images/event/layout-reconnaissance-reconnaissance-b.jpg', C: '/images/event/layout-reconnaissance-reconnaissance-c.jpg' },
  'reconnaissance|priority-assets': { A: '/images/event/layout-reconnaissance-priority-assets-a.jpg', B: '/images/event/layout-reconnaissance-priority-assets-b.jpg', C: '/images/event/layout-reconnaissance-priority-assets-c.jpg' },
  'priority-assets|priority-assets': { A: '/images/event/layout-priority-assets-priority-assets-a.jpg', B: '/images/event/layout-priority-assets-priority-assets-b.jpg', C: '/images/event/layout-priority-assets-priority-assets-c.jpg' },
}

const en = {
  // ── Page 1: Mission Sequence ───────────────────────────────────────────────
  sequence: {
    introduction: {
      id: 'introduction',
      title: 'Introduction',
      authorNote: '',
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
      seeAlso: ['Mission Sequence EC:sequence', 'Terrain Layouts EC:layouts'],
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
          'exception: once they have mustered their army, a player selects one ' +
          '[FORCE DISPOSITION] card available to them and records that on their roster.',
        seeAlso: ['Terrain Layouts EC:layouts'],
      },
      {
        id: 'step-2',
        title: '2 · Determine Mission',
        body:
          "Each player finds their opponent's Force Disposition symbol on their Force " +
          "Disposition card. The [PRIMARY MISSION] listed below that symbol is that " +
          "player's Primary Mission, which describes how to score VP.",
      },
      {
        id: 'step-3',
        title: '3 · Determine a Layout',
        body:
          'Each combination of Primary Missions has three recommended [LAYOUT]s, labelled ' +
          '**A**, **B** and **C**, which can be found in the **Terrain Layouts** section of ' +
          'this reference. As directed by the organiser, the players either use the layout ' +
          'specified or randomly determine which to use.',
        seeAlso: ['Terrain Layouts EC:layouts'],
      },
      {
        id: 'step-4',
        title: '4 · Create the Battlefield',
        body:
          'Missions are played on rectangular battlefields **44" by 60"** in size. ' +
          'Players set up the terrain areas as shown in the selected layout, then set up ' +
          'terrain features (13) on those terrain areas as shown in the selected layout.',
        seeAlso: ['Terrain 13.00'],
      },
      {
        id: 'step-5',
        title: '5 · Determine Attacker and Defender',
        body:
          "Players look at the selected layout and agree which edges of the battlefield " +
          "correspond with the [ATTACKER]'s and [DEFENDER]'s battlefield edges labelled on " +
          "the card.\n\n→ Roll off: the winner decides who will be the Attacker and who " +
          "will be the Defender.",
      },
      {
        id: 'step-6',
        title: '6 · Select Secondary Missions',
        body:
          '[SECONDARY MISSION] cards detail additional ways to score VP. Players secretly ' +
          'note whether they will use [TACTICAL MISSION]s or [FIXED MISSION]s. If ' +
          'using Fixed Missions, they also note which two Fixed Missions they will use. ' +
          'Players then reveal these decisions.',
      },
      {
        id: 'step-7',
        title: '7 · Declare Battle Formations',
        body:
          'Players secretly note down, in order:\n' +
          '▪ Which of their units will start the battle embarked within which TRANSPORTS (18).\n' +
          '▪ Which of their units will start the battle in strategic reserves (20).\n' +
          'Players then reveal these decisions.',
        seeAlso: ['Transports 18.00', 'Strategic Reserves 20.00'],
      },
      {
        id: 'step-8',
        title: '8 · Deploy Armies',
        body:
          'Players take it in turns to set up their units (excluding those in strategic ' +
          'reserves) one at a time, wholly within their deployment zone, starting with ' +
          'the **Defender**. If you set up a TITANIC unit when it is your turn, skip ' +
          'your next turn to set up a unit. Once you have finished, if your opponent has ' +
          'units not yet set up, they set up those units.',
      },
      {
        id: 'step-9',
        title: '9 · Redeploy Units',
        body:
          'Some rules let you redeploy certain units after both armies are deployed. ' +
          'Unless otherwise stated, resolve those rules in this step. Players alternate, ' +
          'starting with the Attacker. Units placed in strategic reserves (20) in this step ' +
          'do not count towards the combined points value of your strategic reserves units.',
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
          'The battle ends after five battle rounds (07) have been completed. Even if you ' +
          'have no models remaining at the start of your turn, players continue to play out ' +
          'their turns until the battle ends.',
      },
      {
        id: 'step-14',
        title: '14 · Determine Victor',
        body:
          'Each player scores **10VP** if their army is painted to a [BATTLE READY] ' +
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
          '▪ At the start of your Command phase (08), draw two Secondary Missions face-up ' +
          'from your Secondary Missions deck; these are active for you.\n' +
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
          'battlefield if it is destroyed, if it embarks on a TRANSPORT (18), or if a rule ' +
          'removes that unit from the battlefield (e.g. to place it in strategic reserves (20)).',
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
      'Studio to create risk-and-reward decisions with each player\'s objectives (14) in ' +
      'mind. Each combination of [PRIMARY MISSION]s has three recommended [LAYOUT]s ' +
      '(A, B and C). As directed by the organiser, players either use the layout ' +
      'specified or randomly determine which to use.\n\nSelect your [FORCE DISPOSITION] ' +
      'and your opponent\'s below to view the matchup\'s Primary Missions and its three ' +
      'terrain layouts.',
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
      'corresponds with the component markings on that terrain set. The configurations are ' +
      'designed to create the best experience with the Hidden rule and movement rules for ' +
      'various units, and space is purposely left between a terrain feature and the edge of ' +
      'its terrain area so a line of models can stand on the terrain area from the outside.' +
      '\n\nIf you do not have the Battlefields: Armageddon terrain, you can recreate these ' +
      'layouts with your own terrain close to the same size as the various features, ' +
      'denoting for all players whether each is a dense or light terrain feature.',
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
    layouts: ['A', 'B', 'C'].map(id => ({
      id,
      image: layoutImages[`${m.a}|${m.b}`]?.[id] ?? PLUG,
    })),
  })),

  // Keyword-popover glossary for Event Companion terms (reuses KeywordPopover).
  glossary: [
    {
      name: '[FORCE DISPOSITION]', num: '',
      fullText:
        "The card a player selects after mustering their army. Your opponent's Force " +
        'Disposition symbol on your card tells you your **Primary Mission** for the battle.',
    },
    {
      name: '[PRIMARY MISSION]', num: '',
      fullText:
        "Your main source of VP (up to 45VP, max 15 per battle round), determined by the " +
        "combination of both players' Force Dispositions.",
    },
    {
      name: '[SECONDARY MISSION]', num: '',
      fullText:
        'Additional ways to score VP (up to 45VP). Each player secretly chooses **Fixed** ' +
        'or **Tactical** Secondary Missions before the battle.',
    },
    {
      name: '[FIXED MISSION]', num: '',
      fullText:
        'Secondary Missions displayed face-up from the start. They cannot be discarded and ' +
        'stay active all battle (max 20VP per Fixed card).',
    },
    {
      name: '[TACTICAL MISSION]', num: '',
      fullText:
        'Secondary Missions drawn from a shuffled deck: draw two at the start of your ' +
        'Command phase (08); once per battle you may spend 1CP to discard one and redraw.',
    },
    {
      name: '[OPERATION MARKER]', num: '',
      fullText:
        'Markers that some Primary Missions let you place on the battlefield. You can only ' +
        'remove them if the Primary Mission card states how and when.',
    },
    {
      name: '[BATTLE READY]', num: '',
      fullText:
        'A painting standard. Each player scores 10VP if their army is painted to a Battle ' +
        'Ready standard.',
    },
    {
      name: '[ATTACKER]', num: '',
      fullText:
        "One of the two battle roles. The selected layout labels the Attacker's battlefield " +
        'edges; the roles are decided by a roll-off when determining Attacker and Defender.',
    },
    {
      name: '[DEFENDER]', num: '',
      fullText:
        "One of the two battle roles. The Defender deploys first, and the layout labels the " +
        "Defender's battlefield edge.",
    },
    {
      name: '[LAYOUT]', num: '',
      fullText:
        'One of three recommended terrain setups (A, B and C) for a given Primary Mission ' +
        'matchup, specifying terrain areas, features and objective positions.',
    },
  ],

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
        id: 'rules-appendix',
        title: 'The Rules Appendix, Errata and FAQs',
        body:
          'There are myriad ways to enjoy the Warhammer hobby, and they all manifest at a ' +
          'tournament — from gifted painters and competitors aiming for Best General to ' +
          'casual players making new friends. Such hobbyists sometimes find unusual rules ' +
          'interactions at the fringes of Warhammer 40,000 that can challenge organisers ' +
          'looking to give clear answers.\n\n' +
          'To address any such uncertainties, the Warhammer 40,000 app contains a ' +
          'comprehensive Rules Appendix, along with faction-specific errata and FAQ entries. ' +
          'Should an odd rules interaction come up during your event and the Core Rules do ' +
          'not provide a clear answer, we recommend consulting these resources.',
        seeAlso: ['Core Abilities 24.00', 'Errata & FAQs EC:faq'],
      },
      {
        id: 'afterword',
        title: 'Afterword — What is the Point of a Warhammer Event?',
        flavor: true,
        body:
          'Warhammer is more popular than ever, and this popularity has extended to the ' +
          'tournament scene. With so many hobbyists participating within growing ' +
          'communities, it is important to ruminate on the point of a tournament. First and ' +
          'foremost, it is not about celebrating the ultimate victor; someone who goes ' +
          'undefeated and wins Best General needs very little acclaim beyond the outcome ' +
          'itself (after all, they won!). Instead, it is the experience of every single ' +
          'attendee that truly matters, and the recognition that, for most people who ' +
          'attend a tournament, community and friendship are both the purpose and the ' +
          'outcome.\n\nBefore you roll a single dice against an opponent to start your ' +
          'tournament experience, remember two things:\n' +
          '1. The person across the table from you shares your love of Warhammer.\n' +
          '2. By the time the dust settles on the event, almost everyone will have lost a ' +
          'game (typically, at most, only one or two people will leave without a loss).\n' +
          'While any game yields winners and losers on the tabletop, the magic of Warhammer ' +
          'in an event setting is the opportunity it provides every participant to become a ' +
          'bigger part of the community and to build friendships that can last a lifetime. ' +
          'Focus on this inalienable truth, and while most of you will have lost a game or ' +
          'two, you will all share victory in your experience of what it is to attend a ' +
          'Warhammer Event.\n\n— The Warhammer Design Studio and the Warhammer Events Team',
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
        q: 'Some [PRIMARY MISSION] cards let a player place [OPERATION MARKER]s on the battlefield. Can I remove these?',
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

// RU translation — mirrors EN structure by index/key; only translated fields are
// present (card names + [BRACKET] keywords stay English, inherited from EN).
const ru = {
  sequence: {
    introduction: {
      title: 'Введение',
      authorNote:
        'От автора проекта wh11ed.ru. Текст этого раздела переведён на русский с помощью ' +
        'искусственного интеллекта, поэтому в нём возможны ошибки и неточности. Если вы их ' +
        'заметите — пожалуйста, напишите мне, и я внесу правки.',
      body:
        'Добро пожаловать в Warhammer Event Companion! Этот документ создан, чтобы помочь ' +
        'вам проводить организованные мероприятия и играть в них — от локальных лиг до ' +
        'мировых чемпионатов. Он использует самую свежую колоду Chapter Approved Mission ' +
        'Deck, чтобы дать лучший опыт всем хоббистам.\n\n' +
        'В этом путеводителе вы найдёте готовый каркас для выравнивания условий игры и ' +
        'быстрого начала партий. Его рекомендации в полном объёме применяются на ' +
        'большинстве мероприятий Games Workshop Warhammer Events и считаются официальным ' +
        'способом играть в Warhammer 40,000 в турнирном формате, но их можно адаптировать ' +
        'под ваши условия.\n\n' +
        'Рекомендации представлены следующим образом:\n' +
        '▪ **Warhammer Event Mission Sequence:** изменения шагов, которые игроки обычно ' +
        'выполняют, чтобы сгенерировать миссию и подготовить поле боя.\n' +
        '▪ **Chapter Approved Mission Deck Errata & FAQs:** обновления отдельных карт и ' +
        'ответы на частые вопросы.\n' +
        '▪ **Pairings and Rankings:** советы по честному составлению пар и определению ранга.\n' +
        '▪ **Terrain Layouts:** набор тщательно продуманных расстановок тиррейна (terrain) ' +
        'для использования с Chapter Approved Mission Deck.\n' +
        '▪ **Base Size Guide:** самые актуальные размеры подставок для всех моделей ' +
        'Warhammer 40,000, которые можно использовать на мероприятиях.',
      note:
        "**Designer's Note:** этот путеводитель использует не всё содержимое Chapter Approved " +
        'Mission Deck; он написан, чтобы дать лучший опыт на турнире. По этой причине мы не ' +
        'включили карты Deployment и Twist — они оставлены для игр в формате ' +
        'pick-up-and-play.\n\n' +
        'Этот путеводитель не включает правила и рекомендации для парных, командных или ' +
        'Dominatus-мероприятий Warhammer Events. Их можно найти на warhammer-community.com.',
      seeAlso: ['Последовательность миссии EC:sequence', 'Расстановки тиррейна EC:layouts'],
    },
    intro:
      'Перед посещением мероприятия каждый игрок собирает свою армию; затем битва на ' +
      'Warhammer Event ведётся выполнением шагов ниже.',
    blocks: [
      {
        title: '1 · Сбор армий',
        body:
          'Соберите армии, как описано в приложении Warhammer 40,000, со следующим ' +
          'исключением: собрав армию, игрок выбирает одну доступную ему карту ' +
          '[FORCE DISPOSITION] и записывает её в свой ростер.',
        seeAlso: ['Расстановки тиррейна EC:layouts'],
      },
      {
        title: '2 · Определение миссии',
        body:
          'Каждый игрок находит символ Force Disposition своего соперника на своей карте ' +
          'Force Disposition. Указанная под этим символом [PRIMARY MISSION] — это основная ' +
          'миссия данного игрока, которая описывает, как набирать очки победы (VP).',
      },
      {
        title: '3 · Определение расстановки',
        body:
          'Для каждой комбинации основных миссий есть три рекомендованные [LAYOUT], ' +
          'обозначенные **A**, **B** и **C**, которые можно найти в разделе ' +
          '**Terrain Layouts** этого справочника. По указанию организатора игроки либо ' +
          'используют заданную расстановку, либо определяют её случайно.',
        seeAlso: ['Расстановки тиррейна EC:layouts'],
      },
      {
        title: '4 · Создание поля боя',
        body:
          'Миссии играются на прямоугольных полях боя размером **44" на 60"**. Игроки ' +
          'расставляют участки укрытий (terrain), как показано в выбранной расстановке, ' +
          'затем размещают на этих участках элементы ландшафта (terrain features) (13), как ' +
          'показано в расстановке.',
        seeAlso: ['Укрытия 13.00'],
      },
      {
        title: '5 · Определение Атакующего и Защищающегося',
        body:
          'Игроки смотрят на выбранную расстановку и договариваются, какие края поля боя ' +
          'соответствуют краям [ATTACKER] и [DEFENDER], обозначенным на карте.\n\n→ Переброс: ' +
          'победитель решает, кто будет Атакующим (Attacker), а кто — Защищающимся (Defender).',
      },
      {
        title: '6 · Выбор вторичных миссий',
        body:
          'Карты [SECONDARY MISSION] описывают дополнительные способы набирать VP. Игроки ' +
          'тайно отмечают, будут ли они использовать [TACTICAL MISSION] или [FIXED MISSION]. ' +
          'Если используются фиксированные миссии, они также отмечают, какие две фиксированные ' +
          'миссии возьмут. Затем игроки раскрывают свои решения.',
      },
      {
        title: '7 · Объявление боевых построений',
        body:
          'Игроки тайно записывают, по порядку:\n' +
          '▪ Какие их юниты начнут битву погружёнными в какие ТРАНСПОРТЫ (TRANSPORT) (18).\n' +
          '▪ Какие их юниты начнут битву в стратегических резервах (strategic reserves) (20).\n' +
          'Затем игроки раскрывают свои решения.',
        seeAlso: ['Транспорты 18.00', 'Стратегические резервы 20.00'],
      },
      {
        title: '8 · Развёртывание армий',
        body:
          'Игроки по очереди выставляют свои юниты (кроме находящихся в стратегических ' +
          'резервах) по одному, полностью в пределах своей зоны развёртывания (deployment ' +
          'zone), начиная с **Защищающегося**. Если в свой черёд вы выставляете ' +
          'ТИТАНИЧЕСКИЙ (TITANIC) юнит, пропустите следующий черёд выставления юнита. Когда ' +
          'вы закончите, если у соперника остались невыставленные юниты, он выставляет их.',
      },
      {
        title: '9 · Передислокация юнитов',
        body:
          'Некоторые правила позволяют передислоцировать определённые юниты после того, как ' +
          'обе армии развёрнуты. Если не указано иное, применяйте такие правила на этом шаге. ' +
          'Игроки чередуются, начиная с Атакующего. Юниты, помещённые в стратегические ' +
          'резервы (20) на этом шаге, не учитываются в суммарной стоимости очков ваших юнитов ' +
          'в стратегических резервах.',
      },
      {
        title: '10 · Определение первого хода',
        body: '→ Переброс: победитель берёт первый ход.',
      },
      {
        title: '11 · Разрешение предбоевых правил',
        body:
          'Игроки чередуются, разрешая любые предбоевые правила юнитов своей армии, начиная ' +
          'с игрока, который будет ходить первым.',
      },
      {
        title: '12 · Начало битвы',
        body: 'Начинается первый боевой раунд (battle round).',
      },
      {
        title: '13 · Окончание битвы',
        body:
          'Битва заканчивается после того, как сыграно пять боевых раундов (07). Даже если у ' +
          'вас не осталось моделей в начале вашего хода, игроки продолжают разыгрывать свои ' +
          'ходы до конца битвы.',
      },
      {
        title: '14 · Определение победителя',
        body:
          'Каждый игрок получает **10VP**, если его армия покрашена по стандарту ' +
          '[BATTLE READY]. В конце битвы игрок с наибольшим числом VP — победитель; при ' +
          'равенстве — ничья. Максимум VP из каждого источника указан ниже — любые VP сверх ' +
          'этих максимумов игнорируются.',
        table: {
          title: 'Максимум VP по источникам',
          headers: ['Источник VP', 'Максимум VP'],
          rows: [
            ['Основная миссия (Primary Mission)', '45VP (до 15VP за боевой раунд)'],
            ['Вторичные миссии (Secondary Missions)', '45VP (до 15VP за боевой раунд)*'],
            ['Армия Battle Ready', '10VP'],
          ],
        },
        tableNote: '* Кроме того, вы можете получить максимум 20VP за каждую карту фиксированной вторичной миссии.',
      },
    ],
    secondary: [
      {
        title: 'Фиксированные миссии (Fixed Missions)',
        body:
          'Фиксированные миссии — это миссии, отмеченные символом Fixed. Если вы используете ' +
          'фиксированные миссии, выложите выбранные карты фиксированных миссий лицом вверх. ' +
          'Фиксированные миссии нельзя сбрасывать, и они активны для вас на протяжении всей ' +
          'битвы.',
      },
      {
        title: 'Тактические миссии (Tactical Missions)',
        body:
          'Если вы используете тактические миссии, перемешайте свою колоду вторичных миссий ' +
          'рубашкой вверх.\n' +
          '▪ В начале вашей фазы командования (Command phase) (08) возьмите две вторичные ' +
          'миссии лицом вверх из колоды вторичных миссий; они активны для вас.\n' +
          '▪ (Один раз за битву) В конце вашей фазы командования вы можете потратить 1CP, ' +
          'чтобы сбросить одну из активных карт вторичных миссий и взять одну новую карту.',
      },
      {
        title: 'Выполнение вторичных миссий',
        body:
          'В конце хода каждого игрока каждый игрок делает следующее, начиная с игрока, чей ' +
          'ход:\n' +
          '▪ Сначала, если вы выполнили условия одной или нескольких вторичных миссий, вы ' +
          'можете получить указанные VP. Если вы это делаете и используете тактические ' +
          'миссии, сбросьте эту вторичную миссию — она выполнена.\n' +
          '▪ Затем, если это ваш ход и вы используете тактические миссии, вы можете сбросить ' +
          'одну или несколько активных вторичных миссий. Если вы это делаете, вы получаете 1CP.',
      },
    ],
    designerNotes: [
      {
        title: 'Условия «cumulative» и «or»',
        body:
          'Некоторые карты включают условие, отмеченное как «cumulative» (накопительное), ' +
          'которое следует за обычным условием. Если игрок выполняет накопительное условие, ' +
          'он получает VP и за него, и за обычное условие.\n\nНекоторые карты включают одно ' +
          'или несколько условий «or» (или), которые следуют за обычным условием. Игрок может ' +
          'получить VP только за одно из этих условий или за обычное условие.',
      },
      {
        title: 'Покидание поля боя',
        body:
          'Некоторые карты упоминают юнит или юниты, покидающие поле боя. Юнит покидает поле ' +
          'боя, если он уничтожен, если он погружается в ТРАНСПОРТ (TRANSPORT) (18) или если ' +
          'правило убирает этот юнит с поля боя (например, помещая его в стратегические ' +
          'резервы (20)).',
      },
      {
        title: 'Одно (One)',
        body:
          'Когда карта указывает «one» (одно) с подчёркиванием, это означает ровно одно, а ' +
          'не одно или более.',
      },
      {
        title: 'VP до предела',
        body:
          'Некоторые карты дают VP до предела, например (up to 5VP). В таких случаях любые ' +
          'VP сверх этого предела игнорируются.',
      },
      {
        title: 'When Drawn',
        body:
          'Некоторые карты вторичных миссий начинаются с секции «When Drawn» (при взятии). ' +
          'Эта секция применяется, только если вы используете тактические вторичные миссии.',
      },
    ],
  },

  terrain: {
    intro:
      'Это расстановки, используемые на мероприятиях Games Workshop, разработанные студией ' +
      'Warhammer так, чтобы создавать решения «риск-награда» с учётом целей (objectives) (14) ' +
      'каждого игрока. Для каждой комбинации [PRIMARY MISSION] есть три рекомендованные ' +
      '[LAYOUT] (A, B и C). По указанию организатора игроки либо используют заданную ' +
      'расстановку, либо определяют её случайно.\n\nВыберите свою [FORCE DISPOSITION] и ' +
      'диспозицию соперника ниже, чтобы увидеть основные миссии матчапа и три его ' +
      'расстановки тиррейна.',
    footprints: {
      title: 'Рекомендованные размеры участков укрытий',
      headers: ['Размер участка укрытия', 'Количество'],
    },
    keyNote:
      'В каждой расстановке используются элементы ландшафта (terrain features) из набора ' +
      "Battlefields: Armageddon в сборке «Warhammer recommended», каждый обозначен как " +
      '**плотный** (dense, зелёный) или **лёгкий** (light, жёлтый) элемент ландшафта. Буквы ' +
      '(AB, CD, EF, GH) указывают, какой элемент ландшафта соответствует маркировке ' +
      'компонентов в этом наборе. Конфигурации продуманы так, чтобы дать лучший опыт с ' +
      'правилом Hidden и правилами движения для разных юнитов, и между элементом ландшафта ' +
      'и краем его участка намеренно оставлено место, чтобы линия моделей могла стоять на ' +
      'участке снаружи.\n\nЕсли у вас нет набора Battlefields: Armageddon, вы можете ' +
      'воссоздать эти расстановки своими укрытиями близкого размера к различным элементам, ' +
      'обозначив для всех игроков, является ли каждый плотным или лёгким элементом ландшафта.',
    legend: [
      { label: 'Плотные укрытия (Dense Terrain)', desc: 'Окрашены зелёным на расстановках.' },
      { label: 'Лёгкие укрытия (Light Terrain)', desc: 'Окрашены жёлтым на расстановках.' },
      { label: 'Зона развёртывания Атакующего', desc: 'Атакующий выставляет свои юниты полностью в пределах этой области.' },
      { label: 'Зона развёртывания Защищающегося', desc: 'Защищающийся выставляет свои юниты полностью в пределах этой области.' },
      { label: 'Ничейная земля (No Man’s Land)', desc: 'Область, не входящая в зону развёртывания ни одного из игроков.' },
      { label: 'Домашняя цель (Home Objective)', desc: 'Маркер цели на собственной территории игрока.' },
      { label: 'Центральная цель (Central Objective)', desc: 'Маркер цели в центре поля боя.' },
      { label: 'Цель экспансии (Expansion Objective)', desc: 'Маркер цели, оспариваемый на ничейной земле.' },
    ],
  },

  glossary: [
    { fullText: 'Карта, которую игрок выбирает после сбора армии. Символ Force Disposition соперника на вашей карте указывает вашу **основную миссию** (Primary Mission) на битву.' },
    { fullText: 'Ваш главный источник VP (до 45VP, максимум 15 за боевой раунд), определяемый комбинацией Force Disposition обоих игроков.' },
    { fullText: 'Дополнительные способы набирать VP (до 45VP). Перед битвой каждый игрок тайно выбирает **фиксированные** (Fixed) или **тактические** (Tactical) вторичные миссии.' },
    { fullText: 'Вторичные миссии, выложенные лицом вверх с начала. Их нельзя сбрасывать, и они активны всю битву (максимум 20VP за фиксированную карту).' },
    { fullText: 'Вторичные миссии, берущиеся из перемешанной колоды: возьмите две в начале вашей фазы командования (08); раз за битву можно потратить 1CP, чтобы сбросить одну и взять новую.' },
    { fullText: 'Маркеры, которые некоторые основные миссии позволяют размещать на поле боя. Снять их можно, только если карта основной миссии указывает, как и когда.' },
    { fullText: 'Стандарт покраски. Каждый игрок получает 10VP, если его армия покрашена по стандарту Battle Ready.' },
    { fullText: 'Одна из двух боевых ролей. Выбранная расстановка обозначает края поля боя Атакующего; роли определяются перебросом при определении Атакующего и Защищающегося.' },
    { fullText: 'Одна из двух боевых ролей. Защищающийся развёртывается первым, и расстановка обозначает край поля боя Защищающегося.' },
    { fullText: 'Одна из трёх рекомендованных расстановок тиррейна (A, B и C) для конкретного матчапа основных миссий, задающая участки укрытий, элементы и позиции целей.' },
  ],

  pairings: {
    intro:
      'Существует бесчисленное множество способов проводить Warhammer Event. Следующие ' +
      'рекомендации применяются на большинстве официальных мероприятий Games Workshop и ' +
      'призваны создать максимально честный и приятный опыт для каждого участника, ' +
      'независимо от его положения.',
    blocks: [
      {
        title: 'Составление пар',
        body:
          'Хотя первый раунд большинства турниров составляется случайно, последующие раунды ' +
          'можно составлять по-разному. Мы рекомендуем составлять пары игроков по следующим ' +
          'критериям:\n' +
          '▪ Во-первых — по результату (число побед, поражений и ничьих).\n' +
          '▪ Во-вторых — по пути побед (win path: тайминг раундов, в которых игрок выиграл ' +
          'или проиграл).\n' +
          '▪ В-третьих — случайно среди игроков с одинаковым рангом.',
        note:
          '«Путь побед» (win path) игрока — это не число его побед и поражений, а их тайминг. ' +
          'Составление пар по пути побед склонно объединять игроков со схожим недавним ' +
          'опытом, повышая удовольствие обоих.',
      },
      {
        title: 'Ранжирование игроков',
        body:
          'Чтобы разрешить ничьи между игроками, завершившими мероприятие с одинаковым ' +
          'результатом, мы рекомендуем ранжировать игроков по следующим критериям:\n' +
          '▪ Во-первых — по общему результату (победы, поражения и ничьи).\n' +
          '▪ Во-вторых — по результатам побед их соперников (сила соперников).\n' +
          '▪ В-третьих — по сумме очков победы (VP).',
        note:
          'Мы не рекомендуем использовать VP как метрику составления пар или ранжирования, ' +
          'пока не исчерпаны другие метрики: набранные в партии VP редко ясно говорят о том, ' +
          'насколько близкой она была. Результат побед соперников — идеальный тай-брейк.',
      },
      {
        title: 'Rules Appendix, эррата и FAQ',
        body:
          'Есть множество способов получать удовольствие от хобби Warhammer, и все они ' +
          'проявляются на турнире — от талантливых художников и соревнующихся за титул Best ' +
          'General до казуальных игроков, заводящих новых друзей. Такие хоббисты порой ' +
          'находят необычные взаимодействия правил на грани Warhammer 40,000, которые могут ' +
          'поставить организаторов перед задачей дать ясный ответ.\n\nДля разрешения подобных ' +
          'неопределённостей приложение Warhammer 40,000 содержит подробный Rules Appendix, а ' +
          'также эррату и записи FAQ по конкретным фракциям. Если во время вашего мероприятия ' +
          'возникает странное взаимодействие правил, а основные правила (Core Rules) не дают ' +
          'ясного ответа, мы рекомендуем обращаться к этим ресурсам.',
        seeAlso: ['Базовые способности 24.00', 'Эррата и FAQ EC:faq'],
      },
      {
        title: 'Послесловие — В чём смысл Warhammer Event?',
        body:
          'Warhammer популярен как никогда, и эта популярность распространилась на турнирную ' +
          'сцену. Когда столько хоббистов участвует в игре внутри растущих сообществ, важно ' +
          'поразмышлять о смысле турнира. Прежде всего, он не о чествовании абсолютного ' +
          'победителя; тому, кто проходит без поражений и берёт титул Best General, нужно ' +
          'очень мало признания помимо самого результата (в конце концов, он победил!). ' +
          'Напротив, важнее всего — опыт каждого отдельного участника и осознание того, что ' +
          'для большинства приходящих на турнир сообщество и дружба являются и целью, и ' +
          'результатом.\n\nПрежде чем бросить первый кубик против соперника и начать свой ' +
          'турнирный опыт, помните две вещи:\n' +
          '1. Человек по ту сторону стола разделяет вашу любовь к Warhammer.\n' +
          '2. К тому моменту, когда уляжется пыль, почти каждый потерпит хотя бы одно ' +
          'поражение (как правило, лишь один-два человека уйдут без поражений).\n' +
          'Хотя любая партия даёт победителей и проигравших на столе, магия Warhammer в ' +
          'турнирном формате — в возможности, которую он даёт каждому участнику, стать ' +
          'большей частью сообщества и завести дружбу на всю жизнь. Сосредоточьтесь на этой ' +
          'неоспоримой истине — и хотя большинство из вас проиграет партию-другую, вы все ' +
          'разделите победу в своём опыте того, что значит побывать на Warhammer Event.\n\n' +
          '— Студия дизайна Warhammer и команда Warhammer Events',
      },
    ],
  },

  faq: {
    intro:
      'При игре в миссию Warhammer Event применяются следующие поправки к картам колоды ' +
      'Chapter Approved Mission Deck. Вопросы периодически пересматриваются, и ответы ' +
      'приведены ниже.',
    errata: 'Эррата колоды Chapter Approved Mission Deck: **отсутствует.**',
    items: [
      {
        q: 'Некоторые карты [PRIMARY MISSION] позволяют игроку размещать [OPERATION MARKER] на поле боя. Можно ли их убирать?',
        a: 'Ваша карта основной миссии укажет, как и когда вы можете убирать маркеры операций с поля боя. Если она этого не указывает, убирать маркеры операций нельзя.',
      },
      {
        q: 'Для основной миссии Death Trap одна цель гласит: «Один или несколько вражеских юнитов, начавших ход на участке укрытий, были уничтожены, если этот участок заминирован». Должен ли участок быть заминирован именно в момент уничтожения вражеского юнита?',
        a: 'Нет.',
      },
      {
        q: 'Для основной миссии Surveil the Foe могу ли я выполнить цель, если убираю маркер операции после слежения за вражеским юнитом, находящимся в пределах дальности цели с этим маркером, при условии что это происходит в тот же ход?',
        a: 'Да.',
      },
      {
        q: 'Для основной миссии Vital Link, если центральных целей более одной, могу ли я получить накопительные VP за свои маркеры операций независимо от того, в пределах какой центральной цели(ей) они находятся?',
        a: 'Да, пока вы контролируете цель(и), в пределах которой находятся эти маркеры операций.',
      },
    ],
  },
}

export const eventCompanion = { en, ru }

// Overlay RU onto EN: arrays merge by index, objects by key, scalars take RU when
// defined (else inherit EN). RU carries only translated fields; ids/images/nums/
// card names (dispositions, matchups) are inherited from EN.
function mergeLocale(enNode, ruNode) {
  if (ruNode === undefined || ruNode === null) return enNode
  if (Array.isArray(enNode)) {
    return enNode.map((item, i) => mergeLocale(item, ruNode[i]))
  }
  if (enNode && typeof enNode === 'object') {
    const out = {}
    for (const key of Object.keys(enNode)) out[key] = mergeLocale(enNode[key], ruNode[key])
    return out
  }
  return ruNode
}

export function getEventContent(locale) {
  return locale === 'ru' ? mergeLocale(en, ru) : en
}
