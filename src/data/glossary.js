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
    en: 'The area a terrain area takes up on the battlefield — the ground inside the boundary (such as the mat) it’s placed on, seen from directly above.',
    ru: 'Площадь, которую участок укрытия занимает на поле боя — земля в пределах его границы (например, мата), если смотреть строго сверху.',
  },
  'within': {
    term: 'Within',
    en: '“Within X” is measured to the nearest point: a model counts if **any** part of its base (or hull) is that far away or closer, and a unit counts if **at least one** of its models does.',
    ru: '«В пределах X» измеряется до ближайшей точки: модель считается, если **любая** часть её базы (или корпуса) находится на этом расстоянии или ближе, а юнит — если это верно хотя бы для **одной** его модели.',
  },
  'wholly-within': {
    term: 'Wholly Within',
    en: '“Wholly Within X” is stricter than Within: a model counts only if **every** part of its base (or hull) is that far away or closer, and a unit counts only if **all** of its models are.',
    ru: '«Полностью в пределах X» — строже, чем «в пределах»: модель считается, только если **каждая** часть её базы (или корпуса) находится на этом расстоянии или ближе, а юнит — только если это верно для **всех** его моделей.',
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
    en: 'A test for Hazardous weapons: roll one D6 for the unit — on a 1-2 it suffers 1 mortal wound (or 3 if every model in it is a MONSTER/VEHICLE).',
    ru: 'Проверка для оружия с правилом Hazardous: бросьте один D6 за юнит — на 1-2 он получает 1 смертельную рану (или 3, если каждая модель в нём — MONSTER/VEHICLE).',
  },

  // — Leadership & Battle-shock —
  'leadership-roll': {
    term: 'Leadership Roll',
    en: 'The controlling player rolls 2D6; the roll succeeds if the result equals or beats one or more of the unit’s Leadership (Ld) characteristics, otherwise it fails, and the rule that called for it says what success or failure does. Battle-shock tests are Leadership rolls.',
    ru: 'Контролирующий игрок бросает 2D6; проверка успешна, если результат равен одной или нескольким характеристикам лидерства (Ld) юнита или превышает их, иначе — провалена, а вызвавшее её правило описывает последствия успеха или провала. Проверки боевого шока — это проверки лидерства.',
  },
  'leadership-test': {
    term: 'Leadership Test',
    en: 'Roll 2D6; the test is passed if the result equals or beats the unit’s Leadership characteristic.',
    ru: 'Бросьте 2D6; тест пройден, если результат равен характеристике лидерства юнита или превышает её.',
  },
  'battle-shock-test': {
    term: 'Battle-shock Test',
    en: 'A Leadership test a unit takes when required (e.g. while below Half-strength): roll 2D6, passing if the result equals or beats the unit’s Leadership (Ld) characteristic. Failing it leaves the unit Battle-shocked.',
    ru: 'Тест на лидерство, который юнит проходит при необходимости (например, будучи ниже половинной численности): бросьте 2D6, тест пройден, если результат равен характеристике лидерства (Ld) юнита или превышает её. Провал делает юнит подверженным боевому шоку.',
  },
  'battle-shocked': {
    term: 'Battle-shocked',
    en: 'A unit that failed a Battle-shock test. Until the start of its next Command phase its Objective Control is treated as 0, its controlling player cannot target it with Stratagems, and it cannot start Actions (and can’t complete any it had started).',
    ru: 'Юнит, проваливший проверку на боевой шок. До начала своей следующей командной фазы его Контроль цели считается равным 0, его контролирующий игрок не может выбирать его целью стратагем, и он не может начинать действия (а начатые — завершить).',
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
  'below-starting-strength': {
    term: 'Below Starting Strength',
    en: 'A unit that has fewer remaining models than its Starting Strength (or, for a single-model unit, fewer remaining wounds than its Wounds characteristic).',
    ru: 'Юнит, в котором осталось меньше моделей, чем его начальная численность (или, для юнита из одной модели, меньше ран, чем его характеристика W).',
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
  'core-abilities': {
    term: 'Core Abilities',
    en: 'Named abilities (e.g. Leader, Scouts, Fights First) listed on a unit’s datasheet, defined in Section 24 of the core rules.',
    ru: 'Именованные способности (напр. Leader, Scouts, Fights First), указанные в листе данных юнита и определённые в разделе 24 основных правил.',
  },
  'weapon-abilities': {
    term: 'Weapon Abilities',
    en: 'Abilities shown in square brackets in a weapon’s profile (e.g. [BLAST]) that change how that weapon’s attacks work.',
    ru: 'Способности, указанные в квадратных скобках в профиле оружия (например, [BLAST]), изменяющие работу атак этого оружия.',
  },
  'weapon-profiles': {
    term: 'Weapon Profiles',
    en: 'The block on a datasheet listing a weapon’s characteristics — Range, A, BS/WS, S, AP and D — along with any weapon abilities it has.',
    ru: 'Блок в листе данных с характеристиками оружия — дальность, A, BS/WS, S, AP и D — а также с его способностями оружия.',
  },
  'duplicated': {
    term: 'Duplicated',
    en: 'When a unit has more than one instance of the same ability, the instances are duplicated — they don’t stack; the controlling player picks which one applies.',
    ru: 'Когда у юнита несколько экземпляров одной и той же способности, они считаются повторяющимися — не складываются; контролирующий игрок выбирает, какой из них действует.',
  },
  'scouts': {
    term: 'Scouts',
    en: 'A unit ability, Scouts X": before the battle the unit can make a scout move of up to X" (or redeploy), ending more than 8" from all enemy units.',
    ru: 'Способность юнита, Scouts X": перед битвой юнит может совершить разведывательный манёвр на величину до X" (или передислоцироваться), закончив дальше 8" от всех вражеских юнитов.',
  },
  'damaged': {
    term: 'Damaged',
    en: 'A unit ability, Damaged X: while a model’s remaining wounds are X or fewer, it is Damaged and subtracts 1 from its hit rolls.',
    ru: 'Способность юнита, Damaged X: пока оставшиеся раны модели равны X или меньше, она повреждена и вычитает 1 из своих бросков на попадание.',
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
    ru: 'Юнит-CHARACTER, который может присоединиться к юниту-телохранителю (Bodyguard), возглавив его.',
  },
  'support': {
    term: 'Support',
    en: 'A unit that, like a Leader, can be attached to a Bodyguard unit; every Support unit in your roster must be attached to one.',
    ru: 'Юнит, который, как и лидер, может присоединяться к юниту-телохранителю; каждый юнит поддержки в списке должен быть присоединён.',
  },
  'bodyguard': {
    term: 'Bodyguard',
    en: 'A unit that a Leader and/or Support units can be attached to, forming an Attached unit.',
    ru: 'Юнит, к которому могут присоединиться лидер и/или юниты поддержки, образуя присоединённый юнит.',
  },
  'attached-unit': {
    term: 'Attached Unit',
    en: 'The single unit formed when a Leader (CHARACTER) and/or Support units join a Bodyguard unit; they act as one unit.',
    ru: 'Юнит, образованный, когда лидер (CHARACTER) и/или юниты поддержки присоединяются к юниту-телохранителю; они действуют как один юнит.',
  },
  'forming-attached-units': {
    term: 'Forming Attached Units',
    en: 'The rules for attaching Leader and Support units to a Bodyguard unit they can join, forming a single Attached unit.',
    ru: 'Правила присоединения отрядов лидера и поддержки к юниту-телохранителю, к которому они могут присоединиться, образуя один составной юнит.',
  },
  'lead': {
    term: 'Lead',
    en: 'To attach a Leader or Support unit to a Bodyguard unit it is allowed to join, so the two form a single Attached unit for the battle.',
    ru: 'Присоединить отряд-лидер или отряд поддержки к разрешённому ему отряду-телохранителю, чтобы они образовали на всю битву единый объединённый отряд.',
  },
  'enhancement': {
    term: 'Enhancement',
    en: 'A bonus you take from your Detachment when building your army. There are two kinds: a standard Enhancement is given to a single CHARACTER to improve its abilities or wargear; an Enhancement marked ‘Upgrade’ goes to a non-CHARACTER unit instead, and you may take up to three of the same one.',
    ru: 'Бонус, который вы берёте из своего детачмента (Detachment) при сборке армии. Бывает двух видов: обычное улучшение даётся одному CHARACTER, усиливая его способности или снаряжение; улучшение с пометкой «Upgrade» вместо этого даётся отряду не-CHARACTER, и таких одинаковых можно взять до трёх.',
  },

  // — Selection & moves —
  'selected-to-move': {
    term: 'Selected to Move',
    en: 'When a unit is picked to make a move. This usually happens in the Movement phase, but some rules select a unit to move at other times too.',
    ru: 'Когда юнит выбирается для совершения манёвра. Обычно это происходит в фазе движения, но некоторые правила выбирают юнит для манёвра и в другое время.',
  },
  'selected-to-shoot': {
    term: 'Selected to Shoot',
    en: 'When a unit is picked to shoot. This usually happens in the Shooting phase, but some rules select a unit to shoot at other times too.',
    ru: 'Когда юнит выбирается для стрельбы. Обычно это происходит в фазе стрельбы, но некоторые правила выбирают юнит для стрельбы и в другое время.',
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
    en: 'A unit’s basic move: each model moves up to its Move (M) characteristic and can’t end within Engagement Range of an enemy. Units usually make one in the Movement phase, but some rules let a unit make a Normal Move at other times too.',
    ru: 'Базовый манёвр юнита: каждая модель проходит до своей характеристики движения (M) и не может закончить его в радиусе связывания врага. Обычно юнит совершает его в фазе движения, но некоторые правила позволяют совершить обычный манёвр и в другое время.',
  },
  'remain-stationary': {
    term: 'Remain Stationary',
    en: 'Choosing not to move a unit in the Movement phase; it counts as having Remained Stationary.',
    ru: 'Выбор не перемещать юнит в фазе движения; он считается оставшимся недвижимым.',
  },
  'strategic-reserves': {
    term: 'Strategic Reserves',
    en: 'Units set up off the battlefield instead of deployed, arriving later via ingress moves (usually from the second battle round). Their combined points can’t exceed 50% of your army, and any still in reserve at the end of the third round are destroyed.',
    ru: 'Юниты, размещённые вне поля боя вместо развёртывания и прибывающие позже манёврами прибытия (обычно со второго раунда боя). Их суммарная стоимость не может превышать 50% армии, а оставшиеся в резерве к концу третьего раунда уничтожаются.',
  },

  // — Engagement —
  'engagement-range': {
    term: 'Engagement Range',
    en: 'The zone within 2" horizontally and 5" vertically of a model, used for combat and movement restrictions.',
    ru: 'Зона в пределах 2" по горизонтали и 5" по вертикали от модели, определяющая ограничения боя и движения.',
  },
  'engaged': {
    term: 'Engaged',
    en: 'A unit with a model within Engagement Range (2" horizontally and 5" vertically) of an enemy model; the two units are then engaged with each other. Engaged units can fight but generally can’t shoot or make a Normal move, and must Fall Back to leave.',
    ru: 'Юнит, у которого модель находится в радиусе связывания (2" по горизонтали и 5" по вертикали) от вражеской модели; тогда оба юнита связаны боем друг с другом. Связанные боем юниты могут сражаться, но обычно не могут стрелять или совершать обычный манёвр, а чтобы выйти — должны отойти.',
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
  'not-visible': {
    term: 'Not Visible',
    en: 'A unit or model that cannot be seen at all from the observing model — no part of it can be seen. It cannot be selected or targeted by attacks or rules that require a visible target.',
    ru: 'Юнит или модель, которую невозможно увидеть от наблюдающей модели — ни одну её часть. Её нельзя выбрать целью атак или правил, требующих видимую цель.',
  },
  'fully-visible': {
    term: 'Fully Visible',
    en: 'A target is fully visible if all of it can be seen from the observing model.',
    ru: 'Цель полностью видима, если можно увидеть её целиком от наблюдающей модели.',
  },
  'not-fully-visible': {
    term: 'Not Fully Visible',
    en: 'A target that is not Fully Visible to a model — at least part of it is hidden by intervening terrain features or obscuring terrain areas. This can grant the Benefit of Cover.',
    ru: 'Цель, которая не полностью видима модели — хотя бы часть её скрыта промежуточными элементами укрытий или загораживающими областями укрытий. Это может давать преимущество от укрытия.',
  },
  'hidden': {
    term: 'Hidden',
    en: 'A terrain rule (13.09): an INFANTRY/BEASTS/SWARM model within a terrain area with light/dense terrain features whose unit made no ranged attacks this or the previous turn is Hidden — visible only to enemy models within its detection range (15" unless stated otherwise).',
    ru: 'Правило укрытий (13.09): модель с ключевым словом INFANTRY/BEASTS/SWARM в области укрытия с лёгкими/плотными элементами, чей юнит не совершал дальних атак в этом и прошлом ходу, находится в скрытности — видима только вражеским моделям в пределах её радиуса обнаружения (15", если не указано иное).',
  },
  'line-of-sight': {
    term: 'Line of Sight',
    en: 'An unobstructed view drawn from an observing model to a target to check visibility.',
    ru: 'Непреграждённая линия обзора от наблюдающей модели к цели для проверки видимости.',
  },
  'detection-range': {
    term: 'Detection Range',
    en: 'A Hidden model can only be seen by enemy models within its detection range. Unless stated otherwise it is 15" (and drops by 3" while the model has gone to ground).',
    ru: 'Скрытая модель видима только вражеским моделям в пределах её радиуса обнаружения. Если не указано иное, он равен 15" (и уменьшается на 3", пока модель залегла).',
  },

  // — Damage & mortal wounds —
  'mortal-wound': {
    term: 'Mortal Wounds',
    en: 'Damage inflicted directly on a unit that can’t be reduced by saving throws. They are dealt one at a time — each removes 1 wound from a model in the unit, spilling over to the next model until all are inflicted or the unit is destroyed.',
    ru: 'Урон, наносимый напрямую юниту, который нельзя уменьшить спас-бросками. Наносятся по одной — каждая снимает 1 рану с модели юнита и переходит на следующую модель, пока все не нанесены или юнит не будет уничтожен.',
  },

  // — Terrain —
  'terrain': {
    term: 'Terrain',
    en: 'The scenery on the battlefield — ruins, forests, barricades and so on — represented by terrain features placed in terrain areas.',
    ru: 'Укрытия на поле боя — руины, леса, баррикады и т.п., — представленные элементами ландшафта, размещёнными в областях укрытий.',
  },
  'terrain-area': {
    term: 'Terrain Area',
    en: 'The patch of the battlefield taken up by a piece of terrain — either the boundary you set down (such as a base or mat) or the terrain feature(s) placed there. Many rules, such as Hidden, Benefit of Cover and objectives, depend on whether a model is inside one.',
    ru: 'Участок поля боя, который занимает укрытие — либо очерченная граница (например, база или мат), либо поставленные там элементы укрытия. Многие правила — Скрытность, Преимущество от укрытия, цели — зависят от того, находится ли модель внутри такой области.',
  },
  'terrain-feature': {
    term: 'Terrain Feature',
    en: 'A piece of terrain on the battlefield, such as ruins, woods or an obstacle.',
    ru: 'Элемент ландшафта на поле боя, например руины, лес или препятствие.',
  },

  // — Objectives, Stratagems, Actions —
  'objective': {
    term: 'Objective',
    en: 'A point on the battlefield the mission marks as an objective. Usually it coincides with a terrain area (13.01), which then is the objective — a terrain objective; distances are measured to and from its closest part.',
    ru: 'Точка на поле боя, которую миссия отмечает как цель. Обычно она совпадает с областью укрытия (13.01), которая и становится этой целью — целевым объектом местности; расстояния измеряются до её ближайшей части и от неё.',
  },
  'objective-marker': {
    term: 'Objective Marker',
    en: 'A flat, circular marker 40 mm across that marks an objective not coinciding with a terrain area. Models can move through it or end a move on top of it; a model is within range while within 3" horizontally and 5" vertically of it.',
    ru: 'Плоский круглый маркер диаметром 40 мм, обозначающий цель, которая не совпадает с областью укрытия. Модели могут проходить сквозь него и завершать манёвр на нём; модель в пределах досягаемости, пока находится в 3" по горизонтали и 5" по вертикали от него.',
  },
  'stratagem': {
    term: 'Stratagem',
    en: 'A special rule you can use by spending Command Points (CP), usually at a specified moment.',
    ru: 'Особое правило, которое можно применить, потратив командные очки (CP), обычно в указанный момент.',
  },
  'action': {
    term: 'Action',
    en: 'A special activity a unit can start (defined by mission packs and other rules). After starting it, the unit usually can’t shoot or charge that turn and mustn’t move (beyond pile-in/consolidate) or leave the battlefield, or it won’t complete; completing it triggers its effect.',
    ru: 'Особое действие (action), которое юнит может начать (задаётся паками миссий и другими правилами). После начала юнит обычно не может стрелять или нападать в этот ход и не должен перемещаться (кроме сближения и консолидации) или покидать поле боя — иначе действие не завершится; при завершении срабатывает его эффект.',
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
    ru: 'Набор правил, усилений и стратагем, выбранный для вашей армии на этапе создания ростера.',
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
    en: 'The formation rule: every model must be within 2" horizontally and 5" vertically of at least one other model in the unit, and within 9" horizontally and 5" vertically of every other model in the unit.',
    ru: 'Правило построения: каждая модель должна быть в пределах 2" по горизонтали и 5" по вертикали от хотя бы одной другой модели юнита и в пределах 9" по горизонтали и 5" по вертикали от каждой другой модели юнита.',
  },

  // — Battle Round: movement types —
  'advance': {
    term: 'Advance',
    en: 'A move made instead of a Normal move that adds an Advance roll to the unit’s Move; it usually can’t shoot or charge afterwards.',
    ru: 'Манёвр вместо обычного, добавляющий к движению юнита бросок продвижения; после него обычно нельзя стрелять или нападать.',
  },
  'advance-move': {
    term: 'Advance Move',
    en: 'A move a unit makes instead of a Normal move: its maximum distance is its Move (M) plus an Advance roll (one D6). It must start and end unengaged, and afterwards can’t declare a charge or start an action that turn (and usually can’t shoot).',
    ru: 'Манёвр, который юнит совершает вместо обычного: максимальная дистанция — его характеристика движения (M) плюс бросок продвижения (один D6). Юнит должен начинать и заканчивать манёвр не связанным боем, а после него не может в этот ход объявлять нападение или начинать действие (и обычно не может стрелять).',
  },
  'advance-roll': {
    term: 'Advance Roll',
    en: 'A D6 added to a unit’s Move characteristic when it Advances.',
    ru: 'D6, добавляемый к характеристике движения юнита при продвижении.',
  },
  'fall-back-move': {
    term: 'Fall Back',
    en: 'A move an engaged unit makes to leave Engagement Range, up to its Move (M). It must end unengaged and can’t shoot, declare a charge or start an action that turn; a battle-shocked unit must use Desperate Escape, risking losses.',
    ru: 'Манёвр, которым связанный боем юнит выходит из радиуса связывания, на величину до своей характеристики движения (M). Он должен закончить не связанным боем и не может в этот ход стрелять, объявлять нападение или начинать действие; юнит под боевым шоком вынужден идти «отчаянным побегом», рискуя потерями.',
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
    en: 'In the Charge phase, a unit that declared a charge makes this move up to its Charge roll (2D6). Each model must end closer to a charge target and, if it can, within Engagement Range of one; the charge succeeds only if the unit ends engaged with all its charge targets and no other enemy unit. Each of its models then has Fights First until the end of the turn.',
    ru: 'В фазе нападения юнит, объявивший нападение, совершает этот манёвр на величину до броска нападения (2D6). Каждая модель должна закончить ближе к цели нападения и, если может, в радиусе связывания с ней; нападение удаётся, только если юнит закончил связанным боем со всеми своими целями нападения и ни с одним другим вражеским юнитом. После этого каждая его модель до конца хода обладает «Первым ударом».',
  },
  'charge-roll': {
    term: 'Charge Roll',
    en: '2D6 rolled to determine how far a charging unit can move.',
    ru: '2D6, бросаемые, чтобы определить, как далеко может переместиться нападающий юнит.',
  },
  'lone-operative': {
    term: 'Lone Operative',
    en: 'An ability of the form Lone Operative X": unless part of an attached unit, the unit is not visible to enemy models more than X" away, and cannot be targeted by [INDIRECT FIRE] from beyond X".',
    ru: 'Способность вида Lone Operative X": если юнит не входит в состав составного юнита, он не виден вражеским моделям дальше X" и не может быть выбран целью оружия [INDIRECT FIRE] из-за пределов X".',
  },
  'infiltrators': {
    term: 'Infiltrators',
    en: 'A unit ability (24.20): during deployment, if every model in the unit has it, the unit can be set up anywhere on the battlefield more than 8" horizontally from the enemy deployment zone and all enemy units.',
    ru: 'Способность юнита (24.20): при развёртывании, если ею обладает каждая модель юнита, юнит можно выставить где угодно на поле боя дальше 8" по горизонтали от зоны развёртывания противника и всех вражеских юнитов.',
  },
  'charge-target': {
    term: 'Charge Target',
    en: 'An enemy unit declared as a target of a charge.',
    ru: 'Вражеский юнит, объявленный целью нападения.',
  },
  'failed-charge': {
    term: 'Failed Charge',
    en: 'A declared charge the unit can’t complete: its Charge roll isn’t enough to end the move engaged with every charge target (and not with any non-target) while following the move rules. The unit stays where it started.',
    ru: 'Объявленное нападение, которое юнит не может завершить: броска нападения не хватает, чтобы закончить манёвр связанным боем со всеми целями нападения (и ни с одним не-целью), соблюдая правила манёвра. Юнит остаётся на исходной позиции.',
  },

  // — Battle Round: fighting & consolidation —
  'pile-in': {
    term: 'Pile In',
    en: 'A move of up to 3" a unit makes at the start of the Fight phase (if it is engaged, charged this turn, or is overrunning). Each moved model must end closer to the nearest pile-in target and, if it can, engaged with it.',
    ru: 'Манёвр до 3", который юнит совершает в начале фазы боя (если он связан боем, нападал в этот ход или совершает прорыв). Каждая перемещаемая модель должна закончить ближе к ближайшей цели сближения и, если может, связанной с ней боем.',
  },
  'consolidation': {
    term: 'Consolidate',
    en: 'A move of up to 3" a unit that was eligible to fight makes in the Consolidate step; moved models must end closer to the nearest enemy unit (engaged if possible) or to a nearby objective.',
    ru: 'Консолидация — манёвр до 3", который юнит, имевший право сражаться, совершает на шаге консолидации; перемещаемые модели должны закончить ближе к ближайшему вражескому юниту (в связывании боем, если возможно) или к близкой цели.',
  },
  'overrun': {
    term: 'Overrun',
    en: 'A Consolidation move made towards the closest enemy unit, potentially into Engagement Range.',
    ru: 'Консолидация в сторону ближайшего вражеского юнита, возможно в радиус связывания.',
  },
  'fights-first': {
    term: 'Fights First',
    en: 'An ability (24.13): units that have it are selected to fight in the Fight phase’s first step (Resolve Fights First Combats), before units without it fight in the Resolve Remaining Combats step.',
    ru: 'Способность (24.13): юниты с ней выбираются для боя на первом шаге фазы боя (отыгрыш схваток с «Первым ударом»), раньше, чем юниты без неё сражаются на шаге отыгрыша оставшихся схваток.',
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
    en: 'A unit is eligible to shoot if it is on the battlefield and has not already been selected to shoot this phase.',
    ru: 'Юнит может стрелять, если он находится на поле боя и ещё не был выбран для стрельбы в этой фазе.',
  },
  'not-eligible-to-shoot': {
    term: 'Not Eligible to Shoot',
    en: 'A unit that is not eligible to shoot: it cannot be selected to shoot, so it makes no ranged attacks (some rules impose this for a phase or the rest of the turn).',
    ru: 'Юнит, который не может стрелять: его нельзя выбрать для стрельбы, поэтому он не совершает дальних атак (некоторые правила накладывают это на фазу или до конца хода).',
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
    en: 'Cover a unit gets against a ranged attack when every model is within a terrain area or is not fully visible due to intervening terrain. It worsens that attack’s BS by 1, making the unit harder to hit.',
    ru: 'Укрытие, которое юнит получает против дальней атаки, когда каждая его модель в области укрытия или не полностью видна из-за промежуточного террейна. Оно ухудшает BS этой атаки на 1, делая юнит труднее для попадания.',
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
  'bs-ws': {
    term: 'BS/WS',
    en: 'The characteristic a hit roll is made against — Ballistic Skill (BS) for ranged attacks, Weapon Skill (WS) for melee attacks.',
    ru: 'Характеристика, против которой совершается бросок на попадание — Ballistic Skill (BS) для дистанционных атак, Weapon Skill (WS) для атак ближнего боя.',
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
  'terminator': {
    term: 'Terminator',
    en: 'An example unit keyword — the elite infantry that wear Terminator armour. Here it stands in for any keyword a rule might use to describe a unit.',
    ru: 'Пример ключевого слова юнита — элитная пехота в терминаторской броне. Здесь приведено как пример любого ключевого слова, которым правило может описывать юнит.',
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
    ru: 'Количество и тип моделей, которые может перевозить TRANSPORT, согласно его листу данных.',
  },
  'embark': {
    term: 'Embark',
    en: 'To move a unit inside a friendly TRANSPORT after a Normal, Advance or Fall-back move — if every model is within 3" of it and it has spare transport capacity. The unit is then removed from the battlefield and counts as embarked.',
    ru: 'Погрузить юнит в дружественный TRANSPORT после обычного манёвра, продвижения или отхода — если каждая модель в пределах 3" от него и в нём есть свободная вместимость. Юнит убирается с поля боя и считается погружённым.',
  },
  'eligible-to-embark': {
    term: 'Eligible to Embark',
    en: 'A unit can embark within a TRANSPORT if it has the required keywords and there is room in its Transport Capacity.',
    ru: 'Юнит может погрузиться в TRANSPORT, если у него есть нужные ключевые слова и в грузоподъёмности есть место.',
  },
  'disembark': {
    term: 'Disembark',
    en: 'To set an embarked unit back onto the battlefield from its TRANSPORT (in the Movement phase) via a disembark move — wholly within the set-up distance (3" for a Tactical/Rapid disembark, 6" for a Combat disembark). It must be set up unengaged, except a Combat Disembark, which may be set up engaged.',
    ru: 'Высадить погружённый юнит из его TRANSPORT обратно на поле боя (в фазе движения) манёвром высадки — полностью в пределах дистанции выставления (3" при тактической/стремительной высадке, 6" при боевой). Юнит должен выставляться не связанным боем, кроме боевой высадки, при которой он может быть выставлен связанным.',
  },

  // — Advanced Rules: reserves & movement —
  'reinforcements': {
    term: 'Reinforcements',
    en: 'Units arriving from Reserves during the battle rather than being deployed at the start.',
    ru: 'Юниты, прибывающие из резервов во время битвы, а не размещённые в начале.',
  },
  'ingress-move': {
    term: 'Ingress Move',
    en: 'The move a Strategic Reserves unit makes to arrive on the battlefield: it is set up wholly within 6" of a battlefield edge and more than 8" horizontally from all enemy units (and not in the enemy deployment zone before the third battle round).',
    ru: 'Манёвр, которым юнит из стратегических резервов прибывает на поле боя: он выставляется полностью в пределах 6" от края поля боя и дальше 8" по горизонтали от всех вражеских юнитов (а до третьего раунда боя — не в зоне развёртывания противника).',
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
  'during-deployment': {
    term: 'During Deployment',
    en: 'While setting up your army before the battle begins — the deployment step, where units are placed in your deployment zone.',
    ru: 'Во время расстановки армии перед началом битвы — шаг развёртывания, когда юниты размещаются в вашей зоне развёртывания.',
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
    en: 'A tag on some abilities and weapons. Wounds inflicted by a Psychic ability count as psychic attacks, which certain rules (e.g. [ANTI-PSYKER] or psychic defences) react to.',
    ru: 'Метка на некоторых способностях и оружии. Раны, наносимые психической способностью, считаются психическими атаками, на которые реагируют определённые правила (например, [ANTI-PSYKER] или психические защиты).',
  },
  'plunging-fire': {
    term: 'Plunging Fire',
    en: 'A rule that improves a ranged attack’s BS by 1 when the attacking model is on terrain 3" or more high (or is TOWERING and within 12") and the target has one or more models at ground level.',
    ru: 'Правило, улучшающее BS дальней атаки на 1, когда атакующая модель находится на террейне высотой 3" и более (или обладает TOWERING и в пределах 12"), а цель содержит хотя бы одну модель на уровне земли.',
  },
  'close-quarters': {
    term: 'Close-quarters Shooting',
    en: 'Shooting made while within Engagement Range under specific rules (e.g. Pistols, or from a TRANSPORT).',
    ru: 'Стрельба в радиусе связывания по особым правилам (например, из пистолетов или из TRANSPORT).',
  },

  // — Battlefields: terrain traits & terrain rules —
  'terrain-category': {
    term: 'Terrain Category',
    en: 'The classification of a terrain feature — Exposed, Light or Dense — which determines how it affects models’ movement and visibility.',
    ru: 'Классификация элемента укрытия — открытые (Exposed), лёгкие (Light) или плотные (Dense), — определяющая, как он влияет на движение и видимость моделей.',
  },
  'obscuring': {
    term: 'Obscuring',
    en: 'A terrain rule: a terrain area containing a Light or Dense feature is an obscuring terrain area. Two models can’t see each other if every line of sight between them crosses one or more such areas that neither model is within.',
    ru: 'Правило ландшафта: область укрытия с лёгким или плотным элементом является загораживающей. Две модели не видят друг друга, если каждая линия обзора между ними пересекает одну или несколько таких областей, внутри которых не находится ни одна из этих моделей.',
  },
  'dense-terrain': {
    term: 'Dense Terrain',
    en: 'A terrain trait: a terrain area containing a Dense terrain feature counts as an obscuring terrain area, so two models can’t see each other if the line of sight between them crosses it and neither is within it.',
    ru: 'Свойство ландшафта: область с плотным (Dense) элементом считается загораживающей, поэтому две модели не видят друг друга, если линия обзора между ними пересекает её и ни одна из них не находится внутри.',
  },
  'light-terrain': {
    term: 'Light Terrain',
    en: 'A terrain category: light terrain can provide cover from incoming attacks, but will not slow an enemy’s advance or offer lasting defence (e.g. barricades, low walls).',
    ru: 'Категория укрытий: лёгкие укрытия могут обеспечить укрытие от направленных атак, но не замедляют продвижение врага и не дают долговременной защиты (например, баррикады, невысокие стены).',
  },
  'solid': {
    term: 'Solid',
    en: 'A terrain trait (also carried by Dense terrain): line of sight can’t be drawn through — and a model can’t end a move through — any enclosed part of the feature 3" or less above ground level, not even through doors or windows.',
    ru: 'Свойство ландшафта (есть и у плотных укрытий): сквозь закрытые части элемента на высоте 3" и менее от земли нельзя провести линию обзора и нельзя завершить манёвр — даже через двери или окна.',
  },
  'go-to-ground': {
    term: 'Go to Ground',
    en: 'A state, not an Action: a Hidden model within Solid terrain that made no ranged attacks this or the previous turn has gone to ground; while it has, subtract 3" from that model’s detection range, making it harder to spot.',
    ru: 'Состояние, а не действие: скрытая модель внутри сплошного укрытия, не стрелявшая в этот и прошлый ход, считается залёгшей; пока она залегла, из её радиуса обнаружения вычитается 3", и её труднее обнаружить.',
  },
  'level-of-control': {
    term: 'Level of Control',
    en: 'A player’s total control over an objective at the end of a phase or turn — the sum of the Objective Control characteristics of all their models within range of it. The player with the higher level of control controls the objective.',
    ru: 'Суммарный контроль игрока над целью в конце фазы или хода — сумма характеристик Контроля цели всех его моделей в пределах дальности этой цели. Цель контролирует тот игрок, у кого уровень контроля выше.',
  },
  'controlling-unit': {
    term: 'Controlling Unit',
    en: 'The unit that controls an objective marker — the one whose eligible models within range of it have the greater total Objective Control.',
    ru: 'Юнит, который контролирует маркер цели — тот, у чьих подходящих моделей в пределах его дальности суммарный Контроль цели больше.',
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
    en: 'The words listed in a unit’s Keywords section (and its datasheet name) that rules, abilities and restrictions interact with — e.g. INFANTRY, VEHICLE, a faction keyword.',
    ru: 'Слова, перечисленные в разделе «Ключевые слова» юнита (и название его листа данных), с которыми взаимодействуют правила, способности и ограничения — например INFANTRY, VEHICLE.',
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
    en: 'A model/unit keyword, usually a leader or hero. A CHARACTER can often join a Bodyguard unit as a Leader, and when attacks are allocated each CHARACTER model forms its own group.',
    ru: 'Ключевое слово модели или юнита — обычно лидер или герой. CHARACTER часто может присоединиться к юниту-телохранителю как лидер, а при распределении атак каждая модель CHARACTER образует отдельную группу.',
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
    en: 'A unit’s basic way of shooting — available when it’s not within Engagement Range and hasn’t Advanced or Fallen Back this turn. It usually happens in the Shooting phase, but some rules let a unit shoot this way at other times too.',
    ru: 'Базовый способ стрельбы юнита — доступен, если он не в радиусе связывания и не совершал продвижение или отход в этот ход. Обычно происходит в фазе стрельбы, но некоторые правила позволяют так стрелять и в другое время.',
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
    en: 'A shooting type allowed by Fire Overwatch: the unit can target only one visible enemy unit within 24", each attack hits only on an unmodified hit roll of 6 (regardless of BS or modifiers), and hit rolls can’t be re-rolled.',
    ru: 'Тип стрельбы, разрешаемый правилом Fire Overwatch: юнит может выбрать целью только один видимый вражеский юнит в пределах 24", каждая атака попадает только на немодифицированный бросок на попадание 6 (независимо от BS и модификаторов), а броски на попадание нельзя перебрасывать.',
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
    en: 'A terrain area with one or more Light or Dense terrain features; a line of sight drawn through it can leave models not visible to each other.',
    ru: 'Область укрытия с одним или несколькими лёгкими или плотными элементами; линия обзора через неё может делать модели не видимыми друг для друга.',
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
  'vehicle': {
    term: 'VEHICLE',
    en: 'A model/unit keyword for armoured war machines such as tanks and gunships.',
    ru: 'Ключевое слово модели или юнита для бронированных боевых машин — танков, штурмовых кораблей и т. п.',
  },
  'walker': {
    term: 'WALKER',
    en: 'A VEHICLE keyword for legged war machines that stride the battlefield on two or more legs.',
    ru: 'Ключевое слово (подтип VEHICLE) для шагающих боевых машин, передвигающихся на двух или более ногах.',
  },
  'infantry': {
    term: 'INFANTRY',
    en: 'A model/unit keyword for foot soldiers — the most common troop type.',
    ru: 'Ключевое слово модели или юнита для пеших солдат — самого распространённого типа войск.',
  },
  'beasts': {
    term: 'BEASTS',
    en: 'A model/unit keyword for beasts and cavalry-like creatures; for movement and terrain they follow the same rules as INFANTRY.',
    ru: 'Ключевое слово модели или юнита для зверей и подобных кавалерии существ; в движении и террейне действуют так же, как INFANTRY.',
  },
  'psyker': {
    term: 'PSYKER',
    en: 'A model/unit keyword for psychic wielders; some rules (e.g. [ANTI-PSYKER] weapons) specifically target or affect PSYKER units.',
    ru: 'Ключевое слово модели или юнита для владеющих псионикой; некоторые правила (например, оружие [ANTI-PSYKER]) специально нацелены на юниты PSYKER или влияют на них.',
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
    en: 'A flying unit can declare this before it moves: it loses 2" of movement, but its models can fly over models and terrain and ignore vertical distances.',
    ru: 'Летающий юнит может объявить это перед манёвром: он теряет 2" движения, зато его модели пролетают над моделями и террейном и игнорируют вертикальную дистанцию.',
  },

  // — Imported terms: abilities —
  'bearer': {
    term: 'Bearer',
    en: 'The single model in a unit that carries a particular item of wargear (or an Enhancement). Its ability applies through that model and lasts only while the bearer is not destroyed.',
    ru: 'Одна модель в юните, несущая конкретный предмет снаряжения (или улучшение). Его способность действует через эту модель и только пока носитель не уничтожен.',
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
    en: 'The player who controls a given model or unit — the one whose army it belongs to.',
    ru: 'Игрок, который контролирует данную модель или юнит — тот, в чьей армии он находится.',
  },
  'you': {
    term: 'You',
  },
  'other': {
    term: 'Other',
  },
}
