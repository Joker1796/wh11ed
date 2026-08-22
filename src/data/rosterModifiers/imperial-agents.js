// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "imperial-agents",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:aquila-kill-team",
      "kind": "ability",
      "name": "Aquila Kill Team: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquila-kill-team"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1e689318-8f2f-40dd-b791-ab84d3abc511:aquila-kill-team",
      "kind": "ability",
      "name": "Aquila Kill Team: Kill Team",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquila-kill-team"
      },
      "hash": "18dbc340",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:deathwatch-kill-team",
      "kind": "ability",
      "name": "Deathwatch Kill Team: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwatch-kill-team"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3abf4a41-24a8-4b00-99ff-070da866be07:eversor-assassin",
      "kind": "ability",
      "name": "Eversor Assassin: Overkill",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eversor-assassin"
      },
      "hash": "23baf762",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
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
          "op": "add",
          "value": 3,
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
      "sid": "a3719eb1-6c71-4db2-927b-f1a50dffbb3b:grey-knights-terminator-squad",
      "kind": "ability",
      "name": "Grey Knights Terminator Squad: Hammerhand",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grey-knights-terminator-squad"
      },
      "hash": "88d43136",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "until the end of a turn it made a Charge move",
            "ru": "до конца хода, в котором совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "500e30b2-050d-43e9-9682-e9902367e0a8:inquisitor-coteaz",
      "kind": "ability",
      "name": "Inquisitor Coteaz: Malefic Wardings",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-coteaz"
      },
      "hash": "7c363fc8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": null,
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against Psychic Attacks and DAEMON attacks, instead",
            "ru": "против Psychic Attacks и атак DAEMON, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8f8f280c-f5a8-4df4-93b4-0b402c61e3fa:inquisitor-draxus",
      "kind": "ability",
      "name": "Inquisitor Draxus: Xenos Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-draxus"
      },
      "hash": "22b18374",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5ad5311f-39c0-48d2-b0aa-45afbe912f33:inquisitor-greyfax",
      "kind": "ability",
      "name": "Inquisitor Greyfax: No Mercy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-greyfax"
      },
      "hash": "a2c8eed2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8aed8c98-1577-4b0e-ad6f-42b69a9097d5:inquisitor-greyfax",
      "kind": "ability",
      "name": "Inquisitor Greyfax: Psyoculum",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-greyfax"
      },
      "hash": "5f809e24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-PSYKER 4+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "ee171eca-1e2b-4684-8eae-ad0356a9491c:inquisitor-kroyle",
      "kind": "ability",
      "name": "Inquisitor Kroyle: Tox‑cycler",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inquisitor-kroyle"
      },
      "hash": "c11f932c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Jindarii tox"
          },
          "when": {
            "en": "for the rest of the battle, once it scored a hit with that weapon",
            "ru": "до конца битвы, если это оружие попало"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Jindarii tox"
          },
          "when": {
            "en": "for the rest of the battle, once it scored a hit with that weapon (max Damage 6)",
            "ru": "до конца битвы, если это оружие попало (Урон не выше 6)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0368fd0e-375b-43eb-9e6e-1d317e3409e0:inquisitor-s-hand-eversor-assassin",
      "kind": "ability",
      "name": "Inquisitor's Hand Eversor Assassin: Overkill (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "4b4fabb9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -4,
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
      "sid": "7b8abd6e-ceb3-4e6b-90c4-b46306d857c5:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Holy Hatred",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
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
      "sid": "3814e980-da68-4a95-b974-1ae6ff5c7542:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Zealot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
      },
      "hash": "0ff5db45",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
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
          "stat": "s",
          "op": "add",
          "value": 3,
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
      "sid": "f44961d2-ef44-41e8-ae8f-ad3d2486401e:preacher-teguen",
      "kind": "ability",
      "name": "Preacher Teguen: Holy Hatred",
      "det": null,
      "ref": null,
      "hash": "23578dc1",
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
      "sid": "529d2a22-6ed3-43d9-91a3-21a95385892f:preacher-teguen",
      "kind": "ability",
      "name": "Preacher Teguen: Zealot (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "b7d24256",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
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
          "stat": "s",
          "op": "add",
          "value": 3,
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
      "sid": "9a2a9f27-0b49-4bdc-8718-77a8122c1ddd:sanctifiers",
      "kind": "ability",
      "name": "Sanctifiers: Ministorum Sermon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanctifiers"
      },
      "hash": "657ab3df",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "29dd94a6-896b-4c38-98f1-abea90c30860:vigilant-squad",
      "kind": "ability",
      "name": "Vigilant Squad: Merciless Judgement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vigilant-squad"
      },
      "hash": "fc5b3a68",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c404272-6d02-4187-85a5-d2d4fb13d862:vindicare-assassin",
      "kind": "ability",
      "name": "Vindicare Assassin: Shieldbreaker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vindicare-assassin"
      },
      "hash": "3c91cf55",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9750151c-8ecb-4051-a25b-5d34af7869e8:watch-captain-artemis",
      "kind": "ability",
      "name": "Watch Captain Artemis: Tactical Instinct",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "watch-captain-artemis"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "82ad414b-e19f-4a6a-be1a-5ce96e420d21",
      "kind": "armyRule",
      "name": "Assigned Agents",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4aa3a14f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — how many Agents units may be included"
    },
    {
      "sid": "dc3732a7-5647-49b0-b3d1-8279dcfc40e4",
      "kind": "detachmentRule",
      "name": "At All Costs",
      "det": "Imperialis Fleet",
      "hash": "c7734e00",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "imperialis-fleet"
      }
    },
    {
      "sid": "7c93a7f0-c620-488f-a19c-65c23ed26631",
      "kind": "detachmentRule",
      "name": "Deathwatch Mission Tactics",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "detachmentRule",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "6d06128c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the Furor Tactics Mission Tactic is active",
            "ru": "пока активна тактика Furor Tactics"
          },
          "cond": [
            "tactic-furor"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the Malleus Tactics Mission Tactic is active",
            "ru": "пока активна тактика Malleus Tactics"
          },
          "cond": [
            "tactic-malleus"
          ]
        }
      ]
    },
    {
      "sid": "c03746fa-d420-4d0a-b792-5fe5b1e1be66",
      "kind": "enhancement",
      "name": "Ignis Judicium",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-hereticus-purgation-force"
      },
      "hash": "024b237f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "MELTA 1",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "20cc49fb-5221-4dcf-b631-b116a84b02c3",
      "kind": "enhancement",
      "name": "Daemon Slayer",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "c4f1ac1e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "65ac2883-9467-4478-847c-55858dde8251",
      "kind": "enhancement",
      "name": "Formidable Resolve",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "46a46316",
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
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "43034cd6-adca-4c3f-a1ca-2cc5274871f2",
      "kind": "enhancement",
      "name": "Grimoire of True Names (Aura)",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "77f50fbb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "853414cb-e3c5-4543-a1cd-3ef2101c6682",
      "kind": "enhancement",
      "name": "Universal Anathema",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "ae5663cb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:aquila-kill-team",
      "kind": "wargear",
      "name": "Aquila Kill Team: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "aquila-kill-team",
        "item": "astartes shield"
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
      "sid": "f7579dbf-b927-430a-8da6-c82b100cc0ba:corvus-blackstar",
      "kind": "wargear",
      "name": "Corvus Blackstar: Auspex Array",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corvus-blackstar",
        "item": "auspex array"
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
          "when": null
        }
      ]
    },
    {
      "sid": "d5028f22-7248-4d7e-8550-23ebbf37c0a5:corvus-blackstar",
      "kind": "wargear",
      "name": "Corvus Blackstar: Infernum Halo-launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corvus-blackstar",
        "item": "infernum halo-launcher"
      },
      "hash": "46cafc31",
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
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:deathwatch-kill-team",
      "kind": "wargear",
      "name": "Deathwatch Kill Team: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwatch-kill-team",
        "item": "astartes shield"
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
      "sid": "bde4aec2-30a1-4d29-a294-e5c220d4c16b:exaction-squad",
      "kind": "wargear",
      "name": "Exaction Squad: Soulguilt Scanner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "exaction-squad",
        "item": "soulguilt scanner"
      },
      "hash": "c40143bc",
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
      "sid": "314a4643-59ab-4fd8-a1a8-d05172bb2070:grey-knights-terminator-squad",
      "kind": "wargear",
      "name": "Grey Knights Terminator Squad: Ancient’s Banner",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "grey-knights-terminator-squad",
        "item": "ancient's banner"
      },
      "hash": "ec06b6a4",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "074ac92a-0ebc-4951-8e67-e459cb11bae3:imperial-navy-breachers",
      "kind": "wargear",
      "name": "Imperial Navy Breachers: Endurant Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "imperial-navy-breachers",
        "item": "endurant shield"
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
      "sid": "4c0dbe01-e4a8-4fd5-992b-f35d5ef423a4:inquisitor",
      "kind": "wargear",
      "name": "Inquisitor: Blessed Wardings",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "inquisitor",
        "item": "blessed wardings"
      },
      "hash": "bda848a8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a49e2a76-e166-4227-965c-ad9b4ef36f1f:inquisitor",
      "kind": "wargear",
      "name": "Inquisitor: Psychic Gifts",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "inquisitor",
        "item": "psychic gifts"
      },
      "hash": "a7eed996",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Psyker",
          "when": null
        }
      ]
    },
    {
      "sid": "34c3c209-6c20-4bfd-941b-5cf6224c3011:sanctifiers",
      "kind": "wargear",
      "name": "Sanctifiers: Simulacrum Imperialis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sanctifiers",
        "item": "simulacrum imperialis"
      },
      "hash": "f2b9e017",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "34c3c209-6c20-4bfd-941b-5cf6224c3011:sisters-of-battle-squad",
      "kind": "wargear",
      "name": "Sisters of Battle Squad: Simulacrum Imperialis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sisters-of-battle-squad",
        "item": "simulacrum imperialis"
      },
      "hash": "f2b9e017",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    }
  ]
}
