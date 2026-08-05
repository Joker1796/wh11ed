// Blood Angels — datasheets. Unit roster and points from src/data/mfm/blood-angels.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// 15 chapter-specific/differing datasheets here; 84 units identical
// to space-marines.js are NOT duplicated — see sharedUnitIds below and
// src/data/datasheets/index.js (loadDatasheets merges them in by id).
export const sharedUnitIds = [
  "aggressor-squad",
  "ancient",
  "ancient-in-terminator-armour",
  "apothecary",
  "apothecary-biologis",
  "assault-intercessor-squad",
  "assault-intercessors-with-jump-packs",
  "astraeus",
  "ballistus-dreadnought",
  "bladeguard-ancient",
  "bladeguard-veteran-squad",
  "brutalis-dreadnought",
  "captain",
  "captain-in-gravis-armour",
  "captain-in-phobos-armour",
  "captain-in-terminator-armour",
  "captain-with-jump-pack",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-with-jump-pack",
  "company-heroes",
  "desolation-squad",
  "devastator-squad",
  "dreadnought",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad",
  "eradicator-squad-with-heavy-bolters",
  "firestrike-servo-turrets",
  "gladiator-lancer",
  "gladiator-reaper",
  "gladiator-valiant",
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
  "impulsor",
  "inceptor-squad",
  "incursor-squad",
  "infernus-squad",
  "infiltrator-squad",
  "intercessor-squad",
  "invader-atv",
  "invictor-tactical-warsuit",
  "judiciar",
  "land-raider",
  "land-raider-crusader",
  "land-raider-redeemer",
  "land-speeder",
  "librarian",
  "librarian-in-phobos-armour",
  "librarian-in-terminator-armour",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-in-reiver-armour",
  "lieutenant-with-combi-weapon",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "repulsor",
  "repulsor-executioner",
  "rhino",
  "scout-squad",
  "sternguard-veteran-squad",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "suppressor-squad",
  "tactical-squad",
  "techmarine",
  "terminator-assault-squad",
  "terminator-squad",
  "thunderhawk-gunship",
  "vanguard-veteran-squad-with-jump-packs",
  "vindicator",
  "whirlwind"
]

// appdata prices these 8 shared units higher for Blood Angels specifically
// (unit_composition_required_faction_keyword: 'Blood Angels') than the space-marines.js
// base price — src/data/datasheets/index.js's loadDatasheets swaps in this `points` array
// on the folded-in entry, id -> replacement array (same shape/notes convention as the
// space-marines.js original: 1st-2nd/3rd+ is the per-Detachment-copy points-step).
export const pointsOverrides = {
  "assault-intercessor-squad": [
    { models: 5, points: 80 },
    { models: 10, points: 150 },
  ],
  "assault-intercessors-with-jump-packs": [
    { models: 5, points: 95, note: "1st-2nd" },
    { models: 10, points: 180, note: "1st-2nd" },
    { models: 5, points: 105, note: "3rd+" },
    { models: 10, points: 190, note: "3rd+" },
  ],
  "bladeguard-veteran-squad": [
    { models: 3, points: 85, note: "1st-2nd" },
    { models: 6, points: 170, note: "1st-2nd" },
    { models: 3, points: 95, note: "3rd+" },
    { models: 6, points: 180, note: "3rd+" },
  ],
  "captain-with-jump-pack": [
    { models: 1, points: 80 },
  ],
  "chaplain-with-jump-pack": [
    { models: 1, points: 80 },
  ],
  "outrider-squad": [
    { models: 3, points: 75 },
    { models: 6, points: 140 },
    { points: 60 },
  ],
  "repulsor-executioner": [
    { models: 1, points: 230, note: "1st-2nd" },
    { models: 1, points: 250, note: "3rd+" },
  ],
  "vanguard-veteran-squad-with-jump-packs": [
    { models: 5, points: 110, note: "1st-2nd" },
    { models: 10, points: 220, note: "1st-2nd" },
    { models: 5, points: 120, note: "3rd+" },
    { models: 10, points: 230, note: "3rd+" },
  ],
}

