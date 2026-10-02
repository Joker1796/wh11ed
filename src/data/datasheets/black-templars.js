// Black Templars — datasheets. Unit roster and points from src/data/mfm/black-templars.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// Transcribed from app data 963 (Codex: Space Marines and its Supplements) by
// scripts/gen-datasheets.mjs — re-run it rather than hand-porting a whole codex.
// 15 sheets of this Chapter's own here (0 of them Legends from the Faction Pack, which
// the MFM still prices); 88 Codex: Space Marines sheets are folded in by id — see
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
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
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
    "id": "castellan",
    "name": "Castellan",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "A Castellan leads each of a crusade’s fighting companies and acts as a conduit for their Marshal’s will. Charged with the physical and spiritual purity of active Chapter Keeps, they have honed a patient wisdom that they draw upon in battle, alongside their tactical precision and close-quarters ferocity.",
    "profiles": [
      {
        "name": "Castellan",
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
        "name": "Combi-weapon – damnatus",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Combi-weapon – infernus",
        "tags": [
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon – purgatus",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Vehement Aggression",
        "text": "In the Fight phase, when this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, make a **[gloss:leadership-roll:leadership roll]** for this unit:\n▪ This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ __Or:__ If that roll succeeds: This unit's melee attacks:\n▪ Can re-roll **hit rolls** of 1.\n▪ Can re-roll **[gloss:wound-roll:wound rolls]** of 1."
      }
    ],
    "composition": [
      "1 Castellan model"
    ],
    "loadout": "**This model is equipped with:** 1 Combi-weapon; 1 Master-crafted Power Weapon.",
    "options": [
      "This model's Combi-weapon can be replaced with 1 Heavy Bolt Pistol.",
      "This model's Master-crafted Power Weapon can be replaced with 1 Chainsword."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Crusader Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Lieutenant",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaplain-grimaldus",
    "name": "Chaplain Grimaldus",
    "points": [
      {
        "models": 4,
        "points": 120
      }
    ],
    "flavor": "High Chaplain Grimaldus is a beacon of Imperial faith. His fortitude is such that many of his brothers believe him invincible. His will is singular, his zeal coldly furious, and his martial skill attested by the trail of broken foes laid at his heels. His Cenobyte Servitors lurch to war at his side, bearing with them holy relics of the faith.",
    "profiles": [
      {
        "name": "Cenobyte Servitor",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "1",
        "ld": "8+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Chaplain Grimaldus",
        "m": "6\"",
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
          "CLOSE-QUARTERS",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Artificer crozius",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Temple Relics",
        "text": "At the start of your Command phase, if this unit contains one or more CENOBYTE SERVITOR models, select up to one of the abilities in the Temple Relics section. Until the start of your next Command phase, this model has that ability."
      },
      {
        "name": "Litanies of the Devout",
        "text": "This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]**."
      },
      {
        "name": "Faithful Cenobytes",
        "text": "▪ If this unit’s Chaplain Grimaldus model is **[gloss:destroyed:destroyed]**, this unit’s remaining Cenobyte Servitor models are also **destroyed**.\n▪ Each Cenobyte Servitor model in this unit takes up 0 **[gloss:transport-capacity:transport capacity]**."
      }
    ],
    "composition": [
      "1 Chaplain Grimaldus model",
      "3 Cenobyte Servitor models"
    ],
    "loadout": "**The Chaplain Grimaldus is equipped with:** 1 Artificier Crozius; 1 Plasma Pistol.\n**Every Cenobyte Servitor is equipped with:** 1 Servitor Combat Weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sword Brethren Squad"
      ]
    },
    "abilitySets": [
      {
        "name": "Temple Relics",
        "options": [
          {
            "name": "Banner of the Emperor Victorious",
            "text": "This unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**."
          },
          {
            "name": "Column from the Major Altar",
            "text": "This unit has +1 **[gloss:toughness:T]**."
          },
          {
            "name": "Water from the Stoup of Elucidation",
            "text": "This unit's melee attacks have +1 **[gloss:armour-penetration:AP]**."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "28.5mm, 40mm"
  },
  {
    "id": "crusade-ancient",
    "name": "Crusade Ancient",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "Carrying their crusade’s icons and sacred standards, these veteran wardens are honoured warriors of exceptional resolve and determination. They raise high the tapestries depicting the crusade’s victories and the God-Emperor’s glory, exhorting their fellow Black Templars to greater heights of weaponised hate.",
    "profiles": [
      {
        "name": "Crusade Ancient",
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
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Vengeful Exhortation",
        "text": "In the Fight phase, you can use this ability. If you do, when a model in this unit is **[gloss:destroyed:destroyed]**, if this unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6:\n▪ On a 4+, do not remove this model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield."
      },
      {
        "name": "Martial Honour (Once per battle, per unit)",
        "text": "If this unit's melee attacks **[gloss:destroyed:destroyed]** an enemy unit this phase, you can use this ability. If you do, until the end of the battle, this model has +5 **[gloss:objective-control:OC]**."
      }
    ],
    "composition": [
      "1 Crusade Ancient model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Master-crafted Power Weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Crusader Squad",
        "Sword Brethren Squad"
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
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "crusader-squad",
    "name": "Crusader Squad",
    "points": [
      {
        "points": 160,
        "note": "1 Sword Brother, 4 Neophytes, 5 Initiates"
      },
      {
        "points": 305,
        "note": "1 Sword Brother, 8 Neophytes, 11 Initiates"
      }
    ],
    "flavor": "Crusader Squads storm into battle with bolt rifles blazing and chainswords howling. Initiates aim jets of fire from their pyreblasters or swing crackling power fists into their foes, while hard-eyed Neophytes fight furiously to prove their martial worth under the stem gaze of their mentors.",
    "profiles": [
      {
        "name": "Sword Brother",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Initiate",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Neophyte",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Shotgun",
        "tags": [
          "ASSAULT",
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Pyreblaster",
        "tags": [
          "BLAST 1",
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
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
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
      }
    ],
    "melee": [
      {
        "name": "Combat Knife",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Master-crafted Power Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Neophyte Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
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
        "name": "Initiate Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Righteous Zeal",
        "text": "In your opponent's Shooting phase, when an enemy unit has shot, if a model in this unit was **[gloss:destroyed:destroyed]** by those attacks, this unit can make a **[gloss:surge-move:surge move]** of up to D6+1\"."
      }
    ],
    "composition": [
      "1 Sword Brother model",
      "4-8 Neophyte models",
      "5-11 Initiate models"
    ],
    "loadout": "**The Sword Brother is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.\n**Every Neophyte is equipped with:** 1 Bolt Pistol; 1 Neophyte Chainsword.\n**Every Initiate is equipped with:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Knives and Fists.",
    "options": [
      "Any number of Initiate models can each have their Bolt Rifle replaced with 1 Heavy Bolt Pistol and 1 Initiate Chainsword.",
      "Any number of Neophyte models can each have their Bolt Pistol and Neophyte Chainsword replaced with 1 Shotgun and 1 Combat Knife.",
      "The Sword Brother can have their Heavy Bolt Pistol replaced with 1 Hand Flamer.",
      "For every 10 models in this unit, up to 2 Initiate models can each have their Bolt Rifle replaced with one of the following: 1 Heavy Bolt Pistol and 1 Power Fist, 1 Pyreblaster"
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "28.5mm, 32mm, 40mm"
  },
  {
    "id": "emperors-champion",
    "name": "Emperor's Champion",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "A humble warrior touched by greatness, the Emperor’s Champion strides to battle wreathed in divine light. The furious blows of the enemy ring from his nigh-impenetrable Armour of Faith. In return, the Emperor’s Champion seeks out the leaders of the foe and, with sweeping blows from his Black Sword, strikes them down.",
    "profiles": [
      {
        "name": "Emperor's Champion",
        "m": "8\"",
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
        "name": "Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Black Sword – strike",
        "tags": [
          "ANTI-CHARACTER 5+",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Black Sword – sweep",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Lone Operative, Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Chosen of the Emperor",
        "text": "You cannot include more than one EMPEROR'S CHAMPION unit in your army."
      },
      {
        "name": "Armour of Faith",
        "text": "Attacks allocated to this model have ‑1 **[gloss:damage-roll:D]**."
      },
      {
        "name": "Sigismund's Heir",
        "text": "This unit has +1 to **[gloss:charge-roll:charge rolls]**."
      }
    ],
    "composition": [
      "1 Emperor's Champion model"
    ],
    "loadout": "**This model is equipped with:** 1 Black Sword; 1 Bolt Pistol.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
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
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "execrator",
    "name": "Execrator",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Execrators are living exemplars of their battle-brothers’ oaths, ferocious warrior priests who lead the Black Templars in lethal rampages. They teach that waris the most worthy chapel for warriors, every bludgeoning blow of their crozius arcanum punctuated with zealous invective and roared sermons.",
    "profiles": [
      {
        "name": "Execrator",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
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
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
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
      }
    ],
    "melee": [
      {
        "name": "Crozius Arcanum",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Remorseless Persecution",
        "text": "In your Movement phase, when this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**."
      },
      {
        "name": "Condemnatory Annihilation",
        "text": "After this unit has fought, if this unit **[gloss:destroyed:destroyed]** an enemy model this phase, each enemy unit **[gloss:engaged:engaged]** with this unit makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**."
      }
    ],
    "composition": [
      "1 Execrator model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.",
    "options": [
      "This model's Absolvor Bolt Pistol can be replaced with 1 Hand Flamer.",
      "If this model is equipped with 1 Absolvor Bolt Pistol, it can be equipped with 1 Master-crafted Power Weapon (this model's 1 Absolvor Bolt Pistol cannot be replaced)."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Crusader Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "gladiator-lancer",
    "name": "Gladiator Lancer",
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
    "flavor": "With pinpoint accuracy, Gladiator Lancer crews use this battle tank’s laser destroyer to spear through the heaviest enemy armour and punch smouldering holes in the flesh of xenos monstrosities. Such is the range of its heavy cannon that it can eliminate threats to the Black Templars before their battle-brothers encounter them, storming past their wrecks to seek the next affront to the Emperor.",
    "profiles": [
      {
        "name": "Gladiator Lancer",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Defensive Array",
        "tags": [
          "RAPID FIRE 6"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Laser Destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+3"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
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
        "name": "Armoured Hull",
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
        "name": "Aquilon Optics",
        "text": "This unit’s ranged attacks that target a MONSTER/VEHICLE unit can:\n▪ Re-roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re-roll __one__ **[gloss:wound-roll:wound roll]**.\n▪ Re-roll __one__ **[gloss:damage-roll:damage roll]**."
      }
    ],
    "composition": [
      "1 Gladiator Lancer model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Defensive Array; 1 Laser Destroyer.",
    "options": [
      "This model can be equipped with 1 Multi-melta"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "gladiator-reaper",
    "name": "Gladiator Reaper",
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
    "flavor": "When the cannons of the Gladiator Reaper spin to full pitch, the whining drone is likened to the sharpening of the Emperor’s just blade and a sensation which only truly discomforts the blasphemous. Within seconds, thousands of spent casings pour over the battle tank’s armoured hide as enemies are erased from existence by the storm of fire.",
    "profiles": [
      {
        "name": "Gladiator Reaper",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Defensive Array",
        "tags": [
          "RAPID FIRE 12"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Heavy Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 2: NON-MONSTER/VEHICLE",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
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
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
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
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Reaping Tally",
        "text": "This unit’s ranged attacks that target a unit (excluding MONSTER/VEHICLE units) have +1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "1 Gladiator Reaper model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Defensive Array; 1 Twin Heavy Onslaught Gatling Cannon.",
    "options": [
      "This model can be equipped with 1 Multi-melta"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "gladiator-valiant",
    "name": "Gladiator Valiant",
    "points": [
      {
        "models": 1,
        "points": 145,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 165,
        "note": "3rd+"
      }
    ],
    "flavor": "The Valiant lays down blistering volleys of holy fire as it escorts transports or supports infantry in ferocious fighting, executing singular threats and vaporising squads of heavily armoured heretics with equal ease. Its twin las-talons spit vindicated death at the foe, making short work of enemy armour, while its hissing multi-meltas turn fortified positions into bubbling slag.",
    "profiles": [
      {
        "name": "Gladiator Valiant",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Defensive Array",
        "tags": [
          "RAPID FIRE 6"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Las-talon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
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
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Priority Target Acquisition",
        "text": "This unit’s ranged attacks that target a unit within 12\" of this unit have +1 **[gloss:strength:S]**."
      }
    ],
    "composition": [
      "1 Gladiator Valiant model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Defensive Array; 2 Multi-melta; 1 Twin Las-talon.",
    "options": [
      "This model can be equipped with 1 Multi-melta"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "high-marshal-helbrecht",
    "name": "High Marshal Helbrecht",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Helbrecht is the living embodiment of his Chapter’s warrior spirit. Wielding the Sword of the High Marshals, he storms into the fray, bellowing oaths of vengeance as he leads the unstoppable charge. His battle-brothers follow him without question, for they believe where High Marshal Helbrecht treads, so too walks the Emperor himself.",
    "profiles": [
      {
        "name": "High Marshal Helbrecht",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Ferocity",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS"
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
        "name": "Sword of the High Marshals – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Sword of the High Marshals – sweep",
        "tags": [],
        "a": "12",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "High Marshal",
        "text": "At the start of the Fight phase, select up to one enemy unit **[gloss:engaged:engaged]** with this unit and roll one D6:\n▪ On a 2-3, that enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ On a 4-5, that enemy unit suffers 3 **mortal wounds**.\n▪ On a 6+, that enemy unit suffers D3+3 **mortal wounds**."
      },
      {
        "name": "Crusade of Wrath",
        "text": "This unit's melee attacks have:\n▪ +1 **[gloss:attack-dice:A]**.\n▪ +1 **[gloss:strength:S]**."
      }
    ],
    "composition": [
      "1 High Marshal Helbrecht model"
    ],
    "loadout": "**This model is equipped with:** 1 Ferocity; 1 Sword of the High Marshals.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Crusader Squad",
        "Intercessor Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Chapter Master",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "impulsor",
    "name": "Impulsor",
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
    "flavor": "Equipped with vectored thrusters that make it faster than any other gravitic tank in the Space Marines’ armouries, the Impulsor is a highly adaptable transport used by all Primaris Space Marines for rapid insertion and flanking manoeuvres. It is particularly favoured by Vanguard forces.",
    "profiles": [
      {
        "name": "Impulsor",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Storm Bolters",
        "tags": [
          "RAPID FIRE 4"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Bellicatus Missile Array – frag",
        "tags": [
          "BLAST 1"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Bellicatus Missile Array – icarus",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bellicatus Missile Array – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Ironhail Heavy Stubber",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Fragstorm Grenade Launchers",
        "tags": [
          "BLAST 2"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
    "core": "Deadly Demise D3, Firing Deck 7",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Rapid Disembarkation",
        "text": "In your Movement phase, when this unit ends an **[gloss:advance-move:advance move]**, units embarked within this unit can make a **[gloss:shock-disembark-move:shock disembark move]** (pg 157)."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Orbital Comms Array",
        "text": "This unit has [core:Scouts 6\"]."
      },
      {
        "name": "Shield Dome",
        "text": "This unit has 5+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Impulsor model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Storm Bolters.",
    "options": [
      "This model's Storm bolters can be replaced with 1 Fragstorm grenade launchers.",
      "This model can be equipped with one of the following: 1 Ironhail heavy stubber, 1 Multi-melta",
      "This model can be equipped with one of the following: 1 Bellicatus missile array, 1 Orbital Comms Array, 1 Shield Dome"
    ],
    "transport": "This model has a transport capacity of 7 Adeptus Astartes Infantry models. It cannot transport Terminator or Jump Pack models. Each Gravis model takes up the space of 2 models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "marshal",
    "name": "Marshal",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Each Black Templars crusade is led by a Marshal. Similar in rank to the Captains of other Chapters, Marshals are fearsome combatants and paragons of strategic acumen. Ensuring a crusade’s purity and success is a sacred duty, and Marshals fight with sanctified relic weapons while acting as beacons of pious fervour for their warriors.",
    "profiles": [
      {
        "name": "Marshal",
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
          "CLOSE-QUARTERS",
          "HAZARDOUS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Inspirational Exemplar",
        "text": "This unit's melee attacks have +1 to **[gloss:hit-roll:hit rolls]**."
      },
      {
        "name": "Pious Fervour",
        "text": "When this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, this model's melee attacks have +1 **[gloss:attack-dice:A]** for each enemy unit within 6\" of this model (to a maximum of +3 **A**)."
      }
    ],
    "composition": [
      "1 Marshal model"
    ],
    "loadout": "**This model is equipped with:** 1 Master-crafted Power Weapon; 1 Plasma Pistol.",
    "options": [
      "This model's Plasma Pistol can be replaced with 1 Combi-weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Crusader Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
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
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "repulsor",
    "name": "Repulsor",
    "points": [
      {
        "models": 1,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 210,
        "note": "3rd+"
      }
    ],
    "flavor": "Clad in advanced armour plating and armed for any battlefield situation, the Repulsor not only transports its passengers safely, it also provides superb fire support. Dangerous terrain is little impediment to it, its ventral plates channelling gravitic energies that crush obstacles beneath the vehicle’s mass.",
    "profiles": [
      {
        "name": "Repulsor",
        "m": "10\"",
        "t": "12",
        "sv": "3+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Defensive Array",
        "tags": [],
        "range": "24\"",
        "a": "18",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 2: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hunter-slayer Missile",
        "tags": [
          "INDIRECT FIRE",
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
        "name": "Twin Heavy Bolter",
        "tags": [
          "RAPID FIRE 2",
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
        "name": "Twin Lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
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
    "core": "Damaged 6, Deadly Demise D6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Combat Embarkation",
        "text": "In your opponent’s Charge phase, when an enemy unit has selected **[gloss:charge-target:charge targets]**, you can select one friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES unit that was one of those **charge targets** and is eligible to embark within this TRANSPORT. If every model in that unit is within 3\" of this TRANSPORT, that unit can embark within this TRANSPORT. That enemy unit can then select new **charge targets** for that **[gloss:charge-move:charge move]**."
      }
    ],
    "composition": [
      "1 Repulsor model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Onslaught Gatling Cannon; 1 Hunter-slayer Missile; 1 Twin Heavy Bolter.",
    "options": [
      "This model's Twin heavy bolter can be replaced with 1 Twin lascannon.",
      "This model can be equipped with 1 Multi-melta",
      "This model's Heavy onslaught gatling cannon can be replaced with 1 Las-talon."
    ],
    "transport": "This model has a transport capacity of 14 Adeptus Astartes Infantry models. Each Terminator, Gravis, Jump Pack, Wulfen model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "repulsor-executioner",
    "name": "Repulsor Executioner",
    "points": [
      {
        "models": 1,
        "points": 265,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 285,
        "note": "3rd+"
      }
    ],
    "flavor": "Based on the Repulsor chassis, the Repulsor Executioner sacrifices some transport capacity to accommodate powerful turret weaponry. Even the largest battle tanks can be crippled by the beam of a heavy laser destroyer, while the incinerating blasts of a macro plasma incinerator can obliterate infantry formations.",
    "profiles": [
      {
        "name": "Repulsor Executioner",
        "m": "10\"",
        "t": "12",
        "sv": "3+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Defensive Array",
        "tags": [],
        "range": "24\"",
        "a": "18",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy Laser Destroyer",
        "tags": [
          "DEVASTATING WOUNDS",
          "HEAVY"
        ],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+4"
      },
      {
        "name": "Heavy Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE",
          "SUSTAINED HITS 2: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Macro Plasma Incinerator – standard",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Macro Plasma Incinerator – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "10",
        "ap": "-4",
        "d": "3"
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
    "core": "Damaged 6, Deadly Demise D6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Executioner",
        "text": "This unit’s ranged attacks that target a unit not **[gloss:half-strength:below half-strength]** have +1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Repulsor Executioner model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Defensive Array; 1 Heavy Laser Destroyer; 1 Heavy Onslaught Gatling Cannon; 1 Twin Heavy Bolter.",
    "options": [
      "All models in this unit can each have their Heavy laser destroyer replaced with 1 Macro plasma incinerator.",
      "This model can be equipped with 1 Multi-melta"
    ],
    "transport": "This model has a transport capacity of 7 Adeptus Astartes Infantry models. Each Terminator, Gravis, Jump Pack, Wulfen model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "sword-brethren-squad",
    "name": "Sword Brethren Squad",
    "points": [
      {
        "models": 4,
        "points": 115,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 9,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 275,
        "note": "1st-2nd"
      },
      {
        "models": 4,
        "points": 135,
        "note": "3rd+"
      },
      {
        "models": 5,
        "points": 160,
        "note": "3rd+"
      },
      {
        "models": 9,
        "points": 270,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 295,
        "note": "3rd+"
      }
    ],
    "flavor": "Every Sword Brother has earned their place amongst the Marshal’s household through acts of unswerving faith and spectacular violence. On the battlefield, they are reaping whirlwinds, unstoppable, uncompromising, and armed with a lethal assortment of weapons, and they turn upon the enemy in the Emperor’s name.",
    "profiles": [
      {
        "name": "Sword Brother",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
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
      }
    ],
    "melee": [
      {
        "name": "Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Lightning Claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "2+",
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
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Exploit their Cowardice",
        "text": "In your opponent's Movement phase, when an enemy unit that was **[gloss:engaged:engaged]** with this unit ends a **[gloss:fall-back-move:fall-back move]**, if this unit is **[gloss:unengaged:unengaged]** it can make a **[gloss:normal-move:normal move]** of up to 6\"."
      }
    ],
    "composition": [
      "4-10 Sword Brother models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "For every 4 models in this unit, up to 2 models can each have their Heavy Bolt Pistol replaced with 1 Hand Flamer.",
      "Any number of models can each have their Chainsword replaced with 1 Master-crafted Power Weapon.",
      "For every 4 models in this unit, 1 model can have their Chainsword replaced with 1 Thunder Hammer.",
      "For every 4 models in this unit, 1 model can have their Heavy Bolt Pistol replaced with 1 Plasma Pistol.",
      "For every 4 models in this unit, 1 model can have their Heavy Bolt Pistol and Chainsword replaced with 1 Twin Lightning Claws."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "40mm"
  }
]
