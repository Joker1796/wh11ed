// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "orks",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "1d566042-d5d0-452c-bbb7-1561f91f3322:ardmob-boyz",
      "kind": "ability",
      "name": "’Ardmob Boyz: Grab Dat Scrap",
      "det": null,
      "ref": null,
      "hash": "173901da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is engaged",
            "ru": "пока отряд в ближнем бою"
          },
          "cond": [
            "unit-engaged"
          ]
        }
      ]
    },
    {
      "sid": "5b318ee0-9466-407f-ac49-d7f25fc20839:ardmob-boyz",
      "kind": "ability",
      "name": "’Ardmob Boyz: Grab Dat Scrap",
      "det": null,
      "ref": null,
      "hash": "173901da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is engaged",
            "ru": "пока отряд в ближнем бою"
          },
          "cond": [
            "unit-engaged"
          ]
        }
      ]
    },
    {
      "sid": "76087fd7-01d1-4632-86f3-b99acd2c9325:ardmob-gretchin",
      "kind": "ability",
      "name": "’Ardmob Gretchin: Grot Infestation (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "8e3cb8a3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e308befb-5967-4b54-93e5-abc1128540bd:bannernob",
      "kind": "ability",
      "name": "Bannernob: Waaagh! Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bannernob"
      },
      "hash": "1dcac41a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active",
            "ru": "пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        }
      ]
    },
    {
      "sid": "3e47ed80-e5ff-4877-bdb1-cd9e997090ef:battlewagon",
      "kind": "ability",
      "name": "Battlewagon: Ramshackle but Rugged",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "battlewagon"
      },
      "hash": "9783aee4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "af6add91-ce14-4ed9-90fc-8b4bfe6d582c:beastboss-on-squigosaur",
      "kind": "ability",
      "name": "Beastboss on Squigosaur: Thundering Stampede",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "beastboss-on-squigosaur"
      },
      "hash": "6eee11a1",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c87c43f0-980f-4f40-8a21-2383d5fcbda2:beastboss",
      "kind": "ability",
      "name": "Beastboss: Beastboss",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "beastboss"
      },
      "hash": "1ab6c76e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9bff4ac4-a1f5-49b4-9cec-26499251c923:beastboss",
      "kind": "ability",
      "name": "Beastboss: Ferocious Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "beastboss"
      },
      "hash": "2df47c0f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "until the end of a turn it made a Charge move",
            "ru": "до конца хода, в котором совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "79daa833-60ea-4457-b539-4b832c476f38:big-mek-dakkarig",
      "kind": "ability",
      "name": "Big Mek Dakkarig: Dakkablitz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-dakkarig"
      },
      "hash": "01d76d09",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 6,
          "only": {
            "name": "Blitzkannon"
          },
          "when": {
            "en": "against non-MONSTER/VEHICLE targets",
            "ru": "против целей, кроме MONSTER/VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "afd9b28e-f4f1-4274-816f-f6cb415a6265:biged-bossbunka",
      "kind": "ability",
      "name": "Big’ed Bossbunka: Shoutin’ Pole",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biged-bossbunka",
        "scopes": [
          {
            "targets": [
              "ORKS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "9318d4ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "1466c2e2-98b5-496d-92b7-2d46ffd54b48:bigboss",
      "kind": "ability",
      "name": "Bigboss: Breakin’ Heads",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bigboss"
      },
      "hash": "beee245c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "e96d778f-1f1b-4031-885c-0d9044623457:boss-snikrot",
      "kind": "ability",
      "name": "Boss Snikrot: Kunnin’ Infiltrator (Once per battle, per army)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "boss-snikrot"
      },
      "hash": "d4b5a4d8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b952c800-e70d-4ac7-bcba-2f78cca11f84:burna-bommer",
      "kind": "ability",
      "name": "Burna-bommer: Burna Bomb",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "burna-bommer",
        "scopes": [
          {
            "targets": [
              "ORKS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "89d7048d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4f828ab7-3fa2-44c8-8d18-32a9f06efb30:deffkilla-wartrike",
      "kind": "ability",
      "name": "Deffkilla Wartrike: Fuel-mixa Grot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deffkilla-wartrike"
      },
      "hash": "4e986bf2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced (no Advance roll is made)",
            "ru": "в фазе, когда отряд совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced (no Advance roll is made)",
            "ru": "в фазе, когда отряд совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "bc6734e4-cfce-4eb3-96c6-8e179bc08c5c:deffkilla-wartrike",
      "kind": "ability",
      "name": "Deffkilla Wartrike: Speedboss",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deffkilla-wartrike"
      },
      "hash": "1ab6c76e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ea8d20dc-32b2-4e34-ac0f-c5e6353ead7f:flash-gitz",
      "kind": "ability",
      "name": "Flash Gitz: Gun-crazy Show-offs",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "flash-gitz"
      },
      "hash": "295f05d1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "set",
          "value": "4",
          "only": {
            "name": "Snazzgun"
          },
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
      "sid": "586e1427-e1f4-47fb-b11a-76fed2a560f9:ghazghkull-thraka",
      "kind": "ability",
      "name": "Ghazghkull Thraka: Ghazghkull’s Waaagh! Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ghazghkull-thraka"
      },
      "hash": "5cc9c5b2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7c9f6290-d392-405f-bf1a-4a5c53800a2e:ghazghkull-thraka",
      "kind": "ability",
      "name": "Ghazghkull Thraka: Prophet of Da Great Waaagh!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ghazghkull-thraka"
      },
      "hash": "a8cd937f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d3e74c82-b05c-4ec5-8306-d4f3259a291d:gorkanaut",
      "kind": "ability",
      "name": "Gorkanaut: Big an’ Stompy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gorkanaut"
      },
      "hash": "8544aaa8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9adf4176-f503-4386-bb5a-d135ad94f0ef:gretchin",
      "kind": "ability",
      "name": "Gretchin: Runtherd",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gretchin"
      },
      "hash": "ca5c4cfd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "set",
          "value": "2",
          "when": {
            "en": "Runtherd models only, while the unit still holds a Gretchin",
            "ru": "только модели Runtherd, пока в отряде есть Gretchin"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "0a9fb6cd-6a0b-4e33-800a-e926d4b1aadc:hunta-rig",
      "kind": "ability",
      "name": "Hunta Rig: On Da Hunt",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hunta-rig"
      },
      "hash": "0d24e889",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Butcha boyz"
          },
          "when": {
            "en": "per model embarked within this Transport, up to +6",
            "ru": "за каждую модель на борту, максимум +6"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "46059742-1878-48e3-99ab-aa0d19966343:kill-rig",
      "kind": "ability",
      "name": "Kill Rig: Spirit of Gork",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kill-rig",
        "scopes": [
          {
            "targets": [
              "ORKS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "9251c1e5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": {
            "en": "for the phase, on a roll of 2+ for Spirit of Gork",
            "ru": "на фазу, при броске 2+ для Spirit of Gork"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "target": "aura",
          "when": {
            "en": "for the phase, on a roll of 6 for Spirit of Gork",
            "ru": "на фазу, при броске 6 для Spirit of Gork"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "079c7a3b-05cc-42b5-b64d-46b24d804f96:killa-kans",
      "kind": "ability",
      "name": "Killa Kans: Shooty Power Trip",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "killa-kans"
      },
      "hash": "384fcd4e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "on a 3-4 when this unit is selected to shoot",
            "ru": "на 3-4 при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "on a 5-6 when this unit is selected to shoot",
            "ru": "на 5-6 при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "867906c9-30a5-4462-84e7-6021e830a0ea:meganobz",
      "kind": "ability",
      "name": "Meganobz: Krumpin’ Time",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "meganobz"
      },
      "hash": "d1db0ba2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a2d4f764-2e09-46ec-9258-174fb2203bff:mek",
      "kind": "ability",
      "name": "Mek: Know-wotz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek"
      },
      "hash": "8cda45a5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "583eae5c-9b8c-44a3-a492-a45a895e9c6f:mek",
      "kind": "ability",
      "name": "Mek: Mekaniak",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek",
        "scopes": [
          {
            "targets": [
              "ORKS VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "c21e5e33",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6c1b99c5-e4e3-450b-a641-4349480bdf1b:morkanaut",
      "kind": "ability",
      "name": "Morkanaut: Big an’ Shooty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "morkanaut"
      },
      "hash": "0f740100",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0cb9c31a-27ee-4aa2-827d-6038a5f230a2:mozrog-skragbad",
      "kind": "ability",
      "name": "Mozrog Skragbad: Da Bigger Dey Iz…",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mozrog-skragbad"
      },
      "hash": "a88c08e0",
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
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against TITANIC targets, instead",
            "ru": "против целей TITANIC, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ]
    },
    {
      "sid": "f46782fa-1384-4d8b-b10f-7896906fa23e:painboss",
      "kind": "ability",
      "name": "Painboss: Dok’s Toolz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "painboss"
      },
      "hash": "ccc78431",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "unit",
          "when": null
        }
      ]
    },
    {
      "sid": "f46782fa-1384-4d8b-b10f-7896906fa23e:painboy",
      "kind": "ability",
      "name": "Painboy: Dok’s Toolz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "painboy"
      },
      "hash": "ccc78431",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "target": "unit",
          "when": null
        }
      ]
    },
    {
      "sid": "ba282a64-1f19-4a71-8ca4-8dcc06885ee4:stompa",
      "kind": "ability",
      "name": "Stompa: Waaagh! Effigy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stompa",
        "scopes": [
          {
            "targets": [
              "ORKS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "e2a75438",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "acef6c1f-91e0-4728-b1a6-b74b2d521f3f:tankbustas",
      "kind": "ability",
      "name": "Tankbustas: Tank Hunters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tankbustas"
      },
      "hash": "65208372",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4059d207-b42e-4f7a-8ee0-affbc18980fa:warbikers",
      "kind": "ability",
      "name": "Warbikers: Drive-by Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warbikers"
      },
      "hash": "148084be",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets within 9\"",
            "ru": "против целей в 9\""
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3014021b-5c79-4b6d-ac8f-a5e99213a0b1:warboss-in-mega-armour",
      "kind": "ability",
      "name": "Warboss in Mega Armour: Dead Brutal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss-in-mega-armour"
      },
      "hash": "b8bc1af5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "set",
          "value": "3",
          "only": {
            "name": "’Uge choppa"
          },
          "when": {
            "en": "while the Waaagh! is active",
            "ru": "пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        }
      ]
    },
    {
      "sid": "6e30e267-586b-410f-8a11-a2d9e6cbcc61:warboss-in-mega-armour",
      "kind": "ability",
      "name": "Warboss in Mega Armour: Might is Right",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss-in-mega-armour"
      },
      "hash": "1ab6c76e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "794c1337-68e0-41cb-abec-c8478c020c68:warboss",
      "kind": "ability",
      "name": "Warboss: Da Biggest and da Best",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss"
      },
      "hash": "a0ff5de7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 4,
          "when": {
            "en": "while the Waaagh! is active",
            "ru": "пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        }
      ]
    },
    {
      "sid": "6e30e267-586b-410f-8a11-a2d9e6cbcc61:warboss",
      "kind": "ability",
      "name": "Warboss: Might is Right",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss"
      },
      "hash": "1ab6c76e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7f262bc1-fa45-443b-bdb8-6b3ba279b48c:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Pulse Jet",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Throttlerokkit Shokka Engine",
        "pickLimit": 1
      },
      "hash": "9acf37ea",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while this unit Advances, instead of an Advance roll",
            "ru": "когда отряд совершает Advance, вместо броска"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "0a9dfe49-0efc-44e9-8dde-277117562230:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Shokk Attack Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Throttlerokkit Shokka Engine",
        "pickLimit": 1
      },
      "hash": "5e90d4f4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "720b0a3f-a492-4a16-83fd-0b7cb329f624:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Turbo Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Throttlerokkit Shokka Engine",
        "pickLimit": 1
      },
      "hash": "104326c1",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2d940cc9-32aa-4dcd-8b43-becc8872da25:weirdboy",
      "kind": "ability",
      "name": "Weirdboy: Waaagh! Energy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "weirdboy"
      },
      "hash": "c656465b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "’Eadbanger"
          },
          "when": {
            "en": "per 5 models in the unit it leads",
            "ru": "за каждые 5 моделей в ведомом отряде"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "name": "’Eadbanger"
          },
          "when": {
            "en": "per 5 models in the unit it leads",
            "ru": "за каждые 5 моделей в ведомом отряде"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "only": {
            "name": "’Eadbanger"
          },
          "when": {
            "en": "while the unit it leads has 10 or more models",
            "ru": "пока в ведомом отряде 10+ моделей"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "77988921-2061-4c67-a398-d614037664c9:wurrboy",
      "kind": "ability",
      "name": "Wurrboy: Unstable Oracle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wurrboy"
      },
      "hash": "6db76fb0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Eyez of Mork"
          },
          "when": {
            "en": "per 5 models in the unit it leads",
            "ru": "за каждые 5 моделей в ведомом отряде"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "only": {
            "name": "Eyez of Mork"
          },
          "when": {
            "en": "while the unit it leads has 10 or more models",
            "ru": "пока в ведомом отряде 10+ моделей"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "633d3755-6a6b-41e5-8cf2-212258c41535:zodgrod-wortsnagga",
      "kind": "ability",
      "name": "Zodgrod Wortsnagga: Special Dose",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "zodgrod-wortsnagga"
      },
      "hash": "f1ab5da4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while the Waaagh! is active",
            "ru": "пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while the Waaagh! is active",
            "ru": "пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "c25ff898-e6a3-425f-9eb4-1b6b6c2e3960:zodgrod-wortsnagga",
      "kind": "ability",
      "name": "Zodgrod Wortsnagga: Super Runts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "zodgrod-wortsnagga"
      },
      "hash": "e2f22bac",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "42dcefdd-5b72-49b8-8add-76b4da2221fa",
      "kind": "armyRule",
      "name": "Waaagh!",
      "det": null,
      "hash": "9d17d608",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the Waaagh! is active for your army",
            "ru": "пока для вашей армии активен Waaagh!"
          },
          "cond": [
            "waaagh-active"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "a6f39aff-8615-4636-9b6d-da6fab863c33",
      "kind": "detachmentRule",
      "name": "Da Hunt Is On",
      "det": "Da Big Hunt",
      "hash": "9f322ba1",
      "ver": 931,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Beast Snagga models only, per attack against your Prey",
            "ru": "только модели Beast Snagga, за атаку по вашей Добыче"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "da-big-hunt"
      }
    },
    {
      "sid": "f961623a-499e-4a8c-8061-2bb1ed0d0e54",
      "kind": "detachmentRule",
      "name": "Try Dat Button!",
      "det": "Dread Mob",
      "ref": {
        "kind": "detachmentRule",
        "det": "dread-mob"
      },
      "hash": "4fb1d694",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "34b837a4-ee8c-473d-8aac-1d513abbdbc3",
      "kind": "detachmentRule",
      "name": "Jungle Know-wotz",
      "det": "Equatorial Hordes",
      "ref": {
        "kind": "detachmentRule",
        "det": "equatorial-hordes"
      },
      "hash": "2141ef9f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ea8317a8-3324-4675-8b68-865875f3fb08",
      "kind": "detachmentRule",
      "name": "Here be Loot",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "detachmentRule",
        "det": "freebooter-krew"
      },
      "hash": "1e1b5b90",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against INFANTRY targets",
            "ru": "по целям INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "36625896-bea9-4694-b3d0-1a684a71367b",
      "kind": "detachmentRule",
      "name": "Mob Mentality",
      "det": "Green Tide",
      "hash": "652c37e9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "6+",
          "when": {
            "en": "against any attack targeting the unit",
            "ru": "против любой атаки по отряду"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "instead, while the unit contains 10 or more models",
            "ru": "вместо этого, пока в отряде 10 и более моделей"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "green-tide"
      }
    },
    {
      "sid": "5990b4e9-2df8-4b33-bf55-6bb1026403d0",
      "kind": "detachmentRule",
      "name": "Dakka! Dakka! Dakka!",
      "det": "More Dakka!",
      "ref": {
        "kind": "detachmentRule",
        "det": "more-dakka"
      },
      "hash": "c459d4ca",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e71395f5-4a7c-44ed-a8a3-a61bb7ce5ecc",
      "kind": "detachmentRule",
      "name": "Turbo Boostas",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "detachmentRule",
        "det": "speedwaaagh"
      },
      "hash": "1d3dbfc4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "24\"",
          "when": {
            "en": "while the unit uses its turbo — one straight line only, and it cannot declare a charge",
            "ru": "пока отряд использует турбо — только по прямой и без объявления charge"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "until the end of the turn in which the unit used its turbo",
            "ru": "до конца хода, в котором отряд использовал турбо"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ad39d9e7-48b0-4f33-a7dc-361c8266eb91",
      "kind": "detachmentRule",
      "name": "Get Stuck In",
      "det": "War Horde",
      "ref": {
        "kind": "detachmentRule",
        "det": "war-horde"
      },
      "hash": "645b7b89",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "fb854ed4-d89a-48fe-8885-668fc666fb57",
      "kind": "enhancement",
      "name": "Runnin’ Boots",
      "det": "Blitz Brigade",
      "hash": "44d35202",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "blitz-brigade"
      }
    },
    {
      "sid": "b26524a0-05cb-4f6d-a0ee-eb29836d5cd5",
      "kind": "enhancement",
      "name": "Da Biggest Boss",
      "det": "Bully Boyz",
      "hash": "c7314a69",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bully-boyz"
      }
    },
    {
      "sid": "3d83cfeb-581e-435d-b322-029c6adf5add",
      "kind": "enhancement",
      "name": "Tellyporta",
      "det": "Bully Boyz",
      "ref": {
        "kind": "enhancement",
        "det": "bully-boyz"
      },
      "hash": "818bb5a5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "bb4fc923-48a3-4b7f-a58e-08e2bc7bdbe4",
      "kind": "enhancement",
      "name": "Glory Hog",
      "det": "Da Big Hunt",
      "ref": {
        "kind": "enhancement",
        "det": "da-big-hunt"
      },
      "hash": "83f747c8",
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
      "sid": "054ed69c-a8e8-4469-80bf-1d1e39dc5103",
      "kind": "enhancement",
      "name": "Proper Killy",
      "det": "Da Big Hunt",
      "hash": "b2a4dee2",
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
        "det": "da-big-hunt"
      }
    },
    {
      "sid": "feb611dd-912d-42c4-acd1-c9e0922bd5aa",
      "kind": "enhancement",
      "name": "Gitfinder Gogglez",
      "det": "Dread Mob",
      "ref": {
        "kind": "enhancement",
        "det": "dread-mob"
      },
      "hash": "63bbe596",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "bbc09d5c-a926-4660-a0a9-e9bf51301379",
      "kind": "enhancement",
      "name": "Smoky Gubbinz",
      "det": "Dread Mob",
      "ref": {
        "kind": "enhancement",
        "det": "dread-mob"
      },
      "hash": "a98a26bd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "d3a899cc-7e85-48ee-aaf8-7bc01205a926",
      "kind": "enhancement",
      "name": "Bionik Workshop",
      "det": "Freebooter Krew",
      "hash": "9aa0b7af",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "on a D3 roll of 1 at the start of the battle (Bionik Legs)",
            "ru": "при выпавшем 1 на D3 в начале битвы (Bionik Legs)"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 2 at the start of the battle (Bionik Arms)",
            "ru": "при выпавшем 2 на D3 в начале битвы (Bionik Arms)"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "on a D3 roll of 3 at the start of the battle (Bionik Bonce)",
            "ru": "при выпавшем 3 на D3 в начале битвы (Bionik Bonce)"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "freebooter-krew"
      }
    },
    {
      "sid": "585d8003-498c-4dc1-a7d7-82aa037b3274",
      "kind": "enhancement",
      "name": "Git-Spotter Squig",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "enhancement",
        "det": "freebooter-krew"
      },
      "hash": "b0b5300b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "987fbbf7-d3d3-4e55-a058-14332291177a",
      "kind": "enhancement",
      "name": "Ferocious Show Off",
      "det": "Green Tide",
      "hash": "35322b3c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while resolving the bearer's own attacks",
            "ru": "при разрешении атак самого носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": {
            "en": "instead, if the bearer's unit contains 10 or more models",
            "ru": "вместо этого, если в отряде носителя 10 и более моделей"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "green-tide"
      }
    },
    {
      "sid": "51adc17c-33c8-4f45-b96a-1792cfef631e",
      "kind": "enhancement",
      "name": "Dead Shiny Shootas (Upgrade)",
      "det": "More Dakka!",
      "ref": {
        "kind": "enhancement",
        "det": "more-dakka"
      },
      "hash": "1882b6fd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "only": {
            "notTag": "RAPID FIRE"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "add",
          "value": "RAPID FIRE 1",
          "only": {
            "tag": "RAPID FIRE"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "d31fb77e-2a18-415e-8a42-d8721e2e7864",
      "kind": "enhancement",
      "name": "Targetin’ Gizmos (Upgrade)",
      "det": "Rollin' Deff",
      "ref": {
        "kind": "enhancement",
        "det": "rollin-deff"
      },
      "hash": "d8013422",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while a BIG MEK model is embarked within this unit",
            "ru": "пока внутри юнита находится модель BIG MEK"
          },
          "cond": [
            "never"
          ]
        },
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while a BIG MEK is embarked and the Waaagh! is active",
            "ru": "пока внутри юнита BIG MEK и активен Waaagh!"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "note": "both bullets hang on the embarked Big Mek, so neither rewrites a printed tag"
    },
    {
      "sid": "be252d4b-367b-4dcc-b10d-6e12f678df40",
      "kind": "enhancement",
      "name": "Dakkamek",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "enhancement",
        "det": "speedwaaagh"
      },
      "hash": "05c13307",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1889b79a-54fd-4e88-93e8-fdc0d4076a1a",
      "kind": "enhancement",
      "name": "Master Meknologist",
      "det": "Speedwaaagh!",
      "hash": "ecde6a70",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "speedwaaagh"
      }
    },
    {
      "sid": "3bf140ed-cfc8-41aa-8e02-48a5479e0a4f",
      "kind": "enhancement",
      "name": "Supa-Burny Fuel",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "enhancement",
        "det": "speedwaaagh"
      },
      "hash": "b6a1e06e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "set",
          "value": "3D6",
          "only": {
            "name": "Killa jet – burna"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "set",
          "value": 3,
          "only": {
            "name": "Killa jet – cutta"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "64bce989-3720-4e84-a38f-4f34a7c6cf5a",
      "kind": "enhancement",
      "name": "Slippery Git",
      "det": "Taktikal Brigade",
      "ref": {
        "kind": "enhancement",
        "det": "taktikal-brigade"
      },
      "hash": "8963dec7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6e1ce3ba-cf8c-4f03-8826-d8c32b03c38c",
      "kind": "enhancement",
      "name": "Follow Me Ladz",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "cb9b17bd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "7387cdc9-10f1-49b5-846f-bd74d0990559",
      "kind": "enhancement",
      "name": "Headwoppa’s Killchoppa",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "042b9d74",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "notTag": "EXTRA ATTACKS"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "193c7ee0-362c-4c27-92f7-97c33317dba4",
      "kind": "enhancement",
      "name": "Supa-Cybork Body",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "f653432e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "10d5e5dd-b0ba-4b15-93d6-cf57f2d8df30",
      "kind": "stratagem",
      "name": "Krump ’Em",
      "det": "’Ardmob",
      "ref": null,
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
      "sid": "c0f6b966-a1c6-40a9-9eae-718c8c22c74c",
      "kind": "stratagem",
      "name": "Armoured Duellists",
      "det": "Blitz Brigade",
      "ref": {
        "kind": "stratagem",
        "det": "blitz-brigade",
        "name": "Armoured Duellists"
      },
      "hash": "b4e5268c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a92b516e-a846-4855-bc29-ad7a9c0a37c7",
      "kind": "stratagem",
      "name": "Hulking Brutes",
      "det": "Bully Boyz",
      "ref": {
        "kind": "stratagem",
        "det": "bully-boyz",
        "name": "Hulking Brutes"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "57bf2e49-354f-4671-b345-b790d6878929",
      "kind": "stratagem",
      "name": "Drag It Down",
      "det": "Da Big Hunt",
      "ref": {
        "kind": "stratagem",
        "det": "da-big-hunt",
        "name": "Drag It Down"
      },
      "hash": "d8b4a416",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f2d2cb83-69c9-447d-adfa-f2161f6038b3",
      "kind": "stratagem",
      "name": "Stalkin’ Taktiks",
      "det": "Da Big Hunt",
      "ref": {
        "kind": "stratagem",
        "det": "da-big-hunt",
        "name": "Stalkin’ Taktiks"
      },
      "hash": "e37c3c91",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f2274ddd-3d7b-4fe8-a10a-8ca805bd29c9",
      "kind": "stratagem",
      "name": "Bigger Shells For Bigger Gitz",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Bigger Shells For Bigger Gitz"
      },
      "hash": "7fd5b31c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "30ac141a-8589-47bc-809f-7a85d39c547d",
      "kind": "stratagem",
      "name": "Dakka! Dakka! Dakka!",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Dakka! Dakka! Dakka!"
      },
      "hash": "26637409",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fdfdf495-19e2-479e-a31c-0b2faeb67c6d",
      "kind": "stratagem",
      "name": "Extra Gubbinz",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Extra Gubbinz"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0bd39ff7-0073-4d87-91b4-a06887f947f0",
      "kind": "stratagem",
      "name": "Klankin’ Klaws",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Klankin’ Klaws"
      },
      "hash": "d7023c69",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "only if you chose to push the Stratagem",
            "ru": "только если вы решили «push» стратагему"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a8c4f685-8c50-417f-9822-6b513ec6314c",
      "kind": "stratagem",
      "name": "Superfuelled Boiler",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Superfuelled Boiler"
      },
      "hash": "b090ae54",
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
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "f62eb18e-c65a-454f-9f6e-08fc29aa4a65",
      "kind": "stratagem",
      "name": "Concealed Krumpin’",
      "det": "Equatorial Hordes",
      "ref": {
        "kind": "stratagem",
        "det": "equatorial-hordes",
        "name": "Concealed Krumpin’"
      },
      "hash": "060347d5",
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
      "sid": "462a1795-2de3-4a79-9d9c-acfa12d373ab",
      "kind": "stratagem",
      "name": "Boardin’ Rush",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "stratagem",
        "det": "freebooter-krew",
        "name": "Boardin’ Rush"
      },
      "hash": "c1bf64f9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll)",
            "ru": "в фазе с Advance (без броска)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "ffc8350d-fec1-4bee-98ce-340b44a58f4c",
      "kind": "stratagem",
      "name": "Deck Fraggers",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "stratagem",
        "det": "freebooter-krew",
        "name": "Deck Fraggers"
      },
      "hash": "c28c9135",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "BLAST",
          "when": {
            "en": "against INFANTRY targets",
            "ru": "по целям INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "cfcd981d-e0b4-415c-93be-226ed53fe140",
      "kind": "stratagem",
      "name": "Rolling Loot-Heap",
      "det": "Freebooter Krew",
      "ref": {
        "kind": "stratagem",
        "det": "freebooter-krew",
        "name": "Rolling Loot-Heap"
      },
      "hash": "dba8b751",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "68a2a4e6-bd80-4110-bd53-307d8f2cef44",
      "kind": "stratagem",
      "name": "Tide of Muscle",
      "det": "Green Tide",
      "ref": {
        "kind": "stratagem",
        "det": "green-tide",
        "name": "Tide of Muscle"
      },
      "hash": "9d6992ae",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a1fd6ad7-1d97-46f7-9171-726e506a130a",
      "kind": "stratagem",
      "name": "Blitza Fire",
      "det": "Kult of Speed",
      "ref": {
        "kind": "stratagem",
        "det": "kult-of-speed",
        "name": "Blitza Fire"
      },
      "hash": "41c359dc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
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
      "sid": "d645ac95-42ca-488e-87c8-5ad5aed49b6e",
      "kind": "stratagem",
      "name": "Dakkastorm",
      "det": "Kult of Speed",
      "ref": {
        "kind": "stratagem",
        "det": "kult-of-speed",
        "name": "Dakkastorm"
      },
      "hash": "1e03d35d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "against targets within 9\", instead",
            "ru": "против целей в 9\", вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0fb25d0d-f1a3-4a1e-aeeb-403437135ac7",
      "kind": "stratagem",
      "name": "Full Throttle",
      "det": "Kult of Speed",
      "ref": {
        "kind": "stratagem",
        "det": "kult-of-speed",
        "name": "Full Throttle"
      },
      "hash": "a1a49b8b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b3bb4207-0b8b-4618-a78d-9f571cebbc07",
      "kind": "stratagem",
      "name": "Speediest Freeks",
      "det": "Kult of Speed",
      "ref": {
        "kind": "stratagem",
        "det": "kult-of-speed",
        "name": "Speediest Freeks"
      },
      "hash": "05e69fab",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "for a VEHICLE with Toughness 8 or less, instead",
            "ru": "для VEHICLE с Стойкостью 8 или меньше, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b2e069c3-85d2-4963-bf37-e6ef414ba5eb",
      "kind": "stratagem",
      "name": "Long, Uncontrolled Bursts",
      "det": "More Dakka!",
      "ref": {
        "kind": "stratagem",
        "det": "more-dakka",
        "name": "Long, Uncontrolled Bursts"
      },
      "hash": "5938c3ef",
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
      "sid": "1edb6e6c-dfeb-4e93-bcde-3de0b8651b9d",
      "kind": "stratagem",
      "name": "Speshul Shells",
      "det": "More Dakka!",
      "ref": {
        "kind": "stratagem",
        "det": "more-dakka",
        "name": "Speshul Shells"
      },
      "hash": "fa7d25f9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against targets within 9\"",
            "ru": "против целей в 9\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "70d2e701-5531-4ac5-a4e9-aec2f4cc7ac9",
      "kind": "stratagem",
      "name": "Brutal Broadside",
      "det": "Rollin' Deff",
      "ref": {
        "kind": "stratagem",
        "det": "rollin-deff",
        "name": "Brutal Broadside"
      },
      "hash": "68997730",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "62a55842-78b7-41ad-af95-9bc039586ed3",
      "kind": "stratagem",
      "name": "Devastating Drift",
      "det": "Rollin' Deff",
      "ref": {
        "kind": "stratagem",
        "det": "rollin-deff",
        "name": "Devastating Drift"
      },
      "hash": "a63398e1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "81f6c4eb-5bec-4ee6-9d8f-fcefbab49374",
      "kind": "stratagem",
      "name": "Ded Killy Construction",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "stratagem",
        "det": "speedwaaagh",
        "name": "Ded Killy Construction"
      },
      "hash": "5e298d95",
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
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "also, if the unit made a Charge move this turn",
            "ru": "и ещё, если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9da4621c-23e6-4d5a-a6d0-54fcc410b521",
      "kind": "stratagem",
      "name": "Mobile Dakkastorm",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "stratagem",
        "det": "speedwaaagh",
        "name": "Mobile Dakkastorm"
      },
      "hash": "490a62f4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ccc88b1d-359c-4bdd-8dd6-b6d408514eab",
      "kind": "stratagem",
      "name": "Speshul Ammo",
      "det": "Speedwaaagh!",
      "ref": {
        "kind": "stratagem",
        "det": "speedwaaagh",
        "name": "Speshul Ammo"
      },
      "hash": "a2911ac3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null,
          "only": {
            "notTag": "TORRENT"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": null,
          "only": {
            "notTag": "TORRENT"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "1c44285a-c668-4b37-9000-787d947acd6d",
      "kind": "stratagem",
      "name": "’Ere We Go",
      "det": "War Horde",
      "ref": {
        "kind": "stratagem",
        "det": "war-horde",
        "name": "’Ere We Go"
      },
      "hash": "b7981da6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7527971e-395b-4f7d-a2c1-876d8ad6a7d6:battlewagon",
      "kind": "wargear",
      "name": "Battlewagon: ’Ard Case",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "battlewagon",
        "item": "'ard case"
      },
      "hash": "6b1440af",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "aee34635-59e6-4c77-9f7c-6334aff37fb3:big-mek-in-mega-armour",
      "kind": "wargear",
      "name": "Big Mek in Mega Armour: Kustom Force Field",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "big-mek-in-mega-armour",
        "item": "kustom force field"
      },
      "hash": "2d6a2c10",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against ranged attacks",
            "ru": "против дальних атак"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        }
      ]
    },
    {
      "sid": "0549dd4b-5a1a-4609-9244-415205cad4a6:flash-gitz",
      "kind": "wargear",
      "name": "Flash Gitz: Ammo Runt",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "flash-gitz",
        "item": "ammo runt"
      },
      "hash": "de5158d7",
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
    },
    {
      "sid": "0abec0dc-14e8-4ac0-8c7a-976412670343:kommandos",
      "kind": "wargear",
      "name": "Kommandos: Distraction Grot",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kommandos",
        "item": "distraction grot"
      },
      "hash": "77249f4b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "once per battle, while the grot is deployed",
            "ru": "раз за битву, пока грот выставлен"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "07baa154-aeea-43b1-a515-8fb140376b9f:nobz",
      "kind": "wargear",
      "name": "Nobz: Ammo Runt",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "nobz",
        "item": "ammo runt"
      },
      "hash": "ffebd655",
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
    },
    {
      "sid": "7ecf9be2-3858-40d3-9f14-9bdcd9a2d04b:tankbustas",
      "kind": "wargear",
      "name": "Tankbustas: Pulsa Rokkit",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tankbustas",
        "item": "pulsa rokkit"
      },
      "hash": "a6321189",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b64d38b3-82f0-49af-8259-d35ae3f6c065:wazbom-blastajet",
      "kind": "wargear",
      "name": "Wazbom Blastajet: Blastajet Force Field",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wazbom-blastajet",
        "item": "blastajet force field"
      },
      "hash": "9cd825f5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        }
      ]
    }
  ]
}
