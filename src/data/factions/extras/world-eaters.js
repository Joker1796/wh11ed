// world-eaters — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "enh:cult-of-blood:Butcher Lord": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Goremongers or Jakhals unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Goremongers или Jakhals."
    }
  ],
  "det:khorne-daemonkin": [
    {
      "en": "RESTRICTIONS\nYou can include the Blood Legions units in your army. The combined points cost of such units you can include in your army is:\n\n**Incursion:** Up to 500 pts\n**Strike Force:** Up to 1000 pts\n**Onslaught:** Up to 1500 pts\n\nNo BLOOD LEGIONS model from your army can be your WARLORD.",
      "ru": "RESTRICTIONS\nВы можете включать юниты Blood Legions в свою армию. Совокупная стоимость таких юнитов в очках, которую вы можете включить в армию:\n\n**Incursion:** до 500 очков\n**Strike Force:** до 1000 очков\n**Onslaught:** до 1500 очков\n\nНи одна модель BLOOD LEGIONS вашей армии не может быть вашим WARLORD."
    }
  ],
  "enh:khorne-daemonkin:Disciple of Khorne": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to a Bloodcrushers or Flesh Hounds unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Bloodcrushers или Flesh Hounds."
    }
  ],
  "det:cult-of-blood": [
    {
      "en": "KEYWORDS\nJAKHALS and GOREMONGERS units from your army have the BATTLELINE keyword.",
      "ru": "КЛЮЧЕВЫЕ СЛОВА\nЮниты JAKHALS и GOREMONGERS вашей армии имеют ключевое слово BATTLELINE."
    }
  ]
}
