// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "deathwatch",
  "formatVersion": 1,
  "entries": [
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
            "blocked-alternate"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "black-spear-task-force"
      }
    }
  ]
}
