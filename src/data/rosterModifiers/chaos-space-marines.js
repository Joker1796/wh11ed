// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "chaos-space-marines",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "55eb487b-db92-4465-9c80-2a2604b8982f",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Khorne",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Khorne"
      },
      "hash": "dd8b43ed",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "note": "every melee row on these datasheets IS the hellforged weapons (strike and sweep), so the +2 S applies to the whole table"
    },
    {
      "sid": "aec87847-8acd-461c-be6b-f47d78672d9c",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Nurgle",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Nurgle"
      },
      "hash": "2aca0f8e",
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
      ]
    },
    {
      "sid": "4d7d8292-64d6-4b3d-8c9e-24d639247b8b",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Slaanesh",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Slaanesh"
      },
      "hash": "4b7e0e58",
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
      "sid": "270fa7e3-a995-4372-99cb-1907dc6b2fcc",
      "kind": "allegiance",
      "name": "Daemonic Allegiance: Tzeentch",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "daemonic-allegiance",
        "opt": "Tzeentch"
      },
      "hash": "a6cb4ed4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 3,
          "when": null
        }
      ],
      "note": "the infernal cannon is the only ranged row on these datasheets"
    },
    {
      "sid": "cf85e0a8-77ed-4e68-b5a4-a6b757aad177",
      "kind": "detachmentRule",
      "name": "Desperate Devotion",
      "det": "Chaos Cult",
      "hash": "d2f86844",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Damned units, for the phase, after making a Desperate Pact",
            "ru": "отряды Damned, на фазу, после заключения Desperate Pact"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "chaos-cult"
      }
    },
    {
      "sid": "39d94781-feca-4238-9ef5-be6536baff52",
      "kind": "detachmentRule",
      "name": "Experimental Augmentations",
      "det": "Creations of Bile",
      "hash": "f61816fc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Cholinergic Accelerants augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Cholinergic Accelerants"
          }
        },
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Heretic Astartes Infantry, if the Hyperadrenal Infusion augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Hyperadrenal Infusion"
          }
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Paraneural Reactions augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Paraneural Reactions"
          }
        },
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Supracutaneous Chitination augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Supracutaneous Chitination"
          }
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Macrotensile Sinews augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Macrotensile Sinews"
          }
        },
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "Heretic Astartes Infantry, if the Ophthalmic Enhancement augmentation is active",
            "ru": "пехота Heretic Astartes, если активна аугментация Ophthalmic Enhancement"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "3eec525c-0bc1-4c11-a6f8-efce97bf6c3d",
      "kind": "detachmentRule",
      "name": "Soul Forge Boons",
      "det": "Cult of the Arkifane",
      "hash": "abd2f746",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "Soul Forge units — Heretic Astartes Vehicles, Lord Discordant and Vashtorr",
            "ru": "отряды Soul Forge — техника Heretic Astartes, Lord Discordant и Vashtorr"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cult-of-the-arkifane"
      }
    },
    {
      "sid": "5fc0cd69-c9d0-4613-a01a-491e55bf56c0",
      "kind": "detachmentRule",
      "name": "Rain of Ruin",
      "det": "Devotees of Destruction",
      "ref": {
        "kind": "detachmentRule",
        "det": "devotees-of-destruction"
      },
      "hash": "c5bd1198",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "1dacaf8f-9649-4bca-b267-e84aa6301dfb",
      "kind": "detachmentRule",
      "name": "Tyrannical Motivation",
      "det": "Huron’s Marauders",
      "hash": "816d7350",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "hurons-marauders"
      }
    },
    {
      "sid": "2d05fb7e-ff32-49ee-87f8-8276bc8705e2",
      "kind": "detachmentRule",
      "name": "Terror Made Manifest",
      "det": "Nightmare Hunt",
      "hash": "bcd56076",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "nightmare-hunt"
      }
    },
    {
      "sid": "fc17c30d-c505-438f-80b0-32fc2cb45792",
      "kind": "detachmentRule",
      "name": "Raiders and Reavers",
      "det": "Renegade Raiders",
      "hash": "326bb479",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per attack against a unit within range of an objective marker",
            "ru": "за атаку по отряду в радиусе маркера цели"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "renegade-raiders"
      }
    },
    {
      "sid": "180d0072-f72a-4976-bd90-a6531c9cd609",
      "kind": "detachmentRule",
      "name": "Debt to the Soul Forge",
      "det": "Soulforged Warpack",
      "hash": "61196a22",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "Daemon Vehicle units, for the phase, after invoking their contract on a Dark Pact",
            "ru": "отряды Daemon Vehicle, на фазу, после призыва контракта при Dark Pact"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "soulforged-warpack"
      }
    },
    {
      "sid": "d5097c0b-09a5-4a90-821f-58d20bf7f336",
      "kind": "enhancement",
      "name": "Conduit of Chaos",
      "det": "Cabal of Chaos",
      "ref": {
        "kind": "enhancement",
        "det": "cabal-of-chaos"
      },
      "hash": "e227d712",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "91ff4c53-0812-4603-b6ac-8c82eb9a44cb",
      "kind": "enhancement",
      "name": "Touched by the Warp",
      "det": "Cabal of Chaos",
      "ref": {
        "kind": "enhancement",
        "det": "cabal-of-chaos"
      },
      "hash": "0f71b1f4",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "f8585ef9-bd3d-4536-99b2-d02ab20921da",
      "kind": "enhancement",
      "name": "Incendiary Goad",
      "det": "Chaos Cult",
      "hash": "fb8f7297",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Damned models, while the bearer's unit is below its Starting Strength",
            "ru": "модели Damned, пока отряд носителя ниже начальной численности"
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Damned models, while that unit is Below Half-strength",
            "ru": "модели Damned, пока отряд ниже половины численности"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "chaos-cult"
      }
    },
    {
      "sid": "b75b9a64-a5bb-4f4d-8f77-1661f71300ab",
      "kind": "enhancement",
      "name": "Living Carapace",
      "det": "Creations of Bile",
      "hash": "b3a94220",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "8d4d1353-1300-47e2-85eb-80baa8e149df",
      "kind": "enhancement",
      "name": "Prime Test Subject",
      "det": "Creations of Bile",
      "hash": "10576f70",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "creations-of-bile"
      }
    },
    {
      "sid": "cbe268b4-d3fc-4235-9e0f-9186b25e74d4",
      "kind": "enhancement",
      "name": "Crown of Worms",
      "det": "Cult of the Arkifane",
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-the-arkifane"
      },
      "hash": "d3937f61",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "f3bde6ed-505b-419d-8db9-5c8d9c4d0bff",
      "kind": "enhancement",
      "name": "Cybinfernal Font",
      "det": "Cult of the Arkifane",
      "ref": {
        "kind": "enhancement",
        "det": "cult-of-the-arkifane"
      },
      "hash": "d4d18f7d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Soul Forge",
          "when": null
        }
      ]
    },
    {
      "sid": "eb2472a2-ce74-4e93-be22-a5e84d02fe04",
      "kind": "enhancement",
      "name": "Cursed Fang",
      "det": "Deceptors",
      "hash": "79e14e04",
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
        "det": "deceptors"
      }
    },
    {
      "sid": "f7646e99-5ac1-483b-92e1-0ff76c88546d",
      "kind": "enhancement",
      "name": "Soul Link",
      "det": "Deceptors",
      "ref": {
        "kind": "enhancement",
        "det": "deceptors"
      },
      "hash": "3241761a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Psyker",
          "when": {
            "en": "while a Character is selected for it in your Command phase",
            "ru": "пока в вашей фазе командования для него выбран персонаж"
          }
        }
      ]
    },
    {
      "sid": "21b97ac4-0081-470d-910f-2e7c4d54b4a7",
      "kind": "enhancement",
      "name": "Ironbound Enmity",
      "det": "Fellhammer Siege-host",
      "hash": "067736ce",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "fellhammer-siege-host"
      }
    },
    {
      "sid": "fcd7d534-d0e1-4aad-9872-32329d49349d",
      "kind": "enhancement",
      "name": "Talisman of Burning Blood",
      "det": "Pactbound Zealots",
      "hash": "b64d0ef0",
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
          "value": "D3",
          "when": {
            "en": "roll a D3 and add that to Attacks and Strength instead, after the unit makes a Dark Pact without failing the Leadership test",
            "ru": "бросьте D3 и добавьте результат к атакам и силе вместо +1, после Dark Pact без провала теста лидерства"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "pactbound-zealots"
      }
    },
    {
      "sid": "e6de1854-8e17-4bec-aa86-2a3c67c1fb36",
      "kind": "enhancement",
      "name": "Empyric Symbiote",
      "det": "Renegade Warband",
      "hash": "aaf5301a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "renegade-warband"
      }
    },
    {
      "sid": "163a57f4-8b75-4ef4-b9db-bc8272981dd2",
      "kind": "enhancement",
      "name": "Invigorated Mechatendrils",
      "det": "Soulforged Warpack",
      "ref": {
        "kind": "enhancement",
        "det": "soulforged-warpack"
      },
      "hash": "e676a300",
      "ver": 925,
      "reviewed": false,
      "effects": []
    },
    {
      "sid": "93079aa9-a7c7-4192-85b8-5e2375c6f36f",
      "kind": "enhancement",
      "name": "Tempting Addendum",
      "det": "Soulforged Warpack",
      "hash": "d4be7be1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "soulforged-warpack"
      }
    },
    {
      "sid": "be6c68b6-1a7c-43f4-a442-0f16d5c2567b",
      "kind": "enhancement",
      "name": "Eager for Vengeance",
      "det": "Veterans of the Long War",
      "hash": "6bb482b1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "veterans-of-the-long-war"
      }
    },
    {
      "sid": "992754f1-6976-4e97-88ac-c42b83f54d8e",
      "kind": "enhancement",
      "name": "Tzagulla",
      "det": "Warpstrike Champions",
      "hash": "01b61388",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": null
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "until the end of the turn the bearer's unit arrives from Reserves",
            "ru": "до конца хода, в котором отряд носителя прибыл из резерва"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warpstrike-champions"
      }
    }
  ]
}
