// Imperial Knights — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex.
//
//   Codex layer: imported from the Wahapedia CSV exports via scripts/import-wahapedia.mjs →
//     5 detachments (Freeblade Company, Gate Warden Lance, Questoris Companions,
//     Spearhead-At-Arms, Valourstrike Lance). Wahapedia already carries most pack updates;
//     the remaining diff (Tactical Foil 9"→8") is folded in below. Freeblade Company is
//     also printed in the Faction Pack (identical text) — marked source: 'faction-pack'.
//   Faction Pack v1.0 (sources/Faction pack 11 ed/imperium/IK.pdf) → 2 pack detachments
//     (Dominus Foebreakers, Throne-Bonded Outriders), a full rewrite of Questor Forgepact
//     (replaces the older 6-stratagem version) and Rules Updates.
//   MFM (src/data/mfm/imperial-knights.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the ARMIGERS `unique` tag.
//
// 8 detachments total, matching the MFM list. EN-first: `ru` reuses the same object for
// now. Markup follows useRenderInline / RuleBlock / StratCard conventions. Datasheets later.
const en = {
  slug: "imperial-knights",
  name: "Imperial Knights",

  // Faction-Pack Rules Update reworded the "We pledge to reap a great tally" Deed
  // (already reflected in the Wahapedia text below).
  armyRule: {
    id: 'code-chivalric',
    name: 'Code Chivalric',
    flavor:
      'Imperial Knights fight by a stringent set of codes. In addition to defeating the foe, honour must always be upheld.',
    body: `If your Army Faction is IMPERIAL KNIGHTS, at the end of the Read Mission Objectives step, you must determine your army's Oath for the coming battle. An Oath consists of two parts — one Deed and one Quality. There are three options for each part, shown below.

To determine your army's Deed, you can either select one Deed or you can randomly select one Deed by rolling a D6 and consulting the relevant table below. The selected Deed will describe what needs to be achieved in order to complete that Deed. To determine your army's Quality, you can either select one Quality or you can randomly select one Quality by rolling a D6 and consulting the relevant table below. Until the end of the battle, the ability described in the Quality selected applies to all models in your army with this ability.

The first time your selected Deed is completed your Oath is fulfilled and, until the end of the battle, your army becomes **Honoured** and you gain 2CP, or 3CP if you randomly selected your Deed and/or Quality (CP gained in this way are an exemption to the Core Rules that limit the maximum number of CP you can gain per battle round to 1).

### Deeds
▪ **We vow to lay low the tyrant…** — At the start of the battle, select one CHARACTER model in your opponent's army. This Deed is completed at the end of a turn if that CHARACTER is destroyed.
▪ **We swear to reclaim the realm…** — This Deed is completed at the end of your opponent's turn if you control more objective markers than your opponent.
▪ **We pledge to reap a great tally…** — This Deed is completed at the end of the battle round if the number of enemy units destroyed this battle round is greater than the battle round number, even if those units are subsequently returned to the battlefield (for example, two destroyed enemy units in the first battle round).

### Qualities
▪ **…with our martial valour risen over all.** — Each time this model is selected to shoot or fight, you can re-roll one Hit roll and you can re-roll one Wound roll.
▪ **…and we are eager for the challenge.** — Add 2" to this model's Move characteristic and add 1 to Advance and Charge rolls made for this model.
▪ **…yet shall our legacy be unsullied.** — Improve this model's Objective Control characteristic by 2 and its Leadership characteristic by 1.

### Bondsman
Some IMPERIAL KNIGHTS models have a Bondsman ability, tagged with the word 'Bondsman'. In your Command phase, one or more models from your army with a Bondsman ability can use that ability. For each one that does, select one friendly ARMIGER model within 12" of that model (you cannot select an ARMIGER model that is already being affected by a Bondsman ability). Until the start of your next Command phase, that ARMIGER model is affected by that Bondsman ability.

### Super-heavy Walker
Each time a model with this ability makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and sections of terrain features that are 4" or less in height. When doing so:
▪ It can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them.
▪ It can also move through sections of terrain features that are more than 4" in height, but if it does, after it has moved, roll one D6: on a 1, that model is Battle-shocked.

### Freeblades
If every model in your army has the IMPERIUM keyword, you can include either one TITANIC IMPERIAL KNIGHTS model or up to three ARMIGER models in your army, even if they do not have the Faction keyword you selected in the Select Army Faction step. None of these models can be your WARLORD, and they cannot be given Enhancements.`,
  },

  detachments: [
    // ─────────────── CODEX DETACHMENTS (via Wahapedia import) ───────────────
    {
      id: "freeblade-company",
      name: "Freeblade Company",
      source: 'faction-pack', // printed in the pack (identical to the Wahapedia text)
      dp: 3,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Knights of Legend",
        flavor: "Warriors such as these are truly indomitable. Driven on by deadly oaths, bolstered by ancient technology or shimmering with supernatural energies, they stride through the most punishing firestorms to emerge victorious on the other side.",
        body: "Imperial Knights models from your army have the Feel No Pain 6+ ability. In addition, at the start of your Command phase, each IMPERIAL KNIGHTS model from your army regains 1 lost wound.",
      },
      stratagems: [
        {
          name: "Strength from Exile",
          sublabel: "Freeblade Company – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Well used to a life without allies or fire support, Freeblades operate more effectively alone.",
          when: "Your Shooting phase or the Fight phase.",
          target: "One Imperial Knights unit from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack, if there are no other friendly units within 9\" of your unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
          restrictions: "",
        },
        {
          name: "Survivor of Strife",
          sublabel: "Freeblade Company – Epic Deed Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "The fires of war have steeled this Freeblade’s resolve.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Imperial Knights unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.",
          restrictions: "",
        },
        {
          name: "Noble Sacrifice",
          sublabel: "Freeblade Company – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Sensing their end drawing close, the scion overloads their Knight’s plasma core to take the enemy with them.",
          when: "Any phase.",
          target: "One Imperial Knights unit from your army that was just destroyed. You can target that unit with this Stratagem even though it was just destroyed.",
          effect: "Your unit’s Deadly Demise ability inflicts mortal wounds on a D6 roll of 4+, adding 1 to the result if it is an Armiger unit, instead of only a 6.",
          restrictions: "",
        },
        {
          name: "Flanking Manoeuvres",
          sublabel: "Freeblade Company – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Eager to earn glory, Knight Armigers focus on swiftly redeploying mid‑battle to flank the foe.",
          when: "End of your opponent’s Fight phase.",
          target: "One Armiger unit from your army that is within 9\" of one or more battlefield edges and not within Engagement Range of one or more enemy units.",
          effect: "Remove your unit from the battlefield and place it into Strategic Reserves.",
          restrictions: "",
        },
        {
          name: "Point-blank Barrage",
          sublabel: "Freeblade Company – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Few can withstand the point‑blank fury of a Knight.",
          when: "Your Shooting phase.",
          target: "One Imperial Knights unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, when making ranged attacks with Blast weapons, models in your unit can target enemy units within Engagement Range of your unit (provided no other friendly units are also within Engagement Range of that enemy unit). In addition, until the end of the phase, your unit does not suffer the penalty to its Hit rolls for being within Engagement Range of one or more enemy units, but each time a model in your unit makes an attack with a Blast weapon that targets a unit within Engagement Range of your unit, on an unmodified Hit roll of 1, your unit suffers 1 mortal wound after all of its attacks have been resolved.",
          restrictions: "",
        },
        {
          name: "Full Tilt",
          sublabel: "Freeblade Company – Wargear Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With the enemy before them, their Knight’s machine spirit snarling, and the rush of battle coursing through their veins, this scion pours power into their motive actuators and thunders forward.",
          when: "Your Movement phase.",
          target: "One Imperial Knights unit from your army.",
          effect: "Until the end of the phase, if your unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of models in your unit, or 9\" instead if your unit is an Armiger or Destrier unit.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Bringer of Justice",
          points: 30,
          flavor: "It is said that whenever this famed weapon is brought to life, it shall not fall silent until it has slaked its thirst for justice.",
          body: "Imperial Knights model only. Improve the Attacks characteristic of melee weapons equipped by the bearer by 2, and each time the bearer makes a melee attack, add 1 to the Hit roll.",
        },
        {
          name: "Hunter’s Eye",
          points: 25,
          flavor: "This remarkable data‑manifold surrounds a scion with holo‑projected bioscans and engine‑signature readouts, whose gaze penetrates the densest terrain as though it was not there.",
          body: "IMPERIAL KNIGHTS model only. Ranged weapons equipped by the bearer have the [IGNORES COVER] ability.",
        },
        {
          name: "Mysterious Guardian",
          points: 35,
          flavor: "Manifesting as though from nowhere, this Knight is an elemental force of vengeance against the Emperor of Mankind’s foes. At battle’s end, it disappears as mysteriously as it arrived.",
          body: "IMPERIAL KNIGHTS model only. (Once per battle, per army) At the end of your opponent’s turn, if this unit is unengaged, you can use this ability. If you do:\n▪ Place this unit in strategic reserves.\n▪ This unit has Deep Strike until the start of your next Shooting phase.\n▪ This unit must make an ingress move in your next Movement phase (including in your first turn).",
        },
        {
          name: "Sanctuary",
          points: 20,
          flavor: "Through the projection of rapidly modulating ion fields, this unique generator’s effects wreathe the suit in an all encompassing fog of protective energies that defend it from close‑quarters attacks.",
          body: "IMPERIAL KNIGHTS model only. The bearer has a 5+ invulnerable save.",
        },
      ],
    },

    {
      id: "gate-warden-lance",
      name: "Gate Warden Lance",
      source: 'codex',
      dp: 2,
      forceDisposition: "Priority Assets",
      rule: {
        name: "Dauntless Defenders",
        flavor: "With a rigid, strategic intuition born of the unyielding fortifications defended by their ancestors, the Nobles of a Gate Warden Lance hold their ground with an arrogant superiority. While even one defends the marches of their claimed realm, they will fight to the ends of their honour to hurl back the besiegers.",
        body: "At the start of the first battle round, select two objectives to be your foundations. Place a circular foundation marker in each one. When you draw a line from the closest part of one foundation marker to the closest part of the other, if any part of a model’s base (or any part of a model’s hull, for a model without a base) crosses that line, that model’s unit is said to be on your defensive line.\n\nWhile an IMPERIAL KNIGHTS unit from your army is on your defensive line, that unit has the following ability:\n\n**Against the Horde:** Each time a model in this unit makes an attack that targets a visible enemy unit, you can ignore any or all modifiers to the Hit roll, and weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.",
      },
      stratagems: [
        {
          name: "Steadfast Superiority",
          sublabel: "Gate Warden Lance – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Once tasked with preserving a war zone’s sanctity, a Knight will fight with unbowed destructive ferocity, unyielding in their anger while foes remain.",
          when: "Fight phase.",
          target: "One Imperial Knights unit from your army that is within Engagement Range of one or more enemy units, that is on your defensive line and that has not already been selected to fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Hit roll.",
          restrictions: "",
        },
        {
          name: "Drive Them Out!",
          sublabel: "Gate Warden Lance – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Drawing upon their indignant fury at a repugnant incursion into their realm, Nobles pilot their Knight suits in an aggressive purgation of the breach.",
          when: "Your Shooting phase or the Fight phase.",
          target: "One Imperial Knights unit from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit on your defensive line, an unmodified Hit roll of 5+ scores a Critical Hit.",
          restrictions: "",
        },
        {
          name: "Marshal the Defence",
          sublabel: "Gate Warden Lance – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "When the cry goes up to redress their defensive positions - to shut down incursions or leave assaulting enemies flat-footed and vulnerable - the Nobles pour power into their Knights’ servos.",
          when: "Your Movement phase.",
          target: "Up to two Imperial Knights units from your army that have not been selected to move this phase.",
          effect: "Until the end of the phase, add 3\" to the Move characteristic of models in your units.",
          restrictions: "",
        },
        {
          name: "Titanic Bombardment",
          sublabel: "Gate Warden Lance – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Like an imperious artillery captain atop their gatehouse, the Noble directs a deluge of apocalyptic firepower into the enemy's seething tides.",
          when: "Your Shooting phase.",
          target: "One Imperial Knights Titanic unit from your army that Remained Stationary this turn, that is on your defensive line and that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 2] ability.",
          restrictions: "",
        },
        {
          name: "Fortress of Intimidation",
          sublabel: "Gate Warden Lance – Epic Deed Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Rising like towering keeps armed with threatening weapons and inscribed with heraldry proclaiming bloody victories in countless campaigns, Imperial Knights are daunting prospects to engage.",
          when: "Start of your opponent’s Charge phase.",
          target: "One Imperial Knights Titanic unit from your army that is on your defensive line.",
          effect: "Until the end of the phase, each time an enemy unit selects your unit as a target of a charge, that unit must take a Battle-shock test, subtracting 1 from the result.",
          restrictions: "",
        },
        {
          name: "Lancebreaker",
          sublabel: "Gate Warden Lance – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "With a command, experienced Nobles can lock huge actuators into position, bring reserve power cells into wakefulness and shunt extra shielding into place to make their Knightly steed a bastion of defiance.",
          when: "Fight phase, just after an enemy unit has selected its targets.",
          target: "One Imperial Knights unit from your army that was selected as the target of one or more of the attacking unit’s attacks and is on your defensive line.",
          effect: "Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Acquisitor-at-Arms",
          points: 15,
          flavor: "This stern Noble serves their household by seizing territories and domains deemed the property of their lord. They are a grim and fearsome agent who inspires their charges with an unwillingness to relent.",
          body: "IMPERIAL KNIGHTS model only. While the bearer is on your defensive line and there are no enemy units on your defensive line, add the bearer’s Objective Control characteristic to that of each model affected by the bearer’s Bondsman ability.",
        },
        {
          name: "Purgation’s Hand",
          points: 20,
          flavor: "The Noble dubbed with this honourable title has sworn to purge the frontiers of their realm, scouring it clean of the stain of everything foul and inimical to the Code.",
          body: "IMPERIAL KNIGHTS model only. Each time the bearer makes a melee attack, if the bearer is on your defensive line, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
        },
        {
          name: "Augury Halo",
          points: 20,
          flavor: "This web of neuro-couplings has been worked into a richly ornamented helmet. Through it, the Noble pilot can access nearby hidden augur nodes deployed by servitor clades of the Sacristans, inloading targeting data to pick out the locations of shrouded besiegers.",
          body: "IMPERIAL KNIGHTS model only. Each time the bearer makes a ranged attack, while the bearer is on your defensive line, weapons equipped by the bearer have the [ignores cover] ability.",
        },
        {
          name: "Vengeful Tread",
          points: 15,
          flavor: "The punitive anger of this pilot towards those who dare defile their realm is terrifying to behold. War horns blaring, they barge and trample forward, crushing their lessers in a terminal lesson of humility.",
          body: "IMPERIAL KNIGHTS model only. Once per turn, you can target the bearer with the Tank Shock Stratagem for 0CP.",
        },
      ],
    },

    {
      id: "questoris-companions",
      name: "Questoris Companions",
      source: 'codex',
      dp: 3,
      forceDisposition: "Take and Hold",
      rule: {
        name: "Heroes of Legend & Valour’s Reward",
        flavor: "To those who quest for honour - in service to their liege, to avenge atrocities, to wipe clean the stain of disfavour - there can be no end. The Imperium’s foes are legion, an endless horde from which more arise. As one quest ends, another always begins.",
        body: "### Heroes of Legend\nAt the start of your turn, if your current Oath is fulfilled, determine an additional Oath as described in Army Rules, with the exception that you cannot select a Deed or Quality you have already selected (if you are randomly selecting the Deed and/or Quality and roll any result that you have already selected, select a Deed or Quality you have not already selected instead). If you cannot determine an additional Oath because you have already selected each Deed and each Quality, do not determine an additional Oath.\n\nThe Qualities from Oaths you have fulfilled continue to apply to all models in your army with the Code Chivalric ability. When the Deed for an additional Oath is completed, you instead gain 1CP, regardless of how you selected the Deed or Quality.\n\n### Valour’s Reward\nThe Enhancements in this detachment can become expended. You cannot use such Enhancements while they are expended. Each time you fulfil your Oath, each expended Enhancement is no longer expended.",
      },
      stratagems: [
        {
          name: "Courageous Stand",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "When the night is long and the unworthy claw at one's shield, it is chivalry and duty that buoy the soul and bolster failing strength.",
          when: "Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Imperial Knights Titanic unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 6+ ability.",
          restrictions: "",
        },
        {
          name: "Driven by the Past",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "To the worthiest Noble, the whispers that reach their mind from a Throne Mechanicum appear as a tapestry of virtues, standards they strive to meet with wholehearted alacrity.",
          when: "Your Charge phase.",
          target: "One Imperial Knights Titanic unit from your army.",
          effect: "Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Advanced.",
          restrictions: "",
        },
        {
          name: "Unstoppable Warrior",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "2CP",
          turn: "your",
          flavor: "Death is a distant priority when heroism's favour awaits. A breath to seize a new perspective, a new angle at which to tilt towards the foe, permits only a brief reprieve for the enemy of a true warrior.",
          when: "Your Movement phase, just after an Imperial Knights Titanic unit from your army Falls Back.",
          target: "That IMPERIAL KNIGHTS TITANIC unit.",
          effect: "Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
          restrictions: "",
        },
        {
          name: "Moment of Glory",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Veteran pilots waste no more time exalting their victory than the Code Chivalric demands before powering back into the fray with the long strides of the selflessly determined warrior Noble.",
          when: "Fight phase, just before an Imperial Knights Titanic unit from your army Consolidates.",
          target: "That IMPERIAL KNIGHTS TITANIC unit.",
          effect: "Until the end of the phase, each time your unit Consolidates, models in it can move an additional 3\" provided your unit can end that move within Engagement Range of one or more enemy units.",
          restrictions: "",
        },
        {
          name: "Hero’S Tread",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "It is said that unalloyed heroism can purge the foulest dishonour, that the very footsteps of those of noblest purity are enough to sanctify their path.",
          when: "End of your Command phase.",
          target: "One Imperial Knights Titanic model from your army that is within range of an objective marker you control.",
          effect: "Your Level of Control over that objective marker is 5 (unless it would otherwise be higher), until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: "",
        },
        {
          name: "Titanic Duel",
          sublabel: "Questoris Companions – Epic Deed Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The greatest Knightly champions suffer no dishonourable rival to insult them for long with their existence.",
          when: "Your Shooting phase or the Fight phase.",
          target: "One Imperial Knights Titanic model from your army that has not been selected to shoot or fight this phase.",
          effect: "Until the end of the phase, each time your model makes an attack that targets a MONSTER, TITANIC or WALKER unit, add 1 to the Hit roll and add 1 to the Wound roll.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Herald of Triumph",
          points: 15,
          flavor: "This Noble’s arrogant challenges herald a feat of victory, a promise of death that blares from their suit’s emitters.",
          body: "IMPERIAL KNIGHTS model only. When the bearer ends a Charge move, it can use this Enhancement. If it does, this Enhancement is expended, then each enemy unit within Engagement Range of the bearer must take a Battle-shock test, subtracting 1 from the result.",
        },
        {
          name: "Wyrmslayer Divination",
          points: 10,
          flavor: "Whispered to a Knights machine spirit before battle, this techno-omen prophesies doom for airborne foes.",
          body: "IMPERIAL KNIGHTS model only. In your Shooting phase, when the bearer is selected to shoot, it can use this Enhancement. If it does, this Enhancement is expended, then until the end of the phase, each time it makes an attack that targets a unit that can FLY, you can re-roll the Hit roll.",
        },
        {
          name: "Pennant of Silvered Fury",
          points: 15,
          flavor: "This circuit-etched pennant marks a slayer of hordes and is linked to a glowing electoo beneath the pilot’s skin.",
          body: "IMPERIAL KNIGHTS model only. When the bearer is selected to fight, it can use this Enhancement. If it does, this Enhancement is expended, then until the end of the phase, melee weapons equipped by the bearer have the [sustained hits 2] ability.",
        },
        {
          name: "Crushing Condemnation",
          points: 10,
          flavor: "With the sweep of an armoured limb, the Noble can cast wreckage and ruin towards yet another foe.",
          body: "IMPERIAL KNIGHTS model only. When the bearer is selected to fight, after resolving its attacks, if one or more enemy units were destroyed by those attacks, the bearer can use this Enhancement. If it does, this Enhancement is expended, then select one enemy unit that is not within Engagement Range of any units from your army and is within 12\" of and visible to the bearer. Roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.",
        },
      ],
    },

    {
      id: "spearhead-at-arms",
      name: "Spearhead-At-Arms",
      source: 'codex',
      dp: 2,
      forceDisposition: "Reconnaissance",
      unique: "ARMIGERS",
      rule: {
        name: "Knightly Teachings",
        flavor: "Knightly Nobles are exalted paragons of honour who uphold the tenets of the Code Chivalric and the glorious histories of their household. Through stern teachings and heroic tales, and no less their own deeds, they exemplify the virtues which Bondsmen aspire to emulate. It is not only in courtly life, upon the practice fields and during thrilling hunts that a Nobles squires and retainers cleave to their duty, but also in the fiery heart of every battle. There such teachings are tested as never before, and also find their most lauded expressions.",
        body: "Each time a model from your army uses its Bondsman ability, if no other model from your army has used that Bondsman ability that turn, you can select up to three friendly Armiger models (instead of one) within 12\" of that model, or within 15\" of that model while your army is Honoured (you still cannot select a model that is already being affected by a Bondsman ability). Until the start of your next Command phase, those models are affected by that Bondsman ability.\n\nKEYWORDS\nARMIGER models from your army gain the BATTLELINE keyword.",
      },
      stratagems: [
        {
          name: "Thin Their Ranks",
          sublabel: "Spearhead-At-Arms – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "A stentorian firing solution floods their Helms Mechanicum, and eager young Nobles shred their master's foes in a blizzard of fury.",
          when: "Start of your Shooting phase.",
          target: "One Armiger model from your army, or one Imperial Knights Titanic model from your army, and one or more friendly ARMIGER models affected by that model’s Bondsman ability.",
          effect: "Until the end of the phase, ranged weapons equipped by your ARMIGER models have the [RAPID FIRE 1] ability.",
          restrictions: "",
        },
        {
          name: "Exemplar’S Wisdom",
          sublabel: "Spearhead-At-Arms – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With a fusillade upon their chosen enemy, the Bondsmen's mentor lectures their loyal servants on the application offeree to the foe's weak points.",
          when: "Your Shooting phase, just after an Imperial Knights Titanic model from your army has shot.",
          target: "That IMPERIAL KNIGHTS TITANIC model, and one or more friendly Armiger models affected by that model’s Bondsman ability.",
          effect: "Select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time one of your ARMIGER models makes an attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1.",
          restrictions: "",
        },
        {
          name: "Virtue of Courage",
          sublabel: "Spearhead-At-Arms – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "A Knight must have the courage to face the greatest horrors of the galaxy, with duty focusing their blows.",
          when: "Start of the Fight phase.",
          target: "One Armiger model from your army, or one Imperial Knights Titanic model from your army, and one or more friendly ARMIGER models affected by that model’s Bondsman ability.",
          effect: "Select one enemy unit. Until the end of the phase, each time one of your ARMIGER models makes an attack that targets that enemy unit, add 1 to the Hit roll.",
          restrictions: "",
        },
        {
          name: "Let Duty Be Your Shield",
          sublabel: "Spearhead-At-Arms – Epic Deed Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Heeding the teachings of their Noble master, a Bondsman is reminded that only by enduring can they hope to discharge their sworn obligations.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Armiger unit from your army that was selected as the target of one or more of the attacking units attacks.",
          effect: "Until the end of the phase, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.",
          restrictions: "",
        },
        {
          name: "Mantle of the Mentor",
          sublabel: "Spearhead-At-Arms – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With a rapid volley of covering fire from a Noble liege, Bondsmen employ hit-and-run tactics at high speed.",
          when: "Start of your Shooting phase.",
          target: "One Armiger model from your army, or one Imperial Knights Titanic model from your army, and one or more friendly ARMIGER models affected by that model’s Bondsman ability.",
          effect: "Until the end of the phase, your ARMIGER models are eligible to shoot in a turn in which they Fell Back.",
          restrictions: "",
        },
        {
          name: "Squires of the Hunt",
          sublabel: "Spearhead-At-Arms – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "At a ritualised signal, Bondsmen encircle the foe to cut off escape, prowling onto unexpected attack routes.",
          when: "End of your opponent’s Fight phase.",
          target: "One Armiger model from your army, or one Imperial Knights Titanic model from your army, and one or more friendly ARMIGER models affected by that model’s Bondsman ability.",
          effect: "For each of your ARMIGER models that is within 9\" of one or more battlefield edges and not within Engagement Range of one or more enemy units, remove that ARMIGER model from the battlefield and place it into Strategic Reserves.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Mentor’s Pride",
          points: 20,
          flavor: "A draconian enforcer of stringent standards, when this stern Noble does acknowledge pride in their servants, their Bondsmen zealously strive to retain it.",
          body: "IMPERIAL KNIGHTS model only. While two or more Armiger models are under the effects of the bearer’s Bondsman ability, each time each of those ARMIGER models makes an attack, you can re-roll a Hit roll of 1.",
        },
        {
          name: "Fables of Nightmare",
          points: 10,
          flavor: "Many are the fiends and unnamed dooms that lead hosts of darkness in the oldest tales. Their retelling spurs this Noble’s Bondsmen to seek out the lurking commanders of the foe and cut them down, so that they may end the spread of their evil.",
          body: "IMPERIAL KNIGHTS model only. While two or more Armiger models are under the effects of the bearer’s Bondsman ability, melee weapons equipped by those ARMIGER models have the [precision] ability.",
        },
        {
          name: "Tales of Heroism",
          points: 10,
          flavor: "Recounting the valorous feats of legendary Nobles, this champion inspires their squires to deride and denounce the foes every attempt at evading a just execution.",
          body: "IMPERIAL KNIGHTS model only. While two or more Armiger models are under the effects of the bearer’s Bondsman ability, each time one of those ARMIGER models makes a melee attack, you can ignore any or all modifiers to the Hit roll and/or the Wound roll.",
        },
        {
          name: "Martial Tuition",
          points: 15,
          flavor: "Long has this Noble trained their Bondsmen in hunting the deadliest prey, instilling in them the skills to honourably exploit any opening in an enemy’s defence.",
          body: "IMPERIAL KNIGHTS model only. While two or more Armiger models are under the effects of the bearer’s Bondsman ability, once per turn, you can target one of those ARMIGER models with the Counter-offensive Stratagem for 0CP.",
        },
      ],
    },

    {
      id: "valourstrike-lance",
      name: "Valourstrike Lance",
      source: 'codex',
      dp: 2,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Bold Gallantry",
        flavor: "With their companions beside them - kin of their blood, allies in honour - Knightly Nobles are inspired to near-reckless heroism. Their fervour spreads through neural interfaces to reach the machine spirits of their towering Knight suits. The Knights’ power cores flare with motive energy. Target stabilisers sputter into life, glaring balefully at the foe. Servo-motors and fibre bundles thrum, powering the Nobles’ steeds to a thunderous speed, such that the ground trembles.",
        body: "Each time an Imperial Knights unit from your army Advances, until the end of the turn, ranged weapons equipped by IMPERIAL KNIGHTS models from your army have the [ASSAULT] ability.",
      },
      stratagems: [
        {
          name: "Full Tilt",
          sublabel: "Valourstrike Lance – Battle Tactic Stratagem",
          cp: "2CP",
          turn: "your",
          flavor: "With their fellows' oaths ringing through the vox-net and the rush of battle coursing through their veins, Noble pilots pour power into their steeds' motive actuators and thunder onwards.",
          when: "Your Movement phase.",
          target: "One Imperial Knights unit from your army that has not been selected to move this phase.",
          effect: "Until the end of the phase, add 2\" to the Move characteristic of your models and add 2 to Advance rolls made for those model’s units.",
          restrictions: "",
        },
        {
          name: "Thunderstomp",
          sublabel: "Valourstrike Lance – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The Noble brings their Knight suit’s weight down with the force of an industrial piledriver, trampling their honourless foes beneath their iron tread.",
          when: "Fight phase.",
          target: "One Imperial Knights model from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, the Attacks characteristic of any armoured Feet melee weapons equipped by your model is 8, the Attacks characteristic of any titanic Feet melee weapons equipped by your model is 12, and improve the Armour Penetration characteristic of those weapons by 1.",
          restrictions: "",
        },
        {
          name: "Vow of Retribution",
          sublabel: "Valourstrike Lance – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With the swearing of cooperative pacts, Knightly companions vow to visit annihilation on their enemies in a searing barrage of retributive firepower.",
          when: "Your Shooting phase.",
          target: "One Imperial Knights unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, ranged weapons equipped by your models have the [LETHAL HITS] ability.",
          restrictions: "",
        },
        {
          name: "Tactical Foil",
          sublabel: "Valourstrike Lance – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "The neural bond through their Throne Mechanicum enables seasoned pilots to accomplish swift counter-monoeuvres seemingly impossible for such towering war engines.",
          when: "Your opponent’s Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: "One Imperial Knights model from your army that is within 8\" of that unit.",
          effect: "Your model can make a Normal move of up to D6\".",
          restrictions: "",
        },
        {
          name: "Run Them Through!",
          sublabel: "Valourstrike Lance – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "With deafening challenges blaring from their emitters, honour-bound comrades slam into their foes, where the Nobles' martial prowess and their Knight suits’ overwhelming power are wedded to overcome the most monstrous resilience.",
          when: "Fight phase.",
          target: "One Imperial Knights unit from your army that has not been selected to fight this phase.",
          effect: "Until the end of the phase, melee weapons equipped by your models have the [LANCE] ability.",
          restrictions: "",
        },
        {
          name: "Rotate Ion Shields",
          sublabel: "Valourstrike Lance – Wargear Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Veteran Knight pilots can swiftly re-angle their ion shields and manipulate their energies to deflect incoming firepower.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Imperial Knights unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, models in your unit have a 4+ invulnerable save.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Bearer of the Iron Chalice",
          points: 20,
          flavor: "Deep within the Knight’s chassis is an ancient STC artefact. The device communes with its weakened machine spirit kin, bolstering their resolve to endure.",
          body: "IMPERIAL KNIGHTS model only. At the end of your Movement phase, select one other IMPERIAL KNIGHTS model from your army that is within 12\" of and visible to the bearer. That selected model regains up to D3 lost wounds, or up to 3 lost wounds if your army is Honoured.",
        },
        {
          name: "Bearer of the Evanescent Ion",
          points: 15,
          flavor: "This Knight’s ion shield projects a stream of nictitating particles that can obscure fellow Nobles from sight.",
          body: "IMPERIAL KNIGHTS model only. At the end of your Movement phase, select one other IMPERIAL KNIGHTS model from your army that is within 12\" of and visible to the bearer. Until the start of your next Movement phase, that selected model has the Stealth ability.",
        },
        {
          name: "Bearer of the Judicant’s Helm",
          points: 25,
          flavor: "A courtly counsellor against deception and a visionary hunter of lurking prey, this Noble’s sage advice unmasks the contemptible before their companions.",
          body: "IMPERIAL KNIGHTS model only. At the start of your Shooting phase, select one other IMPERIAL KNIGHTS model from your army that is within 12\" of and visible to the bearer. Until the end of the phase, ranged weapons equipped by that selected model have the [ignores cover] ability.",
        },
        {
          name: "Bearer of the Lancer’s Sigil",
          points: 25,
          flavor: "Honoured with a vivid heraldic insignia, this Noble is a wise mentor in the deadly art of battlefield intercession.",
          body: "IMPERIAL KNIGHTS model only. At the start of your Charge phase, select one other IMPERIAL KNIGHTS model from your army that is within 12\" of and visible to the bearer. Until the end of the phase, you can re-roll Charge rolls made for that selected model.",
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: "dominus-foebreakers",
      name: "Dominus Foebreakers",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Rain of Devastation",
        flavor: "Packing together within the confines of cover might work against small arms, but in the face of Dominus-class Knights, it only serves to concentrate and magnify the fury of their firepower.",
        body: "Friendly IMPERIAL KNIGHTS DOMINUS units\u2019 attacks that target a unit in a terrain area have +1 to Hit rolls.",
      },
      stratagems: [
        {
          name: "Ground-shaking Strides",
          sublabel: "Dominus Foebreakers – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Making the most of their Knightsuit\u2019s twinned reactor cores, the pilot pushes its motivator-units to their limits to gain a burst of speed.",
          when: "Your Movement phase, when a friendly IMPERIAL KNIGHTS DOMINUS unit is selected to move.",
          target: "That IMPERIAL KNIGHTS DOMINUS unit.",
          effect: "Your unit has +2\" M.",
          restrictions: "",
        },
        {
          name: "Foebreaker Firestorm",
          sublabel: "Dominus Foebreakers – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "It takes a skilled noble and a steady machine spirit to unleash such weaponry at point-blank range into closing enemy threats.",
          when: "Your Shooting phase, when a friendly engaged IMPERIAL KNIGHTS DOMINUS unit is selected to shoot.",
          target: "That IMPERIAL KNIGHTS DOMINUS unit.",
          effect: "Your unit\u2019s [BLAST] ranged attacks:\n▪ Do not have [BLAST].\n▪ Have +1 A.",
          restrictions: "",
        },
        {
          name: "Fire Shocked",
          sublabel: "Dominus Foebreakers – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "So thunderous is the fire of a Dominus-class Knight that even those who survive its salvoes are often reduced to shattered remnants cowering and praying for their lives.",
          when: "Your Shooting phase, when a friendly IMPERIAL KNIGHTS DOMINUS unit has shot.",
          target: "That IMPERIAL KNIGHTS DOMINUS unit.",
          effect: "Select one enemy unit hit by those attacks. That enemy unit makes a Battle-shock roll, with -1 to that Battle-shock roll.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Blessed Plate",
          points: 30,
          flavor: "Some of this Knight\u2019s hull plates are revered antiques, dating back millennia; their durability is a testament to the secrets of construction now lost to the mists of time.",
          body: "IMPERIAL KNIGHTS DOMINUS model only. This model has +1 T.",
        },
        {
          name: "Archeotech Autoloaders",
          points: 25,
          flavor: "These ancient and precious components are installed with great reverence; their function is to keep the Dominus-class Knight\u2019s guns firing with ferocious efficiency.",
          body: "IMPERIAL KNIGHTS DOMINUS model only. This unit can re-roll rolls to determine the A of a weapon.",
        },
      ],
    },

    // Faction Pack rewrote this detachment (the older version had 6 stratagems and
    // 4 enhancements; the pack version below replaces it entirely).
    {
      id: "questor-forgepact",
      name: "Questor Forgepact",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Disruption",
      rule: {
        name: "Cogbound Alliance",
        flavor: "The Nobles of Questor Mechanicus houses commonly fight alongside the armies of forge worlds. They are bound together by their shared devotion to the Machine Cult.",
        body: "Friendly IMPERIAL KNIGHTS models have the following ability:\n▪ **Assisted Targeting (Aura):** While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, that ADEPTUS MECHANICUS unit\u2019s ranged attacks have:\n▪ +1 BS.\n▪ [HEAVY].\n\nFriendly TECH-PRIEST models have the following ability:\n▪ **Sacristan Pledge:** In your Command phase, you can select one friendly IMPERIAL KNIGHTS model within 3\" of this model that has not been selected by this ability this phase. If you do, that model heals D3 wounds.\n\n**Mechanicus Allies:** You can include TECH-PRIEST DOMINUS/TECH-PRIEST MANIPULUS/MARSHAL/RANGERS/VANGUARD units in your army (see Codex: Adeptus Mechanicus). The combined points value of such units cannot exceed 500 points.",
      },
      stratagems: [
        {
          name: "Omnissiah's Grace",
          sublabel: "Questor Forgepact – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "So resolute is their faith that the Machine God\u2019s worshippers brave storms of killing fire, trusting in the Omnissiah to shield them from harm.",
          when: "Any phase, when a friendly IMPERIAL KNIGHTS unit suffers a mortal wound.",
          target: "That IMPERIAL KNIGHTS unit.",
          effect: "Your unit has Feel No Pain 5+ against mortal wounds.",
          restrictions: "",
        },
        {
          name: "Vengeance of the Machine Cult",
          sublabel: "Questor Forgepact – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Those who dare to fell the Machine God\u2019s creations find themselves subject to the vengeance of the Adeptus Mechanicus.",
          when: "Any phase, when a friendly IMPERIAL KNIGHTS TITANIC unit is destroyed by an enemy unit.",
          target: "One friendly ADEPTUS MECHANICUS unit.",
          effect: "That enemy unit is marked until the end of the battle: while a unit is marked, friendly ADEPTUS MECHANICUS units\u2019 attacks that target that unit can re-roll Wound rolls.",
          restrictions: "",
        },
        {
          name: "In the Shadow of Giants",
          sublabel: "Questor Forgepact – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "With the enemy distracted by battling the mighty Knights, the servants of the Omnissiah are free to complete crucial missions unimpeded.",
          when: "Your Movement phase, when a friendly ADEPTUS MECHANICUS unit is selected to make an Advance or Fall Back move.",
          target: "That ADEPTUS MECHANICUS unit.",
          effect: "That move does not prevent your unit from being eligible to start an Action.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Magos Questoris",
          points: 20,
          flavor: "An expert in the intricate mechanisms and weapons systems of Imperial Knights, this Tech-Priest taught Sacristans their craft. They now walk in the shadow of these war machines and make field repairs in the midst of battle.",
          body: "TECH-PRIEST model only. When using this model\u2019s Sacristan Pledge ability, the selected IMPERIAL KNIGHTS model heals 2 additional wounds.",
        },
        {
          name: "Knight of the Opus Machina",
          points: 15,
          aura: true,
          flavor: "A devotee of the Omnissian creed, this Noble is inspired by the presence of the Adeptus Mechanicus, fighting with greater zeal and vigour in their holy presence.",
          body: "IMPERIAL KNIGHTS model only. While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, that ADEPTUS MECHANICUS unit\u2019s melee attacks have +1 WS and AP.",
        },
      ],
    },

    {
      id: "throne-bonded-outriders",
      name: "Throne-Bonded Outriders",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Reconnaissance",
      unique: "ARMIGERS",
      rule: {
        name: "Driven from Their Lairs",
        flavor: "The moment the loyal bondsmen locate and identify the foe, they share targeting data-choristry with their ruling lords and ladies.",
        body: "While a friendly ARMIGER unit is affected by a Bondsman ability, that unit\u2019s ranged attacks have [IGNORES COVER].\n\nThis detachment has the **ARMIGERS** tag and cannot be taken with another **ARMIGERS** detachment.",
      },
      stratagems: [
        {
          name: "Neural Lash",
          sublabel: "Throne-Bonded Outriders – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Noble pilots have little time for panicked or despairing bondsmen, and think nothing of enforcing stoic obedience by way of stinging neural compulsion.",
          when: "Command phase.",
          target: "One friendly IMPERIAL KNIGHTS TITANIC unit.",
          effect: "Select one friendly Battle-shocked ARMIGER unit within 12\" of your unit. That ARMIGER unit is no longer Battle-shocked.",
          restrictions: "",
        },
        {
          name: "Helm Conditioning",
          sublabel: "Throne-Bonded Outriders – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Some longer-serving bondsmen become so conditioned to efficient obedience by their Helm Mechanicum that they can be issued neural commands from ever-greater distances.",
          when: "Your Command phase, when a friendly IMPERIAL KNIGHTS unit uses a Bondsman ability.",
          target: "That IMPERIAL KNIGHTS unit.",
          effect: "When selecting an ARMIGER model for that Bondsman ability, you can select one within 18\" of your unit (excluding models already affected by a Bondsman ability).",
          restrictions: "",
        },
        {
          name: "Honoured to Serve",
          sublabel: "Throne-Bonded Outriders – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Determined to prove worthy of a place in battle alongside their supposed betters, bondsmen jump to obey every command issued by their rulers.",
          when: "Your Shooting phase, when a friendly ARMIGER unit has shot.",
          target: "That ARMIGER unit.",
          effect: "Those attacks do not prevent your unit from being eligible to start an Action.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Gyro-optimised Actuators",
          points: 15,
          upgrade: true,
          flavor: "Flowing down the neural tether between Thrones and Helms Mechanicum, the faint whispering of ancestral gheists drives bondsmen on to greater urgency.",
          body: "ARMIGER unit only. This unit has MOBILE.",
        },
        {
          name: "Ancestral Overbleed",
          points: 10,
          upgrade: true,
          flavor: "Though it requires additional work by the Sacristans, when Armigers are to be used like hunting hounds amidst dense terrain, it is considered worthwhile to enhance their steeds\u2019 agility.",
          body: "ARMIGER unit only. When you target this unit with the Fire Overwatch/Heroic Intervention Stratagem, that use is -1 CP.",
        },
      ],
    },
  ],

  datasheets: [],
}

export const imperialKnights = { en, ru: en }

