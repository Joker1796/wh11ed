// Generated skeletons by gen-roster-modifiers.mjs; `effects`/`when`/`reviewed` are
// HAND-AUTHORED — re-running the generator preserves them. Never edit `sid`/`hash`/`ver`
// by hand: `hash` is what ties a record to the exact rule wording it was read from, and
// rewriting it by hand would silence the one signal that says "GW changed this rule".
// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.
export default {
  "slug": "necrons",
  "formatVersion": 1,
  "entries": [
    {
      "sid": "c8e67c94-634c-45a1-b354-fe1d1d0edf8a",
      "kind": "detachmentRule",
      "name": "Annihilation Protocol",
      "det": "Annihilation Legion",
      "hash": "99ac616f",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "0819b28a-215e-4a8f-b78e-c857db54aa64",
      "kind": "detachmentRule",
      "name": "Command Protocols",
      "det": "Awakened Dynasty",
      "hash": "da8aa7b0",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "da5c3d84-9fb3-4ea1-8e3c-c8d34d6100a7",
      "kind": "detachmentRule",
      "name": "Cold Fervour",
      "det": "Cursed Legion",
      "hash": "f2aad384",
      "ver": 925,
      "reviewed": true,
      "effects": [
        {
          "scope": 0,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": null
        },
        {
          "scope": 1,
          "on": "weapon",
          "stat": "s",
          "op": "add",
          "value": 2,
          "when": {
            "en": "after a Destroyer Cult unit destroys a unit, until the end of the turn",
            "ru": "после того как юнит Destroyer Cult уничтожит юнит, до конца хода"
          }
        }
      ],
      "ref": {
        "kind": "detachmentRule",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "90b80a56-d420-47f0-85b1-405a01e4c0d3",
      "kind": "detachmentRule",
      "name": "Worthy Foes",
      "det": "Obeisance Phalanx",
      "hash": "f43f3287",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "obeisance-phalanx"
      }
    },
    {
      "sid": "49d49ff2-3cb7-488d-bab6-5f046700f91f",
      "kind": "detachmentRule",
      "name": "Cosmic Distortion",
      "det": "Pantheon of Woe",
      "hash": "2e60a45d",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "pantheon-of-woe"
      }
    },
    {
      "sid": "dec1adcf-64dc-4e7a-b535-73fc56cb305c",
      "kind": "detachmentRule",
      "name": "Relentless Onslaught",
      "det": "Starshatter Arsenal",
      "hash": "66a38795",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "detachmentRule",
        "det": "starshatter-arsenal"
      }
    },
    {
      "sid": "f8e6d080-6a6c-432b-8196-e26598cd7fda",
      "kind": "enhancement",
      "name": "Ingrained Superiority",
      "det": "Annihilation Legion",
      "hash": "ca631e3a",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "annihilation-legion"
      }
    },
    {
      "sid": "a6e993f2-c457-4c04-b5f9-c1a7deda2c37",
      "kind": "enhancement",
      "name": "Phasal Subjugator (Aura)",
      "det": "Awakened Dynasty",
      "hash": "b51daed7",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "awakened-dynasty"
      }
    },
    {
      "sid": "a17450e0-31f1-4b21-8952-5ea5c5bf7496",
      "kind": "enhancement",
      "name": "Destroyer Ankh",
      "det": "Cursed Legion",
      "hash": "c15dd6d4",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    },
    {
      "sid": "767a6e78-8eda-4299-ad7f-e0614152a40d",
      "kind": "enhancement",
      "name": "Mark of the Nekrosor",
      "det": "Cursed Legion",
      "hash": "d0cc07b6",
      "ver": 925,
      "reviewed": false,
      "effects": [],
      "ref": {
        "kind": "enhancement",
        "det": "cursed-legion"
      }
    }
  ]
}
