// Central glossary for inline `[gloss:<id>:<label>]` tokens (see useRenderInline.js).
// Each entry: `term` = the English original (shown in the popover header, same in both
// locales), `en`/`ru` = a short 1–2 sentence definition per locale (the popover body).
// Loaded lazily on first gloss click (see useKeywordPopover.js), so it stays out of the
// entry chunk. Definitions may use the same inline markup as rule text (**bold**, [KEYWORD]).
export const glossary = {
  // — Positioning & distances —
  'base': {
    term: 'Base',
    en: 'The physical base a model stands on. Many rules measure distances and contact to and from a model’s base (or its hull, for models without a base).',
    ru: 'Физическая база (подставка), на которой стоит модель. Многие правила измеряют расстояния и контакт от базы модели (или от корпуса — у моделей без базы).',
  },
  'footprint': {
    term: 'Footprint',
    en: 'The area a model’s base (or hull) covers on the battlefield when viewed from above.',
    ru: 'Площадь, которую база модели (или её корпус) занимает на поле боя, если смотреть сверху.',
  },
  'within': {
    term: 'Within',
    en: 'A model is Within a distance if **any** part of its base (or hull) is at or closer than that distance; a unit is Within if any of its models are.',
    ru: 'Модель находится «в пределах» расстояния, если **любая** часть её базы (или корпуса) находится на этом расстоянии или ближе; юнит — если в пределах находится любая его модель.',
  },
  'wholly-within': {
    term: 'Wholly Within',
    en: 'A model is Wholly Within a distance if **every** part of its base (or hull) is at or closer than that distance; a unit is Wholly Within if all of its models are.',
    ru: 'Модель находится «полностью в пределах» расстояния, если **каждая** часть её базы (или корпуса) находится на этом расстоянии или ближе; юнит — если полностью в пределах находятся все его модели.',
  },
  'base-contact': {
    term: 'Base Contact',
    en: 'Two models are in Base Contact (base-to-base) when their bases (or hulls) are touching. Models can also be in base contact with terrain.',
    ru: 'Две модели находятся в контакте баз (база к базе), когда их базы (или корпуса) соприкасаются. Модель может быть в контакте баз и с элементом ландшафта.',
  },
  'maximum-distance': {
    term: 'Maximum Distance',
    en: 'The greatest distance a model can be moved by a given move.',
    ru: 'Наибольшее расстояние, на которое модель может переместиться данным манёвром.',
  },
  'set-up-distance': {
    term: 'Set-up Distance',
    en: 'A distance restriction that models must satisfy when they are set up on the battlefield.',
    ru: 'Ограничение по расстоянию, которому должны удовлетворять модели при размещении на поле боя.',
  },

  // — Dice, rolls & tests —
  're-roll': {
    term: 'Re-roll',
    en: 'Roll a dice (or dice) again. A re-roll happens before modifiers are applied, and a dice can never be re-rolled more than once.',
    ru: 'Перебросить кубик (или кубики). Переброс происходит до применения модификаторов, и один кубик нельзя перебрасывать более одного раза.',
  },
  'roll-off': {
    term: 'Roll-off',
    en: 'Each player rolls one D6; the highest roll wins. Re-roll ties. Used to decide who chooses, goes first, etc.',
    ru: 'Каждый игрок бросает один D6; побеждает наибольший результат. При ничьей — перебрасываются. Используется, чтобы решить, кто выбирает, ходит первым и т. п.',
  },
  'modifier': {
    term: 'Modifier',
    en: 'A rule that increases or decreases a characteristic or roll. Modifiers are applied after re-rolls.',
    ru: 'Правило, увеличивающее или уменьшающее характеристику или бросок. Модификаторы применяются после переброски.',
  },
  'hit-roll': {
    term: 'Hit Roll',
    en: 'A D6 roll to see if an attack hits, compared to the weapon’s Ballistic Skill or Weapon Skill.',
    ru: 'Бросок D6, определяющий, попала ли атака: сверяется с навыком стрельбы или ближнего боя оружия.',
  },
  'wound-roll': {
    term: 'Wound Roll',
    en: 'A D6 roll to see if a hit wounds, comparing the weapon’s Strength to the target’s Toughness.',
    ru: 'Бросок D6, определяющий, ранила ли атака: сравнивается сила оружия с выносливостью цели.',
  },
  'save-roll': {
    term: 'Saving Throw (Sv)',
    en: 'A D6 roll to avoid damage, using the target’s Save (or Invulnerable Save) characteristic.',
    ru: 'Бросок D6, позволяющий избежать урона, с использованием спас-броска (или инвуль-спаса) цели.',
  },
  'damage-roll': {
    term: 'Damage (D)',
    en: 'The amount of damage an unsaved wound inflicts, from the weapon’s Damage (D) characteristic.',
    ru: 'Величина урона от неспасённого ранения, определяемая характеристикой урона (D) оружия.',
  },
  'critical-hit': {
    term: 'Critical Hit',
    en: 'An unmodified hit roll of 6. It always hits and can trigger rules like [SUSTAINED HITS] or [LETHAL HITS].',
    ru: 'Немодифицированный бросок на попадание 6: всегда попадает и может активировать правила вроде [SUSTAINED HITS] или [LETHAL HITS].',
  },
  'critical-wound': {
    term: 'Critical Wound',
    en: 'An unmodified wound roll of 6. It always wounds and can trigger rules like [DEVASTATING WOUNDS].',
    ru: 'Немодифицированный бросок на ранение 6: всегда ранит и может активировать правила вроде [DEVASTATING WOUNDS].',
  },
  'hazard-roll': {
    term: 'Hazardous Test',
    en: 'A test taken for Hazardous weapons: on a 1 the bearer suffers mortal wounds or is destroyed.',
    ru: 'Проверка для оружия с правилом Hazardous: при результате 1 носитель получает смертельные раны или уничтожается.',
  },

  // — Leadership & Battle-shock —
  'leadership-roll': {
    term: 'Leadership Roll',
    en: 'A general term for rolls made against the Leadership characteristic, such as Battle-shock tests.',
    ru: 'Общий термин для проверок, совершаемых по характеристике лидерства, например тестов на боевой шок.',
  },
  'leadership-test': {
    term: 'Leadership Test',
    en: 'Roll 2D6; the test is passed if the result equals or beats the unit’s Leadership characteristic.',
    ru: 'Бросьте 2D6; тест пройден, если результат равен характеристике лидерства юнита или превышает её.',
  },
  'battle-shock-test': {
    term: 'Battle-shock Test',
    en: 'A Leadership test a unit takes when required (e.g. while below Half-strength). Failing it leaves the unit Battle-shocked.',
    ru: 'Тест на лидерство, который юнит проходит при необходимости (например, будучи ниже половинной численности). Провал делает юнит подверженным боевому шоку.',
  },
  'battle-shocked': {
    term: 'Battle-shocked',
    en: 'A unit that failed a Battle-shock test. Until the start of its next Command phase its Objective Control is 0, it cannot use Stratagems, and it cannot start Actions.',
    ru: 'Юнит, проваливший проверку на боевой шок. До начала своей следующей командной фазы его Контроль цели равен 0, он не может использовать стратагемы и не может начинать действия.',
  },

  // — Units, models & profiles —
  'wounds': {
    term: 'Wounds (W)',
    en: 'The Wounds (W) characteristic: how much damage a model can take before it is destroyed.',
    ru: 'Характеристика ран (W): сколько урона может выдержать модель, прежде чем будет уничтожена.',
  },
  'destroyed': {
    term: 'Destroyed',
    en: 'A model is destroyed when its wounds are reduced to 0; it is removed from play.',
    ru: 'Модель уничтожена, когда её раны снижаются до 0; она убирается из игры.',
  },
  'heal': {
    term: 'Heal',
    en: 'To restore lost wounds to a model, up to its Wounds characteristic.',
    ru: 'Восстановить модели утраченные раны, но не выше её характеристики ран.',
  },
  'revive': {
    term: 'Revive',
    en: 'To return destroyed models to a unit (or a model to play), as specified by a rule.',
    ru: 'Вернуть уничтоженные модели в юнит (или модель в игру), как указано правилом.',
  },
  'starting-strength': {
    term: 'Starting Strength',
    en: 'The number of models a unit has when it is set up at the start of the battle.',
    ru: 'Количество моделей в юните на момент его размещения в начале битвы.',
  },
  'half-strength': {
    term: 'Half-strength',
    en: 'Half of a unit’s Starting Strength, rounding up. Some rules trigger while a unit is below half-strength.',
    ru: 'Половина начальной численности юнита, с округлением вверх. Некоторые правила срабатывают, пока юнит ниже половинной численности.',
  },
  'datasheet': {
    term: 'Datasheet',
    en: 'The rules card for a unit: its characteristics, wargear, abilities and keywords. Different units can share the same datasheet.',
    ru: 'Карточка правил юнита: его характеристики, снаряжение, способности и ключевые слова. Разные юниты могут использовать один и тот же лист данных.',
  },
  'wargear': {
    term: 'Wargear',
    en: 'The weapons and equipment a model is armed with, as listed on its datasheet.',
    ru: 'Оружие и снаряжение модели, указанные в её листе данных.',
  },
  'ability': {
    term: 'Abilities',
    en: 'Special rules a unit has, listed on its datasheet or granted by its army or Detachment.',
    ru: 'Особые правила юнита, указанные в его листе данных или дарованные армией либо отрядом (Detachment).',
  },
  'attack-dice': {
    term: 'Attacks (A)',
    en: 'The dice rolled for a weapon’s Attacks (A) characteristic when it makes its attacks.',
    ru: 'Кубики, которые бросаются за характеристику атак (A) оружия при совершении атак.',
  },

  // — Leaders & attached units —
  'leader': {
    term: 'Leader',
    en: 'A CHARACTER unit that can be attached to a Bodyguard unit to lead it.',
    ru: 'Юнит-ПЕРСОНАЖ, который может присоединиться к юниту-телохранителю (Bodyguard), возглавив его.',
  },
  'support': {
    term: 'Support',
    en: 'A unit that, like a Leader, can be attached to a Bodyguard unit; every Support unit in your roster must be attached to one.',
    ru: 'Юнит, который, как и лидер, может присоединяться к юниту-телохранителю; каждый юнит поддержки в списке должен быть присоединён.',
  },
  'bodyguard': {
    term: 'Bodyguard',
    en: 'A unit that a Leader can be attached to, forming an Attached unit.',
    ru: 'Юнит, к которому может присоединиться лидер, образуя присоединённый юнит.',
  },
  'attached-unit': {
    term: 'Attached Unit',
    en: 'The single unit formed when a Leader (CHARACTER) joins a Bodyguard unit; they act as one unit.',
    ru: 'Юнит, образованный, когда лидер (ПЕРСОНАЖ) присоединяется к юниту-телохранителю; они действуют как один юнит.',
  },
  'forming-attached-units': {
    term: 'Forming Attached Units',
    en: 'The rules for attaching Leader and Support units to a Bodyguard unit they can join, forming a single Attached unit.',
    ru: 'Правила присоединения отрядов лидера и поддержки к юниту-телохранителю, к которому они могут присоединиться, образуя один составной юнит.',
  },
  'enhancement': {
    term: 'Enhancement',
    en: 'An upgrade from a Detachment that can be given to a CHARACTER, modifying its abilities or wargear.',
    ru: 'Усиление из отряда (Detachment), которое можно дать ПЕРСОНАЖУ, изменяя его способности или снаряжение.',
  },

  // — Selection & moves —
  'selected-to-move': {
    term: 'Selected to Move',
    en: 'When a unit is picked to move during the Movement phase.',
    ru: 'Когда юнит выбирается для совершения манёвра в фазе движения.',
  },
  'selected-to-shoot': {
    term: 'Selected to Shoot',
    en: 'When a unit is picked to shoot during the Shooting phase.',
    ru: 'Когда юнит выбирается для стрельбы в фазе стрельбы.',
  },
  'selected-to-fight': {
    term: 'Selected to Fight',
    en: 'When a unit is picked to fight during the Fight phase.',
    ru: 'Когда юнит выбирается для ближнего боя в фазе боя.',
  },
  'selected-to-attack': {
    term: 'Selected to Attack',
    en: 'When a unit is picked to make its attacks.',
    ru: 'Когда юнит выбирается для совершения атак.',
  },
  'move-type': {
    term: 'Move Type',
    en: 'The kind of move being made — Normal, Advance, Fall Back or Charge.',
    ru: 'Тип совершаемого манёвра — обычный манёвр, продвижение, отход или манёвр нападения.',
  },
  'normal-move': {
    term: 'Normal Move',
    en: 'A move up to a unit’s Move (M) characteristic made in the Movement phase.',
    ru: 'Обычный манёвр на величину до характеристики движения (M) юнита в фазе движения.',
  },
  'remain-stationary': {
    term: 'Remain Stationary',
    en: 'Choosing not to move a unit in the Movement phase; it counts as having Remained Stationary.',
    ru: 'Выбор не перемещать юнит в фазе движения; он считается оставшимся недвижимым.',
  },
  'strategic-reserves': {
    term: 'Strategic Reserves',
    en: 'Units held off the battlefield that arrive as reinforcements during the battle.',
    ru: 'Юниты, оставленные вне поля боя, которые прибывают как подкрепление во время битвы.',
  },

  // — Engagement —
  'engagement-range': {
    term: 'Engagement Range',
    en: 'The zone within 1" horizontally and 5" vertically of a model, used for combat and movement restrictions.',
    ru: 'Зона в пределах 1" по горизонтали и 5" по вертикали от модели, определяющая ограничения боя и движения.',
  },
  'engaged': {
    term: 'Engaged',
    en: 'A unit within Engagement Range of one or more enemy units.',
    ru: 'Юнит, находящийся в радиусе связывания одного или нескольких вражеских юнитов.',
  },
  'unengaged': {
    term: 'Unengaged',
    en: 'A unit that is not within Engagement Range of any enemy unit.',
    ru: 'Юнит, который не находится в радиусе связывания ни одного вражеского юнита.',
  },
  'friendly': {
    term: 'Friendly',
    en: 'A unit or model from your own army; models in the same army are friendly to each other.',
    ru: 'Юнит или модель из вашей собственной армии; модели одной армии союзны друг другу.',
  },
  'enemy': {
    term: 'Enemy',
    en: 'A unit or model belonging to an opposing army.',
    ru: 'Юнит или модель, принадлежащие армии противника.',
  },

  // — Visibility —
  'visible': {
    term: 'Visible',
    en: 'A target is visible to a model if any part of it can be seen from that model.',
    ru: 'Цель видима для модели, если любую её часть можно увидеть от этой модели.',
  },
  'fully-visible': {
    term: 'Fully Visible',
    en: 'A target is fully visible if all of it can be seen from the observing model.',
    ru: 'Цель полностью видима, если можно увидеть её целиком от наблюдающей модели.',
  },
  'hidden': {
    term: 'Hidden',
    en: 'A model that cannot be seen at all from the observing model.',
    ru: 'Модель, которую вообще нельзя увидеть от наблюдающей модели.',
  },
  'line-of-sight': {
    term: 'Line of Sight',
    en: 'An unobstructed view drawn from an observing model to a target to check visibility.',
    ru: 'Непреграждённая линия обзора от наблюдающей модели к цели для проверки видимости.',
  },
  'detection-range': {
    term: 'Detection Range',
    en: 'A range within which hidden enemy units can be detected (used by some rules).',
    ru: 'Дистанция, в пределах которой можно обнаружить скрытые вражеские юниты (используется некоторыми правилами).',
  },

  // — Damage & mortal wounds —
  'mortal-wound': {
    term: 'Mortal Wounds',
    en: 'Damage that ignores saving throws; each mortal wound removes one wound from the target.',
    ru: 'Урон, игнорирующий спас-броски; каждая смертельная рана снимает одну рану с цели.',
  },

  // — Terrain —
  'terrain': {
    term: 'Terrain',
    en: 'The scenery on the battlefield — ruins, forests, barricades and so on — represented by terrain features placed in terrain areas.',
    ru: 'Укрытия на поле боя — руины, леса, баррикады и т.п., — представленные элементами ландшафта, размещёнными в областях укрытий.',
  },
  'terrain-area': {
    term: 'Terrain Area',
    en: 'The area covered by an Area Terrain feature, used for visibility and the Benefit of Cover.',
    ru: 'Область, занимаемая участком укрытия, используемая для видимости и преимущества укрытия.',
  },
  'terrain-feature': {
    term: 'Terrain Feature',
    en: 'A piece of terrain on the battlefield, such as ruins, woods or an obstacle.',
    ru: 'Элемент ландшафта на поле боя, например руины, лес или препятствие.',
  },

  // — Objectives, Stratagems, Actions —
  'objective': {
    term: 'Objective',
    en: 'An objective marker on the battlefield that units contest to score Victory Points.',
    ru: 'Маркер цели на поле боя, который юниты оспаривают, чтобы набирать очки победы.',
  },
  'stratagem': {
    term: 'Stratagem',
    en: 'A special rule you can use by spending Command Points (CP), usually at a specified moment.',
    ru: 'Особое правило, которое можно применить, потратив командные очки (CP), обычно в указанный момент.',
  },
  'action': {
    term: 'Action',
    en: 'A special activity a unit can start instead of doing other things; it usually completes later to gain a benefit.',
    ru: 'Особая активность (action), которую юнит может начать вместо других действий; обычно завершается позже, давая эффект.',
  },
  'select-weapons': {
    term: 'Select Weapons',
    en: 'The step where you choose which of an attacking unit’s weapons will shoot or fight.',
    ru: 'Этап, на котором вы выбираете, какое оружие атакующего юнита будет стрелять или сражаться.',
  },

  // — Army building & structure —
  'persisting-effects': {
    term: 'Persisting Effects',
    en: 'Effects that continue to apply for a stated duration (e.g. “until the end of the turn”) rather than resolving instantly.',
    ru: 'Эффекты, которые продолжают действовать в течение указанного срока (например, «до конца хода»), а не отыгрываются мгновенно.',
  },
  'battle-round': {
    term: 'Battle Round',
    en: 'One full battle round, in which both players take a turn. A battle lasts five battle rounds.',
    ru: 'Полный раунд боя, в котором ход совершают оба игрока. Битва длится пять раундов боя.',
  },
  'army-rules': {
    term: 'Army Rules',
    en: 'Rules that apply to your whole army, determined by its Faction.',
    ru: 'Правила, применяемые ко всей вашей армии, определяемые её фракцией.',
  },
  'detachments': {
    term: 'Detachment',
    en: 'The set of rules, Enhancements and Stratagems chosen for your army from its Faction.',
    ru: 'Набор правил, усилений и стратагем, выбранный для вашей армии из её фракции.',
  },

  // — Muster Your Army —
  'army-roster': {
    term: 'Army Roster',
    en: 'The written (or app-based) record of your army: its faction, detachments, units, wargear, enhancements and points.',
    ru: 'Запись вашей армии (на бумаге или в приложении): её фракция, детачменты, юниты, снаряжение, улучшения и очки.',
  },
  'army-faction': {
    term: 'Army Faction',
    en: 'The one faction keyword noted on your army roster; it determines which units and detachments your army can include.',
    ru: 'Одно ключевое слово фракции, записанное в вашем списке армии; определяет, какие юниты и детачменты может включать армия.',
  },
  'warlord': {
    term: 'Warlord',
    en: 'The supreme leader of your army: one CHARACTER model you select when mustering. That model gains the WARLORD keyword.',
    ru: 'Верховный лидер вашей армии: одна модель CHARACTER, выбираемая при сборе армии. Эта модель получает ключевое слово WARLORD.',
  },
  'force-disposition': {
    term: 'Force Disposition',
    en: 'A battle-plan affiliation granted by your detachments; the two players’ Force Dispositions together determine the Primary Mission.',
    ru: 'Тип боевого расписания, который дают ваши детачменты; сочетание диспозиций сил обоих игроков определяет основную миссию.',
  },
  'detachment-rule': {
    term: 'Detachment Rule',
    en: 'A special rule your army gains from a Detachment you selected for it.',
    ru: 'Особое правило, которое ваша армия получает от выбранного для неё детачмента.',
  },
  'upgrade': {
    term: 'Upgrade',
    en: 'An Enhancement tagged ‘Upgrade’: it can be given to non-CHARACTER units, and you can include up to three of the same Upgrade.',
    ru: 'Улучшение с тегом «Upgrade»: его можно давать отрядам не-CHARACTER, и в армию можно включить до трёх одинаковых Upgrade.',
  },
  'coherency': {
    term: 'Unit Coherency',
    en: 'The formation rule keeping a unit’s models within 2" of another model in the unit (a chain of two for units of 7+ models).',
    ru: 'Правило построения: модели юнита должны быть в пределах 2" от другой модели юнита (цепочкой по двое для юнитов из 7+ моделей).',
  },

  // — Battle Round: movement types —
  'advance': {
    term: 'Advance',
    en: 'A move made instead of a Normal move that adds an Advance roll to the unit’s Move; it usually can’t shoot or charge afterwards.',
    ru: 'Манёвр вместо обычного, добавляющий к движению юнита бросок продвижения; после него обычно нельзя стрелять или нападать.',
  },
  'advance-move': {
    term: 'Advance Move',
    en: 'The move made when a unit Advances: its Move characteristic plus the Advance roll.',
    ru: 'Манёвр, совершаемый при продвижении юнита: характеристика движения плюс бросок продвижения.',
  },
  'advance-roll': {
    term: 'Advance Roll',
    en: 'A D6 added to a unit’s Move characteristic when it Advances.',
    ru: 'D6, добавляемый к характеристике движения юнита при продвижении.',
  },
  'fall-back-move': {
    term: 'Fall Back',
    en: 'A move that lets a unit leave Engagement Range; it usually can’t shoot or charge that turn.',
    ru: 'Манёвр, позволяющий юниту выйти из радиуса связывания; в этом ходу он обычно не может стрелять или нападать.',
  },
  'ordered-retreat': {
    term: 'Ordered Retreat',
    en: 'A controlled Fall Back in which each model can be moved up to its Move, made under certain rules.',
    ru: 'Упорядоченный отход — контролируемый манёвр отхода, при котором каждую модель можно переместить на величину её движения.',
  },
  'desperate-escape': {
    term: 'Desperate Escape',
    en: 'A test taken when a unit Falls Back through enemies, or Advances/Falls Back while battle-shocked. On a 1–2 a model is destroyed.',
    ru: 'Проверка, когда юнит отходит сквозь врагов или продвигается/отходит под боевым шоком. При 1–2 модель уничтожается.',
  },

  // — Battle Round: charging —
  'charge': {
    term: 'Charge',
    en: 'An attempt in the Charge phase to move a unit into Engagement Range of one or more enemy units.',
    ru: 'Попытка в фазе нападения переместить юнит в радиус связывания одного или нескольких вражеских юнитов.',
  },
  'declare-charge': {
    term: 'Declare a Charge',
    en: 'Choosing an eligible unit and its charge targets before making the charge roll.',
    ru: 'Выбор подходящего юнита и его целей нападения перед броском нападения.',
  },
  'charge-move': {
    term: 'Charge Move',
    en: 'The move a unit makes after a successful charge roll, ending in Engagement Range of a target it declared.',
    ru: 'Манёвр, который юнит совершает после успешного броска нападения, завершаясь в радиусе связывания объявленной цели.',
  },
  'charge-roll': {
    term: 'Charge Roll',
    en: '2D6 rolled to determine how far a charging unit can move.',
    ru: '2D6, бросаемые, чтобы определить, как далеко может переместиться нападающий юнит.',
  },
  'charge-target': {
    term: 'Charge Target',
    en: 'An enemy unit declared as a target of a charge.',
    ru: 'Вражеский юнит, объявленный целью нападения.',
  },
  'failed-charge': {
    term: 'Failed Charge',
    en: 'A charge whose roll is too low to reach a target in Engagement Range without breaking the rules; the unit does not move.',
    ru: 'Нападение, броска которого не хватает, чтобы достичь цели в радиусе связывания без нарушения правил; юнит не перемещается.',
  },

  // — Battle Round: fighting & consolidation —
  'pile-in': {
    term: 'Pile In',
    en: 'A move of up to 3" that fighting models make towards the closest enemy unit before making their attacks.',
    ru: 'Манёвр до 3", который сражающиеся модели совершают к ближайшему вражескому юниту перед атаками.',
  },
  'consolidation': {
    term: 'Consolidate',
    en: 'A move of up to 3" a unit makes after it finishes fighting (Консолидация).',
    ru: 'Консолидация — манёвр до 3", который юнит совершает после завершения боя.',
  },
  'overrun': {
    term: 'Overrun',
    en: 'A Consolidation move made towards the closest enemy unit, potentially into Engagement Range.',
    ru: 'Консолидация в сторону ближайшего вражеского юнита, возможно в радиус связывания.',
  },
  'fights-first': {
    term: 'Fights First',
    en: 'A rule letting a unit fight in the Fights First step, before units that do not have it.',
    ru: 'Правило, позволяющее юниту сражаться на этапе «сначала бьют», раньше юнитов без него.',
  },
  'fight-type': {
    term: 'Fight Type',
    en: 'The reason a unit is Eligible to Fight — it charged this turn, or is within Engagement Range of an enemy.',
    ru: 'Основание, по которому юнит может сражаться: совершил нападение в этом ходу или находится в радиусе связывания врага.',
  },
  'shooting-type': {
    term: 'Shooting Type',
    en: 'The reason a unit is Eligible to Shoot — e.g. it did not Advance or Fall Back, or a rule lets it shoot anyway.',
    ru: 'Основание, по которому юнит может стрелять: например, он не продвигался и не отходил, либо правило разрешает стрельбу.',
  },

  // — Battle Round: eligibility —
  'eligible-to-fight': {
    term: 'Eligible to Fight',
    en: 'A unit can be selected to fight if it is within Engagement Range of an enemy unit, or made a Charge move this turn.',
    ru: 'Юнит может быть выбран для боя, если он в радиусе связывания вражеского юнита или совершил манёвр нападения в этом ходу.',
  },
  'eligible-to-shoot': {
    term: 'Eligible to Shoot',
    en: 'A unit is normally eligible to shoot if it did not Advance or Fall Back and is not battle-shocked.',
    ru: 'Юнит обычно может стрелять, если он не продвигался и не отходил и не подвержен боевому шоку.',
  },
  'eligible-to-charge': {
    term: 'Eligible to Declare a Charge',
    en: 'A unit can declare a charge if it is not within Engagement Range and did not Advance or Fall Back this turn.',
    ru: 'Юнит может объявить нападение, если он не в радиусе связывания и не продвигался и не отходил в этом ходу.',
  },
  'eligible-to-act': {
    term: 'Eligible to Start an Action',
    en: 'A unit can start an Action only if it is eligible — e.g. not battle-shocked and, usually, not within Engagement Range.',
    ru: 'Юнит может начать действие, только если он подходит — например, не подвержен боевому шоку и, как правило, не в радиусе связывания.',
  },

  // — Battle Round: misc —
  'command-points': {
    term: 'Command Points',
    en: 'A resource (CP) spent to use Stratagems. Players usually gain 1 CP each Command phase.',
    ru: 'Ресурс (командные очки, CP), тратящийся на стратагемы. Обычно игроки получают 1 CP каждую командную фазу.',
  },
  'battle-shock': {
    term: 'Battle-shock',
    en: 'The Battle-shock step of the Command phase, where units below Half-strength must take Battle-shock tests.',
    ru: 'Этап боевого шока в командной фазе, когда юниты ниже половинной численности проходят проверки на боевой шок.',
  },
  'benefit-of-cover': {
    term: 'Benefit of Cover',
    en: 'Cover that improves a unit’s saving throw against ranged attacks by 1 (to a maximum of 3+).',
    ru: 'Укрытие, улучшающее спас-бросок юнита против дальних атак на 1 (не лучше 3+).',
  },

  // — Attack sequence steps —
  'select-targets': {
    term: 'Select Targets',
    en: 'The attack step where the attacking player picks which enemy unit(s) the attacking unit’s weapons will target.',
    ru: 'Шаг атаки, на котором атакующий игрок выбирает, по каким вражеским юнитам будет вести атаки оружие атакующего юнита.',
  },
  'resolve-attacks': {
    term: 'Resolve Attacks',
    en: 'The attack step where you make Hit rolls, Wound rolls and saving throws, then inflict damage.',
    ru: 'Шаг атаки, на котором вы совершаете броски на попадание, на ранение и спас-броски, а затем наносите урон.',
  },
  'allocation-order': {
    term: 'Allocation Order',
    en: 'The order in which the target’s controlling player allocates each attack to their models during Resolve Attacks (nearest models first if a model already has an allocated attack).',
    ru: 'Порядок, в котором контролирующий игрок цели распределяет каждую атаку по своим моделям при отыгрыше атак (сначала на модель с уже распределённой атакой).',
  },
  'inflict-damage': {
    term: 'Inflict Damage',
    en: 'The attack step where unsaved wounds reduce the target’s Wounds characteristic; a model is destroyed when reduced to 0.',
    ru: 'Шаг атаки, на котором неспасённые ранения уменьшают характеристику ран цели; модель уничтожается при снижении до 0.',
  },

  // — Profile characteristics (abbreviations from the datasheet) —
  'move-characteristic': {
    term: 'Move (M)',
    en: 'A model characteristic: the maximum distance in inches it can travel with a Normal, Advance or Fall Back move.',
    ru: 'Характеристика модели: максимальное расстояние в дюймах, на которое она перемещается обычным манёвром, продвижением или отходом.',
  },
  'toughness': {
    term: 'Toughness (T)',
    en: 'A model characteristic representing how durable it is; compared to a weapon’s Strength to determine the wound roll.',
    ru: 'Характеристика прочности модели; сравнивается с силой оружия для определения броска на ранение.',
  },
  'invulnerable-save': {
    term: 'Invulnerable Save (InSv)',
    en: 'A saving throw that can be used against any attack, ignoring the attack’s Armour Penetration.',
    ru: 'Спас-бросок, который можно использовать против любой атаки, игнорируя её бронепробитие.',
  },
  'leadership': {
    term: 'Leadership (Ld)',
    en: 'A model characteristic used for Leadership tests, such as Battle-shock tests.',
    ru: 'Характеристика модели, используемая для тестов на лидерство, например проверок на боевой шок.',
  },
  'objective-control': {
    term: 'Objective Control (OC)',
    en: 'A model characteristic determining how strongly it contests objective markers.',
    ru: 'Характеристика модели, определяющая, насколько сильно она контролирует маркеры целей.',
  },
  'range': {
    term: 'Range (R)',
    en: 'A weapon characteristic: the maximum distance at which a ranged weapon can target enemies. Melee weapons have no Range.',
    ru: 'Характеристика оружия: максимальная дистанция, на которой дальнобойное оружие может нацеливаться на врагов. У оружия ближнего боя дальности нет.',
  },
  'ballistic-skill': {
    term: 'Ballistic Skill (BS)',
    en: 'A ranged weapon characteristic: the D6 result needed for its hit rolls.',
    ru: 'Характеристика дальнобойного оружия: результат D6, нужный для его бросков на попадание.',
  },
  'weapon-skill': {
    term: 'Weapon Skill (WS)',
    en: 'A melee weapon characteristic: the D6 result needed for its hit rolls.',
    ru: 'Характеристика оружия ближнего боя: результат D6, нужный для его бросков на попадание.',
  },
  'strength': {
    term: 'Strength (S)',
    en: 'A weapon characteristic compared to the target’s Toughness to determine the wound roll needed.',
    ru: 'Характеристика оружия, сравниваемая с выносливостью цели для определения нужного броска на ранение.',
  },
  'armour-penetration': {
    term: 'Armour Penetration (AP)',
    en: 'A weapon characteristic that worsens the target’s saving throw (e.g. AP -1 subtracts 1 from the save).',
    ru: 'Характеристика оружия, ухудшающая спас-бросок цели (например, AP -1 вычитает 1 из спас-броска).',
  },

  // — Event Companion / missions —
  'attacker': {
    term: 'Attacker',
    en: 'One of the two battle roles in a mission, decided by a roll-off; the layout labels the Attacker’s battlefield edges.',
    ru: 'Одна из двух боевых ролей в миссии, определяемая перебросом; расстановка обозначает края поля боя Атакующего.',
  },
  'defender': {
    term: 'Defender',
    en: 'One of the two battle roles: the Defender deploys their units first, and the layout labels the Defender’s battlefield edge.',
    ru: 'Одна из двух боевых ролей: Защищающийся развёртывает свои юниты первым, и расстановка обозначает его край поля боя.',
  },
  'primary-mission': {
    term: 'Primary Mission',
    en: 'Your main source of VP (up to 45VP, max 15VP per battle round), determined by the combination of both players’ Force Dispositions.',
    ru: 'Ваш главный источник VP (до 45VP, максимум 15VP за раунд боя), определяемый сочетанием диспозиций сил (Force Disposition) обоих игроков.',
  },
  'secondary-mission': {
    term: 'Secondary Mission',
    en: 'Additional ways to score VP (up to 45VP in total). Before the battle each player secretly chooses Fixed or Tactical Secondary Missions.',
    ru: 'Дополнительные способы набирать VP (в сумме до 45VP). Перед битвой каждый игрок тайно выбирает фиксированные (Fixed) или тактические (Tactical) вторичные миссии.',
  },
  'win-path': {
    term: 'Win Path',
    en: 'The timing of a player’s wins and losses across the rounds of an event, rather than just their number.',
    ru: 'Тайминг побед и поражений игрока по раундам турнира, а не просто их количество.',
  },
  'faction-keyword': {
    term: 'Faction Keyword',
    en: 'The keyword linking a unit to its faction; you note one on your army roster as your army faction when mustering.',
    ru: 'Ключевое слово, связывающее юнит с его фракцией; при сборе армии одно из них записывается в список армии как фракция армии.',
  },
  'refused-attacker': {
    term: 'Refused Attacker',
    en: 'In a Teams Event pairing, the Attacker each Defender did not choose to play against; the two refused Attackers play each other.',
    ru: 'В паринге командного ивента — тот из двух Attacker, против которого Defender не стал играть; отклонённые Attacker обеих команд играют друг с другом.',
  },
  'best-team': {
    term: 'Best Team',
    en: 'The team ranked first at a Teams Event — usually the single team left undefeated at its end.',
    ru: 'Команда, занявшая первое место на командном ивенте, — обычно единственная команда без поражений к его концу.',
  },

  // — Misc glossary terms —
  // — Advanced Rules: transports —
  'transport-capacity': {
    term: 'Transport Capacity',
    en: 'The number and type of models a TRANSPORT can carry, as listed on its datasheet.',
    ru: 'Количество и тип моделей, которые может перевозить ТРАНСПОРТ, согласно его листу данных.',
  },
  'embark': {
    term: 'Embark',
    en: 'To place a unit inside a friendly TRANSPORT it is eligible to embark within.',
    ru: 'Разместить юнит внутри дружественного ТРАНСПОРТА, в который он может погрузиться.',
  },
  'eligible-to-embark': {
    term: 'Eligible to Embark',
    en: 'A unit can embark within a TRANSPORT if it has the required keywords and there is room in its Transport Capacity.',
    ru: 'Юнит может погрузиться в ТРАНСПОРТ, если у него есть нужные ключевые слова и в грузоподъёмности есть место.',
  },
  'disembark': {
    term: 'Disembark',
    en: 'To set up an embarked unit on the battlefield within 3" of its TRANSPORT and more than 1" from enemy models.',
    ru: 'Высадить погруженный юнит на поле боя в пределах 3" от его ТРАНСПОРТА и более чем в 1" от вражеских моделей.',
  },

  // — Advanced Rules: reserves & movement —
  'reinforcements': {
    term: 'Reinforcements',
    en: 'Units arriving from Reserves during the battle rather than being deployed at the start.',
    ru: 'Юниты, прибывающие из резервов во время битвы, а не размещённые в начале.',
  },
  'ingress-move': {
    term: 'Ingress Move',
    en: 'The move a Reserves unit makes as it arrives on the battlefield during the battle.',
    ru: 'Манёвр, который юнит из резервов совершает, прибывая на поле боя во время битвы.',
  },
  'surge-move': {
    term: 'Surge Move',
    en: 'A special extra move some units can make (a “surge”), often outside the Movement phase.',
    ru: 'Особый дополнительный манёвр (рывок), который могут совершать некоторые юниты, часто вне фазы движения.',
  },
  'surge-target': {
    term: 'Surge Target',
    en: 'The point or unit that a Surge move is made towards.',
    ru: 'Точка или юнит, к которым совершается рывок.',
  },
  'reposition': {
    term: 'Reposition',
    en: 'To move a unit to a new position on the battlefield as directed by a rule.',
    ru: 'Переместить юнит на новую позицию на поле боя, как указано правилом.',
  },
  'deployment-zone': {
    term: 'Deployment Zone',
    en: 'The area of the battlefield in which a player sets up their army before the battle begins.',
    ru: 'Область поля боя, в которой игрок размещает свою армию до начала битвы.',
  },

  // — Advanced Rules: abilities & shooting —
  'aura': {
    term: 'Aura Ability',
    en: 'An ability that affects units within a stated range of the model that has it.',
    ru: 'Способность, действующая на юниты в пределах указанного расстояния от модели, обладающей ею.',
  },
  'faction-abilities': {
    term: 'Faction Abilities',
    en: 'Rules shared by every unit of a given Faction.',
    ru: 'Правила, общие для всех юнитов данной фракции.',
  },
  'psychic': {
    term: 'Psychic',
    en: 'The [PSYKER] keyword and its abilities and weapons; some rules interact only with Psychic attacks or abilities.',
    ru: 'Ключевое слово [PSYKER] и его способности и оружие; некоторые правила взаимодействуют только с психическими атаками или способностями.',
  },
  'plunging-fire': {
    term: 'Plunging Fire',
    en: 'A rule where shooting down from a higher elevation ignores the target’s Benefit of Cover.',
    ru: 'Правило, при котором стрельба сверху, с возвышения, игнорирует преимущество укрытия цели.',
  },
  'close-quarters': {
    term: 'Close-quarters Shooting',
    en: 'Shooting made while within Engagement Range under specific rules (e.g. Pistols, or from a TRANSPORT).',
    ru: 'Стрельба в радиусе связывания по особым правилам (например, из пистолетов или из ТРАНСПОРТА).',
  },

  // — Battlefields: terrain traits & terrain rules —
  'terrain-category': {
    term: 'Terrain Category',
    en: 'The classification of a terrain feature (e.g. Ruins, Woods, Hills, Obstacles) that determines which terrain rules apply to it.',
    ru: 'Классификация элемента ландшафта (например, руины, лес, холмы, препятствия), определяющая, какие правила ландшафта к нему применяются.',
  },
  'obscuring': {
    term: 'Obscuring',
    en: 'A terrain trait: for visibility, models cannot be seen through an Obscuring terrain feature.',
    ru: 'Свойство ландшафта: для видимости модели не видны сквозь укрытие со свойством «Obscuring».',
  },
  'dense-terrain': {
    term: 'Dense Terrain',
    en: 'A terrain trait: it blocks line of sight drawn through it to models more than 2" beyond it.',
    ru: 'Свойство ландшафта: перекрывает линию обзора, проводимую сквозь него, к моделям дальше 2" за ним.',
  },
  'light-terrain': {
    term: 'Light Terrain',
    en: 'A terrain category: light terrain can provide cover from incoming attacks, but will not slow an enemy’s advance or offer lasting defence (e.g. barricades, low walls).',
    ru: 'Категория укрытий: лёгкие укрытия могут обеспечить укрытие от направленных атак, но не замедляют продвижение врага и не дают долговременной защиты (например, баррикады, невысокие стены).',
  },
  'solid': {
    term: 'Solid',
    en: 'A terrain trait: models cannot see, move or be set up through a Solid terrain feature.',
    ru: 'Свойство ландшафта: сквозь «Solid»-элемент нельзя видеть, перемещаться или размещаться.',
  },
  'go-to-ground': {
    term: 'Go to Ground',
    en: 'An Action an INFANTRY unit can take to gain the Benefit of Cover and a 6+ invulnerable save until its next turn.',
    ru: 'Действие, которое юнит ПЕХОТЫ может выполнить, чтобы получить преимущество укрытия и инвуль-спас 6+ до своего следующего хода.',
  },
  'level-of-control': {
    term: 'Level of Control',
    en: 'How strongly a unit controls an objective marker — the total Objective Control of its eligible models there versus the enemy’s.',
    ru: 'Насколько сильно юнит контролирует маркер цели — суммарный Контроль цели его подходящих моделей там против вражеского.',
  },

  // — Imported terms (minstrel gloss.txt, 2026-07): players, army & game basics —
  'army': {
    term: 'Army',
    en: 'All the units and models a player brings to a game, chosen within the mission’s and army-building restrictions.',
    ru: 'Все юниты и модели игрока, выбранные для партии в рамках ограничений миссии и правил сборки армии.',
  },
  'battlefield': {
    term: 'Battlefield',
    en: 'The playing surface, set with terrain, on which the armies are deployed and the battle is fought.',
    ru: 'Игровая поверхность с террейном, на которой размещаются армии и идёт сражение.',
  },
  'codex': {
    term: 'Codex',
    en: 'A faction’s book of background, datasheets and rules for its models and playstyles.',
    ru: 'Книга фракции с предысторией, таблицами данных и правилами её моделей и стилей игры.',
  },
  'mission': {
    term: 'Mission',
    en: 'The scenario for a game: it sets deployment, extra rules and victory conditions.',
    ru: 'Сценарий партии: задаёт развёртывание, дополнительные правила и условия победы.',
  },
  'player': {
    term: 'Player',
    en: 'A participant in the game who commands their army and makes decisions for its units and models.',
    ru: 'Участник партии, который управляет своей армией и принимает решения за её юниты и модели.',
  },
  'active-player': {
    term: 'Active Player',
    en: 'The player currently taking their turn or resolving a rule; their opponent is the opposing player.',
    ru: 'Игрок, который в данный момент выполняет ход или отыгрывает правило; его оппонент — противостоящий игрок.',
  },
  'opposing-player': {
    term: 'Opposing Player',
    en: 'The opponent of the active player. When one player becomes active, the other becomes the opposing player.',
    ru: 'Оппонент активного игрока. Когда один игрок становится активным, другой становится противостоящим.',
  },
  'unit': {
    term: 'Unit',
    en: 'One or more models that act together and use a single datasheet.',
    ru: 'Одна или несколько моделей, которые действуют вместе и используют одну таблицу данных.',
  },
  'model': {
    term: 'Model',
    en: 'A single miniature on the battlefield — an infantry trooper, vehicle, monster or other game piece.',
    ru: 'Одна миниатюра на поле боя: пехотинец, техника, монстр или иной игровой элемент.',
  },
  'dice': {
    term: 'Dice',
    en: 'Six-sided dice (D6) used for the rolls, tests and random values throughout the rules.',
    ru: 'Шестигранные кубики (D6), используемые для бросков, проверок и случайных значений в правилах.',
  },
  'inch': {
    term: 'Inch (")',
    en: 'The unit of distance in Warhammer 40,000; one inch is 2.54 cm.',
    ru: 'Единица измерения дистанций в Warhammer 40,000; один дюйм равен 2,54 см.',
  },

  // — Imported terms: datasheet, weapons & attacks —
  'profiles': {
    term: 'Profiles',
    en: 'The datasheet block listing a model’s characteristics — its speed, toughness, save, wounds, leadership and objective control.',
    ru: 'Блок таблицы данных с характеристиками модели: скорость, стойкость, защита, раны, лидерство и контроль цели.',
  },
  'keywords': {
    term: 'Keywords',
    en: 'The words listed on a unit’s datasheet that rules, abilities and restrictions interact with.',
    ru: 'Слова в таблице данных юнита, с которыми взаимодействуют правила, способности и ограничения.',
  },
  'melee-weapons': {
    term: 'Melee Weapons',
    en: 'Weapons used to make melee attacks; a weapon with a Range of ‘Melee’ is a melee weapon.',
    ru: 'Оружие для атак ближнего боя; оружие с дальностью «Melee» является оружием ближнего боя.',
  },
  'ranged-weapons': {
    term: 'Ranged Weapons',
    en: 'Weapons used to make ranged attacks; when shooting, a model can select one or more of the ranged weapons it has.',
    ru: 'Оружие для стрелковых атак; при стрельбе модель может выбрать одно или несколько своих видов стрелкового оружия.',
  },
  'save': {
    term: 'Save (Sv)',
    en: 'The characteristic used to make a save roll after a model is wounded; the roll can be modified by Armour Penetration, cover and other modifiers.',
    ru: 'Характеристика для спас-броска после ранения модели; результат может изменяться бронепробитием, укрытием и другими модификаторами.',
  },
  'transport': {
    term: 'Transport',
    en: 'A model or unit able to carry other units, using the embark, disembark and transport capacity rules.',
    ru: 'Модель или юнит, способные перевозить другие юниты по правилам посадки, высадки и транспортной вместимости.',
  },
  'attack-sequence': {
    term: 'Attack Sequence',
    en: 'The order in which a single attack is resolved: hit, wound, allocate, save and inflict damage.',
    ru: 'Порядок отыгрыша отдельной атаки: попадание, ранение, распределение, спас-бросок и нанесение урона.',
  },
  'ranged-attacks': {
    term: 'Ranged Attacks',
    en: 'Attacks a model makes with ranged weapons in the Shooting phase or by a special rule.',
    ru: 'Атаки, которые модель совершает стрелковым оружием в фазу стрельбы или по особому правилу.',
  },
  'melee-attacks': {
    term: 'Melee Attacks',
    en: 'Attacks a model makes with a melee weapon when its unit is selected to fight; targets must usually be in engagement range.',
    ru: 'Атаки, которые модель совершает оружием ближнего боя, когда её юнит выбран для боя; цели обычно должны быть в радиусе связывания.',
  },
  'allocation-group': {
    term: 'Allocation Group',
    en: 'A group of models in the target unit, formed before save rolls, that sets the order attacks are allocated and damage is dealt.',
    ru: 'Группа моделей целевого юнита, сформированная перед спас-бросками, задающая порядок распределения атак и нанесения урона.',
  },
  'character': {
    term: 'CHARACTER',
    en: 'A model/unit keyword; when allocating attacks, each CHARACTER model forms its own group.',
    ru: 'Ключевое слово модели или юнита; при распределении атак каждая модель CHARACTER образует отдельную группу.',
  },
  'monster-vehicle': {
    term: 'MONSTER / VEHICLE',
    en: 'Model keywords; if every model in a unit is a MONSTER or VEHICLE, a failed hazard roll inflicts 3 mortal wounds instead of 1.',
    ru: 'Ключевые слова моделей; если все модели в юните — MONSTER или VEHICLE, проваленный опасный бросок наносит 3 смертельные раны вместо 1.',
  },

  // — Imported terms: move, shooting & fight types —
  'while-moving': {
    term: 'While Moving',
    en: 'Conditions of a move type that must be satisfied throughout a model’s or unit’s move.',
    ru: 'Условия типа манёвра, которые должны соблюдаться на протяжении перемещения модели или юнита.',
  },
  'after-moving': {
    term: 'After Moving',
    en: 'Conditions and extra rules of a move type that are checked or resolved once the move is complete.',
    ru: 'Условия и дополнительные правила типа манёвра, которые проверяются или отыгрываются после завершения перемещения.',
  },
  'end-of-turn-step': {
    term: 'End of Turn Step',
    en: 'The final step of a player’s turn, where ‘end of turn’ effects are resolved and rules that end at that moment are checked.',
    ru: 'Финальный шаг хода игрока, где отыгрываются эффекты «в конце хода» и проверяются правила, завершающиеся в этот момент.',
  },
  'normal-shooting': {
    term: 'Normal Shooting',
    en: 'The shooting type for a unit not in engagement range that did not Advance this turn.',
    ru: 'Тип стрельбы для юнита вне радиуса связывания, который не совершал продвижение в этот ход.',
  },
  'assault-shooting': {
    term: 'Assault Shooting',
    en: 'The shooting type for a unit not in engagement range that Advanced this turn and has [ASSAULT] weapons.',
    ru: 'Тип стрельбы для юнита вне радиуса связывания, который совершил продвижение и имеет оружие [ASSAULT].',
  },
  'indirect-shooting': {
    term: 'Indirect Shooting',
    en: 'The shooting type for a unit not in engagement range shooting with [INDIRECT FIRE] weapons at a target it cannot see.',
    ru: 'Тип стрельбы для юнита вне радиуса связывания, стреляющего оружием [INDIRECT FIRE] по цели, которую он не видит.',
  },
  'snap-shooting': {
    term: 'Snap Shooting',
    en: 'A special shooting type allowed by Fire Overwatch: the unit shoots at a limited target and attacks hit only on an unmodified hit roll of 6.',
    ru: 'Особый тип стрельбы, разрешаемый правилом Fire Overwatch: юнит стреляет по ограниченной цели, а атаки попадают только на немодифицированный бросок попадания 6.',
  },
  'declared-charge': {
    term: 'Declared a Charge',
    en: 'A unit has declared a charge if it was selected to charge in the current phase.',
    ru: 'Юнит объявил нападение, если был выбран для отыгрыша нападения в текущей фазе.',
  },
  'normal-fight': {
    term: 'Normal Fight',
    en: 'The fight type for a unit in engagement range; it fights using the normal rules for making attacks.',
    ru: 'Тип боя для юнита в радиусе связывания; юнит сражается по обычным правилам проведения атак.',
  },
  'overrun-fight': {
    term: 'Overrun Fight',
    en: 'A fight type letting a unit not in (or newly in) engagement range make an extra pile-in move and then fight.',
    ru: 'Тип боя, при котором юнит вне радиуса связывания (или недавно вступивший в него) может совершить дополнительный манёвр сближения, а затем сражаться.',
  },
  'fall-back-mode': {
    term: 'Fall-back Mode',
    en: 'The mode chosen before a Fall-back move; options include Ordered Retreat and Desperate Escape.',
    ru: 'Режим, выбираемый перед манёвром отступления; возможные режимы — упорядоченное отступление и отчаянный побег.',
  },

  // — Imported terms: consolidation & pile-in —
  'consolidation-mode': {
    term: 'Consolidation Mode',
    en: 'The mode chosen before a Consolidation move; it sets which enemies or objective markers the unit must move toward.',
    ru: 'Режим, выбираемый перед манёвром консолидации; определяет, к каким врагам или маркерам цели должен двигаться юнит.',
  },
  'ongoing-consolidation': {
    term: 'Ongoing Consolidation',
    en: 'A Consolidation mode for a unit in engagement range: it selects every enemy unit it is already engaged with.',
    ru: 'Режим консолидации для юнита в радиусе связывания: он выбирает все вражеские юниты, с которыми уже связан.',
  },
  'engaging-consolidation': {
    term: 'Engaging Consolidation',
    en: 'A Consolidation mode for a unit not in engagement range with enemies nearby, letting it move into engagement range.',
    ru: 'Режим консолидации для юнита вне радиуса связывания при наличии рядом врагов; позволяет войти с ними в радиус связывания.',
  },
  'objective-consolidation': {
    term: 'Objective Consolidation',
    en: 'A Consolidation mode for a unit near an objective marker when it cannot choose Ongoing or Engaging Consolidation.',
    ru: 'Режим консолидации для юнита рядом с маркером цели, если он не может выбрать продолжающуюся или вовлекающую консолидацию.',
  },
  'pile-in-target': {
    term: 'Pile-in Target',
    en: 'The enemy unit chosen before a pile-in move; moved models must move toward the nearest such target and into engagement range if able.',
    ru: 'Вражеский юнит, выбранный перед манёвром сближения; перемещаемые модели должны двигаться к ближайшей такой цели и, если возможно, войти в радиус связывания.',
  },
  'eligible-to-consolidate': {
    term: 'Eligible to Consolidate',
    en: 'A unit can make a consolidation move if it is the Fight phase and that unit was able to fight this phase.',
    ru: 'Юнит может совершить манёвр консолидации, если сейчас фаза боя и этот юнит мог сражаться в эту фазу.',
  },
  'eligible-to-pile-in': {
    term: 'Eligible to Pile In',
    en: 'A unit can make a pile-in move in the Fight phase if it is in engagement range, charged this turn, or was selected for an overrun fight.',
    ru: 'Юнит может совершить манёвр сближения в фазу боя, если он в радиусе связывания, совершил нападение в этот ход или выбран для рукопашной с прорывом.',
  },

  // — Imported terms: objectives & terrain —
  'secured-objective': {
    term: 'Secured Objective',
    en: 'An objective that stays under a player’s control until the opponent’s level of control there is higher at the end of a phase.',
    ru: 'Цель, остающаяся под контролем армии игрока, пока уровень контроля оппонента не станет выше в конце фазы.',
  },
  'terrain-objective': {
    term: 'Terrain Objective',
    en: 'A terrain feature that the mission’s deployment map places in the same area as an objective marker, so it can affect movement, visibility, cover and objective control at once.',
    ru: 'Элемент террейна, который по карте развёртывания миссии находится в той же области, что и маркер цели, и потому может одновременно влиять на движение, видимость, укрытие и контроль цели.',
  },
  'exposed-terrain': {
    term: 'Exposed Terrain',
    en: 'A terrain category that gives little protection and can be crossed without hindrance.',
    ru: 'Категория террейна, дающая слабую защиту и преодолеваемая без помех.',
  },
  'obscuring-terrain-area': {
    term: 'Obscuring Terrain Area',
    en: 'A terrain area with one or more Light or Heavy terrain features; a line of sight drawn through it can leave models not visible to each other.',
    ru: 'Область террейна с одним или несколькими лёгкими или плотными элементами; линия обзора через неё может делать модели не видимыми друг для друга.',
  },

  // — Imported terms: keywords —
  'aircraft': {
    term: 'Aircraft',
    en: 'A keyword for flying craft, which follow their own movement restrictions and rules.',
    ru: 'Ключевое слово летающих аппаратов, к которым применяются отдельные ограничения и правила перемещения.',
  },
  'smoke': {
    term: 'SMOKE',
    en: 'A unit keyword marking the ability to use smoke screens or smoke-related effects.',
    ru: 'Ключевое слово юнита, обозначающее способность применять дымовую завесу или связанные с дымом эффекты.',
  },
  'titanic': {
    term: 'TITANIC',
    en: 'A keyword for especially large models and units; some rules specifically exclude them or apply to them differently.',
    ru: 'Ключевое слово особо крупных моделей и юнитов; некоторые правила прямо исключают их или применяются к ним иначе.',
  },
  'fortification': {
    term: 'Fortification',
    en: 'A keyword for static, defensive pieces that usually have their own restrictions on actions and movement.',
    ru: 'Ключевое слово неподвижных оборонительных объектов, обычно имеющих отдельные ограничения на действия и перемещение.',
  },
  'frame': {
    term: 'FRAME',
    en: 'A keyword for large models for which distances are measured to and from the nearest point of the model itself, not necessarily its base.',
    ru: 'Ключевое слово крупных моделей, для которых расстояния измеряются до ближайшей точки самой модели и от неё, а не обязательно от базы.',
  },
  'fly': {
    term: 'FLY',
    en: 'A model keyword; models with FLY, and the units they are part of, are treated as able to fly.',
    ru: 'Ключевое слово модели; модели с FLY и юниты, частью которых они являются, считаются способными летать.',
  },
  'flying-unit': {
    term: 'Flying Unit',
    en: 'A model with the FLY keyword, or a unit that contains such a model.',
    ru: 'Модель с ключевым словом FLY или юнит, содержащий такую модель.',
  },
  'towering': {
    term: 'TOWERING',
    en: 'A keyword for very tall models; for Plunging Fire, such a model improves the BS of attacks against a visible target within 12" if that target contains models at ground level.',
    ru: 'Ключевое слово очень высоких моделей; для правила Plunging Fire такая модель улучшает BS атак по видимой цели в пределах 12", если цель содержит модели на уровне земли.',
  },

  // — Imported terms: stratagems, reserves, transport, muster —
  'core-stratagems': {
    term: 'Core Stratagems',
    en: 'The set of stratagems available to every player regardless of army; codexes and other publications may add more.',
    ru: 'Набор стратагем, доступный каждому игроку независимо от армии; кодексы и другие издания могут добавлять свои.',
  },
  'declare-battle-formations': {
    term: 'Declare Battle Formations',
    en: 'A pre-battle step where players declare relevant battle formations, including units that start the battle embarked in a Transport.',
    ru: 'Шаг перед битвой, на котором игроки объявляют соответствующие боевые построения, включая юниты, начинающие битву внутри транспорта.',
  },
  'muster-armies': {
    term: 'Muster Armies',
    en: 'The army-preparation step where players choose their armies and declare related army-composition decisions.',
    ru: 'Шаг подготовки к битве, на котором игроки выбирают армии и объявляют связанные с составом армии решения.',
  },
  'points-limit': {
    term: 'Points Limit',
    en: 'The maximum total points cost of an army, set by the battle size or the mission.',
    ru: 'Максимальная суммарная стоимость армии в очках, заданная размером битвы или миссией.',
  },
  'eligible-to-move': {
    term: 'Eligible to Move',
    en: 'A unit can make a move if it is in a suitable state and no rule forbids the chosen move type.',
    ru: 'Юнит может совершить манёвр, если он в подходящем состоянии и правила не запрещают выбранный тип манёвра.',
  },
  'repositioned-unit': {
    term: 'Repositioned Unit',
    en: 'A unit removed from the battlefield during the battle and placed into Strategic Reserves by a reposition rule.',
    ru: 'Юнит, убранный с поля боя во время битвы и помещённый в стратегический резерв правилом перемещения на новую позицию.',
  },
  'embarked': {
    term: 'Embarked',
    en: 'The state of a unit inside a Transport and not on the battlefield.',
    ru: 'Состояние юнита, находящегося внутри транспорта и не на поле боя.',
  },
  'disembark-mode': {
    term: 'Disembark Mode',
    en: 'The mode chosen before a Disembark move; it sets the set-up distance and the restrictions that follow disembarking.',
    ru: 'Режим, выбираемый перед манёвром высадки; определяет дистанцию выставления и ограничения после высадки.',
  },
  'tactical-disembark': {
    term: 'Tactical Disembark',
    en: 'A disembark mode from a Transport that stayed stationary or has not yet moved; afterwards the unit can make a Normal or Advance move.',
    ru: 'Режим высадки из транспорта, который остался неподвижен или ещё не перемещался; после него юнит может совершить обычный манёвр или манёвр продвижения.',
  },
  'rapid-disembark': {
    term: 'Rapid Disembark',
    en: 'A disembark mode after the Transport has moved or arrived; it usually limits the unit’s subsequent charge.',
    ru: 'Режим высадки после того, как транспорт переместился или прибыл; обычно ограничивает последующее нападение юнита.',
  },
  'combat-disembark': {
    term: 'Combat Disembark',
    en: 'A disembark mode in a difficult situation; it requires hazard rolls and leaves the unit battle-shocked and unable to declare a charge until the end of the turn.',
    ru: 'Режим высадки в сложной ситуации; требует опасных бросков и оставляет юнит под боевым шоком с запретом объявлять нападение до конца хода.',
  },
  'emergency-disembark-move': {
    term: 'Emergency Disembark Move',
    en: 'The mandatory disembark of passengers before a destroyed Transport is removed from the battlefield.',
    ru: 'Обязательный манёвр высадки пассажиров перед удалением уничтоженного транспорта с поля боя.',
  },
  'take-to-the-skies': {
    term: 'Take to the Skies',
    en: 'A declaration before a flying unit’s Normal, Advance, Fall-back or Charge move: its maximum distance drops by 2", but flying models ignore vertical distance and can move through models and terrain.',
    ru: 'Объявление перед обычным манёвром, продвижением, отступлением или нападением летающего юнита: максимальное расстояние уменьшается на 2", но летающие модели игнорируют вертикальную дистанцию и могут двигаться сквозь модели и террейн.',
  },

  // — Imported terms: abilities —
  'bearer': {
    term: 'Bearer',
    en: 'The model that has a particular item of wargear; that wargear’s ability applies while the bearer is not destroyed.',
    ru: 'Модель, у которой есть конкретный предмет снаряжения; способность этого снаряжения действует, пока носитель не уничтожен.',
  },
  'faction-ability': {
    term: 'Faction Ability',
    en: 'An ability shared by units of a given faction, listed in the Faction Abilities section of the datasheet.',
    ru: 'Способность, общая для юнитов определённой фракции, указанная в разделе способностей фракции таблицы данных.',
  },
  'wargear-ability': {
    term: 'Wargear Ability',
    en: 'An ability a unit or model gains from a specific item of wargear.',
    ru: 'Способность, которую юнит или модель получает от определённого предмета снаряжения.',
  },
  'psychic-ability': {
    term: 'Psychic Ability',
    en: 'An ability marked Psychic; mortal wounds it inflicts count as inflicted by a psychic attack.',
    ru: 'Способность с пометкой Psychic; нанесённые ею смертельные раны считаются нанесёнными психической атакой.',
  },
  'psychic-attack': {
    term: 'Psychic Attack',
    en: 'The source of mortal wounds inflicted by a Psychic ability, which can matter for triggering other rules.',
    ru: 'Источник смертельных ран, нанесённых психической способностью; может быть важен для срабатывания других правил.',
  },
  'ground-level': {
    term: 'Ground Level',
    en: 'The lowest level of the battlefield or a terrain feature, used to check whether a model is on the ground.',
    ru: 'Нижний уровень поля боя или элемента террейна, относительно которого проверяется, находится ли модель на земле.',
  },

  // Translation-only glosses: popover shows just the English original, no definition body.
  'controlling-player': {
    term: 'Controlling Player',
  },
  'you': {
    term: 'You',
  },
}
