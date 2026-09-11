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
      "effects": []
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
      "effects": []
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
      "effects": []
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
      "effects": []
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
        }
      ]
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
            "never"
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
            "never"
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
            "never"
          ]
        }
      ]
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
      "hash": "ee2f2827",
      "ver": 946,
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
          "when": null
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
            ]
          },
          {
            "targets": [
              "ORKS WALKER"
            ],
            "excludes": []
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
          "when": null
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
