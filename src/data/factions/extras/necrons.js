// necrons — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "enh:cursed-legion:Murdermind": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Lokhust Destroyers, Lokhust Heavy Destroyers, Ophydian Destroyers or Skorpekh Destroyers unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Lokhust Destroyers, Lokhust Heavy Destroyers, Ophydian Destroyers или Skorpekh Destroyers."
    }
  ],
  "enh:awakened-dynasty:Veil of Darkness": [
    {
      "en": "NECRONS model only.",
      "ru": "Только модель NECRONS."
    }
  ]
}
