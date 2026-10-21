// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "adeptus-custodes",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "fadf5578-076b-404e-b8ad-6e0894695066:aleya",
      "kind": "ability",
      "name": "Aleya: Tactical Perception",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aleya"
      },
      "hash": "5d3f322a",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "76547058-7bf2-4e78-a224-b8efeae6351e:aleya",
      "kind": "ability",
      "name": "Aleya: Tenacious Spirit",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aleya"
      },
      "hash": "7cf0257a",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below starting strength",
            "ru": "пока отряд ниже стартовой численности"
          },
          "cond": [
            "unit-below-starting-strength"
          ]
        },
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below starting strength",
            "ru": "пока отряд ниже стартовой численности"
          },
          "cond": [
            "unit-below-half-strength"
          ]
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below half-strength",
            "ru": "пока отряд ниже половины численности"
          },
          "cond": [
            "unit-below-half-strength"
          ]
        },
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below starting strength",
            "ru": "пока отряд ниже стартовой численности"
          },
          "cond": [
            "unit-below-starting-strength"
          ],
          "target": "led"
        },
        {
          "on": "weapon",
          "stat": "hit",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below starting strength",
            "ru": "пока отряд ниже стартовой численности"
          },
          "cond": [
            "unit-below-half-strength"
          ],
          "target": "led"
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is below half-strength",
            "ru": "пока отряд ниже половины численности"
          },
          "cond": [
            "unit-below-half-strength"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "ff020e37-6eac-4864-aa8f-a2f3dd6d2a16:allarus-custodians",
      "kind": "ability",
      "name": "Allarus Custodians: Slayer of Tyrants",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "allarus-custodians"
      },
      "hash": "96ff4c4b",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit with a higher T",
            "ru": "против отряда с большей T"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8735690b-1b1a-4cbe-ba33-6c2519712c6b:aquilan-talon-contemptor-achillus-dreadnought",
      "kind": "ability",
      "name": "Aquilan Talon Contemptor-Achillus Dreadnought: Intimidating Presence",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquilan-talon-contemptor-achillus-dreadnought"
      },
      "hash": "00c9497c",
      "ver": 981,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3bebaab8-9044-4b2e-9c54-0d985e00d296:aquilan-wing-shield-captain",
      "kind": "ability",
      "name": "Aquilan Wing Shield-Captain: Unstoppable Will",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquilan-wing-shield-captain"
      },
      "hash": "91ce265d",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "165a6de3-6d18-4695-bbfd-8cb6a2de4efe:aquilon-terminators-with-solarite-power-gauntlets",
      "kind": "ability",
      "name": "Aquilon Terminators with Solarite Power Gauntlets: Dread Foe",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aquilon-terminators-with-solarite-power-gauntlets"
      },
      "hash": "eaa073e4",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against a target that is not a MONSTER or VEHICLE",
            "ru": "против цели, не являющейся MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2a808e3f-71a4-43e7-9984-8be3fddab25e:ares-gunship",
      "kind": "ability",
      "name": "Ares Gunship: Infernus Firebombs",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ares-gunship"
      },
      "hash": "623cb6f1",
      "ver": 981,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6b879288-b8e3-4332-8fcf-240631a5163d:blade-champion",
      "kind": "ability",
      "name": "Blade Champion: Sword of the Throne",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blade-champion"
      },
      "hash": "74d82bd4",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against this model’s mark",
            "ru": "против метки этой модели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d45e0565-51cb-4118-9b02-092cea2f35ee:caladius-grav-tank",
      "kind": "ability",
      "name": "Caladius Grav‑Tank: Destructor Optics",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "caladius-grav-tank"
      },
      "hash": "b78ddc8d",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against a target that is not a MONSTER or VEHICLE",
            "ru": "против цели, не являющейся MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "fb223225-63c9-4220-b938-5ef8d916d157:contemptor-achillus-dreadnought",
      "kind": "ability",
      "name": "Contemptor‑Achillus Dreadnought: Unyielding Ancient",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "contemptor-achillus-dreadnought"
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
      "sid": "0f611e5a-4443-4309-a9f6-cecb6c62d22d:contemptor-galatus-dreadnought",
      "kind": "ability",
      "name": "Contemptor‑Galatus Dreadnought: Unyielding Ancient",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "contemptor-galatus-dreadnought"
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
      "sid": "36f695ef-1638-4dfc-bcf6-fa8674cd5fca:custodian-guard-sodality-with-pyrithite-spears",
      "kind": "ability",
      "name": "Custodian Guard Sodality with Pyrithite Spears: No Foe Shall Stand (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "custodian-guard-sodality-with-pyrithite-spears"
      },
      "hash": "8fee6516",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "when this unit uses No Foe Shall Stand (once per battle)",
            "ru": "когда отряд применяет No Foe Shall Stand (раз за битву)"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "when this unit uses No Foe Shall Stand (once per battle)",
            "ru": "когда отряд применяет No Foe Shall Stand (раз за битву)"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "8bcb5da3-7aa3-497b-8871-426aa79dd7b7:custodian-guard-sodality",
      "kind": "ability",
      "name": "Custodian Guard Sodality: Impenetrable Defence",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "custodian-guard-sodality"
      },
      "hash": "e142e98c",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1: non-MONSTER/VEHICLE",
          "when": {
            "en": "while this unit or its target is within range of an objective",
            "ru": "пока этот отряд или его цель в пределах досягаемости цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4aa1a9b3-9b6d-4463-98ad-0edbefd1aa03:custodian-wardens",
      "kind": "ability",
      "name": "Custodian Wardens: Living Fortress",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "custodian-wardens"
      },
      "hash": "e441fc1c",
      "ver": 981,
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
      "sid": "f2aa7bec-a913-4d2e-8383-0fccc1998820:gilded-blades-custodian-guard",
      "kind": "ability",
      "name": "Gilded Blades Custodian Guard: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gilded-blades-custodian-guard"
      },
      "hash": "24c8e47f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
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
      "sid": "3ce73261-dcba-4288-879f-76bbd72baed1:gilded-blades-custodian-wardens",
      "kind": "ability",
      "name": "Gilded Blades Custodian Wardens: Divine Protection",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gilded-blades-custodian-wardens"
      },
      "hash": "163ad0c5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 4+ (vs mortal wounds)",
          "when": null
        }
      ]
    },
    {
      "sid": "ba4c027a-0761-4e7e-91ad-762d0e791941:gyrfalcon-jetbike-sodality",
      "kind": "ability",
      "name": "Gyrfalcon Jetbike Sodality: Death Blow",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "gyrfalcon-jetbike-sodality"
      },
      "hash": "111950b2",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "if this unit made a Charge move this turn",
            "ru": "если отряд совершил манёвр нападения в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "25cb5aef-09b5-4d25-9fc3-d34f588336de:knight-centura",
      "kind": "ability",
      "name": "Knight‑Centura: Seeker’s Instincts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-centura"
      },
      "hash": "730e269a",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "4ee57f39-b0f9-4ab2-af5f-a3c38a6ae5bb:sagittarum-custodians-sodality",
      "kind": "ability",
      "name": "Sagittarum Custodians Sodality: Disintegration Beams (Once per battle, per unit)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sagittarum-custodians-sodality"
      },
      "hash": "2c9d7da7",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "the Shooting phase this unit uses Disintegration Beams (once per battle)",
            "ru": "фаза стрельбы, в которой отряд применяет Disintegration Beams (раз за битву)"
          },
          "once": {
            "per": "unit",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "89e9ee78-eb8d-4f75-bcd4-6d04d62dae70:sagittarum-custodians-sodality",
      "kind": "ability",
      "name": "Sagittarum Custodians Sodality: Saturation Volleys",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sagittarum-custodians-sodality"
      },
      "hash": "75d53950",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "dfdb4fda-d06b-4f00-866e-f6df2056bc84:sentinel-guard-sodality",
      "kind": "ability",
      "name": "Sentinel Guard Sodality: Stand Vigil",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sentinel-guard-sodality"
      },
      "hash": "f7353808",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: non-MONSTER/VEHICLE",
          "when": {
            "en": "while this unit or its target is within range of an objective",
            "ru": "пока этот отряд или его цель в пределах досягаемости цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f0813b43-8116-4957-ae96-3d79861470dd:telemon-heavy-dreadnought",
      "kind": "ability",
      "name": "Telemon Heavy Dreadnought: Guardian Eternal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "telemon-heavy-dreadnought"
      },
      "hash": "3f3f072b",
      "ver": 981,
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
      "sid": "d7fdc4ea-b7ef-4a40-8372-ae02277b7106:trajann-valoris",
      "kind": "ability",
      "name": "Trajann Valoris: Moment Shackle (Once per battle, per army)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "trajann-valoris"
      },
      "hash": "2578991a",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": {
            "en": "the phase Moment Shackle is used for the axe (once per battle)",
            "ru": "фаза, в которую Moment Shackle применён к топору (раз за битву)"
          },
          "only": {
            "name": "Watcher’s Axe"
          },
          "cond": [
            "shackle-axe"
          ],
          "once": {
            "per": "army",
            "dur": "phase"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "the phase Moment Shackle is used for the save (once per battle)",
            "ru": "фаза, в которую Moment Shackle применён к защите (раз за битву)"
          },
          "cond": [
            "shackle-save"
          ],
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "2c8047b6-0011-4399-87cc-cb528d391f12:valerian",
      "kind": "ability",
      "name": "Valerian: Golden Laurels",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "valerian"
      },
      "hash": "e441fc1c",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "incoming",
          "stat": "ap",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "fce8fed1-4e0d-4409-8e23-8903ba150887:vertus-praetors",
      "kind": "ability",
      "name": "Vertus Praetors: Quicksilver Execution",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vertus-praetors"
      },
      "hash": "c4289f8f",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "if this unit made a Charge move this turn",
            "ru": "если отряд совершил манёвр нападения в этом ходу"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "bac9fd53-e34c-47f9-890f-06efaa7083bf:vigilator-squad",
      "kind": "ability",
      "name": "Vigilator Squad: Deft Parry",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vigilator-squad"
      },
      "hash": "07125726",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "vs": "melee",
          "when": null
        }
      ]
    },
    {
      "sid": "5bdd85ce-39ff-4db1-bcf1-447dde768cf6",
      "kind": "armyRule",
      "name": "Aegis of the Emperor",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "22b2feaf",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds)",
          "when": null
        }
      ]
    },
    {
      "sid": "aa8773ce-6d54-40cb-a3a1-6880fa689b54",
      "kind": "armyRule",
      "name": "Daughters of the Abyss",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "2d5f7cc0",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 3+ (vs psychic attacks)",
          "when": null,
          "scope": 0
        }
      ]
    },
    {
      "sid": "cde884b9-4635-4974-a931-f33162d53c3c",
      "kind": "armyRule",
      "name": "Martial Ka’tah",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "175e9f73",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: MONSTER/VEHICLE",
          "when": {
            "en": "while this unit uses the Rendax ka’tah ability",
            "ru": "пока отряд использует ka’tah Rendax"
          },
          "cond": [
            "stance-rendax"
          ]
        }
      ]
    },
    {
      "sid": "261bb75d-485c-454c-abe5-d412d1d21093",
      "kind": "detachmentRule",
      "name": "Gilded Guardians",
      "det": "Aquilan Shield",
      "ref": {
        "kind": "detachmentRule",
        "det": "aquilan-shield"
      },
      "hash": "d748a69f",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": {
            "en": "while this unit uses Salvus (Favoured Ka’tah)",
            "ru": "пока отряд использует Salvus (Favoured Ka’tah)"
          },
          "cond": [
            "stance-salvus"
          ]
        },
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "ranged",
          "when": {
            "en": "while within range of an objective, against attacks with S greater than its T",
            "ru": "пока отряд в зоне objective, против атак с S выше его T"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f8a06ddb-f51c-4810-91e6-27c38b63919d",
      "kind": "detachmentRule",
      "name": "Indomitable Avatars",
      "det": "Aquilan Wing",
      "ref": {
        "kind": "detachmentRule",
        "det": "cp:adeptus-custodes-aquilan-wing"
      },
      "hash": "9e470f45",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the unit selected in your Command phase",
            "ru": "отряд, выбранный в вашей фазе командования"
          },
          "cond": [
            "unit-selected-command-phase"
          ]
        }
      ]
    },
    {
      "sid": "82414467-90e4-4b4f-a419-631f1ec70fd3",
      "kind": "detachmentRule",
      "name": "Assemblage of Might",
      "det": "Auric Champions",
      "ref": {
        "kind": "detachmentRule",
        "det": "auric-champions"
      },
      "hash": "85f8d3dd",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against the dreadful foe unit",
            "ru": "против отряда dreadful foe"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5ec5c950-61d7-4085-b3ba-77c2625887a6",
      "kind": "detachmentRule",
      "name": "Heralds of the Throne",
      "det": "Emissaries Imperatus",
      "ref": {
        "kind": "detachmentRule",
        "det": "emissaries-imperatus"
      },
      "hash": "d4116716",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        }
      ]
    },
    {
      "sid": "c454c656-46ee-43d1-820d-330b548a84eb",
      "kind": "detachmentRule",
      "name": "Flare Shields",
      "det": "Grav‑Assault Force",
      "ref": {
        "kind": "detachmentRule",
        "det": "grav-assault-force"
      },
      "hash": "49a53ed0",
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
          ]
        }
      ]
    },
    {
      "sid": "fd5ae554-3112-4712-af1a-f41eaaab7f8c",
      "kind": "detachmentRule",
      "name": "Martial Mastery",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "detachmentRule",
        "det": "guardians-of-the-throne"
      },
      "hash": "44d75ac3",
      "ver": 995,
      "reviewed": true,
      "effects": [
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
            "mastery-sustained"
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
            "mastery-lethal"
          ]
        }
      ]
    },
    {
      "sid": "81eba024-15c3-48e9-b17f-ad5b5bafbca4",
      "kind": "detachmentRule",
      "name": "Moritoi Ancients",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "detachmentRule",
        "det": "might-of-the-moritoi"
      },
      "hash": "0e9c0397",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this unit is at its Starting Strength",
            "ru": "пока отряд в начальной численности"
          },
          "cond": [
            "unit-at-starting-strength"
          ]
        }
      ]
    },
    {
      "sid": "0f95518d-fc22-4034-800a-70b3dc9d987b",
      "kind": "detachmentRule",
      "name": "Silent Sisterhood",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "detachmentRule",
        "det": "null-maiden-vigil"
      },
      "hash": "8ab66126",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": null,
          "scope": 1
        }
      ]
    },
    {
      "sid": "8bdacccb-b14c-41c9-825e-ec6bad410766",
      "kind": "detachmentRule",
      "name": "Wardens of the Dark Cells",
      "det": "Shadowkeepers",
      "ref": {
        "kind": "detachmentRule",
        "det": "shadowkeepers"
      },
      "hash": "d2050fdb",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "wound",
          "op": "add",
          "value": -1,
          "vs": "melee",
          "when": {
            "en": "while within range of an objective, against attacks with S greater than its T",
            "ru": "пока отряд в зоне objective, против атак с S выше его T"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "7223f817-3bb5-4fc2-810e-f77ac79c5326",
      "kind": "detachmentRule",
      "name": "Talon Sortie",
      "det": "Solar Watch",
      "ref": {
        "kind": "detachmentRule",
        "det": "solar-watch"
      },
      "hash": "d0ef5cff",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this unit uses Calistus (Favoured Ka’tah)",
            "ru": "пока отряд использует Calistus (Favoured Ka’tah)"
          },
          "cond": [
            "stance-calistus"
          ]
        }
      ]
    },
    {
      "sid": "ece1600e-3c55-4899-a2c4-6ab52c44ce82",
      "kind": "enhancement",
      "name": "Not a Shell Wasted",
      "det": "Aquilan Shield",
      "ref": {
        "kind": "enhancement",
        "det": "aquilan-shield"
      },
      "hash": "af767b0b",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "083b154e-84ea-46c8-afb1-b9dea87bdf95",
      "kind": "enhancement",
      "name": "Coronal Plate",
      "det": "Aquilan Talon",
      "ref": {
        "kind": "enhancement",
        "det": "cp:adeptus-custodes-aquilan-talon"
      },
      "hash": "ed21e90d",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Lone Operative 15\"",
          "when": null
        }
      ]
    },
    {
      "sid": "f2af1bc2-5c5e-45d8-9534-599e2c9a1ce4",
      "kind": "enhancement",
      "name": "Goldenwrath (Upgrade)",
      "det": "Aquilan Talon",
      "ref": {
        "kind": "enhancement",
        "det": "cp:adeptus-custodes-aquilan-talon"
      },
      "hash": "886c66e5",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "CLOSE-QUARTERS",
          "when": null,
          "only": {
            "name": "Lastrum Storm Bolter"
          },
          "target": "unit"
        }
      ]
    },
    {
      "sid": "319e3c29-25ab-4e8e-b1e5-27c88f92c0c8",
      "kind": "enhancement",
      "name": "Eagle’s Pinions (Upgrade)",
      "det": "Aquilan Wing",
      "ref": {
        "kind": "enhancement",
        "det": "cp:adeptus-custodes-aquilan-wing"
      },
      "hash": "8af48891",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Hover",
          "when": null,
          "target": "unit"
        }
      ]
    },
    {
      "sid": "48853704-6da1-4fa1-838b-83d65d9da2d4",
      "kind": "enhancement",
      "name": "Shroud of the Hidden Blade",
      "det": "Auric Champions",
      "ref": {
        "kind": "enhancement",
        "det": "auric-champions"
      },
      "hash": "9663838b",
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
          "value": "Lone Operative",
          "when": null
        }
      ]
    },
    {
      "sid": "c2715bef-2809-4c52-9d9a-404c220d1f06",
      "kind": "enhancement",
      "name": "Auric Exemplar",
      "det": "Dread Host",
      "ref": {
        "kind": "enhancement",
        "det": "dread-host"
      },
      "hash": "22bdeb8f",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "when": null
        }
      ]
    },
    {
      "sid": "f5c8e89b-96ed-4afb-a921-a2767c23f562",
      "kind": "enhancement",
      "name": "Flawless Bladework",
      "det": "Dread Host",
      "ref": {
        "kind": "enhancement",
        "det": "dread-host"
      },
      "hash": "491d509f",
      "ver": 981,
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
      "sid": "fc70e8a4-8790-4c03-b202-6d599439b0b1",
      "kind": "enhancement",
      "name": "From the Hall of Armouries",
      "det": "Emperor’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "emperors-chosen"
      },
      "hash": "79e265ad",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null
        }
      ]
    },
    {
      "sid": "b03df237-9f84-48d0-8c7a-68b3d9b27940",
      "kind": "enhancement",
      "name": "Radiant Mantle",
      "det": "Emperor’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "emperors-chosen"
      },
      "hash": "4f6b2be2",
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
      "sid": "00ed9505-8ef9-4746-bb1e-39113d6e8a4a",
      "kind": "enhancement",
      "name": "Bane of Abominations",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "enhancement",
        "det": "guardians-of-the-throne"
      },
      "hash": "e7d8407e",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a CHARACTER, MONSTER or VEHICLE unit",
            "ru": "против отряда CHARACTER, MONSTER или VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "cf08ff55-fbe1-41a0-a0c6-6d948037ed6a",
      "kind": "enhancement",
      "name": "Eagle’s Eye",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "enhancement",
        "det": "guardians-of-the-throne"
      },
      "hash": "d9cea4a5",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "when attacks are allocated to this model and it uses this ability (once per battle)",
            "ru": "когда атаки распределены на эту модель и она применяет эту способность (раз за битву)"
          },
          "once": {
            "per": "army",
            "dur": "phase"
          }
        }
      ]
    },
    {
      "sid": "cd2d3308-23d6-4cd4-b9f5-0fba566566c0",
      "kind": "enhancement",
      "name": "Augury Uplink (one per army) (Upgrade)",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "enhancement",
        "det": "might-of-the-moritoi"
      },
      "hash": "27411cad",
      "ver": 981,
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
      "sid": "9fa885d0-2aab-4f90-b518-059a8b8e2793",
      "kind": "enhancement",
      "name": "Memento Moritoi (one per army) (Upgrade)",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "enhancement",
        "det": "might-of-the-moritoi"
      },
      "hash": "01aac280",
      "ver": 981,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "14fd7119-a08e-47c2-b7b7-cf727d909e42",
      "kind": "enhancement",
      "name": "Oblivion Knight",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      },
      "hash": "0bce4711",
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
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "also, against a PSYKER or Battle-shocked unit",
            "ru": "также против отряда PSYKER или в Battle-shock"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "also, against a PSYKER or Battle-shocked unit",
            "ru": "также против отряда PSYKER или в Battle-shock"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "b9ed1806-197f-42d9-bff9-f6ca83c0b473",
      "kind": "enhancement",
      "name": "Genalchemic Warding",
      "det": "Shadowkeepers",
      "ref": {
        "kind": "enhancement",
        "det": "shadowkeepers"
      },
      "hash": "8d7d56a1",
      "ver": 981,
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
      "sid": "d5c2b647-f97c-46d0-9770-3688e5c169de",
      "kind": "stratagem",
      "name": "Tip of the Talon",
      "det": "Aquilan Shield",
      "ref": {
        "kind": "stratagem",
        "det": "aquilan-shield",
        "name": "Tip of the Talon"
      },
      "hash": "6181b685",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a target within 9\"",
            "ru": "против цели в пределах 9\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "fd464e11-4a44-4b18-980e-c13981659865",
      "kind": "stratagem",
      "name": "Unstoppable Champion",
      "det": "Aquilan Talon",
      "ref": {
        "kind": "stratagem",
        "det": "cp:adeptus-custodes-aquilan-talon",
        "name": "Unstoppable Champion"
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
      "sid": "7efedbb1-34fe-437a-b28a-c7661a1c6bf3",
      "kind": "stratagem",
      "name": "Golden Light of the Moiraides",
      "det": "Dread Host",
      "ref": {
        "kind": "stratagem",
        "det": "dread-host",
        "name": "Golden Light of the Moiraides"
      },
      "hash": "8f2279fc",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "incoming",
          "stat": "hit",
          "op": "add",
          "value": -1,
          "when": null
        }
      ],
      "dur": "round"
    },
    {
      "sid": "bda17696-cc1a-4687-b0aa-51020af18e64",
      "kind": "stratagem",
      "name": "Slayers of Nightmares",
      "det": "Emissaries Imperatus",
      "ref": {
        "kind": "stratagem",
        "det": "emissaries-imperatus",
        "name": "Slayers of Nightmares"
      },
      "hash": "40c78593",
      "ver": 995,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "wound",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against a unit with a higher T",
            "ru": "против отряда с большей T"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "409957e9-4bc7-48a5-96f6-8943e545ac7c",
      "kind": "stratagem",
      "name": "In Auramite clad",
      "det": "Emperor’s Chosen",
      "ref": {
        "kind": "stratagem",
        "det": "emperors-chosen",
        "name": "In Auramite clad"
      },
      "hash": "9e50d86d",
      "ver": 981,
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
      "sid": "955e9d60-fd3b-410f-a0bd-d3d7ee97cb1b",
      "kind": "stratagem",
      "name": "Advanced Stabilisers",
      "det": "Grav‑Assault Force",
      "ref": {
        "kind": "stratagem",
        "det": "grav-assault-force",
        "name": "Advanced Stabilisers"
      },
      "hash": "76382f0c",
      "ver": 981,
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
      "dur": "phase"
    },
    {
      "sid": "86b60c6f-8343-4696-8636-2d0f57734366",
      "kind": "stratagem",
      "name": "In Auramite clad",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "stratagem",
        "det": "guardians-of-the-throne",
        "name": "In Auramite clad"
      },
      "hash": "9e50d86d",
      "ver": 981,
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
      "sid": "2c35eab3-567c-4672-a8ba-924060f1e46f",
      "kind": "stratagem",
      "name": "Shield of Honour",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "stratagem",
        "det": "guardians-of-the-throne",
        "name": "Shield of Honour"
      },
      "hash": "5662a22a",
      "ver": 995,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "89346c89-ccf5-4462-ba1b-00b7ec639229",
      "kind": "stratagem",
      "name": "Unlimited Endurance",
      "det": "Guardians of the Throne",
      "ref": {
        "kind": "stratagem",
        "det": "guardians-of-the-throne",
        "name": "Unlimited Endurance"
      },
      "hash": "f0663ccc",
      "ver": 981,
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
      "sid": "9331e696-bcd6-47ba-bfa9-492210e7971c",
      "kind": "stratagem",
      "name": "Avenge the Fallen",
      "det": "Honoured Companions",
      "ref": {
        "kind": "stratagem",
        "det": "honoured-companions",
        "name": "Avenge the Fallen"
      },
      "hash": "04b75a2b",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force (not CHARACTER models)",
            "ru": "пока действует стратагема (кроме моделей CHARACTER)"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "75e82547-fa7d-4842-b04e-42f546961095",
      "kind": "stratagem",
      "name": "Vigil Unending",
      "det": "Lions of the Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "lions-of-the-emperor",
        "name": "Vigil Unending"
      },
      "hash": "9c6e19d7",
      "ver": 981,
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
      "sid": "7ed4a00b-04a6-446f-85e4-8bc70cef5eb0",
      "kind": "stratagem",
      "name": "Unceasing Onslaught",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "stratagem",
        "det": "might-of-the-moritoi",
        "name": "Unceasing Onslaught"
      },
      "hash": "d3c295f4",
      "ver": 981,
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
      "sid": "cfabe86c-1933-427d-9c8d-1110e2c2f94d",
      "kind": "stratagem",
      "name": "Unstoppable momentum",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "stratagem",
        "det": "might-of-the-moritoi",
        "name": "Unstoppable momentum"
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
      "sid": "0094c9e7-8c97-427f-abd4-2955745ca1d1",
      "kind": "stratagem",
      "name": "Anathema Blademastery",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "stratagem",
        "det": "null-maiden-vigil",
        "name": "Anathema Blademastery"
      },
      "hash": "d788dec9",
      "ver": 995,
      "reviewed": true,
      "effects": [
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
            "blademastery-sustained"
          ]
        },
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
            "blademastery-lethal"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "766c8e58-761c-4712-923d-ca5dba526af0",
      "kind": "stratagem",
      "name": "Psy‑chaff Volley",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "stratagem",
        "det": "null-maiden-vigil",
        "name": "Psy‑chaff Volley"
      },
      "hash": "9a90d567",
      "ver": 981,
      "reviewed": true,
      "effects": [],
      "dur": "turn"
    },
    {
      "sid": "8d32b886-8cd7-4854-a771-92f80925a238",
      "kind": "stratagem",
      "name": "Purgation Sweep",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "stratagem",
        "det": "null-maiden-vigil",
        "name": "Purgation Sweep"
      },
      "hash": "cdea513c",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          },
          "only": {
            "tag": "TORRENT"
          }
        },
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against a PSYKER or Battle-shocked target, instead",
            "ru": "против цели PSYKER или Battle-shocked, вместо этого"
          },
          "only": {
            "tag": "TORRENT"
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
      "sid": "76293e5f-efe0-4ed0-954d-fcedb22124eb",
      "kind": "stratagem",
      "name": "Grim Responsibility",
      "det": "Shadowkeepers",
      "ref": {
        "kind": "stratagem",
        "det": "shadowkeepers",
        "name": "Grim Responsibility"
      },
      "hash": "20cafdc2",
      "ver": 981,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS: CHARACTER/MONSTER",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "fa0bd347-ef98-451a-ba79-aa7e8b139837",
      "kind": "stratagem",
      "name": "Indomitable Guardians",
      "det": "Shadowkeepers",
      "ref": {
        "kind": "stratagem",
        "det": "shadowkeepers",
        "name": "Indomitable Guardians"
      },
      "hash": "ae48cff3",
      "ver": 981,
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
      "sid": "c4b60961-67ad-4237-8dbc-2e3641dadadb",
      "kind": "stratagem",
      "name": "Never Outmatched",
      "det": "Tristraen’s Gilded Blades",
      "ref": {
        "kind": "stratagem",
        "det": "cp:adeptus-custodes",
        "name": "Never Outmatched"
      },
      "hash": "83e4f304",
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
      "dur": "phase"
    },
    {
      "sid": "cfcf1648-58f3-4e72-b091-8f7f5656f95a:allarus-custodians",
      "kind": "wargear",
      "name": "Allarus Custodians: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "allarus-custodians",
        "item": "vexilla"
      },
      "hash": "93741a91",
      "ver": 981,
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
      "sid": "cfcf1648-58f3-4e72-b091-8f7f5656f95a:aquilan-wing-sentinel-guard-sodality",
      "kind": "wargear",
      "name": "Aquilan Wing Sentinel Guard Sodality: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "aquilan-wing-sentinel-guard-sodality",
        "item": "vexilla"
      },
      "hash": "93741a91",
      "ver": 981,
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
      "sid": "cfcf1648-58f3-4e72-b091-8f7f5656f95a:custodian-guard-sodality",
      "kind": "wargear",
      "name": "Custodian Guard Sodality: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "custodian-guard-sodality",
        "item": "vexilla"
      },
      "hash": "93741a91",
      "ver": 981,
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
      "sid": "cfcf1648-58f3-4e72-b091-8f7f5656f95a:custodian-wardens",
      "kind": "wargear",
      "name": "Custodian Wardens: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "custodian-wardens",
        "item": "vexilla"
      },
      "hash": "93741a91",
      "ver": 981,
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
      "sid": "bb155c10-9ce7-495e-9e1f-22970e181d82:gilded-blades-custodian-guard",
      "kind": "wargear",
      "name": "Gilded Blades Custodian Guard: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "gilded-blades-custodian-guard",
        "item": "praesidium shield"
      },
      "hash": "219c8b44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "w",
          "op": "add",
          "value": 1,
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
      "sid": "10ef4be6-f2a9-4cf6-99ea-0253a4ea7ae9:sentinel-guard-sodality",
      "kind": "wargear",
      "name": "Sentinel Guard Sodality: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sentinel-guard-sodality",
        "item": "praesidium shield"
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
      "sid": "cfcf1648-58f3-4e72-b091-8f7f5656f95a:sentinel-guard-sodality",
      "kind": "wargear",
      "name": "Sentinel Guard Sodality: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "sentinel-guard-sodality",
        "item": "vexilla"
      },
      "hash": "93741a91",
      "ver": 981,
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
      "sid": "ec7bef95-8487-440a-8142-0e96be0308d1:shield-captain",
      "kind": "wargear",
      "name": "Shield‑Captain: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "shield-captain",
        "item": "praesidium shield"
      },
      "hash": "6a70b7cf",
      "ver": 981,
      "reviewed": true,
      "effects": []
    }
  ]
}
