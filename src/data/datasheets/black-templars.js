// Black Templars — datasheets. Unit roster and points from src/data/mfm/black-templars.js.
// wh40k-appdata is the source of truth — `npm run sync` diffs this file against it.
// Lazy-loaded per faction via src/data/datasheets/index.js — do not import statically.
// 18 chapter-specific/differing datasheets here; 72 units identical
// to space-marines.js are NOT duplicated — see sharedUnitIds below and
// src/data/datasheets/index.js (loadDatasheets merges them in by id).
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
  "captain-with-jump-pack",
  "centurion-assault-squad",
  "centurion-devastator-squad",
  "chaplain",
  "chaplain-in-terminator-armour",
  "chaplain-on-bike",
  "chaplain-with-jump-pack",
  "company-heroes",
  "desolation-squad",
  "devastator-squad",
  "dreadnought",
  "drop-pod",
  "eliminator-squad",
  "eradicator-squad",
  "eradicator-squad-with-heavy-bolters",
  "firestrike-servo-turrets",
  "hammerfall-bunker",
  "heavy-intercessor-squad",
  "hellblaster-squad",
  "inceptor-squad",
  "incursor-squad",
  "infernus-squad",
  "infiltrator-squad",
  "intercessor-squad",
  "invader-atv",
  "invictor-tactical-warsuit",
  "judiciar",
  "land-raider",
  "land-raider-redeemer",
  "land-speeder",
  "lieutenant",
  "lieutenant-in-phobos-armour",
  "lieutenant-in-reiver-armour",
  "lieutenant-with-combi-weapon",
  "outrider-squad",
  "predator-annihilator",
  "predator-destructor",
  "razorback",
  "redemptor-dreadnought",
  "reiver-squad",
  "rhino",
  "scout-squad",
  "storm-speeder-hailstrike",
  "storm-speeder-hammerstrike",
  "storm-speeder-thunderstrike",
  "stormhawk-interceptor",
  "stormraven-gunship",
  "stormtalon-gunship",
  "suppressor-squad",
  "tactical-squad",
  "techmarine",
  "terminator-assault-squad",
  "thunderhawk-gunship",
  "vanguard-veteran-squad-with-jump-packs",
  "vindicator",
  "whirlwind"
]

