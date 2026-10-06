// emperors-children — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:carnival-of-excess": [
    {
      "en": "LEGIONS OF EXCESS\nYou can include Legions of Excess units in your army, even though they do not have the EMPEROR’S CHILDREN Faction keyword. The combined points cost of such units you can include in your army is:\n▪ **Incursion:** Up to 500 pts\n▪ **Strike Force:** Up to 1000 pts\n▪ **Onslaught:** Up to 1500 pts\nNo LEGIONS OF EXCESS models from your army can be your WARLORD.",
      "ru": "LEGIONS OF EXCESS\nВы можете включать юниты Legions of Excess в свою армию, хотя они не имеют ключевого слова фракции EMPEROR’S CHILDREN. Совокупная очковая стоимость таких юнитов, которые вы можете включить в свою армию:\n▪ **Incursion:** До 500 очков\n▪ **Strike Force:** До 1000 очков\n▪ **Onslaught:** До 1500 очков\nНи одна модель LEGIONS OF EXCESS вашей армии не может быть вашим WARLORD."
    }
  ],
  "enh:court-of-the-phoenician:Exalted Patron": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Flawless Blades unit.",
      "ru": "Во время шага «Объявление боевых построений» носитель может быть приписан к юниту Flawless Blades."
    }
  ]
}
