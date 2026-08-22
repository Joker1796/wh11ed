// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "astra-militarum",
  "formatVersion": 1,
  "entries": [
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
      "sid": "5d548374-a6a2-4f5c-bbbe-fdd85a0ac383",
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
    }
  ]
}
