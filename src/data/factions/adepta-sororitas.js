// Adepta Sororitas — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex.
//
//   Codex layer: imported from the Wahapedia CSV exports via scripts/import-wahapedia.mjs →
//     5 detachments (Army of Faith, Bringers of Flame, Champions of Faith, Hallowed
//     Martyrs, Penitent Host). Wahapedia already carries most pack updates; the remaining
//     diff (Devout Fanaticism) is folded in below. Champions of Faith is also printed in
//     the Faction Pack (identical text) — marked source: 'faction-pack'.
//   Faction Pack v1.0 (sources/Faction pack 11 ed/imperium/AdeptaSororitas.pdf) → 3 pack
//     detachments (Chorus of Condemnation, Sacred Champions, Sanctified Orators) and
//     Rules Updates.
//   MFM (src/data/mfm/adepta-sororitas.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the REVEREND `unique` tag.
//
// 8 detachments total, matching the MFM list. EN-first: `ru` reuses the same object for
// now. Markup follows useRenderInline / RuleBlock / StratCard conventions. Datasheets later.
const en = {
  slug: "adepta-sororitas",
  name: "Adepta Sororitas",

  // Faction-Pack Rules Update rewrote the Gaining Miracle Dice section (already reflected
  // in the Wahapedia text below).
  armyRule: {
    id: 'acts-of-faith',
    name: 'Acts of Faith',
    flavor:
      'It is said the Emperor\u2019s benediction touches the Adepta Sororitas, manifesting as a nimbus of holy light in which his power is revealed in miraculous deeds of fortitude and divine strength.',
    body: `If your Army Faction is ADEPTA SORORITAS, each unit from your army with this ability can perform one Act of Faith per phase. This is done using Miracle dice.

### Gaining Miracle Dice
If your Army Faction is ADEPTA SORORITAS, you gain 1 Miracle dice:
▪ At the start of each battle round.
▪ Each time an ADEPTA SORORITAS unit from your army is destroyed.

Each time you gain a Miracle dice, roll one D6. The number you roll is the value of that Miracle dice. This value cannot be changed or re-rolled, unless a rule specifically states otherwise. Keep your Miracle dice to one side — this is your Miracle dice pool.

### Performing an Act of Faith
Before making a dice roll for a model or unit from your army with the Acts of Faith ability, if you have one or more dice in your Miracle dice pool, that unit can perform an Act of Faith. If it does, select one of the dice from your Miracle dice pool to substitute that dice roll (if a roll involves more than one dice, e.g. a Charge roll or Battle-shock test, only a single dice can be substituted). The dice that is being substituted is not rolled; instead, the value of the selected Miracle dice is used as if it had been rolled (this counts as an unmodified dice roll of that value for all rules purposes). Each Miracle dice can only be selected for substitution once. Once all Miracle dice substitutions have been made, remove the chosen Miracle dice from your Miracle dice pool, and roll all remaining, unsubstituted dice that are a part of the dice roll. You can use Miracle dice when a unit performs an Act of Faith for any of the following types of dice roll:
▪ Advance roll
▪ Battle-shock test
▪ Charge roll
▪ Damage roll
▪ Hit roll
▪ Saving throw
▪ Wound roll`,
  },

  detachments: [
    // ─────────────── CODEX DETACHMENTS (via Wahapedia import) ───────────────
    {
      id: "army-of-faith",
      name: "Army of Faith",
      source: 'codex',
      dp: 2,
      forceDisposition: "Take and Hold",
      rule: {
        name: "Sacred Rites",
        flavor: "At times of war, the Adepta Sororitas make offerings to the Emperor in prayer, incense and blood. In such pious devotion, they may attract his blessings and enact miraculous deeds in his holy name.",
        body: "Each ADEPTA SORORITAS unit from your army can perform up to two Acts of Faith per phase, instead of just one.",
      },
      stratagems: [
        {
          name: "Shield of Faith",
          sublabel: "Army of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "There is no armour as resilient as conviction itself.",
          when: "Any phase, just after an ADEPTA SORORITAS unit from your army suffers a mortal wound.",
          target: "That ADEPTA SORORITAS unit, or one friendly ADEPTA SORORITAS JUMP PACK unit within 3\" of it.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds. If you targeted an ADEPTA SORORITAS JUMP PACK unit from your army with this Stratagem, then until the end of the phase, while a friendly ADEPTA SORORITAS unit is unit is within 3\" of your unit, models in that unit have the Feel No Pain 5+ ability against mortal wounds.",
          restrictions: "",
        },
        {
          name: "Faith and Fury",
          sublabel: "Army of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The righteous zeal of the Sisters of Battle burns bright as they charge towards their foes.",
          when: "Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability. If one or more enemy models are destroyed as the result of your unit's attacks this phase, you gain 1 Miracle dice.",
          restrictions: "",
        },
        {
          name: "Divine Guidance",
          sublabel: "Army of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "With miraculous precision, the blows of the Sisters of Battle strike the weak points of enemy armour.",
          when: "Your Shooting phase or the Fight phase.",
          target: "That ADEPTA SORORITAS unit from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack, improve the Armour Penetration characteristic of that attack by 1. If one or more enemy models are destroyed as the result of any of those attacks, you gain 1 Miracle dice.",
          restrictions: "",
        },
        {
          name: "Light of the Emperor",
          sublabel: "Army of Faith – Battle Tactic Stratagem",
          cp: "2CP",
          turn: "either",
          flavor: "The Emperor’s radiance shines upon his warriors, magnifying their purity in their darkest hour.",
          when: "Command phase.",
          target: "One ADEPTA SORORITAS unit from your army.",
          effect: "Until the end of the turn, your unit is blessed. While a unit is blessed, it can ignore any or all modifiers to the following: the profile characteristics of its models; the Weapon Skill or Ballistic Skill characteristics of weapons equipped by its models; any roll or test made for it (excluding modifiers to saving throws). If your unit has the JUMP PACK keyword, until the end of the turn, while a friendly ADEPTA SORORITAS unit is within 3\" of your unit, that friendly unit is also blessed.",
          restrictions: "",
        },
        {
          name: "Angelic Descent",
          sublabel: "Army of Faith – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "On wings of fire do the angelic warriors of the Orders Militant descent to battle.",
          when: "End of your opponent’s Fight phase.",
          target: "One ADEPTA SORORITAS JUMP PACK unit from your army.",
          effect: "Remove your unit from the battlefield and place it into Strategic Reserves.",
          restrictions: "You cannot select a unit that is within Engagement Range of one or more enemy units.",
        },
        {
          name: "Blinding Radiance",
          sublabel: "Army of Faith – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The Emperor's divinity manifests in golden halos, blinding the enemy with radiant light.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit's attacks, or one friendly ADEPTA SORORITAS JUMP PACK unit within 3\" of such a unit.",
          effect: "Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll. If you targeted an ADEPTA SORORITAS JUMP PACK unit from your army with this Stratagem, then until the end of the phase, while a friendly ADEPTA SORORITAS unit is unit is within 3\" of your unit, each time an attack targets that unit, subtract 1 from the Hit roll.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Litanies of Faith",
          points: 10,
          flavor: "This unassuming parchment is one of the holiest relics in the Ministorum's charge, its mere presence enough to fill the hearts of the faithful with righteous fervour.",
          body: "CANONESS or PALATINE model only. At the start of your Command phase, if the bearer is on the battlefield, take a Leadership test for the bearer. If that test is passed, you gain 1 Miracle dice.",
        },
        {
          name: "Blade of Saint Ellynor",
          points: 15,
          flavor: "Forged from thrice-blessed silver, this blade has the names and deeds of a thousand saints inscribed on one side on the molecular level, while the other has the entire Fede lmperialis etched into its form. The blade glows with righteous power and has slain heretics, mutants and xenos beyond counting.",
          body: "ADEPTA SORORITAS model only. Improve the Strength and Armour Penetration characteristics of the bearer’s melee weapons by 1, and those weapons have the [PRECISION] ability. In addition, each time the bearer fights, if one or more enemy models are destroyed by those attacks, you gain 1 Miracle dice.",
        },
        {
          name: "Divine Aspect",
          points: 5,
          flavor: "Enemy warriors tremble before the radiant majesty of one blessed by the Emperor.",
          body: "ADEPTA SORORITAS model only. In your Movement phase, you can select one enemy unit within 12\" of the bearer; that unit must take a Battle-shock test. If that test is failed, you gain 1 Miracle dice.",
        },
        {
          name: "Triptych of the Macharian Crusade",
          points: 20,
          flavor: "Carried onto the most fire-swept of battlefields, the images of the Macharian Trinity glorifies three missionaries who saved thousands of lives. This adamantine-sheathed relic reminds the bearer that faith alone can weather the most grievous adversities.",
          body: "ADEPTA SORORITAS model only. Each time the bearer uses an Act of Faith to substitute a saving throw, that saving throw is successful, irrespective of the value of the Miracle dice used.",
        },
      ],
    },

    {
      id: "bringers-of-flame",
      name: "Bringers of Flame",
      source: 'codex',
      dp: 3,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Fervent Purgation",
        flavor: "These warriors carry the fiery wrath of the Emperor into the darkest corners of his realm. Through the weapons of the faithful is the Master of Mankind’s immortal anger made manifest. With the holy trinity of boltgun, flamer and melta weapons are his enemies purged from the lmperium’s worlds.",
        body: "Ranged weapons equipped by ADEPTA SORORITAS models from your army have the [ASSAULT] ability, and each time an attack made with such a weapon targets a unit within 6\", add 1 to the Strength characteristic of that attack.",
      },
      stratagems: [
        {
          name: "Blazing Ire",
          sublabel: "Bringers of Flame – Battle Tactic Stratagem",
          cp: "2CP",
          turn: "opponent",
          flavor: "The transpans of the Adepta Sororitas are mobile shrines. The Sisters within this vehicle recite psalms of righteous hatred and destruction before emerging to obliterate their foes",
          when: "Your opponent’s Shooting phase, just after an enemy unit has shot.",
          target: "One ADEPTA SORORITAS TRANSPORT unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "One unit embarked within your TRANSPORT can disembark as if it were your Movement phase, and can then shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.",
          restrictions: "",
        },
        {
          name: "Rites of Fire",
          sublabel: "Bringers of Flame – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "At close range, the Adepta Sororitas unleash the full devastating potential of their blessed weapons.",
          when: "Your Shooting phase.",
          target: "One ADEPTA SORORITAS unit from your army that disembarked from a TRANSPORT this turn and has not been selected to shoot this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit within 6\" that is also within range of an objective marker, add 1 to the Wound roll. If one or more enemy models are destroyed as the result of those attacks, select one of those destroyed models; that destroyed model’s unit must take a Battle-shock test.",
          restrictions: "",
        },
        {
          name: "Cleansing Flames",
          sublabel: "Bringers of Flame – Battle Tactic Stratagem",
          cp: "2CP",
          turn: "your",
          flavor: "Burn the mutant. Burn the heretic. Burn the witch.",
          when: "Your Shooting phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, Torrent weapons equipped by models in your unit have the [DEVASTATING WOUNDS] ability",
          restrictions: "",
        },
        {
          name: "Righteous Blows",
          sublabel: "Bringers of Flame – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "As the faithful strike their foes in righteous anger, they feel the Emperor's hand adding strength to their blows.",
          when: "Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability. If one or more enemy models are destroyed as the result of attacks made by those weapons this phase, select one of those destroyed models; that destroyed model’s unit must take a Battle-shock test.",
          restrictions: "",
        },
        {
          name: "Shield of Aversion",
          sublabel: "Bringers of Flame – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The Sisters of Battle gird themselves with the strength of their faith. It is a shield of repulsion that rejects the heretical cunning of their enemies.",
          when: "Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
          restrictions: "",
        },
        {
          name: "Carry Forth the Faithful",
          sublabel: "Bringers of Flame – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Congregated within a transport, the Battle Sisters recite bellowing prayers so that the whole vehicle echoes to furious piety.",
          when: "Your Movement phase, just before an ADEPTA SORORITAS TRANSPORT model from your army Advances.",
          target: "That ADEPTA SORORITAS TRANSPORT model.",
          effect: "Until the end of the turn, you can re-roll Advance rolls made for your TRANSPORT, and units can disembark from your TRANSPORT even though it Advanced. Units that do so count as having made a Normal move, and cannot declare a charge this turn",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Righteous Rage",
          points: 15,
          flavor: "This servant of the divine draws deeply from their faith, enhancing their physical might.",
          body: "ADEPTA SORORITAS model only. Each time the bearer is selected to fight, you can first discard up to 3 Miracle dice. For each Miracle dice just discarded, until the end of the phase, add 1 to the Attacks and Strength characteristics of the bearer’s melee weapons.",
        },
        {
          name: "Manual of Saint Griselda",
          points: 20,
          flavor: "Within this tome are the collected writings of Saint Griselda the Pious. The lessons inscribed on its vellum pages teach focus and decisiveness during times of war.",
          body: "ADEPTA SORORITAS model only. At the start of your Command phase, you can discard up to 2 Miracle dice. Then, add 1 Miracle dice to your Miracle Dice pool showing a value equal to the sum of the two Miracle dice you just discarded (to a maximum of 6).",
        },
        {
          name: "Fire and Fury",
          points: 30,
          flavor: "This warrior is a firebrand zealot without comparison. At their command, the faithful unleash relentless fire upon their chosen foe.",
          body: "ADEPTA SORORITAS model only. While the bearer is leading a unit, add 1 to the Attacks characteristic of Torrent weapons equipped by models in that unit, and all other ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
        },
        {
          name: "Iron Surplice of Saint Istalela",
          points: 10,
          flavor: "Worked upon by generations of artificers, consecrated with holy oils and steeped in the smoke of sacred incense, this suit of power armour is amongst the most battle-proven relics held by the Orders Militant.",
          body: "CANONESS or PALATINE model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.",
        },
      ],
    },

    {
      id: "champions-of-faith",
      name: "Champions of Faith",
      source: 'faction-pack', // printed in the pack (identical to the Wahapedia text)
      dp: 2,
      forceDisposition: "Disruption",
      unique: "REVEREND",
      rule: {
        name: "Righteous Purpose",
        flavor: "Whether high-ranking clergy must be rescued, a priceless relic recovered, or some archheretic slain, these warriors know that to fail after promising victory to the God-Emperor would be infinitely worse than death; this knowledge fills them with righteous purpose and the unflinching will to succeed no matter the odds.",
        body: "In your Command phase, you can select up to 3 Adepta Sororitas units from your army (including units that are embarked within Transports), until the start of your next Command phase, those units are Righteous. While a unit is Righteous:\n▪ Add 1\" to the Move characteristic of models in that unit.\n▪ Improve the Leadership characteristic of models in that unit by 1.\n▪ Improve the Weapon Skill and Ballistic Skill characteristics of weapons equipped by Battle Sisters Squad, Celestian Sacresants and Paragon Warsuits models in that unit by 1.\n\nKeywords\nWhile a CELESTIAN SACRESANTS unit from your army is not Battle-shocked, add 1 to the Objective Control characteristic of Celestian Sacresants models in that unit.",
      },
      stratagems: [
        {
          name: "To the Heart of Heresy",
          sublabel: "Champions of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Seizing their moment to drive like a burning blade through the enemy lines and complete their holy mission, these faithful strike with unstoppable might.",
          when: "Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the turn, improve the Strength characteristic of melee weapons equipped by models in your unit by 1. If your unit is Righteous, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1 as well.",
          restrictions: "",
        },
        {
          name: "Path of the Righteous",
          sublabel: "Champions of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "When exemplars of the Imperial Creed stride to do the God-Emperor’s will, little can slow their sacred procession.",
          when: "Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the turn, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6\" instead of up to 3\". When doing so, if your unit is Righteous, it does not need to end that move closer to the closest enemy model, provided it ends that move as close as possible to the closest enemy unit.",
          restrictions: "",
        },
        {
          name: "Bastion of Faith",
          sublabel: "Champions of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Unified in their inviolate dedication to fulfil their oaths to Him on the Throne, the Order’s elite form a rampart of ceramite and unyielding faith to throw back the desperate blows of the foe.",
          when: "Fight phase, just after an enemy unit has selected its targets.",
          target: "One Celestian Sacresants unit that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll. In addition, if your unit is Righteous, you can select one other CELESTIAN SACRESANTS unit from your army that is not Battle-shocked and is within 6\" of your unit. Until the end of the phase, each time an attack targets that CELESTIAN SACRESANTS unit, subtract 1 from the Hit roll as well.",
          restrictions: "",
        },
        {
          name: "Shield of Denial",
          sublabel: "Champions of Faith – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "With so singular and fanatical a purpose, the Adepta Sororitas can will their injuries away, at least until the fight is done.",
          when: "Any phase, just after a mortal wound is allocated to an ADEPTA SORORITAS unit from your army.",
          target: "That ADEPTA SORORITAS unit.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 6+ ability against mortal wounds. If your unit is Righteous, until the end of the phase, models in your unit have the Feel No Pain 5+ ability against mortal wounds instead.",
          restrictions: "",
        },
        {
          name: "Suffer Not the Unfaithful",
          sublabel: "Champions of Faith – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "No unclean foe can be permitted to stand between the God-Emperor’s sworn champions and their oathed duty. They must be struck down with unmerciful fury.",
          when: "Your Shooting phase or the Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that is Righteous and that has not been selected to shoot or fight this phase.",
          effect: "Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have the selected ability.",
          restrictions: "",
        },
        {
          name: "Indefatigable Dedication",
          sublabel: "Champions of Faith – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Such champions of the God-Emperor never stop fighting or striving for victory, transforming momentary retreats into another opportunity to purge the unclean and press on to their objective.",
          when: "Your Movement phase, just after an ADEPTA SORORITAS unit from your army Falls Back.",
          target: "That ADEPTA SORORITAS unit.",
          effect: "Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back. If your unit is Righteous, until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back instead.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Triptych of Judgement",
          points: 15,
          flavor: "The three windows of this sacred artefact display three aspects of the God-Emperor in judgement over mortal souls. No warrior of faith will countenance failure beneath its threefold gaze.",
          body: "ADEPTA SORORITAS model only. Each time a model in the bearer’s unit makes an attack, you can ignore any or all modifiers to that attack’s Ballistic Skill or Weapon Skill characteristics and/or any or all modifiers to the Hit roll.",
        },
        {
          name: "Mark of Devotion",
          points: 30,
          flavor: "A fresh oath brand burns in this champion’s flesh, its heat remaining miraculously undimmed and its searing pain focusing their devout wrath.",
          body: "ADEPTA SORORITAS model only. Add 1 to the Attacks characteristic of the bearer’s melee weapons. While the bearer’s unit is Righteous, add 2 to the Attacks characteristic and add 1 to the Damage characteristic of the bearer’s melee weapons instead.",
        },
        {
          name: "Eyes of the Oracle",
          points: 10,
          flavor: "Having torn them from the sockets of a heretical witch, this warrior of faith keeps these shrivelled orbs sealed in a miniature reliquary about their neck. They believe that – tormented by holy imprisonment – the traitorous eyes guide their aim towards other infernal champions.",
          body: "ADEPTA SORORITAS model only. The bearer’s weapons have the [PRECISION] ability. Each time the bearer’s unit destroys an enemy CHARACTER model, you gain 1CP.",
        },
        {
          name: "Sanctified Amulet",
          points: 25,
          flavor: "Belief radiates out from this blessed icon, forming a holy circle of abjuration that holds at bay the unclean and leaves this champion free to do their duty to the God-Emperor.",
          body: "ADEPTA SORORITAS model only. Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of the bearer.",
        },
      ],
    },

    {
      id: "hallowed-martyrs",
      name: "Hallowed Martyrs",
      source: 'codex',
      dp: 3,
      forceDisposition: "Priority Assets",
      rule: {
        name: "The Blood of Martyrs",
        flavor: "The blood of martyrs is the life force of the Imperium. So do the tenets of this Order joyously proclaim, and in its warriors’ darkest hour does the sacrifice of their fallen Sisters shine brightest.",
        body: "Each time an ADEPTA SORORITAS model from your army makes an attack, add 1 to the Hit roll if that model’s unit is below its Starting Strength, and add 1 to the Wound roll as well if that model’s unit is Below Half-strength.",
      },
      stratagems: [
        {
          name: "Righteous Vengeance",
          sublabel: "Hallowed Martyrs – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "With the Emperor's light upon them, the righteous vengeance of the Sisters af Battle burns brighter.",
          when: "Fight phase.",
          target: "One ADEPTA SORORITAS unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes a melee attack, you can re-roll the Hit roll and, if your unit is Below Half-strength, you can re-roll the Wound roll as well.",
          restrictions: "",
        },
        {
          name: "Divine Intervention",
          sublabel: "Hallowed Martyrs – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The pious believe that, in their moment of greatest need, the Emperor protects.",
          when: "Any phase.",
          target: "One Adepta Sororitas Character unit from your army that was just destroyed. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "You can discard 1-3 Miracle dice. At the end of the phase, set the last destroyed model from your unit back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy models. Roll one D3, adding 1 to the result for each Miracle dice you discarded. That model is set back up with that number of wounds remaining (up to its starting number of wounds).",
          restrictions: "You cannot select Saint Celestine as the target of this Stratagem. You cannot select the same CHARACTER as the target of this Stratagem more than once per battle.",
        },
        {
          name: "Suffering and Sacrifice",
          sublabel: "Hallowed Martyrs – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Suffering is a staple prayer for the Adepta Sororitas, and a martyr’s fate only brings greater glory to the God-Emperor.",
          when: "Start of the Fight phase.",
          target: "One Adepta Sororitas Infantry or Adepta Sororitas Walker unit from your army.",
          effect: "Until the end of the phase, each time an enemy model within Engagement Range of your unit selects its targets, it must select your unit as the target of its attacks.",
          restrictions: "",
        },
        {
          name: "Sanctified Immolation",
          sublabel: "Hallowed Martyrs – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The enemy must perish, even if we perish with them. The enemy must burn, even if we burn with them.",
          when: "Any phase.",
          target: "One ADEPTA SORORITAS VEHICLE model from your army with the Deadly Demise ability that was just destroyed. You can use this Stratagem on that model even though It was just destroyed.",
          effect: "Do not roll one D6 to determine whether mortal wounds are inflicted by your model's Deadly Demise ability. Instead, mortal wounds are automatically inflicted.",
          restrictions: "",
        },
        {
          name: "Spirit of the Martyr",
          sublabel: "Hallowed Martyrs – Strategic Ploy Stratagem",
          cp: "2CP",
          turn: "either",
          flavor: "Even with their dying act, the Sororitas mete out the Emperor’s judgement.",
          when: "Fight phase, just after an enemy unit has selected its targets.",
          target: "One ADEPTA SORORITAS unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.",
          restrictions: "",
        },
        {
          name: "Praise the Fallen",
          sublabel: "Hallowed Martyrs – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "The death of a Battle Sister only stirs the survivors to fight harder to exact swift vengeance.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has shot.",
          target: "One ADEPTA SORORITAS unit from your army that had one or more of its models destroyed as a result of the attacking unit’s attacks.",
          effect: "Your unit can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Saintly Example",
          points: 10,
          flavor: "With her final breath is another heroine elevated to the ranks of sainthood, her death stirring her greatest companions to finish what she started.",
          body: "ADEPTA SORORITAS model only. When the bearer is destroyed, you gain an additional D3 Miracle dice.",
        },
        {
          name: "Through Suffering, Strength",
          points: 25,
          flavor: "With every wound inflicted on their mortal form does this holy warrior’s strength grow, their suffering a prayer to the God-Emperor.",
          body: "ADEPTA SORORITAS model only. Add 1 to the Attacks, Strength and Damage characteristics of the bearer’s  melee weapons. If the bearer has lost one or more wounds, add 2 to the Attacks, Strength and Damage characteristics of the bearer’s melee weapons instead.",
        },
        {
          name: "Chaplet of Sacrifice",
          points: 25,
          flavor: "The most hallowed martyrs of the Sisterhood have added beads to this chaplet. Such a relic can be a burden, for it carries the righteousness of those who uphold everything the Sisterhood stands for.",
          body: "ADEPTA SORORITAS model only. At the end of your Command phase, if the bearer is on the battlefield, you can re-roll 1 Miracle dice from your Miracle dice pool and return it to your Miracle dice pool showing the new result you rolled. When doing so, if the bearer's unit is below its Starting Strength, you can re-roll up to 3 Miracle dice in this way instead.",
        },
        {
          name: "Mantle of Ophelia",
          points: 20,
          flavor: "The Mantle of Ophelia was once the badge of office for the Prioress of the Convent Sanctorum, and was worn by Helena the Virtuous, a Living Saint and one of the most revered leaders in the history of the Adepta Sororitas. The mantle is thought to have sacred powers of protection, for Helena was said to have anointed it with the Tears of the Emperor, a phial of blood-like liquid meticulously collected over a century from weeping statues of the Emperor found across the cardinal worlds of the Imperium.",
          body: "Canoness or Palatine model only. Each time an attack is allocated to the bearer, change the Damage characteristic of that attack to 1.",
        },
      ],
    },

    {
      id: "penitent-host",
      name: "Penitent Host",
      source: 'codex',
      dp: 2,
      forceDisposition: "Take and Hold",
      rule: {
        name: "Desperate for Redemption",
        flavor: "The penitent masses vow to wash clean their dishonour with their foe’s blood.",
        body: "At the start of the battle round, you can select one of the following Vows of Atonement to be active for your army until the start of the next battle round. You can only select each Vow of Atonement once per battle.\nThe Path of the Penitent\n\nWith psalms on their lips, the faithful hurl themselves forward.\n\nAdd 3\" to the Move characteristic of PENITENT models from your army.\n\nAbsolution in Battle\n\nThe penitents smite the Emperor's foes with unmatched zeal.\n\nEach time a unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase, add 1 to the Attacks and Strength characteristics of melee weapons equipped by PENITENT models in that unit.\n\nDeath Before Disgrace\n\nEven the most grievous wound cannot stop a penitent warrior in their quest to earn redemption in the eyes of the Emperor.\n\nEach time a PENITENT model from your army is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 2+, do not remove it from play; the destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.",
      },
      stratagems: [
        {
          name: "Purity of Suffering",
          sublabel: "Penitent Host – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Suffering is the penance by which the faithful affirm their devotions. To shore in the agonies suffered by the God-Emperor and his saints without embracing death is the mark of fidelity to the Imperial Creed.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One PENITENT unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, PENITENT models in your unit have the Feel No Pain 4+ ability.",
          restrictions: "",
        },
        {
          name: "Lash of Guilt",
          sublabel: "Penitent Host – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Agony and guilt drive these sinners forward. Only by meeting the enemy in combat may they find repentance or, Jailing that, the comfort of death.",
          when: "Your Movement phase, just before a PENITENT unit from your army Advances.",
          target: "That PENITENT unit.",
          effect: "Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Advanced. If your unit has the PENITENT ENGINES keyword, do not make an Advance roll for it; instead, until the end of the phase, add 6\" to the Move characteristic of models in your unit.",
          restrictions: "",
        },
        {
          name: "Passion of the Penitent",
          sublabel: "Penitent Host – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The penitent are full of a burning passion to inflict suffering upon the faithless.",
          when: "Fight phase.",
          target: "One PENITENT unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, each time a PENITENT model in your unit makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.",
          restrictions: "",
        },
        {
          name: "Final Redemption",
          sublabel: "Penitent Host – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Those seeking absolution in the eyes of the Emperor will gladly give their last drop of blood to defy his enemies.",
          when: "Any phase.",
          target: "One PENITENT unit from your army that was just destroyed while it was within range of an objective marker you controlled. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
          restrictions: "",
        },
        {
          name: "Devout Fanaticism",
          sublabel: "Penitent Host – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "The God-Emperor's faithful followers, heedless of incoming fire, leap forth to deliver his furious judgement in the press of melee",
          when: "Your opponent’s Shooting phase, just after an enemy unit has shot.",
          target: "One PENITENT unit from your army that was selected as the target as one or more of the attacking unit’s attacks.",
          effect: "Your unit can make a surge move of up to D6\".", // Faction-Pack Rules Update
          restrictions: "",
        },
        {
          name: "Boundless Zeal",
          sublabel: "Penitent Host – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "The urge to absolve their sins and destroy the enemy drives the penitents to push their tortured bodies beyond their mortal limits.",
          when: "Your Movement phase, just after an ADEPTA SORORITAS unit from your army Falls Back.",
          target: "That ADEPTA SORORITAS unit.",
          effect: "Until the end of the turn, your unit is eligible to shoot or declare a charge in a turn in which it Fell Back. If your unit has the PENITENT keyword, it is eligible to shoot and declare a charge in a turn in which it Fell Back instead.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Psalm of Righteous Judgement",
          points: 20,
          flavor: "Invoking the strength of the God-Emperor, this warrior bellows psalms, which roar above the din of battle. Incited by these fire and brimstone recitations, the penitent warriors carve apart their enemies, every kill bringing them closer to redemption.",
          body: "ADEPTA SORORITAS model only. While the bearer is on the battlefield, each time an enemy unit is destroyed by a penitent unit from you army, you can discard 1 Miracle dice then gain 1 Miracle dice showing a value of 6.",
        },
        {
          name: "Verse of Holy Piety",
          points: 15,
          flavor: "As the sanctified verses of the Ecclesiarchy’s holy psalms roar across the battlefield, divine might infuses the devout.",
          body: "PENITENT model only. Once per battle, at the start of the battle round, select one Vow of Atonement. Until the start of the next battle round, that Vow of Atonement is active for the bearer’s unit in addition to any that is active for your army, even if you have already selected that Vow of Atonement this battle.",
        },
        {
          name: "Refrain of Enduring Faith",
          points: 15,
          flavor: "Faith is the shield of the righteous. The passionate benedictions of the pious may bestow the blessings of the God-Emperor.",
          body: "PENITENT model only. While the bearer is leading a unit, models in that unit have a 5+ invulnerable save.",
        },
        {
          name: "Catechism of Divine Penitence",
          points: 15,
          flavor: "To share in the agonies of the penitent and guide them to redemption is a most holy undertaking. Thus do many of the Adepta Sororitas’ commanders willingly fight by the side of those cast out by the Sisterhood.",
          body: "CANONESS, PALATINE or MINISTORUM PRIEST model only. The bearer gains the PENITENT keyword and, during the Declare Battle Formations step, can be attached to a REPENTIA SOUAD unit.",
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: "chorus-of-condemnation",
      name: "Chorus of Condemnation",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Reconnaissance",
      rule: {
        name: "Angelic Judgement",
        flavor: "Granted a greater perspective of the heretical foe\u2019s disposition, an Order\u2019s angelic veterans roar condemnatory psalms of revelation that unmask the enemy\u2019s evil for all to see.",
        body: "Friendly ADEPTA SORORITAS INFANTRY FLY units have the following ability:\n▪ **Condemnatory Psalms:** In your Shooting phase, this unit can select one visible enemy unit within 12\". That enemy unit is condemned: while a unit is condemned, that unit has +3\" detection range.",
      },
      stratagems: [
        {
          name: "Inspirational Battle Canticles",
          sublabel: "Chorus of Condemnation – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Roared blessings and deafening reminders of sacred duty fan afresh the fires of conviction which blaze through the souls of the God-Emperor\u2019s faithful.",
          when: "Start of the Command phase.",
          target: "One friendly ADEPTA SORORITAS INFANTRY FLY unit or one friendly EXORCIST unit.",
          effect: "Select one friendly Battle-shocked ADEPTA SORORITAS unit within 6\" of your unit. That unit is no longer Battle-shocked.",
          restrictions: "",
        },
        {
          name: "Harmonised Exorcism",
          sublabel: "Chorus of Condemnation – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "In harmony with the targeting hymnals of angelic warriors, an Exorcist\u2019s devastating rockets seem drawn to the heresy of the foe.",
          when: "Your Shooting phase, when a friendly EXORCIST unit is selected to shoot.",
          target: "That EXORCIST unit.",
          effect: "Select one unit visible to and within 9\" of a friendly ADEPTA SORORITAS INFANTRY FLY unit. Your unit\u2019s ranged attacks that target that unit have +1 to Hit rolls.",
          restrictions: "",
        },
        {
          name: "Devastating Reprise",
          sublabel: "Chorus of Condemnation – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With shock waves, shrapnel and deafening hymnals shattering their cohesion, survivors of an Exorcist strike are unready to face fresh skyborne assaults.",
          when: "Your Shooting phase, when a friendly EXORCIST unit has shot.",
          target: "One friendly ADEPTA SORORITAS INFANTRY FLY unit.",
          effect: "Select one enemy unit (excluding MONSTER/VEHICLE units) hit by those ranged attacks. Your unit\u2019s ranged attacks that target that unit have the [DEVASTATING WOUNDS] ability.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Clarion of Urgency",
          points: 15,
          flavor: "This passionate slayer of the blasphemous leads her warriors in powered jet-leaps to reach the condemned foe, no matter where they lurk.",
          body: "CANONESS WITH JUMP PACK model only. At the end of your opponent\u2019s Fight phase, if this unit is unengaged, you can place this unit in Strategic Reserves.",
        },
        {
          name: "Symphonic Payload",
          points: 10,
          upgrade: true,
          flavor: "These caches of thrice-blessed ordnance are launched in sacred salvoes of harmonised immolation that can scour the Emperor\u2019s foes from existence.",
          body: "EXORCIST unit only. This unit can re-roll rolls to determine the Attacks characteristic of a weapon.",
        },
      ],
    },

    {
      id: "sacred-champions",
      name: "Sacred Champions",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Take and Hold",
      unique: "REVEREND",
      rule: {
        name: "Holy Quest",
        flavor: "Charged with a holy quest in service to the God-Emperor, the veteran Sacresant elite of an Order Militant are relentless in their pursuit of victory.",
        body: "Friendly CELESTIAN SACRESANTS units\u2019 attacks have +1 Ballistic Skill and Weapon Skill.\n\nThis detachment has the **REVEREND** tag and cannot be taken with another **REVEREND** detachment.",
      },
      stratagems: [
        {
          name: "Sanctified Blows",
          sublabel: "Sacred Champions – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "To stand against the dutiful zealots of the Adepta Sororitas is to be condemned and destroyed by the power of their righteous fury.",
          when: "Fight phase, when a friendly CELESTIAN SACRESANTS unit is selected to fight.",
          target: "That CELESTIAN SACRESANTS unit.",
          effect: "Your unit\u2019s melee attacks have +1 Attacks and Strength.",
          restrictions: "",
        },
        {
          name: "Faithful Fortitude",
          sublabel: "Sacred Champions – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Drawing upon their deep wells of piety, Sacresant elite can fight on even through overwhelming or eldritch assaults.",
          when: "Any phase, when a friendly CELESTIAN SACRESANTS unit suffers a mortal wound.",
          target: "That CELESTIAN SACRESANTS unit.",
          effect: "Your unit has Feel No Pain 5+ against mortal wounds until the end of the phase.",
          restrictions: "",
        },
        {
          name: "Unflinching Determination",
          sublabel: "Sacred Champions – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "These veteran warriors endure gruelling regimens to prepare them — physically and spiritually — to outlast, outmanoeuvre and outfight the foe at every turn.",
          when: "Your Movement phase, when a friendly CELESTIAN SACRESANTS unit is selected to make an Advance or Fall Back move.",
          target: "That CELESTIAN SACRESANTS unit.",
          effect: "▪ Your unit\u2019s ranged attacks have the [ASSAULT] ability until the end of the turn.\n▪ That move does not prevent your unit from being eligible to shoot or declare a charge.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Writ of Compunction",
          points: 20,
          upgrade: true,
          flavor: "Within this ornate cylindrical casket is a holy authorisation of the Ecclesiarch. Warriors in its presence tasked with a sacred duty are filled with righteous purpose, and the will to succeed no matter the odds.",
          body: "CELESTIAN SACRESANTS unit only. This unit has +1 Objective Control.",
        },
        {
          name: "Perfervid Haste",
          points: 10,
          flavor: "This warrior\u2019s passion to secure her quest is a lash wrought from her faith, which drives her sisters on at a relentless pace.",
          body: "ADEPTA SORORITAS model only. This unit has +1\" Move.",
        },
      ],
    },

    {
      id: "sanctified-orators",
      name: "Sanctified Orators",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Hymns of Battle",
        flavor: "On the battlefield, the faithful warriors of the Adepta Sororitas heed the stirring hymns recited by their commanders, whose inspirational words stoke their righteous fervour.",
        body: "▪ Enhancements selected from this detachment do not count towards the total number of enhancements in your army.\n▪ Friendly ADEPTA SORORITAS CHARACTER units have +1 Leadership.",
      },
      stratagems: [],
      enhancements: [
        {
          name: "Hagiomnifex",
          points: 25,
          upgrade: true,
          flavor: "A master of martial saintly lore, this vehement orator knows there is no form of enemy that the God-Emperor\u2019s holiest martyrs have not overcome. With vox-augmented sermonising, they roar the sacred hymns of the saints\u2019 deeds to embolden the faithful.",
          body: "ADEPTA SORORITAS CHARACTER unit only (excluding PENITENT units). (Once per turn, per unit) At the start of a phase, you can use this ability. If you do, select one of the abilities below:\n▪ **Rite of Revelation:** While this unit is shooting, enemy units have +6\" detection range.\n▪ **Sermon of Intolerance:** This unit\u2019s Battle-shock rolls automatically succeed.\n▪ **Catechism of Raging Fervour:** This unit has +1\" Move.\n▪ **Psalm of Righteous Smiting:** This unit\u2019s attacks have +1 Strength.\n▪ **Chorus of Repudiation:** Attacks that target this unit with a Strength greater than this unit\u2019s Toughness have -1 to Wound rolls.",
        },
      ],
    },
  ],

  datasheets: [],
}

export const adeptaSororitas = { en, ru: en }

