// orks — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "enh:brute-bosses:Da Gobshot Thunderbuss": [
    {
      "en": "▪ **Da Gobshot Thunderbuss** [LETHAL HITS: non-MONSTER/VEHICLE, RAPID FIRE 6] — Range 24\", A 6, BS 4+, S 7, AP -2, D 2.",
      "ru": "▪ **Da Gobshot Thunderbuss** [LETHAL HITS: non-MONSTER/VEHICLE, RAPID FIRE 6] — Дальность 24\", A 6, BS 4+, S 7, AP -2, D 2."
    }
  ],
  "enh:taktikal-brigade:Kill Kommanda": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Kommandos unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Kommandos."
    }
  ],
  "enh:wreckas:Kaptin's Hat": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Flash Gitz unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Flash Gitz."
    }
  ],
  "enh:wurrband:Da Krunch": [
    {
      "en": "▪ **Da Krunch** [BLAST 3, HAZARDOUS, LETHAL HITS, PSYCHIC] — Range 24\", A 3, BS 4+, S 5, AP -1, D 1.",
      "ru": "▪ **Da Krunch** [BLAST 3, HAZARDOUS, LETHAL HITS, PSYCHIC] — Дальность 24\", A 3, BS 4+, S 5, AP -1, D 1."
    }
  ],
  "enh:wurrband:'Eadbanger": [
    {
      "en": "▪ **'Eadbanger** [HAZARDOUS, PRECISION, PSYCHIC] — Range 24\", A 2, BS 4+, S 6, AP -3, D 3.",
      "ru": "▪ **'Eadbanger** [HAZARDOUS, PRECISION, PSYCHIC] — Дальность 24\", A 2, BS 4+, S 6, AP -3, D 3."
    }
  ]
}
