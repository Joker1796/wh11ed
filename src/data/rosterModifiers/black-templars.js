// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "black-templars",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "59d945ec-804c-4102-a605-56a0118a71cf:chaplain-grimaldus",
      "kind": "ability",
      "name": "Chaplain Grimaldus: Banner of the Emperor Victorious",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-grimaldus",
        "set": "Temple Relics",
        "pickLimit": 1
      },
      "hash": "b0edcf64",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d00defdb-5b72-458d-9466-ef66920ccc28:chaplain-grimaldus",
      "kind": "ability",
      "name": "Chaplain Grimaldus: Column from the Major Altar",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-grimaldus",
        "set": "Temple Relics",
        "pickLimit": 1
      },
      "hash": "4b39a6c7",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "c92df324-a537-4627-8ce0-047ca504a13f:chaplain-grimaldus",
      "kind": "ability",
      "name": "Chaplain Grimaldus: Water from the Stoup of Elucidation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-grimaldus",
        "set": "Temple Relics",
        "pickLimit": 1
      },
      "hash": "f6935370",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "15934067-ee3a-4a27-be55-e48174fb7c50:crusade-ancient",
      "kind": "ability",
      "name": "Crusade Ancient: Martial Honour (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "crusade-ancient"
      },
      "hash": "921a241c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 5,
          "when": {
            "en": "once per battle, for the rest of the battle after this unit's melee attacks destroyed an enemy unit",
            "ru": "раз за битву, до конца битвы после того, как атаки ближнего боя отряда уничтожили вражеский отряд"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "779876f3-6817-4bb8-92c1-291b6af94dd5:emperor-s-champion-vedrenn",
      "kind": "ability",
      "name": "Emperor's Champion Vedrenn: Deft Riposte",
      "det": null,
      "ref": null,
      "hash": "962a1086",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3c0da470-0cea-498b-bd7f-4cfd39096821:gladiator-reaper",
      "kind": "ability",
      "name": "Gladiator Reaper: Reaping Tally",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gladiator-reaper"
      },
      "hash": "b78ddc8d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets other than MONSTER and VEHICLE",
            "ru": "по целям кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d4c4e50a-1e1d-4600-879f-6796c47a3be9:gladiator-valiant",
      "kind": "ability",
      "name": "Gladiator Valiant: Priority Target Acquisition",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gladiator-valiant"
      },
      "hash": "48e040f9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against targets within 12\"",
            "ru": "по целям в пределах 12\""
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3a103fb4-037a-46de-a6e2-19912dd379ab:high-marshal-helbrecht",
      "kind": "ability",
      "name": "High Marshal Helbrecht: Crusade of Wrath",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "high-marshal-helbrecht"
      },
      "hash": "606ee9a2",
      "ver": 963,
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
          "value": 1,
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "80540ddc-3e20-40cd-9acb-2bddfe628e63:marshal",
      "kind": "ability",
      "name": "Marshal: Pious Fervour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "marshal"
      },
      "hash": "9f8c4a8e",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "when this unit is selected to fight, per enemy unit within 6\" of this model, up to +3",
            "ru": "когда отряд выбран для боя, за каждый вражеский отряд в пределах 6\" от модели, максимум +3"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3862d461-661e-4a36-a62f-960ed8c8d1b3",
      "kind": "armyRule",
      "name": "Combat Doctrines",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "4b1af9f6",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while the Devastator Doctrine is active for this unit",
            "ru": "пока для отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        }
      ]
    },
    {
      "sid": "8e6d6b91-009d-47d1-81d7-390c60556cb3",
      "kind": "armyRule",
      "name": "Templar Vows",
      "det": null,
      "hash": "335409cc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Accept any Challenge Vow is active, if the attack’s Strength is not greater than the target’s Toughness",
            "ru": "при обете Accept any Challenge, если S атаки не больше T цели"
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
      "sid": "098752f4-cb9f-49b0-99b0-b43acb2eaae9",
      "kind": "detachmentRule",
      "name": "Faith-fuelled Resolve",
      "det": "Marshal's Household",
      "ref": {
        "kind": "detachmentRule",
        "det": "marshals-household"
      },
      "hash": "6df3f2ce",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, while this unit is within range of an objective",
            "ru": "в фазе боя, пока отряд в зоне объекта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3297f350-ebf3-408d-b23c-bc4dd7a46806",
      "kind": "detachmentRule",
      "name": "Templar Vows",
      "det": "Vow-sworn Crusaders",
      "ref": {
        "kind": "detachmentRule",
        "det": "vow-sworn-crusaders"
      },
      "hash": "2a40112f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "while Abhor the Witch, Destroy the Witch is the selected Vow, against PSYKER targets",
            "ru": "пока выбран обет Abhor the Witch, Destroy the Witch, по целям PSYKER"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while Abhor the Witch, Destroy the Witch is the selected Vow, against PSYKER targets",
            "ru": "пока выбран обет Abhor the Witch, Destroy the Witch, по целям PSYKER"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while Accept Any Challenge, No Matter the Odds is the selected Vow, against a target whose T is greater than this unit's S",
            "ru": "пока выбран обет Accept Any Challenge, No Matter the Odds, по цели с T больше S отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f5cbc8d3-b4dd-46d6-91cd-1932a8619287",
      "kind": "enhancement",
      "name": "Inheritors of Sigismund (Upgrade)",
      "det": "Marshal's Household",
      "ref": {
        "kind": "enhancement",
        "det": "marshals-household"
      },
      "hash": "f078ef24",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        }
      ]
    },
    {
      "sid": "8a090713-6f7b-4c83-955e-9753324d5366",
      "kind": "enhancement",
      "name": "Incendiary Animus",
      "det": "Vow-sworn Crusaders",
      "ref": {
        "kind": "enhancement",
        "det": "vow-sworn-crusaders"
      },
      "hash": "1bb95d08",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "9fc487e7-0a5d-4d0f-ab51-c4b81cf25fe2",
      "kind": "enhancement",
      "name": "Zealous Vanguard",
      "det": "Vow-sworn Crusaders",
      "ref": {
        "kind": "enhancement",
        "det": "vow-sworn-crusaders"
      },
      "hash": "ab39e72d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "bc719a21-f0f4-4a42-81cf-74be4ac9d9ed",
      "kind": "stratagem",
      "name": "Avowed Destruction",
      "det": "Fist of the God-Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "fist-of-the-god-emperor",
        "name": "Avowed Destruction"
      },
      "hash": "d046e51a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while this stratagem is in force, if [LETHAL HITS] is the option chosen",
            "ru": "пока действует стратагема, если выбран вариант [LETHAL HITS]"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force, if [SUSTAINED HITS 1] is the option chosen",
            "ru": "пока действует стратагема, если выбран вариант [SUSTAINED HITS 1]"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "18cb537f-f7a5-4b99-b3e6-cc0307132a17",
      "kind": "stratagem",
      "name": "Slayers of Abominations",
      "det": "Marshal's Household",
      "ref": {
        "kind": "stratagem",
        "det": "marshals-household",
        "name": "Slayers of Abominations"
      },
      "hash": "c1571800",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force, against MONSTER or VEHICLE targets",
            "ru": "пока действует стратагема, по целям MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "3049dd10-948d-4042-b610-380a95a659d2",
      "kind": "stratagem",
      "name": "For the Emperor's Honour!",
      "det": "Vow-sworn Crusaders",
      "ref": {
        "kind": "stratagem",
        "det": "vow-sworn-crusaders",
        "name": "For the Emperor's Honour!"
      },
      "hash": "bf79a709",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      "sid": "41258f7f-dee3-4065-93f5-83774b5da820",
      "kind": "stratagem",
      "name": "Come To Their Aid",
      "det": "Vow-Sworn of Vedrenn",
      "ref": null,
      "hash": "cc14164b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c714807c-7a5d-4b53-a1cc-a4fc6f28fd1e",
      "kind": "stratagem",
      "name": "Heavy Strikes",
      "det": "Vow-Sworn of Vedrenn",
      "ref": null,
      "hash": "b5bedc21",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against MONSTER or VEHICLE targets",
            "ru": "против целей MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "64d82cf9-78be-4f8b-a123-c65c5d9d359c:impulsor",
      "kind": "wargear",
      "name": "Impulsor: Orbital Comms Array",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "impulsor",
        "item": "orbital comms array"
      },
      "hash": "a8a48d45",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    }
  ]
}
