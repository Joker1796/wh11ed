export const battlefields = [
  {
    id: '13',
    num: '13',
    title: 'Terrain',
    page: 46,
    description: 'This section explains how to create an exciting battlefield using terrain features, and the rules for how terrain affects movement, visibility and combat.',
    subsections: [
      {
        id: 'section-13-01',
        sectionNum: '13.01',
        title: 'Placing Terrain',
        body: `Terrain can be placed using:
▪ A defined boundary or mat with terrain features within it.
▪ A single terrain feature directly on the battlefield.
▪ Two or more features defining an area together.

Each placement defines a terrain area. Missions may specify terrain placement.`,
      },
      {
        id: 'section-13-02',
        sectionNum: '13.02',
        title: 'Terrain Categories',
        body: `All terrain features fall into one of three categories: Exposed, Light, or Dense. These categories determine how terrain affects movement and visibility.`,
      },
      {
        id: 'section-13-03',
        sectionNum: '13.03',
        title: 'Exposed',
        body: `Exposed terrain provides minimal protection and can be traversed without hindrance. Models can move through and over exposed terrain features freely.

Examples: craters, razorwire, scattered debris.`,
      },
      {
        id: 'section-13-04',
        sectionNum: '13.04',
        title: 'Light',
        body: `Light terrain provides cover but won't slow movement. Models can move through and over light terrain features freely.

Examples: barricades, low walls, statuary.`,
      },
      {
        id: 'section-13-05',
        sectionNum: '13.05',
        title: 'Dense',
        body: `Dense terrain blocks even large models and can shelter entire squads from sight.

Examples: buildings, ruins, armoured containers, woods.`,
      },
      {
        id: 'section-13-06',
        sectionNum: '13.06',
        title: 'Terrain and Movement',
        body: `Exposed/Light Terrain: All models move through freely.

Dense Terrain:
▪ INFANTRY/BEASTS/SWARM/MOBILE models: can move horizontally through dense terrain.
▪ INFANTRY/BEASTS/SWARM models: can also move vertically through dense terrain.
▪ Other models (VEHICLES, etc.): can move horizontally through sections ≤2" tall; must move vertically for taller sections; cannot end a move on non-ground-level surfaces (except INFANTRY/BEASTS/SWARM/FLY/MONSTER with MOBILE keyword and a stable position).

Moving Vertically: Stay within ½" horizontally of the feature; vertical distance counts toward move total.

Solid Terrain: Models cannot end a move with any part through enclosed sections ≤3" from ground level.`,
      },
      {
        id: 'section-13-07',
        sectionNum: '13.07',
        title: 'Terrain and Visibility',
        body: `Terrain can affect visibility between models in several ways — through providing cover, hiding models, obscuring lines of sight, or being solid (see below).`,
      },
      {
        id: 'section-13-08',
        sectionNum: '13.08',
        title: 'Benefit of Cover',
        body: `A unit has the benefit of cover if every model in the unit meets one of the following conditions:
▪ Has the INFANTRY, BEASTS, or SWARM keyword and is within a terrain area.
▪ Is not fully visible to the attacking model due to intervening terrain or an obscuring terrain area.

Effect: Worsen the BS of the attacking weapon by 1 (e.g. a BS of 3+ becomes 4+).`,
      },
      {
        id: 'section-13-09',
        sectionNum: '13.09',
        title: 'Hidden',
        body: `A model is hidden if all of the following apply:
▪ The model has the INFANTRY, BEASTS, or SWARM keyword and is within a terrain area containing dense terrain.
▪ The unit did not make ranged attacks this turn or last turn.

While hidden: that model is only visible to enemies within detection range (default 15").`,
      },
      {
        id: 'section-13-10',
        sectionNum: '13.10',
        title: 'Obscuring',
        body: `Terrain areas with light or dense features are obscuring terrain areas. If every line of sight between two models crosses one or more obscuring terrain areas (excluding those the models are within), those models are not visible to each other.`,
      },
      {
        id: 'section-13-11',
        sectionNum: '13.11',
        title: 'Solid',
        body: `Dense terrain features have the Solid rule. Line of sight cannot be drawn across any enclosed gap ≤3" from ground level, regardless of doors, windows, or holes.`,
        note: 'Designer\'s Note: This rule ensures models sheltering on ground level in terrain aren\'t visible through small openings. The 3" threshold corresponds to a typical first-floor height.',
      },
    ],
  },
  {
    id: '14',
    num: '14',
    title: 'Objectives',
    page: 52,
    description: 'This section explains how to use terrain objectives and how to control them during play.',
    subsections: [
      {
        id: 'section-14-01',
        sectionNum: '14.01',
        title: 'Terrain Objectives',
        body: `Objectives are placed at terrain areas. Measure distances to or from the closest part of the objective marker or terrain area.`,
      },
      {
        id: 'section-14-02',
        sectionNum: '14.02',
        title: 'Level of Control',
        body: `At the start of the battle, no player controls any objective. To gain control, a player needs models with OC ≥ 1 within range (within the terrain area) of an objective.

At the end of each phase and turn: add together the OC of all models within range for each player.
▪ The player with the highest total OC controls that objective.
▪ If there is a tie, neither player controls it (unless it is secured).

A unit is considered to be "controlling" an objective if it is within range of an objective that the player controls and the unit contains one or more models with OC ≥ 1.`,
      },
      {
        id: 'section-14-03',
        sectionNum: '14.03',
        title: 'Secured Objectives',
        body: `Some rules allow a player to secure an objective. A secured objective remains under that player's control even after their models leave, until the opposing player's total OC exceeds theirs at the end of a phase.`,
      },
    ],
  },
  {
    id: '15',
    num: '15',
    title: 'Stratagems',
    page: 54,
    description: 'Stratagems are powerful tactical tools that can be used throughout the battle by spending Command Points.',
    subsections: [
      {
        id: 'section-15-01',
        sectionNum: '15.01',
        title: 'Using Stratagems',
        body: `Stratagems cost Command Points (CP). Each states its CP cost, WHEN it can be used, what TARGET it affects, its EFFECT, and any RESTRICTIONS.

Using a stratagem:
▪ Each player can use the same stratagem multiple times, but not more than once per phase.
▪ Cannot target the same unit with more than one stratagem per phase (unless stated).

Sequence: Select targets → Reduce CP → Resolve effect.

Optional additional sections with +CP cost may be taken if you have enough CP.`,
      },
    ],
    stratagems: [
      {
        num: '15.02',
        name: 'Command Re-roll',
        cp: '1CP',
        when: 'Any phase, just after making an advance, charge, damage, hazard, hit, save, or wound roll (or A roll)',
        target: 'Yourself',
        effect: 'Re-roll that roll. If rolling multiple dice, re-roll one of them. If making a charge roll, re-roll both dice.',
        restrictions: '',
      },
      {
        num: '15.03',
        name: 'Epic Challenge',
        cp: '1CP',
        when: 'Fight phase, just after a friendly CHARACTER unit is selected to fight',
        target: 'That CHARACTER unit',
        effect: 'One CHARACTER model\'s melee weapons gain [PRECISION] until the end of the phase.',
        restrictions: '',
      },
      {
        num: '15.04',
        name: 'Insane Bravery',
        cp: '1CP',
        when: 'Battle-shock step of Command phase, before making a battle-shock roll',
        target: 'One friendly unit required to make a battle-shock roll',
        effect: 'That roll is automatically successful.',
        restrictions: 'Once per battle.',
      },
      {
        num: '15.05',
        name: 'Explosives',
        cp: '1CP',
        when: 'Shooting phase',
        target: 'One friendly unit containing one or more EXPLOSIVES or GRENADES models',
        effect: 'Select one EXPLOSIVES/GRENADES model in the unit; select one unengaged enemy unit within 8" and visible to that model; roll 6D6 — for each result of 4+, that enemy unit suffers 1 mortal wound.',
        restrictions: '',
      },
      {
        num: '15.06',
        name: 'Crushing Impact',
        cp: '1CP',
        when: 'Charge phase, just after a friendly MONSTER or VEHICLE unit ends a charge move',
        target: 'That MONSTER or VEHICLE unit',
        effect: 'Select one enemy model engaged with the unit; roll D6 equal to that model\'s T characteristic: each 1 → 1 mortal wound to your unit; each 5+ → 1 mortal wound to that enemy model\'s unit (max 6 mortal wounds per unit).',
        restrictions: '',
      },
      {
        num: '15.07',
        name: 'Rapid Ingress',
        cp: '1CP',
        when: 'Start of opponent\'s Shooting phase',
        target: 'One friendly unit in strategic reserves (not AIRCRAFT)',
        effect: 'That unit makes an ingress move (20.04).',
        restrictions: 'Cannot use in battle round 1.',
      },
      {
        num: '15.08',
        name: 'Fire Overwatch',
        cp: '1CP',
        when: 'End of opponent\'s Movement phase',
        target: 'One friendly unengaged unit (not TITANIC)',
        effect: 'That unit shoots using snap shooting (15.09).',
        restrictions: '',
      },
      {
        num: '15.09',
        name: 'Snap Shooting',
        cp: '—',
        when: 'As triggered by another rule',
        target: '',
        effect: 'Shoot as per Making Attacks (04); can only target one visible enemy unit within 24"; each attack only hits on an unmodified roll of 6; cannot re-roll hit rolls.',
        restrictions: '',
      },
      {
        num: '15.10',
        name: 'Smokescreen',
        cp: '1CP',
        when: 'End of opponent\'s Movement phase',
        target: 'One friendly SMOKE unit',
        effect: 'Until the end of the phase: each attack targeting the SMOKE unit (or a unit not fully visible because of SMOKE unit models) gives the target the benefit of cover.',
        restrictions: '',
      },
      {
        num: '15.11',
        name: 'Heroic Intervention',
        cp: '1CP',
        when: 'End of opponent\'s Charge phase',
        target: 'One friendly unengaged unit within 12" of an enemy unit',
        effect: 'That unit resolves a charge. Two modes:\n▪ Leap to Defend: can only target enemy units that charged this phase.\n▪ Into the Fray: charge roll capped at 6; can select any enemy within 6" that is within the maximum distance.',
        restrictions: 'Only VEHICLE units that are also CHARACTER or WALKER are eligible.',
      },
      {
        num: '15.12',
        name: 'Counteroffensive',
        cp: '2CP (+1CP optional)',
        when: 'Fight step of opponent\'s Fight phase, just after an enemy unit resolves its attacks',
        target: 'One friendly eligible unit',
        effect: 'That unit gains Fights First and must be the next unit selected to fight.',
        restrictions: '',
      },
    ],
  },
  {
    id: '16',
    num: '16',
    title: 'Actions',
    page: 58,
    description: 'Actions represent tasks performed on the battlefield, such as deploying devices or completing rituals.',
    subsections: [
      {
        id: 'section-16-01',
        sectionNum: '16.01',
        title: 'Performing Actions',
        body: `Actions represent battlefield tasks (e.g. deploying devices, completing rituals). Each action states: STARTS, UNITS, USE LIMIT, COMPLETES, EFFECT.

Starting an Action: A unit is eligible to start an action unless:
▪ It is not on the battlefield.
▪ It is an AIRCRAFT or FORTIFICATION.
▪ It is battle-shocked.
▪ It has an OC of 0 or '-'.
▪ It is engaged (unless TITANIC).
▪ It made an advance or fall-back move this turn.
▪ It already started another action this turn.

After starting an action: until the end of the turn, that unit is not eligible to shoot (except TITANIC) and not eligible to declare a charge.

Completing an Action: If the unit makes a move (other than pile-in or consolidation) or leaves the battlefield, the action fails. Otherwise, when completed, the Effect is triggered.`,
        note: 'Core actions are universal to all armies. Other actions are found in mission packs and other publications.',
      },
    ],
  },
]
