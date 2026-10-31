// Dominatus — the Narrative Campaign Deck (Armageddon) and its Event Companion.
//
// Source: the physical deck (89 cards + the 12-page booklet), photographed by the owner and
// transcribed card by card on 2026-10-28 (hub: sources/dominatus/, DOMINATUS-RULES.md). GW
// publishes the deck's contents nowhere — appdata carries only the Dominatus Event Companion
// (`event` below, checked against the PDF by `npm run companions`). The card lore, the Briefing
// introductions and the nine Outcome cards live in dominatusLore.js / dominatusLoreRu.js and are
// hung on the cards here (`lore`, a Briefing's `intro` and `outcomes`).
//
// EN here, RU as an overlay in dominatusRu.js merged by `getDominatus(locale)`. Card names,
// Alliance names, Force Dispositions and ALL-CAPS keywords stay English in both locales (the
// mission-card convention, missions.js); RU adds `nameRu` as a subline.
//
// Shapes
//   rules / event   = { intro, blocks: [{ id, title, body, table?, box?, boxes?, boxesNote? }] }  — EventProseBlocks
//                     (box: framed as the booklet frames it; boxes: [{ id, title, icon, body }] framed after it;
//                      iconList: [{ icon, title, count }] — a list with a mark beside each line;
//                      step: the booklet's numbered step, drawn on its plate before the title)
//   alliances       = [{ id, name, desc }]
//   locations       = [{ slug, name, phase, roll, grid, bonus: { name, body }, warZone: [{ name, body }] }]
//   briefings       = [{ alliance, phase, rows: [{ mine: [dispoId], branches: [{ vs: [dispoId], agenda }] }] }]
//   agendas         = [{ slug, name, alliance, phase, action?, achieved, primary }]
//       achieved    = { any: [text], more?: { any: [text] } } — each list is "one or more of"
//       primary     = { briefing?, blocks } — exactly a missions.js primary's card (MissionCard)
//   upgrades        = [{ slug, name, kind: 'honour'|'skill'|'relic', phase?, alliance?, who, body, bonus? }]
//   Body strings use the RuleBlock markup (▪ lists, **bold**, [core:Name], [WEAPON ABILITY]).
//
// The Briefing matrix is read by `agendaFor` (src/core/dominatus/briefing.js); dominatus.test.js
// holds every row to all five opponent dispositions and every cell to a real Agenda.

import { dominatusRu } from './dominatusRu.js'
import { dominatusLore } from './dominatusLore.js'
import { dominatusLoreRu } from './dominatusLoreRu.js'

export const PHASES = [1, 2, 3]
export const ALLIANCE_IDS = ['liberators', 'oppressors', 'raiders']

const TH = 'take-and-hold'
const PF = 'purge-the-foe'
const DI = 'disruption'
const RE = 'reconnaissance'
const PA = 'priority-assets'

const R2 = 'Second Battle Round Onwards'
const R2_WHEN = 'End of your Command phase (or the end of your turn in the fifth battle round)'
const ANY = 'Any Battle Round'
const END = 'End of Battle'
const YOUR_TURN = 'End of your turn'
const A_TURN = 'End of a turn'
const ROUND_END = 'End of the battle round'
const VP35 = 'You gained 35+ VP from this Primary Mission during the battle.'

// An Objective Action box as missions.js writes one (MissionBriefing's `action` part).
function action(name, { starts = 'Your Shooting phase.', units, limit, completes, effect }) {
  return {
    action: `${name} — Objective Action`,
    rows: [
      { label: 'Starts', text: starts },
      { label: 'Units', text: units },
      { label: 'Use limit', text: limit },
      { label: 'Completes', text: completes },
      { label: 'Effect', text: effect },
    ],
  }
}

