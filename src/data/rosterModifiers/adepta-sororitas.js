// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "adepta-sororitas",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "4337284e-a5f8-45e5-9fb3-cb8e1ea971c0:aestred-thurga-and-agathae-dolan",
      "kind": "ability",
      "name": "Aestred Thurga and Agathae Dolan: Auto-Tapestry of the Emperor’s Judgement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aestred-thurga-and-agathae-dolan"
      },
      "hash": "695968a3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "59ee1033-9a10-43cc-b972-674c1dc682dd:canoness-with-jump-pack",
      "kind": "ability",
      "name": "Canoness with Jump Pack: Divine Deliverance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "canoness-with-jump-pack"
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
      "sid": "c91f4d2b-d53c-4903-bf71-06ba14a3a2f2:canoness",
      "kind": "ability",
      "name": "Canoness: The Emperor’s Grace",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "canoness"
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
      "sid": "ff3354ba-da0e-4213-bf2c-0c903b528dba:castigator",
      "kind": "ability",
      "name": "Castigator: Rites of Castigation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "castigator"
      },
      "hash": "02ce559f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bf4ca9bb-ec32-4711-b960-33d77130ff4e:dogmata",
      "kind": "ability",
      "name": "Dogmata: Executioner of Heretics",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dogmata"
      },
      "hash": "9e236969",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "23f2caff-39c4-4699-b7da-4f6f0d661c05:dogmata",
      "kind": "ability",
      "name": "Dogmata: Unflinching Determination",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dogmata"
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
      "sid": "bd932220-f498-4fd0-9088-3bb81acdb45b:imagifier",
      "kind": "ability",
      "name": "Imagifier: Stanchion of Holy Martyrs",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "imagifier"
      },
      "hash": "752f4b85",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "2+",
          "when": null,
          "target": "led"
        },
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
      "sid": "12584d64-1474-48b2-b896-251c429ef437:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Righteous Smiting",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
      },
      "hash": "ff1c3e96",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3814e980-da68-4a95-b974-1ae6ff5c7542:ministorum-priest",
      "kind": "ability",
      "name": "Ministorum Priest: Zealot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ministorum-priest"
      },
      "hash": "0ff5db45",
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
          "stat": "s",
          "op": "add",
          "value": 3,
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
      "sid": "1bf65833-c151-4824-8c13-81ca2b562021:morvenn-vahl",
      "kind": "ability",
      "name": "Morvenn Vahl: Righteous Repugnance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "morvenn-vahl"
      },
      "hash": "5cec19e1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Fidelis"
          },
          "when": {
            "en": "while a Miracle die is discarded for this ability",
            "ru": "если сброшен Miracle die ради этой способности"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Lance of Illumination"
          },
          "when": {
            "en": "while a Miracle die is discarded for this ability",
            "ru": "если сброшен Miracle die ради этой способности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6436cabf-748e-46d7-9d34-88b1e49cbe52:palatine",
      "kind": "ability",
      "name": "Palatine: Fury of the Righteous",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "palatine"
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
      "sid": "f928b1b5-2736-4276-802b-3e1c8a4056c7:paragon-warsuits",
      "kind": "ability",
      "name": "Paragon Warsuits: Righteous Paragons",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "paragon-warsuits"
      },
      "hash": "d8db284c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d27d6336-58c1-4947-94d0-9a1eac927945:retributor-squad",
      "kind": "ability",
      "name": "Retributor Squad: Storm of Retribution",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "retributor-squad"
      },
      "hash": "0836610c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "125bc084-8a95-4395-88c0-b7e7dfc85e84:sanctifiers",
      "kind": "ability",
      "name": "Sanctifiers: Ministorum Sermon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sanctifiers"
      },
      "hash": "607413e5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while this unit contains a MINISTORUM PRIEST",
            "ru": "пока в отряде есть MINISTORUM PRIEST"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e4a88233-98e8-4c9c-9665-409491dfd63d:sanctuary-guardians-arco-flagellants",
      "kind": "ability",
      "name": "Sanctuary Guardians Arco-Flagellants: Extremis Trigger Word",
      "det": null,
      "ref": null,
      "hash": "371373d4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "6",
          "only": {
            "name": "Arco-flails"
          },
          "when": {
            "en": "while this ability is used",
            "ru": "пока способность использована"
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
      "sid": "cf5a5f6f-6690-416e-816e-f519b647adb8",
      "kind": "detachmentRule",
      "name": "Fervent Purgation",
      "det": "Bringers of Flame",
      "hash": "fb50d154",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per attack against a unit within 6\"",
            "ru": "за атаку по отряду в пределах 6\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "7c3dcef7-9883-4679-9de6-7289c696c901",
      "kind": "detachmentRule",
      "name": "Righteous Purpose",
      "det": "Champions of Faith",
      "hash": "dcda4edb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the unit is Righteous (selected in your Command phase)",
            "ru": "пока отряд Righteous (выбран в вашей фазе командования)"
          },
          "cond": [
            "unit-righteous"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the unit is Righteous (selected in your Command phase)",
            "ru": "пока отряд Righteous (выбран в вашей фазе командования)"
          },
          "cond": [
            "unit-righteous"
          ]
        },
        {
          "on": "weapon",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Battle Sisters Squad, Celestian Sacresants and Paragon Warsuits models only, while the unit is Righteous",
            "ru": "только модели Battle Sisters Squad, Celestian Sacresants и Paragon Warsuits, пока отряд Righteous"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Battle Sisters Squad, Celestian Sacresants and Paragon Warsuits models only, while the unit is Righteous",
            "ru": "только модели Battle Sisters Squad, Celestian Sacresants и Paragon Warsuits, пока отряд Righteous"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "champions-of-faith"
      }
    },
    {
      "sid": "de580a83-e1b2-4ddd-bd86-450d27e98f32",
      "kind": "detachmentRule",
      "name": "The Blood of Martyrs",
      "det": "Hallowed Martyrs",
      "hash": "7f2e37a7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "hallowed-martyrs"
      }
    },
    {
      "sid": "b37890cc-d1f6-460f-ae40-745b6a738e9d",
      "kind": "detachmentRule",
      "name": "Desperate For Redemption",
      "det": "Penitent Host",
      "hash": "4c323b64",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Penitent models, while the Path of the Penitent Vow is active",
            "ru": "модели Penitent, пока активен обет Path of the Penitent"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Penitent models, while Absolution in Battle is active and the unit made a Charge move",
            "ru": "модели Penitent, пока активен Absolution in Battle и отряд совершил чардж"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Penitent models, while Absolution in Battle is active and the unit made a Charge move",
            "ru": "модели Penitent, пока активен Absolution in Battle и отряд совершил чардж"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "penitent-host"
      }
    },
    {
      "sid": "a5824f3e-ae1b-4dc1-97eb-41a764d9f43f",
      "kind": "detachmentRule",
      "name": "Holy Quest",
      "det": "Sacred Champions",
      "ref": {
        "kind": "detachmentRule",
        "det": "sacred-champions"
      },
      "hash": "cfec14f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "602bada8-6b23-48ce-8887-3538496f1e10",
      "kind": "detachmentRule",
      "name": "Hymns of Battle",
      "det": "Sanctified Orators",
      "ref": {
        "kind": "detachmentRule",
        "det": "sanctified-orators"
      },
      "hash": "dde10020",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "1183f5f4-7242-46ba-80c1-2be89be8c9db",
      "kind": "enhancement",
      "name": "Blade of Saint Ellynor",
      "det": "Army of Faith",
      "hash": "2dc89a44",
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
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "army-of-faith"
      }
    },
    {
      "sid": "153f8261-4beb-4114-9a4a-f82ff261947e",
      "kind": "enhancement",
      "name": "Fire and Fury",
      "det": "Bringers of Flame",
      "hash": "2cec313b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Torrent weapons only, while the bearer is leading the unit",
            "ru": "только оружие Torrent, пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ],
          "only": {
            "tag": "TORRENT"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "c2118c7b-986c-47cb-b2f5-3c82d77dde0f",
      "kind": "enhancement",
      "name": "Righteous Rage",
      "det": "Bringers of Flame",
      "hash": "11498b83",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "per Miracle dice discarded when the bearer fights, up to 3",
            "ru": "за каждую сброшенную кость чуда при выборе носителя для боя, до 3"
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
            "en": "per Miracle dice discarded when the bearer fights, up to 3",
            "ru": "за каждую сброшенную кость чуда при выборе носителя для боя, до 3"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "bringers-of-flame"
      }
    },
    {
      "sid": "8d24ee09-38f8-4dc5-a0f8-d1d52fc927e3",
      "kind": "enhancement",
      "name": "Eyes of the Oracle",
      "det": "Champions of Faith",
      "ref": {
        "kind": "enhancement",
        "det": "champions-of-faith"
      },
      "hash": "c3dc24cf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ]
    },
    {
      "sid": "6d1771ba-9974-4593-aef1-ddcf25f7865c",
      "kind": "enhancement",
      "name": "Mark of Devotion",
      "det": "Champions of Faith",
      "hash": "db66fbb9",
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
          "value": 2,
          "when": {
            "en": "instead, plus +1 Damage, while the bearer's unit is Righteous",
            "ru": "вместо этого, плюс +1 к урону, пока отряд носителя Righteous"
          },
          "cond": [
            "unit-righteous"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "cond": [
            "unit-righteous"
          ],
          "when": {
            "en": "instead, plus +1 Damage, while the bearer's unit is Righteous",
            "ru": "вместо этого, плюс +1 к урону, пока отряд носителя Righteous"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "champions-of-faith"
      }
    },
    {
      "sid": "ae5538f8-1681-4fdd-9cdc-2605f8847aa6",
      "kind": "enhancement",
      "name": "Through Suffering, Strength",
      "det": "Hallowed Martyrs",
      "hash": "4c5bff2d",
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
          "stat": "d",
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
            "en": "Attacks, Strength and Damage +2 instead, if the bearer has lost one or more wounds",
            "ru": "атаки, сила и урон +2 вместо +1, если носитель потерял хотя бы одну рану"
          },
          "cond": [
            "unit-lost-wounds"
          ],
          "alt": 0
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "cond": [
            "unit-lost-wounds"
          ],
          "alt": 1,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, if the bearer has lost one or more wounds",
            "ru": "атаки, сила и урон +2 вместо +1, если носитель потерял хотя бы одну рану"
          }
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 2,
          "cond": [
            "unit-lost-wounds"
          ],
          "alt": 2,
          "when": {
            "en": "Attacks, Strength and Damage +2 instead, if the bearer has lost one or more wounds",
            "ru": "атаки, сила и урон +2 вместо +1, если носитель потерял хотя бы одну рану"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "hallowed-martyrs"
      }
    },
    {
      "sid": "ffc30956-bcf9-41db-9ecc-9b1837a30f89",
      "kind": "enhancement",
      "name": "Catechism of Divine Penitence",
      "det": "Penitent Host",
      "ref": {
        "kind": "enhancement",
        "det": "penitent-host"
      },
      "hash": "b1a29995",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Penitent",
          "when": null
        }
      ]
    },
    {
      "sid": "1f93ff0c-b24e-4da3-9911-8bcc1e169cbf",
      "kind": "enhancement",
      "name": "Refrain of Enduring Faith",
      "det": "Penitent Host",
      "hash": "734f607c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while the bearer is leading the unit",
            "ru": "пока носитель ведёт отряд"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "penitent-host"
      }
    },
    {
      "sid": "b025a522-241b-4585-a9d3-06d44400fb69",
      "kind": "enhancement",
      "name": "Perfervid Haste",
      "det": "Sacred Champions",
      "ref": {
        "kind": "enhancement",
        "det": "sacred-champions"
      },
      "hash": "9f034c7b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "0f265e7f-9e19-4caa-b1f3-42bcda062ef4",
      "kind": "enhancement",
      "name": "Writ of Compunction (Upgrade)",
      "det": "Sacred Champions",
      "ref": {
        "kind": "enhancement",
        "det": "sacred-champions"
      },
      "hash": "68eebc98",
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
      "sid": "36b50d74-e9ff-4420-9cba-2844461ec80c",
      "kind": "enhancement",
      "name": "Hagiomnifex (Upgrade)",
      "det": "Sanctified Orators",
      "ref": {
        "kind": "enhancement",
        "det": "sanctified-orators"
      },
      "hash": "1a58e00a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per turn, while the Catechism of Raging Fervour is the ability used",
            "ru": "раз в ход, пока выбрана способность Catechism of Raging Fervour"
          },
          "cond": [
            "hagio-catechism"
          ]
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "once per turn, while the Psalm of Righteous Smiting is the ability used",
            "ru": "раз в ход, пока выбрана способность Psalm of Righteous Smiting"
          },
          "cond": [
            "hagio-psalm"
          ]
        }
      ]
    },
    {
      "sid": "012d2dd8-e566-4c82-a8e9-932d34ecee04",
      "kind": "enhancement",
      "name": "Righteous Fervour",
      "det": "Sanctuary Guardians",
      "ref": null,
      "hash": "cee6d601",
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
      ]
    }
  ]
}
