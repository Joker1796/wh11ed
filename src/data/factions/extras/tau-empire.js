// tau-empire — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:kroot-hunting-pack": [
    {
      "en": "Keywords\nIf you select this Detachment, Kroot Carnivore units from your army have the Battleline [gloss:keywords:keyword].",
      "ru": "Ключевые слова\nЕсли вы выбираете этот [gloss:detachments:детачмент], юниты Kroot Carnivore вашей армии имеют [gloss:keywords:ключевое слово] Battleline."
    }
  ]
}
