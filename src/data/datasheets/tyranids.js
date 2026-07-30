// Tyranids — datasheets. Originally imported from the Wahapedia CSV exports
// (unit roster and points from src/data/mfm/tyranids.js); that importer has been retired.
// wh40k-appdata is the source of truth now — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "barbgaunts",
    "name": "Barbgaunts",
    "points": [
      {
        "models": 5,
        "points": 55
      },
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "Barbgaunts are little more than living weapons, their bodies and bio-cannons slaved to the will of a pulsating ganglio-parasite that piggybacks them into battle. There, they unleash volleys of chitinous barbs that detonate with the fury of violent muscle-spasms and transfix nearby victims with hails of jagged projectiles.",
    "profiles": [
      {
        "name": "Barbgaunts",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Barblauncher",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Disruption Bombardment",
        "text": "In your Shooting phase, after this unit has shot, select one enemy INFANTRY unit hit by one or more of those attacks. Until the end of your opponent’s next turn, that enemy unit is disrupted. While a unit is disrupted, subtract 2 from its Move characteristic and subtract 2 from Advance and Charge rolls made for it."
      }
    ],
    "composition": [
      "5-10 Barbgaunts"
    ],
    "loadout": "**Every model is equipped with:** barblauncher; chitinous claws and teeth.",
    "keywords": [
      "Barbgaunts",
      "Infantry",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "biovores",
    "name": "Biovores",
    "points": [
      {
        "models": 1,
        "points": 60
      },
      {
        "models": 2,
        "points": 100
      },
      {
        "models": 3,
        "points": 140
      }
    ],
    "flavor": "These living artillery pieces nurture a clutch of Spore Mines within their bodies. After anchoring themselves to the ground with their chitinous spurs, the creatures fire their living ammunition in high arcs, allowing the Spore Mines to drift languidly down into the midst of the foe where they detonate with sudden violence.",
    "profiles": [
      {
        "name": "Biovores",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Spore Mine launcher",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chitin-barbed limbs",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Seed Spore Mines",
        "text": "Once per turn, in your Shooting phase, when selected to shoot, one unit with this ability can use it instead of making any attacks with its ranged weapons. If it does, you can add one new Spore Mines unit to your army and set it up anywhere on the battlefield that is wholly within 48\" of this unit and more than 8\" horizontally away from all enemy units. That SPORE MINES unit contains 1 model for each model in this unit."
      }
    ],
    "composition": [
      "1-3 Biovores"
    ],
    "loadout": "**Every model is equipped with:** Spore Mine launcher; chitin-barbed limbs.",
    "keywords": [
      "Great Devourer",
      "Biovores",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "broodlord",
    "name": "Broodlord",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Mightiest and most intelligent of the Genestealer bioforms, the Broodlord is an insidious predatory infiltrator. Able to act as a forward commander for the invasion swarms, it sows carnage through the enemy lines while maximising the cunning and lethality of lesser warrior organisms around it.",
    "profiles": [
      {
        "name": "Broodlord",
        "m": "8\"",
        "t": "5",
        "sv": "4+",
        "w": "6",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Broodlord claws and talons",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Scouts 8\"",
    "faction": "Synapse, Shadow in the Warp",
    "abilities": [
      {
        "name": "Vicious Insight",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Hypnotic Gaze (Psychic)",
        "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "composition": [
      "1 Broodlord"
    ],
    "loadout": "**This model is equipped with:** Broodlord claws and talons.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Genestealers"
      ]
    },
    "keywords": [
      "Vanguard Invader",
      "Synapse",
      "Great Devourer",
      "Psyker",
      "Character",
      "Infantry",
      "Broodlord"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "carnifexes",
    "name": "Carnifexes",
    "points": [
      {
        "models": 1,
        "points": 90
      },
      {
        "models": 2,
        "points": 180
      }
    ],
    "flavor": "Carnifexes have been a mainstay of the hive fleets for centuries. Rugged and adaptable organisms, they can support a great range of weapon grafts and biomorphs while retaining the raw strength, durability and armoured ferocity that has seen them smash through countless prey defence lines like living battering rams.",
    "profiles": [
      {
        "name": "Carnifexes",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Bio-plasma",
        "tags": [
          "ASSAULT",
          "BLAST"
        ],
        "range": "12\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Deathspitters with slimer maggots",
        "tags": [],
        "range": "24\"",
        "a": "6",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Devourers with brainleech worms",
        "tags": [],
        "range": "18\"",
        "a": "12",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy venom cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Spine banks",
        "tags": [
          "ASSAULT"
        ],
        "range": "6\"",
        "a": "5",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stranglethorn cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Carnifex crushing claws",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Carnifex extra scything talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Carnifex scything talons",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Blistering Assault",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit lost a wound as a result of those attacks, this unit can make a surge move of up to D6+2\"."
      }
    ],
    "composition": [
      "1-2 Carnifexes"
    ],
    "loadout": "**Every model is equipped with:** Carnifex scything talons; Carnifex extra scything talons; chitinous claws and teeth.",
    "options": [
      "Any number of models can each have their Carnifex extra scything talons replaced with one of the following:\n▪ 1 deathspitters with slimer maggots\n▪ 1 devourers with brainleech worms\n▪ 1 heavy venom cannon\n▪ 1 stranglethorn cannon\n▪ 1 Carnifex crushing claws",
      "Any number of models can each have their Carnifex scything talons replaced with one of the following:\n▪ 1 deathspitters with slimer maggots\n▪ 1 devourers with brainleech worms\n▪ 1 Carnifex crushing claws",
      "Any number of models can each be equipped with 1 bio-plasma.",
      "Any number of models can each be equipped with 1 spine banks."
    ],
    "keywords": [
      "Great Devourer",
      "Monster",
      "Carnifexes"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "deathleaper",
    "name": "Deathleaper",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The Deathleaper is an advancement of the Lictor strain intended to act as a terror weapon. Possessing an instinctive understanding of how to spread fear through prey populations, it uses its skills in stealth, infiltration and assassination to sow paranoia and dread before the hive fleet attacks en masse.",
    "profiles": [
      {
        "name": "Deathleaper",
        "m": "8\"",
        "t": "6",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Lictor claws and talons",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Fights First, Infiltrators, Lone Operative, Stealth",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Feeder Tendrils",
        "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
      },
      {
        "name": "Fear of the Unseen (Aura)",
        "text": "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent’s Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Deathleaper – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Lictor claws and talons.",
    "keywords": [
      "Deathleaper",
      "Vanguard Invader",
      "Infantry",
      "Character",
      "Epic Hero",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "60mm",
    "rules": [
      {
        "name": "HUNTER ORGANISM",
        "text": "This model cannot be your WARLORD."
      }
    ]
  },
  {
    "id": "exocrine",
    "name": "Exocrine",
    "points": [
      {
        "models": 1,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Huge, tough and very stupid, the Exocrine’s only task is to carry the dorsal cannon organism on its back into an optimal firing position. Once in place, the bio-plasmic cannon emits a terrible, high-pitched hiss before unleashing a searing blast of bio-plasma capable of reducing tanks and bunkers to glowing craters.",
    "profiles": [
      {
        "name": "Exocrine",
        "m": "8\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Bio-plasmic cannon",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Powerful limbs",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Symbiotic Targeting",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly TYRANIDS model makes an attack that targets that unit, re-roll a Hit roll of 1."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Exocrine"
    ],
    "loadout": "**This model is equipped with:** bio-plasmic cannon; powerful limbs.",
    "keywords": [
      "Exocrine",
      "Monster",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "gargoyles",
    "name": "Gargoyles",
    "points": [
      {
        "models": 10,
        "points": 80
      },
      {
        "models": 20,
        "points": 155
      }
    ],
    "flavor": "Gargoyles are often the first warrior organisms hurled against a prey world. Their teeming swarms darken the skies. Their opportunistic attacks spread panic and disarray. Worst of all, the creatures can squirm through gaps that appear far too small, bursting through gun slits and vent pipes to assail horrified defenders.",
    "profiles": [
      {
        "name": "Gargoyles",
        "m": "12\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Fleshborer",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Blinding venom",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Winged Swarm",
        "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "10-20 Gargoyles"
    ],
    "loadout": "**Every model is equipped with:** fleshborer; blinding venom.",
    "keywords": [
      "Fly",
      "Endless Multitude",
      "Gargoyles",
      "Vanguard Invader",
      "Great Devourer",
      "Battleline",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "genestealers",
    "name": "Genestealers",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Swift vanguard organisms armoured in chitin and possessed of terrifying strength and agility, Genestealers are peerless predators. Their broods move ahead of the hive fleets to seek out fresh feeding grounds. Then, when the invasion swarms descend, the Genestealers burst from hiding to begin the slaughter.",
    "profiles": [
      {
        "name": "Genestealers",
        "m": "8\"",
        "t": "4",
        "sv": "5+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Genestealers claws and talons",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Scouts 8\"",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Vanguard Predator",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target is within range of one or more objective markers, re-roll a Wound roll of 1 as well."
      }
    ],
    "composition": [
      "5-10 Genestealers"
    ],
    "loadout": "**Every model is equipped with:** Genestealers claws and talons.",
    "keywords": [
      "Infantry",
      "Genestealers",
      "Vanguard Invader",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "harpy",
    "name": "Harpy",
    "points": [
      {
        "models": 1,
        "points": 185
      }
    ],
    "flavor": "Harpies are flying bioforms whose natural agility allows them to outmanoeuvre most prey fighter craft. They are often sent in amidst the first waves of an invasion, dropping organic munitions onto panicked defenders and diving down to attack.",
    "profiles": [
      {
        "name": "Harpy",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "8+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Stinger salvoes",
        "tags": [],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin heavy venom cannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin stranglethorn cannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Scything wings",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Spore Mine Cysts",
        "text": "At the end of your opponent’s Fight phase, you can do one of the following:\n▪ Select one visible enemy unit (excluding Lone Operative units) within 24\" of this unit and roll six D6 for that unit: for each 3+, that unit suffers 1 mortal wound.\n▪ Add a new SPORE MINES unit containing D3 models to your army and set it up anywhere on the battlefield that is within 6\" of this model and more than 8\" horizontally away from all enemy units. You cannot select this option for more than one model per turn."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Harpy"
    ],
    "loadout": "**This model is equipped with:** stinger salvoes; twin stranglethorn cannon; scything wings.",
    "options": [
      "This model’s twin stranglethorn cannon can be replaced with 1 twin heavy venom cannon."
    ],
    "keywords": [
      "Fly",
      "Aircraft",
      "Great Devourer",
      "Harpy",
      "Vanguard Invader",
      "Monster"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "harridan",
    "name": "Harridan",
    "points": [
      {
        "models": 1,
        "points": 610,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 660,
        "note": "2nd+"
      }
    ],
    "flavor": "Of the winged horrors of the Tyranids, none are as monstrously powerful as the Harridan. Borne on huge membranous wings tipped with bio-cannons, they swoop into enemy lines carving through troops and armour with their scything talons or showering shrieking Gargoyles that had been clinging batlike to the Harridan’s underbelly.",
    "profiles": [
      {
        "name": "Harridan",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "30",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Dire bio-cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Gargantuan scything talons",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "14",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "core": "Deadly Demise 2D6, Hover",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Frenzied Metabolism",
        "text": "Each time this model is selected to shoot, you can use this ability. If you do, until the end of the phase, each time this model makes an attack, add 1 to the Wound roll. After resolving those attacks, roll one D6: on a 2+, this model suffers D3 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Harridan"
    ],
    "loadout": "**This model is equipped with:** 2 dire bio-cannons; gargantuan scything talons.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 20 Gargoyles models and 1 Winged Tyranid Prime model.",
    "keywords": [
      "Fly",
      "Frame",
      "Great Devourer",
      "Harridan",
      "Monster",
      "Titanic",
      "Transport"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "Unique"
  },
  {
    "id": "haruspex",
    "name": "Haruspex",
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
    "flavor": "The infinite hunger of the Haruspex can see it consume an entire platoon of prey organisms in moments. Nothing escapes its yawning gullet and lashing tongue for long; its victims meet a horrible end as they are swallowed down to be gradually dissolved into raw biomass within the monster’s churning innards.",
    "profiles": [
      {
        "name": "Haruspex",
        "m": "8\"",
        "t": "11",
        "sv": "3+",
        "w": "14",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Grasping tongue",
        "tags": [
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Ravenous maw",
        "tags": [],
        "a": "14",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shovelling claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Grisly Spectacle",
        "text": "Each time this model is selected to fight, after resolving its attacks, if one or more enemy units were destroyed by those attacks, each enemy unit within 6\" of this model must take a Battle-shock test."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Haruspex"
    ],
    "loadout": "**This model is equipped with:** grasping tongue; ravenous maw; shovelling claws.",
    "keywords": [
      "Haruspex",
      "Harvester",
      "Monster",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "hierophant",
    "name": "Hierophant",
    "points": [
      {
        "models": 1,
        "points": 810,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 910,
        "note": "2nd+"
      }
    ],
    "flavor": "Hierophants are gargantuan specimens of Tyranid adaptation, created to rival the largest war machines and annihilate any resistance. Towering over the battlefield on spined legs that skewer tanks with ease, these apex-beasts spray foes with devastating bio-weapons, their thick chitinous plating making them almost impervious to injury.",
    "profiles": [
      {
        "name": "Hierophant",
        "m": "12\"",
        "t": "14",
        "sv": "2+",
        "w": "30",
        "ld": "8+",
        "oc": "12",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Bio-plasma torrent",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3D6",
        "bs": "N/A",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Dire bio-cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Lashwhip pods",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "10",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Titanic scything talons",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "20",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Apex-beast",
        "text": "Each time this model makes an attack that targets a unit that is Battle-shocked, add 1 to the Hit roll."
      },
      {
        "name": "Stalking Forward",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding TITANIC models) and terrain features that are 4\" or less in height as if they were not there."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 6 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Hierophant"
    ],
    "loadout": "**This model is equipped with:** bio-plasma torrent; 2 dire bio-cannons; lashwhip pods; titanic scything talons.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 20 Tyranids Infantry models. Each model with a Wounds characteristic of more than 1 takes up the space of 3 models. This model cannot transport models that can Fly.",
    "keywords": [
      "Frame",
      "Great Devourer",
      "Hierophant",
      "Monster",
      "Titanic",
      "Towering",
      "Transport"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "hive-crone",
    "name": "Hive Crone",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "Hive Crones scour the skies for prey fighter craft. The tentaclids they release pursue enemy aircraft before erupting in bio-electric pulses that banish motive force and send the dark, dead machines tumbling groundward. Then, drool cannons slathering, the Hive Crones dive down to seek fresh, land-based prey.",
    "profiles": [
      {
        "name": "Hive Crone",
        "m": "20+\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "8+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Drool cannon",
        "tags": [
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stinger salvoes",
        "tags": [],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Tentaclids",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "7",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Scything wings",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Thorax spur",
        "tags": [
          "ANTI-FLY 2+",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Airborne Predator",
        "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Hive Crone"
    ],
    "loadout": "**This model is equipped with:** drool cannon; stinger salvoes; tentaclids; scything wings; thorax spur.",
    "keywords": [
      "Aircraft",
      "Monster",
      "Hive Crone",
      "Fly",
      "Vanguard Invader",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "hive-guard",
    "name": "Hive Guard",
    "points": [
      {
        "models": 3,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Hive Guard are spawned to protect Tyranid bio-architecture and vital spore-seeding sites. They carry a monstrous arsenal of grafted bio-weapons and are instinctively driven – or sometimes synaptically impelled – to lay down heavy hails of firepower against those prey organisms the Hive Mind wishes to see eradicated.",
    "profiles": [
      {
        "name": "Hive Guard",
        "m": "6\"",
        "t": "7",
        "sv": "3+",
        "w": "4",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Impaler cannon",
        "tags": [
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Shockcannon",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Defensive Stance",
        "text": "Each time you target this unit with the Fire Overwatch Stratagem, while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+, or unmodified Hit rolls of 4+ instead if this unit is within range of an objective marker that you control."
      }
    ],
    "composition": [
      "3-6 Hive Guard"
    ],
    "loadout": "**Every model is equipped with:** shockcannon; chitinous claws and teeth.",
    "options": [
      "Any number of models can each have their shockcannon replaced with 1 impaler cannon."
    ],
    "keywords": [
      "Hive Guard",
      "Infantry",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "hive-tyrant",
    "name": "Hive Tyrant",
    "points": [
      {
        "models": 1,
        "points": 195
      }
    ],
    "flavor": "Hive Tyrants command the swarm on the Hive Mind’s behalf. Not only are they powerful warrior organisms in their own right, but they are also possessed of a depth of sentient autonomy and strategic cunning that makes them truly deadly foes. Where the Hive Tyrants bestride the battlefield, death comes for the prey.",
    "profiles": [
      {
        "name": "Hive Tyrant",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "10",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy venom cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Stranglethorn cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Monstrous bonesword and lash whip",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Monstrous scything talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Leader",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Will of the Hive Mind",
        "text": "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Onslaught (Aura, Psychic)",
        "text": "While a friendly TYRANIDS unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [ASSAULT] and [LETHAL HITS] abilities."
      }
    ],
    "composition": [
      "1 Hive Tyrant"
    ],
    "loadout": "**This model is equipped with:** monstrous bonesword and lash whip; monstrous scything talons.",
    "options": [
      "This model’s monstrous bonesword and lash whip can be replaced with one of the following:\n▪ 1 heavy venom cannon\n▪ 1 stranglethorn cannon\n▪ 1 monstrous scything talons",
      "This model’s monstrous scything talons can be replaced with one of the following:\n▪ 1 heavy venom cannon*\n▪ 1 stranglethorn cannon*",
      "*This model cannot be equipped with both a stranglethorn cannon and a heavy venom cannon. This model cannot be equipped with more than 1 heavy venom cannon, and it cannot be equipped with more than 1 stranglethorn cannon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Tyrant Guard"
      ]
    },
    "keywords": [
      "Character",
      "Monster",
      "Hive Tyrant",
      "Synapse",
      "Great Devourer",
      "Psyker"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "hormagaunts",
    "name": "Hormagaunts",
    "points": [
      {
        "models": 10,
        "points": 70
      },
      {
        "models": 20,
        "points": 120
      }
    ],
    "flavor": "Swarming shock troops, Hormagaunts are seeded onto prey worlds in their billions. As simple hunter-slayer organisms, they can be left to rampage, wearing down defence lines and forcing the prey to expend lives and ammunition. Many formidable bastions have been buried in literal mountains of these chitinous horrors.",
    "profiles": [
      {
        "name": "Hormagaunts",
        "m": "10\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "8+",
        "oc": "2"
      }
    ],
    "melee": [
      {
        "name": "Hormagaunt talons",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Bounding Leap",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced."
      }
    ],
    "composition": [
      "10-20 Hormagaunts"
    ],
    "loadout": "**Every model is equipped with:** Hormagaunt talons.",
    "keywords": [
      "Battleline",
      "Great Devourer",
      "Infantry",
      "Hormagaunts",
      "Endless Multitude"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "hyperadapted-raveners",
    "name": "Hyperadapted Raveners",
    "points": [
      {
        "models": 5,
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 175,
        "note": "3rd+"
      }
    ],
    "flavor": "Created to fight amongst the vanguard swarms, Hyperadapted Raveners boast additional biomorphs and weapon symbiotes. The toxic scythes, rending talons and crushing claws of the heavier bioforms, coupled with bioacids and unnatural senses, allow them to pick off the armoured vehicles of the prey.",
    "profiles": [
      {
        "name": "Ravener Prime",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "6",
        "ld": "7+",
        "oc": "1",
        "baseSize": "40mm"
      },
      {
        "name": "Raveners",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "8+",
        "oc": "1",
        "baseSize": "40mm"
      }
    ],
    "ranged": [
      {
        "name": "Venom bolt",
        "tags": [
          "ASSAULT",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Prime claws and talons",
        "tags": [
          "ANTI-MONSTER 5+",
          "ANTI-VEHICLE 5+",
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ravener heavy claws and talons",
        "tags": [
          "ANTI-MONSTER 5+",
          "ANTI-VEHICLE 5+",
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Shadow In The Warp (Ravener Prime only), Synapse",
    "abilities": [
      {
        "name": "Alpha Invader",
        "text": "Weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Hypersensory Array",
        "text": "Once per battle round, you can target this unit with the Rapid Ingress/Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "composition": [
      "1 Ravener Prime",
      "4 Raveners"
    ],
    "loadout": "**The Ravener Prime is equipped with:** Prime claws and talons.\n\n**3 Raveners are equipped with:** Ravener heavy claws and talons.\n\n**1 Ravener is equipped with:** venom bolt; Ravener heavy claws and talons.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Raveners"
      ]
    },
    "keywords": [
      "Burrower",
      "Character",
      "Great Devourer",
      "Hyperadapted Raveners",
      "Infantry",
      "Synapse",
      "Vanguard Invader"
        ],
    "factionKeywords": [
      "Tyranids"
    ]
  },
  {
    "id": "lictor",
    "name": "Lictor",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Lictors are an adaptation of the Tyranid Warrior bioform specialising in infiltration, scouting and assassination. Hidden by their chameleonic skin, Lictors pick off their prey opportunistically, always looking for a chance to crack open their victims’ skulls and suck out the secrets held within using their feeder tendrils.",
    "profiles": [
      {
        "name": "Lictor",
        "m": "8\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Lictor claws and talons",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Fights First, Infiltrators, Lone Operative, Stealth",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Feeder Tendrils",
        "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
      },
      {
        "name": "Pheromone Trail",
        "text": "Once per battle round, you can target one model with this ability with the Rapid Ingress Stratagem for 0CP."
      }
    ],
    "composition": [
      "1 Lictor"
    ],
    "loadout": "**This model is equipped with:** Lictor claws and talons.",
    "keywords": [
      "Infantry",
      "Lictor",
      "Vanguard Invader",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "maleceptor",
    "name": "Maleceptor",
    "points": [
      {
        "models": 1,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "Amongst the most powerful Tyranid psyker-analogues yet known, Maleceptors wield colossal synaptic power. Ethereal psychic pseudopods lash about them, able to literally detonate victims’ skulls with the slightest touch, while the encephalitic orbs set into their carapaces focus the smothering dread of the Shadow in the Warp.",
    "profiles": [
      {
        "name": "Maleceptor",
        "m": "8\"",
        "t": "11",
        "sv": "3+",
        "w": "14",
        "ld": "7+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Psychic overload",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Massive scything talons – strike",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Massive scything talons – sweep",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Encephalic Diffusion (Aura, Psychic)",
        "text": "While an enemy unit is within 6\" of this model, each time a model in that unit makes an attack, subtract 1 from the Hit roll, and, if that enemy unit is Below Half-strength, subtract 1 from the Wound roll as well."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Maleceptor"
    ],
    "loadout": "**This model is equipped with:** psychic overload; massive scything talons.",
    "keywords": [
      "Maleceptor",
      "Synapse",
      "Great Devourer",
      "Psyker",
      "Monster"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "mawloc",
    "name": "Mawloc",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Vast, burrowing wormforms, Mawlocs hunt by sensing even the smallest vibrations on the surface above them. Once they have located prey, the Mawlocs surge upwards in an eruption of bedrock and soil, yawning maws swallowing everything above them before they plunge back under the surface again.",
    "profiles": [
      {
        "name": "Mawloc",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "melee": [
      {
        "name": "Distensible jaw",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Mawloc scything talons",
        "tags": [],
        "a": "16",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Terror From The Deep",
        "text": "Each time this model is set up on the battlefield using the Deep Strike ability, roll one D6 for each enemy unit within 12\" of this model: on a 2-4, that unit suffers D3 mortal wounds; on a 5+, that unit suffers 3 mortal wounds and must take a Battle-shock test."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Mawloc"
    ],
    "loadout": "**This model is equipped with:** distensible jaw; Mawloc scything talons.",
    "keywords": [
      "Great Devourer",
      "Mawloc",
      "Monster",
      "Vanguard Invader"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "mucolid-spores",
    "name": "Mucolid Spores",
    "points": [
      {
        "models": 1,
        "points": 30
      },
      {
        "models": 2,
        "points": 60
      }
    ],
    "flavor": "These rudimentary organisms are filled with poisonous gases held under extremely high pressure. Instinct drives them to drift towards prey formations or up into the path of enemy aircraft, before detonating in a nauseating spray of poisonous filth and chitinous shrapnel.",
    "profiles": [
      {
        "name": "Mucolid Spores",
        "m": "4\"",
        "t": "4",
        "sv": "7+",
        "w": "3",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "ranged": [],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Bio-minefield",
        "text": "Enemy units cannot start or end an Advance move within 6\" of this unit."
      },
      {
        "name": "Floating Death",
        "text": "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers D6 mortal wounds."
      }
    ],
    "composition": [
      "1-2 Mucolid Spores"
    ],
    "loadout": "**Every model is equipped with:** nothing.",
    "keywords": [
      "Beast",
      "Fly",
      "Great Devourer",
      "Mucolid Spores"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "neurogaunts",
    "name": "Neurogaunts",
    "points": [
      {
        "models": 11,
        "points": 45
      },
      {
        "models": 22,
        "points": 90
      }
    ],
    "flavor": "Neurogaunts scuttle forward in seething masses, driven on by the parasitic neurocytes that cling to their backs. Their primary purpose is to protect the synaptic node-beasts coordinating invasion swarms. It is a task they go about with single-minded savagery, slashing, biting and giving their lives without hesitation.",
    "profiles": [
      {
        "name": "Neurogaunts",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Neurocytes",
        "text": "While this unit is within Synapse Range of a friendly TYRANIDS unit (excluding NEUROGAUNT units), it has the Synapse keyword."
      }
    ],
    "composition": [
      "1-2 Neurogaunt Nodebeasts*",
      "10-20 Neurogaunts"
    ],
    "loadout": "**Every model is equipped with:** chitinous claws and teeth.\n\n*This unit can only contain 2 Neurogaunt Nodebeasts if it contains 20 Neurogaunts.",
    "keywords": [
      "Great Devourer",
      "Endless Multitude",
      "Neurogaunts",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "25mm / 28.5mm"
  },
  {
    "id": "neurolictor",
    "name": "Neurolictor",
    "points": [
      {
        "models": 1,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 90,
        "note": "3rd+"
      }
    ],
    "flavor": "Neurolictors are nightmarish living weapons of psychological warfare. The field of neural disruption that they project causes atavistic terror responses in even the most hardened prey, rendered all the more nightmarish as - thanks to the Neurolictors’ nigh-supernatural abilities to fool their victims’ senses and evade notice - these effects seem often to come from out of thin air.",
    "profiles": [
      {
        "name": "Neurolictor",
        "m": "8\"",
        "t": "5",
        "sv": "4+",
        "w": "7",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Piercing claws and talons",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Lone Operative, Stealth",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Feeder Tendrils",
        "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
      },
      {
        "name": "Neural Disruption",
        "text": "In your Command phase, select one enemy unit within 12\" of this model. That unit must take a Battle-shock test."
      },
      {
        "name": "Psychological Saboteur (Aura)",
        "text": "While an enemy unit is within 12\" of this model, if that unit is Battle-shocked:\n▪ Each time a model in that unit makes an attack, subtract 1 from the Hit roll.\n▪ Each time a friendly TYRANIDS model makes an attack that targets that unit, add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1 Neurolictor"
    ],
    "loadout": "**This model is equipped with:** piercing claws and talons.",
    "keywords": [
      "Infantry",
      "Great Devourer",
      "Synapse",
      "Neurolictor",
      "Vanguard Invader"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "neurotyrant",
    "name": "Neurotyrant",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "The Shadow in the Warp radiating from this immensely powerful psyker-analogue creeps in all directions, driving even non-psychic prey organisms to screaming madness. As its foes writhe in agony, the Neurotyrant guides the swarms around it to slaughter with brutal efficiency.",
    "profiles": [
      {
        "name": "Neurotyrant",
        "m": "6\"",
        "t": "8",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Psychic scream",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Neurotyrant claws and lashes",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Synapse, Shadow in the Warp",
    "abilities": [
      {
        "name": "Node Lash (Psychic)",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll. If the target is Battle-shocked, add 1 to the Wound roll as well."
      },
      {
        "name": "Psychic Terror (Psychic)",
        "text": "If one or more Neurotyrants from your army are on the battlefield when you unleash the Shadow in the Warp, subtract 1 from the Battle-shock test each enemy unit on the battlefield must take as a result."
      },
      {
        "name": "Neuroloids",
        "text": "In your Command phase, you can select up to two friendly TYRANIDS units within 18\" of this model’s unit. Until the start of your next Command phase, the selected units are always considered to be within Synapse Range of your army.\n\n**Designer’s Note:** Place a Neuroloid token next to each selected unit to remind you."
      }
    ],
    "composition": [
      "1 Neurotyrant"
    ],
    "loadout": "**This model is equipped with:** Psychic Scream; Neurotyrant claws and lashes.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Zoanthropes",
        "Tyrant Guard",
        "Neurogaunts"
      ]
    },
    "keywords": [
      "Synapse",
      "Monster",
      "Character",
      "Fly",
      "Psyker",
      "Great Devourer",
      "Neurotyrant"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "norn-assimilator",
    "name": "Norn Assimilator",
    "points": [
      {
        "models": 1,
        "points": 250,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 270,
        "note": "2nd+"
      }
    ],
    "flavor": "Norn Assimilators are the living and inexhaustible nemeses of their prey. Using their toxinjector harpoons, these towering monsters can impale and tear down the fortifications their quarry cower behind, drag guardian war engines into their deadly embrace, or pinion the target themselves before dragging them inexorably in to their doom.",
    "profiles": [
      {
        "name": "Norn Assimilator",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "16",
        "ld": "7+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Toxinjector Harpoon",
        "tags": [
          "HARPOONED"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Monstrous scything talons",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Toxinjector harpoon",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Singular Purpose",
        "text": "At the start of the first battle round, select one of the following:\n▪ Select one enemy unit. Until the end of the battle, each time this model makes an attack that targets that unit, you can re-roll the Hit roll and you can re-roll the Wound roll.\n▪ Select one objective marker. Until the end of the battle, while this model is within range of that objective marker, it has the Feel No Pain 5+ ability and an Objective Control characteristic of 15."
      },
      {
        "name": "Harpoon Barbs",
        "text": "Once per turn, when an enemy unit within Engagement Range of this model is selected to Fall Back, roll one D6: on a 2+, that unit suffers D6 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Norn Assimilator"
    ],
    "loadout": "**This model is equipped with:** toxinjector harpoon; monstrous scything talons.",
    "keywords": [
      "Monster",
      "Norn Assimilator",
      "Harvester",
      "Synapse",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "norn-emissary",
    "name": "Norn Emissary",
    "points": [
      {
        "models": 1,
        "points": 250,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 270,
        "note": "2nd+"
      }
    ],
    "flavor": "Each Norn Emissary is spawned for a specific purpose, be it predating on a strategically gifted commander, abducting a knowledgeable prey-being at the behest of its Norn Queen, or some other ineffable task. Melding terrifying psionic potential with speed, agility and awful strength, the Norn Emissary is more than equal to its mission.",
    "profiles": [
      {
        "name": "Norn Emissary",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "16",
        "ld": "7+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Psychic Tendril – neuroparasite",
        "tags": [
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "8",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Psychic Tendril – neuroblast",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Psychic Tendril – neurolance",
        "tags": [
          "MELTA 2",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Monstrous scything talons",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Monstrous rending claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Singular Purpose",
        "text": "At the start of the first battle round, select one of the following:\n▪ Select one enemy unit. Until the end of the battle, each time this model makes an attack that targets that unit, you can re-roll the Hit roll and you can re-roll the Wound roll.\n▪ Select one objective marker. Until the end of the battle, while this model is within range of that objective marker, it has the Feel No Pain 5+ ability and an Objective Control characteristic of 15."
      },
      {
        "name": "Unnatural Resilience",
        "text": "This model has the Feel No Pain 4+ ability against mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Norn Emissary"
    ],
    "loadout": "**This model is equipped with:** Psychic Tendril; monstrous scything talons; monstrous rending claws.",
    "keywords": [
      "Synapse",
      "Great Devourer",
      "Psyker",
      "Monster",
      "Norn Emissary"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "old-one-eye",
    "name": "Old One Eye",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "Known as the Beast of Calth, this unstoppable brute was first seen during the First Tyrannic War. Though many have thought it slain over the centuries, always the scarred monster rises again. Whether it is a Tyranid subgenus or the same unstoppable monster come again is a mystery few in its path live long enough to ponder.",
    "profiles": [
      {
        "name": "Old One Eye",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "9",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "melee": [
      {
        "name": "Old One Eye’s claws and talons – strike",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Old One Eye’s claws and talons – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Alpha Leader",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll."
      },
      {
        "name": "Unstoppable Monster",
        "text": "At the start of each player’s Command phase, this model regains up to D3 lost wounds."
      }
    ],
    "composition": [
      "1 Old One Eye – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Old One Eye’s claws and talons.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Carnifexes"
      ]
    },
    "keywords": [
      "Monster",
      "Old One Eye",
      "Great Devourer",
      "Epic Hero",
      "Character"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "parasite-of-mortrex",
    "name": "Parasite Of Mortrex",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Swooping on leathery wings, Parasites of Mortrex use their barbed ovipositors to drive Ripper gestation pods deep into their victims’ bodies, from where the swiftly growing creatures soon eat their way out. Such was the doom of the defenders of Mortrex, the world first cursed by the Parasites’ onslaught.",
    "profiles": [
      {
        "name": "Parasite Of Mortrex",
        "m": "12\"",
        "t": "5",
        "sv": "4+",
        "w": "5",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Barbed ovipositor",
        "tags": [
          "ANTI-INFANTRY 3+",
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Clawed limbs",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Lone Operative, Stealth",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Parasitic Infection",
        "text": "Each time an INFANTRY model is destroyed by an attack made with this model’s barbed ovipositor, after this model has finished making its attacks, you can add one new Ripper Swarms unit to your army consisting of D3 models and set it up within 3\" of this model. If you do, that RIPPER SWARMS unit can be set up within Engagement Range of the destroyed model’s unit (but not within Engagement Range of any other enemy units)."
      },
      {
        "name": "It Itches!",
        "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. That enemy unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Parasite of Mortrex"
    ],
    "loadout": "**This model is equipped with:** barbed ovipositor; clawed limbs.",
    "keywords": [
      "Great Devourer",
      "Vanguard Invader",
      "Parasite of Mortrex",
      "Infantry",
      "Character",
      "Fly",
      "Synapse"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "psychophage",
    "name": "Psychophage",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "These monsters stampede into battle with frightening speed. They devour any prey organism in their paths, but especially favour those victims with psychic abilities. How they metabolise such esoteric powers is unclear, but doing so allows them to project surges of psychocorrosive ash that deflagrate their victims’ minds and souls.",
    "profiles": [
      {
        "name": "Psychophage",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Psychoclastic torrent",
        "tags": [
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
        "name": "Talons and betentacled maw",
        "tags": [
          "ANTI-PSYKER 4+",
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 5+",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Bio-stimulus",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly TYRANIDS unit makes a melee attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn."
      },
      {
        "name": "Feeding Frenzy",
        "text": "Each time this model makes a melee attack that targets a unit that is below its Starting Strength, add 1 to the Hit roll. If that target is also Below Half-strength, add 1 to the Wound roll as well."
      }
    ],
    "composition": [
      "1 Psychophage"
    ],
    "loadout": "**This model is equipped with:** psychoclastic torrent; talons and betentacled maw.",
    "keywords": [
      "Great Devourer",
      "Monster",
      "Smoke",
      "Harvester",
      "Psychophage"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "pyrovores",
    "name": "Pyrovores",
    "points": [
      {
        "models": 1,
        "points": 45,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 65,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 95,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 55,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 75,
        "note": "3rd+"
      },
      {
        "models": 3,
        "points": 105,
        "note": "3rd+"
      }
    ],
    "flavor": "Pyrovores exist to predigest biomass. The acids that drip from their maws are so corrosive they can melt adamantine. Meanwhile, their flame-spewing dorsal organisms can engulf entire squads of prey in roiling chemical fire. Even killing these bioforms is perilous, for their volatile innards can detonate upon death.",
    "profiles": [
      {
        "name": "Pyrovores",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Flamespurt",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6+1",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chitin-barbed limbs",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Burning Spray",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      }
    ],
    "composition": [
      "1-3 Pyrovores"
    ],
    "loadout": "**Every model is equipped with:** flamespurt; chitin-barbed limbs.",
    "keywords": [
      "Infantry",
      "Great Devourer",
      "Harvester",
      "Pyrovores"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "raveners",
    "name": "Raveners",
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
    "flavor": "Serpentine bioforms capable of a terrifying turn of speed, Raveners are made doubly dangerous by their ability to tunnel swiftly through even solid bedrock. Often assaulting their prey from below, Raveners are especially vicious and predatory warrior organisms used as shock troops by the hive mind.",
    "profiles": [
      {
        "name": "Raveners",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Ravener claws and talons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Death From Below",
        "text": "At the end of your opponent’s turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves."
      }
    ],
    "composition": [
      "5 Raveners"
    ],
    "loadout": "**Every model is equipped with:** Ravener claws and talons.",
    "options": [
      "None"
    ],
    "keywords": [
      "Burrower",
      "Great Devourer",
      "Infantry",
      "Raveners",
      "Vanguard Invader"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ripper-swarms",
    "name": "Ripper Swarms",
    "points": [
      {
        "models": 1,
        "points": 30
      },
      {
        "models": 2,
        "points": 40
      },
      {
        "models": 3,
        "points": 50
      }
    ],
    "flavor": "Living carpets of Rippers squirm across the ground wherever the Tyranid swarms advance. Little more than simple eating machines, these chitinous horrors swarm over the wounded and dead alike, and can even drag down trained warriors in sufficient numbers. Once a Ripper’s fangs sink home, it will not let go…",
    "profiles": [
      {
        "name": "Ripper Swarms",
        "m": "6\"",
        "t": "2",
        "sv": "6+",
        "w": "4",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Spinemaws",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "4",
        "bs": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Chitinous Horrors (Aura)",
        "text": "While an enemy unit is within Engagement Range of this unit, halve the Objective Control characteristic of models in that enemy unit."
      }
    ],
    "composition": [
      "1-3 Ripper Swarms"
    ],
    "loadout": "**Every model is equipped with:** chitinous claws and teeth.",
    "options": [
      "All models in this unit can each be equipped with 1 spinemaws."
    ],
    "keywords": [
      "Great Devourer",
      "Harvester",
      "Swarm",
      "Ripper Swarms"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "screamer-killer",
    "name": "Screamer-killer",
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
    "flavor": "An older adaptation of the basic Carnifex strain, the Screamer-Killer was christened by terrified Imperial troops for the distinctive howl it emits as it generates then unleashes its bio-plasmic blasts. Screamer-Killers are often seen at the forefront of a Tyranid assault, where they can inflict the most damage quickly.",
    "profiles": [
      {
        "name": "Screamer-killer",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Bio-plasmic scream",
        "tags": [
          "ASSAULT",
          "BLAST"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Screamer-killer talons",
        "tags": [],
        "a": "10",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Death Scream",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test, subtracting 1 from that test."
      }
    ],
    "composition": [
      "1 Screamer-Killer"
    ],
    "loadout": "**This model is equipped with:** bio-plasmic scream; Screamer-Killer talons.",
    "keywords": [
      "Screamer-Killer",
      "Great Devourer",
      "Monster"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "spore-mines",
    "name": "Spore Mines",
    "points": [
      {
        "models": 3,
        "points": 55
      },
      {
        "models": 6,
        "points": 110
      }
    ],
    "flavor": "Spore Mines are a form of living bomb, which drift across the battlefield in shoals and detonate when they detect prey organisms nearby. Those caught in the blast are torn apart as surely as if they had caught a brace of live frag grenades. The Hive Mind often uses Spore Mines to deny areas of the battlefield to the prey.",
    "profiles": [
      {
        "name": "Spore Mines",
        "m": "4\"",
        "t": "1",
        "sv": "7+",
        "w": "1",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "ranged": [],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Bio-minefield",
        "text": "Enemy units cannot start or end an Advance move within 6\" of this unit."
      },
      {
        "name": "Floating Death",
        "text": "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds."
      }
    ],
    "composition": [
      "3-6 Spore Mines"
    ],
    "loadout": "**Every model is equipped with:** nothing.",
    "keywords": [
      "Spore Mines",
      "Great Devourer",
      "Fly",
      "Beast"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "sporocyst",
    "name": "Sporocyst",
    "points": [
      {
        "models": 1,
        "points": 145
      }
    ],
    "flavor": "Dropped from orbit, Sporocysts dig into the surface of the prey world like ticks then begin spewing toxic spores from their living chimneys. They are able to eject shoals of Mucolid Spores, while prey who stray too close are subjected to hails of organic projectiles from the bio-cannons grafted to the Sporocyst’s hide.",
    "profiles": [
      {
        "name": "Sporocyst",
        "m": "-",
        "t": "10",
        "sv": "3+",
        "w": "10",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Sporocyst bio-weapons",
        "tags": [],
        "range": "24\"",
        "a": "10",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Flensing whips",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Seed Mucolids",
        "text": "Once per turn, in your Shooting phase, when selected to shoot, one unit with this ability can use it instead of making any attacks with its ranged weapons. If it does, you can add one new Mucolid Spores unit containing 1 model to your army and set it up anywhere on the battlefield that is wholly within 18\" of this model and more than 8\" horizontally away from all enemy units."
      },
      {
        "name": "Hive Defences",
        "text": "You can target this model with the Fire Overwatch Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this turn. This model can only be targeted with that Stratagem once per turn."
      }
    ],
    "composition": [
      "1 Sporocyst"
    ],
    "loadout": "**This model is equipped with:** Sporocyst bio-weapons; flensing whips.",
    "keywords": [
      "Sporocyst",
      "Great Devourer",
      "Monster"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "termagants",
    "name": "Termagants",
    "points": [
      {
        "models": 10,
        "points": 60
      },
      {
        "models": 20,
        "points": 110
      }
    ],
    "flavor": "Scuttling predators that attack in huge swarms, Termagants were originally spawned to roam the tight arterial passages of hive ships and hunt intruders. They harry their prey with a hail of firepower, seeking always to outflank and envelop their victims as they erode their numbers.",
    "profiles": [
      {
        "name": "Termagants",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "8+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Fleshborer",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shardlauncher",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Spike rifle",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Strangleweb",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "N/A",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Termagant devourer",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Termagant spinefists",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Skulking Horrors",
        "text": "In your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\"."
      }
    ],
    "composition": [
      "10-20 Termagants"
    ],
    "loadout": "**Every model is equipped with:** fleshborer; chitinous claws and teeth.",
    "options": [
      "All models in this unit can each have their fleshborer replaced with 1 Termagant devourer.",
      "All models in this unit can each have their fleshborer replaced with 1 Termagant spinefists.",
      "For every 10 models in this unit, 1 model’s ranged weapon can be replaced with 1 shardlauncher",
      "For every 10 models in this unit, 1 model’s ranged weapon can be replaced with 1 spike rifle.",
      "For every 10 models in this unit, 1 model’s ranged weapon can be replaced with 1 strangleweb"
    ],
    "keywords": [
      "Termagants",
      "Endless Multitude",
      "Great Devourer",
      "Battleline",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "tervigon",
    "name": "Tervigon",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Beyond simply being large and powerful synapse beasts, Tervigons are also able to spawn skittering masses of Termagant warrior organisms from within their bulging abdomens. These dripping spawn instinctively protect their broodmother with their lives, their numbers growing all the time until they overwhelm the prey.",
    "profiles": [
      {
        "name": "Tervigon",
        "m": "8\"",
        "t": "11",
        "sv": "2+",
        "w": "16",
        "ld": "7+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Stinger salvoes",
        "tags": [],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Massive crushing claws",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Massive scything talons – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Massive scything talons – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Spawn Termagants",
        "text": "In your Command phase, you can select one friendly Termagants unit within 6\" of this model and return up to D3+3 destroyed models to that unit. A TERMAGANTS unit cannot be selected for this ability more than once per phase."
      },
      {
        "name": "Brood Progenitor (Aura, Psychic)",
        "text": "While a friendly Termagants unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Tervigon"
    ],
    "loadout": "**This model is equipped with:** stinger salvoes; massive scything talons.",
    "options": [
      "This model’s massive scything talons can be replaced with 1 massive crushing claws."
    ],
    "keywords": [
      "Monster",
      "Tervigon",
      "Synapse",
      "Great Devourer",
      "Psyker",
      "Character"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "the-red-terror",
    "name": "The Red Terror",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "A serpentine fiend that tunnels beneath the battlefield to strike at unsuspecting prey, the Red Terror is a rare bioform spawned to sow disruption deep behind enemy lines. Able to distend its jaws to swallow prey whole, the beast is further able to rapidly absorb their biomass to regenerate its injuries.",
    "profiles": [
      {
        "name": "The Red Terror",
        "m": "10\"",
        "t": "8",
        "sv": "3+",
        "w": "9",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "melee": [
      {
        "name": "Gaping maw",
        "tags": [
          "EXTRA ATTACKS",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "1",
        "ws": "2+",
        "s": "5",
        "ap": "-",
        "d": "D3+2"
      },
      {
        "name": "Scything talons",
        "tags": [],
        "a": "12",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Swallow Whole",
        "text": "Each time an attack with this model’s gaping maw targets an INFANTRY, MOUNTED or BEASTS unit, each successful unmodified Wound roll is a Critical Wound. Each time an INFANTRY, MOUNTED or BEASTS model is destroyed as a result of an attack made by this model’s gaping maw, this model regains up to D3+2 lost wounds."
      },
      {
        "name": "Subterranean Hunter",
        "text": "At the end of the Fight phase, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves."
      },
      {
        "name": "Serpentine Fiend",
        "text": "This model can move through terrain features, but cannot end a move within a wall, a floor, etc. This model can be set up or end a move on any floor level of RUINS, but if that level is not the ground floor, it can only do so if its base does not overhang the floor at that level."
      }
    ],
    "composition": [
      "1 The Red Terror – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** scything talons, gaping maw.",
    "options": [
      "None."
    ],
    "keywords": [
      "Burrower",
      "Character",
      "Epic Hero",
      "Great Devourer",
      "Mobile",
      "Monster",
      "The Red Terror",
      "Vanguard Invader"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "the-swarmlord",
    "name": "The Swarmlord",
    "points": [
      {
        "models": 1,
        "points": 210
      }
    ],
    "flavor": "The Swarmlord is the herald of the Hive Mind and may be as old as the Tyranid race itself. Upon death, the beast is always absorbed through the synaptic link and spawned anew. It has presided over the annihilation of countless civilisations, and with every incarnation it only becomes more deadly.",
    "profiles": [
      {
        "name": "The Swarmlord",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "10",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Synaptic pulse",
        "tags": [
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Bone sabres",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "8",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3, Leader",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Hive Commander",
        "text": "At the start of your Command phase, if this model is on the battlefield, you gain 1CP."
      },
      {
        "name": "Malign Presence (Aura)",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do increase the CP cost of that use of that Stratagem by 1CP."
      },
      {
        "name": "Domination of the Hive Mind (Aura)",
        "text": "While a friendly TYRANIDS unit is within 9\" of this model, that unit is within your army’s Synapse Range."
      }
    ],
    "composition": [
      "1 The Swarmlord – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Synaptic pulse; bone sabres.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Tyrant Guard"
      ]
    },
    "keywords": [
      "The Swarmlord",
      "Hive Tyrant",
      "Synapse",
      "Great Devourer",
      "Psyker",
      "Epic Hero",
      "Character",
      "Monster"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "toxicrene",
    "name": "Toxicrene",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "The semi-sentient spores spewed by the Toxicrene can penetrate even sealed armour and enviro-suits before multiplying within the victim’s body to burst their organs and dissolve their flesh. Prey not slain in this horrible manner soon fall to the Toxicrene’s monstrous bulk and vast, lashing tendrils as it rampages ever onwards.",
    "profiles": [
      {
        "name": "Toxicrene",
        "m": "8\"",
        "t": "11",
        "sv": "3+",
        "w": "14",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Massive toxic lashes",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "range": "9\"",
        "a": "2D6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Massive toxic lashes",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "a": "12",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Grasping Tendrils",
        "text": "Each time an enemy unit (excluding TITANIC units) within Engagement Range of one or more units from your army with this ability is selected to Fall Back, you can roll one D6: on a 3+, that enemy unit must Remain Stationary instead."
      },
      {
        "name": "Hypertoxic Miasma (Aura)",
        "text": "At the end of your Movement phase, roll one D6 for each enemy unit within 6\" of this model: on a 2-3, that unit suffers 1 mortal wound; on a 4-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D6 mortal wounds."
      }
    ],
    "composition": [
      "1 Toxicrene"
    ],
    "loadout": "**This model is equipped with:** massive toxic lashes.",
    "keywords": [
      "Frame",
      "Great Devourer",
      "Monster",
      "Toxicrene"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "trygon",
    "name": "Trygon",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "Trygons are battle-tank-sized tunnelling machines. As they dig through the substrata of the prey world, they excavate huge tunnels for other Tyranid beasts to exploit. At the same time, the rasping of their chitinous plates builds up a powerful bio-electric charge that the Trygons can unleash as a weapon.",
    "profiles": [
      {
        "name": "Trygon",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "8+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Bio-electric pulse",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Trygon scything talons",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Subterranean Tunnels",
        "text": "In your Movement phase, when this model is set up on the battlefield using the Deep Strike ability, it can use a subterranean tunnel. If it does, this model can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Trygon"
    ],
    "loadout": "**This model is equipped with:** bio-electric pulse; Trygon scything talons.",
    "keywords": [
      "Great Devourer",
      "Monster",
      "Trygon",
      "Vanguard Invader"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "tyranid-prime-with-lash-whip",
    "name": "Tyranid Prime with Lash Whip",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "A living beacon of the Hive Mind’s will, the Tyranid Prime advances amidst swarms of warrior organisms, driving them ever forward into the prey. Should some defiant enemy anchor the line against the onrushing hordes, the Tyranid Prime strikes with its coiling lash whip to strangle, agonise and slay.",
    "profiles": [
      {
        "name": "",
        "m": "10\"",
        "t": "5",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Rending claw",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Lash whip",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Scything talons",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Alpha Warrior",
        "text": "Weapons equipped by models in this model’s unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Aggressive Leader-beast",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed by those attacks, this unit can make a surge move of up to D6\"."
      }
    ],
    "composition": [
      "1 Tyranid Prime with Lash Whip"
    ],
    "loadout": "**This model is equipped with:** 1 rending claw; 1 lash whip; 1 scything talons.",
    "options": [
      "None."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Termagants",
        "Hormagaunts",
        "Tyranid Warriors With Ranged Bio-weapons",
        "Tyranid Warriors With Melee Bio-weapons"
      ]
    },
    "keywords": [
      "Character",
      "Great Devourer",
      "Synapse",
      "Tyranid Prime with Lash Whip",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "tyranid-warriors-with-melee-bio-weapons",
    "name": "Tyranid Warriors With Melee Bio-weapons",
    "points": [
      {
        "models": 3,
        "points": 75
      },
      {
        "models": 6,
        "points": 150
      }
    ],
    "flavor": "When adapted for close-quarters battle with an array of vicious talons, claws and chitinous blades, Tyranid Warriors excel in leading the onslaught from the front. Even as they slaughter elite prey and send lesser foes fleeing in terror, the Tyranid Warriors act as nodal relays for the insidious Hive Mind and ensure the attack is pressed home with unstoppable ferocity.",
    "profiles": [
      {
        "name": "Tyranid Warriors With Melee Bio-weapons",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "melee": [
      {
        "name": "Tyranid Warrior claws and talons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Adaptive Instincts",
        "text": "In the Fight phase, when this unit is selected to fight or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit’s melee attacks have +1 S.\n▪ Or: This unit has +1 T."
      }
    ],
    "composition": [
      "1 Tyranid Prime",
      "2-5 Tyranid Warriors"
    ],
    "loadout": "**Every model is equipped with:** Tyranid Warrior claws and talons.",
    "keywords": [
      "Tyranid Warriors with Melee Bio-weapons",
      "Infantry",
      "Great Devourer",
      "Synapse"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "tyranid-warriors-with-ranged-bio-weapons",
    "name": "Tyranid Warriors With Ranged Bio-weapons",
    "points": [
      {
        "models": 3,
        "points": 60
      },
      {
        "models": 6,
        "points": 120
      }
    ],
    "flavor": "Strong, swift, independently intelligent and amongst the Hive Mind’s most adaptable bioforms, Tyranid Warriors are the backbone of many Tyranid invasions. Their synaptic link imbues them with advanced martial abilities, and also allows them to serve as synaptic linchpins within the wider swarms during battle.",
    "profiles": [
      {
        "name": "Tyranid Warriors With Ranged Bio-weapons",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Barbed strangler",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Deathspitter",
        "tags": [],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Devourer",
        "tags": [],
        "range": "18\"",
        "a": "5",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Spinefists",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Venom cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Tyranid Warrior claws and talons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Adaptable Predators",
        "text": "This unit is eligible to shoot and declare a charge in a turn in which it Fell Back."
      }
    ],
    "composition": [
      "1 Tyranid Prime",
      "2-5 Tyranid Warriors"
    ],
    "loadout": "**Every model is equipped with:** devourer; Tyranid Warrior claws and talons.",
    "options": [
      "Any number of models can each have their devourer replaced with one of the following:\n▪ 1 deathspitter\n▪ 1 spinefists",
      "For every 3 models in this unit, 1 model’s devourer can be replaced with 1 barbed strangler.",
      "For every 3 models in this unit, 1 model’s devourer can be replaced with 1 venom cannon."
    ],
    "keywords": [
      "Great Devourer",
      "Tyranid Warriors with Ranged Bio-weapons",
      "Infantry",
      "Synapse"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "tyrannocyte",
    "name": "Tyrannocyte",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Tyrannocytes are huge spores, heat-resistant to endure atmospheric re-entry and with wet, pulsing interior chambers within which broods of organisms can ride down to a world’s surface. Once its passengers spill forth into battle, the Tyrannocyte drifts skyward again and goes hunting for its own prey.",
    "profiles": [
      {
        "name": "Tyrannocyte",
        "m": "8\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "8+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Tyrannocyte bio-weapons",
        "tags": [],
        "range": "24\"",
        "a": "5",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Flensing whips",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Aerial Seeding",
        "text": "This model must start the battle in Reserves, but neither it nor any units embarked within it are counted towards any limits placed on the maximum number of Reserves units you can start the battle with. This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model must immediately disembark after it has been set up on the battlefield, and they must be set up more than 8\" away from all enemy models. After this model has been set up on the battlefield, no units can embark within it."
      }
    ],
    "composition": [
      "1 Tyrannocyte"
    ],
    "loadout": "**This model is equipped with:** Tyrannocyte bio-weapons; flensing whips.",
    "transport": "This model has a transport capacity of 20 Tyranids Infantry models, or 1 Tyranids Monster model with a Wounds characteristic of 12 or less. Each INFANTRY model with a Wounds characteristic of more than 1 takes up the space of 3 models.",
    "keywords": [
      "Dedicated Transport",
      "Fly",
      "Frame",
      "Great Devourer",
      "Monster",
      "Transport",
      "Tyrannocyte",
      "Vanguard Invader"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "tyrannofex",
    "name": "Tyrannofex",
    "points": [
      {
        "models": 1,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "The Tyrannofex is a walking battle tank and heavy weapons platform of huge size and resilience. These warrior organisms are extremely well armoured, more than capable of going toe-to-toe with the heaviest battle tanks of their prey species in a shooting match. Few foes can stand against even one of these beasts.",
    "profiles": [
      {
        "name": "Tyrannofex",
        "m": "9\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "8+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Acid spray",
        "tags": [
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6+6",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Fleshborer hive",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "20",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rupture cannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "D6+6"
      },
      {
        "name": "Stinger salvoes",
        "tags": [],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Powerful limbs",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Resilient Organism",
        "text": "Once per battle, when an attack is allocated to this model, you can change the Damage characteristic of that attack to 0."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Tyrannofex"
    ],
    "loadout": "**This model is equipped with:** fleshborer hive; stinger salvoes; powerful limbs.",
    "options": [
      "This model’s fleshborer hive can be replaced with one of the following:\n▪ 1 acid spray\n▪ 1 rupture cannon"
    ],
    "keywords": [
      "Frame",
      "Great Devourer",
      "Monster",
      "Tyrannofex"
        ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "tyrant-guard",
    "name": "Tyrant Guard",
    "points": [
      {
        "models": 3,
        "points": 80
      },
      {
        "models": 6,
        "points": 160
      }
    ],
    "flavor": "Incredibly well armoured and resilient, Tyrant Guard form a mobile bulwark around their assigned synapse organism. So extreme is their bio-adaptation, they do not even possess weak spots such as eyes. Instead, they are guided as extensions of their charge’s synaptic will, acting as living weapons and shields.",
    "profiles": [
      {
        "name": "Tyrant Guard",
        "m": "6\"",
        "t": "8",
        "sv": "3+",
        "w": "4",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Bone cleaver, lash whip and rending claws",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Crushing claws and rending claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Scything talons and rending claws",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Guardian Organism",
        "text": "While a CHARACTER model is leading this unit, that CHARACTER model has the Feel No Pain 5+ ability."
      }
    ],
    "composition": [
      "3-6 Tyrant Guard"
    ],
    "loadout": "**Every model is equipped with:** scything talons and rending claws.",
    "options": [
      "Any number of models can each have their scything talons and rending claws replaced with one of the following:\n▪ 1 bone cleaver, lash whip and rending claws\n▪ 1 crushing claws and rending claws"
    ],
    "keywords": [
      "Great Devourer",
      "Tyrant Guard",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "venomthropes",
    "name": "Venomthropes",
    "points": [
      {
        "models": 3,
        "points": 55
      },
      {
        "models": 6,
        "points": 110
      }
    ],
    "flavor": "Venomthropes drift forward amidst miasmal clouds of spores that spew from within their bodies. The touch of their tendrils is extremely poisonous, and those exposed to the Venomthropes’ spore clouds for any length of time drown on their own frothing fluids as they dissolve from the inside out.",
    "profiles": [
      {
        "name": "Venomthropes",
        "m": "6\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Toxic lashes",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "a": "5",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Stealth",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Foul Spores (Aura)",
        "text": "Friendly TYRANIDS units within 6\" of this unit have Stealth."
      }
    ],
    "composition": [
      "3-6 Venomthropes"
    ],
    "loadout": "**Every model is equipped with:** toxic lashes.",
    "keywords": [
      "Venomthropes",
      "Fly",
      "Infantry",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "von-ryans-leapers",
    "name": "Von Ryan’s Leapers",
    "points": [
      {
        "models": 3,
        "points": 55
      },
      {
        "models": 6,
        "points": 105
      }
    ],
    "flavor": "Stealthy hunters and expert ambushers, Von Ryan’s Leapers are swift, agile and especially lethal when fighting in dense terrain. Akin to living mines, they lie still at the optimum locations to cause as much damage as possible. When they sense the perfect time to strike, they butcher all around in a murderous frenzy.",
    "profiles": [
      {
        "name": "Von Ryan’s Leapers",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "8+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "melee": [
      {
        "name": "Leaper’s talons",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Fights First, Infiltrators, Stealth",
    "faction": "Synapse",
    "abilities": [
      {
        "name": "Pouncing Leap",
        "text": "You can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "composition": [
      "3-6 Von Ryan’s Leapers"
    ],
    "loadout": "**Every model is equipped with:** Leaper’s talons.",
    "keywords": [
      "Von Ryan’s Leapers",
      "Vanguard Invader",
      "Great Devourer",
      "Infantry"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "winged-hive-tyrant",
    "name": "Winged Hive Tyrant",
    "points": [
      {
        "models": 1,
        "points": 185
      }
    ],
    "flavor": "When the Hive Mind deploys airborne swarms, it spawns Winged Hive Tyrants to direct them in battle. Wielding an array of nightmarish organic weapons, their monstrous forms singing with the synaptic might of the Hive Mind, these dread swarm-leaders spread terror and death wherever the dark shadow of their wings falls.",
    "profiles": [
      {
        "name": "Winged Hive Tyrant",
        "m": "12\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy venom cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Stranglethorn cannon",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Monstrous bonesword and lash whip",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Monstrous scything talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Tyrant talons",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Will of the Hive Mind",
        "text": "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Paroxysm (Psychic)",
        "text": "At the start of the Fight phase, you can select one enemy unit within 12\" of and visible to this model and roll one D6: on a 1, this PSYKER suffers D3 mortal wounds; on a 2+, until the end of the phase, subtract 1 from the Attacks characteristic of weapons equipped by models in that unit."
      }
    ],
    "composition": [
      "1 Winged Hive Tyrant"
    ],
    "loadout": "**This model is equipped with:** monstrous bonesword and lash whip; Tyrant talons.",
    "options": [
      "This model’s monstrous bonesword and lash whip can be replaced with one of the following:\n▪ 1 heavy venom cannon\n▪ 1 stranglethorn cannon\n▪ 1 monstrous scything talons"
    ],
    "keywords": [
      "Hive Tyrant",
      "Monster",
      "Character",
      "Psyker",
      "Vanguard Invader",
      "Winged Hive Tyrant",
      "Synapse",
      "Great Devourer",
      "Fly"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "winged-tyranid-prime",
    "name": "Winged Tyranid Prime",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Tyranid Primes adapted for flight possess all the physical and synaptic might of an alpha war-beast, while also boasting the frightening speed and manoeuvrability imparted by huge leathery wings. Swooping down into the midst of the foe, they rend and tear until nought remains but corpses and fleeing prey.",
    "profiles": [
      {
        "name": "Winged Tyranid Prime",
        "m": "12\"",
        "t": "5",
        "sv": "4+",
        "w": "6",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Prime talons",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Alpha Warrior",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Death Blow",
        "text": "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      }
    ],
    "composition": [
      "1 Winged Tyranid Prime"
    ],
    "loadout": "**This model is equipped with:** Prime talons.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Gargoyles",
        "Tyranid Warriors With Melee Bio-weapons",
        "Tyranid Warriors With Ranged Bio-weapons"
      ]
    },
    "keywords": [
      "Synapse",
      "Winged Tyranid Prime",
      "Vanguard Invader",
      "Infantry",
      "Fly",
      "Great Devourer",
      "Character"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "zoanthropes",
    "name": "Zoanthropes",
    "points": [
      {
        "models": 3,
        "points": 90
      },
      {
        "models": 6,
        "points": 200
      }
    ],
    "flavor": "A Zoanthrope’s physical form is given over to harnessing the might of the Hive Mind. Not only do they act as synapse nodes, but they can also draw upon the energies of the Hive Mind to unleash searing psychic blasts, and to generate fields of defensive power that can stop an artillery shell dead.",
    "profiles": [
      {
        "name": "Zoanthropes",
        "m": "5\"",
        "t": "5",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Warp Blast – witchfire",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Warp Blast – focused witchfire",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Chitinous claws and teeth",
        "tags": [],
        "a": "2",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Shadow in the Warp, Synapse",
    "abilities": [
      {
        "name": "Spirit Leech (Aura, Psychic)",
        "text": "While an enemy unit is within 6\" of this unit, if this unit contains a Neurothrope, each time that enemy unit fails a Battle-shock test, it suffers D3 mortal wounds and one model in this unit regains up to D3 lost wounds."
      },
      {
        "name": "Warp Field (Aura, Psychic)",
        "text": "While a friendly Tyranids unit is within 6\" of this unit, models in that unit have a 6+ invulnerable save."
      }
    ],
    "composition": [
      "1 Neurothrope",
      "2-5 Zoanthropes"
    ],
    "loadout": "**Every model is equipped with:** Warp Blast; chitinous claws and teeth.",
    "keywords": [
      "Infantry",
      "Synapse",
      "Zoanthropes",
      "Psyker",
      "Fly",
      "Great Devourer"
    ],
    "factionKeywords": [
      "Tyranids"
    ],
    "baseSize": "40mm"
  }
]
