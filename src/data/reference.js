export const abilityIntro = {
  en: [
    {
      id: 'section-24-01',
      sectionNum: '24.01',
      title: 'Abilities',
      body: `Many units have **[gloss:core-abilities:core abilities]** listed on their [gloss:datasheet:datasheets], and **[gloss:weapon-abilities:weapon abilities]** listed in their [gloss:weapon-profiles:weapon profiles].

**Weapon abilities** are presented in square brackets with bold formatting, e.g. **[BLAST]**. Weapons are often described using a particular ability they have, e.g. **[BLAST]** weapons are those with the **[BLAST]** ability.

If a **weapon ability** is followed by one or more keywords, when making attacks with that weapon, that ability only applies if the target unit has one or more of those keywords.`,
      example: 'The **[LETHAL HITS: VEHICLE]** ability only applies to attacks that target a VEHICLE unit. The **[SUSTAINED HITS 1: INFANTRY/BEASTS]** ability only applies to attacks that target an [gloss:infantry:INFANTRY]/[gloss:beasts:BEASTS] unit.',
      children: [
        {
          id: 'section-24-01-01',
          sectionNum: '24.01.01',
          title: "With The 'X' Ability",
          fromApp: true,
          body: `Some rules affect or require you to select a model or unit with a particular ability. When resolving such rules, any numbers following the ability are irrelevant when determining if such rules apply.`,
          example: `If a rule instructs you to select a model from your army with the **Deadly Demise** ability, you could select a model with the **Deadly Demise 1**, **Deadly Demise D3** or **Deadly Demise D6** ability.`,
        },
      ],
    },
    {
      id: 'section-24-02',
      sectionNum: '24.02',
      title: 'Duplicated Abilities',
      body: `Multiple instances of the same **[gloss:core-abilities:core ability]** or **[gloss:weapon-abilities:weapon ability]** are not cumulative, regardless of any numbers or keywords included in them. In such cases, the controlling player must select which instance will apply at any one time. In the case of duplicated **weapon abilities**, this selection must be made each time that unit makes attacks, in the [gloss:select-weapons:Select Weapons] step.

▪ Multiple instances of **core abilities** that include a number are [gloss:duplicated:duplicated] even if that number varies. However, in the case of [gloss:scouts:Scouts], you must select the lowest number not shared by every model in that unit (e.g. if every model in a unit has both **Scouts 6"** and **Scouts 8"**, you could select **Scouts 8"** as it is shared by every model, but if a unit contains one model with **Scouts 6"** and five with **Scouts 8"**, you must select **Scouts 6"**).
▪ Multiple instances of **weapon abilities** that include a number (e.g. **[SUSTAINED HITS 1]**) are duplicated even if that number varies (e.g. the controlling player would have to select between **[SUSTAINED HITS 1]** and **[SUSTAINED HITS 2]**).
▪ Multiple instances of **weapon abilities** that include a keyword are duplicated even if that keyword varies (e.g. the controlling player would have to select between **[ANTI-VEHICLE 4+]** and **[ANTI-INFANTRY 2+]**).`,
    },
  ],
  ru: [
    {
      id: 'section-24-01',
      sectionNum: '24.01',
      title: 'Способности',
      body: `Многие юниты имеют **[gloss:core-abilities:базовые способности]**, указанные в их **[gloss:datasheet:листах данных]**, а также **[gloss:weapon-abilities:способности оружия]**, указанные в **[gloss:weapon-profiles:профилях оружия]**.

**Способности оружия** представлены в квадратных скобках полужирным шрифтом, например **[BLAST]**. Об оружии часто говорят с указанием конкретной способности, которой оно обладает, например, оружие **[BLAST]** — это оружие со способностью **[BLAST]**.

Если за **способностью оружия** следует одно или несколько **[gloss:keywords:ключевых слов]**, то при совершении атак этим оружием эта способность применяется, только если целевой юнит имеет одно или несколько из этих ключевых слов.`,
      example: 'Способность **[LETHAL HITS: VEHICLE]** применяется только к атакам, целью которых является юнит [gloss:vehicle:VEHICLE]. Способность **[SUSTAINED HITS 1: INFANTRY/BEASTS]** применяется только к атакам, целью которых является юнит [gloss:infantry:INFANTRY]/[gloss:beasts:BEASTS].',
      children: [
        {
          id: 'section-24-01-01',
          sectionNum: '24.01.01',
          title: "Со способностью «X» (With The 'X' Ability)",
          fromApp: true,
          body: `Некоторые правила влияют на модель или юнит с определённой способностью или требуют выбрать такую модель или юнит. При отыгрыше таких правил любые числа, следующие за способностью, не имеют значения при определении того, применяются ли такие правила.`,
          example: `Если правило предписывает вам выбрать модель из вашей армии со способностью **Deadly Demise**, вы можете выбрать модель со способностью **Deadly Demise 1**, **Deadly Demise D3** или **Deadly Demise D6**.`,
        },
      ],
    },
    {
      id: 'section-24-02',
      sectionNum: '24.02',
      title: 'Повторяющиеся способности',
      body: `Несколько экземпляров одной и той же **[gloss:core-abilities:базовой способности]** или **[gloss:weapon-abilities:способности оружия]** не суммируются (are not cumulative), независимо от любых чисел или **[gloss:keywords:ключевых слов]**, включённых в них. В таких случаях **[gloss:controlling-player:управляющий игрок]** должен выбрать, какой экземпляр будет применяться в каждый конкретный момент. В случае повторяющихся способностей оружия этот выбор должен быть сделан каждый раз, когда этот юнит совершает атаки, на шаге «**[gloss:select-weapons:Выбор оружия]**».

▪ Несколько экземпляров **[gloss:core-abilities:базовых способностей]**, которые включают число, считаются **[gloss:duplicated:повторяющимися]**, даже если это число различается. Однако в случае способности **[gloss:scouts:скаут]** вы должны выбрать наименьшее число, которое не является общим для каждой модели в этом юните (например, если каждая модель в юните имеет и **скаут 6"**, и **скаут 8"**, вы можете выбрать **скаут 8"**, так как она является общей для всех моделей, но если юнит содержит одну модель с **скаут 6"** и пять с **скаут 8"**, вы должны выбрать **скаут 6"**).
▪ Несколько экземпляров **[gloss:weapon-abilities:способностей оружия]**, которые включают число (например, **[SUSTAINED HITS 1]**), считаются повторяющимися, даже если это число различается (например, управляющий игрок должен выбирать между **[SUSTAINED HITS 1]** и **[SUSTAINED HITS 2]**).
▪ Несколько экземпляров способностей оружия, которые включают **[gloss:keywords:ключевое слово]**, считаются повторяющимися, даже если это ключевое слово различается (например, управляющий игрок должен будет выбирать между **[ANTI-VEHICLE 4+]** и **[ANTI-INFANTRY 2+]**).`,
    },
  ],
}

