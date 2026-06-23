// Section 25 — Muster Your Army. Same bilingual Section[] shape as basicRules etc.
// `battleSizeTable` is a section-level table rendered after 25.03 by MusterView
// (mirrors woundTable in BasicRulesView / abilitiesTable in AdvancedRulesView).
export const muster = {
  en: [
    {
      id: '25',
      num: '25',
      title: 'Muster Your Army',
      description: 'Before a battle, each player musters an army from their collection and records it on an army roster. This section explains how to prepare your army for a game of Warhammer 40,000.',
      subsections: [
        {
          id: 'section-25-01',
          sectionNum: '25.01',
          title: 'Start Your Army Roster',
          body: `The details of your army must be recorded on an army roster. You can either write this down or use the Warhammer 40,000 app. Players should show their finished army roster to their opponent before battle commences.`,
        },
        {
          id: 'section-25-02',
          sectionNum: '25.02',
          title: 'Select Army Faction',
          body: `Note on your army roster one faction keyword to be your **army faction**.`,
        },
        {
          id: 'section-25-03',
          sectionNum: '25.03',
          title: 'Select Battle Size',
          body: `With your opponent, select one of the battle sizes below. This will determine the total number of points (also known as the points total) each player can spend to build their army. The points values for units can be found in the Warhammer 40,000 app. You will need to refer to these when building your army.

The battle size will also determine the total number of Detachment Points (DP) players will have to unlock **detachments** with, the number of units with the same datasheet name that they can include in their army, and the number of **enhancements** that they can include in their army.

These are summarised below.`,
        },
      ],
      battleSizeTable: {
        headers: ['Battle Size', 'Points Total', 'Detachment Points (DP)', 'Enhancement Limit', 'Unit Limit*'],
        rows: [
          ['Incursion', '1000', '2', '2', '2'],
          ['Strike Force', '2000', '3', '4', '3'],
        ],
        footnote: '* The unit limit for **BATTLELINE** and **DEDICATED TRANSPORT** units is double the relevant amount shown above, and every **EPIC HERO** has a unit limit of 1, regardless of the battle size.',
      },
    },
  ],
  ru: [
    {
      id: '25',
      num: '25',
      title: 'Сбор армии',
      description: 'Перед битвой каждый игрок собирает армию из своей коллекции и записывает её в список армии. В этом разделе объясняется, как подготовить армию для игры в Warhammer 40,000.',
      subsections: [
        {
          id: 'section-25-01',
          sectionNum: '25.01',
          title: 'Начните список армии',
          body: `Детали вашей армии должны быть записаны в список армии (army roster). Вы можете либо записать его, либо использовать приложение Warhammer 40,000. Игроки должны показать свой готовый список армии оппоненту до начала битвы.`,
        },
        {
          id: 'section-25-02',
          sectionNum: '25.02',
          title: 'Выберите фракцию армии',
          body: `Отметьте в списке армии одно ключевое слово фракции, которое будет вашей **фракцией армии** (army faction).`,
        },
        {
          id: 'section-25-03',
          sectionNum: '25.03',
          title: 'Выберите размер битвы',
          body: `Вместе с оппонентом выберите один из размеров битвы ниже. Это определит общее количество очков (также известное как «всего очков»), которое каждый игрок может потратить на построение своей армии. Значения очков для юнитов можно найти в приложении Warhammer 40,000. Вам нужно будет сверяться с ними при построении армии.

Размер битвы также определяет общее количество очков детачмента (Detachment Points, DP), которыми игроки разблокируют **детачменты** (detachments), количество юнитов с одинаковым названием листа данных, которое они могут включить в армию, и количество **улучшений** (enhancements), которое они могут включить в армию.

Они сведены ниже.`,
        },
      ],
      battleSizeTable: {
        headers: ['Размер битвы', 'Всего очков', 'Очки детачмента (DP)', 'Лимит улучшений', 'Лимит юнитов*'],
        rows: [
          ['Incursion (Вторжение)', '1000', '2', '2', '2'],
          ['Strike Force (Ударные силы)', '2000', '3', '4', '3'],
        ],
        footnote: '* Лимит юнитов для юнитов **BATTLELINE** и **DEDICATED TRANSPORT** удваивается относительно указанного выше, и каждый **EPIC HERO** имеет лимит юнитов 1, независимо от размера битвы.',
      },
    },
  ],
}
