// Death Guard — datasheets. Unit roster and points from src/data/mfm/death-guard.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "beasts-of-nurgle",
    "name": "Beasts of Nurgle",
    "points": [
      {
        "models": 1,
        "points": 70
      },
      {
        "models": 2,
        "points": 140
      }
    ],
    "flavor": "Filled with dim-witted ebullience at odds with their diseased and nightmarish forms, Beasts of Nurgle heave themselves into battle like eager hounds. They are drawn instinctively to mortal playthings, whose desperate cries and frantic flight they mistake for participation, at least until their luckless new friends have twitched their last.",
    "profiles": [
      {
        "name": "Beasts of Nurgle",
        "m": "6\"",
        "t": "9",
        "sv": "6+",
        "w": "7",
        "ld": "7+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Putrid appendages",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike, Scouts 6\"",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Grotesque Regeneration",
        "text": "At the end of each phase, if a Beasts of Nurgle model in this unit has lost any wounds but is not destroyed, that model regains all of its lost wounds."
      }
    ],
    "composition": [
      "1-2 Beasts of Nurgle"
    ],
    "loadout": "**Every model is equipped with:** putrid appendages.",
    "keywords": [
      "Beasts of Nurgle",
      "Summoned",
      "Daemon",
      "Chaos",
      "Beast",
      "Nurgle"
    ],
    "factionKeywords": [
      "",
      "Plague Legions"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "biologus-putrifier",
    "name": "Biologus Putrifier",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Biologus Putrifiers take obscene delight in developing myriad plagues to spread in battle. They carry all manner of blight grenades, bloated with the latest strains of blossoming contagions. With their injector pistols, Biologus Putrifiers implant killing maladies into the enemy before extracting samples of their ruined flesh.",
    "profiles": [
      {
        "name": "Biologus Putrifier",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Hyper blight grenades",
        "tags": [
          "ASSAULT",
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Injector pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL",
          "PRECISION"
        ],
        "range": "3\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Plague knives",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Foul Infusion",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability. In addition, each time a model in that unit makes an attack, a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6."
      },
      {
        "name": "Extraction of Fresh Disease",
        "text": "The first time this model’s unit destroys an enemy unit as the result of a melee attack, until the end of the battle, add 6 to the Objective Control characteristic of this model."
      }
    ],
    "composition": [
      "1 Biologus Putrifier"
    ],
    "loadout": "**This model is equipped with:** hyper blight grenades; injector pistol; plague knives.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Chaos",
      "Infantry",
      "Character",
      "Grenades",
      "Nurgle",
      "Biologus Putrifier"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "blightlord-terminators",
    "name": "Blightlord Terminators",
    "points": [
      {
        "models": 3,
        "points": 115
      },
      {
        "models": 5,
        "points": 180
      },
      {
        "models": 10,
        "points": 360
      }
    ],
    "flavor": "Blightlord Terminators are incredibly tough, thanks to their Cataphractii armour and Nurgle’s gifts, and they are experts in breach assaults, boarding actions and sudden teleport strikes. Due to long periods spent aboard pox-ridden warships, they are saturated with foulness, which pours off them to rot flesh and corrode metal.",
    "profiles": [
      {
        "name": "Blightlord Terminators",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Blight launcher",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plague spewer",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Reaper autocannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bubotic blade",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flail of corruption",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Blistering Fusillade",
        "text": "If this unit has a Starting Strength of 5 or more, or if a Character is leading this unit, then each time a model in this unit makes a ranged attack that targets an Afflicted unit, improve the Strength and Armour Penetration characteristics of that attack by 1."
      }
    ],
    "composition": [
      "1 Blightlord Champion",
      "2-9 Blightlord Terminators"
    ],
    "loadout": "**Every model is equipped with:** combi-bolter; bubotic blade.",
    "options": [
      "For every 5 models in this unit, up to 3 models' combi-bolters can each be replaced with 1 combi-weapon.",
      "For every 5 models in this unit, 1 Blightlord Terminator’s combi-bolter and bubotic blade can be replaced with 1 flail of corruption.",
      "For every 5 models in this unit, 1 Blightlord Terminator’s combi-bolter can be replaced with 1 blight launcher.",
      "For every 5 models in this unit, 1 Blightlord Terminator's combi-bolter can be replaced with 1 reaper autocannon.",
      "For every 5 models in this unit, 1 Blightlord Terminator's combi-bolter can be replaced with 1 plague spewer.",
      "If this unit contains only 3 models, 1 Blightlord Terminator’s combi-bolter and bubotic blade can be replaced with 1 plague spewer and 1 close combat weapon."
    ],
    "keywords": [
      "Infantry",
      "Chaos",
      "Blightlord Terminators",
      "Terminator",
      "Nurgle"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaos-land-raider",
    "name": "Chaos Land Raider",
    "points": [
      {
        "models": 1,
        "points": 220,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 240,
        "note": "3rd+"
      }
    ],
    "flavor": "Land Raiders are destructive and versatile vehicles equipped with a fearsome arsenal of weapons and a large transport capacity. Drenched in thick, stinking slime, Death Guard Land Raiders are host to various scratching and biting parasites and sprout throbbing growths emitting fogs of foetid gas.",
    "profiles": [
      {
        "name": "Chaos Land Raider",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Soulshatter lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Twin heavy bolter",
        "tags": [
          "LETHAL HITS",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Chaos Land Raider"
    ],
    "loadout": "**This model is equipped with:** 2 soulshatter lascannons; twin heavy bolter; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 havoc launcher."
    ],
    "transport": "This model has a transport capacity of 14 Death Guard Infantry models. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Vehicle",
      "Chaos",
      "Smoke",
      "Nurgle",
      "Land Raider",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-predator-annihilator",
    "name": "Chaos Predator Annihilator",
    "points": [
      {
        "models": 1,
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "The Predator Annihilator is designed for hunting enemy battle tanks, monstrous beasts and other high-value targets. The Death Guard highly values these war engines, for they provide much-needed fire support for their infantry assaults. Bloated with contagion and crewed by mutant abominations, these tainted war engines spread Nurgle’s gifts with every volley.",
    "profiles": [
      {
        "name": "Chaos Predator Annihilator",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "LETHAL HITS",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Predator twin lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Metalophagic Infection",
        "text": "In your Shooting phase, after this model has shot, select one enemy MONSTER or VEHICLE unit hit by one or more of those attacks. Roll one D6, adding 1 to the result if that unit is Afflicted; on a 5+, that unit suffers D3 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Chaos Predator Annihilator"
    ],
    "loadout": "**This model is equipped with:** Predator twin lascannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 lascannons\n▪ 2 heavy bolters",
      "This model can be equipped with one of the following:\n▪ 1 combi-weapon\n▪ 1 combi-bolter",
      "This model can be equipped with 1 havoc launcher."
    ],
    "keywords": [
      "Predator Annihilator",
      "Vehicle",
      "Smoke",
      "Chaos",
      "Nurgle",
      "Frame"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-predator-destructor",
    "name": "Chaos Predator Destructor",
    "points": [
      {
        "models": 1,
        "points": 145,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 155,
        "note": "3rd+"
      }
    ],
    "flavor": "These pustule-covered battle tanks provide mobile armoured support for advancing Death Guard infantry. Maintaining a punishing rate of fire, whether lurking hull-down or ploughing in alongside the vectorium’s warriors, they riddle the enemy with diseased munitions that leave those not immediately slain weakened and withering before the might of Mortarion’s sons.",
    "profiles": [
      {
        "name": "Chaos Predator Destructor",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "LETHAL HITS",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Predator autocannon",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Hail of Corrosive Disease",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks. Until the end of the phase, each time a friendly Death Guard unit makes a ranged attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per phase."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Chaos Predator Destructor"
    ],
    "loadout": "**This model is equipped with:** predator autocannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 lascannons\n▪ 2 heavy bolters",
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 havoc launcher."
    ],
    "keywords": [
      "Predator Destructor",
      "Nurgle",
      "Chaos",
      "Smoke",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-rhino",
    "name": "Chaos Rhino",
    "points": [
      {
        "models": 1,
        "points": 75,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 85,
        "note": "4th+"
      }
    ],
    "flavor": "Clad in a cocoon of slime-smeared armour plating, Death Guard Rhinos are ubiquitous and versatile armoured transports. They can move Death Guard squads rapidly across the battlefield in their festering holds, taking them to new battlefronts, bearing them through hostile terrain or supporting armoured offensives.",
    "profiles": [
      {
        "name": "Chaos Rhino",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 2",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Chaos Rhino"
    ],
    "loadout": "**This model is equipped with:** combi-bolter; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 additional combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 havoc launcher or can replace 1 combi-bolter with 1 havoc launcher."
    ],
    "transport": "This model has a transport capacity of 12 Death Guard Infantry models. It cannot transport Terminator models.",
    "keywords": [
      "Nurgle",
      "Chaos",
      "Smoke",
      "Dedicated Transport",
      "Rhino",
      "Vehicle",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-spawn",
    "name": "Chaos Spawn",
    "points": [
      {
        "models": 2,
        "points": 80
      }
    ],
    "flavor": "Many of Nurgle’s gifts are metaphysical maladies, parasitic infestations or physical mutations. Some champions become so overburdened by these distorting changes that they degenerate into howling and mindless Chaos Spawn. Their putrefying bodies in constant flux, their sanity shattered by the horror of their fate, they now live only to rend, gnaw and ruin.",
    "profiles": [
      {
        "name": "Chaos Spawn",
        "m": "8\"",
        "t": "7",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Hideous mutations",
        "tags": [],
        "a": "D6+2",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 5+, Scouts 6\"",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Lethal Ichor",
        "text": "Each time a melee attack is allocated to a model in this unit, after the attacking unit has finished making its attacks, roll one D6 (to a maximum of six D6 per attacking unit): for each 4+, the attacking unit suffers 1 mortal wound."
      }
    ],
    "composition": [
      "2 Chaos Spawn"
    ],
    "loadout": "**Every model is equipped with:** hideous mutations.",
    "keywords": [
      "Beast",
      "Chaos",
      "Nurgle",
      "Spawn"
        ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "daemon-prince-of-nurgle",
    "name": "Daemon Prince of Nurgle",
    "points": [
      {
        "models": 1,
        "points": 195
      }
    ],
    "flavor": "Daemonhood is the ultimate goal for a great many Chaos Space Marines. Those Nurgle worshippers who attain this dark apotheosis are lumbering monstrosities with formidable resilience, corroded armour and bloated flesh. They command sepsis cohorts and vectoriums, having retained all their tactical acumen and martial skill.",
    "profiles": [
      {
        "name": "Daemon Prince of Nurgle",
        "m": "8\"",
        "t": "12",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Hellforged weapons – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Death Guard Defenders",
        "text": "While this model is within 3\" of one or more friendly Death Guard Infantry units, this model has the Lone Operative ability."
      },
      {
        "name": "Fevered Strategist",
        "text": "Once per battle round, one model from your army with this ability can use it when a friendly Death Guard unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Miasma of Pestilence (Aura)",
        "text": "While a friendly Death Guard unit is within 6\" of this model, each time a ranged attack targets that unit, models in that unit have the Benefit of Cover against that attack."
      }
    ],
    "composition": [
      "1 Death Guard Daemon Prince"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "keywords": [
      "Chaos",
      "Nurgle",
      "Daemon",
      "Character",
      "Daemon Prince",
      "Monster"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "daemon-prince-of-nurgle-with-wings",
    "name": "Daemon Prince of Nurgle with Wings",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "The wings that sprout from the backs of chosen Death Guard may resemble the buzzing appendages of bloated flies or take a pocked and diseased chiropteran form. Regardless of their shape, they bear the Daemon Prince aloft, allowing them to descend upon their luckless foes from above quickly and spread fearsome maladies over the battlefield.",
    "profiles": [
      {
        "name": "Daemon Prince of Nurgle with Wings",
        "m": "12\"",
        "t": "11",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Hellforged weapons – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Horrifying Visage",
        "text": "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it. That unit must take a Battle-shock test, subtracting 1 from that test."
      },
      {
        "name": "Enfeebling Miasma (Aura)",
        "text": "While an enemy unit (excluding MONSTERS and VEHICLES) is within 6\" of this model, each time that unit is selected to Fall Back, models in that enemy unit must take Desperate Escape tests. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those Desperate Escape tests."
      }
    ],
    "composition": [
      "1 Daemon Prince of Nurgle with Wings"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "keywords": [
      "Daemon Prince with Wings",
      "Monster",
      "Daemon",
      "Nurgle",
      "Character",
      "Chaos",
      "Fly"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "60mm"
  },
  {
    "id": "deathshroud-terminators",
    "name": "Deathshroud Terminators",
    "points": [
      {
        "models": 3,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 305,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 170,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 315,
        "note": "3rd+"
      }
    ],
    "flavor": "Deathshroud Terminators are swollen with the rotten powers of their diseased patron. With every swing of their giant scythes, they decapitate and disembowel their foes, their speed belied by their bloated mass. They fight in ominous silence, embodying the inevitable onset of their enemies’ death and the inescapable judgement of Mortarion himself.",
    "profiles": [
      {
        "name": "Deathshroud Terminators",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Plaguespurt gauntlet",
        "tags": [
          "ANTI-INFANTRY 4+",
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Manreaper – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Manreaper – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "8",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Silent Bodyguard",
        "text": "While a Character model is leading this unit, that CHARACTER model has the Feel No Pain 4+ ability."
      },
      {
        "name": "Death Approaches",
        "text": "In your movement phase, each time this unit is set up on the battlefield using the Deep Strike ability, it can be set up anywhere on the battlefield that is more than 6\" horizontally away from all Afflicted enemy units, and more than 8\" horizontally away from all other enemy units."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Icon of Despair (Aura)",
        "text": "While an enemy unit is within 6\" of the bearer, worsen the Leadership characteristic of models in that unit by 1."
      }
    ],
    "composition": [
      "1 Deathshroud Champion",
      "2-5 Deathshroud Terminators"
    ],
    "loadout": "**Every model is equipped with:** plaguespurt gauntlet; manreaper.",
    "options": [
      "The Deathshroud Champion can be equipped with 1 additional plaguespurt gauntlet.",
      "The Deathshroud Champion can be equipped with 1 icon of despair."
    ],
    "keywords": [
      "Deathshroud Terminators",
      "Terminator",
      "Nurgle",
      "Chaos",
      "Infantry"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "40mm"
  },
  {
    "id": "defiler",
    "name": "Defiler",
    "points": [
      {
        "models": 1,
        "points": 300,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 350,
        "note": "2nd+"
      }
    ],
    "flavor": "Huge Daemon Engines dripping with corruption, the Defilers used by the Death Guard are horrifically powerful whether bombarding the foe from range with grotesquely diseased projectiles or tearing them apart at close quarters with piston-driven claws of rusted metal etched with cursed runes of corrosion.",
    "profiles": [
      {
        "name": "Defiler",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "5",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Ectoplasma destructor",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Excruciator cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hades battle cannon",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Hades lascannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Heavy baleflamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy missile launcher – krak",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Heavy missile launcher – frag",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy reaper autocannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "LETHAL HITS",
          "SUSTAINED HITS 1"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Magma cutters",
        "tags": [
          "LETHAL HITS",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Electroscourge",
        "tags": [
          "EXTRA ATTACKS",
          "SUSTAINED HITS 2"
        ],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Shearing claws – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "16",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Shearing claws – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "10",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Scuttling Walker",
        "text": "Each time this unit makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed."
      },
      {
        "name": "Barrage of Filth",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that unit cannot have the Benefit of Cover."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Defiler"
    ],
    "loadout": "**This model is equipped with:** 1 Hades battle cannon; 2 excruciator cannons; 1 heavy missile launcher; 1 heavy baleflamer; 1 shearing claws",
    "options": [
      "This model’s Hades battle cannon can be replaced with 1 ectoplasma destructor.",
      "This model’s excruciator cannons can be replaced with 2 magma cutters",
      "This model’s heavy baleflamer can be replaced with one of the following:\n▪ 1 Hades lascannon\n▪ 1 heavy reaper autocannon\n▪ 1 electroscourge (a model cannot be equipped with more than one electroscourge)",
      "This model’s heavy missile launcher can be replaced with one of the following:\n▪ 1 Hades lascannon\n▪ 1 heavy reaper autocannon\n▪ 1 electroscourge (a model cannot be equipped with more than one electroscourge)"
    ],
    "keywords": [
      "Vehicle",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Walker",
      "Defiler"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "160mm"
  },
  {
    "id": "foetid-bloat-drone",
    "name": "Foetid Bloat-drone",
    "points": [
      {
        "models": 1,
        "points": 100,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 110,
        "note": "3rd+"
      }
    ],
    "flavor": "Foetid Bloat-drones are Daemon Engines that skim across the battlefield on clattering turbines. Adept at providing point support wherever needed, some mount grisly fleshmowers that allow them to charge the enemy lines in a blizzard of mangled flesh. Others are fitted with plaguespitters, sucking up battlefield filth before spewing it in diseased gouts across the foe.",
    "profiles": [
      {
        "name": "Foetid Bloat-drone",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Plaguespitter",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Fleshmower",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "10",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Plague probe",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Hovering Death",
        "text": "This model is eligible to shoot and declare a charge in a turn in which it Fell Back."
      }
    ],
    "composition": [
      "1 Foetid Bloat-drone"
    ],
    "loadout": "**This model is equipped with:** fleshmower; plague probe.",
    "options": [
      "This model’s fleshmower can be replaced with 2 plaguespitters."
    ],
    "keywords": [
      "Fly",
      "Chaos",
      "Vehicle",
      "Daemon",
      "Nurgle",
      "Foetid Bloat-drone"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "60mm"
  },
  {
    "id": "foetid-bloat-drone-with-heavy-blight-launcher",
    "name": "Foetid Bloat-drone with Heavy Blight Launcher",
    "points": [
      {
        "models": 1,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 135,
        "note": "3rd+"
      }
    ],
    "flavor": "Some Foetid Bloat-drones carry heavy blight launchers and the bulky ammo hoppers required to feed them. Thrumming ponderously into firing positions, these airborne monsters bombard the enemy with volleys of explosive shells. Each detonation unleashes swift-spreading blights that chew through flesh, rust metal and even corrode souls.",
    "profiles": [
      {
        "name": "Foetid Bloat-drone",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy blight launcher",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Plague probe",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Explosive Blight",
        "text": "In your Shooting phase, each time this model makes an attack that destroys an enemy unit, before removing the last model in that unit from play, roll a D6, adding 1 to the result if that unit is Afflicted: on a 5+, each enemy unit within 6\" of that model is Afflicted until the start of your next turn."
      }
    ],
    "composition": [
      "1 Foetid Bloat-drone"
    ],
    "loadout": "**This model is equipped with:** heavy blight launcher; plague probe.",
    "keywords": [
      "Vehicle",
      "Nurgle",
      "Chaos",
      "Fly",
      "Foetid Bloat-drone with Heavy Blight Launcher",
      "Daemon"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "60mm"
  },
  {
    "id": "foul-blightspawn",
    "name": "Foul Blightspawn",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Embedded into a Foul Blightspawn’s body is a malignant churn. As he cranks its rusted handle, he mixes a foul concoction of bubbling diseases and pollutants. Once satisfied his burbling blend of choking stew is ready, he levels his plague sprayer at the foe. Out his mixture surges like projectile vomit, melting whatever it touches.",
    "profiles": [
      {
        "name": "Foul Blightspawn",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Plague sprayer",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Blinding Spray",
        "text": "In the Fight phase, you can select one model from your army with this ability to use this ability. If you do, until the end of the phase, that model’s unit has the Fights First ability. Each model can only be selected for this ability once per battle."
      },
      {
        "name": "Putrefying Stink",
        "text": "Enemy models cannot start or end an Advance move within 9\" of this model."
      }
    ],
    "composition": [
      "1 Foul Blightspawn"
    ],
    "loadout": "**This model is equipped with:** plague sprayer; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Chaos",
      "Grenades",
      "Character",
      "Infantry",
      "Nurgle",
      "Foul Blightspawn"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "40mm"
  },
  {
    "id": "great-unclean-one",
    "name": "Great Unclean One",
    "points": [
      {
        "models": 1,
        "points": 265,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "These greater daemons possess the same boundless energy and drive to corrupt as a swift-spreading virus. Their booming voices roll across the battlefield, their cruel jollity and the perverse pride they take in their underlings’ achievements horribly at odds with the misery and disease they spread.",
    "profiles": [
      {
        "name": "Great Unclean One",
        "m": "7\"",
        "t": "12",
        "sv": "5+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Plague flail",
        "tags": [],
        "range": "6\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Putrid vomit",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bileblade",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Bilesword – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Bilesword – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "12",
        "ws": "2+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Doomsday bell",
        "tags": [
          "LETHAL HITS",
          "REVERBERATING SUMMONS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Daemon Lord of Nurgle (Aura)",
        "text": "While a friendly Plague Legions unit is within 6\" of this model, add 1 to the Toughness characteristic of models in that unit."
      },
      {
        "name": "Nurgle’s Rot (Psychic)",
        "text": "At the end of your Movement phase, you can select one enemy unit within 12\" of this model. Until the start of your next Movement phase, that unit is rotted. While a unit is rotted, subtract 1 from the Toughness characteristic of models in that unit."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Great Unclean One"
    ],
    "loadout": "**This model is equipped with:** plague flail; putrid vomit; bilesword.",
    "options": [
      "This model’s plague flail can be replaced with 1 bileblade.",
      "This model’s bilesword can be replaced with 1 doomsday bell."
    ],
    "keywords": [
      "Psyker",
      "Monster",
      "Character",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Summoned",
      "Great Unclean One"
    ],
    "factionKeywords": [
      "Plague Legions",
      ""
    ],
    "baseSize": "130mm"
  },
  {
    "id": "helbrute",
    "name": "Helbrute",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "The most terribly wounded of Nurgle’s champions are interred within the armoured sarcophagus of a Helbrute. Plague Surgeons take deep pleasure in sealing rivals and superiors inside these madness-inducing and agony-inflicting shells. In battle, they are living, enraged, battering rams, flushed with the blessings of Nurgle.",
    "profiles": [
      {
        "name": "Helbrute",
        "m": "7\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2",
          "LETHAL HITS"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma cannon",
        "tags": [
          "BLAST",
          "HAZARDOUS",
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Twin autocannon",
        "tags": [
          "TWIN-LINKED",
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin heavy bolter",
        "tags": [
          "LETHAL HITS",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Helbrute fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Helbrute hammer",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Power scourge",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Diseased Malice",
        "text": "Each time this model makes an attack that targets an Afflicted unit, add 1 to the Wound roll."
      },
      {
        "name": "Froth-spattered Frenzy",
        "text": "If this model is equipped with two melee weapons in addition to its close combat weapon, add 2 to the Attacks characteristic of those two weapons."
      }
    ],
    "composition": [
      "1 Helbrute"
    ],
    "loadout": "**This model is equipped with:** multi-melta; Helbrute fist; close combat weapon.",
    "options": [
      "This model’s multi-melta can be replaced with one of the following:\n▪ 1 plasma cannon\n▪ 1 twin autocannon\n▪ 1 twin lascannon\n▪ 1 twin heavy bolter\n▪ 1 additional Helbrute fist",
      "1 of this model’s Helbrute fists can be replaced with 1 missile launcher",
      "1 of this model’s Helbrute fists can be replaced with one of the following:\n▪ 1 Helbrute hammer\n▪ 1 power scourge",
      "For each Helbrute fist this model is equipped with, it can be equipped with one of the following:\n▪ 1 combi-bolter*\n▪ 1 heavy flamer*\n* That Helbrute fist cannot then be replaced.",
      "* That Helbrute fist cannot then be replaced."
    ],
    "keywords": [
      "Walker",
      "Vehicle",
      "Nurgle",
      "Helbrute",
      "Chaos"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "icon-bearer",
    "name": "Icon Bearer",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "The icons borne by the Death Guard are rusted and corrupted dedications to Nurgle, forged into the shapes of the Grandfather’s symbols or those of the Legion itself. So wreathed in disease are these banners that nearby enemies are rapidly afflicted, dying agonising deaths as their convulsing bodies are reduced to slop.",
    "profiles": [
      {
        "name": "Icon Bearer",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Plague knife",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Unclean Icon",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Blessed Icon of Disease",
        "text": "Once per battle, at the start of any phase, you can select one friendly Death Guard unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "composition": [
      "1 Icon Bearer"
    ],
    "loadout": "**This model is equipped with:** boltgun; plague knife.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Chaos",
      "Grenades",
      "Character",
      "Infantry",
      "Nurgle",
      "Icon Bearer"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "32mm"
  },
  {
    "id": "lord-of-contagion",
    "name": "Lord of Contagion",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "Lords of Contagion are the most aggressive of Nurgle’s champions. Their tactics are as brutal and blunt as they are effective. Striding unharmed through torrents of enemy fire in their nigh-impregnable Cataphractii plate, they sweep aside foes in violent bursts of gore with their snarl-toothed and corroded blades.",
    "profiles": [
      {
        "name": "Lord of Contagion",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Manreaper – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Manreaper – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Vector of Disease",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] and [LANCE] abilities."
      },
      {
        "name": "Unholy Resilience",
        "text": "The first time a model with this ability is destroyed in a battle round, roll one D6 at the end of the phase. On a 2+, set that model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining. Each model can only be set up in this way once per battle."
      }
    ],
    "composition": [
      "1 Lord of Contagion"
    ],
    "loadout": "**This model is equipped with:** manreaper.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathshroud Terminators",
        "Blightlord Terminators"
      ]
    },
    "keywords": [
      "Infantry",
      "Nurgle",
      "Lord of Contagion",
      "Terminator",
      "Chaos",
      "Grenades",
      "Character"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lord-of-poxes",
    "name": "Lord of Poxes",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "The Lord of Poxes lumbers into battle amidst a churning cloud of spore-thick plague smog. These foul fumes wheeze from the miasmic turbine borne upon this monstrous champion’s shoulders and cannot only veil advancing Death Guard warriors from harm but also send foes crumpling to the ground as they claw at swollen throats and drown on their dissolving lungs.",
    "profiles": [
      {
        "name": "Lord of Poxes",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Plasma pistol – standard",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma pistol – supercharge",
        "tags": [
          "HAZARDOUS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Great plague blade",
        "tags": [
          "DEVASTATING WOUNDS",
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Gift of Poxes",
        "text": "Add 3\" to the range of this model’s Contagion Range"
      },
      {
        "name": "Shroud of Disease",
        "text": "While this model is leading a unit, that unit cannot be targeted by ranged attacks unless the attacking model is within 18\"."
      }
    ],
    "composition": [
      "1 Lord of Poxes"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; great plague blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ]
    },
    "keywords": [
      "Infantry",
      "Nurgle",
      "Lord of Poxes",
      "Character",
      "Grenades",
      "Chaos"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lord-of-virulence",
    "name": "Lord of Virulence",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Lords of Virulence are powerful commanders whose grim oversight and plagueridden gifts bolster the marksmanship of nearby Death Guard forces. Coupled with the foulness that gushes from the barrels of their twin plague spewers and the vicious might of their slime-dripping power fists, they are formidable warriors indeed.",
    "profiles": [
      {
        "name": "Lord of Virulence",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Twin plague spewer",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power fist",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Virulent Aura",
        "text": "While this model is leading a unit, each time a model in that unit makes a ranged attack, you can re-roll the Wound roll."
      },
      {
        "name": "Blight Bombardment",
        "text": "At the start of your Shooting phase, select one enemy unit within 30\" of and visible to this model. Until the end of the phase, each time a friendly Death Guard model makes a ranged attack that targets that unit, re-roll a Hit roll of 1 (if that attack is made with a Blast weapon, you can re-roll the Hit roll instead)."
      }
    ],
    "composition": [
      "1 Lord of Virulence"
    ],
    "loadout": "**This model is equipped with:** twin plague spewer; power fist.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathshroud Terminators",
        "Blightlord Terminators"
      ]
    },
    "keywords": [
      "Lord of Virulence",
      "Terminator",
      "Nurgle",
      "Chaos",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "50mm"
  },
  {
    "id": "malignant-plaguecaster",
    "name": "Malignant Plaguecaster",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Every foetid fibre of a Malignant Plaguecaster’s body is rotted and decayed. They are living conduits for Nurgle’s miasmas and maladies. Foul blights reside within their roiling, bloated frames, and when they are unleashed in an eruption of vomit and gases, they liquefy metal, stone andflesh.",
    "profiles": [
      {
        "name": "Malignant Plaguecaster",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
          "LETHAL HITS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plague Wind – witchfire",
        "tags": [
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Plague Wind – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Corrupted staff",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Gift of Contagion (Psychic)",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Afflicted, that attack has the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Pestilent Fallout (Psychic)",
        "text": "In your Shooting phase, after this model has shot, select one enemy INFANTRY unit hit by one or more of those attacks made with its Plague Wind. Until the end of your opponent’s next turn, that unit is enfeebled. While a unit is enfeebled, subtract 2\" from the Move characteristic of models in that unit."
      }
    ],
    "composition": [
      "1 Malignant Plaguecaster"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Plague Wind; corrupted staff.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Poxwalkers",
        "Plague Marines"
      ]
    },
    "keywords": [
      "Nurgle",
      "Malignant Plaguecaster",
      "Chaos",
      "Psyker",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "32mm"
  },
  {
    "id": "miasmic-malignifier",
    "name": "Miasmic Malignifier",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Festooned with swaying plague censers and tainted bells, Miasmic Malignifiers belch thick fumes from their rusted chimneys. Sown like spores across worlds, they are parasites that suck filth from the ground and latch themselves onto local infrastructure, polluting a planet on every level.",
    "profiles": [
      {
        "name": "Miasmic Malignifier",
        "m": "-",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Miasmic gouts",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Putrescent Fog (Aura)",
        "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" of this model."
      },
      {
        "name": "Diseased Cover",
        "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this **FORTIFICATION**, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is only within Engagement Range of one or more FORTIFICATIONS from your army:\n▪ That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n▪ Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so."
      }
    ],
    "specialAbilities": [
      {
        "name": "DEPLOYMENT",
        "text": "Both parts of this FORTIFICATION must be set up within 1\" of each other. Both parts are then treated as a single model for all rules purposes."
      }
    ],
    "composition": [
      "1 Miasmic Malignifier"
    ],
    "loadout": "**This model is equipped with:** miasmic gouts.",
    "keywords": [
      "Fortification",
      "Miasmic Malignifier",
      "Nurgle",
      "Chaos",
      "Frame"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "Hull"
  },
  {
    "id": "mortarion",
    "name": "Mortarion",
    "points": [
      {
        "models": 1,
        "points": 375
      }
    ],
    "flavor": "To stand in Mortarion’s presence is lethal, such is the pestilential aura that surrounds him. Wielding his gigantic scythe, Silence, he cuts apart entire enemy squads in seconds. With furious blasts of Lantern, his devastating sidearm of unknown provenance, he disintegrates heavy infantry and armour alike.",
    "profiles": [
      {
        "name": "Mortarion",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "5+",
        "oc": "6",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Lantern",
        "tags": [
          "PISTOL",
          "SUSTAINED HITS D3"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Rotwind",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS",
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Silence – strike",
        "tags": [
          "DEVASTATING WOUNDS",
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Silence – sweep",
        "tags": [
          "LETHAL HITS",
          "SUSTAINED HITS 1"
        ],
        "a": "15",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Feel No Pain 5+",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Lord of the Death Guard",
        "text": "Once per turn, this model can use one of the Lord of the Death Guard abilities (see below)."
      },
      {
        "name": "Host of Plagues",
        "text": "At the end of your Movement phase, roll one D6 for each enemy unit within 6\" of this model, adding 1 to the result if that enemy unit is Afflicted: on a 3+, that enemy unit suffers D3 mortal wounds."
      }
    ],
    "specialAbilities": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your WARLORD."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Mortarion – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Lantern; Rotwind; Silence.",
    "keywords": [
      "Primarch",
      "Mortarion",
      "Monster",
      "Psyker",
      "Character",
      "Fly",
      "Epic Hero",
      "Grenades",
      "Chaos",
      "Nurgle",
      "Daemon"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "100mm",
    "abilitySets": [
      {
        "name": "Lord of the Death Guard",
        "options": [
          {
            "name": "Diseased Influence",
            "text": "Just after an enemy unit ends a Normal, Advance or Fall Back move within 9\" of a friendly Death Guard unit that is within 6\" of this model, if that DEATH GUARD unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 5\"."
          },
          {
            "name": "Boon of Death",
            "text": "In the Fight phase, when a friendly DEATH GUARD unit within 6\" of this model is selected as the target of an attack, this model can use this ability. If it does, until the end of the phase, each time a model in that DEATH GUARD unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 2+, do not remove it from play; that destroyed model can fight after the attacking unit has finished making its attacks, and it is then removed from play."
          },
          {
            "name": "Inflamed Reprisal",
            "text": "In your opponent’s Shooting phase, when a friendly DEATH GUARD unit within 6\" of this model is selected as the target of an attack, this model can use this ability. If it does, after the attacking unit has finished making its attacks, that Death Guard unit can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target)."
          }
        ]
      }
    ]
  },
  {
    "id": "myphitic-blight-hauler",
    "name": "Myphitic Blight-haulers",
    "points": [
      {
        "models": 1,
        "points": 95
      },
      {
        "models": 2,
        "points": 190
      }
    ],
    "flavor": "Belching stinking gases that hang thick in the air, Myphitic Blight-haulers use their all-terrain mobility and heavy armaments to hunt down the enemy’s tanks and provide fire support even in the most dangerous environments. Should the enemy get too close, these Daemon Engines pounce with fanged maws and sprays of bile.",
    "profiles": [
      {
        "name": "Myphitic Blight-hauler",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Bile spurt",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2",
          "LETHAL HITS"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Gnashing maw",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Tank Hunters",
        "text": "In your Shooting phase, each time a model in this unit makes an attack that targets a MONSTER or VEHICLE unit, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1-2 Myphitic Blight-haulers"
    ],
    "loadout": "**Every model is equipped with:** bile spurt; missile launcher; multi-melta; gnashing maw.",
    "keywords": [
      "Smoke",
      "Vehicle",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Myphitic Blight-Hauler"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "80mm"
  },
  {
    "id": "noxious-blightbringer",
    "name": "Noxious Blightbringer",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Tocsins of misery and cursed plague bells tolling, Noxious Blightbringers sow weakness among the enemy. Each rippling sound wave erodes the enemy’s will to fight, shatters bone and metal alike, and spawns metaphysical maggots in the minds of psykers. To the Death Guard, every distorted peal is invigorating, and upon hearing them, they surge eagerly into the fray.",
    "profiles": [
      {
        "name": "Noxious Blightbringer",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Plasma pistol – standard",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma pistol – supercharge",
        "tags": [
          "PISTOL",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Cursed plague bell",
        "tags": [
          "ANTI-PSYKER 2+",
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Sickening Vitality",
        "text": "While this model is leading a unit, add 1\" to the Move characteristic of models in that unit and you can re-roll Advance and Charge rolls made for that unit."
      },
      {
        "name": "Tocsin of Misery (Aura)",
        "text": "In the Battle-shock step of your opponent’s Command phase, if an enemy unit that is below its Starting Strength is within 9\" of this model, that enemy unit must take a Battle-shock test, subtracting 1 from that test if it is a PSYKER unit."
      }
    ],
    "composition": [
      "1 Noxious Blightbringer"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; cursed plague bell.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Poxwalkers",
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines or Poxwalkers unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Character",
      "Infantry",
      "Noxious Blightbringer",
      "Nurgle",
      "Chaos"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "nurglings",
    "name": "Nurglings",
    "points": [
      {
        "models": 3,
        "points": 45
      },
      {
        "models": 6,
        "points": 90
      }
    ],
    "flavor": "Nurglings are malicious plague mites that pour across the battlefield in giggling masses. These foul imps might seem almost amusing from a distance, yet the illusion is shattered as the Nurglings spill forth to engulf their screaming victims in a rancid avalanche of needle fangs, filthy talons and bloated flesh.",
    "profiles": [
      {
        "name": "Nurglings",
        "m": "5\"",
        "t": "3",
        "sv": "7+",
        "w": "4",
        "ld": "8+",
        "oc": "0",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Diseased claws and teeth",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Mischief Makers",
        "text": "Each time an enemy unit (excluding **TITANIC** units) within Engagement Range of one or more units with this ability is selected to fight, until the end of the phase, each time a model in that enemy unit makes a melee attack, subtract 1 from the Hit roll."
      }
    ],
    "composition": [
      "3-6 Nurgling Swarms"
    ],
    "loadout": "**Every model is equipped with:** diseased claws and teeth.",
    "keywords": [
      "Swarm",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Summoned",
      "Nurglings"
    ],
    "factionKeywords": [
      "",
      "Plague Legions"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "plague-drones",
    "name": "Plague Drones",
    "points": [
      {
        "models": 3,
        "points": 110
      },
      {
        "models": 6,
        "points": 220
      }
    ],
    "flavor": "Plague Drones ride monstrous rot flies to war. These vile steeds scrabble and rip at their prey, impaling them on dripping proboscis orbiting off the heads of their victims. The finest stolen craniums are recovered and fashioned into filth-swollen projectiles - death’s heads - for the daemonic riders to hurl at their foes.",
    "profiles": [
      {
        "name": "Plague Drones",
        "m": "10\"",
        "t": "8",
        "sv": "6+",
        "w": "5",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Death’s heads",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "12\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Foul mouthparts",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Plaguesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Death’s Heads",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly Plague Legions unit makes an attack that targets that unit, you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Plaguebringer",
      "2-5 Plague Drones"
    ],
    "loadout": "**Every model is equipped with:** death’s heads; foul mouthparts; plaguesword.",
    "options": [
      "1 Plague Drone that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Plague Drone that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Chaos",
      "Summoned",
      "Plague Drones",
      "Mounted",
      "Fly",
      "Nurgle",
      "Daemon"
    ],
    "factionKeywords": [
      "Plague Legions",
      ""
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "plague-marines",
    "name": "Plague Marines",
    "points": [
      {
        "models": 5,
        "points": 90
      },
      {
        "models": 7,
        "points": 125
      },
      {
        "models": 10,
        "points": 180
      }
    ],
    "flavor": "The mainstay of vectoriums, Plague Marines excel in gruelling firefights and relentless assaults that grind the enemy down. They are tactically astute, deploying plague spewers to drown hordes of enemies in toxic slime and blight launchers to release crippling ironblight into armoured vehicles.",
    "profiles": [
      {
        "name": "Plague Marines",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Blight launcher",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Boltgun",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "LETHAL HITS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Meltagun",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plague belcher",
        "tags": [
          "ANTI-INFANTRY 4+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plague spewer",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma gun – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma gun – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Plasma pistol – standard",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma pistol – supercharge",
        "tags": [
          "HAZARDOUS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Bubotic weapons",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Heavy plague weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plague knives",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Infused with the Blessings of Nurgle",
        "text": "In your Shooting phase, each time this unit is selected to shoot, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is Afflicted."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Icon of Despair (Aura)",
        "text": "While an enemy unit is within 6\" of the bearer, worsen the Leadership characteristic of models in that unit by 1."
      }
    ],
    "composition": [
      "1 Plague Champion",
      "4-9 Plague Marines"
    ],
    "loadout": "**Every model is equipped with:** boltgun; plague knives.",
    "options": [
      "The Plague Champion’s boltgun can be replaced with one of the following:\n▪ 1 bolt pistol\n▪ 1 plasma gun\n▪ 1 plasma pistol",
      "The Plague Champion’s plague knives can be replaced with one of the following:\n▪ 1 bubotic weapons\n▪ 1 power fist",
      "For every 5 models in this unit, 1 Plague Marine’s boltgun can be replaced with 1 blight launcher.",
      "For every 5 models in this unit, 1 Plague Marine’s boltgun can be replaced with 1 plague spewer.",
      "For every 5 models in this unit, 1 Plague Marine’s boltgun can be replaced with one of the following:\n▪ 1 meltagun\n▪ 1 plague belcher\n▪ 1 plasma gun",
      "For every 5 models in this unit, up to 2 Plague Marines can each have their boltgun replaced with 1 bubotic weapons.",
      "For every 5 models in this unit, up to 2 Plague Marines can each have their boltgun replaced with 1 heavy plague weapon.",
      "One Plague Marine equipped with a boltgun can be equipped with 1 icon of despair. This model’s boltgun cannot be replaced."
    ],
    "keywords": [
      "Grenades",
      "Battleline",
      "Infantry",
      "Plague Marines",
      "Nurgle",
      "Chaos"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "32mm"
  },
  {
    "id": "plague-surgeon",
    "name": "Plague Surgeon",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Equipped with tainted, grime-smeared nartheciums and dripping baleswords, Plague Surgeons also carry vials and alembics full of boosters and stimulants for countless plagues. By such means do they give the Death Guard renewed strength and resilience while inflaming the enemy’s infections to unbearable degrees.",
    "profiles": [
      {
        "name": "Plague Surgeon",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
          "LETHAL HITS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Balesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Tainted Narthecium",
        "text": "While this model is leading a unit, in your Command phase, you can return 1 destroyed Bodyguard model to that unit."
      },
      {
        "name": "Inflamed Infections",
        "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time this model makes an attack that targets that unit, an unmodified Hit roll of 5+ scores a Critical Hit. If that unit is Below Half-strength, an unmodified Hit roll of 4+ scores a Critical Hit instead."
      }
    ],
    "composition": [
      "1 Plague Surgeon"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; balesword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Plague Surgeon",
      "Infantry",
      "Character",
      "Chaos",
      "Nurgle"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "plaguebearers",
    "name": "Plaguebearers",
    "points": [
      {
        "models": 10,
        "points": 115
      }
    ],
    "flavor": "Born from the souls of those who die of Nurgle’s Rot, Plaguebearers are the foot soldiers of the Plague God. They wield plagueswords that drip with infectious slime and are surrounded by the endless drone of counting as they pursue their hopeless and eternal task of tallying each new outbreak of their master’s many diseases.",
    "profiles": [
      {
        "name": "Plaguebearers",
        "m": "5\"",
        "t": "5",
        "sv": "7+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Plaguesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Infected Outbreak",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Plagueridden",
      "9 Plaguebearers"
    ],
    "loadout": "**Every model is equipped with:** plaguesword.",
    "options": [
      "1 Plaguebearer that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Plaguebearer that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Plaguebearers",
      "Infantry",
      "Battleline",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Summoned"
    ],
    "factionKeywords": [
      "Plague Legions",
      ""
    ],
    "baseSize": "32mm"
  },
  {
    "id": "plagueburst-crawler",
    "name": "Plagueburst Crawler",
    "points": [
      {
        "models": 1,
        "points": 170,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 200,
        "note": "2nd+"
      }
    ],
    "flavor": "The brainchild of Mortarion himself, the Plagueburst Crawler is a hulking Daemon Engine with a giant ram-blade and thick armour plating that renders it incredibly resilient. Equipped with a Plagueburst mortar, the engine launches hideously powerful explosive shells that unleash clouds of corrosive spores upon detonation.",
    "profiles": [
      {
        "name": "Plagueburst Crawler",
        "m": "10\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Entropy cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Heavy slugger",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plagueburst mortar",
        "tags": [
          "BLAST",
          "INDIRECT FIRE",
          "LETHAL HITS"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Plaguespitter",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Rothail volley gun",
        "tags": [
          "LETHAL HITS",
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Spore-laced Shock Waves",
        "text": "In your Shooting phase, each time you select a target for this model’s Plagueburst mortar, roll one D6 for the target unit and every other enemy unit within 3\" of the target unit, adding 1 to that roll if the unit being rolled for is Afflicted. On a 6+, the unit being rolled for is struck by spores; after resolving all of this model’s attacks against the target unit, each unit struck by spores suffers D3 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Plagueburst Crawler"
    ],
    "loadout": "**This model is equipped with:** 2 entropy cannons; heavy slugger; Plagueburst mortar; armoured tracks.",
    "options": [
      "This model’s 2 entropy cannons can be replaced with 2 plaguespitters.",
      "This model’s heavy slugger can be replaced with 1 rothail volley gun."
    ],
    "keywords": [
      "Vehicle",
      "Chaos",
      "Nurgle",
      "Daemon",
      "Plagueburst Crawler",
      "Frame"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "Hull"
  },
  {
    "id": "poxwalkers",
    "name": "Poxwalkers",
    "points": [
      {
        "models": 10,
        "points": 65
      },
      {
        "models": 20,
        "points": 130
      }
    ],
    "flavor": "Poxwalkers are victims of walking pox, a cruel virulence that rots the infected almost to death while keeping them conscious. They are terror troops, their ceaseless groaning the vector by which they infect the truly living. In battle, they drown their foes in a sea of decaying flesh, clawing hands and gnashing teeth.",
    "profiles": [
      {
        "name": "Poxwalkers",
        "m": "5\"",
        "t": "4",
        "sv": "7+",
        "w": "1",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Improvised weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Feel No Pain 5+",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Curse of the Walking Pox",
        "text": "Each time a **POXWALKER** model in this unit makes an attack that destroys an enemy model (excluding **MONSTER** and **VEHICLE** models). after this unit has resolved its attacks, you can return one destroyed **POXWALKER** model to this unit. While **TYPHUS** is leading this unit, enemy models destroyed as a result of **TYPHUS**’ Eater Plague ability count as enemy models destroyed by an attack made by a **POXWALKER** model in this unit for the purposes of this ability."
      }
    ],
    "composition": [
      "10-20 Poxwalkers"
    ],
    "loadout": "**Every model is equipped with:** improvised weapon.",
    "keywords": [
      "Poxwalkers",
      "Infantry",
      "Chaos",
      "Nurgle"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "25mm"
  },
  {
    "id": "rotigus",
    "name": "Rotigus",
    "points": [
      {
        "models": 1,
        "points": 280
      }
    ],
    "flavor": "Rotigus Rainfather lumbers into battle, vomiting rivers of corrosive, plague-laden filth across all who stand in its path. In its bloated fist, it clutches a gnarlrod while an endless and infectious downpour accompanies the daemon, a fecund flood fit to drown, corrupt and mutate all it touches.",
    "profiles": [
      {
        "name": "Rotigus",
        "m": "7\"",
        "t": "12",
        "sv": "5+",
        "w": "22",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Streams of brackish filth",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gnarlrod – strike",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "7",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Gnarlrod – sweep",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "14",
        "ws": "2+",
        "s": "8",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
    "faction": "Pact of Decay",
    "abilities": [
      {
        "name": "Virulent Blessing (Psychic)",
        "text": "At the start of the Fight phase, you can select one enemy unit within 24\" and visible to this model. Until the end of the phase, each time an attack made by a Plague Legions model is allocated to a model in that unit, add 1 to the Damage characteristic of that attack."
      },
      {
        "name": "Deluge of Nurgle (Aura)",
        "text": "While an enemy unit is within 6\" of this model, subtract 2 from the Move characteristic and subtract 1 from the Objective Control characteristic of models in that unit."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Rotigus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** streams of brackish filth; gnarlrod.",
    "keywords": [
      "Psyker",
      "Epic Hero",
      "Character",
      "Monster",
      "Nurgle",
      "Chaos",
      "Daemon",
      "Summoned",
      "Rotigus"
    ],
    "factionKeywords": [
      "Plague Legions",
      ""
    ],
    "baseSize": "130mm"
  },
  {
    "id": "tallyman",
    "name": "Tallyman",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "The Tallymen are the preachers of Nurgle’s sevenfold doctrine. They are bedecked with rotten scrolls covered in frenzied scrawls and tallies. Nurglings crawl around them, bearing more tomes and parchments. Through gigantic vox-speakers, Tallymen bellow sacred chants of the three and of the seven, spurring on the Death Guard.",
    "profiles": [
      {
        "name": "Tallyman",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Plasma pistol – standard",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma pistol – supercharge",
        "tags": [
          "HAZARDOUS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Malicious Calculations",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can ignore any or all modifiers to that attack’s Ballistic Skill or Weapon Skill characteristics and/or any or all modifiers to the Hit roll."
      },
      {
        "name": "Sevenfold Chant",
        "text": "In your Command phase, if this model is on the battlefield, roll 2D6: on a 7+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Tallyman"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plague Marines"
      ],
      "footer": "* This model can be attached to a Plague Marines unit even if one other Leader unit has already been attached to it (it cannot attach more than one of the same Leader to the same unit). If it does, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Tallyman",
      "Nurgle",
      "Chaos",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "",
      "Death Guard"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "typhus",
    "name": "Typhus",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Host of the Destroyer Hive, for millennia Typhus has travelled the galaxy, spreading Nurgle’s Rot and killing billions. When he takes to the field, he slices apart countless foes with his filth-encrusted power scythe and unleashes the swarming horror of his Destroyer Hive to engulf them in murderous plague flies.",
    "profiles": [
      {
        "name": "Typhus",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Lakrimae – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Lakrimae – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "12",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Nurgle’s Gift (Aura)",
    "abilities": [
      {
        "name": "Destroyer Hive",
        "text": "While this model is leading a unit, each time a melee attack targets that unit, subtract 1 from the Hit roll."
      },
      {
        "name": "Eater Plague (Psychic)",
        "text": "In your Shooting phase, you can select one enemy unit within 18\" of and visible to this PSYKER (excluding units with the Lone Operative ability that are not part of an Attached unit and are not within 12\" of this PSYKER) and roll one D6: on a 1, this PSYKER’s unit suffers D3 mortal wounds; on a 2-5, that enemy unit suffers D6 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "composition": [
      "1 Typhus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Lakrimae.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Poxwalkers",
        "Deathshroud Terminators",
        "Blightlord Terminators"
      ]
    },
    "keywords": [
      "Terminator",
      "Infantry",
      "Chaos",
      "Nurgle",
      "Character",
      "Psyker",
      "Epic Hero",
      "Typhus"
    ],
    "factionKeywords": [
      "Death Guard",
      ""
    ],
    "baseSize": "50mm"
  }
]
