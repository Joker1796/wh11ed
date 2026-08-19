// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "emperors-children",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "3d5902bd-a800-4b2e-a1c2-1bb1f3d544ed",
      "kind": "detachmentRule",
      "name": "Sensational Performance",
      "det": "Court of the Phoenician",
      "hash": "89d4535f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "court-of-the-phoenician"
      }
    },
    {
      "sid": "4dd6dec8-03dc-4b0a-919a-b00c3c34f726",
      "kind": "enhancement",
      "name": "Dark Blessings",
      "det": "Carnival of Excess",
      "hash": "cd86219a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "once per battle, for the phase, after an enemy unit selects its targets",
            "ru": "один раз за битву, на фазу, после того как вражеский отряд выбрал цели"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      }
    },
    {
      "sid": "efd6eed5-0e4d-48be-bb5e-adeb57d9e386",
      "kind": "enhancement",
      "name": "Possessed Blade",
      "det": "Carnival of Excess",
      "hash": "9f4082d7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "one melee weapon of the bearer, selected at the start of the battle",
            "ru": "одно оружие ближнего боя носителя, выбранное в начале битвы"
          }
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "that same weapon, for the fight the bearer uses this Enhancement in",
            "ru": "то же оружие, на бой, в котором носитель применил улучшение"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      }
    },
    {
      "sid": "739f0185-c80c-4793-8479-1d28bbad8a25",
      "kind": "enhancement",
      "name": "Pledge of Dark Glory",
      "det": "Coterie of the Conceited",
      "hash": "c335f5f1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "coterie-of-the-conceited"
      }
    },
    {
      "sid": "cff5cb21-f229-467b-bbd6-faf82240043b",
      "kind": "enhancement",
      "name": "Spiritsliver",
      "det": "Court of the Phoenician",
      "hash": "2923caab",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "court-of-the-phoenician"
      }
    },
    {
      "sid": "4d0851fe-8c7b-4423-b688-916ad670d63e",
      "kind": "enhancement",
      "name": "Steeped in Suffering",
      "det": "Mercurial Host",
      "hash": "9e1c1938",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "mercurial-host"
      }
    },
    {
      "sid": "75e69566-9f5c-408f-8780-7581588e4710",
      "kind": "enhancement",
      "name": "Distortion",
      "det": "Peerless Bladesmen",
      "hash": "c0ee925e",
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "peerless-bladesmen"
      }
    },
    {
      "sid": "81c3ada4-c8c2-4493-948d-ac3e1d4838a0",
      "kind": "enhancement",
      "name": "Proud and Vainglorious",
      "det": "Slaanesh’s Chosen",
      "hash": "082e8442",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer's unit is your army's Favoured Champions",
            "ru": "пока отряд носителя — Favoured Champions вашей армии"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      }
    },
    {
      "sid": "5b2cfa1f-d5ff-4096-a600-0edf9c647213",
      "kind": "enhancement",
      "name": "Slayer of Champions",
      "det": "Slaanesh’s Chosen",
      "hash": "dd60b2c1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per attack against a Character unit",
            "ru": "за атаку по отряду Character"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack against a Character unit",
            "ru": "за атаку по отряду Character"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      }
    }
  ]
}
