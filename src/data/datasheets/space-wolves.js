// Space Wolves — datasheets. Unit roster and points from src/data/mfm/space-wolves.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// 39 chapter-specific/differing datasheets here; 150 units identical
// to space-marines.js are NOT duplicated — see sharedUnitIds below and
// src/data/datasheets/index.js (loadDatasheets merges them in by id).
export const sharedUnitIds = [
  "aggressor-squad",
  "ancient",
  "ancient-in-terminator-armour",
  "ancient-on-bike",
  "assault-intercessor-squad",
  "assault-intercessors-with-jump-packs",
  "assault-squad",
  "assault-squad-with-jump-packs",
  "astartes-servitors",
  "astraeus",
  "attack-bike-squad",
  "ballistus-dreadnought",
  "bike-squad",
  "bladeguard-ancient",
  "bladeguard-veteran-squad",
  "brutalis-dreadnought",
  "caestus-assault-ram",
  "captain",
  "captain-in-gravis-armour",
  "captain-in-phobos-armour",
  "captain-in-terminator-armour",
  "captain-on-bike",
  "captain-with-jump-pack",
  "carab-culln-the-risen",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "cerberus",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-venerable-dreadnought",
  "chaplain-with-jump-pack",
  "command-squad",
  "company-champion-on-bike",
  "company-heroes",
  "company-veterans-on-bikes",
  "deathstorm-drop-pod",
  "deimos-predator",
  "deredeo-dreadnought",
  "desolation-squad",
  "dreadnought",
  "dreadnought-drop-pod",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad",
  "eradicator-squad-with-heavy-bolters",
  "falchion",
  "fellblade",
  "ferren-areios",
  "fire-raptor-gunship",
  "firestrike-servo-turrets",
  "gladiator-lancer",
  "gladiator-reaper",
  "gladiator-valiant",
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
  "hunter",
  "imperial-space-marine",
  "impulsor",
  "inceptor-squad",
  "incursor-squad",
  "infernus-squad",
  "infiltrator-squad",
  "intercessor-squad",
  "invader-atv",
  "invictor-tactical-warsuit",
  "ironclad-dreadnought",
  "javelin-attack-speeder",
  "judiciar",
  "kratos",
  "land-raider",
  "land-raider-achilles",
  "land-raider-crusader",
  "land-raider-excelsior",
  "land-raider-helios",
  "land-raider-prometheus",
  "land-raider-proteus",
  "land-raider-redeemer",
  "land-speeder",
  "land-speeder-storm",
  "land-speeder-tempest",
  "land-speeder-tornado",
  "land-speeder-typhoon",
  "leviathan-dreadnought",
  "librarian",
  "librarian-in-phobos-armour",
  "librarian-in-terminator-armour",
  "librarian-on-bike",
  "librarian-with-jump-pack",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-in-reiver-armour",
  "lieutenant-with-combi-weapon",
  "mastodon",
  "mortis-dreadnought",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "primaris-company-champion",
  "rapier-carrier",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "relic-contemptor-dreadnought",
  "relic-razorback",
  "relic-terminator-squad",
  "repulsor",
  "repulsor-executioner",
  "rhino",
  "rhino-primaris",
  "scout-bike-squad",
  "scout-sniper-squad",
  "scout-squad",
  "sicaran-arcus",
  "sicaran-battle-tank",
  "sicaran-omega",
  "sicaran-punisher",
  "sicaran-venator",
  "sokar-pattern-stormbird",
  "spartan",
  "stalker",
  "sternguard-veteran-squad",
  "storm-eagle-gunship",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "suppressor-squad",
  "tarantula-air-defence-battery",
  "tarantula-sentry-battery",
  "techmarine",
  "techmarine-on-bike",
  "terminator-assault-squad",
  "terminator-squad",
  "terminus-ultra",
  "terrax-pattern-termite",
  "thunderfire-cannon",
  "thunderhawk-gunship",
  "thunderhawk-transporter",
  "typhon",
  "vanguard-veteran-squad",
  "vanguard-veteran-squad-with-jump-packs",
  "vindicator",
  "vindicator-laser-destroyer",
  "whirlwind",
  "whirlwind-scorpius",
  "xiphon-interceptor",
]

// appdata prices this shared unit lower for Space Wolves specifically
// (unit_composition_required_faction_keyword: 'Space Wolves') than the space-marines.js base
// price — see src/data/datasheets/blood-angels.js's pointsOverrides for the full mechanism.
export const pointsOverrides = {
  "centurion-devastator-squad": [
    { models: 3, points: 175 },
    { models: 6, points: 350 },
  ],
  "repulsor-executioner": [
    { models: 1, points: 230, note: "1st-2nd" },
    { models: 1, points: 250, note: "3rd+" },
  ],
}

