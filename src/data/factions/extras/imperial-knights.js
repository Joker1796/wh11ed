// imperial-knights — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:spearhead-at-arms": [
    {
      "en": "KEYWORDS\nARMIGER models from your army gain the BATTLELINE keyword.",
      "ru": "КЛЮЧЕВЫЕ СЛОВА\nМодели ARMIGER вашей армии получают ключевое слово BATTLELINE."
    }
  ]
}
