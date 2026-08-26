// Aeldari — datasheets. Unit roster and points from src/data/mfm/aeldari.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "asurmen",
    "name": "Asurmen",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Asurmen’s skill at war is breathtaking, the magnitude of his heroic presence so great that nearby Aspect Warriors are infused with his peerless tactical acumen. In addition to the wrist-mounted shuriken catapults known as the Bloody Twins, he carries the Sword of Asur, whose hilt bears the spirit stone of Asurmen’s brother, Tethesis.",
    "profiles": [
      {
        "name": "Asurmen",
        "m": "7\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bloody Twins",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Sword of Asur",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Tactical Acumen",
        "text": "While this model is leading a unit, in your Shooting phase, after that unit has shot, it can make a Normal move of up to 6\". If it does, until the end of the turn, that unit is not eligible to declare a charge."
      },
      {
        "name": "Hand of Asuryan",
        "text": "Once per battle, when this model is selected to shoot, it can use this ability. If it does, until the end of the phase, its Bloody Twins weapon has a Damage characteristic of 3 and the [ANTI-INFANTRY 5+] and [DEVASTATING WOUNDS] abilities."
      }
    ],
    "composition": [
      "1 Asurmen – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Bloody Twins; Sword of Asur.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Dire Avengers"
      ]
    },
    "keywords": [
      "Grenades",
      "Aeldari",
      "Epic Hero",
      "Character",
      "Infantry",
      "Asurmen",
      "Phoenix Lord",
      "Aspect Warrior"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "autarch",
    "name": "Autarch",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Autarchs are legendary for their strategic brilliance, sublime martial skill and indomitable strength of will. Long have they trodden the Path of the Warrior, never once slipping into the trap of obsession. Instead, they apply all that they have learned and mastered to their command of the Asuryani warhosts.",
    "profiles": [
      {
        "name": "Autarch",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Death spinner",
        "tags": [
          "IGNORES COVER",
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
        "name": "Dragon fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 3"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Dragon fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 3",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Reaper launcher – starshot",
        "tags": [
          "HEAVY",
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaper launcher – starswarm",
        "tags": [
          "HEAVY",
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Banshee blade",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Scorpion chainsword",
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
        "name": "Star glaive",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Superlative Strategist",
        "text": "While this model is leading a unit, you can re-roll Advance rolls made for that unit, and you can re-roll any rolls made for that unit while it is performing an Agile Manoeuvre."
      },
      {
        "name": "Path of Command",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      }
    ],
    "specialAbilities": [
      {
        "name": "ASPECT TRAINING",
        "text": "▪ While this model is leading a Howling Banshees unit, it has the Fights First ability.\n▪ While this model is leading a Striking Scorpions unit, it has the Infiltrators, Scouts 7\" and Stealth abilities."
      }
    ],
    "composition": [
      "1 Autarch"
    ],
    "loadout": "**This model is equipped with:** shuriken pistol; star glaive.",
    "options": [
      "This model’s shuriken pistol can be replaced with one of the following:\n▪ 1 death spinner\n▪ 1 Dragon fusion gun\n▪ 1 Dragon fusion pistol\n▪ 1 Reaper launcher",
      "This model’s star glaive can be replaced with one of the following:\n▪ 1 Banshee blade\n▪ 1 Scorpion chainsword"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Striking Scorpions",
        "Storm Guardians",
        "Howling Banshees",
        "Guardian Defenders",
        "Fire Dragons",
        "Dire Avengers",
        "Dark Reapers"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Aeldari",
      "Grenades",
      "Autarch"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "autarch-wayleaper",
    "name": "Autarch Wayleaper",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "With wargear such as a winged pack or warp jump generator, an Autarch becomes an incredibly manoeuvrable war leader. So equipped, they can appear wherever their war host needs them in the blink of an eye, bringing graceful weaponry and consummate strategy to bear before vanishing out of the foe’s reach.",
    "profiles": [
      {
        "name": "Autarch Wayleaper",
        "m": "14\"",
        "t": "3",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Death spinner",
        "tags": [
          "IGNORES COVER",
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
        "name": "Dragon fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 3"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Dragon fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 3",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Reaper launcher – starshot",
        "tags": [
          "HEAVY",
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaper launcher – starswarm",
        "tags": [
          "HEAVY",
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Banshee blade",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Scorpion chainsword",
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
        "name": "Star glaive",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Indomitable Strength of Will",
        "text": "While this model is leading a unit, each time you spend a Battle Focus token to enable that unit to perform an Agile Manoeuvre, roll one D6: on a 3+, you gain 1 Battle Focus token."
      },
      {
        "name": "Path of Command",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      }
    ],
    "composition": [
      "1 Autarch Wayleaper"
    ],
    "loadout": "**This model is equipped with:** shuriken pistol; star glaive.",
    "options": [
      "This model’s shuriken pistol can be replaced with one of the following:\n▪ 1 death spinner\n▪ 1 Dragon fusion gun\n▪ 1 Dragon fusion pistol\n▪ 1 Reaper launcher",
      "This model’s star glaive can be replaced with one of the following:\n▪ 1 Banshee blade\n▪ 1 Scorpion chainsword"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Swooping Hawks",
        "Warp Spiders"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Aeldari",
      "Jump Pack",
      "Fly",
      "Grenades",
      "Autarch Wayleaper"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "avatar-of-khaine",
    "name": "Avatar of Khaine",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "flavor": "The Avatar of Khaine is an ancient war deity incarnate, whose mere presence incites merciless rage in the Asuryani around him. In battle, the Avatar marches through enemy fire without breaking stride, laughing cruelly as his weapon – the Wailing Doom – tastes hot flesh and spurting lifeblood with each swing and thrust.",
    "profiles": [
      {
        "name": "Avatar of Khaine",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "14",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "The Wailing Doom",
        "tags": [
          "SUSTAINED HITS D3"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "16",
        "ap": "-4",
        "d": "D6+2"
      }
    ],
    "melee": [
      {
        "name": "The Wailing Doom – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "16",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "The Wailing Doom – sweep",
        "tags": [],
        "a": "12",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Molten Form",
        "text": "Each time an attack is allocated to this model, halve the Damage characteristic of that attack."
      },
      {
        "name": "The Bloody-Handed (Aura)",
        "text": "While a friendly AELDARI unit is within 6\" of this model, add 1 to Advance and Charge rolls made for that unit."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Avatar of Khaine – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** the Wailing Doom",
    "keywords": [
      "Epic Hero",
      "Aeldari",
      "Daemon",
      "Character",
      "Monster",
      "Avatar of Khaine"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "baharroth",
    "name": "Baharroth",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Baharroth moves with the grace of a zephyr and attacks with the force of a hurricane. He shines with a brilliance of his own making in battle, diving into range, opening fire then peeling away to face his next quarry. At close quarters he strikes with the resplendent Shining Blade, lopping off heads with its elegantly curved edge.",
    "profiles": [
      {
        "name": "Baharroth",
        "m": "14\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Fury of the Tempest",
        "tags": [
          "ASSAULT",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Shining Blade",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Cloudstrider",
        "text": "While this model is leading a unit, at the end of your opponent’s turn, if that unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves. In addition, while this model is leading a unit, when that unit is set up on the battlefield using the Deep Strike ability, in your movement phase, it can use this ability. If it does, that unit can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy models, but until the end of the turn, it is not eligible to declare a charge.’"
      },
      {
        "name": "Cry of the Wind",
        "text": "Each time this model is set up on the battlefield, until the end of the turn, each time this model makes a ranged attack, a successful unmodified Hit roll scores a Critical Hit."
      }
    ],
    "composition": [
      "1 Baharroth – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Fury of the Tempest; Shining Blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Swooping Hawks"
      ]
    },
    "keywords": [
      "Fly",
      "Phoenix Lord",
      "Aspect Warrior",
      "Grenades",
      "Jump Pack",
      "Aeldari",
      "Epic Hero",
      "Character",
      "Infantry",
      "Baharroth"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "clanblade",
    "name": "Clanblade",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "profiles": [
      {
        "name": "Clanblade",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Solar Carbine",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Drakesteed Fangs and Talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Moonblades",
        "tags": [
          "LETHAL HITS",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Blade of the Clans",
        "text": "This unit's melee attacks have [SUSTAINED HITS 1]."
      },
      {
        "name": "Cornered Prey",
        "text": "When an enemy unit engaged with this unit is selected to make a fall-back move, that enemy unit must use the desperate escape mode. If that enemy unit is Battle-shocked, -1 from those hazard rolls."
      }
    ],
    "composition": [
      "1 Clanblade"
    ],
    "loadout": "**This model is equipped with:** Drakesteed Fangs and Talons; Moonblades; Solar Carbine.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Dragon Knights"
      ]
    },
    "keywords": [
      "Aeldari",
      "Character",
      "Exodite",
      "Mobile",
      "Mounted"
    ],
    "factionKeywords": []
  },
  {
    "id": "corsair-skyreavers",
    "name": "Corsair Skyreavers",
    "points": [
      {
        "models": 5,
        "points": 75
      },
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "Equipped with winged jump packs, Corsair Skyreavers are utilised by Anhrathe commanders as mobile shock troops. Leaping recklessly into the fray, they bring to bear an array of dazzling weaponry, relying upon speed, agility and daring to evade incoming strikes and cut their opponents to shreds.",
    "profiles": [
      {
        "name": "Corsair Skyreavers",
        "m": "12\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
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
        "name": "Blast pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Flamer",
        "tags": [
          "ASSAULT",
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
        "name": "Fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
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
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Corsair blade",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Raid and Run",
        "text": "At the end of the Fight phase, if this unit was eligible to fight this phase, if this unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to D3+3\". Otherwise, if this unit was eligible to fight this phase, this unit can make a Fall Back move of up to D3+3\"."
      }
    ],
    "composition": [
      "1 Skyreaver Felarch",
      "4-9 Skyreavers"
    ],
    "loadout": "**Every model is equipped with:** shuriken pistol; Corsair blade.",
    "options": [
      "The Skyreaver Felarch can replace its shuriken pistol with one of the following:\n▪ 1 blast pistol\n▪ 1 neuro disruptor",
      "For every 5 models in the unit, up to 2 Skyreaver models can each have their shuriken pistol and Corsair blade replaced with one of the following*:\n▪ 1 blaster and 1 close combat weapon\n▪ 1 flamer and 1 close combat weapon\n▪ 1 fusion gun and 1 close combat weapon\n▪ 1 shredder and 1 close combat weapon\n* You cannot select the same option more than once per unit unless it contains 10 models, in which case you cannot select the same weapon more than twice per unit.",
      "* You cannot select the same option more than once per unit unless it contains 10 models, in which case you cannot select the same weapon more than twice per unit."
    ],
    "keywords": [
      "Infantry",
      "Aeldari",
      "Anhrathe",
      "Jump Pack",
      "Fly",
      "Grenades",
      "Corsair Skyreavers"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "corsair-voidreavers",
    "name": "Corsair Voidreavers",
    "points": [
      {
        "models": 5,
        "points": 65
      },
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "The skilled and agile warriors known as Voidreavers make up the bulk of most Corsair warbands. With precise volleys of lethal shuriken fire they can tear through enemy infantry, or draw their power swords and storm hostile positions to engage in furious hand-to-hand fighting.",
    "profiles": [
      {
        "name": "Corsair Voidreavers",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
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
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
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
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Shuriken rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Wraithcannon",
        "tags": [],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
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
        "name": "Power sword",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Reavers of the Void",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack is within range of an objective marker, you can re-roll the Hit roll instead."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Mistshield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Voidreaver Felarch",
      "4-9 Corsair Voidreavers"
    ],
    "loadout": "**Every model is equipped with:** shuriken pistol; power sword; close combat weapon.",
    "options": [
      "The Voidreaver Felarch’s shuriken pistol can be replaced with one of the following:\n▪ 1 neuro disruptor\n▪ 1 shuriken rifle",
      "The Voidreaver Felarch can be equipped with:\n▪ 1 mistshield",
      "Any number of Corsair Voidreavers in this unit can each have their shuriken pistol and power sword replaced with 1 shuriken rifle.",
      "For every 5 models in this unit, 1 Corsair Voidreaver’s power sword or shuriken rifle can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 shredder",
      "If this unit contains 10 models, 1 Corsair Voidreaver’s shuriken rifle can be replaced with one of the following:\n▪ 1 shuriken cannon\n▪ 1 wraithcannon"
    ],
    "keywords": [
      "Grenades",
      "Infantry",
      "Battleline",
      "Anhrathe",
      "Corsair Voidreavers",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "corsair-voidscarred",
    "name": "Corsair Voidscarred",
    "points": [
      {
        "models": 5,
        "points": 70
      },
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "The Void scarred are veterans hardened by a life of piracy. These Corsairs have travelled the stars for centuries and have seen the worst and the best the galaxy has to offer. Many have developed unique skills and fighting styles and carry specialist wargear into battle over the years.",
    "profiles": [
      {
        "name": "Corsair Voidscarred",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
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
        "name": "Executioner",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Long rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
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
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Shuriken rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Wraithcannon",
        "tags": [],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Paired Hekatarii blades",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power sword",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Witch staff",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "D3"
      }
    ],
    "core": "Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Piratical Raiders",
        "text": "At the start of the battle, select one unit from your opponent’s army. Weapons equipped by models in this unit have the [LETHAL HITS] and [PRECISION] abilities while targeting that unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Channeller Stones",
        "text": "Once per turn, the first time a saving throw is failed for the bearer’s unit, change the Damage characteristic of that attack to 0."
      },
      {
        "name": "Faolchú",
        "text": "Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability."
      },
      {
        "name": "Mistshield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "This unit can contain a maximum of 10 models.",
      "1 Voidscarred Felarch",
      "4-9 Corsair Voidscarred",
      "0-1 Shade Runner",
      "0-1 Soul Weaver",
      "0-1 Way Seeker"
    ],
    "loadout": "**Every Corsair Voidscarred and Voidscarred Felarch is equipped with:** shuriken pistol; power sword; close combat weapon.\n\n**A Shade Runner is equipped with:** shuriken pistol; close combat weapon; paired Hekatarii blades.\n\n**A Soul Weaver is equipped with:** shuriken pistol; power sword; close combat weapon; channeller stones.\n\n**A Way Seeker is equipped with:** shuriken pistol; Executioner; close combat weapon; witch staff.",
    "options": [
      "Any number of Corsair Voidscarred can each have their shuriken pistol and power sword replaced with 1 shuriken rifle.",
      "The Voidscarred Felarch’s shuriken pistol can be replaced with one of the following:\n▪ 1 neuro disruptor\n▪ 1 shuriken rifle",
      "The Voidscarred Felarch can be equipped with 1 mistshield.",
      "For every 5 models in this unit, 1 Corsair  Voidscarred’s shuriken rifle can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 shredder",
      "If this unit contains 10 models, 1 Corsair Voidscarred’s shuriken rifle can be replaced with one of the following:\n▪ 1 shuriken cannon\n▪ 1 wraithcannon",
      "If this unit contains 10 models, 1 Corsair Voidscarred’s shuriken rifle can be replaced with 1 long rifle.",
      "If this unit contains 10 models, 1 Corsair Voidscarred’s power sword can be  replaced with 1 fusion pistol.",
      "1 Corsair Voidscarred model equipped with a shuriken pistol and power sword can be equipped with 1 Faolchú."
    ],
    "keywords": [
      "Grenades",
      "Aeldari",
      "Infantry",
      "Psyker",
      "Corsair Voidscarred",
      "Anhrathe"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "crimson-hunter",
    "name": "Crimson Hunter",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Crimson Hunters are the sublime pilots of formidable airborne fighters with armaments dedicated to aerial interdiction. With superhuman reflexes they hunt down and destroy enemy aircraft with sickening ease, their skills honed by nightly training sorties with those of their Aspect Shrine.",
    "profiles": [
      {
        "name": "Crimson Hunter",
        "m": "-",
        "t": "8",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "-",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Pulse laser",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "abilities": [
      {
        "name": "Skyhunter",
        "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Crimson Hunter"
    ],
    "loadout": "**This model is equipped with:** 2 starcannons; pulse laser; wraithbone hull.",
    "options": [
      "This model’s 2 starcannons can be replaced with 2 bright lances."
    ],
    "keywords": [
      "Fly",
      "Aeldari",
      "Aircraft",
      "Aspect Warrior",
      "Crimson Hunter",
      "Vehicle"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "d-cannon-platform",
    "name": "D-cannon Platform",
    "points": [
      {
        "models": 1,
        "points": 110,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 125,
        "note": "2nd+"
      }
    ],
    "flavor": "Whether deployed as grav-platform artillery or attached to formations of Guardians, D-Cannon Platforms provide ferocious mid- to close-range fire support. Their blasts punch through the veil between realspace and the Empyrean, creating localised but spectacularly lethal warp singularities that can swallow victims whole or gouge catastrophic wounds in larger targets.",
    "profiles": [
      {
        "name": "D-cannon Platform",
        "m": "7\"",
        "t": "6",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "D-cannon",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS",
          "INDIRECT FIRE"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "Shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
      }
    ],
    "abilities": [
      {
        "name": "Support Weapon",
        "text": "Each time an attack targets this model’s unit, if that unit contains one or more other models, until that attack is resolved, this model has a Toughness characteristic of 3."
      },
      {
        "name": "Structural Collapse",
        "text": "Each time this model makes an attack with its D-cannon, re-roll a Damage roll of 1. If that attack targets a TITANIC unit, you can re-roll the Damage roll instead."
      }
    ],
    "specialAbilities": [
      {
        "name": "SUPPORT ARTILLERY",
        "text": "At the start of the Declare Battle Formations step, this model can join one Guardian Defenders unit from your army (a unit cannot have more than one Support Weapon model joined to it). This model then counts as part of that GUARDIANS unit for the rest of the battle, and that unit’s Starting Strength is increased accordingly.\n\nThis model, and any unit it is joined to, cannot embark within a Transport."
      }
    ],
    "composition": [
      "1 D-cannon Platform"
    ],
    "loadout": "**This model is equipped with:** D-cannon; shuriken catapult; close combat weapon.",
    "keywords": [
      "D-cannon Platform",
      "Infantry",
      "Aeldari",
      "Support Weapon",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "dark-reapers",
    "name": "Dark Reapers",
    "points": [
      {
        "models": 5,
        "points": 95
      },
      {
        "models": 10,
        "points": 200
      }
    ],
    "flavor": "Dark Reapers unleash firestorms with their long-ranged Reaper launchers, whether using infantry-shredding starswarm missiles or armour-piercing starshot variants. These salvoes are chillingly accurate, thanks to advanced targeting systems but also the Reapers’ armour, which anchors them firmly to the ground while they fire.",
    "profiles": [
      {
        "name": "DARK REAPER",
        "m": "6\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      },
      {
        "name": "DARK REAPER EXARCH",
        "m": "6\"",
        "t": "3",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      }
    ],
    "ranged": [
      {
        "name": "Missile launcher – starshot",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST",
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Reaper launcher – starshot",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Reaper launcher – starswarm",
        "tags": [
          "IGNORES COVER"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "IGNORES COVER",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Tempest launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Inescapable Accuracy",
        "text": "Each time a model in this unit makes a ranged attack, you can ignore any or all modifiers to that attack’s Ballistic Skill characteristic and to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Dark Reaper Exarch",
      "4-9 Dark Reapers"
    ],
    "loadout": "**Every model is equipped with:** Reaper launcher; close combat weapon.",
    "options": [
      "The Dark Reaper Exarch’s Reaper launcher can be replaced with 1 of the following:\n▪ 1 missile launcher\n▪ 1 shuriken cannon\n▪ 1 tempest launcher",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Infantry",
      "Aspect Warriors",
      "Dark Reapers",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "death-jester",
    "name": "Death Jester",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "A hissing storm of shrieker cannon fire announces the arrival of a Death Jester upon the battlefield. Enemy infantry are torn apart in sprays of blood and scalded flesh as the weapon’s gene-toxins cause them to combust horrifically from within. Adding insult to injury, the Death Jester ensures every demise is as cruelly ironic as possible.",
    "profiles": [
      {
        "name": "Death Jester",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Shrieker cannon",
        "tags": [],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Jester’s blade",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Lone Operative",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Death is Not Enough",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks. That enemy unit must take a Battle-shock test. If one or more of those attacks destroyed a model in that enemy unit, subtract 1 from that test."
      },
      {
        "name": "Cruel Amusement",
        "text": "In your Shooting phase, each time this model is selected to shoot, select one of the abilities below. Until the end of the phase, this model’s shrieker cannon has that ability.\n▪ [IGNORES COVER]\n▪ [PRECISION]\n▪ [SUSTAINED HITS 3]"
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flip Belt",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      }
    ],
    "specialAbilities": [
      {
        "name": "TRAVELLING PLAYERS",
        "text": "Unless otherwise stated, you cannot include more than one of this model in your army."
      }
    ],
    "composition": [
      "1 Death Jester"
    ],
    "loadout": "**This model is equipped with:** shrieker cannon; Jester’s blade; flip belt.",
    "keywords": [
      "Infantry",
      "Character",
      "Aeldari",
      "Death Jester"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "dire-avengers",
    "name": "Dire Avengers",
    "points": [
      {
        "models": 5,
        "points": 70
      },
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "Furious in attack and immovable in defence, Dire Avengers wield Avenger catapults that unleash punishing bursts of monomolecular shurikens. Drawing on their faultless battle instincts, they always know when to launch lightning-fast assaults and when to fall back and draw the enemy into a kill zone.",
    "profiles": [
      {
        "name": "DIRE AVENGER",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      },
      {
        "name": "DIRE AVENGER EXARCH",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      }
    ],
    "ranged": [
      {
        "name": "Avenger shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Diresword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power glaive",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-3",
        "d": "1"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Bladestorm",
        "text": "Ranged weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability while targeting an enemy unit within half range."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Shimmershield",
        "text": "The bearer has a 4+ invulnerable save."
      },
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Dire Avenger Exarch",
      "4-9 Dire Avengers"
    ],
    "loadout": "**Every model is equipped with:** Avenger shuriken catapult; close combat weapon.",
    "options": [
      "The Dire Avenger Exarch’s Avenger shuriken catapult can be replaced with 1 shuriken pistol and one of the following:\n▪ 1 diresword\n▪ 1 power glaive",
      "If this unit’s Dire Avenger Exarch is equipped with 1 Avenger shuriken catapult, it can be equipped with 1 additional Avenger shuriken catapult.",
      "The Dire Avenger Exarch’s shuriken pistol can be replaced with 1 shimmershield.",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Aspect Warriors",
      "Grenades",
      "Infantry",
      "Dire Avengers",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "dragon-knights",
    "name": "Dragon Knights",
    "points": [
      {
        "models": 3,
        "points": 90
      },
      {
        "models": 6,
        "points": 180
      }
    ],
    "profiles": [
      {
        "name": "Dragon Knight",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2"
      },
      {
        "name": "Dragon Knight Leader",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Laser Lance",
        "tags": [
          "ASSAULT"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Solar Carbine",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Drakesteed Fangs and Talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Laser Lance",
        "tags": [
          "LANCE"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "On the Hunt",
        "text": "When this unit is selected to make a fall-back move, that fall-back move does not prevent this unit from being eligible to shoot and eligible to declare a charge."
      },
      {
        "name": "Agile Reach",
        "text": "When this unit is selected to fight, melee weapons equipped by unengaged models in this unit that are within 3\" of an enemy unit that is engaged with this unit can target that enemy unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Drakolithe",
        "text": "When an enemy unit ends a move within 8\" of this unit, if this unit is unengaged or if that enemy unit ended that move engaged with this unit, you can use this ability. If you do, roll one D6:\n▪ On a 3+, that enemy unit suffers 1 mortal wound. Place one Drakolithe token next to the unit for each Drakolithe the unit is equipped with, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Dragon Knight Leader",
      "2-5 Dragon Knights"
    ],
    "loadout": "**Every model is equipped with:** Drakesteed Fangs and Talons; Laser Lance; Solar Carbine.",
    "options": [
      "For every 3 models in this unit, this unit can be equipped with 2 Drakolithe."
    ],
    "keywords": [
      "Aeldari",
      "Exodite",
      "Mobile",
      "Mounted"
    ],
    "factionKeywords": []
  },
  {
    "id": "eldrad-ulthran",
    "name": "Eldrad Ulthran",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "One of the most potent Aeldari psykers ever to have lived, when Eldrad Ulthran takes to the field his enemies’ plans are already known to him. Such is Eldrad’s psychic might that he can break Titans and banish the mightiest of daemons, and over the millennia he has slain kings and champions beyond number.",
    "profiles": [
      {
        "name": "Eldrad Ulthran",
        "m": "7\"",
        "t": "4",
        "sv": "6+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Mind War",
        "tags": [
          "ANTI-CHARACTER 4+",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "The Staff of Ulthamar and witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Diviner of Futures",
        "text": "At the start of your Command phase, if this model is on the battlefield, you gain 1CP."
      },
      {
        "name": "Doom (Psychic)",
        "text": "At the end of your Movement phase, select one enemy unit within 18\" of and visible to this model. Until the start of your next Command phase, each time a friendly AELDARI model makes an attack that targets that enemy unit, add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1 Eldrad Ulthran – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Mind War; shuriken pistol; Staff of Ulthamar and witchblade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Storm Guardians",
        "Guardian Defenders"
      ]
    },
    "keywords": [
      "Infantry",
      "Epic Hero",
      "Aeldari",
      "Psyker",
      "Farseer",
      "Eldrad Ulthran",
      "Character"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "falcon",
    "name": "Falcon",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "The primary battle tanks of the Asuryam, Falcons mount a diverse array of potent weapons that make them the bane of war machines and foot troops alike. They also boast a transport pod, in which small squads of warriors can be borne to wherever their martial prowess is most needed on the battlefield.",
    "profiles": [
      {
        "name": "Falcon",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Missile launcher – starshot",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Pulse laser",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Falcon"
    ],
    "loadout": "**This model is equipped with:** pulse laser; scatter laser; twin shuriken catapult; wraithbone hull.",
    "options": [
      "This model’s scatter laser can be replaced with one of the following:\n▪ 1 missile launcher\n▪ 1 bright lance\n▪ 1 shuriken cannon\n▪ 1 starcannon",
      "This model’s twin shuriken catapult can be replaced with 1 shuriken cannon."
    ],
    "transport": "This model has a transport capacity of 6 AELDARI INFANTRY models. Each WRAITH CONSTRUCT model takes the space of 2 models. It cannot transport JUMP PACK models or YNNARI models (excluding ASURYANI, YVRAINE and THE VISARCH models).",
    "keywords": [
      "Transport",
      "Fly",
      "Falcon",
      "Vehicle",
      "Aeldari",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "farseer",
    "name": "Farseer",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "The Asuryani look to their Farseers for leadership in battle. These psykers can uncover the foe’s intentions and calculate the effects of attacks. Their minds are their true weapons; with a thought, they can obliterate the memories of enemy commanders, hurl battle tanks into the air or summon terrifying storms of coruscating eldritch energy.",
    "profiles": [
      {
        "name": "Farseer",
        "m": "7\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Eldritch Storm",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Singing spear",
        "tags": [
          "ASSAULT",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "9",
        "ap": "0",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Singing spear",
        "tags": [
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Branching Fates (Psychic)",
        "text": "While this model is leading a unit, once per phase, you can change the result of one Hit roll, one Wound roll or one Damage roll made for a model in that unit (excluding Support Weapon models) to an unmodified 6."
      },
      {
        "name": "Guide (Psychic)",
        "text": "At the end of your Movement phase, select one enemy unit within 18\" of and visible to this model. Until the start of your next Command phase, each time a friendly AELDARI model makes an attack that targets that enemy unit, add 1 to the Hit roll. Each unit can only be selected for this ability once per turn."
      }
    ],
    "composition": [
      "1 Farseer"
    ],
    "loadout": "**This model is equipped with:** Eldritch Storm; shuriken pistol; witchblade.",
    "options": [
      "This model’s witchblade can be replaced with 1 singing spear."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Storm Guardians",
        "Guardian Defenders"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Aeldari",
      "Psyker",
      "Farseer"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "farseer-skyrunner",
    "name": "Farseer Skyrunner",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Farseers are expert combatants as well as battle seers. Their semi-sentient witchblades and singing spears are embedded with crystals that transmit the destructive potential of their bearer’s psyche. In battle, they flow around weapon blasts and blade thrusts with a natural grace that makes their foes seem predictable and slow.",
    "profiles": [
      {
        "name": "Farseer Skyrunner",
        "m": "14\"",
        "t": "4",
        "sv": "6+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Eldritch Storm",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Singing spear",
        "tags": [
          "ASSAULT",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Singing spear",
        "tags": [
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Branching Fates (Psychic)",
        "text": "While this model is leading a unit, once per phase, you can change the result of one Hit roll, one Wound roll or one Damage roll made for a model in that unit to an unmodified 6."
      },
      {
        "name": "Misfortune (Psychic)",
        "text": "At the end of your Movement phase, select one enemy unit within 18\" of and visible to this model. Until the start of your next Command phase, each time a model in that unit makes an attack, subtract 1 from the Wound roll. Each unit can only be selected for this ability once per turn."
      }
    ],
    "composition": [
      "1 Farseer Skyrunner"
    ],
    "loadout": "**This model is equipped with:** Eldritch Storm; shuriken pistol; twin shuriken catapult; witchblade.",
    "options": [
      "This model’s witchblade can be replaced with 1 singing spear."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Warlock Skyrunners",
        "Windriders"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Farseer Skyrunner",
      "Aeldari",
      "Fly",
      "Psyker",
      "Farseer"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "fire-dragons",
    "name": "Fire Dragons",
    "points": [
      {
        "models": 5,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 240,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 250,
        "note": "3rd+"
      }
    ],
    "flavor": "Fire Dragons are aggressive and warlike, seeking nothing less than the total annihilation of the enemy’s redoubts and war machines. They can identify the weak points of a target with a mere glance, then swiftly reduce them to molten liquid with their fusion guns.",
    "profiles": [
      {
        "name": "FIRE DRAGON",
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
        "name": "FIRE DRAGON EXARCH",
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
    "ranged": [
      {
        "name": "Dragon fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 3"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Dragon fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 3",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Dragon’s breath flamer",
        "tags": [
          "ASSAULT",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+2",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Exarch’s Dragon fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 6"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Firepike",
        "tags": [
          "ASSAULT",
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
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
        "name": "Dragon axe",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Assured Destruction",
        "text": "In your Shooting phase, each time a model in this unit makes a ranged attack that targets a MONSTER or VEHICLE unit, you can re-roll the Hit roll, you can re-roll the Wound roll and you can re-roll the Damage roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Fire Dragon Exarch",
      "4-9 Fire Dragons"
    ],
    "loadout": "**The Fire Dragon Exarch is equipped with:** Exarch’s Dragon fusion gun; close combat weapon.\n\n**Every Fire Dragon is equipped with:** Dragon fusion gun; close combat weapon.",
    "options": [
      "The Fire Dragon Exarch model’s Exarch’s Dragon fusion gun can be replaced with 1 of the following:\n▪ 1 Dragon’s breath flamer\n▪ 1 Dragon fusion pistol and 1 Dragon axe\n▪ 1 firepike",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Fire Dragons",
      "Infantry",
      "Aeldari",
      "Grenades",
      "Aspect Warriors"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "fire-prism",
    "name": "Fire Prism",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "flavor": "The prism cannon of this vehicle is the bane of heavy battle tanks. In its firing process, a laser is discharged into a massive crystal prism that amplifies the shot’s potency. The energy is released in one of two ways – either as thin lances of light to destroy the toughest vehicles, or as a dispersed pulse to slaughter swathes of infantry.",
    "profiles": [
      {
        "name": "Fire Prism",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Prism cannon – dispersed pulse",
        "tags": [
          "BLAST"
        ],
        "range": "60\"",
        "a": "2D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Prism cannon – focused lances",
        "tags": [
          "LINKED FIRE"
        ],
        "range": "60\"",
        "a": "2",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Crystal Matrix",
        "text": "Each time this model is selected to shoot, you can re-roll one Hit roll and you can re-roll one Wound roll when resolving those attacks."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Fire Prism"
    ],
    "loadout": "**This model is equipped with:** prism cannon; twin shuriken catapult; wraithbone hull.",
    "options": [
      "This model’s twin shuriken catapult can be replaced with 1 shuriken cannon."
    ],
    "keywords": [
      "Vehicle",
      "Aeldari",
      "Fire Prism",
      "Fly",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "fuegan",
    "name": "Fuegan",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "flavor": "Fuegan has dedicated himself to the total destruction of the enemies of the Asuryani, and the trail of corpses he has left in his wake spans the galaxy. Those he sets his fiery gaze upon he either eradicates from existence with burning blasts from his firepike, Searsong, or cuts in twain with furious blows from the Fire Axe.",
    "profiles": [
      {
        "name": "Fuegan",
        "m": "7\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Searsong – beam",
        "tags": [
          "ASSAULT",
          "MELTA 1",
          "SUSTAINED HITS 2"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Searsong – lance",
        "tags": [
          "ASSAULT",
          "MELTA 6"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "14",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Fire Axe",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-4",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Burning Lance",
        "text": "While this model is leading a unit, add 6\" to the Range characteristic of Melta weapons equipped by models in that unit."
      },
      {
        "name": "Unquenchable Resolve",
        "text": "The first time this model is destroyed, at the end of the phase, roll one D6: on a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with its full wounds remaining."
      }
    ],
    "composition": [
      "1 Fuegan – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Searsong; Fire Axe.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Fire Dragons"
      ]
    },
    "keywords": [
      "Aeldari",
      "Infantry",
      "Phoenix Lord",
      "Grenades",
      "Aspect Warrior",
      "Character",
      "Epic Hero",
      "Fuegan"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "guardian-defenders",
    "name": "Guardian Defenders",
    "points": [
      {
        "models": 11,
        "points": 90
      }
    ],
    "flavor": "Guardian Defenders are versatile support troops capable of unleashing withering hails of fire from their shuriken catapults. They also man anti-grav Heavy Weapon Platforms that can be fitted with a variety of powerful guns with which to sunder enemy armour or mow down swathes of infantry.",
    "profiles": [
      {
        "name": "GUARDIAN DEFENDER",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "baseSize": "28.5mm"
      },
      {
        "name": "HEAVY WEAPON PLATFORM",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "0",
        "baseSize": "40mm"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Missile launcher – starshot",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
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
        "a": "1",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Fleet of Foot",
        "text": "This unit can perform the Fade Back Agile Manoeuvre without spending a Battle Focus token to do so. It can do so even if other units have done so in the same phase, and doing so does not prevent other units from performing the same Agile Manoeuvre in the same phase."
      },
      {
        "name": "Crewed Platform",
        "text": "When the last Guardian Defender model in this unit is destroyed, any remaining Heavy Weapon Platform models in this unit are also destroyed."
      }
    ],
    "composition": [
      "10 Guardian Defenders",
      "1 Heavy Weapon Platform"
    ],
    "loadout": "**Every Guardian Defender is equipped with:** shuriken catapult; close combat weapon.\n\n**The Heavy Weapon Platform is equipped with:** shuriken cannon; close combat weapon.",
    "options": [
      "The Heavy Weapon Platform can replace its shuriken cannon with one of the following:\n▪ 1 missile launcher\n▪ 1 bright lance\n▪ 1 scatter laser\n▪ 1 starcannon"
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Aeldari",
      "Guardian Defenders",
      "Guardians",
      "Grenades"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "hemlock-wraithfighter",
    "name": "Hemlock Wraithfighter",
    "points": [
      {
        "models": 1,
        "points": 155
      }
    ],
    "flavor": "Hemlocks blend the psychic abilities of their Spiritseer pilots with the gestalt energies of the Aeldari dead, who can pilot the craft should the seer be incapacitated. The aircraft’s mindshock pod unleashes waves of negative emotion to cause terror in the enemy, while its heavy D-scythes hurl the Hemlock’s victims into the warp.",
    "profiles": [
      {
        "name": "Hemlock Wraithfighter",
        "m": "-",
        "t": "8",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Heavy D-scythe",
        "tags": [
          "BLAST"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "4+",
        "s": "12",
        "ap": "-4",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "abilities": [
      {
        "name": "Mindshock Pod (Aura, Psychic)",
        "text": "While an enemy unit is within 9\" of this model, subtract 1 from Battle-shock and Leadership tests taken for that unit."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Hemlock Wraithfighter"
    ],
    "loadout": "**This model is equipped with:** 2 heavy D-scythes; wraithbone hull.",
    "keywords": [
      "Vehicle",
      "Aircraft",
      "Psyker",
      "Wraith Construct",
      "Fly",
      "Hemlock Wraithfighter",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "howling-banshees",
    "name": "Howling Banshees",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 10,
        "points": 165
      }
    ],
    "flavor": "Howling Banshees are deadly in hand-to-hand fighting and renowned for their rapid strikes. Their Banshee masks contain psychosonic amplifiers that magnify the wearer’s keening battle screams into a mind-destroying shock wave. This aural assault inspires terror and paralysis in the foe as the Aspect Warriors move in for the kill.",
    "profiles": [
      {
        "name": "HOWLING BANSHEE",
        "m": "8\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "invNote": "This invulnerable save is improved to 4+ against melee attacks.",
        "baseSize": "28.5mm"
      },
      {
        "name": "HOWLING BANSHEE EXARCH",
        "m": "8\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "invNote": "This invulnerable save is improved to 4+ against melee attacks.",
        "baseSize": "28.5mm"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Triskele",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Banshee blade",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "2",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Executioner",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Mirrorswords",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Triskele",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "6",
        "ws": "2+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Fights First",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Acrobatic",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced or Fell Back."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Howling Banshee Exarch",
      "4-9 Howling Banshees"
    ],
    "loadout": "**Every model is equipped with:** shuriken pistol; Banshee blade.",
    "options": [
      "The Howling Banshee Exarch’s Banshee blade can be replaced with 1 of the following:\n▪ 1 executioner\n▪ 1 triskele",
      "The Howling Banshee Exarch’s shuriken pistol and Banshee blade can be replaced with 1 mirrorswords.",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Infantry",
      "Aeldari",
      "Aspect Warriors",
      "Howling Banshees"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "jain-zar",
    "name": "Jain Zar",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Always at the front of a charge and famed for her speed and ferocity, Jain Zar carries the Blade of Destruction, an ancient executioner. This she whirls in bloody arcs to carve through foes, before vaulting into a new position. With a flick of her wrist she unleashes the Silent Death, a triple-bladed throwing weapon that can easily sever a foe’s head.",
    "profiles": [
      {
        "name": "Jain Zar",
        "m": "8\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Silent Death",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Blade of Destruction",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "8",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Fights First, Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Whirling Death",
        "text": "While this model is leading a unit, each time that unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit and each time a model in that unit makes an Advance move, ignore any vertical distance when determining the total distance that model can be moved during that move."
      },
      {
        "name": "Storm of Silence",
        "text": "Each time this model makes an attack that targets a CHARACTER unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Jain Zar – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Silent Death; Blade of Destruction.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Howling Banshees"
      ]
    },
    "keywords": [
      "Jain Zar",
      "Aeldari",
      "Epic Hero",
      "Infantry",
      "Character",
      "Aspect Warrior",
      "Phoenix Lord"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "kharseth",
    "name": "Kharseth",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "The most gifted Void Dreamer to have ever lived, Kharseth can sense the minutest fluctuations in the fabric of reality, detecting warp translations and other empyric disturbances and directing the fire of allies with terrifying precision. So too can they wield the energies of the Warp and unleash freezing energies of the void upon their enemies.",
    "profiles": [
      {
        "name": "Prince Yriel",
        "m": "7\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Dread of the Deep Void",
        "tags": [
          "ANTI-INFANTRY 2+",
          "BLAST",
          "HAZARDOUS",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Waystave",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "3"
      }
    ],
    "core": "Leader, Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Aethersense (Psychic)",
        "text": "Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of this model."
      },
      {
        "name": "Fury of the Void (Psychic)",
        "text": "In your Shooting phase, after this model’s unit has shot, select one enemy unit hit by one or more attacks made with this model’s Dread of the Deep Void. Until the end of the turn, that unit is riven. Each time an AELDARI model from your army makes an attack that targets a riven unit, add 1 to the Strength characteristic of that attack."
      }
    ],
    "composition": [
      "1 Kharseth – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Dread of the Deep Void; Waystave.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Corsair Voidscarred",
        "Corsair Voidreavers"
      ]
    },
    "keywords": [
      "Infantry",
      "Aeldari",
      "Character",
      "Epic Hero",
      "Psyker",
      "Anhrathe",
      "Kharseth"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "leystalker",
    "name": "Leystalker",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "profiles": [
      {
        "name": "Leystalker",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Long Rifle",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Drakesteed Fangs and Talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hunting Blades",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Lone Operative, Stealth, Scouts 9\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Panicked Quarry",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit (excluding Monster/Vehicle units) hit by those attacks. That enemy unit makes a Battle-shock roll, with -1 to that Battle-shock roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Drakolithe",
        "text": "When an enemy unit ends a move within 8\" of this unit, if this unit is unengaged or if that enemy unit ended that move engaged with this unit, you can use this ability. If you do, roll one D6:\n▪ On a 3+, that enemy unit suffers 1 mortal wound. Place one Drakolithe token next to the unit for each Drakolithe the unit is equipped with, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Leystalker"
    ],
    "loadout": "**This model is equipped with:** 2 Drakolithe; Drakesteed Fangs and Talons; Long Rifle; Hunting Blades.",
    "keywords": [
      "Aeldari",
      "Character",
      "Exodite",
      "Mobile",
      "Mounted"
    ],
    "factionKeywords": []
  },
  {
    "id": "lhykhis",
    "name": "Lhykhis",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Lhykhis strikes like an ambush predator from the Empyrean, sowing murderous bloodshed amongst the foe. With each hissing discharge of the Brood Twain, she reduces enemies to sliced sacks of sloshing gore. With Weaverender and her Spider’s Fangs, she picks apart her victims at close quarters before vanishing again into the web of the Warp.",
    "profiles": [
      {
        "name": "Lhykhis",
        "m": "12\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Brood Twain",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Spider’s Fangs",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Weaverender",
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
    "core": "Deep Strike, Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Empyric Ambush",
        "text": "While this model is leading a unit, that unit is eligible to declare a charge in a turn in which it used its Flickerjump ability."
      },
      {
        "name": "Whispering Web",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly Aeldari model makes an attack that targets that unit, an unmodified Hit roll of 5+ scores a Critical Hit."
      }
    ],
    "composition": [
      "1 Lhykhis – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Brood Twain; Spider’s Fangs; Weaverender.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Warp Spiders"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Aeldari",
      "Jump Pack",
      "Fly",
      "Aspect Warrior",
      "Phoenix Lord",
      "Lhykhis"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "maugan-ra",
    "name": "Maugan Ra",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "A master at killing from a distance, Maugan Ra wields the Maugetar. This scythe-like weapon fires mind-linked shuriken discs large enough to decapitate a swathe of foes before vanishing into nothingness. Should the enemy survive this barrage, they will meet a swift end on the curved edge of the Maugetar’s built-in reaping blade.",
    "profiles": [
      {
        "name": "Maugan Ra",
        "m": "7\"",
        "t": "3",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Maugetar",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Maugetar",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Harvester of Souls",
        "text": "While this model is leading a unit, in your Shooting phase, after selecting targets for that unit’s attacks, if every attack targets the same unit, roll one D6 for the target unit and one D6 for every other enemy unit within 3\" of the target unit. On a 5+, the unit being rolled for is struck by explosive debris; after resolving all of that unit’s attacks against the target unit, each unit struck by explosive debris suffers D3 mortal wounds."
      },
      {
        "name": "Face of Death",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That enemy unit must take a Battle-shock test, subtracting 1 from the result."
      }
    ],
    "composition": [
      "1 Maugan Ra"
    ],
    "loadout": "**This model is equipped with:** the Maugetar.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Dark Reapers"
      ]
    },
    "keywords": [
      "Phoenix Lord",
      "Maugan Ra",
      "Aspect Warrior",
      "Aeldari",
      "Epic Hero",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "night-spinner",
    "name": "Night Spinner",
    "points": [
      {
        "models": 1,
        "points": 170,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 190,
        "note": "2nd+"
      }
    ],
    "flavor": "The doomweaver mounted by the Night Spinner is an esoteric weapon that spins great swathes of monofilament wire into a lethal web that is launched high into the air. So strong is this substance that nothing can stop its descent, and any foe lying beneath it faces a horrible death as the razor-sharp strands fall first upon and then through them.",
    "profiles": [
      {
        "name": "Night Spinner",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "7+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Doomweaver",
        "tags": [
          "BLAST",
          "INDIRECT FIRE",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Monofilament Web",
        "text": "In your Shooting phase, after this model has shot, if one or more of those attacks made with its doomweaver scored a hit against an enemy unit, until the start of your next turn, that enemy unit is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for it."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Night Spinner"
    ],
    "loadout": "**This model is equipped with:** doomweaver; twin shuriken catapult; wraithbone hull.",
    "options": [
      "This model's twin shuriken catapult can be replaced with 1 shuriken cannon."
    ],
    "keywords": [
      "Aeldari",
      "Night Spinner",
      "Vehicle",
      "Fly",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "phantom-titan",
    "name": "Phantom Titan",
    "points": [
      {
        "models": 1,
        "points": 2100
      }
    ],
    "flavor": "Phantoms reign as the pinnacle of war-craft, their towering forms wreathed in protective distort fields and invested with ruinous weaponry. To pilot one requires flawless poise and judgement; its steersman must enter a trancelike state, merging with the spirits within so that the Phantom becomes a near-unstoppable god of war.",
    "profiles": [
      {
        "name": "Phantom Titan",
        "m": "14\"",
        "t": "14",
        "sv": "2+",
        "w": "55",
        "ld": "6+",
        "oc": "20",
        "inv": "4+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "D-bombard",
        "tags": [
          "BLAST",
          "DEVASTATING WOUNDS"
        ],
        "range": "72\"",
        "a": "D6",
        "bs": "3+",
        "s": "20",
        "ap": "-4",
        "d": "2D6"
      },
      {
        "name": "Phantom pulsar",
        "tags": [],
        "range": "120\"",
        "a": "8",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Phantom starcannon",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Pulse laser",
        "tags": [],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Voidstorm missile launcher",
        "tags": [],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Phantom feet",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "4"
      },
      {
        "name": "Wraith glaive – strike",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "18",
        "ap": "-4",
        "d": "12"
      },
      {
        "name": "Wraith glaive – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "8",
        "ap": "-3",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D6+6",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Titanic Advance",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding Titanic models) and terrain features that are 4\" or less in height as if they were not there."
      },
      {
        "name": "Towering Wraith Construct",
        "text": "Each time you target this model with a Stratagem, you must spend three times that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "Flawless Poise",
        "text": "This model is eligible to shoot and declare a charge in a turn in which it Fell Back."
      }
    ],
    "damaged": {
      "note": "1-16 wounds remaining",
      "text": "While this model has 1-16 wounds remaining, subtract 10 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Phantom Titan"
    ],
    "loadout": "**This model is equipped with:** D-bombard; Phantom pulsar; Phantom starcannon; voidstorm missile launcher; Phantom feet.",
    "options": [
      "This model’s D-bombard can be replaced with one of the following:\n▪ 2 Phantom starcannons and 1 wraith glaive\n▪ 1 Phantom starcannon, 1 pulse laser and 1 wraith glaive\n▪ 2 pulse lasers and 1 wraith glaive\n▪ 1 Phantom pulsar",
      "This model’s Phantom pulsar can be replaced with one of the following:\n▪ 1 D-bombard\n▪ 2 Phantom starcannons and 1 wraith glaive\n▪ 1 Phantom starcannon, 1 pulse laser and 1 wraith glaive\n▪ 2 pulse lasers and 1 wraith glaive",
      "This model’s Phantom starcannon can be replaced with 1 pulse laser."
    ],
    "keywords": [
      "Titanic",
      "Monster",
      "Aeldari",
      "Phantom Titan",
      "Wraith Construct",
      "Walker",
      "Towering"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "prince-yriel",
    "name": "Prince Yriel",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "A noble scion of Craftworld Iyanden, Prince Yriel has walked many paths. Equally adept at commanding vast warfleets and leading great hosts of Anhrathe raiders to war, he is also a skilled combatant. Yriel wields the Spear of Twilight with superlative grace and dexterity and can pierce the guards of even the most vaunted duellists.",
    "profiles": [
      {
        "name": "Prince Yriel",
        "m": "7\"",
        "t": "3",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Eye of Wrath",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Spear of Twilight",
        "tags": [
          "LANCE"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Leader, Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Piratical Hero",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, that attack has the [SUSTAINED HITS 1] ability and add 1 to the Hit roll."
      },
      {
        "name": "Prince of Corsairs",
        "text": "After both players have deployed their armies, if this unit is on the battlefield (or any Transport it is embarked within is on the battlefield), select up to three AELDARI units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Prince Yriel – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Eye of Wrath; shuriken pistol; Spear of Twilight.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Corsair Voidscarred",
        "Corsair Voidreavers"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Anhrathe",
      "Aeldari",
      "Infantry",
      "Prince Yriel"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "rangers",
    "name": "Rangers",
    "points": [
      {
        "models": 5,
        "points": 60
      },
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "These Outcast warriors are adepts in the arts of stealth warfare, marksmanship and tracking their enemies through the harshest terrain. Veiled by cameleoline cloaks and gloom field generators, they can hide from their foes even in plain sight as they pick them off one by one from extreme range.",
    "profiles": [
      {
        "name": "Rangers",
        "m": "7\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Long rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Path of the Outcast",
        "text": "In your opponent's Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\"."
      }
    ],
    "composition": [
      "5-10 Rangers"
    ],
    "loadout": "**Every model is equipped with:** long rifle; shuriken pistol; close combat weapon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Rangers",
      "Aeldari",
      "Infantry"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "revenant-titan",
    "name": "Revenant Titan",
    "points": [
      {
        "models": 1,
        "points": 1100
      }
    ],
    "flavor": "Revenants are graceful wraith constructs armed with paired pulsars – high-yield laser weapons that are the bane of heavy armour. Other Revenants wield sophisticated sonic lances, which emit resonant noise that shakes apart everything it hits. Survivors are soon wiped out by its cloudburst missiles, or simply crushed.",
    "profiles": [
      {
        "name": "Revenant Titan",
        "m": "16\"",
        "t": "13",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "16",
        "inv": "4+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Cloudburst missile launcher",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Revenant pulsar",
        "tags": [
          "ASSAULT"
        ],
        "range": "60\"",
        "a": "6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Sonic lance",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+",
          "ASSAULT",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6+6",
        "bs": "N/A",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Revenant feet",
        "tags": [],
        "a": "8",
        "ws": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Titanic Advance",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding Titanic models) and terrain features that are 4\" or less in height as if they were not there."
      },
      {
        "name": "Towering Wraith Construct",
        "text": "Each time you target this model with a Stratagem, you must spend twice that Stratagem’s stated CP cost to do so."
      },
      {
        "name": "Revenant Jet Pack",
        "text": "Each time this model Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 8\" to the Move characteristic of this model."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 8 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Revenant Titan"
    ],
    "loadout": "**This model is equipped with:** cloudburst missile launcher; Revenant pulsar; sonic lance; Revenant feet.",
    "options": [
      "This model’s Revenant pulsar can be replaced with 1 sonic lance.",
      "This model’s sonic lance can be replaced with 1 Revenant pulsar."
    ],
    "keywords": [
      "Aeldari",
      "Wraith Construct",
      "Fly",
      "Walker",
      "Revenant Titan",
      "Titanic",
      "Monster",
      "Towering"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "shadow-weaver-platform",
    "name": "Shadow Weaver Platform",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Cruel and terrible weapons, shadow weavers project spools of monofilament wire skywards above the foe. Spreading into a lethal web, the wire falls silently into the enemy ranks, slicing irresistibly through armour, meat and bone before settling, snowflake soft, amidst the gruesomely butchered remains of all those caught beneath its descending strands.",
    "profiles": [
      {
        "name": "Shadow Weaver Platform",
        "m": "7\"",
        "t": "6",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Shadow weaver",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
      }
    ],
    "abilities": [
      {
        "name": "Support Weapon",
        "text": "Each time an attack targets this model’s unit, if that unit contains one or more other models, until that attack is resolved, this model has a Toughness characteristic of 3."
      },
      {
        "name": "Monofilament Snare",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks made with its shadow weaver. Until the start of your next turn, that enemy unit is snared. While a unit is snared, each time that unit makes a Normal, Advance or Fall Back move, roll one D6 for each model in that unit: for each 1, that unit suffers 1 mortal wound."
      }
    ],
    "specialAbilities": [
      {
        "name": "SUPPORT ARTILLERY",
        "text": "At the start of the Declare Battle Formations step, this model can join one Guardian Defenders unit from your army (a unit cannot have more than one Support Weapon model joined to it). This model then counts as part of that GUARDIANS unit for the rest of the battle, and that unit’s Starting Strength is increased accordingly.\n\nThis model, and any unit it is joined to, cannot embark within a Transport."
      }
    ],
    "composition": [
      "1 Shadow Weaver Platform"
    ],
    "loadout": "**This model is equipped with:** shadow weaver; shuriken catapult; close combat weapon.",
    "keywords": [
      "Support Weapon",
      "Infantry",
      "Aeldari",
      "Shadow Weaver Platform",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "shadowseer",
    "name": "Shadowseer",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Shadowseers can blind their enemies and drive them mad with their psychic powers. They shield their allies with veils of illusion, and crush bones in close combat with strikes from their miststaves – which also scramble the perceptions of those they hit.",
    "profiles": [
      {
        "name": "Shadowseer",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Miststave",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader, Stealth",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Fog of Dreams (Psychic)",
        "text": "While this model is leading a unit, that unit can only be selected as the target of a ranged attack if the attacking model is within 18\"."
      },
      {
        "name": "Treacherous Illusion (Psychic)",
        "text": "Melee weapons equipped by enemy models have the [HAZARDOUS] ability while targeting this model’s unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flip Belt",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      }
    ],
    "specialAbilities": [
      {
        "name": "TRAVELLING PLAYERS",
        "text": "Unless otherwise stated, you cannot include more than one of this model in your army."
      }
    ],
    "composition": [
      "1 Shadowseer"
    ],
    "loadout": "**This model is equipped with:** shuriken pistol; miststave; flip belt.",
    "options": [
      "This model’s shuriken pistol can be replaced with 1 neuro disruptor."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Troupe"
      ]
    },
    "keywords": [
      "Shadowseer",
      "Infantry",
      "Character",
      "Aeldari",
      "Psyker",
      "Grenades"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "shining-spears",
    "name": "Shining Spears",
    "points": [
      {
        "models": 3,
        "points": 100
      },
      {
        "models": 6,
        "points": 200
      }
    ],
    "flavor": "Shining Spears live to joust, which they do at breathtaking speeds upon their jetbike steeds. Their chosen weapon is the long and formidable laser lance, which burns an opening in the target with a powerful energy blast an instant before the bulk of the weapon slams home with a devastating, piercing impact.",
    "profiles": [
      {
        "name": "SHINING SPEAR",
        "m": "14\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2",
        "inv": "5+",
        "baseSize": "Large Flying Base"
      },
      {
        "name": "SHINING SPEAR EXARCH",
        "m": "14\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "5+",
        "baseSize": "Large Flying Base"
      }
    ],
    "ranged": [
      {
        "name": "Laser lance",
        "tags": [
          "ASSAULT"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Star lance",
        "tags": [
          "ASSAULT"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Laser lance",
        "tags": [
          "ANTI-MONSTER 3+",
          "ANTI-VEHICLE 3+",
          "LANCE"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Paragon sabre",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Star lance",
        "tags": [
          "ANTI-MONSTER 3+",
          "ANTI-VEHICLE 3+",
          "LANCE"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-3",
        "d": "3"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Extreme Mobility",
        "text": "Each time this unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance models in this unit can be moved during that move."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Shimmershield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Shining Spear Exarch",
      "2-5 Shining Spears"
    ],
    "loadout": "**Every model is equipped with:** laser lance; twin shuriken catapult.",
    "options": [
      "The Shining Spear Exarch’s laser lance can be replaced with one of the following:\n▪ 1 paragon sabre\n▪ 1 star lance",
      "The Shining Spear Exarch’s twin shuriken catapult can be replaced with 1 shuriken cannon.",
      "The Shining Spear Exarch can be equipped with 1 shimmershield."
    ],
    "keywords": [
      "Shining Spears",
      "Mounted",
      "Aeldari",
      "Fly",
      "Aspect Warriors"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "shroud-runners",
    "name": "Shroud Runners",
    "points": [
      {
        "models": 3,
        "points": 90
      },
      {
        "models": 6,
        "points": 175
      }
    ],
    "flavor": "Streaking into battle as barely perceived blurs, Shroud Runners effortlessly outmanoeuvre their enemies while harassing them with pinpoint sniper fire. Each jetbike acts as the mount for a pair of skilled Aeldari Rangers, the pillion rider often entering a marksman’s trance so as to aim and fire while travelling at incredible speeds.",
    "profiles": [
      {
        "name": "Shroud Runners",
        "m": "14\"",
        "t": "4",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "2",
        "inv": "5+",
        "invNote": "* Against ranged attacks only"
      }
    ],
    "ranged": [
      {
        "name": "Long rifle",
        "tags": [
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 9\", Stealth",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Target Acquisition",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks made with a long rifle. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      }
    ],
    "composition": [
      "3-6 Shroud Runners"
    ],
    "loadout": "**Every model is equipped with:** long rifle; scatter laser; shuriken pistol; close combat weapon.",
    "keywords": [
      "Fly",
      "Mounted",
      "Shroud Runners",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "skyweavers",
    "name": "Skyweavers",
    "points": [
      {
        "models": 2,
        "points": 95
      },
      {
        "models": 4,
        "points": 190
      }
    ],
    "flavor": "Skyweavers shoot through the air in a prismatic storm of hallucinatory colour and light. While the riders known as Skyborne Princes pilot each jetbike and operate its guns, those called Great Falcons ride pillion, poised to cut down the foe with their star bolas or bisect them with their sweeping zephyrglaives.",
    "profiles": [
      {
        "name": "Skyweavers",
        "m": "14\"",
        "t": "4",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Skyweaver haywire cannon",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Star bolas",
        "tags": [],
        "range": "12\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Zephyrglaive",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Acrobatic Grace",
        "text": "▪ This unit has Stealth.\n▪ Melee attacks that target this unit have -1 to Hit rolls."
      }
    ],
    "composition": [
      "2-4 Skyweavers"
    ],
    "loadout": "**Every model is equipped with:** shuriken cannon; star bolas; close combat weapon.",
    "options": [
      "Any number of models can each have their shuriken cannon replaced with 1 Skyweaver haywire cannon.",
      "Any number of models can each have their star bolas replaced with 1 zephyrglaive."
    ],
    "keywords": [
      "Fly",
      "Smoke",
      "Skyweavers",
      "Mounted",
      "Aeldari"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "solitaire",
    "name": "Solitaire",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "Solitaires are the equal of a host of lesser warriors, and can move at speeds the naked eye cannot follow. In combat, their scything kicks and hammer-blow punches come so fast their foes are dead before they know they are in a fight. They sever heads and pierce hearts in a rapid blur of movement, and cause blood to fall like monsoon rain.",
    "profiles": [
      {
        "name": "Solitaire",
        "m": "12\"",
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
        "name": "Solitaire weapons",
        "tags": [
          "PRECISION"
        ],
        "a": "9",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Fights First, Lone Operative, Stealth",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Blitz",
        "text": "Once per battle, in your Movement phase, before this model makes a Normal move, it can use this ability. If it does, until the end of the turn, add 2D6\" to this model’s Move characteristic and add 3 to the Attacks characteristic of this model’s Solitaire weapons."
      },
      {
        "name": "Blur of Movement",
        "text": "This model is eligible to declare a charge in a turn in which it Advanced."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flip Belt",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      }
    ],
    "specialAbilities": [
      {
        "name": "PATH OF DAMNATION",
        "text": "This model cannot be your WARLORD."
      }
    ],
    "composition": [
      "1 Solitaire – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Solitaire weapons, flip belt.",
    "keywords": [
      "Infantry",
      "Epic Hero",
      "Aeldari",
      "Solitaire",
      "Character"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "spiritseer",
    "name": "Spiritseer",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "It falls to the Spiritseers to commune with the souls of the dead. In this capacity, they guide ghost warriors through the inferno of battle, bringing the world around them into greater focus. Aided in this way, ghost warriors become yet more lethal, their strikes and shots ensuring the swift demise of their foes.",
    "profiles": [
      {
        "name": "Spiritseer",
        "m": "7\"",
        "t": "3",
        "sv": "6+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Witch staff",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "2+",
        "s": "3",
        "ap": "0",
        "d": "D3"
      }
    ],
    "core": "Stealth",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Spiritseer",
        "text": "While this model is within 3\" of one or more friendly Wraith Construct units, this model has the Lone Operative ability."
      },
      {
        "name": "Spirit Mark (Psychic)",
        "text": "Once per turn, in your Movement phase, when this model starts or ends a move, select one friendly Wraith Construct unit within 6\" of this model (excluding TITANIC units) and one enemy unit visible to this model. Until the start of your next Movement phase, weapons equipped by models in that friendly unit have the [SUSTAINED HITS 1] ability while targeting that enemy unit."
      },
      {
        "name": "Tears of Isha (Psychic)",
        "text": "In your Command phase, select one friendly Wraith Construct unit within 6\" of this model. If one or more models in that unit are destroyed, you can return one destroyed model to that unit. Otherwise, one model in that unit regains up to D3 lost wounds. Each unit can only be selected for this ability once per turn."
      }
    ],
    "composition": [
      "1 Spiritseer"
    ],
    "loadout": "**This model is equipped with:** shuriken pistol; witch staff.",
    "keywords": [
      "Aeldari",
      "Infantry",
      "Character",
      "Spiritseer",
      "Psyker"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "starfangs",
    "name": "Starfangs",
    "points": [
      {
        "models": 1,
        "points": 70
      },
      {
        "models": 2,
        "points": 140
      }
    ],
    "flavor": "The Starfang combines the graceful silhouette and wraithbone armour of the Asuryani Vyper with Commorrite weapons technology. Armed with a turret-mounted disintegrator cannon and underslung Starfang grenade launcher, this swift skimmer provides Anhrathe raiding forces with much needed firepower.",
    "profiles": [
      {
        "name": "Starfangs",
        "m": "14\"",
        "t": "6",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Disintegrator cannon",
        "tags": [
          "ASSAULT"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Starfang grenade launcher",
        "tags": [
          "ASSAULT",
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Scouts 7\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Hallucinogen Grenades",
        "text": "At the start of your opponent’s Shooting phase, this unit can use this ability. If it does, select one Aeldari Infantry unit from your army visible to and within 36\" of this unit: until the end of the phase, that unit has the Stealth ability."
      }
    ],
    "composition": [
      "1-2 Starfangs"
    ],
    "loadout": "**Every model is equipped with:** disintegrator cannon; Starfang grenade launcher; wraithbone hull.",
    "options": [
      "None"
    ],
    "keywords": [
      "Vehicle",
      "Aeldari",
      "Anhrathe",
      "Fly",
      "Smoke",
      "Grenades",
      "Starfang"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "starweaver",
    "name": "Starweaver",
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
    "flavor": "These agile and nimble anti-grav transport craft swoop and spiral effortlessly through incoming fire, their flickering holo-fields giving them polychromatic camouflage. Armed with multiple heavy weapons, they provide great volumes of supporting fire for the troops they carry, scything down the foe with withering hails of shurikens.",
    "profiles": [
      {
        "name": "Starweaver",
        "m": "14\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Firing Deck 6",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Rapid Embarkation",
        "text": "At the end of the Fight phase, if there are no models currently embarked within this TRANSPORT, you can select one friendly Harlequins Infantry unit that has 6 or fewer models that is wholly within 6\" of this TRANSPORT. Unless that unit is within Engagement Range of one or more enemy units, it can embark within this TRANSPORT. That unit can embark within this TRANSPORT in a turn it disembarked from this TRANSPORT."
      }
    ],
    "composition": [
      "1 Starweaver"
    ],
    "loadout": "**This model is equipped with:** 2 shuriken cannons; close combat weapon.",
    "transport": "This model has a transport capacity of 6 Harlequins Infantry models.",
    "keywords": [
      "Dedicated Transport",
      "Smoke",
      "Fly",
      "Starweaver",
      "Vehicle",
      "Aeldari",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "stonesinger",
    "name": "Stonesinger",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "profiles": [
      {
        "name": "Stonesinger",
        "m": "10\"",
        "t": "5",
        "sv": "4+",
        "w": "4",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Song of Waning",
        "tags": [
          "ANTI-MONSTER/VEHICLE 3+",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Solar Carbine",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Venomcrest Spit",
        "tags": [
          "ANTI-NON-MONSTER/VEHICLE 3+",
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "3",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Drakesteed Fangs and Talons",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stone Stave",
        "tags": [
          "ANTI-NON-MONSTER/VEHICLE 2+",
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Elemental Ensnarement",
        "text": "At the end of your Fight phase, if this unit is not Battle-shocked, you can use this ability. If you do, roll one D6:\n▪ On a 1, this unit is Battle-shocked.\n▪ Select one visible enemy Monster/Vehicle unit (excluding Titanic units) within 18\" of this unit. That enemy unit is ensnared until the start of your next turn. While a unit is ensnared, that unit has -2\" M and cannot be pinned."
      }
    ],
    "composition": [
      "1 Stonesinger"
    ],
    "loadout": "**This model is equipped with:** Drakesteed Fangs and Talons; Song of Waning; Solar Carbine; Stone Stave; Venomcrest Spit.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Dragon Knights"
      ]
    },
    "keywords": [
      "Aeldari",
      "Character",
      "Exodite",
      "Mobile",
      "Mounted",
      "Psyker"
    ],
    "factionKeywords": []
  },
  {
    "id": "storm-guardians",
    "name": "Storm Guardians",
    "points": [
      {
        "models": 11,
        "points": 100
      }
    ],
    "flavor": "Storm Guardians often support Aspect Warriors in close combat, wielding their pistols and blades with all the grace and skill of their kind. Other Storm Guardians bring special weapons to bear, burning foes out of cover with bursts from their flamers or melting through armoured bunkers with their fusion guns.",
    "profiles": [
      {
        "name": "STORM GUARDIAN",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "baseSize": "28.5mm"
      },
      {
        "name": "SERPENT’S SCALE PLATFORM",
        "m": "7\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "0",
        "baseSize": "40mm"
      }
    ],
    "ranged": [
      {
        "name": "Flamer",
        "tags": [
          "ASSAULT",
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
        "name": "Fusion gun",
        "tags": [
          "ASSAULT",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Power sword",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Stormblades",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      },
      {
        "name": "Crewed Platform",
        "text": "When the last Storm Guardian model in this unit is destroyed, any remaining Serpent’s Scale Platform models in this unit are also destroyed."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Serpent Shield",
        "text": "Models in the bearer’s unit have a 5+ invulnerable save."
      }
    ],
    "composition": [
      "10 Storm Guardians",
      "1 Serpent’s Scale Platform"
    ],
    "loadout": "**Every Storm Guardian is equipped with:** shuriken pistol; close combat weapon.\n\n**The Serpent’s Scale Platform is equipped with:** close combat weapon; Serpent shield.",
    "options": [
      "Up to 2 Storm Guardians can each have their shuriken pistol replaced with 1 flamer.",
      "Up to 2 Storm Guardians can each have their shuriken pistol replaced with 1 fusion gun.",
      "Up to 2 Storm Guardians can each have their Guardian combat weapon replaced with 1 power sword."
    ],
    "keywords": [
      "Guardians",
      "Storm Guardians",
      "Aeldari",
      "Battleline",
      "Infantry",
      "Grenades"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "striking-scorpions",
    "name": "Striking Scorpions",
    "points": [
      {
        "models": 5,
        "points": 75
      },
      {
        "models": 10,
        "points": 145
      }
    ],
    "flavor": "Striking Scorpions are the stealthiest Aspect, becoming one with the shadows to creep up on the enemy before falling upon them with ruthless intent. They can wait for days without motion before striking with the force of a lightning bolt, launching hails of mandiblaster fire and delivering flurries of blows with their Scorpion chainswords.",
    "profiles": [
      {
        "name": "STRIKING SCORPION",
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
        "name": "STRIKING SCORPION EXARCH",
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
    "ranged": [
      {
        "name": "Chainsabres",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Biting blade",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-3",
        "d": "1"
      },
      {
        "name": "Chainsabres",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Scorpion chainsword",
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
        "name": "Scorpion’s claw",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Infiltrators, Scouts 7\", Stealth",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Mandiblasters",
        "text": "Each time a model in this unit makes a melee attack, if it made a Charge move this turn, an unmodified Hit roll of 5+ scores a Critical Hit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Striking Scorpion Exarch",
      "4-9 Striking Scorpions"
    ],
    "loadout": "**The Striking Scorpion Exarch is equipped with:** shuriken pistol; Scorpion chainsword; Scorpion’s claw.\n\n**Every Striking Scorpion is equipped with:** shuriken pistol; Scorpion chainsword.",
    "options": [
      "The Striking Scorpion Exarch’s shuriken pistol, Scorpion chainsword and Scorpion’s claw can be replaced with one of the following:\n▪ 1 biting blade and 1 shuriken pistol\n▪ 1 chainsabres",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Striking Scorpions",
      "Infantry",
      "Aspect Warriors",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "swooping-hawks",
    "name": "Swooping Hawks",
    "points": [
      {
        "models": 5,
        "points": 95,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 110,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 205,
        "note": "3rd+"
      }
    ],
    "flavor": "Swooping Hawks soar high above the battlefield with incredible grace and agility, moving with such speed that they appear as a blur of colour. They are masters of harassment warfare, perfectly suited to breaking up enemy counter-attacks or picking off vulnerable formations with a hail of las-fire and plasma grenades.",
    "profiles": [
      {
        "name": "SWOOPING HAWK",
        "m": "14\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "32mm"
      },
      {
        "name": "SWOOPING HAWK EXARCH",
        "m": "14\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "32mm"
      }
    ],
    "ranged": [
      {
        "name": "Exarch’s lasblaster",
        "tags": [
          "ASSAULT",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hawk’s talon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Lasblaster",
        "tags": [
          "ASSAULT",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Sunpistol",
        "tags": [
          "ASSAULT",
          "LETHAL HITS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
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
        "name": "Power sword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Grenade Pack Flyover",
        "text": "Once per turn, in your Movement phase, when this unit is set up on the battlefield or ends a Normal, Advance or Fall Back move, it can use this ability. If it does, select one enemy unit within 8\" of and visible to this unit and roll one D6 for each Swooping Hawks model in this unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds). Each time this unit uses this ability, until the end of the turn, you cannot target this unit with the Grenade Stratagem."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Swooping Hawk Exarch",
      "4-9 Swooping Hawks"
    ],
    "loadout": "**The Swooping Hawk Exarch is equipped with:** Hawk’s talon; close combat weapon.\n\n**Every Swooping Hawk is equipped with:** lasblaster; close combat weapon.",
    "options": [
      "The Swooping Hawk Exarch’s Hawk’s talon can be replaced with one of the following:\n▪ 1 Exarch’s lasblaster\n▪ 1 sunpistol and 1 power sword\n▪ 1 scatter laser",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Swooping Hawks",
      "Aspect Warriors",
      "Grenades",
      "Fly",
      "Jump Pack",
      "Aeldari",
      "Infantry"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "the-visarch",
    "name": "The Visarch",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The Visarch darts amongst the foe, taking off limbs and heads with the Cronesword Asu-var, the Sword of Silent Screams. The many faces that adorn his ancient suit of Bel-Anshoc armour represent the personalities he can take in battle, which include the sure blade of an Exarch and the acrobatic prowess of a Drukhari Wych.",
    "profiles": [
      {
        "name": "The Visarch",
        "m": "8\"",
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
        "name": "Asu-var – quicksilver stance",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "8",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Asu-var – duellist stance",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Asu-var – mythic stance",
        "tags": [
          "ANTI-EPIC HERO 2+",
          "PRECISION"
        ],
        "a": "4",
        "ws": "2+",
        "s": "3",
        "ap": "-4",
        "d": "3"
      }
    ],
    "core": "Support",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Way of the Blade",
        "text": "While this model is leading a unit, models in that unit have the Fights First ability."
      },
      {
        "name": "Yvraine’s Champion",
        "text": "While this model is leading a unit, other Character models attached to that unit have the Feel No Pain 4+ ability."
      }
    ],
    "specialAbilities": [
      {
        "name": "SERVANT OF THE WHISPERING GOD",
        "text": "If your army includes THE VISARCH, it cannot include any Epic Hero units (excluding Ynnari units). If your army includes any EPIC HERO units (excluding YNNARI units), it cannot include THE VISARCH."
      }
    ],
    "composition": [
      "1 Visarch – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Asu-var.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Corsair Voidreavers",
        "Corsair Voidscarred",
        "Guardian Defenders",
        "Storm Guardians",
        "Ynnari Kabalite Warriors",
        "Ynnari Wyches"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Epic Hero",
      "Aeldari",
      "The Visarch"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "the-yncarne",
    "name": "The Yncarne",
    "points": [
      {
        "models": 1,
        "points": 245
      }
    ],
    "flavor": "Once it has torn into realspace, the Yncarne advances on its enemies amidst a vortex of deathly whispers. It is a roaring psychic hurricane that rips the life from those who earn its ire. Nearby Ynnari are invigorated by its chilling power, while foes are turned to dust by the Yncarne’s gaze, or sliced in two by its sweeping blows.",
    "profiles": [
      {
        "name": "The Yncarne",
        "m": "10\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Swirling soul energy",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "7",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Vilith-zhar – strike",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Vilith-zhar – sweep",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-4",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Inevitable Death",
        "text": "Once in each of your opponent’s turns, if this model is on the battlefield when another friendly AELDARI unit is destroyed, just after removing the last model in that unit, you can remove this model from the battlefield and set it up as close as possible to where that destroyed model was destroyed and not within Engagement Range of one or more enemy units. Doing so does not prevent this model from being eligible to move."
      },
      {
        "name": "Ethereal Form",
        "text": "Each time this model destroys an enemy unit, it regains up to D3 lost wounds."
      }
    ],
    "specialAbilities": [
      {
        "name": "AVATAR OF THE WHISPERING GOD",
        "text": "If your army includes THE YNCARNE, it cannot include any Epic Hero units (excluding Ynnari units). If your army includes any EPIC HERO units (excluding YNNARI units), it cannot include THE YNCARNE."
      }
    ],
    "composition": [
      "1 Yncarne – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** swirling soul energy; Vilith-zhar.",
    "keywords": [
      "Monster",
      "Character",
      "Epic Hero",
      "Aeldari",
      "Fly",
      "The Yncarne",
      "Daemon",
      "Psyker"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "troupe",
    "name": "Troupe",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 6,
        "points": 100
      },
      {
        "models": 11,
        "points": 190
      },
      {
        "models": 12,
        "points": 205
      }
    ],
    "flavor": "The Players of Harlequin Troupes perform with breathtaking skill, whether their stage is a wraithbone and glass amphitheatre bathed in crystalline light, or the firelit hell of the battlefield. They tumble, sprint and leap with beautiful agility, every squeeze of a trigger and slash of a blade bringing death to the enemy.",
    "profiles": [
      {
        "name": "Troupe",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Harlequin’s blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Harlequin’s special weapon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power sword",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Dance of Death",
        "text": "At the start of the Fight phase, select one of the following abilities for this unit to gain until the end of the phase:\n▪ **Hero’s Prowess:** Each time a model in this unit makes an attack, re-roll a Hit roll of 1.\n▪ **Villain’s Doom:** Each time a model in this unit makes an attack, add 1 to the Wound roll.\n▪ **Trickster’s Grace:** Each time an attack targets this unit, subtract 1 from the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flip Belt",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      }
    ],
    "composition": [
      "1 Lead Player",
      "4-11 Players"
    ],
    "loadout": "**Every model is equipped with:** shuriken pistol; Harlequin’s blade, flip belt.",
    "options": [
      "Any number of models can each have their Harlequin’s blade replaced with 1 Harlequin’s special weapon.",
      "The Lead Player’s Harlequin’s blade can be replaced with 1 power sword.",
      "If this unit contains 9 or fewer models:\n▪ Up to two models can each have their shuriken pistol replaced with 1 neuro disruptor\n▪ Up to two models can each have their shuriken pistol replaced with 1 fusion pistol",
      "If this unit contains 10 or more models:\n▪ Up to four models can each have their shuriken pistol replaced with 1 neuro disruptor\n▪ Up to four models can each have their shuriken pistol replaced with 1 fusion pistol"
    ],
    "keywords": [
      "Infantry",
      "Aeldari",
      "Grenades",
      "Troupe"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "troupe-master",
    "name": "Troupe Master",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Choreographers of conflict, Troupe Masters direct their comrades’ reactions to the fates of battle and ensure their performance in the theatre of war is as perfect as it can be. They are blisteringly swift and deadly warriors, and with the consent of their peers they act as focal points of their Troupes.",
    "profiles": [
      {
        "name": "Troupe Master",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Fusion pistol",
        "tags": [
          "ASSAULT",
          "MELTA 2",
          "PISTOL"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Neuro disruptor",
        "tags": [
          "ANTI-INFANTRY 2+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Harlequin’s special weapon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Troupe Master’s blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Choreographer of War",
        "text": "While this model is leading a unit, each time a model in that unit makes a Pile-in or Consolidation move, it can move up to 6\" instead of up to 3\". In addition, it does not need to end that move closer to the closest enemy model, provided it ends it as close as possible to the closest enemy unit."
      },
      {
        "name": "Cegorach’s Favour",
        "text": "Each time this model makes a melee attack, you can re-roll a Hit roll of 1 and add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Flip Belt",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      }
    ],
    "specialAbilities": [
      {
        "name": "TRAVELLING PLAYERS",
        "text": "Unless otherwise stated, you cannot include more than one of this model in your army."
      }
    ],
    "composition": [
      "1 Troupe Master"
    ],
    "loadout": "**This model is equipped with:** shuriken pistol; Troupe Master’s blade; flip belt.",
    "options": [
      "This model’s shuriken pistol can be replaced with one of the following:\n▪ 1 fusion pistol\n▪ 1 neuro disruptor",
      "This model's Troupe Master's blade can be replaced with 1 Harlequin's special weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Troupe"
      ]
    },
    "keywords": [
      "Troupe Master",
      "Grenades",
      "Infantry",
      "Character",
      "Aeldari"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "vibro-cannon-platform",
    "name": "Vibro Cannon Platform",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Vibro cannons unleash resonating barrages of sonic energy, funnelled along magnetic tunnels into the foe’s ranks. Such a blast rips a furrow of destruction through the ground before shaking foes apart, shattering bones and detonating engines and ammunition. When these beams are crossed, however, the harmonic becomes truly apocalyptic.",
    "profiles": [
      {
        "name": "Vibro Cannon Platform",
        "m": "7\"",
        "t": "6",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Vibro cannon",
        "tags": [],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "2"
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
      }
    ],
    "abilities": [
      {
        "name": "Support Weapon",
        "text": "Each time an attack targets this model’s unit, if that unit contains one or more other models, until that attack is resolved, this model has a Toughness characteristic of 3."
      },
      {
        "name": "Sonic Destruction",
        "text": "In your Shooting phase, each time this model makes an attack with its vibro cannon that targets an enemy unit, improve the Strength, Armour Penetration and Damage characteristics of that attack by 1 for each other friendly VIBRO CANNON PLATFORM model that made one or more attacks with its vibro cannon that also targeted that enemy unit this phase."
      }
    ],
    "specialAbilities": [
      {
        "name": "SUPPORT ARTILLERY",
        "text": "At the start of the Declare Battle Formations step, this model can join one Guardian Defenders unit from your army (a unit cannot have more than one Support Weapon model joined to it). This model then counts as part of that GUARDIANS unit for the rest of the battle, and that unit’s Starting Strength is increased accordingly.\n\nThis model, and any unit it is joined to, cannot embark within a Transport."
      }
    ],
    "composition": [
      "1 Vibro Cannon Platform"
    ],
    "loadout": "**This model is equipped with:** vibro cannon; shuriken catapult; close combat weapon.",
    "keywords": [
      "Infantry",
      "Aeldari",
      "Support Weapon",
      "Vibro Cannon Platform",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "voidweaver",
    "name": "Voidweaver",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "The Voidweaver’s potent combination of versatile weapons, lightweight psychoplastic armour, hyper-velocity and polychromatic camouflage make them exceptionally dangerous attack craft. Deadly on the ambush, groups of Voidweavers can rip apart enemy battle tanks or slaughter whole squads of infantry.",
    "profiles": [
      {
        "name": "Voidweaver",
        "m": "14\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Prismatic cannon – dispersed pulse",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Prismatic cannon – focused lances",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "4"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Voidweaver haywire cannon",
        "tags": [
          "ANTI-VEHICLE 4+",
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Stealth",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Polychromatic Camouflage",
        "text": "This unit can only be selected as the target of a ranged attack if the attacking model is within 18\"."
      }
    ],
    "composition": [
      "1 Voidweaver"
    ],
    "loadout": "**This model is equipped with:** 2 shuriken cannons; Voidweaver haywire cannon; close combat weapon.",
    "options": [
      "This model’s Voidweaver haywire cannon can be replaced with 1 prismatic cannon."
    ],
    "keywords": [
      "Vehicle",
      "Aeldari",
      "Fly",
      "Voidweaver",
      "Frame"
    ],
    "factionKeywords": [
      "Harlequins"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "vypers",
    "name": "Vyper",
    "points": [
      {
        "models": 1,
        "points": 75
      },
      {
        "models": 2,
        "points": 140
      }
    ],
    "flavor": "These sleek skimmers offer a perfect compromise between the speed of a jetbike and the heavier armament of a grav-tank. Well-drilled Vyper squadrons move as one at breakneck speeds, evincing incredible grace as their seated gunners blast at the vulnerable rear armour of tanks or harass the flanks of infantry squads.",
    "profiles": [
      {
        "name": "Vypers",
        "m": "14\"",
        "t": "6",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Missile launcher – starshot",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Harassment Fire",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "composition": [
      "1-2 Vypers"
    ],
    "loadout": "**Every model is equipped with:** shuriken cannon; bright lance; wraithbone hull.",
    "options": [
      "Any number of models can each have their bright lance replaced with one of the following:\n▪ 1 scatter laser\n▪ 1 starcannon",
      "Any number of models can each have their shuriken cannon replaced with 1 missile launcher."
    ],
    "keywords": [
      "Vypers",
      "Vehicle",
      "Aeldari",
      "Fly"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "war-walkers",
    "name": "War Walkers",
    "points": [
      {
        "models": 1,
        "points": 80
      },
      {
        "models": 2,
        "points": 160
      }
    ],
    "flavor": "The graceful, bipedal War Walkers often take to the field in the vanguard of Asuryani armies. Highly agile, they are also heavily armed, carrying two heavy weapons to eliminate foes before they can strike back. A formidable power field of invisible energy protects each War Walker, blurring and distorting its outline and shielding the pilot.",
    "profiles": [
      {
        "name": "War Walkers",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Missile launcher – starshot",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "War Walker feet",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 9\"",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Crystalline Targeting",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly AELDARI unit makes an attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. Each unit can only be selected for this ability once per turn."
      }
    ],
    "composition": [
      "1-2 War Walkers"
    ],
    "loadout": "**Every model is equipped with:** 2 shuriken cannons; War Walker feet.",
    "options": [
      "Each model can have each shuriken cannon it is equipped with replaced with one of the following:\n▪ 1 missile launcher\n▪ 1 bright lance\n▪ 1 scatter laser\n▪ 1 starcannon"
    ],
    "keywords": [
      "Aeldari",
      "War Walkers",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Seers who have trained as Aspect Warriors find it easier to develop destructive psychic powers. These Aeldari are called Warlocks. In battle, they frequently band together in conclaves to pool their eldritch power, or else lead other Aeldari squads such as Guardians from the front. Casting the runes of battle, they wreak havoc on the foe.",
    "profiles": [
      {
        "name": "Warlock",
        "m": "7\"",
        "t": "3",
        "sv": "6+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Destructor",
        "tags": [
          "PSYCHIC",
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
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Singing spear",
        "tags": [
          "ASSAULT",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Singing spear",
        "tags": [
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Runes of Fortune (Psychic)",
        "text": "Each time an enemy unit declares a charge, if one or more units with this ability are selected as a target of that charge, subtract 2 from the Charge roll."
      },
      {
        "name": "Psychic Communion (Psychic)",
        "text": "Each time this model is selected to shoot, until the end of the phase, add 1 to the Attacks and Strength characteristics of its Destructor weapon for each other friendly Aeldari Psyker model within 6\" of this model (to a maximum of +2)."
      }
    ],
    "composition": [
      "1 Warlock"
    ],
    "loadout": "**This model is equipped with:** Destructor; shuriken pistol; witchblade.",
    "options": [
      "This model’s witchblade can be replaced with 1 singing spear."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Storm Guardians",
        "Guardian Defenders"
      ],
    },
    "keywords": [
      "Warlock",
      "Aeldari",
      "Infantry",
      "Character",
      "Psyker"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "warlock-conclave",
    "name": "Warlock Conclave",
    "points": [
      {
        "models": 2,
        "points": 55
      },
      {
        "models": 4,
        "points": 120
      }
    ],
    "flavor": "When Warlocks gather into battle conclaves, they pool their psychic might to defend their fellow Aeldari better and excoriate the foe with arcing storms ofempyric destruction. Wielding shimmering singing spears and witch blades with the skill of those trained on the Path of the Warrior, they also punish their enemies at close quarters.",
    "profiles": [
      {
        "name": "Warlock Conclave",
        "m": "7\"",
        "t": "3",
        "sv": "6+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Destructor",
        "tags": [
          "PSYCHIC",
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
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Singing spear",
        "tags": [
          "ASSAULT",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Singing spear",
        "tags": [
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Protect (Psychic)",
        "text": "While a Farseer model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll."
      },
      {
        "name": "Psychic Communion (Psychic)",
        "text": "Each time this unit is selected to shoot, for each Warlock model in this unit, until the end of the phase, add 1 to the Attacks and Strength characteristics of that model’s Destructor weapon for each other friendly Aeldari Psyker model within 6\" of that model (to a maximum of +2)."
      }
    ],
    "composition": [
      "2-4 Warlocks"
    ],
    "loadout": "**Every model is equipped with:** Destructor; shuriken pistol; witchblade.",
    "options": [
      "Any number of models can each have their witchblade replaced with 1 singing spear."
    ],
    "keywords": [
      "Aeldari",
      "Infantry",
      "Psyker",
      "Warlocks",
      "Warlock Conclave"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "32mm",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Guardian Defenders",
        "Storm Guardians"
      ]
    }
  },
  {
    "id": "warlock-skyrunners",
    "name": "Warlock Skyrunners",
    "points": [
      {
        "models": 1,
        "points": 45
      },
      {
        "models": 2,
        "points": 90
      }
    ],
    "flavor": "Jetbikes add great speed to Warlocks’ already formidable array of powers. Many craftworlds deploy entire Skyrunner conclaves, although such formations are especially common in the Wild Rider clans of Saim-Hann.",
    "profiles": [
      {
        "name": "Warlock Skyrunner",
        "m": "14\"",
        "t": "4",
        "sv": "6+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Destructor",
        "tags": [
          "PSYCHIC",
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
        "name": "Shuriken pistol",
        "tags": [
          "ASSAULT",
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
        "name": "Singing spear",
        "tags": [
          "ASSAULT",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Singing spear",
        "tags": [
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Witchblade",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Runes of Battle (Psychic)",
        "text": "Weapons equipped by models in this unit have the [IGNORES COVER] ability."
      },
      {
        "name": "Psychic Communion (Psychic)",
        "text": "Each time this unit is selected to shoot, for each Warlock model in this unit, until the end of the phase, add 1 to the Attacks and Strength characteristics of that model’s Destructor weapon for each other friendly Aeldari Psyker model within 6\" of that model (to a maximum of +2)."
      }
    ],
    "composition": [
      "1-2 Warlock Skyrunners"
    ],
    "loadout": "**Every model is equipped with:** Destructor; shuriken pistol; twin shuriken catapult; witchblade.",
    "options": [
      "Any number of models can each have their witchblade replaced with 1 singing spear."
    ],
    "keywords": [
      "Aeldari",
      "Mounted",
      "Warlocks",
      "Warlock Skyrunner Conclave",
      "Psyker",
      "Fly"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Small Flying Base",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Windriders"
      ]
    }
  },
  {
    "id": "warp-spiders",
    "name": "Warp Spiders",
    "points": [
      {
        "models": 5,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 200,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 125,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 220,
        "note": "3rd+"
      }
    ],
    "flavor": "Warp Spiders attack without warning. They do this with their jump generators – arcane dimensional devices that allow them to make short but dangerous leaps through the immaterium. When they return to reality, Warp Spiders fire clouds of razor-sharp monofilament wire at the foe, slicing them apart as they writhe in a doomed effort to escape.",
    "profiles": [
      {
        "name": "WARP SPIDER",
        "m": "12\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      },
      {
        "name": "WARP SPIDER EXARCH",
        "m": "12\"",
        "t": "3",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "baseSize": "28.5mm"
      }
    ],
    "ranged": [
      {
        "name": "Death spinner",
        "tags": [
          "IGNORES COVER",
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
        "name": "Death weavers",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "6\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Exarch’s death spinner",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Spinneret rifle",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "D6",
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
        "a": "2",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Powerblade array",
        "tags": [
          "LETHAL HITS",
          "TWIN-LINKED"
        ],
        "a": "10",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Powerblades",
        "tags": [
          "LETHAL HITS",
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Flickerjump",
        "text": "In your Movement phase, each time this unit is selected to make a Normal move, it can use this ability. If it does, until the end of the turn, this unit is not eligible to declare a charge and models in it have a Move characteristic of 24\". Each time this unit uses this ability, at the end of the phase, roll one D6 for each model in this unit: for each 1, this unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Aspect Shrine Token",
        "text": "Once per battle for each Aspect Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a model in this unit (excluding CHARACTER models) to an unmodified 6.\n\n**Designer’s Note:** Place an Aspect Shrine token next to the unit for each Aspect Shrine token it has, removing one each time this ability is used."
      }
    ],
    "composition": [
      "1 Warp Spider Exarch",
      "4-9 Warp Spiders"
    ],
    "loadout": "**The Warp Spider Exarch is equipped with:** Exarch’s death spinner; close combat weapon.\n\n**Every Warp Spider is equipped with:** death spinner; close combat weapon.",
    "options": [
      "The Warp Spider Exarch’s Exarch’s death spinner can be replaced with one of the following:\n▪ 1 spinneret rifle and 1 death weavers\n▪ 1 powerblades and 1 death weavers\n▪ 1 powerblade array",
      "For every 5 models in this unit, it can have 1 Aspect Shrine token."
    ],
    "keywords": [
      "Aeldari",
      "Infantry",
      "Aspect Warriors",
      "Warp Spiders",
      "Jump Pack",
      "Fly"
    ],
    "factionKeywords": [
      "Asuryani"
    ]
  },
  {
    "id": "wave-serpent",
    "name": "Wave Serpent",
    "points": [
      {
        "models": 1,
        "points": 115,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 125,
        "note": "4th+"
      }
    ],
    "flavor": "The leading troop carriers in a craftworld’s arsenal, Wave Serpents transport warriors to any part of the battlefield at immense speeds. These troops are protected by a powerful energy field and receive covering fire from the vehicle’s powerful array of heavy weapons.",
    "profiles": [
      {
        "name": "Wave Serpent",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "13",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin missile launcher – starshot",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Twin missile launcher – sunburst",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin bright lance",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Twin scatter laser",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin shuriken cannon",
        "tags": [
          "LETHAL HITS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin starcannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Wraithbone hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Wave Serpent Shield",
        "text": "Each time a ranged attack targets this model, if the Strength characteristic of that attack is greater than the Toughness characteristic of this model, subtract 1 from the Wound roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Wave Serpent"
    ],
    "loadout": "**This model is equipped with:** twin shuriken cannon; twin shuriken catapult; wraithbone hull.",
    "options": [
      "This model’s twin shuriken cannon can be replaced with one of the following:\n▪ 1 twin missile launcher\n▪ 1 twin bright lance\n▪ 1 twin scatter laser\n▪ 1 twin starcannon",
      "This model’s twin shuriken catapult can be replaced with 1 shuriken cannon."
    ],
    "transport": "This model has a transport capacity of 12 ASURYANI INFANTRY models. Each WRAITH CONSTRUCT model takes the space of 2 models. It cannot transport JUMP PACK models or YNNARI models (excluding ASURYANI, YVRAINE and THE VISARCH models).",
    "keywords": [
      "Vehicle",
      "Aeldari",
      "Transport",
      "Dedicated Transport",
      "Fly",
      "Wave Serpent",
      "Frame"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "windriders",
    "name": "Windriders",
    "points": [
      {
        "models": 3,
        "points": 80
      },
      {
        "models": 6,
        "points": 170
      }
    ],
    "flavor": "The jetbikes ridden by the Windriders can cross leagues in the space of a few heartbeats, and to master such incredible machines takes great skill. Windriders are expected to do this and more, for in battle they must be able to shred what resistance they encounter with devastating bursts of fire from their jetbikes’ attached weapons.",
    "profiles": [
      {
        "name": "Windriders",
        "m": "14\"",
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
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin shuriken catapult",
        "tags": [
          "ASSAULT",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Swift Demise",
        "text": "Each time a model in this unit makes a ranged attack, re-roll a Hit roll of 1. If the target of that attack is the closest eligible target, you can re-roll the Hit roll instead."
      }
    ],
    "composition": [
      "3-6 Windriders"
    ],
    "loadout": "**Every model is equipped with:** twin shuriken catapult; close combat weapon.",
    "options": [
      "Any number of models can each have their twin shuriken catapult replaced with one of the following:\n▪ 1 scatter laser\n▪ 1 shuriken cannon"
    ],
    "keywords": [
      "Fly",
      "Windriders",
      "Aeldari",
      "Mounted"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "wraithblades",
    "name": "Wraithblades",
    "points": [
      {
        "models": 5,
        "points": 140
      }
    ],
    "flavor": "Wraithblades are inhabited by wrathful spirits who are eager to get to grips with the foe. Armed with ghostswords or ghostaxes, they cleave their foes apart, each blow driven further by the power of the spirit stones implanted into the weapons. These stones are inhabited by malevolent souls that rage against their confinement.",
    "profiles": [
      {
        "name": "Wraithblades",
        "m": "6\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "melee": [
      {
        "name": "Ghostaxe",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ghostswords",
        "tags": [],
        "a": "5",
        "ws": "4+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "abilities": [
      {
        "name": "Malevolent Souls",
        "text": "Each time a model in this unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 3+, do not remove it from play; that destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Psychic Guidance",
        "text": "While this unit is within 12\" of one or more friendly Aeldari Psyker models, models in this unit have a Leadership characteristic of 6+ and each time a model in this unit makes an attack, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Forceshield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "5 Wraithblades"
    ],
    "loadout": "**Every model is equipped with:** ghostswords.",
    "options": [
      "All of the models in this unit can each have their ghostswords replaced with 1 ghostaxe and 1 forceshield."
    ],
    "keywords": [
      "Aeldari",
      "Wraith Construct",
      "Wraithblades",
      "Infantry"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wraithguard",
    "name": "Wraithguard",
    "points": [
      {
        "models": 5,
        "points": 145
      }
    ],
    "flavor": "Wraithguard are all but impervious to pain. This is vitally important, for their D-scythes and wraithcannons are short-ranged, and require them to advance close to the foe. These immensely powerful weapons fire arcane beams that open a momentary rift between realspace and the warp, capable of tearing any target apart.",
    "profiles": [
      {
        "name": "Wraithguard",
        "m": "6\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Wraithcannon",
        "tags": [],
        "range": "18\"",
        "a": "1",
        "bs": "4+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "D-scythe",
        "tags": [
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "7",
        "ap": "-3",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "abilities": [
      {
        "name": "War Construct",
        "text": "This unit is eligible to shoot in a turn in which it Fell Back."
      },
      {
        "name": "Psychic Guidance",
        "text": "While this unit is within 12\" of one or more friendly Aeldari Psyker models, models in this unit have a Leadership characteristic of 6+ and each time a model in this unit makes an attack, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "5 Wraithguard"
    ],
    "loadout": "**Every model is equipped with:** wraithcannon; close combat weapon.",
    "options": [
      "All of the models in this unit can each have their wraithcannon replaced with 1 D-scythe."
    ],
    "keywords": [
      "Infantry",
      "Aeldari",
      "Wraith Construct",
      "Wraithguard"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wraithknight",
    "name": "Wraithknight",
    "points": [
      {
        "models": 1,
        "points": 385,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 405,
        "note": "2nd+"
      }
    ],
    "flavor": "Wraithknights are as elegantly sinister as they are lethal. Their graceful build and slender limbs belie their tremendous resilience. They move with agility utterly at odds with their colossal size, bounding into position before unleashing firepower of a magnitude capable of eradicating squadrons of enemy armour, devastating infantry phalanxes and turning the tide of battle.",
    "profiles": [
      {
        "name": "Wraithknight",
        "m": "12\"",
        "t": "12",
        "sv": "2+",
        "w": "18",
        "ld": "6+",
        "oc": "10"
      }
    ],
    "ranged": [
      {
        "name": "Heavy wraithcannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "20",
        "ap": "-4",
        "d": "2D6"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Suncannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+4",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Titanic feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Titanic Strides",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and sections of terrain features that are 4\" or less in height. When doing so:\n▪ It can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them.\n▪ It can also move through sections of terrain features that are more than 4\" in height, but if it does, after it has moved, roll one D6: on a 1, this model is Battle-shocked."
      },
      {
        "name": "Point-blank Devastation",
        "text": "Each time this model’s heavy wraithcannon or suncannon targets a unit within half range, you can re-roll the dice to determine the number of attacks made."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Scattershield",
        "text": "The bearer has a 4+ invulnerable save and each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Wraithknight"
    ],
    "loadout": "**This model is equipped with:** suncannon; titanic feet; scattershield.",
    "options": [
      "This model's suncannon can be replaced with 1 heavy wraithcannon.",
      "This model’s scattershield can be replaced with 1 heavy wraithcannon.",
      "This model can be equipped with up to two of the following:\n▪ 1 scatter laser\n▪ 1 shuriken cannon\n▪ 1 starcannon"
    ],
    "keywords": [
      "Titanic",
      "Towering",
      "Aeldari",
      "Walker",
      "Wraithknight",
      "Wraith Construct",
      "Monster"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "wraithknight-with-ghostglaive",
    "name": "Wraithknight with Ghostglaive",
    "points": [
      {
        "models": 1,
        "points": 380,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 400,
        "note": "2nd+"
      }
    ],
    "flavor": "Some Wraithknights sweep into battle armed with titanic ghostglaives - close-quarters weapons of such fearsome size that they allow their wielders to skewer armoured combat walkers or sweep away entire ranks of foes with every blow. Coupled with the Wraithknight’s heavy firepower, this is a terrifying prospect.",
    "profiles": [
      {
        "name": "Wraithknight",
        "m": "12\"",
        "t": "12",
        "sv": "2+",
        "w": "18",
        "ld": "6+",
        "oc": "10"
      }
    ],
    "ranged": [
      {
        "name": "Heavy wraithcannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "20",
        "ap": "-4",
        "d": "2D6"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Titanic ghostglaive – strike",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "16",
        "ap": "-3",
        "d": "6"
      },
      {
        "name": "Titanic ghostglaive – sweep",
        "tags": [],
        "a": "15",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Battle Focus",
    "abilities": [
      {
        "name": "Titanic Agility",
        "text": "Each time this model makes a Normal, Advance or Fall Back move, it can move through models and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Scattershield",
        "text": "The bearer has a 4+ invulnerable save and each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, subtract 5 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Wraithknight"
    ],
    "loadout": "**This model is equipped with:** titanic ghostglaive; scattershield.",
    "options": [
      "This model’s scattershield can be replaced with 1 heavy wraithcannon.",
      "This model can be equipped with up to two of the following:\n▪ 1 scatter laser\n▪ 1 shuriken cannon\n▪ 1 starcannon"
    ],
    "keywords": [
      "Titanic",
      "Monster",
      "Walker",
      "Wraith Construct",
      "Wraithknight with Ghostglaive",
      "Aeldari",
      "Towering"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "wraithlord",
    "name": "Wraithlord",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Wraithlords are lithe, towering wraithbone constructs powered by the spirit of a fallen Aeldari hero. These mighty ghost warriors can wield a swathe of armaments, ranging from energised fists and sentient scimitars to heavy weapons capable of destroying battle tanks or infantry squads at a distance.",
    "profiles": [
      {
        "name": "Wraithlord",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "10",
        "ld": "8+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Bright lance",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Flamer",
        "tags": [
          "ASSAULT",
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
        "name": "Missile launcher – starshot",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Missile launcher – sunburst",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Scatter laser",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shuriken cannon",
        "tags": [
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Shuriken catapult",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Starcannon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Ghostglaive – strike",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Ghostglaive – sweep",
        "tags": [],
        "a": "8",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Wraithbone fists",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1",
    "abilities": [
      {
        "name": "Fated Hero",
        "text": "At the start of the battle, select one of the following keywords: INFANTRY; MONSTER; MOUNTED; VEHICLE. Each time this model makes an attack that targets a unit with the selected keyword, re-roll a Hit roll of 1 and re-roll a Wound roll of 1."
      },
      {
        "name": "Psychic Guidance",
        "text": "While this model is within 12\" of one or more friendly Aeldari Psyker models, improve the Ballistic Skill and Weapon Skill characteristics of weapons equipped by this model by 1 and it has a Leadership characteristic of 6+."
      }
    ],
    "composition": [
      "1 Wraithlord"
    ],
    "loadout": "**This model is equipped with:** 2 shuriken catapults; wraithbone fists.",
    "options": [
      "Each of this model's shuriken catapults can be replaced with 1 flamer.",
      "This model can be equipped with 1 ghostglaive.",
      "This model can be equipped with up to two of the following:\n▪ 1 missile launcher\n▪ 1 bright lance\n▪ 1 scatter laser\n▪ 1 shuriken cannon\n▪ 1 starcannon"
    ],
    "keywords": [
      "Wraithlord",
      "Wraith Construct",
      "Walker",
      "Monster",
      "Aeldari"
    ],
    "factionKeywords": [
      "Asuryani"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "ynnari-archon",
    "name": "Ynnari Archon",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Archons are the rulers of the terrifying Drukhari private armies and crime syndicates known as kabals. Those who have pledged themselves to the Ynnari faith bring all their malicious cunning and murderous skill to bear in its name, along with the military might of the Kabal they lead. Wielding eldritch weapons and veiled by shrouding shadowfields, they are powerful allies indeed.",
    "profiles": [
      {
        "name": "Ynnari Archon",
        "m": "8\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "2+",
        "invNote": "* See Shadow Field ability (below)"
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
        "name": "Huskblade",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "5",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Overlord",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, re-roll a Wound roll of 1. While that unit is below its Starting Strength, each time a model in that unit makes an attack, you can re-roll the Wound roll instead."
      },
      {
        "name": "Reborn Mastermind",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Shadow Field",
        "text": "You cannot re-roll invulnerable saving throws made for the bearer. The first time an invulnerable saving throw made for the bearer is failed, until the end of the battle, the bearer has no invulnerable save."
      }
    ],
    "composition": [
      "1 Archon"
    ],
    "loadout": "**This model is equipped with:** splinter pistol; huskblade; shadow field.",
    "options": [
      "This model’s splinter pistol can be replaced with 1 blast pistol."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Ynnari Kabalite Warriors",
        "Ynnari Incubi"
      ]
    },
    "keywords": [
      "Aeldari",
      "Infantry",
      "Character",
      "Archon"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "ynnari-incubi",
    "name": "Ynnari Incubi",
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
    "flavor": "The Incubi are dark mirrors of Aeldari Aspect Warriors, mercenary killers of tremendous skill who study the ways of their murderous craft in dark shrines of battle. Wielding thrumming energy blades with consummate cruelty, some of these Drukhari elites fight in the armies of the Ynnari, whether through genuine zeal or simply because some patron Archon has made it worth their while.",
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
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Demiklaives – dual blades",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Klaive",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Tormentors",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Klaivex",
      "4-9 Incubi"
    ],
    "loadout": "**Every model is equipped with:** klaive.",
    "options": [
      "The Klaivex’s klaive can be replaced with 1 demiklaives."
    ],
    "keywords": [
      "Incubi",
      "Aeldari",
      "Infantry"
    ],
    "factionKeywords": [
      "Ynnari"
    ]
  },
  {
    "id": "ynnari-kabalite-warriors",
    "name": "Ynnari Kabalite Warriors",
    "points": [
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "Kabalite Warriors provide the strength of the Commorrite kabals. Arrogant, martially skilled and steeped in depths of sadism to which only the extremes of the Aeldari psyche could stretch, these malevolent warrior bands literally feed off the suffering and terror of their victims. To gather their dark sustenance while killing in Ynnead’s name is no great hardship for monsters like these.",
    "profiles": [
      {
        "name": "Ynnari Kabalite Warriors",
        "m": "8\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "6+",
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
        "name": "Sybarite weapon",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Sadistic Raiders",
        "text": "At the end of your Command phase, if you control an objective marker that this unit (or a Transport it is embarked within) is within range of, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Phantasm Grenade Launcher",
        "text": "The bearer’s unit has the Grenades keyword."
      }
    ],
    "composition": [
      "1 Sybarite",
      "9 Kabalite Warriors"
    ],
    "loadout": "**Every model is equipped with:** splinter rifle; close combat weapon.",
    "options": [
      "The Sybarite’s close combat weapon can be replaced with 1 Sybarite weapon.",
      "The Sybarite can be equipped with 1 phantasm grenade launcher.",
      "The Sybarite’s splinter rifle can be replaced with one of the following:\n▪ 1 blast pistol\n▪ 1 splinter pistol",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 blaster.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 dark lance.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 shredder.",
      "1 Kabalite Warrior’s splinter rifle can be replaced with 1 splinter cannon."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Kabalite Warriors",
      "Aeldari"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "ynnari-raider",
    "name": "Ynnari Raider",
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
    "flavor": "Skimming low over the battlefield on screaming thrusters, Raiders bear murderous bands of Drukhari into battle with blistering speed. They are much favoured by the fanatical worshippers of Ynnead, allowing them to plunge into the heart of the foe’s lines and unleash a veritable hurricane of death and devastation before swiftly relocating to strike again elsewhere.",
    "profiles": [
      {
        "name": "Ynnari Raider",
        "m": "14\"",
        "t": "8",
        "sv": "4+",
        "w": "10",
        "ld": "6+",
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
        "s": "5",
        "ap": "-2",
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
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Firing Deck 11",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Aethersails",
        "text": "Each time this model Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of this model."
      }
    ],
    "composition": [
      "1 Raider"
    ],
    "loadout": "**This model is equipped with:** dark lance; bladevanes.",
    "options": [
      "This model’s dark lance can be replaced with 1 disintegrator cannon."
    ],
    "transport": "This model has a transport capacity of 11 models from the following units: The Visarch, Ynnari Archon, Ynnari Incubi, Ynnari Kabalite Warriors, Ynnari Succubus, Ynnari Wyches, Yvraine",
    "keywords": [
      "Dedicated Transport",
      "Fly",
      "Raider",
      "Aeldari",
      "Transport",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "ynnari-reavers",
    "name": "Ynnari Reavers",
    "points": [
      {
        "models": 3,
        "points": 65
      },
      {
        "models": 6,
        "points": 120
      }
    ],
    "flavor": "Black-hearted gladiatorial racers who battle one another around the Commorrite arenas, Reavers ride bladed jetbikes bristling with devastating firepower. Those amongst the Ynnari hosts serve as bloodthirsty shock 1 cavalry that blitz through the enemy battle lines, raking them with envenomed splinters and beams of ravening energy even as they lop off heads and limbs.",
    "profiles": [
      {
        "name": "Ynnari Reavers",
        "m": "16\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
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
        "name": "Agoniser",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Bladevanes",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Eviscerating Fly-by",
        "text": "Each time this unit ends a Normal move, you can select one enemy unit (excluding MONSTER and VEHICLE units) that it moved over during that move. If you do, roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Cluster Caltrops",
        "text": "Each time you roll to inflict wounds using this unit’s Eviscerating Fly-by ability, you can re-roll one D6 for each model in this unit equipped with cluster caltrops."
      },
      {
        "name": "Grav-talon",
        "text": "The bearer’s melee weapons have the [LANCE] ability."
      }
    ],
    "composition": [
      "1 Arena Champion",
      "2-5 Reavers"
    ],
    "loadout": "**Every model is equipped with:** splinter pistol; splinter rifle; bladevanes.",
    "options": [
      "The Arena Champion can be equipped with 1 agoniser.",
      "For every 3 models in this unit, 1 model’s splinter rifle can be replaced with one of the following:\n▪ 1 blaster\n▪ 1 heat lance",
      "For every 3 models in this unit, 1 model can be equipped with one of the following:\n▪ 1 grav-talon\n▪ 1 cluster caltrops"
    ],
    "keywords": [
      "Reavers",
      "Aeldari",
      "Mounted",
      "Fly"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "ynnari-succubus",
    "name": "Ynnari Succubus",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "In the Dark City of Commorragh, the Succubi are the champions of nightmarish gladiatorial arenas. Upon the battlefields of realspace and when fighting for the Ynnari cause, these same hyper-gladiatorial masters of murder instead use their skills to reap a rich harvest of lives in the name of their macabre god.",
    "profiles": [
      {
        "name": "Ynnari Succubus",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
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
        "name": "Succubus weapons",
        "tags": [
          "ANTI-INFANTRY 3+"
        ],
        "a": "6",
        "ws": "2+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Storm of Blades",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Empowered by Death",
        "text": "At the start of the Fight phase, if this model’s unit is below its Starting Strength, until the end of the phase, models in that unit have the Fights First ability."
      }
    ],
    "composition": [
      "1 Succubus"
    ],
    "loadout": "**This model is equipped with:** Succubus weapons.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 blast pistol\n▪ 1 splinter pistol"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Ynnari Wyches"
      ]
    },
    "keywords": [
      "Character",
      "Succubus",
      "Aeldari",
      "Infantry"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "ynnari-venom",
    "name": "Ynnari Venom",
    "points": [
      {
        "models": 1,
        "points": 65,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 75,
        "note": "4th+"
      }
    ],
    "flavor": "When the Drukhari fight alongside their Asuryani cousins in the cause of Ynnead, some ride into battle aboard needle-swift Venoms. Similar to the Vyper, these upscaled jetbikes serve more like airborne chariots that bear small bands of murderous Drukhari into the fight. So mounted, the worshippers of Ynnead are all but inescapable, pouncing swiftly upon their luckless prey.",
    "profiles": [
      {
        "name": "Venom",
        "m": "14\"",
        "t": "6",
        "sv": "4+",
        "w": "6",
        "ld": "6+",
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
          "RAPID FIRE 1",
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
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike, Firing Deck 6, Stealth",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Lithe Embarkation",
        "text": "At the end of the Fight phase, if there are no models currently embarked within this TRANSPORT, you can select one friendly Ynnari Infantry unit that only includes models from the units listed in this unit’s Transport section, that has 6 or fewer models and that is wholly within 6\" of this TRANSPORT. Unless that unit is within Engagement Range of one or more enemy units, it can embark within this TRANSPORT. That unit can embark within this TRANSPORT in a turn it disembarked from this TRANSPORT."
      }
    ],
    "composition": [
      "1 Venom"
    ],
    "loadout": "**This model is equipped with:** splinter cannon; twin splinter rifle; bladevanes.",
    "options": [
      "This model’s twin splinter rifle can be replaced with 1 splinter cannon."
    ],
    "transport": "This model has a transport capacity of 6 models from the following units: The Visarch, Ynnari Archon, Ynnari Incubi, Ynnari Kabalite Warriors, Ynnari Succubus, Ynnari Wyches, Yvraine.\n\nBefore the battle, at the start of the Declare Battle Formations step, you can select one YNNARI KABALITE WARRIORS or YNNARI WYCHES unit from your army that has not already been split. If you do, that unit is split into two units, each containing as equal a number of models as possible (when splitting a unit in this way, make a note of which models form each of the two new units). One of these units must start the battle embarked within this TRANSPORT; the other can start the battle embarked within another TRANSPORT, or it can be deployed as a separate unit.",
    "keywords": [
      "Dedicated Transport",
      "Transport",
      "Aeldari",
      "Vehicle",
      "Venom",
      "Fly",
      "Frame"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "ynnari-wyches",
    "name": "Ynnari Wyches",
    "points": [
      {
        "models": 10,
        "points": 90
      }
    ],
    "flavor": "Attacking in a lithe blizzard of lashing blades, spitting splinters and impossibly agile acrobatics, Drukhari Wyches put all their gladiatorial skills to use as they fall upon their foes. Those who have dedicated themselves to Ynnead fight in the knowledge that - even should they fall to the desperate counterattacks of their foes - the bloodshed serves a higher purpose.",
    "profiles": [
      {
        "name": "Ynnari Wyches",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "6+",
        "oc": "2",
        "inv": "6+",
        "invNote": "* 4+ against melee attacks only"
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
        "name": "Hekatarii blade",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "No Escape",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of one or more units from your army with this ability is selected to Fall Back, models in that enemy unit must take Desperate Escape tests as if their unit was Battle-shocked. When doing so, if that enemy unit is also Battle-shocked by other means, subtract 1 from each of those Desperate Escape tests."
      }
    ],
    "composition": [
      "1 Hekatrix",
      "9 Wyches"
    ],
    "loadout": "**Every model is equipped with:** splinter pistol; Hekatarii blade.",
    "options": [
      "The Hekatrix’s splinter pistol can be replaced with 1 blast pistol."
    ],
    "keywords": [
      "Infantry",
      "Wyches",
      "Grenades",
      "Aeldari",
      "Battleline"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "yvraine",
    "name": "Yvraine",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Yvraine wields the Cronesword Kha-vir, the Sword of Sorrows, which can turn an enemy to ash with the slightest touch. The power of Ynnead manifests in her when she enters battle, to the extent that the Reborn warriors that fight around her are transformed into bloody blurs of violence.",
    "profiles": [
      {
        "name": "Yvraine",
        "m": "8\"",
        "t": "3",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Storm of Whispers",
        "tags": [
          "ANTI-INFANTRY 2+",
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "2+",
        "s": "2",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Kha-vir",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Battle Focus, Disparate Paths",
    "abilities": [
      {
        "name": "Word of the Phoenix (Psychic)",
        "text": "While this model is leading a unit, in your Command phase, roll one D6: on a 2+, D3+1 destroyed Bodyguard models (excluding Support Weapon models) are returned to that unit with their full wounds remaining."
      },
      {
        "name": "Herald of Ynnead",
        "text": "**Herald of Ynnead:** At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time a friendly AELDARI model makes an attack that targets that unit, you can re-roll a Wound roll of 1."
      }
    ],
    "specialAbilities": [
      {
        "name": "SERVANT OF THE WHISPERING GOD",
        "text": "If your army includes YVRAINE, it cannot include any Epic Hero units (excluding Ynnari units). If your army includes any EPIC HERO units (excluding YNNARI units), it cannot include YVRAINE."
      }
    ],
    "composition": [
      "1 Yvraine – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Storm of Whispers; Kha-vir.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Ynnari Wyches",
        "Ynnari Incubi",
        "Ynnari Kabalite Warriors",
        "Storm Guardians",
        "Corsair Voidscarred",
        "Corsair Voidreavers",
        "Guardian Defenders"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Aeldari",
      "Psyker",
      "Yvraine",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Ynnari"
    ],
    "baseSize": "74x42mm Oval Base"
  }
]
