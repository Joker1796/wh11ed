// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "dark-angels",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "2d71b3c6-84d1-49a1-a179-24b40816bb39",
      "kind": "armyRule",
      "name": "The Deathwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5111516f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the DEATHWING keyword it grants is already carried by src/data/conditionalKeywords.json (gen-conditional-keywords.mjs reads the same grant structurally); recording it here would show it twice"
    },
    {
      "sid": "e55bbc4f-6173-4d1b-b806-9351010772f7",
      "kind": "armyRule",
      "name": "The Deathwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5111516f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "duplicate publication of the same rule — same reasoning as the other The Deathwing record"
    },
    {
      "sid": "0339c85c-6792-4c1d-a69f-93d1b915cd7e",
      "kind": "armyRule",
      "name": "The Ravenwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5465d0bf",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the RAVENWING keyword is already carried by conditionalKeywords.json"
    },
    {
      "sid": "02e193b8-9f13-405d-968e-7c3b455bcc24",
      "kind": "armyRule",
      "name": "The Ravenwing",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5465d0bf",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "duplicate publication of the same rule"
    },
    {
      "sid": "75d3a75e-54a9-4db3-8aeb-0aff7d9b285c",
      "kind": "detachmentRule",
      "name": "Black-winged Vigilance",
      "det": "Darkflight Pursuit",
      "ref": {
        "kind": "detachmentRule",
        "det": "darkflight-pursuit"
      },
      "hash": "154305f6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "83ea8eb4-3e6c-40e4-bbeb-4c6b84f193ef",
      "kind": "detachmentRule",
      "name": "Vowed Target",
      "det": "Inner Circle Task Force",
      "hash": "468dd3bf",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "inner-circle-task-force"
      }
    },
    {
      "sid": "9e501c18-163d-42e5-9a25-3ef8f6208ca5",
      "kind": "detachmentRule",
      "name": "In The Lion’s Claws",
      "det": "Lion’s Blade Task Force",
      "hash": "2caac2fd",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "lions-blade-task-force"
      }
    },
    {
      "sid": "d0e2e352-eb05-4b39-a1f1-8717125f9896",
      "kind": "detachmentRule",
      "name": "Grim Resolve",
      "det": "Unforgiven Task Force",
      "hash": "4a1c5a4d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "1",
          "when": {
            "en": "while the unit is Battle-shocked, its Objective Control becomes 1 instead of 0",
            "ru": "пока отряд Battle-shocked, его Objective Control становится 1 вместо 0"
          },
          "cond": [
            "unit-battle-shocked"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for one unit you select each Command phase",
            "ru": "для одного отряда, выбираемого в каждой вашей фазе командования"
          },
          "cond": [
            "unit-selected-command-phase"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "unforgiven-task-force"
      }
    },
    {
      "sid": "a0af2727-f3c3-47c4-850f-727a3f10748d",
      "kind": "enhancement",
      "name": "Inescapable Interrogation",
      "det": "Interrogation Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "interrogation-conclave"
      },
      "hash": "86b86280",
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
      "sid": "e1d0fc18-e30e-464d-a00b-6a7d603ef76d",
      "kind": "enhancement",
      "name": "Calibanite Armaments",
      "det": "Lion’s Blade Task Force",
      "hash": "d04ca612",
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
        "det": "lions-blade-task-force"
      }
    },
    {
      "sid": "34a55249-41f7-4844-a9bc-dd8fa2a3f779",
      "kind": "enhancement",
      "name": "Stalwart Champion",
      "det": "Lion’s Blade Task Force",
      "hash": "1ec258b6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
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
        "det": "lions-blade-task-force"
      }
    },
    {
      "sid": "7018776e-8c69-4371-b038-0d6dd2fe8537",
      "kind": "enhancement",
      "name": "Stubborn Tenacity",
      "det": "Unforgiven Task Force",
      "hash": "f6d2a572",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "unforgiven-task-force"
      }
    },
    {
      "sid": "3d01d429-55f8-49ab-ae1a-8999e67393e1",
      "kind": "enhancement",
      "name": "Weapons of the First Legion",
      "det": "Unforgiven Task Force",
      "hash": "697aa7f8",
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
            "en": "Attacks, Strength and Damage +2 instead, while the bearer is Battle-shocked",
            "ru": "атаки, сила и урон +2 вместо +1, пока носитель Battle-shocked"
          },
          "cond": [
            "blocked-alternate"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "unforgiven-task-force"
      }
    },
    {
      "sid": "7a78a4d3-88ce-42df-886e-11cebcceef73",
      "kind": "enhancement",
      "name": "Ancient Weapons",
      "det": "Wrath of the Rock",
      "hash": "c8299e61",
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
        "det": "wrath-of-the-rock"
      }
    }
  ]
}
