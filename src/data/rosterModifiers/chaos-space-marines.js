// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "chaos-space-marines",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "74e8bcac-20e7-42a6-bb3f-da299f501a0c:chaos-bikers",
      "kind": "ability",
      "name": "Chaos Bikers: Rapid Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-bikers"
      },
      "hash": "7cd3528a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a Charge move this turn",
            "ru": "если юнит совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "a5c1b3db-e8e5-48b2-a00e-4226c3ada951:chaos-predator-destructor",
      "kind": "ability",
      "name": "Chaos Predator Destructor: Destructor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-predator-destructor"
      },
      "hash": "2acd6045",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against INFANTRY targets",
            "ru": "против целей INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ee01d6ea-47cc-4a7c-8b94-dcd9e8a3c430:dark-apostle",
      "kind": "ability",
      "name": "Dark Apostle: Dark Zealotry",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dark-apostle"
      },
      "hash": "64108c35",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5e80071d-8c49-4d9d-a6dc-e04e944145a9:dark-commune",
      "kind": "ability",
      "name": "Dark Commune: Dark Ritual",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dark-commune"
      },
      "hash": "6943a0ee",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3026a72c-5b06-4a83-b56b-36fb78ad9b55:dark-commune",
      "kind": "ability",
      "name": "Dark Commune: Faithful Flock",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dark-commune"
      },
      "hash": "4f9e73da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8c1bf1ec-33df-49e3-b557-a8380670eaf6:fabius-bile",
      "kind": "ability",
      "name": "Fabius Bile: Enhanced Warriors",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fabius-bile"
      },
      "hash": "646e1a31",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "09820343-0004-4592-a040-cd760fd6e4d6:forgefiend",
      "kind": "ability",
      "name": "Forgefiend: Daemonic Ordnance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "forgefiend"
      },
      "hash": "cda3afdc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "while this ability is used",
            "ru": "пока способность использована"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "while this ability is used",
            "ru": "пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "90c6edaf-0f74-4a0e-9631-b01641bebe3f:helbrute",
      "kind": "ability",
      "name": "Helbrute: Devoted to Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "helbrute"
      },
      "hash": "67092a63",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "the two melee weapons taken in addition to the close combat weapon",
            "ru": "два оружия ближнего боя, взятые вдобавок к close combat weapon"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "dacf05b3-c5a9-40f2-9452-5f86a89d342a:heldrake",
      "kind": "ability",
      "name": "Heldrake: Airborne Predator",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "heldrake"
      },
      "hash": "34bdf1df",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dffec24a-b638-4df7-82c4-9033614b490e:huron-blackheart",
      "kind": "ability",
      "name": "Huron Blackheart: Lord of Badab",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "huron-blackheart"
      },
      "hash": "da456d08",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "72d19783-f2d6-4900-a5f3-d616d886ec6c:kravek-morne",
      "kind": "ability",
      "name": "Kravek Morne: Headlong Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kravek-morne"
      },
      "hash": "662f868f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against the closest eligible target",
            "ru": "против ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7f7f725f-6107-488d-b11b-845d2788a1ce:master-of-possession",
      "kind": "ability",
      "name": "Master of Possession: Daemonkin",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "master-of-possession"
      },
      "hash": "2170496e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8306ea6a-70d3-4f00-8c41-592f3fb35e63:master-of-possession",
      "kind": "ability",
      "name": "Master of Possession: Sacrificial Dagger",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "master-of-possession"
      },
      "hash": "5302db8d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "73fd690a-fa45-4f1e-b838-f8e762cb0bce:nemesis-claw",
      "kind": "ability",
      "name": "Nemesis Claw: Visions of Suffering",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nemesis-claw"
      },
      "hash": "fc58474b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a9350d9a-923d-4d07-ba22-0c08d8635717:obliterators",
      "kind": "ability",
      "name": "Obliterators: Warp Rift Firepower",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "obliterators"
      },
      "hash": "b9dfaeec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "INDIRECT FIRE",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "62fc1854-beb9-4a11-a8bb-d14939a8d3bf:possessed",
      "kind": "ability",
      "name": "Possessed: Unholy Bloodshed",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "possessed"
      },
      "hash": "7560dd98",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle, on a Dark Pact",
            "ru": "раз за битву, при Dark Pact"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "35a42e60-ee3e-4e40-a4e5-b3d3aeefe3e3:red-corsairs-raiders",
      "kind": "ability",
      "name": "Red Corsairs Raiders: Trophy Takers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "red-corsairs-raiders"
      },
      "hash": "e876c282",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "after destroying an enemy unit, while not Battle-shocked",
            "ru": "после уничтожения вражеского юнита, пока не Battle-shocked"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5af5e8b0-c662-4e8d-b69e-a57b48d46f49:red-corsairs-reave-captain",
      "kind": "ability",
      "name": "Red Corsairs Reave-Captain: Brutal Raider",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "red-corsairs-reave-captain"
      },
      "hash": "1b4fdaf6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn it ended a Charge move",
            "ru": "до конца хода, в котором завершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "until the end of the turn it ended a Charge move",
            "ru": "до конца хода, в котором завершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "76261740-3578-4653-a8c7-d912c9fa7d47:sorcerer-in-terminator-armour",
      "kind": "ability",
      "name": "Sorcerer in Terminator Armour: Death Hex",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sorcerer-in-terminator-armour"
      },
      "hash": "1bfaa601",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "75f0b9f2-fe46-4f7a-a0ab-2742ef5ac288:vashtorr-the-arkifane",
      "kind": "ability",
      "name": "Vashtorr the Arkifane: Reorder Reality",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vashtorr-the-arkifane"
      },
      "hash": "534d3d42",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d84a3253-a1a3-4e20-988c-60f251f86f38:vashtorr-the-arkifane",
      "kind": "ability",
      "name": "Vashtorr the Arkifane: Unholy Mechanisms",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vashtorr-the-arkifane"
      },
      "hash": "9a98f6d5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3e9f3310-0131-40ae-a411-377a4aa6d0c6:venomcrawler",
      "kind": "ability",
      "name": "Venomcrawler: Soul Eater",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "venomcrawler"
      },
      "hash": "57cf1b8c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for the rest of the battle, once its attacks destroyed a unit in the Fight phase",
            "ru": "до конца битвы, если его атаки уничтожили юнит в фазе боя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4a94c0cf-bfaa-4ed1-8a2d-6225e3536003:warpsmith",
      "kind": "ability",
      "name": "Warpsmith: Master of Mechanisms",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warpsmith"
      },
      "hash": "4fb849da",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "760cb5a0-d9f6-468c-851e-1e2930ab667b:zarkan-s-daemonkin-possessed",
      "kind": "ability",
      "name": "Zarkan's Daemonkin Possessed: Unholy Bloodshed",
      "det": null,
      "ref": null,
      "hash": "df7ce16a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle, on a Dark Pact",
            "ru": "раз за битву, при Dark Pact"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "55eb487b-db92-4465-9c80-2a2604b8982f",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Khorne",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Khorne"
      },
      "hash": "dd8b43ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "note": "every melee row on these datasheets IS the hellforged weapons (strike and sweep), so the +2 S applies to the whole table"
    },
    {
      "sid": "aec87847-8acd-461c-be6b-f47d78672d9c",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Nurgle",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Nurgle"
      },
      "hash": "2aca0f8e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "4d7d8292-64d6-4b3d-8c9e-24d639247b8b",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Slaanesh",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Slaanesh"
      },
      "hash": "4b7e0e58",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "270fa7e3-a995-4372-99cb-1907dc6b2fcc",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Tzeentch",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Tzeentch"
      },
      "hash": "a6cb4ed4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "note": "the infernal cannon is the only ranged row on these datasheets"
    },
    {
      "sid": "94c913b5-2ba2-423b-bc8e-c1e05512044c",
      "kind": "detachmentRule",
      "name": "Empyric Wellspring",
      "det": "Cabal of Chaos",
      "ref": {
        "kind": "detachmentRule",
        "det": "cabal-of-chaos"
      },
      "hash": "7f946683",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in your Shooting phase, if that unit makes a Dark Pact",
            "ru": "в вашей фазе стрельбы, если отряд заключил Dark Pact"
          },
          "cond": [
            "phase-shooting",
            "unit-dark-pact-invoked"
          ]
        },
        {
          "scope": 1,
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, if that unit makes a Dark Pact",
            "ru": "в фазе боя, если отряд заключил Dark Pact"
          },
          "cond": [
            "phase-fight",
            "unit-dark-pact-invoked"
          ]
        },
        {
          "scope": 1,
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in the Fight phase, if that unit makes a Dark Pact",
            "ru": "в фазе боя, если отряд заключил Dark Pact"
          },
          "cond": [
            "phase-fight",
            "unit-dark-pact-invoked"
          ]
        }
      ]
    },
    {
      "sid": "cf85e0a8-77ed-4e68-b5a4-a6b757aad177",
      "kind": "detachmentRule",
      "name": "Desperate Devotion",
      "det": "Chaos Cult",
      "hash": "d2f86844",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Damned units, for the phase, after making a Desperate Pact",
            "ru": "отряды Damned, на фазу, после заключения Desperate Pact"
          },
          "cond": [
            "unit-desperate-pact"
          ],
          "scope": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "chaos-cult"
      }
    },
    {
      "sid": "39d94781-feca-4238-9ef5-be6536baff52",
      "kind": "detachmentRule",
      "name": "Experimental Augmentations",
      "det": "Creations of Bile",
      "hash": "f61816fc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Cholinergic Accelerants augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Cholinergic Accelerants"
          },
          "cond": [
            "augment-cholinergic-accelerants"
          ],
          "scope": 0
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Heretic Astartes Infantry, if the Hyperadrenal Infusion augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Hyperadrenal Infusion"
          },
          "cond": [
            "augment-hyperadrenal-infusion"
          ],
          "scope": 0
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Paraneural Reactions augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Paraneural Reactions"
          },
          "cond": [
            "augment-paraneural-reactions"
          ],
          "scope": 0
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Supracutaneous Chitination augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Supracutaneous Chitination"
          },
          "cond": [
            "augment-supracutaneous-chitination"
          ],
          "scope": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Macrotensile Sinews augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Macrotensile Sinews"
          },
          "cond": [
            "augment-macrotensile-sinews"
          ],
          "scope": 0
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Ophthalmic Enhancement augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Ophthalmic Enhancement"
          },
          "cond": [
            "augment-ophthalmic-enhancement"
          ],
          "scope": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "3eec525c-0bc1-4c11-a6f8-efce97bf6c3d",
      "kind": "detachmentRule",
      "name": "Soul Forge Boons",
      "det": "Cult of the Arkifane",
      "hash": "abd2f746",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "Soul Forge units — Heretic Astartes Vehicles, Lord Discordant and Vashtorr",
            "ru": "отряды Soul Forge — техника Heretic Astartes, Lord Discordant и Vashtorr"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cult-of-the-arkifane"
      }
    },
    {
      "sid": "5fc0cd69-c9d0-4613-a01a-491e55bf56c0",
      "kind": "detachmentRule",
      "name": "Rain of Ruin",
      "det": "Devotees of Destruction",
      "ref": {
        "kind": "detachmentRule",
        "det": "devotees-of-destruction"
      },
      "hash": "c5bd1198",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HEAVY",
          "when": null
        }
      ]
    },
    {
      "sid": "1dacaf8f-9649-4bca-b267-e84aa6301dfb",
      "kind": "detachmentRule",
      "name": "Tyrannical Motivation",
      "det": "Huron’s Marauders",
      "hash": "816d7350",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "hurons-marauders"
      }
    },
    {
      "sid": "2d05fb7e-ff32-49ee-87f8-8276bc8705e2",
      "kind": "detachmentRule",
      "name": "Terror Made Manifest",
      "det": "Nightmare Hunt",
      "hash": "bcd56076",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "nightmare-hunt"
      }
    },
    {
      "sid": "fc17c30d-c505-438f-80b0-32fc2cb45792",
      "kind": "detachmentRule",
      "name": "Raiders and Reavers",
      "det": "Renegade Raiders",
      "hash": "326bb479",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack against a unit within range of an objective marker",
            "ru": "за атаку по отряду в радиусе маркера цели"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "renegade-raiders"
      }
    },
    {
      "sid": "be2d456a-583e-430f-b6aa-6f3da4f250e5",
      "kind": "detachmentRule",
      "name": "Slaves to None",
      "det": "Renegade Warband",
      "ref": {
        "kind": "detachmentRule",
        "det": "renegade-warband"
      },
      "hash": "d0e83155",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "180d0072-f72a-4976-bd90-a6531c9cd609",
      "kind": "detachmentRule",
      "name": "Debt to the Soul Forge",
      "det": "Soulforged Warpack",
      "hash": "61196a22",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Daemon Vehicle units, for the phase, after invoking their contract on a Dark Pact",
            "ru": "отряды Daemon Vehicle, на фазу, после призыва контракта при Dark Pact"
          },
          "cond": [
            "unit-dark-pact-invoked"
          ],
          "scope": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "soulforged-warpack"
      }
    },
    {
      "sid": "05ef298c-13c6-465c-986d-265e4d9a1be1",
      "kind": "detachmentRule",
      "name": "Abject Fear",
      "det": "Zarkan’s Daemonkin",
      "ref": null,
      "hash": "f4d79faa",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d5097c0b-09a5-4a90-821f-58d20bf7f336",
      "kind": "enhancement",
      "name": "Conduit of Chaos",
      "det": "Cabal of Chaos",
      "ref": {
        "kind": "enhancement",
        "det": "cabal-of-chaos"
      },
      "hash": "e227d712",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        }
      ]
    },
    {
      "sid": "91ff4c53-0812-4603-b6ac-8c82eb9a44cb",
      "kind": "enhancement",
      "name": "Touched by the Warp",
      "det": "Cabal of Chaos",
      "ref": {
        "kind": "enhancement",
        "det": "cabal-of-chaos"
      },
      "hash": "0f71b1f4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Psyker",
          "when": null
        },
        {
          "scope": 1,
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": null
        }
      ]
    },
    {
      "sid": "f8585ef9-bd3d-4536-99b2-d02ab20921da",
      "kind": "enhancement",
      "name": "Incendiary Goad",
      "det": "Chaos Cult",
      "hash": "fb8f7297",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Damned models, while the bearer's unit is below its Starting Strength",
            "ru": "модели Damned, пока отряд носителя ниже начальной численности"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Damned models, while that unit is Below Half-strength",
            "ru": "модели Damned, пока отряд ниже половины численности"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "chaos-cult"
      }
    },
    {
      "sid": "b75b9a64-a5bb-4f4d-8f77-1661f71300ab",
      "kind": "enhancement",
      "name": "Living Carapace",
      "det": "Creations of Bile",
      "hash": "b3a94220",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "8d4d1353-1300-47e2-85eb-80baa8e149df",
      "kind": "enhancement",
      "name": "Prime Test Subject",
      "det": "Creations of Bile",
      "hash": "10576f70",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "a75445ba-2c59-4eeb-a687-6239357ea9cb",
      "kind": "enhancement",
      "name": "Surgical Precision",
      "det": "Creations of Bile",
      "ref": {
        "kind": "enhancement",
        "det": "creations-of-bile"
      },
      "hash": "b20b3a0a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "cbe268b4-d3fc-4235-9e0f-9186b25e74d4",
      "kind": "enhancement",
      "name": "Crown of Worms",
      "det": "Cult of the Arkifane",
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-the-arkifane"
      },
      "hash": "d3937f61",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of three ABILITIES, not of a weapon — no row on the card carries it"
    },
    {
      "sid": "f3bde6ed-505b-419d-8db9-5c8d9c4d0bff",
      "kind": "enhancement",
      "name": "Cybinfernal Font",
      "det": "Cult of the Arkifane",
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-the-arkifane"
      },
      "hash": "d4d18f7d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Soul Forge",
          "when": null
        }
      ]
    },
    {
      "sid": "eb2472a2-ce74-4e93-be22-a5e84d02fe04",
      "kind": "enhancement",
      "name": "Cursed Fang",
      "det": "Deceptors",
      "hash": "79e14e04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "deceptors"
      }
    },
    {
      "sid": "f7646e99-5ac1-483b-92e1-0ff76c88546d",
      "kind": "enhancement",
      "name": "Soul Link",
      "det": "Deceptors",
      "ref": {
        "kind": "enhancement",
        "det": "deceptors"
      },
      "hash": "3241761a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Psyker",
          "when": {
            "en": "while a Character is selected for it in your Command phase",
            "ru": "пока в вашей фазе командования для него выбран персонаж"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b76d0a7a-fc2f-4f5e-a569-ead3c9e8af46",
      "kind": "enhancement",
      "name": "Iron Artifice",
      "det": "Fellhammer Siege-host",
      "ref": {
        "kind": "enhancement",
        "det": "fellhammer-siege-host"
      },
      "hash": "1fb315ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-FORTIFICATION 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "21b97ac4-0081-470d-910f-2e7c4d54b4a7",
      "kind": "enhancement",
      "name": "Ironbound Enmity",
      "det": "Fellhammer Siege-host",
      "hash": "067736ce",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "fellhammer-siege-host"
      }
    },
    {
      "sid": "fb3a3dfd-c4f0-4908-b0b4-ddc1da594d6a",
      "kind": "enhancement",
      "name": "Pact of Cursed Pinions",
      "det": "Murdertalon Raiders",
      "ref": {
        "kind": "enhancement",
        "det": "murdertalon-raiders"
      },
      "hash": "7e694e61",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "DAEMON",
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "fcd7d534-d0e1-4aad-9872-32329d49349d",
      "kind": "enhancement",
      "name": "Talisman of Burning Blood",
      "det": "Pactbound Zealots",
      "hash": "b64d0ef0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": "D3",
          "when": {
            "en": "roll a D3 and add that to Attacks and Strength instead, after the unit makes a Dark Pact without failing the Leadership test",
            "ru": "бросьте D3 и добавьте результат к атакам и силе вместо +1, после Dark Pact без провала теста лидерства"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "pactbound-zealots"
      }
    },
    {
      "sid": "e6de1854-8e17-4bec-aa86-2a3c67c1fb36",
      "kind": "enhancement",
      "name": "Empyric Symbiote",
      "det": "Renegade Warband",
      "hash": "aaf5301a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "renegade-warband"
      }
    },
    {
      "sid": "b633020e-f18a-4a29-b2a7-2de5fcb08c2c",
      "kind": "enhancement",
      "name": "Eyes of the Hunter",
      "det": "Renegade Warband",
      "ref": {
        "kind": "enhancement",
        "det": "renegade-warband"
      },
      "hash": "2eaa360d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "163a57f4-8b75-4ef4-b9db-bc8272981dd2",
      "kind": "enhancement",
      "name": "Invigorated Mechatendrils",
      "det": "Soulforged Warpack",
      "ref": {
        "kind": "enhancement",
        "det": "soulforged-warpack"
      },
      "hash": "e676a300",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 4,
          "when": null
        }
      ]
    },
    {
      "sid": "93079aa9-a7c7-4192-85b8-5e2375c6f36f",
      "kind": "enhancement",
      "name": "Tempting Addendum",
      "det": "Soulforged Warpack",
      "hash": "d4be7be1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "soulforged-warpack"
      }
    },
    {
      "sid": "be6c68b6-1a7c-43f4-a442-0f16d5c2567b",
      "kind": "enhancement",
      "name": "Eager for Vengeance",
      "det": "Veterans of the Long War",
      "hash": "6bb482b1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "veterans-of-the-long-war"
      }
    },
    {
      "sid": "992754f1-6976-4e97-88ac-c42b83f54d8e",
      "kind": "enhancement",
      "name": "Tzagulla",
      "det": "Warpstrike Champions",
      "hash": "01b61388",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn the bearer's unit arrives from Reserves",
            "ru": "до конца хода, в котором отряд носителя прибыл из резерва"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warpstrike-champions"
      }
    },
    {
      "sid": "62d03b18-0075-4b52-8b53-fadbc253fadb",
      "kind": "enhancement",
      "name": "Infernal Infusion",
      "det": "Zarkan’s Daemonkin",
      "ref": null,
      "hash": "6b4f2235",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    }
  ]
}
