// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "orks",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "42dcefdd-5b72-49b8-8add-76b4da2221fa",
      "kind": "armyRule",
      "name": "Waaagh!",
      "det": null,
      "hash": "9d17d608",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "a6f39aff-8615-4636-9b6d-da6fab863c33",
      "kind": "detachmentRule",
      "name": "Da Hunt Is On",
      "det": "Da Big Hunt",
      "hash": "887fbe72",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Beast Snagga models only, per attack against your Prey",
            "ru": "только модели Beast Snagga, за атаку по вашей Добыче"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "da-big-hunt"
      }
    },
    {
      "sid": "f961623a-499e-4a8c-8061-2bb1ed0d0e54",
      "kind": "detachmentRule",
      "name": "Try Dat Button!",
      "det": "Dread Mob",
      "ref": {
        "kind": "detachmentRule",
        "det": "dread-mob"
      },
      "hash": "4fb1d694",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "36625896-bea9-4694-b3d0-1a684a71367b",
      "kind": "detachmentRule",
      "name": "Mob Mentality",
      "det": "Green Tide",
      "hash": "652c37e9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": {
            "en": "against any attack targeting the unit",
            "ru": "против любой атаки по отряду"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "instead, while the unit contains 10 or more models",
            "ru": "вместо этого, пока в отряде 10 и более моделей"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "green-tide"
      }
    },
    {
      "sid": "5990b4e9-2df8-4b33-bf55-6bb1026403d0",
      "kind": "detachmentRule",
      "name": "Dakka! Dakka! Dakka!",
      "det": "More Dakka!",
      "ref": {
        "kind": "detachmentRule",
        "det": "more-dakka"
      },
      "hash": "c459d4ca",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        },
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "in your Shooting phase, while the Waaagh! is active",
            "ru": "в вашей фазе стрельбы, пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active",
            "phase-shooting"
          ]
        }
      ]
    },
    {
      "sid": "e71395f5-4a7c-44ed-a8a3-a61bb7ce5ecc",
      "kind": "detachmentRule",
      "name": "Turbo Boostas",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "detachmentRule",
        "det": "speedwaaagh"
      },
      "hash": "1d3dbfc4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "24\"",
          "when": {
            "en": "while the unit uses its turbo — one straight line only, and it cannot declare a charge",
            "ru": "пока отряд использует турбо — только по прямой и без объявления charge"
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
            "en": "until the end of the turn in which the unit used its turbo",
            "ru": "до конца хода, в котором отряд использовал турбо"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ad39d9e7-48b0-4f33-a7dc-361c8266eb91",
      "kind": "detachmentRule",
      "name": "Get Stuck In",
      "det": "War Horde",
      "ref": {
        "kind": "detachmentRule",
        "det": "war-horde"
      },
      "hash": "645b7b89",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "fb854ed4-d89a-48fe-8885-668fc666fb57",
      "kind": "enhancement",
      "name": "Runnin’ Boots",
      "det": "Blitz Brigade",
      "hash": "44d35202",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "blitz-brigade"
      }
    },
    {
      "sid": "b26524a0-05cb-4f6d-a0ee-eb29836d5cd5",
      "kind": "enhancement",
      "name": "Da Biggest Boss",
      "det": "Bully Boyz",
      "hash": "c7314a69",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bully-boyz"
      }
    },
    {
      "sid": "054ed69c-a8e8-4469-80bf-1d1e39dc5103",
      "kind": "enhancement",
      "name": "Proper Killy",
      "det": "Da Big Hunt",
      "hash": "b2a4dee2",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "da-big-hunt"
      }
    },
    {
      "sid": "feb611dd-912d-42c4-acd1-c9e0922bd5aa",
      "kind": "enhancement",
      "name": "Gitfinder Gogglez",
      "det": "Dread Mob",
      "ref": {
        "kind": "enhancement",
        "det": "dread-mob"
      },
      "hash": "63bbe596",
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
      "sid": "d3a899cc-7e85-48ee-aaf8-7bc01205a926",
      "kind": "enhancement",
      "name": "Bionik Workshop",
      "det": "Freebooter Krew",
      "hash": "9aa0b7af",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "on a D3 roll of 1 at the start of the battle (Bionik Legs)",
            "ru": "при выпавшем 1 на D3 в начале битвы (Bionik Legs)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 2 at the start of the battle (Bionik Arms)",
            "ru": "при выпавшем 2 на D3 в начале битвы (Bionik Arms)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 3 at the start of the battle (Bionik Bonce)",
            "ru": "при выпавшем 3 на D3 в начале битвы (Bionik Bonce)"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "freebooter-krew"
      }
    },
    {
      "sid": "585d8003-498c-4dc1-a7d7-82aa037b3274",
      "kind": "enhancement",
      "name": "Git-Spotter Squig",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "enhancement",
        "det": "freebooter-krew"
      },
      "hash": "b0b5300b",
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
      "sid": "987fbbf7-d3d3-4e55-a058-14332291177a",
      "kind": "enhancement",
      "name": "Ferocious Show Off",
      "det": "Green Tide",
      "hash": "35322b3c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while resolving the bearer's own attacks",
            "ru": "при разрешении атак самого носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": {
            "en": "instead, if the bearer's unit contains 10 or more models",
            "ru": "вместо этого, если в отряде носителя 10 и более моделей"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "green-tide"
      }
    },
    {
      "sid": "d31fb77e-2a18-415e-8a42-d8721e2e7864",
      "kind": "enhancement",
      "name": "Targetin’ Gizmos (Upgrade)",
      "det": "Rollin' Deff",
      "ref": {
        "kind": "enhancement",
        "det": "rollin-deff"
      },
      "hash": "d8013422",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while a BIG MEK model is embarked within this unit",
            "ru": "пока внутри юнита находится модель BIG MEK"
          },
          "cond": [
            "never"
          ]
        },
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while a BIG MEK is embarked and the Waaagh! is active",
            "ru": "пока внутри юнита BIG MEK и активен Waaagh!"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "note": "both bullets hang on the embarked Big Mek, so neither rewrites a printed tag"
    },
    {
      "sid": "be252d4b-367b-4dcc-b10d-6e12f678df40",
      "kind": "enhancement",
      "name": "Dakkamek",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "enhancement",
        "det": "speedwaaagh"
      },
      "hash": "05c13307",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1889b79a-54fd-4e88-93e8-fdc0d4076a1a",
      "kind": "enhancement",
      "name": "Master Meknologist",
      "det": "Speedwaaagh!",
      "hash": "ecde6a70",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "speedwaaagh"
      }
    },
    {
      "sid": "6e1ce3ba-cf8c-4f03-8826-d8c32b03c38c",
      "kind": "enhancement",
      "name": "Follow Me Ladz",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "cb9b17bd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
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
      "sid": "7387cdc9-10f1-49b5-846f-bd74d0990559",
      "kind": "enhancement",
      "name": "Headwoppa’s Killchoppa",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "042b9d74",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "notTag": "EXTRA ATTACKS"
          },
          "when": null
        }
      ]
    }
  ]
}
