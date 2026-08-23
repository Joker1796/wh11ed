// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "genestealer-cults",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "03af0fc0-6c26-48af-83e0-fa6060aeaa40:achilles-ridgerunners",
      "kind": "ability",
      "name": "Achilles Ridgerunners: Crossfire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "achilles-ridgerunners"
      },
      "hash": "bb57ed5e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "78c4722f-e85f-4711-b4f8-4a2fd144aa3c:acolyte-iconward",
      "kind": "ability",
      "name": "Acolyte Iconward: Nexus of Devotion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "acolyte-iconward"
      },
      "hash": "84109d35",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3f241c29-b6ef-42bb-a5c4-21ba949e7963:benefictus",
      "kind": "ability",
      "name": "Benefictus: Bio‐horror Disruption",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "benefictus"
      },
      "hash": "43cbb91e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "dd83e9d1-2776-4f37-86a3-2bc688cab040:benefictus",
      "kind": "ability",
      "name": "Benefictus: Psionic Shield",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "benefictus"
      },
      "hash": "b8c2ff80",
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
        }
      ]
    },
    {
      "sid": "6f6a9bfc-98b4-4cb9-965b-27c4adb7d4b9:biophagus",
      "kind": "ability",
      "name": "Biophagus: Biological Warfare",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biophagus"
      },
      "hash": "eb80a84d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Injector goad"
          },
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
          "stat": "d",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Injector goad"
          },
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
      "sid": "ddc1b543-9402-48c8-87aa-89d5b50d25be:biophagus",
      "kind": "ability",
      "name": "Biophagus: Twisted Science",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biophagus"
      },
      "hash": "d2a9d0ad",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "cbcf55d0-953b-4bc4-b374-7d6ab4f3a268:claw-of-ascension-achilles-ridgerunner",
      "kind": "ability",
      "name": "Claw of Ascension Achilles Ridgerunner: Crossfire",
      "det": null,
      "ref": null,
      "hash": "d30ad47d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c08a3b23-279d-4a26-b01f-2f6c41aa60af:locus",
      "kind": "ability",
      "name": "Locus: Bodyguard",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "locus"
      },
      "hash": "6e31de92",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8cfd92c9-55d5-491d-b50d-719ab02e443e:locus",
      "kind": "ability",
      "name": "Locus: Sudden Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "locus"
      },
      "hash": "f54f8f52",
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
      "sid": "40bcdab4-08ee-48d9-a197-d5be1748f7aa:magus",
      "kind": "ability",
      "name": "Magus: Psychic Familiar",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "magus"
      },
      "hash": "30bf8a33",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "845b6f18-3061-4e1d-b8c7-175fbfca25ac:patriarch",
      "kind": "ability",
      "name": "Patriarch: Might From Beyond",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "patriarch"
      },
      "hash": "a184123b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "666a876e-6d72-44f5-87c2-7cef96d2d540:patriarch",
      "kind": "ability",
      "name": "Patriarch: Psychic Familiar",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "patriarch"
      },
      "hash": "6987189b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b4d10d6c-d53c-467c-a367-298fc3433418:primus",
      "kind": "ability",
      "name": "Primus: Cult Demagogue",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "primus"
      },
      "hash": "10806b5a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bb51fe29-292d-4c77-a593-ea15daa0d3e3",
      "kind": "detachmentRule",
      "name": "Hypermorphic Fury",
      "det": "Biosanctic Broodsurge",
      "hash": "364caafb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Aberrants, Biophagus and Purestrain Genestealers units, in a Fight phase after making a Charge move",
            "ru": "отряды Aberrants, Biophagus и Purestrain Genestealers, в фазе боя после чарджа"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "biosanctic-broodsurge"
      }
    },
    {
      "sid": "692e28b8-13f6-4464-80ad-d4dca1f1d287",
      "kind": "detachmentRule",
      "name": "Brood Brothers",
      "det": "Brood Brothers Auxilia",
      "ref": {
        "kind": "detachmentRule",
        "det": "brood-brothers-auxilia"
      },
      "hash": "e1143466",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — allied allowance and its exclusions"
    },
    {
      "sid": "d9d6cbe6-3df2-4a10-be73-424fe1d490c5",
      "kind": "detachmentRule",
      "name": "Integrated Tactics",
      "det": "Brood Brothers Auxilia",
      "hash": "8afd11d5",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "brood-brothers-auxilia"
      }
    },
    {
      "sid": "7767306f-ad29-4d17-8510-f5dcb2a06f78",
      "kind": "detachmentRule",
      "name": "Psionic Parasitism",
      "det": "Final Day",
      "hash": "14212d1a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "final-day"
      }
    },
    {
      "sid": "4947e8db-c886-450b-a59c-4e3455f2d533",
      "kind": "detachmentRule",
      "name": "A Perfect Ambush",
      "det": "Host of Ascension",
      "ref": {
        "kind": "detachmentRule",
        "det": "host-of-ascension"
      },
      "hash": "dfb73c3c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "until the end of your next Fight phase after that unit arrives as Reinforcements",
            "ru": "до конца вашей следующей фазы боя после прибытия отряда из резерва"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "until the end of your next Fight phase after that unit arrives as Reinforcements",
            "ru": "до конца вашей следующей фазы боя после прибытия отряда из резерва"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ]
    },
    {
      "sid": "ccfe9240-89b1-433e-a3b9-e7557e36d2a6",
      "kind": "detachmentRule",
      "name": "Rapid Takeover",
      "det": "Outlander Claw",
      "hash": "912340d2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Mounted and Vehicle models, while not Battle-shocked",
            "ru": "модели Mounted и Vehicle, пока не Battle-shocked"
          },
          "cond": [
            "unit-not-battle-shocked"
          ],
          "scope": 0
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "outlander-claw"
      }
    },
    {
      "sid": "b58f14db-dd11-4e6c-80f0-7e3915af5840",
      "kind": "detachmentRule",
      "name": "Unquestioning Fanaticism",
      "det": "Xenocreed Congregation",
      "ref": {
        "kind": "detachmentRule",
        "det": "xenocreed-congregation"
      },
      "hash": "2174a241",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4554e2a3-cef7-4ce5-97a6-20c3a3389180",
      "kind": "enhancement",
      "name": "Alien Majesty",
      "det": "Biosanctic Broodsurge",
      "ref": {
        "kind": "enhancement",
        "det": "biosanctic-broodsurge"
      },
      "hash": "e7e2571e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3f4c0ade-9d77-49c0-915b-29b7e942703c",
      "kind": "enhancement",
      "name": "Biomorph Adaptation",
      "det": "Biosanctic Broodsurge",
      "hash": "4223c31d",
      "ver": 925,
      "reviewed": true,
      "effects": [
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
        "det": "biosanctic-broodsurge"
      }
    },
    {
      "sid": "175dea26-cb65-4e86-be1c-5a1bb166f8ac",
      "kind": "enhancement",
      "name": "Predatory Instincts",
      "det": "Biosanctic Broodsurge",
      "ref": {
        "kind": "enhancement",
        "det": "biosanctic-broodsurge"
      },
      "hash": "2680efcf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e01ab9b2-f087-4e37-9b71-1cc22a578c83",
      "kind": "enhancement",
      "name": "Martial Espionage",
      "det": "Brood Brothers Auxilia",
      "hash": "88e4b31d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "brood-brothers-auxilia"
      }
    },
    {
      "sid": "e95ab1e2-a777-46ae-af4e-8beea260091c",
      "kind": "enhancement",
      "name": "The Hero Returned",
      "det": "Brood Brothers Auxilia",
      "hash": "8ef27e44",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "brood-brothers-auxilia"
      }
    },
    {
      "sid": "e7fc2192-7062-46ff-a419-4fd5045ddf1f",
      "kind": "enhancement",
      "name": "Heavy Munitions",
      "det": "Claw of Ascension",
      "ref": null,
      "hash": "79c5cf6b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Achilles missile launcher"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Achilles missile launcher"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "only": {
            "name": "Achilles missile launcher"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "2bcf475c-6bb6-4b44-83d7-f0c8832afc0d",
      "kind": "enhancement",
      "name": "Inhuman Integration",
      "det": "Final Day",
      "ref": {
        "kind": "enhancement",
        "det": "final-day"
      },
      "hash": "04560364",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while targeting an enemy unit within 6\" of a friendly Tyranids unit",
            "ru": "пока целью является отряд противника в пределах 6\" от дружественного отряда Tyranids"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ab3c5d79-10c6-469d-a00f-ecf411b344ed",
      "kind": "enhancement",
      "name": "Vanguard Tyrant",
      "det": "Final Day",
      "hash": "7fe0b929",
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
        "det": "final-day"
      }
    },
    {
      "sid": "75a729bf-56a4-44c1-9afd-f91861a38ba9",
      "kind": "enhancement",
      "name": "Contraband Munitions",
      "det": "Heroes of the Uprising",
      "ref": {
        "kind": "enhancement",
        "det": "heroes-of-the-uprising"
      },
      "hash": "c8aed89b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        }
      ]
    },
    {
      "sid": "41aca640-4f20-4528-8342-11821d5aefa3",
      "kind": "enhancement",
      "name": "Gene-tailored Toxins",
      "det": "Heroes of the Uprising",
      "ref": {
        "kind": "enhancement",
        "det": "heroes-of-the-uprising"
      },
      "hash": "bde455d0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "0cc09514-6805-4a02-84ac-40b66bad5d9d",
      "kind": "enhancement",
      "name": "A Chink In Their Armour",
      "det": "Host of Ascension",
      "ref": {
        "kind": "enhancement",
        "det": "host-of-ascension"
      },
      "hash": "9d8852ff",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "until the end of your next Fight phase after the bearer arrives as Reinforcements",
            "ru": "до конца вашей следующей фазы боя после прибытия носителя из резерва"
          },
          "cond": [
            "unit-arrived-from-reserves"
          ]
        }
      ]
    },
    {
      "sid": "fdcaf518-62e4-4b42-8452-32bd9d786dd4",
      "kind": "enhancement",
      "name": "Assassination Edict",
      "det": "Host of Ascension",
      "hash": "80b09c5b",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "host-of-ascension"
      }
    },
    {
      "sid": "9e598472-acd4-48c8-9141-8e722eea543c",
      "kind": "enhancement",
      "name": "Our Time is Nigh",
      "det": "Host of Ascension",
      "hash": "8a5b2e3f",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "host-of-ascension"
      }
    },
    {
      "sid": "4704f5a9-ad36-4f05-a804-59da08a53869",
      "kind": "enhancement",
      "name": "Cartographic Data-leech",
      "det": "Outlander Claw",
      "hash": "bf5bec2d",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "outlander-claw"
      }
    },
    {
      "sid": "4fb6414e-4c63-4843-b06c-ebcb2e5d0469",
      "kind": "enhancement",
      "name": "Mark of the Star Children (Upgrade)",
      "det": "Purestrain Broodswarm",
      "ref": {
        "kind": "enhancement",
        "det": "purestrain-broodswarm"
      },
      "hash": "0529fabb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "profile",
          "stat": "sv",
          "op": "set",
          "value": "4+",
          "when": null
        },
        {
          "on": "melee",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": null
        }
      ]
    },
    {
      "sid": "600d4605-dd14-421c-862c-c10be1906647",
      "kind": "enhancement",
      "name": "Denunciator of Tyrants",
      "det": "Xenocreed Congregation",
      "hash": "5c9be627",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "xenocreed-congregation"
      }
    },
    {
      "sid": "89f9667a-2fe9-43f7-acae-2da2c36fdd58",
      "kind": "stratagem",
      "name": "Gene-twisted Muscle",
      "det": "Biosanctic Broodsurge",
      "ref": {
        "kind": "stratagem",
        "det": "biosanctic-broodsurge",
        "name": "Gene-twisted Muscle"
      },
      "hash": "29fc7b5f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e361c74a-b210-419e-8896-e612c5b2eb1a",
      "kind": "stratagem",
      "name": "Avenge the Star Children",
      "det": "Final Day",
      "ref": {
        "kind": "stratagem",
        "det": "final-day",
        "name": "Avenge the Star Children"
      },
      "hash": "abdfd34a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "265289eb-b508-484a-9f67-0e0aa86cd3e4",
      "kind": "stratagem",
      "name": "Surging Broodworship",
      "det": "Heroes of the Uprising",
      "ref": {
        "kind": "stratagem",
        "det": "heroes-of-the-uprising",
        "name": "Surging Broodworship"
      },
      "hash": "9ac68057",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "KILLER models only",
            "ru": "только модели KILLER"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c76dd692-ec4c-47a9-a699-83ce9fa6f236",
      "kind": "stratagem",
      "name": "Coordinated Trap",
      "det": "Host of Ascension",
      "ref": {
        "kind": "stratagem",
        "det": "host-of-ascension",
        "name": "Coordinated Trap"
      },
      "hash": "ac39cd86",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "2cde0724-fb92-4638-b2b9-ac61fc0bc08c",
      "kind": "stratagem",
      "name": "Close-range Shoot-out",
      "det": "Outlander Claw",
      "ref": {
        "kind": "stratagem",
        "det": "outlander-claw",
        "name": "Close-range Shoot-out"
      },
      "hash": "a0c70c35",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "against targets within 18\"",
            "ru": "против целей в 18\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7e26616d-df7c-434a-a91f-049f78fd0863",
      "kind": "stratagem",
      "name": "Deft Manoeuvring",
      "det": "Outlander Claw",
      "ref": {
        "kind": "stratagem",
        "det": "outlander-claw",
        "name": "Deft Manoeuvring"
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
      "sid": "fb05d738-b1ad-4a65-8c61-878f9e0f5ee4",
      "kind": "stratagem",
      "name": "Devoted Crew",
      "det": "Outlander Claw",
      "ref": {
        "kind": "stratagem",
        "det": "outlander-claw",
        "name": "Devoted Crew"
      },
      "hash": "df9c6903",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ed33177c-e79a-4f2e-b2af-f1c616eefef5",
      "kind": "stratagem",
      "name": "Frenzied Devotion",
      "det": "Xenocreed Congregation",
      "ref": {
        "kind": "stratagem",
        "det": "xenocreed-congregation",
        "name": "Frenzied Devotion"
      },
      "hash": "e009a163",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": {
            "en": "excluding CHARACTER models (their weapons also gain [HAZARDOUS])",
            "ru": "кроме моделей CHARACTER (оружие получает [HAZARDOUS])"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "excluding CHARACTER models (their weapons also gain [HAZARDOUS])",
            "ru": "кроме моделей CHARACTER (оружие получает [HAZARDOUS])"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "33af9d30-cab9-49b0-bb8b-66ac614470c0",
      "kind": "stratagem",
      "name": "Transcendent Celerity",
      "det": "Xenocreed Congregation",
      "ref": {
        "kind": "stratagem",
        "det": "xenocreed-congregation",
        "name": "Transcendent Celerity"
      },
      "hash": "cf9bdcda",
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
      "dur": "phase"
    },
    {
      "sid": "244095c9-a6cb-42da-987f-277997385935",
      "kind": "stratagem",
      "name": "Slunk from the Underbelly",
      "det": "Xenocult Masses",
      "ref": {
        "kind": "stratagem",
        "det": "xenocult-masses",
        "name": "Slunk from the Underbelly"
      },
      "hash": "8562af04",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "61c63ee8-1c41-4e6c-b0e8-5451c154c896:achilles-ridgerunners",
      "kind": "wargear",
      "name": "Achilles Ridgerunners: Flare launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "achilles-ridgerunners",
        "item": "flare launcher"
      },
      "hash": "f9a96d14",
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
      "sid": "ea265349-dc8b-491b-a164-16e0ef1e0a55:achilles-ridgerunners",
      "kind": "wargear",
      "name": "Achilles Ridgerunners: Spotter",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "achilles-ridgerunners",
        "item": "spotter"
      },
      "hash": "b4db684e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "set",
          "value": "3+",
          "when": {
            "en": "the bearer's weapons only",
            "ru": "только оружие носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "8315877d-349f-4db7-8f6d-2122795cdb93:biophagus",
      "kind": "wargear",
      "name": "Biophagus: Alchemicus Familiar",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "biophagus",
        "item": "alchemicus familiar"
      },
      "hash": "8a6ddd66",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}
