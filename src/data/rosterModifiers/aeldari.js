// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "aeldari",
  "formatVersion": 1,
  "entries": [
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
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "warhost"
      }
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
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "aspect-host"
      }
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
          }
        },
        {
          "on": "profile",
          "stat": "oc",
          "op": "add",
          "value": 3,
          "when": {
            "en": "Monster models of that same selected unit",
            "ru": "модели Monster того же выбранного отряда"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "spirit-conclave"
      }
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
          "when": {
            "en": "the bearer's ranged Psychic weapons only",
            "ru": "только стрелковое психическое оружие носителя"
          }
        }
      ],
      "ref": {
        "kind": "enhancement",
        "det": "warhost"
      }
    }
  ]
}
