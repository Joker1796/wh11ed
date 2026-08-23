// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "adeptus-mechanicus",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "06c4375b-ee7a-4552-a5d0-2a55dcd6acdb:archaeopter-stratoraptor",
      "kind": "ability",
      "name": "Archaeopter Stratoraptor: Strafing Run",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "archaeopter-stratoraptor"
      },
      "hash": "1c8c1f3a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0c6ffd3b-58d1-45db-9f61-c342ddc58ba0:belisarius-cawl",
      "kind": "ability",
      "name": "Belisarius Cawl: Mantra of Discipline",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "belisarius-cawl",
        "scopes": [
          {
            "targets": [
              "ADEPTUS MECHANICUS"
            ],
            "excludes": []
          }
        ],
        "set": "Canticles of the Omnissiah"
      },
      "hash": "2093ec8e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Battleline",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "cond": [
            "canticle-mantra-of-discipline"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": {
            "en": "while this ability is the one selected",
            "ru": "пока выбрана эта способность"
          },
          "cond": [
            "canticle-mantra-of-discipline"
          ]
        }
      ]
    },
    {
      "sid": "1aca726c-3b92-4965-a0f2-97b3228ed49d:cybernetica-datasmith",
      "kind": "ability",
      "name": "Cybernetica Datasmith: Battle Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cybernetica-datasmith"
      },
      "hash": "07a9dad8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while that unit is in Protector Protocol",
            "ru": "пока отряд в Protector Protocol"
          },
          "cond": [
            "protocol-protector"
          ],
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while that unit is in Conqueror Protocol",
            "ru": "пока отряд в Conqueror Protocol"
          },
          "cond": [
            "protocol-conqueror"
          ],
          "target": "led"
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while that unit is in Aegis Protocol",
            "ru": "пока отряд в Aegis Protocol"
          },
          "cond": [
            "protocol-aegis"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "34fc460d-17ad-4f87-a136-41f4d23a76ab:onager-dunecrawler",
      "kind": "ability",
      "name": "Onager Dunecrawler: Emanatus Force Field",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "onager-dunecrawler",
        "scopes": [
          {
            "targets": [
              "ADEPTUS MECHANICUS BATTLELINE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "72821a2b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "24abbe34-307d-4463-b783-01985d23f7d7:purge-corps-serberys-sulphurhounds",
      "kind": "ability",
      "name": "Purge Corps Serberys Sulphurhounds: Pinning Fire",
      "det": null,
      "ref": null,
      "hash": "8cd8ce87",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f5ef9cfa-b388-47b1-8c7a-c985d104ec26:purge-corps-skitarii-vanguard",
      "kind": "ability",
      "name": "Purge Corps Skitarii Vanguard: Omnispex",
      "det": null,
      "ref": null,
      "hash": "7edac6d1",
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
      "sid": "5fd37be5-22d0-41d2-afa5-f5c0c9a92000:purge-corps-skitarii-vanguard",
      "kind": "ability",
      "name": "Purge Corps Skitarii Vanguard: Rad-saturation (Aura)",
      "det": null,
      "ref": null,
      "hash": "618490ed",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c54d3765-7205-4c3b-aa8d-adae50dde22d:sicarian-ruststalkers",
      "kind": "ability",
      "name": "Sicarian Ruststalkers: Optimised Gait",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sicarian-ruststalkers"
      },
      "hash": "3cf67aea",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "336210fa-5416-435b-8a30-8f000a820c90:skitarii-vanguard",
      "kind": "ability",
      "name": "Skitarii Vanguard: Rad-saturation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skitarii-vanguard"
      },
      "hash": "cbd7fe7d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c11347bd-b4dc-4660-a049-bb4618070032:skorpius-disintegrator",
      "kind": "ability",
      "name": "Skorpius Disintegrator: Blistering Salvoes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skorpius-disintegrator"
      },
      "hash": "7da6aee4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2b590878-2876-48cf-acfd-eae26ed398ef:tech-priest-dominus",
      "kind": "ability",
      "name": "Tech-Priest Dominus: Lord of the Machine Cult",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-dominus"
      },
      "hash": "9af7334b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1e0b085e-afa3-45ef-91ac-7da966bed7d9:tech-priest-enginseer",
      "kind": "ability",
      "name": "Tech-Priest Enginseer: Vengeance for the Omnissiah",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-enginseer",
        "scopes": [
          {
            "targets": [
              "ADEPTUS MECHANICUS VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "bacbdb9e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "6",
          "only": {
            "name": "Omnissian axe"
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
      "sid": "4bc24a5b-2219-483b-8e94-c2c92e8515f4:tech-priest-manipulus",
      "kind": "ability",
      "name": "Tech-Priest Manipulus: Defend the Divine Work",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-manipulus"
      },
      "hash": "fe0d06ce",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "once per battle, while this ability is used",
            "ru": "раз за битву, пока способность использована"
          },
          "cond": [
            "never"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "f0ee762e-c490-43f8-b16b-5bf6aa56b1ea:tech-priest-manipulus",
      "kind": "ability",
      "name": "Tech-Priest Manipulus: Galvanic Field",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "tech-priest-manipulus"
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
      "sid": "d06c940f-819a-4e2c-a905-352a9a633fad:technoarcheologist",
      "kind": "ability",
      "name": "Technoarcheologist: Seekers of Divine Arcana",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "technoarcheologist"
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
      "sid": "53a34500-653b-4767-ac3b-c23a2c84c383",
      "kind": "armyRule",
      "name": "Doctrina Imperatives",
      "det": null,
      "hash": "5658f6b2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Protector Imperative is active for your army",
            "ru": "пока для армии активен Protector Imperative"
          },
          "cond": [
            "imperative-protector"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "while the Conqueror Imperative is active for your army",
            "ru": "пока для армии активен Conqueror Imperative"
          },
          "cond": [
            "imperative-conqueror"
          ]
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack under the Conqueror Imperative, if the unit is Battleline or within 6\" of a friendly Battleline unit",
            "ru": "за атаку при Conqueror Imperative, если отряд Battleline или в 6\" от дружественного отряда Battleline"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "fb242fc6-ca2a-4370-b362-03742b21fb93",
      "kind": "detachmentRule",
      "name": "Cyber-psalm Programming",
      "det": "Cohort Cybernetica",
      "hash": "f21761c4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "unless the unit is Battle-shocked",
            "ru": "если отряд не Battle-shocked"
          },
          "cond": [
            "unit-not-battle-shocked"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cohort-cybernetica"
      }
    },
    {
      "sid": "46d34802-7b56-4948-8651-f39dae58a197",
      "kind": "detachmentRule",
      "name": "Benedictions of the Omnissiah",
      "det": "Data-psalm Conclave",
      "hash": "285b0847",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "under the Panegyric Procession Benediction, per ranged attack within half range",
            "ru": "при благословении Panegyric Procession, за стрелковую атаку в пределах половины дальности"
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
            "en": "under the Citation in Savagery Benediction, if the unit made a Charge move this turn",
            "ru": "при благословении Citation in Savagery, если отряд совершил чардж в этом ходу"
          },
          "cond": [
            "benediction-citation-in-savagery",
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "under the Citation in Savagery Benediction, if the unit made a Charge move this turn",
            "ru": "при благословении Citation in Savagery, если отряд совершил чардж в этом ходу"
          },
          "cond": [
            "benediction-citation-in-savagery",
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "data-psalm-conclave"
      }
    },
    {
      "sid": "d2354f79-c195-4cb4-bcd7-0e783201902c",
      "kind": "detachmentRule",
      "name": "Noospheric Transference",
      "det": "Haloscreed Battle Clade",
      "hash": "0de92e95",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for a unit given the Halo Override keyword with the Electromotive Energisation ability",
            "ru": "для отряда, получившего Halo Override со способностью Electromotive Energisation"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for a unit given the Halo Override keyword with the Microactuator Bracing ability",
            "ru": "для отряда, получившего Halo Override со способностью Microactuator Bracing"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "haloscreed-battle-clade"
      }
    },
    {
      "sid": "a99aefbc-1a7f-4452-9889-867c64a9d153",
      "kind": "detachmentRule",
      "name": "Cyber-static Canticles",
      "det": "Luminen Auto-Choir",
      "ref": {
        "kind": "detachmentRule",
        "det": "luminen-auto-choir"
      },
      "hash": "e0235ebc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null
        }
      ]
    },
    {
      "sid": "04ebb33a-9b1f-4190-beea-d34b105f73ae",
      "kind": "enhancement",
      "name": "Arch-negator",
      "det": "Cohort Cybernetica",
      "ref": {
        "kind": "enhancement",
        "det": "cohort-cybernetica"
      },
      "hash": "649a680c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "728a30a4-6408-4ab1-b1f2-54e7da8cacee",
      "kind": "enhancement",
      "name": "Mechanicus Locum",
      "det": "Data-psalm Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "data-psalm-conclave"
      },
      "hash": "189b1239",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": null
        }
      ]
    },
    {
      "sid": "90b8de0c-70e0-4aae-85b7-0b45e64ecbf6",
      "kind": "enhancement",
      "name": "Belicosa-class Capacitor Vanes",
      "det": "Eradication Cohort",
      "hash": "d52a9d4c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "eradication-cohort"
      }
    },
    {
      "sid": "9fb4f320-8870-48c5-9e73-76725e9691fa",
      "kind": "enhancement",
      "name": "Martial Signatum Amplificator",
      "det": "Eradication Cohort",
      "ref": {
        "kind": "enhancement",
        "det": "eradication-cohort"
      },
      "hash": "a7771d15",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Skitarii",
          "when": null
        }
      ]
    },
    {
      "sid": "36413881-7693-4d35-b23a-27a39aedfe12",
      "kind": "enhancement",
      "name": "Omnissiah’s Fury",
      "det": "Eradication Cohort",
      "hash": "1105f866",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "eradication-cohort"
      }
    },
    {
      "sid": "f129d8e9-3079-4b45-bf8c-74e62b1d5eb8",
      "kind": "enhancement",
      "name": "Genetor",
      "det": "Explorator Maniple",
      "hash": "69a631a2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while the bearer leads the unit and it is within range of your Acquisition objective marker",
            "ru": "пока носитель ведёт отряд и тот в радиусе вашего маркера Acquisition"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "explorator-maniple"
      }
    },
    {
      "sid": "0cb351b2-a2c6-4fdf-964f-83281828a311",
      "kind": "enhancement",
      "name": "Logis",
      "det": "Explorator Maniple",
      "hash": "5d6c4484",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "explorator-maniple"
      }
    },
    {
      "sid": "246ea89e-51d1-4660-92bd-64baaac14039",
      "kind": "enhancement",
      "name": "Inloaded Lethality",
      "det": "Haloscreed Battle Clade",
      "hash": "87030479",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        },
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
        "det": "haloscreed-battle-clade"
      }
    },
    {
      "sid": "0a6da199-5297-4eb9-b320-5ab60423d571",
      "kind": "enhancement",
      "name": "Sanctified Ordnance",
      "det": "Haloscreed Battle Clade",
      "ref": {
        "kind": "enhancement",
        "det": "haloscreed-battle-clade"
      },
      "hash": "18087725",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "when": null
        }
      ]
    },
    {
      "sid": "2a96585b-c6fd-4271-b617-56698f4df264",
      "kind": "enhancement",
      "name": "Transoracular Dyad Wafers",
      "det": "Haloscreed Battle Clade",
      "ref": {
        "kind": "enhancement",
        "det": "haloscreed-battle-clade"
      },
      "hash": "fc5884dd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Halo Override",
          "when": {
            "en": "while the bearer is attached to a Kastelan Robots unit",
            "ru": "пока носитель присоединён к отряду Kastelan Robots"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c434dc26-c687-4677-b72d-c879da0c169b",
      "kind": "enhancement",
      "name": "Empowered Mechanisms",
      "det": "Purge Corps Deltic-9",
      "ref": null,
      "hash": "a44941f8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "0f7669e1-e987-4557-9722-4aa1f8742217",
      "kind": "enhancement",
      "name": "Autoclavic Denunciation",
      "det": "Rad-Zone Corps",
      "ref": {
        "kind": "enhancement",
        "det": "rad-zone-corps"
      },
      "hash": "1ad407f7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 2+",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 4+",
          "when": null
        }
      ]
    },
    {
      "sid": "6f6d7403-0605-4345-b7d6-d304b861a7a0",
      "kind": "enhancement",
      "name": "Peerless Eradicator",
      "det": "Rad-Zone Corps",
      "ref": {
        "kind": "enhancement",
        "det": "rad-zone-corps"
      },
      "hash": "304ecf6c",
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
      "sid": "c5c70e06-87e7-4ed4-a1d9-b5828d640d87",
      "kind": "stratagem",
      "name": "Defect Scrutiny",
      "det": "Cohort Acquisitus",
      "ref": {
        "kind": "stratagem",
        "det": "cohort-acquisitus",
        "name": "Defect Scrutiny"
      },
      "hash": "4848452b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bb586cc5-9709-418d-b4c6-cfe1fd80928e",
      "kind": "stratagem",
      "name": "Auto-divinatory Targeting",
      "det": "Cohort Cybernetica",
      "ref": {
        "kind": "stratagem",
        "det": "cohort-cybernetica",
        "name": "Auto-divinatory Targeting"
      },
      "hash": "33bc9d22",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "but only against units within range of the selected marker",
            "ru": "но только против юнитов у выбранного маркера"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "but only against units within range of the selected marker",
            "ru": "но только против юнитов у выбранного маркера"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "round"
    },
    {
      "sid": "85cd645b-36de-4c71-94fb-d1dd8b63d61d",
      "kind": "stratagem",
      "name": "Motive Imperative",
      "det": "Cohort Cybernetica",
      "ref": {
        "kind": "stratagem",
        "det": "cohort-cybernetica",
        "name": "Motive Imperative"
      },
      "hash": "7578ea72",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "round"
    },
    {
      "sid": "df721828-da79-4f3a-adfc-7a2b9dc1cad9",
      "kind": "stratagem",
      "name": "Chant of the Remorseless Fist",
      "det": "Data-psalm Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "data-psalm-conclave",
        "name": "Chant of the Remorseless Fist"
      },
      "hash": "47ce045f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2a8a67fa-6d84-4862-b69d-37cfa44b9fd6",
      "kind": "stratagem",
      "name": "Luminescent Blessing",
      "det": "Data-psalm Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "data-psalm-conclave",
        "name": "Luminescent Blessing"
      },
      "hash": "d172fab4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "CULT MECHANICUS models only",
            "ru": "только модели CULT MECHANICUS"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "0615ff22-fe2b-4fed-a233-75033fdca00e",
      "kind": "stratagem",
      "name": "Servo-Driven Charge",
      "det": "Eradication Cohort",
      "ref": {
        "kind": "stratagem",
        "det": "eradication-cohort",
        "name": "Servo-Driven Charge"
      },
      "hash": "38a2a2a7",
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
      "sid": "2a6b9771-679c-479a-be4f-0f9248641e10",
      "kind": "stratagem",
      "name": "Unrelenting Aggression",
      "det": "Eradication Cohort",
      "ref": {
        "kind": "stratagem",
        "det": "eradication-cohort",
        "name": "Unrelenting Aggression"
      },
      "hash": "ffe87ff2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "66f322cb-8c53-4c82-9dd4-29eba0609afc",
      "kind": "stratagem",
      "name": "Auto-oracular Retrieval",
      "det": "Explorator Maniple",
      "ref": {
        "kind": "stratagem",
        "det": "explorator-maniple",
        "name": "Auto-oracular Retrieval"
      },
      "hash": "e29b5af5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "45ceb232-8964-463c-bebe-2677603b1444",
      "kind": "stratagem",
      "name": "Scriptural Prognosis",
      "det": "Lords of the Forge",
      "ref": {
        "kind": "stratagem",
        "det": "lords-of-the-forge",
        "name": "Scriptural Prognosis"
      },
      "hash": "9e50d86d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5988385b-4997-4228-9e6d-4f4b85d270a8",
      "kind": "stratagem",
      "name": "Aggressor Imperative",
      "det": "Rad-Zone Corps",
      "ref": {
        "kind": "stratagem",
        "det": "rad-zone-corps",
        "name": "Aggressor Imperative"
      },
      "hash": "574493a2",
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
      "sid": "5ca929e2-f7b2-467f-bde5-0bbc37bbea76",
      "kind": "stratagem",
      "name": "Bulwark Imperative",
      "det": "Rad-Zone Corps",
      "ref": {
        "kind": "stratagem",
        "det": "rad-zone-corps",
        "name": "Bulwark Imperative"
      },
      "hash": "74b1f1f1",
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
      "sid": "8caaa11d-0b04-485d-b7a0-1051940ba64d",
      "kind": "stratagem",
      "name": "Lethal Dosage",
      "det": "Rad-Zone Corps",
      "ref": {
        "kind": "stratagem",
        "det": "rad-zone-corps",
        "name": "Lethal Dosage"
      },
      "hash": "bc3f9fb7",
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
      "sid": "e532731c-37b8-43d9-9d77-d4263507e900",
      "kind": "stratagem",
      "name": "Binharic Offence",
      "det": "Skitarii Hunter Cohort",
      "ref": {
        "kind": "stratagem",
        "det": "skitarii-hunter-cohort",
        "name": "Binharic Offence"
      },
      "hash": "cc43863e",
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
      "sid": "8873139d-a32b-459e-b0a6-98d0ea2ea25a",
      "kind": "stratagem",
      "name": "Isolate and Destroy",
      "det": "Skitarii Hunter Cohort",
      "ref": {
        "kind": "stratagem",
        "det": "skitarii-hunter-cohort",
        "name": "Isolate and Destroy"
      },
      "hash": "bf79f996",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8356be94-9f5e-422d-ae18-98ce1bd89810:archaeopter-fusilave",
      "kind": "wargear",
      "name": "Archaeopter Fusilave: Chaff Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "archaeopter-fusilave",
        "item": "chaff launcher"
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
      "sid": "8356be94-9f5e-422d-ae18-98ce1bd89810:archaeopter-stratoraptor",
      "kind": "wargear",
      "name": "Archaeopter Stratoraptor: Chaff Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "archaeopter-stratoraptor",
        "item": "chaff launcher"
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
      "sid": "8356be94-9f5e-422d-ae18-98ce1bd89810:archaeopter-transvector",
      "kind": "wargear",
      "name": "Archaeopter Transvector: Chaff Launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "archaeopter-transvector",
        "item": "chaff launcher"
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
      "sid": "3970cd7b-a8ee-4429-96e1-99d8a57709a2:skitarii-rangers",
      "kind": "wargear",
      "name": "Skitarii Rangers: Omnispex",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "skitarii-rangers",
        "item": "omnispex"
      },
      "hash": "c40143bc",
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
      "sid": "3970cd7b-a8ee-4429-96e1-99d8a57709a2:skitarii-vanguard",
      "kind": "wargear",
      "name": "Skitarii Vanguard: Omnispex",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "skitarii-vanguard",
        "item": "omnispex"
      },
      "hash": "c40143bc",
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
    }
  ]
}
