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
      "sid": "f74e3a85-2691-4849-9e8e-ee9d2675999f:agamatus-custodians",
      "kind": "ability",
      "name": "Agamatus Custodians: Turbo-boost",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "agamatus-custodians"
      },
      "hash": "445d1419",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll is made)",
            "ru": "в фазе, когда совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "7a67bb01-737e-4644-b55b-2a6ea1a52c87:aleya",
      "kind": "ability",
      "name": "Aleya: Tenacious Spirit",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "aleya"
      },
      "hash": "f34e2507",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d4d5010a-2aec-4900-81d2-f094312a06c3:custodian-guard-with-adrasite-and-pyrithite-spears",
      "kind": "ability",
      "name": "Custodian Guard with Adrasite and Pyrithite Spears: No Foe Shall Stand",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "custodian-guard-with-adrasite-and-pyrithite-spears"
      },
      "hash": "cd91381e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
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
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
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
      "sid": "f2aa7bec-a913-4d2e-8383-0fccc1998820:gilded-blades-custodian-guard",
      "kind": "ability",
      "name": "Gilded Blades Custodian Guard: Praesidium Shield",
      "det": null,
      "ref": null,
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
      "sid": "68f78314-9458-4dd0-b445-14119ab4f945:knight-centura",
      "kind": "ability",
      "name": "Knight-Centura: Seeker’s Instincts",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-centura"
      },
      "hash": "e2be7f4f",
      "ver": 925,
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
      "sid": "a2bb638b-5d8e-4915-853e-0e50df6dd5b5:pallas-grav-attack",
      "kind": "ability",
      "name": "Pallas Grav-attack: Merciless Hunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "pallas-grav-attack"
      },
      "hash": "b3fbfa0b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "87205f80-9898-4628-97d6-ee6de5a3a15e:sagittarum-custodians",
      "kind": "ability",
      "name": "Sagittarum Custodians: Disintegration Beams",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "sagittarum-custodians"
      },
      "hash": "211c448c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
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
      "sid": "f6af813d-e886-4f2a-8f34-3e8b3e6e8dc9:telemon-heavy-dreadnought",
      "kind": "ability",
      "name": "Telemon Heavy Dreadnought: Devoted to Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "telemon-heavy-dreadnought"
      },
      "hash": "a99e7fb9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Telemon caestus"
          },
          "when": {
            "en": "if two Telemon caestus were taken alongside the armoured feet",
            "ru": "если взяты два Telemon caestus вдобавок к armoured feet"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a20a1308-d19f-4ab4-a0fe-e9c3ca984855:telemon-heavy-dreadnought",
      "kind": "ability",
      "name": "Telemon Heavy Dreadnought: Guardian Eternal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "telemon-heavy-dreadnought"
      },
      "hash": "e577ede9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ce39c177-aa83-4e6b-8543-85cef75a77d2:trajann-valoris",
      "kind": "ability",
      "name": "Trajann Valoris: Moment Shackle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "trajann-valoris"
      },
      "hash": "776b668a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "12",
          "only": {
            "name": "Watcher’s Axe"
          },
          "when": {
            "en": "once per battle, if this option is chosen",
            "ru": "раз за битву, если выбран этот вариант"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "2+",
          "when": {
            "en": "once per battle, if this option is chosen instead",
            "ru": "раз за битву, если выбран другой вариант"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f1cf8105-4d99-409e-8a02-6dc8b322aee7:valerian",
      "kind": "ability",
      "name": "Valerian: Golden Laurels",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "valerian"
      },
      "hash": "d0787118",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f74e3a85-2691-4849-9e8e-ee9d2675999f:vertus-praetors",
      "kind": "ability",
      "name": "Vertus Praetors: Turbo-boost",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vertus-praetors"
      },
      "hash": "445d1419",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll is made)",
            "ru": "в фазе, когда совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "fb5e29e5-8c77-4309-8b60-7e9fbc96d198",
      "kind": "allegiance",
      "name": "Solar Spearhead Keywords: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "solar-spearhead-keywords",
        "opt": "Character"
      },
      "hash": "f41f5c95",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "6b8c2838-343c-4cd7-b270-d2a184e6746f",
      "kind": "armyRule",
      "name": "Martial Ka’tah",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "175e9f73",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the Dacatari Stance is the one selected for this fight",
            "ru": "пока для этого боя выбрана стойка Dacatari"
          },
          "cond": [
            "stance-dacatari"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the Rendax Stance is the one selected for this fight",
            "ru": "пока для этого боя выбрана стойка Rendax"
          },
          "cond": [
            "stance-rendax"
          ]
        }
      ]
    },
    {
      "sid": "02ead9e4-7cbf-4b21-9454-9071c7f4035b",
      "kind": "detachmentRule",
      "name": "Assemblage of Might",
      "det": "Auric Champions",
      "hash": "62ac7a27",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "auric-champions"
      }
    },
    {
      "sid": "067f8571-ab3a-4adb-9775-b7b4ed2ec21e",
      "kind": "detachmentRule",
      "name": "Against All Odds",
      "det": "Lions of the Emperor",
      "hash": "dc516e59",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "35018eb5-1ace-43a1-aa0e-e6553eaee45f",
      "kind": "detachmentRule",
      "name": "March of the Honoured Dead",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "detachmentRule",
        "det": "might-of-the-moritoi"
      },
      "hash": "1707aef3",
      "ver": 925,
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
      "sid": "7daf099f-82c8-4871-97e2-8e1863c59ec7",
      "kind": "detachmentRule",
      "name": "Martial Mastery",
      "det": "Shield Host",
      "hash": "ee9038b0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "Martial Ka'tah models, while that bullet of Martial Mastery is the one selected this battle round",
            "ru": "модели с Martial Ka'tah, пока в этом раунде выбран соответствующий пункт Martial Mastery"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "shield-host"
      }
    },
    {
      "sid": "c60b2c8e-5321-442c-9790-75876a429558",
      "kind": "detachmentRule",
      "name": "Auric Armour",
      "det": "Solar Spearhead",
      "hash": "11cd1b24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Vehicle units at Starting Strength, excluding Aircraft and Battle-shocked units",
            "ru": "отряды Vehicle в полной численности, кроме Aircraft и Battle-shocked"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "c267c203-2ad3-408b-a12b-7d1ead94fa0b",
      "kind": "detachmentRule",
      "name": "Moritoi Ancients",
      "det": "Solar Spearhead",
      "hash": "34b9acca",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "fd72a239-683b-44f9-a38f-3e66c616faef",
      "kind": "detachmentRule",
      "name": "Revered Companions",
      "det": "Talons of the Emperor",
      "hash": "fcec0a80",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "talons-of-the-emperor"
      }
    },
    {
      "sid": "84f59743-864c-4f63-89c2-33de243b7adf",
      "kind": "enhancement",
      "name": "Inspirational Exemplar",
      "det": "Auric Champions",
      "ref": {
        "kind": "enhancement",
        "det": "auric-champions"
      },
      "hash": "74e74f07",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ]
    },
    {
      "sid": "d178eeae-2a4d-4597-af84-02bef5cb5d36",
      "kind": "enhancement",
      "name": "Veiled Blade",
      "det": "Auric Champions",
      "hash": "ca41608e",
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
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "×3",
          "when": {
            "en": "once per battle, until the end of the turn, the bearer's Objective Control is tripled",
            "ru": "один раз за битву, до конца хода, Objective Control носителя утраивается"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "auric-champions"
      }
    },
    {
      "sid": "6bf0be50-a491-4d36-9491-929b860c64bf",
      "kind": "enhancement",
      "name": "Admonimortis",
      "det": "Lions of the Emperor",
      "hash": "d9e0853a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 3,
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
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "09443c78-9599-4b1c-baa0-836142b59bb1",
      "kind": "enhancement",
      "name": "Fierce Conqueror",
      "det": "Lions of the Emperor",
      "hash": "9e06f74f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for the Fight phase, per 5 enemy models within 6\" of the bearer (rounding down)",
            "ru": "на фазу боя, за каждые 5 вражеских моделей в 6\" от носителя (с округлением вниз)"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "lions-of-the-emperor"
      }
    },
    {
      "sid": "69c9f474-ba9e-402d-bb49-0c8f9ecf52d4",
      "kind": "enhancement",
      "name": "Enhanced Voidsheen Cloak",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      },
      "hash": "e43ce3b4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ad4c7b31-c0d1-4fdc-940e-9b82ca3d3057",
      "kind": "enhancement",
      "name": "Oblivion Knight",
      "det": "Null Maiden Vigil",
      "hash": "75d6c16a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      }
    },
    {
      "sid": "2bf0ae91-04b4-4ce5-8019-8e699d1d6093",
      "kind": "enhancement",
      "name": "Raptor Blade",
      "det": "Null Maiden Vigil",
      "hash": "adb05aaf",
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
            "en": "Attacks, Strength and Damage +2 instead, while within Engagement Range of a Battle-shocked enemy Psyker unit",
            "ru": "атаки, сила и урон +2 вместо +1, пока носитель в радиусе боя с Battle-shocked вражеским отрядом Psyker"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "null-maiden-vigil"
      }
    },
    {
      "sid": "613d5ac2-7229-4e15-8b37-959bb7f3dd64",
      "kind": "enhancement",
      "name": "Auric Mantle",
      "det": "Shield Host",
      "hash": "d0736a52",
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
        "det": "shield-host"
      }
    },
    {
      "sid": "a48ca031-033e-43c8-b79c-8199175c448e",
      "kind": "enhancement",
      "name": "From the Hall of Armouries",
      "det": "Shield Host",
      "hash": "75cc38ed",
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
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shield-host"
      }
    },
    {
      "sid": "2571079f-cdf9-49df-8cba-42ef31db936c",
      "kind": "enhancement",
      "name": "Panoptispex",
      "det": "Shield Host",
      "ref": {
        "kind": "enhancement",
        "det": "shield-host"
      },
      "hash": "1260bb42",
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
      "sid": "d25d6f4b-3dcf-4b17-8e8e-b39a487012c9",
      "kind": "enhancement",
      "name": "Adamantine Talisman",
      "det": "Solar Spearhead",
      "hash": "cab5d46b",
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
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "solar-spearhead"
      }
    },
    {
      "sid": "60461b2c-c1ca-4046-82a2-436078ebfb10",
      "kind": "enhancement",
      "name": "Gift of Terran Artifice",
      "det": "Talons of the Emperor",
      "hash": "3ecc3cbb",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "talons-of-the-emperor"
      }
    },
    {
      "sid": "c42f1a6c-7209-44c3-8a08-1983a33aa429",
      "kind": "stratagem",
      "name": "Slayer of Champions",
      "det": "Auric Champions",
      "ref": {
        "kind": "stratagem",
        "det": "auric-champions",
        "name": "Slayer of Champions"
      },
      "hash": "28b225c9",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3d93b0b2-7640-4265-985b-0c1a9e206643",
      "kind": "stratagem",
      "name": "Defiant To The Last",
      "det": "Lions of the Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "lions-of-the-emperor",
        "name": "Defiant To The Last"
      },
      "hash": "c36844c5",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b16af145-a7ba-473f-8386-ed8fb276e828",
      "kind": "stratagem",
      "name": "Peerless Warrior",
      "det": "Lions of the Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "lions-of-the-emperor",
        "name": "Peerless Warrior"
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
      "sid": "dfa96045-020a-40da-a05a-110841d6114f",
      "kind": "stratagem",
      "name": "Prioritised Eradication",
      "det": "Might of the Moritoi",
      "ref": {
        "kind": "stratagem",
        "det": "might-of-the-moritoi",
        "name": "Prioritised Eradication"
      },
      "hash": "2e0429c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 6",
          "only": {
            "name": "Arachnus storm cannon"
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
          "value": "RAPID FIRE 2",
          "only": {
            "name": "Iliastus accelerator culverin"
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
      "sid": "29d8fbb6-9a19-47a9-9c0c-348c18f2031b",
      "kind": "stratagem",
      "name": "Psy-chaff Volley",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "stratagem",
        "det": "null-maiden-vigil",
        "name": "Psy-chaff Volley"
      },
      "hash": "32319f16",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e71fa2b3-af09-442a-b69d-5160a2c30289",
      "kind": "stratagem",
      "name": "Purgation Sweep",
      "det": "Null Maiden Vigil",
      "ref": {
        "kind": "stratagem",
        "det": "null-maiden-vigil",
        "name": "Purgation Sweep"
      },
      "hash": "8f475604",
      "ver": 925,
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "tag": "TORRENT"
          },
          "when": {
            "en": "against a PSYKER or Battle-shocked target, instead",
            "ru": "против PSYKER или Battle-shocked цели, вместо этого"
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
      "sid": "da903080-91ba-4138-a20c-d7719a69754d",
      "kind": "stratagem",
      "name": "Avenge the Fallen",
      "det": "Shield Host",
      "ref": {
        "kind": "stratagem",
        "det": "shield-host",
        "name": "Avenge the Fallen"
      },
      "hash": "f9f55d63",
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
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while Below Half-strength, instead",
            "ru": "пока Below Half-strength, вместо этого"
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
      "sid": "df90dc29-28d9-4484-b6aa-266ce4b3699d",
      "kind": "stratagem",
      "name": "Deathsong Scythes",
      "det": "Silent Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "silent-hunters",
        "name": "Deathsong Scythes"
      },
      "hash": "9ef4ad65",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against PSYKER targets",
            "ru": "против целей PSYKER"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9786c88d-4694-4c3d-b3c3-c63c25e15a85",
      "kind": "stratagem",
      "name": "Synchronised Inferno",
      "det": "Silent Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "silent-hunters",
        "name": "Synchronised Inferno"
      },
      "hash": "5ba6b1ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "BLAST 1",
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
      "sid": "9494bd29-d121-496c-bb4d-f6d1e2897445",
      "kind": "stratagem",
      "name": "Umbral Prosecution",
      "det": "Silent Hunters",
      "ref": {
        "kind": "stratagem",
        "det": "silent-hunters",
        "name": "Umbral Prosecution"
      },
      "hash": "44605a08",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 2",
          "only": {
            "name": "Boltgun"
          },
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
          "only": {
            "name": "Boltgun"
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
      "sid": "9876dec8-0561-44cf-b491-429cd673c76b",
      "kind": "stratagem",
      "name": "Emperor’s Vengeance",
      "det": "Solar Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "solar-spearhead",
        "name": "Emperor’s Vengeance"
      },
      "hash": "e112e80f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bcb0956b-1bcd-4210-9135-c9a2494bc31a",
      "kind": "stratagem",
      "name": "Punishment Inescapable",
      "det": "Solar Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "solar-spearhead",
        "name": "Punishment Inescapable"
      },
      "hash": "6f179bef",
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
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "b25a7834-58da-4565-9f0a-68df133f1b1f",
      "kind": "stratagem",
      "name": "Relentless Persecution",
      "det": "Solar Spearhead",
      "ref": {
        "kind": "stratagem",
        "det": "solar-spearhead",
        "name": "Relentless Persecution"
      },
      "hash": "49e6d0e2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f5c50ce4-bc47-4982-a25c-e9e09f28737d",
      "kind": "stratagem",
      "name": "Emperor’s Executioners",
      "det": "Talons of the Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "talons-of-the-emperor",
        "name": "Emperor’s Executioners"
      },
      "hash": "465f0820",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "35dbd75b-fa44-489d-b243-38467b8777e1",
      "kind": "stratagem",
      "name": "Talons Interlocked",
      "det": "Talons of the Emperor",
      "ref": {
        "kind": "stratagem",
        "det": "talons-of-the-emperor",
        "name": "Talons Interlocked"
      },
      "hash": "8b66761f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against the one enemy unit this stratagem named",
            "ru": "против юнита, названного стратагемой"
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
            "en": "against the one enemy unit this stratagem named",
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
      "sid": "586938da-eb36-4a8c-9ebc-eacd8ac75f90",
      "kind": "stratagem",
      "name": "Electroexorcist Saturation",
      "det": "Tharanatoi Hammerblow",
      "ref": {
        "kind": "stratagem",
        "det": "tharanatoi-hammerblow",
        "name": "Electroexorcist Saturation"
      },
      "hash": "6fcf05f0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "set",
          "value": "D3+3",
          "only": {
            "name": "Ballistus grenade launcher"
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
      "sid": "342d243e-237b-425e-af03-f0cb82e857b8",
      "kind": "stratagem",
      "name": "Hardened Resolve",
      "det": "Tharanatoi Hammerblow",
      "ref": {
        "kind": "stratagem",
        "det": "tharanatoi-hammerblow",
        "name": "Hardened Resolve"
      },
      "hash": "10a35e26",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
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
      "sid": "c4b60961-67ad-4237-8dbc-2e3641dadadb",
      "kind": "stratagem",
      "name": "Never Outmatched",
      "det": "Tristraen’s Gilded Blades",
      "ref": null,
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
      "sid": "a953553a-11dd-4105-a141-50667ddb666b:allarus-custodians",
      "kind": "wargear",
      "name": "Allarus Custodians: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "allarus-custodians",
        "item": "vexilla"
      },
      "hash": "ec06b6a4",
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
      "sid": "1aa2c464-883e-489a-81ea-9ea8895ccb75:custodian-guard",
      "kind": "wargear",
      "name": "Custodian Guard: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "custodian-guard",
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
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "a953553a-11dd-4105-a141-50667ddb666b:custodian-guard",
      "kind": "wargear",
      "name": "Custodian Guard: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "custodian-guard",
        "item": "vexilla"
      },
      "hash": "ec06b6a4",
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
      "sid": "a953553a-11dd-4105-a141-50667ddb666b:custodian-wardens",
      "kind": "wargear",
      "name": "Custodian Wardens: Vexilla",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "custodian-wardens",
        "item": "vexilla"
      },
      "hash": "ec06b6a4",
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
      "sid": "bb155c10-9ce7-495e-9e1f-22970e181d82:gilded-blades-custodian-guard",
      "kind": "wargear",
      "name": "Gilded Blades Custodian Guard: Praesidium Shield",
      "det": null,
      "ref": null,
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
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "1aa2c464-883e-489a-81ea-9ea8895ccb75:shield-captain",
      "kind": "wargear",
      "name": "Shield-Captain: Praesidium Shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "shield-captain",
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
          "when": null
        }
      ]
    },
    {
      "sid": "ae8d3318-35f9-417c-ace7-01eaf3bb87d7:venatari-custodians",
      "kind": "wargear",
      "name": "Venatari Custodians: Tarsis buckler",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "venatari-custodians",
        "item": "tarsis buckler"
      },
      "hash": "6855a467",
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
    }
  ]
}
