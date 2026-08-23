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
      "sid": "214982bf-5eac-4189-ac0a-1c0945f404c2:coven-of-agonies-cronos",
      "kind": "ability",
      "name": "Coven of Agonies Cronos: Empowered Engines (Pain)",
      "det": null,
      "ref": null,
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
      "effects": []
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
      "effects": []
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
          "cond": [
            "never"
          ]
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
          "cond": [
            "never"
          ]
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
      "effects": []
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
          "target": "led"
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
            "never"
          ]
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
            "en": "while Empowered, if this option is chosen (non-CHARACTER models)",
            "ru": "пока Empowered, если выбран этот вариант (кроме CHARACTER)"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "4",
          "when": {
            "en": "while Empowered, if the other option is chosen (non-CHARACTER models, HAZARDOUS)",
            "ru": "пока Empowered, если выбран другой вариант (кроме CHARACTER, HAZARDOUS)"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "531b472d-8206-448f-971c-69e882c246bd:xatrophos-nuul",
      "kind": "ability",
      "name": "Xatrophos Nuul: Fear Incarnate (Aura)",
      "det": null,
      "ref": null,
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
            "never"
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
            "never"
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
      "sid": "69f4dbe4-bfd4-4638-b606-a1cc08c2ac0c",
      "kind": "enhancement",
      "name": "Toxin-laced Blades",
      "det": "Coven of Agonies",
      "ref": null,
      "hash": "4db99bb8",
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
          "when": null
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
        "det": "covenite-coterie"
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
          "when": null
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
          "when": null
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
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
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
          ]
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
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      }
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
            "en": "Attacks and AP improve by 2 instead, for the phase, by spending 1 Pain token when the unit fights",
            "ru": "атаки и пробитие улучшаются на 2 вместо 1 на фазу, если потратить 1 жетон боли при выборе отряда для боя"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "realspace-raiders"
      }
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
      "sid": "bd66d7c1-a2c3-4a8d-962a-7ffb17d0998e",
      "kind": "stratagem",
      "name": "Powerful Creations",
      "det": "Coven of Agonies",
      "ref": null,
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
      "effects": []
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
      "effects": []
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
      "effects": []
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
      "effects": []
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
            "blocked-subset"
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
            "blocked-subset"
          ]
        }
      ]
    }
  ]
}
