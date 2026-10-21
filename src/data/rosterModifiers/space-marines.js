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
      "sid": "cacc46bb-28e9-4730-8764-b507b551a175:ancient-in-terminator-armour",
      "kind": "ability",
      "name": "Ancient in Terminator Armour: Never Shall the Standard Fall",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient-in-terminator-armour"
      },
      "hash": "1c83144e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": {
            "en": "while within range of an objective",
            "ru": "пока отряд в зоне objective"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": {
            "en": "while within range of an objective",
            "ru": "пока отряд в зоне objective"
          },
          "cond": [
            "never"
          ],
          "target": "led"
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
      "ref": {
        "kind": "ability",
        "unit": "assault-force-captain"
      },
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
      "ref": {
        "kind": "ability",
        "unit": "assault-force-intercessor-squad"
      },
      "hash": "09d39f7a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while every model of this unit is within range of an objective",
            "ru": "пока все модели отряда в зоне objective"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "aff1e5d8-2fb7-45bd-9c88-21b53740e80b:astraeus",
      "kind": "ability",
      "name": "Astraeus: Suppression Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "astraeus"
      },
      "hash": "019f0f9c",
      "ver": 995,
      "reviewed": true,
      "effects": []
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
      "sid": "bf5726d3-6d1a-4f12-98cb-95ef1f0cd7ee:bladeguard-veteran-squad",
      "kind": "ability",
      "name": "Bladeguard Veteran Squad: Bladeguard (Once per turn, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bladeguard-veteran-squad"
      },
      "hash": "25373447",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the option picked when this unit is selected to fight",
            "ru": "вариант, выбранный, когда отряд выбран для боя"
          },
          "cond": [
            "bladeguard-hit"
          ]
        },
        {
          "op": "state",
          "cond": [
            "bladeguard-defend"
          ],
          "when": {
            "en": "the option picked when an enemy unit targets this unit",
            "ru": "вариант, выбранный, когда враг выбирает отряд целью"
          }
        },
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "the option picked when an enemy unit targets this unit",
            "ru": "вариант, выбранный, когда враг выбирает отряд целью"
          },
          "cond": [
            "bladeguard-defend"
          ]
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
      "sid": "118a5e29-fab0-4a4e-9210-ca055fdd1e21:caanok-var",
      "kind": "ability",
      "name": "Caanok Var: Cold and Calculating",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "caanok-var"
      },
      "hash": "8d91366b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "cold-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "both, while the Tactical Doctrine is active for this unit",
            "ru": "обе, пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "cold-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": {
            "en": "both, while the Tactical Doctrine is active for this unit",
            "ru": "обе, пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "target": "led",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "cold-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "target": "led",
          "when": {
            "en": "both, while the Tactical Doctrine is active for this unit",
            "ru": "обе, пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "target": "led",
          "when": {
            "en": "the one picked when the unit is selected to attack",
            "ru": "выбранная, когда отряд выбран для атаки"
          },
          "cond": [
            "cold-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "target": "led",
          "when": {
            "en": "both, while the Tactical Doctrine is active for this unit",
            "ru": "обе, пока для отряда активна Tactical Doctrine"
          },
          "cond": [
            "doctrine-tactical"
          ]
        }
      ]
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
      "sid": "67116f38-2c9f-4df3-b38e-ab82d0758ac5:captain-titus",
      "kind": "ability",
      "name": "Captain Titus: Press the Attack",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-titus"
      },
      "hash": "b53fad95",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "instead, while the Assault Doctrine is active for this unit",
            "ru": "вместо этого, пока для отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "instead, while the Assault Doctrine is active for this unit",
            "ru": "вместо этого, пока для отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0,
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
          "once": {
            "per": "army",
            "dur": "phase"
          }
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
          "once": {
            "per": "unit",
            "dur": "phase"
          }
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
          "once": {
            "per": "unit",
            "dur": "phase"
          }
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
      "sid": "828dac6b-d412-46cb-9bdc-e7948a103b86:company-heroes",
      "kind": "ability",
      "name": "Company Heroes: Command Squad",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "company-heroes"
      },
      "hash": "b1777501",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "when": null
        }
      ]
    },
    {
      "sid": "8dea9fd4-30ee-4944-943a-62de6801b195:darnath-lysander",
      "kind": "ability",
      "name": "Darnath Lysander: Icon of Obstinacy",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "darnath-lysander"
      },
      "hash": "859fd5ea",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "79864d68-7b4f-4f10-a184-df6706cfff16:darnath-lysander",
      "kind": "ability",
      "name": "Darnath Lysander: Rampart (Once per battle, per army)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "darnath-lysander"
      },
      "hash": "ef3cea17",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "2+",
          "when": {
            "en": "once per battle, until the end of the phase it is used",
            "ru": "раз за битву, до конца фазы применения"
          },
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
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
            "optics-ignores-cover"
          ]
        },
        {
          "op": "state",
          "cond": [
            "optics-detection"
          ],
          "when": {
            "en": "the option selected for this phase",
            "ru": "вариант, выбранный на эту фазу"
          }
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
      "sid": "233e6df4-f7b6-4fe6-9001-696611536b3b:hammerfall-bunker",
      "kind": "ability",
      "name": "Hammerfall Bunker: Fortification",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "hammerfall-bunker"
      },
      "hash": "7b8b287c",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a4b689e7-5755-4be0-998e-146630b8a258:inceptor-squad",
      "kind": "ability",
      "name": "Inceptor Squad: Meteoric Descent",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "inceptor-squad"
      },
      "hash": "7e9f051d",
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
      "sid": "69b331e4-7c75-4a5f-85fb-ad8caf676787:intercessor-squad",
      "kind": "ability",
      "name": "Intercessor Squad: Bolter Discipline",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "intercessor-squad"
      },
      "hash": "efc1c38c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "in your Shooting phase, if this unit or its target is within range of an objective",
            "ru": "в вашей фазе стрельбы, если отряд или его цель в зоне объекта"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "fa53a9f8-5d71-42c5-8154-3c7f8b38f0b5:invader-atvs",
      "kind": "ability",
      "name": "Invader ATVs: Aggressive Reconnaissance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "invader-atvs"
      },
      "hash": "01e5c1c2",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit not within 6\" of any other enemy unit",
            "ru": "против отряда, у которого нет других врагов в пределах 6\""
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "66b86cc0-422a-46ab-85ac-3242afe13984:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Rites of Tempering",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros"
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
      "sid": "ada4cac0-0a52-4bfe-90c0-16f8662c43d2:kayvaan-shrike",
      "kind": "ability",
      "name": "Kayvaan Shrike: Trifold Path of Shadow",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kayvaan-shrike"
      },
      "hash": "3b85f6fb",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        },
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
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "for the phase, after a psychic roll other than a 1",
            "ru": "до конца фазы после психического броска не на 1"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": {
            "en": "for the phase, after a psychic roll other than a 1",
            "ru": "до конца фазы после психического броска не на 1"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
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
      "sid": "d4a86441-d4e7-4269-a798-d1b13a92d6c2:redemptor-dreadnought",
      "kind": "ability",
      "name": "Redemptor Dreadnought: Duty Eternal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "redemptor-dreadnought"
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
      "sid": "3a8cc794-9fad-49be-b541-458009fb2282:repulsor-executioner",
      "kind": "ability",
      "name": "Repulsor Executioner: Executioner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "repulsor-executioner"
      },
      "hash": "16abc8ed",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit not below half-strength",
            "ru": "против отряда не ниже половины численности"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "fec826f3-9abb-4cbf-a67a-3b4e1d2fed58:storm-speeder-thunderstrike",
      "kind": "ability",
      "name": "Storm Speeder Thunderstrike: Thunderstrike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-thunderstrike"
      },
      "hash": "b7df721b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a MONSTER or VEHICLE unit",
            "ru": "против отряда MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a3ff82ca-fa0a-4b33-a986-db8a541f0c97:stormhawk-interceptor",
      "kind": "ability",
      "name": "Stormhawk Interceptor: Interceptor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormhawk-interceptor"
      },
      "hash": "6515fbac",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a FLY unit",
            "ru": "против отряда FLY"
          },
          "cond": [
            "never"
          ]
        }
      ]
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
      "sid": "3d2aea22-3657-47fa-9cbc-ce8f3248dcd0:stormtalon-gunship",
      "kind": "ability",
      "name": "Stormtalon Gunship: Strafing Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormtalon-gunship"
      },
      "hash": "7a36c62e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit without FLY",
            "ru": "против отряда без FLY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "be48d6e1-8f06-49ca-b33b-d93c059be723:suboden-khan",
      "kind": "ability",
      "name": "Suboden Khan: Skilled Riders",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "suboden-khan"
      },
      "hash": "17b21175",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": null
        },
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Mobile",
          "when": null,
          "target": "led"
        }
      ]
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
      "sid": "fae632e6-46ec-4e72-8084-9dfe421083f9:victrix-honour-guard",
      "kind": "ability",
      "name": "Victrix Honour Guard: Honour Guard of Macragge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "victrix-honour-guard"
      },
      "hash": "b1777501",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "when": null
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
            "excludes": [],
            "models": [],
            "modelExcludes": []
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
      "sid": "13b2f3e9-1ad3-4810-a45b-6aa9c412a542:vulkan-hestan",
      "kind": "ability",
      "name": "Vulkan He’stan: Seeker of the Unfound",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vulkan-hestan"
      },
      "hash": "970ef9d1",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": 10,
          "when": {
            "en": "while this model is within range of the objective it selected",
            "ru": "пока модель в радиусе выбранного ею объекта"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while this model is within range of the objective it selected",
            "ru": "пока модель в радиусе выбранного ею объекта"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+",
          "when": {
            "en": "while this model is within range of the objective it selected",
            "ru": "пока модель в радиусе выбранного ею объекта"
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
      "ref": {
        "kind": "detachmentRule",
        "det": "cp:space-marines"
      },
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
      "sid": "5a34e2ac-90f3-4066-97c0-8d63761d52cf",
      "kind": "detachmentRule",
      "name": "Vulkan's Quest",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "detachmentRule",
        "det": "forgefathers-seekers"
      },
      "hash": "defba13d",
      "ver": 995,
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
            "unit-normal-moved"
          ]
        }
      ]
    },
    {
      "sid": "b46795f5-cf42-46f7-b6b3-5ed03b18622b",
      "kind": "detachmentRule",
      "name": "Indomitable Defence",
      "det": "Gravis Siege Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "gravis-siege-force"
      },
      "hash": "11dd7b9b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
          "when": {
            "en": "while within range of an objective",
            "ru": "пока отряд в зоне objective"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "63efc4eb-d315-4974-850a-0c3bfbddcb68",
      "kind": "detachmentRule",
      "name": "Shadow Tactics",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "detachmentRule",
        "det": "shadowmark-talon"
      },
      "hash": "9f2d4fa2",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
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
      "ref": {
        "kind": "enhancement",
        "det": "cp:space-marines"
      },
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
          },
          "target": "unit"
        }
      ],
      "note": "names one weapon by name, a subset of the table this format cannot single out"
    },
    {
      "sid": "5735eeb9-abd5-499c-8921-d569e62184f0",
      "kind": "enhancement",
      "name": "Blade Masters",
      "det": "Assault Force",
      "ref": {
        "kind": "enhancement",
        "det": "cp:space-marines"
      },
      "hash": "1d648955",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8d7f8864-e28e-45c7-8155-9b2c5c5b6b0f",
      "kind": "enhancement",
      "name": "Armour of Antoninus",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "567fcdcf",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "984ee9d6-627c-4fe1-9416-062395285c9b",
      "kind": "enhancement",
      "name": "Oath of Macragge",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "66e47c26",
      "ver": 995,
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
          "when": {
            "en": "instead, while the Assault Doctrine is active for this unit",
            "ru": "вместо этого, пока для отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "when": {
            "en": "instead, while the Assault Doctrine is active for this unit",
            "ru": "вместо этого, пока для отряда активна Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 1
        }
      ]
    },
    {
      "sid": "c4539484-5c56-4bc0-ac5d-363c51d4e6a4",
      "kind": "enhancement",
      "name": "Veteran of Behemoth",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "ae40140a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
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
      "sid": "9a9c6302-ae70-4c1c-bab0-0d4628b72223",
      "kind": "enhancement",
      "name": "Spy-skull Data Link",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "enhancement",
        "det": "ceramite-sentinels"
      },
      "hash": "8cd4d8f8",
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
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        }
      ]
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
      "sid": "a131044f-d190-45ba-8fc3-693ec5bde912",
      "kind": "enhancement",
      "name": "Adamantine Mantle",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      },
      "hash": "afc76de2",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ec4343a7-a766-4c84-8b8b-da5cc4ecc975",
      "kind": "enhancement",
      "name": "Immolator",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      },
      "hash": "934f5a45",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "TORRENT"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "TORRENT"
          },
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "bdda8f20-6654-4119-96e1-8d075e2c77d4",
      "kind": "enhancement",
      "name": "War Tempered Artifice",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      },
      "hash": "53e98830",
      "ver": 995,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "bb667268-b5f1-4de4-b708-885b045b4938",
      "kind": "enhancement",
      "name": "Artificer Armour",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "567fcdcf",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
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
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "2f3cacf5-263d-4822-bdd3-23a4808620f4",
      "kind": "enhancement",
      "name": "Indefatigable Fortitude",
      "det": "Gravis Linebreaker Force",
      "ref": {
        "kind": "enhancement",
        "det": "gravis-linebreaker-force"
      },
      "hash": "92d1dae4",
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
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null,
          "target": "unit"
        }
      ]
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
      "sid": "07f997e0-d357-44c1-ab49-17d69a5d2edc",
      "kind": "enhancement",
      "name": "Redoubtable Machine Spirit (Upgrade)",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "d87b664b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "9eebda23-0cb4-46c6-80ec-3254c1f4a421",
      "kind": "enhancement",
      "name": "Adept of the Omnissiah",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "enhancement",
        "det": "medusas-wrath",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "excludes": [],
            "models": [],
            "modelExcludes": []
          }
        ]
      },
      "hash": "596e574e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": {
            "en": "one use each battle round, for a VEHICLE unit within 6\" an enemy unit targets, until that enemy unit has attacked",
            "ru": "одно применение за раунд, для отряда VEHICLE в пределах 6\", который выбрал целью враг, пока тот не закончит атаки"
          },
          "target": "aura",
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "219c6b75-1941-426f-9ab1-c3e8f6ebeffa",
      "kind": "enhancement",
      "name": "Target Augury Web",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "enhancement",
        "det": "medusas-wrath",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "excludes": [],
            "models": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "modelExcludes": []
          }
        ]
      },
      "hash": "73cb6988",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "the VEHICLE model selected in your Movement phase, until your next Command phase",
            "ru": "модель VEHICLE, выбранная в вашу Movement phase, до вашей следующей Command phase"
          },
          "target": "aura",
          "selected": true
        }
      ]
    },
    {
      "sid": "ea8f1467-f19c-463e-9c19-82201e5a7dd1",
      "kind": "enhancement",
      "name": "The Flesh is Weak",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "enhancement",
        "det": "medusas-wrath"
      },
      "hash": "19662da7",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "037ca081-3288-498d-ac81-55c913122f3f",
      "kind": "enhancement",
      "name": "Blackwing Shroud",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "enhancement",
        "det": "shadowmark-talon"
      },
      "hash": "49f5150c",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": null
        },
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "7f1dc960-1d93-4a72-94a8-ff2e91a6d27b",
      "kind": "enhancement",
      "name": "Umbral Raptor",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "enhancement",
        "det": "shadowmark-talon"
      },
      "hash": "db753684",
      "ver": 995,
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
          "value": "Lone Operative",
          "when": null
        }
      ]
    },
    {
      "sid": "8134f4d8-c7c7-47f0-8db3-6ca27ffd5d2f",
      "kind": "enhancement",
      "name": "Hunter's Eye",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      },
      "hash": "a533d255",
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
          "value": "IGNORES COVER",
          "when": null,
          "target": "led"
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
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
      "sid": "c02233e1-25d9-4ffd-8fed-5b5e18b8fa4d",
      "kind": "enhancement",
      "name": "Spearpoint Paragon",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      },
      "hash": "c282e585",
      "ver": 995,
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
          "when": {
            "en": "instead, if this unit made a charge move this turn",
            "ru": "вместо этого, если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -2,
          "when": {
            "en": "instead, if this unit made a charge move this turn",
            "ru": "вместо этого, если отряд совершил charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ],
          "alt": 1
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
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
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
      "ref": {
        "kind": "stratagem",
        "det": "cp:space-marines",
        "name": "Decapitating Strike"
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
      "sid": "08d88e14-302b-4d60-9278-cf393360216f",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Armour of Contempt"
      },
      "hash": "9e50d86d",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b136c0a1-1f85-4792-83a0-388d77c17dc7",
      "kind": "stratagem",
      "name": "Courage and Honour!",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Courage and Honour!"
      },
      "hash": "127e1a54",
      "ver": 995,
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
      "sid": "3378744b-c069-4bf3-b0d0-888de53cd618",
      "kind": "stratagem",
      "name": "Exemplary Vigilance",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Exemplary Vigilance"
      },
      "hash": "5938c3ef",
      "ver": 995,
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
      "sid": "e4de1cb3-6785-41f6-935f-650558ccb19a",
      "kind": "stratagem",
      "name": "Tactical Foresight",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Tactical Foresight"
      },
      "hash": "e8e0dd03",
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "39db2117-82ed-4fa3-8c71-4ee54f89d58a",
      "kind": "stratagem",
      "name": "Augmented Targeting",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Augmented Targeting"
      },
      "hash": "e4fd5f3d",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "augmented-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "augmented-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if both were picked — your unit is entrenched",
            "ru": "если выбраны обе — отряд entrenched"
          },
          "cond": [
            "augmented-both"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if both were picked — your unit is entrenched",
            "ru": "если выбраны обе — отряд entrenched"
          },
          "cond": [
            "augmented-both"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "65196f2f-1398-4ef4-8baa-d0d9f1dd0606",
      "kind": "stratagem",
      "name": "Priority Strike",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Priority Strike"
      },
      "hash": "b30182fd",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a MONSTER or VEHICLE unit",
            "ru": "против отряда MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "32fc0895-94b8-45f9-be9d-51b5b229b7af",
      "kind": "stratagem",
      "name": "Stand to the End",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Stand to the End"
      },
      "hash": "2005487f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "s-gt-t",
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
          "when": {
            "en": "the second option, if your unit is entrenched",
            "ru": "второй вариант, если отряд окопался"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0933c7f4-df52-4412-a9b5-40564daca344",
      "kind": "stratagem",
      "name": "Unyielding Might",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Unyielding Might"
      },
      "hash": "076afe4b",
      "ver": 995,
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
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
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
      "sid": "6d480005-4673-459f-9cb4-8ddae4cbe0ea",
      "kind": "stratagem",
      "name": "Forged in Fire",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "stratagem",
        "det": "forgefathers-seekers",
        "name": "Forged in Fire"
      },
      "hash": "728f5937",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "TORRENT"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "CLOSE-QUARTERS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          },
          "only": {
            "tag": "TORRENT"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "6e5c3837-a6cf-438f-b1d3-fd6c0870a19d",
      "kind": "stratagem",
      "name": "Immolation Protocols",
      "det": "Forgefather's Seekers",
      "ref": {
        "kind": "stratagem",
        "det": "forgefathers-seekers",
        "name": "Immolation Protocols"
      },
      "hash": "d1b773e6",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "tag": "TORRENT"
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
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
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
      "sid": "e2c7a1f9-a7ac-43f5-b524-46a7d99e4b7e",
      "kind": "stratagem",
      "name": "Mercy is Weakness",
      "det": "Ironclad Champions",
      "ref": {
        "kind": "stratagem",
        "det": "ironclad-champions",
        "name": "Mercy is Weakness"
      },
      "hash": "2d63d4ab",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "mercy-lethal"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "mercy-sustained"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "e3c47ee8-903a-4812-9ca6-eba3b017ef05",
      "kind": "stratagem",
      "name": "Upstoppable Advance",
      "det": "Ironclad Champions",
      "ref": {
        "kind": "stratagem",
        "det": "ironclad-champions",
        "name": "Upstoppable Advance"
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
      "sid": "95aa397f-b69c-48b3-82fe-5743639b12eb",
      "kind": "stratagem",
      "name": "Ancient Fury",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "stratagem",
        "det": "medusas-wrath",
        "name": "Ancient Fury"
      },
      "hash": "deefa91d",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "round"
    },
    {
      "sid": "843d8704-6cc5-471d-b6fb-76f5725a0fd0",
      "kind": "stratagem",
      "name": "Methodical Brutality",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "stratagem",
        "det": "medusas-wrath",
        "name": "Methodical Brutality"
      },
      "hash": "bd8f2776",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit is a VEHICLE unit",
            "ru": "если это отряд VEHICLE"
          },
          "cond": [
            "unit-vehicle"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "4d0061c1-fac7-486c-82d6-ab538519d64b",
      "kind": "stratagem",
      "name": "Spirits of Iron",
      "det": "Medusa's Wrath",
      "ref": {
        "kind": "stratagem",
        "det": "medusas-wrath",
        "name": "Spirits of Iron"
      },
      "hash": "5967579f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": {
            "en": "against mortal wounds only",
            "ru": "только против смертельных ран"
          },
          "cond": [
            "never"
          ]
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
      "sid": "62544bb7-258b-4a42-8caa-36312f28f68f",
      "kind": "stratagem",
      "name": "Umbral Evasion",
      "det": "Phobos Shock Force",
      "ref": {
        "kind": "stratagem",
        "det": "phobos-shock-force",
        "name": "Umbral Evasion"
      },
      "hash": "fcfa9b58",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "e6c5d317-d9d0-4089-8288-6832d8b6d9be",
      "kind": "stratagem",
      "name": "Lay Low the Tyrants",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "stratagem",
        "det": "shadowmark-talon",
        "name": "Lay Low the Tyrants"
      },
      "hash": "bf79a709",
      "ver": 995,
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
      "sid": "668f1ee2-27e1-4875-b8ba-1ff40e6fd618",
      "kind": "stratagem",
      "name": "Murderous Fusillade",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "stratagem",
        "det": "shadowmark-talon",
        "name": "Murderous Fusillade"
      },
      "hash": "7bc8f23f",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
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
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0bcf50de-4702-4c4c-b3d4-3f45a1e476bd",
      "kind": "stratagem",
      "name": "Evasive Manoeuvers",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Evasive Manoeuvers"
      },
      "hash": "83a67d7a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "aaff4833-591d-4c0d-b08c-3df48c061c2a",
      "kind": "stratagem",
      "name": "Flawless Riders",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Flawless Riders"
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
      "sid": "1a90c2f8-8b7e-4dfe-9a51-fc33c6da1087",
      "kind": "stratagem",
      "name": "Mobile Lethality",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Mobile Lethality"
      },
      "hash": "429111ac",
      "ver": 995,
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
      "sid": "b398825e-7ae9-47cb-a399-3b97b846dabf",
      "kind": "stratagem",
      "name": "Spear Thrust and Sabre Swing",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Spear Thrust and Sabre Swing"
      },
      "hash": "e8177d93",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "spear-lethal"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "spear-lance"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if both were picked — your unit has MOUNTED",
            "ru": "если выбраны обе — у отряда есть MOUNTED"
          },
          "cond": [
            "spear-both"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "if both were picked — your unit has MOUNTED",
            "ru": "если выбраны обе — у отряда есть MOUNTED"
          },
          "cond": [
            "spear-both"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0e4bdfa4-ab53-47a2-9376-7abbdb472c97",
      "kind": "stratagem",
      "name": "Hurtling Targets",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "stormlance-task-force",
        "name": "Hurtling Targets"
      },
      "hash": "fcfa9b58",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": null
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
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "5763bb5f-fa76-4c84-908b-b7a02e376a46",
      "kind": "stratagem",
      "name": "Domination Fire",
      "det": "Tactical Brethren",
      "ref": {
        "kind": "stratagem",
        "det": "tactical-brethren",
        "name": "Domination Fire"
      },
      "hash": "ffb3db07",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f14c4922-09c2-43ed-b556-0e344787d72e",
      "kind": "stratagem",
      "name": "Relentless Assault",
      "det": "Tacticus Attack Force",
      "ref": {
        "kind": "stratagem",
        "det": "tacticus-attack-force",
        "name": "Relentless Assault"
      },
      "hash": "90ab22ef",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "relentless-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "relentless-lethal"
          ]
        }
      ],
      "dur": "phase"
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
      "sid": "1cf96ea6-54b8-4cd2-a106-0d08f78c032c",
      "kind": "stratagem",
      "name": "Point-blank Brutality",
      "det": "Tacticus Firestorm Force",
      "ref": {
        "kind": "stratagem",
        "det": "tacticus-firestorm-force",
        "name": "Point-blank Brutality"
      },
      "hash": "1462ab27",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "CLOSE-QUARTERS",
          "when": null,
          "only": {
            "notTag": "BLAST"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null,
          "only": {
            "notTag": "BLAST"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b46f148a-5ee4-4e6a-8061-8fcc19616660",
      "kind": "stratagem",
      "name": "Relentless Assault",
      "det": "Tacticus Firestorm Force",
      "ref": {
        "kind": "stratagem",
        "det": "tacticus-firestorm-force",
        "name": "Relentless Assault"
      },
      "hash": "90ab22ef",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "relentless-sustained"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "if this option was picked when the stratagem was used",
            "ru": "если при применении выбран этот вариант"
          },
          "cond": [
            "relentless-lethal"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "a126a2b4-c29e-4fc3-af04-09b209ba265c",
      "kind": "stratagem",
      "name": "Merciless Veterans",
      "det": "Terminator Storm Force",
      "ref": {
        "kind": "stratagem",
        "det": "terminator-storm-force",
        "name": "Merciless Veterans"
      },
      "hash": "466e0864",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ],
      "dur": "phase"
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
      "effects": [
        {
          "on": "incoming",
          "stat": "d",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "phase"
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
      "sid": "be985406-cf2d-4f9f-a2ee-8d42ee57486b:impulsor",
      "kind": "wargear",
      "name": "Impulsor: Shield Dome",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "impulsor",
        "item": "shield dome"
      },
      "hash": "56160de1",
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
    },
    {
      "sid": "7a8d5f30-60bd-457c-889a-dc6c3dbc200b:lieutenant",
      "kind": "wargear",
      "name": "Lieutenant: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "lieutenant",
        "item": "storm shield"
      },
      "hash": "fb8f103d",
      "ver": 995,
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
      "sid": "5dea1994-20a5-4814-8596-c8f0c1ce4274:vanguard-veteran-squad-with-jump-packs",
      "kind": "wargear",
      "name": "Vanguard Veteran Squad with Jump Packs: Combat Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "vanguard-veteran-squad-with-jump-packs",
        "item": "combat shield"
      },
      "hash": "b291968d",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "the bearer only",
            "ru": "только носитель"
          },
          "cond": [
            "wargear-bearer"
          ]
        }
      ]
    },
    {
      "sid": "7a8d5f30-60bd-457c-889a-dc6c3dbc200b:vanguard-veteran-squad",
      "kind": "wargear",
      "name": "Vanguard Veteran Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "vanguard-veteran-squad",
        "item": "storm shield"
      },
      "hash": "fb8f103d",
      "ver": 995,
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
            "wargear-bearer"
          ]
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
          "once": {
            "per": "army",
            "dur": "phase"
          }
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
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
    }
  ]
}
