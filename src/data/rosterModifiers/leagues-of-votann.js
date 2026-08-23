// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "leagues-of-votann",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "da8ebbc2-fd92-49fc-993a-e14833cb4874:arkanyst-evaluator",
      "kind": "ability",
      "name": "Arkanyst Evaluator: Resource Transmutation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "arkanyst-evaluator"
      },
      "hash": "d718d1bf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "once per turn, while this ability is used for 1YP",
            "ru": "раз за ход, если способность использована за 1YP"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2cdfc336-20d9-400b-885b-67785a21ec58:arkanyst-evaluator",
      "kind": "ability",
      "name": "Arkanyst Evaluator: Science Guild Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "arkanyst-evaluator"
      },
      "hash": "03485ce3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "91160a46-f367-4dcd-9bfd-87f437903d94:bane-slayer-s-bulwark-brokhyr-thunderkyn",
      "kind": "ability",
      "name": "Bane Slayer's Bulwark Brokhyr Thunderkyn: Breaching Fire",
      "det": null,
      "ref": null,
      "hash": "3df82845",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "773edacf-28fd-4694-96ab-306ef6329ae6:berehk-stornbr-w",
      "kind": "ability",
      "name": "Berehk Stornbröw: Break the Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "berehk-stornbr-w"
      },
      "hash": "cedc10d8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        },
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
      "sid": "35e3ca62-d5ea-4758-b5bd-39e2631cf33a:br-khyr-iron-master",
      "kind": "ability",
      "name": "Brôkhyr Iron-master: Brôkhyr Guild Support",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "br-khyr-iron-master"
      },
      "hash": "653bd1cd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "72f9560a-4651-44e7-a8e3-cd7ba5c9df96:einhyr-champion",
      "kind": "ability",
      "name": "Einhyr Champion: Exemplar of the Einhyr",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "einhyr-champion"
      },
      "hash": "2170496e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "03248c77-668f-4f2c-bbf2-afe8594b9d72:grimnyr",
      "kind": "ability",
      "name": "Grimnyr: Fortify",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "grimnyr"
      },
      "hash": "08801928",
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
      "sid": "28f010a7-1c57-498f-8587-5edf804ace65:k-hl",
      "kind": "ability",
      "name": "Kâhl: Kindred Hero",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "k-hl"
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
      "sid": "7342cf80-6585-4570-bd7e-a26d2c8a584b:vynn-bane-slayer",
      "kind": "ability",
      "name": "Vynn Bane-Slayer: Fast-firing Targeters",
      "det": null,
      "ref": null,
      "hash": "4b9d39f6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "a23f8bdf-5c65-4c96-90b6-1b93696cc5f3",
      "kind": "armyRule",
      "name": "Prioritised Efficiency",
      "det": null,
      "hash": "1ba9c15b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "661e67b0-df39-44c5-8b83-263cd4856ff6",
      "kind": "detachmentRule",
      "name": "Sagitaur Spearhead",
      "det": "Armoured Trailblazers",
      "ref": {
        "kind": "detachmentRule",
        "det": "armoured-trailblazers"
      },
      "hash": "fee0d106",
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
      "sid": "182bd5d6-3bd6-4d04-b108-557182b698e6",
      "kind": "detachmentRule",
      "name": "Mobile Sensor Relays",
      "det": "Brandfast Oathband",
      "ref": {
        "kind": "detachmentRule",
        "det": "brandfast-oathband"
      },
      "hash": "4a2fd680",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3ff21f42-0b1b-40f3-bf0c-19e3aae93804",
      "kind": "detachmentRule",
      "name": "Fury From The Dêlve",
      "det": "Dêlve Assault Shift",
      "ref": {
        "kind": "detachmentRule",
        "det": "delve-assault-shift"
      },
      "hash": "ef922977",
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
      "sid": "fdfc7863-9632-43df-88dd-2e2fda4a6dfa",
      "kind": "detachmentRule",
      "name": "Methodical Annihilation",
      "det": "Hearthband",
      "hash": "28d11aec",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Kâhl, Einhyr Hearthguard and Ûthar units only, per attack against the closest eligible target or a target in Engagement Range",
            "ru": "только отряды Kâhl, Einhyr Hearthguard и Ûthar, за атаку по ближайшей допустимой цели или цели в радиусе боя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "hearthband"
      }
    },
    {
      "sid": "27e25b2c-5cf3-47df-8e2b-a3dff31cdd95",
      "kind": "enhancement",
      "name": "Saturation Rounds (Upgrade)",
      "det": "Armoured Trailblazers",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-trailblazers"
      },
      "hash": "42ae7259",
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
      "sid": "f8a1fc4c-65b9-466e-90b7-eb939120033c",
      "kind": "enhancement",
      "name": "Brôkhyr Barrage",
      "det": "Bane-slayer’s Bulwark",
      "ref": null,
      "hash": "55ba556e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "35318eb6-0912-4912-9d7a-ddd32af5c735",
      "kind": "enhancement",
      "name": "Trivärg Cyber Implant",
      "det": "Brandfast Oathband",
      "ref": {
        "kind": "enhancement",
        "det": "brandfast-oathband"
      },
      "hash": "d025af04",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "in your Shooting phase, if the unit disembarked from a Transport this turn or you spend 2YP",
            "ru": "в вашей фазе стрельбы, если отряд высадился из Transport в этом ходу или потрачено 2YP"
          },
          "cond": [
            "phase-shooting",
            "unit-disembarked"
          ]
        }
      ]
    },
    {
      "sid": "ab0a026e-6604-4425-8a3f-7adff3375e2d",
      "kind": "enhancement",
      "name": "Quake Supervisor",
      "det": "Dêlve Assault Shift",
      "hash": "c342f7bd",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "delve-assault-shift"
      }
    },
    {
      "sid": "b39ba051-9928-4883-8783-40a27ff07d66",
      "kind": "enhancement",
      "name": "Bastion Shield",
      "det": "Hearthband",
      "hash": "9984e1ee",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "hearthband"
      }
    },
    {
      "sid": "f7cc3d3b-4d28-4911-8718-85f6c4043c8c",
      "kind": "enhancement",
      "name": "Ironskein",
      "det": "Hearthband",
      "hash": "045363a2",
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
        "det": "hearthband"
      }
    },
    {
      "sid": "b48ffd02-ce7e-41c0-aa75-fc375e1fe200",
      "kind": "enhancement",
      "name": "Calculated Tenacity",
      "det": "Hearthfyre Arsenal",
      "hash": "e0b9192b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading that unit",
            "ru": "пока носитель ведёт этот отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hearthfyre-arsenal"
      }
    },
    {
      "sid": "f032aa6f-36db-4f80-b411-c04b7ff0754b",
      "kind": "enhancement",
      "name": "Fârstrydr Node",
      "det": "Hearthfyre Arsenal",
      "ref": {
        "kind": "enhancement",
        "det": "hearthfyre-arsenal"
      },
      "hash": "9b4d7ea7",
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
      "sid": "e39596ad-bfd4-4548-b115-a5d5f63a2fba",
      "kind": "enhancement",
      "name": "Ironskein",
      "det": "Hearthguard Covenant",
      "ref": {
        "kind": "enhancement",
        "det": "hearthguard-covenant"
      },
      "hash": "4c18222c",
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
      ]
    },
    {
      "sid": "c719e55c-ede4-4422-999b-11b166a3e0d7",
      "kind": "enhancement",
      "name": "Asset Manipulator",
      "det": "Mercenary Oathband",
      "ref": {
        "kind": "enhancement",
        "det": "mercenary-oathband"
      },
      "hash": "927db668",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8777d61f-6b9a-45ab-b0c2-639a917452e2",
      "kind": "enhancement",
      "name": "Etacarn SB9 Targeting Implant",
      "det": "Mercenary Oathband",
      "ref": {
        "kind": "enhancement",
        "det": "mercenary-oathband"
      },
      "hash": "c7e9d62f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this ability is used",
            "ru": "пока способность использована"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "dcc9fd81-0cb0-477b-9941-5f05fedf753f",
      "kind": "enhancement",
      "name": "Oathbound Speculator",
      "det": "Needgaârd Oathband",
      "hash": "641b2548",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "needgaard-oathband"
      }
    },
    {
      "sid": "cbcb0741-dced-40e8-99ab-9628de3fb0ac",
      "kind": "enhancement",
      "name": "Eye for Weakness",
      "det": "Persecution Prospect",
      "hash": "091ebe34",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "persecution-prospect"
      }
    },
    {
      "sid": "d2eda679-eccb-4db2-baac-72ed0d4cf5fb",
      "kind": "stratagem",
      "name": "Claimed for the Kindred",
      "det": "Bane-slayer’s Bulwark",
      "ref": null,
      "hash": "076afe4b",
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
      "dur": "turn"
    },
    {
      "sid": "b837ac4e-e909-4ae4-a50e-ca1b8bd4c678",
      "kind": "stratagem",
      "name": "Point-blank Fusillade",
      "det": "Bane-slayer’s Bulwark",
      "ref": null,
      "hash": "d2d4bd7d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "CLOSE-QUARTERS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "d1bc9d91-4eab-48d2-a89a-9db99c2fd77a",
      "kind": "stratagem",
      "name": "Tectonic Fracture",
      "det": "Dêlve Assault Shift",
      "ref": {
        "kind": "stratagem",
        "det": "delve-assault-shift",
        "name": "Tectonic Fracture"
      },
      "hash": "4bfa7aaa",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "147a06bd-d45b-45c3-98cd-a859b4c7dea3",
      "kind": "stratagem",
      "name": "No Shot Wasted",
      "det": "Farseekers",
      "ref": {
        "kind": "stratagem",
        "det": "farseekers",
        "name": "No Shot Wasted"
      },
      "hash": "b50f6f98",
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
      "sid": "df435ca3-aa6b-4dcb-8212-6bc35c4c1585",
      "kind": "stratagem",
      "name": "Scornful Analysis",
      "det": "Farseekers",
      "ref": {
        "kind": "stratagem",
        "det": "farseekers",
        "name": "Scornful Analysis"
      },
      "hash": "621331d3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a502277e-9201-4905-8ac4-8795943288c0",
      "kind": "stratagem",
      "name": "Brëkkeknots",
      "det": "Hearthband",
      "ref": {
        "kind": "stratagem",
        "det": "hearthband",
        "name": "Brëkkeknots"
      },
      "hash": "987d6ae0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "09bea355-bf90-4280-bce6-e1ce930c1aa8",
      "kind": "stratagem",
      "name": "Fury of the Hearth",
      "det": "Hearthband",
      "ref": {
        "kind": "stratagem",
        "det": "hearthband",
        "name": "Fury of the Hearth"
      },
      "hash": "3435e2a4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
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
            "en": "also, if 1YP was spent",
            "ru": "и ещё, если потрачен 1YP"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "bb6e0a96-3c97-4a50-b157-8674b55eefa2",
      "kind": "stratagem",
      "name": "Superior Craftsmanship",
      "det": "Hearthband",
      "ref": {
        "kind": "stratagem",
        "det": "hearthband",
        "name": "Superior Craftsmanship"
      },
      "hash": "2f4baaef",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "162911a1-936b-48f1-bd54-3c5fe5935f41",
      "kind": "stratagem",
      "name": "Fury of the Hearth",
      "det": "Hearthguard Covenant",
      "ref": {
        "kind": "stratagem",
        "det": "hearthguard-covenant",
        "name": "Fury of the Hearth"
      },
      "hash": "cd69cd45",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
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
            "en": "also, if 1YP was spent",
            "ru": "и ещё, если потрачен 1YP"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "df41a297-18b5-49d8-9f65-341f0de8cb69",
      "kind": "stratagem",
      "name": "Auxiliary Contract",
      "det": "Mercenary Oathband",
      "ref": {
        "kind": "stratagem",
        "det": "mercenary-oathband",
        "name": "Auxiliary Contract"
      },
      "hash": "1b8c180a",
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
      "sid": "073e93db-1dbb-4a04-9c8f-fa4a687ac016",
      "kind": "stratagem",
      "name": "Ancestral Sentence",
      "det": "Needgaârd Oathband",
      "ref": {
        "kind": "stratagem",
        "det": "needgaard-oathband",
        "name": "Ancestral Sentence"
      },
      "hash": "e26a7117",
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
      "sid": "808979ff-4bcb-44ad-88ca-dea1c4ac78c5",
      "kind": "stratagem",
      "name": "Honour of the Hold",
      "det": "Needgaârd Oathband",
      "ref": {
        "kind": "stratagem",
        "det": "needgaard-oathband",
        "name": "Honour of the Hold"
      },
      "hash": "30cff239",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "18d2ac2e-5e4c-4a2d-a34b-cdc2c711ef37",
      "kind": "stratagem",
      "name": "Void Hardened",
      "det": "Needgaârd Oathband",
      "ref": {
        "kind": "stratagem",
        "det": "needgaard-oathband",
        "name": "Void Hardened"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f54e0e60-d1ef-4cee-b1a2-2c94454e8d57",
      "kind": "stratagem",
      "name": "Dispersed Formation",
      "det": "Persecution Prospect",
      "ref": {
        "kind": "stratagem",
        "det": "persecution-prospect",
        "name": "Dispersed Formation"
      },
      "hash": "e7aadbf4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a102c8c5-5cdb-4563-ac4d-97d0e1313bea",
      "kind": "stratagem",
      "name": "Frontier Momentum",
      "det": "Persecution Prospect",
      "ref": {
        "kind": "stratagem",
        "det": "persecution-prospect",
        "name": "Frontier Momentum"
      },
      "hash": "50325371",
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
      "sid": "f58c275c-8b83-4fb3-8813-11c7b29cff7f",
      "kind": "stratagem",
      "name": "Ranger Tactics",
      "det": "Persecution Prospect",
      "ref": {
        "kind": "stratagem",
        "det": "persecution-prospect",
        "name": "Ranger Tactics"
      },
      "hash": "afe97b97",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6f7e40a4-2f84-495d-8a2c-c756c603b08e:einhyr-champion",
      "kind": "wargear",
      "name": "Einhyr Champion: Teleport Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "einhyr-champion",
        "item": "teleport crest"
      },
      "hash": "271b0376",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "94bb2d5a-b2ef-4286-869d-71867445cca2:einhyr-champion",
      "kind": "wargear",
      "name": "Einhyr Champion: Weavefield Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "einhyr-champion",
        "item": "weavefield crest"
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
          "when": null
        }
      ]
    },
    {
      "sid": "6ed75f65-8944-4116-a103-4c6e5ae5e068:einhyr-hearthguard",
      "kind": "wargear",
      "name": "Einhyr Hearthguard: Teleport Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "einhyr-hearthguard",
        "item": "teleport crest"
      },
      "hash": "d6359087",
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
      "sid": "c2bf69d8-7326-4933-84ae-58539abb44df:einhyr-hearthguard",
      "kind": "wargear",
      "name": "Einhyr Hearthguard: Weavefield crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "einhyr-hearthguard",
        "item": "weavefield crest"
      },
      "hash": "40d840b6",
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
      "sid": "c2bf69d8-7326-4933-84ae-58539abb44df:hearthkyn-warriors",
      "kind": "wargear",
      "name": "Hearthkyn Warriors: Weavefield crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "hearthkyn-warriors",
        "item": "weavefield crest"
      },
      "hash": "40d840b6",
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
      "sid": "1204f755-51f8-4f35-8126-4da29de988c1:ironkin-steeljacks-with-heavy-volkanite-disintegrators",
      "kind": "wargear",
      "name": "Ironkin Steeljacks with Heavy Volkanite Disintegrators: Preymark Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ironkin-steeljacks-with-heavy-volkanite-disintegrators",
        "item": "preymark crest"
      },
      "hash": "6fbb4ca3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "1204f755-51f8-4f35-8126-4da29de988c1:ironkin-steeljacks-with-melee-weapons",
      "kind": "wargear",
      "name": "Ironkin Steeljacks with Melee Weapons: Preymark Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ironkin-steeljacks-with-melee-weapons",
        "item": "preymark crest"
      },
      "hash": "6fbb4ca3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "3e828a03-5cad-42d0-b529-d1ac1e551753:k-hl",
      "kind": "wargear",
      "name": "Kâhl: Rampart Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "k-hl",
        "item": "rampart crest"
      },
      "hash": "b352cc54",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "ea178566-f956-496f-ae25-27f82360b663:k-hl",
      "kind": "wargear",
      "name": "Kâhl: Teleport Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "k-hl",
        "item": "teleport crest"
      },
      "hash": "bc2805c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "target": "led",
          "when": null
        }
      ]
    },
    {
      "sid": "e8a7d080-698c-40a8-ae09-8be318dd6859:kapricus-carrier",
      "kind": "wargear",
      "name": "Kapricus Carrier: Smoke Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kapricus-carrier",
        "item": "smoke launcher"
      },
      "hash": "46cafc31",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        }
      ]
    },
    {
      "sid": "e8a7d080-698c-40a8-ae09-8be318dd6859:kapricus-defenders",
      "kind": "wargear",
      "name": "Kapricus Defenders: Smoke Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "kapricus-defenders",
        "item": "smoke launcher"
      },
      "hash": "46cafc31",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Smoke",
          "when": null
        }
      ]
    },
    {
      "sid": "8f2926c4-dbed-4488-8da1-8ea590acf469:thar-the-destined",
      "kind": "wargear",
      "name": "Ûthar the Destined: Rampart Crest",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "thar-the-destined",
        "item": "rampart crest"
      },
      "hash": "2dd29335",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null,
          "target": "led"
        }
      ]
    }
  ]
}
