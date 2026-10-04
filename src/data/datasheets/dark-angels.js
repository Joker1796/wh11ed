// Dark Angels — datasheets. Unit roster and points from src/data/mfm/dark-angels.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// Transcribed from app data 963 (Codex: Space Marines and its Supplements) by
// scripts/gen-datasheets.mjs — re-run it rather than hand-porting a whole codex.
// 19 sheets of this Chapter's own here (3 of them Legends from the Faction Pack, which
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
    "id": "asmodai",
    "name": "Asmodai",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Asmodai is the Dark Angels’ most successful Interrogator-Chaplain. Relentless and humourless, in battle he incites his battle-brothers’ fighting spirit to reach new heights, rendering them unstoppable killing machines by chanting his litanies of hate with unshakeable belief.",
    "profiles": [
      {
        "name": "Asmodai",
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
        "name": "Crozius Arcanum and Power Weapon – strike",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Crozius Arcanum and Power Weapon – sweep",
        "tags": [
          "CLEAVE 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Feared Interrogator",
        "text": "At the start of the Fight phase, each enemy CHARACTER unit within 6\" of this model makes a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**."
      },
      {
        "name": "Exemplar of Hate",
        "text": "This unit's melee attacks can re-roll **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "1 Asmodai model"
    ],
    "loadout": "**This model is equipped with:** 1 Crozius Arcanum and Power Weapon; 1 Heavy Bolt Pistol.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Chaplain",
      "Character",
      "Deathwing",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "azrael",
    "name": "Azrael",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "flavor": "Supreme Grand Master Azrael is a beacon of inspiration to those who follow him, and is paid enormous respect for his ability as a strategist. A masterful commander, he quickly grasps changing battlefield realities and orchestrates his forces to maximum advantage. In the fray, Azrael decapitates foes with every strike of the Sword of Secrets.",
    "profiles": [
      {
        "name": "Azrael",
        "m": "6\"",
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
        "name": "Lion's Wrath",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
          "RAPID FIRE 1"
        ],
        "range": "24\"",
        "a": "2",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "The Sword of Secrets",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-4",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Masterful Tactician",
        "text": "In your Movement phase, select up to one **[gloss:visible:visible]** friendly ADEPTUS ASTARTES unit within 9\" of this model, and select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for that unit until the start of your next Command phase."
      },
      {
        "name": "Watcher in the Dark (Once per battle, per unit)",
        "text": "In any phase, when this unit suffers a **[gloss:mortal-wound:mortal wound]**, this unit can summon a Watcher in the Dark. If it does, this unit has [core:Feel No Pain 4+] against **mortal wounds**."
      },
      {
        "name": "Supreme Grand Master",
        "text": "This unit's attacks have [SUSTAINED HITS 1]."
      }
    ],
    "wargearAbilities": [
      {
        "name": "The Lion Helm",
        "text": "This unit has 4+ **[gloss:invulnerable-save:InSv]**."
      }
    ],
    "composition": [
      "1 Azrael model"
    ],
    "loadout": "**This model is equipped with:** 1 Lion's Wrath; The Lion Helm; 1 The Sword of Secrets.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Chapter Master",
      "Character",
      "Deathwing",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "belial",
    "name": "Belial",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Belial is a warrior born – a killer whose skill in battle has always stood out, even amongst his post-human brethren. For all his ability he is a staunch perfectionist, chastising himself for every perceived weakness. In battle he wields the Sword of Silence, an obsidian Chapter relic that seems to swallow nearby sound.",
    "profiles": [
      {
        "name": "Belial",
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
        "name": "Master-crafted Storm Bolter",
        "tags": [
          "PRECISION"
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
        "name": "The Sword of Silence",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "Grand Master of the Deathwing",
        "text": "This unit's attacks that target an enemy CHARACTER unit have +1 to **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Strikes of Retribution",
        "text": "In the fight phase, when this model is **[gloss:destroyed:destroyed]**, if this unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6:\n▪ On a 2+, do not remove this model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield."
      }
    ],
    "composition": [
      "1 Belial model"
    ],
    "loadout": "**This model is equipped with:** 1 Master-crafted Storm Bolter; 1 The Sword of Silence.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwing Knights",
        "Deathwing Terminator Squad",
        "Terminator Squad",
        "Deathwing Command Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Deathwing",
      "Epic Hero",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "deathwing-command-squad",
    "name": "Deathwing Command Squad",
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
    "flavor": "On occasion a Deathwing squad will be formed into an honour guard to accompany high-ranking members of the Inner Circle, such as Librarians, Interrogator-Chaplains and even Company Masters. Together, they will lead their brothers straight into the heart of battle, where their skills are most needed.",
    "profiles": [
      {
        "name": "Deathwing Command Squad",
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
        "name": "Halberd of Caliban",
        "tags": [
          "PRECISION"
        ],
        "a": "5",
        "ws": "3+",
        "s": "6",
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
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Narthecium",
        "text": "While this unit contains an Apothecary, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to this unit."
      },
      {
        "name": "Astartes Banner",
        "text": "While this unit contains an Ancient, add 1 to the Objective Control characteristic of its models."
      },
      {
        "name": "Honour or Death",
        "text": "While this unit contains a Company Champion, add 1 to Advance and Charge rolls made for this unit. When you target this unit with the Heroic Intervention stratagem, that use is -1 CP."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "1 Deathwing Ancient",
      "1 Deathwing Apothecary",
      "1 Deathwing Champion",
      "2-7 Deathwing Command Terminators"
    ],
    "loadout": "**The Deathwing Ancient is equipped with:** storm bolter; power fist.\n\n**The Deathwing Apothecary is equipped with:** storm bolter; chainfist.\n\n**The Deathwing Champion is equipped with:** halberd of Caliban.\n\n**Every Deathwing Command Terminator is equipped with:** storm bolter; power fist.",
    "options": [
      "Any number of Deathwing Command Terminators can each have their storm bolter and power fist replaced with one of the following:\n▪ 1 twin lightning claws\n▪ 1 thunder hammer and 1 storm shield",
      "Any number of Deathwing Command Terminators can each have their power fist replaced with 1 chainfist.",
      "1 Deathwing Command Terminator’s power fist can be replaced with 1 power weapon.",
      "For every 5 models in this unit, 1 Deathwing Command Terminator can replace its storm bolter with one of the following:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 plasma cannon\n▪ 1 storm bolter and 1 cyclone missile launcher (this model’s storm bolter cannot be replaced)",
      "This unit can be equipped with 1 Watcher in the Dark.*\n* The rules for a Watcher in the Dark can be found on the Deathwing Knights datasheet."
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Deathwing",
      "Terminator",
      "Deathwing Command Squad"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character unit from your army with the Leader ability can be attached to a Terminator Squad, it can be attached to this unit instead."
      }
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "deathwing-knights",
    "name": "Deathwing Knights",
    "points": [
      {
        "models": 5,
        "points": 255,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 275,
        "note": "3rd+"
      }
    ],
    "flavor": "Deathwing Knights are the Chapter’s ultimate death-dealers, their strikes breaking the enemy’s back in one fell swoop. Equipped with heirloom wargear, they teleport into the heart of the thickest fighting, led by Knight Masters who are whirlwinds of deathly destruction.",
    "profiles": [
      {
        "name": "Deathwing Knights",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Knight Master",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      }
    ],
    "melee": [
      {
        "name": "Mace of Absolution",
        "tags": [
          "ANTI-MONSTER/VEHICLE 4+"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Great Weapon of the Unforgiven",
        "tags": [
          "DEVASTATING WOUNDS",
          "SUSTAINED HITS 1"
        ],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Power Weapon",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Relic Weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Inner Circle",
        "text": "▪ Attacks that target this unit have -1**[gloss:damage-roll:D]**.\n▪ This unit cannot be targeted with the **Tactical Dreadnought Fortitude stratagem**."
      },
      {
        "name": "Teleport Homer (Once per battle, per unit)",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit on the battlefield. If you do:\n▪ When you target this unit with the **Rapid Ingress stratagem**, you can use that Teleport Homer token. If you do, that use is -1 CP, but when resolving that **[gloss:stratagem:stratagem]**, this unit must be set up within 3\" of that Teleport Homer token and not within 8\" of an enemy unit. That Teleport Homer token is then removed from the battlefield.\n▪ If an enemy unit ends a move within 1\" of that Teleport Homer token, that Teleport Homer token is removed from the battlefield."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Watcher in the Dark",
        "text": "Once per battle, in any phase, just after a mortal wound is allocated to an **ADEPTUS ASTARTES** model in this unit, this unit can summon a Watcher in the Dark. When it does, until the end of the phase, models in this unit have the Feel No Pain 4+ ability against mortal wounds.\n\n***Designer’s Note**: Place a Watcher in the Dark token next to the unit, removing it when this ability has been used.*"
      }
    ],
    "composition": [
      "1 Knight Master model",
      "4 Deathwing Knights models"
    ],
    "loadout": "**The Knight Master is equipped with:** 1 Great Weapon of the Unforgiven.\n**Every Deathwing Knights is equipped with:** 1 Mace of Absolution.",
    "options": [
      "This unit can be equipped with 1 Watcher in the Dark",
      "All Deathwing Knight models in this unit can each have their Mace of Absolution replaced with 1 Power Weapon.",
      "The Knight Master can have their Great Weapon of the Unforgiven replaced with 1 Relic Weapon."
    ],
    "keywords": [
      "Deathwing",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "deathwing-strikemaster",
    "name": "Deathwing Strikemaster",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Deathwing Strikemasters serve as the Deathwing’s Lieutenants. To earn such an esteemed rank they have carried out deeds of enormous bravery on countless battlefields, honing their skills as warriors and leaders. In battle they guide their Deathwing brethren with skill and pride, bringing death to the enemy.",
    "profiles": [
      {
        "name": "Deathwing Strikemaster",
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
        "bs": "2+",
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
        "name": "Mace of absolution",
        "tags": [],
        "a": "5",
        "ws": "2+",
        "s": "6",
        "ap": "-1",
        "d": "3"
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
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Vanquish the Foe",
        "text": "Each time this model makes an attack that targets an enemy unit that is Below Half-strength, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Deathwing Strikemaster"
    ],
    "loadout": "**This model is equipped with:** storm bolter; master-crafted power weapon.",
    "options": [
      "This model’s storm bolter and master-crafted power weapon can be replaced with either 1 twin lightning claws, or two different weapons from the following list:\n▪ 1 storm bolter\n▪ 1 chainfist\n▪ 1 mace of absolution\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Deathwing Command Squad",
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
      "Deathwing",
      "Terminator",
      "Lieutenant",
      "Deathwing Strikemaster"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "deathwing-terminator-squad",
    "name": "Deathwing Terminator Squad",
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
    "flavor": "Deploying rapidly onto the battlefield via blazing teleport strike or within the armoured hull of a large transport, Deathwing Terminator Squads pour heavy fire into their enemies or engage them in brutal melee, smashing them apart with thunder hammers or cutting them to ribbons with lightning claws.",
    "profiles": [
      {
        "name": "Deathwing Sergeant",
        "m": "5\"",
        "t": "6",
        "sv": "2+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "inv": "4+"
      },
      {
        "name": "Deathwing Terminators",
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
        "name": "Plasma Cannon – standard",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Cannon – supercharge",
        "tags": [
          "BLAST 1",
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
        "name": "Chainfist",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Chainfist – hunter",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
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
        "name": "Deathwing",
        "text": "This unit's attacks can ignore modifiers to:\n▪ **[gloss:ballistic-skill:BS]** and **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Hit rolls]**."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Watcher in the Dark",
        "text": "Once per battle, in any phase, just after a mortal wound is allocated to an **ADEPTUS ASTARTES** model in this unit, this unit can summon a Watcher in the Dark. When it does, until the end of the phase, models in this unit have the Feel No Pain 4+ ability against mortal wounds.\n\n***Designer’s Note**: Place a Watcher in the Dark token next to the unit, removing it when this ability has been used.*"
      }
    ],
    "composition": [
      "1 Deathwing Sergeant model",
      "4-9 Deathwing Terminators models"
    ],
    "loadout": "**Every model is equipped with:** 1 Power Fist; 1 Storm Bolter.",
    "options": [
      "Any number of Deathwing Terminator models can each have their Power Fist replaced with 1 Chainfist.",
      "For every 5 models in this unit, 1 Deathwing Terminator model can have their Storm Bolter replaced with one of the following: 1 Assault Cannon, 1 Heavy Flamer, 1 Plasma Cannon, 1 Storm Bolter and 1 Cyclone Missile Launcher (that model’s Storm Bolter cannot be replaced)",
      "The Deathwing Sergeant can have their Power Fist replaced with one of the following: 1 Chainfist, 1 Power Weapon"
    ],
    "keywords": [
      "Deathwing",
      "Imperium",
      "Infantry",
      "Terminator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ezekiel",
    "name": "Ezekiel",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "Ezekiel is Grand Master of Librarians. /4s a master of Interromancy, his warp-whispers shred the sanity of his enemies. His blade, known as Traitor’s Bane, was forged to slay those who turn against the Emperor. It is a formidable force weapon rumoured to entrap forever the souls of the Fallen.",
    "profiles": [
      {
        "name": "Ezekiel",
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
        "name": "The Deliverer",
        "tags": [
          "CLOSE-QUARTERS",
          "PRECISION"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Mind Wipe – focused witchfire",
        "tags": [
          "ANTI-CHARACTER 4+",
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS",
          "HAZARDOUS",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "D3+3"
      },
      {
        "name": "Mind Wipe – witchfire",
        "tags": [
          "CLOSE-QUARTERS",
          "DEVASTATING WOUNDS",
          "PRECISION",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Traitor's Bane",
        "tags": [
          "PRECISION",
          "PSYCHIC"
        ],
        "a": "4",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Psychic Hood",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]** and **[gloss:mortal-wound:mortal wounds]**."
      },
      {
        "name": "Book of Salvation",
        "text": "This unit's melee attacks have +1 **[gloss:attack-dice:A]**."
      },
      {
        "name": "Chief Librarian (psyker level 3)",
        "text": "This model has the **[gloss:psychic-ability:psychic abilities]** listed in the Psychic Abilities section."
      }
    ],
    "composition": [
      "1 Ezekiel model"
    ],
    "loadout": "**This model is equipped with:** 1 Mind Wipe; 1 The Deliverer; 1 Traitor's Bane.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Hellblaster Squad",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "abilitySets": [
      {
        "name": "Chief Librarian (psyker level 3)",
        "options": [
          {
            "name": "Engulfing Fear (psychic level 1)",
            "text": "In your Shooting phase, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Select one enemy unit within 12” of this model. That unit makes a **[gloss:battle-shock-test:battle-shock roll]** with -1 to that **battle-shock roll**."
          },
          {
            "name": "Whispers of the Shadow Forest (psychic level 1)",
            "text": "When an enemy unit targets this unit, if this unit is not **[gloss:battle-shocked:battle-shocked]**, you can make a **[gloss:psychic-roll:psychic roll]** for this unit by rolling one D6. If you do:\n▪ On a 1, this unit is **battle-shocked**.\n▪ Attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]** until the end of the phase."
          }
        ]
      }
    ],
    "keywords": [
      "Character",
      "Deathwing",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Librarian",
      "Psyker",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "25mm"
  },
  {
    "id": "inner-circle-companions",
    "name": "Inner Circle Companions",
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
        "points": 105,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 195,
        "note": "3rd+"
      }
    ],
    "flavor": "Wielding Calibanite greatswords with breathtaking skill, wreathed in the incense smoke of their braziers of judgement, the Inner Circle Companions cut a crimson path through their foes. They are sinister warriors whether battling as ally or enemy, for they fight in silence save for the whine of their armour servos and the crunch of their blades through flesh and bone.",
    "profiles": [
      {
        "name": "Inner Circle Companions",
        "m": "6\"",
        "t": "5",
        "sv": "3+",
        "w": "3",
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
      }
    ],
    "melee": [
      {
        "name": "Calibanite Greatsword – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Calibanite Greatsword – sweep",
        "tags": [
          "SUSTAINED HITS 2"
        ],
        "a": "5",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Braziers of Judgement",
        "text": "▪ This unit has [core:Stealth].\n▪ Melee attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]**."
      },
      {
        "name": "Emnity for the Unworthy",
        "text": "This unit's attacks that target a CHARACTER unit have +1 to **[gloss:hit-roll:hit rolls]**."
      }
    ],
    "composition": [
      "3-6 Inner Circle Companions models"
    ],
    "loadout": "**Every model is equipped with:** 1 Calibanite Greatsword; 1 Heavy Bolt Pistol.",
    "keywords": [
      "Deathwing",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "land-speeder-vengeance",
    "name": "Land Speeder Vengeance",
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
    "flavor": "Boasting a larger chassis and anti-gravity engines, the Land Speeder Vengeance mounts heavier weaponry than other Land Speeders, and is thus fitted with a plasma storm battery. In battle, its crew use this potent weapon to deliver devastating firepower while keeping pace with the swift hunt of the Ravenwing.",
    "profiles": [
      {
        "name": "Land Speeder Vengeance",
        "m": "14\"",
        "t": "9",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
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
        "name": "Plasma Storm Battery – standard",
        "tags": [
          "BLAST 1",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "9",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Plasma Storm Battery – supercharge",
        "tags": [
          "BLAST 1",
          "HAZARDOUS",
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "D3+3",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
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
    "core": "Deadly Demise D3, Deep Strike",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Storm of Vengeance (Once per turn, per unit)",
        "text": "In your opponent's Shooting phase, when an enemy unit has shot, if those attacks **[gloss:destroyed:destroyed]** a friendly DARK ANGELS unit within 6\" of this unit, you can use this ability. If you do, this unit shoots using **[gloss:normal-shooting:normal shooting]** but while doing so this unit can only target that enemy unit."
      }
    ],
    "composition": [
      "1 Land Speeder Vengeance model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Heavy Bolter; 1 Plasma Storm Battery.",
    "options": [
      "This model's Heavy Bolter can be replaced with 1 Assault Cannon."
    ],
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Ravenwing",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "lazarus",
    "name": "Lazarus",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Master Lazarus wields his sword, Enmity’s Edge, with all the martial skill expected of a Dark Angels Company Master. In even the most ferocious fighting he exhibits a calm demeanour, maintaining composure while giving masterful orders that have yielded great victories.",
    "profiles": [
      {
        "name": "Lazarus",
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
      }
    ],
    "melee": [
      {
        "name": "Enmity's Edge",
        "tags": [
          "ANTI-PSYKER 2+"
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
        "name": "The Spiritshield Helm",
        "text": "This unit has [core:Feel No Pain 3+] against **[gloss:psychic-attack:psychic attacks]** and **[gloss:mortal-wound:mortal wounds]**."
      },
      {
        "name": "Intractable Will",
        "text": "In the Fight phase, when a model in this unit is **[gloss:destroyed:destroyed]**, if this unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6:\n▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield."
      }
    ],
    "composition": [
      "1 Lazarus model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Enmity's Edge.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Bladeguard Veteran Squad",
        "Company Heroes",
        "Infernus Squad",
        "Inner Circle Companions",
        "Intercessor Squad",
        "Sternguard Veteran Squad"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Deathwing",
      "Epic Hero",
      "Explosives",
      "Imperium",
      "Infantry",
      "Tacticus"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "lion-eljonson",
    "name": "Lion El'Jonson",
    "points": [
      {
        "models": 1,
        "points": 415
      }
    ],
    "flavor": "Lion El’Jonson stalks from mist-wreathed shadow realms like an ancient questing knight hunting down the galaxy’s terrors. With the immense blade, Fealty, the Primarch cleaves apart the most heinous of monstrosities, while the Emperor’s Shield erupts in blazes of light and force in response to his foes’ savage blows.",
    "profiles": [
      {
        "name": "Lion El'Jonson",
        "m": "8\"",
        "t": "10",
        "sv": "2+",
        "w": "16",
        "ld": "5+",
        "oc": "4",
        "inv": "3+"
      }
    ],
    "ranged": [
      {
        "name": "Arma Luminis – bolt",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "4",
        "bs": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Arma Luminis – plasma",
        "tags": [
          "CLOSE-QUARTERS"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Fealty – strike",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "8",
        "ws": "2+",
        "s": "12",
        "ap": "-4",
        "d": "4"
      },
      {
        "name": "Fealty – sweep",
        "tags": [
          "CLEAVE 2",
          "SUSTAINED HITS 1"
        ],
        "a": "12",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Deep Strike, Fights First",
    "faction": "Combat Doctrines, Transhuman Strategist",
    "abilities": [
      {
        "name": "The Emperor's Shield",
        "text": "Attacks that target this unit with a **[gloss:strength:S]** greater than this unit's **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**."
      },
      {
        "name": "Dark Angels Bodyguard",
        "text": "While this unit is within 3\" of a friendly DARK ANGELS INFANTRY unit, this unit has [core:Lone Operative]."
      },
      {
        "name": "Master Strategist",
        "text": "In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase, __in addition__ to any other **combat doctrine**."
      },
      {
        "name": "Primarch of the First Legion",
        "text": "At the start of your Command phase, you can select up to two of the abilities in the Primarch of the First Legion section. Until the start of your next Command phase, this model has those abilities."
      },
      {
        "name": "The Watchers",
        "text": "This unit has [core:Feel No Pain 4+] against **[gloss:psychic-attack:psychic attacks]** and **[gloss:mortal-wound:mortal wounds]**."
      }
    ],
    "composition": [
      "1 Lion El'Jonson model"
    ],
    "loadout": "**This model is equipped with:** 1 Arma Luminis; 1 Fealty.",
    "rules": [
      {
        "name": "Supreme Commander",
        "text": "If this model is in your army, it must be your WARLORD."
      }
    ],
    "abilitySets": [
      {
        "name": "Primarch of the First Legion",
        "options": [
          {
            "name": "Mist-wreathed Shadow Realms",
            "text": "In your Command phase, if this unit is **[gloss:unengaged:unengaged]**, you can use this ability. If you do:\n▫ Place this unit in **[gloss:strategic-reserves:strategic reserves]**.\n▫ This unit can make an **[gloss:ingress-move:ingress move]** in your next Movement phase (including in your first turn)."
          },
          {
            "name": "Martial Exemplar",
            "text": "While a friendly DARK ANGELS unit is within 6\" of this unit, that unit's melee attacks can:\n▪ Re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re-roll **[gloss:wound-roll:wound rolls]** of 1."
          },
          {
            "name": "No Hiding from the Watchers",
            "text": "While a friendly DARK ANGELS unit is within 6\" of this unit, that unit has [core:Feel No Pain 5+] against **[gloss:psychic-attack:psychic attacks]** and **[gloss:mortal-wound:mortal wounds]**."
          }
        ]
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
      "Dark Angels"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "nephilim-jetfighter",
    "name": "Nephilim Jetfighter",
    "points": [
      {
        "models": 1,
        "points": 200
      }
    ],
    "flavor": "Sleek air-to-air interceptors, Nephilim Jetfighters perform lightning-fast manoeuvres in high-speed warfare. These pilots continually push the Techmarines for enhancements and modification to their craft to make them faster and deadlier – the results have proven truly substantial.",
    "profiles": [
      {
        "name": "Nephilim Jetfighter",
        "m": "-",
        "t": "8",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "-",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Nephilim Lascannons",
        "tags": [],
        "range": "48\"",
        "a": "2",
        "bs": "3+",
        "s": "12",
        "ap": "-3",
        "d": "D3+3"
      },
      {
        "name": "Avenger Mega Bolter",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "range": "36\"",
        "a": "10",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Blacksword Missiles",
        "tags": [
          "ANTI-FLY 2+"
        ],
        "range": "36\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-2",
        "d": "D3+2"
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
    "core": "Deadly Demise D3, Damaged 3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Lightning-fast Manoeuvres",
        "text": "Ranged attacks that target this unit have -1 to **[gloss:wound-roll:wound rolls]**."
      }
    ],
    "composition": [
      "1 Nephilim Jetfighter model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Avenger Mega Bolter; 1 Blacksword Missiles; 1 Twin Heavy Bolter.",
    "options": [
      "This model's Twin Heavy Bolter can be replaced with 1 Nephilim Lascannons."
    ],
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Ravenwing",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "ravenwing-black-knights",
    "name": "Ravenwing Black Knights",
    "points": [
      {
        "models": 3,
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 6,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 180,
        "note": "3rd+"
      }
    ],
    "flavor": "The Ravenwing Black Knights are the 2nd Company’s greatest warriors, elite fighters who style themselves after the monster-hunting knights of old Caliban. They speed towards the foe, swinging their corvus hammers with such force that the spiked end punctures even the thickest armour.",
    "profiles": [
      {
        "name": "Ravenwing Huntmaster",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      },
      {
        "name": "Ravenwing Black Knight",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
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
        "name": "Plasma Talon – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Talon – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Corvus Hammers",
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
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Knights of Caliban",
        "text": "If this unit made a **[gloss:charge-move:charge move]** this turn, this unit's melee attacks have [ANTI-MONSTER/VEHICLE 4+]."
      }
    ],
    "composition": [
      "1 Ravenwing Huntmaster model",
      "2-5 Ravenwing Black Knight models"
    ],
    "loadout": "**Every model is equipped with:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.",
    "options": [
      "For every 3 models in this unit, 1 model can have their Plasma Talon replaced with 1 Grenade Launcher."
    ],
    "keywords": [
      "Explosives",
      "Imperium",
      "Mounted",
      "Ravenwing"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "ravenwing-command-squad",
    "name": "Ravenwing Command Squad",
    "points": [
      {
        "models": 3,
        "points": 115,
        "note": "1st-2nd"
      },
      {
        "models": 3,
        "points": 135,
        "note": "3rd+"
      }
    ],
    "flavor": "Ravenwing Command Squads speed into battle at the very head of the hunt. With their champion ready to duel for the honour of the Company, the Ancient’s banner fluttering in the wind like a knightly pennant, and the Apothecary on hand to heal the most grievous injuries, these formidable warriors aid their comrades in running down even the most dangerous quarry.",
    "profiles": [
      {
        "name": "Ravenwing Apothecary",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      },
      {
        "name": "Ravenwing Champion",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      },
      {
        "name": "Ravenwing Ancient",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "4",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
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
        "name": "Plasma Talon – standard",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "7",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Plasma Talon – supercharge",
        "tags": [
          "HAZARDOUS",
          "RAPID FIRE 1"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "3+",
        "s": "8",
        "ap": "-3",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Corvus Hammers",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
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
    "core": "Support",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Narthecium",
        "text": "While this unit contains a RAVENWING APOTHECARY, in your Command phase, this unit **[gloss:heal:heals]** D3+1 wounds."
      },
      {
        "name": "Astartes Banner",
        "text": "While this unit contains a RAVENWING ANCIENT, this unit has +1 **[gloss:objective-control:OC]**."
      },
      {
        "name": "Honour or Death",
        "text": "While this unit contains a RAVENWING CHAMPION:\n▪ This unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**.\n▪ When you target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, that use is -1CP."
      }
    ],
    "composition": [
      "1 Ravenwing Ancient model",
      "1 Ravenwing Apothecary model",
      "1 Ravenwing Champion model"
    ],
    "loadout": "**The Ravenwing Ancient is equipped with:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.\n**The Ravenwing Apothecary is equipped with:** 1 Bolt Pistol; 1 Corvus Hammers; 1 Plasma Talon.\n**The Ravenwing Champion is equipped with:** 1 Bolt Pistol; 1 Master-crafted Power Weapon; 1 Plasma Talon.",
    "options": [
      "For every 3 models in this unit, 1 model can have their Plasma Talon replaced with 1 Grenade Launcher."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Outrider Squad",
        "Ravenwing Black Knights"
      ]
    },
    "keywords": [
      "Explosives",
      "Imperium",
      "Mounted",
      "Ravenwing"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "75x42mm Oval Base"
  },
  {
    "id": "ravenwing-dark-talon",
    "name": "Ravenwing Dark Talon",
    "points": [
      {
        "models": 1,
        "points": 190
      }
    ],
    "flavor": "The Dark Talon is a close-attack aircraft designed to help the Rovenwing snatch up their most tenacious or troublesome prey. It is aided in this role by armaments doting bock to the Dark Age of Technology, such os the empirically charged rift cannon and the sinister stasis bomb, that trammels victims in o rone of slowed time.",
    "profiles": [
      {
        "name": "Ravenwing Dark Talon",
        "m": "-",
        "t": "8",
        "sv": "3+",
        "w": "11",
        "ld": "6+",
        "oc": "-",
        "inv": "5+"
      }
    ],
    "ranged": [
      {
        "name": "Rift Cannon",
        "tags": [
          "BLAST 1",
          "DEVASTATING WOUNDS"
        ],
        "range": "18\"",
        "a": "D3+1",
        "bs": "3+",
        "s": "16",
        "ap": "-4",
        "d": "3"
      },
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
    "core": "Deadly Demise D3, Damaged 3",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Stasis Bomb",
        "text": "At the end of your opponent’s Fight phase, select one visible enemy unit (excluding AIRCRAFT/[core:Lone Operative] units) within 24\" of this unit. That enemy unit is **slowed** until the end of your opponent's next Movement phase:\n▪ While a unit is **slowed**, in your opponent's Movement phase, when that unit is **[gloss:selected-to-move:selected to move]**, unless that unit **[gloss:remain-stationary:remains stationary]**, roll one D6:\n▪ On a 1-4, that unit suffers D3 **[gloss:mortal-wound:mortal wounds]** and that unit has -2” **[gloss:move-characteristic:M]**.\n▪ On a 5-6, that unit suffers 2D3 **mortal wounds** and that unit has -3” **M**."
      }
    ],
    "composition": [
      "1 Ravenwing Dark Talon model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 2 Hurricane Bolter; 1 Rift Cannon.",
    "keywords": [
      "Aircraft",
      "Fly",
      "Imperium",
      "Ravenwing",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "120x92mm Oval Base"
  },
  {
    "id": "ravenwing-darkshroud",
    "name": "Ravenwing Darkshroud",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Mounted upon each Darkshroud is a mysterious statue that survived Caliban’s destruction and became imbued with the energies released by that cataclysmic event. Through the artifi ce of the Dark Angels, these energies are amplified and used to obscure those battle-brothers near to the Darkshroud from enemy sight.",
    "profiles": [
      {
        "name": "Ravenwing Darkshroud",
        "m": "14\"",
        "t": "8",
        "sv": "3+",
        "w": "10",
        "ld": "6+",
        "oc": "3",
        "inv": "5+"
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
        "name": "Armoured Hull",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "6",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Deep Strike, Lone Operative 15\"",
    "faction": "Combat Doctrines",
    "abilities": [
      {
        "name": "Icon of Old Caliban",
        "text": "While a friendly DARK ANGELS unit is within 6\" of this unit, that unit has [core:Stealth]."
      }
    ],
    "composition": [
      "1 Ravenwing Darkshroud model"
    ],
    "loadout": "**This model is equipped with:** 1 Armoured Hull; 1 Heavy Bolter.",
    "options": [
      "This model's Heavy Bolter can be replaced with 1 Assault Cannon."
    ],
    "keywords": [
      "Fly",
      "Frame",
      "Imperium",
      "Ravenwing",
      "Speeder",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "Large Flying Base"
  },
  {
    "id": "ravenwing-talonmaster",
    "name": "Ravenwing Talonmaster",
    "points": [
      {
        "models": 1,
        "points": 105
      }
    ],
    "flavor": "Mounted in a Land Speeder outfitted with additional auspex scanners and vox-casters, it is a Talonmaster’s role to direct the Ravenwing’s fire, using his equipment to ensure no quarry can hide from them. They even identify foes seeking temporary refuge in dense terrain, revealing their location to all Ravenwing warriors.",
    "profiles": [
      {
        "name": "Ravenwing Talonmaster",
        "m": "16\"",
        "t": "7",
        "sv": "3+",
        "w": "6",
        "ld": "6+",
        "oc": "2",
        "inv": "5+"
      }
    ],
    "ranged": [
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
      }
    ],
    "melee": [
      {
        "name": "Power weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Talonmaster",
        "text": "While this model is within 3\" of one or more other friendly ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES FLY VEHICLE units, this model has the Lone Operative ability."
      },
      {
        "name": "Nowhere to Hide",
        "text": "While a friendly ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES FLY VEHICLE unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability."
      },
      {
        "name": "Master of Manoeuvre",
        "text": "In your opponent’s Movement phase, when an enemy unit ends a Normal, Advance or Fall Back move within 8\" of this model, if this model is not within Engagement Range of one or more enemy units, this model can make a Normal move of up to 6\"."
      }
    ],
    "composition": [
      "1 Ravenwing Talonmaster"
    ],
    "loadout": "**This model is equipped with:** twin assault cannon; twin heavy bolter; power weapon.",
    "keywords": [
      "Vehicle",
      "Character",
      "Fly",
      "Imperium",
      "Ravenwing",
      "Ravenwing Talonmaster"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "sammael",
    "name": "Sammael",
    "points": [
      {
        "models": 1,
        "points": 120
      }
    ],
    "flavor": "Sammael rides to war on the jetbike Corvex, a relic from the Dark Age of Technology. Upon this ancient mount, the Ravenwing’s commander charges into the fray, storm bolters and plasma cannon causing hideous damage before he moves in for the kill with the Raven Sword, an heirloom with a razor edge that can never dull.",
    "profiles": [
      {
        "name": "Sammael",
        "m": "12\"",
        "t": "6",
        "sv": "3+",
        "w": "7",
        "ld": "6+",
        "oc": "2",
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
        "name": "Master-crafted Plasma Cannon",
        "tags": [
          "BLAST 1"
        ],
        "range": "36\"",
        "a": "3",
        "bs": "2+",
        "s": "8",
        "ap": "-3",
        "d": "3"
      },
      {
        "name": "Twin Storm Bolter",
        "tags": [
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
        "name": "The Raven Sword",
        "tags": [
          "SUSTAINED HITS 2"
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
        "name": "Cut Off Their Escape",
        "text": "When an enemy unit **[gloss:engaged:engaged]** with this unit (excluding MONSTER/VEHICLE units) makes a **[gloss:fall-back-move:fall-back move]**, that enemy unit must use the **[gloss:desperate-escape:desperate escape mode]**. If that enemy unit is **[gloss:battle-shocked:battle‑shocked]**, ‑1 from those **[gloss:hazard-roll:hazard rolls]**."
      },
      {
        "name": "Grand Master of the Ravenwing",
        "text": "▪ This unit has MOBILE.\n▪ In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase."
      }
    ],
    "composition": [
      "1 Sammael model"
    ],
    "loadout": "**This model is equipped with:** 1 Bolt Pistol; 1 Master-crafted Plasma Cannon; 1 The Raven Sword; 1 Twin Storm Bolter.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Outrider Squad",
        "Ravenwing Black Knights"
      ]
    },
    "keywords": [
      "Captain",
      "Character",
      "Epic Hero",
      "Explosives",
      "Fly",
      "Frame",
      "Imperium",
      "Mounted",
      "Ravenwing"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Dark Angels"
    ],
    "baseSize": "Large Flying Base"
  }
]
