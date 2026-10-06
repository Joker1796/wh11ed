// Space Marines — faction rules. Rewritten end to end for Codex: Space Marines (11th edition),
// which landed in app data 963 and replaced every army rule and detachment the faction had.
// Transcribed by scripts/gen-faction-rules.mjs (re-run it rather than hand-porting); sources,
// highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex: Space Marines) → army rules + 15 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/space-marines.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//   The six Codex Supplements (Ultramarines, Imperial Fists, Iron Hands, Raven Guard,
//     Salamanders, White Scars) ship one detachment each, as one-detachment "factions" in
//     appdata; they live here, locked to their Chapter by `chapter:` (the chapter picker).
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/space-marines.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "space-marines",
  name: "Space Marines",
  chapters: [
    "Imperial Fists",
    "Iron Hands",
    "Raven Guard",
    "Salamanders",
    "Ultramarines",
    "White Scars"
  ],
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "The Space Marines draw upon the combat doctrines of the Codex Astartes as they flow through each phase of battle: first hammering the enemy with devastating firepower, then raking them with close-ranged volleys while manoeuvring to deliver a final, crushing assault.",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### Librarius\nADEPTUS ASTARTES PSYKER units with this ability have a **[gloss:psyker-level:psyker level]** of 1 or higher, specified in that unit’s abilities. Each **[gloss:psychic-ability:psychic ability]** has a **psychic level** of 1 or higher, specified in that ability’s name.\n\nIn a battle round, a friendly ADEPTUS ASTARTES PSYKER unit can use a number of **psychic abilities** whose total **psychic level** does not exceed that PSYKER unit’s **psyker level**.\n\nExample: In a battle round, a **psyker level 3** PSYKER unit could use three **psychic level 1** abilities, or one **psychic level 1** ability and one **psychic level 2** ability, or one **psychic level 3** ability.\n\n### Special Move Types\nThe following are special **[gloss:move-type:move types]** that certain or all of your units are eligible to make:\n▪ **[gloss:shock-disembark-move:shock disembark move]** (18.07)\n▪ **[gloss:assault-disembark-move:assault disembark move]** (18.06)"
  },
  detachments: [
    {
      "id": "gauntlet-task-force",
      "name": "Gauntlet Task Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Reconnaissance"],
      "rule": {
        "name": "Combined Deployment",
        "flavor": "Space Marine crews train to provide armoured fire support to their debarked passengers while on the attack.",
        "body": "In your Shooting phase, when a friendly ADEPTUS ASTARTES TRANSPORT unit has shot, you can select one enemy unit hit by those attacks. That enemy unit is **[gloss:sm-assailed:assailed]** until the end of the turn:\n▪ While a unit is **assailed**, when an ADEPTUS ASTARTES unit that disembarked this turn targets that unit, those attacks have [SUSTAINED HITS 1]."
      },
      "stratagems": [
        {
          "name": "Storm and Secure",
          "sublabel": "Gauntlet Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The advanced mechanised assault tactics employed by this force allow ground to be seized rapidly while on the move.",
          "when": "End of your Movement phase.",
          "target": "One friendly ADEPTUS ASTARTES TRANSPORT unit that has an ADEPTUS ASTARTES BATTLELINE unit embarked within it.",
          "effect": "Select one **[gloss:objective:objective]** your unit is controlling. That **objective** is **[gloss:secured-objective:secured]**.",
          "restrictions": ""
        },
        {
          "name": "Aggressive Disembarkation",
          "sublabel": "Gauntlet Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Bursting out of their transport, the Space Marines are already on the move before their foes can react.",
          "when": "Any phase, when a friendly ADEPTUS ASTARTES unit embarked within a TRANSPORT is **[gloss:selected-to-move:selected to move]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "While making that move, each model in your unit can be set up within the **[gloss:set-up-distance:set-up distance]** of that TRANSPORT.\n\nThis allows you to set up your unit within the set-up distance of your TRANSPORT, instead of wholly within that distance.",
          "restrictions": ""
        },
        {
          "name": "Duty is Never Done",
          "sublabel": "Gauntlet Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "There is no time to rest upon laurels while any portion of the Emperor’s realm remains in enemy hands.",
          "when": "End of the Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY unit that was **[gloss:eligible-to-fight:eligible to fight]** this phase, is wholly within 6\" of a friendly TRANSPORT unit, and is eligible to embark within that TRANSPORT unit.",
          "effect": "Your unit embarks within that TRANSPORT unit.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Linebreaker Onslaught",
          "points": 20,
          "flavor": "These battle-brothers excel in bursting from the cover of their transport and straight into the enemy lines.",
          "body": "ADEPTUS ASTARTES INFANTRY model only. If this unit disembarked this turn:\n▪ This unit can re-roll **[gloss:charge-roll:charge rolls]**.\n▪ Enemy units cannot target this unit with **[gloss:snap-shooting:snap shooting]** attacks."
        },
        {
          "name": "Damocles-class Uplink",
          "points": 15,
          "flavor": "This portable strat-shrine plugs directly into the bearer’s armour, enhancing their command and control abilities.",
          "body": "CAPTAIN model only. In your Movement phase, if this unit is embarked within a TRANSPORT unit, you can select one friendly ADEPTUS ASTARTES INFANTRY unit within 6\" of that TRANSPORT unit and select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for that INFANTRY unit."
        }
      ]
    },
    {
      "id": "ironclad-champions",
      "name": "Ironclad Champions",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "rule": {
        "name": "Enduring Vengeance",
        "flavor": "Those who pilot Dreadnoughts combine the skill of undying champions with a cold and vengeful hatred of the Emperor’s countless enemies.",
        "body": "Friendly ADEPTUS ASTARTES DREADNOUGHT units can re-roll **[gloss:hit-roll:hit rolls]** of 1."
      },
      "stratagems": [
        {
          "name": "Adamantine Terror",
          "sublabel": "Ironclad Champions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Booming war cries through his vox-amplifiers, this Dreadnought rampages through the terrified foe.",
          "when": "Start of the Fight phase.",
          "target": "One friendly DREADNOUGHT unit.",
          "effect": "Each enemy unit **[gloss:engaged:engaged]** with your unit makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**.",
          "restrictions": ""
        },
        {
          "name": "Mercy is Weakness",
          "sublabel": "Ironclad Champions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Once a foe is marked for destruction, the Angels of Death must not relent until the target is annihilated.",
          "when": "Your Shooting phase or the Fight phase, when a friendly DREADNOUGHT unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That DREADNOUGHT unit.",
          "effect": "Your unit’s attacks have:\n▪ [LETHAL HITS].\n▪ __Or:__ [SUSTAINED HITS 1].",
          "restrictions": ""
        },
        {
          "name": "Upstoppable Advance",
          "sublabel": "Ironclad Champions – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Ruins, barricades, bunkers; few such structures can impede the relentless advance of an Adeptus Astartes Dreadnought.",
          "when": "Your Movement/Charge phase, when a friendly DREADNOUGHT unit is **[gloss:selected-to-move:selected to move]** or **[gloss:declare-charge:declares a charge]**.",
          "target": "That DREADNOUGHT unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Venerable Champion (Aura) (Upgrade)",
          "points": 30,
          "flavor": "Having won innumerable triumphs, this timeless warrior confers the boon of their martial wisdom upon their battle-brothers.",
          "body": "DREADNOUGHT unit only. While a friendly ADEPTUS ASTARTES INFANTRY/MOUNTED unit is within 6\" of this unit, that unit’s attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1."
        },
        {
          "name": "Artificer Sarcophagus (Upgrade)",
          "points": 40,
          "flavor": "Fashioned by an artificer of exceptional skill over an entire lifetime, this sarcophagus resists even the most grievous blows.",
          "body": "DREADNOUGHT unit only. Attacks that target this unit have -1 **[gloss:damage-roll:D]**."
        }
      ]
    },
    {
      "id": "ironstorm-spearhead",
      "name": "Ironstorm Spearhead",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Purge the Foe"],
      "unique": "IRONSTORM",
      "rule": {
        "name": "Ironstorm Auto-targeters",
        "flavor": "Space Marine armoured formations rapidly share cogitated targeting data to augment their already superb marksmanship and reaction times.",
        "body": "Friendly ADEPTUS ASTARTES VEHICLE units’ (excluding WALKER units) ranged attacks can:\n▪ Re-roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re-roll __one__ **[gloss:wound-roll:wound roll]**."
      },
      "stratagems": [
        {
          "name": "Might of the machine Spirit",
          "sublabel": "Ironstorm Spearhead – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "There are many tales of machine spirits wreaking havoc on the foe, even after the crews of their vehicles are slain.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES VEHICLE unit (excluding DEDICATED TRANSPORT/FLY/WALKER units).",
          "effect": "Until the start of your next Command phase, your unit can ignore modifiers to your unit’s:\n▪ **[gloss:move-characteristic:M]**.\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Hit rolls]** and **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Layered Ceramite",
          "sublabel": "Ironstorm Spearhead – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The labours of artisans in the Chapter armoury now bear fruit.",
          "when": "Any phase, when a friendly ADEPTUS ASTARTES VEHICLE unit suffers a **[gloss:mortal-wound:mortal wound]**.",
          "target": "That ADEPTUS ASTARTES VEHICLE unit.",
          "effect": "Your unit has [core:Feel No Pain 5+] against **[gloss:mortal-wound:mortal wounds]**.",
          "restrictions": ""
        },
        {
          "name": "Headhunter Doctrine",
          "sublabel": "Ironstorm Spearhead – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Exhaustive tactical training aids Space Marine gunners in exploiting any weakness in their targets’ armour.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES VEHICLE unit (excluding DEDICATED TRANSPORT/FLY/WALKER units) is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES VEHICLE unit.",
          "effect": "Your unit’s ranged attacks have [LETHAL HITS: MONSTER/VEHICLE].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Redoubtable Machine Spirit (Upgrade)",
          "points": 25,
          "flavor": "This ancient war machine has endured millennia of battle, and its belligerent machine spirit has only become more obdurant.",
          "body": "ADEPTUS ASTARTES VEHICLE unit only (excluding DEDICATED TRANSPORT/FLY/WALKER units). This unit:\n▪ Has 5+ **[gloss:invulnerable-save:InSv].**\n▪ At the end of your Command phase, **[gloss:heal:heals]** 1 wound."
        },
        {
          "name": "Gunnery Honours (Upgrade)",
          "points": 15,
          "flavor": "The crew of this war machine demonstrate exemplary gunnery and have earned the highest honours for their craft.",
          "body": "ADEPTUS ASTARTES VEHICLE unit only (excluding DEDICATED TRANSPORT/FLY/WALKER units). This unit’s ranged attacks have [HEAVY]."
        }
      ]
    },
    {
      "id": "tacticus-attack-force",
      "name": "Tacticus Attack Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Take and Hold"],
      "unique": "TACTICUS",
      "rule": {
        "name": "Wrath of the Chapter",
        "flavor": "When the Space Marines are roused to true martial fury, they bring their vengeance to their adversaries with the inescapable speed of a lightning strike.",
        "body": "Friendly TACTICUS units can re-roll **[gloss:advance-roll:advance rolls]**."
      },
      "stratagems": [
        {
          "name": "Transhuman Swiftness",
          "sublabel": "Tacticus Attack Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Poised and aware of their foes’ every move, these warriors strike at the most tactically advantageous moment.",
          "when": "Fight phase, when an enemy unit has fought.",
          "target": "One friendly TACTICUS unit that is within range of an **[gloss:objective:objective]** and is **[gloss:eligible-to-fight:eligible to fight]**.",
          "effect": "Your unit has [core:Fights First] and __must__ be the next unit you **select to fight**.",
          "restrictions": ""
        },
        {
          "name": "Tactical Focus",
          "sublabel": "Tacticus Attack Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Even amidst the fiercest fighting, this squad retains sight of their assigned mission.",
          "when": "Fight phase, when a friendly TACTICUS unit is selected to make a **[gloss:consolidation:consolidation move]**.",
          "target": "That TACTICUS unit.",
          "effect": "When making that **[gloss:consolidation:consolidation move]**, your unit can move up to D3+3\".",
          "restrictions": ""
        },
        {
          "name": "Relentless Assault",
          "sublabel": "Tacticus Attack Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Pressing mercilessly forward, these warriors place shots and blows perfectly, no matter their targets.",
          "when": "Your Shooting phase or the Fight phase, when a friendly TACTICUS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That TACTICUS unit.",
          "effect": "Your unit’s attacks have:\n▪ [SUSTAINED HITS 1: non-MONSTER/VEHICLE].\n▪ __Or:__ [LETHAL HITS: MONSTER/VEHICLE].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Martial Paragon",
          "points": 10,
          "flavor": "Leading his battle-brothers by example, this champion of the Chapter strives to embody the martial teachings of the Codex Astartes.",
          "body": "TACTICUS model only. This unit’s attacks can:\n▪ Re-roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re-roll __one__ **[gloss:wound-roll:wound roll]**."
        },
        {
          "name": "Spearpoint War Leader",
          "points": 15,
          "flavor": "Once the enemy are sighted, this warrior leads the attack from the very front, striving to be first in amongst the foe’s ranks.",
          "body": "TACTICUS model only. This unit has [core:Scouts 6\"]."
        }
      ]
    },
    {
      "id": "tacticus-firestorm-force",
      "name": "Tacticus Firestorm Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "unique": "TACTICUS",
      "rule": {
        "name": "Codex Fire-patterns",
        "flavor": "Faced with multiple threats that must be efficiently eliminated, the Space Marines employ time-honoured ballistic doctrines to great effect.",
        "body": "Friendly TACTICUS units’ [RAPID FIRE] attacks benefit from [RAPID FIRE] when targeting units up to that attack’s maximum range."
      },
      "stratagems": [
        {
          "name": "Point-blank Brutality",
          "sublabel": "Tacticus Firestorm Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Transhuman skill and reaction times render these Space Marines’ firearms as deadly up close as any blade.",
          "when": "Your Shooting phase, when a friendly **[gloss:engaged:engaged]** TACTICUS unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That TACTICUS unit.",
          "effect": "Your unit’s ranged attacks (excluding [BLAST] attacks) have:\n▪ [CLOSE-QUARTERS].\n▪ [IGNORES COVER].",
          "restrictions": ""
        },
        {
          "name": "For the Emperor!",
          "sublabel": "Tacticus Firestorm Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Unflinching in their loyalty to Chapter and Primarch, battle-brothers seize and hold their objectives with unrelenting determination and zealous fury.",
          "when": "Command phase.",
          "target": "One friendly TACTICUS unit that is within range of an **[gloss:objective:objective]**.",
          "effect": "Your unit has +1 **[gloss:objective-control:OC]** until the end of the turn.",
          "restrictions": ""
        },
        {
          "name": "Relentless Assault",
          "sublabel": "Tacticus Firestorm Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Pressing mercilessly forward, these warriors place shots and blows perfectly, no matter their targets.",
          "when": "Your Shooting phase or the Fight phase, when a friendly TACTICUS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That TACTICUS unit.",
          "effect": "Your unit’s attacks have:\n▪ [SUSTAINED HITS 1: non-MONSTER/VEHICLE].\n▪ __Or:__ [LETHAL HITS: MONSTER/VEHICLE].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Cyber-familiar",
          "points": 15,
          "flavor": "Hovering high overhead on grav-impellers, this small cyber-creature cogitates emergent threats and alerts its master to tactical openings.",
          "body": "TACTICUS model only. When both players have deployed their armies, you can redeploy up to three friendly ADEPTUS ASTARTES INFANTRY units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
        },
        {
          "name": "Tempered in Battle (Aura)",
          "points": 10,
          "flavor": "The stonewrought reputation and unfaltering determination of this commander serve as a linchpin for even the most hard-pressed strike force.",
          "body": "TACTICUS model only. Friendly ADEPTUS ASTARTES units within 6\" of this model can re-roll **[gloss:leadership-roll:leadership rolls]**."
        }
      ]
    },
    {
      "id": "stormlance-task-force",
      "name": "Stormlance Task Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Reconnaissance"],
      "rule": {
        "name": "Lightning-fast Strike",
        "flavor": "Racing into battle at breakneck speeds, Space Marine fast-attack squadrons often punch into the enemy lines before the foe even realises their peril.",
        "body": "Friendly ADEPTUS ASTARTES MOUNTED/SPEEDER units have +2\" **[gloss:move-characteristic:M]**."
      },
      "stratagems": [
        {
          "name": "Hurtling Targets",
          "sublabel": "Stormlance Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "With nerves of steel and transhuman reactions, the Space Marines jink and weave cooly through incoming fire.",
          "when": "Your opponent’s Shooting phase, when an enemy unit targets a friendly ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "target": "That ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "effect": "Ranged attacks that target your unit have -1 to **[gloss:hit-roll:hit rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Wind-Swift Evasion",
          "sublabel": "Stormlance Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Employing their steeds’ pace to utmost effect, these warriors stay ever on the move.",
          "when": "End of the Fight phase.",
          "target": "One friendly ADEPTUS ASTARTES MOUNTED unit that was **[gloss:eligible-to-fight:eligible to fight]** this phase.",
          "effect": "▪ If your unit is **[gloss:unengaged:unengaged]**, your unit can make a **[gloss:normal-move:normal move]**.\n▪ __Or:__ If your unit is **[gloss:engaged:engaged]**, your unit can make a **[gloss:fall-back-move:fall-back move]**.",
          "restrictions": ""
        },
        {
          "name": "Sudden Onslaught",
          "sublabel": "Stormlance Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Speed and shock are key to the Space Marine way of war: never more so than on rapid-strike missions.",
          "when": "Your Movement phase, when a friendly ADEPTUS ASTARTES MOUNTED/SPEEDER unit is selected to make an **[gloss:advance-move:advance move]**.",
          "target": "That ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "effect": "Your unit can change its **[gloss:advance-roll:advance rolls]** to a 6.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Auspex Triangulation Shrines (Upgrade)",
          "points": 10,
          "flavor": "Fitted to the Chapter’s swift grav-speeders, these vigilant devices runelock the positions of enemy forces, laying them bare to the Space Marines’ wrath.",
          "body": "ADEPTUS ASTARTES SPEEDER unit only. At the start of your Shooting phase, select one **[gloss:visible:visible]** enemy unit within 12\" of this unit. That enemy unit is **[gloss:tau-spotted:spotted]**:\n▪ While a unit is **spotted**, that unit has +3\" **[gloss:detection-range:detection range]**."
        },
        {
          "name": "Supercharged Engines (Upgrade)",
          "points": 10,
          "flavor": "Built from ancient and dimly understood designs, these engines generate incredible power and torque.",
          "body": "ADEPTUS ASTARTES MOUNTED unit only. This unit can re-roll **[gloss:advance-roll:advance rolls]**."
        }
      ]
    },
    {
      "id": "gladius-task-force",
      "name": "Gladius Task Force",
      "source": "codex",
      "dp": 3,
      "forceDispositions": ["Take and Hold", "Priority Assets"],
      "rule": {
        "name": "Codex Discipline",
        "flavor": "Deployed as a mutually supportive strike force that epitomises the flexibility and martial wisdom of the Codex Astartes, Space Marines have the answer to any strategic or tactical challenge.",
        "body": "You can select one **[gloss:sm-combat-doctrine:combat doctrine]** one additional time per battle."
      },
      "stratagems": [
        {
          "name": "Armour of Contempt",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post-human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Adaptive Strategy",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The tenets of the Codex Astartes allow for unorthodox use of combat tactics and the employment of divergent doctrines if doing so will lead to victory.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "A Worthy Death",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Those Space Marines who specialise in close assault are ready to fight to their last breath and beyond to cut down more foes.",
          "when": "Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "When a model in your unit is **[gloss:destroyed:destroyed]**, if your unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6:\n▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.",
          "restrictions": ""
        },
        {
          "name": "Responsive Tactics",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Space Marines know precisely when to give ground to leave enemies floundering, before surging back and driving them from the field in disarray.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D6\".",
          "restrictions": ""
        },
        {
          "name": "Storm of devastation",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Masters of the art of long-ranged warfare, these warriors unleash utter devastation upon their enemies.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s ranged attacks have [IGNORES COVER].",
          "restrictions": ""
        },
        {
          "name": "Might of angels",
          "sublabel": "Gladius Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Relentless assault training allows these warriors to focus their already impressive might into a truly devastating close-quarters onslaught.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s melee attacks have [LANCE].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Laurels of Triumph",
          "points": 20,
          "flavor": "A rare honour, the Laurels of Triumph mark out a truly accomplished warrior even amongst the Angels of Death.",
          "body": "ADEPTUS ASTARTES model only. This model’s melee attacks have:\n▪ +1 **[gloss:strength:S]** and **[gloss:armour-penetration:AP]**.\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, +2 **S** and **AP**."
        },
        {
          "name": "Adept of the Codex",
          "points": 20,
          "flavor": "An ardent student of the Codex Astartes, this commander epitomises its tactical genius.",
          "body": "CAPTAIN model only. The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for this unit __in addition__ to any other **combat doctrine**."
        },
        {
          "name": "Artificer Armour",
          "points": 15,
          "flavor": "Crafted by the Chapter’s finest artificers, this suit of armour provides superior protection.",
          "body": "ADEPTUS ASTARTES model only. This model has:\n▪ 2+ **[gloss:save:Sv]**.\n▪ [core:Feel No Pain 5+]."
        },
        {
          "name": "Standard of the Emperor Ascendant",
          "points": 25,
          "flavor": "This venerable banner was carried in the Great Crusade, and its presence is a constant inspiration.",
          "body": "ANCIENT model only. This model has:\n▪ +1 **[gloss:objective-control:OC]** and **[gloss:leadership:Ld]**.\n▪ [core:Feel No Pain 5+].\n▪ The following ability:\n\nAncient Exhortation (Once per battle, per army): When this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, this unit’s melee attacks have +1 **[gloss:attack-dice:A]** until the end of the phase."
        }
      ]
    },
    {
      "id": "terminator-storm-force",
      "name": "Terminator Storm Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "unique": "TERMINATOR",
      "rule": {
        "name": "Death Blow",
        "flavor": "Veterans of a hundred decapitating strikes, these First Company warriors know that if they land their first blow with sufficiently furious momentum, they will need no second.",
        "body": "Friendly ADEPTUS ASTARTES TERMINATOR units have +1 to **[gloss:charge-roll:charge rolls]**."
      },
      "stratagems": [
        {
          "name": "Tactical Dreadnought Fortitude",
          "sublabel": "Terminator Storm Force – Stratagem",
          "cp": "2CP",
          "turn": "either",
          "flavor": "The combination of Tactical Dreadnought armour and transhuman physiology is redoubtable indeed.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES TERMINATOR unit.",
          "target": "That ADEPTUS ASTARTES TERMINATOR unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:damage-roll:D]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Gunship Extraction",
          "sublabel": "Terminator Storm Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Armoured gunships are often assigned to swoop in and relocate Terminator Squads in the midst of battle.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES TERMINATOR unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "Merciless Veterans",
          "sublabel": "Terminator Storm Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Cumulative centuries of military experience help these veterans’ firepower hit home with murderous precision.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES TERMINATOR unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES TERMINATOR unit.",
          "effect": "Your unit’s ranged attacks have:\n▪ [LETHAL HITS].\n▪ [SUSTAINED HITS 1].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Corporeum Reliquary",
          "points": 25,
          "flavor": "This archeotech teleportation stabiliser is unique, a relic of Dark Age technology that spirits its bearer swiftly through the tides of the Warp.",
          "body": "ADEPTUS ASTARTES TERMINATOR model only. In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**."
        },
        {
          "name": "Champion of the First Company",
          "points": 20,
          "flavor": "Few are the enemies this warrior has not faced and bested, and they remember the vulnerabilities of every defeated foe.",
          "body": "ADEPTUS ASTARTES TERMINATOR model only. This unit’s melee attacks have [LETHAL HITS]."
        }
      ]
    },
    {
      "id": "devastator-brethren",
      "name": "Devastator Brethren",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Purge the Foe"],
      "unique": "DOCTRINES",
      "rule": {
        "name": "Devastator Mastery",
        "flavor": "Unceasing and unmerciful, Adeptus Astartes fire support formations lay waste to all that falls under their gunsights.",
        "body": "You can select the **[gloss:sm-combat-doctrine:devastator doctrine]** one additional time per battle."
      },
      "stratagems": [
        {
          "name": "Armour of Contempt",
          "sublabel": "Devastator Brethren – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post-human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Storm of Fire",
          "sublabel": "Devastator Brethren – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "There is no escaping the wrath of the Space Marines, and they use their weapons to bring swift death to their foes wherever they may hide.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s ranged attacks have:\n▪ [IGNORES COVER].\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:devastator doctrine]** is active for your unit, [IGNORES COVER] and +1 **[gloss:armour-penetration:AP]**.",
          "restrictions": ""
        },
        {
          "name": "Hail of Vengeance",
          "sublabel": "Devastator Brethren – Stratagem",
          "cp": "2CP",
          "turn": "opponent",
          "flavor": "Space Marines’ incredible battlefield awareness enables them to instinctively identify the origin of any enemy fire and punish their attackers.",
          "when": "Your opponent’s Shooting phase, when an enemy unit has shot, if those attacks **[gloss:destroyed:destroyed]** a model in a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit shoots using **[gloss:normal-shooting:normal shooting]**, but while doing so your unit can only target that enemy unit.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Master-forged Firearms",
          "points": 15,
          "flavor": "The finest ballistic armaments the Chapter’s artificers can create, these weapons reap a grievous tally of foes.",
          "body": "ADEPTUS ASTARTES INFANTRY/MOUNTED model only. This model’s ranged attacks (excluding [PSYCHIC] attacks) have +1 **[gloss:attack-dice:A]**, **[gloss:strength:S]**, **[gloss:armour-penetration:AP]** and **[gloss:damage-roll:D]**."
        },
        {
          "name": "Honour of Vigilance",
          "points": 20,
          "flavor": "A savant of applied firepower, this warrior ensures their comrades’ big guns are always optimally positioned and targeted.",
          "body": "ADEPTUS ASTARTES model only.\n▪ This unit’s ranged attacks have [LETHAL HITS].\n▪ If the **[gloss:sm-combat-doctrine:devastator doctrine]** is active for this unit, this unit can re‑roll **[gloss:advance-roll:advance rolls]**."
        }
      ]
    },
    {
      "id": "gravis-siege-force",
      "name": "Gravis Siege Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Take and Hold"],
      "unique": "GRAVIS",
      "rule": {
        "name": "Indomitable Defence",
        "flavor": "The Adeptus Astartes stand as an adamantine wall against any who would assail the Emperor’s realm.",
        "body": "While a friendly GRAVIS unit is within range of an **[gloss:objective:objective]**, attacks that target that unit with a **[gloss:strength:S]** greater than that unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      },
      "stratagems": [
        {
          "name": "Annihilating Force",
          "sublabel": "Gravis Siege Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Knowing well their duty to shatter the foe’s lines, these warriors strike with devastating strength.",
          "when": "Your Shooting phase or the Fight phase, when a friendly GRAVIS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That GRAVIS unit.",
          "effect": "Your unit’s attacks have [LETHAL HITS].",
          "restrictions": ""
        },
        {
          "name": "Suppression Volleys",
          "sublabel": "Gravis Siege Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Laying down hails of heavy fire, these warriors pin or drive back the foe.",
          "when": "Your Shooting phase, when a friendly GRAVIS unit has shot.",
          "target": "That GRAVIS unit.",
          "effect": "Select one enemy unit hit by those attacks. That enemy unit makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**.",
          "restrictions": ""
        },
        {
          "name": "Stand Unyielding",
          "sublabel": "Gravis Siege Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Ground claimed by Gravis-clad Adeptus Astartes cannot be taken back with ease.",
          "when": "End of your Movement phase.",
          "target": "One friendly GRAVIS unit.",
          "effect": "Select one **[gloss:objective:objective]** your unit is controlling. That **objective** is **[gloss:secured-objective:secured]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Immovable Conquerors (Upgrade)",
          "points": 15,
          "flavor": "Once these Gravis-armoured warriors have planted their feet and braced for battle, no force in the galaxy can move them.",
          "body": "GRAVIS unit only. This unit has +1 **[gloss:objective-control:OC]**."
        },
        {
          "name": "Narthecis Gauntlet",
          "points": 20,
          "flavor": "This rare supplementary medicae suite allows this Apothecary to provide support to their battle-brothers despite being outfitted for a different role.",
          "body": "APOTHECARY BIOLOGIS model only. in your Command phase, this unit **[gloss:heal:heals]** D3+1 wounds."
        }
      ]
    },
    {
      "id": "tactical-brethren",
      "name": "Tactical Brethren",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "unique": "DOCTRINES",
      "rule": {
        "name": "Tactical Mastery",
        "flavor": "Rarely are the Adeptus Astartes deadlier than when they bring to bear the most fundamental teachings of the Codex Astartes.",
        "body": "You can select the **[gloss:sm-combat-doctrine:tactical doctrine]** one additional time per battle."
      },
      "stratagems": [
        {
          "name": "Armour of Contempt",
          "sublabel": "Tactical Brethren – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post-human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Masterful Tactics",
          "sublabel": "Tactical Brethren – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Such is the Space Marines’ grasp of adaptive tactics that even the most canny enemies soon find themselves out of position.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of:\n▪ Up to D6\".\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:tactical doctrine]** is active for your unit, up to 6\".",
          "restrictions": ""
        },
        {
          "name": "Domination Fire",
          "sublabel": "Tactical Brethren – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The Codex Astartes dictates when firepower is best used to dismay, disrupt and debilitate the enemy.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES unit has shot.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Select one enemy unit hit by those attacks. That enemy unit is **[gloss:sm-suppressed:suppressed]** until the start of your next turn:\n▪ While a unit is **suppressed**, that unit’s attacks have -1 to **[gloss:hit-roll:hit rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Tactical Insight",
          "points": 15,
          "flavor": "This champion understands the deeper flow of battle, and is always prepared to discern the course of action that will bring assured victory.",
          "body": "CAPTAIN model only. The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for this unit __in addition__ to any other **combat doctrine**."
        },
        {
          "name": "Laurels of Vigilance",
          "points": 10,
          "flavor": "Those awarded this prestigious honour are ever vigilant, responding swiftly and with measured force to enemy threats.",
          "body": "ADEPTUS ASTARTES model only.\n\n(Once per battle round, per army) When you use the **Fire Overwatch/Heroic Intervention stratagem**, if you target a friendly ADEPTUS ASTARTES BATTLELINE unit within 12\" of this model with that **[gloss:stratagem:stratagem]**, that use is -1 CP."
        }
      ]
    },
    {
      "id": "phobos-shock-force",
      "name": "Phobos Shock Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Disruption"],
      "unique": "PHOBOS",
      "rule": {
        "name": "Vanguard Ambushers",
        "flavor": "Few experiences are so terrifying for Mankind’s enemies as finding themselves the victims of Phobos-armoured ambushers.",
        "body": "At the end of your Movement phase, if a friendly PHOBOS unit is **[gloss:hidden:hidden]**, that unit’s attacks can re-roll **[gloss:wound-roll:wound rolls]** of 1 until the end of the turn."
      },
      "stratagems": [
        {
          "name": "Umbral Evasion",
          "sublabel": "Phobos Shock Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "A combination of technological arcana and expert training help these warriors to evade the eyes of the foe.",
          "when": "Your opponent’s Shooting phase, when an enemy unit targets a friendly PHOBOS unit.",
          "target": "That PHOBOS unit.",
          "effect": "Ranged attacks that target your unit have -1 to **[gloss:hit-roll:hit rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Strike from the Shadows",
          "sublabel": "Phobos Shock Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "To evade one’s enemies and sow confusion can be a deadly weapon in itself.",
          "when": "Your Shooting phase or the Fight phase, when a friendly **[gloss:hidden:hidden]** PHOBOS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That PHOBOS unit.",
          "effect": "Your unit’s attacks have:\n▪ +1 **[gloss:strength:S]**.\n▪ [LETHAL HITS].",
          "restrictions": ""
        },
        {
          "name": "Transhuman Reactions",
          "sublabel": "Phobos Shock Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Seemingly with the speed of instinct, these warriors reposition in response to the enemy’s movements.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** PHOBOS unit.",
          "target": "That PHOBOS unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of:\n▪ Up to D6\".\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:tactical doctrine]** is active for your unit, up to 6\".",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Seal of Shrouding",
          "points": 15,
          "flavor": "Built into what appears a simple wax purity seal, this device scrambles enemy targeting when the bearer is on the move.",
          "body": "PHOBOS model only. Enemy units cannot target this unit with **[gloss:snap-shooting:snap shooting]** attacks."
        },
        {
          "name": "Venator Omni-auspex",
          "points": 15,
          "flavor": "Constantly detecting and analysing viable targets, this artefact feeds advanced combat data directly into the bearer’s autosenses.",
          "body": "PHOBOS model only. This unit’s attacks that target a **[gloss:hidden:hidden]** unit can:\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, re-roll **wound rolls** of 1-2."
        }
      ]
    },
    {
      "id": "assault-brethren",
      "name": "Assault Brethren",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Take and Hold"],
      "unique": "DOCTRINES",
      "rule": {
        "name": "Assault Mastery",
        "flavor": "Space Marines who specialise in close-quarters brutality truly embody their sobriquet ‘Angels of Death’.",
        "body": "You can select the **[gloss:sm-combat-doctrine:assault doctrine]** one additional time per battle."
      },
      "stratagems": [
        {
          "name": "Gene-wrought Might",
          "sublabel": "Assault Brethren – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Space Marines are blessed with incredible strength.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s melee attacks have:\n▪ [LANCE].\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for your unit, [LANCE] and +1 **[gloss:armour-penetration:AP]**.",
          "restrictions": ""
        },
        {
          "name": "Armour of Contempt",
          "sublabel": "Assault Brethren – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post-human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Duty in Death",
          "sublabel": "Assault Brethren – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Imminent death does not prevent a Space Marine from enacting their final justice upon the Emperor’s foes.",
          "when": "Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "When a model in your unit is **[gloss:destroyed:destroyed]**, if your unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6, with +1 to that roll if the **[gloss:sm-combat-doctrine:assault doctrine]** is active for your unit:\n▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Imperium’s Sword",
          "points": 20,
          "flavor": "This champion hurls himself forwards with unbridled ferocity, cutting down the foe like a reaping whirlwind.",
          "body": "ADEPTUS ASTARTES model only. This model has the following weapon:"
        },
        {
          "name": "Furious Assault (Upgrade)",
          "points": 10,
          "flavor": "Bellicose temperament and advanced training combine to make this unit especially terrifying on the charge.",
          "body": "ADEPTUS ASTARTES INFANTRY unit only. This unit’s melee attacks have [SUSTAINED HITS 1: non-MONSTER/VEHICLE]."
        }
      ]
    },
    {
      "id": "phobos-shadow-force",
      "name": "Phobos Shadow Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Disruption"],
      "unique": "PHOBOS",
      "rule": {
        "name": "Shadow Masters",
        "flavor": "Holding to the shadows and choosing victims with care, Phobos-armoured Astartes winnow the enemy ranks without ever revealing their positions.",
        "body": "When a friendly PHOBOS or SCOUT SQUAD unit has shot:\n▪ Those attacks do not prevent that unit from being **[gloss:hidden:hidden]**.\n▪ __Or:__ That unit can make a **[gloss:normal-move:normal move]** of up to D6\". That unit is __not__ **[gloss:eligible-to-charge:eligible to declare a charge]** until the end of the turn."
      },
      "stratagems": [
        {
          "name": "Mortis Snares",
          "sublabel": "Phobos Shadow Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "These stealth operatives lace the battlefield with explosive devices that trigger by micro-auspex and las-wire when foes blunder into them.",
          "when": "End of your Movement phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** PHOBOS**/**SCOUT SQUAD unit.",
          "effect": "If your unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:sm-snared:snared]**. While an **objective** is **snared**, when an enemy unit ends a move within range of that **objective**, roll one D6:\n▪ On a 2+, that enemy unit suffers D6 **[gloss:mortal-wound:mortal wounds]**.\n▪ That **objective** is no longer **snared**.",
          "restrictions": ""
        },
        {
          "name": "Tactical withdrawal",
          "sublabel": "Phobos Shadow Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "At an opportune moment, Space Marine infiltration units slip away from battle, only to relocate ready to strike the foe again.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** PHOBOS**/**SCOUT SQUAD unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "Strike from the Shadows",
          "sublabel": "Phobos Shadow Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "To evade one’s enemies and sow confusion can be a deadly weapon in itself.",
          "when": "Your Shooting phase or the Fight phase, when a friendly **[gloss:hidden:hidden]** PHOBOS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That PHOBOS unit.",
          "effect": "Your unit’s attacks have:\n▪ +1 **[gloss:strength:S]**.\n▪ [LETHAL HITS].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Venator Omni-auspex",
          "points": 15,
          "flavor": "Constantly detecting and analysing viable targets, this artefact feeds advanced combat data directly into the bearer’s autosenses.",
          "body": "PHOBOS model only. This unit’s attacks that target a **[gloss:hidden:hidden]** unit can:\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, re-roll **wound rolls** of 1 and 2."
        },
        {
          "name": "Execute and Redeploy",
          "points": 25,
          "flavor": "This war leader excels in harrying tactics, wielding their strike force like a weapon of utmost stealth and cunning.",
          "body": "PHOBOS model only. In your Shooting phase, after this unit has shot, if this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]** of up to 6\". If it does, this unit is __not__ **[gloss:eligible-to-charge:eligible to declare a charge]** until the end of the turn."
        }
      ]
    },
    {
      "id": "gravis-linebreaker-force",
      "name": "Gravis Linebreaker Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Take and Hold"],
      "unique": "GRAVIS",
      "rule": {
        "name": "Walking Fortress",
        "flavor": "With their plan in motion and targets designated, Gravis-armoured warriors stride unstoppably into battle as they lay down withering hails of firepower.",
        "body": "In a turn a friendly GRAVIS unit made a **[gloss:normal-move:normal move]**, that unit’s ranged attacks:\n▪ Do not have [HEAVY].\n▪ Have +1 to **[gloss:hit-roll:hit rolls]**."
      },
      "stratagems": [
        {
          "name": "Purgation Push",
          "sublabel": "Gravis Linebreaker Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Gravis assault tactics stipulate a relentless advance coupled with unfaltering firepower.",
          "when": "Your Shooting phase, when a friendly GRAVIS unit has shot.",
          "target": "That GRAVIS unit.",
          "effect": "▪ If your unit is **[gloss:unengaged:unengaged]**, your unit can make a **[gloss:normal-move:normal move]** of up to 5\", and must end that move within range of an **[gloss:objective:objective]**.\n▪ Your unit is __not__ **[gloss:eligible-to-charge:eligible to declare a charge]** or embark within a TRANSPORT until the end of the turn.",
          "restrictions": ""
        },
        {
          "name": "Armoured Impact",
          "sublabel": "Gravis Linebreaker Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Throwing their armoured mass into an assault, a Space Marine in Gravis armour can crush and trample their foe.",
          "when": "Your Charge phase, when a friendly GRAVIS unit ends a **[gloss:charge-move:charge move]**.",
          "target": "That GRAVIS unit.",
          "effect": "When your unit ends a **[gloss:charge-move:charge move]**, you can select one enemy unit **[gloss:engaged:engaged]** with your unit. If you do, roll one D6 for each model in your unit **engaged** with that enemy unit:\n▪ For each 3+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]**.",
          "restrictions": ""
        },
        {
          "name": "Annihilating Force",
          "sublabel": "Gravis Linebreaker Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Knowing well their duty to shatter the foe’s lines, these warriors strike with devastating strength.",
          "when": "Your Shooting phase or the Fight phase, when a friendly GRAVIS unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That GRAVIS unit.",
          "effect": "Your unit’s attacks have [LETHAL HITS].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Relentless Advance",
          "points": 20,
          "flavor": "Ever on the move, this warrior leads his battle-brothers in a tireless crusade across the battlefields of the 41st millennium.",
          "body": "GRAVIS model only. This unit has [core:Scouts 5\"]."
        },
        {
          "name": "Indefatigable Fortitude",
          "points": 20,
          "flavor": "Renowned for being a living engine of war, this warrior inspires his comrades to shrug off even the most devastating attacks.",
          "body": "GRAVIS model only. Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
        }
      ]
    },
    {
      "id": "blade-of-ultramar",
      "name": "Blade of Ultramar",
      "source": "codex",
      "chapter": "Ultramarines",
      "dp": 3,
      "forceDispositions": ["Take and Hold", "Priority Assets"],
      "rule": {
        "name": "Mastered Doctrines",
        "flavor": "Marneus Calgar deploys the complete and nuanced wisdom of the Codex Astartes as easily and instinctively as drawing breath.",
        "body": "If your army includes a MARNEUS CALGAR unit, you can select the **[gloss:sm-combat-doctrine:assault doctrine]/devastator doctrine/tactical doctrine** each one additional time per battle."
      },
      "stratagems": [
        {
          "name": "Ultramarian Adaptivity",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "No Chapter’s warriors know better the breadth – theoretical and practical – of the Codex Astartes’ teachings, and how these can and should be adapted to ensure victory.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "Exemplary Vigilance",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Long have the Ultramarines guarded both Ultramar and the wider Imperium. No foe can hide from their vengeful gaze or evade the reach of their wrath.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s ranged attacks have [IGNORES COVER].",
          "restrictions": ""
        },
        {
          "name": "Courage and Honour!",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Roaring their famed battle cry, the Ultramarines hurl themselves into the fight, striving all the harder to prevail beneath the unwavering eye of their Chapter Master.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s melee attacks have [LANCE].",
          "restrictions": ""
        },
        {
          "name": "Tactical Foresight",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "With the enemy’s countermeasures and responses predicted and allowed for in advance, the Ultramarines can weather their most ferocious attacks.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Practical Tactics",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "After rapidly making a theoretical assessment of the foes’ probable next moves, the Ultramarines apply practical repositioning to counter them.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3\".",
          "restrictions": ""
        },
        {
          "name": "Armour of Contempt",
          "sublabel": "Blade of Ultramar – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The belligerence of the Adeptus Astartes combined with their post‑human physiology makes them unyielding foes to face.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Armour of Antoninus",
          "points": 15,
          "flavor": "Originally worn by a storied Captain of the Ultramarines’ First Company, this artificer armour is bestowed by the Chapter Master himself upon a worthy wearer.",
          "body": "ADEPTUS ASTARTES model only. This model has:\n▪ 2+ **[gloss:save:Sv]**.\n▪ [core:Feel No Pain 5+]."
        },
        {
          "name": "Student of the Codex",
          "points": 20,
          "flavor": "This prodigal officer has focused upon one aspect of the Codex Astartes and means to master its every aspect before moving on to the next.",
          "body": "CAPTAIN model only. The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for this unit __in addition__ to any other **combat doctrine**."
        },
        {
          "name": "Oath of Macragge",
          "points": 20,
          "flavor": "Amongst the most solemn and binding oaths an Ultramarine can swear, it is a rare honour to enter battle with these words affixed to their armour.",
          "body": "ADEPTUS ASTARTES model only. This model’s melee attacks have:\n▪ +1 **[gloss:strength:S]** and **[gloss:armour-penetration:AP]**.\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, +2 **S** and **AP**."
        },
        {
          "name": "Veteran of Behemoth",
          "points": 20,
          "flavor": "Having battled the Tyranid swarms since their first galactic invasion, this veteran officer knows well the benefit of efficient and overwhelming firepower.",
          "body": "ADEPTUS ASTARTES model only. This unit’s ranged attacks have [SUSTAINED HITS 1]."
        }
      ]
    },
    {
      "id": "ceramite-sentinels",
      "name": "Ceramite Sentinels",
      "source": "codex",
      "chapter": "Imperial Fists",
      "dp": 2,
      "forceDispositions": ["Take and Hold"],
      "rule": {
        "name": "Adaptive Defence",
        "flavor": "These Space Marines are experts in fighting from rapidly prepared defensive positions. They are able to maximise the potential of almost any terrain to serve as an ad‑hoc strongpoint, rapidly assessing optimal firing lines and punishing the foe’s every attempt to advance and dislodge them.",
        "body": "▪ While a friendly ADEPTUS ASTARTES unit is within a **[gloss:terrain-area:terrain area]**, that unit’s attacks can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ Friendly ADEPTUS ASTARTES units are **[gloss:sm-entrenched:entrenched]** while all of the following apply:\n▪ That unit is within a **terrain area**.\n▪ That unit was not set up this turn.\n▪ No model in that unit moved more than 3\" this turn.\n▪ Friendly DARNATH LYSANDER/TOR GARADON units have the following ability:\n\n**Defensive Mastery**: At the start of each phase, this unit is **entrenched**.\n\nDarnath Lysander's/Tor Garadon's unit is always **entrenched**, regardless of the conditions listed above.\n\n**Restrictions:** Your army can include IMPERIAL FISTS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Augmented Targeting",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Auto‑sense targeting subroutines specially adapted for defensive fire patterns aid these warriors’ aim.",
          "when": "Your Shooting phase or the Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s attacks have:\n▪ [LETHAL HITS].\n▪ __Or:__ [SUSTAINED HITS 1].\n▪ __Or:__ If your unit is **[gloss:sm-entrenched:entrenched]**, [LETHAL HITS] and [SUSTAINED HITS 1].",
          "restrictions": ""
        },
        {
          "name": "Evasive Repositioning",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Codex doctrine when conducting an aggressive defence is to swiftly take up new positions whenever the foe finds your range.",
          "when": "Your opponent’s Shooting phase, when an enemy unit has shot.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED unit that lost a wound as a result of those attacks.",
          "effect": "▪ Your unit can make a **[gloss:normal-move:normal move]** of up to D6\".\n▪ __Or:__ If your unit is **[gloss:sm-entrenched:entrenched]**, your unit can make a **normal move** of up to D3+3\".\n\nYour unit is __not__ able to embark within a TRANSPORT until the end of the turn.",
          "restrictions": ""
        },
        {
          "name": "Unyielding Might",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Knowing that this strategically vital site must be secure for the defence lines to hold, Space Marines stand indomitable in the face of the foe.",
          "when": "Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit that is within range of an **[gloss:objective:objective]**.",
          "effect": "Your unit has +1 **[gloss:objective-control:OC]** until the end of the turn.",
          "restrictions": ""
        },
        {
          "name": "Stand to the End",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Aware of how vital it is that the defence line holds, these warriors fight even to their last breath.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES unit (excluding MONSTER/VEHICLE units).",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "▪ Attacks that target your unit with a **[gloss:strength:S]** greater than your unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.\n▪ __Or:__ If your unit is **[gloss:sm-entrenched:entrenched]**, attacks that target your unit have -1 to **wound rolls**.",
          "restrictions": ""
        },
        {
          "name": "Establish Supremacy",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Steadfast and determined, the Imperial Fists favour methodical advances, securing and consolidating positions to establish battlefield dominance before turning their attention to the elimination of remaining foes.",
          "when": "Fight phase, when a friendly **[gloss:sm-entrenched:entrenched]** ADEPTUS ASTARTES INFANTRY unit is selected to make a **[gloss:consolidation:consolidation move]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "You can select the **[gloss:objective-consolidation:objective consolidation]** mode for that **[gloss:consolidation:consolidation move]**, regardless of that **consolidation move**’s Before Moving restrictions.\n\n**Designer’s Note:** This means your unit can move out of **[gloss:engagement-range:engagement range]** with enemy units, provided it meets the conditions of the\n\n**objective consolidation mode**.",
          "restrictions": ""
        },
        {
          "name": "Priority Strike",
          "sublabel": "Ceramite Sentinels – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Eliminating key enemy assets is crucial to stalling then reversing the foe’s momentum.",
          "when": "Your Shooting phase or the Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY/MOUNTED unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit’s attacks that target a MONSTER/VEHICLE unit, have +1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Castellum Omnivox",
          "points": 10,
          "flavor": "This unique vox‑and‑augur augmetic provides the bearer with unparalleled tactical data vital to coordinating an aggressive defence in battle.",
          "body": "ADEPTUS ASTARTES unit only. When this unit makes a **[gloss:advance:advance]/[gloss:fall-back-move:fall-back move]**, that move does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**."
        },
        {
          "name": "Spy-skull Data Link",
          "points": 10,
          "flavor": "Several artificer‑crafted and heavily shrouded servo‑skulls are tethered to this device, their linked visual feeds making the bearer nigh impossible to evade.",
          "body": "ADEPTUS ASTARTES unit only. This unit’s ranged weapons have [IGNORES COVER]."
        },
        {
          "name": "Honour Indefatigable",
          "points": 10,
          "flavor": "This rare honour badge celebrates a warrior who refuses to give up, even in the face of apparently certain death.",
          "body": "GRAVIS model only. (Once per battle, per army) At the end of a phase in which this model is **[gloss:destroyed:destroyed]**, roll one D6:\n▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed**, **[gloss:unengaged:unengaged]**, with 3 wounds remaining."
        },
        {
          "name": "Defensive Mastery",
          "points": 10,
          "flavor": "Few officers of the Chapter can match this commander’s talent for cunning defensive troop dispositions.",
          "body": "ADEPTUS ASTARTES model only. When both players have deployed their armies, you can redeploy up to three friendly ADEPTUS ASTARTES INFANTRY units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
        }
      ]
    },
    {
      "id": "medusas-wrath",
      "name": "Medusa's Wrath",
      "source": "codex",
      "chapter": "Iron Hands",
      "dp": 2,
      "forceDispositions": ["Purge the Foe"],
      "unique": "IRONSTORM",
      "rule": {
        "name": "Armoured Wrath",
        "flavor": "",
        "body": "Each time a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]** or **[gloss:selected-to-fight:selected to fight]** apply one of the following when resolving those attacks:\n▪ If that unit is within 6\" of a friendly CANNOK VAR/IRON FATHER FEIRROS unit you can:\n▪ Re-roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re-roll __one__ **[gloss:wound-roll:wound roll]**.\n▪ Re-roll __one__ **[gloss:damage-roll:damage roll]**.\n▪ Otherwise you can:\n▪ Re-roll __one__ **hit roll**.\n▪ __Or:__ Re-roll __one__ **wound roll**.\n▪ __Or:__ Re-roll __one__ **damage roll**."
      },
      "stratagems": [
        {
          "name": "Methodical Brutality",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Once a foe is marked for destruction, the Angels of Death must not relent until the target is annihilated.",
          "when": "Your Shooting phase or the Fight phase when a friendly ADEPTUS ASTARTES unit is selected to attack.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s attacks have [SUSTAINED HITS 1].",
          "restrictions": ""
        },
        {
          "name": "Spirits of Iron",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "These warriors emulate the mechanical monstrosities at whose side they fight, shrugging off wounds both physical and spiritual.",
          "when": "Any phase, when a friendly ADEPTUS ASTARTES unit suffers a **[gloss:mortal-wound:mortal wound]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit has [core:Feel No Pain 5+] against **[gloss:mortal-wound:mortal wounds]**.",
          "restrictions": ""
        },
        {
          "name": "Unbowed Conviction",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Space Marines exemplify obdurate tenacity. Even severely injured, they will never abandon their oaths.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit that is **[gloss:below-starting-strength:below starting strength]**.",
          "effect": "Until the start of your next Command phase, your unit can ignore modifiers to your unit’s:\n▪ **[gloss:ballistic-skill:BS]** and **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Hit rolls]** and **[gloss:wound-roll:Wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Vengeful Animus",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Carefully cogitated binharic prayers can focus a machine spirit’s ire into near-obsessive hatred of its slayers, ensuring that vengeance is meted out even in death.",
          "when": "Any phase, when a friendly ADEPTUS ASTARTES VEHICLE unit is **[gloss:destroyed:destroyed]**, before rolling for deadly demise.",
          "target": "That friendly ADEPTUS ASTARTES VEHICLE unit.",
          "effect": "Change any [core:Deadly Demise] rolls made for this unit to an unmodified 6.",
          "restrictions": ""
        },
        {
          "name": "Ancient Fury",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The heroes entombed within Dreadnoughts have fought across countless war zones throughout their extended existences, perfecting their martial prowess beyond mortal limits.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES DREADNOUGHT unit.",
          "effect": "Until the start of your next Command phase, your unit has:\n▪ +1” **[gloss:move-characteristic:M]**.\n▪ +1 **[gloss:toughness:T]**.\n▪ +1 **[gloss:leadership:Ld]**.\n▪ +1 **[gloss:objective-control:OC]**.\n▪ +1 to **[gloss:hit-roll:hit rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Power of the Machine Spirit",
          "sublabel": "Medusa's Wrath – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "There are many tales of machine spirits wreaking havoc on the foe, even after the crew of their vehicle are slain and critical systems are failing.",
          "when": "Your opponent’s Shooting phase, when an enemy unit that targeted a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES VEHICLE unit has shot.",
          "target": "That ADEPTUS ASTARTES VEHICLE unit.",
          "effect": "Your unit shoots using:\n▪ **[gloss:snap-shooting:Snap shooting]**.\n▪ __Or:__ If your unit is **[gloss:half-strength:at half-strength]**/**below half-strength**, **[gloss:normal-shooting:normal shooting]**.\n\nWhile doing so your unit can only target that enemy unit.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "The Flesh is Weak",
          "points": 15,
          "flavor": "The injuries of past battles have seen this warrior heavily rebuilt with ultra-durable cybernetic limbs and organs that render them extremely difficult to kill.",
          "body": "ADEPTUS ASTARTES model only. This model:\n▪ Has +1 **[gloss:toughness:T]**.\n▪ Has [core:Feel No Pain 5+]."
        },
        {
          "name": "Target Augury Web",
          "points": 30,
          "flavor": "This spearhead commander uses advanced augmetics to distribute targeting data. With these, they direct the fire of their war engine crews and rouse their machine spirits to operative superiority.",
          "body": "TECHMARINE model only.\n\nIn your movement phase, at the start or end of this unit’s move, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this unit. That VEHICLE model’s attacks have [LETHAL HITS] until the start of your next Command phase"
        },
        {
          "name": "Master of the Machine War",
          "points": 25,
          "flavor": "This commander is supremely gifted in the strategies of armoured warfare, understanding the capabilities of every war engine in the Chapter’s arsenal. Delivering precision orders, they ensure the vehicles under their command inflict the most punishing damage to the\n\nenemy even amidst complex manoeuvres.",
          "body": "ADEPTUS ASTARTES model only.\n\nIn your Movement phase, you can select one **[gloss:visible:visible]** friendly ADEPTUS ASTARTES VEHICLE unit within 6” of this model and then select the **[gloss:sm-combat-doctrine:devastator doctrine]** or **tactical doctrine**. That doctrine is active for that VEHICLE unit until the start of your next Command phase."
        },
        {
          "name": "Adept of the Omnissiah",
          "points": 25,
          "flavor": "This battle-brother is steeped in hidden technological rites. Should their armoured charges be threatened, a burst of arcane Binharic screed can rouse their machine spirits to vigilance.",
          "body": "TECHMARINE model only.\n\n(Once per battle round, per army) When an enemy unit targets a friendly ADEPTUS ASTARTES VEHICLE unit within 6” of this unit, you can use this ability. If you do, that VEHICLE unit has [core:Feel No Pain 5+] until that enemy unit has attacked."
        }
      ]
    },
    {
      "id": "shadowmark-talon",
      "name": "Shadowmark Talon",
      "source": "codex",
      "chapter": "Raven Guard",
      "dp": 2,
      "forceDispositions": ["Disruption"],
      "unique": "PHOBOS",
      "rule": {
        "name": "Shadow Tactics",
        "flavor": "The Raven Guard are renowned for their uncanny ability to move unseen, cloaking themselves in darkness as they close in upon their prey. Aethon Shaan is a true master at harnessing these abilities, withdrawing and redeploying his battle-brothers to draw the enemy out of formation.",
        "body": "Friendly ADEPTUS ASTARTES units have [core:Stealth].\n\nFriendly PHOBOS/SCOUT SQUAD units have -3\" **[gloss:detection-range:detection range]**.\n\nFriendly AETHON SHAAN units have the following ability:\n\n**Unparalleled Tactician**: (Once per battle round, per army) When you use the **Into Darkness stratagem**, that use is -1CP."
      },
      "stratagems": [
        {
          "name": "Into Darkness",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "At the opportune moment, Raven Guard infiltration units slip away from battle, only to relocate ready to strike the foe again.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "Murderous Fusillade",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "From darkness and obscuring cover, Raven Guard battle‑brothers open fire as one, striking their unaware targets with precision fire.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES INFANTRY unit that made an **[gloss:ingress-move:ingress move]** this turn is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit’s ranged attacks have:\n▪ +1**[gloss:ballistic-skill:BS]**.\n▪ +1**[gloss:armour-penetration:AP]**.",
          "restrictions": ""
        },
        {
          "name": "Lay Low the Tyrants",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "In a storm of blade thrusts and bludgeoning strikes, enemy champions and commanders are laid low, leaving their troops in leaderless disarray.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY.",
          "effect": "Your unit’s melee attacks have [PRECISION].",
          "restrictions": ""
        },
        {
          "name": "Suppressed Weapons",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The Raven Guard commonly utilise integral suppressors, flash-hiders and other technology to dampen weapon reports and conceal muzzle flare, enabling battle-brothers to fire on unsuspecting foes without giving away their positions.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES INFANTRY unit has shot.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Those attacks do not prevent your unit from being **[gloss:hidden:hidden]**.",
          "restrictions": ""
        },
        {
          "name": "Raptorial Vigilance",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "The Raven Guard are swift to exploit the movements of their foes, whether to pursue their prey and complete the kill or to make use of an opportunity to fade once more from sight.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8” of a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of:\n▪ Up to D6”.\n▪ __Or:__ If your unit is a PHOBOS/SCOUT SQUAD unit, up to 6”.",
          "restrictions": ""
        },
        {
          "name": "Feint and Thrust",
          "sublabel": "Shadowmark Talon – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Retreating from the fight, these warriors lure their enemies on before swiftly turning the tables and hurling themselves into their now overextended foe.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for your unit in addition to any other **combat doctrine**, until the start of your next Command phase.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Coronal Susurrant",
          "points": 30,
          "flavor": "This wreath of circuitry from the Dark Age of Technology forces a whispering white noise into enemy minds and broadcasts, impeding communications and interrupting the chain of command.",
          "body": "PHOBOS model only. Each enemy unit (excluding MONSTER/VEHICLE UNITS) **[gloss:engaged:engaged]** with this unit cannot be targeted by controlling player **[gloss:stratagem:stratagems]**."
        },
        {
          "name": "Blackwing Shroud",
          "points": 25,
          "flavor": "This mechanical device contains miniaturised refraction fields and electromagnetic interference projectors that distort sensory apparatus, enabling the bearer and their unit to evade detection and infiltrate key positions.",
          "body": "ADEPTUS ASTARTES INFANTRY model only. This unit has [core:Infiltrators]."
        },
        {
          "name": "Umbral Raptor",
          "points": 15,
          "flavor": "This warrior is a solitary predator whose footsteps are all but silent and whose form is one with the shadows.",
          "body": "ADEPTUS ASTARTES INFANTRY model only. This model has:\n▪ [core:Fights First].\n▪ [core:Lone Operative]."
        },
        {
          "name": "Hunter’s Instincts",
          "points": 25,
          "flavor": "Those who master the Path of Ambush guide their forces to launch surprise assaults on the enemy with the precise timing of true hunters.",
          "body": "ADEPTUS ASTARTES model only. In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**."
        }
      ]
    },
    {
      "id": "forgefathers-seekers",
      "name": "Forgefather's Seekers",
      "source": "codex",
      "chapter": "Salamanders",
      "dp": 2,
      "forceDispositions": ["Priority Assets"],
      "rule": {
        "name": "Vulkan's Quest",
        "flavor": "Tireless in his pursuit of the Primarch’s legacy, Forgefather Vulkan He’stan annihilates any who impede his quest. Favouring swift, aggressive assaults, he and his warriors close rapidly with the enemy, destroying them at close range with ruthless efficiency",
        "body": "▪ You can select the **[gloss:sm-combat-doctrine:devastator doctrine]** one additional time per battle.\n▪ Friendly ADEPTUS ASTARTES units’ ranged attacks that target a unit within 12”, have +1 **[gloss:strength:S]**.\n\nIf your army includes a VULKAN HE’STAN unit, friendly INFERNUS SQUAD units have the following:\n▪ When this unit is selected to make an **[gloss:advance:advance]/[gloss:fall-back-move:fall-back move]**, that **advance/fall-back move** does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**.\n▪ When this unit **[gloss:action:starts an action]**, that **action** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]**.\n\n**Restrictions:** Your army can include SALAMANDERS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Crucible of Battle",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Only where the enemy can be faced eye to eye can a Space Marine be truly tested.",
          "when": "Your Shooting phase or the Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is **[gloss:selected-to-attack:selected to attack]** an enemy unit within 6”.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit’s attacks can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1.",
          "restrictions": ""
        },
        {
          "name": "Immolation Protocols",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Salvo after salvo of burning promethium unleashed in synchronised waves will leave almost any foe as smouldering ash.",
          "when": "Your Shooting phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY.",
          "effect": "Your unit’s ranged [TORRENT] attacks have +1**[gloss:armour-penetration:AP]**.",
          "restrictions": ""
        },
        {
          "name": "Burning Vengeance",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "To open fire on warriors of the Salamanders is merely to invite one’s own swift destruction.",
          "when": "Your opponent’s Shooting phase, when an enemy unit has shot a friendly ADEPTUS ASTARTES TRANSPORT unit.",
          "target": "One friendly ADEPTUS ASTARTES unit embarked within that ADEPTUS ASTARTES TRANSPORT unit.",
          "effect": "Your ADEPTUS ASTARTES unit can:\n▪ Make a **[gloss:disembark:disembark move]**.\n▪ Shoot using **[gloss:normal-shooting:normal shooting]**, but when doing so your unit can only target that enemy unit.",
          "restrictions": ""
        },
        {
          "name": "Blazing Earth",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "When faced with an onrushing horde, the Forgefather’s warriors set fire to the earth beneath their feet, impeding their advance and throwing them into confusion.",
          "when": "Start of your opponent’s Charge phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES unit equipped with one or more TORRENT/MELTA weapons.",
          "effect": "Select one **[gloss:visible:visible]** enemy unit within 12\" of your unit. That enemy unit has ‑1 to **[gloss:charge-roll:charge rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Forged in Fire",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The Salamanders are masters of the flamer, wielding such weapons with supreme precision and utilising them even in the press of melee combat.",
          "when": "Your Shooting phase, when a friendly **[gloss:engaged:engaged]** ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s TORRENT weapons:\n▪ Do not have [BLAST].\n▪ Have [CLOSE-QUARTERS].\n▪ Have +1 **[gloss:attack-dice:A]**.",
          "restrictions": ""
        },
        {
          "name": "Wrath and Ruin",
          "sublabel": "Forgefather's Seekers – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Having drawn their enemies in, Space Marine battle-brothers fall back and open fire at point-blank range before thundering forward to put any survivors to death.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "The **[gloss:sm-combat-doctrine:assault doctrine]** __or__ **tactical doctrine** is active for your unit, until the start of your next Command phase.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "War Tempered Artifice",
          "points": 25,
          "flavor": "Having laboured long in the Chapter’s forges, this warrior smith has crafted his personal armaments. Each weapon is a masterwork tool of death‑dealing, wrought with care and strength, and embellished with the icons of their maker’s brotherhood.",
          "body": "ADEPTUS ASTARTES model only. This model’s melee attacks have:\n▪ +1 **[gloss:strength:S]**.\n▪ +1 **[gloss:damage-roll:D]**."
        },
        {
          "name": "Adamantine Mantle",
          "points": 20,
          "flavor": "This flowing cloak or finely wrought tabard is laced through with threads of braided adamantine. When combined with armour and energy fields, it has been shown time and again that these symbols of office are proof against even the very strongest attacks.",
          "body": "ADEPTUS ASTARTES model only. Attacks allocated to this model have -1**[gloss:damage-roll:D]**."
        },
        {
          "name": "Forged in Battle",
          "points": 25,
          "flavor": "To this Angel of Death, war is the anvil upon which their strength is wrought. Every battle is seen as a test in which they and their battle‑brothers can prove themselves, and the superior craftsmanship of their weapons and armour.",
          "body": "ADEPTUS ASTARTES model only. This unit can ignore modifiers to:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Hit rolls]**."
        },
        {
          "name": "Immolator",
          "points": 20,
          "flavor": "Steeped in the Promethean Cult, this battle‑brother wields the flamer with unparalleled mastery, turning the battlefield into a burning pyre for the corpses of his foes.",
          "body": "ADEPTUS ASTARTES model only. This unit’s [TORRENT] weapons have +1**[gloss:attack-dice:A]**."
        }
      ]
    },
    {
      "id": "spearpoint-task-force",
      "name": "Spearpoint Task Force",
      "source": "codex",
      "chapter": "White Scars",
      "dp": 2,
      "forceDispositions": ["Reconnaissance"],
      "rule": {
        "name": "Storm-swift Onslaught",
        "flavor": "The White Scars are masters of high‑speed tactics and hit‑and‑run warfare. They do battle on the move and from the saddle, outwitting their enemies with breakneck manoeuvres and melting away one moment only to crash home with bone‑crushing force the next.",
        "body": "▪ You can select the **[gloss:sm-combat-doctrine:assault doctrine]** __or__ **tactical doctrine** one additional time per battle.\n▪ Friendly ADEPTUS ASTARTES MOUNTED/SPEEDER units have +1 to **[gloss:advance-roll:advance rolls]**.\n\nFriendly SUBODEN KHAN units have the following ability:\n\n**Wrath of the First Khan:** At the end of the Fight phase, if this unit was **[gloss:eligible-to-fight:eligible to fight]** this phase, you can use this ability. If you do:\n▪ If this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]**.\n▪ __Or:__ If this unit is **[gloss:engaged:engaged]**, this unit can make a **[gloss:fall-back-move:fall-back move]**.\n\n**Restrictions:** Your army can include WHITE SCARS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Withdraw and Regroup",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "The riders and pilots sweep away as swiftly as they arrive, regrouping in preparation for their next assault.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "Hunter's Instincts",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "The White Scars read the ebb and flow of battle with the hungry cunning of raptorial predators, reacting to the enemy’s movements with exceptional rapidity.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8” of a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED/SPEEDER unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED/SPEEDER unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3”.",
          "restrictions": ""
        },
        {
          "name": "Spear Thrust and Sabre Swing",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Some foes can be ended with a single charge. Others require sustained savagery to fell. The White Scars are adept at both methods of fighting.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit’s melee attacks:\n▪ Have [LETHAL HITS].\n▪ __Or:__ Have [LANCE].\n▪ __Or:__ If your unit has MOUNTED, have [LETHAL HITS] and [LANCE].",
          "restrictions": ""
        },
        {
          "name": "Flawless Riders",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Skilled Space Marine riders can guide their steeds through even the densest and most treacherous terrain to strike their foes from the position they least expect.",
          "when": "Your Movement/Charge phase, when a friendly ADEPTUS ASTARTES MOUNTED unit is **[gloss:selected-to-move:selected to move]** or **[gloss:declare-charge:declares a charge]**.",
          "target": "That ADEPTUS ASTARTES MOUNTED unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        },
        {
          "name": "Evasive Manoeuvers",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Battle‑brothers of the White Scars Chapter are born and raised in the saddle. Expert pilots and riders all, they weave through incoming fire with instinctive skill.",
          "when": "Your opponent’s Shooting phase, when an enemy unit targets a friendly ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "target": "That ADEPTUS ASTARTES MOUNTED/SPEEDER unit.",
          "effect": "Ranged attacks that target your unit have -1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Mobile Lethality",
          "sublabel": "Spearpoint Task Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The White Scars fight their wars at a furious tempo, and their warriors are adept at fire‑and‑manoeuvre strategies.",
          "when": "Your Movement phase, when a friendly ADEPTUS ASTARTES unit is selected to make an **[gloss:advance:advance]/[gloss:fall-back-move:fall-back move]**.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "▪ That **fall-back** move does not prevent your unit from being **[gloss:eligible-to-shoot:eligible to shoot]**.\n▪ Your unit’s ranged attacks have [ASSAULT].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Spearpoint Paragon",
          "points": 25,
          "flavor": "Decades of service within the White Scars First Company have helped this superlative warrior master the violent arts of high‑speed combat.",
          "body": "ADEPTUS ASTARTES model only. This model’s melee attacks have:\n▪ +1 **[gloss:strength:S]** and **[gloss:armour-penetration:AP]**.\n▪ __Or:__ If this unit made a **[gloss:charge-move:charge move]** this turn, +2 **S** and **AP**."
        },
        {
          "name": "Stormseer's Wisdom",
          "points": 15,
          "flavor": "The Chapter’s Librarians have made this champion privy to omens of great threats in future wars. Armed with this knowledge, they lead their warriors to war with a boldness that some mistake for recklessness.",
          "body": "ADEPTUS ASTARTES model only. This unit can re-roll **[gloss:advance-roll:advance rolls]**."
        },
        {
          "name": "Chogorian Huntmaster (Upgrade)",
          "points": 20,
          "flavor": "This mounted huntsman knows well the importance of manoeuvre, outflanking the enemy and ambushing unsuspecting foes from the flanks and rear, the better to land the killing blow.",
          "body": "ADEPTUS ASTARTES MOUNTED/SPEEDER unit only. When this unit is selected to make an **[gloss:ingress-move:ingress move]**, treat the current battle round number as being one higher than it actually is."
        },
        {
          "name": "Hunter’s Eye",
          "points": 25,
          "flavor": "This augmetic eye enhances the user’s visual spectrum, enabling them to pinpoint heat signatures and cogitate appropriate firing solutions.",
          "body": "ADEPTUS ASTARTES model only. This unit’s ranged attacks:\n▪ Have [IGNORES COVER].\n▪ Have [SUSTAINED HITS 1]."
        }
      ]
    }
  ],
  datasheets: [],
}

export const spaceMarines = { en, ru: en }
