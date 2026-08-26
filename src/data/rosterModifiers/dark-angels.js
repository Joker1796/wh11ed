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
          "target": "unit"
        }
      ]
    },
    {
      "sid": "b7762dcd-fc0e-4d41-a767-19b5b183f3ef:belial",
      "kind": "ability",
      "name": "Belial: Grand Master of the Deathwing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belial"
      },
      "hash": "06108a12",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "on a Critical Hit",
            "ru": "на Critical Hit"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d021d325-2787-41ad-a5c1-347fc0262dfd:deathwing-knights",
      "kind": "ability",
      "name": "Deathwing Knights: Inner Circle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deathwing-knights"
      },
      "hash": "6903aaca",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "c82f018e-0e17-4c00-9ef3-5d025e1fc846:ezekiel",
      "kind": "ability",
      "name": "Ezekiel: Psychic Hood",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ezekiel"
      },
      "hash": "d4f151a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "target": "unit",
          "when": null
        }
      ]
    },
    {
      "sid": "b6530fa5-3538-484c-b54e-d632bd973644:inner-circle-companions",
      "kind": "ability",
      "name": "Inner Circle Companions: Braziers of Judgement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inner-circle-companions"
      },
      "hash": "87a55d7c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
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
      "sid": "df10d338-55e1-441e-87bb-0424cce8a22f:lazarus",
      "kind": "ability",
      "name": "Lazarus: The Spiritshield Helm",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lazarus"
      },
      "hash": "e48360cd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        }
      ]
    },
    {
      "sid": "d35ece66-fa50-4d0a-8503-97eafc049ffc:lion-eljonson",
      "kind": "ability",
      "name": "Lion El’Jonson: Dark Angels Bodyguard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson"
      },
      "hash": "36943dfb",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e0cefd1e-fc89-484e-98dc-2f41f7322b40:lion-eljonson",
      "kind": "ability",
      "name": "Lion El’Jonson: Martial Exemplar (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ],
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "4eac361e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cda4bdcf-38e9-442a-b524-d68b04f345b7:lion-eljonson",
      "kind": "ability",
      "name": "Lion El’Jonson: Mist-wreathed Shadow Realms",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "ed23722a",
      "ver": 931,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0c2901c8-7603-488d-ab58-2badb2eecbb4:lion-eljonson",
      "kind": "ability",
      "name": "Lion El’Jonson: No Hiding From the Watchers (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lion-eljonson",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ],
        "set": "Primarch of the First Legion",
        "pickLimit": 2
      },
      "hash": "abacefa0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "target": "aura",
          "when": null
        }
      ]
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
      "sid": "837e822e-e367-499f-a51b-540581de8241:ravenwing-darkshroud",
      "kind": "ability",
      "name": "Ravenwing Darkshroud: Icon of Old Caliban",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ravenwing-darkshroud",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "0f321044",
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
      "sid": "98482be9-4f60-4c8e-847d-b0760af85084",
      "kind": "enhancement",
      "name": "Recon Hunter",
      "det": "Company of Hunters",
      "ref": {
        "kind": "enhancement",
        "det": "company-of-hunters"
      },
      "hash": "36589190",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 9\"",
          "when": null,
          "target": "led"
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
          ],
          "target": "led"
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "lions-blade-task-force"
      }
    },
    {
      "sid": "8b6de18b-cb40-49eb-9eb3-3ece326ec681",
      "kind": "enhancement",
      "name": "Pennant of Remembrance",
      "det": "Unforgiven Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "unforgiven-task-force"
      },
      "hash": "28d64d38",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "418829b4-ff4b-4cdf-9530-cbf9f67f9ea1",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Company of Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "company-of-hunters",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "150d44d6-66a3-470d-abc8-f7a9dede80e0",
      "kind": "stratagem",
      "name": "Talon Strike",
      "det": "Company of Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "company-of-hunters",
        "name": "Talon Strike"
      },
      "hash": "5757518f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9af5293a-2c33-44f8-9104-d14301621129",
      "kind": "stratagem",
      "name": "No Sacrifice Too Great",
      "det": "Dark Age Arsenal",
      "ref": {
        "kind": "stratagem",
        "det": "dark-age-arsenal",
        "name": "No Sacrifice Too Great"
      },
      "hash": "72f7c02a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "HAZARDOUS"
          },
          "when": {
            "en": "plasma weapons, while this stratagem is in force",
            "ru": "плазменное оружие, пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "15da7f78-d0fe-4dec-8ed6-94ac5fc8430e",
      "kind": "stratagem",
      "name": "Wings of Shadow",
      "det": "Darkflight Pursuit",
      "ref": {
        "kind": "stratagem",
        "det": "darkflight-pursuit",
        "name": "Wings of Shadow"
      },
      "hash": "38b9e784",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "709d9f90-1f57-493c-bdf3-279310da4339",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Inner Circle Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "inner-circle-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "38100d27-b255-437d-8d7d-f7c1a177cec3",
      "kind": "stratagem",
      "name": "Exacting Punishment",
      "det": "Interrogation Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "interrogation-conclave",
        "name": "Exacting Punishment"
      },
      "hash": "72d06e1d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "5bd61afc-3e7a-48d3-9080-e4ea6a01ae76",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Lion’s Blade Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "lions-blade-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "52f5dd3c-9c83-41d3-811c-2323554aa7ca",
      "kind": "stratagem",
      "name": "Illuminating Fire",
      "det": "Lion’s Blade Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "lions-blade-task-force",
        "name": "Illuminating Fire"
      },
      "hash": "1014cf89",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dbc9a4a9-b047-4171-96dd-b5432502c579",
      "kind": "stratagem",
      "name": "Overpowering Exaction",
      "det": "Lion’s Blade Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "lions-blade-task-force",
        "name": "Overpowering Exaction"
      },
      "hash": "7c6de389",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1ead1a56-e4a7-4e0f-8a46-65b9e8f0452a",
      "kind": "stratagem",
      "name": "For the Lion",
      "det": "The Vengeful Brethren",
      "ref": null,
      "hash": "076afe4b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "12237ea6-06fd-4cb6-b7e3-282850a71f16",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Unforgiven Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "unforgiven-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "50d24785-ed31-4425-a0ba-c7a8965f54cf",
      "kind": "stratagem",
      "name": "Fire Discipline",
      "det": "Unforgiven Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "unforgiven-task-force",
        "name": "Fire Discipline"
      },
      "hash": "7bb022c1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HEAVY",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "4e190f01-9671-4565-9d2a-6f7f73e9a93a",
      "kind": "stratagem",
      "name": "Unforgiven Fury",
      "det": "Unforgiven Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "unforgiven-task-force",
        "name": "Unforgiven Fury"
      },
      "hash": "2eb2a217",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9ee78dbf-8891-4a6c-98df-4b1a29ce0dd5",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fb1bcf88-543d-4b37-b503-8097298378d3",
      "kind": "stratagem",
      "name": "Lion’s Will",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Lion’s Will"
      },
      "hash": "40a9eacd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "round"
    },
    {
      "sid": "777a5d6f-2b9c-401b-9488-89f8c97f03ca",
      "kind": "stratagem",
      "name": "Relics of the Dark Age",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Relics of the Dark Age"
      },
      "hash": "ef8d6f39",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2f72cc59-edd2-4633-ba40-0f0e7cdd0a10",
      "kind": "stratagem",
      "name": "Tactical Mastery",
      "det": "Wrath of the Rock",
      "ref": {
        "kind": "stratagem",
        "det": "wrath-of-the-rock",
        "name": "Tactical Mastery"
      },
      "hash": "4331c5bc",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": {
            "en": "for the phase, when the bearer uses this wargear",
            "ru": "на фазу, когда носитель применил снаряжение"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b2bf043f-39ca-4ae5-83e4-dd5dab3a3bb1:deathwing-knights",
      "kind": "wargear",
      "name": "Deathwing Knights: Watcher in the Dark",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-knights",
        "item": "watcher in the dark"
      },
      "hash": "35b72d9f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b2bf043f-39ca-4ae5-83e4-dd5dab3a3bb1:deathwing-terminator-squad",
      "kind": "wargear",
      "name": "Deathwing Terminator Squad: Watcher in the Dark",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathwing-terminator-squad",
        "item": "watcher in the dark"
      },
      "hash": "35b72d9f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a298ee2e-4181-43e7-81a7-158bdc457d53:ezekiel",
      "kind": "wargear",
      "name": "Ezekiel: Book of Salvation",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ezekiel",
        "item": "book of salvation",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ]
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
          "target": "unit"
        }
      ]
    }
  ]
}
