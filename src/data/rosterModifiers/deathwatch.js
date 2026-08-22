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
      "sid": "e3298082-60c4-4834-8517-1b6f7ee5b751:deathwatch-terminator-squad",
      "kind": "ability",
      "name": "Deathwatch Terminator Squad: Terminatus Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwatch-terminator-squad"
      },
      "hash": "ae3dab91",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:deathwatch-veterans",
      "kind": "ability",
      "name": "Deathwatch Veterans: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwatch-veterans"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "95f007e6-3ff6-4664-ab65-a2d04760db65:decimus-kill-team",
      "kind": "ability",
      "name": "Decimus Kill Team: Death to the Alien",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "decimus-kill-team"
      },
      "hash": "a5dbf863",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ed98732d-4188-443f-8b9b-ddb871e4c42b:fortis-kill-team",
      "kind": "ability",
      "name": "Fortis Kill Team: Fortis Doctrines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fortis-kill-team"
      },
      "hash": "d60e7763",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2c832c1b-ec9d-4a4b-aa4c-0e2e4acef695:indomitor-kill-team",
      "kind": "ability",
      "name": "Indomitor Kill Team: Indomitor Doctrines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "indomitor-kill-team"
      },
      "hash": "a7989745",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
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
          "value": 2,
          "when": {
            "en": "in a turn it made a Charge move",
            "ru": "в ходу, когда отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "4d61f752-09f3-429a-9564-f0728c12e1df:talonstrike-kill-team",
      "kind": "ability",
      "name": "Talonstrike Kill Team: Talonstrike Doctrines",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "talonstrike-kill-team"
      },
      "hash": "4722aec2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "until the end of the turn it was set up on the battlefield",
            "ru": "до конца хода, в котором отряд был выставлен на стол"
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
            "en": "until the end of the turn it was set up on the battlefield",
            "ru": "до конца хода, в котором отряд был выставлен на стол"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ]
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
      "sid": "5e321f4d-a733-4459-94f8-e4bc2a472f38",
      "kind": "detachmentRule",
      "name": "Mission Tactics",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "black-spear-task-force"
      },
      "hash": "5b885a9a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while Furor Tactics is the active Mission Tactic",
            "ru": "пока активна тактика Furor"
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
            "en": "while Malleus Tactics is the active Mission Tactic",
            "ru": "пока активна тактика Malleus"
          },
          "cond": [
            "tactic-malleus"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while Purgatus Tactics is active, on a Critical Hit",
            "ru": "пока активна тактика Purgatus, при критическом попадании"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "796172d3-0693-4e71-a27d-51e9db6bfdca",
      "kind": "enhancement",
      "name": "Thief of Secrets",
      "det": "Black Spear Task Force",
      "hash": "755481e6",
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
          "stat": "d",
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
            "en": "Strength, Damage and AP improve by 2 instead, until the end of the battle, once the bearer has destroyed a model in melee",
            "ru": "сила, урон и пробитие улучшаются на 2 вместо 1 до конца битвы, если носитель уничтожил модель в ближнем бою"
          },
          "cond": [
            "unit-destroyed-model-melee"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 2,
          "cond": [
            "unit-destroyed-model-melee"
          ],
          "alt": 1,
          "when": {
            "en": "Strength, Damage and AP improve by 2 instead, until the end of the battle, once the bearer has destroyed a model in melee",
            "ru": "сила, урон и пробитие улучшаются на 2 вместо 1 до конца битвы, если носитель уничтожил модель в ближнем бою"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "cond": [
            "unit-destroyed-model-melee"
          ],
          "alt": 2,
          "when": {
            "en": "Strength, Damage and AP improve by 2 instead, until the end of the battle, once the bearer has destroyed a model in melee",
            "ru": "сила, урон и пробитие улучшаются на 2 вместо 1 до конца битвы, если носитель уничтожил модель в ближнем бою"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "black-spear-task-force"
      }
    },
    {
      "sid": "f9014833-77c7-421f-beba-23e55d2d337e",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "18809fe3-6bbd-4c57-8599-9f04aa58b766",
      "kind": "stratagem",
      "name": "Dragonfire Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Dragonfire Rounds"
      },
      "hash": "c741719e",
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
        },
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
      "sid": "62d34323-045f-4824-a552-b38c9d99ff65",
      "kind": "stratagem",
      "name": "Hellfire Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Hellfire Rounds"
      },
      "hash": "8b4495a9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": {
            "en": "excluding Devastating Wounds weapons",
            "ru": "кроме оружия с Devastating Wounds"
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 5+",
          "when": {
            "en": "excluding Devastating Wounds weapons",
            "ru": "кроме оружия с Devastating Wounds"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "827e649e-0dca-4aa4-8e17-4f304a8fd83d",
      "kind": "stratagem",
      "name": "Kraken Rounds",
      "det": "Black Spear Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "black-spear-task-force",
        "name": "Kraken Rounds"
      },
      "hash": "22355a50",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
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
      "sid": "7b6f34d2-cadf-4b4b-83ca-343026d55249:deathwatch-terminator-squad",
      "kind": "wargear",
      "name": "Deathwatch Terminator Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwatch-terminator-squad",
        "item": "storm shield"
      },
      "hash": "38451d6c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "4",
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
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:deathwatch-veterans",
      "kind": "wargear",
      "name": "Deathwatch Veterans: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwatch-veterans",
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
      "sid": "bd82612d-1cc5-4408-bcdb-43affb04b068:decimus-kill-team",
      "kind": "wargear",
      "name": "Decimus Kill Team: Astartes shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "decimus-kill-team",
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
    }
  ]
}
