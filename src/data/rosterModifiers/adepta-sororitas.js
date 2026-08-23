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
      "sid": "4cbc7c4a-861f-4681-ac63-c26c1b620a4f:arco-flagellants",
      "kind": "ability",
      "name": "Arco-flagellants: Extremis Trigger Word",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "arco-flagellants"
      },
      "hash": "74f242bc",
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
            "en": "while the trigger word is invoked",
            "ru": "пока произнесено trigger word"
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
            "name": "Arco-flails"
          },
          "when": {
            "en": "while the trigger word is invoked",
            "ru": "пока произнесено trigger word"
          },
          "cond": [
            "never"
          ]
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
      "sid": "7d97856b-0bd3-4e08-bd78-094d7f56b9d0:triumph-of-saint-katherine",
      "kind": "ability",
      "name": "Triumph of Saint Katherine: Petals of the Bloody Rose (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "triumph-of-saint-katherine",
        "scopes": [
          {
            "targets": [
              "ADEPTA SORORITAS"
            ],
            "excludes": []
          }
        ],
        "set": "Relics of the Matriarchs"
      },
      "hash": "5afb3513",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "cond": [
            "relic-petals-bloody-rose"
          ]
        }
      ]
    },
    {
      "sid": "7d867253-6b26-46a4-ad71-995d88487c37:triumph-of-saint-katherine",
      "kind": "ability",
      "name": "Triumph of Saint Katherine: The Fiery Heart (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "triumph-of-saint-katherine",
        "scopes": [
          {
            "targets": [
              "ADEPTA SORORITAS"
            ],
            "excludes": []
          }
        ],
        "set": "Relics of the Matriarchs"
      },
      "hash": "d6cc8a90",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "cond": [
            "relic-fiery-heart"
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
      "sid": "9304d111-c730-4ba5-bfd6-2224695f9026",
      "kind": "enhancement",
      "name": "Iron Surplice of Saint Istalela",
      "det": "Bringers of Flame",
      "ref": {
        "kind": "enhancement",
        "det": "bringers-of-flame"
      },
      "hash": "9b6522ef",
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
    },
    {
      "sid": "ee842df1-f44d-45b9-9f16-e1ec47871c8f",
      "kind": "stratagem",
      "name": "Divine Guidance",
      "det": "Army of Faith",
      "ref": {
        "kind": "stratagem",
        "det": "army-of-faith",
        "name": "Divine Guidance"
      },
      "hash": "5be0535d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
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
      "sid": "76636826-a2ee-46f2-8a54-106731e6ebc8",
      "kind": "stratagem",
      "name": "Faith and Fury",
      "det": "Army of Faith",
      "ref": {
        "kind": "stratagem",
        "det": "army-of-faith",
        "name": "Faith and Fury"
      },
      "hash": "1bd9021b",
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
      "sid": "9535f9df-440a-42ed-8ce1-fc2b3b3e2e2a",
      "kind": "stratagem",
      "name": "Light of the Emperor",
      "det": "Army of Faith",
      "ref": {
        "kind": "stratagem",
        "det": "army-of-faith",
        "name": "Light of the Emperor"
      },
      "hash": "380fcfb6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "edf56ccf-046e-4f5c-ae39-7ebc3d61d85b",
      "kind": "stratagem",
      "name": "Cleansing Flames",
      "det": "Bringers of Flame",
      "ref": {
        "kind": "stratagem",
        "det": "bringers-of-flame",
        "name": "Cleansing Flames"
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
      "sid": "07a13a5c-5ad0-4a41-ab8c-af3a0b6207d4",
      "kind": "stratagem",
      "name": "Righteous Blows",
      "det": "Bringers of Flame",
      "ref": {
        "kind": "stratagem",
        "det": "bringers-of-flame",
        "name": "Righteous Blows"
      },
      "hash": "31322c63",
      "ver": 925,
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
      "sid": "a1cd7972-52b6-447f-9bf3-f0eb542b0401",
      "kind": "stratagem",
      "name": "Rites of Fire",
      "det": "Bringers of Flame",
      "ref": {
        "kind": "stratagem",
        "det": "bringers-of-flame",
        "name": "Rites of Fire"
      },
      "hash": "9b09a897",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4fe78d2e-a1d9-417b-8ff4-2e50ba6065bb",
      "kind": "stratagem",
      "name": "Shield of Aversion",
      "det": "Bringers of Flame",
      "ref": {
        "kind": "stratagem",
        "det": "bringers-of-flame",
        "name": "Shield of Aversion"
      },
      "hash": "068f028a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "233adae4-81a7-4967-af0c-8b819f453d70",
      "kind": "stratagem",
      "name": "To The Heart Of Heresy",
      "det": "Champions of Faith",
      "ref": {
        "kind": "stratagem",
        "det": "champions-of-faith",
        "name": "To The Heart Of Heresy"
      },
      "hash": "4efb0a8b",
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
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "also, while the unit is Righteous",
            "ru": "и ещё, пока отряд Righteous"
          },
          "cond": [
            "unit-righteous"
          ]
        }
      ],
      "dur": "turn"
    },
    {
      "sid": "32eebb7c-25ad-4030-88b3-6edfcf6ad3eb",
      "kind": "stratagem",
      "name": "Devastating Reprise",
      "det": "Chorus of Condemnation",
      "ref": {
        "kind": "stratagem",
        "det": "chorus-of-condemnation",
        "name": "Devastating Reprise"
      },
      "hash": "114626cc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against the enemy unit this stratagem named",
            "ru": "против юнита, названного стратагемой"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "cf743f7c-6df2-40ea-96f7-cdb0de92947e",
      "kind": "stratagem",
      "name": "Boundless Zeal",
      "det": "Penitent Host",
      "ref": {
        "kind": "stratagem",
        "det": "penitent-host",
        "name": "Boundless Zeal"
      },
      "hash": "83e5bff6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d69e5d7f-ef9c-4822-b6fc-b3b5ba87eb7a",
      "kind": "stratagem",
      "name": "Lash of Guilt",
      "det": "Penitent Host",
      "ref": {
        "kind": "stratagem",
        "det": "penitent-host",
        "name": "Lash of Guilt"
      },
      "hash": "99b5dc08",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "for a PENITENT ENGINES unit, instead of an Advance roll",
            "ru": "для отряда PENITENT ENGINES, вместо броска Advance"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "6e89c116-3112-44b8-ac3b-74181a382434",
      "kind": "stratagem",
      "name": "Sanctified Blows",
      "det": "Sacred Champions",
      "ref": {
        "kind": "stratagem",
        "det": "sacred-champions",
        "name": "Sanctified Blows"
      },
      "hash": "7a8873d6",
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
        },
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
      "sid": "941baf14-ed21-4f5c-a3b3-74d91db967b9",
      "kind": "stratagem",
      "name": "Unflinching Determination",
      "det": "Sacred Champions",
      "ref": {
        "kind": "stratagem",
        "det": "sacred-champions",
        "name": "Unflinching Determination"
      },
      "hash": "0ffdaff4",
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
      "sid": "dff7be98-fabd-4de4-bdcc-fe507d46a527",
      "kind": "stratagem",
      "name": "Fires of Damnation",
      "det": "Sanctuary Guardians",
      "ref": null,
      "hash": "1b3fca96",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "set",
          "value": "6",
          "only": {
            "tag": "TORRENT"
          },
          "when": {
            "en": "Torrent weapons, while this stratagem is in force",
            "ru": "Torrent-оружие, пока действует стратагема"
          }
        },
        {
          "on": "weapon",
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
      "sid": "fb07a984-f0d8-42d6-b044-08298622c911:mortifiers",
      "kind": "wargear",
      "name": "Mortifiers: Anchorite Sarcophagus",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "mortifiers",
        "item": "anchorite sarcophagus"
      },
      "hash": "607eb6f3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "7\"",
          "when": null
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "3+",
          "when": null
        }
      ]
    }
  ]
}
