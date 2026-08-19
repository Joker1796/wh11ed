// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "space-marines",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "7fad0617-e2d1-4607-bfd1-e736ed2660a5",
      "kind": "armyRule",
      "name": "Oath of Moment",
      "det": null,
      "hash": "87451b53",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "9a87c430-019b-49f6-b70a-278e0a8169d5",
      "kind": "armyRule",
      "name": "Space Marine Chapters",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "0dba42cb",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "abc5a0da-6e22-42fc-8e98-e53976b3caab",
      "kind": "detachmentRule",
      "name": "Shield of the Imperium",
      "det": "Anvil Siege Force",
      "hash": "1a020a37",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "anvil-siege-force"
      }
    },
    {
      "sid": "f8714ccf-244f-44c5-aaac-9dc11b404038",
      "kind": "detachmentRule",
      "name": "Adaptive Defence",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "detachmentRule",
        "det": "ceramite-sentinels"
      },
      "hash": "0500502c",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "e8f365fd-9e58-4321-a78c-ed2e9c1e64de",
      "kind": "detachmentRule",
      "name": "Close-range Eradication",
      "det": "Firestorm Assault Force",
      "hash": "41ee2aa2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per ranged attack against a unit within 12\"",
            "ru": "за стрелковую атаку по отряду в пределах 12\""
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "firestorm-assault-force"
      }
    },
    {
      "sid": "3d216f9e-1d03-4dcb-ada4-872c519261bc",
      "kind": "detachmentRule",
      "name": "Vulkan’s Quest",
      "det": "Forgefather’s Seekers",
      "hash": "41ee2aa2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per ranged attack against a unit within 12\"",
            "ru": "за стрелковую атаку по отряду в пределах 12\""
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "fa8c2bcd-8194-4017-b12b-b7eed35cc993",
      "kind": "detachmentRule",
      "name": "Oath of Reclamation",
      "det": "Reclamation Force",
      "hash": "09be5f9e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per melee attack against a unit within range of an objective marker",
            "ru": "за атаку ближнего боя по отряду в радиусе маркера цели"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "reclamation-force"
      }
    },
    {
      "sid": "c8f28a58-eefa-4c34-94e8-5dbf475724b0",
      "kind": "enhancement",
      "name": "Rites of War",
      "det": "1st Company Task Force",
      "hash": "1f954fcf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      }
    },
    {
      "sid": "0d51b8da-5971-4be9-88f9-635033ca3cfe",
      "kind": "enhancement",
      "name": "The Imperium’s Sword",
      "det": "1st Company Task Force",
      "hash": "e6657e96",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      }
    },
    {
      "sid": "df54e4af-9023-4a38-ba72-88a7b7be921e",
      "kind": "enhancement",
      "name": "Battle-line Veterans",
      "det": "Assault Force",
      "ref": null,
      "hash": "1b0678c4",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "eaac3c39-f06a-476a-acae-7993c8c45b38",
      "kind": "enhancement",
      "name": "Blades of Valour",
      "det": "Bastion Task Force",
      "hash": "e3dec843",
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
        "det": "bastion-task-force"
      }
    },
    {
      "sid": "6bb6e923-c0f4-4e50-a6a8-876df81e1f6b",
      "kind": "enhancement",
      "name": "Bombast Omnivox",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "04462659",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1b46835e-a785-4a31-8f8f-a80b27136279",
      "kind": "enhancement",
      "name": "Hero of the Chapter",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "c7be8767",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          }
        }
      ]
    },
    {
      "sid": "ee406f75-ff0d-48fa-a912-668b94840822",
      "kind": "enhancement",
      "name": "Oath of Macragge",
      "det": "Blade of Ultramar",
      "hash": "647d8d4c",
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
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      }
    },
    {
      "sid": "8d56caf6-2966-40b2-814f-00bac4e11b27",
      "kind": "enhancement",
      "name": "Champion of the Feast",
      "det": "Emperor’s Shield",
      "hash": "e7316e39",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "emperors-shield"
      }
    },
    {
      "sid": "8b050852-d91a-4314-8f89-1403beea564a",
      "kind": "enhancement",
      "name": "Disciple of Rhetoricus",
      "det": "Emperor’s Shield",
      "hash": "d4cde193",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "emperors-shield"
      }
    },
    {
      "sid": "28a17ead-dfe3-4bb6-b02e-52c329cce8a2",
      "kind": "enhancement",
      "name": "War-tempered Artifice",
      "det": "Firestorm Assault Force",
      "hash": "449263c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "firestorm-assault-force"
      }
    },
    {
      "sid": "9eb575db-8984-49c8-a8e2-9f13a038c625",
      "kind": "enhancement",
      "name": "Immolator",
      "det": "Forgefather’s Seekers",
      "hash": "aaa5b911",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Torrent weapons of models in the bearer's unit only",
            "ru": "только оружие Torrent моделей в отряде носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "b1a004c8-5ca5-41af-a576-9ded975ec820",
      "kind": "enhancement",
      "name": "War-tempered Artifice",
      "det": "Forgefather’s Seekers",
      "hash": "449263c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "83b8281f-2251-4981-a7e7-1a1ce57ef483",
      "kind": "enhancement",
      "name": "Raptorial Cogitator Core (Upgrade)",
      "det": "Fulguris Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "fulguris-task-force"
      },
      "hash": "c09e0fa5",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "57200c62-5d47-4622-a062-41e1bc1241c9",
      "kind": "enhancement",
      "name": "The Honour Vehement",
      "det": "Gladius Task Force",
      "hash": "647d8d4c",
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
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      }
    },
    {
      "sid": "50598313-52b9-4408-a99e-16314a65b1f3",
      "kind": "enhancement",
      "name": "Iron Laurel",
      "det": "Hammer of Avernii",
      "hash": "c16af735",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-avernii"
      }
    },
    {
      "sid": "9f0aeadd-6d2b-4f0c-9e01-f66bf23e074d",
      "kind": "enhancement",
      "name": "Spiritus Ferrum",
      "det": "Hammer of Avernii",
      "hash": "e6657e96",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-avernii"
      }
    },
    {
      "sid": "fb42248c-8de6-42bb-a457-555e04ae072f",
      "kind": "enhancement",
      "name": "Redoubtable Machine Spirit",
      "det": "Headhunter Task Force",
      "hash": "34b736df",
      "ver": 925,
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
      "ref": {
        "kind": "enhancement",
        "det": "headhunter-task-force"
      }
    },
    {
      "sid": "fb962a7a-73f1-4fa3-a5a8-8d31419e40c2",
      "kind": "enhancement",
      "name": "Seals of Reconquest",
      "det": "Reclamation Force",
      "hash": "8875c16b",
      "ver": 925,
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
      "ref": {
        "kind": "enhancement",
        "det": "reclamation-force"
      }
    },
    {
      "sid": "d72f263b-8ee5-4f71-b46d-7142f2e7e234",
      "kind": "enhancement",
      "name": "Spearpoint Paragon",
      "det": "Spearpoint Task Force",
      "hash": "1ce3d73b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
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
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      }
    },
    {
      "sid": "8b881334-b47a-4003-8180-10a83f4e619c",
      "kind": "enhancement",
      "name": "Fury of the Storm",
      "det": "Stormlance Task Force",
      "hash": "1db2008b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
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
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "stormlance-task-force"
      }
    }
  ]
}
