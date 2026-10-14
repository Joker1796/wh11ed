// Blood Angels — datasheets. Unit roster and points from src/data/mfm/blood-angels.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// Transcribed from app data 963 (Codex: Space Marines and its Supplements) by
// scripts/gen-datasheets.mjs — re-run it rather than hand-porting a whole codex.
// 24 sheets of this Chapter's own here (10 of them Legends from the Faction Pack, which
// the MFM still prices); 97 Codex: Space Marines sheets are folded in by id — see
// sharedUnitIds below (derived by the generator, not kept by hand) and datasheets/index.js.
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
  "captain-on-bike",
  "captain-with-jump-pack",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "cerberus",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-with-jump-pack",
  "company-heroes",
  "desolation-squad",
  "dreadnought",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad-with-heavy-bolters",
  "eradicator-squad-with-melta-rifles",
  "falchion",
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
  "invader-atvs",
  "invictor-tactical-warsuit",
  "judiciar",
  "kratos",
  "land-raider",
  "land-raider-crusader",
  "land-raider-excelsior",
  "land-raider-redeemer",
  "land-speeder",
  "librarian",
  "librarian-in-phobos-armour",
  "librarian-in-terminator-armour",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-with-combi-weapon",
  "mastodon",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "rapier-carrier",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "relic-razorback",
  "repulsor",
  "repulsor-executioner",
  "rhino",
  "rhino-primaris",
  "scout-bike-squad",
  "scout-squad",
  "sicaran",
  "sternguard-veteran-squad",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "tarantula-air-defence-battery",
  "tarantula-sentry-battery",
  "techmarine",
  "terminator-assault-squad",
  "terminator-squad",
  "terrax-pattern-termite",
  "thunderhawk-gunship",
  "typhon",
  "vanguard-veteran-squad",
  "vanguard-veteran-squad-with-jump-packs",
  "venerable-dreadnought",
  "vindicator",
  "whirlwind"
]

