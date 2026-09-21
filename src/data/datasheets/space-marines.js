// Space Marines — datasheets. Unit roster and points from src/data/mfm/space-marines.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "adrax-agatone",
    "name": "Adrax Agatone",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "The Salamanders’ 3rd Company Captain is a tightly focused force of destruction, striking hard and true in battle without tiring. Prodigiously strong, he wields his mighty thunder hammer expertly, striking down foes with every swing. Those enemies Agatone does not slay in this way he purges with furious blasts from his hand-flamer, Drakkis.",
    "profiles": [
      {
        "name": "Adrax Agatone",
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
        "name": "Drakkis",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Malleus Noctum",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Unto the Anvil",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, you can re-roll the Wound roll."
      },
      {
        "name": "Lord of the Pyroclasts",
        "text": "While an enemy unit is within Engagement Range of this model, halve the Objective Control characteristic of models in that enemy unit."
      }
    ],
    "composition": [
      "1 Adrax Agatone – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Drakkis; Malleus Noctum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
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
      "Captain",
      "Imperium",
      "Adrax Agatone",
      "Tacticus"
    ],
    "factionKeywords": [
      "Salamanders",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "aethon-shaan",
    "name": "Aethon Shaan",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "As the Chapter Master of the Raven Guard, Aethon Shaan embodies the most patient and cunning aspects of his Primarch’s legacy. When he does choose to strike from the shadows he does so with sudden cold fury, bursting forth with the lightning-wreathed Claws of Severax flashing amidst gouts of enemy blood.",
    "profiles": [
      {
        "name": "",
        "m": "14\"",
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
      }
    ],
    "melee": [
      {
        "name": "Claws of Severax",
        "tags": [
          "SUSTAINED HITS 2",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Master of Shadows",
        "text": "In your Command phase, you can select one unit from your opponent’s army. Until the start of your next Command phase, each time an ADEPTUS ASTARTES unit from your army declares a charge while it is within 12\" of that enemy unit, you can re-roll the Charge roll, but it must declare that enemy unit as a target of that charge (if possible)."
      },
      {
        "name": "Blackwing Mantle",
        "text": "You can target this unit with the Rapid Ingress/Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "specialAbilities": [
      {
        "name": "CHAPTER MASTER OF THE RAVEN GUARD",
        "text": "At the start of the Declare Battle Formations step, if your army includes AETHON SHAAN and Kayvaan Shrike, until the end of the battle, your KAYVAAN SHRIKE unit loses its Lone Operative ability and it replaces its CHAPTER MASTER keyword with CAPTAIN."
      }
    ],
    "composition": [
      "1 Aethon Shaan – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 heavy bolt pistol; 1 Claws of Severax.",
    "keywords": [
      "Epic Hero",
      "Character",
      "Infantry",
      "Chapter Master",
      "Aethon Shaan",
      "Tacticus",
      "Imperium",
      "Jump Pack",
      "Fly"
    ],
    "factionKeywords": [
      "Raven Guard",
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "aggressor-squad",
    "name": "Aggressor Squad",
    "points": [
      {
        "models": 3,
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 165,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 175,
        "note": "3rd+"
      }
    ],
    "flavor": "Capable of spearheading devastating offensives or shattering the most determined enemy assaults, Aggressors are walking ceramite strongpoints. They excel at close-quarters combat and laying down torrents of devastating fire before crushing their foes beneath their energised fists.",
    "profiles": [
      {
        "name": "Aggressor Squad",
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
      }
    ],
    "melee": [
      {
        "name": "Twin power fists",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Close-quarters Firepower",
        "text": "Each time a model in this unit makes a ranged attack that targets the closest eligible target, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "composition": [
      "1 Aggressor Sergeant",
      "2-5 Aggressors"
    ],
    "loadout": "**Every model is equipped with:** flamestorm gauntlets; twin power fists.",
    "options": [
      "All models in this unit can each have their flamestorm gauntlets replaced with 1 auto boltstorm gauntlets and 1 fragstorm grenade launcher."
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Gravis",
      "Aggressor Squad"
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
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Astartes Banner",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Unbreakable Duty",
        "text": "While this model is within range of an objective marker and/or within 6\" of the centre of the battlefield, this model has the Feel No Pain 4+ ability."
      }
    ],
    "composition": [
      "1 Ancient"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; bolt rifle; close combat weapon.",
    "options": [
      "This model’s bolt rifle and close combat weapon can be replaced with 1 power weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Devastator Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Long Fangs",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Tacticus",
      "Grenades",
      "Infantry",
      "Ancient"
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
        "points": 65
      }
    ],
    "flavor": "Carrying the Space Marines’ sacred banners is a most vital task. Symbols of the Chapter’s might, Space Marines will gladly die to preserve them. This makes Ancients frequent targets. Clad in Terminator armour, they are near impervious to enemy fire, ensuring the standard always flies proud.",
    "profiles": [
      {
        "name": "Ancient in Terminator Armour",
        "m": "5\"",
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
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
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
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Astartes Banner",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Keep the Banner High",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll if that unit is below its Starting Strength, and add 1 to the Wound roll as well if that unit is Below Half-strength."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Terminator Storm Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Ancient in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; power fist.",
    "options": [
      "This model’s power fist can be replaced with one of the following:\n▪ 1 chainfist\n▪ 1 close combat weapon\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "This model’s storm bolter and power fist can be replaced with one of the following:\n▪ 1 twin lightning claws\n▪ 1 thunder hammer and 1 Terminator storm shield"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Command Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Imperium",
      "Terminator",
      "Character",
      "Ancient"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ancient-on-bike",
    "name": "Ancient on Bike",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "profiles": [
      {
        "name": "Ancient on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
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
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Astartes Banner",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Unbreakable Duty",
        "text": "While this model is within range of an objective marker and/or within 6\" of the centre of the battlefield, this model has the Feel No Pain 4+ ability."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Ancient on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; Astartes chainsword.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Ancient"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "apothecary",
    "name": "Apothecary",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "In addition to battlefield surgery, it is the Apothecary’s duty to recover the gene-seed of the fallen, and thus preserve the Chapter for later generations. For this task the Apothecary is equipped to bring peace to those too wounded to save, and efficiently extract their.precious progenoid glands.",
    "profiles": [
      {
        "name": "Apothecary",
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
      },
      {
        "name": "Reductor pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "3\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-4",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Narthecium",
        "text": "While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to that unit."
      },
      {
        "name": "Gene-seed Recovery",
        "text": "When this model’s Bodyguard unit is destroyed, roll one D6: on a 2+, you gain 1CP"
      }
    ],
    "composition": [
      "1 Apothecary"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; reductor pistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Devastator Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Tacticus",
      "Apothecary",
      "Infantry",
      "Character",
      "Grenades",
      "Imperium"
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
        "points": 70
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
        "oc": "3"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Surgical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Vivispectrum",
        "text": "If this model’s unit destroys an enemy unit as the result of a melee attack, until the end of the battle, this model has an Objective Control characteristic of 9."
      }
    ],
    "composition": [
      "1 Apothecary Biologis"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Eradicator Squad",
        "Indomitor Kill Team",
        "Aggressor Squad",
        "Heavy Intercessor Squad"
      ]
    },
    "keywords": [
      "Apothecary",
      "Infantry",
      "Character",
      "Imperium",
      "Gravis",
      "Biologis"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "apothecary-on-bike",
    "name": "Apothecary on Bike",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "profiles": [
      {
        "name": "Apothecary on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Narthecium",
        "text": "While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to that unit."
      },
      {
        "name": "Gene-seed Recovery",
        "text": "When this model’s Bodyguard unit is destroyed, roll one D6: on a 2+, you gain 1CP."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Apothecary on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; Astartes chainsword.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Apothecary"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "assault-intercessor-squad",
    "name": "Assault Intercessor Squad",
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
    "flavor": "Assault Intercessors are amongst the most widespread close support units in a Chapter’s arsenal. Firing their heavy bolt pistols as they close upon the foe, they charge into the fray, where they make short work of their enemies with brutal swings of their chainswords.",
    "profiles": [
      {
        "name": "Assault Intercessor Squad",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Targeted Intercession",
        "text": "Each time a model in this unit targets an enemy unit with a melee attack, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead."
      }
    ],
    "composition": [
      "1 Assault Intercessor Sergeant",
      "4-9 Assault Intercessors"
    ],
    "loadout": "**Every model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "The Assault Intercessor Sergeant’s heavy bolt pistol can be replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 plasma pistol",
      "The Assault Intercessor Sergeant’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer"
    ],
    "keywords": [
      "Tacticus",
      "Grenades",
      "Infantry",
      "Imperium",
      "Assault Intercessor Squad",
      "Battleline"
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
    "flavor": "Thanks to their powerful jump packs, these warriors soar over the battlefield, slamming into the foe and cutting them down with point-blank bolt pistol fire and furious chainsword hacks before shooting off to their next target.",
    "profiles": [
      {
        "name": "Assault Intercessors with Jump Packs",
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
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
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hammer of Wrath",
        "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in this unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "composition": [
      "1 Assault Intercessor Sergeant with Jump Pack",
      "4-9 Assault Intercessors with Jump Packs"
    ],
    "loadout": "**Each model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "For every 5 models in this unit, 1 Assault Intercessor with Jump Pack’s heavy bolt pistol can be replaced with 1 plasma pistol.",
      "The Assault Intercessor Sergeant with Jump Pack’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power weapon\n▪ 1 power fist",
      "The Assault Intercessor Sergeant with Jump Pack’s heavy bolt pistol can be replaced with one of the following:\n▪ 1 hand flamer\n▪ 1 plasma pistol"
    ],
    "keywords": [
      "Assault Intercessors with Jump Packs",
      "Infantry",
      "Jump Pack",
      "Grenades",
      "Tacticus",
      "Imperium",
      "Fly"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "assault-squad",
    "name": "Assault Squad",
    "points": [
      {
        "models": 5,
        "points": 95
      },
      {
        "models": 10,
        "points": 190
      }
    ],
    "profiles": [
      {
        "name": "Assault Squad",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hand flamer",
        "tags": [
          "IGNORES COVER",
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
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
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
      },
      {
        "name": "Twin lightning claws",
        "tags": [
          "TWIN-LINKED"
        ],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Chainsword Doctrines",
        "text": "Each time this unit is selected to fight, select one of the following abilities to apply to all Astartes chainswords equipped by models in this unit until the end of the phase:\n▪ [SUSTAINED HITS 1]\n▪ [LETHAL HITS]\n▪ [LANCE]"
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to an Assault Intercessor Squad, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Assault Sergeant",
      "4-9 Assault Marines"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Assault Sergeant’s bolt pistol can be replaced with one of the following:\n▪ 1 grav-pistol*\n▪ 1 hand flamer*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol",
      "The Assault Sergeant’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "The Assault Sergeant can do one of the following:\n▪ Replace its bolt pistol and Astartes chainsword with 1 twin lightning claws.\n▪ Be equipped with 1 Astartes shield.",
      "Up to 2 Assault Marines can each have their bolt pistol and Astartes chainsword replaced with one of the following:\n▪ 1 plasma pistol and 1 Astartes chainsword\n▪ 1 flamer and 1 close combat weapon\n▪ 1 meltagun and 1 close combat weapon\n▪ 1 plasma gun and 1 close combat weapon",
      "For every 5 models in this unit, 1 model’s Astartes chainsword can be replaced with 1 eviscerator.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Assault Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "assault-squad-with-jump-packs",
    "name": "Assault Squad with Jump Packs",
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
    "profiles": [
      {
        "name": "Assault Squad with Jump Packs",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hand flamer",
        "tags": [
          "IGNORES COVER",
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
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
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
      },
      {
        "name": "Twin lightning claws",
        "tags": [
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hammer of Wrath",
        "text": "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to Assault Intercessors with Jump Packs, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Assault Sergeant with Jump Pack",
      "4-9 Assault Marines with Jump Packs"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Assault Sergeant with Jump Pack’s bolt pistol can be replaced with one of the following:\n▪ 1 grav-pistol*\n▪ 1 hand flamer*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol",
      "The Assault Sergeant with Jump Pack’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "The Assault Sergeant with Jump Pack can do one of the following:\n▪ Replace its bolt pistol and Astartes chainsword with 1 twin lightning claws.\n▪ Be equipped with 1 Astartes shield.",
      "Up to 2 Assault Marines with Jump Packs can each have their bolt pistol and Astartes chainsword replaced with one of the following:\n▪ 1 plasma pistol and 1 Astartes chainsword\n▪ 1 flamer and 1 close combat weapon\n▪ 1 meltagun and 1 close combat weapon\n▪ 1 plasma gun and 1 close combat weapon",
      "For every 5 models in this unit, 1 model’s Astartes chainsword can be replaced with 1 eviscerator.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Jump Pack",
      "Fly",
      "Imperium",
      "Assault Squad with Jump Packs"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "astartes-servitors",
    "name": "Astartes Servitors",
    "points": [
      {
        "models": 4,
        "points": 55
      }
    ],
    "profiles": [
      {
        "name": "Astartes Servitors",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "1",
        "ld": "8+",
        "oc": "0",
        "inv": "6+"
      }
    ],
    "ranged": [
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
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "3",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Servitor servo-arm",
        "tags": [],
        "a": "1",
        "ws": "5+",
        "s": "6",
        "ap": "-2",
        "d": "3"
      }
    ],
    "abilities": [
      {
        "name": "Mindlock",
        "text": "While a TECHMARINE model is leading this unit, improve the Ballistic Skill and Weapon Skill characteristics of ranged and melee weapons equipped by Astartes Servitor models in this unit by 1."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "SERVITOR RETINUE",
        "text": "At the start of the Declare Battle Formations step, this unit can join one other unit from your army that is being led by a TECHMARINE. If it does, until the end of the battle, every model in this unit counts as being part of that Bodyguard unit, and that Bodyguard unit’s Starting Strength is increased accordingly."
      }
    ],
    "composition": [
      "4 Astartes Servitors"
    ],
    "loadout": "**Every model is equipped with:** Servitor servo-arm.",
    "options": [
      "Up to 2 models can each have their Servitor servo-arm replaced with one of the following:\n▪ 1 heavy bolter and 1 close combat weapon\n▪ 1 multi-melta and 1 close combat weapon\n▪ 1 plasma cannon and 1 close combat weapon"
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Astartes Servitors"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "astraeus",
    "name": "Astraeus",
    "points": [
      {
        "models": 1,
        "points": 525,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 575,
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
        "invNote": "*This model has a 5+ invulnerable save against ranged attacks."
      }
    ],
    "ranged": [
      {
        "name": "Astraeus las-ripper",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Plasma eradicator – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma eradicator – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
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
      },
      {
        "name": "Twin macro-accelerator cannon",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "range": "72\"",
        "a": "12",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Suppression Fire",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more attacks made with its twin macro-accelerator cannon this phase. Until the start of your next turn, while this model is on the battlefield, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-8 wounds remaining",
      "text": "While this model has 1-8 wounds remaining, subtract 4 from its Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Astraeus"
    ],
    "loadout": "**This model is equipped with:** 2 Astraeus las-rippers; ironhail heavy stubber; storm bolter; twin heavy bolter; twin macro-accelerator cannon; armoured hull.",
    "options": [
      "This model’s 2 Astraeus las-rippers can be replaced with 2 plasma eradicators.",
      "This model’s twin heavy bolter can be replaced with 1 twin lascannon.",
      "This model can be equipped with 1 ironhail heavy stubber."
    ],
    "keywords": [
      "Astraeus",
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
    "id": "attack-bike-squad",
    "name": "Attack Bike Squad",
    "points": [
      {
        "models": 1,
        "points": 55
      },
      {
        "models": 2,
        "points": 110
      },
      {
        "models": 3,
        "points": 165
      }
    ],
    "profiles": [
      {
        "name": "Attack Bike Squad",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Outrider Escort",
        "text": "Once per turn, in your opponent’s Shooting phase, when a friendly ADEPTUS ASTARTES MOUNTED unit within 6\" of this unit is selected as the target of an attack, this unit can use this ability. If it does, after that enemy unit has finished making its attacks, this unit can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target)."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1-3 Attack Bikes"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; heavy bolter; twin boltgun; close combat weapon.",
    "options": [
      "Any number of models can each have their heavy bolter replaced with 1 multi-melta."
    ],
    "keywords": [
      "Mounted",
      "Grenades",
      "Imperium",
      "Attack Bike Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "points": 160,
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
        "name": "Ballistus missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Ballistus missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Ballistus lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Twin storm bolter",
        "tags": [
          "RAPID FIRE 2",
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
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "7",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Ballistus Strike",
        "text": "Each time this model makes a ranged attack that targets a unit that is not Below Half-strength, you can re-roll the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Ballistus Dreadnought"
    ],
    "loadout": "**This model is equipped with:** Ballistus missile launcher; Ballistus lascannon; twin storm bolter; armoured feet.",
    "keywords": [
      "Ballistus Dreadnought",
      "Walker",
      "Vehicle",
      "Dreadnought",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90mm"
  },
  {
    "id": "bike-squad",
    "name": "Bike Squad",
    "points": [
      {
        "models": 1,
        "points": 55
      },
      {
        "models": 3,
        "points": 80
      },
      {
        "models": 6,
        "points": 160
      }
    ],
    "profiles": [
      {
        "name": "Space Marine Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      },
      {
        "name": "Attack Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
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
      },
      {
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "3",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Turbo-boost",
        "text": "Each time this unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of models in this unit."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to an Outrider Squad, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Biker Sergeant",
      "2-5 Space Marine Bikers",
      "0-1 Attack Bike"
    ],
    "loadout": "**The Biker Sergeant and every Space Marine Biker is equipped with:** bolt pistol; twin boltgun; close combat weapon.\n\n**An Attack Bike is equipped with:** bolt pistol; heavy bolter; twin boltgun; close combat weapon.",
    "options": [
      "The Biker Sergeant’s bolt pistol can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 boltgun*\n▪ 1 combi-weapon*\n▪ 1 hand flamer\n▪ 1 grav-pistol\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "Any number of Space Marine Bikers can each have their bolt pistol replaced with 1 Astartes chainsword.",
      "Up to 2 Space Marine Bikers can each have their bolt pistol replaced with one of the following:\n▪ 1 flamer*\n▪ 1 grav-gun*\n▪ 1 meltagun*\n▪ 1 plasma gun*\n▪ 1 plasma pistol",
      "An Attack Bike’s heavy bolter can be replaced with 1 multi-melta.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Mounted",
      "Grenades",
      "Imperium",
      "Bike Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "bladeguard-ancient",
    "name": "Bladeguard Ancient",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Bladeguard Ancients bear the honour of carrying their Chapter’s precious standards into battle. The most revered of these incorporate the remains of fallen heroes of the Chapter; in their presence, battle-brothers are inspired to emulate the legendary deeds of these paragons of old.",
    "profiles": [
      {
        "name": "Bladeguard Ancient",
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
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Astartes Banner",
        "text": "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit."
      },
      {
        "name": "Deeds of Heroism",
        "text": "Once per battle, when this model is selected to fight, it can use this ability. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in this model’s unit."
      }
    ],
    "composition": [
      "1 Bladeguard Ancient"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; close combat weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bladeguard Veteran Squad"
      ]
    },
    "keywords": [
      "Tacticus",
      "Imperium",
      "Grenades",
      "Infantry",
      "Character",
      "Bladeguard Ancient",
      "Ancient"
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
        "points": 80,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 90,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 170,
        "note": "3rd+"
      }
    ],
    "flavor": "Bladeguard Veterans are inexorable warriors, advancing relentlessly with blades held high – the very image of noble knights of myth. Members of their Chapter’s elite 1st Company of Veterans, each of these vastly experienced Space Marines has fought to preserve the Imperium across uncounted worlds.",
    "profiles": [
      {
        "name": "Bladeguard Veteran Squad",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
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
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Neo-volkite pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
        "ap": "0",
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
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Bladeguard",
        "text": "Once per turn, per unit. In the Fight phase, when this unit is selected to fight or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit’s melee attacks have +1 to hit rolls.\n▪ Or: Attacks that target this unit have -1 to hit rolls."
      }
    ],
    "composition": [
      "1 Bladeguard Veteran Sergeant",
      "2-5 Bladeguard Veterans"
    ],
    "loadout": "**Every model is equipped with:** heavy bolt pistol; master-crafted power weapon.",
    "options": [
      "The Bladeguard Veteran Sergeant’s heavy bolt pistol can be replaced with one of the following:\n▪ 1 neo-volkite pistol\n▪ 1 plasma pistol"
    ],
    "keywords": [
      "Tacticus",
      "Bladeguard Veteran Squad",
      "Grenades",
      "Infantry",
      "Imperium"
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
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "The Brutalis Dreadnought is a line-breaker and a terror weapon. As it storms towards the enemy lines it lays down a hail of anti-personnel fire. Yet the greatest threat lies in its massive ceramite-sheathed fists or talons, which can crush an armoured warrior like spoiled fruit or punch through a bunker wall like parchment.",
    "profiles": [
      {
        "name": "Brutalis Dreadnought",
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
        "name": "Brutalis bolt rifles",
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
        "name": "Brutalis fists",
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
        "name": "Brutalis talons – strike",
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
        "name": "Brutalis talons – sweep",
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Brutalis Charge",
        "text": "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Brutalis Dreadnought"
    ],
    "loadout": "**This model is equipped with:** twin Icarus ironhail heavy stubber; twin heavy bolter; Brutalis bolt rifles; Brutalis fists.",
    "options": [
      "This model’s twin heavy bolter can be replaced with 1 twin multi-melta.",
      "This model’s Brutalis fists and Brutalis bolt rifles can be replaced with 1 Brutalis talons."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Brutalis Dreadnought"
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
        "points": 90
      }
    ],
    "flavor": "Iron Captain of Clan Company Avernii, Caanok Var is a consummate leader and warrior champion. Whilst in command, he demonstrates a cold and calculating precision, yet a burning rage remains, and in battle he crushes the enemy with punishing blows from his power maul, Axiom.",
    "profiles": [
      {
        "name": "Captain",
        "m": "5\"",
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
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Axiom – strike",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Axiom – sweep",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Feel No Pain 5+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Cold and Calculating",
        "text": "Each time a model in this model’s unit makes an attack that targets a MONSTER or VEHICLE unit, that attack has the [LETHAL HITS] ability. Each time a model in this model’s unit makes an attack that targets any other unit, that attack has the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Cerebrex Logic Engine",
        "text": "▪ At the start of the Declare Battle Formations step, you can select one ADEPTUS ASTARTES INFANTRY unit from your army. Until the end of the battle, that unit gains the Scouts 6\" ability.\n▪ After both players have deployed their armies, you can select one ADEPTUS ASTARTES unit from your army and redeploy it. When doing so, you can set that unit up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Caanok Var – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 storm bolter; 1 Axiom",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Character",
      "Captain",
      "Caanok Var",
      "Infantry",
      "Imperium",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Iron Hands"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "caestus-assault-ram",
    "name": "Caestus Assault Ram",
    "points": [
      {
        "models": 1,
        "points": 215
      }
    ],
    "profiles": [
      {
        "name": "Caestus Assault Ram",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Firefury missile batteries",
        "tags": [
          "BLAST",
          "IGNORES COVER"
        ],
        "range": "36\"",
        "a": "2D6",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin magna-melta",
        "tags": [
          "MELTA 4",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [
          "LANCE"
        ],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Into the Foe",
        "text": "If a unit disembarks from this TRANSPORT before it moves, until the end of the turn, that unit is eligible to charge in a turn in which it Advanced."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Caestus Assault Ram"
    ],
    "loadout": "**This model is equipped with:** firefury missile batteries; twin magna-melta; armoured hull.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Aircraft",
      "Transport",
      "Fly",
      "Imperium",
      "Caestus Assault Ram"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "captain",
    "name": "Captain",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Leading strikeforces ofSpace Marinesfrom thefront lines, Captains exemplify the strength and skill of the warriors under their command. They are paragons of strategic genius with centuries ofbattlefield experience, and their great deeds are often rewarded with ancient artefacts drawnfrom the Chapter’s vaults.",
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
        "name": "Master-crafted bolter",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Neo-volkite pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "0",
        "d": "2"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
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
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Finest Hour",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, add 3 to the Attacks characteristic of melee weapons equipped by this model and those weapons have the [DEVASTATING WOUNDS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Captain"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted bolter; close combat weapon.",
    "options": [
      "This model’s bolt pistol, master-crafted bolter and close combat weapon can be replaced with one of the following:\n▪ 1 heavy bolt pistol and 1 power fist\n▪ 1 heavy bolt pistol and 1 master-crafted power weapon\n▪ 1 neo-volkite pistol and 1 power fist\n▪ 1 neo-volkite pistol and 1 master-crafted power weapon\n▪ 1 plasma pistol and 1 power fist\n▪ 1 plasma pistol and 1 master-crafted power weapon\n▪ 1 heavy bolt pistol, 1 master-crafted power weapon and 1 relic shield",
      "This model’s close combat weapon can be replaced with one of the following:\n▪ 1 master-crafted power weapon\n▪ 1 power fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Victrix Honour Guard",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Captain"
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
        "points": 80
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
        "name": "Boltstorm gauntlet",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "3",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted heavy bolt rifle",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
        "range": "30\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "3"
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
        "name": "Relic blade",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic chainsword",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Relic fist",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Refuse to Yield",
        "text": "Each time an attack is allocated to this model, halve the Damage characteristic of that attack."
      }
    ],
    "composition": [
      "1 Captain in Gravis Armour"
    ],
    "loadout": "**This model is equipped with:** master-crafted heavy bolt rifle; master-crafted power weapon.",
    "options": [
      "This model’s master-crafted heavy bolt rifle and master-crafted power weapon can be replaced with:\n▪ 1 boltstorm gauntlet, 1 power fist and 1 relic chainsword\n▪ 1 boltstorm gauntlet, 1 power fist and 1 relic blade\n▪ 1 boltstorm gauntlet, 1 power fist and 1 relic fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Indomitor Kill Team",
        "Heavy Intercessor Squad",
        "Eradicator Squad",
        "Aggressor Squad"
      ]
    },
    "keywords": [
      "Character",
      "Grenades",
      "Imperium",
      "Gravis",
      "Captain",
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
        "points": 70
      }
    ],
    "flavor": "All Primaris Space Marines are trained in reconnaissance, stealth and sabotage while in the 10th Company. Donning his Phobos armour, a Captain will combine these skills with his incredible martial prowess and hard-won strategic expertise to lead strike forces of Vanguard warriors on dangerous covert missions.",
    "profiles": [
      {
        "name": "Captain in Phobos Armour",
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
        "name": "Combat knife",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Leader, Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Master of Deceit",
        "text": "After both players have deployed their armies, if your army includes one or more models with this ability, you can select up to three friendly ADEPTUS ASTARTES INFANTRY units and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "composition": [
      "1 Captain in Phobos Armour"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; instigator bolt carbine; combat knife.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Eliminator Squad",
        "Hounds Of Morkai",
        "Incursor Squad",
        "Infiltrator Squad",
        "Reiver Squad",
        "Scout Squad",
        "Spectrus Kill Team"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Phobos",
      "Captain"
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
        "points": 85
      }
    ],
    "flavor": "Space Marine Captains are expected to fight from the front, and few kinds of armour enable them to do so as effectively as Terminator plate. Formidably resilient, such a suit protects the Captain against all but the most devastating enemy fire and enables him to deploy by teleport strike right into the heart of the foe.",
    "profiles": [
      {
        "name": "Captain in Terminator Armour",
        "m": "5\"",
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
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
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
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Relic fist",
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
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      },
      {
        "name": "Unstoppable Valour",
        "text": "You can re-roll Charge rolls made for this model’s unit."
      }
    ],
    "composition": [
      "1 Captain in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; relic weapon.",
    "options": [
      "This model’s storm bolter can be replaced with 1 combi-weapon",
      "This model’s relic weapon can be replaced with 1 relic fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Command Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Imperium",
      "Terminator",
      "Captain"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "captain-on-bike",
    "name": "Captain on Bike",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "profiles": [
      {
        "name": "Captain on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
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
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "bs": "2+",
        "s": "8",
        "ap": "-4",
        "d": "D3"
      },
      {
        "name": "Master-crafted boltgun",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "2"
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
      },
      {
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "2+",
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
        "a": "7",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "0",
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
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
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
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Swift Assault",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability."
      },
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can be targeted by a Stratagem for 0CP, even if another unit from your army has already been targeted by that Stratagem this phase."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 7."
      }
    ],
    "composition": [
      "1 Captain on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; Astartes chainsword.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 combi-weapon**\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter**\n▪ 1 relic shield*\n▪ 1 relic weapon\n▪ 1 power fist\n▪ 1 thunder hammer",
      "This model’s Astartes chainsword can be replaced with one of the following:\n▪ 1 close combat weapon and 1 relic shield*\n▪ 1 power fist\n▪ 1 relic weapon",
      "This model’s bolt pistol and Astartes chainsword can be replaced with 1 twin lightning claws.\n* Maximum one per model.\n** The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Captain"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "captain-titus",
    "name": "Captain Titus",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "A relentless champion of Ultramar with a will of unyielding adamant, Captain Demetrian Titus has won countless battles against seemingly impossible odds. While possessed of lauded command abilities, Titus is truly at home in the press of battle where he fights relentlessly and refuses to yield even to grievous wounds.",
    "profiles": [
      {
        "name": "Captain Titus",
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
      },
      {
        "name": "Master-crafted bolter",
        "tags": [
          "ASSAULT",
          "HEAVY"
        ],
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
        "name": "Master-crafted chainsword",
        "tags": [
          "ANTI-INFANTRY 2+"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Press the Attack",
        "text": "Weapons equipped by models in this model’s unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Honour of Ultramar",
        "text": "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 2+, do not remove it from play. This model can fight after the attacking unit has finished making its attacks. If one or more enemy models are destroyed as a result of those attacks, this model regains D3 lost wounds and is not destroyed; otherwise, it is removed from play."
      }
    ],
    "specialAbilities": [
      {
        "name": "DEMETRIAN TITUS",
        "text": "Your army cannot include more than one Titus unit."
      }
    ],
    "composition": [
      "1 Captain Titus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted bolter; master-crafted chainsword.",
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
        "Vanguard Veteran Squad",
        "Victrix Honour Guard",
        "Wardens of Ultramar"
      ]
    },
    "keywords": [
      "Titus",
      "Captain",
      "Grenades",
      "Tacticus",
      "Imperium",
      "Epic Hero",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Ultramarines",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "captain-with-jump-pack",
    "name": "Captain with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Many a Space Marine Captain favours fury and speed, and devises ingenious strategies to use these to devastating effect against their enemies. Being superlative warriors and inspiring leaders, they have no place but at the very forefront of battle. With a jump pack, Captains can lead their warriors as speartips for their assaults.",
    "profiles": [
      {
        "name": "Captain with Jump Pack",
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
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Angel’s Wrath",
        "text": "While this model is leading a unit, each time that unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in that unit."
      },
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can use it when it is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Captain with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "This model’s heavy bolt pistol can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 hand flamer",
      "This model’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 relic weapon",
      "This model’s heavy bolt pistol and Astartes chainsword can be replaced with 1 thunder hammer and 1 relic shield.",
      "If this model is equipped with a heavy bolt pistol and an Astartes chainsword, it can be equipped with 1 relic shield. This model’s heavy bolt pistol and Astartes chainsword cannot be replaced."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Assault Squad with Jump Packs",
        "Sanguinary Guard",
        "Skyclaws",
        "Talonstrike Kill Team",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Tacticus",
      "Imperium",
      "Fly",
      "Jump Pack",
      "Character",
      "Infantry",
      "Grenades",
      "Captain"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "carab-culln-the-risen",
    "name": "Carab Culln the Risen",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "profiles": [
      {
        "name": "Carab Culln the Risen",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "4",
        "inv": "5+"
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
      }
    ],
    "melee": [
      {
        "name": "Tarsus Scorpii",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-3",
        "d": "4"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can be targeted by a Stratagem for 0CP, even if another unit from your army has already been targeted by that Stratagem this phase."
      },
      {
        "name": "Death-hold",
        "text": "When making ranged attacks, this model does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Carab Culln the Risen – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; 2 heavy flamers; 3 hunter-killer missiles; twin assault cannon; Tarsus Scorpii.",
    "options": [
      "None"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Smoke",
      "Character",
      "Epic Hero",
      "Dreadnought",
      "Carab Culln the Risen"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "cato-sicarius",
    "name": "Cato Sicarius",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "A noble scion of Talassar, Cato Sicarius is amongst the most accomplished of the Ultramarines champions. As Captain of the Victrix Honour Guard, Sicarius demonstrates superior swordsmanship and is a true master of the lightning assault, deploying his warriors with a decisiveness and speed born of absolute confidence.",
    "profiles": [
      {
        "name": "Cato Sicarius",
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
        "name": "Artisan plasma pistol",
        "tags": [
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
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Knight Champion of Macragge",
        "text": "In your opponent's Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to 6\"."
      },
      {
        "name": "Honour or Death",
        "text": "You can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "composition": [
      "1 Cato Sicarius – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 artisan plasma pistol; 1 Talassarian tempest blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Tacticus",
      "Captain",
      "Sicarius",
      "Cato",
      "Infantry",
      "Character",
      "Epic Hero",
      "Imperium"
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
        "name": "Centurion Assault Squad",
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
        "name": "Centurion bolters",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin meltagun",
        "tags": [
          "MELTA 2",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Siege drills",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Annihilator Protocols",
        "text": "Melee weapons equipped by models in this unit have the [SUSTAINED HITS 2] ability when targeting MONSTER, VEHICLE or FORTIFICATION units."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Centurion Assault Launcher",
        "text": "The bearer has the Grenades keyword."
      }
    ],
    "composition": [
      "1 Assault Centurion Sergeant",
      "2-5 Assault Centurions"
    ],
    "loadout": "**Every model is equipped with:** twin flamer; siege drills; Centurion bolters.",
    "options": [
      "Any number of models can each have their twin flamer replaced with 1 twin meltagun.",
      "Any number of models can each have their Centurion bolters replaced with 1 Centurion assault launcher."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Centurion",
      "Centurion Assault Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
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
        "points": 365
      }
    ],
    "flavor": "Centurion Devastator Squads dominate the field of battle, their presence dictating the flow of action. They frequently operate with Stormraven Gunships, which transport the Space Marines inside their bulky warsuits to the next position, where they function as an armoured firebase to clear enemy-held positions of all opposition.",
    "profiles": [
      {
        "name": "Centurion Devastator Squad",
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
        "name": "Centurion bolters",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Centurion missile launcher",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D3"
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
        "name": "Centurion fists",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Decimator Protocols",
        "text": "Each time a model in this unit makes a ranged attack, re-roll a Hit roll of 1. If the target of that attack is an enemy unit within range of an objective marker, you can re-roll the Hit roll instead."
      }
    ],
    "composition": [
      "1 Devastator Centurion Sergeant",
      "2-5 Devastator Centurions"
    ],
    "loadout": "**Every model is equipped with:** grav-cannon; Centurion bolters; Centurion fists.",
    "options": [
      "Any number of models can each have their Centurion bolters replaced with 1 Centurion missile launcher.",
      "Any number of models can each have their grav-cannon replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon"
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Centurion",
      "Centurion Devastator Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
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
        "name": "Cerberus neutron pulse array",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D6+3"
      },
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Atomantic Arc-reactor",
        "text": "Each time this unit shoots its Cerberus neutron pulse array in your Shooting phase, provided it Remained Stationary this turn, that weapon has the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Cerberus"
    ],
    "loadout": "**This model is equipped with:** Cerberus neutron pulse array; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with one of the following:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter"
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Cerberus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Crozius arcanum",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Spiritual Leader",
        "text": "Once per battle, at the start of any phase, you can select one friendly ADEPTUS ASTARTES unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "composition": [
      "1 Chaplain"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; crozius arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Crusader Squad",
        "Death Company Marines",
        "Death Company Marines with Bolt Rifles",
        "Death Company Marines with Boltguns",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Chaplain",
      "Tacticus",
      "Grenades",
      "Character",
      "Infantry",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaplain-cassius",
    "name": "Chaplain Cassius",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "profiles": [
      {
        "name": "Chaplain Cassius",
        "m": "6\"",
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
        "name": "Infernus",
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
        "name": "Artificer crozius",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Catechism of Death",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Inspired Retribution",
        "text": "While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 4+, do not remove it from play; that destroyed model can fight after the attacking model’s unit has finished making its attacks, and is then removed from play."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Chaplain Cassius – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Infernus; artificer crozius.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Squad",
        "Command Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Tyrannic War Veterans",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Imperium",
      "Chaplain Cassius"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "t": "5",
        "sv": "2+",
        "w": "5",
        "ld": "5+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
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
        "name": "Crozius arcanum",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Recitation of Faith",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against mortal wounds."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Chaplain in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; crozius arcanum.",
    "options": [
      "This model’s storm bolter can be replaced with 1 relic shield."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Command Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Imperium",
      "Character",
      "Terminator",
      "Infantry",
      "Chaplain"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaplain-on-bike",
    "name": "Chaplain on Bike",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "When a Chaplain takes to the field on a Raider-pattern bike, he is able to keep pace with even the swiftest armoured advance or spearhead breakthrough. Fighting in such an action, he will urge his brothers to victory as he bellows his catechisms and charges headlong into the foe, crozius arcanum swinging.",
    "profiles": [
      {
        "name": "Chaplain on Bike",
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
        "name": "Crozius arcanum",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Catechism of Fire",
        "text": "Each time this model’s unit is selected to shoot, you can select one enemy unit within 12\" of and visible to this model. Until the end of the phase, ranged weapons equipped by models in this model’s unit have the [DEVASTATING WOUNDS] ability when targeting that enemy unit."
      }
    ],
    "composition": [
      "1 Chaplain on Bike"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; twin bolt rifle; crozius arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad",
        "Company Veterans On Bikes",
        "Ravenwing Black Knights"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Grenades",
      "Imperium",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "chaplain-venerable-dreadnought",
    "name": "Chaplain Venerable Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "profiles": [
      {
        "name": "Chaplain Venerable Dreadnought",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
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
        "name": "Dreadnought inferno cannon",
        "tags": [
          "IGNORES COVER",
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
        "name": "Heavy plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Spiritual Leader",
        "text": "Once per battle, at the start of any phase, you can select one friendly ADEPTUS ASTARTES unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Chaplain Venerable Dreadnought"
    ],
    "loadout": "**This model is equipped with:** assault cannon; storm bolter; Dreadnought combat weapon.",
    "options": [
      "This model’s storm bolter and Dreadnought combat weapon can be replaced with one of the following:\n▪ 1 heavy flamer and 1 Dreadnought combat weapon\n▪ 1 assault cannon\n▪ 1 Dreadnought inferno cannon\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 twin lascannon",
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 Dreadnought inferno cannon\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 storm bolter and 1 Dreadnought combat weapon\n▪ 1 heavy flamer and 1 Dreadnought combat weapon\n▪ 1 twin lascannon"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Chaplain Venerable Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "5",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Crozius arcanum",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Litany of Hate",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      },
      {
        "name": "Exhortation of Rage",
        "text": "Each time this model’s unit is selected to fight, you can select one enemy unit within Engagement Range of this model’s unit and roll one D6: on a 4-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers 3 mortal wounds."
      }
    ],
    "composition": [
      "1 Chaplain with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; crozius arcanum.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 Absolvor bolt pistol"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Assault Squad with Jump Packs",
        "Death Company Marines with Boltguns and Jump Packs",
        "Death Company Marines with Jump Packs",
        "Skyclaws",
        "Talonstrike Kill Team",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Chaplain",
      "Jump Pack",
      "Fly",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "chief-librarian-tigurius",
    "name": "Chief Librarian Tigurius",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "flavor": "As Tigurius charges into battle, he assails the enemy with a tempest of psychic fury. Blasts of energy leap from his staff, hurling foes through the air and burning their souls to ash. It is the Chief Librarian’s acute foresight that is most valuable to his Chapter – his merest intuition is worth more than the predictions of an army of strategists and spies.",
    "profiles": [
      {
        "name": "Chief Librarian Tigurius",
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
      },
      {
        "name": "Storm of the Emperor’s Wrath – witchfire",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Storm of the Emperor’s Wrath – focused witchfire",
        "tags": [
          "BLAST",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "2D6",
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
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hood of Hellfire",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks and mortal wounds."
      },
      {
        "name": "Master of Prescience (Psychic)",
        "text": "▪ This unit has [core:Stealth].\n▪ Melee attacks that target this unit have -1 to hit rolls.\n▪ (Once per battle round, per army) When you target this unit with the Counteroffensive/Fire Overwatch/Heroic Intervention Stratagem, that use is -1 CP."
      }
    ],
    "composition": [
      "1 Chief Librarian Tigurius – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Storm of the Emperor’s Wrath; Rod of Tigurius.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Desolation Squad",
        "Devastator Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Tacticus",
      "Chief Librarian Tigurius",
      "Imperium",
      "Epic Hero",
      "Character",
      "Infantry",
      "Psyker"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "command-squad",
    "name": "Command Squad",
    "points": [
      {
        "models": 5,
        "points": 165
      }
    ],
    "profiles": [
      {
        "name": "Command Squad",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
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
        "name": "Grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Hand flamer",
        "tags": [
          "IGNORES COVER",
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
        "name": "Lascannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
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
      },
      {
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
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
        "name": "Champion’s blade",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
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
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Narthecium",
        "text": "While this unit contains an Apothecary, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to this unit."
      },
      {
        "name": "Astartes Banner",
        "text": "While this unit contains a Company Ancient, add 1 to the Objective Control characteristic of models in this unit."
      },
      {
        "name": "Honour or Death",
        "text": "While this unit contains a Company Champion, add 1 to Advance and Charge rolls made for this unit. When you target this unit with the Heroic Intervention Stratagem, that use is -1 CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Astartes Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to a Company Heroes unit, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Apothecary",
      "1 Company Ancient",
      "1 Company Champion",
      "2 Company Veterans"
    ],
    "loadout": "**The Apothecary is equipped with:** bolt pistol; Astartes chainsword.\n\n**The Company Ancient is equipped with:** bolt pistol; close combat weapon.\n\n**The Company Champion is equipped with:** bolt pistol; Champion’s blade; Astartes shield.\n\n**Each Company Veteran is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "Any number of models can each have their bolt pistol replaced with one of the following:\n▪ 1 hand flamer*\n▪ 1 grav-pistol*\n▪ 1 inferno pistol*\n▪ 1 plasma pistol*",
      "Any number of Company Veterans can each have their bolt pistol replaced with 1 Astartes shield.",
      "Any number of Company Veterans can each have their bolt pistol and boltgun replaced with 1 twin lightning claws.",
      "The Company Ancient’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon*",
      "Any number of Company Veterans can each have their boltgun replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 Astartes shield\n▪ 1 combi-weapon*\n▪ 1 flamer\n▪ 1 heavy bolter*\n▪ 1 heavy flamer*\n▪ 1 grav-cannon*\n▪ 1 grav-gun\n▪ 1 lascannon*\n▪ 1 meltagun\n▪ 1 missile launcher*\n▪ 1 multi-melta*\n▪ 1 plasma cannon*\n▪ 1 plasma gun\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Command Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "company-champion-on-bike",
    "name": "Company Champion on Bike",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "profiles": [
      {
        "name": "Company Champion on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
        "ld": "6+",
        "oc": "2",
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
        "name": "Master-crafted power weapon",
        "tags": [
          "PRECISION"
        ],
        "a": "4",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Honour or Death",
        "text": "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit. When you target this unit with the Heroic Intervention Stratagem, that use is -1 CP."
      },
      {
        "name": "Martial Superiority",
        "text": "Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Company Champion on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; master-crafted power weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Company Champion"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "company-heroes",
    "name": "Company Heroes",
    "points": [
      {
        "models": 4,
        "points": 105
      }
    ],
    "flavor": "A company’s most heroic battle-brothers fight alongside a Chapter’s high-ranking officers. These veterans and specialists serve as honour guards and provide vital support to a commander. Company Champions defend their Company’s honour with martial excellence, Ancients guard its inspirational banners and Company Veterans lay down hails o ffire from relic bolt weapons.",
    "profiles": [
      {
        "name": "Company Heroes",
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
        "name": "Bolt Pistol",
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
        "name": "Master-crafted bolt rifle",
        "tags": [
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Master-crafted heavy bolter",
        "tags": [
          "HEAVY",
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Master-crafted power weapon",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Astartes Banner",
        "text": "While this unit contains an Ancient, add 1 to the Objective Control characteristic of models in this unit."
      },
      {
        "name": "Command Squad",
        "text": "While a CHARACTER model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll."
      }
    ],
    "composition": [
      "1 Ancient",
      "1 Company Champion",
      "2 Company Veterans"
    ],
    "loadout": "**The Ancient is equipped with:** bolt pistol; bolt rifle; close combat weapon.\n\n**The Company Champion is equipped with:** bolt pistol; master-crafted power weapon.\n\n**One Company Veteran is equipped with:** bolt pistol; master-crafted heavy bolter; close combat weapon.\n\n**One Company Veteran is equipped with:** bolt pistol; master-crafted bolt rifle; close combat weapon.",
    "keywords": [
      "Company Heroes",
      "Imperium",
      "Ancient",
      "Tacticus",
      "Infantry",
      "Grenades"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "COMPANY HEROES",
        "text": "You must attach one CAPTAIN or CHAPTER MASTER model to this unit. If this is not possible, this unit does not take part in the battle and counts as having been destroyed."
      }
    ]
  },
  {
    "id": "company-veterans-on-bikes",
    "name": "Company Veterans on Bikes",
    "points": [
      {
        "models": 2,
        "points": 110
      },
      {
        "models": 5,
        "points": 275
      }
    ],
    "profiles": [
      {
        "name": "Company Veterans on Bikes",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "2",
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
        "name": "Grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
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
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Vanguard Assault",
        "text": "Each time this unit ends a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "rules": [
      {
        "name": "COMMAND SQUAD BODYGUARD",
        "text": "If a model from your army with the Leader ability can be attached to a Bike Squad, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Veteran Biker Sergeant",
      "1-4 Veteran Bikers"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; twin boltgun; Astartes chainsword.",
    "options": [
      "The Veteran Biker Sergeant’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 storm bolter",
      "The Veteran Biker Sergeant’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "Any number of Veteran Bikers’ bolt pistols can each be replaced with one of the following:\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield",
      "Any number of Veteran Bikers’ Astartes chainswords can each be replaced with one of the following:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 grav-pistol\n▪ 1 meltagun\n▪ 1 plasma gun*\n▪ 1 plasma pistol*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Mounted",
      "Imperium",
      "Grenades",
      "Company Veterans"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "darnath-lysander",
    "name": "Darnath Lysander",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Raising high his storm shield, Rampart, as he swings the Fist of Dorn, Lysander wades through his foes like a warship smashing through stormy seas. Each hammer blow reduces enemies to bloody ruin, sweeping whole ranks of warriors from their feet. All the while, Lysander’s obstinate scowl never wavers, his determination absolute.",
    "profiles": [
      {
        "name": "Darnath Lysander",
        "m": "5\"",
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
        "name": "Fist of Dorn",
        "tags": [
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in TERMINATOR ASSAULT SQUAD and TERMINATOR SQUAD units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      },
      {
        "name": "Icon of Obstinacy",
        "text": "Each time an attack targets this model’s unit, if the Strength characteristic of that attack is greater than or equal to the Toughness characteristic of that unit, subtract 1 from the Wound roll."
      },
      {
        "name": "Rampart",
        "text": "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, this model has a 2+ invulnerable save."
      }
    ],
    "specialAbilities": [
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Terminator Assault Squad and Terminator Squad units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Darnath Lysander – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 Fist of Dorn.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Darnath Lysander",
      "Terminator",
      "Captain",
      "Imperium",
      "Infantry",
      "Epic Hero",
      "Character"
    ],
    "factionKeywords": [
      "Imperial Fists",
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "deathstorm-drop-pod",
    "name": "Deathstorm Drop Pod",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "Deathstorm Drop Pods act as a battlefield delivery method not for troops or vehicles, but instead for automated weapons systems such as Whirlwind missile launchers or assault cannons. Once in place, these potent weapons unleash a massive volley of firepower, clearing the way for a full-scale ground assault.",
    "profiles": [
      {
        "name": "Deathstorm Drop Pod",
        "m": "-",
        "t": "7",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Deathstorm cannon array",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "18\"",
        "a": "12",
        "bs": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Deathstorm missile array",
        "tags": [
          "BLAST"
        ],
        "range": "18\"",
        "a": "2D6",
        "bs": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Deathstorm Assault",
        "text": "This model must start the battle in Reserves, but it is not counted towards any limits placed on the maximum number of Reserves units you can start the battle with. This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Deathstorm Drop Pod"
    ],
    "loadout": "**This model is equipped with:** deathstorm cannon array.",
    "options": [
      "This model’s deathstorm cannon array can be replaced with 1 deathstorm missile array."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Deathstorm Drop Pod"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "deimos-predator",
    "name": "Deimos Predator",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "profiles": [
      {
        "name": "Deimos Predator",
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
        "name": "Conversion beam cannon",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "3"
      },
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
        "name": "Infernus cannon",
        "tags": [
          "IGNORES COVER",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Magna-melta cannon",
        "tags": [
          "MELTA 4"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma destroyer – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma destroyer – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "3"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Armoured Spearhead",
        "text": "Each time this model makes an attack that targets an enemy unit, re-roll a Hit roll of 1 and, if that unit is within range of an objective marker you do not control, you can re-roll the Hit roll instead."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Conversion",
        "text": "Each time an attack is made with this weapon, if the target is more than 12\" from the bearer, an unmodified successful Hit roll of 4+ scores a Critical Hit."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Deimos Predator"
    ],
    "loadout": "**This model is equipped with:** plasma destroyer; armoured tracks.",
    "options": [
      "This model’s plasma destroyer can be replaced with one of the following:\n▪ 1 conversion beam cannon\n▪ 1 infernus cannon\n▪ 1 magna-melta cannon",
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 heavy flamers*\n▪ 2 lascannons\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card.",
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Frame",
      "Imperium",
      "Deimos Predator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "deredeo-dreadnought",
    "name": "Deredeo Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "While the Deredeo Dreadnought shares many core systems with the famed Contemptor class, it was expressly designed as a heavy weapons platform, combining superior firepower with the flexibility of a walker. Now rare, Deredeos are treasured assets whose survivability and killing power have proved decisive on countless battlefields.",
    "profiles": [
      {
        "name": "Deredeo Dreadnought",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Aiolos missile launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Anvilus autocannon battery",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Arachnus heavy lascannon battery",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Boreas air defence missiles",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Hellfire plasma cannonade – standard",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Hellfire plasma cannonade – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Volkite falconet battery",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "30\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Deredeo Strike",
        "text": "Each time this model makes a ranged attack that targets a unit that is not Below Half-strength, you can re-roll the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Deredeo Dreadnought"
    ],
    "loadout": "**This model is equipped with:** anvilus autocannon battery; twin heavy bolter; armoured feet.",
    "options": [
      "This model’s anvilus autocannon battery can be replaced with one of the following:\n▪ 1 arachnus heavy lascannon battery\n▪ 1 hellfire plasma cannonade\n▪ 1 volkite falconet battery",
      "This model’s twin heavy bolter can be replaced with 1 twin heavy flamer.",
      "This model can be equipped with one of the following:\n▪ 1 aiolos missile launcher\n▪ 1 boreas air defence missiles"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Smoke",
      "Dreadnought",
      "Deredeo Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "desolation-squad",
    "name": "Desolation Squad",
    "points": [
      {
        "models": 5,
        "points": 180,
        "note": "1st"
      },
      {
        "models": 5,
        "points": 210,
        "note": "2nd+"
      }
    ],
    "flavor": "Desolation Marines specialise in unleashing widespread devastation throughout the enemy ranks. Whether direct-firing warheads into massed infantry or enemy armour, or raining salvoes down upon the enemy with their castellan launchers, these warriors reap a grievous toll amongst the foe.",
    "profiles": [
      {
        "name": "Desolation Squad",
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
        "name": "Castellan launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Superfrag rocket launcher",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6+1",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Superkrak rocket launcher",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Vengor launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "2+",
        "s": "7",
        "ap": "-1",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Targeter Optics",
        "text": "Each time this unit Remains Stationary, until the start of your next Movement phase, ranged weapons equipped by models in this unit have the [IGNORES COVER] ability."
      }
    ],
    "composition": [
      "1 Desolation Sergeant",
      "4 Desolation Marines"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; castellan launcher; superfrag rocket launcher; close combat weapon.",
    "options": [
      "All of the models in this unit can each have their superfrag rocket launcher replaced with 1 superkrak rocket launcher.",
      "The Desolation Sergeant’s superfrag rocket launcher or superkrak rocket launcher can be replaced with 1 vengor launcher."
    ],
    "keywords": [
      "Grenades",
      "Infantry",
      "Desolation Squad",
      "Tacticus",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "devastator-squad",
    "name": "Devastator Squad",
    "points": [
      {
        "models": 5,
        "points": 120
      },
      {
        "models": 10,
        "points": 200
      }
    ],
    "flavor": "Devastator Squads pound the enemy at long range with overwhelming heavy weapons fire, annihilating any caught in the ferocious blasts. Once they have secured the perfect firing position, they hold it firmly, providing their battle-brothers with intense covering fire as they advance.",
    "profiles": [
      {
        "name": "Devastator Squad",
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
        "name": "Grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Lascannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
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
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Signum",
        "text": "Each time this unit Remains Stationary, until the start of your next Movement phase, ranged weapons equipped by models in this unit have the [IGNORES COVER] ability."
      },
      {
        "name": "Armorium Cherub",
        "text": "Once per battle, after making a Hit roll for a model in this unit, you can change that roll to an unmodified 6.\n\n**Designer’s Note:** Place an Armorium Cherub token next to the unit, removing it once this ability has been used."
      }
    ],
    "composition": [
      "1 Devastator Sergeant",
      "4-9 Devastator Marines"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "Up to 4 Devastator Marines can each have their boltgun replaced with one of the following:\n▪ 1 grav-cannon\n▪ 1 heavy bolter\n▪ 1 lascannon\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon",
      "The Devastator Sergeant’s bolt pistol and boltgun can be replaced with two different weapons from the following list:*\n▪ 1 Astartes chainsword\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).",
      "* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol)"
    ],
    "keywords": [
      "Infantry",
      "Devastator Squad",
      "Grenades",
      "Imperium"
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
        "name": "Heavy plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Wisdom of the Ancients (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES INFANTRY unit is within 6\" of this model, each time a model in that unit makes an attack, re-roll a Hit roll of 1."
      }
    ],
    "composition": [
      "1 Dreadnought"
    ],
    "loadout": "**This model is equipped with:** assault cannon; storm bolter; Dreadnought combat weapon.",
    "options": [
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 heavy plasma cannon\n▪ 1 multi-melta\n▪ 1 twin lascannon",
      "This model’s Dreadnought combat weapon and storm bolter can be replaced with one of the following:\n▪ 1 missile launcher and 1 close combat weapon\n▪ 1 heavy flamer and 1 Dreadnought combat weapon"
    ],
    "keywords": [
      "Smoke",
      "Walker",
      "Vehicle",
      "Dreadnought",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "dreadnought-drop-pod",
    "name": "Dreadnought Drop Pod",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Larger and more robust than the infantry equivalents, Dreadnought Drop Pods give Space Marine commanders the option of deploying armoured walkers directly into the theatre of battle. Still hot from its meteoric descent through the atmosphere, a Drop Pod’s ramps slam open to disgorge its deadly cargo into the enemy’s midst.",
    "profiles": [
      {
        "name": "Dreadnought Drop Pod",
        "m": "-",
        "t": "7",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "melee": [],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Drop Pod Assault",
        "text": "This model must start the battle in Reserves, but neither it nor any units embarked within it are counted towards any limits placed on the maximum number of Reserves units you can start the battle with. This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model must immediately disembark after it has been set up on the battlefield, and they must be set up more than 9\" away from all enemy models. After this model has been set up on the battlefield, no units can embark within it."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Dreadnought Drop Pod"
    ],
    "loadout": "**This model is equipped with:** nothing.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 1 DREADNOUGHT model.",
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Transport",
      "Dreadnought Drop Pod"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "oc": "0"
      }
    ],
    "ranged": [],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Drop Pod Assault",
        "text": "This model must start the battle in Reserves and can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model must immediately disembark after it has been set up on the battlefield, and they must be set up more than 8\" away from all enemy models."
      },
      {
        "name": "Combat Disembarkation",
        "text": "Each time a unit disembarks from this model after it has been set up on the battlefield, that unit is still eligible to declare a charge this turn."
      },
      {
        "name": "Deployment Complete",
        "text": "Once this unit is set up on the battlefield and all units within it have disembarked, until the end of the battle, units cannot embark within this TRANSPORT."
      }
    ],
    "composition": [
      "1 Drop Pod"
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport Centurion, Gravis, Jump Pack, Wulfen or Terminator models.",
    "keywords": [
      "Vehicle",
      "Drop Pod",
      "Imperium",
      "Dedicated Transport",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "eliminator-squad",
    "name": "Eliminator Squad",
    "points": [
      {
        "models": 3,
        "points": 75
      }
    ],
    "flavor": "Eliminator Squads are peerless assassins, deadly marksmen who haunt the shadows of the battlefield unseen by the enemy. For hours they will lie in wait to take the perfect shot, their sophisticated scopes feeding them essential data to ensure they never fail to make the kill.",
    "profiles": [
      {
        "name": "Eliminator Squad",
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
        "name": "Instigator bolt carbine",
        "tags": [
          "PRECISION"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "2"
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
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Reposition Under Covering Fire",
        "text": "In your Shooting phase, after this unit has shot, if it contains an Eliminator Sergeant equipped with an instigator bolt carbine, this unit can make a Normal move. If it does so, until the end of the turn, this unit is not eligible to declare a charge."
      },
      {
        "name": "Mark the Target",
        "text": "Each time this unit Remains Stationary, until the start of your next Movement phase, ranged weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability."
      }
    ],
    "composition": [
      "1 Eliminator Sergeant",
      "2 Eliminators"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; bolt sniper rifle; close combat weapon.",
    "options": [
      "The Eliminator Sergeant’s bolt sniper rifle can be replaced with one of the following:\n▪ 1 instigator bolt carbine\n▪ 1 las fusil",
      "All Eliminators in this unit can each have their bolt sniper rifle replaced with 1 las fusil."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Grenades",
      "Eliminator Squad",
      "Phobos"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "eradicator-squad",
    "name": "Eradicator Squad",
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
        "points": 100,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "Before the molten ire of an Eradicator Squad, heavy armour and defended positions stand little chance. Eradicators wear the heavier Gravis-pattern of Mk X power armour, allowing them to stride unharmed through waves of incoming fire before bringing their own destructive weaponry to bear at close range.",
    "profiles": [
      {
        "name": "Eradicator Squad",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Total Obliteration",
        "text": "Each time a ranged attack made by a model in this unit targets a MONSTER or VEHICLE model, you can re-roll the Hit roll, you can re-roll the Wound roll and you can re-roll the Damage roll."
      }
    ],
    "composition": [
      "1 Eradicator Sergeant",
      "2-5 Eradicators"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; melta rifle; close combat weapon.",
    "options": [
      "For every 3 models in this unit, 1 Eradicator’s melta rifle can be replaced with 1 multi-melta."
    ],
    "keywords": [
      "Infantry",
      "Gravis",
      "Eradicator Squad",
      "Imperium",
      "Grenades"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "eradicator-squad-with-heavy-bolters",
    "name": "Eradicator Squad with Heavy Bolters",
    "points": [
      {
        "models": 3,
        "points": 80
      }
    ],
    "flavor": "The heavy Mk X Gravis armour of these fire support specialists allows them to weather storms of incoming projectiles. Standing firm, they return fire with their brutal heavy bolters, scything down enemy infantry and blowing apart the foe's light armoured vehicles with well-placed shots to weak spots in their targets' hulls.",
    "profiles": [
      {
        "name": "Eradicator Squad with Heavy Bolters",
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
        "name": "Heavy bolter",
        "tags": [
          "HEAVY",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Overlapping Detonations",
        "text": "In your Shooting phase, when this unit is selected to shoot you can select one non-MONSTER/VEHICLE enemy unit visible to it. While making attacks, this unit's heavy bolters that targeted that selected unit have [BLAST 1]."
      }
    ],
    "composition": [
      "1 Eradicator Sergeant",
      "2 Eradicators"
    ],
    "loadout": "Every model is equipped with: 1 bolt pistol; 1 heavy bolter; 1 close combat weapon.",
    "keywords": [
      "Infantry",
      "Imperium",
      "Gravis",
      "Eradicator Squad",
      "Eradicator Squad with Heavy Bolters"
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
        "name": "Laser destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Quad lascannon",
        "tags": [],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Twin Falchion volcano cannon",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "120\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "24",
        "ap": "-5",
        "d": "12"
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Titan-killer",
        "text": "Each time this model makes a ranged attack with its twin Falchion volcano cannon that targets a MONSTER or VEHICLE unit, that attack has the [DEVASTATING WOUNDS] ability."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-8 wounds remaining",
      "text": "While this model has 1-8 wounds remaining, subtract 4 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Falchion"
    ],
    "loadout": "**This model is equipped with:** 2 quad lascannons; twin heavy bolter; twin Falchion volcano cannon; armoured tracks.",
    "options": [
      "This model’s 2 quad lascannons can be replaced with 2 laser destroyers.",
      "This model’s twin heavy bolter can be replaced with 1 twin heavy flamer.",
      "This model can be equipped with one of the following:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter"
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Titanic",
      "Imperium",
      "Smoke",
      "Falchion"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "fellblade",
    "name": "Fellblade",
    "points": [
      {
        "models": 1,
        "points": 480
      }
    ],
    "flavor": "Now a rare jewel in loyalist or traitor arsenals, the Fellblade is a legendary war machine equipped with a panoply of weapons all but unknown in the 41st Millennium. Foremost of these is the accelerator cannon, which uses complex vacuum technologies to fire high-velocity shells that few targets can withstand.",
    "profiles": [
      {
        "name": "Fellblade",
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
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Demolisher cannon",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Fellblade accelerator cannon – AP shells",
        "tags": [],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "6"
      },
      {
        "name": "Fellblade accelerator cannon – HE shells",
        "tags": [
          "BLAST"
        ],
        "range": "72\"",
        "a": "2D6",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
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
        "name": "Laser destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Quad heavy bolter",
        "tags": [
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
        "name": "Quad lascannon",
        "tags": [],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6+2",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rolling Fortress",
        "text": "Each time a ranged attack is allocated to a model from your army, if that model is not fully visible to every model in the attacking unit because of this Fellblade model, that model has the Benefit of Cover against that attack."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-8 wounds remaining",
      "text": "While this model has 1-8 wounds remaining, subtract 4 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Fellblade"
    ],
    "loadout": "**This model is equipped with:** demolisher cannon; Fellblade accelerator cannon; 2 quad lascannons; twin heavy bolter; armoured tracks.",
    "options": [
      "This model’s 2 quad lascannons can be replaced with one of the following:\n▪ 2 laser destroyers\n▪ 2 quad heavy bolters",
      "This model’s twin heavy bolter can be replaced with 1 twin heavy flamer.",
      "This model can be equipped with 1 havoc launcher.",
      "This model can be equipped with one of the following:\n▪ 1 combi-weapon*\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Titanic",
      "Imperium",
      "Smoke",
      "Fellblade"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "ferren-areios",
    "name": "Ferren Areios",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Ferren Areios is a formidable battle leader who earned the trust and respect of his Primarch in the bloody fighting of the Indomitus Crusade. Now elevated to the rank of Captain of the 6th Company, he leads his battle-brothers with courage and honour, wading into the thick of the fight with thunder hammer in hand.",
    "profiles": [
      {
        "name": "Ferren Areios",
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
      }
    ],
    "melee": [
      {
        "name": "Relic thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "5",
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
        "name": "Master of Rites",
        "text": "In your Command phase, select one of the following to apply to this model’s unit until the end of the turn:\n▪ This model’s unit is eligible to shoot in a turn in which it Advanced.\n▪ This model’s unit is eligible to declare a charge in a turn in which it Advanced.\n▪ This model’s unit is eligible to shoot and declare a charge in a turn in which it Fell Back."
      },
      {
        "name": "Unrelenting and Uncompromising",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, you can ignore any or all modifiers to that attack’s Ballistic Skill or Weapon Skill characteristics and/or all modifiers to the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Ferren Areios – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** heavy bolt pistol; relic thunder hammer.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Hellblaster Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Imperium",
      "Character",
      "Grenades",
      "Epic Hero",
      "Tacticus",
      "Captain",
      "Ferren Areios"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "fire-raptor-gunship",
    "name": "Fire Raptor Gunship",
    "points": [
      {
        "models": 1,
        "points": 290
      }
    ],
    "flavor": "A variant of the Storm Eagle, the Fire Raptor was created to provide overwhelming aerial firepower to Legiones Astartes assault forces. The craft soon gained renown for the devastating rain of bolts and rockets it could produce, and the few operational specimens that still survive are viewed as invaluable assets.",
    "profiles": [
      {
        "name": "Fire Raptor Gunship",
        "m": "-",
        "t": "10",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Quad heavy bolter",
        "tags": [
          "TWIN-LINKED",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin autocannon",
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
        "name": "Twin avenger bolt cannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "10",
        "bs": "3+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin hellstrike launcher",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6"
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Strafing Run",
        "text": "Each time this model makes a ranged attack that targets a unit that cannot FLY, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Fire Raptor Gunship"
    ],
    "loadout": "**This model is equipped with:** twin avenger bolt cannon; 2 twin autocannons; 2 twin hellstrike launchers; armoured hull.",
    "options": [
      "This model’s 2 twin hellstrike launchers can be replaced with 2 twin lascannons.",
      "This model’s 2 twin autocannons can be replaced with 2 quad heavy bolters."
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Aircraft",
      "Imperium",
      "Fire Raptor Gunship"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "firestrike-servo-turrets",
    "name": "Firestrike Servo-turrets",
    "points": [
      {
        "models": 1,
        "points": 75
      },
      {
        "models": 2,
        "points": 150
      }
    ],
    "flavor": "Primarily a defensive weapon, the Firestrike Servo-turret lays down withering volleys of fire to secure flanks or the Space Marines’ base of operations. Mounted on gravitic ventral plates, they can hover across the battlefield to ideal firing positions from which to slaughter attacking enemies.",
    "profiles": [
      {
        "name": "Firestrike Servo-turrets",
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
        "name": "Twin Firestrike autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "2+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin Firestrike las-talon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sentinel Protocols",
        "text": "Each time you select this unit for the Fire Overwatch Stratagem, hits are scored on unmodified Hit rolls of 4+ when resolving that Stratagem."
      }
    ],
    "composition": [
      "1-2 Firestrike Servo-turrets"
    ],
    "loadout": "**Every model is equipped with:** twin Firestrike las-talon; close combat weapon.",
    "options": [
      "Any number of models can each have their twin Firestrike las-talon replaced with 1 twin Firestrike autocannon."
    ],
    "keywords": [
      "Firestrike Servo-turrets",
      "Imperium",
      "Vehicle",
      "Artillery"
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
        "points": 170,
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
        "name": "Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Lancer laser destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+3"
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
        "name": "Armoured hull",
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
        "name": "Aquilon Optics",
        "text": "Each time this model is selected to shoot, you can re-roll one Hit roll, you can re-roll one Wound roll and you can re-roll one Damage roll when resolving its attacks."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Gladiator Lancer"
    ],
    "loadout": "**This model is equipped with:** Lancer laser destroyer; 2 storm bolters; armoured hull.",
    "options": [
      "This model’s 2 storm bolters can be replaced with 2 fragstorm grenade launchers.",
      "This model can be equipped with 1 ironhail heavy stubber.",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Imperium",
      "Gladiator Lancer",
      "Frame"
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
        "points": 160,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 170,
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
        "name": "Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Tempest bolter",
        "tags": [
          "RAPID FIRE 4"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin heavy onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Reaping Tally",
        "text": "This model’s twin heavy onslaught gatling cannon has the [SUSTAINED HITS 2] ability when targeting INFANTRY units."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Gladiator Reaper"
    ],
    "loadout": "**This model is equipped with:** 2 tempest bolters; twin heavy onslaught gatling cannon; armoured hull.",
    "options": [
      "This model can be equipped with 1 ironhail heavy stubber.",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Vehicle",
      "Imperium",
      "Gladiator Reaper",
      "Smoke",
      "Frame"
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
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 160,
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
        "name": "Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin las-talon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Priority Target Acquisition",
        "text": "Each time this model makes an attack with its twin las-talon that targets the closest eligible MONSTER or VEHICLE unit, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Gladiator Valiant"
    ],
    "loadout": "**This model is equipped with:** 2 multi-meltas; twin las-talon; armoured hull.",
    "options": [
      "This model can be equipped with 1 ironhail heavy stubber.",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Imperium",
      "Vehicle",
      "Gladiator Valiant",
      "Smoke",
      "Frame"
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
        "name": "Hammerfall heavy bolter array",
        "tags": [
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
        "name": "Hammerfall heavy flamer array",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "2D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Hammerfall missile launcher – superfrag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6+2",
        "bs": "4+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hammerfall missile launcher – superkrak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "4+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fortification",
        "text": "While an enemy unit is only within Engagement Range of one or more FORTIFICATIONS from your army:\n▪ That unit can still be selected as the target of ranged attacks, but each time such an attack is made, unless it is made with a Pistol, subtract 1 from the Hit roll.\n▪ Models in that unit do not need to take Desperate Escape tests due to Falling Back while Battle-shocked, except for those that will move over enemy models when doing so."
      },
      {
        "name": "Ceramite Cover",
        "text": "Each time a ranged attack is allocated to a model, if that model is not fully visible to every model in the attacking unit because of this FORTIFICATION, that model has the Benefit of Cover against that attack."
      },
      {
        "name": "Defensive Array",
        "text": "You can target this FORTIFICATION with the Fire Overwatch Stratagem for 0CP, and can do so even if you have already targeted another unit with that Stratagem this turn. This FORTIFICATION can only be targeted with that Stratagem once per turn."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Hammerfall Bunker"
    ],
    "loadout": "**This model is equipped with:** Hammerfall heavy bolter array; Hammerfall missile launcher.",
    "options": [
      "This model’s Hammerfall heavy bolter array can be replaced with 1 Hammerfall heavy flamer array."
    ],
    "keywords": [
      "Hammerfall Bunker",
      "Imperium",
      "Vehicle",
      "Fortification",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "heavy-intercessor-squad",
    "name": "Heavy Intercessor Squad",
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
    "flavor": "Clad in thick Gravis armour, Heavy Intercessors secure ground and are immovable in the defence. Always ready for any sign of enemy counter-attack, they stand firm, laying down volleys of heavy fire that keep all but the most determined or foolhardy enemies at bay.",
    "profiles": [
      {
        "name": "Heavy Intercessor Squad",
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
        "d": "2"
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Unyielding in the Face of the Foe",
        "text": "While this unit is within range of an objective marker you control, each time an attack with a Damage characteristic of 1 is allocated to a model in this unit, add 1 to any armour saving throw made against that attack."
      }
    ],
    "composition": [
      "1 Heavy Intercessor Sergeant",
      "4-9 Heavy Intercessors"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; heavy bolt rifle; close combat weapon.",
    "options": [
      "For every 5 models in this unit, 1 Heavy Intercessor’s heavy bolt rifle can be replaced with 1 heavy bolter."
    ],
    "keywords": [
      "Infantry",
      "Heavy Intercessor Squad",
      "Gravis",
      "Imperium",
      "Grenades",
      "Battleline"
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
        "points": 110
      },
      {
        "models": 10,
        "points": 220
      }
    ],
    "flavor": "Few foes can survive the incandescent fury of a Hellblaster Squad. Whether they be Tyranid Hive Tyrant, Ork Warboss or Heretic Astartes battle tank, all are reduced to ash and slag by searing, well-aimed plasma fire pouring from the Hellblasters’ ferocious weapons.",
    "profiles": [
      {
        "name": "Hellblaster Squad",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "For the Chapter!",
        "text": "Each time a model in this unit is destroyed, roll one D6: on a 3+, do not remove it from play. The destroyed model can shoot after the attacking model’s unit has finished making its attacks, and is then removed from play. When resolving these attacks, any Hazardous tests taken for that attack are automatically passed.\n\n**Designer’s Note:** This ability is triggered even when a model in this unit is destroyed as the result of failing a Hazardous test, meaning such a model may be able to shoot twice in the same phase."
      }
    ],
    "composition": [
      "1 Hellblaster Sergeant",
      "4-9 Hellblasters"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; plasma incinerator; close combat weapon.",
    "options": [
      "The Hellblaster Sergeant’s bolt pistol can be replaced with 1 plasma pistol."
    ],
    "keywords": [
      "Imperium",
      "Tacticus",
      "Hellblaster Squad",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "Hunter",
        "m": "9\"",
        "t": "11",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
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
        "name": "Skyspear missile launcher",
        "tags": [
          "ANTI-FLY 3+",
          "DEVASTATING WOUNDS",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "D6+2"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hunter Missile Targeting",
        "text": "Each time this model makes an attack with its skyspear missile launcher that targets a MONSTER or VEHICLE unit, that attack scores a hit on an unmodified Hit roll of 2+."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Hunter"
    ],
    "loadout": "**This model is equipped with:** skyspear missile launcher; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Frame",
      "Imperium",
      "Hunter"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "imperial-space-marine",
    "name": "Imperial Space Marine",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "profiles": [
      {
        "name": "Imperial Space Marine",
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
        "name": "Disintegration combi-gun",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Disintegration pistol",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "PISTOL"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Swift Assault",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability."
      },
      {
        "name": "Unbreakable Duty",
        "text": "While this model is within range of an objective marker and/or within 6\" of the centre of the battlefield, this model has the Feel No Pain 4+ ability."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "You can attach this model to one of the above units even if one CHARACTER model has already been attached to it. If you do, and that Bodyguard unit is destroyed, the Leader units attached to it become separate units, with their original Starting Strengths."
      }
    ],
    "composition": [
      "1 Imperial Space Marine"
    ],
    "loadout": "**This model is equipped with:** disintegration combi-gun; disintegration pistol; close combat weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Squad",
        "Command Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Devastator Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Imperium",
      "Character",
      "Grenades",
      "Imperial Space Marine"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "name": "Bellicatus missile array – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Bellicatus missile array – Icarus",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Bellicatus missile array – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D6"
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
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Ironhail skytalon array",
        "tags": [
          "ANTI-FLY 4+",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "8",
        "bs": "3+",
        "s": "4",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
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
    "core": "Deadly Demise D3, Firing Deck 6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Vehicle",
        "text": "Units can disembark from this TRANSPORT after it has Advanced. Units that do so count as having made a Normal move, and cannot declare a charge that turn."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Orbital Comms Array (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of the bearer, each time you target that unit with a Stratagem, roll one D6: on a 5+, you gain 1CP."
      },
      {
        "name": "Shield Dome",
        "text": "The bearer has a 5+ invulnerable save."
      }
    ],
    "composition": [
      "1 Impulsor"
    ],
    "loadout": "**This model is equipped with:** 2 storm bolters; armoured hull.",
    "options": [
      "This model can be equipped with 1 ironhail heavy stubber.",
      "This model’s 2 storm bolters can be replaced with 2 fragstorm grenade launchers.",
      "This model can be equipped with one of the following:\n▪ 1 bellicatus missile array\n▪ 1 ironhail skytalon array\n▪ 1 orbital comms array\n▪ 1 shield dome"
    ],
    "transport": "This model has a transport capacity of 7 Tacticus or PHOBOS INFANTRY models. It cannot transport Jump Pack models.",
    "keywords": [
      "Dedicated Transport",
      "Imperium",
      "Vehicle",
      "Transport",
      "Impulsor",
      "Frame"
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
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 140,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 265,
        "note": "3rd+"
      }
    ],
    "flavor": "Equipped with heavy jump packs, Inceptor Squads are superb spearhead troops that deliver overwhelming blows to the enemy. Plummeting to the surface from the very edge of a world’s atmosphere, they strike with devastating force, unleashing a hurricane of fire that turns whole squads of enemy infantry to bloody mist.",
    "profiles": [
      {
        "name": "Inceptor Squad",
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
          "PISTOL",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Meteoric Descent",
        "text": "In your Movement phase, when this unit is set up on the battlefield using the Deep Strike ability, it can perform a meteoric descent. If it does, this unit can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Inceptor Sergeant",
      "2-5 Inceptors"
    ],
    "loadout": "**Every model is equipped with:** assault bolters; close combat weapon.",
    "options": [
      "All models in this unit can each have their assault bolters replaced with 1 plasma exterminators."
    ],
    "keywords": [
      "Fly",
      "Jump Pack",
      "Infantry",
      "Imperium",
      "Gravis",
      "Inceptor Squad"
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
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 150,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 160,
        "note": "3rd+"
      }
    ],
    "flavor": "Aggressive light infantry, Incursors specialise in storming enemy defences and destroying essential assets. With a formidable array of auspexes and sensory equipment, they can see their enemies through walls and predict their movements – and with a burst of carbine fire or knife thrusts, cut them down.",
    "profiles": [
      {
        "name": "Incursor Squad",
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
      }
    ],
    "melee": [
      {
        "name": "Paired combat blades",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Multi-spectrum Array",
        "text": "Each time this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly ADEPTUS ASTARTES unit makes an attack that targets that enemy unit, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Haywire Mine",
        "text": "Once per battle, at the start of any phase, you can select one enemy unit within 3\" of the bearer and roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds, or 2D3 mortal wounds instead if it is a Vehicle unit."
      }
    ],
    "composition": [
      "1 Incursor Sergeant",
      "4-9 Incursors"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; occulus bolt carbine; paired combat blades.",
    "options": [
      "One Incursor can be equipped with 1 haywire mine."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Incursor Squad",
      "Imperium",
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
        "points": 85
      },
      {
        "models": 10,
        "points": 180
      }
    ],
    "flavor": "Infernus Squads purge swathes of the enemy ranks with the incandescent firestorms they unleash from their pyreblasters. They are close assault specialists, sending jets of burning promethium into enemy trench lines and bunkers and through dense ruins and concealing vegetation, ensuring no foe escapes their fiery wrath.",
    "profiles": [
      {
        "name": "Infernus Squad",
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
        "name": "Pyreblaster",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Incendiary Terror",
        "text": "In your Shooting phase, after this unit has shot, you can select one enemy INFANTRY unit hit by one or more of those attacks made with a pyreblaster. That enemy unit must take a Battle-shock test, subtracting 1 from that test."
      }
    ],
    "composition": [
      "1 Infernus Sergeant",
      "4-9 Infernus Marines"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; pyreblaster; close combat weapon.",
    "keywords": [
      "Infernus Squad",
      "Tacticus",
      "Infantry",
      "Imperium",
      "Grenades"
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
        "points": 110,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 180,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 190,
        "note": "3rd+"
      }
    ],
    "flavor": "Infiltrator Squads are experts in covert operations and are drilled extensively in self-sufficiency and survival skills. Equipped with omni-scramblers that cripple enemy communications, they wreak havoc amongst their foes before cutting them down with hails of accurate bolt fire.",
    "profiles": [
      {
        "name": "Infiltrator Squad",
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
      }
    ],
    "core": "Infiltrators",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Omni-scramblers",
        "text": "Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of this unit."
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
      }
    ],
    "composition": [
      "1 Infiltrator Sergeant",
      "4-9 Infiltrators"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; marksman bolt carbine; close combat weapon.",
    "options": [
      "1 Infiltrator can be equipped with 1 helix gauntlet.*",
      "1 Infiltrator can be equipped with 1 Infiltrator comms array.*",
      "* These options cannot be taken on the same model."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Smoke",
      "Imperium",
      "Infiltrator Squad",
      "Phobos"
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
        "points": 80
      },
      {
        "models": 10,
        "points": 150
      }
    ],
    "flavor": "Intercessor Squads are capable of laying down punishing fire while advancing or holding ground against the enemy. They have access to a range of bolt weaponry suited to varied battlefield assignments, from engaging enemies at long range to cleansing bunker complexes.",
    "profiles": [
      {
        "name": "Intercessor Squad",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Objective Secured",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      },
      {
        "name": "Hail of Bolts",
        "text": "In your Shooting phase, when this unit is selected to shoot, select up to one visible enemy unit. While making those attacks, this unit’s Bolt Rifle attacks that targeted that enemy unit have +2 A."
      }
    ],
    "composition": [
      "1 Intercessor Sergeant",
      "4-9 Intercessors"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; bolt rifle; close combat weapon.",
    "options": [
      "The Intercessor Sergeant’s bolt rifle can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 hand flamer\n▪ 1 plasma pistol\n▪ 1 power weapon",
      "The Intercessor Sergeant’s close combat weapon can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "For every 5 models in this unit, 1 model equipped with a bolt rifle can be equipped with 1 Astartes grenade launcher."
    ],
    "keywords": [
      "Battleline",
      "Grenades",
      "Intercessor Squad",
      "Tacticus",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "invader-atv",
    "name": "Invader ATV",
    "points": [
      {
        "models": 1,
        "points": 60
      }
    ],
    "flavor": "The Invader is a highly flexible all-terrain vehicle, perfectly adapted to an aggressive reconnaissance role. Outfitted with either a multi-melta or onslaught gatling cannon, it can rapidly deliver punishing fire against vulnerable parts of the enemy line, or swiftly engage and destroy scouting elements of opposing forces.",
    "profiles": [
      {
        "name": "Invader Atv",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "8",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Outrider Escort",
        "text": "Once per turn, in your opponent’s Shooting phase, when another friendly ADEPTUS ASTARTES MOUNTED unit within 6\" of this model is selected as the target of an attack, one model from your army with this ability can use it. If it does, after that enemy unit has finished making its attacks, that model can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target)."
      }
    ],
    "composition": [
      "1 Invader ATV"
    ],
    "loadout": "**This model is equipped with:** bolt pistol, twin bolt rifle; onslaught gatling cannon; close combat weapon.",
    "options": [
      "This model’s onslaught gatling cannon can be replaced with 1 multi-melta."
    ],
    "keywords": [
      "Frame",
      "Grenades",
      "Imperium",
      "Invader ATV",
      "Mounted"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "invictor-tactical-warsuit",
    "name": "Invictor Tactical Warsuit",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Outfitted with silent reactors and servos, the Invictor Tactical Warsuit is a combat walker ideally suited to supporting Vanguard operations and functioning independently from a main Space Marine strike force. In battle they are piloted by hand-picked warriors dedicated to defending their battle-brothers.",
    "profiles": [
      {
        "name": "Invictor Tactical Warsuit",
        "m": "8\"",
        "t": "8",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "4"
      }
    ],
    "ranged": [
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
        "name": "Incendium cannon",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Twin ironhail autocannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Invictor fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "14",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3, Scouts 8\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Vanguard Support",
        "text": "Once per turn, in your opponent’s Shooting phase, when a friendly ADEPTUS ASTARTES PHOBOS INFANTRY unit within 6\" of this model is selected as the target of an attack, this model can use this ability. If it does, after that enemy model’s unit has finished making its attacks, this model can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target)."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Invictor Tactical Warsuit"
    ],
    "loadout": "**This model is equipped with:** fragstorm grenade launcher; heavy bolter; incendium cannon; twin ironhail heavy stubber; Invictor fist.",
    "options": [
      "This model’s incendium cannon can be replaced with 1 twin ironhail autocannon."
    ],
    "keywords": [
      "Invictor Tactical Warsuit",
      "Phobos",
      "Imperium",
      "Walker",
      "Vehicle"
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
    "flavor": "Malkaan Feirros is amongst the oldest and wisest of the Iron Fathers. Yet his radical beliefs and wry humour leaven his arcane technological pronouncements. He is the Iron Hands Master of the Forge, guiding the Chapter’s battle-brothers and the machine spirits of its war engines to unleash precise destruction.",
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
      },
      {
        "name": "Gorgon’s Wrath",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "5",
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
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in HEAVY INTERCESSOR SQUAD units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked."
      },
      {
        "name": "Rites of Tempering",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability."
      },
      {
        "name": "Iron Father",
        "text": "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES VEHICLE units, it has the Lone Operative ability."
      },
      {
        "name": "Master of the Forge",
        "text": "In your Command phase, select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model. That model regains up to 3 lost wounds and, until the start of your next Command phase, each time that VEHICLE model makes an attack, add 1 to the Hit roll. You cannot select a unit for this ability that has already been selected for the Blessing of the Omnissiah ability this phase, and vice versa."
      }
    ],
    "specialAbilities": [
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Heavy Intercessor Squad units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Iron Father Feirros – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Gorgon’s Wrath; Harrowhand; Medusan manipuli.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad",
        "Heavy Intercessor Squad"
      ]
    },
    "keywords": [
      "Iron Father Feirros",
      "Infantry",
      "Epic Hero",
      "Character",
      "Gravis",
      "Imperium"
    ],
    "factionKeywords": [
      "Iron Hands",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ironclad-dreadnought",
    "name": "Ironclad Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "profiles": [
      {
        "name": "Ironclad Dreadnought",
        "m": "6\"",
        "t": "10",
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
        "name": "Dreadnought chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Seismic hammer",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+2"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Siege-breaker Protocols",
        "text": "Each time this model makes a melee attack that targets a VEHICLE or FORTIFICATION unit, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Ironclad Assault Launchers",
        "text": "The bearer has the GRENADES keyword."
      }
    ],
    "composition": [
      "1 Ironclad Dreadnought"
    ],
    "loadout": "**This model is equipped with:** meltagun; storm bolter; Dreadnought combat weapon; seismic hammer.",
    "options": [
      "This model’s seismic hammer can be replaced with 1 Dreadnought chainfist.",
      "This model’s Dreadnought combat weapon and storm bolter can be replaced with 1 hurricane bolter.",
      "This model’s storm bolter can be replaced with 1 heavy flamer.",
      "This model’s meltagun can be replaced with 1 heavy flamer.",
      "This model can be equipped with up to 2 hunter-killer missiles.",
      "This model can be equipped with 1 Ironclad assault launchers."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Smoke",
      "Imperium",
      "Dreadnought",
      "Ironclad Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "javelin-attack-speeder",
    "name": "Javelin Attack Speeder",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "The Javelin Attack Speeder is a highly durable reconnaissance and strike craft once used widely by the Legiones Astartes, but now almost absent from the war zones of the 41st Millennium. Irreplaceable though they are, Javelins are sometimes entrusted to the very best pilots, who use the vehicles’ extended range to inflict decisive damage behind enemy lines.",
    "profiles": [
      {
        "name": "Javelin Attack Speeder",
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
        "name": "Javelin missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "3D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Javelin missile launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fire and Redeploy",
        "text": "In your Shooting phase, each time this model has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to D6\". If it does, until the end of the turn, this model is not eligible to declare a charge."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Javelin Attack Speeder"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; Javelin missile launcher; close combat weapon.",
    "options": [
      "This model’s Javelin missile launcher can be replaced with 2 lascannons.",
      "This model’s heavy bolter can be replaced with 1 multi-melta.",
      "This model can be equipped with up to 2 hunter-killer missiles."
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Imperium",
      "Javelin Attack Speeder"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "judiciar",
    "name": "Judiciar",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "Sworn to silence, Judiciars do not preach aloud, but instead their deeds are a litany of fury. Wielding a tempormortis in one hand and an immense blade in the other, they must prove their worth in battle to join the Chaplaincy proper, doing so through acts of devotion and the slaying of enemies.",
    "profiles": [
      {
        "name": "Judiciar",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "1",
        "inv": "4+",
        "invNote": "* This model has a 4+ invulnerable save against melee attacks."
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
        "name": "Executioner relic blade",
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
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tempormortis",
        "text": "While this model is leading a unit, that unit has the Fights First ability."
      },
      {
        "name": "Silent Fury",
        "text": "Each time this model destroys an enemy CHARACTER model, until the end of the battle, add 1 to the Attacks characteristic of its executioner relic blade."
      }
    ],
    "composition": [
      "1 Judiciar"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; executioner relic blade.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
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
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Imperium",
      "Character",
      "Infantry",
      "Judiciar",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "kayvaan-shrike",
    "name": "Kayvaan Shrike",
    "points": [
      {
        "models": 1,
        "points": 100
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
          "PISTOL",
          "PRECISION"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "The Raven’s Talons",
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
    "core": "Deep Strike, Leader, Lone Operative, Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in ASSAULT INTERCESSORS WITH JUMP PACKS units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      },
      {
        "name": "Trifold Path of Shadow",
        "text": "While this model is leading a unit, that unit cannot be targeted by ranged attacks unless the attacking model is within 12\"."
      },
      {
        "name": "Echo of the Ravenspire",
        "text": "At the end of your opponent’s turn, if this model’s unit is not within Engagement Range of one or more enemy units, you can remove that unit from the battlefield and place it into Strategic Reserves."
      }
    ],
    "specialAbilities": [
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Assault Intercessors with Jump Packs units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Kayvaan Shrike – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Blackout; the Raven’s Talons.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessors with Jump Packs",
        "Assault Squad with Jump Packs",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Imperium",
      "Phobos",
      "Chapter Master",
      "Kayvaan Shrike",
      "Jump Pack",
      "Infantry",
      "Character",
      "Epic Hero",
      "Fly"
    ],
    "factionKeywords": [
      "Raven Guard",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "korsarro-khan",
    "name": "Kor’sarro Khan",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "flavor": "As Captain of the White Scars’ 3rd Company and Master of the Hunt, Kor’sarro Khan pursues and executes the Chapter’s greatest living foes. He is an indefatigable huntsman, tracking his quarry across the stars before running them to ground and taking their head with a masterful sweep of his deadly blade, Moonfang.",
    "profiles": [
      {
        "name": "Kor’sarro Khan",
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
        "name": "Moonfang",
        "tags": [
          "DEVASTATING WOUNDS",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in OUTRIDER SQUAD units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked."
      },
      {
        "name": "For the Khan!",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability and melee weapons equipped by models in that unit have the [LANCE] ability."
      },
      {
        "name": "Trophy Taker",
        "text": "Each time this model destroys an enemy CHARACTER model, you gain 1CP."
      }
    ],
    "specialAbilities": [
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Outrider Squad units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Kor’sarro Khan – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Moonfang.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad"
      ]
    },
    "keywords": [
      "Kor’sarro Khan",
      "Captain",
      "Tacticus",
      "Imperium",
      "Epic Hero",
      "Character",
      "Infantry"
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
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
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
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Havoc launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
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
        "name": "Kratos battle cannon – AP",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "18",
        "ap": "-4",
        "d": "D6+3"
      },
      {
        "name": "Kratos battle cannon – HE",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "10",
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
        "d": "D6+1"
      },
      {
        "name": "Melta blast-gun",
        "tags": [
          "MELTA 2"
        ],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
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
      },
      {
        "name": "Volkite caliver",
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
        "name": "Volkite cardanelle",
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
        "name": "Volkite culverin",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Line-breaker",
        "text": "When making ranged attacks, this model can target enemy units within Engagement Range of it with Blast weapons (provided no other friendly units are also within Engagement Range of that enemy unit). In addition, when making ranged attacks, this model does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Kratos"
    ],
    "loadout": "**This model is equipped with:** autocannon; Kratos battle cannon; 4 heavy bolters; armoured tracks.",
    "options": [
      "This model’s Kratos battle cannon can be replaced with one of the following:\n▪ 1 melta blast-gun\n▪ 1 volkite cardanelle",
      "2 of this model’s heavy bolters can be replaced with one of the following:\n▪ 2 autocannons\n▪ 2 lascannons*\n▪ 2 volkite calivers",
      "2 of this model’s heavy bolters can be replaced with one of the following:\n▪ 2 heavy flamers*\n▪ 2 lascannons*\n▪ 2 volkite culverins",
      "This model can be equipped with one of the following:\n▪ 1 combi-weapon*\n▪ 1 havoc launcher\n▪ 1 heavy bolter*\n▪ 1 heavy flamer*\n▪ 1 multi-melta*\n▪ 1 twin boltgun",
      "This model can be equipped with 1 hunter-killer missile.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Kratos"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider",
    "name": "Land Raider",
    "points": [
      {
        "models": 1,
        "points": 220,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 240,
        "note": "3rd+"
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
        "name": "Godhammer lascannon",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; 2 godhammer lascannons; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Land Raider",
      "Imperium",
      "Transport",
      "Vehicle",
      "Smoke",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "land-raider-achilles",
    "name": "Land Raider Achilles",
    "points": [
      {
        "models": 1,
        "points": 230
      }
    ],
    "flavor": "The Achilles is considered one of the rarest of all Land Raider variants, each one individually wrought under the scrupulous gaze of senior adepts of the Omnissiah. The result is an assault vehicle that is exceptionally resistant to energy-based weaponry. Roaring forward with impunity, the Achilles uses its thunderfire cannon and multi-meltas to suppress a wide range of foes.",
    "profiles": [
      {
        "name": "Land Raider Achilles",
        "m": "10\"",
        "t": "12",
        "sv": "2+",
        "w": "16",
        "ld": "6+",
        "oc": "5",
        "inv": "4+"
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
        "name": "Quad launcher – shatter shells",
        "tags": [],
        "range": "24\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Quad launcher – thunderfire shells",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "60\"",
        "a": "D6+4",
        "bs": "3+",
        "s": "5",
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
      },
      {
        "name": "Twin volkite culverin",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Achilles"
    ],
    "loadout": "**This model is equipped with:** quad launcher; 2 twin volkite culverins; armoured tracks.",
    "options": [
      "This model’s 2 twin volkite culverins can be replaced with 2 twin multi-meltas.",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION or OBLITERATOR model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Transport",
      "Smoke",
      "Frame",
      "Imperium",
      "Land Raider Achilles"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider-crusader",
    "name": "Land Raider Crusader",
    "points": [
      {
        "models": 1,
        "points": 220,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 240,
        "note": "3rd+"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Crusader"
    ],
    "loadout": "**This model is equipped with:** 2 hurricane bolters; twin assault cannon; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 16 ADEPTUS ASTARTES INFANTRY models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Land Raider Crusader",
      "Land Raider",
      "Imperium",
      "Transport",
      "Grenades",
      "Smoke",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
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
        "name": "Godhammer lascannons",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can be targeted by a Stratagem for 0CP, even if another unit from your army has already been targeted by that Stratagem this phase."
      },
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Excelsior"
    ],
    "loadout": "**This model is equipped with:** grav-cannon; 2 godhammer lascannons; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 combi-weapon."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Frame",
      "Imperium",
      "Land Raider Excelsior"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider-helios",
    "name": "Land Raider Helios",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "profiles": [
      {
        "name": "Land Raider Helios",
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
        "name": "Godhammer lascannons",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Helios launcher",
        "tags": [
          "ANTI-FLY 3+"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
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
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Helios"
    ],
    "loadout": "**This model is equipped with:** 2 godhammer lascannons; Helios launcher; armoured tracks.",
    "options": [
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Frame",
      "Imperium",
      "Land Raider Helios"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider-prometheus",
    "name": "Land Raider Prometheus",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "profiles": [
      {
        "name": "Land Raider Prometheus",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Quad heavy bolter",
        "tags": [
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Prometheus"
    ],
    "loadout": "**This model is equipped with:** 2 quad heavy bolters; armoured tracks.",
    "options": [
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Frame",
      "Imperium",
      "Land Raider Prometheus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider-proteus",
    "name": "Land Raider Proteus",
    "points": [
      {
        "models": 1,
        "points": 220
      }
    ],
    "flavor": "The ancient and venerable Land Raider has served the Space Marines since their earliest beginnings, and the oldest variants are known as Proteus patterns. These heavily armoured bastions once acted as forward assault vehicles in Explorator missions, and rare survivals still serve the Imperium as relic vehicles of highest regard.",
    "profiles": [
      {
        "name": "Land Raider Proteus",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Explorator Augury Web",
        "text": "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" of the bearer, but the bearer must halve its Transport Capacity."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Proteus"
    ],
    "loadout": "**This model is equipped with:** 2 twin lascannons; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 heavy bolter\n▪ 1 multi-melta\n▪ 1 twin heavy bolter\n▪ 1 twin heavy flamer",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter.",
      "This model can be equipped with 1 explorator augury web."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION or OBLITERATOR model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Transport",
      "Smoke",
      "Frame",
      "Imperium",
      "Land Raider Proteus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-raider-redeemer",
    "name": "Land Raider Redeemer",
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
        "name": "Flamestorm cannon",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
        "s": "6",
        "ap": "-2",
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Land Raider Redeemer"
    ],
    "loadout": "**This model is equipped with:** 2 flamestorm cannons; twin assault cannon; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 14 ADEPTUS ASTARTES INFANTRY models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Imperium",
      "Transport",
      "Land Raider",
      "Grenades",
      "Land Raider Redeemer",
      "Smoke",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
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
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Stormfury missile launcher",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Purgation Run",
        "text": "In your Shooting phase, after this unit has shot, it can make a Normal move of up to D6\". If it does, until the end of the turn, this unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Land Speeder"
    ],
    "loadout": "**This model is equipped with:** multi-melta; onslaught gatling cannon; stormfury missile launcher; close combat weapon.",
    "options": [
      "This model’s onslaught gatling cannon can be replaced with 1 heavy flamer."
    ],
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Land Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "105x70mm Oval Base"
  },
  {
    "id": "land-speeder-storm",
    "name": "Land Speeder Storm",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "profiles": [
      {
        "name": "Land Speeder Storm",
        "m": "14\"",
        "t": "7",
        "sv": "4+",
        "w": "7",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Cerberus launcher",
        "tags": [
          "BLAST"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
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
      }
    ],
    "core": "Deadly Demise 1, Firing Deck 6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Storm Assault",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Land Speeder Storm"
    ],
    "loadout": "**This model is equipped with:** Cerberus launcher; heavy bolter; close combat weapon.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 6 models. It can only transport SCOUT SQUAD, SCOUT SNIPER SQUAD and SERGEANT TELION models.",
    "keywords": [
      "Vehicle",
      "Fly",
      "Transport",
      "Dedicated Transport",
      "Imperium",
      "Land Speeder Storm"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-speeder-tempest",
    "name": "Land Speeder Tempest",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "profiles": [
      {
        "name": "Land Speeder Tempest",
        "m": "14\"",
        "t": "8",
        "sv": "3+",
        "w": "7",
        "ld": "6+",
        "oc": "2"
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
        "name": "Tempest salvo launcher – frag",
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
        "name": "Tempest salvo launcher – krak",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Isolate and Destroy",
        "text": "Each time this model makes an attack that targets an enemy unit, if there are no other units from your opponent’s army within 6\" of that target, add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Land Speeder Tempest"
    ],
    "loadout": "**This model is equipped with:** assault cannon; Tempest salvo launcher; armoured hull.",
    "options": [
      "None"
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Imperium",
      "Land Speeder Tempest"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-speeder-tornado",
    "name": "Land Speeder Tornado",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "profiles": [
      {
        "name": "Land Speeder Tornado",
        "m": "14\"",
        "t": "7",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "2"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Strafing Enfilade",
        "text": "Each time this model ends a Normal move, you can select one enemy unit (excluding MONSTER and VEHICLE units) that it moved over during that move, then roll six D6: for each 4+, that enemy unit suffers 1 mortal wound."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Land Speeder Tornado"
    ],
    "loadout": "**This model is equipped with:** assault cannon; heavy bolter; close combat weapon.",
    "options": [
      "This model’s heavy bolter can be replaced with 1 multi-melta.",
      "This model’s assault cannon can be replaced with 1 heavy flamer."
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Imperium",
      "Land Speeder Tornado"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "land-speeder-typhoon",
    "name": "Land Speeder Typhoon",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "Land Speeder Typhoon",
        "m": "14\"",
        "t": "7",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
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
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Typhoon missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Typhoon missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fire and Redeploy",
        "text": "In your Shooting phase, each time this model has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to D6\". If it does, until the end of the turn, this model is not eligible to declare a charge."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Land Speeder Typhoon"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; Typhoon missile launcher; close combat weapon.",
    "options": [
      "This model’s heavy bolter can be replaced with 1 multi-melta."
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Imperium",
      "Land Speeder Typhoon"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "leviathan-dreadnought",
    "name": "Leviathan Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "The Leviathan Dreadnought was the product of a secret development programme on Terra itself, which combined ancient technologies to create a savagely powerful siege and hunter-killer machine. Leviathans proved as costly as they were deadly, however, and of the limited quantities manufactured, only a handful now remain.",
    "profiles": [
      {
        "name": "Leviathan Dreadnought",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "4",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Cyclonic melta lance",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Grav-flux bombard",
        "tags": [
          "ANTI-VEHICLE 2+",
          "BLAST"
        ],
        "range": "24\"",
        "a": "2D3",
        "bs": "3+",
        "s": "8",
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
        "name": "Storm cannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Twin volkite caliver",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Leviathan siege claw",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Leviathan siege drill",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Duty Eternal",
        "text": "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Leviathan Dreadnought"
    ],
    "loadout": "**This model is equipped with:** 2 heavy flamers; 2 grav-flux bombards; armoured feet.",
    "options": [
      "Each of this model’s grav-flux bombards can be replaced with one of the following:\n▪ 1 cyclonic melta lance\n▪ 1 storm cannon\n▪ 1 meltagun and 1 Leviathan siege claw\n▪ 1 meltagun and 1 Leviathan siege drill",
      "This model’s 2 heavy flamers can be replaced with 2 twin volkite calivers.",
      "This model can be equipped with 3 hunter-killer missiles."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Smoke",
      "Dreadnought",
      "Leviathan Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "librarian",
    "name": "Librarian",
    "points": [
      {
        "models": 1,
        "points": 70,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 80,
        "note": "3rd+"
      }
    ],
    "flavor": "Librarians are the Space Marines’ battle-psykers and keepers of lore. Wielding terrifying empyric energies, with but a thought they can crush a foe’s skull, throw up force shields to protect their brethren from incoming fire, and hurl blasts of psychic power.",
    "profiles": [
      {
        "name": "Librarian",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
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
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Mental Fortress (Psychic)",
        "text": "While this model is leading a unit, models in that unit have a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Librarian"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Smite; force weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Desolation Squad",
        "Devastator Squad",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Long Fangs",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Grenades",
      "Tacticus",
      "Character",
      "Imperium",
      "Infantry",
      "Librarian",
      "Psyker"
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
        "points": 70
      }
    ],
    "flavor": "Many Librarians learn the arcane arts of obscuration and illusion as part of their long and dangerous training. Donning Phobos armour, they take to the field and use these skills to fog the minds of their enemies, prise vital battle plans from their foes’ minds and turn the enemy’s shadows against them.",
    "profiles": [
      {
        "name": "Librarian in Phobos Armour",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "D3"
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
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Infiltrators, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Shrouding (Psychic)",
        "text": "While this model is leading a unit, models in that unit have the Stealth ability and that unit cannot be targeted by ranged attacks unless the attacking model is within 12\"."
      }
    ],
    "composition": [
      "1 Librarian in Phobos Armour"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Smite; force weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Reiver Squad",
        "Spectrus Kill Team",
        "Hounds Of Morkai",
        "Infiltrator Squad",
        "Eliminator Squad",
        "Incursor Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Psyker",
      "Imperium",
      "Phobos",
      "Librarian"
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
        "points": 85
      }
    ],
    "flavor": "The powers of a Chapter’s Librarians lend a lethal psychic edge to its elite infantry spearheads. Whether it be gruelling boarding actions, ferocious urban combat or on the front line against overwhelming enemy numbers, Librarians in Terminator armour blast at the foe with their powerful psychic energies.",
    "profiles": [
      {
        "name": "Librarian in Terminator Armour",
        "m": "5\"",
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
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
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
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Veil of Time (Psychic)",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      }
    ],
    "composition": [
      "1 Librarian in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** Smite; force weapon.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 combi-weapon\n▪ 1 storm bolter"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwatch Terminator Squad",
        "Deathwing Command Squad",
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad"
      ]
    },
    "keywords": [
      "Librarian",
      "Character",
      "Psyker",
      "Infantry",
      "Imperium",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "librarian-on-bike",
    "name": "Librarian on Bike",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "profiles": [
      {
        "name": "Librarian on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
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
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
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
        "name": "Force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Mental Fortress (Psychic)",
        "text": "While this model is leading a unit, models in that unit have a 4+ invulnerable save."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Librarian on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; force weapon.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Psyker",
      "Imperium",
      "Librarian"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "librarian-with-jump-pack",
    "name": "Librarian with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "profiles": [
      {
        "name": "Librarian with Jump Pack",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "d": "D6"
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
        "name": "Smite – focused witchfire",
        "tags": [
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
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
        "name": "Smite – witchfire",
        "tags": [
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "D3"
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
        "s": "6",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Might of Heroes (Psychic)",
        "text": "While this model is leading a unit, improve the Strength and Armour Penetration characteristics of melee weapons equipped by models in that unit by 1."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Librarian with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Smite; force weapon.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Squad with Jump Packs",
        "Vanguard Veteran Squad with Jump Packs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Jump Pack",
      "Fly",
      "Psyker",
      "Grenades",
      "Imperium",
      "Librarian"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "lieutenant",
    "name": "Lieutenant",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "Lieutenants, in addition to being extremely able tacticians and strategists, are highly skilled warriors. Experts in all the lethal weaponry of the battle-brothers they so often command and fight alongside, they bellow orders and coordinate their brothers’ attacks even as they strike at the foe with their own arsenal of powerful weapons.",
    "profiles": [
      {
        "name": "Lieutenant",
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
        "name": "Master-crafted bolter",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Neo-volkite pistol",
        "tags": [
          "DEVASTATING WOUNDS",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "0",
        "d": "2"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Target Priority",
        "text": "This model’s unit is eligible to shoot and declare a charge in a turn in which it Fell Back."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Lieutenant"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted bolter; close combat weapon.",
    "options": [
      "This model’s master-crafted bolter can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 master-crafted power weapon\n▪ 1 power fist",
      "This model’s bolt pistol, master-crafted bolter and close combat weapon can be replaced with 1 neo volkite pistol, 1 master-crafted power weapon and 1 storm shield.",
      "This model’s bolt pistol can be replaced with 1 heavy bolt pistol.",
      "This model’s close combat weapon can be replaced with one of the following:\n▪ 1 master-crafted power weapon\n▪ 1 power fist"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Crusader Squad",
        "Deathwatch Veterans",
        "Decimus Kill Team",
        "Fortis Kill Team",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Lieutenant",
      "Tacticus",
      "Imperium",
      "Grenades",
      "Character",
      "Infantry"
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
        "points": 45
      }
    ],
    "flavor": "Highly capable combat commanders, Lieutenants can lead independent reconnaissance, sabotage and assassination forces far beyond Imperial lines. They are deadly warriors, and the last sensation of countless foes has been the cold press of a Space Marine Lieutenant’s knife to their neck.",
    "profiles": [
      {
        "name": "Lieutenant in Phobos Armour",
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
        "name": "Paired combat blades",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Infiltrators, Support, Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Strategic Dispersal",
        "text": "In your Shooting phase, after this model’s unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, that unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Lieutenant in Phobos Armour"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted bolt carbine; paired combat blades.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hounds Of Morkai",
        "Reiver Squad",
        "Incursor Squad",
        "Spectrus Kill Team",
        "Infiltrator Squad"
      ]
    },
    "keywords": [
      "Lieutenant",
      "Phobos",
      "Imperium",
      "Grenades",
      "Infantry",
      "Character"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lieutenant-in-reiver-armour",
    "name": "Lieutenant in Reiver Armour",
    "points": [
      {
        "models": 1,
        "points": 45
      }
    ],
    "flavor": "When a Space Marine commander needs the enemy broken in terror, he unleashes detachments led by Lieutenants clad in the wargear of the Reiver Squads. With the masterful leadership of the Lieutenant, these forces become more powerful than the sum of their parts, and drive contingents of the foe to flight.",
    "profiles": [
      {
        "name": "Lieutenant in Reiver Armour",
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
        "name": "Master-crafted special issue bolt pistol",
        "tags": [
          "PISTOL",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Combat knife",
        "tags": [
          "PRECISION"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Support, Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Deadly Terror",
        "text": "While this model is leading a unit, increase the range of that unit’s Terror Troops ability by 3\"."
      }
    ],
    "composition": [
      "1 Lieutenant in Reiver Armour"
    ],
    "loadout": "**This model is equipped with:** master-crafted special issue bolt pistol; combat knife.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Hounds Of Morkai",
        "Reiver Squad"
      ]
    },
    "keywords": [
      "Lieutenant in Reiver Armour",
      "Infantry",
      "Phobos",
      "Imperium",
      "Grenades",
      "Smoke",
      "Character",
      "Lieutenant"
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
        "points": 95
      }
    ],
    "flavor": "Some Lieutenants in Phobos armour are tasked with operating behind enemy lines, acting as skilled assassins and intelligence gatherers. By the time the main Space Marine task force has arrived they have cast the enemy into disarray and collected incredible tactical data that will all but guarantee the assault’s success.",
    "profiles": [
      {
        "name": "Lieutenant with Combi-weapon",
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
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Paired combat blades",
        "tags": [
          "ANTI-INFANTRY 4+",
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+, Infiltrators, Lone Operative, Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Priority Objective Identified",
        "text": "At the start of the first battle round, if your army includes one or more models with this ability, you can select one objective marker on the battlefield. Until the end of the battle, while one or more models with this ability are on the battlefield, each time a friendly ADEPTUS ASTARTES model makes an attack that targets an enemy unit that is within range of that objective marker, re-roll a Wound roll of 1."
      },
      {
        "name": "Evade and Survive",
        "text": "In your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to 6\"."
      }
    ],
    "composition": [
      "1 Lieutenant with Combi-weapon"
    ],
    "loadout": "**This model is equipped with:** combi-weapon; paired combat blades.",
    "keywords": [
      "Lieutenant with Combi-weapon",
      "Lieutenant",
      "Imperium",
      "Phobos",
      "Character",
      "Infantry",
      "Grenades"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "LAST SURVIVOR",
        "text": "This model cannot be selected as your Warlord."
      }
    ]
  },
  {
    "id": "marneus-calgar-in-armour-of-antilochus",
    "name": "Marneus Calgar in Armour of Antilochus",
    "points": [
      {
        "models": 1,
        "points": 155
      }
    ],
    "flavor": "Inspiring leader and superlative warrior both, Marneus Calgar goes to battle clad in the Armour of Antilochus. Obliterating swathes of enemies with volleys of bolt shells from the Gauntlets of Ultramar and tearing apart any foes foolish enough to stand before him, he is an architect of destruction whose gift for grand strategy is without question.",
    "profiles": [
      {
        "name": "MARNEUS CALGAR",
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
          "PISTOL",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
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
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Leader",
        "text": "This unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back."
      },
      {
        "name": "Master Tactician",
        "text": "At the start of your Command phase, if this model is your WARLORD and is on the battlefield, you gain 1CP."
      }
    ],
    "composition": [
      "1 Marneus Calgar in Armour of Antilochus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 Gauntlets of Ultramar.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Eradicator Squad",
        "Heavy Intercessor Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Relic Terminator Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Vanguard Veteran Squad",
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Character",
      "Infantry",
      "Marneus Calgar",
      "Chapter Master",
      "Terminator",
      "Imperium"
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Siege melta array",
        "tags": [
          "MELTA 2"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Skyreaper battery",
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
        "name": "Volkite culverin",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 2D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inviolable Transport",
        "text": "Once per battle round, when an attack is allocated to this model, you can change the Damage characteristic of that attack to 0."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, subtract 6 from this model’s Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Mastodon"
    ],
    "loadout": "**This model is equipped with:** 2 heavy flamers; 2 lascannons; siege melta array; skyreaper battery; armoured tracks.",
    "options": [
      "This model’s 2 heavy flamers can be replaced with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons\n▪ 2 volkite culverins",
      "This model’s 2 lascannons can be replaced with one of the following:\n▪ 2 heavy bolters\n▪ 2 heavy flamers\n▪ 2 volkite culverins"
    ],
    "transport": "This model has a transport capacity of 45 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION or OBLITERATOR model takes up the space of 3 models. This model can also transport up to 2 DREADNOUGHT or HELBRUTE models (these models take up the space of a number of models equal to their Wounds characteristic e.g. a DREADNOUGHT with a Wounds characteristic of 8 would take up the space of 8 models).",
    "keywords": [
      "Vehicle",
      "Frame",
      "Titanic",
      "Imperium",
      "Transport",
      "Smoke",
      "Mastodon"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "mortis-dreadnought",
    "name": "Mortis Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 130
      }
    ],
    "profiles": [
      {
        "name": "Mortis Dreadnought",
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
        "name": "Dreadnought inferno cannon",
        "tags": [
          "IGNORES COVER",
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
        "name": "Heavy plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin autocannon",
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
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Mortis Strike",
        "text": "Each time this model makes a ranged attack that targets a unit that is not Below Half-strength, you can re-roll the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Mortis Dreadnought"
    ],
    "loadout": "**This model is equipped with:** 2 twin heavy bolters; armoured feet.",
    "options": [
      "This model’s 2 twin heavy bolters can be replaced with one of the following:\n▪ 2 assault cannons\n▪ 2 Dreadnought inferno cannons\n▪ 2 heavy plasma cannons\n▪ 2 missile launchers\n▪ 2 multi-meltas\n▪ 2 twin autocannons\n▪ 2 twin lascannons"
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Mortis Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "outrider-squad",
    "name": "Outrider Squad",
    "points": [
      {
        "models": 3,
        "points": 70
      },
      {
        "models": 6,
        "points": 140
      },
      {
        "points": 60
      }
    ],
    "flavor": "Outrider Squads advance ahead of the main Space Marine lines, guard flanks of larger formations and hunt down enemy infiltrators. When battle is joined, they conduct lightning-fast hit-and-run attacks on defended positions, and run down those who would try to escape the vengeance of the Chapter.",
    "profiles": [
      {
        "name": "OUTRIDER",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2",
        "baseSize": "90x52.5mm Oval Base"
      },
      {
        "name": "INVADER ATV",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2",
        "baseSize": "90x52.5mm Oval Base"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
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
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Thunderous Impact",
        "text": "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength and Damage characteristics of that attack by 1."
      }
    ],
    "composition": [
      "1 Outrider Sergeant",
      "2-5 Outriders",
      "0-1 Invader ATV"
    ],
    "loadout": "**The Outrider Sergeant and every Outrider is equipped with:** heavy bolt pistol; twin bolt rifle; Astartes chainsword.\n\n**An Invader ATV is equipped with:** bolt pistol; twin bolt rifle; onslaught gatling cannon; close combat weapon.",
    "options": [
      "An Invader ATV’s onslaught gatling cannon can be replaced with 1 multi-melta."
    ],
    "keywords": [
      "Grenades",
      "Imperium",
      "Mounted",
      "Outrider Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ]
  },
  {
    "id": "pedro-kantor",
    "name": "Pedro Kantor",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Pedro Kantor is a superb combatant and an inspiring leader. The Chapter Master of the Crimson fists mows down enemy infantry with Dorn’s Arrow, blasting them apart with hails of mass-reactive bolts. Those who make the mistake ofgetting too close - whether battle tank or foot soldier - he crushes with thunderous blowsfrom the Fist of Retribution.",
    "profiles": [
      {
        "name": "Pedro Kantor",
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
        "name": "Dorn’s Arrow",
        "tags": [
          "RAPID FIRE 2",
          "SUSTAINED HITS 1"
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
        "name": "Fist of Retribution",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in STERNGUARD VETERAN SQUAD units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      },
      {
        "name": "Oath of Rynn",
        "text": "Once per battle, at the start of either player’s Command phase, this model can use this ability. When it does, until the end of the turn, add 1 to the Attacks characteristic of weapons equipped by models in this model’s unit."
      },
      {
        "name": "To the Last",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll if that unit is below its Starting Strength, and add 1 to the Wound roll as well if that unit is Below Half-strength."
      }
    ],
    "specialAbilities": [
      {
        "name": "CRIMSON FISTS",
        "text": "This model is from the Crimson Fists Chapter, a successor of the Imperial Fists. For all rules purposes, it is treated as an Imperial Fists model, but it cannot be included in an army that includes any other Imperial Fists Epic Hero models."
      },
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Sternguard Veteran Squad units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Pedro Kantor – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Dorn’s Arrow; Fist of Retribution.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Sternguard Veteran Squad",
        "Tactical Squad"
      ]
    },
    "keywords": [
      "Grenades",
      "Imperium",
      "Infantry",
      "Chapter Master",
      "Pedro Kantor",
      "Tacticus",
      "Character",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Imperial Fists"
    ],
    "baseSize": "32mm"
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
        "name": "Predator twin lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Annihilator",
        "text": "Each time a ranged attack made by this model is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Predator Annihilator"
    ],
    "loadout": "**This model is equipped with:** Predator twin lascannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Imperium",
      "Predator Annihilator",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Predator autocannon",
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Destructor",
        "text": "Each time this model makes a ranged attack that targets an INFANTRY unit, improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Predator Destructor"
    ],
    "loadout": "**This model is equipped with:** Predator autocannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Imperium",
      "Predator Destructor",
      "Vehicle",
      "Smoke",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "primaris-company-champion",
    "name": "Primaris Company Champion",
    "points": [
      {
        "models": 1,
        "points": 55
      }
    ],
    "profiles": [
      {
        "name": "Primaris Company Champion",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Master-crafted power weapon",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Honour or Death",
        "text": "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit. When you target this unit with the Heroic Intervention Stratagem, that use is -1 CP."
      },
      {
        "name": "Martial Superiority",
        "text": "Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Primaris Company Champion"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted power weapon.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Primaris Company Champion"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Graviton cannon",
        "tags": [
          "ANTI-VEHICLE 2+",
          "BLAST",
          "HEAVY"
        ],
        "range": "36\"",
        "a": "D6",
        "bs": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Laser destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Quad heavy bolter",
        "tags": [
          "HEAVY",
          "TWIN-LINKED",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Quad launcher – shatter shells",
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
        "name": "Quad launcher – thunderfire shells",
        "tags": [
          "BLAST",
          "HEAVY",
          "INDIRECT FIRE"
        ],
        "range": "60\"",
        "a": "D6+4",
        "bs": "3+",
        "s": "5",
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
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Powerful Volley",
        "text": "Each time this model shoots in your Shooting phase, provided it Remained Stationary this turn, all [HEAVY] weapons equipped by models in this unit have the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Rapier Carrier"
    ],
    "loadout": "**This model is equipped with:** boltgun; quad heavy bolter; close combat weapon.",
    "options": [
      "This model’s quad heavy bolter can be replaced with one of the following:\n▪ 1 graviton cannon\n▪ 1 laser destroyer\n▪ 1 quad launcher"
    ],
    "keywords": [
      "Artillery",
      "Vehicle",
      "Frame",
      "Imperium",
      "Rapier Carrier"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "razorback",
    "name": "Razorback",
    "points": [
      {
        "models": 1,
        "points": 85,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 95,
        "note": "4th+"
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
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks, Until the end of the phase, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Razorback"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; armoured tracks.",
    "options": [
      "This model’s twin heavy bolter can be replaced with 1 twin lascannon.",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 6 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR or TACTicus models (excluding TACTICUS CHARACTER models that began the battle attached to a non-TACTICUS unit).",
    "keywords": [
      "Transport",
      "Dedicated Transport",
      "Imperium",
      "Razorback",
      "Vehicle",
      "Smoke",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "redemptor-dreadnought",
    "name": "Redemptor Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 195,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 210,
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
        "name": "Heavy onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Macro plasma incinerator – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Macro plasma incinerator – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "3"
      },
      {
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin fragstorm grenade launcher",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "18\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin storm bolter",
        "tags": [
          "RAPID FIRE 2",
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
        "name": "Redemptor fist",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Duty Eternal",
        "text": "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Redemptor Dreadnought"
    ],
    "loadout": "**This model is equipped with:** Twin fragstorm grenade launcher; heavy flamer; heavy onslaught gatling cannon; Redemptor fist.",
    "options": [
      "This model can be equipped with 1 Icarus rocket pod.",
      "This model’s heavy flamer can be replaced with 1 onslaught gatling cannon.",
      "This model’s heavy onslaught gatling cannon can be replaced with 1 macro plasma incinerator.",
      "This model’s twin fragstorm grenade launcher can be replaced with 1 twin storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Imperium",
      "Walker",
      "Redemptor Dreadnought",
      "Dreadnought"
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
        "points": 75
      },
      {
        "models": 10,
        "points": 150
      }
    ],
    "flavor": "Rapid-insertion terror troops, Reiver Squads often deploy using grav-chutes and directional fins to land with pinpoint accuracy. Operating with near perfect stealth to reach the optimum location to strike from, when ready they unleash their fury, surging forward with augmented guttural roars and blasts of weapons fire.",
    "profiles": [
      {
        "name": "Reiver Squad",
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
        "name": "Special issue bolt pistol",
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
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fearsome Assault",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test, subtracting 1 from that test."
      },
      {
        "name": "Terror Troops (Aura)",
        "text": "While an enemy unit (excluding MONSTERS and VEHICLES) is within 3\" of one or more units with this ability, subtract 1 from the Objective Control characteristic of models in that enemy unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Grapnel Launcher",
        "text": "Each time the bearer’s unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move."
      },
      {
        "name": "Reiver Grav-chute",
        "text": "The bearer has the Deep Strike ability."
      }
    ],
    "composition": [
      "1 Reiver Sergeant",
      "4-9 Reivers"
    ],
    "loadout": "**Every model is equipped with:** special issue bolt pistol; combat knife.",
    "options": [
      "All models in this unit can each have their combat knife replaced with 1 bolt carbine and 1 close combat weapon.",
      "If the Reiver Sergeant is equipped with 1 bolt carbine, it can be equipped with 1 combat knife.",
      "All models in this unit can each be equipped with 1 Reiver grav-chute.",
      "All models in this unit can each be equipped with 1 grapnel launcher."
    ],
    "keywords": [
      "Reiver Squad",
      "Phobos",
      "Imperium",
      "Smoke",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "relic-contemptor-dreadnought",
    "name": "Relic Contemptor Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "flavor": "As relics of a lost age of martial design, Contemptor Dreadnoughts are exemplars of combat versatility. The best demonstration of this is the wide array of weapon arms compatible with the Contemptor chassis, ranging from conventional heavy weapons and power fists to some of the most esoteric firearms still in use on the battlefields of the 41st Millennium.",
    "profiles": [
      {
        "name": "Relic Contemptor Dreadnought",
        "m": "6\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Combi-bolter",
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
        "name": "Conversion beam cannon",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "3"
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
        "name": "Graviton blaster",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
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
        "name": "Heavy plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Kheres-pattern assault cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Plasma blaster – standard",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma blaster – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Twin autocannon",
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
      },
      {
        "name": "Twin volkite culverin",
        "tags": [
          "DEVASTATING WOUNDS",
          "TWIN-LINKED"
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
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dreadnought chainfist",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "4",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Even In Death I Serve",
        "text": "The first time this model is destroyed, remove it from play without resolving its Deadly Demise ability. Then, at the end of the phase, roll one D6: on a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with D6 wounds remaining."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Conversion",
        "text": "Each time an attack made with this weapon targets a unit more than 12\" from the bearer, an unmodified successful Hit roll of 4+ scores a Critical Hit."
      }
    ],
    "composition": [
      "1 Relic Contemptor Dreadnought"
    ],
    "loadout": "**This model is equipped with:** 2 heavy plasma cannons; armoured feet.",
    "options": [
      "Each of this model’s heavy plasma cannons can be replaced with one of the following:\n▪ 1 conversion beam cannon\n▪ 1 kheres-pattern assault cannon\n▪ 1 multi-melta*\n▪ 1 twin autocannon*\n▪ 1 twin heavy bolter*\n▪ 1 twin lascannon*\n▪ 1 twin volkite culverin\n▪ 1 Dreadnought chainfist and 1 combi-bolter\n▪ 1 Dreadnought combat weapon and 1 combi-bolter",
      "Each of this model’s combi-bolters can be replaced with one of the following:\n▪ 1 graviton blaster\n▪ 1 heavy flamer*\n▪ 1 plasma blaster*",
      "This model can be equipped with 1 cyclone missile launcher.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Imperium",
      "Dreadnought",
      "Relic Contemptor Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Fire Support",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit it scored one or more hits against this phase. Until the end of the phase, each time a friendly model that disembarked from this Transport this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Relic Razorback"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; armoured tracks.",
    "options": [
      "This model’s twin heavy bolter can be replaced with one of the following:\n▪ 1 multi-melta\n▪ 1 twin assault cannon\n▪ 1 twin lascannon",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 6 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR or TACTICUS models (except for TACTICUS CHARACTER models that begin the battle attached to a non-TACTICUS unit).",
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Dedicated Transport",
      "Frame",
      "Imperium",
      "Relic Razorback"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "relic-terminator-squad",
    "name": "Relic Terminator Squad",
    "points": [
      {
        "models": 5,
        "points": 200
      },
      {
        "models": 10,
        "points": 400
      }
    ],
    "profiles": [
      {
        "name": "Relic Terminator Squad",
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
        "name": "Combi-bolter",
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
        "name": "Plasma blaster – standard",
        "tags": [],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma blaster – supercharge",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Reaper autocannon",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "4",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Volkite charger",
        "tags": [
          "DEVASTATING WOUNDS"
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fury of the First",
        "text": "Each time a model in this unit makes an attack, you can ignore any or all modifiers to that attack’s Ballistic Skill or Weapon Skill characteristic and/or to the Hit roll. In addition, each time a model in this unit makes an attack that targets the enemy unit you selected for the Oath of Moment ability this turn, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Grenade Harness",
        "text": "The bearer has the GRENADES keyword."
      }
    ],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to a Terminator Squad, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Relic Terminator Sergeant",
      "4-9 Relic Terminators"
    ],
    "loadout": "**Every model is equipped with:** combi-bolter; power fist.",
    "options": [
      "The Relic Terminator Sergeant’s combi-bolter can be replaced with one of the following:\n▪ 1 plasma blaster\n▪ 1 volkite charger",
      "For every 5 models in this unit, 1 Relic Terminator’s combi-bolter can be replaced with one of the following:\n▪ 1 heavy flamer\n▪ 1 reaper autocannon",
      "For every 5 models in this unit, 1 model can be equipped with 1 grenade harness.",
      "Any number of models can each have their power fist replaced with 1 power weapon.",
      "Any number of models can each have their power fist replaced with 1 chainfist.",
      "Any number of models can each have their combi-bolter and power fist replaced with 1 twin lightning claws."
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Terminator",
      "Relic Terminator Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "repulsor",
    "name": "Repulsor",
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
        "name": "Heavy onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Hunter-slayer missile",
        "tags": [
          "INDIRECT FIRE",
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
        "name": "Las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Repulsor defensive array",
        "tags": [],
        "range": "24\"",
        "a": "18",
        "bs": "3+",
        "s": "4",
        "ap": "0",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Emergency Combat Embarkation",
        "text": "Once per turn, in your opponent’s Charge phase, after an enemy unit has selected targets for its charge but before it makes a Charge move, you can select one ADEPTUS ASTARTES unit from your army that was selected as a target of that charge. Provided that unit is not within Engagement Range of any enemy units and every model in that unit is within 3\" of this TRANSPORT, it can embark within this TRANSPORT. The charging unit can then select new targets for its charge."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Repulsor"
    ],
    "loadout": "**This model is equipped with:** heavy onslaught gatling cannon; hunter-slayer missile; Repulsor defensive array; twin heavy bolter; armoured hull.",
    "options": [
      "This model’s twin heavy bolter can be replaced with 1 twin lascannon.",
      "This model’s heavy onslaught gatling cannon can be replaced with 1 las-talon."
    ],
    "transport": "This model has a transport capacity of 14 ADEPTUS ASTARTES INFANTRY models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Transport",
      "Vehicle",
      "Repulsor",
      "Smoke",
      "Imperium",
      "Frame"
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
        "points": 255,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 275,
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
        "name": "Heavy laser destroyer",
        "tags": [
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
        "name": "Heavy onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Macro plasma incinerator – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Macro plasma incinerator – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D6+1",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "3"
      },
      {
        "name": "Repulsor Executioner defensive array",
        "tags": [],
        "range": "24\"",
        "a": "10",
        "bs": "3+",
        "s": "4",
        "ap": "0",
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
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Executioner",
        "text": "Each time this model makes an attack that targets a unit Below Half-strength, add 1 to the Hit roll."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Repulsor Executioner"
    ],
    "loadout": "**This model is equipped with:** heavy onslaught gatling cannon; macro plasma incinerator; Repulsor Executioner defensive array; twin heavy bolter; twin Icarus ironhail heavy stubber; armoured hull.",
    "options": [
      "This model’s macro plasma incinerator can be replaced with 1 heavy laser destroyer.",
      "This model can be equipped with 1 ironhail heavy stubber.",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "transport": "This model has a transport capacity of 7 ADEPTUS ASTARTES INFANTRY models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Repulsor Executioner",
      "Imperium",
      "Transport",
      "Smoke",
      "Vehicle",
      "Frame"
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
        "points": 65,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 75,
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Self Repair",
        "text": "At the end of your Command phase, this model regains 1 lost wound."
      }
    ],
    "composition": [
      "1 Rhino"
    ],
    "loadout": "**This model is equipped with:** storm bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR or TACTICUS models (excluding TACTICUS CHARACTER models that began the battle attached to a non-TACTICUS unit).",
    "keywords": [
      "Smoke",
      "Vehicle",
      "Rhino",
      "Dedicated Transport",
      "Imperium",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
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
        "name": "Twin plasma gun – standard",
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
        "name": "Twin plasma gun – supercharge",
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
        "name": "Self Repair",
        "text": "At the end of your Command phase, this model regains 1 lost wound."
      },
      {
        "name": "Orbital Comms Array (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of the bearer, each time you target that unit with a Stratagem, roll one D6: on a 5+, you gain 1CP."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Rhino Primaris"
    ],
    "loadout": "**This model is equipped with:** twin plasma gun; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "transport": "This model has a transport capacity of 6 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR or TACTICUS models (except for TACTICUS CHARACTER models that begin the battle attached to a non-TACTICUS unit).",
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Frame",
      "Imperium",
      "Rhino Primaris"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "roboute-guilliman",
    "name": "Roboute Guilliman",
    "points": [
      {
        "models": 1,
        "points": 355
      }
    ],
    "flavor": "In one of Guilliman’s hands blazes the burning Emperor’s Sword. The other is clad in the Hand of Dominion, a gauntlet with which Guilliman can tear apart tanks. The Primarch’s strategic brilliance is his greatest weapon however, his enemies outmanoeuvred and out-thought before the battle has even begun.",
    "profiles": [
      {
        "name": "Roboute Guilliman",
        "m": "8\"",
        "t": "9",
        "sv": "2+",
        "w": "10",
        "ld": "5+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Hand of Dominion",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "30\"",
        "a": "2",
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
          "DEVASTATING WOUNDS"
        ],
        "a": "14",
        "ws": "2+",
        "s": "8",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Author of the Codex",
        "text": "At the Start of your Command phase, select two Author of the Codex abilities. Until the start of your next Command phase, this model has those abilities."
      },
      {
        "name": "Ultramarines Bodyguard",
        "text": "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES INFANTRY units, this model has the Lone Operative ability."
      },
      {
        "name": "Armour of Fate",
        "text": "The first time this model is destroyed, roll one D6 at the end of the phase: on a 3+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 6 wounds remaining."
      }
    ],
    "composition": [
      "1 Roboute Guilliman – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Hand of Dominion; Emperor’s Sword.",
    "keywords": [
      "Character",
      "Epic Hero",
      "Imperium",
      "Mobile",
      "Monster",
      "Primarch",
      "Roboute Guilliman"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "60mm",
    "rules": [
      {
        "name": "SUPREME COMMANDER",
        "text": "If this model is in your army, it must be your Warlord."
      }
    ],
    "abilitySets": [
      {
        "name": "Author of the Codex",
        "options": [
          {
            "name": "Primarch of the XIII (Aura)",
            "text": "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit and you can re-roll Battle-shock and Leadership tests taken for that unit."
          },
          {
            "name": "Master of Battle",
            "text": "At the start of your Command phase, after you have selected your Oath of Moment target, select a second enemy unit. Until the start of your next Command phase, if your Oath of Moment target is destroyed, that second enemy unit becomes your Oath of Moment target until you select a new one."
          },
          {
            "name": "Supreme Strategist",
            "text": "Once per battle round, one unit from your army with this ability can use it when a friendly ADEPTUS ASTARTES unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP."
          }
        ]
      }
    ]
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
        "name": "Scout Bike Squad",
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
        "name": "Astartes shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-INFANTRY 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
      },
      {
        "name": "Storm bolter",
        "tags": [
          "RAPID FIRE 2"
        ],
        "range": "24\"",
        "a": "3",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Combat knife",
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
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Scouts 9\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Outflank",
        "text": "When this unit arrives from Strategic Reserves, it can be set up within your opponent’s deployment zone (all other restrictions still apply)."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Scout Biker Sergeant",
      "2-5 Scout Bikers"
    ],
    "loadout": "**Every model is equipped with:** Astartes shotgun; bolt pistol; twin boltgun; combat knife.",
    "options": [
      "The Scout Biker Sergeant’s bolt pistol can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 boltgun*\n▪ 1 combi-weapon*\n▪ 1 hand flamer*\n▪ 1 grav-pistol*\n▪ 1 inferno pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter*\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer",
      "Any number of models can each have their twin boltgun replaced with 1 Astartes grenade launcher.\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Mounted",
      "Grenades",
      "Smoke",
      "Imperium",
      "Scout Bike Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "scout-sniper-squad",
    "name": "Scout Sniper Squad",
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
    "profiles": [
      {
        "name": "Scout Sniper Squad",
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
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Scout sniper rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Concealed Positions",
        "text": "This unit can only be selected as the target of a ranged attack if the attacking model is within 12\"."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Scout Sniper Sergeant",
      "4-9 Scout Snipers"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; scout sniper rifle; close combat weapon.",
    "options": [
      "1 Scout Sniper’s scout sniper rifle can be replaced with 1 missile launcher."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Smoke",
      "Imperium",
      "Scout Sniper Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "scout-squad",
    "name": "Scout Squad",
    "points": [
      {
        "models": 5,
        "points": 65,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 120,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 75,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 130,
        "note": "3rd+"
      }
    ],
    "flavor": "Space Marine neophytes, Scouts learn their deadly craft in daring missions independent of the main force. Led by seasoned Veteran Sergeants, they infiltrate enemy positions, clear potential drop zones, set ambushes, sabotage supply lines and complete all manner of other objectives to weaken the foe.",
    "profiles": [
      {
        "name": "Scout Squad",
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
        "name": "Astartes shotgun",
        "tags": [
          "ASSAULT"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Scout sniper rifle",
        "tags": [
          "HEAVY",
          "PRECISION"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-2",
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
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Combat knife",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Guerrilla Tactics",
        "text": "At the end of your opponent’s turn, if this unit is more than 6\" away from all enemy models, you can remove this unit from the battlefield and place it into Strategic Reserves."
      }
    ],
    "composition": [
      "1 Scout Sergeant",
      "4-9 Scouts"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "The Scout Sergeant's boltgun can be replaced with 1 Astartes chainsword.",
      "Any number of models can each have their boltgun replaced with one of the following:\n▪ 1 Astartes shotgun\n▪ 1 combat knife",
      "For every 5 models in this unit, 1 Scout’s boltgun can be replaced with 1 Scout sniper rifle.",
      "For every 5 models in this unit, 1 Scout’s boltgun can be replaced with one of the following:\n▪ 1 heavy bolter\n▪ 1 missile launcher"
    ],
    "keywords": [
      "Imperium",
      "Smoke",
      "Scout Squad",
      "Grenades",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "28.5mm"
  },
  {
    "id": "sergeant-chronus",
    "name": "Sergeant Chronus",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "profiles": [
      {
        "name": "Sergeant Chronus",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "3",
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
        "name": "Chronus’ servo-arm",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tank Commander",
        "text": "While this model is commanding a VEHICLE model (see reverse):\n▪ Ranged weapons equipped by that VEHICLE model have a Ballistic Skill characteristic of 2+.\n▪ Each time that VEHICLE model is selected to shoot, you can re-roll one Wound roll when resolving those attacks."
      },
      {
        "name": "Chronus",
        "text": "When this model disembarks from a VEHICLE model it was commanding, it has the Lone Operative ability until the end of the battle."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "TANK COMMANDER",
        "text": "If your army includes one or more of the VEHICLE models listed below, Sergeant Chronus must start the battle embarked within one of those models as if it were a TRANSPORT. Sergeant Chronus can only disembark from that VEHICLE if it is destroyed. While embarked in this way, Sergeant Chronus is said to be commanding that VEHICLE.\n▪ Hunter\n▪ Land Raider\n▪ Land Raider Crusader\n▪ Land Raider Redeemer\n▪ Predator Annihilator\n▪ Predator Destructor\n▪ Stalker\n▪ Vindicator\n▪ Whirlwind"
      }
    ],
    "composition": [
      "1 Sergeant Chronus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Chronus’ servo-arm.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Imperium",
      "Sergeant Chronus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sergeant-telion",
    "name": "Sergeant Telion",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "profiles": [
      {
        "name": "Sergeant Telion",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "3",
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
      },
      {
        "name": "Quietus",
        "tags": [
          "PRECISION"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Combat knife",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Leader, Scouts 6\", Stealth",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Voice of Experience",
        "text": "While this model is leading a unit, improve the Objective Control characteristic of models in that unit by 1 and each time a model in that unit makes an attack, add 1 to the Hit roll."
      },
      {
        "name": "Guiding Hand",
        "text": "While this model is leading a unit, each time that unit is selected to shoot or fight, select one of the following abilities to apply to weapons equipped by models in that unit until the end of the phase:\n▪ [LETHAL HITS]\n▪ [PRECISION]\n▪ [SUSTAINED HITS 1]"
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Sergeant Telion – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Quietus; combat knife.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Scout Squad",
        "Scout Sniper Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Imperium",
      "Sergeant Telion"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sicaran-arcus",
    "name": "Sicaran Arcus",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "The Sicaran Arcus was originally conceived to supply small, unsupported Astartes forces with highly specialised weapon systems, and combines the powerful Sicaran chassis with an Arcus launcher capable of firing a wide range of warheads. Despite the mysterious censure of the Adeptus Mechanicus, surviving examples of the tank continue to serve in battle with great honour.",
    "profiles": [
      {
        "name": "Sicaran Arcus",
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
        "name": "Arcus multi-launcher",
        "tags": [
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "2"
      },
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Specialised Weapon System",
        "text": "Each time this model makes an attack that targets the enemy unit you selected for the Oath of Moment ability, that attack has the [IGNORES COVER] ability and can ignore the penalty to their Hit rolls when making attacks with Indirect Fire weapons against targets that are not visible to them."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sicaran Arcus"
    ],
    "loadout": "**This model is equipped with:** Arcus multi-launcher; heavy bolter; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Sicaran Arcus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sicaran-battle-tank",
    "name": "Sicaran Battle Tank",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "The Sicaran is one of the rarest relic tanks seen on the battlefields of the 41st Millennium. Its unique design dates back to the Great Crusade. The most potent of the Sicaran’s distinctive systems is the twin accelerator cannon, whose accuracy and rate of fire are far in excess of other weapons of its class.",
    "profiles": [
      {
        "name": "Sicaran Battle Tank",
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
        "name": "Herakles-pattern autocannon",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Armoured Spearhead",
        "text": "Each time this model makes an attack that targets an enemy unit, re-roll a Hit roll of 1 and, if that unit is within range of an objective marker you do not control, you can re-roll the Hit roll instead."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sicaran Battle Tank"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; Herakles-pattern autocannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Sicaran Battle Tank"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sicaran-omega",
    "name": "Sicaran Omega",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "Retrofitted to allow the Sicaran hull to carry heavier firepower, the Omega is a formidable tank-hunter with countless victories to its name. The design utilises the speed provided by the Sicaran’s engines to apply overwhelming short-range firepower in battle, racing forwards to ambush and obliterate the lumbering siege tanks of enemy columns.",
    "profiles": [
      {
        "name": "Sicaran Omega",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Omega plasma array – standard",
        "tags": [],
        "range": "36\"",
        "a": "6",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "2"
      },
      {
        "name": "Omega plasma array – supercharge",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Overwhelming Short-range Firepower",
        "text": "Each time this model makes an attack that targets the closest eligible enemy unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sicaran Omega"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; omega plasma array; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Sicaran Omega"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sicaran-punisher",
    "name": "Sicaran Punisher",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "In the final days of the Great Crusade, the punisher rotary cannon was fitted to the versatile hull of the Sicaran Punisher: a formidable war machine capable of obliterating massed infantry and light vehicles with a storm of high-calibre shells.",
    "profiles": [
      {
        "name": "Sicaran Punisher",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Punisher rotary cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "36\"",
        "a": "18",
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
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Rotating Death",
        "text": "This model’s Punisher rotary cannon has the [SUSTAINED HITS 1] ability when targeting INFANTRY units."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sicaran Punisher"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; Punisher rotary cannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Sicaran Punisher"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sicaran-venator",
    "name": "Sicaran Venator",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "flavor": "Built on the lauded Sicaran chassis, the Venator is an ancient breed of tank destroyer fitted with a neutron laser system. The Venator’s combination of mobility, protection and anti-armour firepower ensures that those surviving are highly prized by any force fortunate enough to possess them.",
    "profiles": [
      {
        "name": "Sicaran Venator",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Venator neutron laser",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "D3+3"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Ferocious Assault",
        "text": "Each time this model makes a ranged attack that targets the closest eligible MONSTER or VEHICLE unit, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sicaran Venator"
    ],
    "loadout": "**This model is equipped with:** heavy bolter; Venator neutron laser; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Sicaran Venator"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sokar-pattern-stormbird",
    "name": "Sokar-pattern Stormbird",
    "points": [
      {
        "models": 1,
        "points": 900
      }
    ],
    "flavor": "The Stormbird was the design precursor to the Thunderhawk Gunship, conceived as a specialised, high-durability orbital assault craft that could land a Space Marine strike force in the face of heavy ground fire. Though largely superseded by the Thunderhawk, the Stormbird’s capabilities as a mobile bastion and firebase are never overlooked by those factions who still possess it.",
    "profiles": [
      {
        "name": "Sokar-pattern Stormbird",
        "m": "20\"",
        "t": "13",
        "sv": "2+",
        "w": "40",
        "ld": "6+",
        "oc": "0",
        "inv": "4+",
        "invNote": "Against ranged attacks only."
      }
    ],
    "ranged": [
      {
        "name": "Hellstrike missile battery",
        "tags": [
          "ANTI-FLY 3+"
        ],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6"
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
        "a": "9",
        "ws": "4+",
        "s": "9",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 2D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Aerial Assault",
        "text": "Each time a unit with the Deep Strike ability disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-13 wounds remaining",
      "text": "While this model has 1-13 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Sokar-pattern Stormbird"
    ],
    "loadout": "**This model is equipped with:** hellstrike missile battery; 3 twin heavy bolters; 4 twin lascannons; armoured hull.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 55 ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each MOUNTED, CENTURION or OBLITERATOR model takes up the space of 3 models. This model can also transport up to 1 RHINO model (this model – and any models embarked within it – take up the space of 25 models).",
    "keywords": [
      "Vehicle",
      "Titanic",
      "Fly",
      "Aircraft",
      "Transport",
      "Imperium",
      "Sokar-pattern Stormbird"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "spartan",
    "name": "Spartan",
    "points": [
      {
        "models": 1,
        "points": 300
      }
    ],
    "flavor": "An armoured transport of truly massive proportions, the Spartan is a heavy assault tank created to carry large numbers of troops into the very heart of enemy territory, shrugging off weapons fire that would annihilate lesser vehicles while its quad lascannons claim victims of their own.",
    "profiles": [
      {
        "name": "Spartan",
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
        "name": "Laser destroyer",
        "tags": [
          "HEAVY"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Quad lascannon",
        "tags": [],
        "range": "48\"",
        "a": "4",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Spartan"
    ],
    "loadout": "**This model is equipped with:** 2 quad lascannons; twin heavy bolter; armoured tracks.",
    "options": [
      "This model’s 2 quad lascannons can be replaced with 2 laser destroyers.",
      "This model’s twin heavy bolter can be replaced with 1 twin heavy flamer.",
      "This model can be equipped with one of the following:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter"
    ],
    "transport": "This model has a transport capacity of 28 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS, POSSESSED or TERMINATOR model takes up the space of 2 models and each CENTURION or OBLITERATOR model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Transport",
      "Smoke",
      "Spartan"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "stalker",
    "name": "Stalker",
    "points": [
      {
        "models": 1,
        "points": 140
      }
    ],
    "profiles": [
      {
        "name": "Stalker",
        "m": "9\"",
        "t": "11",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3"
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
        "name": "Icarus stormcannon",
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Skyfire Protocols",
        "text": "Each time you target this model with the Overwatch Stratagem just after an enemy unit that can FLY starts or ends a Normal, Advance or Fall Back move, when resolving that Stratagem, in addition to shooting that enemy unit, you can select up to three additional enemy units within 24\" of this model that can FLY; this model can also shoot at each of those units with its Icarus stormcannons (provided each one is an eligible target), but when doing so, an unmodified Hit roll of 6 is required to score a hit."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Stalker"
    ],
    "loadout": "**This model is equipped with:** 2 Icarus stormcannons; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Frame",
      "Imperium",
      "Stalker"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sternguard-veteran-squad",
    "name": "Sternguard Veteran Squad",
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
    "flavor": "Sternguard Veterans are possessed of an unshakeable calm, and are renowned amongst their brothers for their exemplary marksmanship in the fiercest battles. Proficient in all of the Chapter’s ranged weaponry, they can always be found where their pinpoint volleys will best shatter the foe.",
    "profiles": [
      {
        "name": "Sternguard Veteran Squad",
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
        "name": "Pyrecannon",
        "tags": [
          "IGNORES COVER",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+1",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Sternguard bolt pistol",
        "tags": [
          "DEVASTATING WOUNDS",
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
        "name": "Sternguard bolt rifle",
        "tags": [
          "ASSAULT",
          "DEVASTATING WOUNDS",
          "HEAVY",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Sternguard heavy bolter",
        "tags": [
          "DEVASTATING WOUNDS",
          "HEAVY",
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "4+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sternguard Focus",
        "text": "Each time a model in this unit makes an attack that targets your Oath of Moment target, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Sternguard Veteran Sergeant",
      "4-9 Sternguard Veterans"
    ],
    "loadout": "**Every model is equipped with:** Sternguard bolt pistol; Sternguard bolt rifle; close combat weapon.",
    "options": [
      "The Sternguard Veteran Sergeant’s Sternguard bolt rifle can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 combi-weapon\n▪ 1 power weapon\n▪ 1 power fist\n▪ 1 Astartes chainsword and 1 Sternguard bolt rifle*\n▪ 1 power weapon and 1 Sternguard bolt rifle*\n▪ 1 power fist and 1 Sternguard bolt rifle*\n* This model’s Sternguard bolt rifle cannot be replaced.",
      "Any number of Sternguard Veterans can each have their Sternguard bolt rifle replaced with 1 combi-weapon.",
      "For every 5 models in this unit, 1 Sternguard Veteran’s Sternguard bolt rifle can be replaced with one of the following:\n▪ 1 pyrecannon\n▪ 1 Sternguard heavy bolter",
      "* This model's Sternguard bolt rifle cannot be replaced."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Sternguard Veteran Squad",
      "Imperium",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "storm-eagle-gunship",
    "name": "Storm Eagle Gunship",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "flavor": "The Storm Eagle is a multi-purpose assault and transport vehicle capable of intra-orbital operations, combining generous troop capacity with hard-hitting firepower and excellent handling for a machine of its size. In recent years the number of Storm Eagles in active service has begun to increase, suggesting production has been restored at some as yet unknown location.",
    "profiles": [
      {
        "name": "Storm Eagle Gunship",
        "m": "-",
        "t": "10",
        "sv": "3+",
        "w": "18",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
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
        "name": "Twin hellstrike launcher",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "72\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6"
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
      },
      {
        "name": "Typhoon missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Typhoon missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Vengeance launcher",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Armoured Resilience",
        "text": "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Storm Eagle Gunship"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; 2 twin hellstrike launchers; vengeance launcher; armoured hull.",
    "options": [
      "This model’s twin heavy bolter can be replaced with one of the following:\n▪ 1 twin multi-melta\n▪ 1 typhoon missile launcher",
      "This model’s 2 twin hellstrike launchers can be replaced with 2 twin lascannons."
    ],
    "transport": "This model has a transport capacity of 22 ADEPTUS ASTARTES INFANTRY models and 1 DREADNOUGHT model. Each JUMP PACK, WULFEN, GRAVIS, TERMINATOR or POSSESSED model takes up the space of 2 models and each CENTURION or OBLITERATOR model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Fly",
      "Aircraft",
      "Transport",
      "Imperium",
      "Storm Eagle Gunship"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "storm-speeder-hailstrike",
    "name": "Storm Speeder Hailstrike",
    "points": [
      {
        "models": 1,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 115,
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
        "name": "Onslaught gatling cannon",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "range": "24\"",
        "a": "8",
        "bs": "3+",
        "s": "5",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Twin ironhail heavy stubber",
        "tags": [
          "RAPID FIRE 3",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "3",
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
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hailstrike",
        "text": "Each time this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks. Until the end of the phase, each time a friendly ADEPTUS ASTARTES unit makes a ranged attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per phase."
      }
    ],
    "composition": [
      "1 Storm Speeder Hailstrike"
    ],
    "loadout": "**This model is equipped with:** 2 fragstorm grenade launchers; onslaught gatling cannon; twin ironhail heavy stubber; close combat weapon.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Storm Speeder Hailstrike",
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
        "name": "Hammerstrike missile launcher",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "D6"
      },
      {
        "name": "Krakstorm grenade launcher",
        "tags": [],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Melta destroyer",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Hammerstrike",
        "text": "Each time this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover."
      }
    ],
    "composition": [
      "1 Storm Speeder Hammerstrike"
    ],
    "loadout": "**This model is equipped with:** Hammerstrike missile launcher; 2 krakstorm grenade launchers; melta destroyer; close combat weapon.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Storm Speeder Hammerstrike",
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
        "points": 135,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 145,
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
        "name": "Stormfury missiles",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "2+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Thunderstrike las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "2+",
        "s": "9",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Twin Icarus rocket pod",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "24\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
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
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Thunderstrike",
        "text": "Each time this model has shot, select one enemy MONSTER or VEHICLE unit hit by one or more of those attacks. Until the end of the phase, each time a friendly ADEPTUS ASTARTES unit makes a ranged attack that targets that enemy unit, add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1 Storm Speeder Thunderstrike"
    ],
    "loadout": "**This model is equipped with:** stormfury missiles; Thunderstrike las-talon; twin Icarus rocket pod; close combat weapon.",
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Storm Speeder Thunderstrike",
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
        "name": "Icarus stormcannon",
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
        "name": "Las-talon",
        "tags": [],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Skyhammer missile launcher",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "D3"
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
        "name": "Typhoon missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Typhoon missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Interceptor",
        "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Stormhawk Interceptor"
    ],
    "loadout": "**This model is equipped with:** twin assault cannon; skyhammer missile launcher; las-talon; armoured hull.",
    "options": [
      "This model’s skyhammer missile launcher can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 typhoon missile launcher",
      "This model’s las-talon can be replaced with 1 Icarus stormcannon."
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Smoke",
      "Stormhawk Interceptor",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
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
        "name": "Twin heavy plasma cannon – standard",
        "tags": [
          "BLAST",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Twin heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
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
      },
      {
        "name": "Typhoon missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Typhoon missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Armoured Resilience",
        "text": "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack."
      }
    ],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Stormraven Gunship"
    ],
    "loadout": "**This model is equipped with:** 2 stormstrike missile launchers; twin assault cannon; typhoon missile launcher; armoured hull.",
    "options": [
      "This model’s twin assault cannon can be replaced with one of the following:\n▪ 1 twin heavy plasma cannon\n▪ 1 twin lascannon",
      "This model’s typhoon missile launcher can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta",
      "This model can be equipped with 2 hurricane bolters."
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models and 1 Dreadnought model. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Stormraven Gunship",
      "Transport",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
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
        "name": "Skyhammer missile launcher",
        "tags": [
          "ANTI-FLY 2+",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "3",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "D3"
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
      },
      {
        "name": "Typhoon missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "2D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Typhoon missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Strafing Run",
        "text": "Each time this model makes a ranged attack that targets a unit that cannot FLY, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Stormtalon Gunship"
    ],
    "loadout": "**This model is equipped with:** skyhammer missile launcher; twin assault cannon; armoured hull.",
    "options": [
      "This model’s skyhammer missile launcher can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 twin lascannon\n▪ 1 typhoon missile launcher"
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Stormtalon Gunship",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "suboden-khan",
    "name": "Suboden Khan",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "A true son of Chogoris, Suboden Khan commands the White Scars First Brotherhood from the saddle of his grav bike, Thunder. A master of cavalry warfare, he leads his forces in epic hunts and sweeping advances, smashing through enemy lines and ruthlessly running down fleeing foes.",
    "profiles": [
      {
        "name": "Captain On Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "8",
        "ld": "6+",
        "oc": "2",
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
        "name": "Stormtooth",
        "tags": [
          "LANCE",
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power sword",
        "tags": [],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Spear of Chogoris",
        "text": "This model’s unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back. If that unit is already eligible to shoot and declare a charge in a turn in which it Advanced, add 1 to Advance and Charge rolls made for that unit instead."
      },
      {
        "name": "Skilled Riders",
        "text": "Each time a model in this model’s unit makes a Normal, Advance, Fall Back or Charge move, it can move horizontally through terrain features."
      }
    ],
    "composition": [
      "1 Suboden Khan – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 heavy bolt pistol; 1 onslaught gatling cannon; Stormtooth; power sword.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Company Veterans On Bikes",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Character",
      "Suboden Khan",
      "Captain",
      "Grenades",
      "Imperium",
      "Epic Hero",
      "Mounted"
    ],
    "factionKeywords": [
      "White Scars",
      "Adeptus Astartes"
    ],
    "baseSize": "90x52.5mm Oval Base"
  },
  {
    "id": "suppressor-squad",
    "name": "Suppressor Squad",
    "points": [
      {
        "models": 3,
        "points": 85
      }
    ],
    "flavor": "Girded in armour that can tolerate the vicious recoil of their weapons and the terrible stresses of grav-drops, Suppressors rapidly take up key positions on the battlefield. From there, they unleash deluges of armour-piercing rounds that decimate enemy infantry and force the survivors to dive for cover.",
    "profiles": [
      {
        "name": "Suppressor Squad",
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
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Suppression Fire",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks made with an accelerator autocannon. Until the start of your next turn, while this unit is on the battlefield, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "composition": [
      "1 Suppressor Sergeant",
      "2 Suppressors"
    ],
    "loadout": "**Every model is equipped with:** accelerator autocannon; bolt pistol; close combat weapon.",
    "keywords": [
      "Grenades",
      "Infantry",
      "Suppressor Squad",
      "Imperium",
      "Fly",
      "Jump Pack",
      "Smoke"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "tactical-squad",
    "name": "Tactical Squad",
    "points": [
      {
        "models": 10,
        "points": 140
      }
    ],
    "flavor": "Tactical Squads have formed the backbone of Space Marine Chapters for ten thousand years. With access to a wide range of weapons, they can purge swathes of enemy infantry, scour battlefields clean of heavily armoured foes or punch burning holes through tanks.",
    "profiles": [
      {
        "name": "Tactical Squad",
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
        "name": "Grav-cannon",
        "tags": [
          "ANTI-VEHICLE 2+",
          "HEAVY"
        ],
        "range": "24\"",
        "a": "3",
        "bs": "4+",
        "s": "6",
        "ap": "-1",
        "d": "3"
      },
      {
        "name": "Grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Lascannon",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
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
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST",
          "HEAVY"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [
          "HEAVY"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "9",
        "ap": "-2",
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
          "HEAVY",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "4+",
        "s": "8",
        "ap": "-3",
        "d": "2"
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
        "a": "2",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Thunder hammer",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "2",
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
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Combat Squads",
        "text": "At the start of the Declare Battle Formations step, before any units have been set up, this unit can be split into two units, each containing five models."
      }
    ],
    "composition": [
      "1 Tactical Sergeant",
      "9 Tactical Marines"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "1 Tactical Marine’s boltgun can be replaced with one of the following:\n▪ 1 flamer\n▪ 1 heavy bolter\n▪ 1 grav-cannon\n▪ 1 grav-gun\n▪ 1 lascannon\n▪ 1 meltagun\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon\n▪ 1 plasma gun",
      "1 Tactical Marine’s boltgun can be replaced with one of the following:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 meltagun\n▪ 1 plasma gun",
      "The Tactical Sergeant’s bolt pistol and boltgun can be replaced with 1 twin lightning claws, or two different weapons from the following list:*\n▪ 1 Astartes chainsword\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).",
      "* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol)."
    ],
    "keywords": [
      "Imperium",
      "Grenades",
      "Battleline",
      "Tactical Squad",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
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
        "name": "Tarantula air defence missiles",
        "tags": [
          "ANTI-FLY 2+",
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "4+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "abilities": [
      {
        "name": "Sentry Programming",
        "text": "You can target this model with the Fire Overwatch Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this turn. This model can only be targeted with that Stratagem once per turn."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Tarantula Air Defence Battery"
    ],
    "loadout": "**This model is equipped with:** Tarantula air defence missiles; armoured hull.",
    "options": [
      "None"
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Tarantula Air Defence Battery"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "name": "Twin heavy bolter",
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
        "name": "Twin lascannon",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "4+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "1",
        "ws": "6+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sentinel Protocols",
        "text": "Each time you select this unit for the Fire Overwatch Stratagem, hits are scored on unmodified Hit rolls of 4+ when resolving that Stratagem."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Tarantula Sentry Battery"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; armoured hull.",
    "options": [
      "This model’s twin heavy bolter can be replaced with 1 twin lascannon."
    ],
    "keywords": [
      "Vehicle",
      "Artillery",
      "Frame",
      "Imperium",
      "Tarantula Sentry Battery"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Forge bolter",
        "tags": [],
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
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "4",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Omnissian power axe",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Servo-arm",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Techmarine",
        "text": "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability."
      },
      {
        "name": "Blessing of the Omnissiah",
        "text": "In your Command phase, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model. That model regains up to D3 lost wounds and, until the start of your next Command phase, each time that Vehicle model makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per turn."
      },
      {
        "name": "Vengeance of the Omnissiah",
        "text": "If a friendly ADEPTUS ASTARTES VEHICLE model is destroyed within 12\" of this model, until the end of the battle, this model’s Omnissian power axe has an Attacks characteristic of 7."
      }
    ],
    "composition": [
      "1 Techmarine"
    ],
    "loadout": "**This model is equipped with:** forge bolter; grav-pistol; Omnissian power axe; servo-arm.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Crusader Squad",
        "Decimus Kill Team",
        "Desolation Squad",
        "Devastator Squad",
        "Fortis Kill Team",
        "Intercessor Squad",
        "Long Fangs",
        "Sword Brethren Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "keywords": [
      "Tacticus",
      "Techmarine",
      "Grenades",
      "Character",
      "Infantry",
      "Imperium"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "techmarine-on-bike",
    "name": "Techmarine on Bike",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "profiles": [
      {
        "name": "Techmarine on Bike",
        "m": "12\"",
        "t": "5",
        "sv": "3+",
        "w": "5",
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
        "name": "Conversion beamer",
        "tags": [
          "CONVERSION",
          "SUSTAINED HITS D3"
        ],
        "range": "24\"",
        "a": "1",
        "bs": "3+",
        "s": "8",
        "ap": "-1",
        "d": "2"
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
        "name": "Astartes chainsword",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Omnissian power axe",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma cutter",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power fist",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Servo arm",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "1",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
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
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Techmarine",
        "text": "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability."
      },
      {
        "name": "Blessing of the Omnissiah",
        "text": "In your Command phase, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model. That model regains up to D3 lost wounds and, until the start of your next Command phase, each time that VEHICLE model makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per turn."
      },
      {
        "name": "Vengeance of the Omnissiah",
        "text": "If a friendly ADEPTUS ASTARTES VEHICLE model is destroyed within 12\" of this model, until the end of the battle, this model’s Omnissian power axe has an Attacks characteristic of 7."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Conversion",
        "text": "Each time an attack is made with this weapon, if the target is more than 12\" from the bearer, an unmodified successful Hit roll of 4+ scores a Critical Hit."
      }
    ],
    "composition": [
      "1 Techmarine on Bike"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; twin boltgun; Omnissian power axe.",
    "options": [
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 grav-pistol\n▪ 1 plasma pistol*\n▪ 1 storm bolter",
      "This model’s Omnissian power axe can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 thunder hammer",
      "This model must be equipped with one of the following:\n▪ 1 servo arm\n▪ 1 conversion beamer\n▪ 1 flamer, 1 plasma cutter and 2 servo-arms\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Bike Squad",
        "Outrider Squad"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Techmarine"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "terminator-assault-squad",
    "name": "Terminator Assault Squad",
    "points": [
      {
        "models": 5,
        "points": 155
      },
      {
        "models": 10,
        "points": 310
      }
    ],
    "flavor": "Terminator Assault Squads are armed with devastating close-combat weaponry perfect for ferocious assaults and savage boarding actions. They rush to engage the enemy’s greatest warriors, shredding the foe with lightning claws or shattering their skulls with thunder hammers.",
    "profiles": [
      {
        "name": "Terminator Assault Squad",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Thunder hammer",
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
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Teleport Homer",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not in your opponent’s deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3\" horizontally of that token and not within 8\" horizontally of any enemy models. That token is then removed."
      },
      {
        "name": "Terminatus Assault",
        "text": "At the start of the Fight phase, each enemy unit within Engagement Range of this unit must take a Battle-shock test."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "1 Assault Terminator Sergeant",
      "4-9 Assault Terminators"
    ],
    "loadout": "**Every model is equipped with:** thunder hammer; storm shield.",
    "options": [
      "Any number of models can each have their thunder hammer and storm shield replaced with 1 twin lightning claws."
    ],
    "keywords": [
      "Imperium",
      "Infantry",
      "Terminator",
      "Terminator Assault Squad"
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
        "points": 160
      },
      {
        "models": 10,
        "points": 320
      }
    ],
    "flavor": "Terminator armour is a marvel of technology that enables its wearer to survive anything, from the stresses of teleportation to earth-shaking artillery bombardments. So equipped, Terminator Squads can appear in the midst of the foe or stride unstoppably across the field towards them, firing their weapons all the while.",
    "profiles": [
      {
        "name": "Terminator Squad",
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
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Teleport Homer",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not in your opponent’s deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3\" horizontally of that token and not within 8\" horizontally of any enemy models. That token is then removed."
      },
      {
        "name": "Fury of the First",
        "text": "Each time a model in this unit makes an attack that targets your Oath of Moment target, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Terminator Sergeant",
      "4-9 Terminators"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; power fist.",
    "options": [
      "For every 5 models in this unit, 1 Terminator’s storm bolter can be replaced with one of the following:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 cyclone missile launcher and 1 storm bolter.*\n* This model’s storm bolter cannot be replaced.",
      "Any number of models can each have their power fist replaced with 1 chainfist.",
      "The Terminator Sergeant’s power fist can be replaced with 1 power weapon.",
      "* This model’s storm bolter cannot be replaced."
    ],
    "keywords": [
      "Imperium",
      "Terminator Squad",
      "Terminator",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "terminus-ultra",
    "name": "Terminus Ultra",
    "points": [
      {
        "models": 1,
        "points": 285
      }
    ],
    "profiles": [
      {
        "name": "Terminus Ultra",
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
      },
      {
        "name": "Terminus lascannon – overload",
        "tags": [
          "HAZARDOUS",
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+3"
      },
      {
        "name": "Terminus lascannon – standard",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Terminus Ultra"
    ],
    "loadout": "**This model is equipped with:** 3 Terminus lascannons; 2 lascannons; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Transport",
      "Frame",
      "Imperium",
      "Terminus Ultra"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
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
        "name": "Combi-bolter",
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
        "name": "Terrax melta cutter",
        "tags": [
          "MELTA 2"
        ],
        "range": "12\"",
        "a": "5",
        "bs": "3+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      },
      {
        "name": "Twin volkite charger",
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
        "name": "Termite drill",
        "tags": [
          "ANTI-VEHICLE 3+"
        ],
        "a": "6",
        "ws": "4+",
        "s": "14",
        "ap": "-2",
        "d": "D3+3"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Termite Assault",
        "text": "This model must start the battle in Reserves, but neither it nor any units embarked within it are counted towards any limits placed on the maximum number of Reserves units you can start the battle with. This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model can disembark after it has been set up on the battlefield, and if they do they must be set up more than 9\" away from all enemy models."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Terrax-pattern Termite"
    ],
    "loadout": "**This model is equipped with:** Terrax melta cutter; 2 combi-bolters; Termite drill.",
    "options": [
      "This model’s 2 combi-bolters can be replaced with one of the following:\n▪ 2 heavy flamers\n▪ 2 twin volkite chargers"
    ],
    "transport": "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, WULFEN, PHOBOS, GRAVIS, CENTURION, TERMINATOR, OBLITERATOR, POSSESSED or TACTICUS models (excluding TACTICUS CHARACTER models that began the battle attached to a non-TACTICUS unit).",
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Transport",
      "Dedicated Transport",
      "Terrax-pattern Termite"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "thunderfire-cannon",
    "name": "Thunderfire Cannon",
    "points": [
      {
        "models": 2,
        "points": 90
      }
    ],
    "profiles": [
      {
        "name": "Thunderfire Cannon",
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
        "name": "Thunderfire cannon",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "D6+4",
        "bs": "3+",
        "s": "5",
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
        "name": "Gunner’s servo-arms",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Plasma cutter",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "2",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tremor Shells",
        "text": "In your Shooting phase, after this unit has shot, if an enemy INFANTRY unit was hit by one or more attacks made by this unit’s thunderfire cannon this phase, until the end of your opponent’s next turn, that enemy unit is shaken. While a unit is shaken, subtract 2 from that unit’s Move characteristic, and subtract 2 from Advance and Charge rolls made for that unit."
      },
      {
        "name": "Crewed Artillery",
        "text": "If one model in this unit is destroyed, the remaining model in this unit is also destroyed."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Techmarine Gunner",
      "1 Thunderfire Cannon"
    ],
    "loadout": "**The Techmarine Gunner is equipped with:** bolt pistol; flamer; plasma cutter; Gunner’s servo-arms; close combat weapon.\n\n**The Thunderfire Cannon is equipped with:** thunderfire cannon; close combat weapon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Artillery",
      "Vehicle",
      "Frame",
      "Imperium",
      "Thunderfire Cannon"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "thunderhawk-gunship",
    "name": "Thunderhawk Gunship",
    "points": [
      {
        "models": 1,
        "points": 840
      }
    ],
    "flavor": "Thunderhawk Gunships have served the Space Marines with distinction since the Great Crusade, combining the roles of orbital troop lander, heavy gunship and medium bomber. Thunderhawks are formidably armed for their size, with a main gun derived from frigate-class warships and a host of additional weapons.",
    "profiles": [
      {
        "name": "Thunderhawk Gunship",
        "m": "20+\"",
        "t": "12",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Hellstrike missile battery",
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
        "d": "D6+1"
      },
      {
        "name": "Thunderhawk heavy cannon",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Turbo-laser destructor",
        "tags": [
          "BLAST"
        ],
        "range": "96\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "20",
        "ap": "-4",
        "d": "D6+6"
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
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6+2, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Aerial Assault",
        "text": "Each time a unit with the Deep Strike ability disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Thunderhawk Cluster Bombs",
        "text": "Each time the bearer ends a Normal move, you can select one enemy unit it moved over during that move and roll six D6: for each 3+, that unit suffers 1 mortal wound."
      }
    ],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Thunderhawk Gunship"
    ],
    "loadout": "**This model is equipped with:** 2 lascannons; Thunderhawk heavy cannon; 4 twin heavy bolters; armoured hull; Thunderhawk cluster bombs.",
    "options": [
      "This model’s Thunderhawk heavy cannon can be replaced with 1 turbo-laser destructor.",
      "This model’s Thunderhawk cluster bombs can be replaced with 1 hellstrike missile battery."
    ],
    "transport": "This model has a transport capacity of 30 Adeptus Astartes Infantry or Adeptus Astartes Mounted models. Each Jump Pack, Wulfen, Gravis or Terminator model takes up the space of 2 models. Each Centurion model takes up the space of 3 models. Each MOUNTED model takes up the space of 4 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Thunderhawk Gunship",
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
    "id": "thunderhawk-transporter",
    "name": "Thunderhawk Transporter",
    "points": [
      {
        "models": 1,
        "points": 495
      }
    ],
    "profiles": [
      {
        "name": "Thunderhawk Transporter",
        "m": "20\"",
        "t": "12",
        "sv": "2+",
        "w": "30",
        "ld": "6+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Hellstrike missile battery",
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
      }
    ],
    "melee": [
      {
        "name": "Armoured hull",
        "tags": [],
        "a": "8",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6+2, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Aerial Deployment",
        "text": "If this model starts the game in Hover mode and in Strategic Reserves, it can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-10 wounds remaining",
      "text": "While this model has 1-10 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Thunderhawk Transporter"
    ],
    "loadout": "**This model is equipped with:** hellstrike missile battery; 4 twin heavy bolters; armoured hull.",
    "options": [
      "None"
    ],
    "transport": "This model has a transport capacity of 15 ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED models. Each JUMP PACK, WULFEN, GRAVIS or TERMINATOR model takes up the space of 2 models. Each CENTURION model takes up the space of 3 models. Each MOUNTED model takes up the space of 4 models. This model can also transport up to 2 ADEPTUS ASTARTES VEHICLE models (excluding AIRCRAFT and TITANIC models). Models embarked within TRANSPORT VEHICLES that are themselves being transported by this model do not count towards the transport capacity of this model.",
    "keywords": [
      "Vehicle",
      "Titanic",
      "Fly",
      "Aircraft",
      "Transport",
      "Imperium",
      "Thunderhawk Transporter"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "tor-garadon",
    "name": "Tor Garadon",
    "points": [
      {
        "models": 1,
        "points": 80
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
        "name": "Artificer grav-gun",
        "tags": [
          "ANTI-VEHICLE 2+"
        ],
        "range": "18\"",
        "a": "2",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Signum Array",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability."
      },
      {
        "name": "Siege Captain",
        "text": "Each time this model makes an attack that targets a MONSTER, VEHICLE, or FORTIFICATION unit, improve the Strength, Armour Penetration and Damage characteristics of that attack by 2."
      }
    ],
    "composition": [
      "1 Tor Garadon – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** artificer grav-gun; Hand of Defiance.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Aggressor Squad",
        "Eradicator Squad",
        "Heavy Intercessor Squad"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Captain",
      "Tor Garadon",
      "Gravis",
      "Imperium",
      "Epic Hero"
    ],
    "factionKeywords": [
      "Imperial Fists",
      "Adeptus Astartes"
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
        "name": "Dreadhammer siege cannon",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6+6",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
      },
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
        "name": "Lascannon",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
        "name": "Armoured tracks",
        "tags": [],
        "a": "6",
        "ws": "4+",
        "s": "8",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D6",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Sunderer of Fortresses",
        "text": "Each time this model makes an attack that targets a VEHICLE, improve the Strength and Damage characteristic of that attack by 1 (if that attack targets a FORTIFICATION unit, improve the Strength and Damage characteristics of that attack by 2 instead)."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-6 wounds remaining",
      "text": "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Typhon"
    ],
    "loadout": "**This model is equipped with:** dreadhammer siege cannon; armoured tracks.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 2 heavy bolters\n▪ 2 lascannons",
      "This model can be equipped with one of the following:\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 multi-melta\n▪ 1 storm bolter"
    ],
    "keywords": [
      "Vehicle",
      "Frame",
      "Imperium",
      "Smoke",
      "Typhon"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "tyrannic-war-veterans",
    "name": "Tyrannic War Veterans",
    "points": [
      {
        "models": 5,
        "points": 85
      }
    ],
    "profiles": [
      {
        "name": "Tyrannic War Veterans",
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
          "ANTI-TYRANIDS 4+",
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
          "ANTI-TYRANIDS 4+"
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
        "tags": [
          "ANTI-TYRANIDS 4+"
        ],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tyrannic War Veterans",
        "text": "Weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability when targeting TYRANIDS units."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Veteran Sergeant",
      "4 Tyrannic War Veterans"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Tyrannic War Veterans"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "uriel-ventris",
    "name": "Uriel Ventris",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Skilled warrior and masterful leader, Uriel Ventris is one of the Ultramarines’ most capable commanders – if a maverick one. Having served in the Deathwatch before becoming Captain, he has absorbed the strategies of battle-brothers from a host of other Chapters, giving him a breadth of tactical insight exceeding that of many of his peers.",
    "profiles": [
      {
        "name": "Uriel Ventris",
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
      },
      {
        "name": "Invictus",
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
        "name": "Sword of Idaeus",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Unorthodox Strategist",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, this model can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP."
      },
      {
        "name": "Master of the Fleet",
        "text": "During the Declare Battle Formations step, if your army includes this model, select one PHOBOS, GRAVIS or TACTICUS ADEPTUS ASTARTES INFANTRY unit from your army. That unit gains the Deep Strike ability."
      }
    ],
    "composition": [
      "1 Uriel Ventris – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Invictus; Sword of Idaeus.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Command Squad",
        "Company Heroes",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Tactical Squad",
        "Vanguard Veteran Squad",
        "Victrix Honour Guard"
      ]
    },
    "keywords": [
      "Uriel Ventris",
      "Character",
      "Epic Hero",
      "Imperium",
      "Tacticus",
      "Infantry",
      "Captain"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Ultramarines"
    ],
    "baseSize": "40mm"
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
        "name": "Vanguard Veteran Squad",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Heirloom weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Vanguard Assault",
        "text": "Each time this unit ends a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "rules": [
      {
        "name": "ATTACHED UNITS",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to an Assault Intercessor Squad, it can also be attached to this unit."
      }
    ],
    "composition": [
      "1 Vanguard Veteran Sergeant",
      "4-9 Vanguard Veterans"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; heirloom weapon.",
    "options": [
      "Any number of models can each have their bolt pistol replaced with one of the following:\n▪ 1 storm shield\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Vanguard Veteran Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "vanguard-veteran-squad-with-jump-packs",
    "name": "Vanguard Veteran Squad with Jump Packs",
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
        "points": 115,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 220,
        "note": "3rd+"
      }
    ],
    "flavor": "On the battlefield, Vanguard Veteran Squads with jump packs are peerless rapid- response troops as well as line-breakers. With great plumes of fire extending behind them they can arrive at the perfect time and place to ensure the decisiveness of an assault or utterly break an enemy incursion.",
    "profiles": [
      {
        "name": "Vanguard Veteran Squad with Jump Packs",
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
        "name": "Grav-pistol",
        "tags": [
          "ANTI-VEHICLE 2+",
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
        "d": "2"
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
        "name": "Heavy Bolt Pistol",
        "tags": [
          "CLOSE-QUARTERS"
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
        "name": "Vanguard Veteran weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted Power Weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Vanguard Assault",
        "text": "Each time this unit ends a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [LETHAL HITS] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Vanguard Veteran Sergeant with Jump Pack",
      "4-9 Vanguard Veterans with Jump Packs"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Vanguard Veteran weapon.",
    "options": [
      "Any number of models can each have their bolt pistol replaced one of the following:\n▪ 1 storm shield\n▪ 1 grav-pistol\n▪ 1 hand flamer\n▪ 1 inferno pistol\n▪ 1 plasma pistol",
      "All models can each have their bolt pistol and Vanguard Veteran weapon replaced with 1 Heavy Bolt Pistol and 1 Master-crafted Power Weapon.",
      "For every 5 models in this unit, 1 model can replace their Heavy Bolt Pistol with 1 plasma pistol."
    ],
    "keywords": [
      "Fly",
      "Vanguard Veteran Squad",
      "Infantry",
      "Jump Pack",
      "Grenades",
      "Vanguard Veteran Squad with Jump Packs",
      "Imperium"
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
        "name": "Dreadnought inferno cannon",
        "tags": [
          "IGNORES COVER",
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
        "name": "Heavy plasma cannon – standard",
        "tags": [
          "BLAST"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Heavy plasma cannon – supercharge",
        "tags": [
          "BLAST",
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Missile launcher – frag",
        "tags": [
          "BLAST"
        ],
        "range": "48\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Missile launcher – krak",
        "tags": [],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
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
      },
      {
        "name": "Twin autocannon",
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
        "name": "Twin heavy flamer",
        "tags": [
          "IGNORES COVER",
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "5",
        "ap": "-1",
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
        "name": "Armoured feet",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Wisdom of the Ancients (Aura)",
        "text": "While a friendly ADEPTUS ASTARTES INFANTRY unit is within 6\" of this model, each time a model in that unit makes an attack, re-roll a Hit roll of 1."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Venerable Dreadnought"
    ],
    "loadout": "**This model is equipped with:** assault cannon; storm bolter; armoured feet; Dreadnought combat weapon.",
    "options": [
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 heavy plasma cannon*\n▪ 1 multi-melta\n▪ 1 twin autocannon\n▪ 1 twin heavy bolter\n▪ 1 twin heavy flamer\n▪ 1 twin lascannon\n▪ 1 Dreadnought inferno cannon",
      "This model’s storm bolter and Dreadnought combat weapon can be replaced with one of the following:\n▪ 1 heavy flamer and 1 Dreadnought combat weapon\n▪ 1 missile launcher*\n▪ 1 twin autocannon\n* The profile for this weapon can be found on the Adeptus Astartes Legends Armoury card."
    ],
    "keywords": [
      "Vehicle",
      "Walker",
      "Smoke",
      "Imperium",
      "Venerable",
      "Dreadnought"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "victrix-honour-guard",
    "name": "Victrix Honour Guard",
    "points": [
      {
        "models": 3,
        "points": 110,
        "note": "1st"
      },
      {
        "models": 6,
        "points": 230,
        "note": "1st"
      },
      {
        "models": 3,
        "points": 130,
        "note": "2nd+"
      },
      {
        "models": 6,
        "points": 250,
        "note": "2nd+"
      }
    ],
    "flavor": "Composed of First Company veterans who demonstrate measured statecraft and peerless skill at arms, the Victrix Honour Guard serve as bodyguards for the Chapter’s senior officers. Chosen for their selflessness in battle, the warriors of the Victrix Honour Guard will gladly lay down their lives to protect their charges.",
    "profiles": [
      {
        "name": "Victrix Honour Guard",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "2"
      }
    ],
    "ranged": [
      {
        "name": "Master-crafted bolt carbine",
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
        "name": "Blades of honour",
        "tags": [
          "PRECISION",
          "TWIN-LINKED"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Ultramarines Honour Guard",
        "text": "While a Captain or Chapter Master model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll."
      },
      {
        "name": "Glory of Ultramar",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed by those attacks, this unit can make a surge move of up to D6\"."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Banner of Macragge",
        "text": "Once per battle, at the start of the Fight phase, the bearer can use this ability. If it does, until the end of the phase, add 1 to the Strength and Attacks characteristics of melee weapons equipped by models in the bearer’s unit."
      }
    ],
    "specialAbilities": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Captain or Chapter Master unit from your army can be attached to a Company Heroes unit, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "0-1 Chapter Ancient – EPIC HERO",
      "0-1 Chapter Champion – EPIC HERO",
      "1-6 Victrix Honour Guard"
    ],
    "loadout": "**The Chapter Ancient is equipped with:** 1 master-crafted power weapon; banner of Macragge.\n\n**The Chapter Champion is equipped with:** 1 blades of honour.\n\n**Each Victrix Honour Guard model is equipped with:** 1 master-crafted bolt carbine; 1 master-crafted power weapon.",
    "keywords": [
      "Ancient",
      "Champion",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Tacticus",
      "Victrix Honour Guard"
    ],
    "factionKeywords": [
      "Ultramarines",
      "Adeptus Astartes"
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
        "name": "Demolisher cannon",
        "tags": [
          "BLAST"
        ],
        "range": "24\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6"
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
        "name": "Siege Shield",
        "text": "When making ranged attacks with its demolisher cannon, this model can target enemy units within Engagement Range of it (provided no other friendly units are also within Engagement Range of that enemy unit). In addition, when making ranged attacks, this model does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Vindicator"
    ],
    "loadout": "**This model is equipped with:** demolisher cannon; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vindicator",
      "Imperium",
      "Smoke",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "vindicator-laser-destroyer",
    "name": "Vindicator Laser Destroyer",
    "points": [
      {
        "models": 1,
        "points": 175
      }
    ],
    "flavor": "Eschewing the more indiscriminate firepower of the demolisher cannon, Vindicators fitted with laser destroyers are specialised for the pinpoint destruction of enemy armour. This weapon was first combined with the heavily armoured Deimos chassis during the dark days of the Horus Heresy, and the Vindicator Laser Destroyer’s reputation as a deadly tank-hunter has endured ever since.",
    "profiles": [
      {
        "name": "Vindicator Laser Destroyer",
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
        "name": "Laser volley cannon – overcharge fire",
        "tags": [
          "HAZARDOUS"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "14",
        "ap": "-4",
        "d": "D6+3"
      },
      {
        "name": "Laser volley cannon – volley fire",
        "tags": [],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Annihilator",
        "text": "Each time this model makes a ranged attack that targets a MONSTER or VEHICLE unit, re-roll a Damage roll of 1."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Vindicator Laser Destroyer"
    ],
    "loadout": "**This model is equipped with:** laser volley cannon; storm bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Frame",
      "Imperium",
      "Vindicator Laser Destroyer"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "vulkan-hestan",
    "name": "Vulkan He’stan",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "Striding into battle with the weapons of his Primarch in his hands, the Forgefather lays low all who oppose him. Seeker of the lost relics of Vulkan, He’stan is relentless in his quest, willing to fight through any foe and face down any danger in order to see his oaths fulfilled.",
    "profiles": [
      {
        "name": "Vulkan He’stan",
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
      },
      {
        "name": "Gauntlet of the Forge",
        "tags": [
          "IGNORES COVER",
          "PISTOL",
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+3",
        "bs": "N/A",
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
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Feel No Pain 6+, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Commander",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in INFERNUS SQUAD units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      },
      {
        "name": "Forgefather",
        "text": "In your Shooting phase, select one enemy unit within 24\" of and visible to this model. Until the end of the phase, each time a friendly ADEPTUS ASTARTES model makes a ranged attack with a Torrent or Melta weapon that targets that enemy unit, you can re-roll the Wound roll."
      },
      {
        "name": "Seeker of the Unfound",
        "text": "The first time this model is set up on the battlefield, select one objective marker on the battlefield. While this model is within range of that objective marker, this model has an Objective Control characteristic of 10, a Leadership characteristic of 5+ and the Feel No Pain 4+ ability."
      }
    ],
    "specialAbilities": [
      {
        "name": "INSPIRING COMMANDER",
        "text": "If you include this model in your army, until the end of the battle, non-CHARACTER models in Infernus Squad units from your army have an Objective Control characteristic of 2 while they are not Battle-shocked."
      }
    ],
    "composition": [
      "1 Vulkan He’stan – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** 1 bolt pistol; 1 Gauntlet of the Forge; 1 Spear of Vulkan.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Command Squad",
        "Company Heroes",
        "Infernus Squad",
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
      "Tacticus",
      "Vulkan He’stan",
      "Captain"
    ],
    "factionKeywords": [
      "Salamanders",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wardens-of-ultramar",
    "name": "Wardens of Ultramar",
    "points": [
      {
        "models": 6,
        "points": 120
      }
    ],
    "flavor": "Though usually seeded through the leadership strata of Captain Titus’ armies, his closest counsellors and comrades fight by his side as one when the situation demands. At such times they combine transhuman might, inspirational magnificence, martial excellence, psychic might and sheer cunning in a potent alloy greater than the sum of its parts.",
    "profiles": [
      {
        "name": "Ancient Gadriel, Veteran Sergeant Metaurus",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "baseSize": "40mm"
      },
      {
        "name": "Gaius Silva, Aemelia Minervas, Dainal Kornelius, Lucia Vestha",
        "m": "6\"",
        "t": "3",
        "sv": "4+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "baseSize": "28.5mm"
      }
    ],
    "ranged": [
      {
        "name": "Archeotech laspistol",
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
        "name": "Astropathic Blast",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "3+",
        "s": "4",
        "ap": "-1",
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
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Force stave",
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "2+",
        "s": "4",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Second Company Banner",
        "text": "While this unit contains Ancient Gadriel, add 1 to the Objective Control characteristic of models in this unit. While this unit contains Ancient Gadriel and Captain Titus, improve the Leadership characteristic of models in this unit by 1 as well."
      },
      {
        "name": "Strategium Command",
        "text": "After both players have deployed their armies, if this unit is on the battlefield (or any TRANSPORT it is embarked within is on the battlefield), select up to three ADEPTUS ASTARTES units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Refractor Field",
        "text": "The bearer has a 5+ invulnerable save."
      },
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Assault Squad",
        "Bladeguard Veteran Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Vanguard Veteran Squad"
      ]
    },
    "composition": [
      "1 Ancient Gadriel – EPIC HERO",
      "1 Veteran Sergeant Metaurus – EPIC HERO",
      "1 Gaius Silva – EPIC HERO",
      "1 Aemelia Minervas – EPIC HERO",
      "1 Dainal Kornelius – EPIC HERO",
      "1 Lucia Vestha – EPIC HERO"
    ],
    "loadout": "**Ancient Gadriel is equipped with:** bolt rifle; close combat weapon.\n\n**Veteran Sergeant Metaurus is equipped with:** heavy bolt pistol; master-crafted power weapon; storm shield.\n\n**Gaius Silva is equipped with:** archeotech laspistol; power weapon; refractor field.\n\n**Aemelia Minervas is equipped with:** archeotech laspistol; power weapon.\n\n**Dainal Kornelius is equipped with:** Astropathic Blast; force stave.\n\n**Lucia Vestha is equipped with:** archeotech laspistol; close combat weapon.",
    "keywords": [
      "Tacticus",
      "Imperium",
      "Grenades",
      "Epic Hero",
      "Infantry",
      "Wardens of Ultramar",
      "Psyker"
    ],
    "factionKeywords": [
      "Ultramarines",
      "Adeptus Astartes"
    ]
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
        "name": "Whirlwind vengeance launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "72\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
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
        "name": "Pinning Bombardment",
        "text": "In your Shooting phase, after this model has shot, if one or more of those attacks made with its Whirlwind vengeance launcher scored a hit against an enemy INFANTRY unit, that unit must take a Battle-shock test."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Whirlwind"
    ],
    "loadout": "**This model is equipped with:** Whirlwind vengeance launcher; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Smoke",
      "Imperium",
      "Whirlwind",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "whirlwind-scorpius",
    "name": "Whirlwind Scorpius",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "The Scorpius is a Whirlwind variant designed during the Horus Heresy to engage heavily armoured infantry. As such, surviving examples are a direct and bitter reminder of the mass fratricide that consumed the Emperor’s Legions. The tank’s launch system, targeting mechanisms and ammunition feed are unlike any other model in common use in the 41st Millennium, and are therefore held in awe by Tech-Priests and Techmarines alike.",
    "profiles": [
      {
        "name": "Whirlwind Scorpius",
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
        "name": "Scorpius multi-launcher",
        "tags": [
          "BLAST",
          "INDIRECT FIRE"
        ],
        "range": "48\"",
        "a": "2D3+3",
        "bs": "3+",
        "s": "6",
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
        "name": "Pinning Bombardment",
        "text": "In your Shooting phase, after this model has shot, if one or more of those attacks made with its Scorpius multi-launcher scored a hit against an enemy INFANTRY unit, that unit must take a Battle-shock test."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Whirlwind Scorpius"
    ],
    "loadout": "**This model is equipped with:** Scorpius multi-launcher; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter."
    ],
    "keywords": [
      "Vehicle",
      "Smoke",
      "Frame",
      "Imperium",
      "Whirlwind Scorpius"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "xiphon-interceptor",
    "name": "Xiphon Interceptor",
    "points": [
      {
        "models": 1,
        "points": 115
      }
    ],
    "flavor": "Xiphon-pattern Interceptors are sleek Space Marine combat flyers with an ancient lineage, designed to excel in both void missions and atmospheric strikes. Fitted with a potent combination of lascannons and intelligent warheads, there are few targets the Xiphon cannot reduce to smouldering wreckage.",
    "profiles": [
      {
        "name": "Xiphon Interceptor",
        "m": "-",
        "t": "9",
        "sv": "3+",
        "w": "12",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
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
      },
      {
        "name": "Xiphon missile battery",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "60\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "3"
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
    "core": "Deadly Demise D3",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Interceptor",
        "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Xiphon Interceptor"
    ],
    "loadout": "**This model is equipped with:** 2 twin lascannons; Xiphon missile battery; armoured hull.",
    "options": [
      "None"
    ],
    "keywords": [
      "Vehicle",
      "Fly",
      "Aircraft",
      "Imperium",
      "Xiphon Interceptor"
    ],
    "factionKeywords": [
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  }
]
