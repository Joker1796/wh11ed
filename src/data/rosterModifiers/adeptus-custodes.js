// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "adeptus-custodes",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "fb5e29e5-8c77-4309-8b60-7e9fbc96d198",
      "kind": "allegiance",
      "name": "Solar Spearhead Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "solar-spearhead-keywords",
        "opt": "Character"
      },
      "hash": "f41f5c95",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "02ead9e4-7cbf-4b21-9454-9071c7f4035b",
      "kind": "detachmentRule",
      "name": "Assemblage of Might",
      "det": "Auric Champions",
      "hash": "62ac7a27",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "auric-champions"
      }
    },
    {
      "sid": "067f8571-ab3a-4adb-9775-b7b4ed2ec21e",
      "kind": "detachmentRule",
      "name": "Against All Odds",
      "det": "Lions of the Emperor",
      "hash": "dc516e59",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "7daf099f-82c8-4871-97e2-8e1863c59ec7",
      "kind": "detachmentRule",
      "name": "Martial Mastery",
      "det": "Shield Host",
      "hash": "ee9038b0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Martial Ka'tah models, while that bullet of Martial Mastery is the one selected this battle round",
            "ru": "модели с Martial Ka'tah, пока в этом раунде выбран соответствующий пункт Martial Mastery"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "shield-host"
      }
    },
    {
      "sid": "c60b2c8e-5321-442c-9790-75876a429558",
      "kind": "detachmentRule",
      "name": "Auric Armour",
      "det": "Solar Spearhead",
      "hash": "11cd1b24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Vehicle units at Starting Strength, excluding Aircraft and Battle-shocked units",
            "ru": "отряды Vehicle в полной численности, кроме Aircraft и Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "c267c203-2ad3-408b-a12b-7d1ead94fa0b",
      "kind": "detachmentRule",
      "name": "Moritoi Ancients",
      "det": "Solar Spearhead",
      "hash": "34b9acca",
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
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "fd72a239-683b-44f9-a38f-3e66c616faef",
      "kind": "detachmentRule",
      "name": "Revered Companions",
      "det": "Talons of the Emperor",
      "hash": "fcec0a80",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "talons-of-the-emperor"
      }
    },
    {
      "sid": "d178eeae-2a4d-4597-af84-02bef5cb5d36",
      "kind": "enhancement",
      "name": "Veiled Blade",
      "det": "Auric Champions",
      "hash": "ca41608e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "×3",
          "when": {
            "en": "once per battle, until the end of the turn, the bearer's Objective Control is tripled",
            "ru": "один раз за битву, до конца хода, Objective Control носителя утраивается"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "auric-champions"
      }
    },
    {
      "sid": "6bf0be50-a491-4d36-9491-929b860c64bf",
      "kind": "enhancement",
      "name": "Admonimortis",
      "det": "Lions of the Emperor",
      "hash": "d9e0853a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "09443c78-9599-4b1c-baa0-836142b59bb1",
      "kind": "enhancement",
      "name": "Fierce Conqueror",
      "det": "Lions of the Emperor",
      "hash": "9e06f74f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for the Fight phase, per 5 enemy models within 6\" of the bearer (rounding down)",
            "ru": "на фазу боя, за каждые 5 вражеских моделей в 6\" от носителя (с округлением вниз)"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "ad4c7b31-c0d1-4fdc-940e-9b82ca3d3057",
      "kind": "enhancement",
      "name": "Oblivion Knight",
      "det": "Null Maiden Vigil",
      "hash": "75d6c16a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      }
    },
    {
      "sid": "2bf0ae91-04b4-4ce5-8019-8e699d1d6093",
      "kind": "enhancement",
      "name": "Raptor Blade",
      "det": "Null Maiden Vigil",
      "hash": "adb05aaf",
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, while within Engagement Range of a Battle-shocked enemy Psyker unit",
            "ru": "атаки, сила и урон +2 вместо +1, пока носитель в радиусе боя с Battle-shocked вражеским отрядом Psyker"
          },
          "cond": [
            "blocked-alternate"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      }
    },
    {
      "sid": "613d5ac2-7229-4e15-8b37-959bb7f3dd64",
      "kind": "enhancement",
      "name": "Auric Mantle",
      "det": "Shield Host",
      "hash": "d0736a52",
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
        "det": "shield-host"
      }
    },
    {
      "sid": "a48ca031-033e-43c8-b79c-8199175c448e",
      "kind": "enhancement",
      "name": "From the Hall of Armouries",
      "det": "Shield Host",
      "hash": "75cc38ed",
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
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shield-host"
      }
    },
    {
      "sid": "d25d6f4b-3dcf-4b17-8e8e-b39a487012c9",
      "kind": "enhancement",
      "name": "Adamantine Talisman",
      "det": "Solar Spearhead",
      "hash": "cab5d46b",
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
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "60461b2c-c1ca-4046-82a2-436078ebfb10",
      "kind": "enhancement",
      "name": "Gift of Terran Artifice",
      "det": "Talons of the Emperor",
      "hash": "3ecc3cbb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "talons-of-the-emperor"
      }
    }
  ]
}