export default [
  {
    "id": "arjac-rockfist",
    "name": "Arjac Rockfist",
    "points": [
      {
        "models": 1,
        "points": 95
      }
    ],
    "flavor": "Arjac Rockfist is a towering mass of muscle and a taciturn anvil of endurance. Wielding the enormous Foehammer – recalling his former role as an Iron Priest of the forge – Arjac crushes his foes with pulverising strength. As personal champion of the Great Wolf, Arjac upholds the honour of the Chapter.",
    "profiles": [
      {
        "name": "Arjac Rockfist",
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
        "name": "Foehammer",
        "tags": [
          "ANTI-MONSTER 3+",
          "ANTI-VEHICLE 3+",
          "ASSAULT"
        ],
        "range": "6\"",
        "a": "1",
        "bs": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Foehammer",
        "tags": [
          "ANTI-MONSTER 3+",
          "ANTI-VEHICLE 3+",
          "PRECISION"
        ],
        "a": "5",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Anvil of Endurance",
        "text": "While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Champion of the Kingsguard",
        "text": "Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Arjac Rockfist – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Foehammer.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Imperium",
      "Epic Hero",
      "Character",
      "Arjac Rockfist",
      "Terminator",
      "Infantry"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "50mm"
  },
  {
    "id": "bjorn-the-fell-handed",
    "name": "Bjorn the Fell-Handed",
    "points": [
      {
        "models": 1,
        "points": 160
      }
    ],
    "flavor": "Most ancient of all Space Marines and last of the Company of Russ, Bjorn the Fell-Handed has fought for millennia within a Dreadnought’s sarcophagus. The Space Wolves revere Bjorn as a living link to their deepest past, waking him only in times of dire need, and he still fights as furiously as he did at Russ’ side.",
    "profiles": [
      {
        "name": "Bjorn the Fell-Handed",
        "m": "9\"",
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
        "bs": "2+",
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
        "name": "Helfrost cannon – dispersed",
        "tags": [
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
        "name": "Helfrost cannon – focused",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "2+",
        "s": "10",
        "ap": "-3",
        "d": "5"
      },
      {
        "name": "Multi-melta",
        "tags": [
          "MELTA 2"
        ],
        "range": "18\"",
        "a": "2",
        "bs": "2+",
        "s": "9",
        "ap": "-4",
        "d": "D6"
      }
    ],
    "melee": [
      {
        "name": "Trueclaw",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 5+",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Legendary Tenacity",
        "text": "Each time an attack targets this model, if the Strength characteristic of that attack is greater than this model’s Toughness characteristic, subtract 1 from the Wound roll."
      },
      {
        "name": "Ancient Tactician",
        "text": "At the start of your Command phase, if this model is on the battlefield, you gain 1CP."
      }
    ],
    "composition": [
      "1 Bjorn the Fell-Handed– EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** assault cannon; heavy flamer; Trueclaw.",
    "options": [
      "This model’s assault cannon can be replaced with one of the following:\n▪ Helfrost cannon\n▪ Multi-melta"
    ],
    "keywords": [
      "Character",
      "Epic Hero",
      "Dreadnought",
      "Imperium",
      "Smoke",
      "Walker",
      "Vehicle",
      "Bjorn the Fell-handed"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "blood-claws",
    "name": "Blood Claws",
    "points": [
      {
        "models": 10,
        "points": 135
      },
      {
        "models": 20,
        "points": 270
      }
    ],
    "flavor": "Young and fiery warriors full of belligerent enthusiasm, Blood Claws hunger to prove themselves in savage battle. With relentless exuberance they plunge headlong into the foe, straddling the line between sheer heroism and recklessness. Many great sagas start with the Blood Claws’ glory hunts.",
    "profiles": [
      {
        "name": "Blood Claws",
        "m": "7\"",
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
        "name": "Power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Berserk Charge",
        "text": "This unit is eligible to declare a charge in a turn in which it Advanced."
      }
    ],
    "composition": [
      "1 Blood Claw Pack Leader",
      "9-19 Blood Claws"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Blood Claw Pack Leader’s bolt pistol can be replaced with 1 plasma pistol.",
      "The Blood Claw Pack Leader’s Astartes chainsword can be replaced with 1 power weapon."
    ],
    "keywords": [
      "Battleline",
      "Infantry",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Blood Claws"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "canis-wolfborn",
    "name": "Canis Wolfborn",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "profiles": [
      {
        "name": "Canis Wolfborn",
        "m": "10\"",
        "t": "6",
        "sv": "3+",
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
        "bs": "5+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Crushing teeth and claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Wolf claws",
        "tags": [
          "TWIN-LINKED"
        ],
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
        "name": "Born of Wolves",
        "text": "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability."
      },
      {
        "name": "Alpha Predator",
        "text": "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Canis Wolfborn – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; crushing teeth and claws; Wolf claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Fenrisian Wolves",
        "Thunderwolf Cavalry"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Epic Hero",
      "Imperium",
      "Canis Wolfborn"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "cyberwolf",
    "name": "Cyberwolf",
    "points": [
      {
        "models": 1,
        "points": 20
      }
    ],
    "profiles": [
      {
        "name": "Cyberwolf",
        "m": "10\"",
        "t": "4",
        "sv": "6+",
        "w": "2",
        "ld": "7+",
        "oc": "0",
        "inv": "6+"
      }
    ],
    "melee": [
      {
        "name": "Teeth and claws",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Alpha Hunter",
        "text": "While this model is leading a unit, models in that unit have the Scouts 6\" ability."
      },
      {
        "name": "Close In for the Kill",
        "text": "Each time this model makes an attack that targets an enemy unit that is Below Half-strength, add 1 to the Hit roll and add 1 to the Wound roll."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "WOLFKIN",
        "text": "This model cannot be your WARLORD and cannot be given Enhancements."
      }
    ],
    "composition": [
      "1 Cyberwolf"
    ],
    "loadout": "**This model is equipped with:** teeth and claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Fenrisian Wolves"
      ]
    },
    "keywords": [
      "Beast",
      "Character",
      "Imperium",
      "Cyberwolf"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "fenrisian-wolves",
    "name": "Fenrisian Wolves",
    "points": [
      {
        "models": 5,
        "points": 45,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 75,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 50,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 80,
        "note": "3rd+"
      }
    ],
    "flavor": "Amongst the most vicious and intelligent predators in the galaxy, Fenrisian Wolves accompany the sons of Russ to battle, following them as the pack follows the alpha. Even the sleekest are as big as a Human, yet they prowl silently before pouncing in a swift and coordinated flurry of razor-sharp teeth and claws.",
    "profiles": [
      {
        "name": "Fenrisian Wolves",
        "m": "10\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "0"
      }
    ],
    "melee": [
      {
        "name": "Teeth and claws",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Predatory Instinct",
        "text": "In your opponent’s Movement phase, if an enemy unit ends a move within 8\" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to D6\"."
      },
      {
        "name": "Hunting Hounds",
        "text": "While this unit is within 6\" of one or more friendly Space Wolves Character models (excluding Wulfen models), if this unit is not Battle-shocked, models in it have an Objective Control characteristic of 1."
      }
    ],
    "composition": [
      "5-10 Fenrisian Wolves"
    ],
    "loadout": "**Every model is equipped with:** teeth and claws.",
    "keywords": [
      "Imperium",
      "Fenrisian Wolves",
      "Beasts"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "grey-hunters",
    "name": "Grey Hunters",
    "points": [
      {
        "models": 10,
        "points": 165
      }
    ],
    "flavor": "With their instinctive raw aggression tempered – but never quashed – by countless battlefield victories, Grey Hunters are patient, cunning and adaptable. Some packs take and hold ground, unleashing volleys of disciplined firepower, while others stalk the flanks. When the trap is set, Grey Hunters leap in for the kill.",
    "profiles": [
      {
        "name": "Grey Hunters",
        "m": "7\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "3"
      }
    ],
    "ranged": [
      {
        "name": "Bolt carbine",
        "tags": [
          "RAPID FIRE 1"
        ],
        "range": "24\"",
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
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Cunning Hunters",
        "text": "Each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, you can re-roll the Wound roll instead."
      }
    ],
    "composition": [
      "1 Grey Hunter Pack Leader",
      "9 Grey Hunters"
    ],
    "loadout": "**Every model is equipped with:** bolt carbine; bolt pistol; Astartes chainsword.",
    "options": [
      "The Grey Hunter Pack Leader’s bolt carbine can be replaced with 1 plasma pistol.",
      "The Grey Hunter Pack Leader’s Astartes chainsword can be replaced with one of the following\n▪ 1 power fist\n▪ 1 power weapon"
    ],
    "keywords": [
      "Tacticus",
      "Grey Hunters",
      "Battleline",
      "Grenades",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "harald-deathwolf",
    "name": "Harald Deathwolf",
    "points": [
      {
        "models": 1,
        "points": 85
      }
    ],
    "profiles": [
      {
        "name": "Harald Deathwolf",
        "m": "10\"",
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
        "name": "Crushing teeth and claws",
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
        "name": "Glacius",
        "tags": [],
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
        "name": "Lord of the Wolfkin",
        "text": "While this model is leading a unit, each time that unit makes a Charge move, until the end of the turn, crushing teeth and claws equipped by models in that unit have the [DEVASTATING WOUNDS] ability."
      },
      {
        "name": "Mantle of the Troll King",
        "text": "Once per phase, when resolving an attack made against this model, after you make a saving throw for this model, you can change the Damage characteristic of that attack to 0."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Harald Deathwolf – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; crushing teeth and claws; Glacius.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Thunderwolf Cavalry"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Captain",
      "Harald Deathwolf"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "hounds-of-morkai",
    "name": "Hounds of Morkai",
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
        "name": "Hounds of Morkai",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "inv": "6+",
        "invNote": "This invulnerable save is improved to 4+ against Psychic Attacks."
      }
    ],
    "ranged": [
      {
        "name": "Morkai bolt pistol",
        "tags": [
          "ANTI-PSYKER 4+",
          "DEVASTATING WOUNDS",
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
        "name": "Morkai combat knife",
        "tags": [
          "ANTI-PSYKER 4+",
          "DEVASTATING WOUNDS",
          "PRECISION"
        ],
        "a": "4",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Scouts 6\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Morkai’s Howl",
        "text": "In your Shooting phase, you can select one enemy unit within 12\" of this unit (if a LIEUTENANT IN REIVER ARMOUR is leading this unit, you can select one enemy unit within 18\" instead). That unit must take a Battle-shock test, subtracting 1 from the result if it is a PSYKER unit. If that test is failed, in addition to being Battle-shocked, that unit is Stunned until the start of your next Shooting phase. While a unit is Stunned, each time a model in that unit makes a Psychic Attack, subtract 1 from the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to a Reiver Squad, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Hound of Morkai Pack Leader",
      "4-9 Hounds of Morkai"
    ],
    "loadout": "**Every model is equipped with:** Morkai bolt pistol; Morkai combat knife.",
    "options": [
      "None"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Smoke",
      "Imperium",
      "Phobos",
      "Hounds of Morkai"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "iron-priest",
    "name": "Iron Priest",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "flavor": "Space Wolves Techmarines – the Iron Priests – are holders of arcane technological lore that they use to repair the Chapter’s damaged war engines and soothe their affronted machine spirits. Warriors of Fenris first and foremost, Iron Priests will not hesitate to bring their own esoteric weapons to bear on the foe if needed.",
    "profiles": [
      {
        "name": "Iron Priest",
        "m": "7\"",
        "t": "4",
        "sv": "2+",
        "w": "4",
        "ld": "6+",
        "oc": "1"
      }
    ],
    "ranged": [
      {
        "name": "Helfrost pistol – dispersed",
        "tags": [
          "PISTOL",
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
        "name": "Helfrost pistol – focused",
        "tags": [
          "PISTOL"
        ],
        "range": "12\"",
        "a": "1",
        "bs": "2+",
        "s": "6",
        "ap": "-3",
        "d": "3"
      }
    ],
    "melee": [
      {
        "name": "Tempest hammer and servo-arm",
        "tags": [],
        "a": "4",
        "ws": "4+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Iron Priest",
        "text": "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability."
      },
      {
        "name": "Gift of the Iron Wolf",
        "text": "In your Command phase, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3\" of this model. That model regains up to D3 lost wounds and, until the start of your next Command phase, select one ranged weapon equipped by that model to have the [RAPID FIRE 1] ability. Each model can only be selected for this ability or the Blessing of the Omnissiah ability once per turn."
      },
      {
        "name": "Judgement of the Omnissiah",
        "text": "Each time this model makes an attack that targets an enemy unit within Engagement Range of one or more friendly ADEPTUS ASTARTES VEHICLE units, you can re-roll the Wound roll."
      }
    ],
    "composition": [
      "1 Iron Priest"
    ],
    "loadout": "**This model is equipped with:** helfrost pistol; tempest hammer and servo-arm.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Grey Hunters",
        "Wolf Guard Headtakers"
      ]
    },
    "keywords": [
      "Techmarine",
      "Iron Priest",
      "Infantry",
      "Character",
      "Imperium"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "krom-dragongaze",
    "name": "Krom Dragongaze",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "profiles": [
      {
        "name": "Krom Dragongaze",
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
      }
    ],
    "melee": [
      {
        "name": "Wyrmclaw",
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
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Refuse to Accept Defeat",
        "text": "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll if that unit is below its Starting Strength, and add 1 to the Wound roll as well if that unit is Below Half-strength."
      },
      {
        "name": "The Fierce Eye",
        "text": "In your Shooting phase, you can select one enemy INFANTRY unit within 12\" of and visible to this model. That enemy unit must take a Battle-shock test."
      }
    ],
    "wargearAbilities": [],
    "composition": [
      "1 Krom Dragongaze – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Wyrmclaw.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Grey Hunters",
        "Wolf Guard"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Captain",
      "Krom Dragongaze"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "logan-grimnar",
    "name": "Logan Grimnar",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "flavor": "Logan Grimnar – Great Wolf and High King of Fenris – is one of the longest serving Chapter Masters. Waging war against any who threaten the Space Wolves or the Imperium, Grimnar’s charisma and centuries of heroic victories have immortalised him as one of the most lauded warriors in the galaxy.",
    "profiles": [
      {
        "name": "Logan Grimnar",
        "m": "6\"",
        "t": "5",
        "sv": "2+",
        "w": "8",
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
        "name": "Axe Morkai – strike",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Axe Morkai – sweep",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Tyrnak and Fenrir",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "High King of Fenris",
        "text": "Once per battle round, in your Movement phase, you can select one friendly SPACE WOLVES unit that is in Reserves. If you do, until the end of the phase, for the purpose of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is."
      },
      {
        "name": "Guile of the Wolf",
        "text": "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP."
      }
    ],
    "specialAbilities": [
      {
        "name": "EMBARKING WITHIN TRANSPORTS",
        "text": "This model can embark within friendly Adeptus Astartes Transport models that can transport Terminator models. When doing so, it takes up the space of 4 Infantry models."
      }
    ],
    "composition": [
      "1 Logan Grimnar – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Axe Morkai; Tyrnak and Fenrir.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Terminator",
      "Imperium",
      "Character",
      "Infantry",
      "Logan Grimnar",
      "Chapter Master"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "80mm"
  },
  {
    "id": "logan-grimnar-on-stormrider",
    "name": "Logan Grimnar on Stormrider",
    "points": [
      {
        "models": 1,
        "points": 180
      }
    ],
    "profiles": [
      {
        "name": "Logan Grimnar on Stormrider",
        "m": "10\"",
        "t": "6",
        "sv": "2+",
        "w": "12",
        "ld": "6+",
        "oc": "4",
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
        "name": "The Axe Morkai – one-handed",
        "tags": [],
        "a": "10",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "The Axe Morkai – two-handed",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "8",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Flurry of teeth and claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "6",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "core": "Deadly Demise D3, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "High King of Fenris",
        "text": "Once per battle, in your Charge phase, this model can use this ability. If it does, until the end of the turn, you can re-roll Charge rolls made for ADEPTUS ASTARTES units from your army and, until the end of the turn, each time an ADEPTUS ASTARTES model from your army makes a melee attack, you can re-roll the Hit roll."
      },
      {
        "name": "The Great Wolf",
        "text": "Each time this model destroys an enemy unit, you gain 1CP."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "LOGAN GRIMNAR",
        "text": "Your army cannot contain both LOGAN GRIMNAR and LOGAN GRIMNAR ON STORMRIDER."
      }
    ],
    "composition": [
      "1 Logan Grimnar on Stormrider – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** storm bolter; the Axe Morkai; flurry of teeth and claws.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Thunderwolf Cavalry"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Epic Hero",
      "Imperium",
      "Chapter Master",
      "Logan Grimnar on Stormrider"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "long-fangs",
    "name": "Long Fangs",
    "points": [
      {
        "models": 5,
        "points": 120
      },
      {
        "models": 6,
        "points": 145
      }
    ],
    "profiles": [
      {
        "name": "Long Fangs",
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
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fire Discipline",
        "text": "Each time this unit Remains Stationary, if it includes a Long Fang Pack Leader, you can select one enemy unit that is visible to that model. Until the end of the turn, each time a model in this unit makes a ranged attack that targets that enemy unit, re-roll a Hit roll of 1."
      },
      {
        "name": "Armorium Cherub",
        "text": "Once per battle, after making a Hit roll for a model in this unit, you can change that roll to an unmodified 6.\n\n**Designer’s Note:** Place an Armorium Cherub token next to the unit, removing it once this ability has been used."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to a Devastator Squad, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Long Fang Pack Leader",
      "4-5 Long Fangs"
    ],
    "loadout": "**Every model is equipped with:** boltgun; bolt pistol; close combat weapon.",
    "options": [
      "Any number of Long Fangs can each have their boltgun replaced with one of the following:\n▪ 1 grav-cannon\n▪ 1 heavy bolter\n▪ 1 heavy flamer\n▪ 1 lascannon\n▪ 1 missile launcher\n▪ 1 multi-melta\n▪ 1 plasma cannon",
      "The Long Fang Pack Leader’s boltgun can be replaced with one of the following:\n▪ 1 flamer\n▪ 1 grav-gun\n▪ 1 meltagun\n▪ 1 plasma gun\n▪ 1 plasma pistol",
      "The Long Fang Pack Leader’s close combat weapon can be replaced with one of the following:\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Long Fangs"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "lukas-the-trickster",
    "name": "Lukas the Trickster",
    "points": [
      {
        "models": 1,
        "points": 50
      }
    ],
    "profiles": [
      {
        "name": "Lukas the Trickster",
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
        "name": "Claw of the Jackalwolf",
        "tags": [],
        "a": "6",
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
        "name": "Pelt of the Doppegangrel",
        "text": "While this model is leading a unit, each time an attack targets that unit, subtract 1 from the Hit roll."
      },
      {
        "name": "Last Laugh",
        "text": "If this model is destroyed by a melee attack, after the attacking unit has finished making its attacks, roll one D6: on a 4+, the attacking unit suffers D6 mortal wounds and is Battle-shocked."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "MASTER OF MISCHIEF",
        "text": "This model cannot be your WARLORD."
      }
    ],
    "composition": [
      "1 Lukas the Trickster – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; Claw of the Jackalwolf.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Epic Hero",
      "Grenades",
      "Imperium",
      "Lukas the Trickster"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "murderfang",
    "name": "Murderfang",
    "points": [
      {
        "models": 1,
        "points": 150
      }
    ],
    "flavor": "A stampeding mechanical beast is unleashed from beneath the Fang in times of need, its massively brutal claws tearing its foes limb from bloody limb. The Chapter names it Murderfang. Its true identity is unknown for its insensate snarling rages are bereft of speech; it is known now only as a force of untamed destruction.",
    "profiles": [
      {
        "name": "Murderfang",
        "m": "9\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "0"
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
        "name": "Murderclaws",
        "tags": [
          "SUSTAINED HITS 1",
          "TWIN-LINKED"
        ],
        "a": "8",
        "ws": "3+",
        "s": "14",
        "ap": "-2",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 6+",
    "faction": "Curse of the Wulfen, Oath of Moment",
    "abilities": [
      {
        "name": "Murder-maker (Aura)",
        "text": "In the Fight phase, each time an attack targets a friendly Wulfen unit within 6\" of this model, if a model in that unit is destroyed as a result of that attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Bestial Fury",
        "text": "You can re-roll Advance and Charge rolls made for this model."
      }
    ],
    "specialAbilities": [
      {
        "name": "FORCE OF UNTAMED DESTRUCTION",
        "text": "This model cannot be your WARLORD."
      }
    ],
    "composition": [
      "1 Murderfang – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** heavy flamer; storm bolter; Murderclaws.",
    "keywords": [
      "Character",
      "Walker",
      "Vehicle",
      "Imperium",
      "Epic Hero",
      "Dreadnought",
      "Wulfen",
      "Murderfang"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "njal-stormcaller",
    "name": "Njal Stormcaller",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "flavor": "Summoning ice-toothed blizzards to scatter his foes, Njal Stormcaller is an elemental focus of psychic fury. He is High Rune Priest of the Space Wolves and wields a crackling staff by which he nullifies enemy sorceries.",
    "profiles": [
      {
        "name": "Njal Stormcaller",
        "m": "7\"",
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
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Living Lightning – witchfire",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS 2"
        ],
        "range": "24\"",
        "a": "D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Living Lightning – focused witchfire",
        "tags": [
          "HAZARDOUS",
          "PSYCHIC",
          "SUSTAINED HITS 2"
        ],
        "range": "24\"",
        "a": "2D6",
        "bs": "3+",
        "s": "7",
        "ap": "-1",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Staff of the Stormcaller",
        "tags": [
          "PSYCHIC",
          "SUSTAINED HITS 2"
        ],
        "a": "4",
        "ws": "3+",
        "s": "7",
        "ap": "-1",
        "d": "D3"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Wind Walker (Psychic)",
        "text": "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability and each time that unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6\" to the Move characteristic of models in this unit."
      },
      {
        "name": "Tempest’s Wrath (Psychic)",
        "text": "In your Shooting phase, after this model’s unit has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks made with this model’s Living Lightning weapon. Until the start of your next turn, that enemy unit is stormwracked. While a unit is stormwracked, subtract 6\" from the Range characteristic of ranged weapons equipped by models in that unit (to a minimum of 12\")."
      }
    ],
    "composition": [
      "1 Njal Stormcaller – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Living Lightning; Staff of the Stormcaller.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Grey Hunters",
        "Wolf Guard Headtakers"
      ]
    },
    "keywords": [
      "Character",
      "Infantry",
      "Epic Hero",
      "Imperium",
      "Tacticus",
      "Njal Stormcaller",
      "Psyker"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "ragnar-blackmane",
    "name": "Ragnar Blackmane",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "Supremely confident and eager always to be first into the fray, Wolf Lord Ragnar Blackmane regularly leads his Great Company in devastating planetary invasions. No longer as headstrong as in his youth, Ragnar’s berserk rages are still furious hurricanes of violence, and his terrifying howls freeze the blood of his foes.",
    "profiles": [
      {
        "name": "Ragnar Blackmane",
        "m": "7\"",
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
        "name": "Frostfang",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "8",
        "ws": "2+",
        "s": "6",
        "ap": "-3",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "War Howl",
        "text": "While this model is leading a Blood Claws unit, each time a model in that unit makes a melee attack, you can re-roll the Wound roll. While this model is leading a Wolf Guard Headtakers unit, that unit is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Battle-lust",
        "text": "Each time this model ends a Charge move, until the end of the turn, add 2 to the Attacks characteristic of this model’s Frostfang weapon."
      }
    ],
    "composition": [
      "1 Ragnar Blackmane – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Frostfang.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Wolf Guard Headtakers"
      ]
    },
    "keywords": [
      "Imperium",
      "Ragnar Blackmane",
      "Captain",
      "Character",
      "Epic Hero",
      "Infantry",
      "Tacticus",
      "Grenades"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "skyclaws",
    "name": "Skyclaws",
    "points": [
      {
        "models": 5,
        "points": 90
      },
      {
        "models": 10,
        "points": 165
      },
      {
        "models": 15,
        "points": 240
      }
    ],
    "profiles": [
      {
        "name": "Skyclaws",
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
      }
    ],
    "core": "Deep Strike",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Headstrong",
        "text": "You can re-roll Charge rolls made for this unit. Each time this unit makes a Charge move, until the end of the turn, each time a model in this unit makes a melee attack, add 1 to the Hit roll."
      }
    ],
    "wargearAbilities": [],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to Assault Intercessors with Jump Packs or an Assault Squad with Jump Packs, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Skyclaw Pack Leader",
      "4-14 Skyclaws"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Skyclaw Pack Leader’s bolt pistol can be replaced with 1 plasma pistol.",
      "The Skyclaw Pack Leader’s Astartes chainsword can be replaced with one of the following:\n▪ 1 power fist\n▪ 1 power weapon",
      "Up to 2 Skyclaws can each have their bolt pistol and Astartes chainsword replaced with one of the following:\n▪ 1 plasma pistol and 1 Astartes chainsword\n▪ 1 flamer and 1 close combat weapon\n▪ 1 grav-gun and 1 close combat weapon\n▪ 1 meltagun and 1 close combat weapon\n▪ 1 plasma gun and 1 close combat weapon"
    ],
    "keywords": [
      "Infantry",
      "Jump Pack",
      "Fly",
      "Grenades",
      "Imperium",
      "Skyclaws"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "stormfang-gunship",
    "name": "Stormfang Gunship",
    "points": [
      {
        "models": 1,
        "points": 300
      }
    ],
    "profiles": [
      {
        "name": "Stormfang Gunship",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
        "ld": "6+",
        "oc": "-"
      }
    ],
    "ranged": [
      {
        "name": "Helfrost destructor – dispersed",
        "tags": [
          "SUSTAINED HITS D3"
        ],
        "range": "36\"",
        "a": "D3",
        "bs": "3+",
        "s": "11",
        "ap": "-3",
        "d": "7"
      },
      {
        "name": "Helfrost destructor – focused",
        "tags": [
          "TORRENT"
        ],
        "range": "12\"",
        "a": "D6+6",
        "bs": "N/A",
        "s": "8",
        "ap": "-1",
        "d": "2"
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
        "name": "Twin stormstrike missile launcher",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "48\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-2",
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
    "core": "Deadly Demise D6, Hover",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Frozen Prey",
        "text": "In your Shooting phase, after this model has shot, if an enemy MONSTER or VEHICLE unit was hit by one or more of those attacks made with this model’s helfrost destructor, until the end of your opponent’s next turn, that enemy unit is Frozen. While a unit is Frozen, subtract 2 from that unit’s Move characteristic, and subtract 2 from Advance and Charge rolls made for that unit."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Stormfang Gunship"
    ],
    "loadout": "**This model is equipped with:** helfrost destructor; 2 skyhammer missile launchers; twin stormstrike missile launcher; armoured hull.",
    "options": [
      "This model’s 2 skyhammer missile launchers can be replaced with one of the following:\n▪ 2 twin multi-meltas\n▪ 2 twin heavy bolters",
      "This model’s twin stormstrike missile launcher can be replaced with 1 twin lascannon."
    ],
    "transport": "This model has a transport capacity of 6 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Aircraft",
      "Fly",
      "Transport",
      "Imperium",
      "Stormfang Gunship"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "stormwolf",
    "name": "Stormwolf",
    "points": [
      {
        "models": 1,
        "points": 250
      }
    ],
    "flavor": "Stormwolves enable the sons of Russ to bring the fight to the enemy wherever they hide. Within their wide hold, packs of warriors are borne with incredible speed into the foe’s midst. As the packs leap out to attack, Stormwolves saturate the area with an array of heavy fire, before rising to hunt for yet more targets.",
    "profiles": [
      {
        "name": "Stormwolf",
        "m": "14\"",
        "t": "10",
        "sv": "3+",
        "w": "14",
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
        "name": "Twin helfrost cannon – dispersed",
        "tags": [
          "TORRENT",
          "TWIN-LINKED"
        ],
        "range": "12\"",
        "a": "D6",
        "bs": "N/A",
        "s": "6",
        "ap": "-1",
        "d": "2"
      },
      {
        "name": "Twin helfrost cannon – focused",
        "tags": [
          "TWIN-LINKED"
        ],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "9",
        "ap": "-3",
        "d": "5"
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
        "name": "Into the Foe",
        "text": "If a unit disembarks from this TRANSPORT before it moves, until the end of the turn, that unit is eligible to charge in a turn in which it Advanced."
      }
    ],
    "wargearAbilities": [],
    "damaged": {
      "note": "1-5 wounds remaining",
      "text": "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll."
    },
    "composition": [
      "1 Stormwolf"
    ],
    "loadout": "**This model is equipped with:** 2 skyhammer missile launchers; twin helfrost cannon; twin lascannon; armoured hull.",
    "options": [
      "This model’s 2 skyhammer missile launchers can be replaced with one of the following:\n▪ 2 twin heavy bolters\n▪ 2 twin multi-meltas"
    ],
    "transport": "This model has a transport capacity of 16 ADEPTUS ASTARTES INFANTRY models. Each JUMP PACK, WULFEN, GRAVIS or TERMINATOR model takes up the space of 2 models and each CENTURION model takes up the space of 3 models.",
    "keywords": [
      "Vehicle",
      "Aircraft",
      "Fly",
      "Transport",
      "Imperium",
      "Stormwolf"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "thunderwolf-cavalry",
    "name": "Thunderwolf Cavalry",
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
        "points": 130,
        "note": "3rd+"
      },
      {
        "models": 6,
        "points": 230,
        "note": "3rd+"
      }
    ],
    "flavor": "Thunderwolves are monstrous and solitary alpha predators, and only the most dauntless elite within the Wolf Guard have the dominance to ride them to war. When they charge, crushing jaws tear through armoured plates, flesh and bone with feral butchery, while the Thunderwolves’ riders hack down the foe with heroic ferocity.",
    "profiles": [
      {
        "name": "Thunderwolf Cavalry",
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
        "name": "Teeth and claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Wolf Guard weapon",
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
        "name": "Thunderous Charge",
        "text": "Each time a model in this unit makes a melee attack with its Wolf Guard weapon, if it made a Charge move this turn, add 1 to the Damage characteristic of that attack."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Thunderwolf Cavalry Pack Leader",
      "2-5 Thunderwolf Cavalry"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; teeth and claws; Wolf Guard weapon.",
    "options": [
      "Any number of models can each have their bolt pistol replaced with one of the following:\n▪ 1 boltgun\n▪ 1 storm shield",
      "For every 3 models in this unit, one model’s bolt pistol can be replaced with 1 plasma pistol."
    ],
    "keywords": [
      "Mounted",
      "Grenades",
      "Imperium",
      "Thunderwolf Cavalry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "ulrik-the-slayer",
    "name": "Ulrik the Slayer",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "A paragon of wisdom and experience, Ulrik the Slayer has mentored many of the Space Wolves’ greatest champions. He is the Wolf High Priest, inspiring all who fight alongside him with his aggression and martial prowess. Turning his fearsome gaze upon mighty foes, Ulrik swears weighty oaths to cut them down.",
    "profiles": [
      {
        "name": "Ulrik the Slayer",
        "m": "7\"",
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
        "name": "Artificer crozius arcanum",
        "tags": [
          "ANTI-MONSTER 4+",
          "ANTI-VEHICLE 4+"
        ],
        "a": "5",
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
        "name": "Slayer’s Oath",
        "text": "At the start of the battle, select one of the following keywords to be this model’s Slayer’s Oath: CHARACTER; MONSTER; VEHICLE. The first time this model’s unit destroys a unit with this model’s Slayer’s Oath keyword, if your Detachment rule has a Saga, until the end of the battle, this model’s unit receives the benefits of that Detachment rule as if that Saga had been completed."
      },
      {
        "name": "Oathbound",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Hit roll. If that attack targets a unit that has this model’s Slayer’s Oath keyword (see Slayer’s Oath), add 1 to the Wound roll as well."
      }
    ],
    "composition": [
      "1 Ulrik the Slayer – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; artificer crozius arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wolf Guard Headtakers",
        "Grey Hunters",
        "Blood Claws"
      ]
    },
    "keywords": [
      "Ulrik the Slayer",
      "Imperium",
      "Grenades",
      "Epic Hero",
      "Wolf Priest",
      "Character",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "32mm"
  },
  {
    "id": "venerable-dreadnought",
    "name": "Venerable Dreadnought",
    "points": [
      {
        "models": 1,
        "points": 125,
        "note": "1st-2nd"
      },
      {
        "models": 1,
        "points": 135,
        "note": "3rd+"
      }
    ],
    "flavor": "Venerable Dreadnoughts are priceless relics steeped in centuries of battle. The ancient warriors at the heart of each are living legends of the Space Wolves, with wisdom as deep as the ocean and intuition as sharp as krakens’ teeth. Awoken from dormancy, they fight as lords of battle, seemingly stepping from the sagas to kill in the name of Russ.",
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
        "name": "Helfrost cannon – dispersed",
        "tags": [
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
        "name": "Helfrost cannon – focused",
        "tags": [],
        "range": "36\"",
        "a": "1",
        "bs": "3+",
        "s": "10",
        "ap": "-3",
        "d": "5"
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
        "name": "Dreadnought combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
        "s": "12",
        "ap": "-2",
        "d": "3"
      },
      {
        "name": "Fenrisian great axe – strike",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Fenrisian great axe – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deadly Demise 1",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Fervour of the Ancients (Aura)",
        "text": "While a friendly SPACE WOLVES unit is within 6\" of this model, add 1 to Advance and Charge rolls made for that unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Blizzard Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Venerable Dreadnought"
    ],
    "loadout": "**This model is equipped with:** assault cannon; storm bolter; Dreadnought combat weapon.",
    "options": [
      "This model’s assault cannon can be replaced with one of the following:\n▪ 1 helfrost cannon\n▪ 1 multi-melta",
      "This model’s storm bolter can be replaced with 1 heavy flamer.",
      "This model’s assault cannon, storm bolter and Dreadnought combat weapon can be replaced with one of the following:\n▪ 1 Fenrisian great axe, 1 blizzard shield and 1 storm bolter\n▪ 1 Fenrisian great axe, 1 blizzard shield and 1 heavy flamer"
    ],
    "keywords": [
      "Venerable Dreadnought",
      "Dreadnought",
      "Vehicle",
      "Walker",
      "Smoke",
      "Imperium"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "wolf-guard",
    "name": "Wolf Guard",
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
    "profiles": [
      {
        "name": "Wolf Guard",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "5+",
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
        "name": "Heirloom weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-1",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Chosen Companions",
        "text": "While a CHARACTER model is leading this unit, each time a model in this unit makes an attack, add 1 to the Hit roll."
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
        "name": "ATTACHED UNIT",
        "text": "If a CHARACTER unit from your army with the Leader ability can be attached to a Sternguard Veteran Squad or Vanguard Veteran Squad, it can be attached to this unit instead."
      }
    ],
    "composition": [
      "1 Wolf Guard Pack Leader",
      "4-9 Wolf Guard"
    ],
    "loadout": "**Every model is equipped with:** bolt pistol; heirloom weapon.",
    "options": [
      "Any number of models can have their bolt pistol replaced with one of the following:\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 storm shield"
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Wolf Guard"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-battle-leader",
    "name": "Wolf Guard Battle Leader",
    "points": [
      {
        "models": 1,
        "points": 65
      }
    ],
    "flavor": "Mighty champions all, these warriors are entrusted by their Wolf Lords with the responsibility of leadership and demonstrate an exceptional gift for strategic command. As members of the Wolf Guard, Battle Leaders have access to a range of relic weapons, enabling them to lead their warriors into the fray, as Fenrisian tradition demands.",
    "profiles": [
      {
        "name": "Wolf Guard Battle Leader",
        "m": "7\"",
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
        "name": "Master-crafted bolt carbine",
        "tags": [],
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "4",
        "ap": "0",
        "d": "2"
      },
      {
        "name": "Master-crafted heavy bolt pistol",
        "tags": [
          "PISTOL"
        ],
        "range": "18\"",
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
      }
    ],
    "melee": [
      {
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "7",
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
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tempered Ferocity",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability and, each time a model in that unit makes an attack that targets an enemy unit within 6\", re-roll a Hit roll of 1."
      },
      {
        "name": "Heroic Last Stand",
        "text": "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 2+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Wolf Guard Battle Leader"
    ],
    "loadout": "**This model is equipped with:** master-crafted power weapon; storm shield.",
    "options": [
      "This model's master-crafted power weapon can be replaced with 1 thunder hammer.",
      "This model’s storm shield can be replaced with one of the following:\n▪ 1 master-crafted bolt carbine\n▪ 1 master-crafted heavy bolt pistol\n▪ 1 plasma pistol"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wolf Guard Headtakers",
        "Grey Hunters",
        "Blood Claws"
      ]
    },
    "keywords": [
      "Character",
      "Imperium",
      "Tacticus",
      "Wolf Guard",
      "Battle Leader",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wolf-guard-battle-leader-in-terminator-armour",
    "name": "Wolf Guard Battle Leader in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 75
      }
    ],
    "profiles": [
      {
        "name": "Wolf Guard Battle Leader in Terminator Armour",
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
        "name": "Close combat weapon",
        "tags": [],
        "a": "5",
        "ws": "3+",
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
    "core": "Deep Strike, Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Huskarl to the Jarl",
        "text": "While this model is attached to a unit that contains another CHARACTER model, all CHARACTER models in that unit have the Feel No Pain 4+ ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 6."
      }
    ],
    "composition": [
      "1 Wolf Guard Battle Leader in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; power weapon.",
    "options": [
      "This model’s power weapon can be replaced with one of the following:\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 relic shield and 1 close combat weapon\n▪ 1 thunder hammer",
      "This model’s storm bolter can be replaced with one of the following:\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 combi-weapon",
      "This model’s storm bolter and power weapon can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Relic Terminator Squad",
        "Terminator Assault Squad",
        "Terminator Squad",
        "Wolf Guard Terminators"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Imperium",
      "Terminator",
      "Wolf Guard Battle Leader in Terminator Armour"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-battle-leader-on-thunderwolf",
    "name": "Wolf Guard Battle Leader on Thunderwolf",
    "points": [
      {
        "models": 1,
        "points": 80
      }
    ],
    "flavor": "Battle Leaders are champions possessing great tactical acumen, and are hand-picked by their lord to lead forces of their own. The most aggressive often choose to ride to war on the back of a Thunderwolf.",
    "profiles": [
      {
        "name": "Wolf Guard Battle Leader on Thunderwolf",
        "m": "10\"",
        "t": "6",
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
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
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
      },
      {
        "name": "Crushing teeth and claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
        "ap": "-1",
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
        "name": "Relic weapon",
        "tags": [],
        "a": "5",
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
    "core": "Leader",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Tactical Precision",
        "text": "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability."
      },
      {
        "name": "Aggressive Hunter",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed as a result of those attacks, this unit can make a surge move of up to D6\"."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Wolf Guard Battle Leader on Thunderwolf"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; crushing teeth and claws; relic weapon.",
    "options": [
      "This model’s relic weapon can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield and 1 close combat weapon",
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 combi-weapon\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 relic weapon\n▪ 1 thunder hammer",
      "This model’s bolt pistol and relic weapon can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Thunderwolf Cavalry"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Wolf Guard Battle Leader on Thunderwolf"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-headtakers",
    "name": "Wolf Guard Headtakers",
    "points": [
      {
        "points": 85,
        "note": "3 Wolf Guard Headtakers (1st-2nd)"
      },
      {
        "points": 115,
        "note": "3 Wolf Guard Headtakers, 3 Hunting Wolves (1st-2nd)"
      },
      {
        "points": 170,
        "note": "6 Wolf Guard Headtakers (1st-2nd)"
      },
      {
        "points": 230,
        "note": "6 Wolf Guard Headtakers, 6 Hunting Wolves (1st-2nd)"
      },
      {
        "points": 95,
        "note": "3 Wolf Guard Headtakers (3rd+)"
      },
      {
        "points": 125,
        "note": "3 Wolf Guard Headtakers, 3 Hunting Wolves (3rd+)"
      },
      {
        "points": 180,
        "note": "6 Wolf Guard Headtakers (3rd+)"
      },
      {
        "points": 240,
        "note": "6 Wolf Guard Headtakers, 6 Hunting Wolves (3rd+)"
      }
    ],
    "flavor": "It is the duty of Wolf Guard Headtakers to break through the enemy line and hunt down commanders and champions. In this task, they are aided by packs of Fenrisian hunting wolves. These cunning beasts scatter enemy formations and harry the Headtakers’ prey, enabling their handlers to close in and dispense the Allfather’s justice with their master-crafted weapons.",
    "profiles": [
      {
        "name": "Wolf Guard Headtaker",
        "m": "7\"",
        "t": "4",
        "sv": "3+",
        "w": "3",
        "ld": "6+",
        "oc": "1",
        "baseSize": "40mm"
      },
      {
        "name": "Hunting Wolves",
        "m": "10\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "0",
        "baseSize": "60x35.5mm"
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
        "name": "Master-crafted power weapon",
        "tags": [],
        "a": "4",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Paired master-crafted power weapons",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Teeth and claws",
        "tags": [],
        "a": "3",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Let Loose the Wolves",
        "text": "At the start of the Declare Battle Formations step, split this unit into two units, one containing all of its HEADTAKERS models and one containing all of its HUNTING WOLVES models, with new Starting Strengths accordingly."
      },
      {
        "name": "Headhunters",
        "text": "At the start of the battle, select one unit from your opponent’s army to be this unit’s quarry. Weapons equipped by HEADTAKERS models in this unit have the [DEVASTATING WOUNDS] and [PRECISION] abilities while targeting its quarry. Each time this unit’s quarry is destroyed, select one new enemy unit to be this unit’s quarry. This ability can be used even if this unit is embarked within a TRANSPORT."
      },
      {
        "name": "Hunting Hounds",
        "text": "While this unit is within 6\" of one or more friendly Space Wolves Character models (excluding Wulfen models), if this unit is not Battle-shocked, HUNTING WOLVES models in it have an Objective Control characteristic of 1."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "3-6 Wolf Guard Headtakers",
      "0-6 Hunting Wolves"
    ],
    "loadout": "**Every Wolf Guard Headtaker is equipped with:** heavy bolt pistol; master-crafted power weapon; storm shield.\n\n**Every Hunting Wolf is equipped with:** teeth and claws.",
    "options": [
      "All of the models in this unit can each have their master-crafted power weapon and storm shield replaced with 1 paired master-crafted power weapons."
    ],
    "keywords": [
      "Imperium",
      "Beasts",
      "Headtakers",
      "Wolf Guard",
      "Tacticus",
      "Infantry",
      "Hunting Wolves"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ]
  },
  {
    "id": "wolf-guard-pack-leader",
    "name": "Wolf Guard Pack Leader",
    "points": [
      {
        "models": 1,
        "points": 30
      }
    ],
    "profiles": [
      {
        "name": "Wolf Guard Pack Leader",
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
        "bs": "3+",
        "s": "4",
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
        "a": "3",
        "ws": "4+",
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
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Leader",
        "text": "While this model is leading a unit, once per battle, when a Battle-shock test is taken for that unit, you can re-roll that test."
      },
      {
        "name": "Pack Leader",
        "text": "This model cannot be your WARLORD and cannot be given Enhancements."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Wolf Guard Pack Leader"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; boltgun; close combat weapon.",
    "options": [
      "This model’s bolt pistol and boltgun can be replaced with two different weapons from the following list:*\n▪ 1 bolt pistol\n▪ 1 boltgun\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).",
      "This model’s bolt pistol and boltgun can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Grey Hunters",
        "Long Fangs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Pack Leader",
      "Wolf Guard Pack Leader"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-pack-leader-in-terminator-armour",
    "name": "Wolf Guard Pack Leader in Terminator Armour",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Those Wolf Guard granted the raw power afforded by Terminator armour bestride the battlefield as nigh-invulnerable champions. Amongst the packs they lead, they serve as indomitable anvils, anchoring their battle-brothers’ lines with their intimidating bulk and unleashing the power of their ornate weapons to destructive effect.",
    "profiles": [
      {
        "name": "Wolf Guard Pack Leader in Terminator Armour",
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
        "name": "Combi-weapon",
        "tags": [
          "ANTI-INFANTRY 4+",
          "DEVASTATING WOUNDS",
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
    "core": "Deep Strike, Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Leader",
        "text": "While this model is leading a unit, once per battle, when a Battle-shock test is taken for that unit, you can re-roll that test."
      },
      {
        "name": "Pack Leader",
        "text": "This model cannot be your WARLORD and cannot be given Enhancements."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "1 Wolf Guard Pack Leader in Terminator Armour"
    ],
    "loadout": "**This model is equipped with:** storm bolter; power weapon.",
    "options": [
      "This model’s storm bolter and power weapon can be replaced with two different options from the following list:*\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 cyclone missile launcher and 1 storm bolter\n▪ 1 storm bolter\n▪ 1 chainfist\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 storm shield\n* This model can only be equipped with two ranged weapons if one of them is a cyclone missile launcher and the other is either a storm bolter or a combi-weapon.",
      "This model’s storm bolter and power weapon can be replaced with 1 twin lightning claws.",
      "This model’s storm bolter can be replaced with 1 combi-weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Blood Claws",
        "Grey Hunters",
        "Long Fangs"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Terminator",
      "Pack Leader",
      "Wolf Guard Pack Leader in Terminator Armour"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-pack-leader-with-jump-pack",
    "name": "Wolf Guard Pack Leader with Jump Pack",
    "points": [
      {
        "models": 1,
        "points": 35
      }
    ],
    "profiles": [
      {
        "name": "Wolf Guard Pack Leader with Jump Pack",
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
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "core": "Deep Strike, Support",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Inspiring Leader",
        "text": "While this model is leading a unit, once per battle, when a Battle-shock test is taken for that unit, you can re-roll that test."
      },
      {
        "name": "Pack Leader",
        "text": "This model cannot be your WARLORD and cannot be given Enhancements."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Wolf Guard Pack Leader with Jump Pack"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "This model’s bolt pistol and Astartes chainsword can be replaced with two different weapons from the following list:*\n▪ 1 bolt pistol\n▪ 1 combi-weapon\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 Astartes chainsword\n▪ 1 power fist\n▪ 1 power weapon\n▪ 1 thunder hammer\n▪ 1 storm shield\n* This model can only be equipped with two ranged weapons if one of them is a Pistol (and it can only have one Pistol).",
      "This model’s bolt pistol and Astartes chainsword can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Skyclaws"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Jump Pack",
      "Fly",
      "Grenades",
      "Imperium",
      "Pack Leader",
      "Wolf Guard Pack Leader with Jump Pack"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-guard-terminators",
    "name": "Wolf Guard Terminators",
    "points": [
      {
        "models": 5,
        "points": 155,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 310,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 195,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 350,
        "note": "3rd+"
      }
    ],
    "flavor": "Wolf Guard bedeck their Terminator armour with totems, trophies and marks of honour gained over their years of battle. They fight at the spearhead of assaults, eagerly seeking glory as enemy fire deflects harmlessly from their relic armour, the earth shaking beneath their heavy tread as they slay with stunning skill.",
    "profiles": [
      {
        "name": "Wolf Guard Terminators",
        "m": "6\"",
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
        "bs": "2+",
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
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
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
        "name": "Relic greataxe",
        "tags": [
          "DEVASTATING WOUNDS"
        ],
        "a": "3",
        "ws": "3+",
        "s": "7",
        "ap": "-2",
        "d": "3"
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
        "name": "Rugged Resilience",
        "text": "Each time an attack targets this unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of this unit, subtract 1 from the Wound roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Storm Shield",
        "text": "The bearer has a Wounds characteristic of 4."
      }
    ],
    "composition": [
      "1 Wolf Guard Terminator Pack Leader",
      "4-9 Wolf Guard Terminators"
    ],
    "loadout": "**The Wolf Guard Terminator Pack Leader is equipped with:** storm bolter; master-crafted power weapon.\n\n**Every Wolf Guard Terminator is equipped with:** storm bolter; master-crafted power weapon.",
    "options": [
      "Any number of models can each have their storm bolter replaced with 1 storm shield.",
      "For every 5 models in this unit, 1 Wolf Guard Terminator can replace its storm bolter and master-crafted power weapon with 1 assault cannon and 1 power fist.",
      "The Wolf Guard Terminator Pack Leader’s storm bolter and master-crafted power weapon can be replaced with 1 of the following:\n▪ 1 relic greataxe\n▪ 1 twin lightning claws"
    ],
    "keywords": [
      "Infantry",
      "Imperium",
      "Terminator",
      "Wolf Guard",
      "Wolf Guard Terminators"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wolf-lord-on-thunderwolf",
    "name": "Wolf Lord on Thunderwolf",
    "points": [
      {
        "models": 1,
        "points": 100
      }
    ],
    "profiles": [
      {
        "name": "Wolf Lord on Thunderwolf",
        "m": "10\"",
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
        "a": "2",
        "bs": "2+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "melee": [
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "4",
        "ap": "0",
        "d": "1"
      },
      {
        "name": "Crushing teeth and claws",
        "tags": [
          "EXTRA ATTACKS"
        ],
        "a": "3",
        "ws": "4+",
        "s": "5",
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
        "name": "Rites of Battle",
        "text": "Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit from your army has already been targeted with that Stratagem this phase."
      },
      {
        "name": "Speed of the Hunter",
        "text": "Add 1 to Advance and Charge rolls made for this model’s unit."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Relic Shield",
        "text": "The bearer has a Wounds characteristic of 7."
      }
    ],
    "composition": [
      "1 Wolf Lord on Thunderwolf"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; crushing teeth and claws; relic weapon.",
    "options": [
      "This model’s relic weapon can be replaced with one of the following:\n▪ 1 plasma pistol\n▪ 1 power fist\n▪ 1 thunder hammer\n▪ 1 relic shield and 1 close combat weapon",
      "This model’s bolt pistol can be replaced with one of the following:\n▪ 1 combi-weapon\n▪ 1 master-crafted boltgun\n▪ 1 plasma pistol\n▪ 1 storm bolter\n▪ 1 power fist\n▪ 1 relic weapon\n▪ 1 thunder hammer",
      "This model’s bolt pistol and relic weapon can be replaced with 1 twin lightning claws."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Thunderwolf Cavalry"
      ]
    },
    "keywords": [
      "Mounted",
      "Character",
      "Grenades",
      "Imperium",
      "Captain",
      "Wolf Lord on Thunderwolf"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "legends": true,
    "source": "faction-pack",
    "sourceVersion": "1.2"
  },
  {
    "id": "wolf-priest",
    "name": "Wolf Priest",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "Wolf Priests are elder sages who tend to their battle-brothers’ spiritual and physical well-being. In battle, they inspire by bellowing litanies and extracts from epic sagas. Clad in black, bedecked with shamanistic totems and wearing macabre wolf-skull helms, they are terrifying to behold.",
    "profiles": [
      {
        "name": "Wolf Priest",
        "m": "7\"",
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
        "name": "Healing Balms",
        "text": "While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to that unit."
      },
      {
        "name": "Litany of Hate",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll."
      }
    ],
    "composition": [
      "1 Wolf Priest"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; crozius arcanum.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Wolf Guard Headtakers",
        "Grey Hunters",
        "Blood Claws"
      ]
    },
    "keywords": [
      "Character",
      "Wolf Priest",
      "Imperium",
      "Tacticus",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wolf-scouts",
    "name": "Wolf Scouts",
    "points": [
      {
        "models": 6,
        "points": 90
      },
      {
        "models": 12,
        "points": 180
      }
    ],
    "flavor": "Wolf Scouts are tasked with operating ahead of the main Space Wolves assault force, infiltrating enemy positions and seizing or sabotaging key locations. More than capable of operating alone for extended periods of time, they use guile and savagery to distract and harrass the foe.",
    "profiles": [
      {
        "name": "WOLF SCOUTS",
        "m": "7\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "1",
        "baseSize": "32mm"
      },
      {
        "name": "HUNTING WOLVES",
        "m": "10\"",
        "t": "4",
        "sv": "6+",
        "w": "1",
        "ld": "8+",
        "oc": "0",
        "baseSize": "60x35.5mm"
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
        "name": "Thunderclap",
        "tags": [
          "BLAST",
          "PSYCHIC"
        ],
        "range": "12\"",
        "a": "D3",
        "bs": "3+",
        "s": "5",
        "ap": "-1",
        "d": "2"
      }
    ],
    "melee": [
      {
        "name": "Combat blade",
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
        "name": "Runic stave",
        "tags": [
          "PSYCHIC"
        ],
        "a": "3",
        "ws": "3+",
        "s": "6",
        "ap": "-1",
        "d": "D3"
      },
      {
        "name": "Teeth and claws",
        "tags": [],
        "a": "2",
        "ws": "4+",
        "s": "4",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Infiltrators, Scouts 7\"",
    "faction": "Oath of Moment",
    "abilities": [
      {
        "name": "Deadly Stalkers",
        "text": "Each time a model in this unit makes an attack that targets an enemy unit, if there are no other units from your opponent’s army within 6\" of that target, add 1 to the Wound roll."
      },
      {
        "name": "Hunting Hounds",
        "text": "While this unit is within 6\" of one or more friendly Space Wolves Character models (excluding Wulfen models), if this unit is not Battle-shocked, Hunting Wolves models in this unit have an Objective Control characteristic of 1."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Haywire Mine",
        "text": "Once per battle, at the start of any phase, you can select one enemy unit within 3\" of the bearer and roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds, or 2D3 mortal wounds instead if it is a VEHICLE unit."
      }
    ],
    "composition": [
      "1 Wolf Scout Pack Leader",
      "4 Wolf Scouts",
      "1 Hunting Wolf",
      "OR",
      "1 Wolf Scout Pack Leader",
      "9 Wolf Scouts",
      "2 Hunting Wolves"
    ],
    "loadout": "**The Wolf Scout Pack Leader model is equipped with:** plasma pistol; power weapon.\n\n**Every Wolf Scout model is equipped with:** plasma pistol; combat blade.\n\n**Every Hunting Wolf model is equipped with:** teeth and claws.",
    "options": [
      "1 Wolf Scout’s plasma pistol can be replaced with 1 plasma gun.",
      "1 Wolf Scout equipped with a plasma pistol can be equipped with 1 haywire mine (That model’s plasma pistol cannot be replaced).",
      "1 Wolf Scout’s plasma pistol and combat blade can be replaced with 1 bolt pistol, 1 Thunderclap and 1 runic stave.",
      "If this unit contains 12 models, 1 Wolf Scout’s plasma pistol can be replaced with 1 instigator bolt carbine."
    ],
    "keywords": [
      "Wolf Scouts",
      "Phobos",
      "Smoke",
      "Grenades",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ]
  },
  {
    "id": "wulfen",
    "name": "Wulfen",
    "points": [
      {
        "models": 5,
        "points": 85,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 170,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 95,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 180,
        "note": "3rd+"
      }
    ],
    "flavor": "Wulfen exist on the brink of constant berserk rages, and their chilling howls unleash the inner beast in sons of Russ nearby. Wulfen are bestial warriors, altered by the Curse lying in the blood of all scions of the Wolf King. They are hunters, bounding forward with fangs bared and claws outstretched, ripping foes apart with inhuman speed.",
    "profiles": [
      {
        "name": "Wulfen",
        "m": "9\"",
        "t": "6",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "0"
      }
    ],
    "ranged": [
      {
        "name": "Stormfrag auto-launcher",
        "tags": [
          "ASSAULT",
          "BLAST"
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
        "name": "Wulfen weapons",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "3",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Curse of the Wulfen, Oath of Moment",
    "abilities": [
      {
        "name": "Savage Frenzy",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of this unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Death Totem",
        "text": "Each time the bearer makes a melee attack, re-roll a Hit roll of 1."
      }
    ],
    "composition": [
      "5-10 Wulfen"
    ],
    "loadout": "**Every model is equipped with:** Wulfen weapons; death totem.",
    "options": [
      "Any number of models can each have their death totem replaced with 1 stormfrag auto-launcher."
    ],
    "keywords": [
      "Wulfen",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Space Wolves",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "wulfen-dreadnought",
    "name": "Wulfen Dreadnought",
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
    "flavor": "Even near death and interred in a Dreadnought sarcophagus, a warrior may yet succumb to the Curse of the Wulfen. Joints and servos twitch and spasm like a crazed animal’s muscles as a Wulfen Dreadnought seeks to maul and eviscerate. From emitters, baleful howls blare its mindless hunger for violence.",
    "profiles": [
      {
        "name": "Wulfen Dreadnought",
        "m": "9\"",
        "t": "9",
        "sv": "2+",
        "w": "8",
        "ld": "6+",
        "oc": "0"
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
        "name": "Fenrisian great axe – strike",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-2",
        "d": "D6+1"
      },
      {
        "name": "Fenrisian great axe – sweep",
        "tags": [],
        "a": "12",
        "ws": "3+",
        "s": "6",
        "ap": "-2",
        "d": "1"
      },
      {
        "name": "Great wolf claw",
        "tags": [],
        "a": "6",
        "ws": "3+",
        "s": "10",
        "ap": "-3",
        "d": "3"
      }
    ],
    "core": "Deadly Demise 1, Feel No Pain 6+",
    "faction": "Curse of the Wulfen, Oath of Moment",
    "abilities": [
      {
        "name": "Bestial Rage",
        "text": "In your opponent’s Shooting phase, when an enemy unit has shot, if this model lost a wound as a result of those attacks, this unit can make a surge move of up to D6+2\"."
      },
      {
        "name": "Violent Fury",
        "text": "If this model is equipped with two melee weapons, those weapon profiles have the [TWIN-LINKED] ability."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Blizzard Shield",
        "text": "The bearer has a 4+ invulnerable save."
      }
    ],
    "composition": [
      "1 Wulfen Dreadnought"
    ],
    "loadout": "**This model is equipped with:** storm bolter; Fenrisian great axe; great wolf claw.",
    "options": [
      "This model’s Fenrisian great axe or great wolf claw and storm bolter can be replaced with 1 blizzard shield and 1 heavy flamer.",
      "If this model is not equipped with a storm bolter, its heavy flamer can be replaced with 1 storm bolter."
    ],
    "keywords": [
      "Imperium",
      "Dreadnought",
      "Wulfen",
      "Walker",
      "Vehicle"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "60mm"
  },
  {
    "id": "wulfen-with-storm-shields",
    "name": "Wulfen with Storm Shields",
    "points": [
      {
        "models": 5,
        "points": 100,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 200,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 110,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 210,
        "note": "3rd+"
      }
    ],
    "flavor": "When faced with armoured formations or monstrous xenos foes, the Space Wolves may equip their Wulfen warriors with thunder hammers and storm shields. Armed thus, Wulfen warriors can deflect even the heaviest barrage of fire and close with their prey, bringing their thunder hammers to bear and cracking open reinforced armour with ease.",
    "profiles": [
      {
        "name": "Wulfen",
        "m": "9\"",
        "t": "6",
        "sv": "4+",
        "w": "2",
        "ld": "7+",
        "oc": "0",
        "inv": "4+"
      }
    ],
    "ranged": [
      {
        "name": "Stormfrag auto-launcher",
        "tags": [
          "ASSAULT",
          "BLAST"
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
        "name": "Thunder hammer",
        "tags": [
          "ANTI-MONSTER 3+",
          "ANTI-VEHICLE 3+"
        ],
        "a": "2",
        "ws": "3+",
        "s": "5",
        "ap": "-2",
        "d": "3"
      }
    ],
    "faction": "Curse of the Wulfen, Oath of Moment",
    "abilities": [
      {
        "name": "Hammer Blow",
        "text": "In the Fight phase, after this unit has fought, select one enemy MONSTER or VEHICLE unit hit by one or more of those attacks. Until the end of the next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll."
      }
    ],
    "wargearAbilities": [
      {
        "name": "Death Totem",
        "text": "Each time the bearer makes a melee attack, re-roll a Hit roll of 1."
      }
    ],
    "composition": [
      "5-10 Wulfen"
    ],
    "loadout": "**Every model is equipped with:** thunder hammer; death totem.",
    "options": [
      "Any number of models can each have their death totem replaced with 1 stormfrag auto-launcher."
    ],
    "keywords": [
      "Wulfen with Storm Shields",
      "Wulfen",
      "Imperium",
      "Infantry"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Space Wolves"
    ],
    "baseSize": "40mm"
  }
]
