// Drukhari — datasheets. Originally imported from the Wahapedia CSV exports
// (unit roster and points from src/data/mfm/drukhari.js); that importer has been retired.
// wh40k-appdata is the source of truth now — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "archon",
    "name": "Archon",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Archons lead their kabals in battle with a mixture of malevolent cunning, arrogant self-assuredness and breathtaking martial skill. To these qualities, they add an arsenal of esoteric weaponry and wargear that enable them to fight wreathed in concealing shadows, drag the souls from their victims’ bodies, and reduce enemies to desiccated ashes with a single blow.",
    "profiles": [
      {
        "name": "Archon",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "2+",
        "invNote": "* See Shadowfield ability (below)"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Agoniser",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "6",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Huskblade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Hatred Eternal (Pain)",
        "text": "In your Shooting phase or the Fight phase, when you select this model’s unit to shoot or fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes an attack, you can re-roll the Hit roll."
      },
      {
        "name": "Overlord",
        "text": "Once per battle, at the start of any phase, you can select one friendly Drukhari unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      },
      {
        "name": "Devious Mastermind",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Shadowfield",
        "text": "While this model has an InSv, this unit cannot re-roll **save rolls**. When this model loses a wound (excluding from **mortal wounds**), this model has no InSv until the end of the battle."
      },
      {
        "name": "Soul Trap",
        "text": "Add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons. The first time the bearer makes a melee attack that destroys an enemy model, after all the bearer’s attacks have been resolved, until the end of the battle, add an additional 1 to the Attacks and Strength characteristics of the bearer’s melee weapons."
      }
    ],
    "composition": [
      "1 Archon"
    ],
    "loadout": "**This model is equipped with:** splinter pistol; huskblade; shadowfield.",
    "options": [
      "This model's splinter pistol can be replaced with one of the following:\n▪ 1 blast pistol\n▪ 1 soul trap",
      "This model’s huskblade can be replaced with one of the following:\n▪ 1 agoniser\n▪ 1 master-crafted power weapon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hand of the Archon",
        "Incubi",
        "Kabalite Warriors"
      ]
    },
    "keywords": [
      "Aeldari",
      "Archon",
      "Character",
      "Infantry",
      "Kabal"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "cronos",
    "name": "Cronos",
    "points": [
      {
        "models": 1,
        "points": 55
      },
      {
        "models": 2,
        "points": 100
      }
    ],
    "flavor": "Like other Engines of Pain, the Cronos is a grisly amalgam of stimm-fed flesh and biomechanical implements shielded by a burnished carapace. Haemonculi create the Cronos to act as a parasite. Its esoteric syphons leech its victim’s life essence, leaving them as husks before projecting the stolen vitality to other Drukhari.",
    "profiles": [
      {
        "name": "Cronos",
        "m": "7\"",
        "t": "7",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Spirit syphon",
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
        "name": "Spirit vortex",
        "tags": [
          "BLAST",
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Spirit-leech tentacles",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 5+",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Pain Parasite (Pain)",
        "text": "In your Shooting phase or the Fight phase, when you select this unit to shoot or fight, you can spend 1 Pain token to Empower this unit. While Empowered, each time this unit shoots or fights, after it has resolved its attacks, if one or more enemy models were destroyed as a result of those attacks, one model in this unit regains up to 3 lost wounds (if all models in this unit have their starting number of wounds and this unit is below its Starting Strength, 1 model is returned to this unit with 3 wounds remaining)."
      },
      {
        "name": "Pain Engine (Aura)",
        "text": "Each time you spend 1 Pain token to Empower a friendly unit within 9\" of this unit, roll one D6, adding 1 to the result if one or more models in this unit are not equipped with a spirit vortex: on a 5+, you gain 1 Pain token.\n\n**Designer’s Note:** Pain tokens you spend for reasons other than Empowering a unit do not trigger this ability."
      }
    ],
    "composition": [
      "1-2 Cronos"
    ],
    "loadout": "Every Cronos is equipped with: spirit syphon; spirit-leech tentacles.",
    "options": [
      "Any number of models can each be equipped with 1 spirit vortex."
    ],
    "keywords": [
      "Monster",
      "Haemonculus Covens",
      "Fly",
      "Cronos",
      "Aeldari"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "drazhar",
    "name": "Drazhar",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Stalking the battlefields of realspace with a singular and murderous focus, Drazhar fights in utter silence. His bladework is phenomenal, his skill peerless. His only desire appears to be killing for killing’s sake, for he hacks a bloody path through mighty champions and luckless dregs alike, reducing all to butchered corpses with the same contemptuous ease.",
    "profiles": [
      {
        "name": "Drazhar",
        "m": "7\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Executioner’s demiklaives – single blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Executioner’s demiklaives – dual blades",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Master of Blades (Pain)",
        "text": "In the Fight phase, when you select this model’s unit to fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Onslaught",
        "text": "While this model is leading a unit, each time a model in that unit makes a Pile-in or Consolidation move, it can move up to 6\" instead of up to 3\"."
      },
      {
        "name": "Silent Executioner",
        "text": "Each time this model makes an attack that targets a unit that is below its Starting Strength, you can re-roll the Hit roll. If that target is Below Half-strength, you can re-roll the Wound roll as well."
      }
    ],
    "composition": [
      "1 Drazhar – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Executioner’s demiklaives.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Incubi"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Aeldari",
      "Blades for Hire",
      "Drazhar"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "haemonculus",
    "name": "Haemonculus",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Wielding horrific torture implements from their oubliettes and laboratories, Haemonculi drift like sinister predators through the midst of battle. They direct their covens of twisted monstrosities and pain adepts while hungrily seeking out fresh subjects for their hideous fleshcrafting, spreading terror through the foe with the detached fascination of true connoisseurs.",
    "profiles": [
      {
        "name": "Haemonculus",
        "m": "7\"",
        "t": "4",
        "sv": "5+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Stinger pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "2",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Haemonculus tools and scissorhands",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "3",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Fleshcraft (Pain)",
        "text": "In your Command phase, you can spend 1 Pain token to Empower this model’s unit. Each time you do, you can return up to D3+1 destroyed Bodyguard models to that unit."
      },
      {
        "name": "Fear Incarnate (Aura)",
        "text": "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent’s Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test."
      },
      {
        "name": "Pain Adept",
        "text": "In your Command phase, if one or more models from your army with this ability are on the battlefield, roll one D6: on a 4+, you gain 1 Pain token."
      }
    ],
    "composition": [
      "1 Haemonculus"
    ],
    "loadout": "**This model is equipped with:** stinger pistol; Haemonculus tools and scissorhands.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wracks"
      ]
    },
    "keywords": [
      "Aeldari",
      "Infantry",
      "Haemonculus Covens",
      "Character",
      "Haemonculus"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "hand-of-the-archon",
    "name": "Hand of the Archon",
    "points": [
      {
        "models": 10,
        "points": 115
      }
    ],
    "flavor": "Agents of their Archon’s will, these hand-picked teams of ruthless killers are entrusted with crucial tasks during realspace raids. Whether fighting as bodyguards for their overlord, seizing some vital prize, or viciously eliminating key foes, they possess many specialist skills and wargear to ensure the job gets done.",
    "profiles": [
      {
        "name": "Hand of the Archon",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Blaster",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Dark lance",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Shardcarbine",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shredder",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter rifle",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stinger pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Pain sculptors",
        "tags": [
          "ANTI-INFANTRY 4+",
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Razorflail",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Scouts 7\"",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Assassins’ Poisons (Pain)",
        "text": "In your Shooting phase or the Fight phase, when you select this unit to shoot or fight, you can spend 1 Pain token to Empower this unit. While Empowered, weapons equipped by models in this unit (excluding blast pistols, blasters and dark lances) have the [LETHAL HITS] and [PRECISION] abilities."
      },
      {
        "name": "Archon’s Will",
        "text": "At the start of the first battle round, select one objective marker on the battlefield. Until the end of the battle, while this unit is within range of that objective marker, unless this unit is Battle-shocked, models in this unit have a 5+ invulnerable save and an Objective Control characteristic of 3."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Kabalite Icon",
        "text": "While the bearer’s unit is not Battle-shocked, add 1 to the bearer’s Objective Control characteristic."
      },
      {
        "name": "Phantasm Grenade Launcher",
        "text": "The bearer’s unit has the Smoke keyword."
      },
      {
        "name": "Stimm-needler",
        "text": "Once per turn, the first time a saving throw is failed for a model in the bearer’s unit, change the Damage characteristic of that attack to 0."
      }
    ],
    "composition": [
      "1 Kabalite Archsybarite",
      "9 Kabalite Agents"
    ],
    "loadout": "**Every model is equipped with:** splinter rifle; close combat weapon.",
    "options": [
      "The Kabalite Archsybarite’s close combat weapon can be replaced with 1 power weapon.",
      "The Kabalite Archsybarite’s splinter rifle can be replaced with one of the following:\n▪ 1 blast pistol\n▪ 1 splinter pistol",
      "The Kabalite Archsybarite can be equipped with one of the following:\n▪ 1 Kabalite icon\n▪ 1 phantasm grenade launcher",
      "1 Kabalite Agent's splinter rifle can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 shredder",
      "1 Kabalite Agent’s splinter rifle can be replaced with one of the following:\n▪ 1 dark lance\n▪ 1 splinter cannon",
      "1 Kabalite Agent’s splinter rifle can be replaced with 1 stinger pistol.",
      "1 Kabalite Agent’s splinter rifle can be replaced with 1 shardcarbine.",
      "1 Kabalite Agent’s splinter rifle can be replaced with 1 pain sculptors.",
      "1 Kabalite Agent’s splinter rifle can be replaced with 1 splinter pistol and 1 razorflail.",
      "1 Kabalite Agent equipped with a splinter rifle can be equipped with 1 stimm-needler. This model’s splinter rifle cannot be replaced."
    ],
    "keywords": [
      "Infantry",
      "Kabal",
      "Aeldari",
      "Grenades",
      "Hand of the Archon"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm",
    "rules": [
      {
        "name": "ARCHON’S RETINUE",
        "text": "If this unit has a Leader unit attached to it during the Declare Battle Formations step, that Leader unit gains the Scouts 7\" ability."
      }
    ]
  },
  {
    "id": "hellions",
    "name": "Hellions",
    "points": [
      {
        "models": 5,
        "points": 90,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 100,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "When the Hellion gangs ride their bladed skyboards alongside Drukhari raiding parties, they bring terror to the battlefields of realspace. Arrogant and agile, Hellions wield their hellglaives with such skill that battle becomes a contest as to who amongst them can perform the most ostentatious acts of spectacular airborne slaughter.",
    "profiles": [
      {
        "name": "Hellions",
        "m": "14\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter pods",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Hellglaive",
        "tags": [
          "LANCE",
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "LANCE",
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Stunclaw",
        "tags": [
          "DEVASTATING WOUNDS",
          "LANCE",
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Battlefield Butchery (Pain)",
        "text": "In the Fight phase, when you select this unit to fight, you can spend 1 Pain token to Empower this unit. While Empowered, add 1 to the Attacks and Strength characteristics of this unit’s melee weapons."
      },
      {
        "name": "Skyboard Evasion",
        "text": "In your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\"."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Phantasm Grenade Launcher",
        "text": "The bearer’s unit has the Smoke and Grenades keywords."
      }
    ],
    "composition": [
      "1 Helliarch",
      "4-9 Hellions"
    ],
    "loadout": "**Every model is equipped with:** splinter pods; hellglaive.",
    "options": [
      "The Helliarch can be equipped with 1 phantasm grenade launcher.",
      "The Helliarch’s hellglaive can be replaced with one of the following:\n▪ 1 splinter pistol and 1 power weapon.\n▪ 1 splinter pistol and 1 stunclaw.",
      "If the Helliarch is equipped with 1 splinter pistol, it can be equipped with 1 hellglaive (that model’s hellglaive cannot be replaced)."
    ],
    "keywords": [
      "Hellions",
      "Aeldari",
      "Mounted",
      "Wych Cult",
      "Fly"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "incubi",
    "name": "Incubi",
    "points": [
      {
        "models": 5,
        "points": 90,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 100,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "The Incubi are warrior perfectionists of the highest order. Protected by the ornate plates of their ancient warsuits, they move swiftly in for the kill, sweeping giant klaives in practised, decapitating strikes. They carve straight through the enemy’s elite, crushing their spirit with psychic torture devices known as tormentors.",
    "profiles": [
      {
        "name": "INCUBI",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      },
      {
        "name": "KLAIVEX",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      }
    ],
    "melee": [
      {
        "name": "Demiklaives – single blade",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Demiklaives – dual blades",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Klaive",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Decapitating Strikes (Pain)",
        "text": "In the Fight phase, when you select this unit to fight, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes a melee attack that targets an INFANTRY unit, that attack has the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Tormentors",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test. Each time a model in this unit makes a melee attack that targets a Battle-shocked unit, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Incubi Shrine Token",
        "text": "Once per battle for each Incubi Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a Klaivex or Incubi model in this unit to an unmodified 6.\n\n**Designer's Note:** Place an Incubi Shrine token next to the unit for each Incubi Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Klaivex",
      "4-9 Incubi"
    ],
    "loadout": "**Every model is equipped with:** klaive.",
    "options": [
      "The Klaivex’s klaive can be replaced with 1 demiklaives.",
      "For every 5 models in this unit, it can be equipped with 1 Incubi Shrine token."
    ],
    "keywords": [
      "Incubi",
      "Infantry",
      "Aeldari",
      "Blades for Hire"
    ],
    "factionKeywords": [
      "Drukhari"
    ]
  },
  {
    "id": "kabalite-warriors",
    "name": "Kabalite Warriors",
    "points": [
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "Only the best of a kabal’s warriors are afforded a place within its raiding parties, and every one fights all the more savagely to prove their merit. Clad in barbed and segmented armour, wielding vicious splinter weaponry or potent armaments tailored to butcher infantry or annihilate enemy armour, they form the dark heart of many realspace raids.",
    "profiles": [
      {
        "name": "Kabalite Warriors",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Blaster",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Dark lance",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Shredder",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter rifle",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Sadistic Raiders (Pain)",
        "text": "In your Shooting phase or the Fight phase, when you select this unit to shoot or fight, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, you can re-roll the Wound roll instead."
      },
      {
        "name": "Cruel Enforcers",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Kabalite Icon",
        "text": "While the bearer’s unit is not Battle-shocked, add 1 to the bearer’s Objective Control characteristic."
      },
      {
        "name": "Phantasm Grenade Launcher",
        "text": "The bearer’s unit has the Smoke and Grenades keywords."
      }
    ],
    "composition": [
      "1 Sybarite",
      "9 Kabalite Warriors"
    ],
    "loadout": "**Every model is equipped with:** splinter rifle; close combat weapon.",
    "options": [
      "The Sybarite’s close combat weapon can be replaced with 1 power weapon.",
      "The Sybarite can be equipped with one of the following:\n▪ 1 Kabalite icon\n▪ 1 phantasm grenade launcher",
      "The Sybarite’s splinter rifle can be replaced with one of the following:\n▪ 1 blast pistol\n▪ 1 splinter pistol",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 blaster.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 dark lance.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 shredder.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 splinter cannon."
    ],
    "keywords": [
      "Infantry",
      "Kabal",
      "Battleline",
      "Aeldari",
      "Kabalite Warriors"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "lady-malys",
    "name": "Lady Malys",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Few galactic war leaders can match Lady Malys’ intellect or her talent for weaving complex strategic webs around her foes. Whatever schemes her enemies may have, Malys has already foreseen and put contingencies in place, leaving opponents reeling in confusion and easy prey for her flickering blades.",
    "profiles": [
      {
        "name": "Lady Malys",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Lady’s Blade",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Razor fan",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Archon of the Poisoned Tongue (Pain)",
        "text": "In your Shooting phase or the Fight phase, when you select this model’s\nunit to shoot or fight, you can spend 1 Pain token to Empower that unit. If you do, select one of the following abilities: [SUSTAINED HITS 1]; [LETHAL HITS]. Until the end of the phase, while that unit is Empowered, weapons equipped by models in that unit have that selected ability."
      },
      {
        "name": "Precognisant",
        "text": "If your army includes this model, after both players have deployed their armies, select up to three Drukhari units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves."
      },
      {
        "name": "Mind Like a Steel Trap",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "composition": [
      "1 Lady Malys – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Lady’s Blade; razor fan.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hand of the Archon",
        "Incubi",
        "Kabalite Warriors"
      ]
    },
    "keywords": [
      "Lady Malys",
      "Epic Hero",
      "Archon",
      "Character",
      "Kabal",
      "Infantry",
      "Aeldari"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "lelith-hesperax",
    "name": "Lelith Hesperax",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Lelith Hesperax is the undisputed queen of the Commorrite arenas, a warrior capable of felling the mightiest armoured foes and most monstrous beasts with a pair of simple - if beautifully balanced - knives. Hesperax makes a spectacle of her every battle, dancing and weaving around her victims with mocking ease as she builds to a spectacularly gory crescendo.",
    "profiles": [
      {
        "name": "Lelith Hesperax",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Lelith’s blades",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PRECISION",
          "SUSTAINED HITS 2"
        ],
        "a": "8",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Fights First, Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Brides of Death (Pain)",
        "text": "In the Fight phase, when you select this model’s unit to fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes a melee attack, improve the Strength and Armour Penetration characteristics of that attack by 1."
      },
      {
        "name": "Blur of Blades",
        "text": "While this model is leading a unit, models in that unit have the Fights First ability."
      },
      {
        "name": "Thrilling Spectacle",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, this model has a 3+ invulnerable save and change the Attacks characteristic of melee weapons equipped by this model to 12."
      }
    ],
    "composition": [
      "1 Lelith Hesperax – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Lelith’s blades.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wyches"
      ]
    },
    "keywords": [
      "Infantry",
      "Wych Cult",
      "Succubus",
      "Lelith Hesperax",
      "Aeldari",
      "Epic Hero",
      "Character"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "mandrakes",
    "name": "Mandrakes",
    "points": [
      {
        "models": 5,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Creatures of midnight horror, crawling through the shadows to slither into the most secure locations, Mandrakes radiate an aura of frigid evil. They can conjure and hurl balefires at will to sear their victims’souls from the inside out, while any who face these ghoulish killers up close are soon hacked down by the blows of grossly outsized razors and vicious torture blades.",
    "profiles": [
      {
        "name": "Mandrakes",
        "m": "8\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Baleblast",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Glimmersteel blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators, Stealth",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Fade Away (Pain)",
        "text": "At the end of your opponent’s Fight phase, if this unit is not within Engagement Range of one or more enemy units, you can spend 1 Pain token to Empower this unit. Each time you do, remove this unit from the battlefield and place it into Strategic Reserves."
      },
      {
        "name": "Shade Weavers",
        "text": "This unit cannot be targeted by ranged attacks unless the attacking model is within 18\"."
      }
    ],
    "composition": [
      "1 Nightfiend",
      "4-9 Mandrakes"
    ],
    "loadout": "**Every model is equipped with:** baleblast; glimmersteel blade.",
    "keywords": [
      "Infantry",
      "Aeldari",
      "Blades for Hire",
      "Mandrakes"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "raider",
    "name": "Raider",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "These swift anti-grav transport barques are employed by kabals, wych cults and haemonculus covens alike for their realspace raids. Streaking through skies like poisoned arrows, Raiders deliver their cargoes of vicious Drukhari into the very heart of the foe before their victims have time to react, providing vicious covering fire as the fighting intensifies.",
    "profiles": [
      {
        "name": "Raider",
        "m": "14\"",
        "t": "8",
        "sv": "4+",
        "w": "10",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dark lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Disintegrator cannon",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Bladevanes and chainsnares",
        "tags": [],
        "a": "D3+3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Firing Deck 11",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Splinter Racks (Pain)",
        "text": "In your Shooting phase, when you select this model to shoot, you can spend 1 Pain token to Empower this model. While Empowered, if one or more units are embarked within this model, each time this model makes an attack with a ranged weapon that has the [ANTI] ability, you can re-roll the Hit roll."
      },
      {
        "name": "Vanguard of the Dark City",
        "text": "At the start of your Command phase, select one of the abilities in the Vanguard of the Dark City section (see below) for this model. Until the start of your next Command phase, this model has that ability."
      }
    ],
    "composition": [
      "1 Raider"
    ],
    "loadout": "**This model is equipped with:** dark lance; bladevanes and chainsnares.",
    "options": [
      "This model’s dark lance can be replaced with 1 disintegrator cannon."
    ],
    "transport": "This model has a transport capacity of 11 Drukhari Infantry models (excluding Jump Pack models).",
    "keywords": [
      "Dedicated Transport",
      "Fly",
      "Aeldari",
      "Raider",
      "Transport",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Large Flying Base",
    "abilitySets": [
      {
        "name": "Vanguard of the Dark City",
        "options": [
          {
            "name": "Masters of the Shadowed Sky",
            "text": "At the end of your Command phase, if this model is within range of an objective marker you control, and if one or more Kabalite Warriors units are embarked within it, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
          },
          {
            "name": "Speed of the Kill",
            "text": "Each time a Wyches unit disembarks from this model (excluding Emergency Disembarkations), models in that WYCHES unit must be set up wholly within 6\" of this model."
          },
          {
            "name": "Visions of Butchery",
            "text": "While one or more Wracks units are embarked within this model, for each WRACKS model embarked within this model, add 1 to the Attacks characteristic of this model’s bladevanes and chainsnares."
          },
          {
            "name": "Aethersails",
            "text": "While one or more Drukhari units are embarked within this model, you can re-roll Advance and Charge rolls made for this model."
          }
        ]
      }
    ]
  },
  {
    "id": "ravager",
    "name": "Ravager",
    "points": [
      {
        "models": 1,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 110,
        "note": "3rd+"
      }
    ],
    "flavor": "Ravager gunships fulfil the role of armoured fire support during Drukhari raids, leveraging their speed and agility to outmanoeuvre the more heavily armoured war engines with which they typically duel. They are mobile assassins, mounting enough firepower to gut enemy tanks and eradicate the foe’s elite warriors before swiftly relocating to new hunting grounds.",
    "profiles": [
      {
        "name": "Ravager",
        "m": "14\"",
        "t": "9",
        "sv": "4+",
        "w": "11",
        "ld": "7+",
        "oc": "3",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dark lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Disintegrator cannon",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Bladevanes",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Agonising Suppression (Pain)",
        "text": "In your Shooting phase, when you select this model to shoot, you can spend 1 Pain token to Empower this model. While Empowered, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      },
      {
        "name": "Eradicate the Foe",
        "text": "Each time this model makes an attack that targets an enemy unit that is at its Starting Strength, you can re-roll the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time it makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Ravager"
    ],
    "loadout": "**This model is equipped with:** 3 dark lances; bladevanes.",
    "options": [
      "Any number of this model’s dark lances can each be replaced with 1 disintegrator cannon."
    ],
    "keywords": [
      "Vehicle",
      "Kabal",
      "Fly",
      "Aeldari",
      "Ravager",
      "Frame"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "razorwing-jetfighter",
    "name": "Razorwing Jetfighter",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "Though agile and capable air superiority craft, the true worth of Razorwing Jetfighters is in ground attack runs. Blurring low over the heads of the foe, they unleash salvoes of missiles whose specialised warheads sow bloody horror. Soon enough, the enemy are left cowering in disarray at the mere threat of another pass by the murderous Razorwings and their sadistic pilots.",
    "profiles": [
      {
        "name": "Razorwing Jetfighter",
        "m": "-",
        "t": "8",
        "sv": "4+",
        "w": "10",
        "ld": "7+",
        "oc": "-",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dark Lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Disintegrator cannon",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Razorwing missiles – monoscythe missiles",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Razorwing missiles – necrotoxin missiles",
        "tags": [
          "ANTI-INFANTRY 2+",
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Razorwing missiles – shatterfield missiles",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin splinter rifle",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bladed wings",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Stealth",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Nowhere to Run (Pain)",
        "text": "In your Shooting phase, when you select this unit to shoot, you can spend 1 Pain token to Empower this unit. While Empowered, after this unit has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks; until the start of your next turn, that enemy unit is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for that unit."
      },
      {
        "name": "Ground-attack Craft",
        "text": "Each time a model in this unit makes a ranged attack that targets an enemy unit (excluding units that can FLY), add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Razorwing Jetfighter"
    ],
    "loadout": "**This model is equipped with:** 2 dark lances; Razorwing missiles; twin splinter rifle; bladed wings.",
    "options": [
      "This model’s 2 dark lances can be replaced with 2 disintegrator cannons.",
      "This model’s twin splinter rifle can be replaced with 1 splinter cannon."
    ],
    "keywords": [
      "Aeldari",
      "Aircraft",
      "Fly",
      "Razorwing Jetfighter",
      "Vehicle"
        ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "reavers",
    "name": "Reavers",
    "points": [
      {
        "models": 3,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "Reaver jetbikes streak across the battlefield with the same speed and agility they display during their lethal races around the Commorrite arenas. Whether jinking around incoming enemy fire, decapitating foes with vicious bladevanes or culling their victims with ferocious firepower, these high-speed killers are lethal in the extreme.",
    "profiles": [
      {
        "name": "Reavers",
        "m": "16\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Blaster",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Heat lance",
        "tags": [
          "ASSAULT",
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter rifle",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bladevanes",
        "tags": [
          "LANCE"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Matchless Swiftness (Pain)",
        "text": "In your Movement phase, when you select this unit to Advance, you can spend 1 Pain token to Empower this unit. While Empowered, each time this unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 8\" to the Move characteristic of models in this unit."
      },
      {
        "name": "Eviscerating Fly-by",
        "text": "Each time this unit ends a Normal or Advance move, you can select one enemy unit (excluding MONSTERS and VEHICLES) that it moved over during that move, then roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cluster Caltrops",
        "text": "Each time you roll to inflict wounds using this unit’s Eviscerating Fly-by ability, you can re-roll one D6 for each model in this unit equipped with cluster caltrops."
      },
      {
        "name": "Grav-talon",
        "text": "The bearer’s melee weapons have an Armour Penetration characteristic of -2 and the [LETHAL HITS] ability."
      }
    ],
    "composition": [
      "1 Arena Champion",
      "2-5 Reavers"
    ],
    "loadout": "**Every model is equipped with:** splinter pistol; splinter rifle; bladevanes.",
    "options": [
      "For every 3 models in this unit, 1 model’s splinter rifle can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 heat lance",
      "For every 3 models in this unit, 1 model can be equipped with one of the following:\n▪ 1 cluster caltrops\n▪ 1 grav-talon"
    ],
    "keywords": [
      "Wych Cult",
      "Reavers",
      "Fly",
      "Mounted",
      "Aeldari"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "scourges-with-heavy-weapons",
    "name": "Scourges with Heavy Weapons",
    "points": [
      {
        "models": 5,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 120,
        "note": "3rd+"
      }
    ],
    "flavor": "Airborne messengers and mercenaries who ride the thermals between Commorragh’s highest spires, Scourges have been bodily modified for winged flight. They wear their grotesque new forms with the same pride that they wield their massive dark lances and splinter cannons, for their combination of speed and firepower renders them invaluable.",
    "profiles": [
      {
        "name": "Scourges",
        "m": "14\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Blaster",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Dark lance",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Haywire blaster",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Heat lance",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "14",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Shardcarbine",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shredder",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Winged Strike (Pain)",
        "text": "In your Shooting phase, when you select this unit to shoot, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes a ranged attack, you can re-roll the Hit roll."
      },
      {
        "name": "Airborne Evasion",
        "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Solarite",
      "4 Scourges"
    ],
    "loadout": "**The Solarite is equipped with:** shardcarbine; close combat weapon.\n\n**Every Scourge is equipped with:** splinter cannon; close combat weapon.",
    "options": [
      "The Solarite’s shardcarbine can be replaced with one of the following:\n▪ 1 blast pistol and 1 power weapon\n▪ 1 splinter pistol and 1 power weapon",
      "Any number of Scourges can each replace their splinter cannon with one of the following:\n▪ 1 blaster\n▪ 1 dark lance\n▪ 1 haywire blaster\n▪ 1 heat lance\n▪ 1 shredder"
    ],
    "keywords": [
      "Scourges with Heavy Weapons",
      "Scourges",
      "Blades for Hire",
      "Jump Pack",
      "Grenades",
      "Fly",
      "Infantry",
      "Aeldari"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "scourges-with-shardcarbines",
    "name": "Scourges with Shardcarbines",
    "points": [
      {
        "models": 5,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 85,
        "note": "3rd+"
      }
    ],
    "flavor": "Some bands of Scourges choose to wield comparatively light but potent firearms. So armed, they swoop down upon the enemy to catch them in savage crossfires and rake them with volley after volley of energy blasts and poisoned shards. Such close-ranged onslaughts demonstrate the Scourges’ prowess and contempt for the foe.",
    "profiles": [
      {
        "name": "Scourges",
        "m": "14\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Blaster",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Shardcarbine",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shredder",
        "tags": [
          "ASSAULT",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Swooping Descent (Pain)",
        "text": "In your Movement phase, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit is set up on the battlefield using the Deep Strike ability, it can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units. When doing so, if this unit is set up within 8\" of one or more enemy units, until the end of the turn, it is not eligible to declare a charge."
      },
      {
        "name": "Murderous Crossfire",
        "text": "After this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly Drukhari unit makes a ranged attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn."
      }
    ],
    "composition": [
      "1 Solarite",
      "4 Scourges"
    ],
    "loadout": "**Every model is equipped with:** shardcarbine; close combat weapon.",
    "options": [
      "The Solarite’s shardcarbine can be replaced with one of the following:\n▪ 1 blast pistol and 1 power weapon\n▪ 1 splinter pistol and 1 power weapon",
      "1 Scourge’s shardcarbine can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 shredder"
    ],
    "keywords": [
      "Fly",
      "Grenades",
      "Jump Pack",
      "Blades for Hire",
      "Scourges",
      "Scourges with Shardcarbines",
      "Aeldari",
      "Infantry"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "succubus",
    "name": "Succubus",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Succubi are the leaders of the wych cults and master combatants of the arena, their warrior artistry as ferociously savage as sublimely graceful. Disdaining heavy armour in favour of lithe agility, they hurl themselves into the teeth of the foe without fear, cutting a murderous path through all who oppose them and indelibly stamping their superiority upon the battle.",
    "profiles": [
      {
        "name": "Succubus",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Archite glaive and agoniser",
        "tags": [
          "ANTI-INFANTRY 3+",
          "PRECISION"
        ],
        "a": "7",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Lithe Agility (Pain)",
        "text": "In your Movement phase when you select this model’s unit to Advance, or in your Charge phase before you make a Charge roll for this model’s unit, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, you can re-roll Advance and Charge rolls made for that unit."
      },
      {
        "name": "Storm of Blades",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Bloody Spectacle",
        "text": "Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model’s unit destroys a CHARACTER model, you gain 1CP."
      }
    ],
    "composition": [
      "1 Succubus"
    ],
    "loadout": "**This model is equipped with:** Archite glaive and agoniser.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wyches"
      ]
    },
    "keywords": [
      "Character",
      "Aeldari",
      "Succubus",
      "Infantry",
      "Wych Cult"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "talos",
    "name": "Talos",
    "points": [
      {
        "models": 1,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 85,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "The Talos Pain Engine is a ghoulish melding of stitch-puckered flesh and armoured artifice, boasting tremendous resilience and a nightmarish array of weaponry. Each is the proud creation of the Drukhari Haemonculi, who employ their Talos as torture devices, surgical assistants and armoured murder machines.",
    "profiles": [
      {
        "name": "Talos",
        "m": "7\"",
        "t": "7",
        "sv": "3+",
        "w": "7",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Stinger pod",
        "tags": [],
        "range": "24\"",
        "a": "2D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin haywire blaster",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin heat lance",
        "tags": [
          "ASSAULT",
          "MELTA 3",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin liquifier gun",
        "tags": [
          "ANTI-INFANTRY 3+",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chain flails",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Macro-scalpel",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Talos gauntlet",
        "tags": [],
        "a": "5",
        "ws": "4+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Talos ichor injector",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 5+",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Mindless Killing Machines (Pain)",
        "text": "At the start of the Fight phase, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 2+, do not remove it from play; that destroyed model can fight after the attacking unit has finished making its attacks, and it is then removed from play."
      },
      {
        "name": "Devoted to Pain",
        "text": "If a model in this unit is equipped with 2 macro-scalpels, those weapons have the [TWIN-LINKED] ability."
      },
      {
        "name": "Torture Device",
        "text": "Each time this unit destroys an enemy unit, you gain 1 additional Pain token."
      }
    ],
    "composition": [
      "1-2 Talos"
    ],
    "loadout": "**Every model is equipped with:** twin splinter cannon; 2 macro-scalpels.",
    "options": [
      "Any number of models can each replace their twin splinter cannon with one of the following:\n▪ 1 stinger pod\n▪ 1 twin haywire blaster\n▪ 1 twin heat lance",
      "Any number of models can each replace one of their macro-scalpels with one of the following:\n▪ 1 Talos ichor injector\n▪ 1 twin liquifier gun",
      "Any number of models can each replace one of their macro-scalpels with one of the following:\n▪ 1 chain flails\n▪ 1 Talos gauntlet"
    ],
    "keywords": [
      "Talos",
      "Aeldari",
      "Fly",
      "Monster",
      "Haemonculus Covens"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "venom",
    "name": "Venom",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Raw speed delivers countless Venom transports to the heart of the enemy’s defence and sees them chase down stragglers and encircle the foe’s outriders. For the clique of warriors on board, Venoms are mobile firebases and gore-splashed chariots in one, with flickering shields that confound attempts to bring them down.",
    "profiles": [
      {
        "name": "Venom",
        "m": "14\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "7+",
        "oc": "1",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Splinter cannon",
        "tags": [
          "ANTI-INFANTRY 3+",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin splinter rifle",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bladevanes",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike, Firing Deck 6, Stealth",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Rapid Deployment (Pain)",
        "text": "In your Movement phase, when you select this model to Advance, you can spend 1 Pain token to Empower this model. While Empowered, units can disembark from this model after it has Advanced. Units that do so count as having made a Normal move that phase, and cannot declare a charge in the same turn, but can otherwise act normally in the remainder of the turn."
      },
      {
        "name": "Aerialists",
        "text": "At the end of the Fight phase, if there are no models currently embarked within this TRANSPORT, you can select one friendly Drukhari Infantry unit that has 6 or fewer models that is wholly within 6\" of this TRANSPORT (you cannot select a unit that can Fly). Unless that unit is within Engagement Range of one or more enemy units, it can embark within this TRANSPORT. That unit can embark within this TRANSPORT in a turn it disembarked from this TRANSPORT."
      }
    ],
    "composition": [
      "1 Venom"
    ],
    "loadout": "**This model is equipped with:** splinter cannon; twin splinter rifle; bladevanes.",
    "options": [
      "This model’s twin splinter rifle can be replaced with 1 splinter cannon."
    ],
    "transport": "This model has a transport capacity of 6 Drukhari Infantry models (excluding Jump Pack models).\n\nBefore the battle, at the start of the Declare Battle Formations step, you can select one Kabalite Warriors, Hand of the Archon or Wyches unit from your army that has not already been split. If you do, that unit is split into two units, each containing as equal a number of models as possible (when splitting a unit in this way, make a note of which models form each of the two new units). One of these units must start the battle embarked within this model; the other can start the battle embarked within another TRANSPORT, or it can be deployed as a separate unit.",
    "keywords": [
      "Transport",
      "Dedicated Transport",
      "Vehicle",
      "Fly",
      "Aeldari",
      "Venom",
      "Frame"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "voidraven-bomber",
    "name": "Voidraven Bomber",
    "points": [
      {
        "models": 1,
        "points": 245
      }
    ],
    "flavor": "Mounting some of the most powerful guns in the Drukhari arsenal, the Voidraven Bomber’s dark scythes and void lances can crack heavily armoured targets. Yet they pale against the silent aircraft’s primary weapon - the void mine. Once this arcane payload is deployed, the resulting darklight implosion erases all caught within its blast.",
    "profiles": [
      {
        "name": "Voidraven Bomber",
        "m": "-",
        "t": "9",
        "sv": "4+",
        "w": "12",
        "ld": "7+",
        "oc": "-",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Dark scythe",
        "tags": [],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "2"
      },
      {
        "name": "Void lance",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "Voidraven missiles – implosion missiles",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Voidraven missiles – shatterfield missiles",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bladed wings",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Stealth",
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Nowhere to Hide (Pain)",
        "text": "In your Shooting phase, when you select this unit to shoot, you can spend 1 Pain token to Empower this unit. While Empowered, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      },
      {
        "name": "Void Mine",
        "text": "At the end of your opponent’s Fight phase, select one visible enemy model (excluding Lone Operative units) within 24\" of this unit, and roll one D6 for each enemy unit within D6\" of that model: For each 4+, that enemy unit suffers D6 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Voidraven Bomber"
    ],
    "loadout": "**This model is equipped with:** 2 void lances; bladed wings.",
    "options": [
      "This model can be equipped with 1 Voidraven missiles.",
      "This model’s 2 void lances can be replaced with 2 dark scythes."
    ],
    "keywords": [
      "Aeldari",
      "Aircraft",
      "Fly",
      "Vehicle",
      "Voidraven Bomber"
        ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "wracks",
    "name": "Wracks",
    "points": [
      {
        "models": 5,
        "points": 60
      },
      {
        "models": 8,
        "points": 100
      },
      {
        "models": 10,
        "points": 120
      }
    ],
    "flavor": "The gnarled hide of the Wracks is a leathery mass of old scars, inured to pain. These adepts of fleshcrafting serve the wizened masters of the covens and are as much experiments in stitch and sinew as apprentices to the Haemonculus’ gruesome craft. They are granted a host of cruel tools, butchering blades and arcane bioweapons with which they inflict maximum agony.",
    "profiles": [
      {
        "name": "Wracks",
        "m": "7\"",
        "t": "4",
        "sv": "5+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Hexrifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Liquifier gun",
        "tags": [
          "ANTI-INFANTRY 3+",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Ossefactor",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Stinger pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Torturer’s tool",
        "tags": [
          "ANTI-INFANTRY 4+"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin torturer’s tools",
        "tags": [
          "ANTI-INFANTRY 4+",
          "TWIN-LINKED"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Experimental Enhancements (Pain)",
        "text": "In the Fight phase, when you select this unit to fight, you can spend 1 Pain token to Empower this unit. Each time you do, select one of the following to apply to this unit until the end of the phase:\n▪ Melee weapons equipped by non-CHARACTER models in this unit have an Attacks characteristic of 3.\n▪ Melee weapons equipped by non-CHARACTER models in this unit have an Attacks characteristic of 4 and the [HAZARDOUS] ability."
      },
      {
        "name": "Torturer’s Craft",
        "text": "In your Shooting phase and the Fight phase, after this unit has shot or fought, select one enemy unit (excluding VEHICLES) hit by one or more of those attacks. That unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Acothyst",
      "4-9 Wracks"
    ],
    "loadout": "**Every model is equipped with:** twin torturer’s tools.",
    "options": [
      "For every 5 models in this unit:\n▪ 1 model’s twin torturer’s tools can be replaced with 1 hexrifle and 1 torturer’s tool\n▪ 1 model’s twin torturer’s tools can be replaced with 1 liquifier gun and 1 torturer’s tool\n▪ 1 model’s twin torturer’s tools can be replaced with 1 ossefactor and 1 torturer’s tool\n▪ 1 model’s twin torturer’s tools can be replaced with 1 stinger pistol and 1 torturer’s tool",
      "The Acothyst’s twin torturer’s tools can be replaced with 1 power weapon and 1 torturer’s tool.",
      "If the Acothyst is not equipped with a power weapon, its torturer’s tool can be replaced with 1 power weapon."
    ],
    "keywords": [
      "Wracks",
      "Aeldari",
      "Haemonculus Covens",
      "Battleline",
      "Infantry"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "wyches",
    "name": "Wyches",
    "points": [
      {
        "models": 10,
        "points": 90
      }
    ],
    "flavor": "Wyches are gladiatorial murder artists who exhibit their incredible skills to slay with precision and élan. Used to corralling wild beasts in the arenas, their assaults are so swift and overwhelming that enemies often find themselves encircled by Wyches who have weaved through or sprung over their ranks to trap them in a rapidly tightening noose of blades.",
    "profiles": [
      {
        "name": "Wyches",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "6+",
        "invNote": "* 4+ against melee attacks"
      }
    ],
    "ranged": [
      {
        "name": "Blast pistol",
        "tags": [
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
        "name": "Splinter pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gladiatorial weapons",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Hekatarii blade",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "5",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Power from Pain",
    "abilities": [
      {
        "name": "Acrobatic Gladiators (Pain)",
        "text": "At the start of your Charge phase, you can spend 1 Pain token to Empower this unit. While Empowered, this unit is eligible to declare a charge in a turn in which it Advanced or Fell Back."
      },
      {
        "name": "No Escape",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of one or more units from your army with this ability Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests."
      }
    ],
    "composition": [
      "1 Hekatrix",
      "9 Wyches"
    ],
    "loadout": "**Every model is equipped with:** splinter pistol; Hekatarii blade.",
    "options": [
      "The Hekatrix’s splinter pistol can be replaced with 1 blast pistol.",
      "The Hekatrix’s Hekatarii blade can be replaced with 1 power weapon.",
      "Up to 3 Wyches can each have their splinter pistol and Hekatarii blade replaced with 1 gladiatorial weapons."
    ],
    "keywords": [
      "Grenades",
      "Wyches",
      "Infantry",
      "Battleline",
      "Wych Cult",
      "Aeldari"
    ],
    "factionKeywords": [
      "Drukhari"
    ],
    "baseSize": "25mm"
  }
]
