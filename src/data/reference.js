export const abilityIntro = {
  en: [
    {
      id: 'section-24-01',
      sectionNum: '24.01',
      title: 'Abilities',
      body: `Many units have **core abilities** listed on their datasheets, and **weapon abilities** listed in their weapon profiles.

**Weapon abilities** are presented in square brackets with bold formatting, e.g. **[BLAST]**. Weapons are often described using a particular ability they have, e.g. **[BLAST]** weapons are those with the **[BLAST]** ability.

If a **weapon ability** is followed by one or more keywords, when making attacks with that weapon, that ability only applies if the target unit has one or more of those keywords.`,
      example: 'The **[LETHAL HITS: VEHICLE]** ability only applies to attacks that target a VEHICLE unit. The **[SUSTAINED HITS 1: INFANTRY/BEASTS]** ability only applies to attacks that target an INFANTRY/BEASTS unit.',
    },
    {
      id: 'section-24-02',
      sectionNum: '24.02',
      title: 'Duplicated Abilities',
      body: `Multiple instances of the same **core ability** or **weapon ability** are not cumulative, regardless of any numbers or keywords included in them. In such cases, the controlling player must select which instance will apply at any one time. In the case of duplicated **weapon abilities**, this selection must be made each time that unit makes attacks, in the Select Weapons step.

▪ Multiple instances of **core abilities** that include a number are duplicated even if that number varies. However, in the case of **Scouts**, you must select the lowest number not shared by every model in that unit (e.g. if every model in a unit has both **Scouts 6"** and **Scouts 8"**, you could select **Scouts 8"** as it is shared by every model, but if a unit contains one model with **Scouts 6"** and five with **Scouts 8"**, you must select **Scouts 6"**).
▪ Multiple instances of **weapon abilities** that include a number (e.g. **[SUSTAINED HITS 1]**) are duplicated even if that number varies (e.g. the controlling player would have to select between **[SUSTAINED HITS 1]** and **[SUSTAINED HITS 2]**).
▪ Multiple instances of **weapon abilities** that include a keyword are duplicated even if that keyword varies (e.g. the controlling player would have to select between **[ANTI-VEHICLE 4+]** and **[ANTI-INFANTRY 2+]**).`,
    },
  ],
  ru: [
    {
      id: 'section-24-01',
      sectionNum: '24.01',
      title: 'Способности',
      body: `Многие юниты имеют **базовые способности** (core abilities), указанные в их **листах данных** (datasheets), а также **способности оружия** (weapon abilities), указанные в **профилях оружия** (weapon profiles).

**Способности оружия** представлены в квадратных скобках полужирным шрифтом, например **[BLAST]**. Об оружии часто говорят с указанием конкретной способности, которой оно обладает, например, оружие **[BLAST]** — это оружие со способностью **[BLAST]**.

Если за **способностью оружия** следует одно или несколько **ключевых слов** (keywords), то при совершении атак этим оружием эта способность применяется, только если целевой юнит имеет одно или несколько из этих ключевых слов.`,
      example: 'Способность **[LETHAL HITS: VEHICLE]** применяется только к атакам, целью которых является юнит ТЕХНИКИ (VEHICLE). Способность **[SUSTAINED HITS 1: INFANTRY/BEASTS]** применяется только к атакам, целью которых является юнит ПЕХОТЫ/ЗВЕРЕЙ (INFANTRY/BEASTS).',
    },
    {
      id: 'section-24-02',
      sectionNum: '24.02',
      title: 'Повторяющиеся способности',
      body: `Несколько экземпляров одной и той же **базовой способности** (core ability) или **способности оружия** (weapon ability) не суммируются (are not cumulative), независимо от любых чисел или **ключевых слов** (keywords), включённых в них. В таких случаях **управляющий игрок** (controlling player) должен выбрать, какой экземпляр будет применяться в каждый конкретный момент. В случае повторяющихся способностей оружия этот выбор должен быть сделан каждый раз, когда этот юнит совершает атаки, на шаге «**Выбор оружия**» (Select Weapons step).

▪ Несколько экземпляров **базовых способностей** (core abilities), которые включают число, считаются **повторяющимися** (duplicated), даже если это число различается. Однако в случае способности **Разведка** (Scouts) вы должны выбрать наименьшее число, которое не является общим для каждой модели в этом юните (например, если каждая модель в юните имеет и **Разведка 6"**, и **Разведка 8"**, вы можете выбрать **Разведка 8"**, так как она является общей для всех моделей, но если юнит содержит одну модель с **Разведка 6"** и пять с **Разведка 8"**, вы должны выбрать **Разведка 6"**).
▪ Несколько экземпляров **способностей оружия** (weapon abilities), которые включают число (например, **[SUSTAINED HITS 1]**), считаются повторяющимися, даже если это число различается (например, управляющий игрок должен выбирать между **[SUSTAINED HITS 1]** и **[SUSTAINED HITS 2]**).
▪ Несколько экземпляров способностей оружия, которые включают **ключевое слово** (keyword), считаются повторяющимися, даже если это ключевое слово различается (например, управляющий игрок должен будет выбирать между **[ANTI-VEHICLE 4+]** и **[ANTI-INFANTRY 2+]**).`,
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
      fullText: `This ability always takes the form **[ANTI-X Y+]**. Each time an attack is made with an **[ANTI]** weapon, if the target unit has the keyword denoted by **X**, an unmodified **wound roll** of Y+ is a **critical wound**.`,
      example: 'An attack made with an **[ANTI-VEHICLE 4+]** weapon against a VEHICLE unit will result in a **critical wound** on an unmodified **wound roll** of 4+, while an attack made with an **[ANTI-PSYKER 2+]** weapon against a PSYKER unit will result in a **critical wound** on an unmodified **wound roll** of 2+.',
    },
    {
      num: '24.04',
      name: '[ASSAULT]',
      type: 'weapon',
      flavor: 'Folding stocks, shortened barrels or lightweight construction enable some weapons to be easily fired on the move.',
      fullText: `Units containing one or more models with an **[ASSAULT]** weapon can shoot using **assault shooting** (10.05).`,
    },
    {
      num: '24.05',
      name: '[BLAST]',
      type: 'weapon',
      flavor: 'High-explosive rounds can fell several warriors in a single blast, but firing them too close to comrades is unwise.',
      fullText: `Each time you gather **attack dice** for a **[BLAST]** weapon, add one additional **attack die** for every five models that were in the target unit in the Select Targets step (rounding down).

If this ability takes the form **[BLAST X]**, each time you gather **attack dice** for such a weapon, add **X** additional **attack dice** for every five models that were in the target unit in the Select Targets step (rounding down) instead.`,
      example: 'If a **[BLAST 2]** weapon with an **A** characteristic of 3 targets a unit containing 12 models, you would gather four additional **attack dice** for that weapon (for a total of seven for that weapon).',
    },
    {
      num: '24.06',
      name: '[CLEAVE]',
      type: 'weapon',
      flavor: 'With sufficient might or skill, warriors may sweep blades or talons through their foes in long lethal arcs.',
      fullText: `This ability always takes the form **[CLEAVE X]**. Each time you gather **attack dice** for a **[CLEAVE]** weapon, if you only selected one target for all of that weapon's attacks, add **X** additional **attack dice** for every five models that were in the target unit in the Select Targets step (rounding down).`,
      example: 'If a **[CLEAVE 1]** weapon with an **A** characteristic of 3 targets a unit containing 16 models, you would gather three additional **attack dice** for that weapon (for a total of six for that weapon).',
    },
    {
      num: '24.07',
      name: '[CLOSE-QUARTERS]',
      type: 'weapon',
      flavor: 'Weapons designed for close-quarters fighting can be wielded effectively even in the press of melee combat.',
      fullText: `Units containing one or more models with a **[CLOSE-QUARTERS]** weapon can shoot using **close-quarters shooting** (10.06).

When using another **shooting type**, for each model in that unit (excluding MONSTER/VEHICLE models), you can only select **one** of the following to make attacks with:
▪ One or more of its **[CLOSE-QUARTERS]** weapons.
▪ One or more of its other ranged weapons.`,
    },
    {
      num: '24.08',
      name: 'Deadly Demise',
      type: 'unit',
      flavor: 'From detonating ammo stores to corrosive innards or frenzied death throes, some targets are deadly even in defeat.',
      fullText: `This ability always takes the form **Deadly Demise X**. Each time a model in this unit is **destroyed**, after the units embarked within it (if any) have made their **emergency disembark moves**, roll one D6. On a 6, that model suffers a **deadly demise**; each unit within 6" of that model suffers a number of **mortal wounds** denoted by **X** (if this is a random number, roll separately for each unit within 6").`,
      example: 'An Impulsor with a unit of Intercessors embarked within it is **destroyed** by ranged attacks. First, any unresolved attacks made by the attacking unit are resolved. Then the Intercessors make an **emergency disembark move**. Then the roll is made for the **Deadly Demise** ability, and on a 6, that ability is resolved. Finally, the Impulsor is removed from the battlefield.',
    },
    {
      num: '24.09',
      name: 'Deep Strike',
      type: 'unit',
      flavor: 'There are many ways by which to deploy troops to the field of battle including tunnels, teleportation devices and other esoteric means of transportation.',
      fullText: `Each time this unit makes an **ingress move** (20.04), if every model in this unit has this ability, it can be set up anywhere on the battlefield that is more than 8" horizontally from all enemy units, even if that is within your opponent's deployment zone.`,
    },
    {
      num: '24.10',
      name: '[DEVASTATING WOUNDS]',
      type: 'weapon',
      flavor: 'The most potent weapons strike with such power that they make a mockery of armour and can cleave through several foes.',
      fullText: `Each time an attack made with a **[DEVASTATING WOUNDS]** weapon results in a **critical wound**, the attack sequence for that attack ends and the target unit suffers a number of **mortal wounds** equal to the **D** characteristic of that weapon. These are inflicted after resolving any normal damage inflicted by those attacks.

**Mortal wounds** inflicted by **[DEVASTATING WOUNDS]** weapons can damage a maximum of one model for each **critical wound**; any remaining **mortal wounds** inflicted by that attack are lost.`,
      example: 'An attack made with a **[DEVASTATING WOUNDS]** weapon with a **D** characteristic of 3 results in a **critical wound** against an Intercessor Squad, so inflicts **3 mortal wounds**. The first 2 **mortal wounds** are sufficient to **destroy** 1 Intercessor model, so the remaining **mortal wound** is lost.',
    },
    {
      num: '24.11',
      name: '[EXTRA ATTACKS]',
      type: 'weapon',
      flavor: 'Some warriors ride to battle atop trusty mounts that gore and trample nearby foes. Others wield combat weapons that deliver a frenzy of additional blows.',
      fullText: `Each time a unit containing one or more models with an **[EXTRA ATTACKS]** weapon fights, those models will make attacks with those weapons in addition to any others. In the Select Weapons step (04.01), for each of those models, you must select:
▪ All of that model's **[EXTRA ATTACKS]** weapons.
▪ One of that model's other melee weapons, if possible.`,
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
      fullText: `While every model in a unit has this ability, that unit is a **Fights First** unit.

See the Resolve Fights First Combats step in the Fight phase (12.04).`,
    },
    {
      num: '24.14',
      name: 'Firing Deck',
      type: 'unit',
      flavor: 'Some transports have dedicated platforms or firing ports from which embarked passengers can lay down a withering hail of munitions.',
      fullText: `This ability always takes the form **Firing Deck X**. In your Shooting phase, each time this TRANSPORT is **selected to shoot**, if one or more units are embarked within it, resolve the following sequence:
1. Select up to **X** models embarked within this TRANSPORT (excluding models whose units have already been **selected to shoot** this phase).
2. For each selected model, select one of its ranged weapons (excluding **[ONE SHOT]** weapons).
3. Until this TRANSPORT has resolved all of its attacks, it has all of those selected weapons in addition to its other weapons.
4. Until the end of the turn, units embarked within this TRANSPORT are not **eligible to shoot**.`,
    },
    {
      num: '24.15',
      name: '[HAZARDOUS]',
      type: 'weapon',
      flavor: 'Weapons powered by unstable and dangerous energy sources pose a substantial risk to the wielder and those that stand beside them.',
      fullText: `Each time a unit is **selected to shoot** or **selected to fight**, after that unit has resolved all of its attacks, make a number of **hazard rolls** (06.03) for that unit equal to the number of **[HAZARDOUS]** weapons you selected in the Select Weapons step.`,
    },
    {
      num: '24.16',
      name: '[HEAVY]',
      type: 'weapon',
      flavor: 'Heavy weapons are amongst the biggest guns on the battlefield, but require bracing to fire at full effect.',
      fullText: `In your Shooting phase, each time an attack is made with a **[HEAVY]** weapon, add 1 to the **hit roll** if all of the following apply to the attacking unit:
▪ That unit is **unengaged**.
▪ That unit was not set up on the battlefield this turn.
▪ No model in that unit has moved more than 3" this turn.`,
    },
    {
      num: '24.17',
      name: 'Hover',
      type: 'unit',
      flavor: 'Some airborne vehicles can use vectored thrusters or anti-gravity technology to hover and skim over the battlefield, the better to hunt their prey or deploy embarked troops.',
      fullText: `Each time this unit **takes to the skies** (21.03), do not subtract 2" from the **maximum distance**.`,
    },
    {
      num: '24.18',
      name: '[IGNORES COVER]',
      type: 'weapon',
      flavor: 'Some weapons are designed to route enemy formations out of entrenched positions.',
      fullText: `Each time an attack is made with an **[IGNORES COVER]** weapon, the target cannot have the **benefit of cover** against that attack, including from rules that give a model or unit the **benefit of cover** (e.g. **Stealth**).`,
    },
    {
      num: '24.19',
      name: '[INDIRECT FIRE]',
      type: 'weapon',
      flavor: 'Indirect fire weapons launch munitions over or around intervening obstacles – nowhere is safe from their fury.',
      fullText: `Units containing one or more models with an **[INDIRECT FIRE]** weapon can shoot using **indirect shooting** (10.07).`,
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
      fullText: `Each time an attack is made with a **[LANCE]** weapon, if the attacking model's unit made a **charge move** this turn, add 1 to the **wound roll**.`,
    },
    {
      num: '24.22',
      name: 'Leader',
      type: 'unit',
      flavor: 'Mighty heroes fight at the forefront of battle.',
      fullText: `See Attached Units (19).`,
    },
    {
      num: '24.23',
      name: '[LETHAL HITS]',
      type: 'weapon',
      flavor: 'Many deadly weapons can inflict fatal injuries on any foe, no matter their resilience.',
      fullText: `Each time an attack made with a **[LETHAL HITS]** weapon results in a **critical hit**, you can choose for that attack to automatically wound the target.`,
      note: 'Choosing to automatically wound the target means that no **wound roll** is made for that attack. You may decide against this, as it means that attack cannot result in a **critical wound** and so cannot trigger other abilities such as **[DEVASTATING WOUNDS]**.',
    },
    {
      num: '24.24',
      name: 'Lone Operative',
      type: 'unit',
      flavor: 'Assassins and other covert agents are difficult to pinpoint in the storm of battle.',
      fullText: `Unless part of an **attached** unit, this unit is not **visible** to enemy models unless they are within 12" of this unit, and it cannot be targeted by **[INDIRECT FIRE]** weapons unless the attacking model is within 12" of this unit.

If this ability takes the form **Lone Operative X"**, unless part of an **attached** unit, this unit is not **visible** to enemy models unless they are within **X"** of this unit, and it cannot be targeted by **[INDIRECT FIRE]** weapons unless the attacking model is within **X"** of this unit.`,
    },
    {
      num: '24.25',
      name: '[MELTA]',
      type: 'weapon',
      flavor: 'Melta weapons are powerful heat rays whose fury is magnified at close range.',
      fullText: `This ability always takes the form **[MELTA X]**. Each time a model makes an attack with a **[MELTA]** weapon, if the target unit was within half range of that weapon in the Select Targets step, until the attacking unit's attacks have been resolved, add **X** to that weapon's **D** characteristic.`,
      example: 'A model targets a unit that is within half range of a **[MELTA 2]** weapon with a **D** characteristic of D6. While resolving those attacks, that weapon has a **D** characteristic of D6+2.',
    },
    {
      num: '24.26',
      name: '[ONE SHOT]',
      type: 'weapon',
      flavor: 'Some weapons are so rare, or so complex and slow to reload, that they can only be used once.',
      fullText: `Each weapon with this ability can only be selected to make attacks with once per battle.

If a **destroyed** model is returned to a unit, all of its **[ONE SHOT]** weapons that have already been selected to make attacks with during the battle cannot be selected to make attacks with again.

If a new unit is added to an army, all **[ONE SHOT]** weapons in that unit can be selected to make attacks with once per battle.`,
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
      fullText: `While resolving attacks made with one or more **[PRECISION]** weapons, at the start of the Allocation Order step (05.03), if the target unit contains one or more **CHARACTER** models **visible** to one or more of the attacking models, the active player can select one allocation group that contains one of those **visible CHARACTER** models. If they do, until those attacks are resolved, or until that **CHARACTER** group is **destroyed** (whichever happens first), that **CHARACTER** group is the current allocation group.`,
    },
    {
      num: '24.29',
      name: '[PSYCHIC]',
      type: 'weapon',
      flavor: 'Some weapons can channel the bearer\'s psychic might to empower their blows.',
      fullText: `Each time an attack is made with a **[PSYCHIC]** weapon, you can ignore any or all modifiers to that attack's **BS** or **WS** characteristic and any or all modifiers to the **hit roll**. Attacks made with **[PSYCHIC]** weapons are known as **psychic attacks** (this can be important for the triggering of other rules).`,
    },
    {
      num: '24.30',
      name: '[RAPID FIRE]',
      type: 'weapon',
      flavor: 'Rapid fire weapons are capable of long-ranged precision shots or controlled bursts at nearby targets.',
      fullText: `This ability always takes the form **[RAPID FIRE X]**. Each time you gather **attack dice** for a **[RAPID FIRE]** weapon, add **X** additional **attack dice** if the target unit was within half range of that weapon in the Select Targets step.`,
      example: 'If a **[RAPID FIRE 1]** weapon with an **A** characteristic of 1 targets a unit that is within half range, you would gather one additional **attack die** for that weapon (for a total of two for that weapon).',
    },
    {
      num: '24.31',
      name: 'Scouts',
      type: 'unit',
      flavor: 'Scouts form the vanguard of many armies. Unnoticed by the enemy, they range ahead of the main force.',
      fullText: `This ability always takes the form **Scouts X"**. In the Resolve Pre-battle Abilities step, if every model in a unit has this ability, you can do **one** of the following:
▪ If that unit is in **strategic reserves**, you can set up that unit anywhere that is wholly within your deployment zone.
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
      fullText: `If every model in a unit has this ability, each time a ranged attack targets that unit, that unit has the **benefit of cover** against that attack (13.08).`,
    },
    {
      num: '24.34',
      name: 'Support',
      type: 'unit',
      flavor: 'Specialist combatants may be assigned to front-line squads to bolster their fighting effectiveness.',
      fullText: `See Attached Units (19).`,
    },
    {
      num: '24.35',
      name: 'Super-heavy Walker',
      type: 'unit',
      flavor: 'Monstrous creatures and gigantic engines of war loom over the battlefield like gods given form, striding through almost any obstacle that bars their passage.',
      fullText: `Each time a unit with this ability makes a **normal**, **advance** or **fall-back move**:
▪ Models in that unit can move through models (including MONSTER/VEHICLE models, but excluding TITANIC models) and can move horizontally through sections of **terrain features** that are 4" or less in height.
▪ Before moving that unit, you can select for all models in that unit to have the MOBILE keyword until that move ends. If you do, when that move ends, roll one D6: on a 1, that unit is **battle-shocked**.`,
      note: 'Gaining the MOBILE keyword for the duration of a move will enable models in that unit to move horizontally through **dense terrain features** (13.06).',
    },
    {
      num: '24.36',
      name: '[SUSTAINED HITS]',
      type: 'weapon',
      flavor: 'Some weapons possess a punishing rate of fire, or can land devastating flurries of blows, tearing the foe apart with relentless ferocity.',
      fullText: `This ability always takes the form **[SUSTAINED HITS X]**. Each time an attack made with a **[SUSTAINED HITS]** weapon results in a **critical hit**, that attack results in a number of additional hits on the target as denoted by **X**.`,
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
      fullText: `Each time an attack is made with a **[TWIN-LINKED]** weapon, you can re-roll the **wound roll**.`,
    },
  ],
  ru: [
    {
      // 24.03 [ANTI]
      flavor: 'Некоторые виды оружия являются настоящим бичом для определённых врагов.',
      fullText: `Эта способность всегда имеет вид **[ANTI-X Y+]**. Каждый раз, когда совершается атака оружием **[ANTI]**, если целевой юнит имеет **ключевое слово** (keyword), обозначенное **X**, **немодифицированный** (unmodified) **бросок ранения** Y+ считается **критическим ранением** (critical wound).`,
      example: 'Атака, совершённая оружием **[ANTI-VEHICLE 4+]** против юнита ТЕХНИКИ (VEHICLE), приведёт к **критическому ранению** (critical wound) при **немодифицированном** броске ранения 4+. В то время как атака, совершённая оружием **[ANTI-PSYKER 2+]** против юнита ПСАЙКЕРА (PSYKER), приведёт к **критическому ранению** при немодифицированном броске ранения 2+.',
    },
    {
      // 24.04 [ASSAULT]
      flavor: 'Складные приклады, укороченные стволы или облегчённая конструкция позволяют некоторому оружию легко стрелять на ходу.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[ASSAULT]**, могут стрелять, используя **штурмовую стрельбу** (assault shooting) (10.05).`,
    },
    {
      // 24.05 [BLAST]
      flavor: 'Фугасные снаряды могут поразить нескольких воинов одним взрывом, но стрелять ими слишком близко к товарищам неразумно.',
      fullText: `Каждый раз, когда вы выбираете **кубики атаки** (attack dice) для оружия **[BLAST]**, добавьте один дополнительный **кубик атаки** за каждые **пять** моделей, которые находились в целевом юните на шаге «**Выбор целей**» (Select Targets step) (округляя в меньшую сторону).

Если эта способность имеет вид **[BLAST X]**, то каждый раз, когда вы выбираете **кубики атаки** для такого оружия, вместо этого добавьте **X** дополнительных **кубиков атаки** за каждые пять моделей, которые находились в целевом юните на шаге «Выбор целей» (округление в меньшую сторону).`,
      example: 'Если оружие **[BLAST 2]** с характеристикой **A** (количество атак) 3 нацелено на юнит, содержащий 12 моделей, вы добавите четыре дополнительных **кубика атаки** для этого оружия (всего семь **кубиков атаки** для этого оружия).',
    },
    {
      // 24.06 [CLEAVE]
      flavor: 'Обладая достаточной мощью или мастерством, воины могут проводить атаки клинками или когтями по врагам длинными смертоносными дугами.',
      fullText: `Эта способность всегда имеет вид **[CLEAVE X]**. Каждый раз, когда вы выбираете **кубики атаки** (attack dice) для оружия **[CLEAVE]**, если вы выбрали только одну цель для всех атак этого оружия, добавьте **X** дополнительных **кубиков атаки** за каждые **пять** моделей, которые находились в целевом юните на шаге «Выбор целей» (округление в меньшую сторону).`,
      example: 'Если оружие **[CLEAVE 1]** с характеристикой **A** (количество атак) 3 нацелено на один юнит, содержащий 16 моделей, вы добавите три дополнительных **кубика атаки** для этого оружия (всего шесть **кубиков атаки** для этого оружия).',
    },
    {
      // 24.07 [CLOSE-QUARTERS]
      flavor: 'Оружие, предназначенное для боя в тесных условиях, может эффективно применяться даже в гуще рукопашной схватки.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[CLOSE-QUARTERS]**, могут стрелять, используя **стрельбу в тесном бою** (close-quarters shooting) (10.06).

При использовании другого **типа стрельбы** для каждой модели в этом юните (за исключением моделей МОНСТРОВ/ТЕХНИКИ) вы можете выбрать **только одно** из следующего для совершения атак:
▪ Одно или несколько его видов оружия **[CLOSE-QUARTERS]**.
▪ Одно или несколько его других видов дистанционного оружия.`,
    },
    {
      // 24.08 Deadly Demise
      flavor: 'От детонирующих боеприпасов до едких внутренностей или бешеных предсмертных конвульсий — некоторые цели смертоносны даже после поражения.',
      fullText: `Эта способность всегда имеет вид **Смертоносная гибель X** (Deadly Demise X). Каждый раз, когда модель в этом юните **уничтожена**, после того как юниты, находящиеся внутри неё (если таковые имеются), совершили свои **аварийные перемещения высадки** (emergency disembark moves), бросьте один D6. На 6 эта модель получает **смертоносную гибель** (deadly demise); каждый юнит в пределах 6" от этой модели получает количество **неотвратимых ран** (mortal wounds), обозначенное **X** (если это случайное число, бросьте отдельно для каждого юнита в пределах 6").`,
      example: 'Импульсор (Impulsor) с отрядом Интерцессоров (Intercessors) внутри него уничтожен дистанционными атаками. Сначала выполняются любые незавершённые атаки, совершённые атакующим юнитом. Затем Интерцессоры совершают **аварийное перемещение высадки** (emergency disembark move). Затем совершается бросок для способности **Смертоносная гибель** (Deadly Demise), и на 6 эта способность разрешается. Наконец, Импульсор убирается с поля боя.',
    },
    {
      // 24.09 Deep Strike
      flavor: 'Существует множество способов доставить войска на поле боя, включая туннели, телепортационные устройства и другие эзотерические средства транспортировки.',
      fullText: `Каждый раз, когда этот юнит совершает **перемещение вторжением** (ingress move) (20.04), если каждая модель в этом юните имеет эту способность, он может быть размещён в любом месте поля боя, находящемся на расстоянии более 8" по горизонтали от всех вражеских юнитов, даже если это находится в **зоне развёртывания** (deployment zone) вашего противника.`,
    },
    {
      // 24.10 [DEVASTATING WOUNDS]
      flavor: 'Самое мощное оружие наносит удар с такой силой, что оно делает броню насмешкой и может расcкать нескольких врагов.',
      fullText: `Каждый раз, когда атака, совершённая оружием **[DEVASTATING WOUNDS]**, приводит к **критическому ранению** (critical wound), последовательность атаки для этой атаки завершается, и целевой юнит получает количество **неотвратимых ран** (mortal wounds), равное характеристике **D** (урон) этого оружия. Они наносятся после распределения любого обычного урона, нанесённого этими атаками.

**Неотвратимые раны** (mortal wounds), нанесённые оружием **[DEVASTATING WOUNDS]**, могут повредить не более одной модели за каждое **критическое ранение** (critical wound); любые оставшиеся **неотвратимые раны**, нанесённые этой атакой, теряются.`,
      example: 'Атака, совершённая оружием **[DEVASTATING WOUNDS]** с характеристикой **D** (урон) 3, приводит к **критическому ранению** (critical wound) против отряда Интерцессоров (Intercessor Squad), поэтому наносит **3 неотвратимые раны** (mortal wounds). Первые 2 **неотвратимые раны** достаточно для уничтожения 1 модели Интерцессора, поэтому оставшаяся **неотвратимая рана** теряется.',
    },
    {
      // 24.11 [EXTRA ATTACKS]
      flavor: 'Некоторые воины отправляются в бой верхом на верных скакунах, которые бодают и топчут ближайших врагов. Другие владеют боевым оружием, которое наносит каскад дополнительных ударов.',
      fullText: `Каждый раз, когда юнит, содержащий одну или несколько моделей с оружием **[EXTRA ATTACKS]**, сражается, эти модели совершают атаки этим оружием в дополнение к любым другим. На шаге «**Выбор оружия**» (Select Weapons step) (04.01) для каждой из этих моделей вы должны выбрать:
▪ Все виды оружия **[EXTRA ATTACKS]** этой модели.
▪ Одно другое оружие ближнего боя этой модели, если возможно.`,
    },
    {
      // 24.12 Feel No Pain
      flavor: 'Самые стойкие воины отказываются падать ниц, даже от ран, которые по всем правам должны быть смертельными.',
      fullText: `Эта способность всегда имеет вид **Не чувствовать боли X+** (Feel No Pain X+). Каждый раз, когда модель с этой способностью должна потерять рану, бросьте один D6: на **X+** эта рана не теряется.`,
    },
    {
      // 24.13 Fights First
      flavor: 'Обладающие молниеносными реакциями воины могут нанести удар прежде, чем противник успеет среагировать.',
      fullText: `Пока каждая модель в юните обладает этой способностью, этот юнит является юнитом «**Атакует первым**» (Fights First).

См. шаг «Выполнение боёв с «Атакует первым»» в фазе ближнего боя (12.04).`,
    },
    {
      // 24.14 Firing Deck
      flavor: 'Некоторые транспорты имеют специальные платформы или стрелковые порты, из которых находящиеся внутри пассажиры могут вести сокрушительный шквальный огонь.',
      fullText: `Эта способность всегда имеет вид **Стрелковая палуба X** (Firing Deck X). В вашу фазу стрельбы, каждый раз, когда этот ТРАНСПОРТ **выбран для стрельбы** (selected to shoot), если один или несколько юнитов находятся внутри него, выполните следующую последовательность действий:
1. Выберите до **X** моделей, находящихся внутри этого ТРАНСПОРТА (за исключением моделей, чьи юниты уже **были выбраны для стрельбы** в этой фазе).
2. Для каждой выбранной модели выберите **одно** из её видов дистанционного оружия (за исключением оружия **[ONE SHOT]**).
3. Пока этот ТРАНСПОРТ не выполнит все свои атаки, он имеет всё это выбранное оружие **в дополнение** к своему другому оружию.
4. До конца хода юниты, находящиеся внутри этого ТРАНСПОРТА, **не могут стрелять** (not eligible to shoot).`,
    },
    {
      // 24.15 [HAZARDOUS]
      flavor: 'Оружие, работающее от нестабильных и опасных источников энергии, представляет значительную угрозу для владельца и тех, кто стоит рядом с ним.',
      fullText: `Каждый раз, когда юнит **выбран для стрельбы** (selected to shoot) или **выбран для ближнего боя** (selected to fight), после того как этот юнит завершил все свои атаки, совершите количество **бросков на опасность** (hazard rolls) (06.03) для этого юнита, равное количеству оружия **[HAZARDOUS]**, которое вы выбрали на шаге «Выбор оружия» (Select Weapons step).`,
    },
    {
      // 24.16 [HEAVY]
      flavor: 'Тяжёлое оружие — одно из самых крупных орудий на поле боя, но для стрельбы на полную мощность требует упора.',
      fullText: `В вашу фазу стрельбы каждый раз, когда атака совершается оружием **[HEAVY]**, добавьте 1 к **броску на попадание** (hit roll), если для атакующего юнита выполняются все следующие условия:
▪ Этот юнит не **связан ближним боем** (unengaged).
▪ Этот юнит не был размещён на поле боя в этот ход.
▪ Ни одна модель в этом юните не перемещалась более чем на 3" в этот ход.`,
    },
    {
      // 24.17 Hover
      flavor: 'Некоторые летательные аппараты могут использовать векторные двигатели или антигравитационные технологии, что позволяет им скользить над полем боя, лучше выслеживать добычу или высаживать находящиеся внутри войска.',
      fullText: `Каждый раз, когда этот юнит **взлетает** (takes to the skies) (21.03), не вычитайте 2" из **максимальной дистанции** (maximum distance).`,
    },
    {
      // 24.18 [IGNORES COVER]
      flavor: 'Некоторые виды оружия предназначены для выкуривания вражеских формирований из укреплённых позиций.',
      fullText: `Каждый раз, когда атака совершается оружием **[IGNORES COVER]**, цель не может получить **преимущество укрытия** (benefit of cover) от этой атаки (13.08), включая преимущество укрытия от правил, которые дают модели или юниту **преимущество укрытия** (например, **Скрытность** (Stealth)).`,
    },
    {
      // 24.19 [INDIRECT FIRE]
      flavor: 'Оружие непрямой наводки запускает боеприпасы через или вокруг промежуточных препятствий — нигде не укрыться от его ярости.',
      fullText: `Юниты, содержащие одну или несколько моделей с оружием **[INDIRECT FIRE]**, могут стрелять, используя **стрельбу непрямой наводкой** (indirect shooting) (10.07).`,
    },
    {
      // 24.20 Infiltrators
      flavor: 'Многие армии используют разведывательные подразделения, которые могут находиться в укрытии, дожидаясь подходящего момента для удара.',
      fullText: `Во время **развёртывания** (deployment), если каждая модель в юните имеет эту способность, он может быть размещён в любом месте поля боя, находящемся на расстоянии более 8" по горизонтали от **зоны развёртывания** вашего противника и всех вражеских юнитов.`,
    },
    {
      // 24.21 [LANCE]
      flavor: 'Используя инерцию несущегося на полной скорости воина, копьевое оружие смертоносно в нападении.',
      fullText: `Каждый раз, когда атака совершается оружием **[LANCE]**, если атакующий юнит совершил **перемещение нападением** (charge move) в этот ход, добавьте 1 к **броску на ранение** (wound roll).`,
    },
    {
      // 24.22 Leader
      flavor: 'Могучие герои сражаются на переднем крае битвы.',
      fullText: `См. «Составные юниты» (Attached Units) (19).`,
    },
    {
      // 24.23 [LETHAL HITS]
      flavor: 'Многие смертоносные виды оружия могут наносить фатальные раны любому врагу, независимо от его живучести.',
      fullText: `Каждый раз, когда атака, совершённая оружием **[LETHAL HITS]**, приводит к **критическому попаданию** (critical hit), вы можете выбрать, чтобы эта атака автоматически ранила цель.`,
      note: 'Примечание дизайнера: Выбор **автоматического ранения** цели означает, что для этой атаки не совершается **бросок на ранение** (wound roll). Вы можете отказаться от этого, так как это означает, что эта атака не может привести к **критическому ранению** (critical wound) и, следовательно, не может активировать другие способности, такие как **[DEVASTATING WOUNDS]**.',
    },
    {
      // 24.24 Lone Operative
      flavor: 'Ассасинов и других тайных агентов трудно обнаружить в хаосе битвы.',
      fullText: `Если только он не является частью **составного юнита** (attached unit), этот юнит **не видим** (not visible) для вражеских моделей, если только они не находятся в пределах 12" от этого юнита, и он не может быть выбран целью для оружия **[INDIRECT FIRE]**, если только атакующая модель не находится в пределах 12" от этого юнита.

Если эта способность имеет вид **Lone Operative X"**, то, если только он не является частью составного юнита, этот юнит не видим для вражеских моделей, если только они не находятся в пределах **X"** от этого юнита, и он не может быть выбран целью для оружия **[INDIRECT FIRE]**, если только атакующая модель не находится в пределах **X"** от этого юнита.`,
    },
    {
      // 24.25 [MELTA]
      flavor: 'Мельта-оружие — это мощные тепловые лучи, чья ярость усиливается на близкой дистанции.',
      fullText: `Эта способность всегда имеет вид **[MELTA X]**. Каждый раз, когда модель совершает атаку оружием **[MELTA]**, если целевой юнит находился в **пределах половины дальности** этого оружия на шаге «Выбор целей», то до тех пор, пока атаки атакующего юнита не будут выполнены, **добавьте X** к характеристике **D** (урон) этого оружия.`,
      example: 'Модель нацеливается на юнит, который находится в пределах половины дальности оружия **[MELTA 2]** с характеристикой **D** (урон) D6. При выполнении этих атак это оружие имеет характеристику **D**, равную D6+2.',
    },
    {
      // 24.26 [ONE SHOT]
      flavor: 'Некоторые виды оружия настолько редки, или настолько сложны и медленно перезаряжаются, что могут быть использованы только один раз.',
      fullText: `Каждое оружие с этой способностью может быть выбрано для совершения атак только **один раз за игру** (once per battle).

Если **уничтоженная** (destroyed) модель возвращена в юнит, всё её оружие **[ONE SHOT]**, которое уже было выбрано для совершения атак в ходе битвы, **не может** быть выбрано для совершения атак снова.

Если новый юнит добавлен в армию, всё оружие **[ONE SHOT]** в этом юните может быть выбрано для совершения атак **один раз за игру** (once per battle).`,
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
      fullText: `При выполнении атак, совершаемых одним или несколькими видами оружия **[PRECISION]**, в начале шага «**Порядок назначения**» (Allocation Order step) (05.03), если целевой юнит содержит одну или несколько моделей **ПЕРСОНАЖА** (CHARACTER), **видимых** (visible) для одной или нескольких атакующих моделей, активный игрок может выбрать одну **группу назначения** (allocation group), которая содержит одну из этих **видимых моделей ПЕРСОНАЖА**. Если он это делает, то, пока эти атаки не будут завершены, или пока эта группа ПЕРСОНАЖА не будет **уничтожена** (destroyed) (в зависимости от того, что наступит раньше), эта группа ПЕРСОНАЖА является **текущей группой назначения** (current allocation group).`,
    },
    {
      // 24.29 [PSYCHIC]
      flavor: 'Некоторые виды оружия могут направлять психическую мощь носителя, чтобы усилить его удары.',
      fullText: `Каждый раз, когда атака совершается оружием **[PSYCHIC]**, вы можете игнорировать **любые** или все модификаторы характеристик **BS** или **WS** этой атаки, а также любые или все модификаторы **броска на попадание** (hit roll). Атаки, совершённые оружием **[PSYCHIC]**, известны как **психические атаки** (psychic attacks) (это может быть важно для срабатывания других правил).`,
    },
    {
      // 24.30 [RAPID FIRE]
      flavor: 'Оружие с быстрой стрельбой способно вести точные выстрелы на большой дальности или контролируемые очереди по ближайшим целям.',
      fullText: `Эта способность всегда имеет вид **[RAPID FIRE X]**. Каждый раз, когда вы выбираете **кубики атаки** (attack dice) для оружия **[RAPID FIRE]**, добавьте **X** дополнительных **кубиков атаки**, если целевой юнит находился в **пределах половины дальности** этого оружия на шаге «Выбор целей».`,
      example: 'Если оружие **[RAPID FIRE 1]** с характеристикой **A** (количество атак) 1 нацелено на юнит, который находится в пределах половины дальности, вы добавите один дополнительный **кубик атаки** для этого оружия (всего два **кубика атаки** для этого оружия).',
    },
    {
      // 24.31 Scouts
      flavor: 'Разведчики формируют авангард многих армий. Незамеченные врагом, они действуют впереди основных сил.',
      fullText: `Эта способность всегда имеет вид **Разведка X"** (Scouts X"). На шаге «**Выбор предбоевых способностей**» (Resolve Pre-battle Abilities step), если **каждая модель** в юните имеет эту способность, вы можете сделать **одно** из следующего:
▪ Если этот юнит находится в **стратегическом резерве** (strategic reserves), вы можете разместить этот юнит в любом месте, полностью находящемся в пределах вашей **зоны развёртывания** (deployment zone).
▪ Если этот юнит полностью находится в пределах вашей зоны развёртывания, он может совершить **разведывательное перемещение** (scout move) (см. ниже).
▪ Если этот юнит находится внутри **ДЕСАНТНОГО ТРАНСПОРТА** (DEDICATED TRANSPORT), который полностью находится в пределах вашей зоны развёртывания, и если каждая модель, находящаяся внутри этого ДЕСАНТНОГО ТРАНСПОРТА, имеет способность **Разведка** (Scouts), то этот ДЕСАНТНЫЙ ТРАНСПОРТ может совершить **разведывательное перемещение** (scout move).`,
    },
    {
      // 24.32 Scout Move
      flavor: 'Рейнджеры и передовые всадники наступают с отработанной точностью до начала битвы.',
      fullText: `◈ МАКСИМАЛЬНАЯ ДИСТАНЦИЯ | X" из «Разведка X"».
◈ ДОПУСТИМО, ЕСЛИ | Это шаг «Выбор предбоевых способностей» (Resolve Pre-battle Abilities step), и ваш юнит полностью находится в пределах вашей зоны развёртывания.
◈ ЭФФЕКТ | Ваш юнит перемещается, как описано в разделе «Перемещение» (Moving) (03).
◈ ПОСЛЕ ПЕРЕМЕЩЕНИЯ | Ваш юнит должен находиться на расстоянии более 8" по горизонтали от всех вражеских юнитов.`,
    },
    {
      // 24.33 Stealth
      flavor: 'Самые скрытные воины могут уклоняться от внимания и пуль своих врагов.',
      fullText: `Если каждая модель в юните имеет эту способность, каждый раз, когда дистанционная атака направлена на этот юнит, этот юнит получает **преимущество укрытия** (benefit of cover) от этой атаки (13.08).`,
    },
    {
      // 24.34 Support
      flavor: 'Специализированные бойцы могут быть приписаны к фронтовым отрядам для повышения их боевой эффективности.',
      fullText: `См. «Составные юниты» (Attached Units) (19).`,
    },
    {
      // 24.35 Super-heavy Walker
      flavor: 'Чудовищные создания и гигантские машины войны возвышаются над полем боя, словно обретшие форму боги, шагая поверх сражающихся и сокрушая почти любые преграды на своём пути.',
      fullText: `Каждый раз, когда юнит с этой способностью совершает **обычное перемещение** (normal move), **ускорение** (advance) или **отступление** (fall-back move):
▪ Модели в этом юните могут перемещаться сквозь модели (включая модели МОНСТРОВ/ТЕХНИКИ, но исключая ТИТАНИЧЕСКИЕ (TITANIC) модели) и могут перемещаться горизонтально сквозь части **элементов укрытий** (terrain features) высотой 4" и менее.
▪ Перед перемещением этого юнита вы можете выбрать, чтобы все модели в этом юните имели ключевое слово MOBILE до окончания этого перемещения. Если вы делаете это, то когда это перемещение заканчивается, бросьте один D6: на 1 этот юнит получает **состояние боевого шока** (battle-shocked).`,
      note: 'Примечание дизайнера: Получение ключевого слова MOBILE на время перемещения позволит моделям в этом юните перемещаться горизонтально сквозь элементы **надёжных укрытий** (dense terrain features) (13.06).',
    },
    {
      // 24.36 [SUSTAINED HITS]
      flavor: 'Некоторые виды оружия обладают сокрушительной скорострельностью или могут наносить сокрушительные грады ударов, разрывая врага на части с безжалостной яростью.',
      fullText: `Эта способность всегда имеет вид **[SUSTAINED HITS X]**. Каждый раз, когда атака, совершённая оружием **[SUSTAINED HITS]**, приводит к **критическому попаданию** (critical hit), эта атака приводит к дополнительному количеству попаданий по цели, обозначенному **X**.`,
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
      fullText: `Каждый раз, когда атака совершается оружием **[TWIN-LINKED]**, вы можете перебросить **бросок на ранение** (wound roll).`,
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
      },
      example: 'A Captain (1 model) is attached to a unit of Intercessors (5 models). This **attached** unit has a **starting strength** of 6. If three Intercessors were **destroyed**, the unit would be **at half-strength**. If four Intercessors were **destroyed**, the unit would be **below half-strength**. If all of the Intercessors were **destroyed**, the remaining Captain would be **below half-strength**, despite having his full wounds remaining.',
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
      body: `Some units can contain models that have different keywords, either because they are an **attached** unit or as a result of abilities listed on their datasheet and/or items of wargear they have. While this is the case, such a unit has all the keywords of all of its models, but its models do not gain the keywords of other models in that unit that they do not already have. Remember that attacks target units, not models.`,
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
      body: `Количество моделей, которое юнит содержит в начале первого **боевого раунда** (battle round), является его **начальной численностью** (starting strength). **Начальная численность** **составного юнита** (attached unit) — это количество моделей, которое этот юнит содержит в начале первого боевого раунда.

Некоторые правила ссылаются на юниты, находящиеся **ниже начальной численности** (below starting strength), или **на — или ниже — половинной численности** (at – or below – half-strength). Значение этих терминов варьируется в зависимости от **начальной численности** юнита, как показано ниже.

Юниты или модели, чья характеристика **W** (раны) или **начальная численность** не может быть равномерно разделена пополам, не могут находиться **на половинной численности** (half-strength) (но могут быть **ниже половинной численности**).`,
      table: {
        headers: ['Условие', 'Начальная численность 1 (отслеживает раны)', 'Начальная численность 2 или более'],
        rows: [
          ['**Ниже начальной численности**', 'Оставшиеся раны модели **меньше** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните **меньше** его начальной численности.'],
          ['**На половинной численности**', 'Оставшиеся раны модели составляют **половину** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните составляет **половину** его начальной численности.'],
          ['**Ниже половинной численности**', 'Оставшиеся раны модели составляют **менее половины** её характеристики **W** (ран).', 'Количество оставшихся моделей в юните составляет **менее половины** его начальной численности.'],
        ],
      },
      example: 'Капитан (1 модель) приписан к отряду Интерцессоров (5 моделей). Этот **составной юнит** (attached unit) имеет **начальную численность** (starting strength) 6. Если три Интерцессора **уничтожены**, юнит находится **на половинной численности** (half-strength). Если четыре Интерцессора **уничтожены**, юнит находится **ниже половинной численности** (below half-strength). Если все Интерцессоры **уничтожены**, оставшийся Капитан находится **ниже половинной численности**, несмотря на то, что у него осталось полное количество ран (wounds).',
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

Когда модель **уничтожена** (destroyed), сначала выполните любые правила, которые срабатывают, когда она **уничтожена**, затем она убирается с поля боя. Если такие правила применяются, и если модель была **уничтожена** в результате атаки, если не указано иное, эти правила выполняются и модель убирается только после того, как атаки атакующего юнита завершены. Если не указано иное, **уничтоженные** модели и юниты не могут использовать способности или быть выбраны или стать целью для правил.`,
    },
    {
      id: 'app-different-m',
      title: 'Различные характеристики перемещения',
      body: `При совершении **обычного перемещения** (normal move) или **ускоренного передвижения** (advance move), если разные модели в перемещающемся юните имеют разные характеристики **M** (перемещение), **максимальная дистанция** для этого перемещения будет разной для этих моделей. Например, если юнит совершает **обычное перемещение** и все модели в этом юните имеют характеристику **M** 6", кроме одной модели с характеристикой **M** 9", то **максимальная дистанция** для этой модели составит 9", тогда как для остальных моделей **максимальная дистанция** составит 6". Пока этот юнит совершает это перемещение, должны соблюдаться все остальные ограничения.`,
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
      body: `Некоторые юниты могут содержать модели с разными **ключевыми словами** (keywords), либо потому что они являются **составным юнитом** (attached unit), либо в результате разделений, указанных в их **листе данных** (datasheet) и/или предметов снаряжения (items of wargear), которые они имеют. В этом случае такой юнит имеет все ключевые слова всех своих моделей, но его модели не получают ключевые слова других моделей в этом юните, которых у них ещё нет. Помните, что атаки нацелены на **юниты**, а не на **модели**.`,
    },
    {
      id: 'app-objective-markers',
      title: 'Цели, не находящиеся внутри элемента укрытия',
      body: `Если точка расположения **цели** (objective) не совпадает с **элементом укрытия** (terrain area), вы должны обозначить местоположение этой цели плоским круглым маркером диаметром 40 мм, отцентрованным на этой точке — это называется **маркером цели** (objective marker). Модели могут проходить сквозь **маркеры цели** и могут завершить перемещение на маркерах цели.

Модель находится в пределах **маркера цели**, пока она находится в пределах 3" по горизонтали и 5" по вертикали от этого маркера. При измерении расстояний до и от **маркера цели** измеряйте расстояние до него или от него по ближайшей его части.`,
    },
    {
      id: 'app-revived',
      title: 'Восстановленный',
      body: `Когда правило **возрождает** (revives), **воскрешает** (resurrects) или **возвращает** (returns) модели в юнит, указанное количество **уничтоженных** (destroyed) моделей добавляется в юнит. Это не может расширить юнит сверх его **начальной численности** (starting strength). Такие модели добавляются со всем **снаряжением** (wargear) и **усилениями** (enhancements), которые они имели в начале битвы, и, если не указано иное, возвращаются с полным количеством **ран** (wounds).

Модели, возвращённые в юнит на поле боя, должны быть размещены следующим образом:
▪ В **когерентности** (coherency) с моделями в этом юните, которые начали эту фазу на поле боя (т.е. моделями, которые уже были на поле боя, когда это правило было использовано).
▪ Они могут быть **связаны ближним боем** (engaged) с одним или несколькими вражескими юнитами, но только если эти вражеские юниты уже **связаны ближним боем** с юнитом, в который эти модели возвращаются.

Если модель **лидера** (leader) или **поддержки** (support) в **составном юните** (attached unit) **уничтожена** (destroyed) и впоследствии **возрождена** (revived), она всё ещё является частью этого составного юнита и должна быть возвращена в него, если это возможно.`,
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
  ],
  ru: [
    {
      q: 'Может ли юнит без дистанционного оружия стрелять в фазу стрельбы своего контролирующего игрока?',
      a: 'Да. Даже если юнит не может совершать дистанционные атаки, он всё равно **может стрелять** (eligible to shoot), что может повлиять на его возможность использования других правил, например, начала **действия** (starting an action).',
    },
    {
      q: 'Когда мой юнит стреляет, используя **стрельбу в тесном бою** (close-quarters shooting), могут ли модели МОНСТРОВ/ТЕХНИКИ (MONSTER/VEHICLE) в моём юните выбрать целью **связанный ближним боем** (engaged) юнит с оружием **[BLAST]**?',
      a: 'Нет.',
    },
    {
      q: 'Когда мой юнит стреляет по **связанному** юниту МОНСТРОВ/ТЕХНИКИ (MONSTER/VEHICLE), могут ли модели в моём юните выбрать этот юнит целью для оружия **[BLAST]**?',
      a: 'Нет.',
    },
    {
      q: 'Может ли юнит, который может совершить **нападение к врагу** (overrun fight), быть выбран для этого, если он **не может участвовать в ближнем бою** (eligible to fight)?',
      a: 'Нет. Иногда юнит может **связаться ближним боем** (engaged) после начала шага «Ближний бой» (Fight step), но затем стать **несвязанным** (unengaged) позже в этом шаге. Если это происходит, и он больше **не может участвовать в ближнем бою** (eligible to fight), он не может совершить **нападение к врагу** (overrun fight).',
    },
    {
      q: 'Может ли юнит сесть внутри ТРАНСПОРТА после совершения **разведывательного перемещения** (scout move)?',
      a: 'Нет. **Разведывательные перемещения** (scout moves) происходят на шаге «Выбор предбоевых способностей» (Resolve Pre-battle Abilities step), который следует после шага «Объявление боевых порядков» (Declare Battle Formations step) и перед шагом «Начало битвы» (Begin the Battle step).',
    },
  ],
}
