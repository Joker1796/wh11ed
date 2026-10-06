// death-guard — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:tallyband-summoners": [
    {
      "en": "PLAGUE LEGIONS\nYou can include Plague Legions units in your army, even though they do not have the DEATH GUARD Faction keyword. The combined points cost of such units you can include in your army is:\n▪ **Incursion:** Up to 500 pts\n▪ **Strike Force:** Up to 1000 pts\n▪ **Onslaught:** Up to 1500 pts\n\nNo PLAGUE LEGIONS models from your army can be your WARLORD.",
      "ru": "PLAGUE LEGIONS\nВы можете включать юниты Plague Legions в свою армию, хотя они не имеют ключевого слова фракции DEATH GUARD. Совокупная очковая стоимость таких юнитов, которые вы можете включить в свою армию:\n▪ **Incursion:** До 500 очков\n▪ **Strike Force:** До 1000 очков\n▪ **Onslaught:** До 1500 очков\n\nНи одна модель PLAGUE LEGIONS вашей армии не может быть вашим WARLORD."
    }
  ],
  "det:shamblerot-vectorium": [
    {
      "en": "KEYWORDS\nPOXWALKERS units from your army gain the BATTLELINE keyword.",
      "ru": "КЛЮЧЕВЫЕ СЛОВА\nЮниты POXWALKERS вашей армии получают ключевое слово BATTLELINE."
    }
  ]
}
