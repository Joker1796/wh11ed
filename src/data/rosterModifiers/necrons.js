// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "necrons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "076d361c-d1bb-4e8e-8eb4-251434f9d888:amonhotekh-s-guard-skorpekh-destroyers",
      "kind": "ability",
      "name": "Amonhotekh's Guard Skorpekh Destroyers: Plasmacyte (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "1fb7609a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "40311c84-87f3-4a29-b4b1-2d94c780193b:ctan-shard-of-the-deceiver",
      "kind": "ability",
      "name": "C’tan Shard of the Deceiver: Necrodermis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ctan-shard-of-the-deceiver"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "40311c84-87f3-4a29-b4b1-2d94c780193b:ctan-shard-of-the-nightbringer",
      "kind": "ability",
      "name": "C’tan Shard of the Nightbringer: Necrodermis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ctan-shard-of-the-nightbringer"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "40311c84-87f3-4a29-b4b1-2d94c780193b:ctan-shard-of-the-void-dragon",
      "kind": "ability",
      "name": "C’tan Shard of the Void Dragon: Necrodermis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ctan-shard-of-the-void-dragon"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ce417ae7-d402-4fe0-8666-aabd4aa80e64:canoptek-scarab-swarms",
      "kind": "ability",
      "name": "Canoptek Scarab Swarms: Chittering Swarm",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "canoptek-scarab-swarms"
      },
      "hash": "61cec700",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e06de742-1a30-4957-9c7a-7afde6d40508:catacomb-command-barge",
      "kind": "ability",
      "name": "Catacomb Command Barge: Carrier Wave",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "catacomb-command-barge",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "989d5d7f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "790fff5e-e0e1-41a1-9677-b26052d6b7c5:chronomancer",
      "kind": "ability",
      "name": "Chronomancer: Timesplinter Mantle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chronomancer"
      },
      "hash": "0e6a810e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
    },
    {
      "sid": "c31c6751-321c-4491-a903-cf7160117d54:convergence-of-dominion",
      "kind": "ability",
      "name": "Convergence of Dominion: Reanimation Nodes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "convergence-of-dominion",
        "scopes": [
          {
            "targets": [
              "NECRONS INFANTRY"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "61c675d8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "6ddcfb42-49e2-43ad-9517-3d69a35da32a:cryptothralls",
      "kind": "ability",
      "name": "Cryptothralls: Bound Creation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cryptothralls"
      },
      "hash": "02088f8a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79bafa09-ec84-4f99-8a58-3c6810810fcb:doomsday-ark",
      "kind": "ability",
      "name": "Doomsday Ark: Overwhelming Obliteration",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "doomsday-ark"
      },
      "hash": "e0183dc7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Doomsday cannon"
          },
          "when": {
            "en": "for the turn, if this model Remained Stationary",
            "ru": "на ход, если модель осталась на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "7d7ee4d3-72bd-404e-bb89-281b7cca87cd:geomancer",
      "kind": "ability",
      "name": "Geomancer: Tectonic Reverberations",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "geomancer"
      },
      "hash": "0b120c11",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0a968330-aa2f-48db-927f-812e04f0f885:illuminor-szeras",
      "kind": "ability",
      "name": "Illuminor Szeras: Atomic Energy Manipulator",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "illuminor-szeras"
      },
      "hash": "46c7fb8e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "28266681-b62f-4d2a-a302-110de4ec2a57:illuminor-szeras",
      "kind": "ability",
      "name": "Illuminor Szeras: Illuminor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "illuminor-szeras"
      },
      "hash": "93fccbf0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "af817f85-0876-4ef6-9171-059e66d6f7d4:illuminor-szeras",
      "kind": "ability",
      "name": "Illuminor Szeras: Mechanical Augmentation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "illuminor-szeras",
        "scopes": [
          {
            "targets": [
              "NECRONS BATTLELINE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "4def783f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "12dac8d8-3c5e-46bf-a06f-f216708577f7:nekrosor-ammentar",
      "kind": "ability",
      "name": "Nekrosor Ammentar: Infectious Murder-Madness",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nekrosor-ammentar",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": [
              "MONSTER",
              "TITANIC"
            ]
          }
        ]
      },
      "hash": "240b73c5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5d1bb72b-de3f-4243-b853-98182615ad67:nekrosor-ammentar",
      "kind": "ability",
      "name": "Nekrosor Ammentar: Protective Disciples",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nekrosor-ammentar"
      },
      "hash": "f493341c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6a0f149c-0d22-4446-a2ca-8ae8bb8c2331:obelisk",
      "kind": "ability",
      "name": "Obelisk: Gravitic Pulse",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "obelisk"
      },
      "hash": "a971f8e8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f53452e1-fe6d-4ffd-9765-52432f6a5f5e:orikan-the-diviner",
      "kind": "ability",
      "name": "Orikan the Diviner: Master Chronomancer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "orikan-the-diviner"
      },
      "hash": "58585162",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "d8a7419e-b1a4-4050-a552-a7a64ee63ef0:orikan-the-diviner",
      "kind": "ability",
      "name": "Orikan the Diviner: The Stars Are Right",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "orikan-the-diviner"
      },
      "hash": "f8eafa3d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b8e6affb-5576-4b41-bc38-9697321ab6cf:overlord-with-translocation-shroud",
      "kind": "ability",
      "name": "Overlord with Translocation Shroud: Translocation Shroud",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "overlord-with-translocation-shroud"
      },
      "hash": "91c2463a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase its unit Advanced (no Advance roll is made)",
            "ru": "в фазе, когда отряд совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced (no Advance roll is made)",
            "ru": "в фазе, когда отряд совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "29df3a8e-64c7-4084-b2ad-bc7da0df3edd:overlord",
      "kind": "ability",
      "name": "Overlord: Implacable Resilience",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "overlord"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "116d7153-6df1-4396-9ecd-d49de3e4bfa6:skorpekh-lord",
      "kind": "ability",
      "name": "Skorpekh Lord: United In Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skorpekh-lord"
      },
      "hash": "d2a9d0ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "4732a1ed-ebd9-4064-b991-a984d9d345a1:technomancer",
      "kind": "ability",
      "name": "Technomancer: Rites of Reanimation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "technomancer"
      },
      "hash": "ccc78431",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "1cee9f3a-90af-4c23-9c39-2ccf1011c722:the-silent-king",
      "kind": "ability",
      "name": "The Silent King: Phaeron of the Blades (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-silent-king",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": [
              "MONSTER"
            ]
          }
        ],
        "set": "Triarch Abilities",
        "pickLimit": 1
      },
      "hash": "39225b1a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        }
      ]
    },
    {
      "sid": "8c31ec08-cfe2-4d58-ad1d-3138807c9d28:the-silent-king",
      "kind": "ability",
      "name": "The Silent King: Phaeron of the Stars (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-silent-king",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": [
              "MONSTER"
            ]
          }
        ],
        "set": "Triarch Abilities",
        "pickLimit": 1
      },
      "hash": "594b1a50",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4fac3e0b-fe87-430a-a259-4a7b70854de8:the-silent-king",
      "kind": "ability",
      "name": "The Silent King: Relentless March (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-silent-king",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": [
              "MONSTER"
            ]
          }
        ],
        "set": "Triarch Abilities",
        "pickLimit": 1
      },
      "hash": "a7467e93",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        }
      ]
    },
    {
      "sid": "1f7a8e5e-21cb-44e2-933a-fb3b131d6fe0:the-silent-king",
      "kind": "ability",
      "name": "The Silent King: The Silent King",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-silent-king",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "dabf0c2d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "40311c84-87f3-4a29-b4b1-2d94c780193b:transcendent-ctan",
      "kind": "ability",
      "name": "Transcendent C’tan: Necrodermis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "transcendent-ctan"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "71124c51-fb03-44ee-acf1-4e5f6b6d5c13",
      "kind": "detachmentRule",
      "name": "Territorial Imperatives",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "02b31bb5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while selected at the end of your Command phase, until the start of your next",
            "ru": "пока отряд выбран в конце вашей командной фазы, до начала следующей"
          },
          "cond": [
            "unit-selected-command-phase"
          ]
        }
      ]
    },
    {
      "sid": "c8e67c94-634c-45a1-b354-fe1d1d0edf8a",
      "kind": "detachmentRule",
      "name": "Annihilation Protocol",
      "det": "Annihilation Legion",
      "hash": "99ac616f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Destroyer Cult units only, per ranged attack against the closest eligible target",
            "ru": "только отряды Destroyer Cult, за стрелковую атаку по ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "0819b28a-215e-4a8f-b78e-c857db54aa64",
      "kind": "detachmentRule",
      "name": "Command Protocols",
      "det": "Awakened Dynasty",
      "hash": "da8aa7b0",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "2f40d32d-d52c-4fea-881e-9f3afd245708",
      "kind": "detachmentRule",
      "name": "Technosorcerous Augmentations",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "detachmentRule",
        "det": "cryptek-conclave"
      },
      "hash": "3c086d0c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        },
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 3+",
          "when": {
            "en": "in your Shooting phase, if that ability is the one selected for the unit",
            "ru": "в вашей фазе стрельбы, если для отряда выбрана именно эта способность"
          },
          "cond": [
            "phase-shooting"
          ]
        }
      ]
    },
    {
      "sid": "da5c3d84-9fb3-4ea1-8e3c-c8d34d6100a7",
      "kind": "detachmentRule",
      "name": "Cold Fervour",
      "det": "Cursed Legion",
      "hash": "f2aad384",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "scope": 1,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "after a Destroyer Cult unit destroys a unit, until the end of the turn",
            "ru": "после того как юнит Destroyer Cult уничтожит юнит, до конца хода"
          },
          "cond": [
            "cold-fervour"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "534bef73-8f42-4c3b-ae80-2ad4106db41a",
      "kind": "detachmentRule",
      "name": "Hypermotility Protocols",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "detachmentRule",
        "det": "hand-of-the-dynasty"
      },
      "hash": "965e4fb5",
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
      "sid": "90b80a56-d420-47f0-85b1-405a01e4c0d3",
      "kind": "detachmentRule",
      "name": "Worthy Foes",
      "det": "Obeisance Phalanx",
      "hash": "f43f3287",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "obeisance-phalanx"
      }
    },
    {
      "sid": "49d49ff2-3cb7-488d-bab6-5f046700f91f",
      "kind": "detachmentRule",
      "name": "Cosmic Distortion",
      "det": "Pantheon of Woe",
      "hash": "2e60a45d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "pantheon-of-woe"
      }
    },
    {
      "sid": "4ef33601-c63c-4fb7-866f-ce94f062e01b",
      "kind": "detachmentRule",
      "name": "Transdimensional Deployment",
      "det": "Skyshroud Spearhead",
      "ref": {
        "kind": "detachmentRule",
        "det": "skyshroud-spearhead"
      },
      "hash": "9c2e7911",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ]
    },
    {
      "sid": "dec1adcf-64dc-4e7a-b535-73fc56cb305c",
      "kind": "detachmentRule",
      "name": "Relentless Onslaught",
      "det": "Starshatter Arsenal",
      "hash": "66a38795",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "starshatter-arsenal"
      }
    },
    {
      "sid": "23b709b7-1228-490b-98fe-7f039d5cd593",
      "kind": "detachmentRule",
      "name": "Empowered Engines",
      "det": "The Phaeron's Armoury",
      "ref": {
        "kind": "detachmentRule",
        "det": "the-phaerons-armoury"
      },
      "hash": "92336869",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": null
        }
      ]
    },
    {
      "sid": "78e7ca8e-1321-4a1c-9b04-2383ca1a2572",
      "kind": "enhancement",
      "name": "Metalline Might",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "69c38e3b",
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
      ]
    },
    {
      "sid": "90ecb256-bc18-494a-89a9-57bba7ac455b",
      "kind": "enhancement",
      "name": "Unblemished Legions",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "8ee2fd82",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null
        },
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
      "sid": "f8e6d080-6a6c-432b-8196-e26598cd7fda",
      "kind": "enhancement",
      "name": "Ingrained Superiority",
      "det": "Annihilation Legion",
      "hash": "ca631e3a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack that scores a Critical Wound",
            "ru": "за атаку с критическим ранением"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "9eaf87ca-f192-4962-abfe-71524fc8f81f",
      "kind": "enhancement",
      "name": "Enaegic Dermal Bond",
      "det": "Awakened Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      },
      "hash": "3a8d1248",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "682ea8a8-adb8-4f7f-96e4-8d991d22b7fa",
      "kind": "enhancement",
      "name": "Nether-realm Casket",
      "det": "Awakened Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      },
      "hash": "250c323a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a6e993f2-c457-4c04-b5f9-c1a7deda2c37",
      "kind": "enhancement",
      "name": "Phasal Subjugator (Aura)",
      "det": "Awakened Dynasty",
      "hash": "b51daed7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "eff15605-8995-4196-a6fb-220bf5a2fe87",
      "kind": "enhancement",
      "name": "Veil of Darkness",
      "det": "Awakened Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      },
      "hash": "f531ccd6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b6b83c22-ccc1-4e7b-8abe-ab09ddd291c9",
      "kind": "enhancement",
      "name": "Dimensional Sanctum",
      "det": "Canoptek Court",
      "ref": {
        "kind": "enhancement",
        "det": "canoptek-court"
      },
      "hash": "735cabe5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": null
        }
      ]
    },
    {
      "sid": "6e0e59cb-c41f-4cb0-a009-c962aad3d392",
      "kind": "enhancement",
      "name": "Gauntlet of Compression",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "cryptek-conclave"
      },
      "hash": "dd08044f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": null
        }
      ]
    },
    {
      "sid": "1a9b09ed-4256-40d8-962f-aacc25948e46",
      "kind": "enhancement",
      "name": "Gravitic Bolas",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "cryptek-conclave"
      },
      "hash": "fc588c57",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a17450e0-31f1-4b21-8952-5ea5c5bf7496",
      "kind": "enhancement",
      "name": "Destroyer Ankh",
      "det": "Cursed Legion",
      "hash": "c15dd6d4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Destroyer Cult",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "767a6e78-8eda-4299-ad7f-e0614152a40d",
      "kind": "enhancement",
      "name": "Mark of the Nekrosor",
      "det": "Cursed Legion",
      "hash": "d0cc07b6",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "597b7938-15dd-4b21-adf6-c4c544287010",
      "kind": "enhancement",
      "name": "Murdermind",
      "det": "Cursed Legion",
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      },
      "hash": "8eb42dfe",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Destroyer Cult",
          "when": null
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": null
        }
      ]
    },
    {
      "sid": "08785e77-dca3-4170-ac4b-67317a780156",
      "kind": "enhancement",
      "name": "Enlivened Sentinels (Upgrade)",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "hand-of-the-dynasty"
      },
      "hash": "c019b083",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 5\"",
          "when": null
        }
      ]
    },
    {
      "sid": "28910499-26bf-4cf0-823a-17462276ea57",
      "kind": "enhancement",
      "name": "Tools of Dominion (Upgrade)",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "hand-of-the-dynasty"
      },
      "hash": "b1cd18ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": null
        }
      ]
    },
    {
      "sid": "dedd4e7b-9ddc-4edd-8a45-512061651b17",
      "kind": "enhancement",
      "name": "Hyperspatial Transfer Node",
      "det": "Hypercrypt Legion",
      "ref": {
        "kind": "enhancement",
        "det": "hypercrypt-legion"
      },
      "hash": "ec5e298e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time the bearer's unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит носителя совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c1641e5f-db23-49aa-905f-12b1833efcf1",
      "kind": "enhancement",
      "name": "Osteoclave Fulcrum",
      "det": "Hypercrypt Legion",
      "ref": {
        "kind": "enhancement",
        "det": "hypercrypt-legion"
      },
      "hash": "cdcb4519",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ]
    },
    {
      "sid": "fe31d690-e8f6-4014-a53e-7b3db86f5a6e",
      "kind": "enhancement",
      "name": "Unflinching Will",
      "det": "Obeisance Phalanx",
      "ref": {
        "kind": "enhancement",
        "det": "obeisance-phalanx"
      },
      "hash": "5b96496f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "c173a0bd-085d-42db-ac95-5c7ab17a267f",
      "kind": "enhancement",
      "name": "Deepening Madness (Upgrade)",
      "det": "Skyshroud Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "skyshroud-spearhead"
      },
      "hash": "a4b54ef1",
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
      "sid": "27ae0787-64b1-4e1e-840d-027f27eb996f",
      "kind": "enhancement",
      "name": "Chrono-impedance Fields",
      "det": "Starshatter Arsenal",
      "ref": {
        "kind": "enhancement",
        "det": "starshatter-arsenal"
      },
      "hash": "74d2c9d5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dec27f61-8026-4986-872b-5ad9c8b34084",
      "kind": "enhancement",
      "name": "Miniaturised Nebuloscope",
      "det": "Starshatter Arsenal",
      "ref": {
        "kind": "enhancement",
        "det": "starshatter-arsenal"
      },
      "hash": "93fc2b38",
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
      "sid": "e911cb72-8416-456b-b29b-9d7e78845c3f",
      "kind": "stratagem",
      "name": "The Spoor of Frailty",
      "det": "Annihilation Legion",
      "ref": {
        "kind": "stratagem",
        "det": "annihilation-legion",
        "name": "The Spoor of Frailty"
      },
      "hash": "2fc82dc8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "189e9a56-08ba-4f1d-91fe-86a29a58fc97",
      "kind": "stratagem",
      "name": "Protocol of the Hungry Void",
      "det": "Awakened Dynasty",
      "ref": {
        "kind": "stratagem",
        "det": "awakened-dynasty",
        "name": "Protocol of the Hungry Void"
      },
      "hash": "e16165bb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while a NECRONS CHARACTER is leading the unit",
            "ru": "и ещё, пока отрядом руководит NECRONS CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "715892f9-4eab-4736-b3aa-cf87a1da9612",
      "kind": "stratagem",
      "name": "Protocol of the Sudden Storm",
      "det": "Awakened Dynasty",
      "ref": {
        "kind": "stratagem",
        "det": "awakened-dynasty",
        "name": "Protocol of the Sudden Storm"
      },
      "hash": "3747e0bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "c0a9369e-f600-4bff-afe3-953de7887c21",
      "kind": "stratagem",
      "name": "Curse of the Cryptek",
      "det": "Canoptek Court",
      "ref": {
        "kind": "stratagem",
        "det": "canoptek-court",
        "name": "Curse of the Cryptek"
      },
      "hash": "6b386492",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d50a8525-0cda-4481-b35a-0166906008ce",
      "kind": "stratagem",
      "name": "Cynosure of Eradication",
      "det": "Canoptek Court",
      "ref": {
        "kind": "stratagem",
        "det": "canoptek-court",
        "name": "Cynosure of Eradication"
      },
      "hash": "fe0b57a5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "CRYPTEK and CANOPTEK models only",
            "ru": "только модели CRYPTEK и CANOPTEK"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9c1084ea-a988-41ae-9e7e-93fff8618e30",
      "kind": "stratagem",
      "name": "Solar Pulse",
      "det": "Canoptek Court",
      "ref": {
        "kind": "stratagem",
        "det": "canoptek-court",
        "name": "Solar Pulse"
      },
      "hash": "8605bfcf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "faa6ca0c-12bb-4e2b-8d3d-519132a0cd1f",
      "kind": "stratagem",
      "name": "Microscarab Swarm",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "cryptek-conclave",
        "name": "Microscarab Swarm"
      },
      "hash": "7552fba5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "for a NECRON WARRIORS unit",
            "ru": "для отряда NECRON WARRIORS"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "for an IMMORTALS unit, instead",
            "ru": "для отряда IMMORTALS, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "6bf52360-b8b5-446e-9492-171c06106583",
      "kind": "stratagem",
      "name": "Molecular Targeting",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "cryptek-conclave",
        "name": "Molecular Targeting"
      },
      "hash": "e970969b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cd990928-7ba9-4233-8360-25dc7fdab369",
      "kind": "stratagem",
      "name": "Synergistic Empowerment",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "cryptek-conclave",
        "name": "Synergistic Empowerment"
      },
      "hash": "8fcebd15",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "12fb9bc1-173f-4e4c-8c6b-7e9c03a33b0c",
      "kind": "stratagem",
      "name": "Methodical Murder",
      "det": "Cursed Legion",
      "ref": {
        "kind": "stratagem",
        "det": "cursed-legion",
        "name": "Methodical Murder"
      },
      "hash": "fd0d603c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d51f2004-facc-4f30-95bd-efeac95a5493",
      "kind": "stratagem",
      "name": "Spreading Madness",
      "det": "Cursed Legion",
      "ref": {
        "kind": "stratagem",
        "det": "cursed-legion",
        "name": "Spreading Madness"
      },
      "hash": "651aec76",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "04c6e3ba-873f-4909-be7e-2c2e3fdc8bdc",
      "kind": "stratagem",
      "name": "Dominance Protocols",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "stratagem",
        "det": "hand-of-the-dynasty",
        "name": "Dominance Protocols"
      },
      "hash": "076afe4b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "4c4d4778-c7da-4a19-b7e8-d14c1c4ef657",
      "kind": "stratagem",
      "name": "Entropic Damping",
      "det": "Hypercrypt Legion",
      "ref": {
        "kind": "stratagem",
        "det": "hypercrypt-legion",
        "name": "Entropic Damping"
      },
      "hash": "4fd50ae6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "34e9b24d-0cfa-4679-8fd5-a2ee1485e03b",
      "kind": "stratagem",
      "name": "Quantum Deflection",
      "det": "Hypercrypt Legion",
      "ref": {
        "kind": "stratagem",
        "det": "hypercrypt-legion",
        "name": "Quantum Deflection"
      },
      "hash": "987d6ae0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "5ed9cb6e-a512-495d-af01-3e55d9966ca4",
      "kind": "stratagem",
      "name": "Nanoassembly Protocols",
      "det": "Obeisance Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "obeisance-phalanx",
        "name": "Nanoassembly Protocols"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4df51b07-bd1d-4510-9088-4734099be4cb",
      "kind": "stratagem",
      "name": "Suffer No Rival",
      "det": "Obeisance Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "obeisance-phalanx",
        "name": "Suffer No Rival"
      },
      "hash": "10391964",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a1f9d428-e9d5-484e-9791-7d0dcca30a6d",
      "kind": "stratagem",
      "name": "Territorial Obsession",
      "det": "Obeisance Phalanx",
      "ref": {
        "kind": "stratagem",
        "det": "obeisance-phalanx",
        "name": "Territorial Obsession"
      },
      "hash": "24319947",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "for a VEHICLE, instead",
            "ru": "для VEHICLE, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "dur": "round"
    },
    {
      "sid": "1b7e64e2-00bb-48a9-a88e-6c35d4aa0961",
      "kind": "stratagem",
      "name": "Chronoshift",
      "det": "Starshatter Arsenal",
      "ref": {
        "kind": "stratagem",
        "det": "starshatter-arsenal",
        "name": "Chronoshift"
      },
      "hash": "50325371",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll)",
            "ru": "в фазе с Advance (без броска)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "fbcf624c-34ed-4f2c-b43a-4eb2ea002cb9",
      "kind": "stratagem",
      "name": "Merciless Reclamation",
      "det": "Starshatter Arsenal",
      "ref": {
        "kind": "stratagem",
        "det": "starshatter-arsenal",
        "name": "Merciless Reclamation"
      },
      "hash": "42c640c7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "699ac868-919e-490d-8e00-c86730312e2f",
      "kind": "stratagem",
      "name": "Cosmic Storm",
      "det": "The Phaeron's Armoury",
      "ref": {
        "kind": "stratagem",
        "det": "the-phaerons-armoury",
        "name": "Cosmic Storm"
      },
      "hash": "cc0ec271",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "name": "Tesla sphere"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f8700f44-a5d3-43d0-b34f-c2b09a6b504b:canoptek-macrocytes",
      "kind": "wargear",
      "name": "Canoptek Macrocytes: Accelerator Mandible",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "canoptek-macrocytes",
        "item": "accelerator mandible",
        "scopes": [
          {
            "targets": [
              "CANOPTEK"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f506766c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "ea2d4f7d-612f-41a0-980f-c538a5dc020d:canoptek-spyders",
      "kind": "wargear",
      "name": "Canoptek Spyders: Fabricator Claw Array (Aura)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "canoptek-spyders",
        "item": "fabricator claw array (aura)",
        "scopes": [
          {
            "targets": [
              "NECRONS VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "d52964cd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "5084d88f-827f-4b35-90c6-86d8f84d6863:canoptek-spyders",
      "kind": "wargear",
      "name": "Canoptek Spyders: Gloom Prism (Aura)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "canoptek-spyders",
        "item": "gloom prism (aura)",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "6d14604f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "c0da2d15-20c2-4da9-a9df-a0ce62051918:lokhust-lord",
      "kind": "wargear",
      "name": "Lokhust Lord: Nanoscarab Amulet",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "lokhust-lord",
        "item": "nanoscarab amulet"
      },
      "hash": "b92eaf5f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "73c896ab-3e82-4c6c-8cd3-2490c776c67b:lychguard",
      "kind": "wargear",
      "name": "Lychguard: Dispersion Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "lychguard",
        "item": "dispersion shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "d0064c2e-8a21-4d58-bf03-02e6370585bb:nekrosor-ammentar",
      "kind": "wargear",
      "name": "Nekrosor Ammentar: Nullstone Field Generator (Aura)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "nekrosor-ammentar",
        "item": "nullstone field generator (aura)",
        "scopes": [
          {
            "targets": [
              "NECRONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "6d14604f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "f6a5f8a4-40f5-498d-a806-d6d77283329d:ophydian-destroyers",
      "kind": "wargear",
      "name": "Ophydian Destroyers: Plasmacyte",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ophydian-destroyers",
        "item": "plasmacyte"
      },
      "hash": "c30781e0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle per Plasmacyte, while this ability is used",
            "ru": "раз за битву на каждый Plasmacyte, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f6a5f8a4-40f5-498d-a806-d6d77283329d:skorpekh-destroyers",
      "kind": "wargear",
      "name": "Skorpekh Destroyers: Plasmacyte",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "skorpekh-destroyers",
        "item": "plasmacyte"
      },
      "hash": "c30781e0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle per Plasmacyte, while this ability is used",
            "ru": "раз за битву на каждый Plasmacyte, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "04af9b1c-d69e-4d55-a73f-1594f009207f:tomb-blades",
      "kind": "wargear",
      "name": "Tomb Blades: Nebuloscope",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tomb-blades",
        "item": "nebuloscope"
      },
      "hash": "a8073fac",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "the bearer's weapons only",
            "ru": "только оружие носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "0d59e1f0-4cca-4797-9810-89f34da9ac5a:tomb-blades",
      "kind": "wargear",
      "name": "Tomb Blades: Shadowloom",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tomb-blades",
        "item": "shadowloom"
      },
      "hash": "1764e07f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
    },
    {
      "sid": "106ffa9b-ad87-4845-a297-a73bceed0b02:tomb-blades",
      "kind": "wargear",
      "name": "Tomb Blades: Shieldvanes",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tomb-blades",
        "item": "shieldvanes"
      },
      "hash": "7ad3d726",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "8\"",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    }
  ]
}
