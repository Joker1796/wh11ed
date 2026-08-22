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
        "unit": "biged-bossbunka"
      },
      "hash": "9318d4ed",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "b952c800-e70d-4ac7-bcba-2f78cca11f84:burna-bommer",
      "kind": "ability",
      "name": "Burna-bommer: Burna Bomb",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "burna-bommer"
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
        "unit": "kill-rig"
      },
      "hash": "9251c1e5",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "583eae5c-9b8c-44a3-a492-a45a895e9c6f:mek",
      "kind": "ability",
      "name": "Mek: Mekaniak",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek"
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
      "sid": "ba282a64-1f19-4a71-8ca4-8dcc06885ee4:stompa",
      "kind": "ability",
      "name": "Stompa: Waaagh! Effigy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stompa"
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
      "hash": "887fbe72",
      "ver": 925,
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
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "in your Shooting phase, while the Waaagh! is active",
            "ru": "в вашей фазе стрельбы, пока активен Waaagh!"
          },
          "cond": [
            "waaagh-active",
            "phase-shooting"
          ]
        }
      ]
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
          "when": null
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
          ]
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
          ]
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
          ]
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
          "when": null
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
          ]
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
    }
  ]
}