const en = {
  heading: 'Dominatus',
  rules: {
    intro: 'A narrative campaign for Warhammer 40,000 played with the Dominatus deck: three Alliances fight over Armageddon across three campaign phases, attempting Agendas in place of Primary Missions and earning Upgrades for their characters. It is played alongside any Chapter Approved mission deck.',
    blocks: [
      {
        id: 'dom-campaigns',
        title: 'Armageddon Campaigns',
        body: 'An Armageddon campaign is split into 3 **campaign phases**, each of which consists of a number of battles. During each phase, the players will vie for control of a strategic **location**, before moving onto the next phase.\n'
          + 'Taking control of the final location is key to achieving victory, but it is only part of the challenge. Each player also has a set of **Agendas** they must achieve during the campaign. Only commanders who can achieve military success while accomplishing these vital goals will achieve everlasting glory on Armageddon.\n'
          + 'Designed to be used with any Chapter Approved mission deck, you can play this campaign with as many players as you wish to organise. While you can stretch a single deck across multiple players, we recommend that each player has a deck for themselves for convenience.',
      },
      {
        id: 'dom-warmaster',
        title: 'Warmaster',
        box: true,
        body: 'Dominatus is best run with a **Warmaster**. They will take on the organisation of the campaign so that the other players can focus on playing games. A Warmaster can play in the campaign, but their primary role is to facilitate a smooth and enjoyable experience for all players involved. If such a heroic individual has not already volunteered themselves, the players can instead agree to take up the tasks of a Warmaster between themselves.',
      },
      {
        id: 'dom-deck',
        title: 'The Deck',
        body: 'The deck contains 89 cards:',
        // As the booklet lists them: each deck's mark, its name and how many cards it holds.
        iconList: [
          { icon: 'dom-agenda', title: 'Agenda deck', count: '27 cards' },
          { icon: 'dom-achieved', title: 'Agenda Achieved deck', count: '9 cards' },
          { icon: 'dom-briefing', title: 'Briefing deck', count: '9 cards' },
          { icon: 'dom-location', title: 'Location deck', count: '9 cards' },
          { icon: 'dom-skill', title: 'Upgrade deck', count: '35 cards — further categorised as **Battle Honour** cards (×11), **Battle Skill** cards (×9) and **Relic** cards (×15).' },
        ],
      },
      {
        id: 'dom-deck-cards',
        title: '',
        body: '**Briefing cards** frame the narrative for each Alliance across the three campaign phases, listing the Agendas players can attempt depending on their Force Disposition and that of their opponent. On the reverse of each is a range of **Outcomes**, depending on how many **Narrative Points** you have gained.\n'
          + '**Location cards** represent strategically important zones on the planet Armageddon. Each one features a **location bonus**; if an Alliance takes control of a location, all players in that Alliance gain its location bonus for the remainder of the campaign. On the reverse of each are **war zone rules** that apply to every battle fought during the same campaign phase.\n'
          + '**Agenda cards** represent goals that you can attempt to achieve during each battle in a campaign phase. Each Alliance has a unique set of 9 Agendas: 3 for each campaign phase. One side lists the conditions that, if met, result in that player gaining Agenda Achieved cards; on the reverse is a Primary Mission, which tells you how to gain VP in the battle.',
      },
      {
        id: 'dom-agenda-achieved',
        title: 'Agenda Achieved Cards',
        body: 'When a player gains an **Agenda Achieved** card, they take one corresponding to their Alliance. These do not have any effect until the end of a campaign phase. A player cannot have more than 3 Agenda Achieved cards at any one time.\n'
          + 'Each card reads: "At the end of each campaign phase, the Alliance with the most **Agenda Achieved** cards is in **ascendancy**. At the end of campaign phases 1 and 2, shuffle your Alliance\'s **Relics** deck, then turn over a number of cards equal to the number of **Agenda Achieved** cards you have. Select one of the revealed **Relic** cards to keep, and return the others to the deck."',
      },
      {
        id: 'dom-upgrades',
        title: 'Upgrade Cards',
        body: 'Upgrade cards are acquired as the campaign unfolds. They represent special abilities that can improve the martial power of your warriors, and come in 3 types:\n'
          + '▪ **Battle Skill** cards: earned at the end of a battle.\n'
          + '▪ **Battle Honour** cards: earned at the end of a battle by the victor. There are 5 of these cards that can be earned during the first campaign phase, 5 during the second, and 1 during the third.\n'
          + '▪ **Relic** cards: the most powerful type of upgrade and the hardest to earn, unlocked by gaining Agenda Achieved cards. There are 5 unique Relic cards for each Alliance.\n'
          + 'Some Upgrade cards list a **bonus effect** that applies when the upgrade is given to a particular type of model; such effects are always in addition to the normal effects listed on the card.\n'
          + 'A player keeps all the Upgrade cards they gain, but they cannot have a duplicate of an Upgrade card.',
      },
      {
        id: 'dom-preparing',
        title: 'Preparing the Campaign',
        body: 'Before the campaign begins, the Warmaster should share a **Battle Schedule** with all players, informing them of the number of games each will play, and the army sizes they will need to muster. The default Battle Schedule below is designed to be played comfortably over the course of a weekend for players who can all muster a Strike Force sized army.',
        table: {
          plate: true,
          title: 'Default Battle Schedule',
          headers: ['Campaign phase', 'Battles per player', 'Battle size'],
          rows: [
            ['1 (First Encounters Phase)', '2', 'Strike Force'],
            ['2 (Pitched Battles Phase)', '2', 'Strike Force'],
            ['3 (Final Mission Phase)', '1', 'Strike Force'],
          ],
        },
      },
      {
        id: 'dom-alliances',
        title: 'Alliances',
        body: 'The Warmaster will need to group all of the players into **Alliances**. A campaign must have an Oppressors Alliance and a Liberators Alliance. It can optionally have a Raiders Alliance as well. Alliances should be organised as evenly as possible, and based on the different factions players are using if possible. Players should play the same faction throughout the campaign.\n'
          + 'These are guidelines, not requirements; if it suits the group better to organise Alliances differently, the Warmaster should do so.',
        // As the booklet sets them: a frame each, the name on its plate, the emblem to the right.
        boxes: [
          { id: 'liberators', title: 'Liberators', icon: 'dom-liberators', body: 'Those who seek to free Armageddon, destroy the occupying forces and reestablish Imperial rule over the planet. The forces of the Imperium would be best suited to this Alliance.' },
          { id: 'oppressors', title: 'Oppressors', icon: 'dom-oppressors', body: 'Those who wish to destroy Armageddon, slaughter its populace and watch the planet burn. The forces of the Orks are best suited to this Alliance.' },
          { id: 'raiders', title: 'Raiders', icon: 'dom-raiders', body: 'The Raiders on Armageddon range from xenos warlords to Chaos renegades, all seeking to further their own agendas. This Alliance is best suited to those who carve their own path.' },
        ],
        boxesNote: 'Once players have been grouped into Alliances, it is time for the struggle for Armageddon to begin!',
      },
      {
        id: 'dom-start-phase',
        title: 'Start Campaign Phase',
        step: 1,
        body: 'Players start the first campaign phase using the sequence below. After completing phases 1 and 2, start the next campaign phase and repeat this sequence. At the end of phase 3, the campaign ends.\n'
          + 'At the start of each campaign phase, before any battles are fought, the Warmaster must:\n'
          + '▪ Roll one D6 to randomly select one of that phase\'s **Location** cards.\n'
          + '▪ Players read their Alliance\'s **Briefing** card for this phase.\n'
          + '▪ Players gather their Alliance\'s **Agenda** cards for this phase.',
      },
      {
        id: 'dom-play-battles',
        title: 'Play Battles',
        step: 2,
        body: 'Players from opposing Alliances now battle each other. The Warmaster can leave players to arrange games themselves, or organise days and times to help everyone play an equal number of games. In campaigns with a large number of players, each Alliance can be broken down into smaller subgroups that are then matched against each other.\n'
          + 'To play a battle, the players generate a mission from any Chapter Approved mission deck (the Warmaster may curate this). The mission sequence is supplemented with the following rules.\n'
          + '### Determine Mission step\n'
          + '▪ Read aloud all **war zone rules** for that phase from your Location card — these apply to the upcoming battle.\n'
          + '▪ If both players wish to attempt Agendas in the battle, do not use the Primary Missions in your mission deck. Instead, after revealing Force Disposition cards, the players use their Alliance\'s current **Briefing** card and use the chart on it to compare their selected Force Disposition with that of their opponent. This combination will result in a specific **Agenda** card, which will state the Primary Mission to use in this battle.',
      },
      // The booklet frames this one between the steps; the steps then carry on in a block with
      // no title of its own.
      {
        id: 'dom-declining',
        title: 'Declining Agendas',
        box: true,
        body: 'If one or both players decline to attempt Agendas in a battle, determine Primary Missions as described in your mission deck, but only the player(s) that declined to attempt Agendas can score VP from that Primary Mission. A player that opted to attempt an Agenda cannot score VP from that Primary Mission and instead they use the Primary Mission on their Agenda card.',
      },
      {
        id: 'dom-play-battles-steps',
        title: '',
        body: '### Declare Battle Formations step\n'
          + '▪ Each player can select up to 3 **Upgrade** cards they have earned during the campaign, and give each of those Upgrade cards to a different friendly unit until the end of the battle (a unit cannot have more than one Upgrade card).\n'
          + '### Determine Victor step\n'
          + '▪ Each player that opted to attempt an Agenda in the battle checks the conditions listed on their Agenda card. If these are met, that player takes the number of **Agenda Achieved** cards listed.\n'
          + '▪ During campaign phases 1 and 2: the victor randomly draws 1 **Battle Honour** card from that phase\'s deck, and their opponent randomly draws 1 **Battle Skill** card. If the battle is a draw, both players randomly draw 1 Battle Skill card.\n'
          + '▪ If a player gained 1 or more Agenda Achieved cards from the battle, they randomly draw 1 additional card of the same type at the same time. Each player then selects 1 of the drawn cards to keep, and returns the others to their respective decks.\n'
          + '▪ During campaign phase 3: the victor gains the phase 3 Battle Honour card, **Path to Conquest**, and players prepare for a final climactic battle!',
      },
      {
        id: 'dom-end-phase',
        title: 'End of Campaign Phase',
        step: 3,
        body: 'At the end of each phase, each Alliance adds up the total number of Battle Honour cards gained from that phase and the number of Agenda Achieved cards its players have. Then, before starting a new phase or ending the campaign, resolve the following:\n'
          + '1. **Take Control** — the Alliance with the most Battle Honour cards gained during this campaign phase takes control of the current location. If a location bonus defines additional effects when an Alliance takes control, resolve these now. In the event of a tie, tied Alliances use the total number of Battle Honours gained over the course of the entire campaign as a tie-breaker; if there is still a tie, the Warmaster decides how best to resolve it.\n'
          + '2. **Determine Ascendancy** — the Alliance with the most Agenda Achieved cards is in **ascendancy**. This helps to determine the narrative Outcome of that phase. In the event of a tie, all tied Alliances are in ascendancy.\n'
          + '3. **Acquire Relics** — at the end of campaign phases 1 and 2, each player takes their Alliance\'s Relic cards deck and randomly draws a number of cards equal to the number of Agenda Achieved cards that player has. That player selects 1 of those Relic cards to keep and returns the others to the deck.\n'
          + '4. **Update Narrative Outcome** — the players read their Alliance\'s Outcome for that phase (on the reverse of their Briefing card). The Outcome depends on the number of **Narrative Points** your Alliance has earned this phase, as described on that card.\n'
          + '5. **Discard** — players discard all Agenda Achieved cards they have from previous phases.',
      },
      {
        id: 'dom-end-campaign',
        title: 'End Campaign',
        step: 4,
        body: 'Once the Outcomes of campaign phase 3 have been read, the campaign ends.',
      },
      {
        id: 'dom-narrative-points',
        title: 'Narrative Points',
        body: 'The reverse of each Briefing card says how an Alliance earns Narrative Points that phase:\n'
          + '▪ Phases 1 and 2: gain 1 Narrative Point if your Alliance has control of this phase\'s Location, and gain 1 Narrative Point if your Alliance is in ascendancy (Outcomes for 2, 1 and 0).\n'
          + '▪ Phase 3: gain 2 Narrative Points if your Alliance has control of this phase\'s Location, and gain 1 Narrative Point if your Alliance is in ascendancy (Outcomes for 3, 2, 1 and 0).',
      },
      {
        id: 'dom-modifying',
        title: 'Modifying Dominatus',
        box: true,
        body: 'The Warmaster can modify any of these rules to better suit the needs of their gaming group. While Dominatus is designed to be played over the course of a weekend, a Warmaster could use the deck to run a longer campaign by increasing the number of battles in a phase, remembering that phase 3 should consist of a single climactic final mission. It is also perfectly acceptable to vary the size-limit of players\' armies as the campaign evolves, perhaps starting with smaller battle sizes in earlier phases and growing in subsequent ones.\n'
          + 'Warmasters are free to change or introduce new rules to better fit their own narrative, perhaps allowing players to swap factions mid-campaign, or even change Alliance as new pacts are forged and traitors discovered — remembering that their role is to ensure everyone taking part has an enjoyable experience.',
      },
    ],
  },

  alliances: [
    { id: 'liberators', name: 'Liberators' },
    { id: 'oppressors', name: 'Oppressors' },
    { id: 'raiders', name: 'Raiders' },
  ],

  locations: [
    {
      slug: 'the-mannheim-gap', name: 'The Mannheim Gap', phase: 1, roll: '1–2', grid: '2093-AR:Volcanus',
      bonus: { name: 'Battle-Tested', body: 'While an Alliance has control of this location, when a player in that Alliance draws **Battle Skill** cards, they can draw one additional card before choosing which to keep.' },
      warZone: [
        { name: 'Canyon Walls', body: 'The battlefield edges that are not the Attacker\'s or Defender\'s battlefield edge are **canyon walls**. When a unit makes an **ingress move**, models in it cannot be set up within 6" of a canyon wall unless that model has FLY or [core:Deep Strike].' },
        { name: 'Rock Falls', body: 'When a unit ends a move (excluding **pile-in** and **consolidation moves**) within 6" of a canyon wall, make a **hazard roll** for that unit.' },
      ],
    },
    {
      slug: 'volcanus-archipelago', name: 'Volcanus Archipelago', phase: 1, roll: '3–4', grid: '5602-AR:Volcanus',
      bonus: { name: 'Munitions Vaults', body: 'While an Alliance has control of this location, when a player in that Alliance draws **Relic** cards, they can draw one additional card before choosing which to keep.' },
      warZone: [
        { name: 'Landing Craft', body: 'In a player\'s Movement phase, that player can select one friendly unit in **strategic reserves**. That unit can make an **ingress move** this phase as if the battle round number was one higher than it actually is (note that this means it could arrive in the first battle round).' },
        { name: 'Rapid Reinforcements', body: '(Once per battle) Each player can use the **Rapid Ingress** stratagem for 0CP.' },
      ],
    },
    {
      slug: 'the-morpheon-line', name: 'The Morpheon Line', phase: 1, roll: '5–6', grid: '6741-AR:Volcanus',
      bonus: { name: 'To the Victor', body: 'While an Alliance has control of this location, when a player in that Alliance draws **Battle Honour** cards, they can draw one additional card before choosing which to keep.' },
      warZone: [
        { name: 'Defence Networks', body: 'While a unit has the **benefit of cover**, models in that unit have an **InSv** of 5+ against ranged attacks.' },
        { name: 'Foxholes', body: 'When an INFANTRY unit **remains stationary**, **hidden** models in that unit have a **detection range** of 12" until the end of the turn.' },
      ],
    },
    {
      slug: 'cerbera-base', name: 'Cerbera Base', phase: 2, roll: '1–2', grid: '3501-AR:Infernus',
      bonus: { name: 'Staging Post', body: 'While an Alliance has control of this location, the location for the next phase of the campaign is not randomly determined by the Warmaster. Instead, in the next Start Campaign Phase step, the players in that Alliance can choose what the next location will be (either by taking a vote or nominating one amongst them to choose).' },
      warZone: [
        { name: 'Shrouding Smoke', body: '▪ All units have the SMOKE keyword.\n▪ Models that are not within 24" of each other are not **visible** to each other.' },
        { name: 'Ash Clouds', body: '▪ When an AIRCRAFT unit ends an **ingress move**, make a **hazard roll** for that unit.\n▪ When a FLYING unit ends a move in which it **took to the skies**, make a **hazard roll** for that unit.' },
      ],
    },
    {
      slug: 'victorinius-spaceport', name: 'Victorinius Spaceport', phase: 2, roll: '3–4', grid: '7830-AR:Phoenix Island',
      bonus: { name: 'Fresh Supplies', body: 'When an Alliance first takes control of this location, each player in that Alliance draws 1 random **Battle Skill** or 1 random Phase 1 **Battle Honour** card to keep.' },
      warZone: [
        { name: 'Surgical Insertion', body: 'In a player\'s Movement phase, that player can select one friendly **strategic reserves** unit to make a **Surgical Deep Strike**. If they do, while making an **ingress move** with that unit this phase, apply the following:\n▪ **If that unit has Deep Strike:** each model in that unit can be set up anywhere on the battlefield that is more than 6" horizontally from all enemy units.\n▪ **If that unit does not have Deep Strike:** that unit has [core:Deep Strike].\nAfter ending that move, that player must make a **battle-shock roll** for that unit, then make a number of **hazard rolls** for it equal to half the number of models in that unit (rounding up).' },
      ],
    },
    {
      slug: 'blackfire-death-pits', name: 'Blackfire Death Pits', phase: 2, roll: '5–6', grid: '7830-AR:Volcanus',
      bonus: { name: 'Test of Mettle', body: 'When an Alliance first takes control of this location, each player in that Alliance can discard one **Battle Honour** and/or one **Battle Skill** card. For each card discarded, they can then choose one card of the same type to replace it with (e.g. a Phase 1 Battle Honour could be replaced with a different Phase 1 Battle Honour card).' },
      warZone: [
        { name: 'Treacherous Terrain', body: '▪ When a unit is selected to **remain stationary** or make an **advance move**, make a **hazard roll** for that unit.\n▪ When a unit **declares a charge**, if one or more of the **charge targets** are within a **terrain area**, -1 from the **charge roll**.' },
        { name: 'Veteran Fighters', body: 'BATTLELINE units can **start an action** in a turn in which they made an **advance** or **fall-back move**.' },
      ],
    },
    {
      slug: 'eyes-of-the-emperor-observatory', name: 'Eyes of the Emperor Observatory', phase: 3, roll: '1–2', grid: '5067-AR:Volcanus',
      bonus: { name: 'Auspicious Augury', body: 'When an Alliance first takes control of this location, each player in that Alliance with fewer than 3 **Agenda Achieved** cards can shuffle their mission deck\'s Secondary Missions deck, then draw the top 4 cards: for each **Fixed Mission** card revealed, that player gains one Agenda Achieved card.' },
      warZone: [
        { name: 'Second Wave', body: '(Once per battle) At the start of a player\'s Command phase, that player can select one of the following options (excluding EPIC HERO/WARLORD units):\n▪ One friendly MONSTER/VEHICLE unit that is **destroyed**.\n▪ Three friendly BATTLELINE units that are **destroyed**.\n▪ Any two other friendly units that are **destroyed**.\nThat player then adds the same number of identical new units to their army, in **strategic reserves**.' },
        { name: 'Orbital Lance Bombardment', body: 'At the end of the battle round, players randomly select one **objective** on the battlefield. For every unit within range of that objective, roll one D6: on a 4+, that unit suffers D3 **mortal wounds**.' },
      ],
    },
    {
      slug: 'titangrave', name: 'Titangrave', phase: 3, roll: '3–4', grid: '9622-AR:Acheron',
      bonus: { name: 'The Spoils of War', body: 'When an Alliance first takes control of this location, each player in that Alliance that has 4 or more **Battle Honour** cards (in total, from any phase) gains 1 **Agenda Achieved** card.' },
      warZone: [
        { name: 'Vermillion Sanction', body: 'Players can select one additional unit to have an **Upgrade** (for a total of up to four instead of up to three).' },
        { name: 'Shielded Mek Shops', body: 'When a unit is set up as a result of a **move type**, make one **hazard roll** for each of its models set up within range of an **objective**. If one or more of those rolls fails, make a **battle-shock roll** for that unit.' },
        { name: 'Titan Clash', body: '▪ When making attacks with a MONSTER/VEHICLE model that targeted a MONSTER/VEHICLE unit, +1 to **hit rolls**.\n▪ When making attacks with a TITANIC model that targeted a TITANIC unit, +1 to **wound rolls**.' },
      ],
    },
    {
      slug: 'hive-acheron-subsprawl', name: 'Hive Acheron Subsprawl', phase: 3, roll: '5–6', grid: '1034-AR:Acheron',
      bonus: { name: 'A Hard-Fought Victory', body: 'When an Alliance first takes control of this location, each player in that Alliance that has 3 or more **Battle Skill** cards gains 1 **Agenda Achieved** card.' },
      warZone: [
        { name: 'Tunnel Fighters', body: 'In the Declare Battle Formations step, each player can select up to three friendly INFANTRY units in **strategic reserves**; those units gain the following until the end of the battle:\n▪ [core:Deep Strike].\n▪ When that unit **declares a charge** in a turn in which it made an **ingress move**, you can re-roll the **charge roll**.' },
        { name: 'One Shall Stand, One Shall Fall', body: '(Once per battle round) Each player can use the **Epic Challenge** stratagem for 0CP.' },
        { name: 'Lead from the Front', body: 'Each player\'s WARLORD has the following ability:\n**Front-line Hero (Aura):** while a friendly unit is within 6" of this model, you can re-roll **battle-shock rolls** for that unit.' },
      ],
    },
  ],

  briefings: [
    { alliance: 'liberators', phase: 1, rows: [
      { mine: [TH, PA], branches: [{ vs: [TH, RE], agenda: 'planetfall' }, { vs: [DI, PF, PA], agenda: 'vital-strongpoint' }] },
      { mine: [PF], branches: [{ vs: [PF, DI, RE], agenda: 'secure-perimeter' }, { vs: [TH, PA], agenda: 'planetfall' }] },
      { mine: [DI, RE], branches: [{ vs: [TH, DI], agenda: 'vital-strongpoint' }, { vs: [RE, PF, PA], agenda: 'secure-perimeter' }] },
    ] },
    { alliance: 'liberators', phase: 2, rows: [
      { mine: [RE, PF], branches: [{ vs: [DI, PF], agenda: 'rescue-survivors' }, { vs: [TH, PA, RE], agenda: 'encirclement' }] },
      { mine: [DI], branches: [{ vs: [PF, TH], agenda: 'encirclement' }, { vs: [PA, RE, DI], agenda: 'hidden-prize' }] },
      { mine: [PA, TH], branches: [{ vs: [DI, PA], agenda: 'hidden-prize' }, { vs: [RE, PF, TH], agenda: 'rescue-survivors' }] },
    ] },
    { alliance: 'liberators', phase: 3, rows: [
      { mine: [DI, PA], branches: [{ vs: [PF, RE], agenda: 'cast-down-their-idols' }, { vs: [DI, TH, PA], agenda: 'reclaim-this-world' }] },
      { mine: [PF], branches: [{ vs: [PF, TH, PA], agenda: 'slay-the-tyrant' }, { vs: [DI, RE], agenda: 'cast-down-their-idols' }] },
      { mine: [RE, TH], branches: [{ vs: [DI, TH, RE], agenda: 'reclaim-this-world' }, { vs: [PF, PA], agenda: 'slay-the-tyrant' }] },
    ] },
    { alliance: 'oppressors', phase: 1, rows: [
      { mine: [TH, DI], branches: [{ vs: [PA, PF, TH], agenda: 'dig-in' }, { vs: [DI, RE], agenda: 'loot-and-scoot' }] },
      { mine: [RE], branches: [{ vs: [TH, DI, PA], agenda: 'loot-and-scoot' }, { vs: [PF, RE], agenda: 'repel-the-foe' }] },
      { mine: [PF, PA], branches: [{ vs: [PF, RE, TH], agenda: 'repel-the-foe' }, { vs: [PA, DI], agenda: 'dig-in' }] },
    ] },
    { alliance: 'oppressors', phase: 2, rows: [
      { mine: [PA, PF], branches: [{ vs: [DI, PA, PF], agenda: 'breakthrough' }, { vs: [RE, TH], agenda: 'convoy-ambush' }] },
      { mine: [TH], branches: [{ vs: [DI, TH, PF], agenda: 'breakthrough' }, { vs: [PA, RE], agenda: 'sabotage-supplies' }] },
      { mine: [RE, DI], branches: [{ vs: [PF, PA], agenda: 'convoy-ambush' }, { vs: [TH, DI, RE], agenda: 'sabotage-supplies' }] },
    ] },
    { alliance: 'oppressors', phase: 3, rows: [
      { mine: [RE, PA], branches: [{ vs: [RE, TH, PF], agenda: 'lead-by-example' }, { vs: [DI, PA], agenda: 'ash-and-rubble' }] },
      { mine: [DI], branches: [{ vs: [TH, RE, PA], agenda: 'ash-and-rubble' }, { vs: [PF, DI], agenda: 'a-proper-challenge' }] },
      { mine: [PF, TH], branches: [{ vs: [PF, DI, PA], agenda: 'a-proper-challenge' }, { vs: [RE, TH], agenda: 'lead-by-example' }] },
    ] },
    { alliance: 'raiders', phase: 1, rows: [
      { mine: [TH, DI], branches: [{ vs: [PA, RE], agenda: 'clandestine-infiltration' }, { vs: [PF, DI, TH], agenda: 'vanguard-recon' }] },
      { mine: [RE], branches: [{ vs: [RE, PA, TH], agenda: 'establish-contact' }, { vs: [DI, PF], agenda: 'clandestine-infiltration' }] },
      { mine: [PF, PA], branches: [{ vs: [TH, PA, PF], agenda: 'vanguard-recon' }, { vs: [DI, RE], agenda: 'establish-contact' }] },
    ] },
    { alliance: 'raiders', phase: 2, rows: [
      { mine: [PA, RE], branches: [{ vs: [PF, PA], agenda: 'a-knife-in-the-dark' }, { vs: [DI, RE, TH], agenda: 'a-thief-in-the-night' }] },
      { mine: [PF], branches: [{ vs: [PA, PF, TH], agenda: 'a-knife-in-the-dark' }, { vs: [DI, RE], agenda: 'seeds-of-destruction' }] },
      { mine: [TH, DI], branches: [{ vs: [DI, TH], agenda: 'a-thief-in-the-night' }, { vs: [RE, PF, PA], agenda: 'seeds-of-destruction' }] },
    ] },
    { alliance: 'raiders', phase: 3, rows: [
      { mine: [PA, PF], branches: [{ vs: [RE, TH, DI], agenda: 'erase-all-trace' }, { vs: [PA, PF], agenda: 'capture-trophies' }] },
      { mine: [RE], branches: [{ vs: [DI, RE], agenda: 'erase-all-trace' }, { vs: [PF, TH, PA], agenda: 'extraction' }] },
      { mine: [DI, TH], branches: [{ vs: [TH, PF, DI], agenda: 'extraction' }, { vs: [RE, PA], agenda: 'capture-trophies' }] },
    ] },
  ],

  agendas: [
    // ── Liberators ──
    {
      slug: 'planetfall', name: 'Planetfall', alliance: 'liberators', phase: 1,
      achieved: { any: [VP35, 'You control half or more than half of the objectives on the battlefield.'] },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'One or more friendly units made an ingress move this turn and were set up within range of an objective (excluding your home objective).', vp: 3 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'You control your home objective.', vp: 3 },
          { text: 'You control one or more objectives within your territory (excluding your home objective).', vp: 5 },
          { text: 'You control one or more other objectives.', vp: 7 },
        ] },
      ] },
    },
    {
      slug: 'vital-strongpoint', name: 'Vital Strongpoint', alliance: 'liberators', phase: 1,
      achieved: { any: [VP35, 'You control your opponent\'s home objective.', 'Your opponent controls no objectives wholly within their territory.'] },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'You control one or more objectives that your opponent controlled at the start of your turn.', vp: 5 },
          { text: 'You control your opponent\'s home objective.', vp: 10 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'For each objective you control within your opponent\'s territory.', vp: 5 },
        ] },
      ] },
    },
    {
      slug: 'secure-perimeter', name: 'Secure Perimeter', alliance: 'liberators', phase: 1,
      achieved: { any: [VP35, 'There are no enemy units within your territory.'] },
      primary: { blocks: [
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'You control two or more objectives (excluding your home objective).', vp: 5 },
        ] },
        { heading: R2, when: YOUR_TURN, rows: [
          { text: 'Your opponent controls no objectives within your territory.', vp: 5 },
          { text: 'There are no enemy units (excluding AIRCRAFT and battle-shocked units) within your deployment zone.', vp: 3 },
        ] },
      ] },
    },
    {
      slug: 'rescue-survivors', name: 'Rescue Survivors', alliance: 'liberators', phase: 2,
      achieved: { any: [VP35, 'Three or more terrain areas that are not within your deployment zone each have one or more friendly units (excluding AIRCRAFT and battle-shocked units) within them and no enemy units are within those terrain areas.'] },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'For each terrain area that meets all of the following conditions: it is not within your deployment zone; it has one or more friendly units within it (excluding AIRCRAFT and battle-shocked units); it has no enemy units within it.', vp: 1 },
          { text: 'One or more enemy units that started this turn within a terrain area were destroyed this turn.', vp: 3 },
          { text: 'Your opponent controls no objectives within your territory.', vp: 3 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 4 },
        ] },
      ] },
    },
    {
      slug: 'encirclement', name: 'Encirclement', alliance: 'liberators', phase: 2,
      achieved: { any: [VP35, 'You have a presence on three or more battlefield edges.'] },
      primary: {
        briefing: [{ label: 'Establish Encirclement', text: 'While one or more units from your army (excluding AIRCRAFT and battle-shocked units) are wholly within 6" of a battlefield edge and more than 9" from any corner of the battlefield, you have a presence on that battlefield edge.' }],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'You have a presence on three or more battlefield edges.', vp: 5 },
            { text: 'Your opponent controls no objectives within your territory.', vp: 5 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives.', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'hidden-prize', name: 'Hidden Prize', alliance: 'liberators', phase: 2, action: true,
      achieved: { any: [VP35, 'You discovered the cache and you control the objective it is in.'] },
      primary: {
        briefing: [action('Search', {
          units: 'One unit within a terrain area that is not within your deployment zone and has not been searched (see below).',
          limit: 'Twice per turn. Each unit that starts this action this phase must be within a different terrain area.',
          completes: 'End of your turn.',
          effect: 'That terrain area is searched. If you have not discovered the cache (see below), roll one D6, adding 1 to the result for every other terrain area you have searched. On a 5+, you have discovered the cache; that terrain area becomes an objective if it was not already one, and you place one of your operation markers on it. Once you have discovered the cache, this action cannot be started again.',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'For each terrain area you searched this turn.', vp: 5 },
            { text: 'You discovered the cache this turn.', vp: 10 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
            { text: 'You control the objective with your operation marker on it.', vp: 10 },
          ] },
        ],
      },
    },
    {
      slug: 'cast-down-their-idols', name: 'Cast Down Their Idols', alliance: 'liberators', phase: 3,
      achieved: {
        any: [VP35, 'Your opponent controls no objectives within their territory.'],
        more: { any: ['Your opponent\'s army included one or more TITANIC units and one or more of them are destroyed.', 'Three or more of your idol targets are destroyed.'] },
      },
      primary: {
        briefing: [{ label: 'Idol Target', text: 'In your Command phase, select one enemy model on the battlefield that has the highest (or equal highest) W. That model is your idol target.' }],
        blocks: [
          { heading: ANY, when: A_TURN, rows: [
            { text: 'One or more enemy units that started the turn within range of an objective were destroyed this turn.', vp: 5 },
            { text: 'Your idol target was destroyed this turn.', vp: 5 },
            { text: 'Your idol target was TITANIC and it was destroyed this turn.', vp: '+5', modifier: 'cumulative' },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'Your opponent controls no objectives wholly within your territory.', vp: 5 },
            { text: 'You control more objectives than your opponent.', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'reclaim-this-world', name: 'Reclaim This World', alliance: 'liberators', phase: 3, action: true,
      achieved: {
        any: [VP35, 'You raised a banner on three or more objectives.'],
        more: { any: ['You raised a banner on every objective.'] },
      },
      primary: {
        briefing: [
          action('Raise Banner', {
            units: 'One unit within range of an objective.',
            limit: 'Unlimited. Each unit that starts this action this phase must be within range of a different objective.',
            completes: 'End of your turn.',
            effect: 'Select one objective your unit controls that does not have one of your operation markers on it. You raise a banner on that objective; place one of your operation markers on it.',
          }),
          { label: '*', text: 'If you have raised a banner on that objective, you score double this VP amount instead.' },
        ],
        blocks: [
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control your home objective.*', vp: 1 },
            { text: 'You control your opponent\'s home objective.*', vp: 6 },
            { text: 'For each other objective you control.*', vp: 4 },
          ] },
        ],
      },
    },
    {
      slug: 'slay-the-tyrant', name: 'Slay the Tyrant', alliance: 'liberators', phase: 3,
      achieved: {
        any: [VP35, 'The enemy WARLORD is destroyed.'],
        more: { any: ['All enemy CHARACTER models are either destroyed or in strategic reserves.'] },
      },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'One or more enemy units were destroyed this turn.', vp: 5 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
        ] },
        { heading: R2, when: ROUND_END, rows: [
          { text: 'More enemy units than friendly units were destroyed this battle round.', vp: 5 },
        ] },
        { heading: END, rows: [
          { text: 'The enemy WARLORD is destroyed.', vp: 5 },
        ] },
      ] },
    },
    // ── Oppressors ──
    {
      slug: 'repel-the-foe', name: 'Repel the Foe', alliance: 'oppressors', phase: 1,
      achieved: { any: [VP35, 'You control two or more objectives within your opponent\'s territory.'] },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'You control one or more objectives that your opponent controlled at the start of your turn.', vp: 5 },
          { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are wholly within your opponent\'s deployment zone.', vp: 5 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'For each objective you control.', vp: 2 },
          { text: 'For each objective you control within your opponent\'s territory.', vp: '+3', modifier: 'cumulative' },
        ] },
      ] },
    },
    {
      slug: 'dig-in', name: 'Dig In', alliance: 'oppressors', phase: 1,
      achieved: { any: [VP35, 'You control every objective within your territory.'] },
      primary: { blocks: [
        { heading: ANY, when: YOUR_TURN, rows: [
          { text: 'One or more enemy units were destroyed this turn.', vp: 3 },
        ] },
        { heading: R2, when: R2_WHEN, rows: [
          { text: 'You control one or more objectives within your opponent\'s territory.', vp: 5 },
          { text: 'For each objective you control within your territory.', vp: 3 },
        ] },
        { heading: END, rows: [
          { text: 'You control your home objective.', vp: 10 },
        ] },
      ] },
    },
    {
      slug: 'loot-and-scoot', name: 'Loot and Scoot', alliance: 'oppressors', phase: 1, action: true,
      achieved: { any: [VP35, 'Three or more objectives (excluding your home objective) have been looted by your army.'] },
      primary: {
        briefing: [action('Loot', {
          units: 'One unit within range of an objective you control that does not have one of your operation markers on it.',
          limit: 'Up to twice per turn. Each unit that starts this action this phase must be within range of a different objective.',
          completes: 'Immediately.',
          effect: 'That objective is looted. Place one of your operation markers on that objective and place one of your operation markers on the unit that completed this action (if that unit is destroyed, remove all operation markers from it).',
        })],
        blocks: [
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
          ] },
          { heading: END, rows: [
            { text: 'For each objective looted by your army.', vp: 7 },
            { text: 'For each of your operation markers on a friendly unit.', vp: 3 },
          ] },
        ],
      },
    },
    {
      slug: 'breakthrough', name: 'Breakthrough', alliance: 'oppressors', phase: 2, action: true,
      achieved: { any: [VP35, 'Two or more friendly units punched through.'] },
      primary: {
        briefing: [action('Punch Through', {
          units: 'One unit that did not make an ingress move this turn and is wholly within 6" of your opponent\'s battlefield edge.',
          limit: 'Once per turn.',
          completes: 'End of your turn.',
          effect: 'Your unit has punched through and is removed from the battlefield (each unit embarked within a TRANSPORT that punched through has also punched through).',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more friendly units (excluding AIRCRAFT and battle-shocked units) are within 6" of your opponent\'s battlefield edge.', vp: 5 },
            { text: 'One or more units punched through this turn.', vp: 10 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
            { text: 'You control one or more objectives within your opponent\'s territory.', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'convoy-ambush', name: 'Convoy Ambush', alliance: 'oppressors', phase: 2,
      achieved: { any: [VP35, 'Your opponent\'s army included one or more TRANSPORTS and all of those units are destroyed.', 'Three or more of your prime targets are destroyed.'] },
      primary: {
        briefing: [{ label: 'Prime Target', text: 'In your Command phase, select one enemy unit that is on the battlefield; this must be a MONSTER/VEHICLE unit if possible. Until the start of your next Command phase, that unit is your prime target.' }],
        blocks: [
          { heading: ANY, when: A_TURN, rows: [
            { text: 'Your prime target was destroyed this turn.', vp: 8 },
            { text: 'Your prime target was a TRANSPORT and it was destroyed this turn.', vp: '+2', modifier: 'cumulative' },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
            { text: 'You control more objectives than your opponent.', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'sabotage-supplies', name: 'Sabotage Supplies', alliance: 'oppressors', phase: 2, action: true,
      achieved: { any: [VP35, 'Your opponent\'s home objective was sabotaged.'] },
      primary: {
        briefing: [action('Sabotage', {
          units: 'One unit within range of an objective (excluding your home objective and an objective that has one of your operation markers on it).',
          limit: 'Once per turn.',
          completes: 'End of your turn.',
          effect: 'If your unit is within range of an objective you control, that objective is sabotaged; place one of your operation markers on it.',
        })],
        blocks: [
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'For each objective you control.', vp: 4 },
          ] },
          { heading: END, rows: [
            { text: 'For each objective that was sabotaged.', vp: 5 },
            { text: 'For each objective within your opponent\'s territory that was sabotaged.', vp: '+5', modifier: 'cumulative' },
          ] },
        ],
      },
    },
    {
      slug: 'lead-by-example', name: 'Lead by Example', alliance: 'oppressors', phase: 3,
      achieved: {
        any: [VP35, 'Your champion unit controls an objective within your opponent\'s territory and one or more enemy units were destroyed by your champion unit.'],
        more: { any: ['Your WARLORD unit controls an objective within your opponent\'s territory and one or more enemy units were destroyed by your WARLORD unit.'] },
      },
      primary: {
        briefing: [{ label: 'Champions', text: 'In your Command phase, you can select one friendly CHARACTER model (this must be your WARLORD if it is not destroyed). Until the start of your next Command phase, that model\'s unit is your champion unit.' }],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'Your champion unit destroyed one or more enemy units this turn.', vp: 5 },
            { text: 'Your champion unit controls one or more objectives (excluding your home objective).', vp: 4 },
            { text: 'Your champion unit is wholly within your opponent\'s territory.', vp: 6 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'For each objective you control.', vp: 4 },
          ] },
        ],
      },
    },
    {
      slug: 'ash-and-rubble', name: 'Ash and Rubble', alliance: 'oppressors', phase: 3, action: true,
      achieved: {
        any: [VP35, 'Two or more objectives were razed.'],
        more: { any: ['Every objective in your territory was razed.'] },
      },
      primary: {
        briefing: [action('Raze', {
          units: 'One unit within range of an objective (excluding your home objective, unless it is the fifth battle round).',
          limit: 'Once per turn.',
          completes: 'End of your opponent\'s turn, or the end of the battle (whichever comes first).',
          effect: 'Select one objective your unit controls. That objective is razed and is no longer an objective; remove all markers associated with that objective (including operation markers). A razed objective becomes a normal terrain area for the remainder of the battle. Once you have razed three objectives, this action cannot be started again.',
        })],
        blocks: [
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control your home objective.', vp: 3 },
            { text: 'For each other objective you control.', vp: 5 },
          ] },
          { heading: END, rows: [
            { text: 'For each objective that was razed.', vp: 10 },
          ] },
        ],
      },
    },
    {
      slug: 'a-proper-challenge', name: 'A Proper Challenge', alliance: 'oppressors', phase: 3,
      achieved: {
        any: [VP35, 'At the end of any battle round, your kill tally was 2+ and at least double that of your opponent.'],
        more: { any: ['At the end of any battle round, your kill tally was 3+ and at least triple that of your opponent.'] },
      },
      primary: {
        briefing: [{ label: 'Kill Tally', text: 'Keep a kill tally for each player, adding 1 to a player\'s tally when an enemy unit is destroyed. MONSTER/VEHICLE/CHARACTER units count as 2 units for this tally, unless they are TITANIC units, in which case they count as 3. Reset each player\'s kill tally at the start of the battle round.' }],
        blocks: [
          { heading: ANY, when: ROUND_END, rows: [
            { text: 'Your kill tally is 1+.', vp: 5 },
            { text: 'Your kill tally is greater than your opponent\'s.', vp: 5 },
            { text: 'Your kill tally is 2+ and more than double your opponent\'s.', vp: '+5', modifier: 'cumulative' },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
          ] },
        ],
      },
    },
    // ── Raiders ──
    {
      slug: 'vanguard-recon', name: 'Vanguard Recon', alliance: 'raiders', phase: 1, action: true,
      achieved: { any: [VP35, 'Three or more enemy units and three or more objectives were scanned during the battle.'] },
      primary: {
        briefing: [action('Scan Target', {
          units: 'One unit.',
          limit: 'Twice per turn.',
          completes: 'End of your turn.',
          effect: 'Select either one enemy unit that meets both of the following conditions, or one objective that meets both of the following conditions: it is within 12" of and visible to the unit that completed this action; it does not have one of your operation markers on it. That enemy unit or objective is scanned; place one of your operation markers on it.',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more enemy units were scanned this turn.', vp: 5 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives.', vp: 5 },
          ] },
          { heading: END, rows: [
            { text: 'For each objective (excluding your home objective) that has been scanned.', vp: 4 },
          ] },
        ],
      },
    },
    {
      slug: 'establish-contact', name: 'Establish Contact', alliance: 'raiders', phase: 1, action: true,
      achieved: { any: [VP35, 'You recovered the agent.'] },
      primary: {
        briefing: [action('Contact Agent', {
          starts: 'Your Shooting phase. When a unit starts this action, you must declare whether it will silence or recover the agent.',
          units: 'One unit within range of a central objective.',
          limit: 'Once per turn.',
          completes: 'End of your turn (if you are silencing the agent) or the end of your opponent\'s turn (if you are recovering the agent). Once completed, this action cannot be started again.',
          effect: 'If your unit is within range of a central objective you control, the agent is silenced or recovered as appropriate.',
        })],
        blocks: [
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'For each objective you control.', vp: 4 },
          ] },
          { heading: END, rows: [
            { text: 'You silenced the agent.', vp: 8 },
            { text: 'You recovered the agent.', vp: 15 },
          ] },
        ],
      },
    },
    {
      slug: 'clandestine-infiltration', name: 'Clandestine Infiltration', alliance: 'raiders', phase: 1, action: true,
      achieved: { any: [VP35, 'One or more BATTLELINE units exfiltrated.', 'Two or more non-BATTLELINE units exfiltrated.'] },
      primary: {
        briefing: [action('Exfiltrate', {
          units: 'One non-TRANSPORT unit that did not make an ingress move this turn and is wholly within 6" of your opponent\'s battlefield edge.',
          limit: 'Once per turn.',
          completes: 'End of your turn.',
          effect: 'Your unit exfiltrates and is removed from the battlefield.',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more enemy units that started the turn within your opponent\'s territory were destroyed this turn.', vp: 5 },
            { text: 'You control one or more objectives within your opponent\'s territory.', vp: 5 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control more objectives than your opponent.', vp: 5 },
          ] },
          { heading: END, rows: [
            { text: 'One or more friendly units exfiltrated.', vp: 10 },
          ] },
        ],
      },
    },
    {
      slug: 'a-knife-in-the-dark', name: 'A Knife in the Dark', alliance: 'raiders', phase: 2,
      achieved: { any: [VP35, 'Your elimination target is destroyed.'] },
      primary: {
        briefing: [{ label: 'Elimination Target', text: 'In the Resolve Pre-battle Abilities step, select and declare one enemy CHARACTER model in your opponent\'s army. That model is your elimination target.' }],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more enemy units were destroyed this turn.', vp: 3 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'For each objective you control.', vp: 4 },
          ] },
          { heading: END, rows: [
            { text: 'Your elimination target is destroyed.', vp: 10 },
            { text: 'Your elimination target was your opponent\'s WARLORD and it is destroyed.', vp: '+5', modifier: 'cumulative' },
          ] },
        ],
      },
    },
    {
      slug: 'a-thief-in-the-night', name: 'A Thief in the Night', alliance: 'raiders', phase: 2,
      achieved: { any: [VP35, 'Your WARLORD\'s unit controls the artefact objective.', 'Your WARLORD\'s unit controlled the artefact objective at the end of three consecutive turns.'] },
      primary: {
        briefing: [{ label: 'Artefact', text: 'In the Resolve Pre-battle Abilities step, your opponent selects one objective not within their deployment zone. That is the artefact objective; place one of your operation markers on it.' }],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'You control the artefact objective.', vp: 8 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
            { text: 'You control more objectives than your opponent.', vp: 5 },
          ] },
          { heading: END, rows: [
            { text: 'You control the artefact objective.', vp: 5 },
            { text: 'Your WARLORD controls the artefact objective.', vp: '+5', modifier: 'cumulative' },
          ] },
        ],
      },
    },
    {
      slug: 'seeds-of-destruction', name: 'Seeds of Destruction', alliance: 'raiders', phase: 2, action: true,
      achieved: { any: [VP35, 'Your WARLORD completed a ritual during the battle.'] },
      primary: {
        briefing: [action('Sow the Seeds', {
          units: 'One unit wholly within 6" of the centre of the battlefield.',
          limit: 'Once per turn.',
          completes: 'End of your opponent\'s turn, or the end of the battle (whichever comes first).',
          effect: 'If your unit is wholly within 6" of the centre of the battlefield, it completes a ritual.',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more enemy units were destroyed this turn.', vp: 5 },
          ] },
          { heading: ANY, when: A_TURN, rows: [
            { text: 'A friendly unit completed a ritual this turn.', vp: 10 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
            { text: 'Your opponent controls no central objectives.', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'erase-all-trace', name: 'Erase All Trace', alliance: 'raiders', phase: 3,
      achieved: {
        any: [VP35, 'You have a presence on three or more table quarters.'],
        more: { any: ['There are no enemy units on the battlefield.', 'All enemy units on the battlefield (excluding AIRCRAFT and battle-shocked units) are within the same table quarter.'] },
      },
      primary: {
        briefing: [{ label: 'Battle Presence', text: 'While one or more units from your army (excluding AIRCRAFT and battle-shocked units) are wholly within a table quarter and more than 6" from the centre of the battlefield, you have a presence in that table quarter.' }],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'One or more enemy units were destroyed this turn.', vp: 4 },
            { text: 'You have a presence in three or more table quarters.', vp: 3 },
            { text: 'You have a presence in 4 table quarters.', vp: '+2', modifier: 'cumulative' },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'extraction', name: 'Extraction', alliance: 'raiders', phase: 3, action: true,
      achieved: {
        any: [VP35, 'Two or more friendly units extracted spoils.'],
        more: { any: ['Three or more friendly units extracted spoils.'] },
      },
      primary: {
        briefing: [action('Extraction', {
          units: 'One non-TRANSPORT unit.',
          limit: 'Once per turn (each unit cannot extract spoils more than once per battle).',
          completes: 'End of your turn.',
          effect: 'If your unit is within 3" of the centre of the battlefield, that unit can extract spoils.',
        })],
        blocks: [
          { heading: ANY, when: YOUR_TURN, rows: [
            { text: 'No enemy units (excluding AIRCRAFT and battle-shocked units) are within 6" of the centre of the battlefield.', vp: 3 },
            { text: 'A friendly unit extracted spoils this turn.', vp: 3 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'You control one or more objectives (excluding your home objective).', vp: 5 },
          ] },
        ],
      },
    },
    {
      slug: 'capture-trophies', name: 'Capture Trophies', alliance: 'raiders', phase: 3,
      achieved: {
        any: [VP35, 'You recovered three or more of your operation markers.'],
        more: { any: ['The enemy WARLORD was destroyed and you recovered the resulting operation marker.'] },
      },
      primary: {
        briefing: [{ label: 'Trophies', text: 'When an enemy CHARACTER model is destroyed, before removing it from the battlefield, place one of your operation markers touching its base. When a friendly unit ends a move, each of your operation markers within 1" of that unit is recovered.' }],
        blocks: [
          { heading: ANY, when: ROUND_END, rows: [
            { text: 'One or more enemy units were destroyed this battle round.', vp: 3 },
          ] },
          { heading: R2, when: R2_WHEN, rows: [
            { text: 'For each objective you control.', vp: 4 },
          ] },
          { heading: END, rows: [
            { text: 'For each of your operation markers that was recovered.', vp: 6 },
          ] },
        ],
      },
    },
  ],

  upgrades: [
    // ── Battle Honours ──
    { slug: 'kingslayer', name: 'Kingslayer', kind: 'honour', phase: 1, who: 'One CHARACTER model.',
      body: 'This model\'s melee weapons have [PRECISION]. While making attacks with this model that targeted a CHARACTER unit, you can re-roll **hit rolls**.' },
    { slug: 'fire-and-fury', name: 'Fire and Fury', kind: 'honour', phase: 1, who: 'One CHARACTER model.',
      body: 'This unit\'s ranged weapons have [ASSAULT] and [HEAVY].',
      bonus: { label: 'MONSTER/VEHICLE', body: 'If this upgrade is given to a MONSTER/VEHICLE model, while making attacks with this model\'s [BLAST] weapons, you can re-roll **hit rolls** of 1.' } },
    { slug: 'shadow-stalker', name: 'Shadow Stalker', kind: 'honour', phase: 1, who: 'One CHARACTER model.',
      body: 'This unit has [core:Stealth].' },
    { slug: 'undying-duty', name: 'Undying Duty', kind: 'honour', phase: 1, who: 'One CHARACTER model.',
      body: 'In the Fight phase, when an enemy unit that targeted this unit has resolved its attacks, for each model in this unit that was **destroyed** as a result of those attacks, roll one D6: for each 5+, the attacking unit suffers 1 **mortal wound**.',
      bonus: { label: 'MONSTER', body: 'If this upgrade is given to a MONSTER model, the attacking unit suffers D3 **mortal wounds** for each 5+ instead.' } },
    { slug: 'grim-veterans', name: 'Grim Veterans', kind: 'honour', phase: 1, who: 'One CHARACTER model.',
      body: 'While this unit is not **battle-shocked**, it has +1 OC.',
      bonus: { label: 'INFANTRY', body: 'If this upgrade is given to an INFANTRY model, you can re-roll **leadership rolls** made for its unit.' } },
    { slug: 'wraith-of-ruin', name: 'Wraith of Ruin', kind: 'honour', phase: 2, who: 'One CHARACTER model.',
      body: 'This unit is not **visible** to enemy models unless they are within 18" of it.' },
    { slug: 'swift-as-the-wind', name: 'Swift as the Wind', kind: 'honour', phase: 2, who: 'One CHARACTER model.',
      body: 'This unit has +2" M.',
      bonus: { label: 'MONSTER/VEHICLE', body: 'If this upgrade is given to a MONSTER/VEHICLE model, this unit has +3" M instead.' } },
    { slug: 'battle-hungry', name: 'Battle Hungry', kind: 'honour', phase: 2, who: 'One CHARACTER model.',
      body: 'You can re-roll **charge rolls** made for this unit.',
      bonus: { label: 'MOUNTED', body: 'If this upgrade is given to a MOUNTED model, you can re-roll **advance rolls** made for its unit.' } },
    { slug: 'ferocious-combatant', name: 'Ferocious Combatant', kind: 'honour', phase: 2, who: 'One CHARACTER model.',
      body: 'This unit\'s melee weapons have [SUSTAINED HITS 1].',
      bonus: { label: 'MONSTER/VEHICLE', body: 'If this upgrade is given to a MONSTER/VEHICLE model, this model\'s melee weapons have [CLEAVE 1].' } },
    { slug: 'breach-and-burn', name: 'Breach and Burn', kind: 'honour', phase: 2, who: 'One CHARACTER model.',
      body: 'In your Shooting phase, while making attacks with this unit, this unit\'s weapons that targeted an enemy unit within 18" have [IGNORES COVER].' },
    { slug: 'path-to-conquest', name: 'Path to Conquest', kind: 'honour', phase: 3, who: '',
      body: '**End of campaign phase:** at the end of campaign phase 3, the Alliance with the most Phase 3 Battle Honours takes control of the Phase 3 Location.' },
    // ── Battle Skills ──
    { slug: 'terrifying-presence', name: 'Terrifying Presence', kind: 'skill', who: 'One CHARACTER model.',
      body: 'At the start of the Fight phase, select one enemy unit **engaged** with this unit. Your opponent must make a **battle-shock roll** for that enemy unit.',
      bonus: { label: 'MONSTER/VEHICLE', body: 'If this upgrade is given to a MONSTER/VEHICLE model, when making battle-shock rolls as a result of this upgrade, subtract 1 from the result.' } },
    { slug: 'tactical-redeployment', name: 'Tactical Redeployment', kind: 'skill', who: 'One CHARACTER model.',
      body: 'In the Redeploy Units step, select up to three friendly units and redeploy them or place them in **strategic reserves**. These units do not count towards the strategic reserves limit.' },
    { slug: 'tempered-in-battle', name: 'Tempered in Battle', kind: 'skill', who: 'One CHARACTER model.',
      body: 'This unit can **shoot** and **declare a charge** in a turn in which it made a **fall-back move**.',
      bonus: { label: 'INFANTRY', body: 'If this upgrade is given to an INFANTRY model, this unit can **start an action** in a turn in which it made a fall-back move.' } },
    { slug: 'front-line-champion', name: 'Front-line Champion', kind: 'skill', who: 'One CHARACTER model.',
      body: 'While making attacks with this unit with weapons that targeted a unit within 9", you can re-roll **hit rolls**.' },
    { slug: 'fortunes-favoured', name: 'Fortune\'s Favoured', kind: 'skill', who: 'One CHARACTER model.',
      body: '(Once per battle) When a unit\'s attacks target this unit, this model can use this upgrade. If it does, this unit has an **InSv** of 4+ until those attacks have been resolved.' },
    { slug: 'high-strategy', name: 'High Strategy', kind: 'skill', who: 'One CHARACTER model.',
      body: 'You start the battle with 1CP.',
      bonus: { label: 'WARLORD', body: 'If this upgrade is given to your WARLORD, you start the battle with 2CP instead.' } },
    { slug: 'natural-leader', name: 'Natural Leader', kind: 'skill', who: 'One CHARACTER model.',
      body: 'This model has the following ability:\n**Inspiring Presence (Aura):** while a friendly unit (excluding units **below half-strength**) is within 9" of this model, **battle-shock rolls** for that unit are automatically successful.',
      bonus: { label: 'WARLORD', body: 'If this upgrade is given to your WARLORD, while a friendly unit is within 9" of this model, that unit has +1 Ld.' } },
    { slug: 'lead-from-the-front', name: 'Lead from the Front', kind: 'skill', who: 'One CHARACTER model.',
      body: 'This unit has [core:Scouts 6"].',
      bonus: { label: 'MOUNTED', body: 'If this upgrade is given to a MOUNTED model, this unit has [core:Scouts 9"] instead.' } },
    { slug: 'born-survivor', name: 'Born Survivor', kind: 'skill', who: 'One CHARACTER model.',
      body: 'This model has [core:Feel No Pain 6+].',
      bonus: { label: 'INFANTRY/MOUNTED', body: 'If this upgrade is given to an INFANTRY/MOUNTED model, it has [core:Feel No Pain 5+] instead.' } },
    // ── Relics: Liberators ──
    { slug: 'blade-of-sacrifice', name: 'Blade of Sacrifice', kind: 'relic', alliance: 'liberators', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: 'When this unit is **selected to fight**, this model can **channel its soul**. If it does, select 1, 2 or 3 wounds for this model to lose (it cannot lose more than its remaining number of wounds). Until the end of the phase, for each wound this model just lost from channelling its soul, this model\'s melee weapons have +1 A, S and AP.' },
    { slug: 'strategic-laurels', name: 'Strategic Laurels', kind: 'relic', alliance: 'liberators', who: 'One CHARACTER model.',
      body: 'In your Command phase, if this unit controls an **objective**, make a **leadership roll** for this unit: if that roll succeeds, you gain 1CP.' },
    { slug: 'the-emperors-tarot', name: 'The Emperor\'s Tarot', kind: 'relic', alliance: 'liberators', who: 'One CHARACTER model.',
      body: 'At the start of your first Command phase:\n▪ **If you are using Fixed Missions:** you can discard one of your Fixed Missions and replace it with a different Fixed Mission of your choice.\n▪ **If you are using Tactical Missions:** look at the top 3 cards from your Tactical Missions deck, then place them back on top of that deck face down, in an order of your choice.' },
    { slug: 'vortex-grenade', name: 'Vortex Grenade', kind: 'relic', alliance: 'liberators', who: 'One CHARACTER model.',
      body: '(Once per battle) In your Shooting phase, when this unit is **selected to shoot**, it can use this Relic. If it does, resolve the following sequence:\n1. Select one **unengaged** enemy unit within 8" of this model.\n2. Roll three D6: for each 2+, that enemy unit suffers D3 **mortal wounds**.\n3. Make one **hazard roll** for this unit.' },
    { slug: 'master-crafted-armour', name: 'Master-crafted Armour', kind: 'relic', alliance: 'liberators', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: '▪ This model has an **InSv** of 4+.\n▪ This model has +1 T, Sv and W.' },
    // ── Relics: Oppressors ──
    { slug: 'ruinator', name: 'Ruinator', kind: 'relic', alliance: 'oppressors', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: '(Once per battle) When this unit is **selected to fight**, this model can use this Relic. If it does, select one of this model\'s melee weapons to gain the following until the end of the phase:\n▪ [DEVASTATING WOUNDS] and [HAZARDOUS].\n▪ Add half the current battle round number (rounding up) to its A and S.' },
    { slug: 'temporal-talisman', name: 'Temporal Talisman', kind: 'relic', alliance: 'oppressors', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: 'This unit has [core:Fights First].' },
    { slug: 'personal-teleporter', name: 'Personal Teleporter', kind: 'relic', alliance: 'oppressors', who: 'One CHARACTER model.',
      body: '▪ This unit has [core:Deep Strike].\n▪ (Once per battle) You can target this unit with the **Rapid Ingress** stratagem for 0CP.' },
    { slug: 'enhanced-bionics', name: 'Enhanced Bionics', kind: 'relic', alliance: 'oppressors', who: 'One CHARACTER model.',
      body: '▪ In your Command phase, this model regains up to D3 lost wounds.\n▪ The first time this model is **destroyed**, remove it from the battlefield, then, at the end of the phase, roll one D6, adding 2 to the result if this model is an INFANTRY or MOUNTED model: on a 4+, set this model back up on the battlefield as close as possible to where it was destroyed, **unengaged**, with 3 wounds remaining.' },
    { slug: 'powerfield-projector', name: 'Powerfield Projector', kind: 'relic', alliance: 'oppressors', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: '▪ This unit has an **InSv** of 5+ against ranged attacks.\n▪ While this unit is the target of ranged attacks, for each unmodified **save roll** of 6, the attacking unit suffers 1 **mortal wound** after it has resolved its attacks.' },
    // ── Relics: Raiders ──
    { slug: 'displacer-field', name: 'Displacer Field', kind: 'relic', alliance: 'raiders', who: 'One CHARACTER model.',
      body: '(Once per battle) At the end of your opponent\'s Shooting phase, if this unit is **unengaged** and it was targeted by one or more attacks this phase, you can remove this unit from the battlefield and place it into **strategic reserves**. If you do, when you next make an **ingress move** with this unit, it has [core:Deep Strike] until that move ends.' },
    { slug: 'disruption-orb', name: 'Disruption Orb', kind: 'relic', alliance: 'raiders', who: 'One CHARACTER model.',
      body: 'This model has the following aura ability:\n**Agent of Discord (Aura):** when an opponent\'s stratagem targets an enemy unit within 12" of this model, increase its cost by 1CP for that use.' },
    { slug: 'cloak-of-shadows', name: 'Cloak of Shadows', kind: 'relic', alliance: 'raiders', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: 'This unit has [core:Infiltrators].' },
    { slug: 'maelstrom-clarion', name: 'Maelstrom Clarion', kind: 'relic', alliance: 'raiders', who: 'One CHARACTER model.',
      body: 'Enemy units that are making an **ingress move** cannot be set up within 12" of this model.' },
    { slug: 'fate-forged-weapon', name: 'Fate-forged Weapon', kind: 'relic', alliance: 'raiders', who: 'One CHARACTER model (excluding EPIC HEROES).',
      body: '▪ This model\'s melee weapons have +1 AP and D.\n▪ In the Fight phase, while making attacks with this model, you can re-roll **wound rolls**.' },
  ],

  // The Warhammer Dominatus Event Companion (v1.1, 22/07) — a DELTA on the main Event
  // Companion, like Doubles: only what an organised Dominatus event changes.
  event: {
    intro: 'Guidance from GW\'s Warhammer Dominatus Event Companion for running an organised Dominatus event with the Dominatus deck and the most recent Chapter Approved Mission Deck. It is used alongside the Warhammer Event Companion, whose mission sequence, layouts and pairing advice still apply except where noted here.',
    blocks: [
      {
        id: 'dom-ev-guidance',
        title: 'Event Guidance',
        body: '### Resources\n'
          + '▪ Each player must have a Dominatus deck.\n'
          + '### Warmaster\n'
          + '▪ The Warhammer Event organiser is the Warmaster.\n'
          + '▪ At the start of each campaign phase, the Warmaster can select that phase\'s Location card, instead of rolling.\n'
          + '▪ The Warmaster can require a player to change their Alliance (see Muster Armies).\n'
          + '### Changes to the End of Campaign Phase\n'
          + '▪ The **Acquire Relics** step and the **Discard** step at the end of each campaign phase are resolved at the Determine Mission step of the first battle in the next campaign phase, instead of as described in the Dominatus deck.\n'
          + '▪ The **Fresh Supplies** and **Test of Mettle** location bonuses are resolved at the Determine Mission step of the first battle in the next campaign phase, instead of as described in the Dominatus deck.\n'
          + '▪ The **Auspicious Augury** location bonus is resolved as described in the Dominatus deck, but we recommend that each player does so in the presence of a player from another Alliance.',
      },
      {
        id: 'dom-ev-cp',
        title: 'Generating Command Points',
        body: 'Excluding Core CP, each player can gain a maximum of 1CP per battle round (including the CP gained when a player discards an active Secondary Mission card).',
      },
      {
        id: 'dom-ev-sequence',
        title: 'Event Mission Sequence',
        body: 'The battle follows the Event Companion\'s mission sequence, with these changes:\n'
          + '▪ **1. Muster Armies** — once they have mustered their army, a player selects one Force Disposition card available to them and one **Alliance** as described in the Dominatus deck, and records those on their roster.\n'
          + '▪ **2. Determine Mission** — read aloud the war zone rules from your Location card; Agendas and Declining Agendas as in the Dominatus deck (when declining, Primary Missions are determined by comparing Force Disposition cards). Whether players attempt Agendas or not, the players\' Force Disposition cards are used to determine a layout.\n'
          + '▪ **7. Declare Battle Formations** — players also secretly note down up to 3 Upgrade cards they have earned during the campaign, and which friendly unit each is given to until the end of the battle (a unit cannot have more than one Upgrade card).\n'
          + '▪ **14. Determine Victor** — each player scores 10VP if their army is painted to a Battle Ready standard. Maximum VP: Primary Mission 45VP (up to 15VP per battle round); Secondary Missions 45VP (up to 15VP per battle round, and a maximum of 20VP per Fixed Secondary Mission card); Battle Ready army 10VP. Once a victor is determined, Agenda Achieved cards and Upgrade draws are resolved as in the Dominatus deck.',
      },
      {
        id: 'dom-ev-pairings',
        title: 'Pairings',
        body: 'In a Dominatus event, players are paired with a player from another Alliance; beyond that, pair as the Event Companion recommends — first by record, then by win path, then randomly.',
      },
    ],
  },
}

// Overlay RU over EN: blocks by id, cards by slug, briefing/blocks/rows by position. Names
// stay English (RU gives `nameRu`); anything the overlay lacks falls back to the English.
function overlayBlocks(enBlocks, ruBlocks) {
  if (!ruBlocks) return enBlocks
  return enBlocks.map((b) => {
    const r = ruBlocks[b.id]
    if (!r) return b
    return {
      ...b,
      ...r,
      table: b.table && r.table ? { ...b.table, ...r.table } : b.table,
      boxes: b.boxes && r.boxes ? b.boxes.map((x, i) => ({ ...x, ...r.boxes[i] })) : b.boxes,
      iconList: b.iconList && r.iconList ? b.iconList.map((x, i) => ({ ...x, ...r.iconList[i] })) : b.iconList,
    }
  })
}

function overlayPrimary(primary, r) {
  if (!r) return primary
  return {
    briefing: r.briefing || primary.briefing,
    blocks: primary.blocks.map((b, i) => {
      const rb = r.blocks?.[i]
      if (!rb) return b
      return {
        ...b,
        heading: rb.heading || b.heading,
        when: rb.when || b.when,
        rows: b.rows.map((row, j) => (rb.rows?.[j] ? { ...row, text: rb.rows[j] } : row)),
      }
    }),
  }
}

function overlay(ru) {
  if (!ru) return en
  return {
    ...en,
    heading: ru.heading || en.heading,
    rules: { intro: ru.rules?.intro || en.rules.intro, blocks: overlayBlocks(en.rules.blocks, ru.rules?.blocks) },
    event: { intro: ru.event?.intro || en.event.intro, blocks: overlayBlocks(en.event.blocks, ru.event?.blocks) },
    alliances: en.alliances.map((a) => ({ ...a, ...(ru.alliances?.[a.id] || {}) })),
    locations: en.locations.map((l) => {
      const r = ru.locations?.[l.slug]
      if (!r) return l
      return {
        ...l,
        bonus: { ...l.bonus, nameRu: r.bonus?.nameRu, body: r.bonus?.body || l.bonus.body },
        warZone: l.warZone.map((w, i) => {
          const rw = r.warZone?.[i]
          return rw ? { ...w, nameRu: rw.nameRu, body: rw.body || w.body } : w
        }),
      }
    }),
    agendas: en.agendas.map((a) => {
      const r = ru.agendas?.[a.slug]
      if (!r) return a
      return {
        ...a,
        nameRu: r.nameRu,
        achieved: {
          any: r.achieved?.any || a.achieved.any,
          ...(a.achieved.more ? { more: { any: r.achieved?.more?.any || a.achieved.more.any } } : {}),
        },
        primary: overlayPrimary(a.primary, r.primary),
      }
    }),
    upgrades: en.upgrades.map((u) => {
      const r = ru.upgrades?.[u.slug]
      if (!r) return u
      return {
        ...u,
        nameRu: r.nameRu,
        who: r.who || u.who,
        body: r.body || u.body,
        bonus: u.bonus ? { ...u.bonus, body: r.bonus || u.bonus.body } : undefined,
      }
    }),
  }
}

// The lore of each card, by slug; a Briefing's by `<alliance>-<phase>`.
function withLore(d, lore) {
  return {
    ...d,
    locations: d.locations.map((l) => ({ ...l, lore: lore.locations[l.slug] })),
    agendas: d.agendas.map((a) => ({ ...a, lore: lore.agendas[a.slug] })),
    upgrades: d.upgrades.map((u) => ({ ...u, lore: lore.upgrades[u.slug] })),
    briefings: d.briefings.map((b) => ({ ...b, ...lore.briefings[`${b.alliance}-${b.phase}`] })),
  }
}

const cache = {}
export function getDominatus(locale) {
  if (!cache[locale]) {
    cache[locale] = locale === 'ru' ? withLore(overlay(dominatusRu), dominatusLoreRu) : withLore(en, dominatusLore)
  }
  return cache[locale]
}

export const dominatusEn = en
