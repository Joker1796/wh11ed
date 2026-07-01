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
    term: 'Saving Throw',
    en: 'A D6 roll to avoid damage, using the target’s Save (or Invulnerable Save) characteristic.',
    ru: 'Бросок D6, позволяющий избежать урона, с использованием спас-броска (или инвуль-спаса) цели.',
  },
  'damage-roll': {
    term: 'Damage',
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
    term: 'Wounds',
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
    term: 'Attack Dice',
    en: 'The dice rolled for a weapon’s Attacks (A) characteristic when it makes its attacks.',
    ru: 'Кубики, которые бросаются за характеристику атак (A) оружия при совершении атак.',
  },

  // — Leaders & attached units —
  'leader': {
    term: 'Leader',
    en: 'A CHARACTER unit that can be attached to a Bodyguard unit to lead it.',
    ru: 'Юнит-ПЕРСОНАЖ, который может присоединиться к юниту-телохранителю (Bodyguard), возглавив его.',
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
    ru: 'Эффекты, которые продолжают действовать в течение указанного срока (например, «до конца хода»), а не разрешаются мгновенно.',
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
}
