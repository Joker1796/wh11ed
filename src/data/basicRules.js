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
      image: { src: '/images/intro/datasheet.png', alt: 'Datasheet example' },
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
            src: '/images/moving/moving-straight-line.png',
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
          image: { src: '/images/moving/rotating.png', alt: 'Rotating a model' },
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
          image: { src: '/images/coherency/coherency.png', alt: 'Coherency' },
        },
        {
          id: 'section-03-04',
          sectionNum: '03.04',
          title: 'Engagement',
          body: `A model's engagement range is the area of the battlefield within 2" horizontally and 5" vertically of it.
▪ While a friendly model is within engagement range of one or more enemy models, those models – and the units they belong to – are engaged with each other.
▪ While a unit contains no engaged models, that unit is unengaged.`,
          note: 'What is Engagement? While opposing models are within each other\'s engagement range, they are able to fight in vicious melee, so unless they are seeking to make melee attacks, models should keep out of their foes\' reach.',
          image: { src: '/images/visibility/engagement.png', alt: 'Engagement' },
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
          sideImage: { src: '/images/attack/making-attacks.png', alt: 'Attack Sequence Example diagram' },
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
          sideImage: { src: '/images/attack/resolve-attack-dice.png', alt: 'Resolve attack dice example' },
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
          sideImage: { src: '/images/attack/resolve-other-attacks.png', alt: 'Resolving other attacks example' },
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
          sideImage: { src: '/images/attached/attacking-attached-units.png', alt: 'Attacking attached units example', width: '60%' },
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
          sideImage: { src: '/images/attack/allocation-groups.png', alt: 'Allocation groups example', width: '60%' },
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

Other models and units can be either **visible** or **fully visible** to the observing model, as shown below.

[img:/images/visibility/model-visible.png|Model visibility — model partially visible]

[img:/images/visibility/model-fully-visible.png|Model visibility — model fully visible]

[img:/images/visibility/unit-visible.png|Unit visibility — unit visible to observer]

[img:/images/visibility/unit-fully-visible.png|Unit visibility — unit fully visible to observer]`,
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
      title: 'Основные понятия',
      description: 'Прежде чем вы узнаете, как перемещать своих воинов по полю боя и атаковать врага в смертоносных перестрелках и кровавых рукопашных схватках, этот раздел знакомит вас с некоторыми понятиями, лежащими в основе каждого сражения в Warhammer 40,000.',
      subsections: [
        {
          title: 'Армии',
          body: `Каждый игрок в игре Warhammer 40,000 командует армией, состоящей из юнитов моделей. Вы контролируете все модели в своей армии. Если правило ссылается на «контролирующего игрока»('controlling player'), оно относится к игроку, который контролирует модели, на которые распространяется это правило.`,
        },
        {
          title: 'Юниты и модели',
          body: `Юнит может содержать одну или несколько моделей. Эти модели перемещаются и сражаются вместе как единая группа. У большинства моделей есть основание, которое также является частью этой модели для всех целей правил.

Правила иногда влияют на «союзные» или «вражеские» модели или юниты, которые определяются следующим образом:
▪ Союзные(friendly) юниты и модели — это те, что в вашей армии.
▪ Вражеские(enemy) юниты и модели — это те, что в армии вашего оппонента.

Если правило влияет на юниты или модели, не уточняя, являются ли они союзными или вражескими, это правило влияет на любой юнит или модель, независимо от того, в чьей они армии. Когда эффект или способность применяется к юниту, она применяется к каждой модели в этом юните.`,
        },
        {
          title: 'Активный игрок и противостоящий игрок',
          body: `В любой момент времени один игрок является «активным игроком», а его оппонент — «противостоящим игроком». Какой игрок становится каким, меняется на протяжении битвы, но оба игрока всегда являются либо тем, либо другим; всякий раз, когда игрок становится активным, его оппонент становится противостоящим игроком, и наоборот.

Когда не идёт ход ни одного игрока (например, в начале или конце игрового раунда), активным игроком является игрок, который делает первый ход в каждом игровом раунде.

Когда идёт ход игрока, этот игрок является активным игроком, за следующими исключениями:
▪ Каждый раз, когда юнит выбирается для перемещения(selected to move), контролирующий этот юнит игрок является активным игроком до окончания этого перемещения.
▪ Каждый раз, когда юнит выбирается для стрельбы(selected to shoot) или выбирается для ближнего боя(selected to fight), контролирующий этот юнит игрок является активным игроком до тех пор, пока эти атаки не будут завершены.`,
        },
        {
          title: 'Измерение расстояний',
          body: `Расстояния в Warhammer 40,000 измеряются в дюймах("). Вы можете измерять расстояния в любое время.

Когда правило ссылается на положение модели по отношению к чему-либо на поле боя, если не указано иное, измеряйте расстояние до ближайшей части основания этой модели.`,
          example: `Космодесантник Intercessor (подставка: 32 мм) находится в 4" от вражеского Ork Boy (подставка: 25 мм). Измеряется от ближайшего края подставки Космодесантника до ближайшего края подставки Ork Boy — не от центров. Если правило требует нахождения в пределах 1", они ещё не попадают в диапазон.`,
        },
        {
          title: 'Кубики',
          body: `Вам понадобятся шестигранные кубики (часто обозначаемые как D6). Существует множество способов описания бросков кубиков, включая:
▪ 2+, 3+ и так далее: 2+ означает результат 2 или более, 3+ означает результат 3 или более и так далее.
▪ 1-3, 4-6 и так далее: любой результат в указанном диапазоне будет взаимодействовать с указанным правилом.
▪ 2D6, 3D6 и так далее: бросьте указанное количество D6 и сложите значения вместе (например, чтобы бросить 2D6, бросьте два D6 и сложите значения).
▪ D3: бросьте один D6 и разделите результат пополам (округляя в большую сторону).
▪ D6+1, 2D6+3 и так далее: бросьте указанное количество кубиков и прибавьте указанное значение к результату.`,
        },
        {
          title: 'Проверка лидерства',
          body: `Чтобы выполнить проверку лидерства(leadership roll) для юнита, его контролирующий игрок бросает 2D6: если результат равен или превышает одну или несколько характеристик Ld в этом юните, проверка успешна. В противном случае проверка провалена. Правило, которое предписало вам выполнить эту проверку лидерства(leadership roll), опишет последствия успеха или провала этой проверки.`,
        },
        {
          title: 'Проверка на боевой шок',
          body: `Чтобы выполнить проверку боевого шока(battle-shock roll) для юнита, его контролирующий игрок выполняет для него проверку лидерства (leadership roll) (см. выше).
▪ Если проверка успешна, юнит не становится подверженным боевому шоку(battle-shocked).
▪ Если проверка провалена, этот юнит и каждая модель в нём становится подверженной боевому шоку(battle-shocked).

Пока юнит подвержен боевому шоку(battle-shocked):
▪ Характеристика Objective Control (OC) всех его моделей изменяется на '-'.
▪ Его контролирующий игрок не может нацеливать на этот юнит стратагемы(stratagems).
▪ Он не имеет права начинать задачи(actions), и любая начатая задача(action) не может быть завершена.`,
          example: `Отряд гвардейцев с Ld 7+ понёс тяжёлые потери и должен выполнить проверку боевого шока(battle-shock roll). Игрок бросает 2D6 и получает 9 — поскольку 9 не меньше 7, проверка успешна, и отряд держится. Если бы результат был 6 или меньше, весь юнит стал бы подвержен боевому шоку(battle-shocked), утратив способность контролировать цели(objectives).`,
          note: `Battlefield Morale: Моральный дух и организация войск могут колебаться и рушиться во время битвы. Это проверяется с помощью проверок боевого шока(battle-shock rolls), чаще всего в Фазе командования. Провал такой проверки означает, что мужество юнита падает из-за потерь или других помех, снижая его боевую эффективность. Аналогично, некоторые правила потребуют от вас проверить готовность юнита с помощью проверки лидерства(leadership roll).`,
        },
      ],
    },
    {
      title: 'Листы данных (Datasheets)',
      description: 'У каждого юнита есть лист данных(datasheet), который объясняет, как он действует в бою. Здесь вы узнаете, как использовать листы данных(datasheets) при подготовке армии и во время игры.',
      subsections: [
        {
          title: 'Название листа данных',
          body: `Здесь вы найдёте название юнита.`,
        },
        {
          title: 'Характеристики (Profiles)',
          body: `Здесь содержатся следующие характеристики, которые показывают, насколько сильны модели в юните:

▪ Move (передвижение) (M): скорость, с которой модель перемещается по полю боя. Если модель имеет характеристику M '-', она может быть установлена на поле боя, но в остальном не может быть перемещена.
▪ Toughness (стойкость) (T): устойчивость модели к вреду.
▪ Save (спас-бросок) (Sv): представленный как результат броска кубика (например, 4+), указывает на защиту, которую даёт броня модели.
▪ Invulnerable Save (неуязвимый спас-бросок) (InSv): представленный как результат броска кубика (например, 4+). Некоторые модели защищены эзотерическими средствами в дополнение к физической броне, такими как силовые поля или сверхъестественные рефлексы. Не все модели имеют характеристику InSv, но если она есть, она будет указана здесь.
▪ Wounds (раны) (W): раны представляют, сколько урона может выдержать модель, прежде чем она будет уничтожена. Если раны модели снижаются до 0 или ниже, модель уничтожена.
▪ Leadership (лидерство) (Ld): представленное как результат броска кубика (например, 7+), показывает, насколько модель храбра, решительна или самоконтролируема.
▪ Objective Control (контроль цели) (OC): насколько эффективно модель может контролировать цель(objective) на поле боя. Если модель имеет характеристику OC '-', она вообще не может контролировать цели(objectives).`,
        },
        {
          title: 'Способности (Abilities)',
          body: `У многих юнитов есть способности(abilities), которые могут применяться во время игры. Они будут описаны здесь.`,
        },
        {
          title: 'Оружие',
          body: `Оружие имеет следующие характеристики:
▪ Range (дальность) (R): как далеко может стрелять дистанционное оружие. Оружие с характеристикой R «Melee» является оружием ближнего боя.
▪ Attacks (атаки) (A): сколько кубиков атаки(attack dice) используется каждый раз при использовании этого оружия.
▪ Ballistic Skill (навык стрельбы) (BS): представленный как результат броска кубика (например, 4+), показывает, насколько точен владелец при стрельбе из соответствующего оружия.
▪ Weapon Skill (навык ближнего боя) (WS): представленный как результат броска кубика (например, 4+), отражает мастерство владельца в использовании соответствующего оружия ближнего боя.
▪ Strength (сила) (S): чем выше характеристика S оружия, тем больше вероятность нанести рану врагу.
▪ Armour Penetration (бронепробитие) (AP): представленный как модификатор броска кубика (например, -1). Чем больше модификатор, тем лучше оружие пробивает-прорезает защиту цели.
▪ Damage (урон) (D): количество урона, наносимого атакой.`,
        },
        {
          title: 'Ключевые слова (Keywords)',
          body: `Листы данных имеют список ключевых слов, разделённых на ключевые слова фракции и другие ключевые слова. Первые используются при решении, какие модели включать в вашу армию, но в остальном оба функционально одинаковы. Ключевые слова пишутся заглавными буквами, полужирным шрифтом.

Некоторые правила связаны с одним или несколькими ключевыми словами. Например, правило может говорить, что оно применяется к юнитам ПЕХОТЫ (INFANTRY). Это означает, что оно применяется только к юнитам, имеющим ключевое слово INFANTRY. Единственное и множественное число одного и того же ключевого слова функционируют одинаково.`,
        },
        {
          title: 'Состав юнита и другие правила',
          body: `В этом разделе подробно описано количество и типы моделей в юните. Каждая из этих моделей будет иметь один набор стандартного снаряжения, который будет перечислен здесь. Здесь также могут быть перечислены другие правила, например, к каким юнитам может присоединиться юнит-лидер(leader) или какие юниты могут сесть в ТРАНСПОРТ(TRANSPORT).`,
        },
        {
          title: 'Опции снаряжения (Wargear Options)',
          body: `Некоторые листы данных имеют список опций снаряжения. Когда вы включаете такой юнит в свою армию, вы можете использовать эти опции, чтобы изменить оружие и другое снаряжение его моделей.`,
        },
      ],
    },
    {
      title: 'Перемещение',
      description: 'Во время битвы вы будете перемещать свои модели, поднимая их и меняя их положение на поле боя. Принципы перемещения объяснены здесь.',
      subsections: [
        {
          title: 'Перемещение юнитов',
          body: `Существует несколько типов перемещений, которые может совершить юнит. Каждый из них определяет, какие юниты имеют право на его совершение, каково его максимальное расстояние(maximum distance) или расстояние установки(set-up distance), а также любые условия, которые должны быть соблюдены.

Каждый раз при перемещении юнита вы можете переместить одну или несколько его моделей поочерёдно, перемещая каждую по прямой линии и/или поворачивая её столько раз, сколько хотите.

При каждом перемещении модели, если не указано иное:
▪ Её можно перемещать сквозь союзные модели.
▪ Её можно перемещать через любое пространство, через которое может пройти её основание.
▪ Её основание нельзя перемещать сквозь вражеские модели.
▪ Её основание не может пересекать край поля боя.
▪ Все условия «Во время перемещения»(While Moving) должны быть соблюдены.

### Перемещение модели по прямой линии
Каждый раз, когда вы перемещаете модель по прямой линии, перемещайте её горизонтально по полю боя. Измеряйте расстояние от одной и той же точки на её основании в начале и в конце этого перемещения и прибавляйте это расстояние к любому другому расстоянию, которое она преодолела с момента начала перемещения её юнита. Пройденное расстояние не может превышать максимальное расстояние(maximum distance) для данного типа перемещения(move type).

### Поворот модели
Каждый раз, когда вы поворачиваете модель, поверните её на любое количество градусов вокруг центра её основания, удерживая её вертикально. Обратите внимание, что поворот модели не учитывается в пройденном ею расстоянии.

### Завершение перемещения
После того как вы закончили устанавливать все модели в юните и/или перемещать все модели в юните, которые вы хотите переместить, проверьте, выполняются ли все следующие условия:
▪ Если этот юнит находится на поле боя, он находится в когерентности(coherency) (03.03).
▪ Ни одна модель в этом юните не находится на другой модели или частично внутри поверхности элемента укрытия(terrain feature) (например, стены или потолка).
▪ Все условия «После перемещения»(After Moving) соблюдены.

Если одно или несколько из вышеуказанных условий не соблюдены, этот юнит не может совершить это перемещение, и его модели возвращаются на свои изначальные позиции. В противном случае, после разрешения любых дополнительных правил, указанных в разделе «После перемещения»(After Moving) для этого типа перемещения(move type), это перемещение заканчивается.`,
        },
        {
          title: 'Расстановка (Set Up)',
          body: `Прежде чем ваши юниты смогут двигаться и совершать атаки, их сначала нужно будет установить на поле боя. Это чаще всего происходит при Развёртывании вашей армии для битвы, но может происходить и по другим причинам.

Когда правило предписывает вам установить юнит, поместите его модели на поле боя так, чтобы:
▪ Этот юнит находился в когерентности (см. ниже).
▪ Этот юнит не был связан боем(unengaged) (см. ниже).
▪ Были соблюдены все остальные требования и ограничения.

Если вы не можете установить все модели в юните, удалите этот юнит с поля боя и верните его на исходную позицию (например, в стратегические резервы(strategic reserves) или внутри ТРАНСПОРТА(TRANSPORT)).`,
          note: `Если вы не можете установить юнит: если в результате перемещения вам пришлось вернуть модели юнита на прежние позиции, потому что невозможно установить их всех, можно сказать что этот юнит не был выбран для совершения этого перемещения. Поэтому он может либо повторить попытку установки, либо остаться недвижимым(remain stationary) (09.04).`,
        },
        {
          title: 'Когерентность',
          body: `Юнит, содержащий более одной модели, должен быть установлен и завершать любой вид перемещения в когерентности. Юнит находится в когерентности, если для каждой модели в этом юните выполняются оба следующих условия:
▪ Находится в пределах 2" по горизонтали и 5" по вертикали от по крайней мере одной другой модели в этом юните.
▪ Находится в пределах 9" по горизонтали и 5" по вертикали от каждой другой модели в этом юните.

### Восстановление когерентности
На этапе «Конец хода»(End of Turn) каждого хода игрока, если один или несколько юнитов на поле боя не находятся в когерентности, контролирующие игроки этих юнитов должны удалять модели из них, по одной, пока она снова не станет когерентной. Модели, удалённые таким образом, уничтожаются, но они не активируют правила, которые срабатывают тогда, когда модель уничтожена.`,
          note: `Что такое когерентность? Когерентность(Coherency) не позволяет моделям в одном юните слишком сильно отдаляться друг от друга на поле боя, гарантируя, что они устанавливаются и завершают любой вид перемещения как единая группа.`,
        },
        {
          title: 'Связывание (Engagement)',
          body: `Радиус связывания(engagement range) модели — это область поля боя в пределах 2" по горизонтали и 5" по вертикали от неё.
▪ Пока союзная модель находится в радиусе связывания(engagement range) с одной или несколькими вражескими моделями, эти модели — и юниты, к которым они принадлежат, — находятся в сцеплении(engaged) друг с другом.
▪ Пока юнит не содержит ни одной связанной модели, этот юнит считается не связанным(unengaged).`,
          note: `Что такое связывание(ENGAGEMENT)? Когда вражеские модели находятся в радиусе связывания(engagement range) друг друга, они могут сражаться в жестокой рукопашной, поэтому, если только они не стремятся сражаться в ближнем бою, модели должны держаться вне досягаемости своих врагов.`,
        },
      ],
    },
    {
      title: 'Совершение атак',
      description: 'Во время битвы ваши юниты будут стрелять по врагу и сражаться с ним, совершая атаки своим оружием. В этом разделе объясняется, как совершать атаки вашими моделями.',
      subsections: [
        {
          title: 'Шаги атаки',
          body: `Каждый раз, когда юнит стреляет или вступает в ближний бой, активный игрок выполняет следующие шаги:
▪ 1. Выбрать оружие
▪ 2. Выбрать цели
▪ 3. Совершить атаки`,
        },
        {
          title: 'Выбор оружия',
          body: `Для каждой модели в атакующем юните выберите, каким оружием эта модель будет совершать атаки. Модели совершают дистанционные атаки дистанционным оружием и совершают атаки ближнего боя оружием ближнего боя.

### При стрельбе
Вы можете выбрать одно или несколько единиц дистанционного оружия, которое есть у этой модели.

### При ближнем бое
Вы должны выбрать одно оружие ближнего боя, которое есть у этой модели.`,
          note: `Модели без дистанционного/ближнего оружия: модель, у которой нет дистанционного оружия, не может совершать дистанционные атаки, а модель, у которой нет оружия ближнего боя, не может совершать атаки ближнего боя.`,
        },
        {
          title: 'Выбор целей',
          body: `Для каждого выбранного оружия:

### При стрельбе
Выберите один вражеский юнит в качестве цели для этого оружия. Если не указано иное, каждая цель должна:
▪ Быть видимой(visible) для модели, у которой есть это оружие (06.01).
▪ Находиться в дальности этого оружия.
▪ Не находиться в связывании(unengaged).

### При ближнем бое
Выберите один или несколько вражеских юнитов в качестве целей для этого оружия:
▪ Каждая цель должна находиться в радиусе связывания(engaged) с моделью, у которой есть это оружие.
▪ Вы не можете выбирать больше целей, чем характеристика A этого оружия.`,
          note: `Выбор целей: при стрельбе или ближнем бою вы можете выбирать разные цели для каждого оружия. Если вы не можете выбрать цель для оружия или решите не выбирать цель для дистанционного оружия, модель с этим оружием не будет совершать атаки им.`,
        },
        {
          title: 'Совершение атак',
          body: `Совершите атаки, используя следующую последовательность:

1. **Выберите вражеский юнит:** выберите один из вражеских юнитов, по которому нацелено одно или несколько орудий.

2. **Соберите кубики атаки:** выберите одно оружие, нацеленное на этот юнит, которое ещё не использовалось для совершения атак по нему, и соберите количество D6, равное характеристике **A** этого оружия. Это **кубики атаки(attack dice)** — каждый представляет одну атаку атакующей модели этим оружием.

Если одно или несколько других орудий, нацеленных на этот юнит, совершают [def:identical-attacks:идентичные атаки(identical attacks)] к выбранному оружию и эти оружия ещё не использовались для совершения атак по этой цели, они делают это сейчас, и вы также собираете **кубики атаки** этих орудий (например, для трёх орудий, совершающих [def:identical-attacks:идентичные атаки(identical attacks)], каждое с характеристикой **A** 2, соберите в общей сложности шесть D6).

3. **Результаты кубиков атаки:** выполните последовательность атаки (05) для всех **кубиков атаки(attack dice)**, которые вы только что собрали.

4. **Другие атаки:** следуйте первой из инструкций ниже, которая применяется:
→ Если есть какое-либо оружие, нацеленное на тот же юнит, которое ещё не использовалось для совершения атак, вернитесь к шагу «Соберите кубики атаки».
→ В противном случае, если есть какое-либо оружие с неразрешёнными атаками, нацеленное на другой юнит, вернитесь к шагу «Выберите вражеский юнит».
→ В противном случае, если все оружие использовано для совершения всех своих атак, эта последовательность заканчивается.`,
          definitions: [
            {
              id: 'identical-attacks',
              term: 'Идентичные атаки',
              text: 'Идентичные атаки — это те, которые имеют одинаковые характеристики BS/WS, S, AP и D, а также на которые действуют одни и те же применимые способности и правила.',
            },
            {
              id: 'splitting-melee',
              term: 'Разделение атак ближнего боя',
              text: 'При выборе целей, если вы выбираете более одного юнита в качестве цели для оружия ближнего боя, вы должны разделить атаки этого оружия между этими целевыми юнитами. Для этого объявите, сколько атак этого оружия будет совершено против каждого юнита (вы должны объявить как минимум одну атаку на каждый юнит, нацеленный на него).\n\nНа шаге «Соберите кубики атаки» для каждого оружия, которое разделяет свои атаки, собирайте только количество **кубиков атаки** для этого оружия, равное числу атак, которые вы объявили для этого оружия против этой цели.',
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
          body: `Каждый раз, когда активному игроку даётся указание совершить атаку, он выполняет шаги, описанные ниже. На каждом шаге, если необходимо бросить более одного кубика, все эти броски совершаются одновременно.
▪ 1. Hit Rolls (броски на попадание)
▪ 2. Wound Rolls (броски на ранение)
▪ 3. Save Rolls (спас-броски)
▪ 4. Inflict Damage (нанесение урона)`,
          note: `Критические попадания(Critical Hits) и критические ранения(Critical Wounds): критические попадания(Critical Hits) по-прежнему являются попаданиями, а критические ранения(Critical Wounds) — ранениями. Кроме того, другие правила могут быть активированы критическим попаданием или критическим ранением, например, Смертельные попадания (Lethal Hits) и Опустошительные раны (Devastating Wounds).`,
        },
        {
          title: 'Hit Rolls (броски на попадание)',
          body: `Сделайте один бросок на попадание(hit roll) для каждого кубика атаки(attack dice), бросив один D6. Для каждого результата проверьте, провален он или является попаданием, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → FAILS (Провал)
◆ Unmodified 6 (Немодифицированный) → CRITICAL HIT (Крит)
◆ Равна или превышает характеристику BS/WS этой атаки → HIT (Попадание)
◆ Любой другой результат → FAILS (Провал)`,
        },
        {
          title: 'Wound Rolls (броски на ранение)',
          body: `Сделайте один бросок на ранение(wound roll) для каждого попадания, бросив один D6. Для каждого результата проверьте, провален он или является ранением, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → FAILS (Провал)
◆ Unmodified 6 (Немодифицированный) → CRITICAL WOUND (Крит)
◆ Равна или превышает требуемый результат (см. таблицу ниже) → WOUND (Рана)
◆ Любой другой результат → FAILS (Провал)`,
        },
        {
          title: 'Save Rolls (спас-броски)',
          body: `Противостоящий игрок выполняет следующую последовательность:

1. Создайте группы: разделите все модели в целевом юните на следующие группы, столько раз, сколько необходимо:
▪ По одной группе для каждой модели ПЕРСОНАЖА(CHARACTER).
▪ Одна группа для всех остальных моделей с одинаковыми характеристиками W, Sv и InSv.

2. Порядок распределения: объявите порядок, в котором эти группы будут получать атаки, применяя все следующее:
▪ Если группа не-ПЕРСОНАЖА(non-CHARACTER) содержит модель, которая потеряла одну или несколько ран, эта группа должна быть первой в порядке распределения.
▪ Ни одна группа ПЕРСОНАЖА(CHARACTER) не может быть раньше в порядке распределения, чем группа не-ПЕРСОНАЖА(non-CHARACTER).
▪ Группы ПЕРСОНАЖА, содержащие модель, которая потеряла одну или несколько ран, должны быть раньше в порядке распределения, чем группы ПЕРСОНАЖА, не содержащие раненых моделей.

3. Сделайте спас-броски(Save Rolls): противостоящий игрок делает один спас-бросок(save roll) для каждой атаки, которая ранила цель, бросив один D6.`,
        },
        {
          title: 'Нанесение урона',
          body: `Противостоящий игрок выполняет следующую последовательность для каждого спас-броска, работая от самого низкого результата(ов) к самому высокому результату(ам), пока все атаки не будут разрешены или все модели в целевом юните не будут уничтожены(destroyed) — в последнем случае любые избыточные атаки теряются.

1. Выберите модель: выберите одну модель в текущей группе распределения (см. справа); это должна быть модель, которая потеряла одну или несколько ран, если возможно.
2. Проверьте спас-бросок(save rolls): для каждого результата проверьте, наносит ли эта атака урон или проваливается, сопоставив первое условие ниже, которое применяется:
◆ Unmodified 1 (Немодифицированный) → INFLICTS DAMAGE (Наносит урон)
◆ Неуязвимый спас-бросок(Invulnerable Save): модели в текущей группе распределения имеют характеристику InSv, и результат равен или превышает эту характеристику → FAILS (Провал)
◆ Save и AP: после модификации результата AP атакующего оружия он равен или превышает характеристику Sv моделей в текущей группе распределения → FAILS (Провал)
◆ Любой другой результат → INFLICTS DAMAGE (Наносит урон)

3. Нанесите урон: если эта атака наносит урон, выбранная модель теряет количество ран, равное характеристике D этой атаки. Если это снижает оставшиеся раны модели до 0 или ниже, она уничтожена(destroyed).

Пример: характеристика AP -1 изменит спас-бросок(save roll) с 3 на 2. Для моделей с характеристикой Sv 2+ или лучше эта атака будет неудачной.`,
          note: `Текущая группа распределения: первая группа в порядке распределения становится текущей. Когда все модели в группе распределения уничтожены(destroyed), следующая группа в порядке распределения становится текущей.`,
        },
        {
          title: 'Пример: совершение атак',
          body: `### 1. ВЫБОР ОРУЖИЯ
{red:КРАСНЫЙ} юнит атакует. Следующее оружие выбрано для атак:
▪ 2 boltguns (B)
▪ 2 bolt pistols (BP)
▪ 1 heavy bolter (HB)

### 2. ВЫБОР ЦЕЛЕЙ
{blue:СИНИЙ} юнит выбран в качестве цели. Юнит **видим** всем моделям в атакующем юните. Все выбранное оружие находится в пределах дальности, за исключением одного болт-пистолета. В результате это оружие не будет совершать атак.

### 3. СОВЕРШЕНИЕ АТАК
Здесь есть только один вражеский юнит, являющийся целью, поэтому контролирующий игрок теперь выбирает **кубики атаки**:
▪ Пять **кубиков атаки** собраны для болтганов и болт-пистолетов, которые имеют характеристики **A** 2 и 1 соответственно и все совершают **идентичные атаки**.
▪ Три **кубика атаки** собраны для тяжёлого болтера, который имеет характеристику **A** 3, но не совершает **идентичных атак**.`,
        },
        {
          title: 'Пример: результаты кубиков атаки',
          body: `### 1. HIT ROLLS (БРОСКИ НА ПОПАДАНИЕ)
Контролирующий игрок решает сначала сделать пять бросков на попадание для болтганов и болт-пистолета. Характеристика **BS** оружия 3+. Четыре атаки попадают в цель.

### 2. WOUND ROLLS (БРОСКИ НА РАНЕНИЕ)
Контролирующий игрок делает четыре броска на ранение. Оружие имеет характеристику **S** 4, а целевой юнит — характеристику **T** 3, поэтому для ранения требуются результаты 3+. Три атаки ранят цель.

### 3. SAVE ROLLS (СПАС-БРОСКИ)
Контролирующий игрок целевого юнита делает три спас-броска.

### 4. INFLICT DAMAGE (НАНЕСЕНИЕ УРОНА)
▪ Самый низкий результат меньше как характеристики **InSv**, так и **Sv** цели, поэтому эта атака наносит урон. Это снижает модель, которой была назначена эта атака, до 0 ран, что уничтожает её.
▪ Следующий по величине результат меньше характеристики **InSv** цели, но больше её характеристики **Sv** 3+; эта атака проваливается.
▪ Другой результат больше характеристики **InSv** цели 5+; эта атака также проваливается.`,
        },
        {
          title: 'Пример: другие атаки',
          body: `### 1. HIT ROLLS (БРОСКИ НА ПОПАДАНИЕ)
Затем контролирующий игрок делает три броска на попадание для тяжёлого болтера. Характеристика **BS** оружия 4+. Две атаки попадают в цель.

### 2. WOUND ROLLS (БРОСКИ НА РАНЕНИЕ)
Контролирующий игрок делает два броска на ранение. Оружие имеет характеристику **S** 5, поэтому для ранения требуются результаты 3+. Обе атаки ранят цель.

### 3. SAVE ROLLS (СПАС-БРОСКИ)
Контролирующий игрок целевого юнита делает два спас-броска.

### 4. INFLICT DAMAGE (НАНЕСЕНИЕ УРОНА)
▪ Самый низкий результат, __после модификации характеристикой **AP** атакующего оружия -1__, становится меньше характеристики **Sv** цели 3+, поэтому эта атака наносит урон. Это снижает модель, которой была назначена эта атака, до 0 ран, что уничтожает её.
▪ Другой результат равен характеристике **InSv** цели 5+; эта атака проваливается.`,
        },
        {
          title: 'Пример: атака присоединённых юнитов',
          body: `### 1. ВЫБОР ОРУЖИЯ
{red:КРАСНЫЙ} юнит атакует. Следующее оружие выбрано для атак:
▪ 7 boltguns (B)
▪ 1 plasma pistol (PP)
▪ 2 heavy bolters (HB)

### 2. ВЫБОР ЦЕЛЕЙ
{blue:СИНИЙ} юнит выбран в качестве цели. Это присоединённый юнит (19), сформированный из юнита Серафим и Святой Селестины (с двумя её Геминами Суперии). Юнит **видим** всем моделям в атакующем юните, и все выбранное оружие находится в пределах дальности.

### 3. СОВЕРШЕНИЕ АТАК
Нацелен только один вражеский юнит, поэтому контролирующий игрок теперь выбирает **кубики атаки**. Он решает сначала сделать атаки тяжёлых болтеров, каждый из которых имеет характеристику **A** 3, поэтому берётся шесть **кубиков атаки**.
**Кубики атаки** для остального оружия будут выбраны после того, как атаки тяжёлых болтеров будут совершены (см. напротив), следующим образом:
▪ 14 **кубиков атаки** для болтганов, каждый из которых имеет характеристику **A** 2.
▪ Один **кубик атаки** для плазма-пистолета, который имеет характеристику **A** 1.`,
        },
        {
          title: 'Пример: группы распределения',
          body: `### 1. СОЗДАТЬ ГРУППЫ И ОБЪЯВИТЬ ПОРЯДОК
Контролирующий игрок целевого юнита делит его на группы: одну, содержащую Святую Селестину, одну, содержащую Гемин Суперии, и одну, содержащую Серафим. Затем он объявляет порядок распределения, выбирая сначала Гемин Суперию (1), надеясь, что их лучшие характеристики **Sv** и **InSv** выдержат атаки. Серафим должны быть выбраны вторыми (2), так как Святая Селестина является моделью ПЕРСОНАЖА, поэтому должна быть последней в порядке (3).

### 2. ВЫБОР КУБИКОВ АТАКИ
Атаки тяжёлых болтеров ранили цель пять раз, поэтому контролирующий игрок целевого юнита делает пять спас-бросков(save rolls).
Атаки разрешаются по одной, от самых низких спас-бросков к самым высоким:
▪ Два результата 1 назначаются первыми текущей группе распределения (Гемины Суперии). Оба наносят урон, и обе Гемины Суперии уничтожены.
▪ Результат 3 теперь назначается Серафим, которые стали текущей группой распределения. __После модификации характеристикой **AP** атакующего оружия -1__ он также наносит урон, уничтожая одну модель Серафим.
▪ Оставшиеся атаки проваливаются, поэтому дальнейшего урона не наносится.

### 3. ВЫБРАТЬ СЛЕДУЮЩУЮ ГРУППУ КУБИКОВ АТАКИ И ПОВТОРИТЬ`,
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
      title: 'Другие понятия',
      description: 'Этот раздел содержит некоторые дополнительные концепции правил, которые наиболее часто используются при совершении атак.',
      subsections: [
        {
          title: 'Видимость',
          body: `Линия обзора(line of sight) используется для определения видимости между моделями. Чтобы наблюдающая модель имела линию обзора(line of sight), необходимо провести воображаемую прямую линию шириной 1 мм от любой части этой модели до любой части наблюдаемой модели. Эта линия является линией обзора(line of sight). При этом другие модели в юните наблюдающей модели и в юните наблюдаемой модели игнорируются.

Другие модели и юниты могут быть либо **видимыми(visible)**, либо **полностью видимыми(fully visible)** для наблюдающей модели, как показано ниже.

[img:/images/visibility/model-visible-ru.png|Диаграмма видимости — модель частично видима]

[img:/images/visibility/model-fully-visible-ru.png|Диаграмма видимости — модель полностью видима]

[img:/images/visibility/unit-visible-ru.png|Диаграмма видимости — юнит видим для наблюдателя]

[img:/images/visibility/unit-fully-visible-ru.png|Диаграмма видимости — юнит полностью видим для наблюдателя]`,
          note: `Рельеф применяет дополнительные правила к видимости (13.07).`,
        },
        {
          title: 'Неотвратимые раны (Mortal Wounds)',
          body: `Некоторые атаки или правила наносят неотвратимые раны(mortal wounds) юнитам. Каждый раз, когда юнит получает одну или несколько неотвратимых ран(mortal wounds), его контролирующий игрок должен выполнить следующую последовательность действий для каждой из этих неотвратимых ран(mortal wounds), пока либо все они не будут нанесены или этот юнит не будет уничтожен:

1. Выберите модель: выберите одну модель в этом юните, следуя первой инструкции ниже, которая будет применима:
→ Если не-ПЕРСОНАЖ(non-CHARACTER) модель в этом юните потеряла одну или несколько ран, вы должны выбрать эту модель.
→ В противном случае, если этот юнит содержит одну или несколько не-ПЕРСОНАЖ(non-CHARACTER) моделей, вы должны выбрать одну из этих моделей.
→ В противном случае, если одна или несколько моделей ПЕРСОНАЖ(CHARACTER) в этом юните потеряли одну или несколько ран, вы должны выбрать одну из этих моделей.
→ В противном случае, вы должны выбрать одну модель ПЕРСОНАЖ(CHARACTER) в этом юните.

2. Нанесите урон: выбранная модель теряет 1 рану. Если это снижает оставшиеся раны модели до 0, она уничтожена.

### Неотвратимые раны и обычный урон
При броске кубиков атаки(attack dice), если эти атаки наносят смесь как неотвратимых ран(mortal wounds), так и обычного урона, сначала нанесите весь обычный урон, затем нанесите все неотвратимые раны(mortal wounds).`,
        },
        {
          title: 'Hazard Rolls (проверка опасности)',
          body: `Чтобы выполнить проверку опасности(hazard roll) для юнита, бросьте один D6: на 1-2 проверка провалена, и этот юнит страдает от 1 неотвратимой раны(mortal wound) или 3 неотвратимых ран(mortal wounds) вместо этого, если каждая модель в этом юните является МОНСТРОМ/ТЕХНИКОЙ(MONSTER/VEHICLE). Если для юнита требуется более одной проверки опасности(hazard roll), сделайте все эти броски одновременно.`,
        },
      ],
    },
  ],
}
