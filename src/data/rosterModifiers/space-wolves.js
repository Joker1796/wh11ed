// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "space-wolves",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "1710499e-3656-4246-9978-65bf43c4c140",
      "kind": "armyRule",
      "name": "Curse of the Wulfen",
      "det": null,
      "hash": "f9ef08c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Infantry models, while within 6\" of a Space Wolves Character (or 12\" of a Wolf Priest) and not Battle-shocked",
            "ru": "модели Infantry, пока отряд в 6\" от персонажа Space Wolves (или 12\" от Wolf Priest) и не Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Vehicle models, under the same condition",
            "ru": "модели Vehicle, при том же условии"
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
      "sid": "8ec6aabd-3330-47e0-b08b-5735e867be28",
      "kind": "armyRule",
      "name": "Curse of the Wulfen",
      "det": null,
      "hash": "f9ef08c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Infantry models, while within 6\" of a Space Wolves Character (or 12\" of a Wolf Priest) and not Battle-shocked",
            "ru": "модели Infantry, пока отряд в 6\" от персонажа Space Wolves (или 12\" от Wolf Priest) и не Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Vehicle models, under the same condition",
            "ru": "модели Vehicle, при том же условии"
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
      "sid": "60d212ba-251a-4824-9d55-364185c514cd",
      "kind": "detachmentRule",
      "name": "Legendary Slayers",
      "det": "Saga of the Beastslayer",
      "hash": "c0480cea",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "saga-of-the-beastslayer"
      }
    },
    {
      "sid": "38904dca-ee2d-4fc4-90c9-2c8718e22695",
      "kind": "detachmentRule",
      "name": "Master of Wolves",
      "det": "Saga of the Great Wolf",
      "hash": "c9e2983a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "saga-of-the-great-wolf"
      }
    },
    {
      "sid": "633d9fbe-c211-4318-bbb0-867702489070",
      "kind": "detachmentRule",
      "name": "Pack’s Quarry",
      "det": "Saga of the Hunter",
      "hash": "9c7b941e",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "saga-of-the-hunter"
      }
    },
    {
      "sid": "02dfd50a-9607-4ee7-894f-801322ead37b",
      "kind": "enhancement",
      "name": "Elder’s Guidance",
      "det": "Saga of the Beastslayer",
      "hash": "5a259109",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "once per battle, for the Fight phase, while the bearer leads a Blood Claws unit",
            "ru": "один раз за битву, на фазу боя, пока носитель ведёт отряд Blood Claws"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-beastslayer"
      }
    },
    {
      "sid": "ad4dadc7-2b9d-4fae-ae4e-9fc6a747fb0d",
      "kind": "enhancement",
      "name": "Wolf-touched",
      "det": "Saga of the Beastslayer",
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-beastslayer"
      },
      "hash": "6560c900",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "be26ea25-635f-4042-a1d0-4a0fbff0c0e5",
      "kind": "enhancement",
      "name": "Braggart’s Steel",
      "det": "Saga of the Bold",
      "hash": "80daf934",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if the bearer's unit has achieved one or more Boasts",
            "ru": "если отряд носителя выполнил хотя бы одно Boast"
          },
          "cond": [
            "unit-achieved-boast"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-bold"
      }
    },
    {
      "sid": "8f4d4dc6-adf0-44ac-a8fc-efdcbd7d5c2c",
      "kind": "enhancement",
      "name": "Hordeslayer",
      "det": "Saga of the Bold",
      "hash": "ee805bbd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for the Fight phase, if more enemy than friendly models are wholly within 6\" of the bearer",
            "ru": "на фазу боя, если в 6\" от носителя целиком больше вражеских моделей, чем дружественных"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "instead, if the bearer's unit has achieved one or more Boasts",
            "ru": "вместо этого, если отряд носителя выполнил хотя бы одно Boast"
          },
          "cond": [
            "blocked-alternate"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-bold"
      }
    },
    {
      "sid": "5a05c63a-00fc-4359-9a5e-ccac2c95b3d9",
      "kind": "enhancement",
      "name": "Feral Rage",
      "det": "Saga of the Hunter",
      "hash": "71fe66dd",
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
            "en": "an additional +1 until the end of the turn, after the bearer ends a Charge move",
            "ru": "дополнительно +1 до конца хода, после того как носитель завершил чардж"
          },
          "cond": [
            "blocked-alternate"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-hunter"
      }
    }
  ]
}
