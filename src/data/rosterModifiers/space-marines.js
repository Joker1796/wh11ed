// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "space-marines",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "15c0488f-a9ec-4288-a4c4-7bfba664628b",
      "kind": "allegiance",
      "name": "Headhunter Task Force Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "headhunter-task-force-keywords",
        "opt": "Character"
      },
      "hash": "958d34d8",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
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
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — one Chapter per army and its exclusions"
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
      "sid": "8102e3e2-4887-44d1-a3ca-a40599dffed2",
      "kind": "detachmentRule",
      "name": "Indomitable Resolve",
      "det": "Assault Force",
      "ref": null,
      "hash": "e1c85f08",
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
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Entrenched",
          "when": {
            "en": "while the unit is within a terrain feature, was not set up this turn and no model moved more than 3\"",
            "ru": "пока юнит находится в элементе ландшафта, не был выставлен в этом ходу и ни одна модель не прошла больше 3\""
          },
          "cond": [
            "never"
          ]
        }
      ]
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "825579c0-e887-4d56-926e-8fea38953997",
      "kind": "detachmentRule",
      "name": "Target Sighted",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "headhunter-task-force"
      },
      "hash": "4f08e2fa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time that TANK ACE unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит TANK ACE совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5f85515e-c438-4f69-9b46-e1235fa5b934",
      "kind": "detachmentRule",
      "name": "Psychic Disciplines",
      "det": "Librarius Conclave",
      "ref": {
        "kind": "detachmentRule",
        "det": "librarius-conclave"
      },
      "hash": "569c6dad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while the Biomancy Discipline is the one selected this battle round",
            "ru": "пока в этом раунде выбрана дисциплина Biomancy"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while the Pyromancy Discipline is selected, against an enemy unit within 12\"",
            "ru": "пока выбрана дисциплина Pyromancy, против отряда противника в пределах 12\""
          },
          "cond": [
            "never"
          ]
        }
      ]
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      }
    },
    {
      "sid": "3fc43d3f-e342-4c47-be47-b988e604f8f9",
      "kind": "enhancement",
      "name": "Architect of War",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "enhancement",
        "det": "anvil-siege-force"
      },
      "hash": "224d2ea9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "1816609d-be8c-4b19-bf30-7b04cf8d4536",
      "kind": "enhancement",
      "name": "Shock Deployment",
      "det": "Armoured Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-speartip"
      },
      "hash": "bd5d10fa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "in your Shooting phase, if the unit disembarked from a Transport this turn",
            "ru": "в вашей фазе стрельбы, если отряд высадился из Transport в этом ходу"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "df54e4af-9023-4a38-ba72-88a7b7be921e",
      "kind": "enhancement",
      "name": "Battle-line Veterans",
      "det": "Assault Force",
      "ref": null,
      "hash": "1b0678c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": {
            "en": "the unit's bolt rifle weapons only",
            "ru": "только для оружия bolt rifle в этом юните"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "note": "names one weapon by name, a subset of the table this format cannot single out"
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
      "sid": "f80a835c-9d3f-424c-b3f6-39b1b9c38b0d",
      "kind": "enhancement",
      "name": "Eye of the Primarch",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "134941ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "the bearer and Battleline models in its unit only",
            "ru": "только носитель и модели Battleline в его отряде"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
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
          },
          "cond": [
            "unit-leading"
          ]
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
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "doctrine-assault"
          ],
          "alt": 1,
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
      "sid": "bc002275-58b6-41cf-ac7c-df522aecec69",
      "kind": "enhancement",
      "name": "Veteran of Behemoth",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "a2c93f37",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "2b58efe2-2d62-4b7b-a0df-6e65bf3193ce",
      "kind": "enhancement",
      "name": "Spy-skull Data Link",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "enhancement",
        "det": "ceramite-sentinels"
      },
      "hash": "b05ef11e",
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "never"
          ]
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
          "when": null,
          "only": {
            "tag": "TORRENT"
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
      "sid": "d3be1512-5719-483c-98c8-bda76a604897",
      "kind": "enhancement",
      "name": "Fire Discipline",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "a2c93f37",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
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
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "doctrine-assault"
          ],
          "alt": 1,
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-avernii"
      }
    },
    {
      "sid": "8b00b0ce-52cd-46a3-9adb-b39c5dc2058c",
      "kind": "enhancement",
      "name": "Astartes Tank Ace (Aura)",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "headhunter-task-force"
      },
      "hash": "42cab643",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "in your Shooting phase, while within 6\" of the bearer",
            "ru": "в вашей фазе стрельбы, пока в пределах 6\" от носителя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6e9bfaba-0954-4037-806b-32af5791e117",
      "kind": "enhancement",
      "name": "Firestorm Coordinators",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "headhunter-task-force"
      },
      "hash": "c8776897",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
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
      "sid": "d8f14666-8a59-43cf-ab2e-ae009229be08",
      "kind": "enhancement",
      "name": "Target Augury Web",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "19e261ff",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "2906828f-8819-4b4d-a17a-5e0960a74000",
      "kind": "enhancement",
      "name": "Hunter’s Eye",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      },
      "hash": "c21119aa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
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
          },
          "cond": [
            "unit-charged"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "cond": [
            "unit-charged"
          ],
          "alt": 1,
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
          },
          "cond": [
            "unit-charged"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "cond": [
            "unit-charged"
          ],
          "alt": 1,
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
