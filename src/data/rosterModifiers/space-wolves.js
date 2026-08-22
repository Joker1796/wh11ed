// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "space-wolves",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "c363373f-a93a-4ca3-87ea-4e5de5d9d00a:njal-stormcaller",
      "kind": "ability",
      "name": "Njal Stormcaller: Wind Walker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "njal-stormcaller"
      },
      "hash": "08b30d76",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "3da4eee3-89af-4037-aefa-12023bbc67b1:ragnar-blackmane",
      "kind": "ability",
      "name": "Ragnar Blackmane: Battle-lust",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ragnar-blackmane"
      },
      "hash": "f38068e0",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "a7069d52-c411-40a4-b338-669be44af016:thunderwolf-cavalry",
      "kind": "ability",
      "name": "Thunderwolf Cavalry: Thunderous Charge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "thunderwolf-cavalry"
      },
      "hash": "bb731a97",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "e529cc68-31ea-4e22-8a19-6ca81aaa91f5:ulrik-the-slayer",
      "kind": "ability",
      "name": "Ulrik the Slayer: Oathbound",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ulrik-the-slayer"
      },
      "hash": "1db00418",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "605fa95b-842d-4edc-8451-831c87db9f3b:venerable-dreadnought",
      "kind": "ability",
      "name": "Venerable Dreadnought: Fervour of the Ancients",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "venerable-dreadnought"
      },
      "hash": "df5d46d9",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "8e94dbbe-8d1c-489a-95b0-84124330dce9:wolf-guard-battle-leader",
      "kind": "ability",
      "name": "Wolf Guard Battle Leader: Tempered Ferocity",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-battle-leader"
      },
      "hash": "8629651a",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "04e6754e-fec6-4e6e-bdef-40615b130dbf:wolf-guard-headtakers",
      "kind": "ability",
      "name": "Wolf Guard Headtakers: Headhunters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-guard-headtakers"
      },
      "hash": "b0fd3454",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "b68802d5-ac33-412c-9ca6-a6900b837bc1:wolf-priest",
      "kind": "ability",
      "name": "Wolf Priest: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-priest"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "b9ca957a-30df-4c4e-975f-ef014c23fba3:wolf-scouts",
      "kind": "ability",
      "name": "Wolf Scouts: Deadly Stalkers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wolf-scouts"
      },
      "hash": "570a574f",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "2941a942-f21f-4911-920c-4c191f83be73:wulfen-dreadnought",
      "kind": "ability",
      "name": "Wulfen Dreadnought: Violent Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wulfen-dreadnought"
      },
      "hash": "b06c5999",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
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
      "sid": "908a1c13-a1bb-44de-9af2-1f55652d6c0a",
      "kind": "enhancement",
      "name": "Lone Hunter",
      "det": "Askar’s Wolfpack",
      "ref": null,
      "hash": "b8605c04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "14e6c085-26e1-4a1d-9b1c-1f784e12c24e",
      "kind": "enhancement",
      "name": "A Giant Amongst Giants",
      "det": "Champions of Fenris",
      "ref": {
        "kind": "enhancement",
        "det": "champions-of-fenris"
      },
      "hash": "913a23bb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "b01a927f-833a-41f0-93b2-517f49d54614",
      "kind": "enhancement",
      "name": "Fierce Example (Upgrade)",
      "det": "Legends of Saga and Song",
      "ref": {
        "kind": "enhancement",
        "det": "legends-of-saga-and-song"
      },
      "hash": "25074acf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "6bb394ee-ecc3-4447-bead-f3d003753b0b",
      "kind": "enhancement",
      "name": "Thirst for Glory (Upgrade)",
      "det": "Legends of Saga and Song",
      "ref": {
        "kind": "enhancement",
        "det": "legends-of-saga-and-song"
      },
      "hash": "13880a28",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
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
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-bold"
      }
    },
    {
      "sid": "aa4fc796-1ecd-49c1-8b30-fd0d09f4292e",
      "kind": "enhancement",
      "name": "Skjald’s Foretelling",
      "det": "Saga of the Great Wolf",
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-great-wolf"
      },
      "hash": "b9ccc4ba",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
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
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-hunter"
      }
    },
    {
      "sid": "c45ceb28-43f5-4c20-814c-96de4a95a201",
      "kind": "enhancement",
      "name": "Wolf Master",
      "det": "Saga of the Hunter",
      "ref": {
        "kind": "enhancement",
        "det": "saga-of-the-hunter"
      },
      "hash": "887e263f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bea7180e-44b2-43b3-b3b9-584a06e83a19",
      "kind": "enhancement",
      "name": "Eye of the Hunter",
      "det": "Veterans of the Fang",
      "ref": {
        "kind": "enhancement",
        "det": "veterans-of-the-fang"
      },
      "hash": "4cd37d89",
      "ver": 925,
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
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    }
  ]
}
