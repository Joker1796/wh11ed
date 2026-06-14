export const basicRules = {
  en: [
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
          seeAlso: ['Frame 17.02'],
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
          note: 'Battlefield Morale: The morale and organisation of troops can waver and break during battle. This is checked using battle-shock rolls, most commonly in the Command phase. Failing such a roll represents the unit\'s courage faltering due to taking casualties or through other disruption, reducing its battlefield effectiveness. Similarly, some rules will require you to check a unit\'s readiness by making a leadership roll.',
          seeAlso: ['Command Phase 08.00'],
        },
      ],
    },
    {
      id: '02',
      num: '02',
      title: 'Datasheets',
      page: 10,
      image: { src: '/images/datasheet.png', alt: 'Datasheet example' },
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
          seeAlso: ['Aura Abilities 22.01', 'Faction Abilities 22.02', 'Psychic Abilities 22.03', 'Wargear Abilities 22.04'],
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

### Moving a Model in a Straight Line
Each time you move a model in a straight line, move it horizontally across the battlefield. Measure from the same point on its base at the start and end of that move, and add that distance to any other distance it has moved since its unit began that move. The distance moved cannot be greater than the maximum distance of that move type.

### Rotating a Model
Each time you rotate a model, turn it any amount around the centre of its base, while keeping it upright. Note that rotating a model does not count towards the distance it has moved.

### Ending a Move
After you have finished setting up all of the models in a unit and/or moving all of the models in a unit that you want to move, check that all of the following apply:
▪ If that unit is on the battlefield, it is in coherency (03.03).
▪ No models in that unit are on another model or partway through a surface of a terrain feature (e.g. a wall or ceiling).
▪ All stated 'After Moving' conditions are met.

If one or more of the above conditions are not met, that unit cannot make that move and its models are returned to their positions at the start of that move. Otherwise, after resolving any additional rules stated in the 'After Moving' section of that move type, that move ends.`,
          seeAlso: ['Monsters and Vehicles 17.00', 'Moving Vertically 13.06', 'Strategic Reserves 20.00', 'Terrain 13.00', 'Transports 18.00'],
          illustration: {
            src: '/images/moving-straight-line.png',
            alt: 'Moving in a straight line',
            seeAlso: {
              title: 'Move Types',
              refs: [
                'Advance Move 09.06',
                'Charge Move 11.04',
                'Consolidation Move 12.08',
                'Disembark Move 18.04',
                'Emergency Disembark Move 18.05',
                'Fall-back Move 09.07',
                'Ingress Move 20.04',
                'Normal Move 09.05',
                'Pile-in Move 12.03',
                'Scout Move 24.32',
                'Surge Move 21.02',
              ],
            },
          },
          image: { src: '/images/rotating.png', alt: 'Rotating a model' },
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

### Regaining Coherency
In the End of Turn step of each player's turn, if one or more units on the battlefield are not in coherency, those units' controlling players must remove models from them, one at a time, until they are in coherency again. Models removed in this way are destroyed, but they do not trigger rules that apply when a model is destroyed.`,
          note: 'What is Coherency? Coherency prevents models in the same unit from becoming too separated from each other while on the battlefield, ensuring they are set up and end every kind of move as a single group.',
          image: { src: '/images/coherency.png', alt: 'Coherency' },
        },
        {
          id: 'section-03-04',
          sectionNum: '03.04',
          title: 'Engagement',
          body: `A model's engagement range is the area of the battlefield within 2" horizontally and 5" vertically of it.
▪ While a friendly model is within engagement range of one or more enemy models, those models – and the units they belong to – are engaged with each other.
▪ While a unit contains no engaged models, that unit is unengaged.`,
          note: 'What is Engagement? While opposing models are within each other\'s engagement range, they are able to fight in vicious melee, so unless they are seeking to make melee attacks, models should keep out of their foes\' reach.',
          image: { src: '/images/engagement.png', alt: 'Engagement' },
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

### While Shooting
You can select one or more ranged weapons that model has.

### While Fighting
You must select one melee weapon that model has.`,
          note: 'Models Without Ranged/Melee Weapons: A model that does not have any ranged weapons cannot make ranged attacks, and a model that does not have any melee weapons cannot make melee attacks.',
          seeAlso: ['[CLOSE-QUARTERS] 24.07', '[EXTRA ATTACKS] 24.11'],
        },
        {
          id: 'section-04-02',
          sectionNum: '04.02',
          title: 'Select Targets',
          body: `For each weapon selected:

### While Shooting
Select one enemy unit to be the target of that weapon. Unless otherwise stated, each target must be:
▪ Visible to the model that has that weapon (06.01).
▪ Within range of that weapon.
▪ Unengaged.

### While Fighting
Select one or more enemy units to be the targets of that weapon:
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

1. **Select Enemy Unit:** Select one of the enemy units targeted by one or more weapons.

2. **Gather Attack Dice:** Select one weapon targeting that unit that has not yet been used to make attacks against it, and gather a number of D6 equal to that weapon's **A** characteristic. These are **attack dice** – each one represents one attack being made by an attacking model with that weapon.

If one or more other weapons targeting that unit make [def:identical-attacks:identical attacks] to the selected weapon and those weapons have not yet been used to make attacks against that target, they do so now and you gather those weapons’ **attack dice** as well (e.g. for three weapons making [def:identical-attacks:identical attacks], each with an **A** characteristic of 2, gather a total of six D6)

3. **Resolve Attack Dice:** Resolve the attack sequence (05) for all of the attack dice you just gathered.

4. **Other Attacks:** Follow the first of the instructions below that applies:
→ If there are any weapons targeting the same unit that have not yet been used to make attacks, return to the **Gather Attack Dice** step.
→ Otherwise, if there are any weapons with unresolved attacks targeting a different unit, return to the **Select Enemy Unit** step.
→ Otherwise, if all weapons have been used to make all of their attacks, this sequence ends.`,
          definitions: [
            {
              id: 'identical-attacks',
              term: 'Identical Attacks',
              text: 'Identical attacks are those that have the same BS/WS, S, AP and D characteristics, and which are affected by the same applicable abilities and rules.',
            },
            {
              id: 'splitting-melee',
              term: 'Splitting Melee Attacks',
              text: 'While selecting targets, if you select more than one unit as the target of a melee weapon, you must split that weapon\'s attacks between those target units. To do so, declare how many of that weapon\'s attacks will be made against each unit (you must declare at least one attack per unit targeted).\n\nIn the **Gather Attack Dice** step, for each weapon that is splitting its attacks, only gather a number of **attack dice** for that weapon equal to the number of attacks you declared would be made against that target with that weapon.',
            },
          ],
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
◆ Unmodified 1 → FAILS
◆ Unmodified 6 → CRITICAL HIT
◆ Equal to or greater than that attack's BS/WS characteristic → HIT
◆ Any other result → FAILS`,
        },
        {
          id: 'section-05-02',
          sectionNum: '05.02',
          title: 'Wound Rolls',
          body: `Make one wound roll for each hit by rolling one D6. For each result, check if it fails or is a wound by matching the first condition below that applies:
◆ Unmodified 1 → FAILS
◆ Unmodified 6 → CRITICAL WOUND
◆ Equal to or greater than the required result (see table below) → WOUND
◆ Any other result → FAILS`,
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
◆ Unmodified 1 → INFLICTS DAMAGE
◆ Invulnerable Save: The models in the current allocation group have an InSv characteristic, and the result is equal to or greater than that characteristic → FAILS (no damage)
◆ Save and AP: After modifying the result by the attacking weapon's AP characteristic, it is equal to or greater than the Sv characteristic of models in the current allocation group → FAILS (no damage)
◆ Any other result → INFLICTS DAMAGE

3. Resolve Damage: If that attack inflicts damage, the selected model loses a number of wounds equal to that attack's D characteristic. If this reduces that model's remaining wounds to 0 or fewer, it is destroyed.

Example: An AP characteristic of -1 would modify a save roll of 3 to a 2. For models with a Sv characteristic of 2+ or better, that attack would fail.`,
          note: 'Current Allocation Group: The first group in the allocation order begins as the current group. Once all models in an allocation group are destroyed, the next group in the allocation order becomes the current one.',
        },
        {
          id: 'section-05-ex',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — MAKING ATTACKS',
          sideImage: { src: '/images/making-attacks.png', alt: 'Attack Sequence Example diagram' },
          body: `### 1. SELECT WEAPONS
The {red:RED} unit is attacking. The following weapons are selected to make attacks with:
▪ 2 boltguns (B)
▪ 2 bolt pistols (BP)
▪ 1 heavy bolter (HB)

### 2. SELECT TARGETS
The {blue:BLUE} unit is selected as the target. The unit is **visible** to all models in the attacking unit. All of the selected weapons are in range, with the exception of one bolt pistol. As a result, that weapon will not make any attacks.

### 3. RESOLVE ATTACKS
There is only one enemy unit being targeted, so the controlling player now gathers **attack dice**:
▪ Five **attack dice** are gathered for the boltguns and bolt pistol, which have **A** characteristics of 2 and 1 respectively and all make **identical attacks**.
▪ Three **attack dice** are gathered for the heavy bolter, which has an **A** characteristic of 3 but does not make **identical attacks**.`,
        },
        {
          id: 'section-05-ex2',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — RESOLVING ATTACK DICE',
          sideImage: { src: '/images/resolve-attack-dice.png', alt: 'Resolve attack dice example' },
          body: `### 1. HIT ROLLS
The controlling player chooses to make the five hit rolls for the boltguns and bolt pistol first. The **BS** characteristic of the weapons is 3+. Four of the attacks hit the target.

### 2. WOUND ROLLS
The controlling player makes four wound rolls. The weapons have an **S** characteristic of 4 and the target unit has a **T** characteristic of 3, so rolls of 3+ are required to wound. Three of the attacks wound the target.

### 3. SAVE ROLLS
The target unit's controlling player makes three save rolls.

### 4. INFLICT DAMAGE
▪ The lowest result is less than both the **InSv** and **Sv** characteristics of the target, so that attack inflicts damage. This reduces the model to which that attack was allocated to 0 wounds, which destroys it.
▪ The next lowest result is less than the target's **InSv** characteristic, but greater than its **Sv** characteristic of 3+; that attack fails.
▪ The other result is greater than the target's **InSv** characteristic of 5+; that attack also fails.`,
        },
        {
          id: 'section-05-ex3',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — RESOLVING OTHER ATTACKS',
          sideImage: { src: '/images/resolve-other-attacks.png', alt: 'Resolving other attacks example' },
          body: `### 1. HIT ROLLS
The controlling player then makes three hit rolls for the heavy bolter. The **BS** characteristic of the weapon is 4+. Two of the attacks hit the target.

### 2. WOUND ROLLS
The controlling player makes two wound rolls. The weapon has an **S** characteristic of 5, so rolls of 3+ are required to wound. Both attacks wound the target.

### 3. SAVE ROLLS
The target unit's controlling player makes two save rolls.

### 4. INFLICT DAMAGE
▪ The lowest result, __when modified by the attacking weapon's **AP** characteristic of -1__, is less than the target's **Sv** characteristic of 3+, so that attack inflicts damage. This reduces the model to which that attack was allocated to 0 wounds, which destroys it.
▪ The other result is equal to the target's **InSv** characteristic of 5+; that attack fails.`,
        },
        {
          id: 'section-05-ex4',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — ATTACKING ATTACHED UNITS',
          sideImage: { src: '/images/attacking-attached-units.png', alt: 'Attacking attached units example', width: '60%' },
          body: `### 1. SELECT WEAPONS
The {red:RED} unit is attacking. The following weapons are selected to make attacks with:
▪ 7 boltguns (B)
▪ 1 plasma pistol (PP)
▪ 2 heavy bolters (HB)

### 2. SELECT TARGETS
The {blue:BLUE} unit is selected as the target. It is an attached unit (19) formed from a Seraphim unit and Saint Celestine (with her two Geminae Superia). The unit is **visible** to all models in the attacking unit, and all of the selected weapons are in range.

### 3. RESOLVE ATTACKS
There is only one enemy unit being targeted, so the controlling player now gathers **attack dice**. They decide to resolve the heavy bolter attacks first, which each have an **A** characteristic of 3, so six **attack dice** are gathered.
The **attack dice** for the remaining weapons will be gathered once the heavy bolter attacks are resolved (see opposite), as follows:
▪ 14 **attack dice** for the boltguns, which each have an **A** characteristic of 2.
▪ One **attack dice** for the plasma pistol, which has an **A** characteristic of 1.`,
        },
        {
          id: 'section-05-ex5',
          sectionNum: 'EX',
          title: 'Attack Sequence Example — ALLOCATION GROUPS',
          sideImage: { src: '/images/allocation-groups.png', alt: 'Allocation groups example', width: '60%' },
          body: `### 1. CREATE GROUPS AND DECLARE ORDER
The target unit's controlling player divides it into groups: one containing Saint Celestine, one containing the Geminae Superia, and one containing the Seraphim. They then declare the allocation order, choosing the Geminae Superia first (1), hoping their better **Sv** and **InSv** characteristics will weather the attacks. The Seraphim must be chosen second (2), as Saint Celestine is a CHARACTER model so must be last in the order (3).

### 2. RESOLVE ATTACK DICE
The heavy bolters' attacks wound the target five times, so the target unit's controlling player makes five save rolls.
The attacks are resolved one at a time, from lowest save rolls to highest:
▪ The two results of 1 are allocated first, to the current allocation group (the Geminae Superia). They both inflict damage, and both Geminae Superia are destroyed.
▪ The result of 3 is now allocated to the Seraphim, who have become the current allocation group. __When modified by the attacking weapon's **AP** characteristic of -1__, this also inflicts damage, destroying one Seraphim model.
▪ The remaining attacks fail, so no further damage is inflicted.

### 3. SELECT NEXT GROUP OF ATTACK DICE AND REPEAT`,
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
→ If a non-CHARACTER model in that unit has lost one or more wounds, you must select that model.
→ Otherwise, if that unit contains one or more non-CHARACTER models, you must select one of those models.
→ Otherwise, if one or more CHARACTER models in that unit have lost one or more wounds, you must select one of those models.
→ Otherwise, you must select one CHARACTER model in that unit.

2. Resolve Damage: The selected model loses 1 wound. If this reduces that model's remaining wounds to 0, it is destroyed.

### Mortal Wounds and Normal Damage
When resolving attack dice, if those attacks inflict a mixture of both mortal wounds and normal damage, resolve all of the normal damage first, then resolve all of the mortal wounds.`,
        },
        {
          id: 'section-06-03',
          sectionNum: '06.03',
          title: 'Hazard Rolls',
          body: `To make a hazard roll for a unit, roll one D6: on a 1-2, that roll fails and that unit suffers 1 mortal wound, or 3 mortal wounds instead if each model in that unit is a MONSTER/VEHICLE model. If more than one hazard roll is required for a unit, make all of those rolls simultaneously.`,
        },
      ],
    },
  ],

  ru: [
    {
      title: 'Основные концепции',
      description: 'Прежде чем вы узнаете, как перемещать воинов по полю битвы и атаковать врага в смертоносных перестрелках и кровопролитных рукопашных схватках, этот раздел знакомит с основными концепциями, лежащими в основе каждого сражения Warhammer 40,000.',
      subsections: [
        {
          title: 'Армии',
          body: `В игре Warhammer 40,000 каждый игрок командует армией, состоящей из отрядов моделей. Вы управляете всеми моделями своей армии. Если правило ссылается на «контролирующего игрока» (controlling player), оно имеет в виду игрока, который управляет моделями, на которых действует это правило.`,
        },
        {
          title: 'Юниты и модели',
          body: `Юнит может содержать одну или несколько моделей. Эти модели перемещаются и сражаются вместе как единая группа. У большинства моделей есть подставка (base), которая также является частью модели для всех игровых целей.

Правила иногда затрагивают «дружественные» или «вражеские» модели или юниты:
▪ Дружественные юниты и модели — это те, что входят в вашу армию.
▪ Вражеские юниты и модели — это те, что входят в армию противника.

Если правило затрагивает юниты или модели, не уточняя принадлежность, оно распространяется на любой юнит или модель. Когда эффект или способность применяется к юниту, она применяется к каждой модели в этом юните.`,
        },
        {
          title: 'Активный игрок и противник',
          body: `В любой момент один игрок является «активным» (active player), а его соперник — «противостоящим» (opposing player). Роли меняются по ходу сражения, но оба игрока всегда выступают в одной из этих ролей: когда один становится активным, другой становится противостоящим, и наоборот.

Пока не идёт ход ни одного игрока (например, в начале или конце боевого раунда), активным считается игрок, берущий первый ход в каждом раунде.

Пока идёт ход игрока, этот игрок является активным, за следующими исключениями:
▪ Каждый раз, когда юнит выбирается для движения, его контролирующий игрок является активным до завершения движения.
▪ Каждый раз, когда юнит выбирается для стрельбы или ближнего боя, его контролирующий игрок является активным до разрешения всех атак.`,
        },
        {
          title: 'Измерение расстояний',
          body: `Расстояния в Warhammer 40,000 измеряются в дюймах ("). Вы можете измерять расстояния в любой момент.

Когда правило указывает на положение модели относительно чего-либо на поле битвы, если не указано иное, измеряйте до или от ближайшей части подставки модели.`,
          example: `Космодесантник Intercessor (подставка: 32 мм) находится в 4" от вражеского Ork Boy (подставка: 25 мм). Измеряется от ближайшего края подставки Космодесантника до ближайшего края подставки Ork Boy — не от центров. Если правило требует нахождения в пределах 1", они ещё не попадают в диапазон.`,
        },
        {
          title: 'Кубики',
          body: `Вам потребуются шестигранные кубики (часто обозначаемые D6). Броски кубиков упоминаются по-разному:
▪ 2+, 3+ и т. д.: 2+ означает результат 2 или более, 3+ означает результат 3 или более, и так далее.
▪ 1-3, 4-6 и т. д.: любой результат в указанном диапазоне взаимодействует с указанным правилом.
▪ 2D6, 3D6 и т. д.: бросьте указанное количество D6 и сложите результаты (например, для броска 2D6 бросьте два D6 и сложите значения).
▪ D3: бросьте один D6 и разделите результат пополам (округляя вверх).
▪ D6+1, 2D6+3 и т. д.: бросьте указанное количество кубиков и добавьте указанное значение к результату.`,
        },
        {
          title: 'Leadership Rolls',
          body: `Чтобы сделать Leadership Roll для юнита, контролирующий игрок бросает 2D6: если результат равен или превышает одну или несколько характеристик Ld в этом юните, бросок успешен. Иначе — провален. Правило, потребовавшее этот бросок, описывает последствия успеха или провала.`,
        },
        {
          title: 'Battle-Shock Rolls',
          body: `Чтобы сделать Battle-Shock Roll для юнита, контролирующий игрок делает для него Leadership Roll (см. выше).
▪ Если бросок успешен — юнит не становится battle-shocked.
▪ Если бросок провальный — юнит и каждая модель в нём становятся battle-shocked.

Пока юнит является battle-shocked:
▪ Характеристика Objective Control (OC) всех его моделей изменяется на '-'.
▪ Контролирующий игрок не может нацеливать стратагемы на этот юнит.
▪ Юнит не может начинать действие (action), а любое начатое действие не может быть завершено.`,
          example: `Отряд гвардейцев с Ld 7+ понёс тяжёлые потери и должен сделать Battle-Shock Roll. Игрок бросает 2D6 и получает 9 — поскольку 9 не меньше 7, бросок успешен, и отряд держится. Если бы результат был 6 или меньше, весь юнит стал бы battle-shocked, утратив способность контролировать objectives.`,
          note: `Боевой дух: Боевой дух и организация войск могут поколебаться в ходе сражения. Это проверяется с помощью Battle-Shock Rolls, чаще всего в фазе командования. Провал означает, что мужество юнита пошатнулось из-за потерь или других нарушений, снижая боеспособность. Аналогично, некоторые правила потребуют проверить боеготовность юнита с помощью Leadership Roll.`,
        },
      ],
    },
    {
      title: 'Карточки данных (Datasheets)',
      description: 'У каждого юнита есть карточка данных (datasheet), объясняющая, как он функционирует в бою. Здесь вы узнаете, как использовать карточки данных при подготовке армии и в игре.',
      subsections: [
        {
          title: 'Название карточки данных',
          body: `Здесь вы найдёте название юнита.`,
        },
        {
          title: 'Характеристики (Profiles)',
          body: `Здесь содержатся следующие характеристики, отражающие мощь моделей в юните:

▪ Move (M): скорость модели на поле битвы. Если M равна '-', модель можно расставить, но перемещать нельзя.
▪ Toughness (T): живучесть модели.
▪ Save (Sv): результат броска (например, 4+); защита, которую даёт броня.
▪ Invulnerable Save (инвуль): результат броска (например, 4+). Некоторые модели защищены дополнительно — силовыми полями или сверхъестественными рефлексами. Не у всех есть инвуль, но если есть — указывается здесь.
▪ Wounds (W): раны — сколько урона модель выдержит до уничтожения. Если раны снижаются до 0 или меньше, модель уничтожена.
▪ Leadership (Ld): результат броска (например, 7+); храбрость и самоконтроль модели.
▪ Objective Control (OC): насколько эффективно модель контролирует цель (objective) на поле битвы. Если OC равна '-', контролировать цели невозможно.`,
        },
        {
          title: 'Способности (Abilities)',
          body: `У многих юнитов есть способности (abilities), применяемые в ходе игры. Они описаны здесь.`,
        },
        {
          title: 'Оружие',
          body: `Оружие имеет следующие характеристики:
▪ Range (R): дальность стрельбы дальнобойного оружия. Оружие с R «Melee» — оружие ближнего боя.
▪ Attacks (A): количество кубиков атаки при каждом использовании оружия.
▪ Ballistic Skill (BS): результат броска (например, 4+); точность носителя при стрельбе.
▪ Weapon Skill (WS): результат броска (например, 4+); мастерство носителя в ближнем бою.
▪ Strength (S): чем выше, тем вероятнее ранение противника.
▪ Armour Penetration (AP): модификатор броска (например, -1); чем выше, тем лучше оружие пробивает защиту.
▪ Damage (D): количество урона, наносимого атакой.`,
        },
        {
          title: 'Ключевые слова (Keywords)',
          body: `Карточки данных (datasheets) содержат список ключевых слов (keywords), разделённых на ключевые слова фракции и прочие ключевые слова. Первые используются при формировании армии, но в остальном оба типа функционируют одинаково. Ключевые слова пишутся заглавными буквами жирным шрифтом.

Некоторые правила связаны с одним или несколькими ключевыми словами. Например, правило может гласить, что оно применяется к юнитам INFANTRY — значит, только к тем, кто имеет ключевое слово INFANTRY. Единственное и множественное число одного ключевого слова работают одинаково.`,
        },
        {
          title: 'Состав юнита и другие правила',
          body: `В этом разделе указывается количество и типы моделей в юните. Каждая модель имеет набор стандартного варгира, перечисленный здесь. Могут быть указаны другие правила: к каким юнитам может присоединиться лидер или какие юниты могут размещаться в TRANSPORT.`,
        },
        {
          title: 'Опции варгира (Wargear Options)',
          body: `На некоторых карточках данных (datasheets) есть список опций варгира. Включая такой юнит в армию, вы можете использовать эти опции, чтобы изменить оружие и другой варгир его моделей.`,
        },
      ],
    },
    {
      title: 'Передвижение',
      description: 'В ходе сражения вы будете перемещать модели, поднимая их и меняя их положение на поле битвы. Принципы передвижения объясняются здесь.',
      subsections: [
        {
          title: 'Перемещение юнитов',
          body: `Существует несколько типов движения. Каждый определяет, какие юниты могут его совершать, максимальную дистанцию и необходимые условия.

Каждый раз при движении юнита вы можете переместить одну или несколько его моделей поочерёдно, двигая каждую по прямой и/или разворачивая её столько раз, сколько хотите.

При каждом движении модели, если не указано иное:
▪ Она может двигаться сквозь дружественные модели.
▪ Она может двигаться через любое пространство, в которое помещается её подставка.
▪ Её подставка не может двигаться сквозь вражеские модели.
▪ Её подставка не может пересекать край поля битвы.
▪ Должны быть соблюдены все условия «While Moving».

### Движение по прямой
Перемещайте модель горизонтально, измеряя от одной и той же точки подставки в начале и конце. Прибавляйте это расстояние к уже пройденному с начала хода юнита. Пройденное не может превышать максимальное расстояние для данного типа движения.

### Разворот
Поворачивайте модель на любой угол вокруг центра подставки, сохраняя вертикальное положение. Разворот не учитывается в пройденном расстоянии.

### Завершение движения
После того как вы закончили расставлять и/или перемещать все модели юнита, проверьте выполнение следующих условий:
▪ Если юнит на поле — он находится в когеренции (03.03).
▪ Ни одна модель не стоит на другой модели или не проходит сквозь поверхность рельефа (например, стену или потолок).
▪ Все условия «After Moving» выполнены.

Если одно или несколько условий не выполнены — юнит не может совершить это движение, модели возвращаются на исходные позиции. Иначе, после выполнения дополнительных правил «After Moving», движение завершается.`,
        },
        {
          title: 'Расстановка (Set Up)',
          body: `Прежде чем юниты смогут двигаться и атаковать, их необходимо расставить на поле. Чаще всего это происходит при развёртывании армии, но может быть и по другим причинам.

Расставляя юнит по инструкции правила, разместите модели на поле так, чтобы:
▪ Юнит находился в когеренции (см. ниже).
▪ Юнит не находился в энгейдже (см. ниже).
▪ Были выполнены все прочие требования.

Если невозможно расставить все модели — уберите юнит с поля и верните на исходную позицию (например, в стратегические резервы или в TRANSPORT).`,
          note: `Если не удаётся расставить юнит: если вы вернули модели на прежние позиции, потому что расставить их всех невозможно, этот юнит не был выбран для данного движения. Его можно выбрать позже — попробовать расстановку снова или остаться на месте.`,
        },
        {
          title: 'Когеренция',
          body: `Юнит, содержащий более одной модели, должен быть расставлен и завершать любое движение в когеренции. Юнит находится в когеренции, если для каждой модели в нём выполняются оба условия:
▪ Не более 2" по горизонтали и 5" по вертикали от хотя бы одной другой модели в юните.
▪ Не более 9" по горизонтали и 5" по вертикали от каждой другой модели в юните.

### Восстановление когеренции
В шаге «End of Turn» каждого хода, если юниты на поле не в когеренции, их контролирующие игроки убирают модели по одной, пока когеренция не восстановлена. Убранные модели уничтожаются, но не активируют правила при уничтожении модели.`,
          note: `Что такое когеренция? Когеренция не позволяет моделям одного юнита слишком сильно разойтись на поле, гарантируя, что они расставляются и завершают каждое движение как единая группа.`,
        },
        {
          title: 'Энгейдж (Engagement)',
          body: `Зона энгейджа модели — область поля в пределах 2" по горизонтали и 5" по вертикали от неё.
▪ Пока дружественная модель находится в зоне энгейджа одной или нескольких вражеских моделей, эти модели — и юниты, которым они принадлежат — находятся в энгейдже друг с другом.
▪ Пока юнит не содержит ни одной энгейдженной модели, он свободен от энгейджа (unengaged).`,
          note: `Что такое энгейдж? Пока противоборствующие модели находятся в зоне энгейджа друг друга, они могут вступить в жестокую рукопашную схватку, поэтому, если только они не стремятся наносить удары в ближнем бою, моделям следует держаться подальше от досягаемости врага.`,
        },
      ],
    },
    {
      title: 'Атаки',
      description: 'В ходе сражения ваши юниты будут стрелять и сражаться с врагом, каждый раз нанося атаки своим оружием. В этом разделе объясняется, как наносить атаки.',
      subsections: [
        {
          title: 'Шаги атаки',
          body: `Каждый раз, когда юнит стреляет или вступает в ближний бой, активный игрок выполняет следующие шаги:
▪ 1. Выбор оружия (Select Weapons)
▪ 2. Выбор таргетов (Select Targets)
▪ 3. Совершение атак (Resolve Attacks)`,
        },
        {
          title: 'Выбор оружия',
          body: `Для каждой модели в атакующем юните выберите оружие. Модели делают дальние атаки дальнобойным оружием, а ближние — оружием ближнего боя.

### При стрельбе (While Shooting)
Можно выбрать одно или несколько единиц дальнобойного оружия.

### При ближнем бое (While Fighting)
Необходимо выбрать одну единицу оружия ближнего боя.`,
          note: `Модели без дальнобойного/ближнего оружия: модель без дальнобойного оружия не может делать дальние атаки, а модель без оружия ближнего боя — атаки в ближнем бою.`,
        },
        {
          title: 'Выбор таргетов',
          body: `Для каждого выбранного оружия:

### При стрельбе (While Shooting)
Выберите один вражеский юнит в качестве таргета. Если не указано иное, каждый таргет должен:
▪ Быть видимым для модели с данным оружием (06.01).
▪ Находиться в дальности этого оружия.
▪ Не находиться в энгейдже (unengaged).

### При ближнем бое (While Fighting)
Выберите один или несколько вражеских юнитов:
▪ Каждый таргет должен быть в энгейдже с моделью, имеющей данное оружие.
▪ Нельзя выбирать больше таргетов, чем значение характеристики A оружия.`,
          note: `Выбор таргетов: при стрельбе или ближнем бою для каждого оружия можно выбирать разные таргеты. Если для оружия нельзя выбрать таргет или вы не хотите выбирать таргет для дальнобойного оружия, модель с этим оружием не делает атак.`,
        },
        {
          title: 'Совершение атак',
          body: `Совершайте атаки в следующей последовательности:

1. **Выбор вражеского юнита:** выберите один из вражеских юнитов, на которые нацелено одно или несколько орудий.

2. **Сбор кубиков атаки:** выберите одно оружие, нацеленное на этот юнит, ещё не использованное против него, и возьмите количество D6, равное характеристике **A**. Это кубики атаки (attack dice) — каждый представляет одну атаку.

Если одно или несколько других оружий, нацеленных на этот юнит, совершают [def:identical-attacks:идентичные атаки] и это оружие еще не использовалось для совершения атак по этой цели, они могут объединять кубики в один бросок (например, для трех оружий, совершающих [def:identical-attacks:идентичные атаки], каждое с характеристикой **A** 2, соберите в общей сложности шесть D6).

3. **Результаты кубиков атаки:** Выполните последовательность атаки (05) для всех кубиков атаки (attack dice), которые вы только что собрали.

4. **Остальные атаки:**
→ Если есть орудия, нацеленные на тот же юнит, ещё не использованные — вернитесь к шагу **Сбор кубиков атаки**.
→ Иначе, если есть орудия с неразрешёнными атаками против другого юнита — вернитесь к шагу **Выбор вражеского юнита**.
→ Иначе — последовательность завершается.`,
          definitions: [
            {
              id: 'identical-attacks',
              term: 'Идентичные атаки',
              text: 'атаки с одинаковыми BS/WS, S, AP и D, на которые действуют одни и те же способности и правила.',
            },
            {
              id: 'splitting-melee',
              term: 'Разделение атак в ближнем бою',
              text: 'если вы выбираете более одного юнита как таргет оружия ближнего боя, объявите, сколько атак направлено против каждого (не менее одной атаки на каждый таргет).\n\nНа шаге **Сбор кубиков атаки** для каждого оружия, которое делит атаки, собирайте количество кубиков атаки, равное числу атак, которые вы объявили против данного таргета.',
            },
          ],
        },
      ],
    },
    {
      title: 'Последовательность атаки',
      description: 'Каждый раз, когда модели атакуют, вы следуете последовательности, описанной в этом разделе, чтобы определить, наносится ли урон.',
      subsections: [
        {
          title: 'Обзор последовательности',
          body: `Каждый раз, когда активному игроку предписывается разрешить последовательность атаки, он выполняет следующие шаги. На каждом шаге, если нужно бросить более одного кубика, делайте все броски одновременно.
▪ 1. Hit Rolls (броски на попадание)
▪ 2. Wound Rolls (броски на ранение)
▪ 3. Save Rolls (броски на спасение)
▪ 4. Нанесение урона (Inflict Damage)`,
          note: `Critical Hits и Critical Wounds: Critical Hits всё равно считаются попаданиями, а Critical Wounds — ранениями. Другие правила могут срабатывать при Critical Hit или Critical Wound, например [LETHAL HITS] и [DEVASTATING WOUNDS].`,
        },
        {
          title: 'Hit Rolls',
          body: `Сделайте один Hit Roll для каждого кубика атаки, бросив один D6. Для каждого результата проверьте по первому подходящему условию:
◆ Немодифицированный 1 → ПРОВАЛ (FAILS)
◆ Немодифицированный 6 → CRITICAL HIT
◆ Равно или больше характеристики BS/WS данной атаки → HIT (попадание)
◆ Любой другой результат → ПРОВАЛ (FAILS)`,
        },
        {
          title: 'Wound Rolls',
          body: `Сделайте один Wound Roll для каждого попадания, бросив один D6. Для каждого результата проверьте по первому подходящему условию:
◆ Немодифицированный 1 → ПРОВАЛ (FAILS)
◆ Немодифицированный 6 → CRITICAL WOUND
◆ Равно или больше требуемого результата (см. таблицу ниже) → WOUND (ранение)
◆ Любой другой результат → ПРОВАЛ (FAILS)`,
        },
        {
          title: 'Save Rolls',
          body: `Противоположный игрок выполняет следующую последовательность:

1. Создание групп: разделите все модели в атакуемом юните на следующие группы столько раз, сколько требуется:
▪ По одной группе для каждой модели CHARACTER.
▪ Одна группа для всех остальных моделей с одинаковыми W, Sv и инвулем.

2. Порядок распределения: объявите порядок, в котором группы получат атаки:
▪ Если в группе без CHARACTER есть модель, потерявшая раны, эта группа должна быть первой.
▪ Ни одна группа CHARACTER не может быть раньше группы без CHARACTER.
▪ Группы CHARACTER с ранеными моделями должны быть раньше групп CHARACTER без раненых.

3. Save Rolls: противоположный игрок делает один Save Roll для каждой атаки, ранившей цель, бросая один D6.`,
        },
        {
          title: 'Нанесение урона',
          body: `Противоположный игрок выполняет следующую последовательность для каждого Save Roll — от наименьшего результата к наибольшему, пока все атаки не разрешены или юнит не уничтожен (оставшиеся атаки пропадают).

1. Выбор модели: выберите одну модель в текущей группе распределения; при возможности — ту, что потеряла одну или несколько ран.
2. Проверка Save Roll: по первому подходящему условию:
◆ Немодифицированный 1 → INFLICTS DAMAGE
◆ Invulnerable Save: модели в текущей группе имеют инвуль, и результат равен или больше инвуля → FAILS (без урона)
◆ Save и AP: после применения AP результат равен или больше Sv моделей в текущей группе → FAILS (без урона)
◆ Любой другой результат → INFLICTS DAMAGE

3. Применение урона: выбранная модель теряет количество ран, равное D атаки. Если раны снижаются до 0 или меньше — модель уничтожена.

Пример: AP -1 снизит Save Roll 3 до 2. Для моделей с Sv 2+ или лучше такая атака не нанесёт урона.`,
          note: `Текущая группа распределения: первая группа в порядке изначально является текущей. После уничтожения всех моделей в ней текущей становится следующая группа.`,
        },
      ],
      woundTable: {
        headers: ['Сила (Strength) vs Живучесть (Toughness)', 'Требуемый результат'],
        rows: [
          ['Сила ВДВОЕ (или более) превышает Живучесть', '2+'],
          ['Сила БОЛЬШЕ Живучести', '3+'],
          ['Сила РАВНА Живучести', '4+'],
          ['Сила МЕНЬШЕ Живучести', '5+'],
          ['Сила равна ПОЛОВИНЕ (или меньше) Живучести', '6+'],
        ],
      },
    },
    {
      title: 'Другие концепции',
      description: 'Этот раздел содержит дополнительные концепции правил, наиболее часто используемые при атаках.',
      subsections: [
        {
          title: 'Видимость',
          body: `Линия обзора (Line of Sight) определяет видимость между моделями. Для наблюдающей модели нужно иметь линию обзора: воображаемую прямую линию шириной 1 мм, проведённую от любой части этой модели до любой части наблюдаемой. При этом другие модели в обоих юнитах игнорируются.

Модель видима: если наблюдающая модель видит хоть какую-то часть другой, она считается видимой.

Модель полностью видима: если наблюдающая видит каждую часть другой модели, обращённую к ней (единственное, что закрывает обзор — сама эта модель), она считается полностью видимой.

Юнит видим: если одна или несколько моделей в юните видимы для наблюдающей модели.

Юнит полностью видим: если наблюдающая модель полностью видит каждую модель в юните. При этом она может видеть сквозь других моделей в этом юните.`,
          note: `Рельеф (Terrain) добавляет дополнительные правила видимости (13.07).`,
        },
        {
          title: 'Mortal Wounds (Морталки)',
          body: `Некоторые атаки или правила наносят морталки (mortal wounds) юнитам. Каждый раз, когда юнит получает одну или несколько морталок, контролирующий игрок выполняет следующую последовательность для каждой — пока все не нанесены или юнит не уничтожен:

1. Выбор модели по первому применимому указанию:
→ Если не-CHARACTER модель в юните потеряла раны — выбрать её.
→ Иначе, если есть не-CHARACTER модели — выбрать одну из них.
→ Иначе, если CHARACTER модель потеряла раны — выбрать одну из них.
→ Иначе — выбрать одну CHARACTER модель.

2. Применение урона: выбранная модель теряет 1 рану. Если раны снижаются до 0 — уничтожена.

### Морталки и обычный урон
Если атаки наносят и морталки, и обычный урон — сначала весь обычный урон, затем все морталки.`,
        },
        {
          title: 'Hazard Rolls',
          body: `Чтобы сделать Hazard Roll для юнита, бросьте один D6: при результате 1-2 бросок провален, и юнит получает 1 морталку — или 3 морталки, если каждая модель в юните является MONSTER/VEHICLE. Если для юнита требуется более одного Hazard Roll, делайте все броски одновременно.`,
        },
      ],
    },
  ],
}
