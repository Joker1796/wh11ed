// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "space-marines",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "584e5695-0046-4979-b80e-9ed014195d98:adrax-agatone",
      "kind": "ability",
      "name": "Adrax Agatone: Lord of the Pyroclasts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "adrax-agatone"
      },
      "hash": "ee1167ad",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "41c02752-ebe1-49c8-bf8c-fd1ed9e5a540:aggressor-squad",
      "kind": "ability",
      "name": "Aggressor Squad: Close-quarters Firestorm",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aggressor-squad"
      },
      "hash": "57968fc8",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against an enemy unit within 9\" of this unit",
            "ru": "по вражескому отряду в пределах 9\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "25fbd7b8-052e-4816-9158-c5e721cda6d6:ancient",
      "kind": "ability",
      "name": "Ancient: Honour of the Company",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient"
      },
      "hash": "1ff3a604",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a772b972-c54d-46c0-9e7f-1f9b48b13bcf:apothecary-biologis",
      "kind": "ability",
      "name": "Apothecary Biologis: Vivispectral Analysis Targeting",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "apothecary-biologis"
      },
      "hash": "647a1fd6",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-VEHICLE",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-VEHICLE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "02f7446d-0825-4bcf-b9ba-c3541673ac08:assault-force-captain",
      "kind": "ability",
      "name": "Assault Force Captain: Relic Shield",
      "det": null,
      "ref": null,
      "hash": "49d66913",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "df6430d8-151d-4b2b-ad43-d7085b122d93:assault-force-intercessor-squad",
      "kind": "ability",
      "name": "Assault Force Intercessor Squad: Stalwart Defenders",
      "det": null,
      "ref": null,
      "hash": "09d39f7a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a3e337f3-e16c-4344-9b9b-866fbe85cf47:assault-intercessor-squad",
      "kind": "ability",
      "name": "Assault Intercessor Squad: Targeted Intercession",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "assault-intercessor-squad"
      },
      "hash": "8bd57eae",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        }
      ]
    },
    {
      "sid": "8cd188a5-ad6b-438e-9fce-6c000ee32f2b:ballistus-dreadnought",
      "kind": "ability",
      "name": "Ballistus Dreadnought: Ballistus Strike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ballistus-dreadnought"
      },
      "hash": "f5752e8a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against an enemy unit within 24\" of this unit",
            "ru": "по вражескому отряду в пределах 24\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "399168c4-9de8-4093-91be-a79dd7e3d3c4:bladeguard-ancient",
      "kind": "ability",
      "name": "Bladeguard Ancient: Deeds of Legend",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bladeguard-ancient"
      },
      "hash": "43a5b384",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is within range of an objective",
            "ru": "пока отряд в зоне объекта"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is within range of an objective",
            "ru": "пока отряд в зоне объекта"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "3cd7bae1-b669-4e96-ba2e-2a19ea78cfc3:caanok-var",
      "kind": "ability",
      "name": "Caanok Var: Cerebrex Logic Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "caanok-var"
      },
      "hash": "ad03a9b5",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "16191f06-b28c-49dc-ba2d-ac711e4e80ee:captain-in-gravis-armour",
      "kind": "ability",
      "name": "Captain in Gravis Armour: Refuse to Yield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-in-gravis-armour"
      },
      "hash": "6a70b7cf",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7d840579-b213-4446-9646-88a2ffc8d8c0:captain-on-bike",
      "kind": "ability",
      "name": "Captain on Bike: Into the Fray",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-on-bike"
      },
      "hash": "8febbea6",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "c0aabc59-5ee0-4031-a71a-be2968997e7a:captain-titus",
      "kind": "ability",
      "name": "Captain Titus: Righteous Fury (Once per battle, per army)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-titus"
      },
      "hash": "9f5ea981",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, in the Fight phase this ability is used",
            "ru": "раз за битву, в фазе боя, когда применена способность"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "835da25a-0e87-4959-b8e8-4f9ea4a4fbf7:captain",
      "kind": "ability",
      "name": "Captain: Finest Hour (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain"
      },
      "hash": "aeb5584d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "once per battle, when this unit is selected to fight and the ability is used",
            "ru": "раз за битву, когда отряд выбран для боя и применена способность"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "once per battle, when this unit is selected to fight and the ability is used",
            "ru": "раз за битву, когда отряд выбран для боя и применена способность"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d8e70ed7-d7ad-4381-91ba-92a8a48bedcc:centurion-assault-squad",
      "kind": "ability",
      "name": "Centurion Assault Squad: Annihilator Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "centurion-assault-squad"
      },
      "hash": "92849b78",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "against a MONSTER, VEHICLE or FORTIFICATION unit",
            "ru": "по отряду MONSTER, VEHICLE или FORTIFICATION"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "865829b2-fabf-45d8-9fa7-50809de8776d:cerberus",
      "kind": "ability",
      "name": "Cerberus: Atomantic Arc-reactor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cerberus"
      },
      "hash": "5bfba956",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "cond": [
            "unit-stationary"
          ],
          "only": {
            "name": "Cerberus Neutron Pulse Array"
          },
          "when": {
            "en": "in a turn this unit remained stationary",
            "ru": "в ходу, когда отряд остался на месте"
          }
        }
      ]
    },
    {
      "sid": "378fab7c-741e-4727-a39f-ce355c1dd307:chaplain-in-terminator-armour",
      "kind": "ability",
      "name": "Chaplain in Terminator Armour: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-in-terminator-armour"
      },
      "hash": "596d0ee2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "c9bee506-a8a1-4cdd-841d-fcd3756ad06e:chaplain-in-terminator-armour",
      "kind": "ability",
      "name": "Chaplain in Terminator Armour: Zealous Fortitude",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-in-terminator-armour"
      },
      "hash": "163ad0c5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "93eb7004-8620-415a-8966-1f37ee86c8eb:chaplain-on-bike",
      "kind": "ability",
      "name": "Chaplain on Bike: Catechism of Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-on-bike"
      },
      "hash": "a4b32329",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "in your Shooting phase, against the one visible enemy unit selected",
            "ru": "в вашей фазе стрельбы, по одному выбранному видимому вражескому отряду"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "in your Shooting phase, against the one visible enemy unit selected",
            "ru": "в вашей фазе стрельбы, по одному выбранному видимому вражескому отряду"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "7d3c1fa3-1751-41f8-b326-dfef5fdf7708:chaplain-on-bike",
      "kind": "ability",
      "name": "Chaplain on Bike: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-on-bike"
      },
      "hash": "596d0ee2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "d1c78381-4a7f-4d89-a3ea-3928cbf2f686:chaplain-with-jump-pack",
      "kind": "ability",
      "name": "Chaplain with Jump Pack: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-with-jump-pack"
      },
      "hash": "596d0ee2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "4de19432-c4a3-4c08-8777-34f10ac0681a:chaplain",
      "kind": "ability",
      "name": "Chaplain: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain"
      },
      "hash": "596d0ee2",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "e82f9461-4b8f-4879-ba74-190f7da11707:chief-librarian-tigurius",
      "kind": "ability",
      "name": "Chief Librarian Tigurius: Hood of Hellfire (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-tigurius"
      },
      "hash": "f4b48831",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "9e742014-055a-4a5d-a8cb-2a09a9c5ba67:chief-librarian-tigurius",
      "kind": "ability",
      "name": "Chief Librarian Tigurius: Prescience (psychic level 2)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-tigurius",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "c5ef4cbd",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "until the start of your next turn, while this ability is the one selected",
            "ru": "до начала вашего следующего хода, пока выбрана эта способность"
          }
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "until the start of your next turn, while this ability is the one selected",
            "ru": "до начала вашего следующего хода, пока выбрана эта способность"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "d2fc6032-7e31-4f6e-8acf-d8877b1b5a59:chief-librarian-tigurius",
      "kind": "ability",
      "name": "Chief Librarian Tigurius: Telepathic Assault (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-tigurius",
        "set": "Chief Librarian (psyker level 3)",
        "pickLimit": 1
      },
      "hash": "449f2df2",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d040d2bc-eab4-43e1-b5d7-eb10f1637050:desolation-squad",
      "kind": "ability",
      "name": "Desolation Squad: Targeter Optics",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "desolation-squad"
      },
      "hash": "64c22827",
      "ver": 963,
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
      "sid": "6184d3b6-dd74-4b2b-82d9-5bb83d74d486:eliminator-squad",
      "kind": "ability",
      "name": "Eliminator Squad: Special-issue Optics and Ammunition",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eliminator-squad"
      },
      "hash": "6142c372",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "in your Shooting phase, if this option is selected when the unit is selected to shoot",
            "ru": "в вашей фазе стрельбы, если этот вариант выбран, когда отряд выбран для стрельбы"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2487c8f9-af58-4ca2-b49e-5fffc0ec2fb2:eradicator-squad-with-heavy-bolters",
      "kind": "ability",
      "name": "Eradicator Squad with heavy bolters: Overlapping Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eradicator-squad-with-heavy-bolters"
      },
      "hash": "13c72a30",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "BLAST 1",
          "only": {
            "name": "Heavy Bolter"
          },
          "when": {
            "en": "in your Shooting phase, against the one enemy unit selected",
            "ru": "в вашей фазе стрельбы, по одному выбранному вражескому отряду"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "bce4e14c-6e99-4001-8633-51d76c2bd049:falchion",
      "kind": "ability",
      "name": "Falchion: Titan-killer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "falchion"
      },
      "hash": "40c6056a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Twin Falchion Volcano Cannon"
          },
          "when": {
            "en": "against a MONSTER or VEHICLE unit",
            "ru": "по отряду MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ce5a4a03-2903-4b94-826c-19fd528145c6:gladiator-reaper",
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
            "en": "against a unit other than MONSTER or VEHICLE",
            "ru": "по отряду, кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "78ad28aa-2c05-4940-91ce-dce04a547b21:gladiator-valiant",
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
            "en": "against a unit within 12\" of this unit",
            "ru": "по отряду в пределах 12\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "30143527-9c7a-4b8e-982f-b0ad9bdc20e8:infernus-squad",
      "kind": "ability",
      "name": "Infernus Squad: Driven from Cover",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "infernus-squad"
      },
      "hash": "dedf381e",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7d1a99e3-7442-4fbf-a5a3-bdcf0bd24275:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Iron Father",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros"
      },
      "hash": "3ff6a498",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly ADEPTUS ASTARTES VEHICLE unit",
            "ru": "пока в пределах 3\" от дружественного отряда ADEPTUS ASTARTES VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6ad35390-b52e-42a4-8b2f-6c728c1bd690:judiciar",
      "kind": "ability",
      "name": "Judiciar: Tempormortis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "judiciar"
      },
      "hash": "5d3f322a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "32747ba5-0369-45d2-9122-8469eebccf82:kaius-konorius",
      "kind": "ability",
      "name": "Kaius Konorius: Veteran Bodyguard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kaius-konorius"
      },
      "hash": "8f05048a",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "21bcf544-e7df-4c32-8a41-d035f2a23a40:korsarro-khan",
      "kind": "ability",
      "name": "Kor’sarro Khan: For the Khan!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "korsarro-khan"
      },
      "hash": "ec456cc6",
      "ver": 963,
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
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "1a987360-778b-4562-8ce5-6f28c37c7515:kratos",
      "kind": "ability",
      "name": "Kratos: Line-breaker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kratos"
      },
      "hash": "ea451376",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d27f8297-8acd-4d4d-bdcc-17df4de6f631:land-raider-crusader",
      "kind": "ability",
      "name": "Land Raider Crusader: Fury of the Machine Spirit",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "land-raider-crusader"
      },
      "hash": "a71a5d2c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "against a unit within 12\" of this unit",
            "ru": "по отряду в пределах 12\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "272b4bcd-b842-487b-98b0-1ad0a7c4309a:land-raider-redeemer",
      "kind": "ability",
      "name": "Land Raider Redeemer: Wrath of the Machine Spirit",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "land-raider-redeemer"
      },
      "hash": "620c19cb",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS: non-MONSTER/VEHICLE",
          "when": {
            "en": "against a unit within 12\" of this unit",
            "ru": "по отряду в пределах 12\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "27473662-03cb-418a-b6e0-9d9b9dc4001d:librarian-in-phobos-armour",
      "kind": "ability",
      "name": "Librarian in Phobos Armour: Psychic Hood (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-phobos-armour"
      },
      "hash": "d019fba5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "15c5cc5a-a6c5-46fc-bbca-aa37fb80499e:librarian-in-phobos-armour",
      "kind": "ability",
      "name": "Librarian in Phobos Armour: Shrouding (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-phobos-armour",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "a866e3ed",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3dc4c0ab-b583-4323-ba4a-58aa801565d4:librarian-in-phobos-armour",
      "kind": "ability",
      "name": "Librarian in Phobos Armour: Soul Sight (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-phobos-armour",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "db309061",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0014616e-e194-4505-817d-9a5566b31533:librarian-in-terminator-armour",
      "kind": "ability",
      "name": "Librarian in Terminator Armour: Might of Heroes (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-terminator-armour",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "e5191758",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, while this ability is the one selected",
            "ru": "в фазе боя, пока выбрана эта способность"
          },
          "cond": [
            "phase-fight"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "in the Fight phase, while this ability is the one selected",
            "ru": "в фазе боя, пока выбрана эта способность"
          },
          "cond": [
            "phase-fight"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "1087bd20-513d-4c97-b30a-ec7ef844c287:librarian-in-terminator-armour",
      "kind": "ability",
      "name": "Librarian in Terminator Armour: Psychic Hood (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-terminator-armour"
      },
      "hash": "d019fba5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "148c2002-0749-48f0-86ba-4c3d1848012f:librarian-in-terminator-armour",
      "kind": "ability",
      "name": "Librarian in Terminator Armour: Thunderous Force (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-terminator-armour",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "9c5105f9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in your Shooting phase, while this ability is the one selected",
            "ru": "в вашей фазе стрельбы, пока выбрана эта способность"
          },
          "cond": [
            "phase-shooting"
          ]
        },
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in your Shooting phase, while this ability is the one selected",
            "ru": "в вашей фазе стрельбы, пока выбрана эта способность"
          },
          "cond": [
            "phase-shooting"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "143b3006-3f52-462a-a5f9-fbe060bbb14a:librarian",
      "kind": "ability",
      "name": "Librarian: Force Dome (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "af886321",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "until the start of your next turn, while this ability is the one selected",
            "ru": "до начала вашего следующего хода, пока выбрана эта способность"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "until the start of your next turn, while this ability is the one selected",
            "ru": "до начала вашего следующего хода, пока выбрана эта способность"
          },
          "target": "led"
        }
      ]
    },
    {
      "sid": "0cec6225-3383-4391-8216-5065b0c32099:librarian",
      "kind": "ability",
      "name": "Librarian: Psychic Hood (Psychic)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian"
      },
      "hash": "d019fba5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "33b1a888-ae28-4c1e-96e7-529dfa571d1a:librarian",
      "kind": "ability",
      "name": "Librarian: Veil of Time (psychic level 1)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian",
        "set": "Librarian (psyker level 1)",
        "pickLimit": 1
      },
      "hash": "a18e1ca8",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a313a7c1-1493-45cf-ba81-d3bffa4c9809:lieutenant-in-phobos-armour",
      "kind": "ability",
      "name": "Lieutenant in Phobos Armour: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lieutenant-in-phobos-armour"
      },
      "hash": "8ed5afe9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "20a56354-c4f2-4d0a-832b-dc65cfe2d9b6:lieutenant",
      "kind": "ability",
      "name": "Lieutenant: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lieutenant"
      },
      "hash": "8ed5afe9",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8e150431-b200-4a25-9496-952de9fee2a0:marneus-calgar",
      "kind": "ability",
      "name": "Marneus Calgar: Thunderhawk Insertion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "marneus-calgar"
      },
      "hash": "85ca728e",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "708a229d-dfca-40e2-a998-8330207a059a:mastodon",
      "kind": "ability",
      "name": "Mastodon: Inviolable Transport",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mastodon"
      },
      "hash": "0107c60b",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9c4afb75-4165-4343-aba7-fea248a178fa:outrider-squad",
      "kind": "ability",
      "name": "Outrider Squad: Full-throttle Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "outrider-squad"
      },
      "hash": "ce40d4d5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        },
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Thunder Hammer"
          },
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
          "cond": [
            "unit-charged"
          ],
          "only": {
            "notName": [
              "Thunder Hammer"
            ]
          },
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        }
      ]
    },
    {
      "sid": "2fda4884-627e-49b1-ae66-5de4cda7ebb2:predator-destructor",
      "kind": "ability",
      "name": "Predator Destructor: Destructor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "predator-destructor"
      },
      "hash": "35a85d6f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against an INFANTRY unit",
            "ru": "по отряду INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1b22825b-f33e-4e13-b4ad-77aa7d7b45c3:rapier-carrier",
      "kind": "ability",
      "name": "Rapier Carrier: Powerful Volley",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rapier-carrier"
      },
      "hash": "ff7d1396",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "cond": [
            "unit-stationary"
          ],
          "only": {
            "tag": "HEAVY"
          },
          "when": {
            "en": "in a turn this unit remained stationary",
            "ru": "в ходу, когда отряд остался на месте"
          }
        }
      ]
    },
    {
      "sid": "63467e90-2ee5-424e-bed6-7a3f9ef74d51:reiver-squad",
      "kind": "ability",
      "name": "Reiver Squad: Terror Troops (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "reiver-squad"
      },
      "hash": "bd848d31",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f5b1d610-abf9-4974-9420-bf649e771763:roboute-guilliman",
      "kind": "ability",
      "name": "Roboute Guilliman: Leader of Astartes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "roboute-guilliman"
      },
      "hash": "73392ab4",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly ADEPTUS ASTARTES INFANTRY unit",
            "ru": "пока в пределах 3\" от дружественного отряда ADEPTUS ASTARTES INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6aadadd0-ad58-4ae0-859b-d25ce4e09024:storm-speeder-hailstrike",
      "kind": "ability",
      "name": "Storm Speeder Hailstrike: Hailstrike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-hailstrike"
      },
      "hash": "dedf381e",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1993f88a-40fc-4dc0-9c25-81846a3410f2:storm-speeder-hammerstrike",
      "kind": "ability",
      "name": "Storm Speeder Hammerstrike: Hammerstrike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-hammerstrike"
      },
      "hash": "31938391",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against an enemy unit within a terrain area",
            "ru": "по вражескому отряду в зоне местности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4167b4e1-b918-4fdf-bf72-0ccf1008a699:storm-speeder-thunderstrike",
      "kind": "ability",
      "name": "Storm Speeder Thunderstrike: Shattered Defences",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-thunderstrike"
      },
      "hash": "d0165b85",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "447c2db5-2b78-4be4-85f5-ebcd62afdf78:stormraven-gunship",
      "kind": "ability",
      "name": "Stormraven Gunship: Armoured Resilience",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormraven-gunship"
      },
      "hash": "9bdc06bf",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3ae58a8f-aacd-4cb7-9eea-c5418de1a794:suboden-khan",
      "kind": "ability",
      "name": "Suboden Khan: Spear of Chogoris",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "suboden-khan"
      },
      "hash": "73d119d6",
      "ver": 963,
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
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "304e2cf5-c31e-4a1a-a232-9d722bfdc432:techmarine",
      "kind": "ability",
      "name": "Techmarine: Techmarine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "techmarine"
      },
      "hash": "38b83569",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative",
          "when": {
            "en": "while within 3\" of a friendly ADEPTUS ASTARTES VEHICLE unit",
            "ru": "пока в пределах 3\" от дружественного отряда ADEPTUS ASTARTES VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c53dc92f-7674-4851-b528-73461327110e:terminator-assault-squad",
      "kind": "ability",
      "name": "Terminator Assault Squad: Terminatus Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "terminator-assault-squad"
      },
      "hash": "7f24eadd",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "cond": [
            "unit-charged"
          ],
          "only": {
            "name": "Twin Lightning Claws"
          },
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: MONSTER/VEHICLE",
          "cond": [
            "unit-charged"
          ],
          "only": {
            "name": "Thunder Hammer"
          },
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        }
      ]
    },
    {
      "sid": "21c0a3d2-b332-48e3-9cd0-5594227a9f45:terminator-squad",
      "kind": "ability",
      "name": "Terminator Squad: Fury of the First",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "terminator-squad"
      },
      "hash": "2268f2fa",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against a unit within 9\" of this unit",
            "ru": "по отряду в пределах 9\" от этого отряда"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "582fa48b-4576-4858-9615-89e3d5fe36d7:thunderhawk-gunship",
      "kind": "ability",
      "name": "Thunderhawk Gunship: Aerial Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "thunderhawk-gunship"
      },
      "hash": "fe6024fb",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0cb77761-4331-4bd7-ab1d-7e8525d0a5c0:tor-garadon",
      "kind": "ability",
      "name": "Tor Garadon: Siege Captain",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tor-garadon"
      },
      "hash": "7706689c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against a FORTIFICATION, MONSTER or VEHICLE unit",
            "ru": "по отряду FORTIFICATION, MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "when": {
            "en": "against a FORTIFICATION, MONSTER or VEHICLE unit",
            "ru": "по отряду FORTIFICATION, MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against a FORTIFICATION, MONSTER or VEHICLE unit",
            "ru": "по отряду FORTIFICATION, MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "24f2f7fc-36e6-4297-b610-bbeb33630471:typhon",
      "kind": "ability",
      "name": "Typhon: Sunderer of Fortresses",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "typhon"
      },
      "hash": "27bc2769",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a VEHICLE unit",
            "ru": "по отряду VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a VEHICLE unit",
            "ru": "по отряду VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against a FORTIFICATION unit",
            "ru": "по отряду FORTIFICATION"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against a FORTIFICATION unit",
            "ru": "по отряду FORTIFICATION"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0e7c1cc4-57ef-490a-974c-902f33f53710:vanguard-veteran-squad",
      "kind": "ability",
      "name": "Vanguard Veteran Squad: Vanguard Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vanguard-veteran-squad"
      },
      "hash": "6642aa0a",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "cond": [
            "unit-charged"
          ],
          "when": {
            "en": "if this unit made a charge move this turn",
            "ru": "если отряд совершил charge в этом ходу"
          }
        }
      ]
    },
    {
      "sid": "ced63a07-5997-42ef-90f3-9b83600f5984:vindicator",
      "kind": "ability",
      "name": "Vindicator: Siege Shield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vindicator"
      },
      "hash": "ea451376",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "472098f6-5600-40d5-a2f5-351f06ab11d7:vulkan-hestan",
      "kind": "ability",
      "name": "Vulkan He’stan: Forgefather",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vulkan-hestan",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "ad49af85",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "tag": "MELTA"
          },
          "target": "aura",
          "when": {
            "en": "in your Shooting phase, against the one visible enemy unit within 24\" selected",
            "ru": "в вашей фазе стрельбы, по одному выбранному видимому вражескому отряду в пределах 24\""
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "only": {
            "tag": "TORRENT"
          },
          "target": "aura",
          "when": {
            "en": "in your Shooting phase, against the one visible enemy unit within 24\" selected",
            "ru": "в вашей фазе стрельбы, по одному выбранному видимому вражескому отряду в пределах 24\""
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1a8c7b0d-026e-48df-b21a-cdc238bef79d",
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
          "cond": [
            "doctrine-devastator"
          ],
          "when": {
            "en": "while the Devastator Doctrine is active for this unit",
            "ru": "пока для отряда активна Devastator Doctrine"
          }
        }
      ]
    },
    {
      "sid": "8102e3e2-4887-44d1-a3ca-a40599dffed2",
      "kind": "detachmentRule",
      "name": "Indomitable Resolve",
      "det": "Assault Force",
      "ref": null,
      "hash": "e1c85f08",
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
      "sid": "2ca5154a-cdb4-4e25-b9d2-8022d14c59f3",
      "kind": "detachmentRule",
      "name": "Combined Deployment",
      "det": "Gauntlet Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "gauntlet-task-force"
      },
      "hash": "20ecfd27",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against an assailed unit, if this unit disembarked this turn",
            "ru": "по отряду под статусом assailed, если отряд высадился в этом ходу"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4798ba1e-a489-466a-a666-2d9ec60f3640",
      "kind": "detachmentRule",
      "name": "Walking Fortress",
      "det": "Gravis Linebreaker Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "gravis-linebreaker-force"
      },
      "hash": "eadd4f9c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in a turn this unit made a normal move",
            "ru": "в ходу, когда отряд совершил normal move"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0c24b29a-a510-4be8-a719-2d0d7775de83",
      "kind": "detachmentRule",
      "name": "Lightning-fast Strike",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "stormlance-task-force"
      },
      "hash": "aa2337f5",
      "ver": 963,
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
      "sid": "da2ba2dc-9901-4782-acd4-c09b2511f42c",
      "kind": "enhancement",
      "name": "Furious Assault (Upgrade)",
      "det": "Assault Brethren",
      "ref": {
        "kind": "enhancement",
        "det": "assault-brethren"
      },
      "hash": "6e2e0364",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": null
        }
      ]
    },
    {
      "sid": "df54e4af-9023-4a38-ba72-88a7b7be921e",
      "kind": "enhancement",
      "name": "Battle-line Veterans",
      "det": "Assault Force",
      "ref": null,
      "hash": "1b0678c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": null,
          "only": {
            "name": "Bolt rifle"
          }
        }
      ],
      "note": "names one weapon by name, a subset of the table this format cannot single out"
    },
    {
      "sid": "e1880410-efea-489c-acd6-ec46ee717579",
      "kind": "enhancement",
      "name": "Honour of Vigilance",
      "det": "Devastator Brethren",
      "ref": {
        "kind": "enhancement",
        "det": "devastator-brethren"
      },
      "hash": "4575143c",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "557037f8-5887-4d0f-8f83-3ebe1c0fc17b",
      "kind": "enhancement",
      "name": "Master-forged Firearms",
      "det": "Devastator Brethren",
      "ref": {
        "kind": "enhancement",
        "det": "devastator-brethren"
      },
      "hash": "af41e258",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "notTag": "PSYCHIC"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "notTag": "PSYCHIC"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "notTag": "PSYCHIC"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "notTag": "PSYCHIC"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "5a6f7e00-ba8e-4472-bff8-b77bdb592873",
      "kind": "enhancement",
      "name": "Laurels of Triumph",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "66e47c26",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
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
          "stat": "s",
          "op": "add",
          "value": 2,
          "alt": 0,
          "when": {
            "en": "instead, if the Assault Doctrine is active for this unit",
            "ru": "вместо этого, если для этого отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "alt": 1,
          "when": {
            "en": "instead, if the Assault Doctrine is active for this unit",
            "ru": "вместо этого, если для этого отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ]
        }
      ]
    },
    {
      "sid": "355dc4ff-3abb-4a99-a22b-e18bf5ba23f1",
      "kind": "enhancement",
      "name": "Standard of the Emperor Ascendant",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "0ed6a3d5",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "target": "led",
          "when": {
            "en": "once per battle, when this unit is selected to fight and Ancient Exhortation is used",
            "ru": "раз за битву, когда отряд выбран для боя и применена Ancient Exhortation"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e02569a9-63d8-41a7-8527-7cbf177994dc",
      "kind": "enhancement",
      "name": "Relentless Advance",
      "det": "Gravis Linebreaker Force",
      "ref": {
        "kind": "enhancement",
        "det": "gravis-linebreaker-force"
      },
      "hash": "6f636b98",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 5\"",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "49a3eeac-4b84-48b0-8645-89fe610e4565",
      "kind": "enhancement",
      "name": "Immovable Conquerors (Upgrade)",
      "det": "Gravis Siege Force",
      "ref": {
        "kind": "enhancement",
        "det": "gravis-siege-force"
      },
      "hash": "f362ca5f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "target": "unit",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "40dd9974-8a7a-454a-84c7-87b5684d1ddd",
      "kind": "enhancement",
      "name": "Artificer Sarcophagus (Upgrade)",
      "det": "Ironclad Champions",
      "ref": {
        "kind": "enhancement",
        "det": "ironclad-champions"
      },
      "hash": "50b0af89",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "29b7dfd4-e752-44ce-8e04-7bec64d3676a",
      "kind": "enhancement",
      "name": "Gunnery Honours (Upgrade)",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "e855e843",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "target": "unit",
          "stat": "ability",
          "op": "grant",
          "value": "HEAVY",
          "when": null
        }
      ]
    },
    {
      "sid": "d980ac64-96bc-44ea-a6e4-e6444527ce4f",
      "kind": "enhancement",
      "name": "Spearpoint War Leader",
      "det": "Tacticus Attack Force",
      "ref": {
        "kind": "enhancement",
        "det": "tacticus-attack-force"
      },
      "hash": "0aa0641d",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "277e10e2-4413-4740-a497-3911ef209659",
      "kind": "enhancement",
      "name": "Champion of the First Company",
      "det": "Terminator Storm Force",
      "ref": {
        "kind": "enhancement",
        "det": "terminator-storm-force"
      },
      "hash": "24cd08f4",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "2231de02-6135-415d-b7aa-75d50cce64c0",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Assault Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "assault-brethren",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1c905c51-e046-4fdd-9af0-9db2c3264f09",
      "kind": "stratagem",
      "name": "Gene-wrought Might",
      "det": "Assault Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "assault-brethren",
        "name": "Gene-wrought Might"
      },
      "hash": "cf01f899",
      "ver": 963,
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if the Assault Doctrine is active for your unit",
            "ru": "если для вашего отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2daf77ae-8d3b-4e72-9817-c162bb862d97",
      "kind": "stratagem",
      "name": "Decapitating Strike",
      "det": "Assault Force",
      "ref": null,
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
      "sid": "320443fe-cbed-43e8-a842-39031851521e",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Devastator Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "devastator-brethren",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3fabbfae-be83-4875-b4a3-4fb4fe636946",
      "kind": "stratagem",
      "name": "Storm of Fire",
      "det": "Devastator Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "devastator-brethren",
        "name": "Storm of Fire"
      },
      "hash": "96cfa975",
      "ver": 963,
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
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if the Devastator Doctrine is active for your unit",
            "ru": "если для вашего отряда активна Devastator Doctrine"
          },
          "cond": [
            "doctrine-devastator"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "33df5b29-9ce8-4006-bd24-84a3a21ef5ff",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c241bb1c-fa73-4511-8e23-08bff4078645",
      "kind": "stratagem",
      "name": "Might of angels",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Might of angels"
      },
      "hash": "127e1a54",
      "ver": 963,
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "bce16b2b-9e11-4261-b289-bf6b8263d215",
      "kind": "stratagem",
      "name": "Storm of devastation",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Storm of devastation"
      },
      "hash": "5938c3ef",
      "ver": 963,
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
      "sid": "c0f4bf53-fc82-4bd5-8dd4-40145bcbb7ab",
      "kind": "stratagem",
      "name": "Annihilating Force",
      "det": "Gravis Linebreaker Force",
      "ref": {
        "kind": "stratagem",
        "det": "gravis-linebreaker-force",
        "name": "Annihilating Force"
      },
      "hash": "060347d5",
      "ver": 963,
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
      "sid": "06eabc83-38ee-4cdd-865d-7c2ec0df09d3",
      "kind": "stratagem",
      "name": "Annihilating Force",
      "det": "Gravis Siege Force",
      "ref": {
        "kind": "stratagem",
        "det": "gravis-siege-force",
        "name": "Annihilating Force"
      },
      "hash": "060347d5",
      "ver": 963,
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
      "sid": "e6b56ddb-72ef-4a15-bbb0-37617ac10aa3",
      "kind": "stratagem",
      "name": "Headhunter Doctrine",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "ironstorm-spearhead",
        "name": "Headhunter Doctrine"
      },
      "hash": "59f51f60",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "4dcd9969-50cd-434d-93f0-803acbd06d88",
      "kind": "stratagem",
      "name": "Layered Ceramite",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "ironstorm-spearhead",
        "name": "Layered Ceramite"
      },
      "hash": "5967579f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds)",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f45a0e70-edb7-4ad8-ad8a-b57ae034d2e2",
      "kind": "stratagem",
      "name": "Strike from the Shadows",
      "det": "Phobos Shadow Force",
      "ref": {
        "kind": "stratagem",
        "det": "phobos-shadow-force",
        "name": "Strike from the Shadows"
      },
      "hash": "8bfbc70b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
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
      "sid": "92753f7c-096e-4131-8d40-1b5ac200c4bb",
      "kind": "stratagem",
      "name": "Strike from the Shadows",
      "det": "Phobos Shock Force",
      "ref": {
        "kind": "stratagem",
        "det": "phobos-shock-force",
        "name": "Strike from the Shadows"
      },
      "hash": "8bfbc70b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
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
      "sid": "033c22a0-7a34-425e-9748-fd8f90170bc0",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Tactical Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "tactical-brethren",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2027496a-5e84-4b25-947a-41c81d0326b2",
      "kind": "stratagem",
      "name": "Transhuman Swiftness",
      "det": "Tacticus Attack Force",
      "ref": {
        "kind": "stratagem",
        "det": "tacticus-attack-force",
        "name": "Transhuman Swiftness"
      },
      "hash": "ae48cff3",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7b259994-1663-40d6-8449-d43895a65923",
      "kind": "stratagem",
      "name": "For the Emperor!",
      "det": "Tacticus Firestorm Force",
      "ref": {
        "kind": "stratagem",
        "det": "tacticus-firestorm-force",
        "name": "For the Emperor!"
      },
      "hash": "076afe4b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "0ae3eb6a-9b3a-4aaf-9159-0d94b0adfe46",
      "kind": "stratagem",
      "name": "Tactical Dreadnought Fortitude",
      "det": "Terminator Storm Force",
      "ref": {
        "kind": "stratagem",
        "det": "terminator-storm-force",
        "name": "Tactical Dreadnought Fortitude"
      },
      "hash": "9c6e19d7",
      "ver": 963,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9cb2e570-6af8-4c6f-b89a-4951b094cc3c:captain-with-jump-pack",
      "kind": "wargear",
      "name": "Captain with Jump Pack: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "captain-with-jump-pack",
        "item": "relic shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "9cb2e570-6af8-4c6f-b89a-4951b094cc3c:captain",
      "kind": "wargear",
      "name": "Captain: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "captain",
        "item": "relic shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "9e4e6ed8-5bfb-4a0c-9d43-815237c98acb:centurion-assault-squad",
      "kind": "wargear",
      "name": "Centurion Assault Squad: Centurion Assault Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "centurion-assault-squad",
        "item": "centurion assault launcher"
      },
      "hash": "be9f5eba",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "EXPLOSIVES",
          "when": null
        }
      ]
    },
    {
      "sid": "9cb2e570-6af8-4c6f-b89a-4951b094cc3c:chaplain-in-terminator-armour",
      "kind": "wargear",
      "name": "Chaplain in Terminator Armour: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "chaplain-in-terminator-armour",
        "item": "relic shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
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
    },
    {
      "sid": "c6dcf2b4-2fd6-4784-b165-c228216fdb22:reiver-squad",
      "kind": "wargear",
      "name": "Reiver Squad: Grav-chutes",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "reiver-squad",
        "item": "grav-chutes"
      },
      "hash": "5b61aed0",
      "ver": 963,
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
      "sid": "33ffd159-0227-4b14-a504-7452ad364393:terminator-assault-squad",
      "kind": "wargear",
      "name": "Terminator Assault Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "terminator-assault-squad",
        "item": "storm shield"
      },
      "hash": "24c8e47f",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "cond": [
            "wargear-bearer"
          ],
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          }
        }
      ]
    },
    {
      "sid": "3199cd19-2500-4eca-be01-4db87caf8b79:victrix-honour-guard",
      "kind": "wargear",
      "name": "Victrix Honour Guard: Banner of Macragge",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "victrix-honour-guard",
        "item": "banner of macragge"
      },
      "hash": "db0aa42b",
      "ver": 963,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per battle, when this unit is selected to fight and the banner is used",
            "ru": "раз за битву, когда отряд выбран для боя и применено знамя"
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
            "en": "once per battle, when this unit is selected to fight and the banner is used",
            "ru": "раз за битву, когда отряд выбран для боя и применено знамя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    }
  ]
}
