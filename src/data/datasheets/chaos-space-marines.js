// Chaos Space Marines — datasheets. Unit roster and points from src/data/mfm/chaos-space-marines.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "abaddon-the-despoiler",
    "name": "Abaddon The Despoiler",
    "points": [
      {
        "models": 1,
        "points": 295
      }
    ],
    "flavor": "The Warmaster of Chaos is the greatest threat to the Imperium. He rules his Black Legion with an iron-taloned fist and stands as the embodiment of the Long War. Clad in Terminator armour and wielding his howling daemon sword, Drach’nyen, Abaddon slays any weakling champions sent to challenge him.",
    "profiles": [
      {
        "name": "Abaddon The Despoiler",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "9",
        "ld": "5+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Talon of Horus",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Drach’nyen",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "14",
        "ap": "-4",
        "d": "3"
      },
      {
        "name": "Talon of Horus",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "14",
        "ws": "2+",
        "s": "7",
        "ap": "-3",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warmaster",
        "text": "In your Command phase, select one Warmaster ability. Until the start of your next Command phase, this model has that ability."
      },
      {
        "name": "Dark Destiny",
        "text": "Each time this model’s unit makes a Dark Pact and does not fail the resulting Leadership roll, if the result of that roll was 7+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Abaddon the Despoiler – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Talon of Horus; Drach’nyen.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Chaos Terminator Squad"
      ]
    },
    "keywords": [
      "Chaos Undivided",
      "Chaos",
      "Abaddon the Despoiler",
      "Infantry",
      "Character",
      "Epic Hero",
      "Terminator"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "60mm",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your Warlord."
      }
    ],
    "abilitySets": [
      {
        "name": "Warmaster",
        "options": [
          {
            "name": "Paragon of Hatred (Aura)",
            "text": "While a friendly HERETIC ASTARTES unit is within 6\" (excluding DAMNED units) of this model, each time a model in that unit makes an attack, you can re-roll the Hit roll."
          },
          {
            "name": "Mark of Chaos Ascendant (Aura)",
            "text": "While a friendly Heretic Astartes Infantry or Heretic Astartes Mounted unit (excluding DAMNED units) is within 6\" of this model, models in that unit have a 4+ invulnerable save."
          },
          {
            "name": "Lord of the Traitor Legions (Aura)",
            "text": "While a friendly HERETIC ASTARTES unit (excluding DAMNED units) is within 6\" of this model, you can re-roll Leadership and Battle-shock tests taken for that unit."
          }
        ]
      }
    ]
  },
  {
    "id": "accursed-cultists",
    "name": "Accursed Cultists",
    "points": [
      {
        "models": 8,
        "points": 90,
        "note": "1st"
      },
      {
        "models": 16,
        "points": 195,
        "note": "1st"
      },
      {
        "models": 8,
        "points": 110,
        "note": "2nd+"
      },
      {
        "models": 16,
        "points": 215,
        "note": "2nd+"
      }
    ],
    "flavor": "Whether born of dark ritual, empyric experimentation or the predations of malign entities, Accursed Cultists have diverse, terrifying origins. Driven towards the foe, Mutants flail and lash at the enemy with claws or tendrils, while horribly warped Torments pounce with bestial hunger.",
    "profiles": [
      {
        "name": "MUTANT",
        "m": "6\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "baseSize": "25mm"
      },
      {
        "name": "TORMENT",
        "m": "6\"",
        "t": "4",
        "sv": "6+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "baseSize": "40mm"
      }
    ],
    "melee": [
      {
        "name": "Blasphemous appendages",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
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
    "core": "Feel No Pain 6+, Scouts 6\"",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Howling Horde",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model from this unit was destroyed as a result of those attacks, this unit can make a surge move of up to D6\"."
      }
    ],
    "composition": [
      "3-6 Torments",
      "5-10 Mutants"
    ],
    "loadout": "**Every Torment is equipped with:** hideous mutations.\n\n**Every Mutant is equipped with:** blasphemous appendages.",
    "keywords": [
      "Damned",
      "Chaos",
      "Infantry",
      "Accursed Cultists"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
  },
  {
    "id": "chaos-bikers",
    "name": "Chaos Bikers",
    "points": [
      {
        "models": 3,
        "points": 70
      },
      {
        "models": 6,
        "points": 130
      }
    ],
    "flavor": "Vicious long-range hunters as adept in reconnaissance as they are in bloody chases, Chaos Bikers ride powerful, growling machines whose combi-bolters spew explosive death. In rapid assaults, they smash through enemy defence lines, before circling back like a pack of predators to cut down survivors in bloody melee.",
    "profiles": [
      {
        "name": "Chaos Bikers",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Combi-bolter",
        "tags": [
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
        "name": "Flamer",
        "tags": [
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Rapid Assault",
        "text": "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength characteristic of that attack by 1."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Icon",
        "text": "Each time the bearer’s unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test."
      }
    ],
    "composition": [
      "1 Biker Champion",
      "2-5 Chaos Bikers"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; combi-bolter; close combat weapon.",
    "options": [
      "The Biker Champion’s bolt pistol can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 accursed weapon\n▪ 1 Astartes chainsword\n▪ 1 power fist",
      "Any number of Chaos Bikers can each have their bolt pistol replaced with 1 Astartes chainsword.",
      "Up to 2 Chaos Bikers can each have their combi-bolter replaced with 1 combi-weapon, or can be equipped with one of the following:\n▪ 1 flamer\n▪ 1 meltagun\n▪ 1 plasma gun",
      "1 model can be equipped with 1 Chaos icon."
    ],
    "keywords": [
      "Chaos Bikers",
      "Chaos",
      "Grenades",
      "Mounted"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "75x42mm Oval Base"
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
    "flavor": "Chaos Land Raiders are massive armoured transports bristling with the heavy armaments of main line battle tanks and seething with a malevolent spirit. Strung with trophies taken from those slain by the elite warriors the tanks carry to the front line, Land Raiders are the spiked fists of many Heretic Astartes assaults.",
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
    "faction": "Dark Pacts",
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
    "transport": "This model has a transport capacity of 12 Heretic Astartes Infantry models (excluding Obliterator and Jump Pack models). Each Possessed, Mutilators and Terminator model takes up the space of 2 models.",
    "keywords": [
      "Chaos",
      "Vehicle",
      "Transport",
      "Smoke",
      "Land Raider",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-lord",
    "name": "Chaos Lord",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Chaos Lords have spent countless spans of mortal lives leading their traitorous warriors, demanding nothing but utter ruthlessness from those they command. Each heretic aspires to this chilling mastery, knowing there is no prize beyond their Lord’s grasp and no enemy they cannot slay with pre-eminent skill.",
    "profiles": [
      {
        "name": "Chaos Lord",
        "m": "6\"",
        "t": "4",
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
          "PISTOL",
          "HAZARDOUS"
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Daemon hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Lord of Chaos",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Chance for Glory",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, improve the Strength, Attacks, Armour Penetration and Damage characteristics of melee weapons equipped by this model by 1."
      }
    ],
    "composition": [
      "1 Chaos Lord"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; daemon hammer.",
    "options": [
      "This model’s daemon hammer can be replaced with one of the following:\n▪ 1 accursed weapon\n▪ 1 Astartes chainsword",
      "This model’s plasma pistol can be replaced with 1 power fist."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Red Corsairs Raiders",
        "Nemesis Claw",
        "Chosen",
        "Legionaries"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Chaos",
      "Chaos Lord"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaos-lord-in-terminator-armour",
    "name": "Chaos Lord In Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Chaos Lords’ underlings expect them to fight from the front, and few kinds of armour enable them to do so as effectively as archaic Terminator plate. Formidably resilient, such a suit protects the Lord against all but the most devastating firepower and enables him to deploy by teleportation right into the heart of the foe.",
    "profiles": [
      {
        "name": "Chaos Lord In Terminator Armour",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Exalted weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Paired accursed weapons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Lord of Chaos",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Formidably Resilient",
        "text": "Each time an attack is allocated to this model, halve the Damage characteristic of that attack."
      }
    ],
    "composition": [
      "1 Chaos Lord in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** combi-bolter; exalted weapon.",
    "options": [
      "This model’s combi-bolter can be replaced with 1 combi-weapon.",
      "This model’s exalted weapon can be replaced with one of the following:\n▪ 1 chainfist\n▪ 1 power fist",
      "This model’s combi-bolter and exalted weapon can be replaced with 1 paired accursed weapons."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chaos Terminator Squad"
      ]
    },
    "keywords": [
      "Chaos Lord",
      "Chaos",
      "Character",
      "Infantry",
      "Chaos Lord in Terminator Armour",
      "Terminator"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaos-lord-with-jump-pack",
    "name": "Chaos Lord with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Some Chaos Lords go to war equipped with jump packs, favouring the mobility these devices provide. Leading packs of Raptors, these cruel hunters descend upon their victims with savage hunger before bringing to bear an array of accursed weapons as they relentlessly pursue their quarry across the battlefield.",
    "profiles": [
      {
        "name": "Chaos Lord",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
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
          "PISTOL",
          "HAZARDOUS"
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin lightning claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Lord of Chaos",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Cruel Hunter",
        "text": "While this model is leading a unit, each time that unit Piles In or Consolidates, each model in that unit can move up to 6\" instead of up to 3\"."
      }
    ],
    "composition": [
      "1 Chaos Lord with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; accursed weapon.",
    "options": [
      "This model's bolt pistol can be replaced with 1 plasma pistol.",
      "This model’s accursed weapon can be replaced with 1 power fist.",
      "This model's bolt pistol and accursed weapon can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Raptors"
      ]
    },
    "keywords": [
      "Grenades",
      "Jump Pack",
      "Infantry",
      "Character",
      "Fly",
      "Chaos",
      "Chaos Lord"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaos-predator-annihilator",
    "name": "Chaos Predator Annihilator",
    "points": [
      {
        "models": 1,
        "points": 145,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "The traitorous crews of each Predator Annihilator liken their tank’s machine spirit to the animus of a stalking hunter. These tank-killing war machines unleash searing beams of energy from their lascannons, or thunder into front-line brawls to crack open bunkers housing the craven foe.",
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Annihilator",
        "text": "Each time a ranged attack made by this model is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll."
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
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 Havoc launcher."
    ],
    "keywords": [
      "Predator Annihilator",
      "Chaos",
      "Smoke",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-predator-destructor",
    "name": "Chaos Predator Destructor",
    "points": [
      {
        "models": 1,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Many Predator Destructors of the Heretic Astartes are ancient war engines whose rapid-firing heavy weaponry has unleashed destruction on battlefields dating back to the Horus Heresy. The thudding of their explosive shells resounds like a death knell as they scythe apart squads of infantry and light vehicles.",
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Destructor",
        "text": "Each time a ranged attack made by this model targets an enemy INFANTRY unit, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Chaos Predator Destructor"
    ],
    "loadout": "**This model is equipped with:** Predator autocannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 Havoc launcher."
    ],
    "keywords": [
      "Chaos",
      "Smoke",
      "Vehicle",
      "Predator Destructor",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-rhino",
    "name": "Chaos Rhino",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Based upon ancient workhorse vehicles that have served Humanity for millennia, Chaos Rhinos are well adapted for battlefield transportation. Though encrusted with heretical icons and corrupted by the warp, they remain as rugged and reliable as ever, safely carrying their passengers over fire-swept battlefields.",
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Self Repair",
        "text": "At the start of your Command phase, this model regains 1 lost wound."
      }
    ],
    "composition": [
      "1 Chaos Rhino"
    ],
    "loadout": "**This model is equipped with:** combi-bolter; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 havoc launcher or can replace 1 combi-bolter with 1 havoc launcher."
    ],
    "transport": "This model has a transport capacity of 12 Heretic Astartes Infantry models. It cannot transport Terminator, Jump Pack, Mutilators, Obliterators or Possessed models.",
    "keywords": [
      "Transport",
      "Vehicle",
      "Dedicated Transport",
      "Smoke",
      "Chaos",
      "Rhino",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chaos-spawn",
    "name": "Chaos Spawn",
    "points": [
      {
        "models": 2,
        "points": 60
      }
    ],
    "flavor": "Becoming a Chaos Spawn is the fate of many upon the Path to Glory. Wracked with the endless gifts of the Dark Gods, they are mutated mounds of muscle, scaly hides, talons, eyes, teeth and far more. Chaos Spawn are herded towards their terrified foes, advancing in loping runs as they seek only to tear, crush and consume.",
    "profiles": [
      {
        "name": "Chaos Spawn",
        "m": "8\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "0"
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
    "core": "Feel No Pain 5+",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Mind-breaking Mutations (Aura)",
        "text": "While an enemy unit (excluding VEHICLE units) is within 3\" of this unit, subtract 1 from the Objective Control characteristic of models in that enemy unit."
      }
    ],
    "composition": [
      "2 Chaos Spawn"
    ],
    "loadout": "**Every model is equipped with:** hideous mutations.",
    "options": [
      "None"
    ],
    "keywords": [
      "Chaos",
      "Beast",
      "Chaos Spawn"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "chaos-terminator-squad",
    "name": "Chaos Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 175
      },
      {
        "models": 10,
        "points": 350
      }
    ],
    "flavor": "Clad in hulking, corrupted Terminator plate, each of these murderous brutes is akin to a walking tank. Spikes and horns give them a monstrous appearance, and their powerful array of heavy firepower and brutal melee weapons can tear through elite squads and war engines alike.",
    "profiles": [
      {
        "name": "Chaos Terminator Squad",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Paired accursed weapons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Despoilers",
        "text": "Each time this unit makes a Dark Pact, until the end of the phase, each time a model in this unit makes an attack, you can re-roll the Hit roll."
      }
    ],
    "composition": [
      "1 Terminator Champion",
      "4-9 Chaos Terminators"
    ],
    "loadout": "**Every model is equipped with:** combi-bolter; accursed weapon.",
    "options": [
      "For every 5 models in this unit, 1 Terminator’s combi-bolter can be replaced with one of the following:\n▪ 1 heavy flamer\n▪ 1 reaper autocannon",
      "Any number of models can each have their combi-bolter replaced with 1 combi-weapon.",
      "For every 5 models in this unit, 1 model’s combi-bolter and accursed weapon can be replaced with 1 paired accursed weapons.",
      "For every 5 models in this unit, up to 3 models can each have their accursed weapon replaced with 1 power fist.",
      "For every 5 models in this unit, 1 model’s accursed weapon can be replaced with 1 chainfist."
    ],
    "keywords": [
      "Chaos Terminator Squad",
      "Infantry",
      "Chaos",
      "Terminator"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaos-vindicator",
    "name": "Chaos Vindicator",
    "points": [
      {
        "models": 1,
        "points": 185,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 195,
        "note": "3rd+"
      }
    ],
    "flavor": "Vindicators are brutal siege tanks, capable of single-handedly pulverising trench networks along with their defenders. A Vindicator’s demolisher cannon fires gigantic shells that can tear ragged holes in bastion walls, likened by its accompanying heretics to the crumbling faith of loyalists.",
    "profiles": [
      {
        "name": "Chaos Vindicator",
        "m": "9\"",
        "t": "11",
        "sv": "2+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
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
        "name": "Demolisher cannon",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
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
    "core": "Deadly Demise D3",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Siege Shield",
        "text": "When making ranged attacks with its demolisher cannon, this model can target enemy units within Engagement Range of it (provided no other friendly units are also within Engagement Range of that enemy unit). In addition, when making ranged attacks, this model does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Chaos Vindicator"
    ],
    "loadout": "**This model is equipped with:** demolisher cannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 combi-weapon",
      "This model can be equipped with 1 Havoc launcher."
    ],
    "keywords": [
      "Smoke",
      "Chaos",
      "Vindicator",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "chosen",
    "name": "Chosen",
    "points": [
      {
        "models": 5,
        "points": 135,
        "note": "1st"
      },
      {
        "models": 10,
        "points": 270,
        "note": "1st"
      },
      {
        "models": 5,
        "points": 135,
        "note": "2nd+"
      },
      {
        "models": 10,
        "points": 260,
        "note": "2nd+"
      }
    ],
    "flavor": "The power-hungry veterans known as Chosen are amongst the most experienced and ruthless fighters of the Heretic Astartes. Granted – or having seized – their warband’s most powerful weapons, these warriors undertake the most glorious and dangerous missions, and are the bane of all that lives.",
    "profiles": [
      {
        "name": "Chosen",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Boltgun",
        "tags": [],
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Paired accursed weapons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Chosen Marauders",
        "text": "This unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Icon",
        "text": "Each time the bearer’s unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test."
      }
    ],
    "composition": [
      "1 Chosen Champion",
      "4-9 Chosen"
    ],
    "loadout": "**Every model is equipped with:** boltgun; bolt pistol; accursed weapon.",
    "options": [
      "For every 5 models in this unit, up to 2 models can each have their bolt pistol replaced with 1 plasma pistol.",
      "For every 5 models in this unit, up to 2 models can each have their boltgun replaced with 1 combi-weapon.",
      "For every 5 models in this unit, 1 model’s boltgun and accursed weapon can be replaced with 1 paired accursed weapons.",
      "For every 5 models in this unit, 1 model equipped with a boltgun can have its accursed weapon replaced with 1 power fist. That model’s boltgun cannot be replaced.",
      "1 model can be equipped with 1 Chaos icon."
    ],
    "keywords": [
      "Chaos",
      "Chosen",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "cultist-firebrand",
    "name": "Cultist Firebrand",
    "points": [
      {
        "models": 1,
        "points": 45,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 50,
        "note": "3rd+"
      }
    ],
    "flavor": "Their bodies swollen with unholy power. Cultist Firebrands ore pyromaniacal champions of Chaos. Their very presence upon the battlefield infames the real of nearby cultists, driving them to ever-escalating acts of brutality and depravity.",
    "profiles": [
      {
        "name": "Cultist Firebrand",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Balefire pike",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Fiery Faith",
        "text": "While this model is leading a unit, you can re-roll Leadership tests taken for that unit."
      },
      {
        "name": "Cursed Flames",
        "text": "In your Shooting phase, after this model has shot, select one enemy INFANTRY unit hit by one or more of those attacks. That unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Cultist Firebrand"
    ],
    "loadout": "**This model is equipped with:** balefire pike, close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Cultist Mob",
        "Accursed Cultists"
      ]
    },
    "keywords": [
      "Grenades",
      "Infantry",
      "Cultist Firebrand",
      "Character",
      "Chaos",
      "Damned"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "cultist-mob",
    "name": "Cultist Mob",
    "points": [
      {
        "models": 10,
        "points": 50
      },
      {
        "models": 20,
        "points": 90
      }
    ],
    "flavor": "Chaos Cultists are the mortal devotees of the Dark Gods, ordinary men and women fallen to promises of temporal power who take to battle in huge numbers. Bearing a motley collection of improvised, stolen and makeshift weapons, they can overwhelm even determined enemies with sheer weight of numbers.",
    "profiles": [
      {
        "name": "Cultist Mob",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Brutal assault weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "For the Dark Gods",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "composition": [
      "1 Cultist Champion",
      "9-19 Chaos Cultists"
    ],
    "loadout": "**Every model is equipped with:** autopistol; brutal assault weapon.",
    "options": [
      "The Cultist Champion’s autopistol can be replaced with 1 bolt pistol."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Grenades",
      "Chaos",
      "Damned",
      "Cultist Mob"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "cypher",
    "name": "Cypher",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Cypher is a mysterious agent of discord and insurrection, always one step ahead of capture, and strife blooms in his wake as violently as the detonations from his masterwork pistols. He is a lord of the hunted Fallen, though his true role as traitor or loyalist is as cryptic as the sword he carries but never wields.",
    "profiles": [
      {
        "name": "Cypher",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Cypher’s bolt pistol",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "SUSTAINED HITS 1"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cypher’s plasma pistol",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "SUSTAINED HITS 1"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Cypher’s bolt pistol",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cypher’s plasma pistol",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Lone Operative",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Agent of Discord",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP."
      },
      {
        "name": "Guns Blazing",
        "text": "Once per turn, in your opponent's Shooting phase, when an enemy unit makes a ranged attack that targets a friendly HERETIC ASTARTES unit within 3\" of this model, after that enemy unit has shot, this model can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target."
      }
    ],
    "composition": [
      "1 Cypher – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Cypher’s bolt pistol; Cypher’s plasma pistol.",
    "keywords": [
      "Infantry",
      "Character",
      "Fallen",
      "Epic Hero",
      "Chaos",
      "Cypher"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "dark-apostle",
    "name": "Dark Apostle",
    "points": [
      {
        "models": 3,
        "points": 65
      }
    ],
    "flavor": "Dark Apostles are the high priests of the Dark Gods. They preach catechisms from blasphemous texts, issuing prayers that call down the Ruinous Powers’ wrath. As they crush skulls with blows from their accursed crozius, they roar profane blessings using their deadliest weapon: their voice.",
    "profiles": [
      {
        "name": "DARK APOSTLE",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "40mm"
      },
      {
        "name": "DARK DISCIPLE",
        "m": "6\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "25mm"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Accursed crozius",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Dark Zealotry",
        "text": "While this unit is leading a unit and contains a DARK APOSTLE model, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Demagogue",
        "text": "Once per battle, at the start of any phase, you can select one friendly HERETIC ASTARTES unit that is Battle-shocked and within 12\" of this unit’s DARK APOSTLE model. That unit is no longer Battle-shocked."
      },
      {
        "name": "Malign Sacrifice",
        "text": "At the start of the Fight phase, if this unit contains one or more Dark Disciple models, you can select one of those models and one enemy unit within Engagement Range of this unit, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds. That Dark Disciple model is then destroyed."
      }
    ],
    "composition": [
      "1 Dark Apostle",
      "2 Dark Disciples"
    ],
    "loadout": "**The Dark Apostle is equipped with:** bolt pistol; accursed crozius.\n\n**Every Dark Disciple is equipped with:** close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Accursed Cultists",
        "Red Corsairs Raiders",
        "Cultist Mob",
        "Nemesis Claw",
        "Legionaries",
        "Chosen"
      ]
    },
    "keywords": [
      "Dark Apostle",
      "Grenades",
      "Infantry",
      "Character",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
  },
  {
    "id": "dark-commune",
    "name": "Dark Commune",
    "points": [
      {
        "models": 5,
        "points": 90,
        "note": "1st"
      },
      {
        "models": 5,
        "points": 100,
        "note": "2nd+"
      }
    ],
    "flavor": "A pooling of evil at the head of a Chaos Cult, Dark Communes are led by Cult Demagogues who preach mantras of hate laced with promises of power. They command Mindwitches, whose psychic powers are bought at terrible cost, and Iconarchs, who carry foul sigils that spread the Dark Gods’ malefic influence.",
    "profiles": [
      {
        "name": "CULT DEMAGOGUE",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "baseSize": "32mm"
      },
      {
        "name": "OTHER MODELS",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "baseSize": "28.5mm / 32mm"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Warp Curse – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Warp Curse – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC",
          "SUSTAINED HITS 2"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Commune blade",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Commune stave",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Faithful Flock",
        "text": "While this unit is leading a unit and contains a CULT DEMAGOGUE model, models in that unit have a 5+ invulnerable save."
      },
      {
        "name": "Dark Ritual",
        "text": "Once per battle, in your Command phase, if this unit contains a CULT DEMAGOGUE model, it can use this ability. If it does, until the end of the turn, this unit can declare a charge in a turn in which it Advanced and each time a model in this unit makes an attack, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Icon",
        "text": "Each time the bearer’s unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test."
      }
    ],
    "composition": [
      "1 Cult Demagogue",
      "1 Mindwitch",
      "1 Iconarch",
      "2 Blessed Blades"
    ],
    "loadout": "**The Cult Demagogue is equipped with:** autopistol; Commune stave.\n\n**The Mindwitch is equipped with:** Warp Curse; close combat weapon.\n\n**The Iconarch is equipped with:** autopistol; close combat weapon; Chaos icon.\n\n**Every Blessed Blade is equipped with:** Commune blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Cultist Mob",
        "Accursed Cultists"
      ]
    },
    "keywords": [
      "Infantry",
      "Grenades",
      "Chaos",
      "Damned",
      "Dark Commune",
      "Psyker",
      "Character",
      "Cult Demagogue"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
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
        "points": 330,
        "note": "2nd+"
      }
    ],
    "flavor": "Towering creations that stomp across the battlefield on piston-driven legs, Defilers are Daemon Engines possessed by abominable entities. Foes are not safe at a distance either, as Defilers’ monstrous cannons and other heavy weapons can inflict a toll of carnage.",
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
        "name": "Hades battle cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Ectoplasma destructor",
        "tags": [
          "BLAST"
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
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Magma cutters",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
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
        "name": "Hades lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Heavy reaper autocannon",
        "tags": [
          "DEVASTATING WOUNDS",
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
        "name": "Heavy missile launcher – krak",
        "tags": [],
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
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Shearing claws – strike",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "16",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Shearing claws – sweep",
        "tags": [],
        "a": "10",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
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
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Scuttling Walker",
        "text": "Each time this unit makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed."
      },
      {
        "name": "Daemonforge",
        "text": "Each time this unit makes a Dark Pact, until the end of the phase, each time this model makes an attack, re-roll a Wound roll of 1."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Defiler"
    ],
    "loadout": "**This model is equipped with:** 1 Hades battle cannon; 2 excruciator cannons; 1 heavy missile launcher; 1 heavy baleflamer; 1 shearing claws.",
    "options": [
      "This model’s Hades battle cannon can be replaced with 1 ectoplasma destructor.",
      "This model’s excruciator cannons can be replaced with 2 magma cutters.",
      "This model’s heavy baleflamer can be replaced with one of the following:\n▪ 1 Hades lascannon\n▪ 1 heavy reaper autocannon\n▪ 1 electroscourge (a model cannot be equipped with more than one electroscourge)",
      "This model’s heavy missile launcher can be replaced with one of the following:\n▪ 1 Hades lascannon\n▪ 1 heavy reaper autocannon\n▪ 1 electroscourge (a model cannot be equipped with more than one electroscourge)"
    ],
    "keywords": [
      "Daemon",
      "Defiler",
      "Vehicle",
      "Walker",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "160mm"
  },
  {
    "id": "fabius-bile",
    "name": "Fabius Bile",
    "points": [
      {
        "models": 2,
        "points": 100
      }
    ],
    "flavor": "A genius of arcane genetics, Fabius Bile enhances even the augmented biologies of his Heretic Astartes followers. With surgical precision, he wields the pain-inducing Rod of Torment in one hand, while with his other he fires toxic darts from the Xyclos Needler, as the arachnid arms of his Chirurgeon seal his own injuries.",
    "profiles": [
      {
        "name": "FABIUS BILE",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "baseSize": "40mm"
      },
      {
        "name": "SURGEON ACOLYTE",
        "m": "6\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "baseSize": "32mm"
      }
    ],
    "ranged": [
      {
        "name": "Xyclos Needler",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "2",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chirurgeon",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rod of Torment",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Surgeon Acolyte’s tools",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Enhanced Warriors",
        "text": "If this unit is attached to a unit at the start of the battle, until the end of the battle, add 1 to the Strength characteristic of melee weapons equipped by Bodyguard models in that unit and add 1 to the Toughness characteristic of Bodyguard models in that unit."
      },
      {
        "name": "Surgeon Acolyte",
        "text": "Once per turn, when an attack is allocated to a model in this unit, if this unit contains FABIUS BILE, you can change the Damage characteristic of that attack to 0."
      },
      {
        "name": "Chirurgeon",
        "text": "The first time this unit’s FABIUS BILE model is destroyed, at the end of the phase, roll one D6: on a 2+, set it back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy models, with its full wounds remaining."
      }
    ],
    "composition": [
      "1 Fabius Bile – EPIC HERO",
      "1 Surgeon Acolyte"
    ],
    "loadout": "**Fabius Bile is equipped with:** Xyclos Needler; Chirurgeon; Rod of Torment.\n\n**The Surgeon Acolyte is equipped with:** Surgeon Acolyte’s tools.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Red Corsairs Raiders",
        "Chosen",
        "Accursed Cultists",
        "Legionaries",
        "Cultist Mob"
      ]
    },
    "keywords": [
      "Infantry",
      "Chaos Undivided",
      "Character",
      "Epic Hero",
      "Fabius Bile",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
  },
  {
    "id": "fellgor-beastmen",
    "name": "Fellgor Beastmen",
    "points": [
      {
        "models": 10,
        "points": 60
      }
    ],
    "flavor": "Beastmen are savage and embittered mutants who despise the Imperium and the civilisation of Humanity. Gathering for war in brutish herds, each is an unruly mass of flesh, fur and teeth, bristling with bestial horns and proclaiming their devotion to the Dark Gods through braying war cries, swift slaughter and violent sacrifices.",
    "profiles": [
      {
        "name": "Fellgor Beastmen",
        "m": "6\"",
        "t": "4",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Corrupted stave",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma pistol – standard",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
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
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Corrupted stave",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Great weapon",
        "tags": [],
        "a": "2",
        "ws": "5+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Bestial Raiders",
        "text": "If this unit starts the game in Strategic Reserves, it can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. If this unit is in Strategic Reserves, for the purposes of setting up this unit on the battlefield, treat the current battle round number as being one higher than it actually is."
      }
    ],
    "composition": [
      "1 Fellgor Champion",
      "9 Fellgor Beastmen"
    ],
    "loadout": "**The Fellgor Champion is equipped with:** bolt pistol; chainsword.\n\n**Every Fellgor Beastman is equipped with:** autopistol; close combat weapon.",
    "options": [
      "The Fellgor Champion’s bolt pistol can be replaced with 1 plasma pistol.",
      "1 Fellgor Beastman’s close combat weapon can be replaced with 1 great weapon.",
      "1 Fellgor Beastman’s close combat weapon can be replaced with 1 corrupted stave."
    ],
    "keywords": [
      "Fellgor Beastmen",
      "Infantry",
      "Grenades",
      "Chaos",
      "Damned"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "forgefiend",
    "name": "Forgefiend",
    "points": [
      {
        "models": 1,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Forgefiends are fused with enormous rotary cannons that fire fist-sized phosphor shells, or else with ancient artefact-ordnance perverted to vomit ectoplasma from the beasts’ own innards. With such weaponry they scythe down masses of enemy troops and blast glowing craters into the toughest opposition.",
    "profiles": [
      {
        "name": "Forgefiend",
        "m": "8\"",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Ectoplasma cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Hades autocannon",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured limbs",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Forgefiend jaws",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Daemonic Ordnance",
        "text": "Each time this model is selected to shoot, it can use this ability. If it does, until the end of the phase, its ranged weapons have the [DEVASTATING WOUNDS] and [HAZARDOUS] abilities."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Forgefiend"
    ],
    "loadout": "**This model is equipped with:** 2 Hades autocannons; Forgefiend jaws.",
    "options": [
      "This model’s 2 Hades autocannons can be replaced with 2 ectoplasma cannons.",
      "This model’s Forgefiend jaws can be replaced with 1 ectoplasma cannon and 1 armoured limbs."
    ],
    "keywords": [
      "Daemon",
      "Vehicle",
      "Walker",
      "Chaos",
      "Forgefiend"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "haarken-worldclaimer",
    "name": "Haarken Worldclaimer",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Haarken is the Herald of the Apocalypse and the mouthpiece of Abaddon. He declares his master’s dominion by driving his daemon touched Helspear into soon-to-be-conquered worlds, following up with vicious destruction as he leads hosts of Raptors in strikes that sow fear and confusion.",
    "profiles": [
      {
        "name": "Haarken Worldclaimer",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Helspear",
        "tags": [
          "ASSAULT",
          "SUSTAINED HITS D3"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Herald’s Talon",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Helspear",
        "tags": [
          "EXTRA ATTACKS",
          "LANCE",
          "SUSTAINED HITS D3"
        ],
        "a": "1",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Head Taker",
        "text": "While this model is leading a unit, each time this model’s unit ends a Charge move, select one enemy unit within Engagement Range of this model’s unit and roll one D6 for each model in this model’s unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound."
      },
      {
        "name": "Herald of the Apocalypse (Aura)",
        "text": "While an enemy unit is within 6\" of this model, in the Battle-shock step of your opponent’s Command phase, if that enemy unit is below its Starting Strength, it must take a Battle-shock test. This ability cannot cause a unit to take two Battle-shock tests in the same phase."
      }
    ],
    "composition": [
      "1 Haarken Worldclaimer – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Helspear; Herald’s Talon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Raptors"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Fly",
      "Jump Pack",
      "Chaos",
      "Chaos Undivided",
      "Haarken Worldclaimer",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "havocs",
    "name": "Havocs",
    "points": [
      {
        "models": 5,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 135,
        "note": "3rd+"
      }
    ],
    "flavor": "With a preference for inflicting carnage at long range, Havocs imperiously touch every part of the battlefield with death and destruction. Their huge weapons are archaic patterns of those known to the Imperium, but often become fused with their wielder over the span of countless wars.",
    "profiles": [
      {
        "name": "Havocs",
        "m": "5\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flamer",
        "tags": [
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
        "name": "Havoc autocannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Havoc heavy bolter",
        "tags": [
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
        "name": "Havoc lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Havoc missile launcher – frag",
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
        "name": "Havoc missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Havoc reaper chaincannon",
        "tags": [],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Stabilisation Talons",
        "text": "Each time a model in this unit makes an attack with a ranged weapon, you can ignore any or all modifiers to the Hit roll and any or all modifiers to the Ballistic Skill characteristic of that weapon."
      }
    ],
    "composition": [
      "1 Havoc Champion",
      "4 Havocs"
    ],
    "loadout": "**The Havoc Champion is equipped with:** flamer; Astartes chainsword.\n\n**2 Havocs are equipped with:** Havoc autocannon; close combat weapon.\n\n**2 Havocs are equipped with:** Havoc lascannon; close combat weapon.",
    "options": [
      "The Havoc Champion’s Astartes chainsword can be replaced with one of the following:\n▪ 1 accursed weapon\n▪ 1 power fist",
      "The Havoc Champion’s flamer can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 meltagun\n▪ 1 plasma gun\n▪ 1 plasma pistol\n▪ 1 accursed weapon\n▪ 1 power fist",
      "Any number of Havocs can each have their Havoc autocannon or Havoc lascannon replaced with one of the following:\n▪ 1 Havoc autocannon\n▪ 1 Havoc heavy bolter\n▪ 1 Havoc lascannon\n▪ 1 Havoc missile launcher\n▪ 1 Havoc reaper chaincannon"
    ],
    "keywords": [
      "Infantry",
      "Havocs",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "helbrute",
    "name": "Helbrute",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "Helbrutes are walking engines of destruction and psychosis, their occupants kept alive in a state of agony and insanity. These infernal sarcophagi are fitted with a variety of powerful armaments to blast enemy armour open from afar, or cruel appendages with which to hack and crush with enormous strength at close range.",
    "profiles": [
      {
        "name": "Helbrute",
        "m": "6\"",
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
        "name": "Helbrute plasma cannon",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
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
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin heavy bolter",
        "tags": [
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
        "a": "5",
        "ws": "4+",
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Dark Ascension (Aura)",
        "text": "While a friendly HERETIC ASTARTES unit is within 6\" of this model, each time that unit makes a Dark Pact, until the end of the phase, weapons equipped by models in that unit gain both abilities conferred by that pact (instead of only one)."
      },
      {
        "name": "Devoted to Destruction",
        "text": "If this model is equipped with two melee weapons in addition to its close combat weapon, add 2 to the Attacks characteristic of those two weapons."
      }
    ],
    "composition": [
      "1 Helbrute"
    ],
    "loadout": "**This model is equipped with:** missile launcher; multi-melta; close combat weapon",
    "options": [
      "This model’s multi-melta can be replaced with one of the following:\n▪ 1 Helbrute plasma cannon\n▪ 1 twin autocannon\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon\n▪ 1 Helbrute fist",
      "This model’s missile launcher can be replaced with one of the following:\n▪ 1 Helbrute fist\n▪ 1 Helbrute hammer\n▪ 1 power scourge",
      "For each Helbrute fist this model is equipped with, it can be equipped with one of the following:\n▪ 1 combi-bolter\n▪ 1 heavy flamer"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Helbrute",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "heldrake",
    "name": "Heldrake",
    "points": [
      {
        "models": 1,
        "points": 175
      }
    ],
    "flavor": "Like vast, draconic predators of myth, Heldrakes spear suddenly out of the sky. These airborne Daemon Engines excel at intercepting the enemy’s aerial assets, tearing them from the air and incinerating their crew. Once their dominance of the sky is complete, they turn their claws and weapons against those on the ground.",
    "profiles": [
      {
        "name": "Heldrake",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "-",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Baleflamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hades autocannon",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Heldrake claws",
        "tags": [
          "ANTI-FLY 2+",
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Hover",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Airborne Predator",
        "text": "Each time this model makes an attack that targets a unit that can FLY, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Heldrake"
    ],
    "loadout": "**This model is equipped with:** Hades autocannon; Heldrake claws.",
    "options": [
      "This model’s Hades autocannon can be replaced with 1 baleflamer."
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Heldrake",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "heretic-astartes-daemon-prince",
    "name": "Heretic Astartes Daemon Prince",
    "points": [
      {
        "models": 1,
        "points": 165
      }
    ],
    "flavor": "Infernal beasts whose Path to Glory has elevated them to daemonhood, Daemon Princes are paragons of evil. Warped and corrupted by Chaos, they lead their warbands in devastating assaults, striding through their mortal enemies’ attacks and unleashing monstrous blows and blasts of sorcery against all before them.",
    "profiles": [
      {
        "name": "Heretic Astartes Daemon Prince",
        "m": "8\"",
        "t": "10",
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
        "tags": [],
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
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Dark Blessing (Aura)",
        "text": "While a friendly Heretic Astartes Infantry unit is within 6\" of this model, each time a ranged attack is allocated to a model in that unit, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Ascended Daemon",
        "text": "Each time this model shoot or fights, while resolving those attacks, you can re-roll one Hit roll and you can re-roll one Wound roll."
      },
      {
        "name": "Lord of Chaos",
        "text": "While this model is within 3\" of one or more friendly Heretic Astartes Infantry units, this model has the Lone Operative ability."
      }
    ],
    "specialAbilities": [
      {
        "name": "Daemonic Allegiance",
        "text": "When you select this model to include in your army, you must select one of the keywords below. Until the end of the battle, this model has that keyword and the characteristic modifier stated for that keyword below."
      },
      {
        "name": "Khorne",
        "text": "Add 2 to the Strength characteristic of this model's hellforged weapons."
      },
      {
        "name": "Tzeentch",
        "text": "Add 3 to the Attacks characteristic of its infernal cannon."
      },
      {
        "name": "Nurgle",
        "text": "Add 1 to its Toughness characteristic."
      },
      {
        "name": "Slaanesh",
        "text": "Add 2\" to its Move characteristic."
      }
    ],
    "composition": [
      "1 Heretic Astartes Daemon Prince"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "keywords": [
      "Chaos",
      "Character",
      "Monster",
      "Daemon Prince",
      "Daemon"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "heretic-astartes-daemon-prince-with-wings",
    "name": "Heretic Astartes Daemon Prince With Wings",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "The final form of those who give up their souls to the Dark Gods can be infinite in variety. From some, dark wings burst from their churning flesh, a hideous blessing that enables these monstrous warrior-lords to hunt down those who seek to flee their bestial wrath.",
    "profiles": [
      {
        "name": "Heretic Astartes Daemon Prince With Wings",
        "m": "12\"",
        "t": "9",
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
        "tags": [],
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
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Daemonic Destruction",
        "text": "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each of this model’s remaining wounds: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds)."
      },
      {
        "name": "Flying Horror",
        "text": "Each time this model ends a Normal or Advance move, select one enemy unit it moved over during that move. That unit must take a Battle-shock test."
      }
    ],
    "specialAbilities": [
      {
        "name": "Daemonic Allegiance",
        "text": "When you select this model to include in your army, you must select one of the keywords below. Until the end of the battle, this model has that keyword and the characteristic modifier stated for that keyword below."
      },
      {
        "name": "Khorne",
        "text": "Add 2 to the Strength characteristic of this model's hellforged weapons."
      },
      {
        "name": "Tzeentch",
        "text": "Add 3 to the Attacks characteristic of its infernal cannon."
      },
      {
        "name": "Nurgle",
        "text": "Add 1 to its Toughness characteristic."
      },
      {
        "name": "Slaanesh",
        "text": "Add 2\" to its Move characteristic."
      }
    ],
    "composition": [
      "1 Heretic Astartes Daemon Prince with Wings"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "keywords": [
      "Daemon Prince with Wings",
      "Daemon",
      "Chaos",
      "Character",
      "Monster",
      "Fly"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "huron-blackheart",
    "name": "Huron Blackheart",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "Reviled as the Tyrant of Badab, Huron directs the pitiless reaving of his Red Corsairs with the ruthlessness of a pirate king, while accompanied by his esoteric Hamadrya. His Tyrant’s Claw is a bionic relic whose crackling talons tear through armour before the inbuilt incineration unit unleashes gouts of sulphurous fire.",
    "profiles": [
      {
        "name": "Huron Blackheart",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Tyrant’s Claw heavy flamer",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+2",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Tyrant’s Claw and exalted power weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Lord of Badab (Aura)",
        "text": "While a friendly Heretic Astartes Infantry unit (excluding Battle-shocked units and Damned units) is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Hamadrya’s Knowledge (Psychic)",
        "text": "Once per battle round, when an enemy unit ends a Normal, Advance or Fall Back move within 8\" of this model’s unit, if this model’s unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to D3+3\"."
      }
    ],
    "composition": [
      "1 Huron Blackheart – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Tyrant’s Claw heavy flamer; Tyrant’s Claw and exalted power weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chaos Terminator Squad",
        "Chosen",
        "Red Corsairs Raiders",
        "Masters of the Maelstrom",
        "Legionaries"
      ]
    },
    "keywords": [
      "Chaos Undivided",
      "Huron Blackheart",
      "Infantry",
      "Character",
      "Epic Hero",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "khorne-lord-of-skulls",
    "name": "Khorne Lord Of Skulls",
    "points": [
      {
        "models": 1,
        "points": 450,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 475,
        "note": "2nd+"
      }
    ],
    "flavor": "Lords of Skulls are insane, monolithic creations fuelled by boiling blood and dedicated to slaughtering in the name of Khorne. They plough through the enemy’s ranks, crushing infantry beneath their tracks, hacking tanks into kindling with sweeps of their cleaver and hurling brazen projectiles or burning ichor at the survivors.",
    "profiles": [
      {
        "name": "Khorne Lord Of Skulls",
        "m": "8\"",
        "t": "13",
        "sv": "3+",
        "w": "24",
        "ld": "6+",
        "oc": "8",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Daemongore cannon",
        "tags": [
          "BLAST"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "Gorestorm cannon",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hades gatling cannon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "48\"",
        "a": "12",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ichor cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Skullhurler",
        "tags": [],
        "range": "60\"",
        "a": "2D6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Great cleaver of Khorne – strike",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "16",
        "ap": "-4",
        "d": "8"
      },
      {
        "name": "Great cleaver of Khorne – sweep",
        "tags": [],
        "a": "15",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Plough Through the Enemy",
        "text": "In the Fight phase, after this model has finished making its attacks, if this model destroyed one or more enemy units this phase, each enemy unit within 6\" of this model must take a Battle-shock test."
      }
    ],
    "damaged": {
      "note": "1-8 wounds remaining",
      "text": "While this model has 1-8 wounds remaining, subtract 4 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Khorne Lord of Skulls"
    ],
    "loadout": "**This model is equipped with:** gorestorm cannon; Hades gatling cannon; great cleaver of Khorne.",
    "options": [
      "This model’s gorestorm cannon can be replaced with one of the following:\n▪ 1 daemongore cannon\n▪ 1 ichor cannon",
      "This model’s Hades gatling cannon can be replaced with 1 skullhurler."
    ],
    "keywords": [
      "Khorne",
      "Vehicle",
      "Titanic",
      "Towering",
      "Chaos",
      "Daemon",
      "Lord of Skulls",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "kravek-morne",
    "name": "Kravek Morne",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "A being of adamant and singular purpose, Warsmith Kravek Morne is a living weapon in service to the Daemon Primarch Perturabo. With a will powerful enough to dominate even the insane Obliterators and Mutilators, Morne leads attacks by hulking elite warriors to break open enemy battle lines and fortress gates alike.",
    "profiles": [
      {
        "name": "",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Baleflamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Combi-bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Last Argument and power fist",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Servo-harness",
        "tags": [
          "EXTRA ATTACKS",
          "ANTI-VEHICLE 2+"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Headlong Destruction",
        "text": "Each time a model in this unit makes an attack that targets the closest eligible enemy unit, improve the Armour Penetration characteristic of that attack by 1."
      },
      {
        "name": "Architect of Ruin",
        "text": "At the start of the battle, select one unit in your opponent’s army to be this model’s hated foe. Each time this model makes an attack that targets its hated foe, you can re-roll the Wound roll. Each time this model’s hated foe is destroyed, you can select a new unit from your opponent’s army to be its hated foe."
      }
    ],
    "composition": [
      "1 Kravek Morne – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** baleflamer; combi-bolter; servo-harness; Last Argument and power fist.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chaos Terminator Squad",
        "Mutilators",
        "Obliterators"
      ]
    },
    "keywords": [
      "Terminator",
      "Infantry",
      "Character",
      "Epic Hero",
      "Kravek Morne",
      "Chaos",
      "Chaos Undivided"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "legionaries",
    "name": "Legionaries",
    "points": [
      {
        "models": 5,
        "points": 90
      },
      {
        "models": 10,
        "points": 170
      }
    ],
    "flavor": "Against the onslaught of Chaos Legionaries, few can stand for long. Whether millennia-old veterans of the Long War or traitors from renegade warbands, Legionaries are deadly and adaptable warriors, unleashing streams of explosive bolts or venting their vicious hatred with swings of rending chainswords.",
    "profiles": [
      {
        "name": "Legionaries",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Balefire tome",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Boltgun",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flamer",
        "tags": [
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
        "name": "Havoc autocannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
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
        "name": "Lascannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
      },
      {
        "name": "Reaper chaincannon",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Heavy melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Veterans of the Long War",
        "text": "Each time a model in this unit targets an enemy unit with a melee attack, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Icon",
        "text": "Each time the bearer’s unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test."
      }
    ],
    "composition": [
      "1 Aspiring Champion",
      "4-9 Legionaries"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "The Aspiring Champion’s boltgun can be replaced with one of the following:\n▪ 1 plasma pistol*\n▪ 1 accursed weapon\n▪ 1 Astartes chainsword\n▪ 1 heavy melee weapon\n* Maximum 1 per model.",
      "The Aspiring Champion’s bolt pistol can be replaced with one of the following:\n▪ 1 plasma pistol*\n▪ 1 accursed weapon\n▪ 1 Astartes chainsword\n▪ 1 heavy melee weapon\n* Maximum 1 per model.",
      "1 model can be equipped with 1 Chaos icon.",
      "Any number of Legionaries can each have their boltgun replaced with 1 Astartes chainsword.",
      "One Legionary’s boltgun can be replaced with 1 heavy melee weapon.",
      "One Legionary’s boltgun can be replaced with 1 balefire tome.",
      "For every 5 models in this unit, 1 Legionary’s boltgun can be replaced with one of the following (duplicates are not allowed):\n▪ 1 plasma pistol and 1 Astartes chainsword\n▪ 1 flamer\n▪ 1 havoc autocannon\n▪ 1 heavy bolter\n▪ 1 lascannon\n▪ 1 meltagun\n▪ 1 missile launcher\n▪ 1 plasma gun\n▪ 1 reaper chaincannon",
      "* Maximum 1 per model."
    ],
    "keywords": [
      "Grenades",
      "Chaos",
      "Battleline",
      "Legionaries",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "lord-discordant-on-helstalker",
    "name": "Lord Discordant On Helstalker",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Technocrats and spirit-thieves, Lords Discordant hunt the foe’s war engines. Atop daemonic Helstalkers, these heretics cut through enemy infantry before lunging at their quarry with saw-toothed polearms. Each mount tears its mechanical prey open as the Lord Discordant siphons off the victim’s spirit to reinvigorate other Daemon Engines.",
    "profiles": [
      {
        "name": "Lord Discordant On Helstalker",
        "m": "14\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Baleflamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Helstalker autocannon",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "2+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Magma cutter",
        "tags": [
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Bladed limbs",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Impaler chainglaive",
        "tags": [
          "LANCE"
        ],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Techno-virus injector",
        "tags": [
          "ANTI-VEHICLE 2+",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "3",
        "ap": "-3",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Corrupt Machine Spirits",
        "text": "At the start of your Shooting phase, select one visible enemy VEHICLE unit within 12\" of this model and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds."
      },
      {
        "name": "Spirit Thief",
        "text": "At the start of your Shooting phase, select one visible enemy **VEHICLE** unit. Until the end of the phase, each time a friendly **HERETIC ASTARTES** model makes an attack that targets that unit, re-roll a Wound roll of 1."
      }
    ],
    "composition": [
      "1 Lord Discordant on Helstalker"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Helstalker autocannon; techno-virus injector; bladed limbs; impaler chainglaive.",
    "options": [
      "This model’s Helstalker autocannon can be replaced with 1 baleflamer.",
      "This model’s techno-virus injector can be replaced with 1 magma cutter."
    ],
    "keywords": [
      "Character",
      "Daemon",
      "Lord Discordant",
      "Chaos",
      "Mounted"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "master-of-executions",
    "name": "Master Of Executions",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "These corrupted axemen are the executioners of Heretic Astartes warbands. Able to perceive the empyric soul-stuff of the foe’s greatest champions, they single-mindedly seek them out in battle, bellowing a fatal decree before crashing forward and hacking through armour, flesh and bone.",
    "profiles": [
      {
        "name": "Master Of Executions",
        "m": "6\"",
        "t": "4",
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
        "name": "Axe of dismemberment",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warp-sighted Butcher",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack that targets a unit that is below its Starting Strength, you can re-roll the Hit roll. If that unit is Below Half-strength, you can re-roll the Wound roll as well."
      },
      {
        "name": "Trophy Taker",
        "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
      }
    ],
    "composition": [
      "1 Master of Executions"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; axe of dismemberment.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Legionaries",
        "Nemesis Claw",
        "Red Corsairs Raiders"
      ],
    },
    "keywords": [
      "Character",
      "Infantry",
      "Grenades",
      "Chaos",
      "Master of Executions"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "master-of-possession",
    "name": "Master Of Possession",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Masters of Possession are psykers who specialise in channelling daemons into living hosts; they bolster their possessed kin with empyric energies that strengthen and reinvigorate such tainted unions. In battle, they unleash daemonic forces into the foe, ripping apart their souls to channel them to greater use.",
    "profiles": [
      {
        "name": "Master Of Possession",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Rite of Possession – witchfire",
        "tags": [
          "ANTI-PSYKER 2+",
          "PISTOL",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Rite of Possession – focused witchfire",
        "tags": [
          "ANTI-PSYKER 2+",
          "HAZARDOUS",
          "PISTOL",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Staff of possession",
        "tags": [
          "ANTI-PSYKER 2+",
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Daemonkin (Psychic)",
        "text": "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit."
      },
      {
        "name": "Sacrificial Dagger",
        "text": "Once per phase, when this model is selected to shoot or fight, it can use this ability. If it does, this model’s unit suffers 1 mortal wound and, until the end of the phase, each time this model makes a Psychic Attack, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1 Master of Possession"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Rite of Possession; staff of possession.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Legionaries",
        "Possessed",
        "Nemesis Claw",
        "Red Corsairs Raiders"
      ]
    },
    "keywords": [
      "Psyker",
      "Master of Possession",
      "Character",
      "Infantry",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "masters-of-the-maelstrom",
    "name": "Masters of the Maelstrom",
    "points": [
      {
        "models": 5,
        "points": 145
      }
    ],
    "flavor": "These lieutenants of Huron Blackheart stand within the circle of their master’s trust, a position both privileged and dangerous. When they gather to fight in their lord’s shadow, they epitomise the cruelty, cunning and piratical tactics that have made the Red Corsairs such a mighty power in the Maelstrom and beyond.",
    "profiles": [
      {
        "name": "GARLON SOULEATER, GARREON THE CORPSEMASTER, KATAR GARRIX",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "baseSize": "40mm"
      },
      {
        "name": "CAPTAIN SARGOTTA, THE ENFORCER",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "baseSize": "40mm / 32mm"
      }
    ],
    "ranged": [
      {
        "name": "Absolvor bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Laspistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Londaxi maimer",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Mind Wrench",
        "tags": [
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Axe of Ending",
        "tags": [
          "ANTI-CHARACTER 2+",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Bionic gauntlet",
        "tags": [],
        "a": "1",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Force stave",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power sabre",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Reductor array",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Choice Samples",
        "text": "While this unit’s Garreon the Corpsemaster is on the battlefield, in your Command phase, select one of the following: you can return 1 destroyed model (excluding CHARACTER models) to this unit, or, if one or more Heretic Astartes Infantry units from your army are below Starting Strength and within 3\" of this unit, you gain 1CP."
      },
      {
        "name": "Fleet Command",
        "text": "After both players have deployed their armies, if this unit is on the battlefield (or any Transport it is embarked within is on the battlefield) select up to three HERETIC ASTARTES units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      },
      {
        "name": "Plunder",
        "text": "Once per battle, after this unit ends a Normal move, you can select one visible enemy unit within 12\" of it and roll one D6: on a 2+, that enemy unit suffers D3+1 mortal wounds."
      }
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Legionaries",
        "Red Corsairs Raiders"
      ],
      "footer": "* This unit cannot join an Attached unit, and only HURON BLACKHEART can join a unit this unit has joined."
    },
    "composition": [
      "1 Garreon the Corpsemaster – EPIC HERO",
      "1 Garlon Souleater – EPIC HERO",
      "1 Katar Garrix – EPIC HERO",
      "1 Captain Sargotta – EPIC HERO",
      "1 The Enforcer – EPIC HERO"
    ],
    "loadout": "**Garreon the Corpsemaster is equipped with:** absolvor bolt pistol; reductor array.\n\n**Garlon Souleater is equipped with:** Mind Wrench; force stave.\n\n**Katar Garrix is equipped with:** bolt pistol; Axe of Ending.\n\n**Captain Sargotta is equipped with:** laspistol; power sabre.\n\n**The Enforcer is equipped with:** Londaxi maimer; bionic gauntlet.",
    "keywords": [
      "Psyker",
      "Chaos Undivided",
      "Chaos",
      "Grenades",
      "Epic Hero",
      "Infantry",
      "Masters of the Maelstrom"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
  },
  {
    "id": "maulerfiend",
    "name": "Maulerfiend",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "Maulerfiends stalk the battlefield like immense hunting beasts. Once the enemy are in sight, these huge Daemon Engines thunder forward, even scaling defensive walls in their eagerness to get at the prey. Once amongst the foe, they slaughter anything in reach with their huge talons, crushing jaws and stabbing tendrils.",
    "profiles": [
      {
        "name": "Maulerfiend",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Magma cutters",
        "tags": [
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Lasher tendrils",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Maulerfiend fists",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "14",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Siege Crawler",
        "text": "You can ignore any or all modifiers to this model’s Move characteristic and to Advance and Charge rolls made for it."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Maulerfiend"
    ],
    "loadout": "**This model is equipped with:** lasher tendrils; Maulerfiend fists.",
    "options": [
      "This model’s lasher tendrils can be replaced with 2 magma cutters."
    ],
    "keywords": [
      "Maulerfiend",
      "Daemon",
      "Chaos",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "mutilators",
    "name": "Mutilators",
    "points": [
      {
        "models": 3,
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "The grotesque, warp-saturated forms of Mutilators shift at will, sprouting oversized close-combat weapons and mutant siege appendages depending on the foes they face. Bursting from amidst coruscating teleportation flares, the hulking brutes charge headlong into their shocked victims to butcher everything within arm’s reach.",
    "profiles": [
      {
        "name": "Mutilators",
        "m": "5\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Fleshmetal weapons - clawed sweeps",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Fleshmetal weapons - rending strikes",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Fleshmetal weapons - thunderous blows",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6+2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Crushing Charge",
        "text": "You can re-roll charge rolls made for this unit, and each time this unit makes a Charge move, select one enemy unit and roll one D6 for each model in this unit that is within Engagement Range of that unit: for each 4+, that enemy unit suffers D3 mortal wounds."
      }
    ],
    "composition": [
      "3 Mutilators"
    ],
    "loadout": "**Every model is equipped with:** 1 fleshmetal weapons.",
    "options": [
      "None"
    ],
    "keywords": [
      "Daemon",
      "Mutilators",
      "Infantry",
      "Chaos"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "nemesis-claw",
    "name": "Nemesis Claw",
    "points": [
      {
        "models": 5,
        "points": 100
      },
      {
        "models": 10,
        "points": 180
      }
    ],
    "flavor": "Nemesis Claws are squads of Night Lords consumed by murderlust and sadism that are employed as terror troops by Chaos warlords the galaxy over. These psychopathic killers use an array of dread weaponry and ghoulish equipment to inflict fear, misery and violent death upon their foes.",
    "profiles": [
      {
        "name": "Legionaries",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Boltgun",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flamer",
        "tags": [
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
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
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
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Nostraman chainblade",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Nostraman chainglaive",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Paired accursed weapons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Stealth",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Visions of Suffering (Psychic)",
        "text": "Each time a model in this unit makes an attack that targets an enemy unit that is below its Starting Strength, add 1 to the Hit roll. If that enemy unit is Below Half-strength, add 1 to the Wound roll as well."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Voice Eater",
        "text": "Enemy units (excluding MONSTERS and VEHICLES) cannot be targeted with Stratagems while they are within Engagement Range of the bearer’s unit."
      }
    ],
    "composition": [
      "1 Visionary",
      "4-9 Legionaries"
    ],
    "loadout": "**The Visionary is equipped with:** bolt pistol; Nostraman chainblade.\n\n**Each Legionary is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "The Visionary’s bolt pistol can be replaced with 1 plasma pistol.",
      "The Visionary’s Nostraman chainblade can be replaced with one of the following:\n▪ 1 accursed weapon\n▪ 1 power fist",
      "Any number of Legionaries can each have their boltgun replaced with 1 Astartes chainsword.",
      "If this unit contains 10 models, one Legionary’s boltgun can be replaced with one of the following:\n▪ 1 heavy bolter\n▪ 1 missile launcher",
      "One Legionary’s boltgun can be replaced with one of the following:\n▪ 1 flamer\n▪ 1 meltagun\n▪ 1 plasma gun",
      "Up to four Legionaries can each have their boltgun replaced with one of the following (duplicates are not allowed):\n▪ 1 accursed weapon\n▪ 1 Nostraman chainglaive\n▪ 1 paired accursed weapons\n▪ 1 voice eater and 1 Astartes chainsword"
    ],
    "keywords": [
      "Infantry",
      "Psyker",
      "Chaos",
      "Grenades",
      "Nemesis Claw"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army with the Leader ability (excluding Epic Heroes) can be attached to a Legionaries unit, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "noctilith-crown",
    "name": "Noctilith Crown",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Wreathed in fluctuating, eldritch energies, Noctilith Crowns are ritual loci of empyric power. They draw in the raw energy of Chaos itself, forming nodal strongholds of the Dark Gods’ influence that empower their fell servants and wrack their enemies with lashes of baleful warp magicks.",
    "profiles": [
      {
        "name": "Noctilith Crown",
        "m": "-",
        "t": "11",
        "sv": "3+",
        "w": "14",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Lashing warp energies",
        "tags": [],
        "range": "6\"",
        "a": "8",
        "bs": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Malevolent Locus (Aura)",
        "text": "While a friendly **HERETIC ASTARTES** unit is within 9\" of this **FORTIFICATION**, improve that unit’s Leadership characteristic by 1."
      },
      {
        "name": "Malign Cover",
        "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is only within Engagement Range of one or more **FORTIFICATIONS** from your army: ■ That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll. ■ Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so."
      }
    ],
    "composition": [
      "1 Noctilith Crown"
    ],
    "loadout": "**This model is equipped with:** lashing warp energies.",
    "keywords": [
      "Noctilith Crown",
      "Chaos",
      "Fortification",
      "Frame"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "obliterators",
    "name": "Obliterators",
    "points": [
      {
        "models": 2,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Hulking, baroque meldings of Chaos Space Marine, daemon-infused armour and mutated weaponry, Obliterators are able to reshape their forms from moment to moment. Stepping directly from warp fissures into ideal firing positions, they sweep all before them with warp-tainted firestorms.",
    "profiles": [
      {
        "name": "Obliterators",
        "m": "4\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Fleshmetal guns – focused malice",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Fleshmetal guns – ruinous salvo",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Fleshmetal guns – warp hail",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Crushing fists",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warp Rift Firepower",
        "text": "Once per battle, during the shooting phase, this unit can use this ability. If it does, until the end of the phase, ranged weapons models in this unit are equipped with have the **[INDIRECT FIRE]** ability."
      }
    ],
    "composition": [
      "2 Obliterators"
    ],
    "loadout": "**Every model is equipped with:** fleshmetal guns; crushing fists.",
    "keywords": [
      "Obliterators",
      "Infantry",
      "Chaos",
      "Daemon"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "possessed",
    "name": "Possessed",
    "points": [
      {
        "models": 5,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 260,
        "note": "3rd+"
      }
    ],
    "flavor": "In blasphemous union with fell daemons of the Chaos Gods, Possessed are bestial slaughter incarnate. Warped and mutated by their empyric parasites, their armoured forms flow like wax. As talons, snapping maws and vestigial wings manifest, they unleash an unholy orgy of bloodshed.",
    "profiles": [
      {
        "name": "Possessed",
        "m": "9\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Hideous mutations",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Unholy Bloodshed",
        "text": "Once per battle, when this unit makes a Dark Pact, until the end of the phase, weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Icon",
        "text": "Each time the bearer’s unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test."
      }
    ],
    "composition": [
      "1 Possessed Champion",
      "4-9 Possessed"
    ],
    "loadout": "**Every model is equipped with:** hideous mutations.",
    "options": [
      "1 model can be equipped with 1 Chaos icon."
    ],
    "keywords": [
      "Possessed",
      "Daemon",
      "Chaos",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "raptors",
    "name": "Raptors",
    "points": [
      {
        "models": 5,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 210,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 220,
        "note": "3rd+"
      }
    ],
    "flavor": "A subculture of sky warriors that cuts across Legion boundaries, Raptors hunt like avian predators and are unified by the thrill of the chase. With screeching battle cries amplified to terrify their prey, they descend in meteoric charges, a flurry of reaping blades and intense, short-ranged firepower.",
    "profiles": [
      {
        "name": "Raptors",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Flamer",
        "tags": [
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
      }
    ],
    "melee": [
      {
        "name": "Accursed weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Heavy melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Mutations",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Fearsome (Aura)",
        "text": "While an enemy unit is within 6\" of this unit, each time that enemy unit takes a Battle-shock or Leadership test, subtract 1 from the result."
      },
      {
        "name": "Terrifying Assault",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Raptor Champion",
      "4-9 Raptors"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Raptor Champion’s bolt pistol can be replaced with 1 plasma pistol.",
      "The Raptor Champion’s Astartes chainsword can be replaced with one of the following:\n▪ 1 accursed weapon\n▪ 1 heavy melee weapon",
      "For every 5 models in this unit, up to 2 Raptors can each have their bolt pistol replaced with 1 plasma pistol (these models’ Astartes chainswords cannot be replaced).",
      "For every 5 models in this unit, up to 2 Raptors can each have their Astartes chainsword replaced with 1 heavy melee weapon.",
      "For every 5 models in this unit, 1 Raptor can replace their Astartes chainsword with 1 mutations.",
      "Up to 2 Raptors can each have their Astartes chainsword replaced with one of the following options (you cannot select the same option more than once):\n▪ 1 flamer and 1 close combat weapon\n▪ 1 meltagun and 1 close combat weapon\n▪ 1 plasma gun and 1 close combat weapon",
      "If this unit contains 10 models, up to 2 additional Raptors can each have their Astartes chainsword replaced with one of the following options (you cannot select the same option more than once):\n▪ 1 flamer and 1 close combat weapon\n▪ 1 meltagun and 1 close combat weapon\n▪ 1 plasma gun and 1 close combat weapon"
    ],
    "keywords": [
      "Chaos",
      "Fly",
      "Grenades",
      "Infantry",
      "Jump Pack",
      "Raptors"
        ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "red-corsairs-raiders",
    "name": "Red Corsairs Raiders",
    "points": [
      {
        "models": 5,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 210,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 220,
        "note": "3rd+"
      }
    ],
    "flavor": "Ruthless and cruel even by the standards of Renegade Space Marines, Red Corsairs Raiders excel in hit-and-run attacks. They fight with cunning brutality, maiming their victims to be taken as captives or looting dying foes even before their life blood has stopped jetting from their ragged wounds.",
    "profiles": [
      {
        "name": "",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Boltgun",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hand flamer",
        "tags": [
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
      }
    ],
    "melee": [
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Reaver’s blade",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Trophy Takers",
        "text": "The first time this unit destroys an enemy unit, until the end of the battle, while this unit is not Battle-shocked, add 1 to the Objective Control characteristic of models in this unit."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army with the Leader ability can be attached to a Legionaries unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Red Corsairs Raider Champion",
      "4-9 Red Corsairs Raiders"
    ],
    "loadout": "**Each model is equipped with:** boltgun; bolt pistol; reaver’s blade.",
    "options": [
      "The Red Corsairs Raider Champion’s bolt pistol can be replaced with 1 hand flamer.",
      "For every 5 models in this unit:\n▪ 1 Red Corsairs Raider’s boltgun can be replaced with 1 meltagun\n▪ 1 Red Corsairs Raider’s reaver’s blade can be replaced with 1 power fist"
    ],
    "keywords": [
      "Chaos",
      "Grenades",
      "Infantry",
      "Red Corsairs Raiders"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "red-corsairs-reave-captain",
    "name": "Red Corsairs Reave-Captain",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Renegade warlords and lieutenants, the Reave Captains of the Red Corsairs are masters of underhanded warfare. Combining the strategic nous of loyalist Space Marine commanders with the viciousness of the Heretic Astartes, these merciless war leaders exploit their foes’ every weakness and leave none alive.",
    "profiles": [
      {
        "name": "",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
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
        "name": "Power maul",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power sword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Brutal Raider",
        "text": "Each time this model’s unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by this model and improve the Armour Penetration characteristics of those weapons by 1."
      },
      {
        "name": "Raider’s Due",
        "text": "When this unit **declares a charge**, If an enemy unit within range of an **objective** is within 12\" of this unit, you can use this ability. If you do: This unit can re-roll that **charge roll**. This unit must end that **charge move engaged** with one or more of those enemy units."
      }
    ],
    "composition": [
      "1 Red Corsairs Reave-Captain"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; power sword.",
    "options": [
      "This model’s power sword can be replaced with 1 power maul.",
      "This model can be equipped with 1 plasma pistol."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Nemesis Claw",
        "Legionaries",
        "Red Corsairs Raiders"
      ]
    },
    "keywords": [
      "Chaos",
      "Character",
      "Infantry",
      "Red Corsairs Reave-captain"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sorcerer",
    "name": "Sorcerer",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Sorcerers are the Heretic Astartes’ battle-psykers and warp-seers. Wielding terrifying empyric energies, with but a thought they can crush a foe’s skull, curse their enemies with abhorrent hexes or hurl coruscating bolts of soul-blasting psychic power that mutate those they touch.",
    "profiles": [
      {
        "name": "Sorcerer",
        "m": "6\"",
        "t": "4",
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
        "name": "Infernal Gaze – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Infernal Gaze – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Force weapon",
        "tags": [
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
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Prescience (Psychic)",
        "text": "While this model is leading a unit, each time an attack targets that unit, subtract 1 from the Hit roll."
      },
      {
        "name": "Gift of Chaos (Psychic)",
        "text": "Each time this model is selected to shoot or fight, after resolving its attacks, select one enemy unit hit by one or more of those attacks that had the [PSYCHIC] ability. That unit must take a Leadership test: if that test is failed, that unit suffers D3 mortal wounds."
      }
    ],
    "composition": [
      "1 Sorcerer"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Infernal Gaze; force weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chosen",
        "Legionaries",
        "Nemesis Claw",
        "Red Corsairs Raiders"
      ]
    },
    "keywords": [
      "Character",
      "Psyker",
      "Chaos",
      "Grenades",
      "Sorcerer",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sorcerer-in-terminator-armour",
    "name": "Sorcerer In Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The powers of a warband’s Sorcerers lend a sickening occult advantage to elite infantry spearheads. Girded in warsuits of sigil-etched Terminator armour, they are able to support gruelling boarding actions, assault through daemon-haunted labyrinths or fight on the front line against swarming, ignorant loyalists.",
    "profiles": [
      {
        "name": "Sorcerer In Terminator Armour",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
        "tags": [
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
        "name": "Infernal Gaze – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Infernal Gaze – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warptime (Psychic)",
        "text": "While this model is leading a unit, you can re-roll Advance and Charge rolls made for that unit."
      },
      {
        "name": "Death Hex (Psychic)",
        "text": "At the start of your Shooting phase, one Psyker with this ability can use it. If it does, select one enemy unit within 12\" of and visible to that PSYKER and roll one D6: on a 1, that PSYKER’s unit suffers D3 mortal wounds; on a 2+, until the start of your next Movement phase, each time an attack targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Chaos Familiar",
        "text": "Once per battle, when an attack is allocated to the bearer, you can change the Damage characteristic to 0."
      }
    ],
    "composition": [
      "1 Sorcerer in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** combi-bolter; Infernal Gaze; force weapon.",
    "options": [
      "This model’s combi-bolter can be replaced with 1 combi-weapon.",
      "This model can be equipped with 1 Chaos familiar."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Chaos Terminator Squad"
      ]
    },
    "keywords": [
      "Terminator",
      "Infantry",
      "Character",
      "Psyker",
      "Chaos",
      "Sorcerer in Terminator Armour"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "traitor-enforcer",
    "name": "Traitor Enforcer",
    "points": [
      {
        "models": 2,
        "points": 70
      }
    ],
    "flavor": "Whether petty tyrants who killed their way to dominance, or former officers brought low through corruption, Enforcers are now sadistic disciplinarians amongst the Militarum Traitoris. Some cement their position by exploiting savage Traitor Ogryns as living shields, crude line-breakers and added muscle to help impose their violent rule.",
    "profiles": [
      {
        "name": "TRAITOR ENFORCER",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "invNote": "* Traitor Enforcer model only.",
        "baseSize": "32mm"
      },
      {
        "name": "TRAITOR OGRYN",
        "m": "6\"",
        "t": "6",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "baseSize": "40mm"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
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
        "name": "Ogryn weapons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Brutal Example",
        "text": "Once per turn, while this unit is leading a unit and contains a TRAITOR ENFORCER model, you can target that unit with the Fire Overwatch Stratagem for 0CP, and can do so even if you have already targeted a different unit from your army with that Stratagem this turn. Each time you use this ability, one Bodyguard model in that unit is destroyed."
      },
      {
        "name": "Mutated Bodyguard",
        "text": "While this unit contains a Traitor Ogryn model, CHARACTER models in this unit have the Feel No Pain 4+ ability."
      }
    ],
    "composition": [
      "1 Traitor Enforcer",
      "1 Traitor Ogryn"
    ],
    "loadout": "**The Traitor Enforcer is equipped with:** bolt pistol; power fist.\n\n**The Traitor Ogryn is equipped with:** Ogryn weapons.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Traitor Guardsmen Squad"
      ]
    },
    "keywords": [
      "Chaos",
      "Grenades",
      "Infantry",
      "Damned",
      "Character",
      "Traitor Enforcer"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ]
  },
  {
    "id": "traitor-guardsmen-squad",
    "name": "Traitor Guardsmen Squad",
    "points": [
      {
        "models": 10,
        "points": 70
      }
    ],
    "flavor": "Amongst the mortal followers of the Heretic Astartes are warbands of Traitor Guardsmen. These heretics turn mass-produced lasguns and more specialised weapons upon the Imperium they once served, while their military training combines with bitterness and hate to render them a potent threat.",
    "profiles": [
      {
        "name": "Traitor Guardsmen Squad",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [
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
        "name": "Corrupted pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cultist grenade launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cultist grenade launcher – krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Cultist sniper rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Flamer",
        "tags": [
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
        "name": "Lasgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
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
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma gun – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
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
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Twisted Defence Force",
        "text": "While this unit is within range of an objective, this unit has +1 Sv against ranged attacks."
      }
    ],
    "composition": [
      "1 Traitor Sergeant",
      "9 Traitor Guardsmen"
    ],
    "loadout": "**The Traitor Sergeant is equipped with:** corrupted pistol; close combat weapon.\n\n**Every Traitor Guardsman is equipped with:** lasgun; close combat weapon.",
    "options": [
      "Up to 3 Traitor Guardsmen can each have their lasgun replaced with one of the following (duplicates are not allowed):\n▪ 1 Cultist grenade launcher\n▪ 1 flamer\n▪ 1 meltagun\n▪ 1 plasma gun\n▪ 1 Cultist sniper rifle",
      "The Traitor Sergeant’s close combat weapon can be replaced with one of the following:\n▪ 1 chainsword\n▪ 1 power weapon",
      "The Traitor Sergeant’s corrupted pistol can be replaced with 1 boltgun."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Chaos",
      "Damned",
      "Traitor Guardsmen Squad"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "vashtorr-the-arkifane",
    "name": "Vashtorr The Arkifane",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "flavor": "Vashtorr is a horror of pallid flesh stretched over infernal mechanisms. He soars to battle amidst a cloud of dark lightning and smog, dealing destruction and unleashing techno-gheist curses upon the foe even as he fashions enhancements for his indentured Daemon Engines from the raw stuff of realspace.",
    "profiles": [
      {
        "name": "Vashtorr The Arkifane",
        "m": "12\"",
        "t": "10",
        "sv": "2+",
        "w": "14",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Vashtorr’s claw",
        "tags": [
          "ANTI-VEHICLE 4+",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Vashtorr’s hammer – strike",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Vashtorr’s hammer – sweep",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "a": "12",
        "ws": "2+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Unholy Mechanisms (Aura)",
        "text": "While a friendly Daemon Vehicle unit is within 6\" of this model, add 2 to the Strength characteristic of weapons equipped by models in that unit."
      },
      {
        "name": "Reorder Reality",
        "text": "Each time an enemy unit within 18\" of this model targets this model, subtract 1 from the Hit roll and, until the end of the phase, that enemy unit’s ranged weapons have the [HAZARDOUS] ability."
      },
      {
        "name": "Indentured Daemon Engines",
        "text": "While this model is within 3\" of one or more friendly Daemon Vehicle units, this model has the Lone Operative ability."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Vashtorr the Arkifane – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Vashtorr’s claw; Vashtorr’s hammer.",
    "keywords": [
      "Fly",
      "Chaos",
      "Vashtorr the Arkifane",
      "Epic Hero",
      "Daemon",
      "Monster",
      "Character"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "venomcrawler",
    "name": "Venomcrawler",
    "points": [
      {
        "models": 1,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 120,
        "note": "3rd+"
      }
    ],
    "flavor": "These arachnoid amalgams of daemon flesh, cursed iron and malignant sentience pound across war zones in search of bodies to tear and spirits to consume. After butchering the prey with their excruciator cannons, claws and lashing tendrils, they draw the souls of the slain into their abdomens.",
    "profiles": [
      {
        "name": "Venomcrawler",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "9",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Excruciator cannon",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Soulflayer tendrils and claws",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Soul Eater",
        "text": "At the end of the Fight phase, if one or more attacks made by this model this phase destroyed one or more enemy units, until the end of the battle, add 1 to the Attacks characteristic of this model’s weapons."
      }
    ],
    "composition": [
      "1 Venomcrawler"
    ],
    "loadout": "**This model is equipped with:** 2 excruciator cannons; soulflayer tendrils and claws.",
    "keywords": [
      "Daemon",
      "Chaos",
      "Walker",
      "Vehicle",
      "Venomcrawler"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "warp-talons",
    "name": "Warp Talons",
    "points": [
      {
        "models": 5,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 280,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 135,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 290,
        "note": "3rd+"
      }
    ],
    "flavor": "Often appearing from the Immaterium, wreathed in unholy fire and with their armour warped into daemonic likenesses, Warp Talons are tainted warriors who have fallen further than most. They are skyborne assassins, their flaming talons equally adept at slicing through armour or tearing through the fabric of realspace.",
    "profiles": [
      {
        "name": "Warp Talons",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Warp claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warp Strike",
        "text": "At the end of the Fight phase, if this unit destroyed one or more enemy units this phase and is not within Engagement Range of one or more enemy units, you can remove this unit from the battlefield and place it into Strategic Reserves."
      }
    ],
    "composition": [
      "1 Warp Talon Champion",
      "4-9 Warp Talons"
    ],
    "loadout": "**Every model is equipped with:** warp claws.",
    "options": [
      "None"
    ],
    "keywords": [
      "Chaos",
      "Daemon",
      "Fly",
      "Grenades",
      "Infantry",
      "Jump Pack",
      "Warp Talons"
        ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "warpsmith",
    "name": "Warpsmith",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "With outlawed knowledge of the deeper mysteries of the machine, Warpsmiths maintain their warband’s arsenal of armoured vehicles, and violate enemy war engines with utterances of corrupted code. Fused with a writhing nest of semi-sentient mechatendrils, they seek not only to employ technology, but to subjugate it.",
    "profiles": [
      {
        "name": "Warpsmith",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Flamer tendril",
        "tags": [
          "PISTOL",
          "TORRENT",
          "IGNORES COVER"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Melta tendril",
        "tags": [
          "PISTOL",
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-4",
        "d": "D3"
      },
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
          "PISTOL",
          "HAZARDOUS"
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
        "name": "Forge weapon",
        "tags": [
          "ANTI-VEHICLE 4+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Dark Pacts",
    "abilities": [
      {
        "name": "Warpsmith",
        "text": "While this model is within 3\" of one or more friendly Heretic Astartes Vehicle units, this model has the Lone Operative ability."
      },
      {
        "name": "Master of Mechanisms",
        "text": "In your Command phase, select one friendly Heretic Astartes Vehicle model within 3\" of this model. That VEHICLE model regains up to D3 lost wounds and, until the start of your next Command phase, each time that VEHICLE makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per Command phase."
      },
      {
        "name": "Enrage Machine Spirits",
        "text": "At the end of your Movement phase, select one enemy VEHICLE unit within 12\" of this model. That unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Warpsmith"
    ],
    "loadout": "**This model is equipped with:** flamer tendril; melta tendril; plasma pistol; forge weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Legionaries",
        "Havocs",
        "Red Corsairs Raiders",
        "Chosen",
        "Nemesis Claw"
      ]
    },
    "keywords": [
      "Character",
      "Grenades",
      "Chaos",
      "Warpsmith",
      "Infantry"
    ],
    "factionKeywords": [
      "Heretic Astartes"
    ],
    "baseSize": "60x35.5mm Oval Base"
  }
]
