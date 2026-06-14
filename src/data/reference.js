export const coreAbilities = [
  {
    num: '24.03',
    name: '[ANTI]',
    type: 'weapon',
    summary: 'Form: [ANTI-X Y+]. Unmodified wound roll of Y+ against units with keyword X = critical wound.',
    fullText: 'This ability takes the form [ANTI-X Y+]. Each time an attack is made with this weapon that targets a unit with the relevant keyword (X), an unmodified wound roll of Y+ counts as a Critical Wound.',
  },
  {
    num: '24.04',
    name: '[ASSAULT]',
    type: 'weapon',
    summary: 'Units with [ASSAULT] weapons can use assault shooting (10.05).',
    fullText: 'Units with one or more [ASSAULT] weapons are eligible to use assault shooting (10.05) even after making an advance move.',
  },
  {
    num: '24.05',
    name: '[BLAST]',
    type: 'weapon',
    summary: 'Each 5 models in the target unit (rounding down) adds 1 extra attack die.',
    fullText: 'When an attack is made with a [BLAST] weapon, the number of attack dice is increased by 1 for every full 5 models in the target unit. [BLAST X] adds X extra attack dice per 5 models instead.',
  },
  {
    num: '24.06',
    name: '[CLEAVE]',
    type: 'weapon',
    summary: 'Form: [CLEAVE X]. If only one target selected, add X extra attack dice per 5 models (rounding down).',
    fullText: 'This ability takes the form [CLEAVE X]. If only one target unit is selected for this weapon, add X extra attack dice for every full 5 models in the target unit.',
  },
  {
    num: '24.07',
    name: '[CLOSE-QUARTERS]',
    type: 'weapon',
    summary: 'Enables close-quarters shooting (10.06). Non-MONSTER/VEHICLE models must choose either [CQ] weapons or other ranged weapons when not using close-quarters shooting.',
    fullText: 'Units with one or more [CLOSE-QUARTERS] weapons are eligible to use close-quarters shooting (10.06). When not using close-quarters or assault shooting, non-MONSTER/VEHICLE models must choose to use either their [CLOSE-QUARTERS] weapons or their other ranged weapons — not both.',
  },
  {
    num: '24.08',
    name: 'Deadly Demise',
    type: 'unit',
    summary: 'Form: Deadly Demise X. When a model in this unit is destroyed, roll D6: on a 6, each unit within 6" suffers X mortal wounds.',
    fullText: 'This ability takes the form Deadly Demise X. When a model in this unit is destroyed (after any emergency disembarks), roll one D6: on a 6, each unit (friend and foe) within 6" of that model suffers X mortal wounds.',
  },
  {
    num: '24.09',
    name: 'Deep Strike',
    type: 'unit',
    summary: 'During ingress moves, if every model has Deep Strike, can be set up anywhere more than 8" from all enemies (even within opponent\'s deployment zone).',
    fullText: 'During an ingress move, if every model in this unit has the Deep Strike ability, this unit can be set up anywhere on the battlefield that is more than 8" horizontally from all enemy models, rather than within 6" of a battlefield edge.',
  },
  {
    num: '24.10',
    name: '[DEVASTATING WOUNDS]',
    type: 'weapon',
    summary: 'Critical wound ends the attack sequence; target suffers mortal wounds equal to D characteristic instead. Mortal wounds from one critical wound can damage only one model.',
    fullText: 'Each time an attack made with this weapon results in a Critical Wound, that attack\'s hit, wound, and save rolls are not made. Instead, the target unit suffers a number of mortal wounds equal to that attack\'s D characteristic, and the attack sequence then ends. The mortal wounds from a single critical wound can only damage one model — any excess is lost.',
  },
  {
    num: '24.11',
    name: '[EXTRA ATTACKS]',
    type: 'weapon',
    summary: 'When unit fights, models with [EXTRA ATTACKS] weapons make additional attacks with those weapons plus one other melee weapon. Must select all [EXTRA ATTACKS] weapons in Select Weapons step.',
    fullText: 'When the unit fights, models with one or more [EXTRA ATTACKS] weapons make attacks with those weapons in addition to attacks made with one other melee weapon. In the Select Weapons step, all [EXTRA ATTACKS] weapons in the unit must be selected.',
  },
  {
    num: '24.12',
    name: 'Feel No Pain',
    type: 'unit',
    summary: 'Form: Feel No Pain X+. When model would lose a wound, roll D6: on X+, wound is not lost.',
    fullText: 'This ability takes the form Feel No Pain X+. Each time a model with this ability would lose a wound (including mortal wounds), roll one D6: if the result is equal to or greater than X, that wound is not lost.',
  },
  {
    num: '24.13',
    name: 'Fights First',
    type: 'unit',
    summary: 'While every model in unit has this ability, the unit is a Fights First unit and fights before other units in the Fight phase.',
    fullText: 'While every model in this unit has the Fights First ability, this unit is a Fights First unit. During the Fight step, Fights First units must be selected before other eligible units.',
  },
  {
    num: '24.14',
    name: 'Firing Deck',
    type: 'unit',
    summary: 'Form: Firing Deck X. In Shooting phase, TRANSPORT can select up to X embarked models; each contributes a ranged weapon. After: embarked units not eligible to shoot.',
    fullText: 'This ability takes the form Firing Deck X. In the Shooting phase, this TRANSPORT unit can select up to X embarked models; each selected model contributes one of its ranged weapons (excluding [ONE SHOT] weapons) to this TRANSPORT unit\'s weapons for this phase. After attacks are resolved, any units that had models selected in this way are not eligible to shoot this phase.',
  },
  {
    num: '24.15',
    name: '[HAZARDOUS]',
    type: 'weapon',
    summary: 'After a unit shoots or fights with [HAZARDOUS] weapons, make hazard rolls equal to the number of such weapons selected.',
    fullText: 'After a unit shoots or fights, if one or more attacks were made with [HAZARDOUS] weapons, make a number of hazard rolls (06.03) equal to the total number of [HAZARDOUS] weapons selected in the Select Weapons step.',
  },
  {
    num: '24.16',
    name: '[HEAVY]',
    type: 'weapon',
    summary: 'If attacking unit is unengaged, was not set up this turn, and no model moved more than 3" this turn: add 1 to the hit roll.',
    fullText: 'If the attacking unit is unengaged, was not set up this turn, and no model in the unit moved more than 3" during the preceding Movement phase of the same turn, add 1 to the hit roll when making attacks with this weapon.',
  },
  {
    num: '24.17',
    name: 'Hover',
    type: 'unit',
    summary: 'When this unit takes to the skies, do not subtract 2" from maximum distance.',
    fullText: 'When this unit takes to the skies (21.03), do not subtract 2" from the maximum distance of that move.',
  },
  {
    num: '24.18',
    name: '[IGNORES COVER]',
    type: 'weapon',
    summary: 'Target cannot have benefit of cover against this weapon, including from Stealth or similar rules.',
    fullText: 'Each time an attack is made with this weapon, the target unit cannot have the benefit of cover against that attack, even if it would otherwise gain the benefit from another ability (such as Stealth).',
  },
  {
    num: '24.19',
    name: '[INDIRECT FIRE]',
    type: 'weapon',
    summary: 'Units with [INDIRECT FIRE] weapons can use indirect shooting (10.07).',
    fullText: 'Units with one or more [INDIRECT FIRE] weapons are eligible to use indirect shooting (10.07), allowing them to target units that are not visible to the attacking models.',
  },
  {
    num: '24.20',
    name: 'Infiltrators',
    type: 'unit',
    summary: 'During deployment, if every model has this ability, unit can be set up anywhere more than 8" from opponent\'s deployment zone and all enemy units.',
    fullText: 'During the Declare Battle Formations step, if every model in this unit has the Infiltrators ability, this unit can be set up anywhere on the battlefield that is more than 8" from the opponent\'s deployment zone and more than 8" from all enemy units, rather than within their own deployment zone.',
  },
  {
    num: '24.21',
    name: '[LANCE]',
    type: 'weapon',
    summary: 'If attacking model\'s unit made a charge move this turn, add 1 to the wound roll.',
    fullText: 'Each time an attack is made with this weapon, if the attacking model\'s unit made a charge move this turn, add 1 to the wound roll.',
  },
  {
    num: '24.22',
    name: 'Leader',
    type: 'unit',
    summary: 'Allows this unit to lead bodyguard units, forming an attached unit. See Attached Units (19).',
    fullText: 'This unit can be attached to eligible bodyguard units to form an attached unit. See Attached Units (19) for full rules.',
  },
  {
    num: '24.23',
    name: '[LETHAL HITS]',
    type: 'weapon',
    summary: 'On a critical hit, you can choose to automatically wound the target (no wound roll made; cannot result in critical wound).',
    fullText: 'Each time an attack made with this weapon scores a Critical Hit, the hit automatically wounds the target without a wound roll being made. However, the attack cannot result in a Critical Wound as no wound roll is made.',
  },
  {
    num: '24.24',
    name: 'Lone Operative',
    type: 'unit',
    summary: 'Unless part of an attached unit: not visible to enemies beyond 12" (or X" if Lone Operative X"). Cannot be targeted by [INDIRECT FIRE] from beyond that range.',
    fullText: 'Unless this unit is part of an attached unit, it is not visible to enemy models that are more than 12" away (or X" if the ability is Lone Operative X"). Additionally, this unit cannot be targeted by [INDIRECT FIRE] weapons from beyond that same distance.',
  },
  {
    num: '24.25',
    name: '[MELTA]',
    type: 'weapon',
    summary: 'Form: [MELTA X]. If target is within half range in Select Targets step, add X to weapon\'s D characteristic.',
    fullText: 'This ability takes the form [MELTA X]. Each time an attack is made with this weapon, if the target was within half this weapon\'s range when targets were selected, add X to that attack\'s D characteristic for the duration of the attack.',
  },
  {
    num: '24.26',
    name: '[ONE SHOT]',
    type: 'weapon',
    summary: 'Each weapon can only be selected to make attacks once per battle. Destroyed and revived models: [ONE SHOT] weapons already used cannot be used again.',
    fullText: 'Each [ONE SHOT] weapon can only be selected to make attacks once per battle. If a model with a used [ONE SHOT] weapon is destroyed and then returned to the battlefield (e.g. via a revive ability), that weapon cannot be used again.',
  },
  {
    num: '24.27',
    name: '[PISTOL]',
    type: 'weapon',
    summary: 'Identical to [CLOSE-QUARTERS] for all rules purposes. Legacy term being phased out.',
    fullText: 'For all rules purposes, [PISTOL] is treated identically to [CLOSE-QUARTERS]. This term is a legacy designation being phased out in favour of [CLOSE-QUARTERS].',
  },
  {
    num: '24.28',
    name: '[PRECISION]',
    type: 'weapon',
    summary: 'At start of Allocation Order step, if target unit contains visible CHARACTER models, active player can select one as the current allocation group.',
    fullText: 'Each time an attack made with this weapon successfully wounds an attached unit, at the start of the Allocation Order step, if the target unit contains one or more visible CHARACTER models, the active player can select an allocation group containing one of those CHARACTER models to be the current allocation group (instead of following the normal allocation order).',
  },
  {
    num: '24.29',
    name: '[PSYCHIC]',
    type: 'weapon',
    summary: 'Can ignore any modifiers to BS/WS and hit roll. Attacks are psychic attacks.',
    fullText: 'Each time an attack is made with this weapon, you can ignore any negative or positive modifiers to the BS or WS characteristic and the hit roll. Attacks made with this weapon are psychic attacks.',
  },
  {
    num: '24.30',
    name: '[RAPID FIRE]',
    type: 'weapon',
    summary: 'Form: [RAPID FIRE X]. If target was within half range in Select Targets step, add X attack dice.',
    fullText: 'This ability takes the form [RAPID FIRE X]. Each time this weapon is selected to make attacks, if the target was within half this weapon\'s range when targets were selected, add X to the number of attack dice gathered.',
  },
  {
    num: '24.31',
    name: 'Scouts',
    type: 'unit',
    summary: 'Form: Scouts X". In Resolve Pre-battle Abilities step: units can make a scout move, set up in their deployment zone, or (if in a DEDICATED TRANSPORT) the TRANSPORT can make a scout move.',
    fullText: 'This ability takes the form Scouts X". During the Resolve Pre-battle Abilities step, this unit can either: (1) make a scout move; (2) be set up wholly within their own deployment zone (if currently in reserves); or (3) if embarked in a DEDICATED TRANSPORT where all embarked models have Scouts, that TRANSPORT makes a scout move instead.',
  },
  {
    num: '24.32',
    name: 'Scout Move',
    type: 'unit',
    summary: 'Maximum = X" from Scouts ability. After moving: must be more than 8" from all enemy units.',
    fullText: 'Maximum Distance: X" (as specified by the Scouts ability). Eligible if triggered by Scouts ability and unit is wholly within own deployment zone. After moving: this unit must be more than 8" from all enemy units.',
  },
  {
    num: '24.33',
    name: 'Stealth',
    type: 'unit',
    summary: 'If every model in unit has this: each time a ranged attack targets this unit, unit has benefit of cover.',
    fullText: 'While every model in this unit has the Stealth ability, each time a ranged attack targets this unit, this unit has the benefit of cover against that attack.',
  },
  {
    num: '24.34',
    name: 'Support',
    type: 'unit',
    summary: 'Allows this unit to join an attached unit as a support unit. See Attached Units (19).',
    fullText: 'This unit can be attached to an existing attached unit as a support unit. See Attached Units (19) for full rules.',
  },
  {
    num: '24.35',
    name: 'Super-heavy Walker',
    type: 'unit',
    summary: 'During normal/advance/**fall-back moves**: models can move through models (not TITANIC) and horizontally through terrain sections ≤4" tall. Optional MOBILE declaration with possible battle-shock risk.',
    fullText: 'During normal, advance, or **fall-back moves**, models in this unit can move through any model that is not a TITANIC model, and can move horizontally through sections of terrain features that are ≤4" tall. Optionally, at the start of such a move, you can declare this unit has the MOBILE keyword for the duration of the move; if you do, at the end of the move roll one D6: on a 1, this unit is battle-shocked.',
  },
  {
    num: '24.36',
    name: '[SUSTAINED HITS]',
    type: 'weapon',
    summary: 'Form: [SUSTAINED HITS X]. A critical hit results in X additional hits.',
    fullText: 'This ability takes the form [SUSTAINED HITS X]. Each time an attack made with this weapon scores a Critical Hit, that attack results in X additional hits.',
  },
  {
    num: '24.37',
    name: '[TORRENT]',
    type: 'weapon',
    summary: 'Attacks automatically hit the target (no hit roll needed).',
    fullText: 'Each time an attack is made with this weapon, the hit roll is not made — the attack is treated as having automatically scored a hit.',
  },
  {
    num: '24.38',
    name: '[TWIN-LINKED]',
    type: 'weapon',
    summary: 'Can re-roll the wound roll.',
    fullText: 'Each time an attack is made with this weapon, you can re-roll the wound roll.',
  },
]

