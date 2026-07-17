// Black Templars — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex > Index.
//
//   Codex: Black Templars (sources/codex/cm/BlackTemplars.pdf) → army rule (Templar Vows,
//     which REPLACES Oath of Moment for a Black Templars army) + 3 base detachments
//     (Companions of Vehemence, Vindication Task Force, Godhammer Assault Force).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/cm/BlackTemplars.pdf) → 3 extra detachments
//     (Marshal's Household, The Living Miracle, Wrathful Procession) + Rules Updates.
//   MFM (src/data/mfm/black-templars.js) → per-enhancement points, per-detachment dp /
//     forceDisposition.
//
// 6 Black-Templars-specific detachments. Black Templars armies can ALSO field the Codex:
// Space Marines detachments (Gladius, Anvil Siege, Ironstorm, etc. — except 1st Company Task
// Force); those live in space-marines.js and are not duplicated here.
//
// Faction-Pack "Rules Updates" have been folded into the army rule / codex detachment rules /
// stratagems (they are the authoritative newer wording) — see inline notes. Unlike other SM
// Chapters, a Black Templars army loses Oath of Moment entirely (replaced by Templar Vows).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions); swap in
// a translated object later. Markup follows useRenderInline / RuleBlock / StratCard
// conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines,
// `### ` subheadings. Datasheets are a later pass (`datasheets`).

// Every Black Templars detachment prints the same chapter-lock restriction in its rule box.
const chapterLock =
  '\n\n**Restrictions:** Your army can include Black Templars units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.'

