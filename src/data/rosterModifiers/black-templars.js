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
      "sid": "b4f947ab-4065-4fb1-9ded-cf85a83d3c31:crusade-ancient",
      "kind": "ability",
      "name": "Crusade Ancient: Martial Honour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "crusade-ancient"
      },
      "hash": "0d3f6477",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 5,
          "when": {
            "en": "for the rest of the battle once its unit destroyed a unit in melee, while not Battle-shocked",
            "ru": "до конца битвы, если отряд уничтожил врага в ближнем бою, пока не Battle-shocked"
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
      "sid": "508d9286-33e3-496a-8825-1bfe5c24b442:emperors-champion",
      "kind": "ability",
      "name": "Emperor’s Champion: Sigismund’s Heir",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "emperors-champion"
      },
      "hash": "e0d9dbc3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle, while engaged with a CHARACTER and this ability is used",
            "ru": "раз за битву, в бою с CHARACTER, если способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e1a9ec64-4b70-47ba-aa5c-c1ff935a2c08:gladiator-valiant",
      "kind": "ability",
      "name": "Gladiator Valiant: Priority Target Acquisition",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gladiator-valiant"
      },
      "hash": "89111ddd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a8425c53-a82f-402a-a08c-863cdf87916d:high-marshal-helbrecht",
      "kind": "ability",
      "name": "High Marshal Helbrecht: Crusade of Wrath",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "high-marshal-helbrecht"
      },
      "hash": "08b2836b",
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
      "sid": "fc05efb4-4534-4b7c-8989-6d1c5338a76e:marshal",
      "kind": "ability",
      "name": "Marshal: Pious Fervour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "marshal"
      },
      "hash": "3daebaae",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Master-crafted power weapon"
          },
          "when": {
            "en": "per enemy unit within 6\", up to +3",
            "ru": "за каждый вражеский отряд в 6\", максимум +3"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "15c0488f-a9ec-4288-a4c4-7bfba664628b",
      "kind": "allegiance",
      "name": "Headhunter Task Force Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "headhunter-task-force-keywords",
        "opt": "Character"
      },
      "hash": "958d34d8",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "8e6d6b91-009d-47d1-81d7-390c60556cb3",
      "kind": "armyRule",
      "name": "Templar Vows",
      "det": null,
      "hash": "335409cc",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "6c1960c0-fdef-41a7-a017-cda5d322bd74",
      "kind": "detachmentRule",
      "name": "Shock and Awe",
      "det": "Godhammer Assault Force",
      "hash": "fa300e3c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "godhammer-assault-force"
      }
    },
    {
      "sid": "06e81511-2a0d-49db-8d18-be2c20c5792f",
      "kind": "detachmentRule",
      "name": "Faith-fuelled Resolve",
      "det": "Marshal's Household",
      "ref": {
        "kind": "detachmentRule",
        "det": "marshals-household"
      },
      "hash": "eb5de0af",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "741a30dc-8a63-45a5-8b27-9ba235c49bda",
      "kind": "enhancement",
      "name": "Incendiary Animus",
      "det": "Companions of Vehemence",
      "hash": "384b0cf5",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "companions-of-vehemence"
      }
    },
    {
      "sid": "44d03a4a-13a9-494e-8769-269187496002",
      "kind": "enhancement",
      "name": "Oathbound Exemplar",
      "det": "Companions of Vehemence",
      "hash": "d3bb5f33",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "companions-of-vehemence"
      }
    },
    {
      "sid": "69ab0beb-af42-4edc-a124-4e2b99fd3a1a",
      "kind": "enhancement",
      "name": "Paragon of Fury",
      "det": "Godhammer Assault Force",
      "hash": "922fa85d",
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per allocated melee attack, if the bearer disembarked from a Transport this turn",
            "ru": "за назначенную атаку ближнего боя, если носитель в этом ходу высадился из транспорта"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "godhammer-assault-force"
      }
    },
    {
      "sid": "2deaa998-e999-4cb4-933e-a1840de3d2a0",
      "kind": "enhancement",
      "name": "Guiding Omens",
      "det": "The Living Miracle",
      "ref": {
        "kind": "enhancement",
        "det": "the-living-miracle"
      },
      "hash": "480d0dcb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if Vision of Momentous Brutality is among the three abilities chosen at the start of the first battle round",
            "ru": "если Vision of Momentous Brutality — одна из трёх способностей, выбранных в начале первого раунда"
          },
          "cond": [
            "vision-momentous-brutality"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "Instrument of the God-Emperor, once per battle, while engaged with an enemy Character",
            "ru": "Instrument of the God-Emperor, раз за битву, пока модель в бою с вражеским Character"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8f0c23c2-bec3-4dce-916e-ae9164dfe77f",
      "kind": "enhancement",
      "name": "Consecrating Aura",
      "det": "Vindication Task Force",
      "hash": "8875c16b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "vindication-task-force"
      }
    },
    {
      "sid": "eef35b1c-9069-43b3-a82d-a795edfef746",
      "kind": "enhancement",
      "name": "Warden of Honour",
      "det": "Vindication Task Force",
      "hash": "685d2c48",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "vindication-task-force"
      }
    },
    {
      "sid": "0a728a13-038e-4fa0-aca8-fc3a6b479c12",
      "kind": "enhancement",
      "name": "Benediction of Fury",
      "det": "Wrathful Procession",
      "ref": {
        "kind": "enhancement",
        "det": "wrathful-procession"
      },
      "hash": "11e13cab",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        }
      ]
    },
    {
      "sid": "7902554f-4d97-4939-823f-12d54bc02d4c",
      "kind": "stratagem",
      "name": "For The Emperor’s Honour!",
      "det": "Companions of Vehemence",
      "ref": {
        "kind": "stratagem",
        "det": "companions-of-vehemence",
        "name": "For The Emperor’s Honour!"
      },
      "hash": "10391964",
      "ver": 925,
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
      "sid": "f270d2df-d8b5-4d1e-a01d-e09812358568",
      "kind": "stratagem",
      "name": "Blessed Hull",
      "det": "Godhammer Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "godhammer-assault-force",
        "name": "Blessed Hull"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2822b996-2f83-424b-bca4-fc42ece2d2d5",
      "kind": "stratagem",
      "name": "Condemnatory Info-Screed",
      "det": "Godhammer Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "godhammer-assault-force",
        "name": "Condemnatory Info-Screed"
      },
      "hash": "abe09f4a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "24989e27-34b1-4b31-9ab4-296a7eb5c79e",
      "kind": "stratagem",
      "name": "Slayers of Abominations",
      "det": "Marshal's Household",
      "ref": {
        "kind": "stratagem",
        "det": "marshals-household",
        "name": "Slayers of Abominations"
      },
      "hash": "c1571800",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
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
      "sid": "ee54adfc-1175-4034-b181-84f617c20421",
      "kind": "stratagem",
      "name": "Litanies of Purgation",
      "det": "Vindication Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "vindication-task-force",
        "name": "Litanies of Purgation"
      },
      "hash": "053cd6cc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while either unit is within range of an objective marker",
            "ru": "пока один из отрядов в зоне objective"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d4b7ec66-5516-44a7-9511-894b53d7a8b7",
      "kind": "stratagem",
      "name": "Reclaim Our Honour!",
      "det": "Vindication Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "vindication-task-force",
        "name": "Reclaim Our Honour!"
      },
      "hash": "fb944b4c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "680055d9-0ea3-473b-8b1b-2ac08fa0ed40",
      "kind": "stratagem",
      "name": "Spoor of the Unholy",
      "det": "Vindication Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "vindication-task-force",
        "name": "Spoor of the Unholy"
      },
      "hash": "6e1872ca",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "6391df5a-5af9-4492-83ae-ab84867a65ed",
      "kind": "stratagem",
      "name": "Castigate the Demagogues",
      "det": "Wrathful Procession",
      "ref": {
        "kind": "stratagem",
        "det": "wrathful-procession",
        "name": "Castigate the Demagogues"
      },
      "hash": "bf79a709",
      "ver": 925,
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
      "sid": "ba8c0eec-7773-4981-82cf-8f29888b15e5",
      "kind": "stratagem",
      "name": "Rite of Perfervid Wrath",
      "det": "Wrathful Procession",
      "ref": {
        "kind": "stratagem",
        "det": "wrathful-procession",
        "name": "Rite of Perfervid Wrath"
      },
      "hash": "d7306b4c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "4376131c-0673-4ce5-84e3-6bda75cd6fd6:impulsor",
      "kind": "wargear",
      "name": "Impulsor: Shield Dome",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "impulsor",
        "item": "shield dome"
      },
      "hash": "a490870b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ]
    }
  ]
}
