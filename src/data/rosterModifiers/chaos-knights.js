// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "chaos-knights",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "3f9c1564-47ce-409b-a7f4-f481995c3eba:chaos-acastus-knight-asterius",
      "kind": "ability",
      "name": "Chaos Acastus Knight Asterius: Sunderer of Fortresses",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-acastus-knight-asterius"
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
      "sid": "9c2a6964-1173-4f07-b6fb-61b511a289ca:chaos-acastus-knight-porphyrion",
      "kind": "ability",
      "name": "Chaos Acastus Knight Porphyrion: Bastion of Firepower",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-acastus-knight-porphyrion"
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
      "sid": "aeea8aeb-0ac6-45c7-9533-1b1ab816c4b3:chaos-cerastus-knight-atrapos",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Atrapos: Macro-extinction Protocols",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-atrapos"
      },
      "hash": "3bd42904",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "86129fd1-2639-453b-a311-4342e7a63f3e:chaos-cerastus-knight-castigator",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Castigator: Offerings for the Dark Gods",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-castigator"
      },
      "hash": "918261ea",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "8029af3f-904f-40d7-91d1-02a270ec8c6e:chaos-cerastus-knight-lancer",
      "kind": "ability",
      "name": "Chaos Cerastus Knight Lancer: Dark Fervour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-cerastus-knight-lancer"
      },
      "hash": "598022d2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "02ebb3f0-e94d-440c-ba3f-f3cf219da220:chaos-questoris-knight-magaera",
      "kind": "ability",
      "name": "Chaos Questoris Knight Magaera: Huntmaster",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-magaera"
      },
      "hash": "598022d2",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d730aed0-8e77-4c83-9b91-91693829eedd:chaos-questoris-knight-styrix",
      "kind": "ability",
      "name": "Chaos Questoris Knight Styrix: Grav-pinned",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-styrix"
      },
      "hash": "1ffdb6a3",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7d101b1e-fd3c-4b06-9783-7b2591e6340a:chaos-questoris-knight-styrix",
      "kind": "ability",
      "name": "Chaos Questoris Knight Styrix: Preysight",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "chaos-questoris-knight-styrix"
      },
      "hash": "336924dc",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "480dd27b-5872-4821-b4a5-675f69dbdbc8:knight-rampager",
      "kind": "ability",
      "name": "Knight Rampager: Bloodlust",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-rampager"
      },
      "hash": "307b0b1c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
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
      "sid": "71fb0366-3208-47ae-9c81-24501b271639:knight-ruinator",
      "kind": "ability",
      "name": "Knight Ruinator: Close-range Killers",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "knight-ruinator"
      },
      "hash": "c36fbaa4",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "249bb130-c323-4270-b894-4e014761eac7:war-dog-executioner",
      "kind": "ability",
      "name": "War Dog Executioner: Executioner",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-dog-executioner"
      },
      "hash": "3895adc6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5d62d846-d7a1-4e2a-9431-4f38967a434a:war-dog-stalker",
      "kind": "ability",
      "name": "War Dog Stalker: Stalker",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-dog-stalker"
      },
      "hash": "434dab6f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f7e05863-87be-4f5a-bc7c-f053cf453bd2",
      "kind": "allegiance",
      "name": "Houndpack Lance Keyword: Character",
      "det": null,
      "ref": {
        "kind": "allegiance",
        "g": "houndpack-lance-keyword",
        "opt": "Character"
      },
      "hash": "6ae178f7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the keyword this grants is applied by the roster layer itself (rosterEngine's allegKeyword feeds DatasheetCard's grantedKeywords), so recording it here too would show it twice; no printed number changes"
    },
    {
      "sid": "af512856-dc8f-428b-8562-bb30b6f1d257",
      "kind": "armyRule",
      "name": "Dreadblades",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "7a1f15d7",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which allied models may be included"
    },
    {
      "sid": "a035ead2-fd10-4271-a295-0b1823f4792f",
      "kind": "armyRule",
      "name": "Harbingers of Dread",
      "det": null,
      "hash": "bd88e7f1",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "armyRule"
      }
    },
    {
      "sid": "788a4578-aaf9-4801-a35e-8e4d224c0a90",
      "kind": "detachmentRule",
      "name": "Masters of the Pack",
      "det": "Helhunt Lance",
      "ref": {
        "kind": "detachmentRule",
        "det": "helhunt-lance"
      },
      "hash": "425432db",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "extends an Aura's own targeting; nothing on the statline"
    },
    {
      "sid": "ea8bac27-a7f4-40a5-8e9c-ee20b6cc609c",
      "kind": "detachmentRule",
      "name": "Malefic Surge",
      "det": "Infernal Lance",
      "hash": "be04cec4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 3,
          "when": {
            "en": "for the phase, via the Unholy Hunger Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unholy Hunger»"
          },
          "cond": [
            "surge-unholy-hunger"
          ]
        },
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "5+",
          "when": {
            "en": "for the phase, via the Unnatural Fortitude Malefic Surge ability",
            "ru": "на фазу, через способность Malefic Surge «Unnatural Fortitude»"
          },
          "cond": [
            "surge-unnatural-fortitude"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "757eaeb4-cb7c-4967-8cf2-3a42aece8d2e",
      "kind": "detachmentRule",
      "name": "Tyrannical Court",
      "det": "Lords of Dread",
      "hash": "0202e0c6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 2,
          "when": null
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "lords-of-dread"
      }
    },
    {
      "sid": "edf77a51-682c-47f0-8182-4dd874f96f3d",
      "kind": "enhancement",
      "name": "Loping Predator",
      "det": "Houndpack Lance",
      "ref": {
        "kind": "enhancement",
        "det": "houndpack-lance"
      },
      "hash": "15471be4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "917b0195-7e5e-4a65-919b-821fd441782f",
      "kind": "enhancement",
      "name": "Panoply of the Cursed Knights",
      "det": "Houndpack Lance",
      "hash": "1a35e87a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "houndpack-lance"
      }
    },
    {
      "sid": "d9e7e955-a716-415b-8a50-04ff6e82c8cb",
      "kind": "enhancement",
      "name": "Snarling Rivalry (Upgrade)",
      "det": "Hunting Warpack",
      "ref": {
        "kind": "enhancement",
        "det": "hunting-warpack"
      },
      "hash": "a7635131",
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
      "sid": "1fd8ab9e-795a-440f-a6e0-c312215e75a1",
      "kind": "enhancement",
      "name": "Cruel Lashmaster (Aura)",
      "det": "Iconoclast Fiefdom",
      "ref": {
        "kind": "enhancement",
        "det": "iconoclast-fiefdom"
      },
      "hash": "b86224c8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "while within 6\" of the bearer, when selected to make a normal, advance or fall-back move",
            "ru": "пока в пределах 6\" от носителя, при выборе для normal/advance/fall-back-перемещения"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "c497c2f9-7d5f-40d9-ab4a-94ea722296b0",
      "kind": "enhancement",
      "name": "Bestial Aspect",
      "det": "Infernal Lance",
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      },
      "hash": "02fe334d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "cff79aee-3352-436d-adfa-6e11703ffdfd",
      "kind": "enhancement",
      "name": "Blasphemous Engine",
      "det": "Infernal Lance",
      "hash": "5664e037",
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
        "det": "infernal-lance"
      }
    },
    {
      "sid": "b2f712f0-d376-473f-bf23-f2dc789347ae",
      "kind": "enhancement",
      "name": "Fleshmetal Fusion",
      "det": "Infernal Lance",
      "hash": "3e1769b0",
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
        "det": "infernal-lance"
      }
    },
    {
      "sid": "93205b5a-0d2e-44ba-bec0-0aa2e0638143",
      "kind": "enhancement",
      "name": "Knight Diabolus",
      "det": "Infernal Lance",
      "hash": "a86a05f3",
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
      ],
      "ref": {
        "kind": "enhancement",
        "det": "infernal-lance"
      }
    },
    {
      "sid": "3d51794a-1ab6-4fe9-8c9f-8c0b1088456d",
      "kind": "enhancement",
      "name": "Blade of Celerity",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "44f92426",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": null
        }
      ]
    },
    {
      "sid": "6d9fb6cc-05ac-4f9d-a8ac-52ca06c2dffa",
      "kind": "enhancement",
      "name": "Putrid Carapace",
      "det": "Lords of Dread",
      "ref": {
        "kind": "enhancement",
        "det": "lords-of-dread"
      },
      "hash": "c28dd285",
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
      "sid": "23f176f3-52df-4f8d-ae85-85d2774a4677",
      "kind": "enhancement",
      "name": "Veil of Medrengard",
      "det": "Traitoris Lance",
      "hash": "3e497de7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": {
            "en": "against ranged attacks; 5+ against melee attacks",
            "ru": "против стрелковых атак; 5+ против атак ближнего боя"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "traitoris-lance"
      }
    }
  ]
}
