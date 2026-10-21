// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "drukhari",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "pack:court-of-the-archon:court-of-the-archon",
      "kind": "ability",
      "name": "Court of the Archon: Court of the Archon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "court-of-the-archon"
      },
      "hash": "8a45c235",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": null,
          "target": "leader"
        }
      ]
    },
    {
      "sid": "pack:court-of-the-archon:deadly-retinue-pain",
      "kind": "ability",
      "name": "Court of the Archon: Deadly Retinue (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "court-of-the-archon"
      },
      "hash": "fd37eff9",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while Empowered, with a Lhamaean in the unit",
            "ru": "пока отряд Empowered и в нём есть Lhamaean"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while Empowered, with a Medusae in the unit",
            "ru": "пока отряд Empowered и в нём есть Medusae"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": {
            "en": "while Empowered, with an Ur-ghul in the unit",
            "ru": "пока отряд Empowered и в нём есть Ur-ghul"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "melee",
          "when": {
            "en": "while Empowered, with a Sslyth in the unit",
            "ru": "пока отряд Empowered и в нём есть Sslyth"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "214982bf-5eac-4189-ac0a-1c0945f404c2:coven-of-agonies-cronos",
      "kind": "ability",
      "name": "Coven of Agonies Cronos: Empowered Engines (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "coven-of-agonies-cronos"
      },
      "hash": "5667e483",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while Empowered with a Pain token",
            "ru": "пока Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "1937d754-6aa5-49a9-b68f-2bf2ce8ae7d9:coven-of-agonies-wracks",
      "kind": "ability",
      "name": "Coven of Agonies Wracks: Experimental Enhancements (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "coven-of-agonies-wracks"
      },
      "hash": "49a22d57",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "3",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "4",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3aef584a-85c5-47da-8e79-86a65f0065fd:coven-of-agonies-wracks",
      "kind": "ability",
      "name": "Coven of Agonies Wracks: Experimental Enhancements (Pain)",
      "det": null,
      "ref": null,
      "hash": "49a22d57",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "3",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "4",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "when empowered with a Pain token, excluding CHARACTER models' attacks — 3 A, or 4 A with [HAZARDOUS]",
            "ru": "при усилении жетоном Pain, кроме атак моделей CHARACTER — 3 A или 4 A с [HAZARDOUS]"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "cb751d0c-daad-47e4-b514-267eccb6f68e:drazhar",
      "kind": "ability",
      "name": "Drazhar: Master of Blades",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "drazhar"
      },
      "hash": "4e523734",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the unit is Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "pack:grotesques:macro-steroids-pain",
      "kind": "ability",
      "name": "Grotesques: Macro-steroids (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grotesques"
      },
      "hash": "e38d4805",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "set",
          "value": "8",
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "6ebe6990-ffa4-4fa2-a063-0fff0fd61e60:haemonculus",
      "kind": "ability",
      "name": "Haemonculus: Fear Incarnate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "haemonculus"
      },
      "hash": "c85d06cd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "96b72b45-8ef5-40de-9985-2eed4a744631:hand-of-the-archon",
      "kind": "ability",
      "name": "Hand of the Archon: Archon’s Will",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hand-of-the-archon"
      },
      "hash": "a3097079",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "within range of the objective chosen at the start of the battle, unless Battle-shocked",
            "ru": "в зоне выбранного в начале битвы objective, если не Battle-shocked"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "3",
          "when": {
            "en": "within range of the objective chosen at the start of the battle, unless Battle-shocked",
            "ru": "в зоне выбранного в начале битвы objective, если не Battle-shocked"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1f5e1659-5d95-48d9-8eff-25fc9e5f663f:hand-of-the-archon",
      "kind": "ability",
      "name": "Hand of the Archon: Assassins’ Poisons",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hand-of-the-archon"
      },
      "hash": "fda945a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ],
          "only": {
            "notName": [
              "blast pistol",
              "blaster",
              "dark lance"
            ]
          }
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ],
          "only": {
            "notName": [
              "blast pistol",
              "blaster",
              "dark lance"
            ]
          }
        }
      ]
    },
    {
      "sid": "3b2d13d0-27bc-49b1-8b7c-9be34589ed82:hellions",
      "kind": "ability",
      "name": "Hellions: Battlefield Butchery",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hellions"
      },
      "hash": "da5751c2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Empowered with a Pain token",
            "ru": "пока Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Empowered with a Pain token",
            "ru": "пока Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "026ef43a-b285-45d9-a071-f7a939bddfa0:incubi",
      "kind": "ability",
      "name": "Incubi: Decapitating Strikes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "incubi"
      },
      "hash": "6ad5e7df",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "814fcea3-09ca-46f1-be0b-9ffc56cf2074:incubi",
      "kind": "ability",
      "name": "Incubi: Tormentors",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "incubi"
      },
      "hash": "4e631f35",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a Battle-shocked unit",
            "ru": "по Battle-shocked отряду"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "79f38f0b-a72b-4c58-846c-cbc390ffedb2:lady-malys",
      "kind": "ability",
      "name": "Lady Malys: Archon of the Poisoned Tongue",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lady-malys"
      },
      "hash": "0714182d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while Empowered, if this ability was the one selected",
            "ru": "пока Empowered, если выбрана эта способность"
          },
          "cond": [
            "unit-empowered",
            "malys-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while Empowered, if this ability was the one selected",
            "ru": "пока Empowered, если выбрана эта способность"
          },
          "cond": [
            "unit-empowered",
            "malys-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while Empowered, if this ability was the one selected",
            "ru": "пока Empowered, если выбрана эта способность"
          },
          "cond": [
            "unit-empowered",
            "malys-sustained"
          ],
          "target": "led"
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while Empowered, if this ability was the one selected",
            "ru": "пока Empowered, если выбрана эта способность"
          },
          "cond": [
            "unit-empowered",
            "malys-lethal"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "3efecd52-2d60-42d1-928d-6c868233d11d:lelith-hesperax",
      "kind": "ability",
      "name": "Lelith Hesperax: Blur of Blades",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lelith-hesperax"
      },
      "hash": "f54f8f52",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "target": "unit",
          "when": null
        }
      ]
    },
    {
      "sid": "0b6bcdaf-7f79-4095-b229-eaec93e19b04:lelith-hesperax",
      "kind": "ability",
      "name": "Lelith Hesperax: Brides of Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lelith-hesperax"
      },
      "hash": "c4353cb2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while its unit is Empowered with a Pain token",
            "ru": "пока отряд Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while its unit is Empowered with a Pain token",
            "ru": "пока отряд Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while its unit is Empowered with a Pain token",
            "ru": "пока отряд Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while its unit is Empowered with a Pain token",
            "ru": "пока отряд Empowered за Pain token"
          },
          "cond": [
            "unit-empowered"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "a4fe8cb4-4bc5-4bfb-a3af-f2cd1dfa9070:lelith-hesperax",
      "kind": "ability",
      "name": "Lelith Hesperax: Thrilling Spectacle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lelith-hesperax"
      },
      "hash": "64aee29a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "12",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "1d74d334-af88-4582-aca0-f818ef8bd439:raider",
      "kind": "ability",
      "name": "Raider: Aethersails",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raider",
        "set": "Vanguard of the Dark City",
        "pickLimit": 1
      },
      "hash": "9e2db4e6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "20936b9a-96d7-4934-9402-eed98ae38c99:raider",
      "kind": "ability",
      "name": "Raider: Masters of the Shadowed Sky",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raider",
        "set": "Vanguard of the Dark City",
        "pickLimit": 1
      },
      "hash": "2b3380b3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "95651527-f545-4399-b4c4-06d7461558c4:raider",
      "kind": "ability",
      "name": "Raider: Speed of the Kill",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raider",
        "set": "Vanguard of the Dark City",
        "pickLimit": 1
      },
      "hash": "7fbd9c95",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d962b22a-8d58-4ee1-aeea-a59a87037426:raider",
      "kind": "ability",
      "name": "Raider: Splinter Racks",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raider"
      },
      "hash": "ba40073d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "845cca83-fe79-455f-8ee6-761b1d478a97:raider",
      "kind": "ability",
      "name": "Raider: Visions of Butchery",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raider",
        "set": "Vanguard of the Dark City",
        "pickLimit": 1
      },
      "hash": "2ba45689",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0c2bef65-331b-4258-b62b-355f981c1618:ravager",
      "kind": "ability",
      "name": "Ravager: Agonising Suppression",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravager"
      },
      "hash": "17c69053",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "pack:raven-strike-fighter:ground-attack-craft",
      "kind": "ability",
      "name": "Raven Strike Fighter: Ground-attack Craft",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "raven-strike-fighter"
      },
      "hash": "88c51acf",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit that cannot FLY",
            "ru": "по отряду без FLY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "01b389b5-c381-4610-83e1-ea05cd85b20a:razorwing-jetfighter",
      "kind": "ability",
      "name": "Razorwing Jetfighter: Ground-attack Craft",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "razorwing-jetfighter"
      },
      "hash": "95aac45c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit that cannot FLY",
            "ru": "по отряду без FLY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7a4be46a-3e2f-4421-ad8e-6551106c770f:razorwing-jetfighter",
      "kind": "ability",
      "name": "Razorwing Jetfighter: Nowhere to Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "razorwing-jetfighter"
      },
      "hash": "503b3fd4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "pack:reaper:electromagentic-cascade-pain",
      "kind": "ability",
      "name": "Reaper: Electromagentic Cascade (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "reaper"
      },
      "hash": "f0e44a96",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "while Empowered, against a VEHICLE unit",
            "ru": "пока Empowered, по отряду VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while Empowered, against a non-VEHICLE unit",
            "ru": "пока Empowered, по отряду без VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "24a65646-e270-4708-a07e-4fd26d1bb189:reavers",
      "kind": "ability",
      "name": "Reavers: Matchless Swiftness",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "reavers"
      },
      "hash": "4b733d31",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 8,
          "when": {
            "en": "while Empowered, in a phase it Advanced (no Advance roll is made)",
            "ru": "пока Empowered, в фазе с Advance (бросок не делается)"
          },
          "cond": [
            "unit-empowered",
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "1c0f156d-a5ea-42c8-8b88-012369237186:scourges-with-shardcarbines",
      "kind": "ability",
      "name": "Scourges with Shardcarbines: Murderous Crossfire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "scourges-with-shardcarbines"
      },
      "hash": "1de432a2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d3d0bb1a-87c9-4e46-9237-2d6c05ccee4a:succubus",
      "kind": "ability",
      "name": "Succubus: Storm of Blades",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "succubus"
      },
      "hash": "9d48081a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "ba6e7827-a22b-4fdb-b38f-90475a84e9e2:talos",
      "kind": "ability",
      "name": "Talos: Devoted to Pain",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "talos"
      },
      "hash": "23b9180a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "TWIN-LINKED",
          "only": {
            "name": "Macro-scalpel"
          },
          "when": {
            "en": "if that model took two macro-scalpels",
            "ru": "если модель взяла два macro-scalpel"
          },
          "cond": [
            "wargear-two-macro-scalpels"
          ]
        }
      ]
    },
    {
      "sid": "pack:tantalus:engine-of-destruction-pain",
      "kind": "ability",
      "name": "Tantalus: Engine of Destruction (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tantalus"
      },
      "hash": "5cd56744",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 8",
          "only": {
            "name": "Pulse disintegrators"
          },
          "when": {
            "en": "while Empowered",
            "ru": "пока Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        }
      ]
    },
    {
      "sid": "pack:urien-rakarth:father-of-pain",
      "kind": "ability",
      "name": "Urien Rakarth: Father of Pain",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "urien-rakarth"
      },
      "hash": "bd499842",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs attacks with a Damage characteristic of 1)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "pack:urien-rakarth:sculptor-of-torments-pain",
      "kind": "ability",
      "name": "Urien Rakarth: Sculptor of Torments (Pain)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "urien-rakarth"
      },
      "hash": "52262587",
      "ver": 972,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ]
        },
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Empowered",
            "ru": "пока отряд Empowered"
          },
          "cond": [
            "unit-empowered"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "fa0d2462-a7dd-4f57-abcb-e001e8682912:wracks",
      "kind": "ability",
      "name": "Wracks: Experimental Enhancements",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wracks"
      },
      "hash": "10523e54",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "3",
          "when": {
            "en": "while Empowered, if Attacks 3 was chosen",
            "ru": "пока Empowered, если выбран вариант Attacks 3"
          },
          "cond": [
            "unit-empowered",
            "wrack-attacks-3"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "4",
          "when": {
            "en": "while Empowered, if Attacks 4 was chosen",
            "ru": "пока Empowered, если выбран вариант Attacks 4"
          },
          "cond": [
            "unit-empowered",
            "wrack-attacks-4"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "while Empowered, if Attacks 4 was chosen",
            "ru": "пока Empowered, если выбран вариант Attacks 4"
          },
          "cond": [
            "unit-empowered",
            "wrack-attacks-4"
          ]
        }
      ]
    },
    {
      "sid": "531b472d-8206-448f-971c-69e882c246bd:xatrophos-nuul",
      "kind": "ability",
      "name": "Xatrophos Nuul: Fear Incarnate (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "xatrophos-nuul"
      },
      "hash": "fd4e2b25",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4e3676ea-791d-4b86-844d-c87af3eccd15",
      "kind": "armyRule",
      "name": "Corsairs and Travelling Players",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "e1eea53b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — allied points allowance"
    },
    {
      "sid": "29a8de5a-c329-4c78-9897-584e16e701e6",
      "kind": "detachmentRule",
      "name": "Stitchflesh Abominations",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "detachmentRule",
        "det": "covenite-coterie"
      },
      "hash": "9862711f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        }
      ]
    },
    {
      "sid": "60c93592-228e-4a81-a0c7-46967aacfc1d",
      "kind": "detachmentRule",
      "name": "Exacting Cruelty",
      "det": "Exhibition of Slaughter",
      "ref": {
        "kind": "detachmentRule",
        "det": "exhibition-of-slaughter"
      },
      "hash": "c82b992c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "25d48d63-072e-4bce-98fc-d168ab5a9333",
      "kind": "detachmentRule",
      "name": "Contracted Harvest",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "detachmentRule",
        "det": "kabalite-agonysts"
      },
      "hash": "ec6c46f7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "83ef4dc5-1730-4b4b-9476-69bc14fe1e35",
      "kind": "detachmentRule",
      "name": "Murderous Agenda",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "detachmentRule",
        "det": "kabalite-cartel"
      },
      "hash": "ceb65564",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "under the Trophy Hunters Contract, against your Contract unit",
            "ru": "при контракте «Trophy Hunters», по отряду-цели контракта"
          },
          "cond": [
            "never"
          ]
        },
        {
          "op": "state",
          "cond": [
            "contract-trophy-hunters"
          ],
          "when": {
            "en": "the Contract selected at the start of the battle",
            "ru": "контракт, выбранный в начале битвы"
          }
        },
        {
          "op": "state",
          "cond": [
            "contract-sow-fear-and-terror"
          ],
          "when": {
            "en": "the Contract selected at the start of the battle",
            "ru": "контракт, выбранный в начале битвы"
          }
        },
        {
          "op": "state",
          "cond": [
            "contract-show-of-strength"
          ],
          "when": {
            "en": "the Contract selected at the start of the battle",
            "ru": "контракт, выбранный в начале битвы"
          }
        }
      ]
    },
    {
      "sid": "c1059c41-1e84-4da8-bfaa-0dcdc721df56",
      "kind": "detachmentRule",
      "name": "Rain of Cruelty",
      "det": "Skysplinter Assault",
      "ref": {
        "kind": "detachmentRule",
        "det": "skysplinter-assault"
      },
      "hash": "fae4a325",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "until the end of the turn in which that unit disembarked from a Transport",
            "ru": "до конца хода, в котором отряд высадился из Transport"
          },
          "cond": [
            "unit-disembarked"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "until the end of the turn in which that unit disembarked from a Transport",
            "ru": "до конца хода, в котором отряд высадился из Transport"
          },
          "cond": [
            "unit-disembarked"
          ]
        }
      ]
    },
    {
      "sid": "b46b3339-173c-4bce-b474-33cb0239e5d2",
      "kind": "detachmentRule",
      "name": "Combat Drugs",
      "det": "Spectacle of Spite",
      "hash": "a309181b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Adrenalight is the active Combat Drug",
            "ru": "пока активен боевой наркотик Adrenalight"
          },
          "cond": [
            "drug-adrenalight"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while Hypex is the active Combat Drug",
            "ru": "пока активен боевой наркотик Hypex"
          },
          "cond": [
            "drug-hypex"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Serpentin is the active Combat Drug",
            "ru": "пока активен боевой наркотик Serpentin"
          },
          "cond": [
            "drug-serpentin"
          ]
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Painbringer is the active Combat Drug",
            "ru": "пока активен боевой наркотик Painbringer"
          },
          "cond": [
            "drug-painbringer"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Grave Lotus is the active Combat Drug",
            "ru": "пока активен боевой наркотик Grave Lotus"
          },
          "cond": [
            "drug-grave-lotus"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Splintermind is the active Combat Drug",
            "ru": "пока активен боевой наркотик Splintermind"
          },
          "cond": [
            "drug-splintermind"
          ]
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Splintermind is the active Combat Drug",
            "ru": "пока активен боевой наркотик Splintermind"
          },
          "cond": [
            "drug-splintermind"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "spectacle-of-spite"
      }
    },
    {
      "sid": "c9175da5-73ef-4a67-96fd-f878492d87cd",
      "kind": "detachmentRule",
      "name": "Darkest Artifice",
      "det": "Tools of Torment",
      "ref": {
        "kind": "detachmentRule",
        "det": "tools-of-torment"
      },
      "hash": "998ac032",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        }
      ]
    },
    {
      "sid": "69f4dbe4-bfd4-4638-b606-a1cc08c2ac0c",
      "kind": "enhancement",
      "name": "Toxin-laced Blades",
      "det": "Coven of Agonies",
      "ref": {
        "kind": "enhancement",
        "det": "cp:drukhari"
      },
      "hash": "4db99bb8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "48d18d70-1dcd-455e-9894-a193bea14106",
      "kind": "enhancement",
      "name": "Master Artisan",
      "det": "Covenite Coterie",
      "hash": "898f00ec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "covenite-coterie"
      }
    },
    {
      "sid": "443165dc-6701-498b-b43c-ebeeb405d304",
      "kind": "enhancement",
      "name": "Master Nemesine",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "enhancement",
        "det": "covenite-coterie"
      },
      "hash": "83540331",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-BEAST 2+",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "f6e6b1bd-e328-479b-bdaa-9e359bc5af3d",
      "kind": "enhancement",
      "name": "Master Repugnomancer (Aura)",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "enhancement",
        "det": "covenite-coterie",
        "scopes": [
          {
            "targets": [
              "DRUKHARI"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "3149a83e",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of an Aura ability, not of a weapon"
    },
    {
      "sid": "910abb59-9838-4b50-8180-fab4fedf9770",
      "kind": "enhancement",
      "name": "Hyperstimm Trafficker",
      "det": "Exhibition of Slaughter",
      "ref": {
        "kind": "enhancement",
        "det": "exhibition-of-slaughter"
      },
      "hash": "c761fdde",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "5600dcd0-652a-4078-9d65-266dfff20443",
      "kind": "enhancement",
      "name": "Contempt for Rivals",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-agonysts"
      },
      "hash": "7fb5eb42",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "0904f021-9996-49f4-a13f-7e3c367a058e",
      "kind": "enhancement",
      "name": "Towering Arrogance",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-agonysts"
      },
      "hash": "524037ab",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null,
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "152e049f-2e43-4e81-979e-29d3149737e0",
      "kind": "enhancement",
      "name": "Informant Network",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      },
      "hash": "d23b281a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "96ad45b7-7bcb-4584-9692-596c23687f56",
      "kind": "enhancement",
      "name": "Leechbite Plate",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      },
      "hash": "2b6bd246",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": null
        }
      ]
    },
    {
      "sid": "1b8a36e1-aaf0-4dc9-8d5e-7dc93f9961b4",
      "kind": "enhancement",
      "name": "Towering Arrogance",
      "det": "Kabalite Cartel",
      "hash": "1b9e848e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ],
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ],
          "target": "led"
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      },
      "appliesWhile": [
        "unit-leading"
      ]
    },
    {
      "sid": "8b210e33-0efe-4538-89e1-edd6a1e3eef4",
      "kind": "enhancement",
      "name": "Webway Awl",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      },
      "hash": "bc7df3f6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a8e27f43-6f0f-487e-9969-c65087ccdefe",
      "kind": "enhancement",
      "name": "Eye of Spite",
      "det": "Realspace Raiders",
      "hash": "388bc65b",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "instead, by spending 1 Pain token when the unit fights, for the phase",
            "ru": "вместо этого, если потрачен 1 Pain token, когда отряд сражается, до конца фазы"
          },
          "cond": [
            "spent-pain-eye-of-spite"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "when": {
            "en": "instead, by spending 1 Pain token when the unit fights, for the phase",
            "ru": "вместо этого, если потрачен 1 Pain token, когда отряд сражается, до конца фазы"
          },
          "cond": [
            "spent-pain-eye-of-spite"
          ],
          "alt": 1
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "realspace-raiders"
      }
    },
    {
      "sid": "c08c0431-a879-4802-83e1-63248c280552",
      "kind": "enhancement",
      "name": "Archraider",
      "det": "Reaper’s Wager",
      "ref": {
        "kind": "enhancement",
        "det": "reapers-wager"
      },
      "hash": "d4c312fe",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0141231c-7ff0-4807-8ea4-4cf6b1078bad",
      "kind": "enhancement",
      "name": "Reaper’s Cowl",
      "det": "Reaper’s Wager",
      "ref": {
        "kind": "enhancement",
        "det": "reapers-wager"
      },
      "hash": "fa8a9425",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null,
          "target": "led"
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8f4da3ed-14af-43a6-8708-64f2bca26258",
      "kind": "enhancement",
      "name": "Webway Walker",
      "det": "Reaper’s Wager",
      "ref": {
        "kind": "enhancement",
        "det": "reapers-wager"
      },
      "hash": "5b75f6e7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "64571ab3-200a-432c-bab6-ac107cf7598c",
      "kind": "enhancement",
      "name": "Phantasmal Smoke",
      "det": "Skysplinter Assault",
      "ref": {
        "kind": "enhancement",
        "det": "skysplinter-assault"
      },
      "hash": "3f686459",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a04e80bd-7407-42b2-84f2-c47df330e77c",
      "kind": "enhancement",
      "name": "Chronoshard",
      "det": "Spectacle of Spite",
      "ref": {
        "kind": "enhancement",
        "det": "spectacle-of-spite"
      },
      "hash": "052f254b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": {
            "en": "until the end of a Fight phase the bearer used this Enhancement in (once per battle)",
            "ru": "до конца Fight phase, в которой носитель применил улучшение (раз за битву)"
          },
          "target": "led",
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "21a18c7b-916b-47d4-a50b-8af59f3c03dc",
      "kind": "enhancement",
      "name": "Morghenna’s Curse",
      "det": "Spectacle of Spite",
      "hash": "6aa214f2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
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
        "det": "spectacle-of-spite"
      }
    },
    {
      "sid": "bb413bfb-9992-48af-8684-70e080379f3a",
      "kind": "enhancement",
      "name": "Elixir of the Corpse Courts (Upgrade)",
      "det": "Tools of Torment",
      "ref": {
        "kind": "enhancement",
        "det": "tools-of-torment"
      },
      "hash": "bbc5f9dd",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "03586339-4af2-4cd9-bb94-9bddc81d9144",
      "kind": "enhancement",
      "name": "Gnarlskin Experimentor",
      "det": "Tools of Torment",
      "ref": {
        "kind": "enhancement",
        "det": "tools-of-torment"
      },
      "hash": "a9a76acc",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8109853a-f449-4a5c-825f-aec1a917eeb5",
      "kind": "stratagem",
      "name": "Hardened Physiology",
      "det": "Coven of Agonies",
      "ref": {
        "kind": "stratagem",
        "det": "cp:drukhari",
        "name": "Hardened Physiology"
      },
      "hash": "c3a9bf63",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "bd66d7c1-a2c3-4a8d-962a-7ffb17d0998e",
      "kind": "stratagem",
      "name": "Powerful Creations",
      "det": "Coven of Agonies",
      "ref": {
        "kind": "stratagem",
        "det": "cp:drukhari",
        "name": "Powerful Creations"
      },
      "hash": "ef45f036",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against MONSTER or VEHICLE targets",
            "ru": "против целей MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a MONSTER or VEHICLE unit",
            "ru": "против отряда MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "3504f5ae-6fc0-48a9-97df-9c903b1beacd",
      "kind": "stratagem",
      "name": "Connoisseurs of Pain",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "stratagem",
        "det": "covenite-coterie",
        "name": "Connoisseurs of Pain"
      },
      "hash": "a1ddf25f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "ff486372-93ee-477a-8727-f32623594fdc",
      "kind": "stratagem",
      "name": "Distillers of Fear",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "stratagem",
        "det": "covenite-coterie",
        "name": "Distillers of Fear"
      },
      "hash": "1dfc1073",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against a Battle-shocked unit",
            "ru": "по Battle-shocked отряду"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "36b5c066-0058-4d89-a442-425c63ddf25b",
      "kind": "stratagem",
      "name": "Acrobatic Display",
      "det": "Exhibition of Slaughter",
      "ref": {
        "kind": "stratagem",
        "det": "exhibition-of-slaughter",
        "name": "Acrobatic Display"
      },
      "hash": "f506ad10",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "09da496d-57c0-4c17-a816-de5038fee95a",
      "kind": "stratagem",
      "name": "Planned Strikes",
      "det": "Exhibition of Slaughter",
      "ref": {
        "kind": "stratagem",
        "det": "exhibition-of-slaughter",
        "name": "Planned Strikes"
      },
      "hash": "3a1eb869",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "981e3b0f-a2dc-4fd7-a5d3-53fa19b18366",
      "kind": "stratagem",
      "name": "Killers from the Dark Spires",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "stratagem",
        "det": "kabalite-agonysts",
        "name": "Killers from the Dark Spires"
      },
      "hash": "5938c3ef",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "6fac0d93-29d2-4f77-b942-070db913cc3e",
      "kind": "stratagem",
      "name": "Making A Point",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "stratagem",
        "det": "kabalite-cartel",
        "name": "Making A Point"
      },
      "hash": "6990f799",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "3b2945d6-d957-4689-a86d-4fc11e05803e",
      "kind": "stratagem",
      "name": "Taken Alive",
      "det": "Kabalite Cartel",
      "ref": {
        "kind": "stratagem",
        "det": "kabalite-cartel",
        "name": "Taken Alive"
      },
      "hash": "058e6483",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "42e7b548-fb86-4ce0-a13f-90dbe4291cdf",
      "kind": "stratagem",
      "name": "Dark Harvest",
      "det": "Realspace Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "realspace-raiders",
        "name": "Dark Harvest"
      },
      "hash": "fe2f913a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "8578de98-1229-478f-900d-c9196140c447",
      "kind": "stratagem",
      "name": "Eager for the Kill",
      "det": "Realspace Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "realspace-raiders",
        "name": "Eager for the Kill"
      },
      "hash": "a4c8daac",
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
      "sid": "63c6595b-9fe1-4676-bfc9-1035b3b5cd00",
      "kind": "stratagem",
      "name": "Fighting Shadows",
      "det": "Realspace Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "realspace-raiders",
        "name": "Fighting Shadows"
      },
      "hash": "214dc667",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c9ce7694-250a-49ab-a7be-eca6db661e1c",
      "kind": "stratagem",
      "name": "Insensible to Pain",
      "det": "Realspace Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "realspace-raiders",
        "name": "Insensible to Pain"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "dd2be183-cb28-48a6-85b4-e6443f2e2bdb",
      "kind": "stratagem",
      "name": "Instinctive Spite",
      "det": "Realspace Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "realspace-raiders",
        "name": "Instinctive Spite"
      },
      "hash": "93799d3e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against an enemy unit that is Below Half-strength",
            "ru": "по вражескому отряду Below Half-strength"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "as above, if you spent 1 Pain token",
            "ru": "то же, если потрачен 1 Pain token"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0725d812-9181-49d7-a99d-e92874eed991",
      "kind": "stratagem",
      "name": "Murderer’s Circus",
      "det": "Reaper’s Wager",
      "ref": {
        "kind": "stratagem",
        "det": "reapers-wager",
        "name": "Murderer’s Circus"
      },
      "hash": "214dc667",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "6496bede-f056-48dc-b698-04caeaa6ae7e",
      "kind": "stratagem",
      "name": "Night Shield",
      "det": "Skysplinter Assault",
      "ref": {
        "kind": "stratagem",
        "det": "skysplinter-assault",
        "name": "Night Shield"
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
      "sid": "7852622e-29ff-49c5-ada8-ed7a075d2541",
      "kind": "stratagem",
      "name": "Skyborne Annihilation",
      "det": "Skysplinter Assault",
      "ref": {
        "kind": "stratagem",
        "det": "skysplinter-assault",
        "name": "Skyborne Annihilation"
      },
      "hash": "f65412c8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "for KABALITE WARRIORS or HAND OF THE ARCHON, instead",
            "ru": "для KABALITE WARRIORS или HAND OF THE ARCHON, вместо этого"
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
      "sid": "8fabef51-65b1-44a4-854c-9739a2f7451a",
      "kind": "stratagem",
      "name": "Acrobatic Display",
      "det": "Spectacle of Spite",
      "ref": {
        "kind": "stratagem",
        "det": "spectacle-of-spite",
        "name": "Acrobatic Display"
      },
      "hash": "2c7e9e6a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "317227b3-8880-4b94-a663-ce9a00d9f190",
      "kind": "stratagem",
      "name": "Deadly Debut",
      "det": "Spectacle of Spite",
      "ref": {
        "kind": "stratagem",
        "det": "spectacle-of-spite",
        "name": "Deadly Debut"
      },
      "hash": "eee65040",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
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
            "en": "also, for a WYCHES unit",
            "ru": "и ещё, для отряда WYCHES"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b76d9c2e-6411-4c8b-ab57-7cdc440cea60",
      "kind": "stratagem",
      "name": "Salting the Wound",
      "det": "Tools of Torment",
      "ref": {
        "kind": "stratagem",
        "det": "tools-of-torment",
        "name": "Salting the Wound"
      },
      "hash": "4989c58d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against Battle-shocked targets",
            "ru": "против Battle-shocked целей"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "13df0ce0-d27d-4004-a370-1611de3526db:archon",
      "kind": "wargear",
      "name": "Archon: Soul Trap",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "archon",
        "item": "soul trap"
      },
      "hash": "78e9f6ec",
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
          "value": 2,
          "when": {
            "en": "for the rest of the battle, once its attacks destroyed a model, instead",
            "ru": "до конца битвы, если атака уничтожила модель, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for the rest of the battle, once its attacks destroyed a model, instead",
            "ru": "до конца битвы, если атака уничтожила модель, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 1
        }
      ]
    },
    {
      "sid": "49a47f0e-f2f3-49f4-9089-b4c164174287:hand-of-the-archon",
      "kind": "wargear",
      "name": "Hand of the Archon: Kabalite Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "hand-of-the-archon",
        "item": "kabalite icon"
      },
      "hash": "5fc81170",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the bearer only, while its unit is not Battle-shocked",
            "ru": "только носитель, пока отряд не Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "69fe633d-fa89-4a70-9de3-9bfccbf68a09:hand-of-the-archon",
      "kind": "wargear",
      "name": "Hand of the Archon: Phantasm Grenade Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "hand-of-the-archon",
        "item": "phantasm grenade launcher"
      },
      "hash": "6f6b78f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        }
      ]
    },
    {
      "sid": "c867b290-f746-47f5-998b-788c25e7406e:hand-of-the-archon",
      "kind": "wargear",
      "name": "Hand of the Archon: Stimm-needler",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "hand-of-the-archon",
        "item": "stimm-needler"
      },
      "hash": "a28c5c6f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79bfd4a0-3952-454b-95db-bee1f1f23580:hellions",
      "kind": "wargear",
      "name": "Hellions: Phantasm Grenade Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "hellions",
        "item": "phantasm grenade launcher"
      },
      "hash": "9f2814e8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    },
    {
      "sid": "49a47f0e-f2f3-49f4-9089-b4c164174287:kabalite-warriors",
      "kind": "wargear",
      "name": "Kabalite Warriors: Kabalite Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kabalite-warriors",
        "item": "kabalite icon"
      },
      "hash": "5fc81170",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the bearer only, while its unit is not Battle-shocked",
            "ru": "только носитель, пока отряд не Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "79bfd4a0-3952-454b-95db-bee1f1f23580:kabalite-warriors",
      "kind": "wargear",
      "name": "Kabalite Warriors: Phantasm Grenade Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kabalite-warriors",
        "item": "phantasm grenade launcher"
      },
      "hash": "9f2814e8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    },
    {
      "sid": "6d7b527c-2b1a-44b6-b72a-e035011627a4:reavers",
      "kind": "wargear",
      "name": "Reavers: Grav-talon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "reavers",
        "item": "grav-talon"
      },
      "hash": "259ba69a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "set",
          "value": "-2",
          "when": {
            "en": "the bearer's weapons only",
            "ru": "только оружие носителя"
          },
          "cond": [
            "wargear-bearer"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the bearer's weapons only",
            "ru": "только оружие носителя"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    }
  ]
}
