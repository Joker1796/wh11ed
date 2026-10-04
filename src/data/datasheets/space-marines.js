// Space Marines — datasheets. Unit roster and points from src/data/mfm/space-marines.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// Transcribed from app data 963 (Codex: Space Marines and its Supplements) by
// scripts/gen-datasheets.mjs — re-run it rather than hand-porting a whole codex.
// 115 sheets, 28 of them from Legends: Space Marines (`legends: true`).
export default [
  {
    "id": "adrax-agatone",
    "name": "Adrax Agatone",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "The Salamanders 3rd Company Captain is a tightly focused force of destruction, striking hard and true in battle without tiring. Prodigiously strong, he wields his mighty thunder hammer expertly, striking down foes with every swing. Those enemies Agatone does not slay in this way he purges with furious blasts from his hand-flamer, Drakkis.",
    "profiles": [
      {
        "name": "Adrax Agatone",
        "m": "6\"",
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
        "name": "Drakkis",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Malleus Noctum",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Lord of the Pyroclasts",
        "text": "While an enemy unit is **[gloss:engaged:engaged]** with this unit, that enemy unit has -1 **[gloss:objective-control:OC]**."
      },
      {
        "name": "Unto the Anvil",
        "text": "This unit’s melee attacks can:\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, re-roll **wound rolls**."
      }
    ],
    "composition": [
      "1 Adrax Agatone model"
    ],
    "loadout": "**This model is equipped with:** 1 Drakkis; 1 Malleus Noctum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Salamanders"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "aethon-shaan",
    "name": "Aethon Shaan",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "As the Chapter Master of the Raven Guard, Aethon Shaan embodies the most patient and cunning aspects of his Primarch’s legacy. When he does choose to strike from the shadows he does so with sudden cold fury, bursting forth with the lightning-wreathed Claws of Severax flashing amidst gouts of enemy blood.",
    "profiles": [
      {
        "name": "Aethon Shaan",
        "m": "14\"",
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
      }
    ],
    "melee": [
      {
        "name": "Claws of Severax",
        "tags": [
          "SUSTAINED HITS 2: NON-MONSTER/VEHICLE",
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Lone Operative, Stealth",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Master of Shadows",
        "text": "In your Command phase, you can select one friendly ADEPTUS ASTARTES INFANTRY unit. You can re-roll **[gloss:charge-roll:charge rolls]** for that unit until the start of your next Command phase."
      },
      {
        "name": "Blackwing Mantle (Once per phase, per army)",
        "text": "You can target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
      }
    ],
    "composition": [
      "1 Aethon Shaan model"
    ],
    "loadout": "**This model is equipped with:** 1 Claws of Severax; 1 Heavy Bolt Pistol.",
    "keywords": [
      "Chapter Master",
      "Character",
      "Epic Hero",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Smoke",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Raven Guard"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "aggressor-squad",
    "name": "Aggressor Squad",
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
    "flavor": "Capable of spearheading devastating offensives or shattering the most determined enemy assaults, Aggressors are walking ceramite strongpoints. They excel at close-quarters combat and laying down torrents of devastating fire before crushing their foes beneath their energised fists.",
    "profiles": [
      {
        "name": "Aggressor Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Aggressor",
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
        "name": "Flamestorm Gauntlets – close quarters",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Flamestorm Gauntlets – ranged",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Auto Boltstorm Gauntlets",
        "tags": [
          "CLOSE-QUARTERS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Fragstorm Grenade Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Twin Power Fists",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Close-quarters Firestorm",
        "text": "This unit’s attacks that target an enemy unit within 9\" of this unit have +1 **[gloss:strength:S]**."
      }
    ],
    "composition": [
      "1 Aggressor Sergeant model",
      "2-5 Aggressor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Flamestorm Gauntlets; 1 Twin Power Fists.",
    "options": [
      "All models in this unit can each have their Flamestorm Gauntlets replaced with 1 Auto Boltstorm Gauntlets and 1 Fragstorm Grenade Launcher."
    ],
    "keywords": [
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ancient",
    "name": "Ancient",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Ancients bear the Chapter’s precious standards. These glorious relics have been present in some of the Chapter’s most notable battles, their finely worked designs commemorating countless campaigns and heroic deeds. They are symbols of selfless commitment and the unbreakable loyalty of brothers.",
    "profiles": [
      {
        "name": "Ancient",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
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
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Honour of the Company",
        "text": "This unit has +1 **[gloss:objective-control:OC]**."
      },
      {
        "name": "Raise the Banner",
        "text": "At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**."
      }
    ],
    "composition": [
      "1 Ancient model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Ceramite Fists.",
    "options": [
      "This model’s Bolt Rifle can be replaced with 1 Power Weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Vanguard Veteran Squad"
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
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ancient-in-terminator-armour",
    "name": "Ancient in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Carrying the Space Marines’ sacred banners is a most vital task. Symbols of the Chapter’s might, Space Marines will gladly die to preserve them. This makes Ancients frequent targets. Clad in Terminator armour, they are near impervious to enemy fire, ensuring the standard always flies proud.",
    "profiles": [
      {
        "name": "Ancient in Terminator Armour",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
        "inv": "4+"
      }
    ],
    "ranged": [
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
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Raise the Banner",
        "text": "At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**."
      },
      {
        "name": "Never Shall the Standard Fall",
        "text": "While this unit is within range of an **[gloss:objective:objective]**, attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Ancient in Terminator Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Master-crafted Power Weapon; 1 Storm Bolter.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Ancient",
      "Character",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "apothecary",
    "name": "Apothecary",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "In addition to battlefield surgery, it is the Apothecary’s duty to recover the gene-seed of the fallen, and thus preserve the Chapter for later generations. For this task the Apothecary is equipped to bring peace to those too wounded to save, and efficiently extract their.precious progenoid glands.",
    "profiles": [
      {
        "name": "Apothecary",
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
        "name": "Reductor Pistol",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "5",
        "ap": "-4",
        "d": "2"
      },
      {
        "name": "Servo-armature",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Narthecium",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** D3+1 wounds."
      }
    ],
    "composition": [
      "1 Apothecary model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Reductor Pistol; 1 Servo-armature.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "apothecary-biologis",
    "name": "Apothecary Biologis",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Clad in Gravis armour, the Apothecary Biologis can advance through storms of enemy fire, vivispectrum at the ready to take bio-material samples for later analysis, whether that be xenos flesh, viral weapons casings or esoteric gene-tech.",
    "profiles": [
      {
        "name": "Apothecary Biologis",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
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
        "name": "Servo-armature",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Vivispectral Analysis Targeting",
        "text": "This unit’s attacks have [LETHAL HITS: **non-**VEHICLE]."
      }
    ],
    "composition": [
      "1 Apothecary Biologis model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Servo-armature.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad with heavy bolters",
        "Eradicator Squad with melta rifles",
        "Heavy Intercessor Squad",
        "Indomitor Kill Team"
      ]
    },
    "keywords": [
      "Apothecary",
      "Character",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "assault-intercessor-squad",
    "name": "Assault Intercessor Squad",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 10,
        "points": 170
      }
    ],
    "flavor": "Assault Intercessors are amongst the most widespread close support units in a Chapter’s arsenal. Firing their heavy bolt pistols as they close upon the foe, they charge into the fray, where they make short work of their enemies with brutal swings of their chainswords.",
    "profiles": [
      {
        "name": "Assault Intercessor",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Assault Intercessor Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Targeted Intercession",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s melee attacks have +1 **[gloss:strength:S]** and **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "1 Assault Intercessor Sergeant model",
      "4-9 Assault Intercessor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "The Assault Intercessor Sergeant can have their Heavy Bolt Pistol replaced with one of the following:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "The Assault Intercessor Sergeant can have their Chainsword replaced with one of the following:\n▪ 1 Power Fist\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer"
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "assault-intercessors-with-jump-packs",
    "name": "Assault Intercessors with Jump Packs",
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
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 200,
        "note": "3rd+"
      }
    ],
    "flavor": "Thanks to their powerful jump packs, these warriors soar over the battlefield, slamming into the foe and cutting them down with point-blank bolt pistol fire and furious chainsword hacks before shooting off to their next target.",
    "profiles": [
      {
        "name": "Assault Intercessor Sergeant with Jump Pack",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Assault Intercessor with Jump Pack",
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
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Hammer of Wrath",
        "text": "When this unit ends a **[gloss:charge-move:charge move]**, you can select one enemy unit **[gloss:engaged:engaged]** with this unit. For each model in this unit **engaged** with that enemy unit, roll one D6:\n▪ On a 4+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]**."
      }
    ],
    "composition": [
      "1 Assault Intercessor Sergeant with Jump Pack model",
      "4-9 Assault Intercessor with Jump Pack models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "The Assault Intercessor Sergeant with Jump Pack can have their Heavy Bolt Pistol replaced with one of the following:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "The Assault Intercessor Sergeant with Jump Pack can have their Chainsword replaced with one of the following:\n▪ 1 Power Fist\n▪ 1 Power Weapon",
      "For every 5 models in this unit, 1 Assault Intercessor with Jump Pack model can have their Heavy Bolt Pistol replaced with 1 Plasma Pistol."
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
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "astraeus",
    "name": "Astraeus",
    "points": [
      {
        "models": 1,
        "points": 550,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 650,
        "note": "2nd+"
      }
    ],
    "flavor": "The Astraeus is a titanic gravitic tank armed with formidable weaponry. The most deadly of these is the twin macro-accelerator cannon, capable of unleashing high-calibre ferro-carbide slugs that can shred tanks, aircraft and ground troops. Meanwhile, its void shields can shrug off even the most concerted enemy retaliations.",
    "profiles": [
      {
        "name": "Astraeus",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "24",
        "ld": "6+",
        "oc": "8",
        "inv": "5+",
        "invNote": "* This model has a 5+ invulnerable save against ranged attacks."
      }
    ],
    "ranged": [
      {
        "name": "Astareus Las-ripper",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
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
        "name": "Twin Macro-accelerator Cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "72\"",
        "a": "12",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Plasma Eradicator – standard",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Eradicator – supercharge",
        "tags": [
          "BLAST 2",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
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
    "core": "Damaged 8, Deadly Demise D6+2",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Suppression Fire",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by this model's Twin Macro-accelerator Cannon weapon. That enemy unit is **[gloss:sm-suppressed:suppressed]** until the start of your next turn:\n▪ While a unit is **suppressed**, that unit's attacks have -1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Astraeus model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 2 Astareus Las-ripper; 1 Ironhail Heavy Stubber; 1 Storm Bolter; 1 Twin Heavy Bolter; 1 Twin Macro-accelerator Cannon.",
    "options": [
      "This model's 2 Astareus Las-rippers can be replaced with 2 Plasma Eradicator - Standards.",
      "This model’s 2 Astraeus las-rippers can be replaced with 2 plasma eradicators.",
      "This model can be equipped with 1 Ironhail Heavy Stubber",
      "This model's Twin Heavy Bolter can be replaced with 1 Twin Lascannon."
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Titanic",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "ballistus-dreadnought",
    "name": "Ballistus Dreadnought",
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
    "flavor": "Ballistus Dreadnoughts are walking gun emplacements. Within a shielded sarcophagus at these combat walkers’ core lies the mortal remains of a fallen Chapter hero. Through webs of neural links, he pilots the war engine, targeting enemy armour or elite infantry with banks of devastating heavy weapons.",
    "profiles": [
      {
        "name": "Ballistus Dreadnought",
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
        "name": "Ballistus Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Ballistus Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Ballistus Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
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
      }
    ],
    "melee": [
      {
        "name": "Armoured Feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Ballistus Strike",
        "text": "This unit’s ranged attacks that target an enemy unit within 24\" of this unit have [SUSTAINED HITS 1]."
      }
    ],
    "composition": [
      "1 Ballistus Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Feet; 1 Ballistus Lascannon; 1 Ballistus Missile Launcher; 1 Storm Bolters.",
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "bladeguard-ancient",
    "name": "Bladeguard Ancient",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Bladeguard Ancients bear the honour of carrying their Chapter’s precious standards into battle. The most revered of these incorporate the remains of fallen heroes of the Chapter; in their presence, battle-brothers are inspired to emulate the legendary deeds of these paragons of old.",
    "profiles": [
      {
        "name": "Bladeguard Ancient",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "3",
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Relics of Battle",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Deeds of Legend",
        "text": "While this unit is within range of an **[gloss:objective:objective]**, this unit’s melee attacks have +1 **[gloss:attack-dice:A]**."
      },
      {
        "name": "Raise the Banner",
        "text": "At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**."
      }
    ],
    "composition": [
      "1 Bladeguard Ancient model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Relics of Battle.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bladeguard Veteran Squad"
      ]
    },
    "keywords": [
      "Ancient",
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "bladeguard-veteran-squad",
    "name": "Bladeguard Veteran Squad",
    "points": [
      {
        "models": 3,
        "points": 90,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 110,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 200,
        "note": "3rd+"
      }
    ],
    "flavor": "Bladeguard Veterans are inexorable warriors, advancing relentlessly with blades held high – the very image of noble knights of myth. Members of their Chapter’s elite 1st Company of Veterans, each of these vastly experienced Space Marines has fought to preserve the Imperium across uncounted worlds.",
    "profiles": [
      {
        "name": "Bladeguard Veteran Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Bladeguard Veteran",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Neo-volkite Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "2"
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
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Sword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Bladeguard (Once per turn, per unit)",
        "text": "In the Fight phase, when this unit is **[gloss:selected-to-fight:selected to fight]** or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit’s melee attacks have +1 to **[gloss:hit-roll:hit rolls]**.\n▪ __Or:__ Attacks that target this unit have -1 to **hit rolls**."
      }
    ],
    "composition": [
      "1 Bladeguard Veteran Sergeant model",
      "2-5 Bladeguard Veteran models"
    ],
    "loadout": "**Every model is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Sword.",
    "options": [
      "The Bladeguard Veteran Sergeant can have their Heavy bolt pistol replaced with one of the following:\n▪ 1 Neo-volkite Pistol\n▪ 1 Plasma Pistol"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "brutalis-dreadnought",
    "name": "Brutalis Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 180,
        "note": "3rd+"
      }
    ],
    "flavor": "The Brutalis Dreadnought is a line-breaker and a terror weapon. As it storms towards the enemy lines it lays down a hail of anti-personnel fire. Yet the greatest threat lies in its massive ceramite-sheathed fists or talons, which can crush an armoured warrior like spoiled fruit or punch through a bunker wall like parchment.",
    "profiles": [
      {
        "name": "Brutalis Dreadnought",
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
        "name": "Bolt Rifles",
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
        "name": "Brutalis Fists",
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
        "name": "Brutalis Talons",
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
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Brutalis Charge (Once per phase, per unit)",
        "text": "You can target this unit with the **Crushing Impact stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
      }
    ],
    "composition": [
      "1 Brutalis Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Rifles; 1 Brutalis Fists; 1 Twin Heavy Bolter; 1 Twin Icarus Ironhail Heavy Stubber.",
    "options": [
      "This model’s Bolt Rifles and Brutalis Fists can be replaced with 1 Brutalis Talons.",
      "This model’s Twin Heavy Bolter can be replaced with 1 Twin Multi-melta."
    ],
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "caanok-var",
    "name": "Caanok Var",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Iron Captain of Clan Company Avernii, Caanok Var is a consummate battle leader and warrior champion. Whilst in command, he demonstrates a cold and calculating precision, yet a burning rage remains. When battle is joined, he unleashes this fury, crushing the enemy with punishing blows from his power maul, Axiom.",
    "profiles": [
      {
        "name": "Caanok Var",
        "m": "5\"",
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
      }
    ],
    "melee": [
      {
        "name": "Axiom",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader, Feel No Pain 5+, Deep Strike",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Cold and Calculating",
        "text": "In your Shooting phase or the Fight phase, when this unit is **[gloss:selected-to-attack:selected to attack]**, you can select one of the following for this unit’s attacks to have:\n▪ [LETHAL HITS: MONSTER/VEHICLE].\n▪ __Or:__ [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE].\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:tactical doctrine]** is active for this unit, [LETHAL HITS: MONSTER/VEHICLE] and [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE]."
      },
      {
        "name": "Cerebrex Logic Engine",
        "text": "In the Declare Battle Formations step, you can select one friendly ADEPTUS ASTARTES INFANTRY unit. That unit has [core:Scouts 6\"]."
      }
    ],
    "composition": [
      "1 Caanok Var model"
    ],
    "loadout": "**This model is equipped with:** 1 Axiom; 1 Storm Bolter.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Iron Hands"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "captain",
    "name": "Captain",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Leading strikeforces ofSpace Marinesfrom thefront lines, Captains exemplify the strength and skill of the warriors under their command. They are paragons of strategic genius with centuries ofbattlefield experience, and their great deeds are often rewarded with ancient artefacts drawnfrom the Chapter’s vaults.",
    "profiles": [
      {
        "name": "Captain",
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
        "name": "Master-crafted Bolter",
        "tags": [
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
        "name": "Neo-volkite Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "0",
        "d": "2"
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
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      },
      {
        "name": "Finest Hour (Once per battle, per unit)",
        "text": "In the Fight phase, when this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, this model’s melee attacks have:\n▪ +3 **[gloss:attack-dice:A]**.\n▪ [DEVASTATING WOUNDS]."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Captain model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Bolter; 1 Master-crafted Power Weapon.",
    "options": [
      "This model’s Master-crafted Bolter and Heavy Bolt Pistol can be replaced with one of the following:\n▪ 1 Neo-volkite Pistol\n▪ 1 Plasma Pistol",
      "This model’s Master-crafted Bolter can be replaced with 1 Relic Shield (this model’s Master-crafted Power Weapon cannot be replaced).",
      "This model’s Master-crafted Power Weapon can be replaced with 1 Power Fist."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Vanguard Veteran Squad",
        "Victrix Honour Guard"
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
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-in-gravis-armour",
    "name": "Captain in Gravis Armour",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Clad in a suit of indomitable Gravis armour, a Space Marine Captain can fearlessly stride into the very fiercest battlefield firestorms. To don Gravis armour is to demonstrate the greatest determination to crush the enemy, no matter how deeply they are entrenched.",
    "profiles": [
      {
        "name": "Captain in Gravis Armour",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Boltstorm Gauntlet",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted Heavy Bolt Rifle",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "RAPID FIRE 1"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Boltstorm Gauntlet",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Blade",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Chainsword",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Relic Power Fist",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "6",
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
        "name": "Refuse to Yield",
        "text": "Attacks allocated to this model have -1 **[gloss:damage-roll:D]**."
      },
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Captain in Gravis Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Master-crafted Heavy Bolt Rifle; 1 Master-crafted Power Weapon.",
    "options": [
      "This model’s Master-crafted Heavy Bolt Rifle and Master-crafted Power Weapon can be replaced with one of the following:\n▪ 1 Boltstorm Gauntlet and 1 Relic Blade\n▪ 1 Boltstorm Gauntlet and 1 Relic Chainsword\n▪ 1 Boltstorm Gauntlet and 1 Relic Power Fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad with heavy bolters",
        "Eradicator Squad with melta rifles",
        "Heavy Intercessor Squad",
        "Indomitor Kill Team"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-in-phobos-armour",
    "name": "Captain in Phobos Armour",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "All Primaris Space Marines are trained in reconnaissance, stealth and sabotage while in the 10th Company. Donning his Phobos armour, a Captain will combine these skills with his incredible martial prowess and hard-won strategic expertise to lead strike forces of Vanguard warriors on dangerous covert missions.",
    "profiles": [
      {
        "name": "Captain in Phobos Armour",
        "m": "8\"",
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
      },
      {
        "name": "Instigator bolt carbine",
        "tags": [
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Combat Knife",
        "tags": [
          "PRECISION",
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Stealth, Scouts 6\", Infiltrators, Leader, Deep Strike",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      },
      {
        "name": "Tactical Fluidity (Once per battle round, per unit)",
        "text": "▪ In your Shooting phase, when this unit has shot, if this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]** of up to D6\".\n▪ __Or:__ At the end of your opponent’s Fight phase if this unit is **[gloss:engaged:engaged]**, this unit can make a **[gloss:fall-back-move:fall-back move]** of up to 6\"."
      }
    ],
    "composition": [
      "1 Captain in Phobos Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Combat Knife; 1 Instigator Bolt Carbine.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Eliminator Squad",
        "Incursor Squad",
        "Infiltrator Squad",
        "Reiver Squad",
        "Scout Squad",
        "Spectrus Kill Team",
        "Wolf Scouts"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-in-terminator-armour",
    "name": "Captain in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Space Marine Captains are expected to fight from the front, and few kinds of armour enable them to do so as effectively as Terminator plate. Formidably resilient, such a suit protects the Captain against all but the most devastating enemy fire and enables him to deploy by teleport strike right into the heart of the foe.",
    "profiles": [
      {
        "name": "Captain in Terminator Armour",
        "m": "5\"",
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
        "name": "Relic Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Fist",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Unstoppable Valour",
        "text": "You can re-roll **[gloss:charge-roll:charge rolls]** for this unit."
      },
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Captain in Terminator Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Relic Weapon; 1 Storm Bolter.",
    "options": [
      "This model’s Relic Weapon can be replaced with 1 Relic Fist.",
      "This model’s Storm Bolter can be replaced with 1 Combi-weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-on-bike",
    "name": "Captain on Bike",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "profiles": [
      {
        "name": "Captain on Bike",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
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
        "name": "Twin Bolt Rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
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
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Thunder Hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Into the Fray",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s melee attacks have [CLEAVE 1]."
      },
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Captain on Bike model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon; 1 Twin Bolt Rifle.",
    "options": [
      "This model’s Heavy Bolt Pistol can be replaced with 1 Plasma Pistol.",
      "This model’s Master-crafted Power Weapon can be replaced with 1 Thunder Hammer."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Outrider Squad",
        "Ravenwing Black Knights",
        "Bike Squad",
        "Company Veterans on Bikes"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "captain-titus",
    "name": "Captain Titus",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "A relentless champion of Ultramar with a will of unyielding adamant, Captain Demetrian Titus has won countless battles against seemingly impossible odds. While possessed of lauded command abilities, Titus is truly at home in the press of battle where he fights relentlessly and refuses to yield even to grievous wounds.",
    "profiles": [
      {
        "name": "Captain Titus",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "6",
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
      },
      {
        "name": "Master-crafted Bolter",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "RAPID FIRE 1"
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
        "name": "Master-crafted Chainsword",
        "tags": [
          "ANTI-NON-MONSTER/VEHICLE 2+"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Press the Attack",
        "text": "This unit’s melee attacks have:\n▪ [SUSTAINED HITS 1: **non-**MONSTER/VEHICLE].\n▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, [SUSTAINED HITS 1]."
      },
      {
        "name": "Righteous Fury (Once per battle, per army)",
        "text": "In the Fight phase, you can use this ability. If you do, this unit’s melee attacks have +1 **[gloss:strength:S]**, and when this unit has fought:\n▪ This model **[gloss:heal:heals]** D3 wounds.\n▪ __Or:__ If this model **[gloss:destroyed:destroyed]** an enemy model this phase, this model **heals** 2D3 wounds."
      },
      {
        "name": "Honour of Ultramar",
        "text": "In the fight phase, when this model is **[gloss:destroyed:destroyed]**, if this unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6:\n▪ On a 2+, do not remove this model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield."
      }
    ],
    "composition": [
      "1 Captain Titus model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Master-crafted Bolter; 1 Master-crafted Chainsword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-with-jump-pack",
    "name": "Captain with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Many a Space Marine Captain favours fury and speed, and devises ingenious strategies to use these to devastating effect against their enemies. Being superlative warriors and inspiring leaders, they have no place but at the very forefront of battle. With a jump pack, Captains can lead their warriors as speartips for their assaults.",
    "profiles": [
      {
        "name": "Captain with Jump Pack",
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
        "name": "Chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
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
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Strategic Acumen",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      },
      {
        "name": "Angel’s Wrath",
        "text": "This unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Captain with Jump Pack model"
    ],
    "loadout": "**This model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol.",
    "options": [
      "This model’s Heavy Bolt Pistol can be replaced with one of the following:\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol",
      "This model’s Chainsword can be replaced with one of the following:\n▪ 1 Power Fist\n▪ 1 Relic Weapon",
      "This model’s Heavy Bolt Pistol and Chainsword can be replaced with one of the following:\n▪ 1 Thunder Hammer and 1 Relic Shield\n▪ 1 Chainsword and 1 Relic Shield"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Sanguinary Guard",
        "Talonstrike Kill Team",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "cato-sicarius",
    "name": "Cato Sicarius",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "A noble scion of Talassar, Cato Sicarius is amongst the most accomplished of the Ultramarines champions. As Captain of the Victrix Honour Guard, Sicarius demonstrates superior swordsmanship and is a true master of the lightning assault, deploying his warriors with a decisiveness and speed born of absolute confidence.",
    "profiles": [
      {
        "name": "Cato Sicarius",
        "m": "6\"",
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
        "name": "Artisan Plasma Pistol",
        "tags": [
          "CLOSE-QUARTERS"
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
        "name": "Talassarian tempest blade – strike",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Talassarian tempest blade – sweep",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "9",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Talassarian tempest blade – coup de grace",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Captain of the Honour Guard",
        "text": "If your army includes a MARNEUS CALGAR unit, replace this unit’s Leader ability with the Support ability (this unit can still be attached to the same units)."
      },
      {
        "name": "Knight Champion of Macragge (Once per phase, per army)",
        "text": "In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]** of up to 6\"."
      },
      {
        "name": "Honour or Death",
        "text": "When you target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, that use is -1 CP."
      }
    ],
    "composition": [
      "1 Cato Sicarius model"
    ],
    "loadout": "**This model is equipped with:** 1 Artisan Plasma Pistol; 1 Talassarian Tempest Blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "centurion-assault-squad",
    "name": "Centurion Assault Squad",
    "points": [
      {
        "models": 3,
        "points": 150
      },
      {
        "models": 6,
        "points": 300
      }
    ],
    "flavor": "There are few technologies better adapted for siege warfare than the Centurion Warsuit. Wading into thunderous storms of enemy fire, Centurion Assault Squads use their roaring siege drills to crack open armoured bunkers and tear apart tanks.",
    "profiles": [
      {
        "name": "Assault Centurion Sergeant",
        "m": "4\"",
        "t": "7",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Assault Centurion",
        "m": "4\"",
        "t": "7",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Centurion Bolters",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Flamer",
        "tags": [
          "BLAST 1",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin Meltagun",
        "tags": [
          "MELTA 2",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Siege Drills",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "3",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Annihilator Protocols",
        "text": "This unit's melee attacks that target a MONSTER/VEHICLE/FORTIFICATION unit have [SUSTAINED HITS 2]."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Centurion Assault Launcher",
        "text": "The bearer has the EXPLOSIVES keyword."
      }
    ],
    "composition": [
      "1 Assault Centurion Sergeant model",
      "2-5 Assault Centurion models"
    ],
    "loadout": "**Every model is equipped with:** 1 Centurion Bolters; 1 Siege Drills; 1 Twin Flamer.",
    "options": [
      "Any number of models can each have their Centurion Bolters replaced with 1 Centurion Assault Launcher",
      "Any number of models can each have their Twin Flamer replaced with 1 Twin Meltagun."
    ],
    "keywords": [
      "Centurion",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm",
    "legends": true
  },
  {
    "id": "centurion-devastator-squad",
    "name": "Centurion Devastator Squad",
    "points": [
      {
        "models": 3,
        "points": 175
      },
      {
        "models": 6,
        "points": 350
      }
    ],
    "flavor": "Centurion Devastator Squads dominate the field of battle, their presence dictating the flow of action. They frequently operate with Stormraven Gunships, which transport the Space Marines inside their bulky warsuits to the next position, where they function as an armoured firebase to clear enemy-held positions of all opposition.",
    "profiles": [
      {
        "name": "Devastator Centurion Sergeant",
        "m": "4\"",
        "t": "7",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Devastator Centurion",
        "m": "4\"",
        "t": "7",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Centurion Bolters",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Centurion Missile Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
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
      }
    ],
    "melee": [
      {
        "name": "Centurion Fists",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Decimator Protocols",
        "text": "▪ This unit's ranged attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ __Or:__This unit's ranged attacks that target an enemy unit within range of an **[gloss:objective:objective]** can re-roll **hit rolls**."
      }
    ],
    "composition": [
      "1 Devastator Centurion Sergeant model",
      "2-5 Devastator Centurion models"
    ],
    "loadout": "**Every model is equipped with:** 1 Centurion Bolters; 1 Centurion Fists; 1 Grav-cannon.",
    "options": [
      "Any number of models can each have their Centurion Bolters replaced with 1 Centurion Missile Launcher.",
      "Any number of models can each have their Grav-cannon replaced with one of the following: 1 Twin Heavy Bolter, 1 Twin Lascannon"
    ],
    "keywords": [
      "Centurion",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm",
    "legends": true
  },
  {
    "id": "cerberus",
    "name": "Cerberus",
    "points": [
      {
        "models": 1,
        "points": 270
      }
    ],
    "flavor": "The primary weapon of the Cerberus is the neutron pulse array, whose systems pre-date even the Great Crusade. Powered by an atomantic arc-reactor, this enormous anti-tank gun fires a pulsed beam of intense radiation that scythes straight through even the thickest armour and wreaks havoc on delicate systems within.",
    "profiles": [
      {
        "name": "Cerberus",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "18",
        "ld": "6+",
        "oc": "6"
      }
    ],
    "ranged": [
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Cerberus Neutron Pulse Array",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "16",
        "ap": "-3",
        "d": "D3+6"
      },
      {
        "name": "Heavy Flamer",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Atomantic Arc-reactor",
        "text": "In a turn this unit **[gloss:remain-stationary:remained stationary]**, this unit's Cerberus Neutron Pulse Array ranged attacks have [LETHAL HITS]."
      }
    ],
    "composition": [
      "1 Cerberus model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Cerberus Neutron Pulse Array.",
    "options": [
      "This model can be equipped with one of the following: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter",
      "This model can be equipped with one of the following: 2 Heavy Bolters, 2 Lascannons"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "chaplain",
    "name": "Chaplain",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "Cloak billowing in the heat of battle and absolvor pistol flaring, Chaplains stride purposefully into battle, the boom of their oration audible even over the furious din of conflict. Without rest they exhort their brothers to victory, steeling their hearts, minds and souls no matter the savagery of the enemy.",
    "profiles": [
      {
        "name": "Chaplain",
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
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "This unit’s melee attacks have [LANCE]."
      },
      {
        "name": "Spiritual Leader (Once per battle round, per unit)",
        "text": "At the start of any phase, you can select one friendly **[gloss:battle-shocked:battle-shocked]** ADEPTUS ASTARTES unit within 6\" of this model. That unit is no longer **battle-shocked**."
      }
    ],
    "composition": [
      "1 Chaplain model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Crusader Squad",
        "Death Company Marines",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Vanguard Veteran Squad"
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
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaplain-in-terminator-armour",
    "name": "Chaplain in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Every Space Marine is roused to war by the litanies of their Chaplains, and never is this spiritual fortification more vital than amidst the blood and horror of boarding actions and beachhead strikes. Thus, Chaplains are trained to wear formidable Terminator armour so they can fight alongside Veteran battle-brothers.",
    "profiles": [
      {
        "name": "Chaplain in Terminator Armour",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
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
        "name": "Crozius Arcanum",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "This unit’s melee attacks have [LANCE]."
      },
      {
        "name": "Zealous Fortitude",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:mortal-wound:mortal wounds]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Chaplain in Terminator Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Crozius Arcanum; 1 Storm Bolter.",
    "options": [
      "This model’s Storm Bolter can be replaced with 1 Relic Shield."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "chaplain-on-bike",
    "name": "Chaplain on Bike",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "When a Chaplain takes to the field on a Raider-pattern bike, he is able to keep pace with even the swiftest armoured advance or spearhead breakthrough. Fighting in such an action, he will urge his brothers to victory as he bellows his catechisms and charges headlong into the foe, crozius arcanum swinging.",
    "profiles": [
      {
        "name": "Chaplain on Bike",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "5",
        "ld": "5+",
        "oc": "2",
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
        "name": "Twin Bolt Rifle",
        "tags": [
          "RAPID FIRE 2",
          "TWIN-LINKED"
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
        "name": "Crozius Arcanum",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "This unit’s melee attacks have [LANCE]."
      },
      {
        "name": "Catechism of Fire",
        "text": "In your Shooting phase, when this unit is **[gloss:selected-to-shoot:selected to shoot]**, you can select one **[gloss:visible:visible]** enemy unit. This unit’s ranged attacks that target that unit have [DEVASTATING WOUNDS]."
      }
    ],
    "composition": [
      "1 Chaplain on Bike model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum; 1 Twin Bolt Rifle.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Outrider Squad",
        "Ravenwing Black Knights"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Explosives",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "chaplain-with-jump-pack",
    "name": "Chaplain with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Ever are the roared litanies of the Chaplains needed all over the battlefield, to stir the hearts of battle-brothers and drive fear into the enemy. With a jump pack a Chaplain can thunder to wherever he is most needed, or spearhead furious assaults into the enemy’s positions himself.",
    "profiles": [
      {
        "name": "Chaplain with Jump Pack",
        "m": "12\"",
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
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Exhortation of Rage",
        "text": "While this unit is at or below **[gloss:half-strength:half-strength]**, this unit’s melee attacks can re-roll **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Litany of Hate",
        "text": "This unit’s melee attacks have [LANCE]."
      }
    ],
    "composition": [
      "1 Chaplain with Jump Pack model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Crozius Arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Death Company Marines with Jump Packs",
        "Talonstrike Kill Team",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chief-librarian-tigurius",
    "name": "Chief Librarian Tigurius",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "As Tigurius charges into battle, he assails the enemy with a tempest of psychic fury. Blasts of energy leap from his staff, hurling foes through the air and burning their souls to ash. It is the Chief Librarian’s acute foresight that is most valuable to his Chapter – his merest intuition is worth more than the predictions of an army of strategists and spies.",
    "profiles": [
      {
        "name": "Chief Librarian Tigurius",
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
      },
      {
        "name": "Storm of the Emperor’s Wrath",
        "tags": [
          "BLAST 1",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D3+6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Rod of Tigurius",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Transhuman Strategist, Combat Doctrines, Librarius",
    "abilities": [
      {
        "name": "Chief Librarian (psyker level 3)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      },
      {
        "name": "Hood of Hellfire (Psychic)",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]** and **[gloss:mortal-wound:mortal wounds]**."
      }
    ],
    "composition": [
      "1 Chief Librarian Tigurius model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Rod of Tigurius; 1 Storm of the Emperor’s Wrath.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Desolation Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "abilitySets": [
      {
        "name": "Chief Librarian (psyker level 3)",
        "options": [
          {
            "name": "Prescience (psychic level 2)",
            "text": "In your Movement phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit has +1 **[gloss:save:Sv]** until the start of your next turn."
          },
          {
            "name": "Telepathic Assault (psychic level 1)",
            "text": "In your Shooting phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Select one **[gloss:visible:visible]** enemy unit within 24\" of this unit. That enemy unit suffers 2D3 **[gloss:mortal-wound:mortal wounds]**."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Infantry",
      "Psyker",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "company-heroes",
    "name": "Company Heroes",
    "points": [
      {
        "models": 4,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 4,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "A company’s most heroic battle-brothers fight alongside a Chapter’s high-ranking officers. These veterans and specialists serve as honour guards and provide vital support to a commander. Company Champions defend their Company’s honour with martial excellence, Ancients guard its inspirational banners and Company Veterans lay down hails o ffire from relic bolt weapons.",
    "profiles": [
      {
        "name": "Company Champion",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Company veteran with bolt rifle",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Ancient",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Company Veteran with heavy bolter",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Master-crafted Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Master-crafted Bolt Rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Master-crafted Heavy Bolter",
        "tags": [
          "ASSAULT",
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Weapon",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Combat Knife",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Command Squad",
        "text": "Attacks that target this unit have -1 to **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Raise the Banner",
        "text": "At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**."
      }
    ],
    "composition": [
      "1 Ancient model",
      "1 Company Champion model",
      "1 Company Veteran with Bolt Rifle model",
      "1 Company Veteran with Heavy Bolter model"
    ],
    "loadout": "**The Ancient is equipped with:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Bolt Rifle.\n**The Company Champion is equipped with:** 1 Master-crafted Bolt Pistol; 1 Master-crafted Power Weapon.\n**The Company Veteran with Bolt Rifle is equipped with:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Bolt Rifle.\n**The Company Veteran with Heavy Bolter is equipped with:** 1 Combat Knife; 1 Master-crafted Bolt Pistol; 1 Master-crafted Heavy Bolter.",
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "darnath-lysander",
    "name": "Darnath Lysander",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Raising high his storm shield, Rampart, as he swings the Fist of Dorn, Lysander wades through his foes like a warship smashing through stormy seas. Each hammer blow reduces enemies to bloody ruin, sweeping whole ranks of warriors from their feet. All the while, Lysander’s obstinate scowl never wavers, his determination absolute.",
    "profiles": [
      {
        "name": "Darnath Lysander",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Fist of Dorn",
        "tags": [
          "CLEAVE 1",
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Rampart (Once per battle, per army)",
        "text": "At the start of any phase, you can use this ability. If you do, this model has 2+ **[gloss:invulnerable-save:InSv]** until the end of the phase."
      },
      {
        "name": "Icon of Obstinacy",
        "text": "Attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Darnath Lysander model"
    ],
    "loadout": "**This model is equipped with:** 1 Fist of Dorn.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Imperial Fists"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "desolation-squad",
    "name": "Desolation Squad",
    "points": [
      {
        "models": 5,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Desolation Marines specialise in unleashing widespread devastation throughout the enemy ranks. Whether direct-firing warheads into massed infantry or enemy armour, or raining salvoes down upon the enemy with their castellan launchers, these warriors reap a grievous toll amongst the foe.",
    "profiles": [
      {
        "name": "Desolation Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Desolation Marine",
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
        "name": "Castellan Launcher",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Superfrag Rocket Launcher",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Vengor Launcher",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Superkrak Rocket Launcher",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Targeter Optics",
        "text": "This unit’s ranged attacks that target a **[gloss:visible:visible]** enemy unit have [IGNORES COVER]."
      }
    ],
    "composition": [
      "1 Desolation Sergeant model",
      "4 Desolation Marine models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Castellan Launcher; 1 Ceramite Fists; 1 Superfrag Rocket Launcher.",
    "options": [
      "The Desolation Sergeant can have their Superfrag Rocket Launcher replaced with 1 Vengor Launcher.",
      "The Desolation Sergeant can have their Superkrak Rocket Launcher replaced with 1 Vengor Launcher.",
      "All models in this unit can each have their Superfrag Rocket Launcher replaced with 1 Superkrak Rocket Launcher."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "dreadnought",
    "name": "Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 135
      }
    ],
    "flavor": "Dreadnoughts are bipedal combat walkers piloted by centuries-old fallen heroes of the Chapter, kept alive by esoteric technologies in an ancient sarcophagus at the Dreadnought’s heart. Equipped with devastating heavy weapons, they can annihilate the enemy from afar or crush them to paste in brutal melee.",
    "profiles": [
      {
        "name": "Dreadnought",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1"
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
        "name": "Heavy Plasma Cannon – standard",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy Plasma Cannon – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
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
        "name": "Missile Launcher – frag",
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
        "name": "Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Heavy Flamer",
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
      }
    ],
    "melee": [
      {
        "name": "Dreadnought Fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Crushing Feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Wisdom of the Ancients",
        "text": "While a friendly ADEPTUS ASTARTES INFANTRY unit is within 6\" of this model, that unit's attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1."
      }
    ],
    "composition": [
      "1 Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Assault Cannon; 1 Dreadnought Fist; 1 Storm Bolter.",
    "options": [
      "This model's Assault Cannon can be replaced with one of the following: 1 Heavy Plasma Cannon, 1 Multi-melta, 1 Twin Lascannon",
      "This model's Dreadnought Fist and Storm Bolter can be replaced with 1 Missile Launcher and 1 Crushing Feet.",
      "This model’s Dreadnought combat weapon and storm bolter can be replaced with one of the following:\n▪ 1 missile launcher and 1 close combat weapon\n▪ 1 heavy flamer and 1 Dreadnought combat weapon",
      "This model's Storm Bolter can be replaced with 1 Heavy Flamer."
    ],
    "keywords": [
      "Imperium",
      "Smoke",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "60mm",
    "legends": true
  },
  {
    "id": "drop-pod",
    "name": "Drop Pod",
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
    "flavor": "Launched from ships in low orbit, Drop Pods full of Space Marines slam into the battlefield, their hatches blowing open upon the violent impact. Within seconds, the squad bursts out with weapons firing. Such deadly strikes send the foe into disarray as their lines are torn apart in the furious assault.",
    "profiles": [
      {
        "name": "Drop Pod",
        "m": "-",
        "t": "7",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Deployment Complete",
        "text": "When this unit is set up and all units embarked within it have disembarked, units cannot embark within this unit."
      },
      {
        "name": "Drop Pod Assault",
        "text": "▪ This unit must start the battle in **[gloss:strategic-reserves:strategic reserves]**.\n▪ In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**.\n▪ When this unit is set up, all units embarked within this unit must make a **[gloss:disembark:disembark]/[gloss:assault-disembark-move:assault disembark move]** (pg 157), and those units must be set up more than 8\" away from all enemy units."
      }
    ],
    "composition": [
      "1 Drop Pod model"
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport GRAVIS/JUMP PACK/TERMINATOR models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Custom"
  },
  {
    "id": "eliminator-squad",
    "name": "Eliminator Squad",
    "points": [
      {
        "models": 3,
        "points": 85
      }
    ],
    "flavor": "Eliminator Squads are peerless assassins, deadly marksmen who haunt the shadows of the battlefield unseen by the enemy. For hours they will lie in wait to take the perfect shot, their sophisticated scopes feeding them essential data to ensure they never fail to make the kill.",
    "profiles": [
      {
        "name": "Eliminator Sergeant",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Eliminator",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
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
      },
      {
        "name": "Bolt Sniper Rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Instigator Bolt Carbine",
        "tags": [
          "LETHAL HITS: NON-MONSTER/VEHICLE",
          "PRECISION",
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Las Fusil",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Chameleoline Cloaks",
        "text": "This unit has -3\" **[gloss:detection-range:detection range]**."
      },
      {
        "name": "Special-issue Optics and Ammunition",
        "text": "In your Shooting phase, when this unit is **[gloss:selected-to-shoot:selected to shoot]**, you can select one of the following:\n▪ This unit’s ranged attacks have [IGNORES COVER].\n▪ __Or:__ Select one enemy unit within 24\" of this unit. That enemy unit has +6\" **[gloss:detection-range:detection range]** until this unit has shot."
      }
    ],
    "composition": [
      "1 Eliminator Sergeant model",
      "2 Eliminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Bolt Sniper Rifle; 1 Ceramite Fists.",
    "options": [
      "The Eliminator Sergeant can have their Bolt Sniper Rifle replaced with one of the following:\n▪ 1 Instigator Bolt Carbine\n▪ 1 Las Fusil",
      "All Eliminator models in this unit can each have their Bolt Sniper Rifle replaced with 1 Las Fusil."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "eradicator-squad-with-heavy-bolters",
    "name": "Eradicator Squad with heavy bolters",
    "points": [
      {
        "models": 3,
        "points": 100,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 215,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 130,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 245,
        "note": "3rd+"
      }
    ],
    "flavor": "The heavy Mk X Gravis armour of these fire support specialists allows them to weather storms of incoming projectiles. Standing firm, they return fire with their brutal heavy bolters, scything down enemy infantry and blowing apart the foe's light armoured vehicles with well-placed shots to weak spots in their targets' hulls.",
    "profiles": [
      {
        "name": "Eradicator",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Eradicator Sergeant",
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
        "name": "Heavy Bolter",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Overlapping Destruction",
        "text": "In your Shooting phase, you can select one enemy unit. This unit’s Heavy Bolter weapons that target that enemy unit have [BLAST 1]."
      }
    ],
    "composition": [
      "1 Eradicator Sergeant model",
      "2-5 Eradicator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Heavy Bolter.",
    "keywords": [
      "Explosives",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "eradicator-squad-with-melta-rifles",
    "name": "Eradicator Squad with melta rifles",
    "points": [
      {
        "models": 3,
        "points": 100,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 200,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 220,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Eradicator Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Eradicator",
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
        "name": "Melta Rifle",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Melta Rifle – hunter (vs MONSTER/VEHICLE)",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+2"
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
        "name": "Multi-melta – hunter (vs MONSTER/VEHICLE)",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Total Obliteration",
        "text": "This unit’s ranged attacks can re-roll **[gloss:damage-roll:damage rolls]**."
      }
    ],
    "composition": [
      "1 Eradicator Sergeant model",
      "2-5 Eradicator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Melta Rifle.",
    "options": [
      "For every 3 models in this unit, 1 Eradicator model can have their Melta Rifle replaced with 1 Multi-melta."
    ],
    "keywords": [
      "Explosives",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "falchion",
    "name": "Falchion",
    "points": [
      {
        "models": 1,
        "points": 420
      }
    ],
    "flavor": "The Falchion was developed to arm the Legiones Astartes with a superlative tank destroyer, and the apocalyptic power of its twin volcano cannon soon became a thing of legend. True to its name, the volcano cannon can turn rock and metal into fiery magma, and a direct hit from the weapon can be fatal to even titanic war machines.",
    "profiles": [
      {
        "name": "Falchion",
        "m": "9\"",
        "t": "13",
        "sv": "2+",
        "w": "24",
        "ld": "6+",
        "oc": "8"
      }
    ],
    "ranged": [
      {
        "name": "Quad Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Twin Falchion Volcano Cannon",
        "tags": [
          "BLAST 1",
          "TWIN-LINKED"
        ],
        "range": "120\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "24",
        "ap": "-4",
        "d": "12"
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
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Twin Heavy Flamer",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
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
    "core": "Deadly Demise D6+2, Damaged 8",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Titan-killer",
        "text": "This unit's Twin Falchion Volcano Cannon ranged attacks that target a MONSTER/VEHICLE unit have [DEVASTATING WOUNDS]."
      }
    ],
    "composition": [
      "1 Falchion model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Quad Lascannon; 1 Twin Falchion Volcano Cannon; 1 Twin Heavy Bolter.",
    "options": [
      "This model can be equipped with one of the following: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter",
      "This model's 2 Quad Lascannons can be replaced with 2 Laser Destroyers.",
      "This model's Twin Heavy Bolter can be replaced with 1 Twin Heavy Flamer."
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Titanic",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "firestrike-servo-turrets",
    "name": "Firestrike Servo-turrets",
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
    "flavor": "Primarily a defensive weapon, the Firestrike Servo-turret lays down withering volleys of fire to secure flanks or the Space Marines’ base of operations. Mounted on gravitic ventral plates, they can hover across the battlefield to ideal firing positions from which to slaughter attacking enemies.",
    "profiles": [
      {
        "name": "Firestrike Servo-turrets",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Twin Firestrike Las-talon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Twin Firestrike Autocannon",
        "tags": [
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "2+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Hovering Bulk",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Sentinel Protocols (Once per phase, per unit)",
        "text": "You can target this unit with the **Fire Overwatch stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ This unit’s **[gloss:snap-shooting:snap shooting]** attacks hit on unmodified **[gloss:hit-roll:hit rolls]** of 4+ until that **stratagem** is resolved.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
      }
    ],
    "composition": [
      "1-2 Firestrike Servo-turrets models"
    ],
    "loadout": "**Every model is equipped with:** 1 Hovering Bulk; 1 Twin Firestrike Las-talon.",
    "options": [
      "Any number of models can each have their Twin Firestrike Las-talon replaced with 1 Twin Firestrike Autocannon."
    ],
    "keywords": [
      "Artillery",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "gladiator-lancer",
    "name": "Gladiator Lancer",
    "points": [
      {
        "models": 1,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 180,
        "note": "3rd+"
      }
    ],
    "flavor": "With pinpoint accuracy, the Gladiator Lancer picks off the heaviest enemy armour, laser destroyer punching smouldering holes in their hulls. Such is the range of its heavy cannon that it can eliminate threats to the Space Marines before they encounter them, storming past burning wrecks to claim their objectives.",
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
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
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
    "flavor": "When the cannons of the Gladiator Reaper spin to full pitch, the droning makes the teeth of all nearby itch with the intensity of the vibrations. Within seconds, thousands of spent casings pour over the battle tank’s armoured hide as enemies are erased from existence by the storm of fire.",
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
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "gladiator-valiant",
    "name": "Gladiator Valiant",
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
    "flavor": "The Valiant lays down blistering volleys of fire as it escorts transports or supports infantry in ferocious fighting, crossing rushing watercourses, sucking marshlands and bubbling lava lakes with equal ease. Its twin las-talons spit death at the foe, making short work of enemy armour and cracking open fortified positions.",
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
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "hammerfall-bunker",
    "name": "Hammerfall Bunker",
    "points": [
      {
        "models": 1,
        "points": 175
      }
    ],
    "flavor": "Hammerfall Bunkers are launched from Space Marine warships in the same manner as Drop Pods. Automated area-denial assets crewed by hard-wired servitors, they have all kinds of battlefield roles, including securing beachheads, hampering enemy assaults and wreaking havoc behind the foe’s lines.",
    "profiles": [
      {
        "name": "Hammerfall Bunker",
        "m": "-",
        "t": "12",
        "sv": "2+",
        "w": "14",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Hammerfall Heavy Bolter Array",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hammerfall Missile Launcher – superfrag",
        "tags": [
          "BLAST 1"
        ],
        "range": "48\"",
        "a": "7",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hammerfall Missile Launcher – superkrak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Hammerfall Heavy Flamer Array",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "6",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 5",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fortification",
        "text": "While an enemy unit is **[gloss:engaged:engaged]** with only FORTIFICATION units:\n▪ That enemy unit can be selected as a target of ranged attacks.\n▪ When shooting that enemy unit, those ranged attacks have -1 to **[gloss:hit-roll:hit rolls]** (excluding [CLOSE-QUARTERS] attacks).\n▪ When that enemy unit is selected to make a **[gloss:fall-back-move:fall-back move]**, if that enemy unit is not **[gloss:battle-shocked:battle-shocked]**, **[gloss:hazard-roll:hazard rolls]** made for that enemy unit are automatically passed."
      },
      {
        "name": "Ceramite Cover",
        "text": "When an attack targets a unit that is not **[gloss:fully-visible:fully visible]** to the attacking model because of this unit, the target has the **[gloss:benefit-of-cover:benefit of cover]** against that attack."
      },
      {
        "name": "Defensive Array (Once per phase, per unit)",
        "text": "You can target this unit with the **Fire Overwatch stratagem** regardless of any other uses of that stratagem this phase. If you do, that use is -1 CP."
      }
    ],
    "composition": [
      "1 Hammerfall Bunker model"
    ],
    "loadout": "**This model is equipped with:** 1 Hammerfall Heavy Bolter Array; 1 Hammerfall Missile Launcher.",
    "options": [
      "This model's Hammerfall Heavy Bolter Array can be replaced with 1 Hammerfall Heavy Flamer Array."
    ],
    "keywords": [
      "Fortification",
      "Frame",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "heavy-intercessor-squad",
    "name": "Heavy Intercessor Squad",
    "points": [
      {
        "models": 5,
        "points": 115
      },
      {
        "models": 10,
        "points": 230
      }
    ],
    "flavor": "Clad in thick Gravis armour, Heavy Intercessors secure ground and are immovable in the defence. Always ready for any sign of enemy counter-attack, they stand firm, laying down volleys of heavy fire that keep all but the most determined or foolhardy enemies at bay.",
    "profiles": [
      {
        "name": "Heavy Intercessor",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Heavy Intercessor Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
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
      },
      {
        "name": "Heavy Bolt Rifle",
        "tags": [
          "HEAVY",
          "RAPID FIRE 1"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
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
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Unyielding in the Face of the Foe",
        "text": "While this unit is controlling an **[gloss:objective:objective]**, this unit has +1 to **[gloss:save-roll:save rolls]**."
      }
    ],
    "composition": [
      "1 Heavy Intercessor Sergeant model",
      "4-9 Heavy Intercessor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Heavy Bolt Rifle.",
    "options": [
      "For every 5 models in this unit, 1 Heavy Intercessor model can have their Heavy Bolt Rifle replaced with 1 Heavy Bolter."
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "hellblaster-squad",
    "name": "Hellblaster Squad",
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
    "flavor": "Few foes can survive the incandescent fury of a Hellblaster Squad. Whether they be Tyranid Hive Tyrant, Ork Warboss or Heretic Astartes battle tank, all are reduced to ash and slag by searing, well-aimed plasma fire pouring from the Hellblasters’ ferocious weapons.",
    "profiles": [
      {
        "name": "Hellblaster Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Hellblaster",
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
        "name": "Plasma Incinerator – standard",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Incinerator – supercharge",
        "tags": [
          "ASSAULT",
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Rites of Thermal Appeasement",
        "text": "This unit has +1 to **[gloss:hazard-roll:hazard rolls]** made for its Plasma Incinerator and Plasma Pistol weapons."
      }
    ],
    "composition": [
      "1 Hellblaster Sergeant model",
      "4-9 Hellblaster models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Plasma Incinerator.",
    "options": [
      "The Hellblaster Sergeant can have their Bolt Pistol replaced with 1 Plasma Pistol."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
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
        "name": "Ironhail Skytalon Array",
        "tags": [
          "RAPID FIRE 6"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
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
        "name": "Shield Dome",
        "text": "This unit has 5+ **[gloss:invulnerable-save:InSv]**."
      },
      {
        "name": "Orbital Comms Array",
        "text": "This unit has [core:Scouts 6\"]."
      }
    ],
    "composition": [
      "1 Impulsor model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Storm Bolters.",
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 7 ADEPTUS ASTARTES INFANTRY models. It cannot transport TERMINATOR/JUMP PACK models. Each GRAVIS model takes up the space of 2 models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "inceptor-squad",
    "name": "Inceptor Squad",
    "points": [
      {
        "models": 3,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "Equipped with heavy jump packs, Inceptor Squads are superb spearhead troops that deliver overwhelming blows to the enemy. Plummeting to the surface from the very edge of a world’s atmosphere, they strike with devastating force, unleashing a hurricane of fire that turns whole squads of enemy infantry to bloody mist.",
    "profiles": [
      {
        "name": "Inceptor",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Inceptor Sergeant",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Assault Bolters",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
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
        "name": "Plasma Exterminators – standard",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
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
        "name": "Plasma Exterminators – supercharge",
        "tags": [
          "ASSAULT",
          "CLOSE-QUARTERS",
          "HAZARDOUS",
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
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Parabolic Jetleap",
        "text": "At the end of your opponent’s Fight phase, if this unit is **[gloss:unengaged:unengaged]**, you can place this unit in **[gloss:strategic-reserves:strategic reserves]**."
      },
      {
        "name": "Meteoric Descent",
        "text": "If this unit made an **[gloss:ingress-move:ingress move]** this turn, this unit’s ranged attacks have +1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Inceptor Sergeant model",
      "2-5 Inceptor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Assault Bolters; 1 Ceramite Fists.",
    "options": [
      "All models in this unit can each have their Assault Bolters replaced with 1 Plasma Exterminators."
    ],
    "keywords": [
      "Fly",
      "Gravis",
      "Imperium",
      "Infantry",
      "Jump Pack"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "incursor-squad",
    "name": "Incursor Squad",
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
        "points": 100,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 180,
        "note": "3rd+"
      }
    ],
    "flavor": "Aggressive light infantry, Incursors specialise in storming enemy defences and destroying essential assets. With a formidable array of auspexes and sensory equipment, they can see their enemies through walls and predict their movements – and with a burst of carbine fire or knife thrusts, cut them down.",
    "profiles": [
      {
        "name": "Incursor",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Incursor Sergeant",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
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
      },
      {
        "name": "Occulus Bolt Carbine",
        "tags": [
          "ASSAULT",
          "IGNORES COVER"
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
        "name": "Paired Combat Blades",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Haywire Mine (Once per battle, per unit)",
        "text": "In your Shooting phase, you can select one **[gloss:visible:visible]** enemy unit within 6\" of this unit and roll one D6. On a 2+:\n▪ That enemy unit suffers D3 **[gloss:mortal-wound:mortal wounds]**.\n▪ __Or:__ If that enemy unit is a VEHICLE unit, that enemy unit suffers 2D3 **mortal wounds**."
      },
      {
        "name": "Divinator-class Auspexes (Once per phase, per unit)",
        "text": "In your Shooting phase, when a friendly ADEPTUS ASTARTES unit is **[gloss:selected-to-shoot:selected to shoot]**, you can use this ability. If you do, select one **[gloss:visible:visible]** enemy unit within 18\" of this unit. That unit is **scanned**:\n▪ While a unit is **scanned**, ranged attacks that target that unit can re-roll **[gloss:hit-roll:hit rolls]** of 1."
      }
    ],
    "composition": [
      "1 Incursor Sergeant model",
      "4-9 Incursor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Occulus Bolt Carbine; 1 Paired Combat Blades.",
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "infernus-squad",
    "name": "Infernus Squad",
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
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 200,
        "note": "3rd+"
      }
    ],
    "flavor": "Infernus Squads purge swathes of the enemy ranks with the incandescent firestorms they unleash from their pyreblasters. They are close assault specialists, sending jets of burning promethium into enemy trench lines and bunkers and through dense ruins and concealing vegetation, ensuring no foe escapes their fiery wrath.",
    "profiles": [
      {
        "name": "Infernus Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Infernus Marine",
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
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Driven from Cover",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. Friendly ADEPTUS ASTARTES units’ ranged attacks that target that enemy unit have [IGNORES COVER]."
      }
    ],
    "composition": [
      "1 Infernus Sergeant model",
      "4-9 Infernus Marine models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Pyreblaster.",
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "infiltrator-squad",
    "name": "Infiltrator Squad",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 10,
        "points": 150
      }
    ],
    "flavor": "Infiltrator Squads are experts in covert operations and are drilled extensively in self-sufficiency and survival skills. Equipped with omni-scramblers that cripple enemy communications, they wreak havoc amongst their foes before cutting them down with hails of accurate bolt fire.",
    "profiles": [
      {
        "name": "Infiltrator",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Infiltrator Sergeant",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
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
      },
      {
        "name": "Marksman Bolt Carbine",
        "tags": [
          "PRECISION",
          "RAPID FIRE 1"
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
        "name": "Ceramite Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Omni-scramblers",
        "text": "In your Shooting phase, you can select one **[gloss:visible:visible]** enemy unit within 18\" of this unit. That unit is **detected**:\n▪ While a unit is **detected**, that unit has +3\" **[gloss:detection-range:detection range]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Helix Gauntlet",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** D3 wounds."
      }
    ],
    "composition": [
      "1 Infiltrator Sergeant model",
      "4-9 Infiltrator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Marksman Bolt Carbine.",
    "options": [
      "1 model can be equipped with 1 Helix Gauntlet."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "intercessor-squad",
    "name": "Intercessor Squad",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 10,
        "points": 170
      }
    ],
    "flavor": "Intercessor Squads are capable of laying down punishing fire while advancing or holding ground against the enemy. They have access to a range of bolt weaponry suited to varied battlefield assignments, from engaging enemies at long range to cleansing bunker complexes.",
    "profiles": [
      {
        "name": "Intercessor",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Intercessor Sergeant",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
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
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Knives and Fists",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Bolter Discipline",
        "text": "In your Shooting phase, if any of the following apply, this unit’s ranged attacks have +1 to **[gloss:hit-roll:hit rolls]**:\n▪ This unit is within range of an **[gloss:objective:objective]**.\n▪ The target of that attack is within range of an **objective**."
      },
      {
        "name": "Tactical Mainstay",
        "text": "▪ Being **[gloss:engaged:engaged]**/**[gloss:battle-shocked:battle-shocked]** does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**.\n▪ When this unit **[gloss:action:starts an action]**, that **action** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]**."
      }
    ],
    "composition": [
      "1 Intercessor Sergeant model",
      "4-9 Intercessor models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Bolt Rifle; 1 Knives and Fists.",
    "options": [
      "The Intercessor Sergeant can have their Knives and Fists replaced with one of the following:\n▪ 1 Chainsword\n▪ 1 Power Fist\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer",
      "The Intercessor Sergeant can have their Bolt Rifle replaced with one of the following:\n▪ 1 Chainsword\n▪ 1 Hand Flamer\n▪ 1 Plasma Pistol\n▪ 1 Power Weapon",
      "For every 5 models in this unit, 1 Intercessor model can be equipped with 1 Grenade Launcher."
    ],
    "keywords": [
      "Battleline",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "invader-atvs",
    "name": "Invader ATVs",
    "points": [
      {
        "models": 1,
        "points": 65,
        "note": "1st-2nd"
      },
      {
        "models": 2,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 75,
        "note": "3rd+"
      },
      {
        "models": 2,
        "points": 140,
        "note": "3rd+"
      }
    ],
    "profiles": [
      {
        "name": "Invader ATV",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2"
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
        "name": "Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Bolt Rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Aggressive Reconnaissance",
        "text": "In your Shooting phase, this unit’s ranged attacks that target an enemy unit that is not within 6\" of any other enemy units have +1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1-2 Invader ATV models"
    ],
    "loadout": "**Every model is equipped with:** 1 Armoured Impact; 1 Bolt Pistol; 1 Onslaught Gatling Cannon; 1 Twin Bolt Rifle.",
    "options": [
      "All models in this unit can each have their Onslaught Gatling Cannon replaced with 1 Multi-melta."
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Mounted",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "None"
  },
  {
    "id": "invictor-tactical-warsuit",
    "name": "Invictor Tactical Warsuit",
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
    "flavor": "Outfitted with silent reactors and servos, the Invictor Tactical Warsuit is a combat walker ideally suited to supporting Vanguard operations and functioning independently from a main Space Marine strike force. In battle they are piloted by hand-picked warriors dedicated to defending their battle-brothers.",
    "profiles": [
      {
        "name": "Invictor Tactical Warsuit",
        "m": "10\"",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Fragstorm Grenade Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Incendium Cannon",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ironhail Heavy Stubbers",
        "tags": [
          "RAPID FIRE 6"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Ironhail Autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Invictor Fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3, Scouts 8\", Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Forward Assault Warsuit",
        "text": "At the start of the first battle round, you can select one enemy unit to be this unit’s **mark**:\n▪ This unit’s attacks that target this unit’s **mark** can re-roll **[gloss:wound-roll:wound rolls]** of 1.\n▪ Each time this unit’s **mark** is **[gloss:destroyed:destroyed]**, select one enemy unit to be this unit’s **mark**."
      }
    ],
    "composition": [
      "1 Invictor Tactical Warsuit model"
    ],
    "loadout": "**This model is equipped with:** 1 Fragstorm Grenade Launcher; 1 Heavy Bolter; 1 Incendium Cannon; 1 Invictor Fist; 1 Ironhail Heavy Stubbers.",
    "options": [
      "This model’s Incendium Cannon can be replaced with 1 Twin Ironhail Autocannon."
    ],
    "keywords": [
      "Imperium",
      "Phobos",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "iron-father-feirros",
    "name": "Iron Father Feirros",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Malkaan Feirros is the Iron Hands Master of the Forge and amongst the oldest of those Chapter leaders known as Iron Fathers. He guides the Chapter’s battle-brothers and its war engines’ machine spirits to unleash precise destruction. Feirros is no less a deadly combatant himself, employing the huge axe Harrowhand and the servo arms of his Medusan Manipuli to eviscerate and crush.",
    "profiles": [
      {
        "name": "Iron Father Feirros",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "6",
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
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Gorgon’s Wrath",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Harrowhand",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Medusan Manipuli",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Master of the Forge",
        "text": "In your Movement phase, at the start or end of this unit’s move, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model:\n▪ That VEHICLE model **[gloss:heal:heals]** 3 wounds.\n▪ That VEHICLE model’s attacks can ignore modifiers to the following until the start of your next Movement phase:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Hit rolls]** and **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Rites of Tempering",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Iron Father",
        "text": "While this model is within 3\" of a friendly ADEPTUS ASTARTES VEHICLE unit, this model has [core:Lone Operative]"
      }
    ],
    "composition": [
      "1 Iron Father Feirros model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Gorgon’s Wrath; 1 Harrowhand; 1 Medusan Manipuli.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad with heavy bolters",
        "Eradicator Squad with melta rifles",
        "Heavy Intercessor Squad"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Iron Hands"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "judiciar",
    "name": "Judiciar",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Sworn to silence, Judiciars do not preach aloud, but instead their deeds are a litany of fury. Wielding a tempormortis in one hand and an immense blade in the other, they must prove their worth in battle to join the Chaplaincy proper, doing so through acts of devotion and the slaying of enemies.",
    "profiles": [
      {
        "name": "Judiciar",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+",
        "invNote": "* Against melee attacks only"
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
        "name": "Executioner Relic Blade",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support, Fights First",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Tempormortis",
        "text": "This unit has [core:Fights First]."
      }
    ],
    "composition": [
      "1 Judiciar model"
    ],
    "loadout": "**This model is equipped with:** 1 Absolvor Bolt Pistol; 1 Executioner Relic Blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "kaius-konorius",
    "name": "Kaius Konorius",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "Kaius Konorius",
        "m": "6\"",
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
        "name": "Severance and Rebuke – strike",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Severance and Rebuke – sweep",
        "tags": [
          "CLEAVE 2"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Veteran Bodyguard",
        "text": "While this model is attached to a unit, other CHARACTER models in this unit have [core:Feel No Pain 4+]."
      },
      {
        "name": "Calgar’s Champion",
        "text": "This model’s attacks that target a CHARACTER unit can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1."
      }
    ],
    "composition": [
      "1 Kaius Konorius model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Severance and Rebuke.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Sternguard Veteran Squad",
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "kayvaan-shrike",
    "name": "Kayvaan Shrike",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "Kayvaan Shrike is the Raven Guard Chapter’s foremost warrior and an exemplar of Corax’s teachings. A master of ambush, stealth and vigilance, he leads his warriors in daring raids, guerrilla campaigns and precision strikes, dropping silently from the skies before tearing his foes apart with savage slashes from the Raven’s Talons.",
    "profiles": [
      {
        "name": "Kayvaan Shrike",
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
        "name": "Blackout",
        "tags": [
          "CLOSE-QUARTERS",
          "PRECISION"
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
        "name": "Raven’s Talons",
        "tags": [
          "PRECISION",
          "TWIN-LINKED"
        ],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Deep Strike, Lone Operative",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Trifold Path of Shadow",
        "text": "This unit has:\n▪ [core:Stealth].\n▪ -3\" **[gloss:detection-range:detection range]**."
      },
      {
        "name": "Echo of the Ravenspire",
        "text": "At the end of your opponent’s Fight phase, if this unit is **[gloss:unengaged:unengaged]**, you can place this unit in **[gloss:strategic-reserves:strategic reserves]**."
      }
    ],
    "composition": [
      "1 Kayvaan Shrike model"
    ],
    "loadout": "**This model is equipped with:** 1 Blackout; 1 Raven’s Talons.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Explosives",
      "Fly",
      "Imperium",
      "Infantry",
      "Jump Pack",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Raven Guard"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "korsarro-khan",
    "name": "Kor’sarro Khan",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "As Captain of the White Scars 3rd Company and Master of the Hunt, Kor’sarro Khan pursues and executes the Chapter’s greatest living foes. He is an indefatigable huntsman, tracking his quarry across the stars before running them to ground and taking their head with a masterful sweep of his deadly blade, Moonfang.",
    "profiles": [
      {
        "name": "Kor'sarro Khan",
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
        "name": "Anzuq",
        "tags": [
          "ANTI-INFANTRY 4+",
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS: INFANTRY"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
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
        "name": "Moonfang",
        "tags": [
          "ANTI-CHARACTER 5+",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Trophy Taker",
        "text": "This unit’s attacks that target a CHARACTER unit can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      {
        "name": "For the Khan!",
        "text": "▪ This unit’s ranged attacks have [ASSAULT]\n▪ This unit’s melee attacks have [LANCE]."
      }
    ],
    "composition": [
      "1 Kor’sarro Khan model"
    ],
    "loadout": "**This model is equipped with:** 1 Anzuq; 1 Bolt Pistol; 1 Moonfang.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "White Scars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "kratos",
    "name": "Kratos",
    "points": [
      {
        "models": 1,
        "points": 240
      }
    ],
    "flavor": "Boasting an impressive array of weapon loadouts and a formidably armoured hull, the Kratos is a venerable assault tank that has earned well its reputation amongst the hosts of both loyalist and heretic commanders alike. Advancing alongside formations of armoured infantry, the vehicle provides punishing fire support that can turn the tide of entire battles.",
    "profiles": [
      {
        "name": "Kratos",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "18",
        "ld": "6+",
        "oc": "6"
      }
    ],
    "ranged": [
      {
        "name": "Autocannon",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Volkite Caliver",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Melta Blast-gun",
        "tags": [
          "MELTA 3"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Volkite Cardanelle",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "9",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "3"
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Volkite Culverin",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
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
      },
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Kratos Battle Cannon – blast",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "10",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Kratos Battle Cannon – piercing",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "D3+6"
      },
      {
        "name": "Combi-weapon – damnatus",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
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
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Havoc Launcher",
        "tags": [
          "BLAST 1"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
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
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Twin Boltgun",
        "tags": [
          "RAPID FIRE 1",
          "TWIN-LINKED"
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Line-breaker",
        "text": "In your Shooting phase, when this unit is **[gloss:selected-to-shoot:selected to shoot]** using **[gloss:close-quarters:close-quarters shooting]**:\n▪ This unit's attacks that target a unit **[gloss:engaged:engaged]** with this unit can ignore modifiers to:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Hit rolls]**.\n▪ For each of this unit's [BLAST] weapons, you can choose for that weapon to not have [BLAST]:\n▪ If you do, that weapon can only target an enemy unit that is not **engaged** with another friendly unit."
      }
    ],
    "composition": [
      "1 Kratos model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Autocannon; 4 Heavy Bolter; 1 Kratos Battle Cannon.",
    "options": [
      "This model's 2 Heavy Bolters can be replaced with one of the following: 2 Autocannons, 2 Lascannonss, 2 Volkite Calivers",
      "This model's Kratos Battle Cannon can be replaced with one of the following: 1 Melta Blast-gun, 1 Volkite Cardanelle",
      "This model's 2 Heavy Bolters can be replaced with one of the following: 2 Heavy Flamers, 2 Lascannonss, 2 Volkite Culverins",
      "This model can be equipped with one of the following: 1 Combi-weapon, 1 Havoc Launcher, 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Twin Boltgun",
      "This model can be equipped with 1 Hunter-killer Missile"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "land-raider",
    "name": "Land Raider",
    "points": [
      {
        "models": 1,
        "points": 245,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 265,
        "note": "2nd+"
      }
    ],
    "flavor": "Land Raiders are mobile fortresses that bear squads of Space Marines through the most furious firestorms without so much as a scratch. Their machine spirits are so potent that if the crew are slain they will take over, making the tank a truly formidable asset.",
    "profiles": [
      {
        "name": "Land Raider",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Godhammer Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
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
        "name": "Power of the Machine Spirit",
        "text": "This unit’s ranged attacks can:\n▪ Re-roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re-roll __one__ **[gloss:wound-roll:wound roll]**."
      },
      {
        "name": "Assault Ramp",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, units embarked within this unit can make an **[gloss:assault-disembark-move:assault disembark move]** (pg 157)."
      }
    ],
    "composition": [
      "1 Land Raider model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Twin Heavy Bolter.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile.",
      "This model can be equipped with 1 Multi-melta.",
      "This model can be equipped with 1 Storm Bolter."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 14 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK models. Each GRAVIS/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "None"
  },
  {
    "id": "land-raider-crusader",
    "name": "Land Raider Crusader",
    "points": [
      {
        "models": 1,
        "points": 230,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 250,
        "note": "2nd+"
      }
    ],
    "flavor": "The Land Raider Crusader is a superlative assault tank. Its bulk enables it to crush enemy defences, and its prodigious firepower cuts their defenders to ribbons. With an enhanced transport capacity, once it has stormed enemy defences, Space Marines pour from its hatches to slaughter those foes who remain.",
    "profiles": [
      {
        "name": "Land Raider Crusader",
        "m": "12\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Hurricane Bolter",
        "tags": [
          "RAPID FIRE 6",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
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
        "name": "Assault Ramp",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, units embarked within this unit can make an **[gloss:assault-disembark-move:assault disembark move]** (pg 157)."
      },
      {
        "name": "Fury of the Machine Spirit",
        "text": "This unit’s ranged attacks that target a unit within 12\" of this unit have [LETHAL HITS]."
      }
    ],
    "composition": [
      "1 Land Raider Crusader model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Hurricane Bolter; 1 Twin Assault Cannon.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile.",
      "This model can be equipped with 1 Multi-melta.",
      "This model can be equipped with 1 Storm Bolter."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 16 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK models. Each GRAVIS/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Explosives",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "None"
  },
  {
    "id": "land-raider-excelsior",
    "name": "Land Raider Excelsior",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "profiles": [
      {
        "name": "Land Raider Excelsior",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Godhammer Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "3"
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
      },
      {
        "name": "Combi-weapon – damnatus",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
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
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a **[gloss:stratagem:stratagem]**. If it does, reduce the cost of that **stratagem** by 1 **[gloss:command-points:CP]**."
      }
    ],
    "composition": [
      "1 Land Raider Excelsior model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Godhammer Lascannon; 1 Grav-cannon.",
    "options": [
      "This model can be equipped with 1 Multi-melta",
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model can be equipped with 1 Storm Bolter",
      "This model can be equipped with 1 Combi-weapon - Damnatus"
    ],
    "transport": "This model has a transport capacity of 12 Adeptus Astartes Infantry models. Each Jump Pack, Gravis, Terminator model takes up the space of 2 models. Each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "land-raider-redeemer",
    "name": "Land Raider Redeemer",
    "points": [
      {
        "models": 1,
        "points": 245,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 265,
        "note": "2nd+"
      }
    ],
    "flavor": "In brutal urban combat, it can be impossible to root out entrenched foes. Not so for the Land Raider Redeemer. When it engages its flamestorm cannons, any caught in the raging inferno of burning promethium that follows are doomed, and bunkers, pill boxes, ruined factorums and shattered hab-blocks are cleansed of the enemy.",
    "profiles": [
      {
        "name": "Land Raider Redeemer",
        "m": "12\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5"
      }
    ],
    "ranged": [
      {
        "name": "Flamestorm Cannon",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Wrath of the Machine Spirit",
        "text": "This unit’s ranged attacks that target a unit within 12\" of this unit have [DEVASTATING WOUNDS: **non-**MONSTER/VEHICLE]."
      },
      {
        "name": "Assault Ramp",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, units embarked within this unit can make an **[gloss:assault-disembark-move:assault disembark move]** (pg 157)."
      }
    ],
    "composition": [
      "1 Land Raider Redeemer model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Flamestorm Cannon; 1 Twin Assault Cannon.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile.",
      "This model can be equipped with 1 Multi-melta.",
      "This model can be equipped with 1 Storm Bolter."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 14 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK models. Each GRAVIS/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Explosives",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "None"
  },
  {
    "id": "land-speeder",
    "name": "Land Speeder",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Streaking over the battlefield on humming anti-grav engines, the Land Speeder performs blistering attack runs to rake the enemy with shots then darts away before the foe can respond. It is a valuable rapid reconnaissance asset for Space Marine forces in the field and excels in providing highly mobile fire support.",
    "profiles": [
      {
        "name": "Land Speeder",
        "m": "14\"",
        "t": "8",
        "sv": "3+",
        "w": "9",
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
        "name": "Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormfury Missile Launcher",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Pyrecannon",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Purgation Run",
        "text": "In your Shooting phase, when this unit has shot, you can use this ability. If you do:\n▪ This unit can make a **[gloss:normal-move:normal move]** of up to D6\".\n▪ This unit is not **[gloss:eligible-to-charge:eligible to declare a charge]** until the end of the turn."
      }
    ],
    "composition": [
      "1 Land Speeder model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Multi-melta; 1 Onslaught Gatling Cannon; 1 Stormfury Missile Launcher.",
    "options": [
      "This model’s Onslaught Gatling Cannon can be replaced with 1 Pyrecannon."
    ],
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "librarian",
    "name": "Librarian",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Librarians are the Space Marines’ battle-psykers and keepers of lore. Wielding terrifying empyric energies, with but a thought they can crush a foe’s skull, throw up force shields to protect their brethren from incoming fire, and hurl blasts of psychic power.",
    "profiles": [
      {
        "name": "Librarian",
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
      },
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Force Weapon",
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
    "core": "Leader",
    "faction": "Combat Doctrines, Librarius",
    "abilities": [
      {
        "name": "Psychic Hood (Psychic)",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]**."
      },
      {
        "name": "Librarian (psyker level 1)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      }
    ],
    "composition": [
      "1 Librarian model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Force Weapon; 1 Smite.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "abilitySets": [
      {
        "name": "Librarian (psyker level 1)",
        "options": [
          {
            "name": "Veil of Time (psychic level 1)",
            "text": "When this unit is selected to make an **[gloss:advance-move:advance move]**, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit can change that **[gloss:advance-roll:advance roll]** to a 6."
          },
          {
            "name": "Force Dome (psychic level 1)",
            "text": "In your Movement phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit has 4+ **[gloss:invulnerable-save:InSv]** until the start of your next turn."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Psyker",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "librarian-in-phobos-armour",
    "name": "Librarian in Phobos Armour",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Many Librarians learn the arcane arts of obscuration and illusion as part of their long and dangerous training. Donning Phobos armour, they take to the field and use these skills to fog the minds of their enemies, prise vital battle plans from their foes’ minds and turn the enemy’s shadows against them.",
    "profiles": [
      {
        "name": "Librarian in Phobos Armour",
        "m": "8\"",
        "t": "4",
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
      },
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Force Weapon",
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
    "core": "Scouts 6\", Deep Strike, Infiltrators, Stealth, Leader",
    "faction": "Combat Doctrines, Librarius",
    "abilities": [
      {
        "name": "Psychic Hood (Psychic)",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]**."
      },
      {
        "name": "Librarian (psyker level 1)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      }
    ],
    "composition": [
      "1 Librarian in Phobos Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Force Weapon; 1 Smite.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Eliminator Squad",
        "Incursor Squad",
        "Infiltrator Squad",
        "Reiver Squad",
        "Scout Squad",
        "Spectrus Kill Team",
        "Wolf Scouts"
      ]
    },
    "abilitySets": [
      {
        "name": "Librarian (psyker level 1)",
        "options": [
          {
            "name": "Shrouding (psychic level 1)",
            "text": "When an enemy unit targets this unit, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]** until the end of the phase."
          },
          {
            "name": "Soul Sight (psychic level 1)",
            "text": "In your Shooting phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Select one **[gloss:visible:visible]** enemy unit. Ranged attacks that target that enemy unit have [IGNORES COVER]."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Psyker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "librarian-in-terminator-armour",
    "name": "Librarian in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The powers of a Chapter’s Librarians lend a lethal psychic edge to its elite infantry spearheads. Whether it be gruelling boarding actions, ferocious urban combat or on the front line against overwhelming enemy numbers, Librarians in Terminator armour blast at the foe with their powerful psychic energies.",
    "profiles": [
      {
        "name": "Librarian in Terminator Armour",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "5",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Force Weapon",
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
    "core": "Deep Strike, Leader",
    "faction": "Librarius, Combat Doctrines",
    "abilities": [
      {
        "name": "Psychic Hood (Psychic)",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]**."
      },
      {
        "name": "Librarian (psyker level 1)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      }
    ],
    "composition": [
      "1 Librarian in Terminator Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Force Weapon; 1 Smite; 1 Storm Bolter.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Wolf Guard Terminators"
      ]
    },
    "abilitySets": [
      {
        "name": "Librarian (psyker level 1)",
        "options": [
          {
            "name": "Might of Heroes (psychic level 1)",
            "text": "In the Fight phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit’s melee attacks have +2 **[gloss:strength:S]**."
          },
          {
            "name": "Thunderous Force (psychic level 1)",
            "text": "In your Shooting phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ This unit’s ranged attacks have +6\" **[gloss:range:R]**."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Imperium",
      "Infantry",
      "Psyker",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lieutenant",
    "name": "Lieutenant",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Lieutenants, in addition to being extremely able tacticians and strategists, are highly skilled warriors. Experts in all the lethal weaponry of the battle-brothers they so often command and fight alongside, they bellow orders and coordinate their brothers’ attacks even as they strike at the foe with their own arsenal of powerful weapons.",
    "profiles": [
      {
        "name": "Lieutenant",
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
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted Bolter",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Neo-volkite Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "0",
        "d": "2"
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
        "name": "Ceramite Fists",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "This unit’s attacks have [LETHAL HITS: **non-**MONSTER/VEHICLE]."
      },
      {
        "name": "Demi-company Commander (Once per turn, per unit)",
        "text": "When a friendly CAPTAIN unit uses its Strategic Acumen ability, you can use this ability. If you do, the selected **[gloss:sm-combat-doctrine:combat doctrine]** is active for this unit until the start of your next Command phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has a 4+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Lieutenant model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Ceramite Fists; 1 Master-crafted Bolter.",
    "options": [
      "This model’s Master-crafted Bolter and Bolt Pistol can be replaced with 1 Neo-volkite Pistol and 1 Master-crafted Power Weapon.",
      "If this model is equipped with 1 Neo-volkite Pistol, it can be equipped with 1 Storm Shield (this model’s 1 Neo-volkite Pistol cannot be replaced).",
      "This model’s Bolt Pistol can be replaced with 1 Heavy Bolt Pistol.",
      "This model’s Master-crafted Bolter can be replaced with one of the following:\n▪ 1 Master-crafted Power Weapon\n▪ 1 Plasma Pistol\n▪ 1 Power Fist",
      "This model’s Ceramite Fists can be replaced with one of the following:\n▪ 1 Master-crafted Power Weapon\n▪ 1 Power Fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Vanguard Veteran Squad"
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
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lieutenant-in-phobos-armour",
    "name": "Lieutenant in Phobos Armour",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Highly capable combat commanders, Lieutenants can lead independent reconnaissance, sabotage and assassination forces far beyond Imperial lines. They are deadly warriors, and the last sensation of countless foes has been the cold press of a Space Marine Lieutenant’s knife to their neck.",
    "profiles": [
      {
        "name": "Lieutenant in Phobos Armour",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Special-issue Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Master-crafted bolt carbine",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Monomolecular Combat Blades",
        "tags": [
          "PRECISION",
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Support, Scouts 6\", Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "This unit’s attacks have [LETHAL HITS: **non-**MONSTER/VEHICLE]."
      },
      {
        "name": "Demi-company Commander (Once per turn, per unit)",
        "text": "When a friendly CAPTAIN unit uses its Strategic Acumen ability, you can use this ability. If you do, the selected **[gloss:sm-combat-doctrine:combat doctrine]** is active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Lieutenant in Phobos Armour model"
    ],
    "loadout": "**This model is equipped with:** 1 Monomolecular Combat Blades; 1 Special-issue Bolt Pistol.",
    "options": [
      "This model’s Special-issue Bolt Pistol can be replaced with 1 Master-crafted Bolt Carbine."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Eliminator Squad",
        "Incursor Squad",
        "Infiltrator Squad",
        "Reiver Squad",
        "Spectrus Kill Team",
        "Wolf Scouts"
      ]
    },
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lieutenant-with-combi-weapon",
    "name": "Lieutenant with Combi-weapon",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "Some Lieutenants in Phobos armour are tasked with operating behind enemy lines, acting as skilled assassins and intelligence gatherers. By the time the main Space Marine task force has arrived they have cast the enemy into disarray and collected incredible tactical data that will all but guarantee the assault’s success.",
    "profiles": [
      {
        "name": "Lieutenant with Combi-weapon",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Combi-weapon – bolter",
        "tags": [
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
        "name": "Combi-weapon – flamer",
        "tags": [
          "ASSAULT",
          "BLAST 1",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Paired Combat Blades",
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
    "core": "Infiltrators, Feel No Pain 5+, Lone Operative, Stealth",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Priority Target Identified (Once per battle, per unit)",
        "text": "In your Command phase, you can use this ability. If you do, select one **visible terrain feature**. That terrain feature is **identified** until the end of the turn.\n▪ While an enemy unit is within an** identified terrain feature**, that enemy unit has +3\" **[gloss:detection-range:detection range]**."
      },
      {
        "name": "Evade and Survive (Once per phase, per unit)",
        "text": "In your opponent’s Movement phase, when an enemy unit ends a move within 8\" of this unit, if this unit is **[gloss:unengaged:unengaged]**, this unit can make a **[gloss:normal-move:normal move]** of up to D3+3\"."
      }
    ],
    "composition": [
      "1 Lieutenant with Combi-weapon model"
    ],
    "loadout": "**This model is equipped with:** 1 Combi-weapon; 1 Paired Combat Blades.",
    "keywords": [
      "Character",
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "marneus-calgar",
    "name": "Marneus Calgar",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "profiles": [
      {
        "name": "Marneus Calgar",
        "m": "6\"",
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
        "name": "Gauntlets of Ultramar",
        "tags": [
          "CLOSE-QUARTERS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Gauntlets of Ultramar",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Gauntlets of Ultramar – overhead smash",
        "tags": [
          "EXTRA ATTACKS",
          "TWIN-LINKED"
        ],
        "a": "1",
        "ws": "2+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "core": "Leader, Deep Strike",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Codex Adept",
        "text": "The **[gloss:sm-combat-doctrine:assault doctrine]**, **devastator doctrine** and **tactical doctrine** are active for this unit."
      },
      {
        "name": "Master Tactician",
        "text": "In your Movement phase, you can select one **[gloss:visible:visible]** friendly ADEPTUS ASTARTES unit within 9\" of this model, and select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for that unit until the start of your next Command phase."
      },
      {
        "name": "Thunderhawk Insertion",
        "text": "In the Declare Battle Formations step, you can select one friendly GRAVIS/PHOBOS/TACTICUS unit. That unit has [core:Deep Strike]."
      }
    ],
    "composition": [
      "1 Marneus Calgar model"
    ],
    "loadout": "**This model is equipped with:** 1 Gauntlets of Ultramar.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Eradicator Squad with heavy bolters",
        "Eradicator Squad with melta rifles",
        "Heavy Intercessor Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Vanguard Veteran Squad",
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Chapter Master",
      "Character",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "mastodon",
    "name": "Mastodon",
    "points": [
      {
        "models": 1,
        "points": 540
      }
    ],
    "flavor": "The Mastodon is one of the heaviest assault transports ever fielded by the Space Marines, reserved for use against the most heavily fortified positions. Several times the size of a Land Raider, the Mastodon’s primary role is to deliver armoured warriors directly into the breach created with the siege melta array mounted on the vehicle’s armoured prow.",
    "profiles": [
      {
        "name": "Mastodon",
        "m": "9\"",
        "t": "14",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "12"
      }
    ],
    "ranged": [
      {
        "name": "Heavy Flamer",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Siege Melta Array",
        "tags": [
          "MELTA 3"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Skyreaper Battery",
        "tags": [
          "ANTI-FLY 4+"
        ],
        "range": "48\"",
        "a": "8",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Volkite Culverin",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
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
    "core": "Deadly Demise 2D6, Damaged 10",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Inviolable Transport",
        "text": "Attacks allocated to this unit have -1 **[gloss:damage-roll:D]**."
      }
    ],
    "composition": [
      "1 Mastodon model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Heavy Flamer; 2 Lascannon; 1 Siege Melta Array; 1 Skyreaper Battery.",
    "options": [
      "This model's 2 Heavy Flamers can be replaced with one of the following: 2 Heavy Bolters, 2 Lascannons, 2 Volkite Culverins",
      "This model's 2 Lascannons can be replaced with one of the following: 2 Heavy Bolters, 2 Heavy Flamers, 2 Volkite Culverins"
    ],
    "transport": "This model has a transport capacity of 45 Adeptus Astartes Infantry models. And 2 Dreadnought models. Each Jump Pack, Gravis, Terminator model takes up the space of 2 models. Each Centurion model takes up the space of 3 models. Each DREADNOUGHT model take up the space of a number of models equal to their **[gloss:wounds:W]** characteristic.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Titanic",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "outrider-squad",
    "name": "Outrider Squad",
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
    "flavor": "Outrider Squads advance ahead of the main Space Marine lines, guard flanks of larger formations and hunt down enemy infiltrators. When battle is joined, they conduct lightning-fast hit-and-run attacks on defended positions, and run down those who would try to escape the vengeance of the Chapter.",
    "profiles": [
      {
        "name": "Outrider",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Outrider Sergeant",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
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
        "name": "Twin Bolt Rifle",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 2",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
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
        "name": "Power Weapon",
        "tags": [],
        "a": "3",
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Full-throttle Assault",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s:\n▪ Thunder Hammer weapons have +1 to **[gloss:hit-roll:hit rolls]** and [SUSTAINED HITS 1].\n▪ Other melee weapons have +1 **[gloss:damage-roll:D]** and [SUSTAINED HITS 1]."
      }
    ],
    "composition": [
      "1 Outrider Sergeant model",
      "2-5 Outrider models"
    ],
    "loadout": "**Every model is equipped with:** 1 Chainsword; 1 Heavy Bolt Pistol; 1 Twin Bolt Rifle.",
    "options": [
      "The Outrider Sergeant can have their Chainsword replaced with one of the following:\n▪ 1 Power Weapon\n▪ 1 Thunder Hammer",
      "For every 3 models in this unit, 1 model can have their Heavy Bolt Pistol replaced with 1 Plasma Pistol."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "predator-annihilator",
    "name": "Predator Annihilator",
    "points": [
      {
        "models": 1,
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 145,
        "note": "3rd+"
      }
    ],
    "flavor": "Predator Annihilators excel at leading armoured spearheads, moving at high speed and firing all the while. Their crews take pride in their particularly ferocious machine spirits, and gladly thunder into the fiercest fighting to blow apart enemy armoured columns and dense bunker complexes.",
    "profiles": [
      {
        "name": "Predator Annihilator",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Predator Twin Lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
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
    "core": "Deadly Demise D3, Damaged 4",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Annihilator",
        "text": "This unit's ranged attacks that target a MONSTER/VEHICLE unit can re-roll **[gloss:damage-roll:damage rolls]**."
      }
    ],
    "composition": [
      "1 Predator Annihilator model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Lascannon; 1 Predator Twin Lascannon.",
    "options": [
      "This model's 2 Lascannons can be replaced with 2 Heavy Bolters.",
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model can be equipped with 1 Storm Bolter"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "predator-destructor",
    "name": "Predator Destructor",
    "points": [
      {
        "models": 1,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Predator Destructors have served the Emperor for more than ten thousand years with resolute steadfastness, proving themselves by slaughtering hordes of enemy infantry, shattering assaults and laying waste to light vehicles. To the always-outnumbered Space Marines, their firepower has long been vital.",
    "profiles": [
      {
        "name": "Predator Destructor",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Predator Autocannon",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
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
      },
      {
        "name": "Heavy Bolter",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
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
        "name": "Destructor",
        "text": "This unit's ranged attacks that target an INFANTRY unit have +1 **[gloss:armour-penetration:AP]**."
      }
    ],
    "composition": [
      "1 Predator Destructor model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 2 Lascannon; 1 Predator Autocannon.",
    "options": [
      "This model can be equipped with 1 Storm Bolter",
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model's 2 Lascannons can be replaced with 2 Heavy Bolters."
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "rapier-carrier",
    "name": "Rapier Carrier",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "The Rapier Armoured Carrier is a bulky, tracked device that traces its origin to the dawn of Mankind’s stellar empire. Compatible with various heavy weapons, the Rapier is most commonly fitted with a powerful quad lascannon known as a laser destroyer, making it a compact but potent anti-armour asset.",
    "profiles": [
      {
        "name": "Rapier Carrier",
        "m": "3\"",
        "t": "6",
        "sv": "2+",
        "w": "6",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Quad Heavy Bolter",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Graviton Cannon",
        "tags": [
          "ANTI-VEHICLE 2+",
          "BLAST 2",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
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
        "name": "Quad Launcher – shatter shells",
        "tags": [
          "HEAVY"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Quad Launcher – thunderfire shells",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "60\"",
        "a": "D3+6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Powerful Volley",
        "text": "In a turn this unit **[gloss:remain-stationary:remained stationary]**, ranged attacks that have [HEAVY] also have [LETHAL HITS]."
      }
    ],
    "composition": [
      "1 Rapier Carrier model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Boltgun; 1 Quad Heavy Bolter.",
    "options": [
      "This model's Quad Heavy Bolter can be replaced with one of the following: 1 Graviton Cannon, 1 Laser Destroyer, 1 Quad Launcher"
    ],
    "keywords": [
      "Artillery",
      "Frame",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "razorback",
    "name": "Razorback",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "The Razorback replaces some of the Rhino’s transport capacity with a heavy weapon turret, and provides fire support for armoured infantry assaults while delivering its own cargo of warriors to battle. Such is its success that for many Chapters it performs additional functions, notably as a mobile command centre.",
    "profiles": [
      {
        "name": "Razorback",
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
    "core": "Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fire Support",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. Attacks that target that unit made by friendly ADEPTUS ASTARTES units that **[gloss:disembark:Disembarked]** from this TRANSPORT this turn can re-roll **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Razorback model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Twin Heavy Bolter.",
    "options": [
      "This model's Twin Heavy Bolter can be replaced with 1 Twin Lascannon.",
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model can be equipped with 1 Storm Bolter"
    ],
    "transport": "This model has a transport capacity of 6 Adeptus Astartes Infantry models. It cannot transport Jump Pack, Terminator, Centurion or Gravis models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "redemptor-dreadnought",
    "name": "Redemptor Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "Redemptor Dreadnoughts are some of the largest of their kind ever fielded by the Adeptus Astartes. Armed to the teeth, they can be equipped to utterly destroy virtually any kind of battlefield target with hails of solid shot or super-heated plasma.",
    "profiles": [
      {
        "name": "Redemptor Dreadnought",
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
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Icarus Rocket Pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
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
        "name": "Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Redemptor Fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      }
    ],
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Duty Eternal",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Redemptor Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Fragstorm Grenade Launchers; 1 Heavy Flamer; 1 Heavy Onslaught Gatling Cannon; 1 Redemptor Fist.",
    "options": [
      "This model can be equipped with 1 Icarus Rocket Pod.",
      "This model’s Fragstorm Grenade Launchers can be replaced with 1 Storm Bolters.",
      "This model’s Heavy Flamer can be replaced with 1 Onslaught Gatling Cannon.",
      "This model’s Heavy Onslaught Gatling Cannon can be replaced with 1 Macro Plasma Incinerator."
    ],
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "reiver-squad",
    "name": "Reiver Squad",
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
    "flavor": "Rapid-insertion terror troops, Reiver Squads often deploy using grav-chutes and directional fins to land with pinpoint accuracy. Operating with near perfect stealth to reach the optimum location to strike from, when ready they unleash their fury, surging forward with augmented guttural roars and blasts of weapons fire.",
    "profiles": [
      {
        "name": "Reiver Sergeant",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Reiver",
        "m": "8\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Bolt Carbine",
        "tags": [
          "ASSAULT",
          "PRECISION"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Special-issue Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Monomolecular Combat Knife",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Terror Troops (Aura)",
        "text": "While an enemy model is within 3\" of this unit, that enemy model has -1 **[gloss:objective-control:OC]**."
      },
      {
        "name": "Fearsome Assault",
        "text": "At the start of the Fight phase, each enemy unit **[gloss:engaged:engaged]** with a unit with this ability makes a **[gloss:battle-shock-test:battle‑shock roll]**, with -1 to that **battle-shock roll**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Grav-chutes",
        "text": "This unit has [core:Deep Strike]."
      },
      {
        "name": "Grapnel Launchers",
        "text": "When this unit makes a move, this unit can:\n▪ Move through all types of model.\n▪ Ignore all vertical distance for the purposes of how far this unit has moved."
      }
    ],
    "composition": [
      "1 Reiver Sergeant model",
      "4-9 Reiver models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Carbine; 1 Monomolecular Combat Knife; 1 Special-issue Bolt Pistol.",
    "options": [
      "This unit can be equipped with 1 Grav-chutes",
      "This unit can be equipped with 1 Grapnel Launchers"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Phobos",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "relic-razorback",
    "name": "Relic Razorback",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "profiles": [
      {
        "name": "Relic Razorback",
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
        "name": "Twin Assault Cannon",
        "tags": [
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
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fire Supprt",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. Attacks that target that unit made by friendly ADEPTUS ASTARTES units that **[gloss:disembark:Disembarked]** from this TRANSPORT this turn can re-roll **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Relic Razorback model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Twin Heavy Bolter.",
    "options": [
      "This model's Twin Heavy Bolter can be replaced with one of the following: 1 Multi-melta, 1 Twin Assault Cannon, 1 Twin Lascannon",
      "This model can be equipped with 1 Storm Bolter",
      "This model can be equipped with 1 Hunter-killer Missile"
    ],
    "transport": "This model has a transport capacity of 6 Adeptus Astartes Infantry models. It cannot transport Jump Pack, Gravis, Centurion or Terminator models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
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
        "name": "Las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
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
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 14 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK models. Each GRAVIS/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "repulsor-executioner",
    "name": "Repulsor Executioner",
    "points": [
      {
        "models": 1,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 280,
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
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 7 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK models. Each GRAVIS/TERMINATOR model takes up the space of 2 models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "100mm"
  },
  {
    "id": "rhino",
    "name": "Rhino",
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
    "flavor": "The Rhino transport has served the Space Marines for ten thousand years, and forms a part of many of their strike forces. With robust self-repair systems, the Rhino is a rugged vehicle that can swiftly navigate nightmare battlefields to deliver its deadly cargo of Space Marines into the heart of battle.",
    "profiles": [
      {
        "name": "Rhino",
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
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Firing Deck 2, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Veiling Smoke (Once per phase, per unit)",
        "text": "You can target this unit with the **Smokescreen stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
      }
    ],
    "composition": [
      "1 Rhino model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Storm Bolter.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile."
    ],
    "transport": "This model has a **[gloss:transport-capacity:transport capacity]** of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport GRAVIS/JUMP PACK/TERMINATOR models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "None"
  },
  {
    "id": "rhino-primaris",
    "name": "Rhino Primaris",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "profiles": [
      {
        "name": "Rhino Primaris",
        "m": "12\"",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Twin Plasma Gun – standard",
        "tags": [
          "RAPID FIRE 1",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Twin Plasma Gun – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Self-repair",
        "text": "In your Command phase, this unit **[gloss:heal:heals]** 1 wound."
      },
      {
        "name": "Orbital Comms Array",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of this unit, each time you target that unit with a **[gloss:stratagem:stratagem]** roll 1D6:\n▪ On a 5+, you gain 1 CP."
      }
    ],
    "composition": [
      "1 Rhino Primaris model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Twin Plasma Gun - Standard.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile"
    ],
    "transport": "This model has a transport capacity of 6 Adeptus Astartes Infantry models. It cannot transport Jump Pack, Gravis, Centurion or Terminator models.",
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "roboute-guilliman",
    "name": "Roboute Guilliman",
    "points": [
      {
        "models": 1,
        "points": 415
      }
    ],
    "flavor": "In one of Guilliman’s hands blazes the burning Emperor’s Sword. The other is clad in the Hand of Dominion, a gauntlet with which Guilliman can tear apart tanks. The Primarch’s strategic brilliance is his greatest weapon however, his enemies outmanoeuvred and out-thought before the battle has even begun.",
    "profiles": [
      {
        "name": "Roboute Guilliman",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "16",
        "ld": "5+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Hand of Dominion",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Emperor’s Sword",
        "tags": [
          "CLEAVE 2",
          "DEVASTATING WOUNDS"
        ],
        "a": "10",
        "ws": "2+",
        "s": "10",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Hand of Dominion",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "14",
        "ap": "-4",
        "d": "4"
      }
    ],
    "core": "Feel No Pain 5+",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Codex Adept",
        "text": "The **[gloss:sm-combat-doctrine:assault doctrine]**, **devastator doctrine** and **tactical doctrine** are active for this unit."
      },
      {
        "name": "Primarch of the XIII (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of this unit, that unit’s attacks can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      {
        "name": "Author of the Codex",
        "text": "In your Movement phase, you can select one **[gloss:visible:visible]** friendly ADEPTUS ASTARTES unit within 12\" of this model, and select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for that unit __in addition__ to any other **combat doctrines** that are active for that unit until the start of your next Command phase."
      },
      {
        "name": "Leader of Astartes",
        "text": "While this unit is within 3\" of a friendly ADEPTUS ASTARTES INFANTRY unit, this unit has [core:Lone Operative]."
      }
    ],
    "composition": [
      "1 Roboute Guilliman model"
    ],
    "loadout": "**This model is equipped with:** 1 Emperor’s Sword; 1 Hand of Dominion.",
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
      "Mobile",
      "Monster",
      "Primarch"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "scout-bike-squad",
    "name": "Scout Bike Squad",
    "points": [
      {
        "models": 3,
        "points": 75
      },
      {
        "models": 6,
        "points": 150
      }
    ],
    "profiles": [
      {
        "name": "Scout Biker",
        "m": "12\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Scout Biker Sergeant",
        "m": "12\"",
        "t": "5",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
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
      },
      {
        "name": "Boltgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
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
        "bs": "3+",
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
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "-1",
        "d": "3"
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
          "MELTA 2"
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
      },
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
        "name": "Twin Boltgun",
        "tags": [
          "RAPID FIRE 1",
          "TWIN-LINKED"
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
        "bs": "4+",
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
        "a": "1",
        "bs": "4+",
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
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "2",
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
        "s": "4",
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
      },
      {
        "name": "Combat Knife",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 9\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Outflank",
        "text": "When this unit makes an **[gloss:ingress-move:ingress move]**, it can be set up within your opponent's deployment zone."
      }
    ],
    "composition": [
      "1 Scout Biker Sergeant model",
      "2-5 Scout Biker models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Combat Knife; 1 Shotgun; 1 Twin Boltgun.",
    "options": [
      "Any number of models can each have their Twin Boltgun replaced with 1 Grenade Launcher.",
      "The Scout Biker Sergeant can have their Bolt Pistol replaced with one of the following: 1 Boltgun, 1 Chainsword, 1 Combi-weapon, 1 Grav-pistol, 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol - Standard, 1 Power Fist, 1 Power Weapon, 1 Storm Bolter, 1 Thunder Hammer"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Mounted",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "75x25mm Oval Base",
    "legends": true
  },
  {
    "id": "scout-squad",
    "name": "Scout Squad",
    "points": [
      {
        "models": 5,
        "points": 65
      },
      {
        "models": 10,
        "points": 120
      }
    ],
    "flavor": "Space Marine neophytes, Scouts learn their deadly craft in daring missions independent of the main force. Led by seasoned Veteran Sergeants, they infiltrate enemy positions, clear potential drop zones, set ambushes, sabotage supply lines and complete all manner of other objectives to weaken the foe.",
    "profiles": [
      {
        "name": "Scout Sergeant",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Scout",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Boltgun",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
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
        "name": "Sniper Rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy Bolter",
        "tags": [
          "HEAVY",
          "RAPID FIRE 2",
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
        "name": "Missile Launcher – frag",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "4+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
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
        "name": "Chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Scouts 6\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Flexible Asset",
        "text": "When this unit is selected to make an **[gloss:advance:advance]/[gloss:fall-back-move:fall-back move]**, that **advance/fall-back move** does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**."
      }
    ],
    "composition": [
      "1 Scout Sergeant model",
      "4-9 Scout models"
    ],
    "loadout": "**Every model is equipped with:** 1 Boltgun; 1 Bolt Pistol; 1 Combat Knife.",
    "options": [
      "The Scout Sergeant can have their Boltgun replaced with 1 Shotgun.",
      "The Scout Sergeant can have their Combat Knife replaced with 1 Chainsword.",
      "Any number of Scout models can each have their Boltgun replaced with 1 Shotgun.",
      "For every 5 models in this unit, 1 Scout model can have their Boltgun replaced with 1 Sniper Rifle.",
      "For every 5 models in this unit, 1 Scout model can have their Boltgun replaced with one of the following:\n▪ 1 Heavy Bolter\n▪ 1 Missile Launcher"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "sicaran",
    "name": "Sicaran",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "profiles": [
      {
        "name": "Sicaran",
        "m": "10\"",
        "t": "11",
        "sv": "2+",
        "w": "14",
        "ld": "6+",
        "oc": "4"
      }
    ],
    "ranged": [
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Herakles-pattern Autocannon",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Hunter-killer Missile",
        "tags": [
          "ONE SHOT"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Arcus Multi-launcher",
        "tags": [
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "7",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Omega Plasma Array – standard",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Omega Plasma Array – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Punisher Rotary Cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "18",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Venator Neutron Laser",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "16",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Damaged 5",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Armoured Spearhead",
        "text": "This unit's ranged attacks can re-roll __one__:\n▪ **[gloss:hit-roll:Hit roll]**.\n▪ **[gloss:wound-roll:Wound roll]**.\n▪ **[gloss:damage-roll:Damage roll]**."
      }
    ],
    "composition": [
      "1 Sicaran model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Heavy Bolter; 1 Herakles-pattern Autocannon.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model's Herakles-pattern Autocannon can be replaced with one of the following: 1 Arcus Multi-launcher, 1 Omega Plasma Array, 1 Punisher Rotary Cannon, 1 Venator Neutron Laser",
      "This model can be equipped with one of the following: 2 Heavy Bolters, 2 Lascannons",
      "This model can be equipped with 1 Storm Bolter"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "sternguard-veteran-squad",
    "name": "Sternguard Veteran Squad",
    "points": [
      {
        "models": 5,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 210,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 225,
        "note": "3rd+"
      }
    ],
    "flavor": "Sternguard Veterans are possessed of an unshakeable calm, and are renowned amongst their brothers for their exemplary marksmanship in the fiercest battles. Proficient in all of the Chapter’s ranged weaponry, they can always be found where their pinpoint volleys will best shatter the foe.",
    "profiles": [
      {
        "name": "Sternguard Veteran",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Sternguard Veteran Sergeant",
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
        "name": "Artificer Firearm – damnatus",
        "tags": [
          "ASSAULT",
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Artificer Firearm – infernus",
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
        "name": "Artificer Firearm – purgatus",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
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
        "name": "Heavy Bolter",
        "tags": [
          "HEAVY",
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
        "name": "Pyrecannon",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "4",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Chainsword",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power Fist",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Veteran Marksmen",
        "text": "This unit’s ranged attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1."
      }
    ],
    "composition": [
      "1 Sternguard Veteran Sergeant model",
      "4-9 Sternguard Veteran models"
    ],
    "loadout": "**The Sternguard Veteran Sergeant is equipped with:** 1 Artificer Firearm; 1 Bolt Pistol; 1 Chainsword.\n**Every Sternguard Veteran is equipped with:** 1 Artificer Firearm; 1 Bolt Pistol; 1 Ceramite Fists.",
    "options": [
      "The Sternguard Veteran Sergeant can have their Chainsword replaced with one of the following:\n▪ 1 Power Fist\n▪ 1 Power Weapon",
      "For every 5 models in this unit, 1 Sternguard Veteran model can have their Artificer Firearm replaced with one of the following:\n▪ 1 Heavy Bolter\n▪ 1 Pyrecannon"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "storm-speeder-hailstrike",
    "name": "Storm Speeder Hailstrike",
    "points": [
      {
        "models": 1,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 120,
        "note": "3rd+"
      }
    ],
    "flavor": "The Hailstrike is so heavily armed that it can annihilate entire swathes of infantry in fusillades of blistering projectiles. Speeding over the battlefield, its specialised loadout shatters charging formations and shreds barricades and defences.",
    "profiles": [
      {
        "name": "Storm Speeder Hailstrike",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Fragstorm Grenade Launchers",
        "tags": [
          "BLAST 2",
          "IGNORES COVER"
        ],
        "range": "18\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Ironhail Heavy Stubber Array",
        "tags": [
          "IGNORES COVER",
          "RAPID FIRE 6"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Onslaught Gatling Cannon",
        "tags": [
          "DEVASTATING WOUNDS: NON-MONSTER/VEHICLE",
          "IGNORES COVER"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Hailstrike",
        "text": "In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. Friendly ADEPTUS ASTARTES units’ ranged attacks that target that enemy unit have [IGNORES COVER]."
      }
    ],
    "composition": [
      "1 Storm Speeder Hailstrike model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Fragstorm Grenade Launchers; 1 Ironhail Heavy Stubber Array; 1 Onslaught Gatling Cannon.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "storm-speeder-hammerstrike",
    "name": "Storm Speeder Hammerstrike",
    "points": [
      {
        "models": 1,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "The Hammerstrike excels at rooting out enemies from trench and bunker networks. Sweeping low over the battlefield, it employs searing melta blasts and volleys of rockets to crack the foe’s defence lines wide open.",
    "profiles": [
      {
        "name": "Storm Speeder Hammerstrike",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Hammerstrike Missile Launcher",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Krakstorm Grenade Launchers",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Melta Destroyer",
        "tags": [
          "MELTA 3"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+2"
      }
    ],
    "melee": [
      {
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Hammerstrike",
        "text": "This unit’s ranged attacks that target an enemy unit within a **[gloss:terrain-area:terrain area]** have [SUSTAINED HITS 1]."
      }
    ],
    "composition": [
      "1 Storm Speeder Hammerstrike model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Hammerstrike Missile Launcher; 1 Krakstorm Grenade Launchers; 1 Melta Destroyer.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "storm-speeder-thunderstrike",
    "name": "Storm Speeder Thunderstrike",
    "points": [
      {
        "models": 1,
        "points": 140,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 150,
        "note": "3rd+"
      }
    ],
    "flavor": "Thunderstrikes outmanoeuvre the foe at every turn, targeting vulnerable points in armour, fuel stores and missile hoppers to turn tanks into raging fireballs. Just a single Thunderstrike is capable of destroying armoured breakthrough attempts, and when one is on the battlefield, few enemies are safe.",
    "profiles": [
      {
        "name": "Storm Speeder Thunderstrike",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Stormfury Missile Launcher",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Thunderstrike Icarus Rocket Pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Thunderstrike Las-talon",
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
        "name": "Armoured Impact",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Shattered Defences",
        "text": "In your Shooting phase, when this unit has shot, select one enemy MONSTER/VEHICLE unit hit by those attacks. Friendly ADEPTUS ASTARTES units’ ranged attacks that target that enemy unit have +1 **[gloss:armour-penetration:AP]**."
      },
      {
        "name": "Thunderstrike",
        "text": "This unit’s ranged attacks that target a MONSTER/VEHICLE unit have +1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Storm Speeder Thunderstrike model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Impact; 1 Stormfury Missile Launcher; 1 Thunderstrike Icarus Rocket Pod; 1 Thunderstrike Las-talon.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "stormhawk-interceptor",
    "name": "Stormhawk Interceptor",
    "points": [
      {
        "models": 1,
        "points": 155
      }
    ],
    "flavor": "Stormhawk Interceptors are high-altitude fighter craft designed solely for achieving aerial supremacy. Dropped from mag-cradles aboard orbiting craft, these ceramite-plated vehicles engage enemy air assets in brutal dogfights and are protected by countermeasures that launch blazing flares.",
    "profiles": [
      {
        "name": "Stormhawk Interceptor",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Skyhammer Missile Launcher",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
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
        "name": "Icarus Stormcannon",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "2"
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
        "name": "Typhoon Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Typhoon Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
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
    "core": "Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Interceptor",
        "text": "This unit's ranged attacks that target a FLY unit have +1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Stormhawk Interceptor model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Las-talon; 1 Skyhammer Missile Launcher; 1 Twin Assault Cannon.",
    "options": [
      "This model's Las-talon can be replaced with 1 Icarus Stormcannon.",
      "This model's Skyhammer Missile Launcher can be replaced with one of the following: 1 Twin Heavy Bolter, 1 Typhoon Missile Launcher"
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base",
    "legends": true
  },
  {
    "id": "stormraven-gunship",
    "name": "Stormraven Gunship",
    "points": [
      {
        "models": 1,
        "points": 280,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 300,
        "note": "2nd+"
      }
    ],
    "flavor": "The Stormraven superbly combines the role of reliable combat drop-ship and deadly aerial combatant. A capacious troop bay and thick layers of armour allow it to effectively transport squads of Space Marines – and, thanks to its magna-grapples, even a Dreadnought – into the very heart of battle.",
    "profiles": [
      {
        "name": "Stormraven Gunship",
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
        "name": "Hurricane Bolter",
        "tags": [
          "RAPID FIRE 6",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Stormstrike Missile Launcher",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
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
        "name": "Typhoon Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Typhoon Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
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
      },
      {
        "name": "Twin Heavy Plasma Cannon – standard",
        "tags": [
          "BLAST 1",
          "HEAVY",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin Heavy Plasma Cannon – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS",
          "HEAVY",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
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
    "core": "Damaged 5, Deadly Demise D6, Hover",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Armoured Resilience",
        "text": "Attacks that target this unit have -1 **[gloss:damage-roll:D]**."
      }
    ],
    "composition": [
      "1 Stormraven Gunship model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 2 Stormstrike Missile Launcher; 1 Twin Assault Cannon; 1 Typhoon Missile Launcher.",
    "options": [
      "This model can be equipped with up to 2 Hurricane Bolters",
      "This model's Typhoon Missile Launcher can be replaced with one of the following: 1 Twin Heavy Bolter, 1 Twin Multi-melta",
      "This model's Twin Assault Cannon can be replaced with one of the following: 1 Twin Heavy Plasma Cannon, 1 Twin Lascannon"
    ],
    "transport": "This model has a transport capacity of 12 Adeptus Astartes Infantry models. And 1 Dreadnought models. Each Jump Pack, Wulfen, Gravis, Terminator model takes up the space of 2 models. Each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base",
    "legends": true
  },
  {
    "id": "stormtalon-gunship",
    "name": "Stormtalon Gunship",
    "points": [
      {
        "models": 1,
        "points": 165
      }
    ],
    "flavor": "Fast and manoeuvrable, the Stormtalon is an aerial interceptor optimised for escorting Stormraven Gunships. While fast enough to engage in aerial combat, its pilot can switch on the Stormtalon’s repulsor systems, making it agile enough to closely support infantry in defence or on the attack.",
    "profiles": [
      {
        "name": "Stormtalon Gunship",
        "m": "-",
        "t": "8",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Skyhammer Missile Launcher",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin Assault Cannon",
        "tags": [
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
        "name": "Typhoon Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Typhoon Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
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
    "core": "Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Strafing Run",
        "text": "This unit's ranged attacks that target a NON-FLY unit have +1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Stormtalon Gunship model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Skyhammer Missile Launcher; 1 Twin Assault Cannon.",
    "options": [
      "This model's Skyhammer Missile Launcher can be replaced with one of the following: 1 Twin Heavy Bolter, 1 Twin Lascannon, 1 Typhoon Missile Launcher"
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base",
    "legends": true
  },
  {
    "id": "suboden-khan",
    "name": "Suboden Khan",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "A true son of Chogoris, Suboden Khan commands the White Scars First Brotherhood from the saddle of his grav bike, Thunder. A master of cavalry warfare, he leads his forces in epic hunts and sweeping advances, smashing through enemy lines and ruthlessly running down fleeing foes.",
    "profiles": [
      {
        "name": "Suboden Khan",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2",
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
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "2+",
        "s": "5",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Power Sword",
        "tags": [
          "EXTRA ATTACKS",
          "SUSTAINED HITS 1: NON-MONSTER/VEHICLE"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Stormtooth",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+",
          "LANCE"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Transhuman Strategist, Combat Doctrines",
    "abilities": [
      {
        "name": "Spear of Chogoris",
        "text": "▪ This unit’s ranged attacks have [ASSAULT].\n▪ When this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n▪ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, this unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**."
      },
      {
        "name": "Skilled Riders",
        "text": "This unit has MOBILE."
      }
    ],
    "composition": [
      "1 Suboden Khan model"
    ],
    "loadout": "**This model is equipped with:** 1 Heavy Bolt Pistol; 1 Onslaught Gatling Cannon; 1 Power Sword; 1 Stormtooth.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "White Scars"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "tarantula-air-defence-battery",
    "name": "Tarantula Air Defence Battery",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "profiles": [
      {
        "name": "Tarantula Air Defence Battery",
        "m": "-",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Tarantula Air Defence Missiles",
        "tags": [
          "ANTI-FLY 2+",
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Sentry Programming (Once per phase, per unit)",
        "text": "You can target this unit with the **Fire Overwatch stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
      }
    ],
    "composition": [
      "1 Tarantula Air Defence Battery model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Tarantula Air Defence Missiles.",
    "keywords": [
      "Frame",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "tarantula-sentry-battery",
    "name": "Tarantula Sentry Battery",
    "points": [
      {
        "models": 1,
        "points": 30
      },
      {
        "models": 2,
        "points": 60
      },
      {
        "models": 3,
        "points": 90
      }
    ],
    "flavor": "Tarantula Sentry Guns are automated weapon systems ideally suited to area denial and deterrent roles. Equipped with simple logic engines and fitted with either lascannons or heavy bolters, they can cut down enemy troops or stop armoured vehicles in their tracks, placing minimal demand on their operators’ attention.",
    "profiles": [
      {
        "name": "Tarantula Sentry Battery",
        "m": "-",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Twin Heavy Bolter",
        "tags": [
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
      }
    ],
    "melee": [
      {
        "name": "Armoured Hull",
        "tags": [],
        "a": "1",
        "ws": "6+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Sentinel Protocols (Once per phase, per unit)",
        "text": "When you target this unit with the **Fire Overwatch stratagem**, this unit's **[gloss:snap-shooting:snap shooting]** attacks hit on unmodified **[gloss:hit-roll:hit rolls]** of 4+ until that **[gloss:stratagem:stratagem]** is resolved."
      }
    ],
    "composition": [
      "1-3 Tarantula Sentry Battery models"
    ],
    "loadout": "**Every model is equipped with:** 1 Armoured Hull; 1 Twin Heavy Bolter.",
    "options": [
      "Any number of models can each have their Twin Heavy Bolter replaced with 1 Twin Lascannon."
    ],
    "keywords": [
      "Artillery",
      "Frame",
      "Imperium",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "techmarine",
    "name": "Techmarine",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Techmarines stride selflessly through oncoming fire to soothe the machine spirits of wounded war engines, deftly peeling back damaged armour plates to repair burnt-out cabling and bending warped panels back into shape with their servoarms and mechadendrites.",
    "profiles": [
      {
        "name": "Techmarine",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Forge Bolter",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "2+",
        "s": "2",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Omnissian Power Axe and Servo-arm",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Techmarine",
        "text": "While this model is within 3\" of a friendly ADEPTUS ASTARTES VEHICLE unit, this model has [core:Lone Operative]."
      },
      {
        "name": "Blessings of the Omnissiah",
        "text": "In your Movement phase, at the start or end of this unit’s move, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model:\n▪ That VEHICLE model **[gloss:heal:heals]** D3 wounds.\n▪ That VEHICLE model’s attacks can ignore modifiers to **[gloss:hit-roll:hit rolls]** and **[gloss:wound-roll:wound rolls]** until the start of your next Movement phase."
      }
    ],
    "composition": [
      "1 Techmarine model"
    ],
    "loadout": "**This model is equipped with:** 1 Forge Bolter; 1 Grav-pistol; 1 Omnissian Power Axe and Servo-arm.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Decimus Kill Team",
        "Desolation Squad",
        "Fortis Kill Team",
        "Intercessor Squad",
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
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "terminator-assault-squad",
    "name": "Terminator Assault Squad",
    "points": [
      {
        "models": 5,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 340,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 210,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 380,
        "note": "3rd+"
      }
    ],
    "flavor": "Terminator Assault Squads are armed with devastating close-combat weaponry perfect for ferocious assaults and savage boarding actions. They rush to engage the enemy’s greatest warriors, shredding the foe with lightning claws or shattering their skulls with thunder hammers.",
    "profiles": [
      {
        "name": "Terminator Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Terminator",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Twin Lightning Claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "6",
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
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Teleport Homer (Once per battle, per unit)",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit on the battlefield. If you do:\n▪ When you target this unit with the **Rapid Ingress stratagem**, you can use that Teleport Homer token. If you do, that use is -1 CP, but when resolving that **[gloss:stratagem:stratagem]**, this unit must be set up within 3\" of that Teleport Homer token and not within 8\" of an enemy unit. That Teleport Homer token is then removed from the battlefield.\n▪ If an enemy unit ends a move within 1\" of that Teleport Homer token, that Teleport Homer token is removed from the battlefield."
      },
      {
        "name": "Terminatus Assault",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s:\n▪ Lightning Claws weapons have [SUSTAINED HITS 1: NON-MONSTER/VEHICLE].\n▪ Thunder Hammer weapons have [SUSTAINED HITS 1: MONSTER/VEHICLE]."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has +1 **[gloss:wounds:W]**."
      }
    ],
    "composition": [
      "1 Terminator Sergeant model",
      "4-9 Terminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Twin Lightning Claws.",
    "options": [
      "Any number of models can each have their Twin Lightning Claws replaced with 1 Storm Shield and 1 Thunder Hammer."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "terminator-squad",
    "name": "Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 190,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 380,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 230,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 420,
        "note": "3rd+"
      }
    ],
    "flavor": "Terminator armour is a marvel of technology that enables its wearer to survive anything, from the stresses of teleportation to earth-shaking artillery bombardments. So equipped, Terminator Squads can appear in the midst of the foe or stride unstoppably across the field towards them, firing their weapons all the while.",
    "profiles": [
      {
        "name": "Terminator",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Terminator Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Cyclone Missile Launcher – frag",
        "tags": [
          "BLAST 2"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Cyclone Missile Launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Power Fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Chainfist – hunter (vs MONSTER/VEHICLE)",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Chainfist – standard",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Fury of the First",
        "text": "This unit’s attacks that target a unit within 9\" of this unit have +1 **[gloss:armour-penetration:AP].**"
      },
      {
        "name": "Teleport Homer (Once per battle, per unit)",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit on the battlefield. If you do:\n▪ When you target this unit with the **Rapid Ingress stratagem**, you can use that Teleport Homer token. If you do, that use is -1 CP, but when resolving that **[gloss:stratagem:stratagem]**, this unit must be set up within 3\" of that Teleport Homer token and not within 8\" of an enemy unit. That Teleport Homer token is then removed from the battlefield.\n▪ If an enemy unit ends a move within 1\" of that Teleport Homer token, that Teleport Homer token is removed from the battlefield."
      }
    ],
    "composition": [
      "1 Terminator Sergeant model",
      "4-9 Terminator models"
    ],
    "loadout": "**Every model is equipped with:** 1 Power Fist; 1 Storm Bolter.",
    "options": [
      "The Terminator Sergeant can have their Power Fist replaced with one of the following:\n▪ 1 Chainfist\n▪ 1 Power Weapon",
      "Any number of Terminator models can each have their Power Fist replaced with 1 Chainfist.",
      "For every 5 models in this unit, 1 Terminator model can have their Storm Bolter replaced with one of the following:\n▪ 1 Assault Cannon\n▪ 1 Heavy Flamer\n▪ 1 Cyclone Missile Launcher and 1 Storm Bolter (that model’s Storm Bolter cannot be replaced)."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "terrax-pattern-termite",
    "name": "Terrax-pattern Termite",
    "points": [
      {
        "models": 1,
        "points": 200
      }
    ],
    "flavor": "Originally designed on Terra for the task of rooting out burrowing xenos species during the Great Crusade, canny commanders quickly found use for the Termite Assault Drill in tearing through the foundations of enemy bastions or emerging behind barricades or trench lines to lay waste to their defenders.",
    "profiles": [
      {
        "name": "Terrax-pattern Termite",
        "m": "8\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Combi-weapon – damnatus",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
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
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Terrax Melta Cutter",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D3+2"
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Twin Volkite Charger",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Termite Drill",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "14",
        "ap": "-2",
        "d": "D3+3"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Damaged 5",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Termite Assault",
        "text": "▪ This unit must start the battle in **[gloss:strategic-reserves:strategic reserves]**.\n▪ In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**.\n▪ When this unit is set up, all units embarked within this unit must make a **[gloss:disembark:disembark]/[gloss:assault-disembark-move:assault disembark move]** (pg 157), and those units must be set up more than 8\" away from all enemy units."
      }
    ],
    "composition": [
      "1 Terrax-pattern Termite model"
    ],
    "loadout": "**This model is equipped with:** 2 Combi-weapon - Damnatus; 1 Termite Drill; 1 Terrax Melta Cutter.",
    "options": [
      "This model's 2 Combi-weapons can be replaced with one of the following: 2 Heavy Flamers, 2 Twin Volkite Chargers"
    ],
    "transport": "This model has a transport capacity of 12 Adeptus Astartes Infantry models. It cannot transport Gravis, Jump Pack, Terminator or Centurion models.",
    "keywords": [
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "thunderhawk-gunship",
    "name": "Thunderhawk Gunship",
    "points": [
      {
        "models": 1,
        "points": 850,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 950,
        "note": "2nd+"
      }
    ],
    "flavor": "Thunderhawk Gunships have served the Space Marines with distinction since the Great Crusade, combining the roles of orbital troop lander, heavy gunship and medium bomber. Thunderhawks are formidably armed for their size, with a main gun derived from frigate-class warships and a host of additional weapons.",
    "profiles": [
      {
        "name": "Thunderhawk Gunship",
        "m": "14\"",
        "t": "12",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Hellstrike Missile Battery",
        "tags": [
          "ANTI-FLY 4+"
        ],
        "range": "72\"",
        "a": "4",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Thunderhawk Heavy Cannon",
        "tags": [
          "BLAST 2"
        ],
        "range": "48\"",
        "a": "10",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
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
        "name": "Turbo-laser Destructor",
        "tags": [
          "BLAST 2"
        ],
        "range": "96\"",
        "a": "3",
        "bs": "3+",
        "s": "20",
        "ap": "-4",
        "d": "D6+6"
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
    "core": "Damaged 10, Deadly Demise D6+2, Hover",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Thunderhawk Cluster Bombs",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal]/[gloss:advance-move:advance move]**, you can select one enemy unit this unit moved over during that move and roll six D6:\n▪ For each 3+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]**."
      },
      {
        "name": "Aerial Assault",
        "text": "In your Movement phase, when this unit ends a **[gloss:normal-move:normal move]**, units embarked within this unit can make an **[gloss:assault-disembark-move:assault disembark move]**, provided every model in the embarked unit has Deep Strike."
      }
    ],
    "composition": [
      "1 Thunderhawk Gunship model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Hellstrike Missile Battery; 2 Lascannon; 1 Thunderhawk Heavy Cannon; 4 Twin Heavy Bolter.",
    "options": [
      "This model's Thunderhawk Heavy Cannon can be replaced with 1 Turbo-laser Destructor.",
      "This model’s Thunderhawk cluster bombs can be replaced with 1 hellstrike missile battery."
    ],
    "transport": "This model has a transport capacity of 30 Adeptus Astartes Infantry models. Or Adeptus Astartes Mounted models. Each Jump Pack, Gravis, Terminator model takes up the space of 2 models. Each Adeptus Astartes Mounted model takes up the space of 4 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Titanic",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Unique"
  },
  {
    "id": "tor-garadon",
    "name": "Tor Garadon",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Shot after shot bounces from the indomitable plate of Tor Garadon’s Gravis armour as he advances across the battlefield. Sharp-minded and possessing a knack for improvised warfare, Garadon directs the lethal fire of his warriors through a combination of natural skill and the advanced targeting data fed to him by his signum array.",
    "profiles": [
      {
        "name": "Tor Garadon",
        "m": "5\"",
        "t": "6",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Artificer Grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
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
        "name": "Hand of Defiance",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Siege Captain",
        "text": "This model’s attacks that target a FORTIFICATION/MONSTER/VEHICLE unit have +2 **[gloss:strength:S]**, **[gloss:armour-penetration:AP]** and **[gloss:damage-roll:D]**."
      },
      {
        "name": "Signum Array",
        "text": "In your Shooting phase, you can select one **[gloss:visible:visible]** enemy unit within 18\" of this unit. That enemy unit cannot have the **[gloss:benefit-of-cover:benefit of cover]**."
      }
    ],
    "composition": [
      "1 Tor Garadon model"
    ],
    "loadout": "**This model is equipped with:** 1 Artificer Grav-gun; 1 Hand of Defiance.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad with heavy bolters",
        "Eradicator Squad with melta rifles",
        "Heavy Intercessor Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Gravis",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Imperial Fists"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "typhon",
    "name": "Typhon",
    "points": [
      {
        "models": 1,
        "points": 320
      }
    ],
    "flavor": "Prior to the creation of the Typhon, the dreadhammer siege cannon had only been utilised on static super-heavy ordnance used to pound cities to dust. Mounting this mighty weapon on a tank created a mobile and heavily armoured fortress-breaker that remains unmatched by any other relics in Space Marine armouries.",
    "profiles": [
      {
        "name": "Typhon",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "18",
        "ld": "6+",
        "oc": "6"
      }
    ],
    "ranged": [
      {
        "name": "Heavy Bolter",
        "tags": [
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Dreadhammer Siege Cannon",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Heavy Flamer",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Damaged 6",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Sunderer of Fortresses",
        "text": "This unit's ranged attacks that:\n▪ Target a VEHICLE unit have +1 **[gloss:strength:S]** and **[gloss:damage-roll:D]**.\n▪ Target a FORTIFICATION unit have +2 **S** and **D**."
      }
    ],
    "composition": [
      "1 Typhon model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Dreadhammer Siege Cannon.",
    "options": [
      "This model can be equipped with one of the following: 2 Heavy Bolters, 2 Lascannons",
      "This model can be equipped with one of the following: 1 Heavy Bolter, 1 Heavy Flamer, 1 Multi-melta, 1 Storm Bolter"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "vanguard-veteran-squad",
    "name": "Vanguard Veteran Squad",
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
    "profiles": [
      {
        "name": "Vanguard Veteran",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Vanguard Veteran Sergeant",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "CLOSE-QUARTERS"
        ],
        "range": "12\"",
        "a": "2",
        "bs": "3+",
        "s": "2",
        "ap": "-1",
        "d": "3"
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
          "MELTA 2"
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
      }
    ],
    "melee": [
      {
        "name": "Heirloom Weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Vanguard Assault",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit's melee attacks have [LETHAL HITS]."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "This model has a 4+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Vanguard Veteran Sergeant model",
      "4-9 Vanguard Veteran models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Heirloom Weapon.",
    "options": [
      "Any number of models can each have their Bolt Pistol replaced with 1 Storm Shield",
      "Any number of models can each have their Bolt Pistol replaced with one of the following: 1 Grav-pistol, 1 Hand Flamer, 1 Inferno Pistol, 1 Plasma Pistol"
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm",
    "legends": true
  },
  {
    "id": "vanguard-veteran-squad-with-jump-packs",
    "name": "Vanguard Veteran Squad with Jump Packs",
    "points": [
      {
        "models": 5,
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 220,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 240,
        "note": "3rd+"
      }
    ],
    "flavor": "On the battlefield, Vanguard Veteran Squads with jump packs are peerless rapid- response troops as well as line-breakers. With great plumes of fire extending behind them they can arrive at the perfect time and place to ensure the decisiveness of an assault or utterly break an enemy incursion.",
    "profiles": [
      {
        "name": "Vanguard Veteran Sergeant",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
      },
      {
        "name": "Vanguard Veteran",
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
        "name": "Plasma pistol – standard",
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
        "name": "Plasma pistol – supercharge",
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
      }
    ],
    "melee": [
      {
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Blade",
        "tags": [
          "CLEAVE 1",
          "LETHAL HITS: NON-MONSTER/VEHICLE"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
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
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Vanguard Assault",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit’s melee attacks have + 1 **[gloss:attack-dice:A]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Combat Shield",
        "text": "This model has 5+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Vanguard Veteran Sergeant with Jump Pack model",
      "4-9 Vanguard Veteran with Jump Pack models"
    ],
    "loadout": "**The Vanguard Veteran Sergeant with Jump Pack is equipped with:** 1 Heavy Bolt Pistol; 1 Relic Blade.\n**Every Vanguard Veteran with Jump Pack is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.",
    "options": [
      "The Vanguard Veteran Sergeant with Jump Pack can have their Relic Blade replaced with one of the following:\n▪ 1 Power Fist\n▪ 1 Thunder Hammer",
      "The Vanguard Veteran Sergeant with Jump Pack can have their Heavy Bolt Pistol replaced with 1 Plasma Pistol.",
      "All models in this unit can each have their Heavy Bolt Pistol replaced with 1 Combat Shield.",
      "For every 5 models in this unit, up to 2 Vanguard Veteran with Jump Pack models can each have their Heavy Bolt Pistol replaced with 1 Plasma Pistol."
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
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "venerable-dreadnought",
    "name": "Venerable Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 165
      }
    ],
    "profiles": [
      {
        "name": "Venerable Dreadnought",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Assault Cannon",
        "tags": [
          "SUSTAINED HITS 1"
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
        "name": "Dreadnought Inferno Cannon",
        "tags": [
          "BLAST 2",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "7",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Heavy Flamer",
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
        "name": "Heavy Plasma Cannon – standard",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy Plasma Cannon – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
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
        "name": "Twin Autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
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
        "name": "Twin Heavy Flamer",
        "tags": [
          "BLAST 2",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "-",
        "s": "5",
        "ap": "-1",
        "d": "1"
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
        "name": "Missile Launcher – frag",
        "tags": [
          "BLAST 1",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Missile Launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Armoured Feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dreadnought Fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Wisdom of the Ancients",
        "text": "While a friendly ADEPTUS ASTARTES INFANTRY unit is within 6\" of this unit, this unit's attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1."
      }
    ],
    "composition": [
      "1 Venerable Dreadnought model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Feet; 1 Assault Cannon; 1 Dreadnought Fist; 1 Storm Bolter.",
    "options": [
      "This model's Dreadnought Fist and Storm Bolter can be replaced with one of the following: 1 Heavy Flamer and 1 Dreadnought Fist, 1 Missile Launcher, 1 Twin Autocannon",
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 helfrost cannon\n▪ 1 multi-melta",
      "This model's Assault Cannon can be replaced with one of the following: 1 Dreadnought Inferno Cannon, 1 Heavy Plasma Cannon, 1 Multi-melta, 1 Twin Autocannon, 1 Twin Heavy Bolter, 1 Twin Heavy Flamer, 1 Twin Lascannon",
      "This model’s storm bolter can be replaced with 1 heavy flamer.",
      "This model’s assault cannon, storm bolter and Dreadnought combat weapon can be replaced with one of the following:\n▪ 1 Fenrisian great axe, 1 blizzard shield and 1 storm bolter\n▪ 1 Fenrisian great axe, 1 blizzard shield and 1 heavy flamer"
    ],
    "keywords": [
      "Dreadnought",
      "Imperium",
      "Smoke",
      "Vehicle",
      "Walker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "60mm",
    "legends": true
  },
  {
    "id": "victrix-honour-guard",
    "name": "Victrix Honour Guard",
    "points": [
      {
        "models": 3,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 150,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 280,
        "note": "3rd+"
      }
    ],
    "flavor": "Composed of First Company veterans who demonstrate measured statecraft and peerless skill at arms, the Victrix Honour Guard serve as bodyguards for the Chapter’s senior officers. Chosen for their selflessness in battle, the warriors of the Victrix Honour Guard will gladly lay down their lives to protect their charges.",
    "profiles": [
      {
        "name": "Chapter Champion",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Chapter Ancient",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Victrix Honour Guard",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Master-crafted Bolt Carbine",
        "tags": [
          "ASSAULT",
          "RAPID FIRE 1"
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
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Blades of Honour",
        "tags": [
          "PRECISION",
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Glory of Ultramar",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was **[gloss:destroyed:destroyed]** by those attacks, this unit can make a **[gloss:surge-move:surge move]** of up to D6\"."
      },
      {
        "name": "Honour Guard of Macragge",
        "text": "Attacks that target this unit have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Banner of Macragge",
        "text": "▪ At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**.\n▪ (Once per battle, per army) When this unit is **[gloss:selected-to-fight:selected to fight]**, you can use this ability. If you do, this unit’s melee attacks have +1 **[gloss:attack-dice:A]** and **[gloss:strength:S]**."
      }
    ],
    "composition": [
      "0-1 Chapter Ancient model",
      "0-1 Chapter Champion model",
      "1-6 Victrix Honour Guard models"
    ],
    "loadout": "**The Chapter Ancient is equipped with:** Banner of Macragge; 1 Master-crafted Bolt Carbine; 1 Master-crafted Power Weapon.\n**The Chapter Champion is equipped with:** 1 Blades of Honour.\n**Every Victrix Honour Guard is equipped with:** 1 Master-crafted Bolt Carbine; 1 Master-crafted Power Weapon.",
    "keywords": [
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "vindicator",
    "name": "Vindicator",
    "points": [
      {
        "models": 1,
        "points": 185,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 200,
        "note": "3rd+"
      }
    ],
    "flavor": "The Vindicator is a dedicated siege tank. It can smash obstacles aside with its massive shield, rumbling into the perfect firing position to unleash its demolisher cannon, a weapon so destructive it can blow apart enemy fortifications, annihilate columns of infantry and shatter armoured tanks with terrifying ease.",
    "profiles": [
      {
        "name": "Vindicator",
        "m": "9\"",
        "t": "11",
        "sv": "2+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Demolisher Cannon",
        "tags": [
          "BLAST 1"
        ],
        "range": "24\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "4"
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
    "core": "Damaged 4, Deadly Demise D3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Siege Shield",
        "text": "In your Shooting phase, when this unit is **[gloss:selected-to-shoot:selected to shoot]** using **[gloss:close-quarters:close-quarters shooting]**:\n▪ This unit's attacks that target a unit **[gloss:engaged:engaged]** with this unit can ignore modifiers to:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Hit rolls]**.\n▪ For each of this unit's [BLAST] weapons, you can choose for that weapon to not have [BLAST]:\n▪ If you do, that weapon can only target an enemy unit that is not **engaged** with another friendly unit."
      }
    ],
    "composition": [
      "1 Vindicator model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Demolisher Cannon.",
    "options": [
      "This model can be equipped with 1 Hunter-killer Missile",
      "This model can be equipped with 1 Storm Bolter"
    ],
    "keywords": [
      "Frame",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  },
  {
    "id": "vulkan-hestan",
    "name": "Vulkan He’stan",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Striding into battle with the weapons of his Primarch in his hands, the Forgefather lays low all who oppose him. Seeker of the lost relics of Vulkan, He’stan is relentless in his quest, willing to fight through any foe and face down any danger in order to see his oaths fulfilled.",
    "profiles": [
      {
        "name": "Vulkan He'stan",
        "m": "6\"",
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
      },
      {
        "name": "Gauntlet of the Forge",
        "tags": [
          "CLOSE-QUARTERS",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "-",
        "s": "6",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Spear of Vulkan",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader, Feel No Pain 6+",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Seeker of the Unfound",
        "text": "The first time this model is set up on the battlefield, select one objective on the battlefield. While this model is within range of that **[gloss:objective:objective]**, this model has:\n▪ 10 **[gloss:objective-control:OC]**.\n▪ 5+ **[gloss:leadership:Ld]**.\n▪ [core:Feel No Pain 4+]."
      },
      {
        "name": "Forgefather",
        "text": "In your Shooting phase, select one **[gloss:visible:visible]** enemy unit within 24\" of this model. Friendly ADEPTUS ASTARTES units’ [MELTA]/[TORRENT] attacks that target that enemy unit have +2 **[gloss:strength:S]**."
      }
    ],
    "composition": [
      "1 Vulkan He’stan model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Gauntlet of the Forge; 1 Spear of Vulkan.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Eradicator Squad with melta rifles",
        "Infernus Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Character",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Salamanders"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wardens-of-ultramar",
    "name": "Wardens of Ultramar",
    "points": [
      {
        "models": 6,
        "points": 115
      }
    ],
    "flavor": "Though usually seeded through the leadership strata of Captain Titus’ armies, his closest counsellors and comrades fight by his side as one when the situation demands. At such times they combine transhuman might, inspirational magnificence, martial excellence, psychic might and sheer cunning in a potent alloy greater than the sum of its parts.",
    "profiles": [
      {
        "name": "Veteran Sergeant Metaurus",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Ancient Gadriel",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Gaius Silva",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      },
      {
        "name": "Dainal Komelius",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      },
      {
        "name": "Aemelia Minervas",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
      },
      {
        "name": "Lucia Vestha",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "5+"
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
        "name": "Astropathic Blast",
        "tags": [
          "BLAST 1",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
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
        "name": "Archeotech Laspistol",
        "tags": [
          "CLOSE-QUARTERS"
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
        "name": "Master-crafted Power Weapon",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Force Stave",
        "tags": [
          "PSYCHIC"
        ],
        "a": "1",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Ceramite Fists",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Ultramarian Combat Weapons",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Raise the Banner",
        "text": "At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**."
      },
      {
        "name": "Strategium Command",
        "text": "When both players have deployed their armies, you can redeploy up to three friendly ADEPTUS ASTARTES units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
      }
    ],
    "composition": [
      "1 Aemelia Minervas model",
      "1 Ancient Gadriel model",
      "1 Dainal Kornelius model",
      "1 Gaius Silva model",
      "1 Lucia Vestha model",
      "1 Veteran Sergeant Metaurus model"
    ],
    "loadout": "**Aemelia Minervas is equipped with:** 1 Archeotech Laspistol; 1 Power Weapon.\n**Ancient Gadriel is equipped with:** 1 Bolt Rifle; 1 Ceramite Fists.\n**Dainal Kornelius is equipped with:** 1 Astropathic Blast; 1 Force Stave.\n**Gaius Silva is equipped with:** 1 Archeotech Laspistol; 1 Power Weapon.\n**Lucia Vestha is equipped with:** 1 Archeotech Laspistol; 1 Ultramarian Combat Weapons.\n**Veteran Sergeant Metaurus is equipped with:** 1 Heavy Bolt Pistol; 1 Master-crafted Power Weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "28.5mm, 40mm"
  },
  {
    "id": "whirlwind",
    "name": "Whirlwind",
    "points": [
      {
        "models": 1,
        "points": 175,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 195,
        "note": "2nd+"
      }
    ],
    "flavor": "Hails of missiles saturate the ground whenever a Whirlwind strikes, creating a carpet of explosions that launches deadly shrapnel or scorching flames in all directions. The Whirlwind fires from concealed positions in support of Space Marine attacks, utilising its speed to keep pace with the assault.",
    "profiles": [
      {
        "name": "Whirlwind",
        "m": "10\"",
        "t": "10",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Whirlwind Vengeance Launcher",
        "tags": [
          "BLAST 2",
          "INDIRECT FIRE"
        ],
        "range": "72\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Punishing Bombardment",
        "text": "In your Shooting phase, when this unit has shot, select one enemy INFANTRY unit hit by Whirlwind Vengeance Launcher attacks. That enemy unit makes a **[gloss:battle-shock-test:battle-shock roll]**."
      }
    ],
    "composition": [
      "1 Whirlwind model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Tracks; 1 Whirlwind Vengeance Launcher.",
    "options": [
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
      "Adeptus Astartes"
    ],
    "baseSize": "Hull",
    "legends": true
  }
]
