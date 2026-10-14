// Adeptus Custodes — datasheets. Unit roster and points from src/data/mfm/adeptus-custodes.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "aleya",
    "name": "Aleya",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Aleya is a veteran of her order and is a ferocious and dedicated hunter of witches and sorcerers. Over many years she has developed incredible tactical perception, as well as a deep knowledge of her quarry. She employs these skills to seek out rogue psykers, cutting them down with sweeps of her blade, Somnus.",
    "profiles": [
      {
        "name": "Aleya",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Somnus",
        "tags": [
          "ANTI-PSYKER 5+",
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Feel No Pain 5+, Leader, Scouts 6\"",
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Tactical Perception",
        "text": "This unit has [core:Fights First]."
      },
      {
        "name": "Tenacious Spirit",
        "text": "▪ While this unit is below **[gloss:starting-strength:starting strength]**, this unit's attacks have +1 to **[gloss:hit-roll:hit rolls]**.\n▪ While this unit is below **[gloss:half-strength:half-strength]**, this unit's attacks have +1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Aleya model"
    ],
    "loadout": "**This model is equipped with:** 1 Somnus.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Prosecutor Squad",
        "Vigilator Squad",
        "Witchseeker Squad"
      ]
    },
    "keywords": [
      "Anathema Psykana",
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "32mm",
    "legends": true
  },
  {
    "id": "allarus-custodians",
    "name": "Allarus Custodians",
    "points": [
      {
        "models": 2,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 270,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 210,
        "note": "3rd+"
      },
      {
        "models": 3,
        "points": 300,
        "note": "3rd+"
      }
    ],
    "flavor": "Even amongst the Adeptus Custodes, Allarus Custodians are renowned for their deeds. Teleporting into the most dangerous enemy strongholds, they rely upon the indomitable resilience of their Terminator plate to protect them as they hunt down demagogues and generals. Fighting as individual heroes, they swiftly tear the heart from their foe’s defence.",
    "profiles": [
      {
        "name": "Allarus Custodians",
        "m": "7\"",
        "t": "8",
        "sv": "2+",
        "w": "6",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Balistus Grenade Launcher",
        "tags": [
          "ASSAULT",
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Guardian Spear",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Castellan Axe",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Guardian Spear",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Castellan Axe",
        "tags": [],
        "a": "3",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "4"
      }
    ],
    "core": "Deep Strike",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Slayer of Tyrants",
        "text": "This unit’s melee attacks that target a unit with a **[gloss:toughness:T]** greater than this unit’s **T** have +1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Vexilla",
        "text": "▪ This unit has +1 **[gloss:objective-control:OC]**.\n▪ This unit can ignore modifiers to this unit’s **[gloss:leadership:Ld]**."
      }
    ],
    "composition": [
      "2‑3 Allarus Custodian models"
    ],
    "loadout": "**Every model is equipped with:** 1 Balistus Grenade Launcher; 1 Guardian Spear.",
    "options": [
      "1 model can be equipped with 1 Vexilla.",
      "All models in this unit can each have their Guardian Spear replaced with 1 Castellan Axe."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "anathema-psykana-rhino",
    "name": "Anathema Psykana Rhino",
    "points": [
      {
        "models": 1,
        "points": 70,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 80,
        "note": "4th+"
      }
    ],
    "flavor": "The Rhinos of the Silent Sisterhood are more than just armoured personnel carriers. Many have served the Imperium for hundreds, if not thousands of years. Highly rugged vehicles, their spacious capacity and powerful engines help them to safely carry their deadly cargo of Sisters into the fiercest of battles.",
    "profiles": [
      {
        "name": "Anathema Psykana Rhino",
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
        "name": "Hunter-killer Missile",
        "tags": [
          "ONE SHOT"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Storm Bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Tracks",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Firing Deck 2",
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Assault Vehicle",
        "text": "In your Movement phase, when this unit ends an **[gloss:advance-move:advance move]**, units embarked within this unit can make a **[gloss:shock-disembark-move:shock disembark move]**."
      }
    ],
    "composition": [
      "1 Anathema Psykana Rhino model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Storm Bolter.",
    "options": [
      "This model can be equipped with 1 Hunter‑killer Missile."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 12 ANATHEMA PSYKANA INFANTRY models.",
    "keywords": [
      "Anathema Psykana",
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Anathema Psykana"
    ]
  },
  {
    "id": "aquilon-terminators-with-solarite-power-gauntlets",
    "name": "Aquilon Terminators with Solarite Power Gauntlets",
    "points": [
      {
        "models": 3,
        "points": 285,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 315,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Aquilon Custodians",
        "m": "7\"",
        "t": "8",
        "sv": "2+",
        "w": "6",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Adrathic Combi-destructor",
        "tags": [],
        "range": "12\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Solarite Power Gauntlet",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Dread Foe",
        "text": "This unit’s melee attacks that target a unit (excluding MONSTER/VEHICLE units) have +1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "3 Aquilon Terminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Adrathic Combi‑destructor; 1 Solarite Power Gauntlet.",
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "aquilon-terminators-with-solarite-power-talons",
    "name": "Aquilon Terminators with Solarite Power Talons",
    "points": [
      {
        "models": 3,
        "points": 275,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 305,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Aquilon Custodians",
        "m": "7\"",
        "t": "8",
        "sv": "2+",
        "w": "6",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernus Firepike",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Lastrum Storm Bolter",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Solarite Power Talon",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Reap a Terrible Tally",
        "text": "This unit’s attacks that target an INFANTRY unit can:\n▪ Re‑roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re‑roll **[gloss:wound-roll:wound rolls]** of 1."
      }
    ],
    "composition": [
      "3 Aquilon Terminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Lastrum Storm Bolter; 1 Solarite Power Talon.",
    "options": [
      "All models in this unit can each have their Lastrum Storm Bolter replaced with 1 Infernus Firepike."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ares-gunship",
    "name": "Ares Gunship",
    "points": [
      {
        "models": 1,
        "points": 580,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 610,
        "note": "2nd+"
      }
    ],
    "flavor": "The Ares Gunship first earned its reputation on Ancient Terra, and has quashed the Emperor’s enemies on hundreds of worlds since. Most terrifying of the Ares’ offensive capabilities is the arachnus magna-blaze cannon, whose extreme energies can pierce the densest armour, leaving a trail of wrecks and corpses wherever the Ares deploys.",
    "profiles": [
      {
        "name": "Ares Gunship",
        "m": "-",
        "t": "12",
        "sv": "2+",
        "w": "22",
        "ld": "6+",
        "oc": "-",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Arachnus Heavy Blaze Cannon",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Arachnus Magna-blaze Cannon",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "2+",
        "s": "18",
        "ap": "-3",
        "d": "D6+6"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "9",
        "ws": "4+",
        "s": "9",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 7",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Infernus Firebombs",
        "text": "At the end of your opponent's Fight phase, select one **[gloss:visible:visible]** enemy unit (excluding [core:Lone Operative] and AIRCRAFT units) within 24\" of this unit:\n▪ Ranged attacks that target that enemy unit have [IGNORES COVER] until the end of your next turn,\n▪ Roll one D6 for each model in that enemy unit:\n▪ On a 6, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]** (to a maximum of 6 **mortal wounds**)."
      }
    ],
    "composition": [
      "1 Ares Gunship model"
    ],
    "loadout": "**This model is equipped with:** 2 Arachnus Heavy Blaze Cannon; 1 Arachnus Magna-blaze Cannon; 1 Armoured Hull.",
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "160mm"
  },
  {
    "id": "blade-champion",
    "name": "Blade Champion",
    "points": [
      {
        "models": 1,
        "points": 175,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 195,
        "note": "3rd+"
      }
    ],
    "flavor": "A Blade Champion’s role is to identify the greatest battlefield threat then ensure its swift destruction. They are well‑equipped for the task, wielding crackling archeotech blades in a variety of combat styles – Behemor, Hurricanis and Victus – each perfect for dealing with a different kind of foe.",
    "profiles": [
      {
        "name": "Blade Champion",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "7",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Vaultswords – behemor",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Vaultswords – hurricanis",
        "tags": [
          "CLEAVE 1",
          "SUSTAINED HITS 1"
        ],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Vaultswords – victus",
        "tags": [
          "PRECISION"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Swift Onslaught",
        "text": "This unit can:\n▪ Re‑roll **[gloss:advance-roll:advance rolls]**.\n▪ Re‑roll **[gloss:charge-roll:charge rolls]**."
      },
      {
        "name": "Sword of the Throne",
        "text": "At the start of the first battle round, select one enemy unit to be this model’s **[gloss:ac-mark:mark]**:\n▪ This model’s attacks that target this model’s **mark** have +1 to **[gloss:wound-roll:wound rolls]**.\n▪ Each time this model’s **mark** is **[gloss:destroyed:destroyed]**, select one enemy unit to be this model’s **mark**."
      }
    ],
    "composition": [
      "1 Blade Champion model"
    ],
    "loadout": "**This model is equipped with:** 1 Vaultswords.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Custodian Guard Sodality",
        "Custodian Wardens",
        "Sentinel Guard Sodality"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "caladius-annihilator-grav-tank",
    "name": "Caladius Annihilator Grav‑Tank",
    "points": [
      {
        "models": 1,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Caladius Annihilator Grav Tank",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "14",
        "ld": "5+",
        "oc": "4",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Twin Neutronium Cascade Projectors",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Arachnus Blaze Carronade",
        "tags": [
          "LETHAL HITS: MONSTER/VEHICLE"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Twin Lastrum Bolt Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Deadly Demise D3, Damaged 5",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Advanced Firepower",
        "text": "This unit’s ranged attacks that target a MONSTER/VEHICLE unit can:\n▪ Re‑roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re‑roll __one__ **[gloss:wound-roll:wound roll]**.\n▪ Re‑roll __one__ **[gloss:damage-roll:damage roll]**."
      }
    ],
    "composition": [
      "1 Caladius Annihilator Grav‑tank model"
    ],
    "loadout": "**This model is equipped with:** 1 Arachnus Blaze Carronade; 1 Armoured Hull; 1 Twin Lastrum Bolt Cannon.",
    "options": [
      "This model’s Twin Lastrum Bolt Cannon can be replaced with 1 Twin Neutronium Cascade Projectors."
    ],
    "keywords": [
      "Caladius",
      "Fly",
      "Frame",
      "Grav-assault",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "150x95mm Oval Base"
  },
  {
    "id": "caladius-grav-tank",
    "name": "Caladius Grav‑Tank",
    "points": [
      {
        "models": 1,
        "points": 230
      }
    ],
    "flavor": "The Caladius Grav-tank fuses some of the heaviest firepower in the Custodian Guard arsenal with a highly mobile, resilient chassis. Taking as its principal armament either a twin iliastus accelerator cannon or a twin arachnus heavy blaze cannon, the Caladius excels in a range of battlefield roles, far outmatching more primitive vehicles of its class.",
    "profiles": [
      {
        "name": "Caladius Grav-Tank",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "14",
        "ld": "5+",
        "oc": "4",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Twin Neutronium Cascade Projectors",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Iliastus Accelerator Cannon",
        "tags": [
          "RAPID FIRE 4",
          "SUSTAINED HITS 1: NON-MONSTER/VEHICLE"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "2+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin Lastrum Bolt Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Damaged 5",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Destructor Optics",
        "text": "This unit’s ranged attacks that target a unit (excluding MONSTER/VEHICLE units) have +1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "1 Caladius Grav‑tank model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Iliastus Accelerator Cannon; 1 Twin Lastrum Bolt Cannon.",
    "options": [
      "This model’s Twin Lastrum Bolt Cannon can be replaced with 1 Twin Neutronium Cascade Projectors."
    ],
    "keywords": [
      "Caladius",
      "Fly",
      "Frame",
      "Grav-assault",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "150x95mm Oval Base"
  },
  {
    "id": "contemptor-achillus-dreadnought",
    "name": "Contemptor‑Achillus Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 230
      }
    ],
    "flavor": "The Contemptor-Achillus adds still greater refinement to an already celebrated blueprint – the revered Contemptor Dreadnought – arming its occupant with a mighty dreadspear equally capable of searing through foes at range or vanquishing them with a single thrust of its glowing blade.",
    "profiles": [
      {
        "name": "Contemptor-Achillus Dreadnought",
        "m": "9\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "5+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Dreadspear",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Lastrum Storm Bolter",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Infernus Incinerator",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Adrathic Combi-destructor",
        "tags": [],
        "range": "12\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Dreadspear",
        "tags": [
          "LANCE"
        ],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Unyielding Ancient",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Contemptor‑Achillus Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Dreadspear; 2 Lastrum Storm Bolter.",
    "options": [
      "This model’s 2 Lastrum Storm Bolter can be replaced with one of the following:\n▪ 2 Adrathic Combi‑destructor\n▪ 2 Twin Infernus Incinerator"
    ],
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "contemptor-galatus-dreadnought",
    "name": "Contemptor‑Galatus Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "flavor": "Like the Sentinel Guard of the ancient Legio Custodes, the Contemptor-Galatus is armed with a power blade and battle shield, albeit of a type greatly superior in size and potency. Coupled with the already resilient Contemptor chassis, this wargear enables the Galatus to stride through the inferno of battle with impunity, slaying elite infantry and crippling vehicles.",
    "profiles": [
      {
        "name": "Contemptor-Galatus Dreadnought",
        "m": "9\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Warblade",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Warblade",
        "tags": [
          "CLEAVE 1",
          "SUSTAINED HITS 1: NON-MONSTER/VEHICLE"
        ],
        "a": "8",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Unyielding Ancient",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Contemptor‑Galatus Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Warblade.",
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "coronus-grav-carrier",
    "name": "Coronus Grav‑Carrier",
    "points": [
      {
        "models": 1,
        "points": 225
      }
    ],
    "flavor": "Coronus Grav-carriers are the primary tactical transports of the Adeptus Custodes. Their repulsor suspensor technology and flare shielding grants them the speed and survivability to engage or evade myriad threats at will, punishing targets with their potent turret weapons as they speed their elite passengers to the forefront of battle.",
    "profiles": [
      {
        "name": "Coronus Grav-Carrier",
        "m": "12\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "5+",
        "oc": "5",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Twin Arachnus Blaze Cannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Twin Lastrum Bolt Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin Neutronium Cascade Projectors",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Damaged 6, Deep Strike, Deadly Demise D6",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Assault Vehicle",
        "text": "In your Movement phase, when this unit ends an **[gloss:advance-move:advance move]**, units embarked within this unit can make a **[gloss:shock-disembark-move:shock disembark move]**."
      },
      {
        "name": "Repulsor Suspensor Technology (Once per phase, per unit)",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if this unit lost a wound as a result of those attacks and is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]** of up to D6\"."
      }
    ],
    "composition": [
      "1 Coronus Grav‑carrier model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Twin Arachnus Blaze Cannon; 1 Twin Lastrum Bolt Cannon.",
    "options": [
      "This model’s Twin Lastrum Bolt Cannon can be replaced with 1 Twin Neutronium Cascade Projectors."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 8 ADEPTUS CUSTODES INFANTRY models. It cannot transport JUMP PACK models.",
    "keywords": [
      "Fly",
      "Frame",
      "Grav-assault",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "150x95mm Oval Base"
  },
  {
    "id": "custodian-guard-sodality",
    "name": "Custodian Guard Sodality",
    "points": [
      {
        "models": 3,
        "points": 240,
        "note": "1st-3rd"
      },
      {
        "models": 3,
        "points": 270,
        "note": "4th+"
      }
    ],
    "profiles": [
      {
        "name": "Custodian Guard",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Guardian Spear",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Guardian Spear",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Impenetrable Defence",
        "text": "This unit’s attacks have [SUSTAINED HITS 1: **non**‑MONSTER/VEHICLE] if any of the following apply:\n▪ This unit is within range of an **[gloss:objective:objective]**.\n▪ The target of those attacks is within range of an **objective**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Vexilla",
        "text": "▪ This unit has +1 **[gloss:objective-control:OC]**.\n▪ This unit can ignore modifiers to this unit’s **[gloss:leadership:Ld]**."
      }
    ],
    "composition": [
      "3 Custodian Guard models"
    ],
    "loadout": "**Every model is equipped with:** 1 Guardian Spear.",
    "options": [
      "1 model can be equipped with 1 Vexilla."
    ],
    "keywords": [
      "Battleline",
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "custodian-guard-sodality-with-adrasite-spears",
    "name": "Custodian Guard Sodality with Adrasite Spears",
    "points": [
      {
        "models": 3,
        "points": 200
      }
    ],
    "profiles": [
      {
        "name": "Custodian Guard",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Adrasite Spear",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Adrasite Spear",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Stand Vigil",
        "text": "This unit's attacks can:\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ __Or:__ If this unit is within range of an **[gloss:objective:objective]**, re-roll **wound rolls**."
      }
    ],
    "composition": [
      "3 Custodian Guard models"
    ],
    "loadout": "**Every model is equipped with:** 1 Adrasite Spear.",
    "keywords": [
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "custodian-guard-sodality-with-pyrithite-spears",
    "name": "Custodian Guard Sodality with Pyrithite Spears",
    "points": [
      {
        "models": 3,
        "points": 215
      }
    ],
    "profiles": [
      {
        "name": "Custodian Guard",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Pyrithite Spear",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Pyrithite Spear",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "No Foe Shall Stand (Once per battle, per unit)",
        "text": "This unit's ranged attacks have [LETHAL HITS] and [IGNORES COVER]."
      }
    ],
    "composition": [
      "3 Custodian Guard models"
    ],
    "loadout": "**Every model is equipped with:** 1 Pyrithite Spear.",
    "keywords": [
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "custodian-wardens",
    "name": "Custodian Wardens",
    "points": [
      {
        "models": 2,
        "points": 200,
        "note": "1st"
      },
      {
        "models": 3,
        "points": 295,
        "note": "1st"
      },
      {
        "models": 2,
        "points": 230,
        "note": "2nd+"
      },
      {
        "models": 3,
        "points": 325,
        "note": "2nd+"
      }
    ],
    "flavor": "Veterans with centuries of service, Custodian Wardens are level-headed warriors who have sworn to fight as living fortresses no foe shall breach. With frightening intensity and wills of iron, these warriors cleave their foes in two with immense sweeps of their energised spear and axe blades.",
    "profiles": [
      {
        "name": "Custodian Wardens",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "6",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Guardian Spear",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Castellan Axe",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Guardian Spear",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Castellan Axe",
        "tags": [],
        "a": "3",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "4"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Living Fortress",
        "text": "Attacks that target this unit have -1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Vexilla",
        "text": "▪ This unit has +1 **[gloss:objective-control:OC]**.\n▪ This unit can ignore modifiers to this unit’s **[gloss:leadership:Ld]**."
      }
    ],
    "composition": [
      "2‑3 Custodian Warden models"
    ],
    "loadout": "**Every model is equipped with:** 1 Guardian Spear.",
    "options": [
      "All models in this unit can each have their Guardian Spear replaced with 1 Castellan Axe.",
      "1 model can be equipped with 1 Vexilla."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "gyrfalcon-jetbike-sodality",
    "name": "Gyrfalcon Jetbike Sodality",
    "points": [
      {
        "models": 2,
        "points": 260,
        "note": "1st"
      },
      {
        "models": 2,
        "points": 280,
        "note": "2nd+"
      }
    ],
    "profiles": [
      {
        "name": "Agamatus Custodians",
        "m": "12\"",
        "t": "8",
        "sv": "2+",
        "w": "9",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Adrathic Devastator",
        "tags": [],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Arachnus Volley Cannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Corvae Las-pulser",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Lastrum Bolt Cannon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Solarite Power Lance",
        "tags": [
          "LANCE"
        ],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Death Blow",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s melee attacks have +1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "2 Gyrfalcon Jetbiker models"
    ],
    "loadout": "**Every model is equipped with:** 1 Lastrum Bolt Cannon; 1 Solarite Power Lance.",
    "options": [
      "All models in this unit can each have their Lastrum Bolt Cannon replaced with one of the following:\n▪ 1 Adrathic Devastator\n▪ 1 Arachnus Volley Cannon\n▪ 1 Twin Corvae Las‑pulser"
    ],
    "keywords": [
      "Fly",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "knight-centura",
    "name": "Knight‑Centura",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Knight‑Centuras are the leaders of Sisters of Silence cadres and the guardians of their traditions. They have earned the respect of their Sisters through their years of service, impeccable fighting skills, prowess and control as Nulls and encyclopaedic knowledge of how best to hunt the witch and the sorcerer.",
    "profiles": [
      {
        "name": "Knight-Centura",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Master-crafted Boltgun",
        "tags": [
          "ANTI-PSYKER 4+",
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Master-crafted Flamer",
        "tags": [
          "ANTI-PSYKER 4+",
          "ASSAULT",
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Executioner Greatblade",
        "tags": [
          "ANTI-PSYKER 5+",
          "CLEAVE 1",
          "DEVASTATING WOUNDS: PSYKER"
        ],
        "a": "4",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Gun Stock",
        "tags": [],
        "a": "3",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 7\", Support",
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Seeker’s Instincts",
        "text": "▪ This unit has +2\" **[gloss:move-characteristic:M]**.\n▪ This unit can re‑roll **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**."
      },
      {
        "name": "Corner the Quarry",
        "text": "When an enemy unit (excluding MONSTER/VEHICLE units) **[gloss:engaged:engaged]** with this unit makes a **[gloss:fall-back-move:fall‑back move]**, that enemy unit must use the **[gloss:desperate-escape:desperate escape mode]**. If that enemy unit is **[gloss:battle-shocked:battle‑shocked]**, -1 from those **[gloss:hazard-roll:hazard rolls]**."
      }
    ],
    "composition": [
      "1 Knight‑Centura model"
    ],
    "loadout": "**This model is equipped with:** 1 Executioner Greatblade.",
    "options": [
      "This model’s Executioner Greatblade can be replaced with one of the following:\n▪ 1 Master‑crafted Boltgun and 1 Gun Stock\n▪ 1 Master‑crafted Flamer and 1 Gun Stock"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Prosecutor Squad",
        "Vigilator Squad",
        "Witchseeker Squad"
      ]
    },
    "keywords": [
      "Anathema Psykana",
      "Character",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Anathema Psykana"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "orion-assault-dropship",
    "name": "Orion Assault Dropship",
    "points": [
      {
        "models": 1,
        "points": 690,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 740,
        "note": "2nd+"
      }
    ],
    "flavor": "The heavily armoured Orion is a superlative assault craft designed to weather attacks while it deploys its formidable cargo of Custodian Guard. With bolt and energy weapons blazing, the Orion swiftly clears a landing zone and unleashes its passengers, before soaring skyward to rain death upon any other threats that enter its sights.",
    "profiles": [
      {
        "name": "Orion Assault Dropship",
        "m": "14\"",
        "t": "12",
        "sv": "2+",
        "w": "22",
        "ld": "6+",
        "oc": "0",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Arachnus Heavy Blaze Cannon",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Spiculus Heavy Bolt Launcher",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin Lastrum Bolt Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "9",
        "ws": "4+",
        "s": "9",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Damaged 7, Deadly Demise D6, Hover",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Assault Dropship",
        "text": "In your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to make a **tactical disembark move** from this unit, if that unit is then selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent that unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**."
      }
    ],
    "composition": [
      "1 Orion Assault Dropship model"
    ],
    "loadout": "**This model is equipped with:** 2 Arachnus Heavy Blaze Cannon; 1 Armoured Hull; 2 Spiculus Heavy Bolt Launcher; 2 Twin Lastrum Bolt Cannon.",
    "transport": "This model has a transport capacity of 12 Adeptus Custodes Infantry models. Or 1 Dreadnought models. While transporting 1 DREADNOUGHT unit, this unit also has a transport capacity of 6 ADEPTUS CUSTODES INFANTRY models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "160mm"
  },
  {
    "id": "pallas-grav-attack",
    "name": "Pallas Grav‑Attack",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Designed as a highly manoeuvrable hunter-killer, the Pallas Grav-attack provides the Adeptus Custodes with a rapid strike capacity, using its agility and versatile twin arachnus blaze cannon to inflict devastating hit-and-run assaults on the enemy, or to hunt down fleeing targets that have evaded Custodes ground troops.",
    "profiles": [
      {
        "name": "Pallas Grav-attack",
        "m": "12\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "5+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Twin Arachnus Blaze Cannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Twin Iliastus Accelerator Fusil",
        "tags": [
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Deadly Demise 1",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Mobile Hunter",
        "text": "In your Shooting phase, when this unit has shot, you can use this ability. If you do:\n▪ This unit can make a **[gloss:normal-move:normal move]** of up to D6\".\n▪ This unit is __not__ **[gloss:eligible-to-charge:eligible to declare a charge]** until the end of the turn."
      }
    ],
    "composition": [
      "1 Pallas Grav‑attack model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Twin Arachnus Blaze Cannon.",
    "options": [
      "This model’s Twin Arachnus Blaze Cannon can be replaced with 1 Twin Iliastus Accelerator Fusil."
    ],
    "keywords": [
      "Fly",
      "Frame",
      "Grav-assault",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "prosecutor-squad",
    "name": "Prosecutor Squad",
    "points": [
      {
        "models": 4,
        "points": 45
      },
      {
        "models": 5,
        "points": 50
      },
      {
        "models": 9,
        "points": 80
      },
      {
        "models": 10,
        "points": 90
      }
    ],
    "profiles": [
      {
        "name": "Prosecutors",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [
          "ANTI-PSYKER 4+",
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gun Stock",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Purity of Execution",
        "text": "In your Shooting phase, you can select one **[gloss:visible:visible]** enemy unit within 18\" of this unit. That unit is **detected**:\n▪ While a unit is **detected**, that unit has +3\" **[gloss:detection-range:detection range]**."
      }
    ],
    "composition": [
      "4‑10 Prosecutor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Boltgun; 1 Gun Stock.",
    "keywords": [
      "Anathema Psykana",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Anathema Psykana"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "sagittarum-custodians-sodality",
    "name": "Sagittarum Custodians Sodality",
    "points": [
      {
        "models": 3,
        "points": 185
      }
    ],
    "profiles": [
      {
        "name": "Sagittarum Custodian",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Adrastus Bolt Caliver",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Misericordia",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Disintegration Beams (Once per battle, per unit)",
        "text": "In your Shooting phase, you can use this ability. If you do, this unit's ranged attacks have [DEVASTATING WOUNDS]."
      },
      {
        "name": "Saturation Volleys",
        "text": "In your Shooting phase, after this unit has shot, you can select one enemy NON-MONSTER/VEHICLE unit hit by those attacks. That unit is **[gloss:sm-suppressed:suppressed]** until the start of your next turn:\n▪ While a unit is **suppressed**, that unit's attacks have -1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "3 Sagittarum Custodian models"
    ],
    "loadout": "**Every model is equipped with:** 1 Adrastus Bolt Caliver; 1 Misericordia.",
    "keywords": [
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "sentinel-guard-sodality",
    "name": "Sentinel Guard Sodality",
    "points": [
      {
        "models": 3,
        "points": 240,
        "note": "1st-3rd"
      },
      {
        "models": 3,
        "points": 270,
        "note": "4th+"
      }
    ],
    "profiles": [
      {
        "name": "Custodian Guard",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Sentinel Blade",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Sentinel Blade",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Stand Vigil",
        "text": "This unit’s attacks have [LETHAL HITS: **non**‑MONSTER/VEHICLE] if any of the following apply:\n▪ This unit is within range of an **[gloss:objective:objective]**.\n▪ The target of those attacks is within range of an **objective**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Praesidium Shield",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Vexilla",
        "text": "▪ This unit has +1 **[gloss:objective-control:OC]**.\n▪ This unit can ignore modifiers to this unit’s **[gloss:leadership:Ld]**."
      }
    ],
    "composition": [
      "3 Sentinel Guard models"
    ],
    "loadout": "**Every model is equipped with:** 1 Praesidium Shield; 1 Sentinel Blade.",
    "options": [
      "1 model can be equipped with 1 Vexilla."
    ],
    "keywords": [
      "Battleline",
      "Imperium",
      "Infantry",
      "Trusted Sentinel"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "shield-captain",
    "name": "Shield‑Captain",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "Shield‑Captains are among the greatest warriors in the Imperium. No matter which weapons they wield, they display absolute mastery of them. Their tactical and strategic abilities are superlative, and they read the ebb and flow of a war at a glance before directing their forces accordingly.",
    "profiles": [
      {
        "name": "Shield-Captain",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "8",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Pyrithite Spear",
        "tags": [
          "ASSAULT",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Castellan Axe",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Guardian Spear",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Pyrithite Spear",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Eternity-pattern Paragon Blade",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Castellan Axe",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Guardian Spear",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Deep Strike",
    "faction": "Aquila Commander, Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Vengeful Surge (Once per battle, per unit)",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit lost a wound as a result of those attacks, this unit can make a **[gloss:surge-move:surge move]** of up to D6+2\"."
      },
      {
        "name": "Master of Ka’tahs (Once per battle round, per unit)",
        "text": "If this unit is not **[gloss:ac-readied:readied]**, you can use this ability. If you do, this unit is **readied**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Praesidium Shield",
        "text": "Attacks allocated to this model have -1 **[gloss:damage-roll:D]**."
      }
    ],
    "composition": [
      "1 Shield‑Captain model"
    ],
    "loadout": "**This model is equipped with:** 1 Praesidium Shield; 1 Pyrithite Spear.",
    "options": [
      "This model’s Pyrithite Spear can be replaced with 1 Eternity‑pattern Paragon Blade.",
      "This model’s Pyrithite Spear and Praesidium Shield can be replaced with one of the following:\n▪ Castellan Axe\n▪ Guardian Spear"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Custodian Guard Sodality",
        "Custodian Guard Sodality with Adrasite Spears",
        "Custodian Guard Sodality with Pyrithite Spears",
        "Custodian Wardens",
        "Sagittarum Custodians Sodality",
        "Sentinel Guard Sodality"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Infantry",
      "Shield-Captain"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "shield-captain-in-allarus-terminator-armour",
    "name": "Shield‑Captain in Allarus Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 185
      }
    ],
    "flavor": "A Shield-Captain is already one of the most formidable combatants and superlative strategists in the Imperium. When clad in a nigh-on impenetrable suit of auramite Terminator armour, they become more powerful still – a walking fortress of Imperial might able to shrug off even the most dolorous blows.",
    "profiles": [
      {
        "name": "Shield-Captain in Allarus Terminator Armour",
        "m": "7\"",
        "t": "8",
        "sv": "2+",
        "w": "9",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Castellan Axe",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Balistus Grenade Launcher",
        "tags": [
          "ASSAULT",
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Guardian Spear",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Castellan Axe",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Guardian Spear",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Deep Strike",
    "faction": "Aquila Commander, Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Archeotech Teleport‑shunter (Once per battle, per unit)",
        "text": "In your Movement phase, if this unit is **[gloss:unengaged:unengaged]** and has not been **[gloss:selected-to-move:selected to move]** this phase, you can use this ability. If you do, place this unit in **[gloss:strategic-reserves:strategic reserves]** and this unit must make an **[gloss:ingress-move:ingress move]** this phase."
      },
      {
        "name": "Master of Ka’tahs (Once per battle round, per unit)",
        "text": "If this unit is not **[gloss:ac-readied:readied]**, you can use this ability. If you do, this unit is **readied**."
      }
    ],
    "composition": [
      "1 Shield‑Captain in Allarus Terminator Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Balistus Grenade Launcher; 1 Guardian Spear.",
    "options": [
      "This model’s Guardian Spear can be replaced with 1 Castellan Axe."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Allarus Custodians",
        "Aquilon Terminators with Solarite Power Gauntlets",
        "Aquilon Terminators with Solarite Power Talons"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Infantry",
      "Shield-Captain",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "shield-captain-on-dawneagle-jetbike",
    "name": "Shield‑Captain on Dawneagle Jetbike",
    "points": [
      {
        "models": 1,
        "points": 205
      }
    ],
    "flavor": "All Shield‑Captains are decisive warriors who suffer no impediment to their mission, but those swiftest in thought and action soar into battle on Dawneagle jetbikes. They plunge into the heart of the enemy lines to reap a tally with their interceptor lances before arcing away on screaming grav‑engines to strike again elsewhere.",
    "profiles": [
      {
        "name": "Shield-Captain on Dawneagle Jetbike",
        "m": "12\"",
        "t": "8",
        "sv": "2+",
        "w": "10",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Hurricane Bolter",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Salvo Launcher",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Interceptor Lance",
        "tags": [
          "LANCE"
        ],
        "a": "8",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Martial Ka’tah, Aquila Commander, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Master of Ka’tahs (Once per battle round, per unit)",
        "text": "If this unit is not **[gloss:ac-readied:readied]**, you can use this ability. If you do, this unit is **readied**."
      },
      {
        "name": "Sweeping Advance (Once per battle, per unit)",
        "text": "At the end of the Fight phase, if this unit was **[gloss:eligible-to-fight:eligible to fight]** this phase:\n▪ If this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]**.\n▪ __Or:__ If this unit is **[gloss:engaged:engaged]**, this unit can make a **[gloss:fall-back-move:fall‑back move]**."
      }
    ],
    "composition": [
      "1 Shield‑Captain on Dawneagle Jetbike model"
    ],
    "loadout": "**This model is equipped with:** 1 Interceptor Lance; 1 Salvo Launcher.",
    "options": [
      "This model’s Salvo Launcher can be replaced with 1 Hurricane Bolter."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Gyrfalcon Jetbike Sodality",
        "Vertus Praetors"
      ]
    },
    "keywords": [
      "Character",
      "Fly",
      "Imperium",
      "Mounted",
      "Shield-Captain"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "telemon-heavy-dreadnought",
    "name": "Telemon Heavy Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 280,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 310,
        "note": "2nd+"
      }
    ],
    "flavor": "The honour of interment within a Telemon Heavy Dreadnought falls to the most lauded of Custodians, whose battle prowess is deemed a match for the Telemon’s sheer power. Encased within, such souls fight on alongside their brethren, whether surging forward with righteous fury or repelling assaults with their spiculus bolt launcher.",
    "profiles": [
      {
        "name": "Telemon Dreadnought",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "14",
        "ld": "5+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Spiculus Bolt Launcher",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Neutronium Cascade Projectors",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Adrathic Desolator",
        "tags": [],
        "range": "24\"",
        "a": "4",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Arachnus Storm Cannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Iliastus Accelerator Culverin",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "2+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Dual Caestus Fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Caestus Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D3, Damaged 5",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Guardian Eternal",
        "text": "Ranged attacks that target this unit have -1 **[gloss:damage-roll:D]**."
      }
    ],
    "composition": [
      "1 Telemon Heavy Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Dual Caestus Fists; 1 Spiculus Bolt Launcher; 2 Twin Neutronium Cascade Projectors.",
    "options": [
      "This model’s Dual Caestus Fists and 2 Twin Neutronium Cascade Projectors can be replaced with one of the following:\n▪ 1 Adrathic Desolator, 1 Caestus Fist and 1 Twin Neutronium Cascade Projectors\n▪ 1 Arachnus Storm Cannon, 1 Caestus Fist and 1 Twin Neutronium Cascade Projectors\n▪ 1 Caestus Fist, 1 Iliastus Accelerator Culverin and 1 Twin Neutronium Cascade Projectors"
    ],
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "trajann-valoris",
    "name": "Trajann Valoris",
    "points": [
      {
        "models": 1,
        "points": 265
      }
    ],
    "flavor": "Trajann Valoris’ warrior prowess approaches that of the Primarchs of old. With the Watcher’s Axe he can bisect the sarcophagus of a Chaos Helbrute in a single swing, or use its built-in bolt weapon – known as Eagle’s Scream – to cut down enemy infantry with salvoes of adamantine-tipped penetrator bolts.",
    "profiles": [
      {
        "name": "Trajann Valoris",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "10",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Eagle’s Scream",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Watcher’s Axe",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-3",
        "d": "4"
      }
    ],
    "core": "Deep Strike, Leader, Feel No Pain 5+",
    "faction": "Aquila Commander, Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Captain‑General (Aura)",
        "text": "Friendly ADEPTUS CUSTODES units (excluding MONSTER/VEHICLE units) within 6\" of this model can:\n▪ Re‑roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re‑roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      {
        "name": "Moment Shackle (Once per battle, per army)",
        "text": "At the start of any phase, you can select one of the following to take effect until the end of the phase:\n▪ This model’s Watcher’s Axe weapon has +3 **[gloss:attack-dice:A]**.\n▪ This model has 3+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Trajann Valoris model"
    ],
    "loadout": "**This model is equipped with:** 1 Eagle’s Scream; 1 Watcher’s Axe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Allarus Custodians",
        "Aquilon Terminators with Solarite Power Gauntlets",
        "Aquilon Terminators with Solarite Power Talons",
        "Custodian Guard Sodality",
        "Custodian Guard Sodality with Adrasite Spears",
        "Custodian Guard Sodality with Pyrithite Spears",
        "Custodian Wardens",
        "Sagittarum Custodians Sodality",
        "Sentinel Guard Sodality"
      ]
    },
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your WARLORD."
      }
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "valerian",
    "name": "Valerian",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "A headstrong warrior, Valerian is relatively new to the Custodes, but is already marked for greatness. His urge to bring death to the foes of the Emperor beyond Terra is much valued in these dark times, and countless enemies have fallen to his guardian spear, Gnosis.",
    "profiles": [
      {
        "name": "Valerian",
        "m": "8\"",
        "t": "7",
        "sv": "2+",
        "w": "8",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Gnosis",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Gnosis",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+, Leader",
    "faction": "Aegis of the Emperor, Aquila Commander, Martial Ka’tah",
    "abilities": [
      {
        "name": "Golden Laurels",
        "text": "Attacks that target this unit have -1 **[gloss:armour-penetration:AP]**."
      },
      {
        "name": "Hero of Lion's Gate (Once per battle, per unit)",
        "text": "After making a **[gloss:hit-roll:hit roll]**, **[gloss:wound-roll:wound roll]** or **[gloss:save-roll:save roll]** for this model, you can change the result to an unmodified 6."
      }
    ],
    "composition": [
      "1 Valerian model"
    ],
    "loadout": "**This model is equipped with:** 1 Gnosis.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Custodian Guard Sodality",
        "Custodian Guard Sodality with Adrasite Spears",
        "Custodian Guard Sodality with Pyrithite Spears",
        "Custodian Wardens",
        "Sagittarum Custodians Sodality",
        "Sentinel Guard Sodality"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Shield-Captain"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm",
    "legends": true
  },
  {
    "id": "venatari-with-kinetic-destroyers",
    "name": "Venatari with Kinetic Destroyers",
    "points": [
      {
        "models": 3,
        "points": 255,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Venatari",
        "m": "12\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Kinetic Destroyer",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "SUSTAINED HITS 1"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Tarsus Buckler",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Martial Ka’tah, Aegis of the Emperor",
    "abilities": [
      {
        "name": "Take Wing",
        "text": "At the end of your opponent’s Fight phase, if this unit is **[gloss:unengaged:unengaged]**, you can place this unit in **[gloss:strategic-reserves:strategic reserves]**."
      },
      {
        "name": "Neutronium Cascade Mine (Once per battle, per unit)",
        "text": "At the start of any phase, you can select one enemy unit within 3\" of this unit and roll one D6. On a 2+:\n▪ That enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ __Or:__ If that enemy unit is a VEHICLE/MONSTER unit, that enemy unit suffers 2D3 **mortal wounds**."
      },
      {
        "name": "Strike from the Skies",
        "text": "In your Shooting phase, if this unit made an **[gloss:ingress-move:ingress move]** this turn, this unit’s ranged attacks can re‑roll **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "3 Venatari models"
    ],
    "loadout": "**Every model is equipped with:** 1 Kinetic Destroyer; 1 Tarsus Buckler.",
    "keywords": [
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "venatari-with-verutum-lances",
    "name": "Venatari with Verutum Lances",
    "points": [
      {
        "models": 3,
        "points": 270,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 300,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Venatari",
        "m": "12\"",
        "t": "7",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Verutum Lance",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Verutum Lance",
        "tags": [
          "LANCE",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Take Wing",
        "text": "At the end of your opponent’s Fight phase, if this unit is **[gloss:unengaged:unengaged]**, you can place this unit in **[gloss:strategic-reserves:strategic reserves]**."
      },
      {
        "name": "Swift Ruin (Once per phase, per army)",
        "text": "You can target this unit with the **Rapid Ingress stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does __not__ prevent any uses of that **stratagem** on other units this phase."
      },
      {
        "name": "Neutronium Cascade Mine (Once per battle, per unit)",
        "text": "At the start of any phase, you can select one enemy unit within 3\" of this unit and roll one D6. On a 2+:\n▪ That enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ __Or:__ If that enemy unit is a VEHICLE/MONSTER unit, that enemy unit suffers 2D3 **mortal wounds**."
      }
    ],
    "composition": [
      "3 Venatari models"
    ],
    "loadout": "**Every model is equipped with:** 1 Verutum Lance.",
    "keywords": [
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "venerable-contemptor-dreadnought",
    "name": "Venerable Contemptor Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "flavor": "These towering combat walkers are piloted by centuries-old fallen heroes kept alive by irreplaceable technologies. Equipped with weapons that can melt armour and tear apart infantry, Venerable Contemptor Dreadnoughts inflict terrible damage, all while protected by atomantic shields and auto-repair protocols.",
    "profiles": [
      {
        "name": "Venerable Contemptor Dreadnought",
        "m": "9\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "5+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Kheres-pattern Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
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
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Contemptor Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Unyielding Ancient (Once per battle, per unit)",
        "text": "At the end of a phase in which this model is **[gloss:destroyed:destroyed]**, roll one D6:\n▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed**, **[gloss:unengaged:unengaged]** and with 3 wounds remaining."
      }
    ],
    "composition": [
      "1 Venerable Contemptor Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Combi-bolter; 1 Contemptor Fist; 1 Multi-melta.",
    "options": [
      "This model's Multi-melta can be replaced with 1 Kheres-pattern Assault Cannon."
    ],
    "keywords": [
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "60mm",
    "legends": true
  },
  {
    "id": "venerable-land-raider",
    "name": "Venerable Land Raider",
    "points": [
      {
        "models": 1,
        "points": 230
      }
    ],
    "flavor": "Land Raiders are heavily armed, mobile fortresses. Possessed of hyper-durable adamantine armour and a fearsome array of weapons, they and their cargo of Custodian warriors can turn the tide of war in a single salvo, and their machine spirits are so potent they can fight on even if the crew are slain.",
    "profiles": [
      {
        "name": "Venerable Land Raider",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Godhammer Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Twin Heavy Bolter",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Storm Bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hunter-killer Missile",
        "tags": [
          "ONE SHOT"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Armoured Tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 5",
    "faction": "Aegis of the Emperor",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, units embarked within this unit can make an **[gloss:assault-disembark-move:assault disembark move]**."
      }
    ],
    "composition": [
      "1 Venerable Land Raider model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Twin Heavy Bolter.",
    "options": [
      "This model can be equipped with 1 Storm Bolter.",
      "This model can be equipped with 1 Hunter-killer Missile."
    ],
    "transport": "This model has a transport capacity of 6 Adeptus Custodes Infantry models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "vertus-praetors",
    "name": "Vertus Praetors",
    "points": [
      {
        "models": 2,
        "points": 220,
        "note": "1st"
      },
      {
        "models": 3,
        "points": 330,
        "note": "1st"
      },
      {
        "models": 2,
        "points": 240,
        "note": "2nd+"
      },
      {
        "models": 3,
        "points": 350,
        "note": "2nd+"
      }
    ],
    "flavor": "Veteran warriors who have seen battle on a hundred worlds, these Custodians know that the value of speed is in directing their might precisely where and when it is needed most. Master combatants and marksmen both, they can place piercing strikes and deadly salvoes with precision even when travelling at immense speeds.",
    "profiles": [
      {
        "name": "Vertus Praetors",
        "m": "12\"",
        "t": "8",
        "sv": "2+",
        "w": "7",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Salvo Launcher",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D3+2"
      },
      {
        "name": "Hurricane Bolter",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Interceptor Lance",
        "tags": [
          "LANCE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Aegis of the Emperor, Martial Ka’tah",
    "abilities": [
      {
        "name": "Quicksilver Execution",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s melee attacks have [SUSTAINED HITS 1]."
      }
    ],
    "composition": [
      "2‑3 Vertus Praetor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Interceptor Lance; 1 Salvo Launcher.",
    "options": [
      "All models in this unit can each have their Salvo Launcher replaced with 1 Hurricane Bolter."
    ],
    "keywords": [
      "Fly",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Custodes"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "vigilator-squad",
    "name": "Vigilator Squad",
    "points": [
      {
        "models": 4,
        "points": 50
      },
      {
        "models": 5,
        "points": 55
      },
      {
        "models": 9,
        "points": 90
      },
      {
        "models": 10,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "Vigilators",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Executioner Greatblade",
        "tags": [
          "ANTI-PSYKER 5+",
          "DEVASTATING WOUNDS: PSYKER"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Deft Parry",
        "text": "Melee attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "4‑10 Vigilator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Executioner Greatblade.",
    "keywords": [
      "Anathema Psykana",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Anathema Psykana"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "witchseeker-squad",
    "name": "Witchseeker Squad",
    "points": [
      {
        "models": 4,
        "points": 55
      },
      {
        "models": 5,
        "points": 60
      },
      {
        "models": 9,
        "points": 100
      },
      {
        "models": 10,
        "points": 110
      }
    ],
    "profiles": [
      {
        "name": "Witchseekers",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Flamer",
        "tags": [
          "ANTI-PSYKER 4+",
          "ASSAULT",
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gun Stock",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 7\"",
    "faction": "daughters of the abyss",
    "abilities": [
      {
        "name": "Sanctified Flames",
        "text": "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks. That enemy unit makes a **[gloss:battle-shock-test:battle‑shock roll]**, with -1 to that **battle‑shock roll** if that enemy unit is a PSYKER unit."
      }
    ],
    "composition": [
      "4‑10 Witchseeker models"
    ],
    "loadout": "**Every model is equipped with:** 1 Flamer; 1 Gun Stock.",
    "keywords": [
      "Anathema Psykana",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Anathema Psykana"
    ],
    "baseSize": "32mm"
  }
]
