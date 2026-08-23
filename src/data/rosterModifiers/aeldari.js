// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`cond`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See src/components/roster/CLAUDE.md and the generator's own header.
export default {
  "slug": "aeldari",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "77c94fb1-9705-4a8e-b27e-e20799540c56:asurmen",
      "kind": "ability",
      "name": "Asurmen: Hand of Asuryan",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "asurmen"
      },
      "hash": "28377a62",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "d",
          "op": "set",
          "value": "3",
          "only": {
            "name": "Bloody Twins"
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
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 5+",
          "only": {
            "name": "Bloody Twins"
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
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Bloody Twins"
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
      "sid": "f737f1fc-4495-41f8-9f62-67f77f31597b:avatar-of-khaine",
      "kind": "ability",
      "name": "Avatar of Khaine: Molten Form",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "avatar-of-khaine"
      },
      "hash": "f62f7f7a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "58faded0-9585-4c7d-984b-eb5926fe37d1:avatar-of-khaine",
      "kind": "ability",
      "name": "Avatar of Khaine: The Bloody-Handed",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "avatar-of-khaine",
        "scopes": [
          {
            "targets": [
              "AELDARI"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "935b9071",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "def6141c-f3be-438e-8d5c-3fed35eaec4f:clanblade",
      "kind": "ability",
      "name": "Clanblade: Blade of the Clans",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "clanblade"
      },
      "hash": "9c60d886",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null
        }
      ]
    },
    {
      "sid": "a3dd474d-2baa-4cc4-9427-3019a9c13991:corsair-voidscarred",
      "kind": "ability",
      "name": "Corsair Voidscarred: Piratical Raiders",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "corsair-voidscarred"
      },
      "hash": "3ef80f71",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "LETHAL HITS",
          "when": {
            "en": "against the enemy unit selected at the start of the battle",
            "ru": "против юнита, выбранного в начале битвы"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "against the enemy unit selected at the start of the battle",
            "ru": "против юнита, выбранного в начале битвы"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "78a72237-1038-43ef-a066-56d9f24eafea:crimson-hunter",
      "kind": "ability",
      "name": "Crimson Hunter: Skyhunter",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "crimson-hunter"
      },
      "hash": "3c09b472",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "75bc40c3-7ddf-487f-994a-812cebbd1ed8:d-cannon-platform",
      "kind": "ability",
      "name": "D-cannon Platform: Support Weapon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "d-cannon-platform"
      },
      "hash": "34ea935c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "set",
          "value": "3",
          "when": {
            "en": "against an attack, while the unit still holds another model",
            "ru": "против атаки, пока в отряде есть другая модель"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0444e121-929b-4e43-a7a6-f14049b7a81a:dire-avengers",
      "kind": "ability",
      "name": "Dire Avengers: Bladestorm",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "dire-avengers"
      },
      "hash": "01e44683",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against targets within half range",
            "ru": "против целей в пределах половины дальности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "63e9f2c2-2aa2-410f-a31d-606d16783763:eldrad-ulthran",
      "kind": "ability",
      "name": "Eldrad Ulthran: Doom",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "eldrad-ulthran"
      },
      "hash": "13ab6310",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "c4af05dc-c069-4ad5-bbdf-3c10f4f75166:farseer",
      "kind": "ability",
      "name": "Farseer: Guide",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "farseer"
      },
      "hash": "fb705230",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "429cf5f2-2ead-418f-a158-ba517e1c137e:fuegan",
      "kind": "ability",
      "name": "Fuegan: Burning Lance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "fuegan"
      },
      "hash": "1770a34a",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 6,
          "only": {
            "tag": "MELTA"
          },
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "8a00605e-b319-4a00-9d3d-2da951171be8:jain-zar",
      "kind": "ability",
      "name": "Jain Zar: Whirling Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "jain-zar"
      },
      "hash": "7bf193e5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 6,
          "when": {
            "en": "in a phase this unit Advanced (no Advance roll is made)",
            "ru": "в фазе, когда отряд совершил Advance (бросок не делается)"
          },
          "cond": [
            "unit-advanced"
          ],
          "target": "led"
        }
      ]
    },
    {
      "sid": "65c1bd9f-dcc0-46ee-964f-573a55b3ea9a:kharseth",
      "kind": "ability",
      "name": "Kharseth: Fury of the Void",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "kharseth"
      },
      "hash": "722d30da",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "84fda62f-0d1d-4b3c-805f-3f37daad2073:kygharil-s-protectors-dire-avengers",
      "kind": "ability",
      "name": "Kygharil's Protectors Dire Avengers: Bladestorm",
      "det": null,
      "ref": null,
      "hash": "19c269e2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against targets within half range",
            "ru": "против целей в пределах половины дальности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "6779b58c-1f5a-4e04-916d-154c0e7a73e5:kygharil-s-protectors-dire-avengers",
      "kind": "ability",
      "name": "Kygharil's Protectors Dire Avengers: Bladestorm",
      "det": null,
      "ref": null,
      "hash": "19c269e2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against targets within half range",
            "ru": "против целей в пределах половины дальности"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "9f3ea182-ed96-41cc-a92e-7f2f2fc107ae:kygharil-s-protectors-warp-spiders",
      "kind": "ability",
      "name": "Kygharil's Protectors Warp Spiders: Engulfing Flames (Once per battle per unit)",
      "det": null,
      "ref": null,
      "hash": "2495534c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-INFANTRY 3+",
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
      "sid": "aafd1de0-4432-4784-8f06-9d2d2204f308:night-spinner",
      "kind": "ability",
      "name": "Night Spinner: Monofilament Web",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "night-spinner"
      },
      "hash": "3ef10aea",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d7a81ef9-41fa-4187-a223-452a4db79d50:prince-yriel",
      "kind": "ability",
      "name": "Prince Yriel: Piratical Hero",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "prince-yriel"
      },
      "hash": "0776f900",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": null,
          "target": "led"
        }
      ]
    },
    {
      "sid": "da03c40c-8401-4e82-83a8-077d720c0c45:revenant-titan",
      "kind": "ability",
      "name": "Revenant Titan: Revenant Jet Pack",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "revenant-titan"
      },
      "hash": "cbe4ef30",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 8,
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
      "sid": "75bc40c3-7ddf-487f-994a-812cebbd1ed8:shadow-weaver-platform",
      "kind": "ability",
      "name": "Shadow Weaver Platform: Support Weapon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "shadow-weaver-platform"
      },
      "hash": "34ea935c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "set",
          "value": "3",
          "when": {
            "en": "against an attack, while the unit still holds another model",
            "ru": "против атаки, пока в отряде есть другая модель"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "0b471474-b936-4ca9-9b31-df82df5f5ce2:shadowseer",
      "kind": "ability",
      "name": "Shadowseer: Treacherous Illusion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "shadowseer"
      },
      "hash": "114e1547",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4597efdf-31b9-4972-b398-9116923f65ea:skyweavers",
      "kind": "ability",
      "name": "Skyweavers: Acrobatic Grace",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "skyweavers"
      },
      "hash": "87a55d7c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
    },
    {
      "sid": "c27d57ab-4d05-4e54-8319-bbd4e47aba54:solitaire",
      "kind": "ability",
      "name": "Solitaire: Blitz",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "solitaire"
      },
      "hash": "09764894",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": "2D6",
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
          "stat": "a",
          "op": "add",
          "value": 3,
          "only": {
            "name": "Solitaire"
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
      "sid": "c91f3f7c-5e8d-42da-b343-fe3f93ee2152:spiritseer-kygharil",
      "kind": "ability",
      "name": "Spiritseer Kygharil: Spirit Mark (Psychic) (Once per turn per unit)",
      "det": null,
      "ref": null,
      "hash": "21149fa1",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "7bdcd61c-033a-4dd1-8f01-38870f3a58f0:spiritseer-kygharil",
      "kind": "ability",
      "name": "Spiritseer Kygharil: Spiritseer",
      "det": null,
      "ref": null,
      "hash": "0075b36b",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b3663a94-996e-49eb-9222-a6454f12733a:spiritseer",
      "kind": "ability",
      "name": "Spiritseer: Spirit Mark",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "spiritseer",
        "scopes": [
          {
            "targets": [
              "WRAITH CONSTRUCT"
            ],
            "excludes": [
              "TITANIC"
            ]
          }
        ]
      },
      "hash": "4947bb7a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "12387ba9-c005-400c-b6a1-383571c02456:spiritseer",
      "kind": "ability",
      "name": "Spiritseer: Spiritseer",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "spiritseer"
      },
      "hash": "cb16a106",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "f40fc41c-07ce-4fb5-a82f-9f836a09b78b:starfangs",
      "kind": "ability",
      "name": "Starfangs: Hallucinogen Grenades",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "starfangs",
        "scopes": [
          {
            "targets": [
              "AELDARI INFANTRY"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "3cc5239e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "5807db74-ec48-49cf-ab65-62ed949dcc29:stonesinger",
      "kind": "ability",
      "name": "Stonesinger: Elemental Ensnarement",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "stonesinger"
      },
      "hash": "8fc274d8",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "b2d8ae70-d954-416e-ac47-a237da706df5:the-visarch",
      "kind": "ability",
      "name": "The Visarch: Way of the Blade",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-visarch"
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
      "sid": "777969ea-dcca-4088-82fe-0b6eadb97124:the-visarch",
      "kind": "ability",
      "name": "The Visarch: Yvraine’s Champion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "the-visarch"
      },
      "hash": "6e31de92",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "3c29ffd6-45d1-4309-9f05-a570218e8703:troupe-master",
      "kind": "ability",
      "name": "Troupe Master: Cegorach’s Favour",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "troupe-master"
      },
      "hash": "3cee30cf",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "6ee70ac1-5d7f-4eed-a4fc-fe6047cdb895:troupe",
      "kind": "ability",
      "name": "Troupe: Dance of Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "troupe"
      },
      "hash": "678b01b6",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "35260774-9854-428f-af0c-83b533726bed:vibro-cannon-platform",
      "kind": "ability",
      "name": "Vibro Cannon Platform: Sonic Destruction",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vibro-cannon-platform"
      },
      "hash": "a186f2f6",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Vibro cannon"
          },
          "when": {
            "en": "per other VIBRO CANNON PLATFORM that shot the same target this phase",
            "ru": "за каждую другую VIBRO CANNON PLATFORM, стрелявшую по той же цели в этой фазе"
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
          "only": {
            "name": "Vibro cannon"
          },
          "when": {
            "en": "per other VIBRO CANNON PLATFORM that shot the same target this phase",
            "ru": "за каждую другую VIBRO CANNON PLATFORM, стрелявшую по той же цели в этой фазе"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Vibro cannon"
          },
          "when": {
            "en": "per other VIBRO CANNON PLATFORM that shot the same target this phase",
            "ru": "за каждую другую VIBRO CANNON PLATFORM, стрелявшую по той же цели в этой фазе"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "75bc40c3-7ddf-487f-994a-812cebbd1ed8:vibro-cannon-platform",
      "kind": "ability",
      "name": "Vibro Cannon Platform: Support Weapon",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "vibro-cannon-platform"
      },
      "hash": "34ea935c",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "t",
          "op": "set",
          "value": "3",
          "when": {
            "en": "against an attack, while the unit still holds another model",
            "ru": "против атаки, пока в отряде есть другая модель"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "a6519552-88c0-47db-ac86-c2d551fc6b4b:war-walkers",
      "kind": "ability",
      "name": "War Walkers: Crystalline Targeting",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "war-walkers"
      },
      "hash": "db024523",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "4038cf0b-7832-4c7a-9c63-dc3e52bd0503:warlock-conclave",
      "kind": "ability",
      "name": "Warlock Conclave: Psychic Communion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warlock-conclave",
        "scopes": [
          {
            "targets": [
              "AELDARI PSYKER"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "2acfba08",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4038cf0b-7832-4c7a-9c63-dc3e52bd0503:warlock-skyrunners",
      "kind": "ability",
      "name": "Warlock Skyrunners: Psychic Communion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warlock-skyrunners",
        "scopes": [
          {
            "targets": [
              "AELDARI PSYKER"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "2acfba08",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "4a5d030e-9923-48ec-9d98-965fd02d6844:warlock-skyrunners",
      "kind": "ability",
      "name": "Warlock Skyrunners: Runes of Battle",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warlock-skyrunners"
      },
      "hash": "f98460a0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "IGNORES COVER",
          "when": null
        }
      ]
    },
    {
      "sid": "a5a823b5-a149-4479-afd6-63239abc7fd3:warlock",
      "kind": "ability",
      "name": "Warlock: Psychic Communion",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warlock",
        "scopes": [
          {
            "targets": [
              "AELDARI PSYKER"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "de03884e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "a",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "ranged",
          "stat": "s",
          "op": "add",
          "value": 1,
          "only": {
            "name": "Destructor"
          },
          "when": {
            "en": "per friendly AELDARI PSYKER within 6\", up to +2",
            "ru": "за каждого дружественного AELDARI PSYKER в 6\", максимум +2"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "765703cd-4b3a-4400-8f93-e1abd02a0b6e:warp-spiders",
      "kind": "ability",
      "name": "Warp Spiders: Flickerjump",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "warp-spiders"
      },
      "hash": "1124390d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "set",
          "value": "24\"",
          "when": {
            "en": "until the end of a turn this ability was used (no charge that turn)",
            "ru": "до конца хода, в котором использована способность (без charge)"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8a3daae2-6619-44f7-b774-f9452f4ab3c1:wraithblades",
      "kind": "ability",
      "name": "Wraithblades: Psychic Guidance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wraithblades"
      },
      "hash": "57550712",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": {
            "en": "within 12\" of a friendly AELDARI PSYKER",
            "ru": "в 12\" от дружественного AELDARI PSYKER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "8a3daae2-6619-44f7-b774-f9452f4ab3c1:wraithguard",
      "kind": "ability",
      "name": "Wraithguard: Psychic Guidance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wraithguard"
      },
      "hash": "57550712",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": {
            "en": "within 12\" of a friendly AELDARI PSYKER",
            "ru": "в 12\" от дружественного AELDARI PSYKER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "811132b9-8b0e-4945-bd3f-69916b0a8608:wraithlord",
      "kind": "ability",
      "name": "Wraithlord: Psychic Guidance",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "wraithlord"
      },
      "hash": "15d5d440",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "bs",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "within 12\" of a friendly AELDARI PSYKER",
            "ru": "в 12\" от дружественного AELDARI PSYKER"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "melee",
          "stat": "ws",
          "op": "improve",
          "value": 1,
          "when": {
            "en": "within 12\" of a friendly AELDARI PSYKER",
            "ru": "в 12\" от дружественного AELDARI PSYKER"
          },
          "cond": [
            "never"
          ]
        },
        {
          "on": "profile",
          "stat": "ld",
          "op": "set",
          "value": "6+",
          "when": {
            "en": "within 12\" of a friendly AELDARI PSYKER",
            "ru": "в 12\" от дружественного AELDARI PSYKER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "842515a4-ceb3-4b60-912e-570959df315a:ynnari-raider",
      "kind": "ability",
      "name": "Ynnari Raider: Aethersails",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ynnari-raider"
      },
      "hash": "18a0ce80",
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
      "sid": "87e31755-0855-4acb-9561-42dc6d2f6040:ynnari-succubus",
      "kind": "ability",
      "name": "Ynnari Succubus: Empowered by Death",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ynnari-succubus"
      },
      "hash": "21c2d773",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d3d0bb1a-87c9-4e46-9237-2d6c05ccee4a:ynnari-succubus",
      "kind": "ability",
      "name": "Ynnari Succubus: Storm of Blades",
      "det": null,
      "ref": {
        "kind": "ability",
        "unit": "ynnari-succubus"
      },
      "hash": "9d48081a",
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
        }
      ]
    },
    {
      "sid": "6727344a-cbbc-4ce3-972b-221a4daeb484",
      "kind": "armyRule",
      "name": "Battle Focus",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "1b5a1ea7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 2,
          "when": {
            "en": "for the phase, after the unit performs the Swift as the Wind Agile Manoeuvre",
            "ru": "на фазу, после того как отряд выполнил манёвр Swift as the Wind"
          },
          "cond": [
            "unit-manoeuvre-swift-as-the-wind"
          ]
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ASSAULT",
          "when": {
            "en": "for the turn, after a VEHICLE unit performs the Star Engines Agile Manoeuvre",
            "ru": "на ход, после того как VEHICLE выполнил манёвр Star Engines"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "04d0ed6a-3233-413d-8173-c96ace7f0f89",
      "kind": "armyRule",
      "name": "Disparate Paths",
      "det": null,
      "ref": {
        "kind": "armyRule"
      },
      "hash": "218596b3",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "army-composition rule — which units may be included, no printed number"
    },
    {
      "sid": "73913fb3-24fa-4911-8b59-a10e65e627dd",
      "kind": "detachmentRule",
      "name": "Skilled Crews",
      "det": "Armoured Warhost",
      "ref": {
        "kind": "detachmentRule",
        "det": "armoured-warhost"
      },
      "hash": "9e5439da",
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
      "sid": "8ec01895-99aa-488d-9ee9-e49c6deb3585",
      "kind": "detachmentRule",
      "name": "Strength from Death",
      "det": "Devoted of Ynnead",
      "ref": {
        "kind": "detachmentRule",
        "det": "devoted-of-ynnead"
      },
      "hash": "81a3d78f",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "ffd11536-5f6e-44a3-8f8a-f3833e44dc1c",
      "kind": "detachmentRule",
      "name": "Defend At All Costs",
      "det": "Guardian Battlehost",
      "hash": "92103900",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "guardian-battlehost"
      }
    },
    {
      "sid": "da81ccd6-35d7-4a5c-91f4-8bf64cf14ef3",
      "kind": "detachmentRule",
      "name": "Boons of the Brood",
      "det": "Serpent’s Brood",
      "ref": {
        "kind": "detachmentRule",
        "det": "serpents-brood"
      },
      "hash": "fd67f44f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "Harlequins Mounted and Vehicle models only",
            "ru": "только модели Harlequins Mounted и Vehicle"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    },
    {
      "sid": "04a0d658-c70b-4603-b49e-b510bec9a0e9",
      "kind": "detachmentRule",
      "name": "Shepherds of the Dead",
      "det": "Spirit Conclave",
      "hash": "67e4484a",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "spirit-conclave"
      }
    },
    {
      "sid": "1c52dc8a-4a81-4545-aad5-e373d306e9cb",
      "kind": "detachmentRule",
      "name": "Dance of Distortion",
      "det": "Twilight Flickers",
      "ref": {
        "kind": "detachmentRule",
        "det": "twilight-flickers"
      },
      "hash": "255ff2e4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Stealth",
          "when": null
        }
      ]
    },
    {
      "sid": "f40ed095-81a8-49e6-b58a-6c5e8c907e68",
      "kind": "detachmentRule",
      "name": "Martial Grace",
      "det": "Warhost",
      "hash": "47ff3ab0",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "m",
          "op": "add",
          "value": 1,
          "when": {
            "en": "for the phase, after the unit performs the Swift as the Wind Agile Manoeuvre",
            "ru": "на фазу, после того как отряд выполнил манёвр Swift as the Wind"
          },
          "cond": [
            "unit-manoeuvre-swift-as-the-wind"
          ]
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "warhost"
      }
    },
    {
      "sid": "c6afafd7-2084-43da-af98-5ea9d98ed9f3",
      "kind": "enhancement",
      "name": "Spirit Stone of Raelyth",
      "det": "Armoured Warhost",
      "ref": {
        "kind": "enhancement",
        "det": "armoured-warhost",
        "scopes": [
          {
            "targets": [
              "AELDARI VEHICLE"
            ],
            "excludes": []
          },
          {
            "targets": [
              "AELDARI VEHICLE"
            ],
            "excludes": []
          }
        ]
      },
      "hash": "863f06db",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "af33d000-b02d-40ef-9c11-0e0e92432740",
      "kind": "enhancement",
      "name": "Aspect of Murder",
      "det": "Aspect Host",
      "hash": "5d2ea32e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null
        },
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "aspect-host"
      }
    },
    {
      "sid": "8d9c8be4-f9d6-4cf2-bdf9-1b50f5e73c04",
      "kind": "enhancement",
      "name": "Strategic Savant",
      "det": "Aspect Host",
      "hash": "02866b33",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "while the bearer is leading an Aspect Warriors unit",
            "ru": "пока носитель ведёт отряд Aspect Warriors"
          },
          "cond": [
            "never"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "aspect-host"
      }
    },
    {
      "sid": "558885b8-e1fc-4c9e-8100-f7402cbda111",
      "kind": "enhancement",
      "name": "Infamy (Aura)",
      "det": "Corsair Coterie",
      "ref": {
        "kind": "enhancement",
        "det": "corsair-coterie"
      },
      "hash": "60aa4936",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "1b083a45-8703-43da-8966-0c3340d8c4e2",
      "kind": "enhancement",
      "name": "Voidstone",
      "det": "Corsair Coterie",
      "hash": "73e64d98",
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
        "det": "corsair-coterie"
      }
    },
    {
      "sid": "867996f1-aa68-4a1d-a57c-bc2ee1e0e36d",
      "kind": "enhancement",
      "name": "Webway Pathstone",
      "det": "Corsair Coterie",
      "ref": {
        "kind": "enhancement",
        "det": "corsair-coterie"
      },
      "hash": "5abca7e4",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ]
    },
    {
      "sid": "4c728b85-8794-4043-9890-15c62ee1ee74",
      "kind": "enhancement",
      "name": "Borrowed Vigour",
      "det": "Devoted of Ynnead",
      "hash": "54a21c8e",
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
        "det": "devoted-of-ynnead"
      }
    },
    {
      "sid": "26849fdc-c5cb-4c85-b018-9a4be81c4266",
      "kind": "enhancement",
      "name": "Gaze of Ynnead",
      "det": "Devoted of Ynnead",
      "ref": {
        "kind": "enhancement",
        "det": "devoted-of-ynnead"
      },
      "hash": "022bb834",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "only": {
            "name": "Eldritch Storm"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "00eb75e2-21f5-445c-8fd4-431a1133ceb6",
      "kind": "enhancement",
      "name": "Alacritous Assault",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "enhancement",
        "det": "eldritch-raiders"
      },
      "hash": "82118b6b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": null
        }
      ]
    },
    {
      "sid": "4ac38d29-d3a8-4299-b36d-adce59b94bb7",
      "kind": "enhancement",
      "name": "Exotic Munitions",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "enhancement",
        "det": "eldritch-raiders"
      },
      "hash": "558ddc7e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 5+",
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 5+",
          "when": null
        }
      ]
    },
    {
      "sid": "0b334c87-9ac3-471d-9708-20ecb762b900",
      "kind": "enhancement",
      "name": "Mistweave",
      "det": "Fateful Performance",
      "ref": {
        "kind": "enhancement",
        "det": "fateful-performance"
      },
      "hash": "2faf0432",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Infiltrators",
          "when": null
        }
      ]
    },
    {
      "sid": "67e3f31f-1ec0-4ad5-b92e-c5e9d7ce7146",
      "kind": "enhancement",
      "name": "Mistweave",
      "det": "Ghosts of the Webway",
      "ref": {
        "kind": "enhancement",
        "det": "ghosts-of-the-webway"
      },
      "hash": "800a886e",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0ab6c77a-f7e0-4175-a08a-d7ac02cee847",
      "kind": "enhancement",
      "name": "Craftworld’s Champion",
      "det": "Guardian Battlehost",
      "ref": {
        "kind": "enhancement",
        "det": "guardian-battlehost"
      },
      "hash": "698ed5fe",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "set",
          "value": "5",
          "when": null
        }
      ]
    },
    {
      "sid": "b9241196-72d9-4b64-94f2-7e485bf0a84b",
      "kind": "enhancement",
      "name": "Ethereal Pathway",
      "det": "Guardian Battlehost",
      "ref": {
        "kind": "enhancement",
        "det": "guardian-battlehost"
      },
      "hash": "d05a838a",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "9f284647-768c-470b-a84e-42450935b075",
      "kind": "enhancement",
      "name": "Guided Jump",
      "det": "Kygharil's Protectors",
      "ref": null,
      "hash": "47487144",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    },
    {
      "sid": "38c84028-2718-4537-bf80-3808d06997bd",
      "kind": "enhancement",
      "name": "Seer’s Hand",
      "det": "Kygharil's Protectors",
      "ref": null,
      "hash": "6d851a6c",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "note": "the healing and [PRECISION] land on a DIFFERENT unit the bearer selects, not on the bearer, and this layer only ever modifies the model carrying the enhancement"
    },
    {
      "sid": "95508954-f634-4150-9300-b76953d3217f",
      "kind": "enhancement",
      "name": "Assassins' Eye (Upgrade)",
      "det": "Path of the Outcast",
      "ref": {
        "kind": "enhancement",
        "det": "path-of-the-outcast"
      },
      "hash": "55966571",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ap",
          "op": "add",
          "value": -1,
          "when": {
            "en": "per ranged attack against a CHARACTER unit",
            "ru": "за стрелковую атаку по отряду CHARACTER"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "2829e959-9dd5-485b-ad55-9b162e11d54f",
      "kind": "enhancement",
      "name": "Lucid Eye",
      "det": "Seer Council",
      "hash": "a8019d78",
      "ver": 925,
      "reviewed": true,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "seer-council"
      }
    },
    {
      "sid": "c2eaaffb-4410-4c56-ba4c-f24c5b725653",
      "kind": "enhancement",
      "name": "Runes of Warding",
      "det": "Seer Council",
      "ref": {
        "kind": "enhancement",
        "det": "seer-council"
      },
      "hash": "8aae3144",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d4232944-2e90-4b98-8350-2fedc2258f40",
      "kind": "enhancement",
      "name": "Stone of Eldritch Fury",
      "det": "Seer Council",
      "ref": {
        "kind": "enhancement",
        "det": "seer-council"
      },
      "hash": "e7c50bbd",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "add",
          "value": 12,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "note": "the +12\" is real and unconditional, but it applies to a SUBSET of the weapon table this format cannot address, so it annotates instead of rewriting every range"
    },
    {
      "sid": "39ac87c1-1d96-4aaf-909b-6addb2fa6cad",
      "kind": "enhancement",
      "name": "Key of Ghosts",
      "det": "Serpent’s Brood",
      "ref": {
        "kind": "enhancement",
        "det": "serpents-brood"
      },
      "hash": "645c7155",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    },
    {
      "sid": "964c822b-33e6-412a-8ebd-fa8d57373161",
      "kind": "enhancement",
      "name": "Weavers' Wail",
      "det": "Serpent’s Brood",
      "hash": "48dfea8e",
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
          "stat": "a",
          "op": "add",
          "value": 1,
          "when": null
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "serpents-brood"
      }
    },
    {
      "sid": "518aa1c5-0552-4956-a26e-1f1b0ef0735d",
      "kind": "enhancement",
      "name": "Light of Clarity",
      "det": "Spirit Conclave",
      "hash": "236ea7df",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 1,
          "when": {
            "en": "Infantry models of one Wraith Construct unit you select each Command phase",
            "ru": "модели Infantry одного отряда Wraith Construct, выбираемого в каждой фазе командования"
          },
          "cond": [
            "blocked-subset"
          ]
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Monster models of that same selected unit",
            "ru": "модели Monster того же выбранного отряда"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "spirit-conclave",
        "scopes": [
          {
            "targets": [
              "WRAITH CONSTRUCT"
            ],
            "excludes": []
          }
        ]
      }
    },
    {
      "sid": "282aca3c-3003-4f0c-beaa-48e503c7cea5",
      "kind": "enhancement",
      "name": "Stave of Kurnous",
      "det": "Spirit Conclave",
      "ref": {
        "kind": "enhancement",
        "det": "spirit-conclave",
        "scopes": [
          {
            "targets": [
              "WRAITH CONSTRUCT"
            ],
            "excludes": [
              "TITANIC"
            ]
          }
        ]
      },
      "hash": "f3dc41b8",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "ability",
          "op": "grant",
          "value": "PRECISION",
          "when": {
            "en": "on a Critical Wound",
            "ru": "на Critical Wound"
          },
          "cond": [
            "never"
          ]
        }
      ]
    },
    {
      "sid": "be347cc7-e483-497b-a475-0d5d3be07a32",
      "kind": "enhancement",
      "name": "Prelude Performer",
      "det": "Twilight Flickers",
      "ref": {
        "kind": "enhancement",
        "det": "twilight-flickers"
      },
      "hash": "9316d2d5",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 6\"",
          "when": null
        }
      ]
    },
    {
      "sid": "627a96a6-71e7-4eb1-81ef-83be078a8900",
      "kind": "enhancement",
      "name": "Shadowfall Masks (Upgrade)",
      "det": "Twilight Flickers",
      "ref": {
        "kind": "enhancement",
        "det": "twilight-flickers"
      },
      "hash": "2a9b512e",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Fights First",
          "when": null
        }
      ]
    },
    {
      "sid": "7c7a454e-4548-414f-9cf1-5faf80dddd9d",
      "kind": "enhancement",
      "name": "Psychic Destroyer",
      "det": "Warhost",
      "hash": "dc1a1a15",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "d",
          "op": "add",
          "value": 1,
          "when": null,
          "only": {
            "tag": "PSYCHIC"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warhost"
      }
    },
    {
      "sid": "fb8a0e05-6f2c-49f6-aa41-963dfe850ef3",
      "kind": "enhancement",
      "name": "Firstdrawn Blade",
      "det": "Windrider Host",
      "ref": {
        "kind": "enhancement",
        "det": "windrider-host"
      },
      "hash": "61e696d7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Scouts 9\"",
          "when": null
        }
      ]
    },
    {
      "sid": "16d5e738-7ef2-4b1c-8ab2-0d06387fe9c8",
      "kind": "enhancement",
      "name": "Seersight Strike",
      "det": "Windrider Host",
      "ref": {
        "kind": "enhancement",
        "det": "windrider-host"
      },
      "hash": "18e21f20",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-MONSTER 2+",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": null
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "ANTI-VEHICLE 2+",
          "only": {
            "tag": "PSYCHIC"
          },
          "when": null
        }
      ]
    },
    {
      "sid": "0353efc2-003c-4da7-bb1b-c687e36155b6",
      "kind": "stratagem",
      "name": "Layered Wards",
      "det": "Armoured Warhost",
      "ref": {
        "kind": "stratagem",
        "det": "armoured-warhost",
        "name": "Layered Wards"
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
      "sid": "7ef3eaef-b37c-48e2-9bd4-0378cdc068b9",
      "kind": "stratagem",
      "name": "Doom Inescapable",
      "det": "Aspect Host",
      "ref": {
        "kind": "stratagem",
        "det": "aspect-host",
        "name": "Doom Inescapable"
      },
      "hash": "9fbe4041",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "range",
          "op": "set",
          "value": "18\"",
          "only": {
            "name": "Wailing doom"
          },
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        },
        {
          "on": "ranged",
          "stat": "d",
          "op": "set",
          "value": "8",
          "only": {
            "name": "Wailing doom"
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
      "sid": "e6d81d10-fb30-42ac-b70b-dcf91203b6fe",
      "kind": "stratagem",
      "name": "Cloak and Shadow",
      "det": "Corsair Coterie",
      "ref": {
        "kind": "stratagem",
        "det": "corsair-coterie",
        "name": "Cloak and Shadow"
      },
      "hash": "2e05f68c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "def8613e-eee9-4cb4-9297-76807bced5b5",
      "kind": "stratagem",
      "name": "Outcast Ambush",
      "det": "Corsair Coterie",
      "ref": {
        "kind": "stratagem",
        "det": "corsair-coterie",
        "name": "Outcast Ambush"
      },
      "hash": "9a8f4e3a",
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
        },
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "RAPID FIRE 1",
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
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "da1a7e68-a91b-4bc5-a466-6ec7fc740224",
      "kind": "stratagem",
      "name": "Pirates’ Due",
      "det": "Corsair Coterie",
      "ref": {
        "kind": "stratagem",
        "det": "corsair-coterie",
        "name": "Pirates’ Due"
      },
      "hash": "fa5d89ce",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "d5737f54-4a3e-4335-9ddf-6759368bd099",
      "kind": "stratagem",
      "name": "Soulsight",
      "det": "Devoted of Ynnead",
      "ref": {
        "kind": "stratagem",
        "det": "devoted-of-ynnead",
        "name": "Soulsight"
      },
      "hash": "15e3ea47",
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
        },
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
      "sid": "23a9ccd8-c557-4ec6-8a93-15f3b41ee8f5",
      "kind": "stratagem",
      "name": "No Prey too Big",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "eldritch-raiders",
        "name": "No Prey too Big"
      },
      "hash": "6ccbd7b0",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "12ded315-0be2-463a-ab26-808bb701d1c8",
      "kind": "stratagem",
      "name": "Raider’s Spoils",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "eldritch-raiders",
        "name": "Raider’s Spoils"
      },
      "hash": "ff404a82",
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
      "dur": "round"
    },
    {
      "sid": "25fa402d-6cb8-46cb-9fcb-d6dc03f2ae22",
      "kind": "stratagem",
      "name": "Ruthless Killers",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "eldritch-raiders",
        "name": "Ruthless Killers"
      },
      "hash": "ffe64ef9",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "weapon",
          "stat": "d",
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
      "sid": "b6e68ab5-ae3a-4ca1-83bd-4e4a370cea97",
      "kind": "stratagem",
      "name": "Yriel’s Example",
      "det": "Eldritch Raiders",
      "ref": {
        "kind": "stratagem",
        "det": "eldritch-raiders",
        "name": "Yriel’s Example"
      },
      "hash": "2dcc4ebb",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Feel No Pain 5+",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "51ff6332-28a3-4308-bc38-3644ffd4c908",
      "kind": "stratagem",
      "name": "Blades of Asuryan",
      "det": "Guardian Battlehost",
      "ref": {
        "kind": "stratagem",
        "det": "guardian-battlehost",
        "name": "Blades of Asuryan"
      },
      "hash": "9885d13f",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "PISTOL",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "35d8b42d-ab6c-4646-97e5-96f5b764a976",
      "kind": "stratagem",
      "name": "Time to Strike",
      "det": "Guardian Battlehost",
      "ref": {
        "kind": "stratagem",
        "det": "guardian-battlehost",
        "name": "Time to Strike"
      },
      "hash": "90a2030a",
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
      "sid": "26af9c53-96f1-4cee-8720-b19621384d41",
      "kind": "stratagem",
      "name": "Fate Inescapable",
      "det": "Seer Council",
      "ref": {
        "kind": "stratagem",
        "det": "seer-council",
        "name": "Fate Inescapable"
      },
      "hash": "7a7d39b5",
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
      "sid": "9907d0a7-4f77-449d-8e36-28115304d029",
      "kind": "stratagem",
      "name": "Unshrouded Truth",
      "det": "Seer Council",
      "ref": {
        "kind": "stratagem",
        "det": "seer-council",
        "name": "Unshrouded Truth"
      },
      "hash": "9f4867a1",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "core",
          "op": "grant",
          "value": "Deep Strike",
          "when": null
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "178f6e1e-0a30-4650-9ad5-77b19be4c409",
      "kind": "stratagem",
      "name": "Blades From Beyond",
      "det": "Spirit Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "spirit-conclave",
        "name": "Blades From Beyond"
      },
      "hash": "2cb6465b",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "DEVASTATING WOUNDS",
          "when": {
            "en": "while this stratagem is in force",
            "ru": "пока действует стратагема"
          }
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "9803bbcb-1dd8-4742-ad0b-309a06da2330",
      "kind": "stratagem",
      "name": "Crushing Strides",
      "det": "Spirit Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "spirit-conclave",
        "name": "Crushing Strides"
      },
      "hash": "153c452c",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "0dc77037-8e04-4c5f-86d2-aa8663b70788",
      "kind": "stratagem",
      "name": "Wraithbone Armour",
      "det": "Spirit Conclave",
      "ref": {
        "kind": "stratagem",
        "det": "spirit-conclave",
        "name": "Wraithbone Armour"
      },
      "hash": "6d37add7",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "cd8a2849-148d-42c2-baa8-70fde6c32971",
      "kind": "stratagem",
      "name": "Presaged Rehearsal",
      "det": "Twilight Flickers",
      "ref": {
        "kind": "stratagem",
        "det": "twilight-flickers",
        "name": "Presaged Rehearsal"
      },
      "hash": "127e1a54",
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
      "sid": "45d32b81-e8d4-41f7-a259-aa2b7b83e55b",
      "kind": "stratagem",
      "name": "Blitzing Firepower",
      "det": "Warhost",
      "ref": {
        "kind": "stratagem",
        "det": "warhost",
        "name": "Blitzing Firepower"
      },
      "hash": "f2c288f7",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "ranged",
          "stat": "ability",
          "op": "grant",
          "value": "SUSTAINED HITS 1",
          "when": {
            "en": "against targets within 12\"",
            "ru": "против целей в 12\""
          },
          "cond": [
            "never"
          ]
        }
      ],
      "dur": "phase"
    },
    {
      "sid": "7b546fe8-2b6e-4d32-addb-60eae596cdca",
      "kind": "stratagem",
      "name": "Focused Firepower",
      "det": "Windrider Host",
      "ref": {
        "kind": "stratagem",
        "det": "windrider-host",
        "name": "Focused Firepower"
      },
      "hash": "20ff758a",
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
      "sid": "5af63059-fb17-4c24-b61d-34535b3102d7",
      "kind": "stratagem",
      "name": "Spiralling Evasion",
      "det": "Windrider Host",
      "ref": {
        "kind": "stratagem",
        "det": "windrider-host",
        "name": "Spiralling Evasion"
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
      "sid": "2169123d-6e3f-4f28-a135-c8d388172eab:corsair-voidreavers",
      "kind": "wargear",
      "name": "Corsair Voidreavers: Mistshield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corsair-voidreavers",
        "item": "mistshield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
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
      "sid": "18c4bfb4-b13e-4b82-96fd-6aad896046dc:corsair-voidscarred",
      "kind": "wargear",
      "name": "Corsair Voidscarred: Channeller Stones",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corsair-voidscarred",
        "item": "channeller stones"
      },
      "hash": "f4c11bbc",
      "ver": 925,
      "reviewed": true,
      "effects": []
    },
    {
      "sid": "00cd87c9-1c81-4922-91fc-e8c993814efb:corsair-voidscarred",
      "kind": "wargear",
      "name": "Corsair Voidscarred: Faolchú",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corsair-voidscarred",
        "item": "faolchú"
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
      "sid": "2169123d-6e3f-4f28-a135-c8d388172eab:corsair-voidscarred",
      "kind": "wargear",
      "name": "Corsair Voidscarred: Mistshield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "corsair-voidscarred",
        "item": "mistshield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
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
      "sid": "1471d478-16f0-4ae5-8e10-b81d96a07945:dire-avengers",
      "kind": "wargear",
      "name": "Dire Avengers: Shimmershield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "dire-avengers",
        "item": "shimmershield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
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
      "sid": "1471d478-16f0-4ae5-8e10-b81d96a07945:shining-spears",
      "kind": "wargear",
      "name": "Shining Spears: Shimmershield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "shining-spears",
        "item": "shimmershield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
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
      "sid": "23aebc71-e6d1-4ccd-bbc6-7344e8c3f89d:storm-guardians",
      "kind": "wargear",
      "name": "Storm Guardians: Serpent shield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "storm-guardians",
        "item": "serpent shield"
      },
      "hash": "40d840b6",
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
      ]
    },
    {
      "sid": "c763e3a3-a9ea-48c5-947e-bbbe7ae67d83:wraithblades",
      "kind": "wargear",
      "name": "Wraithblades: Forceshield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wraithblades",
        "item": "forceshield"
      },
      "hash": "5e0ca50d",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
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
      "sid": "88c4b502-3037-48b4-bd44-937d14a7c999:wraithknight-with-ghostglaive",
      "kind": "wargear",
      "name": "Wraithknight with Ghostglaive: Scattershield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wraithknight-with-ghostglaive",
        "item": "scattershield"
      },
      "hash": "a9f98625",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        }
      ]
    },
    {
      "sid": "88c4b502-3037-48b4-bd44-937d14a7c999:wraithknight",
      "kind": "wargear",
      "name": "Wraithknight: Scattershield",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "wraithknight",
        "item": "scattershield"
      },
      "hash": "a9f98625",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "profile",
          "stat": "inv",
          "op": "set",
          "value": "4+",
          "when": null
        }
      ]
    },
    {
      "sid": "a27f1572-67ff-4f06-89a5-0c3147bdb33b:ynnari-kabalite-warriors",
      "kind": "wargear",
      "name": "Ynnari Kabalite Warriors: Phantasm grenade launcher",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ynnari-kabalite-warriors",
        "item": "phantasm grenade launcher"
      },
      "hash": "85f5be75",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "unit",
          "stat": "keyword",
          "op": "grant",
          "value": "Grenades",
          "when": null
        }
      ]
    },
    {
      "sid": "f4d519e6-ad5f-48f7-9e96-c9b8168322c2:ynnari-reavers",
      "kind": "wargear",
      "name": "Ynnari Reavers: Grav-talon",
      "det": null,
      "ref": {
        "kind": "wargear",
        "unit": "ynnari-reavers",
        "item": "grav-talon"
      },
      "hash": "cdfab1c2",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "on": "melee",
          "stat": "ability",
          "op": "grant",
          "value": "LANCE",
          "when": {
            "en": "the bearer's weapons only",
            "ru": "только оружие носителя"
          },
          "cond": [
            "blocked-subset"
          ]
        }
      ]
    }
  ]
}
