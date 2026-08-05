// Grey Knights — datasheets. Unit roster and points from src/data/mfm/grey-knights.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
export default [
  {
    "id": "brother-captain",
    "name": "Brother-captain",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "As the strong left hands of their Grand Masters, the Brother-Captains are seasoned battlefield commanders and potent warriors. They turn their prodigious psychic gifts to the swift annihilation of their enemies, augmenting their battle-brothers’ strength, sensing the foe’s hidden weaknesses, and setting an uncompromising example to those who follow them.",
    "profiles": [
      {
        "name": "Brother-captain",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Hammerhand (Psychic)",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Eye of Judgement (Psychic)",
        "text": "Each time this model makes an attack, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Brother-Captain"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "This model’s storm bolter can be replaced with one of the following:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Brotherhood Terminator Squad",
        "Paladin Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Psyker",
      "Grenades",
      "Terminator",
      "Imperium",
      "Brother-Captain"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "brotherhood-champion",
    "name": "Brotherhood Champion",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "A Brotherhood Champion acts as an exemplar of martial prowess to which all Grey Knights aspire. He is a warrior of peerless skill who mentors recruits in the ways of the blade. Upon the battlefield, these singular warriors set a merciless example to their brothers, singling out the war leaders of the enemy host and cutting them down in brutal duels where only victory matters.",
    "profiles": [
      {
        "name": "Brotherhood Champion",
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
        "name": "Nemesis force weapon",
        "tags": [
          "PRECISION",
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Clarion of Haste (Psychic)",
        "text": "While this model is leading a unit, that unit is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Inspiring Exemplar",
        "text": "Each time this model destroys an enemy CHARACTER model in the Fight phase, you gain 1CP and until the end of the battle, add 1 to the Attacks characteristic of its Nemesis force weapon."
      }
    ],
    "composition": [
      "1 Brotherhood Champion"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Nemesis force weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Strike Squad",
        "Purgation Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Psyker",
      "Brotherhood Champion",
      "Imperium",
      "Character",
      "Grenades"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "brotherhood-chaplain",
    "name": "Brotherhood Chaplain",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Chaplains safeguard the spiritual sanctity of their battle-brothers and the Chapter as a whole. They chant liturgies of sacred fortitude and unmerciful zeal, projecting these both in the form of stentorian, vox-amplified oration and through telepathic sorcery directly into the minds of their fellows. In this way, the Chaplains help to bolster the Grey Knights’ already formidable resolve.",
    "profiles": [
      {
        "name": "Brotherhood Chaplain",
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
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Zealous Path",
        "text": "While this model is leading a unit, you can re-roll Charge rolls made for that unit."
      },
      {
        "name": "Litanies of Sanctity",
        "text": "Once per battle, at the start of any phase, you can select one friendly Grey Knights unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked."
      }
    ],
    "composition": [
      "1 Brotherhood Chaplain"
    ],
    "loadout": "**This model is equipped with:** storm bolter; crozius arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Brotherhood Terminator Squad",
        "Paladin Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Brotherhood Chaplain",
      "Imperium",
      "Terminator",
      "Psyker",
      "Character"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "brotherhood-librarian",
    "name": "Brotherhood Librarian",
    "points": [
      {
        "models": 1,
        "points": 90,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 100,
        "note": "2nd+"
      }
    ],
    "flavor": "Even in a Chapter of potent psykers, the Grey Knights’ Librarians wield the energies of the Warp with exacting control and devastating power. Even as they shield their battle-brothers with whirling storms of psychic flame and the warding sigils wrought into their arcane wargear, the Librarians gather their true might before unleashing it in vortices of devastating sorcerous annihilation.",
    "profiles": [
      {
        "name": "Brotherhood Librarian",
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
        "name": "Vortex of Doom",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "D6+3",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Sanctic Hood",
        "text": "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
      },
      {
        "name": "Haloed in Soulfire (Psychic)",
        "text": "While this model is leading a unit, that unit can only be selected as the target of an attack if the attacking model is within 18\"."
      }
    ],
    "composition": [
      "1 Brotherhood Librarian"
    ],
    "loadout": "**This model is equipped with:** Nemesis force weapon; Vortex of Doom.",
    "options": [
      "This model can be equipped with one of the following:\n▪ 1 combi-weapon\n▪ 1 storm bolter"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Paladin Squad",
        "Brotherhood Terminator Squad"
      ]
    },
    "keywords": [
      "Brotherhood Librarian",
      "Imperium",
      "Psyker",
      "Terminator",
      "Infantry",
      "Character"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "brotherhood-techmarine",
    "name": "Brotherhood Techmarine",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "On those occasions when their duties take them to the battlefield, the Grey Knights’ Techmarines turn all their arcane engineering lore to preserving their Chapter’s irreplaceable war machines. Relying more upon the gifts of the Omnissiah than the psychic talents employed so widely by their brothers, the Techmarines wield potent blades and firearms against the foe.",
    "profiles": [
      {
        "name": "Brotherhood Techmarine",
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
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Techmarine",
        "text": "While this model is within 3\" of one or more friendly Grey Knights Vehicle units, this model has the Lone Operative ability."
      },
      {
        "name": "Blessing of the Omnissiah",
        "text": "In your Command phase, you can select one friendly Grey Knights Vehicle model within 3\" of this model. That model regains up to D3 lost wounds and, until the start of your next Command phase, each time that VEHICLE model makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per turn."
      },
      {
        "name": "Guardians of the Machine",
        "text": "Each time an enemy unit ends a charge move engaged with one or more friendly GREY KNIGHTS VEHICLE units and within 6\" of this unit, you can target this unit with the Heroic Intervention Stratagem, regardless of any other uses of that Stratagem this phase. If you do: that use is -1 CP; that use does not prevent any uses of that Stratagem on other units this phase."
      }
    ],
    "composition": [
      "1 Brotherhood Techmarine"
    ],
    "loadout": "**This model is equipped with:** forge bolter; grav-pistol; Omnissian power axe; servo-arm.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Purgation Squad",
        "Strike Squad",
        "Purifier Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Brotherhood Techmarine",
      "Psyker"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "brotherhood-terminator-squad",
    "name": "Brotherhood Terminator Squad",
    "points": [
      {
        "models": 4,
        "points": 140,
        "note": "1st-3rd"
      },
      {
        "models": 5,
        "points": 175,
        "note": "1st-3rd"
      },
      {
        "models": 8,
        "points": 300,
        "note": "1st-3rd"
      },
      {
        "models": 10,
        "points": 360,
        "note": "1st-3rd"
      },
      {
        "models": 4,
        "points": 150,
        "note": "4th+"
      },
      {
        "models": 5,
        "points": 185,
        "note": "4th+"
      },
      {
        "models": 8,
        "points": 310,
        "note": "4th+"
      },
      {
        "models": 10,
        "points": 385,
        "note": "4th+"
      }
    ],
    "flavor": "Massively armoured, heavily armed and ruthlessly devoted to their sacred duties, Grey Knights Terminators form the indomitable heart of many strike forces. Some squads are accompanied by Apothecaries, whose nartheciums dispense healing salves to staunch grievous wounds, or Ancients who hold aloft finely wrought banners to inspire their battle-brothers in war.",
    "profiles": [
      {
        "name": "Brotherhood Terminator Squad",
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
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Force Edge (Psychic)",
        "text": "Each time a model in this unit makes a melee attack that targets a unit (excluding MONSTERS and VEHICLES), improve the Armour Penetration characteristic of that attack by 1."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Ancient’s Banner",
        "text": "Add 1 to the Objective Control characteristic of models in the bearer’s unit."
      },
      {
        "name": "Apothecary’s Narthecium",
        "text": "In your Command phase, if the bearer is not destroyed, you can return 1 destroyed model (excluding CHARACTERS) to the bearer’s unit."
      }
    ],
    "composition": [
      "1 Justicar",
      "3-9 Terminators"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "For every 5 models in this unit, 1 Terminator’s storm bolter can be replaced with one of the following:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon",
      "1 Terminator can have its storm bolter replaced with 1 Apothecary’s narthecium.",
      "1 Terminator’s storm bolter can be replaced with one of the following:\n▪ 1 incinerator and 1 Ancient’s banner\n▪ 1 psilencer and 1 Ancient’s banner\n▪ 1 psycannon and 1 Ancient’s banner\n▪ 1 storm bolter and 1 Ancient’s banner*\n* That model’s storm bolter cannot be replaced.",
      "* That model’s storm bolter cannot be replaced."
    ],
    "keywords": [
      "Terminator",
      "Grenades",
      "Imperium",
      "Brotherhood Terminator Squad",
      "Infantry",
      "Battleline",
      "Psyker"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "castellan-crowe",
    "name": "Castellan Crowe",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Castellan Crowe charges into battle, wreathed in the blinding psychic fire that is the hallmark of his order. Though he will never be fool enough to unlock the forbidden power of the Black Blade of Antwyr, he still wields the captive blade with tremendous skill and strength, using it, his storm bolter and his potent psychic might to cut a path through his foes.",
    "profiles": [
      {
        "name": "Castellan Crowe",
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
        "name": "Purifying Flame",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "3",
        "bs": "2+",
        "s": "4",
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
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Black Blade of Antwyr",
        "tags": [
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Champion of the Order of Purifiers (Psychic)",
        "text": "While this model is leading a unit, add 1 to the Attacks characteristic of Purifying Flame weapons equipped by models in that unit."
      },
      {
        "name": "Foesight (Psychic)",
        "text": "Each time this model makes an attack that targets a CHARACTER unit, you can re-roll the Hit roll."
      }
    ],
    "composition": [
      "1 Castellan Crowe – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Purifying Flame; storm bolter; Black Blade of Antwyr.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Purifier Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Psyker",
      "Grenades",
      "Imperium",
      "Castellan Crowe"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "grand-master",
    "name": "Grand Master",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "The Grand Masters are the leaders of the Grey Knights brotherhoods and stand amongst their greatest warriors. More than this, they are accomplished battle psykers able to augment their martial might with tightly focused empyric power and strategic scholars and savants whose grasp of the strategies required to battle the supernatural and malign is unmatched.",
    "profiles": [
      {
        "name": "Grand Master",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Warrior Strategist",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP."
      },
      {
        "name": "Might of Titan (Psychic)",
        "text": "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, add 3 to the Attacks and Strength characteristics of melee weapons equipped by this model."
      }
    ],
    "composition": [
      "1 Grand Master"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "This model’s storm bolter can be replaced with one of the following:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Brotherhood Terminator Squad",
        "Paladin Squad"
      ]
    },
    "keywords": [
      "Terminator",
      "Imperium",
      "Grand Master",
      "Infantry",
      "Character",
      "Psyker",
      "Grenades"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "grand-master-in-nemesis-dreadknight",
    "name": "Grand Master In Nemesis Dreadknight",
    "points": [
      {
        "models": 1,
        "points": 200,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 215,
        "note": "3rd+"
      }
    ],
    "flavor": "Piloting a Nemesis Dreadknight allows a Grand Master to wield the kind of ordnance usually restricted to battle tanks. Augmented with his psychic puissance and the servo-driven strength to wield huge and terrifying melee weapons, the sheer killing power of such a warrior is terrifying indeed.",
    "profiles": [
      {
        "name": "Grand Master In Nemesis Dreadknight",
        "m": "8\"",
        "t": "8",
        "sv": "2+",
        "w": "13",
        "ld": "6+",
        "oc": "4",
        "inv": "4+"
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
        "name": "Gatling psilencer",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy incinerator",
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
        "name": "Heavy psycannon",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Sublimator",
        "tags": [
          "MELTA 4",
          "PSYCHIC",
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
        "name": "Dreadfists",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Nemesis daemon greathammer",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Nemesis flail",
        "tags": [
          "PSYCHIC"
        ],
        "a": "10",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Nemesis greatsword – strike",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Nemesis greatsword – sweep",
        "tags": [
          "PSYCHIC"
        ],
        "a": "10",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Nemesis mace",
        "tags": [
          "ANTI-CHARACTER 2+",
          "PRECISION",
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Surge of Wrath (Psychic)",
        "text": "Each time this model makes a melee attack that targets a MONSTER or VEHICLE unit, you can re-roll the Hit roll, you can re-roll the Wound roll and you can re-roll the Damage roll."
      },
      {
        "name": "Warrior Strategist",
        "text": "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Grand Master in Nemesis Dreadknight"
    ],
    "loadout": "**This model is equipped with:** dreadfists.",
    "options": [
      "This model’s dreadfists can be replaced with one of the following:\n▪ 1 Nemesis daemon greathammer\n▪ 1 Nemesis flail\n▪ 1 Nemesis greatsword\n▪ 1 Nemesis mace",
      "This model can be equipped with up to two of the following, but cannot take duplicates:\n▪ 1 gatling psilencer\n▪ 1 heavy incinerator\n▪ 1 heavy psycannon\n▪ 1 sublimator",
      "This model can be equipped with 1 fragstorm grenade launcher."
    ],
    "keywords": [
      "Imperium",
      "Walker",
      "Character",
      "Vehicle",
      "Psyker",
      "Grand Master in Nemesis Dreadknight"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "grand-master-voldus",
    "name": "Grand Master Voldus",
    "points": [
      {
        "models": 1,
        "points": 125
      }
    ],
    "flavor": "Grand Master Aldrik Voldus wields the mighty Malleus Argyrum, a daemon hammer whose head dances with sorcerous flame fewfoes can withstand. One of the most potent psykers his Chapter has known in years, he also possesses the power to unleash waves of soulfire against his enemies and to conjure sanctuaries of dancing psychic luminescence that shield his brothers from harm.",
    "profiles": [
      {
        "name": "Grand Master Voldus",
        "m": "5\"",
        "t": "5",
        "sv": "2+",
        "w": "7",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Searing Purity",
        "tags": [
          "DEVASTATING WOUNDS",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "D3+1",
        "bs": "2+",
        "s": "12",
        "ap": "-2",
        "d": "2"
      },
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
        "name": "Malleus Argyrum",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Sanctuary (Psychic)",
        "text": "▪ This unit has Stealth.\n▪ Melee attacks that target this unit have -1 to hit rolls."
      },
      {
        "name": "Hammer Aflame (Psychic)",
        "text": "Each time this model’s unit fights, you can select one enemy unit within Engagement Range of this model’s unit and roll one D6: on a 2-3, that enemy unit suffers 1 mortal wound; on a 4-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "composition": [
      "1 Grand Master Voldus – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Searing Purity; storm bolter; Malleus Argyrum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Brotherhood Terminator Squad",
        "Paladin Squad"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Imperium",
      "Character",
      "Terminator",
      "Grand Master Voldus",
      "Psyker",
      "Infantry"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "grey-knights-thunderhawk-gunship",
    "name": "Grey Knights Thunderhawk Gunship",
    "points": [
      {
        "models": 1,
        "points": 805,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 855,
        "note": "2nd+"
      }
    ],
    "flavor": "Mighty Thunderhawk Gunships serve the Grey Knights Chapter as any other. Powerful, versatile flyers, they deploy squads of Titan’s sons into the heart of battle whilst slaughtering hosts of enemies with their vast array of anti-personnel and anti-armour weapons.",
    "profiles": [
      {
        "name": "Grey Knights Thunderhawk Gunship",
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
      "1 Grey Knights Thunderhawk Gunship"
    ],
    "loadout": "**This model is equipped with:** 2 lascannons; Thunderhawk heavy cannon; 4 twin heavy bolters; armoured hull; Thunderhawk cluster bombs.",
    "options": [
      "This model’s Thunderhawk cluster bombs can be replaced with 1 hellstrike missile battery.",
      "This model’s Thunderhawk heavy cannon can be replaced with 1 turbo-laser destructor."
    ],
    "transport": "This model has a transport capacity of 30 Grey Knights Infantry models. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Thunderhawk Gunship",
      "Titanic",
      "Transport",
      "Vehicle"
        ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Unique"
  },
  {
    "id": "interceptor-squad",
    "name": "Interceptor Squad",
    "points": [
      {
        "models": 5,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 135,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 260,
        "note": "3rd+"
      }
    ],
    "flavor": "Interceptor squads embody the Grey Knights’ ability to respond rapidly to crises and emergent threats. Their teleporters enable them to flicker in and out of realspace, performing short-ranged teleport ’shunts’and bursting from the Warp repeatedly with guns blazing and Nemesis force weapons singing as they butcher the unsuspecting foe.",
    "profiles": [
      {
        "name": "Interceptor Squad",
        "m": "12\"",
        "t": "4",
        "sv": "2+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Personal Teleporters",
        "text": "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\" as if it were your Movement phase. If it does, until the end of the turn, this unit is not eligible to declare a charge."
      }
    ],
    "composition": [
      "1 Interceptor Justicar",
      "4-9 Interceptors"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "For every 5 models in this unit, 1 Interceptor’s storm bolter and Nemesis force weapon can be replaced with one of the following:\n▪ 1 incinerator and 1 close combat weapon\n▪ 1 psilencer and 1 close combat weapon\n▪ 1 psycannon and 1 close combat weapon"
    ],
    "keywords": [
      "Infantry",
      "Interceptor Squad",
      "Imperium",
      "Grenades",
      "Fly",
      "Psyker"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "32mm"
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
    "flavor": "The redoubtable Land Raider is the perfect armoured transport tank for the Grey Knights. Its arsenal of potent firepower is more than enough to mow down hordes of foes and,blast their armour support to scrap even as the Land Raider roars forward to deliver its passengers into the heart of the shell-shocked enemies’ lines.",
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
    "loadout": "**This model is equipped with:** 2 godhammer lascannons; twin heavy bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 multi-melta.",
      "This model can be equipped with 1 storm bolter."
    ],
    "transport": "This model has a transport capacity of 12 Grey Knights Infantry models. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Land Raider",
      "Imperium",
      "Smoke",
      "Transport",
      "Vehicle",
      "Frame"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Hull"
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
    "flavor": "Designed for storming defence lines and trenches, the Land Raider Crusader lays down withering anti-personnel fire as it advances. The Grey Knights often employ it to tear through the defenders of ritual sites and halt their diabolical summoning rites.",
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
    "transport": "This model has a transport capacity of 16 Grey Knights Infantry models. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Land Raider",
      "Imperium",
      "Grenades",
      "Smoke",
      "Transport",
      "Vehicle",
      "Crusader",
      "Frame"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "land-raider-redeemer",
    "name": "Land Raider Redeemer",
    "points": [
      {
        "models": 1,
        "points": 250,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 270,
        "note": "3rd+"
      }
    ],
    "flavor": "A terror weapon with few equals, the Land Raider Redeemer mounts enormous flamestorm cannons. Those fielded by the Grey Knights project arcs of blinding sanctified flame that ignite the soul and the psyche as well as the physical and make these tanks exceptional tools for rooting supernatural horrors and entrenched heretics out of the densest cover.",
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
    "transport": "This model has a transport capacity of 14 Grey Knights Infantry models. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Imperium",
      "Land Raider",
      "Grenades",
      "Smoke",
      "Transport",
      "Vehicle",
      "Redeemer",
      "Frame"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "nemesis-dreadknight",
    "name": "Nemesis Dreadknight",
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
    "flavor": "Nemesis Dreadknights wield enormous Nemesis force weapons and provide devastating heavy firepower. The lowering psychic presences of their pilots coupled with servo-assisted speed and might enables these exo-suits to stride through ranks of foes like giants, heedless of those who seek to bar their advance.",
    "profiles": [
      {
        "name": "Nemesis Dreadknight",
        "m": "8\"",
        "t": "8",
        "sv": "2+",
        "w": "13",
        "ld": "6+",
        "oc": "4",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Gatling psilencer",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS 1"
        ],
        "range": "24\"",
        "a": "12",
        "bs": "3+",
        "s": "6",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Heavy incinerator",
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
        "name": "Heavy psycannon",
        "tags": [
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "24\"",
        "a": "6",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Dreadfists",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Nemesis daemon greathammer",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "3+",
        "s": "14",
        "ap": "-3",
        "d": "D6+1"
      },
      {
        "name": "Nemesis greatsword – strike",
        "tags": [
          "PSYCHIC"
        ],
        "a": "5",
        "ws": "2+",
        "s": "10",
        "ap": "-2",
        "d": "D6"
      },
      {
        "name": "Nemesis greatsword – sweep",
        "tags": [
          "PSYCHIC"
        ],
        "a": "10",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Indomitable Spirit (Psychic)",
        "text": "This model is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back."
      }
    ],
    "damaged": {
      "note": "1-4 wounds remaining",
      "text": "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Nemesis Dreadknight"
    ],
    "loadout": "**This model is equipped with:** dreadfists.",
    "options": [
      "This model’s dreadfists can be replaced with one of the following:\n▪ 1 Nemesis daemon greathammer\n▪ 1 Nemesis greatsword",
      "This model can be equipped with up to two of the following, but cannot take duplicates:\n▪ 1 gatling psilencer\n▪ 1 heavy incinerator\n▪ 1 heavy psycannon"
    ],
    "keywords": [
      "Nemesis Dreadknight",
      "Psyker",
      "Walker",
      "Vehicle",
      "Imperium"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "paladin-squad",
    "name": "Paladin Squad",
    "points": [
      {
        "models": 4,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 215,
        "note": "1st-2nd"
      },
      {
        "models": 8,
        "points": 360,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 450,
        "note": "1st-2nd"
      },
      {
        "models": 4,
        "points": 185,
        "note": "3rd+"
      },
      {
        "models": 5,
        "points": 230,
        "note": "3rd+"
      },
      {
        "models": 8,
        "points": 375,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 465,
        "note": "3rd+"
      }
    ],
    "flavor": "Even amongst the rarefied ranks of the Grey Knights, Paladins are exceptional warriors whose potent psychic powers intertwine seamlessly with their martial bladework to devastate even the mightiest foes. Often accompanied by Apothecaries or banner-bearing Ancients, they are the favoured bodyguards of Brother-Captains and Grand Masters alike.",
    "profiles": [
      {
        "name": "Paladin Squad",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "bs": "2+",
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
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Attuned Onslaught (Psychic)",
        "text": "Each time this unit makes a Charge move, until the end of the turn, add 1 to the Damage characteristic of melee weapons equipped by PALADIN SQUAD models in this unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Ancient’s Banner",
        "text": "Add 1 to the Objective Control characteristic of models in the bearer’s unit."
      },
      {
        "name": "Apothecary's Narthecium",
        "text": "In your Command phase, if the bearer is not destroyed, you can return 1 destroyed model (excluding CHARACTERS) to the bearer’s unit."
      }
    ],
    "composition": [
      "1 Paragon",
      "4-9 Paladins"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "For every 5 models in this unit, up to 2 Paladins can each have their storm bolter replaced with one of the following:\n▪ 1 incinerator\n▪ 1 psilencer\n▪ 1 psycannon",
      "1 Paladin can have its storm bolter replaced with 1 Apothecary’s narthecium.",
      "1 Paladin’s storm bolter can be replaced with one of the following:\n▪ 1 incinerator and 1 Ancient’s banner\n▪ 1 psilencer and 1 Ancient’s banner\n▪ 1 psycannon and 1 Ancient’s banner\n▪ 1 storm bolter and 1 Ancient’s banner*\n* That model’s storm bolter cannot be replaced.",
      "* That model’s storm bolter cannot be replaced."
    ],
    "keywords": [
      "Grenades",
      "Imperium",
      "Paladin Squad",
      "Infantry",
      "Psyker",
      "Terminator"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "purgation-squad",
    "name": "Purgation Squad",
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
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 230,
        "note": "3rd+"
      }
    ],
    "flavor": "Providing vital heavy-fire support for the highly mobile assaults favoured by the Grey Knights, Purgation Squads comprise master sharpshooters armed with powerful firearms. Focusing their psychic potential to detect foes concealed in the heaviest cover and even bend their shots through the air to seek their prey, their volleys leave the enemy cowering in abject terror.",
    "profiles": [
      {
        "name": "Purgation Squad",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Righteous Persecution",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks: until the start of your next turn, that enemy unit is pinned. While a unit is pinned, subtract 2 from that unit’s Move characteristic and subtract 2 from Charge rolls made for it."
      }
    ],
    "composition": [
      "1 Purgator Justicar",
      "4-9 Purgators"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "Up to 4 Purgators can each have their storm bolter and Nemesis force weapon replaced with one of the following:\n▪ 1 incinerator and 1 close combat weapon\n▪ 1 psilencer and 1 close combat weapon\n▪ 1 psycannon and 1 close combat weapon"
    ],
    "keywords": [
      "Grenades",
      "Purgation Squad",
      "Imperium",
      "Psyker",
      "Infantry"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "purifier-squad",
    "name": "Purifier Squad",
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
        "points": 140,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 270,
        "note": "3rd+"
      }
    ],
    "flavor": "The Order of Purifiers epitomise the Grey Knights’ sanctity of purpose. They are incorruptible and fanatical, possessed of an untarnished spirit. Teleported into the heart of daemonic legions, they often fight as a spearhead from where they unleash a cleansing fire that sears the corrupted to ash.",
    "profiles": [
      {
        "name": "Purifier Squad",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "2",
        "ld": "6+",
        "oc": "1"
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
        "name": "Purifying Flame",
        "tags": [
          "ANTI-INFANTRY 2+",
          "IGNORES COVER",
          "PSYCHIC"
        ],
        "range": "18\"",
        "a": "1",
        "bs": "3+",
        "s": "4",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Sanctity of Purpose",
        "text": "Each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, you can re-roll the Wound roll instead."
      }
    ],
    "composition": [
      "1 Knight of the Flame",
      "4-9 Purifiers"
    ],
    "loadout": "**Every model is equipped with:** Purifying Flame; storm bolter; Nemesis force weapon.",
    "options": [
      "For every 5 models in this unit, up to 2 Purifiers can each have their storm bolter and Nemesis force weapon replaced with one of the following:\n▪ 1 incinerator and 1 close combat weapon\n▪ 1 psilencer and 1 close combat weapon\n▪ 1 psycannon and 1 close combat weapon"
    ],
    "keywords": [
      "Infantry",
      "Psyker",
      "Grenades",
      "Purifier Squad",
      "Imperium"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "razorback",
    "name": "Razorback",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "The Razorback is an adaptation of the Rhino that sacrifices some transport capacity for a hull-mounted heavy weapon’s ammunition and power cells, ideal for rapidly transporting elite teams of power-armoured Grey Knights into battle. Razorbacks are thus able to lay down coordinated covering fire as their passengers disembark.",
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
    "abilities": [
      {
        "name": "Fire Focus",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn."
      }
    ],
    "composition": [
      "1 Razorback"
    ],
    "loadout": "**This model is equipped with:** twin heavy bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 storm bolter.",
      "This model’s twin heavy bolter can be replaced with 1 twin lascannon."
    ],
    "transport": "This model has a transport capacity of 6 Grey Knights Infantry models. It cannot transport Terminator models.",
    "keywords": [
      "Dedicated Transport",
      "Smoke",
      "Razorback",
      "Imperium",
      "Vehicle",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "rhino",
    "name": "Rhino",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Dauntless, durable and ruggedly resilient, Rhinos have been the ubiquitous armoured transport of the Space Marines for millennia. Those fielded by the Grey Knights are heavily warded, their hulls shot through with truesilver psychocircuitry that redoubles the protection of the Aegis in their vicinity.",
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
    "abilities": [
      {
        "name": "Truesilver Aegis (Aura)",
        "text": "While a friendly Grey Knights unit is wholly within 6\" of this unit, models in that unit have the Feel No Pain 6+ ability against mortal wounds."
      }
    ],
    "composition": [
      "1 Rhino"
    ],
    "loadout": "**This model is equipped with:** storm bolter; armoured tracks.",
    "options": [
      "This model can be equipped with 1 hunter-killer missile.",
      "This model can be equipped with 1 additional storm bolter."
    ],
    "transport": "This model has a transport capacity of 12 Grey Knights Infantry models. It cannot transport Terminator models.",
    "keywords": [
      "Vehicle",
      "Imperium",
      "Smoke",
      "Dedicated Transport",
      "Rhino",
      "Transport",
      "Frame"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "Hull"
  },
  {
    "id": "stormhawk-interceptor",
    "name": "Stormhawk Interceptor",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "As pugnacious as it is swift and agile, the Stormhawk Interceptor is an exceptional air superiority fighter. With a Grey Knight in the pilot seat and its hull worked with sorcerous wards, this craft can blast winged daemonic abominations from the skies and slay heretic aircraft in vicious dogfights.",
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
        "range": "24\"",
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
    "abilities": [
      {
        "name": "Interceptor",
        "text": "Each time this model makes a ranged attack that targets a unit that can FLY, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Stormhawk Interceptor"
    ],
    "loadout": "**This model is equipped with:** las-talon; skyhammer missile launcher; twin assault cannon; armoured hull.",
    "options": [
      "This model’s las-talon can be replaced with 1 icarus stormcannon.",
      "This model’s skyhammer missile launcher can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 typhoon missile launcher"
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
      "Grey Knights"
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
    "flavor": "Powerful close-support aircraft, Stormraven Gunships are capable of deploying Grey Knights and even a revered Dreadnought where empyric disturbances prevent teleportation. Resilient and bristling with heavy weapons, Stormravens excel in armoured assaults and the fiery purgations of landing zones.",
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
        "ap": "-3",
        "d": "D6+2"
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
        "a": "3",
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
        "a": "3",
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
      "This model can be equipped with 2 hurricane bolters.",
      "This model’s twin assault cannon can be replaced with one of the following:\n▪ 1 twin heavy plasma cannon\n▪ 1 twin lascannon",
      "This model’s typhoon missile launcher can be replaced with one of the following:\n▪ 1 twin heavy bolter\n▪ 1 twin multi-melta"
    ],
    "transport": "This model has a transport capacity of 12 Grey Knights Infantry models and 1 Grey Knights Venerable Dreadnought model. Each Terminator model takes up the space of 2 models.",
    "keywords": [
      "Fly",
      "Imperium",
      "Stormraven Gunship",
      "Transport",
      "Vehicle"
        ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "stormtalon-gunship",
    "name": "Stormtalon Gunship",
    "points": [
      {
        "models": 1,
        "points": 170
      }
    ],
    "flavor": "Stormtalon Gunships are highly manoeuvrable aircraft that are versatile in their role and choice of target. Often running escort duties for larger craft, they hunt down Warp-spawned foes. Using vectored afterburners, their pilots unleash ground attacks, saturating teleportation zones with fire and clearing them for their brothers.",
    "profiles": [
      {
        "name": "Stormtalon Gunship",
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
      "Grey Knights"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "strike-squad",
    "name": "Strike Squad",
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
    "flavor": "Strike Squads act as vanguard forces, employing teleport technologies and sorcery to manifest deep within the enemy lines. Once in position, they launch devastating shock assaults against unprepared foes, wielding an arsenal of Nemesis force weaponry, heavy firepower and psychic fury to capture and sorcerously ward vital tactical locations.",
    "profiles": [
      {
        "name": "Strike Squad",
        "m": "6\"",
        "t": "4",
        "sv": "2+",
        "w": "2",
        "ld": "6+",
        "oc": "2"
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Nemesis force weapon",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Scouts 6\"",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Sanctifying Ritual (Psychic)",
        "text": "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase."
      }
    ],
    "composition": [
      "1 Justicar",
      "4-9 Grey Knights"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; Nemesis force weapon.",
    "options": [
      "For every 5 models in this unit, 1 Grey Knight’s storm bolter and Nemesis force weapon can be replaced with one of the following:\n▪ 1 incinerator and 1 close combat weapon\n▪ 1 psilencer and 1 close combat weapon\n▪ 1 psycannon and 1 close combat weapon"
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Grenades",
      "Psyker",
      "Imperium",
      "Strike Squad"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "venerable-dreadnought",
    "name": "Venerable Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 140,
        "note": "3rd+"
      }
    ],
    "flavor": "The ancient Grey Knights interred within Venerable Dreadnought sarcophagi direct their potent heavy weapons and the blows of their hydraulicfists with time-honed skill. Yet their many centuries of wisdom and experience are most valuable of all, aiding them in commanding strike forces while offering psychic guidance to their battle-brothers.",
    "profiles": [
      {
        "name": "Venerable Dreadnought",
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
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1, Deep Strike",
    "faction": "Gate of Infinity",
    "abilities": [
      {
        "name": "Guidance of the Ancients (Psychic)",
        "text": "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a Grey Knights model from your army makes an attack that targets that unit, add 1 to the Hit roll."
      }
    ],
    "composition": [
      "1 Venerable Dreadnought"
    ],
    "loadout": "**This model is equipped with:** assault cannon; storm bolter; Dreadnought combat weapon.",
    "options": [
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 heavy plasma cannon\n▪ 1 twin lascannon",
      "This model’s storm bolter can be replaced with 1 heavy flamer."
    ],
    "keywords": [
      "Venerable Dreadnought",
      "Vehicle",
      "Character",
      "Psyker",
      "Smoke",
      "Imperium",
      "Walker"
    ],
    "factionKeywords": [
      "Grey Knights"
    ],
    "baseSize": "60mm"
  }
]
