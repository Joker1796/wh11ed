export const battleRound = {
 en: [
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
[img:/images/turn/START-OF-TURN-STEP.png|Phase icon: Start of Turn Step]
[img:/images/turn/COMMAND-PHASE.png|Phase icon: Command Phase]
[img:/images/turn/MOVEMENT-PHASE.png|Phase icon: Movement Phase]
[img:/images/turn/SHOOTING-PHASE.png|Phase icon: Shooting Phase]
[img:/images/turn/CHARGE-PHASE.png|Phase icon: Charge Phase]
[img:/images/turn/FIGHT-PHASE.png|Phase icon: Fight Phase]
[img:/images/turn/END-OF-TURN-STEP.png|Phase icon: End of Turn Step]`,
        example: `Player A won the roll-off and chose to take the first turn. In Battle Round 1, Player A completes their entire turn (Command → Movement → Shooting → Charge → Fight), then Player B takes theirs. In Battle Round 2, Player A again goes first — the order never changes mid-game.`,
        children: [
          {
            id: 'section-07-02-01',
            sectionNum: '07.02.01',
            title: 'Out Of Phase Rules',
            fromApp: true,
            body: `Some rules allow a model or unit to make a move, shoot, declare a charge or fight outside of the normal turn sequence.

When using these out-of-phase rules, you cannot use any other 'phase-locked' rules; that is, any other rule that explicitly states the phase in which that rule applies.`,
            example: `In your opponent's Movement phase, you target a friendly unit with the Fire Overwatch **stratagem**. That unit has an ability which is used 'In your Shooting phase, after this unit has shot'. Because Fire Overwatch is phase-locked to your opponent's Shooting phase, that ability is not triggered.`,
          },
          {
            id: 'section-07-02-02',
            sectionNum: '07.02.02',
            title: 'Battle Round/Turn/Phase Definitions',
            fromApp: true,
            body: `▪ **Start of Battle Round/Turn/Phase:** If a rule is triggered at the start of the battle round/turn/phase, it is triggered at the start of every battle round/turn/phase.
▪ **The Turn/the Phase:** If a rule is triggered during __the__ turn/phase instead of during __your__ turn/phase or __your opponent's__ turn/phase, it is triggered in both players' turn/phase.`,
            example: `If a rule states 'At the end of the Movement phase, this model **heals** 1 wound', that rule triggers at the end of your Movement phase and at the end of your opponent's Movement phase.`,
          },
        ],
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
        children: [
          {
            id: 'section-08-02-01',
            sectionNum: '08.02.01',
            title: 'Command Points',
            fromApp: true,
            body: `Command Points are a valuable resource you can spend to use **stratagems** (15). The Gain Core CP step ensures that both players gain 1CP each turn. While these are termed Core CP here, they are Command Points like any other. Other rules sometimes mention 'Core CP' when referring to these Command Points`,
          },
        ],
      },
      {
        id: 'section-08-03',
        sectionNum: '08.03',
        title: 'Battle-Shock',
        body: `The active player must now make one **battle-shock roll** (01.07) for each unit in their army that fulfils one or both of the following conditions:
▪ That unit is currently battle-shocked.
▪ That unit is at, or below, **half-strength**.

If a unit was battle-shocked at the start of this step and its **battle-shock roll** during this step succeeds, it is no longer battle-shocked.

[img:/images/command/battle-shock-examples.jpg|Battle shock example 1 — failed Battle Shock roll]
[img:/images/command/battle-shock-examples-2.jpg|Battle shock example 2 — unit with Starting Strength]
[img:/images/command/battle-shock-examples-3.jpg|Battle shock example 3 — multiple units in range]
[img:/images/command/battle-shock-examples-4.jpg|Battle shock example 4 — OC reduction]
`,
        seeAlso: ['Battle-Shock Rolls 01.07', 'Half-strength 24.00', 'Multiple Battle-Shock Rolls 24.00'],
        children: [
          {
            id: 'section-08-03-01',
            sectionNum: '08.03.01',
            title: 'Multiple Battle-shock Rolls',
            fromApp: true,
            body: `In the Battle-shock step (08.03), unless otherwise stated, no more than one **battle-shock roll** can be made by each unit. If for any reason a unit must make a **battle-shock roll** in this step before one it is required to make for being battle-shocked or at or below **half-strength**, that unit does not also have to make the **battle-shock roll** for being battle-shocked or at or below **half-strength**.`,
          },
        ],
      },
      {
        id: 'section-08-04',
        sectionNum: '08.04',
        title: 'Command Abilities',
        body: `Rules that are triggered in the Command phase (excluding those that are triggered at the start or end of this phase, when gaining Core CP, or by **battle-shock rolls**) are resolved now.`,
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
        note: 'Selecting Units to Move: When the Move Units step ends, the active player must have selected all of their units to make a move with, including those in **strategic reserves**. This means that before the phase ends, every unit in their army will have been selected to make a move, even if it is to remain stationary.',
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
        body: `The active player moves their units one at a time, using the sequence below, until all of their units have been **selected to move** and those moves have ended.

1. Select Unit: Select one friendly unit that has not been **selected to move** this phase. You can select a unit on the battlefield, in **strategic reserves**, or embarked within a TRANSPORT. That unit is **selected to move**.
2. Select **Move Type**: Select one **move type** that unit is eligible to make, and resolve it with that unit. This can be one listed below, or one presented elsewhere:
▪ Remain stationary
▪ **Normal move**
▪ **Advance move**
▪ **Fall-back move**
▪ **Disembark move** (18.04)
▪ **Ingress move** (20.04)`,
        seeAlso: ['Actions 16.00', 'Aircraft 23.00', 'Flying Models 21.03', 'Monsters and Vehicles 17.00', 'Strategic Reserves 20.00', 'Transports 18.00'],
        children: [
          {
            id: 'section-09-02-01',
            sectionNum: '09.02.01',
            title: 'Selecting Units To Move',
            fromApp: true,
            body: `When the Move Units step ends, the active player must have selected all of their units to make a move with, including those in **strategic reserves**. This means that before the phase ends, every unit in their army will have been selected to make a move, even if it is to **remain stationary** (09.04). Any units the active player does not select a **move type** for during this step will **remain stationary**.`,
          },
          {
            id: 'section-09-02-02',
            sectionNum: '09.02.02',
            title: 'Selecting Modes',
            fromApp: true,
            body: `Some rules instruct you to select a mode, such as **fall-back moves** (09.07). Modes are mutually exclusive, and you must assess each one in the order presented. When making a move, if your unit does not meet the conditions of any of the modes, it cannot make that move.

Sometimes a mode will be mandatory if applicable (e.g. **consolidation modes**, 12.08), but in the case of **fall-back moves**, **ordered retreat** is not mandatory, so you could select **desperate escape** instead.

Many **move types** state conditions you must meet while/after moving. Those that are labelled with a mode name only apply if you selected that mode; those not labelled with a mode name always apply.`,
          },
          {
            id: 'section-09-02-03',
            sectionNum: '09.02.03',
            title: 'Reinforcements Step',
            fromApp: true,
            body: `Rules that say they happen during the Reinforcements step happen during the Move Units step.`,
          },
        ],
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
        body: `◈ MAXIMUM DISTANCE | –
◈ ELIGIBLE IF | Any unit.
◈ EFFECT | No models are moved (either in straight lines or rotated). Units that **remain stationary** do not trigger any rules that are triggered when a unit starts or ends a move.`,
      },
      {
        id: 'section-09-05',
        sectionNum: '09.05',
        title: 'Normal Move',
        body: `◈ MAXIMUM DISTANCE | Your unit's **M** characteristic.
◈ ELIGIBLE IF | Your unit is on the battlefield and **unengaged**.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ AFTER MOVING | Your unit must be **unengaged**.`,
      },
      {
        id: 'section-09-06',
        sectionNum: '09.06',
        title: 'Advance Move',
        body: `◈ MAXIMUM DISTANCE | **Advance roll** + your unit's **M** characteristic.
◈ ELIGIBLE IF | Your unit is on the battlefield and **unengaged**.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Make an **advance roll** by rolling one D6.
◈ AFTER MOVING
▪ Your unit must be **unengaged**.
▪ Until the end of the turn, unless otherwise stated, your unit is not **eligible to declare a charge** or **start an action**.`,
      },
      {
        id: 'section-09-07',
        sectionNum: '09.07',
        title: 'Fall-back Move',
        body: `◈ MAXIMUM DISTANCE | Your unit's **M** characteristic.
◈ ELIGIBLE IF | Your unit is **engaged**.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select fall-back mode:
▪ **Ordered Retreat:** If your unit is not **battle-shocked**, you can select this mode.
▪ **Desperate Escape:** Otherwise, you must select this mode. Make a **hazard roll** for each model in your unit (06.03).
◈ WHILE MOVING
▪ **Desperate Escape:** Each model that is moved can be moved through enemy models.
◈ AFTER MOVING
▪ Your unit must be **unengaged**.
▪ Until the end of the turn, unless otherwise stated, your unit is not **eligible to declare a charge** or **start an action**.
▪ **Desperate Escape:** If your unit is not **battle-shocked**, you must make a **battle-shock roll** for your unit (01.07).`,
        note: '**SELECTING MODES**\nSome rules instruct you to select a mode, such as **fall-back moves** (09.07). Modes are mutually exclusive, and you must assess each one in the order presented. When making a move, if your unit does not meet the conditions of any of the modes, it cannot make that move.\n\nSometimes a mode will be mandatory if applicable (e.g. **consolidation modes** (12.08)), but in the case of **fall-back moves**, **ordered retreat** is not mandatory, so you could select **desperate escape** instead.\n\nMany **move types** state conditions you must meet while/after moving. Those that are labelled with a mode name only apply if you selected that mode; those not labelled with a mode name always apply.',
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
        body: `The active player shoots with their eligible units one at a time, using the sequence below, until all the units they choose to shoot with have been **selected to shoot** and their attacks have been resolved.

A unit is **eligible to shoot** if it is on the battlefield and has not already been **selected to shoot** this phase.

1. Select Unit: Select one friendly unit that is **eligible to shoot**; that unit is **selected to shoot**.
2. Select **Shooting Type**: Select one **shooting type** that unit is eligible to make, and resolve it with that unit. This can be one listed below, or one presented elsewhere:
▪ **Normal shooting** (10.04)
▪ **Assault shooting** (10.05)
▪ **Close-quarters shooting** (10.06)
▪ **Indirect shooting** (10.07)`,
        seeAlso: ['Actions 16.00', 'Shooting at Engaged Monsters and Vehicles 17.03', 'Terrain and Visibility 13.07'],
      },
      {
        id: 'section-10-03',
        sectionNum: '10.03',
        title: 'End of Shooting Phase',
        body: `Rules that are triggered at the end of the Shooting phase are resolved now.`,
      },
      {
        id: 'section-10-04',
        sectionNum: '10.04',
        title: 'Normal Shooting',
        body: `◈ ELIGIBLE IF | Your unit is **unengaged** and did not make an **advance move** this turn.
◈ EFFECT | Your unit shoots as described in Making Attacks (04).
◈ AFTER SHOOTING | Until the end of the phase, your unit is not **eligible to start an action**.`,
      },
      {
        id: 'section-10-05',
        sectionNum: '10.05',
        title: 'Assault Shooting',
        body: `◈ ELIGIBLE IF | All of the following apply to your unit:
▪ **Unengaged** and made an **advance move** this turn.
▪ Has one or more [ASSAULT] weapons.
◈ EFFECT | Your unit shoots as described in Making Attacks (04).
◈ WHILE SHOOTING | You can only select [ASSAULT] weapons to make attacks with.
◈ AFTER SHOOTING | Until the end of the phase, your unit is not **eligible to start an action**.`,
      },
      {
        id: 'section-10-06',
        sectionNum: '10.06',
        title: 'Close-Quarters Shooting',
        body: `◈ ELIGIBLE IF | All of the following apply to your unit:
▪ **Engaged** and did not make an **advance move** this turn.
▪ Has one or more [CLOSE-QUARTERS] weapons or is a MONSTER/VEHICLE unit.
◈ EFFECT | Your unit shoots as described in Making Attacks (04).
◈ WHILE SHOOTING | Models in your unit can target enemy units your unit is **engaged** with.
▪ **MONSTER/VEHICLE Models:** Each time a MONSTER/VEHICLE model in your unit makes an attack:
▫ Unless that attack is made with a [CLOSE-QUARTERS] weapon and targets a unit your unit is **engaged** with, subtract 1 from the **hit roll**.
▫ If that attack is made with a [BLAST] weapon, it still cannot target a unit your unit is **engaged** with.
▪ **Non-MONSTER/VEHICLE Models:** You can only select [CLOSE-QUARTERS] weapons and only target units **engaged** with your unit.
◈ AFTER SHOOTING | Until the end of the phase, your unit is not **eligible to start an action**.`,
      },
      {
        id: 'section-10-07',
        sectionNum: '10.07',
        title: 'Indirect Shooting',
        body: `◈ ELIGIBLE IF | All of the following apply to your unit:
▪ **Unengaged** and did not make an **advance move** this turn.
▪ Has one or more [INDIRECT FIRE] weapons.
◈ EFFECT | Your unit shoots as described in Making Attacks (04).
◈ WHILE SHOOTING | [INDIRECT FIRE] weapons can target units **not visible** to the attacking model. Each time an [INDIRECT FIRE] weapon makes an attack:
▪ The target has the **benefit of cover** against that attack (13.08).
▪ You cannot re-roll **hit rolls**.
▪ An **unmodified hit roll of 1–5** fails, unless your unit remained stationary this turn and the target is visible to a friendly unit — in which case **unmodified 1–3** fails instead.
◈ AFTER SHOOTING | Until the end of the phase, your unit is not **eligible to start an action**.`,
        note: '**INDIRECT FIRE**\nWhen you select **indirect shooting** for a unit, its [INDIRECT FIRE] weapons can launch punishing barrages on targets that are not visible, but don\'t forget that its other weapons can still target other visible targets.',
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
        note: 'Failed Charges: Note that, in the absence of modifiers to the **charge roll**, a result of 2 (a double 1) is never sufficient for a unit to complete a **charge move**, as a unit cannot be within **engagement range** (2") when it attempts a charge. Such a roll would therefore result in a failed charge, and the unit would not move.',
      },
      {
        id: 'section-11-02',
        sectionNum: '11.02',
        title: 'Charge',
        seeAlso: ['Target No Longer Eligible or Viable 24.00'],
        body: `The active player resolves charges with their eligible units one at a time, using the sequence below, until all of their units they choose to charge with have declared a charge and those charges have been resolved.

1. Declare Charge: Select one friendly unit that has not declared a charge this phase and is **eligible to declare a charge**. That unit declares a charge. A unit is **eligible to declare a charge** if it is on the battlefield, unless otherwise stated. Some rules that prevent a unit from being **eligible to declare a charge**:
▪ It is not within 12" of one or more enemy units.
▪ It is engaged.
▪ It made an advance or **fall-back move** this turn.

2. Make **Charge Roll**: Make a **charge roll** by rolling 2D6: the result is the **maximum distance** for the **charge move**.
3. Attempt Charge: If it is possible to make a **charge move**, and if you still want to, make a **charge move** with that unit. Otherwise, your unit does not make a **charge move**. In either case, the charge is then resolved.`,
        children: [
          {
            id: 'section-11-02-01',
            sectionNum: '11.02.01',
            title: 'Failed Charges',
            fromApp: true,
            body: `Note that in the absence of modifiers to the **charge roll**, a result of 2 (a double 1) is never sufficient for a unit to complete a **charge move**, as a unit cannot be within **engagement range** (2") when it attempts a **charge**. Such a roll would therefore result in a failed **charge**, and the unit would not move.`,
          },
        ],
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
        body: `◈ MAXIMUM DISTANCE | **Charge roll**.
◈ ELIGIBLE IF | Your unit **declared a charge** this phase.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select one or more enemy units that are within 12" of your unit and within the **maximum distance** of your unit; until the end of this move, each of those enemy units is a **charge target**.
◈ WHILE MOVING
▪ Each model must end its move closer to one or more **charge targets**.
▪ Each model that can end its move within 1" of one or more **charge targets** must do so.
▪ Each model that can end its move **engaged** with one or more **charge targets** must do so.
◈ AFTER MOVING
▪ Your unit must be **engaged** with all of the **charge targets**.
▪ Your unit cannot be **engaged** with one or more enemy units that are not **charge targets**.
▪ Until the end of the turn, each model in your unit has the **Fights First** ability (24.13).

[img:/images/charge/making-a-charge-move.jpg|Making a charge move — valid and invalid examples]`,
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
        body: `Rules that are triggered at the start of the Fight phase are resolved now.

[img:/images/fight/start-of-fight-phase.jpg|Fight phase order — fights first and fights last]`,
      },
      {
        id: 'section-12-02',
        sectionNum: '12.02',
        title: 'Pile In',
        body: `Both players make **pile-in moves** with all of their eligible units they choose to move. The player whose turn it is resolves all of their moves first, followed by their opponent. Each unit cannot make more than one **pile-in move** during this step.`,
      },
      {
        id: 'section-12-03',
        sectionNum: '12.03',
        title: 'Pile-In Move',
        body: `◈ MAXIMUM DISTANCE | 3"
◈ ELIGIBLE IF | It is the Fight phase and one or more of the following apply to your unit:
▪ It is **engaged**.
▪ It made a **charge move** this turn.
▪ It was selected to make an **overrun fight** this phase (12.06).
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select **pile-in targets**:
▪ If your unit is **engaged**, select every enemy unit it is **engaged** with as your **pile-in targets**.
▪ Otherwise, select one or more enemy units within 5" of your unit as your **pile-in targets**.
◈ WHILE MOVING
▪ Models in base-contact with one or more enemy models cannot be moved.
▪ Each model that is moved must end its move closer to the closest **pile-in target**, and **engaged** with it if possible.
◈ AFTER MOVING
▪ Your unit must be **engaged**.
▪ Each model that started this move **engaged** with an enemy unit must still be **engaged** with that enemy unit.

[img:/images/fight/pile-in-moves.jpg|Pile-in moves — engaging with enemy units]`,
      },
      {
        id: 'section-12-04',
        sectionNum: '12.04',
        title: 'Fight Step',
        body: `A unit is **eligible to fight** if it has not already been **selected to fight** this phase and one or more of the following apply to it:
▪ It is engaged, or it was engaged at the start of this step.
▪ It made a **charge move** this turn.

Players resolve the following sequence until all eligible units have been **selected to fight** and their attacks have been resolved:

1. Resolve Fights First Combats: Starting with the player whose turn it is, players alternate selecting one friendly **Fights First** unit that is **eligible to fight**; that unit is **selected to fight**. If this is not possible:
→ If there are no **Fights First** units that are **eligible to fight**, move to the Resolve Remaining Combats step where this player will select their next unit.
→ Otherwise, the other player selects their next unit.

2. Resolve Remaining Combats: Starting with the player who just moved this sequence onto this step, players alternate selecting one friendly unit that is **eligible to fight**; that unit is **selected to fight**. If this is not possible:
→ If there are no units that are **eligible to fight**, the Fight step ends.
→ Otherwise, the other player selects their next unit.

After resolving a fight in the Resolve Remaining Combats step, if there are one or more Fights First units that are now **eligible to fight**, return to the Resolve Fights First Combats step.`,
        children: [
          {
            id: 'section-12-04-01',
            sectionNum: '12.04.01',
            title: 'Eligible to fight, but unable to fight',
            fromApp: true,
            body: `During the Fight sequence, when the sequence returns to a player to select a unit to fight, if all of that player's units that are **eligible to fight** are more than 5" from all enemy units, that player can instead choose to pass and return the sequence to their opponent to select a unit. If both players pass in succession, or if one player passes when their opponent has no remaining units that are **eligible to fight**, the Fight step ends.`,
            note: `Designer's Note: Occasionally, all of a unit's targets will be **destroyed** before they have had a chance to fight, with no other targets close enough to **engage** with a **pile-in move**. In such cases, a player can choose to pass and wait to see if another enemy unit ends a **pile-in move** close enough to be attacked later in the phase.`,
          },
        ],
      },
      {
        id: 'section-12-fight-types',
        sectionNum: '',
        isGroupLabel: true,
        title: 'WHEN A UNIT IS SELECTED TO FIGHT',
        body: 'Each time a unit is **selected to fight**, select one **fight type** that unit is eligible to make, and resolve it with that unit. This can be one listed below, or one presented elsewhere:',
      },
      {
        id: 'section-12-05',
        sectionNum: '12.05',
        title: 'Normal Fight',
        body: `◈ ELIGIBLE IF | Your unit is **engaged**.
◈ EFFECT | Your unit fights as described in Making Attacks (04).

[img:/images/fight/normal-fight.jpg|Normal fight — eligible conditions]`,
      },
      {
        id: 'section-12-06',
        sectionNum: '12.06',
        title: 'Overrun Fight',
        body: `◈ ELIGIBLE IF | Your unit is **unengaged**, or was **unengaged** at the start of the Fight step but became **engaged** during the Fight phase.
◈ EFFECT | Your unit can make one additional **pile-in move**, then fights as described in Making Attacks (04).

[img:/images/fight/overrun-fight.jpg|Overrun fight — eligible conditions]`,
        note: 'When a unit makes an **overrun fight**, its models can be moved such that enemy units that were unengaged become engaged. Such enemy units become **eligible to fight** this phase (and may even be able to fight next if they are Fights First units).',
      },
      {
        id: 'section-12-07',
        sectionNum: '12.07',
        title: 'Consolidate',
        body: `Both players make **consolidation moves** with all of their eligible units they choose to move. The player whose turn it is resolves all of their moves first, followed by their opponent. Each unit cannot make more than one **consolidation move** during this step.`,
      },
      {
        id: 'section-12-08',
        sectionNum: '12.08',
        title: 'Consolidation Move',
        body: `◈ MAXIMUM DISTANCE | 3"
◈ ELIGIBLE IF | It is the Fight phase and your unit was **eligible to fight** this phase.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ BEFORE MOVING | Select a **consolidation mode**:
▪ **Ongoing Consolidation:** If your unit is **engaged**, you must select this mode and select every enemy unit it is **engaged** with.
▪ **Engaging Consolidation:** Otherwise, if your unit is within 3" of one or more enemy units, you must select this mode and select one or more of those enemy units.
▪ **Objective Consolidation:** Otherwise, if your unit is within 3" of one or more objectives, you must select this mode and select one of those objectives.
◈ WHILE MOVING
▪ **Ongoing Consolidation:** Models in base-contact with one or more enemy models cannot be moved. Each model that is moved must end its move closer to the closest selected enemy unit, and **engaged** with it if possible.
▪ **Engaging Consolidation:** Each model that is moved must end its move closer to the closest selected enemy unit, and **engaged** with it if possible.
▪ **Objective Consolidation:** Each model that is moved must end its move within range of the selected objective if possible, or closer to it if not.
◈ AFTER MOVING
▪ **Ongoing Consolidation:** Each model that started this move **engaged** with an enemy unit must still be **engaged** with that enemy unit.
▪ **Engaging Consolidation:** Your unit must be **engaged** with all of the selected enemy units. If one or more enemy units **engaged** with your unit have not been **selected to fight** this phase, your opponent must select each of those units, one at a time; when each is selected, it becomes **eligible to fight** and is **selected to fight** (12.04).
▪ **Objective Consolidation:** Your unit must be within range of the selected objective.

[img:/images/fight/ongoing-consolidation.jpg|Engaging consolidation move diagram]

[img:/images/fight/objective-consolidation.jpg|Objective consolidation move diagram]`,
        note: '**NEW FOES TO FACE**\nWhile using the **engaging consolidation** mode, your unit can end its **consolidation move** **engaged** with enemy units that have not yet fought this phase. If so, each of those enemy units will have an opportunity to fight your unit, so think carefully about how aggressively you want to move your unit using this mode.',
      },
      {
        id: 'section-12-09',
        sectionNum: '12.09',
        title: 'End of Fight Phase',
        body: `Rules that are triggered at the end of the Fight phase are resolved now.`,
      },
    ],
  },
 ],
 ru: [
  // 07 — Раунд боя
  {
    title: 'Раунд боя',
    description: 'Игры в Warhammer 40,000 играются серией раундов боя. В этом разделе описывается структура раунда боя, определяющая порядок, в котором игроки делают ходы, чтобы перемещать свои юниты и совершать ими атаки.',
    subsections: [
      {
        title: 'Структура раунда боя',
        body: `Каждый раунд боя совершается путём выполнения следующих шагов:
▪ 1. Начало раунда боя
▪ 2. Ходы игроков
▪ 3. Конец раунда боя`,
      },
      {
        title: 'Начало раунда боя',
        body: `В начале раунда боя игроки выполняют правила, которые срабатывают в начале раунда боя, прежде чем перейти к ходам игроков.`,
      },
      {
        title: 'Ходы игроков',
        body: `Теперь оба игрока делают по одному ходу. Один и тот же игрок всегда делает первый ход в каждом раунде боя — миссия, по которой вы играете, подскажет вам, какой именно игрок. После того как ход этого игрока закончился, его оппонент делает свой ход.

Каждый ход состоит из семи частей: сначала шаг «Начало хода»; затем серия из пяти фаз, совершаемых в порядке, показанном ниже, затем шаг «Конец хода».

### Структура хода
[img:/images/turn/start-of-turn-step-banner-ru.png|Шаг начала хода]
[img:/images/turn/command-phase-banner-ru.png|Фаза командования]
[img:/images/turn/movement-phase-banner-ru.png|Фаза движения]
[img:/images/turn/shooting-phase-banner-ru.png|Фаза стрельбы]
[img:/images/turn/charge-phase-banner-ru.png|Фаза нападения]
[img:/images/turn/fight-phase-banner-ru.png|Фаза ближнего боя]
[img:/images/turn/end-of-turn-step-banner-ru.png|Шаг конца хода]`,
        example: `Игрок А выиграл бросок и выбрал первый ход. В Раунде боя 1 Игрок А завершает свой полный ход (Командование → Движение → Стрельба → Нападение → Ближний бой), затем Игрок Б делает свой ход. В Раунде боя 2 Игрок А снова ходит первым — порядок не меняется на протяжении всей игры.`,
        children: [
          {
            title: 'Внефазовые правила',
            body: `Некоторые правила позволяют модели или юниту совершить манёвр, выстрелить, объявить нападение или сразиться вне обычной последовательности хода.

При использовании этих внефазовых правил вы не можете использовать никакие другие «привязанные к фазе» правила, то есть любые другие правила, которые явно указывают фазу, в которой они применяются.`,
            example: `В Фазе движения вашего оппонента вы нацеливаетесь на союзный юнит **стратагемой** (stratagem) Fire Overwatch. У этого юнита есть способность, используемая «В вашей Фазе стрельбы, после того как этот юнит выстрелил». Поскольку Fire Overwatch привязана к Фазе стрельбы вашего оппонента, эта способность не срабатывает.`,
          },
          {
            title: 'Определения раунда боя/хода/фазы',
            body: `▪ **Начало раунда боя/хода/фазы (Start of Battle Round/Turn/Phase):** Если правило срабатывает в начале раунда боя/хода/фазы, оно срабатывает в начале каждого раунда боя/хода/фазы.
▪ **Ход/фаза (The Turn/the Phase):** Если правило срабатывает в __течение__ хода/фазы, а не в __вашем__ ходе/фазе или ходе/фазе __вашего оппонента__, оно срабатывает в ходе/фазе обоих игроков.`,
            example: `Если правило гласит «В конце Фазы движения эта модель **исцеляет** 1 рану», это правило срабатывает в конце вашей Фазы движения и в конце Фазы движения вашего оппонента.`,
          },
        ],
      },
      {
        title: 'Конец раунда боя',
        body: `Правила, которые вступают в силу в конце раунда боя, выполняются в следующем порядке:
1. Сначала выполните правила, срабатывающие на этом этапе, за исключением правил миссии.
2. Затем оба игрока сверяются со своей миссией; если один или оба игрока выполнили какие-либо аспекты своей миссии, которые срабатывают на этом этапе, выполните их сейчас.

Затем раунд боя заканчивается и, если битва не заканчивается, начинается следующий раунд боя. Миссия, по которой вы играете, подскажет вам, сколько раундов боя нужно отыграть до окончания битвы.`,
      },
    ],
  },
  // 08 — Фаза командования
  {
    title: 'Фаза командования',
    description: 'В фазе командования оба игрока получают базовые командные очки (Core CP), затем вы проверяете боевой дух своих сил и используете любые способности стратегического уровня, которые у вас могут быть.',
    subsections: [
      {
        title: 'Шаги фазы командования',
        body: `Фаза командования происходит путём выполнения следующих шагов:
▪ 1. Начало фазы командования
▪ 2. Получение базовых CP
▪ 3. Шок (Battle-Shock)
▪ 4. Командные способности
▪ 5. Конец фазы командования`,
      },
      {
        title: 'Начало фазы командования',
        body: `Правила, срабатывающие в начале фазы командования, выполняются сейчас.`,
      },
      {
        title: 'Получение базовых CP',
        body: `Оба игрока получают 1 командное очко (CP).`,
        note: 'Командные очки (CP) — это ценный ресурс, который вы можете тратить на использование стратагем (15). Этап получения базовых CP гарантирует, что оба игрока получают по 1 CP в каждый ход. Хотя здесь они называются базовыми (Core CP), это такие же командные очки, как и любые другие. Некоторые правила иногда упоминают «базовые CP» (Core CP), когда говорят об этих очках.',
        children: [
          {
            title: 'Командные очки (Command Points)',
            body: `**Командные очки** (Command Points) — это ценный ресурс, который вы можете тратить на использование **стратагем** (stratagems) (15). Шаг «Получение базовых CP» гарантирует, что оба игрока получают по 1 CP каждый ход. Хотя здесь они называются базовыми CP (Core CP), это командные очки, как и любые другие. Другие правила иногда упоминают «базовые CP» (Core CP), ссылаясь на эти командные очки.`,
          },
        ],
      },
      {
        title: 'Шок (Battle-Shock)',
        body: `Активный игрок должен теперь сделать одну проверку на боевой шок (battle-shock roll) (01.07) для каждого юнита в своей армии, который соответствует одному или обоим следующим условиям:
▪ Этот юнит в настоящее время подвержен **боевому шоку (battle-shocked)**.
▪ Этот юнит находится на или ниже **половинной численности (half-strength)**.

Если юнит был подвержен **боевому шоку (battle-shocked)** в начале этого шага и его проверка **боевого шока (battle-shock roll)** во время этого шага успешна, он больше не подвержен **боевому шоку (battle-shocked)**.

[img:/images/command/battle-shock-examples-ru.jpg|Тест боевого шока, пример 1 — провал броска]
[img:/images/command/battle-shock-examples-2-ru.jpg|Тест боевого шока, пример 2 — юнит с Starting Strength]
[img:/images/command/battle-shock-examples-3-ru.jpg|Тест боевого шока, пример 3 — несколько юнитов]
[img:/images/command/battle-shock-examples-4-ru.jpg|Тест боевого шока, пример 4 — снижение OC]
`,
        children: [
          {
            title: 'Несколько проверок боевого шока',
            body: `На шаге «Боевой шок» (08.03), если не указано иное, каждый юнит может сделать не более одной **проверки боевого шока** (battle-shock roll). Если по какой-либо причине юнит должен сделать **проверку боевого шока** на этом шаге раньше той, которую он обязан сделать за подверженность боевому шоку или за нахождение на — или ниже — **половинной численности** (half-strength), этому юниту не нужно также делать **проверку боевого шока** за подверженность боевому шоку или за нахождение на — или ниже — **половинной численности**.`,
          },
        ],
      },
      {
        title: 'Командные способности',
        body: `Правила, срабатывающие в фазе командования (за исключением тех, которые срабатывают в начале или конце этой фазы, при получении базовых CP или при **проверках боевого шока** (battle-shock rolls)), выполняются сейчас.`,
      },
      {
        title: 'Конец фазы командования',
        body: `Правила, срабатывающие в конце фазы командования, выполняются сейчас, в следующем порядке:
1. Сначала выполняются правила, срабатывающие в этот момент, отличные от правил миссии.
2. Затем оба игрока сверяются со своей миссией; если один или оба игрока достигли каких-либо аспектов своей миссии, которые срабатывают в этот момент, выполните их сейчас.`,
      },
    ],
  },
  // 09 — Фаза движения
  {
    title: 'Фаза движения',
    description: 'В фазе движения вы сможете перемещать каждый из своих отрядов по полю боя. Подкрепления также могут прибыть в эту фазу, чтобы усилить ваши силы.',
    subsections: [
      {
        title: 'Шаги фазы движения',
        body: `Фаза движения осуществляется путём выполнения следующих шагов:
▪ 1. Начало фазы движения
▪ 2. Движение юнитов
▪ 3. Конец фазы движения`,
        note: 'Выбор юнитов для манёвра: Когда шаг «Движение юнитов» заканчивается, активный игрок должен выбрать все свои юниты для совершения манёвра, включая находящихся в стратегических резервах (strategic reserves). Это означает, что до окончания фазы каждый юнит в его армии будет выбран для совершения манёвра, даже если он должен оставаться неподвижным (remain stationary).',
      },
      {
        title: 'Начало фазы движения',
        body: `Правила, срабатывающие в начале фазы движения, выполняются сейчас.`,
      },
      {
        title: 'Движение юнитов',
        body: `Активный игрок перемещает свои юниты по одному, используя последовательность ниже, пока все его юниты не будут **выбраны для манёвра (selected to move)** и эти манёвры не закончатся.

1. Выбор юнита: Выберите один союзный юнит, который ещё не был выбран для манёвра (selected to move) в этой фазе. Вы можете выбрать юнит на поле боя, в стратегических резервах (strategic reserves) или внутри ТРАНСПОРТА (TRANSPORT). Этот юнит выбран для манёвра (selected to move).
2. Выбор **типа манёвра**: Выберите один **тип манёвра** (move type), который этот юнит имеет право совершить, и выполните его с этим юнитом. Это может быть один из перечисленных ниже или представленный в другом месте:
▪ Remain stationary (Оставаться неподвижным) (см.далее)
▪ Normal move (Обычный манёвр) (см.далее)
▪ Advance move (Продвижение) (см.далее)
▪ Fall-back move (Отступление) (см.далее)
▪ Disembark move (Высадка) (18.04)
▪ Ingress move (Вторжение) (20.04)`,
        children: [
          {
            title: 'Выбор юнитов для манёвра',
            body: `Когда шаг «Перемещение юнитов» заканчивается, активный игрок должен выбрать все свои юниты для совершения манёвра, включая находящиеся в **стратегических резервах** (strategic reserves). Это означает, что до конца фазы каждый юнит в его армии будет выбран для совершения манёвра, даже если это означает **остаться недвижимым** (remain stationary) (09.04). Любые юниты, для которых активный игрок не выбрал **тип манёвра** (move type) на этом шаге, **остаются недвижимыми**.`,
          },
          {
            title: 'Выбор режимов',
            body: `Некоторые правила предписывают вам выбрать режим, например **манёвры отступления** (fall-back moves) (09.07). Режимы взаимоисключающие, и вы должны оценивать каждый из них в указанном порядке. При совершении манёвра, если ваш юнит не соответствует условиям ни одного из режимов, он не может совершить этот манёвр.

Иногда режим обязателен, если применим (например, **режимы консолидации** (consolidation modes), 12.08), но в случае **манёвров отступления** **упорядоченное отступление** (ordered retreat) не обязательно, поэтому вместо него вы можете выбрать **отчаянное бегство** (desperate escape).

Многие **типы манёвров** (move types) указывают условия, которые вы должны соблюсти во время/после манёвра. Те, что помечены названием режима, применяются только если вы выбрали этот режим; те, что не помечены названием режима, применяются всегда.`,
          },
          {
            title: 'Шаг подкреплений',
            body: `Правила, которые, как указано, происходят во время шага «Подкрепления» (Reinforcements step), происходят во время шага «Перемещение юнитов».`,
          },
        ],
      },
      {
        title: 'Конец фазы движения',
        body: `Правила, срабатывающие в конце фазы движения, выполняются сейчас.`,
      },
      {
        title: 'Оставаться неподвижным',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | –
◈ ПРАВО НА ВЫБОР | Любой юнит.
◈ ЭФФЕКТ | Ни одна модель не перемещается (ни по прямой, ни поворачивается). Юниты, которые **остаются неподвижными (remain stationary)**, не активируют правила, которые срабатывают, когда юнит начинает или заканчивает манёвр.`,
      },
      {
        title: 'Обычный манёвр',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Характеристика **M** вашего юнита.
◈ ПРАВО НА ВЫБОР | Ваш юнит находится на поле боя и **не связан боем (unengaged)**.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПОСЛЕ МАНЁВРА | Ваш юнит должен быть **не связан боем (unengaged)**.`,
      },
      {
        title: 'Продвижение',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Бросок на продвижение (advance roll) + характеристика **M** вашего юнита.
◈ ПРАВО НА ВЫБОР | Ваш юнит находится на поле боя и **не связан боем (unengaged)**.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПЕРЕД МАНЁВРОМ | Сделайте **бросок на продвижение (advance roll)**: бросьте один D6.
◈ ПОСЛЕ МАНЁВРА
▪ Ваш юнит должен быть **не связан боем (unengaged)**.
▪ До конца хода, если не указано иное, ваш юнит **не имеет права объявлять нападение** и **начинать действие (start an action)**.`,
      },
      {
        title: 'Отступление',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Характеристика **M** вашего юнита.
◈ ПРАВО НА ВЫБОР | Ваш юнит **связан боем (engaged)**.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПЕРЕД МАНЁВРОМ | Выберите режим отступления:
▪ **Упорядоченное отступление (Ordered Retreat):** Если ваш юнит не подвержен **боевому шоку (not battle-shocked)**, вы можете выбрать этот режим.
▪ **Отчаянный побег (Desperate Escape):** В противном случае вы должны выбрать этот режим. Сделайте **проверку опасности (hazard roll)** для каждой модели в вашем юните (06.03).
◈ ВО ВРЕМЯ МАНЁВРА
▪ **Отчаянный побег:** Каждую перемещаемую модель можно перемещать сквозь вражеские модели.
◈ ПОСЛЕ МАНЁВРА
▪ Ваш юнит должен быть **не связан боем (unengaged)**.
▪ До конца хода, если не указано иное, ваш юнит **не имеет права объявлять нападение** и **начинать действие (start an action)**.
▪ **Отчаянный побег:** Если ваш юнит не подвержен **боевому шоку**, вы должны сделать **проверку боевого шока (battle-shock roll)** для вашего юнита (01.07).`,
        note: '**ВЫБОР РЕЖИМОВ**\nНекоторые правила предписывают вам выбирать режим, например, для отступления (fall-back moves) (09.07). Режимы взаимоисключающие, и вы должны оценивать каждый в представленном порядке. При совершении манёвра, если ваш юнит не соответствует условиям ни одного из режимов, он не может совершить этот манёвр.\n\nИногда режим является обязательным, если применим (например, режимы консолидации (consolidation modes) (12.08)), но в случае отступления (fall-back moves) упорядоченное отступление (ordered retreat) не является обязательным, поэтому вы можете вместо него выбрать отчаянный побег (desperate escape).\n\nМногие типы манёвров (move types) указывают условия, которые должны быть соблюдены во время/после манёвра. Те, которые помечены названием режима, применяются только если вы выбрали этот режим; те, которые не помечены названием режима, применяются всегда.',
      },
    ],
  },
  // 10 — Фаза стрельбы
  {
    title: 'Фаза стрельбы',
    description: 'В фазу стрельбы ваши подразделения будут прицеливаться и использовать своё дальнобойное оружие для ведения огня по выбранным целям.',
    subsections: [
      {
        title: 'Шаги фазы стрельбы',
        body: `Фаза стрельбы проводится в соответствии со следующими шагами:
▪ 1. Начало фазы стрельбы
▪ 2. Стрельба
▪ 3. Конец фазы стрельбы`,
      },
      {
        title: 'Начало фазы стрельбы',
        body: `Правила, срабатывающие в начале фазы стрельбы, выполняются сейчас.`,
      },
      {
        title: 'Стрельба',
        body: `Активный игрок стреляет своими имеющими на это право юнитами по одному, используя последовательность ниже, пока все юниты, которые он решил задействовать для стрельбы, не будут **выбраны для стрельбы (selected to shoot)** и их атаки не будут выполнены.

Юнит **имеет право стрелять (eligible to shoot)**, если он находится на поле боя и ещё не был выбран для стрельбы в этой фазе (selected to shoot).
1. Выберите юнит: Выберите один союзный юнит, который **имеет право стрелять (eligible to shoot)**; этот юнит **выбран для стрельбы (selected to shoot)**.
2. Выберите **тип стрельбы**: Выберите один **тип стрельбы (shooting type)**, который этот юнит имеет право совершить, и выполните его с этим юнитом. Это может быть один из перечисленных ниже или представленный в другом месте:
▪ Normal shooting (Обычная стрельба) (10.04)
▪ Assault shooting (Штурмовая стрельба) (10.05)
▪ Close-quarters shooting (Стрельба в ближнем бою) (10.06)
▪ Indirect shooting (Непрямая стрельба) (10.07)`,
      },
      {
        title: 'Конец фазы стрельбы',
        body: `Правила, срабатывающие в конце фазы стрельбы, выполняются сейчас.`,
      },
      {
        title: 'Обычная стрельба',
        body: `◈ ПРАВО НА ВЫБОР | Ваш юнит **не связан боем (unengaged)** и не совершал **продвижение (advance move)** в этом ходу.
◈ ЭФФЕКТ | Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).
◈ ПОСЛЕ СТРЕЛЬБЫ | До конца фазы ваш юнит **не имеет права начинать действие (eligible to start an action)**.`,
      },
      {
        title: 'Штурмовая стрельба',
        body: `◈ ПРАВО НА ВЫБОР | К вашему юниту применяется всё следующее:
▪ **Не связан боем (unengaged)** и совершил **продвижение (advance move)** в этом ходу.
▪ Имеет одно или несколько орудий [ASSAULT].
◈ ЭФФЕКТ | Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).
◈ ВО ВРЕМЯ СТРЕЛЬБЫ | Вы можете выбирать только орудия [ASSAULT] для совершения атак.
◈ ПОСЛЕ СТРЕЛЬБЫ | До конца фазы ваш юнит **не имеет права начинать действие (eligible to start an action)**.`,
      },
      {
        title: 'Стрельба в ближнем бою',
        body: `◈ ПРАВО НА ВЫБОР | К вашему юниту применяется всё следующее:
▪ **Связан боем (engaged)** и не совершал **продвижение (advance move)** в этом ходу.
▪ Имеет одно или несколько орудий [CLOSE-QUARTERS] или является юнитом МОНСТР/ТЕХНИКА (MONSTER/VEHICLE).
◈ ЭФФЕКТ | Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).
◈ ВО ВРЕМЯ СТРЕЛЬБЫ | Модели в вашем юните могут нацеливаться на вражеские юниты, с которыми ваш юнит **связан боем (engaged)**:
▪ **Модели МОНСТР/ТЕХНИКА:** Каждый раз, когда модель МОНСТР/ТЕХНИКА в вашем юните совершает атаку:
▫ Если эта атака не совершается орудием [CLOSE-QUARTERS] и не нацелена на юнит, с которым ваш юнит связан боем, вычтите 1 из **броска на попадание (hit roll)**.
▫ Если эта атака совершается орудием [BLAST], оно по-прежнему **не может** нацеливаться на юнит, с которым ваш юнит **связан боем (engaged)**.
▪ **Модели без МОНСТР/ТЕХНИКА:** Вы можете выбирать только орудия [CLOSE-QUARTERS] и только целями **связанные боем (engaged)** с вашим юнитом вражеские юниты.
◈ ПОСЛЕ СТРЕЛЬБЫ | До конца фазы ваш юнит **не имеет права начинать действие (eligible to start an action)**.`,
      },
      {
        title: 'Непрямая стрельба',
        body: `◈ ПРАВО НА ВЫБОР | К вашему юниту применяется всё следующее:
▪ **Не связан боем (unengaged)** и не совершал **продвижение (advance move)** в этом ходу.
▪ Имеет одно или несколько орудий [INDIRECT FIRE].
◈ ЭФФЕКТ | Ваш юнит стреляет, как описано в разделе «Совершение атак» (04).
◈ ВО ВРЕМЯ СТРЕЛЬБЫ | Орудия [INDIRECT FIRE] в вашем юните могут стрелять по юнитам, **невидимым (not visible)** атакующей модели. Каждый раз, когда орудие [INDIRECT FIRE] совершает атаку:
▪ Цель получает **преимущество укрытия (benefit of cover)** от этой атаки (13.08).
▪ Вы **не можете** перебрасывать **броски на попадание (hit rolls)**.
▪ **Немодифицированный бросок на попадание 1–5** проваливается, если только ваш юнит не оставался неподвижным в этом ходу и цель не видна союзному юниту — в таком случае вместо этого проваливается немодифицированный бросок **1–3**.
◈ ПОСЛЕ СТРЕЛЬБЫ | До конца фазы ваш юнит **не имеет права начинать действие (eligible to start an action)**.`,
        note: '**НЕПРЯМОЙ ОГОНЬ**\nКогда вы выбираете непрямую стрельбу для юнита, его орудия [INDIRECT FIRE] могут обрушивать губительные залпы на цели, которые не видны, но не забывайте, что его другое оружие всё ещё может нацеливаться на другие видимые цели.',
      },
    ],
  },
  // 11 — Фаза нападения
  {
    title: 'Фаза нападения',
    description: 'В фазе нападения вы сможете совершать нападения (charge moves) своими отрядами. Это отражает то, как ваши силы сокращают дистанцию с врагами, чтобы вступить с ними в кровавый ближний бой.',
    subsections: [
      {
        title: 'Шаги фазы нападения',
        body: `Фаза нападения выполняется в следующем порядке:
▪ 1. Начало фазы нападения
▪ 2. Нападение
▪ 3. Конец фазы нападения`,
      },
      {
        title: 'Начало фазы нападения',
        body: `Правила, срабатывающие в начале фазы нападения, выполняются сейчас.`,
        note: 'Проваленные нападения (Failed Charges): Обратите внимание, что при отсутствии модификаторов броска нападения (charge roll) результат 2 (две единицы) никогда недостаточен для завершения юнитом манёвра нападения (charge move), так как юнит не может находиться в радиусе связывания боем (2") при попытке совершить нападение (charge). Такой бросок привёл бы к провалу нападения (failed charge), и юнит не переместился бы.',
      },
      {
        title: 'Нападение (Charge)',
        body: `Активный игрок выполняет **нападения (charges)** своими имеющими право юнитами по одному, используя последовательность ниже, пока все юниты, которыми он решил совершить нападение, не **объявят нападение (declared a charge)** и эти нападения не будут выполнены.

1. Объявить нападение (Declare Charge): Выберите один союзный юнит, который ещё **не объявлял нападение (not declared a charge)** в этой фазе и **имеет право объявить нападение (eligible to declare a charge)** (см. ниже). Этот юнит объявляет нападение.
Юнит имеет право объявить нападение, если он находится на поле боя, если не указано иное. Вот некоторые правила, которые лишают юнит **права объявить нападение (eligible to declare a charge)**:
▪ Он не находится в пределах 12" от одного или нескольких вражеских юнитов.
▪ Он **связан боем (engaged)**.
▪ Он совершил **продвижение (advance)** или **отступление (fall-back move)** в этом ходу.

2. Сделайте бросок на нападение (Make Charge Roll): Сделайте бросок на нападение, бросив 2D6: результат является **максимальным расстоянием** для манёвра нападения (charge move).
3. Попытка нападения (Attempt Charge): Если возможно совершить манёвр нападения (charge move) и если вы всё ещё хотите этого, совершите манёвр нападения этим юнитом. В противном случае ваш юнит не совершает манёвр нападения. В любом случае нападение затем завершается.`,
        children: [
          {
            title: 'Неудавшиеся нападения',
            body: `Обратите внимание, что в отсутствие модификаторов к **броску нападения** (charge roll) результат 2 (две единицы) никогда не достаточен для завершения юнитом **манёвра нападения** (charge move), так как юнит не может находиться в **радиусе связывания** (engagement range) (2"), когда он совершает **нападение** (charge). Поэтому такой бросок приведёт к неудавшемуся **нападению**, и юнит не будет перемещаться.`,
          },
        ],
      },
      {
        title: 'Конец фазы нападения',
        body: `Правила, срабатывающие в конце фазы нападения, выполняются сейчас.`,
      },
      {
        title: 'Манёвр нападения (Charge Move)',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | Бросок на нападение (Charge roll).
◈ ПРАВО НА ВЫБОР | Ваш юнит **объявил нападение (declared a charge)** в этой фазе.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПЕРЕД МАНЁВРОМ | Выберите одного или нескольких вражеских юнитов, которые находятся в пределах 12" от вашего юнита и в пределах **максимального расстояния** от вашего юнита; до конца этого манёвра каждый из этих вражеских юнитов является **целью нападения (charge target)**.
◈ ВО ВРЕМЯ МАНЁВРА
▪ Каждая модель должна завершить свой манёвр ближе к одной или нескольким **целям нападения (charge targets)**.
▪ Каждая модель, которая может завершить свой манёвр в пределах 1" от одной или нескольких **целей нападения (charge targets)**, должна сделать это.
▪ Каждая модель, которая может завершить свой манёвр **в бою (engaged)** с одной или несколькими **целями нападения (charge targets)**, должна сделать это.
◈ ПОСЛЕ МАНЁВРА
▪ Ваш юнит должен быть **в бою (engaged)** со всеми **целями нападения (charge targets)**.
▪ Ваш юнит **не может** быть **в бою (engaged)** с вражескими юнитами, которые **не являются целями нападения (charge targets)**.
▪ До конца хода каждая модель в вашем юните обладает способностью **«Первый удар» (Fights First)** (24.13).

[img:/images/charge/making-a-charge-move-ru.jpg|Ход нападения — допустимые и недопустимые примеры]`,
      },
    ],
  },
  // 12 — Фаза ближнего боя
  {
    title: 'Фаза ближнего боя',
    description: 'В фазе ближнего боя действуют оба игрока. Сначала юниты сближаются, чтобы максимизировать количество моделей, связанных боем, затем все участники наносят удары в ближнем бою, после чего юниты консолидируются на своих позициях.',
    subsections: [
      {
        title: 'Шаги фазы ближнего боя',
        body: `Фаза ближнего боя совершается путём выполнения следующих шагов:
▪ 1. Начало фазы ближнего боя
▪ 2. Сближение
▪ 3. Бой
▪ 4. Консолидация
▪ 5. Конец фазы ближнего боя`,
        note: 'Должны ли юниты сражаться? Да, вы должны сражаться всеми юнитами, которые могут, но вы не обязаны сближаться (pile in) или консолидироваться (consolidate) с юнитом, если не хотите.',
      },
      {
        title: 'Начало фазы ближнего боя',
        body: `Правила, срабатывающие в начале фазы ближнего боя, выполняются сейчас.

[img:/images/fight/start-of-fight-phase-ru.jpg|Порядок фазы боя — бьёт первым и бьёт последним]`,
      },
      {
        title: 'Сближение (Pile In)',
        body: `Оба игрока совершают **манёвры сближения (pile-in moves)** (см. ниже) со своими имеющими право юнитами, которые они решают переместить. Игрок, чей сейчас ход, выполняет все свои манёвры первым, затем его оппонент. Каждый юнит не может совершить более одного **манёвра сближения (pile-in move)** во время этого шага.`,
      },
      {
        title: 'Манёвр сближения',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | 3"
◈ ПРАВО НА ВЫБОР | Идёт фаза ближнего боя, и к вашему юниту применяется одно или несколько из следующих условий:
▪ Он **связан боем (engaged)**.
▪ Он совершил **манёвр нападения (charge move)** в этом ходу.
▪ Он был выбран для **оверрана (overrun fight)** в этой фазе (12.06).
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПЕРЕД МАНЁВРОМ | Выберите цели сближения (pile-in targets):
▪ Если ваш юнит **связан боем**, выберите каждый вражеский юнит, с которым он **связан (engaged)**.
▪ В противном случае выберите одного или нескольких вражеских юнитов в пределах 5" от вашего юнита.
◈ ВО ВРЕМЯ МАНЁВРА
▪ Модели, находящиеся в базовом контакте с одной или несколькими вражескими моделями, не могут быть перемещены.
▪ Каждая перемещаемая модель должна завершить свой манёвр ближе к ближайшей **цели сближения (pile-in target)** и **связанной боем (engaged)** с ней, если возможно.
◈ ПОСЛЕ МАНЁВРА
▪ Ваш юнит должен быть **связан боем (engaged)**.
▪ Каждая модель, которая начала этот манёвр **связанной боем (engaged)** с вражеским юнитом, должна всё ещё быть **связана боем (engaged)** с этим вражеским юнитом.

[img:/images/fight/pile-in-moves-ru.jpg|Манёвр в контакт — вступление в бой с врагом]`,
      },
      {
        title: 'Бой',
        body: `Юнит **имеет право сражаться (eligible to fight)**, если он ещё не был **выбран для боя (selected to fight)** в этой фазе и к нему применяется одно или несколько из следующих условий:
▪ Он **связан боем (engaged)**, или был **связан (engaged)** в начале этого шага.
▪ Он совершил **манёвр нападения (charge move)** в этом ходу.

Игроки выполняют следующую последовательность, пока все имеющие право юниты не будут **выбраны для боя (selected to fight)** и их атаки не будут выполнены:

1. Выполнить схватки с «Первым ударом» (Fights First): Начиная с игрока, чей сейчас ход, игроки по очереди выбирают один союзный юнит с **«Первым ударом» (Fights First)**, который **имеет право сражаться (eligible to fight)**; этот юнит **выбран для боя (selected to fight)**. Если это невозможно:
→ Если нет ни одного юнита с **«Первым ударом» (Fights First)**, который **имеет право сражаться (eligible to fight)**, перейдите к шагу «Выполнить оставшиеся схватки», где этот игрок выберет свой следующий юнит.
→ В противном случае другой игрок выбирает свой следующий юнит.

2. Выполнить оставшиеся схватки: Начиная с игрока, который только что перевёл эту последовательность на этот шаг, игроки по очереди выбирают один союзный юнит, который **имеет право сражаться (eligible to fight)**; этот юнит **выбран для боя (selected to fight)**. Если это невозможно:
→ Если нет ни одного юнита, который **имеет право сражаться (eligible to fight)**, шаг «Бой» заканчивается.
→ В противном случае другой игрок выбирает свой следующий юнит.

После выполнения схватки на шаге «Выполнить оставшиеся схватки», если появляется один или несколько юнитов с **«Первым ударом» (Fights First)**, которые теперь **имеют право сражаться (eligible to fight)**, вернитесь к шагу «Выполнить схватки с «Первым ударом»».`,
        children: [
          {
            title: 'Может участвовать в бою, но не способен сражаться',
            body: `Во время последовательности ближнего боя, когда последовательность возвращается к игроку для выбора юнита для боя, если все юниты этого игрока, **которые могут участвовать в бою** (eligible to fight), находятся более чем в 5" от всех вражеских юнитов, этот игрок может вместо этого передать ход и вернуть последовательность оппоненту для выбора юнита. Если оба игрока передают ход подряд или если один игрок передаёт ход, когда у его оппонента не осталось юнитов, **которые могут участвовать в бою**, шаг ближнего боя заканчивается.`,
            note: `Примечание дизайнера: Иногда все цели юнита **уничтожаются** (destroyed) до того, как он получил шанс сразиться, и при этом нет других целей поблизости, достаточно близких, чтобы связаться с ними **сближением** (pile-in move). В таких случаях игрок может передать ход и ждать, чтобы увидеть, не закончит ли другой вражеский юнит **сближение** достаточно близко, чтобы атаковать его позже в этой фазе.`,
          },
        ],
      },
      {
        title: 'КОГДА ЮНИТ ВЫБРАН ДЛЯ БОЯ',
        body: 'Каждый раз, когда юнит **выбран для боя (selected to fight)**, выберите один **тип боя (fight type)**, который этот юнит имеет право совершить, и выполните его с этим юнитом. Это может быть один из перечисленных ниже или представленный в другом месте:',
      },
      {
        title: 'Обычный бой',
        body: `◈ ПРАВО НА ВЫБОР | Ваш юнит **связан боем (engaged)**.
◈ ЭФФЕКТ | Ваш юнит сражается, как описано в разделе «Совершение атак» (04).

[img:/images/fight/normal-fight-ru.jpg|Обычный бой — условия доступности]`,
      },
      {
        title: 'Оверран',
        body: `◈ ПРАВО НА ВЫБОР | Ваш юнит **не связан боем (unengaged)**, или был **не связан боем (unengaged)** в начале шага «Бой», но стал **связанным боем (engaged)** во время фазы ближнего боя.
◈ ЭФФЕКТ | Ваш юнит может совершить один дополнительный **манёвр сближения (pile-in move)**, затем сражается, как описано в разделе «Совершение атак» (04).

[img:/images/fight/overrun-fight-ru.jpg|Оверран — условия доступности]`,
        note: 'Когда юнит совершает оверран (overrun fight), его модели могут быть перемещены так, что вражеские юниты, которые были не связаны боем, становятся связанными боем. Такие вражеские юниты получают право сражаться в этой фазе (и даже могут сражаться следующими, если они являются юнитами с «Первым ударом» (Fights First)).',
      },
      {
        title: 'Консолидация (Consolidate)',
        body: `Оба игрока совершают **консолидации (consolidation moves)** (см. ниже) со своими имеющими право юнитами, которые они решают переместить. Игрок, чей сейчас ход, выполняет все свои манёвры первым, затем его оппонент. Каждый юнит не может совершить более одной **консолидации (consolidation move)** во время этого шага.`,
      },
      {
        title: 'Консолидация',
        body: `◈ МАКСИМАЛЬНОЕ РАССТОЯНИЕ | 3"
◈ ПРАВО НА ВЫБОР | Идёт фаза ближнего боя, и ваш юнит **имел право сражаться (eligible to fight)** в этой фазе.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Движение» (03).
◈ ПЕРЕД МАНЁВРОМ | Выберите режим консолидации (consolidation mode):
▪ **Продолжающаяся консолидация (Ongoing Consolidation):** Если ваш юнит **связан боем (engaged)**, вы должны выбрать этот режим и выбрать каждый вражеский юнит, с которым он **связан боем**.
▪ **Боевая консолидация (Engaging Consolidation):** В противном случае, если ваш юнит находится в пределах 3" от одного или нескольких вражеских юнитов, вы должны выбрать этот режим и выбрать одного или нескольких из этих вражеских юнитов.
▪ **Консолидация на цели (Objective Consolidation):** В противном случае, если ваш юнит находится в пределах 3" от одной или нескольких целей (objectives), вы должны выбрать этот режим и выбрать одну из этих целей.
◈ ВО ВРЕМЯ МАНЁВРА
▪ **Продолжающаяся консолидация:** Модели в базовом контакте с одной или несколькими вражескими моделями не могут быть перемещены. Каждая перемещаемая модель должна завершить свой манёвр ближе к ближайшему выбранному вражескому юниту и **связанной боем (engaged)** с ним, если возможно.
▪ **Боевая консолидация:** Каждая перемещаемая модель должна завершить свой манёвр ближе к ближайшему выбранному вражескому юниту и **связанной боем (engaged)** с ним, если возможно.
▪ **Консолидация на цели:** Каждая перемещаемая модель должна завершить свой манёвр в пределах досягаемости выбранной цели (objective), если возможно, или ближе к ней, если нет.
◈ ПОСЛЕ МАНЁВРА
▪ **Продолжающаяся консолидация:** Каждая модель, которая начала этот манёвр **связанной боем (engaged)** с вражеским юнитом, должна всё ещё быть **связана боем (engaged)** с этим вражеским юнитом.
▪ **Боевая консолидация:** Ваш юнит должен быть **связан боем (engaged)** со всеми выбранными вражескими юнитами. Если один или несколько вражеских юнитов, **связанных боем (engaged)** с вашим юнитом, ещё не были **выбраны для боя (selected to fight)** в этой фазе, ваш оппонент должен выбрать каждый из таких юнитов поочерёдно; когда каждый выбран, он **получает право сражаться (eligible to fight)** и **выбирается для боя (selected to fight)** (12.04).
▪ **Консолидация на цели:** Ваш юнит должен находиться в пределах досягаемости выбранной цели (objective).

[img:/images/fight/ongoing-consolidation-ru.jpg|Диаграмма консолидации с вступлением в контакт]

[img:/images/fight/objective-consolidation-ru.jpg|Диаграмма консолидации к цели]`,
        note: '**НОВЫЕ ВРАГИ ДЛЯ СТОЛКНОВЕНИЯ**\nПри использовании режима **боевой консолидации (engaging consolidation)** ваш юнит может завершить свою консолидацию **связанным боем (engaged)** с вражескими юнитами, которые ещё не сражались в этой фазе. В таком случае каждый из этих вражеских юнитов получит возможность атаковать ваш юнит, поэтому продумайте, насколько агрессивно вы хотите перемещать свой юнит, используя этот режим.',
      },
      {
        title: 'Конец фазы ближнего боя',
        body: `Правила, срабатывающие в конце фазы ближнего боя, выполняются сейчас.`,
      },
    ],
  },
 ],
}
