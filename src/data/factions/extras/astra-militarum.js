// astra-militarum — what the GW app applies as data rather than prints in the rule's text: keyword grants,
// restrictions and allied units, who an enhancement's bearer can lead, an enhancement's weapon. Kept
// out of the rule body, so the body can match the app word for word (sync-faction-text), and shown
// under the rule in its own plate (RuleExtras.vue). Keys: det:<detachment id> | enh:<detachment id>:<enhancement name>.
export default {
  "det:armoured-infantry": [
    {
      "en": "KEYWORDS\nAstra Militarum Squadron units from your army have the ARMOURED SKIRMISHER keyword (excluding Artillery units and units containing one or more models with a Wounds characteristic of 13 or higher).",
      "ru": "КЛЮЧЕВЫЕ СЛОВА\nЮниты Astra Militarum Squadron вашей армии имеют ключевое слово ARMOURED SKIRMISHER (исключая юниты Artillery и юниты, содержащие одну или более моделей с характеристикой ран 13 или выше)."
    }
  ],
  "det:steel-hammer": [
    {
      "en": "KEYWORDS\nIn the Muster Armies step, you can select one or more **ASTRA MILITARUM** TITANIC units from your army to gain the CHARACTER keyword.\n\n**Designer’s Note:** This means that the selected units can be given Enhancements, and one of them can be selected as your WARLORD.",
      "ru": "КЛЮЧЕВЫЕ СЛОВА\nВ шаге «Сбор армий» вы можете выбрать один или более юнитов **ASTRA MILITARUM** TITANIC вашей армии, чтобы они получили ключевое слово CHARACTER.\n\n**Примечание разработчиков:** это означает, что выбранным юнитам можно дать улучшения, а один из них может быть выбран вашим WARLORD."
    }
  ],
  "enh:abhuman-auxiliaries:Exemplar of Duty": [
    {
      "en": "In the Declare Battle Formations step, the bearer can be attached to an Ogryn Squad or Bullgryn Squad unit.",
      "ru": "В шаге объявления боевых построений носитель может быть прикреплён к юниту Ogryn Squad или Bullgryn Squad."
    }
  ]
}
