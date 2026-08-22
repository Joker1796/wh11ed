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
      "sid": "2cbca890-eb1a-4b32-aed7-6e7abb2ac218:bloodthirster",
      "kind": "ability",
      "name": "Bloodthirster: Daemon Lord of Khorne",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "bloodthirster"
      },
      "hash": "d122b2c2",
      "ver": 925,
      "reviewed": false,
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
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "79ed7c3d-9cfc-4975-9b8c-df6efe860286:eightbound",
      "kind": "ability",
      "name": "Eightbound: Beacons of Rage",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eightbound"
      },
      "hash": "fb1c6326",
      "ver": 925,
      "reviewed": false,
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
      "reviewed": false,
      "effects": []
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
      "reviewed": false,
      "effects": []
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
      "reviewed": false,
      "effects": []
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
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "787f9581-a51d-4d80-af61-d5fa8acfb5c0:skarbrand",
      "kind": "ability",
      "name": "Skarbrand: Rage Embodied",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skarbrand"
      },
      "hash": "f5ad8bed",
      "ver": 925,
      "reviewed": false,
      "effects": []
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
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "0ecb9456-ccf0-48e8-86ce-7762decae226:vorrakh-lord-of-the-frenzied-reavers",
      "kind": "ability",
      "name": "Vorrakh, Lord of the Frenzied Reavers: Devastating Assault",
      "det": null,
      "ref": null,
      "hash": "22be2b24",
      "ver": 925,
      "reviewed": false,
      "effects": []
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
    }
  ]
}
