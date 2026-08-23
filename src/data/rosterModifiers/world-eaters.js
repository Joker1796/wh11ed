// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "world-eaters",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "791c069c-fc4b-4198-8085-a8a00c78fd00:angron",
      "kind": "ability",
      "name": "Angron: Driven by Ultimate Rage (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "angron",
        "scopes": [
          {
            "targets": [
              "WORLD EATERS"
            ],
            "excludes": []
          }
        ],
        "set": "Wrathful Presence",
        "pickLimit": 1
      },
      "hash": "46c95af7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0590eb08-1a08-422b-8aa7-cef2df169979:angron",
      "kind": "ability",
      "name": "Angron: Overwhelmlng Wrath (Aura)",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "angron",
        "set": "Wrathful Presence",
        "pickLimit": 1
      },
      "hash": "19e2f271",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f2400e6f-7d30-487b-99a2-f8ffebf00817:angron",
      "kind": "ability",
      "name": "Angron: The Blood God’s Favour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "angron",
        "set": "Wrathful Presence",
        "pickLimit": 1
      },
      "hash": "8423f8d3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2cbca890-eb1a-4b32-aed7-6e7abb2ac218:bloodthirster",
      "kind": "ability",
      "name": "Bloodthirster: Daemon Lord of Khorne",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bloodthirster",
        "scopes": [
          {
            "targets": [
              "BLOOD LEGIONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "d122b2c2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "33a3fdd4-beec-4f75-8779-cf16bbdadf0f:daemon-prince-of-khorne",
      "kind": "ability",
      "name": "Daemon Prince of Khorne: Devastating Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "daemon-prince-of-khorne"
      },
      "hash": "869e0d05",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Hellforged"
          },
          "when": {
            "en": "until the end of a turn it made a Charge move",
            "ru": "до конца хода, в котором совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "79ed7c3d-9cfc-4975-9b8c-df6efe860286:eightbound",
      "kind": "ability",
      "name": "Eightbound: Beacons of Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eightbound",
        "scopes": [
          {
            "targets": [
              "WORLD EATERS"
            ],
            "excludes": [
              "MONSTERS",
              "MONSTER",
              "VEHICLES",
              "VEHICLE"
            ]
          }
        ]
      },
      "hash": "fb1c6326",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3763072d-ee53-4a22-94c0-8c762a088c72:exalted-eightbound",
      "kind": "ability",
      "name": "Exalted Eightbound: Rend and Tear",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "exalted-eightbound"
      },
      "hash": "72dd735a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      ]
    },
    {
      "sid": "39106d1b-f767-4eb9-bb2b-51234b91611c:helbrute",
      "kind": "ability",
      "name": "Helbrute: Devoted to Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "helbrute"
      },
      "hash": "67092a63",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "the two melee weapons taken in addition to the close combat weapon",
            "ru": "два оружия ближнего боя, взятые вдобавок к close combat weapon"
          },
          "cond": [
            "blocked-weapon"
          ]
        }
      ]
    },
    {
      "sid": "dacf05b3-c5a9-40f2-9452-5f86a89d342a:heldrake",
      "kind": "ability",
      "name": "Heldrake: Airborne Predator",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "heldrake"
      },
      "hash": "34bdf1df",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a65415ae-941f-4500-a868-cbf1c0ed6f25:lord-on-juggernaut",
      "kind": "ability",
      "name": "Lord on Juggernaut: Aggressive Advance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-on-juggernaut"
      },
      "hash": "55eac758",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "10\"",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "bb6455b4-5b89-4710-9777-79d66db0d1c2:maulerfiend",
      "kind": "ability",
      "name": "Maulerfiend: Savage Exaltation",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "maulerfiend"
      },
      "hash": "fb3f99dc",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "787f9581-a51d-4d80-af61-d5fa8acfb5c0:skarbrand",
      "kind": "ability",
      "name": "Skarbrand: Rage Embodied",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skarbrand",
        "scopes": [
          {
            "targets": [
              "BLOOD LEGIONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "f5ad8bed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "848b2010-250d-4c2b-b325-8aee82639312:slaughterbound",
      "kind": "ability",
      "name": "Slaughterbound: Possessed Lord",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "slaughterbound"
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
      "sid": "0ecb9456-ccf0-48e8-86ce-7762decae226:vorrakh-lord-of-the-frenzied-reavers",
      "kind": "ability",
      "name": "Vorrakh, Lord of the Frenzied Reavers: Devastating Assault",
      "det": null,
      "ref": null,
      "hash": "22be2b24",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "1cd5e4a2-6e59-4213-bca8-d2bc680bd681",
      "kind": "armyRule",
      "name": "Blessings of Khorne",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "5fc04aa0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the Martial Excellence Blessing is active for the battle round",
            "ru": "пока в раунде активно благословение Martial Excellence"
          },
          "cond": [
            "blessing-martial-excellence"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while the Warp Blades Blessing is active for the battle round",
            "ru": "пока в раунде активно благословение Warp Blades"
          },
          "cond": [
            "blessing-warp-blades"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "while the Decapitating Strikes Blessing is active, against Infantry units",
            "ru": "пока активно благословение Decapitating Strikes, против отрядов Infantry"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "145c3608-88ac-4d19-b441-93aec4eceee9",
      "kind": "detachmentRule",
      "name": "Relentless Rage",
      "det": "Berzerker Warband",
      "hash": "4d170c56",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn, after the unit makes a Charge move",
            "ru": "до конца хода, после того как отряд совершил чардж"
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
            "en": "until the end of the turn, after the unit makes a Charge move",
            "ru": "до конца хода, после того как отряд совершил чардж"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "e0bb7c79-6d19-4d69-84ae-f3d0b4036ad3",
      "kind": "detachmentRule",
      "name": "Idols of Khorne",
      "det": "Cult of Blood",
      "hash": "60e57bd1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "cult-of-blood"
      }
    },
    {
      "sid": "5277c93c-81dd-4f76-b4d5-9a7f0609f836",
      "kind": "detachmentRule",
      "name": "Berzerker Charge",
      "det": "Frenzied Reavers",
      "ref": null,
      "hash": "708f62a1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "when that unit is selected to fight, if it made a Charge move this turn",
            "ru": "когда отряд выбран для боя, если в этом ходу он совершил charge-перемещение"
          },
          "cond": [
            "unit-charged"
          ]
        }
      ]
    },
    {
      "sid": "adf5998c-3b76-4841-b189-5e2e08a37b61",
      "kind": "detachmentRule",
      "name": "Rush to the Fray",
      "det": "Goretrack Onslaught",
      "hash": "c9160531",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "goretrack-onslaught"
      }
    },
    {
      "sid": "8f1033a9-31fd-40a3-aa6d-529a58e31a8d",
      "kind": "detachmentRule",
      "name": "Blood Tithe",
      "det": "Khorne Daemonkin",
      "hash": "fce93df7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "Blood Legions units only, once the Boon of Blood ability is activated for 4 Blood Tithe points",
            "ru": "только отряды Blood Legions, после активации способности Boon of Blood за 4 очка Blood Tithe"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "khorne-daemonkin"
      }
    },
    {
      "sid": "d6c37f06-0c31-480e-b0fc-d7a08735e284",
      "kind": "detachmentRule",
      "name": "Wrath of Khorne",
      "det": "Vessels of Wrath",
      "ref": {
        "kind": "detachmentRule",
        "det": "vessels-of-wrath"
      },
      "hash": "814d0c45",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "CLEAVE 1",
          "when": {
            "en": "the Character models' melee attacks, if that option is the one taken when selected to fight",
            "ru": "атаки ближнего боя моделей Character, если при выборе для боя взят этот вариант"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "alt": 0,
          "when": {
            "en": "+1 AP instead, for the Character models' melee attacks",
            "ru": "вместо этого +1 AP для атак ближнего боя моделей Character"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "f7fbb275-bf28-483e-9f80-5bbedb3c3b51",
      "kind": "enhancement",
      "name": "Battle-lust",
      "det": "Berzerker Warband",
      "hash": "42d701da",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "156db4d1-d3d9-434a-a23a-8891a2dc103b",
      "kind": "enhancement",
      "name": "Berzerker Glaive",
      "det": "Berzerker Warband",
      "hash": "5486231b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "notTag": "EXTRA ATTACKS"
          }
        },
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "notTag": "EXTRA ATTACKS"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "berzerker-warband"
      }
    },
    {
      "sid": "5c618647-d77c-420a-aef6-9b18e3c44c6f",
      "kind": "enhancement",
      "name": "Helm of Brazen Ire",
      "det": "Berzerker Warband",
      "ref": {
        "kind": "enhancement",
        "det": "berzerker-warband"
      },
      "hash": "31b6e128",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3959a88d-7bdd-4c12-8e21-72050af167a2",
      "kind": "enhancement",
      "name": "Gore-stained Veterans (Upgrade)",
      "det": "Butchers of Khorne",
      "ref": {
        "kind": "enhancement",
        "det": "butchers-of-khorne"
      },
      "hash": "9b3cdb32",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
      "sid": "36ceb8f3-1be2-4dfb-8f56-3cd0b801b2cd",
      "kind": "enhancement",
      "name": "Sanctified in Slaughter (Upgrade)",
      "det": "Butchers of Khorne",
      "ref": {
        "kind": "enhancement",
        "det": "butchers-of-khorne"
      },
      "hash": "71d1f520",
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
      "sid": "a0a554a8-ce20-4b80-ae87-61273c56f07a",
      "kind": "enhancement",
      "name": "Brazen Form",
      "det": "Cult of Blood",
      "hash": "0173d648",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-blood"
      }
    },
    {
      "sid": "b4cc8581-ed00-4444-878a-5aac6e4a0d12",
      "kind": "enhancement",
      "name": "Chosen of the Blood God",
      "det": "Cult of Blood",
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-blood"
      },
      "hash": "7b7acc1c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends the range of the bearer's Aura abilities, not a weapon row"
    },
    {
      "sid": "8d57055e-3476-401d-9382-c0c1eae33a4d",
      "kind": "enhancement",
      "name": "Blade of Endless Bloodshed",
      "det": "Khorne Daemonkin",
      "hash": "f9ebe04f",
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
        "det": "khorne-daemonkin"
      }
    },
    {
      "sid": "fcbe8acf-9854-414e-b644-c0e0cb67e41c",
      "kind": "enhancement",
      "name": "Blood-Forged Armour",
      "det": "Khorne Daemonkin",
      "ref": {
        "kind": "enhancement",
        "det": "khorne-daemonkin"
      },
      "hash": "d735756f",
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
      "sid": "39eeeb4f-b6ba-45a6-8d96-7a7036b58d88",
      "kind": "enhancement",
      "name": "Disciple of Khorne",
      "det": "Khorne Daemonkin",
      "ref": {
        "kind": "enhancement",
        "det": "khorne-daemonkin"
      },
      "hash": "b14be783",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Blood Legions",
          "when": {
            "en": "replaces the World Eaters Faction keyword rather than adding to it",
            "ru": "заменяет фракционное ключевое слово World Eaters, а не добавляется к нему"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "04245333-93c8-497c-9c6c-2bfe63210589",
      "kind": "stratagem",
      "name": "Frenzied Resilience",
      "det": "Berzerker Warband",
      "ref": {
        "kind": "stratagem",
        "det": "berzerker-warband",
        "name": "Frenzied Resilience"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0e2f8b70-b049-4a99-8e6b-3f08fc3720b4",
      "kind": "stratagem",
      "name": "Hack and Slash",
      "det": "Berzerker Warband",
      "ref": {
        "kind": "stratagem",
        "det": "berzerker-warband",
        "name": "Hack and Slash"
      },
      "hash": "381f84c3",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
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
      "sid": "ddce833e-6a6b-4621-8abd-4c2e764d798d",
      "kind": "stratagem",
      "name": "Focused Ferocity",
      "det": "Butchers of Khorne",
      "ref": {
        "kind": "stratagem",
        "det": "butchers-of-khorne",
        "name": "Focused Ferocity"
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
      "sid": "80b51c8d-7da0-4c7a-9584-40a017ea2cfa",
      "kind": "stratagem",
      "name": "Wrath Beyond Reason",
      "det": "Butchers of Khorne",
      "ref": {
        "kind": "stratagem",
        "det": "butchers-of-khorne",
        "name": "Wrath Beyond Reason"
      },
      "hash": "c853ac61",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4713f814-b1e9-4d19-bad3-f6cac53d2c6e",
      "kind": "stratagem",
      "name": "Blessing of Burning Blood",
      "det": "Khorne Daemonkin",
      "ref": {
        "kind": "stratagem",
        "det": "khorne-daemonkin",
        "name": "Blessing of Burning Blood"
      },
      "hash": "c3f648eb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "while the Boon of Blood is active, instead",
            "ru": "пока активен Boon of Blood, вместо этого"
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
      "sid": "8f8bdb9a-b906-48e6-84f4-7ce1762cf19e",
      "kind": "stratagem",
      "name": "Daemonic Fury",
      "det": "Khorne Daemonkin",
      "ref": {
        "kind": "stratagem",
        "det": "khorne-daemonkin",
        "name": "Daemonic Fury"
      },
      "hash": "2370f986",
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
      "dur": "turn"
    },
    {
      "sid": "885813ba-ec4e-4279-bd3b-b0ea000890cb",
      "kind": "stratagem",
      "name": "Daemonic Strength",
      "det": "Possessed Slaughterband",
      "ref": {
        "kind": "stratagem",
        "det": "possessed-slaughterband",
        "name": "Daemonic Strength"
      },
      "hash": "1a3cc600",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c719efe4-086b-4873-af62-1a50355b6c90",
      "kind": "stratagem",
      "name": "Aspire to Infamy",
      "det": "Vessels of Wrath",
      "ref": {
        "kind": "stratagem",
        "det": "vessels-of-wrath",
        "name": "Aspire to Infamy"
      },
      "hash": "03807c81",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "CHARACTER models only",
            "ru": "только модели CHARACTER"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "CHARACTER models only",
            "ru": "только модели CHARACTER"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:bloodcrushers",
      "kind": "wargear",
      "name": "Bloodcrushers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodcrushers",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
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
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:bloodcrushers",
      "kind": "wargear",
      "name": "Bloodcrushers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodcrushers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:bloodletters",
      "kind": "wargear",
      "name": "Bloodletters: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodletters",
        "item": "daemonic icon"
      },
      "hash": "5db4589c",
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
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:bloodletters",
      "kind": "wargear",
      "name": "Bloodletters: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "bloodletters",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}
