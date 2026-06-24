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
          body: `In your Shooting phase, enemy MONSTER/VEHICLE units that are **engaged** can be selected as targets of ranged attacks (excluding attacks made with [BLAST] weapons).

Each time a model makes a ranged attack that targets such a unit, subtract 1 from the **hit roll** (excluding attacks made with [CLOSE-QUARTERS] weapons by models in a unit **engaged** with the target).

[img:/images/monsters/engaged-monsters_vehicles-shooting.jpg|Engaged monsters and vehicles — shooting hit roll penalty]`,
          children: [
            {
              id: 'section-17-03-01',
              sectionNum: '17.03.01',
              title: 'Shooting While Engaged With Monsters/Vehicles',
              fromApp: true,
              body: `A unit that is **engaged** with an enemy MONSTER/VEHICLE unit is still __not__ **eligible to shoot**, and so cannot make ranged attacks against that MONSTER/VEHICLE unit, unless that unit is **eligible to shoot** while **engaged** (e.g. because it is using **close-quarters shooting**).`,
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

If a TRANSPORT model is **destroyed**, before removing it from the battlefield, the active player must make an **emergency disembark move** (see opposite) with each unit embarked within it.`,
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
▪ **Rapid Disembark:** If that TRANSPORT made a **normal** or **ingress move** this phase, you must select this mode.
▪ **Tactical Disembark:** Otherwise, if that TRANSPORT **remained stationary** or has not yet been **selected to move** this phase, and you can set up your unit as described below, you must select this mode.
▪ **Combat Disembark:** Otherwise, you must select this mode. Make a **hazard roll** (06.03) for each model in your unit.
◈ WHILE MOVING | Set up each model in your unit wholly within the **set-up distance** of that TRANSPORT.
▪ **Rapid Disembark** (after **ingress move**): each model must follow the same rules and restrictions that TRANSPORT had to follow while resolving that **ingress move**.
▪ **Combat Disembark:** each model can be set up **engaged** with one or more enemy units that TRANSPORT is **engaged** with.
◈ AFTER MOVING
▪ **Rapid Disembark:** until the end of the turn, your unit is not **eligible to declare a charge**.
▪ **Tactical Disembark:** select your unit to make a **normal** or **advance move**.
▪ **Combat Disembark:** your unit is **battle-shocked** and, until the end of the turn, is not **eligible to declare a charge**.`,
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
▪ **Or:** If the above is not possible while remaining **unengaged**, set up that model wholly within the **set-up distance** of that TRANSPORT, as close as possible to that TRANSPORT, and **engaged**.
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
          body: `Some units have the **Leader** or **Support** ability listed on their datasheet. Such units are known as **leader** units and **support** units respectively. Both of these abilities allow such units to **lead** other friendly units (known as **bodyguard** units) to form **attached** units. An **attached** unit is a single unit for all rules purposes. **Leader** and **support** units can only lead specific **bodyguard** units, as listed in the Warhammer 40,000 app.

Before the battle, in the Muster Armies step, for each **leader** and **support** unit in your army, you can select one friendly **bodyguard** unit that unit can **lead**. That unit will then **lead** that **bodyguard** unit for the battle and form an **attached** unit with it.

Unless otherwise stated, each **bodyguard** unit can only have one **leader** unit and one **support** unit attached to it.`,
          seeAlso: ['Leader 24.22', 'Support 24.34'],
          children: [
            {
              id: 'section-19-01-01',
              sectionNum: '19.01.01',
              title: 'Attached Units After Their Bodyguard Unit is Destroyed',
              fromApp: true,
              body: `Some units have rules stating that when the unit in an **attached** unit is **destroyed**, **leader/support** units that were attached to them become separate units with their original **starting strengths**.

When the **bodyguard** unit in an **attached** unit affected by such a rule is **destroyed**, all of those **leader/support** units remain a single unit for all rules purposes.`,
            },
          ],
        },
        {
          id: 'section-19-02',
          sectionNum: '19.02',
          title: 'Attacking Attached Units',
          sideImage: {
            src: '/images/attached/attacking-attached-units.jpg',
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
          example: `An **attached** unit contains a **leader** model with the PSYKER keyword. While that model is part of that unit, that unit has the PSYKER keyword, even if the **bodyguard** models do not have that keyword. If that unit is attacked by a weapon with the [ANTI-PSYKER 4+] ability, any unmodified **wound roll** of 4+ made against that unit is a **critical wound**, even if the attack itself is not allocated to that **leader** model.`,
        },
        {
          id: 'section-19-04',
          sectionNum: '19.04',
          title: 'Abilities in Attached Units',
          body: `Abilities/rules that affect a single specified model (e.g. from an **enhancement** or an item of wargear) only ever apply to that model, even while part of an **attached** unit.

Otherwise, abilities/rules that affect a unit (or models in it) apply to every model in an **attached** unit, until the source of that ability/rule is **destroyed**, as shown in the table below.

In all of the above cases, if that last model was **destroyed** as the result of an attack, the ability it was conferring upon the **attached** unit applies until the attacking unit has resolved all of its attacks.`,
          note: `* This means **leader/support** units continue to benefit from their own "while this model is leading a unit" abilities even after their **bodyguard** unit is **destroyed**, provided they started the battle in an **attached** unit. Should those models later be **revived**, those abilities will once more apply to their **attached** unit.`,
          children: [
            {
              id: 'section-19-04-01',
              sectionNum: '19.04.01',
              title: 'Only In Death Does Duty End',
              fromApp: true,
              body: `**Leader** and **support** units often have abilities that make the models they are leading more powerful. In the same way, some **bodyguard** units' abilities can enhance the power of those leading them. Abilities in Attached Units (19.04) means that once the models conferring such effects are **destroyed**, that **attached** unit does not continue to benefit from them. Should those models later be **revived**, however, those abilities will once more apply to their **attached** unit.`,
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
          children: [
            {
              id: 'section-20-01-01',
              sectionNum: '20.01.01',
              title: 'Reserves',
              fromApp: true,
              body: `The term 'Reserves' is the same as **strategic reserves**.`,
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
          children: [
            {
              id: 'section-20-03-01',
              sectionNum: '20.03.01',
              title: 'Set Up As Reinforcements',
              fromApp: true,
              body: `If a rule mentions a unit being set up on the battlefield as Reinforcements, it means a unit that made an **ingress move**.`,
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
          body: `◈ MAXIMUM DISTANCE | As stated in the rule allowing this **move type**.
◈ ELIGIBLE IF | All of the following apply.
▪ The rule allowing this **move type** has been triggered.
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

[img:/images/surge/making-a-surge-move.jpg|Making a surge move — valid target and move diagram]`,
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

[img:/images/surge/taking-to-the-skies.jpg|Taking to the skies — FLY movement through terrain and models]`,
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
          body: `Some abilities are common to each unit that belongs to a particular faction — these are **faction abilities** (also known as **army rules**), and are listed in the **Faction Abilities** section of a datasheet.

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
          body: `Each time a model makes a ranged attack that targets a **visible** unit containing one or more models on **ground level**, if one or more of the following conditions apply, improve the **BS** characteristic of that attack by 1:
▪ The attacking model is on a section of a **terrain feature** that is 3" or more in height.
▪ The attacking model has the TOWERING keyword and the target unit is within 12".

[img:/images/fire/plunging-fire.jpg|Plunging fire — elevation and range requirements]`,
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
          body: `The **Plunging Fire** rule (22.05) has no effect on attacks made by, or targeting, AIRCRAFT units.`,
          seeAlso: ['Plunging Fire 22.05'],
        },
        {
          id: 'section-23-04',
          sectionNum: '23.04',
          title: 'Charging and Fighting',
          body: `▪ AIRCRAFT units are **not** **eligible to declare a charge**, and can only make melee attacks that target FLYING units.
▪ Only FLYING units can select AIRCRAFT units as a **charge target**, and only FLYING models can make melee attacks that target AIRCRAFT units.`,
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
          body: `Каждый раз, когда вы совершаете **обычный манёвр** (normal move) или **продвижение** (advance move) отрядом, модели МОНСТР/ТЕХНИКА (MONSTER/VEHICLE) в этом отряде могут проходить сквозь дружественные и вражеские модели (кроме других моделей МОНСТР/ТЕХНИКА).`,
        },
        {
          id: 'section-17-02',
          sectionNum: '17.02',
          title: 'Рама (Frame)',
          body: `Некоторые модели не имеют базы; многие из них — модели МОНСТР/ТЕХНИКА (MONSTER/VEHICLE). Такие модели имеют ключевое слово РАМА (FRAME), как и некоторые другие крупные модели. Каждый раз, когда правило ссылается на положение модели относительно чего-либо ещё на поле боя (например, при измерении расстояний), если эта модель имеет ключевое слово РАМА, если не указано иное, измеряйте до ближайшей точки этой модели и от неё (не обязательно от базы, если она есть).

При повороте модели РАМА как части манёвра, если у этой модели нет базы, поверните её на любой угол вокруг центральной оси, сохраняя вертикальное положение.`,
        },
        {
          id: 'section-17-03',
          sectionNum: '17.03',
          title: 'Стрельба по связанным монстрам и технике',
          body: `В вашу фазу стрельбы вражеские отряды МОНСТР/ТЕХНИКА (MONSTER/VEHICLE), находящиеся **в ближнем бою** (engaged), могут быть выбраны целью дальних атак (кроме атак оружием [BLAST]).

Каждый раз, когда модель совершает дальнюю атаку, нацеленную на такой отряд, вычтите 1 из **броска на попадание** (hit roll) (кроме атак оружием [БЛИЖНЯЯ СТРЕЛЬБА] (CLOSE-QUARTERS), совершаемых моделями из отряда, **находящегося в ближнем бою** (engaged) с целью).

[img:/images/monsters/engaged-monsters_vehicles-shooting-ru.jpg|Монстры и техника в контакте — штраф к броску попадания]`,
          children: [
            {
              title: 'Стрельба в ближнем бою с монстрами/техникой',
              body: `Отряд, **находящийся в ближнем бою** (engaged) с вражеским отрядом МОНСТР/ТЕХНИКА (MONSTER/VEHICLE), всё равно __не__ **может стрелять** (eligible to shoot), а значит, не может совершать дальние атаки против отряда МОНСТР/ТЕХНИКА, если только он **может стрелять** будучи **в ближнем бою** (engaged) (например, потому что использует **ближнюю стрельбу** (close-quarters shooting)).`,
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
      description: 'Модели ТРАНСПОРТ (TRANSPORT) могут перевозить пассажиров по полю боя. Этот раздел объясняет, как использовать такие модели в ваших играх и как отряды могут погружаться в них и высаживаться из них.',
      subsections: [
        {
          id: 'section-18-01',
          sectionNum: '18.01',
          title: 'Вместимость транспорта',
          body: `Модели ТРАНСПОРТ (TRANSPORT) имеют **вместимость транспорта** (transport capacity), указанную на их карточке данных. Это определяет тип и максимальное количество дружественных моделей, **которые могут погрузиться** (eligible to embark) в них. Более одного отряда может быть погружено в одну модель ТРАНСПОРТ одновременно при наличии достаточной **вместимости транспорта**.

До битвы, на шаге «Объявление боевых построений» (Declare Battle Formations step), ваши отряды могут начать погружёнными в любую дружественную модель ТРАНСПОРТ с достаточной оставшейся **вместимостью транспорта** для всего отряда.`,
        },
        {
          id: 'section-18-02',
          sectionNum: '18.02',
          title: 'Погрузка',
          body: `После начала первого раунда боя (battle round) дружественный отряд может погрузиться в дружественную модель ТРАНСПОРТ (TRANSPORT) после совершения **обычного манёвра** (normal move), **продвижения** (advance move) или **отступления** (fall-back move), если применяются **все** следующие условия:
▪ Каждая модель в этом отряде находится в пределах 3" от этого ТРАНСПОРТА.
▪ Этот отряд не был расставлен на поле боя в этот ход.
▪ Этот отряд **может погрузиться** (eligible to embark) в этот ТРАНСПОРТ, как описано на его карточке данных.
▪ В этом ТРАНСПОРТЕ достаточно оставшейся **вместимости транспорта** (transport capacity) для каждой модели этого отряда.

Когда отряд грузится, активный игрок убирает его с поля боя — теперь он погружён в этот ТРАНСПОРТ и не находится на поле боя.`,
          children: [
            {
              title: 'Может погрузиться',
              body: `Отряд может погрузиться, если он соответствует всем условиям из раздела «Погрузка» (Embarking) (18.02). Обратите внимание, что одно или несколько из этих условий могут быть изменены другими правилами — в таком случае отряд должен удовлетворять этим изменённым условиям в дополнение к любым неизменённым условиям, чтобы иметь возможность погрузиться.

### Часто задаваемые вопросы (FAQs)
**В:** Если правило говорит, что отряд может погрузиться в TRANSPORT в тот ход, когда он высадился, обходит ли это ограничение основных правил на погрузку в тот ход, когда отряд совершил манёвр расстановки (см. 18.02)?

**О:** Да`,
            },
          ],
        },
        {
          id: 'section-18-03',
          sectionNum: '18.03',
          title: 'Высадка',
          body: `В фазу движения (Movement phase) активного игрока каждый дружественный отряд, погружённый в модель ТРАНСПОРТ (TRANSPORT), может высадиться из неё, совершив **манёвр высадки** (disembark move) (см. ниже).

Если модель ТРАНСПОРТ **уничтожена** (destroyed), до её удаления с поля боя активный игрок должен совершить **экстренный манёвр высадки** (emergency disembark move) (см. напротив) каждым отрядом, погружённым в неё.`,
        },
        {
          id: 'section-18-04',
          sectionNum: '18.04',
          title: 'Манёвр высадки',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | Стремительная/Тактическая высадка: 3"; Боевая высадка: 6"
◈ УСЛОВИЕ | К вашему отряду применяются все из следующего:
▪ Погружён в модель ТРАНСПОРТ, находящуюся на поле боя.
▪ Не грузился в этот ТРАНСПОРТ в эту фазу.
▪ Этот ТРАНСПОРТ (TRANSPORT) не совершал **продвижения** (advance move) или **отступления** (fall-back move) в эту фазу.
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ПЕРЕД ДВИЖЕНИЕМ | Выберите **режим высадки** (disembark mode) в следующем порядке:
▪ **Стремительная высадка (Rapid Disembark):** Если этот ТРАНСПОРТ совершил **обычный манёвр** (normal move) или **манёвр прибытия** (ingress move) в эту фазу, вы должны выбрать этот режим.
▪ **Тактическая высадка (Tactical Disembark):** В противном случае, если этот ТРАНСПОРТ **оставался неподвижным** (remained stationary) или ещё не был **выбран для манёвра** (selected to move) в эту фазу, и вы можете расставить свой отряд, как описано ниже, вы должны выбрать этот режим.
▪ **Боевая высадка (Combat Disembark):** В противном случае вы должны выбрать этот режим. Совершите **бросок на опасность** (hazard roll) (06.03) за каждую модель вашего отряда.
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте каждую модель вашего отряда целиком в пределах **расстояния расстановки** (set-up distance) от этого ТРАНСПОРТА.
▪ **Стремительная высадка** (после **манёвра прибытия**): каждая модель должна следовать тем же правилам и ограничениям, которым должен был следовать ТРАНСПОРТ при выполнении этого манёвра прибытия.
▪ **Боевая высадка:** каждая модель может быть расставлена **в ближнем бою** (engaged) с одним или несколькими вражескими отрядами, **находящимися в ближнем бою** с ТРАНСПОРТОМ.
◈ ПОСЛЕ ДВИЖЕНИЯ
▪ **Стремительная высадка:** до конца хода ваш отряд не может объявлять нападение.
▪ **Тактическая высадка:** выберите ваш отряд для совершения **обычного манёвра** или **продвижения**.
▪ **Боевая высадка:** ваш отряд находится **в боевом шоке** (battle-shocked) и до конца хода не может объявлять нападение.`,
        },
        {
          id: 'section-18-05',
          sectionNum: '18.05',
          title: 'Экстренный манёвр высадки',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | 6"
◈ УСЛОВИЕ | Ваш отряд погружён в модель ТРАНСПОРТ (TRANSPORT), которая только что была **уничтожена** (destroyed).
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ПЕРЕД ДВИЖЕНИЕМ | Совершите **бросок на опасность** (hazard roll) (06.03) за каждую модель вашего отряда.
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте каждую модель вашего отряда:
▪ Целиком в пределах **расстояния расстановки** (set-up distance) от этого ТРАНСПОРТА и как можно ближе к нему.
▪ **Или:** Если это невозможно, оставаясь **не связанным боем** (unengaged), расставьте эту модель целиком в пределах **расстояния расстановки** от этого ТРАНСПОРТА, как можно ближе к нему, и **связанной боем** (engaged).
▪ Каждая модель, которую всё ещё невозможно расставить, **уничтожается**.
◈ ПОСЛЕ ДВИЖЕНИЯ | Ваш отряд находится **в боевом шоке** (battle-shocked) и до конца хода не может объявлять нападение.`,
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
          body: `Некоторые отряды имеют способность **Лидер** (Leader) или **Поддержка** (Support), указанную на их карточке данных. Такие отряды известны как отряды **лидеров** и отряды **поддержки** соответственно. Обе эти способности позволяют таким отрядам **вести** (lead) другие дружественные отряды (известные как отряды **телохранителей** (bodyguard)) для создания **объединённых** (attached) отрядов. **Объединённый** отряд является единым отрядом для всех игровых целей. Отряды **лидеров** и **поддержки** могут вести только определённые отряды **телохранителей**, как указано в приложении Warhammer 40,000.

До битвы, на шаге «Формирование армий» (Muster Armies step), для каждого отряда **лидера** и **поддержки** в вашей армии вы можете выбрать один дружественный отряд **телохранителей**, которым он может **командовать**. Этот отряд будет **вести** этот отряд **телохранителей** в битве и создаст с ним **объединённый** отряд.

Если не указано иное, каждый отряд **телохранителей** может иметь только один присоединённый отряд **лидера** и один отряд **поддержки**.`,
          children: [
            {
              title: 'Объединённые отряды после уничтожения отряда телохранителей',
              body: `Некоторые отряды имеют правила, гласящие, что когда отряд в **объединённом** (attached) отряде **уничтожен** (destroyed), отряды **лидера/поддержки** (leader/support), присоединённые к ним, становятся отдельными отрядами со своей изначальной **начальной численностью** (starting strengths).

Когда отряд **телохранителей** (bodyguard) в **объединённом** отряде, на который влияет такое правило, **уничтожен**, все эти отряды **лидера/поддержки** остаются единым отрядом для всех игровых целей.`,
            },
          ],
        },
        {
          id: 'section-19-02',
          sectionNum: '19.02',
          title: 'Атака объединённых отрядов',
          body: `Каждый раз, когда атака нацелена на **объединённый** (attached) отряд, если он содержит одну или несколько моделей **телохранителей** (bodyguard), используйте наивысшую характеристику **Ж** (T) моделей **телохранителей** в этом отряде при разрешении этой атаки, даже если отряд **лидера/поддержки** (leader/support) в этом **объединённом** отряде имеет другую характеристику **Ж**. Если отряд содержит только модели **лидера/поддержки**, вместо этого используйте наивысшую характеристику **Ж** этих моделей.

Правила, срабатывающие при **уничтожении** (destroyed) отряда, срабатывают только при **уничтожении** последней модели, начавшей битву в составе **объединённого** отряда.`,
        },
        {
          id: 'section-19-03',
          sectionNum: '19.03',
          title: 'Ключевые слова в объединённых отрядах',
          body: `**Объединённый** (attached) отряд имеет все ключевые слова всех составляющих его отрядов. Таким образом, на **объединённый** отряд влияет любое правило, применяемое к отрядам с любым из этих ключевых слов. Обратите внимание, что модели в **объединённом** отряде не получают ключевых слов других моделей в этом отряде, которых у них ещё нет. Помните, что атаки нацелены на отряды, а не на модели.`,
          example: `**Объединённый** (attached) отряд содержит модель **лидера** (leader) с ключевым словом ПСАЙКЕР (PSYKER). Пока эта модель является частью этого отряда, этот отряд имеет ключевое слово ПСАЙКЕР, даже если модели **телохранителей** (bodyguard) не имеют этого ключевого слова. Если этот отряд атакован оружием со способностью [АНТИ-ПСАЙКЕР 4+] (ANTI-PSYKER 4+), любой неизменённый (unmodified) бросок на ранение (wound roll) 4+ против этого отряда является **критическим ранением** (critical wound), даже если сама атака не распределяется на модель **лидера**.`,
        },
        {
          id: 'section-19-04',
          sectionNum: '19.04',
          title: 'Способности в объединённых отрядах',
          body: `Способности/правила, влияющие на одну конкретную модель (например, от **улучшения** (enhancement) или предмета снаряжения), применяются только к этой модели, даже если она является частью **объединённого** (attached) отряда.

В противном случае способности/правила, влияющие на отряд (или модели в нём), применяются к каждой модели в **объединённом** отряде до **уничтожения** (destroyed) источника этой способности/правила, как показано в таблице ниже.

Во всех вышеперечисленных случаях, если эта последняя модель была **уничтожена** в результате атаки, способность, которую она предоставляла **объединённому** отряду, действует до тех пор, пока атакующий отряд не разрешит все свои атаки.`,
          note: `* Это означает, что отряды **лидеров/поддержки** (leader/support) продолжают пользоваться своими собственными способностями «пока эта модель ведёт отряд» даже после **уничтожения** (destroyed) их отряда **телохранителей** (bodyguard), при условии, что они начали битву в составе **объединённого** (attached) отряда. Если эти модели впоследствии будут **воскрешены** (revived), эти способности снова будут применяться к их **объединённому** отряду.`,
          children: [
            {
              title: 'Только смерть прекращает службу (Only In Death Does Duty End)',
              body: `Отряды **лидеров** (Leader) и **поддержки** (support) часто имеют способности, делающие ведомые ими модели сильнее. Точно так же способности некоторых отрядов **телохранителей** (bodyguard) могут усиливать ведущих их. Раздел «Способности в объединённых отрядах» (Abilities in Attached Units, 19.04) означает, что как только модели, предоставляющие такие эффекты, **уничтожены** (destroyed), этот **объединённый** (attached) отряд перестаёт получать от них пользу. Однако если эти модели позже будут **воскрешены** (revived), эти способности снова будут применяться к их **объединённому** отряду.`,
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
          ['Конкретная модель (например, носитель улучшения или предмета снаряжения)', 'Уничтожения этой модели'],
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
          body: `До битвы, на шаге «Объявление боевых построений» (Declare Battle Formations step), вы можете выбрать один или несколько дружественных отрядов (кроме УКРЕПЛЕНИЙ (FORTIFICATIONS)), чтобы поместить их в **стратегический резерв** (strategic reserves). Вместо того чтобы расставлять эти отряды на поле боя во время развёртывания, отложите их в сторону — они являются отрядами **стратегического резерва** и прибудут позже в ходе битвы.

Если не указано иное, суммарная стоимость в очках всех ваших отрядов **стратегического резерва** (включая те, что погружены в ТРАНСПОРТЫ (TRANSPORTS), сами помещённые в **стратегический резерв**) не может превышать 50% от вашего лимита очков для вашего размера битвы.`,
          children: [
            {
              title: 'Резервы (Reserves)',
              body: `Термин «Резервы» (Reserves) — это то же самое, что **стратегические резервы** (strategic reserves).`,
            },
          ],
        },
        {
          id: 'section-20-02',
          sectionNum: '20.02',
          title: 'Переброшенные отряды',
          body: `Некоторые правила позволяют убирать отряды с поля боя и помещать их в **стратегический резерв** (strategic reserves) во время битвы. Отряды, использующие такие правила, известны как **переброшенные** (repositioned) отряды. В дополнение к любым другим правилам, применяемым к таким отрядам (например, где они могут или не могут прибыть), к ним применяются все следующие правила:
▪ При использовании в фазу движения (Movement phase) такие правила могут применяться к отрядам, которые уже двигались в эту фазу.
▪ **Переброшенный** отряд, расставленный в том же ходу, в котором он совершил **продвижение** (advance move), **отступление** (fall-back move) или **манёвр высадки** (disembark move), всё равно считается совершившим **продвижение**, **отступление** или **манёвр высадки** в этот ход.
▪ Когда они убираются с поля боя, любые правила, действующие на такие отряды в течение определённого срока или при определённых обстоятельствах, продолжают действовать на них, пока этот срок и/или обстоятельства применяются.`,
          example: `Отряд, находившийся в зоне действия **способности ауры** (aura ability) при удалении с поля боя, больше не будет подвержен этой **способности ауры**, если при совершении **манёвра прибытия** (ingress move) он больше не находится в её зоне действия; однако отряд, находившийся **в боевом шоке** (battle-shocked) при удалении с поля боя, всё равно будет **в боевом шоке**, если совершит **манёвр прибытия** в тот же ход.`,
        },
        {
          id: 'section-20-03',
          sectionNum: '20.03',
          title: 'Прибытие из стратегического резерва',
          body: `Для прибытия на поле боя каждый отряд **стратегического резерва** (strategic reserves) должен совершить **манёвр прибытия** (ingress move) (см. ниже). Если не указано иное, они могут сделать это только начиная со второго раунда боя (battle round).

В конце третьего раунда боя, если не указано иное, все отряды **стратегического резерва**, не совершившие одно или несколько **движений прибытия**, **уничтожаются** (destroyed) со следующими исключениями:
▪ Отряды, погружённые в ТРАНСПОРТЫ (TRANSPORTS), которые совершили **манёвр прибытия** во время битвы.
▪ **Переброшенные** (repositioned) отряды.`,
          children: [
            {
              title: 'Расстановка как подкрепление',
              body: `Если правило упоминает отряд, расставляемый на поле боя как Подкрепление (Reinforcements), это означает отряд, совершивший **манёвр прибытия** (ingress move).`,
            },
          ],
        },
        {
          id: 'section-20-04',
          sectionNum: '20.04',
          title: 'Манёвр прибытия',
          body: `◈ РАССТОЯНИЕ РАССТАНОВКИ | 6"
◈ УСЛОВИЕ | Ваш отряд находится в **стратегическом резерве** (strategic reserves) и не погружён в ТРАНСПОРТ (TRANSPORT), также находящийся в **стратегическом резерве**.
◈ ЭФФЕКТ | Ваш отряд расставляется, как описано в «Расстановке» (03.02).
◈ ВО ВРЕМЯ ДВИЖЕНИЯ | Расставьте ваш отряд целиком в пределах 6" от одного или нескольких краёв поля боя и более чем в 8" по горизонтали от всех вражеских отрядов.
▪ **До третьего раунда боя:** при этом ни одна модель не может быть расставлена в зоне развёртывания (deployment zone) противника.
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
          title: 'Стремительный манёвр',
          body: `Некоторые правила позволяют отряду совершить **стремительный манёвр** (surge move), как описано ниже.`,
        },
        {
          id: 'section-21-02',
          sectionNum: '21.02',
          title: 'Стремительный манёвр',
          body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Как указано в правиле, разрешающем этот тип манёвра.
◈ УСЛОВИЕ | Применяются все из следующего.
▪ Правило, разрешающее этот тип манёвра, было активировано.
▪ Ваш отряд не **в боевом шоке** (battle-shocked).
▪ Ваш отряд **не в ближнем бою** (unengaged).
▪ Ваш отряд не двигался в эту фазу.
◈ ЭФФЕКТ | Ваш отряд движется, как описано в «Движении» (03).
◈ ПЕРЕД ДВИЖЕНИЕМ | Выберите ближайший вражеский отряд в качестве **цели стремительного манёвра** (surge target).
◈ ВО ВРЕМЯ ДВИЖЕНИЯ
▪ Каждая модель должна завершить свой манёвр **в ближнем бою** (engaged) с **целью стремительного манёвра**, если это возможно.
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
          body: `Модели с ключевым словом FLY могут **подниматься в небо** (take to the skies) при совершении **обычного манёвра** (normal move), **продвижения** (advance move), **отступления** (fall-back move) или **манёвра нападения** (charge move). Каждый раз, когда ЛЕТЯЩИЙ (FLYING) отряд выбирается для совершения такого манёвра, до манёвра любых моделей в этом отряде активный игрок может объявить, что он будет **подниматься в небо**. Если он это делает, при разрешении этого манёвра:
▪ Вычтите 2" из **максимального расстояния** (maximum distance).
▪ Каждый раз, когда ЛЕТЯЩАЯ модель движется:
▫ Игнорируйте всё вертикальное расстояние для целей определения пройденного расстояния.
▫ Она может проходить сквозь все типы моделей (включая вражеские модели и модели МОНСТР/ТЕХНИКА (MONSTER/VEHICLE)).
▫ Она может двигаться горизонтально и вертикально через все категории **элементов ландшафта** (terrain feature).

[img:/images/surge/taking-to-the-skies-ru.jpg|Взмыть в небо — движение через укрытия и модели]`,
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
          body: `Способности, влияющие на модели или отряды в пределах указанной дистанции, являются **способностями ауры** (aura abilities) и помечаются словом «Аура».

Пока модель со **способностью ауры** находится на поле боя, она всегда находится в зоне действия собственной **способности ауры**.

На отряд может одновременно действовать более одной **способности ауры**, но если отряд находится в зоне действия одной и той же **способности ауры** более одного раза, эта **способность ауры** применяется к нему только один раз.`,
        },
        {
          id: 'section-22-02',
          sectionNum: '22.02',
          title: 'Фракционные способности',
          body: `Некоторые способности общие для каждого отряда, принадлежащего к определённой фракции, — это **фракционные способности** (faction abilities) (также известные как **армейские правила** (army rules)), и они перечислены в разделе «Фракционные способности» карточки данных.

Если не указано иное, **фракционные способности** отряда применяются только в том случае, если **фракция армии** (army faction), выбранная вами при формировании армии, совпадает с ключевым словом фракции, указанным на карточке данных этого отряда.`,
        },
        {
          id: 'section-22-03',
          sectionNum: '22.03',
          title: 'Псайкерские способности',
          body: `Способности, помеченные словом «Псайкер», являются **псайкерскими способностями** (psychic abilities). Если **псайкерская способность** заставляет модель потерять одно или несколько ранений, каждое из этих ранений считается нанесённым **псайкерской атакой** (psychic attack) (это может быть важно для активации других правил).`,
        },
        {
          id: 'section-22-04',
          sectionNum: '22.04',
          title: 'Способности снаряжения',
          body: `Способности, получаемые, когда отряд (или одна из его моделей) имеет определённый предмет снаряжения, являются **способностями снаряжения** (wargear abilities) и перечислены в разделе «Способности снаряжения» карточки данных.

Если отряд имеет предмет снаряжения со **способностью снаряжения**, эта способность применяется к отряду. Если модель в составе отряда имеет предмет снаряжения со **способностью снаряжения**, эта модель является «носителем» этого предмета снаряжения, и способность действует до тех пор, пока эта модель не будет **уничтожена** (destroyed).`,
        },
        {
          id: 'section-22-05',
          sectionNum: '22.05',
          title: 'Навесной огонь',
          body: `Каждый раз, когда модель совершает дальнюю атаку, нацеленную на **видимый** (visible) отряд, содержащий одну или несколько моделей на **уровне земли** (ground level), если применяется одно или несколько следующих условий, улучшите характеристику **БС** (BS) этой атаки на 1:
▪ Атакующая модель находится на участке **элемента ландшафта** (terrain feature) высотой 3" или более.
▪ Атакующая модель имеет ключевое слово ИСПОЛИНСКИЙ (TOWERING), и целевой отряд находится в пределах 12".

[img:/images/fire/plunging-fire-ru.jpg|Навесной огонь — требования по высоте и дальности]`,
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
          body: `На шаге «Объявление боевых построений» (Declare Battle Formations step) все отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) должны быть помещены в **стратегический резерв** (strategic reserves) (20.01).`,
        },
        {
          id: 'section-23-02',
          sectionNum: '23.02',
          title: 'Движение',
          body: `▪ Отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) имеют право только на **манёвр прибытия** (ingress move) (20.04); они **не** имеют права на другие типы манёвров.
▪ В конце хода вашего противника все отряды ВОЗДУШНЫХ СУДОВ в вашей армии, находящиеся на поле боя, должны быть помещены в **стратегический резерв** (strategic reserves).
▪ Каждый раз, когда отряд совершает любой вид манёвра, его модели могут проходить сквозь модели ВОЗДУШНЫХ СУДОВ.
▪ Каждый раз, когда отряд совершает **сближение** (pile-in), **консолидацию** (consolidation) или **стремительный манёвр** (surge move), если этот отряд не может FLY, при совершении этого манёвра игнорируйте отряды ВОЗДУШНЫХ СУДОВ для целей выбора вражеских отрядов и определения ближайшего вражеского отряда.
▪ Нахождение **в ближнем бою** (engaged) исключительно с одним или несколькими отрядами ВОЗДУШНЫХ СУДОВ не препятствует праву отряда совершать **обычный манёвр** (normal move) или **продвижение** (advance move).`,
        },
        {
          id: 'section-23-03',
          sectionNum: '23.03',
          title: 'Стрельба',
          body: `Правило «Навесной огонь» (Plunging Fire) (22.05) не влияет на атаки, совершаемые отрядами ВОЗДУШНЫХ СУДОВ (AIRCRAFT) или нацеленные на них.`,
        },
        {
          id: 'section-23-04',
          sectionNum: '23.04',
          title: 'Нападение и ближний бой',
          body: `▪ Отряды ВОЗДУШНЫХ СУДОВ (AIRCRAFT) **не могут** объявлять нападение и могут наносить удары в ближнем бою только против ЛЕТЯЩИХ (FLYING) отрядов.
▪ Только ЛЕТЯЩИЕ отряды могут выбирать отряды ВОЗДУШНЫХ СУДОВ в качестве **цели нападения** (charge target), и только ЛЕТЯЩИЕ модели могут наносить удары в ближнем бою, нацеленные на отряды ВОЗДУШНЫХ СУДОВ.`,
        },
      ],
    },
  ],
}
