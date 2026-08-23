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
      "sid": "77ad54b1-f72a-4681-b624-d765a3198ca0:adrax-agatone",
      "kind": "ability",
      "name": "Adrax Agatone: Lord of the Pyroclasts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "adrax-agatone"
      },
      "hash": "c139a9d9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8260f427-71a5-46d8-8ff3-1f50f4205db8:aggressor-squad",
      "kind": "ability",
      "name": "Aggressor Squad: Close-quarters Firepower",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aggressor-squad"
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
      "sid": "e0524eb7-29b2-4f3e-9055-362584aabb20:ancient-in-terminator-armour",
      "kind": "ability",
      "name": "Ancient in Terminator Armour: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient-in-terminator-armour"
      },
      "hash": "be69986d",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "1a483f1b-843f-49df-91fa-fe72c1a21e9a:ancient-in-terminator-armour",
      "kind": "ability",
      "name": "Ancient in Terminator Armour: Keep the Banner High",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient-in-terminator-armour"
      },
      "hash": "f34e2507",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e0524eb7-29b2-4f3e-9055-362584aabb20:ancient",
      "kind": "ability",
      "name": "Ancient: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient"
      },
      "hash": "be69986d",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "7ed6ae99-c571-4b25-8ce3-020a96522761:ancient",
      "kind": "ability",
      "name": "Ancient: Unbreakable Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ancient"
      },
      "hash": "2a39a8aa",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "38dea634-aa17-4e2d-ab34-fd659752945e:apothecary-biologis",
      "kind": "ability",
      "name": "Apothecary Biologis: Surgical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "apothecary-biologis"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "f6a10550-38ed-4c2f-8528-0f037ec3a81e:apothecary-biologis",
      "kind": "ability",
      "name": "Apothecary Biologis: Vivispectrum",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "apothecary-biologis"
      },
      "hash": "c207965a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "9",
          "when": {
            "en": "for the rest of the battle, once its unit destroyed an enemy unit in melee",
            "ru": "до конца битвы, если отряд уничтожил врага в ближнем бою"
          },
          "cond": [
            "never"
          ]
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
      "sid": "e0524eb7-29b2-4f3e-9055-362584aabb20:bladeguard-ancient",
      "kind": "ability",
      "name": "Bladeguard Ancient: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bladeguard-ancient"
      },
      "hash": "be69986d",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "49a7fdd1-4a53-4787-abab-b690ed47d046:bladeguard-ancient",
      "kind": "ability",
      "name": "Bladeguard Ancient: Deeds of Heroism",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bladeguard-ancient"
      },
      "hash": "6877cf2e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
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
      "sid": "f99f5ac3-b359-4859-963f-1bc4b3914700:caanok-var",
      "kind": "ability",
      "name": "Caanok Var: Cerebrex Logic Engine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "caanok-var"
      },
      "hash": "cd0349ba",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e99087ac-5dc5-4e2d-b2f5-ecabb496e445:caanok-var",
      "kind": "ability",
      "name": "Caanok Var: Cold and Calculating",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "caanok-var"
      },
      "hash": "ecbeeef7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "against MONSTER or VEHICLE targets",
            "ru": "по целям MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f8dea766-524c-451f-93b4-137b57a96de1:captain-in-gravis-armour",
      "kind": "ability",
      "name": "Captain in Gravis Armour: Refuse to Yield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-in-gravis-armour"
      },
      "hash": "f62f7f7a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c37acebd-4051-4806-82b5-f6d3c10df6c3:captain-titus",
      "kind": "ability",
      "name": "Captain Titus: Press the Attack",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-titus"
      },
      "hash": "abe9990b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "5dc548b9-fe2d-4d2c-9e71-1f53f28b5637:captain-with-jump-pack",
      "kind": "ability",
      "name": "Captain with Jump Pack: Angel’s Wrath",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain-with-jump-pack"
      },
      "hash": "10959842",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of a turn this unit ended a Charge move",
            "ru": "до конца хода, в котором отряд завершил Charge"
          },
          "cond": [
            "unit-charged"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "04b5d2e0-87f3-43fb-8e2d-224c1c453e4a:captain",
      "kind": "ability",
      "name": "Captain: Finest Hour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "captain"
      },
      "hash": "343267c3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
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
      "sid": "af1b04e7-55dc-4a52-af99-157b6320bcdf:centurion-assault-squad",
      "kind": "ability",
      "name": "Centurion Assault Squad: Annihilator Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "centurion-assault-squad"
      },
      "hash": "90a8eab9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "against MONSTER, VEHICLE or FORTIFICATION targets",
            "ru": "против целей MONSTER, VEHICLE или FORTIFICATION"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b68802d5-ac33-412c-9ca6-a6900b837bc1:chaplain-in-terminator-armour",
      "kind": "ability",
      "name": "Chaplain in Terminator Armour: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-in-terminator-armour"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5774196c-a733-4084-b5cd-26ba4d072fd3:chaplain-in-terminator-armour",
      "kind": "ability",
      "name": "Chaplain in Terminator Armour: Recitation of Faith",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-in-terminator-armour"
      },
      "hash": "3164196a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "bed942f4-4372-40ca-b26d-0ef1acd6ccbd:chaplain-on-bike",
      "kind": "ability",
      "name": "Chaplain on Bike: Catechism of Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-on-bike"
      },
      "hash": "e0fbf8ec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against the enemy unit selected for this ability",
            "ru": "против юнита, выбранного для этой способности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b68802d5-ac33-412c-9ca6-a6900b837bc1:chaplain-on-bike",
      "kind": "ability",
      "name": "Chaplain on Bike: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-on-bike"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b68802d5-ac33-412c-9ca6-a6900b837bc1:chaplain-with-jump-pack",
      "kind": "ability",
      "name": "Chaplain with Jump Pack: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain-with-jump-pack"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b68802d5-ac33-412c-9ca6-a6900b837bc1:chaplain",
      "kind": "ability",
      "name": "Chaplain: Litany of Hate",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaplain"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6ddc2dab-c8c7-4f6f-a2e1-1ef1fdc5cabe:chief-librarian-tigurius",
      "kind": "ability",
      "name": "Chief Librarian Tigurius: Hood of Hellfire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-tigurius"
      },
      "hash": "179c8eff",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks and mortal wounds)",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "b8206e9c-1017-4f1d-89e7-be3af93c6d95:chief-librarian-tigurius",
      "kind": "ability",
      "name": "Chief Librarian Tigurius: Master of Prescience",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chief-librarian-tigurius"
      },
      "hash": "0d4d1bf7",
      "ver": 925,
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
      "sid": "0bb2afd9-e4af-48c8-9024-3ef42e189ea9:company-heroes",
      "kind": "ability",
      "name": "Company Heroes: Astartes Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "company-heroes"
      },
      "hash": "40cc4a72",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains an Ancient",
            "ru": "пока в отряде есть Ancient"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5429d3a6-6245-4780-ad9d-5fa105a0f81d:darnath-lysander",
      "kind": "ability",
      "name": "Darnath Lysander: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "darnath-lysander"
      },
      "hash": "3c08dc20",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "096ec45b-1205-4dfc-b6f9-29e3be1df65c:darnath-lysander",
      "kind": "ability",
      "name": "Darnath Lysander: Rampart",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "darnath-lysander"
      },
      "hash": "493e6764",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "2+",
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
      "sid": "405c298f-cc78-431a-baef-887fa9e9cb4a:desolation-squad",
      "kind": "ability",
      "name": "Desolation Squad: Targeter Optics",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "desolation-squad"
      },
      "hash": "8ffd82d7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как отряд остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "72ebcea5-be67-4773-8d7a-5bce17bac918:devastator-squad",
      "kind": "ability",
      "name": "Devastator Squad: Signum",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "devastator-squad"
      },
      "hash": "8ffd82d7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как отряд остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "7514c253-fe4c-4515-bebf-3db89f878c52:eliminator-squad",
      "kind": "ability",
      "name": "Eliminator Squad: Mark the Target",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eliminator-squad"
      },
      "hash": "fb354850",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как отряд остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "34d15ff5-13e7-4667-8cc3-bc0b8dc67851:eradicator-squad-with-heavy-bolters",
      "kind": "ability",
      "name": "Eradicator Squad with Heavy Bolters: Overlapping Detonations",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eradicator-squad-with-heavy-bolters"
      },
      "hash": "b3c4030b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "BLAST 1",
          "only": {
            "name": "Heavy bolter"
          },
          "when": {
            "en": "against the enemy unit selected for this ability",
            "ru": "против юнита, выбранного для этой способности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a0cdaf1d-65ae-4128-a869-406b2b8f5999:gladiator-reaper",
      "kind": "ability",
      "name": "Gladiator Reaper: Reaping Tally",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gladiator-reaper"
      },
      "hash": "e55f216a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
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
      "sid": "0e85b310-463d-4bb8-bea6-78b9c0075ef3:heavy-intercessor-squad",
      "kind": "ability",
      "name": "Heavy Intercessor Squad: Unyielding in the Face of the Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "heavy-intercessor-squad"
      },
      "hash": "388767c3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "within range of an objective you control, against attacks with Damage 1",
            "ru": "в зоне контролируемого objective, против атак с Уроном 1"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1ae20ece-dfe9-486b-ad2a-aaaa6e1ee6ad:incursor-squad",
      "kind": "ability",
      "name": "Incursor Squad: Multi-spectrum Array",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "incursor-squad"
      },
      "hash": "cd41104a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "13208534-ad24-46ec-bc04-225b696a346d:intercessor-squad",
      "kind": "ability",
      "name": "Intercessor Squad: Hail of Bolts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "intercessor-squad"
      },
      "hash": "f69de90f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Bolt rifle"
          },
          "when": {
            "en": "against the enemy unit selected for this ability",
            "ru": "против юнита, выбранного для этой способности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2ee3980e-f81f-4093-a8ac-f9cfe7036b9e:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros"
      },
      "hash": "ade2c599",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "813bc3e5-85f1-47d5-bcf1-f81c0598b84a:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Iron Father",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros"
      },
      "hash": "357331f5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "71d74c1c-087e-4c70-96a5-bca5e6bfd2b6:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Master of the Forge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "feb3f1ff",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a4b89adc-f530-44c8-9536-bf32b69ed4fb:iron-father-feirros",
      "kind": "ability",
      "name": "Iron Father Feirros: Rites of Tempering",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "iron-father-feirros"
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
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "5d6f20f8-84d7-47dd-8fbb-5543650b4f71:judiciar",
      "kind": "ability",
      "name": "Judiciar: Silent Fury",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "judiciar"
      },
      "hash": "1e17f0e8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Executioner relic blade"
          },
          "when": {
            "en": "for the rest of the battle, once it destroyed an enemy CHARACTER",
            "ru": "до конца битвы, если уничтожил вражеского CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1a36db6c-7d89-4c2c-bb86-fc01d546a190:judiciar",
      "kind": "ability",
      "name": "Judiciar: Tempormortis",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "judiciar"
      },
      "hash": "a4271bd1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "c608eecd-b9bd-4d99-993c-ce96fa6b561b:kayvaan-shrike",
      "kind": "ability",
      "name": "Kayvaan Shrike: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kayvaan-shrike"
      },
      "hash": "30743003",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7399a318-f089-4778-9ef3-701423e34f9b:korsarro-khan",
      "kind": "ability",
      "name": "Kor’sarro Khan: For the Khan!",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "korsarro-khan"
      },
      "hash": "725e7df3",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "9eeaad07-22c7-456f-b3bf-689cf6d11855:korsarro-khan",
      "kind": "ability",
      "name": "Kor’sarro Khan: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "korsarro-khan"
      },
      "hash": "2a7b2770",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c82f018e-0e17-4c00-9ef3-5d025e1fc846:librarian-in-phobos-armour",
      "kind": "ability",
      "name": "Librarian in Phobos Armour: Psychic Hood",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-phobos-armour"
      },
      "hash": "d4f151a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "0ea8c549-4e95-46c3-b7bc-2b38140c38a3:librarian-in-phobos-armour",
      "kind": "ability",
      "name": "Librarian in Phobos Armour: Shrouding",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-phobos-armour"
      },
      "hash": "8b7e3236",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c82f018e-0e17-4c00-9ef3-5d025e1fc846:librarian-in-terminator-armour",
      "kind": "ability",
      "name": "Librarian in Terminator Armour: Psychic Hood",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-terminator-armour"
      },
      "hash": "d4f151a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "7f49e247-dc01-475b-a43c-bcb81ad68d5a:librarian-in-terminator-armour",
      "kind": "ability",
      "name": "Librarian in Terminator Armour: Veil of Time",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian-in-terminator-armour"
      },
      "hash": "3154cfe3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "f5239867-c2c7-4d4b-a3ee-6d9668637e4d:librarian",
      "kind": "ability",
      "name": "Librarian: Mental Fortress",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian"
      },
      "hash": "58585162",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "c82f018e-0e17-4c00-9ef3-5d025e1fc846:librarian",
      "kind": "ability",
      "name": "Librarian: Psychic Hood",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "librarian"
      },
      "hash": "d4f151a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs Psychic Attacks)",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "c6695dee-7b60-4d97-a9cb-4dc1bdbeee22:lieutenant-in-phobos-armour",
      "kind": "ability",
      "name": "Lieutenant in Phobos Armour: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lieutenant-in-phobos-armour"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "c6695dee-7b60-4d97-a9cb-4dc1bdbeee22:lieutenant-in-reiver-armour",
      "kind": "ability",
      "name": "Lieutenant in Reiver Armour: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lieutenant-in-reiver-armour"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "c6695dee-7b60-4d97-a9cb-4dc1bdbeee22:lieutenant",
      "kind": "ability",
      "name": "Lieutenant: Tactical Precision",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lieutenant"
      },
      "hash": "abe50645",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "a57c3a05-b36c-4600-b814-1a39f71ae5a7:outrider-squad",
      "kind": "ability",
      "name": "Outrider Squad: Thunderous Impact",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "outrider-squad"
      },
      "hash": "127dac77",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "if this unit made a Charge move this turn",
            "ru": "если отряд совершил Charge в этом ходу"
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
            "en": "if this unit made a Charge move this turn",
            "ru": "если отряд совершил Charge в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "49d03928-99bb-46c6-9bc0-a4a185be0a58:pedro-kantor",
      "kind": "ability",
      "name": "Pedro Kantor: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "pedro-kantor"
      },
      "hash": "ac6d8390",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c2397446-6266-42da-968d-549855d3b1ab:pedro-kantor",
      "kind": "ability",
      "name": "Pedro Kantor: Oath of Rynn",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "pedro-kantor"
      },
      "hash": "5938ca6b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
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
      "sid": "4dfaff20-f378-463a-9a2e-04666b40dea4:pedro-kantor",
      "kind": "ability",
      "name": "Pedro Kantor: To the Last",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "pedro-kantor"
      },
      "hash": "f34e2507",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "81871a97-24e7-46f9-98f5-bcff26730609:predator-destructor",
      "kind": "ability",
      "name": "Predator Destructor: Destructor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "predator-destructor"
      },
      "hash": "21b48ff3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against INFANTRY targets",
            "ru": "против целей INFANTRY"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8a46ce7f-aa97-462e-a345-a2aadd3a0ab7:redemptor-dreadnought",
      "kind": "ability",
      "name": "Redemptor Dreadnought: Duty Eternal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "redemptor-dreadnought"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d3e7f9cb-4a24-476a-8c66-115f422465ed:reiver-squad",
      "kind": "ability",
      "name": "Reiver Squad: Terror Troops",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "reiver-squad"
      },
      "hash": "a8a8b6b0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b379e86f-16bd-491a-90cb-52027a541f40:repulsor-executioner",
      "kind": "ability",
      "name": "Repulsor Executioner: Executioner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "repulsor-executioner"
      },
      "hash": "bf931761",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fa32fb8b-9b66-4c9b-82df-06d5273bcebc:roboute-guilliman",
      "kind": "ability",
      "name": "Roboute Guilliman: Master of Battle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "roboute-guilliman",
        "set": "Author of the Codex",
        "pickLimit": 2
      },
      "hash": "097c90f3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "76a6280a-359a-4d23-973a-de8d6afc20e5:roboute-guilliman",
      "kind": "ability",
      "name": "Roboute Guilliman: Primarch of the XIII (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "roboute-guilliman",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ],
        "set": "Author of the Codex",
        "pickLimit": 2
      },
      "hash": "b4922e6d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          }
        }
      ]
    },
    {
      "sid": "e567e6c8-d5f0-494f-9ee9-5ffb5ae8dacb:roboute-guilliman",
      "kind": "ability",
      "name": "Roboute Guilliman: Supreme Strategist",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "roboute-guilliman",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES"
            ],
            "excludes": []
          }
        ],
        "set": "Author of the Codex",
        "pickLimit": 2
      },
      "hash": "689e94af",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8fa67241-91f6-45bb-b545-238253f19efb:roboute-guilliman",
      "kind": "ability",
      "name": "Roboute Guilliman: Ultramarines Bodyguard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "roboute-guilliman"
      },
      "hash": "36943dfb",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e89c5fdd-1344-409a-968f-7ee791cfcfc6:storm-speeder-hailstrike",
      "kind": "ability",
      "name": "Storm Speeder Hailstrike: Hailstrike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-hailstrike"
      },
      "hash": "3cda956c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ccb968f2-1480-4b31-8c59-1ae349518117:storm-speeder-thunderstrike",
      "kind": "ability",
      "name": "Storm Speeder Thunderstrike: Thunderstrike",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "storm-speeder-thunderstrike"
      },
      "hash": "61ba4ec4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "349ad1d7-8340-47bd-bd2f-8ed6262b4ddb:stormhawk-interceptor",
      "kind": "ability",
      "name": "Stormhawk Interceptor: Interceptor",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormhawk-interceptor"
      },
      "hash": "205860ae",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9c3665db-de45-42c3-acb0-b46b5bb04467:stormraven-gunship",
      "kind": "ability",
      "name": "Stormraven Gunship: Armoured Resilience",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormraven-gunship"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "06c4375b-ee7a-4552-a5d0-2a55dcd6acdb:stormtalon-gunship",
      "kind": "ability",
      "name": "Stormtalon Gunship: Strafing Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stormtalon-gunship"
      },
      "hash": "1c8c1f3a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b3665ebe-e8c2-4a0c-a65a-17976a709bf4:suboden-khan",
      "kind": "ability",
      "name": "Suboden Khan: Spear of Chogoris",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "suboden-khan"
      },
      "hash": "b7842750",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d9fa9030-63e4-41dc-833c-7350233463fb:techmarine",
      "kind": "ability",
      "name": "Techmarine: Blessing of the Omnissiah",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "techmarine",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "97259642",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4c443932-cf71-4ef2-b9ee-c967caac6aa0:techmarine",
      "kind": "ability",
      "name": "Techmarine: Techmarine",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "techmarine"
      },
      "hash": "986336f6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "99cbd2c2-4531-4410-abdb-72c7d24e3d5f:techmarine",
      "kind": "ability",
      "name": "Techmarine: Vengeance of the Omnissiah",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "techmarine",
        "scopes": [
          {
            "targets": [
              "ADEPTUS ASTARTES VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "b8d4732b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "7",
          "only": {
            "name": "Omnissian power axe"
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
      "sid": "3093dc5f-b20a-4fed-85ea-9b121dc01fd1:terminator-squad",
      "kind": "ability",
      "name": "Terminator Squad: Fury of the First",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "terminator-squad"
      },
      "hash": "bddfa7b3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fb7bc95a-4db3-4cfd-9d3c-4b35396d4b46:tor-garadon",
      "kind": "ability",
      "name": "Tor Garadon: Siege Captain",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tor-garadon"
      },
      "hash": "3dd26b6c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against MONSTER, VEHICLE or FORTIFICATION targets",
            "ru": "против целей MONSTER, VEHICLE или FORTIFICATION"
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
            "en": "against MONSTER, VEHICLE or FORTIFICATION targets",
            "ru": "против целей MONSTER, VEHICLE или FORTIFICATION"
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
            "en": "against MONSTER, VEHICLE or FORTIFICATION targets",
            "ru": "против целей MONSTER, VEHICLE или FORTIFICATION"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4761836f-d83c-4571-ba17-25ab0227e744:tor-garadon",
      "kind": "ability",
      "name": "Tor Garadon: Signum Array",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tor-garadon"
      },
      "hash": "080523e0",
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
      "sid": "ab224771-6fe8-474c-aa70-89ab5aa442ce:uriel-ventris",
      "kind": "ability",
      "name": "Uriel Ventris: Master of the Fleet",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "uriel-ventris"
      },
      "hash": "9ec37b96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7084723b-df23-4299-a719-01ce8a75430e:vanguard-veteran-squad-with-jump-packs",
      "kind": "ability",
      "name": "Vanguard Veteran Squad with Jump Packs: Vanguard Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vanguard-veteran-squad-with-jump-packs"
      },
      "hash": "2cfe494d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "until the end of a turn it ended a Charge move",
            "ru": "до конца хода, в котором завершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "c364cc32-4b31-449d-93fd-b4f0bf89ac18:vulkan-hestan",
      "kind": "ability",
      "name": "Vulkan He’stan: Inspiring Commander",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vulkan-hestan"
      },
      "hash": "a5c0ed08",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a33c9c81-9cbc-46a4-af1c-82980e25aa9e:vulkan-hestan",
      "kind": "ability",
      "name": "Vulkan He’stan: Seeker of the Unfound",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vulkan-hestan"
      },
      "hash": "519ed4cd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "10",
          "when": {
            "en": "within range of the objective chosen when it arrived",
            "ru": "в зоне objective, выбранного при выставлении"
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
            "en": "within range of the objective chosen when it arrived",
            "ru": "в зоне objective, выбранного при выставлении"
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
            "en": "while within range of the objective marker selected for this model",
            "ru": "пока в зоне objective marker, выбранного для этой модели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0c73087d-b71b-4c67-b25a-7788d7908c74:wardens-of-ultramar",
      "kind": "ability",
      "name": "Wardens of Ultramar: Second Company Banner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wardens-of-ultramar"
      },
      "hash": "2797bed0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit contains Ancient Gadriel",
            "ru": "пока в отряде есть Ancient Gadriel"
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
            "en": "while this unit contains Ancient Gadriel and CAPTAIN TITUS",
            "ru": "пока в отряде есть Ancient Gadriel и CAPTAIN TITUS"
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
      "sid": "7fad0617-e2d1-4607-bfd1-e736ed2660a5",
      "kind": "armyRule",
      "name": "Oath of Moment",
      "det": null,
      "hash": "87451b53",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "9a87c430-019b-49f6-b70a-278e0a8169d5",
      "kind": "armyRule",
      "name": "Space Marine Chapters",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "0dba42cb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — one Chapter per army and its exclusions"
    },
    {
      "sid": "abc5a0da-6e22-42fc-8e98-e53976b3caab",
      "kind": "detachmentRule",
      "name": "Shield of the Imperium",
      "det": "Anvil Siege Force",
      "hash": "1a020a37",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "anvil-siege-force"
      }
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
      "sid": "f8714ccf-244f-44c5-aaac-9dc11b404038",
      "kind": "detachmentRule",
      "name": "Adaptive Defence",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "detachmentRule",
        "det": "ceramite-sentinels"
      },
      "hash": "0500502c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Entrenched",
          "when": {
            "en": "while the unit is within a terrain feature, was not set up this turn and no model moved more than 3\"",
            "ru": "пока юнит находится в элементе ландшафта, не был выставлен в этом ходу и ни одна модель не прошла больше 3\""
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e8f365fd-9e58-4321-a78c-ed2e9c1e64de",
      "kind": "detachmentRule",
      "name": "Close-range Eradication",
      "det": "Firestorm Assault Force",
      "hash": "41ee2aa2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per ranged attack against a unit within 12\"",
            "ru": "за стрелковую атаку по отряду в пределах 12\""
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
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "firestorm-assault-force"
      }
    },
    {
      "sid": "3d216f9e-1d03-4dcb-ada4-872c519261bc",
      "kind": "detachmentRule",
      "name": "Vulkan’s Quest",
      "det": "Forgefather’s Seekers",
      "hash": "41ee2aa2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per ranged attack against a unit within 12\"",
            "ru": "за стрелковую атаку по отряду в пределах 12\""
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
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "825579c0-e887-4d56-926e-8fea38953997",
      "kind": "detachmentRule",
      "name": "Target Sighted",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "headhunter-task-force"
      },
      "hash": "4f08e2fa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "each time that TANK ACE unit Advances, until the end of the phase (replacing the Advance roll)",
            "ru": "каждый раз, когда юнит TANK ACE совершает Advance, до конца фазы (вместо броска Advance)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5f85515e-c438-4f69-9b46-e1235fa5b934",
      "kind": "detachmentRule",
      "name": "Psychic Disciplines",
      "det": "Librarius Conclave",
      "ref": {
        "kind": "detachmentRule",
        "det": "librarius-conclave"
      },
      "hash": "569c6dad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while the Biomancy Discipline is the one selected this battle round",
            "ru": "пока в этом раунде выбрана дисциплина Biomancy"
          },
          "cond": [
            "discipline-biomancy"
          ]
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "while the Pyromancy Discipline is selected, against an enemy unit within 12\"",
            "ru": "пока выбрана дисциплина Pyromancy, против отряда противника в пределах 12\""
          },
          "cond": [
            "discipline-pyromancy",
            "never"
          ]
        }
      ]
    },
    {
      "sid": "b14b38af-00df-43ac-aad6-0595e00c441a",
      "kind": "detachmentRule",
      "name": "Rapid-drop Deployment",
      "det": "Orbital Assault Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "orbital-assault-force"
      },
      "hash": "f2b2e8f3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fa8c2bcd-8194-4017-b12b-b7eed35cc993",
      "kind": "detachmentRule",
      "name": "Oath of Reclamation",
      "det": "Reclamation Force",
      "hash": "09be5f9e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per melee attack against a unit within range of an objective marker",
            "ru": "за атаку ближнего боя по отряду в радиусе маркера цели"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "reclamation-force"
      }
    },
    {
      "sid": "864b0e6a-9580-4fd4-ac41-b31e1afbb1ce",
      "kind": "enhancement",
      "name": "Iron Resolve",
      "det": "1st Company Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      },
      "hash": "bec70c62",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "c8f28a58-eefa-4c34-94e8-5dbf475724b0",
      "kind": "enhancement",
      "name": "Rites of War",
      "det": "1st Company Task Force",
      "hash": "1f954fcf",
      "ver": 925,
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
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      }
    },
    {
      "sid": "0d51b8da-5971-4be9-88f9-635033ca3cfe",
      "kind": "enhancement",
      "name": "The Imperium’s Sword",
      "det": "1st Company Task Force",
      "hash": "e6657e96",
      "ver": 925,
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
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "1st-company-task-force"
      }
    },
    {
      "sid": "3fc43d3f-e342-4c47-be47-b988e604f8f9",
      "kind": "enhancement",
      "name": "Architect of War",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "enhancement",
        "det": "anvil-siege-force"
      },
      "hash": "224d2ea9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "0a185dec-e874-4f9e-ab48-6296f1ba5221",
      "kind": "enhancement",
      "name": "Stoic Defender",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "enhancement",
        "det": "anvil-siege-force"
      },
      "hash": "cab30c3c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1816609d-be8c-4b19-bf30-7b04cf8d4536",
      "kind": "enhancement",
      "name": "Shock Deployment",
      "det": "Armoured Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-speartip"
      },
      "hash": "bd5d10fa",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "in your Shooting phase, if the unit disembarked from a Transport this turn",
            "ru": "в вашей фазе стрельбы, если отряд высадился из Transport в этом ходу"
          },
          "cond": [
            "phase-shooting",
            "unit-disembarked"
          ]
        }
      ]
    },
    {
      "sid": "11750a06-78b2-4ad9-8e19-24d83bc78038",
      "kind": "enhancement",
      "name": "Tip of the Spear",
      "det": "Armoured Speartip",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-speartip"
      },
      "hash": "38f90111",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
          "when": {
            "en": "the unit's bolt rifle weapons only",
            "ru": "только для оружия bolt rifle в этом юните"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "note": "names one weapon by name, a subset of the table this format cannot single out"
    },
    {
      "sid": "eaac3c39-f06a-476a-acae-7993c8c45b38",
      "kind": "enhancement",
      "name": "Blades of Valour",
      "det": "Bastion Task Force",
      "hash": "e3dec843",
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
        "det": "bastion-task-force"
      }
    },
    {
      "sid": "6bb6e923-c0f4-4e50-a6a8-876df81e1f6b",
      "kind": "enhancement",
      "name": "Bombast Omnivox",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "04462659",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f80a835c-9d3f-424c-b3f6-39b1b9c38b0d",
      "kind": "enhancement",
      "name": "Eye of the Primarch",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "134941ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "the bearer and Battleline models in its unit only",
            "ru": "только носитель и модели Battleline в его отряде"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "1b46835e-a785-4a31-8f8f-a80b27136279",
      "kind": "enhancement",
      "name": "Hero of the Chapter",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "bastion-task-force"
      },
      "hash": "c7be8767",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "78cc0398-facb-4866-ab12-6f89d83556d4",
      "kind": "enhancement",
      "name": "Armour of Antoninus",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "192beb6c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        }
      ]
    },
    {
      "sid": "ee406f75-ff0d-48fa-a912-668b94840822",
      "kind": "enhancement",
      "name": "Oath of Macragge",
      "det": "Blade of Ultramar",
      "hash": "647d8d4c",
      "ver": 925,
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
          "value": 2,
          "when": {
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "doctrine-assault"
          ],
          "alt": 1,
          "when": {
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      }
    },
    {
      "sid": "bc002275-58b6-41cf-ac7c-df522aecec69",
      "kind": "enhancement",
      "name": "Veteran of Behemoth",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "enhancement",
        "det": "blade-of-ultramar"
      },
      "hash": "a2c93f37",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "2b58efe2-2d62-4b7b-a0df-6e65bf3193ce",
      "kind": "enhancement",
      "name": "Spy-skull Data Link",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "enhancement",
        "det": "ceramite-sentinels"
      },
      "hash": "b05ef11e",
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
      "sid": "8d56caf6-2966-40b2-814f-00bac4e11b27",
      "kind": "enhancement",
      "name": "Champion of the Feast",
      "det": "Emperor’s Shield",
      "hash": "e7316e39",
      "ver": 925,
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
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "emperors-shield"
      }
    },
    {
      "sid": "8b050852-d91a-4314-8f89-1403beea564a",
      "kind": "enhancement",
      "name": "Disciple of Rhetoricus",
      "det": "Emperor’s Shield",
      "hash": "d4cde193",
      "ver": 925,
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
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "emperors-shield"
      }
    },
    {
      "sid": "a02bb3db-b4bd-4a43-b357-db06895ae216",
      "kind": "enhancement",
      "name": "Adamantine Mantle",
      "det": "Firestorm Assault Force",
      "ref": {
        "kind": "enhancement",
        "det": "firestorm-assault-force"
      },
      "hash": "ff3aba79",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "28a17ead-dfe3-4bb6-b02e-52c329cce8a2",
      "kind": "enhancement",
      "name": "War-tempered Artifice",
      "det": "Firestorm Assault Force",
      "hash": "449263c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "firestorm-assault-force"
      }
    },
    {
      "sid": "cc7476d6-9728-4a13-a76a-566bc9ec61f9",
      "kind": "enhancement",
      "name": "Adamantine Mantle",
      "det": "Forgefather’s Seekers",
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      },
      "hash": "ff3aba79",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9eb575db-8984-49c8-a8e2-9f13a038c625",
      "kind": "enhancement",
      "name": "Immolator",
      "det": "Forgefather’s Seekers",
      "hash": "aaa5b911",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "tag": "TORRENT"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "b1a004c8-5ca5-41af-a576-9ded975ec820",
      "kind": "enhancement",
      "name": "War-tempered Artifice",
      "det": "Forgefather’s Seekers",
      "hash": "449263c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "forgefathers-seekers"
      }
    },
    {
      "sid": "83b8281f-2251-4981-a7e7-1a1ce57ef483",
      "kind": "enhancement",
      "name": "Raptorial Cogitator Core (Upgrade)",
      "det": "Fulguris Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "fulguris-task-force"
      },
      "hash": "c09e0fa5",
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
      "sid": "32c6e6cd-2f06-4773-8875-8410e5df2caf",
      "kind": "enhancement",
      "name": "Artificer Armour",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "192beb6c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null
        }
      ]
    },
    {
      "sid": "d3be1512-5719-483c-98c8-bda76a604897",
      "kind": "enhancement",
      "name": "Fire Discipline",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      },
      "hash": "a2c93f37",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "57200c62-5d47-4622-a062-41e1bc1241c9",
      "kind": "enhancement",
      "name": "The Honour Vehement",
      "det": "Gladius Task Force",
      "hash": "647d8d4c",
      "ver": 925,
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
          "value": 2,
          "when": {
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "doctrine-assault"
          ],
          "alt": 1,
          "when": {
            "en": "Attacks and Strength +2 instead, while the bearer is under the effects of the Assault Doctrine",
            "ru": "атаки и сила +2 вместо +1, пока на носителя действует Assault Doctrine"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "gladius-task-force"
      }
    },
    {
      "sid": "50598313-52b9-4408-a99e-16314a65b1f3",
      "kind": "enhancement",
      "name": "Iron Laurel",
      "det": "Hammer of Avernii",
      "hash": "c16af735",
      "ver": 925,
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
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-avernii"
      }
    },
    {
      "sid": "9f0aeadd-6d2b-4f0c-9e01-f66bf23e074d",
      "kind": "enhancement",
      "name": "Spiritus Ferrum",
      "det": "Hammer of Avernii",
      "hash": "e6657e96",
      "ver": 925,
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
          "value": 1,
          "when": {
            "en": "once per battle, for the phase, the bonus also applies to the other models in the bearer's unit",
            "ru": "один раз за битву, на фазу, бонус получают и остальные модели отряда носителя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hammer-of-avernii"
      }
    },
    {
      "sid": "8b00b0ce-52cd-46a3-9adb-b39c5dc2058c",
      "kind": "enhancement",
      "name": "Astartes Tank Ace (Aura)",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "headhunter-task-force"
      },
      "hash": "42cab643",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "in your Shooting phase, while within 6\" of the bearer",
            "ru": "в вашей фазе стрельбы, пока в пределах 6\" от носителя"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6e9bfaba-0954-4037-806b-32af5791e117",
      "kind": "enhancement",
      "name": "Firestorm Coordinators",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "headhunter-task-force"
      },
      "hash": "c8776897",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "fb42248c-8de6-42bb-a457-555e04ae072f",
      "kind": "enhancement",
      "name": "Redoubtable Machine Spirit",
      "det": "Headhunter Task Force",
      "hash": "34b736df",
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
        "det": "headhunter-task-force"
      }
    },
    {
      "sid": "0c21dd37-cff5-4099-9cab-3cc4027d8a3b",
      "kind": "enhancement",
      "name": "Adept of the Omnissiah",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "d2c81520",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d8f14666-8a59-43cf-ab2e-ae009229be08",
      "kind": "enhancement",
      "name": "Target Augury Web",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "19e261ff",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f60cf1af-30e3-4a74-9b73-e5263614cc1a",
      "kind": "enhancement",
      "name": "The Flesh Is Weak",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "ironstorm-spearhead"
      },
      "hash": "02afa46f",
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
      "sid": "d0ec4815-3cd2-4b50-9a56-d79fc45c0097",
      "kind": "enhancement",
      "name": "Temporal Corridor",
      "det": "Librarius Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "librarius-conclave"
      },
      "hash": "5c33311b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4d288693-6483-4250-98d0-29c21fb619d6",
      "kind": "enhancement",
      "name": "Veteran of the Vanguard",
      "det": "Orbital Assault Force",
      "ref": {
        "kind": "enhancement",
        "det": "orbital-assault-force"
      },
      "hash": "719dbd66",
      "ver": 925,
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
      "sid": "fb962a7a-73f1-4fa3-a5a8-8d31419e40c2",
      "kind": "enhancement",
      "name": "Seals of Reconquest",
      "det": "Reclamation Force",
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
        "det": "reclamation-force"
      }
    },
    {
      "sid": "b35d0b72-1c46-4a27-a0f9-ece68c7d4a08",
      "kind": "enhancement",
      "name": "Blackwing Shroud",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "enhancement",
        "det": "shadowmark-talon"
      },
      "hash": "b4c579a5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e443e399-f25c-4e3c-9f2d-152578603ec9",
      "kind": "enhancement",
      "name": "Umbral Raptor",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "enhancement",
        "det": "shadowmark-talon"
      },
      "hash": "171d2813",
      "ver": 925,
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
          "value": "Lone Operative",
          "when": null
        }
      ]
    },
    {
      "sid": "2906828f-8819-4b4d-a17a-5e0960a74000",
      "kind": "enhancement",
      "name": "Hunter’s Eye",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      },
      "hash": "c21119aa",
      "ver": 925,
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
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "d72f263b-8ee5-4f71-b46d-7142f2e7e234",
      "kind": "enhancement",
      "name": "Spearpoint Paragon",
      "det": "Spearpoint Task Force",
      "hash": "1ce3d73b",
      "ver": 925,
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
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
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
          "cond": [
            "unit-charged"
          ],
          "alt": 1,
          "when": {
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "spearpoint-task-force"
      }
    },
    {
      "sid": "8b881334-b47a-4003-8180-10a83f4e619c",
      "kind": "enhancement",
      "name": "Fury of the Storm",
      "det": "Stormlance Task Force",
      "hash": "1db2008b",
      "ver": 925,
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
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
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
          "cond": [
            "unit-charged"
          ],
          "alt": 1,
          "when": {
            "en": "Strength and AP improve by 2 instead, until the end of the turn, after the bearer ends a Charge move",
            "ru": "сила и пробитие улучшаются на 2 вместо 1 до конца хода, после того как носитель завершил чардж"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "stormlance-task-force"
      }
    },
    {
      "sid": "acbf2d07-94a9-4518-91aa-1bfdaa4dac9d",
      "kind": "enhancement",
      "name": "Ghostweave Cloak",
      "det": "Vanguard Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "vanguard-spearhead"
      },
      "hash": "171d2813",
      "ver": 925,
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
          "value": "Lone Operative",
          "when": null
        }
      ]
    },
    {
      "sid": "e8edbda1-6f9f-4b5a-afab-85f6597cb6a6",
      "kind": "enhancement",
      "name": "The Blade Driven Deep",
      "det": "Vanguard Spearhead",
      "ref": {
        "kind": "enhancement",
        "det": "vanguard-spearhead"
      },
      "hash": "b4c579a5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "aada0d58-5120-4fe2-9f65-a42abbb7de06",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "1st Company Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "1st-company-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "06423f32-dc7b-43d8-8feb-65f462b5c8b6",
      "kind": "stratagem",
      "name": "Heroes of the Chapter",
      "det": "1st Company Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "1st-company-task-force",
        "name": "Heroes of the Chapter"
      },
      "hash": "b9fdac06",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6525f05c-d6ef-435d-b59b-83c9b1ee4c0c",
      "kind": "stratagem",
      "name": "Legendary Fortitude",
      "det": "1st Company Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "1st-company-task-force",
        "name": "Legendary Fortitude"
      },
      "hash": "288334fc",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "38939c03-9672-4ba4-b85f-5f6d2feee117",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "stratagem",
        "det": "anvil-siege-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c4be5f8e-562c-4805-bc00-aad3fa8e99f8",
      "kind": "stratagem",
      "name": "Battle Drill Recall",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "stratagem",
        "det": "anvil-siege-force",
        "name": "Battle Drill Recall"
      },
      "hash": "b5ab1858",
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "785677c5-013d-4173-8c1b-e81b052065f2",
      "kind": "stratagem",
      "name": "Not One Backwards Step",
      "det": "Anvil Siege Force",
      "ref": {
        "kind": "stratagem",
        "det": "anvil-siege-force",
        "name": "Not One Backwards Step"
      },
      "hash": "478ac888",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a12194fa-62d7-4c77-9bce-9c3e3311d873",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Armoured Speartip",
      "ref": {
        "kind": "stratagem",
        "det": "armoured-speartip",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2915804d-209d-48e9-95e1-8a1ca387ad8c",
      "kind": "stratagem",
      "name": "Purgation Doctrine",
      "det": "Armoured Speartip",
      "ref": {
        "kind": "stratagem",
        "det": "armoured-speartip",
        "name": "Purgation Doctrine"
      },
      "hash": "54dcc828",
      "ver": 925,
      "reviewed": true,
      "effects": []
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
      "sid": "7c0da99f-c645-4b51-b145-5b9cf61f5a5d",
      "kind": "stratagem",
      "name": "Guided Disruption",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "bastion-task-force",
        "name": "Guided Disruption"
      },
      "hash": "674794a8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "88477031-d757-4918-82f9-a7c3e949008b",
      "kind": "stratagem",
      "name": "Light of Vengeance",
      "det": "Bastion Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "bastion-task-force",
        "name": "Light of Vengeance"
      },
      "hash": "34daafc2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if that ability was the one selected, against an auspex scanned unit or for BATTLELINE",
            "ru": "если выбрана эта способность, против auspex scanned или для BATTLELINE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if that ability was the one selected, against an auspex scanned unit or for BATTLELINE",
            "ru": "если выбрана эта способность, против auspex scanned или для BATTLELINE"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "f5e96655-9f3c-4570-b2b9-1b2a74516770",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "024374e3-1440-4742-a13e-a6502e551dc8",
      "kind": "stratagem",
      "name": "Courage and Honour!",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Courage and Honour!"
      },
      "hash": "092ba0cd",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while under the Assault Doctrine",
            "ru": "и ещё, под Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b2164541-e3d7-4bb3-9503-d7c814c32142",
      "kind": "stratagem",
      "name": "Exemplary Vigilance",
      "det": "Blade of Ultramar",
      "ref": {
        "kind": "stratagem",
        "det": "blade-of-ultramar",
        "name": "Exemplary Vigilance"
      },
      "hash": "3878d23f",
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
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while under the Devastator Doctrine",
            "ru": "и ещё, под Devastator Doctrine"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9fea9da4-6943-4686-b51b-a49eb3073574",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b9894e70-4267-4344-aeb6-038746a63de3",
      "kind": "stratagem",
      "name": "Augmented Targeting",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Augmented Targeting"
      },
      "hash": "21d9ef8f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if that ability was the one selected (both while Entrenched)",
            "ru": "если выбрана эта способность (обе — пока Entrenched)"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "if that ability was the one selected (both while Entrenched)",
            "ru": "если выбрана эта способность (обе — пока Entrenched)"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "20843126-7ad3-4368-bdba-6fc715bafabb",
      "kind": "stratagem",
      "name": "Unyielding Might",
      "det": "Ceramite Sentinels",
      "ref": {
        "kind": "stratagem",
        "det": "ceramite-sentinels",
        "name": "Unyielding Might"
      },
      "hash": "6fa2b2cc",
      "ver": 925,
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
      "dur": "round"
    },
    {
      "sid": "9f8423ee-c000-4d20-9466-3d5207fe3a4e",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Emperor’s Shield",
      "ref": {
        "kind": "stratagem",
        "det": "emperors-shield",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d542c7cc-ad27-408d-8e01-cf164b7aa363",
      "kind": "stratagem",
      "name": "Disciplined Extermination",
      "det": "Emperor’s Shield",
      "ref": {
        "kind": "stratagem",
        "det": "emperors-shield",
        "name": "Disciplined Extermination"
      },
      "hash": "e52de03c",
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
      "sid": "c0e3ba04-7c7a-4fdd-b613-3035821ccd7f",
      "kind": "stratagem",
      "name": "Fury of the First",
      "det": "Emperor’s Shield",
      "ref": {
        "kind": "stratagem",
        "det": "emperors-shield",
        "name": "Fury of the First"
      },
      "hash": "473d9c6f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a5a527ed-ee07-4c6a-9cbd-fdf8a4d3d5ec",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Firestorm Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "firestorm-assault-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "acb62a30-656d-4994-ac0b-2f1f29f41d43",
      "kind": "stratagem",
      "name": "Crucible of Battle",
      "det": "Firestorm Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "firestorm-assault-force",
        "name": "Crucible of Battle"
      },
      "hash": "edc265e0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a3195f2f-f195-4286-bc99-09ae17814e5e",
      "kind": "stratagem",
      "name": "Immolation Protocols",
      "det": "Firestorm Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "firestorm-assault-force",
        "name": "Immolation Protocols"
      },
      "hash": "a6262699",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "6602438d-0065-4144-8df2-00a495e664e2",
      "kind": "stratagem",
      "name": "Onslaught of Fire",
      "det": "Firestorm Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "firestorm-assault-force",
        "name": "Onslaught of Fire"
      },
      "hash": "6c625793",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2501f65c-cfe2-4b19-9b73-4773a4fe501a",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Forgefather’s Seekers",
      "ref": {
        "kind": "stratagem",
        "det": "forgefathers-seekers",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "07500c11-4385-44b0-9cb9-7a37af500b10",
      "kind": "stratagem",
      "name": "Crucible of Battle",
      "det": "Forgefather’s Seekers",
      "ref": {
        "kind": "stratagem",
        "det": "forgefathers-seekers",
        "name": "Crucible of Battle"
      },
      "hash": "edc265e0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e9492f79-6110-4884-bf1e-16c37bb8d830",
      "kind": "stratagem",
      "name": "Immolation Protocols",
      "det": "Forgefather’s Seekers",
      "ref": {
        "kind": "stratagem",
        "det": "forgefathers-seekers",
        "name": "Immolation Protocols"
      },
      "hash": "d1199be5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "04762d86-2415-4b87-950f-347cd7702fed",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c055b116-504d-418e-9e52-0951913d32e5",
      "kind": "stratagem",
      "name": "Honour the Chapter",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Honour the Chapter"
      },
      "hash": "092ba0cd",
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
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while under the Assault Doctrine",
            "ru": "и ещё, под Assault Doctrine"
          },
          "cond": [
            "doctrine-assault"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "07ce705a-e059-48a8-8dec-1d83b27162f0",
      "kind": "stratagem",
      "name": "Storm of Fire",
      "det": "Gladius Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "gladius-task-force",
        "name": "Storm of Fire"
      },
      "hash": "3878d23f",
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
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while under the Devastator Doctrine",
            "ru": "и ещё, под Devastator Doctrine"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7f1ca1b2-6c84-4602-bdc4-d13555bc0eb8",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Hammer of Avernii",
      "ref": {
        "kind": "stratagem",
        "det": "hammer-of-avernii",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "fb5116e6-606d-42b4-8f7c-a4022ba507b7",
      "kind": "stratagem",
      "name": "Augmetic Fortitude",
      "det": "Hammer of Avernii",
      "ref": {
        "kind": "stratagem",
        "det": "hammer-of-avernii",
        "name": "Augmetic Fortitude"
      },
      "hash": "288334fc",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "58c32d7a-b0f7-4cfe-8f3b-086adfedbeba",
      "kind": "stratagem",
      "name": "Ruthless Butchery",
      "det": "Hammer of Avernii",
      "ref": {
        "kind": "stratagem",
        "det": "hammer-of-avernii",
        "name": "Ruthless Butchery"
      },
      "hash": "eebbe6d7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9a419058-a65d-4035-ae9b-4cb5d03836c9",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "headhunter-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "02c615e1-a6c1-4a12-ab10-334cdd64dc94",
      "kind": "stratagem",
      "name": "Target Weak Point",
      "det": "Headhunter Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "headhunter-task-force",
        "name": "Target Weak Point"
      },
      "hash": "f6156f2b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
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
      "sid": "07c5c566-9c8f-4037-85e0-02be57f30805",
      "kind": "stratagem",
      "name": "Ancient Fury",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "ironstorm-spearhead",
        "name": "Ancient Fury"
      },
      "hash": "45125d4c",
      "ver": 925,
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
        }
      ],
      "dur": "round"
    },
    {
      "sid": "c724046a-d110-4aa0-a9f2-69e367eb680c",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "ironstorm-spearhead",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a6c31db3-14f8-4d8a-a25f-46fc6428ada8",
      "kind": "stratagem",
      "name": "Mercy Is Weakness",
      "det": "Ironstorm Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "ironstorm-spearhead",
        "name": "Mercy Is Weakness"
      },
      "hash": "2df6d255",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against a unit below its Starting Strength",
            "ru": "по отряду ниже Starting Strength"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "dd818b80-27a5-4b4d-b0ed-ac7e5b769bfe",
      "kind": "stratagem",
      "name": "Blind Screen",
      "det": "Orbital Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "orbital-assault-force",
        "name": "Blind Screen"
      },
      "hash": "3cecd180",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7cac734b-0aa3-4cc8-a869-0c52cddac5b5",
      "kind": "stratagem",
      "name": "Tactical Decapitation",
      "det": "Orbital Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "orbital-assault-force",
        "name": "Tactical Decapitation"
      },
      "hash": "14e6e618",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "a2d042cc-28da-4fc0-b159-5ccfb5faf864",
      "kind": "stratagem",
      "name": "Crusading Conquerors",
      "det": "Reclamation Force",
      "ref": {
        "kind": "stratagem",
        "det": "reclamation-force",
        "name": "Crusading Conquerors"
      },
      "hash": "ff404a82",
      "ver": 925,
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
      "dur": "round"
    },
    {
      "sid": "1de1e05c-c7d7-4aa4-8fbb-75e03745debd",
      "kind": "stratagem",
      "name": "Furious Dedication",
      "det": "Reclamation Force",
      "ref": {
        "kind": "stratagem",
        "det": "reclamation-force",
        "name": "Furious Dedication"
      },
      "hash": "bec22aaf",
      "ver": 925,
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
      "dur": "turn"
    },
    {
      "sid": "dd419425-d74b-4290-aa5d-dd2784cfee5b",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "stratagem",
        "det": "shadowmark-talon",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4a593889-576e-4214-86eb-1e105d8ea880",
      "kind": "stratagem",
      "name": "Lay Low the Tyrants",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "stratagem",
        "det": "shadowmark-talon",
        "name": "Lay Low the Tyrants"
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
      "sid": "666c5432-8a31-40c5-aa00-5be1b307b012",
      "kind": "stratagem",
      "name": "Stunning Fusillade",
      "det": "Shadowmark Talon",
      "ref": {
        "kind": "stratagem",
        "det": "shadowmark-talon",
        "name": "Stunning Fusillade"
      },
      "hash": "ac05629f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "against targets more than 12\" away",
            "ru": "против целей дальше 12\""
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
            "en": "against targets more than 12\" away",
            "ru": "против целей дальше 12\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "92569cb1-b793-4fb4-b442-ebec935ac746",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b7ffabf0-52bd-42fb-ab01-8377aaa74f6c",
      "kind": "stratagem",
      "name": "Spear Thrust and Sabre Swing",
      "det": "Spearpoint Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "spearpoint-task-force",
        "name": "Spear Thrust and Sabre Swing"
      },
      "hash": "06b13ff3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "if that ability was the one selected (MOUNTED units get both)",
            "ru": "если выбрана эта способность (MOUNTED получает обе)"
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
          "when": {
            "en": "if that ability was the one selected (MOUNTED units get both)",
            "ru": "если выбрана эта способность (MOUNTED получает обе)"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7825b7e3-7e1b-47ec-b336-4303168a962f",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "stormlance-task-force",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8fd86a3f-9b2e-42c2-a4c9-55e9bbc2ab4d",
      "kind": "stratagem",
      "name": "Blitzing Fusillade",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "stormlance-task-force",
        "name": "Blitzing Fusillade"
      },
      "hash": "5ffe5282",
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
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "for weapons that already had [ASSAULT]",
            "ru": "для оружия, у которого уже был [ASSAULT]"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b1a41a8f-ad96-4a14-9794-5549fef75ede",
      "kind": "stratagem",
      "name": "Full Throttle",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "stormlance-task-force",
        "name": "Full Throttle"
      },
      "hash": "8c3d52bc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll); 9\" instead if Mounted",
            "ru": "в фазе с Advance (без броска); 9\" если Mounted"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "dd4d6731-dd3d-4b45-9721-add5b7ac613d",
      "kind": "stratagem",
      "name": "Shock Assault",
      "det": "Stormlance Task Force",
      "ref": {
        "kind": "stratagem",
        "det": "stormlance-task-force",
        "name": "Shock Assault"
      },
      "hash": "5757518f",
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "bacb38b9-888e-4a2b-8ae8-1a80fe451742",
      "kind": "stratagem",
      "name": "Armour of Contempt",
      "det": "Vanguard Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "vanguard-spearhead",
        "name": "Armour of Contempt"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2c55924e-6941-4332-bd1a-aa474581fad2",
      "kind": "stratagem",
      "name": "Strike From The Shadows",
      "det": "Vanguard Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "vanguard-spearhead",
        "name": "Strike From The Shadows"
      },
      "hash": "ac05629f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "against targets more than 12\" away",
            "ru": "против целей дальше 12\""
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
            "en": "against targets more than 12\" away",
            "ru": "против целей дальше 12\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "715656ae-384c-4b07-a709-b5519e16f0e6",
      "kind": "stratagem",
      "name": "Surgical Strikes",
      "det": "Vanguard Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "vanguard-spearhead",
        "name": "Surgical Strikes"
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
      "sid": "a32cbb8e-1369-4178-bf49-b68c9e39100c",
      "kind": "stratagem",
      "name": "Meteoric Onslaught",
      "det": "Vengeful Hosts",
      "ref": {
        "kind": "stratagem",
        "det": "vengeful-hosts",
        "name": "Meteoric Onslaught"
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
      "sid": "8a57b803-6122-4d63-a1a8-526e49b73adf:ancient-in-terminator-armour",
      "kind": "wargear",
      "name": "Ancient in Terminator Armour: Terminator Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ancient-in-terminator-armour",
        "item": "terminator storm shield"
      },
      "hash": "6026918c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "6",
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
      "sid": "5bbcf921-b6c6-400c-bf8e-9b0104322b21:captain-with-jump-pack",
      "kind": "wargear",
      "name": "Captain with Jump Pack: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "captain-with-jump-pack",
        "item": "relic shield"
      },
      "hash": "6026918c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "6",
          "when": null
        }
      ]
    },
    {
      "sid": "5bbcf921-b6c6-400c-bf8e-9b0104322b21:captain",
      "kind": "wargear",
      "name": "Captain: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "captain",
        "item": "relic shield"
      },
      "hash": "6026918c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "6",
          "when": null
        }
      ]
    },
    {
      "sid": "9c41682e-4ea0-4fdf-810b-c3a9d4d822a3:centurion-assault-squad",
      "kind": "wargear",
      "name": "Centurion Assault Squad: Centurion assault launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "centurion-assault-squad",
        "item": "centurion assault launcher"
      },
      "hash": "83e77f19",
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
      "sid": "5bbcf921-b6c6-400c-bf8e-9b0104322b21:chaplain-in-terminator-armour",
      "kind": "wargear",
      "name": "Chaplain in Terminator Armour: Relic Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "chaplain-in-terminator-armour",
        "item": "relic shield"
      },
      "hash": "6026918c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "set",
          "value": "6",
          "when": null
        }
      ]
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
    },
    {
      "sid": "a19b0acf-cd48-425a-bd2c-395d84944116:infiltrator-squad",
      "kind": "wargear",
      "name": "Infiltrator Squad: Helix Gauntlet",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "infiltrator-squad",
        "item": "helix gauntlet"
      },
      "hash": "7c0f0ce2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "when": null
        }
      ]
    },
    {
      "sid": "007d6307-976c-424b-871a-c3324c4f8b6d:lieutenant",
      "kind": "wargear",
      "name": "Lieutenant: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "lieutenant",
        "item": "storm shield"
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
      "sid": "2e184848-e984-48fd-88e8-743cdea21eb9:reiver-squad",
      "kind": "wargear",
      "name": "Reiver Squad: Reiver Grav-chute",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "reiver-squad",
        "item": "reiver grav-chute"
      },
      "hash": "0cb13cfd",
      "ver": 925,
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
      "sid": "7b6f34d2-cadf-4b4b-83ca-343026d55249:terminator-assault-squad",
      "kind": "wargear",
      "name": "Terminator Assault Squad: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "terminator-assault-squad",
        "item": "storm shield"
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
      "sid": "007d6307-976c-424b-871a-c3324c4f8b6d:vanguard-veteran-squad-with-jump-packs",
      "kind": "wargear",
      "name": "Vanguard Veteran Squad with Jump Packs: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "vanguard-veteran-squad-with-jump-packs",
        "item": "storm shield"
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
      "sid": "b0e2ebc8-9362-401b-86f4-0b59b4f57752:victrix-honour-guard",
      "kind": "wargear",
      "name": "Victrix Honour Guard: Banner of Macragge",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "victrix-honour-guard",
        "item": "banner of macragge"
      },
      "hash": "62101fcb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
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
      "sid": "b1c5d835-f70f-439c-9449-aa447771540a:wardens-of-ultramar",
      "kind": "wargear",
      "name": "Wardens of Ultramar: Refractor Field",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wardens-of-ultramar",
        "item": "refractor field"
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
      "sid": "007d6307-976c-424b-871a-c3324c4f8b6d:wardens-of-ultramar",
      "kind": "wargear",
      "name": "Wardens of Ultramar: Storm Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wardens-of-ultramar",
        "item": "storm shield"
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
    }
  ]
}