export default [
  {
    "id": "gladiator-lancer",
    "name": "Gladiator Lancer",
    "points": [
      {
        "models": 1,
        "points": 160
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
    "faction": "Templar Vows",
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
      "This model can be equipped with one of the following:\n▪ 1 ironhail heavy stubber\n▪ 1 multi-melta",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Frame",
      "Gladiator Lancer",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [],
    "baseSize": "100mm"
  },
  {
    "id": "gladiator-reaper",
    "name": "Gladiator Reaper",
    "points": [
      {
        "models": 1,
        "points": 160
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Reaping Tally",
        "text": "This model’s twin heavy onslaught gatling cannon has the **[SUSTAINED HITS 2]** ability when targeting **INFANTRY** units."
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
      "This model can be equipped with one of the following:\n▪ 1 ironhail heavy stubber\n▪ 1 multi-melta",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Frame",
      "Gladiator Reaper",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [],
    "baseSize": "100mm"
  },
  {
    "id": "gladiator-valiant",
    "name": "Gladiator Valiant",
    "points": [
      {
        "models": 1,
        "points": 150
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Priority Target Acquisition",
        "text": "Each time this model makes an attack with its twin las-talon that targets the closest eligible **MONSTER** or **VEHICLE** unit, add 1 to the Hit roll."
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
      "This model can be equipped with one of the following:\n▪ 1 ironhail heavy stubber\n▪ 1 multi-melta",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "keywords": [
      "Frame",
      "Gladiator Valiant",
      "Imperium",
      "Smoke",
      "Vehicle"
    ],
    "factionKeywords": [],
    "baseSize": "100mm"
  },
  {
    "id": "impulsor",
    "name": "Impulsor",
    "points": [
      {
        "models": 1,
        "points": 75,
        "note": "1st-3rd"
      },
      {
        "models": 1,
        "points": 85,
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
    "faction": "Templar Vows",
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
      "This model can be equipped with one of the following:\n▪ 1 ironhail heavy stubber\n▪ 1 multi-melta",
      "This model’s 2 storm bolters can be replaced with 2 fragstorm grenade launchers.",
      "This model can be equipped with one of the following:\n▪ 1 bellicatus missile array\n▪ 1 ironhail skytalon array\n▪ 1 orbital comms array\n▪ 1 shield dome"
    ],
    "transport": "This model has a transport capacity of 7 Tacticus or Phobos Infantry models. It cannot transport Jump Pack models.",
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
    "id": "castellan",
    "name": "Castellan",
    "points": [
      {
        "models": 1,
        "points": 70
      }
    ],
    "flavor": "A Castellan leads each of a crusade’s fighting companies and acts as a conduit for their Marshal’s will. Charged with the physical and spiritual purity of active Chapter Keeps, they have honed a patient wisdom that they draw upon in battle, alongside their tactical precision and close-quarters ferocity.",
    "profiles": [
      {
        "name": "Castellan",
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
        "name": "Master-crafted power weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "6",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Support",
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Vehement Aggression",
        "text": "While this model is leading a unit, each time that unit is selected to fight, take a Leadership test for that unit: if passed, until the end of the phase, each time a model in that unit makes an attack, you can re-roll the Hit roll; if failed, until the end of the phase, each time a model in that unit makes an attack, re-roll a Hit roll of 1."
      },
      {
        "name": "Prioritised Eradication",
        "text": "Each time a model in this model’s unit makes a melee attack that destroys one or more enemy units, roll one D6: on a 4+, you gain 1CP."
      }
    ],
    "composition": [
      "1 Castellan"
    ],
    "loadout": "**This model is equipped with:** combi-weapon; master-crafted power weapon.",
    "options": [
      "This model’s combi-weapon can be replaced with 1 heavy bolt pistol.",
      "This model’s master-crafted power weapon can be replaced with 1 Astartes chainsword."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Grenades",
      "Character",
      "Infantry",
      "Tacticus",
      "Lieutenant",
      "Castellan",
      "Imperium"
    ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "chaplain-grimaldus",
    "name": "Chaplain Grimaldus",
    "points": [
      {
        "models": 4,
        "points": 100
      }
    ],
    "flavor": "High Chaplain Grimaldus is a beacon of Imperial faith. His fortitude is such that many of his brothers believe him invincible. His will is singular, his zeal coldly furious, and his martial skill attested by the trail of broken foes laid at his heels. His Cenobyte Servitors lurch to war at his side, bearing with them holy relics of the faith.",
    "profiles": [
      {
        "name": "CHAPLAIN GRIMALDUS",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "4",
        "ld": "5+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "40mm"
      },
      {
        "name": "CENOBYTE SERVITOR",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "1",
        "ld": "8+",
        "oc": "1",
        "inv": "4+",
        "baseSize": "28.5mm"
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
        "name": "Artificer crozius",
        "tags": [],
        "a": "6",
        "ws": "2+",
        "s": "6",
        "ap": "-2",
        "d": "2"
      },
      {
        "name": "Close combat weapon",
        "tags": [],
        "a": "1",
        "ws": "4+",
        "s": "3",
        "ap": "0",
        "d": "1"
      }
    ],
    "core": "Feel No Pain 5+, Leader",
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Litanies of the Devout",
        "text": "While this unit is leading a unit and contains a Chaplain Grimaldus model, each time a model in that unit makes a melee attack, you can re-roll the Hit roll."
      },
      {
        "name": "Temple Relics",
        "text": "In your Command phase, if this unit contains one or more Cenobyte Servitor models, select one Temple Relics ability (see Temple Relics section). Until the start of your next Command phase, this unit’s Chaplain Grimaldus model has that ability."
      }
    ],
    "composition": [
      "1 Chaplain Grimaldus – EPIC HERO",
      "3 Cenobyte Servitors*"
    ],
    "loadout": "* If this unit’s Chaplain Grimaldus model is ever destroyed, all of this unit’s remaining Cenobyte Servitor models are also destroyed. While embarking within a Transport and while embarked within a TRANSPORT, each Cenobyte Servitor model in this unit takes up the space of 0 models.\n\n**Chaplain Grimaldus is equipped with:** plasma pistol; artificer crozius.\n\n**Every Cenobyte Servitor is equipped with:** close combat weapon.",
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
    "keywords": [
      "Chaplain",
      "Character",
      "Epic Hero",
      "Grenades",
      "Grimaldus",
      "Imperium",
      "Infantry",
      "Tacticus"
        ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "abilitySets": [
      {
        "name": "Temple Relics",
        "options": [
          {
            "name": "Banner of the Emperor Victorious",
            "text": "Add 1 to Advance and Charge rolls made for this unit."
          },
          {
            "name": "Column from the Major Altar",
            "text": "Add 1 to the Toughness characteristic of models in this unit."
          },
          {
            "name": "Water from the Stoup of Elucidation",
            "text": "Improve the Armour Penetration characteristic of melee weapons equipped by models in this unit by 1."
          }
        ]
      }
    ]
  },
  {
    "id": "crusade-ancient",
    "name": "Crusade Ancient",
    "points": [
      {
        "models": 1,
        "points": 40
      }
    ],
    "flavor": "Carrying their crusade’s icons and sacred standards, these veteran wardens are honoured warriors of exceptional resolve and determination. They raise high the tapestries depicting the crusade’s victories and the God-Emperor’s glory, exhorting their fellow Black Templars to greater heights of weaponised hate.",
    "profiles": [
      {
        "name": "Crusade Ancient",
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Vengeful Exhortation",
        "text": "While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play."
      },
      {
        "name": "Martial Honour",
        "text": "The first time a model in this model’s unit makes a melee attack that destroys one or more enemy units, until the end of the battle, while this model’s unit is not Battle-shocked, add 5 to this model’s Objective Control characteristic."
      }
    ],
    "composition": [
      "1 Crusade Ancient"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; master-crafted power weapon.",
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Crusader Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Ancient",
      "Crusade Ancient"
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
        "points": 150,
        "note": "1 Sword Brother, 4 Neophytes, 5 Initiates"
      },
      {
        "points": 290,
        "note": "1 Sword Brother, 8 Neophytes, 11 Initiates"
      }
    ],
    "flavor": "Crusader Squads storm into battle with bolt rifles blazing and chainswords howling. Initiates aim jets of fire from their pyreblasters or swing crackling power fists into their foes, while hard-eyed Neophytes fight furiously to prove their martial worth under the stem gaze of their mentors.",
    "profiles": [
      {
        "name": "NEOPHYTES",
        "m": "6\"",
        "t": "4",
        "sv": "4+",
        "w": "2",
        "ld": "6+",
        "oc": "2",
        "baseSize": "28.5mm"
      },
      {
        "name": "OTHER MODELS",
        "m": "6\"",
        "t": "4",
        "sv": "3+",
        "w": "2",
        "ld": "6+",
        "oc": "2",
        "baseSize": "32mm / 40mm"
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
        "name": "Neophyte firearm",
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
        "name": "Pyre pistol",
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
        "name": "Pyreblaster",
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
        "name": "Astartes chainsword",
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
        "name": "Master-crafted power weapon",
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
        "name": "Power fist",
        "tags": [],
        "a": "3",
        "ws": "3+",
        "s": "8",
        "ap": "-2",
        "d": "2"
      }
    ],
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Righteous Zeal",
        "text": "In your opponent’s Shooting phase, each time an enemy unit has shot, if any models in this unit were destroyed as a result of those attacks, this unit can make a surge move of up to D6+2\"."
      }
    ],
    "composition": [
      "1 Primaris Sword Brother",
      "5-11 Primaris Initiates",
      "4-8 Primaris Neophytes"
    ],
    "loadout": "**The Primaris Sword Brother is equipped with:** heavy bolt pistol; master-crafted power weapon.\n\n**Every Primaris Initiate is equipped with:** bolt pistol; bolt rifle; close combat weapon.\n\n**Every Primaris Neophyte is equipped with:** bolt pistol; Astartes chainsword.",
    "options": [
      "The Sword Brother’s heavy bolt pistol can be replaced with 1 pyre pistol.",
      "Any number of Neophytes can each have their bolt pistol and Astartes chainsword replaced with 1 Neophyte firearm and 1 close combat weapon.",
      "Any number of Initiates can each have their bolt rifle replaced with 1 heavy bolt pistol and 1 Astartes chainsword.",
      "For every 10 models in this unit, up to 2 Initiates can each have their bolt rifle replaced with one of the following:\n▪ 1 heavy bolt pistol and 1 power fist\n▪ 1 pyreblaster"
    ],
    "keywords": [
      "Infantry",
      "Battleline",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Crusader Squad"
    ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character from your army with the Leader ability can be attached to an Intercessor Squad, it can be attached to this unit instead."
      }
    ]
  },
  {
    "id": "emperors-champion",
    "name": "Emperor’s Champion",
    "points": [
      {
        "models": 1,
        "points": 90
      }
    ],
    "flavor": "A humble warrior touched by greatness, the Emperor’s Champion strides to battle wreathed in divine light. The furious blows of the enemy ring from his nigh-impenetrable Armour of Faith. In return, the Emperor’s Champion seeks out the leaders of the foe and, with sweeping blows from his Black Sword, strikes them down.",
    "profiles": [
      {
        "name": "Emperor’s Champion",
        "m": "8\"",
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
      }
    ],
    "melee": [
      {
        "name": "Black Sword – strike",
        "tags": [
          "ANTI-CHARACTER 5+",
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
    "core": "Leader, Lone Operative",
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Armour of Faith",
        "text": "Once per phase, when an attack is allocated to this model and the saving throw is failed, you can change the Damage characteristic of that attack to 0."
      },
      {
        "name": "Sigismund’s Heir",
        "text": "▪ When this unit declares a charge, If an enemy **CHARACTER** unit is within 12\" of this unit, you can use this part of this ability. If you do:\n▪ This unit can re-roll that charge roll.\n▪ This unit __must__ end that charge move engaged with one or more of those enemy **CHARACTER** units.\n▪ (Once per battle, per army) In the Fight phase, when this unit is selected to fight, if this unit is engaged with a **CHARACTER** unit, you can use this part of this ability. If you do, this unit's melee attacks have **[DEVASTATING WOUNDS]**."
      }
    ],
    "specialAbilities": [
      {
        "name": "CHOSEN OF THE EMPEROR",
        "text": "You cannot include more than one EMPEROR’S CHAMPION model in your army."
      }
    ],
    "composition": [
      "1 Emperor’s Champion"
    ],
    "loadout": "**This model is equipped with:** bolt pistol; Black Sword.",
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
      "Infantry",
      "Imperium",
      "Grenades",
      "Emperor’s Champion",
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
        "points": 50
      }
    ],
    "flavor": "Execrators are living exemplars of their battle-brothers’ oaths, ferocious warrior priests who lead the Black Templars in lethal rampages. They teach that waris the most worthy chapel for warriors, every bludgeoning blow of their crozius arcanum punctuated with zealous invective and roared sermons.",
    "profiles": [
      {
        "name": "Execrator",
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
      },
      {
        "name": "Pyre pistol",
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
        "name": "Master-crafted power weapon",
        "tags": [
          "EXTRA ATTACKS",
          "LETHAL HITS"
        ],
        "a": "3",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Remorseless Persecution",
        "text": "While this model is leading a unit, that unit is eligible to declare a charge in a turn in which it Advanced."
      },
      {
        "name": "Condemnatory Annihilation",
        "text": "Each time this model’s unit has fought, if one or more enemy units were destroyed as a result of those attacks, each enemy unit within 6\" of this model must take a Battle-shock test."
      }
    ],
    "composition": [
      "1 Execrator"
    ],
    "loadout": "**This model is equipped with:** absolvor bolt pistol; crozius arcanum.",
    "options": [
      "This model’s absolvor bolt pistol can be replaced with 1 pyre pistol.",
      "If this model is equipped with an absolvor bolt pistol, it can be equipped with 1 master-crafted power weapon (this model’s absolvor bolt pistol cannot be replaced)."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Crusader Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Imperium",
      "Infantry",
      "Character",
      "Grenades",
      "Tacticus",
      "Chaplain",
      "Execrator"
    ],
    "factionKeywords": [
      "Adeptus Astartes",
      "Black Templars"
    ],
    "baseSize": "40mm"
  },
  {
    "id": "high-marshal-helbrecht",
    "name": "High Marshal Helbrecht",
    "points": [
      {
        "models": 1,
        "points": 110
      }
    ],
    "flavor": "Helbrecht is the living embodiment of his Chapter’s warrior spirit. Wielding the Sword of the High Marshals, he storms into the fray, bellowing oaths of vengeance as he leads the unstoppable charge. His battle-brothers follow him without question, for they believe where High Marshal Helbrecht treads, so too walks the Emperor himself.",
    "profiles": [
      {
        "name": "High Marshal Helbrecht",
        "m": "6\"",
        "t": "4",
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
        "s": "8",
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Crusade of Wrath",
        "text": "While this model is leading a unit, add 1 to the Attacks and Strength characteristic of melee weapons equipped by models in that unit."
      },
      {
        "name": "High Marshal",
        "text": "At the start of the Fight phase, select one enemy unit within Engagement Range of this model’s unit and roll one D6, adding 1 to the result for every five models in this model’s unit: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6+, that enemy unit suffers D3+3 mortal wounds."
      }
    ],
    "composition": [
      "1 High Marshal Helbrecht – EPIC HERO"
    ],
    "loadout": "**This model is equipped with:** Ferocity; Sword of the High Marshals.",
    "options": [
      "None"
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Intercessor Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Epic Hero",
      "Imperium",
      "Tacticus",
      "Chapter Master",
      "High Marshal Helbrecht",
      "Character",
      "Infantry",
      "Grenades"
    ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "baseSize": "60mm"
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Assault Ramp",
        "text": "Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn."
      },
      {
        "name": "Legacy of Jerulas",
        "text": "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1."
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
    "transport": "This model has a transport capacity of 16 Adeptus Astartes Infantry models. Each Jump Pack, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
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
    "id": "marshal",
    "name": "Marshal",
    "points": [
      {
        "models": 1,
        "points": 80,
        "note": "1st"
      },
      {
        "models": 1,
        "points": 90,
        "note": "2nd+"
      }
    ],
    "flavor": "Each Black Templars crusade is led by a Marshal. Similar in rank to the Captains of other Chapters, Marshals are fearsome combatants and paragons of strategic acumen. Ensuring a crusade’s purity and success is a sacred duty, and Marshals fight with sanctified relic weapons while acting as beacons of pious fervour for their warriors.",
    "profiles": [
      {
        "name": "Marshal",
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
        "name": "Master-crafted power weapon",
        "tags": [
          "LETHAL HITS"
        ],
        "a": "7",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "2"
      }
    ],
    "core": "Leader",
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Inspirational Exemplar",
        "text": "While this model is leading a unit, each time a model in that unit makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit."
      },
      {
        "name": "Pious Fervour",
        "text": "Each time this model’s unit is selected to fight, until the end of the phase, add 1 to the Attacks characteristic of this model’s master-crafted power weapon for each enemy unit within 6\" of this model (to a maximum of +3)."
      }
    ],
    "composition": [
      "1 Marshal"
    ],
    "loadout": "**This model is equipped with:** plasma pistol; master-crafted power weapon.",
    "options": [
      "This model’s plasma pistol can be replaced with one combi-weapon."
    ],
    "leader": {
      "text": "This model can be attached to the following units:",
      "units": [
        "Assault Intercessor Squad",
        "Crusader Squad",
        "Infernus Squad",
        "Intercessor Squad",
        "Sternguard Veteran Squad",
        "Sword Brethren Squad"
      ]
    },
    "keywords": [
      "Infantry",
      "Character",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Captain",
      "Marshal"
    ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm"
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
        "range": "24\"",
        "a": "2",
        "bs": "3+",
        "s": "10",
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Stabilised Disembarkation",
        "text": "In your opponent’s Shooting phase, each time an enemy unit is selected to shoot, after that unit has shot, if any of those attacks targeted this TRANSPORT, it can use this ability. If it does, any units embarked within it can disembark. When doing so, models in those units can be set up anywhere on the battlefield wholly within 6\" of this TRANSPORT and not within Engagement Range of one or more enemy units."
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
      "This model’s heavy onslaught gatling cannon can be replaced with 1 las-talon.",
      "This model can be equipped with 1 multi-melta."
    ],
    "transport": "This model has a transport capacity of 14 Adeptus Astartes Infantry models. Each Jump Pack, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
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
        "points": 265,
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Interception Strike",
        "text": "Each time this model makes a ranged attack that targets an enemy unit within 12\" of one or more ADEPTUS ASTARTES units from your army, you can re-roll the Hit roll."
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
      "This model can be equipped with one of the following:\n▪ 1 ironhail heavy stubber\n▪ 1 multi-melta",
      "This model can be equipped with 1 Icarus rocket pod."
    ],
    "transport": "This model has a transport capacity of 7 Adeptus Astartes Infantry models. Each Jump Pack, Gravis or Terminator model takes up the space of 2 models and each Centurion model takes up the space of 3 models.",
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
    "id": "sternguard-veteran-squad",
    "name": "Sternguard Veteran Squad",
    "points": [
      {
        "models": 5,
        "points": 85
      },
      {
        "models": 10,
        "points": 160
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Virtuous Onslaught",
        "text": "Each time a model in this unit makes an attack that targets the closest eligible target, re-roll a Wound roll of 1."
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
    "id": "sword-brethren-squad",
    "name": "Sword Brethren Squad",
    "points": [
      {
        "models": 4,
        "points": 105,
        "note": "1st-2nd"
      },
      {
        "models": 5,
        "points": 130,
        "note": "1st-2nd"
      },
      {
        "models": 9,
        "points": 235,
        "note": "1st-2nd"
      },
      {
        "models": 10,
        "points": 260,
        "note": "1st-2nd"
      },
      {
        "models": 4,
        "points": 120,
        "note": "3rd+"
      },
      {
        "models": 5,
        "points": 145,
        "note": "3rd+"
      },
      {
        "models": 9,
        "points": 250,
        "note": "3rd+"
      },
      {
        "models": 10,
        "points": 275,
        "note": "3rd+"
      }
    ],
    "flavor": "Every Sword Brother has earned their place amongst the Marshal’s household through acts of unswerving faith and spectacular violence. On the battlefield, they are reaping whirlwinds, unstoppable, uncompromising, and armed with a lethal assortment of weapons, and they turn upon the enemy in the Emperor’s name.",
    "profiles": [
      {
        "name": "Sword Brethren Squad",
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
      },
      {
        "name": "Pyre pistol",
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
      }
    ],
    "melee": [
      {
        "name": "Astartes chainsword",
        "tags": [
          "SUSTAINED HITS 1"
        ],
        "a": "6",
        "ws": "2+",
        "s": "4",
        "ap": "-1",
        "d": "1"
      },
      {
        "name": "Master-crafted power weapon",
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
        "a": "5",
        "ws": "2+",
        "s": "5",
        "ap": "-2",
        "d": "1"
      }
    ],
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Exploit Their Cowardice",
        "text": "Each time an enemy unit within Engagement Range of this unit is selected to Fall Back, after it ends that Fall Back move, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move."
      }
    ],
    "composition": [
      "4-10 Sword Brothers"
    ],
    "loadout": "**Every model is equipped with:** heavy bolt pistol; Astartes chainsword.",
    "options": [
      "Any number of Sword Brothers can each have their Astartes chainsword replaced with 1 master-crafted power weapon.",
      "For every 5 models in this unit, 1 Sword Brother’s Astartes chainsword can be replaced with 1 thunder hammer.",
      "For every 5 models in this unit, 1 Sword Brother’s heavy bolt pistol can be replaced with 1 plasma pistol.",
      "For every 5 models in this unit, up to 2 Sword Brothers can each have their heavy bolt pistol replaced with 1 pyre pistol.",
      "For every 5 models in this unit, 1 Sword Brother’s heavy bolt pistol and Astartes chainsword can be replaced with 1 twin lightning claws."
    ],
    "keywords": [
      "Infantry",
      "Grenades",
      "Imperium",
      "Tacticus",
      "Sword Brethren Squad"
    ],
    "factionKeywords": [
      "Black Templars",
      "Adeptus Astartes"
    ],
    "baseSize": "40mm",
    "rules": [
      {
        "name": "ATTACHED UNIT",
        "text": "If a Character from your army with the Leader ability can be attached to an Intercessor Squad, it can be attached to this unit instead."
      }
    ]
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
    "faction": "Templar Vows",
    "abilities": [
      {
        "name": "Teleport Homer",
        "text": "At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not in your opponent’s deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3\" horizontally of that token and not within 8\" horizontally of any enemy models. That token is then removed."
      },
      {
        "name": "Judgement of the Weak",
        "text": "Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of this unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests."
      }
    ],
    "composition": [
      "1 Terminator Squad Leader",
      "4-9 Terminators"
    ],
    "loadout": "**Every model is equipped with:** storm bolter; power fist.",
    "options": [
      "For every 5 models in this unit, 1 Terminator’s storm bolter can be replaced with one of the following:\n▪ 1 assault cannon\n▪ 1 heavy flamer\n▪ 1 cyclone missile launcher and 1 storm bolter.*\n* This model’s storm bolter cannot be replaced.",
      "Any number of models can each have their power fist replaced with 1 chainfist.",
      "The Terminator Squad Leader’s power fist can be replaced with 1 power weapon.",
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
  }
]
