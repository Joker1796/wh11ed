// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "tau-empire",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "f601afd5-17dd-4110-bd95-ad2a8da3959e",
      "kind": "armyRule",
      "name": "Drones",
      "det": null,
      "hash": "afe18cdf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if the model was upgraded with a Shield Drone",
            "ru": "если модель улучшена дроном-щитом (Shield Drone)"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "2206b8e8-8ebc-4747-9bd3-6b44ccb32ff0",
      "kind": "armyRule",
      "name": "Drones",
      "det": null,
      "hash": "e80ed40e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if the model was upgraded with a Shield Drone",
            "ru": "если модель улучшена дроном-щитом (Shield Drone)"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "bb8da155-0303-4f4a-a3a2-167a82ad3f97",
      "kind": "armyRule",
      "name": "For the Greater Good",
      "det": null,
      "hash": "88370fd8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "per attack by a Guided unit against a Spotted unit",
            "ru": "за атаку отряда Guided по отряду Spotted"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "36cc4fa4-cc15-41f2-9d47-14e2550579ea",
      "kind": "armyRule",
      "name": "For the Greater Good",
      "det": null,
      "hash": "206e56d8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "per attack by a Guided unit against a Spotted unit",
            "ru": "за атаку отряда Guided по отряду Spotted"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "227283db-9c12-4439-a0e6-bfa6c2ac0644",
      "kind": "detachmentRule",
      "name": "Hunter’s Instincts",
      "det": "Kroot Hunting Pack",
      "hash": "6b5488c9",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "kroot-hunting-pack"
      }
    },
    {
      "sid": "54301b08-2777-45b6-856c-3cda0d13bb17",
      "kind": "detachmentRule",
      "name": "Skirmish Fighters",
      "det": "Kroot Hunting Pack",
      "hash": "7e1866de",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "Kroot models: 5+ against ranged attacks, 6+ against melee attacks",
            "ru": "модели Kroot: 5+ против стрелковых атак, 6+ против атак ближнего боя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "kroot-hunting-pack"
      }
    },
    {
      "sid": "b7f0dc14-9ef7-4228-9162-ce5dcb921fc9",
      "kind": "detachmentRule",
      "name": "Bonded Heroes",
      "det": "Retaliation Cadre",
      "hash": "e52012f0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Battlesuit models, per ranged attack against a unit within 12\"",
            "ru": "модели Battlesuit, за стрелковую атаку по отряду в пределах 12\""
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
            "en": "Battlesuit models, per ranged attack against a unit within 8\"",
            "ru": "модели Battlesuit, за стрелковую атаку по отряду в пределах 8\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "retaliation-cadre"
      }
    },
    {
      "sid": "7c538bba-1367-4adc-b54b-bea749daa8a5",
      "kind": "enhancement",
      "name": "Precision of the Patient Hunter",
      "det": "Kauyon",
      "hash": "d907baa7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "kauyon"
      }
    },
    {
      "sid": "7e5ea128-b5a8-4540-b84b-6b74bca2da44",
      "kind": "enhancement",
      "name": "Nomadic Hunter",
      "det": "Kroot Hunting Pack",
      "ref": {
        "kind": "enhancement",
        "det": "kroot-hunting-pack"
      },
      "hash": "ea99c260",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "1ff1cc2a-ba28-4e1b-aee4-78c67b35a4de",
      "kind": "enhancement",
      "name": "Strategic Conqueror",
      "det": "Mont’ka",
      "hash": "c6114053",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while within range of the objective marker selected at the start of the battle and the bearer is on the battlefield",
            "ru": "пока модель в радиусе выбранного в начале битвы маркера, а носитель на поле боя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "montka"
      }
    },
    {
      "sid": "f73f4a42-c4b1-4ef7-bd9c-deaf79bc413d",
      "kind": "enhancement",
      "name": "Internal Grenade Racks",
      "det": "Retaliation Cadre",
      "ref": {
        "kind": "enhancement",
        "det": "retaliation-cadre"
      },
      "hash": "0570f862",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    }
  ]
}