export const pointsOverrides = {
  "centurion-devastator-squad": [
    {
      "models": 3,
      "points": 175
    },
    {
      "models": 6,
      "points": 350
    }
  ]
}
export default [
  {
    "id": "astorath",
    "name": "Astorath",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Wherever sons of Sanguinius are on the cusp of the Black Rage, that is where Astorath goes. Determined to give those warriors a glorious final victory, he fights like a man possessed, lopping off the heads of his enemies while leading frothing Space Marines consumed with unrestrained fury.",
    "profiles": [
      {
        "name": "Astorath",
        "m": "12\"",
        "t": "5",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "The Executioner's Axe",
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
    "core": "Leader, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Mass of Doom",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit's melee attacks have [DEVASTATING WOUNDS: non-MONSTER/VEHICLE]."
      },
      {
        "name": "Redeemer of the Lost",
        "text": "In the Fight phase, when a model in this unit is **[gloss:destroyed:destroyed]**, if this unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6, with +1 to that roll if that model was **[gloss:engaged:engaged]** with an enemy unit with a **[gloss:toughness:T]** greater than or equal to this unit's **T**:\n▪ On a 4+, do not remove that model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield."
      }
    ],
    "composition": [
      "1 Astorath model"
    ],
    "loadout": "**This model is equipped with:** 1 The Executioner's Axe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines with Jump Packs"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Epic Hero",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
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
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
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
        "name": "Twin Assault Cannon",
        "tags": [
          "ASSAULT",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Storm Bolter",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Baal Flamestorm Cannon",
        "tags": [
          "ASSAULT",
          "BLAST 2",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "-",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2",
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
        "name": "Heavy Flamer",
        "tags": [
          "ASSAULT",
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
        "name": "Hunter-killer Missile",
        "tags": [
          "ASSAULT",
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
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Overcharged Engines",
        "text": "This unit can re-roll **[gloss:advance-roll:advance rolls]**."
      }
    ],
    "composition": [
      "1 Baal Predator model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Twin Assault Cannon.",
    "options": [
      "This model can be equipped with one of the following: 2 Heavy Bolters, 2 Heavy Flamers",
      "This model's Twin Assault Cannon can be replaced with 1 Baal Flamestorm Cannon.",
      "This model can be equipped with 1 Storm Bolter",
      "This model can be equipped with 1 Hunter-killer Missile"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
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
        "points": 90
      }
    ],
    "flavor": "The Captains of the Blood Angels Chapter are mighty warriors possessed of tactical and strategic genius. In keeping with their Chapter’s culture, they go to war clad in finely wrought artificer armour and wielding an array of deadly relic weapons drawn from the Chapter’s Armoury.",
    "profiles": [
      {
        "name": "Blood Angels Captain",
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
        "name": "Inferno Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Master-crafted Chainsword",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Finest Hour (Once per battle, per unit)",
        "text": "In the Fight phase, when this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, this model’s melee attacks have:\n▪ +3 **[gloss:attack-dice:A]**.\n▪ [DEVASTATING WOUNDS]."
      },
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Blood Angels Captain model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Chainsword.",
    "options": [
      "This model's Master-crafted Chainsword can be replaced with one of the following: 1 Power Fist, 1 Relic Weapon",
      "This model's Heavy Bolt Pistol can be replaced with 1 Inferno Pistol."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Company Heroes",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
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
        "points": 175
      }
    ],
    "flavor": "Mephiston is an enormously powerful warrior and psyker. He is the only Blood Angel known to have suppressed the Black Rage, resurrecting from near death with exceptional strength, vigour and speed. Many whisper behind his back, asking what price he paid for such a transformation.",
    "profiles": [
      {
        "name": "Chief Librarian Mephiston",
        "m": "8\"",
        "t": "6",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Fury of the Ancients – focused witchfire",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Fury of the Ancients – witchfire",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "PSYCHIC"
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
        "name": "Vitarus",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Lone Operative, Feel No Pain 5+, Fights First",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Chief Librarian (psyker level 3)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      }
    ],
    "composition": [
      "1 Chief Librarian Mephiston model"
    ],
    "loadout": "**This model is equipped with:** 1 Fury of the Ancients; 1 Plasma Pistol; 1 Vitarus.",
    "abilitySets": [
      {
        "name": "Chief Librarian (psyker level 3)",
        "options": [
          {
            "name": "Quickening (psychic level 1)",
            "text": "In your Command phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ The **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit __in addition__ to any other **combat doctrine** until the start of your next Command phase."
          },
          {
            "name": "Transfixing Gaze (psychic level 2)",
            "text": "Start of your opponent's Movement phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ When an enemy unit within 6\" makes a **[gloss:fall-back-move:fall-back move]**, that enemy unit must take a **[gloss:leadership-roll:leadership roll]**. If that test is failed, that enemy unit must Remain Stationary (Core Rules, 09.04)."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Psyker",
      "Tacticus"
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
        "points": 140
      }
    ],
    "flavor": "Dante soars over the battlefield, gleaming in his golden armour, before roaring into bloody battle on trails of fire. Once in the fray, the piercing gaze of his death mask freezes enemies in fright, while his perfectly placed strikes with the Axe Mortalis cut down foe after foe.",
    "profiles": [
      {
        "name": "Commander Dante",
        "m": "12\"",
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
        "name": "Perdition Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 2",
          "SUSTAINED HITS 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
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
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Death Mask of Sanguinius",
        "text": "At the start of the Fight phase, each enemy unit within 6\" of this model makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**."
      },
      {
        "name": "Warden of the Imperium Nihilus",
        "text": "The **[gloss:sm-combat-doctrine:assault doctrine]** and **tactical doctrine** are active for this unit __in addition__ to any other **combat doctrine**."
      }
    ],
    "composition": [
      "1 Commander Dante model"
    ],
    "loadout": "**This model is equipped with:** 1 Perdition Pistol; 1 The Axe Mortalis.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Sanguinary Guard",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Chapter Master",
      "Character",
      "Epic Hero",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "death-company-captain",
    "name": "Death Company Captain",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "None of Sanguinius’sone are immune to the effects of the Black Rage. Should a Captain succumb to the Flaw, he will don the black and be outfitted with relic weapons for one final battle. Empowered by the depths of their madness, Death Company Captains slaughter their foes with violent fury as they seek absolution in death.",
    "profiles": [
      {
        "name": "Death Company Captain",
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
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Inferno Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Weapon",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Master-crafted Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader, Feel No Pain 6+",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Forlorn Hero",
        "text": "This unit has [core:Scouts 6\"]."
      },
      {
        "name": "Black Rage",
        "text": "▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot make a **fall-back** move and it's **[gloss:objective-control:OC]** is modified to 0."
      },
      {
        "name": "Death Visions of Sanguinius",
        "text": "In the Fight phase, when an enemy unit has fought, if this model was **[gloss:destroyed:destroyed]** by those attacks, you can use this ability. If you do, roll one D6, with +2 to that roll if this model was **[gloss:engaged:engaged]** with an enemy WARLORD unit:\n▪ On a 2-3, that enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ On a 4-5, that enemy unit suffers 3 **mortal wounds**.\n▪ On a 6+, that enemy unit suffers D3+3 **mortal wounds**."
      }
    ],
    "composition": [
      "1 Death Company Captain model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Chainsword.",
    "options": [
      "This model's Master-crafted Chainsword can be replaced with one of the following: 1 Power Fist, 1 Relic Weapon",
      "This model's Heavy Bolt Pistol can be replaced with 1 Inferno Pistol."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Death Company",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
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
        "points": 85
      }
    ],
    "flavor": "None of Sanguinius’sone are immune to the effects of the Black Rage. Should a Captain succumb to the Flaw, he will don the black and be outfitted with relic weapons for one final battle. Empowered by the depths of their madness, Death Company Captains slaughter their foes with violent fury as they seek absolution in death.",
    "profiles": [
      {
        "name": "Death Company Captain with Jump Pack",
        "m": "12\"",
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
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hand Flamer",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
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
        "name": "Power Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Thunder Hammer",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Death Visions of Sanguinius",
        "text": "In the Fight phase, when an enemy unit has fought, if this model was **[gloss:destroyed:destroyed]** by those attacks, you can use this ability. If you do, roll one D6, with +2 to that roll if this model was **[gloss:engaged:engaged]** with an enemy WARLORD unit:\n▪ On a 2-3, that enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ On a 4-5, that enemy unit suffers 3 **mortal wounds**.\n▪ On a 6+, that enemy unit suffers D3+3 **mortal wounds**."
      },
      {
        "name": "Lost to Fury",
        "text": "This unit's melee attacks have [SUSTAINED HITS 1]."
      },
      {
        "name": "Black Rage",
        "text": "▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot make a **fall-back** move and it's **[gloss:objective-control:OC]** is modified to 0."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Death Company Captain with Jump Pack model"
    ],
    "loadout": "**This model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "This model's Astartes Chainsword and Heavy Bolt Pistol can be replaced with 1 Thunder Hammer and 1 Relic Shield.",
      "This model's Astartes Chainsword can be replaced with one of the following: 1 Power Fist, 1 Relic Weapon",
      "This model's Astartes Chainsword and Heavy Bolt Pistol can be replaced with 1 Astartes Chainsword and 1 Relic Shield (that model’s Astartes Chainsword cannot be replaced).",
      "This model's Heavy Bolt Pistol can be replaced with one of the following: 1 Hand Flamer, 1 Plasma Pistol"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines with Jump Packs"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Death Company",
      "Explosives",
      "Fly",
      "Infantry",
      "Jump Pack",
      "Tacticus"
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
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 185,
        "note": "3rd+"
      }
    ],
    "flavor": "Even being interred in a Dreadnought’s sarcophagus is insufficient to keep the Black Rage at bay. Death Company Dreadnoughts are like furious battering rams, desperate to smash into the enemy and tear them apart. They are potent terror weapons, unleashed to inflict as much damage as possible.",
    "profiles": [
      {
        "name": "Death Company Dreadnought",
        "m": "10\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Twin Icarus Ironhail Heavy Stubber",
        "tags": [
          "ANTI-FLY 3+",
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Heavy Bolter",
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
        "name": "Blood Fist Bolt Rifles",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Multi-melta",
        "tags": [
          "MELTA 3",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Blood Fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Blood Talons",
        "tags": [
          "CLEAVE 2",
          "SUSTAINED HITS 1: NON-MONSTER/VEHICLE",
          "TWIN-LINKED"
        ],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Feel No Pain 6+, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot make a **fall-back** move and it's **[gloss:objective-control:OC]** is modified to 0."
      },
      {
        "name": "Driven by Fury",
        "text": "In your opponent's Shooting phase, when an enemy unit has shot, if this unit was hit by those attacks, it can make a **[gloss:surge-move:surge move]** of up to D6+1\"."
      }
    ],
    "composition": [
      "1 Death Company Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Blood Fist Bolt Rifles; 1 Blood Fists; 1 Twin Heavy Bolter; 1 Twin Icarus Ironhail Heavy Stubber.",
    "options": [
      "This model's Twin Heavy Bolter can be replaced with 1 Twin Multi-melta.",
      "This model's Blood Fist Bolt Rifles and Blood Fists can be replaced with 1 Blood Talons."
    ],
    "keywords": [
      "Death Company",
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
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
        "points": 90,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 185,
        "note": "3rd+"
      }
    ],
    "flavor": "Members of the Death Company are possessed of a berserk fury, driven insane by terrible visions and hallucinations. They seek nothing but death in battle, and such is their ferocity that they barely flinch at even the most grievous of Injuries, thinking of nothing but the destruction of their enemies.",
    "profiles": [
      {
        "name": "Death Company Marines",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hand Flamer",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Inferno Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Bolt Rifle – focused fire",
        "tags": [
          "HEAVY",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bolt Rifle – saturation",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grenade Launcher – frag",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grenade Launcher – krak",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Eviscerator",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Combat Blade",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Feel No Pain 6+",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Black Rage",
        "text": "▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot make a **[gloss:fall-back-move:fall-back move]** and it's **[gloss:objective-control:OC]** is modified to 0."
      },
      {
        "name": "An Honourable Death in Combat",
        "text": "This unit's attacks:\n▪ Have [SUSTAINED HITS 1], if this unit is below **[gloss:starting-strength:starting strength]**.\n▪ __Or:__ have [SUSTAINED HITS 2], if this unit is below **[gloss:half-strength:half-strength]**."
      }
    ],
    "composition": [
      "5-10 Death Company Marines models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "Any number of models can each have their Chainsword replaced with 1 Bolt Rifle Fire and 1 Combat Blade.",
      "For every 5 models in this unit, 1 model can have their Chainsword replaced with 1 Eviscerator.",
      "1 model can have their Heavy Bolt Pistol replaced with one of the following: 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol",
      "For every 5 models in this unit, 1 model equipped with 1 Bolt Rifle can be equipped with 1 Grenade Launcher.",
      "1 model can have their Chainsword replaced with one of the following: 1 Power Fist, 1 Power Weapon, 1 Thunder Hammer"
    ],
    "keywords": [
      "Death Company",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "32mm"
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
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 160,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 290,
        "note": "3rd+"
      }
    ],
    "flavor": "The savagery induced by the Black Rage cannot be cured and so must be utilised to its fullest extent. When equipped with jump packs, Death Company Marines are lent great speed and mobility that, when allied to their vengeful rage, renders them lethal shock troops.",
    "profiles": [
      {
        "name": "Death Company Marines with Jump Packs",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Hand Flamer",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "9\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – standard",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Pistol – supercharge",
        "tags": [
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Inferno Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Eviscerator",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 6+",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Savage Fury",
        "text": "This unit has +1 to **[gloss:charge-roll:charge rolls]**."
      },
      {
        "name": "Black Rage",
        "text": "▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While this unit is not within 6\" of one or more friendly BLOOD ANGELS CHARACTER models, or not within 12\" of one or more friendly CHAPLAIN models, it cannot make a **fall-back** move and it's **[gloss:objective-control:OC]** is modified to 0."
      }
    ],
    "composition": [
      "5-10 Death Company Marines with Jump Packs models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "For every 5 models in this unit, 1 model can have their Chainsword replaced with 1 Power Fist.",
      "For every 5 models in this unit, 1 model can have their Heavy Bolt Pistol replaced with 1 Hand Flamer.",
      "For every 5 models in this unit, up to 2 models can each have their Chainsword replaced with 1 Power Weapon.",
      "For every 5 models in this unit, 1 model can have their Heavy Bolt Pistol replaced with 1 Inferno Pistol.",
      "For every 5 models in this unit, up to 2 models can each have their Heavy Bolt Pistol replaced with 1 Plasma Pistol.",
      "For every 5 models in this unit, 1 model can have their Chainsword replaced with 1 Eviscerator."
    ],
    "keywords": [
      "Death Company",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "32mm"
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
        "points": 110
      }
    ],
    "flavor": "Lemartes’ life is one of constant battle. A warrior of iron will, somehow he retains lucidity despite having succumbed to the Black Rage. He leads the Blood Angels’ Death Company as Guardian of the Lost, wielding the ancient weapon known as the Blood Crozius. His inspiration has only made the Death Company even more potent.",
    "profiles": [
      {
        "name": "Lemartes",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Absolvor Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "The Blood Crozius",
        "tags": [
          "CLEAVE 1",
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader, Feel No Pain 6+",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fury Unbound",
        "text": "This unit's melee attacks have [LETHAL HITS]."
      },
      {
        "name": "Guardian of the Lost",
        "text": "Attacks that target this unit have -1 **[gloss:damage-roll:D]**."
      }
    ],
    "composition": [
      "1 Lemartes model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 The Blood Crozius.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Death Company Marines with Jump Packs"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Death Company",
      "Epic Hero",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
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
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 275,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 290,
        "note": "3rd+"
      }
    ],
    "flavor": "Sanguinary Guard are proven in mind, body and spirit in a way few of their brothers can match. Clad in irreplaceable golden armour believed to date back to the Horus Heresy and armed with the traditional relic weapons of their position, few embody the ideal of the wrathful angel more than they.",
    "profiles": [
      {
        "name": "Sanguinary Guard",
        "m": "12\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Inferno Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "MELTA 1"
        ],
        "range": "9\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Angelus Boltgun",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Encarmine Weapon",
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Angelic Visage",
        "text": "Melee attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]**."
      },
      {
        "name": "Heirs of Azkaellon",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have ‑1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "3-6 Sanguinary Guard models"
    ],
    "loadout": "**Every model is equipped with:** 1 Angelus Boltgun; 1 Encarmine Weapon.",
    "options": [
      "For every 3 models in this unit, 1 model can have their Angelus Boltgun replaced with 1 Inferno Pistol."
    ],
    "keywords": [
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sanguinary-priest",
    "name": "Sanguinary Priest",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "The Sanguinary Priests are the Blood Angels’ Apothecaries, and hold responsibility for the Chapter’s soul as well as its body. Through their ministrations and ceremonies do they call upon the Blood Angels to embrace the Red Thirst, control it and unleash their rage upon the enemy.",
    "profiles": [
      {
        "name": "Sanguinary Priest",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Absolvor Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Blood Chalice",
        "text": "This unit has +1 **[gloss:toughness:T]**."
      },
      {
        "name": "Narthecium (Once per turn, per unit)",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** D3+1 wounds."
      }
    ],
    "composition": [
      "1 Sanguinary Priest model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Chainsword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Desolation Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
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
        "t": "5",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Encarmine Broadsword",
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Aura of Fervour",
        "text": "Friendly ADEPTUS ASTARTES units within 12\" of this model can re-roll **[gloss:leadership-roll:leadership rolls]**."
      },
      {
        "name": "Miraculous Saviour (Once per battle, per army)",
        "text": "At the end of your opponent's Charge phase (excluding the first battle round), select up to one enemy unit that made a **[gloss:charge-move:charge move]** this phase. This unit can make an **[gloss:ingress-move:ingress move]** and must be set up **[gloss:engaged:engaged]** with that enemy unit. That move does not prevent this unit from being **[gloss:eligible-to-move:eligible to move]**."
      }
    ],
    "composition": [
      "1"
    ],
    "loadout": "The Sanguinor model\n**This model is equipped with:** 1 Encarmine Broadsword.",
    "keywords": [
      "Character",
      "Epic Hero",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Blood Angels"
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