export const coreAbilities = {
  en: [
    {
      num: '24.03',
      name: '[ANTI]',
      type: 'weapon',
      flavor: 'Certain weapons are the bane of particular foes.',
      fullText: `This ability always takes the form **[ANTI-X Y+]**. Each time an attack is made with an **[ANTI]** weapon, if the target unit has the keyword denoted by **X**, an unmodified **[gloss:wound-roll:wound roll]** of Y+ is a **[gloss:critical-wound:critical wound]**.`,
      example: 'An attack made with an **[ANTI-VEHICLE 4+]** weapon against a VEHICLE unit will result in a **critical wound** on an unmodified **wound roll** of 4+, while an attack made with an **[ANTI-PSYKER 2+]** weapon against a [gloss:psyker:PSYKER] unit will result in a **critical wound** on an unmodified **wound roll** of 2+.',
    },
    {
      num: '24.04',
      name: '[ASSAULT]',
      type: 'weapon',
      flavor: 'Folding stocks, shortened barrels or lightweight construction enable some weapons to be easily fired on the move.',
      fullText: `Units containing one or more models with an **[ASSAULT]** weapon can shoot using **[gloss:assault-shooting:assault shooting]** (10.05).`,
    },
    {
      num: '24.05',
      name: '[BLAST]',
      type: 'weapon',
      flavor: 'High-explosive rounds can fell several warriors in a single blast, but firing them too close to comrades is unwise.',
      fullText: `Each time you gather **[gloss:attack-dice:attack dice]** for a **[BLAST]** weapon, add one additional **attack dice** for every five models that were in the target unit in the [gloss:select-targets:Select Targets] step (rounding down).

If this ability takes the form **[BLAST X]**, each time you gather **attack dice** for such a weapon, add **X** additional **attack dice** for every five models that were in the target unit in the Select Targets step (rounding down) instead.`,
      example: 'If a **[BLAST 2]** weapon with an **A** characteristic of 3 targets a unit containing 12 models, you would gather four additional **attack dice** for that weapon (for a total of seven for that weapon).',
    },
    {
      num: '24.06',
      name: '[CLEAVE]',
      type: 'weapon',
      flavor: 'With sufficient might or skill, warriors may sweep blades or talons through their foes in long lethal arcs.',
      fullText: `This ability always takes the form **[CLEAVE X]**. Each time you gather **[gloss:attack-dice:attack dice]** for a **[CLEAVE]** weapon, if you only selected one target for all of that weapon's attacks, add **X** additional **attack dice** for every five models that were in the target unit in the Select Targets step (rounding down).`,
      example: 'If a **[CLEAVE 1]** weapon with an **A** characteristic of 3 targets a unit containing 16 models, you would gather three additional **attack dice** for that weapon (for a total of six for that weapon).',
    },
    {
      num: '24.07',
      name: '[CLOSE-QUARTERS]',
      type: 'weapon',
      flavor: 'Weapons designed for close-quarters fighting can be wielded effectively even in the press of melee combat.',
      fullText: `Units containing one or more models with a **[CLOSE-QUARTERS]** weapon can shoot using **[gloss:close-quarters:close-quarters shooting]** (10.06).

When using another **shooting type**, for each model in that unit (excluding MONSTER/VEHICLE models), you can only select **one** of the following to make attacks with:
▪ One or more of its **[CLOSE-QUARTERS]** weapons.
▪ One or more of its other ranged weapons.`,
    },
    {
      num: '24.08',
      name: 'Deadly Demise',
      type: 'unit',
      flavor: 'From detonating ammo stores to corrosive innards or frenzied death throes, some targets are deadly even in defeat.',
      fullText: `This ability always takes the form **Deadly Demise X**. Each time a model with this ability is **[gloss:destroyed:destroyed]**, after the units embarked within it (if any) have made their **[gloss:emergency-disembark-move:emergency disembark moves]**, roll one D6. On a 6, that model suffers a **deadly demise**; each unit within 6" of that model suffers a number of **[gloss:mortal-wound:mortal wounds]** denoted by **X** (if this is a random number, roll separately for each unit within 6").`,
    },
    {
      num: '24.09',
      name: 'Deep Strike',
      type: 'unit',
      flavor: 'There are many ways by which to deploy troops to the field of battle including tunnels, teleportation devices and other esoteric means of transportation.',
      fullText: `Each time this unit makes an **[gloss:ingress-move:ingress move]** (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8" horizontally from all enemy units, even if that is within your opponent's deployment zone.`,
    },
    {
      num: '24.10',
      name: '[DEVASTATING WOUNDS]',
      type: 'weapon',
      flavor: 'The most potent weapons strike with such power that they make a mockery of armour and can cleave through several foes.',
      fullText: `Each time an attack made with a **[DEVASTATING WOUNDS]** weapon results in a **[gloss:critical-wound:critical wound]**, the attack sequence for that attack ends and the target unit suffers a number of **[gloss:mortal-wound:mortal wounds]** equal to the **[gloss:damage-roll:D]** characteristic of that weapon. These are inflicted after resolving any normal damage inflicted by those attacks.

**Mortal wounds** inflicted by **[DEVASTATING WOUNDS]** weapons can damage a maximum of one model for each **critical wound**; any remaining **mortal wounds** inflicted by that attack are lost.`,
      example: 'An attack made with a **[DEVASTATING WOUNDS]** weapon with a **D** characteristic of 3 results in a **critical wound** against an Intercessor Squad, so inflicts **3 mortal wounds**. The first 2 **mortal wounds** are sufficient to **destroy** 1 Intercessor model, so the remaining **mortal wound** is lost.',
    },
    {
      num: '24.11',
      name: '[EXTRA ATTACKS]',
      type: 'weapon',
      flavor: 'Some warriors ride to battle atop trusty mounts that gore and trample nearby foes. Others wield combat weapons that deliver a frenzy of additional blows.',
      fullText: `Each time a unit containing one or more models with an **[EXTRA ATTACKS]** weapon fights, those models will make attacks with those weapons in addition to any others. In the [gloss:select-weapons:Select Weapons] step (04.01), for each of those models, you must select:
▪ All of that model's **[EXTRA ATTACKS]** weapons.
▪ One of that model's other melee weapons, if possible.`,
      children: [
        {
          id: 'section-24-11-01',
          sectionNum: '24.11.01',
          title: 'Only [EXTRA ATTACKS] weapons',
          fromApp: true,
          body: `If a unit has [EXTRA ATTACKS] weapons, it does not need to select weapons without the [EXTRA ATTACKS] ability in order to make attacks with those [EXTRA ATTACKS] weapons.`,
        },
      ],
    },
    {
      num: '24.12',
      name: 'Feel No Pain',
      type: 'unit',
      flavor: 'The hardiest warriors refuse to be laid low, even by wounds that should by all rights prove lethal.',
      fullText: `This ability always takes the form **Feel No Pain X+**. Each time a model with this ability would lose a wound, roll one D6: on an **X+**, that wound is not lost.`,
    },
    {
      num: '24.13',
      name: 'Fights First',
      type: 'unit',
      flavor: 'Those possessed of lightning-fast reactions may strike before the opponent can react.',
      fullText: `While every model in a unit has this ability, that unit is a **[gloss:fights-first:Fights First]** unit.

See the Resolve Fights First Combats step in the Fight phase (12.04).`,
    },
    {
      num: '24.14',
      name: 'Firing Deck',
      type: 'unit',
      flavor: 'Some transports have dedicated platforms or firing ports from which embarked passengers can lay down a withering hail of munitions.',
      fullText: `This ability always takes the form **Firing Deck X**. In your Shooting phase, each time this TRANSPORT is **[gloss:selected-to-shoot:selected to shoot]**, if one or more units are embarked within it, resolve the following sequence:
1. Select up to **X** models embarked within this TRANSPORT (excluding models whose units have already been **selected to shoot** this phase).
2. For each selected model, select one of its ranged weapons (excluding **[ONE SHOT]** weapons).
3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons.
4. Until the end of the turn, units embarked within this TRANSPORT are **[gloss:not-eligible-to-shoot:not eligible to shoot]**.`,
    },
    {
      num: '24.15',
      name: '[HAZARDOUS]',
      type: 'weapon',
      flavor: 'Weapons powered by unstable and dangerous energy sources pose a substantial risk to the wielder and those that stand beside them.',
      fullText: `Each time a unit is **[gloss:selected-to-shoot:selected to shoot]** or **[gloss:selected-to-fight:selected to fight]**, after that unit has resolved all of its attacks, make a number of **[gloss:hazard-roll:hazard rolls]** (06.03) for that unit equal to the number of **[HAZARDOUS]** weapons you selected in the Select Weapons step.`,
    },
    {
      num: '24.16',
      name: '[HEAVY]',
      type: 'weapon',
      flavor: 'Heavy weapons are amongst the biggest guns on the battlefield, but require bracing to fire at full effect.',
      fullText: `In your Shooting phase, each time an attack is made with a **[HEAVY]** weapon, add 1 to the **[gloss:hit-roll:hit roll]** if all of the following apply to the attacking unit:
▪ That unit is **[gloss:unengaged:unengaged]**.
▪ That unit was not set up on the battlefield this turn.
▪ No model in that unit has moved more than 3" this turn.`,
    },
    {
      num: '24.17',
      name: 'Hover',
      type: 'unit',
      flavor: 'Some airborne vehicles can use vectored thrusters or anti-gravity technology to hover and skim over the battlefield, the better to hunt their prey or deploy embarked troops.',
      fullText: `Each time this unit **[gloss:take-to-the-skies:takes to the skies]** (21.03), do not subtract 2" from the **[gloss:maximum-distance:maximum distance]**.`,
    },
    {
      num: '24.18',
      name: '[IGNORES COVER]',
      type: 'weapon',
      flavor: 'Some weapons are designed to route enemy formations out of entrenched positions.',
      fullText: `Each time an attack is made with an **[IGNORES COVER]** weapon, the target cannot have the **[gloss:benefit-of-cover:benefit of cover]** against that attack, including from rules that give a model or unit the **benefit of cover** (e.g. **Stealth**).`,
    },
    {
      num: '24.19',
      name: '[INDIRECT FIRE]',
      type: 'weapon',
      flavor: 'Indirect fire weapons launch munitions over or around intervening obstacles – nowhere is safe from their fury.',
      fullText: `Units containing one or more models with an **[INDIRECT FIRE]** weapon can shoot using **[gloss:indirect-shooting:indirect shooting]** (10.07).`,
    },
    {
      num: '24.20',
      name: 'Infiltrators',
      type: 'unit',
      flavor: 'Many armies employ reconnaissance units who can sit concealed, waiting for the right moment to strike.',
      fullText: `During deployment, if every model in a unit has this ability, it can be set up anywhere on the battlefield that is more than 8" horizontally from your opponent's deployment zone and all enemy units.`,
    },
    {
      num: '24.21',
      name: '[LANCE]',
      type: 'weapon',
      flavor: 'With the momentum of a warrior at full-tilt, lance weapons are deadly on the charge.',
      fullText: `Each time an attack is made with a **[LANCE]** weapon, if the attacking model's unit made a **[gloss:charge-move:charge move]** this turn, add 1 to the **[gloss:wound-roll:wound roll]**.`,
    },
    {
      num: '24.22',
      name: 'Leader',
      type: 'unit',
      flavor: 'Mighty heroes fight at the forefront of battle.',
      fullText: `Before the battle, in the Muster Armies step, for each **leader** and **support** unit in your army, you can select one friendly **bodyguard** unit that unit can **lead**. That unit will then **lead** that **bodyguard** unit for the battle and form an **attached** unit with it.

Unless otherwise stated, each **bodyguard** unit can only have one **leader** unit and one **support** unit attached to it.

See Attached Units (19).`,
    },
    {
      num: '24.23',
      name: '[LETHAL HITS]',
      type: 'weapon',
      flavor: 'Many deadly weapons can inflict fatal injuries on any foe, no matter their resilience.',
      fullText: `Each time an attack made with a **[LETHAL HITS]** weapon results in a **[gloss:critical-hit:critical hit]**, you can choose for that attack to automatically wound the target.`,
      note: 'Choosing to automatically wound the target means that no **wound roll** is made for that attack. You may decide against this, as it means that attack cannot result in a **critical wound** and so cannot trigger other abilities such as **[DEVASTATING WOUNDS]**.',
    },
    {
      num: '24.24',
      name: 'Lone Operative',
      type: 'unit',
      flavor: 'Assassins and other covert agents are difficult to pinpoint in the storm of battle.',
      fullText: `Unless part of an **attached** unit, this unit is not **visible** to enemy models unless they are within 12" of this unit, and it cannot be targeted by **[INDIRECT FIRE]** weapons unless the attacking model is within 12" of this unit.

If this ability takes the form **Lone Operative X"**, unless part of an **attached** unit, this unit is not **visible** to enemy models unless they are within **X"** of this unit, and it cannot be targeted by **[INDIRECT FIRE]** weapons unless the attacking model is within **X"** of this unit.`,
      children: [
        {
          id: 'section-24-24-01',
          sectionNum: '24.24.01',
          title: 'Attached units and Lone Operative',
          fromApp: true,
          body: `If all models in an **attached** unit have **Lone Operative**, that unit will benefit from **Lone Operative**.

If a unit has **Lone Operative**, but models in that unit have different range values for **Lone Operative**, the highest value amongst that unit's models on the battlefield is applied to the whole unit.

If an **attached** unit **below starting strength** only contains models with **Lone Operative**, **Lone Operative** becomes active again.

**Example:** A CHARACTER with **Lone Operative** is attached to a **bodyguard** unit that has **Lone Operative 15"**. **Lone Operative 15"** is therefore used for the whole unit.

**Example:** A CHARACTER with **Lone Operative** is attached to a **bodyguard** unit that does not have **Lone Operative**. Once all of the **bodyguard** models have been **destroyed** and only the CHARACTER remains, the CHARACTER's **Lone Operative** becomes active again.`,
        },
      ],
    },
    {
      num: '24.25',
      name: '[MELTA]',
      type: 'weapon',
      flavor: 'Melta weapons are powerful heat rays whose fury is magnified at close range.',
      fullText: `This ability always takes the form **[MELTA X]**. Each time a model makes an attack with a **[MELTA]** weapon, if the target unit was within half range of that weapon in the Select Targets step, until the attacking unit's attacks have been resolved, add **X** to that weapon's **[gloss:damage-roll:D]** characteristic.`,
      example: 'A model targets a unit that is within half range of a **[MELTA 2]** weapon with a **D** characteristic of D6. While resolving those attacks, that weapon has a **D** characteristic of D6+2.',
    },
    {
      num: '24.26',
      name: '[ONE SHOT]',
      type: 'weapon',
      flavor: 'Some weapons are so rare, or so complex and slow to reload, that they can only be used once.',
      fullText: `Each weapon with this ability can only be selected to make attacks with once per battle.

If a **[gloss:destroyed:destroyed]** model is returned to a unit, all of its **[ONE SHOT]** weapons that have already been selected to make attacks with during the battle cannot be selected to make attacks with again.

If a new unit is added to an army, all **[ONE SHOT]** weapons in that unit can be selected to make attacks with once per battle.`,
      children: [
        {
          id: 'section-24-26-01',
          sectionNum: '24.26.01',
          title: 'Multiple [ONE SHOT] Weapons',
          fromApp: true,
          body: `If a model is equipped with more than one of the same weapon with the [ONE SHOT] ability (e.g. 2 hunter-killer missiles), that model can shoot with each of those weapons once per battle.`,
        },
      ],
    },
    {
      num: '24.27',
      name: '[PISTOL]',
      type: 'weapon',
      flavor: 'Pistols can be wielded even at point-blank range.',
      fullText: `**[PISTOL]** and **[CLOSE-QUARTERS]** are identical for all rules purposes. See **[CLOSE-QUARTERS]**.`,
      note: '**[PISTOL]** is a pre-existing ability that will be superseded by **[CLOSE-QUARTERS]** as this edition of Warhammer 40,000 progresses. Both are functionally the same, but the latter is a more suitable term for weapons that function in this way.',
    },
    {
      num: '24.28',
      name: '[PRECISION]',
      type: 'weapon',
      flavor: 'Precision attacks can pick high-value targets out in a crowd.',
      fullText: `While resolving attacks made with one or more **[PRECISION]** weapons, at the start of the [gloss:allocation-order:Allocation Order] step (05.03), if the target unit contains one or more **[gloss:character:CHARACTER]** models **[gloss:visible:visible]** to one or more of the attacking models, the active player can select one allocation group that contains one of those **visible CHARACTER** models. If they do, until those attacks are resolved, or until that **CHARACTER** group is **destroyed** (whichever happens first), that **CHARACTER** group is the current allocation group.`,
      children: [
        {
          id: 'section-24-28-01',
          sectionNum: '24.28.01',
          title: 'Precision and Devastating Wounds',
          fromApp: true,
          body: `**Mortal wounds** inflicted by a **[PRECISION]** attack with the **[DEVASTATING WOUNDS]** ability are first applied to the **CHARACTER** group that was selected for those **[PRECISION]** attacks (if that group is not already **destroyed**).`,
        },
      ],
    },
    {
      num: '24.29',
      name: '[PSYCHIC]',
      type: 'weapon',
      flavor: 'Some weapons can channel the bearer\'s psychic might to empower their blows.',
      fullText: `Each time an attack is made with a **[PSYCHIC]** weapon, you can ignore any or all modifiers to that attack's **[gloss:ballistic-skill:BS]** or **[gloss:weapon-skill:WS]** characteristic and any or all modifiers to the **[gloss:hit-roll:hit roll]**. Attacks made with **[PSYCHIC]** weapons are known as **[gloss:psychic:psychic attacks]** (this can be important for the triggering of other rules).`,
    },
    {
      num: '24.30',
      name: '[RAPID FIRE]',
      type: 'weapon',
      flavor: 'Rapid fire weapons are capable of long-ranged precision shots or controlled bursts at nearby targets.',
      fullText: `This ability always takes the form **[RAPID FIRE X]**. Each time you gather **[gloss:attack-dice:attack dice]** for a **[RAPID FIRE]** weapon, add **X** additional **attack dice** if the target unit was within half range of that weapon in the Select Targets step.`,
      example: 'If a **[RAPID FIRE 1]** weapon with an **A** characteristic of 1 targets a unit that is within half range, you would gather one additional **attack dice** for that weapon (for a total of two for that weapon).',
    },
    {
      num: '24.31',
      name: 'Scouts',
      type: 'unit',
      flavor: 'Scouts form the vanguard of many armies. Unnoticed by the enemy, they range ahead of the main force.',
      fullText: `This ability always takes the form **Scouts X"**. In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do **one** of the following:
▪ If that unit is in **[gloss:strategic-reserves:strategic reserves]**, you can set up that unit anywhere that is wholly within your deployment zone.
▪ If that unit is wholly within your deployment zone, it can make a **scout move** (see below).
▪ If that unit is embarked within a **DEDICATED TRANSPORT** that is wholly within your deployment zone, and if every model embarked within that **DEDICATED TRANSPORT** has the **Scouts** ability, that **DEDICATED TRANSPORT** can make a **scout move**.`,
    },
    {
      num: '24.32',
      name: 'Scout Move',
      type: 'unit',
      flavor: 'Rangers and outriders advance with practised precision before the battle begins in earnest.',
      fullText: `◈ MAXIMUM DISTANCE | The X" in Scouts X".
◈ ELIGIBLE IF | It is the Resolve Pre-battle Abilities step, and your unit is wholly within your deployment zone.
◈ EFFECT | Your unit moves as described in Moving (03).
◈ AFTER MOVING | Your unit must be more than 8" horizontally from all enemy units.`,
    },
    {
      num: '24.33',
      name: 'Stealth',
      type: 'unit',
      flavor: 'The stealthiest warriors can evade the attentions, and the bullets, of their foes.',
      fullText: `If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the **[gloss:benefit-of-cover:benefit of cover]** against that attack (13.08).`,
    },
    {
      num: '24.34',
      name: 'Support',
      type: 'unit',
      flavor: 'Specialist combatants may be assigned to front-line squads to bolster their fighting effectiveness.',
      fullText: `Before the battle, in the Muster Armies step, for each **leader** and **support** unit in your army, you can select one friendly **bodyguard** unit that unit can **lead**. That unit will then **lead** that **bodyguard** unit for the battle and form an **attached** unit with it.

Unless otherwise stated, each **bodyguard** unit can only have one **leader** unit and one **support** unit attached to it.

See Attached Units (19).`,
    },
    {
      num: '24.35',
      name: 'Super-heavy Walker',
      type: 'unit',
      flavor: 'Monstrous creatures and gigantic engines of war loom over the battlefield like gods given form, striding through almost any obstacle that bars their passage.',
      fullText: `Each time a unit with this ability makes a **normal**, **[gloss:advance:advance]** or **[gloss:fall-back-move:fall-back move]**:
▪ Models in that unit can move through models (including MONSTER/VEHICLE models, but excluding TITANIC models) and can move horizontally through sections of **terrain features** that are 4" or less in height.
▪ Before moving that unit, you can select for all models in that unit to have the MOBILE keyword until that move ends. If you do, when that move ends, roll one D6: on a 1, that unit is **[gloss:battle-shocked:battle-shocked]**.`,
      note: 'Gaining the MOBILE keyword for the duration of a move will enable models in that unit to move horizontally through **dense terrain features** (13.06).',
    },
    {
      num: '24.36',
      name: '[SUSTAINED HITS]',
      type: 'weapon',
      flavor: 'Some weapons possess a punishing rate of fire, or can land devastating flurries of blows, tearing the foe apart with relentless ferocity.',
      fullText: `This ability always takes the form **[SUSTAINED HITS X]**. Each time an attack made with a **[SUSTAINED HITS]** weapon results in a **[gloss:critical-hit:critical hit]**, that attack results in a number of additional hits on the target as denoted by **X**.`,
      example: 'An attack made with a **[SUSTAINED HITS 2]** weapon results in a **critical hit**. That attack therefore hits the target three times (once from the **critical hit**, and twice more from the **[SUSTAINED HITS 2]** ability).',
    },
    {
      num: '24.37',
      name: '[TORRENT]',
      type: 'weapon',
      flavor: 'Torrent weapons project clouds of fire, gas or other lethal substances that few foes can hope to evade.',
      fullText: `Each time an attack is made with a **[TORRENT]** weapon, that attack automatically hits the target.`,
    },
    {
      num: '24.38',
      name: '[TWIN-LINKED]',
      type: 'weapon',
      flavor: 'Dual weapons are often grafted to the same targeting system for greater lethality.',
      fullText: `Each time an attack is made with a **[TWIN-LINKED]** weapon, you can re-roll the **[gloss:wound-roll:wound roll]**.`,
    },
    {
      num: '24.39',
      name: 'Damaged',
      type: 'unit',
      fullText: `This ability always takes the form **Damaged X**. While a model's remaining wounds are equal to or less than **X**, that model is **[gloss:damaged:damaged]**:
▪ While a model is **damaged**, that model's attacks have -1 to **[gloss:hit-roll:hit rolls]**.`,
    },
    {
      num: '',
      name: '[BUBBLECHUKKA]',
      type: 'weapon',
      flavor: 'Bubblechukkas fire unstable pockets of force whose size and density are anyone’s guess.',
      fullText: `This ability is unique to the bubblechukka. Before selecting targets for one or more models equipped with a **[BUBBLECHUKKA]** weapon, roll one D6 to determine which profile those models make attacks with: **1-2** big bubble; **3-4** wobbly bubble; **5-6** dense bubble.`,
    },
  ],
  ru: [
    {
      // 24.03 [ANTI]
      flavor: 'Некоторые виды оружия являются настоящим бичом для определённых врагов.',
      fullText: `Эта способность всегда имеет вид **[ANTI-X Y+]**. Каждый раз, когда совершается атака оружием **[ANTI]**, если целевой юнит имеет **[gloss:keywords:ключевое слово]**, обозначенное **X**, **немодифицированный** (unmodified) **[gloss:wound-roll:бросок на ранение]** Y+ считается **[gloss:critical-wound:критическим ранением]**.`,
      example: 'Атака, совершённая оружием **[ANTI-VEHICLE 4+]** против юнита [gloss:vehicle:VEHICLE], приведёт к **критическому ранению** (critical wound) при **немодифицированном** броске на ранение 4+. В то время как атака, совершённая оружием **[ANTI-PSYKER 2+]** против юнита [gloss:psyker:PSYKER], приведёт к **критическому ранению** при немодифицированном броске на ранение 2+.',
    },
    {
      // 24.04 [ASSAULT]
      flavor: 'Складные приклады, укороченные стволы или облегчённая конструкция позволяют некоторому оружию легко стрелять на ходу.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[ASSAULT]**, могут стрелять, используя **[gloss:assault-shooting:штурмовую стрельбу]** (10.05).`,
    },
    {
      // 24.05 [BLAST]
      flavor: 'Фугасные снаряды могут поразить нескольких воинов одним взрывом, но стрелять ими слишком близко к товарищам неразумно.',
      fullText: `Каждый раз, когда вы выбираете **[gloss:attack-dice:кубики атаки]** для оружия **[BLAST]**, добавьте один дополнительный **кубик атаки** за каждые **пять** моделей, которые находились в целевом юните на шаге «**[gloss:select-targets:Выбор целей]**» (округляя в меньшую сторону).

Если эта способность имеет вид **[BLAST X]**, то каждый раз, когда вы выбираете **кубики атаки** для такого оружия, вместо этого добавьте **X** дополнительных **кубиков атаки** за каждые пять моделей, которые находились в целевом юните на шаге «Выбор целей» (округление в меньшую сторону).`,
      example: 'Если оружие **[BLAST 2]** с характеристикой **A** (количество атак) 3 нацелено на юнит, содержащий 12 моделей, вы добавите четыре дополнительных **кубика атаки** для этого оружия (всего семь **кубиков атаки** для этого оружия).',
    },
    {
      // 24.06 [CLEAVE]
      flavor: 'Обладая достаточной мощью или мастерством, воины могут проводить атаки клинками или когтями по врагам длинными смертоносными дугами.',
      fullText: `Эта способность всегда имеет вид **[CLEAVE X]**. Каждый раз, когда вы выбираете **[gloss:attack-dice:кубики атаки]** для оружия **[CLEAVE]**, если вы выбрали только одну цель для всех атак этого оружия, добавьте **X** дополнительных **кубиков атаки** за каждые **пять** моделей, которые находились в целевом юните на шаге «Выбор целей» (округление в меньшую сторону).`,
      example: 'Если оружие **[CLEAVE 1]** с характеристикой **A** (количество атак) 3 нацелено на один юнит, содержащий 16 моделей, вы добавите три дополнительных **кубика атаки** для этого оружия (всего шесть **кубиков атаки** для этого оружия).',
    },
    {
      // 24.07 [CLOSE-QUARTERS]
      flavor: 'Оружие, предназначенное для боя в тесных условиях, может эффективно применяться даже в гуще рукопашной схватки.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[CLOSE-QUARTERS]**, могут стрелять, используя **[gloss:close-quarters:стрельбу в тесном бою]** (10.06).

При использовании другого **типа стрельбы** для каждой модели в этом юните (за исключением моделей MONSTER/VEHICLE) вы можете выбрать **только одно** из следующего для совершения атак:
▪ Одно или несколько его видов оружия **[CLOSE-QUARTERS]**.
▪ Одно или несколько его других видов дистанционного оружия.`,
    },
    {
      // 24.08 Deadly Demise
      flavor: 'От детонирующих боеприпасов до едких внутренностей или бешеных предсмертных конвульсий — некоторые цели смертоносны даже после поражения.',
      fullText: `Эта способность всегда имеет вид **Deadly Demise X**. Каждый раз, когда модель с этой способностью **[gloss:destroyed:уничтожена]**, после того как юниты, находящиеся внутри неё (если таковые имеются), совершили свои **[gloss:emergency-disembark-move:аварийные манёвры высадки]**, бросьте один D6. На 6 эта модель получает **Deadly Demise**; каждый юнит в пределах 6" от этой модели получает количество **[gloss:mortal-wound:смертельных ран]**, обозначенное **X** (если это случайное число, бросьте отдельно для каждого юнита в пределах 6").`,
    },
    {
      // 24.09 Deep Strike
      flavor: 'Существует множество способов доставить войска на поле боя, включая туннели, телепортационные устройства и другие эзотерические средства транспортировки.',
      fullText: `Каждый раз, когда этот юнит совершает **[gloss:ingress-move:манёвр вторжением]** (20.04), если каждая модель в этом юните имеет эту способность, он может быть размещён в любом месте поля боя, находящемся на расстоянии более 8" по горизонтали от всех вражеских юнитов, даже если это находится в **зоне развёртывания** (deployment zone) вашего противника.`,
    },
    {
      // 24.10 [DEVASTATING WOUNDS]
      flavor: 'Самое мощное оружие наносит удар с такой силой, что оно делает броню насмешкой и может расcкать нескольких врагов.',
      fullText: `Каждый раз, когда атака, совершённая оружием **[DEVASTATING WOUNDS]**, приводит к **[gloss:critical-wound:критическому ранению]**, последовательность атаки для этой атаки завершается, и целевой юнит получает количество **[gloss:mortal-wound:смертельных ран]**, равное характеристике **[gloss:damage-roll:D]** (урон) этого оружия. Они наносятся после отыгрыша любого обычного урона, нанесённого этими атаками.

**Смертельные раны** (mortal wounds), нанесённые оружием **[DEVASTATING WOUNDS]**, могут повредить не более одной модели за каждое **критическое ранение** (critical wound); любые оставшиеся **смертельные раны**, нанесённые этой атакой, теряются.`,
      example: 'Атака, совершённая оружием **[DEVASTATING WOUNDS]** с характеристикой **D** (урон) 3, приводит к **критическому ранению** (critical wound) против отряда Интерцессоров (Intercessor Squad), поэтому наносит **3 смертельные раны** (mortal wounds). Первые 2 **смертельные раны** достаточно для уничтожения 1 модели Интерцессора, поэтому оставшаяся **смертельная рана** теряется.',
    },
    {
      // 24.11 [EXTRA ATTACKS]
      flavor: 'Некоторые воины отправляются в бой верхом на верных скакунах, которые бодают и топчут ближайших врагов. Другие владеют боевым оружием, которое наносит каскад дополнительных ударов.',
      fullText: `Каждый раз, когда юнит, содержащий одну или несколько моделей с оружием **[EXTRA ATTACKS]**, сражается, эти модели совершают атаки этим оружием в дополнение к любым другим. На шаге «**[gloss:select-weapons:Выбор оружия]**» (04.01) для каждой из этих моделей вы должны выбрать:
▪ Все виды оружия **[EXTRA ATTACKS]** этой модели.
▪ Одно другое оружие ближнего боя этой модели, если возможно.`,
      children: [
        {
          title: 'Только оружие [EXTRA ATTACKS]',
          body: `Если у юнита есть оружие [EXTRA ATTACKS], ему не нужно выбирать оружие без способности [EXTRA ATTACKS], чтобы совершать атаки этим оружием [EXTRA ATTACKS].`,
        },
      ],
    },
    {
      // 24.12 Feel No Pain
      flavor: 'Самые стойкие воины отказываются падать ниц, даже от ран, которые по всем правам должны быть смертельными.',
      fullText: `Эта способность всегда имеет вид **Feel No Pain X+**. Каждый раз, когда модель с этой способностью должна потерять рану, бросьте один D6: на **X+** эта рана не теряется.`,
    },
    {
      // 24.13 Fights First
      flavor: 'Обладающие молниеносными реакциями воины могут нанести удар прежде, чем противник успеет среагировать.',
      fullText: `Пока каждая модель в юните обладает этой способностью, этот юнит является юнитом «**[gloss:fights-first:Атакует первым]**».

См. шаг «Отыграть схватки с «Первым ударом»» в фазе ближнего боя (12.04).`,
    },
    {
      // 24.14 Firing Deck
      flavor: 'Некоторые транспорты имеют специальные платформы или стрелковые порты, из которых находящиеся внутри пассажиры могут вести сокрушительный шквальный огонь.',
      fullText: `Эта способность всегда имеет вид **Firing Deck X**. В вашу фазу стрельбы, каждый раз, когда этот TRANSPORT **[gloss:selected-to-shoot:выбран для стрельбы]**, если один или несколько юнитов находятся внутри него, отыграйте следующую последовательность действий:
1. Выберите до **X** моделей, находящихся внутри этого TRANSPORT (за исключением моделей, чьи юниты уже **были выбраны для стрельбы** в этой фазе).
2. Для каждой выбранной модели выберите **одно** из её видов дистанционного оружия (за исключением оружия **[ONE SHOT]**).
3. Пока этот TRANSPORT не отыграет все свои атаки, он имеет всё это выбранное оружие **в дополнение** к своему другому оружию.
4. До конца хода юниты, находящиеся внутри этого TRANSPORT, **[gloss:not-eligible-to-shoot:не могут стрелять]**.`,
    },
    {
      // 24.15 [HAZARDOUS]
      flavor: 'Оружие, работающее от нестабильных и опасных источников энергии, представляет значительную угрозу для владельца и тех, кто стоит рядом с ним.',
      fullText: `Каждый раз, когда юнит **[gloss:selected-to-shoot:выбран для стрельбы]** или **[gloss:selected-to-fight:выбран для ближнего боя]**, после того как этот юнит отыграл все свои атаки, совершите количество **[gloss:hazard-roll:бросков на опасность]** (06.03) для этого юнита, равное количеству оружия **[HAZARDOUS]**, которое вы выбрали на шаге «Выбор оружия» (Select Weapons step).`,
    },
    {
      // 24.16 [HEAVY]
      flavor: 'Тяжёлое оружие — одно из самых крупных орудий на поле боя, но для стрельбы на полную мощность требует упора.',
      fullText: `В вашу фазу стрельбы каждый раз, когда атака совершается оружием **[HEAVY]**, добавьте 1 к **[gloss:hit-roll:броску на попадание]**, если для атакующего юнита выполняются все следующие условия:
▪ Этот юнит не **[gloss:unengaged:связан ближним боем]**.
▪ Этот юнит не был размещён на поле боя в этот ход.
▪ Ни одна модель в этом юните не перемещалась более чем на 3" в этот ход.`,
    },
    {
      // 24.17 Hover
      flavor: 'Некоторые летательные аппараты могут использовать векторные двигатели или антигравитационные технологии, что позволяет им скользить над полем боя, лучше выслеживать добычу или высаживать находящиеся внутри войска.',
      fullText: `Каждый раз, когда этот юнит **[gloss:take-to-the-skies:взлетает]** (21.03), не вычитайте 2" из **[gloss:maximum-distance:максимальной дистанции]**.`,
    },
    {
      // 24.18 [IGNORES COVER]
      flavor: 'Некоторые виды оружия предназначены для выкуривания вражеских формирований из укреплённых позиций.',
      fullText: `Каждый раз, когда атака совершается оружием **[IGNORES COVER]**, цель не может получить **[gloss:benefit-of-cover:преимущество укрытия]** от этой атаки (13.08), включая преимущество укрытия от правил, которые дают модели или юниту **преимущество укрытия** (например, **Скрытность** (Stealth)).`,
    },
    {
      // 24.19 [INDIRECT FIRE]
      flavor: 'Оружие непрямой наводки запускает боеприпасы через или вокруг промежуточных препятствий — нигде не укрыться от его ярости.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[INDIRECT FIRE]**, могут стрелять, используя **[gloss:indirect-shooting:стрельбу непрямой наводкой]** (10.07).`,
    },
    {
      // 24.20 Infiltrators
      flavor: 'Многие армии используют разведывательные подразделения, которые могут находиться в укрытии, дожидаясь подходящего момента для удара.',
      fullText: `Во время **развёртывания** (deployment), если каждая модель в юните имеет эту способность, он может быть размещён в любом месте поля боя, находящемся на расстоянии более 8" по горизонтали от **зоны развёртывания** вашего противника и всех вражеских юнитов.`,
    },
    {
      // 24.21 [LANCE]
      flavor: 'Используя инерцию несущегося на полной скорости воина, копьевое оружие смертоносно в нападении.',
      fullText: `Каждый раз, когда атака совершается оружием **[LANCE]**, если атакующий юнит совершил **[gloss:charge-move:манёвр нападения]** в этот ход, добавьте 1 к **[gloss:wound-roll:броску на ранение]**.`,
    },
    {
      // 24.22 Leader
      flavor: 'Могучие герои сражаются на переднем крае битвы.',
      fullText: `До битвы, на шаге «Формирование армий» (Muster Armies step), для каждого отряда **лидера** и **поддержки** в вашей армии вы можете выбрать один дружественный отряд **телохранителей**, который он может **возглавлять**. Этот отряд будет **возглавлять** этот отряд **телохранителей** в битве и создаст с ним **объединённый** отряд.

Если не указано иное, каждый отряд **телохранителей** может иметь только один присоединённый отряд **лидера** и один отряд **поддержки**.

См. «Составные юниты» (Attached Units) (19).`,
    },
    {
      // 24.23 [LETHAL HITS]
      flavor: 'Многие смертоносные виды оружия могут наносить фатальные раны любому врагу, независимо от его живучести.',
      fullText: `Каждый раз, когда атака, совершённая оружием **[LETHAL HITS]**, приводит к **[gloss:critical-hit:критическому попаданию]**, вы можете выбрать, чтобы эта атака автоматически ранила цель.`,
      note: 'Примечание дизайнера: Выбор **автоматического ранения** цели означает, что для этой атаки не совершается **бросок на ранение** (wound roll). Вы можете отказаться от этого, так как это означает, что эта атака не может привести к **критическому ранению** (critical wound) и, следовательно, не может активировать другие способности, такие как **[DEVASTATING WOUNDS]**.',
    },
    {
      // 24.24 Lone Operative
      flavor: 'Ассасинов и других тайных агентов трудно обнаружить в хаосе битвы.',
      fullText: `Если только он не является частью **составного юнита** (attached unit), этот юнит **не видим** (not visible) для вражеских моделей, если только они не находятся в пределах 12" от этого юнита, и он не может быть выбран целью для оружия **[INDIRECT FIRE]**, если только атакующая модель не находится в пределах 12" от этого юнита.

Если эта способность имеет вид **Lone Operative X"**, то, если только он не является частью составного юнита, этот юнит не видим для вражеских моделей, если только они не находятся в пределах **X"** от этого юнита, и он не может быть выбран целью для оружия **[INDIRECT FIRE]**, если только атакующая модель не находится в пределах **X"** от этого юнита.`,
      children: [
        {
          title: 'Объединённые отряды и Lone Operative (Attached units and Lone Operative)',
          body: `Если все модели в **объединённом** (attached) отряде имеют **Lone Operative**, этот отряд получает преимущество от **Lone Operative**.

Если у юнита есть **Lone Operative**, но модели в этом юните имеют разные значения дальности для **Lone Operative**, ко всему юниту применяется наивысшее значение среди моделей этого юнита на поле боя.

Если **объединённый** отряд **ниже начальной численности** (below starting strength) содержит только модели с **Lone Operative**, **Lone Operative** снова становится активной.

**Пример:** CHARACTER с **Lone Operative** присоединён к отряду **телохранителей** (bodyguard), у которого есть **Lone Operative 15"**. Поэтому для всего отряда используется **Lone Operative 15"**.

**Пример:** CHARACTER с **Lone Operative** присоединён к отряду **телохранителей**, у которого нет **Lone Operative**. Как только все модели **телохранителей** **уничтожены** (destroyed) и остаётся только CHARACTER, **Lone Operative** этого CHARACTER снова становится активной.`,
        },
      ],
    },
    {
      // 24.25 [MELTA]
      flavor: 'Мельта-оружие — это мощные тепловые лучи, чья ярость усиливается на близкой дистанции.',
      fullText: `Эта способность всегда имеет вид **[MELTA X]**. Каждый раз, когда модель совершает атаку оружием **[MELTA]**, если целевой юнит находился в **пределах половины дальности** этого оружия на шаге «Выбор целей», то до тех пор, пока атаки атакующего юнита не будут отыграны, **добавьте X** к характеристике **[gloss:damage-roll:D]** (урон) этого оружия.`,
      example: 'Модель нацеливается на юнит, который находится в пределах половины дальности оружия **[MELTA 2]** с характеристикой **D** (урон) D6. При отыгрыше этих атак это оружие имеет характеристику **D**, равную D6+2.',
    },
    {
      // 24.26 [ONE SHOT]
      flavor: 'Некоторые виды оружия настолько редки, или настолько сложны и медленно перезаряжаются, что могут быть использованы только один раз.',
      fullText: `Каждое оружие с этой способностью может быть выбрано для совершения атак только **один раз за игру** (once per battle).

Если **[gloss:destroyed:уничтоженная]** модель возвращена в юнит, всё её оружие **[ONE SHOT]**, которое уже было выбрано для совершения атак в ходе битвы, **не может** быть выбрано для совершения атак снова.

Если новый юнит добавлен в армию, всё оружие **[ONE SHOT]** в этом юните может быть выбрано для совершения атак **один раз за игру** (once per battle).`,
      children: [
        {
          title: 'Несколько видов оружия [ONE SHOT] (Multiple [ONE SHOT] Weapons)',
          body: `Если модель оснащена более чем одним одинаковым оружием со способностью [ONE SHOT] (например, 2 ракеты hunter-killer), эта модель может выстрелить каждым из этих видов оружия один раз за битву.`,
        },
      ],
    },
    {
      // 24.27 [PISTOL]
      flavor: 'Пистолетами можно пользоваться даже в упор.',
      fullText: `**[PISTOL]** и **[CLOSE-QUARTERS]** идентичны для всех целей правил. См. **[CLOSE-QUARTERS]**.`,
      note: '**[PISTOL]** — это уже существующая способность, которая будет заменена на **[CLOSE-QUARTERS]** по мере развития этой редакции Warhammer 40,000. Функционально они одинаковы, но последний является более подходящим термином для оружия, которое функционирует таким образом.',
    },
    {
      // 24.28 [PRECISION]
      flavor: 'Точные атаки могут поразить высокоприоритетные цели в толпе.',
      fullText: `При отыгрыше атак, совершаемых одним или несколькими видами оружия **[PRECISION]**, в начале шага «**[gloss:allocation-order:Порядок назначения]**» (05.03), если целевой юнит содержит одну или несколько моделей **[gloss:character:CHARACTER]**, **[gloss:visible:видимых]** для одной или нескольких атакующих моделей, активный игрок может выбрать одну **группу назначения** (allocation group), которая содержит одну из этих **видимых моделей CHARACTER**. Если он это делает, то, пока эти атаки не будут отыграны, или пока эта группа CHARACTER не будет **уничтожена** (destroyed) (в зависимости от того, что наступит раньше), эта группа CHARACTER является **текущей группой назначения** (current allocation group).`,
      children: [
        {
          title: 'Точность и разрушительные раны (Precision and Devastating Wounds)',
          body: `**[gloss:mortal-wound:Смертельные раны]**, нанесённые атакой **[PRECISION]** со способностью **[DEVASTATING WOUNDS]**, сначала применяются к группе CHARACTER, выбранной для этих атак **[PRECISION]** (если эта группа ещё не **[gloss:destroyed:уничтожена]**).`,
        },
      ],
    },
    {
      // 24.29 [PSYCHIC]
      flavor: 'Некоторые виды оружия могут направлять психическую мощь носителя, чтобы усилить его удары.',
      fullText: `Каждый раз, когда атака совершается оружием **[PSYCHIC]**, вы можете игнорировать **любые** или все модификаторы характеристик **[gloss:ballistic-skill:BS]** или **[gloss:weapon-skill:WS]** этой атаки, а также любые или все модификаторы **[gloss:hit-roll:броска на попадание]**. Атаки, совершённые оружием **[PSYCHIC]**, известны как **[gloss:psychic:психические атаки]** (это может быть важно для срабатывания других правил).`,
    },
    {
      // 24.30 [RAPID FIRE]
      flavor: 'Оружие с быстрой стрельбой способно вести точные выстрелы на большой дальности или контролируемые очереди по ближайшим целям.',
      fullText: `Эта способность всегда имеет вид **[RAPID FIRE X]**. Каждый раз, когда вы выбираете **[gloss:attack-dice:кубики атаки]** для оружия **[RAPID FIRE]**, добавьте **X** дополнительных **кубиков атаки**, если целевой юнит находился в **пределах половины дальности** этого оружия на шаге «Выбор целей».`,
      example: 'Если оружие **[RAPID FIRE 1]** с характеристикой **A** (количество атак) 1 нацелено на юнит, который находится в пределах половины дальности, вы добавите один дополнительный **кубик атаки** для этого оружия (всего два **кубика атаки** для этого оружия).',
    },
    {
      // 24.31 Scouts
      flavor: 'Разведчики формируют авангард многих армий. Незамеченные врагом, они действуют впереди основных сил.',
      fullText: `Эта способность всегда имеет вид **скаут X"** (Scouts X"). На шаге «**Отыгрыш предбоевых способностей**» (Resolve Pre-battle Abilities step), если **каждая модель** в юните имеет эту способность, вы можете сделать **одно** из следующего:
▪ Если этот юнит находится в **[gloss:strategic-reserves:стратегическом резерве]**, вы можете разместить этот юнит в любом месте, полностью находящемся в пределах вашей **зоны развёртывания** (deployment zone).
▪ Если этот юнит полностью находится в пределах вашей зоны развёртывания, он может совершить **разведывательный манёвр** (scout move) (см. ниже).
▪ Если этот юнит находится внутри **DEDICATED TRANSPORT**, который полностью находится в пределах вашей зоны развёртывания, и если каждая модель, находящаяся внутри этого DEDICATED TRANSPORT, имеет способность **скаут** (Scouts), то этот DEDICATED TRANSPORT может совершить **разведывательный манёвр** (scout move).`,
    },
    {
      // 24.32 Scout Move
      flavor: 'Рейнджеры и передовые всадники наступают с отработанной точностью до начала битвы.',
      fullText: `◈ МАКСИМАЛЬНАЯ ДИСТАНЦИЯ | X" из «скаут X"».
◈ ДОПУСТИМО, ЕСЛИ | Это шаг «Отыгрыш предбоевых способностей» (Resolve Pre-battle Abilities step), и ваш юнит полностью находится в пределах вашей зоны развёртывания.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Перемещение» (Moving) (03).
◈ ПОСЛЕ МАНЁВРА | Ваш юнит должен находиться на расстоянии более 8" по горизонтали от всех вражеских юнитов.`,
    },
    {
      // 24.33 Stealth
      flavor: 'Самые скрытные воины могут уклоняться от внимания и пуль своих врагов.',
      fullText: `Если каждая модель в юните имеет эту способность, каждый раз, когда дистанционная атака направлена на этот юнит, этот юнит получает **[gloss:benefit-of-cover:преимущество укрытия]** от этой атаки (13.08).`,
    },
    {
      // 24.34 Support
      flavor: 'Специализированные бойцы могут быть приписаны к фронтовым отрядам для повышения их боевой эффективности.',
      fullText: `До битвы, на шаге «Формирование армий» (Muster Armies step), для каждого отряда **лидера** и **поддержки** в вашей армии вы можете выбрать один дружественный отряд **телохранителей**, который он может **возглавлять**. Этот отряд будет **возглавлять** этот отряд **телохранителей** в битве и создаст с ним **объединённый** отряд.

Если не указано иное, каждый отряд **телохранителей** может иметь только один присоединённый отряд **лидера** и один отряд **поддержки**.

См. «Составные юниты» (Attached Units) (19).`,
    },
    {
      // 24.35 Super-heavy Walker
      flavor: 'Чудовищные создания и гигантские машины войны возвышаются над полем боя, словно обретшие форму боги, шагая поверх сражающихся и сокрушая почти любые преграды на своём пути.',
      fullText: `Каждый раз, когда юнит с этой способностью совершает **обычный манёвр** (normal move), **[gloss:advance:ускорение]** или **[gloss:fall-back-move:отступление]**:
▪ Модели в этом юните могут перемещаться сквозь модели (включая модели MONSTER/VEHICLE, но исключая TITANIC модели) и могут перемещаться горизонтально сквозь части **элементов укрытий** (terrain features) высотой 4" и менее.
▪ Перед манёвром этого юнита вы можете выбрать, чтобы все модели в этом юните имели ключевое слово MOBILE до окончания этого манёвра. Если вы делаете это, то когда этот манёвр заканчивается, бросьте один D6: на 1 этот юнит получает **[gloss:battle-shocked:состояние боевого шока]**.`,
      note: 'Примечание дизайнера: Получение ключевого слова MOBILE на время манёвра позволит моделям в этом юните перемещаться горизонтально сквозь элементы **надёжных укрытий** (dense terrain features) (13.06).',
    },
    {
      // 24.36 [SUSTAINED HITS]
      flavor: 'Некоторые виды оружия обладают сокрушительной скорострельностью или могут наносить сокрушительные грады ударов, разрывая врага на части с безжалостной яростью.',
      fullText: `Эта способность всегда имеет вид **[SUSTAINED HITS X]**. Каждый раз, когда атака, совершённая оружием **[SUSTAINED HITS]**, приводит к **[gloss:critical-hit:критическому попаданию]**, эта атака приводит к дополнительному количеству попаданий по цели, обозначенному **X**.`,
      example: 'Атака, совершённая оружием **[SUSTAINED HITS 2]**, приводит к **критическому попаданию** (critical hit). Следовательно, эта атака попадает в цель три раза (один раз от **критического попадания** и ещё два раза от способности **[SUSTAINED HITS 2]**).',
    },
    {
      // 24.37 [TORRENT]
      flavor: 'Оружие с потоковым поражением выбрасывает облака огня, газа или других смертоносных веществ, от которых мало кто из врагов может надеяться уйти.',
      fullText: `Каждый раз, когда атака совершается оружием **[TORRENT]**, эта атака автоматически попадает в цель.`,
    },
    {
      // 24.38 [TWIN-LINKED]
      flavor: 'Спаренные оружия часто подключаются к одной системе наведения для большей смертоносности.',
      fullText: `Каждый раз, когда атака совершается оружием **[TWIN-LINKED]**, вы можете перебросить **[gloss:wound-roll:бросок на ранение]**.`,
    },
    {
      // 24.39 Damaged
      fullText: `Эта способность всегда имеет вид **Damaged X**. Пока оставшиеся раны модели равны или меньше **X**, эта модель **[gloss:damaged:повреждена]**:
▪ Пока модель **повреждена**, атаки этой модели имеют -1 к **[gloss:hit-roll:броску на попадание]**.`,
    },
    {
      // [BUBBLECHUKKA]
      fullText: `Эта способность уникальна для «баблчукки». Прежде чем выбрать цели для одной или нескольких моделей с оружием **[BUBBLECHUKKA]**, бросьте один D6, чтобы определить, каким профилем эти модели совершают атаки: **1-2** big bubble; **3-4** wobbly bubble; **5-6** dense bubble.`,
    },
  ],
}

