// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "drukhari",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "4e3676ea-791d-4b86-844d-c87af3eccd15",
      "kind": "armyRule",
      "name": "Corsairs and Travelling Players",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "e1eea53b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — allied points allowance"
    },
    {
      "sid": "b1bcd7c8-edc3-4da2-a2c7-796001420f4b",
      "kind": "armyRule",
      "name": "Corsairs and Travelling Players",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "e1eea53b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "duplicate publication of the same rule"
    },
    {
      "sid": "60c93592-228e-4a81-a0c7-46967aacfc1d",
      "kind": "detachmentRule",
      "name": "Exacting Cruelty",
      "det": "Exhibition of Slaughter",
      "ref": {
        "kind": "detachmentRule",
        "det": "exhibition-of-slaughter"
      },
      "hash": "c82b992c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "25d48d63-072e-4bce-98fc-d168ab5a9333",
      "kind": "detachmentRule",
      "name": "Contracted Harvest",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "detachmentRule",
        "det": "kabalite-agonysts"
      },
      "hash": "ec6c46f7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "b46b3339-173c-4bce-b474-33cb0239e5d2",
      "kind": "detachmentRule",
      "name": "Combat Drugs",
      "det": "Spectacle of Spite",
      "hash": "a309181b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Adrenalight is the active Combat Drug",
            "ru": "пока активен боевой наркотик Adrenalight"
          },
          "cond": [
            "drug-adrenalight"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while Hypex is the active Combat Drug",
            "ru": "пока активен боевой наркотик Hypex"
          },
          "cond": [
            "drug-hypex"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Serpentin is the active Combat Drug",
            "ru": "пока активен боевой наркотик Serpentin"
          },
          "cond": [
            "drug-serpentin"
          ]
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Painbringer is the active Combat Drug",
            "ru": "пока активен боевой наркотик Painbringer"
          },
          "cond": [
            "drug-painbringer"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Grave Lotus is the active Combat Drug",
            "ru": "пока активен боевой наркотик Grave Lotus"
          },
          "cond": [
            "drug-grave-lotus"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Splintermind is the active Combat Drug",
            "ru": "пока активен боевой наркотик Splintermind"
          },
          "cond": [
            "drug-splintermind"
          ]
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while Splintermind is the active Combat Drug",
            "ru": "пока активен боевой наркотик Splintermind"
          },
          "cond": [
            "drug-splintermind"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "spectacle-of-spite"
      }
    },
    {
      "sid": "48d18d70-1dcd-455e-9894-a193bea14106",
      "kind": "enhancement",
      "name": "Master Artisan",
      "det": "Covenite Coterie",
      "hash": "898f00ec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        },
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
        "det": "covenite-coterie"
      }
    },
    {
      "sid": "f6e6b1bd-e328-479b-bdaa-9e359bc5af3d",
      "kind": "enhancement",
      "name": "Master Repugnomancer (Aura)",
      "det": "Covenite Coterie",
      "ref": {
        "kind": "enhancement",
        "det": "covenite-coterie"
      },
      "hash": "3149a83e",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of an Aura ability, not of a weapon"
    },
    {
      "sid": "5600dcd0-652a-4078-9d65-266dfff20443",
      "kind": "enhancement",
      "name": "Contempt for Rivals",
      "det": "Kabalite Agonysts",
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-agonysts"
      },
      "hash": "7fb5eb42",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "1b8a36e1-aaf0-4dc9-8d5e-7dc93f9961b4",
      "kind": "enhancement",
      "name": "Towering Arrogance",
      "det": "Kabalite Cartel",
      "hash": "1b9e848e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "kabalite-cartel"
      }
    },
    {
      "sid": "a8e27f43-6f0f-487e-9969-c65087ccdefe",
      "kind": "enhancement",
      "name": "Eye of Spite",
      "det": "Realspace Raiders",
      "hash": "388bc65b",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Attacks and AP improve by 2 instead, for the phase, by spending 1 Pain token when the unit fights",
            "ru": "атаки и пробитие улучшаются на 2 вместо 1 на фазу, если потратить 1 жетон боли при выборе отряда для боя"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "realspace-raiders"
      }
    },
    {
      "sid": "21a18c7b-916b-47d4-a50b-8af59f3c03dc",
      "kind": "enhancement",
      "name": "Morghenna’s Curse",
      "det": "Spectacle of Spite",
      "hash": "6aa214f2",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "spectacle-of-spite"
      }
    }
  ]
}
