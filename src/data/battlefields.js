export const battlefields = [
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

[img:/images/terrain/terrain-placed-on-a-mat.png]

[img:/images/terrain/terrain-placed-on-the-battlefield.png]`,
      },
      {
        id: 'section-13-02',
        sectionNum: '13.02',
        title: 'Terrain Categories',
        body: `Each **terrain feature** belongs to a **terrain category**, which can affect the movement and visibility of models. Below are some examples of which types of **terrain features** fall under each category.

A mission's deployment map may define which **terrain categories** should be present within each **terrain area**. Meeting these requirements will create the best gaming experience.`,
        note: 'Note that **terrain features** sharing the same **terrain area** can belong to different **terrain categories**.',
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
▪ INFANTRY/BEASTS/SWARM/MOBILE models can move horizontally through **dense terrain features**.
▪ INFANTRY/BEASTS/SWARM models can also move vertically through **dense terrain features**.
▪ Other models can move horizontally through **dense terrain features** provided that all sections of that **terrain feature** that the moving model's base would move through are 2" or less in height. Otherwise, the moving model must move vertically to ascend or descend such sections. They cannot move through ceilings and floors while doing so, and they cannot end that move on any surface of that **terrain feature** that is not on ground level.

### Moving Vertically
Models can move vertically to ascend or descend **terrain features**. While doing so:
▪ That model must remain within ½" horizontally of that **terrain feature**.
▪ Add the distance moved vertically up, and the distance moved vertically down, to any other distance that model has moved since its unit began that move.

### Setting Up or Ending a Move
Models can be set up or end a move on the ground level of **terrain features**. Models can also be set up or end a move on any surface of a **terrain feature** that is not on ground level, if all of the following apply:
▪ That model has one or more of the following keywords: INFANTRY/BEASTS/SWARM/FLY/MONSTER.
▪ After ending that move, that model is stable and no part of its base overhangs the outer edge of that surface.

[img:/images/terrain/terrain-and-movement.png]

[img:/images/terrain/terrain-and-movement-2.png]`,
        note: 'Solid Terrain: If a **terrain feature** has the Solid rule (13.11), a model cannot end a move such that any part of it is through any enclosed part of that **terrain feature** that is 3" or less from ground level — not even through small openings such as doors and windows.',
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
        sideImage: { src: '/images/terrain/benefit-of-cover.png', alt: 'Benefit of Cover diagram', width: '50%' },
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
▪ That model has the INFANTRY/BEASTS/SWARM keyword and is within a **terrain area** that contains one or more **dense terrain features**.
▪ That model's unit did not make one or more ranged attacks during this turn or during the previous turn.

While a model is **hidden**, it can only be **visible** to enemy models that are within its **detection range**. Unless otherwise stated, a model's **detection range** is 15".`,
      },
      {
        id: 'section-13-10',
        sectionNum: '13.10',
        title: 'Obscuring',
        sideImage: { src: '/images/terrain/hidden-and-obscuring.png', alt: 'Hidden and Obscuring diagram', width: '50%' },
        body: `**Terrain areas** containing one or more **light** or **dense terrain features** are **obscuring terrain areas**. If every **line of sight** drawn between two models crosses one or more **obscuring terrain areas** (excluding **obscuring terrain areas** that one or both of those models are within), those two models are not **visible** to each other.`,
      },
      {
        id: 'section-13-11',
        sectionNum: '13.11',
        title: 'Solid',
        body: `Dense terrain features have the **Solid** rule. **Line of sight** cannot be drawn across any enclosed gap in the surface of such a **terrain feature** that is 3" or less from ground level.

[img:/images/terrain/solid.png]`,
        note: "Designer's Note: This rule ensures that models are not **visible** while sheltering in ground-level terrain, irrespective of small openings such as doors, windows or bullet holes, or because of small gaps between adjacent **terrain features**. 3\" is the height of the first floor of many **terrain features**, but some missions may adjust the height at which this rule takes effect.",
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

[img:/images/terrain/controlling-a-terrain-objective.png]`,
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
      },
      {
        id: 'section-15-09',
        sectionNum: '15.09',
        title: 'Snap Shooting',
        renderAfterStratagems: true,
        body: `◈ ELIGIBLE IF | As stated in the rule allowing this shooting type.
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
        when: 'Any phase, just after you make one of the following rolls for a friendly unit or model:\n▪ Advance roll\n▪ Charge roll\n▪ Damage roll\n▪ Hazard roll\n▪ Hit roll\n▪ Save roll\n▪ Wound roll\n▪ A roll to determine the number of attacks generated with a weapon',
        target: 'That unit or model',
        effect: 'You re-roll that roll. If you are rolling more than one dice together, select one of those dice to re-roll (excluding **charge rolls**, which you must re-roll in full).',
        restrictions: '',
      },
      {
        num: '15.03',
        name: 'Epic Challenge',
        cp: '1CP',
        when: 'Fight phase, just after a friendly CHARACTER unit is selected to fight',
        target: 'That CHARACTER unit',
        effect: 'Select one CHARACTER model in your unit. Until the end of the phase, that model\'s melee weapons have the [PRECISION] ability.',
        restrictions: '',
      },
      {
        num: '15.04',
        name: 'Insane Bravery',
        cp: '1CP',
        when: 'Battle-shock step of your Command phase, just before you make a **battle-shock roll** for a friendly unit',
        target: 'That unit',
        effect: 'That **battle-shock roll** is automatically successful.',
        restrictions: 'You cannot use this stratagem more than once per battle.',
      },
      {
        num: '15.05',
        name: 'Explosives',
        cp: '1CP',
        when: 'Your Shooting phase',
        target: 'One friendly **unengaged** EXPLOSIVES/GRENADES unit that is **eligible to shoot** and did not make an **advance move** this turn',
        effect: 'Resolve the following sequence:\n1. Select one EXPLOSIVES/GRENADES model in your unit.\n2. Select one **unengaged** enemy unit within 8" of and **visible** to that model.\n3. Roll six D6: for each result of 4+, that enemy unit suffers 1 **mortal wound**.',
        restrictions: '',
      },
      {
        num: '15.06',
        name: 'Crushing Impact',
        cp: '1CP',
        when: 'Your Charge phase, just after a friendly MONSTER or VEHICLE unit ends a **charge move**',
        target: 'That MONSTER or VEHICLE unit',
        effect: 'Resolve the following sequence:\n1. Select one enemy model **engaged** with your unit.\n2. Select one model in your unit that is **engaged** with that enemy model.\n3. Roll a number of D6 equal to the **T** characteristic of that enemy model: for each result of 1, your unit suffers 1 **mortal wound**; for each result of 5+, that enemy model\'s unit suffers 1 **mortal wound** (to a maximum of 6 **mortal wounds** per unit).',
        restrictions: '',
      },
      {
        num: '15.07',
        name: 'Rapid Ingress',
        cp: '1CP',
        when: 'End of your opponent\'s Movement phase',
        target: 'One friendly unit that is in strategic reserves (not an AIRCRAFT unit)',
        effect: 'That unit makes an ingress move (20.04).',
        restrictions: 'You cannot use this stratagem during the first battle round.',
      },
      {
        num: '15.08',
        name: 'Fire Overwatch',
        cp: '1CP',
        when: 'End of your opponent\'s Movement phase',
        target: 'One friendly **unengaged** unit (not a TITANIC unit)',
        effect: 'That unit shoots using snap shooting (15.09).',
        restrictions: '',
      },
      {
        num: '15.10',
        name: 'Smokescreen',
        cp: '1CP',
        when: 'Start of your opponent\'s Shooting phase',
        target: 'One friendly SMOKE unit',
        effect: 'Until the end of the phase, each time an attack targets your SMOKE unit, or targets a unit that is not **fully visible** to the attacking model because of one or more models in your SMOKE unit, the target has the **benefit of cover** against that attack (13.08).',
        restrictions: '',
      },
      {
        num: '15.11',
        name: 'Heroic Intervention',
        cp: '1CP',
        when: 'End of your opponent\'s Charge phase',
        target: 'One friendly **unengaged** unit within 12" of one or more enemy units. You can only select a VEHICLE unit if it is a CHARACTER/WALKER unit.',
        effect: 'Resolve a charge with your unit (11.02). While doing so, before making the **charge roll**, you must select one of the following modes:\n▪ **Leap to Defend:** When selecting **charge targets**, you can only select enemy units that made a **charge move** this phase and are within the **maximum distance**.\n▪ **Into the Fray (+1CP):** When making the **charge roll**, if the result is greater than 6 (after modifiers), change it to 6. When selecting **charge targets**, you can select any enemy units that are within 6" of your unit and within the **maximum distance**.',
        restrictions: '',
      },
      {
        num: '15.12',
        name: 'Counteroffensive',
        cp: '2CP',
        when: 'Fight step of your opponent\'s Fight phase, just after an enemy unit resolves its attacks',
        target: 'One friendly unit that is **eligible to fight**',
        effect: 'Until the end of the phase, your unit has the **Fights First** ability and it must be the next unit you **select to fight** (12.04).',
        restrictions: '',
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
]
