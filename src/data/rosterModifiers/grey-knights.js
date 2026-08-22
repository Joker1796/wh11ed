// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "grey-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "ed4a222f-7ed6-4e9d-b310-0cb08a3c4906",
      "kind": "detachmentRule",
      "name": "Channelled Force",
      "det": "Banishers",
      "ref": {
        "kind": "detachmentRule",
        "det": "banishers"
      },
      "hash": "5abc516f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "while that Leadership test was passed and this rule was the one selected",
            "ru": "пока пройден тест Leadership и выбрано именно это правило"
          },
          "cond": [
            "channelled-sustained"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "while that Leadership test was passed and this rule was the one selected",
            "ru": "пока пройден тест Leadership и выбрано именно это правило"
          },
          "cond": [
            "channelled-lethal"
          ]
        }
      ]
    },
    {
      "sid": "a2c33cb8-a90f-427a-b1b2-7f15b0207e36",
      "kind": "detachmentRule",
      "name": "Mailed Fist",
      "det": "Sanctic Spearhead",
      "ref": {
        "kind": "detachmentRule",
        "det": "sanctic-spearhead"
      },
      "hash": "102c3a47",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time that unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "until the end of the turn in which that unit Advanced",
            "ru": "до конца хода, в котором юнит совершил Advance"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "5ab1864a-e524-4b61-977f-1a0c81e33caa",
      "kind": "enhancement",
      "name": "Grimoire of Conjunctions",
      "det": "Augurium Task Force",
      "hash": "0fb47ae2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 4,
          "when": {
            "en": "once per battle, for the Fight phase the bearer uses this Enhancement in",
            "ru": "один раз за битву, на фазу боя, в которой носитель применил улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "augurium-task-force"
      }
    },
    {
      "sid": "f5d9692e-4936-4beb-8936-4c26089d74d5",
      "kind": "enhancement",
      "name": "Shield of Prophecy",
      "det": "Augurium Task Force",
      "hash": "b0275bc1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 2,
          "when": {
            "en": "once per battle, for the battle round the bearer uses this Enhancement in",
            "ru": "один раз за битву, на раунд, в котором носитель применил улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "augurium-task-force"
      }
    },
    {
      "sid": "a4dda913-e9d9-496e-8c10-fcb30949276e",
      "kind": "enhancement",
      "name": "Sixty-sixth Seal",
      "det": "Banishers",
      "hash": "898eb4bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in your Shooting phase, for models in the bearer's unit",
            "ru": "в вашей фазе стрельбы, для моделей в отряде носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "banishers"
      }
    },
    {
      "sid": "3c84e9b3-44f8-4af4-bb0f-34a1a34f5944",
      "kind": "enhancement",
      "name": "Tome of Forbidden Ways",
      "det": "Brotherhood Strike",
      "hash": "5e8b3871",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "brotherhood-strike"
      }
    },
    {
      "sid": "057f85bb-3dff-4710-9cad-85ebb9cd2e9a",
      "kind": "enhancement",
      "name": "Purifying Force",
      "det": "Crowe’s Sanctifiers",
      "ref": null,
      "hash": "e9618825",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "once per battle, when this unit is selected to fight after making a charge move",
            "ru": "раз за битву, когда юнит выбран для боя после charge-перемещения"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "880712dd-e7d0-4140-8b54-c7d395724841",
      "kind": "enhancement",
      "name": "Boons of Deimos (Upgrade)",
      "det": "Fires of Purgation",
      "ref": {
        "kind": "enhancement",
        "det": "fires-of-purgation"
      },
      "hash": "05162876",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "de7be923-5642-4bf5-b8da-1ad373303f47",
      "kind": "enhancement",
      "name": "Sanctic Reaper",
      "det": "Hallowed Conclave",
      "hash": "4c478233",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hallowed-conclave"
      }
    },
    {
      "sid": "be02d133-6751-4ea3-b302-4630469a0d4d",
      "kind": "enhancement",
      "name": "Mandulian Reliquary",
      "det": "Warpbane Task Force",
      "hash": "88c734a9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while the bearer's unit is not Battle-shocked",
            "ru": "пока отряд носителя не Battle-shocked"
          },
          "cond": [
            "unit-not-battle-shocked"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warpbane-task-force"
      }
    },
    {
      "sid": "e3ead97e-e27b-44e0-b925-95a9551416f9",
      "kind": "enhancement",
      "name": "Radiant Champion",
      "det": "Warpbane Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "warpbane-task-force"
      },
      "hash": "be39ba82",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    }
  ]
}
