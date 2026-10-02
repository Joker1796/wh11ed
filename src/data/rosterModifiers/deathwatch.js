// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "deathwatch",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "1a965117-329d-4465-b439-e41eeb5f533c:indomitor-kill-team",
      "kind": "ability",
      "name": "Indomitor Kill Team: Indomitor Doctrines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "indomitor-kill-team"
      },
      "hash": "ffc97976",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against the closest eligible target",
            "ru": "против ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "043c08da-5ba7-4ed9-9ca5-6a0fc1f3aec9:talonstrike-kill-team",
      "kind": "ability",
      "name": "Talonstrike Kill Team: Talonstrike Doctrines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "talonstrike-kill-team"
      },
      "hash": "525aa0f8",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in a turn this unit was set up on the battlefield",
            "ru": "в ходу, в котором отряд был выставлен на поле боя"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "in a turn this unit was set up on the battlefield",
            "ru": "в ходу, в котором отряд был выставлен на поле боя"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ]
    },
    {
      "sid": "c983ef72-fd33-4ba2-8824-3ed2aaf0cddc:watch-captain-artemis",
      "kind": "ability",
      "name": "Watch Captain Artemis: Tactical Instinct",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "watch-captain-artemis"
      },
      "hash": "38355f6d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "2dfe171f-2a81-413a-8c5e-50b8be7e4553:watch-master",
      "kind": "ability",
      "name": "Watch Master: Strategic Knowledge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "watch-master"
      },
      "hash": "7ce42759",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "db9ab7c9-e1c1-4e60-acde-fb9505fbd81d",
      "kind": "armyRule",
      "name": "Combat Doctrines",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4b1af9f6",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while the Devastator Doctrine is active for this unit",
            "ru": "пока для отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        }
      ]
    },
    {
      "sid": "89b1a46b-b282-4347-96f2-193f406ccd56",
      "kind": "detachmentRule",
      "name": "Mission Tactics",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "black-spear-task-force"
      },
      "hash": "de2bcfe8",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "Furor Tactics: while the Devastator Doctrine is active for this unit",
            "ru": "Furor Tactics: пока для отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "Malleus Tactics: while the Tactical Doctrine is active for this unit",
            "ru": "Malleus Tactics: пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "Purgatus Tactics: while the Assault Doctrine is active for this unit, against targets within 9\"",
            "ru": "Purgatus Tactics: пока для отряда активна Assault Doctrine, по целям в пределах 9\""
          },
          "cond": [
            "doctrine-assault",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7007a7ca-a403-49d5-a776-bdd875d3ca45",
      "kind": "detachmentRule",
      "name": "Mission Tactics",
      "det": "Deathwatch Support",
      "ref": {
        "kind": "detachmentRule",
        "det": "deathwatch-support"
      },
      "hash": "32dae29c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "Furor Tactics: while the Devastator Doctrine is active for this unit",
            "ru": "Furor Tactics: пока для отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "Malleus Tactics: while the Tactical Doctrine is active for this unit",
            "ru": "Malleus Tactics: пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "Purgatus Tactics: while the Assault Doctrine is active for this unit, against targets within 9\"",
            "ru": "Purgatus Tactics: пока для отряда активна Assault Doctrine, по целям в пределах 9\""
          },
          "cond": [
            "doctrine-assault",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d6434703-aa58-4aa2-ba89-1d5b7404f16a",
      "kind": "enhancement",
      "name": "Osseus Key (Aura)",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "black-spear-task-force"
      },
      "hash": "41fdc52b",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f7a3bbc4-2349-42f8-98c7-0084d9b68e5f",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "581dadee-5a9e-48fb-8613-2691b9ba8c0d",
      "kind": "stratagem",
      "name": "Dragonfire Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Dragonfire Rounds"
      },
      "hash": "7c882a94",
      "ver": 963,
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
      "sid": "4edff0f6-7aa7-49ac-a2db-8314ab7374cb",
      "kind": "stratagem",
      "name": "Hellfire Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Hellfire Rounds"
      },
      "hash": "c574e5b3",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-NON-VEHICLE 4+",
          "only": {
            "notTag": "DEVASTATING WOUNDS"
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
      "sid": "262a62fc-f671-4cee-ac0a-7f2064ed330b",
      "kind": "stratagem",
      "name": "Kraken Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Kraken Rounds"
      },
      "hash": "72b2fa33",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "s",
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
      "sid": "d98cf607-5f08-40cb-9674-2b5136ce38c6",
      "kind": "stratagem",
      "name": "Site-To-Site Teleportation",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Site-To-Site Teleportation"
      },
      "hash": "00ed1997",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": {
            "en": "if your unit has KILL TEAM, until the end of your next Movement phase",
            "ru": "если у отряда есть KILL TEAM, до конца вашей следующей фазы движения"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "round"
    },
    {
      "sid": "86ab446f-83b5-4c9f-98ce-ecda28c05eb3",
      "kind": "stratagem",
      "name": "Dragonfire Rounds",
      "det": "Deathwatch Support",
      "ref": {
        "kind": "stratagem",
        "det": "deathwatch-support",
        "name": "Dragonfire Rounds"
      },
      "hash": "7c882a94",
      "ver": 963,
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
      "sid": "e46e8583-dbd5-424d-9b58-30bcbcc131b9",
      "kind": "stratagem",
      "name": "Hellfire Rounds",
      "det": "Deathwatch Support",
      "ref": {
        "kind": "stratagem",
        "det": "deathwatch-support",
        "name": "Hellfire Rounds"
      },
      "hash": "c574e5b3",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-NON-VEHICLE 4+",
          "only": {
            "notTag": "DEVASTATING WOUNDS"
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
      "sid": "33ffd159-0227-4b14-a504-7452ad364393:deathwatch-terminator-squad",
      "kind": "wargear",
      "name": "Deathwatch Terminator Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwatch-terminator-squad",
        "item": "storm shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    }
  ]
}
