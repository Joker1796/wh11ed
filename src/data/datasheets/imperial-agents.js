// Imperial Agents — datasheets. Unit roster and points from src/data/mfm/imperial-agents.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "aquila-kill-team",
    "name": "Aquila Kill Team",
    "points": [
      {
        "models": 5,
        "points": 100
      },
      {
        "models": 10,
        "points": 200
      }
    ],
    "flavor": "Aquila Kill Teams are equipped to handle varied or unknown horrors with a measured and strategically versatile response.",
    "profiles": [
      {
        "name": "KILL TEAM SERGEANT, DEATHWATCH VETERAN",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2",
        "baseSize": "32mm"
      },
      {
        "name": "GRAVIS VETERAN",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "baseSize": "40mm"
      }
    ],
    "ranged": [
      {
        "name": "Astartes grenade launcher – frag",
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
        "name": "Astartes grenade launcher – krak",
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
          "PISTOL",
          "LETHAL HITS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Deathwatch marksman bolt carbine",
        "tags": [
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Frag cannon",
        "tags": [
          "BLAST",
          "HEAVY",
          "LETHAL HITS",
          "RAPID FIRE D3"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Hellstorm bolt rifle",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "LETHAL HITS"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Infernus heavy bolter – heavy bolter",
        "tags": [
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
        "name": "Infernus heavy bolter – heavy flamer",
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
        "name": "Plasma incinerator – standard",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma incinerator – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
      },
      {
        "name": "Special-issue bolt pistol",
        "tags": [
          "PISTOL",
          "PRECISION",
          "LETHAL HITS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stalker bolt rifle",
        "tags": [
          "HEAVY",
          "LETHAL HITS",
          "PRECISION"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
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
        "name": "Combat knife",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Power weapon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Xenophase blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Death to the Alien",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack does not have the IMPERIUM or CHAOS keywords, you can re-roll the Hit roll instead."
      },
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a Transport, Gravis Veteran models take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the GRAVIS keyword.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated Transport rules."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army can be attached to a Deathwatch Kill Team unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Kill Team Sergeant",
      "1 Gravis Veteran",
      "3 Deathwatch Veterans",
      "OR",
      "1 Kill Team Sergeant",
      "2 Gravis Veterans",
      "7 Deathwatch Veterans"
    ],
    "loadout": "**Each Kill Team Sergeant is equipped with:** plasma pistol; power weapon.\n\n**Each Gravis Veteran is equipped with:** infernus heavy bolter; bolt pistol; close combat weapon.\n\n**For every 5 models in the unit, 1 Deathwatch Veteran is equipped with:** stalker bolt rifle; bolt pistol; close combat weapon.\n\n**For every 5 models in the unit, 1 Deathwatch Veteran is equipped with:** bolt pistol; heavy thunder hammer.\n\n**For every 5 models in the unit, 1 Deathwatch Veteran is equipped with:** Deathwatch marksman bolt carbine; special-issue bolt pistol; close combat weapon.\n\n**If the unit contains 10 models, 1 Deathwatch Veteran is equipped with:** special-issue bolt pistol; xenophase blade.",
    "options": [
      "For every 5 models in the unit, up to 1 model’s infernus heavy bolter can be replaced with one of the following:\n▪ 1 frag cannon.\n▪ 1 hellstorm bolt rifle and 1 Astartes grenade launcher.",
      "For every 5 models in the unit, up to 1 model’s heavy thunder hammer can be replaced with 1 power weapon and 1 Astartes shield.",
      "For every 5 models in the unit, up to 1 model’s stalker bolt rifle can be replaced with 1 plasma incinerator.",
      "For every 5 models in the unit, up to 1 model’s Deathwatch marksman bolt carbine can be replaced with 1 combat knife."
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Ordo Xenos",
      "Grenades",
      "Imperium",
      "Gravis",
      "Tacticus",
      "Aquila Kill Team",
      "Deathwatch",
      "Retinue"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ]
  },
  {
    "id": "callidus-assassin",
    "name": "Callidus Assassin",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Anarchy flourishes in the wake of a Callidus Assassin’s deployment. They use the shape-shifting drug polymorphine to insinuate themselves close to their target, sabotaging systems and seeding misinformation before closing on their victim with blasts of their mind-destroying sidearm and flicks of their mysterious blade.",
    "profiles": [
      {
        "name": "Callidus Assassin",
        "m": "7\"",
        "t": "4",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Neural shredder",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PRECISION",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Phase sword and poison blades",
        "tags": [
          "LETHAL HITS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-4",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Fights First, Infiltrators, Lone Operative",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Acrobatic Escape",
        "text": "▪ At the end of the Fight phase, if this unit is engaged, this unit can make a fall-back move of up to D6\".\n▪ At the end of your opponent's turn, if this unit is more than 3\" from all enemy units, you can use this ability. If you do:\n▪ Place this unit in strategic reserves.\n▪ This unit must make an ingress move in your next Movement phase (including in your first turn)."
      },
      {
        "name": "Reign of Confusion",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, this model can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "composition": [
      "1 Callidus Assassin – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** neural shredder; phase sword and poison blades.",
    "keywords": [
      "Callidus Assassin",
      "Epic Hero",
      "Infantry",
      "Character",
      "Imperium",
      "Officio Assassinorum"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "SHADOW ASSIGNMENT",
        "text": "This model cannot be selected to be your WARLORD.\n\nIf your army faction is AGENTS OF THE IMPERIUM, then during the Declare Battle Formations step, you can replace this model with a different OFFICIO ASSASSINORUM model, provided the total points value of the new model does not exceed the points value of the model it replaced. Your army cannot include duplicates of the same model (i.e. after replacing a model with this rule, your army cannot have more than 1 VINDICARE ASSASSIN, it cannot have more than 1 CULEXUS ASSASSIN, it cannot have more than 1 EVERSOR ASSASSIN and it cannot have more than 1 CALLIDUS ASSASSIN)."
      }
    ]
  },
  {
    "id": "corvus-blackstar",
    "name": "Corvus Blackstar",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "Corvus Blackstars are sleek and shrouded aircraft used to insert kill teams into heavily infested landing zones or even xenos strongholds. With a barrage of missiles, Blackstars secure aerial supremacy and sweep the target site clear before firing their hover jets and delivering their deadly payload of elite warriors.",
    "profiles": [
      {
        "name": "Corvus Blackstar",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Blackstar rocket launcher",
        "tags": [
          "BLAST"
        ],
        "range": "30\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hurricane bolter",
        "tags": [
          "RAPID FIRE 6",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stormstrike missile launcher",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin assault cannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
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
        "name": "Armoured hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Hover, Stealth",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Blackstar Cluster Launcher",
        "text": "Each time this model ends a Normal move, you can select one enemy unit it moved over during that move and roll six D6: for each 5+, that unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Auspex Array",
        "text": "Ranged weapons equipped by the bearer have the [IGNORES COVER] ability."
      },
      {
        "name": "Infernum Halo-launcher",
        "text": "The bearer has the SMOKE keyword."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Corvus Blackstar"
    ],
    "loadout": "**This model is equipped with:** 2 Blackstar rocket launchers; twin assault cannon; armoured hull.",
    "options": [
      "This model’s twin assault cannon can be replaced with 1 twin lascannon.",
      "This model’s 2 Blackstar rocket launchers can be replaced with 2 stormstrike missile launchers.",
      "This model can be equipped with 1 hurricane bolter.",
      "This model can be equipped with one of the following:\n▪ 1 auspex array\n▪ 1 infernum halo-launcher"
    ],
    "transport": "This model has a transport capacity of 12 DEATHWATCH INFANTRY models.",
    "keywords": [
      "Vehicle",
      "Deathwatch",
      "Fly",
      "Corvus Blackstar",
      "Transport",
      "Imperium",
      "Ordo Xenos",
      "Retinue"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "culexus-assassin",
    "name": "Culexus Assassin",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "A Culexus Assassin projects an aura of unsettling fear all around them. Their primary targets are psykers, who are wracked with agony from these soulless assassins’ mere presence, and against the arcane blasts of a Culexus’ animus speculum, no witch long survives.",
    "profiles": [
      {
        "name": "Culexus Assassin",
        "m": "7\"",
        "t": "4",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Animus speculum",
        "tags": [
          "ANTI-PSYKER 2+",
          "ASSAULT",
          "PRECISION",
          "PSYCHIC ASSASSIN"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Life-draining touch",
        "tags": [
          "ANTI-PSYKER 2+",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Lone Operative, Stealth",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Etheric Emergence",
        "text": "In your Movement phase, when this model is set up on the battlefield using the Deep Strike ability, it can perform an etheric emergence. If it does, this model can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge."
      },
      {
        "name": "Abomination",
        "text": "This model has the Feel No Pain 2+ ability against Psychic Attacks."
      },
      {
        "name": "Soulless Horror",
        "text": "Once per battle, at the start of any Command phase, this model can use this ability. If it does, each enemy unit within 9\" of this model must take a Battle-shock test, subtracting 1 from that test (or subtracting 2 if that unit is a PSYKER)."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Psychic Assassin",
        "text": "Each time you select a PSYKER unit as the target for this weapon, until those attacks are resolved, change the Attacks characteristic of this weapon to 6."
      }
    ],
    "composition": [
      "1 Culexus Assassin – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** animus speculum; life-draining touch.",
    "keywords": [
      "Imperium",
      "Grenades",
      "Epic Hero",
      "Character",
      "Infantry",
      "Culexus Assassin",
      "Officio Assassinorum"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "SHADOW ASSIGNMENT",
        "text": "This model cannot be selected to be your WARLORD.\n\nIf your army faction is AGENTS OF THE IMPERIUM, then during the Declare Battle Formations step, you can replace this model with a different OFFICIO ASSASSINORUM model, provided the total points value of the new model does not exceed the points value of the model it replaced. Your army cannot include duplicates of the same model (i.e. after replacing a model with this rule, your army cannot have more than 1 VINDICARE ASSASSIN, it cannot have more than 1 CULEXUS ASSASSIN, it cannot have more than 1 EVERSOR ASSASSIN and it cannot have more than 1 CALLIDUS ASSASSIN)."
      }
    ]
  },
  {
    "id": "daemonhost",
    "name": "Daemonhost",
    "points": [
      {
        "models": 1,
        "points": 40
      },
      {
        "models": 2,
        "points": 80
      }
    ],
    "flavor": "Daemonhosts are empyric spirits bound by rite to the body of a mortal. Some serve as indentured minions in an Inquisitor’s retinue with a host of otherworldly abilities. It is a brave or foolish decision indeed to make a Daemonhost. Spirits that break free take delight in avenging themselves on their captors.",
    "profiles": [
      {
        "name": "Daemonhost",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "0",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Unholy gaze",
        "tags": [
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Warp grasp",
        "tags": [
          "LETHAL HITS",
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Malefic Warding",
        "text": "While an INQUISITOR model is leading a unit that includes one or more DAEMONHOST models, models in that unit have a 5+ invulnerable save."
      },
      {
        "name": "Bound Daemon",
        "text": "While an INQUISITOR model is leading a unit that includes one or more DAEMONHOST models, the Objective Control characteristic of DAEMONHOST models in that unit is 1."
      }
    ],
    "composition": [
      "1-2 Daemonhosts"
    ],
    "loadout": "**Every model is equipped with:** unholy gaze; Warp grasp.",
    "rules": [
      {
        "name": "INQUISITORIAL RETINUE",
        "text": "If your Army Faction is not AGENTS OF THE IMPERIUM, then for each unique pairing of 1 INQUISITORIAL AGENTS unit and 1 DAEMONHOST unit occurring in your army, increase the maximum number of RETINUE units permitted in your army by 1.\n\nAt the start of the Declare Battle Formations step, this unit can join one INQUISITORIAL AGENTS unit from your army that is being led by an INQUISITOR model (a unit cannot have more than one DAEMONHOST unit joined to it). If it does, until the end of the battle, every model in this unit counts as being part of that Bodyguard unit, and that Bodyguard unit’s Starting Strength is increased accordingly."
      }
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Psyker",
      "Retinue",
      "Daemon",
      "Daemonhost"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "damned-legionnaires",
    "name": "Damned Legionnaires",
    "points": [
      {
        "models": 5,
        "points": 90
      },
      {
        "models": 10,
        "points": 180
      }
    ],
    "profiles": [
      {
        "name": "Damned Legionnaires",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Bolt pistol",
        "tags": [
          "IGNORES COVER",
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
        "tags": [
          "IGNORES COVER"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Flamer",
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
        "name": "Multi-melta",
        "tags": [
          "HEAVY",
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma gun – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma gun – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
        "a": "5",
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
        "name": "Power weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Grim Spectres",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. That enemy unit must take a Battle-shock test, subtracting 1 from the result when doing so."
      }
    ],
    "composition": [
      "1 Legionnaire Sergeant",
      "4-9 Legionnaires"
    ],
    "loadout": "**Every model is equipped with:** boltgun; close combat weapon.",
    "options": [
      "The Legionnaire Sergeant’s boltgun can be replaced with one of the following:\n▪ 1 bolt pistol and 1 power weapon\n▪ 1 plasma pistol and 1 power weapon\n▪ 1 bolt pistol and 1 Astartes chainsword\n▪ 1 plasma pistol and 1 Astartes chainsword",
      "One Legionnaire’s boltgun can be replaced with one of the following:\n▪ 1 heavy flamer\n▪ 1 multi-melta",
      "One Legionnaire’s boltgun can be replaced with one of the following:\n▪ 1 flamer\n▪ 1 meltagun\n▪ 1 plasma gun"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Retinue",
      "Damned Legionnaires"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "deathwatch-kill-team",
    "name": "Deathwatch Kill Team",
    "points": [
      {
        "models": 5,
        "points": 100
      },
      {
        "models": 10,
        "points": 190
      }
    ],
    "flavor": "Deathwatch Veterans’ skills have been honed in their former Chapter for decades, sometimes centuries. Throughout their long vigil against the manifold xenos threats, each Veteran learns to arm himself so as to best contribute to the mission at hand, and squads carry an array of weapons to fell any foe.",
    "profiles": [
      {
        "name": "Deathwatch Veterans",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
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
        "name": "Frag cannon",
        "tags": [
          "BLAST",
          "HEAVY",
          "RAPID FIRE D3"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Infernus heavy bolter – heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Infernus heavy bolter – heavy flamer",
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
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Stalker-pattern boltgun",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Deathwatch shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Black Shield blades",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
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
        "name": "Deathwatch thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Xenophase blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Death to the Alien",
        "text": "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack does not have the IMPERIUM or CHAOS keywords, you can re-roll the Hit roll instead."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Watch Sergeant",
      "4-9 Deathwatch Veterans"
    ],
    "loadout": "**Every model is equipped with:** boltgun; power weapon.",
    "options": [
      "For every 5 models in this unit, up to 2 models can each have their boltgun and power weapon replaced with one of the following:\n▪ 1 boltgun and 1 Astartes shield\n▪ 1 power weapon and 1 Astartes shield",
      "For every 5 models in this unit, up to 2 models can each have their boltgun and power weapon replaced with 1 Deathwatch thunder hammer.",
      "For every 5 models in this unit, 1 model can have their boltgun and power weapon replaced with 1 stalker-pattern boltgun and 1 close combat weapon.",
      "For every 5 models in this unit, up to 2 models can each have their boltgun and power weapon replaced with 1 Deathwatch shotgun and 1 close combat weapon.",
      "For every 5 models in this unit, 1 model can have its boltgun and power weapon replaced with 1 frag cannon and 1 close combat weapon.",
      "For every 5 models in this unit, 1 model can have its boltgun and power weapon replaced with 1 infernus heavy bolter and 1 close combat weapon.",
      "One model's boltgun and power weapon can be replaced with 1 Black Shield blades.",
      "The Watch Sergeant’s power weapon can be replaced with 1 xenophase blade.",
      "The Watch Sergeant's boltgun can be replaced with 1 combi-weapon."
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Deathwatch",
      "Retinue",
      "Ordo Xenos",
      "Imperium",
      "Grenades",
      "Battleline"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "deathwatch-terminator-squad",
    "name": "Deathwatch Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 210
      },
      {
        "models": 10,
        "points": 420
      }
    ],
    "flavor": "The indomitable warriors honoured to wear hulking suits of Terminator armour are an inspiring sight to their brethren. Deathwatch Terminators carry the most powerful close combat weapons, and the strength and durability of their armour allows them to take the heaviest firepower directly into hidden xenos lairs.",
    "profiles": [
      {
        "name": "Deathwatch Terminator Squad",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Assault cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cyclone missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cyclone missile launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
        "name": "Plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
        "name": "Chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
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
      },
      {
        "name": "Twin lightning claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Terminatus Assault",
        "text": "Each time this unit ends a Charge move, each enemy unit within Engagement Range of this unit must take a Battle-shock test."
      },
      {
        "name": "Teleport Homer",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not in your opponent’s deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3\" of that token and not within 8\" of any enemy models. That token is then removed."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "1 Deathwatch Terminator Sergeant",
      "4-9 Deathwatch Terminators"
    ],
    "loadout": "**Every model is equipped with:** power fist; storm bolter.",
    "options": [
      "Up to 3 Deathwatch Terminators can each have their storm bolter replaced with one of the following:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 cyclone missile launcher and 1 storm bolter (this model’s storm bolter cannot be replaced)",
      "Any number of models can each have their power fist and storm bolter replaced with one of the following:\n▪ 1 storm bolter and 1 power weapon\n▪ 1 storm bolter and 1 chainfist\n▪ 1 twin lightning claws\n▪ 1 thunder hammer and 1 storm shield"
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER from your army with the Leader ability can be attached to a DEATHWATCH KILL TEAM, it can be attached to this unit instead."
      }
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Terminator",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Terminator Squad"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "eversor-assassin",
    "name": "Eversor Assassin",
    "points": [
      {
        "models": 1,
        "points": 100
      },
      {
        "models": 1,
        "points": 110,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "Berserk killers fuelled by unstable chemical stimms, Eversor Assassins are hurricanes of bladed and clawed destruction. They are unleashed as weapons of terror and annihilation, set loose to murder not only their intended target but anyone around them as well.",
    "profiles": [
      {
        "name": "Eversor Assassin",
        "m": "9\"",
        "t": "4",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Executioner pistol",
        "tags": [
          "ANTI-INFANTRY 3+",
          "PISTOL",
          "PRECISION",
          "SUSTAINED HITS 3"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power sword and neuro gauntlet",
        "tags": [
          "ANTI-INFANTRY 3+",
          "PRECISION",
          "SUSTAINED HITS 3"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise D3, Lone Operative, Scouts 9\"",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Frenzon",
        "text": "This model is eligible to shoot and declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Overkill",
        "text": "Once per battle, in your Movement phase, this model can use this ability before it makes a Normal move. If it does, until the end of the turn, add 6\" to this model’s Move characteristic and add 3 to the Attacks characteristic of this model’s melee weapons."
      }
    ],
    "composition": [
      "1 Eversor Assassin – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** executioner pistol; power sword and neuro gauntlet.",
    "keywords": [
      "Character",
      "Infantry",
      "Epic Hero",
      "Grenades",
      "Eversor Assassin",
      "Officio Assassinorum",
      "Imperium"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "SHADOW ASSIGNMENT",
        "text": "This model cannot be selected to be your WARLORD.\n\nIf your army faction is AGENTS OF THE IMPERIUM, then during the Declare Battle Formations step, you can replace this model with a different OFFICIO ASSASSINORUM model, provided the total points value of the new model does not exceed the points value of the model it replaced. Your army cannot include duplicates of the same model (i.e. after replacing a model with this rule, your army cannot have more than 1 VINDICARE ASSASSIN, it cannot have more than 1 CULEXUS ASSASSIN, it cannot have more than 1 EVERSOR ASSASSIN and it cannot have more than 1 CALLIDUS ASSASSIN)."
      }
    ]
  },
  {
    "id": "exaction-squad",
    "name": "Exaction Squad",
    "points": [
      {
        "models": 11,
        "points": 90
      },
      {
        "models": 11,
        "points": 85,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "The most experienced and level-headed Arbitrators form Exaction Squads to hunt down and seize dangerous transgressors alive. They do not hesitate to crush any who stand in their way, ruthlessly bludgeoning them or cutting them down in blazes of heavy firepower, never halting until their target is in custody.",
    "profiles": [
      {
        "name": "Exaction Squad",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Arbites combat shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Arbites grenade launcher – krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Arbites grenade launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Arbites shotpistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Executioner shotgun",
        "tags": [
          "IGNORES COVER",
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Webber",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "TORRENT"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Excruciator maul",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Mechanical bite",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Imperial Law",
        "text": "At the start of the battle, select one unit from your opponent’s army. Each time a model in this unit makes an attack that targets that unit, that attack has the [LETHAL HITS] and [PRECISION] abilities."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Arbites Medi-kit",
        "text": "At the start of your Command phase, if the bearer’s unit is below its Starting Strength, you can return up to D3 destroyed Exaction Vigilants to this unit."
      },
      {
        "name": "Nuncio Aquila",
        "text": "Once per battle, at the start of any Command phase, you can select one objective marker within 6\" of the bearer. All enemy units (excluding MONSTERS and VEHICLES) within range of that objective marker must take a Battle-shock test. Each objective marker can only be targeted by this ability once per turn.\n\n**Designer’s Note:** Place one Nuncio-aquila token next to the bearer, removing it once it uses this ability."
      },
      {
        "name": "Soulguilt Scanner",
        "text": "Ranged weapons equipped by models in the bearer’s unit have the [IGNORES COVER] ability."
      }
    ],
    "composition": [
      "1 Proctor-Exactant",
      "9 Exaction Vigilants",
      "1 Cyber-mastiff"
    ],
    "loadout": "**Every Proctor-Exactant and Exaction Vigilant is equipped with:** Arbites combat shotgun; Arbites shotpistol; close combat weapon.\n\n**The Cyber-mastiff is equipped with:** mechanical bite.",
    "options": [
      "Up to 2 Exaction Vigilants can each have their Arbites combat shotguns replaced with one of the following (duplicates are not allowed):\n▪ 1 executioner shotgun\n▪ 1 Arbites grenade launcher\n▪ 1 heavy stubber\n▪ 1 webber",
      "1 Exaction Vigilant that is equipped with an Arbites combat shotgun can be equipped with 1 excruciator maul.*",
      "1 other Exaction Vigilant that is equipped with an Arbites combat shotgun can be equipped with 1 Arbites medi-kit.*",
      "1 other Exaction Vigilant that is equipped with an Arbites combat shotgun can be equipped with 1 soulguilt scanner.*",
      "The Proctor-Exactant can be equipped with 1 nuncio aquila.",
      "* That model’s Arbites combat shotgun cannot be replaced."
    ],
    "keywords": [
      "Exaction Squad",
      "Infantry",
      "Grenades",
      "Imperium",
      "Adeptus Arbites",
      "Retinue"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "28.5mm / 25mm"
  },
  {
    "id": "fortis-kill-team",
    "name": "Fortis Kill Team",
    "points": [
      {
        "models": 5,
        "points": 100
      },
      {
        "models": 10,
        "points": 200
      }
    ],
    "flavor": "Further refined from Watch Master Mordelai’s original concept, Fortis Kill Teams exemplify the supreme adaptability of the Tacticus variant of Mk X power armour, seamlessly merging a variety of close support roles and deadly firepower.",
    "profiles": [
      {
        "name": "KILL TEAM INTERCESSOR",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "KILL TEAM OUTRIDER",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
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
        "name": "Long Vigil ranged weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma incinerator – standard",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma incinerator – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
      },
      {
        "name": "Twin bolt rifle",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "4+",
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
        "name": "Long Vigil melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a TRANSPORT, Kill Team Terminator models, Kill Team Outrider models, Kill Team Biker models and models equipped with a jump pack each take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the TERMINATOR, MOUNTED or JUMP PACK keywords.\n\nFor the purposes of interacting with terrain features, all models in units with this ability are considered INFANTRY models, even though similar models in other units may have the MOUNTED or JUMP PACK keywords.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated movement, Transport and Benefit of Cover rules."
      },
      {
        "name": "Fortis Doctrines",
        "text": "Each time a model in this unit makes an attack that targets a unit that is Below Half-strength, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "5-10 Kill Team Intercessors",
      "0-4 Kill Team Intercessors with plasma incinerators",
      "0-4 Kill Team Intercessors with heavy bolt pistols",
      "0-2 Kill Team Outriders"
    ],
    "loadout": "**Every Kill Team Intercessor is equipped with:** bolt pistol; bolt rifle; close combat weapon.\n\n**Every Kill Team Intercessor with plasma incinerator is equipped with:** bolt pistol; plasma incinerator; close combat weapon.\n\n**Every Kill Team Intercessor with heavy bolt pistol is equipped with:** heavy bolt pistol; Astartes chainsword.\n\n**Every Kill Team Outrider is equipped with:** bolt pistol; twin bolt rifle; Astartes chainsword.",
    "options": [
      "1 Kill Team Intercessor’s bolt rifle can be replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 plasma pistol\n▪ 1 Astartes chainsword\n▪ 1 Long Vigil melee weapon",
      "1 model equipped with a bolt rifle can replace its close combat weapon with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 Long Vigil melee weapon",
      "For every 5 models in this unit, 1 model’s bolt rifle can be replaced with 1 Long Vigil ranged weapon.",
      "Any number of Kill Team Intercessors with plasma incinerators can each have their bolt pistol replaced with 1 plasma pistol."
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER from your army with the Leader ability can be attached to a DEATHWATCH KILL TEAM, it can be attached to this unit instead."
      },
      {
        "name": "TRANSPORT",
        "text": "This unit cannot embark within an IMPERIAL RHINO."
      }
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Fortis Kill Team"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "grey-knights-terminator-squad",
    "name": "Grey Knights Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 175
      },
      {
        "models": 5,
        "points": 190,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "The Grey Knights are the foremost daemon-hunting elites in the Imperium. Amongst their ranks, few warriors are more fearsome or skilled than their Terminators. So it is that, when powerful Imperial agents call for aid against infernal threats, these battle-brothers often answer.",
    "profiles": [
      {
        "name": "Grey Knights Terminator Squad",
        "m": "5\"",
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
        "name": "Incinerator",
        "tags": [
          "IGNORES COVER",
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
        "name": "Psilencer",
        "tags": [
          "PRECISION",
          "PSYCHIC",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Psycannon",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
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
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Hammerhand (Psychic)",
        "text": "Each time a model in this unit makes a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Ancient’s Banner",
        "text": "Add 1 to the Objective Control characteristic of models in the bearer’s unit."
      },
      {
        "name": "Narthecium",
        "text": "In your Command phase, you can return 1 destroyed model (excluding CHARACTERS) to the bearer’s unit."
      }
    ],
    "composition": [
      "1 Terminator Justicar",
      "4 Grey Knight Terminators"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "1 Grey Knights Terminator's storm bolter can be replaced with one of the following:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon",
      "1 Grey Knights Terminator equipped with a storm bolter can be equipped with 1 Ancient’s banner.*",
      "1 Grey Knights Terminator can have its storm bolter replaced with 1 narthecium.*",
      "* You cannot select both of these options for the same model."
    ],
    "keywords": [
      "Terminator",
      "Psyker",
      "Infantry",
      "Grenades",
      "Grey Knights Terminator Squad",
      "Imperium",
      "Ordo Malleus",
      "Requisitioned"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "Rites of Teleportation",
        "text": "If one or more INQUISITOR units are attached to this unit during the Declare Battle formations step, models in those units have the Deep Strike ability."
      }
    ]
  },
  {
    "id": "imperial-navy-breachers",
    "name": "Imperial Navy Breachers",
    "points": [
      {
        "models": 10,
        "points": 90
      }
    ],
    "flavor": "Experienced in hazardous boarding actions, these elite Armsmen are aggressive and blunt instruments of their warship’s commander. They wear fully enclosed void armour and wield robust weapons optimised for close-confines fighting, while some carry more specialised gear for cracking enemy bulkheads.",
    "profiles": [
      {
        "name": "Imperial Navy Breachers",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Autopistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Demolition charge",
        "tags": [
          "ASSAULT",
          "BLAST",
          "HAZARDOUS",
          "ONE SHOT"
        ],
        "range": "6\"",
        "a": "D6",
        "bs": "5+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Meltagun",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Navis heavy shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Navis las-volley",
        "tags": [],
        "range": "18\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Navis shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma gun – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma gun – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "1",
        "ws": "5+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Chainsword",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
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
        "name": "Power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Breaching Team",
        "text": "Each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target of that attack is an enemy unit within range of an objective marker, you can re-roll the Wound roll instead."
      },
      {
        "name": "Gheistskull",
        "text": "Once per battle, when you select this unit as the target of the Grenade Stratagem, you can target one enemy unit visible to and within 18\" of this unit that is not within Engagement Range of any units from your army, instead of one within 8\"."
      },
      {
        "name": "CAT Unit",
        "text": "Once per battle, when this unit is selected to shoot, until the end of the phase, ranged weapons equipped by models in this unit gain the [IGNORES COVER] ability.\n\n**Designer’s Note:** Place one Gheistskull and one CAT Unit token next to this unit, removing each token once the relevant ability has been used."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Endurant Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Navis Sergeant-at-Arms",
      "9 Navis Armsmen"
    ],
    "loadout": "**The Navis Sergeant-at-Arms is equipped with:** Navis shotgun; close combat weapon.\n\n**One Navis Armsman is equipped with:** Navis las-volley; close combat weapon.\n\n**One other Navis Armsman is equipped with:** Navis heavy shotgun; close combat weapon; endurant shield.\n\n**Every other model is equipped with:** Navis shotgun; close combat weapon.",
    "options": [
      "The Navis Sergeant-at-Arms’ Navis shotgun can be replaced with one of the following:\n▪ 1 autopistol and 1 chainsword\n▪ 1 bolt pistol and 1 power weapon",
      "1 Navis Armsman’s Navis las-volley can be replaced with one of the following:\n▪ 1 meltagun\n▪ 1 plasma gun",
      "1 Navis Armsman's Navis shotgun can be replaced with 1 autopistol and 1 power weapon.",
      "1 Navis Armsman’s Navis shotgun can be replaced with 1 autopistol and 1 chainfist.",
      "1 Navis Armsman can be equipped with 1 demolition charge."
    ],
    "keywords": [
      "Smoke",
      "Grenades",
      "Battleline",
      "Infantry",
      "Imperial Navy Breachers",
      "Retinue",
      "Voidfarers",
      "Imperium"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "25mm / 28.5mm"
  },
  {
    "id": "imperial-rhino",
    "name": "Imperial Rhino",
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
    "flavor": "Amongst the most iconic and ubiquitous of the Imperium’s armoured infantry transports, the Rhino is as redoubtable as it is resilient. Boasting a capacious troop compartment, j .-I self-repairing capabilities and weapon mounts for storm bolters and hunter-killer missiles, it has earned its reputation as the workhorse of Imperial armies.",
    "profiles": [
      {
        "name": "Imperial Rhino",
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
    "core": "Deadly Demise D3, Firing Deck 2",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Self Repair",
        "text": "At the start of your Command phase, this model regains 1 lost wound."
      }
    ],
    "composition": [
      "1 Imperial Rhino"
    ],
    "loadout": "**This model is equipped with:** storm bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 12 AGENTS OF THE IMPERIUM INFANTRY models. It cannot transport TERMINATOR or OFFICIO ASSASSINORUM models.",
    "keywords": [
      "Imperium",
      "Vehicle",
      "Smoke",
      "Transport",
      "Dedicated Transport",
      "Imperial Rhino",
      "Frame"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "indomitor-kill-team",
    "name": "Indomitor Kill Team",
    "points": [
      {
        "models": 5,
        "points": 120
      },
      {
        "models": 10,
        "points": 240
      }
    ],
    "flavor": "Comprising warriors wearing the heavier Gravis variant of Mk X armour, Indomitor Kill Teams are mobile bastions capable of unleashing the firepower of a squadron of battle tanks. Before them, hordes of xenos and monstrous beasts alike are torn apart.",
    "profiles": [
      {
        "name": "Indomitor Kill Team",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Assault bolters",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "SUSTAINED HITS 2",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Auto boltstorm gauntlets",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
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
        "name": "Fragstorm grenade launcher",
        "tags": [
          "BLAST"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy bolt rifle",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Flamestorm gauntlets",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6+1",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Melta rifle",
        "tags": [
          "HEAVY",
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "HEAVY",
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma exterminators – standard",
        "tags": [
          "ASSAULT",
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma exterminators – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
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
        "name": "Power fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a TRANSPORT, Kill Team Terminator models, Kill Team Outrider models, Kill Team Biker models and models equipped with a jump pack each take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the TERMINATOR, MOUNTED or JUMP PACK keywords.\n\nFor the purposes of interacting with terrain features, all models in units with this ability are considered INFANTRY models, even though similar models in other units may have the MOUNTED or JUMP PACK keywords.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated movement, Transport and Benefit of Cover rules."
      },
      {
        "name": "Indomitor Doctrines",
        "text": "Each time a model in this unit makes an attack, add 1 to the Hit roll if this unit is below its Starting Strength, and add 1 to the Wound roll as well if this unit is Below Half-strength."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Jump Pack",
        "text": "The bearer has a Move characteristic of 10\" and can move over models and terrain features as if they were not there."
      }
    ],
    "composition": [
      "5-10 Kill Team Heavy Intercessors",
      "0-2 Kill Team Heavy Intercessors with power fists",
      "0-2 Kill Team Heavy Intercessors with melta rifles",
      "0-2 Kill Team Heavy Intercessors with jump packs"
    ],
    "loadout": "**Every Kill Team Heavy Intercessor is equipped with:** bolt pistol; heavy bolt rifle; close combat weapon.\n\n**Every Kill Team Heavy Intercessor with power fists is equipped with:** flamestorm gauntlets; power fists.\n\n**Every Kill Team Heavy Intercessor with melta rifle is equipped with:** bolt pistol; melta rifle; close combat weapon.\n\n**Every Kill Team Heavy Intercessor with jump pack is equipped with:** assault bolters; close combat weapon; jump pack.",
    "options": [
      "For every 5 models in this unit, 1 model equipped with a heavy bolt rifle can have its heavy bolt rifle replaced with 1 heavy bolter.",
      "1 model equipped with a melta rifle can have its melta rifle replaced with 1 multi-melta.",
      "Any number of models equipped with flamestorm gauntlets can each have their flamestorm gauntlets replaced with 1 auto boltstorm gauntlets and 1 fragstorm grenade launcher.",
      "Any number of models equipped with assault bolters can each have their assault bolters replaced with 1 plasma exterminators."
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER unit from your army can be attached to a DEATHWATCH KILL TEAM, it can be attached to this unit instead."
      },
      {
        "name": "TRANSPORT",
        "text": "This unit cannot embark within an IMPERIAL RHINO."
      }
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Indomitor Kill Team"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "inquisitor",
    "name": "Inquisitor",
    "points": [
      {
        "models": 1,
        "points": 55
      },
      {
        "models": 1,
        "points": 65,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "It is the Inquisitors’ task to investigate xenos plots, corruption, mutation, heresy, cults, rogue psykers and anything else they deem worthy of scrutiny. Such is their power, nothing is beyond their authority and no one is beyond their justice. If they deem it necessary, they can order the destruction of entire worlds.",
    "profiles": [
      {
        "name": "Inquisitor",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
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
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Psychic Shock Wave",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Inquisitorial melee weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Power of the Rosette",
        "text": "Each time you target this model’s unit with a Stratagem, roll one D6: on a 3+, you gain 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Blessed Wardings",
        "text": "While the bearer is leading a unit, models in that unit have a 6+ invulnerable save."
      },
      {
        "name": "Psychic Gifts",
        "text": "The bearer has the PSYKER keyword."
      }
    ],
    "composition": [
      "1 Inquisitor"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Inquisitorial melee weapon; blessed wardings.",
    "options": [
      "This model’s bolt pistol can be replaced with 1 combi-weapon.",
      "This model’s blessed wardings can be replaced with 1 psychic gifts and 1 Psychic Shock Wave.",
      "If this model is equipped with 1 psychic gifts, its Inquisitorial melee weapon can be replaced with 1 force weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aquila Kill Team",
        "Exaction Squad",
        "Grey Knights Terminator Squad",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Sanctifiers",
        "Sisters of Battle Squad",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Inquisitor",
      "Imperium",
      "Infantry",
      "Character",
      "Grenades"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "inquisitor-coteaz",
    "name": "Inquisitor Coteaz",
    "points": [
      {
        "models": 1,
        "points": 75
      },
      {
        "models": 1,
        "points": 95,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "A puritan of the Ordo Malleus, Inquisitor Coteaz spends every waking moment studying reports made by his countless agents, or facing down daemons, heretics and aliens in open battle. He refuses to harness the power of the warp for his own ends, wiedling it instead to combat the daemonic and prosecute those who lack purity.",
    "profiles": [
      {
        "name": "Inquisitor Coteaz",
        "m": "6\"",
        "t": "3",
        "sv": "2+",
        "w": "4",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Psychic Blast",
        "tags": [
          "ANTI-DAEMON 4+",
          "ANTI-INFANTRY 5+",
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Nemesis daemon hammer",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Malefic Wardings (Psychic)",
        "text": "While this model is leading a unit, models in that unit have a 6+ invulnerable save, and a 4+ invulnerable save against Psychic Attacks and attacks made by DAEMON models."
      },
      {
        "name": "Spy Network",
        "text": "Each time your opponent gains a CP as the result of an ability, roll one D6: on a 2+, you also gain 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Glovodan Psyber-eagle",
        "text": "In your Command phase, you can select one enemy unit within 18\" of the bearer. Until the start of your next Command phase, that unit cannot have the Benefit of Cover.\n\n**Designer’s Note:** Place a Glovodan Psyber-eagle token next to the selected unit to remind you."
      }
    ],
    "composition": [
      "1 Inquisitor Coteaz – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Psychic Blast; Nemesis daemon hammer; Glovodan psyber-eagle.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Exaction Squad",
        "Grey Knights Terminator Squad",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Coteaz",
      "Inquisitor",
      "Ordo Malleus",
      "Imperium",
      "Psyker",
      "Epic Hero",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "inquisitor-draxus",
    "name": "Inquisitor Draxus",
    "points": [
      {
        "models": 1,
        "points": 75
      },
      {
        "models": 1,
        "points": 110,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "An audacious and committed Ordo Xenos Inquisitor, Kyria Draxus is a specialist in hunting Necrons. Radical in her outlook, she accepts the necessity of working with some aliens to protect the Imperium. She has learned about the Necrons from the Aeldari and honed her psychic abilities through xenos, as well as Human, tuition.",
    "profiles": [
      {
        "name": "Inquisitor Draxus",
        "m": "6\"",
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
        "name": "Dirgesinger",
        "tags": [
          "ANTI-INFANTRY 4+",
          "ASSAULT",
          "DEVASTATING WOUNDS"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Psychic Tempest",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS 2"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Xenos Hunter",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack that targets an enemy unit that does not have the IMPERIUM or CHAOS keywords, add 1 to the Hit roll."
      },
      {
        "name": "Psychic Veil (Psychic)",
        "text": "In your Command phase, this PSYKER can use this ability. If it does, roll one D6: on a 1, this PSYKER’s unit suffers D3 mortal wounds; on a 2+, until the start of your next Command phase, this PSYKER’s unit can only be selected as the target of a ranged attack if the attacking model is within 18\"."
      }
    ],
    "composition": [
      "1 Lord Inquisitor Kyria Draxus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Dirgesinger; Psychic Tempest; power fist.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aquila Kill Team",
        "Exaction Squad",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Ordo Xenos",
      "Imperium",
      "Psyker",
      "Infantry",
      "Character",
      "Grenades",
      "Inquisitor",
      "Epic Hero",
      "Draxus"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "inquisitor-eisenhorn",
    "name": "Inquisitor Eisenhorn",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Inquisitor Eisenhorn of the Ordo Xenos is a man of great willpower and resolve. He will go to any lengths to preserve the Imperium, and for his actions has been declared a traitor twice – he was found to be loyal on both occasions. Eisenhorn is also a potent telepath, with the power to compel individuals, or even groups, to follow his instructions.",
    "profiles": [
      {
        "name": "Inquisitor Eisenhorn",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Artificer bolt pistol",
        "tags": [],
        "range": "12\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Mind Assault",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION",
          "PSYCHIC",
          "SUSTAINED HITS 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Runestaff and Barbarisater",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Malus Codicium",
        "text": "While this model is leading a unit, double the Attacks characteristic of melee weapons equipped by DAEMONHOST models in that unit."
      },
      {
        "name": "Dominate Will (Psychic)",
        "text": "At the start of your opponent’s Shooting phase, select one enemy INFANTRY unit that is within 12\" of and visible to this model and roll one D6: on a 1, this model suffers D3 mortal wounds; on a 2-5, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; on a 6, until the end of the phase, that unit is not eligible to shoot."
      }
    ],
    "composition": [
      "1 Inquisitor Eisenhorn – Epic Hero"
    ],
    "loadout": "**This model is equipped with:** artificer bolt pistol; Mind Assault; runestaff and Barbarisater.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Kill Team",
        "Fortis Kill Team",
        "Indomitor Kill Team",
        "Proteus Kill Team",
        "Spectrus Kill Team",
        "Daemonhost",
        "Exaction Squad",
        "Imperium Battleline Infantry",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Psyker",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Inquisitor",
      "Eisenhorn"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "inquisitor-greyfax",
    "name": "Inquisitor Greyfax",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Inquisitor Greyfax is feared even by many in her own order, the Ordo Hereticus. Devoid of mercy or remorse, she is an iron-willed warrior. She is also a powerful psyker, with telepathic abilities that enable her to detect lies in those she questions. Some brand Greyfax a dangerous radical for this, but her commitment to the Imperium is undeniable.",
    "profiles": [
      {
        "name": "Inquisitor Greyfax",
        "m": "6\"",
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
        "name": "Castigation",
        "tags": [
          "ANTI-CHARACTER 4+",
          "DEVASTATING WOUNDS",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Condemnor stake",
        "tags": [
          "ANTI-PSYKER 2+",
          "DEVASTATING WOUNDS",
          "PRECISION",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted power sword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Psyoculum",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ANTI-PSYKER 4+] ability."
      },
      {
        "name": "No Mercy",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Below Half-strength, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Inquisitor Greyfax – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Castigation; condemnor stake; master-crafted power sword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Exaction Squad",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Sanctifiers",
        "Sisters of Battle Squad",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Inquisitor",
      "Greyfax",
      "Ordo Hereticus",
      "Imperium",
      "Grenades",
      "Psyker",
      "Epic Hero",
      "Infantry",
      "Character"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "inquisitor-in-terminator-armour",
    "name": "Inquisitor in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "profiles": [
      {
        "name": "Inquisitor in Terminator Armour",
        "m": "5\"",
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
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Psycannon",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Psychic shock wave",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "3",
        "ap": "-2",
        "d": "1"
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
        "name": "Force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Inquisitorial melee weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Power of the Rosette",
        "text": "Each time you target this model’s unit with a Stratagem, roll one D6: on a 3+, you gain 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Blessed Wardings",
        "text": "While the bearer is leading a unit, models in that unit have a 6+ invulnerable save."
      },
      {
        "name": "Psychic Gifts",
        "text": "The bearer has the PSYKER keyword."
      }
    ],
    "composition": [
      "1 Inquisitor in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Inquisitorial melee weapon; blessed wardings.",
    "options": [
      "This model’s storm bolter can be replaced with 1 combi-weapon.",
      "This model’s blessed wardings can be replaced with 1 psychic gifts and 1 psychic shock wave.",
      "If this model is equipped with 1 psychic gifts, its Inquisitorial melee weapon can be replaced with 1 force weapon.",
      "If this model is equipped with 1 psychic gifts, its storm bolter can be replaced with 1 psycannon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Kill Team",
        "Fortis Kill Team",
        "Indomitor Kill Team",
        "Proteus Kill Team",
        "Spectrus Kill Team",
        "Deathwatch Terminator Squad",
        "Exaction Squad",
        "Grey Knights Terminator Squad",
        "Imperium Battleline Infantry",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Sisters of Battle Squad",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Terminator",
      "Imperium",
      "Inquisitor"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "inquisitor-karamazov",
    "name": "Inquisitor Karamazov",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "Inquisitor Karamazov is amongst the most ruthless and uncompromising of the Ordo Hereticus. His actions have no guile or subterfuge, and he has no time for clemency. Karamazov has led vast crusading armies, as well as presided over the trials of heretics from his Throne of Judgement – an ancient bipedal battle-shrine.",
    "profiles": [
      {
        "name": "Inquisitor Karamazov",
        "m": "8\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Master-crafted multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted power sword",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Throne of Judgement (Aura)",
        "text": "While a friendly unit is within 6\" of this model, improve the Leadership characteristic of models in that unit by 1. While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1."
      },
      {
        "name": "Unsubtle Crusader",
        "text": "At the start of the Declare Battle Formations step, you can select up to three AGENTS OF THE IMPERIUM INFANTRY units from your army, or one IMPERIUM BATTLELINE unit from your army – those units gain the Scouts 6\" ability."
      }
    ],
    "composition": [
      "1 Inquisitor Karamazov – Epic Hero"
    ],
    "loadout": "**This model is equipped with:** master-crafted multi-melta; master-crafted power sword.",
    "keywords": [
      "Vehicle",
      "Walker",
      "Character",
      "Epic Hero",
      "Imperium",
      "Inquisitor",
      "Ordo Hereticus",
      "Karamazov"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "inquisitor-kroyle",
    "name": "Inquisitor Kroyle",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "A radical Inquisitor of the Ordo Xenos, Ynighoh Kroyle is a consummate hunter of alien monstrosities. From atop his subjugated Garralisk steed, Kroyle stalks and engages xenos prey, bringing even the most formidable targets down with venom-laced shots from his Jindarii tox-cycler.",
    "profiles": [
      {
        "name": "Inquisitor Kroyle",
        "m": "12\"",
        "t": "4",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Jindarii tox-cycler",
        "tags": [
          "ANTI-MONSTER 2+",
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Stubcarbine",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Butcher blade",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Garralisk's claws and teeth",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "4",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Lone Operative, Scouts 6\"",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "On My Signal, Fire!",
        "text": "After this unit has shot, you can select one enemy unit hit by those attacks. Until the end of the phase, each time an AGENTS OF THE IMPERIUM or IMPERIUM INFANTRY BATTLELINE model from your army makes an attack that targets that enemy unit, you can re-roll the Hit roll."
      },
      {
        "name": "Tox-cycler",
        "text": "In your Shooting phase, after this unit has shot, if this model scored a hit with its Jindarii tox-cycler, until the end of the battle, add 2 to the Strength and Damage characteristics of that weapon (to a maximum Damage characteristic of 6)."
      }
    ],
    "composition": [
      "1 Inquisitor Kroyle – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Jindarii tox-cycler; stubcarbine; butcher blade; Garralisk’s claws and teeth.",
    "options": [
      "None"
    ],
    "keywords": [
      "Grenades",
      "Mounted",
      "Character",
      "Epic Hero",
      "Imperium",
      "Ordo Xenos",
      "Inquisitor",
      "Kroyle"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "inquisitor-ostromandeus",
    "name": "Inquisitor Ostromandeus",
    "points": [
      {
        "models": 2,
        "points": 65
      }
    ],
    "profiles": [
      {
        "name": "INQUISITOR OSTROMANDEUS",
        "m": "6\"",
        "t": "3",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "5+",
        "invNote": "* Inquisitor Ostromandeus only."
      },
      {
        "name": "STENTOR-I-52",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "8+",
        "oc": "1"
      }
    ],
    "ranged": [
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
        "name": "Hydraulic vox-ram",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-2",
        "d": "2"
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
    "core": "Feel No Pain 4+, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Authority of the Inquisition",
        "text": "While this unit is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within."
      },
      {
        "name": "Ward Against the Malefic Arts",
        "text": "While this unit is leading a unit, each time a Psychic Attack targets that unit, subtract 1 from the Hit roll and subtract 1 from the Wound roll."
      },
      {
        "name": "Vox-cast Proclamations (Aura)",
        "text": "Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this unit’s Inquisitor Ostromandeus model, increase the cost of that use of that Stratagem by 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Vox-skull",
        "text": "Once per battle, at the start of any phase, you can select one enemy unit (excluding MONSTERS and VEHICLES) within 12\" of the bearer. That unit must take a Battle-shock test; if that test is failed, until the end of your next turn, that unit cannot have the Benefit of Cover.\n\n**Designer’s Note:** Place a vox-skull token next to the unit, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Inquisitor Ostromandeus – Epic Hero",
      "1 Stentor-I-52 – Epic Hero"
    ],
    "loadout": "**Inquisitor Ostromandeus is equipped with:** inferno pistol; power sword; vox-skull.\n\n**Stentor-I-52 is equipped with:** hydraulic vox-ram.",
    "leader": {
      "text": "This unit can be attached to the following units:",
      "units": [
        "Exaction Squad",
        "Imperium Battleline Infantry",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Sisters of Battle Squad",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Epic Hero",
      "Imperium",
      "Inquisitor",
      "Ostromandeus"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "inquisitorial-agents",
    "name": "Inquisitorial Agents",
    "points": [
      {
        "models": 6,
        "points": 50
      },
      {
        "models": 12,
        "points": 100
      },
      {
        "models": 6,
        "points": 60,
        "note": "Agents of the Imperium (allied)"
      },
      {
        "models": 12,
        "points": 120,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "To aid them in their esoteric and complex missions, many Inquisitors maintain retinues of select individuals of rare talent, skill and power. Motley collections of fighters, fanatics, savants and psykers, they work ceaselessly in the shadows to protect the Imperium.",
    "profiles": [
      {
        "name": "Inquisitorial Agents",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "1",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Agent firearm",
        "tags": [
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
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "HEAVY",
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma cannon – standard",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "ap": "-1",
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
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Agent melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Eviscerator",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Mystic stave",
        "tags": [
          "ANTI-INFANTRY 4+",
          "PSYCHIC"
        ],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Loyal Henchmen",
        "text": "While an Inquisitor model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Tome-skull",
        "text": "Once per battle for each Tome-skull this unit is equipped with, at the start of any phase, you can select either one friendly AGENTS OF THE IMPERIUM unit that is Battle-shocked and within 6\" of this unit or one enemy unit within 6\" of this unit. If you select a friendly unit, that unit is no longer Battle-shocked. If you select an enemy unit, it must take a Battle-shock test.\n\n**Designer’s Note:** Place the appropriate number of Tome-skull tokens next to the unit at the start of the battle, removing one each time this unit uses this ability."
      }
    ],
    "composition": [
      "5-10 Inquisitorial Agents",
      "1-2 Gun Servitors*"
    ],
    "loadout": "*This unit can only contain 2 Gun Servitors if it also contains 10 Inquisitorial Agents.\n\n**Every Inquisitorial Agent is equipped with:** agent firearm; agent melee weapon.\n\n**Every Gun Servitor is equipped with:** heavy bolter; agent melee weapon.",
    "options": [
      "For every 5 Inquisitorial Agents in this unit, it can be equipped with 1 Tome-skull.",
      "For every 5 Inquisitorial Agents in this unit, 1 Inquisitorial Agent can be equipped with 1 plasma pistol.**",
      "For every 5 Inquisitorial Agents in this unit, 1 Inquisitorial Agent can be equipped with 1 eviscerator.**",
      "For every 5 Inquisitorial Agents in this unit, 1 Inquisitorial Agent can be equipped with 1 mystic stave.**",
      "Any number of Gun Servitors can each have their heavy bolter replaced with one of the following:\n▪ 1 multi-melta\n▪ 1 plasma cannon",
      "**The same model cannot be equipped with more than one of these wargear options."
    ],
    "keywords": [
      "Retinue",
      "Imperium",
      "Infantry",
      "Grenades",
      "Inquisitorial Agents"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "25mm / 32mm",
    "rules": [
      {
        "name": "INQUISITORIAL HENCHMEN",
        "text": "If your Army Faction is not AGENTS OF THE IMPERIUM, then for each Inquisitor unit you include in your army, you can include one INQUISITORIAL AGENTS unit in your army that does not count towards the number of RETINUE units your army can include (see Assigned Agents)."
      }
    ]
  },
  {
    "id": "inquisitorial-chimera",
    "name": "Inquisitorial Chimera",
    "points": [
      {
        "models": 1,
        "points": 60,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 70,
        "note": "4th+"
      }
    ],
    "flavor": "The Chimera is a blend of armoured personnel carrier and light tank, easy to produce en masse and extremely versatile. Those deployed by Imperial agents boast a wealth of varied armament options, transporting their passengers swiftly into battle then providing heavy covering fire while they complete their missions.",
    "profiles": [
      {
        "name": "Chimera",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Heavy bolter",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
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
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hunter-killer missile",
        "tags": [
          "ONE SHOT"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Lasgun array",
        "tags": [
          "RAPID FIRE 6"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Multi-laser",
        "tags": [],
        "range": "36\"",
        "a": "4",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
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
    "core": "Deadly Demise D3, Firing Deck 2",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Rapid Deployment",
        "text": "Units can disembark from this TRANSPORT after it has Advanced. Units that do so count as having made a Normal move that phase, and cannot declare a charge in the same turn, but can otherwise act normally."
      }
    ],
    "composition": [
      "1 Inquisitorial Chimera"
    ],
    "loadout": "**This model is equipped with:** multi-laser; heavy bolter; lasgun array; armoured tracks.",
    "options": [
      "This model’s heavy bolter can be replaced with 1 heavy flamer.",
      "This model’s multi-laser can be replaced with one of the following:\n▪ 1 Heavy bolter*\n▪ 1 Heavy flamer*\n\n*This weapon cannot be replaced.",
      "This model can be equipped with one of the following:\n▪ 1 heavy stubber\n▪ 1 storm bolter",
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 13 INQUISITOR INFANTRY and INQUISITORIAL AGENT models. It cannot transport TERMINATOR models.",
    "keywords": [
      "Transport",
      "Smoke",
      "Vehicle",
      "Inquisitorial Chimera",
      "Imperium",
      "Dedicated Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "janus-draik",
    "name": "Janus Draik",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "profiles": [
      {
        "name": "Janus Draik",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Heirloom pistol",
        "tags": [
          "ANTI-INFANTRY 4+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Monomolecular rapier",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "4",
        "ws": "3+",
        "s": "3",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Backroom Deals",
        "text": "If your army contains one or more units with this ability, during the Declare Battle Formations step, select one of those units. While the selected unit is leading a unit, models in that unit have the Infiltrators ability."
      },
      {
        "name": "Warrant of Trade",
        "text": "If your army includes one or more units with this ability, after both players have deployed their armies, select up to D3 IMPERIUM BATTLELINE units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Janus Draik – Epic Hero"
    ],
    "loadout": "**This model is equipped with:** heirloom pistol; monomolecular rapier.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Imperial Navy Breachers",
        "Voidsmen-at-Arms"
      ]
    },
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Voidfarers",
      "Character",
      "Epic Hero",
      "Janus Draik"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "jokaero-weaponsmith",
    "name": "Jokaero Weaponsmith",
    "points": [
      {
        "models": 1,
        "points": 30
      }
    ],
    "flavor": "These xenos are technosavants with an instinctive understanding of machinery and technological systems. Given enough time and materials they can fashion almost anything, and can make even the most basic weapons formidable with minor – albeit perplexing – upgrades.",
    "profiles": [
      {
        "name": "Jokaero Weaponsmith",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "2",
        "ld": "7+",
        "oc": "0",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Jokaero weapons – scattered",
        "tags": [
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
        "name": "Jokaero weapons – focused",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Inconceivable Augmentation",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "A Weaponsmith, Not a Warlord",
        "text": "This model cannot be selected to be your WARLORD. While an INQUISITOR model is leading a unit that includes one or more JOKAERO WEAPONSMITH models, the Objective Control characteristic of JOKAERO WEAPONSMITH models in that unit is 1."
      }
    ],
    "composition": [
      "1 Jokaero Weaponsmith"
    ],
    "loadout": "**This model is equipped with:** Jokaero weapons; close combat weapon.",
    "rules": [
      {
        "name": "INQUISITORIAL AGENT",
        "text": "If your Army Faction is not AGENTS OF THE IMPERIUM, then for each unique pairing of 1 INQUISITORIAL AGENTS unit and 1 JOKAERO WEAPONSMITH unit occurring in your army, increase the maximum number of CHARACTER units permitted in your army by 1."
      }
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Inquisitorial Agents"
      ],
      "footer": "You can attach this model to an INQUISITORIAL AGENTS unit, even if one INQUISITOR unit has already been attached to it. If you do, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
    },
    "keywords": [
      "Infantry",
      "Imperium",
      "Character",
      "Jokaero Weaponsmith"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "kill-team-cassius",
    "name": "Kill Team Cassius",
    "points": [
      {
        "models": 11,
        "points": 220
      }
    ],
    "flavor": "Kill Team Cassius is an elite squad of specialists, even amongst Talasa Prime’s ranks of Veterans. Hand-picked by Chaplain Cassius for an unauthorised mission, the kill team uncovered the first recorded Genestealer Cult alongside him on Ghosar Quintus. They have fought together many times since, and baulk at no xenos horror.",
    "profiles": [
      {
        "name": "CHAPLAIN CASSIUS",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "2",
        "inv": "4+"
      },
      {
        "name": "KILL TEAM VETERAN",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "KILL TEAM TERMINATOR",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      },
      {
        "name": "KILL TEAM BIKER",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
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
        "name": "Deathwatch twin boltgun",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Frag cannon",
        "tags": [
          "BLAST",
          "HEAVY",
          "RAPID FIRE D3"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
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
        "name": "Long Vigil ranged weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Psychic Cleanse",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "melee": [
      {
        "name": "Artificer crozius",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-3",
        "d": "D3"
      },
      {
        "name": "Long Vigil melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
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
        "name": "Twin lightning claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a TRANSPORT, Kill Team Terminator models, Kill Team Outrider models, Kill Team Biker models and models equipped with a jump pack each take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the TERMINATOR, MOUNTED or JUMP PACK keywords.\n\nFor the purposes of interacting with terrain features, all models in units with this ability are considered INFANTRY models, even though similar models in other units may have the MOUNTED or JUMP PACK keywords.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated movement, Transport and Benefit of Cover rules."
      },
      {
        "name": "Catechism of Death",
        "text": "While this unit contains Chaplain Cassius, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Unflinching",
        "text": "You can re-roll Battle-shock tests for this unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Jump Pack",
        "text": "The bearer has a Move characteristic of 12\" and can move over models and terrain features as if they were not there."
      },
      {
        "name": "Psychic Hood",
        "text": "Models in the bearer’s unit have the Feel No Pain 4+ ability against Psychic Attacks."
      }
    ],
    "composition": [
      "1 Chaplain Cassius – Epic Hero",
      "8 Kill Team Veterans: Vael Donatus, Zameon Gydrael, Rodricus Grytt, Antor Delassio, Edryc Setorax, Jensus Natorian, Drenn Redblade, Ennox Sorrlock",
      "1 Kill Team Terminator (Garran Branatar)",
      "1 Kill Team Biker (Jetek Suberei)"
    ],
    "loadout": "**Chaplain Cassius is equipped with:** artificer crozius; bolt pistol.\n\n**Vael Donatus is equipped with:** boltgun; bolt pistol; close combat weapon.\n\n**Zameon Gydrael is equipped with:** Long Vigil ranged weapon; Long Vigil melee weapon.\n\n**Rodricus Grytt is equipped with:** frag cannon; bolt pistol; close combat weapon.\n\n**Antor Delassio is equipped with:** Long Vigil ranged weapon; Long Vigil melee weapon; jump pack.\n\n**Edryc Setorax is equipped with:** twin lightning claws; jump pack.\n\n**Jensus Natorian is equipped with:** Psychic Cleanse; bolt pistol; force weapon; psychic hood.\n\n**Drenn Redblade is equipped with:** Long Vigil melee weapon; boltgun.\n\n**Garran Branatar is equipped with:** heavy flamer; Long Vigil ranged weapon; power fist.\n\n**Ennox Sorrlock is equipped with:** Long Vigil ranged weapon; close combat weapon.\n\n**Jetek Suberei is equipped with:** Deathwatch twin boltgun; Long Vigil melee weapon.",
    "rules": [
      {
        "name": "CASSIUS",
        "text": "Your army cannot contain both CHAPLAIN CASSIUS and KILL TEAM CASSIUS."
      }
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Deathwatch",
      "Kill Team Cassius",
      "Character",
      "Epic Hero"
    ],
    "keywordsByModel": [
      {
        "model": "ALL MODELS",
        "list": [
          "Infantry",
          "Kill Team",
          "Grenades",
          "Imperium",
          "Ordo Xenos",
          "Deathwatch",
          "Kill Team Cassius"
        ]
      },
      {
        "model": "CHAPLAIN CASSIUS",
        "list": [
          "Character",
          "Epic Hero"
        ]
      }
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "ministorum-priest",
    "name": "Ministorum Priest",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "In Mankind’s endless war for survival, faith and zealotry are weapons as potent as any blade or firearm. Ministorum Priests embody this truth, striding into battle bellowing martial canticles to inspire allies and terrify foes. Some crush enemies’ skulls and shatter their bones with blows from crackling power maces, while others immolate their victims with vindictorflame weapons.",
    "profiles": [
      {
        "name": "Ministorum Priest",
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
        "name": "Holy pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Zealot’s vindictor",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power weapon",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Zealot's vindictor",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Support",
    "abilities": [
      {
        "name": "Holy Hatred",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Zealot",
        "text": "Once per battle, in the Fight phase, this model can use this ability. If it does, until the end of the phase, improve the Attacks and Strength characteristics of melee weapons equipped by this model by 3."
      }
    ],
    "composition": [
      "1 Ministorum Priest"
    ],
    "loadout": "**This model is equipped with:** zealot’s vindictor.",
    "options": [
      "This model’s zealot’s vindictor can be replaced with 1 holy pistol and 1 power weapon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Exaction Squad",
        "Imperial Navy Breachers",
        "Inquisitorial Agents",
        "Sanctifiers",
        "Sisters of Battle Squad",
        "Subductor Squad",
        "Vigilant Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Imperium",
      "Ordo Hereticus",
      "Ministorum Priest"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "navigator",
    "name": "Navigator",
    "points": [
      {
        "models": 1,
        "points": 60
      },
      {
        "models": 1,
        "points": 75,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "Haughty nobles whose value to the Imperium is huge, Navigators take to the battlefield only rarely, typically to complete some vital mission for their voidship’s master. At such times, their ability to perceive the shifting tides of the warp makes them powerful assets, as does the soul-blasting gaze of their mutant third eye.",
    "profiles": [
      {
        "name": "Navigator",
        "m": "6\"",
        "t": "3",
        "sv": "5+",
        "w": "3",
        "ld": "7+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Laspistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Force-orb cane",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Gaze into the Empyrean (Psychic)",
        "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" of this model."
      },
      {
        "name": "Third Eye (Psychic)",
        "text": "At the start of your Shooting phase, select one enemy unit within 12\" of and visible to this model. That unit must take a Battle-shock test, subtracting 2 from the result if it is an INFANTRY unit. If the test is failed, that enemy unit suffers 3 mortal wounds."
      }
    ],
    "composition": [
      "1 Navigator"
    ],
    "loadout": "**This model is equipped with:** laspistol; force-orb cane.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Voidsmen-at-Arms",
        "Imperial Navy Breachers"
      ]
    },
    "keywords": [
      "Voidfarers",
      "Psyker",
      "Character",
      "Infantry",
      "Imperium",
      "Navigator"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "neyam-shai-murad",
    "name": "Neyam Shai Murad",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "profiles": [
      {
        "name": "Neyam Shai Murad",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Negotiator pistols",
        "tags": [
          "PRECISION"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
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
    "core": "Infiltrators, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Backroom Deals",
        "text": "If your army contains one or more units with this ability, during the Declare Battle Formations step, select one of those units. While the selected unit is leading a unit, models in that unit have the Infiltrators ability."
      },
      {
        "name": "Warrant of Trade",
        "text": "If your army includes one or more units with this ability, after both players have deployed their armies, select up to D3 IMPERIUM BATTLELINE units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Neyam Shai Murad – Epic Hero"
    ],
    "loadout": "**This model is equipped with:** negotiator pistols; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Imperial Navy Breachers",
        "Voidsmen-at-Arms"
      ]
    },
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Voidfarers",
      "Character",
      "Epic Hero",
      "Neyam Shai Murad"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "proteus-kill-team",
    "name": "Proteus Kill Team",
    "points": [
      {
        "models": 5,
        "points": 160
      },
      {
        "models": 10,
        "points": 320
      }
    ],
    "flavor": "The sheer versatility of their weapon loadout, coupled with their durability and manoeuvrability, make it little wonder that Proteus Kill Teams have worked miraculous feats of arms on countless hostile worlds over the course of the Imperium’s history.",
    "profiles": [
      {
        "name": "KILL TEAM VETERANS",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "KILL TEAM BIKER",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "KILL TEAM TERMINATOR",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Assault cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
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
        "name": "Cyclone missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Cyclone missile launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Frag cannon",
        "tags": [
          "BLAST",
          "HEAVY",
          "RAPID FIRE D3"
        ],
        "range": "18\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
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
        "name": "Infernus heavy bolter – heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Infernus heavy bolter – heavy flamer",
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
        "name": "Long Vigil ranged weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma cannon – standard",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
        "name": "Twin boltgun",
        "tags": [
          "TWIN-LINKED"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Deathwatch thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Long Vigil melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
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
        "name": "Terminator thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin lightning claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a TRANSPORT, Kill Team Terminator models, Kill Team Outrider models, Kill Team Biker models and models equipped with a jump pack each take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the TERMINATOR, MOUNTED or JUMP PACK keywords.\n\nFor the purposes of interacting with terrain features, all models in units with this ability are considered INFANTRY models, even though similar models in other units may have the MOUNTED or JUMP PACK keywords.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated movement, Transport and Benefit of Cover rules."
      },
      {
        "name": "Proteus Doctrines",
        "text": "Each time a model in this unit makes an attack that targets a unit that is not Below Half-strength, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      },
      {
        "name": "Jump Pack",
        "text": "The bearer has a Move characteristic of 12\" and can move over models and terrain features as if they were not there."
      },
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "5-10 Kill Team Veterans",
      "0-4 Kill Team Veterans with Jump Packs",
      "0-2 Kill Team Bikers",
      "0-4 Kill Team Terminators"
    ],
    "loadout": "**Every Kill Team Veteran is equipped with:** boltgun; Long Vigil melee weapon; close combat weapon.\n\n**Every Kill Team Veteran with Jump Pack is equipped with:** Long Vigil melee weapon; close combat weapon; jump pack.\n\n**Every Kill Team Biker is equipped with:** twin boltgun; close combat weapon.\n\n**Every Kill Team Terminator is equipped with:** storm bolter; power fist.",
    "options": [
      "Any number of Kill Team Veterans can replace their boltgun and Long Vigil melee weapon with:\n▪ 1 Long Vigil ranged weapon\n▪ 1 boltgun and 1 Astartes shield\n▪ 1 Long Vigil melee weapon and 1 Astartes shield",
      "For every 5 models in this unit, up to 2 models can replace their boltgun and Long Vigil melee weapon with 1 Deathwatch thunder hammer.",
      "For every 5 models in the unit, up to 2 models can replace their boltgun and Long Vigil melee weapon with one of the following:\n▪ 1 frag cannon\n▪ 1 Infernus heavy bolter",
      "Any number of Kill Team Biker models can be equipped with one of the following:\n▪ 1 bolt pistol\n▪ 1 Long Vigil melee weapon",
      "Up to 3 models can each have their storm bolter replaced with one of the following:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 cyclone missile launcher and 1 storm bolter (this model’s storm bolter cannot be replaced)",
      "Any number of Kill Team Terminator models can replace their power fist and storm bolter with one of the following:\n▪ 1 storm bolter and 1 power weapon\n▪ 1 storm bolter and 1 chainfist\n▪ 1 twin lightning claws\n▪ 1 Terminator thunder hammer and 1 storm shield"
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER from your army with the Leader ability can be attached to a DEATHWATCH KILL TEAM, it can be attached to this unit instead."
      }
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Proteus Kill Team"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "rogue-trader-entourage",
    "name": "Rogue Trader Entourage",
    "points": [
      {
        "models": 4,
        "points": 75
      },
      {
        "models": 4,
        "points": 105,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "Rogue Traders are daring explorers, ruthless conquerors and cunning merchants, exploring and exploiting the uncharted regions of the galaxy in the name of the Imperium. Their families bear a Warrant of Trade, which helps to identify them as Imperial elites. Some command whole armadas, while others have only a small retinue of followers.",
    "profiles": [
      {
        "name": "ROGUE TRADER",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "25mm"
      },
      {
        "name": "OTHER MODELS",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "25mm"
      }
    ],
    "ranged": [
      {
        "name": "Dartmask",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "2",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Household pistol",
        "tags": [
          "PISTOL",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Laspistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Voltaic pistol",
        "tags": [
          "PISTOL",
          "SUSTAINED HITS 2"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
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
        "name": "Death Cult power blade",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Monomolecular cane-rapier",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Backroom Deals",
        "text": "If your army contains one or more units with this ability, during the Declare Battle Formations step, select one of those units. While the selected unit is leading a unit, models in that unit have the Infiltrators ability."
      },
      {
        "name": "Warrant of Trade",
        "text": "If your army includes one or more units with this ability, after both players have deployed their armies, select up to D3 IMPERIUM BATTLELINE units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Healing Serum",
        "text": "At the start of your Command phase, if the bearer’s unit is below its Starting Strength, you can return up to D3 destroyed models (excluding CHARACTERS) to the bearer’s unit."
      }
    ],
    "composition": [
      "1 Rogue Trader",
      "1 Death Cult Assassin",
      "1 Lectro-Maester",
      "1 Rejuvenat Adept"
    ],
    "loadout": "**The Rogue Trader is equipped with:** household pistol; monomolecular cane-rapier.\n\n**The Death Cult Assassin is equipped with:** dartmask; Death Cult power blade.\n\n**The Lectro-Maester is equipped with:** voltaic pistol; close combat weapon.\n\n**The Rejuvenat Adept is equipped with:** laspistol; close combat weapon; healing serum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Voidsmen-at-Arms",
        "Imperial Navy Breachers"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Rogue Trader Entourage",
      "Voidfarers",
      "Grenades",
      "Imperium"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ]
  },
  {
    "id": "sanctifiers",
    "name": "Sanctifiers",
    "points": [
      {
        "models": 9,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "",
        "m": "6\"",
        "t": "3",
        "sv": "6+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Holy fire",
        "tags": [
          "IGNORES COVER",
          "ONE SHOT",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
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
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Ministorum flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Ministorum hand flamer",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
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
        "name": "Plasma gun – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma gun – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Burning hands",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "1",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
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
        "name": "Death Cult blades",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Sanctifier melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Ministorum Sermon",
        "text": "While this unit contains a MINISTORUM PRIEST, each time a model in this unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Cherub",
        "text": "Once per battle, you can target this unit with the Command Re-roll Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.\n\n**Designer’s Note:** Place a Cherub token next to the unit, removing it once this ability has been used."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Salvationist Medikit",
        "text": "In your Command phase, if the bearer is on the battlefield, you can return up to D3 destroyed models (excluding CHARACTER models) to this unit."
      },
      {
        "name": "Simulacrum Imperialis",
        "text": "Improve the Leadership characteristic of models in the bearer’s unit by 1."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Ministorum Priest or Inquisitor model from your army with the Leader ability can be attached to a Sisters of Battle Squad, it can be attached to this unit instead. If a MINISTORUM PRIEST or INQUISITOR model from your army is attached to this unit during the Declare Battle Formations step, that model gains the Scouts 6\" ability."
      }
    ],
    "composition": [
      "1 Miraculist",
      "1 Salvationist",
      "1 Death Cult Assassin",
      "2 Missionaries",
      "4 Sanctifiers"
    ],
    "loadout": "**The Miraculist is equipped with:** holy fire; burning hands.\n\n**The Salvationist is equipped with:** close combat weapon; Salvationist medikit.\n\n**The Death Cult Assassin is equipped with:** Death Cult blades.\n\n**1 Missionary is equipped with:** plasma gun; Sanctifier melee weapon.\n\n**1 Missionary is equipped with:** Ministorum flamer; Sanctifier melee weapon.\n\n**Every Sanctifier is equipped with:** Ministorum hand flamer; Sanctifier melee weapon.",
    "options": [
      "1 Missionary model can have its 1 plasma gun replaced with 1 meltagun.",
      "1 Missionary model equipped with 1 plasma gun can be equipped with 1 holy fire (this model’s plasma gun cannot be replaced).",
      "1 Sanctifier model can have its 1 Sanctifier melee weapon replaced with 1 Ministorum hand flamer and 1 close combat weapon.",
      "1 Sanctifier model can have its 1 Sanctifier melee weapon replaced with 1 close combat weapon and 1 simulacrum imperialis."
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Retinue",
      "Sanctifiers",
      "Grenades"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "sisters-of-battle-immolator",
    "name": "Sisters of Battle Immolator",
    "points": [
      {
        "models": 1,
        "points": 90,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 100,
        "note": "4th+"
      },
      {
        "models": 1,
        "points": 105,
        "note": "1st-3rd, Agents of the Imperium (allied)"
      },
      {
        "models": 1,
        "points": 115,
        "note": "4th+, Agents of the Imperium (allied)"
      }
    ],
    "flavor": "The Immolator is an armoured transport commonly employed by the Adepta Sororitas. As befits their zealous style of war, its armaments tend towards aggressive short-ranged firepower best employed amidst dense terrain or on the attack. Countless heretics and xenos have been reduced to ash by the fiery blasts of these tools of purgation.",
    "profiles": [
      {
        "name": "Immolator",
        "m": "12\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Heavy bolter",
        "tags": [
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
        "name": "Immolation flamers",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin heavy bolter",
        "tags": [
          "SUSTAINED HITS 2",
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
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Purge and Cleanse",
        "text": "Each time this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      }
    ],
    "composition": [
      "1 Sisters of Battle Immolator"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; immolation flamers; armoured tracks.",
    "options": [
      "This model’s immolation flamers can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta",
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 6 ORDO HERETICUS INFANTRY models.\n\nAt the start of the Declare Battle Formations step, you can select one SISTERS OF BATTLE SQUAD from your army. If you do, that unit is split into two units, each containing as equal a number of models as possible (when splitting a unit in this way, make a note of which models form each of the two new units). One of these units must start the battle embarked within this TRANSPORT; the other can start the battle embarked within another TRANSPORT, or it can be deployed as a separate unit.",
    "keywords": [
      "Smoke",
      "Vehicle",
      "Transport",
      "Dedicated Transport",
      "Imperium",
      "Ordo Hereticus",
      "Sisters of Battle Immolator",
      "Frame"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "sisters-of-battle-squad",
    "name": "Sisters of Battle Squad",
    "points": [
      {
        "models": 10,
        "points": 100
      },
      {
        "models": 10,
        "points": 110,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "The Adepta Sororitas - or Battle Sisters - are the militant arm of the Imperial faith. Clad in sanctified power armour and wielding an array of potent mid-to-close-ranged firearms, these fanatical warriors excel in clearing out nests of heresy and gunning down enemies of the Golden Throne wherever they are found. They are valued allies to any Imperial agent.",
    "profiles": [
      {
        "name": "Battle Sisters Squad",
        "m": "6\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "7+",
        "oc": "2",
        "inv": "6+"
      }
    ],
    "ranged": [
      {
        "name": "Artificer-crafted storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
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
        "name": "Boltgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Condemnor boltgun",
        "tags": [
          "ANTI-PSYKER 2+",
          "DEVASTATING WOUNDS",
          "PRECISION",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
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
        "name": "Ministorum flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Ministorum hand flamer",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
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
        "name": "Ministorum heavy flamer",
        "tags": [
          "IGNORES COVER",
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
        "name": "Multi-melta",
        "tags": [
          "HEAVY",
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma pistol - standard",
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
        "name": "Plasma pistol - supercharge",
        "tags": [
          "PISTOL",
          "HAZARDOUS"
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
        "name": "Chainsword",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Defenders of the Faith",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase."
      },
      {
        "name": "Incensor Cherub",
        "text": "Once per battle, you can target this unit with the Command Re-roll Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.\n\n**Designer’s Note:** Place an Incensor Cherub token next to the unit, removing it once this ability has been used."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Simulacrum Imperials",
        "text": "Improve the Leadership characteristic of models in the bearer’s unit by 1."
      }
    ],
    "composition": [
      "1 Sister Superior",
      "9 Battle Sisters"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "The Sister Superior’s boltgun can be replaced with one of the following:\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 condemnor boltgun\n▪ 1 inferno pistol\n▪ 1 Ministorum hand flamer\n▪ 1 plasma pistol",
      "The Sister Superior can be equipped with one of the following:\n▪ 1 chainsword\n▪ 1 power weapon",
      "1 Battle Sister’s boltgun can be replaced with one of the following:\n▪ 1 artificer-crafted storm bolter\n▪ 1 meltagun\n▪ 1 Ministorum flamer",
      "1 Battle Sister’s boltgun can be replaced with one of the following:\n▪ 1 artificer-crafted storm bolter\n▪ 1 heavy bolter\n▪ 1 meltagun\n▪ 1 Ministorum flamer\n▪ 1 Ministorum heavy flamer\n▪ 1 multi-melta",
      "1 Battle Sister equipped with 1 boltgun can be equipped with 1 simulacrum imperialis (that model’s boltgun cannot be replaced)."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Ordo Hereticus",
      "Requisitioned",
      "Sisters of Battle Squad"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "spectrus-kill-team",
    "name": "Spectrus Kill Team",
    "points": [
      {
        "models": 5,
        "points": 90
      },
      {
        "models": 10,
        "points": 180
      }
    ],
    "flavor": "Sinister, silent and all but invisible until they strike, Spectrus Kill Teams are adept in inflicting death from both near and far. Clad in close-fitting Mk X Phobos battle plate, they specialise in battlefield control and enemy destabilisation.",
    "profiles": [
      {
        "name": "Spectrus Kill Team",
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
        "name": "Accelerator autocannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "4+",
        "s": "8",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt carbine",
        "tags": [
          "PRECISION"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bolt sniper rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Las fusil",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Marksman bolt carbine",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Occulus bolt carbine",
        "tags": [
          "ASSAULT",
          "IGNORES COVER"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Special-issue bolt pistol",
        "tags": [
          "PISTOL",
          "PRECISION"
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
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combat knife",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Paired combat blades",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Scouts 6\"",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Kill Team",
        "text": "Each time an attack targets this unit, if it contains models with different Toughness characteristics, until the attacking unit has finished making its attacks, use the Toughness characteristic of the majority of the models in that unit when determining what roll is required for that attack to successfully wound. If two or more Toughness characteristics are tied for majority, use the highest value.\n\nFor the purposes of determining which models in this unit can embark within a TRANSPORT, Kill Team Terminator models, Kill Team Outrider models, Kill Team Biker models and models equipped with a jump pack each take up the space of 2 models, but can otherwise embark within any TRANSPORT their unit can embark within, even though similar models in other units have the TERMINATOR, MOUNTED or JUMP PACK keywords.\n\nFor the purposes of interacting with terrain features, all models in units with this ability are considered INFANTRY models, even though similar models in other units may have the MOUNTED or JUMP PACK keywords.\n\n**Designer’s Note:** While the abstractions in the above rule cause some models to behave differently to similar models in other units, they are designed to minimise complicated movement, Transport and Benefit of Cover rules."
      },
      {
        "name": "Spectrus Doctrines",
        "text": "At the end of your opponent’s turn, if this unit is more than 6\" away from all enemy units, you can remove this unit from the battlefield and place it into Strategic Reserves."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Helix Gauntlet",
        "text": "Models in the bearer’s unit have the Feel No Pain 6+ ability."
      },
      {
        "name": "Infiltrator Comms Array",
        "text": "Each time you target the bearer’s unit with a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Jump Pack",
        "text": "The bearer has a Move characteristic of 12\" and can move over models and terrain features as if they were not there."
      }
    ],
    "composition": [
      "5-10 Kill Team Infiltrators",
      "0-2 Kill Team Infiltrators with bolt sniper rifles",
      "0-2 Kill Team Infiltrators with jump packs",
      "0-4 Kill Team Infiltrators with occulus bolt carbines",
      "0-4 Kill Team Infiltrators with combat knives"
    ],
    "loadout": "**Every Kill Team Infiltrator is equipped with:** bolt pistol; marksman bolt carbine; close combat weapon.\n\n**Every Kill Team Infiltrator with bolt sniper rifle is equipped with:** bolt pistol; bolt sniper rifle; close combat weapon.\n\n**Every Kill Team Infiltrator with jump pack is equipped with:** bolt pistol; accelerator autocannon; close combat weapon; jump pack.\n\n**Every Kill Team Infiltrator with occulus bolt carbine is equipped with:** bolt pistol; occulus bolt carbine; paired combat blades.\n\n**Every Kill Team Infiltrator with combat knife is equipped with:** special-issue bolt pistol; combat knife.",
    "options": [
      "One model equipped with a marksman bolt carbine can be equipped with 1 helix gauntlet.*",
      "One model equipped with a marksman bolt carbine can be equipped with 1 Infiltrator comms array.*\n* These options cannot be taken on the same model.",
      "One model can replace its bolt sniper rifle with 1 bolt carbine.",
      "Any number of models can each replace their bolt sniper rifle with 1 las fusil.",
      "Any number of models can each replace their combat knife with 1 bolt carbine and 1 close combat weapon."
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER from your army with the Leader ability can be attached to a DEATHWATCH KILL TEAM, it can be attached to this unit instead."
      },
      {
        "name": "TRANSPORT",
        "text": "This unit cannot embark within an IMPERIAL RHINO."
      }
    ],
    "keywords": [
      "Infantry",
      "Kill Team",
      "Smoke",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Spectrus Kill Team"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "subductor-squad",
    "name": "Subductor Squad",
    "points": [
      {
        "models": 11,
        "points": 85
      },
      {
        "models": 11,
        "points": 100,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "Subductors possess one of the most recognisable – and feared – silhouettes to the Imperium’s criminal classes. Bearing Subjugation-pattern assault shields and crackling shock mauls, they are brutal front-line brawlers capable of crushing the most stubborn dissent.",
    "profiles": [
      {
        "name": "Subductor Squad",
        "m": "6\"",
        "t": "3",
        "sv": "3+",
        "w": "1",
        "ld": "7+",
        "oc": "1",
        "inv": "4+",
        "invNote": "*Excluding the Cyber-mastiff."
      }
    ],
    "ranged": [
      {
        "name": "Arbites shotpistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Mechanical bite",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Shock maul",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Dedication to Duty",
        "text": "Each time a model in this unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Nuncio Aquila",
        "text": "Once per battle, at the start of any Command phase, you can select one objective marker within 6\" of the bearer. All enemy units (excluding MONSTERS and VEHICLES) within range of that objective marker must take a Battle-shock test. Each objective marker can only be targeted by this ability once per turn.\n\n**Designer’s Note:** Place one Nuncio-aquila token next to the bearer, removing it once it uses this ability."
      }
    ],
    "composition": [
      "1 Proctor-Subductor",
      "9 Subductors",
      "1 Cyber-mastiff"
    ],
    "loadout": "**Every Proctor-Subductor and Subductor is equipped with:** Arbites shotpistol; shock maul.\n\n**The Cyber-mastiff is equipped with:** mechanical bite.",
    "options": [
      "The Proctor-Subductor can be equipped with 1 nuncio aquila."
    ],
    "keywords": [
      "Imperium",
      "Adeptus Arbites",
      "Retinue",
      "Subductor Squad",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "28.5mm / 25mm"
  },
  {
    "id": "ur-025",
    "name": "UR-025",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "profiles": [
      {
        "name": "UR-025",
        "m": "5\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "7+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Mk 1 assault weapon",
        "tags": [
          "ASSAULT"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power claw",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Lone Operative",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Self Repair",
        "text": "At the start of your Command phase, this model regains 1 lost wound."
      },
      {
        "name": "Evade and Survive",
        "text": "In your opponent’s Movement phase, when an enemy unit ends a Normal, Advance or Fall Back move within 8\" of this model, if this model is not within Engagement Range of one or more enemy units, it can make a Normal move."
      }
    ],
    "composition": [
      "1 UR-025 – Epic Hero"
    ],
    "loadout": "**This model is equipped with:** Mk 1 assault weapon; power claw.",
    "keywords": [
      "Infantry",
      "Imperium",
      "Character",
      "Epic Hero",
      "UR-025"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "veteran-bike-squad",
    "name": "Veteran Bike Squad",
    "points": [
      {
        "models": 3,
        "points": 70
      },
      {
        "models": 6,
        "points": 140
      }
    ],
    "flavor": "Matching their speed, strength and firepower against the swiftest xenos, Veteran Bikers are expert hunters. Undertaking extended missions in dangerous territory, they assess their enemy’s every weakness, close off escape routes and use their velocity to enact sudden strikes from unexpected angles.",
    "profiles": [
      {
        "name": "Veteran Bike Squad",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
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
        "name": "Long Vigil ranged weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin boltgun",
        "tags": [
          "TWIN-LINKED"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Long Vigil melee weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Xenophase blade",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Turbo-boost",
        "text": "Each time this unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of models in this unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Veteran Biker Sergeant",
      "2-5 Veteran Bikers"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; close combat weapon; twin boltgun.",
    "options": [
      "The Veteran Biker Sergeant can be equipped with one of the following:\n▪ 1 Long Vigil ranged weapon\n▪ 1 Long Vigil melee weapon\n▪ 1 xenophase blade\n▪ 1 Astartes shield",
      "Any number of Veteran Biker models can each be equipped with 1 Long Vigil melee weapon."
    ],
    "keywords": [
      "Mounted",
      "Grenades",
      "Imperium",
      "Ordo Xenos",
      "Retinue",
      "Deathwatch",
      "Veteran Bike Squad"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.1"
  },
  {
    "id": "vigilant-squad",
    "name": "Vigilant Squad",
    "points": [
      {
        "models": 11,
        "points": 85
      }
    ],
    "flavor": "Vigilants brutally sweep the guilty from existence with the signature combat shotgun of the Adeptus Arbites. These grim Arbitrators are ever alert to malfeasance and unwavering in its punishment, unleashing devastating blasts at close range.",
    "profiles": [
      {
        "name": "Vigilant Squad",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Arbites combat shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Arbites grenade launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Arbites grenade launcher – krak",
        "tags": [],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
      },
      {
        "name": "Arbites shotpistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Executioner shotgun",
        "tags": [
          "IGNORES COVER",
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Webber",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "TORRENT"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Mechanical bite",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Merciless Judgement",
        "text": "Each time a model in this unit makes a ranged attack that targets a unit that is Below Half-strength, add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Nuncio Aquila (Aura)",
        "text": "Once per battle, at the start of any Command phase, you can select one objective marker within 6\" of the bearer. All enemy units (excluding MONSTERS and VEHICLES) within range of that objective marker must take a Battle-shock test. Each objective marker can only be targeted by this ability once per turn.\n\n**Designer’s Note:** Place one Nuncio-aquila token next to the bearer, removing it once it uses this ability."
      }
    ],
    "composition": [
      "1 Proctor-Vigilant",
      "9 Vigilants",
      "1 Cyber-mastiff"
    ],
    "loadout": "**Every Proctor-Vigilant and Vigilant is equipped with:** Arbites combat shotgun; Arbites shotpistol; close combat weapon.\n\n**The Cyber-mastiff is equipped with:** mechanical bite.",
    "options": [
      "Up to 2 Vigilants can each have their Arbites combat shotgun replaced with one of the following (duplicates are not allowed):\n▪ 1 executioner shotgun\n▪ 1 Arbites grenade launcher\n▪ 1 heavy stubber\n▪ 1 webber",
      "The Proctor-Vigilant can be equipped with 1 nuncio aquila."
    ],
    "keywords": [
      "Retinue",
      "Battleline",
      "Infantry",
      "Grenades",
      "Imperium",
      "Vigilant Squad",
      "Adeptus Arbites"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "28.5mm / 25mm"
  },
  {
    "id": "vindicare-assassin",
    "name": "Vindicare Assassin",
    "points": [
      {
        "models": 1,
        "points": 110
      },
      {
        "models": 1,
        "points": 125,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "The muffled crack of a Vindicare Assassin’s exitus rifle is all that most ever detect of its presence – that, and the spray of their victim’s brain matter. They are lethal marksmen who find the perfect firing position from which to pinpoint their quarry, while against more numerous foes they swiftly rack up high body counts with shot after expert shot.",
    "profiles": [
      {
        "name": "Vindicare Assassin",
        "m": "7\"",
        "t": "4",
        "sv": "6+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Exitus pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
          "PISTOL",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Exitus rifle",
        "tags": [
          "DEVASTATING WOUNDS",
          "HEAVY",
          "IGNORES COVER",
          "PRECISION"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Vindicare combat knife",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Lone Operative, Stealth",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Dead-shot",
        "text": "When this unit is selected to shoot, until this unit has shot: enemy units do not have [core:Lone Operative]; hidden enemy units have +15\" detection range."
      },
      {
        "name": "Shieldbreaker",
        "text": "Once per battle, when selecting targets for this model’s exitus rifle, it can fire a shieldbreaker round. If it does, until the end of the phase, each time this model makes an attack with that weapon, add 1 to the Wound roll and any successful Wound roll scores a Critical Wound."
      }
    ],
    "composition": [
      "1 Vindicare Assassin – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** exitus pistol; exitus rifle; Vindicare combat knife.",
    "keywords": [
      "Imperium",
      "Officio Assassinorum",
      "Character",
      "Vindicare Assassin",
      "Epic Hero",
      "Smoke",
      "Infantry"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm",
    "rules": [
      {
        "name": "SHADOW ASSIGNMENT",
        "text": "This model cannot be selected to be your WARLORD.\n\nIf your army faction is AGENTS OF THE IMPERIUM, then during the Declare Battle Formations step, you can replace this model with a different OFFICIO ASSASSINORUM model, provided the total points value of the new model does not exceed the points value of the model it replaced. Your army cannot include duplicates of the same model (i.e. after replacing a model with this rule, your army cannot have more than 1 VINDICARE ASSASSIN, it cannot have more than 1 CULEXUS ASSASSIN, it cannot have more than 1 EVERSOR ASSASSIN and it cannot have more than 1 CALLIDUS ASSASSIN)."
      }
    ]
  },
  {
    "id": "voidsmen-at-arms",
    "name": "Voidsmen-at-Arms",
    "points": [
      {
        "models": 6,
        "points": 50
      },
      {
        "models": 6,
        "points": 70,
        "note": "Agents of the Imperium (allied)"
      }
    ],
    "flavor": "Voidsmen-at-Arms provide security on the ships of many Rogue Traders. Well drilled and often well equipped, they are highly adept at fighting in vessel corridors and other close-quarters environments.",
    "profiles": [
      {
        "name": "Voidsmen-at-Arms",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "1",
        "ld": "7+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Artificer shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Lasgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Laspistol",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Voidsman rotor cannon",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "5+",
        "s": "6",
        "ap": "0",
        "d": "1"
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
        "name": "Vicious bite",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Masters of Close Confines",
        "text": "Each time a model in this unit makes a ranged attack that targets the closest eligible target, that attack has the [LETHAL HITS] ability."
      }
    ],
    "composition": [
      "1 Voidmaster",
      "4 Voidsmen",
      "1 Canid"
    ],
    "loadout": "**The Voidmaster is equipped with:** artificer shotgun; laspistol; close combat weapon.\n\n**One Voidsman is equipped with:** laspistol; Voidsman rotor cannon; close combat weapon.\n\n**Every other Voidsman is equipped with:** lasgun; laspistol; close combat weapon.\n\n**The Canid is equipped with:** vicious bite.",
    "keywords": [
      "Voidfarers",
      "Retinue",
      "Voidsmen-at-Arms",
      "Grenades",
      "Infantry",
      "Imperium"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "25mm",
    "rules": [
      {
        "name": "NAVY BODYGUARD",
        "text": "If your Army Faction is not AGENTS OF THE IMPERIUM, then for each Voidfarers Character unit you include in your army, you can include one VOIDSMEN-AT-ARMS unit in your army that does not count towards the number of RETINUE units your army can include (see Assigned Agents)"
      }
    ]
  },
  {
    "id": "watch-captain-artemis",
    "name": "Watch Captain Artemis",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Born survivor of a feral world and formerly of the macabre Mortifactors Chapter, Artemis leads a Watch Company of Talasa Prime. Known for his instinct for xenos trickery, he still relishes the prospect of violence, whether with his blade, the mutagenic acid-fire of Hellfire Extremis or a time-warping stasis grenade.",
    "profiles": [
      {
        "name": "Watch Captain Artemis",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Hellfire Extremis",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "IGNORES COVER",
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
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Tactical Instinct",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Unstoppable Champion",
        "text": "The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 1 wound remaining."
      }
    ],
    "composition": [
      "1 Watch Captain Artemis"
    ],
    "loadout": "**This model is equipped with:** Hellfire Extremis; master-crafted power weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aquila Kill Team",
        "Deathwatch Kill Team",
        "Deathwatch Terminator Squad",
        "Fortis Kill Team",
        "Indomitor Kill Team",
        "Spectrus Kill Team"
      ]
    },
    "keywords": [
      "Imperium",
      "Ordo Xenos",
      "Deathwatch",
      "Watch Captain Artemis",
      "Character",
      "Epic Hero",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "watch-master",
    "name": "Watch Master",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "The galaxy’s foremost xenos hunters, each Watch Master commands one of the Chapter’s vigilant fortresses. These leaders possess centuries of strategic and esoteric knowledge of the horrors assailing Mankind. In battle, the crackling blades and tailored bolts of their vigil spears destroy any xenos before them.",
    "profiles": [
      {
        "name": "Watch Master",
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
        "name": "Vigil spear",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Vigil spear",
        "tags": [
          "LANCE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Assigned Agents",
    "abilities": [
      {
        "name": "Strategic Knowledge",
        "text": "While this model is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back."
      },
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "composition": [
      "1 Watch Master"
    ],
    "loadout": "**This model is equipped with:** vigil spear.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aquila Kill Team",
        "Deathwatch Kill Team",
        "Deathwatch Terminator Squad",
        "Fortis Kill Team",
        "Indomitor Kill Team",
        "Spectrus Kill Team"
      ]
    },
    "keywords": [
      "Watch Master",
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Deathwatch",
      "Ordo Xenos"
    ],
    "factionKeywords": [
      "Agents of the Imperium"
    ],
    "baseSize": "32mm"
  }
]
