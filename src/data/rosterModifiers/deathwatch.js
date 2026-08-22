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
      "reviewed": false,
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
      "reviewed": false,
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
      "reviewed": false,
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
      "reviewed": false,
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
      "reviewed": false,
      "effects": []
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
      "reviewed": false,
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
      "reviewed": false,
      "effects": []
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
    }
  ]
}
