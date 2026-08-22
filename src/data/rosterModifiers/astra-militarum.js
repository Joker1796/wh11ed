// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "astra-militarum",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "e42730d6-21b4-4166-ba64-964869fc997a:aegis-defence-line",
      "kind": "ability",
      "name": "Aegis Defence Line: Defence Line",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aegis-defence-line"
      },
      "hash": "e83499ed",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "08b3225e-bcec-4fae-9468-2d9074112dd4:bullgryn-squad",
      "kind": "ability",
      "name": "Bullgryn Squad: Wall of Muscle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bullgryn-squad"
      },
      "hash": "6903aaca",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "48a44349-782e-4f73-b49e-92687089533b:cadian-castellan",
      "kind": "ability",
      "name": "Cadian Castellan: Senior Officer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cadian-castellan"
      },
      "hash": "76c79108",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "6dd38dcc-c4f1-4ea9-8580-ff2c3bc7f579:catachan-command-squad",
      "kind": "ability",
      "name": "Catachan Command Squad: Gung-ho Command",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "catachan-command-squad"
      },
      "hash": "49344c1f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this unit contains an OFFICER",
            "ru": "пока в отряде есть OFFICER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "da4fb92f-a7c1-40f2-87b1-49fa3b267967:catachan-jungle-fighters",
      "kind": "ability",
      "name": "Catachan Jungle Fighters: Jungle Fighters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "catachan-jungle-fighters"
      },
      "hash": "7784b290",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4b4cda10-99d6-4df7-b8d2-4e087557d379:centaur-rsv",
      "kind": "ability",
      "name": "Centaur RSV: Rapid Strike Vehicle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "centaur-rsv"
      },
      "hash": "f98b988c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per 3 models embarked, while not Battle-shocked",
            "ru": "за каждые 3 модели на борту, пока не Battle-shocked"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6a0a7444-b91a-4ce4-8215-fb04d764ab7c:death-korps-of-krieg",
      "kind": "ability",
      "name": "Death Korps of Krieg: Grim Demeanour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "death-korps-of-krieg"
      },
      "hash": "496e063b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d627eacc-bd80-4426-b40f-f10912926b6d:drayden-s-lance-command-squad",
      "kind": "ability",
      "name": "Drayden's Lance Command Squad: Regimental Standard",
      "det": null,
      "ref": null,
      "hash": "1ff3a604",
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
      "sid": "6cbbd413-470c-423c-8ca9-13eb380bd682:field-ordnance-battery",
      "kind": "ability",
      "name": "Field Ordnance Battery: Rearm, Reload, Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "field-ordnance-battery"
      },
      "hash": "d4552c8a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "only": {
            "tag": "HEAVY"
          },
          "when": {
            "en": "while under an Order, having Remained Stationary",
            "ru": "под приказом, если остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "f05d9118-3d4f-4356-bffd-dd7693bc5d92:leman-russ-eradicator",
      "kind": "ability",
      "name": "Leman Russ Eradicator: Urban Warfare",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "leman-russ-eradicator"
      },
      "hash": "8ccaff62",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "351fe1e2-238c-4149-ad34-22cf5b861d35:leman-russ-executioner",
      "kind": "ability",
      "name": "Leman Russ Executioner: Gung-ho Executioners",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "leman-russ-executioner"
      },
      "hash": "0abc0d99",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fab2bea2-2e0e-46c5-9542-a5a7c5f3ee94:leman-russ-exterminator",
      "kind": "ability",
      "name": "Leman Russ Exterminator: Withering Hail",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "leman-russ-exterminator"
      },
      "hash": "17edce82",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6299b4be-a5b7-4a5e-9989-3c89e2e79694:lord-marshal-dreir",
      "kind": "ability",
      "name": "Lord Marshal Dreir: Leading The Charge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-marshal-dreir"
      },
      "hash": "6a6c4936",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "until the end of a turn its unit made a Charge move",
            "ru": "до конца хода, в котором отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "until the end of a turn its unit made a Charge move",
            "ru": "до конца хода, в котором отряд совершил Charge"
          },
          "cond": [
            "unit-charged"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "ff7a4560-5c66-40ed-9890-e145a5612d8e:manticore",
      "kind": "ability",
      "name": "Manticore: Furious Barrage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "manticore"
      },
      "hash": "ee8bd009",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7e6e8ed7-a90a-4161-8315-75be03893b26:militarum-tempestus-command-squad",
      "kind": "ability",
      "name": "Militarum Tempestus Command Squad: Tempestor Prime",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "militarum-tempestus-command-squad"
      },
      "hash": "49bb1499",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit contains a Tempestor Prime",
            "ru": "пока в отряде есть Tempestor Prime"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "eaf8c6e0-b388-4ea1-9528-4e7e915cc617:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: War Hymns",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
      },
      "hash": "9d48081a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "2bc28ee1-1701-4d6b-aae1-47d5753a0728:ogryn-squad",
      "kind": "ability",
      "name": "Ogryn Squad: Point-blank Barrage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ogryn-squad"
      },
      "hash": "53aaa79e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against the closest eligible target",
            "ru": "против ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ef45d7dd-4980-4bb0-a26d-1489424d91b7:primaris-psyker",
      "kind": "ability",
      "name": "Primaris Psyker: Psychic Barrier",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "primaris-psyker"
      },
      "hash": "b426ff9f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "on a 2+ at the start of your opponent's Shooting phase",
            "ru": "на 2+ в начале фазы стрельбы оппонента"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "76861981-15ee-4efa-84a1-7302daa8e7a6:tech-priest-enginseer",
      "kind": "ability",
      "name": "Tech-Priest Enginseer: Omnissiah’s Blessing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-enginseer"
      },
      "hash": "35bf3335",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4553de7a-0245-4160-ab0d-8cdc58b86136:tech-priest-enginseer",
      "kind": "ability",
      "name": "Tech-Priest Enginseer: Vengeance for the Omnissiah",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-enginseer"
      },
      "hash": "20517a1b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "6",
          "only": {
            "name": "Enginseer axe"
          },
          "when": {
            "en": "for the rest of the battle, once a friendly VEHICLE was destroyed within 12\"",
            "ru": "до конца битвы, если дружественный VEHICLE уничтожен в 12\""
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3b10e68b-0230-4669-a0a3-f0c29feaa3b4",
      "kind": "allegiance",
      "name": "Steel Hammer Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "steel-hammer-keywords",
        "opt": "Character"
      },
      "hash": "6d141cb4",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "1a356af1-830d-41dc-98c2-e3da02b19021",
      "kind": "armyRule",
      "name": "Voice of Command",
      "det": null,
      "hash": "0dcb714d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while affected by the «Move! Move! Move!» Order",
            "ru": "пока на отряд действует приказ «Move! Move! Move!»"
          },
          "cond": [
            "order-move-move-move"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while affected by the «Fix Bayonets!» Order",
            "ru": "пока на отряд действует приказ «Fix Bayonets!»"
          },
          "cond": [
            "order-fix-bayonets"
          ]
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while affected by the «Take Aim!» Order",
            "ru": "пока на отряд действует приказ «Take Aim!»"
          },
          "cond": [
            "order-take-aim"
          ]
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while affected by the «First Rank, Fire! Second Rank, Fire!» Order — Rapid Fire weapons only",
            "ru": "пока на отряд действует приказ «First Rank, Fire! Second Rank, Fire!» — только для оружия Rapid Fire"
          },
          "cond": [
            "order-first-rank-fire"
          ],
          "only": {
            "tag": "RAPID FIRE"
          }
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while affected by the «Take Cover!» Order — never better than 3+",
            "ru": "пока на отряд действует приказ «Take Cover!» — не лучше 3+"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while affected by the «Duty and Honour!» Order",
            "ru": "пока на отряд действует приказ «Duty and Honour!»"
          },
          "cond": [
            "order-duty-and-honour"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while affected by the «Duty and Honour!» Order",
            "ru": "пока на отряд действует приказ «Duty and Honour!»"
          },
          "cond": [
            "order-duty-and-honour"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "19c61e87-4eec-4e4c-ba37-e6dfcb4aa815",
      "kind": "detachmentRule",
      "name": "Fire Zone Purge",
      "det": "Bridgehead Strike",
      "ref": {
        "kind": "detachmentRule",
        "det": "bridgehead-strike"
      },
      "hash": "67541d4d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "BATTLELINE",
          "when": {
            "en": "if a Militarum Tempestus Officer model is your Warlord",
            "ru": "если ваш WARLORD — модель Militarum Tempestus Officer"
          },
          "cond": [
            "never"
          ]
        },
        {
          "scope": 0,
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if a Militarum Tempestus Officer model is your Warlord",
            "ru": "если ваш WARLORD — модель Militarum Tempestus Officer"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "635a612e-5dec-4bcd-b575-8a799e40c485",
      "kind": "detachmentRule",
      "name": "Ruthless Discipline",
      "det": "Grizzled Company",
      "hash": "9a88e64d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "grizzled-company"
      }
    },
    {
      "sid": "200cc030-71f3-4c06-ad3c-4d98b7567d12",
      "kind": "detachmentRule",
      "name": "Iron Tread",
      "det": "Hammer of the Emperor",
      "ref": {
        "kind": "detachmentRule",
        "det": "hammer-of-the-emperor"
      },
      "hash": "33c60adf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "when that unit Advances, until the end of the phase",
            "ru": "когда юнит совершает Advance, до конца фазы"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "998e3c77-a541-44a6-a64e-e7b2bbe5e398",
      "kind": "detachmentRule",
      "name": "Armoured Fist",
      "det": "Mechanised Assault",
      "hash": "80bd5ae3",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "mechanised-assault"
      }
    },
    {
      "sid": "536ea1fd-61ca-4160-9e68-6c61384eee0d",
      "kind": "detachmentRule",
      "name": "Masters of Camouflage",
      "det": "Recon Element",
      "hash": "151252b3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the unit has the Benefit of Cover for any other reason — never better than 3+",
            "ru": "пока отряд имеет Benefit of Cover по любой другой причине — не лучше 3+"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "recon-element"
      }
    },
    {
      "sid": "de0f8d4e-827f-4582-9af5-290b0fc40780",
      "kind": "enhancement",
      "name": "Death Mask of Ollanius",
      "det": "Combined Arms",
      "ref": {
        "kind": "enhancement",
        "det": "combined-arms"
      },
      "hash": "5c661f24",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bc853f1d-57e1-4dce-bedb-71dcb438bfaf",
      "kind": "enhancement",
      "name": "Aquilan Eye",
      "det": "Grizzled Company",
      "hash": "1f348adf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against enemy units within 12\", while affected by the bearer's Target Weak Spot Order",
            "ru": "против вражеских отрядов в пределах 12\", пока действует приказ носителя Target Weak Spot"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "grizzled-company"
      }
    },
    {
      "sid": "9023c1ea-65ac-4554-a508-34400cc1136f",
      "kind": "enhancement",
      "name": "Regimental Banner",
      "det": "Hammer of the Emperor",
      "hash": "be358b28",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-the-emperor"
      }
    },
    {
      "sid": "e38c0b38-9334-43e5-aaf5-abe27a176bc8",
      "kind": "enhancement",
      "name": "Legacy Sidearm",
      "det": "Siege Regiment",
      "hash": "02dc4227",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null,
          "only": {
            "tag": "PISTOL"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "siege-regiment"
      }
    },
    {
      "sid": "6419d3ce-ef9b-4cb2-9da6-6b06b0ca1952",
      "kind": "enhancement",
      "name": "Engine Speaker",
      "det": "Steel Hammer",
      "ref": {
        "kind": "enhancement",
        "det": "steel-hammer"
      },
      "hash": "a4f753ee",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the +3\" Move is given to a VEHICLE the bearer picks, not to the bearer"
    },
    {
      "sid": "150b107a-a9ed-4c7e-b696-45ec389a0bdf:bullgryn-squad",
      "kind": "wargear",
      "name": "Bullgryn Squad: Brute Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bullgryn-squad",
        "item": "brute shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "6fa6c35b-da60-40aa-8bfe-2f213147c014:bullgryn-squad",
      "kind": "wargear",
      "name": "Bullgryn Squad: Slabshield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bullgryn-squad",
        "item": "slabshield"
      },
      "hash": "38451d6c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "4",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "bd18f68e-60d7-4e24-aba4-9b56dd43c8aa:cadian-command-squad",
      "kind": "wargear",
      "name": "Cadian Command Squad: Regimental Standard",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "cadian-command-squad",
        "item": "regimental standard"
      },
      "hash": "ec06b6a4",
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
      "sid": "bd18f68e-60d7-4e24-aba4-9b56dd43c8aa:catachan-command-squad",
      "kind": "wargear",
      "name": "Catachan Command Squad: Regimental Standard",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "catachan-command-squad",
        "item": "regimental standard"
      },
      "hash": "ec06b6a4",
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
      "sid": "bd18f68e-60d7-4e24-aba4-9b56dd43c8aa:krieg-command-squad",
      "kind": "wargear",
      "name": "Krieg Command Squad: Regimental Standard",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "krieg-command-squad",
        "item": "regimental standard"
      },
      "hash": "ec06b6a4",
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
      "sid": "bd18f68e-60d7-4e24-aba4-9b56dd43c8aa:militarum-tempestus-command-squad",
      "kind": "wargear",
      "name": "Militarum Tempestus Command Squad: Regimental Standard",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "militarum-tempestus-command-squad",
        "item": "regimental standard"
      },
      "hash": "ec06b6a4",
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
      "sid": "150b107a-a9ed-4c7e-b696-45ec389a0bdf:ogryn-bodyguard",
      "kind": "wargear",
      "name": "Ogryn Bodyguard: Brute Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ogryn-bodyguard",
        "item": "brute shield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "0538f546-232d-4070-9200-e13f335f1c33:ogryn-bodyguard",
      "kind": "wargear",
      "name": "Ogryn Bodyguard: Slabshield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ogryn-bodyguard",
        "item": "slabshield"
      },
      "hash": "d4febadd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "7",
          "when": null
        }
      ]
    },
    {
      "sid": "bfac6bb6-bcd7-42ef-a2fa-a13960d7f9cf:ratlings",
      "kind": "wargear",
      "name": "Ratlings: Demolition Gear",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ratlings",
        "item": "demolition gear"
      },
      "hash": "85f5be75",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    },
    {
      "sid": "2ed95431-ef55-48db-8e8b-d100d3a3b193:ratlings",
      "kind": "wargear",
      "name": "Ratlings: Ratling Battlemutt",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ratlings",
        "item": "ratling battlemutt"
      },
      "hash": "ef12c0e2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    }
  ]
}
