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
      "ref": {
        "kind": "ability",
        "unit": "ardmob-boyz"
      },
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
      "sid": "5b318ee0-9466-407f-ac49-d7f25fc20839:ardmob-boyz-kustom-shoota",
      "kind": "ability",
      "name": "’Ardmob Boyz: Grab Dat Scrap",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ardmob-boyz-kustom-shoota"
      },
      "hash": "173901da",
      "ver": 995,
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
      "ref": {
        "kind": "ability",
        "unit": "ardmob-gretchin"
      },
      "hash": "8e3cb8a3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": {
            "en": "once per battle per unit, after this unit was destroyed and returned to strategic reserves",
            "ru": "раз за битву на отряд, после того как отряд был уничтожен и вернулся в strategic reserves"
          },
          "once": {
            "per": "unit",
            "dur": "round"
          }
        }
      ]
    },
    {
      "sid": "4b0382fa-764d-4c04-82ab-bbe95ecadc27:ardmob-warboss",
      "kind": "ability",
      "name": "’Ardmob Warboss: Smash 'Em Up",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ardmob-warboss"
      },
      "hash": "73deea5a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the unit is selected to fight",
            "ru": "выбранная, когда отряд выбран для боя"
          },
          "cond": [
            "smash-lethal"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the unit is selected to fight",
            "ru": "выбранная, когда отряд выбран для боя"
          },
          "cond": [
            "smash-sustained"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the one picked when the unit is selected to fight",
            "ru": "выбранная, когда отряд выбран для боя"
          },
          "cond": [
            "smash-lethal"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "the one picked when the unit is selected to fight",
            "ru": "выбранная, когда отряд выбран для боя"
          },
          "cond": [
            "smash-sustained"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "45b7d230-d20a-4f52-9287-207ffeff0f60:ardmob-wartrakk",
      "kind": "ability",
      "name": "’Ardmob Wartrakk: Indiscriminate Detonations",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ardmob-wartrakk"
      },
      "hash": "e56e644f",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5be527f6-9a6c-4654-8b35-1d2800f18bc5:battlewagon",
      "kind": "ability",
      "name": "Battlewagon: Mobile Fortress",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "battlewagon"
      },
      "hash": "3f3f072b",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": null
        }
      ]
    },
    {
      "sid": "9e2d97c6-99c3-48ae-8072-cadf72d494bf:beastboss-on-squigosaur",
      "kind": "ability",
      "name": "Beastboss on Squigosaur: Boss of da Hunt",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "beastboss-on-squigosaur"
      },
      "hash": "6c085ff9",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of the friendly unit this ability names",
            "ru": "пока в пределах 3\" от дружественного отряда, названного способностью"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "fbb72a0c-2e7c-472a-b1ef-eb89c4cec5e6:beastboss",
      "kind": "ability",
      "name": "Beastboss: Dodge Dis!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "beastboss"
      },
      "hash": "9255f4d8",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "e646eca8-5b67-4d07-81cd-0bff6b17e327:big-mek-dakkarig",
      "kind": "ability",
      "name": "Big Mek Dakkarig: Blitz Dem Gitz!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-dakkarig"
      },
      "hash": "5d204ef7",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 6,
          "only": {
            "name": "Blitzkannon"
          },
          "when": {
            "en": "in your Shooting phase, against targets other than MONSTER and VEHICLE",
            "ru": "в вашей фазе стрельбы, по целям кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c5a22e0b-626b-4d06-9d4e-e619e2563824:big-mek-dakkarig",
      "kind": "ability",
      "name": "Big Mek Dakkarig: Even More Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-dakkarig"
      },
      "hash": "bc0f9949",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        }
      ]
    },
    {
      "sid": "52a0b416-aa88-49fa-905b-1f1afbc9d677:big-mek-in-mega-armour",
      "kind": "ability",
      "name": "Big Mek in Mega Armour: More Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-in-mega-armour"
      },
      "hash": "5b78623c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "2a134b39-a7e6-4143-90e8-118b50a2e496:big-mek-with-shokk-attack-gun",
      "kind": "ability",
      "name": "Big Mek with Shokk Attack Gun: More Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-with-shokk-attack-gun"
      },
      "hash": "5b78623c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "9607b1b8-9c07-4213-a930-22296f4b6667:big-mek-with-shokk-attack-gun",
      "kind": "ability",
      "name": "Big Mek with Shokk Attack Gun: Support Shokka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek-with-shokk-attack-gun"
      },
      "hash": "24137c20",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of the friendly unit this ability names",
            "ru": "пока в пределах 3\" от дружественного отряда, названного способностью"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2d427eaf-1504-4680-b72f-1827f65e2a05:big-mek",
      "kind": "ability",
      "name": "Big Mek: More Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "big-mek"
      },
      "hash": "5b78623c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "621c652c-2cb9-4b84-a09c-ab16341ef3b0:biged-bossbunka",
      "kind": "ability",
      "name": "Big’Ed Bossbunka: Fortification",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biged-bossbunka"
      },
      "hash": "3dafedd6",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "48238b0d-3286-4a41-89d0-fe9bfc0d395d:bigboss",
      "kind": "ability",
      "name": "Bigboss: Sumfin’ to Prove",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bigboss"
      },
      "hash": "0b6926a9",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "6837e3fb-126f-4f2c-b4e0-b2bbf624949e:boss-zagstruk",
      "kind": "ability",
      "name": "Boss Zagstruk: Drill Boss",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "boss-zagstruk"
      },
      "hash": "0b6926a9",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "36d5d345-1ece-46d2-84c7-c9cf89234f43:boyz",
      "kind": "ability",
      "name": "Boyz: Ammo Runts (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "boyz"
      },
      "hash": "f994f519",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, when this unit is selected to shoot",
            "ru": "раз за битву, когда отряд выбран для стрельбы"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "a46b1a31-629b-429b-b376-42247b2e2fe1:boyz",
      "kind": "ability",
      "name": "Boyz: Tide of Muscle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "boyz"
      },
      "hash": "ff5ea6d2",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "in the Fight phase, if this unit made a charge move this turn",
            "ru": "в фазе боя, если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "40f8731b-e9af-4428-96b6-2b5d5ce7ddb1:burna-bommer",
      "kind": "ability",
      "name": "Burna‑bommer: Burna Bomb",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "burna-bommer"
      },
      "hash": "1d065671",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "72bfbf1a-4023-4928-8329-ca1868a258cc:dakkajet",
      "kind": "ability",
      "name": "Dakkajet: Strafing Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dakkajet"
      },
      "hash": "0fc6bb89",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in your Shooting phase, against a unit without FLY",
            "ru": "в вашей фазе стрельбы, против отряда без FLY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "85e212a9-e952-45f4-98fd-131d0521b69a:deff-dread",
      "kind": "ability",
      "name": "Deff Dread: Dread ’Ard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deff-dread"
      },
      "hash": "9bdc06bf",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "55499b96-9a5c-488e-a461-179dd11c8cfe:deffkoptas",
      "kind": "ability",
      "name": "Deffkoptas: Deff from Above",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "deffkoptas"
      },
      "hash": "ba90905f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made an ingress move this turn",
            "ru": "если отряд совершил ingress move в этом ходу"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ]
    },
    {
      "sid": "811b8335-4d1b-4881-97d6-053f966c4ddc:flash-gitz",
      "kind": "ability",
      "name": "Flash Gitz: Finderz Keeperz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "flash-gitz"
      },
      "hash": "74a3280f",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "in your Shooting phase, while this unit or its target is within range of an objective",
            "ru": "в вашей фазе стрельбы, пока отряд или его цель в зоне объекта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "754cddcd-ef13-41b4-b43b-b8604fea993e:ghazghkull-thraka",
      "kind": "ability",
      "name": "Ghazghkull Thraka: Da Grand Warlord's Ladz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ghazghkull-thraka"
      },
      "hash": "ef3da027",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of the friendly unit this ability names",
            "ru": "пока в пределах 3\" от дружественного отряда, названного способностью"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "bdac3806-ed03-488b-827b-3911923b7f91:ghazghkull-thraka",
      "kind": "ability",
      "name": "Ghazghkull Thraka: Prophet of da Great Waaagh! (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ghazghkull-thraka",
        "scopes": [
          {
            "targets": [
              "ORKS"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "2af88ce2",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "aura"
        },
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "aura"
        }
      ]
    },
    {
      "sid": "e1810fcc-e684-4923-b6fd-d57b9d226e04:grot-mega-tank",
      "kind": "ability",
      "name": "Grot Mega-tank: Bizarrely Resilient",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grot-mega-tank"
      },
      "hash": "e441fc1c",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "48e061c4-7ff9-4b73-ab24-22889f118acb:hunta-rig",
      "kind": "ability",
      "name": "Hunta Rig: Fully Loaded Butchery",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hunta-rig"
      },
      "hash": "8c2264cc",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Butcha Boyz"
          },
          "when": {
            "en": "for each model embarked within this unit, to a maximum of +22",
            "ru": "за каждую модель на борту, максимум +22"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "91126978-e1cf-4eec-96f3-c32a93464ad7:kaptin-badrukk",
      "kind": "ability",
      "name": "Kaptin Badrukk: Ded Glowy Ammo",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kaptin-badrukk"
      },
      "hash": "3e6cff0d",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "349b6c00-2cb6-4af1-8301-1b7e0158d7f3:kill-rig",
      "kind": "ability",
      "name": "Kill Rig: Beastscent (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kill-rig",
        "set": "Wurrboy (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "29ad8477",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4b566d5c-1871-40c0-97c3-e7610b4f646b:kill-rig",
      "kind": "ability",
      "name": "Kill Rig: Warpath (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kill-rig",
        "set": "Wurrboy (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "d6bc40f3",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while that psychic roll was made in the Fight phase",
            "ru": "пока сделан psychic roll в фазе боя"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": {
            "en": "while that psychic roll was made in the Fight phase",
            "ru": "пока сделан psychic roll в фазе боя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6cd7a763-23d8-4e50-afc3-9956be2d670a:killa-kans",
      "kind": "ability",
      "name": "Killa Kans: Spiteful Power Trip",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "killa-kans"
      },
      "hash": "c56de462",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit with no model of T 7+",
            "ru": "против отряда без моделей с T 7+"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d7cc9ee2-359a-4a68-bbd9-d1b492ba0b97:kommandos",
      "kind": "ability",
      "name": "Kommandos: Nowhere to Hide",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kommandos"
      },
      "hash": "ee41a658",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a hidden unit",
            "ru": "против отряда hidden"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7d2251ef-8b7b-4927-86b7-a12b24caae77:meganobz",
      "kind": "ability",
      "name": "Meganobz: Arrogant Invulnerability",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "meganobz"
      },
      "hash": "e441fc1c",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "db0fa7b1-b2bd-45db-99c9-40c9dafcb6af:meganobz",
      "kind": "ability",
      "name": "Meganobz: Krumpin’ Time",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "meganobz"
      },
      "hash": "8cc072af",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in the Fight phase, while this unit is riled up",
            "ru": "в фазе боя, пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        }
      ]
    },
    {
      "sid": "4822ce71-dbc7-44a0-94af-cb1a56d75cb7:mek-gunz",
      "kind": "ability",
      "name": "Mek Gunz: Madcap Artillery",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek-gunz"
      },
      "hash": "bbae31b7",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fd87decf-42fc-4b54-b8c4-db3d4aed927c:mek",
      "kind": "ability",
      "name": "Mek: Clever Know-wotz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek",
        "scopes": [
          {
            "targets": [
              "ORKS VEHICLE"
            ],
            "excludes": [
              "AIRCRAFT",
              "TITANIC"
            ],
            "models": [
              "ORKS VEHICLE"
            ],
            "modelExcludes": [
              "AIRCRAFT",
              "TITANIC"
            ]
          }
        ]
      },
      "hash": "2da7efda",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the VEHICLE model selected in your Movement phase, until your next one",
            "ru": "модель VEHICLE, выбранная в вашу фазу движения, до следующей"
          },
          "target": "aura",
          "selected": true
        }
      ]
    },
    {
      "sid": "7af3688e-25d4-4db3-9291-9ae56ba1ddae:mek",
      "kind": "ability",
      "name": "Mek: Kustom Dakka",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mek"
      },
      "hash": "7edac6d1",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
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
      "sid": "967e719e-06c7-44a1-a580-e6000a8cf783:mekboy-workshop",
      "kind": "ability",
      "name": "Mekboy Workshop: Fortification",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mekboy-workshop"
      },
      "hash": "3dafedd6",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dfcd0ed8-e80d-44e1-acc6-3df268d78d23:mozrog-skragbad",
      "kind": "ability",
      "name": "Mozrog Skragbad: Beast Snagga Following",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mozrog-skragbad"
      },
      "hash": "6c085ff9",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of the friendly unit this ability names",
            "ru": "пока в пределах 3\" от дружественного отряда, названного способностью"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a170bdb8-a414-44ad-a4f7-ae1034c13dbc:nazdreg",
      "kind": "ability",
      "name": "Nazdreg: Nazdreg’s Know‑wotz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nazdreg"
      },
      "hash": "f32fec54",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null,
          "target": "led"
        },
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
      "sid": "f562c57d-7a3e-4054-802c-5dd38e01df57:nobz",
      "kind": "ability",
      "name": "Nobz: Ammo Runts (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "nobz"
      },
      "hash": "f994f519",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, when this unit is selected to shoot",
            "ru": "раз за битву, когда отряд выбран для стрельбы"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "edfc0aef-4f04-41f6-9c6c-6dfb323c25d0:painboss",
      "kind": "ability",
      "name": "Painboss: Hardy Bioniks",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "painboss"
      },
      "hash": "ebec7e58",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "f6ad63a2-294e-4870-b828-22f0bc750ab7:painboss",
      "kind": "ability",
      "name": "Painboss: Runnin’ wiv da Herd",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "painboss"
      },
      "hash": "acb41096",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 4,
          "when": {
            "en": "while this model is attached to a MOUNTED unit",
            "ru": "пока модель присоединена к отряду MOUNTED"
          },
          "cond": [
            "unit-leading-mounted"
          ]
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": {
            "en": "while this model is attached to a MOUNTED unit",
            "ru": "пока модель присоединена к отряду MOUNTED"
          },
          "cond": [
            "unit-leading-mounted"
          ]
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mounted",
          "when": {
            "en": "while this model is attached to a MOUNTED unit",
            "ru": "пока модель присоединена к отряду MOUNTED"
          },
          "cond": [
            "unit-leading-mounted"
          ]
        }
      ]
    },
    {
      "sid": "366ce722-af91-43eb-8b75-2ef7d7cb1d7f:rukkatrukk-squigbuggies",
      "kind": "ability",
      "name": "Rukkatrukk Squigbuggies: Squig Barrage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rukkatrukk-squigbuggies"
      },
      "hash": "109504da",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "258d1dd6-62ea-453d-9f42-425426be6f27:squighog-boyz",
      "kind": "ability",
      "name": "Squighog Boyz: Brutal Impact",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "squighog-boyz"
      },
      "hash": "deec62c2",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "7a77ddd2-bf59-45a9-9d21-172b111d6297:stormboyz",
      "kind": "ability",
      "name": "Stormboyz: Rokkit Charge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormboyz"
      },
      "hash": "5d0b4292",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this ability is used, having made a charge move this turn",
            "ru": "пока применена способность, при charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this ability is used, having made a charge move this turn",
            "ru": "пока применена способность, при charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "while this ability is used, having made a charge move this turn",
            "ru": "пока применена способность, при charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "c7f42c02-ab13-4daa-b682-396fe14e4159:warbikers",
      "kind": "ability",
      "name": "Warbikers: High‑speed Carnage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warbikers"
      },
      "hash": "58d6e5b3",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "bcd80793-7120-470e-9a43-1c8b4558a1ef:warboss-on-warbike",
      "kind": "ability",
      "name": "Warboss on Warbike: Speedboss",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss-on-warbike"
      },
      "hash": "0b6926a9",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "55a47782-eb34-4b76-a5a9-9b1edef409c3:warboss",
      "kind": "ability",
      "name": "Warboss: Boss’ Ammo Runt (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss"
      },
      "hash": "61467b2c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, when this unit is selected to shoot",
            "ru": "раз за битву, когда отряд выбран для стрельбы"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "47b04c73-a623-4b32-b82a-1dcd60cb1a21:warboss",
      "kind": "ability",
      "name": "Warboss: Might Is Right",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warboss"
      },
      "hash": "cff6d118",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "b6c2415d-1559-4ba1-b21b-7ee19df30950:wartrakks",
      "kind": "ability",
      "name": "Wartrakks: Bust ’Em",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wartrakks"
      },
      "hash": "6a755ba3",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "993f2681-fa53-4e06-86d3-fc5527aabb45:wartrakks",
      "kind": "ability",
      "name": "Wartrakks: Speednob Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wartrakks"
      },
      "hash": "ac3a6aff",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of the friendly unit this ability names",
            "ru": "пока в пределах 3\" от дружественного отряда, названного способностью"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e61b4686-8f93-454d-874a-50d6b72605c0:wazbom-blastajet",
      "kind": "ability",
      "name": "Wazbom Blastajet: Go fer da Weak Spot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazbom-blastajet"
      },
      "hash": "dfb3a337",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in your Shooting phase, against a MONSTER or VEHICLE unit",
            "ru": "в вашей фазе стрельбы, против отряда MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1841d395-fb15-41fd-bc3d-3e24f7001bb3:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Pulse Jet",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Full Throttle",
        "pickLimit": 1
      },
      "hash": "83d58aa7",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8e920777-5abb-4987-926d-6b314849c69f:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Shokk Attack Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Full Throttle",
        "pickLimit": 1
      },
      "hash": "a4730103",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1d68ea95-1a9c-4505-ba90-4a8a43955026:wazdakka-gutsmek",
      "kind": "ability",
      "name": "Wazdakka Gutsmek: Turbo Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wazdakka-gutsmek",
        "set": "Full Throttle",
        "pickLimit": 1
      },
      "hash": "f443994e",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7143f0eb-51df-4782-b61c-eef22aeb4024:weirdboy",
      "kind": "ability",
      "name": "Weirdboy: Da Jump (psychic level 1, once per army, per battle round)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "weirdboy",
        "set": "Waaagh! Energy (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "bef160fe",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": {
            "en": "while that psychic roll placed this unit in strategic reserves",
            "ru": "пока psychic roll отправил отряд в strategic reserves"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": {
            "en": "while that psychic roll placed this unit in strategic reserves",
            "ru": "пока psychic roll отправил отряд в strategic reserves"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "49005203-621f-4154-8657-960a9aa3ad56:weirdboy",
      "kind": "ability",
      "name": "Weirdboy: Warpath (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "weirdboy",
        "set": "Waaagh! Energy (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "5615391c",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": {
            "en": "while that psychic roll was made in the Fight phase",
            "ru": "пока сделан psychic roll в фазе боя"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PSYCHIC",
          "when": {
            "en": "while that psychic roll was made in the Fight phase",
            "ru": "пока сделан psychic roll в фазе боя"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "afc177ae-d25d-44b9-abf4-a612e225faf9:zodgrod-wortsnagga",
      "kind": "ability",
      "name": "Zodgrod Wortsnagga: Super Runts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "zodgrod-wortsnagga"
      },
      "hash": "fc1654ee",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Scavenged Shivs"
          },
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "4b9740d7-8c4b-43d4-8863-18fe9170314e",
      "kind": "armyRule",
      "name": "Waaagh!",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "990aa2dc",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        }
      ]
    },
    {
      "sid": "91f65a2c-ce8b-467b-9e78-188cd5aab39c",
      "kind": "detachmentRule",
      "name": "’Ard As Nails",
      "det": "’Ardmob",
      "ref": {
        "kind": "detachmentRule",
        "det": "cp:orks"
      },
      "hash": "a0d2aa28",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c6468629-bc6a-40df-973b-84c2809c0eda",
      "kind": "detachmentRule",
      "name": "Displays of Savagery",
      "det": "Bully Boyz",
      "ref": {
        "kind": "detachmentRule",
        "det": "bully-boyz"
      },
      "hash": "fc7cfd7f",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "MEGANOBZ and NOBZ units only",
            "ru": "только отряды MEGANOBZ и NOBZ"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "38d48cb6-6689-4892-9e90-d5f9d141ec8e",
      "kind": "detachmentRule",
      "name": "Da Hunt is On",
      "det": "Da Big Hunt",
      "ref": {
        "kind": "detachmentRule",
        "det": "da-big-hunt"
      },
      "hash": "60e8c5e8",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "BEAST SNAGGA units only, against MONSTER and VEHICLE targets",
            "ru": "только отряды BEAST SNAGGA, по целям MONSTER и VEHICLE"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "b99262ab-ec3f-4e14-bed6-0effef3f43f0",
      "kind": "detachmentRule",
      "name": "Try Dat Button!",
      "det": "Dread Mob",
      "ref": {
        "kind": "detachmentRule",
        "det": "dread-mob"
      },
      "hash": "1a45687d",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "ORKS WALKER units only (excluding TITANIC), on a 1-2 while this ability is used",
            "ru": "только отряды ORKS WALKER (кроме TITANIC), на 1-2 при применении способности"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "ORKS WALKER units only (excluding TITANIC), on a 3-4 while this ability is used",
            "ru": "только отряды ORKS WALKER (кроме TITANIC), на 3-4 при применении способности"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "ORKS WALKER units only (excluding TITANIC), on a 5-6 while this ability is used",
            "ru": "только отряды ORKS WALKER (кроме TITANIC), на 5-6 при применении способности"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "d8d4323e-9378-495c-b271-5e5da7892896",
      "kind": "detachmentRule",
      "name": "Skyborne Loons",
      "det": "Flyboyz",
      "ref": {
        "kind": "detachmentRule",
        "det": "flyboyz"
      },
      "hash": "42d3ed1e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the unit is riled up",
            "ru": "пока отряд riled up"
          },
          "scope": 1,
          "cond": [
            "riled-up"
          ]
        }
      ]
    },
    {
      "sid": "67566eb0-9bb9-491d-b640-d1b9fcdd6b61",
      "kind": "detachmentRule",
      "name": "Mob-handed Brutality",
      "det": "Green Tide",
      "ref": {
        "kind": "detachmentRule",
        "det": "green-tide"
      },
      "hash": "95a929e1",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "BOYZ units only",
            "ru": "только отряды BOYZ"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "ORKS INFANTRY units only, having made a charge move this turn, against targets other than MONSTER and VEHICLE",
            "ru": "только отряды ORKS INFANTRY, при charge в этом ходу, по целям кроме MONSTER и VEHICLE"
          },
          "cond": [
            "blocked-subset",
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "514711c8-2e6f-4aa5-8b76-7cc793bb9ebb",
      "kind": "detachmentRule",
      "name": "Adrenaline Junkies",
      "det": "Kult of Speed",
      "ref": {
        "kind": "detachmentRule",
        "det": "kult-of-speed"
      },
      "hash": "f6ff7bc4",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "SPEED FREEKS units only, until the end of the turn they were selected to advance or fall back",
            "ru": "только отряды SPEED FREEKS, до конца хода, в котором был advance/fall back"
          },
          "cond": [
            "blocked-subset",
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "63aaaea3-ccd9-49c1-a780-635acc10f066",
      "kind": "detachmentRule",
      "name": "Unpredictable Genius",
      "det": "Madcap Meks",
      "ref": {
        "kind": "detachmentRule",
        "det": "madcap-meks"
      },
      "hash": "40fcc840",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c645655a-3032-4c32-8000-933c5bf20540",
      "kind": "detachmentRule",
      "name": "Sneaky Little Gitz",
      "det": "Runt Swarm",
      "ref": {
        "kind": "detachmentRule",
        "det": "runt-swarm"
      },
      "hash": "a558e996",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": null,
          "scope": 0
        }
      ]
    },
    {
      "sid": "f0baa3e3-6ccc-4878-a5b0-6fcbbc61c725",
      "kind": "detachmentRule",
      "name": "Dakka! Dakka! Dakka!",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "detachmentRule",
        "det": "shoota-boyz"
      },
      "hash": "5b043d1a",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while this unit is riled up",
            "ru": "пока отряд riled up"
          },
          "cond": [
            "riled-up"
          ]
        }
      ]
    },
    {
      "sid": "193c6cc7-5a22-436a-8b53-9d1d45983c3e",
      "kind": "detachmentRule",
      "name": "Suspiciously Well Organised",
      "det": "Taktikal Brigade",
      "ref": {
        "kind": "detachmentRule",
        "det": "taktikal-brigade"
      },
      "hash": "5f2caccc",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": null,
          "scope": 0
        }
      ]
    },
    {
      "sid": "395efe94-4c40-4418-a5c5-c6819280d822",
      "kind": "detachmentRule",
      "name": "Get Stuck In",
      "det": "War Horde",
      "ref": {
        "kind": "detachmentRule",
        "det": "war-horde"
      },
      "hash": "0158c928",
      "ver": 946,
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
      "sid": "986f5db8-d8af-489d-822e-61ae11aca903",
      "kind": "detachmentRule",
      "name": "Powers of da Waaagh!",
      "det": "Wurrband",
      "ref": {
        "kind": "detachmentRule",
        "det": "wurrband"
      },
      "hash": "fc623810",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "ORKS PSYKER models only",
            "ru": "только модели ORKS PSYKER"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "PSYCHIC"
          },
          "when": {
            "en": "ORKS PSYKER models only, once more for every 5 models in the unit (or embarked within the model)",
            "ru": "только модели ORKS PSYKER, ещё раз за каждые 5 моделей в отряде (или на борту)"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": {
            "en": "ORKS PSYKER models only, when the Visions of Violence psychic roll is made",
            "ru": "только модели ORKS PSYKER, при psychic roll Visions of Violence"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "88f3bc00-9f19-444c-ae3a-9c44143b06c4",
      "kind": "enhancement",
      "name": "Extra Platin’",
      "det": "’Ardmob",
      "ref": {
        "kind": "enhancement",
        "det": "cp:orks"
      },
      "hash": "8ed427ee",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": null,
          "target": "unit"
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "dfde7f26-fc85-4e16-879d-79fadb8db2e8",
      "kind": "enhancement",
      "name": "Targetin’ Gizmos (Upgrade)",
      "det": "Blitz Brigade",
      "ref": {
        "kind": "enhancement",
        "det": "blitz-brigade"
      },
      "hash": "64b38a65",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while a BIG MEK model is embarked within this unit",
            "ru": "пока в отряде на борту модель BIG MEK"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while a BIG MEK model is embarked within this unit and this unit is riled up",
            "ru": "пока в отряде на борту модель BIG MEK и отряд riled up"
          },
          "cond": [
            "riled-up",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "89b800e4-a94c-4307-8217-e0b6ee51cb89",
      "kind": "enhancement",
      "name": "Blitzboss",
      "det": "Brute Bosses",
      "ref": {
        "kind": "enhancement",
        "det": "brute-bosses"
      },
      "hash": "3ba4ab47",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1e230c52-458e-46fb-87df-6ab470c0d69d",
      "kind": "enhancement",
      "name": "Brutal But Kunnin’",
      "det": "Brute Bosses",
      "ref": {
        "kind": "enhancement",
        "det": "brute-bosses"
      },
      "hash": "7261e877",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "d5ac90fa-836f-457c-a8cc-504b39ec0f4b",
      "kind": "enhancement",
      "name": "Tellyporta Boss",
      "det": "Bully Boyz",
      "ref": {
        "kind": "enhancement",
        "det": "bully-boyz"
      },
      "hash": "bf963512",
      "ver": 946,
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
      "sid": "7cb15917-20d4-4586-a054-d4c3674bff0d",
      "kind": "enhancement",
      "name": "It Came from da Drops",
      "det": "Da Big Hunt",
      "ref": {
        "kind": "enhancement",
        "det": "da-big-hunt"
      },
      "hash": "8881233b",
      "ver": 946,
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
      "sid": "e7827a76-185e-441e-88ad-17b638605a40",
      "kind": "enhancement",
      "name": "Cybork Boosta",
      "det": "Dread Mob",
      "ref": {
        "kind": "enhancement",
        "det": "dread-mob"
      },
      "hash": "332c8cd7",
      "ver": 946,
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
      "sid": "fd3cd4db-81a6-4567-abe9-fc8b99efe0cd",
      "kind": "enhancement",
      "name": "Dreadherder",
      "det": "Dread Mob",
      "ref": {
        "kind": "enhancement",
        "det": "dread-mob",
        "scopes": [
          {
            "targets": [
              "ORKS WALKER"
            ],
            "excludes": [
              "BIG MEK"
            ],
            "models": [],
            "modelExcludes": []
          },
          {
            "targets": [
              "ORKS WALKER"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "547f6b0f",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly ORKS WALKER unit (excluding BIG MEK units)",
            "ru": "пока в 3\" от дружественного отряда ORKS WALKER (кроме BIG MEK)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3472f66e-cd61-4e21-b2b6-49cf922ec8e7",
      "kind": "enhancement",
      "name": "Flyboss (Upgrade)",
      "det": "Flyboyz",
      "ref": {
        "kind": "enhancement",
        "det": "flyboyz",
        "scopes": [
          {
            "targets": [
              "ORKS AIRCRAFT",
              "DEFFKOPTAS"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "ceb49152",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Character",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "3ba8e0af-efa7-45ab-8628-b18c60e86d9c",
      "kind": "enhancement",
      "name": "Ferocious Show-off",
      "det": "Green Tide",
      "ref": {
        "kind": "enhancement",
        "det": "green-tide"
      },
      "hash": "4ef4b8ae",
      "ver": 946,
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "alt": 0,
          "when": {
            "en": "instead, while this unit has 11 or more models",
            "ru": "вместо этого, пока в отряде 11 и более моделей"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a00cea8c-dcbc-4b8e-b890-b72efc0d22c2",
      "kind": "enhancement",
      "name": "Temperamental Shokka (Upgrade)",
      "det": "Madcap Meks",
      "ref": {
        "kind": "enhancement",
        "det": "madcap-meks"
      },
      "hash": "375ea7cf",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Shokk Attack Gun"
          },
          "when": {
            "en": "on a 2-5 rolled when this unit is selected to shoot",
            "ru": "на 2-5 при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "only": {
            "name": "Shokk Attack Gun"
          },
          "when": {
            "en": "on a 6 rolled when this unit is selected to shoot",
            "ru": "на 6 при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "TORRENT",
          "only": {
            "name": "Shokk Attack Gun"
          },
          "when": {
            "en": "on a 1 rolled when this unit is selected to shoot — this model is then destroyed",
            "ru": "на 1 при выборе отряда для стрельбы — после стрельбы модель уничтожается"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "dc12165f-cea0-40e4-b709-e5c8c1a62c82",
      "kind": "enhancement",
      "name": "Minefield Detail (Upgrade)",
      "det": "Runt Swarm",
      "ref": {
        "kind": "enhancement",
        "det": "runt-swarm"
      },
      "hash": "d68b44b0",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "target": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": {
            "en": "while this unit is not embarked",
            "ru": "пока отряд не на борту транспорта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0fcb5928-ec67-4ef1-811a-fc9efbb44972",
      "kind": "enhancement",
      "name": "Supa-glowy Fing",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "enhancement",
        "det": "shoota-boyz"
      },
      "hash": "8fdc2b5e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 4+",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUPA-HAZARDOUS",
          "when": null
        }
      ]
    },
    {
      "sid": "4801d50d-f3c8-4526-b771-98c6326101ab",
      "kind": "enhancement",
      "name": "Targetin' Squigs",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "enhancement",
        "det": "shoota-boyz"
      },
      "hash": "f45f6931",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 3,
          "when": null,
          "only": {
            "notTag": "TORRENT"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "2de8b6d3-68fc-4c7b-a499-0bff89ab1e06",
      "kind": "enhancement",
      "name": "Kill Kommanda",
      "det": "Taktikal Brigade",
      "ref": {
        "kind": "enhancement",
        "det": "taktikal-brigade"
      },
      "hash": "7566728a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": {
            "en": "while this model is part of an Attached unit",
            "ru": "пока модель входит в Attached unit"
          },
          "cond": [
            "unit-leading"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": {
            "en": "while this model is part of an Attached unit",
            "ru": "пока модель входит в Attached unit"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "9917fe1b-90a8-4136-8390-ef98111bf3ec",
      "kind": "enhancement",
      "name": "Throat-slittas (Upgrade)",
      "det": "Taktikal Brigade",
      "ref": {
        "kind": "enhancement",
        "det": "taktikal-brigade"
      },
      "hash": "0b1708fb",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
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
      "sid": "f17543af-103f-4f5d-8e4e-23941bb32dbb",
      "kind": "enhancement",
      "name": "Follow Me Ladz",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "599690d4",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "22f5eea7-c087-494c-a14a-303ab2b440f4",
      "kind": "enhancement",
      "name": "Headwoppa's Killchoppa",
      "det": "War Horde",
      "ref": {
        "kind": "enhancement",
        "det": "war-horde"
      },
      "hash": "0a82f059",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "97a9351c-5df1-4e64-b4df-4398311533d7",
      "kind": "enhancement",
      "name": "Supa-snazz Dakka (Upgrade)",
      "det": "Wreckas",
      "ref": {
        "kind": "enhancement",
        "det": "wreckas"
      },
      "hash": "bf94d943",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "only": {
            "name": "Snazzgun"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "d855099f-ed54-41f6-bcf1-66e82a05a5ac",
      "kind": "enhancement",
      "name": "Warphead",
      "det": "Wurrband",
      "ref": {
        "kind": "enhancement",
        "det": "wurrband"
      },
      "hash": "44ab9181",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deadly Demise D6",
          "when": null
        }
      ]
    },
    {
      "sid": "10d5e5dd-b0ba-4b15-93d6-cf57f2d8df30",
      "kind": "stratagem",
      "name": "Krump ’Em",
      "det": "’Ardmob",
      "ref": {
        "kind": "stratagem",
        "det": "cp:orks",
        "name": "Krump ’Em"
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
      "sid": "f3c2ea35-be0f-4526-aff0-037a7291bbbf",
      "kind": "stratagem",
      "name": "Medi-Squigs",
      "det": "’Ardmob",
      "ref": {
        "kind": "stratagem",
        "det": "cp:orks",
        "name": "Medi-Squigs"
      },
      "hash": "f506ad10",
      "ver": 995,
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
      "dur": "phase"
    },
    {
      "sid": "4e4f020e-e883-42b8-a741-8dd01868f5b3",
      "kind": "stratagem",
      "name": "Hulking Brutes",
      "det": "Bully Boyz",
      "ref": {
        "kind": "stratagem",
        "det": "bully-boyz",
        "name": "Hulking Brutes"
      },
      "hash": "48ca9646",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "ranged-s-gt-t",
          "when": {
            "en": "the first option",
            "ru": "первый вариант"
          }
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": {
            "en": "the second option",
            "ru": "второй вариант"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d346f908-20a9-4236-a136-a8d1ef36e762",
      "kind": "stratagem",
      "name": "Crazed Rampage",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Crazed Rampage"
      },
      "hash": "9726d47a",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "82c0cb67-c355-4d10-87f6-b6fe2bb1e300",
      "kind": "stratagem",
      "name": "Stomping Juggernaut",
      "det": "Dread Mob",
      "ref": {
        "kind": "stratagem",
        "det": "dread-mob",
        "name": "Stomping Juggernaut"
      },
      "hash": "6ab50acf",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9579d65f-0b07-430d-9139-fa89007766eb",
      "kind": "stratagem",
      "name": "Flyin’ Headbutt",
      "det": "Flyboyz",
      "ref": {
        "kind": "stratagem",
        "det": "flyboyz",
        "name": "Flyin’ Headbutt"
      },
      "hash": "dafc869b",
      "ver": 946,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "55b620c3-7fcc-47c6-b84d-5db12a6ab110",
      "kind": "stratagem",
      "name": "Unbridled Carnage",
      "det": "Green Tide",
      "ref": {
        "kind": "stratagem",
        "det": "green-tide",
        "name": "Unbridled Carnage"
      },
      "hash": "83e4f304",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
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
      "sid": "99acba71-ea9c-4977-829e-36fd55efee09",
      "kind": "stratagem",
      "name": "Dakkastorm",
      "det": "Kult of Speed",
      "ref": {
        "kind": "stratagem",
        "det": "kult-of-speed",
        "name": "Dakkastorm"
      },
      "hash": "a68ae285",
      "ver": 946,
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "80502eff-b45e-4cc9-9440-818fe2c5ad7d",
      "kind": "stratagem",
      "name": "Vindictive Artillerists",
      "det": "Madcap Meks",
      "ref": {
        "kind": "stratagem",
        "det": "madcap-meks",
        "name": "Vindictive Artillerists"
      },
      "hash": "93bb58ce",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "artillerists-lethal"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "artillerists-sustained"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "artillerists-both"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "artillerists-both"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HAZARDOUS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "artillerists-both"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "643ae6df-8ba4-4e57-8bdc-281d28a47788",
      "kind": "stratagem",
      "name": "Glowin’ Dakka",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "stratagem",
        "det": "shoota-boyz",
        "name": "Glowin’ Dakka"
      },
      "hash": "fa7d25f9",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while this stratagem is in force, against targets within 9\"",
            "ru": "пока действует стратагема, по целям в пределах 9\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "08a3c383-6193-4c71-b9ef-c76d53f2f2f4",
      "kind": "stratagem",
      "name": "Kustom Dakka",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "stratagem",
        "det": "shoota-boyz",
        "name": "Kustom Dakka"
      },
      "hash": "c52715f3",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit other than MONSTER or VEHICLE",
            "ru": "против отряда не MONSTER и не VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "8b8a6c4e-e717-4047-b603-43dfd627080a",
      "kind": "stratagem",
      "name": "Never Enough Dakka",
      "det": "Shoota Boyz",
      "ref": {
        "kind": "stratagem",
        "det": "shoota-boyz",
        "name": "Never Enough Dakka"
      },
      "hash": "a68ae285",
      "ver": 946,
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d56876cf-9f3c-41af-bee9-ef1e2f323c26",
      "kind": "stratagem",
      "name": "Close-range Dakka",
      "det": "War Horde",
      "ref": {
        "kind": "stratagem",
        "det": "war-horde",
        "name": "Close-range Dakka"
      },
      "hash": "59c54754",
      "ver": 946,
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
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "add",
          "value": "RAPID FIRE 1",
          "only": {
            "tag": "RAPID FIRE"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "acfae65b-1cc9-40b1-8f62-6d1c1f829c60",
      "kind": "stratagem",
      "name": "Fungus-fuel Injection",
      "det": "War Horde",
      "ref": {
        "kind": "stratagem",
        "det": "war-horde",
        "name": "Fungus-fuel Injection"
      },
      "hash": "6ed179bb",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "37d5a2e0-42f8-4584-ae77-2d8c351169f6",
      "kind": "stratagem",
      "name": "Hit ’Em Harder",
      "det": "War Horde",
      "ref": {
        "kind": "stratagem",
        "det": "war-horde",
        "name": "Hit ’Em Harder"
      },
      "hash": "3a1eb869",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      "sid": "f875cafb-1537-42c0-ac57-3496eba9e86c",
      "kind": "stratagem",
      "name": "Mow ’Em Down",
      "det": "War Horde",
      "ref": {
        "kind": "stratagem",
        "det": "war-horde",
        "name": "Mow ’Em Down"
      },
      "hash": "a89788b7",
      "ver": 946,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "only": {
            "notTag": "CLEAVE"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "add",
          "value": "CLEAVE 1",
          "only": {
            "tag": "CLEAVE"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a81e645c-9812-4536-8b54-df88da659b67",
      "kind": "stratagem",
      "name": "Drive-By Bustin’",
      "det": "Wreckas",
      "ref": {
        "kind": "stratagem",
        "det": "wreckas",
        "name": "Drive-By Bustin’"
      },
      "hash": "840de380",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "weapons selected for the Firing Deck ability only",
            "ru": "только оружие, выбранное для Firing Deck"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "bb256a9c-6c16-4324-bacf-0ccd63244291:big-mek-in-mega-armour",
      "kind": "wargear",
      "name": "Big Mek in Mega Armour: Kustom Force Field",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "big-mek-in-mega-armour",
        "item": "kustom force field"
      },
      "hash": "97fd59d0",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against ranged attacks",
            "ru": "против стрелковых атак"
          },
          "cond": [
            "never"
          ],
          "target": "unit"
        }
      ]
    },
    {
      "sid": "3fff9f1f-547f-4e75-9549-b8cdcf17ff97:tankbustas",
      "kind": "wargear",
      "name": "Tankbustas: Pulsa Rokkit (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "tankbustas",
        "item": "pulsa rokkit (once per battle, per unit)"
      },
      "hash": "c41c8608",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "once per battle, against the MONSTER/VEHICLE unit selected within 24\" when this unit is selected to shoot",
            "ru": "раз за битву, по отряду MONSTER/VEHICLE в пределах 24\", выбранному при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ],
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "once per battle, against the MONSTER/VEHICLE unit selected within 24\" when this unit is selected to shoot",
            "ru": "раз за битву, по отряду MONSTER/VEHICLE в пределах 24\", выбранному при выборе отряда для стрельбы"
          },
          "cond": [
            "never"
          ],
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "fa3cfe2c-a00b-4477-8704-028a96a3df7d:wazbom-blastajet",
      "kind": "wargear",
      "name": "Wazbom Blastajet: Blastajet Force Field",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wazbom-blastajet",
        "item": "blastajet force field"
      },
      "hash": "e4451b78",
      "ver": 995,
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
