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
          body: `The details of your army must be recorded on an [gloss:army-roster:army roster]. You can either write this down or use the Warhammer 40,000 app. Players should show their finished army roster to their opponent before battle commences.`,
        },
        {
          id: 'section-25-02',
          sectionNum: '25.02',
          title: 'Select Army Faction',
          body: `Note on your army roster one faction keyword to be your **[gloss:army-faction:army faction]**.`,
        },
        {
          id: 'section-25-03',
          sectionNum: '25.03',
          title: 'Select Battle Size',
          body: `With your opponent, select one of the battle sizes below. This will determine the total number of points (also known as the points total) each player can spend to build their army. The points values for units can be found in the Warhammer 40,000 app. You will need to refer to these when building your army.

The battle size will also determine the total number of Detachment Points (DP) players will have to unlock **[gloss:detachments:detachments]** with, the number of units with the same datasheet name that they can include in their army, and the number of **[gloss:enhancement:enhancements]** that they can include in their army.

These are summarised below.`,
        },
        {
          id: 'section-25-04',
          sectionNum: '25.04',
          title: 'Fill Your Army Roster',
          body: `You will now select your **[gloss:detachments:detachments]**, units, WARLORD and **[gloss:enhancement:enhancements]** that will be in your army. You will also attach your **[gloss:leader:leader]** and **[gloss:support:support]** units to other units.

When doing so:
▪ You cannot exceed any of the values presented in the Select Battle Size table (25.03). For example, in an Incursion battle, you cannot select **detachments** with a combined value of more than 2 DP.
▪ No unit (including **[gloss:attached-unit:attached]** units) can have more than one **enhancement**.
▪ Your army roster must follow all restrictions placed on it by the rules and units being included in it.`,
          // 25.03 is forced full-width by the battle size table after it (hasTableAfter),
          // which resets the column run — 25.04, the chapter's last subsection, would then
          // be alone in its own run and collapse back to full width too (see the "lone
          // item" rule in chunkSubsections). Split it into per-heading chunks so the run
          // has more than one item and the two-column layout actually kicks in.
          splitBodies: [
            `### Select Detachments
You can now use your DP to select **[gloss:detachments:detachments]** for your army. You can only select from those available to your **[gloss:army-faction:army faction]**. Each one will give you access to different **[gloss:force-disposition:force dispositions]**, **[gloss:detachment-rule:detachment rules]**, **[gloss:enhancement:enhancements]** and/or **[gloss:stratagem:stratagems]** to use in the coming battle. You cannot select the same **detachment** more than once. Record your selected **detachments** on your army roster.

Note that some **detachment rules** list units and other **detachments** that your army either must include or cannot include; you must follow all such rules when building your army for the **detachments** you have selected.`,
            `### Select Units
Select all the units you want to include in your army. You can only select units with your faction keyword and units available to your **[gloss:army-faction:army faction]**. Each time you include a unit in your army, it can take any wargear or options it has access to. Note on your army roster the number of models in the unit, any wargear and upgrades it has, and its points value.

Select one CHARACTER unit to be your [gloss:warlord:Warlord]'s unit. This must be a unit that has the faction keyword you chose as your **army faction**. Then select one CHARACTER model in that unit to be your Warlord – the supreme leader of your army – and make a note of this on your army roster. That model gains the WARLORD keyword. Some units have a rule on their datasheet stating that they must be your WARLORD. If you want to include one or more of these units in your army, you must select one of them to be your WARLORD. Rules that state that a model cannot be your WARLORD take precedence over ones that require it to be your WARLORD.`,
            `### Attach Leaders and Support Units
For each **[gloss:leader:leader]** and **[gloss:support:support]** unit in your roster, you can attach them to a **[gloss:bodyguard:bodyguard]** unit that they can join, following the rules for [gloss:forming-attached-units:Forming Attached Units] (19.01). Each **support** unit in your roster must be attached to a **bodyguard** unit.`,
            `### Select Enhancements
Select all of the **[gloss:enhancement:enhancements]** you want to include from the **detachments** you selected and give each one to a different unit in your army. When you do, increase those units' points values accordingly. The points values for **enhancements** can be found in the Warhammer 40,000 app.

Unless otherwise stated:
▪ Only CHARACTER units can be given **enhancements**. If such a unit contains more than one model, select one CHARACTER model in that unit to have that **enhancement**.
▪ EPIC HEROES cannot have **enhancements**.
▪ Your army cannot include more than one of the same **enhancement**.

**[gloss:upgrade:Upgrades]:** Some **enhancements** are tagged with 'Upgrade'. Unlike other **enhancements**:
▪ These can be given to non-CHARACTER units.
▪ You can include up to three of the same Upgrade in your army (the second and third instances of the same Upgrade do not count towards the total number of **enhancements** in your army, but you must still spend the stated points cost each time).

If you are playing an Incursion battle, you can select a 3DP **detachment** as your only **detachment**.`,
          ],
        },
      ],
      battleSizeTable: {
        headers: ['Battle Size', 'Points Total', 'Detachment Points (DP)', 'Enhancement Limit', 'Unit Limit*'],
        rows: [
          ['Incursion', '1000', '2', '2', '2'],
          ['Strike Force', '2000', '3', '4', '3'],
          ['Onslaught', '3000', '3', '4', '3'],
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
          body: `Детали вашей армии должны быть записаны в [gloss:army-roster:список армии]. Вы можете либо записать его, либо использовать приложение Warhammer 40,000. Игроки должны показать свой готовый список армии оппоненту до начала битвы.`,
        },
        {
          id: 'section-25-02',
          sectionNum: '25.02',
          title: 'Выберите фракцию армии',
          body: `Отметьте в списке армии одно ключевое слово фракции, которое будет вашей **[gloss:army-faction:фракцией армии]**.`,
        },
        {
          id: 'section-25-03',
          sectionNum: '25.03',
          title: 'Выберите размер битвы',
          body: `Вместе с оппонентом выберите один из размеров битвы ниже. Это определит общее количество очков (также известное как «всего очков»), которое каждый игрок может потратить на построение своей армии. Значения очков для юнитов можно найти в приложении Warhammer 40,000. Вам нужно будет сверяться с ними при построении армии.

Размер битвы также определяет общее количество очков детачмента (Detachment Points, DP), которыми игроки разблокируют **[gloss:detachments:детачменты]**, количество юнитов с одинаковым названием листа данных, которое они могут включить в армию, и количество **[gloss:enhancement:улучшений]**, которое они могут включить в армию.

Они сведены ниже.`,
        },
        {
          id: 'section-25-04',
          sectionNum: '25.04',
          title: 'Заполните список армии',
          body: `Теперь вы выберете **[gloss:detachments:детачменты]**, юниты, WARLORD и **[gloss:enhancement:улучшения]**, которые будут в вашей армии. Вы также присоедините свои отряды **[gloss:leader:лидера]** и **[gloss:support:поддержки]** к другим отрядам.

При этом:
▪ Вы не можете превысить ни одно из значений, указанных в таблице «Выберите размер битвы» (25.03). Например, в битве Incursion вы не можете выбрать **детачменты** с суммарной стоимостью более 2 DP.
▪ Ни один отряд (включая **[gloss:attached-unit:составные]** отряды) не может иметь более одного **улучшения**.
▪ Ваш список армии должен соблюдать все ограничения, налагаемые правилами и включёнными в него юнитами.`,
          splitBodies: [
            `### Выбор детачментов
Теперь вы можете использовать свои DP для выбора **[gloss:detachments:детачментов]** для вашей армии. Вы можете выбирать только из доступных вашей **[gloss:army-faction:фракции армии]**. Каждый из них даст вам доступ к разным **[gloss:force-disposition:диспозициям сил]**, **[gloss:detachment-rule:правилам детачмента]**, **[gloss:enhancement:улучшениям]** и/или **[gloss:stratagem:стратагемам]** для использования в предстоящей битве. Вы не можете выбрать один и тот же **детачмент** более одного раза. Запишите выбранные **детачменты** в список армии.

Обратите внимание, что некоторые **правила детачмента** перечисляют юниты и другие **детачменты**, которые ваша армия обязана включить или не может включить; вы должны соблюдать все такие правила при построении армии для выбранных вами **детачментов**.`,
            `### Выбор юнитов
Выберите все юниты, которые вы хотите включить в свою армию. Вы можете выбирать только юниты с вашим ключевым словом фракции и юниты, доступные вашей **[gloss:army-faction:фракции армии]**. Каждый раз, когда вы включаете юнит в армию, он может взять любое снаряжение или опции, к которым у него есть доступ. Запишите в список армии количество моделей в юните, его снаряжение и улучшения, а также его стоимость в очках.

Выберите один отряд CHARACTER, который будет отрядом вашего [gloss:warlord:Военачальника]. Это должен быть отряд с ключевым словом фракции, выбранным вами как **фракция армии**. Затем выберите одну модель CHARACTER в этом отряде, чтобы она стала вашим Военачальником — верховным лидером вашей армии — и отметьте это в списке армии. Эта модель получает ключевое слово WARLORD. У некоторых юнитов в листе данных есть правило, гласящее, что они должны быть вашим WARLORD. Если вы хотите включить один или несколько таких юнитов в армию, вы должны выбрать одного из них своим WARLORD. Правила, гласящие, что модель не может быть вашим WARLORD, имеют приоритет над теми, что требуют, чтобы она была вашим WARLORD.`,
            `### Присоединение лидеров и отрядов поддержки
Для каждого отряда **[gloss:leader:лидера]** и **[gloss:support:поддержки]** в вашем списке вы можете присоединить их к отряду **[gloss:bodyguard:телохранителей]**, к которому они могут присоединиться, следуя правилам «[gloss:forming-attached-units:Создание объединённых отрядов]» (19.01). Каждый отряд **поддержки** в вашем списке должен быть присоединён к отряду **телохранителей**.`,
            `### Выбор улучшений
Выберите все **[gloss:enhancement:улучшения]**, которые вы хотите включить, из выбранных вами **детачментов**, и дайте каждое из них разному юниту в вашей армии. Когда вы это делаете, увеличьте стоимость этих юнитов в очках соответственно. Стоимость **улучшений** в очках можно найти в приложении Warhammer 40,000.

Если не указано иное:
▪ Только отряды CHARACTER могут получать **улучшения**. Если такой отряд содержит более одной модели, выберите одну модель CHARACTER в этом отряде, чтобы она получила это **улучшение**.
▪ EPIC HEROES не могут иметь **улучшений**.
▪ Ваша армия не может включать более одного одинакового **улучшения**.

**[gloss:upgrade:Улучшения-апгрейды]:** Некоторые **улучшения** помечены тегом «Upgrade». В отличие от других **улучшений**:
▪ Их можно давать отрядам, не являющимся CHARACTER.
▪ Вы можете включить до трёх одинаковых Upgrade в свою армию (второй и третий экземпляры одного и того же Upgrade не учитываются в общем количестве **улучшений** в вашей армии, но вы всё равно должны каждый раз платить указанную стоимость в очках).

Если вы играете битву Incursion, вы можете выбрать один **детачмент** на 3DP в качестве своего единственного **детачмента**.`,
          ],
        },
      ],
      battleSizeTable: {
        headers: ['Размер битвы', 'Всего очков', 'Очки детачмента (DP)', 'Лимит улучшений', 'Лимит юнитов*'],
        rows: [
          ['Incursion (Вторжение)', '1000', '2', '2', '2'],
          ['Strike Force (Ударные силы)', '2000', '3', '4', '3'],
          ['Onslaught (Натиск)', '3000', '3', '4', '3'],
        ],
        footnote: '* Лимит юнитов для юнитов **BATTLELINE** и **DEDICATED TRANSPORT** удваивается относительно указанного выше, и каждый **EPIC HERO** имеет лимит юнитов 1, независимо от размера битвы.',
      },
    },
  ],
}