export const appendix = {
  en: [
    {
      id: 'app-half-strength',
      title: 'Starting Strength and Half-Strength',
      body: `The number of models a unit contains at the start of the first battle round is its **starting strength**. The **starting strength** of an **attached** unit is the number of models that unit contains at the start of the first battle round.

Some rules refer to units being **below starting strength**, or at — or below — **half-strength**. The meaning of these terms varies depending on a unit's **starting strength**, as shown below.

Units or models whose **W** characteristic or **starting strength** cannot be evenly divided in half cannot be **at half-strength** (but can be **below half-strength**).`,
      table: {
        headers: ['Condition', 'Starting Strength of 1 (tracks wounds)', 'Starting Strength of 2 or more'],
        rows: [
          ['**Below Starting Strength**', 'Model\'s remaining wounds are less than its **W** characteristic.', 'Number of remaining models in the unit is less than its **starting strength**.'],
          ['**At Half-Strength**', 'Model\'s remaining wounds are half of its **W** characteristic.', 'Number of remaining models in the unit is half of its **starting strength**.'],
          ['**Below Half-Strength**', 'Model\'s remaining wounds are less than half of its **W** characteristic.', 'Number of remaining models in the unit is less than half of its **starting strength**.'],
        ],
        stacked: true,
      },
      example: 'A Captain (1 model) is attached to a unit of Intercessors (5 models). This **attached** unit has a **starting strength** of 6. If three Intercessors were **destroyed**, the unit would be **at half-strength**. If four Intercessors were **destroyed**, the unit would be **below half-strength**. If all of the Intercessors were **destroyed**, the remaining Captain would be **below half-strength**, despite having his full [gloss:wounds:wounds] remaining.',
    },
    {
      id: 'app-new-unit',
      title: 'Adding a New Unit to Your Army',
      body: `Some rules add a new unit to your army during a battle. That unit's **starting strength** is determined when it is added to your army, but is otherwise determined in the same way as for other units.`,
    },
    {
      id: 'app-destroyed',
      title: 'Destroyed',
      body: `Throughout a battle, models will suffer damage, lose wounds and be **destroyed**. When every model in a unit has been **destroyed**, that unit is **destroyed**.

When a model is **destroyed**, first resolve any rules that are triggered when it is **destroyed**, then it is removed from the battlefield. If any such rules apply, and if the model was **destroyed** as the result of an attack, those rules are only resolved after the attacking unit's attacks have been resolved and that model is only removed after the attacking unit's attacks have been resolved. Unless otherwise stated, **destroyed** models and units cannot use abilities or be selected or targeted by rules.`,
    },
    {
      id: 'app-different-m',
      title: 'Different Move Characteristics',
      body: `When making a **normal move** or **advance move**, if different models in the moving unit have different **M** characteristics, the **maximum distance** for that move will be different for those models. For example, if a unit makes a **normal move** and all models in that unit have an **M** characteristic of 6" except for one model with an **M** characteristic of 9", that model's **maximum distance** for that move is 9", while the other models' **maximum distance** is 6". While that unit is making that move, all other restrictions must be met.`,
    },
    {
      id: 'app-eligible-unable',
      title: 'Eligible to Fight, But Unable to Fight',
      body: `During the Fight sequence, when the sequence returns to a player to select a unit to fight, if all of that player's units that are **eligible to fight** are more than 5" from all enemy units, that player can instead choose to pass and return the sequence to their opponent to select a unit. If both players pass in succession, or if one player passes when their opponent has no remaining units that are **eligible to fight**, the Fight step ends.`,
      note: 'Occasionally, all of a unit\'s targets will be **destroyed** before they have a chance to fight, with no other targets close enough to **engage** with a **pile-in** move. In such cases, a player can choose to pass and wait to see if another enemy unit ends a **pile-in** move close enough to be attacked later in the phase.',
    },
    {
      id: 'app-mixed-keywords',
      title: 'Mixed Keywords in Units',
      body: `Some units can contain models that have different keywords, either because they are an **attached** unit or as a result of abilities listed on their datasheet and/or items of [gloss:wargear:wargear] they have. While this is the case, such a unit has all the keywords of all of its models, but its models do not gain the keywords of other models in that unit that they do not already have. Remember that attacks target units, not models.`,
    },
    {
      id: 'app-objective-markers',
      title: 'Objectives Not Within a Terrain Area',
      body: `If the location point of an objective does not coincide with a **terrain area**, you must denote the location of that objective with a flat, circular marker, 40 mm in diameter, centred on that point — this is called an **objective marker**. Models can move through **objective markers** and they can end a move on top of **objective markers**.

A model is within range of an **objective marker** while it is within 3" horizontally and 5" vertically of the **objective marker**. When measuring distances to and from an **objective marker**, measure to and from the closest part of it.`,
    },
    {
      id: 'app-revived',
      title: 'Revived',
      body: `When a rule revives, resurrects or returns models to a unit, the specified number of **destroyed** models are added to the unit. This cannot expand a unit beyond its **starting strength**. Such models are added with all wargear and **enhancements** they started the battle with and, unless otherwise stated, they are returned with their full wounds remaining.

Models returned to a unit on the battlefield must be set up as follows:
▪ In **coherency** with models in that unit that started that phase on the battlefield (i.e. models that were already on the battlefield when that rule was used).
▪ They can be **engaged** with one or more enemy units, but only if those enemy units are already **engaged** with the unit those models are being returned to.

If a **leader** or **support** model in an **attached** unit is **destroyed** and subsequently revived, it is still part of that **attached** unit and must be returned to it if possible.`,
    },
  ],
  ru: [
    {
      id: 'app-half-strength',
      title: 'Начальная численность и половинная численность',
      body: `Количество моделей, которое юнит содержит в начале первого **раунда боя** (battle round), является его **начальной численностью** (starting strength). **Начальная численность** **составного юнита** (attached unit) — это количество моделей, которое этот юнит содержит в начале первого раунда боя.

Некоторые правила ссылаются на юниты, находящиеся **ниже начальной численности** (below starting strength), или **на — или ниже — половинной численности** (at – or below – half-strength). Значение этих терминов варьируется в зависимости от **начальной численности** юнита, как показано ниже.

Юниты или модели, чья характеристика **W** (раны) или **начальная численность** не может быть равномерно разделена пополам, не могут находиться **на половинной численности** (half-strength) (но могут быть **ниже половинной численности**).`,
      table: {
        headers: ['Условие', 'Начальная численность 1 (отслеживает раны)', 'Начальная численность 2 или более'],
        rows: [
          ['**Ниже начальной численности**', 'Оставшиеся раны модели **меньше** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните **меньше** его начальной численности.'],
          ['**На половинной численности**', 'Оставшиеся раны модели составляют **половину** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните составляет **половину** его начальной численности.'],
          ['**Ниже половинной численности**', 'Оставшиеся раны модели составляют **менее половины** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните составляет **менее половины** его начальной численности.'],
        ],
        stacked: true,
      },
      example: 'Капитан (1 модель) приписан к отряду Интерцессоров (5 моделей). Этот **составной юнит** (attached unit) имеет **начальную численность** (starting strength) 6. Если три Интерцессора **уничтожены**, юнит находится **на половинной численности** (half-strength). Если четыре Интерцессора **уничтожены**, юнит находится **ниже половинной численности** (below half-strength). Если все Интерцессоры **уничтожены**, оставшийся Капитан находится **ниже половинной численности**, несмотря на то, что у него осталось полное количество [gloss:wounds:ран].',
    },
    {
      id: 'app-new-unit',
      title: 'Добавление нового юнита в вашу армию',
      body: `Некоторые правила добавляют новый юнит в вашу армию во время битвы. **Начальная численность** (starting strength) этого юнита определяется в момент его добавления в вашу армию, но в остальном определяется так же, как и для других юнитов.`,
    },
    {
      id: 'app-destroyed',
      title: 'Уничтожение',
      body: `На протяжении всей битвы модели получают повреждения, теряют раны и **уничтожаются** (destroyed). Когда каждая модель в юните **уничтожена**, этот юнит **уничтожен**.

Когда модель **уничтожена** (destroyed), сначала отыграйте любые правила, которые срабатывают, когда она **уничтожена**, затем она убирается с поля боя. Если такие правила применяются, и если модель была **уничтожена** в результате атаки, если не указано иное, эти правила отыгрываются и модель убирается только после того, как атаки атакующего юнита отыграны. Если не указано иное, **уничтоженные** модели и юниты не могут использовать способности или быть выбраны или стать целью для правил.`,
    },
    {
      id: 'app-different-m',
      title: 'Различные характеристики движения',
      body: `При совершении **обычного манёвра** (normal move) или **продвижения** (advance move), если разные модели в перемещающемся юните имеют разные характеристики **M** (манёвр), **максимальная дистанция** для этого манёвра будет разной для этих моделей. Например, если юнит совершает **обычный манёвр** и все модели в этом юните имеют характеристику **M** 6", кроме одной модели с характеристикой **M** 9", то **максимальная дистанция** для этой модели составит 9", тогда как для остальных моделей **максимальная дистанция** составит 6". Пока этот юнит совершает этот манёвр, должны соблюдаться все остальные ограничения.`,
    },
    {
      id: 'app-eligible-unable',
      title: 'Имеет право участвовать в бою, но не способен сражаться',
      body: `Во время последовательности ближнего боя (Fight sequence), когда очередь доходит до игрока, чтобы выбрать юнит для боя, если все юниты этого игрока, которые **могут участвовать в ближнем бою** (eligible to fight), находятся на расстоянии более 5" от всех вражеских юнитов, тот игрок может вместо этого передать ход и вернуть последовательность своему противнику для выбора юнита. Если оба игрока передают ход подряд, или если один игрок передаёт ход, когда у его противника не осталось юнитов, **которые могут участвовать в ближнем бою** (eligible to fight), шаг «Ближний бой» (Fight step) заканчивается.`,
      note: 'Примечание дизайнера: Иногда все цели юнита **уничтожаются** (destroyed) до того, как он получил шанс сразиться, и при этом нет других целей поблизости, достаточно близких, чтобы с ними связаться **сближением** (pile-in move). В таких случаях игрок может передать ход и ждать, чтобы увидеть, достаточно ли близко другой вражеский юнит закончит **сближение** (pile-in move), чтобы атаковать позже в этой фазе.',
    },
    {
      id: 'app-mixed-keywords',
      title: 'Смешанные ключевые слова в юнитах',
      body: `Некоторые юниты могут содержать модели с разными **[gloss:keywords:ключевыми словами]**, либо потому что они являются **составным юнитом** (attached unit), либо в результате разделений, указанных в их **листе данных** (datasheet) и/или [gloss:wargear:предметов снаряжения], которые они имеют. В этом случае такой юнит имеет все ключевые слова всех своих моделей, но его модели не получают ключевые слова других моделей в этом юните, которых у них ещё нет. Помните, что атаки нацелены на **юниты**, а не на **модели**.`,
    },
    {
      id: 'app-objective-markers',
      title: 'Цели, не находящиеся внутри элемента укрытия',
      body: `Если точка расположения **цели** (objective) не совпадает с **элементом укрытия** (terrain area), вы должны обозначить местоположение этой цели плоским круглым маркером диаметром 40 мм, отцентрованным на этой точке — это называется **маркером цели** (objective marker). Модели могут проходить сквозь **маркеры цели** и могут завершить манёвр на маркерах цели.

Модель находится в пределах **маркера цели**, пока она находится в пределах 3" по горизонтали и 5" по вертикали от этого маркера. При измерении расстояний до и от **маркера цели** измеряйте расстояние до него или от него по ближайшей его части.`,
    },
    {
      id: 'app-revived',
      title: 'Восстановленный',
      body: `Когда правило **возрождает** (revives), **воскрешает** (resurrects) или **возвращает** (returns) модели в юнит, указанное количество **уничтоженных** (destroyed) моделей добавляется в юнит. Это не может расширить юнит сверх его **начальной численности** (starting strength). Такие модели добавляются со всем **снаряжением** (wargear) и **усилениями** (enhancements), которые они имели в начале битвы, и, если не указано иное, возвращаются с полным количеством **[gloss:wounds:ран]**.

Модели, возвращённые в юнит на поле боя, должны быть размещены следующим образом:
▪ В **боевом построении** (coherency) с моделями в этом юните, которые начали эту фазу на поле боя (т.е. моделями, которые уже были на поле боя, когда это правило было использовано).
▪ Они могут быть **связаны ближним боем** (engaged) с одним или несколькими вражескими юнитами, но только если эти вражеские юниты уже **связаны ближним боем** с юнитом, в который эти модели возвращаются.

Если модель **лидера** (leader) или **поддержки** (support) в **составном юните** (attached unit) **уничтожена** (destroyed) и впоследствии **возрождена** (revived), она всё ещё является частью этого составного юнита и должна быть возвращена в него, если это возможно.`,
    },
  ],
}

