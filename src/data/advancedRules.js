export const advancedRules = [
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
        body: `Each time you make a **normal** or **advance move** with a unit, MONSTER/VEHICLE models in that unit can be moved through friendly and enemy models (excluding other MONSTER/VEHICLE models).`,
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
        body: `In your Shooting phase, enemy MONSTER/VEHICLE units that are **engaged** can be selected as targets of ranged attacks.

Each time a model makes a ranged attack that targets such a unit, subtract 1 from the **hit roll** (excluding attacks made with [CLOSE-QUARTERS] weapons by models in a unit **engaged** with the target).

[img:/images/Advanced-rules/engaged-monsters_vehicles-shooting.png]`,
        note: `A unit that is **engaged** with an enemy MONSTER/VEHICLE unit is still not **eligible to shoot**, and so cannot make ranged attacks against that MONSTER/VEHICLE unit, unless that unit is **eligible to shoot** while **engaged** (e.g. because it is using **close-quarters shooting**).`,
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
        body: `TRANSPORT models have a **transport capacity** listed on their datasheet. This determines the type and maximum number of friendly models that are **eligible to embark** within them. More than one unit can be embarked within the same TRANSPORT model at the same time, provided it has sufficient **transport capacity**.

Before the battle, in the Declare Battle Formations step, your units can start embarked within any friendly TRANSPORT model that has sufficient **transport capacity** remaining for the whole unit.`,
      },
      {
        id: 'section-18-02',
        sectionNum: '18.02',
        title: 'Embarking',
        body: `Once the first battle round has started, a friendly unit can embark within a friendly TRANSPORT model after making a **normal**, **advance** or **fall-back move**, if **all** of the following conditions apply:
▪ Each model in that unit is within 3" of that TRANSPORT.
▪ That unit was not set up on the battlefield this turn.
▪ That unit is **eligible to embark** within that TRANSPORT, as described on that TRANSPORT's datasheet.
▪ That TRANSPORT has sufficient remaining **transport capacity** for each model in that unit.

When a unit embarks, the active player removes that unit from the battlefield — it is now embarked within that TRANSPORT and is not on the battlefield.`,
      },
      {
        id: 'section-18-03',
        sectionNum: '18.03',
        title: 'Disembarking',
        body: `In the active player's Movement phase, each friendly unit embarked within a TRANSPORT model can disembark from it by making a **disembark move** (see below).

If a TRANSPORT model is **destroyed**, before removing it from the battlefield, the active player must make an **emergency disembark move** (see opposite) with each unit embarked within it.`,
      },
      {
        id: 'section-18-04',
        sectionNum: '18.04',
        title: 'Disembark Move',
        body: `◈ SET-UP DISTANCE | Rapid/Tactical Disembark: 3"; Combat Disembark: 6"
◈ ELIGIBLE IF | All of the following apply to your unit:
▪ Embarked within a TRANSPORT model that is on the battlefield.
▪ Did not embark within that TRANSPORT this phase.
▪ That TRANSPORT has not made an **advance** or **fall-back** move this phase.
◈ EFFECT | Your unit is set up as described in Set Up (03.02).
◈ BEFORE MOVING | Select **disembark mode** in the following order:
▪ **Rapid Disembark:** If that TRANSPORT made a **normal** or **ingress move** this phase, you must select this mode.
▪ **Tactical Disembark:** Otherwise, if that TRANSPORT **remained stationary** or has not yet been **selected to move** this phase, and you can set up your unit as described below, you must select this mode.
▪ **Combat Disembark:** Otherwise, you must select this mode. Make a **hazard roll** (06.03) for each model in your unit.
◈ WHILE MOVING | Set up each model in your unit wholly within the **set-up distance** of that TRANSPORT.
▪ **Rapid Disembark** (after **ingress move**): each model must follow the same rules and restrictions that TRANSPORT had to follow while resolving that ingress move.
▪ **Combat Disembark:** each model can be set up **engaged** with one or more enemy units that TRANSPORT is **engaged** with.
◈ AFTER MOVING
▪ **Rapid Disembark:** until the end of the turn, your unit is not eligible to declare a charge.
▪ **Tactical Disembark:** select your unit to make a **normal** or **advance move**.
▪ **Combat Disembark:** your unit is **battle-shocked** and, until the end of the turn, is not eligible to declare a charge.`,
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
◈ WHILE MOVING | Set up each model in your unit wholly within the **set-up distance** of that TRANSPORT, and as close as possible to that TRANSPORT. Each model that cannot be set up in this way is **destroyed**.
◈ AFTER MOVING | Your unit is **battle-shocked** and, until the end of the turn, it is not eligible to declare a charge.`,
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
        body: `Some units have the **Leader** or **Support** ability listed on their datasheet. Such units are known as **leader** units and **support** units respectively. Both of these abilities allow such units to **lead** other friendly units (known as **bodyguard** units) to form **attached** units. An **attached** unit is a single unit for all rules purposes. **Leader** and **support** units can only lead specific **bodyguard** units, as listed in the Warhammer 40,000 app.

Before the battle, in the Muster Armies step, for each **leader** and **support** unit in your army, you can select one friendly **bodyguard** unit that unit can **lead**. That unit will then **lead** that **bodyguard** unit for the battle and form an **attached** unit with it.

Unless otherwise stated, each **bodyguard** unit can only have one **leader** unit and one **support** unit attached to it.`,
        seeAlso: ['Leader 24.22', 'Support 24.34'],
      },
      {
        id: 'section-19-02',
        sectionNum: '19.02',
        title: 'Attacking Attached Units',
        sideImage: {
          src: '/images/attack/attacking-attached-units.png',
          alt: 'Attacking Attached Units diagram',
          width: '60%',
        },
        body: `Each time an attack targets an **attached** unit, if that unit contains one or more **bodyguard** models, use the highest **T** characteristic of the **bodyguard** models in that unit while resolving that attack, even if a **leader/support** unit in that **attached** unit has a different **T** characteristic. If that unit only contains **leader/support** models, use the highest **T** characteristic of those models while resolving that attack instead.

Rules that are triggered when a unit is **destroyed** are only triggered when the last model that started the battle in an **attached** unit is **destroyed**.`,
      },
      {
        id: 'section-19-03',
        sectionNum: '19.03',
        title: 'Keywords in Attached Units',
        body: `An **attached** unit has all of the keywords of all of its component units. As such, an **attached** unit is affected by any rule that applies to units with any of those keywords. Note that models in an **attached** unit do not gain the keywords of other models in that unit that they do not already have. Remember that attacks target units, not models.`,
        example: `An **attached** unit contains a **leader** model with the PSYKER keyword. While that model is part of that unit, that unit has the PSYKER keyword, even if the **bodyguard** models do not have that keyword. If that unit is attacked by a weapon with the [ANTI-PSYKER 4+] ability, any unmodified wound roll of 4+ made against that unit is a **critical wound**, even if the attack itself is not allocated to that **leader** model.`,
      },
      {
        id: 'section-19-04',
        sectionNum: '19.04',
        title: 'Abilities in Attached Units',
        body: `Abilities/rules that affect a single specified model (e.g. from an **enhancement** or an item of wargear) only ever apply to that model, even while part of an **attached** unit.

Otherwise, abilities/rules that affect a unit (or models in it) apply to every model in an **attached** unit, until the source of that ability/rule is **destroyed**, as shown in the table below.

In all of the above cases, if that last model was **destroyed** as the result of an attack, the ability it was conferring upon the **attached** unit applies until the attacking unit has resolved all of its attacks.`,
        note: `* This means **leader/support** units continue to benefit from their own "while this model is leading a unit" abilities even after their **bodyguard** unit is **destroyed**, provided they started the battle in an **attached** unit. Should those models later be **revived**, those abilities will once more apply to their **attached** unit.`,
      },
    ],
    abilitiesTable: {
      headers: ['Source of Ability/Rule', 'Applies to Attached Unit Until...'],
      rows: [
        ['Leader/support unit', 'The last model in that leader/support unit is destroyed*'],
        ['Bodyguard unit (e.g. from a datasheet ability)', 'The last model in that bodyguard unit is destroyed'],
        ['A specific model (e.g. bearer of an enhancement or an item of wargear)', 'That model is destroyed'],
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
        body: `Before the battle, in the Declare Battle Formations step, you can select one or more friendly units (excluding FORTIFICATIONS) to place in **strategic reserves**. Instead of setting up these units on the battlefield during deployment, place them to one side; they are **strategic reserves** units, and will arrive later in the battle.

Unless otherwise stated, the combined points value of all of your **strategic reserves** units (including those embarked within TRANSPORTS that are themselves placed in **strategic reserves**) cannot exceed 50% of your points limit for your battle size.`,
      },
      {
        id: 'section-20-02',
        sectionNum: '20.02',
        title: 'Repositioned Units',
        body: `Some rules allow units to be removed from the battlefield and placed in **strategic reserves** during the battle. Units that use such rules are known as **repositioned** units. In addition to any other rules that apply to such units (such as where they can or cannot arrive), all of the following rules apply to them:
▪ If used in the Movement phase, such rules can be used on units that have already moved that phase.
▪ A **repositioned** unit that is set up in the same turn in which it made an **advance**, **fall-back** or **disembark move** has still made an **advance**, **fall-back** or **disembark move** that turn.
▪ When they are removed from the battlefield, any rules that are affecting such units for a specified duration or under specified circumstances continue to affect them while that duration and/or those circumstances apply.`,
        example: `A unit that was within range of an **aura ability** when removed from the battlefield would no longer be affected by that **aura ability** if it is no longer within range of it when it makes an **ingress move**, but a unit that was **battle-shocked** when removed from the battlefield would still be **battle-shocked** if it makes an **ingress move** in the same turn.`,
      },
      {
        id: 'section-20-03',
        sectionNum: '20.03',
        title: 'Arriving from Strategic Reserves',
        body: `To arrive on the battlefield, each **strategic reserves** unit must make an **ingress move** (see below). Unless otherwise stated, they can only do so from the second battle round onwards.

At the end of the third battle round, unless otherwise stated, all **strategic reserves** units that have not made one or more **ingress moves** are **destroyed**, with the following exceptions:
▪ Units embarked within TRANSPORTS that have made an **ingress move** during the battle.
▪ **Repositioned** units.`,
      },
      {
        id: 'section-20-04',
        sectionNum: '20.04',
        title: 'Ingress Move',
        body: `◈ SET-UP DISTANCE | 6"
◈ ELIGIBLE IF | Your unit is in **strategic reserves** and is not embarked within a TRANSPORT that is also in **strategic reserves**.
◈ EFFECT | Your unit is set up as described in Set Up (03.02).
◈ WHILE MOVING | Set up your unit wholly within 6" of one or more battlefield edges and more than 8" horizontally from all enemy units.
▪ **Before the Third Battle Round:** while doing so, no models can be set up within your opponent's deployment zone.
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
        body: `Some rules allow a unit to make a **surge move**, as described below.`,
      },
      {
        id: 'section-21-02',
        sectionNum: '21.02',
        title: 'Surge Move',
        body: `◈ MAXIMUM DISTANCE | As stated in the rule allowing this move type.
◈ ELIGIBLE IF | All of the following apply.
▪ The rule allowing this move type has been triggered.
▪ Your unit is not **battle-shocked**.
▪ Your unit is **unengaged**.
▪ Your unit has not moved this phase.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select the closest enemy unit to be the **surge target**.
◈ WHILE MOVING
▪ Each model must end its move **engaged** with the **surge target** if possible.
▪ Each model that cannot end its move **engaged** with the **surge target** must end its move as close as possible to the **surge target**.
◈ AFTER MOVING
▪ Your unit cannot be **engaged** with one or more enemy units that were not the **surge target**.
▪ Your unit cannot move again this phase.

[img:/images/Advanced-rules/making-a-surge-move.png]`,
      },
      {
        id: 'section-21-03',
        sectionNum: '21.03',
        title: 'Flying Models',
        body: `Models with the FLY keyword can **take to the skies** when making a **normal**, **advance**, **fall-back** or **charge move**. Each time a FLYING unit is selected to make such a move, before moving any models in that unit, the active player can declare that it will **take to the skies**. If it does, while resolving that move:
▪ Subtract 2" from the **maximum distance**.
▪ Each time a FLYING model moves:
▫ Ignore all vertical distance for the purposes of how far it has moved.
▫ It can move through all types of model (including enemy models and MONSTER/VEHICLE models).
▫ It can move horizontally and vertically through all categories of **terrain feature**.

[img:/images/Advanced-rules/taking-to-the-skies.png]`,
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
        body: `Some abilities are common to each unit that belongs to a particular faction — these are **faction abilities** (also known as **army rules**), and are listed in the Faction Abilities section of a datasheet.

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
        body: `Abilities that are gained when a unit (or one of its models) has a particular item of wargear are **wargear abilities**, and are listed in the Wargear Abilities section of a datasheet.

If a unit has an item of wargear that has a **wargear ability**, that ability applies to the unit. If a model within a unit has an item of wargear that has a **wargear ability**, that model is the 'bearer' of that item of wargear and that ability applies until that model is **destroyed**.`,
      },
      {
        id: 'section-22-05',
        sectionNum: '22.05',
        title: 'Plunging Fire',
        body: `Each time a model makes a ranged attack that targets a **visible** unit containing one or more models on **ground level**, if one or more of the following conditions apply, improve the **BS** characteristic of that attack by 1:
▪ The attacking model is on a section of a **terrain feature** that is 3" or more in height.
▪ The attacking model has the TOWERING keyword and the target unit is within 12".

[img:/images/Advanced-rules/plunging-fire.png]`,
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
        body: `In the Declare Battle Formations step, all AIRCRAFT units must be placed in **strategic reserves** (20.01).`,
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
        body: `The Plunging Fire rule (22.05) has no effect on attacks made by, or targeting, AIRCRAFT units.`,
        seeAlso: ['Plunging Fire 22.05'],
      },
      {
        id: 'section-23-04',
        sectionNum: '23.04',
        title: 'Charging and Fighting',
        body: `▪ AIRCRAFT units are **not** eligible to declare a charge, and can only make melee attacks that target FLYING units.
▪ Only FLYING units can select AIRCRAFT units as a **charge target**, and only FLYING models can make melee attacks that target AIRCRAFT units.`,
      },
    ],
  },
]
