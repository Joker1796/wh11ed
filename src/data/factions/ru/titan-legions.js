// Titan Legions — русский перевод правил фракции. Разреженный оверлей поверх EN-структуры
// (см. ./index.js): переведён только текст armyRule.body. ALL-CAPS ключевые слова
// (ADEPTUS TITANICUS, IMPERIUM, CHAOS, TITANICUS TRAITORIS, CHARACTER, WARLORD) остаются
// английскими. Детачментов нет (см. EN-файл).
export const armyRuleNameRu = 'Исполинский пример'

export default {
  armyRule: {
    body: `При формировании вашей армии, если фракция вашей армии — ADEPTUS TITANICUS, пропустите шаг «Выбор правил детачмента». На шаге «Выбор Warlord» выберите одну модель ADEPTUS TITANICUS из вашей армии своим WARLORD, даже если та модель не имеет ключевого слова CHARACTER.

### Titanic Support | Титаническая поддержка
Если каждая модель вашей армии имеет ключевое слово IMPERIUM, вы можете включить в свою армию 1 модель ADEPTUS TITANICUS, даже если она не имеет ключевого слова фракции, что вы выбрали на шаге «Выбор фракции армии».

### Titanicus Traitoris | Титаникус предателей
Если хотите, вы можете использовать датащиты ADEPTUS TITANICUS из этого документа, чтобы представлять модели TITANICUS TRAITORIS. Для этого на тех датащитах и на этой карточке Army Rules замените все упоминания ключевого слова Imperium на CHAOS, а все упоминания ключевого слова фракции ADEPTUS TITANICUS — на TITANICUS TRAITORIS. Для целей стоимости в очках используйте значения, опубликованные для соответствующих моделей ADEPTUS TITANICUS.`,
  },
}