export default [
  {
    "id": "astorath",
    "name": "Astorath",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Wherever sons of Sanguinius are on the cusp of the Black Rage, that is where Astorath goes. Determined to give those warriors a glorious final victory, he fights like a man possessed, lopping off the heads of his enemies while leading frothing Space Marines consumed with unrestrained fury.",
    "profiles": [
      {
        "name": "Astorath",
        "m": "12\"",
        "t": "4",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "The Executioner’s Axe",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Redeemer of the Lost",
        "text": "While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 4+, do not remove it from play; that destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Mass of Doom",
        "text": "Each time this model’s unit makes a Charge move, until the end of the turn, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      }
    ],
    "composition": [
      "1 Astorath – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** the Executioner’s Axe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines with Boltguns and Jump Packs",
        "Death Company Marines With Jump Packs"
      ]
    },
    "keywords": [
      "Tacticus",
      "Chaplain",
      "Astorath",
      "Imperium",
      "Infantry",
      "Character",
      "Epic Hero",
      "Fly",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "baal-predator",
    "name": "Baal Predator",
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
    "flavor": "Only the Blood Angels and their successors have access to the STC necessary to produce Baal Predators. With roaring engines these tanks can keep up with rapid Blood Angels charges or rush to support orbital strikes, pouring deluges of fire into the enemy as they do so.",
    "profiles": [
      {
        "name": "Baal Predator",
        "m": "12\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Baal flamestorm cannon",
        "tags": [
          "ASSAULT",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "ASSAULT",
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
        "name": "Heavy flamer",
        "tags": [
          "ASSAULT",
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
        "name": "Hunter-killer missile",
        "tags": [
          "ONE SHOT"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Storm bolter",
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
        "name": "Twin assault cannon",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Overcharged Engines",
        "text": "You can re-roll Advance rolls made for this model."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Baal Predator"
    ],
    "loadout": "**This model is equipped with:** twin assault cannon; armoured tracks.",
    "options": [
      "This model's twin assault cannon can be replaced with 1 Baal flamestorm cannon.",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with one of the following\n▪ 2 heavy bolters\n▪ 2 heavy flamers"
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Imperium",
      "Baal Predator",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "blood-angels-captain",
    "name": "Blood Angels Captain",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The Captains of the Blood Angels Chapter are mighty warriors possessed of tactical and strategic genius. In keeping with their Chapter’s culture, they go to war clad in finely wrought artificer armour and wielding an array of deadly relic weapons drawn from the Chapter’s Armoury.",
    "profiles": [
      {
        "name": "Captain",
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
        "name": "Heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Inferno pistol",
        "tags": [
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-4",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted chainsword",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
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
      },
      {
        "name": "Relic weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Finest Hour",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, add 3 to the Attacks characteristic of melee weapons equipped by this model and those weapons have the [DEVASTATING WOUNDS] ability."
      }
    ],
    "composition": [
      "1 Blood Angels Captain"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; master-crafted chainsword.",
    "options": [
      "This model's heavy bolt pistol can be replaced with 1 inferno pistol.",
      "This model’s master-crafted chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 relic weapon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Company Heroes",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Captain",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chief-librarian-mephiston",
    "name": "Chief Librarian Mephiston",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "Mephiston is an enormously powerful warrior and psyker. He is the only Blood Angel known to have suppressed the Black Rage, resurrecting from near death with exceptional strength, vigour and speed. Many whisper behind his back, asking what price he paid for such a transformation.",
    "profiles": [
      {
        "name": "Chief Librarian Mephiston",
        "m": "7\"",
        "t": "5",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Fury of the Ancients – witchfire",
        "tags": [
          "PISTOL",
          "PSYCHIC",
          "SUSTAINED HITS 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Fury of the Ancients – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PISTOL",
          "PSYCHIC",
          "SUSTAINED HITS 3"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
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
        "name": "Vitarus",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-3",
        "d": "D3"
      }
    ],
    "core": "Feel No Pain 4+, Fights First, Lone Operative",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "The Quickening (Psychic)",
        "text": "This model is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Transfixing Gaze (Aura, Psychic)",
        "text": "While an enemy unit is within 6\" of this model, each time that unit is selected to Fall Back, it must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead."
      }
    ],
    "composition": [
      "1 Chief Librarian Mephiston – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; Fury of the Ancients; Vitarus.",
    "keywords": [
      "Infantry",
      "Psyker",
      "Chief Librarian Mephiston",
      "Tacticus",
      "Imperium",
      "Grenades",
      "Epic Hero",
      "Character"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "commander-dante",
    "name": "Commander Dante",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Dante soars over the battlefield, gleaming in his golden armour, before roaring into bloody battle on trails of fire. Once in the fray, the piercing gaze of his death mask freezes enemies in fright, while his perfectly placed strikes with the Axe Mortalis cut down foe after foe.",
    "profiles": [
      {
        "name": "Commander Dante",
        "m": "12\"",
        "t": "4",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Perdition Pistol",
        "tags": [
          "MELTA 2",
          "PISTOL",
          "SUSTAINED HITS D3"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "The Axe Mortalis",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Warden of the Imperium Nihilus",
        "text": "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit and each time a model in that unit makes an attack, add 1 to the Hit roll."
      },
      {
        "name": "Death Mask of Sanguinius",
        "text": "At the start of the Fight phase, each enemy unit within 6\" of this model must take a Battle-shock test, subtracting 1 from that test when they do."
      }
    ],
    "composition": [
      "1 Commander Dante – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Perdition Pistol; the Axe Mortalis.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors With Jump Packs",
        "Sanguinary Guard",
        "Vanguard Veteran Squad With Jump Packs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Commander Dante",
      "Chapter Master",
      "Jump Pack",
      "Tacticus",
      "Imperium",
      "Fly",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Blood Angels",
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "death-company-captain",
    "name": "Death Company Captain",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "None of Sanguinius’sone are immune to the effects of the Black Rage. Should a Captain succumb to the Flaw, he will don the black and be outfitted with relic weapons for one final battle. Empowered by the depths of their madness, Death Company Captains slaughter their foes with violent fury as they seek absolution in death.",
    "profiles": [
      {
        "name": "Death Company Captain",
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
        "name": "Heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Inferno pistol",
        "tags": [
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-4",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted chainsword",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
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
      },
      {
        "name": "Relic weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Forlorn Hero",
        "text": "While this model is leading a unit, unless that unit starts the battle embarked within a Transport, models in that unit have the Scouts 6\" ability."
      },
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Death Vision of Sanguinius",
        "text": "If this model is destroyed by a melee attack, after the attacking unit has finished making its attacks, you can roll one D6, adding 2 to the result if the attacking unit contains the enemy **WARLORD**: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4 5, that enemy unit suffers 3 mortal wounds; on a 6+, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "composition": [
      "1 Death Company Captain"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; master-crafted chainsword.",
    "options": [
      "This model’s heavy bolt pistol can be replaced with 1 inferno pistol.",
      "This model’s master-crafted chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 relic weapon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines with Bolt Rifles",
        "Death Company Marines"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Death Company",
      "Tacticus",
      "Captain"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "death-company-captain-with-jump-pack",
    "name": "Death Company Captain with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "None of Sanguinius’sone are immune to the effects of the Black Rage. Should a Captain succumb to the Flaw, he will don the black and be outfitted with relic weapons for one final battle. Empowered by the depths of their madness, Death Company Captains slaughter their foes with violent fury as they seek absolution in death.",
    "profiles": [
      {
        "name": "Death Company Captain",
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
        "name": "Heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma pistol - standard",
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
        "name": "Plasma pistol - supercharge",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
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
        "name": "Relic weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Lost to Fury",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Death Vision of Sanguinius",
        "text": "If this model is destroyed by a melee attack, after the attacking unit has finished making its attacks, you can roll one D6, adding 2 to the result if the attacking unit contains the enemy **WARLORD**: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4 5, that enemy unit suffers 3 mortal wounds; on a 6+, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "composition": [
      "1 Death Company Captain with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "This model’s heavy bolt pistol can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 hand flamer",
      "This model’s master-crafted chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 relic weapon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines With Jump Packs"
      ]
    },
    "keywords": [
      "Jump Pack",
      "Character",
      "Infantry",
      "Captain",
      "Death Company",
      "Tacticus",
      "Imperium",
      "Grenades",
      "Fly"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "death-company-dreadnought",
    "name": "Death Company Dreadnought",
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
    "flavor": "Even being interred in a Dreadnought’s sarcophagus is insufficient to keep the Black Rage at bay. Death Company Dreadnoughts are like furious battering rams, desperate to smash into the enemy and tear them apart. They are potent terror weapons, unleashed to inflict as much damage as possible.",
    "profiles": [
      {
        "name": "Death Company Dreadnought",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Blood fist bolt rifles",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Twin Icarus ironhail heavy stubber",
        "tags": [
          "ANTI-FLY 4+",
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin multi-melta",
        "tags": [
          "MELTA 2",
          "TWIN-LINKED"
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
        "name": "Blood fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Blood talons - strike",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Blood talons - sweep",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "10",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Driven by Fury",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if this model lost a wound as a result of those attacks, this unit can make a surge move of up to D6+2\"."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Death Company Dreadnought"
    ],
    "loadout": "**This model is equipped with:** twin Icarus ironhail heavy stubber; twin heavy bolter; blood fist bolt rifles; blood fists.",
    "options": [
      "This model’s twin heavy bolter can be replaced with 1 twin multi-melta.",
      "This model's blood fists and blood fist bolt rifles can be replaced with 1 blood talons."
    ],
    "keywords": [
      "Walker",
      "Imperium",
      "Dreadnought",
      "Death Company",
      "Death Company Dreadnought",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "death-company-marines",
    "name": "Death Company Marines",
    "points": [
      {
        "models": 5,
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Members of the Death Company are possessed of a berserk fury, driven insane by terrible visions and hallucinations. They seek nothing but death in battle, and such is their ferocity that they barely flinch at even the most grievous of Injuries, thinking of nothing but the destruction of their enemies.",
    "profiles": [
      {
        "name": "Death Company Marines",
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
        "name": "Heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Inferno pistol",
        "tags": [
          "PISTOL",
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Eviscerator",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "An Honourable Death in Combat",
        "text": "Each time a model in this unit makes an attack, that attack has the [SUSTAINED HITS 1] ability if this unit is below its Starting Strength, or the [SUSTAINED HITS 2] ability if this unit is Below Half-strength."
      }
    ],
    "composition": [
      "5-10 Death Company Marines"
    ],
    "loadout": "**Every model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "1 model's heavy bolt pistol can be replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol",
      "For every 5 models in this unit, 1 model's Astartes chainsword can be replaced with 1 eviscerator.",
      "1 model’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer"
    ],
    "keywords": [
      "Death Company Marines",
      "Death Company",
      "Tacticus",
      "Imperium",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Chaplain model from your army with the Leader ability can be attached to an Assault Intercessor Squad unit, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "death-company-marines-with-bolt-rifles",
    "name": "Death Company Marines with Bolt Rifles",
    "points": [
      {
        "models": 5,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 155,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 165,
        "note": "3rd+"
      }
    ],
    "flavor": "Every Blood Angel felt their hopes dashed when the first of the Primaris Space Marines brought to the Chapter by Roboute Guilliman fell to the Black Rage. With great solemnity were these brothers inducted into the Death Company. Their strength, combined with the fury of the Black Rage, is a terrifying sight to behold.",
    "profiles": [
      {
        "name": "Death Company Marines",
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
        "name": "Astartes grenade launcher - frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Astartes grenade launcher - krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
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
        "name": "Bolt rifle",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Inferno pistol",
        "tags": [
          "PISTOL",
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
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
        "name": "Eviscerator",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Visions of Heresy",
        "text": "■ This unit can re-roll charge rolls. ■ When you target this unit with the Fire Overwatch/Heroic Intervention stratagem, that use is -1 CP."
      }
    ],
    "composition": [
      "5-10 Death Company Intercessors with Bolt Rifles"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; bolt rifle; close combat weapon.",
    "options": [
      "1 model’s bolt rifle can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol",
      "For every 5 models in this unit, 1 model's bolt rifle and close combat weapon can be replaced with 1 eviscerator.",
      "For every 5 models in this unit, 1 model equipped with a bolt rifle can be equipped with 1 Astartes grenade launcher.",
      "1 model’s close combat weapon can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer"
    ],
    "keywords": [
      "Imperium",
      "Death Company Marines with Bolt Rifles",
      "Death Company",
      "Tacticus",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Chaplain model from your army with the Leader ability can be attached to an Intercessor Squad unit, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "death-company-marines-with-jump-packs",
    "name": "Death Company Marines With Jump Packs",
    "points": [
      {
        "models": 5,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 230,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 135,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 245,
        "note": "3rd+"
      }
    ],
    "flavor": "The savagery induced by the Black Rage cannot be cured and so must be utilised to its fullest extent. When equipped with jump packs, Death Company Marines are lent great speed and mobility that, when allied to their vengeful rage, renders them lethal shock troops.",
    "profiles": [
      {
        "name": "Death Company Marines With Jump Packs",
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
        "name": "Heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Inferno pistol",
        "tags": [
          "PISTOL",
          "MELTA 2"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Eviscerator",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes a melee attack, you can re-roll the Hit roll. While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Savage Fury",
        "text": "You can re-roll Charge rolls made for this unit."
      }
    ],
    "composition": [
      "5-10 Death Company Marines with Jump Packs"
    ],
    "loadout": "**Every model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "For every 5 models in this unit, 1 model’s heavy bolt pistol can be replaced with 1 plasma pistol.",
      "For every 5 models in this unit, 1 model’s Astartes chainsword can be replaced with 1 eviscerator.",
      "1 model’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon",
      "For every 5 models in this unit, 1 model’s heavy bolt pistol and Astartes chainsword can be replaced with one of the following:\n▪ 1 hand flamer and 1 Astartes chainsword\n▪ 1 hand flamer and 1 power fist\n▪ 1 hand flamer and 1 power weapon\n▪ 1 heavy bolt pistol and 1 power fist\n▪ 1 heavy bolt pistol and 1 power weapon\n▪ 1 inferno pistol and 1 Astartes chainsword\n▪ 1 inferno pistol and 1 power fist\n▪ 1 inferno pistol and 1 power weapon\n▪ 1 plasma pistol and 1 Astartes chainsword\n▪ 1 plasma pistol and 1 power fist\n▪ 1 plasma pistol and 1 power weapon"
    ],
    "keywords": [
      "Death Company",
      "Death Company Marines",
      "Fly",
      "Grenades",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
        ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Chaplain model from your army with the Leader ability can be attached to an Assault Intercessors with Jump Packs unit, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "lemartes",
    "name": "Lemartes",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Lemartes’ life is one of constant battle. A warrior of iron will, somehow he retains lucidity despite having succumbed to the Black Rage. He leads the Blood Angels’ Death Company as Guardian of the Lost, wielding the ancient weapon known as the Blood Crozius. His inspiration has only made the Death Company even more potent.",
    "profiles": [
      {
        "name": "Lemartes",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
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
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "The Blood Crozius",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Guardian of the Lost",
        "text": "While this model is leading a unit, each time an attack is allocated to a model in that unit, subtract 1 from the Damage characteristic of that attack."
      },
      {
        "name": "Fury Unbound",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the **[LETHAL HITS]** ability."
      }
    ],
    "composition": [
      "1 Lemartes – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; the Blood Crozius.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines With Jump Packs",
        "Death Company Marines with Boltguns and Jump Packs"
      ]
    },
    "keywords": [
      "Chaplain",
      "Tacticus",
      "Grenades",
      "Jump Pack",
      "Epic Hero",
      "Character",
      "Infantry",
      "Lemartes",
      "Imperium",
      "Fly"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sanguinary-guard",
    "name": "Sanguinary Guard",
    "points": [
      {
        "models": 3,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 145,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "Sanguinary Guard are proven in mind, body and spirit in a way few of their brothers can match. Clad in irreplaceable golden armour believed to date back to the Horus Heresy and armed with the traditional relic weapons of their position, few embody the ideal of the wrathful angel more than they.",
    "profiles": [
      {
        "name": "Sanguinary Guard",
        "m": "12\"",
        "t": "4",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Angelus boltgun",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Inferno pistol",
        "tags": [
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Encarmine blade",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Encarmine spear",
        "tags": [
          "LANCE"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Angelic Visage",
        "text": "Each time a melee attack targets this unit, subtract 1 from the Hit roll."
      },
      {
        "name": "Heirs of Azkaellon",
        "text": "While a Character model is leading this unit, each time a melee attack targets this unit, subtract 1 from the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Sanguinary Banner",
        "text": "Add 1 to the Objective Control characteristic of models in the bearer’s unit."
      }
    ],
    "composition": [
      "3-6 Sanguinary Guard"
    ],
    "loadout": "**Every model is equipped with:** Angelus boltgun; encarmine blade.",
    "options": [
      "Any number of models can each have their encarmine blade replaced with 1 encarmine spear.",
      "For every 3 models in this unit, 1 model’s Angelus boltgun can be replaced with 1 inferno pistol.",
      "One model can be equipped with 1 Sanguinary banner."
    ],
    "keywords": [
      "Imperium",
      "Tacticus",
      "Sanguinary Guard",
      "Grenades",
      "Jump Pack",
      "Fly",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Captain model from your army with the Leader ability can be attached to an Assault Intercessors with Jump Packs unit, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "sanguinary-priest",
    "name": "Sanguinary Priest",
    "points": [
      {
        "models": 1,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 85,
        "note": "3rd+"
      }
    ],
    "flavor": "The Sanguinary Priests are the Blood Angels’ Apothecaries, and hold responsibility for the Chapter’s soul as well as its body. Through their ministrations and ceremonies do they call upon the Blood Angels to embrace the Red Thirst, control it and unleash their rage upon the enemy.",
    "profiles": [
      {
        "name": "Sanguinary Priest",
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
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sanguinary Priest",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability."
      },
      {
        "name": "Blood Chalice",
        "text": "While this model is leading a unit, improve the Armour Penetration characteristic of melee weapons equipped by models in that unit by 1."
      }
    ],
    "composition": [
      "1 Sanguinary Priest"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; Astartes chainsword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Desolation Squad",
        "Devastator Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Sanguinary Priest"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "the-sanguinor",
    "name": "The Sanguinor",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "The Sanguinor is a mysterious figure who fights only on battlefields of the most paramount importance, when the Blood Angels’ need is greatest. He inspires as much courage in the sons of Sanguinius as he does fear in the enemy, and surges across the field as if he were Sanguinius’ will made manifest.",
    "profiles": [
      {
        "name": "The Sanguinor",
        "m": "12\"",
        "t": "4",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Encarmine broadsword",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Fights First, Lone Operative",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Aura of Fervour (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, you can re-roll Battle-shock and Leadership tests taken for that unit."
      },
      {
        "name": "Miraculous Saviour",
        "text": "(Once per battle, per army) At the end of your opponent's Charge phase (excluding the first battle round), you can select one enemy unit that made a **charge move** this phase. This unit can make an **ingress move** and must be set up **engaged** with that enemy unit. That move does not prevent this unit from being **eligible to move**."
      }
    ],
    "composition": [
      "1 The Sanguinor – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** encarmine broadsword.",
    "keywords": [
      "Fly",
      "Epic Hero",
      "Character",
      "Infantry",
      "The Sanguinor",
      "Tacticus",
      "Imperium",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Blood Angels",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  }
]