const en = {
  slug: 'black-templars',
  name: 'Black Templars',

  // Templar Vows replaces Oath of Moment for a Black Templars army (see Heirs of Sigismund).
  // Faction-Pack Rules Update rewrote the "Abhor the Witch, Destroy the Witch" Vow.
  armyRule: {
    id: 'templar-vows',
    name: 'Templar Vows',
    flavor:
      'On the eve of battle, the Black Templars gather to be led in prayer and contemplation by their champions. United in their hatred of the foe, they swear a mighty vow to uphold in the battle ahead.',
    body: `If your [gloss:army-faction:Army Faction] is Adeptus Astartes, at the start of the first [gloss:battle-round:battle round], select one of the following [gloss:bt-templar-vow:Vows] to be active for Adeptus Astartes units from your army. While a Vow is active for a unit from your army, that unit has the associated ability shown below.

### Abhor the Witch, Destroy the Witch
This unit's [gloss:melee-attacks:melee attacks] that target a [gloss:psyker:Psyker] unit have the [PRECISION] ability. In addition, when this unit [gloss:declare-charge:declares a charge], if an enemy Psyker unit is [gloss:within:within] 12" of this unit, you can [gloss:re-roll:re-roll] that [gloss:charge-roll:Charge roll]; if you do, this unit must end that [gloss:charge-move:charge move] [gloss:engaged:engaged] with one or more of those enemy Psyker units.

### Accept Any Challenge, No Matter the Odds
Each time a model in this unit makes a melee attack, if the [gloss:strength:Strength] characteristic of that attack is less than or equal to the [gloss:toughness:Toughness] characteristic of the target, add 1 to the [gloss:wound-roll:Wound roll].

### Suffer Not the Unclean to Live
This unit is [gloss:eligible-to-charge:eligible to declare a charge] in a turn in which it [gloss:fall-back-move:Fell Back], and each time a model in this unit makes a [gloss:pile-in:Pile-in] or [gloss:consolidation:Consolidation] move, it does not need to end that move closer to the closest enemy model, provided it ends that move as close as possible to the closest enemy unit.

### Uphold the Honour of the Emperor
If this unit has the Infantry keyword: At the end of your Command phase, if this unit is within range of an [gloss:objective-marker:objective marker] you control, that objective marker remains under your control until your opponent's [gloss:level-of-control:Level of Control] over that objective marker is greater than yours at the end of a phase. In addition, if the mission you are playing features [gloss:action:Actions], this unit is eligible to start to perform an Action in a turn in which it [gloss:advance:Advanced].

**Heirs of Sigismund:**
▪ If an Adeptus Astartes unit has a second [gloss:faction-keyword:Faction keyword] on its [gloss:datasheet:datasheet], that Faction keyword is the name of that unit's Chapter (e.g. High Marshal Helbrecht has both the Adeptus Astartes and Black Templars keywords, and is from the Black Templars Chapter).
▪ You cannot include units from more than one Chapter in your army.
▪ If your army includes one or more units from the Black Templars Chapter (or you use one of the Black Templars Detachments): Adeptus Astartes units from your army lose the Oath of Moment army rule (if they have it), and it is replaced with the Templar Vows army rule; you cannot use the 1st Company Task Force Detachment (see Codex: Space Marines); your army cannot include any Adeptus Astartes Psyker models; and your army cannot include the following Codex: Space Marines datasheets: Gladiator Lancer, Gladiator Reaper, Gladiator Valiant, Impulsor, Land Raider Crusader, Repulsor, Repulsor Executioner, Sternguard Veteran Squad, Terminator Squad.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'companions-of-vehemence',
      name: 'Companions of Vehemence',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Righteous Fervour',
        flavor:
          "With their zealous hatred stoked red-hot by furious sermons and inflammatory prayers, Companions of Vehemence are filled with a wrathful vigour. Only the deaths of the God-Emperor's enemies can assuage their fury, and they will let nothing delay them from unleashing it.",
        body: `You can [gloss:re-roll:re-roll] [gloss:advance-roll:Advance] and [gloss:charge-roll:Charge rolls] made for Adeptus Astartes units from your army.${chapterLock}`,
      },
      stratagems: [
        {
          name: 'Devout Push',
          sublabel: 'Companions of Vehemence – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "With a zealous cry, the Black Templars press forward, using their ceramite-armoured bulk to smash into the foe and overwhelm the enemy's lines.",
          when: 'Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a [gloss:pile-in:Pile-in] or [gloss:consolidation:Consolidation] move, it can move up to 6" instead of up to 3".',
          restrictions: 'A unit cannot be targeted with this and the Hearts Hardened to Duty Stratagem in the same phase unless it has the Chaplain or Judiciar [gloss:keywords:keywords].',
        },
        {
          name: 'Hearts Hardened to Duty',
          sublabel: 'Companions of Vehemence – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'To suffer not blind aggression is to evade the snares of foul deceit and honourably reject self-aggrandisement.',
          when: 'Fight phase, just before an Adeptus Astartes Infantry unit from your army [gloss:consolidation:Consolidates].',
          target: 'That Adeptus Astartes Infantry unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Consolidation move, it does not need to end that move closer to the closest enemy model (or the closest enemy unit if the Suffer Not the Unclean to Live [gloss:bt-templar-vow:Vow] is active for it).',
          restrictions: '',
        },
        {
          name: "For the Emperor's Honour!",
          sublabel: 'Companions of Vehemence – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Filled with the spirit of Sigismund, his heirs seek out the foe's dark and unclean champions so that they may be crushed in the sight of their thralls.",
          when: 'Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: 'Until the end of the phase, [gloss:melee-weapons:melee weapons] equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
        {
          name: 'Pious Enmity',
          sublabel: 'Companions of Vehemence – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "The warrior priests of a crusade drive Sigismund's heirs into the heart of battle, daring the greatest abominations to face their spiritual strength.",
          when: 'Fight phase.',
          target: 'One Chaplain or Judiciar unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a [gloss:melee-attacks:melee attack] that targets an enemy unit, [gloss:re-roll:re-roll] a [gloss:hit-roll:Hit roll] of 1. If that target is a Monster or Vehicle unit, re-roll a [gloss:wound-roll:Wound roll] of 1 as well.',
          restrictions: '',
        },
        {
          name: 'Heresy Begets Retribution',
          sublabel: 'Companions of Vehemence – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Where enemies dare threaten the warriors of the God-Emperor or seek to escape their deserved death, there must be swift retribution.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a [gloss:normal-move:Normal], [gloss:advance-move:Advance] or [gloss:fall-back-move:Fall Back] move.",
          target: 'One Chaplain or Judiciar unit from your army that is [gloss:within:within] 9" of that enemy unit and is not within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
          // Faction-Pack Rules Update rewrote the Effect (was a longer "Retribution move").
          effect: 'Your unit can make a [gloss:surge-move:surge move] of up to D6".',
          restrictions: '',
        },
        {
          name: 'Dread Crusaders',
          sublabel: 'Companions of Vehemence – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "To face the Emperor's transhuman crusaders as they chant their litanies of detestation can chill the soul.",
          when: "Your opponent's Charge phase, just after an enemy unit [gloss:declare-charge:declares a charge].",
          target: 'One Adeptus Astartes Infantry unit from your army that was selected as one of the targets of that charge.',
          effect: 'That enemy unit must take a [gloss:battle-shock-test:Battle-shock test], subtracting 1 from the result.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Incendiary Animus',
          points: 25,
          flavor: "This inspirational warrior exudes fierce contempt and loathing for the Emperor's foes, inciting such apoplectic revulsion in their battle-brothers as to drive their blows with vicious strength.",
          body: `Chaplain or Judiciar model only. Improve the [gloss:armour-penetration:Armour Penetration] characteristic of [gloss:melee-weapons:melee weapons] equipped by models in the [gloss:bearer:bearer]'s unit by 1.`,
        },
        {
          name: 'Merciless Denunciation',
          points: 25,
          flavor: 'Through roared words or ruthless deeds, may the blasphemous be denounced and the worthy driven into a furious rage of sanctified slaughter.',
          body: `Chaplain or Judiciar model only. Each time a model in the [gloss:bearer:bearer]'s unit makes a [gloss:melee-attacks:melee attack], you can [gloss:re-roll:re-roll] the [gloss:hit-roll:Hit roll].`,
        },
        {
          name: 'Oathbound Exemplar',
          points: 15,
          flavor: 'With a ceaseless and booming oratory, this commander exhorts his warriors in their duty to the Emperor. Honour, he declaims, must be pursued relentlessly.',
          body: `Adeptus Astartes Infantry model only. Add 1 to [gloss:advance-roll:Advance rolls] made for the [gloss:bearer:bearer]'s unit. If the mission pack you are playing features [gloss:action:Actions], the bearer's unit is eligible to start to perform an Action in a turn in which it [gloss:advance:Advanced].`,
        },
        {
          name: 'Zealous Vanguard',
          points: 20,
          flavor: "This warrior is an unstoppable crusader whose hearts burn like twin pyres of eager zeal. Ever at the forefront of combat, he leads his warriors as the tip of the crusade's blade.",
          body: `Adeptus Astartes model only. Models in the [gloss:bearer:bearer]'s unit have the [gloss:scouts:Scouts] 6" ability.`,
        },
      ],
    },

    {
      id: 'vindication-task-force',
      name: 'Vindication Task Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Purge and Sanctify',
        flavor:
          "As the battle-brothers of a Vindication Task Force purge the Emperor's domain in fire and blood, they see their holy quest as recovering Humanity's rightful dominion. They scour the stain of the unclean, topple false idols, breach strongholds of unholy faith and plant the crusades' standards in their place, branding such sites with the sacred icons of their brotherhood.",
        // Faction-Pack Rules Update rewrote the second bullet point.
        body: `▪ Each time an attack targets an Ancient unit from your army, if that unit is within range of one or more [gloss:objective-marker:objective markers] and the [gloss:strength:Strength] characteristic of that attack is greater than the [gloss:toughness:Toughness] characteristic of that unit, subtract 1 from the [gloss:wound-roll:Wound roll].
▪ Each time a [gloss:friendly:friendly] Crusader Squad unit makes a [gloss:surge-move:surge move], instead of selecting a [gloss:surge-target:surge target], you can select the closest [gloss:objective:objective] to that unit. When that unit makes that surge move, each model in that unit must end that surge move as close as possible to that objective instead.${chapterLock}`,
      },
      stratagems: [
        {
          name: 'Refusal to Yield',
          sublabel: 'Vindication Task Force – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Where honour is upheld, the Emperor's divinity may manifest to grant his pious warrior new strength.",
          when: 'Any phase, just after an Ancient model from your army is [gloss:destroyed:destroyed].',
          target: 'That Ancient model. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'At the end of the phase, set your model back up on the battlefield, as close as possible to where it was destroyed and not within [gloss:engagement-range:Engagement Range] of one or more enemy units, with its full [gloss:wounds:wounds] remaining.',
          restrictions: 'You cannot target the same model with this Stratagem more than once per battle.',
        },
        {
          name: 'Litanies of Purgation',
          sublabel: 'Vindication Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Where the Emperor's domain is imperilled by the unholy, the Black Templars vow to cleanse it.",
          when: 'Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes an attack, if that model's unit is within range of one or more [gloss:objective-marker:objective markers] or the target unit is within range of one or more objective markers, improve the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1.",
          restrictions: '',
        },
        {
          name: 'Spoor of the Unholy',
          sublabel: 'Vindication Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Perhaps guided by visions from the Emperor, Black Templars can pick out heresy wherever it lurks.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] or fight this phase.',
          effect: "Until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in your unit have the [IGNORES COVER] ability and each time a model in your unit makes an attack, you can ignore any or all [gloss:modifier:modifiers] to the following: that attack's [gloss:ballistic-skill:Ballistic Skill] or [gloss:weapon-skill:Weapon Skill] characteristic; the [gloss:hit-roll:Hit roll].",
          restrictions: '',
        },
        {
          name: 'Reclaim Our Honour!',
          sublabel: 'Vindication Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "The sacred standards of a crusade embody its warriors' honour, and no one would see them lost.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit destroys an Ancient model from your army that has not been targeted with the Refusal to Yield Stratagem this phase.",
          target: 'One Adeptus Astartes unit from your army [gloss:visible:visible] to that enemy unit.',
          effect: 'Until the end of the battle, each time an Adeptus Astartes model from your army makes an attack that targets that enemy unit, add 1 to the [gloss:hit-roll:Hit roll].',
          restrictions: 'You cannot target that Ancient model with the Refusal to Yield Stratagem this phase.',
        },
        {
          name: 'Recitation of the Revered',
          sublabel: 'Vindication Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The Ancient leads a deafening recital of his banner's honours, the projected chant's zeal shaking the foe.",
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One Ancient unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the [gloss:hit-roll:Hit roll].',
          restrictions: '',
        },
        {
          name: 'Perfervid Intervention',
          sublabel: 'Vindication Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'When the Emperor blesses his crusaders with the opportunity to seize the initiative, none refuse.',
          when: "End of your opponent's Charge phase.",
          target: 'One Adeptus Astartes unit from your army that is [gloss:within:within] 6" of one or more enemy units and would be [gloss:eligible-to-charge:eligible to declare a charge] against one or more of those enemy units if it were your Charge phase.',
          effect: 'Your unit now [gloss:declare-charge:declares a charge] that only targets one or more of those enemy units, and you resolve that charge.',
          restrictions: 'Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
        },
      ],
      enhancements: [
        {
          name: 'Consecrating Aura',
          points: 25,
          flavor: "The piety and honour of this warrior can be felt wherever he fights. His presence rouses the ardent souls of the Black Templars, warding Sigismund's heirs from the blasphemy of the unbeliever.",
          body: `Adeptus Astartes model only. Models in the [gloss:bearer:bearer]'s unit have a 5+ [gloss:invulnerable-save:invulnerable save].`,
        },
        {
          name: 'Imperialis of the Eternal Crusade',
          points: 15,
          flavor: 'This gleaming finial is said to have once topped Terra\'s holiest spire and been gifted by the third Ecclesiarch to the High Marshal. It radiates an imperious superiority, buffeting impure minds with bellicose neural suppression until those who mean the bearer ill are left staggering.',
          body: `Ancient model only. Each time an enemy unit selects the [gloss:bearer:bearer]'s unit as a target of a charge, subtract 2 from the [gloss:charge-roll:Charge roll] (this is not cumulative with any other negative [gloss:modifier:modifiers] to that Charge roll).`,
        },
        {
          name: "Orb of the Emperor's Aegis",
          points: 10,
          flavor: "When activated, this icon-wreathed sphere briefly emits a glowing nimbus of protective energy so powerful that it can hold back the corruptive fury of the naked Warp. Thus shielded, Black Templars may use their fleets' teleportarium shrines even without the awesome protection of Terminator armour.",
          body: `Adeptus Astartes model only. Models in the [gloss:bearer:bearer]'s unit have the Deep Strike ability.`,
        },
        {
          name: 'Warden of Honour',
          points: 20,
          flavor: "This lauded guardian is trusted with the stewardship of the crusades' most precious standards. His unyielding presence and preservation of his charge amidst fire and heresy inspire his brothers to acts of extreme heroism.",
          body: `Crusade Ancient model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, each time you roll one D6 for the bearer's Vengeful Exhortation ability, add 1 to the result.`,
        },
      ],
    },

    {
      id: 'godhammer-assault-force',
      name: 'Godhammer Assault Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Shock and Awe',
        flavor:
          "An armoured assault by the crusaders of the Emperor is terrifying to behold. The doomed enemy are pummelled by heavy weapons fire and deafened by the roar of engine spirits in the moments before the strike falls, their comrades crushed by heavy treads. When the assault ramps slam down and the Black Templars storm forth, what little cohesion their foes retain melts away before the crusaders' holy wrath.",
        body: `▪ Each time an Adeptus Astartes unit from your army [gloss:declare-charge:declares a charge], if it [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn, after selecting the targets of that charge, select one of those targets; that enemy unit must take a [gloss:battle-shock-test:Battle-shock test].
▪ Each time a model in an Adeptus Astartes unit from your army makes a [gloss:melee-attacks:melee attack], if it disembarked from a Transport this turn, add 1 to the [gloss:hit-roll:Hit roll].${chapterLock}`,
      },
      stratagems: [
        {
          name: 'A Ceaseless Cause',
          sublabel: 'Godhammer Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'There is no room for hesitation or exultation for the Black Templars. With one knot of blasphemy expunged, the crusaders surge in search of the next.',
          when: 'End of the Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that was [gloss:eligible-to-fight:eligible to fight] this phase.',
          effect: 'If your unit is not within [gloss:engagement-range:Engagement Range] of one or more enemy units, it can make a [gloss:normal-move:Normal move] of up to 6". It cannot [gloss:embark:embark] within a [gloss:transport:Transport] at the end of this move if it [gloss:disembark:disembarked] from a Transport this turn.',
          restrictions: '',
        },
        {
          name: 'Focused Hatred',
          sublabel: 'Godhammer Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Surging from assault ramps, the Black Templars let nothing bar them from the most unholy threats, using their armoured might to bludgeon a path into battle.',
          when: 'Your Charge phase, just after you make a [gloss:charge-roll:Charge roll] for an Adeptus Astartes unit from your army that [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn.',
          target: 'That Adeptus Astartes unit.',
          effect: 'Until the end of the phase, each time your unit makes a [gloss:charge-move:Charge move], models in your unit can move through models (when doing so, its models can move within [gloss:engagement-range:Engagement Range] of enemy models, but they can only end that move within Engagement Range of enemy models if those enemy models belong to a unit that your unit [gloss:declare-charge:declared a charge] against this turn).',
          restrictions: '',
        },
        {
          name: 'Uncompromising Egress',
          sublabel: 'Godhammer Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Little can threaten to overwhelm the venerable Land Raider. Its multiple, hydraulically augmented assault ramps slam into closing aggressors, enabling its deadly cargo to deploy quickly.',
          when: 'Your Movement phase.',
          target: 'One Land Raider model from your army that has not been [gloss:selected-to-move:selected to move] this phase.',
          effect: 'One Adeptus Astartes unit [gloss:embarked:embarked] within your Land Raider can [gloss:disembark:disembark]. When doing so, models in that unit can be set up anywhere on the battlefield [gloss:wholly-within:wholly within] 6" of your Land Raider and can be set up within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
          restrictions: '',
        },
        {
          name: 'Gauntlet of the God-Emperor',
          sublabel: 'Godhammer Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Like the mailed fist of the Master of Mankind, the crusade's armoured battle tanks, transports and combat walkers smash their way through choked war zones to reach those deserving execution.",
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Vehicle model from your army that has not been [gloss:selected-to-move:selected to move] this phase.',
          effect: 'Until the end of the phase, each time your model makes a [gloss:normal-move:Normal] or [gloss:advance-move:Advance] move, it can move horizontally through [gloss:terrain-feature:terrain features].',
          restrictions: '',
        },
        {
          name: 'Condemnatory Info-screed',
          sublabel: 'Godhammer Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Prepared within their troop compartment by a broadcast litany of their foe's ungodly sins, the crusaders emerge with their hearts full of hatred.",
          when: 'Your Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if it [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn, [gloss:re-roll:re-roll] a [gloss:wound-roll:Wound roll] of 1. If that Transport has the Land Raider [gloss:keywords:keyword], you can re-roll the Wound roll instead.',
          restrictions: '',
        },
        {
          name: 'Blessed Hull',
          sublabel: 'Godhammer Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Their hulls blessed by the chants of Techmarines and their prayer-servitors, a crusade's war engines can be entreated to withstand the most malign attacks.",
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One Adeptus Astartes Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Paragon of Fury',
          points: 25,
          flavor: "This crusader's hatred for the heretic and the unbeliever burns with the fury of a newborn star.",
          body: `Adeptus Astartes model only. Add 2 to the [gloss:strength:Strength] characteristic of [gloss:melee-weapons:melee weapons] equipped by the [gloss:bearer:bearer]. Each time a [gloss:melee-attacks:melee attack] made by the bearer is allocated to an enemy model, if the bearer [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn, add 1 to the Damage characteristic of that attack.`,
        },
        {
          name: 'Battle-Psalm Precentor',
          points: 10,
          flavor: 'The chanted oratory of this commander rises in volume and stentorian vehemence as he leads his brothers into the charge until he seems like a wrathful war deity closing with his ungodly prey.',
          body: `Adeptus Astartes model only. Each time the [gloss:bearer:bearer]'s unit [gloss:declare-charge:declares a charge], if an enemy unit takes a [gloss:battle-shock-test:Battle-shock test] as a result of the Shock and Awe [gloss:detachment-rule:Detachment rule], subtract 1 from that Battle-shock test.`,
        },
        {
          name: 'Augury Servo-Host',
          points: 15,
          flavor: "This warrior's auto-senses are linked to a circling host of servo-skulls crafted from the remains of favoured serfs and failed neophytes. Fitted with ocular probes and sensor vanes, they provide the Black Templar with advanced targeting information to pick out the unbelievers who cower in concealment.",
          body: `Adeptus Astartes model only. At the start of your Shooting phase, select one enemy unit [gloss:within:within] 12" of and [gloss:visible:visible] to the [gloss:bearer:bearer]. Until the end of the phase, models in that unit cannot have the [gloss:benefit-of-cover:Benefit of Cover].`,
        },
        {
          name: 'Herald of Sacred Slaughter',
          points: 15,
          flavor: "A pious harbinger of the crusade's destructive potential, this warrior pushes forward at the first opportunity, eager to bring the Emperor's judgement to the foe.",
          body: `Adeptus Astartes model only. In the [gloss:declare-battle-formations:Declare Battle Formations] step, if the [gloss:bearer:bearer] starts the battle [gloss:embarked:embarked] within a Dedicated Transport, that Dedicated Transport has the [gloss:scouts:Scouts] 9" ability.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'marshals-household',
      name: "Marshal's Household",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Faith-Fuelled Resolve',
        flavor:
          "Uncompromising in their faith, a crusade's Sword Brethren are blazing beacons of intolerant resolve capable of holding back hordes of blasphemous foes from sites sacred to the Black Templars.",
        body: `[gloss:friendly:Friendly] Sword Brethren Squad units have +1 [gloss:objective-control:Objective Control].${chapterLock}`,
      },
      stratagems: [
        {
          name: 'Slayers of Abominations',
          sublabel: "Marshal's Household – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: "The largest manifestations of the foe's sin are branded unholy abominations, challenges which a crusade's champions gladly meet to drive their sanctified weapons deeply beneath their hides.",
          when: 'Fight phase, when a [gloss:friendly:friendly] Sword Brethren Squad unit is [gloss:selected-to-fight:selected to fight].',
          target: 'That Sword Brethren Squad unit.',
          effect: "Your unit's [gloss:melee-attacks:melee attacks] that target a Monster or Vehicle unit have +2 [gloss:strength:Strength].",
          restrictions: '',
        },
        {
          name: 'Blade of Detestation',
          sublabel: "Marshal's Household – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'With roared litanies and incendiary hatred, the Sword Brethren plunge into their foe like a white-hot blade, their armoured momentum cracking armour, crushing bones, and trampling the foe underfoot.',
          when: 'Your Charge phase, when a [gloss:friendly:friendly] Sword Brethren Squad unit ends a [gloss:charge-move:charge move].',
          target: 'That Sword Brethren Squad unit.',
          effect: 'Select one enemy unit [gloss:engaged:engaged] with your unit. Roll one D6 for each model in your unit engaged with that enemy unit: for each 4+, that enemy unit suffers 1 [gloss:mortal-wound:mortal wound] (to a maximum of 6 mortal wounds).',
          restrictions: '',
        },
        {
          name: 'Unsparing Execution',
          sublabel: "Marshal's Household – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: "Those who attempt to flee their rightful death only stoke their executioners' hatred all the hotter. None can be spared the God-Emperor's wrath.",
          when: "Your opponent's Movement phase, when a unit is selected to make a [gloss:fall-back-move:Fall Back] move, if that unit is [gloss:engaged:engaged] with a [gloss:friendly:friendly] Sword Brethren Squad unit.",
          target: 'That Sword Brethren Squad unit.',
          effect: 'When an enemy unit engaged with your unit is selected to make a Fall Back move, that enemy unit must use the [gloss:desperate-escape:Desperate Escape] mode, subtracting 1 from those Desperate Escape tests if that enemy unit is [gloss:battle-shocked:Battle-shocked].',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Fervent Exemplars',
          points: 10,
          upgrade: true,
          flavor: "Paragons of their crusade's inexorable wrath, these Sword Brethren have earned a reputation for carving a path to victory through their foes, unable to rest while one enemy yet lives.",
          body: `Sword Brethren Squad unit only. This unit has +1 to [gloss:charge-roll:Charge rolls].`,
        },
        {
          name: 'Inheritors of Sigismund',
          points: 15,
          upgrade: true,
          flavor: "These warrior elites have achieved feats of bloody slaughter against the most deadly of the God-Emperor's foes, executing them in displays of such blisteringly swift attacks that it is clear they share a sliver of Sigismund's own skill.",
          body: `Sword Brethren Squad unit only. This unit has [gloss:fights-first:Fights First].`,
        },
      ],
    },

    {
      id: 'the-living-miracle',
      name: 'The Living Miracle',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Anointed Champion',
        flavor:
          "The warrior anointed as Emperor's Champion by a crusade's Chaplains is marked as such by the divine omens which assail him. With these visions as a guide, and having devoted what remains of his existence to the rigorous perfection of the blade, the Emperor's Champion becomes a force of righteous and unerring destruction.",
        body: `▪ When a [gloss:friendly:friendly] Emperor's Champion unit is [gloss:selected-to-fight:selected to fight], that model's [gloss:melee-attacks:melee attacks] can [gloss:re-roll:re-roll] one [gloss:hit-roll:Hit roll] and re-roll one [gloss:wound-roll:Wound roll].
▪ [gloss:enhancement:Enhancements] selected from this detachment do not count towards the total number of enhancements in your army.${chapterLock}`,
      },
      stratagems: [],
      enhancements: [
        {
          name: 'Guiding Omens',
          points: 15,
          flavor: "The holy visions which fill the mind of the Emperor's Champion on the eve of battle are clear to those of unwavering faith: they tell of the foes he will strike down, of the pious deeds he must commit, and the paths to be bloodily carved in his merciless crusade, all in the God-Emperor's name.",
          body: `Emperor's Champion model only. At the start of the first [gloss:battle-round:battle round], you can select up to three of the following abilities. This model has those abilities until the end of the battle:
▪ **Instrument of the God-Emperor (Once per battle, per army):** In the Fight phase, when this unit is [gloss:selected-to-fight:selected to fight], if this unit is [gloss:engaged:engaged] with an enemy [gloss:character:Character] unit, you can use this ability. If you do, this model's [gloss:melee-attacks:melee attacks] have the [DEVASTATING WOUNDS] ability.
▪ **Foreseen Paths of the Unholy:** This unit has 3" [gloss:detection-range:detection range].
▪ **Vision of Momentous Brutality:** This model's melee attacks have +2 Attacks.
▪ **Augury of Retribution:** Melee attacks that target this unit have the [HAZARDOUS] ability.
▪ **Omen of Sacred Intervention:** When you target this unit with the Heroic Intervention [gloss:stratagem:Stratagem], that use is 1CP.
▪ **Harbinger of Judgement:** When an enemy unit (excluding Monster or Vehicle units) engaged with this model is selected to make a [gloss:fall-back-move:Fall Back] move, roll one D6: on a 2+, that enemy unit suffers D6 [gloss:mortal-wound:mortal wounds].`,
        },
      ],
    },

    {
      id: 'wrathful-procession',
      name: 'Wrathful Procession',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Chant of Deathless Devotion',
        flavor:
          "With wrathful litanies, a crusade's Chaplains rouse the ardent souls of their battle-brothers, calling upon their faith in the God-Emperor to shield them from the blasphemy of the unbeliever.",
        body: `[gloss:friendly:Friendly] Chaplain units have a 5+ [gloss:invulnerable-save:invulnerable save] against [gloss:ranged-attacks:ranged attacks].${chapterLock}`,
      },
      stratagems: [
        {
          name: 'Fuelled by Faith',
          sublabel: 'Wrathful Procession – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'So powerfully gripped by holy fervour are these warriors that they fight on through even the most grievous wounds to body and mind.',
          when: 'Any phase, when a [gloss:friendly:friendly] Chaplain unit suffers a [gloss:mortal-wound:mortal wound].',
          target: 'That Chaplain unit.',
          effect: 'Your unit has Feel No Pain 4+ against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Castigate the Demagogues',
          sublabel: 'Wrathful Procession – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'There is nowhere that the architects of heresy can hide from the righteous judgement of the Black Templars.',
          when: 'Fight phase, when a [gloss:friendly:friendly] Chaplain unit is [gloss:selected-to-fight:selected to fight].',
          target: 'That Chaplain unit.',
          effect: "Your unit's [gloss:melee-attacks:melee attacks] have the [PRECISION] ability.",
          restrictions: '',
        },
        {
          name: 'Rite of Perfervid Wrath',
          sublabel: 'Wrathful Procession – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "With a bellowed oath to Rogal Dorn, Chaplains lead their warriors plunging into the foe's midst, shattering armour and crushing skulls with blows granted the strength of their devotion.",
          when: 'Fight phase, when a [gloss:friendly:friendly] Chaplain unit is [gloss:selected-to-fight:selected to fight].',
          target: 'That Chaplain unit.',
          effect: "Your unit's [gloss:melee-attacks:melee attacks] have +1 [gloss:strength:Strength].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Adaptable Executioner',
          points: 20,
          flavor: "No blasphemous tyrant is safe from this zealot's wrath, no matter the numbers or the qualities of the deluded guardians they throw in his path.",
          body: `Execrator model only. When this unit is [gloss:selected-to-fight:selected to fight], this model's [gloss:melee-attacks:melee attacks] have the [CLEAVE 1] ability, or the [PRECISION] ability.`,
        },
        {
          name: 'Benediction of Fury',
          points: 15,
          flavor: "Borne through a dozen bloody and hard-fought crusades, this crozius arcanum's unique empathokinetic circuitry has absorbed the bellicosity and righteous wrath of every Chaplain who has ever wielded it. As a result, it now strikes with the force of a thunderbolt.",
          body: `Chaplain model only. This model's [gloss:melee-attacks:melee attacks] have the [DEVASTATING WOUNDS] ability.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const blackTemplars = { en, ru: en }
