export const basicRules = {
  en: [
    {
      id: '01',
      num: '01',
      title: 'Core Concepts',
      page: 8,
      description: 'Before you learn how to move your warriors across the battlefield and attack the enemy in deadly firefights and bloody close combat, this section introduces some core concepts that underpin every Warhammer 40,000 battle.',
      subsections: [
        {
          id: 'section-01-01',
          sectionNum: '01.01',
          title: 'Armies',
          body: `Each player in a game of Warhammer 40,000 commands an army made up of units of models. You control all of the models in your army. If a rule refers to the 'controlling player', it is referring to the player who controls the models being affected by that rule.`,
          children: [
            {
              id: 'section-01-01-01',
              sectionNum: '01.01.01',
              title: 'You',
              fromApp: true,
              body: `If a rule refers to 'you', it is referring to you the person, as the controlling player.`,
            },
          ],
        },
        {
          id: 'section-01-02',
          sectionNum: '01.02',
          title: 'Units and Models',
          body: `A unit can contain one or more models. These models move and fight together as a single group. Most models have a base, which is also part of that model for all rules purposes.

Rules sometimes affect 'friendly' or 'enemy' models or units, which are defined as follows:
▪ Friendly units and models are those in your army.
▪ Enemy units and models are those in your opponent's army.

If a rule affects units or models without specifying that they are friendly or enemy, that rule affects any unit or model, regardless of whose army they are in. When an effect or ability applies to a unit, it applies to every model in that unit.`,
          seeAlso: ['Frame 17.02'],
          children: [
            {
              id: 'section-01-02-01',
              sectionNum: '01.02.01',
              title: 'Starting Strength and Half-Strength',
              fromApp: true,
              body: `The number of models a unit contains at the start of the first battle round is its **[gloss:starting-strength:starting strength]**. The **starting strength** of an **[gloss:attached-unit:attached unit]** is the number of models that unit contains at the start of the first battle round.

Some rules refer to units being **[gloss:below-starting-strength:below starting strength]**, or at — or below — **[gloss:half-strength:half-strength]**. The meaning of these terms varies depending on a unit's **starting strength**, as shown below.

Units or models whose **[gloss:wounds:W]** characteristic or **starting strength** cannot be evenly divided in half cannot be **at half-strength** (but can be **below half-strength**).`,
              table: {
                headers: ['Condition', 'Starting Strength of 1 (tracks wounds)', 'Starting Strength of 2 or more'],
                rows: [
                  ['**Below Starting Strength**', "Model's remaining wounds are less than its **[gloss:wounds:W]** characteristic.", 'Number of remaining models in the unit is less than its **starting strength**.'],
                  ['**At Half-Strength**', "Model's remaining wounds are half of its **[gloss:wounds:W]** characteristic.", 'Number of remaining models in the unit is half of its **starting strength**.'],
                  ['**Below Half-Strength**', "Model's remaining wounds are less than half of its **[gloss:wounds:W]** characteristic.", 'Number of remaining models in the unit is less than half of its **starting strength**.'],
                ],
              },
              example: 'A Captain (1 model) is attached to a unit of Intercessors (5 models). This **attached** unit has a **starting strength** of 6. If three Intercessors were **[gloss:destroyed:destroyed]**, the unit would be **at half-strength**. If four Intercessors were **destroyed**, the unit would be **below half-strength**. If all of the Intercessors were **destroyed**, the remaining Captain would be **below half-strength**, despite having his full wounds remaining.',
            },
            {
              id: 'section-01-02-02',
              sectionNum: '01.02.02',
              title: 'Persisting Rules Effects',
              fromApp: true,
              body: `Some rules apply an effect that lasts until a certain duration has passed (e.g. until the start of your next turn). Such effects are known as persisting effects.

If a persisting effect applies to a unit when you place it in **[gloss:strategic-reserves:strategic reserves]** or when it embarks within a [gloss:transport:TRANSPORT], make a note of that effect and its duration; if that unit is set up on the battlefield again, any persisting effects continue to apply to that unit for their full duration.

If you have a rule that specifies when it is triggered (e.g. 'In the Shooting phase') and it does not specify how long it is active for, it is only active for the duration of that specified period (e.g. until the end of that Shooting phase). After that period, that effect is no longer applicable/active.

If a rule or effect is given to a unit and it does not specify how long it is active for, it is only active for the phase in which it was given.`,
            },
            {
              id: 'section-01-02-03',
              sectionNum: '01.02.03',
              title: 'Revived and Adding Models to a Unit',
              fromApp: true,
              body: `When a rule **revives**, resurrects, returns or adds models to a unit, the specified number of models are added to the unit.
▪ If a rule **revives**, resurrects or returns models to a unit, it does so through **destroyed** models from that unit.
▪ This cannot expand a unit beyond its **starting strength**.
▪ Unless otherwise stated, such models are added with all [gloss:wargear:wargear] and enhancements they started the battle with, and with their full **[gloss:wounds:W]** remaining.
Models returned to a unit on the battlefield must be set up as follows:

▪ They must be set up in **[gloss:coherency:coherency]** with models in that unit that started that phase on the battlefield.
▪ They can be set up **[gloss:engaged:engaged]** with one or more enemy units, but only if those enemy units were already **engaged** with the unit that model is being returned to.
If a **[gloss:leader:leader]** or **[gloss:support:support]** model in an **attached** unit is **destroyed** and subsequently revived, they are still part of that **attached** unit and they must be returned to it if possible.`,
            },
            {
              id: 'section-01-02-04',
              sectionNum: '01.02.04',
              title: 'Not On The Battlefield',
              fromApp: true,
              body: `A unit that is embarked within a **[gloss:transport:TRANSPORT]** or that is in **strategic reserves** is not on the battlefield. The following applies to such units:
▪ That unit is **[gloss:not-visible:not visible]** to any __other__ units (units are **[gloss:visible:visible]** to themselves).
▪ Any other unit is **[gloss:not-visible:not visible]** to that unit.
▪ Players cannot measure distances to or from that unit (units are within range of their own [gloss:ability:abilities]).
This means units not on the battlefield cannot be selected or targeted by any attack or rule that requires a unit to be **[gloss:visible:visible]** or within a certain distance (other than their own abilities).

Such units can still use their other rules, and are still units in the controlling player's army and so can be affected by rules that require a player to select a unit from an army, as well as rules that affect all units in an army.

The controlling player must make **battle-shock rolls** for units that are not on the battlefield in their Command phase if they are **[gloss:battle-shocked:battle-shocked]**, or if they are at or below **[gloss:half-strength:half-strength]**.`,
            },
            {
              id: 'section-01-02-05',
              sectionNum: '01.02.05',
              title: 'Other Model / Unit',
              fromApp: true,
              body: `When a rule refers to models or units 'other' than the one with that rule (or one already mentioned by that rule), it means a different model or unit to that original one.

Different instances of the same [gloss:datasheet:datasheet] are still considered to be 'other' units.`,
            },
            {
              id: 'section-01-02-06',
              sectionNum: '01.02.06',
              title: 'Splitting Units',
              fromApp: true,
              body: `Some rules allow you to split units into smaller units (e.g. the Transport ability of Drukhari Venoms). When using such rules:
▪ The same models can only be subdivided in this way once (e.g. those smaller units cannot themselves be split further).
▪ If a rule is used to split a unit into multiple units before the battle, the **starting strength** of each individual unit is changed to be equal to the number of models in that unit.`,
            },
            {
              id: 'section-01-02-07',
              sectionNum: '01.02.07',
              title: 'Describing Units',
              fromApp: true,
              body: `When a rule mentions a unit, it may have a descriptor for the unit (e.g. [gloss:terminator:TERMINATOR] unit, **[gloss:hidden:hidden]** unit, **battle-shocked** unit, **visible** unit, [gloss:controlling-unit:controlling] unit). For such descriptors to apply to a unit, that unit must have at least one model in that unit that meets that descriptor.

This does not give that rule to every model in the unit, unless that rule specifically states that it gives that rule to the unit, in which case every model in that unit gains that rule, as described in Units and Models (01.02).`,
              example: `A **hidden** unit would be a unit that has a model in it that is **hidden**.`,
            },
            {
              id: 'section-01-02-08',
              sectionNum: '01.02.08',
              title: 'A (Unit/Model/Object)',
              fromApp: true,
              body: `Some rules may refer to 'a' unit/model/object without specifying an exact number. In such cases, the meaning is 'one or more', rather than exactly one.`,
              example: `If a rule has a condition that requires a unit to be 'within range of an **[gloss:objective:objective]**', that condition is still met if that unit is within range of more than one **objective**.`,
            },
            {
              id: 'section-01-02-09',
              sectionNum: '01.02.09',
              title: 'Tokens',
              fromApp: true,
              body: `Tokens are gaming aids that some rules instruct you to place next to a model/unit to remind you and your opponent that a model/unit either has a limited-use ability or is under the effects of a particular rule. Tokens are not counted as models for any purposes (even if they are being represented by a model). If another model needs to move into the space occupied by a token, reposition the token to allow that move to be made.`,
            },
            {
              id: 'section-01-02-10',
              sectionNum: '01.02.10',
              title: 'Adding a new unit to your army',
              fromApp: true,
              body: `Some rules add a new unit to your army during a battle. That unit's **starting strength** is determined when it is added to your army, but is otherwise determined in the same way as for other units.`,
            },
            {
              id: 'section-01-02-11',
              sectionNum: '01.02.11',
              title: 'All Types of Model',
              fromApp: true,
              body: `When a rule mentions 'all types of model', this is inclusive of friendly and enemy models and all **keywords**, e.g. MONSTER/VEHICLE models.`,
            },
          ],
        },
        {
          id: 'section-01-03',
          sectionNum: '01.03',
          title: 'Active Player and Opposing Player',
          body: `At any given time, one player is the 'active player' and their opponent is the 'opposing player'. Which player is which changes throughout the battle, but both players are always one or the other; whenever a player becomes the active player, their opponent becomes the opposing player, and vice versa.

While it is neither player's turn (e.g. at the start or end of the battle round), the player who takes the first turn in each battle round is the active player.

While it is a player's turn, that player is the active player, with the following exceptions:
▪ Each time a unit is **selected to move**, that unit's controlling player is the active player until that move ends.
▪ Each time a unit is **selected to shoot** or **selected to fight**, that unit's controlling player is the active player until those attacks are resolved.`,
          children: [
            {
              id: 'section-01-03-01',
              sectionNum: '01.03.01',
              title: "Player's Rules",
              fromApp: true,
              body: `During the game, players will sometimes need to know which rules are theirs, as opposed to their opponent's. The following are considered a player's rules:

▪ Any **[gloss:army-rules:army rules]** they have.
▪ Any **[gloss:detachments:detachments]** in their army.
▪ Any **[gloss:stratagem:stratagems]** they use.
▪ Any **[gloss:enhancement:enhancements]** that units or models in their army have.
▪ Any abilities or rules found on their units' datasheets.
▪ Rules that have restrictions (e.g. 'Once per battle/turn/phase') only apply to the player whose rule it is.

Some missions may introduce additional rules that take effect in the battle. Where this is the case:

▪ If the rule is used by a player, it is treated as one of that player's rules.
▪ If it is not used by a player, and always takes effect, such a rule is resolved before any of the active player's rules, in an order of their choosing.`,
            },
            {
              id: 'section-01-03-02',
              sectionNum: '01.03.02',
              title: 'Rules Sequencing',
              fromApp: true,
              body: `At any point in the game, the players will have rules that they can or must use, which may occur at the same time another player can or must use a rule. Unless otherwise stated, these are activated in the following order:

1. All of the active player's rules that must be used, in an order of their choosing.
2. All of the active player's rules that they can optionally use and wish to use, in an order of their choosing.
3. All of the opposing player's rules that must be used, in an order of their choosing.
4. All of the opposing player's rules that they can optionally use and wish to use, in an order of their choosing.

If another rule could be used after a rule has resolved during this sequence but before other rules in that same timing have resolved, those new rules do not trigger until all the remaining rules to be resolved in that same timing have been resolved.`,
              example: `The active player's unit has an ability enabling it to make a **[gloss:normal-move:normal move]** after it has shot. An enemy unit targeted by that unit has an ability enabling it to shoot back at a unit that shot at it. The active player's rule is resolved first, followed by the opposing player's rule.`,
            },
          ],
        },
        {
          id: 'section-01-04',
          sectionNum: '01.04',
          title: 'Measuring Distances',
          body: `Distances in Warhammer 40,000 are measured in **[gloss:inch:inches]** ("). You can measure distances whenever you want to.

When a rule refers to a model's position in relation to anything else on the battlefield, unless otherwise stated, measure to or from the closest part of that model's base.`,
          example: `A Space Marine Intercessor (base: 32mm) is 4" from an enemy Ork Boy (base: 25mm). You measure from the closest edge of the Space Marine's base to the closest edge of the Ork Boy's base — not from their centres. If a rule requires them to be within 1", they are not yet within range.`,
          children: [
            {
              id: 'section-01-04-01',
              sectionNum: '01.04.01',
              title: 'Within / Wholly Within',
              fromApp: true,
              body: `Rules in Warhammer 40,000 will often apply to models or units that are [gloss:within:within] or [gloss:wholly-within:wholly within] a certain distance. The following definitions explain what these terms mean:

▪ **Within:** If a rule says it applies 'within' a specified distance, it applies at any distance that is not more than that distance. For example, within 1" means any distance that is not more than 1" away
▪ **Model/Unit Within:** A model is within a specified distance if any part of its [gloss:base:base] is within that distance. A unit is within a specified distance if one or more of its models are within that distance.
▪ **Model/Unit Wholly Within:** A model is wholly within a specified distance if every part of its [gloss:base:base] is within that distance. A unit is wholly within if every model in that unit is wholly within the specified distance. A model with the FRAME keyword is wholly within a specified distance if all parts of that model are within the specified distance.`,
              example: `A model is wholly within a **[gloss:terrain-area:terrain area]** if no part of its base extends beyond the [gloss:footprint:footprint] of that **terrain area**. A unit is wholly within a specified distance if every model in that unit is wholly within that distance.`,
            },
            {
              id: 'section-01-04-02',
              sectionNum: '01.04.02',
              title: 'Closest Or Nearest Model/Unit',
              fromApp: true,
              body: `When a rule refers to the closest or nearest model or unit, this is the closest model or unit to the model or unit using that rule.

If two or more are equally close, the controlling player of the model or unit using that rule selects which is the closest for the purposes of that rule.`,
            },
            {
              id: 'section-01-04-03',
              sectionNum: '01.04.03',
              title: 'As Close As Possible',
              fromApp: true,
              body: `If a rule instructs you to move a model as close as possible to a unit or model you must end that model's move in [gloss:base-contact:base contact] with that unit or model if its move is sufficient to do so without breaking any other restrictions (such as **coherency**), or as close as you can achieve if its move is not sufficient.
▪ If a model is already as close as possible to a unit or model when it is instructed to make a move as close as possible towards a unit or model, that model cannot be moved, but still counts as having made the move in question.
If a rule instructs you to move a model as close as possible to an **[gloss:objective:objective]** you must end that model's move [gloss:within:within] range of an **objective** if its move is sufficient to do so without breaking any other restrictions (such as **coherency**), or as close as you can achieve if its move is not sufficient.
▪ If that model is already [gloss:within:within] range of an **objective** it can move up to the **[gloss:maximum-distance:maximum distance]** of that move but must end its move still [gloss:within:within] range of that **objective**.`,
            },
            {
              id: 'section-01-04-04',
              sectionNum: '01.04.04',
              title: 'Base Contact or Base to Base Contact',
              fromApp: true,
              body: `When two models' bases are touching, they are in base contact – also known as base-to-base contact – and are as close as possible (01.04.03).

When moving a model from your army into base contact with an enemy model during a move, if that enemy model overhangs its base such that it is not physically possible to be in base contact with that model, until the end of the turn, those models are considered to be in base contact with each other while all of the following are true:
▪ The distance your model could move was sufficient to move it into base contact with the enemy model if there was no overhang.
▪ The models are as close as possible together.
▪ Any part of one model is within 1" of any part of the other model.`,
            },
          ],
        },
        {
          id: 'section-01-05',
          sectionNum: '01.05',
          title: 'Dice',
          body: `You will require some six-sided dice (often abbreviated to D6). There are many ways dice rolls are referred to, including:
▪ 2+, 3+, and so on: 2+ means a result of 2 or more, 3+ means a result of 3 or more, and so on.
▪ 1‑3, 4‑6, and so on: Any result within the specified range will interact with the rule stated.
▪ 2D6, 3D6, and so on: Roll the stated number of D6 and add the individual values together (e.g. to roll 2D6, roll two D6 and add the values together).
▪ D3: Roll one D6 and halve the result (rounding up).
▪ D6+1, 2D6+3, and so on: Roll the stated number of dice and add the stated value to the result.`,
          children: [
            {
              id: 'section-01-05-01',
              sectionNum: '01.05.01',
              title: 'Automatically Successful/Passes/Hits/Wounds',
              fromApp: true,
              body: `When a dice roll or test is automatically successful or automatically passes/hits/wounds, do not roll the dice and instead move to the next step of the sequence for that roll as if the required result had been rolled. Any rules that take effect on a particular dice result or roll result do not take effect.

**Example:** If a **[gloss:hit-roll:hit roll]** is automatically successful, move straight to the Wound Rolls step for that attack. Such a **hit roll** is not a **[gloss:critical-hit:critical hit]**.

**Example:** If a **[gloss:wound-roll:wound roll]** is automatically successful, move straight to the Save Rolls step for that attack. Such a **wound roll** is not a **[gloss:critical-wound:critical wound]**.`,
            },
            {
              id: 'section-01-05-02',
              sectionNum: '01.05.02',
              title: 'Re-rolls',
              fromApp: true,
              body: `Some rules allow you to re-roll a dice roll, which means you get to roll some or all of the dice again. When a rule lets you re-roll one or more dice, the following points apply:

▪ If a rule allows you to re-roll a dice roll that was made by adding several dice together (e.g. 2D6, 3D6, etc.) then you must re-roll all of those dice again.
▪ You can never re-roll a dice more than once, and re-rolls happen before modifiers (if any) are applied.
▪ A re-rolled dice is still considered to be a dice roll and, as such, any rules that can be triggered by a dice roll can also be triggered by a re-rolled dice.`,
            },
            {
              id: 'section-01-05-03',
              sectionNum: '01.05.03',
              title: 'Modifying Dice Rolls',
              fromApp: true,
              body: `See Modifiers (02.02.01).`,
            },
            {
              id: 'section-01-05-04',
              sectionNum: '01.05.04',
              title: 'Ignoring Roll Modifiers',
              fromApp: true,
              body: `See Ignore Modifiers (02.02.02)`,
            },
            {
              id: 'section-01-05-05',
              sectionNum: '01.05.05',
              title: 'Roll Off',
              fromApp: true,
              body: `Some rules instruct players to roll off.
▪ To do so, both players roll one D6, and whoever rolls highest wins the roll-off.
▪ If there is a tie for the highest roll, roll off again.`,
            },
            {
              id: 'section-01-05-06',
              sectionNum: '01.05.06',
              title: 'Doubles Or Triples',
              fromApp: true,
              body: `When making a dice roll, a double is a roll that includes any two dice of the same result, and a triple is a roll that includes any three dice of the same result.`,
            },
            {
              id: 'section-01-05-07',
              sectionNum: '01.05.07',
              title: 'Highest or Lowest Dice Result',
              fromApp: true,
              body: `If a rule refers to the highest dice result and a dice roll involves multiple dice, if more than one of those dice have the same value, and that value is the highest, the active player must select one of those dice to be the highest dice result.

If a rule refers to the lowest dice result and a dice roll involves multiple dice, if more than one of those dice have the same value, and that value is the lowest, the active player must select one of those dice to be the lowest dice result.`,
            },
            {
              id: 'section-01-05-08',
              sectionNum: '01.05.08',
              title: 'Treated As, Set To (Dice Roll)',
              fromApp: true,
              body: `When a dice result is 'treated as' or 'set' to another value, any rules that would take effect if that value had been rolled take effect.

This may result in a value that is greater than a value that could be rolled on a D6 dice.`,
            },
          ],
        },
        {
          id: 'section-01-06',
          sectionNum: '01.06',
          title: 'Leadership Rolls',
          body: `To make a **leadership roll** for a unit, its controlling player rolls 2D6: if the result is equal to or greater than one or more of the Ld characteristics in that unit, that roll succeeds. Otherwise, that roll fails. The rule that instructed you to make that **leadership roll** will describe the effects of that roll succeeding or failing.`,
          children: [
            {
              id: 'section-01-06-01',
              sectionNum: '01.06.01',
              title: 'Leadership Test',
              fromApp: true,
              body: `Some rules may use the term [gloss:leadership-test:Leadership test], this is the same as **leadership roll**.`,
            },
          ],
        },
        {
          id: 'section-01-07',
          sectionNum: '01.07',
          title: 'Battle-Shock Rolls',
          body: `To make a **battle-shock roll** for a unit, its controlling player makes a **leadership roll** for it (see above).
▪ If that roll succeeds, that unit does not become **battle-shocked**.
▪ If that roll fails, that unit, and each model in it, is **battle-shocked**.

While a unit is **battle-shocked**:
▪ The Objective Control (OC) characteristic of all of its models is modified to '-'.
▪ Its controlling player cannot target that unit with **stratagems**.
▪ It is not **eligible to start an [gloss:action:action]**, and any action it has started cannot be completed.`,
          example: `A Guardsman squad with Ld 7+ has taken heavy casualties and must make a **battle-shock roll**. The player rolls 2D6 and gets a 9 — since 9 is not less than 7, the roll succeeds and the squad holds its nerve. If the roll had been 6 or less, the entire unit would become battle-shocked, losing their ability to control objectives.`,
          seeAlso: ['Command Phase 08.00'],
          children: [
            {
              id: 'section-01-07-01',
              sectionNum: '01.07.01',
              title: 'Battlefield Morale',
              fromApp: true,
              body: `The morale and organisation of troops can waver and break during battle. This is checked using **battle-shock rolls**, most commonly in the Command phase. Failing such a roll represents the unit's courage faltering due to taking casualties or through other disruption, reducing its battlefield effectiveness. Similarly, some rules will require you to check a unit's readiness by making a **leadership roll**.`,
            },
            {
              id: 'section-01-07-02',
              sectionNum: '01.07.02',
              title: 'Battle-shock Test',
              fromApp: true,
              body: `The term Battle-shock test is the same as **battle-shock roll**.`,
            },
          ],
        },
      ],
    },
    {
      id: '02',
      num: '02',
      title: 'Datasheets',
      page: 10,
      image: { src: '/images/intro/datasheet.png', alt: 'Datasheet example' },
      description: 'Each unit has a datasheet that explains how it functions in battle. Here you will learn how to use datasheets when preparing your army and playing games.',
      subsections: [
        {
          id: 'section-02-01',
          sectionNum: '02.01',
          title: 'Datasheet Name',
          body: `Here you will find the name of the unit.`,
          children: [
            {
              id: 'section-02-01-01',
              sectionNum: '02.01.01',
              title: 'Datasheet Name and Keywords',
              fromApp: true,
              body: `As well as the keywords listed in each datasheet's Keywords section, each datasheet name acts as an additional keyword for that unit.`,
            },
          ],
        },
        {
          id: 'section-02-02',
          sectionNum: '02.02',
          title: 'Profiles',
          body: `These contain the following characteristics that tell you how mighty the models in the unit are:

▪ **Move (M):** The speed at which a model traverses the battlefield. If a model has an M characteristic of '-', it can be set up on the battlefield but otherwise cannot be moved.
▪ **Toughness (T):** The model's resilience against harm.
▪ **Save (Sv):** Presented as a dice result (e.g. 4+), this indicates the protection a model's armour gives it.
▪ **Invulnerable Save (InSv):** Presented as a dice result (e.g. 4+). Some models are protected by esoteric means in addition to physical armour, such as force fields or preternatural reflexes. Not all models have an InSv characteristic, but if they do, it will be listed here.
▪ **Wounds (W):** Wounds represent how much damage a model can sustain before it is **[gloss:destroyed:destroyed]**. If a model's wounds are reduced to 0 or fewer, that model is **destroyed**.
▪ **Leadership (Ld):** Presented as a dice result (e.g. 7+), this reveals how courageous, determined or self-controlled a model is.
▪ **Objective Control (OC):** How effectively a model can control an **objective** on the battlefield. If a model has an OC characteristic of '-' it is unable to control **objectives** at all.`,
          children: [
            {
              id: 'section-02-02-01',
              sectionNum: '02.02.01',
              title: 'Modifiers',
              fromApp: true,
              body: `### What Are Modifiers?
Many rules in the game modify a value, characteristic or roll elsewhere in the game. A rule that does so is known as a [gloss:modifier:modifier]. A value that has been changed is a modified rule (e.g. modified characteristic, modified roll, modified value, etc).

One of the most common ways for modifiers to be presented is as +1 or -1 to a characteristic, roll or value.

If the rule has +1 to a characteristic, it improves it by the value after the '+' symbol.

**Example:** 'This weapon has +1 **[gloss:armour-penetration:AP]**' would improve an **[gloss:armour-penetration:AP]** characteristic of -2 to -3.

If the rule has -1 to a characteristic, it worsens it by the value after the '-' symbol.

**Example:** 'This unit has -1 **[gloss:save-roll:Sv]**' would worsen a **[gloss:save-roll:Sv]** characteristic of 3+ to 4+.

### Applying Modifiers
This section presents the various ways rules may be modified. All modifiers are cumulative.

When a value is modified (e.g. characteristic, dice roll, distance), do so in the following order.
1. If a rule instructs you to change or replace one value with a specified value, you must first change the relevant value to the new value. (Note that rules that modify a characteristic in this step to a new value of '0', '-' or '*' cannot be modified by other rules — in such cases, skip steps 2-5.)
2. Apply multiplication modifiers.
3. Apply addition modifiers.
4. Apply division modifiers.
5. Apply subtraction modifiers.
6. Round any fractions up after applying all modifiers.

### When Modifying Characteristics
When modifying characteristics, the following points also apply:
▪ Characteristics of '-', '*' and 'N/A' can never be modified.
▪ Rules that modify a model's **[gloss:weapon-skill:WS]** and/or **[gloss:ballistic-skill:BS]** characteristic modify the **[gloss:weapon-skill:WS]** and/or **[gloss:ballistic-skill:BS]** characteristic of every weapon equipped by that model.
▪ After all modifiers have been applied:
▫ **[gloss:move-characteristic:M]** cannot be less than 1".
▫ **[gloss:toughness:T]** cannot be less than 1.
▫ **[gloss:save-roll:Sv]** cannot be 1+ or better.
▫ **[gloss:invulnerable-save:InSv]** cannot be 1+ or better.
▫ **[gloss:leadership:Ld]** cannot be 4+ (or better) or 9+ (or worse).
▫ **[gloss:objective-control:OC]** cannot be less than 0 or '-'.
▫ **[gloss:range:Range]** characteristics cannot be less than 1".
▫ **[gloss:attack-dice:A]** cannot be less than 1.
▫ **[gloss:weapon-skill:WS]** cannot be 1+ (or better) or 7+ (or worse).
▫ **[gloss:ballistic-skill:BS]** cannot be 1+ (or better) or 7+ (or worse).
▫ **[gloss:strength:S]** cannot be less than 1.
▫ **[gloss:armour-penetration:AP]** cannot be worse than 0.
▫ **[gloss:damage-roll:D]** cannot be less than 1.

When these terms are used in rules, the affected characteristics are being modified, and the following points apply:
▪ **Improving WS, BS, Sv and Ld:** When improving a **[gloss:weapon-skill:WS]**, **[gloss:ballistic-skill:BS]**, **[gloss:save-roll:Sv]** or **[gloss:leadership:Ld]** characteristic, subtract the appropriate amount from the number before the plus sign, e.g. improving a **[gloss:weapon-skill:WS]** of 3+ by 1 would result in a **[gloss:weapon-skill:WS]** of 2+.
▪ **Worsening WS, BS, Sv and Ld:** When worsening a **[gloss:weapon-skill:WS]**, **[gloss:ballistic-skill:BS]**, **[gloss:save-roll:Sv]** or **[gloss:leadership:Ld]** characteristic, add the appropriate amount to the number before the plus sign, e.g. worsening a **[gloss:weapon-skill:WS]** of 3+ by 1 would result in a **[gloss:weapon-skill:WS]** of 4+.
▪ **Improving AP:** When improving an Armour Penetration characteristic, subtract the appropriate amount from the characteristic, e.g. improving an **[gloss:armour-penetration:AP]** of -1 by 1 would result in an **[gloss:armour-penetration:AP]** of -2; improving an **[gloss:armour-penetration:AP]** of 0 by 1 would result in an **[gloss:armour-penetration:AP]** of -1.
▪ **Reducing or Worsening AP:** When reducing or worsening an Armour Penetration characteristic, add the appropriate amount to the characteristic, to a maximum of 0, e.g. reducing/worsening an **[gloss:armour-penetration:AP]** of -1 by 1 would result in an **[gloss:armour-penetration:AP]** of 0; reducing/worsening an **[gloss:armour-penetration:AP]** of 0 by 1 would result in an **[gloss:armour-penetration:AP]** of 0.
▪ **Improving or Worsening Other Characteristics:** When instructed to improve/worsen a characteristic that does not include a '+' or '-' symbol, add/subtract the specified amount to/from that characteristic (e.g. to improve a **[gloss:strength:S]** by 1, add 1 to it).

### When Modifying Dice Rolls
When modifying dice rolls, the following points also apply:
▪ Modifiers are applied after any re-rolls of that dice roll.
▪ Rules that refer to the value of an 'unmodified' dice roll are referring to the dice result after any re-rolls, but before modifiers.
▪ A dice result can be modified above its maximum possible value (for example, a D6 roll can be modified above 6).
▪ A result that would be less than 1 is changed to a result of 1.
▪ **[gloss:hit-roll:Hit rolls]** and **[gloss:wound-roll:wound rolls]** can never be modified by more than -1 or +1. After all the cumulative modifiers to such a roll have been calculated, if the total modifier would be:
▫ -2 or worse, it is changed to -1.
▫ +2 or better, it is changed to +1.
▪ **[gloss:charge-roll:Charge rolls]** cannot be greater than 12. After all the cumulative modifiers to a **[gloss:charge-roll:charge roll]** have been calculated, if the result would be 13 or more, it is changed to 12.

### Other Modified Rules
The following rules apply to various rules and effects found throughout the game.
▪ **[gloss:detection-range:Detection range]** and **[gloss:lone-operative:Lone Operative]** cannot be better than 9" or worse than 30".

A **stratagem** cannot have its **[gloss:command-points:CP]** increased by more than 1 or reduced to below 0 after all modifiers have been applied.`,
            },
            {
              id: 'section-02-02-02',
              sectionNum: '02.02.02',
              title: 'Ignore Modifiers',
              fromApp: true,
              body: `Some rules enable a player, weapon, model or unit to ignore modifiers. When using such rules, the following points apply:

Unless otherwise stated, that rule allows you to ignore modifiers to the unit's rolls and the unit's **[gloss:profiles:profile]** and weapon characteristics.

When a rule states you can ignore modifiers to a stated roll or characteristic, you can choose to ignore all of those modifiers, or only some of them. For example, you can still choose to apply positive/beneficial modifiers while ignoring negative/detrimental modifiers.

**Example:** Your unit can ignore characteristic modifiers and is under the effect of +2" **[gloss:move-characteristic:M]** and -2" **[gloss:move-characteristic:M]**. You can choose to ignore the -2" **[gloss:move-characteristic:M]**, meaning that unit's **[gloss:move-characteristic:M]** characteristic will only be modified by the +2" **[gloss:move-characteristic:M]**.

**Example:** Your unit's ranged attacks can ignore roll modifiers and are under the effect of +1 to **hit rolls** and -1 to **hit rolls**. You can choose to ignore the -1 to **hit rolls**, meaning those attacks will only be affected by the +1 to **hit rolls**.`,
            },
            {
              id: 'section-02-02-03',
              sectionNum: '02.02.03',
              title: 'Random Characteristics',
              fromApp: true,
              body: `**Random Movement:** When a unit with a random **[gloss:move-characteristic:M]** characteristic is **selected to move**, determine the entire unit's move distance by rolling the indicated number of dice.

**Random Attacks:** If a weapon has a random **[gloss:attack-dice:A]** characteristic, that characteristic is determined when generating attacks for that weapon at the [gloss:resolve-attacks:Resolve Attacks] step (04.03). If several weapons with random **[gloss:attack-dice:A]** characteristics are making **identical attacks**, generate the attacks for each of those weapons individually, and group them all together.

**Random Damage:** If a weapon has a random **[gloss:damage-roll:D]** characteristic, then each time an attack made with it inflicts damage, the controlling player determines that weapon's characteristic when the opposing player has selected a model in the target unit to allocate that attack to.

When determining a random **[gloss:damage-roll:D]** characteristic, the dice roll made is called a **[gloss:damage-roll:damage roll]**.

Where a **[gloss:damage-roll:D]** characteristic includes an operator (e.g. a '+', as in D6+1), the value after the operator is part of that **[gloss:damage-roll:D]** characteristic – it is not a modifier.

**Other Random Characteristics:** For all other characteristics, roll to determine the value on an individual, per-model or per-weapon basis each time that characteristic is required.`,
            },
            {
              id: 'section-02-02-04',
              sectionNum: '02.02.04',
              title: 'Healing Or Regaining Lost Wounds',
              fromApp: true,
              body: `When a unit **[gloss:heal:heals]** or regains a number of wounds, it regains up to that number of lost wounds. For each wound healed or regained, consult the following:
▪ If that unit has one or more models that does not have its full wounds remaining, select one of those models; that model regains one lost wound.
▪ If all models in that unit have their starting number of wounds, but one or more models from that unit are currently **destroyed**, **[gloss:revive:revive]** one of those **destroyed** models, with one wound remaining.
This cannot cause a model to have more wounds remaining than it started the battle with.

If a rule states that a model **heals** or regains a number of wounds, only that model can regain wounds up to its starting number of wounds. Any excess regained wounds are lost and do not cause a **destroyed** model from that unit to **revive**.`,
            },
            {
              id: 'section-02-02-05',
              sectionNum: '02.02.05',
              title: 'Full Wounds Remaining',
              fromApp: true,
              body: `A model has its full wounds remaining if it has the same number of wounds remaining as its **[gloss:wounds:W]** characteristic.`,
            },
            {
              id: 'section-02-02-06',
              sectionNum: '02.02.06',
              title: 'Characteristic Modifiers & Modified Characteristics',
              fromApp: true,
              body: `See Modifiers (02.02.01).`,
            },
          ],
        },
        {
          id: 'section-02-03',
          sectionNum: '02.03',
          title: 'Abilities',
          body: `Many units have abilities that may apply during the game. These will be described here.`,
          seeAlso: ['Aura Abilities 22.01', 'Faction Abilities 22.02', 'Psychic Abilities 22.03', 'Wargear Abilities 22.04'],
          children: [
            {
              id: 'section-02-03-01',
              sectionNum: '02.03.01',
              title: 'Rules With Multiple Conditions And Effects',
              fromApp: true,
              body: `Some rules have multiple conditions, with the second, more specific condition conferring an improved rule, either instead of the first condition's rule or as well as it. Such rules require both the first condition and the second condition to be satisfied for the improved rule to apply.

For example, an ability reads: 'This unit's ranged attacks that target the closest eligible target can:
▪ Re-roll **hit rolls** of 1.
▪ __Or:__ If that target is within range of an **objective** your opponent controls, re-roll **hit rolls**.'
In order for those attacks to re-roll **hit rolls**, that target must be both the closest eligible target and within range of an **objective** your opponent controls.`,
            },
          ],
        },
        {
          id: 'section-02-04',
          sectionNum: '02.04',
          title: 'Weapons',
          body: `Weapons have the following characteristics:
▪ Range (R): How far ranged weapons can shoot. Weapons with an R characteristic of 'Melee' are melee weapons.
▪ Attacks (A): How many **[gloss:attack-dice:attack dice]** are used each time that weapon is used.
▪ Ballistic Skill (BS): Presented as a dice result (e.g. 4+), this shows how accurate the bearer is when shooting with the relevant ranged weapon.
▪ Weapon Skill (WS): Presented as a dice result (e.g. 4+), this reflects the bearer's skill in wielding the relevant melee weapon.
▪ Strength (S): The higher a weapon's S characteristic, the more likely it is to wound a foe.
▪ Armour Penetration (AP): Presented as a modifier to a dice roll (e.g. -1). The larger the modifier, the better the weapon is at cutting through the target's defences.
▪ Damage (D): The amount of damage inflicted by an attack.`,
          children: [
            {
              id: 'section-02-04-01',
              sectionNum: '02.04.01',
              title: 'Weapons With No Strength',
              fromApp: true,
              body: `If a weapon has no **[gloss:strength:S]** characteristic (because it is '-', or for any other reason) and a rule interacts with that weapon's **[gloss:strength:S]**, that weapon has **[gloss:strength:S]** 1 for that interaction.`,
            },
          ],
        },
        {
          id: 'section-02-05',
          sectionNum: '02.05',
          title: 'Keywords',
          body: `Datasheets have a list of keywords, separated into faction keywords and other keywords. The former are used when deciding which models to include in your army, but otherwise both are functionally the same. Keywords appear in full capitals, in KEYWORD BOLD.

Some rules are linked to one or more keywords. For example, a rule might say that it applies to INFANTRY units. This means it only applies to units that have the INFANTRY keyword. Singular and plural instances of the same keyword function in the same way.`,
          children: [
            {
              id: 'section-02-05-01',
              sectionNum: '02.05.01',
              title: 'Using Keywords & Mixed Keywords in Units',
              fromApp: true,
              body: `When using keywords, the following points apply:
▪ A unit has all the keywords of all models in that unit. A model only has its own keywords.
▪ If a rule specifies that it applies to a unit with a keyword, it applies to a unit which includes one or more models with that keyword.
▪ If a rule specifies that it applies to a model with a keyword, it only applies to a model with that keyword.
▪ If a rule specifies that it applies to 'non-KEYWORD' models/units, it only applies to models/units that do not have that keyword. For example, if a rule applies to non-VEHICLE units, it only applies to units that do not have the VEHICLE keyword.
▪ Some units can contain models that have different keywords. While this is the case, such a unit is considered to have all of the keywords of all of its models, and so is affected by any rule that applies to units with any of those keywords. Remember that attacks are made against units, not models.
▪ If a rule only applies to models with a specific keyword, then it instead only applies to models in such a unit that have the correct keyword.
▪ A rule with a comma-separated list of keywords, or a series of keywords separated by slashes ('/'), or two keywords separated by the word 'or' (e.g. 'an IMMORTALS, DEATHMARKS or LYCHGUARD unit') refers to a model/unit that has any one of those keywords.
▪ A rule with multiple adjacent keywords (e.g. 'an AELDARI GUARDIANS unit') only refers to a model/unit that has all of those keywords.
▪ Some older rules use keywords without specifying model or unit: for example, MONSTER/VEHICLE or TRANSPORT. These rules refer to units with those keywords.
▪ Singular and plural instances of the same keyword function in the same way.`,
            },
          ],
        },
        {
          id: 'section-02-06',
          sectionNum: '02.06',
          title: 'Unit Composition and Other Rules',
          body: `This section details the number and types of models in the unit. Each of those models will have one set of default wargear, which will be listed here. It may also list other rules, such as which units a leader unit can join or which units can embark within a TRANSPORT.`,
          children: [
            {
              id: 'section-02-06-01',
              sectionNum: '02.06.01',
              title: 'Bearer',
              fromApp: true,
              body: `The bearer of a weapon, enhancement or item of wargear is the model equipped with it.`,
            },
            {
              id: 'section-02-06-02',
              sectionNum: '02.06.02',
              title: "Unit's Equipment",
              fromApp: true,
              body: `When a rule refers to a unit's equipment, it refers to all of the wargear equipped by models in that unit.`,
            },
          ],
        },
        {
          id: 'section-02-07',
          sectionNum: '02.07',
          title: 'Wargear Options',
          body: `Some datasheets have a list of wargear options. When you include such a unit in your army, you can use these options to alter the weapons and other wargear its models have.`,
        },
      ],
    },
    {
      id: '03',
      num: '03',
      title: 'Moving',
      page: 12,
      description: 'During a battle, you will move your models by picking them up and changing their position on the battlefield. The principles of movement are explained here.',
      subsections: [
        {
          id: 'section-03-01',
          sectionNum: '03.01',
          title: 'Moving Units',
          body: `There are several types of move a unit can make. Each one defines which units are eligible to make it, what its **maximum distance** or **[gloss:set-up-distance:set-up distance]** is, and any conditions that must be met.

Each time you move a unit, you can move one or more of its models, one at a time, by moving it in a straight line and/or rotating it, as many times as you want to.

Each time you move a model, unless otherwise stated:
▪ It can be moved through friendly models.
▪ It can be moved through any space its base can fit through.
▪ Its base cannot be moved through enemy models.
▪ Its base cannot cross the edge of the battlefield.
▪ All stated '**[gloss:while-moving:While Moving]**' conditions must be met.

### Moving a Model in a Straight Line
Each time you move a model in a straight line, move it horizontally across the battlefield. Measure from the same point on its base at the start and end of that move, and add that distance to any other distance it has moved since its unit began that move. The distance moved cannot be greater than the **maximum distance** of that **[gloss:move-type:move type]**.

### Rotating a Model
Each time you rotate a model, turn it any amount around the centre of its base, while keeping it upright. Note that rotating a model does not count towards the distance it has moved. Models without a base are rotated around their central axis (see FRAME, 17.02).

### Ending a Move
After you have finished setting up all of the models in a unit and/or moving all of the models in a unit that you want to move, check that all of the following apply:
▪ If that unit is on the battlefield, it is in **coherency** (03.03).
▪ No models in that unit are on another model or partway through a surface of a **[gloss:terrain-feature:terrain feature]** (e.g. a wall or ceiling).
▪ All stated '**[gloss:after-moving:After Moving]**' conditions are met.

If one or more of the above conditions are not met, that unit cannot make that move and its models are returned to their positions at the start of that move. Otherwise, after resolving any additional rules stated in the [gloss:after-moving:'After Moving'] section of that **move type**, that move ends.`,
          seeAlso: ['Monsters and Vehicles 17.00', 'Moving Vertically 13.06', 'Strategic Reserves 20.00', 'Terrain 13.00', 'Transports 18.00'],
          illustration: {
            src: '/images/moving/moving-straight-line.jpg',
            alt: 'Moving in a straight line',
            seeAlso: {
              title: 'Move Types',
              refs: [
                'Advance Move 09.06',
                'Charge Move 11.04',
                'Consolidation Move 12.08',
                'Disembark Move 18.04',
                'Emergency Disembark Move 18.05',
                'Fall-back Move 09.07',
                'Ingress Move 20.04',
                'Normal Move 09.05',
                'Pile-in Move 12.03',
                'Scout Move 24.32',
                'Surge Move 21.02',
              ],
            },
          },
          image: { src: '/images/moving/rotating.jpg', alt: 'Rotating a model' },
          children: [
            {
              id: 'section-03-01-01',
              sectionNum: '03.01.01',
              title: 'Different Move Characteristics',
              fromApp: true,
              body: `When making a **move type** whose **maximum distance** uses the unit's **[gloss:move-characteristic:M]** characteristic, if different models in the moving unit have different **[gloss:move-characteristic:M]** characteristics, the **maximum distance** for that move will be different for those models.`,
              example: `If a unit makes a **normal move** and all models in that unit have an **[gloss:move-characteristic:M]** characteristic of 6" except for one model with an **[gloss:move-characteristic:M]** characteristic of 9", that model's **maximum distance** for that move is 9", while the other models' **maximum distance** is 6". While that unit is making that move, all other restrictions must be met.`,
            },
            {
              id: 'section-03-01-02',
              sectionNum: '03.01.02',
              title: 'Moving Over Or Through Models',
              fromApp: true,
              body: `Some models have a rule that enables them to 'move over models', 'move through models' or 'move over models as if they were not there' when making a move. When moving a model with such a rule, it can make its move through enemy models, but must follow all other restrictions of the move they are making.`,
            },
            {
              id: 'section-03-01-03',
              sectionNum: '03.01.03',
              title: 'Random Movement',
              fromApp: true,
              body: `See Random Characteristics (02.02.03)

Both models shown here can move a **maximum distance** of 6". They both move 3" in a straight line, then 3" in another straight line, for a total movement of 6".`,
            },
            {
              id: 'section-03-01-04',
              sectionNum: '03.01.04',
              title: 'When Moving Up To',
              fromApp: true,
              body: `Some rules allow a unit to make a move of up to X". That stated distance is the **maximum distance** for that move.`,
            },
          ],
        },
        {
          id: 'section-03-02',
          sectionNum: '03.02',
          title: 'Set Up',
          body: `Before your units can move and make attacks, they will first need to be set up on the battlefield. This most commonly happens when deploying your army for battle, but can happen for other reasons as well.

Whenever a rule instructs you to set up a unit, place its models on the battlefield so that:
▪ That unit is in **[gloss:coherency:coherency]** (see below).
▪ That unit is **[gloss:unengaged:unengaged]** (see below).
▪ All other requirements and restrictions are met.

If you cannot set up all of the models in a unit, remove that unit from the battlefield and return it to its original position (e.g. in **strategic reserves** or embarked within a [gloss:transport:TRANSPORT]).`,
          note: 'If You Cannot Set Up a Unit: While doing so as the result of a **move type**, if you have to return a unit\'s models to their previous positions because it is not possible to set them all up, that unit has not been selected to make that move. This means it can be selected to make a move later, so could either attempt another set up or remain stationary.',
          children: [
            {
              id: 'section-03-02-01',
              sectionNum: '03.02.01',
              title: 'If You Cannot Set Up a Unit',
              fromApp: true,
              body: `While having to set up a unit as the result of a **move type**, if you have to return a unit's models to their previous positions because it is not possible to set them all up, that unit has not been **selected to move**. This means it can be **selected to move** later, so could either attempt another set up or **[gloss:remain-stationary:remain stationary]** (09.04).`,
            },
            {
              id: 'section-03-02-02',
              sectionNum: '03.02.02',
              title: 'Setting Up Large Models',
              fromApp: true,
              body: `If a model cannot meet all of its set up restrictions because it is too large, consult the relevant section below:

**[gloss:during-deployment:During Deployment]:** If a model is so large that its base cannot physically be set up wholly within your deployment zone, it must be set up so that it is touching your battlefield edge. During a turn in which such a large model is set up on the battlefield, that model's unit cannot do any of the following:
▪ Make a **normal/advance/fall-back/charge move**.
▪ Make any attacks with ranged weapons.
Some large models, typically [gloss:aircraft:AIRCRAFT], have wings and other parts that extend significantly beyond their base. Such models can overhang a deployment zone if it is not possible to set them up otherwise, but when setting them up, their base must still be wholly within that deployment zone.

**[gloss:strategic-reserves:From Strategic Reserves]:** If a model is so large that its base cannot physically be set up wholly within the distance required of the battlefield edge, it must be set up so that it is touching a battlefield edge. During a turn in which such a large model is set up on the battlefield, that model's unit cannot do any of the following:
▪ **normal/advance/fall-back/charge move**.
▪ Make any attacks with ranged weapons.
Some large models, typically [gloss:aircraft:AIRCRAFT], have wings and other parts that extend significantly beyond their base. Such models can overhang a battlefield edge if it is not possible to set them up otherwise, but when setting them up, they must still be more than 8" away from all enemy units.

**[gloss:disembark:Disembarking from a Transport]:** When a unit disembarks from a [gloss:transport:TRANSPORT], it must be set up wholly within 3" of that model. If a disembarking model is so large that it is not possible to set it up wholly within 3" (typically because it is itself larger than 3" in all directions), set that model up with its base within 1" of that [gloss:transport:TRANSPORT]'s base (or hull), and not **engaged** with any enemy units.`,
            },
            {
              id: 'section-03-02-03',
              sectionNum: '03.02.03',
              title: 'Redeployments',
              fromApp: true,
              body: `When a player uses a rule that lets them redeploy their unit, they remove that unit from the battlefield, then deploy it again using all the normal rules (e.g. if all the models in the redeploying unit have the [gloss:infiltrators:Infiltrators] ability, that unit can be set up using that ability).`,
            },
          ],
        },
        {
          id: 'section-03-03',
          sectionNum: '03.03',
          title: 'Coherency',
          body: `A unit that contains more than one model must be set up and end any kind of move in **coherency**. A unit is in **coherency** while both of the following apply to every model in that unit:
▪ Within 2" horizontally and 5" vertically of at least one other model in that unit.
▪ Within 9" horizontally and 5" vertically of every other model in that unit.

### Regaining Coherency
In the **[gloss:end-of-turn-step:End of Turn step]** of each player's turn, if one or more units on the battlefield are not in **coherency**, those units' controlling players must remove models from them, one at a time, until they are in **coherency** again. Models removed in this way are **[gloss:destroyed:destroyed]**, but they do not trigger rules that apply when a model is **[gloss:destroyed:destroyed]**.`,
          image: { src: '/images/coherency/coherency.jpg', alt: 'Coherency' },
          children: [
            {
              id: 'section-03-03-01',
              sectionNum: '03.03.01',
              title: 'What Is Coherency',
              fromApp: true,
              body: `**Coherency** prevents models in the same unit from becoming too separated from each other while on the battlefield, ensuring they are set up and end every kind of move as a single group.`,
            },
          ],
        },
        {
          id: 'section-03-04',
          sectionNum: '03.04',
          title: 'Engagement',
          body: `A model's **engagement range** is the area of the battlefield within 2" horizontally and 5" vertically of it.
▪ While a friendly model is within **engagement range** of one or more enemy models, those models – and the units they belong to – are **engaged** with each other.
▪ While a unit contains no **engaged** models, that unit is **unengaged**.`,
          image: { src: '/images/visibility/engagement.jpg', alt: 'Engagement' },
          children: [
            {
              id: 'section-03-04-01',
              sectionNum: '03.04.01',
              title: 'What Is Engagement',
              fromApp: true,
              body: `While opposing models are within each other's **[gloss:engagement-range:engagement range]**, they are able to fight in vicious melee, so unless they are seeking to make melee attacks, models should keep out of their foes' reach.`,
            },
          ],
        },
      ],
    },
    {
      id: '04',
      num: '04',
      title: 'Making Attacks',
      page: 16,
      description: 'During the battle, your units will shoot at and fight the enemy, making attacks with their weapons each time they do so. This section explains how to make attacks with your models.',
      subsections: [
        {
          id: 'section-04-intro',
          sectionNum: '',
          title: 'Attack Steps',
          body: `Each time a unit shoots or fights, the active player follows these steps:
▪ 1. Select Weapons
▪ 2. Select Targets
▪ 3. Resolve Attacks`,
        },
        {
          id: 'section-04-01',
          sectionNum: '04.01',
          title: 'Select Weapons',
          body: `For each model in the attacking unit, select which weapons that model will make attacks with. Models make **[gloss:ranged-attacks:ranged attacks]** with **[gloss:ranged-weapons:ranged weapons]**, and make **[gloss:melee-attacks:melee attacks]** with **[gloss:melee-weapons:melee weapons]**.

### While Shooting
You can select one or more ranged weapons that model has.

### While Fighting
You must select one melee weapon that model has.`,
          seeAlso: ['[CLOSE-QUARTERS] 24.07', '[EXTRA ATTACKS] 24.11'],
          children: [
            {
              id: 'section-04-01-01',
              sectionNum: '04.01.01',
              title: 'Models Without Ranged/Melee Weapons',
              fromApp: true,
              body: `A model that does not have any ranged weapons cannot make ranged attacks, and a model that does not have any melee weapons cannot make melee attacks.`,
            },
            {
              id: 'section-04-01-02',
              sectionNum: '04.01.02',
              title: 'Sidearms',
              fromApp: true,
              body: `Some models are equipped with [CLOSE-QUARTERS] weapons in addition to other firearms. Such models can be an exception to the rules in this section, as you may not be able to select all of their weapons to make attacks with.`,
            },
            {
              id: 'section-04-01-03',
              sectionNum: '04.01.03',
              title: 'Multiple Weapon Profiles',
              fromApp: true,
              body: `In the **[gloss:select-weapons:select weapons]** step (04.01), if a selected weapon has more than one profile, then the controlling player must also select one of those profiles. The selected profile is then used in the [gloss:resolve-attacks:Resolve Attacks] step (04.03).

Some of these profiles are known as **Hunter** profiles. **Hunter** profiles can only target units with the specified keywords.

Note that if a unit is equipped with more than one such weapon, a different profile can be selected for each model within that unit.`,
            },
            {
              id: 'section-04-01-04',
              sectionNum: '04.01.04',
              title: 'Attack Characteristics and Abilities',
              fromApp: true,
              body: `When making an attack, that attack is considered to have the same characteristics and abilities as the weapon making that attack.

If any modifiers or abilities apply to an attack, those changes apply to the weapon making that attack until that unit's **[gloss:attack-sequence:attack sequence]** and all effects of those abilities (e.g. [HAZARDOUS]) have been resolved.

Rules that apply to a weapon that modify rolls apply to the attacks made with that weapon.`,
            },
            {
              id: 'section-04-01-05',
              sectionNum: '04.01.05',
              title: 'Selected to Attack',
              fromApp: true,
              body: `Some rules use the term **[gloss:selected-to-attack:selected to attack]**. If a unit is **selected to fight**, **selected to shoot** or chosen to make attacks, that unit is **selected to attack**.`,
            },
          ],
        },
        {
          id: 'section-04-02',
          sectionNum: '04.02',
          title: 'Select Targets',
          body: `For each weapon selected:

### While Shooting
Select one enemy unit to be the target of that weapon. Unless otherwise stated, each target must be:
▪ **Visible** to the model that has that weapon (06.01).
▪ Within range of that weapon.
▪ **[gloss:unengaged:Unengaged]**.

### While Fighting
Select one or more enemy units to be the targets of that weapon:
▪ Each target must be **engaged** with the model that has that weapon.
▪ You cannot select more targets than that weapon's A characteristic.`,
          seeAlso: ['Shooting at Engaged Monsters and Vehicles 17.03'],
          children: [
            {
              id: 'section-04-02-01',
              sectionNum: '04.02.01',
              title: 'Selecting Targets',
              fromApp: true,
              body: `When shooting or fighting, you can select different targets for each weapon. If you cannot select a target for a weapon, or if you choose not to select a target for a ranged weapon, the model with that weapon will not make attacks with it.`,
            },
            {
              id: 'section-04-02-02',
              sectionNum: '04.02.02',
              title: 'Against An Attack',
              fromApp: true,
              body: `Rules that are triggered 'against' certain attacks are triggered after the attacking unit has completed the [gloss:select-targets:Select Targets] step (04.02), provided all other qualifiers are met (e.g. concerning the characteristics of the attacking unit or its weapons).

Rules that are triggered when an attack is 'allocated' to a unit are triggered in step 1 of the [gloss:inflict-damage:Inflict Damage] step (05.04).`,
            },
            {
              id: 'section-04-02-03',
              sectionNum: '04.02.03',
              title: 'Single Target',
              fromApp: true,
              body: `When a model or unit attacks with one or more weapons, if all of the attacks made with those weapons target the same unit, that model or unit is said to be shooting at, fighting or targeting a single target.

### FAQs
**Q:** When selecting a target unit can the enemy model that is **visible** to my model and the enemy model that is in range of my model's weapon be different enemy models in the same unit?

**A:** Yes

**Q:** Can a model be within range of a weapon if it is not **visible**

**A:** Yes`,
            },
          ],
        },
        {
          id: 'section-04-03',
          sectionNum: '04.03',
          title: 'Resolve Attacks',
          body: `Resolve attacks using the following sequence:

1. **Select Enemy Unit:** Select one of the enemy units targeted by one or more weapons.

2. **Gather Attack Dice:** Select one weapon targeting that unit that has not yet been used to make attacks against it, and gather a number of D6 equal to that weapon's **[gloss:attack-dice:A]** characteristic. These are **attack dice** – each one represents one attack being made by an attacking model with that weapon.

If one or more other weapons targeting that unit make [def:identical-attacks:identical attacks] to the selected weapon and those weapons have not yet been used to make attacks against that target, they do so now and you gather those weapons’ **attack dice** as well (e.g. for three weapons making [def:identical-attacks:identical attacks], each with an **[gloss:attack-dice:A]** characteristic of 2, gather a total of six D6)

3. **Resolve Attack Dice:** Resolve the attack sequence (05) for all of the **attack dice** you just gathered.

4. **Other Attacks:** Follow the first of the instructions below that applies:
→ If there are any weapons targeting the same unit that have not yet been used to make attacks, return to the **Gather Attack Dice** step.
→ Otherwise, if there are any weapons with unresolved attacks targeting a different unit, return to the **Select Enemy Unit** step.
→ Otherwise, if all weapons have been used to make all of their attacks, this sequence ends.`,
          definitions: [
            {
              id: 'identical-attacks',
              term: 'Identical Attacks',
              text: 'Identical attacks are those that have the same BS/WS, S, AP and D characteristics, and which are affected by the same applicable abilities and rules.',
            },
            {
              id: 'splitting-melee',
              term: 'Splitting Melee Attacks',
              text: 'While selecting targets, if you select more than one unit as the target of a melee weapon, you must split that weapon\'s attacks between those target units. To do so, declare how many of that weapon\'s attacks will be made against each unit (you must declare at least one attack per unit targeted).\n\nIn the **Gather Attack Dice** step, for each weapon that is splitting its attacks, only gather a number of **attack dice** for that weapon equal to the number of attacks you declared would be made against that target with that weapon.',
            },
          ],
          children: [
            {
              id: 'section-04-03-01',
              sectionNum: '04.03.01',
              title: 'Identical Attacks',
              fromApp: true,
              body: `Identical attacks are those that have the same **[gloss:bs-ws:BS/WS]**, **[gloss:strength:S]**, **[gloss:armour-penetration:AP]** and **[gloss:damage-roll:D]** characteristics, and which are affected by the same applicable abilities and rules.`,
            },
            {
              id: 'section-04-03-02',
              sectionNum: '04.03.02',
              title: 'Splitting Melee Attacks',
              fromApp: true,
              body: `While selecting targets, if you select more than one unit as the target of a melee weapon, you must split that weapon's attacks between those target units. To do so, declare how many of that weapon's attacks will be made against each unit (you must declare at least one attack per unit targeted).

In the Gather Attack Dice step, for each weapon that is splitting its attacks, only gather a number of **attack dice** for that weapon equal to the number of attacks you declared would be made against that target with that weapon.`,
            },
            {
              id: 'section-04-03-03',
              sectionNum: '04.03.03',
              title: 'Target No Longer Eligible Or Viable',
              fromApp: true,
              body: `If a unit that was an eligible target for a rule or attack when it was selected stops being an eligible target (for example, because a rule enables it to make an out-of-phase move that takes it out of range), the controlling player can select new targets.`,
            },
            {
              id: 'section-04-03-04',
              sectionNum: '04.03.04',
              title: 'Shot',
              fromApp: true,
              body: `When all of the attacks made with a ranged weapon have been resolved, that weapon has shot.

When all of a model's ranged weapons have shot, that model has shot.

When all models in a unit that are making ranged attacks have resolved all of those attacks, that unit has shot.

If a unit was selected to shoot and none of the models in it make any attacks, it has not shot.`,
            },
            {
              id: 'section-04-03-05',
              sectionNum: '04.03.05',
              title: 'Fought',
              fromApp: true,
              body: `When all of the attacks made with a melee weapon have been resolved, that weapon has fought.

When all of a model's selected melee weapons have fought, that model has fought.

When all models in a unit that are making melee attacks have resolved all of those attacks, that unit has fought.

If a unit was selected to fight and none of the models in it make any attacks, it has not fought.`,
            },
            {
              id: 'section-04-03-06',
              sectionNum: '04.03.06',
              title: 'Finished Making Its Attacks',
              fromApp: true,
              body: `When all of an attacking unit's attacks have been resolved, it has finished making its attacks, and that unit has attacked.`,
            },
          ],
        },
      ],
    },
    {
      id: '05',
      num: '05',
      title: 'Attack Sequence',
      page: 18,
      description: 'Whenever models make attacks, you will follow the sequence detailed in this section to find out if they inflict damage.',
      subsections: [
        {
          id: 'section-05-intro',
          sectionNum: '',
          title: 'Sequence Overview',
          body: `Each time the active player is instructed to resolve the attack sequence, they follow the steps below. In each step, if there is more than one dice to roll, make all of those rolls simultaneously.
▪ 1. **Hit Rolls**
▪ 2. **Wound Rolls**
▪ 3. **[gloss:save-roll:Save Rolls]**
▪ 4. Inflict Damage`,
          note: '**Critical Hits** and **Critical Wounds**: **Critical hits** are still hits, and **critical wounds** are still wounds. In addition, other rules can be triggered by a **critical hit** or a **critical wound**, such as [LETHAL HITS] and [DEVASTATING WOUNDS].',
        },
        {
          id: 'section-05-01',
          sectionNum: '05.01',
          title: 'Hit Rolls',
          body: `Make one **hit roll** for each **attack dice** by rolling one D6. For each result, check if it fails or is a hit by matching the first condition below that applies:
◆ Unmodified 1 → FAILS
◆ Unmodified 6 → **CRITICAL HIT**
◆ Equal to or greater than that attack's [gloss:bs-ws:BS/WS] characteristic → HIT
◆ Any other result → FAILS`,
          children: [
            {
              id: 'section-05-01-01',
              sectionNum: '05.01.01',
              title: 'Critical Hits and Critical Wounds',
              fromApp: true,
              body: `**Critical hits** are still hits, and **critical wounds** are still wounds. In addition, other rules can be triggered by a **critical hit** or a **critical wound**, such as [LETHAL HITS] and [DEVASTATING WOUNDS] (24).`,
            },
          ],
        },
        {
          id: 'section-05-02',
          sectionNum: '05.02',
          title: 'Wound Rolls',
          body: `Make one **wound roll** for each hit by rolling one D6. For each result, check if it fails or is a wound by matching the first condition below that applies:
◆ Unmodified 1 → FAILS
◆ Unmodified 6 → **CRITICAL WOUND**
◆ Equal to or greater than the required result (see table below) → WOUND
◆ Any other result → FAILS`,
          children: [
            {
              id: 'section-05-02-01',
              sectionNum: '05.02.01',
              title: 'Multiple Toughness Characteristics',
              fromApp: true,
              body: `When resolving attacks that target a unit in which the models have two or more different **[gloss:toughness:T]** characteristics, follow the first instruction that applies from below:
▪ If the target unit is an **[gloss:attached-unit:attached unit]**, use the highest **[gloss:toughness:T]** characteristic amongst **[gloss:bodyguard:bodyguard]** models in that unit that are on the battlefield.
▪ Use the highest **[gloss:toughness:T]** characteristic amongst models in that unit that are on the battlefield.`,
            },
          ],
        },
        {
          id: 'section-05-03',
          sectionNum: '05.03',
          title: 'Save Rolls',
          body: `The **[gloss:opposing-player:opposing player]** resolves the following sequence:

1. Create Groups: Divide all models in the target unit into the following groups, as many times as required:
▪ One group for each **[gloss:character:CHARACTER]** model.
▪ One group for all other models with the same W, Sv and InSv characteristics.

2. Allocation Order: Declare the order in which those groups will have attacks allocated to them, applying all of the following:
▪ If a non-**[gloss:character:CHARACTER]** group contains a model that has lost one or more wounds, that group must be first in the allocation order.
▪ No **[gloss:character:CHARACTER]** group can be earlier in the allocation order than a non-**[gloss:character:CHARACTER]** group.
▪ **[gloss:character:CHARACTER]** groups containing a model that has lost one or more wounds must be earlier in the allocation order than **[gloss:character:CHARACTER]** groups containing no wounded models.

3. Make **Save Rolls**: The opposing player makes one **save roll** for each attack that wounded the target by rolling one D6.`,
          seeAlso: ['Modifying Damage', 'Modifying Dice Rolls', 'Random Characteristics'],
          children: [
            {
              id: 'section-05-03-01',
              sectionNum: '05.03.01',
              title: 'Saving Throw',
              fromApp: true,
              body: `The term 'saving throw' is the same as **save roll**.`,
            },
          ],
        },
        {
          id: 'section-05-04',
          sectionNum: '05.04',
          title: 'Inflict Damage',
          body: `The opposing player resolves the following sequence for each **save roll**, working from lowest result(s) to highest result(s), until all attacks are resolved or all models in the target unit are **destroyed** – in the latter case, any excess attacks are lost.

1. Select Model: Select one model in the current **[gloss:allocation-group:allocation group]**; this must be a model that has lost one or more wounds if possible.
2. Check **Save Roll**: For each result, check if that attack inflicts damage or fails by matching the first condition below that applies:
◆ Unmodified 1 → INFLICTS DAMAGE
◆ Invulnerable Save: The models in the current allocation group have an InSv characteristic, and the result is equal to or greater than that characteristic → FAILS (no damage)
◆ Save and AP: After modifying the result by the attacking weapon's AP characteristic, it is equal to or greater than the Sv characteristic of models in the current allocation group → FAILS (no damage)
◆ Any other result → INFLICTS DAMAGE

3. Resolve Damage: If that attack inflicts damage, the selected model loses a number of wounds equal to that attack's D characteristic. If this reduces that model's remaining wounds to 0 or fewer, it is **destroyed**.

Example: An AP characteristic of -1 would modify a **save roll** of 3 to a 2. For models with a Sv characteristic of 2+ or better, that attack would fail.`,
          children: [
            {
              id: 'section-05-04-01',
              sectionNum: '05.04.01',
              title: 'Current Allocation Group',
              fromApp: true,
              body: `The first group in the allocation order begins as the current group. Once all models in an allocation group are **destroyed**, the next group in the allocation order becomes the current one.`,
            },
            {
              id: 'section-05-04-02',
              sectionNum: '05.04.02',
              title: 'Modifying Damage',
              fromApp: true,
              body: `See Modifiers (02.02.01).`,
            },
            {
              id: 'section-05-04-03',
              sectionNum: '05.04.03',
              title: 'Suffers Damage',
              fromApp: true,
              body: `If an attack reaches the Resolve Damage step of the attack sequence (05.04), the model that attack was allocated to has suffered damage, even if that model subsequently uses a rule to ignore the wounds inflicted or it uses a rule that means those wounds are not lost.`,
            },
            {
              id: 'section-05-04-04',
              sectionNum: '05.04.04',
              title: 'Destroyed',
              fromApp: true,
              body: `Throughout a battle, models will suffer damage, lose wounds and be **destroyed**. When every model in a unit has been **destroyed**, that unit is **destroyed**.

When a model is **destroyed**, first resolve any rules that are triggered when it is **destroyed**, then it is removed from the battlefield. If any such rules apply, and if the model was **destroyed** as the result of an attack, unless otherwise stated, those rules are only resolved and that model is only removed after the attacking unit's attacks have been resolved. Unless otherwise stated, **destroyed** models and units cannot use abilities or be selected or targeted by rules.

Some rules only trigger if an enemy model or unit was **destroyed** by you, or by a model or unit from your army. This means that the enemy model or unit was **destroyed** by an attack made by a model from your army, or by a player rule you have. Enemy models or units that are **destroyed** by any other means are not **destroyed** by you, or by a model or unit from your army.`,
            },
            {
              id: 'section-05-04-05',
              sectionNum: '05.04.05',
              title: 'Fight On Death',
              fromApp: true,
              body: `Some rules enable models to attack after they have been **destroyed**. When a model under such an effect is **destroyed**, do not remove it from play.

Those models will stay on the battlefield until their unit is **selected to attack** and has attacked, or until the end of the phase (whichever comes first). Any rules triggered by those models being **destroyed** are resolved, and then those **destroyed** models are removed.

If a rule instructs a **destroyed** model to fight immediately after the attacking unit, instead that model is not removed from the battlefield until that model's unit has fought, or until the end of the phase (whichever comes first). This allows the models in the unit to fight all at once, and **stratagems** that target that unit will also affect that **destroyed** model.`,
            },
            {
              id: 'section-05-04-06',
              sectionNum: '05.04.06',
              title: 'Measuring To A Destroyed Model Or Unit',
              fromApp: true,
              body: `When a player has to measure the distance to a **destroyed** model, that player can measure to any point occupied by that model's base (or any part of that model if it does not have a base or is a **[gloss:vehicle:VEHICLE]**, excluding **[gloss:walker:WALKER]** models that have a base) before it was **destroyed**.

When a player has to measure the distance to a **destroyed** unit, they measure to the last model **destroyed** in that unit.`,
            },
          ],
        },
        {
          id: 'section-05-ex',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — MAKING ATTACKS',
          sideImage: { src: '/images/attack/making-attacks.jpg', alt: 'Attack Sequence Example diagram' },
          body: `### 1. SELECT WEAPONS
The {red:RED} unit is attacking. The following weapons are selected to make attacks with:
▪ 2 boltguns (B)
▪ 2 bolt pistols (BP)
▪ 1 heavy bolter (HB)

### 2. SELECT TARGETS
The {blue:BLUE} unit is selected as the target. The unit is **[gloss:visible:visible]** to all models in the attacking unit. All of the selected weapons are in range, with the exception of one bolt pistol. As a result, that weapon will not make any attacks.

### 3. RESOLVE ATTACKS
There is only one enemy unit being targeted, so the controlling player now gathers **[gloss:attack-dice:attack dice]**:
▪ Five **attack dice** are gathered for the boltguns and bolt pistol, which have **[gloss:attack-dice:A]** characteristics of 2 and 1 respectively and all make [def:identical-attacks:identical attacks].
▪ Three **attack dice** are gathered for the heavy bolter, which has an **[gloss:attack-dice:A]** characteristic of 3 but does not make **identical attacks**.`,
        },
        {
          id: 'section-05-ex2',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — RESOLVING ATTACK DICE',
          sideImage: { src: '/images/attack/resolve-attack-dice.jpg', alt: 'Resolve attack dice example' },
          body: `### 1. **HIT ROLLS**
The controlling player chooses to make the five **hit rolls** for the boltguns and bolt pistol first. The **[gloss:ballistic-skill:BS]** characteristic of the weapons is 3+. Four of the attacks hit the target.

### 2. WOUND ROLLS
The controlling player makes four **wound rolls**. The weapons have an **[gloss:strength:S]** characteristic of 4 and the target unit has a **[gloss:toughness:T]** characteristic of 3, so rolls of 3+ are required to wound. Three of the attacks wound the target.

### 3. SAVE ROLLS
The target unit's controlling player makes three **save rolls**.

### 4. INFLICT DAMAGE
▪ The lowest result is less than both the **[gloss:invulnerable-save:InSv]** and **[gloss:save-roll:Sv]** characteristics of the target, so that attack inflicts damage. This reduces the model to which that attack was allocated to 0 wounds, which **destroys** it.
▪ The next lowest result is less than the target's **[gloss:invulnerable-save:InSv]** characteristic, but greater than its **[gloss:save-roll:Sv]** characteristic of 3+; that attack fails.
▪ The other result is greater than the target's **[gloss:invulnerable-save:InSv]** characteristic of 5+; that attack also fails.`,
        },
        {
          id: 'section-05-ex3',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — RESOLVING OTHER ATTACKS',
          sideImage: { src: '/images/attack/resolve-other-attacks.jpg', alt: 'Resolving other attacks example' },
          body: `### 1. **HIT ROLLS**
The controlling player then makes three **hit rolls** for the heavy bolter. The **[gloss:ballistic-skill:BS]** characteristic of the weapon is 4+. Two of the attacks hit the target.

### 2. WOUND ROLLS
The controlling player makes two **wound rolls**. The weapon has an **[gloss:strength:S]** characteristic of 5, so rolls of 3+ are required to wound. Both attacks wound the target.

### 3. SAVE ROLLS
The target unit's controlling player makes two **save rolls**.

### 4. INFLICT DAMAGE
▪ The lowest result, __when modified by the attacking weapon's **[gloss:armour-penetration:AP]** characteristic of -1__, is less than the target's **[gloss:save-roll:Sv]** characteristic of 3+, so that attack inflicts damage. This reduces the model to which that attack was allocated to 0 wounds, which **destroys** it.
▪ The other result is equal to the target's **[gloss:invulnerable-save:InSv]** characteristic of 5+; that attack fails.`,
        },
        {
          id: 'section-05-ex4',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — ATTACKING ATTACHED UNITS',
          sideImage: { src: '/images/attached/attacking-attached-units.jpg', alt: 'Attacking attached units example', width: '60%' },
          body: `### 1. SELECT WEAPONS
The {red:RED} unit is attacking. The following weapons are selected to make attacks with:
▪ 7 boltguns (B)
▪ 1 plasma pistol (PP)
▪ 2 heavy bolters (HB)

### 2. SELECT TARGETS
The {blue:BLUE} unit is selected as the target. It is an attached unit (19) formed from a Seraphim unit and Saint Celestine (with her two Geminae Superia). The unit is **visible** to all models in the attacking unit, and all of the selected weapons are in range.

### 3. RESOLVE ATTACKS
There is only one enemy unit being targeted, so the controlling player now gathers **attack dice**. They decide to resolve the heavy bolter attacks first, which each have an **[gloss:attack-dice:A]** characteristic of 3, so six **attack dice** are gathered.
The **attack dice** for the remaining weapons will be gathered once the heavy bolter attacks are resolved (see opposite), as follows:
▪ 14 **attack dice** for the boltguns, which each have an **[gloss:attack-dice:A]** characteristic of 2.
▪ One **attack dice** for the plasma pistol, which has an **[gloss:attack-dice:A]** characteristic of 1.`,
        },
        {
          id: 'section-05-ex5',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — ALLOCATION GROUPS',
          sideImage: { src: '/images/attack/allocation-groups.jpg', alt: 'Allocation groups example', width: '60%' },
          body: `### 1. CREATE GROUPS AND DECLARE ORDER
The target unit's controlling player divides it into groups: one containing Saint Celestine, one containing the Geminae Superia, and one containing the Seraphim. They then declare the allocation order, choosing the Geminae Superia first (1), hoping their better **[gloss:save-roll:Sv]** and **[gloss:invulnerable-save:InSv]** characteristics will weather the attacks. The Seraphim must be chosen second (2), as Saint Celestine is a **[gloss:character:CHARACTER]** model so must be last in the order (3).

### 2. RESOLVE ATTACK DICE
The heavy bolters' attacks wound the target five times, so the target unit's controlling player makes five **save rolls**.
The attacks are resolved one at a time, from lowest **save rolls** to highest:
▪ The two results of 1 are allocated first, to the current allocation group (the Geminae Superia). They both inflict damage, and both Geminae Superia are **destroyed**.
▪ The result of 3 is now allocated to the Seraphim, who have become the current allocation group. __When modified by the attacking weapon's **[gloss:armour-penetration:AP]** characteristic of -1__, this also inflicts damage, **destroying** one Seraphim model.
▪ The remaining attacks fail, so no further damage is inflicted.

### 3. SELECT NEXT GROUP OF ATTACK DICE AND REPEAT`,
        },
      ],
      woundTable: {
        headers: ['Strength vs Toughness', 'Required Roll'],
        rows: [
          ['Strength is TWICE (or more than twice) the Toughness', '2+'],
          ['Strength is GREATER than the Toughness', '3+'],
          ['Strength is EQUAL to the Toughness', '4+'],
          ['Strength is LESS than the Toughness', '5+'],
          ['Strength is HALF (or less than half) the Toughness', '6+'],
        ],
      },
    },
    {
      id: '06',
      num: '06',
      title: 'Other Concepts',
      page: 24,
      description: 'This section contains some additional rules concepts that are most frequently used while making attacks.',
      subsections: [
        {
          id: 'section-06-01',
          sectionNum: '06.01',
          title: 'Visibility',
          body: `**[gloss:line-of-sight:Line of sight]** is used to determine visibility between models. For an observing model to have **line of sight**, it must be possible to draw an imaginary straight line, 1 mm wide, from any part of that model to any part of the model being observed. This line is the **line of sight**. While doing so, other models in the observing model's unit and in the observed model's unit are ignored.

Other models and units can be either **visible** or **[gloss:fully-visible:fully visible]** to the observing model, as shown below.

[img:/images/visibility/model-visible.jpg|Model visibility — model partially visible]

[img:/images/visibility/model-fully-visible.jpg|Model visibility — model fully visible]

[img:/images/visibility/unit-visible.jpg|Unit visibility — unit visible to observer]

[img:/images/visibility/unit-fully-visible.jpg|Unit visibility — unit fully visible to observer]`,
          note: 'Terrain applies additional rules to visibility (13.07).',
          children: [
            {
              id: 'section-06-01-01',
              sectionNum: '06.01.01',
              title: 'Describing Visible Units',
              fromApp: true,
              body: `When a rule references a **visible** unit but does not state which units that unit must be **visible** to, it must be **visible** to the unit that is using that rule.`,
              example: `You target a friendly unit with a **stratagem** that says 'select one **visible** enemy unit'. That enemy unit must be **visible** to the friendly unit you targeted with the **stratagem**.`,
            },
          ],
        },
        {
          id: 'section-06-02',
          sectionNum: '06.02',
          title: 'Mortal Wounds',
          body: `Some attacks or rules inflict **[gloss:mortal-wound:mortal wounds]** on units. Each time a unit suffers one or more **mortal wounds**, its controlling player must resolve the following sequence for each of those **mortal wounds**, until either all of them have been inflicted or that unit is destroyed:

1. Select Model: Select one model in that unit by following the first instruction below that applies:
→ If a non-CHARACTER model in that unit has lost one or more wounds, you must select that model.
→ Otherwise, if that unit contains one or more non-CHARACTER models, you must select one of those models.
→ Otherwise, if one or more CHARACTER models in that unit have lost one or more wounds, you must select one of those models.
→ Otherwise, you must select one CHARACTER model in that unit.

2. Resolve Damage: The selected model loses 1 wound. If this reduces that model's remaining wounds to 0, it is **destroyed**.

### Mortal Wounds and Normal Damage
When resolving **attack dice**, if those attacks inflict a mixture of both **mortal wounds** and normal damage, resolve all of the normal damage first, then resolve all of the **mortal wounds**.`,
          children: [
            {
              id: 'section-06-02-01',
              sectionNum: '06.02.01',
              title: 'Normal Damage',
              fromApp: true,
              body: `Normal Damage is damage that was inflicted on a model as a result of a weapon's **[gloss:damage-roll:D]** characteristic, rather than by other means such as **mortal wounds**. **Mortal wounds** dealt in addition to normal damage from an attack are part of that same attack.

### FAQs
**Q:** I have a rule that triggers when a **mortal wound** is allocated to a model, when does this happen?

**A:** When you select a model in the **Select Model step** of **[gloss:mortal-wound:Mortal Wounds]** (06.02).`,
            },
          ],
        },
        {
          id: 'section-06-03',
          sectionNum: '06.03',
          title: 'Hazard Rolls',
          body: `To make a **[gloss:hazard-roll:hazard roll]** for a unit, roll one D6: on a 1-2, that roll fails and that unit suffers 1 **mortal wound**, or 3 **mortal wounds** instead if each model in that unit is a MONSTER/VEHICLE model. If more than one **hazard roll** is required for a unit, make all of those rolls simultaneously.`,
          children: [
            {
              id: 'section-06-03-01',
              sectionNum: '06.03.01',
              title: 'Hazardous Test',
              fromApp: true,
              body: `The term 'Hazardous test' is the same as **[gloss:hazard-roll:hazard roll]**.

### FAQs
**Q:** If a rule says my unit must make a **hazard roll** does every model in the unit make a **hazard roll**?

**A:** No, the unit would make 1 single **hazard roll**.

**Q:** I failed **hazard rolls** from [HAZARDOUS] weapons, do those **mortal wounds** have to be allocated to the models with the [HAZARDOUS] weapons?

**A:** No, you allocate the **mortal wounds** to the unit as per **[gloss:mortal-wound:Mortal Wounds]** (06.02). (This represents Bob the guardsmen picking up his fallen squad mates plasma gun or that the twisting power of James the Chaos Sorcerer pulling his followers into the warp.)`,
            },
          ],
        },
      ],
    },
  ],

  ru: [
    {
      title: 'Основные понятия',
      description: 'Прежде чем вы узнаете, как перемещать своих воинов по полю боя и атаковать врага в смертоносных перестрелках и кровавых рукопашных схватках, этот раздел знакомит вас с некоторыми понятиями, лежащими в основе каждого сражения в Warhammer 40,000.',
      subsections: [
        {
          title: 'Армии',
          body: `Каждый игрок в игре Warhammer 40,000 командует армией, состоящей из юнитов моделей. Вы контролируете все модели в своей армии. Если правило ссылается на «[gloss:controlling-player:контролирующего игрока]», оно относится к игроку, который контролирует модели, на которые распространяется это правило.`,
          children: [
            {
              title: 'Вы',
              body: `Если правило ссылается на «[gloss:you:вас]», оно относится к вам как к человеку, контролирующему игроку.`,
            },
          ],
        },
        {
          title: 'Юниты и модели',
          body: `Юнит может содержать одну или несколько моделей. Эти модели перемещаются и сражаются вместе как единая группа. У большинства моделей есть [gloss:base:база], которая также является частью этой модели для всех целей правил.

Правила иногда влияют на «союзные» или «вражеские» модели или юниты, которые определяются следующим образом:
▪ Союзные юниты и модели — это те, что в вашей армии.
▪ Вражеские юниты и модели — это те, что в армии вашего оппонента.

Если правило влияет на юниты или модели, не уточняя, являются ли они союзными или вражескими, это правило влияет на любой юнит или модель, независимо от того, в чьей они армии. Когда эффект или способность применяется к юниту, она применяется к каждой модели в этом юните.`,
          children: [
            {
              title: 'Начальная численность и половинная численность (Starting Strength and Half-Strength)',
              body: `Количество моделей, которое юнит содержит в начале первого **[gloss:battle-round:раунда боя]**, является его **[gloss:starting-strength:начальной численностью]**. **Начальная численность** **[gloss:attached-unit:составного юнита]** — это количество моделей, которое этот юнит содержит в начале первого раунда боя.

Некоторые правила ссылаются на юниты, находящиеся **[gloss:below-starting-strength:ниже начальной численности]**, или на — или ниже — **[gloss:half-strength:половинной численности]** (at – or below – half-strength). Значение этих терминов варьируется в зависимости от **начальной численности** юнита, как показано ниже.

Юниты или модели, чья характеристика **[gloss:wounds:W]** или **начальная численность** не может быть равномерно разделена пополам, не могут находиться **на половинной численности** (но могут быть **ниже половинной численности**).`,
              table: {
                headers: ['Условие', 'Начальная численность 1 (отслеживает раны)', 'Начальная численность 2 или более'],
                rows: [
                  ['**Ниже начальной численности**', 'Оставшиеся раны модели **меньше** её характеристики **[gloss:wounds:W]**.', 'Количество оставшихся моделей в юните **меньше** его начальной численности.'],
                  ['**На половинной численности**', 'Оставшиеся раны модели составляют **половину** её характеристики **[gloss:wounds:W]**.', 'Количество оставшихся моделей в юните составляет **половину** его начальной численности.'],
                  ['**Ниже половинной численности**', 'Оставшиеся раны модели составляют **менее половины** её характеристики **[gloss:wounds:W]**.', 'Количество оставшихся моделей в юните составляет **менее половины** его начальной численности.'],
                ],
              },
              example: 'Капитан (1 модель) приписан к отряду Интерцессоров (5 моделей). Этот **составной юнит** имеет **[gloss:starting-strength:начальную численность]** 6. Если три Интерцессора **уничтожены**, юнит находится **на половинной численности**. Если четыре Интерцессора **уничтожены**, юнит находится **ниже половинной численности** (below half-strength). Если все Интерцессоры **уничтожены**, оставшийся Капитан находится **ниже половинной численности**, несмотря на то, что у него осталось полное количество [gloss:wounds:ран].',
            },
            {
              title: 'Сохраняющиеся эффекты правил',
              body: `Некоторые правила применяют эффект, который длится, пока не пройдёт определённая продолжительность (например, до начала вашего следующего хода). Такие эффекты называются сохраняющимися эффектами.

Если сохраняющийся эффект применяется к юниту, когда вы помещаете его в **[gloss:strategic-reserves:стратегический резерв]** или когда он садится в [gloss:transport:TRANSPORT], запишите этот эффект и его продолжительность; если этот юнит снова выставляется на поле боя, любые сохраняющиеся эффекты продолжают применяться к нему на всю их продолжительность.

Если у вас есть правило, которое указывает, когда оно срабатывает (например, «В фазе стрельбы»), но не указывает, как долго оно активно, оно активно только на протяжении указанного периода (например, до конца этой фазы стрельбы). После этого периода этот эффект больше не применим/не активен.

Если правило или эффект даётся юниту и не указывает, как долго оно активно, оно активно только в течение фазы, в которой было дано.`,
            },
            {
              title: 'Восстановление и добавление моделей в юнит',
              body: `Когда правило **возрождает**, воскрешает, возвращает или добавляет модели в юнит, указанное количество моделей добавляется в юнит.
▪ Если правило **возрождает**, воскрешает или возвращает модели в юнит, оно делает это через **[gloss:destroyed:уничтоженные]** модели из этого юнита.
▪ Это не может расширить юнит сверх его **[gloss:starting-strength:начальной численности]**.
▪ Если не указано иное, такие модели добавляются со всем [gloss:wargear:снаряжением] и [gloss:enhancement:усилениями], с которыми они начинали битву, и с полным запасом **[gloss:wounds:W]**.
Модели, возвращённые в юнит на поле боя, должны быть размещены следующим образом:

▪ Они должны быть размещены в **[gloss:coherency:боевом построении]** с моделями этого юнита, которые начали эту фазу на поле боя.
▪ Они могут быть размещены **[gloss:engaged:в ближнем бою]** с одним или несколькими вражескими юнитами, но только если эти вражеские юниты уже были **[gloss:engaged:в ближнем бою]** с юнитом, в который возвращается модель.
Если модель **[gloss:leader:лидера]** или **[gloss:support:поддержки]** в **составном юните** **[gloss:destroyed:уничтожена]** и впоследствии возрождена, она всё ещё является частью этого **составного юнита** и должна быть возвращена в него, если возможно.`,
            },
            {
              title: 'Не на поле боя',
              body: `Юнит, находящийся внутри **[gloss:transport:TRANSPORT]** или в **[gloss:strategic-reserves:стратегическом резерве]**, не находится на поле боя. К таким юнитам применяется следующее:
▪ Этот юнит **[gloss:not-visible:не виден]** никаким __другим__ юнитам (юниты **[gloss:visible:видят]** себя сами).
▪ Любой другой юнит **[gloss:not-visible:не виден]** этому юниту.
▪ Игроки не могут измерять расстояния до или от этого юнита (юниты находятся в пределах дальности своих собственных способностей).
Это означает, что юниты не на поле боя не могут быть выбраны или стать целью какой-либо атаки или правила, требующего, чтобы юнит был **[gloss:visible:виден]** или находился в пределах определённого расстояния (кроме их собственных способностей).

Такие юниты всё ещё могут использовать свои другие правила и остаются юнитами в армии контролирующего игрока, поэтому на них могут влиять правила, требующие от игрока выбрать юнит из армии, а также правила, влияющие на все юниты в армии.

Контролирующий игрок должен выполнять **[gloss:battle-shock-test:проверки боевого шока]** для юнитов, не находящихся на поле боя, в свою Фазу командования, если они **[gloss:battle-shocked:подвержены боевому шоку]** или находятся на — или ниже — **[gloss:half-strength:половинной численности]**.`,
            },
            {
              title: 'Другая модель / юнит',
              body: `Когда правило ссылается на модели или юниты, «[gloss:other:отличные]» от того, у которого есть это правило (или от уже упомянутого этим правилом), это означает модель или юнит, отличный от исходного.

Разные экземпляры одного и того же [gloss:datasheet:листа данных] всё ещё считаются «[gloss:other:другими]» юнитами.`,
            },
            {
              title: 'Разделение юнитов',
              body: `Некоторые правила позволяют вам разделять юниты на меньшие юниты (например, способность Transport у Drukhari Venoms). При использовании таких правил:
▪ Одни и те же модели могут быть разделены таким образом только один раз (например, эти меньшие юниты сами не могут быть разделены далее).
▪ Если правило используется для разделения юнита на несколько юнитов до битвы, **[gloss:starting-strength:начальная численность]** каждого отдельного юнита изменяется так, чтобы равняться количеству моделей в этом юните.`,
            },
            {
              title: 'Описание юнитов',
              body: `Когда правило упоминает юнит, у него может быть дескриптор для юнита (например, юнит [gloss:terminator:TERMINATOR], **[gloss:hidden:скрытый]** юнит, **[gloss:battle-shocked:подверженный боевому шоку]** юнит, **[gloss:visible:видимый]** юнит, [gloss:controlling-unit:контролирующий] юнит). Чтобы такие дескрипторы применялись к юниту, в этом юните должна быть хотя бы одна модель, соответствующая этому дескриптору.

Это не даёт это правило каждой модели в юните, если только это правило прямо не указывает, что оно даёт это правило юниту — в этом случае каждая модель в этом юните получает это правило, как описано в разделе «Юниты и модели» (01.02).`,
              example: `**[gloss:hidden:Скрытый]** юнит — это юнит, в котором есть модель, которая является **[gloss:hidden:скрытой]**.`,
            },
            {
              title: '«A» (юнит/модель/объект)',
              body: `Некоторые правила могут упоминать «a» (англ. неопределённый артикль) юнит/модель/объект, не указывая точное число. В таких случаях значение — «один или более», а не ровно один.`,
              example: `Если у правила есть условие, требующее, чтобы юнит был «в пределах досягаемости **[gloss:objective:цели]**», это условие всё равно выполняется, если юнит находится в пределах досягаемости более чем одной **цели**.`,
            },
            {
              title: 'Токены',
              body: `Токены — это игровые вспомогательные средства, которые некоторые правила предписывают размещать рядом с моделью/юнитом, чтобы напоминать вам и вашему оппоненту, что модель/юнит либо обладает способностью ограниченного использования, либо находится под действием определённого правила. Токены не считаются моделями ни для каких целей (даже если они представлены моделью). Если другой модели нужно переместиться в пространство, занятое токеном, переместите токен, чтобы этот манёвр можно было выполнить.`,
            },
            {
              title: 'Добавление нового юнита в вашу армию',
              body: `Некоторые правила добавляют новый юнит в вашу армию во время битвы. **[gloss:starting-strength:Начальная численность]** этого юнита определяется в момент его добавления в вашу армию, но в остальном определяется так же, как и для других юнитов.`,
            },
            {
              title: 'Все типы моделей',
              body: `Когда правило упоминает «все типы моделей», это включает союзные и вражеские модели и все **[gloss:keywords:ключевые слова]**, например, модели MONSTER/VEHICLE.`,
            },
          ],
        },
        {
          title: 'Активный игрок и противостоящий игрок',
          body: `В любой момент времени один игрок является «активным игроком», а его оппонент — «противостоящим игроком». Какой игрок становится каким, меняется на протяжении битвы, но оба игрока всегда являются либо тем, либо другим; всякий раз, когда игрок становится активным, его оппонент становится противостоящим игроком, и наоборот.

Когда не идёт ход ни одного игрока (например, в начале или конце раунда боя), активным игроком является игрок, который делает первый ход в каждом раунде боя.

Когда идёт ход игрока, этот игрок является активным игроком, за следующими исключениями:
▪ Каждый раз, когда юнит выбирается для манёвра, контролирующий этот юнит игрок является активным игроком до окончания этого манёвра.
▪ Каждый раз, когда юнит выбирается для стрельбы или выбирается для ближнего боя, контролирующий этот юнит игрок является активным игроком до тех пор, пока эти атаки не будут отыграны.`,
          children: [
            {
              title: 'Правила игрока',
              body: `Во время игры игрокам иногда нужно знать, какие правила принадлежат им, в отличие от правил оппонента. Правилами игрока считаются следующие:

▪ Любые **[gloss:army-rules:правила армии]**, которые у него есть.
▪ Любые **[gloss:detachments:детачменты]** в его армии.
▪ Любые **[gloss:stratagem:стратагемы]**, которые он использует.
▪ Любые **[gloss:enhancement:улучшения]**, которые есть у юнитов или моделей в его армии.
▪ Любые способности или правила, указанные в [gloss:datasheet:листах данных] его юнитов.
▪ Правила с ограничениями (например, «Один раз за битву/ход/фазу») применяются только к тому игроку, чьим правилом они являются.

Некоторые миссии могут вводить дополнительные правила, действующие в битве. В таком случае:

▪ Если правило используется игроком, оно считается одним из правил этого игрока.
▪ Если оно не используется игроком и действует всегда, такое правило отыгрывается до любых правил активного игрока, в порядке по его выбору.`,
            },
            {
              title: 'Последовательность правил',
              body: `В любой момент игры у игроков будут правила, которые они могут или должны использовать, и это может совпасть по времени с тем, что другой игрок может или должен использовать своё правило. Если не указано иное, они активируются в следующем порядке:

1. Все правила активного игрока, которые должны быть использованы, в порядке по его выбору.
2. Все правила активного игрока, которые он может использовать по желанию и хочет использовать, в порядке по его выбору.
3. Все правила противостоящего игрока, которые должны быть использованы, в порядке по его выбору.
4. Все правила противостоящего игрока, которые он может использовать по желанию и хочет использовать, в порядке по его выбору.

Если какое-либо правило может быть использовано после того, как правило отыгралось в этой последовательности, но до того, как отыгрались другие правила с тем же таймингом, эти новые правила не срабатывают, пока не будут отыграны все оставшиеся правила с тем же таймингом.`,
              example: `У юнита активного игрока есть способность, позволяющая ему совершить **[gloss:normal-move:обычный манёвр]** после стрельбы. У вражеского юнита, выбранного целью этим юнитом, есть способность, позволяющая ему выстрелить в ответ по юниту, который по нему стрелял. Сначала отыгрывается правило активного игрока, затем — правило противостоящего игрока.`,
            },
          ],
        },
        {
          title: 'Измерение расстояний',
          body: `Расстояния в Warhammer 40,000 измеряются в **[gloss:inch:дюймах]**("). Вы можете измерять расстояния в любое время.

Когда правило ссылается на положение модели по отношению к чему-либо на поле боя, если не указано иное, измеряйте расстояние до ближайшей части базы этой модели.`,
          example: `Космодесантник Intercessor (база: 32 мм) находится в 4" от вражеского Ork Boy (база: 25 мм). Измеряется от ближайшего края базы Космодесантника до ближайшего края базы Ork Boy — не от центров. Если правило требует нахождения в пределах 1", они ещё не попадают в диапазон.`,
          children: [
            {
              title: 'В пределах / полностью в пределах (Within / Wholly Within)',
              body: `Правила в Warhammer 40,000 часто применяются к моделям или юнитам, которые находятся [gloss:within:в пределах] или [gloss:wholly-within:полностью в пределах] определённого расстояния. Следующие определения объясняют, что означают эти термины:

▪ **В пределах (Within):** Если правило говорит, что оно применяется «в пределах» указанного расстояния, оно применяется на любом расстоянии, не превышающем указанное. Например, в пределах 1" означает любое расстояние, не превышающее 1".
▪ **Модель/юнит в пределах (Model/Unit Within):** Модель находится в пределах указанного расстояния, если любая часть её [gloss:base:базы] находится в пределах этого расстояния. Юнит находится в пределах указанного расстояния, если одна или несколько его моделей находятся в пределах этого расстояния.
▪ **Модель/юнит полностью в пределах (Model/Unit Wholly Within):** Модель полностью в пределах указанного расстояния, если каждая часть её [gloss:base:базы] находится в пределах этого расстояния. Юнит полностью в пределах, если каждая модель в этом юните полностью в пределах указанного расстояния. Модель с ключевым словом FRAME полностью в пределах указанного расстояния, если все части этой модели находятся в пределах указанного расстояния.`,
              example: `Модель полностью в пределах **[gloss:terrain-area:участка укрытия]**, если ни одна часть её [gloss:base:базы] не выходит за [gloss:footprint:подложку] этого **[gloss:terrain-area:участка укрытия]**. Юнит полностью в пределах указанного расстояния, если каждая модель в этом юните полностью в пределах этого расстояния.`,
            },
            {
              title: 'Ближайшая модель/юнит (Closest Or Nearest Model/Unit)',
              body: `Когда правило ссылается на ближайшую модель или юнит, это ближайшая модель или юнит к модели или юниту, использующему это правило.

Если две или более равноудалены, контролирующий игрок модели или юнита, использующего это правило, выбирает, какая из них является ближайшей для целей этого правила.`,
            },
            {
              title: 'Как можно ближе',
              body: `Если правило предписывает вам переместить модель как можно ближе к юниту или модели, вы должны завершить манёвр этой модели в [gloss:base-contact:контакте баз] с этим юнитом или моделью, если её манёвра достаточно для этого без нарушения других ограничений (таких как **[gloss:coherency:боевое построение]**), или как можно ближе, если её манёвра недостаточно.
▪ Если модель уже находится в контакте база к базе, когда ей предписано совершить манёвр как можно ближе к юниту или модели, эту модель нельзя перемещать, но она всё равно считается совершившей данный манёвр.
Если правило предписывает вам переместить модель как можно ближе к **[gloss:objective:цели]**, вы должны завершить манёвр этой модели [gloss:within:в пределах] дальности **[gloss:objective:цели]**, если её манёвра достаточно для этого без нарушения других ограничений (таких как **[gloss:coherency:боевое построение]**), или как можно ближе, если её манёвра недостаточно.
▪ Если эта модель уже находится [gloss:within:в пределах] дальности **[gloss:objective:цели]**, она может переместиться на **[gloss:maximum-distance:максимальную дистанцию]** этого манёвра, но должна завершить манёвр всё ещё [gloss:within:в пределах] дальности этой **[gloss:objective:цели]**.`,
            },
            {
              title: 'Контакт баз или контакт база к базе (Base Contact or Base to Base Contact)',
              body: `Когда [gloss:base:базы] двух моделей соприкасаются, они находятся в контакте баз — также известном как контакт база к базе — и находятся как можно ближе (01.04.03).

Когда вы перемещаете модель из своей армии в контакт баз с вражеской моделью во время манёвра, если эта вражеская модель нависает над своей базой так, что физически невозможно вступить с ней в контакт баз, до конца хода эти модели считаются находящимися в контакте баз друг с другом, пока истинно всё следующее:
▪ Дистанции, на которую ваша модель могла переместиться, было достаточно, чтобы привести её в контакт баз с вражеской моделью, если бы не было нависания.
▪ Модели находятся как можно ближе друг к другу.
▪ Любая часть одной модели находится в пределах 1" от любой части другой модели.`,
            },
          ],
        },
        {
          title: 'Кубики',
          body: `Вам понадобятся шестигранные кубики (часто обозначаемые как D6). Существует множество способов описания бросков кубиков, включая:
▪ 2+, 3+ и так далее: 2+ означает результат 2 или более, 3+ означает результат 3 или более и так далее.
▪ 1-3, 4-6 и так далее: любой результат в указанном диапазоне будет взаимодействовать с указанным правилом.
▪ 2D6, 3D6 и так далее: бросьте указанное количество D6 и сложите значения вместе (например, чтобы бросить 2D6, бросьте два D6 и сложите значения).
▪ D3: бросьте один D6 и разделите результат пополам (округляя в большую сторону).
▪ D6+1, 2D6+3 и так далее: бросьте указанное количество кубиков и прибавьте указанное значение к результату.`,
          children: [
            {
              title: 'Автоматический успех/прохождение/попадание/ранение',
              body: `Когда бросок кубика или проверка автоматически успешны или автоматически проходят/попадают/ранят, не бросайте кубик, а вместо этого переходите к следующему шагу последовательности для этого броска, как если бы был выброшен требуемый результат. Любые правила, действующие при определённом результате кубика или броска, не действуют.

**Пример:** Если **[gloss:hit-roll:бросок на попадание]** автоматически успешен, переходите сразу к шагу бросков на ранение для этой атаки. Такой **[gloss:hit-roll:бросок на попадание]** не является **[gloss:critical-hit:критическим попаданием]**.

**Пример:** Если **[gloss:wound-roll:бросок на ранение]** автоматически успешен, переходите сразу к шагу спасбросков для этой атаки. Такой **[gloss:wound-roll:бросок на ранение]** не является **[gloss:critical-wound:критическим ранением]**.`,
            },
            {
              title: 'Перебросы',
              body: `Некоторые правила позволяют вам перебросить бросок кубика, что означает, что вы можете бросить часть или все кубики заново. Когда правило позволяет вам перебросить один или несколько кубиков, применяются следующие положения:

▪ Если правило позволяет вам перебросить бросок кубика, сделанный сложением нескольких кубиков (например, 2D6, 3D6 и т.д.), то вы должны перебросить все эти кубики заново.
▪ Вы никогда не можете перебросить кубик более одного раза, и перебросы происходят до применения модификаторов (если они есть).
▪ Переброшенный кубик всё равно считается броском кубика, и поэтому любые правила, которые могут быть вызваны броском кубика, также могут быть вызваны переброшенным кубиком.`,
            },
            {
              title: 'Изменение бросков кубиков',
              body: `См. Модификаторы (02.02.01).`,
            },
            {
              title: 'Игнорирование модификаторов броска',
              body: `См. Игнорирование модификаторов (02.02.02)`,
            },
            {
              title: 'Кубовка',
              body: `Некоторые правила предписывают игрокам сделать кубовку.
▪ Для этого оба игрока бросают по одному D6, и тот, у кого выпадет больше, выигрывает кубовку.
▪ Если есть ничья за наивысший бросок, проведите кубовку заново.`,
            },
            {
              title: 'Дубли или тройки',
              body: `При совершении броска кубиков дубль — это бросок, включающий любые два кубика с одинаковым результатом, а тройка — бросок, включающий любые три кубика с одинаковым результатом.`,
            },
            {
              title: 'Наивысший или наименьший результат кубика',
              body: `Если правило ссылается на наивысший результат кубика, а бросок кубиков включает несколько кубиков, и если более одного из этих кубиков имеют одинаковое значение, и это значение наивысшее, активный игрок должен выбрать один из этих кубиков в качестве наивысшего результата кубика.

Если правило ссылается на наименьший результат кубика, а бросок кубиков включает несколько кубиков, и если более одного из этих кубиков имеют одинаковое значение, и это значение наименьшее, активный игрок должен выбрать один из этих кубиков в качестве наименьшего результата кубика.`,
            },
            {
              title: 'Считается как, устанавливается в (бросок кубика)',
              body: `Когда результат кубика «считается как» или «устанавливается» в другое значение, любые правила, которые вступили бы в силу, если бы это значение было выброшено, вступают в силу.

Это может привести к значению, превышающему то, которое можно выбросить на кубике D6.`,
            },
          ],
        },
        {
          title: 'Проверка лидерства (Leadership Rolls)',
          body: `Чтобы выполнить **проверку лидерства** для юнита, его контролирующий игрок бросает 2D6: если результат равен или превышает одну или несколько характеристик Ld в этом юните, проверка успешна. В противном случае проверка провалена. Правило, которое предписало вам выполнить эту **проверку лидерства**, опишет последствия успеха или провала этой проверки.`,
          children: [
            {
              title: 'Тест на лидерство (Leadership Test)',
              body: `Некоторые правила могут использовать термин [gloss:leadership-test:тест на лидерство] — это то же самое, что **[gloss:leadership-roll:проверка лидерства]**.`,
            },
          ],
        },
        {
          title: 'Проверка на боевой шок',
          body: `Чтобы выполнить **[gloss:battle-shock-test:проверку боевого шока]** для юнита, его контролирующий игрок выполняет для него **[gloss:leadership-roll:проверку лидерства]** (см. выше).
▪ Если проверка успешна, юнит не становится **[gloss:battle-shocked:подверженным боевому шоку]**.
▪ Если проверка провалена, этот юнит и каждая модель в нём становится **[gloss:battle-shocked:подверженной боевому шоку]**.

Пока юнит **подвержен боевому шоку**:
▪ Характеристика Objective Control (OC) всех его моделей изменяется на '-'.
▪ Его контролирующий игрок не может нацеливать на этот юнит **[gloss:stratagem:стратагемы]**.
▪ Он не имеет права начинать [gloss:action:действия], и любое начатое [gloss:action:действие] не может быть завершено.`,
          example: `Отряд гвардейцев с Ld 7+ понёс тяжёлые потери и должен выполнить **[gloss:battle-shock-test:проверку боевого шока]**. Игрок бросает 2D6 и получает 9 — поскольку 9 не меньше 7, проверка успешна, и отряд держится. Если бы результат был 6 или меньше, весь юнит стал бы [gloss:battle-shocked:подвержен боевому шоку], утратив способность контролировать [gloss:objective:цели].`,
          children: [
            {
              title: 'Боевой дух на поле боя',
              body: `Боевой дух и организация войск могут колебаться и рушиться во время битвы. Это проверяется с помощью **[gloss:battle-shock-test:проверок боевого шока]**, чаще всего в Фазе командования. Провал такой проверки означает, что мужество юнита падает из-за потерь или других помех, снижая его боевую эффективность. Аналогично, некоторые правила потребуют от вас проверить готовность юнита с помощью **[gloss:leadership-roll:проверки лидерства]**.`,
            },
            {
              title: 'Проверка на боевой шок (Battle-shock Test)',
              body: `Термин «проверка на боевой шок» (Battle-shock test) — это то же самое, что **[gloss:battle-shock-test:проверка боевого шока]**.`,
            },
          ],
        },
      ],
    },
    {
      title: 'Листы данных',
      description: 'У каждого юнита есть [gloss:datasheet:лист данных], который объясняет, как он действует в бою. Здесь вы узнаете, как использовать [gloss:datasheet:листы данных] при подготовке армии и во время игры.',
      subsections: [
        {
          title: 'Название листа данных',
          body: `Здесь вы найдёте название юнита.`,
          children: [
            {
              title: 'Название листа данных и ключевые слова',
              body: `Помимо ключевых слов, перечисленных в разделе «[gloss:keywords:Ключевые слова]» каждого листа данных, название листа данных также действует как дополнительное ключевое слово для этого юнита.`,
            },
          ],
        },
        {
          title: 'Характеристики (Profiles)',
          body: `Здесь содержатся следующие характеристики, которые показывают, насколько сильны модели в юните:

▪ **Move (движение) (M):** скорость, с которой модель перемещается по полю боя. Если модель имеет характеристику M '-', она может быть установлена на поле боя, но в остальном не может быть перемещена.
▪ **Toughness (стойкость) (T):** устойчивость модели к вреду.
▪ **Save (спас-бросок) (Sv):** представленный как результат броска кубика (например, 4+), указывает на защиту, которую даёт броня модели.
▪ **Invulnerable Save (неуязвимый спас-бросок) (InSv):** представленный как результат броска кубика (например, 4+). Некоторые модели защищены эзотерическими средствами в дополнение к физической броне, такими как силовые поля или сверхъестественные рефлексы. Не все модели имеют характеристику InSv, но если она есть, она будет указана здесь.
▪ **Wounds (раны) (W):** раны представляют, сколько урона может выдержать модель, прежде чем она будет **[gloss:destroyed:уничтожена]**. Если раны модели снижаются до 0 или ниже, модель **уничтожена**.
▪ **Leadership (лидерство) (Ld):** представленное как результат броска кубика (например, 7+), показывает, насколько модель храбра, решительна или самоконтролируема.
▪ **Objective Control (контроль цели) (OC):** насколько эффективно модель может контролировать **[gloss:objective:цель]** на поле боя. Если модель имеет характеристику OC '-', она вообще не может контролировать **[gloss:objective:цели]**.`,
          children: [
            {
              title: 'Модификаторы (Modifiers)',
              body: `### Что такое модификаторы?
Многие правила в игре изменяют какое-либо значение, характеристику или бросок в другом месте игры. Правило, которое это делает, называется [gloss:modifier:модификатором]. Изменённое значение является изменённым правилом (например, изменённая характеристика, изменённый бросок, изменённое значение и т.д.).

Один из самых распространённых способов представления модификаторов — это +1 или -1 к характеристике, броску или значению.

Если правило содержит +1 к характеристике, оно улучшает её на значение после знака «+».

**Пример:** «Это оружие имеет +1 к **[gloss:armour-penetration:AP]**» улучшит характеристику **[gloss:armour-penetration:AP]** с -2 до -3.

Если правило содержит -1 к характеристике, оно ухудшает её на значение после знака «-».

**Пример:** «Этот юнит имеет -1 к **[gloss:save-roll:Sv]**» ухудшит характеристику **[gloss:save-roll:Sv]** с 3+ до 4+.

### Применение модификаторов
В этом разделе представлены различные способы изменения правил. Все модификаторы суммируются.

Когда значение изменяется (например, характеристика, бросок кубика, дистанция), делайте это в следующем порядке.
1. Если правило предписывает вам изменить или заменить одно значение указанным значением, вы должны сначала изменить соответствующее значение на новое. (Обратите внимание, что характеристики, изменённые на этом шаге до значения «0», «-» или «*», не могут быть изменены другими правилами — в таких случаях пропустите шаги 2–5.)
2. Примените модификаторы умножения.
3. Примените модификаторы сложения.
4. Примените модификаторы деления.
5. Примените модификаторы вычитания.
6. Округлите любые дроби в большую сторону после применения всех модификаторов.

### При изменении характеристик
При изменении характеристик также применяются следующие положения:
▪ Характеристики «-», «*» и «N/A» никогда не могут быть изменены.
▪ Правила, изменяющие характеристику **[gloss:weapon-skill:WS]** и/или **[gloss:ballistic-skill:BS]** модели, изменяют характеристику **[gloss:weapon-skill:WS]** и/или **[gloss:ballistic-skill:BS]** каждого оружия, которым экипирована эта модель.
▪ После применения всех модификаторов:
▫ **[gloss:move-characteristic:M]** не может быть меньше 1".
▫ **[gloss:toughness:T]** не может быть меньше 1.
▫ **[gloss:save-roll:Sv]** не может быть 1+ или лучше.
▫ **[gloss:invulnerable-save:InSv]** не может быть 1+ или лучше.
▫ **[gloss:leadership:Ld]** не может быть 4+ (или лучше) или 9+ (или хуже).
▫ **[gloss:objective-control:OC]** не может быть меньше 0 или «-».
▫ Характеристики **[gloss:range:Range]** не могут быть меньше 1".
▫ **[gloss:attack-dice:A]** не может быть меньше 1.
▫ **[gloss:weapon-skill:WS]** не может быть 1+ (или лучше) или 7+ (или хуже).
▫ **[gloss:ballistic-skill:BS]** не может быть 1+ (или лучше) или 7+ (или хуже).
▫ **[gloss:strength:S]** не может быть меньше 1.
▫ **[gloss:armour-penetration:AP]** не может быть хуже 0.
▫ **[gloss:damage-roll:D]** не может быть меньше 1.

Когда в правилах используются эти термины, затрагиваемые характеристики изменяются, и применяются следующие положения:
▪ **Улучшение WS, BS, Sv и Ld:** При улучшении характеристики **[gloss:weapon-skill:WS]**, **[gloss:ballistic-skill:BS]**, **[gloss:save-roll:Sv]** или **[gloss:leadership:Ld]** вычтите соответствующую величину из числа перед знаком «плюс», например, улучшение **[gloss:weapon-skill:WS]** 3+ на 1 даст **[gloss:weapon-skill:WS]** 2+.
▪ **Ухудшение WS, BS, Sv и Ld:** При ухудшении характеристики **[gloss:weapon-skill:WS]**, **[gloss:ballistic-skill:BS]**, **[gloss:save-roll:Sv]** или **[gloss:leadership:Ld]** прибавьте соответствующую величину к числу перед знаком «плюс», например, ухудшение **[gloss:weapon-skill:WS]** 3+ на 1 даст **[gloss:weapon-skill:WS]** 4+.
▪ **Улучшение AP:** При улучшении характеристики бронепробития вычтите соответствующую величину из характеристики, например, улучшение **[gloss:armour-penetration:AP]** -1 на 1 даст **[gloss:armour-penetration:AP]** -2; улучшение **[gloss:armour-penetration:AP]** 0 на 1 даст **[gloss:armour-penetration:AP]** -1.
▪ **Уменьшение или ухудшение AP:** При уменьшении или ухудшении характеристики бронепробития прибавьте соответствующую величину к характеристике, максимум до 0, например, уменьшение/ухудшение **[gloss:armour-penetration:AP]** -1 на 1 даст **[gloss:armour-penetration:AP]** 0; уменьшение/ухудшение **[gloss:armour-penetration:AP]** 0 на 1 даст **[gloss:armour-penetration:AP]** 0.
▪ **Улучшение или ухудшение прочих характеристик:** Когда предписано улучшить/ухудшить характеристику, не содержащую знака «+» или «-», прибавьте/вычтите указанную величину к/из этой характеристики (например, чтобы улучшить **[gloss:strength:S]** на 1, прибавьте к ней 1).

### При изменении бросков кубиков
При изменении бросков кубиков также применяются следующие положения:
▪ Модификаторы применяются после любых перебросов этого броска.
▪ Правила, ссылающиеся на значение «немодифицированного» броска кубика, имеют в виду результат кубика после любых перебросов, но до модификаторов.
▪ Результат кубика может быть изменён выше его максимально возможного значения (например, бросок D6 может быть изменён выше 6).
▪ Результат, который был бы меньше 1, меняется на результат 1.
▪ **[gloss:hit-roll:Броски на попадание]** и **[gloss:wound-roll:броски на ранение]** никогда не могут быть изменены более чем на -1 или +1. После расчёта всех суммарных модификаторов к такому броску, если итоговый модификатор был бы:
▫ -2 или хуже, он меняется на -1.
▫ +2 или лучше, он меняется на +1.
▪ **[gloss:charge-roll:Броски нападения]** не могут быть больше 12. После расчёта всех суммарных модификаторов к **[gloss:charge-roll:броску нападения]**, если результат был бы 13 или более, он меняется на 12.

### Прочие изменённые правила
Следующие правила применяются к различным правилам и эффектам, встречающимся в игре.
▪ **[gloss:detection-range:Радиус обнаружения]** и **[gloss:lone-operative:Lone Operative]** не могут быть лучше 9" или хуже 30".

**[gloss:stratagem:Стратагема]** не может иметь свою стоимость в **[gloss:command-points:CP]** увеличенной более чем на 1 или уменьшенной ниже 0 после применения всех модификаторов.`,
            },
            {
              title: 'Игнорирование модификаторов',
              body: `Некоторые правила позволяют игроку, оружию, модели или юниту игнорировать модификаторы. При использовании таких правил применяются следующие положения:

Если не указано иное, это правило позволяет вам игнорировать модификаторы к броскам юнита, а также к характеристикам **[gloss:profiles:профиля]** юнита и оружия.

Когда правило указывает, что вы можете игнорировать модификаторы к определённому броску или характеристике, вы можете выбрать игнорировать все эти модификаторы или только некоторые из них. Например, вы всё ещё можете применять положительные/полезные модификаторы, игнорируя отрицательные/вредные.

**Пример:** Ваш юнит может игнорировать модификаторы характеристик и находится под эффектом +2" к **[gloss:move-characteristic:M]** и -2" к **[gloss:move-characteristic:M]**. Вы можете выбрать игнорировать -2" к **[gloss:move-characteristic:M]**, что означает, что характеристика **[gloss:move-characteristic:M]** этого юнита будет изменена только на +2".

**Пример:** Дистанционные атаки вашего юнита могут игнорировать модификаторы бросков и находятся под эффектом +1 к **[gloss:hit-roll:броскам на попадание]** и -1 к **броскам на попадание**. Вы можете выбрать игнорировать -1 к **броскам на попадание**, что означает, что эти атаки будут затронуты только +1 к **броскам на попадание**.`,
            },
            {
              title: 'Случайные характеристики',
              body: `**Случайное движение (Random Movement):** Когда юнит со случайной характеристикой **[gloss:move-characteristic:M]** **[gloss:selected-to-move:выбирается для манёвра]**, определите дистанцию манёвра всего юнита, бросив указанное количество кубиков.

**Случайные атаки (Random Attacks):** Если оружие имеет случайную характеристику **[gloss:attack-dice:A]**, эта характеристика определяется при генерации атак для этого оружия на шаге «[gloss:resolve-attacks:Отыгрыш атак]» (04.03). Если несколько единиц оружия со случайными характеристиками **[gloss:attack-dice:A]** совершают **идентичные атаки**, сгенерируйте атаки для каждого из этих видов оружия по отдельности, а затем сгруппируйте их все вместе.

**Случайный урон (Random Damage):** Если оружие имеет случайную характеристику **[gloss:damage-roll:D]**, то каждый раз, когда атака им наносит урон, контролирующий игрок определяет эту характеристику оружия после того, как противостоящий игрок выбрал модель в целевом юните для распределения этой атаки.

При определении случайной характеристики **[gloss:damage-roll:D]** совершаемый бросок кубика называется **[gloss:damage-roll:броском урона]**.

Если характеристика **[gloss:damage-roll:D]** включает оператор (например, «+», как в D6+1), значение после оператора является частью этой характеристики **[gloss:damage-roll:D]** — это не модификатор.

**Другие случайные характеристики (Other Random Characteristics):** Для всех остальных характеристик бросайте, чтобы определить значение индивидуально, для каждой модели или для каждого оружия, каждый раз, когда требуется эта характеристика.`,
            },
            {
              title: 'Исцеление или восстановление потерянных ран',
              body: `Когда юнит **[gloss:heal:исцеляет]** или восстанавливает некоторое количество ран, он восстанавливает до этого количества потерянных ран. За каждую исцелённую или восстановленную рану действуйте следующим образом:
▪ Если в этом юните есть одна или несколько моделей, у которых не полное количество оставшихся ран, выберите одну из этих моделей; эта модель восстанавливает одну потерянную рану.
▪ Если все модели в этом юните имеют своё начальное количество ран, но одна или несколько моделей из этого юнита в данный момент **[gloss:destroyed:уничтожены]**, **[gloss:revive:возродите]** одну из этих **уничтоженных** моделей с одной оставшейся раной.
Это не может привести к тому, что у модели останется больше ран, чем было в начале битвы.

Если правило указывает, что модель **исцеляет** или восстанавливает некоторое количество ран, только эта модель может восстанавливать раны до своего начального количества. Любые избыточные восстановленные раны теряются и не приводят к **возрождению** **уничтоженной** модели из этого юнита.`,
            },
            {
              title: 'Полное количество оставшихся ран',
              body: `Модель имеет полное количество оставшихся ран, если у неё столько же оставшихся ран, сколько указано в её характеристике **[gloss:wounds:W]**.`,
            },
            {
              title: 'Модификаторы характеристик и изменённые характеристики',
              body: `См. Модификаторы (02.02.01).`,
            },
          ],
        },
        {
          title: 'Способности (Abilities)',
          body: `У многих юнитов есть [gloss:ability:способности], которые могут применяться во время игры. Они будут описаны здесь.`,
          children: [
            {
              title: 'Правила с несколькими условиями и эффектами',
              body: `Некоторые правила имеют несколько условий, при этом второе, более конкретное условие даёт улучшенное правило — либо вместо правила первого условия, либо в дополнение к нему. Такие правила требуют выполнения и первого, и второго условия, чтобы применялось улучшенное правило.

Например, способность гласит: «Дистанционные атаки этого юнита, нацеленные на ближайшую доступную цель, могут:
▪ Перебрасывать **[gloss:hit-roll:броски на попадание]**, равные 1.
▪ __Или:__ Если эта цель находится в пределах дальности **[gloss:objective:цели]**, которую контролирует ваш оппонент, перебрасывать **броски на попадание**.»
Чтобы эти атаки перебрасывали **броски на попадание**, цель должна быть одновременно ближайшей доступной целью и находиться в пределах дальности **цели**, которую контролирует ваш оппонент.`,
            },
          ],
        },
        {
          title: 'Оружие',
          body: `Оружие имеет следующие характеристики:
▪ Range (дальность) (R): как далеко может стрелять дистанционное оружие. Оружие с характеристикой R «Melee» является оружием ближнего боя.
▪ Attacks (атаки) (A): сколько [gloss:attack-dice:кубиков атаки] используется каждый раз при использовании этого оружия.
▪ Ballistic Skill (навык стрельбы) (BS): представленный как результат броска кубика (например, 4+), показывает, насколько точен владелец при стрельбе из соответствующего оружия.
▪ Weapon Skill (навык ближнего боя) (WS): представленный как результат броска кубика (например, 4+), отражает мастерство владельца в использовании соответствующего оружия ближнего боя.
▪ Strength (сила) (S): чем выше характеристика S оружия, тем больше вероятность нанести рану врагу.
▪ Armour Penetration (бронепробитие) (AP): представленный как модификатор броска кубика (например, -1). Чем больше модификатор, тем лучше оружие пробивает-прорезает защиту цели.
▪ Damage (урон) (D): количество урона, наносимого атакой.`,
          children: [
            {
              title: 'Оружие без силы',
              body: `Если оружие не имеет характеристики **[gloss:strength:S]** (потому что она «-» или по любой другой причине) и правило взаимодействует с характеристикой **[gloss:strength:S]** этого оружия, это оружие имеет **[gloss:strength:S]** 1 для этого взаимодействия.`,
            },
          ],
        },
        {
          title: 'Ключевые слова (Keywords)',
          body: `Листы данных имеют список ключевых слов, разделённых на ключевые слова фракции и другие ключевые слова. Первые используются при решении, какие модели включать в вашу армию, но в остальном оба функционально одинаковы. Ключевые слова пишутся заглавными буквами, полужирным шрифтом.

Некоторые правила связаны с одним или несколькими ключевыми словами. Например, правило может говорить, что оно применяется к юнитам ПЕХОТЫ (INFANTRY). Это означает, что оно применяется только к юнитам, имеющим ключевое слово INFANTRY. Единственное и множественное число одного и того же ключевого слова функционируют одинаково.`,
          children: [
            {
              title: 'Использование ключевых слов и смешанные ключевые слова в юнитах',
              body: `При использовании ключевых слов применяются следующие положения:
▪ Юнит имеет все ключевые слова всех моделей в этом юните. Модель имеет только свои собственные ключевые слова.
▪ Если правило указывает, что оно применяется к юниту с ключевым словом, оно применяется к юниту, который включает одну или несколько моделей с этим ключевым словом.
▪ Если правило указывает, что оно применяется к модели с ключевым словом, оно применяется только к модели с этим ключевым словом.
▪ Если правило указывает, что оно применяется к моделям/юнитам «не-KEYWORD», оно применяется только к моделям/юнитам, не имеющим этого ключевого слова. Например, если правило применяется к юнитам не-VEHICLE, оно применяется только к юнитам, не имеющим ключевого слова VEHICLE.
▪ Некоторые юниты могут содержать модели с разными ключевыми словами. Пока это так, такой юнит считается имеющим все ключевые слова всех своих моделей и поэтому подвержен любому правилу, применяющемуся к юнитам с любым из этих ключевых слов. Помните, что атаки совершаются против юнитов, а не моделей.
▪ Если правило применяется только к моделям с определённым ключевым словом, тогда оно применяется только к моделям в таком юните, имеющим правильное ключевое слово.
▪ Правило со списком ключевых слов через запятую, или с серией ключевых слов, разделённых слэшами («/»), или с двумя ключевыми словами, разделёнными словом «или» (например, «юнит IMMORTALS, DEATHMARKS или LYCHGUARD»), относится к модели/юниту, имеющему любое одно из этих ключевых слов.
▪ Правило с несколькими смежными ключевыми словами (например, «юнит AELDARI GUARDIANS») относится только к модели/юниту, имеющему все эти ключевые слова.
▪ Некоторые более старые правила используют ключевые слова без указания модели или юнита: например, MONSTER/VEHICLE или TRANSPORT. Эти правила относятся к юнитам с этими ключевыми словами.
▪ Единственное и множественное число одного и того же ключевого слова функционируют одинаково.`,
            },
          ],
        },
        {
          title: 'Состав юнита и другие правила',
          body: `В этом разделе подробно описано количество и типы моделей в юните. Каждая из этих моделей будет иметь один набор стандартного снаряжения, который будет перечислен здесь. Здесь также могут быть перечислены другие правила, например, к каким юнитам может присоединиться [gloss:leader:юнит-лидер] или какие юниты могут сесть в [gloss:transport:TRANSPORT].`,
          children: [
            {
              title: 'Носитель (Bearer)',
              body: `Носитель оружия, [gloss:enhancement:усиления] или предмета [gloss:wargear:снаряжения] — это модель, экипированная им.`,
            },
            {
              title: 'Снаряжение юнита',
              body: `Когда правило ссылается на снаряжение юнита, оно относится ко всему [gloss:wargear:снаряжению], которым экипированы модели в этом юните.`,
            },
          ],
        },
        {
          title: 'Опции снаряжения',
          body: `Некоторые листы данных имеют список опций снаряжения. Когда вы включаете такой юнит в свою армию, вы можете использовать эти опции, чтобы изменить оружие и другое снаряжение его моделей.`,
        },
      ],
    },
    {
      title: 'Движение',
      description: 'Во время битвы вы будете перемещать свои модели, поднимая их и меняя их положение на поле боя. Принципы движения объяснены здесь.',
      subsections: [
        {
          title: 'Движение юнитов',
          body: `Существует несколько типов манёвров, которые может совершить юнит. Каждый из них определяет, какие юниты имеют право на его совершение, каково его **[gloss:maximum-distance:максимальное расстояние]** или **[gloss:set-up-distance:расстояние установки]**, а также любые условия, которые должны быть соблюдены.

Каждый раз при манёвре юнита вы можете переместить одну или несколько его моделей поочерёдно, перемещая каждую по прямой линии и/или поворачивая её столько раз, сколько хотите.

При каждом манёвре модели, если не указано иное:
▪ Её можно перемещать сквозь союзные модели.
▪ Её можно перемещать через любое пространство, через которое может пройти её база.
▪ Её базу нельзя перемещать сквозь вражеские модели.
▪ Её база не может пересекать край поля боя.
▪ Все условия **[gloss:while-moving:«Во время манёвра»]** должны быть соблюдены.

### Движение модели по прямой линии
Каждый раз, когда вы перемещаете модель по прямой линии, перемещайте её горизонтально по полю боя. Измеряйте расстояние от одной и той же точки на её базе в начале и в конце этого манёвра и прибавляйте это расстояние к любому другому расстоянию, которое она преодолела с момента начала манёвра её юнита. Пройденное расстояние не может превышать **[gloss:maximum-distance:максимальное расстояние]** для данного **[gloss:move-type:типа манёвра]**.

### Поворот модели
Каждый раз, когда вы поворачиваете модель, поверните её на любое количество градусов вокруг центра её базы, удерживая её вертикально. Обратите внимание, что поворот модели не учитывается в пройденном ею расстоянии. Модели без базы поворачиваются вокруг своей центральной оси (см. FRAME, 17.02).

### Завершение манёвра
После того как вы закончили устанавливать все модели в юните и/или перемещать все модели в юните, которые вы хотите переместить, проверьте, выполняются ли все следующие условия:
▪ Если этот юнит находится на поле боя, он находится в **[gloss:coherency:боевом построении]** (03.03).
▪ Ни одна модель в этом юните не находится на другой модели или частично внутри поверхности **[gloss:terrain-feature:элемента укрытия]** (например, стены или потолка).
▪ Все условия **[gloss:after-moving:«После манёвра»]** соблюдены.

Если одно или несколько из вышеуказанных условий не соблюдены, этот юнит не может совершить этот манёвр, и его модели возвращаются на свои изначальные позиции. В противном случае, после отыгрыша любых дополнительных правил, указанных в разделе [gloss:after-moving:«После манёвра»] для этого **[gloss:move-type:типа манёвра]**, этот манёвр заканчивается.`,
          children: [
            {
              title: 'Различные характеристики движения',
              body: `При совершении **[gloss:move-type:типа манёвра]**, чьё **[gloss:maximum-distance:максимальное расстояние]** использует характеристику **[gloss:move-characteristic:M]** юнита, если разные модели в перемещающемся юните имеют разные характеристики **[gloss:move-characteristic:M]**, **максимальное расстояние** для этого манёвра будет разным для этих моделей.`,
              example: `Если юнит совершает **[gloss:normal-move:обычный манёвр]** и все модели в этом юните имеют характеристику **[gloss:move-characteristic:M]** 6", кроме одной модели с характеристикой **[gloss:move-characteristic:M]** 9", то **максимальное расстояние** для этой модели составляет 9", тогда как для остальных моделей **максимальное расстояние** — 6". Пока этот юнит совершает этот манёвр, должны соблюдаться все остальные ограничения.`,
            },
            {
              title: 'Движение над или сквозь модели',
              body: `У некоторых моделей есть правило, позволяющее им «двигаться над моделями», «двигаться сквозь модели» или «двигаться над моделями, как будто их там нет» при совершении манёвра. При перемещении модели с таким правилом она может совершать свой манёвр сквозь вражеские модели, но должна соблюдать все остальные ограничения совершаемого манёвра.`,
            },
            {
              title: 'Случайное движение',
              body: `См. Случайные характеристики (02.02.03)

Обе показанные здесь модели могут переместиться на **[gloss:maximum-distance:максимальное расстояние]** 6". Обе перемещаются на 3" по прямой линии, затем на 3" по другой прямой линии, что в сумме даёт перемещение на 6".`,
            },
            {
              title: 'При перемещении на величину до',
              body: `Некоторые правила позволяют юниту совершить манёвр на величину до X". Это указанное расстояние является **[gloss:maximum-distance:максимальным расстоянием]** для этого манёвра.`,
            },
          ],
        },
        {
          title: 'Расстановка',
          body: `Прежде чем ваши юниты смогут двигаться и совершать атаки, их сначала нужно будет установить на поле боя. Это чаще всего происходит при Развёртывании вашей армии для битвы, но может происходить и по другим причинам.

Когда правило предписывает вам установить юнит, поместите его модели на поле боя так, чтобы:
▪ Этот юнит находился в **[gloss:coherency:боевом построении]** (см. ниже).
▪ Этот юнит **[gloss:unengaged:не был связан боем]** (см. ниже).
▪ Были соблюдены все остальные требования и ограничения.

Если вы не можете установить все модели в юните, удалите этот юнит с поля боя и верните его на исходную позицию (например, в [gloss:strategic-reserves:стратегические резервы] или внутри [gloss:transport:TRANSPORT]).`,
          note: `Если вы не можете установить юнит: если в результате манёвра вам пришлось вернуть модели юнита на прежние позиции, потому что невозможно установить их всех, можно сказать что этот юнит не был выбран для совершения этого манёвра. Поэтому он может либо повторить попытку установки, либо [gloss:remain-stationary:остаться недвижимым] (09.04).`,
          children: [
            {
              title: 'Если вы не можете установить юнит',
              body: `Когда вам приходится устанавливать юнит в результате **[gloss:move-type:типа манёвра]**, если вам пришлось вернуть модели юнита на их прежние позиции, потому что невозможно установить их все, этот юнит не был **[gloss:selected-to-move:выбран для манёвра]**. Это означает, что он может быть **выбран для манёвра** позже, поэтому может либо повторить попытку установки, либо **[gloss:remain-stationary:остаться недвижимым]** (09.04).`,
            },
            {
              title: 'Установка крупных моделей',
              body: `Если модель не может соблюсти все ограничения установки, потому что она слишком большая, обратитесь к соответствующему разделу ниже:

**[gloss:during-deployment:Во время развёртывания]:** Если модель настолько большая, что её база не может физически быть установлена полностью в пределах вашей зоны развёртывания, она должна быть установлена так, чтобы касаться вашего края поля боя. В течение хода, в котором такая крупная модель устанавливается на поле боя, юнит этой модели не может выполнять ничего из следующего:
▪ Совершать **обычный/продвигающий/отступающий/нападающий манёвр** (normal/advance/fall-back/charge move).
▪ Совершать какие-либо атаки дистанционным оружием.
Некоторые крупные модели, обычно [gloss:aircraft:AIRCRAFT], имеют крылья и другие части, значительно выходящие за пределы их базы. Такие модели могут нависать над зоной развёртывания, если иначе их невозможно установить, но при установке их база всё равно должна быть полностью в пределах этой зоны развёртывания.

**[gloss:strategic-reserves:Из стратегических резервов]:** Если модель настолько большая, что её база не может физически быть установлена полностью в пределах расстояния, требуемого от края поля боя, она должна быть установлена так, чтобы касаться края поля боя. В течение хода, в котором такая крупная модель устанавливается на поле боя, юнит этой модели не может выполнять ничего из следующего:
▪ **обычный/продвигающий/отступающий/нападающий манёвр** (normal/advance/fall-back/charge move).
▪ Совершать какие-либо атаки дистанционным оружием.
Некоторые крупные модели, обычно [gloss:aircraft:AIRCRAFT], имеют крылья и другие части, значительно выходящие за пределы их базы. Такие модели могут нависать над краем поля боя, если иначе их невозможно установить, но при установке они всё равно должны находиться более чем в 8" от всех вражеских юнитов.

**[gloss:disembark:Высадка из транспорта]:** Когда юнит высаживается из [gloss:transport:TRANSPORT], он должен быть установлен полностью в пределах 3" от этой модели. Если высаживающаяся модель настолько большая, что её невозможно установить полностью в пределах 3" (обычно потому, что она сама больше 3" во всех направлениях), установите эту модель так, чтобы её база была в пределах 1" от базы (или корпуса) этого [gloss:transport:TRANSPORT], и не **[gloss:engaged:связана боем]** с вражескими юнитами.`,
            },
            {
              title: 'Передислокация (Redeployments)',
              body: `Когда игрок использует правило, позволяющее ему передислоцировать свой юнит, он убирает этот юнит с поля боя, а затем развёртывает его снова, используя все обычные правила (например, если все модели в передислоцируемом юните имеют способность [gloss:infiltrators:Infiltrators], этот юнит может быть установлен с помощью этой способности).`,
            },
          ],
        },
        {
          title: 'Боевое построение (Coherency)',
          body: `Юнит, содержащий более одной модели, должен быть установлен и завершать любой вид манёвра в **боевом построении**. Юнит находится в **боевом построении**, если для каждой модели в этом юните выполняются оба следующих условия:
▪ Находится в пределах 2" по горизонтали и 5" по вертикали от по крайней мере одной другой модели в этом юните.
▪ Находится в пределах 9" по горизонтали и 5" по вертикали от каждой другой модели в этом юните.

### Восстановление боевого построения
На этапе **[gloss:end-of-turn-step:«Конец хода»]** каждого хода игрока, если один или несколько юнитов на поле боя не находятся в **боевом построении**, контролирующие игроки этих юнитов должны удалять модели из них, по одной, пока такой юнит снова не придёт в **боевое построение**. Модели, удалённые таким образом, **[gloss:destroyed:уничтожаются]**, но они не активируют правила, которые срабатывают тогда, когда модель **[gloss:destroyed:уничтожена]**.`,
          children: [
            {
              title: 'Что такое боевое построение (What Is Coherency)',
              body: `**[gloss:coherency:Боевое построение]** не позволяет моделям в одном юните слишком сильно отдаляться друг от друга на поле боя, гарантируя, что они устанавливаются и завершают любой вид манёвра как единая группа.`,
            },
          ],
        },
        {
          title: 'Связывание (Engagement)',
          body: `Радиус связывания модели — это область поля боя в пределах 2" по горизонтали и 5" по вертикали от неё.
▪ Пока союзная модель находится в **радиусе связывания** с одной или несколькими вражескими моделями, эти модели — и юниты, к которым они принадлежат, — **связаны боем** друг с другом.
▪ Пока юнит не содержит ни одной **связанной** модели, этот юнит считается **не связанным**.`,
          children: [
            {
              title: 'Что такое связывание (What Is Engagement)',
              body: `Когда вражеские модели находятся в **[gloss:engagement-range:радиусе связывания]** друг друга, они могут сражаться в жестокой рукопашной, поэтому, если только они не стремятся сражаться в ближнем бою, модели должны держаться вне досягаемости своих врагов.`,
            },
          ],
        },
      ],
    },
    {
      title: 'Совершение атак',
      description: 'Во время битвы ваши юниты будут стрелять по врагу и сражаться с ним, совершая атаки своим оружием. В этом разделе объясняется, как совершать атаки вашими моделями.',
      subsections: [
        {
          title: 'Шаги атаки',
          body: `Каждый раз, когда юнит стреляет или вступает в ближний бой, активный игрок выполняет следующие шаги:
▪ 1. Выбрать оружие
▪ 2. Выбрать цели
▪ 3. Отыграть атаки`,
        },
        {
          title: 'Выбор оружия',
          body: `Для каждой модели в атакующем юните выберите, каким оружием эта модель будет совершать атаки. Модели совершают **[gloss:ranged-attacks:дистанционные атаки]** **[gloss:ranged-weapons:дистанционным оружием]** и совершают **[gloss:melee-attacks:атаки ближнего боя]** **[gloss:melee-weapons:оружием ближнего боя]**.

### При стрельбе
Вы можете выбрать одно или несколько единиц дистанционного оружия, которое есть у этой модели.

### При ближнем бое
Вы должны выбрать одно оружие ближнего боя, которое есть у этой модели.`,
          children: [
            {
              title: 'Модели без дистанционного/ближнего оружия',
              body: `Модель, не имеющая дистанционного оружия, не может совершать дистанционные атаки, а модель, не имеющая оружия ближнего боя, не может совершать атаки ближнего боя.`,
            },
            {
              title: 'Дополнительное оружие (Sidearms)',
              body: `Некоторые модели оснащены оружием [CLOSE-QUARTERS] в дополнение к другому огнестрельному оружию. Такие модели могут быть исключением из правил этого раздела, поскольку вы можете быть не в состоянии выбрать всё их оружие для совершения атак.`,
            },
            {
              title: 'Несколько профилей оружия',
              body: `На шаге **[gloss:select-weapons:выбора оружия]** (04.01), если у выбранного оружия более одного профиля, контролирующий игрок также должен выбрать один из этих профилей. Выбранный профиль затем используется на шаге «[gloss:resolve-attacks:Отыгрыш атак]» (04.03).

Некоторые из этих профилей известны как профили **Hunter**. Профили **Hunter** могут нацеливаться только на юниты с указанными ключевыми словами.

Обратите внимание, что если юнит оснащён более чем одним таким оружием, для каждой модели в этом юните может быть выбран свой профиль.`,
            },
            {
              title: 'Характеристики и способности атаки',
              body: `При совершении атаки эта атака считается имеющей те же характеристики и способности, что и оружие, совершающее эту атаку.

Если к атаке применяются какие-либо модификаторы или способности, эти изменения применяются к оружию, совершающему эту атаку, до тех пор, пока не будут отыграны **[gloss:attack-sequence:последовательность атаки]** этого юнита и все эффекты этих способностей (например, [HAZARDOUS]).

Правила, применяемые к оружию, которые изменяют броски, применяются к атакам, совершаемым этим оружием.`,
            },
            {
              title: 'Выбран для атаки',
              body: `Некоторые правила используют термин **[gloss:selected-to-attack:выбран для атаки]**. Если юнит **[gloss:selected-to-fight:выбран для ближнего боя]**, **[gloss:selected-to-shoot:выбран для стрельбы]** или выбран для совершения атак, этот юнит **выбран для атаки**.`,
            },
          ],
        },
        {
          title: 'Выбор целей',
          body: `Для каждого выбранного оружия:

### При стрельбе
Выберите один вражеский юнит в качестве цели для этого оружия. Если не указано иное, каждая цель должна:
▪ Быть **[gloss:visible:видимой]** для модели, у которой есть это оружие (06.01).
▪ Находиться в дальности этого оружия.
▪ **[gloss:unengaged:Не связан боем]**.

### При ближнем бое
Выберите один или несколько вражеских юнитов в качестве целей для этого оружия:
▪ Каждая цель должна находиться в **[gloss:engaged:радиусе связывания]** с моделью, у которой есть это оружие.
▪ Вы не можете выбирать больше целей, чем характеристика A этого оружия.`,
          children: [
            {
              title: 'Выбор целей',
              body: `При стрельбе или ближнем бою вы можете выбирать разные цели для каждого оружия. Если вы не можете выбрать цель для оружия или решите не выбирать цель для дистанционного оружия, модель с этим оружием не будет совершать атаки им.`,
            },
            {
              title: 'Против атаки',
              body: `Правила, срабатывающие «против» определённых атак, срабатывают после того, как атакующий юнит завершил шаг «[gloss:select-targets:Выбор целей]» (04.02), при условии, что соблюдены все остальные требования (например, касающиеся характеристик атакующего юнита или его оружия).

Правила, срабатывающие, когда атака «распределяется» на юнит, срабатывают на шаге 1 шага «[gloss:inflict-damage:Нанесение урона]» (05.04).`,
            },
            {
              title: 'Одна цель',
              body: `Когда модель или юнит атакует одним или несколькими видами оружия, если все атаки этими видами оружия нацелены на один и тот же юнит, говорят, что эта модель или юнит стреляет, сражается или нацеливается на одну цель.

### Часто задаваемые вопросы (FAQs)
**В:** При выборе целевого юнита могут ли вражеская модель, **[gloss:visible:видимая]** моей модели, и вражеская модель, находящаяся в дальности оружия моей модели, быть разными вражескими моделями в одном и том же юните?

**О:** Да

**В:** Может ли модель находиться в дальности оружия, если она не **видима**?

**О:** Да`,
            },
          ],
        },
        {
          title: 'Отыгрыш атак',
          body: `Отыграйте атаки, используя следующую последовательность:

1. **Выберите вражеский юнит:** выберите один из вражеских юнитов, по которому нацелено одно или несколько орудий.

2. **Соберите кубики атаки:** выберите одно оружие, нацеленное на этот юнит, которое ещё не использовалось для совершения атак по нему, и соберите количество D6, равное характеристике **[gloss:attack-dice:A]** этого оружия. Это **[gloss:attack-dice:кубики атаки]** — каждый представляет одну атаку атакующей модели этим оружием.

Если одно или несколько других орудий, нацеленных на этот юнит, совершают [def:identical-attacks:идентичные атаки] к выбранному оружию и эти оружия ещё не использовались для совершения атак по этой цели, они делают это сейчас, и вы также собираете **кубики атаки** этих орудий (например, для трёх орудий, совершающих [def:identical-attacks:идентичные атаки], каждое с характеристикой **[gloss:attack-dice:A]** 2, соберите в общей сложности шесть D6).

3. **Отыгрыш кубиков атаки:** отыграйте последовательность атаки (05) для всех **[gloss:attack-dice:кубиков атаки]**, которые вы только что собрали.

4. **Другие атаки:** следуйте первой из инструкций ниже, которая применяется:
→ Если есть какое-либо оружие, нацеленное на тот же юнит, которое ещё не использовалось для совершения атак, вернитесь к шагу «Соберите кубики атаки».
→ В противном случае, если есть какое-либо оружие с неотыгранными атаками, нацеленное на другой юнит, вернитесь к шагу «Выберите вражеский юнит».
→ В противном случае, если все оружие использовано для совершения всех своих атак, эта последовательность заканчивается.`,
          definitions: [
            {
              id: 'identical-attacks',
              term: 'Идентичные атаки',
              text: 'Идентичные атаки — это те, которые имеют одинаковые характеристики BS/WS, S, AP и D, а также на которые действуют одни и те же применимые способности и правила.',
            },
            {
              id: 'splitting-melee',
              term: 'Разделение атак ближнего боя',
              text: 'При выборе целей, если вы выбираете более одного юнита в качестве цели для оружия ближнего боя, вы должны разделить атаки этого оружия между этими целевыми юнитами. Для этого объявите, сколько атак этого оружия будет совершено против каждого юнита (вы должны объявить как минимум одну атаку на каждый юнит, нацеленный на него).\n\nНа шаге «Соберите кубики атаки» для каждого оружия, которое разделяет свои атаки, собирайте только количество **кубиков атаки** для этого оружия, равное числу атак, которые вы объявили для этого оружия против этой цели.',
            },
          ],
          children: [
            {
              title: 'Идентичные атаки',
              body: `Идентичные атаки — это те, которые имеют одинаковые характеристики **[gloss:bs-ws:BS/WS]**, **[gloss:strength:S]**, **[gloss:armour-penetration:AP]** и **[gloss:damage-roll:D]**, а также на которые действуют одни и те же применимые способности и правила.`,
            },
            {
              title: 'Разделение атак ближнего боя',
              body: `При выборе целей, если вы выбираете более одного юнита в качестве цели для оружия ближнего боя, вы должны разделить атаки этого оружия между этими целевыми юнитами. Для этого объявите, сколько атак этого оружия будет совершено против каждого юнита (вы должны объявить как минимум одну атаку на каждый нацеленный юнит).

На шаге «Соберите кубики атаки» для каждого оружия, которое разделяет свои атаки, собирайте только количество **[gloss:attack-dice:кубиков атаки]** для этого оружия, равное числу атак, которые вы объявили для совершения против этой цели этим оружием.`,
            },
            {
              title: 'Цель больше не доступна или непригодна',
              body: `Если юнит, который был доступной целью для правила или атаки на момент его выбора, перестаёт быть доступной целью (например, потому что правило позволяет ему совершить внефазовый манёвр, выводящий его из дальности), контролирующий игрок может выбрать новые цели.`,
            },
            {
              title: 'Выстрелил (Shot)',
              body: `Когда все атаки, совершённые дистанционным оружием, отыграны, это оружие выстрелило.

Когда всё выбранное дистанционное оружие модели выстрелило, эта модель выстрелила.

Когда все модели в юните, совершающие дистанционные атаки, отыграли все эти атаки, этот юнит выстрелил.

Если юнит был выбран для стрельбы и ни одна из его моделей не совершает атак, он не выстрелил.`,
            },
            {
              title: 'Сразился (Fought)',
              body: `Когда все атаки, совершённые оружием ближнего боя, отыграны, это оружие сразилось.

Когда всё выбранное оружие ближнего боя модели сразилось, эта модель сразилась.

Когда все модели в юните, совершающие атаки ближнего боя, отыграли все эти атаки, этот юнит сразился.

Если юнит был выбран для ближнего боя и ни одна из его моделей не совершает атак, он не сразился.`,
            },
            {
              title: 'Закончил совершать свои атаки',
              body: `Когда все атаки атакующего юнита отыграны, он закончил совершать свои атаки, и этот юнит атаковал.`,
            },
          ],
        },
      ],
    },
    {
      title: 'Последовательность атаки',
      description: 'Каждый раз, когда модели атакуют, вы следуете последовательности, описанной в этом разделе, чтобы определить, наносится ли урон.',
      subsections: [
        {
          title: 'Обзор последовательности',
          body: `Каждый раз, когда активному игроку даётся указание отыграть последовательность атаки, он выполняет шаги, описанные ниже. На каждом шаге, если необходимо бросить более одного кубика, все эти броски совершаются одновременно.
▪ 1. Hit Rolls (**броски на попадание**)
▪ 2. Wound Rolls (**броски на ранение**)
▪ 3. Save Rolls (**спас-броски**)
▪ 4. Inflict Damage (нанесение урона)`,
          note: `Критические попадания(Critical Hits) и критические ранения(Critical Wounds): критические попадания(Critical Hits) по-прежнему являются попаданиями, а критические ранения(Critical Wounds) — ранениями. Кроме того, другие правила могут быть активированы критическим попаданием или критическим ранением, например, Смертельные попадания (Lethal Hits) и Опустошительные раны (Devastating Wounds).`,
        },
        {
          title: 'Hit Rolls (броски на попадание)',
          body: `Сделайте один [gloss:hit-roll:бросок на попадание] для каждого [gloss:attack-dice:кубика атаки], бросив один D6. Для каждого результата проверьте, провален он или является попаданием, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → FAILS (Провал)
◆ Unmodified 6 (Немодифицированный) → CRITICAL HIT (Крит)
◆ Равна или превышает характеристику [gloss:bs-ws:BS/WS] этой атаки → HIT (Попадание)
◆ Любой другой результат → FAILS (Провал)`,
          children: [
            {
              title: 'Критические попадания и критические ранения (Critical Hits and Critical Wounds)',
              body: `**Критические попадания** по-прежнему являются попаданиями, а **критические ранения** — ранениями. Кроме того, другие правила могут быть активированы **критическим попаданием** или **критическим ранением**, например, [LETHAL HITS] и [DEVASTATING WOUNDS] (24).`,
            },
          ],
        },
        {
          title: 'Wound Rolls (броски на ранение)',
          body: `Сделайте один [gloss:wound-roll:бросок на ранение] для каждого попадания, бросив один D6. Для каждого результата проверьте, провален он или является ранением, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → FAILS (Провал)
◆ Unmodified 6 (Немодифицированный) → CRITICAL WOUND (Крит)
◆ Равна или превышает требуемый результат (см. таблицу ниже) → WOUND (Рана)
◆ Любой другой результат → FAILS (Провал)`,
          children: [
            {
              title: 'Несколько характеристик стойкости',
              body: `При отыгрыше атак, нацеленных на юнит, в котором модели имеют две или более разные характеристики **[gloss:toughness:T]**, следуйте первой применимой инструкции ниже:
▪ Если целевой юнит — **[gloss:attached-unit:составной юнит]**, используйте наивысшую характеристику **[gloss:toughness:T]** среди моделей-**[gloss:bodyguard:телохранителей]** в этом юните, находящихся на поле боя.
▪ Используйте наивысшую характеристику **[gloss:toughness:T]** среди моделей в этом юните, находящихся на поле боя.`,
            },
          ],
        },
        {
          title: 'Save Rolls (спас-броски)',
          body: `**[gloss:opposing-player:Противостоящий игрок]** отыгрывает следующую последовательность:

1. Создайте группы: разделите все модели в целевом юните на следующие группы, столько раз, сколько необходимо:
▪ По одной группе для каждой модели **[gloss:character:CHARACTER]**.
▪ Одна группа для всех остальных моделей с одинаковыми характеристиками W, Sv и InSv.

2. Порядок распределения: объявите порядок, в котором эти группы будут получать атаки, применяя все следующее:
▪ Если группа не-**[gloss:character:CHARACTER]** содержит модель, которая потеряла одну или несколько ран, эта группа должна быть первой в порядке распределения.
▪ Ни одна группа **[gloss:character:CHARACTER]** не может быть раньше в порядке распределения, чем группа не-**[gloss:character:CHARACTER]**.
▪ Группы **[gloss:character:CHARACTER]**, содержащие модель, которая потеряла одну или несколько ран, должны быть раньше в порядке распределения, чем группы **[gloss:character:CHARACTER]**, не содержащие раненых моделей.

3. Сделайте **спас-броски**(Save Rolls): противостоящий игрок делает один [gloss:save-roll:спас-бросок] для каждой атаки, которая ранила цель, бросив один D6.`,
          children: [
            {
              title: 'Saving Throw (спас-бросок)',
              body: `Термин «saving throw» — это то же самое, что и **спас-бросок**.`,
            },
          ],
        },
        {
          title: 'Нанесение урона',
          body: `Противостоящий игрок отыгрывает следующую последовательность для каждого **спас-броска**, работая от самого низкого результата(ов) к самому высокому результату(ам), пока все атаки не будут отыграны или все модели в целевом юните не будут **[gloss:destroyed:уничтожены]** — в последнем случае любые избыточные атаки теряются.

1. Выберите модель: выберите одну модель в текущей **[gloss:allocation-group:группе распределения]** (см. справа); это должна быть модель, которая потеряла одну или несколько ран, если возможно.
2. Проверьте [gloss:save-roll:спас-бросок]: для каждого результата проверьте, наносит ли эта атака урон или проваливается, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → INFLICTS DAMAGE (Наносит урон)
◆ Неуязвимый спас-бросок(Invulnerable Save): модели в текущей группе распределения имеют характеристику InSv, и результат равен или превышает эту характеристику → FAILS (Провал)
◆ Save и AP: после модификации результата AP атакующего оружия он равен или превышает характеристику Sv моделей в текущей группе распределения → FAILS (Провал)
◆ Любой другой результат → INFLICTS DAMAGE (Наносит урон)

3. Отыграйте урон: если эта атака наносит урон, выбранная модель теряет количество ран, равное характеристике D этой атаки. Если это снижает оставшиеся раны модели до 0 или ниже, она **[gloss:destroyed:уничтожена]**.

Пример: характеристика AP -1 изменит [gloss:save-roll:спас-бросок] с 3 на 2. Для моделей с характеристикой Sv 2+ или лучше эта атака будет неудачной.`,
          children: [
            {
              title: 'Текущая группа распределения',
              body: `Первая группа в порядке распределения становится текущей группой. Когда все модели в группе распределения **[gloss:destroyed:уничтожены]**, следующая группа в порядке распределения становится текущей.`,
            },
            {
              title: 'Изменение урона',
              body: `См. Модификаторы (02.02.01).`,
            },
            {
              title: 'Получил урон',
              body: `Если атака достигает шага «Отыгрыш урона» (Resolve Damage) последовательности атаки (05.04), модель, которой была распределена эта атака, получила урон, даже если эта модель впоследствии использует правило, чтобы проигнорировать нанесённые раны, или использует правило, благодаря которому эти раны не теряются.`,
            },
            {
              title: 'Уничтожение (Destroyed)',
              body: `На протяжении битвы модели получают повреждения, теряют раны и **[gloss:destroyed:уничтожаются]**. Когда каждая модель в юните **уничтожена**, этот юнит **уничтожен**.

Когда модель **уничтожена**, сначала отыграйте любые правила, которые срабатывают, когда она **уничтожена**, затем она убирается с поля боя. Если такие правила применяются и если модель была **уничтожена** в результате атаки, если не указано иное, эти правила отыгрываются и модель убирается только после того, как атаки атакующего юнита отыграны. Если не указано иное, **уничтоженные** модели и юниты не могут использовать способности или быть выбраны или стать целью для правил.

Некоторые правила срабатывают, только если вражеская модель или юнит были **уничтожены** вами или моделью или юнитом из вашей армии. Это означает, что вражеская модель или юнит были **уничтожены** атакой, совершённой моделью из вашей армии, или вашим правилом игрока. Вражеские модели или юниты, **уничтоженные** любым другим способом, не считаются **уничтоженными** вами или моделью или юнитом из вашей армии.`,
            },
            {
              title: 'Бой после смерти (Fight On Death)',
              body: `Некоторые правила позволяют моделям атаковать после того, как они были **[gloss:destroyed:уничтожены]**. Когда модель под таким эффектом **уничтожена**, не убирайте её из игры.

Эти модели остаются на поле боя, пока их юнит не будет **[gloss:selected-to-attack:выбран для атаки]** и не атакует, или до конца фазы (что наступит раньше). Любые правила, срабатывающие при **уничтожении** этих моделей, отыгрываются, а затем эти **уничтоженные** модели убираются.

Если правило предписывает **уничтоженной** модели сражаться сразу после атакующего юнита, вместо этого эта модель не убирается с поля боя до тех пор, пока юнит этой модели не сразится, или до конца фазы (что наступит раньше). Это позволяет моделям в юните сражаться все сразу, и **[gloss:stratagem:стратагемы]**, нацеленные на этот юнит, также будут влиять на эту **уничтоженную** модель.`,
            },
            {
              title: 'Измерение до уничтоженной модели или юнита',
              body: `Когда игроку нужно измерить расстояние до **[gloss:destroyed:уничтоженной]** модели, этот игрок может измерять до любой точки, которую занимала база этой модели (или любой части этой модели, если у неё нет базы или она является **[gloss:vehicle:VEHICLE]**, исключая модели **[gloss:walker:WALKER]**, у которых есть база), до того как она была **уничтожена**.

Когда игроку нужно измерить расстояние до **уничтоженного** юнита, он измеряет до последней модели, **уничтоженной** в этом юните.`,
            },
          ],
        },
        {
          title: 'Пример: совершение атак',
          body: `### 1. ВЫБОР ОРУЖИЯ
{red:КРАСНЫЙ} юнит атакует. Следующее оружие выбрано для атак:
▪ 2 boltguns (B)
▪ 2 bolt pistols (BP)
▪ 1 heavy bolter (HB)

### 2. ВЫБОР ЦЕЛЕЙ
{blue:СИНИЙ} юнит выбран в качестве цели. Юнит **[gloss:visible:видим]** всем моделям в атакующем юните. Все выбранное оружие находится в пределах дальности, за исключением одного болт-пистолета. В результате это оружие не будет совершать атак.

### 3. СОВЕРШЕНИЕ АТАК
Здесь есть только один вражеский юнит, являющийся целью, поэтому контролирующий игрок теперь выбирает **[gloss:attack-dice:кубики атаки]**:
▪ Пять **кубиков атаки** собраны для болтганов и болт-пистолетов, которые имеют характеристики **[gloss:attack-dice:A]** 2 и 1 соответственно и все совершают [def:identical-attacks:идентичные атаки].
▪ Три **кубика атаки** собраны для тяжёлого болтера, который имеет характеристику **[gloss:attack-dice:A]** 3, но не совершает **идентичных атак**.`,
        },
        {
          title: 'Пример: отыгрыш кубиков атаки',
          body: `### 1. HIT ROLLS (**БРОСКИ НА ПОПАДАНИЕ**)
Контролирующий игрок решает сначала сделать пять **бросков на попадание** для болтганов и болт-пистолета. Характеристика **[gloss:ballistic-skill:BS]** оружия 3+. Четыре атаки попадают в цель.

### 2. WOUND ROLLS (БРОСКИ НА РАНЕНИЕ)
Контролирующий игрок делает четыре **броска на ранение**. Оружие имеет характеристику **[gloss:strength:S]** 4, а целевой юнит — характеристику **[gloss:toughness:T]** 3, поэтому для ранения требуются результаты 3+. Три атаки ранят цель.

### 3. SAVE ROLLS (СПАС-БРОСКИ)
Контролирующий игрок целевого юнита делает три **спас-броска**.

### 4. INFLICT DAMAGE (НАНЕСЕНИЕ УРОНА)
▪ Самый низкий результат меньше как характеристики **[gloss:invulnerable-save:InSv]**, так и **[gloss:save-roll:Sv]** цели, поэтому эта атака наносит урон. Это снижает модель, которой была назначена эта атака, до 0 ран, что **уничтожает** её.
▪ Следующий по величине результат меньше характеристики **[gloss:invulnerable-save:InSv]** цели, но больше её характеристики **[gloss:save-roll:Sv]** 3+; эта атака проваливается.
▪ Другой результат больше характеристики **[gloss:invulnerable-save:InSv]** цели 5+; эта атака также проваливается.`,
        },
        {
          title: 'Пример: отыгрыш других атак',
          body: `### 1. HIT ROLLS (**БРОСКИ НА ПОПАДАНИЕ**)
Затем контролирующий игрок делает три **броска на попадание** для тяжёлого болтера. Характеристика **[gloss:ballistic-skill:BS]** оружия 4+. Две атаки попадают в цель.

### 2. WOUND ROLLS (БРОСКИ НА РАНЕНИЕ)
Контролирующий игрок делает два **броска на ранение**. Оружие имеет характеристику **[gloss:strength:S]** 5, поэтому для ранения требуются результаты 3+. Обе атаки ранят цель.

### 3. SAVE ROLLS (СПАС-БРОСКИ)
Контролирующий игрок целевого юнита делает два **спас-броска**.

### 4. INFLICT DAMAGE (НАНЕСЕНИЕ УРОНА)
▪ Самый низкий результат, __после модификации характеристикой **[gloss:armour-penetration:AP]** атакующего оружия -1__, становится меньше характеристики **[gloss:save-roll:Sv]** цели 3+, поэтому эта атака наносит урон. Это снижает модель, которой была назначена эта атака, до 0 ран, что **уничтожает** её.
▪ Другой результат равен характеристике **[gloss:invulnerable-save:InSv]** цели 5+; эта атака проваливается.`,
        },
        {
          title: 'Пример: атака присоединённых юнитов',
          body: `### 1. ВЫБОР ОРУЖИЯ
{red:КРАСНЫЙ} юнит атакует. Следующее оружие выбрано для атак:
▪ 7 boltguns (B)
▪ 1 plasma pistol (PP)
▪ 2 heavy bolters (HB)

### 2. ВЫБОР ЦЕЛЕЙ
{blue:СИНИЙ} юнит выбран в качестве цели. Это присоединённый юнит (19), сформированный из юнита Серафим и Святой Селестины (с двумя её Геминами Суперии). Юнит **видим** всем моделям в атакующем юните, и все выбранное оружие находится в пределах дальности.

### 3. СОВЕРШЕНИЕ АТАК
Нацелен только один вражеский юнит, поэтому контролирующий игрок теперь выбирает **кубики атаки**. Он решает сначала отыграть атаки тяжёлых болтеров, каждый из которых имеет характеристику **[gloss:attack-dice:A]** 3, поэтому берётся шесть **кубиков атаки**.
**Кубики атаки** для остального оружия будут выбраны после того, как атаки тяжёлых болтеров будут отыграны (см. напротив), следующим образом:
▪ 14 **кубиков атаки** для болтганов, каждый из которых имеет характеристику **[gloss:attack-dice:A]** 2.
▪ Один **кубик атаки** для плазма-пистолета, который имеет характеристику **[gloss:attack-dice:A]** 1.`,
        },
        {
          title: 'Пример: группы распределения',
          body: `### 1. СОЗДАТЬ ГРУППЫ И ОБЪЯВИТЬ ПОРЯДОК
Контролирующий игрок целевого юнита делит его на группы: одну, содержащую Святую Селестину, одну, содержащую Гемин Суперии, и одну, содержащую Серафим. Затем он объявляет порядок распределения, выбирая сначала Гемин Суперию (1), надеясь, что их лучшие характеристики **[gloss:save-roll:Sv]** и **[gloss:invulnerable-save:InSv]** выдержат атаки. Серафим должны быть выбраны вторыми (2), так как Святая Селестина является моделью **[gloss:character:CHARACTER]**, поэтому должна быть последней в порядке (3).

### 2. ВЫБОР КУБИКОВ АТАКИ
Атаки тяжёлых болтеров ранили цель пять раз, поэтому контролирующий игрок целевого юнита делает пять **[gloss:save-roll:спас-бросков]**.
Атаки отыгрываются по одной, от самых низких **спас-бросков** к самым высоким:
▪ Два результата 1 назначаются первыми текущей группе распределения (Гемины Суперии). Оба наносят урон, и обе Гемины Суперии **уничтожены**.
▪ Результат 3 теперь назначается Серафим, которые стали текущей группой распределения. __После модификации характеристикой **[gloss:armour-penetration:AP]** атакующего оружия -1__ он также наносит урон, **уничтожая** одну модель Серафим.
▪ Оставшиеся атаки проваливаются, поэтому дальнейшего урона не наносится.

### 3. ВЫБРАТЬ СЛЕДУЮЩУЮ ГРУППУ КУБИКОВ АТАКИ И ПОВТОРИТЬ`,
        },
      ],
      woundTable: {
        headers: ['Сила (Strength) vs Живучесть (Toughness)', 'Требуемый результат'],
        rows: [
          ['Сила ВДВОЕ (или более) превышает Живучесть', '2+'],
          ['Сила БОЛЬШЕ Живучести', '3+'],
          ['Сила РАВНА Живучести', '4+'],
          ['Сила МЕНЬШЕ Живучести', '5+'],
          ['Сила равна ПОЛОВИНЕ (или меньше) Живучести', '6+'],
        ],
      },
    },
    {
      title: 'Другие понятия',
      description: 'Этот раздел содержит некоторые дополнительные концепции правил, которые наиболее часто используются при совершении атак.',
      subsections: [
        {
          title: 'Видимость',
          body: `**[gloss:line-of-sight:Линия обзора]** используется для определения видимости между моделями. Чтобы наблюдающая модель имела **[gloss:line-of-sight:линию обзора]**, необходимо провести воображаемую прямую линию шириной 1 мм от любой части этой модели до любой части наблюдаемой модели. Эта линия является **[gloss:line-of-sight:линией обзора]**. При этом другие модели в юните наблюдающей модели и в юните наблюдаемой модели игнорируются.

Другие модели и юниты могут быть либо **[gloss:visible:видимыми]**, либо **[gloss:fully-visible:полностью видимыми]** для наблюдающей модели, как показано ниже.

[img:/images/visibility/model-visible-ru.jpg|Диаграмма видимости — модель частично видима]

[img:/images/visibility/model-fully-visible-ru.jpg|Диаграмма видимости — модель полностью видима]

[img:/images/visibility/unit-visible-ru.jpg|Диаграмма видимости — юнит видим для наблюдателя]

[img:/images/visibility/unit-fully-visible-ru.jpg|Диаграмма видимости — юнит полностью видим для наблюдателя]`,
          note: `Рельеф применяет дополнительные правила к видимости (13.07).`,
          children: [
            {
              title: 'Описание видимых юнитов',
              body: `Когда правило ссылается на **[gloss:visible:видимый]** юнит, но не указывает, каким юнитам этот юнит должен быть **видим**, он должен быть **видим** юниту, использующему это правило.`,
              example: `Вы нацеливаетесь на союзный юнит **[gloss:stratagem:стратагемой]**, которая гласит «выберите один **видимый** вражеский юнит». Этот вражеский юнит должен быть **видим** союзному юниту, на который вы нацелились этой **стратагемой**.`,
            },
          ],
        },
        {
          title: 'Смертельные раны (Mortal Wounds)',
          body: `Некоторые атаки или правила наносят **[gloss:mortal-wound:смертельные раны]** юнитам. Каждый раз, когда юнит получает одну или несколько [gloss:mortal-wound:смертельных ран], его контролирующий игрок должен отыграть следующую последовательность действий для каждой из этих [gloss:mortal-wound:смертельных ран], пока либо все они не будут нанесены или этот юнит не будет уничтожен:

1. Выберите модель: выберите одну модель в этом юните, следуя первой инструкции ниже, которая будет применима:
→ Если не-CHARACTER(non-CHARACTER) модель в этом юните потеряла одну или несколько ран, вы должны выбрать эту модель.
→ В противном случае, если этот юнит содержит одну или несколько не-CHARACTER(non-CHARACTER) моделей, вы должны выбрать одну из этих моделей.
→ В противном случае, если одна или несколько моделей CHARACTER в этом юните потеряли одну или несколько ран, вы должны выбрать одну из этих моделей.
→ В противном случае, вы должны выбрать одну модель CHARACTER в этом юните.

2. Отыграйте урон: выбранная модель теряет 1 рану. Если это снижает оставшиеся раны модели до 0, она **уничтожена**.

### Смертельные раны и обычный урон
При отыгрыше [gloss:attack-dice:кубиков атаки], если эти атаки наносят смесь как [gloss:mortal-wound:смертельных ран], так и обычного урона, сначала нанесите весь обычный урон, затем нанесите все **[gloss:mortal-wound:смертельные раны]**.`,
          children: [
            {
              title: 'Обычный урон',
              body: `Обычный урон — это урон, нанесённый модели в результате характеристики **[gloss:damage-roll:D]** оружия, а не другими средствами, такими как **[gloss:mortal-wound:смертельные раны]**. **Смертельные раны**, нанесённые в дополнение к обычному урону от атаки, являются частью этой же атаки.

### Часто задаваемые вопросы (FAQs)
**В:** У меня есть правило, срабатывающее, когда **[gloss:mortal-wound:смертельная рана]** распределяется на модель — когда это происходит?

**О:** Когда вы выбираете модель на шаге «Выбор модели» (Select Model step) раздела **[gloss:mortal-wound:Смертельные раны]** (06.02).`,
            },
          ],
        },
        {
          title: 'Hazard Rolls (проверка опасности)',
          body: `Чтобы выполнить **[gloss:hazard-roll:проверку опасности]** для юнита, бросьте один D6: на 1-2 проверка провалена, и этот юнит страдает от 1 **[gloss:mortal-wound:смертельной раны]** или 3 [gloss:mortal-wound:смертельных ран] вместо этого, если каждая модель в этом юните является MONSTER/VEHICLE(MONSTER/VEHICLE). Если для юнита требуется более одной **проверки опасности**, сделайте все эти броски одновременно.`,
          children: [
            {
              title: 'Проверка опасности (Hazardous Test)',
              body: `Термин «проверка опасности» (Hazardous test) — это то же самое, что **[gloss:hazard-roll:проверка опасности]**.

### Часто задаваемые вопросы (FAQs)
**В:** Если правило говорит, что мой юнит должен сделать **проверку опасности**, делает ли каждая модель в юните **проверку опасности**?

**О:** Нет, юнит сделает 1 одну **проверку опасности**.

**В:** Я провалил **проверки опасности** от оружия [HAZARDOUS] — должны ли эти **[gloss:mortal-wound:смертельные раны]** распределяться на модели с оружием [HAZARDOUS]?

**О:** Нет, вы распределяете **смертельные раны** на юнит согласно разделу **[gloss:mortal-wound:Смертельные раны]** (06.02). (Это символизирует, как Боб-гвардеец подбирает плазменное ружьё павшего товарища по отряду, или как искажающая сила Джеймса-чародея Хаоса затягивает его последователей в варп.)`,
            },
          ],
        },
      ],
    },
  ],
}
