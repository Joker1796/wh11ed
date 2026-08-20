// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "adeptus-mechanicus",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "94eb8c9d-a20e-4851-903e-459df9d80a22",
      "kind": "armyRule",
      "name": "Doctrina Imperatives",
      "det": null,
      "hash": "205b2058",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Protector Imperative is active for your army",
            "ru": "пока для армии активен Protector Imperative"
          },
          "cond": [
            "imperative-protector"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Conqueror Imperative is active for your army",
            "ru": "пока для армии активен Conqueror Imperative"
          },
          "cond": [
            "imperative-conqueror"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack under the Conqueror Imperative, if the unit is Battleline or within 6\" of a friendly Battleline unit",
            "ru": "за атаку при Conqueror Imperative, если отряд Battleline или в 6\" от дружественного отряда Battleline"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "53a34500-653b-4767-ac3b-c23a2c84c383",
      "kind": "armyRule",
      "name": "Doctrina Imperatives",
      "det": null,
      "hash": "5658f6b2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Protector Imperative is active for your army",
            "ru": "пока для армии активен Protector Imperative"
          },
          "cond": [
            "imperative-protector"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Conqueror Imperative is active for your army",
            "ru": "пока для армии активен Conqueror Imperative"
          },
          "cond": [
            "imperative-conqueror"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack under the Conqueror Imperative, if the unit is Battleline or within 6\" of a friendly Battleline unit",
            "ru": "за атаку при Conqueror Imperative, если отряд Battleline или в 6\" от дружественного отряда Battleline"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "fb242fc6-ca2a-4370-b362-03742b21fb93",
      "kind": "detachmentRule",
      "name": "Cyber-psalm Programming",
      "det": "Cohort Cybernetica",
      "hash": "f21761c4",
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
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "unless the unit is Battle-shocked",
            "ru": "если отряд не Battle-shocked"
          },
          "cond": [
            "unit-not-battle-shocked"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cohort-cybernetica"
      }
    },
    {
      "sid": "46d34802-7b56-4948-8651-f39dae58a197",
      "kind": "detachmentRule",
      "name": "Benedictions of the Omnissiah",
      "det": "Data-psalm Conclave",
      "hash": "285b0847",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "under the Panegyric Procession Benediction, per ranged attack within half range",
            "ru": "при благословении Panegyric Procession, за стрелковую атаку в пределах половины дальности"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "under the Citation in Savagery Benediction, if the unit made a Charge move this turn",
            "ru": "при благословении Citation in Savagery, если отряд совершил чардж в этом ходу"
          },
          "cond": [
            "benediction-citation-in-savagery",
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "under the Citation in Savagery Benediction, if the unit made a Charge move this turn",
            "ru": "при благословении Citation in Savagery, если отряд совершил чардж в этом ходу"
          },
          "cond": [
            "benediction-citation-in-savagery",
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "data-psalm-conclave"
      }
    },
    {
      "sid": "d2354f79-c195-4cb4-bcd7-0e783201902c",
      "kind": "detachmentRule",
      "name": "Noospheric Transference",
      "det": "Haloscreed Battle Clade",
      "hash": "0de92e95",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for a unit given the Halo Override keyword with the Electromotive Energisation ability",
            "ru": "для отряда, получившего Halo Override со способностью Electromotive Energisation"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for a unit given the Halo Override keyword with the Microactuator Bracing ability",
            "ru": "для отряда, получившего Halo Override со способностью Microactuator Bracing"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "haloscreed-battle-clade"
      }
    },
    {
      "sid": "a99aefbc-1a7f-4452-9889-867c64a9d153",
      "kind": "detachmentRule",
      "name": "Cyber-static Canticles",
      "det": "Luminen Auto-Choir",
      "ref": {
        "kind": "detachmentRule",
        "det": "luminen-auto-choir"
      },
      "hash": "e0235ebc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        }
      ]
    },
    {
      "sid": "90b8de0c-70e0-4aae-85b7-0b45e64ecbf6",
      "kind": "enhancement",
      "name": "Belicosa-class Capacitor Vanes",
      "det": "Eradication Cohort",
      "hash": "d52a9d4c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "eradication-cohort"
      }
    },
    {
      "sid": "9fb4f320-8870-48c5-9e73-76725e9691fa",
      "kind": "enhancement",
      "name": "Martial Signatum Amplificator",
      "det": "Eradication Cohort",
      "ref": {
        "kind": "enhancement",
        "det": "eradication-cohort"
      },
      "hash": "a7771d15",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Skitarii",
          "when": null
        }
      ]
    },
    {
      "sid": "36413881-7693-4d35-b23a-27a39aedfe12",
      "kind": "enhancement",
      "name": "Omnissiah’s Fury",
      "det": "Eradication Cohort",
      "hash": "1105f866",
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
        "det": "eradication-cohort"
      }
    },
    {
      "sid": "f129d8e9-3079-4b45-bf8c-74e62b1d5eb8",
      "kind": "enhancement",
      "name": "Genetor",
      "det": "Explorator Maniple",
      "hash": "69a631a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while the bearer leads the unit and it is within range of your Acquisition objective marker",
            "ru": "пока носитель ведёт отряд и тот в радиусе вашего маркера Acquisition"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "explorator-maniple"
      }
    },
    {
      "sid": "0cb351b2-a2c6-4fdf-964f-83281828a311",
      "kind": "enhancement",
      "name": "Logis",
      "det": "Explorator Maniple",
      "hash": "5d6c4484",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "explorator-maniple"
      }
    },
    {
      "sid": "246ea89e-51d1-4660-92bd-64baaac14039",
      "kind": "enhancement",
      "name": "Inloaded Lethality",
      "det": "Haloscreed Battle Clade",
      "hash": "87030479",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
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
        "det": "haloscreed-battle-clade"
      }
    },
    {
      "sid": "0a6da199-5297-4eb9-b320-5ab60423d571",
      "kind": "enhancement",
      "name": "Sanctified Ordnance",
      "det": "Haloscreed Battle Clade",
      "ref": {
        "kind": "enhancement",
        "det": "haloscreed-battle-clade"
      },
      "hash": "18087725",
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
      "sid": "2a96585b-c6fd-4271-b617-56698f4df264",
      "kind": "enhancement",
      "name": "Transoracular Dyad Wafers",
      "det": "Haloscreed Battle Clade",
      "ref": {
        "kind": "enhancement",
        "det": "haloscreed-battle-clade"
      },
      "hash": "fc5884dd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Halo Override",
          "when": {
            "en": "while the bearer is attached to a Kastelan Robots unit",
            "ru": "пока носитель присоединён к отряду Kastelan Robots"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c434dc26-c687-4677-b72d-c879da0c169b",
      "kind": "enhancement",
      "name": "Empowered Mechanisms",
      "det": "Purge Corps Deltic-9",
      "ref": null,
      "hash": "a44941f8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 4+",
          "when": null
        }
      ]
    }
  ]
}