export const appendix = [
  {
    id: 'app-half-strength',
    title: 'Starting Strength and Half-Strength',
    body: `Starting Strength is determined when a unit is added to the army.

For multi-model units:
▪ Below Starting Strength: Remaining models < starting strength.
▪ At Half-Strength: Remaining models = half of starting strength.
▪ Below Half-Strength: Remaining models < half of starting strength.

For single-model units (tracks wounds):
▪ Below Starting Strength: Remaining wounds < W characteristic.
▪ At Half-Strength: Remaining wounds = half of W characteristic.
▪ Below Half-Strength: Remaining wounds < half of W characteristic.

Units or models whose W or starting strength cannot be divided evenly in half cannot be at half-strength (only below half-strength).

Example: A Captain (1 model, starting strength = 1) attached to 5 Intercessors (starting strength = 6 total).
▪ If 3 Intercessors are destroyed: at half-strength.
▪ If 4 Intercessors are destroyed: below half-strength.
▪ If all Intercessors are destroyed, Captain alone: below half-strength (even with full wounds).`,
    table: {
      headers: ['Condition', 'Single-model unit (tracks wounds)', 'Multi-model unit'],
      rows: [
        ['Below Starting Strength', 'Remaining wounds < W characteristic', 'Remaining models < starting strength'],
        ['At Half-Strength', 'Remaining wounds = half of W', 'Remaining models = half of starting strength'],
        ['Below Half-Strength', 'Remaining wounds < half of W', 'Remaining models < half of starting strength'],
      ],
    },
  },
  {
    id: 'app-destroyed',
    title: 'Destroyed',
    body: `When every model in a unit is destroyed, the unit is destroyed.

When a model is destroyed: first resolve any triggered rules; then remove it from the battlefield. If a model is destroyed by an attack, triggered rules only resolve after the attacking unit has resolved all of its attacks.

Destroyed models and units cannot use abilities or be selected or targeted by rules.`,
  },
  {
    id: 'app-different-m',
    title: 'Different Move Characteristics',
    body: `Models in the same unit can have different M characteristics — each model uses its own M characteristic as its maximum movement distance.`,
  },
  {
    id: 'app-eligible-unable',
    title: 'Eligible to Fight, But Unable to Fight',
    body: `If all of a player's units that are eligible to fight are more than 5" from all enemy units, that player can pass (returning the selection to their opponent). If both players pass consecutively, or one passes when the opponent has no units left that are eligible to fight, the Fight step ends.`,
  },
  {
    id: 'app-mixed-keywords',
    title: 'Mixed Keywords in Units',
    body: `A unit has all keywords of all its models. Individual models within the unit do not gain keywords from other models in the same unit.`,
  },
  {
    id: 'app-objective-markers',
    title: 'Objectives Not Within a Terrain Area',
    body: `Use a flat, circular 40mm diameter objective marker. Within range = within 3" horizontally and 5" vertically of the marker. Measure to or from the closest part of the marker. Models can move through and end moves on top of objective markers.`,
  },
  {
    id: 'app-revived',
    title: 'Revived',
    body: `When a rule revives, resurrects, or returns models to the battlefield:
▪ Cannot exceed starting strength.
▪ Models returned with all wargear and enhancements from start of battle; full wounds remaining (unless stated otherwise).
▪ Must be set up in coherency with models already on the battlefield; can be engaged only if those enemy units are already engaged with the unit.
▪ If a revived leader/support model is part of an attached unit, it rejoins that attached unit.`,
  },
]

export const faqs = [
  {
    q: 'Is a unit with no ranged weapons eligible to shoot?',
    a: 'Yes. It still counts as eligible to shoot, which can affect other rules (such as being eligible to start an action).',
  },
  {
    q: 'When shooting with close-quarters shooting, can MONSTER/VEHICLE models target an engaged unit with [BLAST] weapons?',
    a: 'No.',
  },
  {
    q: 'When shooting at an engaged MONSTER/VEHICLE unit, can [BLAST] weapons target it?',
    a: 'No.',
  },
  {
    q: 'Can a unit eligible for an overrun fight be selected if it is not also eligible to fight?',
    a: 'No. If a unit becomes unengaged later in the Fight step and is no longer eligible to fight, it cannot make an overrun fight.',
  },
  {
    q: 'Can a unit embark within a TRANSPORT after making a scout move?',
    a: 'No. Scout moves happen in the Resolve Pre-battle Abilities step (after Declare Battle Formations, before Begin the Battle). Embarking rules require the battle to have started.',
  },
]
