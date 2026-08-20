// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "chaos-daemons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "cdb2d463-155c-42e4-a175-a067c162c0eb",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Khorne",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Khorne"
      },
      "hash": "ae040202",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "note": "every melee row on these datasheets IS the hellforged weapons (strike and sweep), so the +2 S applies to the whole table"
    },
    {
      "sid": "7eb23e8f-7e4d-4514-b126-ece1d6afc4f8",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Nurgle",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Nurgle"
      },
      "hash": "18bd6cac",
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
      "sid": "5c3a9d42-de95-4760-a2dd-fbd631f07f9d",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Slaanesh",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Slaanesh"
      },
      "hash": "40f35f84",
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
      "sid": "da9691ba-f0cc-4647-8c64-d43889b44811",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Tzeentch",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Tzeentch"
      },
      "hash": "213a227a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "note": "the infernal cannon is the only ranged row on these datasheets"
    },
    {
      "sid": "6d20d153-1252-428c-a141-b0863232aeda",
      "kind": "armyRule",
      "name": "Daemonic Pact",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "9611ddd4",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — allied points allowance, no printed number"
    },
    {
      "sid": "7f775c80-d3ce-4aa7-a586-348ac9502b2a",
      "kind": "detachmentRule",
      "name": "shudderblink",
      "det": "Warptide",
      "ref": {
        "kind": "detachmentRule",
        "det": "warptide"
      },
      "hash": "1efb3dd1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "when that unit is selected to make an Advance move, until the end of the turn",
            "ru": "когда юнит выбран для Advance-перемещения, до конца хода"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "281cf9a5-5126-42dc-a47c-fc5c897821df",
      "kind": "enhancement",
      "name": "Brazenmaw",
      "det": "Blood Legion",
      "hash": "8e83ef45",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "blood-legion"
      }
    },
    {
      "sid": "ebead938-7836-4e08-a1bf-e0c5ab3801a5",
      "kind": "enhancement",
      "name": "A’rgath, The King of Blades",
      "det": "Daemonic Incursion",
      "hash": "4c95d62c",
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Attacks and Strength +2 instead, while the bearer is within your army's Shadow of Chaos",
            "ru": "атаки и сила +2 вместо +1, пока носитель в Тени Хаоса вашей армии"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "daemonic-incursion"
      }
    },
    {
      "sid": "21549ce2-0e59-434f-b5e0-360ea30d53a6",
      "kind": "enhancement",
      "name": "The Everstave",
      "det": "Daemonic Incursion",
      "hash": "90d119a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 3,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Strength +2 and Range +6\" instead, while the bearer is within your army's Shadow of Chaos",
            "ru": "сила +2 и дальность +6\" вместо этого, пока носитель в Тени Хаоса вашей армии"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "daemonic-incursion"
      }
    },
    {
      "sid": "b9c84001-f845-4ed2-891d-ff7ea71daf51",
      "kind": "enhancement",
      "name": "Dreaming Crown (Aura)",
      "det": "Legion of Excess",
      "hash": "cb5eae27",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "legion-of-excess"
      }
    },
    {
      "sid": "d3ec0f1f-8345-49e1-bad6-0cd9fd4b13e2",
      "kind": "enhancement",
      "name": "False Majesty (Aura)",
      "det": "Legion of Excess",
      "hash": "e47184fd",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "legion-of-excess"
      }
    },
    {
      "sid": "c6c3e944-461f-4651-a57c-d4d0a8a03ca4",
      "kind": "enhancement",
      "name": "Font of Spores (Aura)",
      "det": "Plague Legion",
      "hash": "e5278c50",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "plague-legion"
      }
    },
    {
      "sid": "bb19b8b3-0999-446a-80b9-da84024bcc61",
      "kind": "enhancement",
      "name": "Neverblade",
      "det": "Scintillating Legion",
      "hash": "bb91fd81",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "scintillating-legion"
      }
    }
  ]
}
