// Chaos Daemons — datasheets. Unit roster and points from src/data/mfm/chaos-daemons.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "belakor",
    "name": "Be’lakor",
    "points": [
      {
        "models": 1,
        "points": 390
      }
    ],
    "flavor": "Few warp entities are as mighty or as insidious as Be’lakor. Wreathed in shadow and dancing witchlight, the Dark Master spreads terror and torment to all who behold him. Every blow of his Blade of Shadows leaves the hollow husks of slain enemies sprawled in its wake – just more victims lost to the encroaching darkness.",
    "profiles": [
      {
        "name": "Be’lakor",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Betraying Shades – witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "9",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Betraying Shades – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "12",
        "bs": "2+",
        "s": "6",
        "ap": "-3",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "The Blade of Shadows – strike",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "The Blade of Shadows – sweep",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "14",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Stealth",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "The Dark Master (Aura)",
        "text": "The area of the battlefield within 6\" of this model is within your army’s Shadow of Chaos."
      },
      {
        "name": "Shadow Form Abilities",
        "text": "At the start of the battle round, select one Shadow Form ability. Until the end of the battle round, this model has that ability."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Be’lakor – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Betraying Shades; the Blade of Shadows.",
    "options": [
      "None"
    ],
    "keywords": [
      "Psyker",
      "Character",
      "Epic Hero",
      "Fly",
      "Monster",
      "Be’lakor",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your Warlord."
      }
    ],
    "abilitySets": [
      {
        "name": "Shadow Form Abilities",
        "options": [
          {
            "name": "Wreathed in Shadows (Aura, Psychic)",
            "text": "While a friendly Legiones Daemonica unit or Shadow Legion unit is within 6\" of this model, that unit can only be targeted by a ranged attack if the attacking model is within 18\"."
          },
          {
            "name": "Pall of Despair (Aura, Psychic)",
            "text": "In the Battle-shock step of your opponent’s Command phase, if an enemy unit that is below its Starting Strength is within 9\" of this model, that unit must take a Battle-shock test. For the purposes of this ability, if a unit has a Starting Strength of 1, it is considered to be below its Starting Strength while it has lost one or more wounds. In addition, for each enemy unit that fails a Battle-shock test within 9\" of this model, this model regains up to D3 lost wounds."
          },
          {
            "name": "Shadow Lord (Aura, Psychic)",
            "text": "While a friendly Legiones Daemonica or Shadow Legion unit is within 6\" of this model, each time a model in that unit makes an attack, re-roll a Hit roll of 1."
          }
        ]
      }
    ]
  },
  {
    "id": "beasts-of-nurgle",
    "name": "Beasts Of Nurgle",
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
    "flavor": "Filled with dim-witted ebullience at odds with their plague-ridden and nightmarish forms, Beasts of Nurgle flollop into battle like eager hounds. They are drawn instinctively to mortal playthings, whose desperate cries and frantic flight they mistake for participation, at least until their luckless new friends have twitched their last.",
    "profiles": [
      {
        "name": "Beasts Of Nurgle",
        "m": "6\"",
        "t": "9",
        "sv": "6+",
        "w": "7",
        "ld": "7+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Putrid appendages",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike, Scouts 6\"",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Grotesque Regeneration",
        "text": "At the end of each phase, if a Beasts of Nurgle model in this unit has lost any wounds but is not destroyed, that model regains all of its lost wounds."
      }
    ],
    "composition": [
      "1-2 Beasts of Nurgle"
    ],
    "loadout": "**Every model is equipped with:** putrid appendages.",
    "options": [
      "None"
    ],
    "keywords": [
      "Beasts of Nurgle",
      "Daemon",
      "Beast",
      "Chaos",
      "Nurgle"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "bloodcrushers",
    "name": "Bloodcrushers",
    "points": [
      {
        "models": 3,
        "points": 95,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "Unholy fusions of daemon and machine, Juggernauts of Khorne are unstoppable beasts whose blood is fire and whose every step is thunder. When ridden into battle by Bloodletters, they act as shock cavalry, bearing down on their victims like battering rams. The destruction when their charge hits home is hideous to behold.",
    "profiles": [
      {
        "name": "Bloodcrushers",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "4",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Hellblade",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Juggernaut’s bladed horn",
        "tags": [
          "EXTRA ATTACKS",
          "LANCE"
        ],
        "a": "4",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Brass Stampede",
        "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of this unit and roll one D6 for each model in this unit: for each 4+, that enemy unit suffers D3 mortal wounds."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Bloodhunter",
      "2-5 Bloodcrushers"
    ],
    "loadout": "**Every model is equipped with:** hellblade; Juggernaut’s bladed horn.",
    "options": [
      "1 Bloodcrusher that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Bloodcrusher that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Bloodcrushers",
      "Daemon",
      "Mounted",
      "Chaos",
      "Khorne"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "bloodletters",
    "name": "Bloodletters",
    "points": [
      {
        "models": 10,
        "points": 110
      }
    ],
    "flavor": "Bloodletters are hate and violence made manifest. Attacking in berserk packs or in martial, marching ranks, they hack apart their victims with monstrous hellblades. These weapons glow red-hot with the fury of their wielders, and even the slightest wound they inflict can see the victim bled dry in seconds.",
    "profiles": [
      {
        "name": "Bloodletters",
        "m": "8\"",
        "t": "4",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Hellblade",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Bane of Cowards",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of one or more units from your army with this ability Falls Back, models in that enemy unit must take Desperate Escape tests. When doing so, if that enemy unit is also Battle-shocked, subtract 1 from each of those Desperate Escape tests."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Bloodreaper",
      "9 Bloodletters"
    ],
    "loadout": "**Every model is equipped with:** hellblade.",
    "options": [
      "1 Bloodletter that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Bloodletter that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Chaos",
      "Daemon",
      "Bloodletters",
      "Khorne"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "bloodmaster",
    "name": "Bloodmaster",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Risen victorious from the horrors of the Skullpit, Bloodmasters lead Khorne’s Bloodletter hosts in battle. The presence of these hulking daemonic slaughterers imbues their infernal followers with even greater fury and might, even as the Bloodmasters themselves carve a gory path through their luckless foes.",
    "profiles": [
      {
        "name": "Bloodmaster",
        "m": "8\"",
        "t": "4",
        "sv": "5+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Blade of blood",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Bloodmaster",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Wound roll."
      },
      {
        "name": "A Gory Path",
        "text": "Each time this model’s unit Consolidates, it can move up to 6\" instead of up to 3\"."
      }
    ],
    "composition": [
      "1 Bloodmaster"
    ],
    "loadout": "**This model is equipped with:** blade of blood.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bloodletters"
      ]
    },
    "keywords": [
      "Character",
      "Bloodmaster",
      "Khorne",
      "Daemon",
      "Chaos",
      "Infantry"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "bloodthirster",
    "name": "Bloodthirster",
    "points": [
      {
        "models": 1,
        "points": 320,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 335,
        "note": "3rd+"
      }
    ],
    "flavor": "Bloodthirsters are supreme warriors, ferocious embodiments of the Blood God’s rage and murderlust. Commanders and champions of the Khornate daemon legions, Bloodthirsters are possessed of supreme martial skill. They wield baroque weapons of appalling power, and slaughter all in their paths.",
    "profiles": [
      {
        "name": "Bloodthirster",
        "m": "12\"",
        "t": "11",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bloodflail",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "16",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Hellfire breath",
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
        "name": "Lash of Khorne",
        "tags": [],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Axe of Khorne – strike",
        "tags": [],
        "a": "8",
        "ws": "2+",
        "s": "14",
        "ap": "-4",
        "d": "D3+1"
      },
      {
        "name": "Axe of Khorne – sweep",
        "tags": [],
        "a": "16",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Great axe of Khorne – strike",
        "tags": [],
        "a": "7",
        "ws": "2+",
        "s": "16",
        "ap": "-4",
        "d": "D6+2"
      },
      {
        "name": "Great axe of Khorne – sweep",
        "tags": [],
        "a": "14",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Daemon Lord of Khorne (Aura)",
        "text": "While a friendly Khorne Legiones Daemonica unit is within 6\" of this model, each time a model in that unit makes a melee attack, add 1 to the Hit roll."
      },
      {
        "name": "Relentless Carnage",
        "text": "At the end of the Fight phase, you can select one enemy unit within Engagement Range of this model and roll eight D6: for each 4+, that enemy unit suffers 1 mortal wound."
      },
      {
        "name": "Greater Daemon of Khorne (Aura)",
        "text": "While a friendly Khorne Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Bloodthirster"
    ],
    "loadout": "**This model is equipped with:** hellfire breath; great axe of Khorne",
    "options": [
      "This model’s great axe of Khorne can be replaced with 1 axe of Khorne and one of the following:\n▪ 1 bloodflail\n▪ 1 lash of Khorne"
    ],
    "keywords": [
      "Daemon",
      "Bloodthirster",
      "Fly",
      "Khorne",
      "Chaos",
      "Monster",
      "Character"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "blue-horrors",
    "name": "Blue Horrors",
    "points": [
      {
        "models": 10,
        "points": 125
      }
    ],
    "flavor": "Blue Horrors are sullen, malevolent entities, as likely to throttle victims with their rubbery fingers out of sheer spite as to melt them like tallow with conjured gouts of mutating warpflame. Should one of these wretched beings be slain, it bursts into a roiling cloud of fume from which a pair of crackling Brimstone Horrors emerge.",
    "profiles": [
      {
        "name": "Blue Horrors",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "8+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Coruscating Blue Flames",
        "tags": [
          "PISTOL",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Coruscating Yellow Flames",
        "tags": [
          "PISTOL",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "2",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Blue claws",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Yellow claws",
        "tags": [],
        "a": "2",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Split",
        "text": "Each time a BLUE HORROR model in this unit is destroyed, after the attacking unit has finished making its attacks, if this unit is not destroyed, roll one D6 for that model. On a 4+, add one BRIMSTONE HORROR model to this unit."
      },
      {
        "name": "Sullen Malevolence (Aura)",
        "text": "While an enemy unit is within 6\" of this unit, if this unit contains one or more BLUE HORROR models, worsen the Leadership characteristic of models in that enemy unit by 1."
      },
      {
        "name": "Exploding Horrors",
        "text": "Each time this unit is selected to fight, you can select one enemy unit within Engagement Range of it, then select one or more BRIMSTONE HORROR models in this unit. For each BRIMSTONE HORROR model you select, roll one D6: on a 4+, that model is destroyed and that enemy unit suffers 1 mortal wound."
      }
    ],
    "composition": [
      "10 Blue Horrors"
    ],
    "loadout": "**Every Blue Horror is equipped with:** Coruscating Blue Flames; blue claws.\n\n**Every Brimstone Horror added to this unit using the Split ability is equipped with:** Coruscating Yellow Flames; yellow claws.",
    "options": [
      "None"
    ],
    "keywords": [
      "Battleline",
      "Infantry",
      "Daemon",
      "Chaos",
      "Tzeentch",
      "Horrors",
      "Blue",
      "Brimstone"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "burning-chariot",
    "name": "Burning Chariot",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "Burning Chariots of Tzeentch are often seen in the visions and nightmares of mortals as blazing omens of ill fortune. Upon the battlefield such warnings become self-fulfilling prophecies, the eldritch war engines serving as the agents of the very devastation and misery their coming is said to warn of.",
    "profiles": [
      {
        "name": "Burning Chariot",
        "m": "12\"",
        "t": "8",
        "sv": "7+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Fire of Tzeentch – blue fire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Fire of Tzeentch – pink fire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Flamer mouths",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Screamer bites",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Eldritch Flames (Psychic)",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit that was hit by one or more of those attacks. Until the end of the phase, that unit cannot have the Benefit of Cover."
      }
    ],
    "composition": [
      "1 Burning Chariot"
    ],
    "loadout": "**This model is equipped with:** Fire of Tzeentch; Flamer mouths; Screamer bites.",
    "options": [
      "None"
    ],
    "keywords": [
      "Mounted",
      "Fly",
      "Chaos",
      "Daemon",
      "Tzeentch",
      "Burning Chariot"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "changecaster",
    "name": "Changecaster",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Whirling amidst capering masses of daemonic Horrors, these Heralds are potent sorcerers whose presence causes the fires of their fellow daemons to spread with infernal vigour. Changecasters unleash storms of mutating sorcery against their enemies, jabbering and cackling as they wreak gruesome havoc.",
    "profiles": [
      {
        "name": "Changecaster",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Arcane Fireball – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Arcane Fireball – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Herald combat weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Changecaster",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Storm of Mutating Sorcery (Psychic)",
        "text": "In your Shooting phase, after this model has shot, select one enemy Infantry unit hit by one or more of those attacks. That unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Changecaster"
    ],
    "loadout": "**This model is equipped with:** Arcane Fireball; Herald combat weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Pink Horrors",
        "Blue Horrors"
      ]
    },
    "keywords": [
      "Psyker",
      "Infantry",
      "Character",
      "Changecaster",
      "Tzeentch",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "contorted-epitome",
    "name": "Contorted Epitome",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "These ghastly daemonic manifestations writhe into battle on nests of metallic tendrils, their leering attendants riding their twisted steeds to war. Each reflects the darkest desires of those who look upon its surface, even as it swallows up the most potent energies thrown against it.",
    "profiles": [
      {
        "name": "Contorted Epitome",
        "m": "9\"",
        "t": "6",
        "sv": "5+",
        "w": "8",
        "ld": "7+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Coiled tentacles",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "D6",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ravaging claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Fights First, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Swallow Energy (Psychic)",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against mortal wounds and Psychic Attacks."
      },
      {
        "name": "Horrible Fascination(Psychic)",
        "text": "At the start of your opponent’s Shooting phase, one Psyker model from your army with this ability can use it. If it does, select one enemy unit within 12\" of and visible to that PSYKER model and roll one D6: on a 1, that PSYKER model suffers D3 mortal wounds; on a 2-5, until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll; on a 6, that enemy unit is not eligible to shoot this phase."
      }
    ],
    "composition": [
      "1 Contorted Epitome"
    ],
    "loadout": "**This model is equipped with:** coiled tentacles; ravaging claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Daemonettes"
      ]
    },
    "keywords": [
      "Slaanesh",
      "Contorted Epitome",
      "Character",
      "Infantry",
      "Psyker",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "daemon-prince-of-chaos",
    "name": "Daemon Prince of Chaos",
    "points": [
      {
        "models": 1,
        "points": 165
      }
    ],
    "flavor": "Blessed with apotheosis from mortal to daemonic form, a Daemon Prince is a monstrous entity well used to commanding cruel legions in battle. Their supernatural gifts are many and varied, from sorcerous powers to diseased fortitude, warp-forged weaponry, unholy swiftness or burning inner furnaces of unquenchable rage.",
    "profiles": [
      {
        "name": "Daemon Prince of Chaos",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal cannon",
        "tags": [],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Hellforged weapons – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Daemonic Lord",
        "text": "While this model is within 3\" of one or more friendly Legiones Daemonica Infantry units, this model has the Lone Operative ability."
      },
      {
        "name": "Prince of Darkness (Aura)",
        "text": "While a friendly Legiones Daemonica unit is within 6\" of this model, models in that unit have the Stealth ability."
      },
      {
        "name": "Unholy Vigour",
        "text": "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, this model has a 3+ invulnerable save."
      }
    ],
    "specialAbilities": [
      {
        "name": "Daemon Prince of Khorne",
        "text": "If this model has the KHORNE keyword, add 2 to the Strength characteristic of this model’s hellforged weapons."
      },
      {
        "name": "Daemon Prince of Tzeentch",
        "text": "If this model has the TZEENTCH keyword, add 3 to the Attacks characteristic of this model’s infernal cannon."
      },
      {
        "name": "Daemon Prince of Nurgle",
        "text": "If this model has the NURGLE keyword, add 1 to this model’s Toughness characteristic."
      },
      {
        "name": "Daemon Prince of Slaanesh",
        "text": "If this model has the SLAANESH keyword, add 2\" to this model’s Move characteristic."
      }
    ],
    "composition": [
      "1 Daemon Prince of Chaos"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "options": [
      "None"
    ],
    "keywords": [
      "Character",
      "Monster",
      "Daemon Prince of Chaos",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60mm",
    "rules": [
      {
        "name": "DAEMONIC ALLEGIANCE",
        "text": "When you select this model to include in your army, you must select one of the following keywords for it to gain:\n▪ KHORNE\n▪ TZEENTCH\n▪ NURGLE\n▪ SLAANESH\nThe keyword you select will also affect some of this model’s characteristics, as stated below."
      }
    ]
  },
  {
    "id": "daemon-prince-of-chaos-with-wings",
    "name": "Daemon Prince Of Chaos With Wings",
    "points": [
      {
        "models": 1,
        "points": 190
      }
    ],
    "flavor": "A Daemon Prince’s obsessive greed and desire to inflict ever more destruction, bloodshed and misery can manifest in the form of hideous wings that speed them from one slaughter to the next. A servant of the Dark Gods so blessed is a horrifying harbinger of death drawn from insane nightmare.",
    "profiles": [
      {
        "name": "Daemon Prince Of Chaos With Wings",
        "m": "12\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal cannon",
        "tags": [],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Hellforged weapons – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Hellforged weapons – sweep",
        "tags": [],
        "a": "14",
        "ws": "2+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Malefic Destruction",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, add 3 to the Attacks characteristic of this model’s hellforged weapons."
      },
      {
        "name": "Harbinger of Death",
        "text": "Each time this model is selected to fight, select one of the following abilities. Until the end of the phase, this model’s hellforged weapons have that ability:\n▪ [LETHAL HITS]\n▪ [PRECISION]\n▪ [SUSTAINED HITS 1]"
      }
    ],
    "composition": [
      "1 Daemon Prince of Chaos with Wings"
    ],
    "loadout": "**This model is equipped with:** infernal cannon; hellforged weapons.",
    "options": [
      "None"
    ],
    "keywords": [
      "Monster",
      "Daemon Prince of Chaos with Wings",
      "Daemon",
      "Fly",
      "Character",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60mm",
    "rules": [
      {
        "name": "DAEMONIC ALLEGIANCE",
        "text": "When you select this model to include in your army, you must select one of the following keywords for it to gain:\n▪ KHORNE\n▪ TZEENTCH\n▪ NURGLE\n▪ SLAANESH\nThe keyword you select will also affect some of this model’s characteristics, as stated below."
      }
    ],
    "abilitySets": [
      {
        "name": "Harbinger of Death",
        "options": [
          {
            "name": "Daemon Prince of Khorne",
            "text": "If this model has the KHORNE keyword, add 2 to the Strength characteristic of this model’s hellforged weapons."
          },
          {
            "name": "Daemon Prince of Tzeentch",
            "text": "If this model has the TZEENTCH keyword, add 3 to the Attacks characteristic of this model’s infernal cannon."
          },
          {
            "name": "Daemon Prince of Nurgle",
            "text": "If this model has the NURGLE keyword, add 1 to this model’s Toughness characteristic."
          },
          {
            "name": "Daemon Prince of Slaanesh",
            "text": "If this model has the SLAANESH keyword, add 2\" to this model’s Move characteristic."
          }
        ]
      }
    ]
  },
  {
    "id": "daemonettes",
    "name": "Daemonettes",
    "points": [
      {
        "models": 10,
        "points": 90
      }
    ],
    "flavor": "Known to mortals as the handmaidens of Slaanesh, these daemons are a mixture of the beautiful and the monstrous, made all the more disturbing by the visceral clash of both. They delight in the carnage of battle, weaving around enemies’ clumsy blows as they shrill and sigh their delight amidst swift-taloned slaughter.",
    "profiles": [
      {
        "name": "Daemonettes",
        "m": "9\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Slashing claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Fights First",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Horrifying Beauty",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units from your army with this ability must take a Battle-shock test, subtracting 1 from the result if that enemy unit is Below Half-strength."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Alluress",
      "9 Daemonettes"
    ],
    "loadout": "**Every model is equipped with:** slashing claws.",
    "options": [
      "1 Daemonette that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Daemonette that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Chaos",
      "Daemon",
      "Daemonettes",
      "Slaanesh"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "epidemius",
    "name": "Epidemius",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Borne upon his throne by a scrabbling mound of Nurglings, Epidemius endlessly catalogues the infinite plagues and maladies released upon realspace by the followers of Nurgle. The higher Epidemius’ tally rises upon any given battlefield, the more favourably the Plague God smiles upon his servants in the vicinity.",
    "profiles": [
      {
        "name": "Epidemius",
        "m": "5\"",
        "t": "5",
        "sv": "6+",
        "w": "8",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Balesword and Nurgling attendants",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "D6+3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Blessed by the Plague God",
        "text": "While this model is leading a unit, models in that unit have a 4+ invulnerable save."
      },
      {
        "name": "Tally of Pestilence",
        "text": "Keep a tally of how many enemy models are destroyed by Nurgle Legiones Daemonica models from your army during the battle. At the start of your Command phase, if this tally is 7 or more, you gain 1CP and the tally is reset to 0."
      }
    ],
    "composition": [
      "1 Epidemius – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** balesword and Nurgling attendants.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plaguebearers"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epidemius",
      "Nurgle",
      "Daemon",
      "Chaos",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "exalted-flamer",
    "name": "Exalted Flamer",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Champions of their kind, Exalted Flamers lead packs of lesser entities to battle. Some swoop upon the backs of Burning Chariots, unleashing focused jets of devastating blue fire, or indiscriminate rains of searing pink fire that clings and spreads like panic given animus until nothing remains in its wake but glowing ashes.",
    "profiles": [
      {
        "name": "Exalted Flamer",
        "m": "9\"",
        "t": "4",
        "sv": "7+",
        "w": "6",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Fire of Tzeentch – blue fire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Fire of Tzeentch – pink fire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Flamer mouths",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Blazing Warpfire (Psychic)",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability."
      },
      {
        "name": "Flames of Change (Psychic)",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks, and roll one D6. On a 4+, until the end of your opponent’s next turn, that enemy unit is aflame. While a unit is aflame, subtract 2\" from its Move characteristic and subtract 2 from Advance and Charge rolls made for it."
      }
    ],
    "composition": [
      "1 Exalted Flamer"
    ],
    "loadout": "**This model is equipped with:** Fire of Tzeentch; Flamer mouths.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Flamers"
      ]
    },
    "keywords": [
      "Exalted Flamer",
      "Fly",
      "Character",
      "Infantry",
      "Chaos",
      "Daemon",
      "Tzeentch"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "75x42mm Oval Base",
    "rules": [
      {
        "name": "MANIFESTATION OF DESTRUCTION",
        "text": "This model cannot be your Warlord and cannot be given Enhancements."
      }
    ]
  },
  {
    "id": "fateskimmer",
    "name": "Fateskimmer",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "These daemons ride upon Burning Chariots, arcane constructs fashioned from the energies of dread omens and foretellings. They hurtle along anarchic and illogical trajectories that defy all physical laws, often surrounded by shoals of predatory daemonic entities empowered and emboldened by the Herald’s presence.",
    "profiles": [
      {
        "name": "Fateskimmer",
        "m": "12\"",
        "t": "7",
        "sv": "6+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Arcane Fireball – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Arcane Fireball – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Herald combat weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Screamer bites",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Fateskimmer",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Rider of the Immaterial Winds",
        "text": "Once per battle, at the end of your opponent’s turn, if this model’s unit is not within Engagement Range of one or more enemy units, you can remove that unit from the battlefield and place it into Strategic Reserves."
      }
    ],
    "composition": [
      "1 Fateskimmer"
    ],
    "loadout": "**This model is equipped with:** Arcane Fireball; Herald combat weapon; Screamer bites.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Screamers"
      ]
    },
    "keywords": [
      "Daemon",
      "Character",
      "Mounted",
      "Fateskimmer",
      "Tzeentch",
      "Chaos",
      "Fly",
      "Psyker"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "feculent-gnarlmaw",
    "name": "Feculent Gnarlmaw",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Where the most grievous foulness reigns, there sprout the Feculent Gnarlmaws. Daemonic warp-flora, these cankers in the flesh of reality exude an aura of supernatural disease. Clouds of plague flies boil around them, shrouding the daemons of Nurgle from the sights of the enemy.",
    "profiles": [
      {
        "name": "Feculent Gnarlmaw",
        "m": "-",
        "t": "9",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [],
    "core": "Infiltrators",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Shroud of Flies (Aura)",
        "text": "While a friendly Nurgle Legiones Daemonica unit is within 6\" of this FORTIFICATION, models in that unit have the Stealth ability."
      },
      {
        "name": "Diseased Cover",
        "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n▪ That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n▪ Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so."
      }
    ],
    "composition": [
      "1 Feculent Gnarlmaw"
    ],
    "loadout": "**This model is equipped with:** nothing.",
    "options": [
      "None"
    ],
    "keywords": [
      "Daemon",
      "Fortification",
      "Chaos",
      "Feculent Gnarlmaw",
      "Frame",
      "Nurgle"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "fiends",
    "name": "Fiends",
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
    "flavor": "Few daemonic entities approach the sheer disturbing horror of the Fiends of Slaanesh. Malicious hunting beasts that croon their delight across the battlefield, these ghastly abominations are wreathed in a soporific musk that leaves their prey witless and helpless before their flashing talons and stabbing tails.",
    "profiles": [
      {
        "name": "Fiends",
        "m": "12\"",
        "t": "5",
        "sv": "7+",
        "w": "4",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Barbed tail and dissecting claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Soporific Musk",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of one or more units from your army with this ability Falls Back, models in that enemy unit must take Desperate Escape tests. When doing so, if that enemy unit is also Battle-shocked, subtract 1 from each of those Desperate Escape tests."
      }
    ],
    "composition": [
      "1 Blissbringer",
      "2-5 Fiends"
    ],
    "loadout": "**Every model is equipped with:** barbed tail and dissecting claws.",
    "options": [
      "None"
    ],
    "keywords": [
      "Fiends",
      "Slaanesh",
      "Daemon",
      "Chaos",
      "Beast"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "flamers",
    "name": "Flamers",
    "points": [
      {
        "models": 3,
        "points": 65
      },
      {
        "models": 6,
        "points": 130
      }
    ],
    "flavor": "These bizarre daemons bound through the air in convulsive leaps. The warpflame that drools from their many maws seethes with the raw power of change. When spat forth in roaring sheets, it sends its victims into agonies of mutation, their forms altering again and again before collapsing into distorted ruin.",
    "profiles": [
      {
        "name": "Flamers",
        "m": "9\"",
        "t": "4",
        "sv": "7+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Flickering Flames",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Flamer mouths",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Bounding Leaps",
        "text": "This unit is eligible to shoot in a turn in which it Fell Back."
      }
    ],
    "composition": [
      "1 Pyrocaster",
      "2-5 Flamers"
    ],
    "loadout": "**Every model is equipped with:** Flickering Flames; Flamer mouths.",
    "options": [
      "None"
    ],
    "keywords": [
      "Tzeentch",
      "Daemon",
      "Chaos",
      "Fly",
      "Infantry",
      "Flamers"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "flesh-hounds",
    "name": "Flesh Hounds",
    "points": [
      {
        "models": 5,
        "points": 75
      },
      {
        "models": 10,
        "points": 150
      }
    ],
    "flavor": "These hunting hounds of Khorne track the terror spoor of their prey across interstellar gulfs. The brass collars about their necks ward away even the most potent sorceries of their desperate prey, before the slavering Flesh Hounds launch themselves onto their victims swinging vicious talons and sinking foot-long fangs deep.",
    "profiles": [
      {
        "name": "Flesh Hounds",
        "m": "12\"",
        "t": "4",
        "sv": "7+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Burning roar",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gore-drenched fangs",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Hunters from the Warp",
        "text": "At the end of your opponent’s turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Collar of Khorne",
        "text": "The bearer has the Feel No Pain 3+ ability against Psychic Attacks."
      }
    ],
    "composition": [
      "1 Gore Hound",
      "4-9 Flesh Hounds"
    ],
    "loadout": "**The Gore Hound is equipped with:** burning roar; gore-drenched fangs; collar of Khorne.\n\n**Every Flesh Hound is equipped with:** gore-drenched fangs; collar of Khorne.",
    "options": [
      "None"
    ],
    "keywords": [
      "Chaos",
      "Daemon",
      "Khorne",
      "Flesh Hounds",
      "Beast"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "fluxmaster",
    "name": "Fluxmaster",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Fluxmasters are Heralds of Tzeentch gifted with daemonic Discs as steeds. They streak through the air like scintillating comets, trailing a wake of altered reality behind them in which fate turns in the favour of Tzeentch’s servants and all their endeavours are rendered especially successful and potent.",
    "profiles": [
      {
        "name": "Fluxmaster",
        "m": "12\"",
        "t": "4",
        "sv": "6+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Arcane Fireball – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Arcane Fireball – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Herald combat weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Fluxmaster",
        "text": "▪ This unit has Stealth.\n▪ Melee attacks that target this unit have -1 to Hit rolls."
      },
      {
        "name": "Altered Reality (Psychic)",
        "text": "Once per battle round, after a Hit roll, a Wound roll, or a saving throw is made for this model, you can change the result of that roll to an unmodified 6."
      }
    ],
    "composition": [
      "1 Fluxmaster"
    ],
    "loadout": "**This model is equipped with:** Arcane Fireball; Herald combat weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Pink Horrors",
        "Blue Horrors"
      ]
    },
    "keywords": [
      "Psyker",
      "Fly",
      "Character",
      "Mounted",
      "Tzeentch",
      "Fluxmaster",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "great-unclean-one",
    "name": "Great Unclean One",
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
    "flavor": "These Greater Daemons possess the same boundless energy and drive to corrupt as a swift spreading virus. Their booming voices roll across the battlefield, their cruel jollity and the perverse pride they take in their underlings’ achievements horribly at odds with the misery and disease they spread.",
    "profiles": [
      {
        "name": "Great Unclean One",
        "m": "7\"",
        "t": "12",
        "sv": "5+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Plague flail",
        "tags": [],
        "range": "6\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Putrid vomit",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Bileblade",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Bilesword – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Bilesword – sweep",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "12",
        "ws": "2+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Doomsday bell",
        "tags": [
          "LETHAL HITS",
          "REVERBERATING SUMMONS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Greater Daemon of Nurgle (Aura)",
        "text": "While a friendly Nurgle Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      },
      {
        "name": "Daemon Lord of Nurgle (Aura)",
        "text": "While a friendly Nurgle Legiones Daemonica unit is within 6\" of this model, add 1 to the Toughness characteristic of models in that unit."
      },
      {
        "name": "Nurgle’s Rot (Psychic)",
        "text": "At the end of your Movement phase, you can select one enemy unit within 12\" of this model. Until the start of your next Movement phase, subtract 1 from the Toughness characteristic of models in that unit."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Great Unclean One"
    ],
    "loadout": "**This model is equipped with:** plague flail; putrid vomit; bilesword.",
    "options": [
      "This model’s plague flail can be replaced with 1 bileblade.",
      "This model’s bilesword can be replaced with 1 doomsday bell."
    ],
    "keywords": [
      "Nurgle",
      "Daemon",
      "Chaos",
      "Psyker",
      "Character",
      "Great Unclean One",
      "Monster"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "130mm"
  },
  {
    "id": "hellflayers",
    "name": "Hellflayers",
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
    "flavor": "Mortal myth has it that the Hellflayers of Slaanesh began as devices for mowing the gruesome pleasure-gardens of the Dark Prince’s realm, but that their efficacy in war was soon proven when their wild Daemonette crews unleashed the whirl-bladed murder engines upon the battlefields of realspace.",
    "profiles": [
      {
        "name": "Hellflayer",
        "m": "14\"",
        "t": "6",
        "sv": "5+",
        "w": "7",
        "ld": "7+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Lashes of torment",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Lashes of torment",
        "tags": [
          "ANTI-INFANTRY 3+",
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Seeker tongues",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Slashing claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Cutting Down the Foe",
        "text": "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength and Damage characteristics of that attack by 1."
      }
    ],
    "composition": [
      "1-2 Hellflayers"
    ],
    "loadout": "**Every model is equipped with:** lashes of torment; Seeker tongues; slashing claws.",
    "options": [
      "None"
    ],
    "keywords": [
      "Chaos",
      "Daemon",
      "Hellflayers",
      "Slaanesh",
      "Mounted"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "horticulous-slimux",
    "name": "Horticulous Slimux",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "Horticulous Slimux is the Grand Cultivator, roaming realspace to sow the seeds of corruption in all unspoilt lands. Sat atop the heaving bulk of the snail-like daemon Mulch, Slimux goads packs of thrashing plague beasts into battle even as it lops mortal heads with thwicker-snick flashes of its wickedly sharp lopping shears.",
    "profiles": [
      {
        "name": "Horticulous Slimux",
        "m": "6\"",
        "t": "10",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Acidic maw",
        "tags": [
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "7",
        "ap": "-4",
        "d": "3"
      },
      {
        "name": "Lopping shears",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Beast Handler",
        "text": "While this model is leading a unit, you can re-roll Charge rolls made for that unit. In addition, once per battle, you can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      },
      {
        "name": "Seed the Garden of Nurgle",
        "text": "At the end of your Movement phase, if this model is within one Area Terrain feature, until the end of the battle, that AREA TERRAIN feature is considered to be within your army’s Shadow of Chaos."
      }
    ],
    "composition": [
      "1 Horticulous Slimux – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** acidic maw; lopping shears.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Beasts of Nurgle",
        "Beasts Of Nurgle"
      ]
    },
    "keywords": [
      "Daemon",
      "Epic Hero",
      "Chaos",
      "Horticulous Slimux",
      "Mounted",
      "Character",
      "Nurgle"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "infernal-enrapturess",
    "name": "Infernal Enrapturess",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "The symphonies of torment and cacophonies of bliss unleashed by these daemons can tear their foes apart body and soul. Yet perhaps their greatest ability is to draw the disembodied energies of fellow Slaaneshi daemons to the battlefield, constantly bolstering their comrades’ ranks with fresh and soul-hungry entities.",
    "profiles": [
      {
        "name": "Infernal Enrapturess",
        "m": "9\"",
        "t": "3",
        "sv": "7+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Heartstring lyre – cacophonous melody",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heartstring lyre – euphonic blast",
        "tags": [
          "ASSAULT"
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
        "name": "Ravaging claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Fights First, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Harmonic Alignment",
        "text": "While this model is leading a unit, in your Command phase, you can return D3 destroyed Bodyguard models to that unit."
      },
      {
        "name": "Discordant Disruption (Aura)",
        "text": "While an enemy PSYKER unit is within 12\" of this model, Psychic weapons equipped by models in that unit have the [HAZARDOUS] ability."
      }
    ],
    "composition": [
      "1 Infernal Enrapturess"
    ],
    "loadout": "**This model is equipped with:** heartstring lyre; ravaging claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Daemonettes"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Daemon",
      "Slaanesh",
      "Infernal Enrapturess",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "kairos-fateweaver",
    "name": "Kairos Fateweaver",
    "points": [
      {
        "models": 1,
        "points": 305
      }
    ],
    "flavor": "Wielding the warp-forged Staff of Tomorrow, and with the ability to predict all that may come to pass while knowing all that has already transpired, Kairos Fateweaver is amongst the galaxy’s most canny strategists. What the daemon lacks in physical and martial prowess, it more than makes up for in pure Tzeentchian cunning.",
    "profiles": [
      {
        "name": "Kairos Fateweaver",
        "m": "12\"",
        "t": "10",
        "sv": "6+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal Gateway – witchfire",
        "tags": [
          "BLAST",
          "INDIRECT FIRE",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Infernal Gateway – focused witchfire",
        "tags": [
          "BLAST",
          "INDIRECT FIRE",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D3+6",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Staff of Tomorrow",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2D3"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Greater Daemon of Tzeentch (Aura)",
        "text": "While a friendly Tzeentch Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      },
      {
        "name": "One Head Looks Forward",
        "text": "At the end of your Command phase, if this model is on the battlefield, take a Leadership test for this model; if that test is passed, you gain 1CP."
      },
      {
        "name": "One Head Looks Back (Aura)",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of the use of that Stratagem by 1CP."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Kairos Fateweaver – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Infernal Gateway; Staff of Tomorrow.",
    "options": [
      "None"
    ],
    "keywords": [
      "Monster",
      "Kairos Fateweaver",
      "Tzeentch",
      "Daemon",
      "Chaos",
      "Character",
      "Psyker",
      "Epic Hero",
      "Fly"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "karanak",
    "name": "Karanak",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Karanak hunts those who give insult to Khorne. Scenting its prey across time and space, it is an inescapable predator. Karanak’s incorporeal howls summon the Blood Hunt of Khorne to join it in the chase, a cavalcade of ferocious daemons set on mayhem and slaughter.",
    "profiles": [
      {
        "name": "Karanak",
        "m": "12\"",
        "t": "4",
        "sv": "7+",
        "w": "5",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Scalding roar",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Soul-rending fangs",
        "tags": [
          "ANTI-CHARACTER 3+",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Pack Leader",
        "text": "While this model is leading a unit, you can re-roll Advance and Charge rolls made for that unit."
      },
      {
        "name": "Prey of the Blood God",
        "text": "At the start of the first battle round, select one enemy unit to be this model’s prey. Each time a model in this model’s unit makes a melee attack that targets its prey, you can re-roll the Wound roll. Each time this model’s prey is destroyed, select one new enemy unit to be this model’s prey."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Brass Collar of Bloody Vengeance",
        "text": "The bearer has the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds."
      }
    ],
    "composition": [
      "1 Karanak – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** scalding roar; soul-rending fangs; Brass Collar of Bloody Vengeance.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Flesh Hounds"
      ]
    },
    "keywords": [
      "Character",
      "Daemon",
      "Chaos",
      "Epic Hero",
      "Karanak",
      "Khorne",
      "Beast"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "keeper-of-secrets",
    "name": "Keeper Of Secrets",
    "points": [
      {
        "models": 1,
        "points": 255,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 270,
        "note": "3rd+"
      }
    ],
    "flavor": "Darkly intelligent, horribly beguiling and deadly in battle, the Keepers of Secrets are the greatest champions of Slaaneshi daemon legions. Wielding unclean yet beautiful weapons and unleashing the sorcerous powers of obsession and torment, these daemons cut an elegantly hideous swathe across the battlefield.",
    "profiles": [
      {
        "name": "Keeper Of Secrets",
        "m": "14\"",
        "t": "10",
        "sv": "5+",
        "w": "18",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Living whip",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Phantasmagoria – witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Phantasmagoria – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "9",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Ritual knife",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Snapping claws",
        "tags": [
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Witstealer sword",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Daemon Lord of Slaanesh (Aura)",
        "text": "While a friendly Slaanesh Legiones Daemonica unit is within 6\" of this model, improve the Armour Penetration of melee weapons in that unit by 1."
      },
      {
        "name": "Mesmerising Form",
        "text": "Each time an attack targets this model, subtract 1 from the Hit roll."
      },
      {
        "name": "Greater Daemon of Slaanesh (Aura)",
        "text": "While a friendly Slaanesh Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Shining Aegis",
        "text": "The bearer has a Save characteristic of 3+."
      }
    ],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Keeper of Secrets"
    ],
    "loadout": "**This model is equipped with:** Phantasmagoria; snapping claws; witstealer sword.",
    "options": [
      "This model can be equipped with one of the following:\n▪ Living whip\n▪ Ritual knife\n▪ Shining aegis"
    ],
    "keywords": [
      "Psyker",
      "Monster",
      "Character",
      "Keeper of Secrets",
      "Slaanesh",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "lord-of-change",
    "name": "Lord of Change",
    "points": [
      {
        "models": 1,
        "points": 320,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 315,
        "note": "3rd+"
      }
    ],
    "flavor": "Greater Daemons of Tzeentch are infinitely cunning sorcerers and manipulators. Their malevolent gaze lays bare the souls of their victims and blasts the sanity of even the staunchest mortal, while their ensorcelled weapons and unholy magicks violently reshape reality itself into ever mutating forms.",
    "profiles": [
      {
        "name": "Lord of Change",
        "m": "12\"",
        "t": "10",
        "sv": "6+",
        "w": "18",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Rod of sorcery",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "2+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bolt of Change – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "9",
        "bs": "2+",
        "s": "9",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Bolt of Change – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "9",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Baleful sword",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Staff of Tzeentch",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Daemon Lord of Tzeentch (Aura)",
        "text": "While a friendly Tzeentch Legiones Daemonica unit is within 6\" of this model, each time a model in that unit makes a ranged attack, add 1 to the Strength characteristic of that attack."
      },
      {
        "name": "Master of Magicks (Psychic)",
        "text": "In your Shooting phase, select one of the following abilities: [IGNORES COVER]; [LETHAL HITS]; [SUSTAINED HITS D3]. Until the end of the phase, this model’s Bolt of Change has that ability."
      },
      {
        "name": "Greater Daemon of Tzeentch (Aura)",
        "text": "While a friendly Tzeentch Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Lord of Change"
    ],
    "loadout": "**This model is equipped with:** Bolt of Change; staff of Tzeentch.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 rod of sorcery\n▪ 1 baleful sword"
    ],
    "keywords": [
      "Character",
      "Monster",
      "Tzeentch",
      "Lord of Change",
      "Psyker",
      "Fly",
      "Chaos",
      "Daemon"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "nurglings",
    "name": "Nurglings",
    "points": [
      {
        "models": 3,
        "points": 45
      },
      {
        "models": 6,
        "points": 90
      }
    ],
    "flavor": "Nurglings are malicious plague mites that pour across the battlefield in giggling masses. These foul imps might seem almost amusing from a distance, yet the illusion is shattered as the Nurglings spill forth to engulf their screaming victims in a rancid avalanche of needle fangs, filthy talons and bloated flesh.",
    "profiles": [
      {
        "name": "Nurglings",
        "m": "5\"",
        "t": "3",
        "sv": "7+",
        "w": "4",
        "ld": "8+",
        "oc": "0",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Diseased claws and teeth",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Mischief Makers",
        "text": "Each time an enemy unit (excluding TITANIC units) within Engagement Range of one or more units with this ability is selected to fight, until the end of the phase, each time a model in that enemy unit makes a melee attack, subtract 1 from the Hit roll."
      }
    ],
    "composition": [
      "3-6 Nurgling Swarms"
    ],
    "loadout": "**Every model is equipped with:** diseased claws and teeth.",
    "options": [
      "None"
    ],
    "keywords": [
      "Swarm",
      "Nurgle",
      "Daemon",
      "Chaos",
      "Battleline",
      "Nurglings"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "pink-horrors",
    "name": "Pink Horrors",
    "points": [
      {
        "models": 10,
        "points": 150
      }
    ],
    "flavor": "Magic made manifest, these cavorting grotesques hurl balls of warpfire into the enemy ranks where they transmogrify and immolate their victims. Pink Horrors cackle, riddle and caper endlessly, their unsettling glee ending only in the moment when their mortal form is destroyed and forced to split messily into two Blue Horrors.",
    "profiles": [
      {
        "name": "PINK HORROR",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "4+",
        "baseSize": "32mm"
      },
      {
        "name": "BLUE HORROR/BRIMSTONE HORROR",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "1",
        "ld": "8+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "32mm"
      }
    ],
    "ranged": [
      {
        "name": "Coruscating Pink Flames",
        "tags": [
          "PISTOL",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Coruscating Blue Flames",
        "tags": [
          "PISTOL",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Coruscating Yellow Flames",
        "tags": [
          "PISTOL",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "5+",
        "s": "2",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Pink claws",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Blue claws",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Yellow claws",
        "tags": [],
        "a": "2",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Split",
        "text": "Each time a PINK HORROR or BLUE HORROR model in this unit is destroyed, after the attacking unit has finished making its attacks, if this unit is not destroyed, roll one D6 for that model. On a 4+, if it was a PINK HORROR, add two BLUE HORROR models to this unit, and if it was a BLUE HORROR, add one BRIMSTONE HORROR model to this unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "10 Pink Horrors"
    ],
    "loadout": "**Every Pink Horror is equipped with:** Coruscating Pink Flames; pink claws.\n\n**Every Blue Horror added to this unit using the Split ability is equipped with:** Coruscating Blue Flames; blue claws.\n\n**Every Brimstone Horror added to this unit using the Split ability is equipped with:** Coruscating Yellow Flames; yellow claws.",
    "options": [
      "1 Pink Horror that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Pink Horror that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Blue",
      "Horrors",
      "Pink",
      "Brimstone",
      "Infantry",
      "Battleline",
      "Chaos",
      "Daemon",
      "Tzeentch"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "rules": [
      {
        "name": "HORRORS ARE PINK. HORRORS ARE BLUE. WHEREONCE THERE WAS ONE, NOW THERE ARE TWO.",
        "text": "If, at any point, this unit contains no PINK HORROR models, use the BLUE HORRORS datasheet for this unit.\n\n**Designer’s Note:** While this unit contains one or more PINK HORROR models, the Sullen Malevolence and Exploding Horrors abilities from the BLUE HORRORS datasheet do not apply to this unit."
      }
    ]
  },
  {
    "id": "plague-drones",
    "name": "Plague Drones",
    "points": [
      {
        "models": 3,
        "points": 110
      },
      {
        "models": 6,
        "points": 220
      }
    ],
    "flavor": "Plague Drones ride monstrous Rot Flies to war. These vile steeds scrabble and bite at their prey, impaling them on dripping probosces or biting off the heads of their victims. The finest stolen craniums are recovered and fashioned into filth-swollen projectiles – death’s heads – for the daemonic riders to hurl at their foes.",
    "profiles": [
      {
        "name": "Plague Drones",
        "m": "10\"",
        "t": "8",
        "sv": "6+",
        "w": "5",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Death’s heads",
        "tags": [
          "BLAST",
          "LETHAL HITS"
        ],
        "range": "12\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Foul mouthparts",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Plaguesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Death’s Heads",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly Nurgle Legiones Daemonica unit makes an attack that targets that unit, you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Plaguebringer",
      "2-5 Plague Drones"
    ],
    "loadout": "**Every model is equipped with:** death’s heads; foul mouthparts; plaguesword.",
    "options": [
      "1 Plague Drone that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Plague Drone that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Mounted",
      "Fly",
      "Chaos",
      "Nurgle",
      "Plague Drones",
      "Daemon"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "plaguebearers",
    "name": "Plaguebearers",
    "points": [
      {
        "models": 10,
        "points": 115
      }
    ],
    "flavor": "Born from the souls of those who die of Nurgle’s Rot, Plaguebearers are the foot soldiers of Nurgle. They wield plagueswords that drip with infectious slime, and are surrounded by the endless drone of counting as they pursue their hopeless and eternal task of tallying each new outbreak of the Plague God’s many diseases.",
    "profiles": [
      {
        "name": "Plaguebearers",
        "m": "5\"",
        "t": "5",
        "sv": "7+",
        "w": "2",
        "ld": "7+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Plaguesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Infected Outbreak",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Plagueridden",
      "9 Plaguebearers"
    ],
    "loadout": "**Every model is equipped with:** plaguesword.",
    "options": [
      "1 Plaguebearer that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Plaguebearer that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Chaos",
      "Daemon",
      "Nurgle",
      "Plaguebearers"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "poxbringer",
    "name": "Poxbringer",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Poxbringers are the largest and foulest of Plaguebearers, their corporeal forms brimming with unclean vitality even as they exude an air of feculent despair. A miasmal haze of disease hangs about them, clotting upon the plagueswords of their fellow daemons and rendering their touch all the more infectious.",
    "profiles": [
      {
        "name": "Poxbringer",
        "m": "5\"",
        "t": "5",
        "sv": "7+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Foul balesword",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Poxbringer",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, a successful unmodified Hit roll of 5+ scores a Critical Hit."
      },
      {
        "name": "Feculent Despair (Aura, Psychic)",
        "text": "While an enemy unit is within 6\" of this model, each time that unit takes a Battle-shock test, subtract 1 from that test."
      }
    ],
    "composition": [
      "1 Poxbringer"
    ],
    "loadout": "**This model is equipped with:** foul balesword.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plaguebearers"
      ]
    },
    "keywords": [
      "Poxbringer",
      "Nurgle",
      "Daemon",
      "Infantry",
      "Character",
      "Psyker",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "rendmaster-on-blood-throne",
    "name": "Rendmaster On Blood Throne",
    "points": [
      {
        "models": 1,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "The greatest of Khorne’s heralds are Rendmasters, who ride to battle atop monstrous Daemon Engines known as Blood Thrones. Infernal lore suggests these engines are fashioned from slivers of the Blood God’s own throne, and that wherever they plough into the foe, Khorne’s legions fight beneath his glowering gaze.",
    "profiles": [
      {
        "name": "Rendmaster On Blood Throne",
        "m": "8\"",
        "t": "9",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Attendants’ hellblades",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Blade of blood",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Blood Throne",
        "text": "At the start of the Fight phase, select one enemy unit within 18\" of and visible to this model. Until the end of the phase, each time a friendly Khorne Legiones Daemonica unit makes an attack that targets that unit, improve the Strength, Armour Penetration and Damage characteristics of that attack by 1."
      },
      {
        "name": "Champion Slayer",
        "text": "Each time this model makes a melee attack that targets a CHARACTER or MONSTER unit, you can re-roll the Wound roll. Each time this model destroys an enemy CHARACTER or MONSTER unit, this model regains up to D6 lost wounds."
      }
    ],
    "composition": [
      "1 Rendmaster on Blood Throne"
    ],
    "loadout": "**This model is equipped with:** attendants’ hellblades; blade of blood.",
    "options": [
      "None"
    ],
    "keywords": [
      "Character",
      "Daemon",
      "Khorne",
      "Rendmaster on Blood throne",
      "Chaos",
      "Mounted"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "rotigus",
    "name": "Rotigus",
    "points": [
      {
        "models": 1,
        "points": 280
      }
    ],
    "flavor": "Rotigus Rainfather lumbers into battle vomiting jetting rivers of corrosive, plague-laden filth across all who stand in its path. In its bloated fist it clutches a gnarlrod, while an endless and infectious downpour accompanies the daemon, a fecund flood fit to drown, corrupt and mutate all it touches.",
    "profiles": [
      {
        "name": "Rotigus",
        "m": "7\"",
        "t": "12",
        "sv": "5+",
        "w": "22",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Streams of brackish filth",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Gnarlrod – strike",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "7",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Gnarlrod – sweep",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "14",
        "ws": "2+",
        "s": "8",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike, Feel No Pain 6+",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Greater Daemon of Nurgle (Aura)",
        "text": "While a friendly Nurgle Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      },
      {
        "name": "Virulent Blessing (Psychic)",
        "text": "At the start of the Fight phase, you can select one enemy unit within 24\" and visible to this model. Until the end of the phase, each time an attack made by a Nurgle Legiones Daemonica model is allocated to a model in that unit, add 1 to the Damage characteristic of that attack."
      },
      {
        "name": "Deluge of Nurgle (Aura)",
        "text": "While an enemy unit is within 6\" of this model, subtract 2 from the Move characteristic and subtract 1 from the Objective Control characteristic of models in that unit."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Rotigus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** streams of brackish filth; gnarlrod.",
    "options": [
      "None"
    ],
    "keywords": [
      "Psyker",
      "Chaos",
      "Daemon",
      "Nurgle",
      "Character",
      "Monster",
      "Rotigus",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "130mm"
  },
  {
    "id": "screamers",
    "name": "Screamers",
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
    "flavor": "These predatory daemons strike like sudden and inescapable change. They emit unearthly shrieks as they swoop down upon their prey on scintillating tides of sorcery, slicing victims to ribbons with razor-keen fins and latching on with fanged jaws from which corrosive empyric energies flow.",
    "profiles": [
      {
        "name": "Screamers",
        "m": "14\"",
        "t": "4",
        "sv": "6+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Lamprey bite",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Slashing Dive",
        "text": "In your Movement phase, after this unit ends a Normal move, you can select one enemy unit it moved over during that move and roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "composition": [
      "3-6 Screamers"
    ],
    "loadout": "**Every model is equipped with:** lamprey bite.",
    "options": [
      "None"
    ],
    "keywords": [
      "Fly",
      "Beast",
      "Chaos",
      "Daemon",
      "Tzeentch",
      "Screamers"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Small Flying Base"
  },
  {
    "id": "seekers",
    "name": "Seekers",
    "points": [
      {
        "models": 5,
        "points": 80
      },
      {
        "models": 10,
        "points": 155
      }
    ],
    "flavor": "Sat astride swift Steeds of Slaanesh, Seekers pursue their mortal prey with obsessive delight. Even the fastest of mortal vehicles cannot outpace these vicious entities, while those who stand and fight soon find their ranks smashed asunder by charging shock cavalry drawn from the darkest depths of nightmare.",
    "profiles": [
      {
        "name": "Seekers",
        "m": "14\"",
        "t": "4",
        "sv": "7+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Lashing tongue",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Slashing claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Scouts 9\"",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Unholy Speed",
        "text": "You can re-roll Advance and Charge rolls made for this unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Daemonic Icon",
        "text": "Models in the bearer’s unit have a Leadership characteristic of 6+."
      },
      {
        "name": "Instrument of Chaos",
        "text": "Add 1 to Charge rolls made for the bearer’s unit."
      }
    ],
    "composition": [
      "1 Heartseeker",
      "4-9 Seekers"
    ],
    "loadout": "**Every model is equipped with:** lashing tongue; slashing claws.",
    "options": [
      "1 Seeker that is not equipped with a daemonic icon can be equipped with 1 instrument of Chaos.",
      "1 Seeker that is not equipped with an instrument of Chaos can be equipped with 1 daemonic icon."
    ],
    "keywords": [
      "Mounted",
      "Seekers",
      "Slaanesh",
      "Daemon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "60x35.5mm Oval Base"
  },
  {
    "id": "shalaxi-helbane",
    "name": "Shalaxi Helbane",
    "points": [
      {
        "models": 1,
        "points": 315
      }
    ],
    "flavor": "Cloven hooves pounding against broken earth, Shalaxi Helbane bears down upon its doomed quarry with the Soulpiercer gleaming in its grip. No prey can evade the Monarch of the Hunt, for the daemon’s obsession with its victim is so singular and so powerful that no mortal means of flight could ever escape it.",
    "profiles": [
      {
        "name": "Shalaxi Helbane",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Lash of Slaanesh",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Pavane of Slaanesh – witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "2+",
        "s": "9",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Pavane of Slaanesh – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "DEVASTATING WOUNDS",
          "PSYCHIC",
          "SUSTAINED HITS 3"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "2+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Snapping claws",
        "tags": [
          "DEVASTATING WOUNDS",
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Soulpiercer",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Greater Daemon of Slaanesh (Aura)",
        "text": "While a friendly Slaanesh Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      },
      {
        "name": "No Prey Can Evade",
        "text": "You can re-roll Advance and Charge rolls made for this model."
      },
      {
        "name": "Monarch of the Hunt",
        "text": "At the start of the first battle round, select one enemy unit to be this model’s quarry. Each time this model makes a melee attack that targets its quarry, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model’s quarry is destroyed, select one new enemy unit to be this model’s quarry."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Shalaxi Helbane – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** lash of Slaanesh; Pavane of Slaanesh; snapping claws; soulpiercer.",
    "options": [
      "None"
    ],
    "keywords": [
      "Character",
      "Daemon",
      "Chaos",
      "Psyker",
      "Epic Hero",
      "Shalaxi Helbane",
      "Monster",
      "Slaanesh"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "skarbrand",
    "name": "Skarbrand",
    "points": [
      {
        "models": 1,
        "points": 315
      }
    ],
    "flavor": "Never pausing, never relenting, Skarbrand storms across realspace hacking apart every luckless foe that stands in its path. Worse, all who find themselves in the daemon’s presence are seized by its feral murderlust, a madness that sees elegant strategies collapse into orgies of primal savagery.",
    "profiles": [
      {
        "name": "Skarbrand",
        "m": "10\"",
        "t": "11",
        "sv": "3+",
        "w": "20",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bellow of endless fury",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "8",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Slaughter and Carnage – strike",
        "tags": [],
        "a": "8",
        "ws": "2+",
        "s": "16",
        "ap": "-4",
        "d": "6"
      },
      {
        "name": "Slaughter and Carnage – sweep",
        "tags": [],
        "a": "16",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D6, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Greater Daemon of Khorne (Aura)",
        "text": "While a friendly Khorne Legiones Daemonica unit is within 6\" of this model, that unit is within your army’s Shadow of Chaos."
      },
      {
        "name": "Rage Embodied (Aura)",
        "text": "While a friendly Khorne Legiones Daemonica unit is within 6\" of this model, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit."
      },
      {
        "name": "Murderlust",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced."
      }
    ],
    "damaged": {
      "note": "1-7 wounds remaining",
      "text": "While this model has 1-7 wounds remaining, add 2 to the Attacks characteristic of this model’s Slaughter and Carnage."
    },
    "composition": [
      "1 Skarbrand – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bellow of endless fury; Slaughter and Carnage.",
    "options": [
      "None"
    ],
    "keywords": [
      "Character",
      "Monster",
      "Skarbrand",
      "Epic Hero",
      "Chaos",
      "Daemon",
      "Khorne"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "skull-altar",
    "name": "Skull Altar",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Rumbling up from the tortured ground amidst geysers of gore and skulls, these grotesque altars mar the land wherever the daemons of Khorne advance. They are sites of sacrifice, the blood shed atop them causing waves of wrathful unreality to roll out across the battlefield, spreading hate and destruction. UNIT COMPOSITION ■ 1 Skull Altar This model is equipped with: nothing.",
    "profiles": [
      {
        "name": "Skull Altar",
        "m": "-",
        "t": "12",
        "sv": "3+",
        "w": "10",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [],
    "core": "Infiltrators",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Shadow of Khorne (Aura)",
        "text": "The area of the battlefield within 6\" of this FORTIFICATION is considered to be within your army’s Shadow of Chaos. In addition, while a friendly Khorne Legiones Daemonica unit is within 6\" of this FORTIFICATION, each time you take a Battle-shock test for that unit, you can re-roll that test."
      },
      {
        "name": "Cover",
        "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Fortification",
        "text": "While an enemy unit is only within Engagement Range of one or more Fortifications from your army:\n▪ That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n▪ Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so."
      }
    ],
    "composition": [
      "1 Skull Altar"
    ],
    "loadout": "**This model is equipped with:** nothing.",
    "options": [
      "None"
    ],
    "keywords": [
      "Chaos",
      "Fortification",
      "Daemon",
      "Frame",
      "Khorne",
      "Skull Altar"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "skull-cannon",
    "name": "Skull Cannon",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Grotesque brazen war engines that rumble into battle with obscene eagerness, Skull Cannons are fed the corpses of the fallen to fuel their charnel fury. When they fire, these infernal weapons spit blazing skulls that arc through the air like meteors before exploding with thunderous violence upon impact.",
    "profiles": [
      {
        "name": "Skull Cannon",
        "m": "8\"",
        "t": "9",
        "sv": "4+",
        "w": "9",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Skull cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Attendants’ hellblades",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Biting maw",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Skulls of the Fallen",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit that was hit by one or more of those attacks. That unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Skull Cannon"
    ],
    "loadout": "**This model is equipped with:** skull cannon; attendants’ hellblades; biting maw.",
    "options": [
      "None"
    ],
    "keywords": [
      "Khorne",
      "Daemon",
      "Mounted",
      "Skull Cannon",
      "Chaos"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "skullmaster",
    "name": "Skullmaster",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Skullmasters ride daemon steeds known as Juggernauts. Mounted upon these beasts of living brass and molten fury, Skullmasters lead the Khornate cavalry charge into the heart of the enemy lines, hacking, beheading, impaling and crushing. Few are the foes that can stand against this devastating stampede.",
    "profiles": [
      {
        "name": "Skullmaster",
        "m": "10\"",
        "t": "7",
        "sv": "3+",
        "w": "6",
        "ld": "7+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Blade of blood",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Juggernaut’s bladed horn",
        "tags": [
          "EXTRA ATTACKS",
          "LANCE"
        ],
        "a": "4",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Skullmaster’s Fury",
        "text": "While this model is leading a unit, each time that unit ends a Charge move, until the end of the turn, Juggernaut’s bladed horns equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Devastating Charge",
        "text": "Each time this model’s unit ends a Charge move, each enemy unit within Engagement Range of that unit must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Skullmaster"
    ],
    "loadout": "**This model is equipped with:** blade of blood; Juggernaut’s bladed horn.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bloodcrushers"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Chaos",
      "Daemon",
      "Skullmaster",
      "Khorne"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "skulltaker",
    "name": "Skulltaker",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Skulltaker is Khorne’s executioner. Wielding the terrifying Slayer Sword, Skulltaker’s every blow lops another head from an enemy’s shoulders. Fighting at the head of the Cohort of Blood – a dread assemblage of the mightiest Bloodletters – Skulltaker reaps an ever greater tally of worthy skulls for Khorne.",
    "profiles": [
      {
        "name": "Skulltaker",
        "m": "8\"",
        "t": "4",
        "sv": "4+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "The Slayer Sword",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Lord of Decapitations",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Skulls for Khorne",
        "text": "Each time this model makes an attack that targets a Character unit, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model destroys an enemy Character unit, you gain 1CP."
      }
    ],
    "composition": [
      "1 Skulltaker – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** the Slayer Sword.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bloodletters"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Chaos",
      "Daemon",
      "Khorne",
      "Skulltaker"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "sloppity-bilepiper",
    "name": "Sloppity Bilepiper",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Infected with the Chortling Murrain, these desperately grinning daemons caper and quip as they play discordant dirges on their foul gutpipes. Their antics either amuse or irritate their fellow daemons so much that they hasten into the press of battle, while mortals infected with the murrain may literally laugh themselves to death.",
    "profiles": [
      {
        "name": "Sloppity Bilepiper",
        "m": "5\"",
        "t": "5",
        "sv": "7+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Marotter",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Jolly Gutpipes",
        "text": "While this model is leading a unit, add 1 to the Move characteristic of models in that unit and you can re-roll Advance rolls made for that unit."
      },
      {
        "name": "Disease of Mirth (Aura)",
        "text": "At the start of the Fight phase, every enemy unit (excluding MONSTERS and VEHICLES) within 6\" of this model must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Sloppity Bilepiper"
    ],
    "loadout": "**This model is equipped with:** marotter.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plaguebearers"
      ]
    },
    "keywords": [
      "Infantry",
      "Chaos",
      "Daemon",
      "Nurgle",
      "Sloppity Bilepiper",
      "Character"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "soul-grinder",
    "name": "Soul Grinder",
    "points": [
      {
        "models": 1,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 195,
        "note": "3rd+"
      }
    ],
    "flavor": "Daemons desperate to gain power above their station may strike an unwise bargain with the master of the Forge of Souls. Thus are they remade into the hulking war engines known as Soul Grinders, and given the might to crush and blast all in their path – for a steep and ultimately never-ending price…",
    "profiles": [
      {
        "name": "Soul Grinder",
        "m": "8\"",
        "t": "11",
        "sv": "3+",
        "w": "14",
        "ld": "7+",
        "oc": "5",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Harvester cannon",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Torrent of burning blood",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Phlegm bombardment",
        "tags": [
          "BLAST",
          "INDIRECT FIRE",
          "LETHAL HITS"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Scream of despair",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Warp gaze",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D3",
        "bs": "3+",
        "s": "12",
        "ap": "-2",
        "d": "D6+2"
      }
    ],
    "melee": [
      {
        "name": "Iron claw",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "16",
        "ap": "-3",
        "d": "D6+2"
      },
      {
        "name": "Warpclaw",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Warpsword",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Scuttling Walker",
        "text": "Each time this model makes a Normal or Advance move, it can move over friendly Monster and Vehicle models and terrain features that are 4\" or less in height as if they were not there."
      }
    ],
    "specialAbilities": [
      {
        "name": "DAEMONIC ALLEGIANCE",
        "text": "When you select this model to include in your army, you must select one of the keywords below. Until the end of the battle, this model has that keyword and the additional wargear stated for that keyword below:\nKHORNE – **This model is additionally equipped with:** torrent of burning blood\nTZEENTCH – **This model is additionally equipped with:** warp gaze\nNURGLE – **This model is additionally equipped with:** phlegm bombardment\nSLAANESH – **This model is additionally equipped with:** scream of despair"
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Soul Grinder"
    ],
    "loadout": "**This model is equipped with:** harvester cannon; iron claw; warpsword.",
    "options": [
      "This model’s warpsword can be replaced with 1 warpclaw."
    ],
    "keywords": [
      "Walker",
      "Chaos",
      "Daemon",
      "Soul Grinder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "160mm"
  },
  {
    "id": "spoilpox-scrivener",
    "name": "Spoilpox Scrivener",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Spiteful and pedantic, these daemons are tasked with auditing the endless disease-tally of the Plaguebearers. The presence of the Scriveners is cruelly motivational to their fellows. Moreover, they can easily bite enemy warriors in half, or drown them in the foul mucus that issues from their distended maws.",
    "profiles": [
      {
        "name": "Spoilpox Scrivener",
        "m": "5\"",
        "t": "5",
        "sv": "7+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Disgusting sneezes",
        "tags": [
          "PISTOL",
          "TORRENT"
        ],
        "range": "6\"",
        "a": "D6",
        "bs": "N/A",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Plaguesword and distended maw",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Keep Counting!",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Meet Your Quota!",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      }
    ],
    "composition": [
      "1 Spoilpox Scrivener"
    ],
    "loadout": "**This model is equipped with:** disgusting sneezes; plaguesword and distended maw.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Plaguebearers"
      ]
    },
    "keywords": [
      "Nurgle",
      "Daemon",
      "Character",
      "Infantry",
      "Chaos",
      "Spoilpox Scrivener"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "syllesske",
    "name": "Syll’esske",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "This strange alliance of the daemon herald Syll and the hulking Daemon Prince Esske has borne bloody fruit across countless battlefields. Not only do the pairing wreak red ruin amidst the foe themselves, but also their presence entices the daemons of Slaanesh to ever more excessive acts of cruelty and violence.",
    "profiles": [
      {
        "name": "Syll’esske",
        "m": "9\"",
        "t": "6",
        "sv": "6+",
        "w": "9",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Cacophonic choir – witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cacophonic choir – focused witchfire",
        "tags": [
          "PSYCHIC",
          "HAZARDOUS",
          "IGNORES COVER",
          "DEVASTATING WOUNDS",
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
        "name": "Scourging whip",
        "tags": [
          "ASSAULT"
        ],
        "range": "9\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Axe of Dominion",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Scourging whip",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Prince of Slaanesh",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, a successful unmodified Wound roll of 5+ scores a Critical Wound."
      },
      {
        "name": "Delightful Agonies",
        "text": "The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining."
      }
    ],
    "composition": [
      "1 Syll’Esske – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Cacophonic Choir; scourging whip; Axe of Dominion.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Daemonettes"
      ]
    },
    "keywords": [
      "Psyker",
      "Character",
      "Chaos",
      "Daemon",
      "Slaanesh",
      "Syll’Esske",
      "Epic Hero",
      "Monster"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "the-blue-scribes",
    "name": "The Blue Scribes",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "These quarrelsome daemons flit through time and space upon their skimming Disc, seeking scattered shards of the sorcerous wisdom of Tzeentch. P’tarix leeches away the secrets and power of enemy sorcerers, even as Xirat’p unleashes storms of sorcerous destruction drawn from their arcane stash of lore.",
    "profiles": [
      {
        "name": "The Blue Scribes",
        "m": "12\"",
        "t": "4",
        "sv": "6+",
        "w": "6",
        "ld": "8+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Sharp quills",
        "tags": [
          "ANTI-PSYKER 2+"
        ],
        "a": "4",
        "ws": "5+",
        "s": "2",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Lone Operative",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "P’tarix’s Sorcerous Syphon (Aura)",
        "text": "While an enemy unit is within 12\" of this model, each time a model in that unit makes a Psychic Attack, subtract 1 from the Wound roll."
      },
      {
        "name": "Xirat’p’s Sorcerous Barrages (Psychic)",
        "text": "At the end of your Movement phase, roll one D6 for each enemy unit within 6\" of this model: on a 2-3, that unit suffers 1 mortal wound; on a 4-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D6 mortal wounds."
      }
    ],
    "composition": [
      "1 The Blue Scribes – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** sharp quills.",
    "options": [
      "None"
    ],
    "keywords": [
      "Mounted",
      "Character",
      "Epic Hero",
      "Fly",
      "Chaos",
      "Daemon",
      "Tzeentch",
      "The Blue Scribes"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "the-changeling",
    "name": "The Changeling",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Known also as the Trickster of Tzeentch, the Changeling can alter its form at will to mimic mortal beings from the smallest insect to the most titanic monster. The daemon’s favourite game is to impersonate pivotal mortal leaders or heroes, and then to wreak untold mischief by abusing their power and position.",
    "profiles": [
      {
        "name": "The Changeling",
        "m": "6\"",
        "t": "3",
        "sv": "7+",
        "w": "5",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Infernal Flames – witchfire",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Infernal Flames – focused witchfire",
        "tags": [
          "IGNORES COVER",
          "HAZARDOUS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "The Trickster’s Staff",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Lone Operative, Stealth",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Formless Horror",
        "text": "Each time an enemy unit wishes to select this model as the target of an attack, that unit must first take a Battle-shock test. If that test is failed, in addition to being Battle-shocked, that enemy unit cannot target this model this phase."
      },
      {
        "name": "Mischief and Confusion",
        "text": "At the start of your opponent’s Shooting phase, select one enemy unit within 12\" of and visible to this model and roll one D6: on a 2-5, until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll; on a 6, that enemy unit is not eligible to shoot this phase."
      }
    ],
    "composition": [
      "1 The Changeling – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Infernal Flames; the Trickster’s Staff.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Psyker",
      "Chaos",
      "Daemon",
      "The Changeling",
      "Tzeentch"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "the-masque-of-slaanesh",
    "name": "The Masque Of Slaanesh",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "Once high in the favour of the Dark Prince, this daemon was cursed by its petulant deity to dance eternally across reality and beyond for an imagined slight. Its endless acrobatic performance beguiles and bewilders, drawing those who witness it into joining the revels even at the expense of their own survival.",
    "profiles": [
      {
        "name": "The Masque Of Slaanesh",
        "m": "9\"",
        "t": "3",
        "sv": "7+",
        "w": "4",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Serrated claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Fights First, Lone Operative",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "The Eternal Dance",
        "text": "At the start of the Fight phase, select one enemy unit within 6\" of this model. Until the end of the phase:\n▪ Each time a friendly Slaanesh Legiones Daemonica model makes a melee attack that targets that enemy unit, add 1 to the Wound roll.\n▪ Each time a model in that enemy unit makes a melee attack, subtract 1 from the Wound roll."
      },
      {
        "name": "Dazzling Acrobatics",
        "text": "This model is eligible to declare a charge in a turn in which it Advanced or Fell Back."
      }
    ],
    "composition": [
      "1 The Masque of Slaanesh – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** serrated claws.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "The Masque of Slaanesh",
      "Slaanesh",
      "Daemon",
      "Chaos",
      "Fly"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "tormentbringer",
    "name": "Tormentbringer",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Riding to battle above the clatter-slash blades of their Exalted Seeker Chariot, these wilfully vicious entities delight in ploughing screaming souls into the churned dirt of the battlefield. They strive to travel faster, strike harder, and leave even their lightning-fast fellow charioteers envious in their wakes.",
    "profiles": [
      {
        "name": "Tormentbringer",
        "m": "14\"",
        "t": "6",
        "sv": "5+",
        "w": "12",
        "ld": "7+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Lashes of torment",
        "tags": [
          "ANTI-INFANTRY 3+",
          "ASSAULT",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Lashes of torment",
        "tags": [
          "ANTI-INFANTRY 3+",
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Seeker tongues",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Slashing claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "8",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Tormentbringer (Aura)",
        "text": "While a friendly Slaanesh Legiones Daemonica unit is within 6\" of this model, melee weapons in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Hysterical Frenzy (Psychic)",
        "text": "Each time a model in this model’s unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play."
      }
    ],
    "composition": [
      "1 Tormentbringer"
    ],
    "loadout": "**This model is equipped with:** lashes of torment; Seeker tongues; slashing claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hellflayers"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Tormentbringer on Exalted Seeker Chariot",
      "Chaos",
      "Psyker",
      "Daemon",
      "Slaanesh"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "tranceweaver",
    "name": "Tranceweaver",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "These favoured daemons of Slaanesh are raw manifestations of sensory excess and wilful cruelty. Heralds of the Dark Prince, they flow across the battlefield with inhuman grace, keening gleeful war cries as they exhort their fellows to greater acts of sadistic bliss-giving and lay enemies low with the razor caress of their talons.",
    "profiles": [
      {
        "name": "Tranceweaver",
        "m": "9\"",
        "t": "3",
        "sv": "7+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "melee": [
      {
        "name": "Ravaging claws",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Fights First, Leader",
    "faction": "The Shadow of Chaos",
    "abilities": [
      {
        "name": "Tranceweaver",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack is within range of an objective marker, you can re-roll the Hit roll instead."
      },
      {
        "name": "Symphony of Pain (Psychic)",
        "text": "At the end of your Movement phase, you can select one enemy unit that is Battle-shocked and within 12\" of this model. Until the end of the turn, each time a Slaanesh Legiones Daemonica model from your army makes an attack that targets that enemy unit, you can re-roll the Hit roll and you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Tranceweaver"
    ],
    "loadout": "**This model is equipped with:** ravaging claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Daemonettes"
      ]
    },
    "keywords": [
      "Infantry",
      "Daemon",
      "Chaos",
      "Tranceweaver",
      "Slaanesh",
      "Character",
      "Psyker"
    ],
    "factionKeywords": [
      "Legiones Daemonica"
    ],
    "baseSize": "32mm"
  }
]
