// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "chaos-daemons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "1142f775-5766-44be-b032-fd2edd0ac4ee:belakor",
      "kind": "ability",
      "name": "Be’lakor: Pall of Despair (Aura, Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belakor",
        "set": "Shadow Form Abilities",
        "pickLimit": 1
      },
      "hash": "34873127",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "35f3d3f8-f9b9-45cd-adcf-5f6f1c9a7c2d:belakor",
      "kind": "ability",
      "name": "Be’lakor: Shadow Lord (Aura, Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belakor",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA",
              "SHADOW LEGION"
            ],
            "excludes": []
          }
        ],
        "set": "Shadow Form Abilities",
        "pickLimit": 1
      },
      "hash": "fa25cb6f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9e1aae3f-0753-4856-ad14-0cc44786e7be:belakor",
      "kind": "ability",
      "name": "Be’lakor: Wreathed in Shadows (Aura, Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belakor",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ],
        "set": "Shadow Form Abilities",
        "pickLimit": 1
      },
      "hash": "86d85f6a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "20b0285d-05d1-4b48-bb21-419e1e1feae6:bloodmaster",
      "kind": "ability",
      "name": "Bloodmaster: Bloodmaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bloodmaster"
      },
      "hash": "aa7eb7dd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ee4d1638-9a02-4280-b02a-153c84034d21:bloodthirster",
      "kind": "ability",
      "name": "Bloodthirster: Daemon Lord of Khorne",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bloodthirster",
        "scopes": [
          {
            "targets": [
              "KHORNE LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "99d56dec",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ad0bab17-6be0-4962-8503-f1769cb70f6f:blue-horrors",
      "kind": "ability",
      "name": "Blue Horrors: Sullen Malevolence",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blue-horrors"
      },
      "hash": "f20a7aa6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "751369ac-fb53-4fda-89d9-b8e8cbe532fa:changecaster",
      "kind": "ability",
      "name": "Changecaster: Changecaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "changecaster"
      },
      "hash": "76c79108",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "af46eb11-f58f-4447-8cb4-ddb0ce9d839e:contorted-epitome",
      "kind": "ability",
      "name": "Contorted Epitome: Swallow Energy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "contorted-epitome"
      },
      "hash": "b1a8245a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds and Psychic Attacks)",
          "target": "unit",
          "when": null
        }
      ]
    },
    {
      "sid": "9abb08e6-5ea7-4b69-a350-20ae551ce99e:daemon-prince-of-chaos-with-wings",
      "kind": "ability",
      "name": "Daemon Prince of Chaos with Wings: Harbinger of Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-chaos-with-wings"
      },
      "hash": "bbbc232b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "harbinger-lethal"
          ],
          "only": {
            "name": "Hellforged weapons"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "harbinger-precision"
          ],
          "only": {
            "name": "Hellforged weapons"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "harbinger-sustained"
          ],
          "only": {
            "name": "Hellforged weapons"
          }
        }
      ]
    },
    {
      "sid": "0dd11ed9-198b-463b-bfb4-3a78c281c76d:daemon-prince-of-chaos-with-wings",
      "kind": "ability",
      "name": "Daemon Prince of Chaos with Wings: Malefic Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-chaos-with-wings"
      },
      "hash": "3bbbdb1a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Hellforged"
          },
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
      "sid": "c2040afa-b23e-443f-a3c8-2f45383bc96f:daemon-prince-of-chaos",
      "kind": "ability",
      "name": "Daemon Prince of Chaos: Daemonic Lord",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-chaos"
      },
      "hash": "792980f7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "132a3018-8899-4d29-9efb-ed1d7735badf:daemon-prince-of-chaos",
      "kind": "ability",
      "name": "Daemon Prince of Chaos: Prince of Darkness",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-chaos",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f46b8c03",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "befa7c2a-9616-4369-8a05-58815d6b121e:daemon-prince-of-chaos",
      "kind": "ability",
      "name": "Daemon Prince of Chaos: Unholy Vigour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-chaos"
      },
      "hash": "c7e8505e",
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
        }
      ]
    },
    {
      "sid": "7fbe6305-a2cd-4319-991f-aaf3bd97acbd:epidemius",
      "kind": "ability",
      "name": "Epidemius: Blessed by the Plague God",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "epidemius"
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
          "target": "unit"
        }
      ]
    },
    {
      "sid": "aadf02b1-b604-4d2b-bb39-aad16d42e58e:exalted-flamer",
      "kind": "ability",
      "name": "Exalted Flamer: Blazing Warpfire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "exalted-flamer"
      },
      "hash": "d7afb870",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "015e74d5-054a-49fa-b002-9c17b277069f:fateskimmer",
      "kind": "ability",
      "name": "Fateskimmer: Fateskimmer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fateskimmer"
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
          "target": "unit"
        }
      ]
    },
    {
      "sid": "a438e44e-b000-41b0-94ed-61a085221fee:feculent-gnarlmaw",
      "kind": "ability",
      "name": "Feculent Gnarlmaw: Shroud of Flies",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "feculent-gnarlmaw",
        "scopes": [
          {
            "targets": [
              "NURGLE LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f3b8776a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "4ee62487-e96f-4363-a5bc-6ca110ce1730:fluxmaster",
      "kind": "ability",
      "name": "Fluxmaster: Fluxmaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fluxmaster"
      },
      "hash": "87a55d7c",
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
      "sid": "2b28facf-6d9e-477a-9612-5fb56296aef1:great-unclean-one",
      "kind": "ability",
      "name": "Great Unclean One: Daemon Lord of Nurgle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "great-unclean-one",
        "scopes": [
          {
            "targets": [
              "NURGLE LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "24462df7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "6e5dd267-7e5a-4213-9116-daef9389e80c:great-unclean-one",
      "kind": "ability",
      "name": "Great Unclean One: Nurgle’s Rot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "great-unclean-one"
      },
      "hash": "2250767e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "41d2323f-4a2b-4fa3-9f13-7156d301f55e:hellflayers",
      "kind": "ability",
      "name": "Hellflayers: Cutting Down the Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hellflayers"
      },
      "hash": "127dac77",
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
            "ru": "если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a Charge move this turn",
            "ru": "если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "8732df0b-f46f-46a7-a14e-8c306abaafbe:infernal-enrapturess",
      "kind": "ability",
      "name": "Infernal Enrapturess: Discordant Disruption",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "infernal-enrapturess"
      },
      "hash": "7d1703a0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "961e1f8f-1e16-470c-b069-d6a9f88b3cc3:keeper-of-secrets",
      "kind": "ability",
      "name": "Keeper of Secrets: Daemon Lord of Slaanesh",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "keeper-of-secrets",
        "scopes": [
          {
            "targets": [
              "SLAANESH LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "4ebf44c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "f0d51829-0fa5-44ab-b142-b5eea8246496:lord-of-change",
      "kind": "ability",
      "name": "Lord of Change: Daemon Lord of Tzeentch",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-of-change",
        "scopes": [
          {
            "targets": [
              "TZEENTCH LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "1934ffb4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "0effb863-11f6-4097-9d2f-780cbb275a00:lord-of-change",
      "kind": "ability",
      "name": "Lord of Change: Master of Magicks",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-of-change"
      },
      "hash": "4682d5b5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "magicks-ignores-cover"
          ],
          "only": {
            "name": "Bolt of Change"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "magicks-lethal"
          ],
          "only": {
            "name": "Bolt of Change"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS D3",
          "when": {
            "en": "while this is the ability selected for this phase",
            "ru": "пока на эту фазу выбрана эта способность"
          },
          "cond": [
            "magicks-sustained"
          ],
          "only": {
            "name": "Bolt of Change"
          }
        }
      ]
    },
    {
      "sid": "b056eee6-6e63-4855-af76-8794c8659a37:rendmaster-on-blood-throne",
      "kind": "ability",
      "name": "Rendmaster on Blood Throne: Blood Throne",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rendmaster-on-blood-throne"
      },
      "hash": "3975c405",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7e8193c1-c4a6-428c-ab02-1505c56ea17f:rotigus",
      "kind": "ability",
      "name": "Rotigus: Deluge of Nurgle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rotigus"
      },
      "hash": "a894725f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1a8915cb-676b-4dd0-a1c4-b01b2d24095e:rotigus",
      "kind": "ability",
      "name": "Rotigus: Virulent Blessing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rotigus"
      },
      "hash": "80353929",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cec3a53a-130a-4a69-af12-4c54cc70b899:skarbrand",
      "kind": "ability",
      "name": "Skarbrand: Rage Embodied",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skarbrand",
        "scopes": [
          {
            "targets": [
              "KHORNE LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "6444af89",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "65416b74-1478-4169-856a-ed5522ef4309:skullmaster",
      "kind": "ability",
      "name": "Skullmaster: Skullmaster’s Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skullmaster"
      },
      "hash": "1e93ac48",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Juggernaut’s bladed horn"
          },
          "target": "unit",
          "when": {
            "en": "for the turn, after that unit ends a Charge move",
            "ru": "на ход, после того как отряд закончил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "d89f5170-ed5a-4d4d-a198-cf96271a10b6:skulltaker",
      "kind": "ability",
      "name": "Skulltaker: Lord of Decapitations",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skulltaker"
      },
      "hash": "a184123b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "589cd6bb-b4ff-46cd-be72-b0406197b9d5:sloppity-bilepiper",
      "kind": "ability",
      "name": "Sloppity Bilepiper: Jolly Gutpipes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sloppity-bilepiper"
      },
      "hash": "fc9e329c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "de75e5f2-6284-4fd0-93e4-e6a7ca260f18:spoilpox-scrivener",
      "kind": "ability",
      "name": "Spoilpox Scrivener: Keep Counting!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "spoilpox-scrivener"
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
      "sid": "dc64cc17-20f8-44bd-8821-ef52027abe92:spoilpox-scrivener",
      "kind": "ability",
      "name": "Spoilpox Scrivener: Meet Your Quota!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "spoilpox-scrivener"
      },
      "hash": "be69986d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "efdf042e-67d5-40ec-af94-64f19995a199:the-masque-of-slaanesh",
      "kind": "ability",
      "name": "The Masque of Slaanesh: The Eternal Dance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-masque-of-slaanesh",
        "scopes": [
          {
            "targets": [
              "SLAANESH LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "1ae444c8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c51c601-04ca-43a7-9498-073ff4aabfbb:tormentbringer",
      "kind": "ability",
      "name": "Tormentbringer: Tormentbringer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tormentbringer",
        "scopes": [
          {
            "targets": [
              "SLAANESH LEGIONES DAEMONICA"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "9547dbf1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "cdb2d463-155c-42e4-a175-a067c162c0eb",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Khorne",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Khorne"
      },
      "hash": "ae040202",
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
      "sid": "7eb23e8f-7e4d-4514-b126-ece1d6afc4f8",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Nurgle",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Nurgle"
      },
      "hash": "18bd6cac",
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
      "sid": "5c3a9d42-de95-4760-a2dd-fbd631f07f9d",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Slaanesh",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Slaanesh"
      },
      "hash": "40f35f84",
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
      "sid": "da9691ba-f0cc-4647-8c64-d43889b44811",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Tzeentch",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Tzeentch"
      },
      "hash": "213a227a",
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
      "sid": "6d20d153-1252-428c-a141-b0863232aeda",
      "kind": "armyRule",
      "name": "Daemonic Pact",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "9611ddd4",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — allied points allowance, no printed number"
    },
    {
      "sid": "bcf36274-b2f2-4e89-9ec8-4b15779043cc",
      "kind": "detachmentRule",
      "name": "Seductive Gambit",
      "det": "Legion of Excess",
      "ref": {
        "kind": "detachmentRule",
        "det": "legion-of-excess"
      },
      "hash": "bf28d71f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "676a146d-1018-40c5-82d4-e2c816e4bf80",
      "kind": "detachmentRule",
      "name": "Loci of Power",
      "det": "Lords of the Warp",
      "ref": {
        "kind": "detachmentRule",
        "det": "lords-of-the-warp"
      },
      "hash": "5baf0248",
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
      "sid": "b11810ea-a5f1-4a5f-ae70-54c95415b57d",
      "kind": "detachmentRule",
      "name": "First Prince of Chaos",
      "det": "Shadow Legion",
      "ref": {
        "kind": "detachmentRule",
        "det": "shadow-legion"
      },
      "hash": "04c2b126",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7f775c80-d3ce-4aa7-a586-348ac9502b2a",
      "kind": "detachmentRule",
      "name": "shudderblink",
      "det": "Warptide",
      "ref": {
        "kind": "detachmentRule",
        "det": "warptide"
      },
      "hash": "1efb3dd1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "when that unit is selected to make an Advance move, until the end of the turn",
            "ru": "когда юнит выбран для Advance-перемещения, до конца хода"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "281cf9a5-5126-42dc-a47c-fc5c897821df",
      "kind": "enhancement",
      "name": "Brazenmaw",
      "det": "Blood Legion",
      "hash": "8e83ef45",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "blood-legion"
      }
    },
    {
      "sid": "02d5ce17-8c89-4918-aebc-440d43cb0ed7",
      "kind": "enhancement",
      "name": "Gateway Unto Damnation",
      "det": "Blood Legion",
      "ref": {
        "kind": "enhancement",
        "det": "blood-legion"
      },
      "hash": "80378352",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f8020def-f6bf-421b-ab9d-9b2fd1dfadc3",
      "kind": "enhancement",
      "name": "Slaughterthirst (Aura)",
      "det": "Blood Legion",
      "ref": {
        "kind": "enhancement",
        "det": "blood-legion",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA KHORNE"
            ],
            "excludes": [
              "MONSTERS",
              "MONSTER"
            ]
          }
        ]
      },
      "hash": "66c3a4e1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while that unit is within 6\" of the bearer",
            "ru": "пока отряд в пределах 6\" от носителя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "911e7488-e48a-45e0-9925-4e7c58fbe13f",
      "kind": "enhancement",
      "name": "Apocalyptic Steeds (Upgrade)",
      "det": "Cavalcade of Chaos",
      "ref": {
        "kind": "enhancement",
        "det": "cavalcade-of-chaos"
      },
      "hash": "ac0e965b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "ebead938-7836-4e08-a1bf-e0c5ab3801a5",
      "kind": "enhancement",
      "name": "A’rgath, The King of Blades",
      "det": "Daemonic Incursion",
      "hash": "4c95d62c",
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
            "en": "Attacks and Strength +2 instead, while the bearer is within your army's Shadow of Chaos",
            "ru": "атаки и сила +2 вместо +1, пока носитель в Тени Хаоса вашей армии"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "daemonic-incursion"
      }
    },
    {
      "sid": "e8f57682-ba60-4f3f-a276-523d9c6539d3",
      "kind": "enhancement",
      "name": "The Endless Gift",
      "det": "Daemonic Incursion",
      "ref": {
        "kind": "enhancement",
        "det": "daemonic-incursion"
      },
      "hash": "46f895f9",
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
      "sid": "21549ce2-0e59-434f-b5e0-360ea30d53a6",
      "kind": "enhancement",
      "name": "The Everstave",
      "det": "Daemonic Incursion",
      "hash": "90d119a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 3,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Strength +2 and Range +6\" instead, while the bearer is within your army's Shadow of Chaos",
            "ru": "сила +2 и дальность +6\" вместо этого, пока носитель в Тени Хаоса вашей армии"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "daemonic-incursion"
      }
    },
    {
      "sid": "b9c84001-f845-4ed2-891d-ff7ea71daf51",
      "kind": "enhancement",
      "name": "Dreaming Crown (Aura)",
      "det": "Legion of Excess",
      "hash": "cb5eae27",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "legion-of-excess",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA SLAANESH"
            ],
            "excludes": [
              "MONSTERS",
              "MONSTER"
            ]
          }
        ]
      }
    },
    {
      "sid": "d3ec0f1f-8345-49e1-bad6-0cd9fd4b13e2",
      "kind": "enhancement",
      "name": "False Majesty (Aura)",
      "det": "Legion of Excess",
      "hash": "e47184fd",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "legion-of-excess",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA SLAANESH"
            ],
            "excludes": [
              "MONSTERS",
              "MONSTER"
            ]
          }
        ]
      }
    },
    {
      "sid": "533bc4ea-3d36-4fb0-95c2-8169ccd52859",
      "kind": "enhancement",
      "name": "Swollen with Power (Upgrade)",
      "det": "Lords of the Warp",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-the-warp"
      },
      "hash": "06e094b5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "c6c3e944-461f-4651-a57c-d4d0a8a03ca4",
      "kind": "enhancement",
      "name": "Font of Spores (Aura)",
      "det": "Plague Legion",
      "hash": "e5278c50",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "plague-legion",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA NURGLE"
            ],
            "excludes": []
          }
        ]
      }
    },
    {
      "sid": "164bc0b9-47cc-4e31-a655-174ec86d611e",
      "kind": "enhancement",
      "name": "Improbable Shield (Aura)",
      "det": "Scintillating Legion",
      "ref": {
        "kind": "enhancement",
        "det": "scintillating-legion",
        "scopes": [
          {
            "targets": [
              "LEGIONES DAEMONICA TZEENTCH"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "692e2a7a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "bb19b8b3-0999-446a-80b9-da84024bcc61",
      "kind": "enhancement",
      "name": "Neverblade",
      "det": "Scintillating Legion",
      "hash": "bb91fd81",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
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
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "scintillating-legion"
      }
    },
    {
      "sid": "3ac71f81-4676-44b1-8461-7471c474dc49",
      "kind": "enhancement",
      "name": "Leaping Shadows",
      "det": "Shadow Legion",
      "ref": {
        "kind": "enhancement",
        "det": "shadow-legion"
      },
      "hash": "c88d3f5f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 9\"",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "63613eac-5d6e-466b-bca6-863553d5a93e",
      "kind": "enhancement",
      "name": "Mantle of Gloom (Aura)",
      "det": "Shadow Legion",
      "ref": {
        "kind": "enhancement",
        "det": "shadow-legion"
      },
      "hash": "85b6b4a2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "202cf6aa-5832-4f39-8d1f-555088d46b27",
      "kind": "enhancement",
      "name": "Bane-forged Weapons (Upgrade)",
      "det": "Warptide",
      "ref": {
        "kind": "enhancement",
        "det": "warptide"
      },
      "hash": "8abc82de",
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
    },
    {
      "sid": "8ffa14f4-ea5f-4972-ab86-695a093a56e9",
      "kind": "stratagem",
      "name": "Sheathed In Brass",
      "det": "Blood Legion",
      "ref": {
        "kind": "stratagem",
        "det": "blood-legion",
        "name": "Sheathed In Brass"
      },
      "hash": "2a7d1eee",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "73f0cc79-068f-4e96-91ab-05c3914bacce",
      "kind": "stratagem",
      "name": "Draught of Terror",
      "det": "Daemonic Incursion",
      "ref": {
        "kind": "stratagem",
        "det": "daemonic-incursion",
        "name": "Draught of Terror"
      },
      "hash": "01c62e3b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "338e8c8f-7330-4a2e-bfe1-935e2556cbec",
      "kind": "stratagem",
      "name": "Archagonists",
      "det": "Legion of Excess",
      "ref": {
        "kind": "stratagem",
        "det": "legion-of-excess",
        "name": "Archagonists"
      },
      "hash": "994267d5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f2338ba8-00d6-45fc-8d14-fb29b2c437fe",
      "kind": "stratagem",
      "name": "Call to Murder",
      "det": "Lords of the Warp",
      "ref": {
        "kind": "stratagem",
        "det": "lords-of-the-warp",
        "name": "Call to Murder"
      },
      "hash": "83e4f304",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "af8aef17-a033-44a4-b8a9-d27ebff42e0c",
      "kind": "stratagem",
      "name": "Carnival of Excess",
      "det": "Lords of the Warp",
      "ref": {
        "kind": "stratagem",
        "det": "lords-of-the-warp",
        "name": "Carnival of Excess"
      },
      "hash": "347c0fce",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f88709cb-ae58-4672-8582-698049889c24",
      "kind": "stratagem",
      "name": "skirling magicks",
      "det": "Lords of the Warp",
      "ref": {
        "kind": "stratagem",
        "det": "lords-of-the-warp",
        "name": "skirling magicks"
      },
      "hash": "b50f6f98",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
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
      "sid": "9c8980e1-16a2-4d68-8fec-9837729498ff",
      "kind": "stratagem",
      "name": "Fever Visions",
      "det": "Plague Legion",
      "ref": {
        "kind": "stratagem",
        "det": "plague-legion",
        "name": "Fever Visions"
      },
      "hash": "5dc5e5dd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b3c2324d-a2fd-4bc4-aa88-48b0aedad96e",
      "kind": "stratagem",
      "name": "Murkshadows",
      "det": "Plague Legion",
      "ref": {
        "kind": "stratagem",
        "det": "plague-legion",
        "name": "Murkshadows"
      },
      "hash": "e69d6033",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 5,
          "when": {
            "en": "for a Normal move, while this stratagem is in force",
            "ru": "для Normal move, пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c404658f-f17a-4424-a4ae-14611998fe04",
      "kind": "stratagem",
      "name": "Pyrogenesis",
      "det": "Scintillating Legion",
      "ref": {
        "kind": "stratagem",
        "det": "scintillating-legion",
        "name": "Pyrogenesis"
      },
      "hash": "238794d3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": {
            "en": "if a Flux token was spent, instead (and +1 AP)",
            "ru": "если потрачен Flux token, вместо этого (и +1 AP)"
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
      "sid": "bd3b15c2-7884-42d4-8f6e-4b26b8956956",
      "kind": "stratagem",
      "name": "Channelled Wrath",
      "det": "Shadow Legion",
      "ref": {
        "kind": "stratagem",
        "det": "shadow-legion",
        "name": "Channelled Wrath"
      },
      "hash": "6b8351bc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
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
            "en": "also, for a KHORNE unit",
            "ru": "и ещё, для отряда KHORNE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2530f74b-95bf-4d53-99c7-7505a887c1cd",
      "kind": "stratagem",
      "name": "Death Denied",
      "det": "Shadow Legion",
      "ref": {
        "kind": "stratagem",
        "det": "shadow-legion",
        "name": "Death Denied"
      },
      "hash": "b5780266",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "391a8bbe-346e-47d2-8886-4e648889c1c0",
      "kind": "stratagem",
      "name": "Encroaching Darkness",
      "det": "Shadow Legion",
      "ref": {
        "kind": "stratagem",
        "det": "shadow-legion",
        "name": "Encroaching Darkness"
      },
      "hash": "41952609",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "f6dd7e2a-b033-4558-89a0-51739c18dcff",
      "kind": "stratagem",
      "name": "Spiteful Demise",
      "det": "Shadow Legion",
      "ref": {
        "kind": "stratagem",
        "det": "shadow-legion",
        "name": "Spiteful Demise"
      },
      "hash": "48189719",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:bloodcrushers",
      "kind": "wargear",
      "name": "Bloodcrushers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodcrushers",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:bloodcrushers",
      "kind": "wargear",
      "name": "Bloodcrushers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodcrushers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:bloodletters",
      "kind": "wargear",
      "name": "Bloodletters: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodletters",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:bloodletters",
      "kind": "wargear",
      "name": "Bloodletters: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodletters",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:daemonettes",
      "kind": "wargear",
      "name": "Daemonettes: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "daemonettes",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:daemonettes",
      "kind": "wargear",
      "name": "Daemonettes: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "daemonettes",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "80a80408-8489-4694-a5f4-72cf40036349:flesh-hounds",
      "kind": "wargear",
      "name": "Flesh Hounds: Collar of Khorne",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "flesh-hounds",
        "item": "collar of khorne"
      },
      "hash": "7b24f7e2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs Psychic Attacks)",
          "when": null
        }
      ]
    },
    {
      "sid": "e6a45e83-838d-4449-8bde-44b7e2c3e4ec:karanak",
      "kind": "wargear",
      "name": "Karanak: Brass Collar of Bloody Vengeance",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "karanak",
        "item": "brass collar of bloody vengeance"
      },
      "hash": "d5b6dfdf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        }
      ]
    },
    {
      "sid": "5579aa57-632e-42a7-a12a-7ebc8c69e24d:keeper-of-secrets",
      "kind": "wargear",
      "name": "Keeper of Secrets: Shining Aegis",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "keeper-of-secrets",
        "item": "shining aegis"
      },
      "hash": "2aa5c1c5",
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
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:pink-horrors",
      "kind": "wargear",
      "name": "Pink Horrors: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pink-horrors",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:pink-horrors",
      "kind": "wargear",
      "name": "Pink Horrors: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "pink-horrors",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:plague-drones",
      "kind": "wargear",
      "name": "Plague Drones: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plague-drones",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:plague-drones",
      "kind": "wargear",
      "name": "Plague Drones: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plague-drones",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:plaguebearers",
      "kind": "wargear",
      "name": "Plaguebearers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plaguebearers",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:plaguebearers",
      "kind": "wargear",
      "name": "Plaguebearers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plaguebearers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:seekers",
      "kind": "wargear",
      "name": "Seekers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "seekers",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:seekers",
      "kind": "wargear",
      "name": "Seekers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "seekers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}
