// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
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
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in the Fight phase, if the unit made a Charge move this turn",
            "ru": "в фазе боя, если юнит совершил чардж в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
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
          },
          "cond": [
            "never"
          ]
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
          },
          "cond": [
            "blocked-weapon"
          ]
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "that same weapon, for the fight the bearer uses this Enhancement in",
            "ru": "то же оружие, на бой, в котором носитель применил улучшение"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      }
    },
    {
      "sid": "f8a976fd-eb1b-401d-8b99-50155fb04f4c",
      "kind": "enhancement",
      "name": "Warp Walker",
      "det": "Carnival of Excess",
      "ref": {
        "kind": "enhancement",
        "det": "carnival-of-excess"
      },
      "hash": "048159c1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time the bearer's unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит носителя совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "coterie-of-the-conceited"
      }
    },
    {
      "sid": "533b3db0-dd34-4863-84a7-bcd2eff86ea4",
      "kind": "enhancement",
      "name": "Exalted Patron",
      "det": "Court of the Phoenician",
      "ref": {
        "kind": "enhancement",
        "det": "court-of-the-phoenician"
      },
      "hash": "cdc77255",
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
      "sid": "364cea95-8b5d-480c-930c-22d543f96013",
      "kind": "enhancement",
      "name": "Cacophonic Accompaniment",
      "det": "Elegant Brutes",
      "ref": {
        "kind": "enhancement",
        "det": "elegant-brutes"
      },
      "hash": "743a6cea",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ],
      "note": "the Deep Strike in the first bullet is an ability, not a keyword or a weapon tag — nothing on the card carries it"
    },
    {
      "sid": "7949eef1-dbe1-42e6-9742-e18fea8532fe",
      "kind": "enhancement",
      "name": "Frenzied Ferocity (Upgrade)",
      "det": "Elegant Brutes",
      "ref": {
        "kind": "enhancement",
        "det": "elegant-brutes"
      },
      "hash": "805adba2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
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
      "sid": "b26e88ce-98ee-401d-a5c3-f12564e770e4",
      "kind": "enhancement",
      "name": "Eager to Prove",
      "det": "Slaanesh’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      },
      "hash": "964490da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while the bearer's unit is your army's Favoured Champions",
            "ru": "пока юнит носителя — Favoured Champions вашей армии"
          },
          "cond": [
            "unit-favoured-champions"
          ]
        }
      ]
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
          },
          "cond": [
            "unit-favoured-champions"
          ]
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
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack against a Character unit",
            "ru": "за атаку по отряду Character"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "slaaneshs-chosen"
      }
    }
  ]
}
