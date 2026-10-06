// chaos-space-marines — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:pactbound-zealots": [
    {
      "en": "RESTRICTIONS\n▪ You cannot select the KHORNE keyword for a Psyker unit.\n▪ A Character unit can only be attached to a unit if both units share the same keyword from the list above.\n▪ A unit can only embark within (or start the battle embarked within) a TRANSPORT if both of those units share the same keyword from the list above.",
      "ru": "ОГРАНИЧЕНИЯ\n▪ Вы не можете выбрать ключевое слово KHORNE для юнита Psyker.\n▪ Юнит Character может быть прикреплён к юниту, только если оба юнита имеют одинаковое ключевое слово из списка выше.\n▪ Юнит может погрузиться в TRANSPORT (или начать битву погруженным в него), только если оба этих юнита имеют одинаковое ключевое слово из списка выше."
    }
  ],
  "enh:murdertalon-raiders:Pact of Cursed Pinions": [
    {
      "en": "▪ In the Declare Battle Formations step, the bearer can be attached to a Warp Talons unit.",
      "ru": "▪ В шаге объявления боевых построений носитель может быть прикреплён к юниту Warp Talons."
    }
  ]
}
