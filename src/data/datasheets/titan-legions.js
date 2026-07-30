// Titan Legions — datasheets. Source: wh40k-appdata (../wh40k-appdata/factions/adeptus-titanicus.json,
// "Imperial Armour: Titan Legions"), the official GW app data dump.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// A Titan has no detachment of its own (see src/data/factions/titan-legions.js): it is an
// ally slot addable to any all-IMPERIUM army via the Titanic Support army rule.
export default [
  {
    "id": "reaver-titan",
    "name": "Reaver Titan",
    "points": [
      {
        "models": 1,
        "points": 2200
      }
    ],
    "flavor": "Reaver Titans are vast god-machines possessed of truly devastating firepower. From the apocalypse missile launcher mounted on their carapace to their arm-mounted laser blaster, Reavers are more than capable of wiping out ground troops, their void shields and thick adamantine hulls nullifying all but the most piercing enemy strikes.",
    "profiles": [
      {
        "name": "Reaver Titan",
        "m": "12\"",
        "t": "14",
        "sv": "2+",
        "w": "60",
        "ld": "6+",
        "oc": "20",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Reaver volcano cannon",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "120\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "24",
        "ap": "-5",
        "d": "14"
      },
      {
        "name": "Reaver laser blaster",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "8",
        "bs": "3+",
        "s": "20",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Reaver melta cannon",
        "tags": [
          "BLAST",
          "MELTA 4"
        ],
        "range": "48\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "13",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaver gatling blaster",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "72\"",
        "a": "12",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaver apocalypse launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "200\"",
        "a": "3D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaver power fist – strike",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "20",
        "ap": "-4",
        "d": "14"
      },
      {
        "name": "Reaver power fist – sweep",
        "tags": [],
        "a": "12",
        "ws": "4+",
        "s": "12",
        "ap": "-3",
        "d": "6"
      },
      {
        "name": "Reaver feet",
        "tags": [],
        "a": "8",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D6+6",
    "faction": "Super-heavy Walker",
    "abilities": [
      {
        "name": "Striding Colossus",
        "text": "Each time you target this model with a Stratagem, you must spend three times that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "God-machine",
        "text": "This model is eligible to shoot and declare a charge in a turn in which it Fell Back."
      }
    ],
    "damaged": {
      "note": "1-20 wounds remaining",
      "text": "While this model has 1-20 wounds remaining, subtract 10 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Reaver Titan"
    ],
    "loadout": "**This model is equipped with:** Reaver apocalypse launcher; Reaver gatling blaster; Reaver laser blaster; Reaver feet.",
    "options": [
      "This model’s Reaver gatling blaster can be replaced with one of the following:\n▪ 1 Reaver laser blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon\n▪ 1 Reaver power fist",
      "This model’s Reaver laser blaster can be replaced with one of the following:\n▪ 1 Reaver gatling blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Reaver Titan",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [],
    "baseSize": "Hull"
  },
  {
    "id": "warbringer-nemesis-titan",
    "name": "Warbringer Nemesis Titan",
    "points": [
      {
        "models": 1,
        "points": 2600
      }
    ],
    "flavor": "The Warbringer Nemesis Titan is an immense war engine designed to destroy enemy Titan-class targets at range. Acting as a dedicated fire support platform, the Nemesis’ reinforced frontal plating allows it to weather most return fire with ease, while its defence batteries grant it ample protection from aerial attacks.",
    "profiles": [
      {
        "name": "Warbringer Nemesis Titan",
        "m": "12\"",
        "t": "14",
        "sv": "2+",
        "w": "80",
        "ld": "6+",
        "oc": "20",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Reaver volcano cannon",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "120\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "24",
        "ap": "-5",
        "d": "14"
      },
      {
        "name": "Reaver gatling blaster",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "72\"",
        "a": "12",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaver melta cannon",
        "tags": [
          "BLAST",
          "MELTA 4"
        ],
        "range": "48\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "13",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaver laser blaster",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "8",
        "bs": "3+",
        "s": "20",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Ardex-defensor mauler",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Anvillus defence battery",
        "tags": [
          "ANTI-FLY 4+"
        ],
        "range": "72\"",
        "a": "8",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Nemesis quake cannon",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "480\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "4"
      },
      {
        "name": "Nemesis volcano cannon",
        "tags": [
          "BLAST"
        ],
        "range": "120\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "24",
        "ap": "-5",
        "d": "14"
      }
    ],
    "melee": [
      {
        "name": "Nemesis feet",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D6+6",
    "faction": "Super-heavy Walker",
    "abilities": [
      {
        "name": "Striding Colossus",
        "text": "Each time you target this model with a Stratagem, you must spend three times that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "Titanic Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly **IMPERIUM** model makes an attack that targets that enemy unit, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "damaged": {
      "note": "1-26 wounds remaining",
      "text": "While this model has 1-26 wounds remaining, subtract 10 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Warbringer Nemesis Titan"
    ],
    "loadout": "**This model is equipped with:** 2 anvillus defence batteries; 3 ardex-defensor maulers; Nemesis quake cannon; Reaver gatling blaster; Reaver laser blaster; Nemesis feet.",
    "options": [
      "This model’s Nemesis quake cannon can be replaced with 1 Nemesis volcano cannon.",
      "This model’s Reaver gatling blaster can be replaced with one of the following:\n▪ 1 Reaver laser blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon",
      "This model’s Reaver laser blaster can be replaced with one of the following:\n▪ 1 Reaver gatling blaster\n▪ 1 Reaver melta cannon\n▪ 1 Reaver volcano cannon"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker",
      "Warbringer Nemesis Titan"
    ],
    "factionKeywords": [],
    "baseSize": "Hull"
  },
  {
    "id": "warhound-titan",
    "name": "Warhound Titan",
    "points": [
      {
        "models": 1,
        "points": 1100
      }
    ],
    "flavor": "Warhounds are the eyes and ears of the Titan Legions, used to perform dangerous reconnaissance or raiding missions. Despite being the smallest Titan class, a single Warhound can easily turn the tide of battle when used to support ground forces, the sheer power of its weaponry and armour being more than most foes can overcome.",
    "profiles": [
      {
        "name": "Warhound Titan",
        "m": "14\"",
        "t": "13",
        "sv": "2+",
        "w": "40",
        "ld": "6+",
        "oc": "16",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Warhound turbo-laser destructor",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "20",
        "ap": "-3",
        "d": "2D6"
      },
      {
        "name": "Warhound plasma blastgun – standard",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "2D6+3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Warhound plasma blastgun – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "72\"",
        "a": "2D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "5"
      },
      {
        "name": "Warhound inferno gun",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "24\"",
        "a": "3D6",
        "bs": "N/A",
        "s": "7",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Warhound vulcan mega-bolter",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "48\"",
        "a": "20",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Warhound feet",
        "tags": [],
        "a": "8",
        "ws": "4+",
        "s": "10",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Super-heavy Walker",
    "abilities": [
      {
        "name": "Striding Colossus",
        "text": "Each time you target this model with a Stratagem, you must spend twice that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "Flank Speed",
        "text": "Each time this model Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 8\" to the Move characteristic of this model."
      }
    ],
    "damaged": {
      "note": "1-13 wounds remaining",
      "text": "While this model has 1-13 wounds remaining, subtract 8 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Warhound Titan"
    ],
    "loadout": "**This model is equipped with:** Warhound plasma blastgun; Warhound vulcan mega-bolter; Warhound feet.",
    "options": [
      "This model’s Warhound plasma blastgun can be replaced with one of the following:\n▪ 1 Warhound inferno gun\n▪ 1 Warhound turbo-laser destructor\n▪ 1 Warhound vulcan mega-bolter",
      "This model’s Warhound vulcan mega-bolter can be replaced with one of the following:\n▪ 1 Warhound inferno gun\n▪ 1 Warhound plasma blastgun\n▪ 1 Warhound turbo-laser destructor"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker",
      "Warhound Titan"
    ],
    "factionKeywords": [],
    "baseSize": "Hull"
  },
  {
    "id": "warlord-titan",
    "name": "Warlord Titan",
    "points": [
      {
        "models": 1,
        "points": 3500
      }
    ],
    "flavor": "Warlord Titans are gargantuan embodiments of the Omnissiah’s wrath. With the destructive power of a small void warship and the resilience of a fortress, Warlords reign supreme over almost all adversaries, dispensing doom with every thundering weapons salvo and crushing any survivors beneath their earth-shattering stride.",
    "profiles": [
      {
        "name": "Warlord Titan",
        "m": "10\"",
        "t": "16",
        "sv": "2+",
        "w": "100",
        "ld": "6+",
        "oc": "30",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Arioch power claw",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "48\"",
        "a": "20",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Mori quake cannon",
        "tags": [
          "BLAST",
          "IGNORES COVER"
        ],
        "range": "280\"",
        "a": "3D6",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Belicosa volcano cannon",
        "tags": [
          "BLAST"
        ],
        "range": "120\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "32",
        "ap": "-5",
        "d": "18"
      },
      {
        "name": "Sunfury plasma annihilator – standard",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "2D6+6",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "5"
      },
      {
        "name": "Sunfury plasma annihilator – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "72\"",
        "a": "2D6+6",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Macro gatling blaster",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "100\"",
        "a": "30",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Laser blaster",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "6",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+3"
      },
      {
        "name": "Ardex-defensor mauler",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Apocalypse launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "200\"",
        "a": "20",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ardex-defensor lascannon",
        "tags": [],
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
        "name": "Arioch power claw – strike",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "20",
        "ap": "-4",
        "d": "24"
      },
      {
        "name": "Arioch power claw – sweep",
        "tags": [],
        "a": "12",
        "ws": "4+",
        "s": "12",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Warlord feet",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      }
    ],
    "core": "Deadly Demise 2D6+6",
    "faction": "Super-heavy Walker",
    "abilities": [
      {
        "name": "Striding Colossus",
        "text": "Each time you target this model with a Stratagem, you must spend four times that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "Wrath of the Omnissiah",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test."
      }
    ],
    "damaged": {
      "note": "1-33 wounds remaining",
      "text": "While this model has 1-33 wounds remaining, subtract 15 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Warlord Titan"
    ],
    "loadout": "**This model is equipped with:** 2 apocalypse launchers; 2 ardex-defensor lascannons; 2 ardex-defensor maulers; macro gatling blaster; arioch power claw; Warlord feet.",
    "options": [
      "This model’s 2 apocalypse launchers can be replaced with 2 laser blasters.",
      "This model’s arioch power claw can be replaced with one of the following:\n▪ 1 belicosa volcano cannon\n▪ 1 macro gatling blaster\n▪ 1 mori quake cannon\n▪ 1 sunfury plasma annihilator",
      "This model’s macro gatling blaster can be replaced with one of the following:\n▪ 1 arioch power claw\n▪ 1 belicosa volcano cannon\n▪ 1 mori quake cannon\n▪ 1 sunfury plasma annihilator"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker",
      "Warlord Titan"
    ],
    "factionKeywords": [],
    "baseSize": "Hull"
  }
]
