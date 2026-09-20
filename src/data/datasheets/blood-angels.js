// Blood Angels — datasheets. Unit roster and points from src/data/mfm/blood-angels.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// 25 chapter-specific/differing datasheets here; 156 units identical
// to space-marines.js are NOT duplicated — see sharedUnitIds below and
// src/data/datasheets/index.js (loadDatasheets merges them in by id).
export const sharedUnitIds = [
  "aggressor-squad",
  "ancient",
  "ancient-in-terminator-armour",
  "ancient-on-bike",
  "apothecary",
  "apothecary-biologis",
  "apothecary-on-bike",
  "assault-intercessor-squad",
  "assault-intercessors-with-jump-packs",
  "assault-squad",
  "assault-squad-with-jump-packs",
  "astartes-servitors",
  "astraeus",
  "attack-bike-squad",
  "ballistus-dreadnought",
  "bike-squad",
  "bladeguard-ancient",
  "bladeguard-veteran-squad",
  "brutalis-dreadnought",
  "caestus-assault-ram",
  "captain",
  "captain-in-gravis-armour",
  "captain-in-phobos-armour",
  "captain-in-terminator-armour",
  "captain-on-bike",
  "captain-with-jump-pack",
  "carab-culln-the-risen",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "cerberus",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-venerable-dreadnought",
  "chaplain-with-jump-pack",
  "command-squad",
  "company-champion-on-bike",
  "company-heroes",
  "company-veterans-on-bikes",
  "deathstorm-drop-pod",
  "deimos-predator",
  "deredeo-dreadnought",
  "desolation-squad",
  "devastator-squad",
  "dreadnought",
  "dreadnought-drop-pod",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad",
  "eradicator-squad-with-heavy-bolters",
  "falchion",
  "fellblade",
  "ferren-areios",
  "fire-raptor-gunship",
  "firestrike-servo-turrets",
  "gladiator-lancer",
  "gladiator-reaper",
  "gladiator-valiant",
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
  "hunter",
  "imperial-space-marine",
  "impulsor",
  "inceptor-squad",
  "incursor-squad",
  "infernus-squad",
  "infiltrator-squad",
  "intercessor-squad",
  "invader-atv",
  "invictor-tactical-warsuit",
  "ironclad-dreadnought",
  "javelin-attack-speeder",
  "judiciar",
  "kratos",
  "land-raider",
  "land-raider-achilles",
  "land-raider-crusader",
  "land-raider-excelsior",
  "land-raider-helios",
  "land-raider-prometheus",
  "land-raider-proteus",
  "land-raider-redeemer",
  "land-speeder",
  "land-speeder-storm",
  "land-speeder-tempest",
  "land-speeder-tornado",
  "land-speeder-typhoon",
  "leviathan-dreadnought",
  "librarian",
  "librarian-in-phobos-armour",
  "librarian-in-terminator-armour",
  "librarian-on-bike",
  "librarian-with-jump-pack",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-in-reiver-armour",
  "lieutenant-with-combi-weapon",
  "mastodon",
  "mortis-dreadnought",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "primaris-company-champion",
  "rapier-carrier",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "relic-contemptor-dreadnought",
  "relic-razorback",
  "relic-terminator-squad",
  "repulsor",
  "repulsor-executioner",
  "rhino",
  "rhino-primaris",
  "scout-bike-squad",
  "scout-sniper-squad",
  "scout-squad",
  "sicaran-arcus",
  "sicaran-battle-tank",
  "sicaran-omega",
  "sicaran-punisher",
  "sicaran-venator",
  "sokar-pattern-stormbird",
  "spartan",
  "stalker",
  "sternguard-veteran-squad",
  "storm-eagle-gunship",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "suppressor-squad",
  "tactical-squad",
  "tarantula-air-defence-battery",
  "tarantula-sentry-battery",
  "techmarine",
  "techmarine-on-bike",
  "terminator-assault-squad",
  "terminator-squad",
  "terminus-ultra",
  "terrax-pattern-termite",
  "thunderfire-cannon",
  "thunderhawk-gunship",
  "thunderhawk-transporter",
  "typhon",
  "vanguard-veteran-squad",
  "vanguard-veteran-squad-with-jump-packs",
  "venerable-dreadnought",
  "vindicator",
  "vindicator-laser-destroyer",
  "whirlwind",
  "whirlwind-scorpius",
  "xiphon-interceptor",
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
  "centurion-devastator-squad": [
    { models: 3, points: 175 },
    { models: 6, points: 350 },
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
        "Death Company Marines with Jump Packs"
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
    "id": "brother-corbulo",
    "name": "Brother Corbulo",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "The Sanguinary High Priest, Brother Corbulo, is held in high regard for his commitment to the Chapter, his nobility and his gift of foresight – an ability many believe Sanguinius shared. On the battlefield he races to wounded brothers, hacking down any foes in his path with powerful sweeps of Heaven’s Teeth.",
    "profiles": [
      {
        "name": "Brother Corbulo",
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
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Heaven’s Teeth",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sanguinary Priest",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability."
      },
      {
        "name": "The Red Grail",
        "text": "While this model is leading a unit, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Brother Corbulo – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Heaven’s Teeth.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Desolation Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Devastator Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Sanguinary Priest",
      "Brother Corbulo"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "captain-tycho",
    "name": "Captain Tycho",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Captain Tycho was once one of the Blood Angels’ most gifted commanders, a paragon of every ideal his Chapter held to. It was while fighting countless battles against the Orks on Armageddon that he earned fame and renown, and there that he suffered the wound that changed his life forever.",
    "profiles": [
      {
        "name": "Captain Tycho",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Blood Song",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "MELTA 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
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
      }
    ],
    "melee": [
      {
        "name": "Dead Man’s Hand",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Gifted Commander",
        "text": "While this model is leading a unit, each time that unit is selected to shoot, select one of the following abilities to apply to ranged weapons equipped by models in that unit until the end of the phase:\n▪ [ASSAULT]\n▪ [HEAVY]\n▪ [RAPID FIRE 1]"
      },
      {
        "name": "Embittered",
        "text": "The first time an attack is allocated to this model, after the attacking unit has finished making its attacks, until the end of the battle, change the Attacks characteristic of this model’s Dead Man’s Hand to 12."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "TYCHO",
        "text": "Your army cannot contain both CAPTAIN TYCHO and TYCHO THE LOST."
      }
    ],
    "composition": [
      "1 Captain Tycho – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Blood Song; bolt pistol; Dead Man’s Hand.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Captain",
      "Tycho"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
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
        "Assault Intercessors with Jump Packs",
        "Sanguinary Guard",
        "Vanguard Veteran Squad with Jump Packs"
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
        "text": "While this model is leading a unit, unless that unit starts the battle embarked within a TRANSPORT, models in that unit have the Scouts 6\" ability."
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
        "Death Company Marines with Jump Packs"
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
    "id": "death-company-dreadnought-with-magna-grapple",
    "name": "Death Company Dreadnought with Magna-grapple",
    "points": [
      {
        "models": 1,
        "points": 145
      }
    ],
    "flavor": "Even being interred in a Dreadnought’s sarcophagus is insufficient to keep the Black Rage at bay. Death Company Dreadnoughts are like furious battering rams, desperate to smash into the enemy and tear them apart. They are potent terror weapons, unleashed to inflict as much damage as possible.",
    "profiles": [
      {
        "name": "Death Company Dreadnought with Magna-grapple",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
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
      }
    ],
    "melee": [
      {
        "name": "Blood talons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin Furioso fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time this model makes an attack, you can re-roll the Hit roll. While this model is not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Frenzied Reprisal",
        "text": "Once per turn, in the Fight phase, when an enemy unit targets this unit, after that unit has resolved its attacks, this unit is eligible to fight (even if it has already fought this phase) and must be selected to fight next."
      },
      {
        "name": "Magna-grapple",
        "text": "Add 2 to Charge rolls made for this model if one or more of the targets of that charge is a MONSTER or VEHICLE unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Smoke Launchers",
        "text": "The bearer loses the Magna-grapple ability and gains the SMOKE keyword."
      }
    ],
    "composition": [
      "1 Death Company Dreadnought"
    ],
    "loadout": "**This model is equipped with:** meltagun; storm bolter; twin Furioso fists.",
    "options": [
      "This model’s storm bolter can be replaced with 1 heavy flamer.",
      "This model’s meltagun can be replaced with 1 heavy flamer.",
      "This model’s Furioso fists can be replaced with 1 blood talons.",
      "This model can be equipped with 1 smoke launchers."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Death Company Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
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
        "text": "▪ This unit can re-roll charge rolls.\n▪ When you target this unit with the Fire Overwatch/Heroic Intervention stratagem, that use is -1 CP."
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
    "id": "death-company-marines-with-boltguns",
    "name": "Death Company Marines with Boltguns",
    "points": [
      {
        "models": 5,
        "points": 125
      },
      {
        "models": 10,
        "points": 250
      }
    ],
    "flavor": "Members of the Death Company are possessed of a berserk fury, driven insane by terrible visions and hallucinations. They seek nothing but death in battle, and such is their ferocity that they barely flinch at even the most grievous of injuries, thinking of nothing but the destruction of their enemies.",
    "profiles": [
      {
        "name": "Death Company Marines with Boltguns",
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
          "MELTA 2",
          "PISTOL"
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
        "text": "Each time a model in this unit makes an attack, you can re-roll the Hit roll. While this unit is not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and the Objective Control characteristic of models in this unit is 0."
      },
      {
        "name": "An Honourable Death in Combat",
        "text": "Each time a model in this unit makes an attack, that attack has the [SUSTAINED HITS 1] ability if this unit is below its Starting Strength, or the [SUSTAINED HITS 2] ability if this unit is Below Half-strength."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "DEATH COMPANY",
        "text": "If a CHAPLAIN model from your army with the Leader ability can be attached to a Tactical Squad, it can be attached to this unit instead.\n\nIf a CHARACTER unit from your army with the Leader ability can be attached to a Death Company Marines unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "5-10 Death Company Marines"
    ],
    "loadout": "**Every model is equipped with:** boltgun; close combat weapon.",
    "options": [
      "Any number of models can each have their boltgun and close combat weapon replaced with one of the following:\n▪ 1 Astartes chainsword and 1 bolt pistol\n▪ 1 thunder hammer",
      "Any number of models can each have their bolt pistol replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol",
      "Any number of models can each have their Astartes chainsword replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Death Company",
      "Death Company Marines with Boltguns"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "death-company-marines-with-boltguns-and-jump-packs",
    "name": "Death Company Marines with Boltguns and Jump Packs",
    "points": [
      {
        "models": 5,
        "points": 140
      },
      {
        "models": 10,
        "points": 280
      }
    ],
    "flavor": "Members of the Death Company are possessed of a berserk fury, driven insane by terrible visions and hallucinations. They seek nothing but death in battle, and such is their ferocity that they barely flinch at even the most grievous of injuries, thinking of nothing but the destruction of their enemies.",
    "profiles": [
      {
        "name": "Death Company Marines with Boltguns and Jump Packs",
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
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "Each time a model in this unit makes an attack, you can re-roll the Hit roll. While this unit is not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and the Objective Control characteristic of models in this unit is 0."
      },
      {
        "name": "An Honourable Death in Combat",
        "text": "Each time a model in this unit makes an attack, that attack has the [SUSTAINED HITS 1] ability if this unit is below its Starting Strength, or the [SUSTAINED HITS 2] ability if this unit is Below Half-strength."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "DEATH COMPANY",
        "text": "If a CHAPLAIN model from your army with the Leader ability can be attached to Assault Intercessors with Jump Packs or an Assault Squad with Jump Packs, it can be attached to this unit instead.\n\nIf a CHARACTER unit from your army with the Leader ability can be attached to a Death Company Marines with Jump Packs unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "5-10 Death Company Marines"
    ],
    "loadout": "**Every model is equipped with:** boltgun; close combat weapon.",
    "options": [
      "Any number of models can each have their boltgun and close combat weapon replaced with one of the following:\n▪ 1 Astartes chainsword and 1 bolt pistol\n▪ 1 thunder hammer",
      "Any number of models can each have their bolt pistol replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol",
      "Any number of models can each have their Astartes chainsword replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon"
    ],
    "keywords": [
      "Infantry",
      "Fly",
      "Jump Pack",
      "Grenades",
      "Imperium",
      "Death Company",
      "Death Company Marines with Boltguns and Jump Packs"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "death-company-marines-with-jump-packs",
    "name": "Death Company Marines with Jump Packs",
    "points": [
      {
        "models": 5,
        "points": 115,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 230,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
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
        "name": "Death Company Marines with Jump Packs",
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
    "id": "furioso-dreadnought",
    "name": "Furioso Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "flavor": "Unique to the Chapter, Furiosos are frequently fitted with armaments only the Blood Angels have, from the infantry-shredding heavy frag cannon to the magna-grapple. The latter weapon’s bolts, attached to adamantine chains, pierce armour, enabling Furiosos to drag enemies into their reach.",
    "profiles": [
      {
        "name": "Furioso Dreadnought",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
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
        "name": "Heavy frag cannon",
        "tags": [
          "BLAST",
          "RAPID FIRE D6"
        ],
        "range": "18\"",
        "a": "D6",
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
      }
    ],
    "melee": [
      {
        "name": "Blood talons",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Furioso fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Twin Furioso fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Wrathful Rampage",
        "text": "Each time this model is selected to fight, you can select one enemy unit within Engagement Range of it and roll one D6, adding 2 to the result if this model made a Charge move this turn: on a 4-5, that enemy unit suffers D3 mortal wounds; on a 6+, that enemy unit suffers 3 mortal wounds."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Magna-grapple",
        "text": "The bearer loses the SMOKE keyword, but add 2 to Charge rolls made for the bearer if one or more of the targets of that charge is a MONSTER or VEHICLE unit."
      }
    ],
    "composition": [
      "1 Furioso Dreadnought"
    ],
    "loadout": "**This model is equipped with:** heavy frag cannon; Furioso fist; storm bolter.",
    "options": [
      "This model’s heavy frag cannon and Furioso fist can be replaced with one of the following:\n▪ 1 blood talons and 1 meltagun\n▪ 1 twin Furioso fists and 1 meltagun",
      "This model’s storm bolter can be replaced with 1 heavy flamer.",
      "This model’s meltagun can be replaced with 1 heavy flamer.",
      "This model can be equipped with 1 magna-grapple."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Furioso Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "gabriel-seth",
    "name": "Gabriel Seth",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Gabriel Seth is a terrifyingly violent warrior, fearlessly charging headlong into the fray in a whirlwind of fury and savagery. He wields Blood Reaver, an enormous two-handed chainsword, with which he is capable of hacking apart even the most monstrous foes.",
    "profiles": [
      {
        "name": "Gabriel Seth",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "6",
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
      }
    ],
    "melee": [
      {
        "name": "Blood Reaver",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Lord of Slaughter",
        "text": "While this model is leading a unit, that unit is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Whirlwind of Gore",
        "text": "Each time this model fights, until that fight is resolved, add 1 to the Attacks characteristic of this model’s Blood Reaver for every 5 enemy models within 6\" of this model."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "FLESH TEARERS",
        "text": "This model is from the Flesh Tearers Chapter, a successor of the Blood Angels. For all rules purposes, it is treated as a BLOOD ANGELS model, but cannot be included in an army that includes any other BLOOD ANGELS EPIC HERO models."
      }
    ],
    "composition": [
      "1 Gabriel Seth – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Blood Reaver.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Chapter Master",
      "Gabriel Seth"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
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
        "Death Company Marines with Jump Packs",
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
    "id": "librarian-dreadnought",
    "name": "Librarian Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "Such is the Blood Angels’ connection to the warp that those Librarians interred in Dreadnoughts retain their link to it. They are dangerous enemies to face, with all the adamantine strength of a Dreadnought as well as the ability to boil an enemy’s blood in their veins, or blast foes apart with beams of energy.",
    "profiles": [
      {
        "name": "Librarian Dreadnought",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Blood Lance – witchfire",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS D3"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Blood Lance – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC",
          "SUSTAINED HITS D3"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+3"
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
      }
    ],
    "melee": [
      {
        "name": "Furioso fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Furioso force halberd",
        "tags": [
          "EXTRA ATTACKS",
          "PSYCHIC"
        ],
        "a": "1",
        "ws": "2+",
        "s": "9",
        "ap": "-3",
        "d": "D6+3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Shield of Sanguinius (Aura, Psychic)",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, models in that unit have the Feel No Pain 5+ ability against mortal wounds and Psychic Attacks."
      },
      {
        "name": "Wings of Sanguinius (Psychic)",
        "text": "Once per turn, at the end of your Movement phase, one PSYKER from your army with this ability can use it. If it does, roll one D6: on a 1, that PSYKER suffers D3 mortal wounds; on a 2+, select one friendly ADEPTUS ASTARTES INFANTRY unit within 12\" of that PSYKER and remove the selected unit from the battlefield, then set it up again anywhere on the battlefield that is more than 8\" horizontally away from all enemy models."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Librarian Dreadnought"
    ],
    "loadout": "**This model is equipped with:** Blood Lance; storm bolter; Furioso fist; Furioso force halberd.",
    "options": [
      "This model’s storm bolter can be replaced with one of the following:\n▪ 1 heavy flamer\n▪ 1 meltagun"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Smoke",
      "Psyker",
      "Imperium",
      "Dreadnought",
      "Librarian Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "sanguinary-guard",
    "name": "Sanguinary Guard",
    "points": [
      {
        "models": 3,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 140,
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
        "text": "While a CHARACTER model is leading this unit, each time a melee attack targets this unit, subtract 1 from the Wound roll."
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
    "id": "sanguinary-priest-with-jump-pack",
    "name": "Sanguinary Priest with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "The Sanguinary Priests are the Blood Angels’ Apothecaries, and hold responsibility for the Chapter’s soul as well as its body. Through their ministrations and ceremonies do they call upon the Blood Angels to embrace the Red Thirst, control it and unleash their rage upon the enemy.",
    "profiles": [
      {
        "name": "Sanguinary Priest with Jump Pack",
        "m": "12\"",
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
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Support",
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
    "wargearAbilities": [],
    "composition": [
      "1 Sanguinary Priest"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Assault Squad with Jump Packs",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Fly",
      "Jump Pack",
      "Sanguinary Priest"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "the-sanguinor",
    "name": "The Sanguinor",
    "points": [
      {
        "models": 1,
        "points": 120
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
  },
  {
    "id": "tycho-the-lost",
    "name": "Tycho the Lost",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "It was in the Third War for Armageddon that rage finally consumed Captain Tycho, as it will consume all sons of Sanguinius, and he took his place in the Death Company. He cut down Orks with volleys from Blood Song and blasts from the digital weapons built into his left gauntlet, known as Dead Man’s Hand.",
    "profiles": [
      {
        "name": "Tycho the Lost",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Blood Song",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "MELTA 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
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
      }
    ],
    "melee": [
      {
        "name": "Dead Man’s Hand",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader, Feel No Pain 6+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Forlorn Hero",
        "text": "While this model is leading a unit, that unit is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Black Rage",
        "text": "Each time this model makes an attack, you can re-roll the Hit roll. While this model is not within 12\" of one or more friendly CHAPLAIN models, it cannot be selected to Fall Back and its Objective Control characteristic is 0."
      },
      {
        "name": "Death Vision of Sanguinius",
        "text": "If this model is destroyed by a melee attack, after the attacking unit has finished making its attacks, you can roll one D6, adding 2 to the result if the attacking unit contains the enemy WARLORD: on a 2-3, that enemy unit suffers 3 mortal wounds; on a 4-5, that enemy unit suffers D3+3 mortal wounds; on a 6+, that enemy unit suffers D6+3 mortal wounds."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "TYCHO",
        "text": "Your army cannot contain both CAPTAIN TYCHO and TYCHO THE LOST."
      }
    ],
    "composition": [
      "1 Tycho the Lost – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Blood Song; bolt pistol; Dead Man’s Hand.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines",
        "Death Company Marines with Bolt Rifles",
        "Death Company Marines with Boltguns"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Captain",
      "Tycho the Lost"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  }
]
