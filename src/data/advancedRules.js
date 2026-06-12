export const advancedRules = [
  {
    id: '17',
    num: '17',
    title: 'Monsters and Vehicles',
    page: 62,
    description: 'This section explains special rules that apply to MONSTER and VEHICLE units.',
    subsections: [
      {
        id: 'section-17-01',
        sectionNum: '17.01',
        title: 'Moving Monsters and Vehicles',
        body: `During normal or advance moves, MONSTER/VEHICLE models can be moved through friendly and enemy models, excluding other MONSTER/VEHICLE models.`,
      },
      {
        id: 'section-17-02',
        sectionNum: '17.02',
        title: 'Frame',
        body: `Models without a base (most MONSTER/VEHICLE models) have the FRAME keyword. Distances are measured to or from the closest point on the model (not from a base). When rotating, turn around the model's central axis while keeping it upright.`,
      },
      {
        id: 'section-17-03',
        sectionNum: '17.03',
        title: 'Shooting at Engaged Monsters and Vehicles',
        body: `Enemy MONSTER/VEHICLE units that are engaged can be targeted by ranged attacks in the Shooting phase.
▪ Each such ranged attack: subtract 1 from the hit roll.
▪ Exception: no penalty for [CLOSE-QUARTERS] weapons made by models in a unit engaged with the target.`,
      },
    ],
  },
  {
    id: '18',
    num: '18',
    title: 'Transports',
    page: 64,
    description: 'This section explains rules for TRANSPORT models — how to embark and disembark.',
    subsections: [
      {
        id: 'section-18-01',
        sectionNum: '18.01',
        title: 'Transport Capacity',
        body: `Each TRANSPORT has a listed capacity for eligible models. Multiple units can embark in one TRANSPORT if capacity allows. Units can start the battle embarked (declared in the Declare Battle Formations step).`,
      },
      {
        id: 'section-18-02',
        sectionNum: '18.02',
        title: 'Embarking',
        body: `From battle round 1 onwards, a unit can embark after a normal, advance, or fall-back move if:
▪ Every model is within 3" of the TRANSPORT.
▪ The unit was not set up this turn.
▪ The unit is eligible per the TRANSPORT's datasheet.
▪ The TRANSPORT has remaining capacity.

Embarked units are removed from the battlefield.`,
      },
      {
        id: 'section-18-03',
        sectionNum: '18.03',
        title: 'Disembarking',
        body: `In the active player's Movement phase, embarked units can disembark. If a TRANSPORT is destroyed, all embarked units must make an emergency disembark move.`,
      },
      {
        id: 'section-18-04',
        sectionNum: '18.04',
        title: 'Disembark Move',
        body: `Set-up distance: 3" (Rapid/Tactical), 6" (Combat).
Eligible If: Embarked within a TRANSPORT on the battlefield; did not embark this phase; TRANSPORT did not advance or fall back this phase.

Select disembark mode in order:
▪ Rapid Disembark: TRANSPORT made a normal or ingress move this phase. Models must be set up within 3". If TRANSPORT made an ingress move, follow same restrictions. After: unit cannot declare a charge until end of turn.
▪ Tactical Disembark: TRANSPORT remained stationary or hasn't moved yet. Models set up within 3". After: unit makes a normal or advance move.
▪ Combat Disembark: Otherwise. Make hazard roll for each model; models can be set up engaged with enemies the TRANSPORT is engaged with. After: unit is battle-shocked and cannot charge until end of turn.`,
      },
      {
        id: 'section-18-05',
        sectionNum: '18.05',
        title: 'Emergency Disembark Move',
        body: `Set-up distance: 6". Used when a TRANSPORT was just destroyed.
▪ Make a hazard roll for each model before setting up.
▪ Each model is set up wholly within 6" of the TRANSPORT, as close as possible. Models that cannot be placed are destroyed.
▪ After: unit is battle-shocked; cannot charge until end of turn.`,
      },
    ],
  },
  {
    id: '19',
    num: '19',
    title: 'Attached Units',
    page: 66,
    description: 'This section explains how CHARACTER leaders can join bodyguard units to form powerful attached units.',
    subsections: [
      {
        id: 'section-19-01',
        sectionNum: '19.01',
        title: 'Forming Attached Units',
        body: `Units with the Leader or Support ability on their datasheet can lead other bodyguard units to form an attached unit (which acts as a single unit for all rules purposes). Which units can lead which is listed in the Warhammer 40,000 app.

Each bodyguard unit can only have one leader and one support unit attached.`,
      },
      {
        id: 'section-19-02',
        sectionNum: '19.02',
        title: 'Attacking Attached Units',
        body: `When an attached unit is targeted:
▪ Use the highest T of bodyguard models (even if leaders have different T). If only leader/support models remain, use their highest T.
▪ Rules triggered when a unit is destroyed only trigger when the last model that started the battle in the unit is destroyed.`,
      },
      {
        id: 'section-19-03',
        sectionNum: '19.03',
        title: 'Keywords in Attached Units',
        body: `The attached unit has all keywords of all component units. Individual models do not gain keywords from other models in the unit.

Example: If the leader has the PSYKER keyword, the whole attached unit has the PSYKER keyword. [ANTI-PSYKER] weapons can therefore score critical wounds against any model in the unit.`,
      },
      {
        id: 'section-19-04',
        sectionNum: '19.04',
        title: 'Abilities in Attached Units',
        body: `Leader/Support unit abilities apply to the attached unit until the last model in that leader/support unit is destroyed. Leader/support units continue to benefit from their own "while this model is leading a unit" abilities even after the bodyguard unit is destroyed.

Bodyguard unit datasheet abilities apply until the last model in that bodyguard unit is destroyed.

Specific model abilities (enhancement/wargear bearer) apply until that model is destroyed.

If the ability-granting model was destroyed by an attack, the ability applies until the attacking unit resolves all its attacks.`,
      },
    ],
    abilitiesTable: {
      headers: ['Source of Ability', 'Applies to Attached Unit Until...'],
      rows: [
        ['Leader/support unit', 'Last model in that leader/support unit is destroyed*'],
        ['Bodyguard unit (datasheet ability)', 'Last model in that bodyguard unit is destroyed'],
        ['Specific model (enhancement/wargear bearer)', 'That model is destroyed'],
      ],
    },
  },
  {
    id: '20',
    num: '20',
    title: 'Strategic Reserves',
    page: 68,
    description: 'This section explains how to keep units off the battlefield in strategic reserves and bring them in later.',
    subsections: [
      {
        id: 'section-20-01',
        sectionNum: '20.01',
        title: 'Placing Units in Strategic Reserves',
        body: `Before battle, in the Declare Battle Formations step, select units to keep in strategic reserves (not placed on the battlefield at the start). Cannot exceed 50% of your points limit. Embarked units within TRANSPORTs in reserves count toward the total.`,
      },
      {
        id: 'section-20-02',
        sectionNum: '20.02',
        title: 'Repositioned Units',
        body: `Units removed from the battlefield during battle and placed in reserves. Rules:
▪ If used in the Movement phase, can be used even after the unit has moved.
▪ Advance/fall-back/disembark moves made before repositioning still count.
▪ Persisting rules continue to apply while in reserves (except aura abilities if out of range; battle-shocked condition persists).`,
      },
      {
        id: 'section-20-03',
        sectionNum: '20.03',
        title: 'Arriving from Strategic Reserves',
        body: `Units must make an ingress move to arrive. By default, only from the second battle round onwards.

End of Third Battle Round: All remaining strategic reserves units that have not made an ingress move are destroyed. Exceptions: units embarked in TRANSPORTs that have arrived; repositioned units.`,
      },
      {
        id: 'section-20-04',
        sectionNum: '20.04',
        title: 'Ingress Move',
        body: `Set-up distance: 6".
Eligible If: In strategic reserves and not embarked within a TRANSPORT that is also in reserves.

Effect: Set up wholly within 6" of one or more battlefield edges and more than 8" horizontally from all enemy units.
▪ Before round 3: cannot be set up within opponent's deployment zone.
▪ After moving: cannot make any other move until start of next Charge phase.`,
      },
    ],
  },
  {
    id: '21',
    num: '21',
    title: 'Flying and Surging',
    page: 70,
    description: 'This section explains special movement rules for flying models and surge moves.',
    subsections: [
      {
        id: 'section-21-01',
        sectionNum: '21.01',
        title: 'Surge Moves',
        body: `A surge move is triggered by specific rules.
Maximum Distance: As stated by the triggering rule.
Eligible If: Rule triggered; unit is not battle-shocked; unit is unengaged; unit has not moved this phase.

Before Moving: Select the closest enemy unit as the surge target.
While Moving: Each model must end engaged with the surge target if possible; if not, end as close as possible.
After Moving: Cannot be engaged with units other than the surge target; cannot move again this phase.`,
      },
      {
        id: 'section-21-03',
        sectionNum: '21.03',
        title: 'Flying Models',
        body: `Models with the FLY keyword can take to the skies when making a normal, advance, fall-back, or charge move.

If declared:
▪ Subtract 2" from maximum distance (unless the unit has the Hover ability).
▪ While moving: ignore all vertical distance; can move through all models (including MONSTER/VEHICLE); can move through all categories of terrain.

Hover Ability (24.17): Taking to the skies does not reduce maximum distance.`,
      },
    ],
  },
  {
    id: '22',
    num: '22',
    title: 'Other Rules and Abilities',
    page: 72,
    description: 'This section explains several types of special abilities that appear across many datasheets.',
    subsections: [
      {
        id: 'section-22-01',
        sectionNum: '22.01',
        title: 'Aura Abilities',
        body: `Aura abilities affect models or units within a stated range and are tagged 'Aura'. A model is always within range of its own aura. A unit can benefit from multiple aura abilities, but duplicate auras only apply once.`,
      },
      {
        id: 'section-22-02',
        sectionNum: '22.02',
        title: 'Faction Abilities',
        body: `Rules common to all units in a particular faction (also called 'army rules'). Listed in the Faction Abilities section of datasheets. Only apply if the army's chosen faction keyword matches a faction keyword on the unit's datasheet.`,
      },
      {
        id: 'section-22-03',
        sectionNum: '22.03',
        title: 'Psychic Abilities',
        body: `Psychic abilities are tagged 'Psychic'. If a psychic ability causes wound loss, those wounds are inflicted by a psychic attack.`,
      },
      {
        id: 'section-22-04',
        sectionNum: '22.04',
        title: 'Wargear Abilities',
        body: `Wargear abilities are gained by having specific wargear. Listed in the Wargear Abilities section of a datasheet. If a unit has the wargear item, the ability applies to the unit. If a specific model has it, that model is the 'bearer' and the ability applies until that model is destroyed.`,
      },
      {
        id: 'section-22-05',
        sectionNum: '22.05',
        title: 'Plunging Fire',
        body: `Each time a ranged attack targets a visible unit with models on ground level, if either of the following apply:
▪ The attacking model is on a terrain feature section ≥3" in height, OR
▪ The attacking model has the TOWERING keyword and the target is within 12"

→ improve the BS of that attack by 1.

Plunging Fire has no effect on AIRCRAFT (23.03).`,
      },
    ],
  },
  {
    id: '23',
    num: '23',
    title: 'Aircraft',
    page: 74,
    description: 'This section explains the special rules that govern AIRCRAFT units.',
    subsections: [
      {
        id: 'section-23-01',
        sectionNum: '23.01',
        title: 'Deployment',
        body: `All AIRCRAFT must be placed in strategic reserves before the battle.`,
      },
      {
        id: 'section-23-02',
        sectionNum: '23.02',
        title: 'Movement',
        body: `AIRCRAFT can only make ingress moves; no other move types are available to them.

At the end of the opponent's turn, all AIRCRAFT on the battlefield must return to strategic reserves.

Other rules:
▪ Any unit making any move can move through AIRCRAFT models.
▪ During pile-in, consolidation, or surge moves (unless the unit can FLY), ignore AIRCRAFT units when selecting enemy units or determining closest enemy.
▪ Being engaged solely with AIRCRAFT does not prevent a unit from making normal or advance moves.`,
      },
      {
        id: 'section-23-03',
        sectionNum: '23.03',
        title: 'Shooting',
        body: `Plunging Fire has no effect on attacks made by or targeting AIRCRAFT.`,
      },
      {
        id: 'section-23-04',
        sectionNum: '23.04',
        title: 'Charging and Fighting',
        body: `AIRCRAFT cannot declare charges and can only make melee attacks targeting FLYING units. Only FLYING units can charge AIRCRAFT; only FLYING models can make melee attacks targeting AIRCRAFT.`,
      },
    ],
  },
]