export const errata = {
  en: [
    {
      id: 'errata-13-09',
      header: '13.09 – Change to First Bullet Point',
      body: `Changed to: 'That model has the INFANTRY/BEASTS/SWARM keyword and is within a **terrain area** that contains one or more **light/dense terrain features**.'`,
    },
    {
      id: 'errata-17-03',
      header: '17.03 – Change to First Sentence',
      body: `Added to the end of the first sentence: '(excluding attacks made with [BLAST] weapons)'.`,
    },
    {
      id: 'errata-18-05',
      header: '18.05 – Change to Emergency Disembark Move',
      body: `Changed the WHILE MOVING row to: Set up each model in your unit:
▪ Wholly within the **set-up distance** of that TRANSPORT, and as close as possible to that TRANSPORT.
▪ **Or:** If the above is not possible while remaining **unengaged**, set up that model wholly within the **set-up distance** of that TRANSPORT, as close as possible to that TRANSPORT, and **engaged**.
▪ Each model that still cannot be set up is **destroyed**.`,
    },
    {
      id: 'errata-tank-shock',
      header: 'Tank Shock Stratagem',
      body: `The Tank Shock stratagem is the same as the **Crushing Impact** stratagem.`,
    },
    {
      id: 'errata-grenades',
      header: 'Grenades Stratagem',
      body: `The Grenades stratagem is the same as the **Explosives** stratagem.`,
    },
  ],
  ru: [
    {
      id: 'errata-13-09',
      header: '13.09 — правка первого пункта',
      body: `Изменено на: «Эта модель имеет ключевое слово INFANTRY/BEASTS/SWARM и находится в пределах **[gloss:terrain-area:области укрытия]**, которая содержит один или несколько лёгких/надёжных элементов укрытий».`,
    },
    {
      id: 'errata-17-03',
      header: '17.03 — правка первого предложения',
      body: `Добавлено в конец первого предложения: «(кроме атак оружием [BLAST])».`,
    },
    {
      id: 'errata-18-05',
      header: '18.05 — правка манёвра экстренной высадки',
      body: `Изменена строка «ВО ВРЕМЯ ДВИЖЕНИЯ» на: Расставьте каждую модель вашего отряда:
▪ Целиком в пределах **расстояния расстановки** от этого TRANSPORT и как можно ближе к нему.
▪ **Или:** Если это невозможно, оставаясь **не связанным боем**, расставьте эту модель целиком в пределах **расстояния расстановки** от этого TRANSPORT, как можно ближе к нему, и **связанной боем**.
▪ Каждая модель, которую всё ещё невозможно расставить, **уничтожается**.`,
    },
    {
      id: 'errata-tank-shock',
      header: 'Стратагема Tank Shock',
      body: `Стратагема Tank Shock — то же самое, что и стратагема **Crushing Impact**.`,
    },
    {
      id: 'errata-grenades',
      header: 'Стратагема Grenades',
      body: `Стратагема Grenades — то же самое, что и стратагема **Explosives**.`,
    },
  ],
}

