// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "grey-knights",
  "formatVersion": 1,
  "entries": [
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
          }
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
          }
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
          }
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
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warpbane-task-force"
      }
    }
  ]
}
