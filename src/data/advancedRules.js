export const advancedRules = {
  en: [
    {
      id: '17',
      num: '17',
      title: 'Monsters and Vehicles',
      page: 62,
      description: 'Due to their imposing bulk and implacable nature, Monsters and Vehicles function differently on the battlefield. This section details the additional rules required to use these units in your games.',
      subsections: [
        {
          id: 'section-17-01',
          sectionNum: '17.01',
          title: 'Moving Monsters and Vehicles',
          body: `Each time you make a **normal** or **[gloss:advance-move:advance move]** with a unit, MONSTER/VEHICLE models in that unit can be moved through friendly and enemy models (excluding other MONSTER/VEHICLE models).`,
        },
        {
          id: 'section-17-02',
          sectionNum: '17.02',
          title: 'Frame',
          body: `Some models do not have a base; many of these are MONSTER/VEHICLE models. Such models have the FRAME keyword, as do some other large models. Whenever a rule refers to a model's position in relation to anything else on the battlefield (e.g. when measuring distances), if that model has the FRAME keyword, unless otherwise stated, measure to and from the closest point on that model (so not necessarily from its base, if it has one).

When rotating a FRAME model as part of a move, if that model does not have a base, turn it any amount around its central axis, while keeping it upright.`,
        },
        {
          id: 'section-17-03',
          sectionNum: '17.03',
          title: 'Shooting at Engaged Monsters and Vehicles',
          body: `In your Shooting phase, enemy MONSTER/VEHICLE units that are **[gloss:engaged:engaged]** can be selected as targets of ranged attacks (excluding attacks made with [BLAST] weapons).

Each time a model makes a ranged attack that targets such a unit, subtract 1 from the **[gloss:hit-roll:hit roll]** (excluding attacks made with [CLOSE-QUARTERS] weapons by models in a unit **engaged** with the target).

[img:/images/monsters/engaged-monsters-vehicles-shooting-diagram.jpg|Engaged monsters and vehicles — shooting hit roll penalty]

The VEHICLE can shoot at INFANTRY unit **A** using **close-quarters shooting**. While resolving those attacks, subtract 1 from **hit rolls** (excluding attacks made with [CLOSE-QUARTERS] weapons).

INFANTRY unit **A** can shoot at the VEHICLE using **normal shooting**. While resolving those attacks, subtract 1 from **hit rolls**. As the VEHICLE is **engaged**, [BLAST] weapons cannot target it, but can target other **unengaged** units.

The VEHICLE can shoot at INFANTRY unit **B** using **close-quarters shooting**. While resolving those attacks, subtract 1 from **hit rolls**. As the INFANTRY unit is **engaged**, [BLAST] weapons cannot target it, but can target other **unengaged** units.

INFANTRY unit **B** is **engaged**, but can shoot at the VEHICLE using **close-quarters shooting**. While doing so, it can only make attacks with its [CLOSE-QUARTERS] weapons and can only target the VEHICLE it is **engaged** with.`,
          children: [
            {
              id: 'section-17-03-01',
              sectionNum: '17.03.01',
              title: 'Shooting While Engaged With Monsters/Vehicles',
              fromApp: true,
              body: `A unit that is **engaged** with an enemy MONSTER/VEHICLE unit is still **[gloss:not-eligible-to-shoot:not eligible to shoot]**, and so cannot make ranged attacks against that MONSTER/VEHICLE unit, unless that unit is **eligible to shoot** while **engaged** (e.g. because it is using **[gloss:close-quarters:close-quarters shooting]**).`,
            },
          ],
        },
      ],
    },
    {
      id: '18',
      num: '18',
      title: 'Transports',
      page: 64,
      description: 'TRANSPORT models can carry passengers across the battlefield. This section explains how to use such models in your battles, and how units can embark within and disembark from them.',
      subsections: [
        {
          id: 'section-18-01',
          sectionNum: '18.01',
          title: 'Transport Capacity',
          body: `TRANSPORT models have a **[gloss:transport-capacity:transport capacity]** listed on their datasheet. This determines the type and maximum number of friendly models that are **[gloss:eligible-to-embark:eligible to embark]** within them. More than one unit can be embarked within the same TRANSPORT model at the same time, provided it has sufficient **transport capacity**.

Before the battle, in the [gloss:declare-battle-formations:Declare Battle Formations] step, your units can start embarked within any friendly TRANSPORT model that has sufficient **transport capacity** remaining for the whole unit.

A friendly unit must be embarked within each friendly DEDICATED TRANSPORT model. At the end of this step, each friendly DEDICATED TRANSPORT model without an embarked unit is **[gloss:destroyed:destroyed]**, but they do not trigger rules that are triggered when a model is **destroyed**.`,
        },
        {
          id: 'section-18-02',
          sectionNum: '18.02',
          title: 'Embarking',
          body: `Once the first battle round has started, a friendly unit can [gloss:embark:embark] within a friendly TRANSPORT model after making a **normal**, **advance** or **[gloss:fall-back-move:fall-back move]**, if **all** of the following conditions apply:
▪ Each model in that unit is within 3" of that TRANSPORT.
▪ That unit was not set up on the battlefield this turn.
▪ That unit is **eligible to embark** within that TRANSPORT, as described on that TRANSPORT's datasheet.
▪ That TRANSPORT has sufficient remaining **transport capacity** for each model in that unit.

When a unit embarks, the active player removes that unit from the battlefield and places it to one side — it is now embarked within that TRANSPORT and is not on the battlefield.`,
          children: [
            {
              id: 'section-18-02-01',
              sectionNum: '18.02.01',
              title: 'Able To Embark',
              fromApp: true,
              body: `A unit is able to embark if it meets all of the conditions in Embarking (18.02). Note that one or more of these conditions may be modified by other rules, in which case a unit must satisfy those modified conditions in addition to any unmodified conditions to be able to embark.

### FAQs
**Q:** If a rule says a unit can embark into a TRANSPORT in a turn that unit disembarked, does this ignore the core rules restriction on embarking in a turn that unit made a set up move (see 18.02)?

**A:** Yes`,
            },
          ],
        },
        {
          id: 'section-18-03',
          sectionNum: '18.03',
          title: 'Disembarking',
          body: `In the active player's Movement phase, each friendly unit embarked within a TRANSPORT model can disembark from it by making a **disembark move** (see below).

If a TRANSPORT model is **[gloss:destroyed:destroyed]**, before removing it from the battlefield, the active player must make an **emergency disembark move** (see opposite) with each unit embarked within it.

### FAQs
**Q:** If a unit makes any disembark move in a turn (i.e. Disembark move, Emergency Disembark move, etc.), has it disembarked that turn?

**A:** Yes.`,
        },
        {
          id: 'section-18-04',
          sectionNum: '18.04',
          title: 'Disembark Move',
          body: `◈ SET-UP DISTANCE | Rapid/**Tactical Disembark**: 3"; **Combat Disembark**: 6"
◈ ELIGIBLE IF | All of the following apply to your unit:
▪ Embarked within a TRANSPORT model that is on the battlefield.
▪ Did not embark within that TRANSPORT this phase.
▪ That TRANSPORT has not made an **advance** or **fall-back** move this phase.
◈ EFFECT | Your unit is set up as described in Set Up (03.02).
◈ BEFORE MOVING | Select **disembark mode** in the following order:
▪ **Rapid Disembark:** If that TRANSPORT made a **normal** or **[gloss:ingress-move:ingress move]** this phase, you must select this mode.
▪ **Tactical Disembark:** Otherwise, if that TRANSPORT **[gloss:remain-stationary:remained stationary]** or has not yet been **[gloss:selected-to-move:selected to move]** this phase, and you can set up your unit as described below, you must select this mode.
▪ **Combat Disembark:** Otherwise, you must select this mode. Make a **hazard roll** (06.03) for each model in your unit.
◈ WHILE MOVING | Set up each model in your unit wholly within the **[gloss:set-up-distance:set-up distance]** of that TRANSPORT.
▪ **Rapid Disembark** (after **ingress move**): each model must follow the same rules and restrictions that TRANSPORT had to follow while resolving that **ingress move**.
▪ **Combat Disembark:** each model can be set up **engaged** with one or more enemy units that TRANSPORT is **engaged** with.
◈ AFTER MOVING
▪ **Rapid Disembark:** until the end of the turn, your unit is not **eligible to declare a charge**.
▪ **Tactical Disembark:** select your unit to make a **normal** or **advance move**.
▪ **Combat Disembark:** your unit is **[gloss:battle-shocked:battle-shocked]** and, until the end of the turn, is not **eligible to declare a charge**.`,
          seeAlso: ['Hazard Rolls 06.03'],
        },
        {
          id: 'section-18-05',
          sectionNum: '18.05',
          title: 'Emergency Disembark Move',
          body: `◈ SET-UP DISTANCE | 6"
◈ ELIGIBLE IF | Your unit is embarked within a TRANSPORT model that was just **destroyed**.
◈ EFFECT | Your unit is set up as described in Set Up (03.02).
◈ BEFORE MOVING | Make a **hazard roll** (06.03) for each model in your unit.
◈ WHILE MOVING | Set up each model in your unit:
▪ Wholly within the **set-up distance** of that TRANSPORT, and as close as possible to that TRANSPORT.
▪ **Or:** If the above is not possible while remaining **[gloss:unengaged:unengaged]**, set up that model wholly within the **set-up distance** of that TRANSPORT, as close as possible to that TRANSPORT, and **engaged**.
▪ Each model that still cannot be set up is **destroyed**.
◈ AFTER MOVING | Your unit is **battle-shocked** and, until the end of the turn, it is not **eligible to declare a charge**.`,
        },
      ],
    },
    {
      id: '19',
      num: '19',
      title: 'Attached Units',
      page: 66,
      description: 'The heroes of your army rarely fight alone. Instead, they typically lead bands of warriors, forming an attached unit that acts as a single entity. This section explains how to form attached units and how they function on the battlefield.',
      subsections: [
        {
          id: 'section-19-01',
          sectionNum: '19.01',
          title: 'Forming Attached Units',
          body: `Some units have the **[gloss:leader:Leader]** or **[gloss:support:Support]** ability listed on their datasheet. Such units are known as **leader** units and **support** units respectively. Both of these abilities allow such units to **[gloss:lead:lead]** other friendly units (known as **[gloss:bodyguard:bodyguard]** units) to form **attached** units. An **attached** unit is a single unit for all rules purposes. **Leader** and **support** units can only lead specific **bodyguard** units, as listed in the Warhammer 40,000 app.

Before the battle, in the Muster Armies step, for each **leader** and **support** unit in your army, you can select one friendly **bodyguard** unit that unit can **lead**. That unit will then **lead** that **bodyguard** unit for the battle and form an **attached** unit with it.

Unless otherwise stated, each **bodyguard** unit can only have one **leader** unit and one **support** unit attached to it.

### FAQs
**Q:** The Munitorium Field Manual shows my unit can attach to different units than are on its datasheet — which do I use?

**A:** Use the Munitorium Field Manual.`,
          seeAlso: ['Leader 24.22', 'Support 24.34'],
          children: [
            {
              id: 'section-19-01-01',
              sectionNum: '19.01.01',
              title: 'Attached Units After Their Bodyguard Unit is Destroyed',
              fromApp: true,
              body: `Some units have rules stating that when the **bodyguard** unit in an **attached** unit is **destroyed**, **leader/support** units that were attached to them become separate units with their original **[gloss:starting-strength:starting strengths]**.

When the **bodyguard** unit in an **attached** unit affected by such a rule is **destroyed**, all of those **leader/support** units remain a single unit for all rules purposes.`,
            },
          ],
        },
        {
          id: 'section-19-02',
          sectionNum: '19.02',
          title: 'Attacking Attached Units',
          sideImage: {
            src: '/images/attached/attacking-attached-units-diagram.jpg',
            alt: 'Attacking Attached Units diagram',
            width: '60%',
            shared: true,
          },
          body: `Each time an attack targets an **attached** unit, if that unit contains one or more **bodyguard** models, use the highest **T** characteristic of the **bodyguard** models in that unit while resolving that attack, even if a **leader/support** unit in that **attached** unit has a different **T** characteristic. If that unit only contains **leader/support** models, use the highest **T** characteristic of those models while resolving that attack instead.

Rules that are triggered when a unit is **destroyed** are only triggered when the last model that started the battle in an **attached** unit is **destroyed**.`,
        },
        {
          id: 'section-19-03',
          sectionNum: '19.03',
          title: 'Keywords in Attached Units',
          body: `An **attached** unit has all of the keywords of all of its component units. As such, an **attached** unit is affected by any rule that applies to units with any of those keywords. Note that models in an **attached** unit do not gain the keywords of other models in that unit that they do not already have. Remember that attacks target units, not models.`,
          example: `An **attached** unit contains a **leader** model with the [gloss:psyker:PSYKER] keyword. While that model is part of that unit, that unit has the PSYKER keyword, even if the **bodyguard** models do not have that keyword. If that unit is attacked by a weapon with the [ANTI-PSYKER 4+] ability, any unmodified **[gloss:wound-roll:wound roll]** of 4+ made against that unit is a **[gloss:critical-wound:critical wound]**, even if the attack itself is not allocated to that **leader** model.`,
        },
        {
          id: 'section-19-04',
          sectionNum: '19.04',
          title: 'Abilities in Attached Units',
          body: `Abilities/rules that affect a single specified model (e.g. from an **[gloss:enhancement:enhancement]** or an item of wargear) only ever apply to that model, even while part of an **attached** unit.

Otherwise, abilities/rules that affect a unit (or models in it) apply to every model in an **attached** unit, until the source of that ability/rule is **destroyed**, as shown in the table below.

In all of the above cases, if that last model was **destroyed** as the result of an attack, the ability it was conferring upon the **attached** unit applies until the attacking unit has resolved all of its attacks.`,
          note: `* This means **leader/support** units continue to benefit from their own "while this model is leading a unit" abilities even after their **bodyguard** unit is **destroyed**, provided they started the battle in an **attached** unit. Should those models later be **revived**, those abilities will once more apply to their **attached** unit.`,
          children: [
            {
              id: 'section-19-04-01',
              sectionNum: '19.04.01',
              title: 'Only In Death Does Duty End',
              fromApp: true,
              body: `**[gloss:leader:Leader]** and **[gloss:support:support]** units often have abilities that make the models they are leading more powerful. In the same way, some **bodyguard** units' abilities can enhance the power of those leading them. Abilities in Attached Units (19.04) means that once the models conferring such effects are **destroyed**, that **attached** unit does not continue to benefit from them. Should those models later be **revived**, however, those abilities will once more apply to their **attached** unit.`,
            },
          ],
        },
      ],
      abilitiesTable: {
        title: 'Abilities in Attached Units',
        note: '* Leader/support units continue to benefit from their own "while this model is leading a unit" abilities even after the bodyguard unit is destroyed.',
        headers: ['Source of Ability/Rule', 'Applies to Attached Unit Until...'],
        rows: [
          ['Leader/support unit', 'The last model in that leader/support unit is destroyed*'],
          ['Bodyguard unit (e.g. from a datasheet ability)', 'The last model in that bodyguard unit is destroyed'],
          ['A specific model (e.g. **[gloss:bearer:bearer]** of an enhancement or an item of wargear)', 'That model is destroyed'],
        ],
      },
    },
    {
      id: '20',
      num: '20',
      title: 'Strategic Reserves',
      page: 68,
      description: 'Strategic reserves are units that arrive on the battlefield at different times, either because they were held back during deployment, or because they are using special abilities to reposition themselves.',
      subsections: [
        {
          id: 'section-20-01',
          sectionNum: '20.01',
          title: 'Placing Units in Strategic Reserves',
          body: `Before the battle, in the [gloss:declare-battle-formations:Declare Battle Formations] step, you can select one or more friendly units (excluding [gloss:fortification:FORTIFICATIONS]) to place in **[gloss:strategic-reserves:strategic reserves]**. Instead of setting up these units on the battlefield during deployment, place them to one side; they are **strategic reserves** units, and will arrive later in the battle.

Unless otherwise stated, the combined points value of all of your **strategic reserves** units (including those embarked within [gloss:transport:TRANSPORTS] that are themselves placed in **strategic reserves**) cannot exceed 50% of your points limit for your battle size.`,
          children: [
            {
              id: 'section-20-01-01',
              sectionNum: '20.01.01',
              title: 'Reserves',
              fromApp: true,
              body: `The term 'Reserves' is the same as **strategic reserves**.`,
            },
            {
              id: 'section-20-01-02',
              sectionNum: '20.01.02',
              title: 'Strategic Reserves at the End of the Battle',
              fromApp: true,
              body: `At the end of the final turn, units in **strategic reserves** are **destroyed**, but they do not trigger rules that apply when a model is **destroyed**.`,
            },
          ],
        },
        {
          id: 'section-20-02',
          sectionNum: '20.02',
          title: 'Repositioned Units',
          body: `Some rules allow units to be removed from the battlefield and placed in **strategic reserves** during the battle. Units that use such rules are known as **repositioned** units. In addition to any other rules that apply to such units (such as where they can or cannot arrive), all of the following rules apply to them:
▪ If used in the Movement phase, such rules can be used on units that have already moved that phase.
▪ A **repositioned** unit that is set up in the same turn in which it made an **advance**, **fall-back** or **disembark move** has still made an **advance**, **fall-back** or **disembark move** that turn.
▪ When they are removed from the battlefield, any rules that are affecting such units for a specified duration or under specified circumstances continue to affect them while that duration and/or those circumstances apply.`,
          example: `A unit that was within range of an **[gloss:aura:aura ability]** when removed from the battlefield would no longer be affected by that **aura ability** if it is no longer within range of it when it makes an **ingress move**, but a unit that was **battle-shocked** when removed from the battlefield would still be **battle-shocked** if it makes an **ingress move** in the same turn.`,
        },
        {
          id: 'section-20-03',
          sectionNum: '20.03',
          title: 'Arriving from Strategic Reserves',
          body: `To arrive on the battlefield, each **strategic reserves** unit must make an **ingress move** (see below). Unless otherwise stated, they can only do so from the second battle round onwards.

At the end of the third battle round, unless otherwise stated, all **strategic reserves** units that have not made one or more **ingress moves** are **destroyed**, with the following exceptions:
▪ Units embarked within [gloss:transport:TRANSPORTS] that have made an **ingress move** during the battle.
▪ **Repositioned** units.`,
          children: [
            {
              id: 'section-20-03-01',
              sectionNum: '20.03.01',
              title: 'Set Up As Reinforcements',
              fromApp: true,
              body: `If a rule mentions a unit being set up on the battlefield as [gloss:reinforcements:Reinforcements], it means a unit that made an **ingress move**.`,
            },
          ],
        },
        {
          id: 'section-20-04',
          sectionNum: '20.04',
          title: 'Ingress Move',
          body: `◈ SET-UP DISTANCE | 6"
◈ ELIGIBLE IF | Your unit is in **strategic reserves** and is not embarked within a TRANSPORT that is also in **strategic reserves**.
◈ EFFECT | Your unit is set up as described in Set Up (03.02).
◈ WHILE MOVING | Set up your unit wholly within 6" of one or more battlefield edges and more than 8" horizontally from all enemy units.
▪ **Before the Third Battle Round:** while doing so, no models can be set up within your opponent's [gloss:deployment-zone:deployment zone].
◈ AFTER MOVING | Unless otherwise stated, until the start of the next Charge phase, your unit is not eligible to make any other type of move.`,
        },
      ],
    },
    {
      id: '21',
      num: '21',
      title: 'Flying and Surging',
      page: 70,
      description: 'This section supplements the basic rules for moving models, explaining how some units can fly over obstacles or surge closer to the enemy.',
      subsections: [
        {
          id: 'section-21-01',
          sectionNum: '21.01',
          title: 'Surge Moves',
          body: `Some rules allow a unit to make a **[gloss:surge-move:surge move]**, as described below.`,
        },
        {
          id: 'section-21-02',
          sectionNum: '21.02',
          title: 'Surge Move',
          body: `◈ MAXIMUM DISTANCE | As stated in the rule allowing this **move type**.
◈ ELIGIBLE IF | All of the following apply.
▪ The rule allowing this **move type** has been triggered.
▪ Your unit is not **battle-shocked**.
▪ Your unit is **unengaged**.
▪ Your unit has not moved this phase.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select the closest enemy unit to be the **[gloss:surge-target:surge target]**.
◈ WHILE MOVING
▪ Each model must end its move **engaged** with the **surge target** if possible.
▪ Each model that cannot end its move **engaged** with the **surge target** must end its move as close as possible to the **surge target**.
◈ AFTER MOVING
▪ Your unit cannot be **engaged** with one or more enemy units that were not the **surge target**.
▪ Your unit cannot move again this phase.

[img:/images/surge/making-a-surge-move.jpg|Making a surge move — valid target and move diagram]`,
        },
        {
          id: 'section-21-03',
          sectionNum: '21.03',
          title: 'Flying Models',
          body: `Models with the **[gloss:fly:FLY]** keyword, and units such models are part of, are said to be able to FLY. Some rules also refer to such models/units as FLYING models/FLYING units.

Models with the FLY keyword can **[gloss:take-to-the-skies:take to the skies]** when making a **normal**, **advance**, **fall-back** or **[gloss:charge-move:charge move]**. Each time a FLYING unit is selected to make such a move, before moving any models in that unit, the active player can declare that it will **take to the skies**. If it does, while resolving that move:
▪ Subtract 2" from the **[gloss:maximum-distance:maximum distance]**.
▪ Each time a FLYING model moves:
▫ Ignore all vertical distance for the purposes of how far it has moved.
▫ It can move through all types of model (including enemy models and MONSTER/VEHICLE models).
▫ It can move horizontally and vertically through all categories of **[gloss:terrain-feature:terrain feature]**.

[img:/images/surge/taking-to-the-skies-diagram.jpg|Taking to the skies — FLY movement through terrain and models]

This Riptide Battlesuit can FLY. It makes an **advance move** with a **maximum distance** of 16".

Before moving the unit, the active player declares that it will **take to the skies**. That move's **maximum distance** is reduced to 14", but while making that move, the Riptide Battlesuit can move through all enemy units (including VEHICLES) and all **terrain features**, ignoring any vertical distance that would normally be counted to ascend and descend **terrain features**.`,
          seeAlso: ['Surge Moves 21.01'],
        },
      ],
    },
    {
      id: '22',
      num: '22',
      title: 'Other Rules and Abilities',
      page: 72,
      description: 'In addition to the core abilities presented elsewhere, many units have access to other rules and types of abilities that function as described below.',
      subsections: [
        {
          id: 'section-22-01',
          sectionNum: '22.01',
          title: 'Aura Abilities',
          body: `Abilities that affect models or units within a stated range are **aura abilities**, and are tagged with the word 'Aura'.

While a model with an **aura ability** is on the battlefield, it is always within range of its own **aura ability**.

A unit can be affected by more than one **aura ability** at a time, but if a unit is within range of the same **aura ability** more than once, that **aura ability** only applies to that unit once.`,
        },
        {
          id: 'section-22-02',
          sectionNum: '22.02',
          title: 'Faction Abilities',
          body: `Some abilities are common to each unit that belongs to a particular faction — these are **[gloss:faction-abilities:faction abilities]** (also known as **[gloss:army-rules:army rules]**), and are listed in the **Faction Abilities** section of a datasheet.

Unless otherwise stated, a unit's **faction abilities** only apply if the **army faction** you selected while mustering your army matches a faction keyword listed on that unit's datasheet.`,
        },
        {
          id: 'section-22-03',
          sectionNum: '22.03',
          title: 'Psychic Abilities',
          body: `Abilities tagged with the word 'Psychic' are **psychic abilities**. If a **psychic ability** causes a model to lose one or more wounds, each of those wounds is said to be inflicted by a **psychic attack** (this can be important for the triggering of other rules).`,
        },
        {
          id: 'section-22-04',
          sectionNum: '22.04',
          title: 'Wargear Abilities',
          body: `Abilities that are gained when a unit (or one of its models) has a particular item of wargear are **wargear abilities**, and are listed in the **Wargear Abilities** section of a datasheet.

If a unit has an item of wargear that has a **wargear ability**, that ability applies to the unit. If a model within a unit has an item of wargear that has a **wargear ability**, that model is the 'bearer' of that item of wargear and that ability applies until that model is **destroyed**.`,
        },
        {
          id: 'section-22-05',
          sectionNum: '22.05',
          title: 'Plunging Fire',
          body: `Each time a model makes a ranged attack that targets a **[gloss:visible:visible]** unit containing one or more models on **ground level**, if one or more of the following conditions apply, improve the **BS** characteristic of that attack by 1:
▪ The attacking model is on a section of a **terrain feature** that is 3" or more in height.
▪ The attacking model has the **[gloss:towering:TOWERING]** keyword and the target unit is within 12".

[img:/images/fire/plunging-fire-diagram.jpg|Plunging fire — elevation and range requirements]

All the attacking models in unit **A** are on a section of **terrain feature** that is 3" or more in height, and the target unit contains models on ground level, so **Plunging Fire** improves the **BS** characteristic of those attacks by 1.

Attacking model **B** is on ground level, but has the TOWERING keyword. The target unit is within 12" and contains models on ground level, so **Plunging Fire** improves the **BS** characteristic of those attacks by 1.`,
          seeAlso: ['Aircraft 23.03'],
        },
      ],
    },
    {
      id: '23',
      num: '23',
      title: 'Aircraft',
      page: 74,
      description: 'AIRCRAFT fulfil a unique but limited role on Warhammer 40,000 battlefields. Hurtling through the skies while they duel one another, strafe ground forces or perform bombing runs, they are constantly on the move.',
      subsections: [
        {
          id: 'section-23-01',
          sectionNum: '23.01',
          title: 'Deployment',
          body: `In the [gloss:declare-battle-formations:Declare Battle Formations] step, all AIRCRAFT units must be placed in **strategic reserves** (20.01).`,
          seeAlso: ['Strategic Reserves 20.01'],
        },
        {
          id: 'section-23-02',
          sectionNum: '23.02',
          title: 'Movement',
          body: `▪ AIRCRAFT units are only eligible to make an **ingress move** (20.04); they are **not** eligible to make any other type of move.
▪ At the end of your opponent's turn, all AIRCRAFT units in your army that are on the battlefield must be placed in **strategic reserves**.
▪ Each time a unit makes any type of move, its models can be moved through AIRCRAFT models.
▪ Each time a unit makes a **pile-in**, **consolidation** or **surge move**, unless that unit can FLY, while making that move, ignore AIRCRAFT units for the purposes of selecting enemy units and determining the closest enemy unit.
▪ Being **engaged** solely with one or more AIRCRAFT units does not prevent a unit from being eligible to make a **normal** or **advance move**.`,
        },
        {
          id: 'section-23-03',
          sectionNum: '23.03',
          title: 'Shooting',
          body: `The **[gloss:plunging-fire:Plunging Fire]** rule (22.05) has no effect on attacks made by, or targeting, AIRCRAFT units.`,
          seeAlso: ['Plunging Fire 22.05'],
        },
        {
          id: 'section-23-04',
          sectionNum: '23.04',
          title: 'Charging and Fighting',
          body: `▪ AIRCRAFT units are **not** **eligible to declare a charge**, and can only make melee attacks that target FLYING units.
▪ Only FLYING units can select AIRCRAFT units as a **[gloss:charge-target:charge target]**, and only FLYING models can make melee attacks that target AIRCRAFT units.`,
        },
      ],
    },
  ],

  ru: [
    {
      id: '17',
      num: '17',
      title: 'Монстры и техника',
      page: 62,
      description: 'Благодаря своим внушительным размерам и неукротимой природе монстры и техника действуют на поле боя иначе. Этот раздел содержит дополнительные правила, необходимые для использования этих отрядов в ваших играх.',
      subsections: [
        {
          id: 'section-17-01',
          sectionNum: '17.01',
          title: 'Движение монстров и техники',
          body: `Каждый раз, когда вы совершаете **[gloss:normal-move:обычный манёвр]** или **[gloss:advance-move:продвижение]** отрядом, модели MONSTER/VEHICLE в этом отряде могут проходить сквозь дружественные и вражеские модели (кроме других моделей MONSTER/VEHICLE).`,
        },
        {
          id: 'section-17-02',
          sectionNum: '17.02',
          title: 'Рама (Frame)',
          body: `Некоторые модели не имеют базы; многие из них — модели MONSTER/VEHICLE. Такие модели имеют ключевое слово РАМА (FRAME), как и некоторые другие крупные модели. Каждый раз, когда правило ссылается на положение модели относительно чего-либо ещё на поле боя (например, при измерении расстояний), если эта модель имеет ключевое слово РАМА, если не указано иное, измеряйте до ближайшей точки этой модели и от неё (не обязательно от базы, если она есть).

При повороте модели РАМА как части манёвра, если у этой модели нет базы, поверните её на любой угол вокруг центральной оси, сохраняя вертикальное положение.`,
        },
        {
          id: 'section-17-03',
          sectionNum: '17.03',
          title: 'Стрельба по связанным монстрам и технике',
          body: `В вашу фазу стрельбы вражеские отряды MONSTER/VEHICLE, находящиеся **[gloss:engaged:в ближнем бою]**, могут быть выбраны целью дальних атак (кроме атак оружием [BLAST]).

Каждый раз, когда модель совершает дальнюю атаку, нацеленную на такой отряд, вычтите 1 из **[gloss:hit-roll:броска на попадание]** (кроме атак оружием [БЛИЖНЯЯ СТРЕЛЬБА] (CLOSE-QUARTERS), совершаемых моделями из отряда, **[gloss:engaged:находящегося в ближнем бою]** с целью).

[img:/images/monsters/engaged-monsters-vehicles-shooting-diagram.jpg|Монстры и техника в контакте — штраф к броску на попадание]

VEHICLE может стрелять по отряду INFANTRY **A**, используя **ближнюю стрельбу**. Разрешая эти атаки, вычтите 1 из **бросков на попадание** (кроме атак оружием [БЛИЖНЯЯ СТРЕЛЬБА] (CLOSE-QUARTERS)).

Отряд INFANTRY **A** может стрелять по VEHICLE, используя **обычную стрельбу**. Разрешая эти атаки, вычтите 1 из **бросков на попадание**. Поскольку VEHICLE **находится в ближнем бою**, оружие [BLAST] не может выбрать его целью, но может выбрать целью другие **не связанные боем** отряды.

VEHICLE может стрелять по отряду INFANTRY **B**, используя **ближнюю стрельбу**. Разрешая эти атаки, вычтите 1 из **бросков на попадание**. Поскольку отряд INFANTRY **находится в ближнем бою**, оружие [BLAST] не может выбрать его целью, но может выбрать целью другие **не связанные боем** отряды.

Отряд INFANTRY **B** **находится в ближнем бою**, но может стрелять по VEHICLE, используя **ближнюю стрельбу**. При этом он может атаковать только оружием [БЛИЖНЯЯ СТРЕЛЬБА] (CLOSE-QUARTERS) и может выбрать целью только тот VEHICLE, с которым **находится в ближнем бою**.`,
          children: [
            {
              title: 'Стрельба в ближнем бою с монстрами/техникой',
              body: `Отряд, **[gloss:engaged:находящийся в ближнем бою]** с вражеским отрядом MONSTER/VEHICLE, всё равно **[gloss:not-eligible-to-shoot:не может стрелять]**, а значит, не может совершать дальние атаки против отряда MONSTER/VEHICLE, если только он **может стрелять** будучи **[gloss:engaged:в ближнем бою]** (например, потому что использует **[gloss:close-quarters:ближнюю стрельбу]**).`,
            },
          ],
        },
      ],
    },
    {
      id: '18',
      num: '18',
      title: 'Транспорты',
      page: 64,
      description: 'Модели TRANSPORT могут перевозить пассажиров по полю боя. Этот раздел объясняет, как использовать такие модели в ваших играх и как отряды могут погружаться в них и высаживаться из них.',
      subsections: [
        {
          id: 'section-18-01',
          sectionNum: '18.01',
          title: 'Вместимость транспорта',
          body: `Модели [gloss:transport:TRANSPORT] имеют **[gloss:transport-capacity:вместимость транспорта]**, указанную на их карточке данных. Это определяет тип и максимальное количество дружественных моделей, **[gloss:eligible-to-embark:которые могут погрузиться]** в них. Более одного отряда может быть погружено в одну модель TRANSPORT одновременно при наличии достаточной **вместимости транспорта**.

До битвы, на шаге «[gloss:declare-battle-formations:Объявление боевых построений]», ваши отряды могут начать погружёнными в любую дружественную модель TRANSPORT с достаточной оставшейся **вместимостью транспорта** для всего отряда.

Дружественный отряд должен быть погружён в каждую дружественную модель DEDICATED TRANSPORT. В конце этого шага каждая дружественная модель DEDICATED TRANSPORT без погруженного в неё отряда **[gloss:destroyed:уничтожается]**, но это не активирует правила, срабатывающие при **уничтожении** модели.`,
        },
        {
          id: 'section-18-02',
          sectionNum: '18.02',
          title: 'Погрузка',
          body: `После начала первого [gloss:battle-round:раунда боя] дружественный отряд может погрузиться в дружественную модель [gloss:transport:TRANSPORT] после совершения **[gloss:normal-move:обычного манёвра]**, **[gloss:advance-move:продвижения]** или **[gloss:fall-back-move:отступления]**, если применяются **все** следующие условия:
▪ Каждая модель в этом отряде находится в пределах 3" от этого TRANSPORT.
▪ Этот отряд не был расставлен на поле боя в этот ход.
▪ Этот отряд **[gloss:eligible-to-embark:может погрузиться]** в этот TRANSPORT, как описано на его карточке данных.
▪ В этом TRANSPORT достаточно оставшейся **[gloss:transport-capacity:вместимости транспорта]** для каждой модели этого отряда.

Когда отряд грузится, активный игрок убирает его с поля боя и откладывает в сторону — теперь он погружён в этот TRANSPORT и не находится на поле боя.`,
          children: [
            {
              title: 'Может погрузиться',
              body: `Отряд может погрузиться, если он соответствует всем условиям из раздела «[gloss:embark:Погрузка]» (18.02). Обратите внимание, что одно или несколько из этих условий могут быть изменены другими правилами — в таком случае отряд должен удовлетворять этим изменённым условиям в дополнение к любым неизменённым условиям, чтобы иметь возможность погрузиться.

### FAQs
**В:** Если правило говорит, что отряд может погрузиться в TRANSPORT в тот ход, когда он высадился, обходит ли это ограничение основных правил на погрузку в тот ход, когда отряд совершил манёвр расстановки (см. 18.02)?

**О:** Да`,
            },
          ],
        },
        {
          id: 'section-18-03',
          sectionNum: '18.03',
          title: 'Высадка',
          body: `В фазу движения (Movement phase) активного игрока каждый дружественный отряд, погружённый в модель [gloss:transport:TRANSPORT], может высадиться из неё, совершив **[gloss:disembark:манёвр высадки]** (см. ниже).

Если модель TRANSPORT **[gloss:destroyed:уничтожена]**, до её удаления с поля боя активный игрок должен совершить **[gloss:disembark:экстренный манёвр высадки]** (см. напротив) каждым отрядом, погружённым в неё.

### FAQs
**В:** Если юнит совершает любой манёвр высадки за ход (т.е. манёвр высадки, экстренный манёвр высадки и т.д.), считается ли, что он высадился в этот ход?

**О:** Да.`,
        },
        {
          id: 'section-18-04',
          sectionNum: '18.04',
          title: 'Манёвр высадки',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | Стремительная/Тактическая высадка: 3"; Боевая высадка: 6"
◈ УСЛОВИЕ | К вашему отряду применяются все из следующего:
▪ Погружён в модель TRANSPORT, находящуюся на поле боя.
▪ Не грузился в этот TRANSPORT в эту фазу.
▪ Этот [gloss:transport:TRANSPORT] не совершал **[gloss:advance-move:продвижения]** или **[gloss:fall-back-move:отступления]** в эту фазу.
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ПЕРЕД ДВИЖЕНИЕМ | Выберите **[gloss:disembark:режим высадки]** в следующем порядке:
▪ **Стремительная высадка (Rapid Disembark):** Если этот TRANSPORT совершил **[gloss:normal-move:обычный манёвр]** или **[gloss:ingress-move:манёвр прибытия]** в эту фазу, вы должны выбрать этот режим.
▪ **Тактическая высадка (Tactical Disembark):** В противном случае, если этот TRANSPORT **[gloss:remain-stationary:оставался неподвижным]** или ещё не был **[gloss:selected-to-move:выбран для манёвра]** в эту фазу, и вы можете расставить свой отряд, как описано ниже, вы должны выбрать этот режим.
▪ **Боевая высадка (Combat Disembark):** В противном случае вы должны выбрать этот режим. Совершите **[gloss:hazard-roll:бросок на опасность]** (06.03) за каждую модель вашего отряда.
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте каждую модель вашего отряда целиком в пределах **[gloss:set-up-distance:расстояния расстановки]** от этого TRANSPORT.
▪ **Стремительная высадка** (после **манёвра прибытия**): каждая модель должна следовать тем же правилам и ограничениям, которым должен был следовать TRANSPORT при отыгрыше этого манёвра прибытия.
▪ **Боевая высадка:** каждая модель может быть расставлена **[gloss:engaged:в ближнем бою]** с одним или несколькими вражескими отрядами, **находящимися в ближнем бою** с TRANSPORT.
◈ ПОСЛЕ ДВИЖЕНИЯ
▪ **Стремительная высадка:** до конца хода ваш отряд не может объявлять нападение.
▪ **Тактическая высадка:** выберите ваш отряд для совершения **обычного манёвра** или **продвижения**.
▪ **Боевая высадка:** ваш отряд находится **[gloss:battle-shocked:в боевом шоке]** и до конца хода не может объявлять нападение.`,
        },
        {
          id: 'section-18-05',
          sectionNum: '18.05',
          title: 'Экстренный манёвр высадки',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | 6"
◈ УСЛОВИЕ | Ваш отряд погружён в модель [gloss:transport:TRANSPORT], которая только что была **[gloss:destroyed:уничтожена]**.
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ПЕРЕД ДВИЖЕНИЕМ | Совершите **[gloss:hazard-roll:бросок на опасность]** (06.03) за каждую модель вашего отряда.
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте каждую модель вашего отряда:
▪ Целиком в пределах **[gloss:set-up-distance:расстояния расстановки]** от этого TRANSPORT и как можно ближе к нему.
▪ **Или:** Если это невозможно, оставаясь **[gloss:unengaged:не связанным боем]**, расставьте эту модель целиком в пределах **расстояния расстановки** от этого TRANSPORT, как можно ближе к нему, и **[gloss:engaged:связанной боем]**.
▪ Каждая модель, которую всё ещё невозможно расставить, **уничтожается**.
◈ ПОСЛЕ ДВИЖЕНИЯ | Ваш отряд находится **[gloss:battle-shocked:в боевом шоке]** и до конца хода не может объявлять нападение.`,
        },
      ],
    },
    {
      id: '19',
      num: '19',
      title: 'Объединённые отряды',
      page: 66,
      description: 'Герои вашей армии редко сражаются в одиночку. Вместо этого они обычно ведут за собой отряды воинов, формируя объединённый отряд, действующий как единое целое. Этот раздел объясняет, как создавать объединённые отряды и как они функционируют на поле боя.',
      subsections: [
        {
          id: 'section-19-01',
          sectionNum: '19.01',
          title: 'Создание объединённых отрядов',
          body: `Некоторые отряды имеют способность **[gloss:leader:Лидер]** или **[gloss:support:Поддержка]**, указанную на их карточке данных. Такие отряды известны как отряды **лидеров** и отряды **поддержки** соответственно. Обе эти способности позволяют таким отрядам **[gloss:lead:возглавлять]** другие дружественные отряды (известные как отряды **[gloss:bodyguard:телохранителей]**) для создания **[gloss:attached-unit:объединённых]** отрядов. **Объединённый** отряд является единым отрядом для всех игровых целей. Отряды **лидеров** и **поддержки** могут возглавлять только определённые отряды **телохранителей**, как указано в приложении Warhammer 40,000.

До битвы, на шаге «Формирование армий» (Muster Armies step), для каждого отряда **лидера** и **поддержки** в вашей армии вы можете выбрать один дружественный отряд **телохранителей**, который он может **возглавлять**. Этот отряд будет **возглавлять** этот отряд **телохранителей** в битве и создаст с ним **объединённый** отряд.

Если не указано иное, каждый отряд **телохранителей** может иметь только один присоединённый отряд **лидера** и один отряд **поддержки**.

### FAQs
**В:** Munitorium Field Manual показывает, что мой юнит может присоединяться к другим юнитам, чем указано в его листе данных — что мне использовать?

**О:** Используйте Munitorium Field Manual.`,
          children: [
            {
              title: 'Объединённые отряды после уничтожения отряда телохранителей',
              body: `Некоторые отряды имеют правила, гласящие, что когда отряд **[gloss:bodyguard:телохранителей]** в **[gloss:attached-unit:объединённом]** отряде **[gloss:destroyed:уничтожен]**, отряды **лидера/поддержки** (leader/support), присоединённые к ним, становятся отдельными отрядами со своей изначальной **[gloss:starting-strength:начальной численностью]**.

Когда отряд **[gloss:bodyguard:телохранителей]** в **объединённом** отряде, на который влияет такое правило, **уничтожен**, все эти отряды **лидера/поддержки** остаются единым отрядом для всех игровых целей.`,
            },
          ],
        },
        {
          id: 'section-19-02',
          sectionNum: '19.02',
          title: 'Атака объединённых отрядов',
          body: `Каждый раз, когда атака нацелена на **[gloss:attached-unit:объединённый]** отряд, если он содержит одну или несколько моделей **[gloss:bodyguard:телохранителей]**, используйте наивысшую характеристику **T** моделей **телохранителей** в этом отряде при отыгрыше этой атаки, даже если отряд **лидера/поддержки** (leader/support) в этом **объединённом** отряде имеет другую характеристику **T**. Если отряд содержит только модели **лидера/поддержки**, вместо этого используйте наивысшую характеристику **T** этих моделей.

Правила, срабатывающие при **[gloss:destroyed:уничтожении]** отряда, срабатывают только при **уничтожении** последней модели, начавшей битву в составе **объединённого** отряда.`,
        },
        {
          id: 'section-19-03',
          sectionNum: '19.03',
          title: 'Ключевые слова в объединённых отрядах',
          body: `**[gloss:attached-unit:Объединённый]** отряд имеет все ключевые слова всех составляющих его отрядов. Таким образом, на **объединённый** отряд влияет любое правило, применяемое к отрядам с любым из этих ключевых слов. Обратите внимание, что модели в **объединённом** отряде не получают ключевых слов других моделей в этом отряде, которых у них ещё нет. Помните, что атаки нацелены на отряды, а не на модели.`,
          example: `**[gloss:attached-unit:Объединённый]** отряд содержит модель **[gloss:leader:лидера]** с ключевым словом [gloss:psyker:PSYKER]. Пока эта модель является частью этого отряда, этот отряд имеет ключевое слово PSYKER, даже если модели **[gloss:bodyguard:телохранителей]** не имеют этого ключевого слова. Если этот отряд атакован оружием со способностью **[ANTI-PSYKER 4+]**, любой неизменённый (unmodified) [gloss:wound-roll:бросок на ранение] 4+ против этого отряда является **[gloss:critical-wound:критическим ранением]**, даже если сама атака не распределяется на модель **лидера**.`,
        },
        {
          id: 'section-19-04',
          sectionNum: '19.04',
          title: 'Способности в объединённых отрядах',
          body: `Способности/правила, влияющие на одну конкретную модель (например, от **[gloss:enhancement:улучшения]** или предмета снаряжения), применяются только к этой модели, даже если она является частью **[gloss:attached-unit:объединённого]** отряда.

В противном случае способности/правила, влияющие на отряд (или модели в нём), применяются к каждой модели в **объединённом** отряде до **[gloss:destroyed:уничтожения]** источника этой способности/правила, как показано в таблице ниже.

Во всех вышеперечисленных случаях, если эта последняя модель была **уничтожена** в результате атаки, способность, которую она предоставляла **объединённому** отряду, действует до тех пор, пока атакующий отряд не отыграет все свои атаки.`,
          note: `* Это означает, что отряды **лидеров/поддержки** (leader/support) продолжают пользоваться своими собственными способностями «пока эта модель ведёт отряд» даже после **[gloss:destroyed:уничтожения]** их отряда **[gloss:bodyguard:телохранителей]**, при условии, что они начали битву в составе **[gloss:attached-unit:объединённого]** отряда. Если эти модели впоследствии будут **[gloss:revive:воскрешены]**, эти способности снова будут применяться к их **объединённому** отряду.`,
          children: [
            {
              title: 'Только смерть прекращает службу (Only In Death Does Duty End)',
              body: `Отряды **[gloss:leader:лидеров]** и **[gloss:support:поддержки]** часто имеют способности, делающие ведомые ими модели сильнее. Точно так же способности некоторых отрядов **[gloss:bodyguard:телохранителей]** могут усиливать ведущих их. Раздел «Способности в объединённых отрядах» (19.04) означает, что как только модели, предоставляющие такие эффекты, **[gloss:destroyed:уничтожены]**, этот **[gloss:attached-unit:объединённый]** отряд перестаёт получать от них пользу. Однако если эти модели позже будут **[gloss:revive:воскрешены]**, эти способности снова будут применяться к их **объединённому** отряду.`,
            },
          ],
        },
      ],
      abilitiesTable: {
        title: 'Способности в объединённых отрядах',
        note: '* Отряды лидеров/поддержки продолжают пользоваться собственными способностями «пока эта модель ведёт отряд» даже после уничтожения отряда телохранителей, при условии, что они начали битву в составе объединённого отряда.',
        headers: ['Источник способности/правила', 'Действует на объединённый отряд до...'],
        rows: [
          ['Отряд лидера/поддержки', 'Уничтожения последней модели в этом отряде лидера/поддержки*'],
          ['Отряд телохранителей (например, от способности карточки данных)', 'Уничтожения последней модели в этом отряде телохранителей'],
          ['Конкретная модель (например, **[gloss:bearer:носитель]** улучшения или предмета снаряжения)', 'Уничтожения этой модели'],
        ],
      },
    },
    {
      id: '20',
      num: '20',
      title: 'Стратегический резерв',
      page: 68,
      description: 'Стратегический резерв — это отряды, прибывающие на поле боя в разное время: либо потому что они были придержаны во время развёртывания, либо потому что используют особые способности для перегруппировки.',
      subsections: [
        {
          id: 'section-20-01',
          sectionNum: '20.01',
          title: 'Размещение отрядов в стратегическом резерве',
          body: `До битвы, на шаге «[gloss:declare-battle-formations:Объявление боевых построений]», вы можете выбрать один или несколько дружественных отрядов (кроме [gloss:fortification:УКРЕПЛЕНИЙ]), чтобы поместить их в **[gloss:strategic-reserves:стратегический резерв]**. Вместо того чтобы расставлять эти отряды на поле боя во время развёртывания, отложите их в сторону — они являются отрядами **стратегического резерва** и прибудут позже в ходе битвы.

Если не указано иное, суммарная стоимость в очках всех ваших отрядов **стратегического резерва** (включая те, что погружены в [gloss:transport:TRANSPORTS], сами помещённые в **стратегический резерв**) не может превышать 50% от вашего лимита очков для вашего размера битвы.`,
          children: [
            {
              title: 'Резервы (Reserves)',
              body: `Термин «Резервы» (Reserves) — это то же самое, что **[gloss:strategic-reserves:стратегические резервы]**.`,
            },
            {
              title: 'Стратегический резерв в конце битвы (Strategic Reserves at the End of the Battle)',
              body: `В конце последнего хода отряды в **стратегическом резерве** считаются **[gloss:destroyed:уничтоженными]**, но это не вызывает срабатывания правил, применяемых при **уничтожении** модели.`,
            },
          ],
        },
        {
          id: 'section-20-02',
          sectionNum: '20.02',
          title: 'Переброшенные отряды',
          body: `Некоторые правила позволяют убирать отряды с поля боя и помещать их в **[gloss:strategic-reserves:стратегический резерв]** во время битвы. Отряды, использующие такие правила, известны как **[gloss:reposition:переброшенные]** отряды. В дополнение к любым другим правилам, применяемым к таким отрядам (например, где они могут или не могут прибыть), к ним применяются все следующие правила:
▪ При использовании в фазу движения (Movement phase) такие правила могут применяться к отрядам, которые уже двигались в эту фазу.
▪ **Переброшенный** отряд, расставленный в том же ходу, в котором он совершил **[gloss:advance-move:продвижение]**, **[gloss:fall-back-move:отступление]** или **[gloss:disembark:манёвр высадки]**, всё равно считается совершившим **продвижение**, **отступление** или **манёвр высадки** в этот ход.
▪ Когда они убираются с поля боя, любые правила, действующие на такие отряды в течение определённого срока или при определённых обстоятельствах, продолжают действовать на них, пока этот срок и/или обстоятельства применяются.`,
          example: `Отряд, находившийся в зоне действия **[gloss:aura:способности ауры]** при удалении с поля боя, больше не будет подвержен этой **способности ауры**, если при совершении **[gloss:ingress-move:манёвра прибытия]** он больше не находится в её зоне действия; однако отряд, находившийся **[gloss:battle-shocked:в боевом шоке]** при удалении с поля боя, всё равно будет **в боевом шоке**, если совершит **манёвр прибытия** в тот же ход.`,
        },
        {
          id: 'section-20-03',
          sectionNum: '20.03',
          title: 'Прибытие из стратегического резерва',
          body: `Для прибытия на поле боя каждый отряд **[gloss:strategic-reserves:стратегического резерва]** должен совершить **[gloss:ingress-move:манёвр прибытия]** (см. ниже). Если не указано иное, они могут сделать это только начиная со второго [gloss:battle-round:раунда боя].

В конце третьего раунда боя, если не указано иное, все отряды **стратегического резерва**, не совершившие одно или несколько **движений прибытия**, **[gloss:destroyed:уничтожаются]** со следующими исключениями:
▪ Отряды, погружённые в [gloss:transport:TRANSPORTS], которые совершили **манёвр прибытия** во время битвы.
▪ **[gloss:reposition:Переброшенные]** отряды.`,
          children: [
            {
              title: 'Расстановка как подкрепление',
              body: `Если правило упоминает отряд, расставляемый на поле боя как [gloss:reinforcements:Подкрепление], это означает отряд, совершивший **[gloss:ingress-move:манёвр прибытия]**.`,
            },
          ],
        },
        {
          id: 'section-20-04',
          sectionNum: '20.04',
          title: 'Манёвр прибытия (Ingress Move)',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | 6"
◈ УСЛОВИЕ | Ваш отряд находится в **[gloss:strategic-reserves:стратегическом резерве]** и не погружён в [gloss:transport:TRANSPORT], также находящийся в **стратегическом резерве**.
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте ваш отряд целиком в пределах 6" от одного или нескольких краёв поля боя и более чем в 8" по горизонтали от всех вражеских отрядов.
▪ **До третьего раунда боя:** при этом ни одна модель не может быть расставлена в [gloss:deployment-zone:зоне развёртывания] противника.
◈ ПОСЛЕ ДВИЖЕНИЯ | Если не указано иное, до начала следующей фазы нападения (Charge phase) ваш отряд не может совершать другие виды манёвров.`,
        },
      ],
    },
    {
      id: '21',
      num: '21',
      title: 'Полёт и стремительный манёвр',
      page: 70,
      description: 'Этот раздел дополняет основные правила движения моделей, объясняя, как некоторые отряды могут пролетать над препятствиями или стремительно приближаться к врагу.',
      subsections: [
        {
          id: 'section-21-01',
          sectionNum: '21.01',
          title: 'Стремительный манёвр (Surge Moves)',
          body: `Некоторые правила позволяют отряду совершить **[gloss:surge-move:стремительный манёвр]**, как описано ниже.`,
        },
        {
          id: 'section-21-02',
          sectionNum: '21.02',
          title: 'Стремительный манёвр (Surge Move)',
          body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Как указано в правиле, разрешающем этот тип манёвра.
◈ УСЛОВИЕ | Применяются все из следующего.
▪ Правило, разрешающее этот тип манёвра, было активировано.
▪ Ваш отряд не **[gloss:battle-shocked:в боевом шоке]**.
▪ Ваш отряд **[gloss:unengaged:не в ближнем бою]**.
▪ Ваш отряд не двигался в эту фазу.
◈ ЭФФЕКТ | Ваш отряд движется, как описано в «Движении» (03).
◈ ПЕРЕД ДВИЖЕНИЕМ | Выберите ближайший вражеский отряд в качестве **[gloss:surge-target:цели стремительного манёвра]**.
◈ ВО ВРЕМЯ ДВИЖЕНИЯ
▪ Каждая модель должна завершить свой манёвр **[gloss:engaged:в ближнем бою]** с **целью стремительного манёвра**, если это возможно.
▪ Каждая модель, не способная завершить манёвр **в ближнем бою** с **целью стремительного манёвра**, должна завершить манёвр как можно ближе к **цели стремительного манёвра**.
◈ ПОСЛЕ ДВИЖЕНИЯ
▪ Ваш отряд не может находиться **в ближнем бою** с одним или несколькими вражескими отрядами, не являвшимися **целью стремительного манёвра**.
▪ Ваш отряд не может двигаться снова в эту фазу.

[img:/images/surge/making-a-surge-move-ru.jpg|Выполнение хода рывка — допустимые цели и движение]`,
        },
        {
          id: 'section-21-03',
          sectionNum: '21.03',
          title: 'Летящие модели',
          body: `Модели с ключевым словом **[gloss:fly:FLY]** и отряды, в состав которых входят такие модели, считаются способными летать. Некоторые правила также называют такие модели/отряды ЛЕТЯЩИМИ (FLYING) моделями/отрядами.

Модели с ключевым словом FLY могут **[gloss:take-to-the-skies:подниматься в небо]** (take to the skies) при совершении **[gloss:normal-move:обычного манёвра]**, **[gloss:advance-move:продвижения]**, **[gloss:fall-back-move:отступления]** или **[gloss:charge-move:манёвра нападения]**. Каждый раз, когда ЛЕТЯЩИЙ (FLYING) отряд выбирается для совершения такого манёвра, до манёвра любых моделей в этом отряде активный игрок может объявить, что он будет **подниматься в небо**. Если он это делает, при отыгрыше этого манёвра:
▪ Вычтите 2" из **[gloss:maximum-distance:максимального расстояния]**.
▪ Каждый раз, когда ЛЕТЯЩАЯ модель движется:
▫ Игнорируйте всё вертикальное расстояние для целей определения пройденного расстояния.
▫ Она может проходить сквозь все типы моделей (включая вражеские модели и модели MONSTER/VEHICLE).
▫ Она может двигаться горизонтально и вертикально через все категории **[gloss:terrain-feature:элементов ландшафта]**.

[img:/images/surge/taking-to-the-skies-diagram.jpg|Взмыть в небо — движение через укрытия и модели]

Этот Riptide Battlesuit может FLY. Он совершает **продвижение** с **максимальным расстоянием** 16".

Перед перемещением отряда активный игрок объявляет, что он будет **подниматься в небо**. **Максимальное расстояние** этого манёвра уменьшается до 14", но при совершении этого манёвра Riptide Battlesuit может проходить сквозь все вражеские отряды (включая VEHICLES) и все **элементы ландшафта**, игнорируя любое вертикальное расстояние, которое обычно учитывалось бы при подъёме и спуске по **элементам ландшафта**.`,
        },
      ],
    },
    {
      id: '22',
      num: '22',
      title: 'Прочие правила и способности',
      page: 72,
      description: 'Помимо базовых способностей, представленных в других разделах, многие отряды имеют доступ к другим правилам и типам способностей, которые функционируют, как описано ниже.',
      subsections: [
        {
          id: 'section-22-01',
          sectionNum: '22.01',
          title: 'Способности ауры',
          body: `Способности, влияющие на модели или отряды в пределах указанной дистанции, являются **[gloss:aura:способностями ауры]** и помечаются словом «Аура».

Пока модель со **способностью ауры** находится на поле боя, она всегда находится в зоне действия собственной **способности ауры**.

На отряд может одновременно действовать более одной **способности ауры**, но если отряд находится в зоне действия одной и той же **способности ауры** более одного раза, эта **способность ауры** применяется к нему только один раз.`,
        },
        {
          id: 'section-22-02',
          sectionNum: '22.02',
          title: 'Фракционные способности',
          body: `Некоторые способности общие для каждого отряда, принадлежащего к определённой фракции, — это **[gloss:faction-abilities:фракционные способности]** (также известные как **[gloss:army-rules:правила армии]**), и они перечислены в разделе «Фракционные способности» карточки данных.

Если не указано иное, **фракционные способности** отряда применяются только в том случае, если **фракция армии** (army faction), выбранная вами при формировании армии, совпадает с ключевым словом фракции, указанным на карточке данных этого отряда.`,
        },
        {
          id: 'section-22-03',
          sectionNum: '22.03',
          title: 'Псайкерские способности',
          body: `Способности, помеченные словом «Псайкер», являются **[gloss:psychic:псайкерскими способностями]**. Если **псайкерская способность** заставляет модель потерять одно или несколько ранений, каждое из этих ранений считается нанесённым **[gloss:psychic:псайкерской атакой]** (это может быть важно для активации других правил).`,
        },
        {
          id: 'section-22-04',
          sectionNum: '22.04',
          title: 'Способности снаряжения',
          body: `Способности, получаемые, когда отряд (или одна из его моделей) имеет определённый предмет снаряжения, являются **способностями снаряжения** (wargear abilities) и перечислены в разделе «Способности снаряжения» карточки данных.

Если отряд имеет предмет снаряжения со **способностью снаряжения**, эта способность применяется к отряду. Если модель в составе отряда имеет предмет снаряжения со **способностью снаряжения**, эта модель является «носителем» этого предмета снаряжения, и способность действует до тех пор, пока эта модель не будет **[gloss:destroyed:уничтожена]**.`,
        },
        {
          id: 'section-22-05',
          sectionNum: '22.05',
          title: 'Стрельба с возвышения',
          body: `Каждый раз, когда модель совершает дальнюю атаку, нацеленную на **[gloss:visible:видимый]** отряд, содержащий одну или несколько моделей на **уровне земли** (ground level), если применяется одно или несколько следующих условий, улучшите характеристику **BS** этой атаки на 1:
▪ Атакующая модель находится на участке **[gloss:terrain-feature:элемента ландшафта]** высотой 3" или более.
▪ Атакующая модель имеет ключевое слово **[gloss:towering:ИСПОЛИНСКИЙ]** (TOWERING), и целевой отряд находится в пределах 12".

[img:/images/fire/plunging-fire-diagram.jpg|Стрельба с возвышения — требования по высоте и дальности]

Все атакующие модели отряда **A** находятся на участке **элемента ландшафта** высотой 3" или более, а целевой отряд содержит модели на уровне земли, поэтому **Стрельба с возвышения** улучшает характеристику **BS** этих атак на 1.

Атакующая модель **B** находится на уровне земли, но имеет ключевое слово **ИСПОЛИНСКИЙ**. Целевой отряд находится в пределах 12" и содержит модели на уровне земли, поэтому **Стрельба с возвышения** улучшает характеристику **BS** этих атак на 1.`,
        },
      ],
    },
    {
      id: '23',
      num: '23',
      title: 'Воздушные суда',
      page: 74,
      description: 'ВОЗДУШНЫЕ СУДА (AIRCRAFT) выполняют уникальную, но ограниченную роль на полях сражений Warhammer 40,000. Мчась сквозь небеса, они сражаются друг с другом, обстреливают наземные силы или наносят бомбовые удары, находясь в постоянном движении.',
      subsections: [
        {
          id: 'section-23-01',
          sectionNum: '23.01',
          title: 'Развёртывание',
          body: `На шаге «[gloss:declare-battle-formations:Объявление боевых построений]» все отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) должны быть помещены в **[gloss:strategic-reserves:стратегический резерв]** (20.01).`,
        },
        {
          id: 'section-23-02',
          sectionNum: '23.02',
          title: 'Движение',
          body: `▪ Отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) имеют право только на **[gloss:ingress-move:манёвр прибытия]** (20.04); они **не** имеют права на другие типы манёвров.
▪ В конце хода вашего противника все отряды ВОЗДУШНЫХ СУДОВ в вашей армии, находящиеся на поле боя, должны быть помещены в **[gloss:strategic-reserves:стратегический резерв]**.
▪ Каждый раз, когда отряд совершает любой вид манёвра, его модели могут проходить сквозь модели ВОЗДУШНЫХ СУДОВ.
▪ Каждый раз, когда отряд совершает **[gloss:pile-in:сближение]**, **[gloss:consolidation:консолидацию]** или **[gloss:surge-move:стремительный манёвр]**, если этот отряд не может FLY, при совершении этого манёвра игнорируйте отряды ВОЗДУШНЫХ СУДОВ для целей выбора вражеских отрядов и определения ближайшего вражеского отряда.
▪ Нахождение **[gloss:engaged:в ближнем бою]** исключительно с одним или несколькими отрядами ВОЗДУШНЫХ СУДОВ не препятствует праву отряда совершать **[gloss:normal-move:обычный манёвр]** или **[gloss:advance-move:продвижение]**.`,
        },
        {
          id: 'section-23-03',
          sectionNum: '23.03',
          title: 'Стрельба',
          body: `Правило «[gloss:plunging-fire:Стрельба с возвышения]» (22.05) не влияет на атаки, совершаемые отрядами ВОЗДУШНЫХ СУДОВ (AIRCRAFT) или нацеленные на них.`,
        },
        {
          id: 'section-23-04',
          sectionNum: '23.04',
          title: 'Нападение и ближний бой',
          body: `▪ Отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) **не могут** объявлять нападение и могут наносить удары в ближнем бою только против ЛЕТЯЩИХ (FLYING) отрядов.
▪ Только ЛЕТЯЩИЕ отряды могут выбирать отряды ВОЗДУШНЫХ СУДОВ в качестве **[gloss:charge-target:цели нападения]**, и только ЛЕТЯЩИЕ модели могут наносить удары в ближнем бою, нацеленные на отряды ВОЗДУШНЫХ СУДОВ.`,
        },
      ],
    },
  ],
}
