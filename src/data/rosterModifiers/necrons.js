// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "necrons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "71124c51-fb03-44ee-acf1-4e5f6b6d5c13",
      "kind": "detachmentRule",
      "name": "Territorial Imperatives",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "02b31bb5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while selected at the end of your Command phase, until the start of your next",
            "ru": "пока отряд выбран в конце вашей командной фазы, до начала следующей"
          },
          "cond": [
            "unit-selected-command-phase"
          ]
        }
      ]
    },
    {
      "sid": "c8e67c94-634c-45a1-b354-fe1d1d0edf8a",
      "kind": "detachmentRule",
      "name": "Annihilation Protocol",
      "det": "Annihilation Legion",
      "hash": "99ac616f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Destroyer Cult units only, per ranged attack against the closest eligible target",
            "ru": "только отряды Destroyer Cult, за стрелковую атаку по ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "0819b28a-215e-4a8f-b78e-c857db54aa64",
      "kind": "detachmentRule",
      "name": "Command Protocols",
      "det": "Awakened Dynasty",
      "hash": "da8aa7b0",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "2f40d32d-d52c-4fea-881e-9f3afd245708",
      "kind": "detachmentRule",
      "name": "Technosorcerous Augmentations",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "detachmentRule",
        "det": "cryptek-conclave"
      },
      "hash": "3c086d0c",
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
          "value": "ANTI-INFANTRY 3+",
          "when": {
            "en": "in your Shooting phase, if that ability is the one selected for the unit",
            "ru": "в вашей фазе стрельбы, если для отряда выбрана именно эта способность"
          },
          "cond": [
            "phase-shooting"
          ]
        }
      ]
    },
    {
      "sid": "da5c3d84-9fb3-4ea1-8e3c-c8d34d6100a7",
      "kind": "detachmentRule",
      "name": "Cold Fervour",
      "det": "Cursed Legion",
      "hash": "f2aad384",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "scope": 1,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "after a Destroyer Cult unit destroys a unit, until the end of the turn",
            "ru": "после того как юнит Destroyer Cult уничтожит юнит, до конца хода"
          },
          "cond": [
            "cold-fervour"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "534bef73-8f42-4c3b-ae80-2ad4106db41a",
      "kind": "detachmentRule",
      "name": "Hypermotility Protocols",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "detachmentRule",
        "det": "hand-of-the-dynasty"
      },
      "hash": "965e4fb5",
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
      "sid": "90b80a56-d420-47f0-85b1-405a01e4c0d3",
      "kind": "detachmentRule",
      "name": "Worthy Foes",
      "det": "Obeisance Phalanx",
      "hash": "f43f3287",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "obeisance-phalanx"
      }
    },
    {
      "sid": "49d49ff2-3cb7-488d-bab6-5f046700f91f",
      "kind": "detachmentRule",
      "name": "Cosmic Distortion",
      "det": "Pantheon of Woe",
      "hash": "2e60a45d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "pantheon-of-woe"
      }
    },
    {
      "sid": "dec1adcf-64dc-4e7a-b535-73fc56cb305c",
      "kind": "detachmentRule",
      "name": "Relentless Onslaught",
      "det": "Starshatter Arsenal",
      "hash": "66a38795",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "starshatter-arsenal"
      }
    },
    {
      "sid": "23b709b7-1228-490b-98fe-7f039d5cd593",
      "kind": "detachmentRule",
      "name": "Empowered Engines",
      "det": "The Phaeron's Armoury",
      "ref": {
        "kind": "detachmentRule",
        "det": "the-phaerons-armoury"
      },
      "hash": "92336869",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": null
        }
      ]
    },
    {
      "sid": "78e7ca8e-1321-4a1c-9b04-2383ca1a2572",
      "kind": "enhancement",
      "name": "Metalline Might",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "69c38e3b",
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
      ]
    },
    {
      "sid": "90ecb256-bc18-494a-89a9-57bba7ac455b",
      "kind": "enhancement",
      "name": "Unblemished Legions",
      "det": "Amonhotekh’s Guard",
      "ref": null,
      "hash": "8ee2fd82",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null
        },
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
      "sid": "f8e6d080-6a6c-432b-8196-e26598cd7fda",
      "kind": "enhancement",
      "name": "Ingrained Superiority",
      "det": "Annihilation Legion",
      "hash": "ca631e3a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack that scores a Critical Wound",
            "ru": "за атаку с критическим ранением"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "a6e993f2-c457-4c04-b5f9-c1a7deda2c37",
      "kind": "enhancement",
      "name": "Phasal Subjugator (Aura)",
      "det": "Awakened Dynasty",
      "hash": "b51daed7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "6e0e59cb-c41f-4cb0-a009-c962aad3d392",
      "kind": "enhancement",
      "name": "Gauntlet of Compression",
      "det": "Cryptek Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "cryptek-conclave"
      },
      "hash": "dd08044f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": null
        }
      ]
    },
    {
      "sid": "a17450e0-31f1-4b21-8952-5ea5c5bf7496",
      "kind": "enhancement",
      "name": "Destroyer Ankh",
      "det": "Cursed Legion",
      "hash": "c15dd6d4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Destroyer Cult",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "767a6e78-8eda-4299-ad7f-e0614152a40d",
      "kind": "enhancement",
      "name": "Mark of the Nekrosor",
      "det": "Cursed Legion",
      "hash": "d0cc07b6",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "597b7938-15dd-4b21-adf6-c4c544287010",
      "kind": "enhancement",
      "name": "Murdermind",
      "det": "Cursed Legion",
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      },
      "hash": "8eb42dfe",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Destroyer Cult",
          "when": null
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": null
        }
      ]
    },
    {
      "sid": "28910499-26bf-4cf0-823a-17462276ea57",
      "kind": "enhancement",
      "name": "Tools of Dominion (Upgrade)",
      "det": "Hand of the Dynasty",
      "ref": {
        "kind": "enhancement",
        "det": "hand-of-the-dynasty"
      },
      "hash": "b1cd18ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": null
        }
      ]
    },
    {
      "sid": "dedd4e7b-9ddc-4edd-8a45-512061651b17",
      "kind": "enhancement",
      "name": "Hyperspatial Transfer Node",
      "det": "Hypercrypt Legion",
      "ref": {
        "kind": "enhancement",
        "det": "hypercrypt-legion"
      },
      "hash": "ec5e298e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time the bearer's unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит носителя совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "fe31d690-e8f6-4014-a53e-7b3db86f5a6e",
      "kind": "enhancement",
      "name": "Unflinching Will",
      "det": "Obeisance Phalanx",
      "ref": {
        "kind": "enhancement",
        "det": "obeisance-phalanx"
      },
      "hash": "5b96496f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "c173a0bd-085d-42db-ac95-5c7ab17a267f",
      "kind": "enhancement",
      "name": "Deepening Madness (Upgrade)",
      "det": "Skyshroud Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "skyshroud-spearhead"
      },
      "hash": "a4b54ef1",
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
      "sid": "dec27f61-8026-4986-872b-5ad9c8b34084",
      "kind": "enhancement",
      "name": "Miniaturised Nebuloscope",
      "det": "Starshatter Arsenal",
      "ref": {
        "kind": "enhancement",
        "det": "starshatter-arsenal"
      },
      "hash": "93fc2b38",
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
    }
  ]
}
