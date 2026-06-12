export const basicRules = [
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
      },
      {
        id: 'section-01-03',
        sectionNum: '01.03',
        title: 'Active Player and Opposing Player',
        body: `At any given time, one player is the 'active player' and their opponent is the 'opposing player'. Which player is which changes throughout the battle, but both players are always one or the other; whenever a player becomes the active player, their opponent becomes the opposing player, and vice versa.

While it is neither player's turn (e.g. at the start or end of the battle round), the player who takes the first turn in each battle round is the active player.

While it is a player's turn, that player is the active player, with the following exceptions:
▪ Each time a unit is selected to move, that unit's controlling player is the active player until that move ends.
▪ Each time a unit is selected to shoot or selected to fight, that unit's controlling player is the active player until those attacks are resolved.`,
      },
      {
        id: 'section-01-04',
        sectionNum: '01.04',
        title: 'Measuring Distances',
        body: `Distances in Warhammer 40,000 are measured in inches ("). You can measure distances whenever you want to.

When a rule refers to a model's position in relation to anything else on the battlefield, unless otherwise stated, measure to or from the closest part of that model's base.`,
        example: `A Space Marine Intercessor (base: 32mm) is 4" from an enemy Ork Boy (base: 25mm). You measure from the closest edge of the Space Marine's base to the closest edge of the Ork Boy's base — not from their centres. If a rule requires them to be within 1", they are not yet within range.`,
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
      },
      {
        id: 'section-01-06',
        sectionNum: '01.06',
        title: 'Leadership Rolls',
        body: `To make a leadership roll for a unit, its controlling player rolls 2D6: if the result is equal to or greater than one or more of the Ld characteristics in that unit, that roll succeeds. Otherwise, that roll fails. The rule that instructed you to make that leadership roll will describe the effects of that roll succeeding or failing.`,
      },
      {
        id: 'section-01-07',
        sectionNum: '01.07',
        title: 'Battle-Shock Rolls',
        body: `To make a battle-shock roll for a unit, its controlling player makes a leadership roll for it (see above).
▪ If that roll succeeds, that unit does not become battle-shocked.
▪ If that roll fails, that unit, and each model in it, is battle-shocked.

While a unit is battle-shocked:
▪ The Objective Control (OC) characteristic of all of its models is modified to '-'.
▪ Its controlling player cannot target that unit with stratagems.
▪ It is not eligible to start an action, and any action it has started cannot be completed.`,
        example: `A Guardsman squad with Ld 7+ has taken heavy casualties and must make a battle-shock roll. The player rolls 2D6 and gets a 9 — since 9 is not less than 7, the roll succeeds and the squad holds its nerve. If the roll had been 6 or less, the entire unit would become battle-shocked, losing their ability to control objectives.`,
        note: 'Battlefield Morale: The morale and organisation of troops can waver and break during battle. This is checked using battle-shock rolls, most commonly in the Command phase. Failing such a roll represents the unit\'s courage faltering due to taking casualties or through other disruption, reducing its battlefield effectiveness.',
        seeAlso: ['Command Phase 08.00'],
      },
    ],
  },
  {
    id: '02',
    num: '02',
    title: 'Datasheets',
    page: 10,
    description: 'Each unit has a datasheet that explains how it functions in battle. Here you will learn how to use datasheets when preparing your army and playing games.',
    subsections: [
      {
        id: 'section-02-01',
        sectionNum: '02.01',
        title: 'Datasheet Name',
        body: `Here you will find the name of the unit.`,
      },
      {
        id: 'section-02-02',
        sectionNum: '02.02',
        title: 'Profiles',
        body: `These contain the following characteristics that tell you how mighty the models in the unit are:

▪ Move (M): The speed at which a model traverses the battlefield. If a model has an M characteristic of '-', it can be set up on the battlefield but otherwise cannot be moved.
▪ Toughness (T): The model's resilience against harm.
▪ Save (Sv): Presented as a dice result (e.g. 4+), this indicates the protection a model's armour gives it.
▪ Invulnerable Save (InSv): Presented as a dice result (e.g. 4+). Some models are protected by esoteric means in addition to physical armour, such as force fields or preternatural reflexes. Not all models have an InSv characteristic, but if they do, it will be listed here.
▪ Wounds (W): Wounds represent how much damage a model can sustain before it is destroyed. If a model's wounds are reduced to 0 or fewer, that model is destroyed.
▪ Leadership (Ld): Presented as a dice result (e.g. 7+), this reveals how courageous, determined or self-controlled a model is.
▪ Objective Control (OC): How effectively a model can control an objective on the battlefield. If a model has an OC characteristic of '-' it is unable to control objectives at all.`,
      },
      {
        id: 'section-02-03',
        sectionNum: '02.03',
        title: 'Abilities',
        body: `Many units have abilities that may apply during the game. These will be described here.`,
      },
      {
        id: 'section-02-04',
        sectionNum: '02.04',
        title: 'Weapons',
        body: `Weapons have the following characteristics:
▪ Range (R): How far ranged weapons can shoot. Weapons with an R characteristic of 'Melee' are melee weapons.
▪ Attacks (A): How many attack dice are used each time that weapon is used.
▪ Ballistic Skill (BS): Presented as a dice result (e.g. 4+), this shows how accurate the bearer is when shooting with the relevant ranged weapon.
▪ Weapon Skill (WS): Presented as a dice result (e.g. 4+), this reflects the bearer's skill in wielding the relevant melee weapon.
▪ Strength (S): The higher a weapon's S characteristic, the more likely it is to wound a foe.
▪ Armour Penetration (AP): Presented as a modifier to a dice roll (e.g. -1). The larger the modifier, the better the weapon is at cutting through the target's defences.
▪ Damage (D): The amount of damage inflicted by an attack.`,
      },
      {
        id: 'section-02-05',
        sectionNum: '02.05',
        title: 'Keywords',
        body: `Datasheets have a list of keywords, separated into faction keywords and other keywords. The former are used when deciding which models to include in your army, but otherwise both are functionally the same. Keywords appear in full capitals, in KEYWORD BOLD.

Some rules are linked to one or more keywords. For example, a rule might say that it applies to INFANTRY units. This means it only applies to units that have the INFANTRY keyword. Singular and plural instances of the same keyword function in the same way.`,
      },
      {
        id: 'section-02-06',
        sectionNum: '02.06',
        title: 'Unit Composition and Other Rules',
        body: `This section details the number and types of models in the unit. Each of those models will have one set of default wargear, which will be listed here. It may also list other rules, such as which units a leader unit can join or which units can embark within a TRANSPORT.`,
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
        body: `There are several types of move a unit can make. Each one defines which units are eligible to make it, what its maximum distance or set-up distance is, and any conditions that must be met.

Each time you move a unit, you can move one or more of its models, one at a time, by moving it in a straight line and/or rotating it, as many times as you want to.

Each time you move a model, unless otherwise stated:
▪ It can be moved through friendly models.
▪ It can be moved through any space its base can fit through.
▪ Its base cannot be moved through enemy models.
▪ Its base cannot cross the edge of the battlefield.
▪ All stated 'While Moving' conditions must be met.

Moving a Model in a Straight Line: Each time you move a model in a straight line, move it horizontally across the battlefield. Measure from the same point on its base at the start and end of that move, and add that distance to any other distance it has moved since its unit began that move. The distance moved cannot be greater than the maximum distance of that move type.

Rotating a Model: Each time you rotate a model, turn it any amount around the centre of its base, while keeping it upright. Note that rotating a model does not count towards the distance it has moved.`,
        seeAlso: ['Monsters and Vehicles 17.00', 'Moving Vertically 13.06', 'Strategic Reserves 20.00', 'Terrain 13.00', 'Transports 18.00'],
      },
      {
        id: 'section-03-01b',
        sectionNum: '03.01',
        title: 'Ending a Move',
        body: `After you have finished setting up all of the models in a unit and/or moving all of the models in a unit that you want to move, check that all of the following apply:
▪ If that unit is on the battlefield, it is in coherency (03.03).
▪ No models in that unit are on another model or partway through a surface of a terrain feature (e.g. a wall or ceiling).
▪ All stated 'After Moving' conditions are met.

If one or more of the above conditions are not met, that unit cannot make that move and its models are returned to their positions at the start of that move. Otherwise, after resolving any additional rules stated in the 'After Moving' section of that move type, that move ends.`,
      },
      {
        id: 'section-03-02',
        sectionNum: '03.02',
        title: 'Set Up',
        body: `Before your units can move and make attacks, they will first need to be set up on the battlefield. This most commonly happens when deploying your army for battle, but can happen for other reasons as well.

Whenever a rule instructs you to set up a unit, place its models on the battlefield so that:
▪ That unit is in coherency (see below).
▪ That unit is unengaged (see below).
▪ All other requirements and restrictions are met.

If you cannot set up all of the models in a unit, remove that unit from the battlefield and return it to its original position (e.g. in strategic reserves or embarked within a TRANSPORT).`,
        note: 'If You Cannot Set Up a Unit: While doing so as the result of a move type, if you have to return a unit\'s models to their previous positions because it is not possible to set them all up, that unit has not been selected to make that move. This means it can be selected to make a move later, so could either attempt another set up or remain stationary.',
      },
      {
        id: 'section-03-03',
        sectionNum: '03.03',
        title: 'Coherency',
        body: `A unit that contains more than one model must be set up and end any kind of move in coherency. A unit is in coherency while both of the following apply to every model in that unit:
▪ Within 2" horizontally and 5" vertically of at least one other model in that unit.
▪ Within 9" horizontally and 5" vertically of every other model in that unit.

Regaining Coherency: In the End of Turn step of each player's turn, if one or more units on the battlefield are not in coherency, those units' controlling players must remove models from them, one at a time, until they are in coherency again. Models removed in this way are destroyed, but they do not trigger rules that apply when a model is destroyed.`,
        note: 'What is Coherency? Coherency prevents models in the same unit from becoming too separated from each other while on the battlefield, ensuring they are set up and end every kind of move as a single group.',
      },
      {
        id: 'section-03-04',
        sectionNum: '03.04',
        title: 'Engagement',
        body: `A model's engagement range is the area of the battlefield within 2" horizontally and 5" vertically of it.
▪ While a friendly model is within engagement range of one or more enemy models, those models – and the units they belong to – are engaged with each other.
▪ While a unit contains no engaged models, that unit is unengaged.`,
        note: 'What is Engagement? While opposing models are within each other\'s engagement range, they are able to fight in vicious melee, so unless they are seeking to make melee attacks, models should keep out of their foes\' reach.',
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
        body: `For each model in the attacking unit, select which weapons that model will make attacks with. Models make ranged attacks with ranged weapons, and make melee attacks with melee weapons.

While Shooting: You can select one or more ranged weapons that model has.

While Fighting: You must select one melee weapon that model has.`,
        note: 'Models Without Ranged/Melee Weapons: A model that does not have any ranged weapons cannot make ranged attacks, and a model that does not have any melee weapons cannot make melee attacks.',
        seeAlso: ['[CLOSE-QUARTERS] 24.07', '[EXTRA ATTACKS] 24.11'],
      },
      {
        id: 'section-04-02',
        sectionNum: '04.02',
        title: 'Select Targets',
        body: `For each weapon selected:

While Shooting: Select one enemy unit to be the target of that weapon. Unless otherwise stated, each target must be:
▪ Visible to the model that has that weapon (06.01).
▪ Within range of that weapon.
▪ Unengaged.

While Fighting: Select one or more enemy units to be the targets of that weapon:
▪ Each target must be engaged with the model that has that weapon.
▪ You cannot select more targets than that weapon's A characteristic.`,
        note: 'Selecting Targets: When shooting or fighting, you can select different targets for each weapon. If you cannot select a target for a weapon, or if you choose not to select a target for a ranged weapon, the model with that weapon will not make attacks with it.',
        seeAlso: ['Shooting at Engaged Monsters and Vehicles 17.03'],
      },
      {
        id: 'section-04-03',
        sectionNum: '04.03',
        title: 'Resolve Attacks',
        body: `Resolve attacks using the following sequence:

1. Select Enemy Unit: Select one of the enemy units targeted by one or more weapons.
2. Gather Attack Dice: Select one weapon targeting that unit that has not yet been used to make attacks against it, and gather a number of D6 equal to that weapon's A characteristic. These are attack dice – each one represents one attack being made by an attacking model with that weapon.

If one or more other weapons targeting that unit make identical attacks to the selected weapon and those weapons have not yet been used to make attacks against that target, they do so now and you gather those weapons' attack dice as well.

3. Resolve Attack Dice: Resolve the attack sequence (05) for all of the attack dice you just gathered.
4. Other Attacks: Follow the first of the instructions below that applies:
▪ If there are any weapons targeting the same unit that have not yet been used to make attacks, return to the Gather Attack Dice step.
▪ Otherwise, if there are any weapons with unresolved attacks targeting a different unit, return to the Select Enemy Unit step.
▪ Otherwise, if all weapons have been used to make all of their attacks, this sequence ends.

Identical Attacks: Identical attacks are those that have the same BS/WS, S, AP and D characteristics, and which are affected by the same applicable abilities and rules.

Splitting Melee Attacks: While selecting targets, if you select more than one unit as the target of a melee weapon, you must split that weapon's attacks between those target units. To do so, declare how many of that weapon's attacks will be made against each unit (you must declare at least one attack per unit targeted).`,
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
▪ 1. Hit Rolls
▪ 2. Wound Rolls
▪ 3. Save Rolls
▪ 4. Inflict Damage`,
        note: 'Critical Hits and Critical Wounds: Critical hits are still hits, and critical wounds are still wounds. In addition, other rules can be triggered by a critical hit or a critical wound, such as [LETHAL HITS] and [DEVASTATING WOUNDS].',
      },
      {
        id: 'section-05-01',
        sectionNum: '05.01',
        title: 'Hit Rolls',
        body: `Make one hit roll for each attack dice by rolling one D6. For each result, check if it fails or is a hit by matching the first condition below that applies:
▪ Unmodified 1 → FAILS
▪ Unmodified 6 → CRITICAL HIT
▪ Equal to or greater than that attack's BS/WS characteristic → HIT
▪ Any other result → FAILS`,
      },
      {
        id: 'section-05-02',
        sectionNum: '05.02',
        title: 'Wound Rolls',
        body: `Make one wound roll for each hit by rolling one D6. For each result, check if it fails or is a wound by matching the first condition below that applies:
▪ Unmodified 1 → FAILS
▪ Unmodified 6 → CRITICAL WOUND
▪ Equal to or greater than the required result (see table below) → WOUND
▪ Any other result → FAILS`,
      },
      {
        id: 'section-05-03',
        sectionNum: '05.03',
        title: 'Save Rolls',
        body: `The opposing player resolves the following sequence:

1. Create Groups: Divide all models in the target unit into the following groups, as many times as required:
▪ One group for each CHARACTER model.
▪ One group for all other models with the same W, Sv and InSv characteristics.

2. Allocation Order: Declare the order in which those groups will have attacks allocated to them, applying all of the following:
▪ If a non-CHARACTER group contains a model that has lost one or more wounds, that group must be first in the allocation order.
▪ No CHARACTER group can be earlier in the allocation order than a non-CHARACTER group.
▪ CHARACTER groups containing a model that has lost one or more wounds must be earlier in the allocation order than CHARACTER groups containing no wounded models.

3. Make Save Rolls: The opposing player makes one save roll for each attack that wounded the target by rolling one D6.`,
        seeAlso: ['Modifying Damage', 'Modifying Dice Rolls', 'Random Characteristics'],
      },
      {
        id: 'section-05-04',
        sectionNum: '05.04',
        title: 'Inflict Damage',
        body: `The opposing player resolves the following sequence for each save roll, working from lowest result(s) to highest result(s), until all attacks are resolved or all models in the target unit are destroyed – in the latter case, any excess attacks are lost.

1. Select Model: Select one model in the current allocation group; this must be a model that has lost one or more wounds if possible.
2. Check Save Roll: For each result, check if that attack inflicts damage or fails by matching the first condition below that applies:
▪ Unmodified 1 → INFLICTS DAMAGE
▪ Invulnerable Save: The models in the current allocation group have an InSv characteristic, and the result is equal to or greater than that characteristic → FAILS (no damage)
▪ Save and AP: After modifying the result by the attacking weapon's AP characteristic, it is equal to or greater than the Sv characteristic of models in the current allocation group → FAILS (no damage)
▪ Any other result → INFLICTS DAMAGE

3. Resolve Damage: If that attack inflicts damage, the selected model loses a number of wounds equal to that attack's D characteristic. If this reduces that model's remaining wounds to 0 or fewer, it is destroyed.

Example: An AP characteristic of -1 would modify a save roll of 3 to a 2. For models with a Sv characteristic of 2+ or better, that attack would fail.`,
        note: 'Current Allocation Group: The first group in the allocation order begins as the current group. Once all models in an allocation group are destroyed, the next group in the allocation order becomes the current one.',
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
        body: `Line of sight is used to determine visibility between models. For an observing model to have line of sight, it must be possible to draw an imaginary straight line, 1 mm wide, from any part of that model to any part of the model being observed. This line is the line of sight. While doing so, other models in the observing model's unit and in the observed model's unit are ignored.

Model Visible: If any part of another model is visible to the observing model, that model is visible.

Model Fully Visible: If every part of another model that is facing the observing model is visible to the observing model (so the only thing blocking visibility to any part of that other model is that model itself), that model is fully visible.

Unit Visible: If one or more models in a unit are visible to the observing model, that unit is visible.

Unit Fully Visible: If every model in a unit is fully visible to the observing model, that unit is fully visible. When determining this, the observing model can see through other models in that unit.`,
        note: 'Terrain applies additional rules to visibility (13.07).',
      },
      {
        id: 'section-06-02',
        sectionNum: '06.02',
        title: 'Mortal Wounds',
        body: `Some attacks or rules inflict mortal wounds on units. Each time a unit suffers one or more mortal wounds, its controlling player must resolve the following sequence for each of those mortal wounds, until either all of them have been inflicted or that unit is destroyed:

1. Select Model: Select one model in that unit by following the first instruction below that applies:
▪ If a non-CHARACTER model in that unit has lost one or more wounds, you must select that model.
▪ Otherwise, if that unit contains one or more non-CHARACTER models, you must select one of those models.
▪ Otherwise, if one or more CHARACTER models in that unit have lost one or more wounds, you must select one of those models.
▪ Otherwise, you must select one CHARACTER model in that unit.

2. Resolve Damage: The selected model loses 1 wound. If this reduces that model's remaining wounds to 0, it is destroyed.

Mortal Wounds and Normal Damage: When resolving attack dice, if those attacks inflict a mixture of both mortal wounds and normal damage, resolve all of the normal damage first, then resolve all of the mortal wounds.`,
      },
      {
        id: 'section-06-03',
        sectionNum: '06.03',
        title: 'Hazard Rolls',
        body: `To make a hazard roll for a unit, roll one D6: on a 1-2, that roll fails and that unit suffers 1 mortal wound, or 3 mortal wounds instead if each model in that unit is a MONSTER/VEHICLE model. If more than one hazard roll is required for a unit, make all of those rolls simultaneously.`,
      },
    ],
  },
]
