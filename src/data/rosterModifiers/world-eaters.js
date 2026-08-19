// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "world-eaters",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "145c3608-88ac-4d19-b441-93aec4eceee9",
      "kind": "detachmentRule",
      "name": "Relentless Rage",
      "det": "Berzerker Warband",
      "hash": "4d170c56",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn, after the unit makes a Charge move",
            "ru": "до конца хода, после того как отряд совершил чардж"
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "until the end of the turn, after the unit makes a Charge move",
            "ru": "до конца хода, после того как отряд совершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "e0bb7c79-6d19-4d69-84ae-f3d0b4036ad3",
      "kind": "detachmentRule",
      "name": "Idols of Khorne",
      "det": "Cult of Blood",
      "hash": "60e57bd1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "cult-of-blood"
      }
    },
    {
      "sid": "adf5998c-3b76-4841-b189-5e2e08a37b61",
      "kind": "detachmentRule",
      "name": "Rush to the Fray",
      "det": "Goretrack Onslaught",
      "hash": "c9160531",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "goretrack-onslaught"
      }
    },
    {
      "sid": "8f1033a9-31fd-40a3-aa6d-529a58e31a8d",
      "kind": "detachmentRule",
      "name": "Blood Tithe",
      "det": "Khorne Daemonkin",
      "hash": "fce93df7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "Blood Legions units only, once the Boon of Blood ability is activated for 4 Blood Tithe points",
            "ru": "только отряды Blood Legions, после активации способности Boon of Blood за 4 очка Blood Tithe"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "khorne-daemonkin"
      }
    },
    {
      "sid": "f7fbb275-bf28-483e-9f80-5bbedb3c3b51",
      "kind": "enhancement",
      "name": "Battle-lust",
      "det": "Berzerker Warband",
      "hash": "42d701da",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "156db4d1-d3d9-434a-a23a-8891a2dc103b",
      "kind": "enhancement",
      "name": "Berzerker Glaive",
      "det": "Berzerker Warband",
      "hash": "5486231b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "excluding Extra Attacks weapons",
            "ru": "кроме оружия Extra Attacks"
          }
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "excluding Extra Attacks weapons",
            "ru": "кроме оружия Extra Attacks"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "a0a554a8-ce20-4b80-ae87-61273c56f07a",
      "kind": "enhancement",
      "name": "Brazen Form",
      "det": "Cult of Blood",
      "hash": "0173d648",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-blood"
      }
    },
    {
      "sid": "8d57055e-3476-401d-9382-c0c1eae33a4d",
      "kind": "enhancement",
      "name": "Blade of Endless Bloodshed",
      "det": "Khorne Daemonkin",
      "hash": "f9ebe04f",
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
        "det": "khorne-daemonkin"
      }
    },
    {
      "sid": "39eeeb4f-b6ba-45a6-8d96-7a7036b58d88",
      "kind": "enhancement",
      "name": "Disciple of Khorne",
      "det": "Khorne Daemonkin",
      "ref": {
        "kind": "enhancement",
        "det": "khorne-daemonkin"
      },
      "hash": "b14be783",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Blood Legions",
          "when": {
            "en": "replaces the World Eaters Faction keyword rather than adding to it",
            "ru": "заменяет фракционное ключевое слово World Eaters, а не добавляется к нему"
          }
        }
      ]
    }
  ]
}
