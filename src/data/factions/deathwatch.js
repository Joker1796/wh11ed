// Deathwatch — faction rules (Space Marines Chapter). Same pattern as the other Chapter
// files: only the Chapter-specific detachment lives here — Deathwatch armies can ALSO
// field the Codex: Space Marines detachments (they live in space-marines.js and are not
// duplicated).
//
//   The Faction Pack v1.0 (sources/Faction pack 11 ed/cm/Deathwatch.pdf) is an index pack:
//     it prints the Kill Teams army rule and the full Black Spear Task Force. The Black
//     Spear Task Force text below was imported from the codex (identical
//     to the pack, including its updated Armour of Contempt) — marked
//     source: 'faction-pack'; the pack's Restrictions section is folded into the rule body.
//   MFM (src/data/mfm/deathwatch.js) → per-enhancement points, dp / forceDisposition.
//
// 1 Chapter-specific detachment. Oath of Moment for a Deathwatch army is the base version
// (re-roll Hit only). EN-first: `ru` reuses the same object for now. Datasheets later.
const en = {
  slug: "deathwatch",
  name: "Deathwatch",

  // Two army rules combined into one RuleBlock body with `### ` subheadings (FactionView
  // renders a single armyRule): the base Oath of Moment plus the pack's Kill Teams rule.
  armyRule: {
    id: 'oath-of-moment-kill-teams',
    name: 'Oath of Moment & Kill Teams',
    flavor:
      'From their hidden bases in orbiting watch fortresses, the Deathwatch dispatch carefully selected operatives to hunt down and exterminate alien presences wherever they may be found. Each of these post-human warriors is a veteran of countless battles, tithed by their original Chapter to undertake the Long Vigil and guard against alien incursion.',
    body: `### Oath of Moment
If your Army Faction is Adeptus Astartes, at the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Oath of Moment target. Each time a model with this ability makes an attack that targets your Oath of Moment target, you can re-roll the Hit roll.

### Kill Teams
Each time an attack targets a Kill Team unit from your army that contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what result is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest Toughness characteristic.

For the purposes of determining which models can embark within a Transport model, Kill Team models follow the normal restrictions listed on the Transport model.`,
  },

  detachments: [
    {
      id: "black-spear-task-force",
      name: "Black Spear Task Force",
      source: 'faction-pack', // index pack — printed in the pack
      dp: 3,
      forceDisposition: "Priority Assets",
      rule: {
        name: "Mission Tactics",
        flavor: "Thousands of years of collated strategic data and hard-won combat experience have provided the Deathwatch with the ultimate battlefield tactics to combat almost any foe.",
        body: "At the start of your Command phase, you can select one of the Mission Tactics listed below. Until the start of your next Command phase, that Mission Tactic is active and its effects apply to all units from your army with this ability. Each Mission Tactic can only be selected once per battle.\nFUROR TACTICS\n\nWhen the enemy horde grows close, the Deathwatch will be tasked with the decimation of their core. Aiming not for clinical kills but for maximum destruction over a wide area, they tear the heart from the enemy army.\n\nWhile this Mission Tactic is active, weapons equipped by ADEPTUS ASTARTES units from your army have the [SUSTAINED HITS 1] ability.\n\nMALLEUS TACTICS\n\nWhen the giants of war lumber forth, the Deathwatch will adopt Malleus tactics. Even the largest behemoth has a weak point, and the archives of the Deathwatch number them all.\n\nWhile this Mission Tactic is active, weapons equipped by ADEPTUS ASTARTES units from your army have the [LETHAL HITS] ability.\n\nPURGATUS TACTICS\n\nBy adopting Purgatus tactics, the Deathwatch focus their deadly ire upon the commanders of the enemy host, assassinating them one after another with pitiless head shots and killing thrusts of the blade.\n\nWhile this Mission Tactic is active, each time an ADEPTUS ASTARTES unit from your army makes an attack, if a Critical Hit is scored, that attack has the [PRECISION] ability.\n\n**Restrictions:**\n▪ Your army can include Adeptus Astartes Deathwatch units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.\n▪ With the exception of Kill Team Cassius (see Legends: Agents of the Imperium), your army cannot include any Agents of the Imperium Deathwatch units.\n▪ Your army cannot include any of the following units: Assault Squad; Assault Squad with Jump Packs; Attack Bike Squad; Devastator Squad; Land Speeder Storm; Relic Terminator Squad; Scout Bike Squad; Scout Squad; Scout Sniper Squad; Tactical Squad; Terminator Assault Squad; Terminator Squad.",
      },
      stratagems: [
        {
          name: "Armour of Contempt",
          sublabel: "Black Spear Task Force – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The belligerency and transhuman physiologies of the Adeptus Astartes make them unyielding foes.",
          when: "Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
          restrictions: "",
        },
        {
          name: "Adaptive Tactics",
          sublabel: "Black Spear Task Force – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Only a truly versatile approach to warfare allows the tactical genius of the Deathwatch to best the myriad xenos foes they face.",
          when: "Your Command phase.",
          target: "Up to two Kill Team units from your army, or one other ADEPTUS ASTARTES unit from your army.",
          effect: "For each unit targeted, select Furor Tactics, Malleus Tactics or Purgatus Tactics. Until the start of your next Command phase, that Mission Tactic is active for that unit instead of any Mission Tactic that is active for your army.",
          restrictions: "",
        },
        {
          name: "Site-To-Site Teleportation",
          sublabel: "Black Spear Task Force – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Site-to-site battlefield teleportation is a rare capability indeed, used only by the Deathwatch in extreme situations.",
          when: "End of your opponent’s Fight phase.",
          target: "Up to two Kill Team units from your army, or one other Adeptus Astartes Infantry unit from your army, if those units are not within Engagement Range of one or more enemy units.",
          effect: "Remove those units from the battlefield and place them into Strategic Reserves. Until the end of your next Movement phase, models in those units that do not have the Deep Strike ability have the Deep Strike ability.",
          restrictions: "",
        },
        {
          name: "Hellfire Rounds",
          sublabel: "Black Spear Task Force – Wargear Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Hellfire rounds douse their targets in voracious acids that are utterly lethal to organic life.",
          when: "Your Shooting phase.",
          target: "One Kill Team unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons (excluding Devastating Wounds weapons) equipped by models in your unit have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 5+] abilities.",
          restrictions: "You cannot select any units that have already been targeted with either the Kraken Rounds or Dragonfire Rounds Stratagems this phase.",
        },
        {
          name: "Kraken Rounds",
          sublabel: "Black Spear Task Force – Wargear Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Kraken rounds utilise adamantine cores and improved propellants to penetrate the thickest hide.",
          when: "Your Shooting phase.",
          target: "One Kill Team unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, improve the Armour Penetration characteristic of ranged weapons equipped by models in your unit by 1 and improve the Range characteristic of those weapons by 6\".",
          restrictions: "You cannot select any units that have already been targeted with either the Dragonfire Rounds or Hellfire Rounds Stratagems this phase.",
        },
        {
          name: "Dragonfire Rounds",
          sublabel: "Black Spear Task Force – Wargear Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Dragonfire rounds are designed to explode just before contact, saturating foes in cover with searing gas and flames.",
          when: "Your Shooting phase.",
          target: "One Kill Team unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT] and [IGNORES COVER] abilities.",
          restrictions: "You cannot select any units that have already been targeted with either the Kraken Rounds or Hellfire Rounds Stratagems this phase.",
        },
      ],
      enhancements: [
        {
          name: "Thief of Secrets",
          points: 25,
          flavor: "The Thief of Secrets is a blade whose machine spirit has an unquenchable thirst for knowledge. It has tasted the vitae of countless alien races, absorbing those liquids through auto-sanctified sanguinator-channels and codifying them through the honeycombed array of logicum cells within. The biological secrets of many xenos races have thus been laid bare, allowing the blade’s user to modulate its power field, the better to slice through chitinous armour, rupture xenoform organs and burn out alien nervous systems.",
          body: "ADEPTUS ASTARTES model only. Improve the Strength, Damage and Armour Penetration characteristics of the bearer’s melee weapons by 1. At the end of the Fight phase, if one or more enemy models were destroyed as a result of a melee attack made by the bearer this phase, until the end of the battle, improve the Strength, Damage and Armour Penetration characteristics of the bearer’s melee weapons by 2 instead.",
        },
        {
          name: "Osseus Key",
          points: 15,
          flavor: "The ancient clavis known as the Osseus Key is said to be the most powerful of its kind. Where other such devices are made from sanctified platinum, the Osseus Key is made from the hand and finger bones of deceased Imperial Fists heroes that fought in the Horus Heresy, scrimshawed with inhuman care and imbued with the fiercest machine spirits of the age. No portal can bar its bearer from entry, and no xenos machine can stand before his wrath.",
          body: "Watch Master or Techmarine model only. At the start of your opponent’s Shooting phase, select one enemy VEHICLE unit (excluding TITANIC units) within 12\" of and visible to the bearer. That unit must take a Leadership test. If that test is passed, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; if that test is failed, that unit is not eligible to shoot this phase.",
        },
        {
          name: "Beacon Angelis",
          points: 25,
          flavor: "The Beacon Angelis was devised to guide the Deathwatch to the threshold of the alien adversary. Housed within a reliquary, it calls out to the warriors’ augur arrays with the voices of a hundred electric cherubim, its summons so strong that it draws the righteous unto its locale regardless of what darkness may surround it.",
          body: "ADEPTUS ASTARTES model only. Models in the bearer’s unit have the Deep Strike ability. In addition, you can target the bearer’s unit with the Rapid Ingress Stratagem for 0CP.",
        },
        {
          name: "The Tome of Ectoclades",
          points: 30,
          flavor: "This grimoire, bound in the skin of the alien, holds the most powerful truths the Deathwatch have uncovered about their foes, whether xenos or those who harbour them. On occasion, such knowledge has been known to save not only the book’s custodian, but entire worlds.",
          body: "Watch Master or Captain model only. Once per battle, after you have selected your Oath of Moment target, the bearer can use this Enhancement. If it does, select a second enemy unit to be an Oath of Moment target.\n\n**Designer’s Note:** This means that each time a model with the Oath of Moment ability makes an attack that targets either of your Oath of Moment targets, you can re-roll the Hit roll.",
        },
      ],
    },

  ],

  datasheets: [],
}

export const deathwatch = { en, ru: en }

