export const battlefields = {
  en: [
    {
      id: '13',
      num: '13',
      title: 'Terrain',
      page: 46,
      description: 'This section provides rules for using terrain to transform your gaming table into an interactive, thematic battlefield. These rules help to bring your battlefield to life and introduce a vital tactical dimension to your games.',
      subsections: [
        {
          id: 'section-13-01',
          sectionNum: '13.01',
          title: 'Placing Terrain',
          body: `Before the battle, place a selection of **terrain features** on the battlefield using one or more of the following methods:
▪ Place a well-defined boundary (such as a base or mat) in each location you want to furnish with terrain, then place one or more **terrain features** wholly within that boundary.
▪ Place one **terrain feature** directly on the battlefield.
▪ Place two or more **terrain features** directly on the battlefield in such a way that together they define the boundary of an area.

In each case, the area of the battlefield occupied by that boundary or **terrain feature** is known as a **terrain area**. A mission's deployment map may define the location and dimensions of each **terrain area**. Otherwise, players must agree on this before the battle.

[img:/images/terrain/terrain-placed-on-a-mat.jpg|Terrain on a mat — terrain area boundary example]

[img:/images/terrain/terrain-placed-on-the-battlefield.jpg|Terrain on the battlefield — terrain area boundary example]`,
        },
        {
          id: 'section-13-02',
          sectionNum: '13.02',
          title: 'Terrain Categories',
          body: `Each **terrain feature** belongs to a **terrain category**, which can affect the movement and visibility of models. Below are some examples of which types of **terrain features** fall under each category.

A mission's deployment map may define which **terrain categories** should be present within each **terrain area**. Meeting these requirements will create the best gaming experience.`,
          note: 'Note that **terrain features** sharing the same **terrain area** can belong to different **terrain categories**.',
          children: [
            {
              id: 'section-13-02-01',
              sectionNum: '13.02.01',
              title: 'Creating Your Own Battlefield',
              fromApp: true,
              body: `Don't worry if your battlefield doesn't match a mission's **terrain category** requirements; just do the best with the **terrain features** you have. If a mission does not provide you with guidance, it will be up to the players to decide how to create their battlefield. When doing so, keep in mind that **dense terrain features** have the greatest impact on visibility and movement. Battlefields with too few **dense terrain features** can advantage armies that rely on shooting, or disadvantage armies that rely on melee. Also remember to leave sufficient room around **dense terrain features** for larger models such as MONSTERS/VEHICLES to manoeuvre, especially near the edges of the battlefield.`,
            },
          ],
        },
        {
          id: 'section-13-03',
          sectionNum: '13.03',
          title: 'Exposed',
          body: `Exposed terrain offers only scant protection to the most desperate troops, and can be traversed without hindrance.

**Examples:** Craters, razorwire, scattered debris.`,
        },
        {
          id: 'section-13-04',
          sectionNum: '13.04',
          title: 'Light',
          body: `Light terrain can provide cover from incoming attacks, but will not slow an enemy's advance or offer lasting defence.

**Examples:** Barricades, low walls, statuary.`,
        },
        {
          id: 'section-13-05',
          sectionNum: '13.05',
          title: 'Dense',
          body: `Dense terrain is an obstacle to even the largest war machines, and can shelter entire squads from enemy sight.

**Examples:** Buildings, ruins, armoured containers, woods.`,
        },
        {
          id: 'section-13-06',
          sectionNum: '13.06',
          title: 'Terrain and Movement',
          body: `Models can move through different categories of **terrain feature** as follows:
▪ **Exposed/Light:** All models can move horizontally and vertically through **exposed** and **light terrain features**.
▪ **Dense:**
▫ INFANTRY/BEASTS/SWARM/MOBILE models can move horizontally through **dense terrain features**.
▫ INFANTRY/BEASTS/SWARM models can also move vertically through **dense terrain features**.
▫ Other models can move horizontally through **dense terrain features** provided that all sections of that **terrain feature** that the moving model's base would move through are 2" or less in height. Otherwise, the moving model must move vertically to ascend or descend such sections. They cannot move through ceilings and floors while doing so, and they cannot end that move on any surface of that **terrain feature** that is not on ground level.

### Moving Vertically
Models can move vertically to ascend or descend **terrain features**. While doing so:
▪ That model must remain within ½" horizontally of that **terrain feature**.
▪ Add the distance moved vertically up, and the distance moved vertically down, to any other distance that model has moved since its unit began that move.

### Setting Up or Ending a Move
Models can be set up or end a move on the ground level of **terrain features**. Models can also be set up or end a move on any surface of a **terrain feature** that is not on ground level, if all of the following apply:
▪ That model has one or more of the following keywords: INFANTRY/BEASTS/SWARM/FLY/MONSTER.
▪ After ending that move, that model is stable and no part of its base overhangs the outer edge of that surface.

[img:/images/terrain/terrain-and-movement.jpg|Terrain and movement — models moving across terrain features]

[img:/images/terrain/terrain-and-movement-2.jpg|Terrain and movement example 2 — base overhang rules]`,
          note: 'Solid Terrain: If a **terrain feature** has the Solid rule (13.11), a model cannot end a move such that any part of it is through any enclosed part of that **terrain feature** that is 3" or less from ground level — not even through small openings such as doors and windows.',
          children: [
            {
              id: 'section-13-06-01',
              sectionNum: '13.06.01',
              title: 'Solid Terrain and Movement',
              fromApp: true,
              body: `If a **terrain feature** has the **Solid** rule (13.11), as **dense terrain features** do, a model cannot end a move such that any part of it is through any enclosed part of that **terrain feature** that is 3" or less from ground level – not even through small openings such as doors and windows. This ensures that protruding elements of models cannot be used to circumvent the visibility restrictions of the Solid rule.`,
            },
          ],
        },
        {
          id: 'section-13-07',
          sectionNum: '13.07',
          title: 'Terrain and Visibility',
          body: `Terrain can affect visibility, depending on whether the **Benefit of Cover**, **Hidden**, **Obscuring** or **Solid** rules apply.`,
        },
        {
          id: 'section-13-08',
          sectionNum: '13.08',
          title: 'Benefit of Cover',
          sideImage: { src: '/images/terrain/benefit-of-cover.jpg', alt: 'Benefit of Cover diagram', width: '50%' },
          body: `Each time a ranged attack targets a unit, if **every** model in that unit meets one or more of the following conditions, that unit has the **benefit of cover** against that attack:
▪ That model has the INFANTRY/BEASTS/SWARM keyword and is within a **terrain area**.
▪ That model is not **fully visible** to the attacking model due to one or more intervening **terrain features** and/or one or more intervening **obscuring terrain areas** (see 13.10).

Each time a ranged attack targets a unit that has the **benefit of cover** against it, worsen the **BS** characteristic of that attack by 1.`,
        },
        {
          id: 'section-13-09',
          sectionNum: '13.09',
          title: 'Hidden',
          body: `A model is **hidden** while **all** of the following apply to it:
▪ That model has the INFANTRY/BEASTS/SWARM keyword and is within a **terrain area** that contains one or more **light/dense terrain features**.
▪ That model's unit did not make one or more ranged attacks during this turn or during the previous turn.

While a model is **hidden**, it can only be **visible** to enemy models that are within its **detection range**. Unless otherwise stated, a model's **detection range** is 15".`,
          children: [
            {
              id: 'section-13-09-01',
              sectionNum: '13.09.01',
              title: 'Hidden and the First Turn',
              fromApp: true,
              body: `During the first turn, conditions that require something not to have happened during the previous turn are true. For the **Hidden** rule, this means that during the first turn a unit has not made ranged attacks during the previous turn.`,
            },
          ],
        },
        {
          id: 'section-13-10',
          sectionNum: '13.10',
          title: 'Obscuring',
          sideImage: { src: '/images/terrain/hidden-and-obscuring.jpg', alt: 'Hidden and Obscuring diagram', width: '50%' },
          body: `**Terrain areas** containing one or more **light** or **dense terrain features** are **obscuring terrain areas**. If every **line of sight** drawn between two models crosses one or more **obscuring terrain areas** (excluding **obscuring terrain areas** that one or both of those models are within), those two models are not **visible** to each other.`,
        },
        {
          id: 'section-13-11',
          sectionNum: '13.11',
          title: 'Solid',
          body: `**Dense terrain features** have the **Solid** rule. **Line of sight** cannot be drawn across any enclosed gap in the surface of such a **terrain feature** that is 3" or less from ground level.

[img:/images/terrain/solid.jpg|Solid terrain — line of sight blocking diagram]`,
          note: "Designer's Note: This rule ensures that models are not **visible** while sheltering in ground-level terrain, irrespective of small openings such as doors, windows or bullet holes, or because of small gaps between adjacent **terrain features**. 3\" is the height of the first floor of many **terrain features**, but some missions may adjust the height at which this rule takes effect.",
          children: [
            {
              id: 'section-13-11-01',
              sectionNum: '13.11.01',
              title: 'Gone to Ground',
              fromApp: true,
              body: `**Hidden** models that are within **Solid terrain features** gain an extra benefit while they have **gone to ground**.

A model has **gone to ground** while all of the following apply:
▪ That model is **hidden**.
▪ That model is not **fully visible** to the attacking model due to one or more intervening **Solid terrain features**.
▪ That model's unit did not make one or more ranged attacks during this turn or during the previous turn.
While a model has **gone to ground**, subtract 3" from that model's **detection range**.`,
              note: `Designer's Note: Units that made ranged attacks in the current or previous turn cannot **go to ground**, regardless of any abilities that allow them to shoot and remain **hidden**.`,
            },
          ],
        },
      ],
    },
    {
      id: '14',
      num: '14',
      title: 'Objectives',
      page: 52,
      description: 'Objectives represent critical locations that both sides are attempting to secure, and many missions require your forces to take control of them to achieve victory. This section describes how to do so with your models.',
      subsections: [
        {
          id: 'section-14-01',
          sectionNum: '14.01',
          title: 'Terrain Objectives',
          body: `If a mission uses **objectives**, it will state where they are located on the battlefield. Typically, your mission will have a deployment map showing several points where **objectives** should be placed. The location of each point should coincide with a **terrain area** (13.01); that **terrain area** is the **objective**, and is called a **terrain objective**.

When measuring distances to and from an **objective**, measure to and from the closest part of it.`,
          children: [
            {
              id: 'section-14-01-01',
              sectionNum: '14.01.01',
              title: 'Objectives Not Within A Terrain Area',
              fromApp: true,
              body: `If the location point of an **objective** does not coincide with a **terrain area**, you must denote the location of that **objective** with a flat, circular marker, 40 mm in diameter, centred on that point – this is called an **objective marker**. Models can move through **objective markers** and they can end a move on top of **objective markers**.

A model is within range of an **objective marker** while it is within 3" horizontally and 5" vertically of that **objective marker**. When measuring distances to and from an **objective marker**, measure to and from the closest part of it.`,
            },
          ],
        },
        {
          id: 'section-14-02',
          sectionNum: '14.02',
          title: 'Level of Control',
          body: `At the start of the battle, no **objective** on the battlefield is controlled by either player. To gain control of an **objective**, a player will need one or more models with an **OC** characteristic of 1 or more within range of it. A model is within range of a **terrain objective** while it is within that **terrain area**.

At the end of each phase and turn, to determine a player's **level of control** over an **objective**, add together the **OC** characteristics of all the models in that player's army that are within range of that **objective**:
▪ The player who has the highest **level of control** over that **objective** controls that **objective**.
▪ If both players have the same **level of control** over that **objective**, unless that **objective** is **secured** (see below), that **objective** is not controlled by either player.

While one or more units from a player's army are within range of an **objective** that player controls, for each of those units that contains one or more models with an **OC** characteristic of 1 or more, that unit is said to be **controlling** that **objective**.

[img:/images/terrain/controlling-a-terrain-objective.jpg|Controlling a terrain objective — OC and control range]`,
          note: 'Hold at All Costs: Some units have abilities that are triggered when they control an **objective**, or when they **secure** an **objective** for your army.',
        },
        {
          id: 'section-14-03',
          sectionNum: '14.03',
          title: 'Secured Objectives',
          body: `Some rules allow an **objective** to be **secured** by a player's army. When an **objective** is **secured** by a player's army, that **objective** remains under their control — even once they no longer have any units within range of it — until their opponent's **level of control** over that **objective** is greater than theirs at the end of a phase.`,
        },
      ],
    },
    {
      id: '15',
      num: '15',
      title: 'Stratagems',
      page: 54,
      description: 'Stratagems can be used by spending Command Points, to create epic moments of tactical brilliance or peerless martial might. They are used when a player deems that a critical point in the battle is reached, where extra combat prowess or fleeting but powerful effects are required to tip the balance in their favour.',
      subsections: [
        {
          id: 'section-15-01',
          sectionNum: '15.01',
          title: 'Using Stratagems',
          body: `During the battle, both players can use **stratagems**. Each **stratagem** states:
▪ How many CP it costs to use.
▪ **WHEN:** When it can be used.
▪ **TARGET:** Which units it can target.
▪ **EFFECT:** What the effects of using that **stratagem** are.
▪ **RESTRICTIONS:** Any additional restrictions that apply.

Each player can use the same **stratagem** multiple times during the battle, but the following restrictions apply:
▪ Each player cannot use the same **stratagem** more than once in the same phase.
▪ Unless otherwise stated, each player cannot target the same unit with more than one **stratagem** in the same phase.

Each time you use a **stratagem**, resolve the following sequence:
1. Select targets as described in that **stratagem**.
2. Reduce your CP total by the CP cost listed in that **stratagem**. If that **stratagem** contains a section that carries an additional CP cost (e.g. +1CP), you can only use that additional section if you increase the CP cost of that **stratagem** by the amount shown. If you do not have enough CP remaining, you cannot use that **stratagem**.
3. Resolve the effects of that **stratagem**.`,
          children: [
            {
              id: 'section-15-01-01',
              sectionNum: '15.01.01',
              title: 'Modifying CP Cost',
              fromApp: true,
              body: `Some rules modify the cost of using certain **stratagems**. In such cases, the following points apply:
▪ The CP cost of a **stratagem** use can never be modified below 0CP.
▪ If a rule modifies the CP cost of a **stratagem** when you use it, but does not specify a duration for that modifier, that modifier only applies to that usage of that **stratagem**.`,
            },
            {
              id: 'section-15-01-02',
              sectionNum: '15.01.02',
              title: 'Affected By A Stratagem',
              fromApp: true,
              body: `If a unit is selected as the target of a **stratagem**, it is said to be affected by that **stratagem**.`,
            },
            {
              id: 'section-15-01-03',
              sectionNum: '15.01.03',
              title: 'Stratagem Definitions',
              fromApp: true,
              body: `▪ **Your Opponent's Stratagems:** **stratagems** that your opponent uses are sometimes referred to as your opponent's **stratagems**.
▪ **Your Stratagems:** **stratagems** that you use are sometimes referred to as your **stratagems**.
▪ **Your Unit (in Stratagems):** The term 'your unit(s)' in the Effect section of **stratagems** always relates to the unit(s) selected in the Target section of that **stratagem**, and never refers to any other units from your army.`,
            },
          ],
        },
        {
          id: 'section-15-core-label',
          sectionNum: '',
          isGroupLabel: true,
          title: 'CORE STRATAGEMS',
          body: 'All players can use **core stratagems** (see overleaf). Additional stratagems can be found in Codexes and other publications.',
        },
        {
          id: 'section-15-09',
          sectionNum: '15.09',
          title: 'Snap Shooting',
          inline: true,
          body: `◈ ELIGIBLE IF | As stated in the rule allowing this **shooting type**.
◈ EFFECT | Your unit shoots as described in Making Attacks (04).
◈ WHILE SHOOTING
▪ You can only target one **visible** enemy unit within 24" of your unit (and only if it is an eligible target).
▪ Each attack only hits on an unmodified **hit roll** of 6 (irrespective of the attacking weapon's **BS** characteristic or any modifiers).
▪ You cannot re-roll **hit rolls**.
◈ AFTER SHOOTING | Until the end of the phase, your unit is not **eligible to start an action**.`,
        },
      ],
      stratagems: [
        {
          num: '15.02',
          name: 'Command Re-roll',
          cp: '1CP',
          turn: 'either',
          flavor: 'A great commander can bend even the vagaries of fate and fortune to their will, the better to ensure victory.',
          when: 'Any phase, just after you make one of the following rolls for a friendly unit or model:\n▪ **Advance roll**\n▪ **Charge roll**\n▪ Damage roll\n▪ **Hazard roll**\n▪ **Hit roll**\n▪ **Save roll**\n▪ **Wound roll**\n▪ A roll to determine the number of attacks generated with a weapon',
          target: 'That unit or model',
          effect: 'You re-roll that roll. If you are rolling more than one dice together, select one of those dice to re-roll (excluding **charge rolls**, which you must re-roll in full).',
          restrictions: '',
          extraCost: [],
        },
        {
          num: '15.03',
          name: 'Epic Challenge',
          cp: '1CP',
          turn: 'your',
          flavor: 'The legends of the 41st millennium are replete with deadly duels between mighty champions.',
          when: 'Fight phase, just after a friendly CHARACTER unit is **selected to fight**',
          target: 'That CHARACTER unit',
          effect: 'Select one CHARACTER model in your unit. Until the end of the phase, that model\'s melee weapons have the [PRECISION] ability.',
          restrictions: '',
          extraCost: [],
        },
        {
          num: '15.04',
          name: 'Insane Bravery',
          cp: '1CP',
          turn: 'your',
          flavor: 'Indifferent to their own survival, these warriors hold their ground against seemingly impossible odds.',
          when: 'Battle-shock step of your Command phase, just before you make a **battle-shock roll** for a friendly unit',
          target: 'That unit',
          effect: 'That **battle-shock roll** is automatically successful.',
          restrictions: 'You cannot use this stratagem more than once per battle.',
          extraCost: [],
        },
        {
          num: '15.05',
          name: 'Explosives',
          cp: '1CP',
          turn: 'your',
          flavor: 'Priming grenades or other explosives, these warriors draw back and hurl death into the enemy\'s midst.',
          when: 'Your Shooting phase',
          target: 'One friendly **unengaged** EXPLOSIVES/GRENADES unit that is **eligible to shoot** and did not make an **advance move** this turn',
          effect: 'Resolve the following sequence:\n1. Select one EXPLOSIVES/GRENADES model in your unit.\n2. Select one **unengaged** enemy unit within 8" of and **visible** to that model.\n3. Roll six D6: for each result of 4+, that enemy unit suffers 1 **mortal wound**.',
          restrictions: '',
          extraCost: [],
        },
        {
          num: '15.06',
          name: 'Crushing Impact',
          cp: '1CP',
          turn: 'your',
          flavor: 'In extremis, armoured vehicles and rampaging monsters can use their sheer size as a weapon, ramming and crushing enemies beneath their colossal bulk, though doing so risks sustaining damage in return.',
          when: 'Your Charge phase, just after a friendly MONSTER or VEHICLE unit ends a **charge move**',
          target: 'That MONSTER or VEHICLE unit',
          effect: 'Resolve the following sequence:\n1. Select one enemy model **engaged** with your unit.\n2. Select one model in your unit that is **engaged** with that enemy model.\n3. Roll a number of D6 equal to the **T** characteristic of that enemy model: for each result of 1, your unit suffers 1 **mortal wound**; for each result of 5+, that enemy model\'s unit suffers 1 **mortal wound** (to a maximum of 6 **mortal wounds** per unit).',
          restrictions: '',
          extraCost: [],
        },
        {
          num: '15.07',
          name: 'Rapid Ingress',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Be it cunning strategy, potent technology or supernatural ritual, there are many means by which a commander may hasten their warriors\' onset.',
          when: 'End of your opponent\'s Movement phase',
          target: 'One friendly unit that is in **strategic reserves** (not an AIRCRAFT unit)',
          effect: 'That unit makes an **ingress move** (20.04).',
          restrictions: 'You cannot use this stratagem during the first battle round.',
          extraCost: [],
        },
        {
          num: '15.08',
          name: 'Fire Overwatch',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A hail of fire can drive back advancing foes.',
          when: 'End of your opponent\'s Movement phase',
          target: 'One friendly **unengaged** unit (not a TITANIC unit)',
          effect: 'That unit shoots using **snap shooting** (15.09).',
          restrictions: '',
          extraCost: [],
          subRule: {
            sectionNum: '15.09',
            title: 'Snap Shooting',
            fields: [
              { label: 'ELIGIBLE IF', text: 'As stated in the rule allowing this **shooting type**.' },
              { label: 'EFFECT', text: 'Your unit shoots as described in Making Attacks (04).' },
              { label: 'WHILE SHOOTING', text: '▪ You can only target one **visible** enemy unit within 24" of your unit (and only if it is an eligible target).\n▪ Each attack only hits on an unmodified **hit roll** of 6 (irrespective of the attacking weapon\'s **BS** characteristic or any modifiers).\n▪ You cannot re-roll **hit rolls**.' },
              { label: 'AFTER SHOOTING', text: 'Until the end of the phase, your unit is not **eligible to start an action**.' },
            ],
          },
        },
        {
          num: '15.10',
          name: 'Smokescreen',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Even the most skilled marksmen struggle to hit targets veiled by billowing screens of smoke.',
          when: 'Start of your opponent\'s Shooting phase',
          target: 'One friendly SMOKE unit',
          effect: 'Until the end of the phase, each time an attack targets your SMOKE unit, or targets a unit that is not **fully visible** to the attacking model because of one or more models in your SMOKE unit, the target has the **benefit of cover** against that attack (13.08).',
          restrictions: '',
          extraCost: [],
        },
        {
          num: '15.11',
          name: 'Heroic Intervention',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Voices raised in furious war cries, your warriors surge forth to meet the enemy\'s onslaught head-on.',
          when: 'End of your opponent\'s Charge phase',
          target: 'One friendly **unengaged** unit within 12" of one or more enemy units. You can only select a VEHICLE unit if it is a CHARACTER/WALKER unit.',
          effect: 'Resolve a **charge** with your unit (11.02). While doing so, before making the **charge roll**, you must select one of the following modes:\n▪ **Leap to Defend:** When selecting **charge targets**, you can only select enemy units that made a **charge move** this phase and are within the **maximum distance**.',
          restrictions: '',
          extraCost: [
            {
              cp: '+1CP',
              title: 'Into the Fray',
              body: 'When making the **charge roll**, if the result is greater than 6 (after modifiers), change it to 6. When selecting **charge targets**, you can select any enemy units that are within 6" of your unit and within the **maximum distance**.',
            },
          ],
        },
        {
          num: '15.12',
          name: 'Counteroffensive',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'In close-quarters combat, the slightest hesitation can leave an opening for a swift foe to exploit.',
          when: 'Fight step of your opponent\'s Fight phase, just after an enemy unit resolves its attacks',
          target: 'One friendly unit that is **eligible to fight**',
          effect: 'Until the end of the phase, your unit has the **Fights First** ability and it must be the next unit you **select to fight** (12.04).',
          restrictions: '',
          extraCost: [],
        },
      ],
    },
    {
      id: '16',
      num: '16',
      title: 'Actions',
      page: 58,
      description: 'Actions represent vital battlefield tasks your forces must carry out, from searching for missing archeotech to completing a blasphemous ritual.',
      subsections: [
        {
          id: 'section-16-01',
          sectionNum: '16.01',
          title: 'Performing Actions',
          body: `Some rules allow units to perform **actions**. Each **action** states:
▪ **STARTS:** When it is started.
▪ **UNITS:** Which friendly units can perform it.
▪ **USE LIMIT:** How many times friendly units can start it.
▪ **COMPLETES:** When it completes.
▪ **EFFECT:** What the effects of completing it are.

### Starting an Action
A unit is **eligible to start an action** unless one or more of the following apply to that unit:
▪ It is not on the battlefield.
▪ It is an AIRCRAFT/FORTIFICATION unit.
▪ It is **battle-shocked**.
▪ It has an OC characteristic of 0 or '-'.
▪ It is **engaged** (unless it is a TITANIC unit).
▪ It made an **advance** or **fall-back move** this turn.
▪ It started another **action** this turn.

If a unit starts an **action**, until the end of the turn:
▪ It is not **eligible to shoot** (excluding TITANIC units).
▪ It is not **eligible to declare a charge**.

### Completing an Action
If a unit performing an **action** makes a move (excluding **pile-in** and **consolidation moves**) or leaves the battlefield, that unit does not complete that **action**. Otherwise, when an **action** is completed, its Effect is triggered.`,
          note: 'WHERE TO FIND ACTIONS\nThe **actions** players can use can be found in other publications such as mission packs. All players can use **core actions**, while other **actions** may have restrictions such as army faction.',
        },
      ],
    },
  ],

  ru: [
    {
      id: '13',
      num: '13',
      title: 'Укрытия',
      page: 46,
      description: 'В этом разделе представлены правила использования укрытий для превращения вашего игрового стола в интерактивное, тематическое поле боя. Эти правила помогают оживить ваше поле боя и вносят жизненно важный тактический аспект в ваши игры.',
      subsections: [
        {
          id: 'section-13-01',
          sectionNum: '13.01',
          title: 'Размещение укрытий',
          body: `Перед битвой разместите набор **элементов укрытий** (terrain features) на поле боя, используя один или несколько из следующих методов:
▪ Поместите чётко определённую границу (например, база или подложка) в каждое место, которые вы хотите оборудовать укрытием, затем поместите один или несколько **элементов укрытий** полностью в пределах этой границы.
▪ Поместите один **элемент укрытия** непосредственно на поле боя.
▪ Поместите два или более **элементов укрытий** непосредственно на поле боя таким образом, чтобы вместе они определяли границу области.

В каждом случае область поля боя, занимаемая этой границей или **элементом укрытия**, известна как **область укрытия** (terrain area). Карта развёртывания миссии может определять местоположение и размеры каждой **области укрытия**. В противном случае игроки должны договориться об этом до начала битвы.

[img:/images/terrain/terrain-placed-on-a-mat-ru.jpg|Укрытия на подложке — пример границы территории]

[img:/images/terrain/terrain-placed-on-the-battlefield-ru.jpg|Укрытия на поле боя — пример границы территории]`,
        },
        {
          id: 'section-13-02',
          sectionNum: '13.02',
          title: 'Категории укрытий',
          body: `Каждый **элемент укрытия** (terrain feature) принадлежит к **категории укрытий** (terrain category), которая может влиять на движение и видимость моделей. Ниже приведены примеры того, какие типы **элементов укрытий** попадают под каждую категорию.

Карта развёртывания миссии может определять, какие **категории укрытий** должны присутствовать в каждой **области укрытия** (terrain area). Соблюдение этих требований создаст наилучший игровой опыт.`,
          note: 'Обратите внимание, что **элементы укрытий** (terrain features), находящиеся в одной и той же **области укрытия** (terrain area), могут принадлежать к разным **категориям укрытий** (terrain categories).',
          children: [
            {
              title: 'Создание собственного поля боя',
              body: `Не переживайте, если ваше поле боя не соответствует требованиям миссии к **категориям укрытий** (terrain category); просто используйте имеющиеся **элементы укрытий** (terrain features) как можно лучше. Если миссия не даёт вам указаний, игроки сами решают, как создать своё поле боя. При этом помните, что **надёжные элементы укрытий** (dense terrain features) сильнее всего влияют на видимость и движение. Поля боя со слишком малым числом **надёжных элементов укрытий** могут давать преимущество армиям, полагающимся на стрельбу, или ставить в невыгодное положение армии, полагающиеся на ближний бой. Также не забудьте оставить достаточно места вокруг **надёжных элементов укрытий** для манёвра крупных моделей, таких как MONSTERS/VEHICLES, особенно у краёв поля боя.`,
            },
          ],
        },
        {
          id: 'section-13-03',
          sectionNum: '13.03',
          title: 'Открытые (Exposed)',
          body: `Открытые укрытия предлагают лишь скудную защиту самым отчаянным войскам и могут быть пересечены без помех.

**Примеры:** Кратеры, колючая проволока, разбросанные обломки.`,
        },
        {
          id: 'section-13-04',
          sectionNum: '13.04',
          title: 'Лёгкие (Light)',
          body: `Лёгкие укрытия могут обеспечить укрытие от направленных атак, но не замедляют продвижение врага и не предлагают долговременной защиты.

**Примеры:** Баррикады, невысокие стены, статуи.`,
        },
        {
          id: 'section-13-05',
          sectionNum: '13.05',
          title: 'Надёжные (Dense)',
          body: `Надёжные укрытия являются препятствием даже для самых крупных боевых машин и могут укрыть целые отделения от взгляда противника.

**Примеры:** Здания, руины, бронированные контейнеры, леса.`,
        },
        {
          id: 'section-13-06',
          sectionNum: '13.06',
          title: 'Укрытия и движение',
          body: `Модели могут перемещаться через различные категории **элементов укрытий** (terrain features) следующим образом:
▪ **Открытые/Лёгкие (Exposed/Light):** Все модели могут перемещаться горизонтально и вертикально через **открытые** и **лёгкие элементы укрытий**.
▪ **Надёжные (Dense):**
▫ INFANTRY/BEASTS/SWARM/MOBILE (ПЕХОТА/ЗВЕРИ/РОЙ/МОБИЛЬНЫЙ) могут перемещаться горизонтально через **надёжные элементы укрытий**.
▫ INFANTRY/BEASTS/SWARM (ПЕХОТА/ЗВЕРИ/РОЙ) могут также перемещаться вертикально через **надёжные элементы укрытий**.
▫ Другие модели могут перемещаться горизонтально через **надёжные элементы укрытий** при условии, что все секции этого **элемента укрытия**, через которые бы проходила база перемещающейся модели, имеют высоту 2" или менее. В противном случае модель должна перемещаться вертикально, чтобы подняться или спуститься по таким секциям. Они не могут перемещаться через потолки и полы, делая это, и не могут закончить этот манёвр на какой-либо поверхности этого **элемента укрытия**, которая не находится на уровне земли.

### Вертикальное движение
Модели могут перемещаться вертикально, чтобы подниматься или спускаться по **элементам укрытий**. При этом:
▪ Эта модель должна оставаться в пределах ½" по горизонтали от этого **элемента укрытия**.
▪ Прибавьте расстояние, пройденное вертикально вверх, и расстояние, пройденное вертикально вниз, к любому другому расстоянию, которое эта модель преодолела с момента начала манёвра её юнитом.

### Постановка моделей или завершение манёвра
Модели могут быть установлены или завершать манёвр на уровне земли **элементов укрытий**. Модели также могут быть установлены или завершать манёвр на любой поверхности **элемента укрытия**, которая не находится на уровне земли, если применяются **все** следующие условия:
▪ Эта модель имеет одно или несколько из следующих ключевых слов: INFANTRY/BEASTS/SWARM/FLY/MONSTER (ПЕХОТА/ЗВЕРИ/РОЙ/ЛЕТАЮЩИЙ/МОНСТР).
▪ После завершения этого манёвра эта модель устойчива, и ни одна часть её базы не свешивается за внешний край этой поверхности.

[img:/images/terrain/terrain-and-movement-ru.jpg|Укрытие и движение — движение моделей через укрытие]

[img:/images/terrain/terrain-and-movement-2-ru.jpg|Укрытие и движение, пример 2 — правила выноса базы]`,
          note: 'Сплошное укрытие: Если **элемент укрытия** (terrain feature) обладает правилом Сплошное (Solid) (13.11), модель не может завершить манёвр так, чтобы любая её часть оказалась по ту сторону любой закрытой части этого **элемента укрытия**, находящейся на высоте 3" или менее от уровня земли — даже через небольшие проёмы, такие как двери и окна.',
          children: [
            {
              title: 'Сплошное укрытие и движение',
              body: `Если **элемент укрытия** (terrain feature) обладает правилом **Сплошное** (Solid) (13.11), как **надёжные элементы укрытий** (dense terrain features), модель не может завершить манёвр так, чтобы любая её часть оказалась по ту сторону любой закрытой части этого **элемента укрытия**, находящейся на высоте 3" или менее от уровня земли — даже через небольшие проёмы, такие как двери и окна. Это гарантирует, что выступающие элементы моделей нельзя использовать, чтобы обойти ограничения видимости правила Сплошное.`,
            },
          ],
        },
        {
          id: 'section-13-07',
          sectionNum: '13.07',
          title: 'Укрытия и видимость',
          body: `Укрытия могут влиять на видимость в зависимости от того, применяются ли правила **Преимущества от укрытия** (Benefit of Cover), **Скрытности** (Hidden), **Загораживания** (Obscuring) или **Сплошного укрытия** (Solid).`,
        },
        {
          id: 'section-13-08',
          sectionNum: '13.08',
          title: 'Преимущество от укрытия (Benefit of Cover)',
          sideImage: { src: '/images/terrain/benefit-of-cover.jpg', alt: 'Benefit of Cover diagram', width: '50%' },
          body: `Каждый раз, когда дистанционная атака нацелена на юнит, если **каждая** модель в этом юните соответствует одному или нескольким из следующих условий, этот юнит получает **преимущество от укрытия** (benefit of cover) от этой атаки:
▪ Эта модель имеет ключевое слово INFANTRY/BEASTS/SWARM (ПЕХОТА/ЗВЕРИ/РОЙ) и находится в пределах **области укрытия** (terrain area).
▪ Эта модель **не полностью видна** (not fully visible) атакующей модели из-за одного или нескольких промежуточных **элементов укрытий** (terrain features) и/или одной или нескольких промежуточных **загораживающих областей укрытий** (obscuring terrain areas) (см. 13.10).

Каждый раз, когда дистанционная атака нацелена на юнит, который имеет **преимущество от укрытия** от этой атаки, ухудшите характеристику **BS** этой атаки на 1.`,
        },
        {
          id: 'section-13-09',
          sectionNum: '13.09',
          title: 'Скрытность (hidden)',
          body: `Модель находится в **скрытности** (hidden), пока к ней применяются **все** следующие условия:
▪ Эта модель имеет ключевое слово INFANTRY/BEASTS/SWARM (ПЕХОТА/ЗВЕРИ/РОЙ) и находится в пределах **области укрытия** (terrain area), которая содержит один или несколько **лёгких/надёжных элементов укрытий** (light/dense terrain features).
▪ Юнит этой модели **не совершал** одну или несколько дистанционных атак в течение этого хода или в течение предыдущего хода.

Пока модель находится в **скрытности**, она может быть **видна** (visible) только вражеским моделям, которые находятся в пределах её **радиуса обнаружения** (detection range). Если не указано иное, **радиус обнаружения** модели составляет 15".`,
          children: [
            {
              title: 'Скрытность и первый ход',
              body: `В течение первого хода условия, требующие, чтобы что-то не произошло в течение предыдущего хода, истинны. Для правила **Скрытность** (Hidden) это означает, что в течение первого хода юнит не совершал дистанционных атак в течение предыдущего хода.`,
            },
          ],
        },
        {
          id: 'section-13-10',
          sectionNum: '13.10',
          title: 'Загораживание (obscuring)',
          sideImage: { src: '/images/terrain/hidden-and-obscuring.jpg', alt: 'Hidden and Obscuring diagram', width: '50%' },
          body: `**Области укрытий** (terrain areas), содержащие один или несколько **лёгких** или **надёжных элементов укрытий**, являются **загораживающими областями укрытий** (obscuring terrain areas). Если каждая **линия обзора** (line of sight), проведённая между двумя моделями, пересекает одну или несколько **загораживающих областей укрытий** (за исключением **загораживающих областей укрытий**, внутри которых находится одна или обе эти модели), эти две модели **не видят** (not visible) друг друга.`,
        },
        {
          id: 'section-13-11',
          sectionNum: '13.11',
          title: 'Сплошное укрытие (Solid)',
          body: `**Надёжные укрытия** (Dense terrain) обладают правилом **Сплошное укрытие** (Solid). **Линию обзора** (line of sight) нельзя провести через любой закрытый проём в поверхности такого **элемента укрытия** (terrain feature), который находится на высоте 3" или менее от уровня земли.

[img:/images/terrain/solid-ru.jpg|Монолитное укрытие — диаграмма блокировки линии обзора]`,
          note: 'Примечание дизайнера: Это правило гарантирует, что модели **не видны** (not visible), пока укрываются в укрытиях на уровне земли, независимо от небольших отверстий, таких как двери, окна или нулевые отверстия, или из-за небольших зазоров между соседними **элементами укрытий**. 3" — это высота первого этажа многих **элементов укрытий**, но некоторые миссии могут корректировать высоту, на которой это правило вступает в силу.',
          children: [
            {
              title: 'Залегание (Gone to Ground)',
              body: `**Скрытные** (Hidden) модели, находящиеся внутри **сплошных элементов укрытий** (Solid terrain features), получают дополнительное преимущество, пока они **залегли** (gone to ground).

Модель **залегла** (gone to ground), пока выполняются все следующие условия:
▪ Эта модель **скрытна** (hidden).
▪ Эта модель **не полностью видна** (not fully visible) атакующей модели из-за одного или нескольких промежуточных **сплошных элементов укрытий** (Solid terrain features).
▪ Юнит этой модели не совершал одну или несколько дистанционных атак в течение этого хода или в течение предыдущего хода.
Пока модель **залегла**, вычтите 3" из её **радиуса обнаружения** (detection range).`,
              note: `Примечание дизайнера: Юниты, совершавшие дистанционные атаки в текущем или предыдущем ходу, не могут **залечь** (go to ground), независимо от любых способностей, позволяющих им стрелять и оставаться **скрытными** (hidden).`,
            },
          ],
        },
      ],
    },
    {
      id: '14',
      num: '14',
      title: 'Цели',
      page: 52,
      description: 'Цели представляют собой критические места, которые обе стороны пытаются захватить, и многие миссии требуют, чтобы ваши силы взяли их под контроль для достижения победы. В этом разделе описывается, как это сделать с помощью ваших моделей.',
      subsections: [
        {
          id: 'section-14-01',
          sectionNum: '14.01',
          title: 'Целевые объекты местности',
          body: `Если в миссии используются **цели** (objectives), в ней указывается, где они находятся на поле боя. Как правило, в вашей миссии будет карта развёртывания, показывающая несколько точек, в которых должны быть размещены **цели**. Расположение каждой точки должно совпадать с **областью укрытия** (terrain area) (13.01); этот **элемент укрытия** (terrain feature) является **целью** и называется **целевым объектом местности** (terrain objective).

При измерении расстояний до **цели** и от неё измеряйте расстояние до ближайшей её части.`,
          children: [
            {
              title: 'Цели, не находящиеся внутри области укрытия',
              body: `Если точка расположения **цели** (objective) не совпадает с **областью укрытия** (terrain area), вы должны обозначить местоположение этой **цели** плоским круглым маркером диаметром 40 мм, отцентрованным на этой точке — это называется **маркером цели** (objective marker). Модели могут проходить сквозь **маркеры цели** и могут завершить манёвр на **маркерах цели**.

Модель находится в пределах досягаемости **маркера цели**, пока она находится в пределах 3" по горизонтали и 5" по вертикали от этого **маркера цели**. При измерении расстояний до **маркера цели** и от него измеряйте до ближайшей его части.`,
            },
          ],
        },
        {
          id: 'section-14-02',
          sectionNum: '14.02',
          title: 'Уровень контроля',
          body: `В начале битвы ни одна **цель** (objective) на поле боя не находится под контролем кого-либо из игроков. Чтобы получить контроль над **целью**, игроку потребуется одна или несколько моделей с характеристикой **OC** 1 или более в пределах досягаемости до неё. Модель находится в пределах досягаемости до **целевого объекта местности** (terrain objective), пока она находится в пределах этой **области укрытия** (terrain area).

В конце каждой фазы и хода, чтобы определить **уровень контроля** (level of control) игрока над **целью**, сложите вместе значения характеристик **OC** всех моделей в армии этого игрока, которые находятся в пределах досягаемости этой **цели**:
▪ Игрок, у которого самый высокий **уровень контроля** над этой **целью**, контролирует эту **цель**.
▪ Если оба игрока имеют **одинаковый уровень контроля** над этой **целью**, то, если только эта **цель** не является **закреплённой** (secured) (см. ниже), эта **цель** не контролируется ни одним из игроков.

Пока одна или несколько **единиц** из армии игрока находятся в пределах досягаемости до **цели**, которую этот игрок контролирует, для каждой из этих единиц, которая содержит одну или несколько моделей с характеристикой OC 1 или более, считается, что эта единица контролирует данную **цель**.

[img:/images/terrain/controlling-a-terrain-objective-ru.jpg|Захват цели у укрытия — диаграмма контроля]`,
          note: 'Удержать любой ценой: Некоторые юниты имеют способности, которые срабатывают, когда они контролируют **цель** (objective), или когда они **закрепляют** (secure) **цель** для вашей армии.',
        },
        {
          id: 'section-14-03',
          sectionNum: '14.03',
          title: 'Закреплённые цели',
          body: `Некоторые правила позволяют **закрепить** (secure) **цель** (objective) за армией игрока. Когда **цель закреплена** за армией игрока, она остаётся под их контролем — даже если у него больше нет ни одного юнита в пределах досягаемости этой **цели**, — до тех пор, пока **уровень контроля** (level of control) противника над этой **целью** не станет выше его собственного в конце фазы.`,
        },
      ],
    },
    {
      id: '15',
      num: '15',
      title: 'Стратегемы',
      page: 54,
      description: 'Стратегемы можно использовать, тратя командные очки (CP), чтобы создавать эпические моменты тактического гения или непревзойдённой боевой мощи. Они применяются, когда игрок считает, что наступил переломный момент битвы, требующий дополнительного боевого мастерства или мимолётных, но мощных эффектов, чтобы склонить чашу весов на свою сторону.',
      subsections: [
        {
          id: 'section-15-01',
          sectionNum: '15.01',
          title: 'Использование стратегем',
          body: `В ходе битвы оба игрока могут использовать **стратегемы** (stratagems). Каждая **стратегема** указывает:
▪ **СТОИМОСТЬ:** Сколько командных очков (CP) требуется для использования.
▪ **КОГДА:** Когда её можно использовать.
▪ **ЦЕЛЬ:** Какие юниты она может выбирать целью.
▪ **ЭФФЕКТ:** Каковы эффекты от использования этой **стратегемы**.
▪ **ОГРАНИЧЕНИЯ:** Любые дополнительные ограничения, которые применяются.

Каждый игрок может использовать **одну и ту же стратегему** несколько раз в ходе битвы, но при этом действуют следующие ограничения:
▪ Каждый игрок не может использовать одну и ту же **стратегему** более одного раза в одной и той же фазе.
▪ Если не указано иное, каждый игрок не может назначить целью один и тот же юнит более чем для одной **стратегемы** в одной и той же фазе.

Каждый раз, когда вы используете **стратегему**, отыграйте следующую последовательность действий:
1. Выберите цели, как описано в данной **стратегеме**.
2. Уменьшите ваш запас командных очков (CP) на стоимость в CP, указанную в данной **стратегеме**. Если в **стратегеме** содержится раздел с дополнительной стоимостью в CP (например, +1 CP), вы можете использовать этот дополнительный раздел, только если вы увеличите стоимость **стратегемы** на указанную величину. Если у вас не осталось достаточного количества CP, вы не можете использовать эту **стратегему**.
3. Отыграйте эффекты данной **стратегемы**.`,
          children: [
            {
              title: 'Изменение стоимости в CP',
              body: `Некоторые правила изменяют стоимость использования определённых **стратегем** (stratagems). В таких случаях применяются следующие положения:
▪ Стоимость использования **стратегемы** в CP никогда не может быть изменена ниже 0 CP.
▪ Если правило изменяет стоимость **стратегемы** в CP, когда вы её используете, но не указывает продолжительность этого модификатора, этот модификатор применяется только к этому использованию этой **стратегемы**.`,
            },
            {
              title: 'Подвержен стратегеме',
              body: `Если отряд выбран целью **стратегемы** (stratagem), говорят, что он подвержен этой **стратегеме**.`,
            },
            {
              title: 'Определения стратегем',
              body: `▪ **Стратегемы вашего оппонента (Your Opponent's Stratagems):** **стратегемы** (stratagems), которые использует ваш оппонент, иногда называются стратегемами вашего оппонента.
▪ **Ваши стратегемы (Your Stratagems):** **стратегемы**, которые используете вы, иногда называются вашими **стратегемами**.
▪ **Ваш отряд (в стратегемах) (Your Unit (in Stratagems)):** Термин «ваш отряд(ы)» в разделе «Эффект» (Effect) **стратегем** всегда относится к отряду(ам), выбранному в разделе «Цель» (Target) этой **стратегемы**, и никогда не относится к каким-либо другим отрядам из вашей армии.`,
            },
          ],
        },
        {
          id: 'section-15-core-label',
          sectionNum: '',
          isGroupLabel: true,
          title: 'БАЗОВЫЕ СТРАТЕГЕМЫ',
          body: 'Все игроки могут использовать **базовые стратегемы** (core stratagems) (см. далее). Дополнительные **стратегемы** можно найти в кодексах и других публикациях.',
        },
        {
          id: 'section-15-09',
          sectionNum: '15.09',
          title: 'Стрельба на упреждение',
          inline: true,
          body: `◈ ДОПУСТИМО ЕСЛИ | Как указано в правиле, разрешающем этот **тип стрельбы**.
◈ ЭФФЕКТ | Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).
◈ ВО ВРЕМЯ СТРЕЛЬБЫ
▪ Вы можете выбирать целью только одного **видимого** (visible) вражеского юнита в пределах 24" от вашего юнита (и только если он является допустимой целью).
▪ Каждая атака попадает только на немодифицированном **броске на попадание** (hit roll) 6+ (независимо от характеристики **BS** атакующего оружия или любых модификаторов).
▪ Вы не можете перебрасывать броски попадания.
◈ ПОСЛЕ СТРЕЛЬБЫ | До конца фазы ваш юнит не может **начать действие** (start an action).`,
        },
      ],
      stratagems: [
        {
          flavor: 'Великий командующий способен подчинить своей воле даже превратности судьбы и удачи, чтобы обеспечить победу.',
          when: 'Любая фаза, сразу после того, как вы совершили один из следующих бросков за дружественный юнит или модель:\n▪ Бросок на продвижение (Advance roll)\n▪ Бросок на нападение (Charge roll)\n▪ Бросок на урон (Damage roll)\n▪ Бросок на опасность (Hazard roll)\n▪ Бросок на попадание (Hit roll)\n▪ Спас-бросок (Save roll)\n▪ Бросок на ранение (Wound roll)\n▪ Бросок для определения количества атак, совершаемых оружием',
          target: 'Этот юнит или модель.',
          effect: 'Вы перебрасываете этот бросок. Если вы бросаете несколько костей одновременно, выберите одну из этих костей для переброса (за исключением **бросков на нападение** (charge rolls), которые должны перебрасываться полностью).',
          restrictions: '',
          extraCost: [],
        },
        {
          flavor: 'Легенды 41-го тысячелетия изобилуют рассказами о смертельных поединках между могущественными героями.',
          when: 'Фаза ближнего боя, сразу после того, как дружественный юнит ПЕРСОНАЖА (CHARACTER) выбран для совершения атак.',
          target: 'Этот юнит ПЕРСОНАЖА.',
          effect: 'Выберите одну модель ПЕРСОНАЖА в вашем юните. До конца фазы оружие ближнего боя этой модели получает способность [PRECISION].',
          restrictions: '',
          extraCost: [],
        },
        {
          flavor: 'Безразличные к собственному выживанию, эти воины держат позицию даже против, казалось бы, неодолимых сил.',
          when: 'Шаг боевого шока (Battle-shock step) вашей фазы командования (Command phase), сразу перед тем, как вы совершаете **бросок на боевой шок** (battle-shock roll) за дружественный юнит.',
          target: 'Этот юнит.',
          effect: 'Этот **бросок на боевой шок** автоматически считается успешным.',
          restrictions: 'Вы не можете использовать эту стратегему более одного раза за игру.',
          extraCost: [],
        },
        {
          flavor: 'Активируя детонаторы гранат и другой взрывчатки, эти воины заносят руку и швыряют саму смерть в самую гущу неприятеля.',
          when: 'Ваша фаза стрельбы (Shooting phase).',
          target: 'Один дружественный **не вовлечённый в ближний бой** (unengaged) юнит EXPLOSIVES/GRENADES (ВЗРЫВЧАТКА/ГРАНАТЫ), который является допустимой целью для стрельбы и не совершал **продвижение** (advance move) в этом ходу.',
          effect: 'Отыграйте следующую последовательность действий:\n1. Выберите одну модель EXPLOSIVES/GRENADES в вашем юните.\n2. Выберите один **не вовлечённый в ближний бой** вражеский юнит в пределах 8" от этой модели и в зоне её видимости (visible).\n3. Бросьте шесть D6: за каждый результат 4+ этот вражеский юнит получает 1 **смертельную рану** (mortal wound).',
          restrictions: '',
          extraCost: [],
        },
        {
          flavor: 'В крайнем случае, бронированные машины и буйствующие чудовища могут пустить в ход свои исполинские габариты как оружие — давя и круша врагов под своей колоссальной тушей, пусть подобное и чревато ответными повреждениями.',
          when: 'Ваша фаза нападения (Charge phase), сразу после того, как дружественный юнит MONSTER/VEHICLE (МОНСТРА/ТРАНСПОРТА) завершает **манёвр нападения** (charge move).',
          target: 'Этот юнит MONSTER/VEHICLE.',
          effect: 'Отыграйте следующую последовательность действий:\n1. Выберите один вражеский юнит, **связанный ближним боем** (engaged) с вашим юнитом.\n2. Выберите одну модель в вашем юните, **связанную ближним боем** с этим вражеским юнитом.\n3. Бросьте количество D6, равное характеристике **T** этой модели: за каждый результат 1 ваш юнит получает 1 **смертельную рану** (mortal wound); за каждый результат 5+ этот вражеский юнит получает 1 **смертельную рану** (максимум 6 **смертельных ран** за юнит).',
          restrictions: '',
          extraCost: [],
        },
        {
          flavor: 'Будь то коварная стратегия, могущественные технологии или оккультный ритуал — есть множество путей, коими полководец может ускорить выдвижение своих войск.',
          when: 'Конец фазы движения (Movement phase) вашего противника.',
          target: 'Один дружественный юнит, находящийся в **стратегическом резерве** (strategic reserves) (не юнит AIRCRAFT).',
          effect: 'Этот юнит совершает **манёвр вторжения** (ingress move) (20.04).',
          restrictions: 'Вы не можете использовать эту стратегему во время первого раунда боя (battle round).',
          extraCost: [],
        },
        {
          flavor: 'Шквальный огонь обратит вспять любую атаку.',
          when: 'Конец фазы движения (Movement phase) вашего противника.',
          target: 'Один дружественный **не вовлечённый в ближний бой** (unengaged) юнит (не юнит TITANIC).',
          effect: 'Этот юнит использует **стрельбу на упреждение** (snap shooting) (15.09).',
          restrictions: '',
          extraCost: [],
          subRule: {
            sectionNum: '15.09',
            title: 'Стрельба на упреждение',
            fields: [
              { label: 'ДОПУСТИМО ЕСЛИ', text: 'Как указано в правиле, разрешающем этот **тип стрельбы**.' },
              { label: 'ЭФФЕКТ', text: 'Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).' },
              { label: 'ВО ВРЕМЯ СТРЕЛЬБЫ', text: '▪ Вы можете выбирать целью только одного **видимого** (visible) вражеского юнита в пределах 24" от вашего юнита (и только если он является допустимой целью).\n▪ Каждая атака попадает только на немодифицированном **броске на попадание** (hit roll) 6+ (независимо от характеристики **BS** атакующего оружия или любых модификаторов).\n▪ Вы не можете перебрасывать броски попадания.' },
              { label: 'ПОСЛЕ СТРЕЛЬБЫ', text: 'До конца фазы ваш юнит не может **начать действие** (start an action).' },
            ],
          },
        },
        {
          flavor: 'Даже самым искусным стрелкам трудно попасть в цель, укрытую клубящимися дымовыми завесами.',
          when: 'Начало фазы стрельбы (Shooting phase) вашего противника.',
          target: 'Один дружественный юнит SMOKE (ДЫМОВОЙ ЗАВЕСЫ).',
          effect: 'До конца фазы, каждый раз, когда атака нацелена на ваш юнит SMOKE или на юнит, который **не полностью видим** (not fully visible) атакующей модели из-за одной или нескольких моделей в вашем юните SMOKE, цель получает **преимущество от укрытия** (benefit of cover) от этой атаки (13.08).',
          restrictions: '',
          extraCost: [],
        },
        {
          flavor: 'Возвышая голоса в яростных боевых кличах, ваши воины устремляются вперёд, чтобы встретить вражеский натиск лицом к лицу.',
          when: 'Конец фазы нападения (Charge phase) вашего противника.',
          target: 'Один дружественный **не вовлечённый в ближний бой** (unengaged) юнит в пределах 12" от одного или нескольких вражеских юнитов. Вы можете выбрать юнит VEHICLE, только если это юнит CHARACTER/WALKER.',
          effect: 'Отыграйте **нападение** (charge) вашим юнитом (11.02). При этом перед совершением **броска на нападение** (charge roll) вы должны выбрать один из следующих режимов:\n▪ **Прыжок для защиты:** При выборе целей для нападения (charge targets) вы можете выбирать только те вражеские юниты, которые совершили **манёвр нападения** (charge move) в этой фазе и находятся в пределах **максимальной дистанции** (maximum distance).',
          restrictions: '',
          extraCost: [
            {
              cp: '+1CP',
              title: 'В гущу схватки',
              body: 'При совершении **броска на нападение** (charge roll), если его результат (после модификаторов) больше 6, измените его на 6. При выборе целей для нападения (charge targets) вы можете выбирать любые вражеские юниты, которые находятся в пределах 6" от вашего юнита и в пределах **максимальной дистанции** (maximum distance).',
            },
          ],
        },
        {
          flavor: 'В рукопашной схватке даже миг промедления даёт быстрому противнику шанс, которым он непременно воспользуется.',
          when: 'Шаг ближнего боя (Fight step) фазы ближнего боя (Fight phase) вашего противника, сразу после того, как вражеский юнит отыграл свои атаки.',
          target: 'Один дружественный юнит, который может **совершать атаки в ближнем бою** (eligible to fight).',
          effect: 'До конца фазы ваш юнит получает способность **«Атакует первым»** (Fights First) и он должен быть следующим юнитом, которого вы выбираете для совершения атак (select to fight) (12.04).',
          restrictions: '',
          extraCost: [],
        },
      ],
    },
    {
      id: '16',
      num: '16',
      title: 'Действия',
      page: 58,
      description: 'Действия (actions) представляют собой жизненно важные боевые задачи, которые должны выполнить ваши войска: от поиска утерянного археотеха до завершения кощунственного ритуала.',
      subsections: [
        {
          id: 'section-16-01',
          sectionNum: '16.01',
          title: 'Выполнение действий (actions)',
          body: `Некоторые правила позволяют юнитам выполнять **действия** (actions). Каждое **действие** (action) указывает:
▪ **НАЧАЛО:** Когда оно начинается.
▪ **ЮНИТЫ:** Какие дружественные юниты могут его выполнять.
▪ **ЛИМИТ ИСПОЛЬЗОВАНИЯ:** Сколько раз дружественные юниты могут его начать.
▪ **ЗАВЕРШЕНИЕ:** Когда оно завершается.
▪ **ЭФФЕКТ:** Каковы эффекты от его завершения.

### Начало действия (action)
Юнит **может начать действие** (eligible to start an action), если к нему **не** применяются одно или несколько из следующих условий:
▪ Он не находится на поле боя.
▪ Это юнит AIRCRAFT/FORTIFICATION (ЛЕТАТЕЛЬНОГО АППАРАТА/УКРЕПЛЕНИЯ).
▪ Он находится в состоянии **боевого шока** (battle-shocked).
▪ Он имеет характеристику OC 0 или «-».
▪ Он **связан ближним боем** (engaged) (если только это не TITANIC юнит).
▪ Он совершил **продвижение** (advance move) или **отступление** (fall-back move) в этом ходу.
▪ Он начал другое **действие** (action) в этом ходу.

Если юнит начинает **действие** (action), то до конца хода:
▪ Он **не может стрелять** (not eligible to shoot) (за исключением TITANIC юнитов).
▪ Он **не может объявлять нападение** (not eligible to declare a charge).

### Завершение действия (action)
Если юнит, выполняющий **действие** (action), совершает манёвр (за исключением **сближения** (pile-in) и **консолидации** (consolidation moves)) или покидает поле боя, этот юнит не завершает это **действие** (action). В противном случае, когда **действие** (action) завершается, срабатывает его раздел «Эффект».`,
          note: 'ГДЕ НАЙТИ ДЕЙСТВИЯ\n**Действия** (actions), которые могут использовать игроки, можно найти в других публикациях, таких как пакеты миссий. Все игроки могут использовать **базовые действия** (core actions), тогда как другие **действия** (actions) могут иметь ограничения, например по фракции армии (army faction).',
        },
      ],
    },
  ],
}