export const faqs = {
  en: [
    {
      q: 'Is a unit with no ranged weapons **eligible to shoot** in its controlling player\'s Shooting phase?',
      a: 'Yes. Even though the unit cannot make ranged attacks, it is still **eligible to shoot**, which can affect its eligibility for other rules, e.g. starting an **action**.',
    },
    {
      q: 'When my unit shoots using **close-quarters shooting**, can MONSTER/VEHICLE models in my unit target an engaged unit with **[BLAST]** weapons?',
      a: 'No.',
    },
    {
      q: 'When my unit shoots at an engaged MONSTER/VEHICLE unit, can models in my unit target that unit with **[BLAST]** weapons?',
      a: 'No.',
    },
    {
      q: 'Can a unit that is eligible to make an **overrun fight** be selected to do so if it is not also **eligible to fight**?',
      a: 'No. Sometimes a unit can become **engaged** after the start of the Fight step, but then become **unengaged** later in that step. If this happens, and it is no longer **eligible to fight**, it cannot make an **overrun fight**.',
    },
    {
      q: 'Can a unit embark within a TRANSPORT after making a **scout move**?',
      a: 'No. Scout moves happen in the Resolve Pre-battle Abilities step, which comes after the Declare Battle Formations step and before the Begin the Battle step.',
    },
    {
      q: 'My rule says that "this units ranged attacks have +1 **A**", do each of my attacks get an extra attack dice?',
      a: 'No, it increases the **A** characteristics of the unit\'s ranged weapons by 1. (02.04)',
    },
    {
      q: 'The Munitorium Field Manual shows my unit can attach to different units than are on its datasheet, which do I use?',
      a: 'Use the Munitorium Field Manual.',
    },
    {
      q: 'I have a rule that triggers when a **mortal wound** is allocated to a model, when does this happen?',
      a: 'When you select a model in the **Select Model step** of **[gloss:mortal-wound:Mortal Wounds]** (06.02).',
    },
    {
      q: 'Does my model or unit become **engaged** while moving through an enemy unit\'s **engagement range** during a move?',
      a: 'No.',
    },
    {
      q: 'If my unit has weapons that are identical in characteristics, but some of those weapons have [PRECISION], and those weapons targeted a unit without the CHARACTER keyword, do I roll all of those weapons together?',
      a: 'Yes — the [PRECISION] ability is not an applicable ability for those attacks, as there is no CHARACTER in the target unit for the ability to trigger.',
    },
    {
      q: 'If a rule says a unit can embark into a TRANSPORT in a turn that unit disembarked, does this ignore the core rules restriction on embarking in a turn that unit made a set up move (see 18.02)?',
      a: 'Yes.',
    },
    {
      q: 'When a rule instructs you to perform a charge outside of the Charge phase, do I resolve steps 2 and 3 of the Charge step (11.02)?',
      a: 'Yes.',
    },
    {
      q: 'If a rule modifies how far a unit or model can move during a **pile-in move** or **consolidation move**, does it also change the distance of the target units?',
      a: 'No.',
    },
    {
      q: 'How many mortal wounds do you take from hazard rolls for a unit that combines VEHICLE/MONSTER and INFANTRY models?',
      a: 'The roll is made all at once, and it inflicts 1 mortal wound per failed roll.',
    },
    {
      q: 'If a rule allows my unit to pile-in or consolidate an extra distance in the Fight phase, when can I use that rule?',
      a: 'For **pile-in moves**, during the Pile-in step (12.02); for **consolidation moves**, during the Consolidate step (12.07).',
    },
    {
      q: 'Can I select a unit to shoot or fight if it doesn\'t have melee or ranged weapons?',
      a: 'Yes — it just makes no attacks, and then the **fight type** or **shoot type** is resolved.',
    },
    {
      q: 'When checking **coherency** for my unit, can my unit be in multiple groups?',
      a: 'No, it must be in a single contiguous group, as per **Units and Models** (01.02) and What Is Coherency.',
    },
    {
      q: 'When a move says that a model or unit must move in a way if it is able, can that requirement force the unit to end their move not in coherency?',
      a: 'No — when a model or unit is making a move it must follow requirements while ending that move in **coherency**.',
    },
    {
      q: 'If the [ANTI] ability on my unit is [ANTI-non-MONSTER/VEHICLE], does that mean the [ANTI] rule triggers when targeting units that do not have the MONSTER or VEHICLE keyword?',
      a: 'Yes, ANTI-non-(any keyword) triggers on any unit that does not have the specified keyword.',
    },
    {
      q: 'If a unit becomes **battle-shocked** after **starting an action**, does it stop performing that **action**?',
      a: 'Yes.',
    },
    {
      q: 'Does the Aerialists ability let a unit embark within a TRANSPORT even though it disembarked from a TRANSPORT this turn?',
      a: 'Yes, as the unit embarking is not making a **normal move**, **advance move** or **fall-back move** as part of this embarkation.',
    },
    {
      q: 'I failed **hazard rolls** from [HAZARDOUS] weapons, do those **mortal wounds** have to be allocated to the models with the [HAZARDOUS] weapons?',
      a: 'No, you allocate the **mortal wounds** to the unit as per **[gloss:mortal-wound:Mortal Wounds]** (06.02). (This represents Bob the guardsmen picking up his fallen squad mates plasma gun or that the twisting power of James the Chaos Sorcerer pulling his followers into the warp.)',
    },
    {
      q: 'Can a model be within range of a weapon if it is not **visible**?',
      a: 'Yes.',
    },
    {
      q: 'When declaring the allocation order of groups in my unit, I have more than one non-CHARACTER group that contains a model with a missing wound — how must I select the order?',
      a: 'Those groups can be selected in an order of your choosing, but must come before any non-CHARACTER groups that do not contain a model with a missing wound.',
    },
    {
      q: 'What does the X" in **Lone Operative X"** mean?',
      a: 'The X is a placeholder for a number of inches that the ability might use, e.g. **Lone Operative 15"**, where the X has been replaced with 15".',
    },
    {
      q: 'If a rule says a unit auto passes Desperate Escape tests, does that mean it would auto pass the **hazard rolls** from a desperate escape move?',
      a: 'Yes.',
    },
    {
      q: 'If a unit has a rule that allows it to **start an action** when it is **battle-shocked**, can it also continue doing that action if it becomes **battle-shocked** after starting an **action**?',
      a: 'Yes.',
    },
    {
      q: 'When selecting a target unit can the enemy model that is **visible** to my model and the enemy model that is in range of my model\'s weapon be different enemy models in the same unit?',
      a: 'Yes.',
    },
    {
      q: 'I have a unit being attacked with weapons that will modify some of their **save rolls** to be worse than 6 — should I make those **save rolls**?',
      a: 'Yes — because other models in your unit may have better **Sv** values, enough **save rolls** could be allocated to those models that the rest of the results are not greater than the **Sv** of the other models in your unit.',
    },
    {
      q: 'If a rule says my unit must make a **hazard roll**, does every model in the unit make a **hazard roll**?',
      a: 'No, the unit would make 1 single **hazard roll**.',
    },
    {
      q: 'Do models **destroyed** when a unit is out of **coherency** count for mission objectives?',
      a: 'Yes.',
    },
    {
      q: 'If my unit has taken control of an objective at the end of my Movement phase, and it has an ability that secures an objective it controls, can it secure that objective?',
      a: 'Yes.',
    },
    {
      q: 'If my unit has the **Deadly Demise** ability and an ability that allows it to **Fight on Death**, how do I resolve this?',
      a: '**Fight on Death** rules are resolved before **Deadly Demise** abilities — your unit\'s **Deadly Demise** resolves after it has fought/at the end of the phase, once the relevant models have been removed from the battlefield.',
    },
    {
      q: 'If I have a rule that says my unit can move up to 6" when it makes a **pile-in move** or **consolidation move**, does this also change the **maximum distance** of those moves to 6"?',
      a: 'Yes.',
    },
    {
      q: 'If a unit makes any disembark move in a turn (i.e. Disembark move, Emergency Disembark move, etc.), has it disembarked that turn?',
      a: 'Yes.',
    },
    {
      q: 'After using an ability that increases the CP cost of a **stratagem**, must my opponent continue to use the selected **stratagem** at the increased cost if they have the necessary CP available?',
      a: 'Yes.',
    },
    {
      q: 'If a **stratagem** contains a section that carries an additional CP cost (such as the Into the Fray option of Heroic Intervention), is that additional cost considered to be a modifier?',
      a: 'No — a **stratagem** that costs 1CP and is making use of an optional +1CP section has an original cost of 2CP.',
    },
    {
      q: 'After using an ability that increases the CP cost of a **stratagem**, if my opponent does not have the necessary CP available for the selected **stratagem**, what happens?',
      a: 'No CP are spent and that **stratagem**\'s effects are not resolved (but that **stratagem** still counts as having been used this phase).',
    },
    {
      q: 'Do rules that affect a keyword include multi-word keywords that contain that keyword? For example, would rules that affect Commissar units affect a unit that has the Commissar Graves keyword?',
      a: 'No.',
    },
    {
      q: 'While making a **move type** other than a **normal/advance move**, can my MONSTER/VEHICLE unit move through friendly units?',
      a: 'Yes.',
    },
    {
      q: 'Are models that are within the boundary of a **terrain area**, but not on the ground floor of it (e.g. overhanging parts of FRAME VEHICLES, or models on **terrain features** that are within that **terrain area**), within that **terrain area**?',
      a: 'Yes.',
    },
    {
      q: 'Is being within range of a **terrain objective** the same as being within range of an **objective marker**?',
      a: 'Yes.',
    },
    {
      q: 'When my unit shoots at another unit, how does it work if some models in the target unit are fully **visible** to some of my models, while others are within a **terrain area**/not fully visible?',
      a: 'For each attacking model in your unit, determine whether the target unit has the **benefit of cover**, as described in Terrain and Visibility. In this scenario, the target unit will likely have the **benefit of cover** against some of the attacking models, but not all — so when you get to the Resolve Attacks step of the Attack Sequence, you collect dice for attacks made by models against which the target unit has the **benefit of cover** separately from the dice for attacks made by models against which it does not.',
    },
    {
      q: 'In what step during the attack sequence do I roll for **Feel No Pain**?',
      a: 'In the Resolve Damage step of the Inflict Damage step (05.04).',
    },
    {
      q: 'Can I group or allocate a wound to a **destroyed** model?',
      a: 'No.',
    },
    {
      q: 'Can an Epic Hero unit form an **attached** unit with a unit that has an **enhancement**?',
      a: 'Yes.',
    },
    {
      q: 'Can an **attached** unit be given an Upgrade?',
      a: 'Yes.',
    },
    {
      q: 'Can a unit have both an Upgrade and an **enhancement**?',
      a: 'No — units are prevented from having two **enhancements**, and Upgrades are **enhancements**.',
    },
    {
      q: 'Are Upgrades **enhancements**?',
      a: 'Yes, Upgrades are a type of **enhancement** (but not all **enhancements** are Upgrades).',
    },
    {
      q: 'Does the limit to the combined points value of my units in **strategic reserves** only apply until the start of the first battle round?',
      a: 'Yes.',
    },
    {
      q: 'If I place units in **strategic reserves** during the battle, can this exceed the 50% points-limit restriction mentioned in Placing Units in Strategic Reserves (20.01)?',
      a: 'Yes — that restriction is applicable before the battle, in the Declare Battle Formations step.',
    },
    {
      q: 'Does vertical movement in a unit that has **taken to the skies** count towards the distance a model has used for the purposes of [HEAVY]?',
      a: 'No.',
    },
  ],
  ru: [
    {
      q: 'Может ли юнит без дистанционного оружия стрелять в фазу стрельбы своего контролирующего игрока?',
      a: 'Да. Даже если юнит не может совершать дистанционные атаки, он всё равно **может стрелять** (eligible to shoot), что может повлиять на его возможность использования других правил, например, начала **действия** (starting an action).',
    },
    {
      q: 'Когда мой юнит стреляет, используя **стрельбу в тесном бою** (close-quarters shooting), могут ли модели MONSTER/VEHICLE в моём юните выбрать целью **связанный ближним боем** (engaged) юнит с оружием **[BLAST]**?',
      a: 'Нет.',
    },
    {
      q: 'Когда мой юнит стреляет по **связанному** юниту MONSTER/VEHICLE, могут ли модели в моём юните выбрать этот юнит целью для оружия **[BLAST]**?',
      a: 'Нет.',
    },
    {
      q: 'Может ли юнит, который может совершить **оверран** (overrun fight), быть выбран для этого, если он **не может участвовать в ближнем бою** (eligible to fight)?',
      a: 'Нет. Иногда юнит может **связаться ближним боем** (engaged) после начала шага «Ближний бой» (Fight step), но затем стать **несвязанным** (unengaged) позже в этом шаге. Если это происходит, и он больше **не может участвовать в ближнем бою** (eligible to fight), он не может совершить **оверран** (overrun fight).',
    },
    {
      q: 'Может ли юнит сесть внутри TRANSPORT после совершения **разведывательного манёвра** (scout move)?',
      a: 'Нет. **Разведывательные манёвры** (scout moves) происходят на шаге «Отыгрыш предбоевых способностей» (Resolve Pre-battle Abilities step), который следует после шага «Объявление боевых порядков» (Declare Battle Formations step) и перед шагом «Начало битвы» (Begin the Battle step).',
    },
    {
      q: 'Моё правило гласит, что «дистанционные атаки этого юнита имеют +1 к **A**» — получает ли каждая моя атака дополнительный кубик атаки?',
      a: 'Нет, оно увеличивает характеристику **A** дистанционного оружия юнита на 1. (02.04)',
    },
    {
      q: 'Munitorium Field Manual показывает, что мой юнит может присоединяться к юнитам, отличным от указанных в его листе данных — какой использовать?',
      a: 'Используйте Munitorium Field Manual.',
    },
    {
      q: 'У меня есть правило, срабатывающее, когда **[gloss:mortal-wound:смертельная рана]** распределяется на модель — когда это происходит?',
      a: 'Когда вы выбираете модель на шаге «Выбор модели» (Select Model step) раздела **[gloss:mortal-wound:Смертельные раны]** (06.02).',
    },
    {
      q: 'Становится ли моя модель или юнит **связанным**, проходя через **радиус связывания** вражеского юнита во время манёвра?',
      a: 'Нет.',
    },
    {
      q: 'Если у моего юнита есть оружие с одинаковыми характеристиками, но часть этого оружия имеет [PRECISION], и это оружие нацелено на юнит без ключевого слова CHARACTER, бросаю ли я всё это оружие вместе?',
      a: 'Да — способность [PRECISION] неприменима для этих атак, поскольку в целевом юните нет CHARACTER, чтобы её правило сработало.',
    },
    {
      q: 'Если правило говорит, что отряд может погрузиться в TRANSPORT в тот ход, когда он высадился, обходит ли это ограничение основных правил на погрузку в тот ход, когда отряд совершил манёвр расстановки (см. 18.02)?',
      a: 'Да.',
    },
    {
      q: 'Когда правило предписывает совершить нападение вне фазы нападения, отыгрываю ли я шаги 2 и 3 шага «Нападение» (11.02)?',
      a: 'Да.',
    },
    {
      q: 'Если правило изменяет, насколько далеко юнит или модель может двигаться во время **манёвра сближения** или **консолидации**, меняет ли это также дистанцию целевых юнитов?',
      a: 'Нет.',
    },
    {
      q: 'Сколько **[gloss:mortal-wound:смертельных ран]** вы получаете от **[gloss:hazard-roll:проверок опасности]** для юнита, объединяющего модели VEHICLE/MONSTER и INFANTRY?',
      a: 'Бросок делается один раз за весь юнит, и он наносит 1 **[gloss:mortal-wound:смертельную рану]** за каждую провальную проверку.',
    },
    {
      q: 'Если правило позволяет моему юниту сблизиться или консолидироваться на дополнительную дистанцию в фазе боя, когда я могу использовать это правило?',
      a: 'Для **манёвров сближения** — во время шага «Сближение» (12.02); для **консолидаций** — во время шага «Консолидация» (12.07).',
    },
    {
      q: 'Могу ли я выбрать юнит для стрельбы или боя, если у него нет оружия ближнего или дальнего боя?',
      a: 'Да — он просто не совершает атак, а затем **тип боя** или **тип стрельбы** отыгрывается.',
    },
    {
      q: 'При проверке **боевого построения** моего юнита может ли мой юнит находиться в нескольких группах?',
      a: 'Нет, он должен быть в одной непрерывной группе, согласно разделам **Юниты и модели** (01.02) и «Что такое боевое построение».',
    },
    {
      q: 'Когда манёвр требует, чтобы модель или юнит двигались определённым образом, если это возможно, может ли это требование заставить юнит закончить манёвр вне боевого построения?',
      a: 'Нет — совершая манёвр, модель или юнит должны соблюдать требования, заканчивая этот манёвр в **боевом построении**.',
    },
    {
      q: 'Если способность **[ANTI]** моего юнита — **[ANTI-non-MONSTER/VEHICLE]**, значит ли это, что правило **[ANTI]** срабатывает при нацеливании на юниты без ключевого слова MONSTER или VEHICLE?',
      a: 'Да, **ANTI-non-**(любое ключевое слово) срабатывает на любом юните, у которого нет указанного ключевого слова.',
    },
    {
      q: 'Если юнит становится **подверженным боевому шоку** после того, как **начал действие**, прекращает ли он выполнять это **действие**?',
      a: 'Да.',
    },
    {
      q: 'Позволяет ли способность Aerialists юниту погрузиться в TRANSPORT, даже если в этот ход он уже высадился из TRANSPORT?',
      a: 'Да, поскольку погрузка в рамках этой способности не является **обычным манёвром**, **продвижением** или **манёвром отступления**.',
    },
    {
      q: 'Я провалил **проверки опасности** от оружия [HAZARDOUS] — должны ли эти **[gloss:mortal-wound:смертельные раны]** распределяться на модели с оружием [HAZARDOUS]?',
      a: 'Нет, вы распределяете **смертельные раны** на юнит согласно разделу **[gloss:mortal-wound:Смертельные раны]** (06.02). (Это символизирует, как Боб-гвардеец подбирает плазменное ружьё павшего товарища по отряду, или как искажающая сила Джеймса-чародея Хаоса затягивает его последователей в варп.)',
    },
    {
      q: 'Может ли модель находиться в дальности оружия, если она не **видима**?',
      a: 'Да.',
    },
    {
      q: 'При объявлении порядка распределения групп в моём юните у меня несколько не-CHARACTER групп, содержащих модель с недостающей раной — как я должен выбрать порядок?',
      a: 'Эти группы можно выбирать в любом порядке на ваше усмотрение, но они должны идти раньше любых не-CHARACTER групп, не содержащих модель с недостающей раной.',
    },
    {
      q: 'Что означает X" в способности **Lone Operative X"**?',
      a: 'X — заполнитель для числа дюймов, которое может подставляться в эту способность, например **Lone Operative 15"**, где X заменён на 15".',
    },
    {
      q: 'Если правило гласит, что юнит автоматически проходит проверки на **отчаянный побег** (Desperate Escape), означает ли это, что он также автоматически проходит **проверки опасности**, которые требует этот режим?',
      a: 'Да.',
    },
    {
      q: 'Если у юнита есть правило, позволяющее ему **начать действие**, когда он **подвержен боевому шоку**, может ли он также продолжать выполнять это действие, если станет **подверженным боевому шоку** после начала **действия**?',
      a: 'Да.',
    },
    {
      q: 'При выборе целевого юнита могут ли вражеская модель, **[gloss:visible:видимая]** моей модели, и вражеская модель, находящаяся в дальности оружия моей модели, быть разными вражескими моделями в одном и том же юните?',
      a: 'Да.',
    },
    {
      q: 'На мой юнит нападают оружием, которое ухудшит часть его **спас-бросков** хуже 6 — должен ли я делать эти **спас-броски**?',
      a: 'Да — поскольку у других моделей в вашем юните может быть лучшая **Sv**, достаточно **спас-бросков** можно распределить на них так, что остальные результаты не превысят **Sv** других моделей в вашем юните.',
    },
    {
      q: 'Если правило говорит, что мой юнит должен сделать **проверку опасности**, делает ли каждая модель в юните **проверку опасности**?',
      a: 'Нет, юнит сделает 1 одну **проверку опасности**.',
    },
    {
      q: 'Считаются ли модели, **[gloss:destroyed:уничтоженные]** когда юнит находится вне боевого построения, для игровых целей?',
      a: 'Да.',
    },
    {
      q: 'Если мой юнит взял под контроль **цель** в конце моей фазы движения, и у него есть способность, которая **[gloss:secured-objective:закрепляет]** контролируемую цель, может ли он закрепить эту цель?',
      a: 'Да.',
    },
    {
      q: 'Если у моего юнита есть способность **Deadly Demise** и способность **Fight on Death**, в каком порядке их отыгрывать?',
      a: 'Правила **Fight on Death** отыгрываются раньше способности **Deadly Demise** — то есть **Deadly Demise** вашего юнита отыгрывается после того, как он сразился/в конце фазы, когда соответствующие модели уже убраны с поля боя.',
    },
    {
      q: 'Если у меня есть правило, что мой юнит может двигаться до 6" при **манёвре сближения** или **консолидации**, меняет ли это также **максимальную дистанцию** этих манёвров на 6"?',
      a: 'Да.',
    },
    {
      q: 'Если юнит совершает любой манёвр высадки за ход (т.е. манёвр высадки, экстренный манёвр высадки и т.д.), считается ли, что он высадился в этот ход?',
      a: 'Да.',
    },
    {
      q: 'После использования способности, повышающей стоимость **стратагемы** в CP, обязан ли мой противник продолжать использовать выбранную **стратагему** по повышенной цене, если у него достаточно CP?',
      a: 'Да.',
    },
    {
      q: 'Если **стратагема** содержит раздел с дополнительной стоимостью в CP (например, опция Into the Fray у Heroic Intervention), считается ли эта дополнительная стоимость модификатором?',
      a: 'Нет — **стратагема** стоимостью 1CP, использующая опциональный раздел за +1CP, имеет исходную стоимость 2CP.',
    },
    {
      q: 'После использования способности, повышающей стоимость **стратагемы** в CP, что происходит, если у моего противника нет необходимых CP для выбранной **стратагемы**?',
      a: 'CP не тратятся, и эффект этой **стратагемы** не отыгрывается (но она всё равно считается использованной в этой фазе).',
    },
    {
      q: 'Распространяются ли правила, влияющие на ключевое слово, на составные ключевые слова, которые его содержат? Например, повлияет ли правило, затрагивающее ключевое слово Commissar, на юнит с ключевым словом Commissar Graves?',
      a: 'Нет.',
    },
    {
      q: 'Совершая **тип манёвра**, отличный от **обычного манёвра/ускорения**, может ли мой юнит MONSTER/VEHICLE двигаться сквозь дружественные юниты?',
      a: 'Да.',
    },
    {
      q: 'Считаются ли находящимися в пределах **[gloss:terrain-area:области укрытия]** модели, которые находятся в границах этой области, но не на её нижнем уровне (например, нависающие части FRAME VEHICLES или модели на элементах укрытий, которые находятся в пределах этой области)?',
      a: 'Да.',
    },
    {
      q: 'Является ли нахождение в пределах дальности от **маркера цели-укрытия** (terrain objective) тем же самым, что и нахождение в пределах дальности от **маркера цели** (objective marker)?',
      a: 'Да.',
    },
    {
      q: 'Когда мой юнит стреляет по другому юниту — как это работает, если некоторые модели целевого юнита полностью **видимы** для некоторых моих моделей, а другие находятся в **области укрытия**/не полностью видимы?',
      a: 'Для каждой атакующей модели вашего юнита определите, получает ли целевой юнит **[gloss:benefit-of-cover:преимущество укрытия]**, как описано в разделе «Укрытия и видимость». В этом случае целевой юнит, скорее всего, получит **преимущество укрытия** против части атакующих моделей, но не против всех — поэтому на шаге «Отыгрыш атак» Последовательности атаки вы собираете кубики за атаки моделей, против которых целевой юнит получает **преимущество укрытия**, отдельно от кубиков за атаки моделей, против которых он его не получает.',
    },
    {
      q: 'На каком шаге последовательности атаки я делаю бросок за **Feel No Pain**?',
      a: 'На шаге «Отыгрыш урона» шага «Нанесение урона» (05.04).',
    },
    {
      q: 'Могу ли я сгруппировать рану или назначить её **[gloss:destroyed:уничтоженной]** модели?',
      a: 'Нет.',
    },
    {
      q: 'Может ли юнит Epic Hero сформировать **составной юнит** (attached unit) с юнитом, у которого есть **улучшение**?',
      a: 'Да.',
    },
    {
      q: 'Может ли **составной юнит** получить Upgrade?',
      a: 'Да.',
    },
    {
      q: 'Может ли юнит иметь одновременно Upgrade и **улучшение**?',
      a: 'Нет — юнитам запрещено иметь два **улучшения** одновременно, а Upgrade является **улучшением**.',
    },
    {
      q: 'Является ли Upgrade **улучшением**?',
      a: 'Да, Upgrade — это разновидность **улучшения** (но не каждое **улучшение** — это Upgrade).',
    },
    {
      q: 'Действует ли ограничение на суммарную стоимость юнитов в **[gloss:strategic-reserves:стратегическом резерве]** только до начала первого боевого раунда?',
      a: 'Да.',
    },
    {
      q: 'Если я размещаю юниты в **[gloss:strategic-reserves:стратегическом резерве]** во время битвы, может ли это превысить ограничение в 50% очков армии, упомянутое в правиле «Размещение юнитов в стратегическом резерве» (20.01)?',
      a: 'Да — это ограничение действует до начала битвы, на шаге «Объявление боевых построений».',
    },
    {
      q: 'Учитывается ли вертикальное перемещение юнита, который **взлетел** (taken to the skies), в дистанции, пройденной моделью для целей [HEAVY]?',
      a: 'Нет.',
    },
  ],
}
