// Chaos Titan Legions — русский перевод правил фракции. Разреженный оверлей поверх
// EN-структуры (см. ./index.js): переведён только текст armyRule.body. ALL-CAPS ключевые
// слова (ADEPTUS TITANICUS, TITANICUS TRAITORIS, IMPERIUM, CHAOS, CHARACTER, WARLORD)
// остаются английскими. Детачментов нет (см. EN-файл).
export const armyRuleNameRu = 'Исполинский пример'

export default {
  armyRule: {
    body: `При формировании вашей армии, если фракция вашей армии — TITANICUS TRAITORIS, пропустите шаг «Выбор правил детачмента». На шаге «Выбор Warlord» выберите одну модель TITANICUS TRAITORIS из вашей армии своим WARLORD, даже если та модель не имеет ключевого слова CHARACTER.

### Titanic Support | Титаническая поддержка
Если каждая модель вашей армии имеет ключевое слово CHAOS, вы можете включить в свою армию 1 модель TITANICUS TRAITORIS, даже если она не имеет ключевого слова фракции, что вы выбрали на шаге «Выбор фракции армии».

### Titanicus Traitoris | Титаникус предателей
Если хотите, вы можете использовать датащиты ADEPTUS TITANICUS из этого документа, чтобы представлять модели TITANICUS TRAITORIS. Для этого на тех датащитах и на этой карточке Army Rules замените все упоминания ключевого слова IMPERIUM на CHAOS, а все упоминания ключевого слова фракции ADEPTUS TITANICUS — на TITANICUS TRAITORIS. Для целей стоимости в очках используйте значения, опубликованные для соответствующих моделей ADEPTUS TITANICUS.`,
  },
}
