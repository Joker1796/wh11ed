// Drukhari — faction rules. Resolved from the same source priority as the other factions
// (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex > Index.
//
//   Codex: Drukhari (sources/codex/xenos/Drukhari.pdf — image-only PDF, transcribed from
//     page renders pp87–97) → army rule (Power From Pain) + 5 base detachments (Realspace
//     Raiders, Skysplinter Assault, Spectacle of Spite, Covenite Coterie, Kabalite Cartel).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/xenos/Drukhari.pdf) → 4 extra detachments
//     (Exhibition of Slaughter, Kabalite Agonysts, Tools of Torment, Reaper's Wager), the
//     "Corsairs and Travelling Players" army-rule addition, and Rules Updates.
//   MFM (src/data/mfm/drukhari.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the KABAL / WYCH CULT / COVENS `unique` tags.
//
// 9 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been folded
// into the army rule / codex detachment stratagems (they are the authoritative newer wording)
// — see inline notes. `unique` tags (mutually exclusive): KABAL (Kabalite Cartel, Kabalite
// Agonysts), WYCH CULT (Spectacle of Spite, Exhibition of Slaughter), COVENS (Covenite
// Coterie, Tools of Torment).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions); swap in
// a translated object later. Markup follows useRenderInline / RuleBlock / StratCard
// conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines,
// `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'drukhari',
  name: 'Drukhari',

  // Power From Pain — the Pain token economy. Faction-Pack Rules Update added the "Corsairs
  // and Travelling Players" allied-units clause (folded in below).
  armyRule: {
    id: 'power-from-pain',
    name: 'Power From Pain',
    flavor:
      'The Drukhari feed on suffering and terror. Every arc of blood that jets from a blade-slit artery, every scream of agonised horror, every vertiginous moment of shock or despair experienced by their prey surges through the Drukhari like an intoxicant. As the battle rages, the denizens of the Dark City drink deep of the floodtide of pain.',
    body: `### Pain Abilities
All **Drukhari** units have a Pain ability, tagged with the word 'Pain'. Pain abilities only apply to a unit while it is **Empowered**. If your Army Faction is Drukhari, you can Empower units from your army with Pain abilities by spending Pain tokens (see below).

### Gaining Pain Tokens
If your Army Faction is Drukhari, you gain Pain tokens as follows:
▪ **1 Pain token** at the start of your Command phase.
▪ **1 Pain token** each time an enemy unit is destroyed.
▪ **1 Pain token** each time an enemy unit fails a Battle-shock test.

Each time you gain a Pain token, keep it to one side — this is your Pain token pool. Each time you spend a Pain token, reduce your Pain token pool by the same amount.

### Empowered Through Pain
Each Pain ability will state when you can spend Pain tokens to Empower that unit. When you do, until the end of the phase, that unit is Empowered and all Pain abilities it has take effect. While an Attached unit is Empowered, the Pain abilities of all Leader and Bodyguard units in that unit take effect — you do not need to spend additional Pain tokens to activate each of those Pain abilities.

**Designer's Note:** You can also spend Pain tokens to activate additional effects in certain other rules such as Enhancements and Stratagems.

### Corsairs and Travelling Players
If your Army Faction is Drukhari, you can include **Harlequins** and **Anhrathe** units in your army, even though they do not have the Drukhari Faction keyword. The combined points value of Harlequins and/or Anhrathe units you can include depends on the battle size: Incursion — up to 250 pts; Strike Force — up to 500 pts; Onslaught — up to 750 pts. No Harlequins or Anhrathe models included in your army in this way can be your **Warlord**, and they cannot be given Enhancements.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'realspace-raiders',
      name: 'Realspace Raiders',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Alliance of Agony',
        flavor:
          'A spirit of decidedly unhealthy competition permeates intermingled realspace raids, with each Archon, Succubus and Haemonculus vying with their rivals to spread the most suffering and claim the greatest prizes. Though the Drukhari are canny enough to set aside infighting in the name of a successful raid, this mutual antagonism still spurs them all on to greater efforts.',
        body: `At the start of the battle, you gain 2 Pain tokens for each of the following combinations your army contains (these do not need to be in the same Attached unit):
▪ One or more **Archon** models and one or more **Kabalite Warriors** units.
▪ One or more **Succubus** models and one or more **Wyches** units.
▪ One or more **Haemonculus** models and one or more **Wracks** units.

**Designer's Note:** These are all cumulative, so if your army contains at least one of all of the combinations listed above, you start the battle with 6 Pain tokens.`,
      },
      stratagems: [
        {
          name: 'Insensible to Pain',
          sublabel: 'Realspace Raiders – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'The twisted creations of the haemonculus covens are uncaring of all but the most mortal injuries.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Haemonculus Covens unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Fighting Shadows',
          sublabel: 'Realspace Raiders – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Even attempting to strike the Drukhari is like trying to lay a blade to smoke, so sly and swift are they.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Drukhari unit from your army (excluding Haemonculus Covens units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Instinctive Spite',
          sublabel: 'Realspace Raiders – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'It is hardwired into the Drukhari psyche to prey upon weakened and suffering victims.',
          when: 'Start of your Shooting phase or the start of the Fight phase.',
          target: 'Up to two Drukhari Battleline units from your army, or one other Drukhari unit from your army.',
          effect: 'You can spend 1 Pain token. Until the end of the phase, each time a model in each of those units makes an attack that targets an enemy unit that is Below Half-strength, add 1 to the Hit roll. If you spent 1 Pain token, add 1 to the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Dark Harvest',
          sublabel: 'Realspace Raiders – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Wicked sickles and serrated blades hack through writhing flesh as the Drukhari harvest agony and suffering.',
          when: 'Start of the Fight phase.',
          target: 'Up to two Wracks units from your army, or one other Drukhari unit from your army.',
          effect: 'Until the end of the phase, melee weapons equipped by models in each of those units have the [LETHAL HITS] ability.',
          restrictions: '',
        },
        {
          name: 'Eager for the Kill',
          sublabel: 'Realspace Raiders – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The exhilarating promise of bloodshed goads these warriors into battle with preternatural haste.',
          when: 'Start of your Movement phase.',
          target: 'Up to two Wyches units from your army, or one other Drukhari unit from your army, that have not been selected to move this phase.',
          effect: "Until the end of the phase, each time one of those units Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit (this is not cumulative with the Reavers' Matchless Swiftness ability).",
          restrictions: '',
        },
        {
          name: 'Raid and Fade',
          sublabel: 'Realspace Raiders – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'The Drukhari are masters at using hit-and-run tactics, engaging a target with a flurry of shots before quickly manoeuvring into cover or out of sight.',
          when: 'End of your Shooting phase.',
          target: 'Up to two Kabalite Warriors units from your army, or one other Drukhari unit from your army (excluding Scourges and Aircraft).',
          effect: 'Each of those units can make a Normal move of up to 6".',
          restrictions: 'You cannot select units that are within Engagement Range of one or more enemy units. Until the end of the turn, those units are not eligible to declare a charge.',
        },
      ],
      enhancements: [
        {
          name: 'Dark Vitality',
          points: 20,
          flavor: 'Surrounded by terror and pain, this champion of the Dark City is a veritable conduit of cruel vitality.',
          body: `Drukhari model only. The bearer's unit is always Empowered – you do not need to spend any Pain tokens to activate that unit's Pain abilities.`,
        },
        {
          name: 'Labyrinthine Cunning',
          points: 25,
          flavor: "This Archon's intellect is towering, and their gift for devious politicking and vicious cunning is almost peerless.",
          body: `Archon model only. At the start of your Command phase, if the bearer is on the battlefield, you can do one of the following:
▪ Spend 1 Pain token and gain 1CP.
▪ Roll one D6: on a 4+, you gain 1CP.`,
        },
        {
          name: 'Eye of Spite',
          points: 15,
          flavor: "Having battled the most hulking and heavily armoured opponents in the arena, this Succubus can spot and exploit the slightest weakness in their enemy's defences.",
          body: `Succubus model only. Improve the Attacks and Armour Penetration characteristics of the bearer's melee weapons by 1. Each time the bearer's unit is selected to fight, you can spend 1 Pain token; if you do, until the end of the phase, improve the Attacks and Armour Penetration characteristics of the bearer's melee weapons by 2 instead.`,
        },
        {
          name: 'Crucible of Malediction',
          points: 15,
          flavor: 'This repulsive artefact contains the tortured souls of psykers. When released, these essences scream across the battlefield, spreading terror and madness.',
          body: `Haemonculus model only. Once per battle, in your Shooting phase, the bearer can use this Enhancement. If it does, you can spend 1 Pain token. Then, each enemy unit within 12" of the bearer must take a Battle-shock test, subtracting 1 from that test if you spent 1 Pain token. Each time a Psyker unit fails that test, it suffers 3 mortal wounds.`,
        },
      ],
    },

    {
      id: 'skysplinter-assault',
      name: 'Skysplinter Assault',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Rain of Cruelty',
        flavor:
          'Few warriors in the galaxy are as adept at launching punishing skyborne raids as the Drukhari. Before their prey even realise the peril, the killers of Commorragh are amongst their lines like grinning ghouls. Splinter fire lays low defenders still scrambling into position. Quicksilver assaults leave dozens screaming in maimed agony. Often, the battle is over before it has even truly begun.',
        body: `Each time a **Drukhari** unit from your army disembarks from a **Transport**, until the end of the turn:
▪ Ranged weapons equipped by models in that disembarking unit have the [IGNORES COVER] ability.
▪ Melee weapons equipped by models in that disembarking unit have the [LANCE] ability.`,
      },
      stratagems: [
        {
          name: 'Vicious Blades',
          sublabel: 'Skysplinter Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Wielding a horrifying array of hooked boarding blades, barbed lariats and other specialised tools of agony, these warriors hack and slash at their foes even as their transport skims low overhead.',
          when: 'Fight phase, just after a Drukhari Transport from your army has selected its targets.',
          target: 'That Transport.',
          effect: 'After your Transport has fought, select one enemy unit that was the target of one or more of those attacks and roll one D6 for each model embarked within your Transport, adding 1 to the result if that embarked model is a Wracks model: for each 5+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
          restrictions: '',
        },
        {
          name: 'Wraithlike Retreat',
          sublabel: 'Skysplinter Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Employing smoke grenades, paralysing mists or simple cunning and agility, these warriors slip away like spectres.',
          when: 'End of the Fight phase.',
          target: 'One Drukhari Infantry unit from your army that fought this phase.',
          // Faction-Pack Rules Update added the final embark-in-a-disembark-turn sentence.
          effect: 'Your unit can make a Normal or Fall Back move, but unless it is a Wyches unit, it must end that move wholly within 3" horizontally and 5" vertically of a friendly Drukhari Transport and must embark within that Transport at the end of that move (otherwise, it cannot make that move). Your unit can embark within that Transport in a turn it disembarked from that Transport.',
          restrictions: '',
        },
        {
          name: 'Pounce on the Prey',
          sublabel: 'Skysplinter Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Incredible alien agility and a delight in taking wild risks help these warriors to leap acrobatically from their skimming transports directly into battle.',
          when: 'Your Movement phase, just after a Drukhari Infantry unit from your army disembarks from a Transport that made a Normal move this phase.',
          target: 'That Infantry unit.',
          effect: 'Until the end of the turn, your unit is eligible to declare a charge.',
          restrictions: '',
        },
        {
          name: 'Skyborne Annihilation',
          sublabel: 'Skysplinter Assault – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'These warriors are well versed in raining suppressing fire on the foe even as they close with them from on high, shredding defences and leaving the survivors easy prey for the raid.',
          when: 'Your Shooting phase.',
          target: 'One Drukhari unit from your army that has not been selected to shoot this phase and that disembarked from a Transport this turn.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability, or the [SUSTAINED HITS 2] ability if your unit is a Kabalite Warriors or Hand of the Archon unit.',
          restrictions: '',
        },
        {
          name: 'Swooping Mockery',
          sublabel: 'Skysplinter Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The crew of this skimmer delight in evading and taunting their enemies with mocking ease.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update changed the Target's 9" to 8".
          target: 'One Drukhari Transport from your army that is within 8" of that enemy unit.',
          effect: 'Your Transport can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Night Shield',
          sublabel: 'Skysplinter Assault – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'These powerful Drukhari devices occlude their raiding vehicles from physical sight, targeting sensors, and even psychic senses.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Drukhari Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Phantasmal Smoke',
          points: 15,
          flavor: 'Phantasm grenade launchers worked into sweeping hull plates discharge, laying down covering spreads of hallucinogenic vapours that daze and distract the foe.',
          body: `Drukhari model only. While the bearer's unit is wholly within 6" of a friendly Drukhari Transport:
▪ Models in the bearer's unit have the Stealth ability.
▪ Each time a ranged attack targets the bearer's unit, models in that unit have the Benefit of Cover against that attack.`,
        },
        {
          name: 'Sadistic Fulcrum',
          points: 15,
          flavor: 'Witnessing this murderous warrior wreaking havoc, the sadistic crew of the Drukhari transports are filled with the vigour only the suffering of others can provide.',
          body: `Drukhari model only. Each time you spend 1 Pain token to Empower the bearer's unit in the Shooting phase, select one friendly Drukhari Transport within 6" of the bearer's unit; until the end of the phase, each time that Transport makes an attack, you can re-roll the Hit roll.`,
        },
        {
          name: 'Spiteful Raider',
          points: 10,
          flavor: 'This cruel realspace raider knows the best reason to take something from the foe is for the simple spite of denying them that which they most desire to keep.',
          body: `Drukhari model only. Each time the bearer's unit destroys an enemy unit in the Fight phase, if that enemy unit was within range of one or more objective markers when the bearer's unit was selected to fight, you gain 1 additional Pain token.`,
        },
        {
          name: 'Nightmare Shroud',
          points: 20,
          flavor: 'This strange artefact wreathes its bearer in a cloying cloud of shadow. Flitting into battle under cover of this pall, they are nigh impossible for the prey to see coming.',
          body: `Drukhari model only. Each time the bearer's unit disembarks from a Transport, until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer's unit.`,
        },
      ],
    },

    {
      id: 'spectacle-of-spite',
      name: 'Spectacle of Spite',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      unique: 'WYCH CULT',
      rule: {
        name: 'Combat Drugs',
        flavor:
          'Wyches abuse an array of potentially lethal performance-enhancing combat stimms.',
        body: `At the start of your Command phase, select which Combat Drugs will be active for your army until the start of your next Command phase. To do so, either select one from the list below (you cannot select the same Combat Drug more than once per battle), or randomly select two by rolling two D6. When doing so randomly, Combat Drugs you have previously selected can become active again, but if you randomly select one that is already active for your army, it has no additional effect.

### 1. Adrenalight
Add 1 to the Attacks characteristic of melee weapons equipped by **Wych Cult** models from your army.

### 2. Hypex
Add 2" to the Move characteristic of **Wych Cult** models from your army.

### 3. Serpentin
Improve the Weapon Skill characteristic of melee weapons equipped by **Wych Cult** models from your army by 1.

### 4. Painbringer
Add 1 to the Toughness characteristic of **Wych Cult** models from your army.

### 5. Grave Lotus
Add 1 to the Strength characteristic of melee weapons equipped by **Wych Cult** models from your army.

### 6. Splintermind
Improve the Leadership characteristic of **Wych Cult** models from your army by 1, and improve the Ballistic Skill characteristic of ranged weapons equipped by **Wych Cult** models from your army by 1.`,
      },
      stratagems: [
        {
          name: 'Berserk Fugue',
          sublabel: 'Spectacle of Spite – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: "The cult's gladiators enter a killing trance when combat is joined, allowing them to fight on through the most grievous hurts with undimmed ferocity.",
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Wych Cult unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Deadly Debut',
          sublabel: 'Spectacle of Spite – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Imitating Lelith Hesperax, these warriors begin their gladiatorial bout with an opening so spectacularly violent that none can fail to be impressed.',
          when: 'Fight phase.',
          target: 'One Drukhari unit from your army that made a Charge move this turn and has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability. If your unit is a Wyches unit, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1 as well.',
          restrictions: '',
        },
        {
          name: 'Feigned Weakness',
          sublabel: 'Spectacle of Spite – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Employing a common ruse from the arenas, the Drukhari appear to cower, wounded and exhausted, before surging back at their overconfident opponents with blades and fangs bared.',
          when: 'Your Movement phase, just after a DRUKHARI unit from your army Falls Back.',
          target: 'That DRUKHARI unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Preternatural Agility',
          sublabel: 'Spectacle of Spite – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Bounding and weaving, the Wyches cross the battlefield with unmatched acrobatic agility.',
          when: 'Start of your Movement or Charge phase.',
          target: 'One Wych Cult unit from your army.',
          effect: 'Until the end of the phase, each time your unit makes a Normal, Advance or Charge move, you can ignore any or all modifiers to its Move characteristic and to Advance and Charge rolls made for it and, until the end of the turn, each time a model in your unit makes such a move, it can move horizontally through models (when doing so, such a model can move within Engagement Range of such models but cannot end a Normal or Advance move within Engagement Range of them).',
          restrictions: '',
        },
        {
          name: 'A Challenge Met',
          sublabel: 'Spectacle of Spite – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: "The foe's advance is not something to be wary of but rather an opportunity to be seized.",
          // Faction-Pack Rules Update rewrote When / Target / Effect and removed Restrictions.
          when: "Your opponent's Movement phase, when an enemy unit ends a fall-back move.",
          target: 'One friendly unengaged Wych Cult unit that is within 6" of that enemy unit.',
          effect: 'Declare a charge with your unit. When selecting charge targets, you can only select enemy units that made a fall-back move this phase and are within the maximum distance.',
          restrictions: '',
        },
        {
          name: 'Acrobatic Display',
          sublabel: 'Spectacle of Spite – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Moving so quickly they seem to blur, the Wyches evade incoming fire with contemptuous elegance.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Wych Cult unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 5+ invulnerable save.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Chronoshard',
          points: 15,
          flavor: 'When smashed, this splinter of crystallised time ensnares the foe, forcing them to move with the helpless sluggishness of a nightmare for crucial moments.',
          body: `Succubus model only. Once per battle, at the start of the Fight phase, the bearer can use this Enhancement. If it does, until the end of the phase, models in the bearer's unit have the Fights First ability.`,
        },
        {
          name: "Morghenna's Curse",
          points: 20,
          flavor: 'Archon Aestra Khromys gifted the famed gladiatrix Morghenna this glaive as a symbol of patronage. Yet so exquisitely crafted is the blade that the Succubus was eventually murdered for it by a rival. Such has been the eventual fate of all those reckless and conceited enough to wield it since.',
          body: `Succubus model only. Improve the Armour Penetration and Damage characteristics of the bearer's melee weapons by 1.`,
        },
        {
          name: 'Periapt of Torments',
          points: 25,
          flavor: 'This hollow black stone is worn as warrior jewellery. The sinister organism that lurks within it can detect those who intend malice to its bearer and punishes them by lashing their psyches with its psi-barbs.',
          body: `Succubus model only. Enemy units cannot use the Fire Overwatch Stratagem to shoot at the bearer's unit.`,
        },
        {
          name: 'Pharmacophex',
          points: 15,
          flavor: 'This inbuilt chem-atomiser wreathes the bearer and their comrades in a hyperstimulant haze.',
          body: `SUCCUBUS model only. At the start of your Command phase, after selecting which Combat Drugs will be active for your army, roll one D6 and consult the Combat Drugs list (see Detachment Rule). The result rolled applies to the bearer's unit until the start of your next Command phase in addition to any other Combat Drugs that are active for your army. If you randomly select one that is already active for your army, it has no additional effect.`,
        },
      ],
    },

    {
      id: 'covenite-coterie',
      name: 'Covenite Coterie',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      unique: 'COVENS',
      rule: {
        name: 'Stitchflesh Abominations',
        flavor:
          'The Haemonculi and their servants have been surgically altered in body and mind beyond any measure of sanity. For beings so twisted as these, pain is little more than a fascinating diversion, while none but the most grievous wounds can lay them low for long.',
        body: `Each time an attack targets a **Haemonculus Covens** unit from your army, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.`,
      },
      stratagems: [
        {
          name: 'Postmortality',
          sublabel: 'Covenite Coterie – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'To the greatest Haemonculi, death is but an intriguing and temporary state to be experienced.',
          when: 'Any phase.',
          target: 'One HAEMONCULUS model from your army that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'Spend 1-3 Pain tokens. At the end of the phase, set up the destroyed model on the battlefield, unengaged and as close as possible to where it was destroyed. That model is not part of an attached unit and its unit has a starting strength of 1. That model has a number of wounds remaining equal to the number of Pain tokens you just spent.',
          restrictions: 'You cannot use this Stratagem if you have 0 Pain tokens, and you cannot target the same HAEMONCULUS model with this Stratagem more than once per battle.',
        },
        {
          name: 'Symphony of Suffering',
          sublabel: 'Covenite Coterie – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "So extreme are the foe's agonies that they spread a shock wave of terror through their comrades.",
          when: 'Fight phase, just after a Drukhari unit from your army destroys an enemy unit.',
          target: 'That Drukhari unit.',
          effect: 'Each enemy unit within 9" of and visible to your unit must take a Battle-shock test, subtracting 1 from that test if your unit is a Haemonculus Covens unit.',
          restrictions: '',
        },
        {
          name: "Poisoner's Art",
          sublabel: 'Covenite Coterie – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The venoms wielded by these warriors are potent enough to impress Shaimesh himself.',
          when: 'Fight phase, just after a Haemonculus Covens unit from your army has fought.',
          target: 'That Haemonculus Covens unit.',
          effect: "Select one enemy unit (excluding Vehicles) hit by one or more of your unit's attacks this phase. Until the end of the battle, that enemy unit is poisoned. At the start of each Command phase, roll one D6 for each poisoned unit on the battlefield: on a 4+, that unit suffers D3 mortal wounds.",
          restrictions: '',
        },
        {
          name: 'Distillers of Fear',
          sublabel: 'Covenite Coterie – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: "By arcane syringe and unholy invocation, the enemy's terror is syphoned out of their bodies, leaving them as little more than contorted husks.",
          when: 'Fight phase.',
          target: 'One Haemonculus Covens unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit that is Battle-shocked, that attack has the [DEVASTATING WOUNDS] ability.',
          restrictions: '',
        },
        {
          name: 'Connoisseurs of Pain',
          sublabel: 'Covenite Coterie – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'These epicureans of extreme sensation revel in their agonies as much as those of the foe.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Drukhari unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          // Faction-Pack Rules Update reworded the Effect ("until the attacking unit has finished…").
          effect: 'Spend 1 Pain token. Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1. At the end of the phase, if your unit is still on the battlefield and it is a Haemonculus Covens unit, you gain 1 Pain token.',
          restrictions: '',
        },
        {
          name: 'Enfolding Nightmare',
          sublabel: 'Covenite Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Even as the prey seek to drive the covenites back with hails of firepower, the horrors lurch closer.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Haemonculus Covens unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          // Faction-Pack Rules Update rewrote the Effect to a simple surge move.
          effect: 'Your unit can make a surge move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Master Regenesist',
          points: 25,
          flavor: 'Having extensively studied the mechanisms of biological growth and vitality, this Haemonculus is adept at goading flesh to reknit and new muscle and limbs to sprout in ever more grotesque arrangements.',
          body: `Haemonculus model only. Each time the bearer uses its Fleshcraft ability, you can return up to D3+3 destroyed Bodyguard models to the bearer's unit instead of D3+1.`,
        },
        {
          name: 'Master Nemesine',
          points: 5,
          flavor: 'Simply for the sake of scientific curiosity and personal entertainment, this twisted poisoner has tailored toxins to kill every single life form they have ever encountered.',
          body: `Haemonculus model only. The bearer's weapons have the [ANTI-BEAST 2+] and [ANTI-MONSTER 4+] abilities.`,
        },
        {
          name: 'Master Artisan',
          points: 20,
          flavor: 'This Haemonculus is a savant in the arts of sculpting metal, flesh, sinew and bone alike. Their creations are works of dark and malevolent genius.',
          body: `Haemonculus model only. Add 1 to the bearer's Wounds characteristic and add 1 to the Toughness characteristic of models in the bearer's unit.`,
        },
        {
          name: 'Master Repugnomancer',
          points: 15,
          aura: true,
          flavor: 'The Repugnomancers focus all their study on the art of triggering instinctive revulsion and horror. Though considered gauche by many other Haemonculi, the results of their foul craft on the battlefield are undeniable.',
          body: `Haemonculus model only. Add 3" to the range of the bearer's Fear Incarnate ability, and each time a friendly Drukhari unit within 9" of the bearer fails a Battle-shock test or is destroyed, roll one D6: on a 4+, you gain 1 Pain token.`,
        },
      ],
    },

    {
      id: 'kabalite-cartel',
      name: 'Kabalite Cartel',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      unique: 'KABAL',
      rule: {
        name: 'Murderous Agenda',
        flavor:
          'Kabalite forces often prize particular targets amongst the enemy ranks, whether as a macabre trophy, the target of a contract killing, or for some other devious reason.',
        body: `At the start of the first battle round, select one of the Contracts below, then select one unit from your opponent's army that matches the 'Contract' description in that Contract. Until that Contract is completed, that unit is your Contract unit and **Kabal** and **Blades for Hire** units from your army have the ability stated in that Contract. At the start of your Command phase, if your Contract unit is destroyed, that Contract is completed and you gain 3 Pain tokens.

### Trophy Hunters
**Contract:** One Character unit.
**Ability:** Each time a Kabal or Blades for Hire model in this unit makes an attack that targets the Contract unit, that attack has the [PRECISION] ability.

### Sow Fear and Terror
**Contract:** One Infantry or Mounted unit (excluding units containing only Character models). At the start of your Command phase, this Contract is completed if all non-Character models in that unit are destroyed.
**Ability:** Each time a Kabal or Blades for Hire model in this unit makes an attack that targets an Infantry or Mounted unit, that attack has the [SUSTAINED HITS 1] ability.

### Show of Strength
**Contract:** One Monster or Vehicle unit.
**Ability:** Each time a Kabal or Blades for Hire model in this unit makes an attack that targets a Monster or Vehicle unit, that attack has the [LETHAL HITS] ability.`,
      },
      stratagems: [
        {
          name: 'Double-Cross',
          sublabel: 'Kabalite Cartel – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'What better way to eliminate rivals than tricking them into taking the blade meant for your ribs?',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Kabal or Blades for Hire unit from your army that was selected as the target of one or more of the attacking unit's attacks, and one friendly Drukhari unit (excluding Vehicles).",
          effect: 'Until the end of the phase, each time you would allocate an attack to a model in your Kabal or Blades for Hire unit, if your Drukhari unit is within Engagement Range of the attacking model, no saving throw is made for that attack; instead, your Drukhari unit suffers a number of mortal wounds equal to the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Taken Alive',
          sublabel: 'Kabalite Cartel – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Borne away screaming into the shadows, everyone knows these unfortunates face a dreadful fate.',
          when: 'Fight phase.',
          target: 'One Drukhari unit from your army that has not been selected to fight this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll. If your Contract unit is destroyed as a result of those attacks, every unit in your opponent's army must take a Battle-shock test. You cannot gain more than 3 Pain tokens as a result of failed Battle-shock tests caused by this Stratagem.",
          restrictions: '',
        },
        {
          name: 'Tailored Toxins',
          sublabel: 'Kabalite Cartel – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Specially prepared for their chosen prey, these malignant poisons are the anathema of their targets.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Kabal or Blades for Hire unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets your Contract unit, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Enemies Without Number',
          sublabel: 'Kabalite Cartel – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "This Archon's personal kill list of rivals, nemeses and victims is virtually never-ending.",
          when: 'Your Command phase, just after you complete a Contract (see Murderous Agenda Detachment rule).',
          target: 'One ARCHON WARLORD from your army.',
          effect: "Select one new Contract from those listed in the Murderous Agenda Detachment rule (this can be one you have already completed), then select one unit from your opponent's army that is on the battlefield and matches the 'Contract' description in that Contract. Until that Contract is completed, that unit is your Contract unit and the Murderous Agenda Detachment rule applies as normal.",
          restrictions: '',
        },
        {
          name: 'Making a Point',
          sublabel: 'Kabalite Cartel – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Whether seeking to impress a watching Archon, show up rivals or revel in their supremacy, these marksmen fire for spiteful effect.',
          when: 'Your Shooting phase.',
          target: 'One Kabalite Warriors or Hand of the Archon unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, improve the Ballistic Skill and Armour Penetration characteristics of ranged weapons equipped by models in your unit by 1.',
          restrictions: '',
        },
        {
          name: 'Deadly Deceivers',
          sublabel: 'Kabalite Cartel – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A life lived amidst the shadowed spires of Commorragh teaches many ways to creep up on your enemies, unseen and unsuspected.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Kabal or Blades for Hire unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Informant Network',
          points: 30,
          flavor: 'A web of infiltrating agents, coerced unfortunates, and infoparasitic organisms keeps this Archon well informed and allows them to plan their realspace raids with insidious accuracy.',
          body: `Archon model only. At the start of the Declare Battle Formations step, select up to three Kabalite Warriors and/or Hand of the Archon units from your army; those units gain the Infiltrators ability.`,
        },
        {
          name: 'Webway Awl',
          points: 25,
          flavor: 'A recklessly destructive implement modified from ancient Aeldari technology, the Webway awl allows its bearer to bore temporary rents into and out of the labyrinth dimension, careless of the ruin they leave in their wake.',
          body: `Archon model only. Models in the bearer's unit have the Deep Strike ability, and you can target the bearer's unit with the Rapid Ingress Stratagem for 0CP.`,
        },
        {
          name: 'Towering Arrogance',
          points: 20,
          flavor: "So absolute is this war leader's self-belief, so monstrous their ego, that it is virtually a weapon in its own right. Drukhari are drawn in their wake, unable to resist the charismatic certitude they exude. Enemies, meanwhile, give ground and lose heart beneath their witheringly contemptuous glare.",
          body: `Archon model only. While the bearer is leading a unit, improve the Leadership and Objective Control characteristics of models in that unit by 1.`,
        },
        {
          name: 'Leechbite Plate',
          points: 5,
          flavor: 'Threaded with parasite circuits and fashioned from empathovoric crystalline resins, this armour drinks deep of the lifeblood that spatters it and the pain of the wounded to nourish and heal its wearer.',
          body: `Archon model only. The bearer has a Save characteristic of 3+. At the start of either player's Command phase, you can spend 1 Pain token: if you do, the bearer regains all of its lost wounds.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'exhibition-of-slaughter',
      name: 'Exhibition of Slaughter',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      unique: 'WYCH CULT',
      rule: {
        name: 'Exacting Cruelty',
        flavor:
          "With long lives spent honing their murderous skills against the most powerful opponents, the renowned fighters of Commorragh's arenas have an instinct for just where to strike to bring their prey low in the most painful and elegant manner possible.",
        body: `Friendly WYCH CULT units' melee attacks have [LETHAL HITS: non-MONSTER/VEHICLE].

This detachment has the **WYCH CULT** tag and cannot be taken with another **WYCH CULT** detachment.`,
      },
      stratagems: [
        {
          name: 'Planned Strikes',
          sublabel: 'Exhibition of Slaughter – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Murderous rehearsals ensure that those who survive can bring down the most resilient of prey in puissant displays.',
          when: 'Fight phase, when a friendly WYCH CULT unit is selected to fight.',
          target: 'That WYCH CULT unit.',
          effect: "Your unit's melee attacks have [LETHAL HITS].",
          restrictions: '',
        },
        {
          name: 'Sculpting the Stage',
          sublabel: 'Exhibition of Slaughter – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Gauche are the gladiators who kill too relentlessly. Preparing the stage with a variety of torments in order to build the tension for a delightful crescendo is the mark of a true artist.',
          when: 'Your Movement phase, when a friendly WYCH CULT unit is selected to make an advance/fall-back move.',
          target: 'That WYCH CULT unit.',
          effect: 'That move does not prevent your unit from being eligible to start an action.',
          restrictions: '',
        },
        {
          name: 'Acrobatic Display',
          sublabel: 'Exhibition of Slaughter – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Moving so quickly they seem to blur, the Wyches evade incoming fire with contemptuous elegance.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly WYCH CULT unit.",
          target: 'That WYCH CULT unit.',
          effect: 'Your unit has 5+ InSv.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Hyperstimm Trafficker',
          points: 20,
          flavor: 'This gladiator has eyes only on the patronage of their audience. Supplied by a network of narcotic distributors – and heedless of the brutal effects of overdosing – the Succubus and their Wyches can endure long enough to provide extensive and heightened performances.',
          body: `SUCCUBUS model only. This unit has +1 T.`,
        },
        {
          name: 'Periapt of Torments',
          points: 20,
          flavor: 'This hollow black stone is worn as warrior jewellery. The sinister organism that lurks within it can detect those who intend malice to its bearer and punishes them by lashing their psyches with its psi-barbs.',
          body: `SUCCUBUS model only. Enemy units cannot target this unit with snap shooting attacks.`,
        },
      ],
    },

    {
      id: 'kabalite-agonysts',
      name: 'Kabalite Agonysts',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      unique: 'KABAL',
      rule: {
        name: 'Contracted Harvest',
        flavor:
          "Directed to inflict as much suffering as possible amongst the enemy's soldiers – on pain of their own torment – a kabal's vicious warriors spare no opportunity to unleash deluges of painful firepower.",
        body: `Friendly BLADES FOR HIRE/KABAL units' ranged attacks have [SUSTAINED HITS 1: non-MONSTER/VEHICLE].

This detachment has the **KABAL** tag and cannot be taken with another **KABAL** detachment.`,
      },
      stratagems: [
        {
          name: 'Prioritised Victim',
          sublabel: 'Kabalite Agonysts – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Contracts to annihilate, maim or capture singular victims of rarefied value are eagerly competed for by a kabal's killers.",
          when: 'Your Shooting phase or the Fight phase, when a friendly BLADES FOR HIRE/KABAL unit targets a CHARACTER unit.',
          target: 'That BLADES FOR HIRE/KABAL unit.',
          effect: `Your unit's attacks that target a CHARACTER unit can:
▪ Re-roll Hit rolls of 1.
▪ Re-roll Wound rolls of 1.`,
          restrictions: '',
        },
        {
          name: "Shadows' Reach",
          sublabel: 'Kabalite Agonysts – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The capability of militant kabals to project their killing power is rightfully feared, as is the fact that the perpetrators can usually never be found.',
          when: 'Your Shooting phase, when a friendly BLADES FOR HIRE/KABAL unit has shot.',
          target: 'That BLADES FOR HIRE/KABAL unit.',
          effect: 'Those attacks do not prevent your unit from being hidden.',
          restrictions: '',
        },
        {
          name: 'Killers from the Dark Spires',
          sublabel: 'Kabalite Agonysts – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Defensive barriers or camouflage are little protection against those who have honed their talents hunting amongst the twisted and dark spires of their kabal's territory.",
          when: 'Your Shooting phase, when a friendly KABALITE WARRIORS unit is selected to shoot.',
          target: 'That KABALITE WARRIORS unit.',
          effect: "Your unit's ranged attacks have [IGNORES COVER].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Towering Arrogance',
          points: 15,
          flavor: "So absolute is this war leader's self-belief, so monstrous their ego, that it is virtually a weapon in its own right. Drukhari are drawn in their wake, unable to resist the charismatic certitude they exude. Enemies, meanwhile, give ground and lose heart beneath their witheringly contemptuous glare.",
          body: `ARCHON model only. This unit has +1 Ld and OC.`,
        },
        {
          name: 'Contempt for Rivals',
          points: 20,
          flavor: "Assured of their utter superiority over any of the enemy's champions, this Archon rarely extends the offer of single combat and instead directs their warriors en masse to cut the pretender down.",
          body: `ARCHON model only. This unit's attacks have [PRECISION].`,
        },
      ],
    },

    {
      id: 'tools-of-torment',
      name: 'Tools of Torment',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      unique: 'COVENS',
      rule: {
        name: 'Darkest Artifice',
        flavor:
          "A Haemonculus' most resilient Engines of Pain are each a dark triumph valued as a work of malevolent genius. Their finely wrought armoured carapaces shield toughened mechorganic strata and slabs of mutated cartilage.",
        body: `Attacks that target friendly CRONOS/TALOS units with a S greater than that unit's T have -1 to Wound rolls.

This detachment has the **COVENS** tag and cannot be taken with another **COVENS** detachment.`,
      },
      stratagems: [
        {
          name: 'Salting the Wound',
          sublabel: 'Tools of Torment – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Confusion, terror, and panic are triggers for a Haemonculus' Engines of Pain, which stimulate them to drive their evil augmentations even deeper into the foe.",
          when: 'Fight phase, when a friendly CRONOS/TALOS unit is selected to fight.',
          target: 'That CRONOS/TALOS unit.',
          effect: "Your unit's attacks that target a Battle-shocked unit have [DEVASTATING WOUNDS].",
          restrictions: '',
        },
        {
          name: 'Dividends of Agony',
          sublabel: 'Tools of Torment – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Sharing is typically anathema to the self-centred Drukhari, except where horror can be fruitfully reinvested in those marked for later harvest.',
          when: 'Fight phase, when a friendly HAEMONCULUS COVENS unit destroys an enemy unit.',
          target: 'That HAEMONCULUS COVENS unit.',
          effect: 'Select one visible enemy unit within 12" of your unit. That enemy unit makes a Battle-shock roll, with -1 to that Battle-shock roll.',
          restrictions: '',
        },
        {
          name: 'Urgent Metamorphosis',
          sublabel: 'Tools of Torment – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The unhurried menace exuded by Covenites as they extricate themselves from gore-slick foes can metamorphose in an instant back to pain-hungry savagery.',
          when: 'Your Movement phase, when a friendly HAEMONCULUS COVENS unit is selected to make a fall-back move.',
          target: 'That HAEMONCULUS COVENS unit.',
          effect: 'That move does not prevent your unit from being eligible to declare a charge.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Gnarlskin Experimentor',
          points: 20,
          flavor: 'This master fleshcrafter sees raids as opportunities to assess a host of novel skins for themselves and their suffering servants: scabrous crusts, squirming meshes, resinous under layers and more besides.',
          body: `HAEMONCULUS model only. Attacks that target this unit with a S greater than your unit's T have -1 to Wound rolls.`,
        },
        {
          name: 'Elixir of the Corpse Courts',
          points: 15,
          upgrade: true,
          flavor: 'Flowing from surgically grafted vials, this milky substance causes tumorous masses of pallid and nerve-deadened flesh to grow. It sloughs away in sickly lumps when struck, but is soon replaced in a regenecyst cycle of cutaneous ablative armour.',
          body: `CRONOS/TALOS unit only. This unit has 5+ InSv.`,
        },
      ],
    },

    {
      id: 'reapers-wager',
      name: "Reaper's Wager",
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Callous Competition',
        flavor:
          'In this saedath, the Harlequins embody the Reaper, whilst their Drukhari companions are mortal killers.',
        body: `At the start of the battle, DRUKHARI units from your army are winning the wager.
▪ Each time a DRUKHARI unit from your army destroys an enemy unit, DRUKHARI units from your army are winning the wager.
▪ Each time a HARLEQUINS unit from your army destroys an enemy unit, HARLEQUIN units from your army are winning the wager.
▪ While DRUKHARI units from your army are winning the wager, HARLEQUIN units from your army are losing the wager, and vice versa.

Each time a DRUKHARI or HARLEQUINS model from your army makes an attack, if that model's unit is winning the wager, re-roll a Hit roll of 1. If that model's unit is losing the wager, re-roll a Hit roll of 1 and re-roll a Wound roll of 1 instead.

**Harlequins:** You can include Harlequins units in your army (see Codex: Aeldari). The combined points cost of such units depends on your battle size: Incursion — up to 500 pts; Strike Force — up to 1000 pts; Onslaught — up to 1500 pts. No Harlequins models from your army can be your **Warlord**. If you select this Detachment, you cannot use the Corsairs and Travelling Players army rule.`,
      },
      stratagems: [
        {
          name: 'Malicious Frenzy',
          sublabel: "Reaper's Wager – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Jealous competition descends into frenzied carnage as the kill count climbs higher and the intoxicating screams of the dying fill the air.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Drukhari or Harlequins unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select [LETHAL HITS] or [SUSTAINED HITS 1]. Until the end of the phase, weapons equipped by models in your unit have the selected ability.',
          restrictions: '',
        },
        {
          name: 'Fateful Role',
          sublabel: "Reaper's Wager – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'These warriors are so absorbed by their desire to win the wager that they risk death to land their killing blows.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Drukhari or Harlequins unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if that unit is losing the wager: on a 4+, do not remove it from play. That destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: "Murderer's Circus",
          sublabel: "Reaper's Wager – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'In bounding leaps and graceful pirouettes, the cavalcade of capricious killers bounds through hails of fire, cackling gleefully as they come.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Drukhari or Harlequins unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Shorten the Odds',
          sublabel: "Reaper's Wager – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Having selected their victims, these killers strive to complete the kill with speed and brutality whilst moving ever closer to winning their macabre wager.',
          when: 'Your Movement phase, just after a Drukhari or Harlequins unit from your army has Advanced.',
          target: 'That unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: 'Scintillating Tempo',
          sublabel: "Reaper's Wager – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Commorrite or Harlequin, these lithe combatants move with stunning speed, darting in and out of firing lines before their foes can raise their weapons.',
          when: 'Your Movement phase or your Charge phase, just after a Drukhari or Harlequins unit from your army is selected to make a Normal, Advance or Fall Back move, is set up on the battlefield, or declares a charge.',
          target: 'That unit.',
          effect: 'Until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at your unit.',
          restrictions: '',
        },
        {
          name: 'Dance Macabre',
          sublabel: "Reaper's Wager – Strategic Ploy Stratagem",
          cp: '2CP',
          turn: 'opponent',
          flavor: "The saedath's victims become unwitting partners in a frantic dance of ghastly slaughter.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Drukhari Infantry or Harlequins Infantry unit from your army that is within 8" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to D6". If your unit is currently losing the wager, it can make a Normal move of up to 6" instead.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Archraider',
          points: 15,
          flavor: 'A veteran of countless realspace raids or vehicular saedaths, this warrior champion utilises the speed of their sleek anti-grav craft to surprise their enemies.',
          body: `Harlequins or Drukhari model only. In the Declare Battle Formations step, if the bearer starts the battle embarked within a Dedicated Transport, that Dedicated Transport has the Scouts 9" ability.`,
        },
        {
          name: 'Conductor of Torment',
          points: 20,
          flavor: 'This cruel champion of Commorragh seeks only to bathe in the agony of the foe. To them, the outcome of any wager is secondary to the symphony of suffering.',
          body: `Drukhari model only. In your Command phase, you can do one of the following:
▪ If your Drukhari units are currently losing the wager, you can gain 1 Pain token. If you do, Drukhari units from your army are now winning the wager.
▪ If your Drukhari units are currently winning the wager, you can discard 1 Pain token. If you do, Harlequins units from your army are now winning the wager.`,
        },
        {
          name: "Reaper's Cowl",
          points: 25,
          flavor: 'This ebon cloak contains a shadow field generator, which shrouds the bearer in a field of umbral darkness.',
          body: `Harlequins model only. Models in the bearer's unit have the Stealth and Infiltrators abilities.`,
        },
        {
          name: 'Webway Walker',
          points: 15,
          flavor: "This elite combatant possesses intricate knowledge of the Webway's hidden paths and employs them to enhance this dreadful performance.",
          body: `Harlequins or Drukhari model only. Models in the bearer's unit have the Deep Strike ability. Each time the bearer's unit is set up on the battlefield using the Deep Strike ability, if that unit is currently losing the wager, until the end of the turn, you can re-roll Charge rolls made for that unit.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const drukhari = { en, ru: en }
