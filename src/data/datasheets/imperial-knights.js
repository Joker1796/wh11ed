// Imperial Knights — datasheets. Unit roster and points from src/data/mfm/imperial-knights.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "acastus-knight-asterius",
    "name": "Acastus Knight Asterius",
    "points": [
      {
        "models": 1,
        "points": 785,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 860,
        "note": "2nd+"
      }
    ],
    "flavor": "Like its cousin the Porphyrion, the gigantic Acastus Knight Asterius is a relic of a lost technological age. Armed with a pair of twin conversion beam cannons, a karacnos mortar battery and two volkite culverins, the Asterius is capable of sundering the walls of mighty fortresses and clearing ramparts with a hail of high-explosives, its thick armoured hide making it near impervious to weapons fire.",
    "profiles": [
      {
        "name": "Acastus Knight Asterius",
        "m": "8\"",
        "t": "13",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Asterius volkite culverin",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Karacnos mortar battery",
        "tags": [
          "ANTI-INFANTRY 2+",
          "BLAST",
          "IGNORES COVER",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin conversion beam cannon",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "16",
        "ap": "-2",
        "d": "6"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "10",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Sunderer of Fortresses",
        "text": "Each time this model makes an attack that targets a VEHICLE, improve the Strength and Damage characteristics of that attack by 1. If that attack targets a FORTIFICATION, improve the Strength and Damage characteristics of that attack by 2 instead."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Acastus Knight Asterius"
    ],
    "loadout": "**This model is equipped with:** 2 Asterius volkite culverins; karacnos mortar battery; 2 twin conversion beam cannons; titanic feet.",
    "options": [
      "None"
    ],
    "keywords": [
      "Acastus",
      "Frame",
      "Imperium",
      "Knight Asterius",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker"
        ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "acastus-knight-porphyrion",
    "name": "Acastus Knight Porphyrion",
    "points": [
      {
        "models": 1,
        "points": 725,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 800,
        "note": "2nd+"
      }
    ],
    "flavor": "One of the most heavily armed and armoured of all Knight chassis, the Acastus Knight Porphyrion approaches even the war machines of the Collegia Titanica in size and power, and reigns supreme against any foe not equipped with dedicated countermeasures. The Porphyrion’s giant torso supports a pair of twin magna lascannons, amongst other weapons, capable of obliterating the mightiest armoured targets.",
    "profiles": [
      {
        "name": "Acastus Knight Porphyrion",
        "m": "8\"",
        "t": "13",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Acastus autocannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Acastus ironstorm missile pod",
        "tags": [
          "BLAST",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Helios defence missiles",
        "tags": [
          "ANTI-FLY 2+",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
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
        "name": "Twin magna lascannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "72\"",
        "a": "D6",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "D6+6"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "10",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Bastion of Firepower",
        "text": "Each time this model Remains Stationary, until the end of the turn, ranged weapons equipped by this model have the [LETHAL HITS] ability."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Acastus Knight Porphyrion"
    ],
    "loadout": "**This model is equipped with:** 2 Acastus autocannons; Acastus ironstorm missile pod; 2 twin magna lascannons; titanic feet.",
    "options": [
      "This model’s 2 Acastus autocannons can be replaced with one of the following:\n▪ 2 lascannons\n▪ 1 Acastus autocannon and 1 lascannon",
      "This model’s Acastus ironstorm missile pod can be replaced with 1 helios defence missiles."
    ],
    "keywords": [
      "Acastus",
      "Frame",
      "Imperium",
      "Knight Porphyrion",
      "Titanic",
      "Towering",
      "Vehicle",
      "Walker"
        ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "armiger-helverin",
    "name": "Armiger Helverin",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "From flanking positions, vanguard fire points and while loping forward in ambush, these fast-moving Knight suits lay down hails of heavy fire. Amongst Helverins’ key strategic roles are enfilading fire, scouting and suppression fire, using their autocannons to fire hundreds of shells per minute, and vow-bonded packs of these war engines can shatter an enemy assault in seconds.",
    "profiles": [
      {
        "name": "Armiger Helverin",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "14",
        "ld": "7+",
        "oc": "6",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Armiger autocannon",
        "tags": [],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured feet",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Code Chivalric",
    "abilities": [
      {
        "name": "Suppression Protocols",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks made with an Armiger autocannon. Until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, subtract 3 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Armiger Helverin"
    ],
    "loadout": "**This model is equipped with:** 2 Armiger autocannons; Questoris heavy stubber; armoured feet.",
    "options": [
      "This model’s Questoris heavy stubber can be replaced with 1 meltagun."
    ],
    "keywords": [
      "Helverin",
      "Imperium",
      "Walker",
      "Vehicle",
      "Armiger"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "armiger-moirax",
    "name": "Armiger Moirax",
    "points": [
      {
        "models": 1,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "While larger breeds of Knight are optimised for frontal assaults, tank-hunting and fortress-breaking, the smaller and more nimble Armiger Moirax is a natural skirmisher, able to speed ahead of more ponderous war machines and engage vulnerable targets. Armiger Moirax can be fitted with a range of esoteric energy weapons, all extremely effective but almost impossible to replace or repair.",
    "profiles": [
      {
        "name": "Armiger Moirax",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "14",
        "ld": "7+",
        "oc": "6",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Conversion beam cannon",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Graviton pulsar",
        "tags": [
          "ANTI-VEHICLE 2+",
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Lightning lock",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Rad cleanser",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Volkite veuglaire",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "8",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured feet",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Siege claw",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Code Chivalric",
    "abilities": [
      {
        "name": "Protection Protocols",
        "text": "You can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, subtract 3 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Armiger Moirax"
    ],
    "loadout": "**This model is equipped with:** graviton pulsar; volkite veuglaire; armoured feet.",
    "options": [
      "This model’s volkite veuglaire can be replaced with one of the following:\n▪ 1 siege claw and 1 rad cleanser\n▪ 1 graviton pulsar\n▪ 1 lightning lock\n▪ 1 conversion beam cannon",
      "This model’s graviton pulsar can be replaced with one of the following;\n▪ 1 siege claw and 1 rad cleanser\n▪ 1 lightning lock\n▪ 1 conversion beam cannon\n▪ 1 volkite veuglaire"
    ],
    "keywords": [
      "Moirax",
      "Vehicle",
      "Armiger",
      "Imperium",
      "Walker"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "armiger-warglaive",
    "name": "Armiger Warglaive",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "Armiger Warglaives are nimble and purposeful Knights, possessing exceptional speed that allows them to outpace most vehicles. Eager for glory, their Bondsmen pilots aggressively prowl battlefields ahead of their masters. Their agility, alongside weapons that can melt and carve through heavy armour, make them fearsome hunters of enemy war engines and hulking monstrosities.",
    "profiles": [
      {
        "name": "Armiger Warglaive",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "14",
        "ld": "7+",
        "oc": "6",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Thermal spear",
        "tags": [
          "MELTA 4"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Reaper chain-cleaver – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Reaper chain-cleaver – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Code Chivalric",
    "abilities": [
      {
        "name": "Impetuous Glory",
        "text": "Each time this model makes a Charge move, until the end of the turn, add 1 to the Attacks characteristic of this model’s reaper chain-cleaver - strike profile, and add 2 to the Attacks characteristic of this model’s reaper chain-cleaver - sweep profile."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, subtract 3 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Armiger Warglaive"
    ],
    "loadout": "**This model is equipped with:** Questoris heavy stubber; thermal spear; reaper chain-cleaver.",
    "options": [
      "This model’s Questoris heavy stubber can be replaced with 1 meltagun."
    ],
    "keywords": [
      "Warglaive",
      "Armiger",
      "Imperium",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "canis-rex",
    "name": "Canis Rex",
    "points": [
      {
        "models": 1,
        "points": 415
      }
    ],
    "flavor": "Canis Rex is the last unsullied remnant of House Cerberan. Under the expertise of its pilot, Sir Hekhtur, Canis Rex has become a vaunted legend. The ferocity - and, at times, apparent intuitive autonomy - of its machine spirit makes the Knight deadly on the battlefield. With pulsating volleys of laser ordnance and crushing sweeps of its huge gauntlet, enslaving oppressors are mercilessly crushed.",
    "profiles": [
      {
        "name": "Canis Rex",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Las-impulsor – high intensity",
        "tags": [
          "BLAST",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "2+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Las-impulsor – low intensity",
        "tags": [
          "BLAST",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Questoris multi-laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "2+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Freedom’s Hand – strike",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "20",
        "ap": "-3",
        "d": "9"
      },
      {
        "name": "Freedom’s Hand – sweep",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "10",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Legendary Freeblade",
        "text": "Once per turn, you can target this model with a Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem in the same phase."
      },
      {
        "name": "Chainbreaker",
        "text": "Once per battle, at the start of any phase, you can select one friendly IMPERIUM unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Canis Rex – EPIC HERO"
    ],
    "loadout": "**Canis Rex is equipped with:** las-impulsor; Questoris multi-laser; Freedom’s Hand.",
    "keywords": [
      "Imperium",
      "Canis Rex",
      "Towering",
      "Character",
      "Questoris",
      "Titanic",
      "Vehicle",
      "Epic Hero",
      "Walker"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "sir-hekhtur",
    "name": "Sir Hekhtur",
    "points": [],
    "flavor": "Once a prisoner of the Iron Warriors, Sir Hekhtur resisted agonising torture and escaped only through sheer faith, determination and honour. Now he travels the galaxy, liberating Imperial citizens enslaved by the forces of the Arch-enemy.",
    "profiles": [
      {
        "name": "Sir Hekhtur",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "5+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Hekhtur’s pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Lone Operative",
    "faction": "",
    "abilities": [],
    "composition": [
      "1 Sir Hekhtur – EPIC HERO"
    ],
    "loadout": "**Sir Hekhtur is equipped with:** Hekhtur’s pistol; close combat weapon.",
    "keywords": [
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Sir Hekhtur"
    ],
    "factionKeywords": [],
    "baseSize": "25mm"
  },
  {
    "id": "cerastus-knight-acheron",
    "name": "Cerastus Knight Acheron",
    "points": [
      {
        "models": 1,
        "points": 380,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 395,
        "note": "2nd+"
      }
    ],
    "flavor": "The Cerastus Knight Acheron is a war machine designed not only to destroy, but also to inspire terror. Armed with a fearsome reaper chainfist, twin heavy bolters and an Acheron-pattern flame cannon, they are employed as weapons of extermination, and nothing will sway them from their grim task until the enemy is utterly crushed.",
    "profiles": [
      {
        "name": "Cerastus Knight Acheron",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Acheron flame cannon",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "8",
        "ap": "-1",
        "d": "2"
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
        "name": "Reaper chainfist – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainfist – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Acheron’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, at the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test, subtracting 1 from the result when they do."
      },
      {
        "name": "Searing Flames",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks made with an Acheron flame cannon. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Cerastus Knight Acheron"
    ],
    "loadout": "**This model is equipped with:** Acheron flame cannon; twin heavy bolter; reaper chainfist.",
    "options": [
      "None"
    ],
    "keywords": [
      "Cerastus",
      "Imperium",
      "Towering",
      "Titanic",
      "Character",
      "Knight Acheron",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "cerastus-knight-atrapos",
    "name": "Cerastus Knight Atrapos",
    "points": [
      {
        "models": 1,
        "points": 405,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 425,
        "note": "2nd+"
      }
    ],
    "flavor": "One of the rarest and most potent Knights, the Atrapos was created early in the Great Crusade to carry particularly rare and powerful weaponry with a single goal in mind – the destruction of heretic and xenos war machines. Knights Atrapos are said to carry with them a cold and all-destroying hunger, and to pilot one is thought to be to court madness.",
    "profiles": [
      {
        "name": "Cerastus Knight Atrapos",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Atrapos lascutter – low intensity",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Atrapos lascutter – high intensity",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Graviton singularity cannon – contained",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Graviton singularity cannon – singularity",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS",
          "HAZARDOUS"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Atrapos lascutter – low intensity",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "12",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Atrapos lascutter – high intensity",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Atrapos’ Duty (Bondsman)",
        "text": "While a model is affected by this ability, each time that model makes an attack that targets a TITANIC or TOWERING model, you can re-roll the Hit roll and you can re-roll the Wound roll."
      },
      {
        "name": "Macro-extinction Protocols",
        "text": "Each time this model makes an attack that targets a MONSTER or VEHICLE unit, add 1 to the Hit roll. If that target is TITANIC or TOWERING, add 1 to the Wound roll as well."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Cerastus Knight Atrapos"
    ],
    "loadout": "**This model is equipped with:** Atrapos lascutter; graviton singularity cannon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Cerastus",
      "Vehicle",
      "Knight Atrapos",
      "Imperium",
      "Towering",
      "Titanic",
      "Character",
      "Walker"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "cerastus-knight-castigator",
    "name": "Cerastus Knight Castigator",
    "points": [
      {
        "models": 1,
        "points": 380,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 395,
        "note": "2nd+"
      }
    ],
    "flavor": "Armed with the fearsome Castigator-pattern bolt cannon, the Knight Castigator scythes down massed infantry formations in a thunderous rain of bolts, wiping out hordes that might overwhelm other patterns of Knight by their sheer numbers. Its path cleared, the Knight Castigator then strides forward to carve apart light vehicles or monstrous chitinous beasts with its tempest warblade.",
    "profiles": [
      {
        "name": "Cerastus Knight Castigator",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Castigator bolt cannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "18",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Tempest warblade – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Tempest warblade – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Castigator’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, its ranged weapons have the [SUSTAINED HITS 1] ability and the Armour Penetration characteristic of its ranged weapons is improved by 1."
      },
      {
        "name": "Storm of Bolts",
        "text": "In your Shooting phase, after this model has shot, select one unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks. Until the start of your next turn, while this model is on the battlefield, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Cerastus Knight Castigator"
    ],
    "loadout": "**This model is equipped with:** Castigator bolt cannon; tempest warblade.",
    "options": [
      "None"
    ],
    "keywords": [
      "Walker",
      "Knight Castigator",
      "Character",
      "Titanic",
      "Vehicle",
      "Towering",
      "Cerastus",
      "Imperium"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "cerastus-knight-lancer",
    "name": "Cerastus Knight Lancer",
    "points": [
      {
        "models": 1,
        "points": 415,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 435,
        "note": "2nd+"
      }
    ],
    "flavor": "The Lancer is the most widely known variant of the swift and agile Cerastus chassis. Equipped with a potent shock lance and an ion gauntlet shield, Knights Lancer are perfectly suited to duelling titanic foes face to face, and often bound ahead of the main battle line to vanquish the enemy’s most prized war machines in single combat.",
    "profiles": [
      {
        "name": "Cerastus Knight Lancer",
        "m": "14\"",
        "t": "11",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Cerastus shock lance",
        "tags": [
          "ASSAULT",
          "SUSTAINED HITS 2"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Cerastus shock lance – strike",
        "tags": [
          "LANCE"
        ],
        "a": "5",
        "ws": "2+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Cerastus shock lance – sweep",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Lancer’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, it is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Shock Charge",
        "text": "You can target this model with the Tank Shock Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Cerastus Knight Lancer"
    ],
    "loadout": "**This model is equipped with:** Cerastus shock lance.",
    "options": [
      "None"
    ],
    "keywords": [
      "Towering",
      "Titanic",
      "Walker",
      "Vehicle",
      "Character",
      "Cerastus",
      "Knight Lancer",
      "Imperium"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-castellan",
    "name": "Knight Castellan",
    "points": [
      {
        "models": 1,
        "points": 425,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 420,
        "note": "2nd+"
      }
    ],
    "flavor": "Built upon a Dommus-class chassis, the Knight Castellan’s dual plasma core fuels an array of weapon systems that make it among the foremost artillery Knights of the houses. The combined fire of several of these engines can equal that of an Imperial Navy warship battery, and tear the heart out of an enemy army.",
    "profiles": [
      {
        "name": "Knight Castellan",
        "m": "8\"",
        "t": "12",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Plasma decimator – standard",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Plasma decimator – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "3"
      },
      {
        "name": "Shieldbreaker missile launcher",
        "tags": [
          "ANTI-TITANIC 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "72\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-6",
        "d": "D6+1"
      },
      {
        "name": "Twin meltagun",
        "tags": [
          "MELTA 2",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin siegebreaker cannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Volcano lance",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "D3",
        "bs": "3+",
        "s": "18",
        "ap": "-5",
        "d": "D6+8"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Ion Aegis (Aura)",
        "text": "While a friendly Armiger model is within 6\" of this model, each time a ranged attack targets that model, it has the Benefit of Cover against that attack."
      },
      {
        "name": "Titan Hunter",
        "text": "Each time a ranged attack made by this model is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1‑10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Castellan"
    ],
    "loadout": "**This model is equipped with:** plasma decimator; 2 shieldbreaker missile launchers; 2 twin meltaguns; twin siegebreaker cannon; volcano lance; titanic feet.",
    "options": [
      "This model’s 2 shieldbreaker missile launchers and twin siegebreaker cannon can be replaced with 1 shieldbreaker missile launcher and 2 twin siegebreaker cannons."
    ],
    "keywords": [
      "Knight Castellan",
      "Imperium",
      "Towering",
      "Dominus",
      "Character",
      "Titanic",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-crusader",
    "name": "Knight Crusader",
    "points": [
      {
        "models": 1,
        "points": 395,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 415,
        "note": "2nd+"
      }
    ],
    "flavor": "Armed with a bristling array of heavy and long-ranged weapons, the Knight Crusader secures key firing positions and unleashes salvo after salvo at the enemy. The pilots of Knights Crusader will gladly steer their suits even into open ground to find the best place to shoot from and are regarded as especially dutiful and selfless by their peers.",
    "profiles": [
      {
        "name": "Knight Crusader",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Avenger gatling cannon",
        "tags": [],
        "range": "36\"",
        "a": "18",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
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
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Rapid-fire battle cannon",
        "tags": [
          "BLAST",
          "RAPID FIRE D6+3"
        ],
        "range": "72\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Thermal cannon",
        "tags": [
          "BLAST",
          "MELTA 6"
        ],
        "range": "24\"",
        "a": "2D3",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Crusader’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, each time that model makes a ranged attack, add 1 to the Hit roll."
      },
      {
        "name": "Punishing Salvoes",
        "text": "In your Movement phase, if this model Remains Stationary, until the end of the turn, ranged weapons equipped by this model have the [SUSTAINED HITS 1] ability."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Crusader"
    ],
    "loadout": "**This model is equipped with:** avenger gatling cannon; heavy flamer; meltagun; thermal cannon; titanic feet.",
    "options": [
      "This model’s meltagun can be replaced with 1 Questoris heavy stubber.",
      "This model’s thermal cannon can be replaced with:\n▪ 1 rapid-fire battle cannon and 1 Questoris heavy stubber",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Knight Crusader",
      "Walker",
      "Titanic",
      "Imperium",
      "Character",
      "Questoris",
      "Towering",
      "Vehicle"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-defender",
    "name": "Knight Defender",
    "points": [
      {
        "models": 1,
        "points": 400,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 420,
        "note": "2nd+"
      }
    ],
    "flavor": "Knights Defender use artefacts incorporating ancient technology in the selfless protection of their allies. With barely understood weapons, their pilots fire super-heated bolts that detonate with stellar brightness and beams that explosively transmute matter into energy, while the rippling mantle of a void shield wards their allies from harm.",
    "profiles": [
      {
        "name": "Knight Defender",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "4+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Conversion beam obliterator",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Plasma executor – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma executor – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Phosphor blaster",
        "tags": [
          "IGNORES COVER",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin incendine combustor",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
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
        "name": "Titanic feet",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Defender’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, each time an attack is allocated to that model, subtract 1 from the Damage characteristic of that attack."
      },
      {
        "name": "Selfless Protector",
        "text": "Each time a ranged attack is allocated to an Imperial Knights model from your army, if that model is not fully visible to every model in the attacking unit because of this Knight Defender model, that model has the Benefit of Cover and a 4+ invulnerable save against that attack."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Defender"
    ],
    "loadout": "**This model is equipped with:** conversion beam obliterator; plasma executor; twin incendine combustor; phosphor blaster; titanic feet.",
    "keywords": [
      "Questoris",
      "Walker",
      "Titanic",
      "Towering",
      "Vehicle",
      "Character",
      "Knight Defender",
      "Imperium"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-destrier",
    "name": "Knight Destrier",
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
    "flavor": "The Knight Destrier is agile and fleet-footed. Employing rocket thrusters, skilled pilots are able to lend greater speed to their charge, tearing into the foe with thundershock spears or reaper chainswords before mowing down what remains of their shattered enemies with hails of chastiser gatling rounds or explosive munitions from their frag bombards.",
    "profiles": [
      {
        "name": "Knight Destrier",
        "m": "12\"",
        "t": "10",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "8",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Chastiser gatling cannon",
        "tags": [
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Frag bombard",
        "tags": [
          "ASSAULT",
          "BLAST",
          "RAPID FIRE D6+3"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Questoris heavy stubber",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bellatus reaper chainsword – strike",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Bellatus reaper chainsword – sweep",
        "tags": [],
        "a": "10",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Thundershock spear – strike",
        "tags": [
          "LANCE"
        ],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Thundershock spear – sweep",
        "tags": [
          "LANCE"
        ],
        "a": "8",
        "ws": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Ram Jets",
        "text": "Each time this unit is selected to make a Normal or Advance move, until the end of the phase, add D3\" to the Move characteristic of this model."
      },
      {
        "name": "Thundercharge",
        "text": "If this model is equipped with a thundershock spear and a bellatus reaper chainsword, add 2 to the Attacks characteristic of melee weapons equipped by this model."
      },
      {
        "name": "Saturation Fire",
        "text": "Each time this model makes a ranged attack that targets a unit within range of one or more objective markers, that attack has the [IGNORES COVER] ability."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, subtract 4 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Destrier"
    ],
    "loadout": "**This model is equipped with:** 1 chastiser gatling cannon;\n1 frag bombard; 1 Questoris heavy stubber; 1 titanic feet.",
    "options": [
      "This model’s chastiser gatling cannon can be replaced with one of the following:\n▪ 1 bellatus reaper chainsword*\n▪ 1 thundershock spear*",
      "This model’s frag bombard can be replaced with one of the following:\n▪ 1 bellatus reaper chainsword*\n▪ 1 thundershock spear*\n\n* A model cannot be equipped with more than one bellatus reaper chainsword or more than one thundershock spear."
    ],
    "keywords": [
      "Imperium",
      "Knight Destrier",
      "Vehicle",
      "Walker",
      "Titanic",
      "Towering",
      "Bellatus",
      "Character"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "150mm Oval Base"
  },
  {
    "id": "knight-errant",
    "name": "Knight Errant",
    "points": [
      {
        "models": 1,
        "points": 355,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 370,
        "note": "3rd+"
      }
    ],
    "flavor": "These aggressive, close-range assault Knights excel at hunting and slaying enemy tanks and war beasts. They plunge aggressively into the fiercest fighting, unleashing hissing blasts of super-heated energy and deadly sweeps of their huge combat weapon. Theirs is a ceaseless hunt; they move on to new targets while melted ruin cools behind them.",
    "profiles": [
      {
        "name": "Knight Errant",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Thermal cannon",
        "tags": [
          "BLAST",
          "MELTA 6"
        ],
        "range": "24\"",
        "a": "2D3",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Thunderstrike gauntlet – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Thunderstrike gauntlet – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Errant’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, you can re-roll Advance rolls made for that model and ranged weapons equipped by that model have the [ASSAULT] ability."
      },
      {
        "name": "Aggressive Assault",
        "text": "Each time this model makes a ranged attack that targets the closest eligible target, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Errant"
    ],
    "loadout": "**This model is equipped with:** meltagun; thermal cannon; reaper chainsword.",
    "options": [
      "This model’s meltagun can be replaced with 1 Questoris heavy stubber.",
      "This model’s reaper chainsword can be replaced with 1 thunderstrike gauntlet.",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Titanic",
      "Questoris",
      "Character",
      "Towering",
      "Imperium",
      "Knight Errant"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-gallant",
    "name": "Knight Gallant",
    "points": [
      {
        "models": 1,
        "points": 355,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 370,
        "note": "3rd+"
      }
    ],
    "flavor": "Gallants are the most restless and combative of Knights, with machine spirits described as impetuous and beyond bellicose. Their pilots are aggressive and bold, sometimes difficult to restrain and reckless in their fearless ferocity to close with the foe and demonstrate their devastating power in close-quarters honour duels.",
    "profiles": [
      {
        "name": "Knight Gallant",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaper chainsword – strike",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "18",
        "ws": "2+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Thunderstrike gauntlet – strike",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Thunderstrike gauntlet – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "12",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Gallant’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, you can re-roll Charge rolls made for that model and each time that model makes a melee attack, you can re-roll the Hit roll."
      },
      {
        "name": "Martial Pride",
        "text": "Each time this unit Consolidates, models in it can move an additional 3\" provided your unit can end that move within Engagement Range of one or more enemy units."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Gallant"
    ],
    "loadout": "**This model is equipped with:** meltagun; thunderstrike gauntlet; reaper chainsword.",
    "options": [
      "This model’s meltagun can be replaced with 1 Questoris heavy stubber.",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Questoris",
      "Towering",
      "Titanic",
      "Vehicle",
      "Walker",
      "Knight Gallant",
      "Imperium",
      "Character"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-paladin",
    "name": "Knight Paladin",
    "points": [
      {
        "models": 1,
        "points": 375,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 390,
        "note": "3rd+"
      }
    ],
    "flavor": "These highly versatile Knights provide strategic backbone to many lances. While not specialised, they are favoured by most houses for their combination rapid-fire battle cannon, a direct firing artillery gun and a powerful close combat weapon. Seasoned Nobles prize these suits.",
    "profiles": [
      {
        "name": "Knight Paladin",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Rapid-fire battle cannon",
        "tags": [
          "BLAST",
          "RAPID FIRE D6+3"
        ],
        "range": "72\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Thunderstrike gauntlet – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Thunderstrike gauntlet – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Paladin’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, weapons equipped by that model have the [LETHAL HITS] ability, and melee weapons equipped by that model have the [LANCE] ability."
      },
      {
        "name": "Seasoned Noble",
        "text": "Each time this model makes a ranged attack that targets the closest eligible target, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Paladin"
    ],
    "loadout": "**This model is equipped with:** meltagun; Questoris heavy stubber; rapid-fire battle cannon; reaper chainsword.",
    "options": [
      "This model’s meltagun can be replaced with 1 Questoris heavy stubber.",
      "This model’s reaper chainsword can be replaced with 1 thunderstrike gauntlet.",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Vehicle",
      "Character",
      "Questoris",
      "Towering",
      "Titanic",
      "Walker",
      "Knight Paladin",
      "Imperium"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-preceptor",
    "name": "Knight Preceptor",
    "points": [
      {
        "models": 1,
        "points": 365,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 380,
        "note": "3rd+"
      }
    ],
    "flavor": "Knights Preceptor embody the Code Chivalric. Their pilots close to an honourable range with the foe, engage with a respectful force and kill them with efficiency deserving of their status. Typically, grizzled veterans pilot these Knights, setting an example for their younger comrades by hunting down the most fearsome enemies.",
    "profiles": [
      {
        "name": "Knight Preceptor",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Las-impulsor – high intensity",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Las-impulsor – low intensity",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "7",
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
        "name": "Questoris multi-laser",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Thunderstrike gauntlet – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Thunderstrike gauntlet – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Mentor (Bondsman)",
        "text": "Each time a model affected by this ability makes an attack that targets this model’s quarry, you can re-roll the Wound roll."
      },
      {
        "name": "Exemplar of the Code",
        "text": "At the start of the battle, select one unit from your opponent’s army to be this model’s quarry. Each time this model makes an attack that targets its quarry, you can re-roll the Wound roll. Each time this model’s quarry is destroyed, you can select a new unit from your opponent’s army to be its quarry."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Preceptor"
    ],
    "loadout": "**This model is equipped with:** las-impulsor; Questoris multi-laser; reaper chainsword.",
    "options": [
      "This model’s Questoris multi-laser can be replaced with one of the following\n▪ 1 meltagun\n▪ 1 Questoris heavy stubber",
      "This model’s reaper chainsword can be replaced with 1 thunderstrike gauntlet.",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Knight Preceptor",
      "Imperium",
      "Character",
      "Questoris",
      "Towering",
      "Titanic",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-valiant",
    "name": "Knight Valiant",
    "points": [
      {
        "models": 1,
        "points": 400,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 415,
        "note": "3rd+"
      }
    ],
    "flavor": "This looming Knight defeats the Imperium’s enemies through overwhelming firepower at close range. Amidst its barrage of cannon fire and missile strikes, it unleashes an inescapable firestorm that can annihilate incoming hordes or smash through opposing battle lines, while with its crackling harpoon, it can destroy far larger behemoths with impunity.",
    "profiles": [
      {
        "name": "Knight Valiant",
        "m": "8\"",
        "t": "12",
        "sv": "3+",
        "w": "28",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Conflagration cannon",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "3D6",
        "bs": "N/A",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shieldbreaker missile launcher",
        "tags": [
          "ANTI-TITANIC 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "72\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-6",
        "d": "D6+1"
      },
      {
        "name": "Thundercoil harpoon",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "D3",
        "bs": "3+",
        "s": "24",
        "ap": "-6",
        "d": "10"
      },
      {
        "name": "Twin meltagun",
        "tags": [
          "MELTA 2",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin siegebreaker cannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Ion Aegis (Aura)",
        "text": "While a friendly Armiger model is within 6\" of this model, each time a ranged attack targets that model, it has the Benefit of Cover against that attack."
      },
      {
        "name": "Thundershock",
        "text": "In your Shooting phase, each time you select a target for this model’s thundercoil harpoon, roll one D6 for the target unit and one D6 for each other enemy unit within 6\" of the target unit. On a 4+, the unit being rolled for is struck by arcing energies; after resolving all of this model’s attacks against the target unit, each unit struck by arcing energies suffers D3 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1‑10 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Valiant"
    ],
    "loadout": "**This model is equipped with:** conflagration cannon; 2 shieldbreaker missile launchers; thundercoil harpoon; 2 twin meltaguns; twin siegebreaker cannon; titanic feet.",
    "options": [
      "This model’s 2 shieldbreaker missile launchers and twin siegebreaker cannon can be replaced with 1 shieldbreaker missile launcher and 2 twin siegebreaker cannons."
    ],
    "keywords": [
      "Knight Valiant",
      "Vehicle",
      "Towering",
      "Walker",
      "Titanic",
      "Dominus",
      "Character",
      "Imperium"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "knight-warden",
    "name": "Knight Warden",
    "points": [
      {
        "models": 1,
        "points": 375,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 390,
        "note": "3rd+"
      }
    ],
    "flavor": "With an avenger gatling cannon that spits hundreds of foot-long armour-piercing shells per minute, these Knights are well suited to annihilating enemy infantry, light vehicles and transports. The suits themselves possess strong-willed machine spirits, and it is a great mark of accomplishment for a Noble to pilot one.",
    "profiles": [
      {
        "name": "Knight Warden",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+",
        "invNote": "* against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Avenger gatling cannon",
        "tags": [],
        "range": "36\"",
        "a": "18",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
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
        "name": "Ironstorm missile pod",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+1",
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
        "name": "Questoris heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormspear rocket pod",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Twin Icarus autocannon",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Thunderstrike gauntlet – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Thunderstrike gauntlet – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Warden’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, weapons equipped by that model have the [SUSTAINED HITS 1] ability, and ranged weapons equipped by that model have the [IGNORES COVER] ability."
      },
      {
        "name": "Thin Their Ranks",
        "text": "Each time this model makes a ranged attack that targets an enemy unit (excluding MONSTERS and VEHICLES), that attack has the [DEVASTATING WOUNDS] ability."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1‑9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Knight Warden"
    ],
    "loadout": "**This model is equipped with:** avenger gatling cannon; heavy flamer; meltagun; reaper chainsword.",
    "options": [
      "This model’s meltagun can be replaced with 1 Questoris heavy stubber.",
      "This model’s reaper chainsword can be replaced with 1 thunderstrike gauntlet.",
      "This model can be equipped with one of the following:\n▪ 1 ironstorm missile pod\n▪ 1 stormspear rocket pod\n▪ 1 twin Icarus autocannon"
    ],
    "keywords": [
      "Character",
      "Imperium",
      "Knight Warden",
      "Titanic",
      "Towering",
      "Questoris",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "questoris-knight-magaera",
    "name": "Questoris Knight Magaera",
    "points": [
      {
        "models": 1,
        "points": 385,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 400,
        "note": "2nd+"
      }
    ],
    "flavor": "The Knight Magaera is a marvel of lost technology, ranging from its repair auto-simulacra to its nigh impregnable ionic flare shield. These esoteric devices make the Magaera ideally suited to shock assaults and breaching actions, enabling the Knight to surge through the most heavily defended positions unscathed and eradicate its foes with terrifying blasts from its lightning cannon.",
    "profiles": [
      {
        "name": "Questoris Knight Magaera",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Lightning cannon",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "48\"",
        "a": "12",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Phased plasma-fusil",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Twin rad cleanser",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Hekaton siege claw – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Hekaton siege claw – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Magaera’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, each time that model makes a ranged attack that targets the closest eligible target, improve the Strength and Armour Penetration characteristics of that attack by 1."
      },
      {
        "name": "Repair Auto-simulacra",
        "text": "At the end of your Command phase, this model regains up to D3 lost wounds."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1-9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Questoris Knight Magaera"
    ],
    "loadout": "**This model is equipped with:** lightning cannon; phased plasma-fusil; reaper chainsword.",
    "options": [
      "This model’s reaper chainsword can be replaced with 1 hekaton siege claw and 1 twin rad cleanser."
    ],
    "keywords": [
      "Vehicle",
      "Imperium",
      "Walker",
      "Character",
      "Titanic",
      "Towering",
      "Questoris",
      "Knight Magaera"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  },
  {
    "id": "questoris-knight-styrix",
    "name": "Questoris Knight Styrix",
    "points": [
      {
        "models": 1,
        "points": 375,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 390,
        "note": "2nd+"
      }
    ],
    "flavor": "The Knight Styrix is a highly sophisticated machine meticulously designed for the eradication of infantry and supporting vehicles. Blasts from the Styrix’s integral graviton gun pin hapless targets in place, while scything volkite beams and flesh-boiling rad-cleanser discharges reap a heavy toll of lives.",
    "profiles": [
      {
        "name": "Questoris Knight Styrix",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "26",
        "ld": "6+",
        "oc": "10",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Graviton crusher",
        "tags": [
          "ANTI-VEHICLE 2+",
          "BLAST"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin rad cleanser",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Volkite chierovile",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "30\"",
        "a": "12",
        "bs": "3+",
        "s": "12",
        "ap": "0",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Hekaton siege claw – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "20",
        "ap": "-3",
        "d": "8"
      },
      {
        "name": "Hekaton siege claw – sweep",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaper chainsword – strike",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "14",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Reaper chainsword – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Code Chivalric, Super-heavy Walker",
    "abilities": [
      {
        "name": "Styrix’s Duty (Bondsman)",
        "text": "While a model is affected by this ability, each time that model is selected to shoot or fight, after it has resolved all of its attacks, select one enemy unit hit by one or more of those attacks - that unit must take a Battle-shock test, subtracting one from the test when doing so."
      },
      {
        "name": "Grav-pinned",
        "text": "In your Shooting phase, after this model has shot, if an enemy INFANTRY unit was hit by one or more of those attacks made with a graviton crusher, until the end of your opponent’s next turn, that enemy unit is grav-pinned. While a unit is grav-pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for that unit."
      }
    ],
    "damaged": {
      "note": "1-9 wounds remaining",
      "text": "While this model has 1-9 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Questoris Knight Styrix"
    ],
    "loadout": "**This model is equipped with:** graviton crusher; volkite chierovile; reaper chainsword.",
    "options": [
      "This model’s reaper chainsword can be replaced with 1 hekaton siege claw and 1 twin rad cleanser."
    ],
    "keywords": [
      "Questoris",
      "Vehicle",
      "Walker",
      "Character",
      "Titanic",
      "Towering",
      "Imperium",
      "Knight Styrix"
    ],
    "factionKeywords": [
      "Imperial Knights"
    ],
    "baseSize": "170x109mm Oval Base"
  }
]
