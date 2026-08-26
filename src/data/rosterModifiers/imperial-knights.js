// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "imperial-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "3f9c1564-47ce-409b-a7f4-f481995c3eba:acastus-knight-asterius",
      "kind": "ability",
      "name": "Acastus Knight Asterius: Sunderer of Fortresses",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "acastus-knight-asterius"
      },
      "hash": "caeb868f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against VEHICLE targets",
            "ru": "против целей VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": {
            "en": "against VEHICLE targets",
            "ru": "против целей VEHICLE"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against FORTIFICATION targets, instead",
            "ru": "против целей FORTIFICATION, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 0
        },
        {
          "on": "weapon",
          "stat": "d",
          "op": "add",
          "value": 2,
          "when": {
            "en": "against FORTIFICATION targets, instead",
            "ru": "против целей FORTIFICATION, вместо этого"
          },
          "cond": [
            "never"
          ],
          "alt": 1
        }
      ]
    },
    {
      "sid": "9c2a6964-1173-4f07-b6fb-61b511a289ca:acastus-knight-porphyrion",
      "kind": "ability",
      "name": "Acastus Knight Porphyrion: Bastion of Firepower",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "acastus-knight-porphyrion"
      },
      "hash": "4668776e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "f424f742-514f-4a36-80df-7c2d85459bde:armiger-warglaive",
      "kind": "ability",
      "name": "Armiger Warglaive: Impetuous Glory",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "armiger-warglaive"
      },
      "hash": "47334b3a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Reaper chain-cleaver – strike"
          },
          "when": {
            "en": "until the end of a turn it made a Charge move",
            "ru": "до конца хода, в котором совершил Charge"
          },
          "cond": [
            "unit-charged"
          ]
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "only": {
            "name": "Reaper chain-cleaver – sweep"
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
      "sid": "aeea8aeb-0ac6-45c7-9533-1b1ab816c4b3:cerastus-knight-atrapos",
      "kind": "ability",
      "name": "Cerastus Knight Atrapos: Macro-extinction Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cerastus-knight-atrapos"
      },
      "hash": "3bd42904",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f39640a0-0be0-4669-9625-e900e652b5cd:cerastus-knight-castigator",
      "kind": "ability",
      "name": "Cerastus Knight Castigator: Castigator’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "cerastus-knight-castigator"
      },
      "hash": "4f3e0a39",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
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
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "80f8e567-a894-4b05-a8c4-84562e59a234:knight-crusader",
      "kind": "ability",
      "name": "Knight Crusader: Crusader’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-crusader"
      },
      "hash": "6f8e1f0b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4b660a3d-ca9c-4fd9-9b15-c33038a405e9:knight-crusader",
      "kind": "ability",
      "name": "Knight Crusader: Punishing Salvoes",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-crusader"
      },
      "hash": "ae82eb32",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "after Remaining Stationary",
            "ru": "после того как остался на месте"
          },
          "cond": [
            "unit-stationary"
          ]
        }
      ]
    },
    {
      "sid": "d138a7b1-af83-4fb6-9a66-288a661a4652:knight-defender",
      "kind": "ability",
      "name": "Knight Defender: Defender’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-defender"
      },
      "hash": "c17a033d",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1f762088-19de-49cd-984b-10d5382c0aae:knight-defender",
      "kind": "ability",
      "name": "Knight Defender: Selfless Protector",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-defender"
      },
      "hash": "06c55af6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7251453d-a731-4021-86a2-71958fe457d0:knight-destrier",
      "kind": "ability",
      "name": "Knight Destrier: Saturation Fire",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-destrier"
      },
      "hash": "a699f303",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "against a unit within range of an objective marker",
            "ru": "по отряду в зоне objective marker"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2de370eb-b169-48ea-959d-dece35b44f60:knight-destrier",
      "kind": "ability",
      "name": "Knight Destrier: Thundercharge",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-destrier"
      },
      "hash": "35ec668e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if equipped with a thundershock spear and a bellatus reaper chainsword",
            "ru": "если взяты thundershock spear и bellatus reaper chainsword"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d68cc907-a492-48aa-b9ff-432413214dea:knight-errant",
      "kind": "ability",
      "name": "Knight Errant: Aggressive Assault",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-errant"
      },
      "hash": "0720840a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "200c9140-fdf9-47f1-a316-0aba3c73a7e1:knight-errant",
      "kind": "ability",
      "name": "Knight Errant: Errant’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-errant"
      },
      "hash": "5d864fd8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "04171555-119d-4e8d-9fc5-da079ee2ba0d:knight-paladin",
      "kind": "ability",
      "name": "Knight Paladin: Paladin’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-paladin"
      },
      "hash": "94113518",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "da35410e-2b9a-493b-91e9-b6919e95c808:knight-paladin",
      "kind": "ability",
      "name": "Knight Paladin: Seasoned Noble",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-paladin"
      },
      "hash": "246d709f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "against the closest eligible target",
            "ru": "против ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "5aa7850c-9706-4cfc-882e-1f13f35377f4:knight-warden",
      "kind": "ability",
      "name": "Knight Warden: Thin Their Ranks",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-warden"
      },
      "hash": "65aace2d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "against targets other than MONSTERS and VEHICLES",
            "ru": "по целям, кроме MONSTER и VEHICLE"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "752308c2-6d98-4e01-b5c0-214087d6b7c7:knight-warden",
      "kind": "ability",
      "name": "Knight Warden: Warden’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-warden"
      },
      "hash": "50056bb5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
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
            "en": "while affected by this Bondsman ability",
            "ru": "пока действует эта способность Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "e7906e65-df90-4d9c-905b-6da98acc422b:questoris-knight-magaera",
      "kind": "ability",
      "name": "Questoris Knight Magaera: Magaera’s Duty",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "questoris-knight-magaera"
      },
      "hash": "2782d971",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while affected by this Bondsman ability, against the closest eligible target",
            "ru": "пока действует эта способность Bondsman, против ближайшей допустимой цели"
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
            "en": "while affected by this Bondsman ability, against the closest eligible target",
            "ru": "пока действует эта способность Bondsman, против ближайшей допустимой цели"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "d730aed0-8e77-4c83-9b91-91693829eedd:questoris-knight-styrix",
      "kind": "ability",
      "name": "Questoris Knight Styrix: Grav-pinned",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "questoris-knight-styrix"
      },
      "hash": "1ffdb6a3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "bc62b0fd-75e6-4669-b3af-e9d8d2a2a09b",
      "kind": "armyRule",
      "name": "Code Chivalric",
      "det": null,
      "hash": "69950e51",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "if that Quality was chosen for the army's Oath",
            "ru": "если для клятвы армии выбрано соответствующее Качество"
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
      "sid": "dfb05b81-7309-43ab-919a-891e1c57f817",
      "kind": "armyRule",
      "name": "Freeblades",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "a4a07af3",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied models may be included"
    },
    {
      "sid": "c9b67ad0-1baf-45c0-9687-11626725f299",
      "kind": "detachmentRule",
      "name": "Knights of Legend",
      "det": "Freeblade Company",
      "ref": {
        "kind": "detachmentRule",
        "det": "freeblade-company"
      },
      "hash": "fdd1bf22",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "when": null
        }
      ]
    },
    {
      "sid": "3cf0eb6d-3049-4885-acd0-632ad39be4bb",
      "kind": "detachmentRule",
      "name": "Dauntless Defenders",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "gate-warden-lance"
      },
      "hash": "99549537",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "while the unit is on your defensive line",
            "ru": "пока отряд на вашей оборонительной линии"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "130c7836-0755-460c-90c3-d8a3730f42c5",
      "kind": "detachmentRule",
      "name": "Cogbound Alliance",
      "det": "Questor Forgepact",
      "ref": {
        "kind": "detachmentRule",
        "det": "questor-forgepact",
        "scopes": [
          {
            "targets": [
              "ADEPTUS MECHANICUS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "450f424e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3fa314f7-a382-44fa-8ebe-7150a64f03a0",
      "kind": "detachmentRule",
      "name": "Driven from their Lairs",
      "det": "Throne-bonded Outriders",
      "ref": {
        "kind": "detachmentRule",
        "det": "throne-bonded-outriders"
      },
      "hash": "0d9a81e5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "while that ARMIGER unit is affected by a Bondsman ability",
            "ru": "пока юнит ARMIGER находится под действием способности Bondsman"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4b2087c8-50f6-4468-80b5-fa67827c8167",
      "kind": "detachmentRule",
      "name": "Bold Gallantry",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "valourstrike-lance"
      },
      "hash": "7869ed29",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "until the end of the turn in which an Imperial Knights unit Advanced",
            "ru": "до конца хода, в котором юнит Imperial Knights совершил Advance"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ]
    },
    {
      "sid": "5ee94026-3b68-4f72-b840-8e69eb1dc02d",
      "kind": "enhancement",
      "name": "Blessed Plate",
      "det": "Dominus Foebreakers",
      "ref": {
        "kind": "enhancement",
        "det": "dominus-foebreakers"
      },
      "hash": "43e94a04",
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
      "sid": "e7d774f1-6f22-4767-a7ef-4a430a90b70d",
      "kind": "enhancement",
      "name": "Bringer of Justice",
      "det": "Freeblade Company",
      "hash": "d45a4f80",
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
        "det": "freeblade-company"
      }
    },
    {
      "sid": "0e5596b1-2034-4c60-9e46-8d6126057c8b",
      "kind": "enhancement",
      "name": "Hunter’s Eye",
      "det": "Freeblade Company",
      "ref": {
        "kind": "enhancement",
        "det": "freeblade-company"
      },
      "hash": "ba5303da",
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
      "sid": "062c115d-820f-4719-829e-0df211f841e9",
      "kind": "enhancement",
      "name": "Mysterious Guardian",
      "det": "Freeblade Company",
      "ref": {
        "kind": "enhancement",
        "det": "freeblade-company"
      },
      "hash": "3ce15cdd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "45391896-5ae3-4cb5-a2fe-d3f400f7f454",
      "kind": "enhancement",
      "name": "Sanctuary",
      "det": "Freeblade Company",
      "hash": "e29a6d74",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "freeblade-company"
      }
    },
    {
      "sid": "2085c68c-e175-4f84-9196-5aefcc3e6fda",
      "kind": "enhancement",
      "name": "Augury Halo",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "enhancement",
        "det": "gate-warden-lance"
      },
      "hash": "74db5b0f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": {
            "en": "per ranged attack, while the bearer is on your defensive line",
            "ru": "за стрелковую атаку, пока носитель на вашей оборонительной линии"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "ece354bb-d294-47aa-bff4-efb684b77443",
      "kind": "enhancement",
      "name": "Knight of the Opus Machina (Aura)",
      "det": "Questor Forgepact",
      "ref": {
        "kind": "enhancement",
        "det": "questor-forgepact",
        "scopes": [
          {
            "targets": [
              "ADEPTUS MECHANICUS"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "5f1d6155",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "target": "aura",
          "when": null
        },
        {
          "on": "melee",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "target": "aura",
          "when": null
        }
      ]
    },
    {
      "sid": "3e7ec35c-7e28-40fd-99ad-6326fe7d3101",
      "kind": "enhancement",
      "name": "Pennant of Silvered Fury",
      "det": "Questoris Companions",
      "ref": {
        "kind": "enhancement",
        "det": "questoris-companions"
      },
      "hash": "4c4d9894",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "once per battle, for the phase the bearer uses this Enhancement in",
            "ru": "раз за битву, на фазу, в которой носитель использовал улучшение"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a0317440-3ea2-4b33-9f51-fa195f50471f",
      "kind": "enhancement",
      "name": "Fables of Nightmare",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "enhancement",
        "det": "spearhead-at-arms"
      },
      "hash": "14772b20",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5e130c62-8760-4161-8090-b0b5a1e49cc0",
      "kind": "enhancement",
      "name": "Bearer of the Evanescent Ion",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "enhancement",
        "det": "valourstrike-lance"
      },
      "hash": "83560bfd",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "464d34c9-9ef4-4120-9894-b08d3263286a",
      "kind": "enhancement",
      "name": "Bearer of the Judicant’s Helm",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "enhancement",
        "det": "valourstrike-lance"
      },
      "hash": "7db4a32e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9e203a34-7bd6-4faa-966a-a5380a7bad91",
      "kind": "stratagem",
      "name": "Foebreaker Firestorm",
      "det": "Dominus Foebreakers",
      "ref": {
        "kind": "stratagem",
        "det": "dominus-foebreakers",
        "name": "Foebreaker Firestorm"
      },
      "hash": "1dd594cf",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "tag": "BLAST"
          },
          "when": {
            "en": "while this stratagem is in force (those weapons lose [BLAST])",
            "ru": "пока действует стратагема (оружие теряет [BLAST])"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "65caee89-44d0-49a2-81b0-33e12539c898",
      "kind": "stratagem",
      "name": "Ground-shaking Strides",
      "det": "Dominus Foebreakers",
      "ref": {
        "kind": "stratagem",
        "det": "dominus-foebreakers",
        "name": "Ground-shaking Strides"
      },
      "hash": "6ed179bb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
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
      "sid": "752b879c-a9ec-43a4-ac22-7cf12eb041db",
      "kind": "stratagem",
      "name": "Full Tilt",
      "det": "Freeblade Company",
      "ref": {
        "kind": "stratagem",
        "det": "freeblade-company",
        "name": "Full Tilt"
      },
      "hash": "54433eba",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll); 9\" instead for an ARMIGER",
            "ru": "в фазе с Advance (без броска); 9\" для ARMIGER"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "49bf6432-d81b-4a7d-bab4-4c93e6be389f",
      "kind": "stratagem",
      "name": "Marshal the Defence",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "stratagem",
        "det": "gate-warden-lance",
        "name": "Marshal the Defence"
      },
      "hash": "2db12b9a",
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
      "dur": "phase"
    },
    {
      "sid": "63028ff5-5ce3-403b-8b32-b0fa7d0af6f0",
      "kind": "stratagem",
      "name": "Titanic Bombardment",
      "det": "Gate Warden Lance",
      "ref": {
        "kind": "stratagem",
        "det": "gate-warden-lance",
        "name": "Titanic Bombardment"
      },
      "hash": "ddd9b3d1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 2",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "df5c9648-052a-4751-b58e-b2301869bede",
      "kind": "stratagem",
      "name": "Omnissiah’s Grace",
      "det": "Questor Forgepact",
      "ref": {
        "kind": "stratagem",
        "det": "questor-forgepact",
        "name": "Omnissiah’s Grace"
      },
      "hash": "5967579f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+ (vs mortal wounds)",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "2144578e-ef9a-4a05-b8fe-60b1e114b511",
      "kind": "stratagem",
      "name": "Courageous Stand",
      "det": "Questoris Companions",
      "ref": {
        "kind": "stratagem",
        "det": "questoris-companions",
        "name": "Courageous Stand"
      },
      "hash": "37f47123",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 6+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "591c5831-b960-4ea7-8749-a4edadb3da4c",
      "kind": "stratagem",
      "name": "Titanic Duel",
      "det": "Questoris Companions",
      "ref": {
        "kind": "stratagem",
        "det": "questoris-companions",
        "name": "Titanic Duel"
      },
      "hash": "f011ffa7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8d4a096d-8753-4149-833d-339072d21ac9",
      "kind": "stratagem",
      "name": "Exemplar’s Wisdom",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "stratagem",
        "det": "spearhead-at-arms",
        "name": "Exemplar’s Wisdom"
      },
      "hash": "1b2dd438",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1b44d8dd-5034-4f88-b828-2034d485fe6d",
      "kind": "stratagem",
      "name": "Let Duty Be Your Shield",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "stratagem",
        "det": "spearhead-at-arms",
        "name": "Let Duty Be Your Shield"
      },
      "hash": "1f76c246",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "a3b426d3-9acd-46b2-b2b6-67d5494d5a3a",
      "kind": "stratagem",
      "name": "Thin Their Ranks",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "stratagem",
        "det": "spearhead-at-arms",
        "name": "Thin Their Ranks"
      },
      "hash": "526e0dfc",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
          "when": {
            "en": "ARMIGER models only",
            "ru": "только модели ARMIGER"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "604bd57f-0040-461c-b11c-9302c9a85795",
      "kind": "stratagem",
      "name": "Virtue of Courage",
      "det": "Spearhead-at-Arms",
      "ref": {
        "kind": "stratagem",
        "det": "spearhead-at-arms",
        "name": "Virtue of Courage"
      },
      "hash": "bbe60db7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3f80ee20-b7bc-446b-be65-f81e6acd1385",
      "kind": "stratagem",
      "name": "Full Tilt",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "stratagem",
        "det": "valourstrike-lance",
        "name": "Full Tilt"
      },
      "hash": "ce37d637",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase it Advanced (no Advance roll); 9\" instead for an ARMIGER",
            "ru": "в фазе с Advance (без броска); 9\" для ARMIGER"
          },
          "cond": [
            "unit-advanced"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "c4518bd6-6ce8-49bc-bbd2-ad7688440c35",
      "kind": "stratagem",
      "name": "Rotate Ion Shields",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "stratagem",
        "det": "valourstrike-lance",
        "name": "Rotate Ion Shields"
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
      "sid": "c18eaed3-595f-4ffe-bb0d-3e8f2c579b6a",
      "kind": "stratagem",
      "name": "Run Them Through!",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "stratagem",
        "det": "valourstrike-lance",
        "name": "Run Them Through!"
      },
      "hash": "49ac72bc",
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
      "sid": "73aa6ecc-ae27-48d6-9d19-67e8eceb7db1",
      "kind": "stratagem",
      "name": "Thunderstomp",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "stratagem",
        "det": "valourstrike-lance",
        "name": "Thunderstomp"
      },
      "hash": "84f6fcff",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "8",
          "only": {
            "name": "Armoured feet"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "melee",
          "stat": "a",
          "op": "set",
          "value": "12",
          "only": {
            "name": "Titanic feet"
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
      "sid": "b63ed631-b1ba-4ef5-b407-60fc90e7aee0",
      "kind": "stratagem",
      "name": "Vow of Retribution",
      "det": "Valourstrike Lance",
      "ref": {
        "kind": "stratagem",
        "det": "valourstrike-lance",
        "name": "Vow of Retribution"
      },
      "hash": "5d6c4cb7",
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
    }
  ]
}
