// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
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
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          }
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
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "da-big-hunt"
      }
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
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "instead, while the unit contains 10 or more models",
            "ru": "вместо этого, пока в отряде 10 и более моделей"
          }
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
      "reviewed": false,
      "effects": []
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
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 2 at the start of the battle (Bionik Arms)",
            "ru": "при выпавшем 2 на D3 в начале битвы (Bionik Arms)"
          }
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 3 at the start of the battle (Bionik Bonce)",
            "ru": "при выпавшем 3 на D3 в начале битвы (Bionik Bonce)"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "freebooter-krew"
      }
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
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": {
            "en": "instead, if the bearer's unit contains 10 or more models",
            "ru": "вместо этого, если в отряде носителя 10 и более моделей"
          }
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
      "reviewed": false,
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
    }
  ]
}
