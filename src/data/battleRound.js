export const battleRound = [
  {
    id: '07',
    num: '07',
    title: 'The Battle Round',
    page: 28,
    description: 'Games of Warhammer 40,000 are played in a series of battle rounds. This section describes the structure of the battle round, defining the order in which players take turns to move their units and make attacks with them.',
    subsections: [
      {
        id: 'section-07-structure',
        sectionNum: '',
        title: 'Battle Round Structure',
        body: `Each battle round is resolved by following these steps:
▪ 1. Start of Battle Round
▪ 2. Player Turns
▪ 3. End of Battle Round`,
      },
      {
        id: 'section-07-01',
        sectionNum: '07.01',
        title: 'Start of Battle Round',
        body: `At the start of the battle round, players resolve rules that are triggered at the start of the battle round, before progressing to player turns.`,
      },
      {
        id: 'section-07-02',
        sectionNum: '07.02',
        title: 'Player Turns',
        body: `Both players now take one turn each. The same player always takes the first turn in each battle round – the mission you are playing will tell you which player this is. Once that player's turn has ended, their opponent takes their turn.

Each turn consists of seven parts: first the Start of Turn step, then a series of five phases resolved in the order shown below, then the End of Turn step.

### Turn Structure
[img:/images/turn/START-OF-TURN-STEP.png]
[img:/images/turn/COMMAND-PHASE.png]
[img:/images/turn/MOVEMENT-PHASE.png]
[img:/images/turn/SHOOTING-PHASE.png]
[img:/images/turn/CHARGE-PHASE.png]
[img:/images/turn/FIGHT-PHASE.png]
[img:/images/turn/END-OF-TURN-STEP.png]

[img:/images/turn-structure.png]`,
        example: `Player A won the roll-off and chose to take the first turn. In Battle Round 1, Player A completes their entire turn (Command → Movement → Shooting → Charge → Fight), then Player B takes theirs. In Battle Round 2, Player A again goes first — the order never changes mid-game.`,
      },
      {
        id: 'section-07-03',
        sectionNum: '07.03',
        title: 'End of Battle Round',
        body: `Rules that are triggered at the end of the battle round are resolved now, in the following order:
1. First resolve rules triggered at this point other than mission rules.
2. Both players then consult their mission; if one or both players have achieved any aspects of their mission that are triggered at this point, resolve them now.

The battle round then ends and, unless the battle ends, the next battle round starts. The mission you are playing will tell you how many battle rounds to resolve before the battle ends.`,
      },
    ],
  },
  {
    id: '08',
    num: '08',
    title: 'Command Phase',
    page: 30,
    description: 'In the Command phase, both players gain Core CP, then you check the combat readiness of your forces and use any strategic-level abilities you may have.',
    subsections: [
      {
        id: 'section-08-structure',
        sectionNum: '',
        title: 'Command Phase Steps',
        body: `The Command phase is resolved by following these steps:
▪ 1. Start of Command Phase
▪ 2. Gain Core CP
▪ 3. Battle-Shock
▪ 4. Command Abilities
▪ 5. End of Command Phase`,
      },
      {
        id: 'section-08-01',
        sectionNum: '08.01',
        title: 'Start of Command Phase',
        body: `Rules that are triggered at the start of the Command phase are resolved now.`,
      },
      {
        id: 'section-08-02',
        sectionNum: '08.02',
        title: 'Gain Core CP',
        body: `Both players gain 1 Command Point (CP).`,
        note: 'Command Points are a valuable resource you can spend to use stratagems (15). The Gain Core CP step ensures that both players gain 1CP each turn. While these are termed Core CP here, they are Command Points like any other.',
      },
      {
        id: 'section-08-03',
        sectionNum: '08.03',
        title: 'Battle-Shock',
        body: `The active player must now make one battle-shock roll (01.07) for each unit in their army that fulfils one or both of the following conditions:
▪ That unit is currently battle-shocked.
▪ That unit is at, or below, half-strength.

If a unit was battle-shocked at the start of this step and its battle-shock roll during this step succeeds, it is no longer battle-shocked.

### Battle-Shock Examples
▪ A unit with a starting strength of 3 that is currently **battle-shocked**: not at half-strength, but is battle-shocked — a roll must be made. If that roll succeeds, the unit will no longer be battle-shocked.
▪ A unit with a starting strength of 10 that has five models remaining: at half-strength — a roll must be made.
▪ A unit with a starting strength of 5 that has two models remaining: below half-strength — a roll must be made.
▪ A VEHICLE with a starting strength of 1 and a W characteristic of 11 that has 3 wounds remaining: below half-strength — a roll must be made.`,
        seeAlso: ['Battle-Shock Rolls 01.07', 'Half-strength 24.00', 'Multiple Battle-Shock Rolls 24.00'],
      },
      {
        id: 'section-08-04',
        sectionNum: '08.04',
        title: 'Command Abilities',
        body: `Rules that are triggered in the Command phase (excluding those that are triggered at the start or end of this phase, when gaining Core CP, or by battle-shock rolls) are resolved now.`,
      },
      {
        id: 'section-08-05',
        sectionNum: '08.05',
        title: 'End of Command Phase',
        body: `Rules that are triggered at the end of the Command phase are resolved now, in the following order:
1. First resolve rules triggered at this point other than mission rules.
2. Both players then consult their mission; if one or both players have achieved any aspects of their mission that are triggered at this point, resolve them now.`,
      },
    ],
  },
  {
    id: '09',
    num: '09',
    title: 'Movement Phase',
    page: 32,
    description: 'In the Movement phase, you will be able to move each of your units across the battlefield. Reinforcements can also arrive in this phase to bolster your forces.',
    subsections: [
      {
        id: 'section-09-structure',
        sectionNum: '',
        title: 'Movement Phase Steps',
        body: `The Movement phase is resolved by following these steps:
▪ 1. Start of Movement Phase
▪ 2. Move Units
▪ 3. End of Movement Phase`,
        note: 'Selecting Units to Move: When the Move Units step ends, the active player must have selected all of their units to make a move with, including those in strategic reserves. This means that before the phase ends, every unit in their army will have been selected to make a move, even if it is to remain stationary.',
      },
      {
        id: 'section-09-01',
        sectionNum: '09.01',
        title: 'Start of Movement Phase',
        body: `Rules that are triggered at the start of the Movement phase are resolved now.`,
      },
      {
        id: 'section-09-02',
        sectionNum: '09.02',
        title: 'Move Units',
        body: `The active player moves their units one at a time, using the sequence below, until all of their units have been selected to move and those moves have ended.

1. Select Unit: Select one friendly unit that has not been selected to move this phase. You can select a unit on the battlefield, in strategic reserves, or embarked within a TRANSPORT. That unit is selected to move.
2. Select Move Type: Select one move type that unit is eligible to make, and resolve it with that unit. This can be one listed below, or one presented elsewhere:
▪ Remain stationary
▪ Normal move
▪ Advance move
▪ Fall-back move
▪ Disembark move (18.04)
▪ Ingress move (20.04)`,
        seeAlso: ['Actions 16.00', 'Aircraft 23.00', 'Flying Models 21.03', 'Monsters and Vehicles 17.00', 'Strategic Reserves 20.00', 'Transports 18.00'],
      },
      {
        id: 'section-09-03',
        sectionNum: '09.03',
        title: 'End of Movement Phase',
        body: `Rules that are triggered at the end of the Movement phase are resolved now.`,
      },
      {
        id: 'section-09-04',
        sectionNum: '09.04',
        title: 'Remain Stationary',
        body: `Maximum Distance: '–'
Eligible If: Any unit.
Effect: No models are moved (either in straight lines or rotated). Units that remain stationary do not trigger any rules that are triggered when a unit starts or ends a move.`,
      },
      {
        id: 'section-09-05',
        sectionNum: '09.05',
        title: 'Normal Move',
        body: `Maximum Distance: Your unit's M characteristic.
Eligible If: Your unit is on the battlefield and unengaged.
Effect: Your unit moves as described in Moving (03).
After Moving: Your unit must be unengaged.`,
      },
      {
        id: 'section-09-06',
        sectionNum: '09.06',
        title: 'Advance Move',
        body: `Maximum Distance: Advance roll + your unit's M characteristic.
Eligible If: Your unit is on the battlefield and unengaged.
Effect: Your unit moves as described in Moving (03).
Before Moving: Make an advance roll by rolling one D6.
After Moving:
▪ Your unit must be unengaged.
▪ Until the end of the turn, unless otherwise stated, your unit is not eligible to declare a charge or start an action.`,
      },
      {
        id: 'section-09-07',
        sectionNum: '09.07',
        title: 'Fall-back Move',
        body: `Maximum Distance: Your unit's M characteristic.
Eligible If: Your unit is engaged.
Effect: Your unit moves as described in Moving (03).
Before Moving: Select fall-back mode:
▪ Ordered Retreat: If your unit is not battle-shocked, you can select this mode.
▪ Desperate Escape: Otherwise, you must select this mode. Make a hazard roll for each model in your unit (06.03).

While Moving:
▪ Desperate Escape: Each model that is moved can be moved through enemy models.

After Moving:
▪ Your unit must be unengaged.
▪ Until the end of the turn, unless otherwise stated, your unit is not eligible to shoot, declare a charge or start an action.
▪ Desperate Escape: If your unit is not battle-shocked, you must make a battle-shock roll for your unit (01.07).`,
        note: 'Selecting Modes: Modes are mutually exclusive, and you must assess each one in the order presented. When making a move, if your unit does not meet the conditions of any of the modes, it cannot make that move. In the case of fall-back moves, ordered retreat is not mandatory, so you could select desperate escape instead.',
      },
    ],
  },
  {
    id: '10',
    num: '10',
    title: 'Shooting Phase',
    page: 34,
    description: 'In the Shooting phase, your units will take aim and use their ranged weapons to fire at their chosen targets.',
    subsections: [
      {
        id: 'section-10-structure',
        sectionNum: '',
        title: 'Shooting Phase Steps',
        body: `The Shooting phase is resolved by following these steps:
▪ 1. Start of Shooting Phase
▪ 2. Shoot
▪ 3. End of Shooting Phase`,
      },
      {
        id: 'section-10-01',
        sectionNum: '10.01',
        title: 'Start of Shooting Phase',
        body: `Rules that are triggered at the start of the Shooting phase are resolved now.`,
      },
      {
        id: 'section-10-02',
        sectionNum: '10.02',
        title: 'Shoot',
        body: `The active player shoots with their eligible units one at a time, using the sequence below, until all the units they choose to shoot with have been selected to shoot and their attacks have been resolved.

A unit is eligible to shoot if it is on the battlefield and has not already been selected to shoot this phase.

1. Select Unit: Select one friendly unit that is eligible to shoot; that unit is selected to shoot.
2. Select Shooting Type: Select one shooting type that unit is eligible to make, and resolve it with that unit. This can be one listed below, or one presented elsewhere:
▪ Normal shooting
▪ Assault shooting
▪ Close-quarters shooting
▪ Indirect shooting`,
        seeAlso: ['Actions 16.00', 'Shooting at Engaged Monsters and Vehicles 17.03', 'Terrain and Visibility 13.07'],
      },
      {
        id: 'section-10-04',
        sectionNum: '10.04',
        title: 'Normal Shooting',
        body: `Eligible If: Your unit is unengaged and did not make an advance move this turn.
Effect: Your unit shoots as described in Making Attacks (04).
After Shooting: Until the end of the phase, your unit is not eligible to start an action.`,
      },
      {
        id: 'section-10-05',
        sectionNum: '10.05',
        title: 'Assault Shooting',
        body: `Eligible If: All of the following apply to your unit:
▪ Unengaged and made an advance move this turn.
▪ Has one or more [ASSAULT] weapons.
Effect: Your unit shoots as described in Making Attacks (04).
While Shooting: You can only select [ASSAULT] weapons to make attacks with.
After Shooting: Until the end of the phase, your unit is not eligible to start an action.`,
      },
      {
        id: 'section-10-06',
        sectionNum: '10.06',
        title: 'Close-Quarters Shooting',
        body: `Eligible If: All of the following apply to your unit:
▪ Engaged and did not make an advance move this turn.
▪ Has one or more [CLOSE-QUARTERS] weapons or is a MONSTER/VEHICLE unit.
Effect: Your unit shoots as described in Making Attacks (04).
While Shooting: Models in your unit can target enemy units your unit is engaged with.
▪ MONSTER/VEHICLE Models: Each time a MONSTER/VEHICLE model in your unit makes an attack — unless that attack is made with a [CLOSE-QUARTERS] weapon and targets a unit your unit is engaged with, subtract 1 from the hit roll. If that attack is made with a [BLAST] weapon, it still cannot target a unit your unit is engaged with.
▪ Non-MONSTER/Non-VEHICLE Models: You can only select [CLOSE-QUARTERS] weapons to make attacks with and you can only select enemy units that are engaged with your unit as targets.
After Shooting: Until the end of the phase, your unit is not eligible to start an action.`,
      },
      {
        id: 'section-10-07',
        sectionNum: '10.07',
        title: 'Indirect Shooting',
        body: `Eligible If: All of the following apply to your unit:
▪ Unengaged and did not make an advance move this turn.
▪ Has one or more [INDIRECT FIRE] weapons.
Effect: Your unit shoots as described in Making Attacks (04).
While Shooting:
▪ [INDIRECT FIRE] weapons in your unit can target units that are not visible to the attacking model.
▪ Each time an [INDIRECT FIRE] weapon makes an attack:
▪ The target has the benefit of cover against that attack (13.08).
▪ You cannot re-roll hit rolls.
▪ An unmodified hit roll of 1-5 fails, unless your unit remained stationary this turn and the target is visible to one or more friendly units, in which case an unmodified hit roll of 1-3 fails instead.
After Shooting: Until the end of the phase, your unit is not eligible to start an action.`,
        note: 'Indirect Fire: When you select indirect shooting for a unit, its [INDIRECT FIRE] weapons can launch punishing barrages on targets that are not visible, but don\'t forget that its other weapons can still target other visible targets.',
      },
    ],
  },
  {
    id: '11',
    num: '11',
    title: 'Charge Phase',
    page: 36,
    description: 'In the Charge phase, you will be able to make charge moves with your units. This represents your forces closing the distance with their foes in order to engage them in bloody close combat.',
    subsections: [
      {
        id: 'section-11-structure',
        sectionNum: '',
        title: 'Charge Phase Steps',
        body: `The Charge phase is resolved by following these steps:
▪ 1. Start of Charge Phase
▪ 2. Charge
▪ 3. End of Charge Phase`,
      },
      {
        id: 'section-11-01',
        sectionNum: '11.01',
        title: 'Start of Charge Phase',
        body: `Rules that are triggered at the start of the Charge phase are resolved now.`,
        note: 'Failed Charges: Note that, in the absence of modifiers to the charge roll, a result of 2 (a double 1) is never sufficient for a unit to complete a charge move, as a unit cannot be within engagement range (2") when it attempts a charge. Such a roll would therefore result in a failed charge, and the unit would not move.',
      },
      {
        id: 'section-11-02',
        sectionNum: '11.02',
        title: 'Charge',
        seeAlso: ['Target No Longer Eligible or Viable 24.00'],
        body: `The active player resolves charges with their eligible units one at a time, using the sequence below, until all of their units they choose to charge with have declared a charge and those charges have been resolved.

1. Declare Charge: Select one friendly unit that has not declared a charge this phase and is eligible to declare a charge. That unit declares a charge. A unit is eligible to declare a charge if it is on the battlefield, unless otherwise stated. Some rules that prevent a unit from being eligible to declare a charge:
▪ It is not within 12" of one or more enemy units.
▪ It is engaged.
▪ It made an advance or fall-back move this turn.

2. Make Charge Roll: Make a charge roll by rolling 2D6: the result is the maximum distance for the charge move.
3. Attempt Charge: If it is possible to make a charge move, and if you still want to, make a charge move with that unit. Otherwise, your unit does not make a charge move. In either case, the charge is then resolved.`,
      },
      {
        id: 'section-11-03',
        sectionNum: '11.03',
        title: 'End of Charge Phase',
        body: `Rules that are triggered at the end of the Charge phase are resolved now.`,
      },
      {
        id: 'section-11-04',
        sectionNum: '11.04',
        title: 'Charge Move',
        body: `Maximum Distance: Charge roll.
Eligible If: Your unit declared a charge this phase.
Effect: Your unit moves as described in Moving (03).

Before Moving: Select one or more enemy units that are within 12" of your unit and within the maximum distance of your unit; until the end of this move, each of those enemy units is a charge target.

While Moving:
▪ Each model must end its move closer to one or more charge targets.
▪ Each model that can end its move within 1" of one or more charge targets must do so.
▪ Each model that can end its move engaged with one or more charge targets must do so.

After Moving:
▪ Your unit must be engaged with all of the charge targets.
▪ Your unit cannot be engaged with one or more enemy units that are not charge targets.
▪ Until the end of the turn, each model in your unit has the Fights First ability (24.13).

[img:/images/charge-move.png]`,
      },
    ],
  },
  {
    id: '12',
    num: '12',
    title: 'Fight Phase',
    page: 38,
    description: 'In the Fight phase, both players get to act. First, units will pile in to maximise the number of models that are engaged, then all the combatants will make melee attacks, before units consolidate their position.',
    subsections: [
      {
        id: 'section-12-structure',
        sectionNum: '',
        title: 'Fight Phase Steps',
        body: `The Fight phase is resolved by following these steps:
▪ 1. Start of Fight Phase
▪ 2. Pile In
▪ 3. Fight
▪ 4. Consolidate
▪ 5. End of Fight Phase`,
        note: 'Do Units Have to Fight? Yes, you have to fight with all units that can, but you don\'t have to pile in or consolidate with a unit if you don\'t want to.',
      },
      {
        id: 'section-12-01',
        sectionNum: '12.01',
        title: 'Start of Fight Phase',
        body: `Rules that are triggered at the start of the Fight phase are resolved now.`,
      },
      {
        id: 'section-12-02',
        sectionNum: '12.02',
        title: 'Pile In',
        body: `Both players make pile-in moves with all of their eligible units they choose to move. The player whose turn it is resolves all of their moves first, followed by their opponent. Each unit cannot make more than one pile-in move during this step.

[img:/images/fight-start.png]

[img:/images/pile-in-moves.png]`,
      },
      {
        id: 'section-12-03',
        sectionNum: '12.03',
        title: 'Pile-In Move',
        body: `Maximum Distance: 3"
Eligible If: It is the Fight phase and one or more of the following apply to your unit:
▪ It is engaged.
▪ It made a charge move this turn.
▪ It was selected to make an overrun fight this phase.

Effect: Your unit moves as described in Moving (03).
Before Moving: Select pile-in targets:
→ If your unit is **engaged**, select every enemy unit it is **engaged** with as your pile-in targets.
→ Otherwise, select one or more enemy units within 5" of your unit as your pile-in targets.

While Moving:
▪ Models in base-contact with one or more enemy models cannot be moved.
▪ Each model that is moved must end its move closer to the closest pile-in target, and engaged with it if possible.

After Moving:
▪ Your unit must be engaged.
▪ Each model that started this move engaged with an enemy unit must still be engaged with that enemy unit.`,
      },
      {
        id: 'section-12-04',
        sectionNum: '12.04',
        title: 'Fight Step',
        body: `A unit is eligible to fight if it has not already been selected to fight this phase and one or more of the following apply to it:
▪ It is engaged, or it was engaged at the start of this step.
▪ It made a charge move this turn.

Players resolve the following sequence until all eligible units have been selected to fight and their attacks have been resolved:

1. Resolve Fights First Combats: Starting with the player whose turn it is, players alternate selecting one friendly **Fights First** unit that is **eligible to fight**; that unit is **selected to fight**. If this is not possible:
→ If there are no **Fights First** units that are **eligible to fight**, move to the Resolve Remaining Combats step where this player will select their next unit.
→ Otherwise, the other player selects their next unit.

2. Resolve Remaining Combats: Starting with the player who just moved this sequence onto this step, players alternate selecting one friendly unit that is **eligible to fight**; that unit is **selected to fight**. If this is not possible:
→ If there are no units that are **eligible to fight**, the Fight step ends.
→ Otherwise, the other player selects their next unit.

After resolving a fight in the Resolve Remaining Combats step, if there are one or more Fights First units that are now eligible to fight, return to the Resolve Fights First Combats step.`,
      },
      {
        id: 'section-12-05',
        sectionNum: '12.05',
        title: 'Normal Fight',
        body: `Eligible If: Your unit is **engaged**.
Effect: Your unit fights as described in Making Attacks (04).

[img:/images/normal-fight.png]`,
      },
      {
        id: 'section-12-06',
        sectionNum: '12.06',
        title: 'Overrun Fight',
        body: `Eligible If: Your unit is **unengaged**, or was **unengaged** at the start of the Fight step but became **engaged** during the Fight phase.
Effect: Your unit can make one additional pile-in move, then fights as described in Making Attacks (04).

[img:/images/overrun-fight.png]`,
        note: 'When a unit makes an overrun fight, its models can be moved such that enemy units that were unengaged become engaged. Such enemy units become eligible to fight this phase (and may even be able to fight next if they are Fights First units).',
      },
      {
        id: 'section-12-07',
        sectionNum: '12.07',
        title: 'Consolidate',
        body: `Both players make consolidation moves with all of their eligible units they choose to move. The player whose turn it is resolves all of their moves first, followed by their opponent. Each unit cannot make more than one consolidation move during this step.`,
      },
      {
        id: 'section-12-08',
        sectionNum: '12.08',
        title: 'Consolidation Move',
        body: `Maximum Distance: 3"
Eligible If: It is the Fight phase and your unit was **eligible to fight** this phase.
Effect: Your unit moves as described in Moving (03).

Before Moving: Select a consolidation mode:
→ **Ongoing Consolidation:** If your unit is **engaged**, you must select this mode and select every enemy unit it is **engaged** with.
→ **Engaging Consolidation:** Otherwise, if your unit is within 3" of one or more enemy units, you must select this mode and select one or more of those enemy units.
→ **Objective Consolidation:** Otherwise, if your unit is within 3" of one or more objectives, you must select this mode and select one of those objectives.

While Moving:
▪ **Ongoing Consolidation:** Models in base-contact with one or more enemy models cannot be moved. Each model that is moved must end its move closer to the closest selected enemy unit, and **engaged** with it if possible.
▪ **Engaging Consolidation:** Each model that is moved must end its move closer to the closest selected enemy unit, and **engaged** with it if possible.
▪ **Objective Consolidation:** Each model that is moved must end its move within range of the selected objective if possible, or closer to it if not.

After Moving:
▪ **Ongoing Consolidation:** Each model that started this move **engaged** with an enemy unit must still be **engaged** with that enemy unit.
▪ **Engaging Consolidation:** Your unit must be **engaged** with all of the selected enemy units. If one or more enemy units **engaged** with your unit have not been **selected to fight** this phase, your opponent must select each of those units, one at a time; when each is selected, it becomes **eligible to fight** and is **selected to fight** (12.04).
▪ **Objective Consolidation:** Your unit must be within range of the selected objective.

[img:/images/ongoing-consolidation.png]

[img:/images/objective-consolidation.png]`,
      },
      {
        id: 'section-12-09',
        sectionNum: '12.09',
        title: 'End of Fight Phase',
        body: `Rules that are triggered at the end of the Fight phase are resolved now.`,
      },
    ],
  },
]
