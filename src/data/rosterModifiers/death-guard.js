// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "death-guard",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "a85aca60-4e5a-4b05-9866-934d34eed0a0:biologus-putrifier",
      "kind": "ability",
      "name": "Biologus Putrifier: Extraction of Fresh Disease",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biologus-putrifier"
      },
      "hash": "eb9ed48e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 6,
          "when": {
            "en": "for the rest of the battle, once its unit destroyed an enemy unit in melee",
            "ru": "до конца битвы, если отряд уничтожил врага в ближнем бою"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a46a1514-5477-4ae0-a3ad-f4a2fbb893f6:biologus-putrifier",
      "kind": "ability",
      "name": "Biologus Putrifier: Foul Infusion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "biologus-putrifier"
      },
      "hash": "4cfa6e40",
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
      "sid": "bdb8439a-7a42-4525-9cab-0398f290a2f5:blightlord-terminators",
      "kind": "ability",
      "name": "Blightlord Terminators: Blistering Fusillade",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "blightlord-terminators"
      },
      "hash": "593176bd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against Afflicted targets, at Starting Strength 5+ or while led by a CHARACTER",
            "ru": "против Afflicted-целей, при численности 5+ или под лидером CHARACTER"
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
            "en": "against Afflicted targets, at Starting Strength 5+ or while led by a CHARACTER",
            "ru": "против Afflicted-целей, при численности 5+ или под лидером CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6d97e026-65e3-4584-ac0e-e61215f11d07:chaos-predator-destructor",
      "kind": "ability",
      "name": "Chaos Predator Destructor: Hail of Corrosive Disease",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-predator-destructor"
      },
      "hash": "00204fe1",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6f4fdefb-fb32-450e-8d72-7220fd01c2b3:great-unclean-one",
      "kind": "ability",
      "name": "Great Unclean One: Daemon Lord of Nurgle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "great-unclean-one",
        "scopes": [
          {
            "targets": [
              "PLAGUE LEGIONS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "77ae4497",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "3af8d792-b80a-41cd-9e40-8de6b3d0eb24:great-unclean-one",
      "kind": "ability",
      "name": "Great Unclean One: Nurgle’s Rot",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "great-unclean-one"
      },
      "hash": "01c1b74d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bf2dd24a-75a8-49d7-8af0-d12d66dcb813:helbrute",
      "kind": "ability",
      "name": "Helbrute: Diseased Malice",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "helbrute"
      },
      "hash": "d5f5b774",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "e21df5c1-bbd7-441d-930f-2d8a279efe8c:helbrute",
      "kind": "ability",
      "name": "Helbrute: Froth-spattered Frenzy",
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
      "sid": "3da37e42-d76b-4bad-9f1e-eaa47458bde4:icon-bearer",
      "kind": "ability",
      "name": "Icon Bearer: Unclean Icon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "icon-bearer"
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
      "sid": "19d670b0-6d26-4ea0-acf3-afc3e6235ead:lord-of-contagion",
      "kind": "ability",
      "name": "Lord of Contagion: Vector of Disease",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-of-contagion"
      },
      "hash": "73f9ba0e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "73a0bd2d-c779-4bae-b570-b3d0dc2591e5:lord-of-poxes",
      "kind": "ability",
      "name": "Lord of Poxes: Gift of Poxes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "lord-of-poxes"
      },
      "hash": "058f9b55",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "72da3008-253b-46f7-9382-27a58b5c64c9:maggot-lords-deathshroud-terminators",
      "kind": "ability",
      "name": "Maggot Lords Deathshroud Terminators: Obstinate Resistance",
      "det": null,
      "ref": null,
      "hash": "173901da",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while this unit is engaged",
            "ru": "пока отряд в ближнем бою"
          },
          "cond": [
            "unit-engaged"
          ]
        }
      ]
    },
    {
      "sid": "b4450eec-288c-4778-bb01-a366e62b4ff1:mortarion",
      "kind": "ability",
      "name": "Mortarion: Inflamed Reprisal",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "mortarion",
        "scopes": [
          {
            "targets": [
              "DEATH GUARD"
            ],
            "excludes": []
          }
        ],
        "set": "Lord of the Death Guard"
      },
      "hash": "16b5bcee",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "152037ac-ce56-4024-a4d6-59b3d3db6d22:myphitic-blight-hauler",
      "kind": "ability",
      "name": "Myphitic Blight-haulers: Tank Hunters",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "myphitic-blight-hauler"
      },
      "hash": "2a1700b3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b6278fdf-663b-47dd-865f-3f2b78217481:noxious-blightbringer",
      "kind": "ability",
      "name": "Noxious Blightbringer: Sickening Vitality",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "noxious-blightbringer"
      },
      "hash": "af57d362",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "7e8193c1-c4a6-428c-ab02-1505c56ea17f:rotigus",
      "kind": "ability",
      "name": "Rotigus: Deluge of Nurgle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rotigus"
      },
      "hash": "a894725f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7ef32552-0784-46e2-b1e4-4d2355a82e9d:rotigus",
      "kind": "ability",
      "name": "Rotigus: Virulent Blessing",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "rotigus"
      },
      "hash": "5bc95a56",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "13ae6c92-101f-4e20-bcd7-1ea786034eeb",
      "kind": "armyRule",
      "name": "Nurgle’s Gift (Aura)",
      "det": null,
      "hash": "77642218",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "6ee24fba-454f-4bbe-8de5-1974f148d2bc",
      "kind": "detachmentRule",
      "name": "Warped and Rusted Animus",
      "det": "Contagion Engines",
      "ref": {
        "kind": "detachmentRule",
        "det": "contagion-engines"
      },
      "hash": "7111901d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 1,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ],
      "note": "the CONTAGION ENGINE keyword in the first bullet is already carried by conditionalKeywords.json"
    },
    {
      "sid": "9a404cbe-ff89-4583-9b06-49d7926e2e68",
      "kind": "detachmentRule",
      "name": "Reverberant Rancidity",
      "det": "Tallyband Summoners",
      "ref": {
        "kind": "detachmentRule",
        "det": "tallyband-summoners"
      },
      "hash": "f8304ffa",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "grants an ability and extends Contagion Range — neither is a printed characteristic"
    },
    {
      "sid": "8259676b-b493-4d15-b60e-b1922dac0d44",
      "kind": "enhancement",
      "name": "Vile Vigour",
      "det": "Death Lord’s Chosen",
      "ref": {
        "kind": "enhancement",
        "det": "death-lords-chosen"
      },
      "hash": "88966b0f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading a unit",
            "ru": "пока носитель ведёт юнит"
          },
          "cond": [
            "unit-leading"
          ]
        }
      ]
    },
    {
      "sid": "5c3eba83-5786-4320-92e5-b6369e5c0535",
      "kind": "enhancement",
      "name": "Bilemaw Blight",
      "det": "Mortarion’s Hammer",
      "ref": {
        "kind": "enhancement",
        "det": "mortarions-hammer"
      },
      "hash": "36897a57",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 12,
          "when": {
            "en": "the bearer's Plague Wind only, from the start of your Shooting phase until the end of it",
            "ru": "только для Plague Wind носителя, с начала фазы стрельбы до её конца"
          },
          "cond": [
            "phase-shooting"
          ],
          "only": {
            "name": "Plague Wind"
          }
        }
      ]
    },
    {
      "sid": "184bc9b1-4743-4683-bb76-b667e8084f98",
      "kind": "enhancement",
      "name": "Eye of Affliction",
      "det": "Mortarion’s Hammer",
      "ref": {
        "kind": "enhancement",
        "det": "mortarions-hammer"
      },
      "hash": "41e6a5fd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while targeting an Afflicted enemy unit",
            "ru": "пока целью является Afflicted-отряд противника"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "646ffc25-fbc8-4702-82ad-ea7c853e5736",
      "kind": "enhancement",
      "name": "Sorrowsyphon",
      "det": "Shamblerot Vectorium",
      "hash": "823d2ee7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "the bearer's Plague Wind weapon only, while leading a Poxwalkers unit",
            "ru": "только оружие носителя Plague Wind, пока он ведёт отряд Poxwalkers"
          },
          "cond": [
            "never"
          ],
          "only": {
            "name": "Plague Wind"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "89e9fb12-929f-4931-8002-58f48241447d",
      "kind": "enhancement",
      "name": "Talisman of Burgeoning",
      "det": "Shamblerot Vectorium",
      "hash": "aabe56f9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Poxwalkers models in the led unit only",
            "ru": "только модели Poxwalkers в ведомом отряде"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "5d974c69-74c8-4495-8370-f4c9e20d3c4f",
      "kind": "enhancement",
      "name": "Witherbone Pipes",
      "det": "Shamblerot Vectorium",
      "hash": "17b8a289",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "models in the led Poxwalkers unit",
            "ru": "модели ведомого отряда Poxwalkers"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "shamblerot-vectorium"
      }
    },
    {
      "sid": "c61119f2-8aea-4203-ab1b-565c4deacebe",
      "kind": "enhancement",
      "name": "Fell Harvester",
      "det": "Tallyband Summoners",
      "hash": "f2a3864b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "tallyband-summoners"
      }
    },
    {
      "sid": "c717fc16-3d50-4312-af50-9d7653c5266a",
      "kind": "enhancement",
      "name": "Tome of Bounteous Blessings",
      "det": "Tallyband Summoners",
      "hash": "bcc26027",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "tallyband-summoners"
      }
    },
    {
      "sid": "572b6378-e1cf-433c-841b-015a715aed94",
      "kind": "enhancement",
      "name": "Furnace of Plagues",
      "det": "Virulent Vectorium",
      "hash": "12901bea",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "virulent-vectorium"
      }
    },
    {
      "sid": "2227edbd-9daa-457f-9cda-f545297ba2ea",
      "kind": "stratagem",
      "name": "Grotesque Fortitude",
      "det": "Champions of Contagion",
      "ref": {
        "kind": "stratagem",
        "det": "champions-of-contagion",
        "name": "Grotesque Fortitude"
      },
      "hash": "863e953f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2af32987-7344-4378-8eff-a42b8ec9f2f8",
      "kind": "stratagem",
      "name": "Blooming Pestilence",
      "det": "Death Lord’s Chosen",
      "ref": {
        "kind": "stratagem",
        "det": "death-lords-chosen",
        "name": "Blooming Pestilence"
      },
      "hash": "988ac824",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "da30d4bd-ad4d-41e5-bafb-5322aa227053",
      "kind": "stratagem",
      "name": "Mortarion’s Teachings",
      "det": "Death Lord’s Chosen",
      "ref": {
        "kind": "stratagem",
        "det": "death-lords-chosen",
        "name": "Mortarion’s Teachings"
      },
      "hash": "24a1a271",
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
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "HEAVY",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "14397813-9386-479d-8645-ccf59904570a",
      "kind": "stratagem",
      "name": "Eye of the Swarm",
      "det": "Flyblown Host",
      "ref": {
        "kind": "stratagem",
        "det": "flyblown-host",
        "name": "Eye of the Swarm"
      },
      "hash": "9d570fd5",
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
      "sid": "95ec357c-cf7f-4f5e-a224-85d5da35b084",
      "kind": "stratagem",
      "name": "Vomitous Salvoes",
      "det": "Maggot Lords",
      "ref": null,
      "hash": "cd84fbc1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "only": {
            "tag": "LETHAL HITS"
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
      "sid": "e91eb4ac-52af-4e89-abc2-5c0b9e812e5c",
      "kind": "stratagem",
      "name": "Font of Filth",
      "det": "Mortarion’s Hammer",
      "ref": {
        "kind": "stratagem",
        "det": "mortarions-hammer",
        "name": "Font of Filth"
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
      "sid": "25ba3f85-9261-4154-9014-fcf2a28390cf",
      "kind": "stratagem",
      "name": "Territorial Infection",
      "det": "Paragons of Putrescence",
      "ref": {
        "kind": "stratagem",
        "det": "paragons-of-putrescence",
        "name": "Territorial Infection"
      },
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
      "sid": "1c06212d-4fb6-4992-94cb-32dd22c30052",
      "kind": "stratagem",
      "name": "Gnawing Hunger",
      "det": "Shamblerot Vectorium",
      "ref": {
        "kind": "stratagem",
        "det": "shamblerot-vectorium",
        "name": "Gnawing Hunger"
      },
      "hash": "8cfcb7d2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
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
      "dur": "turn"
    },
    {
      "sid": "ea30e94c-cf87-4f02-8210-0fb635615b18",
      "kind": "stratagem",
      "name": "Disgustingly Resilient",
      "det": "Virulent Vectorium",
      "ref": {
        "kind": "stratagem",
        "det": "virulent-vectorium",
        "name": "Disgustingly Resilient"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "699e5a6d-243c-4ee3-a738-ce0882694238",
      "kind": "stratagem",
      "name": "Plaguesurge",
      "det": "Virulent Vectorium",
      "ref": {
        "kind": "stratagem",
        "det": "virulent-vectorium",
        "name": "Plaguesurge"
      },
      "hash": "ac9574f8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5028ed26-8ff1-4fc8-b844-168659f516ac:deathshroud-terminators",
      "kind": "wargear",
      "name": "Deathshroud Terminators: Icon of Despair (Aura)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "deathshroud-terminators",
        "item": "icon of despair (aura)"
      },
      "hash": "af21f335",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:plague-drones",
      "kind": "wargear",
      "name": "Plague Drones: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plague-drones",
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
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:plague-drones",
      "kind": "wargear",
      "name": "Plague Drones: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plague-drones",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5028ed26-8ff1-4fc8-b844-168659f516ac:plague-marines",
      "kind": "wargear",
      "name": "Plague Marines: Icon of Despair (Aura)",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plague-marines",
        "item": "icon of despair (aura)"
      },
      "hash": "af21f335",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "79b389ec-f1c4-42b1-833d-4e1b86817377:plaguebearers",
      "kind": "wargear",
      "name": "Plaguebearers: Daemonic Icon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plaguebearers",
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
      "sid": "e77cb7d8-d6cd-472a-a771-91fee3e48bcd:plaguebearers",
      "kind": "wargear",
      "name": "Plaguebearers: Instrument of Chaos",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "plaguebearers",
        "item": "instrument of chaos"
      },
      "hash": "9fccd872",
      "ver": 925,
      "reviewed": true,
      "effects": []
    }
  ]
}
