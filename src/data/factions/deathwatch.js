// Deathwatch — faction rules. Rewritten end to end for Codex Supplement: Deathwatch (11th edition), which landed in
// app data 963 together with the new Codex: Space Marines and replaced every army rule and
// detachment the faction had. Transcribed by scripts/gen-faction-rules.mjs (re-run it rather
// than hand-porting); sources, highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex Supplement: Deathwatch) → army rules + 2 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/deathwatch.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/deathwatch.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "deathwatch",
  name: "Deathwatch",
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### Veteran Recruits\nYour army cannot include the following ADEPTUS ASTARTES units:\n▪ SCOUT SQUAD units.\n▪ TERMINATOR SQUAD units.\n▪ TERMINATOR ASSAULT SQUAD units."
  },
  detachments: [
    {
      "id": "black-spear-task-force",
      "name": "Black Spear Task Force",
      "source": "codex",
      "dp": 3,
      "forceDispositions": ["Priority Assets", "Purge the Foe"],
      "rule": {
        "name": "Mission Tactics",
        "flavor": "Thousands of years of collated strategic data and hard-won combat experience have provided the Deathwatch with the ultimate battlefield tactics to combat almost any foe.\n\nFUROR TACTICS When the enemy horde grows close, the Deathwatch will be tasked with the decimation of their core. Aiming not for clinical kills but for maximum destruction over a wide area, they tear the heart from the enemy army.\n\nMALLEUS TACTICS When the giants of war lumber forth, the Deathwatch will adopt Malleus tactics. Even the largest behemoth has a weak point, and the archives of the Deathwatch number them all.\n\nPURGATUS TACTICS By adopting Purgatus tactics, the Deathwatch focus their deadly ire upon the commanders of the enemy host, assassinating them one after another with pitiless head shots and killing thrusts of the blade.",
        "body": "Friendly KILL TEAM units with this ability have the following abilities:\n\n**Furor Tactics**: If the **[gloss:sm-combat-doctrine:devastator doctrine]** is active for your unit, your unit’s attacks have [SUSTAINED HITS 1].\n\n**Malleus Tactics**: If the **tactical doctrine** is active for your unit, your unit’s attacks have [LETHAL HITS].\n\n**Purgatus Tactics**: If the **assault doctrine** is active for your unit, your unit’s attacks that target an enemy unit within 9\" of this unit have [PRECISION].\n\nRESTRICTIONS: Your army can include ADEPTUS ASTARTES DEATHWATCH units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter.\n\nWith the exception of KILL TEAM CASSIUS (see Legends: Agents of the Imperium), your army cannot include any AGENTS OF THE IMPERIUM DEATHWATCH units."
      },
      "stratagems": [
        {
          "name": "Armour of Contempt",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post‑human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Adaptive Tactics",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Only a truly versatile approach to warfare allows the tactical genius of the Deathwatch to best the myriad xenos foes they face.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "Hellfire Rounds",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Hellfire rounds douse their targets in voracious acids that are utterly lethal to organic life.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks (excluding [DEVASTATING WOUNDS] attacks) have [ANTI-non-VEHICLE 4+].",
          "restrictions": ""
        },
        {
          "name": "Kraken Rounds",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Kraken rounds utilise adamantine cores and improved propellants to penetrate the thickest hide.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks:\n▪ Have +6” **[gloss:range:R]**.\n▪ Have +1 **[gloss:strength:S]**.",
          "restrictions": ""
        },
        {
          "name": "Dragonfire Rounds",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Dragonfire rounds are designed to explode just before contact, saturating foes in cover with searing gas and flames.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks:\n▪ Can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ Have [IGNORES COVER].",
          "restrictions": ""
        },
        {
          "name": "Site-To-Site Teleportation",
          "sublabel": "Black Spear Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Site-to-site battlefield teleportation is a rare capability indeed, used only by the Deathwatch in extreme situations.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "▪ Place your unit in **[gloss:strategic-reserves:strategic reserves]**.\n▪ If your unit has KILL TEAM, your unit has DEEP STRIKE until the end of your next Movement phase.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Osseus Key (Aura)",
          "points": 20,
          "flavor": "The ancient clavis known as the Osseus Key is said to be the most powerful of its kind. Where other such devices are made from sanctified platinum, the Osseus Key is made from the hand and finger bones of deceased Imperial Fists heroes that fought in the Horus Heresy, scrimshawed with inhuman care and imbued with the fiercest machine spirits of the age. No portal can bar its bearer from entry, and no xenos machine can stand before his wrath.",
          "body": "WATCH MASTER/TECHMARINE model only. While an enemy VEHICLE unit is within 6” of this model, that enemy unit’s attacks have -1 **[gloss:attack-dice:A]**."
        },
        {
          "name": "The Tome of Ectoclades",
          "points": 15,
          "flavor": "This grimoire, bound in the skin of the alien, holds the most powerful truths the Deathwatch have uncovered about their foes – whether xenos or those who harbour them – arming them with the best tactics and strategies to use against such threats.",
          "body": "WATCH MASTER/CAPTAIN model only. (Once per battle, per army) In your Command phase, you can use this ability. If you do, the **[gloss:sm-combat-doctrine:assault doctrine]**, **devastator doctrine** and **tactical doctrine** are active for this unit until the start of your next Command phase."
        },
        {
          "name": "The Thief of Secrets",
          "points": 10,
          "flavor": "The Thief of Secrets is a blade whose machine spirit has an unquenchable thirst for knowledge. It has tasted the vitae of countless alien races, absorbing those liquids through auto-sanctified sanguinator-channels and codifying them through the honeycombed array of logicum cells within. The biological secrets of many xenos races have thus been laid bare, allowing the blade’s user to modulate its power field, the better to slice through chitinous armour, rupture xenoform organs and burn out alien nervous systems.",
          "body": "WATCH MASTER/CAPTAIN model only. This model has the following weapon:"
        },
        {
          "name": "Beacon Angelis",
          "points": 25,
          "flavor": "The Beacon Angelis was devised to guide the Deathwatch to the threshold of the alien adversary. Housed within a reliquary, it calls out to the warriors’ augur arrays with the voices of a hundred electric cherubim, its summons so strong that it draws the righteous unto its locale regardless of what darkness may surround it.",
          "body": "ADEPTUS ASTARTES model only. If this unit is a KILL TEAM unit, this unit has:\n▪ [core:Deep Strike].\n▪ When you target this unit with the **Rapid Ingress Stratagem**, that use is -1CP."
        }
      ]
    },
    {
      "id": "deathwatch-support",
      "name": "Deathwatch Support",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Disruption"],
      "rule": {
        "name": "Mission Tactics",
        "flavor": "Thousands of years of collated strategic data and hard-won combat experience have provided the Deathwatch with the ultimate battlefield tactics to combat almost any foe.\n\nFUROR TACTICS When the enemy horde grows close, the Deathwatch will be tasked with the decimation of their core. Aiming not for clinical kills but for maximum destruction over a wide area, they tear the heart from the enemy army.\n\nMALLEUS TACTICS When the giants of war lumber forth, the Deathwatch will adopt Malleus tactics. Even the largest behemoth has a weak point, and the archives of the Deathwatch number them all.\n\nPURGATUS TACTICS By adopting Purgatus tactics, the Deathwatch focus their deadly ire upon the commanders of the enemy host, assassinating them one after another with pitiless head shots and killing thrusts of the blade.",
        "body": "Friendly KILL TEAM units with this ability have the following abilities:\n\n**Furor Tactics**: If the **[gloss:sm-combat-doctrine:devastator doctrine]** is active for your unit, your unit’s attacks have [SUSTAINED HITS 1].\n\n**Malleus Tactics**: If the **tactical doctrine** is active for your unit, your unit’s attacks have [LETHAL HITS].\n\n**Purgatus Tactics**: If the **assault doctrine** is active for your unit, your unit’s attacks that target an enemy unit within 9\" of this unit have [PRECISION].\n\nDEATHWATCH ALLIES\n\nYou can include DEATHWATCH units in your army, even though they do not have the same Chapter faction keyword as other units in your army. The combined points value of such units cannot exceed 500 points.\n\nWhen mustering your army, unless otherwise stated, you cannot select a DEATHWATCH model to be your WARLORD. In addition KILL TEAM units can only contain enhancements taken from this detachment.\n\nThis an exception to the Space Marine Chapters Army Rules (pg156)."
      },
      "stratagems": [
        {
          "name": "Dragonfire Rounds",
          "sublabel": "Deathwatch Support – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Dragonfire rounds are designed to explode just before contact, saturating foes in cover with searing gas and flames.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks:\n▪ Can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ Have [IGNORES COVER].",
          "restrictions": ""
        },
        {
          "name": "Hellfire Rounds",
          "sublabel": "Deathwatch Support – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Hellfire rounds douse their targets in voracious acids that are utterly lethal to organic life.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks (excluding [DEVASTATING WOUNDS] attacks) have [ANTI-non-VEHICLE 4+].",
          "restrictions": ""
        },
        {
          "name": "Kraken Rounds",
          "sublabel": "Deathwatch Support – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Kraken rounds utilise adamantine cores and improved propellants to penetrate the thickest hide.",
          "when": "Your Shooting phase when a KILL TEAM unit is selected to shoot.",
          "target": "That KILL TEAM unit.",
          "effect": "Your unit’s ranged attacks have:\n▪ Have +6” **[gloss:range:R]**.\n▪ Have +1 **[gloss:strength:S]**.",
          "restrictions": ""
        },
        {
          "name": "Blackstar Extraction",
          "sublabel": "Deathwatch Support – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Swooping low with transport bays yawning wide, Corvus Blackstar gunships extract Deathwatch warriors from the battlefield and convey them to locations where their lethal talents are most required.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** KILL TEAM unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Beacon Angelis",
          "points": 25,
          "flavor": "The Beacon Angelis was devised to guide the Deathwatch to the threshold of the alien adversary. Housed within a reliquary, it calls out to the warriors’ augur arrays with the voices of a hundred electric cherubim, its summons so strong that it draws the righteous unto its locale regardless of what darkness may surround it.",
          "body": "ADEPTUS ASTARTES model only. If this unit is a KILL TEAM unit, this unit has:\n▪ [core:Deep Strike].\n▪ When you target this unit with the **Rapid Ingress Stratagem**, that use is -1CP."
        }
      ]
    }
  ],
  datasheets: [],
}

export const deathwatch = { en, ru: en }
