// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "dark-angels",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "6e39159c-9a5e-4672-9f80-dc40e4cc4353:azrael",
      "kind": "ability",
      "name": "Azrael: Supreme Grand Master",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "azrael"
      },
      "hash": "3154cfe3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "e5141592-d906-445c-939f-081212f2666f:deathwing-terminator-squad",
      "kind": "ability",
      "name": "Deathwing Terminator Squad: Deathwing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-terminator-squad"
      },
      "hash": "537c6109",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cb502504-f1d5-4294-be79-d5eeb88be41f:inner-circle-companions",
      "kind": "ability",
      "name": "Inner Circle Companions: Enmity for the Unworthy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inner-circle-companions"
      },
      "hash": "e5053d72",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c63e8cc-3ae0-483f-bb91-b903d35e692d:master-zacharial",
      "kind": "ability",
      "name": "Master Zacharial: Gravis Protection",
      "det": null,
      "ref": null,
      "hash": "9bdc06bf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "16ca7bcc-81e1-4696-ba4e-a56e91be601a:ravenwing-black-knights",
      "kind": "ability",
      "name": "Ravenwing Black Knights: Knights of Caliban",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-black-knights"
      },
      "hash": "3adfce24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": {
            "en": "in a phase it fights having made a Charge move this turn",
            "ru": "в фазе боя, если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": {
            "en": "in a phase it fights having made a Charge move this turn",
            "ru": "в фазе боя, если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "b0bc4600-4287-48c3-9a42-9f4456812883:ravenwing-command-squad",
      "kind": "ability",
      "name": "Ravenwing Command Squad: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-command-squad"
      },
      "hash": "671a747f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains a Ravenwing Ancient",
            "ru": "пока в отряде есть Ravenwing Ancient"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7e1dd147-ead5-4bed-a886-b9757df51888:ravenwing-command-squad",
      "kind": "ability",
      "name": "Ravenwing Command Squad: Honour or Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-command-squad"
      },
      "hash": "a17e2211",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c4629f2-1f02-458e-99f6-2dd66ad13c4c:ravenwing-dark-talon",
      "kind": "ability",
      "name": "Ravenwing Dark Talon: Stasis Bomb",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-dark-talon"
      },
      "hash": "c38ed31f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7fcd5eab-c360-44c6-8f5e-c02f512ee488:sammael",
      "kind": "ability",
      "name": "Sammael: Grand Master of the Ravenwing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sammael"
      },
      "hash": "efadef7d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
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
      "sid": "ac3ce055-781a-47a7-ae00-a1c5afe69b4a",
      "kind": "detachmentRule",
      "name": "Masters of Manoeuvre",
      "det": "Company of Hunters",
      "ref": {
        "kind": "detachmentRule",
        "det": "company-of-hunters"
      },
      "hash": "2aa7c5e0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "5da17b88-adf4-4521-bf36-a230dcf243e2",
      "kind": "detachmentRule",
      "name": "Invocations of Ancient Fury",
      "det": "Dark Age Arsenal",
      "ref": {
        "kind": "detachmentRule",
        "det": "dark-age-arsenal"
      },
      "hash": "419dcd7c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "weapon profiles with 'Plasma' in their name only",
            "ru": "только профили оружия со словом Plasma в названии"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
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
      "sid": "2464ddee-5a32-4ba2-8666-c37d4f608056",
      "kind": "detachmentRule",
      "name": "Dread Catechism",
      "det": "Interrogation Conclave",
      "ref": {
        "kind": "detachmentRule",
        "det": "interrogation-conclave"
      },
      "hash": "0a84b04f",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "931a0683-a764-44a2-8f87-a1f6a1d70cc4",
      "kind": "enhancement",
      "name": "Master-crafted Weapon",
      "det": "Company of Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "company-of-hunters"
      },
      "hash": "9ecbedb9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "28e99366-170a-49c2-a572-6740ee178f95",
      "kind": "enhancement",
      "name": "Champion of the Deathwing",
      "det": "Inner Circle Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "inner-circle-task-force"
      },
      "hash": "a0d472d2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        }
      ]
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
            "unit-battle-shocked"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "unit-battle-shocked"
          ],
          "alt": 1,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, while the bearer is Battle-shocked",
            "ru": "атаки, сила и урон +2 вместо +1, пока носитель Battle-shocked"
          }
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 2,
          "cond": [
            "unit-battle-shocked"
          ],
          "alt": 2,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, while the bearer is Battle-shocked",
            "ru": "атаки, сила и урон +2 вместо +1, пока носитель Battle-shocked"
          }
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
    },
    {
      "sid": "940380dd-af82-403b-ba52-1583f553b446:azrael",
      "kind": "wargear",
      "name": "Azrael: The Lion Helm",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "azrael",
        "item": "the lion helm"
      },
      "hash": "ec2e799d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a298ee2e-4181-43e7-81a7-158bdc457d53:ezekiel",
      "kind": "wargear",
      "name": "Ezekiel: Book of Salvation",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ezekiel",
        "item": "book of salvation"
      },
      "hash": "923d989b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    }
  ]
}
