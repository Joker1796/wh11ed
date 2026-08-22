// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "imperial-agents",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "82ad414b-e19f-4a6a-be1a-5ce96e420d21",
      "kind": "armyRule",
      "name": "Assigned Agents",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4aa3a14f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — how many Agents units may be included"
    },
    {
      "sid": "d7b4a194-4fa5-427c-9015-e2423dda2d80",
      "kind": "armyRule",
      "name": "Assigned Agents",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4aa3a14f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "duplicate publication of the same rule"
    },
    {
      "sid": "dc3732a7-5647-49b0-b3d1-8279dcfc40e4",
      "kind": "detachmentRule",
      "name": "At All Costs",
      "det": "Imperialis Fleet",
      "hash": "c7734e00",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
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
            "en": "with the Acquire objective chosen, while within range of that objective marker",
            "ru": "при выбранной цели «Acquire», пока юнит в радиусе действия этого маркера"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "imperialis-fleet"
      }
    },
    {
      "sid": "7c93a7f0-c620-488f-a19c-65c23ed26631",
      "kind": "detachmentRule",
      "name": "Deathwatch Mission Tactics",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "detachmentRule",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "6d06128c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the Furor Tactics Mission Tactic is active",
            "ru": "пока активна тактика Furor Tactics"
          },
          "cond": [
            "tactic-furor"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the Malleus Tactics Mission Tactic is active",
            "ru": "пока активна тактика Malleus Tactics"
          },
          "cond": [
            "tactic-malleus"
          ]
        }
      ]
    },
    {
      "sid": "c03746fa-d420-4d0a-b792-5fe5b1e1be66",
      "kind": "enhancement",
      "name": "Ignis Judicium",
      "det": "Ordo Hereticus, Purgation Force",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-hereticus-purgation-force"
      },
      "hash": "024b237f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "MELTA 1",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "20cc49fb-5221-4dcf-b631-b116a84b02c3",
      "kind": "enhancement",
      "name": "Daemon Slayer",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "c4f1ac1e",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "65ac2883-9467-4478-847c-55858dde8251",
      "kind": "enhancement",
      "name": "Formidable Resolve",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "46a46316",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "43034cd6-adca-4c3f-a1ca-2cc5274871f2",
      "kind": "enhancement",
      "name": "Grimoire of True Names (Aura)",
      "det": "Ordo Malleus, Daemon Hunters",
      "hash": "77f50fbb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "ordo-malleus-daemon-hunters"
      }
    },
    {
      "sid": "853414cb-e3c5-4543-a1cd-3ef2101c6682",
      "kind": "enhancement",
      "name": "Universal Anathema",
      "det": "Ordo Xenos, Alien Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "ordo-xenos-alien-hunters"
      },
      "hash": "ae5663cb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null
        }
      ]
    }
  ]
}
