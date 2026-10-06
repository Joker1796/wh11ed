// drukhari — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:reapers-wager": [
    {
      "en": "**Harlequins:** You can include Harlequins units in your army (see Codex: Aeldari). The combined points cost of such units depends on your battle size: Incursion — up to 500 pts; Strike Force — up to 1000 pts; Onslaught — up to 1500 pts. No Harlequins models from your army can be your **[gloss:warlord:Warlord]**. If you select this Detachment, you cannot use the Corsairs and Travelling Players army rule.",
      "ru": "**Harlequins:** Вы можете включать юниты Harlequins в свою армию (см. Codex: Aeldari). Совокупная очковая стоимость таких юнитов зависит от размера битвы: Incursion — до 500 очков; Strike Force — до 1000 очков; Onslaught — до 1500 очков. Ни одна модель Harlequins вашей армии не может быть вашим **Warlord**. Если вы выбираете этот детачмент, вы не можете использовать армейское правило Corsairs and Travelling Players."
    }
  ]
}
